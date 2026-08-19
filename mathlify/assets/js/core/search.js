/* ============================================================
   SEARCH.JS — Live search with dropdown
   ============================================================ */

const CALCULATORS = [
  {
    name: 'Standard Calculator',
    description: 'Basic arithmetic operations',
    tags: ['add', 'subtract', 'multiply', 'divide', 'basic', 'math'],
    icon: '🧮',
    url: 'index.html'
  },
  {
    name: 'Mortgage Calculator',
    description: 'Monthly payments, total interest, amortization',
    tags: ['mortgage', 'loan', 'home', 'house', 'interest', 'finance', 'payment', 'EMI'],
    icon: '🏡',
    url: 'tools/mortgage-calculator.html'
  },
  {
    name: 'Amortization Calculator',
    description: 'Loan payment schedule & interest breakdown',
    tags: ['amortization', 'loan schedule', 'principal', 'interest', 'finance'],
    icon: '📊',
    url: 'tools/amortization-calculator.html'
  },
  {
    name: 'BMI Calculator',
    description: 'Body Mass Index — metric and imperial',
    tags: ['bmi', 'body', 'weight', 'height', 'health', 'fitness', 'obesity'],
    icon: '⚖️',
    url: 'tools/bmi-calculator.html'
  },
  {
    name: 'Age Calculator',
    description: 'Calculate exact age in years, months and days',
    tags: ['age', 'birthday', 'dob', 'birth', 'years', 'months'],
    icon: '🎂',
    url: 'tools/age-calculator.html'
  },
  {
    name: 'Scientific Calculator',
    description: 'Advanced functions: sin, cos, log, √ and more',
    tags: ['sin', 'cos', 'tan', 'log', 'square root', 'advanced', 'science', 'trig'],
    icon: '📐',
    url: 'tools/scientific-calculator.html'
  },
  {
    name: 'Percentage Calculator',
    description: 'Calculate percentages and percentage changes',
    tags: ['percent', 'percentage', '%', 'ratio', 'change', 'increase', 'decrease'],
    icon: '🔢',
    url: 'tools/percentage-calculator.html'
  },
  {
    name: 'Exponent Calculator',
    description: 'Calculate base raised to power (b^x)',
    tags: ['exponent', 'power', 'base', 'powers', 'math'],
    icon: '⚡',
    url: 'tools/exponent-calculator.html'
  },
  {
    name: 'Root Calculator',
    description: 'Square root, cube root, and nth roots',
    tags: ['root', 'square root', 'cube root', 'radical', 'math'],
    icon: '√',
    url: 'tools/root-calculator.html'
  },
  {
    name: 'Logarithm Calculator',
    description: 'Calculate log base 10, ln, and custom bases',
    tags: ['log', 'logarithm', 'natural log', 'ln', 'base 10', 'math'],
    icon: '🪵',
    url: 'tools/log-calculator.html'
  },
  {
    name: 'Quadratic Formula Calculator',
    description: 'Solve ax² + bx + c = 0 real & complex roots',
    tags: ['quadratic', 'algebra', 'roots', 'parabola', 'discriminant'],
    icon: '📈',
    url: 'tools/quadratic-calculator.html'
  },
  {
    name: 'Random Number Generator',
    description: 'Generate true random integers and lists',
    tags: ['random', 'rng', 'picker', 'lottery', 'numbers'],
    icon: '🎲',
    url: 'tools/random-calculator.html'
  },
  {
    name: 'Scientific Notation Calculator',
    description: 'Convert standard numbers into a × 10^b',
    tags: ['scientific notation', 'standard form', 'engineering', 'powers of 10'],
    icon: '🔬',
    url: 'tools/scientific-notation-calculator.html'
  },
  {
    name: 'Big Number Calculator',
    description: 'Arbitrary precision large integer math',
    tags: ['big number', 'large numbers', 'precision', 'huge math'],
    icon: '🌌',
    url: 'tools/big-number-calculator.html'
  },
  {
    name: 'Factor Calculator',
    description: 'Find all factors and prime factorization',
    tags: ['factor', 'prime factor', 'divisors', 'composite', 'prime'],
    icon: '🧩',
    url: 'tools/factor-calculator.html'
  },
  {
    name: 'LCM Calculator',
    description: 'Least Common Multiple calculator',
    tags: ['lcm', 'least common multiple', 'number theory', 'math'],
    icon: '🔢',
    url: 'tools/lcm-calculator.html'
  },
  {
    name: 'GCF Calculator',
    description: 'Greatest Common Factor (GCD / HCF)',
    tags: ['gcf', 'gcd', 'hcf', 'greatest common divisor', 'math'],
    icon: '🎯',
    url: 'tools/gcf-calculator.html'
  },
  {
    name: 'Ratio Calculator',
    description: 'Simplify ratios and solve A:B = C:D proportions',
    tags: ['ratio', 'proportion', 'scaling', 'fractions', 'math'],
    icon: '⚖️',
    url: 'tools/ratio-calculator.html'
  },
  {
    name: 'Binary Calculator',
    description: 'Base-2 conversions and bitwise operations',
    tags: ['binary', 'bitwise', 'hex', 'decimal', 'bits', 'base conversion'],
    icon: '💻',
    url: 'tools/binary-calculator.html'
  },
  {
    name: 'Hex Calculator',
    description: 'Hexadecimal conversions and arithmetic',
    tags: ['hex', 'hexadecimal', 'base 16', 'binary', 'ascii'],
    icon: '🔣',
    url: 'tools/hex-calculator.html'
  },
  {
    name: 'Percent Error Calculator',
    description: 'Experimental vs theoretical error percentage',
    tags: ['percent error', 'experimental', 'theoretical', 'chemistry', 'physics'],
    icon: '🧪',
    url: 'tools/percent-error-calculator.html'
  },
  {
    name: 'Half-Life Calculator',
    description: 'Radioactive decay and remaining quantities',
    tags: ['half life', 'decay', 'radioactive', 'isotope', 'physics', 'science'],
    icon: '☢️',
    url: 'tools/half-life-calculator.html'
  },
  {
    name: 'Matrix Calculator',
    description: 'Determinants, inverses, 2x2 & 3x3 operations',
    tags: ['matrix', 'linear algebra', 'determinant', 'inverse', 'transpose'],
    icon: '▦',
    url: 'tools/matrix-calculator.html'
  },
  {
    name: 'Rounding Calculator',
    description: 'Round to decimals, sig figs, floor or ceiling',
    tags: ['round', 'rounding', 'decimals', 'significant figures', 'sig figs'],
    icon: '🎯',
    url: 'tools/round-calculator.html'
  }
];

export function initSearch() {
  const input = document.getElementById('search-input');
  const dropdown = document.getElementById('search-dropdown');
  if (!input || !dropdown) return;

  function renderResults(query) {
    const q = query.trim().toLowerCase();
    if (!q) { dropdown.classList.add('search-dropdown--hidden'); return; }

    const matches = CALCULATORS.filter(c =>
      c.name.toLowerCase().includes(q) ||
      c.description.toLowerCase().includes(q) ||
      c.tags.some(t => t.toLowerCase().includes(q))
    );

    if (matches.length === 0) {
      dropdown.innerHTML = `<p class="search-no-results">No calculators found for "<strong>${query}</strong>"</p>`;
    } else {
      dropdown.innerHTML = matches.map(c => `
        <a class="search-result" href="${c.url}" role="option">
          <span class="search-result__icon">${c.icon}</span>
          <span>
            <div class="search-result__label">${c.name}</div>
            <div class="search-result__desc">${c.description}</div>
          </span>
        </a>
      `).join('');
    }

    dropdown.classList.remove('search-dropdown--hidden');
  }

  input.addEventListener('keyup', (e) => {
    if (e.key === 'Escape') { dropdown.classList.add('search-dropdown--hidden'); input.blur(); return; }
    renderResults(input.value);
  });

  input.addEventListener('focus', () => {
    if (input.value.trim()) renderResults(input.value);
  });

  document.addEventListener('click', (e) => {
    if (!e.target.closest('.search-wrap')) {
      dropdown.classList.add('search-dropdown--hidden');
    }
  });
}
