/* ============================================================
   LOG.JS — Logarithm Calculator
   ============================================================ */

export function render(container) {
  container.innerHTML = `
    <div class="calc-panel">
      <div class="calc-panel__header">
        <span class="calc-panel__title">Logarithm Calculator</span>
        <div class="calc-panel__header-icon">log</div>
      </div>
      <div class="calc-panel__body">
        <div class="tab-list" role="tablist">
          <button class="tab-btn active" role="tab" data-tab="log-mode1" aria-selected="true">log₁₀</button>
          <button class="tab-btn" role="tab" data-tab="log-mode2" aria-selected="false">log₂</button>
          <button class="tab-btn" role="tab" data-tab="log-mode3" aria-selected="false">ln</button>
          <button class="tab-btn" role="tab" data-tab="log-mode4" aria-selected="false">Custom</button>
        </div>

        <!-- Common Log (base 10) -->
        <div class="tab-panel active" id="log-mode1">
          <div class="form-group">
            <label class="form-label" for="log10-val">Enter value</label>
            <input class="form-input form-input--lg" type="number" id="log10-val" min="0" placeholder="e.g. 100" aria-label="Value for common log">
          </div>
          <div class="result-box result-box--hidden" id="log10-result">
            <div class="result-box__label">log₁₀</div>
            <div class="result-box__value" id="log10-value">—</div>
          </div>
        </div>

        <!-- Binary Log (base 2) -->
        <div class="tab-panel" id="log-mode2">
          <div class="form-group">
            <label class="form-label" for="log2-val">Enter value</label>
            <input class="form-input form-input--lg" type="number" id="log2-val" min="0" placeholder="e.g. 8" aria-label="Value for binary log">
          </div>
          <div class="result-box result-box--hidden" id="log2-result">
            <div class="result-box__label">log₂</div>
            <div class="result-box__value" id="log2-value">—</div>
          </div>
        </div>

        <!-- Natural Log (base e) -->
        <div class="tab-panel" id="log-mode3">
          <div class="form-group">
            <label class="form-label" for="ln-val">Enter value</label>
            <input class="form-input form-input--lg" type="number" id="ln-val" min="0" placeholder="e.g. 2.71828" aria-label="Value for natural log">
          </div>
          <div class="result-box result-box--hidden" id="ln-result">
            <div class="result-box__label">ln</div>
            <div class="result-box__value" id="ln-value">—</div>
          </div>
        </div>

        <!-- Custom Base -->
        <div class="tab-panel" id="log-mode4">
          <div class="form-row">
            <div class="form-group">
              <label class="form-label" for="log-base">Base</label>
              <input class="form-input form-input--lg" type="number" id="log-base" min="0" placeholder="e.g. 5" aria-label="Logarithm base">
            </div>
            <div class="form-group">
              <label class="form-label" for="log-custom-val">Value</label>
              <input class="form-input form-input--lg" type="number" id="log-custom-val" min="0" placeholder="e.g. 25" aria-label="Value for custom log">
            </div>
          </div>
          <div class="result-box result-box--hidden" id="log-custom-result">
            <div class="result-box__label">log<sub id="log-base-sub"></sub></div>
            <div class="result-box__value" id="log-custom-value">—</div>
          </div>
        </div>

        <div class="how-to" style="margin-top:1.5rem">
          <div class="how-to__title">Formula</div>
          <div class="how-to__body">
            <p>A logarithm answers: "What exponent produces this value?"</p>
            <code style="display:block;background:var(--color-bg-subtle);padding:.75rem;border-radius:4px;margin:.5rem 0">
              logₐ(x) = y  means  aʸ = x
            </code>
            <p style="margin-top:.5rem"><strong>Example:</strong> log₁₀(100) = 2 because 10² = 100</p>
          </div>
        </div>
      </div>
    </div>
  `;
}

export function bindEvents(container) {
  const tabBtns = container.querySelectorAll('.tab-btn');
  const tabPanels = container.querySelectorAll('.tab-panel');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => { b.classList.remove('active'); b.setAttribute('aria-selected', 'false'); });
      tabPanels.forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');
      container.querySelector('#' + btn.dataset.tab).classList.add('active');
    });
  });

  function calcLog10() {
    const val = parseFloat(container.querySelector('#log10-val').value);
    const el = container.querySelector('#log10-result');
    const vl = container.querySelector('#log10-value');
    if (!isNaN(val) && val > 0) {
      vl.textContent = Math.log10(val).toFixed(6);
      el.classList.remove('result-box--hidden');
    } else {
      vl.textContent = val === 0 ? '-∞' : 'Invalid input';
      el.classList.remove('result-box--hidden');
    }
  }

  function calcLog2() {
    const val = parseFloat(container.querySelector('#log2-val').value);
    const el = container.querySelector('#log2-result');
    const vl = container.querySelector('#log2-value');
    if (!isNaN(val) && val > 0) {
      vl.textContent = Math.log2(val).toFixed(6);
      el.classList.remove('result-box--hidden');
    } else {
      vl.textContent = val === 0 ? '-∞' : 'Invalid input';
      el.classList.remove('result-box--hidden');
    }
  }

  function calcLn() {
    const val = parseFloat(container.querySelector('#ln-val').value);
    const el = container.querySelector('#ln-result');
    const vl = container.querySelector('#ln-value');
    if (!isNaN(val) && val > 0) {
      vl.textContent = Math.log(val).toFixed(6);
      el.classList.remove('result-box--hidden');
    } else {
      vl.textContent = val === 0 ? '-∞' : 'Invalid input';
      el.classList.remove('result-box--hidden');
    }
  }

  function calcLogCustom() {
    const base = parseFloat(container.querySelector('#log-base').value);
    const val = parseFloat(container.querySelector('#log-custom-val').value);
    const el = container.querySelector('#log-custom-result');
    const vl = container.querySelector('#log-custom-value');
    const baseSub = container.querySelector('#log-base-sub');
    
    if (!isNaN(base) && !isNaN(val) && base > 0 && base !== 1 && val > 0) {
      const result = Math.log(val) / Math.log(base);
      vl.textContent = result.toFixed(6);
      baseSub.textContent = base;
      el.classList.remove('result-box--hidden');
    } else {
      vl.textContent = 'Invalid (base > 0, base ≠ 1, value > 0)';
      el.classList.remove('result-box--hidden');
    }
  }

  container.querySelector('#log10-val').addEventListener('input', calcLog10);
  container.querySelector('#log2-val').addEventListener('input', calcLog2);
  container.querySelector('#ln-val').addEventListener('input', calcLn);
  container.querySelector('#log-base').addEventListener('input', calcLogCustom);
  container.querySelector('#log-custom-val').addEventListener('input', calcLogCustom);
}
