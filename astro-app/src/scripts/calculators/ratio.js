/* ============================================================
   RATIO.JS — Ratio Calculator
   ============================================================ */

export function render(container) {
  container.innerHTML = `
    <div class="calc-panel">
      <div class="calc-panel__header">
        <span class="calc-panel__title">Ratio Calculator</span>
        <div class="calc-panel__header-icon">⚖️</div>
      </div>
      <div class="calc-panel__body">
        <div class="form-row">
          <div class="form-group">
            <label class="form-label" for="ratio-a">Value A</label>
            <input class="form-input form-input--lg" type="number" id="ratio-a" min="0" placeholder="e.g. 10" aria-label="Value A">
          </div>
          <div class="form-group">
            <label class="form-label" for="ratio-b">Value B</label>
            <input class="form-input form-input--lg" type="number" id="ratio-b" min="0" placeholder="e.g. 20" aria-label="Value B">
          </div>
        </div>

        <div class="form-group">
          <label class="form-label" for="ratio-scale">Scale to total of (optional)</label>
          <input class="form-input form-input--lg" type="number" id="ratio-scale" min="1" placeholder="e.g. 100" aria-label="Scale to total">
        </div>

        <button class="btn btn--primary btn--lg" id="ratio-btn" style="width:100%" aria-label="Calculate ratio">Calculate</button>

        <div class="result-box result-box--hidden" id="ratio-result">
          <div class="result-box__label">Ratio</div>
          <div class="result-box__value" id="ratio-value">—</div>
          <div id="ratio-details" style="margin-top:.5rem;font-size:.9rem;color:var(--color-text-muted)"></div>
        </div>

        <div class="how-to" style="margin-top:1.5rem">
          <div class="how-to__title">Formula</div>
          <div class="how-to__body">
            <p>A ratio compares two quantities. Simplifying a ratio divides both by their GCF.</p>
            <code style="display:block;background:var(--color-bg-subtle);padding:.75rem;border-radius:4px;margin:.5rem 0">
              Ratio = A : B = A/GCD : B/GCD
            </code>
            <p style="margin-top:.5rem"><strong>Example:</strong> 10:20 simplifies to 1:2 (divide both by GCD=10)</p>
          </div>
        </div>
      </div>
    </div>
  `;
}

function gcd(a, b) {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b) {
    const t = b;
    b = a % b;
    a = t;
  }
  return a;
}

export function bindEvents(container) {
  const btn = container.querySelector('#ratio-btn');
  const resultEl = container.querySelector('#ratio-result');
  const valueEl = container.querySelector('#ratio-value');
  const detailsEl = container.querySelector('#ratio-details');

  function calculate() {
    const a = parseFloat(container.querySelector('#ratio-a').value);
    const b = parseFloat(container.querySelector('#ratio-b').value);
    const scale = parseFloat(container.querySelector('#ratio-scale').value);

    if (isNaN(a) || isNaN(b)) {
      valueEl.textContent = 'Please enter both values';
      detailsEl.textContent = '';
      resultEl.classList.remove('result-box--hidden');
      return;
    }

    if (a < 0 || b < 0) {
      valueEl.textContent = 'Values cannot be negative';
      detailsEl.textContent = '';
      resultEl.classList.remove('result-box--hidden');
      return;
    }

    if (b === 0) {
      valueEl.textContent = 'B cannot be zero';
      detailsEl.textContent = '';
      resultEl.classList.remove('result-box--hidden');
      return;
    }

    const theGCD = gcd(a, b);
    const simpleA = a / theGCD;
    const simpleB = b / theGCD;
    const ratio = simpleA / simpleB;

    let result = `${simpleA}:${simpleB}`;
    let details = `Simplified ratio (GCD = ${theGCD})`;

    if (!isNaN(scale) && scale > 0) {
      const scaledA = (simpleA / ratio) * scale;
      const scaledB = (simpleB / ratio) * scale;
      details += `. Scaled to ${scale}: ${scaledA.toFixed(2)}:${scaledB.toFixed(2)}`;
    }

    valueEl.textContent = result;
    detailsEl.textContent = details;
    resultEl.classList.remove('result-box--hidden');
  }

  btn.addEventListener('click', calculate);
}
