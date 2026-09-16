function _(e){e.innerHTML=`
    <div class="calc-panel">
      <div class="calc-panel__header">
        <span class="calc-panel__title">BMI Calculator</span>
        <div class="segment" id="bmi-unit-seg">
          <button class="segment__btn active" data-unit="metric" aria-label="Metric units">Metric</button>
          <button class="segment__btn" data-unit="imperial" aria-label="Imperial units">Imperial</button>
        </div>
      </div>
      <div class="calc-panel__body">

        <!-- Metric inputs -->
        <div id="bmi-metric">
          <div class="form-row">
            <div class="form-group">
              <label class="form-label" for="bmi-weight-kg">Weight (kg)</label>
              <input class="form-input form-input--lg" type="number" id="bmi-weight-kg" min="1" max="500" placeholder="70" aria-label="Weight in kilograms">
            </div>
            <div class="form-group">
              <label class="form-label" for="bmi-height-cm">Height (cm)</label>
              <input class="form-input form-input--lg" type="number" id="bmi-height-cm" min="1" max="300" placeholder="175" aria-label="Height in centimeters">
            </div>
          </div>
        </div>

        <!-- Imperial inputs -->
        <div id="bmi-imperial" style="display:none">
          <div class="form-group">
            <label class="form-label" for="bmi-weight-lbs">Weight (lbs)</label>
            <input class="form-input form-input--lg" type="number" id="bmi-weight-lbs" min="1" max="1000" placeholder="154" aria-label="Weight in pounds">
          </div>
          <div class="form-row">
            <div class="form-group">
              <label class="form-label" for="bmi-height-ft">Height (ft)</label>
              <input class="form-input form-input--lg" type="number" id="bmi-height-ft" min="1" max="9" placeholder="5" aria-label="Height feet">
            </div>
            <div class="form-group">
              <label class="form-label" for="bmi-height-in">Height (in)</label>
              <input class="form-input form-input--lg" type="number" id="bmi-height-in" min="0" max="11" placeholder="9" aria-label="Height inches">
            </div>
          </div>
        </div>

        <button class="btn btn--primary btn--lg" id="bmi-calc-btn" style="width:100%" aria-label="Calculate BMI">Calculate BMI</button>

        <!-- Result -->
        <div class="result-box result-box--hidden" id="bmi-result">
          <div class="result-box__label">Your BMI</div>
          <div class="result-box__value" id="bmi-value">—</div>
          <div id="bmi-badge-wrap" style="margin-top:.5rem"></div>

          <div class="bmi-scale" id="bmi-scale-wrap">
            <div class="bmi-scale__bar">
              <div class="bmi-scale__marker" id="bmi-marker" style="left:0%"></div>
            </div>
            <div class="bmi-scale__labels">
              <span>Under</span><span>Normal</span><span>Over</span><span>Obese</span>
            </div>
          </div>
        </div>

        <div class="how-to" style="margin-top:1.5rem">
          <div class="how-to__title">How to use</div>
          <div class="how-to__body">
            <ol>
              <li>Select your preferred unit system (Metric or Imperial).</li>
              <li>Enter your weight and height.</li>
              <li>Click <strong>Calculate BMI</strong> to see your result and category.</li>
            </ol>
            <p style="margin-top:.5rem">BMI = weight(kg) ÷ height(m)². Categories: Underweight &lt;18.5, Normal 18.5–24.9, Overweight 25–29.9, Obese ≥30.</p>
          </div>
        </div>
      </div>
    </div>
  `}function f({weightKg:e,heightM:i}){if(!e||!i||i<=0)return{bmi:null,category:""};const s=e/(i*i);let t,l;return s<18.5?(t="Underweight",l="under"):s<25?(t="Normal weight",l="normal"):s<30?(t="Overweight",l="over"):(t="Obese",l="obese"),{bmi:s.toFixed(1),category:t,badge:l}}function y(e){return(Math.max(10,Math.min(40,e))-10)/30*100}function w(e){const i=e.querySelector("#bmi-unit-seg"),s=e.querySelector("#bmi-metric"),t=e.querySelector("#bmi-imperial"),l=e.querySelector("#bmi-calc-btn"),o=e.querySelector("#bmi-result"),c=e.querySelector("#bmi-value"),b=e.querySelector("#bmi-badge-wrap"),d=e.querySelector("#bmi-marker");if(!l)return;let n="metric";i&&i.addEventListener("click",r=>{const a=r.target.closest("[data-unit]");a&&(n=a.dataset.unit,i.querySelectorAll(".segment__btn").forEach(m=>m.classList.remove("active")),a.classList.add("active"),s.style.display=n==="metric"?"":"none",t.style.display=n==="imperial"?"":"none")}),l.addEventListener("click",()=>{let r,a;if(n==="metric")r=parseFloat(e.querySelector("#bmi-weight-kg").value),a=parseFloat(e.querySelector("#bmi-height-cm").value)/100;else{const u=parseFloat(e.querySelector("#bmi-weight-lbs").value),v=parseFloat(e.querySelector("#bmi-height-ft").value)||0,h=parseFloat(e.querySelector("#bmi-height-in").value)||0;r=u*.453592,a=(v*12+h)*.0254}const{bmi:m,category:p,badge:g}=f({weightKg:r,heightM:a});if(!m){c.textContent="Invalid input",o.classList.remove("result-box--hidden"),b.innerHTML="";return}o.classList.remove("result-box--hidden"),c.textContent=m,b.innerHTML=`<span class="bmi-badge bmi-badge--${g}">${p}</span>`,d&&setTimeout(()=>{d.style.left=y(parseFloat(m))+"%"},50)})}export{w as bindEvents,f as calculate,_ as render};
