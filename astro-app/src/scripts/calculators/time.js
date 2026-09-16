/* ============================================================
   TIME.JS — Time Calculator
   Features:
   1. Add / Subtract Durations (Days, Hours, Minutes, Seconds)
   2. Add / Subtract Duration from a Date & Time
   3. Calculate Elapsed Duration Between Two Dates/Times
   ============================================================ */

export function render(container) {
  const now = new Date();
  const todayStr = now.toISOString().slice(0, 10);
  const currentHour = now.getHours();
  const currentMin = now.getMinutes();
  const currentSec = now.getSeconds();

  container.innerHTML = `
    <div class="calc-panel">
      <div class="calc-panel__header" style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:.5rem">
        <span class="calc-panel__title" style="display:flex;align-items:center;gap:.5rem">
          <span style="font-size:1.25rem">⏱️</span>
          <span>Time Calculator</span>
        </span>
      </div>

      <div class="calc-panel__body">
        <!-- Mode Switcher Tabs -->
        <div class="segment" style="width:100%;margin-bottom:1.5rem;display:flex;flex-wrap:wrap">
          <button type="button" class="segment__btn active" data-tab="tab-duration" style="flex:1">Add / Subtract Time</button>
          <button type="button" class="segment__btn" data-tab="tab-date" style="flex:1">Time From Date</button>
          <button type="button" class="segment__btn" data-tab="tab-diff" style="flex:1">Between Dates</button>
        </div>

        <!-- ── TAB 1: DURATION MATH (ADD/SUBTRACT DURATIONS) ──── -->
        <div id="tab-duration" class="tab-panel active">
          <p style="font-size:.875rem;color:var(--color-text-muted);margin-bottom:1.25rem">
            Add or subtract two time durations. Empty fields are treated as zero.
          </p>

          <div style="background:var(--color-surface-2);padding:1.25rem;border-radius:12px;border:1px solid var(--color-border);margin-bottom:1rem">
            <div style="font-size:.8rem;font-weight:700;text-transform:uppercase;color:var(--color-text-muted);margin-bottom:.75rem">Time 1</div>
            <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:.65rem">
              <div class="form-group" style="margin-bottom:0">
                <label class="form-label" style="font-size:.78rem">Days</label>
                <input class="form-input mono" type="number" id="t1-days" min="0" placeholder="0" value="0">
              </div>
              <div class="form-group" style="margin-bottom:0">
                <label class="form-label" style="font-size:.78rem">Hours</label>
                <input class="form-input mono" type="number" id="t1-hours" min="0" placeholder="0" value="4">
              </div>
              <div class="form-group" style="margin-bottom:0">
                <label class="form-label" style="font-size:.78rem">Mins</label>
                <input class="form-input mono" type="number" id="t1-mins" min="0" placeholder="0" value="35">
              </div>
              <div class="form-group" style="margin-bottom:0">
                <label class="form-label" style="font-size:.78rem">Secs</label>
                <input class="form-input mono" type="number" id="t1-secs" min="0" placeholder="0" value="20">
              </div>
            </div>
          </div>

          <!-- Operator selector -->
          <div style="display:flex;justify-content:center;gap:1.5rem;margin:1rem 0;padding:.5rem 0">
            <label style="display:inline-flex;align-items:center;gap:.5rem;font-weight:700;font-size:1rem;cursor:pointer;color:var(--color-text)">
              <input type="radio" name="time-op" value="+" checked style="accent-color:var(--color-accent);transform:scale(1.2)"> Add (+)
            </label>
            <label style="display:inline-flex;align-items:center;gap:.5rem;font-weight:700;font-size:1rem;cursor:pointer;color:var(--color-text)">
              <input type="radio" name="time-op" value="-" style="accent-color:var(--color-accent);transform:scale(1.2)"> Subtract (−)
            </label>
          </div>

          <div style="background:var(--color-surface-2);padding:1.25rem;border-radius:12px;border:1px solid var(--color-border);margin-bottom:1.5rem">
            <div style="font-size:.8rem;font-weight:700;text-transform:uppercase;color:var(--color-text-muted);margin-bottom:.75rem">Time 2</div>
            <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:.65rem">
              <div class="form-group" style="margin-bottom:0">
                <label class="form-label" style="font-size:.78rem">Days</label>
                <input class="form-input mono" type="number" id="t2-days" min="0" placeholder="0" value="0">
              </div>
              <div class="form-group" style="margin-bottom:0">
                <label class="form-label" style="font-size:.78rem">Hours</label>
                <input class="form-input mono" type="number" id="t2-hours" min="0" placeholder="0" value="2">
              </div>
              <div class="form-group" style="margin-bottom:0">
                <label class="form-label" style="font-size:.78rem">Mins</label>
                <input class="form-input mono" type="number" id="t2-mins" min="0" placeholder="0" value="45">
              </div>
              <div class="form-group" style="margin-bottom:0">
                <label class="form-label" style="font-size:.78rem">Secs</label>
                <input class="form-input mono" type="number" id="t2-secs" min="0" placeholder="0" value="50">
              </div>
            </div>
          </div>

          <div style="display:flex;gap:.75rem">
            <button class="btn btn--primary btn--lg" id="btn-calc-duration" style="flex:1">Calculate Result</button>
            <button class="btn btn--ghost" id="btn-clear-duration">Clear</button>
          </div>

          <!-- Result Card 1 -->
          <div class="result-box" id="result-duration" style="margin-top:1.5rem">
            <div class="result-box__label">Result Duration</div>
            <div class="result-box__value mono" id="res-dur-main">7 hrs 21 mins 10 secs</div>
            <div class="result-box__sub" id="res-dur-stats"></div>
            <div class="result-box__steps" id="res-dur-steps" style="margin-top:1.25rem"></div>
          </div>
        </div>

        <!-- ── TAB 2: DATE & TIME ARITHMETIC ──────────────────── -->
        <div id="tab-date" class="tab-panel" style="display:none">
          <p style="font-size:.875rem;color:var(--color-text-muted);margin-bottom:1.25rem">
            Add or subtract time from a starting date and time to find the exact target calendar date.
          </p>

          <div style="background:var(--color-surface-2);padding:1.25rem;border-radius:12px;border:1px solid var(--color-border);margin-bottom:1rem">
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:.75rem">
              <span style="font-size:.8rem;font-weight:700;text-transform:uppercase;color:var(--color-text-muted)">Start Date &amp; Time</span>
              <button type="button" id="btn-now-date" style="font-size:.8rem;color:var(--color-accent);font-weight:600;background:none;border:none;cursor:pointer">⚡ Use Current Time</button>
            </div>

            <div class="form-row" style="margin-bottom:1rem">
              <div class="form-group" style="margin-bottom:0">
                <label class="form-label" style="font-size:.78rem">Start Date</label>
                <input class="form-input" type="date" id="date-start" value="${todayStr}">
              </div>
              <div class="form-group" style="margin-bottom:0">
                <label class="form-label" style="font-size:.78rem">Time Format</label>
                <select class="form-select" id="date-format-select">
                  <option value="24" selected>24-Hour Clock</option>
                  <option value="12">12-Hour Clock (AM/PM)</option>
                </select>
              </div>
            </div>

            <div style="display:grid;grid-template-columns:repeat(3,1fr) auto;gap:.65rem;align-items:end">
              <div class="form-group" style="margin-bottom:0">
                <label class="form-label" style="font-size:.78rem">Hour</label>
                <input class="form-input mono" type="number" id="date-hour" min="0" max="23" value="${currentHour}">
              </div>
              <div class="form-group" style="margin-bottom:0">
                <label class="form-label" style="font-size:.78rem">Minute</label>
                <input class="form-input mono" type="number" id="date-min" min="0" max="59" value="${currentMin}">
              </div>
              <div class="form-group" style="margin-bottom:0">
                <label class="form-label" style="font-size:.78rem">Second</label>
                <input class="form-input mono" type="number" id="date-sec" min="0" max="59" value="${currentSec}">
              </div>
              <div class="form-group" id="ampm-group" style="margin-bottom:0;display:none">
                <label class="form-label" style="font-size:.78rem">AM/PM</label>
                <select class="form-select" id="date-ampm">
                  <option value="AM">AM</option>
                  <option value="PM">PM</option>
                </select>
              </div>
            </div>
          </div>

          <!-- Operator selector -->
          <div style="display:flex;justify-content:center;gap:1.5rem;margin:1rem 0;padding:.5rem 0">
            <label style="display:inline-flex;align-items:center;gap:.5rem;font-weight:700;font-size:1rem;cursor:pointer;color:var(--color-text)">
              <input type="radio" name="date-op" value="+" checked style="accent-color:var(--color-accent);transform:scale(1.2)"> Add (+)
            </label>
            <label style="display:inline-flex;align-items:center;gap:.5rem;font-weight:700;font-size:1rem;cursor:pointer;color:var(--color-text)">
              <input type="radio" name="date-op" value="-" style="accent-color:var(--color-accent);transform:scale(1.2)"> Subtract (−)
            </label>
          </div>

          <div style="background:var(--color-surface-2);padding:1.25rem;border-radius:12px;border:1px solid var(--color-border);margin-bottom:1.5rem">
            <div style="font-size:.8rem;font-weight:700;text-transform:uppercase;color:var(--color-text-muted);margin-bottom:.75rem">Time to Add / Subtract</div>
            <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:.65rem">
              <div class="form-group" style="margin-bottom:0">
                <label class="form-label" style="font-size:.78rem">Days</label>
                <input class="form-input mono" type="number" id="diff-days" min="0" placeholder="0" value="7">
              </div>
              <div class="form-group" style="margin-bottom:0">
                <label class="form-label" style="font-size:.78rem">Hours</label>
                <input class="form-input mono" type="number" id="diff-hours" min="0" placeholder="0" value="12">
              </div>
              <div class="form-group" style="margin-bottom:0">
                <label class="form-label" style="font-size:.78rem">Mins</label>
                <input class="form-input mono" type="number" id="diff-mins" min="0" placeholder="0" value="30">
              </div>
              <div class="form-group" style="margin-bottom:0">
                <label class="form-label" style="font-size:.78rem">Secs</label>
                <input class="form-input mono" type="number" id="diff-secs" min="0" placeholder="0" value="0">
              </div>
            </div>
          </div>

          <div style="display:flex;gap:.75rem">
            <button class="btn btn--primary btn--lg" id="btn-calc-date" style="flex:1">Calculate New Date</button>
            <button class="btn btn--ghost" id="btn-clear-date">Clear</button>
          </div>

          <!-- Result Card 2 -->
          <div class="result-box" id="result-date" style="margin-top:1.5rem">
            <div class="result-box__label">Target Date &amp; Time</div>
            <div class="result-box__value" id="res-date-main" style="font-size:1.75rem">—</div>
            <div class="result-box__sub" id="res-date-stats"></div>
          </div>
        </div>

        <!-- ── TAB 3: DURATION BETWEEN TWO DATES ──────────────── -->
        <div id="tab-diff" class="tab-panel" style="display:none">
          <p style="font-size:.875rem;color:var(--color-text-muted);margin-bottom:1.25rem">
            Calculate the exact time difference (days, hours, minutes, seconds) between two calendar timestamps.
          </p>

          <div style="background:var(--color-surface-2);padding:1.25rem;border-radius:12px;border:1px solid var(--color-border);margin-bottom:1rem">
            <div style="font-size:.8rem;font-weight:700;text-transform:uppercase;color:var(--color-text-muted);margin-bottom:.75rem">Start Date &amp; Time</div>
            <div class="form-row">
              <div class="form-group" style="margin-bottom:0">
                <label class="form-label" style="font-size:.78rem">Date</label>
                <input class="form-input" type="date" id="between-start-date" value="${todayStr}">
              </div>
              <div class="form-group" style="margin-bottom:0">
                <label class="form-label" style="font-size:.78rem">Time</label>
                <input class="form-input mono" type="time" id="between-start-time" step="1" value="09:00:00">
              </div>
            </div>
          </div>

          <div style="background:var(--color-surface-2);padding:1.25rem;border-radius:12px;border:1px solid var(--color-border);margin-bottom:1.5rem">
            <div style="font-size:.8rem;font-weight:700;text-transform:uppercase;color:var(--color-text-muted);margin-bottom:.75rem">End Date &amp; Time</div>
            <div class="form-row">
              <div class="form-group" style="margin-bottom:0">
                <label class="form-label" style="font-size:.78rem">Date</label>
                <input class="form-input" type="date" id="between-end-date" value="${todayStr}">
              </div>
              <div class="form-group" style="margin-bottom:0">
                <label class="form-label" style="font-size:.78rem">Time</label>
                <input class="form-input mono" type="time" id="between-end-time" step="1" value="17:30:00">
              </div>
            </div>
          </div>

          <div style="display:flex;gap:.75rem">
            <button class="btn btn--primary btn--lg" id="btn-calc-between" style="flex:1">Calculate Difference</button>
            <button class="btn btn--ghost" id="btn-clear-between">Clear</button>
          </div>

          <!-- Result Card 3 -->
          <div class="result-box" id="result-between" style="margin-top:1.5rem">
            <div class="result-box__label">Elapsed Time Difference</div>
            <div class="result-box__value mono" id="res-between-main">8 hrs 30 mins 0 secs</div>
            <div class="result-box__sub" id="res-between-stats"></div>
          </div>
        </div>

        <!-- How-to Guide Component -->
        <div class="how-to" style="margin-top:2rem">
          <div class="how-to__title">Time Calculation Guide</div>
          <div class="how-to__body">
            <p><strong>1 Minute = 60 Seconds</strong> • <strong>1 Hour = 60 Minutes (3,600 Seconds)</strong> • <strong>1 Day = 24 Hours (86,400 Seconds)</strong></p>
            <ul style="margin-top:.5rem">
              <li><strong>Addition with carryover:</strong> When seconds or minutes reach 60, they roll over into the next higher unit (+1 minute or +1 hour).</li>
              <li><strong>Subtraction with borrowing:</strong> When subtracting larger values from smaller ones, 1 unit is borrowed from the preceding higher column (e.g. 1 hour borrows 60 minutes).</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  `;
}

/* ── Calculation Engines ───────────────────────────────────── */
export function calculateDurationMath(t1, op, t2) {
  const s1 = (Number(t1.days) || 0) * 86400 + (Number(t1.hours) || 0) * 3600 + (Number(t1.mins) || 0) * 60 + (Number(t1.secs) || 0);
  const s2 = (Number(t2.days) || 0) * 86400 + (Number(t2.hours) || 0) * 3600 + (Number(t2.mins) || 0) * 60 + (Number(t2.secs) || 0);

  const totalSec = op === '+' ? (s1 + s2) : (s1 - s2);
  const isNegative = totalSec < 0;
  const absSec = Math.abs(totalSec);

  const days = Math.floor(absSec / 86400);
  const remDays = absSec % 86400;
  const hours = Math.floor(remDays / 3600);
  const remHours = remDays % 3600;
  const mins = Math.floor(remHours / 60);
  const secs = remHours % 60;

  const parts = [];
  if (days > 0) parts.push(`${days} day${days !== 1 ? 's' : ''}`);
  if (hours > 0 || days > 0) parts.push(`${hours} hr${hours !== 1 ? 's' : ''}`);
  if (mins > 0 || hours > 0 || days > 0) parts.push(`${mins} min${mins !== 1 ? 's' : ''}`);
  parts.push(`${secs} sec${secs !== 1 ? 's' : ''}`);

  const formatted = (isNegative ? '− ' : '') + parts.join(' ');

  return {
    totalSec,
    isNegative,
    days,
    hours,
    mins,
    secs,
    formatted,
    totalDays: (totalSec / 86400).toFixed(4),
    totalHours: (totalSec / 3600).toFixed(4),
    totalMinutes: (totalSec / 60).toFixed(2),
    totalSeconds: totalSec,
    s1,
    s2,
    op
  };
}

export function calculateDateMath(startDateStr, hour, min, sec, op, addDays, addHours, addMins, addSecs) {
  const parts = startDateStr.split('-').map(Number);
  if (parts.length !== 3) return null;

  const d = new Date(parts[0], parts[1] - 1, parts[2], Number(hour) || 0, Number(min) || 0, Number(sec) || 0);
  if (isNaN(d.getTime())) return null;

  const addTotalSec = (Number(addDays) || 0) * 86400 +
                      (Number(addHours) || 0) * 3600 +
                      (Number(addMins) || 0) * 60 +
                      (Number(addSecs) || 0);

  const targetMs = op === '+' ? d.getTime() + (addTotalSec * 1000) : d.getTime() - (addTotalSec * 1000);
  const targetDate = new Date(targetMs);

  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true };
  const formatted = targetDate.toLocaleDateString(undefined, options);

  const diffDays = ((targetMs - d.getTime()) / (86400 * 1000)).toFixed(2);

  return {
    targetDate,
    formatted,
    dayOfWeek: targetDate.toLocaleDateString(undefined, { weekday: 'long' }),
    isoString: targetDate.toISOString(),
    diffDays
  };
}

export function calculateBetweenDates(startDateStr, startTimeStr, endDateStr, endTimeStr) {
  const start = new Date(`${startDateStr}T${startTimeStr || '00:00:00'}`);
  const end = new Date(`${endDateStr}T${endTimeStr || '00:00:00'}`);

  if (isNaN(start.getTime()) || isNaN(end.getTime())) return null;

  const diffMs = end.getTime() - start.getTime();
  const isNegative = diffMs < 0;
  const absSec = Math.floor(Math.abs(diffMs) / 1000);

  const days = Math.floor(absSec / 86400);
  const remDays = absSec % 86400;
  const hours = Math.floor(remDays / 3600);
  const remHours = remDays % 3600;
  const mins = Math.floor(remHours / 60);
  const secs = remHours % 60;

  const parts = [];
  if (days > 0) parts.push(`${days} day${days !== 1 ? 's' : ''}`);
  parts.push(`${hours} hr${hours !== 1 ? 's' : ''}`);
  parts.push(`${mins} min${mins !== 1 ? 's' : ''}`);
  parts.push(`${secs} sec${secs !== 1 ? 's' : ''}`);

  const formatted = (isNegative ? '− ' : '') + parts.join(' ');
  const totalSec = Math.floor(diffMs / 1000);

  return {
    isNegative,
    days,
    hours,
    mins,
    secs,
    formatted,
    totalDays: (totalSec / 86400).toFixed(4),
    totalHours: (totalSec / 3600).toFixed(2),
    totalMinutes: (totalSec / 60).toFixed(1),
    totalSeconds: totalSec,
    totalWeeks: (totalSec / (86400 * 7)).toFixed(2)
  };
}

/* ── DOM Event Binding ─────────────────────────────────────── */
export function bindEvents(container) {
  // Tab Switching
  const tabBtns = container.querySelectorAll('.segment__btn');
  const tabPanels = container.querySelectorAll('.tab-panel');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      tabPanels.forEach(p => { p.style.display = 'none'; p.classList.remove('active'); });

      btn.classList.add('active');
      const targetId = btn.getAttribute('data-tab');
      const targetPanel = container.querySelector('#' + targetId);
      if (targetPanel) {
        targetPanel.style.display = 'block';
        targetPanel.classList.add('active');
      }
    });
  });

  // 1. Duration calculation
  const btnCalcDur = container.querySelector('#btn-calc-duration');
  const btnClearDur = container.querySelector('#btn-clear-duration');

  const runDurationMath = () => {
    const t1 = {
      days: container.querySelector('#t1-days').value,
      hours: container.querySelector('#t1-hours').value,
      mins: container.querySelector('#t1-mins').value,
      secs: container.querySelector('#t1-secs').value
    };
    const op = container.querySelector('input[name="time-op"]:checked')?.value || '+';
    const t2 = {
      days: container.querySelector('#t2-days').value,
      hours: container.querySelector('#t2-hours').value,
      mins: container.querySelector('#t2-mins').value,
      secs: container.querySelector('#t2-secs').value
    };

    const res = calculateDurationMath(t1, op, t2);

    container.querySelector('#res-dur-main').textContent = res.formatted;

    container.querySelector('#res-dur-stats').innerHTML = `
      <div class="result-stat">
        <div class="result-stat__label">Total Hours</div>
        <div class="result-stat__value">${Number(res.totalHours).toLocaleString()} hrs</div>
      </div>
      <div class="result-stat">
        <div class="result-stat__label">Total Minutes</div>
        <div class="result-stat__value">${Number(res.totalMinutes).toLocaleString()} mins</div>
      </div>
      <div class="result-stat">
        <div class="result-stat__label">Total Seconds</div>
        <div class="result-stat__value">${res.totalSeconds.toLocaleString()} s</div>
      </div>
      <div class="result-stat">
        <div class="result-stat__label">Decimal Days</div>
        <div class="result-stat__value">${res.totalDays} days</div>
      </div>
    `;

    container.querySelector('#res-dur-steps').innerHTML = `
      <div class="result-box__steps-title">Step-by-Step Breakdown</div>
      <div class="result-box__step">
        <div class="result-box__step-num">1</div>
        <div style="flex:1">Time 1 total seconds: ${res.s1.toLocaleString()} s</div>
      </div>
      <div class="result-box__step">
        <div class="result-box__step-num">2</div>
        <div style="flex:1">Time 2 total seconds: ${res.s2.toLocaleString()} s</div>
      </div>
      <div class="result-box__step">
        <div class="result-box__step-num">3</div>
        <div style="flex:1">Operation: ${res.s1.toLocaleString()} ${res.op} ${res.s2.toLocaleString()} = ${res.totalSec.toLocaleString()} seconds</div>
      </div>
      <div class="result-box__step">
        <div class="result-box__step-num">4</div>
        <div style="flex:1">Normalized conversion: ${res.formatted}</div>
      </div>
    `;
  };

  if (btnCalcDur) {
    btnCalcDur.addEventListener('click', runDurationMath);
    // run initial calculation
    runDurationMath();
  }

  if (btnClearDur) {
    btnClearDur.addEventListener('click', () => {
      ['#t1-days', '#t1-hours', '#t1-mins', '#t1-secs', '#t2-days', '#t2-hours', '#t2-mins', '#t2-secs'].forEach(id => {
        const el = container.querySelector(id);
        if (el) el.value = '';
      });
      runDurationMath();
    });
  }

  // 2. Date calculation
  const btnCalcDate = container.querySelector('#btn-calc-date');
  const btnClearDate = container.querySelector('#btn-clear-date');
  const btnNowDate = container.querySelector('#btn-now-date');
  const formatSelect = container.querySelector('#date-format-select');
  const ampmGroup = container.querySelector('#ampm-group');

  if (formatSelect) {
    formatSelect.addEventListener('change', () => {
      if (formatSelect.value === '12') {
        ampmGroup.style.display = 'block';
        const hInput = container.querySelector('#date-hour');
        let h = Number(hInput.value) || 0;
        const ampmSelect = container.querySelector('#date-ampm');
        if (h >= 12) {
          ampmSelect.value = 'PM';
          if (h > 12) h -= 12;
        } else {
          ampmSelect.value = 'AM';
          if (h === 0) h = 12;
        }
        hInput.value = h;
        hInput.max = '12';
        hInput.min = '1';
      } else {
        ampmGroup.style.display = 'none';
        const hInput = container.querySelector('#date-hour');
        hInput.max = '23';
        hInput.min = '0';
      }
    });
  }

  if (btnNowDate) {
    btnNowDate.addEventListener('click', () => {
      const n = new Date();
      container.querySelector('#date-start').value = n.toISOString().slice(0, 10);
      const is12h = formatSelect?.value === '12';
      let h = n.getHours();
      if (is12h) {
        const ampm = h >= 12 ? 'PM' : 'AM';
        container.querySelector('#date-ampm').value = ampm;
        h = h % 12 || 12;
      }
      container.querySelector('#date-hour').value = h;
      container.querySelector('#date-min').value = n.getMinutes();
      container.querySelector('#date-sec').value = n.getSeconds();
      runDateMath();
    });
  }

  const runDateMath = () => {
    const startDateStr = container.querySelector('#date-start').value;
    let hour = Number(container.querySelector('#date-hour').value) || 0;
    const min = Number(container.querySelector('#date-min').value) || 0;
    const sec = Number(container.querySelector('#date-sec').value) || 0;
    const is12h = formatSelect?.value === '12';

    if (is12h) {
      const ampm = container.querySelector('#date-ampm').value;
      if (ampm === 'PM' && hour < 12) hour += 12;
      if (ampm === 'AM' && hour === 12) hour = 0;
    }

    const op = container.querySelector('input[name="date-op"]:checked')?.value || '+';
    const addDays = container.querySelector('#diff-days').value;
    const addHours = container.querySelector('#diff-hours').value;
    const addMins = container.querySelector('#diff-mins').value;
    const addSecs = container.querySelector('#diff-secs').value;

    const res = calculateDateMath(startDateStr, hour, min, sec, op, addDays, addHours, addMins, addSecs);
    if (!res) {
      container.querySelector('#res-date-main').textContent = 'Please enter a valid date';
      return;
    }

    container.querySelector('#res-date-main').textContent = res.formatted;
    container.querySelector('#res-date-stats').innerHTML = `
      <div class="result-stat">
        <div class="result-stat__label">Day of Week</div>
        <div class="result-stat__value">${res.dayOfWeek}</div>
      </div>
      <div class="result-stat">
        <div class="result-stat__label">Offset from Start</div>
        <div class="result-stat__value">${op}${Math.abs(res.diffDays)} days</div>
      </div>
      <div class="result-stat">
        <div class="result-stat__label">ISO 8601</div>
        <div class="result-stat__value" style="font-size:.8rem">${res.isoString.slice(0, 19)}</div>
      </div>
    `;
  };

  if (btnCalcDate) {
    btnCalcDate.addEventListener('click', runDateMath);
    runDateMath();
  }

  if (btnClearDate) {
    btnClearDate.addEventListener('click', () => {
      ['#diff-days', '#diff-hours', '#diff-mins', '#diff-secs'].forEach(id => {
        const el = container.querySelector(id);
        if (el) el.value = '0';
      });
      runDateMath();
    });
  }

  // 3. Difference between two dates
  const btnCalcBetween = container.querySelector('#btn-calc-between');
  const btnClearBetween = container.querySelector('#btn-clear-between');

  const runBetweenDates = () => {
    const sDate = container.querySelector('#between-start-date').value;
    const sTime = container.querySelector('#between-start-time').value;
    const eDate = container.querySelector('#between-end-date').value;
    const eTime = container.querySelector('#between-end-time').value;

    const res = calculateBetweenDates(sDate, sTime, eDate, eTime);
    if (!res) {
      container.querySelector('#res-between-main').textContent = 'Please select valid start and end timestamps';
      return;
    }

    container.querySelector('#res-between-main').textContent = res.formatted;
    container.querySelector('#res-between-stats').innerHTML = `
      <div class="result-stat">
        <div class="result-stat__label">Total Hours</div>
        <div class="result-stat__value">${Number(res.totalHours).toLocaleString()} hrs</div>
      </div>
      <div class="result-stat">
        <div class="result-stat__label">Total Minutes</div>
        <div class="result-stat__value">${Number(res.totalMinutes).toLocaleString()} mins</div>
      </div>
      <div class="result-stat">
        <div class="result-stat__label">Total Seconds</div>
        <div class="result-stat__value">${res.totalSeconds.toLocaleString()} s</div>
      </div>
      <div class="result-stat">
        <div class="result-stat__label">Total Weeks</div>
        <div class="result-stat__value">${res.totalWeeks} wks</div>
      </div>
    `;
  };

  if (btnCalcBetween) {
    btnCalcBetween.addEventListener('click', runBetweenDates);
    runBetweenDates();
  }

  if (btnClearBetween) {
    btnClearBetween.addEventListener('click', () => {
      const n = new Date();
      container.querySelector('#between-start-date').value = n.toISOString().slice(0, 10);
      container.querySelector('#between-end-date').value = n.toISOString().slice(0, 10);
      container.querySelector('#between-start-time').value = '00:00:00';
      container.querySelector('#between-end-time').value = '00:00:00';
      runBetweenDates();
    });
  }
}
