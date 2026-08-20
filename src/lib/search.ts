import { Tool } from '../types';

export function searchTools(tools: Tool[], query: string): Tool[] {
  const cleanQuery = query.trim().toLowerCase();
  if (!cleanQuery) return tools;

  const queryTerms = cleanQuery.split(/\s+/).filter(Boolean);

  const scored = tools
    .map((tool) => {
      let score = 0;
      const name = tool.name.toLowerCase();
      const desc = tool.description.toLowerCase();
      const cat = tool.category.toLowerCase();
      const tags = tool.tags.map((t) => t.toLowerCase());

      // Exact name match
      if (name === cleanQuery) score += 100;
      else if (name.startsWith(cleanQuery)) score += 60;
      else if (name.includes(cleanQuery)) score += 40;

      // Tags match
      for (const tag of tags) {
        if (tag === cleanQuery) score += 50;
        else if (tag.includes(cleanQuery)) score += 25;
      }

      // Category match
      if (cat.includes(cleanQuery)) score += 20;

      // Description match
      if (desc.includes(cleanQuery)) score += 10;

      // Multi-word matches
      for (const term of queryTerms) {
        if (name.includes(term)) score += 15;
        if (tags.some((t) => t.includes(term))) score += 10;
        if (desc.includes(term)) score += 5;
      }

      return { tool, score };
    })
    .filter((item) => item.score > 0);

  scored.sort((a, b) => b.score - a.score);
  return scored.map((item) => item.tool);
}
