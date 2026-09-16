function g(t){t.innerHTML=`
    <div class="calc-panel">
      <div class="calc-panel__header">
        <span class="calc-panel__title">Distance Calculator</span>
        <div class="segment" id="dist-mode-seg">
          <button class="segment__btn active" data-mode="2d">2D Cartesian</button>
          <button class="segment__btn" data-mode="3d">3D Cartesian</button>
          <button class="segment__btn" data-mode="geo">Geographic (Lat/Lon)</button>
        </div>
      </div>
      <div class="calc-panel__body">

        <!-- 2D Form -->
        <div id="dist-form-2d">
          <div style="font-size:.85rem;font-weight:600;color:var(--color-text-muted);margin-bottom:.5rem">Point 1 (x₁, y₁)</div>
          <div class="form-row">
            <div class="form-group">
              <label class="form-label" for="dist-2d-x1">x₁</label>
              <input class="form-input form-input--lg" type="number" id="dist-2d-x1" step="any" placeholder="1" value="1">
            </div>
            <div class="form-group">
              <label class="form-label" for="dist-2d-y1">y₁</label>
              <input class="form-input form-input--lg" type="number" id="dist-2d-y1" step="any" placeholder="2" value="2">
            </div>
          </div>

          <div style="font-size:.85rem;font-weight:600;color:var(--color-text-muted);margin-bottom:.5rem;margin-top:.25rem">Point 2 (x₂, y₂)</div>
          <div class="form-row">
            <div class="form-group">
              <label class="form-label" for="dist-2d-x2">x₂</label>
              <input class="form-input form-input--lg" type="number" id="dist-2d-x2" step="any" placeholder="7" value="7">
            </div>
            <div class="form-group">
              <label class="form-label" for="dist-2d-y2">y₂</label>
              <input class="form-input form-input--lg" type="number" id="dist-2d-y2" step="any" placeholder="10" value="10">
            </div>
          </div>
        </div>

        <!-- 3D Form -->
        <div id="dist-form-3d" style="display:none">
          <div style="font-size:.85rem;font-weight:600;color:var(--color-text-muted);margin-bottom:.5rem">Point 1 (x₁, y₁, z₁)</div>
          <div class="form-row--3 form-row">
            <div class="form-group">
              <label class="form-label" for="dist-3d-x1">x₁</label>
              <input class="form-input form-input--lg" type="number" id="dist-3d-x1" step="any" placeholder="0" value="0">
            </div>
            <div class="form-group">
              <label class="form-label" for="dist-3d-y1">y₁</label>
              <input class="form-input form-input--lg" type="number" id="dist-3d-y1" step="any" placeholder="0" value="0">
            </div>
            <div class="form-group">
              <label class="form-label" for="dist-3d-z1">z₁</label>
              <input class="form-input form-input--lg" type="number" id="dist-3d-z1" step="any" placeholder="0" value="0">
            </div>
          </div>

          <div style="font-size:.85rem;font-weight:600;color:var(--color-text-muted);margin-bottom:.5rem;margin-top:.25rem">Point 2 (x₂, y₂, z₂)</div>
          <div class="form-row--3 form-row">
            <div class="form-group">
              <label class="form-label" for="dist-3d-x2">x₂</label>
              <input class="form-input form-input--lg" type="number" id="dist-3d-x2" step="any" placeholder="2" value="2">
            </div>
            <div class="form-group">
              <label class="form-label" for="dist-3d-y2">y₂</label>
              <input class="form-input form-input--lg" type="number" id="dist-3d-y2" step="any" placeholder="3" value="3">
            </div>
            <div class="form-group">
              <label class="form-label" for="dist-3d-z2">z₂</label>
              <input class="form-input form-input--lg" type="number" id="dist-3d-z2" step="any" placeholder="6" value="6">
            </div>
          </div>
        </div>

        <!-- Geographic Form -->
        <div id="dist-form-geo" style="display:none">
          <div style="font-size:.85rem;font-weight:600;color:var(--color-text-muted);margin-bottom:.5rem">Coordinate 1 (New Delhi)</div>
          <div class="form-row">
            <div class="form-group">
              <label class="form-label" for="dist-geo-lat1">Latitude 1 (°)</label>
              <input class="form-input form-input--lg" type="number" id="dist-geo-lat1" min="-90" max="90" step="any" placeholder="28.6139" value="28.6139">
            </div>
            <div class="form-group">
              <label class="form-label" for="dist-geo-lon1">Longitude 1 (°)</label>
              <input class="form-input form-input--lg" type="number" id="dist-geo-lon1" min="-180" max="180" step="any" placeholder="77.2090" value="77.2090">
            </div>
          </div>

          <div style="font-size:.85rem;font-weight:600;color:var(--color-text-muted);margin-bottom:.5rem;margin-top:.25rem">Coordinate 2 (Mumbai)</div>
          <div class="form-row">
            <div class="form-group">
              <label class="form-label" for="dist-geo-lat2">Latitude 2 (°)</label>
              <input class="form-input form-input--lg" type="number" id="dist-geo-lat2" min="-90" max="90" step="any" placeholder="19.0760" value="19.0760">
            </div>
            <div class="form-group">
              <label class="form-label" for="dist-geo-lon2">Longitude 2 (°)</label>
              <input class="form-input form-input--lg" type="number" id="dist-geo-lon2" min="-180" max="180" step="any" placeholder="72.8777" value="72.8777">
            </div>
          </div>
        </div>

        <button class="btn btn--primary btn--lg" id="dist-calc-btn" style="width:100%" aria-label="Calculate Distance">Calculate Distance</button>

        <!-- Result Box -->
        <div class="result-box result-box--hidden" id="dist-result">
          <div class="result-box__label">Straight-Line Distance (d)</div>
          <div style="display:flex;align-items:baseline;gap:.5rem;flex-wrap:wrap">
            <div class="result-box__value" id="dist-val">—</div>
            <span id="dist-unit-label" style="font-size:1.1rem;color:var(--color-text-muted);font-weight:600">units</span>
          </div>

          <div id="dist-badge-wrap" style="margin-top:.5rem"></div>

          <div class="result-box__sub" id="dist-stats"></div>
        </div>

        <!-- How To Use -->
        <div class="how-to" style="margin-top:1.5rem">
          <div class="how-to__title">How to use</div>
          <div class="how-to__body">
            <ol>
              <li>Select coordinate mode: <strong>2D Cartesian</strong> (x, y), <strong>3D Cartesian</strong> (x, y, z), or <strong>Geographic</strong> (latitude and longitude).</li>
              <li>Input the coordinates for Point 1 and Point 2.</li>
              <li>Click <strong>Calculate Distance</strong> to compute Euclidean distance, midpoint, and geographic travel distances.</li>
            </ol>
            <p style="margin-top:.5rem">
              <strong>Formulas:</strong> 2D: <code>d = √[(x₂ - x₁)² + (y₂ - y₁)²]</code> · 3D: <code>d = √[(Δx)² + (Δy)² + (Δz)²]</code> · Great-circle: Haversine equation.
            </p>
          </div>
        </div>

      </div>
    </div>
  `}function b(t){const{mode:p}=t;if(p==="2d"){const d=parseFloat(t.x1),r=parseFloat(t.y1),a=parseFloat(t.x2),n=parseFloat(t.y2);if(isNaN(d)||isNaN(r)||isNaN(a)||isNaN(n))return null;const o=a-d,i=n-r,l=Math.sqrt(o*o+i*i),c=(d+a)/2,u=(r+n)/2,v=Math.abs(o)+Math.abs(i);return{d:l.toFixed(4),midpoint:`(${c.toFixed(2)}, ${u.toFixed(2)})`,dx:o.toFixed(2),dy:i.toFixed(2),manhattan:v.toFixed(2),formula:`d = √[(${o})² + (${i})²] = √${(o*o+i*i).toFixed(2)}`}}else if(p==="3d"){const d=parseFloat(t.x1),r=parseFloat(t.y1),a=parseFloat(t.z1),n=parseFloat(t.x2),o=parseFloat(t.y2),i=parseFloat(t.z2);if(isNaN(d)||isNaN(r)||isNaN(a)||isNaN(n)||isNaN(o)||isNaN(i))return null;const l=n-d,c=o-r,u=i-a,v=l*l+c*c+u*u,s=Math.sqrt(v),e=(d+n)/2,m=(r+o)/2,f=(a+i)/2;return{d:s.toFixed(4),midpoint:`(${e.toFixed(2)}, ${m.toFixed(2)}, ${f.toFixed(2)})`,dx:l.toFixed(2),dy:c.toFixed(2),dz:u.toFixed(2),formula:`d = √[(${l})² + (${c})² + (${u})²] = √${v.toFixed(2)}`}}else if(p==="geo"){const d=parseFloat(t.lat1),r=parseFloat(t.lon1),a=parseFloat(t.lat2),n=parseFloat(t.lon2);if(isNaN(d)||isNaN(r)||isNaN(a)||isNaN(n))return null;const o=6371,i=(a-d)*(Math.PI/180),l=(n-r)*(Math.PI/180),c=Math.sin(i/2)*Math.sin(i/2)+Math.cos(d*(Math.PI/180))*Math.cos(a*(Math.PI/180))*Math.sin(l/2)*Math.sin(l/2),u=2*Math.atan2(Math.sqrt(c),Math.sqrt(1-c)),v=o*u,s=v*.621371,e=v*.539957,m=Math.sin(l)*Math.cos(a*(Math.PI/180)),f=Math.cos(d*(Math.PI/180))*Math.sin(a*(Math.PI/180))-Math.sin(d*(Math.PI/180))*Math.cos(a*(Math.PI/180))*Math.cos(l);let y=(Math.atan2(m,f)*(180/Math.PI)+360)%360;return{km:v.toFixed(2),miles:s.toFixed(2),nauticalMiles:e.toFixed(2),bearing:y.toFixed(1),isGeo:!0}}return null}function x(t){const p=t.querySelector("#dist-mode-seg"),d=t.querySelector("#dist-calc-btn"),r=t.querySelector("#dist-result"),a=t.querySelector("#dist-val"),n=t.querySelector("#dist-unit-label"),o=t.querySelector("#dist-badge-wrap"),i=t.querySelector("#dist-stats");if(!d)return;let l="2d";const c=t.querySelector("#dist-form-2d"),u=t.querySelector("#dist-form-3d"),v=t.querySelector("#dist-form-geo");p&&p.addEventListener("click",s=>{const e=s.target.closest("[data-mode]");e&&(l=e.dataset.mode,p.querySelectorAll(".segment__btn").forEach(m=>m.classList.remove("active")),e.classList.add("active"),c.style.display=l==="2d"?"":"none",u.style.display=l==="3d"?"":"none",v.style.display=l==="geo"?"":"none")}),d.addEventListener("click",()=>{let s={mode:l};l==="2d"?(s.x1=t.querySelector("#dist-2d-x1").value,s.y1=t.querySelector("#dist-2d-y1").value,s.x2=t.querySelector("#dist-2d-x2").value,s.y2=t.querySelector("#dist-2d-y2").value):l==="3d"?(s.x1=t.querySelector("#dist-3d-x1").value,s.y1=t.querySelector("#dist-3d-y1").value,s.z1=t.querySelector("#dist-3d-z1").value,s.x2=t.querySelector("#dist-3d-x2").value,s.y2=t.querySelector("#dist-3d-y2").value,s.z2=t.querySelector("#dist-3d-z2").value):(s.lat1=t.querySelector("#dist-geo-lat1").value,s.lon1=t.querySelector("#dist-geo-lon1").value,s.lat2=t.querySelector("#dist-geo-lat2").value,s.lon2=t.querySelector("#dist-geo-lon2").value);const e=b(s);if(!e){a.textContent="Invalid input",r.classList.remove("result-box--hidden"),o.innerHTML="",i.innerHTML="";return}if(r.classList.remove("result-box--hidden"),e.isGeo)a.textContent=parseFloat(e.km).toLocaleString(),n.textContent="km (kilometres)",o.innerHTML='<span class="bmi-badge bmi-badge--normal">Great-Circle Haversine Distance</span>',i.innerHTML=`
        <div class="result-stat"><div class="result-stat__label">Miles</div><div class="result-stat__value">${parseFloat(e.miles).toLocaleString()} mi</div></div>
        <div class="result-stat"><div class="result-stat__label">Nautical Miles</div><div class="result-stat__value">${parseFloat(e.nauticalMiles).toLocaleString()} NM</div></div>
        <div class="result-stat"><div class="result-stat__label">Initial Compass Bearing</div><div class="result-stat__value">${e.bearing}°</div></div>
      `;else{a.textContent=e.d,n.textContent="units",o.innerHTML=`<span class="bmi-badge bmi-badge--normal" style="font-family:var(--font-mono)">${e.formula}</span>`;let m=`
        <div class="result-stat"><div class="result-stat__label">Midpoint (M)</div><div class="result-stat__value">${e.midpoint}</div></div>
        <div class="result-stat"><div class="result-stat__label">Δx (Change in x)</div><div class="result-stat__value">${e.dx}</div></div>
        <div class="result-stat"><div class="result-stat__label">Δy (Change in y)</div><div class="result-stat__value">${e.dy}</div></div>
      `;e.dz!==void 0&&(m+=`<div class="result-stat"><div class="result-stat__label">Δz (Change in z)</div><div class="result-stat__value">${e.dz}</div></div>`),e.manhattan!==void 0&&(m+=`<div class="result-stat"><div class="result-stat__label">Manhattan Distance</div><div class="result-stat__value">${e.manhattan}</div></div>`),i.innerHTML=m}})}export{x as bindEvents,b as calculate,g as render};
