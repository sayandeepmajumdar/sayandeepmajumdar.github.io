import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const mathlifyDir = path.join(rootDir, 'mathlify');

console.log('=== Starting Mathlify Link & Asset Audit ===');

function getAllHtmlFiles(dir) {
  let files = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files = files.concat(getAllHtmlFiles(fullPath));
    } else if (entry.isFile() && entry.name.endsWith('.html')) {
      files.push(fullPath);
    }
  }
  return files;
}

const htmlFiles = getAllHtmlFiles(mathlifyDir);
console.log(`Found ${htmlFiles.length} Mathlify HTML files to audit.`);

let totalLinks = 0;
let errors = [];

for (const file of htmlFiles) {
  const content = fs.readFileSync(file, 'utf8');
  const relFile = path.relative(rootDir, file);

  // Match href, src
  const linkRegex = /(?:href|src)=["']([^"']+)["']/g;
  let match;
  while ((match = linkRegex.exec(content)) !== null) {
    totalLinks++;
    const link = match[1].trim();

    // Skip mailto, tel, javascript, data URLs, and external links
    if (
      link.startsWith('mailto:') ||
      link.startsWith('tel:') ||
      link.startsWith('javascript:') ||
      link.startsWith('data:') ||
      link.startsWith('http://') ||
      link.startsWith('https://') ||
      link.startsWith('#') ||
      link.startsWith('//')
    ) {
      continue;
    }

    // Clean anchor hash and query params
    const cleanLink = link.split('#')[0].split('?')[0];
    if (!cleanLink) continue;

    let targetPath;
    if (cleanLink.startsWith('/')) {
      targetPath = path.join(rootDir, cleanLink);
    } else {
      targetPath = path.resolve(path.dirname(file), cleanLink);
    }

    // Check if target file exists or target directory has index.html
    let exists = false;
    if (fs.existsSync(targetPath)) {
      const stat = fs.statSync(targetPath);
      if (stat.isFile()) {
        exists = true;
      } else if (stat.isDirectory()) {
        exists = fs.existsSync(path.join(targetPath, 'index.html'));
      }
    } else if (cleanLink.endsWith('/') && fs.existsSync(targetPath + 'index.html')) {
      exists = true;
    } else if (!path.extname(targetPath) && fs.existsSync(targetPath + '.html')) {
      exists = true;
    }

    if (!exists) {
      errors.push({
        file: relFile,
        link: link,
        resolved: path.relative(rootDir, targetPath)
      });
    }
  }
}

console.log(`Audited ${totalLinks} total links and asset references.`);
if (errors.length > 0) {
  console.error(`\n❌ Found ${errors.length} broken links:`);
  errors.slice(0, 20).forEach(e => {
    console.error(`  In ${e.file}: Link "${e.link}" -> Resolved: "${e.resolved}" NOT FOUND`);
  });
  if (errors.length > 20) {
    console.error(`  ... and ${errors.length - 20} more errors.`);
  }
  process.exit(1);
} else {
  console.log('✓ All Mathlify links, stylesheets, scripts, and assets verified successfully! (0 errors)');
}
