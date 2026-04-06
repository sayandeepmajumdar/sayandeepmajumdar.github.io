/* ============================================================
   EXPONENT.JS — Exponent Calculator (Power Calculator)
   ============================================================ */

export function render(container) {
  container.innerHTML = `
    <div class="calc-panel">
      <div class="calc-panel__header">
        <span class="calc-panel__title">Exponent Calculator</span>
        <div class="calc-panel__header-icon">✷</div>
      </div>
      <div class="calc-panel__body">
        <div class="form-row">
          <div class="form-group">
            <label class="form-label" for="exp-base">Base (b)</label>
            <input class="form-input form-input--lg" type="number" id="exp-base" placeholder="e.g. 2" aria-label="Base number">
          </div>
          <div class="form-group">
            <label class="form-label" for="exp-power">Exponent (n)</label>
            <input class="form-input form-input--lg" type="number" id="exp-power" placeholder="e.g. 10" aria-label="Exponent power">
          </div>
        </div>

        <button class="btn btn--primary btn--lg" id="exp-btn" style="width:100%" aria-label="Calculate exponent">Calculate</button>

        <div class="result-box result-box--hidden" id="exp-result">
          <div class="result-box__label">Result</div>
          <div class="result-box__value" id="exp-value">—</div>
          <div id="exp-details" style="margin-top:.5rem;font-size:.9rem;color:var(--color-text-muted)"></div>
        </div>

        <div class="how-to" style="margin-top:1.5rem">
          <div class="how-to__title">Formula</div>
          <div class="how-to__body">
            <p>Exponentiation calculates a number raised to a power.</p>
            <code style="display:block;background:var(--color-bg-subtle);padding:.75rem;border-radius:4px;margin:.5rem 0">
              bⁿ = b × b × b × ... × b (n times)
            </code>
            <p style="margin-top:.5rem">For example, 2¹⁰ = 2 × 2 × 2 × 2 × 2 × 2 × 2 × 2 × 2 × 2 = <strong>1024</strong></p>
          </div>
        </div>
      </div>
    </div>
  `;
}

export function bindEvents(container) {
  const btn = container.querySelector('#exp-btn');
  const resultEl = container.querySelector('#exp-result');
  const valueEl = container.querySelector('#exp-value');
  const detailsEl = container.querySelector('#exp-details');

  function calculate() {
    const base = parseFloat(container.querySelector('#exp-base').value);
    const power = parseFloat(container.querySelector('#exp-power').value);

    if (isNaN(base) || isNaN(power)) {
      valueEl.textContent = 'Please enter both values';
      detailsEl.textContent = '';
      resultEl.classList.remove('result-box--hidden');
      return;
    }

    if (power === 0) {
      valueEl.textContent = '1';
      detailsEl.textContent = 'Any number to power 0 equals 1';
      resultEl.classList.remove('result-box--hidden');
      return;
    }

    if (base === 0 && power < 0) {
      valueEl.textContent = 'Undefined';
      detailsEl.textContent = 'Cannot divide by zero';
      resultEl.classList.remove('result-box--hidden');
      return;
    }

    const result = Math.pow(base, power);

    if (!isFinite(result)) {
      valueEl.textContent = 'Result too large';
      detailsEl.textContent = 'Number exceeds JavaScript limits';
      resultEl.classList.remove('result-box--hidden');
      return;
    }

    valueEl.textContent = result.toLocaleString(undefined, { maximumFractionDigits: 10 });
    detailsEl.textContent = `${base} raised to the power of ${power}`;
    resultEl.classList.remove('result-box--hidden');
  }

  btn.addEventListener('click', calculate);
}
