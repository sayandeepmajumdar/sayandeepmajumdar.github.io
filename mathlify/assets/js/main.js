/* ============================================================
   MAIN.JS — Entry point: wires everything together
   ============================================================ */

import { initTheme } from './core/theme.js';
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
          <div class="hero__eyebrow">✦ 50+ Free Calculators</div>
          <h1 class="hero__title">Simplifying Everyday Math</h1>
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
                    <a class="card__link" href="#/amortization-calculator">Amortization Calculator</a>
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
                    <a class="card__link" href="#/exponent-calculator">Exponent Calculator</a>
                    <a class="card__link" href="#/root-calculator">Root Calculator</a>
                    <a class="card__link" href="#/log-calculator">Log Calculator</a>
                    <a class="card__link" href="#/quadratic-calculator">Quadratic Formula</a>
                  </div>
                </div>

                <div class="card" style="cursor:default;padding:1.125rem">
                  <span class="card__icon">🔢</span>
                  <div class="card__title">Number Theory</div>
                  <div class="card__links">
                    <a class="card__link" href="#/factor-calculator">Factor Calculator</a>
                    <a class="card__link" href="#/lcm-calculator">LCM Calculator</a>
                    <a class="card__link" href="#/gcf-calculator">GCF Calculator</a>
                    <a class="card__link" href="#/ratio-calculator">Ratio Calculator</a>
                  </div>
                </div>

                <div class="card" style="cursor:default;padding:1.125rem">
                  <span class="card__icon">💻</span>
                  <div class="card__title">Base Conversion</div>
                  <div class="card__links">
                    <a class="card__link" href="#/binary-calculator">Binary Calculator</a>
                    <a class="card__link" href="#/hex-calculator">Hex Calculator</a>
                  </div>
                </div>

                <div class="card" style="cursor:default;padding:1.125rem">
                  <span class="card__icon">🧪</span>
                  <div class="card__title">Science</div>
                  <div class="card__links">
                    <a class="card__link" href="#/percent-error-calculator">Percent Error</a>
                    <a class="card__link" href="#/half-life-calculator">Half-Life Calculator</a>
                  </div>
                </div>

                <div class="card" style="cursor:default;padding:1.125rem">
                  <span class="card__icon">🎲</span>
                  <div class="card__title">Random & Stats</div>
                  <div class="card__links">
                    <a class="card__link" href="#/random-calculator">Random Number Generator</a>
                    <a class="card__link" href="#/scientific-notation-calculator">Scientific Notation</a>
                    <a class="card__link" href="#/big-number-calculator">Big Number Calculator</a>
                  </div>
                </div>

                <div class="card" style="cursor:default;padding:1.125rem">
                  <span class="card__icon">📊</span>
                  <div class="card__title">Advanced</div>
                  <div class="card__links">
                    <a class="card__link" href="#/matrix-calculator">Matrix Calculator</a>
                    <a class="card__link" href="#/round-calculator">Rounding Calculator</a>
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
    '#/bmi-calculator': () => import('./calculators/bmi.js'),
    '#/age-calculator': () => import('./calculators/age.js'),
    '#/percentage-calculator': () => import('./calculators/percentage.js'),
    '#/mortgage-calculator': () => import('./calculators/mortgage.js'),
    '#/amortization-calculator': () => import('./calculators/amortization.js'),
    '#/random-calculator': () => import('./calculators/random.js'),
    '#/percent-error-calculator': () => import('./calculators/percentError.js'),
    '#/exponent-calculator': () => import('./calculators/exponent.js'),
    '#/binary-calculator': () => import('./calculators/binary.js'),
    '#/hex-calculator': () => import('./calculators/hex.js'),
    '#/half-life-calculator': () => import('./calculators/halfLife.js'),
    '#/quadratic-calculator': () => import('./calculators/quadratic.js'),
    '#/log-calculator': () => import('./calculators/log.js'),
    '#/ratio-calculator': () => import('./calculators/ratio.js'),
    '#/root-calculator': () => import('./calculators/root.js'),
    '#/lcm-calculator': () => import('./calculators/lcm.js'),
    '#/gcf-calculator': () => import('./calculators/gcf.js'),
    '#/factor-calculator': () => import('./calculators/factor.js'),
    '#/round-calculator': () => import('./calculators/round.js'),
    '#/matrix-calculator': () => import('./calculators/matrix.js'),
    '#/scientific-notation-calculator': () => import('./calculators/scientificNotation.js'),
    '#/big-number-calculator': () => import('./calculators/bigNumber.js'),
  };

  const loader = calcMap[hash];
  if (!loader) return;

  const mod = await loader();
  const mount = document.getElementById('calc-mount');
  if (!mount) return;

  mod.render(mount);
  mod.bindEvents(mount);
}

/* ---------- Mobile Menu --------------------------------------- */
function initMobileMenu() {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const nav = document.querySelector('.site-nav');

  if (menuBtn && nav) {
    menuBtn.addEventListener('click', () => {
      nav.classList.toggle('is-open');
    });
  }

  const navItems = document.querySelectorAll('.site-nav__item');
  navItems.forEach(item => {
    const link = item.querySelector('.site-nav__link');
    if (link) {
      link.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
          e.preventDefault();
          navItems.forEach(other => {
            if (other !== item) other.classList.remove('is-active');
          });
          item.classList.toggle('is-active');
        }
      });
    }
  });

  document.addEventListener('page:loaded', () => {
    if (nav) nav.classList.remove('is-open');
    navItems.forEach(i => i.classList.remove('is-active'));
  });
}

/* ---------- Boot ---------------------------------------------- */
document.addEventListener('DOMContentLoaded', () => {
  // Expose home renderer so router can call it
  window._renderHome = buildHomepage;

  initTheme();
  initRouter();
  initMobileMenu();

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
