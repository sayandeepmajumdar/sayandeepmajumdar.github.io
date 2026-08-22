export type ExtensionDisplayMode = 'newtab' | 'popup';

export interface ExtensionPreferences {
  defaultClickAction: ExtensionDisplayMode;
  theme: 'light' | 'dark' | 'system';
  quickToolsInPopup: boolean;
}

export const EXTENSION_PREF_KEY = 'toolbox:extension_preferences';

const DEFAULT_PREFS: ExtensionPreferences = {
  defaultClickAction: 'newtab', // By default in the new tab
  theme: 'dark',
  quickToolsInPopup: true,
};

export function getExtensionPreferences(): ExtensionPreferences {
  try {
    const raw = localStorage.getItem(EXTENSION_PREF_KEY);
    if (raw) {
      return { ...DEFAULT_PREFS, ...JSON.parse(raw) };
    }
  } catch (e) {}
  return DEFAULT_PREFS;
}

export async function applyBrowserActionBehavior(mode: ExtensionDisplayMode): Promise<void> {
  if (typeof chrome === 'undefined' || !chrome.action) return;

  try {
    if (mode === 'popup') {
      // 1. Popup mode: clicking toolbar icon opens popup
      await chrome.action.setPopup({ popup: 'popup.html' });
    } else {
      // 2. New tab mode (default): clicking toolbar icon opens new tab
      await chrome.action.setPopup({ popup: '' });
    }
  } catch (err) {
    console.warn('Could not apply browser action behavior:', err);
  }
}

export async function saveExtensionPreferences(
  prefs: Partial<ExtensionPreferences>
): Promise<ExtensionPreferences> {
  const current = getExtensionPreferences();
  const updated: ExtensionPreferences = { ...current, ...prefs };

  try {
    localStorage.setItem(EXTENSION_PREF_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent('toolbox:extension-prefs-updated', { detail: updated }));

    // Sync with chrome.storage.local
    if (typeof chrome !== 'undefined' && chrome.storage?.local) {
      await chrome.storage.local.set({ [EXTENSION_PREF_KEY]: updated });
    }

    // Apply the browser action behavior immediately
    if (prefs.defaultClickAction) {
      await applyBrowserActionBehavior(prefs.defaultClickAction);
    }
  } catch (e) {
    console.error('Failed to save extension preferences:', e);
  }

  return updated;
}

export function openToolzyNewTab(path = ''): void {
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  const target = cleanPath ? `newtab.html#/${cleanPath}` : 'newtab.html';

  if (typeof chrome !== 'undefined' && chrome.tabs?.create) {
    chrome.tabs.create({ url: chrome.runtime.getURL(target) });
  } else if (typeof (window as any).browser !== 'undefined' && (window as any).browser?.tabs?.create) {
    (window as any).browser.tabs.create({ url: (window as any).browser.runtime.getURL(target) });
  } else {
    window.open(target, '_blank');
  }
}
