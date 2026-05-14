import adapter from '@sveltejs/adapter-node';
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
    adapter: adapter(),
    prerender: {
      handleMissingId: 'ignore',
      handleUnseenRoutes: 'ignore'
    }
  }
};

export default config;
