/**
 * Hard Math & Science — Section 8: Capstones
 * 5 exercises (IDs 1178-1182): 2 T4, 3 T5
 *
 * Cross-domain exercises that combine concepts from multiple sections.
 * Appends to the existing hard-math-science.json collection file.
 */

const fs = require('fs');
const path = require('path');

const COLLECTION_FILE = path.join(__dirname, 'hard-math-science.json');
const collection = JSON.parse(fs.readFileSync(COLLECTION_FILE, 'utf8'));

let nextId = 1178;
function id() { return nextId++; }

const exercises = [];

// ─── T4-1: Matrix Operations ────────────────────────────────────────────────
exercises.push({
  id: id(),
  title: "Capstone: Matrix Operations",
  type: "js",
  tier: 4,
  category: ["math", "capstone"],
  tags: ["math", "matrices", "linear-algebra", "capstone"],
  description: "Implement core matrix operations: addition, multiplication, transpose, and determinant.",
  instructions: "Build four functions:\n\n**`matAdd(a, b)`** — Add two matrices (2D arrays). Return the sum matrix.\n\n**`matMul(a, b)`** — Multiply two matrices. a is m×n, b is n×p. Return the m×p product.\n\n**`transpose(m)`** — Return the transpose of a matrix.\n\n**`determinant(m)`** — Return the determinant of a square matrix (up to 4×4). Use cofactor expansion.\n\nAll numeric values rounded to 4 decimal places.\n\nExample:\n```\nmatAdd([[1, 2], [3, 4]], [[5, 6], [7, 8]])  // Returns: [[6, 8], [10, 12]]\ndeterminant([[1, 2], [3, 4]])                // Returns: -2\n```",
  starterCode: "",
  solution: `function matAdd(a, b) {
  return a.map((row, i) => row.map((v, j) => Math.round((v + b[i][j]) * 10000) / 10000));
}

function matMul(a, b) {
  const rows = a.length, cols = b[0].length, inner = b.length;
  const result = [];
  for (let i = 0; i < rows; i++) {
    result[i] = [];
    for (let j = 0; j < cols; j++) {
      let sum = 0;
      for (let k = 0; k < inner; k++) sum += a[i][k] * b[k][j];
      result[i][j] = Math.round(sum * 10000) / 10000;
    }
  }
  return result;
}

function transpose(m) {
  return m[0].map((_, j) => m.map(row => row[j]));
}

function determinant(m) {
  const n = m.length;
  if (n === 1) return m[0][0];
  if (n === 2) return Math.round((m[0][0] * m[1][1] - m[0][1] * m[1][0]) * 10000) / 10000;
  let det = 0;
  for (let j = 0; j < n; j++) {
    const minor = m.slice(1).map(row => [...row.slice(0, j), ...row.slice(j + 1)]);
    det += (j % 2 === 0 ? 1 : -1) * m[0][j] * determinant(minor);
  }
  return Math.round(det * 10000) / 10000;
}`,
  testRunner: `(code) => {
  const fn = new Function(code + '; return { matAdd, matMul, transpose, determinant };')();
  const eq = (a, b) => JSON.stringify(a) === JSON.stringify(b);
  const results = [];
  results.push({ pass: eq(fn.matAdd([[1, 2], [3, 4]], [[5, 6], [7, 8]]), [[6, 8], [10, 12]]), description: 'matrix addition', got: JSON.stringify(fn.matAdd([[1, 2], [3, 4]], [[5, 6], [7, 8]])) });
  results.push({ pass: eq(fn.matMul([[1, 2], [3, 4]], [[5, 6], [7, 8]]), [[19, 22], [43, 50]]), description: 'matrix multiplication 2x2', got: JSON.stringify(fn.matMul([[1, 2], [3, 4]], [[5, 6], [7, 8]])) });
  results.push({ pass: eq(fn.matMul([[1, 2, 3]], [[4], [5], [6]]), [[32]]), description: '1x3 × 3x1 = 1x1', got: JSON.stringify(fn.matMul([[1, 2, 3]], [[4], [5], [6]])) });
  results.push({ pass: eq(fn.transpose([[1, 2, 3], [4, 5, 6]]), [[1, 4], [2, 5], [3, 6]]), description: 'transpose 2x3 → 3x2', got: JSON.stringify(fn.transpose([[1, 2, 3], [4, 5, 6]])) });
  results.push({ pass: fn.determinant([[1, 2], [3, 4]]) === -2, description: 'det of 2x2', got: String(fn.determinant([[1, 2], [3, 4]])) });
  results.push({ pass: fn.determinant([[1, 2, 3], [4, 5, 6], [7, 8, 9]]) === 0, description: 'det of singular 3x3 = 0', got: String(fn.determinant([[1, 2, 3], [4, 5, 6], [7, 8, 9]])) });
  results.push({ pass: fn.determinant([[2, 1, 3], [1, 0, 2], [3, 2, 1]]) === 3, description: 'det of 3x3 = 3', got: String(fn.determinant([[2, 1, 3], [1, 0, 2], [3, 2, 1]])) });
  return results;
}`,
  testCases: [],
  hints: [
    "Matrix addition is element-wise. Multiplication uses the dot product of rows and columns. Transpose swaps rows and columns.",
    "For the determinant, use cofactor expansion along the first row. The minor is the matrix with row 0 and column j removed."
  ],
  resources: [
    { label: "MDN: Array.prototype.map()", url: "/docs/mdn/array-map.html" },
    { label: "MDN: Array.prototype.slice()", url: "/docs/mdn/array-slice.html" }
  ],
  solutionGate: 10,
  basePoints: 75
});

// ─── T4-2: Unit Conversion Engine ───────────────────────────────────────────
exercises.push({
  id: id(),
  title: "Capstone: Unit Conversion Engine",
  type: "js",
  tier: 4,
  category: ["math", "capstone"],
  tags: ["math", "science", "unit-conversion", "capstone"],
  description: "Build a flexible unit conversion engine that handles chains of conversions.",
  instructions: "Write a function called `convert` that takes a `value`, a `from` unit, and a `to` unit, and returns the converted value, rounded to 4 decimal places.\n\nSupported conversions:\n- Length: m, km (×1000), cm (×0.01), mi (×1609.344), ft (×0.3048), in (×0.0254)\n- Mass: kg, g (×0.001), lb (×0.453592), oz (×0.028349)\n- Temperature: C, F, K (use formulas, not ratios)\n\nAll length/mass conversions go through the base unit (m or kg).\n\nExample:\n```\nconvert(1, 'km', 'm')    // Returns: 1000\nconvert(1, 'mi', 'km')   // Returns: 1.6093\nconvert(100, 'C', 'F')   // Returns: 212\n```",
  starterCode: "",
  solution: `function convert(value, from, to) {
  const r4 = v => Math.round(v * 10000) / 10000;

  // Temperature special cases
  const temps = ['C', 'F', 'K'];
  if (temps.includes(from) && temps.includes(to)) {
    let celsius;
    if (from === 'C') celsius = value;
    else if (from === 'F') celsius = (value - 32) * 5 / 9;
    else celsius = value - 273.15;
    if (to === 'C') return r4(celsius);
    if (to === 'F') return r4(celsius * 9 / 5 + 32);
    return r4(celsius + 273.15);
  }

  // Length conversions (base: meters)
  const length = { m: 1, km: 1000, cm: 0.01, mi: 1609.344, ft: 0.3048, in: 0.0254 };
  if (length[from] && length[to]) {
    return r4(value * length[from] / length[to]);
  }

  // Mass conversions (base: kg)
  const mass = { kg: 1, g: 0.001, lb: 0.453592, oz: 0.028349 };
  if (mass[from] && mass[to]) {
    return r4(value * mass[from] / mass[to]);
  }

  return null;
}`,
  testRunner: `(code) => {
  const fn = new Function(code + '; return convert;')();
  const results = [];
  results.push({ pass: fn(1, 'km', 'm') === 1000, description: '1 km = 1000 m', got: String(fn(1, 'km', 'm')) });
  results.push({ pass: fn(1, 'mi', 'km') === 1.6093, description: '1 mi = 1.6093 km', got: String(fn(1, 'mi', 'km')) });
  results.push({ pass: fn(100, 'C', 'F') === 212, description: '100°C = 212°F', got: String(fn(100, 'C', 'F')) });
  results.push({ pass: fn(1, 'lb', 'g') === 453.592, description: '1 lb = 453.592 g', got: String(fn(1, 'lb', 'g')) });
  results.push({ pass: fn(12, 'in', 'ft') === 1, description: '12 in = 1 ft', got: String(fn(12, 'in', 'ft')) });
  results.push({ pass: fn(0, 'C', 'K') === 273.15, description: '0°C = 273.15 K', got: String(fn(0, 'C', 'K')) });
  results.push({ pass: fn(1, 'kg', 'oz') === 35.2746, description: '1 kg ≈ 35.2746 oz', got: String(fn(1, 'kg', 'oz')) });
  return results;
}`,
  testCases: [],
  hints: [
    "Handle temperature separately (it uses formulas, not ratios). For length and mass, convert to the base unit first, then to the target unit.",
    "For length: `value × fromFactor / toFactor` where factors are relative to meters. Same pattern for mass with kg as base."
  ],
  resources: [
    { label: "MDN: Object property accessors", url: "/docs/mdn/property-accessors.html" }
  ],
  solutionGate: 10,
  basePoints: 75
});

// ─── T5-1: Scientific Calculator ────────────────────────────────────────────
exercises.push({
  id: id(),
  title: "Capstone: Expression Evaluator",
  type: "js",
  tier: 5,
  category: ["math", "capstone"],
  tags: ["math", "parsing", "evaluation", "capstone"],
  description: "Build an arithmetic expression evaluator that handles operator precedence and parentheses.",
  instructions: "Write a function called `evaluate` that takes a string containing a mathematical expression and returns the result, rounded to 4 decimal places.\n\nSupported operators: +, -, *, /, ^ (exponentiation)\nSupport parentheses for grouping.\nRespect operator precedence: ^ > * / > + -\nSupport negative numbers.\n\nExample:\n```\nevaluate('2 + 3 * 4')      // Returns: 14\nevaluate('(2 + 3) * 4')    // Returns: 20\nevaluate('2 ^ 3 + 1')      // Returns: 9\nevaluate('10 / (2 + 3)')   // Returns: 2\n```",
  starterCode: "",
  solution: `function evaluate(expr) {
  const tokens = [];
  let i = 0;
  const s = expr.replace(/\\s+/g, '');
  while (i < s.length) {
    if (s[i] >= '0' && s[i] <= '9' || s[i] === '.') {
      let num = '';
      while (i < s.length && (s[i] >= '0' && s[i] <= '9' || s[i] === '.')) num += s[i++];
      tokens.push(parseFloat(num));
    } else if (s[i] === '-' && (i === 0 || s[i-1] === '(' || '+-*/^'.includes(s[i-1]))) {
      i++;
      let num = '';
      while (i < s.length && (s[i] >= '0' && s[i] <= '9' || s[i] === '.')) num += s[i++];
      tokens.push(-parseFloat(num));
    } else {
      tokens.push(s[i++]);
    }
  }

  let pos = 0;
  function parseExpr() {
    let left = parseTerm();
    while (pos < tokens.length && (tokens[pos] === '+' || tokens[pos] === '-')) {
      const op = tokens[pos++];
      const right = parseTerm();
      left = op === '+' ? left + right : left - right;
    }
    return left;
  }
  function parseTerm() {
    let left = parsePower();
    while (pos < tokens.length && (tokens[pos] === '*' || tokens[pos] === '/')) {
      const op = tokens[pos++];
      const right = parsePower();
      left = op === '*' ? left * right : left / right;
    }
    return left;
  }
  function parsePower() {
    let base = parseAtom();
    if (pos < tokens.length && tokens[pos] === '^') {
      pos++;
      const exp = parsePower(); // right-associative
      base = Math.pow(base, exp);
    }
    return base;
  }
  function parseAtom() {
    if (tokens[pos] === '(') {
      pos++;
      const val = parseExpr();
      pos++; // skip ')'
      return val;
    }
    return tokens[pos++];
  }
  return Math.round(parseExpr() * 10000) / 10000;
}`,
  testRunner: `(code) => {
  const fn = new Function(code + '; return evaluate;')();
  const results = [];
  results.push({ pass: fn('2 + 3 * 4') === 14, description: '2 + 3 * 4 = 14 (precedence)', got: String(fn('2 + 3 * 4')) });
  results.push({ pass: fn('(2 + 3) * 4') === 20, description: '(2 + 3) * 4 = 20 (parentheses)', got: String(fn('(2 + 3) * 4')) });
  results.push({ pass: fn('2 ^ 3 + 1') === 9, description: '2 ^ 3 + 1 = 9 (exponentiation)', got: String(fn('2 ^ 3 + 1')) });
  results.push({ pass: fn('10 / (2 + 3)') === 2, description: '10 / (2 + 3) = 2', got: String(fn('10 / (2 + 3)')) });
  results.push({ pass: fn('3 + 4 * 2 / (1 - 5) ^ 2') === 3.5, description: 'complex expression = 3.5', got: String(fn('3 + 4 * 2 / (1 - 5) ^ 2')) });
  results.push({ pass: fn('100') === 100, description: 'single number', got: String(fn('100')) });
  results.push({ pass: fn('-5 + 3') === -2, description: 'negative number: -5 + 3 = -2', got: String(fn('-5 + 3')) });
  results.push({ pass: fn('2 * (3 + (4 * 5))') === 46, description: 'nested parentheses', got: String(fn('2 * (3 + (4 * 5))')) });
  return results;
}`,
  testCases: [],
  hints: [
    "Use recursive descent parsing with three levels: expression (+ -), term (* /), power (^), and atom (numbers + parentheses).",
    "Tokenize the string first into numbers and operators. Then parse with functions for each precedence level, each calling the next level down."
  ],
  resources: [
    { label: "MDN: Math.pow()", url: "/docs/mdn/math-pow.html" }
  ],
  solutionGate: 10,
  basePoints: 100
});

// ─── T5-2: Numerical Methods Suite ──────────────────────────────────────────
exercises.push({
  id: id(),
  title: "Capstone: Numerical Methods",
  type: "js",
  tier: 5,
  category: ["math", "capstone"],
  tags: ["math", "numerical-methods", "calculus", "capstone"],
  description: "Implement core numerical methods: root finding, numerical integration, and numerical differentiation.",
  instructions: "Build three functions:\n\n**`findRoot(fn, a, b, tolerance)`** — Find a root of function `fn` in interval [a, b] using the bisection method. Return the root rounded to 6 decimal places. Stop when interval width < tolerance.\n\n**`integrate(fn, a, b, n)`** — Numerically integrate function `fn` from a to b using Simpson's rule with n subintervals (n must be even). Return the result rounded to 6 decimal places.\n\nSimpson's rule: (h/3) × [f(a) + 4f(a+h) + 2f(a+2h) + 4f(a+3h) + ... + f(b)]\n\n**`differentiate(fn, x, h)`** — Numerically differentiate function `fn` at point x using the central difference method with step size h. Return f'(x) rounded to 6 decimal places.\n\nf'(x) ≈ (f(x+h) - f(x-h)) / (2h)\n\nExample:\n```\nfindRoot(x => x*x - 4, 0, 5, 1e-8)  // Returns: 2\nintegrate(x => x*x, 0, 1, 100)       // Returns: 0.333333\ndifferentiate(x => x*x, 3, 0.001)    // Returns: 6\n```",
  starterCode: "",
  solution: `function findRoot(fn, a, b, tolerance = 1e-8) {
  while (b - a > tolerance) {
    const mid = (a + b) / 2;
    if (fn(mid) === 0) return Math.round(mid * 1000000) / 1000000;
    if (fn(a) * fn(mid) < 0) b = mid;
    else a = mid;
  }
  return Math.round((a + b) / 2 * 1000000) / 1000000;
}

function integrate(fn, a, b, n) {
  const h = (b - a) / n;
  let sum = fn(a) + fn(b);
  for (let i = 1; i < n; i++) {
    const x = a + i * h;
    sum += (i % 2 === 0 ? 2 : 4) * fn(x);
  }
  return Math.round(sum * h / 3 * 1000000) / 1000000;
}

function differentiate(fn, x, h = 0.001) {
  return Math.round((fn(x + h) - fn(x - h)) / (2 * h) * 1000000) / 1000000;
}`,
  testRunner: `(code) => {
  const fn = new Function(code + '; return { findRoot, integrate, differentiate };')();
  const results = [];
  // findRoot
  results.push({ pass: fn.findRoot(x => x*x - 4, 0, 5) === 2, description: 'root of x²-4 near 2', got: String(fn.findRoot(x => x*x - 4, 0, 5)) });
  results.push({ pass: Math.abs(fn.findRoot(x => Math.sin(x), 3, 4) - Math.PI) < 0.0001, description: 'root of sin(x) near π', got: String(fn.findRoot(x => Math.sin(x), 3, 4)) });
  results.push({ pass: fn.findRoot(x => x, -1, 1) === 0, description: 'root of f(x)=x is 0', got: String(fn.findRoot(x => x, -1, 1)) });

  // integrate
  results.push({ pass: fn.integrate(x => x*x, 0, 1, 100) === 0.333333, description: '∫x² dx from 0 to 1 = 1/3', got: String(fn.integrate(x => x*x, 0, 1, 100)) });
  results.push({ pass: Math.abs(fn.integrate(x => Math.sin(x), 0, Math.PI, 100) - 2) < 0.001, description: '∫sin(x) dx from 0 to π = 2', got: String(fn.integrate(x => Math.sin(x), 0, Math.PI, 100)) });

  // differentiate
  results.push({ pass: fn.differentiate(x => x*x, 3, 0.001) === 6, description: "d/dx(x²) at x=3 = 6", got: String(fn.differentiate(x => x*x, 3, 0.001)) });
  results.push({ pass: Math.abs(fn.differentiate(x => Math.sin(x), 0, 0.0001) - 1) < 0.001, description: "d/dx(sin(x)) at x=0 = 1", got: String(fn.differentiate(x => Math.sin(x), 0, 0.0001)) });
  return results;
}`,
  testCases: [],
  hints: [
    "Bisection: repeatedly halve the interval containing the root. Simpson's rule uses alternating coefficients 4,2,4,2... Central difference: (f(x+h)-f(x-h))/(2h).",
    "For bisection, check if `fn(a) * fn(mid) < 0` to decide which half contains the root. For Simpson's, the pattern is 1,4,2,4,2,...,4,1."
  ],
  resources: [
    { label: "MDN: Math.sin()", url: "/docs/mdn/math-sin.html" },
    { label: "MDN: Math.PI", url: "/docs/mdn/math-pi.html" }
  ],
  solutionGate: 10,
  basePoints: 100
});

// ─── T5-3: Data Science Pipeline ────────────────────────────────────────────
exercises.push({
  id: id(),
  title: "Capstone: Data Science Pipeline",
  type: "js",
  tier: 5,
  category: ["math", "capstone"],
  tags: ["math", "statistics", "data-science", "capstone"],
  description: "Build a complete data analysis pipeline: clean, transform, analyze, and model data.",
  instructions: "Build four functions that form a data pipeline:\n\n**`cleanData(data)`** — Takes an array of objects and returns a cleaned copy:\n- Remove entries where any numeric value is `null`, `undefined`, or `NaN`\n- Remove duplicate entries (by JSON equality)\n- Sort by the first key alphabetically\n\n**`normalize(data, key)`** — Min-max normalize a numeric field to [0, 1], rounded to 4 decimal places. Returns new array with the key's values normalized.\n\n**`correlationMatrix(data, keys)`** — Compute pairwise Pearson correlations between specified numeric keys. Return a 2D array (matrix), values rounded to 4 decimal places.\n\n**`kMeans(data, key1, key2, k, maxIter)`** — Run k-means clustering on two numeric fields. Return an array of cluster assignments (0 to k-1) for each data point. Use the first k points as initial centroids. Max iterations default to 100.\n\nExample:\n```\ncleanData([{ a: 1, b: 2 }, { a: null, b: 3 }, { a: 1, b: 2 }])\n// Returns: [{ a: 1, b: 2 }]  (removes null + duplicate)\n```",
  starterCode: "",
  solution: `function cleanData(data) {
  const cleaned = data.filter(row => {
    return Object.values(row).every(v => v !== null && v !== undefined && (typeof v !== 'number' || !isNaN(v)));
  });
  const unique = [];
  const seen = new Set();
  for (const row of cleaned) {
    const key = JSON.stringify(row);
    if (!seen.has(key)) {
      seen.add(key);
      unique.push(row);
    }
  }
  const firstKey = Object.keys(unique[0] || {})[0];
  return unique.sort((a, b) => a[firstKey] < b[firstKey] ? -1 : a[firstKey] > b[firstKey] ? 1 : 0);
}

function normalize(data, key) {
  const vals = data.map(d => d[key]);
  const min = Math.min(...vals);
  const max = Math.max(...vals);
  const range = max - min;
  return data.map(d => ({
    ...d,
    [key]: range === 0 ? 0 : Math.round((d[key] - min) / range * 10000) / 10000
  }));
}

function correlationMatrix(data, keys) {
  const r4 = v => Math.round(v * 10000) / 10000;
  const matrix = [];
  for (let i = 0; i < keys.length; i++) {
    matrix[i] = [];
    for (let j = 0; j < keys.length; j++) {
      const x = data.map(d => d[keys[i]]);
      const y = data.map(d => d[keys[j]]);
      const n = x.length;
      const mx = x.reduce((a, b) => a + b, 0) / n;
      const my = y.reduce((a, b) => a + b, 0) / n;
      let num = 0, dx2 = 0, dy2 = 0;
      for (let k = 0; k < n; k++) {
        const dx = x[k] - mx, dy = y[k] - my;
        num += dx * dy;
        dx2 += dx * dx;
        dy2 += dy * dy;
      }
      const den = Math.sqrt(dx2 * dy2);
      matrix[i][j] = den === 0 ? 0 : r4(num / den);
    }
  }
  return matrix;
}

function kMeans(data, key1, key2, k, maxIter = 100) {
  let centroids = data.slice(0, k).map(d => [d[key1], d[key2]]);
  let assignments = new Array(data.length).fill(0);

  for (let iter = 0; iter < maxIter; iter++) {
    // Assign points to nearest centroid
    const newAssignments = data.map(d => {
      let minDist = Infinity, closest = 0;
      for (let c = 0; c < k; c++) {
        const dist = (d[key1] - centroids[c][0]) ** 2 + (d[key2] - centroids[c][1]) ** 2;
        if (dist < minDist) { minDist = dist; closest = c; }
      }
      return closest;
    });

    // Check convergence
    if (JSON.stringify(newAssignments) === JSON.stringify(assignments)) break;
    assignments = newAssignments;

    // Update centroids
    for (let c = 0; c < k; c++) {
      const members = data.filter((_, i) => assignments[i] === c);
      if (members.length > 0) {
        centroids[c] = [
          members.reduce((s, d) => s + d[key1], 0) / members.length,
          members.reduce((s, d) => s + d[key2], 0) / members.length
        ];
      }
    }
  }

  return assignments;
}`,
  testRunner: `(code) => {
  const fn = new Function(code + '; return { cleanData, normalize, correlationMatrix, kMeans };')();
  const eq = (a, b) => JSON.stringify(a) === JSON.stringify(b);
  const results = [];

  // cleanData
  const c1 = fn.cleanData([{ a: 1, b: 2 }, { a: null, b: 3 }, { a: 1, b: 2 }]);
  results.push({ pass: c1.length === 1, description: 'cleanData removes nulls and duplicates', got: JSON.stringify(c1) });
  const c2 = fn.cleanData([{ x: 3 }, { x: 1 }, { x: 2 }]);
  results.push({ pass: eq(c2, [{ x: 1 }, { x: 2 }, { x: 3 }]), description: 'cleanData sorts by first key', got: JSON.stringify(c2) });

  // normalize
  const n1 = fn.normalize([{ v: 10 }, { v: 20 }, { v: 30 }], 'v');
  results.push({ pass: n1[0].v === 0 && n1[1].v === 0.5 && n1[2].v === 1, description: 'normalize to [0,1]', got: JSON.stringify(n1) });

  // correlationMatrix
  const data = [{ a: 1, b: 2, c: 5 }, { a: 2, b: 4, c: 3 }, { a: 3, b: 6, c: 1 }];
  const cm = fn.correlationMatrix(data, ['a', 'b']);
  results.push({ pass: cm[0][0] === 1 && cm[1][1] === 1, description: 'diagonal of correlation matrix is 1', got: JSON.stringify(cm) });
  results.push({ pass: cm[0][1] === 1, description: 'perfect positive correlation a-b', got: String(cm[0][1]) });

  // kMeans
  const kdata = [
    { x: 1, y: 1 }, { x: 1.5, y: 1.5 }, { x: 2, y: 1 },
    { x: 10, y: 10 }, { x: 10.5, y: 10.5 }, { x: 11, y: 10 }
  ];
  const km = fn.kMeans(kdata, 'x', 'y', 2);
  results.push({ pass: km.length === 6, description: 'kMeans returns assignment per point', got: String(km.length) });
  results.push({ pass: km[0] === km[1] && km[1] === km[2], description: 'nearby points in same cluster', got: JSON.stringify(km) });
  results.push({ pass: km[0] !== km[3], description: 'distant points in different clusters', got: JSON.stringify(km) });
  return results;
}`,
  testCases: [],
  hints: [
    "cleanData: filter nulls/NaN, deduplicate with a Set of JSON strings, sort by first key. normalize: min-max scale to [0,1].",
    "correlationMatrix: compute Pearson r for each pair. kMeans: assign to nearest centroid, update centroids, repeat until stable."
  ],
  resources: [
    { label: "MDN: Set", url: "/docs/mdn/set.html" },
    { label: "MDN: Spread syntax (...)", url: "/docs/mdn/spread-syntax.html" }
  ],
  solutionGate: 10,
  basePoints: 100
});

// ── append to collection ────────────────────────────────────────────────────

collection.exercises.push(...exercises);
fs.writeFileSync(COLLECTION_FILE, JSON.stringify(collection, null, 2));
console.log(`✅ Section 8: Capstones — ${exercises.length} exercises appended (IDs ${exercises[0].id}-${exercises[exercises.length - 1].id})`);
console.log(`   Collection total: ${collection.exercises.length} exercises`);
