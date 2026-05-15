<script>
  import { base } from '$app/paths';
  import { fmtDate } from '$lib/utils.js';
  import { t, loc } from '$lib/i18n.js';
  import TagPill from './TagPill.svelte';
  import Icons from './icons.svelte';

  let { articles, variant = 'stacked', stats = {} } = $props();

  const nf = new Intl.NumberFormat();
</script>

<div class="article-list variant-{variant}">
  {#each articles as a, i (a.slug)}
    {@const la = $loc(a)}
    {@const s = stats[a.slug]}
    <a
      class="article-row"
      href="{base}/article/{a.slug}/"
      style="animation-delay: {i * 30}ms"
    >
      <div class="article-row-meta">
        <time>{fmtDate(a.date, $t.dateLocale)}</time>
        <span class="dot">·</span>
        <span>{a.readTime} {$t.common.minRead}</span>
        {#if s?.views > 0}
          <span class="dot">·</span>
          <span class="stat" aria-label={$t.article.viewsShort(s.views)}>
            <Icons name="eye" />
            {nf.format(s.views)}
          </span>
        {/if}
        {#if s?.reactions > 0}
          <span class="dot">·</span>
          <span class="stat" aria-label={$t.article.reactionsShort(s.reactions)}>
            <Icons name="heart" />
            {nf.format(s.reactions)}
          </span>
        {/if}
        {#if s?.comments > 0}
          <span class="dot">·</span>
          <span class="stat" aria-label={$t.article.commentsShort(s.comments)}>
            <Icons name="comment" />
            {nf.format(s.comments)}
          </span>
        {/if}
      </div>
      <div class="article-row-body">
        <h3 class="article-row-title">{la.title}</h3>
        <p class="article-row-excerpt">{la.excerpt}</p>
        <div class="article-row-tags">
          {#each a.tags as tag (tag)}
            <TagPill id={tag} />
          {/each}
        </div>
      </div>
      <div class="article-row-arrow">→</div>
    </a>
  {/each}
</div>
