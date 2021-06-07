const auth = require('@architect/shared/auth');
const { findBrainstorm } = require('@architect/shared/brainstorms');

// TODO: - verify event.headers.Origin to enforce same-origin
exports.handler = async function ws(event) {
  const hashedId = event.queryStringParameters.id || null;
  const brainstorm = findBrainstorm(hashedId);
  if (!brainstorm) {
    console.log(`ws-connect: No brainstorm found for ID ${hashedId}`);
    return {statusCode: 404};
  }

  const isAuthorized = await auth.isAuthorized(event, brainstorm);
  if (!isAuthorized) {
    console.log(`ws-connect: Not authorized to access brainstorm ${hashedId}`);
    return {statusCode: 401};
  }

  // TODO: Get connectionId and store it

  return {statusCode: 200}
}
