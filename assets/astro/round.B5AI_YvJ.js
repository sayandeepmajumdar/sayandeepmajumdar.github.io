function p(e){e.innerHTML=`
    <div class="calc-panel">
      <div class="calc-panel__header">
        <span class="calc-panel__title">Rounding Calculator</span>
        <div class="calc-panel__header-icon">○</div>
      </div>
      <div class="calc-panel__body">
        <div class="form-row">
          <div class="form-group">
            <label class="form-label" for="round-num">Enter a number</label>
            <input class="form-input form-input--lg" type="number" id="round-num" placeholder="e.g. 3.14159" aria-label="Number to round">
          </div>
          <div class="form-group">
            <label class="form-label" for="round-places">Decimal places</label>
            <input class="form-input form-input--lg" type="number" id="round-places" min="0" value="0" placeholder="e.g. 2" aria-label="Number of decimal places">
          </div>
        </div>

        <button class="btn btn--primary btn--lg" id="round-btn" style="width:100%" aria-label="Round number">Round</button>

        <div class="result-box result-box--hidden" id="round-result">
          <div class="result-box__label">Rounded</div>
          <div class="result-box__value" id="round-value">—</div>
          <div id="round-details" style="margin-top:.5rem;font-size:.9rem;color:var(--color-text-muted)"></div>
        </div>

        <div style="margin-top:1.5rem;display:grid;grid-template-columns:1fr 1fr;gap:1rem">
          <div class="form-group" style="margin-bottom:0">
            <button class="btn btn--secondary" id="round-floor" style="width:100%">Floor (↓)</button>
          </div>
          <div class="form-group" style="margin-bottom:0">
            <button class="btn btn--secondary" id="round-ceil" style="width:100%">Ceiling (↑)</button>
          </div>
        </div>

        <div class="how-to" style="margin-top:1.5rem">
          <div class="how-to__title">Formulas</div>
          <div class="how-to__body">
            <p><strong>Round:</strong> Round to nearest (0.5+ rounds up)</p>
            <p><strong>Floor:</strong> Round down to nearest integer</p>
            <p><strong>Ceiling:</strong> Round up to nearest integer</p>
            <code style="display:block;background:var(--color-bg-subtle);padding:.75rem;border-radius:4px;margin-top:.5rem">
              Round(x, n) = Math.round(x × 10ⁿ) / 10ⁿ
            </code>
          </div>
        </div>
      </div>
    </div>
  `}function b(e){const i=e.querySelector("#round-btn"),u=e.querySelector("#round-floor"),c=e.querySelector("#round-ceil"),l=e.querySelector("#round-result"),s=e.querySelector("#round-value"),d=e.querySelector("#round-details");function n(){return{num:parseFloat(e.querySelector("#round-num").value),places:parseInt(e.querySelector("#round-places").value)||0}}function r(t,o){if(isNaN(t)){s.textContent="Please enter a number",d.textContent="",l.classList.remove("result-box--hidden");return}s.textContent=t.toLocaleString(void 0,{maximumFractionDigits:10}),d.textContent=o,l.classList.remove("result-box--hidden")}i.addEventListener("click",()=>{const{num:t,places:o}=n(),a=Math.pow(10,o),m=Math.round(t*a)/a;r(m,`Rounded to ${o} decimal place${o!==1?"s":""}`)}),u.addEventListener("click",()=>{const{num:t}=n();r(Math.floor(t),"Floor: rounds down to nearest integer")}),c.addEventListener("click",()=>{const{num:t}=n();r(Math.ceil(t),"Ceiling: rounds up to nearest integer")})}export{b as bindEvents,p as render};
