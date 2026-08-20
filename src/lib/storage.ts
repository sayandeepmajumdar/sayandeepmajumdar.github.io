const FAVORITES_KEY = 'toolbox:favorites';
const RECENT_KEY = 'toolbox:recent_tools';
const THEME_KEY = 'toolbox:theme';

export function getFavorites(): string[] {
  try {
    const raw = localStorage.getItem(FAVORITES_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

export function toggleFavorite(toolId: string): boolean {
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
  return getFavorites().includes(toolId);
}

export function getRecentTools(): string[] {
  try {
    const raw = localStorage.getItem(RECENT_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

export function recordToolVisit(toolId: string) {
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

export function getStoredTheme(): 'light' | 'dark' {
  try {
    const t = localStorage.getItem(THEME_KEY) || localStorage.getItem('theme-mode');
    if (t === 'light' || t === 'dark') return t;
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
  } catch (e) {}
  return 'light';
}

export function setStoredTheme(theme: 'light' | 'dark') {
  try {
    localStorage.setItem(THEME_KEY, theme);
    localStorage.setItem('theme-mode', theme);
    applyTheme(theme);
    window.dispatchEvent(new CustomEvent('toolbox:theme-updated', { detail: theme }));
  } catch (e) {}
}

export function applyTheme(theme: 'light' | 'dark') {
  if (theme === 'dark') {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
}
