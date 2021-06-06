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

  // TODO: Set brainstorm access on session

  const hashedId = hashids.encode(id);
  console.log(`id = ${id}, hashedId = ${hashedId}`);

  return {
    headers: {
      'Location': `/brainstorm/${hashedId}`
    },
    statusCode: 302
  }
}
