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
          if (url === '/itihaas' || url === '/history') {
            res.writeHead(301, { Location: '/itihaas/' });
            res.end();
            return;
          }
          if (url === '/vigyan' || url === '/science') {
            res.writeHead(301, { Location: '/vigyan/' });
            res.end();
            return;
          }
          if (url === '/kernel-lab' || url === '/lab') {
            res.writeHead(301, { Location: '/kernel-lab/' });
            res.end();
            return;
          }
          if (url.startsWith('/kernel-lab/') && !url.includes('.')) {
            req.url = '/kernel-lab/index.html';
            next();
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
          if ((url.startsWith('/itihaas/') || url.startsWith('/history/')) && !url.includes('.')) {
            req.url = '/itihaas/index.html';
            next();
            return;
          }
          if ((url.startsWith('/vigyan/') || url.startsWith('/science/')) && !url.includes('.')) {
            req.url = '/vigyan/index.html';
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
          if (url === '/itihaas' || url === '/history') {
            res.writeHead(301, { Location: '/itihaas/' });
            res.end();
            return;
          }
          if (url === '/vigyan' || url === '/science') {
            res.writeHead(301, { Location: '/vigyan/' });
            res.end();
            return;
          }
          if (url === '/kernel-lab' || url === '/lab') {
            res.writeHead(301, { Location: '/kernel-lab/' });
            res.end();
            return;
          }
          if (url.startsWith('/kernel-lab/') && !url.includes('.')) {
            req.url = '/kernel-lab/index.html';
            next();
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
          if ((url.startsWith('/itihaas/') || url.startsWith('/history/')) && !url.includes('.')) {
            req.url = '/itihaas/index.html';
            next();
            return;
          }
          if ((url.startsWith('/vigyan/') || url.startsWith('/science/')) && !url.includes('.')) {
            req.url = '/vigyan/index.html';
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

          if (ctx.filename.includes('itihaas/index.html')) {
            let result = html;
            result = result.replace(
              /\s*<script\s+type="module"[^>]*src="\/assets\/itihaas\/[^"]*"[^>]*><\/script>/g,
              ''
            );
            result = result.replace(
              /\s*<link\s+rel="modulepreload"[^>]*href="\/assets\/[^"]*"[^>]*>/g,
              ''
            );
            result = result.replace(
              /\s*<link\s+rel="stylesheet"[^>]*href="\/assets\/itihaas\/[^"]*"[^>]*>/g,
              ''
            );
            if (!result.includes('/src/itihaas/main.tsx')) {
              result = result.replace(
                '</head>',
                '  <script type="module" src="/src/itihaas/main.tsx"></script>\n</head>'
              );
            }
            return result;
          }

          if (ctx.filename.includes('vigyan/index.html')) {
            let result = html;
            result = result.replace(
              /\s*<script\s+type="module"[^>]*src="\/assets\/vigyan\/[^"]*"[^>]*><\/script>/g,
              ''
            );
            result = result.replace(
              /\s*<link\s+rel="modulepreload"[^>]*href="\/assets\/[^"]*"[^>]*>/g,
              ''
            );
            result = result.replace(
              /\s*<link\s+rel="stylesheet"[^>]*href="\/assets\/vigyan\/[^"]*"[^>]*>/g,
              ''
            );
            if (!result.includes('/src/vigyan/main.tsx')) {
              result = result.replace(
                '</head>',
                '  <script type="module" src="/src/vigyan/main.tsx"></script>\n</head>'
              );
            }
            return result;
          }

          if (ctx.filename.includes('kernel-lab/index.html')) {
            let result = html;
            result = result.replace(
              /\s*<script\s+type="module"[^>]*src="\/assets\/kernel-lab\/[^"]*"[^>]*><\/script>/g,
              ''
            );
            result = result.replace(
              /\s*<link\s+rel="modulepreload"[^>]*href="\/assets\/[^"]*"[^>]*>/g,
              ''
            );
            result = result.replace(
              /\s*<link\s+rel="stylesheet"[^>]*href="\/assets\/kernel-lab\/[^"]*"[^>]*>/g,
              ''
            );
            if (!result.includes('/src/kernel-lab/main.tsx')) {
              result = result.replace(
                '</head>',
                '  <script type="module" src="/src/kernel-lab/main.tsx"></script>\n</head>'
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
    proxy: {
      '/world-explorer': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
    },
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
        itihaas: path.resolve(__dirname, 'itihaas/index.html'),
        vigyan: path.resolve(__dirname, 'vigyan/index.html'),
        kernelLab: path.resolve(__dirname, 'kernel-lab/index.html'),
      },
      output: {
        entryFileNames: (chunkInfo) => {
          if (chunkInfo.name === 'kernelLab') {
            return 'assets/kernel-lab/kernel-lab-[hash].js';
          }
          if (chunkInfo.name === 'rasoi') {
            return 'assets/rasoi/rasoi-[hash].js';
          }
          if (chunkInfo.name === 'yatra') {
            return 'assets/yatra/yatra-[hash].js';
          }
          if (chunkInfo.name === 'itihaas') {
            return 'assets/itihaas/itihaas-[hash].js';
          }
          if (chunkInfo.name === 'vigyan') {
            return 'assets/vigyan/vigyan-[hash].js';
          }
          return 'assets/toolbox/toolbox-[hash].js';
        },
        chunkFileNames: (chunkInfo) => {
          if (chunkInfo.name.includes('kernelLab') || chunkInfo.name.includes('kernel-lab')) {
            return 'assets/kernel-lab/[name]-[hash].js';
          }
          if (chunkInfo.name.includes('rasoi')) {
            return 'assets/rasoi/[name]-[hash].js';
          }
          if (chunkInfo.name.includes('yatra')) {
            return 'assets/yatra/[name]-[hash].js';
          }
          if (chunkInfo.name.includes('itihaas')) {
            return 'assets/itihaas/[name]-[hash].js';
          }
          if (chunkInfo.name.includes('vigyan')) {
            return 'assets/vigyan/[name]-[hash].js';
          }
          return 'assets/toolbox/[name]-[hash].js';
        },
        assetFileNames: (assetInfo) => {
          const name = assetInfo.name || '';
          if (name.includes('kernel-lab') || name.includes('kernelLab')) {
            return 'assets/kernel-lab/[name]-[hash].[ext]';
          }
          if (name.includes('rasoi')) {
            return 'assets/rasoi/[name]-[hash].[ext]';
          }
          if (name.includes('yatra')) {
            return 'assets/yatra/[name]-[hash].[ext]';
          }
          if (name.includes('itihaas')) {
            return 'assets/itihaas/[name]-[hash].[ext]';
          }
          if (name.includes('vigyan')) {
            return 'assets/vigyan/[name]-[hash].[ext]';
          }
          return 'assets/toolbox/[name]-[hash].[ext]';
        },
      },
    },
  },
});
