import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let commitCount = '0';
try {
  commitCount = execSync('git rev-list --count HEAD', { stdio: ['ignore', 'pipe', 'ignore'] })
    .toString()
    .trim();
} catch (e) {
  commitCount = '1';
}
const appVersion = `2.0.${commitCount}`;

export default defineConfig({
  define: {
    __APP_VERSION__: JSON.stringify(appVersion),
  },
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
            const cleanPath = url.replace(/^\/tools\/?/, '').replace(/\/$/, '');
            const possibleToolIndex = path.join(__dirname, 'tools', cleanPath, 'index.html');
            if (cleanPath && fs.existsSync(possibleToolIndex)) {
              req.url = `/tools/${cleanPath}/index.html`;
            } else {
              req.url = '/tools/index.html';
            }
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
