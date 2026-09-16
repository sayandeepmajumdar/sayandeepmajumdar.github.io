function u(l){l.innerHTML=`
    <div class="calc-panel">
      <div class="calc-panel__header">
        <span class="calc-panel__title">Hex Calculator</span>
        <div class="calc-panel__header-icon">🔣</div>
      </div>
      <div class="calc-panel__body">
        <div class="form-group">
          <label class="form-label" for="hex-input">Enter a number (decimal, hex, or binary)</label>
          <input class="form-input form-input--lg" type="text" id="hex-input" placeholder="e.g. 255, FF, 11111111" aria-label="Input number">
        </div>

        <div class="form-group">
          <div class="radio-group">
            <label><input type="radio" name="hex-mode" value="toHex" checked><span>To Hex</span></label>
            <label><input type="radio" name="hex-mode" value="fromHex"><span>From Hex</span></label>
            <label><input type="radio" name="hex-mode" value="toBin"><span>To Binary</span></label>
            <label><input type="radio" name="hex-mode" value="toDec"><span>To Decimal</span></label>
          </div>
        </div>

        <button class="btn btn--primary btn--lg" id="hex-btn" style="width:100%" aria-label="Convert">Convert</button>

        <div class="result-box result-box--hidden" id="hex-result">
          <div class="result-box__label">Result</div>
          <div class="result-box__value" id="hex-value">—</div>
        </div>

        <div class="how-to" style="margin-top:1.5rem">
          <div class="how-to__title">Formula</div>
          <div class="how-to__body">
            <p><strong>Hexadecimal</strong> uses digits 0-9 and letters A-F (values 10-15).</p>
            <code style="display:block;background:var(--color-bg-subtle);padding:.75rem;border-radius:4px;margin:.5rem 0">
              0-9 → 0-9<br>
              A = 10, B = 11, C = 12<br>
              D = 13, E = 14, F = 15
            </code>
            <p style="margin-top:.5rem">Example: FF in hex = 255 in decimal = 11111111 in binary</p>
          </div>
        </div>
      </div>
    </div>
  `}function p(l){const i=l.querySelector("#hex-btn"),r=l.querySelector("#hex-result"),n=l.querySelector("#hex-value"),o=l.querySelector("#hex-input");function d(){return l.querySelector('input[name="hex-mode"]:checked').value}function c(){const t=o.value.trim(),s=d();if(!t){n.textContent="Please enter a value",r.classList.remove("result-box--hidden");return}try{let a="";if(s==="toHex"){let e;if(t.startsWith("0x")?e=parseInt(t,16):/^[01]+$/.test(t)?e=parseInt(t,2):e=parseInt(t,10),isNaN(e))throw new Error("Invalid");a="0x"+e.toString(16).toUpperCase()}else if(s==="fromHex"){const e=t.replace(/^0x/i,"");if(!/^[0-9A-Fa-f]+$/.test(e))throw new Error("Invalid hex");a=parseInt(e,16).toString(10)}else if(s==="toBin"){let e;if(t.startsWith("0x")?e=parseInt(t,16):/^[01]+$/.test(t)?e=parseInt(t,2):e=parseInt(t,10),isNaN(e))throw new Error("Invalid");a=e.toString(2)}else if(s==="toDec"){let e;if(t.startsWith("0x")?e=parseInt(t,16):/^[01]+$/.test(t)?e=parseInt(t,2):e=parseInt(t,10),isNaN(e))throw new Error("Invalid");a=e.toString(10)}n.textContent=a,r.classList.remove("result-box--hidden")}catch{n.textContent="Invalid input",r.classList.remove("result-box--hidden")}}i.addEventListener("click",c)}export{p as bindEvents,u as render};
