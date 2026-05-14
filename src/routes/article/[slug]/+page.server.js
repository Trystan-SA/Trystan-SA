import { error } from '@sveltejs/kit';
import { ARTICLES } from '$lib/data.js';
import { getViewCount } from '$lib/server/viewBuffer.js';

export const prerender = false;

export async function load({ params }) {
  const article = ARTICLES.find((a) => a.slug === params.slug);
  if (!article) throw error(404, 'Article not found');
  const viewCount = await getViewCount(params.slug);
  return { article, viewCount };
}
