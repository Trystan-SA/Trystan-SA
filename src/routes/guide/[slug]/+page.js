import { error } from '@sveltejs/kit';
import { GUIDES } from '$lib/data.js';
import { GUIDE_BODIES } from '$lib/guide-bodies.js';

export const prerender = true;

const longformGuides = () => GUIDES.filter((g) => g.kind === 'longform');

export function entries() {
  return longformGuides().map((g) => ({ slug: g.slug }));
}

export function load({ params }) {
  const guide = GUIDES.find((g) => g.slug === params.slug && g.kind === 'longform');
  if (!guide) throw error(404, 'Guide not found');
  const body = GUIDE_BODIES[params.slug];
  if (!body) throw error(404, 'Guide content missing');
  return { guide, body };
}
