let arc = require("@architect/functions");
let static = arc.http.helpers.static;

function getWsUrl() {
  let env = process.env.NODE_ENV
  let testing = 'ws://localhost:3333'
  let staging = 'fixme: these urls are printed after create'
  let production = 'fixme: these urls are printed after create'
  if (env === 'testing')
    return testing
  if (env === 'staging')
    return staging
  if (env === 'production')
    return production
  return testing
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
        <link rel='stylesheet' href='${static('/global.css')}'>
        <link rel='stylesheet' href='${static('/build/bundle.css')}'>
        <link href='https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/css/bootstrap.min.css' rel='stylesheet' integrity='sha384-+0n0xVW2eSR5OomGNYDnhzAbDsOXxcvSN1TPprVMTNDbiYZCxYbOOl7+AMvyTG2x' crossorigin='anonymous'>
        <script type='text/javascript'>
          window.SESSION_ID = '${sessionId}';
          window.WS_URL = '${getWsUrl()}';
        </script>
      
        <script defer src='${static('/build/bundle.js')}'></script>
        <script defer src='https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/js/bootstrap.bundle.min.js' integrity='sha384-gtEjrD/SeCtmISkJkNUaaKMoLD0//ElJ19smozuHV6z3Iehds+3Ulb9Bn9Plx0x4' crossorigin='anonymous'></script>
      </head>
      
      <body>
      </body>
      </html>`
  }
}