@app
hundredtoone

@ws

@http
post /brainstorm
get /brainstorm/:id

@tables
brainstorms
  encrypt true
  id *Number
  title String
  password String
ws
  brainstormId *String
  connectionIds StringSet

@static
