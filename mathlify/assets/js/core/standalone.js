/* ============================================================
   STANDALONE.JS — Common initialization for direct page visits
   ============================================================ */

import { initTheme } from './theme.js';

export function initStandalone() {
  initTheme();

  // Mobile navigation toggle
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

  // Safe Email Obfuscation
  const emailEl = document.getElementById('footer-support-email');
  if (emailEl) {
    const assemble = () => {
      const user = emailEl.getAttribute('data-user');
      const domain = emailEl.getAttribute('data-domain');
      if (!user || !domain) return;
      const email = `${user}@${domain}`;
      const subject = encodeURIComponent('Mathlify Issue / Feedback');
      emailEl.href = `mailto:${email}?subject=${subject}`;
      const span = emailEl.querySelector('.email-display');
      if (span) span.textContent = email;
    };

    emailEl.addEventListener('mouseenter', assemble, { once: true });
    emailEl.addEventListener('focus', assemble, { once: true });
    emailEl.addEventListener('touchstart', assemble, { once: true, passive: true });
    emailEl.addEventListener('click', assemble);
  }
}
