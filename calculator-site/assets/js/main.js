/* ============================================================
   MAIN.JS — Entry point: wires everything together
   ============================================================ */

import { initTheme }  from './core/theme.js';
import { initSearch } from './core/search.js';
import { initRouter } from './core/router.js';
import { render as renderStd, bindEvents as bindStd } from './calculators/standard.js';

/* ---------- Homepage renderer -------------------------------- */
function buildHomepage() {
  const app = document.getElementById('app');
  if (!app) return;

  app.innerHTML = `
    <div class="page-enter">
      <!-- Hero -->
      <section class="hero">
        <div class="container">
          <div class="hero__eyebrow">✦ 6 Free Calculators</div>
          <h1 class="hero__title">Free Online Calculators</h1>
          <p class="hero__subtitle">
            Fast, accurate, and beautifully designed tools for everyday calculations.
            No ads clutter, no sign-up required.
          </p>

          <!-- Search -->
          <div class="search-wrap" id="search-wrap">
            <div class="search-input-wrapper">
              <span class="search-icon" aria-hidden="true">🔍</span>
              <input
                class="search-input"
                type="search"
                id="search-input"
                placeholder="Search calculators…"
                autocomplete="off"
                aria-label="Search calculators"
                aria-autocomplete="list"
                aria-controls="search-dropdown"
              >
            </div>
            <div
              class="search-dropdown search-dropdown--hidden"
              id="search-dropdown"
              role="listbox"
            ></div>
          </div>
        </div>
      </section>

      <!-- Standard Calculator featured + Category Grid -->
      <section class="main-content">
        <div class="container">
          <div class="home-grid">

            <!-- Live Standard Calc -->
            <div>
              <h2 class="section-title">Standard Calculator</h2>
              <div class="calc-panel">
                <div class="calc-panel__body" id="std-calc-mount"></div>
              </div>
            </div>

            <!-- Category cards -->
            <div>
              <h2 class="section-title">Browse Calculators</h2>
              <div style="display:grid;grid-template-columns:1fr 1fr;gap:.875rem">

                <div class="card" style="cursor:default;padding:1.125rem">
                  <span class="card__icon">💰</span>
                  <div class="card__title">Financial</div>
                  <div class="card__links">
                    <a class="card__link" href="#/mortgage-calculator">Mortgage Calculator</a>
                  </div>
                </div>

                <div class="card" style="cursor:default;padding:1.125rem">
                  <span class="card__icon">🏃</span>
                  <div class="card__title">Health &amp; Fitness</div>
                  <div class="card__links">
                    <a class="card__link" href="#/bmi-calculator">BMI Calculator</a>
                    <a class="card__link" href="#/age-calculator">Age Calculator</a>
                  </div>
                </div>

                <div class="card" style="cursor:default;padding:1.125rem">
                  <span class="card__icon">📐</span>
                  <div class="card__title">Math</div>
                  <div class="card__links">
                    <a class="card__link" href="#/scientific-calculator">Scientific Calculator</a>
                    <a class="card__link" href="#/percentage-calculator">Percentage Calculator</a>
                  </div>
                </div>

                <div class="card" style="cursor:default;padding:1.125rem">
                  <span class="card__icon">🧮</span>
                  <div class="card__title">Basic</div>
                  <div class="card__links">
                    <a class="card__link" href="#/">Standard Calculator</a>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  `;

  // Mount standard calculator
  const mount = document.getElementById('std-calc-mount');
  if (mount) {
    renderStd(mount);
    bindStd(mount);
  }

  // Re-init search after DOM rebuild
  initSearch();
}

/* ---------- Calculator page loader --------------------------- */
async function loadCalcPage(hash) {
  // Dynamic import map
  const calcMap = {
    '#/scientific-calculator': () => import('./calculators/scientific.js'),
    '#/bmi-calculator':        () => import('./calculators/bmi.js'),
    '#/age-calculator':        () => import('./calculators/age.js'),
    '#/percentage-calculator': () => import('./calculators/percentage.js'),
    '#/mortgage-calculator':   () => import('./calculators/mortgage.js'),
  };

  const loader = calcMap[hash];
  if (!loader) return;

  const mod    = await loader();
  const mount  = document.getElementById('calc-mount');
  if (!mount) return;

  mod.render(mount);
  mod.bindEvents(mount);
}

/* ---------- Boot ---------------------------------------------- */
document.addEventListener('DOMContentLoaded', () => {
  // Expose home renderer so router can call it
  window._renderHome = buildHomepage;

  initTheme();
  initRouter();

  // After router renders a page, load the matching calc module
  document.addEventListener('page:loaded', (e) => {
    loadCalcPage(e.detail.hash);
  });

  // If landing on home, render immediately
  const hash = window.location.hash || '#/';
  if (hash === '#/' || hash === '' || hash === '#') {
    buildHomepage();
  }
});
