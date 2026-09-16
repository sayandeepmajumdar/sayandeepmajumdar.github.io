/* ============================================================
   PERCENTERROR.JS — Percent Error Calculator
   ============================================================ */

export function render(container) {
  container.innerHTML = `
    <div class="calc-panel">
      <div class="calc-panel__header">
        <span class="calc-panel__title">Percent Error Calculator</span>
        <div class="calc-panel__header-icon calc-panel__header-icon--warning">📐</div>
      </div>
      <div class="calc-panel__body">
        <div class="form-row">
          <div class="form-group">
            <label class="form-label" for="pe-actual">Actual Value (Accepted)</label>
            <input class="form-input form-input--lg" type="number" id="pe-actual" placeholder="e.g. 9.8" aria-label="Actual or accepted value">
          </div>
          <div class="form-group">
            <label class="form-label" for="pe-experimental">Experimental Value (Measured)</label>
            <input class="form-input form-input--lg" type="number" id="pe-experimental" placeholder="e.g. 9.5" aria-label="Experimental or measured value">
          </div>
        </div>

        <button class="btn btn--primary btn--lg" id="pe-btn" style="width:100%" aria-label="Calculate percent error">Calculate</button>

        <div class="result-box result-box--hidden" id="pe-result">
          <div class="result-box__label">Percent Error</div>
          <div class="result-box__value" id="pe-value">—</div>
          <div id="pe-details" style="margin-top:.5rem;font-size:.9rem;color:var(--color-text-muted)"></div>
        </div>

        <div class="how-to" style="margin-top:1.5rem">
          <div class="how-to__title">Formula</div>
          <div class="how-to__body">
            <p>Percent Error measures how inaccurate a measured value is compared to an accepted (true) value.</p>
            <code style="display:block;background:var(--color-bg-subtle);padding:.75rem;border-radius:4px;margin:.5rem 0">
              Percent Error = |(Actual - Experimental) / Actual| × 100%
            </code>
            <p style="margin-top:.5rem">The vertical bars (| |) indicate absolute value, so the result is always positive.</p>
          </div>
        </div>
      </div>
    </div>
  `;
}

export function calculate({ actual, experimental }) {
  if (actual === 0) return { percentError: null, error: 'Actual value cannot be zero' };
  const error = Math.abs((actual - experimental) / actual) * 100;
  return { percentError: error, absoluteError: Math.abs(actual - experimental) };
}

export function bindEvents(container) {
  const btn = container.querySelector('#pe-btn');
  const resultEl = container.querySelector('#pe-result');
  const valueEl = container.querySelector('#pe-value');
  const detailsEl = container.querySelector('#pe-details');

  function calculatePE() {
    const actual = parseFloat(container.querySelector('#pe-actual').value);
    const experimental = parseFloat(container.querySelector('#pe-experimental').value);

    if (isNaN(actual) || isNaN(experimental)) {
      valueEl.textContent = 'Please enter both values';
      detailsEl.textContent = '';
      resultEl.classList.remove('result-box--hidden');
      return;
    }

    const { percentError, absoluteError } = calculate({ actual, experimental });
    if (percentError === null) {
      valueEl.textContent = 'Actual value cannot be zero';
      detailsEl.textContent = '';
      resultEl.classList.remove('result-box--hidden');
      return;
    }

    valueEl.textContent = percentError.toFixed(4) + '%';
    detailsEl.textContent = `Absolute Error: ${absoluteError.toFixed(4)}`;
    resultEl.classList.remove('result-box--hidden');
  }

  btn.addEventListener('click', calculatePE);
}
