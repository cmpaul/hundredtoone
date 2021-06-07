const Hashids = require('hashids/cjs');
const hashids = new Hashids();

module.exports = {
  sanitize: (brainstorm) => {
    if (!brainstorm) return null;

    // Remove the password
    const {password, ...sanitizedBrainstorm} = brainstorm;

    // Hash a numeric ID
    if (sanitizedBrainstorm.hasOwnProperty('id') && typeof sanitizedBrainstorm.id === 'number') {
      sanitizedBrainstorm.id = hashids.encode(sanitizedBrainstorm.id);
    }

    return sanitizedBrainstorm;
  }
}