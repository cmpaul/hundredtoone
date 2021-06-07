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
  findBrainstorm: async (hashedId) => {
    if (!hashedId) return null;

    const id = parseInt(hashids.decode(hashedId));
    const data = await arc.tables();
    const brainstorm = await data.brainstorms.get({ id });
    if (!brainstorm) {
      console.log(`No brainstorm found for id ${hashedId} (${id})`);
    }

    return brainstorm;
  }
}