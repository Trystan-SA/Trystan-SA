import { ARTICLES, GUIDES } from '$lib/data.js';
import { getViewCountsBatch } from '$lib/server/viewBuffer.js';
import { getCommentCountsBatch } from '$lib/server/commentCounts.js';

export async function load({ params }) {
  const guide = GUIDES.find((g) => g.slug === params.slug);
  if (!guide) return { stats: {} };

  const relatedSlugs = (guide.relatedArticles || [])
    .filter((slug) => ARTICLES.some((a) => a.slug === slug));
  if (relatedSlugs.length === 0) return { stats: {} };

  const [views, discussion] = await Promise.all([
    getViewCountsBatch(relatedSlugs),
    getCommentCountsBatch(relatedSlugs)
  ]);
  const stats = Object.fromEntries(
    relatedSlugs.map((s) => {
      const d = discussion.get(s) ?? { comments: 0, reactions: 0 };
      return [s, { views: views.get(s) ?? 0, comments: d.comments, reactions: d.reactions }];
    })
  );
  return { stats };
}
