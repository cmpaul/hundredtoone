@app
h2o

@ws

@http
post /brainstorm
get /brainstorm/:id

@tables
brainstorms
  encrypt true
  expires TTL
  id *Number
  title String
  password String
  createdAt Date
  endedAt Date
  connectionIds StringSet
  ideas List
connectionBrainstorm
  expires TTL
  connectionId *String
  brainstormId String

@static
