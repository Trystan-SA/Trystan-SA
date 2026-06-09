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
          <li>Developing <a href="https://github.com/Trystan-SA/forgebox" target="_blank" rel="noopener">Forgebox</a>, an AI orchestration agent with MicroVMs to improve security.</li>
          <li>Released <a href="https://github.com/Trystan-SA/rproc" target="_blank" rel="noopener">rproc</a>, a Linux resource & process monitor in Rust, inspired by the Windows 11 Task Manager.</li>
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
