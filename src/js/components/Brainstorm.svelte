<script>
  export let id;
  export let title;
  export let wsUrl;

  import { Col, Row } from 'sveltestrap';

  let value = '';
  const ws = new WebSocket(wsUrl);
  ws.onopen = () => {
    value += `${new Date(Date.now()).toISOString()} - opened\n`;
    ws.send(JSON.stringify({ getHistory: true }));
  }
  ws.onclose = () => {
    value += `${new Date(Date.now()).toISOString()} - closed\n`;
  }
  ws.onmessage = (e) => {
    const {history, text} = JSON.parse(e.data);
    if (history) {
      if (history.length === 0) return;
      value += history.map(i => i.text).join('\n') + '\n';
    } else {
      value += `${text}\n`;
    }
  }
  ws.onerror = console.log
  const onkeyup = (e) => {
    if (e.key != 'Enter') return;
    const text = e.target.value;
    e.target.value = '';
    ws.send(JSON.stringify({ text }));
  }
</script>

<div class="container">
  <Row>
    <Col>
      <h3>{title === null ? `Brainstorm ${id}` : title}</h3>
    </Col>
  </Row>
  <Row>
    <Col>
      <input on:keyup|preventDefault={onkeyup} placeholder="Type a message and hit Enter..." />
    </Col>
  </Row>
  <Row>
    <Col>
      <textarea bind:value/>
    </Col>
  </Row>
</div>

<style>
  input {
    width: 100%;
    margin-bottom: 20px;
  }
  textarea {
    width: 100%;
    height: 600px;
    font-family:'Courier New', Courier, monospace;
  }
  .container {
    margin-top: 40px;
  }
</style>