import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const astroDir = path.join(rootDir, 'astro-app');

console.log('--- Building Astro Vigyan Static Section ---');
execSync('npm run build', { cwd: astroDir, stdio: 'inherit' });

const astroDist = path.join(astroDir, 'dist');
const destVigyan = path.join(rootDir, 'vigyan');
const destAssetsAstro = path.join(rootDir, 'assets', 'astro');

// 1. Copy generated vigyan HTML page
fs.mkdirSync(destVigyan, { recursive: true });
fs.cpSync(path.join(astroDist, 'vigyan', 'index.html'), path.join(destVigyan, 'index.html'));

// 2. Copy generated astro assets
fs.mkdirSync(destAssetsAstro, { recursive: true });
fs.cpSync(path.join(astroDist, 'assets', 'astro'), destAssetsAstro, { recursive: true });

// 3. Ensure .nojekyll exists
fs.writeFileSync(path.join(rootDir, '.nojekyll'), '', 'utf8');

console.log('✓ Successfully deployed Astro Vigyan static page & assets to vigyan/ and assets/astro/');
