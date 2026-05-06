<script>
  import { ARTICLES, TAGS } from '$lib/data.js';
  import TagPill from '$lib/components/TagPill.svelte';
  import ArticleList from '$lib/components/ArticleList.svelte';
  import Icons from '$lib/components/icons.svelte';

  let query = $state('');
  let activeTag = $state(null);

  const filtered = $derived(
    ARTICLES.filter((a) => {
      if (activeTag && !a.tags.includes(activeTag)) return false;
      if (query) {
        const q = query.toLowerCase();
        if (!a.title.toLowerCase().includes(q) && !a.excerpt.toLowerCase().includes(q)) return false;
      }
      return true;
    })
  );

  function clearFilters() {
    query = '';
    activeTag = null;
  }
</script>

<div class="page articles-page">
  <header class="page-head">
    <div class="hero-eyebrow">The writing</div>
    <h1 class="page-title">Articles &amp; Guides</h1>
    <p class="page-lede">
      Long-form notes on architecture, the craft of running engineering teams, and the occasional
      dispatch from a hobby project. {ARTICLES.length} pieces.
    </p>
  </header>

  <div class="filters">
    <div class="search-row">
      <Icons name="search" />
      <input
        type="search"
        placeholder="Search titles, topics, ideas…"
        bind:value={query}
      />
      {#if query}
        <button class="search-clear" onclick={() => (query = '')}>✕</button>
      {/if}
    </div>
    <div class="tag-row">
      <button
        class="tag-pill all {!activeTag ? 'is-active' : ''}"
        onclick={() => (activeTag = null)}
      >
        All ({ARTICLES.length})
      </button>
      {#each TAGS as t (t.id)}
        {@const count = ARTICLES.filter((a) => a.tags.includes(t.id)).length}
        {#if count > 0}
          <TagPill
            id={t.id}
            active={activeTag === t.id}
            onclick={() => (activeTag = activeTag === t.id ? null : t.id)}
          />
        {/if}
      {/each}
    </div>
  </div>

  {#if filtered.length === 0}
    <div class="empty-state">
      <p>Nothing matches that filter.</p>
      <button class="btn btn-ghost" onclick={clearFilters}>Clear filters</button>
    </div>
  {:else}
    <ArticleList articles={filtered} variant="stacked" />
  {/if}
</div>
