const arc = require("@architect/functions");

const Hashids = require('hashids/cjs');
const hashids = new Hashids();

module.exports = {
  find: async (hashedId) => {
    if (!hashedId) return null;

    const id = parseInt(hashids.decode(hashedId));
    const data = await arc.tables();
    return data.brainstorms.get({ id });
  },

  create: async(props) => {
    const id = parseInt(String(~~(Math.random() * 9999)) + ~~(Date.now() / 1000));
    const data = await arc.tables();
    return data.brainstorms.put({ id, ...props });
  },

  addIdea: async(hashedId, idea) => {
    if (!hashedId) return null;

    const id = parseInt(hashids.decode(hashedId));
    const data = await arc.tables();
    return data.brainstorms.update({
      Key: { id },
      UpdateExpression:  'SET #attrName = list_append(#attrName, :attrValue)',
      ExpressionAttributeNames: {
        '#attrName': 'ideas'
      },
      ExpressionAttributeValues: {
        ':attrValue': [idea]
      },
      ReturnValues : 'UPDATED_NEW'
    });
  },

  addConnectionId: async (hashedId, connectionId) => {
    if (!hashedId) return null;

    const id = parseInt(hashids.decode(hashedId));
    const data = await arc.tables();
    return data.brainstorms.update({
      Key: { id },
      UpdateExpression:  'ADD connectionIds :connectionId',
      ExpressionAttributeValues: {
        ':connectionId': data._doc.createSet([connectionId])
      },
      ReturnValues : 'UPDATED_NEW'
    });
  },

  removeConnectionId: async (hashedId, connectionId) => {
    if (!hashedId) return null;

    const id = parseInt(hashids.decode(hashedId));
    const data = await arc.tables();
    return data.brainstorms.update({
      Key: { id },
      UpdateExpression:  'DELETE connectionIds :connectionId',
      ExpressionAttributeValues: {
        ':connectionId': data._doc.createSet([connectionId])
      },
      ReturnValues : 'UPDATED_NEW'
    });
  }
}