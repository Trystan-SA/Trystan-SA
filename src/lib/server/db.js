import postgres from 'postgres';
import { env } from '$env/dynamic/private';

function createClient() {
  if (!env.DATABASE_URL) {
    console.warn('[db] DATABASE_URL not set — server-side persistence disabled.');
    return null;
  }
  return postgres(env.DATABASE_URL, {
    max: 10,
    idle_timeout: 30,
    onnotice: () => {}
  });
}

if (!globalThis.__pgClient) {
  globalThis.__pgClient = createClient();
}

export const db = globalThis.__pgClient;
