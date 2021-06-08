@app
h2o

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
brainstormConnections
  brainstormId *String
  connectionIds StringSet
connectionBrainstorm
  connectionId *String
  brainstormId String

@static
