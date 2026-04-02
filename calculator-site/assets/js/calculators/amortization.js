/* ============================================================
   AMORTIZATION.JS — Loan Amortization Schedule
   ============================================================ */

export function render(container) {
  container.innerHTML = `
    <div class="calc-panel">
      <div class="calc-panel__header">
        <span class="calc-panel__title">Amortization Calculator</span>
      </div>
      <div class="calc-panel__body">
        <div class="form-row">
          <div class="form-group">
            <label class="form-label" for="am-amount">Loan Amount (₹)</label>
            <input class="form-input" type="number" id="am-amount" min="0" placeholder="5000000" aria-label="Loan amount in rupees">
          </div>
          <div class="form-group">
            <label class="form-label">Loan Term</label>
            <div style="display:flex; gap:0.5rem">
              <input class="form-input" type="number" id="am-term-years" min="0" max="50" placeholder="Years (e.g. 20)" aria-label="Loan term in years">
              <input class="form-input" type="number" id="am-term-months" min="0" max="11" placeholder="Months (e.g. 0)" aria-label="Loan term in months">
            </div>
          </div>
        </div>
        <div class="form-row">
          <div class="form-group" style="max-width: 50%">
            <label class="form-label" for="am-rate">Interest Rate (%)</label>
            <input class="form-input" type="number" id="am-rate" min="0" max="100" step="0.01" placeholder="8.5" aria-label="Annual interest rate">
          </div>
        </div>

        <button class="btn btn--primary btn--lg" id="am-calc-btn" style="width:100%" aria-label="Calculate amortization">Calculate</button>

        <div class="result-box result-box--hidden" id="am-result">
          <div class="result-box__label">Monthly Payment</div>
          <div class="result-box__value" id="am-monthly">—</div>
          <div class="result-box__sub" id="am-stats"></div>
        </div>

        <div id="am-table-wrap" style="display:none;margin-top:2rem">
          <h4 style="font-size:1.1rem;font-weight:700;color:var(--color-text);margin-bottom:1rem">Amortization Schedule</h4>
          <div style="overflow-x:auto;border-radius:10px;border:1px solid var(--color-border); max-height: 500px; overflow-y: auto;">
            <table class="data-table" id="am-table">
              <thead style="position: sticky; top: 0; background: var(--color-surface); z-index: 2; box-shadow: 0 1px 2px rgba(0,0,0,0.1);">
                <tr>
                  <th>Month</th>
                  <th>Payment</th>
                  <th>Principal</th>
                  <th>Interest</th>
                  <th>Balance</th>
                </tr>
              </thead>
              <tbody id="am-tbody"></tbody>
              <tfoot>
                <tr>
                  <td colspan="2">Total</td>
                  <td id="am-total-principal"></td>
                  <td id="am-total-interest"></td>
                  <td>—</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </div>
  `;
}

export function calculate({ amount, annualRate, termYears, termMonths }) {
  if (amount <= 0 || annualRate < 0 || (termYears === 0 && termMonths === 0) || termYears < 0 || termMonths < 0) return null;

  const r = annualRate / 100 / 12;
  const n = (termYears * 12) + termMonths;

  let monthly;
  if (r === 0) {
    monthly = amount / n;
  } else {
    monthly = amount * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  }

  const totalPayment  = monthly * n;
  const totalInterest = totalPayment - amount;

  // Build the full amortization schedule
  const rows = [];
  let balance = amount;
  for (let i = 1; i <= n; i++) {
    const interest  = balance * r;
    const princ     = monthly - interest;
    balance        -= princ;
    rows.push({ month: i, payment: monthly, principal: princ, interest, balance: Math.max(0, balance) });
  }

  return { monthly, totalPayment, totalInterest, principal: amount, rows, n };
}

function formatRupee(n) {
  return '₹' + n.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export function bindEvents(container) {
  const btn       = container.querySelector('#am-calc-btn');
  const resultEl  = container.querySelector('#am-result');
  const monthlyEl = container.querySelector('#am-monthly');
  const statsEl   = container.querySelector('#am-stats');
  const tableWrap = container.querySelector('#am-table-wrap');
  const tbody     = container.querySelector('#am-tbody');
  const totPrin   = container.querySelector('#am-total-principal');
  const totInt    = container.querySelector('#am-total-interest');
  if (!btn) return;

  btn.addEventListener('click', () => {
    const amount     = parseFloat(container.querySelector('#am-amount').value);
    const annualRate = parseFloat(container.querySelector('#am-rate').value);
    const termYears  = parseFloat(container.querySelector('#am-term-years').value) || 0;
    const termMonths = parseFloat(container.querySelector('#am-term-months').value) || 0;

    if (isNaN(amount) || isNaN(annualRate) || (termYears === 0 && termMonths === 0)) {
      monthlyEl.textContent = 'Please fill all fields';
      resultEl.classList.remove('result-box--hidden');
      tableWrap.style.display = 'none';
      return;
    }

    const r = calculate({ amount, annualRate, termYears, termMonths });
    if (!r) {
      monthlyEl.textContent = 'Invalid input';
      resultEl.classList.remove('result-box--hidden');
      tableWrap.style.display = 'none';
      return;
    }

    resultEl.classList.remove('result-box--hidden');
    monthlyEl.textContent = formatRupee(r.monthly);

    statsEl.innerHTML = `
      <div class="result-stat">
        <div class="result-stat__label">Total Payment</div>
        <div class="result-stat__value">${formatRupee(r.totalPayment)}</div>
      </div>
      <div class="result-stat">
        <div class="result-stat__label">Total Interest</div>
        <div class="result-stat__value">${formatRupee(r.totalInterest)}</div>
      </div>
    `;

    tableWrap.style.display = '';
    
    // For performance, if the loan term is massive (e.g. 50 years = 600 rows), this is still fast enough in vanilla JS
    let html = '';
    for (let i = 0; i < r.rows.length; i++) {
        const row = r.rows[i];
        html += `
          <tr>
            <td>${row.month}</td>
            <td>${formatRupee(row.payment)}</td>
            <td>${formatRupee(row.principal)}</td>
            <td>${formatRupee(row.interest)}</td>
            <td>${formatRupee(row.balance)}</td>
          </tr>
        `;
    }
    tbody.innerHTML = html;

    totPrin.textContent  = formatRupee(r.principal);
    totInt.textContent   = formatRupee(r.totalInterest);
  });
}
