<script>
  import { goto } from '$app/navigation';
  import { base } from '$app/paths';
  import { PROFILE, USES } from '$lib/data.js';
  import { t } from '$lib/i18n.js';
  import SectionHead from '$lib/components/SectionHead.svelte';

  const usesEntries = Object.entries(USES);
</script>

<div class="page about-page">
  <svg class="deco deco-plant" viewBox="0 0 200 260" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <!-- Pot body front -->
    <path d="M58 148 L68 222 L132 222 L142 148 Z" fill="currentColor" fill-opacity="0.82"/>
    <!-- Pot shadow side -->
    <path d="M126 150 L142 150 L132 222 L126 222 Z" fill="currentColor" fill-opacity="0.38"/>
    <!-- Pot rim top -->
    <ellipse cx="100" cy="148" rx="42" ry="12" fill="currentColor" fill-opacity="0.95"/>
    <!-- Pot inner top -->
    <ellipse cx="100" cy="148" rx="35" ry="9" fill="currentColor" fill-opacity="0.38"/>
    <!-- Pot bottom -->
    <ellipse cx="100" cy="222" rx="32" ry="8" fill="currentColor" fill-opacity="0.55"/>
    <!-- Pot highlight -->
    <path d="M72 158 Q68 188 70 218" stroke="white" stroke-width="8" stroke-opacity="0.12" fill="none" stroke-linecap="round"/>
    <!-- Stem -->
    <path d="M100 148 L100 108" stroke="currentColor" stroke-width="7" stroke-opacity="0.8" stroke-linecap="round" fill="none"/>
    <!-- Leaf left large -->
    <path d="M100 122 Q58 106 40 68 Q76 62 100 108" fill="currentColor" fill-opacity="0.88"/>
    <!-- Leaf right large -->
    <path d="M100 116 Q142 98 160 60 Q124 54 100 102" fill="currentColor" fill-opacity="0.68"/>
    <!-- Leaf center front -->
    <path d="M100 135 Q78 96 88 52 Q100 46 112 52 Q122 96 100 135" fill="currentColor" fill-opacity="0.95"/>
    <!-- Leaf left small -->
    <path d="M100 112 Q70 94 66 70 Q88 66 100 100" fill="currentColor" fill-opacity="0.62"/>
    <!-- Leaf right small -->
    <path d="M100 108 Q130 90 134 66 Q112 62 100 96" fill="currentColor" fill-opacity="0.52"/>
  </svg>

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
