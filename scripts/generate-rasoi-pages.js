import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// 1. Read dist/rasoi/index.html template
const distRasoiIndex = path.join(rootDir, 'dist', 'rasoi', 'index.html');
if (!fs.existsSync(distRasoiIndex)) {
  console.error(`Error: ${distRasoiIndex} not found. Run 'vite build' first.`);
  process.exit(1);
}
const baseHtml = fs.readFileSync(distRasoiIndex, 'utf8');

// 2. Parse 50 recipes from src/rasoi/data/recipes.ts
const recipesFile = path.join(rootDir, 'src', 'rasoi', 'data', 'recipes.ts');
const recipesContent = fs.readFileSync(recipesFile, 'utf8');
const startToken = 'export const RECIPES: Recipe[] = ';
const endToken = 'export const REGIONS';
const startIdx = recipesContent.indexOf(startToken);
const endIdx = recipesContent.indexOf(endToken);
const jsonArrayStr = recipesContent
  .substring(startIdx + startToken.length, endIdx)
  .trim()
  .replace(/;\s*$/, '');
const recipes = JSON.parse(jsonArrayStr);
console.log(`Loaded ${recipes.length} recipes for static page generation.`);

function formatDurationIso(minutes) {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h > 0 && m > 0) return `PT${h}H${m}M`;
  if (h > 0) return `PT${h}H`;
  return `PT${m}M`;
}

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
      `<meta name="twitter:image" content="${ogImage}" />`
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

// 3. Generate static pages for sections
const sectionPages = [
  {
    subPath: 'explore',
    title: 'Explore 50+ Authentic Indian Recipes — Rasoi',
    description:
      'Search, filter, and discover 50+ authentic regional Indian recipes across North Indian, South Indian, Bengali, Punjabi, Gujarati, and Maharashtrian cuisines.',
    canonicalUrl: 'https://sayandeepmajumdar.github.io/rasoi/explore/',
    ogImage: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=1200&q=80',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'Explore Authentic Indian Recipes',
      url: 'https://sayandeepmajumdar.github.io/rasoi/explore/',
      description: 'Directory of 50+ authentic regional Indian recipes with ingredients and cooking instructions.',
      publisher: {
        '@type': 'Organization',
        name: 'Rasoi',
        url: 'https://sayandeepmajumdar.github.io/rasoi/'
      }
    }
  },
  {
    subPath: 'favorites',
    title: 'My Saved Indian Recipes — Rasoi',
    description: 'Your personal collection of saved favorite authentic Indian recipes.',
    canonicalUrl: 'https://sayandeepmajumdar.github.io/rasoi/favorites/',
    ogImage: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=1200&q=80',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'Saved Favorite Indian Recipes',
      url: 'https://sayandeepmajumdar.github.io/rasoi/favorites/'
    }
  },
  {
    subPath: 'about',
    title: 'About Rasoi — Celebrating India\'s Rich Culinary Heritage',
    description:
      'Learn about Rasoi\'s mission to celebrate and preserve authentic Indian culinary traditions, spice palettes, and regional cooking techniques.',
    canonicalUrl: 'https://sayandeepmajumdar.github.io/rasoi/about/',
    ogImage: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&w=1200&q=80',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'AboutPage',
      name: 'About Rasoi & Indian Culinary Heritage',
      url: 'https://sayandeepmajumdar.github.io/rasoi/about/',
      description: 'The story and philosophy of Rasoi authentic Indian recipe finder.'
    }
  }
];

// Write section pages to dist/rasoi and rasoi/
for (const section of sectionPages) {
  const pageHtml = replaceMetaTags(baseHtml, section);

  // In dist/rasoi/<subPath>/index.html
  const distDir = path.join(rootDir, 'dist', 'rasoi', section.subPath);
  fs.mkdirSync(distDir, { recursive: true });
  fs.writeFileSync(path.join(distDir, 'index.html'), pageHtml, 'utf8');

  // In rasoi/<subPath>/index.html
  const rootPageDir = path.join(rootDir, 'rasoi', section.subPath);
  fs.mkdirSync(rootPageDir, { recursive: true });
  fs.writeFileSync(path.join(rootPageDir, 'index.html'), pageHtml, 'utf8');
}
console.log(`Generated ${sectionPages.length} section pages (explore, favorites, about).`);

// 4. Generate static pages for all 50 recipes with Schema.org Recipe JSON-LD
let recipeCount = 0;
for (const recipe of recipes) {
  const canonicalUrl = `https://sayandeepmajumdar.github.io/rasoi/recipe/${recipe.slug}/`;
  const title = `${recipe.name} Recipe — Authentic Indian Cooking | Rasoi`;
  const description = `${recipe.description} Complete step-by-step procedure, authentic measurements, pro tips, and nutritional breakdown.`;

  // Flat ingredients array for Schema.org
  const ingredientsList = recipe.ingredients.flatMap((group) =>
    group.items.map((item) => {
      const parts = [];
      if (item.amount) parts.push(item.amount);
      if (item.unit) parts.push(item.unit);
      parts.push(item.name);
      if (item.notes) parts.push(`(${item.notes})`);
      return parts.join(' ');
    })
  );

  // HowToStep array for Schema.org
  const instructionsList = recipe.instructions.map((inst) => ({
    '@type': 'HowToStep',
    name: inst.title,
    text: inst.instruction,
    url: `${canonicalUrl}#step-${inst.step}`
  }));

  const structuredData = {
    '@context': 'https://schema.org/',
    '@type': 'Recipe',
    name: recipe.name,
    image: [recipe.image],
    description: recipe.description,
    keywords: recipe.tags.join(', '),
    author: {
      '@type': 'Organization',
      name: 'Rasoi'
    },
    prepTime: formatDurationIso(recipe.prepTime),
    cookTime: formatDurationIso(recipe.cookTime),
    totalTime: formatDurationIso(recipe.totalTime),
    recipeCategory: recipe.category,
    recipeCuisine: recipe.cuisine,
    recipeYield: `${recipe.servings} servings`,
    nutrition: {
      '@type': 'NutritionInformation',
      calories: `${recipe.nutrition.calories} calories`,
      proteinContent: `${recipe.nutrition.protein} g`,
      carbohydrateContent: `${recipe.nutrition.carbs} g`,
      fatContent: `${recipe.nutrition.fat} g`,
      fiberContent: `${recipe.nutrition.fiber} g`
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: recipe.rating.toString(),
      reviewCount: recipe.ratingCount.toString(),
      bestRating: '5',
      worstRating: '1'
    },
    recipeIngredient: ingredientsList,
    recipeInstructions: instructionsList
  };

  const pageHtml = replaceMetaTags(baseHtml, {
    title,
    description,
    canonicalUrl,
    ogImage: recipe.image,
    structuredData
  });

  // Write to dist/rasoi/recipe/<slug>/index.html
  const distRecipeDir = path.join(rootDir, 'dist', 'rasoi', 'recipe', recipe.slug);
  fs.mkdirSync(distRecipeDir, { recursive: true });
  fs.writeFileSync(path.join(distRecipeDir, 'index.html'), pageHtml, 'utf8');

  // Write to rasoi/recipe/<slug>/index.html
  const rootRecipeDir = path.join(rootDir, 'rasoi', 'recipe', recipe.slug);
  fs.mkdirSync(rootRecipeDir, { recursive: true });
  fs.writeFileSync(path.join(rootRecipeDir, 'index.html'), pageHtml, 'utf8');

  recipeCount++;
}

console.log(`Successfully generated ${recipeCount} static recipe pages with rich Schema.org JSON-LD.`);
