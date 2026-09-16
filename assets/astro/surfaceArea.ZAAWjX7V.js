function v(l){l.innerHTML=`
    <div class="calc-panel">
      <div class="calc-panel__header">
        <span class="calc-panel__title">Surface Area Calculator</span>
        <div class="segment" id="sa-shape-seg" style="overflow-x:auto;max-width:100%">
          <button class="segment__btn active" data-shape="sphere">Sphere</button>
          <button class="segment__btn" data-shape="cylinder">Cylinder</button>
          <button class="segment__btn" data-shape="cone">Cone</button>
          <button class="segment__btn" data-shape="box">Box / Prism</button>
          <button class="segment__btn" data-shape="cube">Cube</button>
          <button class="segment__btn" data-shape="capsule">Capsule</button>
        </div>
      </div>
      <div class="calc-panel__body">

        <!-- Sphere -->
        <div id="sa-form-sphere">
          <div class="form-group">
            <label class="form-label" for="sa-sphere-r">Radius (r)</label>
            <input class="form-input form-input--lg" type="number" id="sa-sphere-r" min="0.001" step="any" placeholder="5" value="5">
          </div>
        </div>

        <!-- Cylinder -->
        <div id="sa-form-cylinder" style="display:none">
          <div class="form-row">
            <div class="form-group">
              <label class="form-label" for="sa-cyl-r">Radius (r)</label>
              <input class="form-input form-input--lg" type="number" id="sa-cyl-r" min="0.001" step="any" placeholder="4" value="4">
            </div>
            <div class="form-group">
              <label class="form-label" for="sa-cyl-h">Height (h)</label>
              <input class="form-input form-input--lg" type="number" id="sa-cyl-h" min="0.001" step="any" placeholder="8" value="8">
            </div>
          </div>
        </div>

        <!-- Cone -->
        <div id="sa-form-cone" style="display:none">
          <div class="form-row">
            <div class="form-group">
              <label class="form-label" for="sa-cone-r">Base Radius (r)</label>
              <input class="form-input form-input--lg" type="number" id="sa-cone-r" min="0.001" step="any" placeholder="3" value="3">
            </div>
            <div class="form-group">
              <label class="form-label" for="sa-cone-h">Height (h)</label>
              <input class="form-input form-input--lg" type="number" id="sa-cone-h" min="0.001" step="any" placeholder="6" value="6">
            </div>
          </div>
        </div>

        <!-- Box -->
        <div id="sa-form-box" style="display:none">
          <div class="form-row--3 form-row">
            <div class="form-group">
              <label class="form-label" for="sa-box-l">Length (l)</label>
              <input class="form-input form-input--lg" type="number" id="sa-box-l" min="0.001" step="any" placeholder="6" value="6">
            </div>
            <div class="form-group">
              <label class="form-label" for="sa-box-w">Width (w)</label>
              <input class="form-input form-input--lg" type="number" id="sa-box-w" min="0.001" step="any" placeholder="4" value="4">
            </div>
            <div class="form-group">
              <label class="form-label" for="sa-box-h">Height (h)</label>
              <input class="form-input form-input--lg" type="number" id="sa-box-h" min="0.001" step="any" placeholder="5" value="5">
            </div>
          </div>
        </div>

        <!-- Cube -->
        <div id="sa-form-cube" style="display:none">
          <div class="form-group">
            <label class="form-label" for="sa-cube-s">Side Length (s)</label>
            <input class="form-input form-input--lg" type="number" id="sa-cube-s" min="0.001" step="any" placeholder="4" value="4">
          </div>
        </div>

        <!-- Capsule -->
        <div id="sa-form-capsule" style="display:none">
          <div class="form-row">
            <div class="form-group">
              <label class="form-label" for="sa-cap-r">Radius (r)</label>
              <input class="form-input form-input--lg" type="number" id="sa-cap-r" min="0.001" step="any" placeholder="3" value="3">
            </div>
            <div class="form-group">
              <label class="form-label" for="sa-cap-h">Cylinder Height (h)</label>
              <input class="form-input form-input--lg" type="number" id="sa-cap-h" min="0.001" step="any" placeholder="8" value="8">
            </div>
          </div>
        </div>

        <button class="btn btn--primary btn--lg" id="sa-calc-btn" style="width:100%" aria-label="Calculate Surface Area">Calculate Surface Area</button>

        <!-- Result Box -->
        <div class="result-box result-box--hidden" id="sa-result">
          <div class="result-box__label">Total Surface Area (SA)</div>
          <div style="display:flex;align-items:baseline;gap:.5rem;flex-wrap:wrap">
            <div class="result-box__value" id="sa-val">—</div>
            <span style="font-size:1.1rem;color:var(--color-text-muted);font-weight:600">square units (u²)</span>
          </div>

          <div id="sa-badge-wrap" style="margin-top:.5rem"></div>

          <div class="result-box__sub" id="sa-stats"></div>
        </div>

        <!-- How To Use -->
        <div class="how-to" style="margin-top:1.5rem">
          <div class="how-to__title">How to use</div>
          <div class="how-to__body">
            <ol>
              <li>Select the 3D shape (Sphere, Cylinder, Cone, Box, Cube, or Capsule).</li>
              <li>Enter required linear dimensions (radius, length, width, height).</li>
              <li>Click <strong>Calculate Surface Area</strong> to determine total area, lateral area, base area, and volume.</li>
            </ol>
            <p style="margin-top:.5rem">
              <strong>Formulas:</strong> Sphere: <code>4πr²</code> · Cylinder: <code>2πr² + 2πrh</code> · Cone: <code>πr(r + √(r² + h²))</code> · Box: <code>2(lw + lh + wh)</code> · Cube: <code>6s²</code>.
            </p>
          </div>
        </div>

      </div>
    </div>
  `}function p(l){const{shape:u}=l;let n=0,r=null,o=null,i=null,c="";if(u==="sphere"){const e=parseFloat(l.r);if(!e||e<=0)return null;n=4*Math.PI*e*e,i=4/3*Math.PI*Math.pow(e,3),c=`SA = 4 × π × (${e})²`}else if(u==="cylinder"){const e=parseFloat(l.r),a=parseFloat(l.h);if(!e||!a||e<=0||a<=0)return null;o=2*(Math.PI*e*e),r=2*Math.PI*e*a,n=o+r,i=Math.PI*e*e*a,c=`SA = 2π(${e})² + 2π(${e})(${a})`}else if(u==="cone"){const e=parseFloat(l.r),a=parseFloat(l.h);if(!e||!a||e<=0||a<=0)return null;const s=Math.sqrt(e*e+a*a);o=Math.PI*e*e,r=Math.PI*e*s,n=o+r,i=1/3*Math.PI*e*e*a,c=`SA = π(${e})² + π(${e})√[(${e})² + (${a})²]`}else if(u==="box"){const e=parseFloat(l.l),a=parseFloat(l.w),s=parseFloat(l.h);if(!e||!a||!s||e<=0||a<=0||s<=0)return null;n=2*(e*a+e*s+a*s),r=2*(e+a)*s,o=2*(e*a),i=e*a*s,c=`SA = 2(${e}·${a} + ${e}·${s} + ${a}·${s})`}else if(u==="cube"){const e=parseFloat(l.s);if(!e||e<=0)return null;n=6*e*e,r=4*e*e,o=2*e*e,i=Math.pow(e,3),c=`SA = 6 × (${e})²`}else if(u==="capsule"){const e=parseFloat(l.r),a=parseFloat(l.h);if(!e||!a||e<=0||a<=0)return null;n=4*Math.PI*e*e+2*Math.PI*e*a,i=4/3*Math.PI*Math.pow(e,3)+Math.PI*e*e*a,c=`SA = 4π(${e})² + 2π(${e})(${a})`}else return null;return{totalArea:n.toFixed(4),lateralArea:r!==null?r.toFixed(4):null,baseArea:o!==null?o.toFixed(4):null,volume:i!==null?i.toFixed(4):null,formula:c}}function b(l){const u=l.querySelector("#sa-shape-seg"),n=l.querySelector("#sa-calc-btn"),r=l.querySelector("#sa-result"),o=l.querySelector("#sa-val"),i=l.querySelector("#sa-badge-wrap"),c=l.querySelector("#sa-stats");if(!n)return;let e="sphere";const a={sphere:l.querySelector("#sa-form-sphere"),cylinder:l.querySelector("#sa-form-cylinder"),cone:l.querySelector("#sa-form-cone"),box:l.querySelector("#sa-form-box"),cube:l.querySelector("#sa-form-cube"),capsule:l.querySelector("#sa-form-capsule")};u&&u.addEventListener("click",s=>{const t=s.target.closest("[data-shape]");t&&(e=t.dataset.shape,u.querySelectorAll(".segment__btn").forEach(d=>d.classList.remove("active")),t.classList.add("active"),Object.keys(a).forEach(d=>{a[d]&&(a[d].style.display=d===e?"":"none")}))}),n.addEventListener("click",()=>{let s={shape:e};e==="sphere"?s.r=l.querySelector("#sa-sphere-r").value:e==="cylinder"?(s.r=l.querySelector("#sa-cyl-r").value,s.h=l.querySelector("#sa-cyl-h").value):e==="cone"?(s.r=l.querySelector("#sa-cone-r").value,s.h=l.querySelector("#sa-cone-h").value):e==="box"?(s.l=l.querySelector("#sa-box-l").value,s.w=l.querySelector("#sa-box-w").value,s.h=l.querySelector("#sa-box-h").value):e==="cube"?s.s=l.querySelector("#sa-cube-s").value:e==="capsule"&&(s.r=l.querySelector("#sa-cap-r").value,s.h=l.querySelector("#sa-cap-h").value);const t=p(s);if(!t){o.textContent="Invalid input",r.classList.remove("result-box--hidden"),i.innerHTML="",c.innerHTML="";return}r.classList.remove("result-box--hidden"),o.textContent=parseFloat(t.totalArea).toLocaleString(),i.innerHTML=`<span class="bmi-badge bmi-badge--normal" style="font-family:var(--font-mono)">${t.formula}</span>`;let d=`
      <div class="result-stat"><div class="result-stat__label">Shape</div><div class="result-stat__value" style="text-transform:capitalize">${e}</div></div>
    `;t.lateralArea!==null&&(d+=`<div class="result-stat"><div class="result-stat__label">Lateral Area</div><div class="result-stat__value">${t.lateralArea} u²</div></div>`),t.baseArea!==null&&(d+=`<div class="result-stat"><div class="result-stat__label">Base Area (Total)</div><div class="result-stat__value">${t.baseArea} u²</div></div>`),t.volume!==null&&(d+=`<div class="result-stat"><div class="result-stat__label">Volume</div><div class="result-stat__value">${t.volume} u³</div></div>`),c.innerHTML=d})}export{b as bindEvents,p as calculate,v as render};
