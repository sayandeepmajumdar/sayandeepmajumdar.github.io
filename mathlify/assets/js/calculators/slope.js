/* ============================================================
   SLOPE.JS — Slope & Line Equation Calculator
   Native Mathlify Design System
   ============================================================ */

function toFraction(val, tolerance = 1e-6) {
  if (Math.abs(val - Math.round(val)) < tolerance) return `${Math.round(val)}`;
  let h1 = 1, h2 = 0, k1 = 0, k2 = 1;
  let b = val;
  do {
    let a = Math.floor(b);
    let aux = h1;
    h1 = a * h1 + h2;
    h2 = aux;
    aux = k1;
    k1 = a * k1 + k2;
    k2 = aux;
    b = 1 / (b - a);
  } while (Math.abs(val - h1 / k1) > val * tolerance && k1 < 1000);
  return `${h1}/${k1}`;
}

export function render(container) {
  container.innerHTML = `
    <div class="calc-panel">
      <div class="calc-panel__header">
        <span class="calc-panel__title">Slope Calculator</span>
        <div class="segment" id="slope-mode-seg">
          <button class="segment__btn active" data-mode="points">Two Points (x, y)</button>
          <button class="segment__btn" data-mode="line">Line Equation</button>
        </div>
      </div>
      <div class="calc-panel__body">

        <!-- Two Points Form -->
        <div id="slope-form-points">
          <div style="font-size:.85rem;font-weight:600;color:var(--color-text-muted);margin-bottom:.5rem">Point 1 (x₁, y₁)</div>
          <div class="form-row">
            <div class="form-group">
              <label class="form-label" for="slope-x1">x₁</label>
              <input class="form-input form-input--lg" type="number" id="slope-x1" step="any" placeholder="2" value="2" aria-label="Point 1 x">
            </div>
            <div class="form-group">
              <label class="form-label" for="slope-y1">y₁</label>
              <input class="form-input form-input--lg" type="number" id="slope-y1" step="any" placeholder="3" value="3" aria-label="Point 1 y">
            </div>
          </div>

          <div style="font-size:.85rem;font-weight:600;color:var(--color-text-muted);margin-bottom:.5rem;margin-top:.25rem">Point 2 (x₂, y₂)</div>
          <div class="form-row">
            <div class="form-group">
              <label class="form-label" for="slope-x2">x₂</label>
              <input class="form-input form-input--lg" type="number" id="slope-x2" step="any" placeholder="6" value="6" aria-label="Point 2 x">
            </div>
            <div class="form-group">
              <label class="form-label" for="slope-y2">y₂</label>
              <input class="form-input form-input--lg" type="number" id="slope-y2" step="any" placeholder="11" value="11" aria-label="Point 2 y">
            </div>
          </div>
        </div>

        <!-- Line Equation Form -->
        <div id="slope-form-line" style="display:none">
          <div style="font-size:.85rem;font-weight:600;color:var(--color-text-muted);margin-bottom:.5rem">Standard Form: Ax + By = C</div>
          <div class="form-row--3 form-row">
            <div class="form-group">
              <label class="form-label" for="slope-coeff-a">Coefficient A</label>
              <input class="form-input form-input--lg" type="number" id="slope-coeff-a" step="any" placeholder="2" value="2">
            </div>
            <div class="form-group">
              <label class="form-label" for="slope-coeff-b">Coefficient B</label>
              <input class="form-input form-input--lg" type="number" id="slope-coeff-b" step="any" placeholder="-1" value="-1">
            </div>
            <div class="form-group">
              <label class="form-label" for="slope-coeff-c">Constant C</label>
              <input class="form-input form-input--lg" type="number" id="slope-coeff-c" step="any" placeholder="4" value="4">
            </div>
          </div>
        </div>

        <button class="btn btn--primary btn--lg" id="slope-calc-btn" style="width:100%" aria-label="Calculate Slope">Calculate Slope</button>

        <!-- Result Box -->
        <div class="result-box result-box--hidden" id="slope-result">
          <div class="result-box__label">Slope (m)</div>
          <div style="display:flex;align-items:baseline;gap:.5rem;flex-wrap:wrap">
            <div class="result-box__value" id="slope-val">—</div>
            <span id="slope-frac-val" style="font-size:1.2rem;font-family:var(--font-mono);color:var(--color-text-muted);font-weight:600"></span>
          </div>

          <div id="slope-badges-wrap" style="margin-top:.5rem;display:flex;flex-wrap:wrap;gap:.5rem"></div>

          <div class="result-box__sub" id="slope-stats"></div>

          <!-- Equations & Properties -->
          <div style="margin-top:1.25rem;padding:1rem 1.25rem;background:var(--color-surface);border:1px solid var(--color-border);border-radius:10px" id="slope-eq-box">
            <div style="font-size:.78rem;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:var(--color-accent);margin-bottom:.5rem">Line Equations &amp; Relations</div>
            <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(180px, 1fr));gap:.75rem;font-size:.875rem" id="slope-eq-grid"></div>
          </div>
        </div>

        <!-- How To Use -->
        <div class="how-to" style="margin-top:1.5rem">
          <div class="how-to__title">How to use</div>
          <div class="how-to__body">
            <ol>
              <li>Select <strong>Two Points</strong> mode to enter (x₁, y₁) and (x₂, y₂), or <strong>Line Equation</strong> to enter Ax + By = C.</li>
              <li>Click <strong>Calculate Slope</strong>.</li>
              <li>View the slope in decimal and fraction form, angle of inclination, grade percentage, slope-intercept equation, and perpendicular slope.</li>
            </ol>
            <p style="margin-top:.5rem">
              <strong>Formulas:</strong> Slope <code>m = (y₂ - y₁) / (x₂ - x₁) = Rise / Run</code> · Angle <code>θ = arctan(m)</code> · Grade <code>% = m × 100</code>.
            </p>
          </div>
        </div>

      </div>
    </div>
  `;
}

export function calculate(params) {
  const { mode } = params;
  let m, x1, y1, x2, y2, angleDeg, gradePct, isVertical = false, isHorizontal = false;
  let distance = null, rise = null, run = null, bIntercept = null;

  if (mode === 'points') {
    x1 = parseFloat(params.x1);
    y1 = parseFloat(params.y1);
    x2 = parseFloat(params.x2);
    y2 = parseFloat(params.y2);

    if (isNaN(x1) || isNaN(y1) || isNaN(x2) || isNaN(y2)) return null;

    rise = y2 - y1;
    run  = x2 - x1;
    distance = Math.sqrt(run * run + rise * rise);

    if (Math.abs(run) < 1e-9) {
      if (Math.abs(rise) < 1e-9) {
        return { error: 'Both points are identical. Two distinct points are required to define a unique line.' };
      }
      isVertical = true;
      m = Infinity;
      angleDeg = 90;
      gradePct = Infinity;
    } else if (Math.abs(rise) < 1e-9) {
      isHorizontal = true;
      m = 0;
      angleDeg = 0;
      gradePct = 0;
      bIntercept = y1;
    } else {
      m = rise / run;
      angleDeg = Math.atan(m) * (180 / Math.PI);
      gradePct = m * 100;
      bIntercept = y1 - m * x1;
    }
  } else if (mode === 'line') {
    const A = parseFloat(params.A);
    const B = parseFloat(params.B);
    const C = parseFloat(params.C);

    if (isNaN(A) || isNaN(B) || isNaN(C)) return null;
    if (Math.abs(A) < 1e-9 && Math.abs(B) < 1e-9) {
      return { error: 'Both A and B cannot be zero in Ax + By = C.' };
    }

    if (Math.abs(B) < 1e-9) {
      isVertical = true;
      m = Infinity;
      angleDeg = 90;
      gradePct = Infinity;
      x1 = C / A;
    } else if (Math.abs(A) < 1e-9) {
      isHorizontal = true;
      m = 0;
      angleDeg = 0;
      gradePct = 0;
      bIntercept = C / B;
    } else {
      m = -A / B;
      bIntercept = C / B;
      angleDeg = Math.atan(m) * (180 / Math.PI);
      gradePct = m * 100;
    }
  }

  let perpSlope = null;
  if (!isVertical && !isHorizontal) {
    perpSlope = (-1 / m).toFixed(4);
  } else if (isVertical) {
    perpSlope = '0 (Horizontal)';
  } else {
    perpSlope = 'Undefined (Vertical)';
  }

  return {
    m: isVertical ? 'Undefined' : m.toFixed(4),
    mExact: isVertical ? 'Undefined' : toFraction(m),
    isVertical,
    isHorizontal,
    rise: rise !== null ? rise.toFixed(3) : null,
    run: run !== null ? run.toFixed(3) : null,
    distance: distance !== null ? distance.toFixed(4) : null,
    angleDeg: isVertical ? '90.00' : angleDeg.toFixed(2),
    gradePct: isVertical ? 'Undefined' : Math.abs(gradePct).toFixed(2),
    bIntercept: bIntercept !== null ? bIntercept.toFixed(4) : null,
    perpSlope,
    trend: isVertical ? 'Vertical Line' : (isHorizontal ? 'Horizontal Line' : (m > 0 ? 'Rising Line (Positive Slope)' : 'Falling Line (Negative Slope)')),
  };
}

export function bindEvents(container) {
  const seg      = container.querySelector('#slope-mode-seg');
  const btn      = container.querySelector('#slope-calc-btn');
  const resBox   = container.querySelector('#slope-result');
  const valEl    = container.querySelector('#slope-val');
  const fracEl   = container.querySelector('#slope-frac-val');
  const badges   = container.querySelector('#slope-badges-wrap');
  const stats    = container.querySelector('#slope-stats');
  const eqGrid   = container.querySelector('#slope-eq-grid');
  if (!btn) return;

  let mode = 'points';
  const fPoints = container.querySelector('#slope-form-points');
  const fLine   = container.querySelector('#slope-form-line');

  if (seg) {
    seg.addEventListener('click', (e) => {
      const b = e.target.closest('[data-mode]');
      if (!b) return;
      mode = b.dataset.mode;
      seg.querySelectorAll('.segment__btn').forEach(x => x.classList.remove('active'));
      b.classList.add('active');
      fPoints.style.display = mode === 'points' ? '' : 'none';
      fLine.style.display   = mode === 'line'   ? '' : 'none';
    });
  }

  btn.addEventListener('click', () => {
    let params = { mode };
    if (mode === 'points') {
      params.x1 = container.querySelector('#slope-x1').value;
      params.y1 = container.querySelector('#slope-y1').value;
      params.x2 = container.querySelector('#slope-x2').value;
      params.y2 = container.querySelector('#slope-y2').value;
    } else {
      params.A = container.querySelector('#slope-coeff-a').value;
      params.B = container.querySelector('#slope-coeff-b').value;
      params.C = container.querySelector('#slope-coeff-c').value;
    }

    const r = calculate(params);
    if (!r) {
      valEl.textContent = 'Invalid input';
      resBox.classList.remove('result-box--hidden');
      fracEl.textContent = '';
      badges.innerHTML = '';
      stats.innerHTML = '';
      eqGrid.innerHTML = '';
      return;
    }

    if (r.error) {
      valEl.textContent = 'Error';
      resBox.classList.remove('result-box--hidden');
      fracEl.textContent = '';
      badges.innerHTML = `<span class="bmi-badge bmi-badge--obese">${r.error}</span>`;
      stats.innerHTML = '';
      eqGrid.innerHTML = '';
      return;
    }

    resBox.classList.remove('result-box--hidden');
    valEl.textContent = r.m;
    fracEl.textContent = r.isVertical ? '' : `(${r.mExact})`;

    badges.innerHTML = `
      <span class="bmi-badge bmi-badge--normal">${r.trend}</span>
      <span class="bmi-badge bmi-badge--normal">Inclination: ${r.angleDeg}°</span>
    `;

    stats.innerHTML = `
      <div class="result-stat"><div class="result-stat__label">Angle of Inclination</div><div class="result-stat__value">${r.angleDeg}°</div></div>
      <div class="result-stat"><div class="result-stat__label">Grade / Incline</div><div class="result-stat__value">${r.gradePct}%</div></div>
      ${r.distance ? `<div class="result-stat"><div class="result-stat__label">Point Distance (d)</div><div class="result-stat__value">${r.distance}</div></div>` : ''}
      ${r.rise !== null ? `<div class="result-stat"><div class="result-stat__label">Rise (Δy) / Run (Δx)</div><div class="result-stat__value">${r.rise} / ${r.run}</div></div>` : ''}
    `;

    let slopeIntercept = '';
    if (r.isVertical) {
      slopeIntercept = `x = ${params.x1 || 0}`;
    } else {
      const bSign = parseFloat(r.bIntercept) >= 0 ? `+ ${r.bIntercept}` : `- ${Math.abs(parseFloat(r.bIntercept))}`;
      slopeIntercept = `y = ${r.m}x ${bSign}`;
    }

    eqGrid.innerHTML = `
      <div style="background:var(--color-surface-2);border-radius:8px;padding:.75rem">
        <div style="font-size:.72rem;font-weight:700;color:var(--color-text-muted)">SLOPE-INTERCEPT EQUATION</div>
        <div style="font-family:var(--font-mono);font-weight:700;margin-top:.25rem;color:var(--color-text)">${slopeIntercept}</div>
      </div>
      <div style="background:var(--color-surface-2);border-radius:8px;padding:.75rem">
        <div style="font-size:.72rem;font-weight:700;color:var(--color-text-muted)">PARALLEL LINE SLOPE</div>
        <div style="font-family:var(--font-mono);font-weight:700;margin-top:.25rem;color:var(--color-text)">m∥ = ${r.m}</div>
      </div>
      <div style="background:var(--color-surface-2);border-radius:8px;padding:.75rem">
        <div style="font-size:.72rem;font-weight:700;color:var(--color-text-muted)">PERPENDICULAR LINE SLOPE</div>
        <div style="font-family:var(--font-mono);font-weight:700;margin-top:.25rem;color:var(--color-text)">m⊥ = ${r.perpSlope}</div>
      </div>
    `;
  });
}
