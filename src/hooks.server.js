import { runMigrations } from '$lib/server/migrate.js';
import { startViewBuffer } from '$lib/server/viewBuffer.js';

const result = await runMigrations();
if (result.skipped) {
  console.warn(`[migrate] skipped: ${result.reason}`);
} else if (result.applied.length > 0) {
  console.log(`[migrate] applied ${result.applied.length}: ${result.applied.join(', ')}`);
} else {
  console.log('[migrate] schema up to date');
}

startViewBuffer();
