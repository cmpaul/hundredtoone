exports.handler = async function http (req) {
  console.log(`POST /session`);
  const maxSessionId = 999999999
  let sessionId = String(~~(Math.random() * maxSessionId)).padStart(maxSessionId.length, '0');
  return {
    headers: {
      'Location': `/session/${sessionId}`
    },
    statusCode: 302
  }
}
