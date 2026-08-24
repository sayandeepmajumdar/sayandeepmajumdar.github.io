#!/usr/bin/env node

/**
 * Toolzy Extension Build Pipeline
 * Builds production-ready Chrome (MV3) and Firefox (MV3) extensions.
 * Extracts inline scripts and vendors external scripts for 100% offline CSP compliance.
 */

import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ROOT_DIR = path.resolve(__dirname, '..');
const DIST_EXT = path.join(ROOT_DIR, 'dist-extension');
const DIST_CHROME = path.join(ROOT_DIR, 'dist-extension-chrome');
const DIST_FIREFOX = path.join(ROOT_DIR, 'dist-extension-firefox');
const DIST_DIR = path.join(ROOT_DIR, 'dist');
const DIST_PACKAGES = path.join(ROOT_DIR, 'dist-packages');
const VENDOR_CACHE = path.join(ROOT_DIR, '.vendor-cache');

// Directories to exclude from copying into the extension package
const EXCLUDE_DIRS = new Set([
  '.git',
  '.github',
  '.claude',
  '.gemini',
  '.vendor-cache',
  'node_modules',
  'dist',
  'dist-extension',
  'dist-extension-chrome',
  'dist-extension-firefox',
  'src',
  'scripts',
  'extension',
]);

function copyDirRecursive(src, dest) {
  if (!fs.existsSync(src)) return;
  fs.mkdirSync(dest, { recursive: true });
  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDirRecursive(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

function cleanDir(dir) {
  if (fs.existsSync(dir)) {
    fs.rmSync(dir, { recursive: true, force: true });
  }
  fs.mkdirSync(dir, { recursive: true });
}

function createZip(sourceDir, zipFilePath) {
  if (fs.existsSync(zipFilePath)) fs.unlinkSync(zipFilePath);
  execSync(`cd "${sourceDir}" && zip -r -q "${zipFilePath}" .`, { stdio: 'inherit' });
}

async function fetchVendorScript(url, customName = null) {
  fs.mkdirSync(VENDOR_CACHE, { recursive: true });

  const hash = crypto.createHash('md5').update(url).digest('hex').slice(0, 8);
  const parsedUrl = new URL(url);
  const baseName = customName || path.basename(parsedUrl.pathname) || 'script.js';
  const safeName = customName || `${hash}-${baseName.replace(/[^a-zA-Z0-9._-]/g, '_')}`;
  const cachePath = path.join(VENDOR_CACHE, safeName);

  if (fs.existsSync(cachePath)) {
    return { fileName: safeName, content: fs.readFileSync(cachePath, 'utf8') };
  }

  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const res = await fetch(url, {
        headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' },
      });
      if (!res.ok) throw new Error(`HTTP ${res.status} ${res.statusText}`);
      const code = await res.text();
      fs.writeFileSync(cachePath, code, 'utf8');
      return { fileName: safeName, content: code };
    } catch (err) {
      if (attempt === 3) {
        console.warn(`   ⚠️ Warning: Failed to download remote script ${url}: ${err.message}`);
        return null;
      }
      await new Promise(r => setTimeout(r, 1000 * attempt));
    }
  }
}

async function processHtmlForManifestV3(distPath, vendorFilesMap) {
  const vendorDir = path.join(distPath, '_vendor');
  fs.mkdirSync(vendorDir, { recursive: true });

  // Download known extra scripts (e.g. PDF.js worker)
  const pdfWorkerUrl = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
  const pdfWorkerInfo = await fetchVendorScript(pdfWorkerUrl, 'pdf.worker.min.js');
  if (pdfWorkerInfo) {
    fs.writeFileSync(path.join(vendorDir, 'pdf.worker.min.js'), pdfWorkerInfo.content, 'utf8');
    vendorFilesMap.set(pdfWorkerUrl, { fileName: 'pdf.worker.min.js', content: pdfWorkerInfo.content });
  }

  // Create safe storage shim
  const safeStorageCode = `
(function() {
  try {
    var testKey = '__toolzy_test__';
    window.localStorage.setItem(testKey, testKey);
    window.localStorage.removeItem(testKey);
  } catch (e) {
    var mem = {};
    try {
      Object.defineProperty(window, 'localStorage', {
        value: {
          getItem: function(k) { return mem[k] !== undefined ? mem[k] : null; },
          setItem: function(k, v) { mem[k] = String(v); },
          removeItem: function(k) { delete mem[k]; },
          clear: function() { mem = {}; },
          key: function(i) { return Object.keys(mem)[i] || null; },
          get length() { return Object.keys(mem).length; }
        },
        writable: true,
        configurable: true
      });
    } catch(err) {}
  }
})();
`.trim();

  fs.writeFileSync(path.join(vendorDir, 'safe-storage.js'), safeStorageCode, 'utf8');

  // Find all tool folders containing index.html
  const entries = fs.readdirSync(distPath, { withFileTypes: true });

  for (const entry of entries) {
    if (!entry.isDirectory() || entry.name === '_vendor' || entry.name === 'assets' || entry.name === 'icons') {
      continue;
    }

    const htmlPath = path.join(distPath, entry.name, 'index.html');
    if (!fs.existsSync(htmlPath)) continue;

    let html = fs.readFileSync(htmlPath, 'utf8');

    // 1. Download & Replace Remote CDN scripts
    const remoteScriptRegex = /<script\s+[^>]*src=["'](https?:\/\/[^"']+)["'][^>]*>\s*<\/script>/gi;
    const remoteMatches = [...html.matchAll(remoteScriptRegex)];

    for (const match of remoteMatches) {
      const fullTag = match[0];
      const url = match[1];

      let vendorInfo = vendorFilesMap.get(url);
      if (!vendorInfo) {
        vendorInfo = await fetchVendorScript(url);
        if (vendorInfo) {
          vendorFilesMap.set(url, vendorInfo);
        }
      }

      if (vendorInfo) {
        fs.writeFileSync(path.join(vendorDir, vendorInfo.fileName), vendorInfo.content, 'utf8');
        const localTag = `<script src="../_vendor/${vendorInfo.fileName}"></script>`;
        html = html.replace(fullTag, localTag);
      }
    }

    // 2. Download & Replace Remote CSS Stylesheets
    const remoteCssRegex = /<link\s+[^>]*rel=["']stylesheet["'][^>]*href=["'](https?:\/\/[^"']+)["'][^>]*>/gi;
    const remoteCssMatches = [...html.matchAll(remoteCssRegex)];

    for (const match of remoteCssMatches) {
      const fullTag = match[0];
      const url = match[1];

      // Skip Google Fonts in CSS tags as fonts are optional
      if (url.includes('fonts.googleapis.com')) continue;

      let vendorInfo = vendorFilesMap.get(url);
      if (!vendorInfo) {
        vendorInfo = await fetchVendorScript(url);
        if (vendorInfo) {
          vendorFilesMap.set(url, vendorInfo);
        }
      }

      if (vendorInfo) {
        fs.writeFileSync(path.join(vendorDir, vendorInfo.fileName), vendorInfo.content, 'utf8');
        const localTag = fullTag.replace(url, `../_vendor/${vendorInfo.fileName}`);
        html = html.replace(fullTag, localTag);
      }
    }

    // 2. Extract Inline <script> tags to external .js files
    let scriptCounter = 0;
    const inlineScriptRegex = /<script(?![^>]*\bsrc=)(?![^>]*\btype=["']application\/ld\+json["'])[^>]*>([\s\S]*?)<\/script>/gi;

    html = html.replace(inlineScriptRegex, (match, scriptBody) => {
      if (!scriptBody.trim()) return '';

      scriptCounter++;
      const scriptFileName = `tool-script-${scriptCounter}.js`;
      const scriptFilePath = path.join(distPath, entry.name, scriptFileName);

      fs.writeFileSync(scriptFilePath, scriptBody, 'utf8');
      return `<script src="./${scriptFileName}"></script>`;
    });

    // 3. Inject safe-storage shim into <head>
    if (html.includes('<head>')) {
      html = html.replace('<head>', '<head>\n  <script src="../_vendor/safe-storage.js"></script>');
    } else {
      html = `<script src="../_vendor/safe-storage.js"></script>\n` + html;
    }

    fs.writeFileSync(htmlPath, html, 'utf8');
  }
}

async function main() {
  console.log('🚀 Building Toolzy Extensions (Chrome & Firefox MV3)...');
  const startTime = Date.now();

  // 1. Run Vite build with extension config
  console.log('📦 Step 1: Compiling extension React bundles via Vite...');
  execSync('npx vite build --config vite.extension.config.ts', {
    cwd: ROOT_DIR,
    stdio: 'inherit',
  });

  // 2. Move HTML files from dist-extension/extension/ to dist-extension/ root if needed
  const nestedExtensionDir = path.join(DIST_EXT, 'extension');
  if (fs.existsSync(nestedExtensionDir)) {
    const htmlFiles = fs.readdirSync(nestedExtensionDir);
    for (const file of htmlFiles) {
      const srcFile = path.join(nestedExtensionDir, file);
      const destFile = path.join(DIST_EXT, file);
      fs.copyFileSync(srcFile, destFile);
    }
    fs.rmSync(nestedExtensionDir, { recursive: true, force: true });
  }

  // 3. Prepare Chrome and Firefox destination directories
  console.log('📂 Step 2: Preparing distribution folders...');
  cleanDir(DIST_CHROME);
  cleanDir(DIST_FIREFOX);

  // 4. Copy base compiled extension assets
  console.log('📄 Step 3: Copying compiled extension assets...');
  copyDirRecursive(DIST_EXT, DIST_CHROME);
  copyDirRecursive(DIST_EXT, DIST_FIREFOX);

  // 5. Copy icons
  console.log('🎨 Step 4: Copying extension icons...');
  const iconsSrc = path.join(ROOT_DIR, 'extension', 'icons');
  copyDirRecursive(iconsSrc, path.join(DIST_CHROME, 'icons'));
  copyDirRecursive(iconsSrc, path.join(DIST_FIREFOX, 'icons'));

  // 6. Copy Manifests
  console.log('⚙️ Step 5: Applying browser manifests...');
  fs.copyFileSync(
    path.join(ROOT_DIR, 'extension', 'manifest.chrome.json'),
    path.join(DIST_CHROME, 'manifest.json')
  );
  fs.copyFileSync(
    path.join(ROOT_DIR, 'extension', 'manifest.firefox.json'),
    path.join(DIST_FIREFOX, 'manifest.json')
  );

  // 7. Copy all tool sandboxes and common site assets
  console.log('🛠️ Step 6: Bundling all 40+ client-side tool suites...');
  const rootEntries = fs.readdirSync(ROOT_DIR, { withFileTypes: true });
  let toolCount = 0;

  for (const entry of rootEntries) {
    if (entry.isDirectory() && !EXCLUDE_DIRS.has(entry.name)) {
      const toolSrc = path.join(ROOT_DIR, entry.name);
      copyDirRecursive(toolSrc, path.join(DIST_CHROME, entry.name));
      copyDirRecursive(toolSrc, path.join(DIST_FIREFOX, entry.name));
      if (entry.name !== 'assets') {
        toolCount++;
      }
    }
  }
  console.log(`   ✓ Copied ${toolCount} tool sandboxes & shared assets`);

  // 8. Transform tool HTML files for Manifest V3 (externalize inline scripts, vendor CDN assets)
  console.log('⚡ Step 7: Processing tool sandboxes for 100% offline MV3 compliance...');
  const vendorFilesMap = new Map();
  await processHtmlForManifestV3(DIST_CHROME, vendorFilesMap);
  await processHtmlForManifestV3(DIST_FIREFOX, vendorFilesMap);
  console.log(`   ✓ Extracted all inline scripts to external JS files`);
  console.log(`   ✓ Vendored ${vendorFilesMap.size} remote libraries for offline execution`);

  // 9. Handle optional ZIP packaging
  const shouldZip = process.argv.includes('--zip');
  if (shouldZip) {
    console.log('🗜️ Step 8: Packaging ZIP distributions for Web Store & AMO...');
    fs.mkdirSync(DIST_PACKAGES, { recursive: true });
    fs.mkdirSync(DIST_DIR, { recursive: true });

    const chromeZip = path.join(DIST_PACKAGES, 'toolzy-chrome-extension.zip');
    const firefoxZip = path.join(DIST_PACKAGES, 'toolzy-firefox-extension.zip');
    const sourceZip = path.join(DIST_PACKAGES, 'toolzy-source-code.zip');

    createZip(DIST_CHROME, chromeZip);
    createZip(DIST_FIREFOX, firefoxZip);

    if (fs.existsSync(sourceZip)) fs.unlinkSync(sourceZip);
    execSync(
      `cd "${ROOT_DIR}" && zip -r -q "${sourceZip}" . -x "node_modules/*" -x "dist/*" -x "dist-packages/*" -x "dist-extension/*" -x "dist-extension-chrome/*" -x "dist-extension-firefox/*" -x ".git/*" -x ".vendor-cache/*" -x ".gemini/*" -x ".claude/*"`,
      { stdio: 'inherit' }
    );

    // Also copy to dist/ for convenience
    fs.copyFileSync(chromeZip, path.join(DIST_DIR, 'toolzy-chrome-extension.zip'));
    fs.copyFileSync(firefoxZip, path.join(DIST_DIR, 'toolzy-firefox-extension.zip'));
    fs.copyFileSync(sourceZip, path.join(DIST_DIR, 'toolzy-source-code.zip'));

    const chromeSize = (fs.statSync(chromeZip).size / (1024 * 1024)).toFixed(2);
    const firefoxSize = (fs.statSync(firefoxZip).size / (1024 * 1024)).toFixed(2);
    const sourceSize = (fs.statSync(sourceZip).size / (1024 * 1024)).toFixed(2);
    console.log(`   ✓ Chrome ZIP:      dist-packages/toolzy-chrome-extension.zip (${chromeSize} MB)`);
    console.log(`   ✓ Firefox ZIP:     dist-packages/toolzy-firefox-extension.zip (${firefoxSize} MB)`);
    console.log(`   ✓ Source Code ZIP: dist-packages/toolzy-source-code.zip (${sourceSize} MB)`);
  }

  const duration = ((Date.now() - startTime) / 1000).toFixed(2);
  console.log(`\n✨ Extension build completed in ${duration}s!`);
  console.log('\nReady to test:');
  console.log('  • Chrome / Edge: Load unpacked -> ' + path.relative(ROOT_DIR, DIST_CHROME));
  console.log('  • Firefox:       Load Temporary Add-on -> ' + path.join(path.relative(ROOT_DIR, DIST_FIREFOX), 'manifest.json'));
}

main().catch((err) => {
  console.error('❌ Build failed:', err);
  process.exit(1);
});
