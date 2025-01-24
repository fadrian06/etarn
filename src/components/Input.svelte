<script>
  const id = crypto.randomUUID();
</script>

<div class="mb-3 form-floating">
  <input {id} class="form-control" placeholder="" {...$$props} />
  <label for={id}>
    <slot />
  </label>
</div>
