/* ============================================================
   PERCENTAGE.JS — Three-mode percentage calculator
   ============================================================ */

export function render(container) {
  container.innerHTML = `
    <div class="calc-panel">
      <div class="calc-panel__header">
        <span class="calc-panel__title">Percentage Calculator</span>
      </div>
      <div class="calc-panel__body">
        <div class="tab-list" role="tablist">
          <button class="tab-btn active" role="tab" data-tab="mode1" aria-selected="true">X% of Y</button>
          <button class="tab-btn" role="tab" data-tab="mode2" aria-selected="false">X is ?% of Y</button>
          <button class="tab-btn" role="tab" data-tab="mode3" aria-selected="false">% Change</button>
        </div>

        <!-- Mode 1: What is X% of Y -->
        <div class="tab-panel active" id="mode1">
          <div class="form-row" style="align-items:end;gap:.75rem">
            <div class="form-group" style="margin-bottom:0">
              <label class="form-label" for="pct-x1">Percentage (%)</label>
              <input class="form-input form-input--lg" type="number" id="pct-x1" placeholder="25" aria-label="Percentage value">
            </div>
            <div style="padding-bottom:.85rem;font-size:1.2rem;font-weight:700;color:var(--color-text-muted)">% of</div>
            <div class="form-group" style="margin-bottom:0">
              <label class="form-label" for="pct-y1">Number</label>
              <input class="form-input form-input--lg" type="number" id="pct-y1" placeholder="200" aria-label="Number value">
            </div>
          </div>
          <div class="result-box result-box--hidden" id="res1">
            <div class="result-box__label">Result</div>
            <div class="result-box__value" id="res1-val">—</div>
          </div>
        </div>

        <!-- Mode 2: X is what % of Y -->
        <div class="tab-panel" id="mode2">
          <div class="form-row" style="align-items:end;gap:.75rem">
            <div class="form-group" style="margin-bottom:0">
              <label class="form-label" for="pct-x2">Value (X)</label>
              <input class="form-input form-input--lg" type="number" id="pct-x2" placeholder="50" aria-label="Value X">
            </div>
            <div style="padding-bottom:.85rem;font-size:1.2rem;font-weight:700;color:var(--color-text-muted)">is ?% of</div>
            <div class="form-group" style="margin-bottom:0">
              <label class="form-label" for="pct-y2">Total (Y)</label>
              <input class="form-input form-input--lg" type="number" id="pct-y2" placeholder="200" aria-label="Total value Y">
            </div>
          </div>
          <div class="result-box result-box--hidden" id="res2">
            <div class="result-box__label">Result</div>
            <div class="result-box__value" id="res2-val">—</div>
          </div>
        </div>

        <!-- Mode 3: Percentage change -->
        <div class="tab-panel" id="mode3">
          <div class="form-row">
            <div class="form-group">
              <label class="form-label" for="pct-from">From</label>
              <input class="form-input form-input--lg" type="number" id="pct-from" placeholder="100" aria-label="Starting value">
            </div>
            <div class="form-group">
              <label class="form-label" for="pct-to">To</label>
              <input class="form-input form-input--lg" type="number" id="pct-to" placeholder="135" aria-label="Ending value">
            </div>
          </div>
          <div class="result-box result-box--hidden" id="res3">
            <div class="result-box__label">Percentage Change</div>
            <div class="result-box__value" id="res3-val">—</div>
          </div>
        </div>

        <div class="how-to" style="margin-top:1.5rem">
          <div class="how-to__title">How to use</div>
          <div class="how-to__body">
            Select a mode above, enter your values, and the result updates as you type.
            <ul style="list-style:disc;margin-top:.5rem">
              <li><strong>X% of Y</strong> — find a percentage of a number</li>
              <li><strong>X is ?% of Y</strong> — find what percentage X is of Y</li>
              <li><strong>% Change</strong> — find the percentage increase or decrease</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  `;
}

export function calculate({ mode, x, y }) {
  if (mode === 1) return { result: (x / 100) * y };
  if (mode === 2) return { result: y !== 0 ? (x / y) * 100 : null };
  if (mode === 3) return { result: x !== 0 ? ((y - x) / Math.abs(x)) * 100 : null };
  return { result: null };
}

function fmt(n, suffix = '') {
  if (n === null || !isFinite(n)) return 'Error';
  const fixed = Math.abs(n) >= 1000 ? n.toLocaleString(undefined, { maximumFractionDigits: 2 }) : +n.toFixed(4);
  return `${fixed}${suffix}`;
}

export function bindEvents(container) {
  // Tabs
  const tabBtns   = container.querySelectorAll('.tab-btn');
  const tabPanels = container.querySelectorAll('.tab-panel');
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => { b.classList.remove('active'); b.setAttribute('aria-selected', 'false'); });
      tabPanels.forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');
      container.querySelector('#' + btn.dataset.tab).classList.add('active');
    });
  });

  // Live calc mode 1
  function runMode1() {
    const x  = parseFloat(container.querySelector('#pct-x1').value);
    const y  = parseFloat(container.querySelector('#pct-y1').value);
    const el = container.querySelector('#res1');
    const vl = container.querySelector('#res1-val');
    if (!isNaN(x) && !isNaN(y)) {
      const { result } = calculate({ mode: 1, x, y });
      vl.textContent = fmt(result);
      el.classList.remove('result-box--hidden');
    } else { el.classList.add('result-box--hidden'); }
  }

  // Live calc mode 2
  function runMode2() {
    const x  = parseFloat(container.querySelector('#pct-x2').value);
    const y  = parseFloat(container.querySelector('#pct-y2').value);
    const el = container.querySelector('#res2');
    const vl = container.querySelector('#res2-val');
    if (!isNaN(x) && !isNaN(y)) {
      const { result } = calculate({ mode: 2, x, y });
      vl.textContent = fmt(result, '%');
      el.classList.remove('result-box--hidden');
    } else { el.classList.add('result-box--hidden'); }
  }

  // Live calc mode 3
  function runMode3() {
    const x  = parseFloat(container.querySelector('#pct-from').value);
    const y  = parseFloat(container.querySelector('#pct-to').value);
    const el = container.querySelector('#res3');
    const vl = container.querySelector('#res3-val');
    if (!isNaN(x) && !isNaN(y)) {
      const { result } = calculate({ mode: 3, x, y });
      const sign = result > 0 ? '+' : '';
      vl.textContent = `${sign}${fmt(result, '%')}`;
      vl.style.color = result > 0 ? 'var(--color-success)' : result < 0 ? 'var(--color-danger)' : '';
      el.classList.remove('result-box--hidden');
    } else { el.classList.add('result-box--hidden'); }
  }

  container.querySelector('#pct-x1').addEventListener('input', runMode1);
  container.querySelector('#pct-y1').addEventListener('input', runMode1);
  container.querySelector('#pct-x2').addEventListener('input', runMode2);
  container.querySelector('#pct-y2').addEventListener('input', runMode2);
  container.querySelector('#pct-from').addEventListener('input', runMode3);
  container.querySelector('#pct-to').addEventListener('input', runMode3);
}
