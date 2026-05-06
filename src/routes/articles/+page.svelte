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

  // Only path guides surface at the top level. Longform guides live inside the
  // path that contains them (e.g. "writing-efficient-prompts" is a step of the
  // "ai-engineering" path).
  const topLevelGuides = $derived(GUIDES.filter((g) => g.kind === 'path'));
  const visibleGuides = $derived(
    activeGuide ? topLevelGuides.filter((g) => g.slug === activeGuide) : topLevelGuides
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

  // Resolve a path step to either an article or a longform guide so paths can
  // mix both. Returns { kind, slug, title, date, readTime, href } or null.
  function resolveStep(slug) {
    const a = ARTICLES.find((x) => x.slug === slug);
    if (a) {
      return {
        kind: 'article',
        slug: a.slug,
        title: a.title,
        date: a.date,
        readTime: a.readTime,
        href: `${base}/article/${a.slug}/`
      };
    }
    const g = GUIDES.find((x) => x.slug === slug && x.kind === 'longform');
    if (g) {
      return {
        kind: 'longform',
        slug: g.slug,
        title: g.title,
        date: g.date,
        readTime: g.readTime,
        href: `${base}/guide/${g.slug}/`
      };
    }
    return null;
  }
</script>

<div class="page articles-page">
  <header class="page-head">
    <div class="hero-eyebrow">The writing</div>
    <h1 class="page-title">Articles &amp; Guides</h1>
    <p class="page-lede">
      Learn here how to ship software that lasts, lead engineering teams that work, and run real
      infrastructure without bleeding cash. {ARTICLES.length} articles, {topLevelGuides.length} guides.
    </p>
  </header>

  <div class="content-with-sidebar {section === 'guides' ? 'is-guides' : ''}">
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
          <span class="sidebar-count">{topLevelGuides.length}</span>
        </span>
        <span class="sidebar-hint">Long-form deep-dives and curated reading paths.</span>
      </button>

      {#if section === 'guides'}
        <ul class="sidebar-chips">
          <li>
            <button
              class="sidebar-chip {!activeGuide ? 'is-active' : ''}"
              title="All guides"
              onclick={() => (activeGuide = null)}
            >
              <GuideIcon slug="all" />
              <span class="sidebar-chip-label">All</span>
            </button>
          </li>
          {#each topLevelGuides as g (g.slug)}
            <li>
              <button
                class="sidebar-chip {activeGuide === g.slug ? 'is-active' : ''}"
                title={g.title}
                onclick={() => (activeGuide = activeGuide === g.slug ? null : g.slug)}
              >
                <GuideIcon slug={g.slug} />
                <span class="sidebar-chip-label">{g.title}</span>
              </button>
            </li>
          {/each}
        </ul>
      {/if}
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
            {#if g.kind === 'longform'}
              <a
                class="longform-card"
                href="{base}/guide/{g.slug}/"
                onclick={(e) => {
                  e.preventDefault();
                  goto(`${base}/guide/${g.slug}/`);
                }}
              >
                <div class="longform-card-eyebrow">
                  <span>Guide</span>
                  <span class="dot">·</span>
                  <span>{g.chapterCount} chapters</span>
                  <span class="dot">·</span>
                  <span>{g.readTime} min</span>
                </div>
                <h3 class="longform-card-title">{g.title}</h3>
                {#if g.subtitle}
                  <p class="longform-card-subtitle">{g.subtitle}</p>
                {/if}
                <p class="longform-card-blurb">{g.blurb}</p>
                <div class="longform-card-foot">
                  <div class="longform-card-tags">
                    {#each g.tags as t (t)}
                      <TagPill id={t} />
                    {/each}
                  </div>
                  <span class="longform-card-cta">Read the guide →</span>
                </div>
              </a>
            {:else}
              <article class="guide-card">
                <header class="guide-card-head">
                  <h3 class="guide-card-title">{g.title}</h3>
                  <span class="guide-card-count">{g.steps.length} steps</span>
                </header>
                <p class="guide-card-blurb">{g.blurb}</p>
                <ol class="guide-steps">
                  {#each g.steps as slug, i (slug)}
                    {@const s = resolveStep(slug)}
                    {#if s}
                      <li>
                        <a
                          href={s.href}
                          class="guide-step {s.kind === 'longform' ? 'is-guide-step' : ''}"
                          onclick={(e) => {
                            e.preventDefault();
                            goto(s.href);
                          }}
                        >
                          <span class="guide-step-num">{String(i + 1).padStart(2, '0')}</span>
                          <span class="guide-step-body">
                            <span class="guide-step-title">
                              {s.title}
                              {#if s.kind === 'longform'}
                                <span class="guide-step-badge">Guide</span>
                              {/if}
                            </span>
                            <span class="guide-step-meta">
                              <time>{fmtDate(s.date)}</time>
                              <span class="dot">·</span>
                              <span>{s.readTime} min</span>
                            </span>
                          </span>
                          <span class="guide-step-arrow">→</span>
                        </a>
                      </li>
                    {/if}
                  {/each}
                </ol>
              </article>
            {/if}
          {/each}
        </div>
      {/if}
    </div>
  </div>
</div>
