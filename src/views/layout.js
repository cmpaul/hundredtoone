const arc = require("@architect/functions");
const staticHelper = arc.http.helpers.static;

// TODO: Pull brainstorm stuff into a presenter
const Hashids = require('hashids/cjs');
const hashids = new Hashids();

module.exports = function Layout (props) {
  props = props || {};
  const {password, ...sanitizedBrainstorm} = props.brainstorm;
  console.log(`sanitizedBrainstorm = ${JSON.stringify(sanitizedBrainstorm)}`)
  if (sanitizedBrainstorm.hasOwnProperty('id') && typeof sanitizedBrainstorm.id === 'number') {
    sanitizedBrainstorm.id = hashids.encode(sanitizedBrainstorm.id);
  }

  return `
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
    window.BRAINSTORM = ${JSON.stringify(sanitizedBrainstorm)};
    window.WS_URL = '${process.env.ARC_WSS_URL}';
  </script>

  <script defer src='${staticHelper('/build/bundle.js')}'></script>
  <script defer src='https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/js/bootstrap.bundle.min.js' integrity='sha384-gtEjrD/SeCtmISkJkNUaaKMoLD0//ElJ19smozuHV6z3Iehds+3Ulb9Bn9Plx0x4' crossorigin='anonymous'></script>
</head>

<body>
</body>
</html>`;
}