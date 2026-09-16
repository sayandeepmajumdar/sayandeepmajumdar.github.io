/* ============================================================
   FACTOR.JS — Factor Calculator
   ============================================================ */

export function render(container) {
  container.innerHTML = `
    <div class="calc-panel">
      <div class="calc-panel__header">
        <span class="calc-panel__title">Factor Calculator</span>
        <div class="calc-panel__header-icon calc-panel__header-icon--success">✱</div>
      </div>
      <div class="calc-panel__body">
        <div class="form-group">
          <label class="form-label" for="factor-num">Enter a positive integer</label>
          <input class="form-input form-input--lg" type="number" id="factor-num" min="1" placeholder="e.g. 60" aria-label="Number to factor">
        </div>

        <button class="btn btn--primary btn--lg" id="factor-btn" style="width:100%" aria-label="Find factors">Find Factors</button>

        <div class="result-box result-box--hidden" id="factor-result">
          <div class="result-box__label">Factors</div>
          <div class="result-box__value" id="factor-value">—</div>
          <div id="factor-details" style="margin-top:.5rem;font-size:.9rem;color:var(--color-text-muted)"></div>
        </div>

        <div class="how-to" style="margin-top:1.5rem">
          <div class="how-to__title">Formula</div>
          <div class="how-to__body">
            <p>Factors are integers that divide evenly into a number without leaving a remainder.</p>
            <code style="display:block;background:var(--color-bg-subtle);padding:.75rem;border-radius:4px;margin:.5rem 0">
              If d divides n evenly, then d is a factor of n
            </code>
            <p style="margin-top:.5rem"><strong>Example:</strong> Factors of 60 = 1, 2, 3, 4, 5, 6, 10, 12, 15, 20, 30, 60</p>
          </div>
        </div>
      </div>
    </div>
  `;
}

function getFactors(n) {
  const factors = [];
  for (let i = 1; i <= Math.sqrt(n); i++) {
    if (n % i === 0) {
      factors.push(i);
      if (i !== n / i) factors.push(n / i);
    }
  }
  return factors.sort((a, b) => a - b);
}

export function bindEvents(container) {
  const btn = container.querySelector('#factor-btn');
  const resultEl = container.querySelector('#factor-result');
  const valueEl = container.querySelector('#factor-value');
  const detailsEl = container.querySelector('#factor-details');

  function calculate() {
    const n = parseInt(container.querySelector('#factor-num').value);

    if (isNaN(n) || n < 1) {
      valueEl.textContent = 'Please enter a positive integer';
      detailsEl.textContent = '';
      resultEl.classList.remove('result-box--hidden');
      return;
    }

    if (n > 10000000) {
      valueEl.textContent = 'Number too large';
      detailsEl.textContent = 'Maximum 10,000,000';
      resultEl.classList.remove('result-box--hidden');
      return;
    }

    const factors = getFactors(n);
    valueEl.textContent = factors.join(', ');
    detailsEl.textContent = `Total: ${factors.length} factors`;
    resultEl.classList.remove('result-box--hidden');
  }

  btn.addEventListener('click', calculate);
}
