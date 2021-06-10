<script>
  export let ideas;

  import { onMount } from 'svelte';

  onMount(async () => {
    console.log('ideas', ideas);
  });
</script>

<div class="container">
  {#each ideas.reverse() as idea}
    <p>{idea.text}</p>
  {/each}
</div>