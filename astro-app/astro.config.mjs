import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://sayandeepmajumdar.github.io',
  base: '/',
  integrations: [
    react(),
    tailwind({
      configFile: './tailwind.config.js',
    }),
  ],
  build: {
    format: 'directory',
    assets: 'assets/astro',
  },
});
