function b(e){e.innerHTML=`
    <div class="calc-panel">
      <div class="calc-panel__header">
        <span class="calc-panel__title">Percentage Calculator</span>
      </div>
      <div class="calc-panel__body">
        <div class="tab-list" role="tablist">
          <button class="tab-btn active" role="tab" data-tab="mode1" aria-selected="true">X% of Y</button>
          <button class="tab-btn" role="tab" data-tab="mode2" aria-selected="false">X is ?% of Y</button>
          <button class="tab-btn" role="tab" data-tab="mode3" aria-selected="false">% Change</button>
        </div>

        <!-- Mode 1: What is X% of Y -->
        <div class="tab-panel active" id="mode1">
          <div class="form-row" style="align-items:end;gap:.75rem">
            <div class="form-group" style="margin-bottom:0">
              <label class="form-label" for="pct-x1">Percentage (%)</label>
              <input class="form-input form-input--lg" type="number" id="pct-x1" placeholder="25" aria-label="Percentage value">
            </div>
            <div style="padding-bottom:.85rem;font-size:1.2rem;font-weight:700;color:var(--color-text-muted)">% of</div>
            <div class="form-group" style="margin-bottom:0">
              <label class="form-label" for="pct-y1">Number</label>
              <input class="form-input form-input--lg" type="number" id="pct-y1" placeholder="200" aria-label="Number value">
            </div>
          </div>
          <div class="result-box result-box--hidden" id="res1">
            <div class="result-box__label">Result</div>
            <div class="result-box__value" id="res1-val">—</div>
          </div>
        </div>

        <!-- Mode 2: X is what % of Y -->
        <div class="tab-panel" id="mode2">
          <div class="form-row" style="align-items:end;gap:.75rem">
            <div class="form-group" style="margin-bottom:0">
              <label class="form-label" for="pct-x2">Value (X)</label>
              <input class="form-input form-input--lg" type="number" id="pct-x2" placeholder="50" aria-label="Value X">
            </div>
            <div style="padding-bottom:.85rem;font-size:1.2rem;font-weight:700;color:var(--color-text-muted)">is ?% of</div>
            <div class="form-group" style="margin-bottom:0">
              <label class="form-label" for="pct-y2">Total (Y)</label>
              <input class="form-input form-input--lg" type="number" id="pct-y2" placeholder="200" aria-label="Total value Y">
            </div>
          </div>
          <div class="result-box result-box--hidden" id="res2">
            <div class="result-box__label">Result</div>
            <div class="result-box__value" id="res2-val">—</div>
          </div>
        </div>

        <!-- Mode 3: Percentage change -->
        <div class="tab-panel" id="mode3">
          <div class="form-row">
            <div class="form-group">
              <label class="form-label" for="pct-from">From</label>
              <input class="form-input form-input--lg" type="number" id="pct-from" placeholder="100" aria-label="Starting value">
            </div>
            <div class="form-group">
              <label class="form-label" for="pct-to">To</label>
              <input class="form-input form-input--lg" type="number" id="pct-to" placeholder="135" aria-label="Ending value">
            </div>
          </div>
          <div class="result-box result-box--hidden" id="res3">
            <div class="result-box__label">Percentage Change</div>
            <div class="result-box__value" id="res3-val">—</div>
          </div>
        </div>

        <div class="how-to" style="margin-top:1.5rem">
          <div class="how-to__title">How to use</div>
          <div class="how-to__body">
            Select a mode above, enter your values, and the result updates as you type.
            <ul style="list-style:disc;margin-top:.5rem">
              <li><strong>X% of Y</strong> — find a percentage of a number</li>
              <li><strong>X is ?% of Y</strong> — find what percentage X is of Y</li>
              <li><strong>% Change</strong> — find the percentage increase or decrease</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  `}function d({mode:e,x:s,y:o}){return e===1?{result:s/100*o}:e===2?{result:o!==0?s/o*100:null}:e===3?{result:s!==0?(o-s)/Math.abs(s)*100:null}:{result:null}}function c(e,s=""){return e===null||!isFinite(e)?"Error":`${Math.abs(e)>=1e3?e.toLocaleString(void 0,{maximumFractionDigits:2}):+e.toFixed(4)}${s}`}function m(e){const s=e.querySelectorAll(".tab-btn"),o=e.querySelectorAll(".tab-panel");s.forEach(t=>{t.addEventListener("click",()=>{s.forEach(l=>{l.classList.remove("active"),l.setAttribute("aria-selected","false")}),o.forEach(l=>l.classList.remove("active")),t.classList.add("active"),t.setAttribute("aria-selected","true"),e.querySelector("#"+t.dataset.tab).classList.add("active")})});function u(){const t=parseFloat(e.querySelector("#pct-x1").value),l=parseFloat(e.querySelector("#pct-y1").value),a=e.querySelector("#res1"),i=e.querySelector("#res1-val");if(!isNaN(t)&&!isNaN(l)){const{result:r}=d({mode:1,x:t,y:l});i.textContent=c(r),a.classList.remove("result-box--hidden")}else a.classList.add("result-box--hidden")}function n(){const t=parseFloat(e.querySelector("#pct-x2").value),l=parseFloat(e.querySelector("#pct-y2").value),a=e.querySelector("#res2"),i=e.querySelector("#res2-val");if(!isNaN(t)&&!isNaN(l)){const{result:r}=d({mode:2,x:t,y:l});i.textContent=c(r,"%"),a.classList.remove("result-box--hidden")}else a.classList.add("result-box--hidden")}function v(){const t=parseFloat(e.querySelector("#pct-from").value),l=parseFloat(e.querySelector("#pct-to").value),a=e.querySelector("#res3"),i=e.querySelector("#res3-val");if(!isNaN(t)&&!isNaN(l)){const{result:r}=d({mode:3,x:t,y:l}),p=r>0?"+":"";i.textContent=`${p}${c(r,"%")}`,i.style.color=r>0?"var(--color-success)":r<0?"var(--color-danger)":"",a.classList.remove("result-box--hidden")}else a.classList.add("result-box--hidden")}e.querySelector("#pct-x1").addEventListener("input",u),e.querySelector("#pct-y1").addEventListener("input",u),e.querySelector("#pct-x2").addEventListener("input",n),e.querySelector("#pct-y2").addEventListener("input",n),e.querySelector("#pct-from").addEventListener("input",v),e.querySelector("#pct-to").addEventListener("input",v)}export{m as bindEvents,d as calculate,b as render};
