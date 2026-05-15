<script>
  import { goto } from '$app/navigation';
  import { base } from '$app/paths';
  import { onMount, onDestroy, tick } from 'svelte';
  import { ARTICLES } from '$lib/data.js';
  import { fmtDate } from '$lib/utils.js';
  import { t, loc, lang } from '$lib/i18n.js';
  import TagPill from '$lib/components/TagPill.svelte';
  import SectionHead from '$lib/components/SectionHead.svelte';
  import ArticleList from '$lib/components/ArticleList.svelte';
  import CodeBlock from '$lib/components/CodeBlock.svelte';

  const enModules = import.meta.glob('/src/content/guides/*/*/en.svx', { eager: true });
  const frModules = import.meta.glob('/src/content/guides/*/*/fr.svx', { eager: true });

  let { data } = $props();
  const guide = $derived(data.guide);
  const relatedStats = $derived(data.stats ?? {});
  const lg = $derived($loc(guide));

  const ContentEn = $derived(
    Object.entries(enModules).find(([p]) => p.match(/\/(\d+)-([^/]+)\/en\.svx$/)?.[2] === guide.slug)?.[1]?.default
  );
  const ContentFr = $derived(
    Object.entries(frModules).find(([p]) => p.match(/\/(\d+)-([^/]+)\/fr\.svx$/)?.[2] === guide.slug)?.[1]?.default
  );
  const Content = $derived($lang === 'fr' && ContentFr ? ContentFr : ContentEn);

  let progress = $state(0);
  let activeChapter = $state(null);
  let toc = $state([]);
  let articleEl = $state(null);

  const related = $derived(
    (guide.relatedArticles || [])
      .map((slug) => ARTICLES.find((a) => a.slug === slug))
      .filter(Boolean)
  );

  // Build TOC from H2s and add chapter labels for CSS ::before eyebrow
  $effect(() => {
    const el = articleEl;
    void Content;
    if (!el || typeof window === 'undefined') return;
    tick().then(() => {
      const h2s = Array.from(el.querySelectorAll('h2[id]'));
      toc = h2s.map((h) => ({
        id: h.id,
        text: h.textContent?.trim() ?? ''
      }));
      h2s.forEach((h, i) => {
        h.dataset.label = `${$t.guide.chapterPrefix} ${String(i + 1).padStart(2, '0')}`;
      });
    });
  });

  function onScroll() {
    const el = articleEl;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const h = el.offsetHeight - window.innerHeight;
    const p = Math.max(0, Math.min(1, -r.top / Math.max(1, h)));
    progress = p;

    const headings = el.querySelectorAll('h2[id]');
    let active = null;
    headings.forEach((hh) => {
      const top = hh.getBoundingClientRect().top;
      if (top < 140) active = hh.id;
    });
    activeChapter = active;
  }

  onMount(() => {
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  });
  onDestroy(() => {
    if (typeof window !== 'undefined') window.removeEventListener('scroll', onScroll);
  });
</script>

<div class="reading-progress" style="transform: scaleX({progress})"></div>
<div class="page guide-page">
  <button class="back-link" onclick={() => goto(`${base}/articles/#guides`)}>{$t.guide.backLink}</button>

  <header class="guide-hero">
    <div class="guide-hero-eyebrow">
      <span>{$t.guide.guideLabel}</span>
      <span class="dot">·</span>
      <span>{guide.chapterCount} {$t.common.chapters}</span>
      <span class="dot">·</span>
      <span>{guide.readTime} {$t.common.minRead}</span>
    </div>
    <h1 class="guide-hero-title">{lg.title}</h1>
    <p class="guide-hero-subtitle">{lg.subtitle}</p>

    <div class="guide-hero-meta">
      <div class="byline">
        <div class="avatar">TS</div>
        <div>
          <div class="byline-name">Trystan Sarrade</div>
          <div class="byline-sub">
            <time>{$t.guide.publishedOn(fmtDate(guide.date, $t.dateLocale))}</time>
            {#if guide.updated && guide.updated !== guide.date}
              <span class="dot">·</span>
              <time>{$t.guide.updatedOn(fmtDate(guide.updated, $t.dateLocale))}</time>
            {/if}
          </div>
        </div>
      </div>
      <div class="guide-hero-tags">
        {#each guide.tags as tag (tag)}
          <TagPill id={tag} />
        {/each}
      </div>
    </div>
  </header>

  <div class="guide-layout">
    <aside class="guide-toc">
      <div class="toc-label">{$t.guide.chaptersLabel}</div>
      <ol class="guide-toc-list">
        {#each toc as ch, i (ch.id)}
          <li class="guide-toc-item {activeChapter === ch.id ? 'is-active' : ''}">
            <a href={`#${ch.id}`}>
              <span class="guide-toc-num">{String(i + 1).padStart(2, '0')}</span>
              <span class="guide-toc-text">{ch.text}</span>
            </a>
          </li>
        {/each}
      </ol>
    </aside>

    <article class="guide-body" bind:this={articleEl}>
      <svelte:component this={Content} />

      {#if related.length > 0}
        <section class="guide-related">
          <SectionHead eyebrow={$t.guide.keepGoingEyebrow} title={$t.guide.relatedTitle} />
          <ArticleList articles={related} variant="stacked" stats={relatedStats} />
        </section>
      {/if}
    </article>
  </div>
</div>
