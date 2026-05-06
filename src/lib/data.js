// Site content: profile, articles, projects, uses, now


export const TAGS = [
  { id: 'architecture', label: 'Architecture', labelFr: 'Architecture', color: '#7c5cff' },
  { id: 'devops', label: 'DevOps', labelFr: 'DevOps', color: '#1f8a5b' },
  { id: 'ai', label: 'AI / LLMs', labelFr: 'IA / LLMs', color: '#d97757' },
  { id: 'product', label: 'Product', labelFr: 'Produit', color: '#2a6fdb' },
  { id: 'leadership', label: 'Leadership', labelFr: 'Leadership', color: '#c43d6e' },
  { id: 'oss', label: 'Open Source', labelFr: 'Open Source', color: '#8a6d3b' },
  { id: 'security', label: 'Security', labelFr: 'Sécurité', color: '#475569' }
];

const _enMods = import.meta.glob('/src/content/articles/*/en.svx', { eager: true });
const _frMods = import.meta.glob('/src/content/articles/*/fr.svx', { eager: true });

export const ARTICLES = Object.entries(_enMods)
  .map(([path, mod]) => {
    const slug = path.match(/\/([^/]+)\/en\.svx$/)[1];
    const fr = _frMods[`/src/content/articles/${slug}/fr.svx`];
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

// Categories group guides. No SVX body — metadata lives here.
export const CATEGORIES = [
  {
    slug: 'ai-engineering',
    title: 'AI Engineering',
    titleFr: 'Ingénierie IA',
    blurb: 'From first prompts to production-ready LLM systems.',
    blurbFr: 'Des premiers prompts aux systèmes LLM prêts pour la production.',
  },
  {
    slug: 'software-team-lead',
    title: 'Team Leadership',
    titleFr: "Leadership d'équipe",
    blurb: 'The rituals, decisions and conversations that turn a group of engineers into a team.',
    blurbFr: "Les rituels, décisions et conversations qui transforment un groupe d'ingénieurs en équipe.",
  },
  {
    slug: 'devops',
    title: 'DevOps & Infrastructure',
    titleFr: 'DevOps & Infrastructure',
    blurb: 'Running real systems, on real machines, without burning a hyperscaler-sized hole in your budget.',
    blurbFr: "Gérer de vrais systèmes, sur de vraies machines, sans creuser un trou de la taille d'un hyperscaler dans votre budget.",
  },
  {
    slug: 'security',
    title: 'Security',
    titleFr: 'Sécurité',
    blurb: 'Practical, day-one controls that scale with you, not just SOC 2 theater.',
    blurbFr: "Des contrôles pratiques dès le premier jour qui évoluent avec vous — pas du simple théâtre SOC 2.",
  },
  {
    slug: 'architecture',
    title: 'Software Architecture',
    titleFr: 'Architecture Logicielle',
    blurb: 'Decisions you can defend, structures you can refactor, and the framework I use to choose between them.',
    blurbFr: "Des décisions que vous pouvez défendre, des structures que vous pouvez refactoriser, et le cadre que j'utilise pour choisir entre elles.",
  },
];

// Guides live at guides/[category]/[order]-[slug]/{en,fr}.svx
const _enGuideMods = import.meta.glob('/src/content/guides/*/*/en.svx', { eager: true });
const _frGuideMods = import.meta.glob('/src/content/guides/*/*/fr.svx', { eager: true });

export const GUIDES = Object.entries(_enGuideMods)
  .map(([path, mod]) => {
    const match = path.match(/\/guides\/([^/]+)\/(\d+)-([^/]+)\/en\.svx$/);
    const [, category, orderStr, slug] = match;
    const fr = _frGuideMods[`/src/content/guides/${category}/${orderStr}-${slug}/fr.svx`];
    const m = mod.metadata;
    return {
      slug,
      category,
      order: parseInt(orderStr, 10),
      title:        m.title,
      titleFr:      fr?.metadata?.title,
      subtitle:     m.subtitle,
      subtitleFr:   fr?.metadata?.subtitle,
      blurb:        m.blurb,
      blurbFr:      fr?.metadata?.blurb,
      date:         m.date,
      updated:      m.updated,
      readTime:     m.readTime,
      chapterCount: m.chapterCount,
      tags:         m.tags ?? [],
      relatedArticles: m.relatedArticles ?? [],
      featured:     m.featured ?? false,
    };
  })
  .sort((a, b) => a.order - b.order);

// Each NOW item is HTML, rendered with {@html} to support inline links.
export const NOW = [
  'Working at <a href="https://somanyways.co" target="_blank" rel="noopener">Somanyways</a> as a Senior Fullstack Engineer.',
  'Released <a href="https://criterium.app" target="_blank" rel="noopener">Criterium.app</a> (follow the link to know what it is about).',
  'Developing <a href="https://github.com/Trystan-SA/claude-design-system-prompt" target="_blank" rel="noopener">Forgebox</a>, an AI orchestration agent with MicroVMs to improve security.',
  'Lifting four times a week. PR week incoming.'
];



