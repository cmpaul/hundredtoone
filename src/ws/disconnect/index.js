let arc = require('@architect/functions');
const { removeConnectionId } = require('@architect/shared/brainstorms');

exports.handler = async function ws(event) {
  const connectionId = event.requestContext.connectionId;

  // Look up the brainstorm
  const data = await arc.tables();
  const { brainstormId } = await data.connectionBrainstorm.get({ connectionId });

  // Remove the current connection from the brainstorm's connections
  await removeConnectionId(brainstormId, connectionId);

  return { statusCode: 200 };
}
