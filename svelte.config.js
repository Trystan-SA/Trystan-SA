import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

const config = {
  preprocess: vitePreprocess(),
  kit: {
    adapter: adapter({
      pages: 'build',
      assets: 'build',
      precompress: false,
      strict: true
    }),
    prerender: {
      // #guides is a tab-state hash, not an in-page anchor
      handleMissingId: 'ignore'
    }
  }
};

export default config;
