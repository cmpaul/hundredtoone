let arc = require('@architect/functions');
const { isAuthorized } = require('@architect/shared/auth');
const { find, addIdea } = require('@architect/shared/brainstorms');

exports.handler = async function ws(event) {
  const connectionId = event.requestContext.connectionId
  const {getHistory, ...idea} = JSON.parse(event.body);

  // Look up the brainstorm
  const data = await arc.tables();
  const { brainstormId } = await data.connectionBrainstorm.get({ connectionId });

  const brainstorm = await find(brainstormId);
  if (!brainstorm) {
    console.log(`ws-connect: No brainstorm found for ID ${brainstormId}`);
    return { statusCode: 404 };
  }

  const isAuthed = await isAuthorized(event, brainstormId);
  if (!isAuthed) {
    console.log(`ws-connect: Not authorized to access brainstorm ${brainstormId}`);
    return { statusCode: 401 };
  }

  if (getHistory) {
    // Allow history to be sent when requested. I'm not relying on the history
    // being rendered to the page, because there could be a delay between page load
    // and WS connection, resulting in a gap of items.
    if (brainstorm.ideas.length > 0) {
      await arc.ws.send({
        id: connectionId,
        payload: { history: brainstorm.ideas }
      });
    }
  } else {
    const newIdea = {
      ...idea,
      stars: 0,
      createdAt: Date.now(),
      createdBy: connectionId // TODO: Figure out user mapping (likely store on session)
    }
    await addIdea(brainstormId, newIdea);
  
    // Broadcast the message to everyone listening
    const broadcasts = brainstorm.connectionIds.values.map((connectionId) => {
      arc.ws.send({
        id: connectionId,
        payload: newIdea
      });
    });
    await Promise.all(broadcasts);
  }

  return { statusCode: 200 };
}
