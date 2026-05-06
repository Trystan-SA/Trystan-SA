<script>
  let { name } = $props();
</script>

{#if name === 'linkedin'}
  <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
    <path
      fill="currentColor"
      d="M13.6 0H2.4A2.4 2.4 0 0 0 0 2.4v11.2A2.4 2.4 0 0 0 2.4 16h11.2a2.4 2.4 0 0 0 2.4-2.4V2.4A2.4 2.4 0 0 0 13.6 0zM4.8 13.6H2.4V6h2.4v7.6zM3.6 4.8a1.4 1.4 0 1 1 0-2.8 1.4 1.4 0 0 1 0 2.8zm10 8.8h-2.4V9.8c0-.9-.4-1.4-1.1-1.4-.8 0-1.3.6-1.3 1.4v3.8H6.4V6h2.3v1c.4-.6 1.1-1.2 2.2-1.2 1.6 0 2.7 1 2.7 3v4.8z"
    />
  </svg>
{:else if name === 'github'}
  <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
    <path
      fill="currentColor"
      d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"
    />
  </svg>
{:else if name === 'star'}
  <svg viewBox="0 0 16 16" width="13" height="13" aria-hidden="true">
    <path
      fill="currentColor"
      d="M8 .25l2.36 4.78 5.27.77-3.81 3.71.9 5.24L8 12.27l-4.72 2.48.9-5.24L.37 5.8l5.27-.77L8 .25z"
    />
  </svg>
{:else if name === 'search'}
  <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
    <circle cx="7" cy="7" r="5" fill="none" stroke="currentColor" stroke-width="1.5" />
    <path d="M11 11l3.5 3.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
  </svg>
{:else if name === 'share'}
  <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
    <circle cx="4" cy="8" r="2" fill="none" stroke="currentColor" stroke-width="1.5" />
    <circle cx="12" cy="3.5" r="2" fill="none" stroke="currentColor" stroke-width="1.5" />
    <circle cx="12" cy="12.5" r="2" fill="none" stroke="currentColor" stroke-width="1.5" />
    <path d="M5.7 7l4.6-2.5M5.7 9l4.6 2.5" stroke="currentColor" stroke-width="1.5" />
  </svg>
{/if}
