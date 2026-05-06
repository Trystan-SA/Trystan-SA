<script>
  import { t } from '$lib/i18n.js';
</script>

<div class="page projects-page">
  <header class="page-head">
    <div class="hero-eyebrow">{$t.projects.eyebrow}</div>
    <h1 class="page-title">{$t.projects.title}</h1>
    <p class="page-lede">{$t.projects.lede}</p>
  </header>

  <div class="projects-list">

    <article class="project-row">
      <div class="project-meta">
        <div class="project-year">2024–now</div>
        <div class="project-role">Senior Fullstack Engineer</div>
      </div>
      <div class="project-body">
        <h3 class="project-name">
          <a href="https://somanyways.co" target="_blank" rel="noopener">Somanyways <span class="project-link">↗</span></a>
        </h3>
        <p>Platform with 30K+ users. Tech lead on architecture, code quality, and product evolution. Removed Nx, migrated from Jest to Vitest, and improved CI/CD speed 3×. Replaced Typeform and Retool with an in-house form system and admin panels. Shipped core features (AI chatbot, manager dashboard, checkups, learning modules, manager referential) and introduced spec-driven development with agentic LLMs.</p>
        <div class="project-highlights-wrap">
          <div class="project-highlights-eyebrow">{$t.projects.proudOf}</div>
          <ul class="project-highlights">
            <li class="project-highlight">
              <div class="project-highlight-title">Sole technical owner</div>
              <p class="project-highlight-text">Took full technical ownership of the entire SaaS after the Senior engineer and the CTO freelance left the team. Front, back, infra, devops.</p>
            </li>
            <li class="project-highlight">
              <div class="project-highlight-title">Legacy database overhaul</div>
              <p class="project-highlight-text">Migrated legacy tables and code from the previous agency. Renamed and redesigned 15+ tables. Deleted 10+ useless tables (merged some as columns instead) and removed 13 useless junction tables (1:m instead of m:m). Followed database normalization principles to improve cleanliness and DB performance.</p>
            </li>
            <li class="project-highlight">
              <div class="project-highlight-title">Cut cloud bill 80%</div>
              <p class="project-highlight-text">Migrated off AWS to Heroku and DigitalOcean, dropping the monthly cloud bill from $450+ down to $80. Releases went from a multi-hour stressful process to 5-minute checks after CI/CD completes.</p>
            </li>
          </ul>
        </div>
        <div class="project-stack">
          <span class="stack-chip">Angular</span>
          <span class="stack-chip">NestJS</span>
          <span class="stack-chip">AWS</span>
          <span class="stack-chip">DDD</span>
          <span class="stack-chip">TDD</span>
          <span class="stack-chip">CI/CD</span>
        </div>
      </div>
    </article>

    <article class="project-row">
      <div class="project-meta">
        <div class="project-year">2026</div>
        <div class="project-role">Open source · Creator</div>
      </div>
      <div class="project-body">
        <h3 class="project-name">
          <a href="https://github.com/Trystan-SA/forgebox" target="_blank" rel="noopener">Forgebox <span class="project-link">↗</span></a>
          <span class="project-wip">WIP</span>
        </h3>
        <p>Open-source AI orchestration platform based on MicroVMs (Firecracker) for security. Written in Golang and Svelte. With tooling, MCP and custom LLM and automation workflow configuration.</p>
        <div class="project-stack">
          <span class="stack-chip">Go</span>
          <span class="stack-chip">Svelte</span>
          <span class="stack-chip">Firecracker</span>
          <span class="stack-chip">MicroVMs</span>
          <span class="stack-chip">MCP</span>
        </div>
      </div>
    </article>

    <article class="project-row">
      <div class="project-meta">
        <div class="project-year">2026</div>
        <div class="project-role">Founder · Architect</div>
      </div>
      <div class="project-body">
        <h3 class="project-name">
          <a href="https://criterium.app" target="_blank" rel="noopener">Criterium.app <span class="project-link">↗</span></a>
        </h3>
        <p>AI chatbot for training centers that answers learners' questions 24/7 from course content. Integrates with Moodle, Canvas and other LMS in five minutes.</p>
        <div class="project-highlights-wrap">
          <div class="project-highlights-eyebrow">{$t.projects.proudOf}</div>
          <ul class="project-highlights">
            <li class="project-highlight">
              <div class="project-highlight-title">3-month solo build</div>
              <p class="project-highlight-text">Built the entire SaaS solo in 3 months, on the side of my full-time job. Leveraged new AI workflows to speed up development by 3×. Releases are one push away. CI/CD and code-quality tooling make day-to-day development a breeze.</p>
            </li>
          </ul>
        </div>
        <div class="project-stack">
          <span class="stack-chip">TypeScript</span>
          <span class="stack-chip">React</span>
          <span class="stack-chip">NestJS</span>
          <span class="stack-chip">Postgres</span>
          <span class="stack-chip">RAG</span>
          <span class="stack-chip">Moodle</span>
          <span class="stack-chip">Canvas</span>
        </div>
      </div>
    </article>

    <article class="project-row">
      <div class="project-meta">
        <div class="project-year">2020–2024</div>
        <div class="project-role">Fullstack Engineer · Ops · Trainer (Freelance)</div>
      </div>
      <div class="project-body">
        <h3 class="project-name">
          <a href="https://comptoirdesredacteurs.fr" target="_blank" rel="noopener">Comptoir Des Rédacteurs <span class="project-link">↗</span></a>
        </h3>
        <p>Innovation and improvement of educational processes. Built and operated IT tools to optimize the center's administrative management (NodeJS, TypeScript, PostgreSQL). Configured and maintained Moodle, developed in PHP, ran Linux servers and administered MySQL. As WordPress trainer, created Qualiopi/CPF training materials and trained 300+ people.</p>
        <div class="project-highlights-wrap">
          <div class="project-highlights-eyebrow">{$t.projects.proudOf}</div>
          <ul class="project-highlights">
            <li class="project-highlight">
              <div class="project-highlight-title">Built the IT stack from scratch</div>
              <p class="project-highlight-text">Went from no IT (basic HTML/CSS site, learners tracked by email) to a WordPress site with integrated payments, a Moodle LMS, and a self-managed Linux server I administered with 99.99% SLA for 7 years.</p>
            </li>
            <li class="project-highlight">
              <div class="project-highlight-title">Streamlined ops & certifications</div>
              <p class="project-highlight-text">Improved operations across the board, made Qualiopi certification tracking easier, and negotiated 2 certification partnerships to unlock CPF access. Better IT automation and management improved the learners' journey end-to-end.</p>
            </li>
            <li class="project-highlight">
              <div class="project-highlight-title">Built a WordPress training program</div>
              <p class="project-highlight-text">Created my own WordPress training, taught it to 300+ people, and generated €150K over 4 years.</p>
            </li>
          </ul>
        </div>
        <div class="project-stack">
          <span class="stack-chip">NodeJS</span>
          <span class="stack-chip">TypeScript</span>
          <span class="stack-chip">PostgreSQL</span>
          <span class="stack-chip">PHP</span>
          <span class="stack-chip">Moodle</span>
          <span class="stack-chip">WordPress</span>
          <span class="stack-chip">Linux</span>
        </div>
      </div>
    </article>

  </div>

  <div class="projects-divider">
    <span class="projects-divider-label">{$t.projects.earlierSmaller}</span>
  </div>

  <div class="projects-list projects-list-minor">

    <article class="project-row is-minor">
      <div class="project-meta">
        <div class="project-year">2019</div>
        <div class="project-role">Junior Fullstack Developer (6 months)</div>
      </div>
      <div class="project-body">
        <h3 class="project-name">Quested</h3>
        <p>Ticket and suggestion platform integrated to Discord with a bot.</p>
        <div class="project-stack">
          <span class="stack-chip">NodeJS</span>
          <span class="stack-chip">Express</span>
          <span class="stack-chip">MySQL</span>
          <span class="stack-chip">Websockets</span>
          <span class="stack-chip">jQuery</span>
        </div>
      </div>
    </article>

    <article class="project-row is-minor">
      <div class="project-meta">
        <div class="project-year">2019</div>
        <div class="project-role">Student (Artfx). Environment & Technical Artist (8 months)</div>
      </div>
      <div class="project-body">
        <h3 class="project-name">
          <a href="https://artfx-school.itch.io/crescentfallsthegame" target="_blank" rel="noopener">Crescent Falls <span class="project-link">↗</span></a>
        </h3>
        <p>An Unreal Engine game made in 8 months as part of a student team. I owned environment art and technical art pipelines. Also took part in 12+ game jams across my 2 years at Artfx.</p>
        <div class="project-stack">
          <span class="stack-chip">Unreal Engine</span>
          <span class="stack-chip">Substance</span>
          <span class="stack-chip">Blender</span>
          <span class="stack-chip">Zbrush</span>
        </div>
      </div>
    </article>

    <article class="project-row is-minor">
      <div class="project-meta">
        <div class="project-year">2015–2018</div>
        <div class="project-role">Creator</div>
      </div>
      <div class="project-body">
        <h3 class="project-name">YouTube channel</h3>
        <p>30K subscribers. Learned editing tools, posted 100+ videos regularly, racked up 2M+ cumulative views.</p>
        <div class="project-stack">
          <span class="stack-chip">Premiere Pro</span>
          <span class="stack-chip">After Effects</span>
          <span class="stack-chip">Photoshop</span>
        </div>
      </div>
    </article>

    <article class="project-row is-minor">
      <div class="project-meta">
        <div class="project-year">2014</div>
        <div class="project-role">Solo developer</div>
      </div>
      <div class="project-body">
        <h3 class="project-name">LogImmoCalcul</h3>
        <p>First paid software, written in Visual Basic. Estimated the price of a house across 150+ settings. Distributed to 100+ students of a learning center.</p>
        <div class="project-stack">
          <span class="stack-chip">Visual Basic</span>
        </div>
      </div>
    </article>

    <article class="project-row is-minor">
      <div class="project-meta">
        <div class="project-year">2011–2013</div>
        <div class="project-role">Co-founder</div>
      </div>
      <div class="project-body">
        <h3 class="project-name">Minecraft server</h3>
        <p>Built a strong Minecraft community over the course of 2 years. 35K+ unique players, 1K+ in donations, up to 65 simultaneous connected users.</p>
        <div class="project-stack">
          <span class="stack-chip">Java</span>
          <span class="stack-chip">Bukkit</span>
          <span class="stack-chip">Linux</span>
          <span class="stack-chip">WordPress</span>
        </div>
      </div>
    </article>

  </div>
</div>
