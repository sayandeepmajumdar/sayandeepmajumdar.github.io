function u(n){n.innerHTML=`
    <div class="calc-panel">
      <div class="calc-panel__header">
        <span class="calc-panel__title">Binary Calculator</span>
        <div class="calc-panel__header-icon">💻</div>
      </div>
      <div class="calc-panel__body">
        <div class="form-group">
          <label class="form-label" for="bin-input">Enter a number (decimal, hex, or binary)</label>
          <input class="form-input form-input--lg" type="text" id="bin-input" placeholder="e.g. 42, 0x2A, 101010">
        </div>

        <div class="form-group">
          <div class="radio-group">
            <label><input type="radio" name="bin-mode" value="toBin" checked><span>To Binary</span></label>
            <label><input type="radio" name="bin-mode" value="fromBin"><span>From Binary</span></label>
            <label><input type="radio" name="bin-mode" value="toHex"><span>To Hex</span></label>
            <label><input type="radio" name="bin-mode" value="toOct"><span>To Octal</span></label>
          </div>
        </div>

        <button class="btn btn--primary btn--lg" id="bin-btn" style="width:100%" aria-label="Convert">Convert</button>

        <div class="result-box result-box--hidden" id="bin-result">
          <div class="result-box__label">Result</div>
          <div class="result-box__value" id="bin-value">—</div>
        </div>

        <div class="how-to" style="margin-top:1.5rem">
          <div class="how-to__title">Formula</div>
          <div class="how-to__body">
            <p><strong>Decimal to Binary:</strong> Repeatedly divide by 2, record remainders.</p>
            <code style="display:block;background:var(--color-bg-subtle);padding:.75rem;border-radius:4px;margin:.5rem 0">
              42 ÷ 2 = 21 r 0<br>
              21 ÷ 2 = 10 r 1<br>
              10 ÷ 2 = 5 r 0<br>
              5 ÷ 2 = 2 r 1<br>
              2 ÷ 2 = 1 r 0<br>
              1 ÷ 2 = 0 r 1<br>
              Binary: 101010
            </code>
          </div>
        </div>
      </div>
    </div>
  `}function b(n){const s=n.querySelector("#bin-btn"),a=n.querySelector("#bin-result"),l=n.querySelector("#bin-value"),o=n.querySelector("#bin-input");function d(){return n.querySelector('input[name="bin-mode"]:checked').value}function c(){const e=o.value.trim(),i=d();if(!e){l.textContent="Please enter a value",a.classList.remove("result-box--hidden");return}try{let r="";if(i==="toBin"){const t=parseInt(e,e.startsWith("0x")?16:10);if(isNaN(t))throw new Error("Invalid number");r=t.toString(2)}else if(i==="fromBin"){if(!/^[01]+$/.test(e.replace(/\s/g,"")))throw new Error("Invalid binary");r=parseInt(e,2).toString(10)}else if(i==="toHex"){const t=parseInt(e,e.startsWith("0x")?16:10);if(isNaN(t))throw new Error("Invalid number");r="0x"+t.toString(16).toUpperCase()}else if(i==="toOct"){const t=parseInt(e,e.startsWith("0x")?16:10);if(isNaN(t))throw new Error("Invalid number");r=t.toString(8)}l.textContent=r,a.classList.remove("result-box--hidden")}catch{l.textContent="Invalid input",a.classList.remove("result-box--hidden")}}s.addEventListener("click",c)}export{b as bindEvents,u as render};
