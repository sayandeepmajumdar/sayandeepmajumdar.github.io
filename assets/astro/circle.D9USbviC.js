function y(e){e.innerHTML=`
    <div class="calc-panel">
      <div class="calc-panel__header">
        <span class="calc-panel__title">Circle Calculator</span>
        <div class="segment" id="circ-given-seg">
          <button class="segment__btn active" data-given="radius">Radius (r)</button>
          <button class="segment__btn" data-given="diameter">Diameter (d)</button>
          <button class="segment__btn" data-given="circumference">Circumference (C)</button>
          <button class="segment__btn" data-given="area">Area (A)</button>
        </div>
      </div>
      <div class="calc-panel__body">

        <div class="form-row">
          <div class="form-group">
            <label class="form-label" id="circ-input-label" for="circ-main-input">Radius (r)</label>
            <input class="form-input form-input--lg" type="number" id="circ-main-input" min="0.001" step="any" placeholder="5" value="5" aria-label="Circle dimension">
          </div>
          <div class="form-group">
            <label class="form-label" for="circ-angle-input">Optional: Central Angle θ (degrees)</label>
            <input class="form-input form-input--lg" type="number" id="circ-angle-input" min="0" max="360" step="any" placeholder="60" value="60" aria-label="Central angle">
          </div>
        </div>

        <button class="btn btn--primary btn--lg" id="circ-calc-btn" style="width:100%" aria-label="Calculate Circle">Calculate Circle</button>

        <!-- Result Box -->
        <div class="result-box result-box--hidden" id="circ-result">
          <div class="result-box__label">Circle Area (A)</div>
          <div style="display:flex;align-items:baseline;gap:.5rem;flex-wrap:wrap">
            <div class="result-box__value" id="circ-area-val">—</div>
            <span id="circ-pi-area" style="font-size:1.15rem;font-family:var(--font-mono);color:var(--color-text-muted);font-weight:600"></span>
          </div>

          <div id="circ-badge-wrap" style="margin-top:.5rem"></div>

          <div class="result-box__sub" id="circ-stats"></div>

          <!-- Sector & Arc specs -->
          <div style="margin-top:1.25rem;padding:1rem 1.25rem;background:var(--color-surface);border:1px solid var(--color-border);border-radius:10px" id="circ-sector-box">
            <div style="font-size:.78rem;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:var(--color-accent);margin-bottom:.5rem">Sector &amp; Arc Measurements</div>
            <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(140px, 1fr));gap:.6rem;font-size:.85rem" id="circ-sector-grid"></div>
          </div>
        </div>

        <!-- How To Use -->
        <div class="how-to" style="margin-top:1.5rem">
          <div class="how-to__title">How to use</div>
          <div class="how-to__body">
            <ol>
              <li>Select your known parameter: <strong>Radius</strong>, <strong>Diameter</strong>, <strong>Circumference</strong>, or <strong>Area</strong>.</li>
              <li>Enter the numerical value. You can also specify an optional <strong>Central Angle θ</strong> to calculate arc length, sector area, and chord length.</li>
              <li>Click <strong>Calculate Circle</strong> to instantly view all properties in both decimal and exact π formats.</li>
            </ol>
            <p style="margin-top:.5rem">
              <strong>Formulas:</strong> <code>d = 2r</code> · <code>C = 2πr = πd</code> · <code>A = πr² = ¼πd²</code> · Arc Length <code>L = (θ/360) × 2πr</code> · Sector Area <code>Aₛ = (θ/360) × πr²</code>.
            </p>
          </div>
        </div>

      </div>
    </div>
  `}function b(e){const{given:s,value:m,angle:g}=e,l=parseFloat(m);if(!l||l<=0)return null;let t=0;if(s==="radius")t=l;else if(s==="diameter")t=l/2;else if(s==="circumference")t=l/(2*Math.PI);else if(s==="area")t=Math.sqrt(l/Math.PI);else return null;const n=2*t,d=2*Math.PI*t,p=Math.PI*t*t;let c=null,i=null,o=null;const r=parseFloat(g);!isNaN(r)&&r>0&&r<=360&&(c=r/360*d,i=r/360*p,o=2*t*Math.sin(r*(Math.PI/180)/2));const f=(t*t).toFixed(2).replace(/\.00$/,"")+"π",u=n.toFixed(2).replace(/\.00$/,"")+"π";return{radius:t.toFixed(4),diameter:n.toFixed(4),circumference:d.toFixed(4),area:p.toFixed(4),piArea:f,piCirc:u,arcLength:c!==null?c.toFixed(4):null,sectorArea:i!==null?i.toFixed(4):null,chordLength:o!==null?o.toFixed(4):null,angleDeg:r||null}}function x(e){const s=e.querySelector("#circ-given-seg"),m=e.querySelector("#circ-calc-btn"),g=e.querySelector("#circ-result"),l=e.querySelector("#circ-area-val"),t=e.querySelector("#circ-pi-area"),n=e.querySelector("#circ-badge-wrap"),d=e.querySelector("#circ-stats"),p=e.querySelector("#circ-input-label"),c=e.querySelector("#circ-main-input"),i=e.querySelector("#circ-sector-box"),o=e.querySelector("#circ-sector-grid");if(!m)return;let r="radius";const f={radius:"Radius (r)",diameter:"Diameter (d)",circumference:"Circumference (C)",area:"Area (A)"};s&&s.addEventListener("click",u=>{const v=u.target.closest("[data-given]");v&&(r=v.dataset.given,s.querySelectorAll(".segment__btn").forEach(a=>a.classList.remove("active")),v.classList.add("active"),p.textContent=f[r]||"Value",c.placeholder=r==="radius"?"5":r==="diameter"?"10":r==="circumference"?"31.415":"78.54")}),m.addEventListener("click",()=>{const u=c.value,v=e.querySelector("#circ-angle-input").value,a=b({given:r,value:u,angle:v});if(!a){l.textContent="Invalid input",g.classList.remove("result-box--hidden"),t.textContent="",n.innerHTML="",d.innerHTML="",i&&(i.style.display="none");return}g.classList.remove("result-box--hidden"),l.textContent=parseFloat(a.area).toLocaleString(),t.textContent=`(= ${a.piArea})`,n.innerHTML=`<span class="bmi-badge bmi-badge--normal">Solved from ${f[r]}</span>`,d.innerHTML=`
      <div class="result-stat"><div class="result-stat__label">Radius (r)</div><div class="result-stat__value">${a.radius}</div></div>
      <div class="result-stat"><div class="result-stat__label">Diameter (d)</div><div class="result-stat__value">${a.diameter}</div></div>
      <div class="result-stat"><div class="result-stat__label">Circumference (C)</div><div class="result-stat__value">${a.circumference} (${a.piCirc})</div></div>
    `,a.arcLength!==null&&i&&o?(i.style.display="",o.innerHTML=`
        <div style="background:var(--color-surface-2);border-radius:6px;padding:.5rem .75rem">
          <div style="color:var(--color-text-muted);font-size:.75rem">Central Angle (θ)</div>
          <div style="font-weight:700;font-family:var(--font-mono)">${a.angleDeg}°</div>
        </div>
        <div style="background:var(--color-surface-2);border-radius:6px;padding:.5rem .75rem">
          <div style="color:var(--color-text-muted);font-size:.75rem">Arc Length (L)</div>
          <div style="font-weight:700;font-family:var(--font-mono)">${a.arcLength}</div>
        </div>
        <div style="background:var(--color-surface-2);border-radius:6px;padding:.5rem .75rem">
          <div style="color:var(--color-text-muted);font-size:.75rem">Sector Area (Aₛ)</div>
          <div style="font-weight:700;font-family:var(--font-mono)">${a.sectorArea}</div>
        </div>
        <div style="background:var(--color-surface-2);border-radius:6px;padding:.5rem .75rem">
          <div style="color:var(--color-text-muted);font-size:.75rem">Chord Length (c)</div>
          <div style="font-weight:700;font-family:var(--font-mono)">${a.chordLength}</div>
        </div>
      `):i&&(i.style.display="none")})}export{x as bindEvents,b as calculate,y as render};
