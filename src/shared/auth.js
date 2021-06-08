const arc = require("@architect/functions");
const { find } = require('./brainstorms');

module.exports = {
  /**
   * True if user is already authorized to access the brainstorm.
   * @param {Object} requestOrEvent 
   * @param {String} hashedId
   * @returns boolean 
   * @async
   */
  isAuthorized: async (requestOrEvent, hashedId) => {
    const session = await arc.http.session.read(requestOrEvent);
    const authorized = session.authorized || {};
    if (authorized[hashedId] === true) {
      return true;
    }

    const brainstorm = await find(hashedId);
    if (!brainstorm.password) {
      return true;
    }

    // User is not yet authorized to access this brainstorm
    return false;
  }
}