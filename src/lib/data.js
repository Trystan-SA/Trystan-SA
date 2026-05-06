// Site content: profile, articles, projects, uses, now

export const PROFILE = {
  name: 'Trystan Sarrade',
  role: 'Software Architect',
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
  { id: 'architecture', label: 'Architecture', labelFr: 'Architecture', color: '#7c5cff' },
  { id: 'devops', label: 'DevOps', labelFr: 'DevOps', color: '#1f8a5b' },
  { id: 'ai', label: 'AI / LLMs', labelFr: 'IA / LLMs', color: '#d97757' },
  { id: 'product', label: 'Product', labelFr: 'Produit', color: '#2a6fdb' },
  { id: 'leadership', label: 'Leadership', labelFr: 'Leadership', color: '#c43d6e' },
  { id: 'oss', label: 'Open Source', labelFr: 'Open Source', color: '#8a6d3b' },
  { id: 'security', label: 'Security', labelFr: 'Sécurité', color: '#475569' }
];

const _enMods = import.meta.glob('/src/content/articles/en/*.svx', { eager: true });
const _frMods = import.meta.glob('/src/content/articles/fr/*.svx', { eager: true });

export const ARTICLES = Object.entries(_enMods)
  .map(([path, mod]) => {
    const slug = path.match(/\/([^/]+)\.svx$/)[1];
    const fr = _frMods[`/src/content/articles/fr/${slug}.svx`];
    const m = mod.metadata;
    return {
      slug,
      title:     m.title,
      titleFr:   fr?.metadata?.title,
      excerpt:   m.excerpt,
      excerptFr: fr?.metadata?.excerpt,
      date:      m.date,
      readTime:  m.readTime,
      tags:      m.tags ?? [],
      featured:  m.featured ?? false,
    };
  })
  .sort((a, b) => new Date(b.date) - new Date(a.date));

// Guides come in two shapes:
//   - kind: 'longform' — structured chapters in `guide-bodies.js`, rendered at /guide/[slug].
//   - kind: 'path'     — curated reading sequence; `steps` references article slugs.
// Both are displayed under a single "Guides" UI.
const _enGuideMods = import.meta.glob('/src/content/guides/en/*.svx', { eager: true });
const _frGuideMods = import.meta.glob('/src/content/guides/fr/*.svx', { eager: true });

const _longformGuides = Object.entries(_enGuideMods).map(([path, mod]) => {
  const slug = path.match(/\/([^/]+)\.svx$/)[1];
  const fr = _frGuideMods[`/src/content/guides/fr/${slug}.svx`];
  const m = mod.metadata;
  return {
    kind: 'longform',
    slug,
    title:      m.title,
    titleFr:    fr?.metadata?.title,
    subtitle:   m.subtitle,
    subtitleFr: fr?.metadata?.subtitle,
    blurb:      m.blurb,
    blurbFr:    fr?.metadata?.blurb,
    date:       m.date,
    updated:    m.updated,
    readTime:   m.readTime,
    chapterCount: m.chapterCount,
    tags:       m.tags ?? [],
    relatedArticles: m.relatedArticles ?? [],
    featured:   m.featured ?? false,
  };
});

// Path guides have no SVX body — their metadata stays here
const _pathGuides = [
  {
    kind: 'path',
    slug: 'ai-engineering',
    title: 'AI Engineering',
    titleFr: 'Ingénierie IA',
    blurb: 'From first prompts to production-ready LLM systems.',
    blurbFr: 'Des premiers prompts aux systèmes LLM prêts pour la production.',
    steps: ['writing-efficient-prompts', 'llm-eval-harness', 'autonomous-ai-qa-workflow', 'hiring-engineers-ai-era']
  },
  {
    kind: 'path',
    slug: 'software-team-lead',
    title: 'Team Leadership',
    titleFr: "Leadership d'équipe",
    blurb: 'The rituals, decisions and conversations that turn a group of engineers into a team.',
    blurbFr: "Les rituels, décisions et conversations qui transforment un groupe d'ingénieurs en équipe.",
    steps: ['engineering-ownership-levels', 'cto-team-management-playbook', 'product-engineer-archetype', 'hiring-engineers-ai-era']
  },
  {
    kind: 'path',
    slug: 'devops',
    title: 'DevOps & Infrastructure',
    titleFr: 'DevOps & Infrastructure',
    blurb: 'Running real systems, on real machines, without burning a hyperscaler-sized hole in your budget.',
    blurbFr: "Gérer de vrais systèmes, sur de vraies machines, sans creuser un trou de la taille d'un hyperscaler dans votre budget.",
    steps: ['leaving-aws-saved-70-percent', 'event-driven-pitfalls', 'llm-eval-harness']
  },
  {
    kind: 'path',
    slug: 'security',
    title: 'Security',
    titleFr: 'Sécurité',
    blurb: 'Practical, day-one controls that scale with you, not just SOC 2 theater.',
    blurbFr: "Des contrôles pratiques dès le premier jour qui évoluent avec vous — pas du simple théâtre SOC 2.",
    steps: ['secure-by-default-saas', 'zero-trust-internal-tools']
  },
  {
    kind: 'path',
    slug: 'architecture',
    title: 'Software Architecture',
    titleFr: 'Architecture Logicielle',
    blurb: 'Decisions you can defend, structures you can refactor, and the framework I use to choose between them.',
    blurbFr: "Des décisions que vous pouvez défendre, des structures que vous pouvez refactoriser, et le cadre que j'utilise pour choisir entre elles.",
    steps: ['monolith-microservices-decision', 'event-driven-pitfalls', 'leaving-aws-saved-70-percent']
  }
];

export const GUIDES = [..._longformGuides, ..._pathGuides];

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

export const fmtDate = (iso, locale = 'en-US') => {
  const d = new Date(iso);
  return d.toLocaleDateString(locale, { year: 'numeric', month: 'short', day: 'numeric' });
};

export const tagById = (id) => TAGS.find((t) => t.id === id) || { id, label: id, color: '#888' };
