const m=Math.PI/180,g=180/Math.PI;function h(e){e.innerHTML=`
    <div class="calc-panel">
      <div class="calc-panel__header">
        <span class="calc-panel__title">Right Triangle Calculator</span>
        <div class="segment" id="rt-combo-seg" style="overflow-x:auto;max-width:100%">
          <button class="segment__btn active" data-combo="two-legs">2 Legs (a, b)</button>
          <button class="segment__btn" data-combo="leg-hyp">Leg &amp; Hyp (a, c)</button>
          <button class="segment__btn" data-combo="leg-angle">Leg &amp; Angle (a, α)</button>
          <button class="segment__btn" data-combo="hyp-angle">Hyp &amp; Angle (c, α)</button>
          <button class="segment__btn" data-combo="area-leg">Area &amp; Leg (A, a)</button>
        </div>
      </div>
      <div class="calc-panel__body">

        <!-- 2 Legs Form -->
        <div id="rt-form-two-legs">
          <div class="form-row">
            <div class="form-group">
              <label class="form-label" for="rt-2l-a">Leg a (adjacent to β)</label>
              <input class="form-input form-input--lg" type="number" id="rt-2l-a" min="0.001" step="any" placeholder="3" value="3">
            </div>
            <div class="form-group">
              <label class="form-label" for="rt-2l-b">Leg b (adjacent to α)</label>
              <input class="form-input form-input--lg" type="number" id="rt-2l-b" min="0.001" step="any" placeholder="4" value="4">
            </div>
          </div>
        </div>

        <!-- Leg & Hyp Form -->
        <div id="rt-form-leg-hyp" style="display:none">
          <div class="form-row">
            <div class="form-group">
              <label class="form-label" for="rt-lh-a">Leg a</label>
              <input class="form-input form-input--lg" type="number" id="rt-lh-a" min="0.001" step="any" placeholder="6" value="6">
            </div>
            <div class="form-group">
              <label class="form-label" for="rt-lh-c">Hypotenuse c</label>
              <input class="form-input form-input--lg" type="number" id="rt-lh-c" min="0.001" step="any" placeholder="10" value="10">
            </div>
          </div>
        </div>

        <!-- Leg & Angle Form -->
        <div id="rt-form-leg-angle" style="display:none">
          <div class="form-row">
            <div class="form-group">
              <label class="form-label" for="rt-la-a">Leg a</label>
              <input class="form-input form-input--lg" type="number" id="rt-la-a" min="0.001" step="any" placeholder="5" value="5">
            </div>
            <div class="form-group">
              <label class="form-label" for="rt-la-alpha">Angle α (degrees, opposite a)</label>
              <input class="form-input form-input--lg" type="number" id="rt-la-alpha" min="0.001" max="89.999" step="any" placeholder="30" value="30">
            </div>
          </div>
        </div>

        <!-- Hyp & Angle Form -->
        <div id="rt-form-hyp-angle" style="display:none">
          <div class="form-row">
            <div class="form-group">
              <label class="form-label" for="rt-ha-c">Hypotenuse c</label>
              <input class="form-input form-input--lg" type="number" id="rt-ha-c" min="0.001" step="any" placeholder="12" value="12">
            </div>
            <div class="form-group">
              <label class="form-label" for="rt-ha-alpha">Angle α (degrees)</label>
              <input class="form-input form-input--lg" type="number" id="rt-ha-alpha" min="0.001" max="89.999" step="any" placeholder="45" value="45">
            </div>
          </div>
        </div>

        <!-- Area & Leg Form -->
        <div id="rt-form-area-leg" style="display:none">
          <div class="form-row">
            <div class="form-group">
              <label class="form-label" for="rt-al-area">Area (A)</label>
              <input class="form-input form-input--lg" type="number" id="rt-al-area" min="0.001" step="any" placeholder="24" value="24">
            </div>
            <div class="form-group">
              <label class="form-label" for="rt-al-a">Leg a</label>
              <input class="form-input form-input--lg" type="number" id="rt-al-a" min="0.001" step="any" placeholder="6" value="6">
            </div>
          </div>
        </div>

        <button class="btn btn--primary btn--lg" id="rt-calc-btn" style="width:100%" aria-label="Calculate Right Triangle">Calculate Right Triangle</button>

        <!-- Result Box -->
        <div class="result-box result-box--hidden" id="rt-result">
          <div class="result-box__label">Area of Right Triangle</div>
          <div class="result-box__value" id="rt-area-val">—</div>

          <div id="rt-badges-wrap" style="margin-top:.5rem;display:flex;flex-wrap:wrap;gap:.5rem"></div>

          <div class="result-box__sub" id="rt-stats"></div>

          <!-- Trigonometry Ratios Grid -->
          <div style="margin-top:1.25rem;padding:1rem 1.25rem;background:var(--color-surface);border:1px solid var(--color-border);border-radius:10px">
            <div style="font-size:.78rem;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:var(--color-accent);margin-bottom:.75rem">Sides, Angles &amp; Trigonometric Functions</div>
            <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(130px, 1fr));gap:.75rem" id="rt-trig-grid"></div>
          </div>
        </div>

        <!-- How To Use -->
        <div class="how-to" style="margin-top:1.5rem">
          <div class="how-to__title">How to use</div>
          <div class="how-to__body">
            <ol>
              <li>Select your known side or angle combination (Two Legs, Leg &amp; Hypotenuse, Leg &amp; Angle, etc.).</li>
              <li>Enter the positive values. Angles are entered in degrees (&lt; 90°).</li>
              <li>Click <strong>Calculate Right Triangle</strong> to solve for all remaining sides, angles, area, perimeter, and trigonometric ratios (sin, cos, tan).</li>
            </ol>
            <p style="margin-top:.5rem">
              <strong>Core Rules:</strong> <code>a² + b² = c²</code> · <code>α + β = 90°</code> · <code>sin(α) = a/c</code> · <code>cos(α) = b/c</code> · <code>tan(α) = a/b</code>.
            </p>
          </div>
        </div>

      </div>
    </div>
  `}function y(e){const{combo:d}=e;let t,r,a,l,i;if(d==="two-legs"){if(t=parseFloat(e.a),r=parseFloat(e.b),!t||!r||t<=0||r<=0)return null;a=Math.sqrt(t*t+r*r),l=Math.atan(t/r)*g,i=90-l}else if(d==="leg-hyp"){if(t=parseFloat(e.a),a=parseFloat(e.c),!t||!a||t<=0||a<=0)return null;if(a<=t)return{error:"Hypotenuse (c) must be strictly greater than Leg (a)."};r=Math.sqrt(a*a-t*t),l=Math.asin(t/a)*g,i=90-l}else if(d==="leg-angle"){if(t=parseFloat(e.a),l=parseFloat(e.alpha),!t||!l||t<=0||l<=0||l>=90)return null;i=90-l,r=t/Math.tan(l*m),a=t/Math.sin(l*m)}else if(d==="hyp-angle"){if(a=parseFloat(e.c),l=parseFloat(e.alpha),!a||!l||a<=0||l<=0||l>=90)return null;i=90-l,t=a*Math.sin(l*m),r=a*Math.cos(l*m)}else if(d==="area-leg"){const p=parseFloat(e.area);if(t=parseFloat(e.a),!p||!t||p<=0||t<=0)return null;r=2*p/t,a=Math.sqrt(t*t+r*r),l=Math.atan(t/r)*g,i=90-l}else return null;const u=.5*t*r,n=t+r+a,v=(t+r-a)/2,s=a/2,o=t*r/a,c=t/a,f=r/a,b=t/r;return{a:t.toFixed(3),b:r.toFixed(3),c:a.toFixed(3),alpha:l.toFixed(2),beta:i.toFixed(2),area:u.toFixed(3),perimeter:n.toFixed(3),inradius:v.toFixed(3),circumradius:s.toFixed(3),altitude:o.toFixed(3),sinA:c.toFixed(4),cosA:f.toFixed(4),tanA:b.toFixed(4)}}function x(e){const d=e.querySelector("#rt-combo-seg"),t=e.querySelector("#rt-calc-btn"),r=e.querySelector("#rt-result"),a=e.querySelector("#rt-area-val"),l=e.querySelector("#rt-badges-wrap"),i=e.querySelector("#rt-stats"),u=e.querySelector("#rt-trig-grid");if(!t)return;let n="two-legs";const v={"two-legs":e.querySelector("#rt-form-two-legs"),"leg-hyp":e.querySelector("#rt-form-leg-hyp"),"leg-angle":e.querySelector("#rt-form-leg-angle"),"hyp-angle":e.querySelector("#rt-form-hyp-angle"),"area-leg":e.querySelector("#rt-form-area-leg")};d&&d.addEventListener("click",s=>{const o=s.target.closest("[data-combo]");o&&(n=o.dataset.combo,d.querySelectorAll(".segment__btn").forEach(c=>c.classList.remove("active")),o.classList.add("active"),Object.keys(v).forEach(c=>{v[c]&&(v[c].style.display=c===n?"":"none")}))}),t.addEventListener("click",()=>{let s={combo:n};n==="two-legs"?(s.a=e.querySelector("#rt-2l-a").value,s.b=e.querySelector("#rt-2l-b").value):n==="leg-hyp"?(s.a=e.querySelector("#rt-lh-a").value,s.c=e.querySelector("#rt-lh-c").value):n==="leg-angle"?(s.a=e.querySelector("#rt-la-a").value,s.alpha=e.querySelector("#rt-la-alpha").value):n==="hyp-angle"?(s.c=e.querySelector("#rt-ha-c").value,s.alpha=e.querySelector("#rt-ha-alpha").value):n==="area-leg"&&(s.area=e.querySelector("#rt-al-area").value,s.a=e.querySelector("#rt-al-a").value);const o=y(s);if(!o){a.textContent="Invalid input",r.classList.remove("result-box--hidden"),l.innerHTML="",i.innerHTML="",u.innerHTML="";return}if(o.error){a.textContent="Calculation Error",r.classList.remove("result-box--hidden"),l.innerHTML=`<span class="bmi-badge bmi-badge--obese">${o.error}</span>`,i.innerHTML="",u.innerHTML="";return}r.classList.remove("result-box--hidden"),a.textContent=parseFloat(o.area).toLocaleString(),l.innerHTML=`
      <span class="bmi-badge bmi-badge--normal">Right Triangle (γ = 90°)</span>
      <span class="bmi-badge bmi-badge--normal">α = ${o.alpha}° · β = ${o.beta}°</span>
    `,i.innerHTML=`
      <div class="result-stat"><div class="result-stat__label">Perimeter (P)</div><div class="result-stat__value">${o.perimeter}</div></div>
      <div class="result-stat"><div class="result-stat__label">Altitude to Hypotenuse</div><div class="result-stat__value">${o.altitude}</div></div>
      <div class="result-stat"><div class="result-stat__label">Inradius (r)</div><div class="result-stat__value">${o.inradius}</div></div>
      <div class="result-stat"><div class="result-stat__label">Circumradius (R)</div><div class="result-stat__value">${o.circumradius}</div></div>
    `,u.innerHTML=`
      <div style="background:var(--color-surface-2);border-radius:8px;padding:.6rem .75rem">
        <div style="font-size:.72rem;font-weight:700;color:var(--color-text-muted)">LEG a</div>
        <div style="font-family:var(--font-mono);font-size:1.1rem;font-weight:700;color:var(--color-text)">${o.a}</div>
      </div>
      <div style="background:var(--color-surface-2);border-radius:8px;padding:.6rem .75rem">
        <div style="font-size:.72rem;font-weight:700;color:var(--color-text-muted)">LEG b</div>
        <div style="font-family:var(--font-mono);font-size:1.1rem;font-weight:700;color:var(--color-text)">${o.b}</div>
      </div>
      <div style="background:var(--color-surface-2);border-radius:8px;padding:.6rem .75rem">
        <div style="font-size:.72rem;font-weight:700;color:var(--color-text-muted)">HYPOTENUSE c</div>
        <div style="font-family:var(--font-mono);font-size:1.1rem;font-weight:700;color:var(--color-text)">${o.c}</div>
      </div>
      <div style="background:var(--color-surface-2);border-radius:8px;padding:.6rem .75rem">
        <div style="font-size:.72rem;font-weight:700;color:var(--color-text-muted)">sin(α)</div>
        <div style="font-family:var(--font-mono);font-size:1.1rem;font-weight:700;color:var(--color-text)">${o.sinA}</div>
      </div>
      <div style="background:var(--color-surface-2);border-radius:8px;padding:.6rem .75rem">
        <div style="font-size:.72rem;font-weight:700;color:var(--color-text-muted)">cos(α)</div>
        <div style="font-family:var(--font-mono);font-size:1.1rem;font-weight:700;color:var(--color-text)">${o.cosA}</div>
      </div>
      <div style="background:var(--color-surface-2);border-radius:8px;padding:.6rem .75rem">
        <div style="font-size:.72rem;font-weight:700;color:var(--color-text-muted)">tan(α)</div>
        <div style="font-family:var(--font-mono);font-size:1.1rem;font-weight:700;color:var(--color-text)">${o.tanA}</div>
      </div>
    `})}export{x as bindEvents,y as calculate,h as render};
