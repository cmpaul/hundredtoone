<script>
  export let id;
</script>

<div class="container">
  <form action="/brainstorm" method="POST">
    <div class="d-grid gap-2 col-lg-4 col-sm-6 mx-auto">
      <input name="id" type="hidden" value={id} />
      <input name="password" type="password" />
      <button class="btn btn-lg btn-primary" type="submit">Submit</button>
    </div>
  </form>
</div>

<style>
  input {
    width: 100%;
    margin-bottom: 20px;
  }
</style>