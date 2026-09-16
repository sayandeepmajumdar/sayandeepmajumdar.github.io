/* ============================================================
   DISTANCE.JS — 2D, 3D, and Geographic Distance Calculator
   Native Mathlify Design System
   ============================================================ */

export function render(container) {
  container.innerHTML = `
    <div class="calc-panel">
      <div class="calc-panel__header">
        <span class="calc-panel__title">Distance Calculator</span>
        <div class="segment" id="dist-mode-seg">
          <button class="segment__btn active" data-mode="2d">2D Cartesian</button>
          <button class="segment__btn" data-mode="3d">3D Cartesian</button>
          <button class="segment__btn" data-mode="geo">Geographic (Lat/Lon)</button>
        </div>
      </div>
      <div class="calc-panel__body">

        <!-- 2D Form -->
        <div id="dist-form-2d">
          <div style="font-size:.85rem;font-weight:600;color:var(--color-text-muted);margin-bottom:.5rem">Point 1 (x₁, y₁)</div>
          <div class="form-row">
            <div class="form-group">
              <label class="form-label" for="dist-2d-x1">x₁</label>
              <input class="form-input form-input--lg" type="number" id="dist-2d-x1" step="any" placeholder="1" value="1">
            </div>
            <div class="form-group">
              <label class="form-label" for="dist-2d-y1">y₁</label>
              <input class="form-input form-input--lg" type="number" id="dist-2d-y1" step="any" placeholder="2" value="2">
            </div>
          </div>

          <div style="font-size:.85rem;font-weight:600;color:var(--color-text-muted);margin-bottom:.5rem;margin-top:.25rem">Point 2 (x₂, y₂)</div>
          <div class="form-row">
            <div class="form-group">
              <label class="form-label" for="dist-2d-x2">x₂</label>
              <input class="form-input form-input--lg" type="number" id="dist-2d-x2" step="any" placeholder="7" value="7">
            </div>
            <div class="form-group">
              <label class="form-label" for="dist-2d-y2">y₂</label>
              <input class="form-input form-input--lg" type="number" id="dist-2d-y2" step="any" placeholder="10" value="10">
            </div>
          </div>
        </div>

        <!-- 3D Form -->
        <div id="dist-form-3d" style="display:none">
          <div style="font-size:.85rem;font-weight:600;color:var(--color-text-muted);margin-bottom:.5rem">Point 1 (x₁, y₁, z₁)</div>
          <div class="form-row--3 form-row">
            <div class="form-group">
              <label class="form-label" for="dist-3d-x1">x₁</label>
              <input class="form-input form-input--lg" type="number" id="dist-3d-x1" step="any" placeholder="0" value="0">
            </div>
            <div class="form-group">
              <label class="form-label" for="dist-3d-y1">y₁</label>
              <input class="form-input form-input--lg" type="number" id="dist-3d-y1" step="any" placeholder="0" value="0">
            </div>
            <div class="form-group">
              <label class="form-label" for="dist-3d-z1">z₁</label>
              <input class="form-input form-input--lg" type="number" id="dist-3d-z1" step="any" placeholder="0" value="0">
            </div>
          </div>

          <div style="font-size:.85rem;font-weight:600;color:var(--color-text-muted);margin-bottom:.5rem;margin-top:.25rem">Point 2 (x₂, y₂, z₂)</div>
          <div class="form-row--3 form-row">
            <div class="form-group">
              <label class="form-label" for="dist-3d-x2">x₂</label>
              <input class="form-input form-input--lg" type="number" id="dist-3d-x2" step="any" placeholder="2" value="2">
            </div>
            <div class="form-group">
              <label class="form-label" for="dist-3d-y2">y₂</label>
              <input class="form-input form-input--lg" type="number" id="dist-3d-y2" step="any" placeholder="3" value="3">
            </div>
            <div class="form-group">
              <label class="form-label" for="dist-3d-z2">z₂</label>
              <input class="form-input form-input--lg" type="number" id="dist-3d-z2" step="any" placeholder="6" value="6">
            </div>
          </div>
        </div>

        <!-- Geographic Form -->
        <div id="dist-form-geo" style="display:none">
          <div style="font-size:.85rem;font-weight:600;color:var(--color-text-muted);margin-bottom:.5rem">Coordinate 1 (New Delhi)</div>
          <div class="form-row">
            <div class="form-group">
              <label class="form-label" for="dist-geo-lat1">Latitude 1 (°)</label>
              <input class="form-input form-input--lg" type="number" id="dist-geo-lat1" min="-90" max="90" step="any" placeholder="28.6139" value="28.6139">
            </div>
            <div class="form-group">
              <label class="form-label" for="dist-geo-lon1">Longitude 1 (°)</label>
              <input class="form-input form-input--lg" type="number" id="dist-geo-lon1" min="-180" max="180" step="any" placeholder="77.2090" value="77.2090">
            </div>
          </div>

          <div style="font-size:.85rem;font-weight:600;color:var(--color-text-muted);margin-bottom:.5rem;margin-top:.25rem">Coordinate 2 (Mumbai)</div>
          <div class="form-row">
            <div class="form-group">
              <label class="form-label" for="dist-geo-lat2">Latitude 2 (°)</label>
              <input class="form-input form-input--lg" type="number" id="dist-geo-lat2" min="-90" max="90" step="any" placeholder="19.0760" value="19.0760">
            </div>
            <div class="form-group">
              <label class="form-label" for="dist-geo-lon2">Longitude 2 (°)</label>
              <input class="form-input form-input--lg" type="number" id="dist-geo-lon2" min="-180" max="180" step="any" placeholder="72.8777" value="72.8777">
            </div>
          </div>
        </div>

        <button class="btn btn--primary btn--lg" id="dist-calc-btn" style="width:100%" aria-label="Calculate Distance">Calculate Distance</button>

        <!-- Result Box -->
        <div class="result-box result-box--hidden" id="dist-result">
          <div class="result-box__label">Straight-Line Distance (d)</div>
          <div style="display:flex;align-items:baseline;gap:.5rem;flex-wrap:wrap">
            <div class="result-box__value" id="dist-val">—</div>
            <span id="dist-unit-label" style="font-size:1.1rem;color:var(--color-text-muted);font-weight:600">units</span>
          </div>

          <div id="dist-badge-wrap" style="margin-top:.5rem"></div>

          <div class="result-box__sub" id="dist-stats"></div>
        </div>

        <!-- How To Use -->
        <div class="how-to" style="margin-top:1.5rem">
          <div class="how-to__title">How to use</div>
          <div class="how-to__body">
            <ol>
              <li>Select coordinate mode: <strong>2D Cartesian</strong> (x, y), <strong>3D Cartesian</strong> (x, y, z), or <strong>Geographic</strong> (latitude and longitude).</li>
              <li>Input the coordinates for Point 1 and Point 2.</li>
              <li>Click <strong>Calculate Distance</strong> to compute Euclidean distance, midpoint, and geographic travel distances.</li>
            </ol>
            <p style="margin-top:.5rem">
              <strong>Formulas:</strong> 2D: <code>d = √[(x₂ - x₁)² + (y₂ - y₁)²]</code> · 3D: <code>d = √[(Δx)² + (Δy)² + (Δz)²]</code> · Great-circle: Haversine equation.
            </p>
          </div>
        </div>

      </div>
    </div>
  `;
}

export function calculate(params) {
  const { mode } = params;

  if (mode === '2d') {
    const x1 = parseFloat(params.x1);
    const y1 = parseFloat(params.y1);
    const x2 = parseFloat(params.x2);
    const y2 = parseFloat(params.y2);
    if (isNaN(x1) || isNaN(y1) || isNaN(x2) || isNaN(y2)) return null;

    const dx = x2 - x1;
    const dy = y2 - y1;
    const d = Math.sqrt(dx * dx + dy * dy);
    const midX = (x1 + x2) / 2;
    const midY = (y1 + y2) / 2;
    const manhattan = Math.abs(dx) + Math.abs(dy);

    return {
      d: d.toFixed(4),
      midpoint: `(${midX.toFixed(2)}, ${midY.toFixed(2)})`,
      dx: dx.toFixed(2),
      dy: dy.toFixed(2),
      manhattan: manhattan.toFixed(2),
      formula: `d = √[(${dx})² + (${dy})²] = √${(dx * dx + dy * dy).toFixed(2)}`,
    };
  } else if (mode === '3d') {
    const x1 = parseFloat(params.x1);
    const y1 = parseFloat(params.y1);
    const z1 = parseFloat(params.z1);
    const x2 = parseFloat(params.x2);
    const y2 = parseFloat(params.y2);
    const z2 = parseFloat(params.z2);
    if (isNaN(x1) || isNaN(y1) || isNaN(z1) || isNaN(x2) || isNaN(y2) || isNaN(z2)) return null;

    const dx = x2 - x1;
    const dy = y2 - y1;
    const dz = z2 - z1;
    const sumSq = dx * dx + dy * dy + dz * dz;
    const d = Math.sqrt(sumSq);
    const midX = (x1 + x2) / 2;
    const midY = (y1 + y2) / 2;
    const midZ = (z1 + z2) / 2;

    return {
      d: d.toFixed(4),
      midpoint: `(${midX.toFixed(2)}, ${midY.toFixed(2)}, ${midZ.toFixed(2)})`,
      dx: dx.toFixed(2),
      dy: dy.toFixed(2),
      dz: dz.toFixed(2),
      formula: `d = √[(${dx})² + (${dy})² + (${dz})²] = √${sumSq.toFixed(2)}`,
    };
  } else if (mode === 'geo') {
    const lat1 = parseFloat(params.lat1);
    const lon1 = parseFloat(params.lon1);
    const lat2 = parseFloat(params.lat2);
    const lon2 = parseFloat(params.lon2);
    if (isNaN(lat1) || isNaN(lon1) || isNaN(lat2) || isNaN(lon2)) return null;

    const R = 6371; // Earth radius in km
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const km = R * c;
    const miles = km * 0.621371;
    const nauticalMiles = km * 0.539957;

    // Initial bearing
    const y = Math.sin(dLon) * Math.cos(lat2 * (Math.PI / 180));
    const x = Math.cos(lat1 * (Math.PI / 180)) * Math.sin(lat2 * (Math.PI / 180)) -
              Math.sin(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * Math.cos(dLon);
    let bearing = (Math.atan2(y, x) * (180 / Math.PI) + 360) % 360;

    return {
      km: km.toFixed(2),
      miles: miles.toFixed(2),
      nauticalMiles: nauticalMiles.toFixed(2),
      bearing: bearing.toFixed(1),
      isGeo: true,
    };
  }
  return null;
}

export function bindEvents(container) {
  const seg      = container.querySelector('#dist-mode-seg');
  const btn      = container.querySelector('#dist-calc-btn');
  const resBox   = container.querySelector('#dist-result');
  const valEl    = container.querySelector('#dist-val');
  const unitLbl  = container.querySelector('#dist-unit-label');
  const badge    = container.querySelector('#dist-badge-wrap');
  const stats    = container.querySelector('#dist-stats');
  if (!btn) return;

  let mode = '2d';
  const f2d = container.querySelector('#dist-form-2d');
  const f3d = container.querySelector('#dist-form-3d');
  const fgeo = container.querySelector('#dist-form-geo');

  if (seg) {
    seg.addEventListener('click', (e) => {
      const b = e.target.closest('[data-mode]');
      if (!b) return;
      mode = b.dataset.mode;
      seg.querySelectorAll('.segment__btn').forEach(x => x.classList.remove('active'));
      b.classList.add('active');
      f2d.style.display  = mode === '2d' ? '' : 'none';
      f3d.style.display  = mode === '3d' ? '' : 'none';
      fgeo.style.display = mode === 'geo' ? '' : 'none';
    });
  }

  btn.addEventListener('click', () => {
    let params = { mode };
    if (mode === '2d') {
      params.x1 = container.querySelector('#dist-2d-x1').value;
      params.y1 = container.querySelector('#dist-2d-y1').value;
      params.x2 = container.querySelector('#dist-2d-x2').value;
      params.y2 = container.querySelector('#dist-2d-y2').value;
    } else if (mode === '3d') {
      params.x1 = container.querySelector('#dist-3d-x1').value;
      params.y1 = container.querySelector('#dist-3d-y1').value;
      params.z1 = container.querySelector('#dist-3d-z1').value;
      params.x2 = container.querySelector('#dist-3d-x2').value;
      params.y2 = container.querySelector('#dist-3d-y2').value;
      params.z2 = container.querySelector('#dist-3d-z2').value;
    } else {
      params.lat1 = container.querySelector('#dist-geo-lat1').value;
      params.lon1 = container.querySelector('#dist-geo-lon1').value;
      params.lat2 = container.querySelector('#dist-geo-lat2').value;
      params.lon2 = container.querySelector('#dist-geo-lon2').value;
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

    if (r.isGeo) {
      valEl.textContent = parseFloat(r.km).toLocaleString();
      unitLbl.textContent = 'km (kilometres)';
      badge.innerHTML = `<span class="bmi-badge bmi-badge--normal">Great-Circle Haversine Distance</span>`;
      stats.innerHTML = `
        <div class="result-stat"><div class="result-stat__label">Miles</div><div class="result-stat__value">${parseFloat(r.miles).toLocaleString()} mi</div></div>
        <div class="result-stat"><div class="result-stat__label">Nautical Miles</div><div class="result-stat__value">${parseFloat(r.nauticalMiles).toLocaleString()} NM</div></div>
        <div class="result-stat"><div class="result-stat__label">Initial Compass Bearing</div><div class="result-stat__value">${r.bearing}°</div></div>
      `;
    } else {
      valEl.textContent = r.d;
      unitLbl.textContent = 'units';
      badge.innerHTML = `<span class="bmi-badge bmi-badge--normal" style="font-family:var(--font-mono)">${r.formula}</span>`;

      let statsHtml = `
        <div class="result-stat"><div class="result-stat__label">Midpoint (M)</div><div class="result-stat__value">${r.midpoint}</div></div>
        <div class="result-stat"><div class="result-stat__label">Δx (Change in x)</div><div class="result-stat__value">${r.dx}</div></div>
        <div class="result-stat"><div class="result-stat__label">Δy (Change in y)</div><div class="result-stat__value">${r.dy}</div></div>
      `;
      if (r.dz !== undefined) {
        statsHtml += `<div class="result-stat"><div class="result-stat__label">Δz (Change in z)</div><div class="result-stat__value">${r.dz}</div></div>`;
      }
      if (r.manhattan !== undefined) {
        statsHtml += `<div class="result-stat"><div class="result-stat__label">Manhattan Distance</div><div class="result-stat__value">${r.manhattan}</div></div>`;
      }
      stats.innerHTML = statsHtml;
    }
  });
}
