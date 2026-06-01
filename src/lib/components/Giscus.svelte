<script>
  import { onMount } from 'svelte';
  import {
    PUBLIC_GISCUS_REPO,
    PUBLIC_GISCUS_REPO_ID,
    PUBLIC_GISCUS_CATEGORY,
    PUBLIC_GISCUS_CATEGORY_ID
  } from '$env/static/public';

  let {
    mapping = 'pathname',
    theme = 'dark',
    lang = 'en'
  } = $props();

  let container = $state(null);

  const repo = PUBLIC_GISCUS_REPO;
  const repoId = PUBLIC_GISCUS_REPO_ID;
  const category = PUBLIC_GISCUS_CATEGORY;
  const categoryId = PUBLIC_GISCUS_CATEGORY_ID;
  const configured = repo && repoId && category && categoryId;

  onMount(() => {
    if (!configured || !container) return;
    const s = document.createElement('script');
    s.src = 'https://giscus.app/client.js';
    s.async = true;
    s.crossOrigin = 'anonymous';
    s.setAttribute('data-repo', repo);
    s.setAttribute('data-repo-id', repoId);
    s.setAttribute('data-category', category);
    s.setAttribute('data-category-id', categoryId);
    s.setAttribute('data-mapping', mapping);
    s.setAttribute('data-strict', '1');
    s.setAttribute('data-reactions-enabled', '1');
    s.setAttribute('data-emit-metadata', '0');
    s.setAttribute('data-input-position', 'top');
    s.setAttribute('data-theme', theme);
    s.setAttribute('data-lang', lang);
    s.setAttribute('data-loading', 'lazy');
    container.appendChild(s);
    return () => {
      if (container) container.innerHTML = '';
    };
  });
</script>

{#if configured}
  <div bind:this={container} class="giscus-container"></div>
{:else}
  <p class="giscus-unconfigured">Comments are not configured yet.</p>
{/if}

<style>
  .giscus-container {
    margin-top: 1rem;
  }
  .giscus-unconfigured {
    opacity: 0.6;
    font-size: 0.9rem;
  }
</style>
