<script>
  import { goto } from '$app/navigation';
  import { base } from '$app/paths';
  import { PROFILE, ARTICLES, NOW, TECH, fmtDate } from '$lib/data.js';
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
      <div class="hero-eyebrow">{PROFILE.role.toUpperCase()}</div>
      <h1 class="hero-name display">{PROFILE.name}</h1>
      <p class="hero-bio">{PROFILE.bio}</p>

      <div class="tech-stack" aria-label="Tech stack">
        <div class="tech-stack-label">Stack</div>
        <ul class="tech-stack-list">
          {#each TECH as t (t.slug)}
            <li class="tech-chip" title={t.name}>
              <img
                class="tech-chip-icon"
                src="https://cdn.simpleicons.org/{t.slug}/e08267"
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
          Read the writing →
        </button>
        <button class="btn btn-ghost" onclick={() => goto(`${base}/about/`)}>More about me</button>
      </div>
    </div>
    <aside class="hero-split-right">
      <div class="now-card">
        <div class="now-card-hd">
          <span class="now-pulse"></span> Now
        </div>
        <ul class="now-list">
          {#each NOW.slice(0, 3) as n, i (i)}
            <li>{@html n}</li>
          {/each}
        </ul>
        <a class="now-more" href="{base}/projects/">See the projects page →</a>
      </div>
    </aside>
  </header>

  <section class="section">
    <SectionHead eyebrow="Featured" title="Learn skills that matter" />
    <div class="featured-grid">
      {#each featured as a (a.slug)}
        <article
          class="feat-card"
          onclick={() => goto(`${base}/article/${a.slug}/`)}
          onkeydown={(e) =>
            (e.key === 'Enter' || e.key === ' ') && goto(`${base}/article/${a.slug}/`)}
          role="link"
          tabindex="0"
        >
          <div class="feat-meta">
            <span>{fmtDate(a.date)}</span>
            <span class="dot">·</span>
            <span>{a.readTime} min read</span>
          </div>
          <h3 class="feat-title">{a.title}</h3>
          <p class="feat-excerpt">{a.excerpt}</p>
          <div class="feat-tags">
            {#each a.tags as t (t)}
              <TagPill id={t} />
            {/each}
          </div>
        </article>
      {/each}
    </div>
  </section>

  <section class="section">
    <SectionHead eyebrow="Recent" title="Latest writing">
      {#snippet right()}
        <a href="{base}/articles/" class="link-arrow">All articles ({ARTICLES.length}) →</a>
      {/snippet}
    </SectionHead>
    <ArticleList articles={recent} variant="stacked" />
  </section>

  <section class="section newsletter">
    <div class="newsletter-card">
      <div>
        <div class="newsletter-eyebrow">Newsletter</div>
        <h3 class="newsletter-title">Want to keep updated?</h3>
        <p class="newsletter-sub">
          Software engineering world is fast-paced. Get emails about what is going on right now so you
          never miss a thing!
        </p>
      </div>
      <form class="newsletter-form" onsubmit={subscribe}>
        <input type="email" placeholder="you@domain.com" required bind:value={email} />
        <button type="submit" class="btn btn-primary">Subscribe</button>
      </form>
    </div>
  </section>
</div>
