<script>
  let { kind = 'info', children } = $props();
</script>
<aside class="callout callout-{kind}">
  {@render children?.()}
</aside>
