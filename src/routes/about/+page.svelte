<script>
  import { goto } from '$app/navigation';
  import { base } from '$app/paths';
  import { t } from '$lib/i18n.js';
  import SectionHead from '$lib/components/SectionHead.svelte';

  const uses = [
    { key: 'AI',                items: ['Claude Code', 'AI agents that review code, specs and Q.A.', 'RAG', 'MCP', 'Local LLM finetuning'] },
    { key: 'Languages',         items: ['TypeScript', 'Go', 'Python', 'bit of Rust', "(and anything really, we are in the AI era, syntax doesn't matter anymore)"] },
    { key: 'Frontend frameworks', items: ['Angular', 'React', 'Svelte'] },
    { key: 'Backend',           items: ['NestJS', 'Fastify', 'Gin', 'Postgres', 'MongoDB'] },
    { key: 'Infrastructure',    items: ['Terraform', 'Ansible', 'Kubernetes', 'Coolify', 'AWS', 'Heroku', 'OVH', 'DigitalOcean', 'Hetzner'] },
    { key: 'CI/CD',             items: ['GitHub Actions', 'Custom hooks', 'AI agents'] },
  ];
</script>

<div class="page about-page">

  <header class="page-head">
    <h1 class="page-title">Trystan Sarrade</h1>
    <p class="page-lede">{$t.profile.tagline}</p>
  </header>

  <div class="about-grid">
    <div class="about-portrait">
      <div class="portrait-frame">
        <img
          src="{base}/trystanx400.jpg"
          alt="Trystan Sarrade"
          width="400"
          height="400"
          decoding="async"
          class="portrait-img"
        />
      </div>
      <dl class="about-facts">
        <div><dt>{$t.about.basedIn}</dt><dd>Bordeaux, France</dd></div>
        <div><dt>{$t.about.currently}</dt><dd>{$t.about.currentlyValue}</dd></div>
        <div>
          <dt>{$t.about.emailLabel}</dt>
          <dd><a href="mailto:trystansarrade@gmail.com">trystansarrade@gmail.com</a></dd>
        </div>
        <div>
          <dt>{$t.about.elsewhere}</dt>
          <dd>
            <a href="https://github.com/Trystan-SA" target="_blank" rel="noopener">GitHub</a>
            <span class="dot">·</span>
            <a href="https://www.linkedin.com/in/trystan-sarrade/" target="_blank" rel="noopener">LinkedIn</a>
          </dd>
        </div>
      </dl>
    </div>

    <div class="about-prose">
      {#each $t.about.prose as p, i (i)}
        <p class={i === 0 ? 'lede-prose' : ''}>{p}</p>
      {/each}

      <h3>{$t.about.whatIWriteHeading}</h3>
      <p>{$t.about.whatIWriteText}</p>

      <h3>{$t.about.reachHeading}</h3>
      <p>{$t.about.reachText}</p>

      <div class="about-actions">
        <button class="btn btn-primary" onclick={() => goto(`${base}/articles/`)}>
          {$t.about.readWritingBtn}
        </button>
        <button class="btn btn-ghost" onclick={() => goto(`${base}/projects/`)}>{$t.about.seeProjectsBtn}</button>
      </div>
    </div>
  </div>

  <section class="section uses-section">
    <SectionHead eyebrow={$t.about.usesEyebrow} title={$t.about.usesTitle} />
    <dl class="uses-list">
      {#each uses as { key, items } (key)}
        <div>
          <dt>{$t.about.usesCategories[key] || key}</dt>
          <dd>{items.join(' · ')}</dd>
        </div>
      {/each}
    </dl>
  </section>
</div>
