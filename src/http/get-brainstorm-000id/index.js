/**
 * This function looks up a session ID, ensures the user has access to it,
 * and generates the page for the Svelte app and websocket connection.
 */

const arc = require("@architect/functions");
const staticHelper = arc.http.helpers.static;

const Hashids = require('hashids/cjs');
const hashids = new Hashids();

exports.handler = async function http (req) {
  const hashedId = req.pathParameters['id'];
  const id = parseInt(hashids.decode(hashedId));

  // TODO: Check user's session for password

  const data = await arc.tables();
  const brainstorm = await data.brainstorms.get({ id });
  console.log(`GET /brainstorm/:id called with id ${hashedId}: ${JSON.stringify(brainstorm)}`);
  const title = brainstorm.title || null;

  return {
    statusCode: 200,
    headers: { 'content-type': 'text/html; charset=utf8' },
    body: `
      <!DOCTYPE html>
      <html lang='en'>
      <head>
        <meta charset='utf-8'>
        <meta name='viewport' content='width=device-width,initial-scale=1'>
      
        <title>hundredto.one - Brainstorm ${id}</title>
      
        <link rel='icon' type='image/png' href='/favicon.png'>
        <link rel='stylesheet' href='${staticHelper('/global.css')}'>
        <link rel='stylesheet' href='${staticHelper('/build/bundle.css')}'>
        <link href='https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/css/bootstrap.min.css' rel='stylesheet' integrity='sha384-+0n0xVW2eSR5OomGNYDnhzAbDsOXxcvSN1TPprVMTNDbiYZCxYbOOl7+AMvyTG2x' crossorigin='anonymous'>
        <script type='text/javascript'>
          window.BRAINSTORM = {
            id: '${hashedId}',
            title: ${title !== null ? `'${title}'` : 'null'},
          };
          window.WS_URL = '${process.env.ARC_WSS_URL}';
        </script>
      
        <script defer src='${staticHelper('/build/bundle.js')}'></script>
        <script defer src='https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/js/bootstrap.bundle.min.js' integrity='sha384-gtEjrD/SeCtmISkJkNUaaKMoLD0//ElJ19smozuHV6z3Iehds+3Ulb9Bn9Plx0x4' crossorigin='anonymous'></script>
      </head>
      
      <body>
      </body>
      </html>`
  }
}