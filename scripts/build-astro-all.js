import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const astroDir = path.join(rootDir, 'astro-app');
const astroDist = path.join(astroDir, 'dist');

console.log('====================================================');
console.log('  Unified Astro Master Build (All 8 Sections)');
console.log('====================================================');

const startTime = Date.now();

// 1. Run single Astro SSG build
console.log('\n[1/3] Compiling Astro SSG bundle across all sections...');
execSync('npm run build', { cwd: astroDir, stdio: 'inherit' });

// 2. Deploy all sections to repository root
console.log('\n[2/3] Deploying static pages and assets to repository...');

// Helper for safe recursive copy
function deployDir(srcRel, destRel) {
  const src = path.join(astroDist, srcRel);
  const dest = path.join(rootDir, destRel);
  if (fs.existsSync(src)) {
    fs.mkdirSync(dest, { recursive: true });
    fs.cpSync(src, dest, { recursive: true });
  }
}

// Portfolio
fs.copyFileSync(path.join(astroDist, 'index.html'), path.join(rootDir, 'index.html'));
console.log('  ✓ Root portfolio deployed to index.html');

// Lab
deployDir('lab', 'lab');
console.log('  ✓ Lab hub deployed to lab/');

// Itihaas
deployDir('itihaas', 'itihaas');
console.log('  ✓ Itihaas deployed to itihaas/');

// Vigyan
deployDir('vigyan', 'vigyan');
console.log('  ✓ Vigyan deployed to vigyan/');

// Rasoi
deployDir('rasoi', 'rasoi');
console.log('  ✓ Rasoi deployed to rasoi/');

// Yatra
deployDir('yatra', 'yatra');
console.log('  ✓ Yatra deployed to yatra/');

// Tools (Toolzy)
deployDir('tools', 'tools');
console.log('  ✓ Toolzy deployed to tools/');

// Games (ArcadeLab - preserves all 17 standalone games)
deployDir('games', 'games');
console.log('  ✓ ArcadeLab deployed to games/ (all 17 standalone games preserved)');

// Mathlify (deploy and generate dual .html files)
const mathlifySrc = path.join(astroDist, 'mathlify');
const mathlifyDest = path.join(rootDir, 'mathlify');
deployDir('mathlify', 'mathlify');

const toolsDir = path.join(mathlifyDest, 'tools');
let dualFilesCreated = 0;
if (fs.existsSync(toolsDir)) {
  const entries = fs.readdirSync(toolsDir, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.isDirectory()) {
      const toolIndexPath = path.join(toolsDir, entry.name, 'index.html');
      const toolFlatPath = path.join(toolsDir, `${entry.name}.html`);
      if (fs.existsSync(toolIndexPath)) {
        fs.copyFileSync(toolIndexPath, toolFlatPath);
        dualFilesCreated++;
      }
    }
  }
}
console.log(`  ✓ Mathlify deployed to mathlify/ (${dualFilesCreated} backward-compatible flat .html tool aliases generated)`);

// Assets
deployDir('assets/astro', 'assets/astro');
console.log('  ✓ Bundled Astro assets deployed to assets/astro/');

// Ensure .nojekyll
fs.writeFileSync(path.join(rootDir, '.nojekyll'), '', 'utf8');

const duration = ((Date.now() - startTime) / 1000).toFixed(1);
console.log('\n[3/3] Build & Deployment Finished Successfully!');
console.log(`✨ Total time: ${duration}s across all 8 static sections.\n`);
