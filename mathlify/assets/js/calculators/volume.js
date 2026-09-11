/* ============================================================
   VOLUME.JS — 3D Shape Volume Calculator
   Native Mathlify Design System
   ============================================================ */

export function render(container) {
  container.innerHTML = `
    <div class="calc-panel">
      <div class="calc-panel__header">
        <span class="calc-panel__title">Volume Calculator</span>
        <div class="segment" id="vol-shape-seg" style="overflow-x:auto;max-width:100%">
          <button class="segment__btn active" data-shape="sphere">Sphere</button>
          <button class="segment__btn" data-shape="cylinder">Cylinder</button>
          <button class="segment__btn" data-shape="cone">Cone</button>
          <button class="segment__btn" data-shape="box">Box / Prism</button>
          <button class="segment__btn" data-shape="cube">Cube</button>
          <button class="segment__btn" data-shape="pyramid">Pyramid</button>
        </div>
      </div>
      <div class="calc-panel__body">

        <!-- Sphere inputs -->
        <div id="vol-form-sphere">
          <div class="form-group">
            <label class="form-label" for="vol-sphere-r">Radius (r)</label>
            <input class="form-input form-input--lg" type="number" id="vol-sphere-r" min="0.001" step="any" placeholder="5" value="5" aria-label="Sphere radius">
          </div>
        </div>

        <!-- Cylinder inputs -->
        <div id="vol-form-cylinder" style="display:none">
          <div class="form-row">
            <div class="form-group">
              <label class="form-label" for="vol-cyl-r">Radius (r)</label>
              <input class="form-input form-input--lg" type="number" id="vol-cyl-r" min="0.001" step="any" placeholder="4" value="4">
            </div>
            <div class="form-group">
              <label class="form-label" for="vol-cyl-h">Height (h)</label>
              <input class="form-input form-input--lg" type="number" id="vol-cyl-h" min="0.001" step="any" placeholder="10" value="10">
            </div>
          </div>
        </div>

        <!-- Cone inputs -->
        <div id="vol-form-cone" style="display:none">
          <div class="form-row">
            <div class="form-group">
              <label class="form-label" for="vol-cone-r">Base Radius (r)</label>
              <input class="form-input form-input--lg" type="number" id="vol-cone-r" min="0.001" step="any" placeholder="3" value="3">
            </div>
            <div class="form-group">
              <label class="form-label" for="vol-cone-h">Height (h)</label>
              <input class="form-input form-input--lg" type="number" id="vol-cone-h" min="0.001" step="any" placeholder="9" value="9">
            </div>
          </div>
        </div>

        <!-- Box / Prism inputs -->
        <div id="vol-form-box" style="display:none">
          <div class="form-row--3 form-row">
            <div class="form-group">
              <label class="form-label" for="vol-box-l">Length (l)</label>
              <input class="form-input form-input--lg" type="number" id="vol-box-l" min="0.001" step="any" placeholder="6" value="6">
            </div>
            <div class="form-group">
              <label class="form-label" for="vol-box-w">Width (w)</label>
              <input class="form-input form-input--lg" type="number" id="vol-box-w" min="0.001" step="any" placeholder="4" value="4">
            </div>
            <div class="form-group">
              <label class="form-label" for="vol-box-h">Height (h)</label>
              <input class="form-input form-input--lg" type="number" id="vol-box-h" min="0.001" step="any" placeholder="5" value="5">
            </div>
          </div>
        </div>

        <!-- Cube inputs -->
        <div id="vol-form-cube" style="display:none">
          <div class="form-group">
            <label class="form-label" for="vol-cube-s">Side Length (s)</label>
            <input class="form-input form-input--lg" type="number" id="vol-cube-s" min="0.001" step="any" placeholder="4" value="4">
          </div>
        </div>

        <!-- Pyramid inputs -->
        <div id="vol-form-pyramid" style="display:none">
          <div class="form-row--3 form-row">
            <div class="form-group">
              <label class="form-label" for="vol-pyr-l">Base Length (l)</label>
              <input class="form-input form-input--lg" type="number" id="vol-pyr-l" min="0.001" step="any" placeholder="6" value="6">
            </div>
            <div class="form-group">
              <label class="form-label" for="vol-pyr-w">Base Width (w)</label>
              <input class="form-input form-input--lg" type="number" id="vol-pyr-w" min="0.001" step="any" placeholder="6" value="6">
            </div>
            <div class="form-group">
              <label class="form-label" for="vol-pyr-h">Height (h)</label>
              <input class="form-input form-input--lg" type="number" id="vol-pyr-h" min="0.001" step="any" placeholder="8" value="8">
            </div>
          </div>
        </div>

        <button class="btn btn--primary btn--lg" id="vol-calc-btn" style="width:100%" aria-label="Calculate Volume">Calculate Volume</button>

        <!-- Result Box -->
        <div class="result-box result-box--hidden" id="vol-result">
          <div class="result-box__label">Total Volume (V)</div>
          <div style="display:flex;align-items:baseline;gap:.5rem;flex-wrap:wrap">
            <div class="result-box__value" id="vol-val">—</div>
            <span style="font-size:1.1rem;color:var(--color-text-muted);font-weight:600">cubic units (u³)</span>
          </div>

          <div id="vol-badge-wrap" style="margin-top:.5rem"></div>

          <div class="result-box__sub" id="vol-stats"></div>

          <!-- Unit Conversion Table -->
          <div style="margin-top:1.25rem;padding:1rem 1.25rem;background:var(--color-surface);border:1px solid var(--color-border);border-radius:10px">
            <div style="font-size:.78rem;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:var(--color-accent);margin-bottom:.5rem">Liquid &amp; Unit Equivalents (assuming 1 unit = 1 cm)</div>
            <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(130px, 1fr));gap:.6rem;font-size:.85rem" id="vol-conv-grid"></div>
          </div>
        </div>

        <!-- How To Use -->
        <div class="how-to" style="margin-top:1.5rem">
          <div class="how-to__title">How to use</div>
          <div class="how-to__body">
            <ol>
              <li>Select your 3D geometric solid (Sphere, Cylinder, Cone, Box, Cube, or Pyramid).</li>
              <li>Input the required dimensions (radius, length, width, or height).</li>
              <li>Click <strong>Calculate Volume</strong> to get exact volume, formulas, and liquid capacity conversions.</li>
            </ol>
            <p style="margin-top:.5rem">
              <strong>Formulas:</strong> Sphere: <code>V = ⁴⁄₃πr³</code> · Cylinder: <code>V = πr²h</code> · Cone: <code>V = ⅓πr²h</code> · Box: <code>V = l·w·h</code> · Cube: <code>V = s³</code> · Pyramid: <code>V = ⅓l·w·h</code>.
            </p>
          </div>
        </div>

      </div>
    </div>
  `;
}

export function calculate(params) {
  const { shape } = params;
  let v = 0;
  let formula = '';
  let surfaceArea = null;

  if (shape === 'sphere') {
    const r = parseFloat(params.r);
    if (!r || r <= 0) return null;
    v = (4 / 3) * Math.PI * Math.pow(r, 3);
    formula = `V = ⁴⁄₃ × π × (${r})³`;
    surfaceArea = 4 * Math.PI * r * r;
  } else if (shape === 'cylinder') {
    const r = parseFloat(params.r);
    const h = parseFloat(params.h);
    if (!r || !h || r <= 0 || h <= 0) return null;
    v = Math.PI * r * r * h;
    formula = `V = π × (${r})² × ${h}`;
    surfaceArea = 2 * Math.PI * r * (r + h);
  } else if (shape === 'cone') {
    const r = parseFloat(params.r);
    const h = parseFloat(params.h);
    if (!r || !h || r <= 0 || h <= 0) return null;
    v = (1 / 3) * Math.PI * r * r * h;
    formula = `V = ⅓ × π × (${r})² × ${h}`;
    const s = Math.sqrt(r * r + h * h);
    surfaceArea = Math.PI * r * (r + s);
  } else if (shape === 'box') {
    const l = parseFloat(params.l);
    const w = parseFloat(params.w);
    const h = parseFloat(params.h);
    if (!l || !w || !h || l <= 0 || w <= 0 || h <= 0) return null;
    v = l * w * h;
    formula = `V = ${l} × ${w} × ${h}`;
    surfaceArea = 2 * (l * w + l * h + w * h);
  } else if (shape === 'cube') {
    const s = parseFloat(params.s);
    if (!s || s <= 0) return null;
    v = Math.pow(s, 3);
    formula = `V = (${s})³`;
    surfaceArea = 6 * s * s;
  } else if (shape === 'pyramid') {
    const l = parseFloat(params.l);
    const w = parseFloat(params.w);
    const h = parseFloat(params.h);
    if (!l || !w || !h || l <= 0 || w <= 0 || h <= 0) return null;
    v = (1 / 3) * l * w * h;
    formula = `V = ⅓ × (${l} × ${w}) × ${h}`;
  } else {
    return null;
  }

  // Assuming 1 unit = 1 cm:
  const ml = v;
  const litres = v / 1000;
  const usGallons = litres * 0.264172;
  const fluidOz = ml * 0.033814;

  return {
    volume: v,
    volumeFormatted: v >= 10000 ? v.toLocaleString(undefined, { maximumFractionDigits: 3 }) : v.toFixed(4),
    formula,
    surfaceArea: surfaceArea ? surfaceArea.toFixed(3) : null,
    litres: litres.toFixed(4),
    ml: ml.toFixed(2),
    usGallons: usGallons.toFixed(4),
    fluidOz: fluidOz.toFixed(2),
  };
}

export function bindEvents(container) {
  const seg    = container.querySelector('#vol-shape-seg');
  const btn    = container.querySelector('#vol-calc-btn');
  const resBox = container.querySelector('#vol-result');
  const valEl  = container.querySelector('#vol-val');
  const badge  = container.querySelector('#vol-badge-wrap');
  const stats  = container.querySelector('#vol-stats');
  const grid   = container.querySelector('#vol-conv-grid');
  if (!btn) return;

  let shape = 'sphere';
  const forms = {
    sphere:   container.querySelector('#vol-form-sphere'),
    cylinder: container.querySelector('#vol-form-cylinder'),
    cone:     container.querySelector('#vol-form-cone'),
    box:      container.querySelector('#vol-form-box'),
    cube:     container.querySelector('#vol-form-cube'),
    pyramid:  container.querySelector('#vol-form-pyramid'),
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
    if (shape === 'sphere') {
      params.r = container.querySelector('#vol-sphere-r').value;
    } else if (shape === 'cylinder') {
      params.r = container.querySelector('#vol-cyl-r').value;
      params.h = container.querySelector('#vol-cyl-h').value;
    } else if (shape === 'cone') {
      params.r = container.querySelector('#vol-cone-r').value;
      params.h = container.querySelector('#vol-cone-h').value;
    } else if (shape === 'box') {
      params.l = container.querySelector('#vol-box-l').value;
      params.w = container.querySelector('#vol-box-w').value;
      params.h = container.querySelector('#vol-box-h').value;
    } else if (shape === 'cube') {
      params.s = container.querySelector('#vol-cube-s').value;
    } else if (shape === 'pyramid') {
      params.l = container.querySelector('#vol-pyr-l').value;
      params.w = container.querySelector('#vol-pyr-w').value;
      params.h = container.querySelector('#vol-pyr-h').value;
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
    valEl.textContent = r.volumeFormatted;
    badge.innerHTML = `<span class="bmi-badge bmi-badge--normal" style="font-family:var(--font-mono)">${r.formula}</span>`;

    let statsHtml = `
      <div class="result-stat"><div class="result-stat__label">Shape</div><div class="result-stat__value" style="text-transform:capitalize">${shape}</div></div>
    `;
    if (r.surfaceArea) {
      statsHtml += `
        <div class="result-stat"><div class="result-stat__label">Surface Area</div><div class="result-stat__value">${r.surfaceArea} u²</div></div>
      `;
    }
    stats.innerHTML = statsHtml;

    grid.innerHTML = `
      <div style="background:var(--color-surface-2);border-radius:6px;padding:.5rem .75rem">
        <div style="color:var(--color-text-muted);font-size:.75rem">Litres (L)</div>
        <div style="font-weight:700;font-family:var(--font-mono)">${r.litres} L</div>
      </div>
      <div style="background:var(--color-surface-2);border-radius:6px;padding:.5rem .75rem">
        <div style="color:var(--color-text-muted);font-size:.75rem">Millilitres (mL / cm³)</div>
        <div style="font-weight:700;font-family:var(--font-mono)">${r.ml} mL</div>
      </div>
      <div style="background:var(--color-surface-2);border-radius:6px;padding:.5rem .75rem">
        <div style="color:var(--color-text-muted);font-size:.75rem">US Gallons (gal)</div>
        <div style="font-weight:700;font-family:var(--font-mono)">${r.usGallons} gal</div>
      </div>
      <div style="background:var(--color-surface-2);border-radius:6px;padding:.5rem .75rem">
        <div style="color:var(--color-text-muted);font-size:.75rem">Fluid Ounces (fl oz)</div>
        <div style="font-weight:700;font-family:var(--font-mono)">${r.fluidOz} fl oz</div>
      </div>
    `;
  });
}
