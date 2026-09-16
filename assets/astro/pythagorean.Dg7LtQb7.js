function m(e){if(e<=0||!Number.isInteger(e))return null;const c=Math.sqrt(e);if(Number.isInteger(c))return`${c}`;let s=1,l=e;for(let t=2;t*t<=l;t++)for(;l%(t*t)===0;)s*=t,l/=t*t;return s===1?`√${e}`:`${s}√${l}`}function g(e){e.innerHTML=`
    <div class="calc-panel">
      <div class="calc-panel__header">
        <span class="calc-panel__title">Pythagorean Theorem</span>
        <div class="segment" id="pyth-mode-seg">
          <button class="segment__btn active" data-mode="find-c">Find Hypotenuse (c)</button>
          <button class="segment__btn" data-mode="find-a">Find Leg (a)</button>
          <button class="segment__btn" data-mode="find-b">Find Leg (b)</button>
          <button class="segment__btn" data-mode="verify">Check Right Triangle</button>
        </div>
      </div>
      <div class="calc-panel__body">

        <!-- Find Hypotenuse Form -->
        <div id="pyth-form-find-c">
          <div class="form-row">
            <div class="form-group">
              <label class="form-label" for="pyth-c-a">Leg a</label>
              <input class="form-input form-input--lg" type="number" id="pyth-c-a" min="0.001" step="any" placeholder="3" value="3" aria-label="Leg a">
            </div>
            <div class="form-group">
              <label class="form-label" for="pyth-c-b">Leg b</label>
              <input class="form-input form-input--lg" type="number" id="pyth-c-b" min="0.001" step="any" placeholder="4" value="4" aria-label="Leg b">
            </div>
          </div>
        </div>

        <!-- Find Leg a Form -->
        <div id="pyth-form-find-a" style="display:none">
          <div class="form-row">
            <div class="form-group">
              <label class="form-label" for="pyth-a-b">Leg b</label>
              <input class="form-input form-input--lg" type="number" id="pyth-a-b" min="0.001" step="any" placeholder="12" value="12">
            </div>
            <div class="form-group">
              <label class="form-label" for="pyth-a-c">Hypotenuse c</label>
              <input class="form-input form-input--lg" type="number" id="pyth-a-c" min="0.001" step="any" placeholder="13" value="13">
            </div>
          </div>
        </div>

        <!-- Find Leg b Form -->
        <div id="pyth-form-find-b" style="display:none">
          <div class="form-row">
            <div class="form-group">
              <label class="form-label" for="pyth-b-a">Leg a</label>
              <input class="form-input form-input--lg" type="number" id="pyth-b-a" min="0.001" step="any" placeholder="8" value="8">
            </div>
            <div class="form-group">
              <label class="form-label" for="pyth-b-c">Hypotenuse c</label>
              <input class="form-input form-input--lg" type="number" id="pyth-b-c" min="0.001" step="any" placeholder="17" value="17">
            </div>
          </div>
        </div>

        <!-- Verify Form -->
        <div id="pyth-form-verify" style="display:none">
          <div class="form-row--3 form-row">
            <div class="form-group">
              <label class="form-label" for="pyth-v-a">Side a</label>
              <input class="form-input form-input--lg" type="number" id="pyth-v-a" min="0.001" step="any" placeholder="5" value="5">
            </div>
            <div class="form-group">
              <label class="form-label" for="pyth-v-b">Side b</label>
              <input class="form-input form-input--lg" type="number" id="pyth-v-b" min="0.001" step="any" placeholder="12" value="12">
            </div>
            <div class="form-group">
              <label class="form-label" for="pyth-v-c">Side c (Longest)</label>
              <input class="form-input form-input--lg" type="number" id="pyth-v-c" min="0.001" step="any" placeholder="13" value="13">
            </div>
          </div>
        </div>

        <button class="btn btn--primary btn--lg" id="pyth-calc-btn" style="width:100%" aria-label="Calculate Pythagorean">Calculate Side</button>

        <!-- Result Box -->
        <div class="result-box result-box--hidden" id="pyth-result">
          <div class="result-box__label" id="pyth-target-label">Hypotenuse (c)</div>
          <div style="display:flex;align-items:baseline;gap:.5rem;flex-wrap:wrap">
            <div class="result-box__value" id="pyth-val">—</div>
            <span id="pyth-radical-val" style="font-size:1.25rem;font-family:var(--font-mono);color:var(--color-text-muted);font-weight:600"></span>
          </div>

          <div id="pyth-badges-wrap" style="margin-top:.5rem;display:flex;flex-wrap:wrap;gap:.5rem"></div>

          <div class="result-box__sub" id="pyth-stats"></div>

          <!-- Step-by-Step Proof / Substitution -->
          <div style="margin-top:1.25rem;padding:1rem 1.25rem;background:var(--color-surface);border:1px solid var(--color-border);border-radius:10px" id="pyth-steps-box">
            <div style="font-size:.78rem;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:var(--color-accent);margin-bottom:.5rem">Algebraic Steps &amp; Substitution</div>
            <div style="display:flex;flex-direction:column;gap:.35rem;font-family:var(--font-mono);font-size:.875rem;color:var(--color-text);line-height:1.6" id="pyth-steps-content"></div>
          </div>
        </div>

        <!-- How To Use -->
        <div class="how-to" style="margin-top:1.5rem">
          <div class="how-to__title">How to use</div>
          <div class="how-to__body">
            <ol>
              <li>Select whether to find the <strong>Hypotenuse (c)</strong>, <strong>Leg (a)</strong>, <strong>Leg (b)</strong>, or <strong>Verify a Right Triangle</strong>.</li>
              <li>Input positive numbers for the known side lengths.</li>
              <li>Click <strong>Calculate Side</strong> to obtain exact radical forms, decimal answers, triangle area, perimeter, and acute angles.</li>
            </ol>
            <p style="margin-top:.5rem">
              <strong>Theorem:</strong> In a right-angled triangle, the square of the hypotenuse is equal to the sum of squares of the other two sides: <code>a² + b² = c²</code>.
            </p>
          </div>
        </div>

      </div>
    </div>
  `}function h(e){const{mode:c}=e;let s,l,t,a=[];if(c==="find-c"){if(s=parseFloat(e.a),l=parseFloat(e.b),!s||!l||s<=0||l<=0)return null;const n=s*s,o=l*l,i=n+o;t=Math.sqrt(i),a.push("a² + b² = c²"),a.push(`(${s})² + (${l})² = c²`),a.push(`${n.toFixed(2)} + ${o.toFixed(2)} = ${i.toFixed(2)} = c²`),a.push(`c = √${i.toFixed(2)} ≈ ${t.toFixed(4)}`);const d=Number.isInteger(i)?m(i):null;return f(s,l,t,"Hypotenuse (c)",t,d,a)}else if(c==="find-a"){if(l=parseFloat(e.b),t=parseFloat(e.c),!l||!t||l<=0||t<=0)return null;if(t<=l)return{error:"Hypotenuse (c) must be strictly greater than Leg (b)."};const n=t*t,o=l*l,i=n-o;s=Math.sqrt(i),a.push("a² = c² - b²"),a.push(`a² = (${t})² - (${l})²`),a.push(`a² = ${n.toFixed(2)} - ${o.toFixed(2)} = ${i.toFixed(2)}`),a.push(`a = √${i.toFixed(2)} ≈ ${s.toFixed(4)}`);const d=Number.isInteger(i)?m(i):null;return f(s,l,t,"Leg (a)",s,d,a)}else if(c==="find-b"){if(s=parseFloat(e.a),t=parseFloat(e.c),!s||!t||s<=0||t<=0)return null;if(t<=s)return{error:"Hypotenuse (c) must be strictly greater than Leg (a)."};const n=t*t,o=s*s,i=n-o;l=Math.sqrt(i),a.push("b² = c² - a²"),a.push(`b² = (${t})² - (${s})²`),a.push(`b² = ${n.toFixed(2)} - ${o.toFixed(2)} = ${i.toFixed(2)}`),a.push(`b = √${i.toFixed(2)} ≈ ${l.toFixed(4)}`);const d=Number.isInteger(i)?m(i):null;return f(s,l,t,"Leg (b)",l,d,a)}else if(c==="verify"){if(s=parseFloat(e.a),l=parseFloat(e.b),t=parseFloat(e.c),!s||!l||!t||s<=0||l<=0||t<=0)return null;const n=[s,l,t].sort((b,y)=>b-y),o=n[0],i=n[1],d=n[2],p=o*o+i*i,v=d*d,r=Math.abs(p-v)<1e-4;return a.push("Check if a² + b² = c²"),a.push(`(${o})² + (${i})² = ${(o*o).toFixed(2)} + ${(i*i).toFixed(2)} = ${p.toFixed(2)}`),a.push(`c² = (${d})² = ${v.toFixed(2)}`),a.push(r?`Since ${p.toFixed(2)} == ${v.toFixed(2)}, this is a RIGHT TRIANGLE!`:`Since ${p.toFixed(2)} ≠ ${v.toFixed(2)}, this is NOT a right triangle.`),{isVerifyOnly:!0,isRight:r,a:o.toFixed(3),b:i.toFixed(3),c:d.toFixed(3),steps:a}}return null}function f(e,c,s,l,t,a,n){const o=.5*e*c,i=e+c+s,d=Math.asin(e/s)*(180/Math.PI),p=90-d,v=e*c/s,u=Number.isInteger(e)&&Number.isInteger(c)&&Number.isInteger(s);return{label:l,primaryVal:t.toFixed(4),primaryFormatted:Number.isInteger(t)?t.toString():t.toFixed(4),radical:a&&a!==t.toString()?`(= ${a})`:"",a:e.toFixed(3),b:c.toFixed(3),c:s.toFixed(3),area:o.toFixed(3),perimeter:i.toFixed(3),alphaDeg:d.toFixed(2),betaDeg:p.toFixed(2),altitude:v.toFixed(3),isTriple:u,steps:n}}function x(e){const c=e.querySelector("#pyth-mode-seg"),s=e.querySelector("#pyth-calc-btn"),l=e.querySelector("#pyth-result"),t=e.querySelector("#pyth-target-label"),a=e.querySelector("#pyth-val"),n=e.querySelector("#pyth-radical-val"),o=e.querySelector("#pyth-badges-wrap"),i=e.querySelector("#pyth-stats"),d=e.querySelector("#pyth-steps-content");if(!s)return;let p="find-c";const v={"find-c":e.querySelector("#pyth-form-find-c"),"find-a":e.querySelector("#pyth-form-find-a"),"find-b":e.querySelector("#pyth-form-find-b"),verify:e.querySelector("#pyth-form-verify")};c&&c.addEventListener("click",u=>{const r=u.target.closest("[data-mode]");r&&(p=r.dataset.mode,c.querySelectorAll(".segment__btn").forEach(b=>b.classList.remove("active")),r.classList.add("active"),Object.keys(v).forEach(b=>{v[b]&&(v[b].style.display=b===p?"":"none")}),s.textContent=p==="verify"?"Check Triangle":"Calculate Side")}),s.addEventListener("click",()=>{let u={mode:p};p==="find-c"?(u.a=e.querySelector("#pyth-c-a").value,u.b=e.querySelector("#pyth-c-b").value):p==="find-a"?(u.b=e.querySelector("#pyth-a-b").value,u.c=e.querySelector("#pyth-a-c").value):p==="find-b"?(u.a=e.querySelector("#pyth-b-a").value,u.c=e.querySelector("#pyth-b-c").value):(u.a=e.querySelector("#pyth-v-a").value,u.b=e.querySelector("#pyth-v-b").value,u.c=e.querySelector("#pyth-v-c").value);const r=h(u);if(!r){a.textContent="Invalid input",l.classList.remove("result-box--hidden"),n.textContent="",o.innerHTML="",i.innerHTML="",d.innerHTML="";return}if(r.error){a.textContent="Calculation Error",l.classList.remove("result-box--hidden"),n.textContent="",o.innerHTML=`<span class="bmi-badge bmi-badge--obese">${r.error}</span>`,i.innerHTML="",d.innerHTML="";return}if(l.classList.remove("result-box--hidden"),r.isVerifyOnly){t.textContent="Right Triangle Check",a.textContent=r.isRight?"Valid Right Triangle":"Not a Right Triangle",n.textContent="",o.innerHTML=`
        <span class="bmi-badge ${r.isRight?"bmi-badge--normal":"bmi-badge--over"}">${r.isRight?"✓ Satisfies a² + b² = c²":"✗ Violates a² + b² = c²"}</span>
      `,i.innerHTML=`
        <div class="result-stat"><div class="result-stat__label">Side a</div><div class="result-stat__value">${r.a}</div></div>
        <div class="result-stat"><div class="result-stat__label">Side b</div><div class="result-stat__value">${r.b}</div></div>
        <div class="result-stat"><div class="result-stat__label">Side c</div><div class="result-stat__value">${r.c}</div></div>
      `,d.innerHTML=r.steps.map(b=>`<div>${b}</div>`).join("");return}t.textContent=r.label,a.textContent=r.primaryFormatted,n.textContent=r.radical,o.innerHTML=`
      <span class="bmi-badge bmi-badge--normal">Right Triangle (90°)</span>
      ${r.isTriple?'<span class="bmi-badge bmi-badge--normal">⭐ Pythagorean Integer Triple</span>':""}
    `,i.innerHTML=`
      <div class="result-stat"><div class="result-stat__label">Area (A)</div><div class="result-stat__value">${r.area}</div></div>
      <div class="result-stat"><div class="result-stat__label">Perimeter (P)</div><div class="result-stat__value">${r.perimeter}</div></div>
      <div class="result-stat"><div class="result-stat__label">Angle α (Opposite a)</div><div class="result-stat__value">${r.alphaDeg}°</div></div>
      <div class="result-stat"><div class="result-stat__label">Angle β (Opposite b)</div><div class="result-stat__value">${r.betaDeg}°</div></div>
      <div class="result-stat"><div class="result-stat__label">Altitude to Hypotenuse</div><div class="result-stat__value">${r.altitude}</div></div>
    `,d.innerHTML=r.steps.map(b=>`<div>${b}</div>`).join("")})}export{x as bindEvents,h as calculate,g as render};
