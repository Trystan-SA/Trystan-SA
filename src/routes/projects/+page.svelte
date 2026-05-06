<script>
  import { PROJECTS } from '$lib/data.js';

  const major = PROJECTS.filter((p) => !p.minor);
  const minor = PROJECTS.filter((p) => p.minor);
</script>

<div class="page projects-page">
  <header class="page-head">
    <div class="hero-eyebrow">Projects</div>
    <h1 class="page-title">Things I've built</h1>
    <p class="page-lede">
      A short, honest list. Some shipped, some are still going, all of them taught me something.
    </p>
  </header>

  <div class="projects-list">
    {#each major as p, i (i)}
      <article class="project-row">
        <div class="project-meta">
          <div class="project-year">{p.year}</div>
          <div class="project-role">{p.role}</div>
        </div>
        <div class="project-body">
          <h3 class="project-name">
            {#if p.href && p.href !== '#'}
              <a href={p.href} target="_blank" rel="noopener">
                {p.name} <span class="project-link">↗</span>
              </a>
            {:else}
              {p.name}
            {/if}
            {#if p.wip}<span class="project-wip">WIP</span>{/if}
          </h3>
          <p>{p.description}</p>
          {#if p.highlights && p.highlights.length}
            <div class="project-highlights-wrap">
              <div class="project-highlights-eyebrow">Proud of</div>
              <ul class="project-highlights">
                {#each p.highlights as h (h.title)}
                  <li class="project-highlight">
                    <div class="project-highlight-title">{h.title}</div>
                    <p class="project-highlight-text">{h.text}</p>
                  </li>
                {/each}
              </ul>
            </div>
          {/if}
          <div class="project-stack">
            {#each p.stack as s (s)}
              <span class="stack-chip">{s}</span>
            {/each}
          </div>
        </div>
      </article>
    {/each}
  </div>

  {#if minor.length > 0}
    <div class="projects-divider">
      <span class="projects-divider-label">Earlier &amp; smaller</span>
    </div>
    <div class="projects-list projects-list-minor">
      {#each minor as p, i (i)}
        <article class="project-row is-minor">
          <div class="project-meta">
            <div class="project-year">{p.year}</div>
            <div class="project-role">{p.role}</div>
          </div>
          <div class="project-body">
            <h3 class="project-name">
              {#if p.href && p.href !== '#'}
                <a href={p.href} target="_blank" rel="noopener">
                  {p.name} <span class="project-link">↗</span>
                </a>
              {:else}
                {p.name}
              {/if}
            </h3>
            <p>{p.description}</p>
            <div class="project-stack">
              {#each p.stack as s (s)}
                <span class="stack-chip">{s}</span>
              {/each}
            </div>
          </div>
        </article>
      {/each}
    </div>
  {/if}
</div>
