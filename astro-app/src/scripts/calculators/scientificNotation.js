/* ============================================================
   SCIENTIFICNOTATION.JS — Scientific Notation Calculator
   ============================================================ */

export function render(container) {
  container.innerHTML = `
    <div class="calc-panel">
      <div class="calc-panel__header">
        <span class="calc-panel__title">Scientific Notation</span>
        <div class="calc-panel__header-icon">×10</div>
      </div>
      <div class="calc-panel__body">
        <div class="tab-list" role="tablist">
          <button class="tab-btn active" role="tab" data-tab="sn-mode1" aria-selected="true">To Sci</button>
          <button class="tab-btn" role="tab" data-tab="sn-mode2" aria-selected="false">From Sci</button>
          <button class="tab-btn" role="tab" data-tab="sn-mode3" aria-selected="false">Ops</button>
        </div>

        <!-- To Scientific -->
        <div class="tab-panel active" id="sn-mode1">
          <div class="form-group">
            <label class="form-label" for="sn-decimal">Enter decimal number</label>
            <input class="form-input form-input--lg" type="text" id="sn-decimal" placeholder="e.g. 12345.678" aria-label="Decimal number">
          </div>
          <div class="form-group">
            <label class="form-label" for="sn-precision">Significant figures (optional)</label>
            <input class="form-input form-input--lg" type="number" id="sn-precision" min="1" max="20" placeholder="e.g. 4" aria-label="Precision">
          </div>
          <div class="result-box result-box--hidden" id="sn-to-result">
            <div class="result-box__label">Scientific Notation</div>
            <div class="result-box__value" id="sn-to-value">—</div>
          </div>
        </div>

        <!-- From Scientific -->
        <div class="tab-panel" id="sn-mode2">
          <div class="form-row">
            <div class="form-group">
              <label class="form-label" for="sn-mantissa">Coefficient (m)</label>
              <input class="form-input form-input--lg" type="number" id="sn-mantissa" placeholder="e.g. 1.234" aria-label="Mantissa">
            </div>
            <div class="form-group">
              <label class="form-label" for="sn-exp">Exponent (n)</label>
              <input class="form-input form-input--lg" type="number" id="sn-exp" placeholder="e.g. 4" aria-label="Exponent">
            </div>
          </div>
          <div class="result-box result-box--hidden" id="sn-from-result">
            <div class="result-box__label">Decimal</div>
            <div class="result-box__value" id="sn-from-value">—</div>
          </div>
        </div>

        <!-- Operations -->
        <div class="tab-panel" id="sn-mode3">
          <p style="margin-bottom:.5rem;font-size:.9rem;color:var(--color-text-muted)">Number 1: m₁ × 10ⁿ¹</p>
          <div class="form-row">
            <input class="form-input" type="number" id="sn-op1-m" placeholder="m₁">
            <input class="form-input" type="number" id="sn-op1-n" placeholder="n₁">
          </div>
          <div style="text-align:center;margin:.5rem 0">
            <label style="cursor:pointer">
              <input type="radio" name="sn-op" value="mul" checked> ×
              <input type="radio" name="sn-op" value="div" style="margin-left:1rem"> ÷
            </label>
          </div>
          <p style="margin-bottom:.5rem;font-size:.9rem;color:var(--color-text-muted)">Number 2: m₂ × 10ⁿ²</p>
          <div class="form-row">
            <input class="form-input" type="number" id="sn-op2-m" placeholder="m₂">
            <input class="form-input" type="number" id="sn-op2-n" placeholder="n₂">
          </div>
          <button class="btn btn--primary" id="sn-op-btn" style="width:100%;margin-top:.5rem">Calculate</button>
          <div class="result-box result-box--hidden" id="sn-op-result" style="margin-top:1rem">
            <div class="result-box__label">Result</div>
            <div class="result-box__value" id="sn-op-value">—</div>
          </div>
        </div>

        <div class="how-to" style="margin-top:1.5rem">
          <div class="how-to__title">Formulas</div>
          <div class="how-to__body">
            <p><strong>To Scientific:</strong> n = m × 10ᵏ where 1 ≤ |m| < 10</p>
            <p><strong>From Scientific:</strong> m × 10ⁿ = decimal form</p>
            <p><strong>Multiply:</strong> (m₁×m₂) × 10ⁿ¹⁺ⁿ²</p>
            <p><strong>Divide:</strong> (m₁/m₂) × 10ⁿ¹⁻ⁿ²</p>
          </div>
        </div>
      </div>
    </div>
  `;
}

function toScientific(num, precision) {
  if (num === 0) return { mantissa: 0, exponent: 0 };
  const exp = Math.floor(Math.log10(Math.abs(num)));
  const mantissa = num / Math.pow(10, exp);
  return {
    mantissa: precision ? parseFloat(mantissa.toFixed(precision)) : mantissa,
    exponent: exp
  };
}

function formatSci(m, e) {
  return `${m} × 10^${e}`;
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

  function calcToScientific() {
    const val = parseFloat(container.querySelector('#sn-decimal').value);
    const precision = parseInt(container.querySelector('#sn-precision').value);
    const el = container.querySelector('#sn-to-result');
    const vl = container.querySelector('#sn-to-value');
    
    if (isNaN(val)) {
      vl.textContent = 'Please enter a number';
      el.classList.remove('result-box--hidden');
      return;
    }

    const { mantissa, exponent } = toScientific(val, precision);
    vl.textContent = formatSci(mantissa, exponent);
    el.classList.remove('result-box--hidden');
  }

  function calcFromScientific() {
    const m = parseFloat(container.querySelector('#sn-mantissa').value);
    const n = parseFloat(container.querySelector('#sn-exp').value);
    const el = container.querySelector('#sn-from-result');
    const vl = container.querySelector('#sn-from-value');
    
    if (isNaN(m) || isNaN(n)) {
      vl.textContent = 'Please enter both values';
      el.classList.remove('result-box--hidden');
      return;
    }

    const result = m * Math.pow(10, n);
    vl.textContent = result.toLocaleString();
    el.classList.remove('result-box--hidden');
  }

  function calcOperation() {
    const m1 = parseFloat(container.querySelector('#sn-op1-m').value);
    const n1 = parseFloat(container.querySelector('#sn-op1-n').value);
    const m2 = parseFloat(container.querySelector('#sn-op2-m').value);
    const n2 = parseFloat(container.querySelector('#sn-op2-n').value);
    const op = container.querySelector('input[name="sn-op"]:checked').value;
    const el = container.querySelector('#sn-op-result');
    const vl = container.querySelector('#sn-op-value');

    if (isNaN(m1) || isNaN(n1) || isNaN(m2) || isNaN(n2)) {
      vl.textContent = 'Please enter all values';
      el.classList.remove('result-box--hidden');
      return;
    }

    if (op === 'div' && m2 === 0) {
      vl.textContent = 'Cannot divide by zero';
      el.classList.remove('result-box--hidden');
      return;
    }

    let m, n;
    if (op === 'mul') {
      m = m1 * m2;
      n = n1 + n2;
    } else {
      m = m1 / m2;
      n = n1 - n2;
    }

    while (Math.abs(m) >= 10) {
      m /= 10;
      n += 1;
    }
    while (Math.abs(m) < 1 && m !== 0) {
      m *= 10;
      n -= 1;
    }

    vl.textContent = formatSci(parseFloat(m.toFixed(6)), n);
    el.classList.remove('result-box--hidden');
  }

  container.querySelector('#sn-decimal').addEventListener('input', calcToScientific);
  container.querySelector('#sn-precision').addEventListener('input', calcToScientific);
  container.querySelector('#sn-mantissa').addEventListener('input', calcFromScientific);
  container.querySelector('#sn-exp').addEventListener('input', calcFromScientific);
  container.querySelector('#sn-op-btn').addEventListener('click', calcOperation);
}
