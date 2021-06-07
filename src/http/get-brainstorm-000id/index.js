/**
 * This function looks up a session ID, ensures the user has access to it,
 * and generates the page for the Svelte app and websocket connection.
 */
const Layout = require('@architect/views/layout')
const auth = require('@architect/shared/auth');
const { findBrainstorm } = require('@architect/shared/brainstorms');

exports.handler = async function http (req) {
  const hashedId = req.pathParameters['id'];
  const brainstorm = await findBrainstorm(hashedId);
  if (!brainstorm) {
    return {
      statusCode: 302,
      headers: {
        'Location': '/'
      }
    };
  }

  const isAuthorized = await auth.isAuthorized(req, brainstorm);
  if (!isAuthorized) {
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