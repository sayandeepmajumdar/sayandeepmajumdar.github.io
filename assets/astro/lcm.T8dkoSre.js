function m(e){e.innerHTML=`
    <div class="calc-panel">
      <div class="calc-panel__header">
        <span class="calc-panel__title">Least Common Multiple</span>
        <div class="calc-panel__header-icon">🔢</div>
      </div>
      <div class="calc-panel__body">
        <div class="form-group">
          <label class="form-label" for="lcm-nums">Enter numbers (comma-separated)</label>
          <input class="form-input form-input--lg" type="text" id="lcm-nums" placeholder="e.g. 12, 15, 20" aria-label="Numbers to find LCM">
        </div>

        <button class="btn btn--primary btn--lg" id="lcm-btn" style="width:100%" aria-label="Calculate LCM">Calculate</button>

        <div class="result-box result-box--hidden" id="lcm-result">
          <div class="result-box__label">LCM</div>
          <div class="result-box__value" id="lcm-value">—</div>
          <div id="lcm-details" style="margin-top:.5rem;font-size:.9rem;color:var(--color-text-muted)"></div>
        </div>

        <div class="how-to" style="margin-top:1.5rem">
          <div class="how-to__title">Formula</div>
          <div class="how-to__body">
            <p>The LCM is the smallest positive number that is a multiple of all given numbers.</p>
            <code style="display:block;background:var(--color-bg-subtle);padding:.75rem;border-radius:4px;margin:.5rem 0">
              LCM(a, b) = |a × b| / GCD(a, b)
            </code>
            <p style="margin-top:.5rem"><strong>Example:</strong> LCM(12, 15) = 60 (12×15/3 = 180/3)</p>
          </div>
        </div>
      </div>
    </div>
  `}function c(e,t){for(e=Math.abs(e),t=Math.abs(t);t;){const n=t;t=e%t,e=n}return e}function d(e,t){return e===0||t===0?0:Math.abs(e*t)/c(e,t)}function v(e){const t=e.querySelector("#lcm-btn"),n=e.querySelector("#lcm-result"),a=e.querySelector("#lcm-value"),i=e.querySelector("#lcm-details");function o(){const l=e.querySelector("#lcm-nums").value.split(",").map(s=>parseInt(s.trim())).filter(s=>!isNaN(s));if(l.length===0){a.textContent="Please enter at least one number",i.textContent="",n.classList.remove("result-box--hidden");return}if(l.length===1){a.textContent=l[0],i.textContent="LCM of a single number is the number itself",n.classList.remove("result-box--hidden");return}let r=l[0];for(let s=1;s<l.length;s++)r=d(r,l[s]);a.textContent=r.toLocaleString(),i.textContent=`LCM of [${l.join(", ")}]`,n.classList.remove("result-box--hidden")}t.addEventListener("click",o)}export{v as bindEvents,m as render};
