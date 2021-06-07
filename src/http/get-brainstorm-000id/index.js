/**
 * This function looks up a session ID, ensures the user has access to it,
 * and generates the page for the Svelte app and websocket connection.
 */
const Layout = require('@architect/views/layout')
const arc = require("@architect/functions");

const Hashids = require('hashids/cjs');
const hashids = new Hashids();

exports.handler = async function http (req) {
  const hashedId = req.pathParameters['id'];
  const id = parseInt(hashids.decode(hashedId));
  
  const data = await arc.tables();
  const brainstorm = await data.brainstorms.get({ id });

  // TODO: What happens if it's not found? 404?

  console.log(`GET /brainstorm/:id called with id ${hashedId}: ${JSON.stringify(brainstorm)}`);

  const session = await arc.http.session.read(req);
  console.log(`session = ${JSON.stringify(session)}`);
  const authorized = session.authorized || {};
  if (brainstorm.password && authorized[hashedId] !== true) {
    // User needs to enter a password
    return {
      statusCode: 200,
      headers: { 'content-type': 'text/html; charset=utf8' },
      body: Layout({ id: hashedId, needsAuth: true })
    }
  }

  return {
    statusCode: 200,
    headers: { 'content-type': 'text/html; charset=utf8' },
    body: Layout({ id: hashedId, title: brainstorm.title || null })
  }
}