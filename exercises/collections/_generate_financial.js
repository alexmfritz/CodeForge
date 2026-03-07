/**
 * Hard Math & Science — Section 7: Financial Math
 * 11 exercises (IDs 1167-1177): 2 T2, 5 T3, 3 T4, 1 T5
 *
 * Appends to the existing hard-math-science.json collection file.
 */

const fs = require('fs');
const path = require('path');

const COLLECTION_FILE = path.join(__dirname, 'hard-math-science.json');
const collection = JSON.parse(fs.readFileSync(COLLECTION_FILE, 'utf8'));

let nextId = 1167;
function id() { return nextId++; }

const exercises = [];

// ─── T2-1: Simple Interest ──────────────────────────────────────────────────
exercises.push({
  id: id(),
  title: "Financial: Simple Interest",
  type: "js",
  tier: 2,
  category: ["math", "financial"],
  tags: ["math", "financial", "interest", "basic"],
  description: "Calculate simple interest and total amount.",
  instructions: "Write a function called `simpleInterest` that takes `principal` ($), `rate` (annual, as decimal), and `years`, and returns an object with:\n- `interest`: P × r × t (rounded to 2 decimal places)\n- `total`: P + interest (rounded to 2 decimal places)\n\nExample:\n```\nsimpleInterest(1000, 0.05, 3)  // Returns: { interest: 150, total: 1150 }\n```",
  starterCode: "// Return simple interest and total amount\nfunction simpleInterest(principal, rate, years) {\n  \n}",
  solution: "function simpleInterest(principal, rate, years) {\n  const interest = Math.round(principal * rate * years * 100) / 100;\n  const total = Math.round((principal + interest) * 100) / 100;\n  return { interest, total };\n}",
  testRunner: `(code) => {
  const fn = new Function(code + '; return simpleInterest;')();
  const eq = (a, b) => JSON.stringify(a) === JSON.stringify(b);
  const results = [];
  results.push({ pass: eq(fn(1000, 0.05, 3), { interest: 150, total: 1150 }), description: '$1000 at 5% for 3 years', got: JSON.stringify(fn(1000, 0.05, 3)) });
  results.push({ pass: eq(fn(5000, 0.08, 1), { interest: 400, total: 5400 }), description: '$5000 at 8% for 1 year', got: JSON.stringify(fn(5000, 0.08, 1)) });
  results.push({ pass: eq(fn(10000, 0.03, 5), { interest: 1500, total: 11500 }), description: '$10000 at 3% for 5 years', got: JSON.stringify(fn(10000, 0.03, 5)) });
  results.push({ pass: eq(fn(500, 0.1, 0.5), { interest: 25, total: 525 }), description: '$500 at 10% for 6 months', got: JSON.stringify(fn(500, 0.1, 0.5)) });
  results.push({ pass: eq(fn(1000, 0, 10), { interest: 0, total: 1000 }), description: '0% rate gives no interest', got: JSON.stringify(fn(1000, 0, 10)) });
  return results;
}`,
  testCases: [],
  hints: [
    "Simple interest formula: I = P × r × t. Total = P + I.",
    "Multiply principal by rate by years for interest, then add principal for total."
  ],
  resources: [
    { label: "MDN: Math.round()", url: "/docs/mdn/math-round.html" }
  ],
  solutionGate: 10,
  basePoints: 25
});

// ─── T2-2: Compound Interest ────────────────────────────────────────────────
exercises.push({
  id: id(),
  title: "Financial: Compound Interest",
  type: "js",
  tier: 2,
  category: ["math", "financial"],
  tags: ["math", "financial", "compound-interest"],
  description: "Calculate compound interest with different compounding frequencies.",
  instructions: "Write a function called `compoundInterest` that takes `principal` ($), `rate` (annual, as decimal), `years`, and `n` (compounding frequency per year), and returns an object with:\n- `total`: P × (1 + r/n)^(nt) (rounded to 2 decimal places)\n- `interest`: total - principal (rounded to 2 decimal places)\n\nExample:\n```\ncompoundInterest(1000, 0.05, 3, 12)  // Returns: { total: 1161.47, interest: 161.47 }\n```",
  starterCode: "// Return compound interest total and earned interest\nfunction compoundInterest(principal, rate, years, n) {\n  \n}",
  solution: "function compoundInterest(principal, rate, years, n) {\n  const total = Math.round(principal * Math.pow(1 + rate / n, n * years) * 100) / 100;\n  const interest = Math.round((total - principal) * 100) / 100;\n  return { total, interest };\n}",
  testRunner: `(code) => {
  const fn = new Function(code + '; return compoundInterest;')();
  const eq = (a, b) => JSON.stringify(a) === JSON.stringify(b);
  const results = [];
  results.push({ pass: eq(fn(1000, 0.05, 3, 12), { total: 1161.47, interest: 161.47 }), description: '$1000 at 5% for 3yr monthly', got: JSON.stringify(fn(1000, 0.05, 3, 12)) });
  results.push({ pass: eq(fn(1000, 0.05, 3, 1), { total: 1157.63, interest: 157.63 }), description: '$1000 at 5% for 3yr annual', got: JSON.stringify(fn(1000, 0.05, 3, 1)) });
  results.push({ pass: eq(fn(5000, 0.1, 10, 4), { total: 13425.32, interest: 8425.32 }), description: '$5000 at 10% for 10yr quarterly', got: JSON.stringify(fn(5000, 0.1, 10, 4)) });
  results.push({ pass: fn(1000, 0.05, 3, 365).total === 1161.82, description: 'daily compounding', got: String(fn(1000, 0.05, 3, 365).total) });
  results.push({ pass: eq(fn(1000, 0, 5, 12), { total: 1000, interest: 0 }), description: '0% rate gives no growth', got: JSON.stringify(fn(1000, 0, 5, 12)) });
  return results;
}`,
  testCases: [],
  hints: [
    "Compound interest formula: A = P × (1 + r/n)^(nt). Interest earned is A - P.",
    "Use `Math.pow(1 + rate/n, n * years)` to compute the growth factor, then multiply by principal."
  ],
  resources: [
    { label: "MDN: Math.pow()", url: "/docs/mdn/math-pow.html" }
  ],
  solutionGate: 10,
  basePoints: 25
});

// ─── T3-1: Loan Amortization ────────────────────────────────────────────────
exercises.push({
  id: id(),
  title: "Financial: Loan Amortization",
  type: "js",
  tier: 3,
  category: ["math", "financial"],
  tags: ["math", "financial", "amortization", "loans"],
  description: "Calculate monthly payment and generate an amortization schedule.",
  instructions: "Write a function called `amortize` that takes `principal` ($), `annualRate` (as decimal), and `years`, and returns an object with:\n- `monthlyPayment`: rounded to 2 decimal places\n- `totalPaid`: rounded to 2 decimal places\n- `totalInterest`: rounded to 2 decimal places\n\nMonthly payment formula:\nM = P × r(1+r)^n / ((1+r)^n - 1)\nwhere r = annualRate/12, n = years × 12\n\nExample:\n```\namortize(200000, 0.06, 30)\n// Returns: { monthlyPayment: 1199.10, totalPaid: 431676, totalInterest: 231676 }\n```",
  starterCode: "function amortize(principal, annualRate, years) {\n  \n}",
  solution: "function amortize(principal, annualRate, years) {\n  const r = annualRate / 12;\n  const n = years * 12;\n  const monthlyPayment = Math.round(principal * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1) * 100) / 100;\n  const totalPaid = Math.round(monthlyPayment * n * 100) / 100;\n  const totalInterest = Math.round((totalPaid - principal) * 100) / 100;\n  return { monthlyPayment, totalPaid, totalInterest };\n}",
  testRunner: `(code) => {
  const fn = new Function(code + '; return amortize;')();
  const results = [];
  const r1 = fn(200000, 0.06, 30);
  results.push({ pass: r1.monthlyPayment === 1199.10, description: '$200k at 6% for 30yr: $1199.10/mo', got: String(r1.monthlyPayment) });
  results.push({ pass: r1.totalPaid === 431676, description: 'total paid: $431,676', got: String(r1.totalPaid) });
  results.push({ pass: r1.totalInterest === 231676, description: 'total interest: $231,676', got: String(r1.totalInterest) });
  const r2 = fn(10000, 0.05, 5);
  results.push({ pass: r2.monthlyPayment === 188.71, description: '$10k at 5% for 5yr', got: String(r2.monthlyPayment) });
  const r3 = fn(300000, 0.04, 15);
  results.push({ pass: r3.monthlyPayment === 2219.06, description: '$300k at 4% for 15yr', got: String(r3.monthlyPayment) });
  return results;
}`,
  testCases: [],
  hints: [
    "The monthly payment formula uses the monthly rate (annual/12) and total months (years×12).",
    "Compute `r = annualRate/12`, `n = years*12`, then `M = P * r * (1+r)^n / ((1+r)^n - 1)`."
  ],
  resources: [
    { label: "MDN: Math.pow()", url: "/docs/mdn/math-pow.html" }
  ],
  solutionGate: 10,
  basePoints: 50
});

// ─── T3-2: Present Value ────────────────────────────────────────────────────
exercises.push({
  id: id(),
  title: "Financial: Present Value",
  type: "js",
  tier: 3,
  category: ["math", "financial"],
  tags: ["math", "financial", "present-value", "time-value-of-money"],
  description: "Calculate the present value of a future cash flow or annuity.",
  instructions: "Write a function called `presentValue` that takes a `type` ('single' or 'annuity'), `futureValue` or `payment`, `rate` (per period, as decimal), and `periods`, and returns the present value, rounded to 2 decimal places.\n\nFormulas:\n- Single: PV = FV / (1 + r)^n\n- Annuity: PV = PMT × (1 - (1 + r)^(-n)) / r\n\nExample:\n```\npresentValue('single', 10000, 0.05, 10)  // Returns: 6139.13\npresentValue('annuity', 1000, 0.05, 10)  // Returns: 7721.73\n```",
  starterCode: "function presentValue(type, amount, rate, periods) {\n  \n}",
  solution: "function presentValue(type, amount, rate, periods) {\n  if (type === 'single') {\n    return Math.round(amount / Math.pow(1 + rate, periods) * 100) / 100;\n  }\n  return Math.round(amount * (1 - Math.pow(1 + rate, -periods)) / rate * 100) / 100;\n}",
  testRunner: `(code) => {
  const fn = new Function(code + '; return presentValue;')();
  const results = [];
  results.push({ pass: fn('single', 10000, 0.05, 10) === 6139.13, description: 'PV of $10k in 10yr at 5%', got: String(fn('single', 10000, 0.05, 10)) });
  results.push({ pass: fn('annuity', 1000, 0.05, 10) === 7721.73, description: 'PV of $1k annuity for 10yr at 5%', got: String(fn('annuity', 1000, 0.05, 10)) });
  results.push({ pass: fn('single', 5000, 0.1, 5) === 3104.61, description: 'PV of $5k in 5yr at 10%', got: String(fn('single', 5000, 0.1, 5)) });
  results.push({ pass: fn('single', 1000, 0, 10) === 1000, description: '0% rate: PV equals FV', got: String(fn('single', 1000, 0, 10)) });
  results.push({ pass: fn('annuity', 500, 0.03, 20) === 7438.74, description: '$500 annuity for 20yr at 3%', got: String(fn('annuity', 500, 0.03, 20)) });
  return results;
}`,
  testCases: [],
  hints: [
    "For a single payment, discount back: PV = FV / (1+r)^n. For an annuity, use the annuity PV formula.",
    "Use `Math.pow(1 + rate, periods)` for single, or `Math.pow(1 + rate, -periods)` for the annuity formula."
  ],
  resources: [
    { label: "MDN: Math.pow()", url: "/docs/mdn/math-pow.html" }
  ],
  solutionGate: 10,
  basePoints: 50
});

// ─── T3-3: Break-Even Analysis ──────────────────────────────────────────────
exercises.push({
  id: id(),
  title: "Financial: Break-Even Analysis",
  type: "js",
  tier: 3,
  category: ["math", "financial"],
  tags: ["math", "financial", "break-even", "business"],
  description: "Calculate the break-even point for a business.",
  instructions: "Write a function called `breakEven` that takes `fixedCosts` ($), `variableCostPerUnit` ($), and `pricePerUnit` ($), and returns an object with:\n- `units`: number of units to break even (rounded up to nearest integer)\n- `revenue`: break-even revenue (units × price, rounded to 2 decimal places)\n- `contributionMargin`: price - variable cost per unit (rounded to 2 decimal places)\n\nBreak-even units = Fixed Costs / (Price - Variable Cost)\n\nExample:\n```\nbreakEven(10000, 5, 25)\n// Returns: { units: 500, revenue: 12500, contributionMargin: 20 }\n```",
  starterCode: "function breakEven(fixedCosts, variableCostPerUnit, pricePerUnit) {\n  \n}",
  solution: "function breakEven(fixedCosts, variableCostPerUnit, pricePerUnit) {\n  const contributionMargin = Math.round((pricePerUnit - variableCostPerUnit) * 100) / 100;\n  const units = Math.ceil(fixedCosts / contributionMargin);\n  const revenue = Math.round(units * pricePerUnit * 100) / 100;\n  return { units, revenue, contributionMargin };\n}",
  testRunner: `(code) => {
  const fn = new Function(code + '; return breakEven;')();
  const eq = (a, b) => JSON.stringify(a) === JSON.stringify(b);
  const results = [];
  results.push({ pass: eq(fn(10000, 5, 25), { units: 500, revenue: 12500, contributionMargin: 20 }), description: '$10k fixed, $5 var, $25 price', got: JSON.stringify(fn(10000, 5, 25)) });
  results.push({ pass: eq(fn(50000, 10, 30), { units: 2500, revenue: 75000, contributionMargin: 20 }), description: '$50k fixed, $10 var, $30 price', got: JSON.stringify(fn(50000, 10, 30)) });
  const r3 = fn(1000, 3, 10);
  results.push({ pass: r3.units === 143 && r3.contributionMargin === 7, description: 'rounds up fractional units', got: JSON.stringify(r3) });
  results.push({ pass: fn(0, 5, 10).units === 0, description: 'no fixed costs: 0 units', got: String(fn(0, 5, 10).units) });
  results.push({ pass: fn(5000, 0, 50).units === 100, description: 'no variable costs', got: String(fn(5000, 0, 50).units) });
  return results;
}`,
  testCases: [],
  hints: [
    "Contribution margin = price - variable cost. Break-even units = fixed costs / contribution margin.",
    "Use `Math.ceil()` to round up since you can't sell a fraction of a unit."
  ],
  resources: [
    { label: "MDN: Math.ceil()", url: "/docs/mdn/math-ceil.html" }
  ],
  solutionGate: 10,
  basePoints: 50
});

// ─── T3-4: Currency Exchange ────────────────────────────────────────────────
exercises.push({
  id: id(),
  title: "Financial: Currency Exchange",
  type: "js",
  tier: 3,
  category: ["math", "financial"],
  tags: ["math", "financial", "currency", "exchange-rates"],
  description: "Convert between currencies using exchange rate chains.",
  instructions: "Write a function called `exchangeRate` that takes a `rates` object (mapping 'FROM-TO' to rates), a `from` currency, a `to` currency, and an `amount`, and returns the converted amount rounded to 2 decimal places.\n\nIf a direct rate doesn't exist, try to find a two-step conversion through USD.\n\nExample:\n```\nconst rates = { 'USD-EUR': 0.85, 'USD-GBP': 0.73, 'EUR-USD': 1.18, 'GBP-USD': 1.37 };\nexchangeRate(rates, 'USD', 'EUR', 100)  // Returns: 85\nexchangeRate(rates, 'EUR', 'GBP', 100) // Returns: 86.14 (EUR→USD→GBP)\n```",
  starterCode: "function exchangeRate(rates, from, to, amount) {\n  \n}",
  solution: "function exchangeRate(rates, from, to, amount) {\n  if (from === to) return amount;\n  const key = from + '-' + to;\n  if (rates[key]) {\n    return Math.round(amount * rates[key] * 100) / 100;\n  }\n  // Try through USD\n  const toUSD = rates[from + '-USD'];\n  const fromUSD = rates['USD-' + to];\n  if (toUSD && fromUSD) {\n    return Math.round(amount * toUSD * fromUSD * 100) / 100;\n  }\n  return null;\n}",
  testRunner: `(code) => {
  const fn = new Function(code + '; return exchangeRate;')();
  const rates = { 'USD-EUR': 0.85, 'USD-GBP': 0.73, 'EUR-USD': 1.18, 'GBP-USD': 1.37 };
  const results = [];
  results.push({ pass: fn(rates, 'USD', 'EUR', 100) === 85, description: 'USD to EUR: 100 × 0.85', got: String(fn(rates, 'USD', 'EUR', 100)) });
  results.push({ pass: fn(rates, 'EUR', 'GBP', 100) === 86.14, description: 'EUR→USD→GBP chain conversion', got: String(fn(rates, 'EUR', 'GBP', 100)) });
  results.push({ pass: fn(rates, 'USD', 'USD', 500) === 500, description: 'same currency returns same amount', got: String(fn(rates, 'USD', 'USD', 500)) });
  results.push({ pass: fn(rates, 'GBP', 'EUR', 200) === 232.90, description: 'GBP→USD→EUR', got: String(fn(rates, 'GBP', 'EUR', 200)) });
  results.push({ pass: fn(rates, 'EUR', 'USD', 50) === 59, description: 'EUR to USD direct', got: String(fn(rates, 'EUR', 'USD', 50)) });
  return results;
}`,
  testCases: [],
  hints: [
    "First check if a direct rate exists. If not, try converting through USD as an intermediate currency.",
    "Build the key as `from + '-' + to`. For indirect conversion, find `from-USD` and `USD-to` rates and multiply them."
  ],
  resources: [
    { label: "MDN: Object property accessors", url: "/docs/mdn/property-accessors.html" }
  ],
  solutionGate: 10,
  basePoints: 50
});

// ─── T3-5: ROI Calculator ──────────────────────────────────────────────────
exercises.push({
  id: id(),
  title: "Financial: Investment Returns",
  type: "js",
  tier: 3,
  category: ["math", "financial"],
  tags: ["math", "financial", "roi", "investment"],
  description: "Calculate return on investment and annualized returns.",
  instructions: "Write a function called `investmentReturns` that takes `initialInvestment` ($), `finalValue` ($), and `years`, and returns an object with:\n- `roi`: (final - initial) / initial × 100 (%, rounded to 2 decimal places)\n- `annualizedReturn`: ((final/initial)^(1/years) - 1) × 100 (%, rounded to 2 decimal places)\n- `profit`: final - initial (rounded to 2 decimal places)\n\nExample:\n```\ninvestmentReturns(10000, 15000, 3)\n// Returns: { roi: 50, annualizedReturn: 14.47, profit: 5000 }\n```",
  starterCode: "function investmentReturns(initialInvestment, finalValue, years) {\n  \n}",
  solution: "function investmentReturns(initialInvestment, finalValue, years) {\n  const profit = Math.round((finalValue - initialInvestment) * 100) / 100;\n  const roi = Math.round((profit / initialInvestment) * 100 * 100) / 100;\n  const annualizedReturn = Math.round((Math.pow(finalValue / initialInvestment, 1 / years) - 1) * 100 * 100) / 100;\n  return { roi, annualizedReturn, profit };\n}",
  testRunner: `(code) => {
  const fn = new Function(code + '; return investmentReturns;')();
  const eq = (a, b) => JSON.stringify(a) === JSON.stringify(b);
  const results = [];
  results.push({ pass: eq(fn(10000, 15000, 3), { roi: 50, annualizedReturn: 14.47, profit: 5000 }), description: '$10k→$15k in 3yr', got: JSON.stringify(fn(10000, 15000, 3)) });
  results.push({ pass: eq(fn(1000, 2000, 10), { roi: 100, annualizedReturn: 7.18, profit: 1000 }), description: 'doubling in 10 years', got: JSON.stringify(fn(1000, 2000, 10)) });
  results.push({ pass: fn(5000, 4000, 2).roi === -20, description: 'loss gives negative ROI', got: String(fn(5000, 4000, 2).roi) });
  results.push({ pass: fn(1000, 1000, 5).roi === 0, description: 'no change = 0% ROI', got: String(fn(1000, 1000, 5).roi) });
  results.push({ pass: fn(100, 200, 1).annualizedReturn === 100, description: '100% gain in 1yr = 100% annual', got: String(fn(100, 200, 1).annualizedReturn) });
  return results;
}`,
  testCases: [],
  hints: [
    "ROI = (gain / initial) × 100. Annualized return = ((final/initial)^(1/years) - 1) × 100.",
    "Use `Math.pow(finalValue / initialInvestment, 1 / years)` for the annualized growth factor."
  ],
  resources: [
    { label: "MDN: Math.pow()", url: "/docs/mdn/math-pow.html" }
  ],
  solutionGate: 10,
  basePoints: 50
});

// ─── T4-1: Bond Pricing ────────────────────────────────────────────────────
exercises.push({
  id: id(),
  title: "Financial: Bond Pricing",
  type: "js",
  tier: 4,
  category: ["math", "financial"],
  tags: ["math", "financial", "bonds", "present-value"],
  description: "Calculate the fair price of a bond using present value of cash flows.",
  instructions: "Write a function called `bondPrice` that takes `faceValue` ($), `couponRate` (annual, as decimal), `yearsToMaturity`, and `yieldRate` (market yield, as decimal), and returns the bond price, rounded to 2 decimal places.\n\nBond price = PV of coupon payments + PV of face value\n= C × (1 - (1+y)^(-n)) / y + F / (1+y)^n\n\nwhere C = couponRate × faceValue (annual coupon), y = yieldRate, n = years.\n\nExample:\n```\nbondPrice(1000, 0.05, 10, 0.04)  // Returns: 1081.11 (premium)\nbondPrice(1000, 0.05, 10, 0.06)  // Returns: 926.4 (discount)\n```",
  starterCode: "",
  solution: "function bondPrice(faceValue, couponRate, yearsToMaturity, yieldRate) {\n  const coupon = couponRate * faceValue;\n  const pvCoupons = coupon * (1 - Math.pow(1 + yieldRate, -yearsToMaturity)) / yieldRate;\n  const pvFace = faceValue / Math.pow(1 + yieldRate, yearsToMaturity);\n  return Math.round((pvCoupons + pvFace) * 100) / 100;\n}",
  testRunner: `(code) => {
  const fn = new Function(code + '; return bondPrice;')();
  const results = [];
  results.push({ pass: fn(1000, 0.05, 10, 0.04) === 1081.11, description: 'premium bond (coupon > yield)', got: String(fn(1000, 0.05, 10, 0.04)) });
  results.push({ pass: fn(1000, 0.05, 10, 0.06) === 926.4, description: 'discount bond (coupon < yield)', got: String(fn(1000, 0.05, 10, 0.06)) });
  results.push({ pass: fn(1000, 0.05, 10, 0.05) === 1000, description: 'par bond (coupon = yield)', got: String(fn(1000, 0.05, 10, 0.05)) });
  results.push({ pass: fn(1000, 0.08, 5, 0.06) === 1084.25, description: '$1000 8% bond, 5yr, 6% yield', got: String(fn(1000, 0.08, 5, 0.06)) });
  results.push({ pass: fn(5000, 0.03, 20, 0.04) === 4320.48, description: '$5000 3% bond, 20yr, 4% yield', got: String(fn(5000, 0.03, 20, 0.04)) });
  return results;
}`,
  testCases: [],
  hints: [
    "A bond price is the sum of the PV of all future coupon payments (annuity) plus the PV of the face value (single payment).",
    "PV of coupons = C × (1 - (1+y)^(-n)) / y. PV of face = F / (1+y)^n. Add them together."
  ],
  resources: [
    { label: "MDN: Math.pow()", url: "/docs/mdn/math-pow.html" }
  ],
  solutionGate: 10,
  basePoints: 75
});

// ─── T4-2: Depreciation Methods ────────────────────────────────────────────
exercises.push({
  id: id(),
  title: "Financial: Depreciation",
  type: "js",
  tier: 4,
  category: ["math", "financial"],
  tags: ["math", "financial", "depreciation", "accounting"],
  description: "Calculate asset depreciation using different methods.",
  instructions: "Write a function called `depreciation` that takes `cost` ($), `salvage` ($), `life` (years), and `method` ('straight-line', 'double-declining', or 'sum-of-years'), and returns an array of yearly depreciation amounts, each rounded to 2 decimal places.\n\nFormulas:\n- Straight-line: (cost - salvage) / life each year\n- Double-declining: rate = 2/life, yearly = bookValue × rate (book value never drops below salvage)\n- Sum-of-years: yearly = (cost - salvage) × remainingYears / sumOfYears\n\nExample:\n```\ndepreciation(10000, 2000, 4, 'straight-line')\n// Returns: [2000, 2000, 2000, 2000]\n```",
  starterCode: "",
  solution: `function depreciation(cost, salvage, life, method) {
  const r2 = v => Math.round(v * 100) / 100;
  if (method === 'straight-line') {
    const annual = r2((cost - salvage) / life);
    return new Array(life).fill(annual);
  }
  if (method === 'double-declining') {
    const rate = 2 / life;
    const result = [];
    let bookValue = cost;
    for (let i = 0; i < life; i++) {
      let dep = r2(bookValue * rate);
      if (bookValue - dep < salvage) dep = r2(bookValue - salvage);
      if (dep < 0) dep = 0;
      result.push(dep);
      bookValue -= dep;
    }
    return result;
  }
  // sum-of-years
  const sumYears = life * (life + 1) / 2;
  const depreciable = cost - salvage;
  const result = [];
  for (let i = 0; i < life; i++) {
    result.push(r2(depreciable * (life - i) / sumYears));
  }
  return result;
}`,
  testRunner: `(code) => {
  const fn = new Function(code + '; return depreciation;')();
  const eq = (a, b) => JSON.stringify(a) === JSON.stringify(b);
  const results = [];
  results.push({ pass: eq(fn(10000, 2000, 4, 'straight-line'), [2000, 2000, 2000, 2000]), description: 'straight-line: equal amounts', got: JSON.stringify(fn(10000, 2000, 4, 'straight-line')) });
  const dd = fn(10000, 2000, 4, 'double-declining');
  results.push({ pass: dd[0] === 5000, description: 'double-declining: year 1 = 50%', got: String(dd[0]) });
  results.push({ pass: dd[0] > dd[1], description: 'double-declining decreases', got: JSON.stringify(dd) });
  const soy = fn(10000, 2000, 4, 'sum-of-years');
  results.push({ pass: soy[0] === 3200 && soy[3] === 800, description: 'sum-of-years: 3200, then decreasing to 800', got: JSON.stringify(soy) });
  results.push({ pass: Math.abs(soy.reduce((a,b) => a+b, 0) - 8000) < 0.1, description: 'sum-of-years totals to depreciable amount', got: String(soy.reduce((a,b) => a+b, 0)) });
  const sl5 = fn(5000, 500, 5, 'straight-line');
  results.push({ pass: sl5.length === 5 && sl5[0] === 900, description: '$5000 asset, $500 salvage, 5yr SL', got: JSON.stringify(sl5) });
  return results;
}`,
  testCases: [],
  hints: [
    "Straight-line divides evenly. Double-declining applies 2/life rate to the remaining book value. Sum-of-years weights early years more heavily.",
    "For double-declining, track book value and cap depreciation so book value never drops below salvage. Sum of years digits: n×(n+1)/2."
  ],
  resources: [
    { label: "MDN: Array.prototype.fill()", url: "/docs/mdn/array-fill.html" }
  ],
  solutionGate: 10,
  basePoints: 75
});

// ─── T4-3: Net Present Value ────────────────────────────────────────────────
exercises.push({
  id: id(),
  title: "Financial: NPV and IRR",
  type: "js",
  tier: 4,
  category: ["math", "financial"],
  tags: ["math", "financial", "npv", "irr", "investment"],
  description: "Calculate Net Present Value and approximate Internal Rate of Return.",
  instructions: "Build two functions:\n\n**`npv(rate, cashFlows)`** — Returns the NPV of a series of cash flows (first element is the initial investment, typically negative), rounded to 2 decimal places.\n\nNPV = Σ CFt / (1 + r)^t  for t = 0, 1, 2, ...\n\n**`irr(cashFlows)`** — Returns the Internal Rate of Return (the rate where NPV = 0), rounded to 4 decimal places. Use binary search between -0.5 and 2.0.\n\nExample:\n```\nnpv(0.1, [-1000, 300, 400, 500, 200])  // Returns: 115.57\nirr([-1000, 300, 400, 500, 200])        // Returns: 0.1532\n```",
  starterCode: "",
  solution: `function npv(rate, cashFlows) {
  let total = 0;
  for (let t = 0; t < cashFlows.length; t++) {
    total += cashFlows[t] / Math.pow(1 + rate, t);
  }
  return Math.round(total * 100) / 100;
}

function irr(cashFlows) {
  let lo = -0.5, hi = 2.0;
  for (let i = 0; i < 100; i++) {
    const mid = (lo + hi) / 2;
    let npvVal = 0;
    for (let t = 0; t < cashFlows.length; t++) {
      npvVal += cashFlows[t] / Math.pow(1 + mid, t);
    }
    if (npvVal > 0) lo = mid;
    else hi = mid;
  }
  return Math.round((lo + hi) / 2 * 10000) / 10000;
}`,
  testRunner: `(code) => {
  const fn = new Function(code + '; return { npv, irr };')();
  const results = [];
  results.push({ pass: fn.npv(0.1, [-1000, 300, 400, 500, 200]) === 115.57, description: 'NPV at 10% discount', got: String(fn.npv(0.1, [-1000, 300, 400, 500, 200])) });
  results.push({ pass: fn.npv(0.05, [-500, 200, 200, 200]) === 44.65, description: 'NPV of smaller project at 5%', got: String(fn.npv(0.05, [-500, 200, 200, 200])) });
  results.push({ pass: fn.npv(0, [-100, 50, 50, 50]) === 50, description: '0% rate: simple sum', got: String(fn.npv(0, [-100, 50, 50, 50])) });
  const irrVal = fn.irr([-1000, 300, 400, 500, 200]);
  results.push({ pass: Math.abs(irrVal - 0.1532) < 0.001, description: 'IRR ≈ 15.32%', got: String(irrVal) });
  const irr2 = fn.irr([-500, 200, 200, 200]);
  results.push({ pass: Math.abs(irr2 - 0.097) < 0.001, description: 'IRR of smaller project ≈ 9.7%', got: String(irr2) });
  // NPV at IRR should be ~0
  const irrRate = fn.irr([-1000, 300, 400, 500, 200]);
  results.push({ pass: Math.abs(fn.npv(irrRate, [-1000, 300, 400, 500, 200])) < 1, description: 'NPV at IRR ≈ 0', got: String(fn.npv(irrRate, [-1000, 300, 400, 500, 200])) });
  return results;
}`,
  testCases: [],
  hints: [
    "NPV sums each cash flow discounted by (1+r)^t. IRR is the rate that makes NPV = 0.",
    "For IRR, binary search between -0.5 and 2.0. At each midpoint, compute NPV. If NPV > 0, increase rate; if < 0, decrease."
  ],
  resources: [
    { label: "MDN: Math.pow()", url: "/docs/mdn/math-pow.html" }
  ],
  solutionGate: 10,
  basePoints: 75
});

// ─── T5-1: Financial Portfolio Analyzer ─────────────────────────────────────
exercises.push({
  id: id(),
  title: "Financial: Portfolio Analyzer",
  type: "js",
  tier: 5,
  category: ["math", "financial"],
  tags: ["math", "financial", "portfolio", "risk", "comprehensive"],
  description: "Build a comprehensive portfolio analysis toolkit.",
  instructions: "Build two functions:\n\n**`portfolioReturn(assets)`** — Takes an array of `{ weight, returns }` objects where `weight` is the portfolio allocation (decimal, sums to 1) and `returns` is an array of periodic returns (decimals). Returns:\n- `weightedReturn`: weighted average of mean returns × 100 (%, rounded to 2 decimal places)\n- `portfolioStdDev`: weighted portfolio standard deviation × 100 (%, rounded to 2 decimal places)\n- `sharpeRatio`: (weightedReturn - riskFreeRate) / portfolioStdDev where riskFreeRate = 2% (rounded to 2 decimal places)\n\n**`monteCarlo(initialValue, meanReturn, stdDev, years, simulations)`** — Runs Monte Carlo simulations of portfolio growth. Returns:\n- `median`: median final value across simulations (rounded to 0 decimal places)\n- `percentile5`: 5th percentile (worst-case, rounded to 0)\n- `percentile95`: 95th percentile (best-case, rounded to 0)\n\nUse `Math.random()` for random normal generation via Box-Muller transform:\nz = √(-2 × ln(u₁)) × cos(2πu₂)\n\nExample:\n```\nportfolioReturn([{ weight: 0.6, returns: [0.1, 0.05, -0.02] }, { weight: 0.4, returns: [0.03, 0.04, 0.02] }])\n```",
  starterCode: "",
  solution: `function portfolioReturn(assets) {
  // Mean return for each asset
  const means = assets.map(a => a.returns.reduce((s, r) => s + r, 0) / a.returns.length);
  const weightedReturn = Math.round(assets.reduce((s, a, i) => s + a.weight * means[i], 0) * 100 * 100) / 100;

  // Portfolio standard deviation (simplified: weighted stddev)
  const stdDevs = assets.map((a, i) => {
    const variance = a.returns.reduce((s, r) => s + (r - means[i]) ** 2, 0) / a.returns.length;
    return Math.sqrt(variance);
  });
  const portfolioVar = assets.reduce((s, a, i) => s + (a.weight * stdDevs[i]) ** 2, 0);
  const portfolioStdDev = Math.round(Math.sqrt(portfolioVar) * 100 * 100) / 100;

  const riskFree = 2;
  const sharpeRatio = portfolioStdDev === 0 ? 0 : Math.round((weightedReturn - riskFree) / portfolioStdDev * 100) / 100;

  return { weightedReturn, portfolioStdDev, sharpeRatio };
}

function monteCarlo(initialValue, meanReturn, stdDev, years, simulations) {
  // Seed random for reproducibility isn't possible with Math.random
  // but we'll run enough simulations for convergence
  const finalValues = [];
  for (let s = 0; s < simulations; s++) {
    let value = initialValue;
    for (let y = 0; y < years; y++) {
      // Box-Muller transform
      const u1 = Math.random();
      const u2 = Math.random();
      const z = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
      const yearReturn = meanReturn + stdDev * z;
      value *= (1 + yearReturn);
    }
    finalValues.push(value);
  }
  finalValues.sort((a, b) => a - b);
  const pctile = (arr, p) => {
    const idx = Math.floor(p / 100 * arr.length);
    return arr[Math.min(idx, arr.length - 1)];
  };
  return {
    median: Math.round(pctile(finalValues, 50)),
    percentile5: Math.round(pctile(finalValues, 5)),
    percentile95: Math.round(pctile(finalValues, 95))
  };
}`,
  testRunner: `(code) => {
  const fn = new Function(code + '; return { portfolioReturn, monteCarlo };')();
  const results = [];
  const pr = fn.portfolioReturn([
    { weight: 0.6, returns: [0.1, 0.05, -0.02] },
    { weight: 0.4, returns: [0.03, 0.04, 0.02] }
  ]);
  results.push({ pass: typeof pr.weightedReturn === 'number', description: 'portfolioReturn returns weightedReturn', got: typeof pr.weightedReturn });
  results.push({ pass: typeof pr.portfolioStdDev === 'number', description: 'portfolioReturn returns portfolioStdDev', got: typeof pr.portfolioStdDev });
  results.push({ pass: typeof pr.sharpeRatio === 'number', description: 'portfolioReturn returns sharpeRatio', got: typeof pr.sharpeRatio });

  // Single asset with known returns
  const pr2 = fn.portfolioReturn([{ weight: 1, returns: [0.1, 0.1, 0.1] }]);
  results.push({ pass: pr2.weightedReturn === 10, description: 'single asset 10% constant return', got: String(pr2.weightedReturn) });
  results.push({ pass: pr2.portfolioStdDev === 0, description: 'zero std dev for constant returns', got: String(pr2.portfolioStdDev) });

  // Monte Carlo basic checks
  const mc = fn.monteCarlo(10000, 0.07, 0.15, 10, 1000);
  results.push({ pass: mc.median > 0, description: 'Monte Carlo median is positive', got: String(mc.median) });
  results.push({ pass: mc.percentile5 < mc.median, description: '5th percentile < median', got: mc.percentile5 + ' < ' + mc.median });
  results.push({ pass: mc.percentile95 > mc.median, description: '95th percentile > median', got: mc.percentile95 + ' > ' + mc.median });
  return results;
}`,
  testCases: [],
  hints: [
    "For portfolio return, compute each asset's mean return, then weight-average them. For std dev, weight each asset's individual standard deviation.",
    "Monte Carlo: for each simulation, loop through years applying random returns (Box-Muller for normal distribution). Sort final values to get percentiles."
  ],
  resources: [
    { label: "MDN: Math.random()", url: "/docs/mdn/math-random.html" },
    { label: "MDN: Math.log()", url: "/docs/mdn/math-log.html" }
  ],
  solutionGate: 10,
  basePoints: 100
});

// ── append to collection ────────────────────────────────────────────────────

collection.exercises.push(...exercises);
fs.writeFileSync(COLLECTION_FILE, JSON.stringify(collection, null, 2));
console.log(`✅ Section 7: Financial Math — ${exercises.length} exercises appended (IDs ${exercises[0].id}-${exercises[exercises.length - 1].id})`);
console.log(`   Collection total: ${collection.exercises.length} exercises`);
