const arc = require("@architect/functions");

const Hashids = require('hashids/cjs');
const hashids = new Hashids();

module.exports = {
  /**
   * Returns a brainstorm for the given ID.
   * @param {String} hashedId 
   * @returns Object
   * @async
   */
  find: async (hashedId) => {
    if (!hashedId) return null;

    const id = parseInt(hashids.decode(hashedId));
    const data = await arc.tables();
    const brainstorm = await data.brainstorms.get({ id });
    if (!brainstorm) {
      console.log(`No brainstorm found for id ${hashedId} (${id})`);
    }

    return brainstorm;
  },

  create: async(props) => {
    const id = parseInt(String(~~(Math.random() * 9999)) + ~~(Date.now() / 1000));
    const data = await arc.tables();
    const brainstorm = await data.brainstorms.put({ id, ...props });
    return brainstorm;
  },

  addConnectionId: async (hashedId, connectionId) => {
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