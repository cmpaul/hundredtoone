/**
 * This function looks up a session ID, ensures the user has access to it,
 * and generates the page for the Svelte app and websocket connection.
 */
const Layout = require('@architect/views/layout')
const { isAuthorized } = require('@architect/shared/auth');
const { find } = require('@architect/shared/brainstorms');

exports.handler = async function http(req) {
  const hashedId = req.pathParameters['id'];
  const brainstorm = await find(hashedId);
  if (!brainstorm) {
    console.log(`No brainstorm found for ID ${hashedId}`);
    return {
      statusCode: 302,
      headers: {
        'Location': '/'
      }
    };
  }

  const isAuthed = await isAuthorized(req, hashedId);
  if (!isAuthed) {
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