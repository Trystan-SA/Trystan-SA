<script>
  import { goto } from '$app/navigation';
  import { base } from '$app/paths';
  import { onMount } from 'svelte';
  import { ARTICLES, TAGS, GUIDES, fmtDate } from '$lib/data.js';
  import TagPill from '$lib/components/TagPill.svelte';
  import ArticleList from '$lib/components/ArticleList.svelte';
  import Icons from '$lib/components/icons.svelte';
  import GuideIcon from '$lib/components/GuideIcon.svelte';

  let section = $state('articles'); // 'articles' | 'guides'
  let query = $state('');
  let activeTag = $state(null);
  let activeGuide = $state(null); // guide slug or null for all

  const visibleGuides = $derived(
    activeGuide ? GUIDES.filter((g) => g.slug === activeGuide) : GUIDES
  );

  function syncFromHash() {
    section = window.location.hash === '#guides' ? 'guides' : 'articles';
  }

  onMount(() => {
    syncFromHash();
    window.addEventListener('hashchange', syncFromHash);
    return () => window.removeEventListener('hashchange', syncFromHash);
  });

  function selectSection(s) {
    section = s;
    const newHash = s === 'guides' ? '#guides' : '';
    if (window.location.hash !== newHash) {
      history.replaceState(null, '', window.location.pathname + newHash);
    }
  }

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

  function articleBySlug(slug) {
    return ARTICLES.find((a) => a.slug === slug);
  }
</script>

<div class="page articles-page">
  <header class="page-head">
    <div class="hero-eyebrow">The writing</div>
    <h1 class="page-title">Articles &amp; Guides</h1>
    <p class="page-lede">
      Learn here how to ship software that lasts, lead engineering teams that work, and run real
      infrastructure without bleeding cash. {ARTICLES.length} articles, {GUIDES.length} guides.
    </p>
  </header>

  <div class="content-with-sidebar">
    <aside class="content-sidebar">
      <button
        class="sidebar-link {section === 'articles' ? 'is-active' : ''}"
        onclick={() => selectSection('articles')}
      >
        <span class="sidebar-link-row">
          <span>Articles</span>
          <span class="sidebar-count">{ARTICLES.length}</span>
        </span>
        <span class="sidebar-hint">Released over time. Latest first.</span>
      </button>

      <button
        class="sidebar-link {section === 'guides' ? 'is-active' : ''}"
        onclick={() => {
          selectSection('guides');
          activeGuide = null;
        }}
      >
        <span class="sidebar-link-row">
          <span>Guides</span>
          <span class="sidebar-count">{GUIDES.length}</span>
        </span>
        <span class="sidebar-hint">Learning paths, grouped by subject.</span>
      </button>

      <ul class="sidebar-chips">
        <li>
          <button
            class="sidebar-chip {section === 'guides' && !activeGuide ? 'is-active' : ''}"
            title="All guides"
            onclick={() => {
              selectSection('guides');
              activeGuide = null;
            }}
          >
            <GuideIcon slug="all" />
            <span class="sidebar-chip-label">All</span>
          </button>
        </li>
        {#each GUIDES as g (g.slug)}
          <li>
            <button
              class="sidebar-chip {section === 'guides' && activeGuide === g.slug ? 'is-active' : ''}"
              title={g.title}
              onclick={() => {
                selectSection('guides');
                activeGuide = activeGuide === g.slug ? null : g.slug;
              }}
            >
              <GuideIcon slug={g.slug} />
              <span class="sidebar-chip-label">{g.title}</span>
            </button>
          </li>
        {/each}
      </ul>
    </aside>

    <div class="content-main">
      {#if section === 'articles'}
        <div class="filters">
          <div class="search-row">
            <Icons name="search" />
            <input type="search" placeholder="Search titles, topics, ideas…" bind:value={query} />
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
      {:else}
        <div class="guides-list">
          {#each visibleGuides as g (g.slug)}
            <article class="guide-card">
              <header class="guide-card-head">
                <h3 class="guide-card-title">{g.title}</h3>
                <span class="guide-card-count">{g.steps.length} steps</span>
              </header>
              <p class="guide-card-blurb">{g.blurb}</p>
              <ol class="guide-steps">
                {#each g.steps as slug, i (slug)}
                  {@const a = articleBySlug(slug)}
                  {#if a}
                    <li>
                      <a
                        href="{base}/article/{a.slug}/"
                        class="guide-step"
                        onclick={(e) => {
                          e.preventDefault();
                          goto(`${base}/article/${a.slug}/`);
                        }}
                      >
                        <span class="guide-step-num">{String(i + 1).padStart(2, '0')}</span>
                        <span class="guide-step-body">
                          <span class="guide-step-title">{a.title}</span>
                          <span class="guide-step-meta">
                            <time>{fmtDate(a.date)}</time>
                            <span class="dot">·</span>
                            <span>{a.readTime} min</span>
                          </span>
                        </span>
                        <span class="guide-step-arrow">→</span>
                      </a>
                    </li>
                  {/if}
                {/each}
              </ol>
            </article>
          {/each}
        </div>
      {/if}
    </div>
  </div>
</div>
