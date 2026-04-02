/* ============================================================
   ROUTER.JS — Hash-based SPA router
   ============================================================ */

const ROUTES = {
  '#/scientific-calculator': 'pages/scientific-calculator.html',
  '#/bmi-calculator':        'pages/bmi-calculator.html',
  '#/age-calculator':        'pages/age-calculator.html',
  '#/mortgage-calculator':   'pages/mortgage-calculator.html',
  '#/percentage-calculator': 'pages/percentage-calculator.html',
};

const appEl = () => document.getElementById('app');

function showSpinner() {
  appEl().innerHTML = `
    <div class="spinner">
      <div class="spinner__ring"></div>
    </div>
  `;
}

function show404() {
  appEl().innerHTML = `
    <div class="container">
      <div class="not-found page-enter">
        <div class="not-found__code">404</div>
        <h2 class="not-found__title">Calculator Not Found</h2>
        <p class="not-found__desc">The page you're looking for doesn't exist.</p>
        <a href="#/" class="btn btn--primary">← Back to Home</a>
      </div>
    </div>
  `;
}

let currentHash = null;

async function navigate() {
  const hash = window.location.hash || '#/';
  if (hash === currentHash) return;
  currentHash = hash;

  // Home
  if (hash === '#/' || hash === '' || hash === '#') {
    if (window._renderHome) window._renderHome();
    return;
  }

  const pagePath = ROUTES[hash];
  if (!pagePath) { show404(); return; }

  showSpinner();

  try {
    const res = await fetch(pagePath);
    if (!res.ok) throw new Error(res.status);
    const html = await res.text();

    // Parse and extract just the <main> content
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const content = doc.querySelector('.page-content') || doc.querySelector('main') || doc.body;

    appEl().innerHTML = `<div class="page-enter">${content.innerHTML}</div>`;

    // Re-run any inline scripts from the fetched page
    appEl().querySelectorAll('script').forEach(oldScript => {
      const newScript = document.createElement('script');
      newScript.type = oldScript.type || 'text/javascript';
      if (oldScript.src) {
        newScript.src = oldScript.src;
      } else {
        newScript.textContent = oldScript.textContent;
      }
      oldScript.replaceWith(newScript);
    });

    // Dispatch custom event so calculators can init
    document.dispatchEvent(new CustomEvent('page:loaded', { detail: { hash } }));

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Update active nav link
    document.querySelectorAll('.site-nav__link').forEach(a => {
      a.classList.toggle('active', a.getAttribute('href') === hash);
    });
  } catch (err) {
    console.error('Router fetch error:', err);
    show404();
  }
}

export function initRouter() {
  window.addEventListener('hashchange', navigate);
  window.addEventListener('DOMContentLoaded', navigate);
  // Trigger immediately if DOMContentLoaded already fired
  if (document.readyState !== 'loading') navigate();
}
