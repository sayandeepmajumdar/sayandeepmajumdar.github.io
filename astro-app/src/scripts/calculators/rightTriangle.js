/* ============================================================
   RIGHTTRIANGLE.JS — Right Triangle Trigonometry Calculator
   Native Mathlify Design System
   ============================================================ */

const DEG2RAD = Math.PI / 180;
const RAD2DEG = 180 / Math.PI;

export function render(container) {
  container.innerHTML = `
    <div class="calc-panel">
      <div class="calc-panel__header">
        <span class="calc-panel__title">Right Triangle Calculator</span>
        <div class="segment" id="rt-combo-seg" style="overflow-x:auto;max-width:100%">
          <button class="segment__btn active" data-combo="two-legs">2 Legs (a, b)</button>
          <button class="segment__btn" data-combo="leg-hyp">Leg &amp; Hyp (a, c)</button>
          <button class="segment__btn" data-combo="leg-angle">Leg &amp; Angle (a, α)</button>
          <button class="segment__btn" data-combo="hyp-angle">Hyp &amp; Angle (c, α)</button>
          <button class="segment__btn" data-combo="area-leg">Area &amp; Leg (A, a)</button>
        </div>
      </div>
      <div class="calc-panel__body">

        <!-- 2 Legs Form -->
        <div id="rt-form-two-legs">
          <div class="form-row">
            <div class="form-group">
              <label class="form-label" for="rt-2l-a">Leg a (adjacent to β)</label>
              <input class="form-input form-input--lg" type="number" id="rt-2l-a" min="0.001" step="any" placeholder="3" value="3">
            </div>
            <div class="form-group">
              <label class="form-label" for="rt-2l-b">Leg b (adjacent to α)</label>
              <input class="form-input form-input--lg" type="number" id="rt-2l-b" min="0.001" step="any" placeholder="4" value="4">
            </div>
          </div>
        </div>

        <!-- Leg & Hyp Form -->
        <div id="rt-form-leg-hyp" style="display:none">
          <div class="form-row">
            <div class="form-group">
              <label class="form-label" for="rt-lh-a">Leg a</label>
              <input class="form-input form-input--lg" type="number" id="rt-lh-a" min="0.001" step="any" placeholder="6" value="6">
            </div>
            <div class="form-group">
              <label class="form-label" for="rt-lh-c">Hypotenuse c</label>
              <input class="form-input form-input--lg" type="number" id="rt-lh-c" min="0.001" step="any" placeholder="10" value="10">
            </div>
          </div>
        </div>

        <!-- Leg & Angle Form -->
        <div id="rt-form-leg-angle" style="display:none">
          <div class="form-row">
            <div class="form-group">
              <label class="form-label" for="rt-la-a">Leg a</label>
              <input class="form-input form-input--lg" type="number" id="rt-la-a" min="0.001" step="any" placeholder="5" value="5">
            </div>
            <div class="form-group">
              <label class="form-label" for="rt-la-alpha">Angle α (degrees, opposite a)</label>
              <input class="form-input form-input--lg" type="number" id="rt-la-alpha" min="0.001" max="89.999" step="any" placeholder="30" value="30">
            </div>
          </div>
        </div>

        <!-- Hyp & Angle Form -->
        <div id="rt-form-hyp-angle" style="display:none">
          <div class="form-row">
            <div class="form-group">
              <label class="form-label" for="rt-ha-c">Hypotenuse c</label>
              <input class="form-input form-input--lg" type="number" id="rt-ha-c" min="0.001" step="any" placeholder="12" value="12">
            </div>
            <div class="form-group">
              <label class="form-label" for="rt-ha-alpha">Angle α (degrees)</label>
              <input class="form-input form-input--lg" type="number" id="rt-ha-alpha" min="0.001" max="89.999" step="any" placeholder="45" value="45">
            </div>
          </div>
        </div>

        <!-- Area & Leg Form -->
        <div id="rt-form-area-leg" style="display:none">
          <div class="form-row">
            <div class="form-group">
              <label class="form-label" for="rt-al-area">Area (A)</label>
              <input class="form-input form-input--lg" type="number" id="rt-al-area" min="0.001" step="any" placeholder="24" value="24">
            </div>
            <div class="form-group">
              <label class="form-label" for="rt-al-a">Leg a</label>
              <input class="form-input form-input--lg" type="number" id="rt-al-a" min="0.001" step="any" placeholder="6" value="6">
            </div>
          </div>
        </div>

        <button class="btn btn--primary btn--lg" id="rt-calc-btn" style="width:100%" aria-label="Calculate Right Triangle">Calculate Right Triangle</button>

        <!-- Result Box -->
        <div class="result-box result-box--hidden" id="rt-result">
          <div class="result-box__label">Area of Right Triangle</div>
          <div class="result-box__value" id="rt-area-val">—</div>

          <div id="rt-badges-wrap" style="margin-top:.5rem;display:flex;flex-wrap:wrap;gap:.5rem"></div>

          <div class="result-box__sub" id="rt-stats"></div>

          <!-- Trigonometry Ratios Grid -->
          <div style="margin-top:1.25rem;padding:1rem 1.25rem;background:var(--color-surface);border:1px solid var(--color-border);border-radius:10px">
            <div style="font-size:.78rem;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:var(--color-accent);margin-bottom:.75rem">Sides, Angles &amp; Trigonometric Functions</div>
            <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(130px, 1fr));gap:.75rem" id="rt-trig-grid"></div>
          </div>
        </div>

        <!-- How To Use -->
        <div class="how-to" style="margin-top:1.5rem">
          <div class="how-to__title">How to use</div>
          <div class="how-to__body">
            <ol>
              <li>Select your known side or angle combination (Two Legs, Leg &amp; Hypotenuse, Leg &amp; Angle, etc.).</li>
              <li>Enter the positive values. Angles are entered in degrees (&lt; 90°).</li>
              <li>Click <strong>Calculate Right Triangle</strong> to solve for all remaining sides, angles, area, perimeter, and trigonometric ratios (sin, cos, tan).</li>
            </ol>
            <p style="margin-top:.5rem">
              <strong>Core Rules:</strong> <code>a² + b² = c²</code> · <code>α + β = 90°</code> · <code>sin(α) = a/c</code> · <code>cos(α) = b/c</code> · <code>tan(α) = a/b</code>.
            </p>
          </div>
        </div>

      </div>
    </div>
  `;
}

export function calculate(params) {
  const { combo } = params;
  let a, b, c, alpha, beta;

  if (combo === 'two-legs') {
    a = parseFloat(params.a);
    b = parseFloat(params.b);
    if (!a || !b || a <= 0 || b <= 0) return null;
    c = Math.sqrt(a * a + b * b);
    alpha = Math.atan(a / b) * RAD2DEG;
    beta  = 90 - alpha;
  } else if (combo === 'leg-hyp') {
    a = parseFloat(params.a);
    c = parseFloat(params.c);
    if (!a || !c || a <= 0 || c <= 0) return null;
    if (c <= a) return { error: 'Hypotenuse (c) must be strictly greater than Leg (a).' };
    b = Math.sqrt(c * c - a * a);
    alpha = Math.asin(a / c) * RAD2DEG;
    beta  = 90 - alpha;
  } else if (combo === 'leg-angle') {
    a = parseFloat(params.a);
    alpha = parseFloat(params.alpha);
    if (!a || !alpha || a <= 0 || alpha <= 0 || alpha >= 90) return null;
    beta = 90 - alpha;
    b = a / Math.tan(alpha * DEG2RAD);
    c = a / Math.sin(alpha * DEG2RAD);
  } else if (combo === 'hyp-angle') {
    c = parseFloat(params.c);
    alpha = parseFloat(params.alpha);
    if (!c || !alpha || c <= 0 || alpha <= 0 || alpha >= 90) return null;
    beta = 90 - alpha;
    a = c * Math.sin(alpha * DEG2RAD);
    b = c * Math.cos(alpha * DEG2RAD);
  } else if (combo === 'area-leg') {
    const area = parseFloat(params.area);
    a = parseFloat(params.a);
    if (!area || !a || area <= 0 || a <= 0) return null;
    b = (2 * area) / a;
    c = Math.sqrt(a * a + b * b);
    alpha = Math.atan(a / b) * RAD2DEG;
    beta = 90 - alpha;
  } else {
    return null;
  }

  const area = 0.5 * a * b;
  const perimeter = a + b + c;
  const inradius = (a + b - c) / 2;
  const circumradius = c / 2;
  const altitude = (a * b) / c;

  const sinA = a / c;
  const cosA = b / c;
  const tanA = a / b;

  return {
    a: a.toFixed(3),
    b: b.toFixed(3),
    c: c.toFixed(3),
    alpha: alpha.toFixed(2),
    beta: beta.toFixed(2),
    area: area.toFixed(3),
    perimeter: perimeter.toFixed(3),
    inradius: inradius.toFixed(3),
    circumradius: circumradius.toFixed(3),
    altitude: altitude.toFixed(3),
    sinA: sinA.toFixed(4),
    cosA: cosA.toFixed(4),
    tanA: tanA.toFixed(4),
  };
}

export function bindEvents(container) {
  const seg    = container.querySelector('#rt-combo-seg');
  const btn    = container.querySelector('#rt-calc-btn');
  const resBox = container.querySelector('#rt-result');
  const valEl  = container.querySelector('#rt-area-val');
  const badges = container.querySelector('#rt-badges-wrap');
  const stats  = container.querySelector('#rt-stats');
  const grid   = container.querySelector('#rt-trig-grid');
  if (!btn) return;

  let combo = 'two-legs';
  const forms = {
    'two-legs':  container.querySelector('#rt-form-two-legs'),
    'leg-hyp':   container.querySelector('#rt-form-leg-hyp'),
    'leg-angle': container.querySelector('#rt-form-leg-angle'),
    'hyp-angle': container.querySelector('#rt-form-hyp-angle'),
    'area-leg':  container.querySelector('#rt-form-area-leg'),
  };

  if (seg) {
    seg.addEventListener('click', (e) => {
      const b = e.target.closest('[data-combo]');
      if (!b) return;
      combo = b.dataset.combo;
      seg.querySelectorAll('.segment__btn').forEach(x => x.classList.remove('active'));
      b.classList.add('active');

      Object.keys(forms).forEach(k => {
        if (forms[k]) forms[k].style.display = k === combo ? '' : 'none';
      });
    });
  }

  btn.addEventListener('click', () => {
    let params = { combo };
    if (combo === 'two-legs') {
      params.a = container.querySelector('#rt-2l-a').value;
      params.b = container.querySelector('#rt-2l-b').value;
    } else if (combo === 'leg-hyp') {
      params.a = container.querySelector('#rt-lh-a').value;
      params.c = container.querySelector('#rt-lh-c').value;
    } else if (combo === 'leg-angle') {
      params.a = container.querySelector('#rt-la-a').value;
      params.alpha = container.querySelector('#rt-la-alpha').value;
    } else if (combo === 'hyp-angle') {
      params.c = container.querySelector('#rt-ha-c').value;
      params.alpha = container.querySelector('#rt-ha-alpha').value;
    } else if (combo === 'area-leg') {
      params.area = container.querySelector('#rt-al-area').value;
      params.a = container.querySelector('#rt-al-a').value;
    }

    const r = calculate(params);
    if (!r) {
      valEl.textContent = 'Invalid input';
      resBox.classList.remove('result-box--hidden');
      badges.innerHTML = '';
      stats.innerHTML = '';
      grid.innerHTML = '';
      return;
    }

    if (r.error) {
      valEl.textContent = 'Calculation Error';
      resBox.classList.remove('result-box--hidden');
      badges.innerHTML = `<span class="bmi-badge bmi-badge--obese">${r.error}</span>`;
      stats.innerHTML = '';
      grid.innerHTML = '';
      return;
    }

    resBox.classList.remove('result-box--hidden');
    valEl.textContent = parseFloat(r.area).toLocaleString();

    badges.innerHTML = `
      <span class="bmi-badge bmi-badge--normal">Right Triangle (γ = 90°)</span>
      <span class="bmi-badge bmi-badge--normal">α = ${r.alpha}° · β = ${r.beta}°</span>
    `;

    stats.innerHTML = `
      <div class="result-stat"><div class="result-stat__label">Perimeter (P)</div><div class="result-stat__value">${r.perimeter}</div></div>
      <div class="result-stat"><div class="result-stat__label">Altitude to Hypotenuse</div><div class="result-stat__value">${r.altitude}</div></div>
      <div class="result-stat"><div class="result-stat__label">Inradius (r)</div><div class="result-stat__value">${r.inradius}</div></div>
      <div class="result-stat"><div class="result-stat__label">Circumradius (R)</div><div class="result-stat__value">${r.circumradius}</div></div>
    `;

    grid.innerHTML = `
      <div style="background:var(--color-surface-2);border-radius:8px;padding:.6rem .75rem">
        <div style="font-size:.72rem;font-weight:700;color:var(--color-text-muted)">LEG a</div>
        <div style="font-family:var(--font-mono);font-size:1.1rem;font-weight:700;color:var(--color-text)">${r.a}</div>
      </div>
      <div style="background:var(--color-surface-2);border-radius:8px;padding:.6rem .75rem">
        <div style="font-size:.72rem;font-weight:700;color:var(--color-text-muted)">LEG b</div>
        <div style="font-family:var(--font-mono);font-size:1.1rem;font-weight:700;color:var(--color-text)">${r.b}</div>
      </div>
      <div style="background:var(--color-surface-2);border-radius:8px;padding:.6rem .75rem">
        <div style="font-size:.72rem;font-weight:700;color:var(--color-text-muted)">HYPOTENUSE c</div>
        <div style="font-family:var(--font-mono);font-size:1.1rem;font-weight:700;color:var(--color-text)">${r.c}</div>
      </div>
      <div style="background:var(--color-surface-2);border-radius:8px;padding:.6rem .75rem">
        <div style="font-size:.72rem;font-weight:700;color:var(--color-text-muted)">sin(α)</div>
        <div style="font-family:var(--font-mono);font-size:1.1rem;font-weight:700;color:var(--color-text)">${r.sinA}</div>
      </div>
      <div style="background:var(--color-surface-2);border-radius:8px;padding:.6rem .75rem">
        <div style="font-size:.72rem;font-weight:700;color:var(--color-text-muted)">cos(α)</div>
        <div style="font-family:var(--font-mono);font-size:1.1rem;font-weight:700;color:var(--color-text)">${r.cosA}</div>
      </div>
      <div style="background:var(--color-surface-2);border-radius:8px;padding:.6rem .75rem">
        <div style="font-size:.72rem;font-weight:700;color:var(--color-text-muted)">tan(α)</div>
        <div style="font-family:var(--font-mono);font-size:1.1rem;font-weight:700;color:var(--color-text)">${r.tanA}</div>
      </div>
    `;
  });
}
