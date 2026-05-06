<script>
  import { goto } from '$app/navigation';
  import { base } from '$app/paths';
  import { ARTICLES, TECH, fmtDate } from '$lib/data.js';
  import { t, loc } from '$lib/i18n.js';
  import TagPill from '$lib/components/TagPill.svelte';
  import SectionHead from '$lib/components/SectionHead.svelte';
  import ArticleList from '$lib/components/ArticleList.svelte';

  const featured = ARTICLES.filter((a) => a.featured);
  const recent = ARTICLES.slice(0, 6);

  let email = $state('');
  function subscribe(e) {
    e.preventDefault();
    alert('Subscribed (demo)');
  }
</script>

<div class="page home">
  <header class="hero hero-split">
    <div class="hero-split-left">
      <div class="hero-eyebrow">{$t.profile.role.toUpperCase()}</div>
      <h1 class="hero-name display">Trystan Sarrade</h1>
      <p class="hero-bio">{$t.profile.bio}</p>

      <div class="tech-stack" aria-label="Tech stack">
        <div class="tech-stack-label">{$t.home.stackLabel}</div>
        <ul class="tech-stack-list">
          {#each TECH as t (t.slug)}
            <li class="tech-chip" title={t.name}>
              <img
                class="tech-chip-icon"
                src="{base}/icons/{t.slug}.svg"
                alt=""
                width="18"
                height="18"
                loading="lazy"
              />
              <span>{t.name}</span>
            </li>
          {/each}
        </ul>
      </div>

      <div class="hero-actions">
        <button class="btn btn-primary" onclick={() => goto(`${base}/articles/`)}>
          {$t.home.readWritingBtn}
        </button>
        <button class="btn btn-ghost" onclick={() => goto(`${base}/about/`)}>{$t.home.aboutBtn}</button>
      </div>
    </div>
    <aside class="hero-split-right">
      <div class="now-card">
        <div class="now-card-hd">
          <span class="now-pulse"></span> {$t.home.nowLabel}
        </div>
        <ul class="now-list">
          {#each $t.home.now.slice(0, 3) as n, i (i)}
            <li>{@html n}</li>
          {/each}
        </ul>
        <a class="now-more" href="{base}/projects/">{$t.home.nowMoreLink}</a>
      </div>
    </aside>
  </header>

  <section class="section">
    <SectionHead eyebrow={$t.home.featuredEyebrow} title={$t.home.featuredTitle} />
    <div class="featured-grid">
      {#each featured as a (a.slug)}
        {@const la = $loc(a)}
        <a class="feat-card" href="{base}/article/{a.slug}/">
          <div class="feat-meta">
            <span>{fmtDate(a.date, $t.dateLocale)}</span>
            <span class="dot">·</span>
            <span>{a.readTime} {$t.home.featuredMinRead}</span>
          </div>
          <h3 class="feat-title">{la.title}</h3>
          <p class="feat-excerpt">{la.excerpt}</p>
          <div class="feat-tags">
            {#each a.tags as tag (tag)}
              <TagPill id={tag} />
            {/each}
          </div>
        </a>
      {/each}
    </div>
  </section>

  <section class="section">
    <SectionHead eyebrow={$t.home.recentEyebrow} title={$t.home.recentTitle}>
      {#snippet right()}
        <a href="{base}/articles/" class="link-arrow">{$t.home.allArticlesLink(ARTICLES.length)}</a>
      {/snippet}
    </SectionHead>
    <ArticleList articles={recent} variant="stacked" />
  </section>

  <section class="section newsletter">
    <div class="newsletter-card">
      <div>
        <div class="newsletter-eyebrow">{$t.home.newsletter.eyebrow}</div>
        <h3 class="newsletter-title">{$t.home.newsletter.title}</h3>
        <p class="newsletter-sub">{$t.home.newsletter.sub}</p>
      </div>
      <form class="newsletter-form" onsubmit={subscribe}>
        <input type="email" placeholder={$t.home.newsletter.placeholder} required bind:value={email} />
        <button type="submit" class="btn btn-primary">{$t.home.newsletter.subscribe}</button>
      </form>
    </div>
  </section>
</div>
