/* ============================================================
   SCIENTIFIC.JS — Scientific calculator
   ============================================================ */

const FN_BUTTONS = [
  { label: 'sin',  fn: 'sin'   },
  { label: 'cos',  fn: 'cos'   },
  { label: 'tan',  fn: 'tan'   },
  { label: 'log',  fn: 'log'   },
  { label: 'ln',   fn: 'ln'    },
  { label: '√',    fn: 'sqrt'  },
  { label: 'x²',   fn: 'sq'   },
  { label: 'xʸ',   fn: 'pow'   },
  { label: 'π',    fn: 'pi'   },
  { label: 'e',    fn: 'e'    },
  { label: 'n!',   fn: 'fact'  },
  { label: '1/x',  fn: 'inv'   },
  { label: '(',    fn: 'lp'    },
  { label: ')',    fn: 'rp'    },
  { label: 'EXP',  fn: 'exp'   },
];

const BASIC = [
  { label: 'C',  cls: 'calc-btn--clear', action: 'clear'   },
  { label: '⌫',  cls: 'calc-btn--op',   action: 'back'    },
  { label: '%',  cls: 'calc-btn--op',   action: 'percent' },
  { label: '÷',  cls: 'calc-btn--op',   action: 'op', val: '/' },
  { label: '7',  cls: '', action: 'digit', val: '7' },
  { label: '8',  cls: '', action: 'digit', val: '8' },
  { label: '9',  cls: '', action: 'digit', val: '9' },
  { label: '×',  cls: 'calc-btn--op',   action: 'op', val: '*' },
  { label: '4',  cls: '', action: 'digit', val: '4' },
  { label: '5',  cls: '', action: 'digit', val: '5' },
  { label: '6',  cls: '', action: 'digit', val: '6' },
  { label: '−',  cls: 'calc-btn--op',   action: 'op', val: '-' },
  { label: '1',  cls: '', action: 'digit', val: '1' },
  { label: '2',  cls: '', action: 'digit', val: '2' },
  { label: '3',  cls: '', action: 'digit', val: '3' },
  { label: '+',  cls: 'calc-btn--op',   action: 'op', val: '+' },
  { label: '±',  cls: '', action: 'negate' },
  { label: '0',  cls: '', action: 'digit', val: '0' },
  { label: '.',  cls: '', action: 'dot'   },
  { label: '=',  cls: 'calc-btn--eq',   action: 'equals' },
];

export function render(container) {
  container.innerHTML = `
    <div class="std-calc" style="max-width:400px" id="sci-calc">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:.75rem;">
        <span style="font-size:.8rem;font-weight:600;color:var(--color-text-muted);text-transform:uppercase;letter-spacing:.07em">Scientific</span>
        <div class="mode-badge" id="sci-mode">
          <button class="mode-badge__btn active" data-mode="deg" aria-label="Degrees mode">DEG</button>
          <button class="mode-badge__btn" data-mode="rad" aria-label="Radians mode">RAD</button>
        </div>
      </div>
      <div class="std-calc__display">
        <div class="std-calc__expr" id="sci-expr"></div>
        <div class="std-calc__value" id="sci-display">0</div>
      </div>
      <div class="sci-calc__fn-grid" id="sci-fn-grid">
        ${FN_BUTTONS.map(b => `
          <button class="calc-btn calc-btn--fn"
            data-fn="${b.fn}"
            aria-label="${b.label}"
          >${b.label}</button>
        `).join('')}
      </div>
      <div class="std-calc__grid" id="sci-grid">
        ${BASIC.map(b => `
          <button
            class="calc-btn ${b.cls}"
            data-action="${b.action}"
            ${b.val !== undefined ? `data-val="${b.val}"` : ''}
            aria-label="${b.label}"
          >${b.label}</button>
        `).join('')}
      </div>
    </div>
  `;
}

export function calculate({ expr, isDeg }) {
  try {
    const safe = expr.replace(/[^0-9+\-*/().e\s]/g, '');
    if (!safe) return { result: 'Error' };
    // eslint-disable-next-line no-new-func
    const result = Function('"use strict"; return (' + safe + ')')();
    if (!isFinite(result)) return { result: result > 0 ? '∞' : '-∞' };
    return { result: +result.toPrecision(12) };
  } catch {
    return { result: 'Error' };
  }
}

function factorial(n) {
  n = Math.floor(Math.abs(n));
  if (n > 170) return Infinity;
  let r = 1;
  for (let i = 2; i <= n; i++) r *= i;
  return r;
}

export function bindEvents(container) {
  const displayEl = container.querySelector('#sci-display');
  const exprEl    = container.querySelector('#sci-expr');
  const fnGrid    = container.querySelector('#sci-fn-grid');
  const grid      = container.querySelector('#sci-grid');
  const modeEl    = container.querySelector('#sci-mode');
  if (!displayEl) return;

  let expr    = '';
  let isDeg   = true;
  let hasEq   = false;

  function update(result) {
    displayEl.textContent = result !== undefined ? String(result) : (expr || '0');
    exprEl.textContent    = expr;
    const len = (result !== undefined ? String(result) : expr).length;
    displayEl.style.fontSize = len > 14 ? '1.1rem' : len > 10 ? '1.4rem' : '';
  }

  function applyFn(fn) {
    const cur = parseFloat(displayEl.textContent);
    const toRad = isDeg ? Math.PI / 180 : 1;
    let res;
    switch (fn) {
      case 'sin':  res = Math.sin(cur * toRad); break;
      case 'cos':  res = Math.cos(cur * toRad); break;
      case 'tan':  res = Math.tan(cur * toRad); break;
      case 'log':  res = Math.log10(cur); break;
      case 'ln':   res = Math.log(cur); break;
      case 'sqrt': res = Math.sqrt(cur); break;
      case 'sq':   res = cur * cur; break;
      case 'fact': res = factorial(cur); break;
      case 'inv':  res = 1 / cur; break;
      case 'pi':   res = Math.PI; expr = 'π'; break;
      case 'e':    res = Math.E;  expr = 'e'; break;
      case 'pow':  expr += '^'; update(); return;
      case 'lp':   expr += '(';  update(); return;
      case 'rp':   expr += ')';  update(); return;
      case 'exp':  expr += 'e+'; update(); return;
      default: return;
    }
    res = +Number(res).toPrecision(12);
    expr = String(res);
    hasEq = true;
    update(res);
    return;
  }

  if (fnGrid) {
    fnGrid.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-fn]');
      if (!btn) return;
      if (hasEq) { expr = displayEl.textContent; hasEq = false; }
      applyFn(btn.dataset.fn);
    });
  }

  if (modeEl) {
    modeEl.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-mode]');
      if (!btn) return;
      isDeg = btn.dataset.mode === 'deg';
      modeEl.querySelectorAll('.mode-badge__btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  }

  if (grid) {
    grid.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-action]');
      if (!btn) return;
      const action = btn.dataset.action;
      const val    = btn.dataset.val;

      if (hasEq && action === 'digit') { expr = ''; hasEq = false; }

      if (action === 'digit')  { expr += val; }
      else if (action === 'dot') { if (!expr.match(/\d+\.$/)) expr += '.'; }
      else if (action === 'op') {
        const opLabel = val === '*' ? '×' : val === '/' ? '÷' : val === '-' ? '−' : val;
        expr += ` ${opLabel} `;
        hasEq = false;
      }
      else if (action === 'equals') {
        const evalExpr = expr
          .replace(/×/g, '*').replace(/÷/g, '/').replace(/−/g, '-')
          .replace(/\^/g, '**');
        try {
          // eslint-disable-next-line no-new-func
          const r = Function('"use strict"; return (' + evalExpr + ')')();
          const rr = isFinite(r) ? +r.toPrecision(12) : (r > 0 ? Infinity : -Infinity);
          exprEl.textContent = expr + ' =';
          expr = String(rr);
          hasEq = true;
          update(rr);
          return;
        } catch { expr = 'Error'; hasEq = true; }
      }
      else if (action === 'back') { expr = expr.trimEnd().replace(/\S+$/, '').trimEnd(); if (!expr) expr = ''; }
      else if (action === 'clear') { expr = ''; hasEq = false; exprEl.textContent = ''; }
      else if (action === 'negate') {
        const n = parseFloat(displayEl.textContent);
        if (isFinite(n)) { expr = String(-n); }
      }
      else if (action === 'percent') {
        const n = parseFloat(displayEl.textContent);
        if (isFinite(n)) { expr = String(n / 100); }
      }

      update();
    });
  }

  update();
}
