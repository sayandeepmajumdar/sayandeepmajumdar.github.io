import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const astroDir = path.join(rootDir, 'astro-app');

console.log('--- Building Astro Portfolio (Root index.html) ---');
execSync('npm run build', { cwd: astroDir, stdio: 'inherit' });

const astroDist = path.join(astroDir, 'dist');
const destIndex = path.join(rootDir, 'index.html');
const destAssetsAstro = path.join(rootDir, 'assets', 'astro');

// 1. Copy generated root index.html
fs.copyFileSync(path.join(astroDist, 'index.html'), destIndex);

// 2. Copy generated astro assets
fs.mkdirSync(destAssetsAstro, { recursive: true });
fs.cpSync(path.join(astroDist, 'assets', 'astro'), destAssetsAstro, { recursive: true });

// 3. Ensure .nojekyll exists
fs.writeFileSync(path.join(rootDir, '.nojekyll'), '', 'utf8');

console.log('✓ Successfully deployed Astro Portfolio to root index.html and assets/astro/');
