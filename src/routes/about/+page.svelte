<script>
  import { goto } from '$app/navigation';
  import { base } from '$app/paths';
  import { PROFILE, USES } from '$lib/data.js';
  import SectionHead from '$lib/components/SectionHead.svelte';

  const usesEntries = Object.entries(USES);
</script>

<div class="page about-page">
  <header class="page-head">
    <div class="hero-eyebrow">About</div>
    <h1 class="page-title">{PROFILE.name}</h1>
    <p class="page-lede">{PROFILE.tagline}</p>
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
        <div><dt>Based in</dt><dd>{PROFILE.location}</dd></div>
        <div><dt>Currently</dt><dd>at SomanyWays (and on open-source projects)</dd></div>
        <div>
          <dt>Email</dt>
          <dd><a href="mailto:{PROFILE.email}">{PROFILE.email}</a></dd>
        </div>
        <div>
          <dt>Elsewhere</dt>
          <dd>
            <a href={PROFILE.social.github} target="_blank" rel="noopener">GitHub</a>
            <span class="dot">·</span>
            <a href={PROFILE.social.linkedin} target="_blank" rel="noopener">LinkedIn</a>
          </dd>
        </div>
      </dl>
    </div>

    <div class="about-prose">
      <p class="lede-prose">
        I'm a motivated engineer, driven by curiosity and a love for learning. What I care about most
        is having real impact on the ecosystems and organizations I'm part of.
      </p>
      <p>
        My career started as an Ops at a learning-center company, where I grew my engineering skills as
        an autodidact. I then moved into the world of full-stack development and SaaS, and have been
        building products there ever since.
      </p>
      <p>
        What I've learned is that the engineers who can hold both ends in their head at once, the
        engineering side and the product-and-customer side, are the ones who ship things that actually
        matter.
      </p>

      <h3>What I write about</h3>
      <p>
        The four threads I keep returning to: software architecture done honestly, engineering
        leadership at small scale, the practical reality of shipping AI features, and the economics of
        running infrastructure outside of a hyperscaler.
      </p>

      <h3>How to reach me</h3>
      <p>
        Email is best. My AI agent will ping me! I read everything and reply to most things within a
        week.
      </p>

      <div class="about-actions">
        <button class="btn btn-primary" onclick={() => goto(`${base}/articles/`)}>
          Read the writing →
        </button>
        <button class="btn btn-ghost" onclick={() => goto(`${base}/projects/`)}>See projects</button>
      </div>
    </div>
  </div>

  <section class="section uses-section">
    <SectionHead eyebrow="Uses" title="My tools &amp; stack" />
    <dl class="uses-list">
      {#each usesEntries as [k, vs] (k)}
        <div>
          <dt>{k}</dt>
          <dd>{vs.join(' · ')}</dd>
        </div>
      {/each}
    </dl>
  </section>
</div>
