function c(e){e.innerHTML=`
    <div class="calc-panel">
      <div class="calc-panel__header">
        <span class="calc-panel__title">Factor Calculator</span>
        <div class="calc-panel__header-icon calc-panel__header-icon--success">✱</div>
      </div>
      <div class="calc-panel__body">
        <div class="form-group">
          <label class="form-label" for="factor-num">Enter a positive integer</label>
          <input class="form-input form-input--lg" type="number" id="factor-num" min="1" placeholder="e.g. 60" aria-label="Number to factor">
        </div>

        <button class="btn btn--primary btn--lg" id="factor-btn" style="width:100%" aria-label="Find factors">Find Factors</button>

        <div class="result-box result-box--hidden" id="factor-result">
          <div class="result-box__label">Factors</div>
          <div class="result-box__value" id="factor-value">—</div>
          <div id="factor-details" style="margin-top:.5rem;font-size:.9rem;color:var(--color-text-muted)"></div>
        </div>

        <div class="how-to" style="margin-top:1.5rem">
          <div class="how-to__title">Formula</div>
          <div class="how-to__body">
            <p>Factors are integers that divide evenly into a number without leaving a remainder.</p>
            <code style="display:block;background:var(--color-bg-subtle);padding:.75rem;border-radius:4px;margin:.5rem 0">
              If d divides n evenly, then d is a factor of n
            </code>
            <p style="margin-top:.5rem"><strong>Example:</strong> Factors of 60 = 1, 2, 3, 4, 5, 6, 10, 12, 15, 20, 30, 60</p>
          </div>
        </div>
      </div>
    </div>
  `}function n(e){const a=[];for(let t=1;t<=Math.sqrt(e);t++)e%t===0&&(a.push(t),t!==e/t&&a.push(e/t));return a.sort((t,r)=>t-r)}function d(e){const a=e.querySelector("#factor-btn"),t=e.querySelector("#factor-result"),r=e.querySelector("#factor-value"),l=e.querySelector("#factor-details");function i(){const o=parseInt(e.querySelector("#factor-num").value);if(isNaN(o)||o<1){r.textContent="Please enter a positive integer",l.textContent="",t.classList.remove("result-box--hidden");return}if(o>1e7){r.textContent="Number too large",l.textContent="Maximum 10,000,000",t.classList.remove("result-box--hidden");return}const s=n(o);r.textContent=s.join(", "),l.textContent=`Total: ${s.length} factors`,t.classList.remove("result-box--hidden")}a.addEventListener("click",i)}export{d as bindEvents,c as render};
