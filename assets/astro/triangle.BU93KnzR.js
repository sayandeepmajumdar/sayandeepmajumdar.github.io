const b=Math.PI/180,y=180/Math.PI;function A(t){t.innerHTML=`
    <div class="calc-panel">
      <div class="calc-panel__header">
        <span class="calc-panel__title">Triangle Calculator</span>
        <div class="segment" id="tri-mode-seg">
          <button class="segment__btn active" data-mode="sss" aria-label="Three Sides SSS">SSS (3 Sides)</button>
          <button class="segment__btn" data-mode="sas" aria-label="Side Angle Side SAS">SAS</button>
          <button class="segment__btn" data-mode="asa" aria-label="Angle Side Angle ASA">ASA</button>
          <button class="segment__btn" data-mode="bh" aria-label="Base and Height">Base &amp; Height</button>
        </div>
      </div>
      <div class="calc-panel__body">

        <!-- SSS Inputs -->
        <div id="tri-form-sss">
          <div class="form-row--3 form-row">
            <div class="form-group">
              <label class="form-label" for="tri-sss-a">Side a</label>
              <input class="form-input form-input--lg" type="number" id="tri-sss-a" min="0.001" step="any" placeholder="5" value="5" aria-label="Side a">
            </div>
            <div class="form-group">
              <label class="form-label" for="tri-sss-b">Side b</label>
              <input class="form-input form-input--lg" type="number" id="tri-sss-b" min="0.001" step="any" placeholder="6" value="6" aria-label="Side b">
            </div>
            <div class="form-group">
              <label class="form-label" for="tri-sss-c">Side c</label>
              <input class="form-input form-input--lg" type="number" id="tri-sss-c" min="0.001" step="any" placeholder="7" value="7" aria-label="Side c">
            </div>
          </div>
        </div>

        <!-- SAS Inputs -->
        <div id="tri-form-sas" style="display:none">
          <div class="form-row--3 form-row">
            <div class="form-group">
              <label class="form-label" for="tri-sas-a">Side a</label>
              <input class="form-input form-input--lg" type="number" id="tri-sas-a" min="0.001" step="any" placeholder="5" value="5">
            </div>
            <div class="form-group">
              <label class="form-label" for="tri-sas-gamma">Angle γ (degrees)</label>
              <input class="form-input form-input--lg" type="number" id="tri-sas-gamma" min="0.001" max="179.999" step="any" placeholder="60" value="60">
            </div>
            <div class="form-group">
              <label class="form-label" for="tri-sas-b">Side b</label>
              <input class="form-input form-input--lg" type="number" id="tri-sas-b" min="0.001" step="any" placeholder="7" value="7">
            </div>
          </div>
        </div>

        <!-- ASA Inputs -->
        <div id="tri-form-asa" style="display:none">
          <div class="form-row--3 form-row">
            <div class="form-group">
              <label class="form-label" for="tri-asa-alpha">Angle α (degrees)</label>
              <input class="form-input form-input--lg" type="number" id="tri-asa-alpha" min="0.001" max="179.999" step="any" placeholder="45" value="45">
            </div>
            <div class="form-group">
              <label class="form-label" for="tri-asa-c">Side c</label>
              <input class="form-input form-input--lg" type="number" id="tri-asa-c" min="0.001" step="any" placeholder="10" value="10">
            </div>
            <div class="form-group">
              <label class="form-label" for="tri-asa-beta">Angle β (degrees)</label>
              <input class="form-input form-input--lg" type="number" id="tri-asa-beta" min="0.001" max="179.999" step="any" placeholder="65" value="65">
            </div>
          </div>
        </div>

        <!-- Base & Height Inputs -->
        <div id="tri-form-bh" style="display:none">
          <div class="form-row">
            <div class="form-group">
              <label class="form-label" for="tri-bh-b">Base (b)</label>
              <input class="form-input form-input--lg" type="number" id="tri-bh-b" min="0.001" step="any" placeholder="8" value="8">
            </div>
            <div class="form-group">
              <label class="form-label" for="tri-bh-h">Height (h)</label>
              <input class="form-input form-input--lg" type="number" id="tri-bh-h" min="0.001" step="any" placeholder="5" value="5">
            </div>
          </div>
        </div>

        <button class="btn btn--primary btn--lg" id="tri-calc-btn" style="width:100%" aria-label="Calculate Triangle">Calculate Triangle</button>

        <!-- Result Box -->
        <div class="result-box result-box--hidden" id="tri-result">
          <div class="result-box__label">Area of Triangle</div>
          <div class="result-box__value" id="tri-area-val">—</div>
          <div id="tri-badges-wrap" style="margin-top:.5rem;display:flex;flex-wrap:wrap;gap:.5rem"></div>

          <div class="result-box__sub" id="tri-stats"></div>

          <!-- Sides & Angles Table / Grid -->
          <div style="margin-top:1.25rem;padding:1rem 1.25rem;background:var(--color-surface);border:1px solid var(--color-border);border-radius:10px" id="tri-details-box">
            <div style="font-size:.78rem;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:var(--color-accent);margin-bottom:.75rem">Sides, Angles &amp; Altitudes</div>
            <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(130px, 1fr));gap:.75rem" id="tri-grid-specs"></div>
          </div>
        </div>

        <!-- How To Use -->
        <div class="how-to" style="margin-top:1.5rem">
          <div class="how-to__title">How to use</div>
          <div class="how-to__body">
            <ol>
              <li>Select your input mode: <strong>SSS</strong> (3 sides), <strong>SAS</strong> (two sides and included angle), <strong>ASA</strong> (two angles and included side), or <strong>Base &amp; Height</strong>.</li>
              <li>Enter your measurements in consistent units.</li>
              <li>Click <strong>Calculate Triangle</strong> to compute area, perimeter, all angles, inradius, circumradius, and triangle type.</li>
            </ol>
            <p style="margin-top:.5rem">
              <strong>Formulas:</strong> Area by Heron's formula = <code>√[s(s - a)(s - b)(s - c)]</code> where <code>s = (a + b + c) / 2</code>.
            </p>
          </div>
        </div>

      </div>
    </div>
  `}function M(t){const{mode:m}=t;let a,e,s,l,d,n,i,u,c,o,r;if(m==="sss"){if(a=parseFloat(t.a),e=parseFloat(t.b),s=parseFloat(t.c),!a||!e||!s||a<=0||e<=0||s<=0)return null;if(a+e<=s||a+s<=e||e+s<=a)return{error:"Triangle Inequality violated: The sum of any two sides must be strictly greater than the third side."};c=(a+e+s)/2,i=Math.sqrt(c*(c-a)*(c-e)*(c-s)),l=Math.acos(Math.max(-1,Math.min(1,(e*e+s*s-a*a)/(2*e*s))))*y,d=Math.acos(Math.max(-1,Math.min(1,(a*a+s*s-e*e)/(2*a*s))))*y,n=180-l-d}else if(m==="sas"){if(a=parseFloat(t.a),e=parseFloat(t.b),n=parseFloat(t.gamma),!a||!e||!n||a<=0||e<=0||n<=0||n>=180)return null;s=Math.sqrt(a*a+e*e-2*a*e*Math.cos(n*b)),c=(a+e+s)/2,i=.5*a*e*Math.sin(n*b),l=Math.acos(Math.max(-1,Math.min(1,(e*e+s*s-a*a)/(2*e*s))))*y,d=180-l-n}else if(m==="asa"){if(l=parseFloat(t.alpha),d=parseFloat(t.beta),s=parseFloat(t.c),!l||!d||!s||l<=0||d<=0||s<=0||l+d>=180)return null;n=180-l-d,a=s*Math.sin(l*b)/Math.sin(n*b),e=s*Math.sin(d*b)/Math.sin(n*b),c=(a+e+s)/2,i=.5*a*e*Math.sin(n*b)}else if(m==="bh"){e=parseFloat(t.b);const f=parseFloat(t.h);return!e||!f||e<=0||f<=0?null:(i=.5*e*f,{area:i.toFixed(4),base:e.toFixed(4),height:f.toFixed(4),isBaseHeightOnly:!0})}u=a+e+s,o=i/c,r=a*e*s/(4*i);const v=2*i/a,x=2*i/e,_=2*i/s;let g="Scalene";const p=1e-4;Math.abs(a-e)<p&&Math.abs(e-s)<p?g="Equilateral":(Math.abs(a-e)<p||Math.abs(e-s)<p||Math.abs(a-s)<p)&&(g="Isosceles");const S=Math.max(l,d,n);let h="Acute";return Math.abs(S-90)<.05?h="Right":S>90.05&&(h="Obtuse"),{a:a.toFixed(3),b:e.toFixed(3),c:s.toFixed(3),alpha:l.toFixed(2),beta:d.toFixed(2),gamma:n.toFixed(2),area:i.toFixed(4),perimeter:u.toFixed(3),semiPerimeter:c.toFixed(3),inradius:o.toFixed(3),circumradius:r.toFixed(3),ha:v.toFixed(3),hb:x.toFixed(3),hc:_.toFixed(3),sideType:g,angleType:h}}function w(t){const m=t.querySelector("#tri-mode-seg"),a=t.querySelector("#tri-calc-btn"),e=t.querySelector("#tri-result"),s=t.querySelector("#tri-area-val"),l=t.querySelector("#tri-badges-wrap"),d=t.querySelector("#tri-stats"),n=t.querySelector("#tri-grid-specs"),i=t.querySelector("#tri-details-box");if(!a)return;let u="sss";const c={sss:t.querySelector("#tri-form-sss"),sas:t.querySelector("#tri-form-sas"),asa:t.querySelector("#tri-form-asa"),bh:t.querySelector("#tri-form-bh")};m&&m.addEventListener("click",o=>{const r=o.target.closest("[data-mode]");r&&(u=r.dataset.mode,m.querySelectorAll(".segment__btn").forEach(v=>v.classList.remove("active")),r.classList.add("active"),Object.keys(c).forEach(v=>{c[v]&&(c[v].style.display=v===u?"":"none")}))}),a.addEventListener("click",()=>{let o={mode:u};u==="sss"?(o.a=t.querySelector("#tri-sss-a").value,o.b=t.querySelector("#tri-sss-b").value,o.c=t.querySelector("#tri-sss-c").value):u==="sas"?(o.a=t.querySelector("#tri-sas-a").value,o.gamma=t.querySelector("#tri-sas-gamma").value,o.b=t.querySelector("#tri-sas-b").value):u==="asa"?(o.alpha=t.querySelector("#tri-asa-alpha").value,o.c=t.querySelector("#tri-asa-c").value,o.beta=t.querySelector("#tri-asa-beta").value):u==="bh"&&(o.b=t.querySelector("#tri-bh-b").value,o.h=t.querySelector("#tri-bh-h").value);const r=M(o);if(!r){s.textContent="Invalid input",e.classList.remove("result-box--hidden"),l.innerHTML="",d.innerHTML="",i&&(i.style.display="none");return}if(r.error){s.textContent="Invalid Triangle",e.classList.remove("result-box--hidden"),l.innerHTML=`<span class="bmi-badge bmi-badge--obese">${r.error}</span>`,d.innerHTML="",i&&(i.style.display="none");return}if(e.classList.remove("result-box--hidden"),s.textContent=parseFloat(r.area).toLocaleString(),r.isBaseHeightOnly){l.innerHTML='<span class="bmi-badge bmi-badge--normal">Base &amp; Height Mode</span>',d.innerHTML=`
        <div class="result-stat"><div class="result-stat__label">Base</div><div class="result-stat__value">${r.base}</div></div>
        <div class="result-stat"><div class="result-stat__label">Height</div><div class="result-stat__value">${r.height}</div></div>
      `,i&&(i.style.display="none");return}i&&(i.style.display=""),l.innerHTML=`
      <span class="bmi-badge bmi-badge--normal">${r.sideType} Triangle</span>
      <span class="bmi-badge ${r.angleType==="Right"?"bmi-badge--over":"bmi-badge--normal"}">${r.angleType} Triangle</span>
    `,d.innerHTML=`
      <div class="result-stat"><div class="result-stat__label">Perimeter (P)</div><div class="result-stat__value">${r.perimeter}</div></div>
      <div class="result-stat"><div class="result-stat__label">Semi-Perimeter (s)</div><div class="result-stat__value">${r.semiPerimeter}</div></div>
      <div class="result-stat"><div class="result-stat__label">Inradius (r)</div><div class="result-stat__value">${r.inradius}</div></div>
      <div class="result-stat"><div class="result-stat__label">Circumradius (R)</div><div class="result-stat__value">${r.circumradius}</div></div>
    `,n.innerHTML=`
      <div style="background:var(--color-surface-2);border-radius:8px;padding:.6rem .75rem">
        <div style="font-size:.72rem;font-weight:700;color:var(--color-text-muted)">SIDE a</div>
        <div style="font-family:var(--font-mono);font-size:1.1rem;font-weight:700;color:var(--color-text)">${r.a}</div>
        <div style="font-size:.72rem;color:var(--color-text-muted)">Altitude: ${r.ha}</div>
      </div>
      <div style="background:var(--color-surface-2);border-radius:8px;padding:.6rem .75rem">
        <div style="font-size:.72rem;font-weight:700;color:var(--color-text-muted)">SIDE b</div>
        <div style="font-family:var(--font-mono);font-size:1.1rem;font-weight:700;color:var(--color-text)">${r.b}</div>
        <div style="font-size:.72rem;color:var(--color-text-muted)">Altitude: ${r.hb}</div>
      </div>
      <div style="background:var(--color-surface-2);border-radius:8px;padding:.6rem .75rem">
        <div style="font-size:.72rem;font-weight:700;color:var(--color-text-muted)">SIDE c</div>
        <div style="font-family:var(--font-mono);font-size:1.1rem;font-weight:700;color:var(--color-text)">${r.c}</div>
        <div style="font-size:.72rem;color:var(--color-text-muted)">Altitude: ${r.hc}</div>
      </div>
      <div style="background:var(--color-surface-2);border-radius:8px;padding:.6rem .75rem">
        <div style="font-size:.72rem;font-weight:700;color:var(--color-text-muted)">ANGLE α (A)</div>
        <div style="font-family:var(--font-mono);font-size:1.1rem;font-weight:700;color:var(--color-text)">${r.alpha}°</div>
      </div>
      <div style="background:var(--color-surface-2);border-radius:8px;padding:.6rem .75rem">
        <div style="font-size:.72rem;font-weight:700;color:var(--color-text-muted)">ANGLE β (B)</div>
        <div style="font-family:var(--font-mono);font-size:1.1rem;font-weight:700;color:var(--color-text)">${r.beta}°</div>
      </div>
      <div style="background:var(--color-surface-2);border-radius:8px;padding:.6rem .75rem">
        <div style="font-size:.72rem;font-weight:700;color:var(--color-text-muted)">ANGLE γ (C)</div>
        <div style="font-family:var(--font-mono);font-size:1.1rem;font-weight:700;color:var(--color-text)">${r.gamma}°</div>
      </div>
    `})}export{w as bindEvents,M as calculate,A as render};
