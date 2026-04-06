/* ============================================================
   BINARY.JS — Binary Calculator (Base-2)
   ============================================================ */

export function render(container) {
  container.innerHTML = `
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
  `;
}

export function bindEvents(container) {
  const btn = container.querySelector('#bin-btn');
  const resultEl = container.querySelector('#bin-result');
  const valueEl = container.querySelector('#bin-value');
  const inputEl = container.querySelector('#bin-input');

  function getMode() {
    return container.querySelector('input[name="bin-mode"]:checked').value;
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
      
      if (mode === 'toBin') {
        const num = parseInt(input, input.startsWith('0x') ? 16 : 10);
        if (isNaN(num)) throw new Error('Invalid number');
        result = num.toString(2);
      } else if (mode === 'fromBin') {
        if (!/^[01]+$/.test(input.replace(/\s/g, ''))) throw new Error('Invalid binary');
        result = parseInt(input, 2).toString(10);
      } else if (mode === 'toHex') {
        const num = parseInt(input, input.startsWith('0x') ? 16 : 10);
        if (isNaN(num)) throw new Error('Invalid number');
        result = '0x' + num.toString(16).toUpperCase();
      } else if (mode === 'toOct') {
        const num = parseInt(input, input.startsWith('0x') ? 16 : 10);
        if (isNaN(num)) throw new Error('Invalid number');
        result = num.toString(8);
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
