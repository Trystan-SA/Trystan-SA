<script>
  import { goto } from '$app/navigation';
  import { base } from '$app/paths';
  import { onMount, onDestroy } from 'svelte';
  import { PROFILE, ARTICLES, fmtDate } from '$lib/data.js';
  import TagPill from '$lib/components/TagPill.svelte';
  import SectionHead from '$lib/components/SectionHead.svelte';
  import ArticleList from '$lib/components/ArticleList.svelte';
  import CodeBlock from '$lib/components/CodeBlock.svelte';

  let { data } = $props();
  const guide = $derived(data.guide);
  const body = $derived(data.body);

  let progress = $state(0);
  let activeChapter = $state(null);
  let articleEl = $state(null);

  function chapterId(slug) {
    return `ch-${slug}`;
  }

  function blockId(chSlug, i) {
    return `${chSlug}-h-${i}`;
  }

  const related = $derived(
    (guide.relatedArticles || [])
      .map((slug) => ARTICLES.find((a) => a.slug === slug))
      .filter(Boolean)
  );

  function onScroll() {
    const el = articleEl;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const h = el.offsetHeight - window.innerHeight;
    const p = Math.max(0, Math.min(1, -r.top / Math.max(1, h)));
    progress = p;

    const headings = el.querySelectorAll('h2[data-chapter]');
    let active = null;
    headings.forEach((hh) => {
      const top = hh.getBoundingClientRect().top;
      if (top < 140) active = hh.dataset.chapter;
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
  <button class="back-link" onclick={() => goto(`${base}/articles/#guides`)}>← All guides</button>

  <header class="guide-hero">
    <div class="guide-hero-eyebrow">
      <span>Guide</span>
      <span class="dot">·</span>
      <span>{body.chapters.length} chapters</span>
      <span class="dot">·</span>
      <span>{guide.readTime} min</span>
    </div>
    <h1 class="guide-hero-title">{guide.title}</h1>
    <p class="guide-hero-subtitle">{guide.subtitle}</p>

    <div class="guide-hero-meta">
      <div class="byline">
        <div class="avatar">TS</div>
        <div>
          <div class="byline-name">{PROFILE.name}</div>
          <div class="byline-sub">
            <time>Published {fmtDate(guide.date)}</time>
            {#if guide.updated && guide.updated !== guide.date}
              <span class="dot">·</span>
              <time>Updated {fmtDate(guide.updated)}</time>
            {/if}
          </div>
        </div>
      </div>
      <div class="guide-hero-tags">
        {#each guide.tags as t (t)}
          <TagPill id={t} />
        {/each}
      </div>
    </div>
  </header>

  <div class="guide-layout">
    <aside class="guide-toc">
      <div class="toc-label">Chapters</div>
      <ol class="guide-toc-list">
        {#each body.chapters as ch, i (ch.slug)}
          <li class="guide-toc-item {activeChapter === ch.slug ? 'is-active' : ''}">
            <a href={`#${chapterId(ch.slug)}`}>
              <span class="guide-toc-num">{String(i + 1).padStart(2, '0')}</span>
              <span class="guide-toc-text">{ch.title}</span>
            </a>
          </li>
        {/each}
      </ol>
    </aside>

    <article class="guide-body" bind:this={articleEl}>
      {#if body.intro && body.intro.length > 0}
        <section class="guide-intro">
          {#each body.intro as b, i (i)}
            {#if b.type === 'p'}
              <p>{b.text}</p>
            {:else if b.type === 'callout'}
              <aside class="callout callout-{b.kind}">{b.text}</aside>
            {/if}
          {/each}
        </section>
      {/if}

      {#each body.chapters as ch, ci (ch.slug)}
        <section class="guide-chapter" id={chapterId(ch.slug)}>
          <div class="guide-chapter-eyebrow">
            <span class="guide-chapter-num">Chapter {String(ci + 1).padStart(2, '0')}</span>
          </div>
          <h2 class="guide-chapter-title" data-chapter={ch.slug}>{ch.title}</h2>

          {#each ch.blocks as b, i (i)}
            {#if b.type === 'p'}
              <p>{b.text}</p>
            {:else if b.type === 'h3'}
              <h3 id={blockId(ch.slug, i)}>{b.text}</h3>
            {:else if b.type === 'ul'}
              <ul>
                {#each b.items as it (it)}<li>{it}</li>{/each}
              </ul>
            {:else if b.type === 'ol'}
              <ol class="guide-ol">
                {#each b.items as it (it)}<li>{it}</li>{/each}
              </ol>
            {:else if b.type === 'code'}
              <CodeBlock lang={b.lang} text={b.text} />
            {:else if b.type === 'callout'}
              <aside class="callout callout-{b.kind}">{b.text}</aside>
            {:else if b.type === 'quote'}
              <blockquote class="guide-quote">
                <p>{b.text}</p>
                {#if b.who}<cite>— {b.who}</cite>{/if}
              </blockquote>
            {/if}
          {/each}
        </section>
      {/each}

      {#if related.length > 0}
        <section class="guide-related">
          <SectionHead eyebrow="Keep going" title="Articles that build on this" />
          <ArticleList articles={related} variant="stacked" />
        </section>
      {/if}
    </article>
  </div>
</div>
