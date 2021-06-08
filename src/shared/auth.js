const arc = require("@architect/functions");

module.exports = {
  /**
   * True if user is authorized to access the brainstorm.
   * @param {Object} requestOrEvent 
   * @param {Object} brainstorm
   * @param {String} hashedId // TODO: Refactor this, not a huge fan of this
   * @returns boolean 
   * @async
   */
  isAuthorized: async (requestOrEvent, brainstorm, hashedId) => {
    const session = await arc.http.session.read(requestOrEvent);
    const authorized = session.authorized || {};
    if (!brainstorm.password) {
      return true;
    }
    return authorized[hashedId] === true;
  }
}