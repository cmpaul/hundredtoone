/**
 * This function creates a brainstorm for the current user.
 */

const arc = require('@architect/functions');
const parseBody = arc.http.helpers.bodyParser;

const Hashids = require('hashids/cjs');
const hashids = new Hashids();

exports.handler = async function http (req) {
  const reqBody = parseBody(req);
  const title = reqBody.title;
  const password = reqBody.password;
  
  console.log(`POST /brainstorm (title '${title}', password '${password}')`);
  const maxId = 9999;
  const id = parseInt(String(~~(Math.random() * maxId)) + ~~(Date.now() / 1000));

  const data = await arc.tables();
  await data.brainstorms.put({
    id,
    title,
    password
  });

  const hashedId = hashids.encode(id);

  const session = await arc.http.session.read(req);
  console.log(`session = ${JSON.stringify(session)}`);
  const authorized = session.authorized || {};
  authorized[hashedId] = true;
  session.authorized = authorized;
  const cookie = await arc.http.session.write(session);
  console.log(`new cookie = ${JSON.stringify(cookie)}`);

  return {
    headers: {
      'Location': `/brainstorm/${hashedId}`,
      'set-cookie': cookie,
    },
    statusCode: 302
  }
}
