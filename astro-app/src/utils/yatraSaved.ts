export const SAVED_STORAGE_KEY = 'yatra_saved_destinations';
export const RECENT_STORAGE_KEY = 'yatra_recent_destinations';

export function getSavedIds(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const item = localStorage.getItem(SAVED_STORAGE_KEY);
    return item ? JSON.parse(item) : [];
  } catch (e) {
    return [];
  }
}

export function toggleSavedId(id: string): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const current = getSavedIds();
    const updated = current.includes(id)
      ? current.filter((x) => x !== id)
      : [...current, id];
    localStorage.setItem(SAVED_STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event('storage'));
    return updated;
  } catch (e) {
    return [];
  }
}

export function getRecentIds(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const item = localStorage.getItem(RECENT_STORAGE_KEY);
    return item ? JSON.parse(item) : [];
  } catch (e) {
    return [];
  }
}

export function addRecentId(id: string): void {
  if (typeof window === 'undefined') return;
  try {
    const current = getRecentIds().filter((x) => x !== id);
    const updated = [id, ...current].slice(0, 8);
    localStorage.setItem(RECENT_STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event('storage'));
  } catch (e) {
    // ignore
  }
}
