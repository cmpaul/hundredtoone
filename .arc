@app
hundredtoone

@ws
# no further config required
# client code is in /public
# serverless code is in /src/ws/*

@http
post /session
get /session/:sessionId

@static
