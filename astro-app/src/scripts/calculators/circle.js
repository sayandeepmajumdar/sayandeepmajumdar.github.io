/* ============================================================
   CIRCLE.JS — Omnidirectional Circle & Sector Calculator
   Native Mathlify Design System
   ============================================================ */

export function render(container) {
  container.innerHTML = `
    <div class="calc-panel">
      <div class="calc-panel__header">
        <span class="calc-panel__title">Circle Calculator</span>
        <div class="segment" id="circ-given-seg">
          <button class="segment__btn active" data-given="radius">Radius (r)</button>
          <button class="segment__btn" data-given="diameter">Diameter (d)</button>
          <button class="segment__btn" data-given="circumference">Circumference (C)</button>
          <button class="segment__btn" data-given="area">Area (A)</button>
        </div>
      </div>
      <div class="calc-panel__body">

        <div class="form-row">
          <div class="form-group">
            <label class="form-label" id="circ-input-label" for="circ-main-input">Radius (r)</label>
            <input class="form-input form-input--lg" type="number" id="circ-main-input" min="0.001" step="any" placeholder="5" value="5" aria-label="Circle dimension">
          </div>
          <div class="form-group">
            <label class="form-label" for="circ-angle-input">Optional: Central Angle θ (degrees)</label>
            <input class="form-input form-input--lg" type="number" id="circ-angle-input" min="0" max="360" step="any" placeholder="60" value="60" aria-label="Central angle">
          </div>
        </div>

        <button class="btn btn--primary btn--lg" id="circ-calc-btn" style="width:100%" aria-label="Calculate Circle">Calculate Circle</button>

        <!-- Result Box -->
        <div class="result-box result-box--hidden" id="circ-result">
          <div class="result-box__label">Circle Area (A)</div>
          <div style="display:flex;align-items:baseline;gap:.5rem;flex-wrap:wrap">
            <div class="result-box__value" id="circ-area-val">—</div>
            <span id="circ-pi-area" style="font-size:1.15rem;font-family:var(--font-mono);color:var(--color-text-muted);font-weight:600"></span>
          </div>

          <div id="circ-badge-wrap" style="margin-top:.5rem"></div>

          <div class="result-box__sub" id="circ-stats"></div>

          <!-- Sector & Arc specs -->
          <div style="margin-top:1.25rem;padding:1rem 1.25rem;background:var(--color-surface);border:1px solid var(--color-border);border-radius:10px" id="circ-sector-box">
            <div style="font-size:.78rem;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:var(--color-accent);margin-bottom:.5rem">Sector &amp; Arc Measurements</div>
            <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(140px, 1fr));gap:.6rem;font-size:.85rem" id="circ-sector-grid"></div>
          </div>
        </div>

        <!-- How To Use -->
        <div class="how-to" style="margin-top:1.5rem">
          <div class="how-to__title">How to use</div>
          <div class="how-to__body">
            <ol>
              <li>Select your known parameter: <strong>Radius</strong>, <strong>Diameter</strong>, <strong>Circumference</strong>, or <strong>Area</strong>.</li>
              <li>Enter the numerical value. You can also specify an optional <strong>Central Angle θ</strong> to calculate arc length, sector area, and chord length.</li>
              <li>Click <strong>Calculate Circle</strong> to instantly view all properties in both decimal and exact π formats.</li>
            </ol>
            <p style="margin-top:.5rem">
              <strong>Formulas:</strong> <code>d = 2r</code> · <code>C = 2πr = πd</code> · <code>A = πr² = ¼πd²</code> · Arc Length <code>L = (θ/360) × 2πr</code> · Sector Area <code>Aₛ = (θ/360) × πr²</code>.
            </p>
          </div>
        </div>

      </div>
    </div>
  `;
}

export function calculate(params) {
  const { given, value, angle } = params;
  const v = parseFloat(value);
  if (!v || v <= 0) return null;

  let r = 0;
  if (given === 'radius') {
    r = v;
  } else if (given === 'diameter') {
    r = v / 2;
  } else if (given === 'circumference') {
    r = v / (2 * Math.PI);
  } else if (given === 'area') {
    r = Math.sqrt(v / Math.PI);
  } else {
    return null;
  }

  const d = 2 * r;
  const c = 2 * Math.PI * r;
  const a = Math.PI * r * r;

  // Sector calculations if angle provided
  let arcLength = null, sectorArea = null, chordLength = null;
  const deg = parseFloat(angle);
  if (!isNaN(deg) && deg > 0 && deg <= 360) {
    arcLength = (deg / 360) * c;
    sectorArea = (deg / 360) * a;
    chordLength = 2 * r * Math.sin((deg * (Math.PI / 180)) / 2);
  }

  const piArea = (r * r).toFixed(2).replace(/\.00$/, '') + 'π';
  const piCirc = d.toFixed(2).replace(/\.00$/, '') + 'π';

  return {
    radius: r.toFixed(4),
    diameter: d.toFixed(4),
    circumference: c.toFixed(4),
    area: a.toFixed(4),
    piArea,
    piCirc,
    arcLength: arcLength !== null ? arcLength.toFixed(4) : null,
    sectorArea: sectorArea !== null ? sectorArea.toFixed(4) : null,
    chordLength: chordLength !== null ? chordLength.toFixed(4) : null,
    angleDeg: deg || null,
  };
}

export function bindEvents(container) {
  const seg      = container.querySelector('#circ-given-seg');
  const btn      = container.querySelector('#circ-calc-btn');
  const resBox   = container.querySelector('#circ-result');
  const areaVal  = container.querySelector('#circ-area-val');
  const piAreaEl = container.querySelector('#circ-pi-area');
  const badge    = container.querySelector('#circ-badge-wrap');
  const stats    = container.querySelector('#circ-stats');
  const lbl      = container.querySelector('#circ-input-label');
  const inp      = container.querySelector('#circ-main-input');
  const secBox   = container.querySelector('#circ-sector-box');
  const secGrid  = container.querySelector('#circ-sector-grid');
  if (!btn) return;

  let given = 'radius';

  const labels = {
    radius: 'Radius (r)',
    diameter: 'Diameter (d)',
    circumference: 'Circumference (C)',
    area: 'Area (A)',
  };

  if (seg) {
    seg.addEventListener('click', (e) => {
      const b = e.target.closest('[data-given]');
      if (!b) return;
      given = b.dataset.given;
      seg.querySelectorAll('.segment__btn').forEach(x => x.classList.remove('active'));
      b.classList.add('active');
      lbl.textContent = labels[given] || 'Value';
      inp.placeholder = given === 'radius' ? '5' : (given === 'diameter' ? '10' : (given === 'circumference' ? '31.415' : '78.54'));
    });
  }

  btn.addEventListener('click', () => {
    const value = inp.value;
    const angle = container.querySelector('#circ-angle-input').value;

    const r = calculate({ given, value, angle });
    if (!r) {
      areaVal.textContent = 'Invalid input';
      resBox.classList.remove('result-box--hidden');
      piAreaEl.textContent = '';
      badge.innerHTML = '';
      stats.innerHTML = '';
      if (secBox) secBox.style.display = 'none';
      return;
    }

    resBox.classList.remove('result-box--hidden');
    areaVal.textContent = parseFloat(r.area).toLocaleString();
    piAreaEl.textContent = `(= ${r.piArea})`;

    badge.innerHTML = `<span class="bmi-badge bmi-badge--normal">Solved from ${labels[given]}</span>`;

    stats.innerHTML = `
      <div class="result-stat"><div class="result-stat__label">Radius (r)</div><div class="result-stat__value">${r.radius}</div></div>
      <div class="result-stat"><div class="result-stat__label">Diameter (d)</div><div class="result-stat__value">${r.diameter}</div></div>
      <div class="result-stat"><div class="result-stat__label">Circumference (C)</div><div class="result-stat__value">${r.circumference} (${r.piCirc})</div></div>
    `;

    if (r.arcLength !== null && secBox && secGrid) {
      secBox.style.display = '';
      secGrid.innerHTML = `
        <div style="background:var(--color-surface-2);border-radius:6px;padding:.5rem .75rem">
          <div style="color:var(--color-text-muted);font-size:.75rem">Central Angle (θ)</div>
          <div style="font-weight:700;font-family:var(--font-mono)">${r.angleDeg}°</div>
        </div>
        <div style="background:var(--color-surface-2);border-radius:6px;padding:.5rem .75rem">
          <div style="color:var(--color-text-muted);font-size:.75rem">Arc Length (L)</div>
          <div style="font-weight:700;font-family:var(--font-mono)">${r.arcLength}</div>
        </div>
        <div style="background:var(--color-surface-2);border-radius:6px;padding:.5rem .75rem">
          <div style="color:var(--color-text-muted);font-size:.75rem">Sector Area (Aₛ)</div>
          <div style="font-weight:700;font-family:var(--font-mono)">${r.sectorArea}</div>
        </div>
        <div style="background:var(--color-surface-2);border-radius:6px;padding:.5rem .75rem">
          <div style="color:var(--color-text-muted);font-size:.75rem">Chord Length (c)</div>
          <div style="font-weight:700;font-family:var(--font-mono)">${r.chordLength}</div>
        </div>
      `;
    } else if (secBox) {
      secBox.style.display = 'none';
    }
  });
}
