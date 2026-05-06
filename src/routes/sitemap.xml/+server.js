export const prerender = true;

const SITE = 'https://trystan-sarrade.com';

const today = new Date().toISOString().split('T')[0];

const routes = [
  { path: '/', priority: '1.0', changefreq: 'weekly', lastmod: today },
  { path: '/about/', priority: '0.8', changefreq: 'monthly', lastmod: today },
  { path: '/projects/', priority: '0.8', changefreq: 'monthly', lastmod: today }
];

function url({ path, lastmod, changefreq, priority }) {
  return `
  <url>
    <loc>${SITE}${path}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
}

export function GET() {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map(url).join('')}
</urlset>`.trim();

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'max-age=0, s-maxage=3600'
    }
  });
}
