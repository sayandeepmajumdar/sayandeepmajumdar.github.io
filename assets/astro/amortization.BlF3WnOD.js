function x(t){t.innerHTML=`
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
  `}function f({amount:t,annualRate:c,termYears:r,termMonths:o}){if(t<=0||c<0||r===0&&o===0||r<0||o<0)return null;const i=c/100/12,a=r*12+o;let s;i===0?s=t/a:s=t*(i*Math.pow(1+i,a))/(Math.pow(1+i,a)-1);const b=s*a,v=b-t,m=[];let n=t;for(let d=1;d<=a;d++){const u=n*i,e=s-u;n-=e,m.push({month:d,payment:s,principal:e,interest:u,balance:Math.max(0,n)})}return{monthly:s,totalPayment:b,totalInterest:v,principal:t,rows:m,n:a}}function l(t){return"₹"+t.toLocaleString("en-IN",{minimumFractionDigits:2,maximumFractionDigits:2})}function _(t){const c=t.querySelector("#am-calc-btn"),r=t.querySelector("#am-result"),o=t.querySelector("#am-monthly"),i=t.querySelector("#am-stats"),a=t.querySelector("#am-table-wrap"),s=t.querySelector("#am-tbody"),b=t.querySelector("#am-total-principal"),v=t.querySelector("#am-total-interest");c&&c.addEventListener("click",()=>{const m=parseFloat(t.querySelector("#am-amount").value),n=parseFloat(t.querySelector("#am-rate").value),d=parseFloat(t.querySelector("#am-term-years").value)||0,u=parseFloat(t.querySelector("#am-term-months").value)||0;if(isNaN(m)||isNaN(n)||d===0&&u===0){o.textContent="Please fill all fields",r.classList.remove("result-box--hidden"),a.style.display="none";return}const e=f({amount:m,annualRate:n,termYears:d,termMonths:u});if(!e){o.textContent="Invalid input",r.classList.remove("result-box--hidden"),a.style.display="none";return}r.classList.remove("result-box--hidden"),o.textContent=l(e.monthly),i.innerHTML=`
      <div class="result-stat">
        <div class="result-stat__label">Total Payment</div>
        <div class="result-stat__value">${l(e.totalPayment)}</div>
      </div>
      <div class="result-stat">
        <div class="result-stat__label">Total Interest</div>
        <div class="result-stat__value">${l(e.totalInterest)}</div>
      </div>
    `,a.style.display="";let h="";for(let y=0;y<e.rows.length;y++){const p=e.rows[y];h+=`
          <tr>
            <td>${p.month}</td>
            <td>${l(p.payment)}</td>
            <td>${l(p.principal)}</td>
            <td>${l(p.interest)}</td>
            <td>${l(p.balance)}</td>
          </tr>
        `}s.innerHTML=h,b.textContent=l(e.principal),v.textContent=l(e.totalInterest)})}export{_ as bindEvents,f as calculate,x as render};
