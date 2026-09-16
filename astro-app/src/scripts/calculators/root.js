/* ============================================================
   ROOT.JS — Root Calculator (nth root)
   ============================================================ */

export function render(container) {
  container.innerHTML = `
    <div class="calc-panel">
      <div class="calc-panel__header">
        <span class="calc-panel__title">Root Calculator</span>
        <div class="calc-panel__header-icon calc-panel__header-icon--success">√</div>
      </div>
      <div class="calc-panel__body">
        <div class="form-row">
          <div class="form-group">
            <label class="form-label" for="root-n">Root (n)</label>
            <input class="form-input form-input--lg" type="number" id="root-n" min="1" placeholder="e.g. 2 (square), 3 (cube)" aria-label="nth root">
          </div>
          <div class="form-group">
            <label class="form-label" for="root-x">Radicand (x)</label>
            <input class="form-input form-input--lg" type="number" id="root-x" placeholder="e.g. 64" aria-label="Number to find root of">
          </div>
        </div>

        <button class="btn btn--primary btn--lg" id="root-btn" style="width:100%" aria-label="Calculate root">Calculate</button>

        <div class="result-box result-box--hidden" id="root-result">
          <div class="result-box__label" id="root-label">Result</div>
          <div class="result-box__value" id="root-value">—</div>
          <div id="root-details" style="margin-top:.5rem;font-size:.9rem;color:var(--color-text-muted)"></div>
        </div>

        <div class="how-to" style="margin-top:1.5rem">
          <div class="how-to__title">Formula</div>
          <div class="how-to__body">
            <p>The nth root of a number asks: "What number raised to power n equals x?"</p>
            <code style="display:block;background:var(--color-bg-subtle);padding:.75rem;border-radius:4px;margin:.5rem 0">
              ⁿ√x = x^(1/n)
            </code>
            <p style="margin-top:.5rem"><strong>Examples:</strong></p>
            <ul>
              <li>√64 = 8 (square root, n=2)</li>
              <li>³√64 = 4 (cube root, n=3)</li>
              <li>⁴√16 = 2 (fourth root)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  `;
}

export function bindEvents(container) {
  const btn = container.querySelector('#root-btn');
  const resultEl = container.querySelector('#root-result');
  const valueEl = container.querySelector('#root-value');
  const labelEl = container.querySelector('#root-label');
  const detailsEl = container.querySelector('#root-details');

  function calculate() {
    const n = parseFloat(container.querySelector('#root-n').value);
    const x = parseFloat(container.querySelector('#root-x').value);

    if (isNaN(n) || isNaN(x)) {
      valueEl.textContent = 'Please enter both values';
      labelEl.textContent = 'Result';
      detailsEl.textContent = '';
      resultEl.classList.remove('result-box--hidden');
      return;
    }

    if (n < 1 || !Number.isInteger(n)) {
      valueEl.textContent = 'Root must be a positive integer';
      detailsEl.textContent = '';
      resultEl.classList.remove('result-box--hidden');
      return;
    }

    if (x < 0 && n % 2 === 0) {
      valueEl.textContent = 'Cannot take even root of negative';
      detailsEl.textContent = 'Square root of negative is undefined in real numbers';
      resultEl.classList.remove('result-box--hidden');
      return;
    }

    const result = Math.pow(x, 1/n);
    const rootName = n === 2 ? 'Square root' : n === 3 ? 'Cube root' : n === 4 ? 'Fourth root' : `${n}th root`;
    
    labelEl.textContent = rootName;
    valueEl.textContent = result.toLocaleString(undefined, { maximumFractionDigits: 10 });
    detailsEl.textContent = `${rootName} of ${x} = ${result.toFixed(6)}`;
    resultEl.classList.remove('result-box--hidden');
  }

  btn.addEventListener('click', calculate);
}
