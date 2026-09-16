function c(e){e.innerHTML=`
    <div class="calc-panel">
      <div class="calc-panel__header">
        <span class="calc-panel__title">Root Calculator</span>
        <div class="calc-panel__header-icon calc-panel__header-icon--success">√</div>
      </div>
      <div class="calc-panel__body">
        <div class="form-row">
          <div class="form-group">
            <label class="form-label" for="root-n">Root (n)</label>
            <input class="form-input form-input--lg" type="number" id="root-n" min="1" placeholder="e.g. 2 (square), 3 (cube)" aria-label="nth root">
          </div>
          <div class="form-group">
            <label class="form-label" for="root-x">Radicand (x)</label>
            <input class="form-input form-input--lg" type="number" id="root-x" placeholder="e.g. 64" aria-label="Number to find root of">
          </div>
        </div>

        <button class="btn btn--primary btn--lg" id="root-btn" style="width:100%" aria-label="Calculate root">Calculate</button>

        <div class="result-box result-box--hidden" id="root-result">
          <div class="result-box__label" id="root-label">Result</div>
          <div class="result-box__value" id="root-value">—</div>
          <div id="root-details" style="margin-top:.5rem;font-size:.9rem;color:var(--color-text-muted)"></div>
        </div>

        <div class="how-to" style="margin-top:1.5rem">
          <div class="how-to__title">Formula</div>
          <div class="how-to__body">
            <p>The nth root of a number asks: "What number raised to power n equals x?"</p>
            <code style="display:block;background:var(--color-bg-subtle);padding:.75rem;border-radius:4px;margin:.5rem 0">
              ⁿ√x = x^(1/n)
            </code>
            <p style="margin-top:.5rem"><strong>Examples:</strong></p>
            <ul>
              <li>√64 = 8 (square root, n=2)</li>
              <li>³√64 = 4 (cube root, n=3)</li>
              <li>⁴√16 = 2 (fourth root)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  `}function b(e){const d=e.querySelector("#root-btn"),o=e.querySelector("#root-result"),l=e.querySelector("#root-value"),s=e.querySelector("#root-label"),r=e.querySelector("#root-details");function u(){const t=parseFloat(e.querySelector("#root-n").value),a=parseFloat(e.querySelector("#root-x").value);if(isNaN(t)||isNaN(a)){l.textContent="Please enter both values",s.textContent="Result",r.textContent="",o.classList.remove("result-box--hidden");return}if(t<1||!Number.isInteger(t)){l.textContent="Root must be a positive integer",r.textContent="",o.classList.remove("result-box--hidden");return}if(a<0&&t%2===0){l.textContent="Cannot take even root of negative",r.textContent="Square root of negative is undefined in real numbers",o.classList.remove("result-box--hidden");return}const n=Math.pow(a,1/t),i=t===2?"Square root":t===3?"Cube root":t===4?"Fourth root":`${t}th root`;s.textContent=i,l.textContent=n.toLocaleString(void 0,{maximumFractionDigits:10}),r.textContent=`${i} of ${a} = ${n.toFixed(6)}`,o.classList.remove("result-box--hidden")}d.addEventListener("click",u)}export{b as bindEvents,c as render};
