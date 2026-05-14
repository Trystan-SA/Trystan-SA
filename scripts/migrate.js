import postgres from 'postgres';
import { readdir, readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const url = process.env.DATABASE_URL;
if (!url) {
  console.error('DATABASE_URL not set. Run with `node --env-file=.env scripts/migrate.js`.');
  process.exit(1);
}

const sql = postgres(url, { onnotice: () => {} });
const migrationsDir = join(dirname(fileURLToPath(import.meta.url)), '..', 'migrations');

await sql`
  CREATE TABLE IF NOT EXISTS _migrations (
    name       TEXT PRIMARY KEY,
    applied_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
  )
`;

const files = (await readdir(migrationsDir)).filter((f) => f.endsWith('.sql')).sort();

for (const file of files) {
  const [{ exists } = {}] = await sql`
    SELECT EXISTS(SELECT 1 FROM _migrations WHERE name = ${file}) AS exists
  `;
  if (exists) {
    console.log(`= ${file}`);
    continue;
  }
  const body = await readFile(join(migrationsDir, file), 'utf-8');
  await sql.begin(async (tx) => {
    await tx.unsafe(body);
    await tx`INSERT INTO _migrations (name) VALUES (${file})`;
  });
  console.log(`+ ${file}`);
}

await sql.end();
