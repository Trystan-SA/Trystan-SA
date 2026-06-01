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
  import Icons from '$lib/components/icons.svelte';
  import Giscus from '$lib/components/Giscus.svelte';

  const enModules = import.meta.glob('/src/content/articles/*/en.svx', { eager: true });
  const frModules = import.meta.glob('/src/content/articles/*/fr.svx', { eager: true });

  let { data } = $props();
  const article = $derived(data.article);
  const la = $derived($loc(article));

  const ContentEn = $derived(enModules[`/src/content/articles/${article.slug}/en.svx`]?.default);
  const ContentFr = $derived(frModules[`/src/content/articles/${article.slug}/fr.svx`]?.default);
  const Content = $derived($lang === 'fr' && ContentFr ? ContentFr : ContentEn);

  const SITE = 'https://trystan-sarrade.com';
  const articleUrl = $derived(`${SITE}/article/${article.slug}/`);
  const jsonLd = $derived(
    JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: la.title,
      description: la.excerpt,
      datePublished: article.date,
      inLanguage: $lang,
      keywords: article.tags.join(', '),
      mainEntityOfPage: { '@type': 'WebPage', '@id': articleUrl },
      author: {
        '@type': 'Person',
        name: 'Trystan Sarrade',
        url: `${SITE}/about/`
      },
      publisher: {
        '@type': 'Person',
        name: 'Trystan Sarrade',
        url: `${SITE}/about/`
      }
    }).replace(/</g, '\\u003c')
  );

  let progress = $state(0);
  let tocActive = $state(null);
  let toc = $state([]);

  let articleEl = $state(null);

  const related = $derived(
    ARTICLES.filter((a) => a.slug !== article.slug && a.tags.some((tag) => article.tags.includes(tag))).slice(0, 3)
  );

  // Rebuild TOC from DOM whenever content or language changes
  $effect(() => {
    const el = articleEl;
    void Content; // track dependency
    if (!el || typeof window === 'undefined') return;
    tick().then(() => {
      const headings = el.querySelectorAll('h2[id], h3[id]');
      toc = Array.from(headings).map((h) => ({
        id: h.id,
        text: h.textContent?.trim() ?? '',
        level: parseInt(h.tagName[1])
      }));
    });
  });

  function onScroll() {
    const el = articleEl;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const h = el.offsetHeight - window.innerHeight;
    const p = Math.max(0, Math.min(1, -r.top / Math.max(1, h)));
    progress = p;

    const headings = el.querySelectorAll('h2[id], h3[id]');
    let active = null;
    headings.forEach((hh) => {
      const top = hh.getBoundingClientRect().top;
      if (top < 120) active = hh.id;
    });
    tocActive = active;
  }

  onMount(() => {
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  });
  onDestroy(() => {
    if (typeof window !== 'undefined') window.removeEventListener('scroll', onScroll);
  });
</script>

<svelte:head>
  <title>{la.title} · Trystan Sarrade</title>
  <meta name="description" content={la.excerpt} />
  <link rel="canonical" href={articleUrl} />
  <meta property="og:type" content="article" />
  <meta property="og:title" content={la.title} />
  <meta property="og:description" content={la.excerpt} />
  <meta property="og:url" content={articleUrl} />
  <meta property="article:published_time" content={article.date} />
  <meta property="article:author" content="Trystan Sarrade" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={la.title} />
  <meta name="twitter:description" content={la.excerpt} />
  {@html `<script type="application/ld+json">${jsonLd}</script>`}
</svelte:head>

<div class="reading-progress" style="transform: scaleX({progress})"></div>
<div class="page article-page">
  <button class="back-link" onclick={() => goto(`${base}/articles/`)}>{$t.article.backLink}</button>

  <header class="article-head">
    <div class="article-tags">
      {#each article.tags as tag (tag)}
        <TagPill id={tag} />
      {/each}
    </div>
    <h1 class="article-title">{la.title}</h1>
    <p class="article-excerpt">{la.excerpt}</p>
    <div class="article-meta">
      <div class="byline">
        <div class="avatar">TS</div>
        <div>
          <div class="byline-name">Trystan Sarrade</div>
          <div class="byline-sub">
            <time>{fmtDate(article.date, $t.dateLocale)}</time>
            <span class="dot">·</span>
            <span>{article.readTime} {$t.article.minRead}</span>
          </div>
        </div>
      </div>
      <div class="article-actions">
        <button class="icon-btn" title="Share" onclick={() => alert('Link copied (demo)')}>
          <Icons name="share" />
        </button>
      </div>
    </div>
  </header>

  <div class="article-layout">
    <aside class="toc">
      <div class="toc-label">{$t.article.onThisPage}</div>
      <ul>
        {#each toc as tocItem (tocItem.id)}
          <li class="toc-{tocItem.level} {tocActive === tocItem.id ? 'is-active' : ''}">
            <a href={`#${tocItem.id}`}>{tocItem.text}</a>
          </li>
        {/each}
      </ul>
    </aside>

    <article class="article-body" bind:this={articleEl}>
      <svelte:component this={Content} />

      <section class="comments">
        <h3>{$t.article.commentsHeading}</h3>
        <Giscus lang={$lang} />
      </section>

      {#if related.length > 0}
        <section class="related">
          <SectionHead eyebrow={$t.article.relatedEyebrow} title={$t.article.relatedTitle} />
          <ArticleList articles={related} variant="stacked" />
        </section>
      {/if}
    </article>
  </div>
</div>
