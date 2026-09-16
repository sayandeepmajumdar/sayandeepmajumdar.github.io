function h(t){t.innerHTML=`
    <div class="calc-panel">
      <div class="calc-panel__header">
        <span class="calc-panel__title">Ratio Calculator</span>
        <div class="calc-panel__header-icon">⚖️</div>
      </div>
      <div class="calc-panel__body">
        <div class="form-row">
          <div class="form-group">
            <label class="form-label" for="ratio-a">Value A</label>
            <input class="form-input form-input--lg" type="number" id="ratio-a" min="0" placeholder="e.g. 10" aria-label="Value A">
          </div>
          <div class="form-group">
            <label class="form-label" for="ratio-b">Value B</label>
            <input class="form-input form-input--lg" type="number" id="ratio-b" min="0" placeholder="e.g. 20" aria-label="Value B">
          </div>
        </div>

        <div class="form-group">
          <label class="form-label" for="ratio-scale">Scale to total of (optional)</label>
          <input class="form-input form-input--lg" type="number" id="ratio-scale" min="1" placeholder="e.g. 100" aria-label="Scale to total">
        </div>

        <button class="btn btn--primary btn--lg" id="ratio-btn" style="width:100%" aria-label="Calculate ratio">Calculate</button>

        <div class="result-box result-box--hidden" id="ratio-result">
          <div class="result-box__label">Ratio</div>
          <div class="result-box__value" id="ratio-value">—</div>
          <div id="ratio-details" style="margin-top:.5rem;font-size:.9rem;color:var(--color-text-muted)"></div>
        </div>

        <div class="how-to" style="margin-top:1.5rem">
          <div class="how-to__title">Formula</div>
          <div class="how-to__body">
            <p>A ratio compares two quantities. Simplifying a ratio divides both by their GCF.</p>
            <code style="display:block;background:var(--color-bg-subtle);padding:.75rem;border-radius:4px;margin:.5rem 0">
              Ratio = A : B = A/GCD : B/GCD
            </code>
            <p style="margin-top:.5rem"><strong>Example:</strong> 10:20 simplifies to 1:2 (divide both by GCD=10)</p>
          </div>
        </div>
      </div>
    </div>
  `}function g(t,e){for(t=Math.abs(t),e=Math.abs(e);e;){const l=e;e=t%e,t=l}return t}function x(t){const e=t.querySelector("#ratio-btn"),l=t.querySelector("#ratio-result"),i=t.querySelector("#ratio-value"),s=t.querySelector("#ratio-details");function v(){const r=parseFloat(t.querySelector("#ratio-a").value),a=parseFloat(t.querySelector("#ratio-b").value),o=parseFloat(t.querySelector("#ratio-scale").value);if(isNaN(r)||isNaN(a)){i.textContent="Please enter both values",s.textContent="",l.classList.remove("result-box--hidden");return}if(r<0||a<0){i.textContent="Values cannot be negative",s.textContent="",l.classList.remove("result-box--hidden");return}if(a===0){i.textContent="B cannot be zero",s.textContent="",l.classList.remove("result-box--hidden");return}const n=g(r,a),c=r/n,d=a/n,u=c/d;let p=`${c}:${d}`,b=`Simplified ratio (GCD = ${n})`;if(!isNaN(o)&&o>0){const m=c/u*o,f=d/u*o;b+=`. Scaled to ${o}: ${m.toFixed(2)}:${f.toFixed(2)}`}i.textContent=p,s.textContent=b,l.classList.remove("result-box--hidden")}e.addEventListener("click",v)}export{x as bindEvents,h as render};
