import { ARTICLES } from '$lib/data.js';
import { getViewCountsBatch } from '$lib/server/viewBuffer.js';
import { getCommentCountsBatch } from '$lib/server/commentCounts.js';

export const prerender = false;

export async function load() {
  const slugs = ARTICLES.map((a) => a.slug);
  const [views, discussion] = await Promise.all([
    getViewCountsBatch(slugs),
    getCommentCountsBatch(slugs)
  ]);
  const stats = Object.fromEntries(
    slugs.map((s) => {
      const d = discussion.get(s) ?? { comments: 0, reactions: 0 };
      return [s, { views: views.get(s) ?? 0, comments: d.comments, reactions: d.reactions }];
    })
  );
  return { stats };
}
