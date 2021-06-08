const arc = require('@architect/functions');
const { isAuthorized } = require('@architect/shared/auth');
const { find, addConnectionId } = require('@architect/shared/brainstorms');

// TODO: - verify event.headers.Origin to enforce same-origin
exports.handler = async function ws(event) {
  const brainstormId = event.queryStringParameters.id || null;
  const brainstorm = await find(brainstormId);
  if (!brainstorm) {
    console.log(`ws-connect: No brainstorm found for ID ${brainstormId}`);
    return { statusCode: 404 };
  }

  const isAuthed = await isAuthorized(event, brainstormId);
  if (!isAuthed) {
    console.log(`ws-connect: Not authorized to access brainstorm ${brainstormId}`);
    return { statusCode: 401 };
  }

  const connectionId = event.requestContext.connectionId;
  const data = await arc.tables();

  await Promise.all([
    // Add the connection to a brainstorm
    addConnectionId(brainstormId, connectionId),
    // Add a reverse lookup
    data.connectionBrainstorm.put({
      connectionId,
      brainstormId
    })
  ]);

  return { statusCode: 200 };
}
