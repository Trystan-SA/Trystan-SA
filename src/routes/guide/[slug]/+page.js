import { error } from '@sveltejs/kit';
import { GUIDES } from '$lib/data.js';

export const prerender = true;

export function entries() {
  return GUIDES.filter((g) => g.kind === 'longform').map((g) => ({ slug: g.slug }));
}

export function load({ params }) {
  const guide = GUIDES.find((g) => g.slug === params.slug && g.kind === 'longform');
  if (!guide) throw error(404, 'Guide not found');
  return { guide };
}
