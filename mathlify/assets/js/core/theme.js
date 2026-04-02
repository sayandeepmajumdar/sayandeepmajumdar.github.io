/* ============================================================
   THEME.JS — Dark / Light mode toggle with localStorage
   ============================================================ */

const STORAGE_KEY = 'calchub-theme';
const DARK = 'dark';
const LIGHT = 'light';

function getPreferred() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) return saved;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? DARK : LIGHT;
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem(STORAGE_KEY, theme);
  const btn = document.getElementById('theme-toggle');
  if (btn) {
    btn.textContent = theme === DARK ? '☀️' : '🌙';
    btn.setAttribute('aria-label', theme === DARK ? 'Switch to light mode' : 'Switch to dark mode');
    btn.title = btn.getAttribute('aria-label');
  }
}

export function initTheme() {
  applyTheme(getPreferred());

  const btn = document.getElementById('theme-toggle');
  if (btn) {
    btn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      applyTheme(current === DARK ? LIGHT : DARK);
    });
  }

  // Sync across tabs
  window.addEventListener('storage', (e) => {
    if (e.key === STORAGE_KEY && e.newValue) applyTheme(e.newValue);
  });
}
