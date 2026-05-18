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

      <div class="availability" aria-label="Freelance availability">
        <div class="availability-hd">
          <span class="availability-pulse" aria-hidden="true"></span>
          <span class="availability-status">{$t.home.availability.status}</span>
          <span class="availability-sep" aria-hidden="true">·</span>
          <span class="availability-tag">{$t.home.availability.tag}</span>
        </div>
        <div class="availability-body">
          <div class="availability-stat">
            <span class="availability-val">2</span>
            <span class="availability-lbl">{$t.home.availability.daysLabel}</span>
          </div>
          <div class="availability-divider" aria-hidden="true"></div>
          <div class="availability-stat">
            <span class="availability-val">600<span class="availability-unit">€</span></span>
            <span class="availability-lbl">{$t.home.availability.rateLabel}</span>
          </div>
          <div class="availability-action">
            <span class="availability-loc" aria-label="Location">
              <svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 22s-7-7.16-7-12a7 7 0 1 1 14 0c0 4.84-7 12-7 12z"/><circle cx="12" cy="10" r="2.5"/></svg>
              {$t.home.availability.location}
            </span>
            <a class="availability-cta" href="mailto:trystan.sarrade@somanyways.co">{$t.home.availability.cta}</a>
          </div>
        </div>
      </div>

      <div class="hero-actions">
        <button class="btn btn-primary" onclick={() => goto(`${base}/projects/`)}>
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
          <li>Working at <a href="https://somanyways.co" target="_blank" rel="noopener">Somanyways</a> as a Senior Fullstack Engineer.</li>
          <li>Released <a href="https://criterium.app" target="_blank" rel="noopener">Criterium.app</a> (follow the link to know what it is about).</li>
          <li>Developing <a href="https://github.com/Trystan-SA/claude-design-system-prompt" target="_blank" rel="noopener">Forgebox</a>, an AI orchestration agent with MicroVMs to improve security.</li>
        </ul>
        <a class="now-more" href="{base}/projects/">{$t.home.nowMoreLink}</a>
      </div>
    </aside>
  </header>

  <section class="section now-section">
    <div class="section-head">
      <div>
        <div class="hero-eyebrow">{$t.home.nowLabel}</div>
        <h2 class="section-title">What I'm working on</h2>
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
