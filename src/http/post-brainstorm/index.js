/**
 * This function creates a brainstorm for the current user.
 */

const arc = require('@architect/functions');
const parseBody = arc.http.helpers.bodyParser

exports.handler = async function http (req) {
  const reqBody = parseBody(req);
  const title = reqBody.title;
  const password = reqBody.password;
  
  console.log(`POST /brainstorm (title '${title}', password '${password}')`);
  const maxId = 999999;
  let id = String(~~(Math.random() * maxId)).padStart(maxId.length, '0') + Date.now();

  const data = await arc.tables();
  await data.brainstorms.put({
    id,
    title,
    password
  });

  // TODO: Set brainstorm access on session

  return {
    headers: {
      'Location': `/brainstorm/${id}`
    },
    statusCode: 302
  }
}