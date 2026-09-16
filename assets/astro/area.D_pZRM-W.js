function v(r){r.innerHTML=`
    <div class="calc-panel">
      <div class="calc-panel__header">
        <span class="calc-panel__title">Area Calculator</span>
        <div class="segment" id="area-shape-seg" style="overflow-x:auto;max-width:100%">
          <button class="segment__btn active" data-shape="rectangle">Rectangle</button>
          <button class="segment__btn" data-shape="circle">Circle</button>
          <button class="segment__btn" data-shape="triangle">Triangle</button>
          <button class="segment__btn" data-shape="trapezoid">Trapezoid</button>
          <button class="segment__btn" data-shape="parallelogram">Parallelogram</button>
          <button class="segment__btn" data-shape="ellipse">Ellipse</button>
          <button class="segment__btn" data-shape="sector">Sector</button>
        </div>
      </div>
      <div class="calc-panel__body">

        <!-- Rectangle Form -->
        <div id="area-form-rectangle">
          <div class="form-row">
            <div class="form-group">
              <label class="form-label" for="area-rect-l">Length (l)</label>
              <input class="form-input form-input--lg" type="number" id="area-rect-l" min="0.001" step="any" placeholder="8" value="8">
            </div>
            <div class="form-group">
              <label class="form-label" for="area-rect-w">Width (w)</label>
              <input class="form-input form-input--lg" type="number" id="area-rect-w" min="0.001" step="any" placeholder="5" value="5">
            </div>
          </div>
        </div>

        <!-- Circle Form -->
        <div id="area-form-circle" style="display:none">
          <div class="form-group">
            <label class="form-label" for="area-circ-r">Radius (r)</label>
            <input class="form-input form-input--lg" type="number" id="area-circ-r" min="0.001" step="any" placeholder="6" value="6">
          </div>
        </div>

        <!-- Triangle Form -->
        <div id="area-form-triangle" style="display:none">
          <div class="form-row">
            <div class="form-group">
              <label class="form-label" for="area-tri-b">Base (b)</label>
              <input class="form-input form-input--lg" type="number" id="area-tri-b" min="0.001" step="any" placeholder="10" value="10">
            </div>
            <div class="form-group">
              <label class="form-label" for="area-tri-h">Height (h)</label>
              <input class="form-input form-input--lg" type="number" id="area-tri-h" min="0.001" step="any" placeholder="6" value="6">
            </div>
          </div>
        </div>

        <!-- Trapezoid Form -->
        <div id="area-form-trapezoid" style="display:none">
          <div class="form-row--3 form-row">
            <div class="form-group">
              <label class="form-label" for="area-trap-a">Base a</label>
              <input class="form-input form-input--lg" type="number" id="area-trap-a" min="0.001" step="any" placeholder="6" value="6">
            </div>
            <div class="form-group">
              <label class="form-label" for="area-trap-b">Base b</label>
              <input class="form-input form-input--lg" type="number" id="area-trap-b" min="0.001" step="any" placeholder="10" value="10">
            </div>
            <div class="form-group">
              <label class="form-label" for="area-trap-h">Height (h)</label>
              <input class="form-input form-input--lg" type="number" id="area-trap-h" min="0.001" step="any" placeholder="4" value="4">
            </div>
          </div>
        </div>

        <!-- Parallelogram Form -->
        <div id="area-form-parallelogram" style="display:none">
          <div class="form-row">
            <div class="form-group">
              <label class="form-label" for="area-para-b">Base (b)</label>
              <input class="form-input form-input--lg" type="number" id="area-para-b" min="0.001" step="any" placeholder="9" value="9">
            </div>
            <div class="form-group">
              <label class="form-label" for="area-para-h">Height (h)</label>
              <input class="form-input form-input--lg" type="number" id="area-para-h" min="0.001" step="any" placeholder="5" value="5">
            </div>
          </div>
        </div>

        <!-- Ellipse Form -->
        <div id="area-form-ellipse" style="display:none">
          <div class="form-row">
            <div class="form-group">
              <label class="form-label" for="area-ell-a">Semi-Major Axis (a)</label>
              <input class="form-input form-input--lg" type="number" id="area-ell-a" min="0.001" step="any" placeholder="7" value="7">
            </div>
            <div class="form-group">
              <label class="form-label" for="area-ell-b">Semi-Minor Axis (b)</label>
              <input class="form-input form-input--lg" type="number" id="area-ell-b" min="0.001" step="any" placeholder="4" value="4">
            </div>
          </div>
        </div>

        <!-- Sector Form -->
        <div id="area-form-sector" style="display:none">
          <div class="form-row">
            <div class="form-group">
              <label class="form-label" for="area-sec-r">Radius (r)</label>
              <input class="form-input form-input--lg" type="number" id="area-sec-r" min="0.001" step="any" placeholder="6" value="6">
            </div>
            <div class="form-group">
              <label class="form-label" for="area-sec-angle">Central Angle (degrees)</label>
              <input class="form-input form-input--lg" type="number" id="area-sec-angle" min="0.001" max="360" step="any" placeholder="60" value="60">
            </div>
          </div>
        </div>

        <button class="btn btn--primary btn--lg" id="area-calc-btn" style="width:100%" aria-label="Calculate Area">Calculate Area</button>

        <!-- Result Box -->
        <div class="result-box result-box--hidden" id="area-result">
          <div class="result-box__label">Total Area (A)</div>
          <div style="display:flex;align-items:baseline;gap:.5rem;flex-wrap:wrap">
            <div class="result-box__value" id="area-val">—</div>
            <span style="font-size:1.1rem;color:var(--color-text-muted);font-weight:600">square units (u²)</span>
          </div>

          <div id="area-badge-wrap" style="margin-top:.5rem"></div>

          <div class="result-box__sub" id="area-stats"></div>

          <!-- Unit Conversion Grid -->
          <div style="margin-top:1.25rem;padding:1rem 1.25rem;background:var(--color-surface);border:1px solid var(--color-border);border-radius:10px">
            <div style="font-size:.78rem;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:var(--color-accent);margin-bottom:.5rem">Area Unit Equivalents (assuming 1 unit = 1 meter)</div>
            <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(130px, 1fr));gap:.6rem;font-size:.85rem" id="area-conv-grid"></div>
          </div>
        </div>

        <!-- How To Use -->
        <div class="how-to" style="margin-top:1.5rem">
          <div class="how-to__title">How to use</div>
          <div class="how-to__body">
            <ol>
              <li>Select the geometric 2D shape you want to solve for.</li>
              <li>Input dimensions (e.g. length, width, radius, height, or angle).</li>
              <li>Click <strong>Calculate Area</strong> to receive the computed area, perimeter or circumference, and metric/imperial equivalents.</li>
            </ol>
            <p style="margin-top:.5rem">
              <strong>Formulas:</strong> Rectangle: <code>l × w</code> · Circle: <code>πr²</code> · Triangle: <code>½b × h</code> · Trapezoid: <code>½(a + b) × h</code> · Ellipse: <code>π × a × b</code> · Sector: <code>(θ/360) × πr²</code>.
            </p>
          </div>
        </div>

      </div>
    </div>
  `}function m(r){const{shape:o}=r;let l=0,n=null,i="";if(o==="rectangle"){const e=parseFloat(r.l),a=parseFloat(r.w);if(!e||!a||e<=0||a<=0)return null;l=e*a,n=2*(e+a),i=`A = ${e} × ${a}`}else if(o==="circle"){const e=parseFloat(r.r);if(!e||e<=0)return null;l=Math.PI*e*e,n=2*Math.PI*e,i=`A = π × (${e})²`}else if(o==="triangle"){const e=parseFloat(r.b),a=parseFloat(r.h);if(!e||!a||e<=0||a<=0)return null;l=.5*e*a,i=`A = ½ × ${e} × ${a}`}else if(o==="trapezoid"){const e=parseFloat(r.a),a=parseFloat(r.b),s=parseFloat(r.h);if(!e||!a||!s||e<=0||a<=0||s<=0)return null;l=.5*(e+a)*s,i=`A = ½ × (${e} + ${a}) × ${s}`}else if(o==="parallelogram"){const e=parseFloat(r.b),a=parseFloat(r.h);if(!e||!a||e<=0||a<=0)return null;l=e*a,i=`A = ${e} × ${a}`}else if(o==="ellipse"){const e=parseFloat(r.a),a=parseFloat(r.b);if(!e||!a||e<=0||a<=0)return null;l=Math.PI*e*a,n=Math.PI*(3*(e+a)-Math.sqrt((3*e+a)*(e+3*a))),i=`A = π × ${e} × ${a}`}else if(o==="sector"){const e=parseFloat(r.r),a=parseFloat(r.angle);if(!e||!a||e<=0||a<=0||a>360)return null;l=a/360*Math.PI*e*e,n=a/360*2*Math.PI*e+2*e,i=`A = (${a}/360) × π × (${e})²`}else return null;const c=l,u=l*10.7639,p=l*1550,t=l/4046.86,d=l/1e4;return{area:l.toFixed(4),areaFormatted:l>=1e4?l.toLocaleString(void 0,{maximumFractionDigits:3}):l.toFixed(4),perimeter:n!==null?n.toFixed(3):null,formula:i,sqMeters:c.toFixed(3),sqFeet:u.toFixed(2),sqInches:p.toFixed(1),acres:t<.001?t.toExponential(3):t.toFixed(4),hectares:d<.001?d.toExponential(3):d.toFixed(4)}}function f(r){const o=r.querySelector("#area-shape-seg"),l=r.querySelector("#area-calc-btn"),n=r.querySelector("#area-result"),i=r.querySelector("#area-val"),c=r.querySelector("#area-badge-wrap"),u=r.querySelector("#area-stats"),p=r.querySelector("#area-conv-grid");if(!l)return;let t="rectangle";const d={rectangle:r.querySelector("#area-form-rectangle"),circle:r.querySelector("#area-form-circle"),triangle:r.querySelector("#area-form-triangle"),trapezoid:r.querySelector("#area-form-trapezoid"),parallelogram:r.querySelector("#area-form-parallelogram"),ellipse:r.querySelector("#area-form-ellipse"),sector:r.querySelector("#area-form-sector")};o&&o.addEventListener("click",e=>{const a=e.target.closest("[data-shape]");a&&(t=a.dataset.shape,o.querySelectorAll(".segment__btn").forEach(s=>s.classList.remove("active")),a.classList.add("active"),Object.keys(d).forEach(s=>{d[s]&&(d[s].style.display=s===t?"":"none")}))}),l.addEventListener("click",()=>{let e={shape:t};t==="rectangle"?(e.l=r.querySelector("#area-rect-l").value,e.w=r.querySelector("#area-rect-w").value):t==="circle"?e.r=r.querySelector("#area-circ-r").value:t==="triangle"?(e.b=r.querySelector("#area-tri-b").value,e.h=r.querySelector("#area-tri-h").value):t==="trapezoid"?(e.a=r.querySelector("#area-trap-a").value,e.b=r.querySelector("#area-trap-b").value,e.h=r.querySelector("#area-trap-h").value):t==="parallelogram"?(e.b=r.querySelector("#area-para-b").value,e.h=r.querySelector("#area-para-h").value):t==="ellipse"?(e.a=r.querySelector("#area-ell-a").value,e.b=r.querySelector("#area-ell-b").value):t==="sector"&&(e.r=r.querySelector("#area-sec-r").value,e.angle=r.querySelector("#area-sec-angle").value);const a=m(e);if(!a){i.textContent="Invalid input",n.classList.remove("result-box--hidden"),c.innerHTML="",u.innerHTML="",p.innerHTML="";return}n.classList.remove("result-box--hidden"),i.textContent=a.areaFormatted,c.innerHTML=`<span class="bmi-badge bmi-badge--normal" style="font-family:var(--font-mono)">${a.formula}</span>`;let s=`
      <div class="result-stat"><div class="result-stat__label">Shape</div><div class="result-stat__value" style="text-transform:capitalize">${t}</div></div>
    `;a.perimeter!==null&&(s+=`
        <div class="result-stat"><div class="result-stat__label">Perimeter / Circumference</div><div class="result-stat__value">${a.perimeter} u</div></div>
      `),u.innerHTML=s,p.innerHTML=`
      <div style="background:var(--color-surface-2);border-radius:6px;padding:.5rem .75rem">
        <div style="color:var(--color-text-muted);font-size:.75rem">Square Meters (m²)</div>
        <div style="font-weight:700;font-family:var(--font-mono)">${a.sqMeters} m²</div>
      </div>
      <div style="background:var(--color-surface-2);border-radius:6px;padding:.5rem .75rem">
        <div style="color:var(--color-text-muted);font-size:.75rem">Square Feet (ft²)</div>
        <div style="font-weight:700;font-family:var(--font-mono)">${a.sqFeet} ft²</div>
      </div>
      <div style="background:var(--color-surface-2);border-radius:6px;padding:.5rem .75rem">
        <div style="color:var(--color-text-muted);font-size:.75rem">Acres</div>
        <div style="font-weight:700;font-family:var(--font-mono)">${a.acres}</div>
      </div>
      <div style="background:var(--color-surface-2);border-radius:6px;padding:.5rem .75rem">
        <div style="color:var(--color-text-muted);font-size:.75rem">Hectares (ha)</div>
        <div style="font-weight:700;font-family:var(--font-mono)">${a.hectares}</div>
      </div>
    `})}export{f as bindEvents,m as calculate,v as render};
