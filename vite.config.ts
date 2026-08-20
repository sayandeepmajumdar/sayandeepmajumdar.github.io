import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'tools-route-rewrite',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          const url = req.url?.split('?')[0] || '';
          if (url === '/tools') {
            res.writeHead(301, { Location: '/tools/' });
            res.end();
            return;
          }
          if (url.startsWith('/tools/') && !url.includes('.')) {
            req.url = '/tools/index.html';
          }
          next();
        });
      },
      transformIndexHtml(html, ctx) {
        if (ctx.server) {
          // In Vite dev server mode, dynamically inject /src/main.tsx for HMR
          if (!html.includes('/src/main.tsx')) {
            return html.replace(
              /<script\s+type="module"[^>]*src="\/assets\/toolbox\/[^"]*"[^>]*><\/script>/,
              '<script type="module" src="/src/main.tsx"></script>'
            );
          }
        }
        return html;
      },
    },
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
    open: false,
    strictPort: false,
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: false,
    chunkSizeWarningLimit: 1200,
    rollupOptions: {
      input: {
        tools: path.resolve(__dirname, 'tools/index.html'),
      },
      output: {
        entryFileNames: 'assets/toolbox/toolbox-[hash].js',
        chunkFileNames: 'assets/toolbox/[name]-[hash].js',
        assetFileNames: 'assets/toolbox/[name]-[hash].[ext]',
      },
    },
  },
});
