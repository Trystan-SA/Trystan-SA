import { error } from '@sveltejs/kit';
import { GUIDES } from '$lib/data.js';

export const prerender = false;

export function load({ params }) {
  const guide = GUIDES.find((g) => g.slug === params.slug);
  if (!guide) throw error(404, 'Guide not found');
  return { guide };
}
