function m(e){e.innerHTML=`
    <div class="calc-panel">
      <div class="calc-panel__header">
        <span class="calc-panel__title">Matrix Calculator (2×2)</span>
        <div class="calc-panel__header-icon calc-panel__header-icon--success">▦</div>
      </div>
      <div class="calc-panel__body">
        <div class="tab-list" role="tablist">
          <button class="tab-btn active" role="tab" data-tab="mat-mode1" aria-selected="true">Add/Sub</button>
          <button class="tab-btn" role="tab" data-tab="mat-mode2" aria-selected="false">Multiply</button>
          <button class="tab-btn" role="tab" data-tab="mat-mode3" aria-selected="false">Determinant</button>
          <button class="tab-btn" role="tab" data-tab="mat-mode4" aria-selected="false">Inverse</button>
        </div>

        <!-- Add/Subtract -->
        <div class="tab-panel active" id="mat-mode1">
          <p style="margin-bottom:.5rem;font-size:.9rem;color:var(--color-text-muted)">Matrix A</p>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:.5rem;margin-bottom:1rem">
            <input class="form-input" type="number" id="mat-a11" placeholder="a11">
            <input class="form-input" type="number" id="mat-a12" placeholder="a12">
            <input class="form-input" type="number" id="mat-a21" placeholder="a21">
            <input class="form-input" type="number" id="mat-a22" placeholder="a22">
          </div>
          <div style="text-align:center;margin:.5rem 0">
            <label style="cursor:pointer">
              <input type="radio" name="mat-op1" value="add" checked> Add
              <input type="radio" name="mat-op1" value="sub" style="margin-left:1rem"> Subtract
            </label>
          </div>
          <p style="margin-bottom:.5rem;font-size:.9rem;color:var(--color-text-muted)">Matrix B</p>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:.5rem;margin-bottom:1rem">
            <input class="form-input" type="number" id="mat-b11" placeholder="b11">
            <input class="form-input" type="number" id="mat-b12" placeholder="b12">
            <input class="form-input" type="number" id="mat-b21" placeholder="b21">
            <input class="form-input" type="number" id="mat-b22" placeholder="b22">
          </div>
          <button class="btn btn--primary" id="mat-add-sub-btn" style="width:100%">Calculate</button>
          <div class="result-box result-box--hidden" id="mat-add-result" style="margin-top:1rem">
            <div class="result-box__label">Result</div>
            <div class="result-box__value" id="mat-add-value">—</div>
          </div>
        </div>

        <!-- Multiply -->
        <div class="tab-panel" id="mat-mode2">
          <p style="margin-bottom:.5rem;font-size:.9rem;color:var(--color-text-muted)">Matrix A (2×2)</p>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:.5rem;margin-bottom:1rem">
            <input class="form-input" type="number" id="mat-mul-a11" placeholder="a11">
            <input class="form-input" type="number" id="mat-mul-a12" placeholder="a12">
            <input class="form-input" type="number" id="mat-mul-a21" placeholder="a21">
            <input class="form-input" type="number" id="mat-mul-a22" placeholder="a22">
          </div>
          <p style="margin-bottom:.5rem;font-size:.9rem;color:var(--color-text-muted)">Matrix B (2×2)</p>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:.5rem;margin-bottom:1rem">
            <input class="form-input" type="number" id="mat-mul-b11" placeholder="b11">
            <input class="form-input" type="number" id="mat-mul-b12" placeholder="b12">
            <input class="form-input" type="number" id="mat-mul-b21" placeholder="b21">
            <input class="form-input" type="number" id="mat-mul-b22" placeholder="b22">
          </div>
          <button class="btn btn--primary" id="mat-mul-btn" style="width:100%">Multiply</button>
          <div class="result-box result-box--hidden" id="mat-mul-result" style="margin-top:1rem">
            <div class="result-box__label">Result</div>
            <div class="result-box__value" id="mat-mul-value">—</div>
          </div>
        </div>

        <!-- Determinant -->
        <div class="tab-panel" id="mat-mode3">
          <p style="margin-bottom:.5rem;font-size:.9rem;color:var(--color-text-muted)">Matrix (2×2)</p>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:.5rem;margin-bottom:1rem">
            <input class="form-input" type="number" id="mat-det-11" placeholder="a11">
            <input class="form-input" type="number" id="mat-det-12" placeholder="a12">
            <input class="form-input" type="number" id="mat-det-21" placeholder="a21">
            <input class="form-input" type="number" id="mat-det-22" placeholder="a22">
          </div>
          <button class="btn btn--primary" id="mat-det-btn" style="width:100%">Find Determinant</button>
          <div class="result-box result-box--hidden" id="mat-det-result" style="margin-top:1rem">
            <div class="result-box__label">Determinant</div>
            <div class="result-box__value" id="mat-det-value">—</div>
          </div>
        </div>

        <!-- Inverse -->
        <div class="tab-panel" id="mat-mode4">
          <p style="margin-bottom:.5rem;font-size:.9rem;color:var(--color-text-muted)">Matrix (2×2)</p>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:.5rem;margin-bottom:1rem">
            <input class="form-input" type="number" id="mat-inv-11" placeholder="a11">
            <input class="form-input" type="number" id="mat-inv-12" placeholder="a12">
            <input class="form-input" type="number" id="mat-inv-21" placeholder="a21">
            <input class="form-input" type="number" id="mat-inv-22" placeholder="a22">
          </div>
          <button class="btn btn--primary" id="mat-inv-btn" style="width:100%">Find Inverse</button>
          <div class="result-box result-box--hidden" id="mat-inv-result" style="margin-top:1rem">
            <div class="result-box__label">Inverse Matrix</div>
            <div class="result-box__value" id="mat-inv-value">—</div>
          </div>
        </div>

        <div class="how-to" style="margin-top:1.5rem">
          <div class="how-to__title">Formulas</div>
          <div class="how-to__body">
            <p><strong>Determinant:</strong> det = a₁₁a₂₂ - a₁₂a₂₁</p>
            <p><strong>Inverse:</strong> A⁻¹ = (1/det) × [a₂₂, -a₁₂; -a₂₁, a₁₁]</p>
            <p><strong>Multiply:</strong> C[i,j] = Σ A[i,k] × B[k,j]</p>
          </div>
        </div>
      </div>
    </div>
  `}function r(e){return[[parseFloat(container.querySelector(`#${e}11`).value)||0,parseFloat(container.querySelector(`#${e}12`).value)||0],[parseFloat(container.querySelector(`#${e}21`).value)||0,parseFloat(container.querySelector(`#${e}22`).value)||0]]}function i(e){return`| ${e[0][0].toFixed(2)}  ${e[0][1].toFixed(2)} |
| ${e[1][0].toFixed(2)}  ${e[1][1].toFixed(2)} |`}function n(e){const s=e.querySelectorAll(".tab-btn"),d=e.querySelectorAll(".tab-panel");s.forEach(t=>{t.addEventListener("click",()=>{s.forEach(a=>{a.classList.remove("active"),a.setAttribute("aria-selected","false")}),d.forEach(a=>a.classList.remove("active")),t.classList.add("active"),t.setAttribute("aria-selected","true"),e.querySelector("#"+t.dataset.tab).classList.add("active")})}),e.querySelector("#mat-add-sub-btn").addEventListener("click",()=>{const t=r("mat-a"),a=r("mat-b"),l=e.querySelector('input[name="mat-op1"]:checked').value==="add",o=[[l?t[0][0]+a[0][0]:t[0][0]-a[0][0],l?t[0][1]+a[0][1]:t[0][1]-a[0][1]],[l?t[1][0]+a[1][0]:t[1][0]-a[1][0],l?t[1][1]+a[1][1]:t[1][1]-a[1][1]]];e.querySelector("#mat-add-value").textContent=i(o),e.querySelector("#mat-add-result").classList.remove("result-box--hidden")}),e.querySelector("#mat-mul-btn").addEventListener("click",()=>{const t=r("mat-mul-a"),a=r("mat-mul-b"),l=[[t[0][0]*a[0][0]+t[0][1]*a[1][0],t[0][0]*a[0][1]+t[0][1]*a[1][1]],[t[1][0]*a[0][0]+t[1][1]*a[1][0],t[1][0]*a[0][1]+t[1][1]*a[1][1]]];e.querySelector("#mat-mul-value").textContent=i(l),e.querySelector("#mat-mul-result").classList.remove("result-box--hidden")}),e.querySelector("#mat-det-btn").addEventListener("click",()=>{const t=r("mat-det"),a=t[0][0]*t[1][1]-t[0][1]*t[1][0];e.querySelector("#mat-det-value").textContent=a.toFixed(4),e.querySelector("#mat-det-result").classList.remove("result-box--hidden")}),e.querySelector("#mat-inv-btn").addEventListener("click",()=>{const t=r("mat-inv"),a=t[0][0]*t[1][1]-t[0][1]*t[1][0];if(Math.abs(a)<1e-10){e.querySelector("#mat-inv-value").textContent="Determinant is 0 - no inverse exists",e.querySelector("#mat-inv-result").classList.remove("result-box--hidden");return}const l=[[t[1][1]/a,-t[0][1]/a],[-t[1][0]/a,t[0][0]/a]];e.querySelector("#mat-inv-value").textContent=i(l),e.querySelector("#mat-inv-result").classList.remove("result-box--hidden")})}export{n as bindEvents,m as render};
