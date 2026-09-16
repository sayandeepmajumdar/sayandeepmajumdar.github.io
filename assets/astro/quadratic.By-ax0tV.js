function f(e){e.innerHTML=`
    <div class="calc-panel">
      <div class="calc-panel__header">
        <span class="calc-panel__title">Quadratic Formula Calculator</span>
        <div class="calc-panel__header-icon calc-panel__header-icon--success">∫</div>
      </div>
      <div class="calc-panel__body">
        <p style="margin-bottom:1rem;color:var(--color-text-muted)">Solve ax² + bx + c = 0</p>
        
        <div class="form-row">
          <div class="form-group">
            <label class="form-label" for="quad-a">a (coefficient of x²)</label>
            <input class="form-input form-input--lg" type="number" id="quad-a" placeholder="e.g. 1" aria-label="Coefficient a">
          </div>
          <div class="form-group">
            <label class="form-label" for="quad-b">b (coefficient of x)</label>
            <input class="form-input form-input--lg" type="number" id="quad-b" placeholder="e.g. -3" aria-label="Coefficient b">
          </div>
          <div class="form-group">
            <label class="form-label" for="quad-c">c (constant)</label>
            <input class="form-input form-input--lg" type="number" id="quad-c" placeholder="e.g. 2" aria-label="Constant c">
          </div>
        </div>

        <button class="btn btn--primary btn--lg" id="quad-btn" style="width:100%" aria-label="Solve quadratic equation">Solve</button>

        <div class="result-box result-box--hidden" id="quad-result">
          <div class="result-box__label">Solutions</div>
          <div class="result-box__value" id="quad-value">—</div>
          <div id="quad-details" style="margin-top:.5rem;font-size:.9rem;color:var(--color-text-muted)"></div>
        </div>

        <div class="how-to" style="margin-top:1.5rem">
          <div class="how-to__title">Formula</div>
          <div class="how-to__body">
            <p>The quadratic formula finds roots of any quadratic equation:</p>
            <code style="display:block;background:var(--color-bg-subtle);padding:.75rem;border-radius:4px;margin:.5rem 0">
              x = (-b ± √(b² - 4ac)) / 2a
            </code>
            <p style="margin-top:.5rem"><strong>Discriminant:</strong> b² - 4ac determines the nature of roots:</p>
            <ul>
              <li>b² - 4ac &gt; 0 → Two real roots</li>
              <li>b² - 4ac = 0 → One real root (repeated)</li>
              <li>b² - 4ac &lt; 0 → Two complex roots</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  `}function q(e){const v=e.querySelector("#quad-btn"),c=e.querySelector("#quad-result"),d=e.querySelector("#quad-value"),u=e.querySelector("#quad-details");function p(){const i=parseFloat(e.querySelector("#quad-a").value),t=parseFloat(e.querySelector("#quad-b").value),m=parseFloat(e.querySelector("#quad-c").value);if(isNaN(i)||isNaN(t)||isNaN(m)){d.textContent="Please enter all values",u.textContent="",c.classList.remove("result-box--hidden");return}if(i===0){d.textContent="a cannot be zero (not quadratic)",u.textContent="For linear equations, use the form bx + c = 0",c.classList.remove("result-box--hidden");return}const a=t*t-4*i*m,x=Math.abs(a),b=Math.sqrt(x),l=2*i;let s,r;if(a>0){const o=(-t+b)/l,n=(-t-b)/l;s=`x₁ = ${o.toFixed(6)}, x₂ = ${n.toFixed(6)}`,r=`Discriminant: ${a} (two real roots)`}else if(a===0)s=`x = ${(-t/l).toFixed(6)}`,r="Discriminant: 0 (one repeated real root)";else{const o=-t/l,n=b/l;s=`x₁ = ${o.toFixed(4)} + ${n.toFixed(4)}i, x₂ = ${o.toFixed(4)} - ${n.toFixed(4)}i`,r=`Discriminant: ${a} (two complex roots)`}d.textContent=s,u.textContent=r,c.classList.remove("result-box--hidden")}v.addEventListener("click",p)}export{q as bindEvents,f as render};
