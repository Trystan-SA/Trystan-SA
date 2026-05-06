<script>
  import { base } from '$app/paths';
  import { fmtDate } from '$lib/data.js';
  import TagPill from './TagPill.svelte';

  let { articles, variant = 'stacked' } = $props();
</script>

<div class="article-list variant-{variant}">
  {#each articles as a, i (a.slug)}
    <a
      class="article-row"
      href="{base}/article/{a.slug}/"
      style="animation-delay: {i * 30}ms"
    >
      <div class="article-row-meta">
        <time>{fmtDate(a.date)}</time>
        <span class="dot">·</span>
        <span>{a.readTime} min</span>
      </div>
      <div class="article-row-body">
        <h3 class="article-row-title">{a.title}</h3>
        <p class="article-row-excerpt">{a.excerpt}</p>
        <div class="article-row-tags">
          {#each a.tags as t (t)}
            <TagPill id={t} />
          {/each}
        </div>
      </div>
      <div class="article-row-arrow">→</div>
    </a>
  {/each}
</div>
