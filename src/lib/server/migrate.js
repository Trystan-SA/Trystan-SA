import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { db } from './db.js';

const ADVISORY_LOCK_ID = 4724105;

export async function runMigrations() {
  if (!db) return { skipped: true, reason: 'DATABASE_URL not set', applied: [] };

  const dir = join(process.cwd(), 'migrations');
  let names;
  try {
    names = (await readdir(dir)).filter((n) => n.endsWith('.sql')).sort();
  } catch (err) {
    return { skipped: true, reason: `cannot read ${dir}: ${err.message}`, applied: [] };
  }

  const applied = [];
  try {
    await db.begin(async (tx) => {
      await tx`SELECT pg_advisory_xact_lock(${ADVISORY_LOCK_ID})`;
      await tx`
        CREATE TABLE IF NOT EXISTS _migrations (
          name       TEXT PRIMARY KEY,
          applied_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        )
      `;

      for (const name of names) {
        const [{ exists }] = await tx`
          SELECT EXISTS(SELECT 1 FROM _migrations WHERE name = ${name}) AS exists
        `;
        if (exists) continue;

        const body = await readFile(join(dir, name), 'utf-8');
        await tx.unsafe(body);
        await tx`INSERT INTO _migrations (name) VALUES (${name})`;
        applied.push(name);
      }
    });
    return { skipped: false, applied };
  } catch (err) {
    return { skipped: true, reason: err.message || String(err), applied, error: err };
  }
}
