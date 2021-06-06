@app
hundredtoone

@ws
# no further config required
# client code is in /public
# serverless code is in /src/ws/*

@http
post /brainstorm
get /brainstorm/:id

@tables
brainstorms
  encrypt true
  id *String
  title String
  password String

@static
