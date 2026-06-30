<script>
  import { goto } from '$app/navigation';
  import { base } from '$app/paths';
  import { t } from '$lib/i18n.js';
  import HeroRain from '$lib/components/HeroRain.svelte';
</script>

<div class="page home">
  <header class="hero hero-split">
    <HeroRain />
    <div class="hero-split-left">
      <h1 class="hero-name display" aria-label="Trystan Sarrade">
        <span class="hero-type">Trystan Sarrade</span><span class="hero-caret" aria-hidden="true"></span>
      </h1>
      <p class="hero-role">{$t.profile.role}</p>
      <p class="hero-bio">{$t.profile.bio}</p>

      <div class="hero-actions">
        <a class="btn btn-primary" href="mailto:trystansarrade@gmail.com">{$t.home.contactBtn}</a>
        <button class="btn btn-ghost" onclick={() => goto(`${base}/projects/`)}>
          {$t.home.readWritingBtn}
        </button>
      </div>
    </div>
    <aside class="hero-split-right">
      <div class="now-card">
        <div class="now-card-hd">
          <span class="now-pulse"></span> {$t.home.nowLabel}
        </div>
        <ul class="now-list">
          {#each $t.home.now as item}
            <li>{@html item}</li>
          {/each}
        </ul>
        <a class="now-more" href="{base}/projects/">{$t.home.nowMoreLink}</a>
      </div>
    </aside>
  </header>

  <section class="section services-section">
    <div class="section-head">
      <div>
        <h2 class="section-title">{$t.home.services.title}</h2>
      </div>
    </div>
    <p class="services-lede">{$t.home.services.lede}</p>
    <div class="services-grid">
      {#each $t.home.services.items as item (item.title)}
        <article class="service-card">
          <h3 class="service-card-title">{item.title}</h3>
          <p class="service-card-text">{item.text}</p>
        </article>
      {/each}
    </div>
  </section>

  <section class="section roi-section">
    <div class="section-head">
      <div>
        <div class="hero-eyebrow">{$t.home.roi.eyebrow}</div>
        <h2 class="section-title">{$t.home.roi.title}</h2>
      </div>
      <a class="section-head-right link-arrow" href="{base}/projects/">{$t.home.nowMoreLink}</a>
    </div>
    <div class="roi-grid">
      {#each $t.home.roi.items as item (item.label)}
        <article class="roi-card">
          <div class="roi-metric">{item.metric}</div>
          <div class="roi-label">{item.label}</div>
          <p class="roi-text">{item.text}</p>
        </article>
      {/each}
    </div>
  </section>

  <section class="section now-section">
    <div class="section-head">
      <div>
        <div class="hero-eyebrow">{$t.home.nowLabel}</div>
        <h2 class="section-title">{$t.home.workingOnTitle}</h2>
      </div>
      <a class="section-head-right link-arrow" href="{base}/projects/">{$t.home.nowMoreLink}</a>
    </div>
    <ul class="now-list large now-section-list">
      {#each $t.home.now as item}
        <li>{@html item}</li>
      {/each}
    </ul>
  </section>
</div>
