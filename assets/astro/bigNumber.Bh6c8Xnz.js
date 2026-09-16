function b(n){n.innerHTML=`
    <div class="calc-panel">
      <div class="calc-panel__header">
        <span class="calc-panel__title">Big Number Calculator</span>
        <div class="calc-panel__header-icon calc-panel__header-icon--warning">∞</div>
      </div>
      <div class="calc-panel__body">
        <div class="form-group">
          <label class="form-label" for="bn-num1">First large number</label>
          <input class="form-input form-input--lg" type="text" id="bn-num1" placeholder="e.g. 12345678901234567890" aria-label="First big number">
        </div>

        <div class="form-group">
          <div class="radio-group">
            <label><input type="radio" name="bn-op" value="add" checked><span>+</span></label>
            <label><input type="radio" name="bn-op" value="sub"><span>−</span></label>
            <label><input type="radio" name="bn-op" value="mul"><span>×</span></label>
            <label><input type="radio" name="bn-op" value="pow"><span>^</span></label>
          </div>
        </div>

        <div class="form-group">
          <label class="form-label" for="bn-num2">Second number (or exponent)</label>
          <input class="form-input form-input--lg" type="text" id="bn-num2" placeholder="e.g. 9876543210" aria-label="Second big number">
        </div>

        <button class="btn btn--primary btn--lg" id="bn-btn" style="width:100%" aria-label="Calculate">Calculate</button>

        <div class="result-box result-box--hidden" id="bn-result">
          <div class="result-box__label">Result</div>
          <div class="result-box__value" id="bn-value">—</div>
          <div id="bn-details" style="margin-top:.5rem;font-size:.9rem;color:var(--color-text-muted)"></div>
        </div>

        <div class="how-to" style="margin-top:1.5rem">
          <div class="how-to__title">Formulas & Explanations</div>
          <div class="how-to__body">
            <p><strong>Big Number Arithmetic:</strong> Handles numbers beyond JavaScript's safe integer limit (2⁵³−1 ≈ 9 quadrillion).</p>
            <code style="display:block;background:var(--color-bg-subtle);padding:.75rem;border-radius:4px;margin:.5rem 0">
              JavaScript Safe Integer: -9,007,199,254,740,991 to 9,007,199,254,740,991
            </code>
            <p style="margin-top:.5rem"><strong>Addition:</strong> Add corresponding digits, handle carries</p>
            <p><strong>Subtraction:</strong> Subtract corresponding digits, handle borrows</p>
            <p><strong>Multiplication:</strong> Use long multiplication algorithm (O(n²))</p>
            <p><strong>Power:</strong> aⁿ = a × a × a × ... × a (n times)</p>
            <p style="margin-top:.5rem;color:var(--color-text-muted)">This calculator uses JavaScript BigInt for arbitrary precision arithmetic.</p>
          </div>
        </div>
      </div>
    </div>
  `}function g(n){const u=n.querySelector("#bn-btn"),s=n.querySelector("#bn-result"),o=n.querySelector("#bn-value"),r=n.querySelector("#bn-details");function p(){const l=n.querySelector("#bn-num1").value.replace(/[,\s]/g,""),i=n.querySelector("#bn-num2").value.replace(/[,\s]/g,""),c=n.querySelector('input[name="bn-op"]:checked').value;if(!l){o.textContent="Please enter first number",r.textContent="",s.classList.remove("result-box--hidden");return}if(!i&&c!=="pow"){o.textContent="Please enter second number",r.textContent="",s.classList.remove("result-box--hidden");return}try{let e,d;if(c==="add"){const a=BigInt(l),t=BigInt(i);e=(a+t).toString(),d=`BigInt addition: ${l.slice(0,15)}... + ${i.slice(0,15)}...`}else if(c==="sub"){const a=BigInt(l),t=BigInt(i);e=(a-t).toString(),d=`BigInt subtraction: ${l.slice(0,15)}... - ${i.slice(0,15)}...`}else if(c==="mul"){const a=BigInt(l),t=BigInt(i);e=(a*t).toString(),d=`BigInt multiplication: ${l.slice(0,15)}... × ${i.slice(0,15)}...`}else if(c==="pow"){const a=BigInt(l),t=parseInt(i);if(isNaN(t)){o.textContent="Please enter exponent",r.textContent="",s.classList.remove("result-box--hidden");return}if(t>1e4){o.textContent="Exponent too large (max 10000)",r.textContent="Would take too long to compute",s.classList.remove("result-box--hidden");return}e=(a**BigInt(t)).toString(),d=`BigInt power: ${l} ^ ${t}`}e.length>100&&(e=e.slice(0,50)+"... ("+e.length+" digits)"),o.textContent=e,r.textContent=d,s.classList.remove("result-box--hidden")}catch{o.textContent="Invalid input",r.textContent="Please enter valid integers",s.classList.remove("result-box--hidden")}}u.addEventListener("click",p)}export{g as bindEvents,b as render};
