let arc = require('@architect/functions');

exports.handler = async function ws(event) {
  const connectionId = event.requestContext.connectionId;

  // Look up the brainstorm
  const data = await arc.tables();
  const { brainstormId } = await data.connectionBrainstorm.get({ connectionId });

  // Remove the current connection from the brainstorm's connections
  const connections = await data.brainstormConnections.get({ brainstormId });
  console.log('disconnect connections.length =', connections.connectionIds.values.length);
  if (connections) {
    const result = await data.brainstormConnections.update({
      Key: {
        brainstormId
      },
      UpdateExpression:  'DELETE connectionIds :connectionId',
      ExpressionAttributeValues: {
        ':connectionId': data._doc.createSet([connectionId])
      }
    });
  }

  return { statusCode: 200 };
}
