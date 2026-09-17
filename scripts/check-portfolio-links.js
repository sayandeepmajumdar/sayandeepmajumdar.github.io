import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

console.log('--- Auditing Root Portfolio (index.html) Links and Assets ---');

const indexPath = path.join(rootDir, 'index.html');
if (!fs.existsSync(indexPath)) {
  console.error('Error: index.html does not exist! Run build first.');
  process.exit(1);
}

const html = fs.readFileSync(indexPath, 'utf8');

// 1. Check required meta tags & schema
const checks = [
  { name: 'Canonical Tag', regex: /<link rel="canonical" href="https:\/\/sayandeepmajumdar\.github\.io\/"/ },
  { name: 'Schema Person JSON-LD', regex: /"@type":\s*"Person"/ },
  { name: 'Google Tag Manager', regex: /G-QBDB6XWNYH/ },
  { name: 'Viewport Meta', regex: /<meta name="viewport"/ },
  { name: 'Dark Mode Init Script', regex: /localStorage\.getItem\("theme-mode"\)/ },
];

let checkFailures = 0;
for (const check of checks) {
  if (check.regex.test(html)) {
    console.log(`  ✓ ${check.name} present`);
  } else {
    console.error(`  ✗ Missing ${check.name}`);
    checkFailures++;
  }
}

// 2. Extract and check anchors in index.html
const idMatches = [...html.matchAll(/id="([^"]+)"/g)].map(m => m[1]);
const definedIds = new Set(idMatches);

const anchorHrefMatches = [...html.matchAll(/href="#([^"]+)"/g)].map(m => m[1]);
let anchorErrors = 0;
for (const anchor of anchorHrefMatches) {
  if (definedIds.has(anchor)) {
    console.log(`  ✓ Anchor #${anchor} points to valid id`);
  } else {
    console.error(`  ✗ Anchor #${anchor} has no matching id in index.html`);
    anchorErrors++;
  }
}

// 3. Extract and check relative asset links
const assetMatches = [...html.matchAll(/(?:src|href)="(\/assets\/[^"]+)"/g)].map(m => m[1]);
let assetErrors = 0;
for (const asset of assetMatches) {
  const cleanAsset = asset.split('?')[0].split('#')[0];
  const localAssetPath = path.join(rootDir, cleanAsset);
  if (fs.existsSync(localAssetPath)) {
    console.log(`  ✓ Asset exists: ${cleanAsset}`);
  } else {
    console.error(`  ✗ Missing asset: ${cleanAsset}`);
    assetErrors++;
  }
}

// 4. Extract cross-section internal routes
const routeMatches = [...html.matchAll(/href="(\/(?:tools|mathlify|games|rasoi|itihaas|vigyan|yatra|resume|sitemap\.xml)\/?)"/g)].map(m => m[1]);
let routeErrors = 0;
for (const route of routeMatches) {
  const localRoutePath = path.join(rootDir, route.endsWith('/') ? `${route}index.html` : route);
  if (fs.existsSync(localRoutePath)) {
    console.log(`  ✓ Internal route exists: ${route}`);
  } else {
    console.error(`  ✗ Internal route missing: ${route}`);
    routeErrors++;
  }
}

console.log('\n--- Audit Summary ---');
console.log(`  Meta Checks: ${checks.length - checkFailures}/${checks.length}`);
console.log(`  Anchors Checked: ${anchorHrefMatches.length}, Errors: ${anchorErrors}`);
console.log(`  Assets Checked: ${assetMatches.length}, Errors: ${assetErrors}`);
console.log(`  Routes Checked: ${routeMatches.length}, Errors: ${routeErrors}`);

if (checkFailures > 0 || anchorErrors > 0 || assetErrors > 0 || routeErrors > 0) {
  console.error('\n✗ Portfolio link audit failed with errors!');
  process.exit(1);
} else {
  console.log('\n✓ All Portfolio links, assets, anchors, and schemas verified successfully!');
}
