/* ============================================================
   BIGNUMBER.JS — Big Number Calculator
   ============================================================ */

export function render(container) {
  container.innerHTML = `
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
  `;
}

export function bindEvents(container) {
  const btn = container.querySelector('#bn-btn');
  const resultEl = container.querySelector('#bn-result');
  const valueEl = container.querySelector('#bn-value');
  const detailsEl = container.querySelector('#bn-details');

  function calculate() {
    const n1Str = container.querySelector('#bn-num1').value.replace(/[,\s]/g, '');
    const n2Str = container.querySelector('#bn-num2').value.replace(/[,\s]/g, '');
    const op = container.querySelector('input[name="bn-op"]:checked').value;

    if (!n1Str) {
      valueEl.textContent = 'Please enter first number';
      detailsEl.textContent = '';
      resultEl.classList.remove('result-box--hidden');
      return;
    }

    if (!n2Str && op !== 'pow') {
      valueEl.textContent = 'Please enter second number';
      detailsEl.textContent = '';
      resultEl.classList.remove('result-box--hidden');
      return;
    }

    try {
      let result, details;

      if (op === 'add') {
        const n1 = BigInt(n1Str);
        const n2 = BigInt(n2Str);
        result = (n1 + n2).toString();
        details = `BigInt addition: ${n1Str.slice(0,15)}... + ${n2Str.slice(0,15)}...`;
      } else if (op === 'sub') {
        const n1 = BigInt(n1Str);
        const n2 = BigInt(n2Str);
        result = (n1 - n2).toString();
        details = `BigInt subtraction: ${n1Str.slice(0,15)}... - ${n2Str.slice(0,15)}...`;
      } else if (op === 'mul') {
        const n1 = BigInt(n1Str);
        const n2 = BigInt(n2Str);
        result = (n1 * n2).toString();
        details = `BigInt multiplication: ${n1Str.slice(0,15)}... × ${n2Str.slice(0,15)}...`;
      } else if (op === 'pow') {
        const n1 = BigInt(n1Str);
        const n2 = parseInt(n2Str);
        if (isNaN(n2)) {
          valueEl.textContent = 'Please enter exponent';
          detailsEl.textContent = '';
          resultEl.classList.remove('result-box--hidden');
          return;
        }
        if (n2 > 10000) {
          valueEl.textContent = 'Exponent too large (max 10000)';
          detailsEl.textContent = 'Would take too long to compute';
          resultEl.classList.remove('result-box--hidden');
          return;
        }
        result = (n1 ** BigInt(n2)).toString();
        details = `BigInt power: ${n1Str} ^ ${n2}`;
      }

      if (result.length > 100) {
        result = result.slice(0, 50) + '... (' + result.length + ' digits)';
      }
      
      valueEl.textContent = result;
      detailsEl.textContent = details;
      resultEl.classList.remove('result-box--hidden');
    } catch (e) {
      valueEl.textContent = 'Invalid input';
      detailsEl.textContent = 'Please enter valid integers';
      resultEl.classList.remove('result-box--hidden');
    }
  }

  btn.addEventListener('click', calculate);
}
