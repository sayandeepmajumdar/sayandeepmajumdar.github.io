import { Tool } from '../types';

/**
 * Normalizes query string by stripping full URLs, protocol, domain, trailing slashes,
 * and extracting the tool slug/keyword if a URL or path is pasted.
 */
function normalizeQuery(rawQuery: string): {
  clean: string;
  slugCandidate: string;
  tokens: string[];
} {
  let q = rawQuery.trim().toLowerCase();

  // If user pasted a full URL or path:
  // e.g. "https://sayandeepmajumdar.github.io/api-tester/" or "http://localhost:3000/tools/developer/api-tester"
  if (
    q.includes('://') ||
    q.startsWith('//') ||
    q.includes('.github.io') ||
    q.includes('localhost') ||
    q.startsWith('http')
  ) {
    try {
      const urlStr = q.startsWith('http') ? q : `https://${q.replace(/^\/\//, '')}`;
      const parsed = new URL(urlStr);
      const pathParts = parsed.pathname.split('/').filter(Boolean);
      // Last path segment is typically the slug, e.g. "api-tester"
      if (pathParts.length > 0) {
        const lastPart = pathParts[pathParts.length - 1].replace(/\.html$/, '');
        q = lastPart;
      }
    } catch {
      // If URL parsing fails, continue with string cleanup
    }
  }

  // Strip leading/trailing slashes, .html
  q = q.replace(/^\/+|\/+$/g, '').replace(/\.html$/, '');

  // Generate tokens: split on whitespace, hyphens, underscores, slashes
  const tokens = q
    .split(/[\s\-_\/]+/)
    .map((t) => t.trim())
    .filter((t) => t.length > 0);

  // Normalized as single slug
  const slugCandidate = tokens.join('-');

  return {
    clean: q,
    slugCandidate,
    tokens,
  };
}

export function searchTools(tools: Tool[], query: string): Tool[] {
  const { clean, slugCandidate, tokens } = normalizeQuery(query);
  if (!clean || tokens.length === 0) return tools;

  const scored = tools
    .map((tool) => {
      let score = 0;
      const slug = tool.slug.toLowerCase();
      const id = tool.id.toLowerCase();
      const name = tool.name.toLowerCase();
      const nameNormalized = name.replace(/[^a-z0-9]/g, ' ');
      const desc = tool.description.toLowerCase();
      const cat = tool.category.toLowerCase();
      const secondCats = (tool.secondaryCategories || []).map((c) => c.toLowerCase());
      const badge = (tool.badge || '').toLowerCase();
      const tags = tool.tags.map((t) => t.toLowerCase());
      const tagsNormalized = tags.map((t) => t.replace(/[^a-z0-9]/g, ' '));

      // 1. Exact / strong match on Slug or ID
      if (slug === clean || slug === slugCandidate || id === clean || id === slugCandidate) {
        score += 200;
      } else if (slug.startsWith(clean) || slug.startsWith(slugCandidate)) {
        score += 120;
      } else if (slug.includes(clean) || slug.includes(slugCandidate)) {
        score += 80;
      }

      // 2. Exact / strong match on Name
      if (name === clean || nameNormalized === clean) {
        score += 150;
      } else if (name.startsWith(clean) || nameNormalized.startsWith(clean)) {
        score += 90;
      } else if (name.includes(clean) || nameNormalized.includes(clean)) {
        score += 60;
      }

      // 3. Exact / strong match on Tags
      for (let i = 0; i < tags.length; i++) {
        const tag = tags[i];
        const tagNorm = tagsNormalized[i];
        if (tag === clean || tagNorm === clean || tag === slugCandidate) {
          score += 70;
        } else if (tag.startsWith(clean) || tagNorm.startsWith(clean)) {
          score += 45;
        } else if (tag.includes(clean) || tagNorm.includes(clean)) {
          score += 30;
        }
      }

      // 4. Badge match
      if (badge) {
        if (badge === clean || badge === slugCandidate) score += 50;
        else if (badge.includes(clean)) score += 25;
      }

      // 5. Category match
      if (cat === clean || cat === slugCandidate) {
        score += 40;
      } else if (cat.includes(clean)) {
        score += 20;
      }
      if (secondCats.some((c) => c === clean || c.includes(clean))) {
        score += 20;
      }

      // 6. Description match
      if (desc.includes(clean)) {
        score += 20;
      }

      // 7. Multi-token matches
      let matchedTokenCount = 0;
      for (const token of tokens) {
        let tokenMatched = false;
        if (slug.includes(token) || id.includes(token)) {
          score += 25;
          tokenMatched = true;
        }
        if (name.includes(token) || nameNormalized.includes(token)) {
          score += 20;
          tokenMatched = true;
        }
        if (tags.some((t) => t.includes(token)) || tagsNormalized.some((t) => t.includes(token))) {
          score += 15;
          tokenMatched = true;
        }
        if (badge.includes(token)) {
          score += 10;
          tokenMatched = true;
        }
        if (cat.includes(token) || secondCats.some((c) => c.includes(token))) {
          score += 10;
          tokenMatched = true;
        }
        if (desc.includes(token)) {
          score += 5;
          tokenMatched = true;
        }
        if (tokenMatched) {
          matchedTokenCount++;
        }
      }

      // Bonus if all tokens match across the tool
      if (tokens.length > 1 && matchedTokenCount === tokens.length) {
        score += 50;
      }

      return { tool, score };
    })
    .filter((item) => item.score > 0);

  scored.sort((a, b) => b.score - a.score);
  return scored.map((item) => item.tool);
}

