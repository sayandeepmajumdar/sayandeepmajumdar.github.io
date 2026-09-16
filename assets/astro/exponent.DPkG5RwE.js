function d(e){e.innerHTML=`
    <div class="calc-panel">
      <div class="calc-panel__header">
        <span class="calc-panel__title">Exponent Calculator</span>
        <div class="calc-panel__header-icon">✷</div>
      </div>
      <div class="calc-panel__body">
        <div class="form-row">
          <div class="form-group">
            <label class="form-label" for="exp-base">Base (b)</label>
            <input class="form-input form-input--lg" type="number" id="exp-base" placeholder="e.g. 2" aria-label="Base number">
          </div>
          <div class="form-group">
            <label class="form-label" for="exp-power">Exponent (n)</label>
            <input class="form-input form-input--lg" type="number" id="exp-power" placeholder="e.g. 10" aria-label="Exponent power">
          </div>
        </div>

        <button class="btn btn--primary btn--lg" id="exp-btn" style="width:100%" aria-label="Calculate exponent">Calculate</button>

        <div class="result-box result-box--hidden" id="exp-result">
          <div class="result-box__label">Result</div>
          <div class="result-box__value" id="exp-value">—</div>
          <div id="exp-details" style="margin-top:.5rem;font-size:.9rem;color:var(--color-text-muted)"></div>
        </div>

        <div class="how-to" style="margin-top:1.5rem">
          <div class="how-to__title">Formula</div>
          <div class="how-to__body">
            <p>Exponentiation calculates a number raised to a power.</p>
            <code style="display:block;background:var(--color-bg-subtle);padding:.75rem;border-radius:4px;margin:.5rem 0">
              bⁿ = b × b × b × ... × b (n times)
            </code>
            <p style="margin-top:.5rem">For example, 2¹⁰ = 2 × 2 × 2 × 2 × 2 × 2 × 2 × 2 × 2 × 2 = <strong>1024</strong></p>
          </div>
        </div>
      </div>
    </div>
  `}function c(e){const n=e.querySelector("#exp-btn"),t=e.querySelector("#exp-result"),l=e.querySelector("#exp-value"),s=e.querySelector("#exp-details");function i(){const o=parseFloat(e.querySelector("#exp-base").value),a=parseFloat(e.querySelector("#exp-power").value);if(isNaN(o)||isNaN(a)){l.textContent="Please enter both values",s.textContent="",t.classList.remove("result-box--hidden");return}if(a===0){l.textContent="1",s.textContent="Any number to power 0 equals 1",t.classList.remove("result-box--hidden");return}if(o===0&&a<0){l.textContent="Undefined",s.textContent="Cannot divide by zero",t.classList.remove("result-box--hidden");return}const r=Math.pow(o,a);if(!isFinite(r)){l.textContent="Result too large",s.textContent="Number exceeds JavaScript limits",t.classList.remove("result-box--hidden");return}l.textContent=r.toLocaleString(void 0,{maximumFractionDigits:10}),s.textContent=`${o} raised to the power of ${a}`,t.classList.remove("result-box--hidden")}n.addEventListener("click",i)}export{c as bindEvents,d as render};
