function p(l){l.innerHTML=`
    <div class="calc-panel">
      <div class="calc-panel__header">
        <span class="calc-panel__title">Volume Calculator</span>
        <div class="segment" id="vol-shape-seg" style="overflow-x:auto;max-width:100%">
          <button class="segment__btn active" data-shape="sphere">Sphere</button>
          <button class="segment__btn" data-shape="cylinder">Cylinder</button>
          <button class="segment__btn" data-shape="cone">Cone</button>
          <button class="segment__btn" data-shape="box">Box / Prism</button>
          <button class="segment__btn" data-shape="cube">Cube</button>
          <button class="segment__btn" data-shape="pyramid">Pyramid</button>
        </div>
      </div>
      <div class="calc-panel__body">

        <!-- Sphere inputs -->
        <div id="vol-form-sphere">
          <div class="form-group">
            <label class="form-label" for="vol-sphere-r">Radius (r)</label>
            <input class="form-input form-input--lg" type="number" id="vol-sphere-r" min="0.001" step="any" placeholder="5" value="5" aria-label="Sphere radius">
          </div>
        </div>

        <!-- Cylinder inputs -->
        <div id="vol-form-cylinder" style="display:none">
          <div class="form-row">
            <div class="form-group">
              <label class="form-label" for="vol-cyl-r">Radius (r)</label>
              <input class="form-input form-input--lg" type="number" id="vol-cyl-r" min="0.001" step="any" placeholder="4" value="4">
            </div>
            <div class="form-group">
              <label class="form-label" for="vol-cyl-h">Height (h)</label>
              <input class="form-input form-input--lg" type="number" id="vol-cyl-h" min="0.001" step="any" placeholder="10" value="10">
            </div>
          </div>
        </div>

        <!-- Cone inputs -->
        <div id="vol-form-cone" style="display:none">
          <div class="form-row">
            <div class="form-group">
              <label class="form-label" for="vol-cone-r">Base Radius (r)</label>
              <input class="form-input form-input--lg" type="number" id="vol-cone-r" min="0.001" step="any" placeholder="3" value="3">
            </div>
            <div class="form-group">
              <label class="form-label" for="vol-cone-h">Height (h)</label>
              <input class="form-input form-input--lg" type="number" id="vol-cone-h" min="0.001" step="any" placeholder="9" value="9">
            </div>
          </div>
        </div>

        <!-- Box / Prism inputs -->
        <div id="vol-form-box" style="display:none">
          <div class="form-row--3 form-row">
            <div class="form-group">
              <label class="form-label" for="vol-box-l">Length (l)</label>
              <input class="form-input form-input--lg" type="number" id="vol-box-l" min="0.001" step="any" placeholder="6" value="6">
            </div>
            <div class="form-group">
              <label class="form-label" for="vol-box-w">Width (w)</label>
              <input class="form-input form-input--lg" type="number" id="vol-box-w" min="0.001" step="any" placeholder="4" value="4">
            </div>
            <div class="form-group">
              <label class="form-label" for="vol-box-h">Height (h)</label>
              <input class="form-input form-input--lg" type="number" id="vol-box-h" min="0.001" step="any" placeholder="5" value="5">
            </div>
          </div>
        </div>

        <!-- Cube inputs -->
        <div id="vol-form-cube" style="display:none">
          <div class="form-group">
            <label class="form-label" for="vol-cube-s">Side Length (s)</label>
            <input class="form-input form-input--lg" type="number" id="vol-cube-s" min="0.001" step="any" placeholder="4" value="4">
          </div>
        </div>

        <!-- Pyramid inputs -->
        <div id="vol-form-pyramid" style="display:none">
          <div class="form-row--3 form-row">
            <div class="form-group">
              <label class="form-label" for="vol-pyr-l">Base Length (l)</label>
              <input class="form-input form-input--lg" type="number" id="vol-pyr-l" min="0.001" step="any" placeholder="6" value="6">
            </div>
            <div class="form-group">
              <label class="form-label" for="vol-pyr-w">Base Width (w)</label>
              <input class="form-input form-input--lg" type="number" id="vol-pyr-w" min="0.001" step="any" placeholder="6" value="6">
            </div>
            <div class="form-group">
              <label class="form-label" for="vol-pyr-h">Height (h)</label>
              <input class="form-input form-input--lg" type="number" id="vol-pyr-h" min="0.001" step="any" placeholder="8" value="8">
            </div>
          </div>
        </div>

        <button class="btn btn--primary btn--lg" id="vol-calc-btn" style="width:100%" aria-label="Calculate Volume">Calculate Volume</button>

        <!-- Result Box -->
        <div class="result-box result-box--hidden" id="vol-result">
          <div class="result-box__label">Total Volume (V)</div>
          <div style="display:flex;align-items:baseline;gap:.5rem;flex-wrap:wrap">
            <div class="result-box__value" id="vol-val">—</div>
            <span style="font-size:1.1rem;color:var(--color-text-muted);font-weight:600">cubic units (u³)</span>
          </div>

          <div id="vol-badge-wrap" style="margin-top:.5rem"></div>

          <div class="result-box__sub" id="vol-stats"></div>

          <!-- Unit Conversion Table -->
          <div style="margin-top:1.25rem;padding:1rem 1.25rem;background:var(--color-surface);border:1px solid var(--color-border);border-radius:10px">
            <div style="font-size:.78rem;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:var(--color-accent);margin-bottom:.5rem">Liquid &amp; Unit Equivalents (assuming 1 unit = 1 cm)</div>
            <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(130px, 1fr));gap:.6rem;font-size:.85rem" id="vol-conv-grid"></div>
          </div>
        </div>

        <!-- How To Use -->
        <div class="how-to" style="margin-top:1.5rem">
          <div class="how-to__title">How to use</div>
          <div class="how-to__body">
            <ol>
              <li>Select your 3D geometric solid (Sphere, Cylinder, Cone, Box, Cube, or Pyramid).</li>
              <li>Input the required dimensions (radius, length, width, or height).</li>
              <li>Click <strong>Calculate Volume</strong> to get exact volume, formulas, and liquid capacity conversions.</li>
            </ol>
            <p style="margin-top:.5rem">
              <strong>Formulas:</strong> Sphere: <code>V = ⁴⁄₃πr³</code> · Cylinder: <code>V = πr²h</code> · Cone: <code>V = ⅓πr²h</code> · Box: <code>V = l·w·h</code> · Cube: <code>V = s³</code> · Pyramid: <code>V = ⅓l·w·h</code>.
            </p>
          </div>
        </div>

      </div>
    </div>
  `}function m(l){const{shape:a}=l;let t=0,i="",d=null;if(a==="sphere"){const e=parseFloat(l.r);if(!e||e<=0)return null;t=4/3*Math.PI*Math.pow(e,3),i=`V = ⁴⁄₃ × π × (${e})³`,d=4*Math.PI*e*e}else if(a==="cylinder"){const e=parseFloat(l.r),o=parseFloat(l.h);if(!e||!o||e<=0||o<=0)return null;t=Math.PI*e*e*o,i=`V = π × (${e})² × ${o}`,d=2*Math.PI*e*(e+o)}else if(a==="cone"){const e=parseFloat(l.r),o=parseFloat(l.h);if(!e||!o||e<=0||o<=0)return null;t=1/3*Math.PI*e*e*o,i=`V = ⅓ × π × (${e})² × ${o}`;const r=Math.sqrt(e*e+o*o);d=Math.PI*e*(e+r)}else if(a==="box"){const e=parseFloat(l.l),o=parseFloat(l.w),r=parseFloat(l.h);if(!e||!o||!r||e<=0||o<=0||r<=0)return null;t=e*o*r,i=`V = ${e} × ${o} × ${r}`,d=2*(e*o+e*r+o*r)}else if(a==="cube"){const e=parseFloat(l.s);if(!e||e<=0)return null;t=Math.pow(e,3),i=`V = (${e})³`,d=6*e*e}else if(a==="pyramid"){const e=parseFloat(l.l),o=parseFloat(l.w),r=parseFloat(l.h);if(!e||!o||!r||e<=0||o<=0||r<=0)return null;t=1/3*e*o*r,i=`V = ⅓ × (${e} × ${o}) × ${r}`}else return null;const u=t,c=t/1e3,v=c*.264172,s=u*.033814;return{volume:t,volumeFormatted:t>=1e4?t.toLocaleString(void 0,{maximumFractionDigits:3}):t.toFixed(4),formula:i,surfaceArea:d?d.toFixed(3):null,litres:c.toFixed(4),ml:u.toFixed(2),usGallons:v.toFixed(4),fluidOz:s.toFixed(2)}}function f(l){const a=l.querySelector("#vol-shape-seg"),t=l.querySelector("#vol-calc-btn"),i=l.querySelector("#vol-result"),d=l.querySelector("#vol-val"),u=l.querySelector("#vol-badge-wrap"),c=l.querySelector("#vol-stats"),v=l.querySelector("#vol-conv-grid");if(!t)return;let s="sphere";const e={sphere:l.querySelector("#vol-form-sphere"),cylinder:l.querySelector("#vol-form-cylinder"),cone:l.querySelector("#vol-form-cone"),box:l.querySelector("#vol-form-box"),cube:l.querySelector("#vol-form-cube"),pyramid:l.querySelector("#vol-form-pyramid")};a&&a.addEventListener("click",o=>{const r=o.target.closest("[data-shape]");r&&(s=r.dataset.shape,a.querySelectorAll(".segment__btn").forEach(n=>n.classList.remove("active")),r.classList.add("active"),Object.keys(e).forEach(n=>{e[n]&&(e[n].style.display=n===s?"":"none")}))}),t.addEventListener("click",()=>{let o={shape:s};s==="sphere"?o.r=l.querySelector("#vol-sphere-r").value:s==="cylinder"?(o.r=l.querySelector("#vol-cyl-r").value,o.h=l.querySelector("#vol-cyl-h").value):s==="cone"?(o.r=l.querySelector("#vol-cone-r").value,o.h=l.querySelector("#vol-cone-h").value):s==="box"?(o.l=l.querySelector("#vol-box-l").value,o.w=l.querySelector("#vol-box-w").value,o.h=l.querySelector("#vol-box-h").value):s==="cube"?o.s=l.querySelector("#vol-cube-s").value:s==="pyramid"&&(o.l=l.querySelector("#vol-pyr-l").value,o.w=l.querySelector("#vol-pyr-w").value,o.h=l.querySelector("#vol-pyr-h").value);const r=m(o);if(!r){d.textContent="Invalid input",i.classList.remove("result-box--hidden"),u.innerHTML="",c.innerHTML="",v.innerHTML="";return}i.classList.remove("result-box--hidden"),d.textContent=r.volumeFormatted,u.innerHTML=`<span class="bmi-badge bmi-badge--normal" style="font-family:var(--font-mono)">${r.formula}</span>`;let n=`
      <div class="result-stat"><div class="result-stat__label">Shape</div><div class="result-stat__value" style="text-transform:capitalize">${s}</div></div>
    `;r.surfaceArea&&(n+=`
        <div class="result-stat"><div class="result-stat__label">Surface Area</div><div class="result-stat__value">${r.surfaceArea} u²</div></div>
      `),c.innerHTML=n,v.innerHTML=`
      <div style="background:var(--color-surface-2);border-radius:6px;padding:.5rem .75rem">
        <div style="color:var(--color-text-muted);font-size:.75rem">Litres (L)</div>
        <div style="font-weight:700;font-family:var(--font-mono)">${r.litres} L</div>
      </div>
      <div style="background:var(--color-surface-2);border-radius:6px;padding:.5rem .75rem">
        <div style="color:var(--color-text-muted);font-size:.75rem">Millilitres (mL / cm³)</div>
        <div style="font-weight:700;font-family:var(--font-mono)">${r.ml} mL</div>
      </div>
      <div style="background:var(--color-surface-2);border-radius:6px;padding:.5rem .75rem">
        <div style="color:var(--color-text-muted);font-size:.75rem">US Gallons (gal)</div>
        <div style="font-weight:700;font-family:var(--font-mono)">${r.usGallons} gal</div>
      </div>
      <div style="background:var(--color-surface-2);border-radius:6px;padding:.5rem .75rem">
        <div style="color:var(--color-text-muted);font-size:.75rem">Fluid Ounces (fl oz)</div>
        <div style="font-weight:700;font-family:var(--font-mono)">${r.fluidOz} fl oz</div>
      </div>
    `})}export{f as bindEvents,m as calculate,p as render};
