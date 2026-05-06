import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mdsvex } from 'mdsvex';
import rehypeSlug from 'rehype-slug';

const config = {
  preprocess: [
    vitePreprocess(),
    mdsvex({
      extensions: ['.svx'],
      rehypePlugins: [rehypeSlug]
    })
  ],
  extensions: ['.svelte', '.svx'],
  kit: {
    adapter: adapter({
      pages: 'build',
      assets: 'build',
      precompress: false,
      strict: true
    }),
    prerender: {
      handleMissingId: 'ignore',
      handleUnseenRoutes: 'ignore'
    }
  }
};

export default config;
