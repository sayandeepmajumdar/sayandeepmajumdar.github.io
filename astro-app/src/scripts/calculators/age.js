/* ============================================================
   AGE.JS — Age calculator
   ============================================================ */

export function render(container) {
  const today = new Date().toISOString().slice(0, 10);
  container.innerHTML = `
    <div class="calc-panel">
      <div class="calc-panel__header">
        <span class="calc-panel__title">Age Calculator</span>
      </div>
      <div class="calc-panel__body">
        <div class="form-row">
          <div class="form-group">
            <label class="form-label" for="age-dob">Date of Birth</label>
            <input class="form-input" type="date" id="age-dob" max="${today}" aria-label="Date of birth">
          </div>
          <div class="form-group">
            <label class="form-label" for="age-asof">Calculate As Of</label>
            <input class="form-input" type="date" id="age-asof" value="${today}" max="${today}" aria-label="Calculate age as of date">
          </div>
        </div>

        <button class="btn btn--primary btn--lg" id="age-calc-btn" style="width:100%" aria-label="Calculate age">Calculate Age</button>

        <div class="result-box result-box--hidden" id="age-result">
          <div class="result-box__label">Your Age</div>
          <div class="result-box__value" id="age-main">—</div>
          <div class="result-box__sub" id="age-stats"></div>
        </div>

        <div class="how-to" style="margin-top:1.5rem">
          <div class="how-to__title">How to use</div>
          <div class="how-to__body">
            <ol>
              <li>Select your <strong>Date of Birth</strong>.</li>
              <li>Optionally change the <strong>As Of</strong> date (defaults to today).</li>
              <li>Click <strong>Calculate Age</strong>.</li>
            </ol>
            <p style="margin-top:.5rem">Results include exact age, days until next birthday, total days lived, and more.</p>
          </div>
        </div>
      </div>
    </div>
  `;
}

export function calculate({ dob, asOf }) {
  const birth  = new Date(dob);
  const target = new Date(asOf);

  if (isNaN(birth) || isNaN(target) || birth > target) return null;

  let years  = target.getFullYear() - birth.getFullYear();
  let months = target.getMonth()    - birth.getMonth();
  let days   = target.getDate()     - birth.getDate();

  if (days < 0) {
    months--;
    const prevMonth = new Date(target.getFullYear(), target.getMonth(), 0);
    days += prevMonth.getDate();
  }
  if (months < 0) { years--; months += 12; }

  // Total days lived
  const msPerDay   = 86400000;
  const totalDays  = Math.floor((target - birth) / msPerDay);
  const totalMonths = years * 12 + months;

  // Next birthday
  let nextBday = new Date(target.getFullYear(), birth.getMonth(), birth.getDate());
  if (nextBday <= target) nextBday.setFullYear(nextBday.getFullYear() + 1);
  const daysUntilBday = Math.ceil((nextBday - target) / msPerDay);

  return { years, months, days, totalDays, totalMonths, daysUntilBday };
}

export function bindEvents(container) {
  const btn      = container.querySelector('#age-calc-btn');
  const resultEl = container.querySelector('#age-result');
  const mainEl   = container.querySelector('#age-main');
  const statsEl  = container.querySelector('#age-stats');
  if (!btn) return;

  btn.addEventListener('click', () => {
    const dob  = container.querySelector('#age-dob').value;
    const asOf = container.querySelector('#age-asof').value;

    if (!dob || !asOf) {
      mainEl.textContent = 'Please fill both dates';
      resultEl.classList.remove('result-box--hidden');
      statsEl.innerHTML = '';
      return;
    }

    const r = calculate({ dob, asOf });
    if (!r) {
      mainEl.textContent = 'Invalid dates';
      resultEl.classList.remove('result-box--hidden');
      statsEl.innerHTML = '';
      return;
    }

    resultEl.classList.remove('result-box--hidden');
    mainEl.textContent = `${r.years} yrs  ${r.months} mo  ${r.days} days`;

    statsEl.innerHTML = `
      <div class="result-stat">
        <div class="result-stat__label">Total Days</div>
        <div class="result-stat__value">${r.totalDays.toLocaleString()}</div>
      </div>
      <div class="result-stat">
        <div class="result-stat__label">Total Months</div>
        <div class="result-stat__value">${r.totalMonths.toLocaleString()}</div>
      </div>
      <div class="result-stat">
        <div class="result-stat__label">Days to Birthday 🎂</div>
        <div class="result-stat__value">${r.daysUntilBday}</div>
      </div>
    `;
  });
}
