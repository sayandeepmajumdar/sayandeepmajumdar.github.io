const FAVORITES_KEY = 'toolbox:favorites';
const RECENT_KEY = 'toolbox:recent_tools';
const THEME_KEY = 'toolbox:theme';

export function getFavorites(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(FAVORITES_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

export function toggleFavorite(toolId: string): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const favs = getFavorites();
    const index = favs.indexOf(toolId);
    let isFav = false;
    if (index >= 0) {
      favs.splice(index, 1);
      isFav = false;
    } else {
      favs.unshift(toolId);
      isFav = true;
    }
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favs));
    window.dispatchEvent(new CustomEvent('toolbox:favorites-updated', { detail: favs }));
    return isFav;
  } catch (e) {
    return false;
  }
}

export function isFavorite(toolId: string): boolean {
  if (typeof window === 'undefined') return false;
  return getFavorites().includes(toolId);
}

export function getRecentTools(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(RECENT_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

export function recordToolVisit(toolId: string) {
  if (typeof window === 'undefined') return;
  try {
    let recents = getRecentTools();
    recents = recents.filter((id) => id !== toolId);
    recents.unshift(toolId);
    if (recents.length > 10) {
      recents = recents.slice(0, 10);
    }
    localStorage.setItem(RECENT_KEY, JSON.stringify(recents));
    window.dispatchEvent(new CustomEvent('toolbox:recents-updated', { detail: recents }));
  } catch (e) {
    // Ignore storage quota
  }
}

export function getStandaloneToolUrl(slug: string): string {
  if (slug === 'mathlify') return '/mathlify/index.html';
  if (slug === 'resume') return '/resume/index.html';
  return `/tools/${slug}/index.html`;
}
