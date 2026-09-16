import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const astroDir = path.join(rootDir, 'astro-app');

console.log('--- Building Astro Mathlify Static Section ---');
execSync('npm run build', { cwd: astroDir, stdio: 'inherit' });

const astroDist = path.join(astroDir, 'dist');
const destMathlify = path.join(rootDir, 'mathlify');
const destTools = path.join(destMathlify, 'tools');
const destAssetsAstro = path.join(rootDir, 'assets', 'astro');

// 1. Ensure directories exist
fs.mkdirSync(destMathlify, { recursive: true });
fs.mkdirSync(destTools, { recursive: true });
fs.mkdirSync(destAssetsAstro, { recursive: true });

// 2. Copy generated mathlify directory (index.html + tools/<slug>/index.html)
// Note: recursive copy merges directories and preserves existing files
fs.cpSync(path.join(astroDist, 'mathlify'), destMathlify, { recursive: true });

// 3. Generate backward-compatible <slug>.html files in mathlify/tools/
// For every tool directory in destTools, duplicate index.html to <slug>.html
if (fs.existsSync(destTools)) {
  const toolEntries = fs.readdirSync(destTools, { withFileTypes: true });
  for (const entry of toolEntries) {
    if (entry.isDirectory()) {
      const toolIndexPath = path.join(destTools, entry.name, 'index.html');
      const toolLegacyHtmlPath = path.join(destTools, `${entry.name}.html`);
      if (fs.existsSync(toolIndexPath)) {
        fs.copyFileSync(toolIndexPath, toolLegacyHtmlPath);
      }
    }
  }
}

// 4. Copy generated astro assets
fs.cpSync(path.join(astroDist, 'assets', 'astro'), destAssetsAstro, { recursive: true });

// 5. Ensure .nojekyll exists
fs.writeFileSync(path.join(rootDir, '.nojekyll'), '', 'utf8');

console.log('✓ Successfully deployed Astro Mathlify static pages & assets with dual URL compatibility');
