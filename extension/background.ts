// Toolzy Background Service Worker (Manifest V3)

const EXTENSION_PREF_KEY = 'toolbox:extension_preferences';

async function applyActionBehavior(mode: 'newtab' | 'popup') {
  if (typeof chrome === 'undefined' || !chrome.action) return;

  try {
    if (mode === 'popup') {
      await chrome.action.setPopup({ popup: 'popup.html' });
    } else {
      // default: newtab
      await chrome.action.setPopup({ popup: '' });
    }
  } catch (err) {
    console.warn('Error applying action behavior:', err);
  }
}

async function initExtensionBehavior() {
  try {
    const data = await chrome.storage.local.get(EXTENSION_PREF_KEY);
    const mode = data?.[EXTENSION_PREF_KEY]?.defaultClickAction || 'newtab';
    await applyActionBehavior(mode);
  } catch (e) {
    console.warn('Init extension behavior error:', e);
  }
}

// Setup context menus & default behavior upon installation
chrome.runtime.onInstalled.addListener(async () => {
  try {
    // 1. Initialize default preference (newtab) if not set
    const data = await chrome.storage.local.get(EXTENSION_PREF_KEY);
    if (!data?.[EXTENSION_PREF_KEY]) {
      await chrome.storage.local.set({
        [EXTENSION_PREF_KEY]: { defaultClickAction: 'newtab', theme: 'dark', quickToolsInPopup: true },
      });
    }
    await initExtensionBehavior();

    // 2. Parent Context Menu
    chrome.contextMenus.create({
      id: 'toolzy-root',
      title: 'Toolzy Developer Tools',
      contexts: ['selection', 'page'],
    });

    // Submenu Actions
    chrome.contextMenus.create({
      id: 'toolzy-json-formatter',
      parentId: 'toolzy-root',
      title: 'Format JSON',
      contexts: ['selection'],
    });

    chrome.contextMenus.create({
      id: 'toolzy-base64-tool',
      parentId: 'toolzy-root',
      title: 'Decode / Encode Base64',
      contexts: ['selection'],
    });

    chrome.contextMenus.create({
      id: 'toolzy-jwt-decoder',
      parentId: 'toolzy-root',
      title: 'Inspect / Decode JWT',
      contexts: ['selection'],
    });

    chrome.contextMenus.create({
      id: 'toolzy-hash-generator',
      parentId: 'toolzy-root',
      title: 'Generate Hash (SHA-256 / MD5)',
      contexts: ['selection'],
    });

    chrome.contextMenus.create({
      id: 'toolzy-regex-tester',
      parentId: 'toolzy-root',
      title: 'Test Regex Pattern',
      contexts: ['selection'],
    });

    chrome.contextMenus.create({
      id: 'toolzy-open-newtab',
      parentId: 'toolzy-root',
      title: 'Open Full Toolzy Dashboard',
      contexts: ['page', 'selection'],
    });
  } catch (err) {
    console.error('Error in onInstalled listener:', err);
  }
});

// Re-initialize behavior on startup
chrome.runtime.onStartup.addListener(async () => {
  await initExtensionBehavior();
});

// React immediately to preference changes in storage
chrome.storage.onChanged.addListener((changes, area) => {
  if (area === 'local' && changes[EXTENSION_PREF_KEY]) {
    const newPrefs = changes[EXTENSION_PREF_KEY].newValue;
    if (newPrefs?.defaultClickAction) {
      applyActionBehavior(newPrefs.defaultClickAction);
    }
  }
});

// Handle extension icon click when popup is disabled (newtab mode)
chrome.action.onClicked.addListener(async () => {
  try {
    const newTabUrl = chrome.runtime.getURL('newtab.html');
    await chrome.tabs.create({ url: newTabUrl });
  } catch (err) {
    console.error('Error in action.onClicked handler:', err);
  }
});

// Handle context menu clicks
chrome.contextMenus.onClicked.addListener(async (info) => {
  const menuId = info.menuItemId as string;

  const toolMapping: Record<string, string> = {
    'toolzy-json-formatter': 'developer/json-formatter',
    'toolzy-base64-tool': 'developer/base64-tool',
    'toolzy-jwt-decoder': 'developer/jwt-decoder',
    'toolzy-hash-generator': 'security/hash-generator',
    'toolzy-regex-tester': 'developer/regex-tester',
  };

  if (toolMapping[menuId]) {
    const targetPath = toolMapping[menuId];
    const newTabUrl = chrome.runtime.getURL(`newtab.html#/tools/${targetPath}`);
    await chrome.tabs.create({ url: newTabUrl });
  } else if (menuId === 'toolzy-open-newtab') {
    const newTabUrl = chrome.runtime.getURL('newtab.html');
    await chrome.tabs.create({ url: newTabUrl });
  }
});
