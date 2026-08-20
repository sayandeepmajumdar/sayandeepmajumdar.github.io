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
      enforce: 'pre',
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
      transformIndexHtml: {
        order: 'pre',
        handler(html) {
          // In both dev and build mode, if tools/index.html has previously built asset links/scripts,
          // replace them with /src/main.tsx so Vite compiles from source!
          let result = html;
          result = result.replace(
            /\s*<script\s+type="module"[^>]*src="\/assets\/toolbox\/[^"]*"[^>]*><\/script>/g,
            ''
          );
          result = result.replace(
            /\s*<link\s+rel="stylesheet"[^>]*href="\/assets\/toolbox\/[^"]*"[^>]*>/g,
            ''
          );
          if (!result.includes('/src/main.tsx')) {
            result = result.replace(
              '</head>',
              '  <script type="module" src="/src/main.tsx"></script>\n</head>'
            );
          }
          return result;
        },
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
