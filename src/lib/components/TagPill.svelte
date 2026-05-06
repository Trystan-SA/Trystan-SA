<script>
  import { tagById } from '$lib/data.js';

  let { id, onclick = undefined, active = false } = $props();
  const t = $derived(tagById(id));
</script>

<button
  type="button"
  class="tag-pill {active ? 'is-active' : ''}"
  onclick={onclick}
  style="--tag-color: {t.color}"
>
  <i class="tag-dot"></i>
  {t.label}
</button>
