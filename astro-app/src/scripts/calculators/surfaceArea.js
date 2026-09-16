/* ============================================================
   SURFACEAREA.JS — 3D Geometric Surface Area Calculator
   Native Mathlify Design System
   ============================================================ */

export function render(container) {
  container.innerHTML = `
    <div class="calc-panel">
      <div class="calc-panel__header">
        <span class="calc-panel__title">Surface Area Calculator</span>
        <div class="segment" id="sa-shape-seg" style="overflow-x:auto;max-width:100%">
          <button class="segment__btn active" data-shape="sphere">Sphere</button>
          <button class="segment__btn" data-shape="cylinder">Cylinder</button>
          <button class="segment__btn" data-shape="cone">Cone</button>
          <button class="segment__btn" data-shape="box">Box / Prism</button>
          <button class="segment__btn" data-shape="cube">Cube</button>
          <button class="segment__btn" data-shape="capsule">Capsule</button>
        </div>
      </div>
      <div class="calc-panel__body">

        <!-- Sphere -->
        <div id="sa-form-sphere">
          <div class="form-group">
            <label class="form-label" for="sa-sphere-r">Radius (r)</label>
            <input class="form-input form-input--lg" type="number" id="sa-sphere-r" min="0.001" step="any" placeholder="5" value="5">
          </div>
        </div>

        <!-- Cylinder -->
        <div id="sa-form-cylinder" style="display:none">
          <div class="form-row">
            <div class="form-group">
              <label class="form-label" for="sa-cyl-r">Radius (r)</label>
              <input class="form-input form-input--lg" type="number" id="sa-cyl-r" min="0.001" step="any" placeholder="4" value="4">
            </div>
            <div class="form-group">
              <label class="form-label" for="sa-cyl-h">Height (h)</label>
              <input class="form-input form-input--lg" type="number" id="sa-cyl-h" min="0.001" step="any" placeholder="8" value="8">
            </div>
          </div>
        </div>

        <!-- Cone -->
        <div id="sa-form-cone" style="display:none">
          <div class="form-row">
            <div class="form-group">
              <label class="form-label" for="sa-cone-r">Base Radius (r)</label>
              <input class="form-input form-input--lg" type="number" id="sa-cone-r" min="0.001" step="any" placeholder="3" value="3">
            </div>
            <div class="form-group">
              <label class="form-label" for="sa-cone-h">Height (h)</label>
              <input class="form-input form-input--lg" type="number" id="sa-cone-h" min="0.001" step="any" placeholder="6" value="6">
            </div>
          </div>
        </div>

        <!-- Box -->
        <div id="sa-form-box" style="display:none">
          <div class="form-row--3 form-row">
            <div class="form-group">
              <label class="form-label" for="sa-box-l">Length (l)</label>
              <input class="form-input form-input--lg" type="number" id="sa-box-l" min="0.001" step="any" placeholder="6" value="6">
            </div>
            <div class="form-group">
              <label class="form-label" for="sa-box-w">Width (w)</label>
              <input class="form-input form-input--lg" type="number" id="sa-box-w" min="0.001" step="any" placeholder="4" value="4">
            </div>
            <div class="form-group">
              <label class="form-label" for="sa-box-h">Height (h)</label>
              <input class="form-input form-input--lg" type="number" id="sa-box-h" min="0.001" step="any" placeholder="5" value="5">
            </div>
          </div>
        </div>

        <!-- Cube -->
        <div id="sa-form-cube" style="display:none">
          <div class="form-group">
            <label class="form-label" for="sa-cube-s">Side Length (s)</label>
            <input class="form-input form-input--lg" type="number" id="sa-cube-s" min="0.001" step="any" placeholder="4" value="4">
          </div>
        </div>

        <!-- Capsule -->
        <div id="sa-form-capsule" style="display:none">
          <div class="form-row">
            <div class="form-group">
              <label class="form-label" for="sa-cap-r">Radius (r)</label>
              <input class="form-input form-input--lg" type="number" id="sa-cap-r" min="0.001" step="any" placeholder="3" value="3">
            </div>
            <div class="form-group">
              <label class="form-label" for="sa-cap-h">Cylinder Height (h)</label>
              <input class="form-input form-input--lg" type="number" id="sa-cap-h" min="0.001" step="any" placeholder="8" value="8">
            </div>
          </div>
        </div>

        <button class="btn btn--primary btn--lg" id="sa-calc-btn" style="width:100%" aria-label="Calculate Surface Area">Calculate Surface Area</button>

        <!-- Result Box -->
        <div class="result-box result-box--hidden" id="sa-result">
          <div class="result-box__label">Total Surface Area (SA)</div>
          <div style="display:flex;align-items:baseline;gap:.5rem;flex-wrap:wrap">
            <div class="result-box__value" id="sa-val">—</div>
            <span style="font-size:1.1rem;color:var(--color-text-muted);font-weight:600">square units (u²)</span>
          </div>

          <div id="sa-badge-wrap" style="margin-top:.5rem"></div>

          <div class="result-box__sub" id="sa-stats"></div>
        </div>

        <!-- How To Use -->
        <div class="how-to" style="margin-top:1.5rem">
          <div class="how-to__title">How to use</div>
          <div class="how-to__body">
            <ol>
              <li>Select the 3D shape (Sphere, Cylinder, Cone, Box, Cube, or Capsule).</li>
              <li>Enter required linear dimensions (radius, length, width, height).</li>
              <li>Click <strong>Calculate Surface Area</strong> to determine total area, lateral area, base area, and volume.</li>
            </ol>
            <p style="margin-top:.5rem">
              <strong>Formulas:</strong> Sphere: <code>4πr²</code> · Cylinder: <code>2πr² + 2πrh</code> · Cone: <code>πr(r + √(r² + h²))</code> · Box: <code>2(lw + lh + wh)</code> · Cube: <code>6s²</code>.
            </p>
          </div>
        </div>

      </div>
    </div>
  `;
}

export function calculate(params) {
  const { shape } = params;
  let totalArea = 0, lateralArea = null, baseArea = null, volume = null, formula = '';

  if (shape === 'sphere') {
    const r = parseFloat(params.r);
    if (!r || r <= 0) return null;
    totalArea = 4 * Math.PI * r * r;
    volume = (4 / 3) * Math.PI * Math.pow(r, 3);
    formula = `SA = 4 × π × (${r})²`;
  } else if (shape === 'cylinder') {
    const r = parseFloat(params.r);
    const h = parseFloat(params.h);
    if (!r || !h || r <= 0 || h <= 0) return null;
    baseArea = 2 * (Math.PI * r * r);
    lateralArea = 2 * Math.PI * r * h;
    totalArea = baseArea + lateralArea;
    volume = Math.PI * r * r * h;
    formula = `SA = 2π(${r})² + 2π(${r})(${h})`;
  } else if (shape === 'cone') {
    const r = parseFloat(params.r);
    const h = parseFloat(params.h);
    if (!r || !h || r <= 0 || h <= 0) return null;
    const s = Math.sqrt(r * r + h * h);
    baseArea = Math.PI * r * r;
    lateralArea = Math.PI * r * s;
    totalArea = baseArea + lateralArea;
    volume = (1 / 3) * Math.PI * r * r * h;
    formula = `SA = π(${r})² + π(${r})√[(${r})² + (${h})²]`;
  } else if (shape === 'box') {
    const l = parseFloat(params.l);
    const w = parseFloat(params.w);
    const h = parseFloat(params.h);
    if (!l || !w || !h || l <= 0 || w <= 0 || h <= 0) return null;
    totalArea = 2 * (l * w + l * h + w * h);
    lateralArea = 2 * (l + w) * h;
    baseArea = 2 * (l * w);
    volume = l * w * h;
    formula = `SA = 2(${l}·${w} + ${l}·${h} + ${w}·${h})`;
  } else if (shape === 'cube') {
    const s = parseFloat(params.s);
    if (!s || s <= 0) return null;
    totalArea = 6 * s * s;
    lateralArea = 4 * s * s;
    baseArea = 2 * s * s;
    volume = Math.pow(s, 3);
    formula = `SA = 6 × (${s})²`;
  } else if (shape === 'capsule') {
    const r = parseFloat(params.r);
    const h = parseFloat(params.h);
    if (!r || !h || r <= 0 || h <= 0) return null;
    // 2 hemisphere ends = 1 full sphere (4πr²) + cylindrical tube (2πrh)
    totalArea = 4 * Math.PI * r * r + 2 * Math.PI * r * h;
    volume = (4 / 3) * Math.PI * Math.pow(r, 3) + Math.PI * r * r * h;
    formula = `SA = 4π(${r})² + 2π(${r})(${h})`;
  } else {
    return null;
  }

  return {
    totalArea: totalArea.toFixed(4),
    lateralArea: lateralArea !== null ? lateralArea.toFixed(4) : null,
    baseArea: baseArea !== null ? baseArea.toFixed(4) : null,
    volume: volume !== null ? volume.toFixed(4) : null,
    formula,
  };
}

export function bindEvents(container) {
  const seg    = container.querySelector('#sa-shape-seg');
  const btn    = container.querySelector('#sa-calc-btn');
  const resBox = container.querySelector('#sa-result');
  const valEl  = container.querySelector('#sa-val');
  const badge  = container.querySelector('#sa-badge-wrap');
  const stats  = container.querySelector('#sa-stats');
  if (!btn) return;

  let shape = 'sphere';
  const forms = {
    sphere:   container.querySelector('#sa-form-sphere'),
    cylinder: container.querySelector('#sa-form-cylinder'),
    cone:     container.querySelector('#sa-form-cone'),
    box:      container.querySelector('#sa-form-box'),
    cube:     container.querySelector('#sa-form-cube'),
    capsule:  container.querySelector('#sa-form-capsule'),
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
      params.r = container.querySelector('#sa-sphere-r').value;
    } else if (shape === 'cylinder') {
      params.r = container.querySelector('#sa-cyl-r').value;
      params.h = container.querySelector('#sa-cyl-h').value;
    } else if (shape === 'cone') {
      params.r = container.querySelector('#sa-cone-r').value;
      params.h = container.querySelector('#sa-cone-h').value;
    } else if (shape === 'box') {
      params.l = container.querySelector('#sa-box-l').value;
      params.w = container.querySelector('#sa-box-w').value;
      params.h = container.querySelector('#sa-box-h').value;
    } else if (shape === 'cube') {
      params.s = container.querySelector('#sa-cube-s').value;
    } else if (shape === 'capsule') {
      params.r = container.querySelector('#sa-cap-r').value;
      params.h = container.querySelector('#sa-cap-h').value;
    }

    const r = calculate(params);
    if (!r) {
      valEl.textContent = 'Invalid input';
      resBox.classList.remove('result-box--hidden');
      badge.innerHTML = '';
      stats.innerHTML = '';
      return;
    }

    resBox.classList.remove('result-box--hidden');
    valEl.textContent = parseFloat(r.totalArea).toLocaleString();
    badge.innerHTML = `<span class="bmi-badge bmi-badge--normal" style="font-family:var(--font-mono)">${r.formula}</span>`;

    let statsHtml = `
      <div class="result-stat"><div class="result-stat__label">Shape</div><div class="result-stat__value" style="text-transform:capitalize">${shape}</div></div>
    `;
    if (r.lateralArea !== null) {
      statsHtml += `<div class="result-stat"><div class="result-stat__label">Lateral Area</div><div class="result-stat__value">${r.lateralArea} u²</div></div>`;
    }
    if (r.baseArea !== null) {
      statsHtml += `<div class="result-stat"><div class="result-stat__label">Base Area (Total)</div><div class="result-stat__value">${r.baseArea} u²</div></div>`;
    }
    if (r.volume !== null) {
      statsHtml += `<div class="result-stat"><div class="result-stat__label">Volume</div><div class="result-stat__value">${r.volume} u³</div></div>`;
    }
    stats.innerHTML = statsHtml;
  });
}
