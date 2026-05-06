<script>
  import { goto } from '$app/navigation';
  import { base } from '$app/paths';
  import { onMount } from 'svelte';
  import { ARTICLES, TAGS, GUIDES, CATEGORIES } from '$lib/data.js';
  import { t, loc } from '$lib/i18n.js';
  import TagPill from '$lib/components/TagPill.svelte';
  import ArticleList from '$lib/components/ArticleList.svelte';
  import Icons from '$lib/components/icons.svelte';
  import GuideIcon from '$lib/components/GuideIcon.svelte';

  let section = $state('articles'); // 'articles' | 'guides'
  let query = $state('');
  let activeTag = $state(null);
  let activeCategory = $state(null); // category slug or null for all

  const visibleGuides = $derived(
    activeCategory ? GUIDES.filter((g) => g.category === activeCategory) : GUIDES
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
</script>

<div class="page articles-page">
  <svg class="deco deco-pen" viewBox="0 0 200 260" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <!-- Pen body -->
    <rect x="72" y="44" width="56" height="162" rx="28" fill="currentColor" fill-opacity="0.82"/>
    <!-- Pen shadow side -->
    <path d="M116 46 Q128 50 128 72 L128 178 Q128 202 116 206 L120 206 Q134 202 134 178 L134 72 Q134 48 120 46 Z" fill="currentColor" fill-opacity="0.36"/>
    <!-- Cap (top section) -->
    <rect x="74" y="42" width="52" height="58" rx="26" fill="currentColor" fill-opacity="0.97"/>
    <!-- Cap/body separator -->
    <rect x="70" y="92" width="60" height="8" rx="2" fill="currentColor" fill-opacity="0.55"/>
    <!-- Cap clip -->
    <path d="M118 48 L122 92" stroke="currentColor" stroke-width="6" stroke-opacity="0.45" stroke-linecap="round" fill="none"/>
    <ellipse cx="120" cy="48" rx="5" ry="5" fill="currentColor" fill-opacity="0.6"/>
    <!-- Nib section -->
    <path d="M86 200 L100 232 L114 200" fill="currentColor" fill-opacity="0.92"/>
    <!-- Nib slit -->
    <line x1="100" y1="208" x2="100" y2="232" stroke="currentColor" stroke-width="2.5" stroke-opacity="0.28"/>
    <!-- Nib sides -->
    <path d="M86 200 L100 208 L114 200" fill="currentColor" fill-opacity="0.48"/>
    <!-- Body highlight -->
    <path d="M86 58 Q82 108 84 195" stroke="white" stroke-width="9" stroke-opacity="0.13" fill="none" stroke-linecap="round"/>
    <!-- Band ring -->
    <rect x="72" y="138" width="56" height="10" rx="2" fill="currentColor" fill-opacity="0.5"/>
  </svg>

  <header class="page-head">
    <div class="hero-eyebrow">{$t.articles.eyebrow}</div>
    <h1 class="page-title">{$t.articles.title}</h1>
    <p class="page-lede">
      {$t.articles.lede(ARTICLES.length, CATEGORIES.length)}
    </p>
  </header>

  <div class="content-with-sidebar {section === 'guides' ? 'is-guides' : ''}">
    <aside class="content-sidebar">
      <button
        class="sidebar-link {section === 'articles' ? 'is-active' : ''}"
        onclick={() => selectSection('articles')}
      >
        <span class="sidebar-link-row">
          <span>{$t.articles.sectionArticles}</span>
          <span class="sidebar-count">{ARTICLES.length}</span>
        </span>
        <span class="sidebar-hint">{$t.articles.articlesHint}</span>
      </button>

      <button
        class="sidebar-link {section === 'guides' ? 'is-active' : ''}"
        onclick={() => {
          selectSection('guides');
          activeCategory = null;
        }}
      >
        <span class="sidebar-link-row">
          <span>{$t.articles.sectionGuides}</span>
          <span class="sidebar-count">{GUIDES.length}</span>
        </span>
        <span class="sidebar-hint">{$t.articles.guidesHint}</span>
      </button>

      {#if section === 'guides'}
        <ul class="sidebar-chips">
          <li>
            <button
              class="sidebar-chip {!activeCategory ? 'is-active' : ''}"
              title={$t.articles.allGuides}
              onclick={() => (activeCategory = null)}
            >
              <GuideIcon slug="all" />
              <span class="sidebar-chip-label">{$t.articles.allGuides}</span>
            </button>
          </li>
          {#each CATEGORIES as cat (cat.slug)}
            {@const lcat = $loc(cat)}
            <li>
              <button
                class="sidebar-chip {activeCategory === cat.slug ? 'is-active' : ''}"
                title={lcat.title}
                onclick={() => (activeCategory = activeCategory === cat.slug ? null : cat.slug)}
              >
                <GuideIcon slug={cat.slug} />
                <span class="sidebar-chip-label">{lcat.title}</span>
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
            <input type="search" placeholder={$t.articles.searchPlaceholder} bind:value={query} />
            {#if query}
              <button class="search-clear" onclick={() => (query = '')}>✕</button>
            {/if}
          </div>
          <div class="tag-row">
            <button
              class="tag-pill all {!activeTag ? 'is-active' : ''}"
              onclick={() => (activeTag = null)}
            >
              {$t.articles.allFilter(ARTICLES.length)}
            </button>
            {#each TAGS as tag (tag.id)}
              {@const count = ARTICLES.filter((a) => a.tags.includes(tag.id)).length}
              {#if count > 0}
                <TagPill
                  id={tag.id}
                  active={activeTag === tag.id}
                  onclick={() => (activeTag = activeTag === tag.id ? null : tag.id)}
                />
              {/if}
            {/each}
          </div>
        </div>

        {#if filtered.length === 0}
          <div class="empty-state">
            <p>{$t.articles.noResults}</p>
            <button class="btn btn-ghost" onclick={clearFilters}>{$t.articles.clearFilters}</button>
          </div>
        {:else}
          <ArticleList articles={filtered} variant="stacked" />
        {/if}
      {:else}
        <div class="guides-list">
          {#each visibleGuides as g (g.slug)}
            {@const lg = $loc(g)}
            <a
              class="longform-card"
              href="{base}/guide/{g.slug}/"
              onclick={(e) => {
                e.preventDefault();
                goto(`${base}/guide/${g.slug}/`);
              }}
            >
              <div class="longform-card-eyebrow">
                <span>{$t.guide.guideLabel}</span>
                <span class="dot">·</span>
                <span>{g.chapterCount} {$t.common.chapters}</span>
                <span class="dot">·</span>
                <span>{g.readTime} {$t.common.minRead}</span>
              </div>
              <h3 class="longform-card-title">{lg.title}</h3>
              {#if lg.subtitle}
                <p class="longform-card-subtitle">{lg.subtitle}</p>
              {/if}
              <p class="longform-card-blurb">{lg.blurb}</p>
              <div class="longform-card-foot">
                <div class="longform-card-tags">
                  {#each g.tags as tag (tag)}
                    <TagPill id={tag} />
                  {/each}
                </div>
                <span class="longform-card-cta">{$t.articles.readGuide}</span>
              </div>
            </a>
          {/each}
        </div>
      {/if}
    </div>
  </div>
</div>
