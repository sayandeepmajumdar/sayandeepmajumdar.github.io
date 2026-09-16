function x(e,u=1e-6){if(Math.abs(e-Math.round(e))<u)return`${Math.round(e)}`;let l=1,n=0,s=0,p=1,c=e;do{let r=Math.floor(c),a=l;l=r*l+n,n=a,a=s,s=r*s+p,p=a,c=1/(c-r)}while(Math.abs(e-l/s)>e*u&&s<1e3);return`${l}/${s}`}function _(e){e.innerHTML=`
    <div class="calc-panel">
      <div class="calc-panel__header">
        <span class="calc-panel__title">Slope Calculator</span>
        <div class="segment" id="slope-mode-seg">
          <button class="segment__btn active" data-mode="points">Two Points (x, y)</button>
          <button class="segment__btn" data-mode="line">Line Equation</button>
        </div>
      </div>
      <div class="calc-panel__body">

        <!-- Two Points Form -->
        <div id="slope-form-points">
          <div style="font-size:.85rem;font-weight:600;color:var(--color-text-muted);margin-bottom:.5rem">Point 1 (x₁, y₁)</div>
          <div class="form-row">
            <div class="form-group">
              <label class="form-label" for="slope-x1">x₁</label>
              <input class="form-input form-input--lg" type="number" id="slope-x1" step="any" placeholder="2" value="2" aria-label="Point 1 x">
            </div>
            <div class="form-group">
              <label class="form-label" for="slope-y1">y₁</label>
              <input class="form-input form-input--lg" type="number" id="slope-y1" step="any" placeholder="3" value="3" aria-label="Point 1 y">
            </div>
          </div>

          <div style="font-size:.85rem;font-weight:600;color:var(--color-text-muted);margin-bottom:.5rem;margin-top:.25rem">Point 2 (x₂, y₂)</div>
          <div class="form-row">
            <div class="form-group">
              <label class="form-label" for="slope-x2">x₂</label>
              <input class="form-input form-input--lg" type="number" id="slope-x2" step="any" placeholder="6" value="6" aria-label="Point 2 x">
            </div>
            <div class="form-group">
              <label class="form-label" for="slope-y2">y₂</label>
              <input class="form-input form-input--lg" type="number" id="slope-y2" step="any" placeholder="11" value="11" aria-label="Point 2 y">
            </div>
          </div>
        </div>

        <!-- Line Equation Form -->
        <div id="slope-form-line" style="display:none">
          <div style="font-size:.85rem;font-weight:600;color:var(--color-text-muted);margin-bottom:.5rem">Standard Form: Ax + By = C</div>
          <div class="form-row--3 form-row">
            <div class="form-group">
              <label class="form-label" for="slope-coeff-a">Coefficient A</label>
              <input class="form-input form-input--lg" type="number" id="slope-coeff-a" step="any" placeholder="2" value="2">
            </div>
            <div class="form-group">
              <label class="form-label" for="slope-coeff-b">Coefficient B</label>
              <input class="form-input form-input--lg" type="number" id="slope-coeff-b" step="any" placeholder="-1" value="-1">
            </div>
            <div class="form-group">
              <label class="form-label" for="slope-coeff-c">Constant C</label>
              <input class="form-input form-input--lg" type="number" id="slope-coeff-c" step="any" placeholder="4" value="4">
            </div>
          </div>
        </div>

        <button class="btn btn--primary btn--lg" id="slope-calc-btn" style="width:100%" aria-label="Calculate Slope">Calculate Slope</button>

        <!-- Result Box -->
        <div class="result-box result-box--hidden" id="slope-result">
          <div class="result-box__label">Slope (m)</div>
          <div style="display:flex;align-items:baseline;gap:.5rem;flex-wrap:wrap">
            <div class="result-box__value" id="slope-val">—</div>
            <span id="slope-frac-val" style="font-size:1.2rem;font-family:var(--font-mono);color:var(--color-text-muted);font-weight:600"></span>
          </div>

          <div id="slope-badges-wrap" style="margin-top:.5rem;display:flex;flex-wrap:wrap;gap:.5rem"></div>

          <div class="result-box__sub" id="slope-stats"></div>

          <!-- Equations & Properties -->
          <div style="margin-top:1.25rem;padding:1rem 1.25rem;background:var(--color-surface);border:1px solid var(--color-border);border-radius:10px" id="slope-eq-box">
            <div style="font-size:.78rem;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:var(--color-accent);margin-bottom:.5rem">Line Equations &amp; Relations</div>
            <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(180px, 1fr));gap:.75rem;font-size:.875rem" id="slope-eq-grid"></div>
          </div>
        </div>

        <!-- How To Use -->
        <div class="how-to" style="margin-top:1.5rem">
          <div class="how-to__title">How to use</div>
          <div class="how-to__body">
            <ol>
              <li>Select <strong>Two Points</strong> mode to enter (x₁, y₁) and (x₂, y₂), or <strong>Line Equation</strong> to enter Ax + By = C.</li>
              <li>Click <strong>Calculate Slope</strong>.</li>
              <li>View the slope in decimal and fraction form, angle of inclination, grade percentage, slope-intercept equation, and perpendicular slope.</li>
            </ol>
            <p style="margin-top:.5rem">
              <strong>Formulas:</strong> Slope <code>m = (y₂ - y₁) / (x₂ - x₁) = Rise / Run</code> · Angle <code>θ = arctan(m)</code> · Grade <code>% = m × 100</code>.
            </p>
          </div>
        </div>

      </div>
    </div>
  `}function h(e){const{mode:u}=e;let l,n,s,p,c,r,a,i=!1,v=!1,b=null,o=null,t=null,d=null;if(u==="points"){if(n=parseFloat(e.x1),s=parseFloat(e.y1),p=parseFloat(e.x2),c=parseFloat(e.y2),isNaN(n)||isNaN(s)||isNaN(p)||isNaN(c))return null;if(o=c-s,t=p-n,b=Math.sqrt(t*t+o*o),Math.abs(t)<1e-9){if(Math.abs(o)<1e-9)return{error:"Both points are identical. Two distinct points are required to define a unique line."};i=!0,l=1/0,r=90,a=1/0}else Math.abs(o)<1e-9?(v=!0,l=0,r=0,a=0,d=s):(l=o/t,r=Math.atan(l)*(180/Math.PI),a=l*100,d=s-l*n)}else if(u==="line"){const y=parseFloat(e.A),m=parseFloat(e.B),g=parseFloat(e.C);if(isNaN(y)||isNaN(m)||isNaN(g))return null;if(Math.abs(y)<1e-9&&Math.abs(m)<1e-9)return{error:"Both A and B cannot be zero in Ax + By = C."};Math.abs(m)<1e-9?(i=!0,l=1/0,r=90,a=1/0,n=g/y):Math.abs(y)<1e-9?(v=!0,l=0,r=0,a=0,d=g/m):(l=-y/m,d=g/m,r=Math.atan(l)*(180/Math.PI),a=l*100)}let f=null;return!i&&!v?f=(-1/l).toFixed(4):i?f="0 (Horizontal)":f="Undefined (Vertical)",{m:i?"Undefined":l.toFixed(4),mExact:i?"Undefined":x(l),isVertical:i,isHorizontal:v,rise:o!==null?o.toFixed(3):null,run:t!==null?t.toFixed(3):null,distance:b!==null?b.toFixed(4):null,angleDeg:i?"90.00":r.toFixed(2),gradePct:i?"Undefined":Math.abs(a).toFixed(2),bIntercept:d!==null?d.toFixed(4):null,perpSlope:f,trend:i?"Vertical Line":v?"Horizontal Line":l>0?"Rising Line (Positive Slope)":"Falling Line (Negative Slope)"}}function L(e){const u=e.querySelector("#slope-mode-seg"),l=e.querySelector("#slope-calc-btn"),n=e.querySelector("#slope-result"),s=e.querySelector("#slope-val"),p=e.querySelector("#slope-frac-val"),c=e.querySelector("#slope-badges-wrap"),r=e.querySelector("#slope-stats"),a=e.querySelector("#slope-eq-grid");if(!l)return;let i="points";const v=e.querySelector("#slope-form-points"),b=e.querySelector("#slope-form-line");u&&u.addEventListener("click",o=>{const t=o.target.closest("[data-mode]");t&&(i=t.dataset.mode,u.querySelectorAll(".segment__btn").forEach(d=>d.classList.remove("active")),t.classList.add("active"),v.style.display=i==="points"?"":"none",b.style.display=i==="line"?"":"none")}),l.addEventListener("click",()=>{let o={mode:i};i==="points"?(o.x1=e.querySelector("#slope-x1").value,o.y1=e.querySelector("#slope-y1").value,o.x2=e.querySelector("#slope-x2").value,o.y2=e.querySelector("#slope-y2").value):(o.A=e.querySelector("#slope-coeff-a").value,o.B=e.querySelector("#slope-coeff-b").value,o.C=e.querySelector("#slope-coeff-c").value);const t=h(o);if(!t){s.textContent="Invalid input",n.classList.remove("result-box--hidden"),p.textContent="",c.innerHTML="",r.innerHTML="",a.innerHTML="";return}if(t.error){s.textContent="Error",n.classList.remove("result-box--hidden"),p.textContent="",c.innerHTML=`<span class="bmi-badge bmi-badge--obese">${t.error}</span>`,r.innerHTML="",a.innerHTML="";return}n.classList.remove("result-box--hidden"),s.textContent=t.m,p.textContent=t.isVertical?"":`(${t.mExact})`,c.innerHTML=`
      <span class="bmi-badge bmi-badge--normal">${t.trend}</span>
      <span class="bmi-badge bmi-badge--normal">Inclination: ${t.angleDeg}°</span>
    `,r.innerHTML=`
      <div class="result-stat"><div class="result-stat__label">Angle of Inclination</div><div class="result-stat__value">${t.angleDeg}°</div></div>
      <div class="result-stat"><div class="result-stat__label">Grade / Incline</div><div class="result-stat__value">${t.gradePct}%</div></div>
      ${t.distance?`<div class="result-stat"><div class="result-stat__label">Point Distance (d)</div><div class="result-stat__value">${t.distance}</div></div>`:""}
      ${t.rise!==null?`<div class="result-stat"><div class="result-stat__label">Rise (Δy) / Run (Δx)</div><div class="result-stat__value">${t.rise} / ${t.run}</div></div>`:""}
    `;let d="";if(t.isVertical)d=`x = ${o.x1||0}`;else{const f=parseFloat(t.bIntercept)>=0?`+ ${t.bIntercept}`:`- ${Math.abs(parseFloat(t.bIntercept))}`;d=`y = ${t.m}x ${f}`}a.innerHTML=`
      <div style="background:var(--color-surface-2);border-radius:8px;padding:.75rem">
        <div style="font-size:.72rem;font-weight:700;color:var(--color-text-muted)">SLOPE-INTERCEPT EQUATION</div>
        <div style="font-family:var(--font-mono);font-weight:700;margin-top:.25rem;color:var(--color-text)">${d}</div>
      </div>
      <div style="background:var(--color-surface-2);border-radius:8px;padding:.75rem">
        <div style="font-size:.72rem;font-weight:700;color:var(--color-text-muted)">PARALLEL LINE SLOPE</div>
        <div style="font-family:var(--font-mono);font-weight:700;margin-top:.25rem;color:var(--color-text)">m∥ = ${t.m}</div>
      </div>
      <div style="background:var(--color-surface-2);border-radius:8px;padding:.75rem">
        <div style="font-size:.72rem;font-weight:700;color:var(--color-text-muted)">PERPENDICULAR LINE SLOPE</div>
        <div style="font-family:var(--font-mono);font-weight:700;margin-top:.25rem;color:var(--color-text)">m⊥ = ${t.perpSlope}</div>
      </div>
    `})}export{L as bindEvents,h as calculate,_ as render};
