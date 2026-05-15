import { env } from '$env/dynamic/private';
import { env as pub } from '$env/dynamic/public';

const TTL_MS = 5 * 60 * 1000;
const ENDPOINT = 'https://api.github.com/graphql';
const CACHE_VERSION = 2;

function cache() {
  const existing = globalThis.__commentCountCache;
  if (!existing || existing.version !== CACHE_VERSION) {
    globalThis.__commentCountCache = {
      version: CACHE_VERSION,
      at: 0,
      byPathname: new Map(),
      inflight: null
    };
  }
  return globalThis.__commentCountCache;
}

let warnedMissingToken = false;
let warnedMissingGiscus = false;

async function fetchAllCounts() {
  const token = env.GITHUB_TOKEN;
  const repoSlug = pub.PUBLIC_GISCUS_REPO;
  const categoryId = pub.PUBLIC_GISCUS_CATEGORY_ID;
  if (!token) {
    if (!warnedMissingToken) {
      console.warn('[commentCounts] GITHUB_TOKEN not set — comment/reaction counts disabled on previews.');
      warnedMissingToken = true;
    }
    return new Map();
  }
  if (!repoSlug || !categoryId) {
    if (!warnedMissingGiscus) {
      console.warn('[commentCounts] PUBLIC_GISCUS_REPO or PUBLIC_GISCUS_CATEGORY_ID not set — counts disabled.');
      warnedMissingGiscus = true;
    }
    return new Map();
  }

  const [owner, name] = repoSlug.split('/');
  if (!owner || !name) return new Map();

  const byPathname = new Map();
  let cursor = null;

  const query = `
    query($owner:String!, $name:String!, $categoryId:ID!, $cursor:String) {
      repository(owner:$owner, name:$name) {
        discussions(first:100, after:$cursor, categoryId:$categoryId) {
          pageInfo { hasNextPage endCursor }
          nodes {
            title
            comments { totalCount }
            reactions { totalCount }
          }
        }
      }
    }`;

  for (let page = 0; page < 10; page++) {
    const res = await fetch(ENDPOINT, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        'User-Agent': 'trystan-sarrade-site'
      },
      body: JSON.stringify({
        query,
        variables: { owner, name, categoryId, cursor }
      })
    });
    if (!res.ok) {
      console.error('[commentCounts] GitHub responded', res.status);
      return byPathname;
    }
    const data = await res.json();
    const conn = data?.data?.repository?.discussions;
    if (!conn) {
      if (data?.errors) console.error('[commentCounts] GraphQL errors', data.errors);
      return byPathname;
    }
    for (const node of conn.nodes ?? []) {
      // Giscus uses `data-mapping="pathname"`. Strip leading slash and any
      // trailing slash so we match regardless of how Giscus stored it.
      const key = node.title.replace(/^\/+/, '').replace(/\/+$/, '');
      byPathname.set(key, {
        comments: node.comments?.totalCount ?? 0,
        reactions: node.reactions?.totalCount ?? 0
      });
    }
    if (!conn.pageInfo.hasNextPage) break;
    cursor = conn.pageInfo.endCursor;
  }

  console.log(
    `[commentCounts] fetched ${byPathname.size} discussions:`,
    [...byPathname.entries()].map(([title, v]) => `${title} (c=${v.comments}, r=${v.reactions})`).join(' | ') || '(none)'
  );

  return byPathname;
}

async function getAllCounts() {
  const c = cache();
  const fresh = Date.now() - c.at < TTL_MS;
  if (fresh && c.byPathname.size > 0) return c.byPathname;
  if (c.inflight) return c.inflight;

  c.inflight = (async () => {
    try {
      const map = await fetchAllCounts();
      if (map.size > 0 || c.byPathname.size === 0) {
        c.byPathname = map;
        c.at = Date.now();
      }
      return c.byPathname;
    } catch (err) {
      console.error('[commentCounts] fetch failed:', err);
      return c.byPathname;
    } finally {
      c.inflight = null;
    }
  })();

  return c.inflight;
}

export async function getCommentCountsBatch(slugs) {
  const all = await getAllCounts();
  const out = new Map();
  const misses = [];
  for (const slug of slugs) {
    const key = `article/${slug}`;
    const hit = all.get(key);
    if (!hit) misses.push(key);
    out.set(slug, hit ?? { comments: 0, reactions: 0 });
  }
  if (misses.length > 0 && all.size > 0) {
    console.log(`[commentCounts] no discussion found for: ${misses.join(', ')}`);
  }
  return out;
}
