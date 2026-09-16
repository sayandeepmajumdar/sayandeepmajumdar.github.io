/* ============================================================
   BMI.JS — Body Mass Index calculator
   ============================================================ */

export function render(container) {
  container.innerHTML = `
    <div class="calc-panel">
      <div class="calc-panel__header">
        <span class="calc-panel__title">BMI Calculator</span>
        <div class="segment" id="bmi-unit-seg">
          <button class="segment__btn active" data-unit="metric" aria-label="Metric units">Metric</button>
          <button class="segment__btn" data-unit="imperial" aria-label="Imperial units">Imperial</button>
        </div>
      </div>
      <div class="calc-panel__body">

        <!-- Metric inputs -->
        <div id="bmi-metric">
          <div class="form-row">
            <div class="form-group">
              <label class="form-label" for="bmi-weight-kg">Weight (kg)</label>
              <input class="form-input form-input--lg" type="number" id="bmi-weight-kg" min="1" max="500" placeholder="70" aria-label="Weight in kilograms">
            </div>
            <div class="form-group">
              <label class="form-label" for="bmi-height-cm">Height (cm)</label>
              <input class="form-input form-input--lg" type="number" id="bmi-height-cm" min="1" max="300" placeholder="175" aria-label="Height in centimeters">
            </div>
          </div>
        </div>

        <!-- Imperial inputs -->
        <div id="bmi-imperial" style="display:none">
          <div class="form-group">
            <label class="form-label" for="bmi-weight-lbs">Weight (lbs)</label>
            <input class="form-input form-input--lg" type="number" id="bmi-weight-lbs" min="1" max="1000" placeholder="154" aria-label="Weight in pounds">
          </div>
          <div class="form-row">
            <div class="form-group">
              <label class="form-label" for="bmi-height-ft">Height (ft)</label>
              <input class="form-input form-input--lg" type="number" id="bmi-height-ft" min="1" max="9" placeholder="5" aria-label="Height feet">
            </div>
            <div class="form-group">
              <label class="form-label" for="bmi-height-in">Height (in)</label>
              <input class="form-input form-input--lg" type="number" id="bmi-height-in" min="0" max="11" placeholder="9" aria-label="Height inches">
            </div>
          </div>
        </div>

        <button class="btn btn--primary btn--lg" id="bmi-calc-btn" style="width:100%" aria-label="Calculate BMI">Calculate BMI</button>

        <!-- Result -->
        <div class="result-box result-box--hidden" id="bmi-result">
          <div class="result-box__label">Your BMI</div>
          <div class="result-box__value" id="bmi-value">—</div>
          <div id="bmi-badge-wrap" style="margin-top:.5rem"></div>

          <div class="bmi-scale" id="bmi-scale-wrap">
            <div class="bmi-scale__bar">
              <div class="bmi-scale__marker" id="bmi-marker" style="left:0%"></div>
            </div>
            <div class="bmi-scale__labels">
              <span>Under</span><span>Normal</span><span>Over</span><span>Obese</span>
            </div>
          </div>
        </div>

        <div class="how-to" style="margin-top:1.5rem">
          <div class="how-to__title">How to use</div>
          <div class="how-to__body">
            <ol>
              <li>Select your preferred unit system (Metric or Imperial).</li>
              <li>Enter your weight and height.</li>
              <li>Click <strong>Calculate BMI</strong> to see your result and category.</li>
            </ol>
            <p style="margin-top:.5rem">BMI = weight(kg) ÷ height(m)². Categories: Underweight &lt;18.5, Normal 18.5–24.9, Overweight 25–29.9, Obese ≥30.</p>
          </div>
        </div>
      </div>
    </div>
  `;
}

export function calculate({ weightKg, heightM }) {
  if (!weightKg || !heightM || heightM <= 0) return { bmi: null, category: '' };
  const bmi = weightKg / (heightM * heightM);
  let category, badge;
  if (bmi < 18.5)      { category = 'Underweight'; badge = 'under'; }
  else if (bmi < 25)   { category = 'Normal weight'; badge = 'normal'; }
  else if (bmi < 30)   { category = 'Overweight'; badge = 'over'; }
  else                 { category = 'Obese'; badge = 'obese'; }
  return { bmi: bmi.toFixed(1), category, badge };
}

function bmiToPercent(bmi) {
  // Map BMI 10–40 to 0–100%
  const clamped = Math.max(10, Math.min(40, bmi));
  return ((clamped - 10) / 30) * 100;
}

export function bindEvents(container) {
  const seg      = container.querySelector('#bmi-unit-seg');
  const metricEl = container.querySelector('#bmi-metric');
  const imperEl  = container.querySelector('#bmi-imperial');
  const btn      = container.querySelector('#bmi-calc-btn');
  const resultEl = container.querySelector('#bmi-result');
  const valueEl  = container.querySelector('#bmi-value');
  const badgeEl  = container.querySelector('#bmi-badge-wrap');
  const markerEl = container.querySelector('#bmi-marker');
  if (!btn) return;

  let unit = 'metric';

  if (seg) {
    seg.addEventListener('click', (e) => {
      const b = e.target.closest('[data-unit]');
      if (!b) return;
      unit = b.dataset.unit;
      seg.querySelectorAll('.segment__btn').forEach(x => x.classList.remove('active'));
      b.classList.add('active');
      metricEl.style.display  = unit === 'metric'   ? '' : 'none';
      imperEl.style.display   = unit === 'imperial' ? '' : 'none';
    });
  }

  btn.addEventListener('click', () => {
    let weightKg, heightM;

    if (unit === 'metric') {
      weightKg = parseFloat(container.querySelector('#bmi-weight-kg').value);
      const hcm = parseFloat(container.querySelector('#bmi-height-cm').value);
      heightM = hcm / 100;
    } else {
      const lbs = parseFloat(container.querySelector('#bmi-weight-lbs').value);
      const ft  = parseFloat(container.querySelector('#bmi-height-ft').value) || 0;
      const inc = parseFloat(container.querySelector('#bmi-height-in').value) || 0;
      weightKg  = lbs * 0.453592;
      heightM   = (ft * 12 + inc) * 0.0254;
    }

    const { bmi, category, badge } = calculate({ weightKg, heightM });
    if (!bmi) {
      valueEl.textContent = 'Invalid input';
      resultEl.classList.remove('result-box--hidden');
      badgeEl.innerHTML = '';
      return;
    }

    resultEl.classList.remove('result-box--hidden');
    valueEl.textContent = bmi;
    badgeEl.innerHTML = `<span class="bmi-badge bmi-badge--${badge}">${category}</span>`;
    if (markerEl) {
      setTimeout(() => { markerEl.style.left = bmiToPercent(parseFloat(bmi)) + '%'; }, 50);
    }
  });
}
