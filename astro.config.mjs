// @ts-check
import { defineConfig } from 'astro/config';

import svelte from "@astrojs/svelte";

// https://astro.build/config
export default defineConfig({
  base: '/etarn/',
  integrations: [svelte()],
  vite: {
    server: {
      proxy: {
        '/api': 'http://localhost/etarn/api'
      }
    }
  }
});
