<script>
  export let id;
  export let title;
  export let wsUrl;

  import { Col, Row } from 'sveltestrap';

  let value = '';
  const ws = new WebSocket(wsUrl + `?id=${id}`);
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

<div class="container">
  <Row>
    <Col>
      <p>{title === null ? `Brainstorm: ${id}` : title}</p>
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