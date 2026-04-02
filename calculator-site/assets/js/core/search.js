/* ============================================================
   SEARCH.JS — Live search with dropdown
   ============================================================ */

const CALCULATORS = [
  {
    name: 'Standard Calculator',
    description: 'Basic arithmetic operations',
    tags: ['add', 'subtract', 'multiply', 'divide', 'basic', 'math'],
    icon: '🧮',
    hash: '#/'
  },
  {
    name: 'Scientific Calculator',
    description: 'Advanced functions: sin, cos, log, √ and more',
    tags: ['sin', 'cos', 'tan', 'log', 'square root', 'advanced', 'science', 'trig'],
    icon: '🔬',
    hash: '#/scientific-calculator'
  },
  {
    name: 'BMI Calculator',
    description: 'Body Mass Index — metric and imperial',
    tags: ['bmi', 'body', 'weight', 'height', 'health', 'fitness', 'obesity'],
    icon: '⚖️',
    hash: '#/bmi-calculator'
  },
  {
    name: 'Age Calculator',
    description: 'Calculate exact age in years, months and days',
    tags: ['age', 'birthday', 'dob', 'birth', 'years', 'months'],
    icon: '🎂',
    hash: '#/age-calculator'
  },
  {
    name: 'Percentage Calculator',
    description: 'Calculate percentages and percentage changes',
    tags: ['percent', 'percentage', '%', 'ratio', 'change', 'increase', 'decrease'],
    icon: '📊',
    hash: '#/percentage-calculator'
  },
  {
    name: 'Mortgage Calculator',
    description: 'Monthly payments, total interest, amortization',
    tags: ['mortgage', 'loan', 'home', 'house', 'interest', 'finance', 'payment', 'EMI'],
    icon: '🏡',
    hash: '#/mortgage-calculator'
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
        <a class="search-result" href="${c.hash}" role="option">
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
