function u(e){e.innerHTML=`
    <div class="calc-panel">
      <div class="calc-panel__header">
        <span class="calc-panel__title">Greatest Common Factor</span>
        <div class="calc-panel__header-icon">÷</div>
      </div>
      <div class="calc-panel__body">
        <div class="form-group">
          <label class="form-label" for="gcf-nums">Enter numbers (comma-separated)</label>
          <input class="form-input form-input--lg" type="text" id="gcf-nums" placeholder="e.g. 48, 60, 72" aria-label="Numbers to find GCF">
        </div>

        <button class="btn btn--primary btn--lg" id="gcf-btn" style="width:100%" aria-label="Calculate GCF">Calculate</button>

        <div class="result-box result-box--hidden" id="gcf-result">
          <div class="result-box__label">GCF (GCD)</div>
          <div class="result-box__value" id="gcf-value">—</div>
          <div id="gcf-details" style="margin-top:.5rem;font-size:.9rem;color:var(--color-text-muted)"></div>
        </div>

        <div class="how-to" style="margin-top:1.5rem">
          <div class="how-to__title">Formula</div>
          <div class="how-to__body">
            <p>The GCF (also GCD) is the largest positive integer that divides all given numbers.</p>
            <code style="display:block;background:var(--color-bg-subtle);padding:.75rem;border-radius:4px;margin:.5rem 0">
              GCF(a, b) = GCF(b, a mod b)<br>
              (Euclidean algorithm)
            </code>
            <p style="margin-top:.5rem"><strong>Example:</strong> GCF(48, 60) = 12</p>
          </div>
        </div>
      </div>
    </div>
  `}function c(e,t){for(e=Math.abs(e),t=Math.abs(t);t;){const a=t;t=e%t,e=a}return e}function m(e){const t=e.querySelector("#gcf-btn"),a=e.querySelector("#gcf-result"),n=e.querySelector("#gcf-value"),r=e.querySelector("#gcf-details");function o(){const l=e.querySelector("#gcf-nums").value.split(",").map(s=>parseInt(s.trim())).filter(s=>!isNaN(s));if(l.length===0){n.textContent="Please enter at least one number",r.textContent="",a.classList.remove("result-box--hidden");return}if(l.length===1){n.textContent=Math.abs(l[0]),r.textContent="GCF of a single number is the number itself",a.classList.remove("result-box--hidden");return}let i=l[0];for(let s=1;s<l.length&&(i=c(i,l[s]),i!==1);s++);n.textContent=i.toLocaleString(),r.textContent=`GCF of [${l.join(", ")}]`,a.classList.remove("result-box--hidden")}t.addEventListener("click",o)}export{m as bindEvents,u as render};
