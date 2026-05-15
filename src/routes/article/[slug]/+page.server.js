import { error } from '@sveltejs/kit';
import { ARTICLES } from '$lib/data.js';
import { getViewCount, getViewCountsBatch } from '$lib/server/viewBuffer.js';
import { getCommentCountsBatch } from '$lib/server/commentCounts.js';

export const prerender = false;

export async function load({ params }) {
  const article = ARTICLES.find((a) => a.slug === params.slug);
  if (!article) throw error(404, 'Article not found');

  const relatedSlugs = ARTICLES
    .filter((a) => a.slug !== article.slug && a.tags.some((tag) => article.tags.includes(tag)))
    .slice(0, 3)
    .map((a) => a.slug);

  const [viewCount, relatedViews, relatedDiscussion] = await Promise.all([
    getViewCount(params.slug),
    getViewCountsBatch(relatedSlugs),
    getCommentCountsBatch(relatedSlugs)
  ]);

  const stats = Object.fromEntries(
    relatedSlugs.map((s) => {
      const d = relatedDiscussion.get(s) ?? { comments: 0, reactions: 0 };
      return [s, { views: relatedViews.get(s) ?? 0, comments: d.comments, reactions: d.reactions }];
    })
  );

  return { article, viewCount, stats };
}
