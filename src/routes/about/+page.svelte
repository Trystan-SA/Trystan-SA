<script>
  import { goto } from '$app/navigation';
  import { base } from '$app/paths';
  import { PROFILE, USES } from '$lib/data.js';
  import { t } from '$lib/i18n.js';
  import SectionHead from '$lib/components/SectionHead.svelte';

  const usesEntries = Object.entries(USES);
</script>

<div class="page about-page">

  <header class="page-head">
    <div class="hero-eyebrow">{$t.about.eyebrow}</div>
    <h1 class="page-title">{PROFILE.name}</h1>
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
        <div><dt>{$t.about.basedIn}</dt><dd>{PROFILE.location}</dd></div>
        <div><dt>{$t.about.currently}</dt><dd>{$t.about.currentlyValue}</dd></div>
        <div>
          <dt>{$t.about.emailLabel}</dt>
          <dd><a href="mailto:{PROFILE.email}">{PROFILE.email}</a></dd>
        </div>
        <div>
          <dt>{$t.about.elsewhere}</dt>
          <dd>
            <a href={PROFILE.social.github} target="_blank" rel="noopener">GitHub</a>
            <span class="dot">·</span>
            <a href={PROFILE.social.linkedin} target="_blank" rel="noopener">LinkedIn</a>
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
      {#each usesEntries as [k, vs] (k)}
        <div>
          <dt>{$t.about.usesCategories[k] || k}</dt>
          <dd>{vs.join(' · ')}</dd>
        </div>
      {/each}
    </dl>
  </section>
</div>
