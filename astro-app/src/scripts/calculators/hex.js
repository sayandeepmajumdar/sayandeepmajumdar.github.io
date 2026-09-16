/* ============================================================
   HEX.JS — Hexadecimal Calculator (Base-16)
   ============================================================ */

export function render(container) {
  container.innerHTML = `
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
  `;
}

export function bindEvents(container) {
  const btn = container.querySelector('#hex-btn');
  const resultEl = container.querySelector('#hex-result');
  const valueEl = container.querySelector('#hex-value');
  const inputEl = container.querySelector('#hex-input');

  function getMode() {
    return container.querySelector('input[name="hex-mode"]:checked').value;
  }

  function convert() {
    const input = inputEl.value.trim();
    const mode = getMode();

    if (!input) {
      valueEl.textContent = 'Please enter a value';
      resultEl.classList.remove('result-box--hidden');
      return;
    }

    try {
      let result = '';
      
      if (mode === 'toHex') {
        let num;
        if (input.startsWith('0x')) {
          num = parseInt(input, 16);
        } else if (/^[01]+$/.test(input)) {
          num = parseInt(input, 2);
        } else {
          num = parseInt(input, 10);
        }
        if (isNaN(num)) throw new Error('Invalid');
        result = '0x' + num.toString(16).toUpperCase();
      } else if (mode === 'fromHex') {
        const clean = input.replace(/^0x/i, '');
        if (!/^[0-9A-Fa-f]+$/.test(clean)) throw new Error('Invalid hex');
        result = parseInt(clean, 16).toString(10);
      } else if (mode === 'toBin') {
        let num;
        if (input.startsWith('0x')) {
          num = parseInt(input, 16);
        } else if (/^[01]+$/.test(input)) {
          num = parseInt(input, 2);
        } else {
          num = parseInt(input, 10);
        }
        if (isNaN(num)) throw new Error('Invalid');
        result = num.toString(2);
      } else if (mode === 'toDec') {
        let num;
        if (input.startsWith('0x')) {
          num = parseInt(input, 16);
        } else if (/^[01]+$/.test(input)) {
          num = parseInt(input, 2);
        } else {
          num = parseInt(input, 10);
        }
        if (isNaN(num)) throw new Error('Invalid');
        result = num.toString(10);
      }

      valueEl.textContent = result;
      resultEl.classList.remove('result-box--hidden');
    } catch (e) {
      valueEl.textContent = 'Invalid input';
      resultEl.classList.remove('result-box--hidden');
    }
  }

  btn.addEventListener('click', convert);
}
