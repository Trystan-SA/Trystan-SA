<script>
  let { filled = false } = $props();
</script>

<svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
  <path
    d="M4 2h8v12l-4-2.5L4 14V2z"
    fill={filled ? 'currentColor' : 'none'}
    stroke="currentColor"
    stroke-width="1.5"
    stroke-linejoin="round"
  />
</svg>
