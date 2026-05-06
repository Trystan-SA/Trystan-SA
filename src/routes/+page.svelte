<script>
  import { goto } from '$app/navigation';
  import { base } from '$app/paths';
  import { PROFILE, ARTICLES, TECH, fmtDate } from '$lib/data.js';
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
  <svg class="deco deco-coffee" viewBox="0 0 200 260" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <!-- Steam -->
    <path d="M78 78 Q72 61 78 44 Q84 27 78 10" stroke="currentColor" stroke-width="7" fill="none" stroke-opacity="0.55" stroke-linecap="round"/>
    <path d="M100 72 Q94 55 100 38 Q106 21 100 4" stroke="currentColor" stroke-width="7" fill="none" stroke-opacity="0.55" stroke-linecap="round"/>
    <path d="M122 78 Q116 61 122 44 Q128 27 122 10" stroke="currentColor" stroke-width="7" fill="none" stroke-opacity="0.55" stroke-linecap="round"/>
    <!-- Cup body: cubic bezier gives a rounded belly, widest near the bottom -->
    <path d="M55 82 C36 116 38 166 42 192 Q42 208 100 214 Q158 208 158 192 C162 166 164 116 145 82 Z" fill="currentColor" fill-opacity="0.82"/>
    <!-- Shadow side right -->
    <path d="M126 84 L145 82 C164 116 162 166 158 192 Q152 208 140 213 Z" fill="currentColor" fill-opacity="0.38"/>
    <!-- Rim top -->
    <ellipse cx="100" cy="82" rx="45" ry="15" fill="currentColor" fill-opacity="1"/>
    <!-- Coffee surface inside -->
    <ellipse cx="100" cy="82" rx="37" ry="10" fill="currentColor" fill-opacity="0.28"/>
    <!-- Handle outer -->
    <path d="M154 104 Q194 96 194 138 Q194 174 160 166" stroke="currentColor" stroke-width="17" stroke-linecap="round" stroke-opacity="0.78" fill="none"/>
    <!-- Handle inner shadow -->
    <path d="M154 110 Q180 104 180 138 Q180 170 160 162" stroke="currentColor" stroke-width="7" stroke-linecap="round" stroke-opacity="0.32" fill="none"/>
    <!-- Saucer side -->
    <path d="M26 220 Q26 244 100 250 Q174 244 174 220" fill="currentColor" fill-opacity="0.62"/>
    <!-- Saucer top surface -->
    <ellipse cx="100" cy="220" rx="74" ry="18" fill="currentColor" fill-opacity="0.82"/>
    <!-- Saucer shadow right -->
    <path d="M140 220 Q174 220 174 227 Q170 245 152 250 Q148 238 136 232 Z" fill="currentColor" fill-opacity="0.32"/>
    <!-- Saucer center well -->
    <ellipse cx="100" cy="218" rx="30" ry="8" fill="currentColor" fill-opacity="0.45"/>
    <!-- Saucer bottom rim -->
    <ellipse cx="100" cy="248" rx="70" ry="9" fill="currentColor" fill-opacity="0.45"/>
    <!-- Highlight on cup -->
    <path d="M70 96 Q56 144 58 188" stroke="white" stroke-width="10" stroke-opacity="0.13" fill="none" stroke-linecap="round"/>
  </svg>

  <header class="hero hero-split">
    <div class="hero-split-left">
      <div class="hero-eyebrow">{$t.profile.role.toUpperCase()}</div>
      <h1 class="hero-name display">{PROFILE.name}</h1>
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
