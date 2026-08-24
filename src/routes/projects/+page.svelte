<script>
  import { t, lang } from '$lib/i18n.js';
</script>

<div class="page projects-page">
  <header class="page-head">
    <h1 class="page-title">{$t.projects.title}</h1>
    <p class="page-lede">{$t.projects.lede}</p>
  </header>

  <div class="projects-list">

    <article class="project-row">
      <div class="project-meta">
        <div class="project-year">Nov 2026 – now</div>
        <div class="project-role">AI Product Builder</div>
      </div>
      <div class="project-body">
        <h3 class="project-name">
          <a href="https://hones.fr" target="_blank" rel="noopener">Hones <span class="project-link">↗</span></a>
        </h3>
        {#if $lang === 'fr'}
          <p>Je conçois et livre des produits IA de bout en bout : de la définition du problème et du prototype jusqu'à la mise en production. Architectures agentiques, orchestration de LLM et automatisation des workflows métier.</p>
        {:else}
          <p>I design and ship AI products end to end: from framing the problem and prototyping through to production. Agentic architectures, LLM orchestration, and business workflow automation.</p>
        {/if}
        <div class="project-stack">
          <span class="stack-chip">AI Agents</span>
          <span class="stack-chip">LLM</span>
          <span class="stack-chip">TypeScript</span>
          <span class="stack-chip">Product</span>
        </div>
      </div>
    </article>

    <article class="project-row">
      <div class="project-meta">
        <div class="project-year">Apr 2024 – Nov 2026</div>
        <div class="project-role">Senior Fullstack Engineer · AI & Automation</div>
      </div>
      <div class="project-body">
        <h3 class="project-name">
          <a href="https://somanyways.co" target="_blank" rel="noopener">Somanyways <span class="project-link">↗</span></a>
        </h3>
        {#if $lang === 'fr'}
          <p>Plateforme avec 30 000+ utilisateurs. Tech lead sur l'architecture, la qualité du code et l'évolution produit. J'y ai introduit le spec-driven development avec des LLM agentiques et livré les fonctionnalités clés à forte composante IA (chatbot IA, tableau de bord manager, bilans, modules d'apprentissage, référentiel manager). Côté ingénierie : suppression de Nx, migration de Jest vers Vitest, CI/CD 3× plus rapide, et remplacement de Typeform et Retool par un système de formulaires et des panels d'administration internes.</p>
        {:else}
          <p>Platform with 30K+ users. Tech lead on architecture, code quality, and product evolution. Introduced spec-driven development with agentic LLMs and shipped the core AI-heavy features (AI chatbot, manager dashboard, checkups, learning modules, manager referential). On the engineering side: removed Nx, migrated from Jest to Vitest, made CI/CD 3× faster, and replaced Typeform and Retool with an in-house form system and admin panels.</p>
        {/if}
        <div class="project-highlights-wrap">
          <div class="project-highlights-eyebrow">{$t.projects.proudOf}</div>
          <ul class="project-highlights">
            <li class="project-highlight">
              {#if $lang === 'fr'}
                <div class="project-highlight-title">Seul responsable technique</div>
                <p class="project-highlight-text">Reprise de la pleine propriété technique du SaaS pendant 1 an, après le départ de l'ingénieur senior et du CTO freelance. Front, back, infra, devops.</p>
              {:else}
                <div class="project-highlight-title">Sole technical owner</div>
                <p class="project-highlight-text">Took full technical ownership of the entire SaaS for 1 year, after the Senior engineer and the CTO freelance left the team. Front, back, infra, devops.</p>
              {/if}
            </li>
            <li class="project-highlight">
              {#if $lang === 'fr'}
                <div class="project-highlight-title">Refonte de la base de données legacy</div>
                <p class="project-highlight-text">Migration des tables et du code legacy de l'agence précédente. Renommage et refonte de 15+ tables. Suppression de 10+ tables inutiles (certaines fusionnées en colonnes) et suppression de 13 tables de jonction inutiles (1:m au lieu de m:m). Application des principes de normalisation pour améliorer la clarté et les performances.</p>
              {:else}
                <div class="project-highlight-title">Legacy database overhaul</div>
                <p class="project-highlight-text">Migrated legacy tables and code from the previous agency. Renamed and redesigned 15+ tables. Deleted 10+ useless tables (merged some as columns instead) and removed 13 useless junction tables (1:m instead of m:m). Followed database normalization principles to improve cleanliness and DB performance.</p>
              {/if}
            </li>
            <li class="project-highlight">
              {#if $lang === 'fr'}
                <div class="project-highlight-title">Facture cloud réduite de 80 %</div>
                <p class="project-highlight-text">Migration d'AWS vers Heroku et DigitalOcean, réduisant la facture mensuelle de 450 $+ à 80 $. Les releases sont passées d'un processus stressant de plusieurs heures à des vérifications de 5 minutes après la CI/CD.</p>
              {:else}
                <div class="project-highlight-title">Cut cloud bill 80%</div>
                <p class="project-highlight-text">Migrated off AWS to Heroku and DigitalOcean, dropping the monthly cloud bill from $450+ down to $80. Releases went from a multi-hour stressful process to 5-minute checks after CI/CD completes.</p>
              {/if}
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
        <div class="project-year">Nov 2025 – now</div>
        <div class="project-role">Founder</div>
      </div>
      <div class="project-body">
        <h3 class="project-name">
          <a href="https://criterium.app" target="_blank" rel="noopener">Criterium.app <span class="project-link">↗</span></a>
        </h3>
        {#if $lang === 'fr'}
          <p>SaaS AI native pour la création de cours et de contenu de formation par IA. Avec des activités de podcast, quizz, devoirs et cours entièrement générables par l'IA.</p>
        {:else}
          <p>AI-native SaaS for creating courses and training content with AI. Podcast, quiz, assignment and course activities fully generated by AI.</p>
        {/if}
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
        {#if $lang === 'fr'}
          <p>Innovation et amélioration des processus pédagogiques. Construction et exploitation d'outils informatiques pour optimiser la gestion administrative du centre (NodeJS, TypeScript, PostgreSQL). Configuration et maintenance de Moodle, développement en PHP, administration de serveurs Linux et MySQL. En tant que formateur WordPress, création de supports de formation Qualiopi/CPF et formation de 300+ personnes.</p>
        {:else}
          <p>Innovation and improvement of educational processes. Built and operated IT tools to optimize the center's administrative management (NodeJS, TypeScript, PostgreSQL). Configured and maintained Moodle, developed in PHP, ran Linux servers and administered MySQL. As WordPress trainer, created Qualiopi/CPF training materials and trained 300+ people.</p>
        {/if}
        <div class="project-highlights-wrap">
          <div class="project-highlights-eyebrow">{$t.projects.proudOf}</div>
          <ul class="project-highlights">
            <li class="project-highlight">
              {#if $lang === 'fr'}
                <div class="project-highlight-title">Stack IT construit from scratch</div>
                <p class="project-highlight-text">Passage de zéro IT (site HTML/CSS basique, apprenants suivis par email) à un site WordPress avec paiements intégrés, un LMS Moodle et un serveur Linux auto-géré avec 99,99 % de SLA pendant 7 ans.</p>
              {:else}
                <div class="project-highlight-title">Built the IT stack from scratch</div>
                <p class="project-highlight-text">Went from no IT (basic HTML/CSS site, learners tracked by email) to a WordPress site with integrated payments, a Moodle LMS, and a self-managed Linux server I administered with 99.99% SLA for 7 years.</p>
              {/if}
            </li>
            <li class="project-highlight">
              {#if $lang === 'fr'}
                <div class="project-highlight-title">Ops & certifications rationalisés</div>
                <p class="project-highlight-text">Amélioration globale des opérations, simplification du suivi de la certification Qualiopi et négociation de 2 partenariats de certification pour débloquer l'accès au CPF. Une meilleure automatisation et gestion IT a amélioré le parcours des apprenants de bout en bout.</p>
              {:else}
                <div class="project-highlight-title">Streamlined ops & certifications</div>
                <p class="project-highlight-text">Improved operations across the board, made Qualiopi certification tracking easier, and negotiated 2 certification partnerships to unlock CPF access. Better IT automation and management improved the learners' journey end-to-end.</p>
              {/if}
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
        {#if $lang === 'fr'}
          <p>Plateforme de tickets et de suggestions intégrée à Discord avec un bot.</p>
        {:else}
          <p>Ticket and suggestion platform integrated to Discord with a bot.</p>
        {/if}
        <div class="project-stack">
          <span class="stack-chip">NodeJS</span>
          <span class="stack-chip">Express</span>
          <span class="stack-chip">MySQL</span>
          <span class="stack-chip">Websockets</span>
          <span class="stack-chip">jQuery</span>
        </div>
      </div>
    </article>

  </div>
</div>
