<script>
  import { goto } from '$app/navigation';
  import { base } from '$app/paths';
  import { onMount, onDestroy, tick } from 'svelte';
  import { ARTICLES, fmtDate } from '$lib/data.js';
  import { t, loc, lang } from '$lib/i18n.js';
  import TagPill from '$lib/components/TagPill.svelte';
  import SectionHead from '$lib/components/SectionHead.svelte';
  import ArticleList from '$lib/components/ArticleList.svelte';
  import Icons from '$lib/components/icons.svelte';
  import Bookmark from '$lib/components/Bookmark.svelte';
  import Heart from '$lib/components/Heart.svelte';

  const enModules = import.meta.glob('/src/content/articles/*/en.svx', { eager: true });
  const frModules = import.meta.glob('/src/content/articles/*/fr.svx', { eager: true });

  let { data } = $props();
  const article = $derived(data.article);
  const la = $derived($loc(article));

  const ContentEn = $derived(enModules[`/src/content/articles/${article.slug}/en.svx`]?.default);
  const ContentFr = $derived(frModules[`/src/content/articles/${article.slug}/fr.svx`]?.default);
  const Content = $derived($lang === 'fr' && ContentFr ? ContentFr : ContentEn);

  let progress = $state(0);
  let tocActive = $state(null);
  let toc = $state([]);
  let likeOn = $state(false);
  let bookmark = $state(false);
  let draft = $state('');
  let comments = $state([
    {
      author: 'Marie L.',
      avatar: 'M',
      time: '2 days ago',
      text: "This crystallized something I've been chewing on for months. The 'second model as verifier' insight in particular: I'd been trying to use the same model and getting confidently agreeable feedback."
    },
    {
      author: 'Karim B.',
      avatar: 'K',
      time: '4 days ago',
      text: 'Curious how you handle flaky third-party APIs in this loop. Do you mock at the boundary or accept the noise?'
    }
  ]);

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

  function submitComment(e) {
    e.preventDefault();
    if (!draft.trim()) return;
    comments = [{ author: 'You', avatar: 'Y', time: 'just now', text: draft.trim() }, ...comments];
    draft = '';
  }
</script>

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
        <button
          class="icon-btn {bookmark ? 'is-on' : ''}"
          onclick={() => (bookmark = !bookmark)}
          title="Bookmark"
        >
          <Bookmark filled={bookmark} />
        </button>
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

      <div class="article-end-actions">
        <button
          class="reaction-btn {likeOn ? 'is-on' : ''}"
          onclick={() => (likeOn = !likeOn)}
        >
          <Heart filled={likeOn} />
          <span>{1247 + (likeOn ? 1 : 0)}</span>
          <span class="reaction-label">{likeOn ? $t.article.liked : $t.article.like}</span>
        </button>
        <button
          class="reaction-btn {bookmark ? 'is-on' : ''}"
          onclick={() => (bookmark = !bookmark)}
        >
          <Bookmark filled={bookmark} />
          <span class="reaction-label">{bookmark ? $t.article.saved : $t.article.save}</span>
        </button>
      </div>

      <section class="comments">
        <h3>{$t.article.commentsTitle(comments.length)}</h3>
        <form class="comment-form" onsubmit={submitComment}>
          <div class="avatar small">Y</div>
          <textarea placeholder={$t.article.commentPlaceholder} bind:value={draft}></textarea>
          <button type="submit" class="btn btn-primary" disabled={!draft.trim()}>{$t.article.commentPost}</button>
        </form>
        <ul class="comment-list">
          {#each comments as c, i (i)}
            <li>
              <div class="avatar small">{c.avatar}</div>
              <div>
                <div class="comment-head">
                  <strong>{c.author}</strong>
                  <span class="dim">{c.time}</span>
                </div>
                <p>{c.text}</p>
              </div>
            </li>
          {/each}
        </ul>
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
