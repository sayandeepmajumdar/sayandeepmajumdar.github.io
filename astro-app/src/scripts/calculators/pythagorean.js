/* ============================================================
   PYTHAGOREAN.JS — Pythagorean Theorem & Triples Calculator
   Native Mathlify Design System
   ============================================================ */

function simplifyRadical(n) {
  if (n <= 0 || !Number.isInteger(n)) return null;
  const sqrtN = Math.sqrt(n);
  if (Number.isInteger(sqrtN)) return `${sqrtN}`;

  let outside = 1;
  let inside = n;

  for (let i = 2; i * i <= inside; i++) {
    while (inside % (i * i) === 0) {
      outside *= i;
      inside /= (i * i);
    }
  }

  if (outside === 1) return `√${n}`;
  return `${outside}√${inside}`;
}

export function render(container) {
  container.innerHTML = `
    <div class="calc-panel">
      <div class="calc-panel__header">
        <span class="calc-panel__title">Pythagorean Theorem</span>
        <div class="segment" id="pyth-mode-seg">
          <button class="segment__btn active" data-mode="find-c">Find Hypotenuse (c)</button>
          <button class="segment__btn" data-mode="find-a">Find Leg (a)</button>
          <button class="segment__btn" data-mode="find-b">Find Leg (b)</button>
          <button class="segment__btn" data-mode="verify">Check Right Triangle</button>
        </div>
      </div>
      <div class="calc-panel__body">

        <!-- Find Hypotenuse Form -->
        <div id="pyth-form-find-c">
          <div class="form-row">
            <div class="form-group">
              <label class="form-label" for="pyth-c-a">Leg a</label>
              <input class="form-input form-input--lg" type="number" id="pyth-c-a" min="0.001" step="any" placeholder="3" value="3" aria-label="Leg a">
            </div>
            <div class="form-group">
              <label class="form-label" for="pyth-c-b">Leg b</label>
              <input class="form-input form-input--lg" type="number" id="pyth-c-b" min="0.001" step="any" placeholder="4" value="4" aria-label="Leg b">
            </div>
          </div>
        </div>

        <!-- Find Leg a Form -->
        <div id="pyth-form-find-a" style="display:none">
          <div class="form-row">
            <div class="form-group">
              <label class="form-label" for="pyth-a-b">Leg b</label>
              <input class="form-input form-input--lg" type="number" id="pyth-a-b" min="0.001" step="any" placeholder="12" value="12">
            </div>
            <div class="form-group">
              <label class="form-label" for="pyth-a-c">Hypotenuse c</label>
              <input class="form-input form-input--lg" type="number" id="pyth-a-c" min="0.001" step="any" placeholder="13" value="13">
            </div>
          </div>
        </div>

        <!-- Find Leg b Form -->
        <div id="pyth-form-find-b" style="display:none">
          <div class="form-row">
            <div class="form-group">
              <label class="form-label" for="pyth-b-a">Leg a</label>
              <input class="form-input form-input--lg" type="number" id="pyth-b-a" min="0.001" step="any" placeholder="8" value="8">
            </div>
            <div class="form-group">
              <label class="form-label" for="pyth-b-c">Hypotenuse c</label>
              <input class="form-input form-input--lg" type="number" id="pyth-b-c" min="0.001" step="any" placeholder="17" value="17">
            </div>
          </div>
        </div>

        <!-- Verify Form -->
        <div id="pyth-form-verify" style="display:none">
          <div class="form-row--3 form-row">
            <div class="form-group">
              <label class="form-label" for="pyth-v-a">Side a</label>
              <input class="form-input form-input--lg" type="number" id="pyth-v-a" min="0.001" step="any" placeholder="5" value="5">
            </div>
            <div class="form-group">
              <label class="form-label" for="pyth-v-b">Side b</label>
              <input class="form-input form-input--lg" type="number" id="pyth-v-b" min="0.001" step="any" placeholder="12" value="12">
            </div>
            <div class="form-group">
              <label class="form-label" for="pyth-v-c">Side c (Longest)</label>
              <input class="form-input form-input--lg" type="number" id="pyth-v-c" min="0.001" step="any" placeholder="13" value="13">
            </div>
          </div>
        </div>

        <button class="btn btn--primary btn--lg" id="pyth-calc-btn" style="width:100%" aria-label="Calculate Pythagorean">Calculate Side</button>

        <!-- Result Box -->
        <div class="result-box result-box--hidden" id="pyth-result">
          <div class="result-box__label" id="pyth-target-label">Hypotenuse (c)</div>
          <div style="display:flex;align-items:baseline;gap:.5rem;flex-wrap:wrap">
            <div class="result-box__value" id="pyth-val">—</div>
            <span id="pyth-radical-val" style="font-size:1.25rem;font-family:var(--font-mono);color:var(--color-text-muted);font-weight:600"></span>
          </div>

          <div id="pyth-badges-wrap" style="margin-top:.5rem;display:flex;flex-wrap:wrap;gap:.5rem"></div>

          <div class="result-box__sub" id="pyth-stats"></div>

          <!-- Step-by-Step Proof / Substitution -->
          <div style="margin-top:1.25rem;padding:1rem 1.25rem;background:var(--color-surface);border:1px solid var(--color-border);border-radius:10px" id="pyth-steps-box">
            <div style="font-size:.78rem;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:var(--color-accent);margin-bottom:.5rem">Algebraic Steps &amp; Substitution</div>
            <div style="display:flex;flex-direction:column;gap:.35rem;font-family:var(--font-mono);font-size:.875rem;color:var(--color-text);line-height:1.6" id="pyth-steps-content"></div>
          </div>
        </div>

        <!-- How To Use -->
        <div class="how-to" style="margin-top:1.5rem">
          <div class="how-to__title">How to use</div>
          <div class="how-to__body">
            <ol>
              <li>Select whether to find the <strong>Hypotenuse (c)</strong>, <strong>Leg (a)</strong>, <strong>Leg (b)</strong>, or <strong>Verify a Right Triangle</strong>.</li>
              <li>Input positive numbers for the known side lengths.</li>
              <li>Click <strong>Calculate Side</strong> to obtain exact radical forms, decimal answers, triangle area, perimeter, and acute angles.</li>
            </ol>
            <p style="margin-top:.5rem">
              <strong>Theorem:</strong> In a right-angled triangle, the square of the hypotenuse is equal to the sum of squares of the other two sides: <code>a² + b² = c²</code>.
            </p>
          </div>
        </div>

      </div>
    </div>
  `;
}

export function calculate(params) {
  const { mode } = params;
  let a, b, c, steps = [];

  if (mode === 'find-c') {
    a = parseFloat(params.a);
    b = parseFloat(params.b);
    if (!a || !b || a <= 0 || b <= 0) return null;
    const a2 = a * a;
    const b2 = b * b;
    const c2 = a2 + b2;
    c = Math.sqrt(c2);

    steps.push(`a² + b² = c²`);
    steps.push(`(${a})² + (${b})² = c²`);
    steps.push(`${a2.toFixed(2)} + ${b2.toFixed(2)} = ${c2.toFixed(2)} = c²`);
    steps.push(`c = √${c2.toFixed(2)} ≈ ${c.toFixed(4)}`);

    const rad = Number.isInteger(c2) ? simplifyRadical(c2) : null;

    return formatResult(a, b, c, 'Hypotenuse (c)', c, rad, steps);
  } else if (mode === 'find-a') {
    b = parseFloat(params.b);
    c = parseFloat(params.c);
    if (!b || !c || b <= 0 || c <= 0) return null;
    if (c <= b) return { error: 'Hypotenuse (c) must be strictly greater than Leg (b).' };

    const c2 = c * c;
    const b2 = b * b;
    const a2 = c2 - b2;
    a = Math.sqrt(a2);

    steps.push(`a² = c² - b²`);
    steps.push(`a² = (${c})² - (${b})²`);
    steps.push(`a² = ${c2.toFixed(2)} - ${b2.toFixed(2)} = ${a2.toFixed(2)}`);
    steps.push(`a = √${a2.toFixed(2)} ≈ ${a.toFixed(4)}`);

    const rad = Number.isInteger(a2) ? simplifyRadical(a2) : null;
    return formatResult(a, b, c, 'Leg (a)', a, rad, steps);
  } else if (mode === 'find-b') {
    a = parseFloat(params.a);
    c = parseFloat(params.c);
    if (!a || !c || a <= 0 || c <= 0) return null;
    if (c <= a) return { error: 'Hypotenuse (c) must be strictly greater than Leg (a).' };

    const c2 = c * c;
    const a2 = a * a;
    const b2 = c2 - a2;
    b = Math.sqrt(b2);

    steps.push(`b² = c² - a²`);
    steps.push(`b² = (${c})² - (${a})²`);
    steps.push(`b² = ${c2.toFixed(2)} - ${a2.toFixed(2)} = ${b2.toFixed(2)}`);
    steps.push(`b = √${b2.toFixed(2)} ≈ ${b.toFixed(4)}`);

    const rad = Number.isInteger(b2) ? simplifyRadical(b2) : null;
    return formatResult(a, b, c, 'Leg (b)', b, rad, steps);
  } else if (mode === 'verify') {
    a = parseFloat(params.a);
    b = parseFloat(params.b);
    c = parseFloat(params.c);
    if (!a || !b || !c || a <= 0 || b <= 0 || c <= 0) return null;

    // Sort to ensure c is longest
    const sides = [a, b, c].sort((x, y) => x - y);
    const s1 = sides[0], s2 = sides[1], hyp = sides[2];
    const sumSq = s1 * s1 + s2 * s2;
    const hypSq = hyp * hyp;
    const diff = Math.abs(sumSq - hypSq);
    const isRight = diff < 1e-4;

    steps.push(`Check if a² + b² = c²`);
    steps.push(`(${s1})² + (${s2})² = ${(s1*s1).toFixed(2)} + ${(s2*s2).toFixed(2)} = ${sumSq.toFixed(2)}`);
    steps.push(`c² = (${hyp})² = ${hypSq.toFixed(2)}`);
    steps.push(isRight ? `Since ${sumSq.toFixed(2)} == ${hypSq.toFixed(2)}, this is a RIGHT TRIANGLE!` : `Since ${sumSq.toFixed(2)} ≠ ${hypSq.toFixed(2)}, this is NOT a right triangle.`);

    return {
      isVerifyOnly: true,
      isRight,
      a: s1.toFixed(3),
      b: s2.toFixed(3),
      c: hyp.toFixed(3),
      steps,
    };
  }
  return null;
}

function formatResult(a, b, c, label, primaryVal, radical, steps) {
  const area = 0.5 * a * b;
  const perimeter = a + b + c;
  const alphaDeg = Math.asin(a / c) * (180 / Math.PI);
  const betaDeg  = 90 - alphaDeg;
  const altitude = (a * b) / c;

  // Check if integer triple
  const isTriple = Number.isInteger(a) && Number.isInteger(b) && Number.isInteger(c);

  return {
    label,
    primaryVal: primaryVal.toFixed(4),
    primaryFormatted: Number.isInteger(primaryVal) ? primaryVal.toString() : primaryVal.toFixed(4),
    radical: radical && radical !== primaryVal.toString() ? `(= ${radical})` : '',
    a: a.toFixed(3),
    b: b.toFixed(3),
    c: c.toFixed(3),
    area: area.toFixed(3),
    perimeter: perimeter.toFixed(3),
    alphaDeg: alphaDeg.toFixed(2),
    betaDeg: betaDeg.toFixed(2),
    altitude: altitude.toFixed(3),
    isTriple,
    steps,
  };
}

export function bindEvents(container) {
  const seg      = container.querySelector('#pyth-mode-seg');
  const btn      = container.querySelector('#pyth-calc-btn');
  const resBox   = container.querySelector('#pyth-result');
  const lblEl    = container.querySelector('#pyth-target-label');
  const valEl    = container.querySelector('#pyth-val');
  const radEl    = container.querySelector('#pyth-radical-val');
  const badges   = container.querySelector('#pyth-badges-wrap');
  const stats    = container.querySelector('#pyth-stats');
  const stepsBox = container.querySelector('#pyth-steps-content');
  if (!btn) return;

  let mode = 'find-c';
  const forms = {
    'find-c': container.querySelector('#pyth-form-find-c'),
    'find-a': container.querySelector('#pyth-form-find-a'),
    'find-b': container.querySelector('#pyth-form-find-b'),
    'verify': container.querySelector('#pyth-form-verify'),
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

      btn.textContent = mode === 'verify' ? 'Check Triangle' : 'Calculate Side';
    });
  }

  btn.addEventListener('click', () => {
    let params = { mode };
    if (mode === 'find-c') {
      params.a = container.querySelector('#pyth-c-a').value;
      params.b = container.querySelector('#pyth-c-b').value;
    } else if (mode === 'find-a') {
      params.b = container.querySelector('#pyth-a-b').value;
      params.c = container.querySelector('#pyth-a-c').value;
    } else if (mode === 'find-b') {
      params.a = container.querySelector('#pyth-b-a').value;
      params.c = container.querySelector('#pyth-b-c').value;
    } else {
      params.a = container.querySelector('#pyth-v-a').value;
      params.b = container.querySelector('#pyth-v-b').value;
      params.c = container.querySelector('#pyth-v-c').value;
    }

    const r = calculate(params);
    if (!r) {
      valEl.textContent = 'Invalid input';
      resBox.classList.remove('result-box--hidden');
      radEl.textContent = '';
      badges.innerHTML = '';
      stats.innerHTML = '';
      stepsBox.innerHTML = '';
      return;
    }

    if (r.error) {
      valEl.textContent = 'Calculation Error';
      resBox.classList.remove('result-box--hidden');
      radEl.textContent = '';
      badges.innerHTML = `<span class="bmi-badge bmi-badge--obese">${r.error}</span>`;
      stats.innerHTML = '';
      stepsBox.innerHTML = '';
      return;
    }

    resBox.classList.remove('result-box--hidden');

    if (r.isVerifyOnly) {
      lblEl.textContent = 'Right Triangle Check';
      valEl.textContent = r.isRight ? 'Valid Right Triangle' : 'Not a Right Triangle';
      radEl.textContent = '';
      badges.innerHTML = `
        <span class="bmi-badge ${r.isRight ? 'bmi-badge--normal' : 'bmi-badge--over'}">${r.isRight ? '✓ Satisfies a² + b² = c²' : '✗ Violates a² + b² = c²'}</span>
      `;
      stats.innerHTML = `
        <div class="result-stat"><div class="result-stat__label">Side a</div><div class="result-stat__value">${r.a}</div></div>
        <div class="result-stat"><div class="result-stat__label">Side b</div><div class="result-stat__value">${r.b}</div></div>
        <div class="result-stat"><div class="result-stat__label">Side c</div><div class="result-stat__value">${r.c}</div></div>
      `;
      stepsBox.innerHTML = r.steps.map(s => `<div>${s}</div>`).join('');
      return;
    }

    lblEl.textContent = r.label;
    valEl.textContent = r.primaryFormatted;
    radEl.textContent = r.radical;

    badges.innerHTML = `
      <span class="bmi-badge bmi-badge--normal">Right Triangle (90°)</span>
      ${r.isTriple ? '<span class="bmi-badge bmi-badge--normal">⭐ Pythagorean Integer Triple</span>' : ''}
    `;

    stats.innerHTML = `
      <div class="result-stat"><div class="result-stat__label">Area (A)</div><div class="result-stat__value">${r.area}</div></div>
      <div class="result-stat"><div class="result-stat__label">Perimeter (P)</div><div class="result-stat__value">${r.perimeter}</div></div>
      <div class="result-stat"><div class="result-stat__label">Angle α (Opposite a)</div><div class="result-stat__value">${r.alphaDeg}°</div></div>
      <div class="result-stat"><div class="result-stat__label">Angle β (Opposite b)</div><div class="result-stat__value">${r.betaDeg}°</div></div>
      <div class="result-stat"><div class="result-stat__label">Altitude to Hypotenuse</div><div class="result-stat__value">${r.altitude}</div></div>
    `;

    stepsBox.innerHTML = r.steps.map(s => `<div>${s}</div>`).join('');
  });
}
