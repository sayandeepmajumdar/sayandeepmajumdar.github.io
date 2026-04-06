/* ============================================================
   ROUTER.JS — Hash-based SPA router
   ============================================================ */

const ROUTES = {
  '#/scientific-calculator': 'pages/scientific-calculator.html',
  '#/bmi-calculator':        'pages/bmi-calculator.html',
  '#/age-calculator':        'pages/age-calculator.html',
  '#/mortgage-calculator':   'pages/mortgage-calculator.html',
  '#/percentage-calculator': 'pages/percentage-calculator.html',
  '#/amortization-calculator': 'pages/amortization-calculator.html',
  '#/random-calculator': 'pages/random-calculator.html',
  '#/percent-error-calculator': 'pages/percent-error-calculator.html',
  '#/exponent-calculator': 'pages/exponent-calculator.html',
  '#/binary-calculator': 'pages/binary-calculator.html',
  '#/hex-calculator': 'pages/hex-calculator.html',
  '#/half-life-calculator': 'pages/half-life-calculator.html',
  '#/quadratic-calculator': 'pages/quadratic-calculator.html',
  '#/log-calculator': 'pages/log-calculator.html',
  '#/ratio-calculator': 'pages/ratio-calculator.html',
  '#/root-calculator': 'pages/root-calculator.html',
  '#/lcm-calculator': 'pages/lcm-calculator.html',
  '#/gcf-calculator': 'pages/gcf-calculator.html',
  '#/factor-calculator': 'pages/factor-calculator.html',
  '#/round-calculator': 'pages/round-calculator.html',
  '#/matrix-calculator': 'pages/matrix-calculator.html',
  '#/scientific-notation-calculator': 'pages/scientific-notation-calculator.html',
  '#/big-number-calculator': 'pages/big-number-calculator.html',
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
    document.querySelectorAll('.site-nav__link, .site-nav__drop-link').forEach(a => {
      if (a.tagName === 'A') {
        a.classList.toggle('active', a.getAttribute('href') === hash);
      }
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
