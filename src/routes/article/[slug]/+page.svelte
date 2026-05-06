<script>
  import { goto } from '$app/navigation';
  import { base } from '$app/paths';
  import { onMount, onDestroy } from 'svelte';
  import { PROFILE, ARTICLES, fmtDate } from '$lib/data.js';
  import { BODIES } from '$lib/article-bodies.js';
  import TagPill from '$lib/components/TagPill.svelte';
  import SectionHead from '$lib/components/SectionHead.svelte';
  import ArticleList from '$lib/components/ArticleList.svelte';
  import Icons from '$lib/components/icons.svelte';
  import Bookmark from '$lib/components/Bookmark.svelte';
  import Heart from '$lib/components/Heart.svelte';
  import CodeBlock from '$lib/components/CodeBlock.svelte';

  let { data } = $props();
  const article = $derived(data.article);
  const blocks = $derived(BODIES[article.body] || []);

  let progress = $state(0);
  let tocActive = $state(null);
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

  function blockId(b, i) {
    return `h-${i}-${b.text.toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 40)}`;
  }

  const toc = $derived(
    blocks
      .map((b, i) => ({ b, i }))
      .filter(({ b }) => b.type === 'h2' || b.type === 'h3')
      .map(({ b, i }) => ({
        id: blockId(b, i),
        text: b.text,
        level: b.type === 'h2' ? 2 : 3
      }))
  );

  const related = $derived(
    ARTICLES.filter((a) => a.slug !== article.slug && a.tags.some((t) => article.tags.includes(t))).slice(0, 3)
  );

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
  <button class="back-link" onclick={() => goto(`${base}/articles/`)}>← All articles</button>

  <header class="article-head">
    <div class="article-tags">
      {#each article.tags as t (t)}
        <TagPill id={t} />
      {/each}
    </div>
    <h1 class="article-title">{article.title}</h1>
    <p class="article-excerpt">{article.excerpt}</p>
    <div class="article-meta">
      <div class="byline">
        <div class="avatar">TS</div>
        <div>
          <div class="byline-name">{PROFILE.name}</div>
          <div class="byline-sub">
            <time>{fmtDate(article.date)}</time>
            <span class="dot">·</span>
            <span>{article.readTime} min read</span>
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
      <div class="toc-label">On this page</div>
      <ul>
        {#each toc as t (t.id)}
          <li class="toc-{t.level} {tocActive === t.id ? 'is-active' : ''}">
            <a href={`#${t.id}`}>{t.text}</a>
          </li>
        {/each}
      </ul>
    </aside>

    <article class="article-body" bind:this={articleEl}>
      {#each blocks as b, i (i)}
        {#if b.type === 'p'}
          <p>{b.text}</p>
        {:else if b.type === 'h2'}
          <h2 id={blockId(b, i)}>{b.text}</h2>
        {:else if b.type === 'h3'}
          <h3 id={blockId(b, i)}>{b.text}</h3>
        {:else if b.type === 'ul'}
          <ul>
            {#each b.items as it (it)}<li>{it}</li>{/each}
          </ul>
        {:else if b.type === 'code'}
          <CodeBlock lang={b.lang} text={b.text} />
        {/if}
      {/each}

      <div class="article-end-actions">
        <button
          class="reaction-btn {likeOn ? 'is-on' : ''}"
          onclick={() => (likeOn = !likeOn)}
        >
          <Heart filled={likeOn} />
          <span>{1247 + (likeOn ? 1 : 0)}</span>
          <span class="reaction-label">{likeOn ? 'Liked' : 'Like'}</span>
        </button>
        <button
          class="reaction-btn {bookmark ? 'is-on' : ''}"
          onclick={() => (bookmark = !bookmark)}
        >
          <Bookmark filled={bookmark} />
          <span class="reaction-label">{bookmark ? 'Saved' : 'Save'}</span>
        </button>
      </div>

      <section class="comments">
        <h3>Comments ({comments.length})</h3>
        <form class="comment-form" onsubmit={submitComment}>
          <div class="avatar small">Y</div>
          <textarea placeholder="Add a comment…" bind:value={draft}></textarea>
          <button type="submit" class="btn btn-primary" disabled={!draft.trim()}>Post</button>
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
          <SectionHead eyebrow="Related" title="If you liked this" />
          <ArticleList articles={related} variant="stacked" />
        </section>
      {/if}
    </article>
  </div>
</div>
