<script>
  import { goto } from '$app/navigation';
  import { base } from '$app/paths';
  import { ARTICLES } from '$lib/data.js';
  import { fmtDate } from '$lib/utils.js';
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
          <li class="tech-chip" title="TypeScript"><img class="tech-chip-icon" src="{base}/icons/typescript.svg" alt="" width="18" height="18" loading="lazy" /><span>TypeScript</span></li>
          <li class="tech-chip" title="Go"><img class="tech-chip-icon" src="{base}/icons/go.svg" alt="" width="18" height="18" loading="lazy" /><span>Go</span></li>
          <li class="tech-chip" title="Angular"><img class="tech-chip-icon" src="{base}/icons/angular.svg" alt="" width="18" height="18" loading="lazy" /><span>Angular</span></li>
          <li class="tech-chip" title="React"><img class="tech-chip-icon" src="{base}/icons/react.svg" alt="" width="18" height="18" loading="lazy" /><span>React</span></li>
          <li class="tech-chip" title="Svelte"><img class="tech-chip-icon" src="{base}/icons/svelte.svg" alt="" width="18" height="18" loading="lazy" /><span>Svelte</span></li>
          <li class="tech-chip" title="Terraform"><img class="tech-chip-icon" src="{base}/icons/terraform.svg" alt="" width="18" height="18" loading="lazy" /><span>Terraform</span></li>
          <li class="tech-chip" title="Ansible"><img class="tech-chip-icon" src="{base}/icons/ansible.svg" alt="" width="18" height="18" loading="lazy" /><span>Ansible</span></li>
          <li class="tech-chip" title="Kubernetes"><img class="tech-chip-icon" src="{base}/icons/kubernetes.svg" alt="" width="18" height="18" loading="lazy" /><span>Kubernetes</span></li>
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
