<script>
  let { slug } = $props();
</script>

{#if slug === 'ai-engineering'}
  <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" class="guide-icon">
    <path
      d="M14 3 H5.5 A2.5 2.5 0 0 0 3 5.5 V18.5 A2.5 2.5 0 0 0 5.5 21 H18.5 A2.5 2.5 0 0 0 21 18.5 V11"
      fill="none"
      stroke="currentColor"
      stroke-width="1.6"
      stroke-linecap="round"
    />
    <text
      x="7"
      y="16"
      font-family="system-ui, -apple-system, sans-serif"
      font-size="8.5"
      font-weight="800"
      fill="currentColor"
    >AI</text>
    <path d="M20 2.5 L20.45 4.55 L22.5 5 L20.45 5.45 L20 7.5 L19.55 5.45 L17.5 5 L19.55 4.55 Z" fill="currentColor" />
    <path d="M22.6 7.5 L22.85 8.4 L23.75 8.65 L22.85 8.9 L22.6 9.8 L22.35 8.9 L21.45 8.65 L22.35 8.4 Z" fill="currentColor" />
  </svg>
{:else if slug === 'software-team-lead'}
  <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" class="guide-icon">
    <circle cx="9" cy="8" r="3" />
    <path d="M3 20 c 0 -3.3 2.7 -6 6 -6 s 6 2.7 6 6" />
    <circle cx="17" cy="6" r="2.3" />
    <path d="M14.5 13 c 1 -0.6 2.2 -1 3.5 -1 c 2 0 3.5 1 3.5 3" />
  </svg>
{:else if slug === 'devops'}
  <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" class="guide-icon">
    <rect x="3" y="4" width="18" height="5" rx="1.2" />
    <rect x="3" y="11" width="18" height="5" rx="1.2" />
    <circle cx="6.5" cy="6.5" r="0.7" fill="currentColor" stroke="none" />
    <circle cx="6.5" cy="13.5" r="0.7" fill="currentColor" stroke="none" />
    <path d="M9 20 h 6" />
    <path d="M12 16 v 4" />
  </svg>
{:else if slug === 'security'}
  <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" class="guide-icon">
    <path d="M12 3 L20 6 V12 c 0 4.5 -3.4 7.7 -8 9 c -4.6 -1.3 -8 -4.5 -8 -9 V6 Z" />
    <path d="M9 12 l 2 2 l 4 -4" />
  </svg>
{:else if slug === 'architecture'}
  <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" class="guide-icon">
    <rect x="3" y="3" width="8" height="8" rx="1" />
    <rect x="13" y="3" width="8" height="8" rx="1" />
    <rect x="3" y="13" width="8" height="8" rx="1" />
    <rect x="13" y="13" width="8" height="8" rx="1" />
  </svg>
{:else if slug === 'all'}
  <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" fill="currentColor" class="guide-icon">
    <circle cx="6" cy="6" r="1.6" />
    <circle cx="12" cy="6" r="1.6" />
    <circle cx="18" cy="6" r="1.6" />
    <circle cx="6" cy="12" r="1.6" />
    <circle cx="12" cy="12" r="1.6" />
    <circle cx="18" cy="12" r="1.6" />
    <circle cx="6" cy="18" r="1.6" />
    <circle cx="12" cy="18" r="1.6" />
    <circle cx="18" cy="18" r="1.6" />
  </svg>
{/if}
