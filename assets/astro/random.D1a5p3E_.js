function c(e){e.innerHTML=`
    <div class="calc-panel">
      <div class="calc-panel__header">
        <span class="calc-panel__title">Random Number Generator</span>
        <div class="calc-panel__header-icon">🎲</div>
      </div>
      <div class="calc-panel__body">
        <div class="form-row">
          <div class="form-group">
            <label class="form-label" for="rand-min">Minimum</label>
            <input class="form-input form-input--lg" type="number" id="rand-min" value="1">
          </div>
          <div class="form-group">
            <label class="form-label" for="rand-max">Maximum</label>
            <input class="form-input form-input--lg" type="number" id="rand-max" value="100">
          </div>
        </div>

        <div class="form-group">
          <label class="form-label" for="rand-count">How many numbers?</label>
          <input class="form-input form-input--lg" type="number" id="rand-count" value="1" min="1" max="100">
        </div>

        <div class="form-group">
          <label class="checkbox-label">
            <input type="checkbox" id="rand-unique">
            <span>Allow duplicates</span>
          </label>
        </div>

        <button class="btn btn--primary btn--lg" id="rand-btn" style="width:100%" aria-label="Generate random numbers">Generate</button>

        <div class="result-box result-box--hidden" id="rand-result">
          <div class="result-box__label">Random Number(s)</div>
          <div class="result-box__value" id="rand-value">—</div>
        </div>

        <div class="how-to" style="margin-top:1.5rem">
          <div class="how-to__title">Formula</div>
          <div class="how-to__body">
            <p>For a random integer between <strong>min</strong> and <strong>max</strong>:</p>
            <code style="display:block;background:var(--color-bg-subtle);padding:.75rem;border-radius:4px;margin:.5rem 0">
              result = Math.floor(Math.random() × (max - min + 1)) + min
            </code>
            <p style="margin-top:.5rem">The <code>Math.random()</code> function returns a floating-point number between 0 (inclusive) and 1 (exclusive).</p>
          </div>
        </div>
      </div>
    </div>
  `}function m(e){const d=e.querySelector("#rand-btn"),r=e.querySelector("#rand-result"),l=e.querySelector("#rand-value");function u(){const n=parseInt(e.querySelector("#rand-min").value)||1,t=parseInt(e.querySelector("#rand-max").value)||100,s=parseInt(e.querySelector("#rand-count").value)||1,i=!e.querySelector("#rand-unique").checked;if(n>t){l.textContent="Min must be ≤ Max",r.classList.remove("result-box--hidden");return}if(s>100){l.textContent="Max 100 numbers",r.classList.remove("result-box--hidden");return}const a=[];if(i&&s>t-n+1){l.textContent=`Cannot generate ${s} unique numbers in range [${n}, ${t}]`,r.classList.remove("result-box--hidden");return}for(;a.length<s;){const o=Math.floor(Math.random()*(t-n+1))+n;i&&a.includes(o)||a.push(o)}l.textContent=a.join(", "),r.classList.remove("result-box--hidden")}d.addEventListener("click",u)}export{m as bindEvents,c as render};
