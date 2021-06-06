const arc = require("@architect/functions");
const staticHelper = arc.http.helpers.static;

function getWsUrl() {
  const env = process.env.NODE_ENV
  const testing = 'ws://localhost:3333'
  const deployed = process.env.ARC_WSS_URL;
  const production = 'fixme: these urls are printed after create'
  if (env === 'testing' || env === 'development') {
    return testing;
  }
  return deployed;
}

exports.handler = async function http (req) {
  const sessionId = req.pathParameters['sessionId'];
  
  console.log(`GET /session/:sessionId called with sessionId ${sessionId}`);

  return {
    statusCode: 200,
    headers: { 'content-type': 'text/html; charset=utf8' },
    body: `
      <!DOCTYPE html>
      <html lang='en'>
      <head>
        <meta charset='utf-8'>
        <meta name='viewport' content='width=device-width,initial-scale=1'>
      
        <title>hundredto.one</title>
      
        <link rel='icon' type='image/png' href='/favicon.png'>
        <link rel='stylesheet' href='${staticHelper('/global.css')}'>
        <link rel='stylesheet' href='${staticHelper('/build/bundle.css')}'>
        <link href='https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/css/bootstrap.min.css' rel='stylesheet' integrity='sha384-+0n0xVW2eSR5OomGNYDnhzAbDsOXxcvSN1TPprVMTNDbiYZCxYbOOl7+AMvyTG2x' crossorigin='anonymous'>
        <script type='text/javascript'>
          window.SESSION_ID = '${sessionId}';
          window.WS_URL = '${getWsUrl()}';
        </script>
      
        <script defer src='${staticHelper('/build/bundle.js')}'></script>
        <script defer src='https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/js/bootstrap.bundle.min.js' integrity='sha384-gtEjrD/SeCtmISkJkNUaaKMoLD0//ElJ19smozuHV6z3Iehds+3Ulb9Bn9Plx0x4' crossorigin='anonymous'></script>
      </head>
      
      <body>
      </body>
      </html>`
  }
}