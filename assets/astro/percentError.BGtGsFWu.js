function d(e){e.innerHTML=`
    <div class="calc-panel">
      <div class="calc-panel__header">
        <span class="calc-panel__title">Percent Error Calculator</span>
        <div class="calc-panel__header-icon calc-panel__header-icon--warning">📐</div>
      </div>
      <div class="calc-panel__body">
        <div class="form-row">
          <div class="form-group">
            <label class="form-label" for="pe-actual">Actual Value (Accepted)</label>
            <input class="form-input form-input--lg" type="number" id="pe-actual" placeholder="e.g. 9.8" aria-label="Actual or accepted value">
          </div>
          <div class="form-group">
            <label class="form-label" for="pe-experimental">Experimental Value (Measured)</label>
            <input class="form-input form-input--lg" type="number" id="pe-experimental" placeholder="e.g. 9.5" aria-label="Experimental or measured value">
          </div>
        </div>

        <button class="btn btn--primary btn--lg" id="pe-btn" style="width:100%" aria-label="Calculate percent error">Calculate</button>

        <div class="result-box result-box--hidden" id="pe-result">
          <div class="result-box__label">Percent Error</div>
          <div class="result-box__value" id="pe-value">—</div>
          <div id="pe-details" style="margin-top:.5rem;font-size:.9rem;color:var(--color-text-muted)"></div>
        </div>

        <div class="how-to" style="margin-top:1.5rem">
          <div class="how-to__title">Formula</div>
          <div class="how-to__body">
            <p>Percent Error measures how inaccurate a measured value is compared to an accepted (true) value.</p>
            <code style="display:block;background:var(--color-bg-subtle);padding:.75rem;border-radius:4px;margin:.5rem 0">
              Percent Error = |(Actual - Experimental) / Actual| × 100%
            </code>
            <p style="margin-top:.5rem">The vertical bars (| |) indicate absolute value, so the result is always positive.</p>
          </div>
        </div>
      </div>
    </div>
  `}function u({actual:e,experimental:r}){return e===0?{percentError:null,error:"Actual value cannot be zero"}:{percentError:Math.abs((e-r)/e)*100,absoluteError:Math.abs(e-r)}}function p(e){const r=e.querySelector("#pe-btn"),l=e.querySelector("#pe-result"),t=e.querySelector("#pe-value"),a=e.querySelector("#pe-details");function i(){const o=parseFloat(e.querySelector("#pe-actual").value),s=parseFloat(e.querySelector("#pe-experimental").value);if(isNaN(o)||isNaN(s)){t.textContent="Please enter both values",a.textContent="",l.classList.remove("result-box--hidden");return}const{percentError:c,absoluteError:n}=u({actual:o,experimental:s});if(c===null){t.textContent="Actual value cannot be zero",a.textContent="",l.classList.remove("result-box--hidden");return}t.textContent=c.toFixed(4)+"%",a.textContent=`Absolute Error: ${n.toFixed(4)}`,l.classList.remove("result-box--hidden")}r.addEventListener("click",i)}export{p as bindEvents,u as calculate,d as render};
