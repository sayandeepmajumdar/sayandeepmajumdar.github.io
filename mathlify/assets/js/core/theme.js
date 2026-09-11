/* ============================================================
   THEME.JS — Dark / Light mode toggle with bidirectional sync
   Seamlessly syncs with sayandeep.dev ('theme-mode') & Toolzy ('toolbox:theme')
   ============================================================ */

const KEY_THEME_MODE = 'theme-mode';
const KEY_CALCHUB = 'calchub-theme';
const KEY_TOOLBOX = 'toolbox:theme';
const DARK = 'dark';
const LIGHT = 'light';

export function getPreferred() {
  const saved = localStorage.getItem(KEY_THEME_MODE) ||
                localStorage.getItem(KEY_TOOLBOX) ||
                localStorage.getItem(KEY_CALCHUB);
  if (saved === DARK || saved === LIGHT) return saved;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? DARK : LIGHT;
}

export function applyTheme(theme) {
  const isDark = theme === DARK;
  document.documentElement.setAttribute('data-theme', theme);
  if (isDark) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }

  // Persist across all local storage keys for seamless cross-app continuity
  try {
    localStorage.setItem(KEY_THEME_MODE, theme);
    localStorage.setItem(KEY_CALCHUB, theme);
    localStorage.setItem(KEY_TOOLBOX, theme);
  } catch (e) {}

  const btn = document.getElementById('theme-toggle');
  if (btn) {
    btn.textContent = isDark ? '☀️' : '🌙';
    btn.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
    btn.title = btn.getAttribute('aria-label');
  }
}

export function initTheme() {
  // Apply preferred theme on mount
  applyTheme(getPreferred());

  const btn = document.getElementById('theme-toggle');
  if (btn) {
    btn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme') === DARK ||
                      document.documentElement.classList.contains('dark') ? DARK : LIGHT;
      applyTheme(current === DARK ? LIGHT : DARK);
    });
  }

  // Sync across tabs and iframe embeds
  window.addEventListener('storage', (e) => {
    if ((e.key === KEY_THEME_MODE || e.key === KEY_CALCHUB || e.key === KEY_TOOLBOX) && e.newValue) {
      applyTheme(e.newValue);
    }
  });

  // Listen to system preferences if not explicitly overridden
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem(KEY_THEME_MODE) && !localStorage.getItem(KEY_CALCHUB)) {
      applyTheme(e.matches ? DARK : LIGHT);
    }
  });
}
