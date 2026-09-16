function b(a){const s=new Date().toISOString().slice(0,10);a.innerHTML=`
    <div class="calc-panel">
      <div class="calc-panel__header">
        <span class="calc-panel__title">Age Calculator</span>
      </div>
      <div class="calc-panel__body">
        <div class="form-row">
          <div class="form-group">
            <label class="form-label" for="age-dob">Date of Birth</label>
            <input class="form-input" type="date" id="age-dob" max="${s}" aria-label="Date of birth">
          </div>
          <div class="form-group">
            <label class="form-label" for="age-asof">Calculate As Of</label>
            <input class="form-input" type="date" id="age-asof" value="${s}" max="${s}" aria-label="Calculate age as of date">
          </div>
        </div>

        <button class="btn btn--primary btn--lg" id="age-calc-btn" style="width:100%" aria-label="Calculate age">Calculate Age</button>

        <div class="result-box result-box--hidden" id="age-result">
          <div class="result-box__label">Your Age</div>
          <div class="result-box__value" id="age-main">—</div>
          <div class="result-box__sub" id="age-stats"></div>
        </div>

        <div class="how-to" style="margin-top:1.5rem">
          <div class="how-to__title">How to use</div>
          <div class="how-to__body">
            <ol>
              <li>Select your <strong>Date of Birth</strong>.</li>
              <li>Optionally change the <strong>As Of</strong> date (defaults to today).</li>
              <li>Click <strong>Calculate Age</strong>.</li>
            </ol>
            <p style="margin-top:.5rem">Results include exact age, days until next birthday, total days lived, and more.</p>
          </div>
        </div>
      </div>
    </div>
  `}function g({dob:a,asOf:s}){const e=new Date(a),t=new Date(s);if(isNaN(e)||isNaN(t)||e>t)return null;let i=t.getFullYear()-e.getFullYear(),o=t.getMonth()-e.getMonth(),r=t.getDate()-e.getDate();if(r<0){o--;const v=new Date(t.getFullYear(),t.getMonth(),0);r+=v.getDate()}o<0&&(i--,o+=12);const l=864e5,d=Math.floor((t-e)/l),c=i*12+o;let n=new Date(t.getFullYear(),e.getMonth(),e.getDate());n<=t&&n.setFullYear(n.getFullYear()+1);const u=Math.ceil((n-t)/l);return{years:i,months:o,days:r,totalDays:d,totalMonths:c,daysUntilBday:u}}function y(a){const s=a.querySelector("#age-calc-btn"),e=a.querySelector("#age-result"),t=a.querySelector("#age-main"),i=a.querySelector("#age-stats");s&&s.addEventListener("click",()=>{const o=a.querySelector("#age-dob").value,r=a.querySelector("#age-asof").value;if(!o||!r){t.textContent="Please fill both dates",e.classList.remove("result-box--hidden"),i.innerHTML="";return}const l=g({dob:o,asOf:r});if(!l){t.textContent="Invalid dates",e.classList.remove("result-box--hidden"),i.innerHTML="";return}e.classList.remove("result-box--hidden"),t.textContent=`${l.years} yrs  ${l.months} mo  ${l.days} days`,i.innerHTML=`
      <div class="result-stat">
        <div class="result-stat__label">Total Days</div>
        <div class="result-stat__value">${l.totalDays.toLocaleString()}</div>
      </div>
      <div class="result-stat">
        <div class="result-stat__label">Total Months</div>
        <div class="result-stat__value">${l.totalMonths.toLocaleString()}</div>
      </div>
      <div class="result-stat">
        <div class="result-stat__label">Days to Birthday 🎂</div>
        <div class="result-stat__value">${l.daysUntilBday}</div>
      </div>
    `})}export{y as bindEvents,g as calculate,b as render};
