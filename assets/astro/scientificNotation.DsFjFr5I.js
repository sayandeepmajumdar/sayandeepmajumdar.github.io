function y(e){e.innerHTML=`
    <div class="calc-panel">
      <div class="calc-panel__header">
        <span class="calc-panel__title">Scientific Notation</span>
        <div class="calc-panel__header-icon">×10</div>
      </div>
      <div class="calc-panel__body">
        <div class="tab-list" role="tablist">
          <button class="tab-btn active" role="tab" data-tab="sn-mode1" aria-selected="true">To Sci</button>
          <button class="tab-btn" role="tab" data-tab="sn-mode2" aria-selected="false">From Sci</button>
          <button class="tab-btn" role="tab" data-tab="sn-mode3" aria-selected="false">Ops</button>
        </div>

        <!-- To Scientific -->
        <div class="tab-panel active" id="sn-mode1">
          <div class="form-group">
            <label class="form-label" for="sn-decimal">Enter decimal number</label>
            <input class="form-input form-input--lg" type="text" id="sn-decimal" placeholder="e.g. 12345.678" aria-label="Decimal number">
          </div>
          <div class="form-group">
            <label class="form-label" for="sn-precision">Significant figures (optional)</label>
            <input class="form-input form-input--lg" type="number" id="sn-precision" min="1" max="20" placeholder="e.g. 4" aria-label="Precision">
          </div>
          <div class="result-box result-box--hidden" id="sn-to-result">
            <div class="result-box__label">Scientific Notation</div>
            <div class="result-box__value" id="sn-to-value">—</div>
          </div>
        </div>

        <!-- From Scientific -->
        <div class="tab-panel" id="sn-mode2">
          <div class="form-row">
            <div class="form-group">
              <label class="form-label" for="sn-mantissa">Coefficient (m)</label>
              <input class="form-input form-input--lg" type="number" id="sn-mantissa" placeholder="e.g. 1.234" aria-label="Mantissa">
            </div>
            <div class="form-group">
              <label class="form-label" for="sn-exp">Exponent (n)</label>
              <input class="form-input form-input--lg" type="number" id="sn-exp" placeholder="e.g. 4" aria-label="Exponent">
            </div>
          </div>
          <div class="result-box result-box--hidden" id="sn-from-result">
            <div class="result-box__label">Decimal</div>
            <div class="result-box__value" id="sn-from-value">—</div>
          </div>
        </div>

        <!-- Operations -->
        <div class="tab-panel" id="sn-mode3">
          <p style="margin-bottom:.5rem;font-size:.9rem;color:var(--color-text-muted)">Number 1: m₁ × 10ⁿ¹</p>
          <div class="form-row">
            <input class="form-input" type="number" id="sn-op1-m" placeholder="m₁">
            <input class="form-input" type="number" id="sn-op1-n" placeholder="n₁">
          </div>
          <div style="text-align:center;margin:.5rem 0">
            <label style="cursor:pointer">
              <input type="radio" name="sn-op" value="mul" checked> ×
              <input type="radio" name="sn-op" value="div" style="margin-left:1rem"> ÷
            </label>
          </div>
          <p style="margin-bottom:.5rem;font-size:.9rem;color:var(--color-text-muted)">Number 2: m₂ × 10ⁿ²</p>
          <div class="form-row">
            <input class="form-input" type="number" id="sn-op2-m" placeholder="m₂">
            <input class="form-input" type="number" id="sn-op2-n" placeholder="n₂">
          </div>
          <button class="btn btn--primary" id="sn-op-btn" style="width:100%;margin-top:.5rem">Calculate</button>
          <div class="result-box result-box--hidden" id="sn-op-result" style="margin-top:1rem">
            <div class="result-box__label">Result</div>
            <div class="result-box__value" id="sn-op-value">—</div>
          </div>
        </div>

        <div class="how-to" style="margin-top:1.5rem">
          <div class="how-to__title">Formulas</div>
          <div class="how-to__body">
            <p><strong>To Scientific:</strong> n = m × 10ᵏ where 1 ≤ |m| < 10</p>
            <p><strong>From Scientific:</strong> m × 10ⁿ = decimal form</p>
            <p><strong>Multiply:</strong> (m₁×m₂) × 10ⁿ¹⁺ⁿ²</p>
            <p><strong>Divide:</strong> (m₁/m₂) × 10ⁿ¹⁻ⁿ²</p>
          </div>
        </div>
      </div>
    </div>
  `}function f(e,o){if(e===0)return{mantissa:0,exponent:0};const u=Math.floor(Math.log10(Math.abs(e))),n=e/Math.pow(10,u);return{mantissa:o?parseFloat(n.toFixed(o)):n,exponent:u}}function v(e,o){return`${e} × 10^${o}`}function x(e){const o=e.querySelectorAll(".tab-btn"),u=e.querySelectorAll(".tab-panel");o.forEach(t=>{t.addEventListener("click",()=>{o.forEach(s=>{s.classList.remove("active"),s.setAttribute("aria-selected","false")}),u.forEach(s=>s.classList.remove("active")),t.classList.add("active"),t.setAttribute("aria-selected","true"),e.querySelector("#"+t.dataset.tab).classList.add("active")})});function n(){const t=parseFloat(e.querySelector("#sn-decimal").value),s=parseInt(e.querySelector("#sn-precision").value),l=e.querySelector("#sn-to-result"),a=e.querySelector("#sn-to-value");if(isNaN(t)){a.textContent="Please enter a number",l.classList.remove("result-box--hidden");return}const{mantissa:r,exponent:c}=f(t,s);a.textContent=v(r,c),l.classList.remove("result-box--hidden")}function m(){const t=parseFloat(e.querySelector("#sn-mantissa").value),s=parseFloat(e.querySelector("#sn-exp").value),l=e.querySelector("#sn-from-result"),a=e.querySelector("#sn-from-value");if(isNaN(t)||isNaN(s)){a.textContent="Please enter both values",l.classList.remove("result-box--hidden");return}const r=t*Math.pow(10,s);a.textContent=r.toLocaleString(),l.classList.remove("result-box--hidden")}function b(){const t=parseFloat(e.querySelector("#sn-op1-m").value),s=parseFloat(e.querySelector("#sn-op1-n").value),l=parseFloat(e.querySelector("#sn-op2-m").value),a=parseFloat(e.querySelector("#sn-op2-n").value),r=e.querySelector('input[name="sn-op"]:checked').value,c=e.querySelector("#sn-op-result"),p=e.querySelector("#sn-op-value");if(isNaN(t)||isNaN(s)||isNaN(l)||isNaN(a)){p.textContent="Please enter all values",c.classList.remove("result-box--hidden");return}if(r==="div"&&l===0){p.textContent="Cannot divide by zero",c.classList.remove("result-box--hidden");return}let i,d;for(r==="mul"?(i=t*l,d=s+a):(i=t/l,d=s-a);Math.abs(i)>=10;)i/=10,d+=1;for(;Math.abs(i)<1&&i!==0;)i*=10,d-=1;p.textContent=v(parseFloat(i.toFixed(6)),d),c.classList.remove("result-box--hidden")}e.querySelector("#sn-decimal").addEventListener("input",n),e.querySelector("#sn-precision").addEventListener("input",n),e.querySelector("#sn-mantissa").addEventListener("input",m),e.querySelector("#sn-exp").addEventListener("input",m),e.querySelector("#sn-op-btn").addEventListener("click",b)}export{x as bindEvents,y as render};
