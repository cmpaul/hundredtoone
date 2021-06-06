const body = `
<!DOCTYPE html>
<html lang='en'>
<head>
	<meta charset='utf-8'>
	<meta name='viewport' content='width=device-width,initial-scale=1'>

	<title>hundredto.one</title>

	<link rel='icon' type='image/png' href='/favicon.png'>
	<link rel='stylesheet' href='/global.css'>
	<link rel='stylesheet' href='/build/bundle.css'>
	<link href='https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/css/bootstrap.min.css' rel='stylesheet' integrity='sha384-+0n0xVW2eSR5OomGNYDnhzAbDsOXxcvSN1TPprVMTNDbiYZCxYbOOl7+AMvyTG2x' crossorigin='anonymous'>
  <script type='text/javascript'>
    window.sessionId = 'SESSION_ID';
  </script>

	<script defer src='/build/bundle.js'></script>
	<script defer src='https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/js/bootstrap.bundle.min.js' integrity='sha384-gtEjrD/SeCtmISkJkNUaaKMoLD0//ElJ19smozuHV6z3Iehds+3Ulb9Bn9Plx0x4' crossorigin='anonymous'></script>
</head>

<body>
</body>
</html>
`;

exports.handler = async function http (req) {
  console.log(`GET /session called with ${JSON.stringify(req.pathParameters)}`)
  const sessionId = req.pathParameters['sessionId'];
  return {
    statusCode: 200,
    headers: { 'content-type': 'text/html; charset=utf8' },
    body: body.replace('SESSION_ID', sessionId)
  }
}