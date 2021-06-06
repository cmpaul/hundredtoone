<script>
  import { Styles, Col, Row } from 'sveltestrap';
  import Nav from './components/Nav.svelte';

  let sessionId = window.sessionId;
</script>

<main>
  <Styles />
  <Row>
    <Col>
      <Nav />
    </Col>
  </Row>
  <Row>
    <Col>
      <p>Starting session {sessionId}</p>
    </Col>
  </Row>
</main>
