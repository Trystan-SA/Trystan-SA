<script>
  import { base } from '$app/paths';
  import { fmtDate } from '$lib/utils.js';
  import { t, loc } from '$lib/i18n.js';
  import TagPill from './TagPill.svelte';

  let { articles, variant = 'stacked' } = $props();
</script>

<div class="article-list variant-{variant}">
  {#each articles as a, i (a.slug)}
    {@const la = $loc(a)}
    <a
      class="article-row"
      href="{base}/article/{a.slug}/"
      style="animation-delay: {i * 30}ms"
    >
      <div class="article-row-meta">
        <time>{fmtDate(a.date, $t.dateLocale)}</time>
        <span class="dot">·</span>
        <span>{a.readTime} {$t.common.minRead}</span>
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
