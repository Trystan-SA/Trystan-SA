import { json, error } from '@sveltejs/kit';
import { ARTICLES } from '$lib/data.js';
import { bumpView, getViewCount } from '$lib/server/viewBuffer.js';

export const prerender = false;

const KNOWN_SLUGS = new Set(ARTICLES.map((a) => a.slug));

const BUCKET_CAPACITY = 10;
const REFILL_PER_SEC = 0.5;
const ipBuckets = new Map();

function rateLimit(ip) {
  const now = Date.now();
  const b = ipBuckets.get(ip) ?? { tokens: BUCKET_CAPACITY, last: now };
  const elapsed = (now - b.last) / 1000;
  b.tokens = Math.min(BUCKET_CAPACITY, b.tokens + elapsed * REFILL_PER_SEC);
  b.last = now;
  if (b.tokens < 1) {
    ipBuckets.set(ip, b);
    return false;
  }
  b.tokens -= 1;
  ipBuckets.set(ip, b);
  return true;
}

export async function POST({ params, getClientAddress }) {
  if (!KNOWN_SLUGS.has(params.slug)) throw error(404, 'unknown article');
  if (!rateLimit(getClientAddress())) throw error(429, 'too many');
  bumpView(params.slug);
  return new Response(null, { status: 204 });
}

export async function GET({ params }) {
  if (!KNOWN_SLUGS.has(params.slug)) throw error(404, 'unknown article');
  const count = await getViewCount(params.slug);
  return json({ slug: params.slug, count });
}
