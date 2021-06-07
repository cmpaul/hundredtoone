const arc = require("@architect/functions");

module.exports = {
  /**
   * True if user is authorized to access the brainstorm.
   * @param {Object} requestOrEvent 
   * @param {Object} brainstorm
   * @returns boolean 
   * @async
   */
  isAuthorized: async (requestOrEvent, brainstorm) => {
    const session = await arc.http.session.read(requestOrEvent);
    const authorized = session.authorized || {};
    return (!brainstorm.password || authorized[hashedId] !== true);
  }
}