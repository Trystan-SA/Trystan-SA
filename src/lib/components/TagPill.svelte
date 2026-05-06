<script>
  import { tagById } from '$lib/utils.js';
  import { lang } from '$lib/i18n.js';

  let { id, onclick = undefined, active = false } = $props();
  const tag = $derived(tagById(id));
  const label = $derived($lang === 'fr' ? (tag.labelFr || tag.label) : tag.label);
</script>

<button
  type="button"
  class="tag-pill {active ? 'is-active' : ''}"
  onclick={onclick}
  style="--tag-color: {tag.color}"
>
  <i class="tag-dot"></i>
  {label}
</button>
