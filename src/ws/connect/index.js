const arc = require('@architect/functions');
const auth = require('@architect/shared/auth');
const { findBrainstorm } = require('@architect/shared/brainstorms');

// TODO: - verify event.headers.Origin to enforce same-origin
exports.handler = async function ws(event) {
  console.log('ws-connect called with', event)

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

  const connectionId = event.requestContext.connectionId;
  console.log('connectionId', connectionId);
  const data = await arc.tables();
  const connections = await data.ws.get({ brainstormId: hashedId });
  console.log('data keys', Object.keys(data));
  console.log('data.ws keys', Object.keys(data.ws));
  console.log('data.ws keys', Object.keys(data['arc-sessions']));
  if (!connections) {
    const result = await data.ws.put({
      brainstormId: hashedId,
      connectionIds: data._doc.createSet([connectionId])
    });
    console.log('Created!', result);
  } else {
    const returnValue = await data.ws.update({
      Key: {
        brainstormId: hashedId
      },
      UpdateExpression:  'add connectionIds :connectionId',
      ExpressionAttributeValues: {
        ':connectionId': data._doc.createSet([connectionId])
      },
      ReturnValues : "UPDATED_NEW"
    });
    console.log('Updated!', returnValue);
  }


  return {statusCode: 200}
}
