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
        const handleRewrite = (req, res, next) => {
          const url = req.url?.split('?')[0] || '';
          if (url === '/tools') {
            res.writeHead(301, { Location: '/tools/' });
            res.end();
            return;
          }
          if (url === '/rasoi') {
            res.writeHead(301, { Location: '/rasoi/' });
            res.end();
            return;
          }
          if (url === '/yatra') {
            res.writeHead(301, { Location: '/yatra/' });
            res.end();
            return;
          }
          if (url.startsWith('/rasoi/') && !url.includes('.')) {
            req.url = '/rasoi/index.html';
            next();
            return;
          }
          if (url.startsWith('/yatra/') && !url.includes('.')) {
            req.url = '/yatra/index.html';
            next();
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
        };
        server.middlewares.use(handleRewrite);
      },
      configurePreviewServer(server) {
        const handleRewrite = (req, res, next) => {
          const url = req.url?.split('?')[0] || '';
          if (url === '/tools') {
            res.writeHead(301, { Location: '/tools/' });
            res.end();
            return;
          }
          if (url === '/rasoi') {
            res.writeHead(301, { Location: '/rasoi/' });
            res.end();
            return;
          }
          if (url === '/yatra') {
            res.writeHead(301, { Location: '/yatra/' });
            res.end();
            return;
          }
          if (url.startsWith('/rasoi/') && !url.includes('.')) {
            req.url = '/rasoi/index.html';
            next();
            return;
          }
          if (url.startsWith('/yatra/') && !url.includes('.')) {
            req.url = '/yatra/index.html';
            next();
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
        };
        server.middlewares.use(handleRewrite);
      },
      transformIndexHtml: {
        order: 'pre',
        handler(html, ctx) {
          if (ctx.filename.includes('tools/index.html')) {
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
          }

          if (ctx.filename.includes('rasoi/index.html')) {
            let result = html;
            result = result.replace(
              /\s*<script\s+type="module"[^>]*src="\/assets\/rasoi\/[^"]*"[^>]*><\/script>/g,
              ''
            );
            result = result.replace(
              /\s*<link\s+rel="modulepreload"[^>]*href="\/assets\/[^"]*"[^>]*>/g,
              ''
            );
            result = result.replace(
              /\s*<link\s+rel="stylesheet"[^>]*href="\/assets\/rasoi\/[^"]*"[^>]*>/g,
              ''
            );
            if (!result.includes('/src/rasoi/main.tsx')) {
              result = result.replace(
                '</head>',
                '  <script type="module" src="/src/rasoi/main.tsx"></script>\n</head>'
              );
            }
            return result;
          }

          if (ctx.filename.includes('yatra/index.html')) {
            let result = html;
            result = result.replace(
              /\s*<script\s+type="module"[^>]*src="\/assets\/yatra\/[^"]*"[^>]*><\/script>/g,
              ''
            );
            result = result.replace(
              /\s*<link\s+rel="modulepreload"[^>]*href="\/assets\/[^"]*"[^>]*>/g,
              ''
            );
            result = result.replace(
              /\s*<link\s+rel="stylesheet"[^>]*href="\/assets\/yatra\/[^"]*"[^>]*>/g,
              ''
            );
            if (!result.includes('/src/yatra/main.tsx')) {
              result = result.replace(
                '</head>',
                '  <script type="module" src="/src/yatra/main.tsx"></script>\n</head>'
              );
            }
            return result;
          }

          return html;
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
        rasoi: path.resolve(__dirname, 'rasoi/index.html'),
        yatra: path.resolve(__dirname, 'yatra/index.html'),
      },
      output: {
        entryFileNames: (chunkInfo) => {
          if (chunkInfo.name === 'rasoi') {
            return 'assets/rasoi/rasoi-[hash].js';
          }
          if (chunkInfo.name === 'yatra') {
            return 'assets/yatra/yatra-[hash].js';
          }
          return 'assets/toolbox/toolbox-[hash].js';
        },
        chunkFileNames: (chunkInfo) => {
          if (chunkInfo.name.includes('rasoi')) {
            return 'assets/rasoi/[name]-[hash].js';
          }
          if (chunkInfo.name.includes('yatra')) {
            return 'assets/yatra/[name]-[hash].js';
          }
          return 'assets/toolbox/[name]-[hash].js';
        },
        assetFileNames: (assetInfo) => {
          const name = assetInfo.name || '';
          if (name.includes('rasoi')) {
            return 'assets/rasoi/[name]-[hash].[ext]';
          }
          if (name.includes('yatra')) {
            return 'assets/yatra/[name]-[hash].[ext]';
          }
          return 'assets/toolbox/[name]-[hash].[ext]';
        },
      },
    },
  },
});
