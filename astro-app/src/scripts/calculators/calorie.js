/* ============================================================
   CALORIE.JS — Calorie & Macro Calculator (ICMR-NIN & Global)
   Native Mathlify Design System Implementation
   ============================================================ */

export function render(container) {
  container.innerHTML = `
    <div class="calc-panel">
      <div class="calc-panel__header">
        <span class="calc-panel__title">Calorie & Macro Calculator</span>
        <div class="segment" id="cal-std-seg">
          <button class="segment__btn active" data-std="icmr" aria-label="Indian ICMR-NIN standard">🇮🇳 ICMR-NIN</button>
          <button class="segment__btn" data-std="global" aria-label="Global standard">🌐 Global</button>
        </div>
      </div>
      <div class="calc-panel__body">

        <!-- Top Toggles: Gender & Unit -->
        <div class="form-row" style="margin-bottom:1.25rem">
          <div class="form-group" style="margin-bottom:0">
            <label class="form-label">Biological Sex</label>
            <div class="segment" id="cal-gender-seg" style="width:100%;margin-bottom:0;display:flex">
              <button class="segment__btn active" data-gender="male" style="flex:1">Male ♂</button>
              <button class="segment__btn" data-gender="female" style="flex:1">Female ♀</button>
            </div>
          </div>
          <div class="form-group" style="margin-bottom:0">
            <label class="form-label">Unit System</label>
            <div class="segment" id="cal-unit-seg" style="width:100%;margin-bottom:0;display:flex">
              <button class="segment__btn active" data-unit="metric" style="flex:1">Metric (kg, cm)</button>
              <button class="segment__btn" data-unit="imperial" style="flex:1">Imperial (lbs, ft)</button>
            </div>
          </div>
        </div>

        <!-- Metric inputs -->
        <div id="cal-metric-wrap">
          <div class="form-row--3 form-row">
            <div class="form-group">
              <label class="form-label" for="cal-age">Age (yrs)</label>
              <input class="form-input form-input--lg" type="number" id="cal-age" min="15" max="100" value="28" placeholder="28" aria-label="Age in years">
            </div>
            <div class="form-group">
              <label class="form-label" for="cal-height-cm">Height (cm)</label>
              <input class="form-input form-input--lg" type="number" id="cal-height-cm" min="100" max="250" value="172" placeholder="172" aria-label="Height in centimeters">
            </div>
            <div class="form-group">
              <label class="form-label" for="cal-weight-kg">Weight (kg)</label>
              <input class="form-input form-input--lg" type="number" id="cal-weight-kg" min="25" max="300" step="0.1" value="68" placeholder="68" aria-label="Weight in kilograms">
            </div>
          </div>
        </div>

        <!-- Imperial inputs -->
        <div id="cal-imperial-wrap" style="display:none">
          <div class="form-row">
            <div class="form-group">
              <label class="form-label" for="cal-age-imp">Age (yrs)</label>
              <input class="form-input form-input--lg" type="number" id="cal-age-imp" min="15" max="100" value="28" placeholder="28" aria-label="Age in years">
            </div>
            <div class="form-group">
              <label class="form-label" for="cal-weight-lbs">Weight (lbs)</label>
              <input class="form-input form-input--lg" type="number" id="cal-weight-lbs" min="50" max="660" step="0.1" value="150" placeholder="150" aria-label="Weight in pounds">
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label class="form-label" for="cal-height-ft">Height (ft)</label>
              <input class="form-input form-input--lg" type="number" id="cal-height-ft" min="3" max="8" value="5" placeholder="5" aria-label="Height feet">
            </div>
            <div class="form-group">
              <label class="form-label" for="cal-height-in">Height (in)</label>
              <input class="form-input form-input--lg" type="number" id="cal-height-in" min="0" max="11" value="8" placeholder="8" aria-label="Height inches">
            </div>
          </div>
        </div>

        <!-- Activity and Goal Selectors -->
        <div class="form-row">
          <div class="form-group">
            <label class="form-label" for="cal-activity">Physical Activity Level</label>
            <select class="form-select" id="cal-activity" aria-label="Activity Level">
              <option value="1.2">Sedentary (Desk job, little or no exercise)</option>
              <option value="1.375">Lightly Active (Exercise 1–3 days/wk)</option>
              <option value="1.55" selected>Moderately Active (Exercise 3–5 days/wk)</option>
              <option value="1.725">Very Active (Hard exercise 6–7 days/wk)</option>
              <option value="1.9">Extra Active (Strenuous physical labor or 2x training)</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label" for="cal-goal">Your Fitness Goal</label>
            <select class="form-select" id="cal-goal" aria-label="Fitness Goal">
              <option value="0">Maintain Weight</option>
              <option value="-250">Mild Fat Loss (-250 kcal/day · ~0.25 kg/wk)</option>
              <option value="-500" selected>Standard Fat Loss (-500 kcal/day · ~0.5 kg/wk)</option>
              <option value="-750">Aggressive Fat Loss (-750 kcal/day · ~0.75 kg/wk)</option>
              <option value="250">Mild Weight Gain (+250 kcal/day · ~0.25 kg/wk)</option>
              <option value="500">Bulking / Muscle Gain (+500 kcal/day · ~0.5 kg/wk)</option>
            </select>
          </div>
        </div>

        <!-- Macro Split Selector -->
        <div class="form-group">
          <label class="form-label" for="cal-macro-preset">Macronutrient Split Ratio</label>
          <select class="form-select" id="cal-macro-preset" aria-label="Macronutrient Split">
            <option value="balanced" selected>Balanced Diet (50% Carbs · 20% Protein · 30% Fat)</option>
            <option value="high_protein">High Protein / Cutting (40% Carbs · 30% Protein · 30% Fat)</option>
            <option value="low_carb">Low Carb / Keto (20% Carbs · 35% Protein · 45% Fat)</option>
            <option value="indian_trad">Traditional Indian Plate (60% Carbs · 15% Protein · 25% Fat)</option>
          </select>
        </div>

        <button class="btn btn--primary btn--lg" id="cal-calc-btn" style="width:100%" aria-label="Calculate Calories & Macros">Calculate Calories &amp; Macros</button>

        <!-- Result Box -->
        <div class="result-box result-box--hidden" id="cal-result">
          <div class="result-box__label">Target Daily Caloric Intake</div>
          <div style="display:flex;align-items:baseline;gap:.5rem;flex-wrap:wrap">
            <div class="result-box__value" id="cal-target-val">—</div>
            <span style="font-size:1.1rem;color:var(--color-text-muted);font-weight:600">kcal / day</span>
          </div>

          <div id="cal-badges-wrap" style="margin-top:.5rem;display:flex;flex-wrap:wrap;gap:.5rem"></div>

          <!-- Sub Metrics (BMR, TDEE, Deficit, Water) -->
          <div class="result-box__sub" id="cal-stats"></div>

          <!-- Macro Breakdown Card -->
          <div style="margin-top:1.5rem;padding:1.25rem;background:var(--color-surface);border:1px solid var(--color-border);border-radius:10px">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:.75rem">
              <span style="font-size:.8rem;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:var(--color-accent)">Daily Macronutrient Split</span>
              <span id="cal-macro-ratio-label" style="font-size:.8rem;font-weight:600;color:var(--color-text-muted)"></span>
            </div>

            <!-- Visual Bar -->
            <div style="height:12px;border-radius:6px;overflow:hidden;display:flex;margin-bottom:1rem;background:var(--color-border)">
              <div id="bar-carb" style="background:#f59e0b;height:100%;transition:width 0.4s ease" title="Carbohydrates"></div>
              <div id="bar-prot" style="background:#3b82f6;height:100%;transition:width 0.4s ease" title="Protein"></div>
              <div id="bar-fat" style="background:#10b981;height:100%;transition:width 0.4s ease" title="Fats"></div>
            </div>

            <!-- Macro Cards Grid -->
            <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(140px, 1fr));gap:.75rem" id="cal-macro-cards">
              <!-- Rendered via JS -->
            </div>
          </div>

          <!-- Asian-Indian BMI Evaluation -->
          <div style="margin-top:1.25rem;padding:1rem 1.25rem;background:var(--color-surface);border:1px solid var(--color-border);border-radius:10px">
            <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:.5rem">
              <div>
                <span style="font-size:.78rem;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:var(--color-text-muted)">Asian-Indian vs WHO BMI</span>
                <div style="font-family:var(--font-mono);font-size:1.25rem;font-weight:700;color:var(--color-text);margin-top:.2rem" id="cal-bmi-num">—</div>
              </div>
              <div id="cal-bmi-badges" style="display:flex;gap:.5rem;flex-wrap:wrap"></div>
            </div>
            <p id="cal-bmi-note" style="font-size:.8rem;color:var(--color-text-muted);margin-top:.5rem;line-height:1.5"></p>
          </div>

          <!-- Indian Food Burn Insight -->
          <div id="cal-burn-insight" style="margin-top:1rem;padding:.875rem 1rem;background:var(--color-surface-2);border-radius:8px;border-left:3px solid var(--color-accent);font-size:.825rem;color:var(--color-text);line-height:1.6">
          </div>
        </div>

        <!-- How To Use -->
        <div class="how-to" style="margin-top:1.5rem">
          <div class="how-to__title">How to use</div>
          <div class="how-to__body">
            <ol>
              <li>Select <strong>Indian (ICMR-NIN)</strong> for South Asian calibrated metabolic rates, or <strong>Global</strong> for Mifflin-St Jeor.</li>
              <li>Input your biological sex, age, height, and weight.</li>
              <li>Select your average daily activity level and weight management goal.</li>
              <li>Choose a macronutrient distribution preset (Balanced, High Protein, Low Carb, or Traditional Indian).</li>
              <li>Click <strong>Calculate Calories &amp; Macros</strong> for comprehensive targets, sub-metrics, and Asian BMI classification.</li>
            </ol>
            <p style="margin-top:.5rem">
              <strong>Tip:</strong> The ICMR-NIN 2020 RDA standard recommends 0.83g of protein per kg of reference body weight for sedentary Indian adults.
            </p>
          </div>
        </div>

      </div>
    </div>
  `;
}

export function calculate({ standard, gender, age, heightCm, weightKg, activity, goalKcal, macroPreset }) {
  if (!age || !heightCm || !weightKg || age <= 0 || heightCm <= 0 || weightKg <= 0) {
    return null;
  }

  // 1. Calculate BMR
  let bmr = 0;
  if (standard === 'icmr') {
    // ICMR-NIN 2020 / Schofield South Asian formula
    if (gender === 'male') {
      if (age < 30) bmr = 14.5 * weightKg + 645;
      else if (age <= 60) bmr = 10.9 * weightKg + 833;
      else bmr = 12.8 * weightKg + 463;
    } else {
      if (age < 30) bmr = 14.0 * weightKg + 471;
      else if (age <= 60) bmr = 8.3 * weightKg + 788;
      else bmr = 10.0 * weightKg + 565;
    }
  } else {
    // Global Mifflin-St Jeor
    if (gender === 'male') {
      bmr = 10 * weightKg + 6.25 * heightCm - 5 * age + 5;
    } else {
      bmr = 10 * weightKg + 6.25 * heightCm - 5 * age - 161;
    }
  }

  // 2. TDEE
  const actMultiplier = parseFloat(activity) || 1.55;
  const tdee = Math.round(bmr * actMultiplier);

  // 3. Target Calories with safe lower floors
  const delta = parseInt(goalKcal, 10) || 0;
  const minFloor = gender === 'female' ? 1200 : 1500;
  const targetKcal = Math.max(minFloor, Math.round(tdee + delta));

  // 4. Macro Splits
  const macroRatios = {
    balanced:     { carbPct: 50, protPct: 20, fatPct: 30, label: '50% Carb · 20% Prot · 30% Fat' },
    high_protein: { carbPct: 40, protPct: 30, fatPct: 30, label: '40% Carb · 30% Prot · 30% Fat' },
    low_carb:     { carbPct: 20, protPct: 35, fatPct: 45, label: '20% Carb · 35% Prot · 45% Fat' },
    indian_trad:  { carbPct: 60, protPct: 15, fatPct: 25, label: '60% Carb · 15% Prot · 25% Fat' },
  };
  const split = macroRatios[macroPreset] || macroRatios.balanced;

  const carbKcal = Math.round((targetKcal * split.carbPct) / 100);
  const carbGrams = Math.round(carbKcal / 4);

  const protKcal = Math.round((targetKcal * split.protPct) / 100);
  const protGrams = Math.round(protKcal / 4);

  const fatKcal = Math.round((targetKcal * split.fatPct) / 100);
  const fatGrams = Math.round(fatKcal / 9);

  const protPerKg = (protGrams / weightKg).toFixed(1);

  // 5. Water recommendation (roughly 35ml per kg + activity bonus)
  const waterLitres = ((weightKg * 35 + (actMultiplier > 1.4 ? 500 : 0)) / 1000).toFixed(1);

  // 6. Asian-Indian BMI
  const heightM = heightCm / 100;
  const bmi = (weightKg / (heightM * heightM)).toFixed(1);
  const bmiNum = parseFloat(bmi);

  let asianCategory = '';
  let asianBadge = '';
  if (bmiNum < 18.5)      { asianCategory = 'Underweight'; asianBadge = 'under'; }
  else if (bmiNum < 23)   { asianCategory = 'Normal Weight'; asianBadge = 'normal'; }
  else if (bmiNum < 25)   { asianCategory = 'Overweight'; asianBadge = 'over'; }
  else                    { asianCategory = 'Obese'; asianBadge = 'obese'; }

  let whoCategory = '';
  if (bmiNum < 18.5)      whoCategory = 'Underweight';
  else if (bmiNum < 25)   whoCategory = 'Normal';
  else if (bmiNum < 30)   whoCategory = 'Overweight';
  else                    whoCategory = 'Obese';

  return {
    bmr: Math.round(bmr),
    tdee,
    targetKcal,
    delta,
    waterLitres,
    split,
    macros: {
      carb: { grams: carbGrams, kcal: carbKcal, pct: split.carbPct },
      prot: { grams: protGrams, kcal: protKcal, pct: split.protPct, perKg: protPerKg },
      fat:  { grams: fatGrams, kcal: fatKcal, pct: split.fatPct },
    },
    bmi,
    asianCategory,
    asianBadge,
    whoCategory,
  };
}

export function bindEvents(container) {
  const stdSeg    = container.querySelector('#cal-std-seg');
  const genderSeg = container.querySelector('#cal-gender-seg');
  const unitSeg   = container.querySelector('#cal-unit-seg');

  const metricWrap = container.querySelector('#cal-metric-wrap');
  const impWrap    = container.querySelector('#cal-imperial-wrap');

  const calcBtn   = container.querySelector('#cal-calc-btn');
  const resultBox = container.querySelector('#cal-result');
  const targetVal = container.querySelector('#cal-target-val');
  const badgesBox = container.querySelector('#cal-badges-wrap');
  const statsBox  = container.querySelector('#cal-stats');

  const barCarb   = container.querySelector('#bar-carb');
  const barProt   = container.querySelector('#bar-prot');
  const barFat    = container.querySelector('#bar-fat');
  const macroRatioLabel = container.querySelector('#cal-macro-ratio-label');
  const macroCardsBox   = container.querySelector('#cal-macro-cards');

  const bmiNumEl   = container.querySelector('#cal-bmi-num');
  const bmiBadges  = container.querySelector('#cal-bmi-badges');
  const bmiNote    = container.querySelector('#cal-bmi-note');
  const burnBox    = container.querySelector('#cal-burn-insight');

  if (!calcBtn) return;

  let standard = 'icmr';
  let gender = 'male';
  let unit = 'metric';

  // Standard Segment
  if (stdSeg) {
    stdSeg.addEventListener('click', (e) => {
      const b = e.target.closest('[data-std]');
      if (!b) return;
      standard = b.dataset.std;
      stdSeg.querySelectorAll('.segment__btn').forEach(x => x.classList.remove('active'));
      b.classList.add('active');
    });
  }

  // Gender Segment
  if (genderSeg) {
    genderSeg.addEventListener('click', (e) => {
      const b = e.target.closest('[data-gender]');
      if (!b) return;
      gender = b.dataset.gender;
      genderSeg.querySelectorAll('.segment__btn').forEach(x => x.classList.remove('active'));
      b.classList.add('active');
    });
  }

  // Unit Segment
  if (unitSeg) {
    unitSeg.addEventListener('click', (e) => {
      const b = e.target.closest('[data-unit]');
      if (!b) return;
      unit = b.dataset.unit;
      unitSeg.querySelectorAll('.segment__btn').forEach(x => x.classList.remove('active'));
      b.classList.add('active');

      if (unit === 'metric') {
        metricWrap.style.display = '';
        impWrap.style.display = 'none';
      } else {
        metricWrap.style.display = 'none';
        impWrap.style.display = '';
      }
    });
  }

  // Calculate Action
  calcBtn.addEventListener('click', () => {
    let age, heightCm, weightKg;

    if (unit === 'metric') {
      age = parseInt(container.querySelector('#cal-age').value, 10);
      heightCm = parseFloat(container.querySelector('#cal-height-cm').value);
      weightKg = parseFloat(container.querySelector('#cal-weight-kg').value);
    } else {
      age = parseInt(container.querySelector('#cal-age-imp').value, 10);
      const lbs = parseFloat(container.querySelector('#cal-weight-lbs').value);
      const ft  = parseFloat(container.querySelector('#cal-height-ft').value) || 0;
      const inc = parseFloat(container.querySelector('#cal-height-in').value) || 0;
      weightKg = lbs * 0.453592;
      heightCm = (ft * 12 + inc) * 2.54;
    }

    const activity    = container.querySelector('#cal-activity').value;
    const goalKcal    = container.querySelector('#cal-goal').value;
    const macroPreset = container.querySelector('#cal-macro-preset').value;

    const res = calculate({ standard, gender, age, heightCm, weightKg, activity, goalKcal, macroPreset });
    if (!res) {
      targetVal.textContent = 'Invalid input';
      resultBox.classList.remove('result-box--hidden');
      return;
    }

    resultBox.classList.remove('result-box--hidden');
    targetVal.textContent = res.targetKcal.toLocaleString('en-IN');

    // Badges: Standard + Goal
    const stdLabel = standard === 'icmr' ? '🇮🇳 ICMR-NIN 2020 RDA' : '🌐 Mifflin-St Jeor';
    let goalLabel = 'Maintain Weight';
    if (res.delta < 0) goalLabel = `${Math.abs(res.delta)} kcal Deficit`;
    else if (res.delta > 0) goalLabel = `+${res.delta} kcal Surplus`;

    badgesBox.innerHTML = `
      <span class="bmi-badge bmi-badge--normal" style="margin-top:0">${stdLabel}</span>
      <span class="bmi-badge ${res.delta < 0 ? 'bmi-badge--over' : 'bmi-badge--normal'}" style="margin-top:0">${goalLabel}</span>
    `;

    // Sub metrics (BMR, TDEE, Adjustment, Water)
    const diffSign = res.delta > 0 ? `+${res.delta}` : (res.delta < 0 ? `${res.delta}` : '0');
    statsBox.innerHTML = `
      <div class="result-stat">
        <div class="result-stat__label">Basal Metabolic Rate (BMR)</div>
        <div class="result-stat__value">${res.bmr.toLocaleString()} kcal</div>
      </div>
      <div class="result-stat">
        <div class="result-stat__label">Maintenance (TDEE)</div>
        <div class="result-stat__value">${res.tdee.toLocaleString()} kcal</div>
      </div>
      <div class="result-stat">
        <div class="result-stat__label">Daily Adjustment</div>
        <div class="result-stat__value">${diffSign} kcal</div>
      </div>
      <div class="result-stat">
        <div class="result-stat__label">Hydration Target</div>
        <div class="result-stat__value">~${res.waterLitres} L / day</div>
      </div>
    `;

    // Visual Bar
    barCarb.style.width = res.split.carbPct + '%';
    barProt.style.width = res.split.protPct + '%';
    barFat.style.width  = res.split.fatPct + '%';
    macroRatioLabel.textContent = res.split.label;

    // Macro Cards
    macroCardsBox.innerHTML = `
      <div style="background:var(--color-surface-2);border-radius:8px;padding:.75rem;border-left:3px solid #f59e0b">
        <div style="font-size:.75rem;font-weight:700;color:var(--color-text-muted);text-transform:uppercase">Carbohydrates</div>
        <div style="font-family:var(--font-mono);font-size:1.3rem;font-weight:700;color:var(--color-text);margin-top:.2rem">${res.macros.carb.grams}g</div>
        <div style="font-size:.78rem;color:var(--color-text-muted);margin-top:.15rem">${res.macros.carb.kcal} kcal (${res.macros.carb.pct}%)</div>
      </div>

      <div style="background:var(--color-surface-2);border-radius:8px;padding:.75rem;border-left:3px solid #3b82f6">
        <div style="font-size:.75rem;font-weight:700;color:var(--color-text-muted);text-transform:uppercase">Protein</div>
        <div style="font-family:var(--font-mono);font-size:1.3rem;font-weight:700;color:var(--color-text);margin-top:.2rem">${res.macros.prot.grams}g</div>
        <div style="font-size:.78rem;color:var(--color-text-muted);margin-top:.15rem">${res.macros.prot.kcal} kcal (${res.macros.prot.perKg}g/kg)</div>
      </div>

      <div style="background:var(--color-surface-2);border-radius:8px;padding:.75rem;border-left:3px solid #10b981">
        <div style="font-size:.75rem;font-weight:700;color:var(--color-text-muted);text-transform:uppercase">Fats</div>
        <div style="font-family:var(--font-mono);font-size:1.3rem;font-weight:700;color:var(--color-text);margin-top:.2rem">${res.macros.fat.grams}g</div>
        <div style="font-size:.78rem;color:var(--color-text-muted);margin-top:.15rem">${res.macros.fat.kcal} kcal (${res.macros.fat.pct}%)</div>
      </div>
    `;

    // Asian-Indian BMI Evaluation
    bmiNumEl.textContent = `BMI ${res.bmi}`;
    bmiBadges.innerHTML = `
      <span class="bmi-badge bmi-badge--${res.asianBadge}" style="margin-top:0">Asian: ${res.asianCategory}</span>
      <span class="bmi-badge bmi-badge--normal" style="margin-top:0">WHO: ${res.whoCategory}</span>
    `;

    if (parseFloat(res.bmi) >= 23 && parseFloat(res.bmi) < 25) {
      bmiNote.innerHTML = `⚠️ <strong>Attention:</strong> While WHO classifies BMI 23.0–24.9 as "Normal", Indian Health Ministry &amp; ICMR guidelines classify BMI ≥ 23 as <strong>Overweight</strong> due to higher visceral fat prevalence in South Asian populations.`;
    } else {
      bmiNote.textContent = `Asian-Indian cutoff: Normal (18.5–22.9), Overweight (23–24.9), Obese (≥25). Reference protein RDA for ${weightKg.toFixed(0)} kg is ${(weightKg * 0.83).toFixed(1)}g/day.`;
    }

    // Food Burn Context
    const walkMins = Math.round((260 / (weightKg * 3.5)) * 60);
    const samosas = (Math.abs(res.delta) / 260).toFixed(1);
    if (res.delta < 0) {
      burnBox.innerHTML = `💡 <strong>Indian Food Context:</strong> Your daily calorie deficit of <strong>${Math.abs(res.delta)} kcal</strong> is roughly equal to skipping <strong>${samosas} Punjabi Samosas</strong> (260 kcal each) or burning off <strong>${walkMins} minutes</strong> of brisk walking for your current weight.`;
    } else if (res.delta > 0) {
      burnBox.innerHTML = `💡 <strong>Indian Food Context:</strong> Your target calorie surplus of <strong>+${res.delta} kcal</strong> provides the clean energy needed for lean tissue growth. Aim for whole protein sources like Paneer, Dal, Soya Chunks, Greek Curd, or Eggs.`;
    } else {
      burnBox.innerHTML = `💡 <strong>Indian Food Context:</strong> Eating at your maintenance level of <strong>${res.tdee.toLocaleString()} kcal</strong> preserves your metabolic rate and sustains lean muscle mass over the long term.`;
    }
  });
}
