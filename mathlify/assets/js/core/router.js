/* ============================================================
   ROUTER.JS — Legacy Hash Redirect to Clean Tools URLs
   ============================================================ */

const LEGACY_MAP = {
  '#/scientific-calculator': 'tools/scientific-calculator.html',
  '#/bmi-calculator':        'tools/bmi-calculator.html',
  '#/age-calculator':        'tools/age-calculator.html',
  '#/mortgage-calculator':   'tools/mortgage-calculator.html',
  '#/percentage-calculator': 'tools/percentage-calculator.html',
  '#/amortization-calculator': 'tools/amortization-calculator.html',
  '#/random-calculator': 'tools/random-calculator.html',
  '#/percent-error-calculator': 'tools/percent-error-calculator.html',
  '#/exponent-calculator': 'tools/exponent-calculator.html',
  '#/binary-calculator': 'tools/binary-calculator.html',
  '#/hex-calculator': 'tools/hex-calculator.html',
  '#/half-life-calculator': 'tools/half-life-calculator.html',
  '#/quadratic-calculator': 'tools/quadratic-calculator.html',
  '#/log-calculator': 'tools/log-calculator.html',
  '#/ratio-calculator': 'tools/ratio-calculator.html',
  '#/root-calculator': 'tools/root-calculator.html',
  '#/lcm-calculator': 'tools/lcm-calculator.html',
  '#/gcf-calculator': 'tools/gcf-calculator.html',
  '#/factor-calculator': 'tools/factor-calculator.html',
  '#/round-calculator': 'tools/round-calculator.html',
  '#/matrix-calculator': 'tools/matrix-calculator.html',
  '#/scientific-notation-calculator': 'tools/scientific-notation-calculator.html',
  '#/big-number-calculator': 'tools/big-number-calculator.html',
};

export function initRouter() {
  const hash = window.location.hash;
  if (hash && LEGACY_MAP[hash]) {
    window.location.replace(LEGACY_MAP[hash]);
    return;
  }
}
