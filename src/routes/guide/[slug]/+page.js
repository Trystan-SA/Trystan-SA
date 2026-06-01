import { error } from '@sveltejs/kit';
import { GUIDES } from '$lib/data.js';

export function load({ params }) {
  const guide = GUIDES.find((g) => g.slug === params.slug);
  if (!guide) throw error(404, 'Guide not found');
  return { guide };
}

export function entries() {
  return GUIDES.map((g) => ({ slug: g.slug }));
}
