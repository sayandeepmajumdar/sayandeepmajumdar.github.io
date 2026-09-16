/* ============================================================
   TRIANGLE.JS — Comprehensive Triangle Calculator
   Native Mathlify Design System
   ============================================================ */

const DEG2RAD = Math.PI / 180;
const RAD2DEG = 180 / Math.PI;

export function render(container) {
  container.innerHTML = `
    <div class="calc-panel">
      <div class="calc-panel__header">
        <span class="calc-panel__title">Triangle Calculator</span>
        <div class="segment" id="tri-mode-seg">
          <button class="segment__btn active" data-mode="sss" aria-label="Three Sides SSS">SSS (3 Sides)</button>
          <button class="segment__btn" data-mode="sas" aria-label="Side Angle Side SAS">SAS</button>
          <button class="segment__btn" data-mode="asa" aria-label="Angle Side Angle ASA">ASA</button>
          <button class="segment__btn" data-mode="bh" aria-label="Base and Height">Base &amp; Height</button>
        </div>
      </div>
      <div class="calc-panel__body">

        <!-- SSS Inputs -->
        <div id="tri-form-sss">
          <div class="form-row--3 form-row">
            <div class="form-group">
              <label class="form-label" for="tri-sss-a">Side a</label>
              <input class="form-input form-input--lg" type="number" id="tri-sss-a" min="0.001" step="any" placeholder="5" value="5" aria-label="Side a">
            </div>
            <div class="form-group">
              <label class="form-label" for="tri-sss-b">Side b</label>
              <input class="form-input form-input--lg" type="number" id="tri-sss-b" min="0.001" step="any" placeholder="6" value="6" aria-label="Side b">
            </div>
            <div class="form-group">
              <label class="form-label" for="tri-sss-c">Side c</label>
              <input class="form-input form-input--lg" type="number" id="tri-sss-c" min="0.001" step="any" placeholder="7" value="7" aria-label="Side c">
            </div>
          </div>
        </div>

        <!-- SAS Inputs -->
        <div id="tri-form-sas" style="display:none">
          <div class="form-row--3 form-row">
            <div class="form-group">
              <label class="form-label" for="tri-sas-a">Side a</label>
              <input class="form-input form-input--lg" type="number" id="tri-sas-a" min="0.001" step="any" placeholder="5" value="5">
            </div>
            <div class="form-group">
              <label class="form-label" for="tri-sas-gamma">Angle γ (degrees)</label>
              <input class="form-input form-input--lg" type="number" id="tri-sas-gamma" min="0.001" max="179.999" step="any" placeholder="60" value="60">
            </div>
            <div class="form-group">
              <label class="form-label" for="tri-sas-b">Side b</label>
              <input class="form-input form-input--lg" type="number" id="tri-sas-b" min="0.001" step="any" placeholder="7" value="7">
            </div>
          </div>
        </div>

        <!-- ASA Inputs -->
        <div id="tri-form-asa" style="display:none">
          <div class="form-row--3 form-row">
            <div class="form-group">
              <label class="form-label" for="tri-asa-alpha">Angle α (degrees)</label>
              <input class="form-input form-input--lg" type="number" id="tri-asa-alpha" min="0.001" max="179.999" step="any" placeholder="45" value="45">
            </div>
            <div class="form-group">
              <label class="form-label" for="tri-asa-c">Side c</label>
              <input class="form-input form-input--lg" type="number" id="tri-asa-c" min="0.001" step="any" placeholder="10" value="10">
            </div>
            <div class="form-group">
              <label class="form-label" for="tri-asa-beta">Angle β (degrees)</label>
              <input class="form-input form-input--lg" type="number" id="tri-asa-beta" min="0.001" max="179.999" step="any" placeholder="65" value="65">
            </div>
          </div>
        </div>

        <!-- Base & Height Inputs -->
        <div id="tri-form-bh" style="display:none">
          <div class="form-row">
            <div class="form-group">
              <label class="form-label" for="tri-bh-b">Base (b)</label>
              <input class="form-input form-input--lg" type="number" id="tri-bh-b" min="0.001" step="any" placeholder="8" value="8">
            </div>
            <div class="form-group">
              <label class="form-label" for="tri-bh-h">Height (h)</label>
              <input class="form-input form-input--lg" type="number" id="tri-bh-h" min="0.001" step="any" placeholder="5" value="5">
            </div>
          </div>
        </div>

        <button class="btn btn--primary btn--lg" id="tri-calc-btn" style="width:100%" aria-label="Calculate Triangle">Calculate Triangle</button>

        <!-- Result Box -->
        <div class="result-box result-box--hidden" id="tri-result">
          <div class="result-box__label">Area of Triangle</div>
          <div class="result-box__value" id="tri-area-val">—</div>
          <div id="tri-badges-wrap" style="margin-top:.5rem;display:flex;flex-wrap:wrap;gap:.5rem"></div>

          <div class="result-box__sub" id="tri-stats"></div>

          <!-- Sides & Angles Table / Grid -->
          <div style="margin-top:1.25rem;padding:1rem 1.25rem;background:var(--color-surface);border:1px solid var(--color-border);border-radius:10px" id="tri-details-box">
            <div style="font-size:.78rem;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:var(--color-accent);margin-bottom:.75rem">Sides, Angles &amp; Altitudes</div>
            <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(130px, 1fr));gap:.75rem" id="tri-grid-specs"></div>
          </div>
        </div>

        <!-- How To Use -->
        <div class="how-to" style="margin-top:1.5rem">
          <div class="how-to__title">How to use</div>
          <div class="how-to__body">
            <ol>
              <li>Select your input mode: <strong>SSS</strong> (3 sides), <strong>SAS</strong> (two sides and included angle), <strong>ASA</strong> (two angles and included side), or <strong>Base &amp; Height</strong>.</li>
              <li>Enter your measurements in consistent units.</li>
              <li>Click <strong>Calculate Triangle</strong> to compute area, perimeter, all angles, inradius, circumradius, and triangle type.</li>
            </ol>
            <p style="margin-top:.5rem">
              <strong>Formulas:</strong> Area by Heron's formula = <code>√[s(s - a)(s - b)(s - c)]</code> where <code>s = (a + b + c) / 2</code>.
            </p>
          </div>
        </div>

      </div>
    </div>
  `;
}

export function calculate(params) {
  const { mode } = params;
  let a, b, c, alpha, beta, gamma, area, perimeter, s, inradius, circumradius;

  if (mode === 'sss') {
    a = parseFloat(params.a);
    b = parseFloat(params.b);
    c = parseFloat(params.c);
    if (!a || !b || !c || a <= 0 || b <= 0 || c <= 0) return null;
    if (a + b <= c || a + c <= b || b + c <= a) {
      return { error: 'Triangle Inequality violated: The sum of any two sides must be strictly greater than the third side.' };
    }
    s = (a + b + c) / 2;
    area = Math.sqrt(s * (s - a) * (s - b) * (s - c));
    alpha = Math.acos(Math.max(-1, Math.min(1, (b * b + c * c - a * a) / (2 * b * c)))) * RAD2DEG;
    beta  = Math.acos(Math.max(-1, Math.min(1, (a * a + c * c - b * b) / (2 * a * c)))) * RAD2DEG;
    gamma = 180 - alpha - beta;
  } else if (mode === 'sas') {
    a = parseFloat(params.a);
    b = parseFloat(params.b);
    gamma = parseFloat(params.gamma);
    if (!a || !b || !gamma || a <= 0 || b <= 0 || gamma <= 0 || gamma >= 180) return null;
    c = Math.sqrt(a * a + b * b - 2 * a * b * Math.cos(gamma * DEG2RAD));
    s = (a + b + c) / 2;
    area = 0.5 * a * b * Math.sin(gamma * DEG2RAD);
    alpha = Math.acos(Math.max(-1, Math.min(1, (b * b + c * c - a * a) / (2 * b * c)))) * RAD2DEG;
    beta  = 180 - alpha - gamma;
  } else if (mode === 'asa') {
    alpha = parseFloat(params.alpha);
    beta  = parseFloat(params.beta);
    c = parseFloat(params.c);
    if (!alpha || !beta || !c || alpha <= 0 || beta <= 0 || c <= 0 || alpha + beta >= 180) return null;
    gamma = 180 - alpha - beta;
    a = c * Math.sin(alpha * DEG2RAD) / Math.sin(gamma * DEG2RAD);
    b = c * Math.sin(beta * DEG2RAD) / Math.sin(gamma * DEG2RAD);
    s = (a + b + c) / 2;
    area = 0.5 * a * b * Math.sin(gamma * DEG2RAD);
  } else if (mode === 'bh') {
    b = parseFloat(params.b);
    const h = parseFloat(params.h);
    if (!b || !h || b <= 0 || h <= 0) return null;
    area = 0.5 * b * h;
    return {
      area: area.toFixed(4),
      base: b.toFixed(4),
      height: h.toFixed(4),
      isBaseHeightOnly: true,
    };
  }

  perimeter = a + b + c;
  inradius = area / s;
  circumradius = (a * b * c) / (4 * area);

  const ha = (2 * area) / a;
  const hb = (2 * area) / b;
  const hc = (2 * area) / c;

  // Classify by sides
  let sideType = 'Scalene';
  const eps = 1e-4;
  if (Math.abs(a - b) < eps && Math.abs(b - c) < eps) sideType = 'Equilateral';
  else if (Math.abs(a - b) < eps || Math.abs(b - c) < eps || Math.abs(a - c) < eps) sideType = 'Isosceles';

  // Classify by angles
  const maxAngle = Math.max(alpha, beta, gamma);
  let angleType = 'Acute';
  if (Math.abs(maxAngle - 90) < 0.05) angleType = 'Right';
  else if (maxAngle > 90.05) angleType = 'Obtuse';

  return {
    a: a.toFixed(3),
    b: b.toFixed(3),
    c: c.toFixed(3),
    alpha: alpha.toFixed(2),
    beta: beta.toFixed(2),
    gamma: gamma.toFixed(2),
    area: area.toFixed(4),
    perimeter: perimeter.toFixed(3),
    semiPerimeter: s.toFixed(3),
    inradius: inradius.toFixed(3),
    circumradius: circumradius.toFixed(3),
    ha: ha.toFixed(3),
    hb: hb.toFixed(3),
    hc: hc.toFixed(3),
    sideType,
    angleType,
  };
}

export function bindEvents(container) {
  const seg      = container.querySelector('#tri-mode-seg');
  const btn      = container.querySelector('#tri-calc-btn');
  const resBox   = container.querySelector('#tri-result');
  const areaVal  = container.querySelector('#tri-area-val');
  const badges   = container.querySelector('#tri-badges-wrap');
  const stats    = container.querySelector('#tri-stats');
  const grid     = container.querySelector('#tri-grid-specs');
  const dtBox    = container.querySelector('#tri-details-box');
  if (!btn) return;

  let mode = 'sss';
  const forms = {
    sss: container.querySelector('#tri-form-sss'),
    sas: container.querySelector('#tri-form-sas'),
    asa: container.querySelector('#tri-form-asa'),
    bh:  container.querySelector('#tri-form-bh'),
  };

  if (seg) {
    seg.addEventListener('click', (e) => {
      const b = e.target.closest('[data-mode]');
      if (!b) return;
      mode = b.dataset.mode;
      seg.querySelectorAll('.segment__btn').forEach(x => x.classList.remove('active'));
      b.classList.add('active');

      Object.keys(forms).forEach(k => {
        if (forms[k]) forms[k].style.display = k === mode ? '' : 'none';
      });
    });
  }

  btn.addEventListener('click', () => {
    let params = { mode };
    if (mode === 'sss') {
      params.a = container.querySelector('#tri-sss-a').value;
      params.b = container.querySelector('#tri-sss-b').value;
      params.c = container.querySelector('#tri-sss-c').value;
    } else if (mode === 'sas') {
      params.a = container.querySelector('#tri-sas-a').value;
      params.gamma = container.querySelector('#tri-sas-gamma').value;
      params.b = container.querySelector('#tri-sas-b').value;
    } else if (mode === 'asa') {
      params.alpha = container.querySelector('#tri-asa-alpha').value;
      params.c = container.querySelector('#tri-asa-c').value;
      params.beta = container.querySelector('#tri-asa-beta').value;
    } else if (mode === 'bh') {
      params.b = container.querySelector('#tri-bh-b').value;
      params.h = container.querySelector('#tri-bh-h').value;
    }

    const r = calculate(params);
    if (!r) {
      areaVal.textContent = 'Invalid input';
      resBox.classList.remove('result-box--hidden');
      badges.innerHTML = '';
      stats.innerHTML = '';
      if (dtBox) dtBox.style.display = 'none';
      return;
    }

    if (r.error) {
      areaVal.textContent = 'Invalid Triangle';
      resBox.classList.remove('result-box--hidden');
      badges.innerHTML = `<span class="bmi-badge bmi-badge--obese">${r.error}</span>`;
      stats.innerHTML = '';
      if (dtBox) dtBox.style.display = 'none';
      return;
    }

    resBox.classList.remove('result-box--hidden');
    areaVal.textContent = parseFloat(r.area).toLocaleString();

    if (r.isBaseHeightOnly) {
      badges.innerHTML = `<span class="bmi-badge bmi-badge--normal">Base &amp; Height Mode</span>`;
      stats.innerHTML = `
        <div class="result-stat"><div class="result-stat__label">Base</div><div class="result-stat__value">${r.base}</div></div>
        <div class="result-stat"><div class="result-stat__label">Height</div><div class="result-stat__value">${r.height}</div></div>
      `;
      if (dtBox) dtBox.style.display = 'none';
      return;
    }

    if (dtBox) dtBox.style.display = '';
    badges.innerHTML = `
      <span class="bmi-badge bmi-badge--normal">${r.sideType} Triangle</span>
      <span class="bmi-badge ${r.angleType === 'Right' ? 'bmi-badge--over' : 'bmi-badge--normal'}">${r.angleType} Triangle</span>
    `;

    stats.innerHTML = `
      <div class="result-stat"><div class="result-stat__label">Perimeter (P)</div><div class="result-stat__value">${r.perimeter}</div></div>
      <div class="result-stat"><div class="result-stat__label">Semi-Perimeter (s)</div><div class="result-stat__value">${r.semiPerimeter}</div></div>
      <div class="result-stat"><div class="result-stat__label">Inradius (r)</div><div class="result-stat__value">${r.inradius}</div></div>
      <div class="result-stat"><div class="result-stat__label">Circumradius (R)</div><div class="result-stat__value">${r.circumradius}</div></div>
    `;

    grid.innerHTML = `
      <div style="background:var(--color-surface-2);border-radius:8px;padding:.6rem .75rem">
        <div style="font-size:.72rem;font-weight:700;color:var(--color-text-muted)">SIDE a</div>
        <div style="font-family:var(--font-mono);font-size:1.1rem;font-weight:700;color:var(--color-text)">${r.a}</div>
        <div style="font-size:.72rem;color:var(--color-text-muted)">Altitude: ${r.ha}</div>
      </div>
      <div style="background:var(--color-surface-2);border-radius:8px;padding:.6rem .75rem">
        <div style="font-size:.72rem;font-weight:700;color:var(--color-text-muted)">SIDE b</div>
        <div style="font-family:var(--font-mono);font-size:1.1rem;font-weight:700;color:var(--color-text)">${r.b}</div>
        <div style="font-size:.72rem;color:var(--color-text-muted)">Altitude: ${r.hb}</div>
      </div>
      <div style="background:var(--color-surface-2);border-radius:8px;padding:.6rem .75rem">
        <div style="font-size:.72rem;font-weight:700;color:var(--color-text-muted)">SIDE c</div>
        <div style="font-family:var(--font-mono);font-size:1.1rem;font-weight:700;color:var(--color-text)">${r.c}</div>
        <div style="font-size:.72rem;color:var(--color-text-muted)">Altitude: ${r.hc}</div>
      </div>
      <div style="background:var(--color-surface-2);border-radius:8px;padding:.6rem .75rem">
        <div style="font-size:.72rem;font-weight:700;color:var(--color-text-muted)">ANGLE α (A)</div>
        <div style="font-family:var(--font-mono);font-size:1.1rem;font-weight:700;color:var(--color-text)">${r.alpha}°</div>
      </div>
      <div style="background:var(--color-surface-2);border-radius:8px;padding:.6rem .75rem">
        <div style="font-size:.72rem;font-weight:700;color:var(--color-text-muted)">ANGLE β (B)</div>
        <div style="font-family:var(--font-mono);font-size:1.1rem;font-weight:700;color:var(--color-text)">${r.beta}°</div>
      </div>
      <div style="background:var(--color-surface-2);border-radius:8px;padding:.6rem .75rem">
        <div style="font-size:.72rem;font-weight:700;color:var(--color-text-muted)">ANGLE γ (C)</div>
        <div style="font-family:var(--font-mono);font-size:1.1rem;font-weight:700;color:var(--color-text)">${r.gamma}°</div>
      </div>
    `;
  });
}
