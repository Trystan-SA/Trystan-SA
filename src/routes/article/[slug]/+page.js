import { error } from '@sveltejs/kit';
import { ARTICLES } from '$lib/data.js';

export const prerender = true;

export function entries() {
  return ARTICLES.map((a) => ({ slug: a.slug }));
}

export function load({ params }) {
  const article = ARTICLES.find((a) => a.slug === params.slug);
  if (!article) throw error(404, 'Article not found');
  return { article };
}
