let arc = require('@architect/functions');
const { isAuthorized } = require('@architect/shared/auth');
const { find } = require('@architect/shared/brainstorms');

exports.handler = async function ws(event) {
  let connectionId = event.requestContext.connectionId
  let { text } = JSON.parse(event.body);

  // Look up the brainstorm
  const data = await arc.tables();
  const { brainstormId } = await data.connectionBrainstorm.get({ connectionId });

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

  // Broadcast the message to everyone listening
  const broadcasts = brainstorm.connectionIds.values.map((connectionId) => {
    arc.ws.send({
      id: connectionId,
      payload: { text }
    });
  });
  await Promise.all(broadcasts);

  return { statusCode: 200 };
}
