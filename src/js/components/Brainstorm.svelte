<script>
  export let id;
  export let title;
  export let wsUrl;

  import { Container, Col, Row, InputGroup, Input, Button } from 'sveltestrap';
  import IdeaScroller from './IdeaScroller.svelte';

  let ideas = [];
  const ws = new WebSocket(wsUrl);
  ws.onopen = () => {
    console.log('websocket opened')
    ws.send(JSON.stringify({ getHistory: true }));
  }
  ws.onclose = () => {
    console.log('websocket closed');
  }
  ws.onmessage = (e) => {
    const {history, ...idea} = JSON.parse(e.data);
    let ideasToAdd;
    if (history) {
      if (!Array.isArray(history)) {
        throw new Error('Invalid history type');
      }
      if (history.length === 0) return;
      ideasToAdd = history;
    } else {
      ideasToAdd = [idea];
    }
    // Svelte's reactivity is triggered by assignment, which is why
    // we don't do a push here instead.
    ideas = [...ideas, ...ideasToAdd].sort((a, b) => {
      if (a.createdAt < b.createdAt) return -1;
      if (a.createdAt > b.createdAt) return 1;
      return 0;
    });
  }
  ws.onerror = console.log
  const onkeyup = (e) => {
    if (e.key != 'Enter') return;
    const text = e.target.value;
    e.target.value = '';
    ws.send(JSON.stringify({ text }));
  }
</script>

<div>
  <h3 class="float-right">{ideas.length}</h3>
  <Container fluid>
    <Row>
      <Col>
        <h1>{title === null ? `Brainstorm ${id}` : title}</h1>
      </Col>
    </Row>
    <InputGroup>
      <Input on:keyup={onkeyup} />
      <Button size="sm" color="primary">Add</Button>
    </InputGroup>
    <Row>
      <Col>
        <IdeaScroller {ideas} />
      </Col>
    </Row>
  </Container>
  <div class="footer">
    <div class="d-grid gap-2">
      <Button class="end float-right" color="danger">End</Button>
    </div>
  </div> 
</div>

<style>
  .footer {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    color: white;
    text-align: center;
  }
</style>