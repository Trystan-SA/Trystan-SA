import { db } from './db.js';

const FLUSH_INTERVAL_MS = 5 * 60 * 1000;

function buffer() {
  if (!globalThis.__viewBuffer) globalThis.__viewBuffer = new Map();
  return globalThis.__viewBuffer;
}

export function bumpView(slug) {
  const buf = buffer();
  buf.set(slug, (buf.get(slug) ?? 0) + 1);
}

let flushing = false;

export async function flushViews() {
  if (!db) return;
  if (flushing) return;
  const buf = buffer();
  if (buf.size === 0) return;

  flushing = true;
  const snapshot = [...buf.entries()];
  buf.clear();

  try {
    for (const [slug, count] of snapshot) {
      await db`
        INSERT INTO article_views (slug, count, updated_at)
        VALUES (${slug}, ${count}, NOW())
        ON CONFLICT (slug) DO UPDATE
        SET count = article_views.count + EXCLUDED.count,
            updated_at = NOW()
      `;
    }
  } catch (err) {
    console.error('[viewBuffer] flush failed, restoring buffer:', err);
    for (const [slug, count] of snapshot) {
      buf.set(slug, (buf.get(slug) ?? 0) + count);
    }
  } finally {
    flushing = false;
  }
}

export async function getViewCount(slug) {
  const buffered = buffer().get(slug) ?? 0;
  if (!db) return buffered;
  try {
    const rows = await db`SELECT count FROM article_views WHERE slug = ${slug}`;
    const persisted = rows[0]?.count != null ? Number(rows[0].count) : 0;
    return persisted + buffered;
  } catch (err) {
    console.error('[viewBuffer] getViewCount failed:', err);
    return buffered;
  }
}

export async function getViewCountsBatch(slugs) {
  const buf = buffer();
  const result = new Map(slugs.map((s) => [s, buf.get(s) ?? 0]));
  if (!db || slugs.length === 0) return result;
  try {
    const rows = await db`SELECT slug, count FROM article_views WHERE slug IN ${db(slugs)}`;
    for (const row of rows) {
      const persisted = row.count != null ? Number(row.count) : 0;
      result.set(row.slug, persisted + (buf.get(row.slug) ?? 0));
    }
    return result;
  } catch (err) {
    console.error('[viewBuffer] getViewCountsBatch failed:', err);
    return result;
  }
}

export function startViewBuffer() {
  if (globalThis.__viewBufferStarted) return;
  globalThis.__viewBufferStarted = true;

  const interval = setInterval(() => {
    flushViews().catch((err) => console.error('[viewBuffer] interval flush error:', err));
  }, FLUSH_INTERVAL_MS);
  interval.unref?.();

  const shutdown = async () => {
    try {
      await flushViews();
    } catch (err) {
      console.error('[viewBuffer] shutdown flush failed:', err);
    }
  };
  process.once('SIGTERM', shutdown);
  process.once('SIGINT', shutdown);
  process.once('beforeExit', shutdown);
}
