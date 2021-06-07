/**
 * This function creates a brainstorm for the current user.
 */

const arc = require('@architect/functions');
const parseBody = arc.http.helpers.bodyParser;

const Hashids = require('hashids/cjs');
const hashids = new Hashids();

/**
 * 
 * @param {String} hashedId 
 * @returns boolean
 */
async function isAuthorized(hashedId, password) {
  // Check that password is valid for given brainstorm
  const id = parseInt(hashids.decode(hashedId));
  const data = await arc.tables();
  const brainstorm = await data.brainstorms.get({ id });
  if (brainstorm === null) {
    return false;
  }

  // TODO: What happens if it's not found?
  // TODO: Should passwords be salted and hashed?
  return (password === brainstorm.password);
}

/**
 * Generates a unique ID based on a random number and time stamp.
 * @returns Number
 */
function generateId() {
  return parseInt(String(~~(Math.random() * 9999)) + ~~(Date.now() / 1000));
}

/**
 * Creates a new brainstorm.
 * @param {String} title 
 * @param {String} password 
 */
async function createBrainstorm(title, password) {
  const id = generateId();
  const data = await arc.tables();
  brainstorm = {
    id,
    title,
    password
  };
  await data.brainstorms.put(brainstorm);
  return id;
}

exports.handler = async function http(req) {
  const reqBody = parseBody(req);
  const title = reqBody.title;
  const password = reqBody.password;

  let hashedId;
  let isAuthorized = false;

  if (reqBody.id) {
    hashedId = reqBody.id;
    isAuthorized = await isAuthorized(hashedId, password);
  } else {
    const id = await createBrainstorm(title, password);
    hashedId = hashids.encode(id);
    isAuthorized = true;
  }

  const session = await arc.http.session.read(req);
  if (isAuthorized) {
    // Store authorization in a session cookie
    const authorized = session.authorized || {};
    authorized[hashedId] = true;
    session.authorized = authorized;
  }
  const cookie = await arc.http.session.write(session);

  return {
    headers: {
      'Location': `/brainstorm/${hashedId}`,
      'set-cookie': cookie,
    },
    statusCode: 302
  }
}
