/* ============================================================
   HALFLIFE.JS — Half-Life Calculator
   ============================================================ */

export function render(container) {
  container.innerHTML = `
    <div class="calc-panel">
      <div class="calc-panel__header">
        <span class="calc-panel__title">Half-Life Calculator</span>
        <div class="calc-panel__header-icon calc-panel__header-icon--danger">☢️</div>
      </div>
      <div class="calc-panel__body">
        <div class="form-row">
          <div class="form-group">
            <label class="form-label" for="hl-initial">Initial Amount</label>
            <input class="form-input form-input--lg" type="number" id="hl-initial" min="0" placeholder="e.g. 100" aria-label="Initial amount">
          </div>
          <div class="form-group">
            <label class="form-label" for="hl-halflife">Half-Life (time units)</label>
            <input class="form-input form-input--lg" type="number" id="hl-halflife" min="0" placeholder="e.g. 5730 (C-14)" aria-label="Half-life period">
          </div>
        </div>

        <div class="form-group">
          <label class="form-label" for="hl-time">Time Elapsed</label>
          <input class="form-input form-input--lg" type="number" id="hl-time" min="0" placeholder="e.g. 10000" aria-label="Time elapsed">
        </div>

        <button class="btn btn--primary btn--lg" id="hl-btn" style="width:100%" aria-label="Calculate remaining amount">Calculate</button>

        <div class="result-box result-box--hidden" id="hl-result">
          <div class="result-box__label">Remaining Amount</div>
          <div class="result-box__value" id="hl-value">—</div>
          <div id="hl-details" style="margin-top:.5rem;font-size:.9rem;color:var(--color-text-muted)"></div>
        </div>

        <div class="how-to" style="margin-top:1.5rem">
          <div class="how-to__title">Formula</div>
          <div class="how-to__body">
            <p>Calculates remaining quantity after radioactive decay based on half-life.</p>
            <code style="display:block;background:var(--color-bg-subtle);padding:.75rem;border-radius:4px;margin:.5rem 0">
              N(t) = N₀ × (1/2)^(t / t½)
            </code>
            <p style="margin-top:.5rem"><strong>Where:</strong></p>
            <ul>
              <li>N(t) = remaining quantity after time t</li>
              <li>N₀ = initial quantity</li>
              <li>t = time elapsed</li>
              <li>t½ = half-life</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  `;
}

export function bindEvents(container) {
  const btn = container.querySelector('#hl-btn');
  const resultEl = container.querySelector('#hl-result');
  const valueEl = container.querySelector('#hl-value');
  const detailsEl = container.querySelector('#hl-details');

  function calculate() {
    const initial = parseFloat(container.querySelector('#hl-initial').value);
    const halflife = parseFloat(container.querySelector('#hl-halflife').value);
    const time = parseFloat(container.querySelector('#hl-time').value);

    if (isNaN(initial) || isNaN(halflife) || isNaN(time)) {
      valueEl.textContent = 'Please enter all values';
      detailsEl.textContent = '';
      resultEl.classList.remove('result-box--hidden');
      return;
    }

    if (halflife <= 0) {
      valueEl.textContent = 'Half-life must be positive';
      detailsEl.textContent = '';
      resultEl.classList.remove('result-box--hidden');
      return;
    }

    const remaining = initial * Math.pow(0.5, time / halflife);
    const decayed = initial - remaining;
    const percentRemaining = (remaining / initial) * 100;

    valueEl.textContent = remaining.toLocaleString(undefined, { maximumFractionDigits: 6 });
    detailsEl.textContent = `Decayed: ${decayed.toLocaleString(undefined, { maximumFractionDigits: 2 })} (${percentRemaining.toFixed(2)}% remaining)`;
    resultEl.classList.remove('result-box--hidden');
  }

  btn.addEventListener('click', calculate);
}
