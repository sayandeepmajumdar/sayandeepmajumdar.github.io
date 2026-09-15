import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// 1. Read dist/itihaas/index.html template
const distItihaasIndex = path.join(rootDir, 'dist', 'itihaas', 'index.html');
if (!fs.existsSync(distItihaasIndex)) {
  console.error(`Error: ${distItihaasIndex} not found. Run 'vite build' first.`);
  process.exit(1);
}
const baseHtml = fs.readFileSync(distItihaasIndex, 'utf8');

function replaceMetaTags(html, { title, description, canonicalUrl, ogImage, structuredData }) {
  let updated = html;

  // Title
  updated = updated.replace(/<title>.*?<\/title>/, `<title>${title}</title>`);

  // Description
  updated = updated.replace(
    /<meta name="description" content=".*?" \/>/,
    `<meta name="description" content="${description.replace(/"/g, '&quot;')}" />`
  );

  // Canonical
  updated = updated.replace(
    /<link rel="canonical" href=".*?" \/>/,
    `<link rel="canonical" href="${canonicalUrl}" />`
  );

  // OpenGraph Title & Description
  updated = updated.replace(
    /<meta property="og:title" content=".*?" \/>/,
    `<meta property="og:title" content="${title.replace(/"/g, '&quot;')}" />`
  );
  updated = updated.replace(
    /<meta property="og:description" content=".*?" \/>/,
    `<meta property="og:description" content="${description.replace(/"/g, '&quot;')}" />`
  );
  updated = updated.replace(
    /<meta property="og:url" content=".*?" \/>/,
    `<meta property="og:url" content="${canonicalUrl}" />`
  );
  if (ogImage) {
    updated = updated.replace(
      /<meta property="og:image" content=".*?" \/>/,
      `<meta property="og:image" content="${ogImage}" />`
    );
  }

  // Twitter Cards
  updated = updated.replace(
    /<meta name="twitter:title" content=".*?" \/>/,
    `<meta name="twitter:title" content="${title.replace(/"/g, '&quot;')}" />`
  );
  updated = updated.replace(
    /<meta name="twitter:description" content=".*?" \/>/,
    `<meta name="twitter:description" content="${description.replace(/"/g, '&quot;')}" />`
  );
  if (ogImage) {
    updated = updated.replace(
      /<meta name="twitter:image" content=".*?" \/>/,
      `<meta property="twitter:image" content="${ogImage}" />`
    );
  }

  // Inject / Replace JSON-LD structured data
  if (structuredData) {
    const jsonLdString = JSON.stringify(structuredData, null, 2);
    updated = updated.replace(
      /<script type="application\/ld\+json">[\s\S]*?<\/script>/,
      `<script type="application/ld+json">\n${jsonLdString}\n  </script>`
    );
  }

  return updated;
}

// 2. Define SEO metadata for each of the 5 era pages
const eraPages = [
  {
    subPath: 'ancient',
    title: 'Ancient India (2500 BCE – 1206 CE) — Itihaas Timeline',
    description:
      'Explore Ancient India: Indus Valley civilization, Vedic philosophy, the Mauryan Empire under Ashoka, classical Gupta mathematics, and Chola naval supremacy.',
    canonicalUrl: 'https://sayandeepmajumdar.github.io/itihaas/ancient/',
    ogImage: 'https://images.unsplash.com/photo-1599837565318-67429bde7162?auto=format&fit=crop&w=1200&q=80',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'Ancient India Historical Timeline',
      url: 'https://sayandeepmajumdar.github.io/itihaas/ancient/',
      description: 'Chronological timeline of Ancient India spanning 2500 BCE to 1206 CE.',
      publisher: {
        '@type': 'Organization',
        name: 'Itihaas',
        url: 'https://sayandeepmajumdar.github.io/itihaas/'
      }
    }
  },
  {
    subPath: 'medieval',
    title: 'Medieval India (1206 – 1757 CE) — Itihaas Timeline',
    description:
      'Explore Medieval India: Delhi Sultanate, Vijayanagara glory at Hampi, Mughal cultural synthesis and architecture, and Chhatrapati Shivaji Maharaj’s Swarajya.',
    canonicalUrl: 'https://sayandeepmajumdar.github.io/itihaas/medieval/',
    ogImage: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=80',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'Medieval India Historical Timeline',
      url: 'https://sayandeepmajumdar.github.io/itihaas/medieval/',
      description: 'Chronological timeline of Medieval India spanning 1206 to 1757 CE.',
      publisher: {
        '@type': 'Organization',
        name: 'Itihaas',
        url: 'https://sayandeepmajumdar.github.io/itihaas/'
      }
    }
  },
  {
    subPath: 'colonial',
    title: 'Colonial Era (1757 – 1857 CE) — Itihaas Timeline',
    description:
      'Explore the Colonial Era: Battle of Plassey, Company territorial rule, economic drain of wealth, early soldier mutinies, and the Santhal tribal revolution.',
    canonicalUrl: 'https://sayandeepmajumdar.github.io/itihaas/colonial/',
    ogImage: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=1200&q=80',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'Colonial Era Historical Timeline',
      url: 'https://sayandeepmajumdar.github.io/itihaas/colonial/',
      description: 'Chronological timeline of the Colonial Era in India from 1757 to 1857 CE.',
      publisher: {
        '@type': 'Organization',
        name: 'Itihaas',
        url: 'https://sayandeepmajumdar.github.io/itihaas/'
      }
    }
  },
  {
    subPath: 'freedom-struggle',
    title: 'Indian Freedom Struggle (1857 – 1947) — Itihaas Timeline',
    description:
      'Chronicle of the Indian Freedom Struggle: 1857 Revolt, Swadeshi Movement, Jallianwala Bagh, Non-Cooperation, Dandi Salt March, Quit India, Netaji’s INA, and 1947 Independence.',
    canonicalUrl: 'https://sayandeepmajumdar.github.io/itihaas/freedom-struggle/',
    ogImage: 'https://images.unsplash.com/photo-1532375810709-75b1da00537c?auto=format&fit=crop&w=1200&q=80',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'Indian Freedom Struggle Timeline (1857–1947)',
      url: 'https://sayandeepmajumdar.github.io/itihaas/freedom-struggle/',
      description: 'Pivotal milestones, leaders, and turning points of India’s 90-year Freedom Struggle.',
      publisher: {
        '@type': 'Organization',
        name: 'Itihaas',
        url: 'https://sayandeepmajumdar.github.io/itihaas/'
      }
    }
  },
  {
    subPath: 'post-independence',
    title: 'Post-Independence India (1947 – Present) — Itihaas Timeline',
    description:
      'Explore Modern India: Integration of 565 princely states, Ambedkar’s Constitution, Green Revolution, ISRO space exploration, and Chandrayaan lunar missions.',
    canonicalUrl: 'https://sayandeepmajumdar.github.io/itihaas/post-independence/',
    ogImage: 'https://images.unsplash.com/photo-1599837565318-67429bde7162?auto=format&fit=crop&w=1200&q=80',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'Post-Independence India Timeline',
      url: 'https://sayandeepmajumdar.github.io/itihaas/post-independence/',
      description: 'Chronological timeline of India from 1947 to the present.',
      publisher: {
        '@type': 'Organization',
        name: 'Itihaas',
        url: 'https://sayandeepmajumdar.github.io/itihaas/'
      }
    }
  }
];

// 3. Write era pages to dist/itihaas and itihaas/
let pageCount = 0;
for (const page of eraPages) {
  const pageHtml = replaceMetaTags(baseHtml, page);

  // In dist/itihaas/<subPath>/index.html
  const distDir = path.join(rootDir, 'dist', 'itihaas', page.subPath);
  fs.mkdirSync(distDir, { recursive: true });
  fs.writeFileSync(path.join(distDir, 'index.html'), pageHtml, 'utf8');

  // In itihaas/<subPath>/index.html
  const rootPageDir = path.join(rootDir, 'itihaas', page.subPath);
  fs.mkdirSync(rootPageDir, { recursive: true });
  fs.writeFileSync(path.join(rootPageDir, 'index.html'), pageHtml, 'utf8');

  pageCount++;
}

console.log(`Successfully generated ${pageCount} static era pages for Itihaas with rich Schema.org JSON-LD.`);
