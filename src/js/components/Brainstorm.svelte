<div class="container">
  <Row>
    <Col>
      <p>{brainstormTitle === null ? `Brainstorm: ${brainstormId}` : brainstormTitle}</p>
    </Col>
  </Row>
  <Row>
    <Col>
      <input on:keyup|preventDefault={onkeyup}/>
    </Col>
  </Row>
  <Row>
    <Col>
      <textarea bind:value/>
    </Col>
  </Row>
</div>

<script>
  import { Col, Row } from 'sveltestrap';

  let value = '';
  const brainstormId = brainstorm.id;
  const brainstormTitle = brainstorm.title || null;
  const wsUrl = window.WS_URL;
  const ws = new WebSocket(wsUrl);
  ws.onopen = () => {
    value += `${new Date(Date.now()).toISOString()} - opened\n`;
  }
  ws.onclose = () => {
    value += `${new Date(Date.now()).toISOString()} - closed\n`;
  }
  ws.onmessage = (e) => {
    value += `${JSON.parse(e.data).text}\n`;
  }
  ws.onerror = console.log
  const onkeyup = (e) => {
    if (e.key != 'Enter') return;
    const text = e.target.value;
    e.target.value = '';
    ws.send(JSON.stringify({text}));
  }
</script>

<style>
  input {
    width: 100%;
    margin-bottom: 20px;
  }
  textarea {
    width: 100%;
    height: 100%;
    font-family:'Courier New', Courier, monospace;
  }
</style>