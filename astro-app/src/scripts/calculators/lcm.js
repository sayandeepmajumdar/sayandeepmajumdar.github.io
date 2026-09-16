/* ============================================================
   LCM.JS — Least Common Multiple Calculator
   ============================================================ */

export function render(container) {
  container.innerHTML = `
    <div class="calc-panel">
      <div class="calc-panel__header">
        <span class="calc-panel__title">Least Common Multiple</span>
        <div class="calc-panel__header-icon">🔢</div>
      </div>
      <div class="calc-panel__body">
        <div class="form-group">
          <label class="form-label" for="lcm-nums">Enter numbers (comma-separated)</label>
          <input class="form-input form-input--lg" type="text" id="lcm-nums" placeholder="e.g. 12, 15, 20" aria-label="Numbers to find LCM">
        </div>

        <button class="btn btn--primary btn--lg" id="lcm-btn" style="width:100%" aria-label="Calculate LCM">Calculate</button>

        <div class="result-box result-box--hidden" id="lcm-result">
          <div class="result-box__label">LCM</div>
          <div class="result-box__value" id="lcm-value">—</div>
          <div id="lcm-details" style="margin-top:.5rem;font-size:.9rem;color:var(--color-text-muted)"></div>
        </div>

        <div class="how-to" style="margin-top:1.5rem">
          <div class="how-to__title">Formula</div>
          <div class="how-to__body">
            <p>The LCM is the smallest positive number that is a multiple of all given numbers.</p>
            <code style="display:block;background:var(--color-bg-subtle);padding:.75rem;border-radius:4px;margin:.5rem 0">
              LCM(a, b) = |a × b| / GCD(a, b)
            </code>
            <p style="margin-top:.5rem"><strong>Example:</strong> LCM(12, 15) = 60 (12×15/3 = 180/3)</p>
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

function lcm2(a, b) {
  if (a === 0 || b === 0) return 0;
  return Math.abs(a * b) / gcd(a, b);
}

export function bindEvents(container) {
  const btn = container.querySelector('#lcm-btn');
  const resultEl = container.querySelector('#lcm-result');
  const valueEl = container.querySelector('#lcm-value');
  const detailsEl = container.querySelector('#lcm-details');

  function calculate() {
    const input = container.querySelector('#lcm-nums').value;
    const nums = input.split(',').map(s => parseInt(s.trim())).filter(n => !isNaN(n));

    if (nums.length === 0) {
      valueEl.textContent = 'Please enter at least one number';
      detailsEl.textContent = '';
      resultEl.classList.remove('result-box--hidden');
      return;
    }

    if (nums.length === 1) {
      valueEl.textContent = nums[0];
      detailsEl.textContent = 'LCM of a single number is the number itself';
      resultEl.classList.remove('result-box--hidden');
      return;
    }

    let result = nums[0];
    for (let i = 1; i < nums.length; i++) {
      result = lcm2(result, nums[i]);
    }

    valueEl.textContent = result.toLocaleString();
    detailsEl.textContent = `LCM of [${nums.join(', ')}]`;
    resultEl.classList.remove('result-box--hidden');
  }

  btn.addEventListener('click', calculate);
}
