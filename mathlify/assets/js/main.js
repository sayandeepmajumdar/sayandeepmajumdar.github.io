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
                    <a class="card__link" href="tools/mortgage-calculator.html">Mortgage Calculator</a>
                    <a class="card__link" href="tools/amortization-calculator.html">Amortization Calculator</a>
                  </div>
                </div>

                <div class="card" style="cursor:default;padding:1.125rem">
                  <span class="card__icon">🏃</span>
                  <div class="card__title">Health &amp; Fitness</div>
                  <div class="card__links">
                    <a class="card__link" href="tools/bmi-calculator.html">BMI Calculator</a>
                    <a class="card__link" href="tools/age-calculator.html">Age Calculator</a>
                  </div>
                </div>

                <div class="card" style="cursor:default;padding:1.125rem">
                  <span class="card__icon">📐</span>
                  <div class="card__title">Math</div>
                  <div class="card__links">
                    <a class="card__link" href="tools/scientific-calculator.html">Scientific Calculator</a>
                    <a class="card__link" href="tools/percentage-calculator.html">Percentage Calculator</a>
                    <a class="card__link" href="tools/exponent-calculator.html">Exponent Calculator</a>
                    <a class="card__link" href="tools/root-calculator.html">Root Calculator</a>
                    <a class="card__link" href="tools/log-calculator.html">Log Calculator</a>
                    <a class="card__link" href="tools/quadratic-calculator.html">Quadratic Formula</a>
                  </div>
                </div>

                <div class="card" style="cursor:default;padding:1.125rem">
                  <span class="card__icon">🔢</span>
                  <div class="card__title">Number Theory</div>
                  <div class="card__links">
                    <a class="card__link" href="tools/factor-calculator.html">Factor Calculator</a>
                    <a class="card__link" href="tools/lcm-calculator.html">LCM Calculator</a>
                    <a class="card__link" href="tools/gcf-calculator.html">GCF Calculator</a>
                    <a class="card__link" href="tools/ratio-calculator.html">Ratio Calculator</a>
                  </div>
                </div>

                <div class="card" style="cursor:default;padding:1.125rem">
                  <span class="card__icon">💻</span>
                  <div class="card__title">Base Conversion</div>
                  <div class="card__links">
                    <a class="card__link" href="tools/binary-calculator.html">Binary Calculator</a>
                    <a class="card__link" href="tools/hex-calculator.html">Hex Calculator</a>
                  </div>
                </div>

                <div class="card" style="cursor:default;padding:1.125rem">
                  <span class="card__icon">🧪</span>
                  <div class="card__title">Science</div>
                  <div class="card__links">
                    <a class="card__link" href="tools/percent-error-calculator.html">Percent Error</a>
                    <a class="card__link" href="tools/half-life-calculator.html">Half-Life Calculator</a>
                  </div>
                </div>

                <div class="card" style="cursor:default;padding:1.125rem">
                  <span class="card__icon">🎲</span>
                  <div class="card__title">Random & Stats</div>
                  <div class="card__links">
                    <a class="card__link" href="tools/random-calculator.html">Random Number Generator</a>
                    <a class="card__link" href="tools/scientific-notation-calculator.html">Scientific Notation</a>
                    <a class="card__link" href="tools/big-number-calculator.html">Big Number Calculator</a>
                  </div>
                </div>

                <div class="card" style="cursor:default;padding:1.125rem">
                  <span class="card__icon">📊</span>
                  <div class="card__title">Advanced</div>
                  <div class="card__links">
                    <a class="card__link" href="tools/matrix-calculator.html">Matrix Calculator</a>
                    <a class="card__link" href="tools/round-calculator.html">Rounding Calculator</a>
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

/* ---------- Safe Email Obfuscation --------------------------- */
function initSafeEmailLinks() {
  const el = document.getElementById('footer-support-email');
  if (!el) return;

  const assemble = () => {
    const user = el.getAttribute('data-user');
    const domain = el.getAttribute('data-domain');
    if (!user || !domain) return;
    const email = `${user}@${domain}`;
    const subject = encodeURIComponent('Mathlify Issue / Feedback');
    el.href = `mailto:${email}?subject=${subject}`;
    const span = el.querySelector('.email-display');
    if (span) span.textContent = email;
  };

  el.addEventListener('mouseenter', assemble, { once: true });
  el.addEventListener('focus', assemble, { once: true });
  el.addEventListener('touchstart', assemble, { once: true, passive: true });
  el.addEventListener('click', () => {
    assemble();
  });
}

/* ---------- Boot ---------------------------------------------- */
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initRouter();
  initMobileMenu();
  initSafeEmailLinks();
  buildHomepage();
});
