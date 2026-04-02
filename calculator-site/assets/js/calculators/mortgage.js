/* ============================================================
   MORTGAGE.JS — Mortgage / loan calculator
   ============================================================ */

export function render(container) {
  container.innerHTML = `
    <div class="calc-panel">
      <div class="calc-panel__header">
        <span class="calc-panel__title">Mortgage Calculator</span>
      </div>
      <div class="calc-panel__body">
        <div class="form-row">
          <div class="form-group">
            <label class="form-label" for="mort-price">Home Price (₹)</label>
            <input class="form-input" type="number" id="mort-price" min="0" placeholder="5000000" aria-label="Home price in rupees">
          </div>
          <div class="form-group">
            <label class="form-label" for="mort-down">Down Payment (₹)</label>
            <input class="form-input" type="number" id="mort-down" min="0" placeholder="1000000" aria-label="Down payment in rupees">
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label class="form-label" for="mort-rate">Annual Interest Rate (%)</label>
            <input class="form-input" type="number" id="mort-rate" min="0" max="100" step="0.01" placeholder="6.5" aria-label="Annual interest rate">
          </div>
          <div class="form-group">
            <label class="form-label" for="mort-term">Loan Term (years)</label>
            <input class="form-input" type="number" id="mort-term" min="1" max="50" placeholder="30" aria-label="Loan term in years">
          </div>
        </div>

        <button class="btn btn--primary btn--lg" id="mort-calc-btn" style="width:100%" aria-label="Calculate mortgage">Calculate</button>

        <div class="result-box result-box--hidden" id="mort-result">
          <div class="result-box__label">Monthly Payment</div>
          <div class="result-box__value" id="mort-monthly">—</div>
          <div class="result-box__sub" id="mort-stats"></div>
        </div>

        <div id="mort-table-wrap" style="display:none;margin-top:1.5rem">
          <h4 style="font-size:.9rem;font-weight:700;color:var(--color-text-muted);text-transform:uppercase;letter-spacing:.06em;margin-bottom:.75rem">Amortization Preview</h4>
          <div style="overflow-x:auto;border-radius:10px;border:1px solid var(--color-border)">
            <table class="data-table" id="mort-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Payment</th>
                  <th>Principal</th>
                  <th>Interest</th>
                  <th>Balance</th>
                </tr>
              </thead>
              <tbody id="mort-tbody"></tbody>
              <tfoot>
                <tr>
                  <td colspan="2">Total</td>
                  <td id="mort-total-principal"></td>
                  <td id="mort-total-interest"></td>
                  <td>—</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        <div class="how-to" style="margin-top:1.5rem">
          <div class="how-to__title">How to use</div>
          <div class="how-to__body">
            <ol>
              <li>Enter the home price and your down payment.</li>
              <li>Enter the annual interest rate and loan term.</li>
              <li>Click <strong>Calculate</strong> to see your monthly payment and amortization summary.</li>
            </ol>
            <p style="margin-top:.5rem">Results show monthly payment, total interest paid, and the first few amortization rows.</p>
          </div>
        </div>
      </div>
    </div>
  `;
}

export function calculate({ price, down, annualRate, termYears }) {
  const principal = price - down;
  if (principal <= 0 || annualRate < 0 || termYears <= 0) return null;

  const r = annualRate / 100 / 12;
  const n = termYears * 12;

  let monthly;
  if (r === 0) {
    monthly = principal / n;
  } else {
    monthly = principal * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  }

  const totalPayment  = monthly * n;
  const totalInterest = totalPayment - principal;

  // Build first 3 amortization rows + last row
  const rows = [];
  let balance = principal;
  for (let i = 1; i <= Math.min(3, n); i++) {
    const interest  = balance * r;
    const princ     = monthly - interest;
    balance        -= princ;
    rows.push({ month: i, payment: monthly, principal: princ, interest, balance: Math.max(0, balance) });
  }

  return { monthly, totalPayment, totalInterest, principal, rows, n };
}

function formatRupee(n) {
  return '₹' + n.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export function bindEvents(container) {
  const btn       = container.querySelector('#mort-calc-btn');
  const resultEl  = container.querySelector('#mort-result');
  const monthlyEl = container.querySelector('#mort-monthly');
  const statsEl   = container.querySelector('#mort-stats');
  const tableWrap = container.querySelector('#mort-table-wrap');
  const tbody     = container.querySelector('#mort-tbody');
  const totPrin   = container.querySelector('#mort-total-principal');
  const totInt    = container.querySelector('#mort-total-interest');
  if (!btn) return;

  btn.addEventListener('click', () => {
    const price     = parseFloat(container.querySelector('#mort-price').value);
    const down      = parseFloat(container.querySelector('#mort-down').value) || 0;
    const annualRate = parseFloat(container.querySelector('#mort-rate').value);
    const termYears = parseFloat(container.querySelector('#mort-term').value);

    if (isNaN(price) || isNaN(annualRate) || isNaN(termYears)) {
      monthlyEl.textContent = 'Please fill all fields';
      resultEl.classList.remove('result-box--hidden');
      tableWrap.style.display = 'none';
      return;
    }

    const r = calculate({ price, down, annualRate, termYears });
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
        <div class="result-stat__label">Loan Amount</div>
        <div class="result-stat__value">${formatRupee(r.principal)}</div>
      </div>
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
    tbody.innerHTML = r.rows.map(row => `
      <tr>
        <td>${row.month}</td>
        <td>${formatRupee(row.payment)}</td>
        <td>${formatRupee(row.principal)}</td>
        <td>${formatRupee(row.interest)}</td>
        <td>${formatRupee(row.balance)}</td>
      </tr>
    `).join('');

    if (r.n > 3) {
      tbody.innerHTML += `
        <tr>
          <td style="text-align:center;color:var(--color-text-muted)" colspan="5">
            … ${r.n - 3} more rows
          </td>
        </tr>
      `;
    }

    totPrin.textContent  = formatRupee(r.principal);
    totInt.textContent   = formatRupee(r.totalInterest);
  });
}
