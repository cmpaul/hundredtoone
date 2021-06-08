/**
 * This function creates a brainstorm for the current user.
 */

const arc = require('@architect/functions');
const parseBody = arc.http.helpers.bodyParser;
const { create } = require('@architect/shared/brainstorms');
const { isAuthorized } = require('@architect/shared/auth');

const Hashids = require('hashids/cjs');
const hashids = new Hashids();

exports.handler = async function http(req) {
  const reqBody = parseBody(req);
  const title = reqBody.title;
  const password = reqBody.password;
  console.log('post-brainstorm', title, password, reqBody.id)

  let hashedId;
  let isAuthed = false;

  if (reqBody.id) {
    hashedId = reqBody.id;
    isAuthed = await isAuthorized(req, hashedId);
  } else {
    // Expire in 2 weeks
    // TODO: Make this configurable
    const expiresDate = new Date();
    expiresDate.setDate(expiresDate.getDate() + 14);
    const expires = ~~(expiresDate.getTime() / 1000);

    const { id } = await create({ title, password, expires });
    hashedId = hashids.encode(id);
    isAuthed = true;
  }

  const session = await arc.http.session.read(req);
  if (isAuthed) {
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
