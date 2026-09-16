import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const astroDir = path.join(rootDir, 'astro-app');

console.log('--- Building Astro Tools Static Section ---');
execSync('npm run build', { cwd: astroDir, stdio: 'inherit' });

const astroDist = path.join(astroDir, 'dist');
const destTools = path.join(rootDir, 'tools');
const destAssetsAstro = path.join(rootDir, 'assets', 'astro');

// 1. Copy generated tools directory (index.html + 12 category directories with tool wrapper pages)
// Note: fs.cpSync with recursive: true merges directories and will not delete existing standalone tool subdirectories
fs.mkdirSync(destTools, { recursive: true });
fs.cpSync(path.join(astroDist, 'tools'), destTools, { recursive: true });

// 2. Copy generated astro assets
fs.mkdirSync(destAssetsAstro, { recursive: true });
fs.cpSync(path.join(astroDist, 'assets', 'astro'), destAssetsAstro, { recursive: true });

// 3. Ensure .nojekyll exists
fs.writeFileSync(path.join(rootDir, '.nojekyll'), '', 'utf8');

console.log('✓ Successfully deployed Astro Tools static pages & assets to tools/ and assets/astro/');
