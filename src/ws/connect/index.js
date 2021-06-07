/**
 * notes:
 * - verify event.headers.Origin to enforce same-origin
 * - non 200 response will disconnect the client socket
 */

const arc = require("@architect/functions");

exports.handler = async function ws(event) {
  // TODO: Make sure user is auth'd, otherwise redirect to login
  // TODO: Get connectionId and store it
  console.log('ws-connect called with', event)
  return {statusCode: 200}
}
