<script>
  let { filled = false } = $props();
</script>

<svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
  <path
    d="M8 13.5s-5-3.2-5-7A2.7 2.7 0 0 1 5.7 3.8 3 3 0 0 1 8 5.2a3 3 0 0 1 2.3-1.4A2.7 2.7 0 0 1 13 6.5c0 3.8-5 7-5 7z"
    fill={filled ? 'currentColor' : 'none'}
    stroke="currentColor"
    stroke-width="1.5"
    stroke-linejoin="round"
  />
</svg>
