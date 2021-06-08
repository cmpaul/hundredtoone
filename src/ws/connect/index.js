const arc = require('@architect/functions');
const auth = require('@architect/shared/auth');
const { findBrainstorm } = require('@architect/shared/brainstorms');

// TODO: - verify event.headers.Origin to enforce same-origin
// TODO: When joining, send all messages?
exports.handler = async function ws(event) {
  const brainstormId = event.queryStringParameters.id || null;
  const brainstorm = findBrainstorm(brainstormId);
  if (!brainstorm) {
    console.log(`ws-connect: No brainstorm found for ID ${brainstormId}`);
    return {statusCode: 404};
  }

  const isAuthorized = await auth.isAuthorized(event, brainstorm);
  if (!isAuthorized) {
    console.log(`ws-connect: Not authorized to access brainstorm ${brainstormId}`);
    return {statusCode: 401};
  }

  const connectionId = event.requestContext.connectionId;
  const data = await arc.tables();

  // Add the connection to a brainstorm
  const connections = await data.brainstormConnections.get({ brainstormId });
  if (!connections) {
    await data.brainstormConnections.put({
      brainstormId,
      connectionIds: data._doc.createSet([connectionId])
    });
  } else {
    await data.brainstormConnections.update({
      Key: {
        brainstormId
      },
      UpdateExpression:  'ADD connectionIds :connectionId',
      ExpressionAttributeValues: {
        ':connectionId': data._doc.createSet([connectionId])
      },
      ReturnValues : "UPDATED_NEW"
    });
  }

  // Add a reverse lookup
  await data.connectionBrainstorm.put({
    connectionId,
    brainstormId
  });

  return {statusCode: 200}
}
