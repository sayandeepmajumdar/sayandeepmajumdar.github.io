function b(e){e.innerHTML=`
    <div class="calc-panel">
      <div class="calc-panel__header">
        <span class="calc-panel__title">Logarithm Calculator</span>
        <div class="calc-panel__header-icon">log</div>
      </div>
      <div class="calc-panel__body">
        <div class="tab-list" role="tablist">
          <button class="tab-btn active" role="tab" data-tab="log-mode1" aria-selected="true">log₁₀</button>
          <button class="tab-btn" role="tab" data-tab="log-mode2" aria-selected="false">log₂</button>
          <button class="tab-btn" role="tab" data-tab="log-mode3" aria-selected="false">ln</button>
          <button class="tab-btn" role="tab" data-tab="log-mode4" aria-selected="false">Custom</button>
        </div>

        <!-- Common Log (base 10) -->
        <div class="tab-panel active" id="log-mode1">
          <div class="form-group">
            <label class="form-label" for="log10-val">Enter value</label>
            <input class="form-input form-input--lg" type="number" id="log10-val" min="0" placeholder="e.g. 100" aria-label="Value for common log">
          </div>
          <div class="result-box result-box--hidden" id="log10-result">
            <div class="result-box__label">log₁₀</div>
            <div class="result-box__value" id="log10-value">—</div>
          </div>
        </div>

        <!-- Binary Log (base 2) -->
        <div class="tab-panel" id="log-mode2">
          <div class="form-group">
            <label class="form-label" for="log2-val">Enter value</label>
            <input class="form-input form-input--lg" type="number" id="log2-val" min="0" placeholder="e.g. 8" aria-label="Value for binary log">
          </div>
          <div class="result-box result-box--hidden" id="log2-result">
            <div class="result-box__label">log₂</div>
            <div class="result-box__value" id="log2-value">—</div>
          </div>
        </div>

        <!-- Natural Log (base e) -->
        <div class="tab-panel" id="log-mode3">
          <div class="form-group">
            <label class="form-label" for="ln-val">Enter value</label>
            <input class="form-input form-input--lg" type="number" id="ln-val" min="0" placeholder="e.g. 2.71828" aria-label="Value for natural log">
          </div>
          <div class="result-box result-box--hidden" id="ln-result">
            <div class="result-box__label">ln</div>
            <div class="result-box__value" id="ln-value">—</div>
          </div>
        </div>

        <!-- Custom Base -->
        <div class="tab-panel" id="log-mode4">
          <div class="form-row">
            <div class="form-group">
              <label class="form-label" for="log-base">Base</label>
              <input class="form-input form-input--lg" type="number" id="log-base" min="0" placeholder="e.g. 5" aria-label="Logarithm base">
            </div>
            <div class="form-group">
              <label class="form-label" for="log-custom-val">Value</label>
              <input class="form-input form-input--lg" type="number" id="log-custom-val" min="0" placeholder="e.g. 25" aria-label="Value for custom log">
            </div>
          </div>
          <div class="result-box result-box--hidden" id="log-custom-result">
            <div class="result-box__label">log<sub id="log-base-sub"></sub></div>
            <div class="result-box__value" id="log-custom-value">—</div>
          </div>
        </div>

        <div class="how-to" style="margin-top:1.5rem">
          <div class="how-to__title">Formula</div>
          <div class="how-to__body">
            <p>A logarithm answers: "What exponent produces this value?"</p>
            <code style="display:block;background:var(--color-bg-subtle);padding:.75rem;border-radius:4px;margin:.5rem 0">
              logₐ(x) = y  means  aʸ = x
            </code>
            <p style="margin-top:.5rem"><strong>Example:</strong> log₁₀(100) = 2 because 10² = 100</p>
          </div>
        </div>
      </div>
    </div>
  `}function g(e){const s=e.querySelectorAll(".tab-btn"),i=e.querySelectorAll(".tab-panel");s.forEach(l=>{l.addEventListener("click",()=>{s.forEach(a=>{a.classList.remove("active"),a.setAttribute("aria-selected","false")}),i.forEach(a=>a.classList.remove("active")),l.classList.add("active"),l.setAttribute("aria-selected","true"),e.querySelector("#"+l.dataset.tab).classList.add("active")})});function d(){const l=parseFloat(e.querySelector("#log10-val").value),a=e.querySelector("#log10-result"),t=e.querySelector("#log10-value");!isNaN(l)&&l>0?(t.textContent=Math.log10(l).toFixed(6),a.classList.remove("result-box--hidden")):(t.textContent=l===0?"-∞":"Invalid input",a.classList.remove("result-box--hidden"))}function u(){const l=parseFloat(e.querySelector("#log2-val").value),a=e.querySelector("#log2-result"),t=e.querySelector("#log2-value");!isNaN(l)&&l>0?(t.textContent=Math.log2(l).toFixed(6),a.classList.remove("result-box--hidden")):(t.textContent=l===0?"-∞":"Invalid input",a.classList.remove("result-box--hidden"))}function c(){const l=parseFloat(e.querySelector("#ln-val").value),a=e.querySelector("#ln-result"),t=e.querySelector("#ln-value");!isNaN(l)&&l>0?(t.textContent=Math.log(l).toFixed(6),a.classList.remove("result-box--hidden")):(t.textContent=l===0?"-∞":"Invalid input",a.classList.remove("result-box--hidden"))}function o(){const l=parseFloat(e.querySelector("#log-base").value),a=parseFloat(e.querySelector("#log-custom-val").value),t=e.querySelector("#log-custom-result"),r=e.querySelector("#log-custom-value"),v=e.querySelector("#log-base-sub");if(!isNaN(l)&&!isNaN(a)&&l>0&&l!==1&&a>0){const n=Math.log(a)/Math.log(l);r.textContent=n.toFixed(6),v.textContent=l,t.classList.remove("result-box--hidden")}else r.textContent="Invalid (base > 0, base ≠ 1, value > 0)",t.classList.remove("result-box--hidden")}e.querySelector("#log10-val").addEventListener("input",d),e.querySelector("#log2-val").addEventListener("input",u),e.querySelector("#ln-val").addEventListener("input",c),e.querySelector("#log-base").addEventListener("input",o),e.querySelector("#log-custom-val").addEventListener("input",o)}export{g as bindEvents,b as render};
