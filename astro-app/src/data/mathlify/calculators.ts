import type { CalculatorMeta } from "../../types/mathlify";

export const CALCULATORS: CalculatorMeta[] = [
  {
    "slug": "age-calculator",
    "name": "Age Calculator",
    "title": "Age Calculator — Calculate Exact Age in Years, Months, Days | Mathlify",
    "description": "Free online age calculator. Find your exact age in years, months, weeks, days, hours, and countdown to your next birthday.",
    "keywords": "age calculator, calculate age online, date of birth calculator, exact age calculator, birthday countdown",
    "category": "health",
    "icon": "🎂",
    "scriptName": "age.js",
    "h1": "Age Calculator",
    "pageDesc": "Calculate your exact age in years, months, days, hours, and minutes from your date of birth.",
    "sidebarHtml": "<div>\n            \n        <div class=\"card\" style=\"cursor:default\">\n          <div class=\"card__title\">🎂 Quick Stats</div>\n          <p style=\"font-size:.85rem;color:var(--color-text-muted);line-height:1.7;margin-top:.5rem\">\n            This tool accounts for leap years and different month lengths to calculate exact age precision down to total minutes lived.\n          </p>",
    "guideHtml": "<h2 style=\"font-size:1.4rem;font-weight:700;margin-bottom:1rem\">How Age is Calculated</h2>\n          <p style=\"color:var(--color-text-muted);line-height:1.7;margin-bottom:1.5rem\">\n            The age calculator measures the exact duration between a birth date and the current date (or a specific target date), accounting for leap years and varying month lengths.\n          </p>\n          <div class=\"card\" style=\"cursor:default;margin-bottom:2rem;padding:1.25rem\">\n            <h3 style=\"font-size:1.1rem;font-weight:700;margin-bottom:.5rem\">Calculated Age Metrics</h3>\n            <ul style=\"color:var(--color-text-muted);font-size:.875rem;line-height:1.8;padding-left:1.25rem\">\n              <li>Exact age in Years, Months, and Days</li>\n              <li>Total Days, Hours, and Minutes lived</li>\n              <li>Countdown to next upcoming birthday</li>\n            </ul>\n          </div>",
    "faqs": [
      {
        "question": "How does the age calculator handle leap years?",
        "answer": "The age calculator uses calendar date mathematics to account for 366-day leap years (every 4 years) and exact month lengths (28, 29, 30, or 31 days)."
      }
    ],
    "tags": [
      "age",
      "birthday",
      "dob",
      "birth",
      "years",
      "months"
    ]
  },
  {
    "slug": "amortization-calculator",
    "name": "Amortization Calculator",
    "title": "Amortization Calculator — Monthly Loan Schedule & Payoff | Mathlify",
    "description": "Free loan amortization calculator. View monthly payment schedule, principal vs. interest breakdown, and remaining loan balance.",
    "keywords": "amortization calculator, loan amortization schedule, principal and interest schedule, loan payoff schedule",
    "category": "financial",
    "icon": "📊",
    "scriptName": "amortization.js",
    "h1": "Amortization Calculator",
    "pageDesc": "Calculate your complete loan payment schedule with monthly principal, interest, and remaining balance breakdowns.",
    "sidebarHtml": "<div>\n            \n        <div class=\"card\" style=\"cursor:default\">\n          <div class=\"card__title\">💡 Amortization Insights</div>\n          <p style=\"font-size:.85rem;color:var(--color-text-muted);line-height:1.7;margin-top:.5rem\">\n            Early payments primarily cover interest charges. Over time, an increasing proportion of each installment pays down the loan principal.\n          </p>",
    "guideHtml": "<h2 style=\"font-size:1.4rem;font-weight:700;margin-bottom:1rem\">How Loan Amortization Works</h2>\n          <p style=\"color:var(--color-text-muted);line-height:1.7;margin-bottom:1.5rem\">\n            Amortization is the process of spreading a loan into a series of equal periodic payments. Each payment is split into two parts: interest on the outstanding loan balance and repayment of the principal.\n          </p>\n          <div class=\"card\" style=\"cursor:default;margin-bottom:2rem;padding:1.25rem\">\n            <h3 style=\"font-size:1.1rem;font-weight:700;margin-bottom:.5rem\">Key Amortization Formulas</h3>\n            <ul style=\"color:var(--color-text-muted);font-size:.875rem;line-height:1.8;padding-left:1.25rem\">\n              <li><strong>Monthly Interest:</strong> <code>Interest = Remaining Principal × (Annual Rate / 12)</code></li>\n              <li><strong>Monthly Principal:</strong> <code>Principal Repayment = Total Monthly Payment − Monthly Interest</code></li>\n              <li><strong>New Balance:</strong> <code>New Balance = Previous Balance − Principal Repayment</code></li>\n            </ul>\n          </div>\n          <h3 style=\"font-size:1.2rem;font-weight:700;margin-bottom:1rem\">Frequently Asked Questions</h3>\n          <div style=\"display:flex;flex-direction:column;gap:1rem\">\n            <div class=\"card\" style=\"cursor:default;padding:1rem\">\n              <h4 style=\"font-size:1rem;font-weight:600;margin-bottom:.35rem\">What is an amortization schedule?</h4>\n              <p style=\"font-size:.875rem;color:var(--color-text-muted);line-height:1.6\">An amortization schedule is a complete table of periodic loan payments detailing the exact dollar amount of principal and interest in each payment until the balance reaches zero.</p>\n            </div>\n          </div>",
    "faqs": [
      {
        "question": "What is an amortization schedule?",
        "answer": "An amortization schedule is a complete table showing every periodic loan payment, broken down by principal, interest, and the remaining loan balance."
      }
    ],
    "tags": [
      "amortization",
      "loan schedule",
      "principal",
      "interest",
      "finance"
    ]
  },
  {
    "slug": "area-calculator",
    "name": "Area Calculator",
    "title": "Area Calculator — 2D Geometric Shapes & Unit Conversion | Mathlify",
    "description": "Calculate the area and perimeter of rectangles, circles, triangles, trapezoids, parallelograms, ellipses, and circular sectors with metric and imperial unit conversions.",
    "keywords": "area calculator, 2d shape area, rectangle area, circle area, triangle area, trapezoid area, square meters, acres, hectares",
    "category": "geometry",
    "icon": "🟩",
    "scriptName": "area.js",
    "h1": "Area Calculator",
    "pageDesc": "\n            Calculate area and perimeter for 2D geometric shapes including rectangles, circles, triangles, trapezoids, parallelograms, ellipses, and circular sectors.\n          ",
    "sidebarHtml": "<div>\n            <div class=\"card\" style=\"cursor:default;margin-bottom:1rem\">\n              <div class=\"card__title\">🟩 2D Area Formulas</div>\n              <div style=\"margin-top:.75rem;display:flex;flex-direction:column;gap:.6rem;font-size:.875rem;color:var(--color-text-muted);line-height:1.5\">\n                <div><strong style=\"color:var(--color-text)\">Rectangle:</strong> <code>A = l × w</code></div>\n                <div style=\"border-top:1px solid var(--color-border);padding-top:.5rem\"><strong style=\"color:var(--color-text)\">Circle:</strong> <code>A = πr²</code></div>\n                <div style=\"border-top:1px solid var(--color-border);padding-top:.5rem\"><strong style=\"color:var(--color-text)\">Triangle:</strong> <code>A = ½b × h</code></div>\n                <div style=\"border-top:1px solid var(--color-border);padding-top:.5rem\"><strong style=\"color:var(--color-text)\">Trapezoid:</strong> <code>A = ½(a + b) × h</code></div>\n                <div style=\"border-top:1px solid var(--color-border);padding-top:.5rem\"><strong style=\"color:var(--color-text)\">Ellipse:</strong> <code>A = π × a × b</code>",
    "guideHtml": "<h2 style=\"font-size:1.4rem;font-weight:700;margin-bottom:1rem\">Understanding Two-Dimensional Area</h2>\n          <p style=\"color:var(--color-text-muted);line-height:1.7;margin-bottom:1.5rem\">\n            Area is the quantity that expresses the two-dimensional extent of a planar region or shape. It represents the number of unit squares that fit inside a boundary.\n          </p>\n\n          <h3 style=\"font-size:1.2rem;font-weight:700;margin-bottom:1rem\">Frequently Asked Questions</h3>\n          <div style=\"display:flex;flex-direction:column;gap:1rem\">\n            <div class=\"card\" style=\"cursor:default;padding:1rem\">\n              <h4 style=\"font-size:1rem;font-weight:600;margin-bottom:.35rem\">What is the formula for the area of an ellipse?</h4>\n              <p style=\"font-size:.875rem;color:var(--color-text-muted);line-height:1.6\">The area of an ellipse is given by A = π × a × b, where a is the semi-major axis (longest radius from center) and b is the semi-minor axis (shortest radius from center).</p>\n            </div>\n          </div>",
    "faqs": [],
    "tags": [
      "area",
      "perimeter",
      "square meters",
      "acres",
      "hectares",
      "rectangle",
      "circle",
      "trapezoid",
      "ellipse",
      "geometry"
    ]
  },
  {
    "slug": "big-number-calculator",
    "name": "Big Number Calculator",
    "title": "Big Number Calculator — Large Number Calculations Online | Mathlify",
    "description": "Free big number calculator. Perform arithmetic (+, -, ×, ÷, mod, power) on numbers with hundreds of digits without rounding loss.",
    "keywords": "big number calculator, large number arithmetic, arbitrary precision calculator, big integer calculator",
    "category": "math",
    "icon": "🌌",
    "scriptName": "bigNumber.js",
    "h1": "Big Number Calculator",
    "pageDesc": "Calculate arithmetic operations on huge integers and high-precision numbers without float overflow.",
    "sidebarHtml": "<div>\n            <div class='card' style='cursor:default'><div class='card__title'>🌌 Arbitrary Precision</div><p style=\"font-size:.85rem;color:var(--color-text-muted);margin-top:.5rem\">Computes exact values for numbers exceeding 64-bit integer limits.</p>",
    "guideHtml": "<h2 style='font-size:1.4rem;font-weight:700;margin-bottom:1rem'>Why Big Number Arithmetic Matters</h2><p style='color:var(--color-text-muted);line-height:1.7'>Standard computing precision loses digits past 15-17 significant figures. Big number math preserves every single digit.</p>",
    "faqs": [
      {
        "question": "How large can numbers be?",
        "answer": "Calculations use JavaScript BigInt, supporting thousands of digits limited only by browser memory."
      }
    ],
    "tags": [
      "big number",
      "large numbers",
      "precision",
      "huge math"
    ]
  },
  {
    "slug": "binary-calculator",
    "name": "Binary Calculator",
    "title": "Binary Calculator — Base-2 Conversion & Bitwise Operations | Mathlify",
    "description": "Convert between Binary, Decimal, Hex, and Octal. Perform binary arithmetic (+, -, ×, ÷) and bitwise operations (AND, OR, XOR, NOT).",
    "keywords": "binary calculator, binary to decimal, decimal to binary, bitwise calculator, binary converter",
    "category": "base-conversion",
    "icon": "💻",
    "scriptName": "binary.js",
    "h1": "Binary Calculator",
    "pageDesc": "Convert numbers between binary, decimal, hex, and octal bases and compute bitwise operations.",
    "sidebarHtml": "<div>\n            <div class='card' style='cursor:default'><div class='card__title'>💻 Base-2 System</div><p style=\"font-size:.85rem;color:var(--color-text-muted);margin-top:.5rem\">Binary uses digits 0 and 1, representing powers of 2.</p>",
    "guideHtml": "<h2 style='font-size:1.4rem;font-weight:700;margin-bottom:1rem'>Binary System in Computing</h2><p style='color:var(--color-text-muted);line-height:1.7'>Computers store data and instructions using binary switches (bits: 0 and 1).</p>",
    "faqs": [
      {
        "question": "How do you convert binary 1010 to decimal?",
        "answer": "1010₂ = (1×2³) + (0×2²) + (1×2¹) + (0×2⁰) = 8 + 0 + 2 + 0 = 10."
      }
    ],
    "tags": [
      "binary",
      "bitwise",
      "hex",
      "decimal",
      "bits",
      "base conversion"
    ]
  },
  {
    "slug": "bmi-calculator",
    "name": "BMI Calculator",
    "title": "BMI Calculator — Free Body Mass Index Calculator | Mathlify",
    "description": "Calculate your Body Mass Index (BMI) instantly. Supports Metric and Imperial units with official WHO categories (Underweight, Normal, Overweight, Obese).",
    "keywords": "BMI calculator, body mass index calculator, calculate BMI metric, calculate BMI imperial, healthy weight calculator",
    "category": "health",
    "icon": "⚖️",
    "scriptName": "bmi.js",
    "h1": "BMI Calculator",
    "pageDesc": "Calculate your Body Mass Index using metric (kg/cm) or imperial (lbs/ft·in) measurements.",
    "sidebarHtml": "<div>\n            \n        <div class=\"card\" style=\"cursor:default;margin-bottom:1rem\">\n          <div class=\"card__title\">⚖️ BMI Categories</div>\n          <div style=\"margin-top:.75rem;display:flex;flex-direction:column;gap:.5rem;font-size:.875rem\">\n            <div style=\"display:flex;align-items:center;gap:.75rem\"><span style=\"width:12px;height:12px;border-radius:50%;background:#3b82f6;flex-shrink:0\"></span><span style=\"color:var(--color-text-muted)\">Underweight — BMI &lt; 18.5</span></div>\n            <div style=\"display:flex;align-items:center;gap:.75rem\"><span style=\"width:12px;height:12px;border-radius:50%;background:#22c55e;flex-shrink:0\"></span><span style=\"color:var(--color-text-muted)\">Normal — BMI 18.5 – 24.9</span></div>\n            <div style=\"display:flex;align-items:center;gap:.75rem\"><span style=\"width:12px;height:12px;border-radius:50%;background:#f59e0b;flex-shrink:0\"></span><span style=\"color:var(--color-text-muted)\">Overweight — BMI 25 – 29.9</span></div>\n            <div style=\"display:flex;align-items:center;gap:.75rem\"><span style=\"width:12px;height:12px;border-radius:50%;background:#ef4444;flex-shrink:0\"></span><span style=\"color:var(--color-text-muted)\">Obese — BMI ≥ 30</span>",
    "guideHtml": "<h2 style=\"font-size:1.4rem;font-weight:700;margin-bottom:1rem\">Understanding Body Mass Index (BMI)</h2>\n          <p style=\"color:var(--color-text-muted);line-height:1.7;margin-bottom:1.5rem\">\n            Body Mass Index (BMI) is a widely used screening metric developed by the World Health Organization (WHO) to categorize body weight relative to height.\n          </p>\n          <div class=\"card\" style=\"cursor:default;margin-bottom:2rem;padding:1.25rem\">\n            <h3 style=\"font-size:1.1rem;font-weight:700;margin-bottom:.5rem\">BMI Formulas</h3>\n            <ul style=\"color:var(--color-text-muted);font-size:.875rem;line-height:1.8;padding-left:1.25rem\">\n              <li><strong>Metric:</strong> <code>BMI = weight (kg) / [height (m)]²</code></li>\n              <li><strong>Imperial:</strong> <code>BMI = 703 × weight (lbs) / [height (inches)]²</code></li>\n            </ul>\n          </div>\n          <h3 style=\"font-size:1.2rem;font-weight:700;margin-bottom:1rem\">Frequently Asked Questions</h3>\n          <div style=\"display:flex;flex-direction:column;gap:1rem\">\n            <div class=\"card\" style=\"cursor:default;padding:1rem\">\n              <h4 style=\"font-size:1rem;font-weight:600;margin-bottom:.35rem\">What is a healthy BMI score?</h4>\n              <p style=\"font-size:.875rem;color:var(--color-text-muted);line-height:1.6\">According to WHO guidelines, a healthy BMI for adults ranges between 18.5 and 24.9.</p>\n            </div>\n          </div>",
    "faqs": [
      {
        "question": "What is the formula to calculate BMI?",
        "answer": "For metric units: BMI = weight (kg) / [height (m)]^2. For imperial units: BMI = 703 * weight (lbs) / [height (inches)]^2."
      },
      {
        "question": "What is a healthy BMI range?",
        "answer": "A healthy adult BMI is between 18.5 and 24.9 according to the World Health Organization (WHO)."
      }
    ],
    "tags": [
      "bmi",
      "body",
      "weight",
      "height",
      "health",
      "fitness",
      "obesity"
    ]
  },
  {
    "slug": "calorie-calculator",
    "name": "Calorie & Macro Calculator",
    "title": "Calorie & Macro Calculator — Indian (ICMR-NIN) & Global Standards | Mathlify",
    "description": "Calculate your daily calorie needs, BMR, TDEE, and macronutrient split with dual Indian (ICMR-NIN 2020 RDA & Asian-Indian BMI) and Global (Mifflin-St Jeor) standards.",
    "keywords": "calorie calculator, BMR calculator, TDEE calculator, Indian calorie calculator, ICMR NIN RDA, macro calculator, Asian BMI calculator, diet planner, weight loss calculator",
    "category": "health",
    "icon": "🔥",
    "scriptName": "calorie.js",
    "h1": "Calorie &amp; Macro Calculator",
    "pageDesc": "",
    "sidebarHtml": "<!-- Informative Side Cards in Mathlify Native Style -->\n          <div>\n            <div class=\"card\" style=\"cursor:default;margin-bottom:1rem\">\n              <div class=\"card__title\">🇮🇳 ICMR-NIN 2020 RDA Benchmarks</div>\n              <div style=\"margin-top:.75rem;display:flex;flex-direction:column;gap:.6rem;font-size:.875rem;color:var(--color-text-muted);line-height:1.5\">\n                <div>\n                  <strong style=\"color:var(--color-text)\">Reference Indian Man (65 kg):</strong><br>\n                  • Sedentary: 2,110 kcal/day<br>\n                  • Moderate: 2,710 kcal/day<br>\n                  • Heavy: 3,470 kcal/day\n                </div>\n                <div style=\"border-top:1px solid var(--color-border);padding-top:.5rem\">\n                  <strong style=\"color:var(--color-text)\">Reference Indian Woman (55 kg):</strong><br>\n                  • Sedentary: 1,660 kcal/day<br>\n                  • Moderate: 2,130 kcal/day<br>\n                  • Heavy: 2,720 kcal/day\n                </div>\n                <div style=\"border-top:1px solid var(--color-border);padding-top:.5rem\">\n                  <strong style=\"color:var(--color-text)\">Protein Recommendation:</strong><br>\n                  0.83 g/kg ideal body weight.",
    "guideHtml": "<h2 style=\"font-size:1.4rem;font-weight:700;margin-bottom:1rem\">Understanding Calories, BMR &amp; Energy Expenditure</h2>\n          <p style=\"color:var(--color-text-muted);line-height:1.7;margin-bottom:1.5rem\">\n            Your body requires energy (measured in kilocalories or calories) to perform vital biological functions like respiration, blood circulation, cellular repair, and daily physical activity. Understanding the difference between BMR (Basal Metabolic Rate) and TDEE (Total Daily Energy Expenditure) is essential for sustainable health and weight management.\n          </p>\n\n          <div class=\"card\" style=\"cursor:default;margin-bottom:2rem;padding:1.25rem\">\n            <h3 style=\"font-size:1.1rem;font-weight:700;margin-bottom:.5rem\">Core Metabolic Equations</h3>\n            <ul style=\"color:var(--color-text-muted);font-size:.875rem;line-height:1.8;padding-left:1.25rem\">\n              <li><strong>Mifflin-St Jeor (Men):</strong> <code>BMR = (10 × W) + (6.25 × H) - (5 × Age) + 5</code></li>\n              <li><strong>Mifflin-St Jeor (Women):</strong> <code>BMR = (10 × W) + (6.25 × H) - (5 × Age) - 161</code></li>\n              <li><strong>ICMR-NIN 2020 (Men 18–30):</strong> <code>BMR = 14.5 × W + 645</code></li>\n              <li><strong>ICMR-NIN 2020 (Women 18–30):</strong> <code>BMR = 14.0 × W + 471</code></li>\n              <li><strong>TDEE:</strong> <code>TDEE = BMR × Activity Multiplier (1.2 to 1.9)</code></li>\n            </ul>\n          </div>\n\n          <h3 style=\"font-size:1.2rem;font-weight:700;margin-bottom:1rem\">Frequently Asked Questions</h3>\n          <div style=\"display:flex;flex-direction:column;gap:1rem\">\n            <div class=\"card\" style=\"cursor:default;padding:1rem\">\n              <h4 style=\"font-size:1rem;font-weight:600;margin-bottom:.35rem\">What is the ICMR-NIN 2020 RDA standard?</h4>\n              <p style=\"font-size:.875rem;color:var(--color-text-muted);line-height:1.6\">The Indian Council of Medical Research (ICMR) and National Institute of Nutrition (NIN) establish dietary standards tailored to Indian body morphology. A Reference Indian Man weighs 65 kg (sedentary energy: 2,110 kcal) and Reference Woman weighs 55 kg (sedentary energy: 1,660 kcal).</p>\n            </div>\n\n            <div class=\"card\" style=\"cursor:default;padding:1rem\">\n              <h4 style=\"font-size:1rem;font-weight:600;margin-bottom:.35rem\">Why do South Asians have different BMI cutoffs?</h4>\n              <p style=\"font-size:.875rem;color:var(--color-text-muted);line-height:1.6\">South Asians experience higher rates of insulin resistance, diabetes, and cardiovascular risk at lower BMIs due to higher body fat percentages and lower muscle mass (\"thin-fat\" phenotype). The WHO and Indian Health Ministry designate overweight at BMI ≥ 23 and obesity at BMI ≥ 25.</p>\n            </div>\n\n            <div class=\"card\" style=\"cursor:default;padding:1rem\">\n              <h4 style=\"font-size:1rem;font-weight:600;margin-bottom:.35rem\">What is a safe calorie deficit for fat loss?</h4>\n              <p style=\"font-size:.875rem;color:var(--color-text-muted);line-height:1.6\">A moderate deficit of 300 to 500 kcal below TDEE allows for losing approximately 0.25 to 0.5 kg (0.5 to 1 lb) per week safely without excessive hunger, muscle wasting, or metabolic adaptation.</p>\n            </div>\n          </div>",
    "faqs": [
      {
        "question": "What is the difference between ICMR-NIN 2020 and Global calorie formulas?",
        "answer": "The Indian Council of Medical Research (ICMR) and National Institute of Nutrition (NIN) establish dietary standards calibrated for Indian body morphology and metabolic profiles. Reference Indian Man weighs 65 kg (sedentary energy: 2,110 kcal) and Reference Woman weighs 55 kg (sedentary energy: 1,660 kcal)."
      },
      {
        "question": "Why are Asian-Indian BMI cutoffs different from WHO global cutoffs?",
        "answer": "South Asians tend to have a higher percentage of body fat and visceral adiposity at lower body weights. The WHO and Indian Health Ministry designate overweight at BMI ≥ 23 and obesity at BMI ≥ 25 (compared to ≥ 25 and ≥ 30 globally)."
      },
      {
        "question": "How is TDEE calculated from BMR?",
        "answer": "TDEE (Total Daily Energy Expenditure) is calculated by multiplying Basal Metabolic Rate (BMR) by a physical activity factor ranging from 1.2 (sedentary) to 1.9 (extra active)."
      }
    ],
    "tags": [
      "calorie",
      "calories",
      "macro",
      "bmr",
      "tdee",
      "diet",
      "nutrition",
      "weight loss",
      "food",
      "indian food",
      "fitness",
      "health"
    ]
  },
  {
    "slug": "circle-calculator",
    "name": "Circle Calculator",
    "title": "Circle Calculator — Radius, Diameter, Circumference & Area | Mathlify",
    "description": "Calculate circle radius, diameter, circumference, and area from any one known value. Includes arc length, sector area, and exact π representations.",
    "keywords": "circle calculator, circle area, circumference calculator, circle diameter, arc length, sector area, pi calculator",
    "category": "geometry",
    "icon": "⚪",
    "scriptName": "circle.js",
    "h1": "Circle Calculator",
    "pageDesc": "\n            Enter any single known parameter (radius, diameter, circumference, or area) to calculate all other circular measurements, sector areas, and arc lengths.\n          ",
    "sidebarHtml": "<div>\n            <div class=\"card\" style=\"cursor:default;margin-bottom:1rem\">\n              <div class=\"card__title\">⚪ Circle Anatomy</div>\n              <div style=\"margin-top:.75rem;display:flex;flex-direction:column;gap:.6rem;font-size:.875rem;color:var(--color-text-muted);line-height:1.5\">\n                <div><strong style=\"color:var(--color-text)\">Diameter:</strong> <code>d = 2r</code></div>\n                <div style=\"border-top:1px solid var(--color-border);padding-top:.5rem\"><strong style=\"color:var(--color-text)\">Circumference:</strong> <code>C = 2πr = πd</code></div>\n                <div style=\"border-top:1px solid var(--color-border);padding-top:.5rem\"><strong style=\"color:var(--color-text)\">Area:</strong> <code>A = πr² = ¼πd²</code>",
    "guideHtml": "<h2 style=\"font-size:1.4rem;font-weight:700;margin-bottom:1rem\">Circle Mathematics &amp; Constant π</h2>\n          <p style=\"color:var(--color-text-muted);line-height:1.7;margin-bottom:1.5rem\">\n            A circle is the set of all points in a plane equidistant from a fixed center point. The ratio of any circle's circumference to its diameter is always equal to the mathematical constant π (pi ≈ 3.14159265359).\n          </p>\n\n          <h3 style=\"font-size:1.2rem;font-weight:700;margin-bottom:1rem\">Frequently Asked Questions</h3>\n          <div style=\"display:flex;flex-direction:column;gap:1rem\">\n            <div class=\"card\" style=\"cursor:default;padding:1rem\">\n              <h4 style=\"font-size:1rem;font-weight:600;margin-bottom:.35rem\">How do you find the radius from the area?</h4>\n              <p style=\"font-size:.875rem;color:var(--color-text-muted);line-height:1.6\">Since Area = πr², rearranging gives r = √(Area / π). Taking the square root of area divided by pi yields the radius.</p>\n            </div>\n          </div>",
    "faqs": [],
    "tags": [
      "circle",
      "radius",
      "diameter",
      "circumference",
      "area",
      "arc length",
      "sector",
      "pi",
      "geometry"
    ]
  },
  {
    "slug": "distance-calculator",
    "name": "Distance Calculator",
    "title": "Distance Calculator — 2D, 3D & Geographic Coordinates | Mathlify",
    "description": "Calculate Euclidean straight-line distance between 2D points (x, y), 3D points (x, y, z), and geographic coordinates (latitude and longitude) with the Haversine formula.",
    "keywords": "distance calculator, 2d distance, 3d distance, geographic distance, haversine formula, coordinates distance, midpoint calculator",
    "category": "geometry",
    "icon": "📏",
    "scriptName": "distance.js",
    "h1": "Distance Calculator",
    "pageDesc": "\n            Calculate distance between two points in 2D space, 3D space, or geographic coordinates on Earth using the Haversine formula.\n          ",
    "sidebarHtml": "<div>\n            <div class=\"card\" style=\"cursor:default;margin-bottom:1rem\">\n              <div class=\"card__title\">📏 Distance Formulas</div>\n              <div style=\"margin-top:.75rem;display:flex;flex-direction:column;gap:.6rem;font-size:.875rem;color:var(--color-text-muted);line-height:1.5\">\n                <div><strong style=\"color:var(--color-text)\">2D Euclidean:</strong><br><code>d = √[(x₂ - x₁)² + (y₂ - y₁)²]</code></div>\n                <div style=\"border-top:1px solid var(--color-border);padding-top:.5rem\"><strong style=\"color:var(--color-text)\">3D Euclidean:</strong><br><code>d = √[(Δx)² + (Δy)² + (Δz)²]</code></div>\n                <div style=\"border-top:1px solid var(--color-border);padding-top:.5rem\"><strong style=\"color:var(--color-text)\">Manhattan:</strong><br><code>d = |Δx| + |Δy|</code>",
    "guideHtml": "<h2 style=\"font-size:1.4rem;font-weight:700;margin-bottom:1rem\">Understanding Distance in Coordinate Systems</h2>\n          <p style=\"color:var(--color-text-muted);line-height:1.7;margin-bottom:1.5rem\">\n            In Cartesian coordinate geometry, Euclidean distance between two points is derived from the Pythagorean theorem. In three-dimensional space, an additional z-axis delta is added under the radical.\n          </p>\n\n          <h3 style=\"font-size:1.2rem;font-weight:700;margin-bottom:1rem\">Frequently Asked Questions</h3>\n          <div style=\"display:flex;flex-direction:column;gap:1rem\">\n            <div class=\"card\" style=\"cursor:default;padding:1rem\">\n              <h4 style=\"font-size:1rem;font-weight:600;margin-bottom:.35rem\">What is the midpoint formula?</h4>\n              <p style=\"font-size:.875rem;color:var(--color-text-muted);line-height:1.6\">The midpoint M of two points (x1, y1) and (x2, y2) is the exact center coordinate given by M = ((x1 + x2) / 2, (y1 + y2) / 2).</p>\n            </div>\n          </div>",
    "faqs": [],
    "tags": [
      "distance",
      "euclidean",
      "haversine",
      "coordinates",
      "2d",
      "3d",
      "midpoint",
      "gps",
      "lat lon",
      "geometry"
    ]
  },
  {
    "slug": "exponent-calculator",
    "name": "Exponent Calculator",
    "title": "Exponent Calculator — Calculate Power (b^x) Online | Mathlify",
    "description": "Free online exponent calculator. Calculate positive, negative, and fractional powers of any base number with step-by-step results.",
    "keywords": "exponent calculator, power calculator, calculate powers, base exponent, fractional exponents",
    "category": "math",
    "icon": "⚡",
    "scriptName": "exponent.js",
    "h1": "Exponent Calculator",
    "pageDesc": "Compute powers and exponents for integer, negative, and decimal exponents.",
    "sidebarHtml": "<div>\n            <div class='card' style='cursor:default'><div class='card__title'>⚡ Formula</div><p style=\"font-size:.85rem;color:var(--color-text-muted);margin-top:.5rem\">bⁿ = b × b × ... × b (n times)</p>",
    "guideHtml": "<h2 style='font-size:1.4rem;font-weight:700;margin-bottom:1rem'>Exponents Explained</h2><p style='color:var(--color-text-muted);line-height:1.7'>Exponentiation is a mathematical operation involving two numbers: the base and the exponent.</p>",
    "faqs": [
      {
        "question": "What happens when an exponent is negative?",
        "answer": "A negative exponent represents the reciprocal: b^(-n) = 1 / (b^n)."
      }
    ],
    "tags": [
      "exponent",
      "power",
      "base",
      "powers",
      "math"
    ]
  },
  {
    "slug": "factor-calculator",
    "name": "Factor Calculator",
    "title": "Factor Calculator — All Factors & Prime Factorization | Mathlify",
    "description": "Free online factor calculator. Find all divisors, factor pairs, prime factors, and determine if a number is prime or composite.",
    "keywords": "factor calculator, prime factorization calculator, find factors of number, divisors calculator",
    "category": "number-theory",
    "icon": "🧩",
    "scriptName": "factor.js",
    "h1": "Factor Calculator",
    "pageDesc": "Find all integer factors, factor pairs, and prime factorization for any number.",
    "sidebarHtml": "<div>\n            <div class='card' style='cursor:default'><div class='card__title'>🧩 Factors</div><p style=\"font-size:.85rem;color:var(--color-text-muted);margin-top:.5rem\">A factor divides an integer completely with zero remainder.</p>",
    "guideHtml": "<h2 style='font-size:1.4rem;font-weight:700;margin-bottom:1rem'>Prime vs Composite Numbers</h2><p style='color:var(--color-text-muted);line-height:1.7'>A prime number has only two factors (1 and itself). A composite number has three or more factors.</p>",
    "faqs": [
      {
        "question": "What is prime factorization?",
        "answer": "Prime factorization breaks down a composite number into the product of prime numbers (e.g., 24 = 2³ × 3)."
      }
    ],
    "tags": [
      "factor",
      "prime factor",
      "divisors",
      "composite",
      "prime"
    ]
  },
  {
    "slug": "gcf-calculator",
    "name": "GCF Calculator",
    "title": "GCF Calculator — Greatest Common Factor & GCD Finder | Mathlify",
    "description": "Find the Greatest Common Factor (GCF), Highest Common Factor (HCF), or Greatest Common Divisor (GCD) using the Euclidean algorithm.",
    "keywords": "GCF calculator, greatest common factor, GCD calculator, HCF calculator, greatest common divisor",
    "category": "number-theory",
    "icon": "🎯",
    "scriptName": "gcf.js",
    "h1": "GCF Calculator",
    "pageDesc": "Calculate the Greatest Common Factor (GCF / HCF / GCD) of two or more numbers.",
    "sidebarHtml": "<div>\n            <div class='card' style='cursor:default'><div class='card__title'>🎯 Euclidean Algorithm</div><p style=\"font-size:.85rem;color:var(--color-text-muted);margin-top:.5rem\">Efficiently finds GCF by repeated division remainders.</p>",
    "guideHtml": "<h2 style='font-size:1.4rem;font-weight:700;margin-bottom:1rem'>What is the Greatest Common Factor?</h2><p style='color:var(--color-text-muted);line-height:1.7'>The GCF is the largest positive integer that divides evenly into all given numbers without leaving a remainder.</p>",
    "faqs": [
      {
        "question": "What is the difference between GCF, GCD, and HCF?",
        "answer": "They are identical terms: Greatest Common Factor (GCF), Greatest Common Divisor (GCD), and Highest Common Factor (HCF)."
      }
    ],
    "tags": [
      "gcf",
      "gcd",
      "hcf",
      "greatest common divisor",
      "math"
    ]
  },
  {
    "slug": "half-life-calculator",
    "name": "Half-Life Calculator",
    "title": "Half-Life Calculator — Radioactive Decay & Remaining Amount | Mathlify",
    "description": "Free half-life calculator. Calculate remaining quantity, initial quantity, half-life time, or decay time for radioactive isotopes.",
    "keywords": "half life calculator, radioactive decay calculator, calculate half life, decay constant calculator",
    "category": "science",
    "icon": "☢️",
    "scriptName": "halfLife.js",
    "h1": "Half-Life Calculator",
    "pageDesc": "Calculate decay times, initial amounts, and remaining quantities for radioactive isotopes and exponential decay.",
    "sidebarHtml": "<div>\n            <div class='card' style='cursor:default'><div class='card__title'>☢️ Decay Formula</div><p style=\"font-size:.85rem;color:var(--color-text-muted);margin-top:.5rem\">N(t) = N₀ × (1/2)^(t / t_half)</p>",
    "guideHtml": "<h2 style='font-size:1.4rem;font-weight:700;margin-bottom:1rem'>What is Half-Life?</h2><p style='color:var(--color-text-muted);line-height:1.7'>Half-life is the time required for a quantity to reduce to half of its initial value through exponential decay.</p>",
    "faqs": [
      {
        "question": "What is the half-life formula?",
        "answer": "N(t) = N0 * (1/2)^(t / t_half), where N0 is initial quantity, t is elapsed time, and t_half is half-life period."
      }
    ],
    "tags": [
      "half life",
      "decay",
      "radioactive",
      "isotope",
      "physics",
      "science"
    ]
  },
  {
    "slug": "hex-calculator",
    "name": "Hex Calculator",
    "title": "Hex Calculator — Hexadecimal to Decimal & Binary Converter | Mathlify",
    "description": "Convert Hexadecimal (Base-16) to Decimal, Binary, and Octal. Perform Hex arithmetic and text ASCII conversions.",
    "keywords": "hex calculator, hexadecimal converter, hex to decimal, hex to binary, hex arithmetic",
    "category": "base-conversion",
    "icon": "🔣",
    "scriptName": "hex.js",
    "h1": "Hexadecimal Calculator",
    "pageDesc": "Convert between Hexadecimal, Decimal, Binary, and ASCII strings with arithmetic support.",
    "sidebarHtml": "<div>\n            <div class='card' style='cursor:default'><div class='card__title'>🔣 Base-16 Digits</div><p style=\"font-size:.85rem;color:var(--color-text-muted);margin-top:.5rem\">0-9 and A-F (where A=10, B=11, C=12, D=13, E=14, F=15).</p>",
    "guideHtml": "<h2 style='font-size:1.4rem;font-weight:700;margin-bottom:1rem'>Hexadecimal Applications</h2><p style='color:var(--color-text-muted);line-height:1.7'>Hexadecimal is commonly used in memory addressing, web color codes (#FF5733), and machine code.</p>",
    "faqs": [
      {
        "question": "What is FF in decimal?",
        "answer": "FF in hexadecimal equals (15 × 16¹) + (15 × 16⁰) = 240 + 15 = 255."
      }
    ],
    "tags": [
      "hex",
      "hexadecimal",
      "base 16",
      "binary",
      "ascii"
    ]
  },
  {
    "slug": "lcm-calculator",
    "name": "LCM Calculator",
    "title": "LCM Calculator — Find Least Common Multiple Online | Mathlify",
    "description": "Calculate the Least Common Multiple (LCM) of two or more numbers with step-by-step prime factorization and division methods.",
    "keywords": "LCM calculator, least common multiple, lowest common multiple, calculate LCM online",
    "category": "number-theory",
    "icon": "🔢",
    "scriptName": "lcm.js",
    "h1": "LCM Calculator",
    "pageDesc": "Find the least common multiple (LCM) for multiple integers instantly.",
    "sidebarHtml": "<div>\n            <div class='card' style='cursor:default'><div class='card__title'>🔢 LCM Formula</div><p style=\"font-size:.85rem;color:var(--color-text-muted);margin-top:.5rem\">LCM(a, b) = |a × b| / GCF(a, b)</p>",
    "guideHtml": "<h2 style='font-size:1.4rem;font-weight:700;margin-bottom:1rem'>How to Find the LCM</h2><p style='color:var(--color-text-muted);line-height:1.7'>The LCM of two integers is the smallest positive integer that is divisible by both numbers.</p>",
    "faqs": [
      {
        "question": "How is LCM related to GCF?",
        "answer": "The product of two numbers equals the product of their LCM and GCF: a × b = LCM(a, b) × GCF(a, b)."
      }
    ],
    "tags": [
      "lcm",
      "least common multiple",
      "number theory",
      "math"
    ]
  },
  {
    "slug": "log-calculator",
    "name": "Logarithm Calculator",
    "title": "Log Calculator — Log Base 10, Natural Log ln(x) | Mathlify",
    "description": "Free online log calculator. Compute common log (log10), natural logarithm (ln), and custom base logarithms log_b(x).",
    "keywords": "log calculator, logarithm calculator, natural log calculator, ln calculator, log base 2 calculator",
    "category": "math",
    "icon": "🪵",
    "scriptName": "log.js",
    "h1": "Logarithm Calculator",
    "pageDesc": "Calculate logarithms with any base b, natural logs (ln), and common logs (log₁₀).",
    "sidebarHtml": "<div>\n            <div class='card' style='cursor:default'><div class='card__title'>📋 Log Definition</div><p style=\"font-size:.85rem;color:var(--color-text-muted);margin-top:.5rem\">log_b(x) = y ⟺ bʸ = x</p>",
    "guideHtml": "<h2 style='font-size:1.4rem;font-weight:700;margin-bottom:1rem'>Logarithmic Rules</h2><p style='color:var(--color-text-muted);line-height:1.7'>Logarithms are the inverse operations to exponentiation.</p>",
    "faqs": [
      {
        "question": "What is the difference between log and ln?",
        "answer": "log usually refers to log base 10 (common logarithm), while ln refers to log base e (natural logarithm, e ≈ 2.71828)."
      }
    ],
    "tags": [
      "log",
      "logarithm",
      "natural log",
      "ln",
      "base 10",
      "math"
    ]
  },
  {
    "slug": "matrix-calculator",
    "name": "Matrix Calculator",
    "title": "Matrix Calculator — Determinant, Inverse & Operations | Mathlify",
    "description": "Free online matrix calculator. Compute 2x2 and 3x3 matrix addition, subtraction, multiplication, determinants, inverses, and transposes.",
    "keywords": "matrix calculator, determinant calculator, matrix inverse calculator, matrix multiplication",
    "category": "advanced",
    "icon": "▦",
    "scriptName": "matrix.js",
    "h1": "Matrix Calculator",
    "pageDesc": "Perform linear algebra operations including matrix multiplication, determinants, transposes, and matrix inversion.",
    "sidebarHtml": "<div>\n            <div class='card' style='cursor:default'><div class='card__title'>▦ Operations</div><p style=\"font-size:.85rem;color:var(--color-text-muted);margin-top:.5rem\">Supports 2×2 and 3×3 matrix arithmetic and determinant evaluations.</p>",
    "guideHtml": "<h2 style='font-size:1.4rem;font-weight:700;margin-bottom:1rem'>Matrix Algebra Fundamentals</h2><p style='color:var(--color-text-muted);line-height:1.7'>Matrices are rectangular arrays of numbers used in physics, 3D graphics, robotics, and machine learning.</p>",
    "faqs": [
      {
        "question": "When does a matrix have an inverse?",
        "answer": "A square matrix has an inverse if and only if its determinant is non-zero (det(A) ≠ 0)."
      }
    ],
    "tags": [
      "matrix",
      "linear algebra",
      "determinant",
      "inverse",
      "transpose"
    ]
  },
  {
    "slug": "mortgage-calculator",
    "name": "Mortgage Calculator",
    "title": "Mortgage Calculator — Free Online Loan Payment Estimator | Mathlify",
    "description": "Calculate monthly mortgage payments (P&I), total interest, and view an amortization schedule. Fast, accurate, and free home loan calculator with no ads.",
    "keywords": "mortgage calculator, home loan calculator, monthly mortgage payment, loan amortization, house payment estimator",
    "category": "financial",
    "icon": "🏡",
    "scriptName": "mortgage.js",
    "h1": "Mortgage Calculator",
    "pageDesc": "Calculate monthly payments, total interest paid, and preview your loan amortization schedule.",
    "sidebarHtml": "<div>\n            \n        <div class=\"card\" style=\"cursor:default;margin-bottom:1rem\">\n          <div class=\"card__title\">🏡 What's Included</div>\n          <div style=\"margin-top:.75rem;font-size:.875rem;color:var(--color-text-muted);line-height:2\">\n            <div>✅ Monthly payment (P&amp;I)</div>\n            <div>✅ Total amount paid</div>\n            <div>✅ Total interest cost</div>\n            <div>✅ Amortization preview table",
    "guideHtml": "<h2 style=\"font-size:1.4rem;font-weight:700;margin-bottom:1rem\">Understanding Your Mortgage Calculation</h2>\n          <p style=\"color:var(--color-text-muted);line-height:1.7;margin-bottom:1.5rem\">\n            A mortgage payment consists of two primary components: <strong>principal</strong> (repaying the money borrowed) and <strong>interest</strong> (the lender's fee for the loan). As you make monthly payments across your loan tenure, the portion going toward interest decreases while the principal repayment increases.\n          </p>\n          <div class=\"card\" style=\"cursor:default;margin-bottom:2rem;padding:1.25rem\">\n            <h3 style=\"font-size:1.1rem;font-weight:700;margin-bottom:.5rem\">The Monthly Mortgage Payment Formula</h3>\n            <p style=\"font-family:'DM Mono',monospace;font-size:.95rem;background:var(--color-bg);padding:.75rem 1rem;border-radius:8px;margin:.75rem 0\">\n              M = P · [r(1 + r)ⁿ] / [(1 + r)ⁿ − 1]\n            </p>\n            <ul style=\"color:var(--color-text-muted);font-size:.875rem;line-height:1.8;padding-left:1.25rem\">\n              <li><strong>M:</strong> Total monthly mortgage payment (Principal + Interest)</li>\n              <li><strong>P:</strong> Principal loan amount (Home Price − Down Payment)</li>\n              <li><strong>r:</strong> Monthly interest rate (Annual Rate / 12 / 100)</li>\n              <li><strong>n:</strong> Total number of monthly payments (Loan Term in Years × 12)</li>\n            </ul>\n          </div>\n          <h3 style=\"font-size:1.2rem;font-weight:700;margin-bottom:.75rem\">Step-by-Step Mortgage Calculation Example</h3>\n          <p style=\"color:var(--color-text-muted);line-height:1.7;margin-bottom:1rem\">\n            Suppose you purchase a home for <strong>₹50,00,000</strong> with a down payment of <strong>₹10,00,000</strong> (loan principal <strong>₹40,00,000</strong>) at an annual interest rate of <strong>8.5%</strong> over <strong>20 years</strong> (240 months):\n          </p>\n          <ol style=\"color:var(--color-text-muted);font-size:.9rem;line-height:1.8;padding-left:1.25rem;margin-bottom:2rem\">\n            <li>Calculate monthly rate: <code>r = 8.5 / 12 / 100 = 0.007083</code></li>\n            <li>Calculate <code>(1 + r)²⁴⁰ = 5.4095</code></li>\n            <li>Multiply numerator: <code>40,00,000 × 0.007083 × 5.4095 = 1,53,222.18</code></li>\n            <li>Divide by denominator <code>(5.4095 − 1) = 4.4095</code></li>\n            <li><strong>Monthly EMI = ₹34,713</strong> (Total repayment = ₹83,31,120, Total interest = ₹43,31,120)</li>\n          </ol>\n          <h3 style=\"font-size:1.2rem;font-weight:700;margin-bottom:1rem\">Frequently Asked Questions</h3>\n          <div style=\"display:flex;flex-direction:column;gap:1rem\">\n            <div class=\"card\" style=\"cursor:default;padding:1rem\">\n              <h4 style=\"font-size:1rem;font-weight:600;margin-bottom:.35rem\">What is included in this mortgage calculation?</h4>\n              <p style=\"font-size:.875rem;color:var(--color-text-muted);line-height:1.6\">This tool calculates the core Principal & Interest (P&I) payments and produces an amortization schedule. Property taxes, homeowners insurance, and PMI are determined by local tax jurisdictions and lender policies.</p>\n            </div>\n            <div class=\"card\" style=\"cursor:default;padding:1rem\">\n              <h4 style=\"font-size:1rem;font-weight:600;margin-bottom:.35rem\">How does a down payment lower my monthly loan payment?</h4>\n              <p style=\"font-size:.875rem;color:var(--color-text-muted);line-height:1.6\">A larger down payment directly reduces the principal loan amount (P). Because interest is computed on the remaining balance, every extra dollar paid upfront reduces both the monthly payment and total lifetime interest.</p>\n            </div>\n          </div>",
    "faqs": [
      {
        "question": "How is a monthly mortgage payment calculated?",
        "answer": "Monthly mortgage payment is calculated using the formula M = P[r(1+r)^n] / [(1+r)^n - 1], where P is loan principal, r is the monthly interest rate, and n is total monthly payments."
      },
      {
        "question": "How does a down payment lower my monthly loan payment?",
        "answer": "A higher down payment reduces the principal loan amount, which lowers both the required monthly payment and the total interest accumulated over the life of the loan."
      }
    ],
    "tags": [
      "mortgage",
      "loan",
      "home",
      "house",
      "interest",
      "finance",
      "payment",
      "EMI"
    ]
  },
  {
    "slug": "percent-error-calculator",
    "name": "Percent Error Calculator",
    "title": "Percent Error Calculator — Calculate Experimental Error | Mathlify",
    "description": "Free percent error calculator. Calculate experimental vs. theoretical (accepted) value error percentage with step explanations.",
    "keywords": "percent error calculator, percentage error, calculate percent error, experimental error formula",
    "category": "science",
    "icon": "🧪",
    "scriptName": "percentError.js",
    "h1": "Percent Error Calculator",
    "pageDesc": "Calculate experimental error percentage comparing measured values against true theoretical values.",
    "sidebarHtml": "<div>\n            <div class='card' style='cursor:default'><div class='card__title'>🧪 Formula</div><p style=\"font-size:.85rem;color:var(--color-text-muted);margin-top:.5rem\">|Exp − Theo| / Theo × 100%</p>",
    "guideHtml": "<h2 style='font-size:1.4rem;font-weight:700;margin-bottom:1rem'>Understanding Percent Error</h2><p style='color:var(--color-text-muted);line-height:1.7'>Percent error gauges the accuracy of experimental measurements against established true values.</p>",
    "faqs": [
      {
        "question": "Can percent error be negative?",
        "answer": "Because the formula takes the absolute difference |Experimental - Theoretical|, percent error is always reported as a non-negative value."
      }
    ],
    "tags": [
      "percent error",
      "experimental",
      "theoretical",
      "chemistry",
      "physics"
    ]
  },
  {
    "slug": "percentage-calculator",
    "name": "Percentage Calculator",
    "title": "Percentage Calculator — Free Online Percent Calculation | Mathlify",
    "description": "Free online percentage calculator. Calculate percentage of a number, percentage increase/decrease, and what percentage X is of Y.",
    "keywords": "percentage calculator, percent increase calculator, calculate percentage, percentage difference, percent change",
    "category": "math",
    "icon": "🔢",
    "scriptName": "percentage.js",
    "h1": "Percentage Calculator",
    "pageDesc": "Calculate percentage values, percentage changes (increase/decrease), and find proportions instantly.",
    "sidebarHtml": "<div>\n            \n        <div class=\"card\" style=\"cursor:default\">\n          <div class=\"card__title\">💡 Quick Formulas</div>\n          <div style=\"margin-top:.75rem;font-size:.85rem;color:var(--color-text-muted);line-height:1.8\">\n            <div><strong>P% of X:</strong> (P / 100) × X</div>\n            <div><strong>% Change:</strong> ((New − Old) / Old) × 100",
    "guideHtml": "<h2 style=\"font-size:1.4rem;font-weight:700;margin-bottom:1rem\">Percentage Calculation Formulas</h2>\n          <p style=\"color:var(--color-text-muted);line-height:1.7;margin-bottom:1.5rem\">\n            A percentage represents a fraction of 100. It is used across finance, sales discounts, test grading, and statistics.\n          </p>",
    "faqs": [
      {
        "question": "How do you calculate percentage increase?",
        "answer": "Percentage Increase = ((New Value - Original Value) / Original Value) * 100."
      }
    ],
    "tags": [
      "percent",
      "percentage",
      "%",
      "ratio",
      "change",
      "increase",
      "decrease"
    ]
  },
  {
    "slug": "pythagorean-calculator",
    "name": "Pythagorean Theorem Calculator",
    "title": "Pythagorean Theorem Calculator — Solve a² + b² = c² | Mathlify",
    "description": "Calculate hypotenuse (c) or leg lengths (a, b) using the Pythagorean theorem a² + b² = c². Shows exact radical simplification, step-by-step substitution, and Pythagorean triples.",
    "keywords": "pythagorean theorem calculator, find hypotenuse, a2 b2 c2, pythagorean triples, right triangle hypotenuse, simplify radicals",
    "category": "geometry",
    "icon": "📐",
    "scriptName": "pythagorean.js",
    "h1": "Pythagorean Theorem Calculator",
    "pageDesc": "\n            Calculate the hypotenuse or legs of a right triangle using a² + b² = c² with exact radical forms, step-by-step proofs, and integer triples.\n          ",
    "sidebarHtml": "<div>\n            <div class=\"card\" style=\"cursor:default;margin-bottom:1rem\">\n              <div class=\"card__title\">⭐ Common Integer Triples</div>\n              <div style=\"margin-top:.75rem;display:flex;flex-direction:column;gap:.6rem;font-size:.875rem;color:var(--color-text-muted);line-height:1.5\">\n                <div><code>3 - 4 - 5</code> (3² + 4² = 9 + 16 = 25 = 5²)</div>\n                <div style=\"border-top:1px solid var(--color-border);padding-top:.5rem\"><code>5 - 12 - 13</code> (25 + 144 = 169)</div>\n                <div style=\"border-top:1px solid var(--color-border);padding-top:.5rem\"><code>8 - 15 - 17</code> (64 + 225 = 289)</div>\n                <div style=\"border-top:1px solid var(--color-border);padding-top:.5rem\"><code>7 - 24 - 25</code> (49 + 576 = 625)</div>\n                <div style=\"border-top:1px solid var(--color-border);padding-top:.5rem\"><code>9 - 40 - 41</code> (81 + 1600 = 1681)",
    "guideHtml": "<h2 style=\"font-size:1.4rem;font-weight:700;margin-bottom:1rem\">The Pythagorean Theorem (a² + b² = c²)</h2>\n          <p style=\"color:var(--color-text-muted);line-height:1.7;margin-bottom:1.5rem\">\n            Attributed to the ancient Greek mathematician Pythagoras (c. 570–495 BC) and independently discovered by ancient Indian mathematicians in the Baudhayana Sulba Sutras (c. 800 BC), this theorem establishes the fundamental relationship between the three sides of any right-angled Euclidean triangle.\n          </p>\n\n          <h3 style=\"font-size:1.2rem;font-weight:700;margin-bottom:1rem\">Frequently Asked Questions</h3>\n          <div style=\"display:flex;flex-direction:column;gap:1rem\">\n            <div class=\"card\" style=\"cursor:default;padding:1rem\">\n              <h4 style=\"font-size:1rem;font-weight:600;margin-bottom:.35rem\">Can the hypotenuse be shorter than a leg?</h4>\n              <p style=\"font-size:.875rem;color:var(--color-text-muted);line-height:1.6\">No. In any right triangle, the hypotenuse is opposite the 90-degree right angle (the largest angle in the triangle) and is always the strictly longest side.</p>\n            </div>\n          </div>",
    "faqs": [
      {
        "question": "What is the Pythagorean Theorem?",
        "answer": "The Pythagorean theorem states that in any right triangle with legs a and b and hypotenuse c, the sum of the squares of the two legs equals the square of the hypotenuse: a² + b² = c²."
      },
      {
        "question": "What is a Pythagorean Triple?",
        "answer": "A Pythagorean triple consists of three positive integers (a, b, c) such that a² + b² = c². Famous examples include (3, 4, 5), (5, 12, 13), and (8, 15, 17)."
      }
    ],
    "tags": [
      "pythagorean",
      "hypotenuse",
      "a2 b2 c2",
      "triples",
      "radicals",
      "right triangle",
      "geometry"
    ]
  },
  {
    "slug": "quadratic-calculator",
    "name": "Quadratic Formula Calculator",
    "title": "Quadratic Formula Calculator — Solve ax² + bx + c = 0 | Mathlify",
    "description": "Solve quadratic equations instantly. Find real and complex roots, discriminant (Δ), vertex, and step-by-step solutions.",
    "keywords": "quadratic formula calculator, solve quadratic equation, discriminant calculator, parabola vertex calculator",
    "category": "math",
    "icon": "📈",
    "scriptName": "quadratic.js",
    "h1": "Quadratic Formula Calculator",
    "pageDesc": "Solve quadratic equations of the form ax² + bx + c = 0 with real and complex roots.",
    "sidebarHtml": "<div>\n            <div class='card' style='cursor:default'><div class='card__title'>📐 Quadratic Formula</div><p style=\"font-size:.85rem;color:var(--color-text-muted);margin-top:.5rem\">x = (−b ± √(b² − 4ac)) / (2a)</p>",
    "guideHtml": "<h2 style='font-size:1.4rem;font-weight:700;margin-bottom:1rem'>Understanding Quadratic Equations</h2><p style='color:var(--color-text-muted);line-height:1.7'>Quadratic equations are second-degree polynomials represented by a parabola on a coordinate plane.</p>",
    "faqs": [
      {
        "question": "What is the discriminant?",
        "answer": "The discriminant is Δ = b² - 4ac. If Δ > 0, there are 2 real roots; if Δ = 0, 1 real root; if Δ < 0, 2 complex roots."
      }
    ],
    "tags": [
      "quadratic",
      "algebra",
      "roots",
      "parabola",
      "discriminant"
    ]
  },
  {
    "slug": "random-calculator",
    "name": "Random Number Generator",
    "title": "Random Number Generator — Generate Random Numbers Online | Mathlify",
    "description": "Free online random number generator. Generate random integers, decimals, custom ranges, and non-repeating lottery lists.",
    "keywords": "random number generator, RNG online, random picker, pick random number, random integer generator",
    "category": "math",
    "icon": "🎲",
    "scriptName": "random.js",
    "h1": "Random Number Generator",
    "pageDesc": "Generate secure, unbiased random numbers within any custom minimum and maximum range.",
    "sidebarHtml": "<div>\n            <div class='card' style='cursor:default'><div class='card__title'>🎲 Random Features</div><p style=\"font-size:.85rem;color:var(--color-text-muted);margin-top:.5rem\">Generate single or multiple numbers with optional duplicate removal.</p>",
    "guideHtml": "<h2 style='font-size:1.4rem;font-weight:700;margin-bottom:1rem'>Cryptographic Randomness</h2><p style='color:var(--color-text-muted);line-height:1.7'>Uses web standards crypto APIs for high-entropy randomization.</p>",
    "faqs": [
      {
        "question": "Are the generated numbers truly random?",
        "answer": "Our generator uses the browser's crypto.getRandomValues API, providing cryptographically strong pseudo-random numbers."
      }
    ],
    "tags": [
      "random",
      "rng",
      "picker",
      "lottery",
      "numbers"
    ]
  },
  {
    "slug": "ratio-calculator",
    "name": "Ratio Calculator",
    "title": "Ratio Calculator — Simplify & Solve Proportions (A:B = C:D) | Mathlify",
    "description": "Free online ratio calculator. Simplify ratios, find missing proportion values (A:B = C:D), and scale recipe or aspect ratios.",
    "keywords": "ratio calculator, simplify ratio, proportion calculator, solve ratio, aspect ratio calculator",
    "category": "number-theory",
    "icon": "⚖️",
    "scriptName": "ratio.js",
    "h1": "Ratio Calculator",
    "pageDesc": "Simplify ratios to simplest form and solve for unknown values in proportions.",
    "sidebarHtml": "<div>\n            <div class='card' style='cursor:default'><div class='card__title'>⚖️ Proportion Law</div><p style=\"font-size:.85rem;color:var(--color-text-muted);margin-top:.5rem\">A / B = C / D ⟺ A × D = B × C</p>",
    "guideHtml": "<h2 style='font-size:1.4rem;font-weight:700;margin-bottom:1rem'>Simplifying Ratios</h2><p style='color:var(--color-text-muted);line-height:1.7'>Ratios compare two quantities. Dividing both terms by their Greatest Common Factor yields the simplest form.</p>",
    "faqs": [
      {
        "question": "How do you solve for x in a ratio A:B = C:x?",
        "answer": "Cross multiply: x = (B × C) / A."
      }
    ],
    "tags": [
      "ratio",
      "proportion",
      "scaling",
      "fractions",
      "math"
    ]
  },
  {
    "slug": "right-triangle-calculator",
    "name": "Right Triangle Calculator",
    "title": "Right Triangle Calculator — Solve Sides, Angles & Trig Ratios | Mathlify",
    "description": "Solve right triangles given two sides, leg and hypotenuse, or side and angle. Calculate area, perimeter, inradius, circumradius, and trigonometric ratios (sin, cos, tan).",
    "keywords": "right triangle calculator, solve right triangle, trigonometry calculator, sin cos tan, hypotenuse, right triangle angles",
    "category": "geometry",
    "icon": "📐",
    "scriptName": "rightTriangle.js",
    "h1": "Right Triangle Calculator",
    "pageDesc": "\n            Solve for all sides, angles, area, perimeter, and trigonometric functions of a right-angled triangle given any two parameters.\n          ",
    "sidebarHtml": "<div>\n            <div class=\"card\" style=\"cursor:default;margin-bottom:1rem\">\n              <div class=\"card__title\">📐 Trigonometric Definitions</div>\n              <div style=\"margin-top:.75rem;display:flex;flex-direction:column;gap:.6rem;font-size:.875rem;color:var(--color-text-muted);line-height:1.5\">\n                <div><strong style=\"color:var(--color-text)\">sin(α):</strong> Opposite / Hypotenuse = <code>a / c</code></div>\n                <div style=\"border-top:1px solid var(--color-border);padding-top:.5rem\"><strong style=\"color:var(--color-text)\">cos(α):</strong> Adjacent / Hypotenuse = <code>b / c</code></div>\n                <div style=\"border-top:1px solid var(--color-border);padding-top:.5rem\"><strong style=\"color:var(--color-text)\">tan(α):</strong> Opposite / Adjacent = <code>a / b</code>",
    "guideHtml": "<h2 style=\"font-size:1.4rem;font-weight:700;margin-bottom:1rem\">Right Triangle Trigonometry</h2>\n          <p style=\"color:var(--color-text-muted);line-height:1.7;margin-bottom:1.5rem\">\n            A right-angled triangle has one interior angle measuring exactly 90 degrees (π/2 radians). The two non-right angles are complementary and always sum to 90 degrees (α + β = 90°).\n          </p>\n\n          <h3 style=\"font-size:1.2rem;font-weight:700;margin-bottom:1rem\">Frequently Asked Questions</h3>\n          <div style=\"display:flex;flex-direction:column;gap:1rem\">\n            <div class=\"card\" style=\"cursor:default;padding:1rem\">\n              <h4 style=\"font-size:1rem;font-weight:600;margin-bottom:.35rem\">What is the SOH-CAH-TOA mnemonic?</h4>\n              <p style=\"font-size:.875rem;color:var(--color-text-muted);line-height:1.6\">SOH-CAH-TOA helps remember basic trigonometry: Sine = Opposite / Hypotenuse, Cosine = Adjacent / Hypotenuse, Tangent = Opposite / Adjacent.</p>\n            </div>\n          </div>",
    "faqs": [],
    "tags": [
      "right triangle",
      "trigonometry",
      "sin",
      "cos",
      "tan",
      "hypotenuse",
      "legs",
      "angles",
      "geometry"
    ]
  },
  {
    "slug": "root-calculator",
    "name": "Root Calculator",
    "title": "Root Calculator — Square Root & Nth Root Calculator | Mathlify",
    "description": "Free online root calculator. Calculate square roots (√x), cube roots (∛x), and custom nth roots (ⁿ√x) with high precision.",
    "keywords": "root calculator, square root calculator, cube root calculator, nth root calculator, radical calculator",
    "category": "math",
    "icon": "√",
    "scriptName": "root.js",
    "h1": "Root Calculator",
    "pageDesc": "Calculate square roots, cube roots, and custom degree roots for any real number.",
    "sidebarHtml": "<div>\n            <div class='card' style='cursor:default'><div class='card__title'>√ Root Notation</div><p style=\"font-size:.85rem;color:var(--color-text-muted);margin-top:.5rem\">ⁿ√x = y such that yⁿ = x</p>",
    "guideHtml": "<h2 style='font-size:1.4rem;font-weight:700;margin-bottom:1rem'>How Roots Work</h2><p style='color:var(--color-text-muted);line-height:1.7'>Finding the nth root of a number x means finding a number y that, when multiplied by itself n times, equals x.</p>",
    "faqs": [
      {
        "question": "Can you calculate the root of a negative number?",
        "answer": "Odd roots (like cube root) of negative numbers are real negative numbers. Even roots of negative numbers result in imaginary/complex numbers."
      }
    ],
    "tags": [
      "root",
      "square root",
      "cube root",
      "radical",
      "math"
    ]
  },
  {
    "slug": "round-calculator",
    "name": "Rounding Calculator",
    "title": "Rounding Calculator — Round Decimals & Significant Figures | Mathlify",
    "description": "Free online rounding calculator. Round numbers to nearest tenths, hundredths, thousandths, significant figures, floor, or ceiling.",
    "keywords": "rounding calculator, round to nearest tenth, round significant figures, round decimals online",
    "category": "advanced",
    "icon": "🎯",
    "scriptName": "round.js",
    "h1": "Rounding Calculator",
    "pageDesc": "Round numbers to nearest decimal places, significant figures, fractions, or integer limits.",
    "sidebarHtml": "<div>\n            <div class='card' style='cursor:default'><div class='card__title'>🎯 Rounding Modes</div><p style=\"font-size:.85rem;color:var(--color-text-muted);margin-top:.5rem\">Standard half-up, ceil, floor, and significant figure rounding.</p>",
    "guideHtml": "<h2 style='font-size:1.4rem;font-weight:700;margin-bottom:1rem'>Rounding Rules</h2><p style='color:var(--color-text-muted);line-height:1.7'>If the following digit is 5 or greater, round up; otherwise, round down.</p>",
    "faqs": [
      {
        "question": "How do you round to 2 decimal places?",
        "answer": "Look at the 3rd decimal digit (thousandths). If it is 5 or greater, add 1 to the 2nd decimal place; if less than 5, keep the 2nd decimal place unchanged."
      }
    ],
    "tags": [
      "round",
      "rounding",
      "decimals",
      "significant figures",
      "sig figs"
    ]
  },
  {
    "slug": "scientific-calculator",
    "name": "Scientific Calculator",
    "title": "Scientific Calculator — Free Advanced Math Online | Mathlify",
    "description": "Free online scientific calculator. Perform trigonometric functions (sin, cos, tan), logarithms, powers, roots, factorials, and constants.",
    "keywords": "scientific calculator, advanced online calculator, trigonometry calculator, log calculator, math calculator",
    "category": "math",
    "icon": "📐",
    "scriptName": "scientific.js",
    "h1": "Scientific Calculator",
    "pageDesc": "Perform complex calculations including trigonometry, logarithms, exponential functions, and factorial operations.",
    "sidebarHtml": "<div>\n            \n        <div class=\"card\" style=\"cursor:default\">\n          <div class=\"card__title\">📐 Features</div>\n          <div style=\"margin-top:.75rem;font-size:.875rem;color:var(--color-text-muted);line-height:1.8\">\n            <div>• Radian and Degree modes</div>\n            <div>• Trig (sin, cos, tan) &amp; inverses</div>\n            <div>• Natural log (ln) &amp; log₁₀</div>\n            <div>• Constants: π (pi), e (Euler's number)",
    "guideHtml": "<h2 style=\"font-size:1.4rem;font-weight:700;margin-bottom:1rem\">Online Scientific Calculator Features</h2>\n          <p style=\"color:var(--color-text-muted);line-height:1.7;margin-bottom:1.5rem\">\n            This tool provides advanced mathematical functions for high school students, engineers, and scientists with instant precision.\n          </p>",
    "faqs": [
      {
        "question": "Can I switch between Radians and Degrees?",
        "answer": "Yes, toggle between DEG and RAD mode using the toggle button on the calculator panel."
      }
    ],
    "tags": [
      "sin",
      "cos",
      "tan",
      "log",
      "square root",
      "advanced",
      "science",
      "trig"
    ]
  },
  {
    "slug": "scientific-notation-calculator",
    "name": "Scientific Notation Calculator",
    "title": "Scientific Notation Calculator — Convert to Standard & Scientific | Mathlify",
    "description": "Convert numbers into scientific notation (a × 10^b) and engineering notation. Perform addition, subtraction, multiplication, and division.",
    "keywords": "scientific notation calculator, standard to scientific notation, engineering notation calculator",
    "category": "math",
    "icon": "🔬",
    "scriptName": "scientificNotation.js",
    "h1": "Scientific Notation Calculator",
    "pageDesc": "Convert standard numbers into scientific notation and perform operations on exponential values.",
    "sidebarHtml": "<div>\n            <div class='card' style='cursor:default'><div class='card__title'>🔬 Format</div><p style=\"font-size:.85rem;color:var(--color-text-muted);margin-top:.5rem\">a × 10ᵇ where 1 ≤ |a| &lt; 10</p>",
    "guideHtml": "<h2 style='font-size:1.4rem;font-weight:700;margin-bottom:1rem'>Scientific Notation Explained</h2><p style='color:var(--color-text-muted);line-height:1.7'>Scientific notation simplifies writing very large and very small numbers.</p>",
    "faqs": [
      {
        "question": "What is scientific notation?",
        "answer": "Scientific notation writes numbers as a coefficient (between 1 and 10) multiplied by 10 raised to an integer exponent (a × 10^b)."
      }
    ],
    "tags": [
      "scientific notation",
      "standard form",
      "engineering",
      "powers of 10"
    ]
  },
  {
    "slug": "slope-calculator",
    "name": "Slope Calculator",
    "title": "Slope Calculator — Find m, Angle, Grade & Line Equation | Mathlify",
    "description": "Calculate slope (m = rise/run) between two points (x1, y1) and (x2, y2) or from standard form equation Ax + By = C. Find angle of inclination, grade %, and perpendicular line slope.",
    "keywords": "slope calculator, find slope, rise over run, angle of inclination, grade percentage, slope intercept form, perpendicular slope",
    "category": "geometry",
    "icon": "📈",
    "scriptName": "slope.js",
    "h1": "Slope Calculator",
    "pageDesc": "\n            Find the slope, inclination angle, percent grade, and line equations between two points or from standard form Ax + By = C.\n          ",
    "sidebarHtml": "<div>\n            <div class=\"card\" style=\"cursor:default;margin-bottom:1rem\">\n              <div class=\"card__title\">📈 Slope Definitions</div>\n              <div style=\"margin-top:.75rem;display:flex;flex-direction:column;gap:.6rem;font-size:.875rem;color:var(--color-text-muted);line-height:1.5\">\n                <div><strong style=\"color:var(--color-text)\">Slope Formula:</strong><br>m = (y₂ - y₁) / (x₂ - x₁) = Rise / Run</div>\n                <div style=\"border-top:1px solid var(--color-border);padding-top:.5rem\"><strong style=\"color:var(--color-text)\">Angle of Inclination:</strong><br>θ = arctan(m) in degrees</div>\n                <div style=\"border-top:1px solid var(--color-border);padding-top:.5rem\"><strong style=\"color:var(--color-text)\">Percent Grade:</strong><br>Grade % = m × 100",
    "guideHtml": "<h2 style=\"font-size:1.4rem;font-weight:700;margin-bottom:1rem\">Understanding Slope &amp; Line Steepness</h2>\n          <p style=\"color:var(--color-text-muted);line-height:1.7;margin-bottom:1.5rem\">\n            In coordinate geometry, the slope of a line describes both its direction (positive for rising, negative for falling) and its steepness. It measures how much the dependent variable y changes for every unit increase in the independent variable x.\n          </p>\n\n          <h3 style=\"font-size:1.2rem;font-weight:700;margin-bottom:1rem\">Frequently Asked Questions</h3>\n          <div style=\"display:flex;flex-direction:column;gap:1rem\">\n            <div class=\"card\" style=\"cursor:default;padding:1rem\">\n              <h4 style=\"font-size:1rem;font-weight:600;margin-bottom:.35rem\">What does an undefined slope mean?</h4>\n              <p style=\"font-size:.875rem;color:var(--color-text-muted);line-height:1.6\">A vertical line has an undefined slope because the horizontal change (run) is zero, and division by zero is mathematically undefined. Its equation is given by x = constant.</p>\n            </div>\n          </div>",
    "faqs": [
      {
        "question": "How is slope calculated between two points?",
        "answer": "Slope is calculated as m = (y2 - y1) / (x2 - x1), representing the vertical change (rise) divided by the horizontal change (run)."
      },
      {
        "question": "What is the slope of perpendicular lines?",
        "answer": "Two non-vertical lines are perpendicular if their slopes are negative reciprocals of each other: m1 × m2 = -1, or m2 = -1 / m1."
      }
    ],
    "tags": [
      "slope",
      "line",
      "gradient",
      "rise over run",
      "angle",
      "grade",
      "linear equation",
      "perpendicular",
      "geometry"
    ]
  },
  {
    "slug": "surface-area-calculator",
    "name": "Surface Area Calculator",
    "title": "Surface Area Calculator — Spheres, Cylinders, Cones & Prisms | Mathlify",
    "description": "Calculate total surface area, lateral surface area, and base area of spheres, cylinders, cones, rectangular prisms, cubes, and capsules with formulas.",
    "keywords": "surface area calculator, sphere surface area, cylinder surface area, cone surface area, prism surface area, total surface area, lateral area",
    "category": "geometry",
    "icon": "📦",
    "scriptName": "surfaceArea.js",
    "h1": "Surface Area Calculator",
    "pageDesc": "\n            Calculate total, lateral, and base surface area of 3D geometric solids including spheres, cylinders, cones, rectangular boxes, cubes, and capsules.\n          ",
    "sidebarHtml": "<div>\n            <div class=\"card\" style=\"cursor:default;margin-bottom:1rem\">\n              <div class=\"card__title\">📦 Surface Area Formulas</div>\n              <div style=\"margin-top:.75rem;display:flex;flex-direction:column;gap:.6rem;font-size:.875rem;color:var(--color-text-muted);line-height:1.5\">\n                <div><strong style=\"color:var(--color-text)\">Sphere:</strong> <code>SA = 4πr²</code></div>\n                <div style=\"border-top:1px solid var(--color-border);padding-top:.5rem\"><strong style=\"color:var(--color-text)\">Cylinder:</strong> <code>SA = 2πr² + 2πrh</code></div>\n                <div style=\"border-top:1px solid var(--color-border);padding-top:.5rem\"><strong style=\"color:var(--color-text)\">Cone:</strong> <code>SA = πr² + πr√(r² + h²)</code></div>\n                <div style=\"border-top:1px solid var(--color-border);padding-top:.5rem\"><strong style=\"color:var(--color-text)\">Box:</strong> <code>SA = 2(lw + lh + wh)</code>",
    "guideHtml": "<h2 style=\"font-size:1.4rem;font-weight:700;margin-bottom:1rem\">Surface Area in Three Dimensions</h2>\n          <p style=\"color:var(--color-text-muted);line-height:1.7;margin-bottom:1.5rem\">\n            Surface area is the total area that the surface of an object occupies in three-dimensional space. It represents the total amount of 2D material required to wrap or paint the external boundary of a solid.\n          </p>\n\n          <h3 style=\"font-size:1.2rem;font-weight:700;margin-bottom:1rem\">Frequently Asked Questions</h3>\n          <div style=\"display:flex;flex-direction:column;gap:1rem\">\n            <div class=\"card\" style=\"cursor:default;padding:1rem\">\n              <h4 style=\"font-size:1rem;font-weight:600;margin-bottom:.35rem\">What is the surface area of a sphere?</h4>\n              <p style=\"font-size:.875rem;color:var(--color-text-muted);line-height:1.6\">Archimedes proved that the surface area of a sphere of radius r is exactly equal to four times the area of its great circle: SA = 4πr².</p>\n            </div>\n          </div>",
    "faqs": [],
    "tags": [
      "surface area",
      "sphere",
      "cylinder",
      "cone",
      "prism",
      "capsule",
      "lateral area",
      "geometry"
    ]
  },
  {
    "slug": "time-calculator",
    "name": "Time Calculator",
    "title": "Time Calculator — Add or Subtract Time &amp; Dates | Mathlify",
    "description": "Free online time calculator. Add or subtract time (days, hours, minutes, seconds), calculate time difference from a date, and find duration between two dates.",
    "keywords": "time calculator, add time, subtract time, time difference, duration between dates, hours minutes seconds calculator, date time math",
    "category": "math",
    "icon": "⏱️",
    "scriptName": "time.js",
    "h1": "Time Calculator",
    "pageDesc": "Add or subtract time durations, calculate date &amp; time projections, and find the exact duration between two dates.",
    "sidebarHtml": "<div>\n\n            <div class=\"card\" style=\"cursor:default;margin-bottom:1.25rem\">\n              <div class=\"card__title\">⏱️ 3 Powerful Modes</div>\n              <p style=\"font-size:.85rem;color:var(--color-text-muted);line-height:1.7;margin-top:.5rem\">\n                <strong>1. Add/Subtract Time:</strong> Combine or deduct durations in days, hours, minutes, and seconds.<br>\n                <strong>2. Time From Date:</strong> Project future or past timestamps by adding or subtracting elapsed time.<br>\n                <strong>3. Between Dates:</strong> Measure the exact span separating two calendar dates.\n              </p>\n            </div>\n\n            <div class=\"card\" style=\"cursor:default\">\n              <div class=\"card__title\">📋 Conversion Factors</div>\n              <ul style=\"font-size:.825rem;color:var(--color-text-muted);line-height:1.8;padding-left:1.2rem;margin-top:.5rem\">\n                <li>1 Day = 24 Hours = 1,440 Minutes</li>\n                <li>1 Hour = 60 Minutes = 3,600 Seconds</li>\n                <li>1 Minute = 60 Seconds</li>\n                <li>1 Day = 86,400 Seconds</li>\n                <li>1 Week = 7 Days = 168 Hours</li>\n              </ul>",
    "guideHtml": "<h2 style=\"font-size:1.4rem;font-weight:700;margin-bottom:1rem\">How Time Calculation Works</h2>\n          <p style=\"color:var(--color-text-muted);line-height:1.7;margin-bottom:1.5rem\">\n            Unlike base-10 decimal mathematics, time measurement uses a mixed-radix sexagesimal system (base-60 for minutes and seconds, base-24 for hours in a day, and 7 days in a standard week). Adding or subtracting time durations requires carrying over or borrowing across these distinct unit thresholds.\n          </p>\n\n          <div style=\"display:grid;grid-template-columns:repeat(auto-fit, minmax(280px, 1fr));gap:1.25rem;margin-bottom:2rem\">\n            <div class=\"card\" style=\"cursor:default;padding:1.25rem\">\n              <h3 style=\"font-size:1.1rem;font-weight:700;margin-bottom:.5rem\">Duration Carryover &amp; Borrowing</h3>\n              <p style=\"color:var(--color-text-muted);font-size:.875rem;line-height:1.7\">\n                When adding, every 60 seconds rolls into 1 minute, every 60 minutes rolls into 1 hour, and every 24 hours rolls into 1 day. When subtracting, if a lower unit is smaller than the subtracted amount, 1 unit is borrowed from the next higher unit (e.g. 1 minute becomes 60 seconds).\n              </p>\n            </div>\n\n            <div class=\"card\" style=\"cursor:default;padding:1.25rem\">\n              <h3 style=\"font-size:1.1rem;font-weight:700;margin-bottom:.5rem\">Exact Date &amp; Calendar Math</h3>\n              <p style=\"color:var(--color-text-muted);font-size:.875rem;line-height:1.7\">\n                When calculating across calendar boundaries, our tool automatically accounts for month day-counts (28, 29, 30, or 31 days) and Gregorian leap years, providing precise resulting timestamps, weekdays, and elapsed intervals.\n              </p>\n            </div>\n          </div>\n\n          <div class=\"card\" style=\"cursor:default;margin-bottom:2rem;padding:1.25rem\">\n            <h3 style=\"font-size:1.1rem;font-weight:700;margin-bottom:.5rem\">Common Applications</h3>\n            <ul style=\"color:var(--color-text-muted);font-size:.875rem;line-height:1.8;padding-left:1.25rem\">\n              <li><strong>Payroll &amp; Work Timesheets:</strong> Summing logged shifts, project hours, and overtime across multiple tasks.</li>\n              <li><strong>Travel &amp; Flight Schedules:</strong> Calculating flight layovers, arrival times across time zones, and trip durations.</li>\n              <li><strong>Audio &amp; Video Production:</strong> Totaling media runtimes, podcast episode segments, and cut timestamps.</li>\n              <li><strong>Athletic Training:</strong> Computing marathon splits, lap totals, and pace increments.</li>\n            </ul>\n          </div>",
    "faqs": [
      {
        "question": "How does the time calculator add and subtract time?",
        "answer": "The calculator converts days, hours, minutes, and seconds into total base seconds to perform exact arithmetic, then decomposes the result into normalized days, hours, minutes, and seconds while handling carryovers and borrowing."
      },
      {
        "question": "Can I add hours or days to a specific date and time?",
        "answer": "Yes. Switch to the 'Time From Date' tab, enter your starting date and time (or click 'Now'), specify the duration to add or subtract, and click Calculate."
      },
      {
        "question": "How does duration between two dates work?",
        "answer": "The 'Between Dates' mode computes the exact millisecond delta between start and end timestamps, giving you a full breakdown in days, hours, minutes, seconds, as well as total hours, total minutes, and decimal days."
      }
    ],
    "tags": [
      "time",
      "duration",
      "add time",
      "subtract time",
      "hours",
      "minutes",
      "seconds",
      "days",
      "clock",
      "date time",
      "calculator net"
    ]
  },
  {
    "slug": "triangle-calculator",
    "name": "Triangle Calculator",
    "title": "Triangle Calculator — Solve SSS, SAS, ASA & Area | Mathlify",
    "description": "Calculate triangle area, perimeter, angles, inradius, and circumradius given SSS, SAS, ASA, or base and height. Includes Heron",
    "keywords": "triangle calculator, triangle area, Heron formula, SSS triangle, SAS triangle, ASA triangle, angles of triangle, inradius, circumradius",
    "category": "geometry",
    "icon": "📐",
    "scriptName": "triangle.js",
    "h1": "Triangle Calculator",
    "pageDesc": "\n            Solve any triangle using SSS, SAS, ASA, or Base &amp; Height. Calculate area, perimeter, all angles, inradius, and circumradius.\n          ",
    "sidebarHtml": "<div>\n            <div class=\"card\" style=\"cursor:default;margin-bottom:1rem\">\n              <div class=\"card__title\">📐 Triangle Theorems</div>\n              <div style=\"margin-top:.75rem;display:flex;flex-direction:column;gap:.6rem;font-size:.875rem;color:var(--color-text-muted);line-height:1.5\">\n                <div><strong style=\"color:var(--color-text)\">Heron's Formula:</strong><br>Area = √[s(s - a)(s - b)(s - c)] where s = (a + b + c)/2</div>\n                <div style=\"border-top:1px solid var(--color-border);padding-top:.5rem\"><strong style=\"color:var(--color-text)\">Law of Cosines:</strong><br>c² = a² + b² - 2ab·cos(γ)</div>\n                <div style=\"border-top:1px solid var(--color-border);padding-top:.5rem\"><strong style=\"color:var(--color-text)\">Law of Sines:</strong><br>a/sin(α) = b/sin(β) = c/sin(γ) = 2R",
    "guideHtml": "<h2 style=\"font-size:1.4rem;font-weight:700;margin-bottom:1rem\">Understanding Triangle Geometry</h2>\n          <p style=\"color:var(--color-text-muted);line-height:1.7;margin-bottom:1.5rem\">\n            A triangle is a fundamental three-sided polygon in Euclidean geometry. The sum of all interior angles always equals exactly 180 degrees (π radians). Depending on which three parameters are known, different geometric laws and trigonometric identities allow you to solve for all remaining sides, angles, and properties.\n          </p>\n\n          <div class=\"card\" style=\"cursor:default;margin-bottom:2rem;padding:1.25rem\">\n            <h3 style=\"font-size:1.1rem;font-weight:700;margin-bottom:.5rem\">Key Equations</h3>\n            <ul style=\"color:var(--color-text-muted);font-size:.875rem;line-height:1.8;padding-left:1.25rem\">\n              <li><strong>Sum of Angles:</strong> <code>α + β + γ = 180°</code></li>\n              <li><strong>Inradius (r):</strong> <code>r = Area / s</code></li>\n              <li><strong>Circumradius (R):</strong> <code>R = (a × b × c) / (4 × Area)</code></li>\n            </ul>\n          </div>\n\n          <h3 style=\"font-size:1.2rem;font-weight:700;margin-bottom:1rem\">Frequently Asked Questions</h3>\n          <div style=\"display:flex;flex-direction:column;gap:1rem\">\n            <div class=\"card\" style=\"cursor:default;padding:1rem\">\n              <h4 style=\"font-size:1rem;font-weight:600;margin-bottom:.35rem\">What is Heron's Formula?</h4>\n              <p style=\"font-size:.875rem;color:var(--color-text-muted);line-height:1.6\">Heron's formula allows calculating triangle area directly from three side lengths without requiring any angle or height measurement: Area = √[s(s - a)(s - b)(s - c)], where s is the semi-perimeter (a + b + c) / 2.</p>\n            </div>\n            <div class=\"card\" style=\"cursor:default;padding:1rem\">\n              <h4 style=\"font-size:1rem;font-weight:600;margin-bottom:.35rem\">What is the Triangle Inequality Theorem?</h4>\n              <p style=\"font-size:.875rem;color:var(--color-text-muted);line-height:1.6\">A triangle can only exist if the sum of any two sides is strictly greater than the third side: a + b &gt; c, a + c &gt; b, and b + c &gt; a.</p>\n            </div>\n          </div>",
    "faqs": [
      {
        "question": "What is Heron's Formula for triangle area?",
        "answer": "Heron's formula calculates the area of a triangle given the three side lengths a, b, and c: Area = √[s(s - a)(s - b)(s - c)], where s = (a + b + c) / 2 is the semi-perimeter."
      },
      {
        "question": "What is the Triangle Inequality Theorem?",
        "answer": "The Triangle Inequality Theorem states that for any valid triangle, the sum of lengths of any two sides must be strictly greater than the length of the remaining side (a + b > c, a + c > b, and b + c > a)."
      }
    ],
    "tags": [
      "triangle",
      "heron",
      "angles",
      "sss",
      "sas",
      "asa",
      "geometry",
      "inradius",
      "circumradius"
    ]
  },
  {
    "slug": "volume-calculator",
    "name": "Volume Calculator",
    "title": "Volume Calculator — Sphere, Cylinder, Cone, Prism & Cube | Mathlify",
    "description": "Calculate volume of spheres, cylinders, cones, rectangular prisms, cubes, and pyramids. Includes formulas, metric/imperial capacity conversions (litres, gallons).",
    "keywords": "volume calculator, sphere volume, cylinder volume, cone volume, cubic volume, liquid capacity calculator, litres, gallons",
    "category": "geometry",
    "icon": "🧊",
    "scriptName": "volume.js",
    "h1": "Volume Calculator",
    "pageDesc": "\n            Calculate the volume and liquid capacity of spheres, cylinders, cones, rectangular boxes, cubes, and pyramids.\n          ",
    "sidebarHtml": "<div>\n            <div class=\"card\" style=\"cursor:default;margin-bottom:1rem\">\n              <div class=\"card__title\">🧊 3D Volume Formulas</div>\n              <div style=\"margin-top:.75rem;display:flex;flex-direction:column;gap:.6rem;font-size:.875rem;color:var(--color-text-muted);line-height:1.5\">\n                <div><strong style=\"color:var(--color-text)\">Sphere:</strong> <code>V = ⁴⁄₃πr³</code></div>\n                <div style=\"border-top:1px solid var(--color-border);padding-top:.5rem\"><strong style=\"color:var(--color-text)\">Cylinder:</strong> <code>V = πr²h</code></div>\n                <div style=\"border-top:1px solid var(--color-border);padding-top:.5rem\"><strong style=\"color:var(--color-text)\">Cone:</strong> <code>V = ⅓πr²h</code></div>\n                <div style=\"border-top:1px solid var(--color-border);padding-top:.5rem\"><strong style=\"color:var(--color-text)\">Rectangular Prism:</strong> <code>V = l·w·h</code></div>\n                <div style=\"border-top:1px solid var(--color-border);padding-top:.5rem\"><strong style=\"color:var(--color-text)\">Cube:</strong> <code>V = s³</code>",
    "guideHtml": "<h2 style=\"font-size:1.4rem;font-weight:700;margin-bottom:1rem\">Understanding 3D Solid Volumes</h2>\n          <p style=\"color:var(--color-text-muted);line-height:1.7;margin-bottom:1.5rem\">\n            Volume is the three-dimensional quantity of space enclosed by a closed surface or geometric boundary. It is expressed in cubic units such as cubic meters (m³), cubic centimeters (cm³), or liquid capacity units like litres and gallons.\n          </p>\n\n          <h3 style=\"font-size:1.2rem;font-weight:700;margin-bottom:1rem\">Frequently Asked Questions</h3>\n          <div style=\"display:flex;flex-direction:column;gap:1rem\">\n            <div class=\"card\" style=\"cursor:default;padding:1rem\">\n              <h4 style=\"font-size:1rem;font-weight:600;margin-bottom:.35rem\">Why is a cone's volume exactly one-third of a cylinder's?</h4>\n              <p style=\"font-size:.875rem;color:var(--color-text-muted);line-height:1.6\">A cone and cylinder sharing the same base radius r and vertical height h have a volume ratio of exactly 1:3, proven by Cavalieri's Principle and integral calculus: V = ⅓πr²h.</p>\n            </div>\n          </div>",
    "faqs": [
      {
        "question": "What is the formula for the volume of a cylinder?",
        "answer": "The volume of a cylinder is given by V = πr²h, where r is the radius of the circular base and h is the height of the cylinder."
      },
      {
        "question": "How do you convert cubic centimeters to litres?",
        "answer": "1 Litre equals exactly 1,000 cubic centimeters (cm³) or 1,000 millilitres (mL). To convert cm³ to litres, divide by 1,000."
      }
    ],
    "tags": [
      "volume",
      "sphere",
      "cylinder",
      "cone",
      "cube",
      "prism",
      "pyramid",
      "capacity",
      "litres",
      "gallons",
      "geometry"
    ]
  }
];

export function getCalculatorBySlug(slug: string): CalculatorMeta | undefined {
  return CALCULATORS.find(c => c.slug === slug);
}

export function getCalculatorsByCategory(category: string): CalculatorMeta[] {
  return CALCULATORS.filter(c => c.category === category);
}
