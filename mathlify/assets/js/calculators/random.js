/* ============================================================
   RANDOM.JS — Random Number Generator
   ============================================================ */

export function render(container) {
  container.innerHTML = `
    <div class="calc-panel">
      <div class="calc-panel__header">
        <span class="calc-panel__title">Random Number Generator</span>
        <div class="calc-panel__header-icon">🎲</div>
      </div>
      <div class="calc-panel__body">
        <div class="form-row">
          <div class="form-group">
            <label class="form-label" for="rand-min">Minimum</label>
            <input class="form-input form-input--lg" type="number" id="rand-min" value="1">
          </div>
          <div class="form-group">
            <label class="form-label" for="rand-max">Maximum</label>
            <input class="form-input form-input--lg" type="number" id="rand-max" value="100">
          </div>
        </div>

        <div class="form-group">
          <label class="form-label" for="rand-count">How many numbers?</label>
          <input class="form-input form-input--lg" type="number" id="rand-count" value="1" min="1" max="100">
        </div>

        <div class="form-group">
          <label class="checkbox-label">
            <input type="checkbox" id="rand-unique">
            <span>Allow duplicates</span>
          </label>
        </div>

        <button class="btn btn--primary btn--lg" id="rand-btn" style="width:100%" aria-label="Generate random numbers">Generate</button>

        <div class="result-box result-box--hidden" id="rand-result">
          <div class="result-box__label">Random Number(s)</div>
          <div class="result-box__value" id="rand-value">—</div>
        </div>

        <div class="how-to" style="margin-top:1.5rem">
          <div class="how-to__title">Formula</div>
          <div class="how-to__body">
            <p>For a random integer between <strong>min</strong> and <strong>max</strong>:</p>
            <code style="display:block;background:var(--color-bg-subtle);padding:.75rem;border-radius:4px;margin:.5rem 0">
              result = Math.floor(Math.random() × (max - min + 1)) + min
            </code>
            <p style="margin-top:.5rem">The <code>Math.random()</code> function returns a floating-point number between 0 (inclusive) and 1 (exclusive).</p>
          </div>
        </div>
      </div>
    </div>
  `;
}

export function bindEvents(container) {
  const btn = container.querySelector('#rand-btn');
  const resultEl = container.querySelector('#rand-result');
  const valueEl = container.querySelector('#rand-value');

  function generate() {
    const min = parseInt(container.querySelector('#rand-min').value) || 1;
    const max = parseInt(container.querySelector('#rand-max').value) || 100;
    const count = parseInt(container.querySelector('#rand-count').value) || 1;
    const unique = !container.querySelector('#rand-unique').checked;

    if (min > max) {
      valueEl.textContent = 'Min must be ≤ Max';
      resultEl.classList.remove('result-box--hidden');
      return;
    }

    if (count > 100) {
      valueEl.textContent = 'Max 100 numbers';
      resultEl.classList.remove('result-box--hidden');
      return;
    }

    const numbers = [];
    if (unique && count > (max - min + 1)) {
      valueEl.textContent = `Cannot generate ${count} unique numbers in range [${min}, ${max}]`;
      resultEl.classList.remove('result-box--hidden');
      return;
    }

    while (numbers.length < count) {
      const r = Math.floor(Math.random() * (max - min + 1)) + min;
      if (unique) {
        if (!numbers.includes(r)) numbers.push(r);
      } else {
        numbers.push(r);
      }
    }

    valueEl.textContent = numbers.join(', ');
    resultEl.classList.remove('result-box--hidden');
  }

  btn.addEventListener('click', generate);
}
