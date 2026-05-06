<script>
  let { eyebrow, title, right } = $props();
</script>

<div class="section-head">
  <div>
    <div class="hero-eyebrow">{eyebrow}</div>
    <h2 class="section-title">{title}</h2>
  </div>
  {#if right}
    <div class="section-head-right">{@render right()}</div>
  {/if}
</div>
