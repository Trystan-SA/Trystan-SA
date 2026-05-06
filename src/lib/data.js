// Site content: profile, articles, projects, uses, now

export const PROFILE = {
  name: 'Trystan Sarrade',
  role: 'Software Architect',
  tagline: 'Building SaaS, games, tools and many other things.',
  bio: "I'm a senior software architect deeply passionate about engineering systems that truly work and tackle real-world problems. I write about the messy middle of software, the architectural choices, the team patterns, and the tooling that turns ideas into shipped products.",
  location: 'Bordeaux, France',
  email: 'trystansarrade@gmail.com',
  social: {
    github: 'https://github.com/Trystan-SA',
    linkedin: 'https://www.linkedin.com/in/trystan-sarrade/',
    rss: '/feed.xml'
  }
};

export const TAGS = [
  { id: 'architecture', label: 'Architecture', color: '#7c5cff' },
  { id: 'devops', label: 'DevOps', color: '#1f8a5b' },
  { id: 'ai', label: 'AI / LLMs', color: '#d97757' },
  { id: 'product', label: 'Product', color: '#2a6fdb' },
  { id: 'leadership', label: 'Leadership', color: '#c43d6e' },
  { id: 'oss', label: 'Open Source', color: '#8a6d3b' },
  { id: 'security', label: 'Security', color: '#475569' }
];

export const ARTICLES = [
  {
    slug: 'autonomous-ai-qa-workflow',
    title: 'A fully autonomous AI workflow for the Q.A. Engineer',
    excerpt:
      'How we replaced manual regression suites with a self-correcting agent that reads the spec, runs the app, and files its own bug reports, plus the three guardrails that made it actually reliable.',
    tags: ['ai', 'devops', 'product'],
    date: '2026-04-22',
    readTime: 14,
    featured: true,
    body: 'qa'
  },
  {
    slug: 'hiring-engineers-ai-era',
    title: 'Recruiting meaningful software engineers in the era of AI coding agents',
    excerpt:
      "Code-completion tools have collapsed the value of syntactic fluency. Here's the new interview loop I run, and why I removed the live-coding round entirely.",
    tags: ['leadership', 'ai'],
    date: '2026-04-08',
    readTime: 11,
    featured: true,
    body: 'hiring'
  },
  {
    slug: 'cto-team-management-playbook',
    title: 'The team management playbook every CTO needs',
    excerpt: 'Five rituals I install on day one with any engineering team. None of them are standups.',
    tags: ['leadership', 'product'],
    date: '2026-03-19',
    readTime: 9,
    body: 'playbook'
  },
  {
    slug: 'leaving-aws-saved-70-percent',
    title: 'Reducing 70% of my cloud expenses by leaving AWS',
    excerpt:
      "A blow-by-blow account of migrating a profitable SaaS to a Hetzner + Cloudflare stack. What broke, what didn't, and the spreadsheet that made the case.",
    tags: ['devops', 'architecture'],
    date: '2026-02-27',
    readTime: 18,
    featured: true,
    body: 'aws'
  },
  {
    slug: 'monolith-microservices-decision',
    title: 'The monolith vs. microservices decision, ten years later',
    excerpt:
      "I've shipped both. Here's the framework I now use to choose, and why most teams making the call are answering the wrong question.",
    tags: ['architecture'],
    date: '2026-02-10',
    readTime: 12,
    body: 'mono'
  },
  {
    slug: 'llm-eval-harness',
    title: 'Building an evaluation harness for LLM features in production',
    excerpt:
      "Unit tests don't work. Snapshot tests don't work. Here's what does: a continuous eval pipeline that catches regressions before users do.",
    tags: ['ai', 'devops'],
    date: '2026-01-28',
    readTime: 15,
    body: 'eval'
  },
  {
    slug: 'secure-by-default-saas',
    title: 'A secure-by-default checklist for new SaaS products',
    excerpt:
      "Twenty-three controls to ship on day one. Skip them and you'll pay tenfold during your first SOC 2 audit.",
    tags: ['security', 'architecture'],
    date: '2026-01-12',
    readTime: 10,
    body: 'secure'
  },
  {
    slug: 'open-source-sustainable',
    title: 'How I keep my open-source side projects sustainable',
    excerpt:
      "Maintainer burnout is a feature of the system, not a bug. Here's the structural changes I made.",
    tags: ['oss', 'leadership'],
    date: '2025-12-20',
    readTime: 7,
    body: 'oss'
  },
  {
    slug: 'product-engineer-archetype',
    title: 'The product engineer is the new full-stack',
    excerpt:
      'On the shape of the engineer that ships the most value per quarter, and why traditional ladders fail to recognize them.',
    tags: ['product', 'leadership'],
    date: '2025-12-04',
    readTime: 8,
    body: 'product'
  },
  {
    slug: 'event-driven-pitfalls',
    title: 'Event-driven architecture: the four pitfalls nobody warns you about',
    excerpt:
      "Yes, your team can ship a Kafka cluster in a week. No, that does not mean you've adopted event-driven design.",
    tags: ['architecture', 'devops'],
    date: '2025-11-18',
    readTime: 13,
    body: 'events'
  },
  {
    slug: 'shipping-game-as-architect',
    title: 'Shipping a game on weekends as a working architect',
    excerpt:
      'What architecting enterprise SaaS by day taught me about scoping a game by night, and the things it absolutely did not.',
    tags: ['product', 'oss'],
    date: '2025-10-30',
    readTime: 6,
    body: 'game'
  },
  {
    slug: 'zero-trust-internal-tools',
    title: 'Zero-trust for internal tools, without the vendor sprawl',
    excerpt:
      'How a two-person platform team replaced four SaaS subscriptions with 200 lines of Cloudflare Access policy.',
    tags: ['security', 'devops'],
    date: '2025-10-12',
    readTime: 11,
    body: 'zerotrust'
  }
];

export const PROJECTS = [
  {
    name: 'Somanyways',
    role: 'Senior Fullstack Engineer',
    year: '2024–now',
    description:
      'Platform with 30K+ users. Tech lead on architecture, code quality, and product evolution. Removed Nx, migrated from Jest to Vitest, and improved CI/CD speed 3×. Replaced Typeform and Retool with an in-house form system and admin panels. Shipped core features (AI chatbot, manager dashboard, checkups, learning modules, manager referential) and introduced spec-driven development with agentic LLMs.',
    highlights: [
      {
        title: 'Sole technical owner',
        text: 'Took full technical ownership of the entire SaaS after the Senior engineer and the CTO freelance left the team. Front, back, infra, devops.'
      },
      {
        title: 'Legacy database overhaul',
        text: 'Migrated legacy tables and code from the previous agency. Renamed and redesigned 15+ tables. Deleted 10+ useless tables (merged some as columns instead) and removed 13 useless junction tables (1:m instead of m:m). Followed database normalization principles to improve cleanliness and DB performance.'
      },
      {
        title: 'Cut cloud bill 80%',
        text: 'Migrated off AWS to Heroku and DigitalOcean, dropping the monthly cloud bill from $450+ down to $80. Releases went from a multi-hour stressful process to 5-minute checks after CI/CD completes.'
      }
    ],
    stack: ['Angular', 'NestJS', 'AWS', 'DDD', 'TDD', 'CI/CD'],
    href: 'https://somanyways.co'
  },
  {
    name: 'Forgebox',
    role: 'Open source · Creator',
    year: '2026',
    wip: true,
    description:
      'Open-source AI orchestration platform based on MicroVMs (Firecracker) for security. Written in Golang and Svelte. With tooling, MCP and custom LLM and automation workflow configuration.',
    href: 'https://github.com/Trystan-SA/forgebox',
    stack: ['Go', 'Svelte', 'Firecracker', 'MicroVMs', 'MCP']
  },
  {
    name: 'Criterium.app',
    role: 'Founder · Architect',
    year: '2026',
    description:
      "AI chatbot for training centers that answers learners' questions 24/7 from course content. Integrates with Moodle, Canvas and other LMS in five minutes.",
    highlights: [
      {
        title: '3-month solo build',
        text: 'Built the entire SaaS solo in 3 months, on the side of my full-time job. Leveraged new AI workflows to speed up development by 3×. Releases are one push away. CI/CD and code-quality tooling make day-to-day development a breeze.'
      }
    ],
    stack: ['TypeScript', 'React', 'NestJS', 'Postgres', 'RAG', 'Moodle', 'Canvas'],
    href: 'https://criterium.app'
  },
  {
    name: 'Comptoir Des Rédacteurs',
    role: 'Fullstack Engineer · Ops · Trainer (Freelance)',
    year: '2020–2024',
    description:
      "Innovation and improvement of educational processes. Built and operated IT tools to optimize the center's administrative management (NodeJS, TypeScript, PostgreSQL). Configured and maintained Moodle, developed in PHP, ran Linux servers and administered MySQL. As WordPress trainer, created Qualiopi/CPF training materials and trained 300+ people.",
    highlights: [
      {
        title: 'Built the IT stack from scratch',
        text: 'Went from no IT (basic HTML/CSS site, learners tracked by email) to a WordPress site with integrated payments, a Moodle LMS, and a self-managed Linux server I administered with 99.99% SLA for 7 years.'
      },
      {
        title: 'Streamlined ops & certifications',
        text: "Improved operations across the board, made Qualiopi certification tracking easier, and negotiated 2 certification partnerships to unlock CPF access. Better IT automation and management improved the learners' journey end-to-end."
      },
      {
        title: 'Built a WordPress training program',
        text: 'Created my own WordPress training, taught it to 300+ people, and generated €150K over 4 years.'
      }
    ],
    stack: ['NodeJS', 'TypeScript', 'PostgreSQL', 'PHP', 'Moodle', 'WordPress', 'Linux'],
    href: 'https://comptoirdesredacteurs.fr'
  },
  {
    name: 'Quested',
    role: 'Junior Fullstack Developer (6 months)',
    year: '2019',
    description: 'Ticket and suggestion platform integrated to Discord with a bot.',
    stack: ['NodeJS', 'Express', 'MySQL', 'Websockets', 'jQuery'],
    href: '#',
    minor: true
  },
  {
    name: 'Crescent Falls (video game)',
    role: 'Student (Artfx). Environment & Technical Artist (8 months)',
    year: '2019',
    description:
      'An Unreal Engine game made in 8 months as part of a student team. I owned environment art and technical art pipelines. Also took part in 12+ game jams across my 2 years at Artfx.',
    stack: ['Unreal Engine', 'Substance', 'Blender', 'Zbrush'],
    href: 'https://artfx-school.itch.io/crescentfallsthegame',
    minor: true
  },
  {
    name: 'YouTube channel',
    role: 'Creator',
    year: '2015–2018',
    description:
      '30K subscribers. Learned editing tools, posted 100+ videos regularly, racked up 2M+ cumulative views.',
    stack: ['Premiere Pro', 'After Effects', 'Photoshop'],
    minor: true
  },
  {
    name: 'LogImmoCalcul',
    role: 'Solo developer',
    year: '2014',
    description:
      'First paid software, written in Visual Basic. Estimated the price of a house across 150+ settings. Distributed to 100+ students of a learning center.',
    stack: ['Visual Basic'],
    minor: true
  },
  {
    name: 'Minecraft server',
    role: 'Co-founder',
    year: '2011–2013',
    description:
      'Built a strong Minecraft community over the course of 2 years. 35K+ unique players, 1K+ in donations, up to 65 simultaneous connected users.',
    stack: ['Java', 'Bukkit', 'Linux', 'WordPress'],
    minor: true
  }
];

// Curated learning paths. Each step references an article by slug.
export const GUIDES = [
  {
    slug: 'ai-engineering',
    title: 'AI Engineering',
    blurb: 'From first prompts to production-ready LLM systems.',
    steps: [
      'llm-eval-harness',
      'autonomous-ai-qa-workflow',
      'hiring-engineers-ai-era'
    ]
  },
  {
    slug: 'software-team-lead',
    title: 'Team Leadership',
    blurb: 'The rituals, decisions and conversations that turn a group of engineers into a team.',
    steps: [
      'cto-team-management-playbook',
      'product-engineer-archetype',
      'hiring-engineers-ai-era'
    ]
  },
  {
    slug: 'devops',
    title: 'DevOps & Infrastructure',
    blurb: 'Running real systems, on real machines, without burning a hyperscaler-sized hole in your budget.',
    steps: [
      'leaving-aws-saved-70-percent',
      'event-driven-pitfalls',
      'llm-eval-harness'
    ]
  },
  {
    slug: 'security',
    title: 'Security',
    blurb: 'Practical, day-one controls that scale with you, not just SOC 2 theater.',
    steps: [
      'secure-by-default-saas',
      'zero-trust-internal-tools'
    ]
  },
  {
    slug: 'architecture',
    title: 'Software Architecture',
    blurb: 'Decisions you can defend, structures you can refactor, and the framework I use to choose between them.',
    steps: [
      'monolith-microservices-decision',
      'event-driven-pitfalls',
      'leaving-aws-saved-70-percent'
    ]
  }
];

// Each NOW item is HTML, rendered with {@html} to support inline links.
export const NOW = [
  'Working at <a href="https://somanyways.co" target="_blank" rel="noopener">Somanyways</a> as a Senior Fullstack Engineer.',
  'Released <a href="https://criterium.app" target="_blank" rel="noopener">Criterium.app</a> (follow the link to know what it is about).',
  'Developing <a href="https://github.com/Trystan-SA/claude-design-system-prompt" target="_blank" rel="noopener">Forgebox</a>, an AI orchestration agent with MicroVMs to improve security.',
  'Lifting four times a week. PR week incoming.'
];

export const USES = {
  AI: ['Claude Code', 'AI agents that review code, specs and Q.A.', 'RAG', 'MCP', 'Local LLM finetuning'],
  Languages: [
    'TypeScript',
    'Go',
    'Python',
    'bit of Rust',
    "(and anything really, we are in the AI era, syntax doesn't matter anymore)"
  ],
  'Frontend frameworks': ['Angular', 'React', 'Svelte'],
  Backend: ['NestJS', 'Fastify', 'Gin', 'Postgres', 'MongoDB'],
  Infrastructure: [
    'Terraform',
    'Ansible',
    'Kubernetes',
    'Coolify',
    'AWS',
    'Heroku',
    'OVH',
    'DigitalOcean',
    'Hetzner'
  ],
  'CI/CD': ['GitHub Actions', 'Custom hooks', 'AI agents']
};

export const TECH = [
  { name: 'TypeScript', slug: 'typescript' },
  { name: 'Go', slug: 'go' },
  { name: 'Angular', slug: 'angular' },
  { name: 'React', slug: 'react' },
  { name: 'Svelte', slug: 'svelte' },
  { name: 'Terraform', slug: 'terraform' },
  { name: 'Ansible', slug: 'ansible' },
  { name: 'Kubernetes', slug: 'kubernetes' }
];

export const fmtDate = (iso) => {
  const d = new Date(iso);
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
};

export const tagById = (id) => TAGS.find((t) => t.id === id) || { id, label: id, color: '#888' };
