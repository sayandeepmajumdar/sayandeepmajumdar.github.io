/* ============================================================
   STANDARD.JS — Basic calculator
   ============================================================ */

const BUTTONS = [
  { label: 'C',   cls: 'calc-btn--clear', action: 'clear'   },
  { label: '±',   cls: 'calc-btn--op',    action: 'negate'  },
  { label: '%',   cls: 'calc-btn--op',    action: 'percent' },
  { label: '÷',   cls: 'calc-btn--op',    action: 'op', val: '/' },

  { label: '7',   cls: '', action: 'digit', val: '7' },
  { label: '8',   cls: '', action: 'digit', val: '8' },
  { label: '9',   cls: '', action: 'digit', val: '9' },
  { label: '×',   cls: 'calc-btn--op',    action: 'op', val: '*' },

  { label: '4',   cls: '', action: 'digit', val: '4' },
  { label: '5',   cls: '', action: 'digit', val: '5' },
  { label: '6',   cls: '', action: 'digit', val: '6' },
  { label: '−',   cls: 'calc-btn--op',    action: 'op', val: '-' },

  { label: '1',   cls: '', action: 'digit', val: '1' },
  { label: '2',   cls: '', action: 'digit', val: '2' },
  { label: '3',   cls: '', action: 'digit', val: '3' },
  { label: '+',   cls: 'calc-btn--op',    action: 'op', val: '+' },

  { label: '0',   cls: 'calc-btn--wide', action: 'digit', val: '0' },
  { label: '.',   cls: '', action: 'dot' },
  { label: '=',   cls: 'calc-btn--eq',   action: 'equals' },
];

function createState() {
  return { display: '0', expr: '', operator: null, prev: null, shouldReset: false };
}

export function render(container) {
  container.innerHTML = `
    <div class="std-calc" id="std-calc">
      <div class="std-calc__display">
        <div class="std-calc__expr" id="std-expr"></div>
        <div class="std-calc__value" id="std-display">0</div>
      </div>
      <div class="std-calc__grid" id="std-grid" role="group" aria-label="Calculator buttons">
        ${BUTTONS.map(b => `
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

export function calculate(inputs) {
  // pure: evaluate string expr safely
  const { expr } = inputs;
  try {
    // Only allow safe chars
    if (!/^[\d+\-*/().\s]+$/.test(expr)) return { result: 'Error' };
    // eslint-disable-next-line no-new-func
    const result = Function('"use strict"; return (' + expr + ')')();
    if (!isFinite(result)) return { result: 'Error' };
    return { result: +result.toPrecision(12) };
  } catch {
    return { result: 'Error' };
  }
}

function fmt(num) {
  if (num === 'Error') return 'Error';
  const s = String(num);
  // Shorten display if needed
  if (s.length > 12) {
    const n = Number(num);
    return isFinite(n) ? n.toPrecision(8).replace(/\.?0+$/, '') : 'Error';
  }
  return s;
}

export function bindEvents(container) {
  const displayEl = container.querySelector('#std-display');
  const exprEl    = container.querySelector('#std-expr');
  const grid      = container.querySelector('#std-grid');
  if (!displayEl || !grid) return;

  let state = createState();

  function update() {
    displayEl.textContent = fmt(state.display);
    exprEl.textContent    = state.expr;
    // Shrink font for long numbers
    const len = String(state.display).length;
    displayEl.style.fontSize = len > 10 ? '1.4rem' : len > 7 ? '1.7rem' : '';
  }

  function handleAction(action, val) {
    if (action === 'digit') {
      if (state.shouldReset) {
        state.display = val === '0' ? '0' : val;
        state.shouldReset = false;
      } else {
        state.display =
          state.display === '0' && val !== '.'
            ? val
            : state.display + val;
      }
    } else if (action === 'dot') {
      if (state.shouldReset) { state.display = '0.'; state.shouldReset = false; return update(); }
      if (!state.display.includes('.')) state.display += '.';
    } else if (action === 'op') {
      if (state.operator && !state.shouldReset) {
        const { result } = calculate({ expr: `${state.prev}${state.operator}${state.display}` });
        state.display = String(result);
        state.prev    = String(result);
      } else {
        state.prev = state.display;
      }
      state.operator    = val;
      state.expr        = `${state.prev} ${val === '*' ? '×' : val === '/' ? '÷' : val}`;
      state.shouldReset = true;
    } else if (action === 'equals') {
      if (!state.operator) return;
      const full = `${state.prev}${state.operator}${state.display}`;
      const op   = state.operator === '*' ? '×' : state.operator === '/' ? '÷' : state.operator;
      state.expr = `${state.prev} ${op} ${state.display} =`;
      const { result } = calculate({ expr: full });
      state.display     = String(result);
      state.operator    = null;
      state.prev        = null;
      state.shouldReset = true;
    } else if (action === 'clear') {
      state = createState();
    } else if (action === 'negate') {
      if (state.display !== '0' && state.display !== 'Error') {
        state.display = String(-Number(state.display));
      }
    } else if (action === 'percent') {
      if (state.display !== 'Error') {
        state.display = String(Number(state.display) / 100);
      }
    }
    update();
  }

  grid.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-action]');
    if (!btn) return;
    handleAction(btn.dataset.action, btn.dataset.val);
  });

  // Keyboard support
  const keyMap = {
    '0':'digit','1':'digit','2':'digit','3':'digit','4':'digit',
    '5':'digit','6':'digit','7':'digit','8':'digit','9':'digit',
    '+':'op','-':'op','*':'op','/':'op',
    'Enter':'equals','=':'equals',
    'Backspace':'backspace','Escape':'clear','.':'dot',
    '%':'percent'
  };

  function onKeydown(e) {
    const calc = container.querySelector('#std-calc');
    if (!calc) { document.removeEventListener('keydown', onKeydown); return; }
    // Ignore keyboard shortcuts if the user is typing in an input (like the search bar)
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
    
    const action = keyMap[e.key];
    if (!action) return;
    e.preventDefault();
    if (action === 'backspace') {
      if (state.display.length > 1 && !state.shouldReset) {
        state.display = state.display.slice(0, -1);
      } else { state.display = '0'; }
      update();
    } else if (action === 'digit') {
      handleAction('digit', e.key);
    } else if (action === 'op') {
      handleAction('op', e.key);
    } else {
      handleAction(action, e.key);
    }
  }

  document.addEventListener('keydown', onKeydown);
  // Clean up when page changes
  document.addEventListener('page:loaded', () => {
    document.removeEventListener('keydown', onKeydown);
  }, { once: true });
}
