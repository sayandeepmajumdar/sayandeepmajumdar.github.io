import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const astroDir = path.join(rootDir, 'astro-app');

console.log('--- Building Astro Games (ArcadeLab) Static Section ---');
execSync('npm run build', { cwd: astroDir, stdio: 'inherit' });

const astroDist = path.join(astroDir, 'dist');
const destGames = path.join(rootDir, 'games');
const destAssetsAstro = path.join(rootDir, 'assets', 'astro');

// 1. Copy generated games directory (index.html + category directories)
// Note: recursive copy merges directories and preserves all 17 existing standalone game subdirectories
fs.mkdirSync(destGames, { recursive: true });
fs.cpSync(path.join(astroDist, 'games'), destGames, { recursive: true });

// 2. Copy generated astro assets
fs.mkdirSync(destAssetsAstro, { recursive: true });
fs.cpSync(path.join(astroDist, 'assets', 'astro'), destAssetsAstro, { recursive: true });

// 3. Ensure .nojekyll exists
fs.writeFileSync(path.join(rootDir, '.nojekyll'), '', 'utf8');

console.log('✓ Successfully deployed Astro Games static pages & assets to games/ and assets/astro/');
