function h(t){t.innerHTML=`
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
  `}function y({price:t,down:u,annualRate:n,termYears:d}){const o=t-u;if(o<=0||n<0||d<=0)return null;const a=n/100/12,r=d*12;let s;a===0?s=o/r:s=o*(a*Math.pow(1+a,r))/(Math.pow(1+a,r)-1);const p=s*r,v=p-o,b=[];let c=o;for(let m=1;m<=Math.min(3,r);m++){const e=c*a,i=s-e;c-=i,b.push({month:m,payment:s,principal:i,interest:e,balance:Math.max(0,c)})}return{monthly:s,totalPayment:p,totalInterest:v,principal:o,rows:b,n:r}}function l(t){return"₹"+t.toLocaleString("en-IN",{minimumFractionDigits:2,maximumFractionDigits:2})}function f(t){const u=t.querySelector("#mort-calc-btn"),n=t.querySelector("#mort-result"),d=t.querySelector("#mort-monthly"),o=t.querySelector("#mort-stats"),a=t.querySelector("#mort-table-wrap"),r=t.querySelector("#mort-tbody"),s=t.querySelector("#mort-total-principal"),p=t.querySelector("#mort-total-interest");u&&u.addEventListener("click",()=>{const v=parseFloat(t.querySelector("#mort-price").value),b=parseFloat(t.querySelector("#mort-down").value)||0,c=parseFloat(t.querySelector("#mort-rate").value),m=parseFloat(t.querySelector("#mort-term").value);if(isNaN(v)||isNaN(c)||isNaN(m)){d.textContent="Please fill all fields",n.classList.remove("result-box--hidden"),a.style.display="none";return}const e=y({price:v,down:b,annualRate:c,termYears:m});if(!e){d.textContent="Invalid input",n.classList.remove("result-box--hidden"),a.style.display="none";return}n.classList.remove("result-box--hidden"),d.textContent=l(e.monthly),o.innerHTML=`
      <div class="result-stat">
        <div class="result-stat__label">Loan Amount</div>
        <div class="result-stat__value">${l(e.principal)}</div>
      </div>
      <div class="result-stat">
        <div class="result-stat__label">Total Payment</div>
        <div class="result-stat__value">${l(e.totalPayment)}</div>
      </div>
      <div class="result-stat">
        <div class="result-stat__label">Total Interest</div>
        <div class="result-stat__value">${l(e.totalInterest)}</div>
      </div>
    `,a.style.display="",r.innerHTML=e.rows.map(i=>`
      <tr>
        <td>${i.month}</td>
        <td>${l(i.payment)}</td>
        <td>${l(i.principal)}</td>
        <td>${l(i.interest)}</td>
        <td>${l(i.balance)}</td>
      </tr>
    `).join(""),e.n>3&&(r.innerHTML+=`
        <tr>
          <td style="text-align:center;color:var(--color-text-muted)" colspan="5">
            … ${e.n-3} more rows
          </td>
        </tr>
      `),s.textContent=l(e.principal),p.textContent=l(e.totalInterest)})}export{f as bindEvents,y as calculate,h as render};
