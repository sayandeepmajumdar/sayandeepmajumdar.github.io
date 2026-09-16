import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

console.log('--- Auditing Astro Tools Internal Links & Assets ---');

const toolsDir = path.join(rootDir, 'tools');
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
      // Check if file itself exists without index.html
      const altPath = path.join(rootDir, cleanHref);
      if (!fs.existsSync(altPath)) {
        errors.push(`Broken link in ${path.relative(rootDir, filePath)}: ${href} -> resolved to ${path.relative(rootDir, targetPath)}`);
      }
    }
  }
}

function traverse(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      traverse(full);
    } else if (entry.name === 'index.html') {
      checkFile(full);
    }
  }
}

// Only check Astro tools pages (index + 12 categories)
checkFile(path.join(toolsDir, 'index.html'));

const categories = [
  'developer', 'security', 'design', 'data', 'text', 'pdf-documents',
  'images', 'business', 'finance', 'marketing', 'media', 'productivity'
];

for (const cat of categories) {
  const catDir = path.join(toolsDir, cat);
  if (fs.existsSync(catDir)) {
    traverse(catDir);
  }
}

console.log(`Audited ${filesChecked} Astro Tools HTML pages, ${linksChecked} links checked.`);
if (errors.length > 0) {
  console.error(`Found ${errors.length} errors:`);
  errors.slice(0, 20).forEach(e => console.error(' - ' + e));
  process.exit(1);
} else {
  console.log('✓ All Astro Tools links, stylesheets, scripts, and embedded assets resolve successfully!');
}
