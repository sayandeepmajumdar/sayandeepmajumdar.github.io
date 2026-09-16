import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

console.log('--- Auditing Astro Games (ArcadeLab) Internal Links & Assets ---');

const gamesDir = path.join(rootDir, 'games');
let filesChecked = 0;
let linksChecked = 0;
const errors = [];

function checkFile(filePath) {
  filesChecked++;
  const content = fs.readFileSync(filePath, 'utf8');

  // Check stylesheet links
  const cssMatches = [...content.matchAll(/<link[^>]+rel=["']stylesheet["'][^>]+href=["']([^"']+)["']/g)];
  for (const match of cssMatches) {
    const href = match[1];
    linksChecked++;
    if (href.startsWith('http://') || href.startsWith('https://')) continue;
    const cleanHref = href.split('?')[0].split('#')[0];
    const assetPath = path.join(rootDir, cleanHref);
    if (!fs.existsSync(assetPath)) {
      errors.push(`Missing stylesheet in ${path.relative(rootDir, filePath)}: ${href}`);
    }
  }

  // Check script tags
  const scriptMatches = [...content.matchAll(/<script[^>]+src=["']([^"']+)["']/g)];
  for (const match of scriptMatches) {
    const src = match[1];
    linksChecked++;
    if (src.startsWith('http://') || src.startsWith('https://')) continue;
    const cleanSrc = src.split('?')[0].split('#')[0];
    const assetPath = path.join(rootDir, cleanSrc);
    if (!fs.existsSync(assetPath)) {
      errors.push(`Missing script in ${path.relative(rootDir, filePath)}: ${src}`);
    }
  }

  // Check internal href links
  const hrefMatches = [...content.matchAll(/<a[^>]+href=["']([^"']+)["']/g)];
  for (const match of hrefMatches) {
    const href = match[1];
    linksChecked++;
    if (href.startsWith('http://') || href.startsWith('https://') || href.startsWith('mailto:') || href.startsWith('#') || href.startsWith('javascript:')) continue;
    const cleanHref = href.split('?')[0].split('#')[0];
    
    // Check if target exists on filesystem
    let targetPath = path.join(rootDir, cleanHref);
    if (cleanHref.endsWith('/')) {
      targetPath = path.join(targetPath, 'index.html');
    } else if (!path.extname(cleanHref)) {
      targetPath = path.join(targetPath, 'index.html');
    }

    if (!fs.existsSync(targetPath)) {
      const altPath = path.join(rootDir, cleanHref);
      if (!fs.existsSync(altPath)) {
        errors.push(`Broken link in ${path.relative(rootDir, filePath)}: ${href} -> resolved to ${path.relative(rootDir, targetPath)}`);
      }
    }
  }
}

// Check hub
checkFile(path.join(gamesDir, 'index.html'));

// Check 5 category directories
const categories = ['beginner', 'arcade', 'brain', 'action', 'classic'];
for (const cat of categories) {
  const catFile = path.join(gamesDir, cat, 'index.html');
  if (fs.existsSync(catFile)) {
    checkFile(catFile);
  }
}

// Also verify that each of the 17 standalone games has an intact index.html
const standaloneGames = [
  'rock-paper-scissors', 'tic-tac-toe', 'number-guessing', 'memory-matching',
  'hangman', 'whack-a-mole', 'simon-says', 'sudoku', 'asteroids', 'flappy-bird',
  'endless-runner', 'chess', 'rpg-battle', 'car-racing', 'snake', 'racing-3d',
  'voxel-sandbox'
];

for (const game of standaloneGames) {
  const standalonePath = path.join(gamesDir, game, 'index.html');
  if (!fs.existsSync(standalonePath)) {
    errors.push(`Missing standalone game: ${game}/index.html`);
  }
}

console.log(`Audited ${filesChecked} Astro Games HTML pages + 17 standalone games, ${linksChecked} links checked.`);
if (errors.length > 0) {
  console.error(`Found ${errors.length} errors:`);
  errors.slice(0, 20).forEach(e => console.error(' - ' + e));
  process.exit(1);
} else {
  console.log('✓ All Astro Games links, stylesheets, scripts, and standalone game directories resolve successfully!');
}
