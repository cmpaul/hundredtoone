<script>
  import { Styles } from 'sveltestrap';
  import Brainstorm from './components/Brainstorm.svelte';
  import BrainstormPassword from './components/BrainstormPassword.svelte';
  import Nav from './components/Nav.svelte';

  const {needsAuth, ...brainstorm} = window.HUNDRED_TO_ONE;
</script>

<main>
  <Styles />
  <Nav />

  {#if brainstorm.id}
    {#if needsAuth}
      <BrainstormPassword id={brainstorm.id} />
    {:else}
      <Brainstorm {...brainstorm} />
    {/if}
  {/if}
</main>
