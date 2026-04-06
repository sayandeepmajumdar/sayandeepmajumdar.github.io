/* ============================================================
   GCF.JS — Greatest Common Factor Calculator
   ============================================================ */

export function render(container) {
  container.innerHTML = `
    <div class="calc-panel">
      <div class="calc-panel__header">
        <span class="calc-panel__title">Greatest Common Factor</span>
        <div class="calc-panel__header-icon">÷</div>
      </div>
      <div class="calc-panel__body">
        <div class="form-group">
          <label class="form-label" for="gcf-nums">Enter numbers (comma-separated)</label>
          <input class="form-input form-input--lg" type="text" id="gcf-nums" placeholder="e.g. 48, 60, 72" aria-label="Numbers to find GCF">
        </div>

        <button class="btn btn--primary btn--lg" id="gcf-btn" style="width:100%" aria-label="Calculate GCF">Calculate</button>

        <div class="result-box result-box--hidden" id="gcf-result">
          <div class="result-box__label">GCF (GCD)</div>
          <div class="result-box__value" id="gcf-value">—</div>
          <div id="gcf-details" style="margin-top:.5rem;font-size:.9rem;color:var(--color-text-muted)"></div>
        </div>

        <div class="how-to" style="margin-top:1.5rem">
          <div class="how-to__title">Formula</div>
          <div class="how-to__body">
            <p>The GCF (also GCD) is the largest positive integer that divides all given numbers.</p>
            <code style="display:block;background:var(--color-bg-subtle);padding:.75rem;border-radius:4px;margin:.5rem 0">
              GCF(a, b) = GCF(b, a mod b)<br>
              (Euclidean algorithm)
            </code>
            <p style="margin-top:.5rem"><strong>Example:</strong> GCF(48, 60) = 12</p>
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
  const btn = container.querySelector('#gcf-btn');
  const resultEl = container.querySelector('#gcf-result');
  const valueEl = container.querySelector('#gcf-value');
  const detailsEl = container.querySelector('#gcf-details');

  function calculate() {
    const input = container.querySelector('#gcf-nums').value;
    const nums = input.split(',').map(s => parseInt(s.trim())).filter(n => !isNaN(n));

    if (nums.length === 0) {
      valueEl.textContent = 'Please enter at least one number';
      detailsEl.textContent = '';
      resultEl.classList.remove('result-box--hidden');
      return;
    }

    if (nums.length === 1) {
      valueEl.textContent = Math.abs(nums[0]);
      detailsEl.textContent = 'GCF of a single number is the number itself';
      resultEl.classList.remove('result-box--hidden');
      return;
    }

    let result = nums[0];
    for (let i = 1; i < nums.length; i++) {
      result = gcd(result, nums[i]);
      if (result === 1) break;
    }

    valueEl.textContent = result.toLocaleString();
    detailsEl.textContent = `GCF of [${nums.join(', ')}]`;
    resultEl.classList.remove('result-box--hidden');
  }

  btn.addEventListener('click', calculate);
}
