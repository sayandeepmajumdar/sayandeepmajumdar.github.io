/* ============================================================
   QUADRATIC.JS — Quadratic Formula Calculator
   ============================================================ */

export function render(container) {
  container.innerHTML = `
    <div class="calc-panel">
      <div class="calc-panel__header">
        <span class="calc-panel__title">Quadratic Formula Calculator</span>
        <div class="calc-panel__header-icon calc-panel__header-icon--success">∫</div>
      </div>
      <div class="calc-panel__body">
        <p style="margin-bottom:1rem;color:var(--color-text-muted)">Solve ax² + bx + c = 0</p>
        
        <div class="form-row">
          <div class="form-group">
            <label class="form-label" for="quad-a">a (coefficient of x²)</label>
            <input class="form-input form-input--lg" type="number" id="quad-a" placeholder="e.g. 1" aria-label="Coefficient a">
          </div>
          <div class="form-group">
            <label class="form-label" for="quad-b">b (coefficient of x)</label>
            <input class="form-input form-input--lg" type="number" id="quad-b" placeholder="e.g. -3" aria-label="Coefficient b">
          </div>
          <div class="form-group">
            <label class="form-label" for="quad-c">c (constant)</label>
            <input class="form-input form-input--lg" type="number" id="quad-c" placeholder="e.g. 2" aria-label="Constant c">
          </div>
        </div>

        <button class="btn btn--primary btn--lg" id="quad-btn" style="width:100%" aria-label="Solve quadratic equation">Solve</button>

        <div class="result-box result-box--hidden" id="quad-result">
          <div class="result-box__label">Solutions</div>
          <div class="result-box__value" id="quad-value">—</div>
          <div id="quad-details" style="margin-top:.5rem;font-size:.9rem;color:var(--color-text-muted)"></div>
        </div>

        <div class="how-to" style="margin-top:1.5rem">
          <div class="how-to__title">Formula</div>
          <div class="how-to__body">
            <p>The quadratic formula finds roots of any quadratic equation:</p>
            <code style="display:block;background:var(--color-bg-subtle);padding:.75rem;border-radius:4px;margin:.5rem 0">
              x = (-b ± √(b² - 4ac)) / 2a
            </code>
            <p style="margin-top:.5rem"><strong>Discriminant:</strong> b² - 4ac determines the nature of roots:</p>
            <ul>
              <li>b² - 4ac &gt; 0 → Two real roots</li>
              <li>b² - 4ac = 0 → One real root (repeated)</li>
              <li>b² - 4ac &lt; 0 → Two complex roots</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  `;
}

export function bindEvents(container) {
  const btn = container.querySelector('#quad-btn');
  const resultEl = container.querySelector('#quad-result');
  const valueEl = container.querySelector('#quad-value');
  const detailsEl = container.querySelector('#quad-details');

  function solve() {
    const a = parseFloat(container.querySelector('#quad-a').value);
    const b = parseFloat(container.querySelector('#quad-b').value);
    const c = parseFloat(container.querySelector('#quad-c').value);

    if (isNaN(a) || isNaN(b) || isNaN(c)) {
      valueEl.textContent = 'Please enter all values';
      detailsEl.textContent = '';
      resultEl.classList.remove('result-box--hidden');
      return;
    }

    if (a === 0) {
      valueEl.textContent = 'a cannot be zero (not quadratic)';
      detailsEl.textContent = 'For linear equations, use the form bx + c = 0';
      resultEl.classList.remove('result-box--hidden');
      return;
    }

    const discriminant = b * b - 4 * a * c;
    const discriminantAbs = Math.abs(discriminant);
    const sqrtD = Math.sqrt(discriminantAbs);
    const denom = 2 * a;

    let roots, details;

    if (discriminant > 0) {
      const x1 = (-b + sqrtD) / denom;
      const x2 = (-b - sqrtD) / denom;
      roots = `x₁ = ${x1.toFixed(6)}, x₂ = ${x2.toFixed(6)}`;
      details = `Discriminant: ${discriminant} (two real roots)`;
    } else if (discriminant === 0) {
      const x = -b / denom;
      roots = `x = ${x.toFixed(6)}`;
      details = `Discriminant: 0 (one repeated real root)`;
    } else {
      const realPart = -b / denom;
      const imagPart = sqrtD / denom;
      roots = `x₁ = ${realPart.toFixed(4)} + ${imagPart.toFixed(4)}i, x₂ = ${realPart.toFixed(4)} - ${imagPart.toFixed(4)}i`;
      details = `Discriminant: ${discriminant} (two complex roots)`;
    }

    valueEl.textContent = roots;
    detailsEl.textContent = details;
    resultEl.classList.remove('result-box--hidden');
  }

  btn.addEventListener('click', solve);
}
