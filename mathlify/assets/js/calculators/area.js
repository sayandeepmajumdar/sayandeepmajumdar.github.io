/* ============================================================
   AREA.JS — 2D Shape Area Calculator
   Native Mathlify Design System
   ============================================================ */

export function render(container) {
  container.innerHTML = `
    <div class="calc-panel">
      <div class="calc-panel__header">
        <span class="calc-panel__title">Area Calculator</span>
        <div class="segment" id="area-shape-seg" style="overflow-x:auto;max-width:100%">
          <button class="segment__btn active" data-shape="rectangle">Rectangle</button>
          <button class="segment__btn" data-shape="circle">Circle</button>
          <button class="segment__btn" data-shape="triangle">Triangle</button>
          <button class="segment__btn" data-shape="trapezoid">Trapezoid</button>
          <button class="segment__btn" data-shape="parallelogram">Parallelogram</button>
          <button class="segment__btn" data-shape="ellipse">Ellipse</button>
          <button class="segment__btn" data-shape="sector">Sector</button>
        </div>
      </div>
      <div class="calc-panel__body">

        <!-- Rectangle Form -->
        <div id="area-form-rectangle">
          <div class="form-row">
            <div class="form-group">
              <label class="form-label" for="area-rect-l">Length (l)</label>
              <input class="form-input form-input--lg" type="number" id="area-rect-l" min="0.001" step="any" placeholder="8" value="8">
            </div>
            <div class="form-group">
              <label class="form-label" for="area-rect-w">Width (w)</label>
              <input class="form-input form-input--lg" type="number" id="area-rect-w" min="0.001" step="any" placeholder="5" value="5">
            </div>
          </div>
        </div>

        <!-- Circle Form -->
        <div id="area-form-circle" style="display:none">
          <div class="form-group">
            <label class="form-label" for="area-circ-r">Radius (r)</label>
            <input class="form-input form-input--lg" type="number" id="area-circ-r" min="0.001" step="any" placeholder="6" value="6">
          </div>
        </div>

        <!-- Triangle Form -->
        <div id="area-form-triangle" style="display:none">
          <div class="form-row">
            <div class="form-group">
              <label class="form-label" for="area-tri-b">Base (b)</label>
              <input class="form-input form-input--lg" type="number" id="area-tri-b" min="0.001" step="any" placeholder="10" value="10">
            </div>
            <div class="form-group">
              <label class="form-label" for="area-tri-h">Height (h)</label>
              <input class="form-input form-input--lg" type="number" id="area-tri-h" min="0.001" step="any" placeholder="6" value="6">
            </div>
          </div>
        </div>

        <!-- Trapezoid Form -->
        <div id="area-form-trapezoid" style="display:none">
          <div class="form-row--3 form-row">
            <div class="form-group">
              <label class="form-label" for="area-trap-a">Base a</label>
              <input class="form-input form-input--lg" type="number" id="area-trap-a" min="0.001" step="any" placeholder="6" value="6">
            </div>
            <div class="form-group">
              <label class="form-label" for="area-trap-b">Base b</label>
              <input class="form-input form-input--lg" type="number" id="area-trap-b" min="0.001" step="any" placeholder="10" value="10">
            </div>
            <div class="form-group">
              <label class="form-label" for="area-trap-h">Height (h)</label>
              <input class="form-input form-input--lg" type="number" id="area-trap-h" min="0.001" step="any" placeholder="4" value="4">
            </div>
          </div>
        </div>

        <!-- Parallelogram Form -->
        <div id="area-form-parallelogram" style="display:none">
          <div class="form-row">
            <div class="form-group">
              <label class="form-label" for="area-para-b">Base (b)</label>
              <input class="form-input form-input--lg" type="number" id="area-para-b" min="0.001" step="any" placeholder="9" value="9">
            </div>
            <div class="form-group">
              <label class="form-label" for="area-para-h">Height (h)</label>
              <input class="form-input form-input--lg" type="number" id="area-para-h" min="0.001" step="any" placeholder="5" value="5">
            </div>
          </div>
        </div>

        <!-- Ellipse Form -->
        <div id="area-form-ellipse" style="display:none">
          <div class="form-row">
            <div class="form-group">
              <label class="form-label" for="area-ell-a">Semi-Major Axis (a)</label>
              <input class="form-input form-input--lg" type="number" id="area-ell-a" min="0.001" step="any" placeholder="7" value="7">
            </div>
            <div class="form-group">
              <label class="form-label" for="area-ell-b">Semi-Minor Axis (b)</label>
              <input class="form-input form-input--lg" type="number" id="area-ell-b" min="0.001" step="any" placeholder="4" value="4">
            </div>
          </div>
        </div>

        <!-- Sector Form -->
        <div id="area-form-sector" style="display:none">
          <div class="form-row">
            <div class="form-group">
              <label class="form-label" for="area-sec-r">Radius (r)</label>
              <input class="form-input form-input--lg" type="number" id="area-sec-r" min="0.001" step="any" placeholder="6" value="6">
            </div>
            <div class="form-group">
              <label class="form-label" for="area-sec-angle">Central Angle (degrees)</label>
              <input class="form-input form-input--lg" type="number" id="area-sec-angle" min="0.001" max="360" step="any" placeholder="60" value="60">
            </div>
          </div>
        </div>

        <button class="btn btn--primary btn--lg" id="area-calc-btn" style="width:100%" aria-label="Calculate Area">Calculate Area</button>

        <!-- Result Box -->
        <div class="result-box result-box--hidden" id="area-result">
          <div class="result-box__label">Total Area (A)</div>
          <div style="display:flex;align-items:baseline;gap:.5rem;flex-wrap:wrap">
            <div class="result-box__value" id="area-val">—</div>
            <span style="font-size:1.1rem;color:var(--color-text-muted);font-weight:600">square units (u²)</span>
          </div>

          <div id="area-badge-wrap" style="margin-top:.5rem"></div>

          <div class="result-box__sub" id="area-stats"></div>

          <!-- Unit Conversion Grid -->
          <div style="margin-top:1.25rem;padding:1rem 1.25rem;background:var(--color-surface);border:1px solid var(--color-border);border-radius:10px">
            <div style="font-size:.78rem;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:var(--color-accent);margin-bottom:.5rem">Area Unit Equivalents (assuming 1 unit = 1 meter)</div>
            <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(130px, 1fr));gap:.6rem;font-size:.85rem" id="area-conv-grid"></div>
          </div>
        </div>

        <!-- How To Use -->
        <div class="how-to" style="margin-top:1.5rem">
          <div class="how-to__title">How to use</div>
          <div class="how-to__body">
            <ol>
              <li>Select the geometric 2D shape you want to solve for.</li>
              <li>Input dimensions (e.g. length, width, radius, height, or angle).</li>
              <li>Click <strong>Calculate Area</strong> to receive the computed area, perimeter or circumference, and metric/imperial equivalents.</li>
            </ol>
            <p style="margin-top:.5rem">
              <strong>Formulas:</strong> Rectangle: <code>l × w</code> · Circle: <code>πr²</code> · Triangle: <code>½b × h</code> · Trapezoid: <code>½(a + b) × h</code> · Ellipse: <code>π × a × b</code> · Sector: <code>(θ/360) × πr²</code>.
            </p>
          </div>
        </div>

      </div>
    </div>
  `;
}

export function calculate(params) {
  const { shape } = params;
  let area = 0;
  let perimeter = null;
  let formula = '';

  if (shape === 'rectangle') {
    const l = parseFloat(params.l);
    const w = parseFloat(params.w);
    if (!l || !w || l <= 0 || w <= 0) return null;
    area = l * w;
    perimeter = 2 * (l + w);
    formula = `A = ${l} × ${w}`;
  } else if (shape === 'circle') {
    const r = parseFloat(params.r);
    if (!r || r <= 0) return null;
    area = Math.PI * r * r;
    perimeter = 2 * Math.PI * r;
    formula = `A = π × (${r})²`;
  } else if (shape === 'triangle') {
    const b = parseFloat(params.b);
    const h = parseFloat(params.h);
    if (!b || !h || b <= 0 || h <= 0) return null;
    area = 0.5 * b * h;
    formula = `A = ½ × ${b} × ${h}`;
  } else if (shape === 'trapezoid') {
    const a = parseFloat(params.a);
    const b = parseFloat(params.b);
    const h = parseFloat(params.h);
    if (!a || !b || !h || a <= 0 || b <= 0 || h <= 0) return null;
    area = 0.5 * (a + b) * h;
    formula = `A = ½ × (${a} + ${b}) × ${h}`;
  } else if (shape === 'parallelogram') {
    const b = parseFloat(params.b);
    const h = parseFloat(params.h);
    if (!b || !h || b <= 0 || h <= 0) return null;
    area = b * h;
    formula = `A = ${b} × ${h}`;
  } else if (shape === 'ellipse') {
    const a = parseFloat(params.a);
    const b = parseFloat(params.b);
    if (!a || !b || a <= 0 || b <= 0) return null;
    area = Math.PI * a * b;
    // Ramanujan approximation for ellipse perimeter
    perimeter = Math.PI * (3 * (a + b) - Math.sqrt((3 * a + b) * (a + 3 * b)));
    formula = `A = π × ${a} × ${b}`;
  } else if (shape === 'sector') {
    const r = parseFloat(params.r);
    const angle = parseFloat(params.angle);
    if (!r || !angle || r <= 0 || angle <= 0 || angle > 360) return null;
    area = (angle / 360) * Math.PI * r * r;
    const arcLength = (angle / 360) * 2 * Math.PI * r;
    perimeter = arcLength + 2 * r;
    formula = `A = (${angle}/360) × π × (${r})²`;
  } else {
    return null;
  }

  // Assuming 1 unit = 1 meter:
  const sqMeters = area;
  const sqFeet = area * 10.7639;
  const sqInches = area * 1550;
  const acres = area / 4046.86;
  const hectares = area / 10000;

  return {
    area: area.toFixed(4),
    areaFormatted: area >= 10000 ? area.toLocaleString(undefined, { maximumFractionDigits: 3 }) : area.toFixed(4),
    perimeter: perimeter !== null ? perimeter.toFixed(3) : null,
    formula,
    sqMeters: sqMeters.toFixed(3),
    sqFeet: sqFeet.toFixed(2),
    sqInches: sqInches.toFixed(1),
    acres: acres < 0.001 ? acres.toExponential(3) : acres.toFixed(4),
    hectares: hectares < 0.001 ? hectares.toExponential(3) : hectares.toFixed(4),
  };
}

export function bindEvents(container) {
  const seg    = container.querySelector('#area-shape-seg');
  const btn    = container.querySelector('#area-calc-btn');
  const resBox = container.querySelector('#area-result');
  const valEl  = container.querySelector('#area-val');
  const badge  = container.querySelector('#area-badge-wrap');
  const stats  = container.querySelector('#area-stats');
  const grid   = container.querySelector('#area-conv-grid');
  if (!btn) return;

  let shape = 'rectangle';
  const forms = {
    rectangle:     container.querySelector('#area-form-rectangle'),
    circle:        container.querySelector('#area-form-circle'),
    triangle:      container.querySelector('#area-form-triangle'),
    trapezoid:     container.querySelector('#area-form-trapezoid'),
    parallelogram: container.querySelector('#area-form-parallelogram'),
    ellipse:       container.querySelector('#area-form-ellipse'),
    sector:        container.querySelector('#area-form-sector'),
  };

  if (seg) {
    seg.addEventListener('click', (e) => {
      const b = e.target.closest('[data-shape]');
      if (!b) return;
      shape = b.dataset.shape;
      seg.querySelectorAll('.segment__btn').forEach(x => x.classList.remove('active'));
      b.classList.add('active');

      Object.keys(forms).forEach(k => {
        if (forms[k]) forms[k].style.display = k === shape ? '' : 'none';
      });
    });
  }

  btn.addEventListener('click', () => {
    let params = { shape };
    if (shape === 'rectangle') {
      params.l = container.querySelector('#area-rect-l').value;
      params.w = container.querySelector('#area-rect-w').value;
    } else if (shape === 'circle') {
      params.r = container.querySelector('#area-circ-r').value;
    } else if (shape === 'triangle') {
      params.b = container.querySelector('#area-tri-b').value;
      params.h = container.querySelector('#area-tri-h').value;
    } else if (shape === 'trapezoid') {
      params.a = container.querySelector('#area-trap-a').value;
      params.b = container.querySelector('#area-trap-b').value;
      params.h = container.querySelector('#area-trap-h').value;
    } else if (shape === 'parallelogram') {
      params.b = container.querySelector('#area-para-b').value;
      params.h = container.querySelector('#area-para-h').value;
    } else if (shape === 'ellipse') {
      params.a = container.querySelector('#area-ell-a').value;
      params.b = container.querySelector('#area-ell-b').value;
    } else if (shape === 'sector') {
      params.r = container.querySelector('#area-sec-r').value;
      params.angle = container.querySelector('#area-sec-angle').value;
    }

    const r = calculate(params);
    if (!r) {
      valEl.textContent = 'Invalid input';
      resBox.classList.remove('result-box--hidden');
      badge.innerHTML = '';
      stats.innerHTML = '';
      grid.innerHTML = '';
      return;
    }

    resBox.classList.remove('result-box--hidden');
    valEl.textContent = r.areaFormatted;
    badge.innerHTML = `<span class="bmi-badge bmi-badge--normal" style="font-family:var(--font-mono)">${r.formula}</span>`;

    let statsHtml = `
      <div class="result-stat"><div class="result-stat__label">Shape</div><div class="result-stat__value" style="text-transform:capitalize">${shape}</div></div>
    `;
    if (r.perimeter !== null) {
      statsHtml += `
        <div class="result-stat"><div class="result-stat__label">Perimeter / Circumference</div><div class="result-stat__value">${r.perimeter} u</div></div>
      `;
    }
    stats.innerHTML = statsHtml;

    grid.innerHTML = `
      <div style="background:var(--color-surface-2);border-radius:6px;padding:.5rem .75rem">
        <div style="color:var(--color-text-muted);font-size:.75rem">Square Meters (m²)</div>
        <div style="font-weight:700;font-family:var(--font-mono)">${r.sqMeters} m²</div>
      </div>
      <div style="background:var(--color-surface-2);border-radius:6px;padding:.5rem .75rem">
        <div style="color:var(--color-text-muted);font-size:.75rem">Square Feet (ft²)</div>
        <div style="font-weight:700;font-family:var(--font-mono)">${r.sqFeet} ft²</div>
      </div>
      <div style="background:var(--color-surface-2);border-radius:6px;padding:.5rem .75rem">
        <div style="color:var(--color-text-muted);font-size:.75rem">Acres</div>
        <div style="font-weight:700;font-family:var(--font-mono)">${r.acres}</div>
      </div>
      <div style="background:var(--color-surface-2);border-radius:6px;padding:.5rem .75rem">
        <div style="color:var(--color-text-muted);font-size:.75rem">Hectares (ha)</div>
        <div style="font-weight:700;font-family:var(--font-mono)">${r.hectares}</div>
      </div>
    `;
  });
}
