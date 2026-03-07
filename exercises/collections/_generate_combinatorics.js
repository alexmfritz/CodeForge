/**
 * Hard Math & Science — Section 4: Combinatorics
 * 12 exercises (IDs 1129-1140): 2 T2, 5 T3, 3 T4, 2 T5
 *
 * Appends to the existing hard-math-science.json collection file.
 */

const fs = require('fs');
const path = require('path');

const COLLECTION_FILE = path.join(__dirname, 'hard-math-science.json');
const collection = JSON.parse(fs.readFileSync(COLLECTION_FILE, 'utf8'));

let nextId = 1129;
function id() { return nextId++; }

const exercises = [];

// ─── T2-1: Factorial ────────────────────────────────────────────────────────
exercises.push({
  id: id(),
  title: "Combinatorics: Factorial",
  type: "js",
  tier: 2,
  category: ["math", "combinatorics"],
  tags: ["math", "combinatorics", "recursion", "loops"],
  description: "Calculate the factorial of a non-negative integer.",
  instructions: "Write a function called `factorial` that takes a non-negative integer `n` and returns `n!` (n factorial).\n\nRemember: 0! = 1, and n! = n × (n-1) × ... × 1.\n\nExample:\n```\nfactorial(5)  // Returns: 120\nfactorial(0)  // Returns: 1\nfactorial(1)  // Returns: 1\n```",
  starterCode: "// Return n! (n factorial)\nfunction factorial(n) {\n  \n}",
  solution: "function factorial(n) {\n  let result = 1;\n  for (let i = 2; i <= n; i++) {\n    result *= i;\n  }\n  return result;\n}",
  testRunner: `(code) => {
  const fn = new Function(code + '; return factorial;')();
  const results = [];
  results.push({ pass: fn(0) === 1, description: '0! equals 1', got: String(fn(0)) });
  results.push({ pass: fn(1) === 1, description: '1! equals 1', got: String(fn(1)) });
  results.push({ pass: fn(5) === 120, description: '5! equals 120', got: String(fn(5)) });
  results.push({ pass: fn(10) === 3628800, description: '10! equals 3628800', got: String(fn(10)) });
  results.push({ pass: fn(3) === 6, description: '3! equals 6', got: String(fn(3)) });
  results.push({ pass: fn(7) === 5040, description: '7! equals 5040', got: String(fn(7)) });
  return results;
}`,
  testCases: [],
  hints: [
    "Multiply all integers from 1 to n together. The base case is 0! = 1.",
    "Use a loop from 2 to n, multiplying a running result. Start with `result = 1`."
  ],
  resources: [
    { label: "MDN: for loop", url: "/docs/mdn/for-loop.html" }
  ],
  solutionGate: 10,
  basePoints: 25
});

// ─── T2-2: Permutations Count ───────────────────────────────────────────────
exercises.push({
  id: id(),
  title: "Combinatorics: Permutations Count",
  type: "js",
  tier: 2,
  category: ["math", "combinatorics"],
  tags: ["math", "combinatorics", "permutations", "factorial"],
  description: "Calculate the number of permutations P(n, r).",
  instructions: "Write a function called `permutations` that takes two non-negative integers `n` and `r` (where r ≤ n) and returns the number of permutations P(n, r).\n\nFormula: P(n, r) = n! / (n - r)!\n\nExample:\n```\npermutations(5, 3)  // Returns: 60\npermutations(4, 4)  // Returns: 24\npermutations(10, 2) // Returns: 90\n```",
  starterCode: "// Return the number of permutations P(n, r)\nfunction permutations(n, r) {\n  \n}",
  solution: "function permutations(n, r) {\n  let result = 1;\n  for (let i = n; i > n - r; i--) {\n    result *= i;\n  }\n  return result;\n}",
  testRunner: `(code) => {
  const fn = new Function(code + '; return permutations;')();
  const results = [];
  results.push({ pass: fn(5, 3) === 60, description: 'P(5,3) equals 60', got: String(fn(5, 3)) });
  results.push({ pass: fn(4, 4) === 24, description: 'P(4,4) equals 24', got: String(fn(4, 4)) });
  results.push({ pass: fn(10, 2) === 90, description: 'P(10,2) equals 90', got: String(fn(10, 2)) });
  results.push({ pass: fn(6, 1) === 6, description: 'P(6,1) equals 6', got: String(fn(6, 1)) });
  results.push({ pass: fn(5, 0) === 1, description: 'P(5,0) equals 1', got: String(fn(5, 0)) });
  results.push({ pass: fn(8, 3) === 336, description: 'P(8,3) equals 336', got: String(fn(8, 3)) });
  return results;
}`,
  testCases: [],
  hints: [
    "P(n, r) is the product of r consecutive integers starting from n and going down.",
    "Loop from `n` down to `n - r + 1`, multiplying each value into the result. Or compute `n! / (n-r)!`."
  ],
  resources: [
    { label: "MDN: for loop", url: "/docs/mdn/for-loop.html" }
  ],
  solutionGate: 10,
  basePoints: 25
});

// ─── T3-1: Combinations Count ───────────────────────────────────────────────
exercises.push({
  id: id(),
  title: "Combinatorics: Combinations Count",
  type: "js",
  tier: 3,
  category: ["math", "combinatorics"],
  tags: ["math", "combinatorics", "combinations", "factorial"],
  description: "Calculate the number of combinations C(n, r) (binomial coefficient).",
  instructions: "Write a function called `combinations` that takes two non-negative integers `n` and `r` (where r ≤ n) and returns the binomial coefficient C(n, r).\n\nFormula: C(n, r) = n! / (r! × (n - r)!)\n\nUse an efficient method that avoids computing large factorials directly.\n\nExample:\n```\ncombinations(5, 3)  // Returns: 10\ncombinations(10, 5) // Returns: 252\ncombinations(6, 0)  // Returns: 1\n```",
  starterCode: "function combinations(n, r) {\n  \n}",
  solution: "function combinations(n, r) {\n  if (r > n - r) r = n - r;\n  let result = 1;\n  for (let i = 0; i < r; i++) {\n    result = result * (n - i) / (i + 1);\n  }\n  return Math.round(result);\n}",
  testRunner: `(code) => {
  const fn = new Function(code + '; return combinations;')();
  const results = [];
  results.push({ pass: fn(5, 3) === 10, description: 'C(5,3) equals 10', got: String(fn(5, 3)) });
  results.push({ pass: fn(10, 5) === 252, description: 'C(10,5) equals 252', got: String(fn(10, 5)) });
  results.push({ pass: fn(6, 0) === 1, description: 'C(6,0) equals 1', got: String(fn(6, 0)) });
  results.push({ pass: fn(6, 6) === 1, description: 'C(6,6) equals 1', got: String(fn(6, 6)) });
  results.push({ pass: fn(20, 10) === 184756, description: 'C(20,10) equals 184756', got: String(fn(20, 10)) });
  results.push({ pass: fn(1, 1) === 1, description: 'C(1,1) equals 1', got: String(fn(1, 1)) });
  results.push({ pass: fn(7, 3) === 35, description: 'C(7,3) equals 35', got: String(fn(7, 3)) });
  return results;
}`,
  testCases: [],
  hints: [
    "C(n,r) = C(n, n-r), so use the smaller of r and n-r for efficiency. Compute iteratively to avoid overflow.",
    "Use the multiplicative formula: loop i from 0 to r-1, updating `result = result * (n-i) / (i+1)` at each step."
  ],
  resources: [
    { label: "MDN: Math.round()", url: "/docs/mdn/math-round.html" }
  ],
  solutionGate: 10,
  basePoints: 50
});

// ─── T3-2: Pascal's Triangle Row ────────────────────────────────────────────
exercises.push({
  id: id(),
  title: "Combinatorics: Pascal's Triangle Row",
  type: "js",
  tier: 3,
  category: ["math", "combinatorics"],
  tags: ["math", "combinatorics", "pascal", "arrays"],
  description: "Generate a specific row of Pascal's Triangle.",
  instructions: "Write a function called `pascalRow` that takes a row number `n` (0-indexed) and returns that row of Pascal's Triangle as an array.\n\nEach element is the sum of the two elements above it. Row 0 is [1].\n\nExample:\n```\npascalRow(0)  // Returns: [1]\npascalRow(1)  // Returns: [1, 1]\npascalRow(4)  // Returns: [1, 4, 6, 4, 1]\npascalRow(6)  // Returns: [1, 6, 15, 20, 15, 6, 1]\n```",
  starterCode: "function pascalRow(n) {\n  \n}",
  solution: "function pascalRow(n) {\n  const row = [1];\n  for (let i = 1; i <= n; i++) {\n    row.push(row[i - 1] * (n - i + 1) / i);\n  }\n  return row;\n}",
  testRunner: `(code) => {
  const fn = new Function(code + '; return pascalRow;')();
  const eq = (a, b) => JSON.stringify(a) === JSON.stringify(b);
  const results = [];
  results.push({ pass: eq(fn(0), [1]), description: 'row 0 is [1]', got: JSON.stringify(fn(0)) });
  results.push({ pass: eq(fn(1), [1, 1]), description: 'row 1 is [1,1]', got: JSON.stringify(fn(1)) });
  results.push({ pass: eq(fn(4), [1, 4, 6, 4, 1]), description: 'row 4 is [1,4,6,4,1]', got: JSON.stringify(fn(4)) });
  results.push({ pass: eq(fn(6), [1, 6, 15, 20, 15, 6, 1]), description: 'row 6 is [1,6,15,20,15,6,1]', got: JSON.stringify(fn(6)) });
  results.push({ pass: eq(fn(2), [1, 2, 1]), description: 'row 2 is [1,2,1]', got: JSON.stringify(fn(2)) });
  results.push({ pass: fn(10).length === 11, description: 'row 10 has 11 elements', got: String(fn(10).length) });
  return results;
}`,
  testCases: [],
  hints: [
    "Each element in a Pascal's Triangle row is a binomial coefficient C(n, k) for k = 0 to n.",
    "Start with [1], then compute each next element using `row[i] = row[i-1] * (n - i + 1) / i`."
  ],
  resources: [
    { label: "MDN: Array.prototype.push()", url: "/docs/mdn/array-push.html" }
  ],
  solutionGate: 10,
  basePoints: 50
});

// ─── T3-3: Power Set ────────────────────────────────────────────────────────
exercises.push({
  id: id(),
  title: "Combinatorics: Power Set",
  type: "js",
  tier: 3,
  category: ["math", "combinatorics"],
  tags: ["math", "combinatorics", "sets", "recursion"],
  description: "Generate all subsets (the power set) of a given array.",
  instructions: "Write a function called `powerSet` that takes an array and returns an array of all possible subsets, including the empty set.\n\nThe result should be sorted by subset length, then lexicographically within each length group.\n\nExample:\n```\npowerSet([1, 2, 3])\n// Returns: [[], [1], [2], [3], [1,2], [1,3], [2,3], [1,2,3]]\n```",
  starterCode: "function powerSet(arr) {\n  \n}",
  solution: "function powerSet(arr) {\n  const result = [[]];\n  for (const item of arr) {\n    const len = result.length;\n    for (let i = 0; i < len; i++) {\n      result.push([...result[i], item]);\n    }\n  }\n  return result.sort((a, b) => a.length - b.length || JSON.stringify(a).localeCompare(JSON.stringify(b)));\n}",
  testRunner: `(code) => {
  const fn = new Function(code + '; return powerSet;')();
  const eq = (a, b) => JSON.stringify(a) === JSON.stringify(b);
  const results = [];
  results.push({ pass: eq(fn([]), [[]]), description: 'powerSet([]) equals [[]]', got: JSON.stringify(fn([])) });
  results.push({ pass: eq(fn([1]), [[], [1]]), description: 'powerSet([1]) equals [[], [1]]', got: JSON.stringify(fn([1])) });
  const r3 = fn([1, 2, 3]);
  results.push({ pass: r3.length === 8, description: 'powerSet([1,2,3]) has 8 subsets', got: String(r3.length) });
  results.push({ pass: eq(r3[0], []), description: 'first subset is empty []', got: JSON.stringify(r3[0]) });
  results.push({ pass: eq(r3[r3.length - 1], [1, 2, 3]), description: 'last subset is [1,2,3]', got: JSON.stringify(r3[r3.length - 1]) });
  results.push({ pass: fn([1, 2, 3, 4]).length === 16, description: 'powerSet of 4 elements has 16 subsets', got: String(fn([1, 2, 3, 4]).length) });
  return results;
}`,
  testCases: [],
  hints: [
    "For each element, you can either include it or exclude it. The total number of subsets is 2^n.",
    "Start with `[[]]`. For each item in the array, duplicate all existing subsets and add the item to each copy."
  ],
  resources: [
    { label: "MDN: Spread syntax (...)", url: "/docs/mdn/spread-syntax.html" }
  ],
  solutionGate: 10,
  basePoints: 50
});

// ─── T3-4: Derangements ────────────────────────────────────────────────────
exercises.push({
  id: id(),
  title: "Combinatorics: Derangements",
  type: "js",
  tier: 3,
  category: ["math", "combinatorics"],
  tags: ["math", "combinatorics", "derangements", "recursion"],
  description: "Count the number of derangements (permutations with no fixed points).",
  instructions: "Write a function called `derangements` that takes a positive integer `n` and returns the number of derangements D(n).\n\nA derangement is a permutation where no element appears in its original position.\n\nRecurrence: D(n) = (n - 1) × (D(n-1) + D(n-2))\nBase cases: D(0) = 1, D(1) = 0\n\nExample:\n```\nderangements(3)  // Returns: 2  (only [2,3,1] and [3,1,2])\nderangements(4)  // Returns: 9\nderangements(5)  // Returns: 44\n```",
  starterCode: "function derangements(n) {\n  \n}",
  solution: "function derangements(n) {\n  if (n === 0) return 1;\n  if (n === 1) return 0;\n  let prev2 = 1, prev1 = 0;\n  for (let i = 2; i <= n; i++) {\n    const curr = (i - 1) * (prev1 + prev2);\n    prev2 = prev1;\n    prev1 = curr;\n  }\n  return prev1;\n}",
  testRunner: `(code) => {
  const fn = new Function(code + '; return derangements;')();
  const results = [];
  results.push({ pass: fn(0) === 1, description: 'D(0) equals 1', got: String(fn(0)) });
  results.push({ pass: fn(1) === 0, description: 'D(1) equals 0', got: String(fn(1)) });
  results.push({ pass: fn(2) === 1, description: 'D(2) equals 1', got: String(fn(2)) });
  results.push({ pass: fn(3) === 2, description: 'D(3) equals 2', got: String(fn(3)) });
  results.push({ pass: fn(4) === 9, description: 'D(4) equals 9', got: String(fn(4)) });
  results.push({ pass: fn(5) === 44, description: 'D(5) equals 44', got: String(fn(5)) });
  results.push({ pass: fn(6) === 265, description: 'D(6) equals 265', got: String(fn(6)) });
  return results;
}`,
  testCases: [],
  hints: [
    "Use the recurrence D(n) = (n-1) × (D(n-1) + D(n-2)) with base cases D(0)=1, D(1)=0.",
    "Iterate from 2 to n, keeping track of only the previous two values (like Fibonacci) to stay efficient."
  ],
  resources: [
    { label: "MDN: for loop", url: "/docs/mdn/for-loop.html" }
  ],
  solutionGate: 10,
  basePoints: 50
});

// ─── T3-5: Stars and Bars ──────────────────────────────────────────────────
exercises.push({
  id: id(),
  title: "Combinatorics: Stars and Bars",
  type: "js",
  tier: 3,
  category: ["math", "combinatorics"],
  tags: ["math", "combinatorics", "stars-and-bars", "distribution"],
  description: "Count the number of ways to distribute identical objects into distinct bins.",
  instructions: "Write a function called `starsAndBars` that takes `n` (identical objects) and `k` (distinct bins) and returns the number of ways to distribute n objects into k bins.\n\nThis equals C(n + k - 1, k - 1).\n\nExample:\n```\nstarsAndBars(3, 2)   // Returns: 4  (ways: 0+3, 1+2, 2+1, 3+0)\nstarsAndBars(5, 3)   // Returns: 21\nstarsAndBars(0, 4)   // Returns: 1  (all bins empty)\n```",
  starterCode: "function starsAndBars(n, k) {\n  \n}",
  solution: "function starsAndBars(n, k) {\n  // C(n + k - 1, k - 1)\n  const total = n + k - 1;\n  let r = k - 1;\n  if (r > total - r) r = total - r;\n  let result = 1;\n  for (let i = 0; i < r; i++) {\n    result = result * (total - i) / (i + 1);\n  }\n  return Math.round(result);\n}",
  testRunner: `(code) => {
  const fn = new Function(code + '; return starsAndBars;')();
  const results = [];
  results.push({ pass: fn(3, 2) === 4, description: 'starsAndBars(3,2) equals 4', got: String(fn(3, 2)) });
  results.push({ pass: fn(5, 3) === 21, description: 'starsAndBars(5,3) equals 21', got: String(fn(5, 3)) });
  results.push({ pass: fn(0, 4) === 1, description: 'starsAndBars(0,4) equals 1', got: String(fn(0, 4)) });
  results.push({ pass: fn(10, 1) === 1, description: 'starsAndBars(10,1) equals 1', got: String(fn(10, 1)) });
  results.push({ pass: fn(4, 4) === 35, description: 'starsAndBars(4,4) equals 35', got: String(fn(4, 4)) });
  results.push({ pass: fn(2, 5) === 15, description: 'starsAndBars(2,5) equals 15', got: String(fn(2, 5)) });
  return results;
}`,
  testCases: [],
  hints: [
    "The stars and bars theorem says the answer is C(n + k - 1, k - 1), a binomial coefficient.",
    "Compute C(n+k-1, k-1) using the multiplicative formula: loop i from 0 to r-1, `result = result * (total-i) / (i+1)`."
  ],
  resources: [
    { label: "MDN: Math.round()", url: "/docs/mdn/math-round.html" }
  ],
  solutionGate: 10,
  basePoints: 50
});

// ─── T4-1: Generate Permutations ────────────────────────────────────────────
exercises.push({
  id: id(),
  title: "Combinatorics: Generate Permutations",
  type: "js",
  tier: 4,
  category: ["math", "combinatorics"],
  tags: ["math", "combinatorics", "permutations", "recursion", "backtracking"],
  description: "Generate all permutations of an array.",
  instructions: "Write a function called `permute` that takes an array of distinct elements and returns an array of all permutations.\n\nEach permutation is an array, and the result should be sorted lexicographically.\n\nExample:\n```\npermute([1, 2, 3])\n// Returns: [[1,2,3], [1,3,2], [2,1,3], [2,3,1], [3,1,2], [3,2,1]]\n```",
  starterCode: "",
  solution: "function permute(arr) {\n  if (arr.length <= 1) return [arr];\n  const result = [];\n  for (let i = 0; i < arr.length; i++) {\n    const rest = [...arr.slice(0, i), ...arr.slice(i + 1)];\n    const perms = permute(rest);\n    for (const perm of perms) {\n      result.push([arr[i], ...perm]);\n    }\n  }\n  return result.sort((a, b) => JSON.stringify(a).localeCompare(JSON.stringify(b)));\n}",
  testRunner: `(code) => {
  const fn = new Function(code + '; return permute;')();
  const eq = (a, b) => JSON.stringify(a) === JSON.stringify(b);
  const results = [];
  results.push({ pass: eq(fn([1]), [[1]]), description: 'permute([1]) equals [[1]]', got: JSON.stringify(fn([1])) });
  results.push({ pass: eq(fn([1, 2]), [[1, 2], [2, 1]]), description: 'permute([1,2]) equals [[1,2],[2,1]]', got: JSON.stringify(fn([1, 2])) });
  const r3 = fn([1, 2, 3]);
  results.push({ pass: r3.length === 6, description: 'permute([1,2,3]) has 6 permutations', got: String(r3.length) });
  results.push({ pass: eq(r3[0], [1, 2, 3]), description: 'first permutation is [1,2,3]', got: JSON.stringify(r3[0]) });
  results.push({ pass: eq(r3[5], [3, 2, 1]), description: 'last permutation is [3,2,1]', got: JSON.stringify(r3[5]) });
  results.push({ pass: fn([1, 2, 3, 4]).length === 24, description: 'permute of 4 elements has 24 results', got: String(fn([1, 2, 3, 4]).length) });
  return results;
}`,
  testCases: [],
  hints: [
    "For each element, fix it as the first element and recursively permute the remaining elements.",
    "Use recursion: pick each element at index i, recurse on the rest (sliced around i), prepend the picked element to each sub-permutation."
  ],
  resources: [
    { label: "MDN: Array.prototype.slice()", url: "/docs/mdn/array-slice.html" }
  ],
  solutionGate: 10,
  basePoints: 75
});

// ─── T4-2: Generate Combinations ────────────────────────────────────────────
exercises.push({
  id: id(),
  title: "Combinatorics: Generate Combinations",
  type: "js",
  tier: 4,
  category: ["math", "combinatorics"],
  tags: ["math", "combinatorics", "combinations", "recursion", "backtracking"],
  description: "Generate all combinations of size r from an array.",
  instructions: "Write a function called `combine` that takes an array of distinct elements and a size `r`, and returns all combinations of size r.\n\nEach combination is an array, and the result should be sorted lexicographically.\n\nExample:\n```\ncombine([1, 2, 3, 4], 2)\n// Returns: [[1,2], [1,3], [1,4], [2,3], [2,4], [3,4]]\n```",
  starterCode: "",
  solution: "function combine(arr, r) {\n  const result = [];\n  function backtrack(start, current) {\n    if (current.length === r) {\n      result.push([...current]);\n      return;\n    }\n    for (let i = start; i < arr.length; i++) {\n      current.push(arr[i]);\n      backtrack(i + 1, current);\n      current.pop();\n    }\n  }\n  backtrack(0, []);\n  return result;\n}",
  testRunner: `(code) => {
  const fn = new Function(code + '; return combine;')();
  const eq = (a, b) => JSON.stringify(a) === JSON.stringify(b);
  const results = [];
  results.push({ pass: eq(fn([1, 2, 3, 4], 2), [[1,2],[1,3],[1,4],[2,3],[2,4],[3,4]]), description: 'C([1,2,3,4], 2) correct', got: JSON.stringify(fn([1, 2, 3, 4], 2)) });
  results.push({ pass: fn([1, 2, 3, 4, 5], 3).length === 10, description: 'C(5,3) gives 10 combinations', got: String(fn([1, 2, 3, 4, 5], 3).length) });
  results.push({ pass: eq(fn([1, 2, 3], 1), [[1],[2],[3]]), description: 'C(3,1) gives individual elements', got: JSON.stringify(fn([1, 2, 3], 1)) });
  results.push({ pass: eq(fn([1, 2, 3], 3), [[1,2,3]]), description: 'C(3,3) gives one combination', got: JSON.stringify(fn([1, 2, 3], 3)) });
  results.push({ pass: eq(fn([1, 2], 0), [[]]), description: 'C(2,0) gives [[]]', got: JSON.stringify(fn([1, 2], 0)) });
  results.push({ pass: fn([1, 2, 3, 4, 5, 6], 4).length === 15, description: 'C(6,4) gives 15 combinations', got: String(fn([1, 2, 3, 4, 5, 6], 4).length) });
  return results;
}`,
  testCases: [],
  hints: [
    "Use backtracking: at each step, pick an element and recurse with elements only to its right to avoid duplicates.",
    "Track a `start` index and a `current` array. When `current.length === r`, save a copy. Loop from `start` to end, push, recurse with `i+1`, pop."
  ],
  resources: [
    { label: "MDN: Array.prototype.push()", url: "/docs/mdn/array-push.html" }
  ],
  solutionGate: 10,
  basePoints: 75
});

// ─── T4-3: Catalan Numbers ──────────────────────────────────────────────────
exercises.push({
  id: id(),
  title: "Combinatorics: Catalan Numbers",
  type: "js",
  tier: 4,
  category: ["math", "combinatorics"],
  tags: ["math", "combinatorics", "catalan", "dynamic-programming"],
  description: "Compute the n-th Catalan number.",
  instructions: "Write a function called `catalan` that takes a non-negative integer `n` and returns the n-th Catalan number.\n\nCatalan numbers count many combinatorial structures: valid parenthesizations, binary trees, non-crossing partitions, etc.\n\nFormula: C(n) = C(2n, n) / (n + 1)\n\nOr use the recurrence: C(0) = 1, C(n) = Σ C(i) × C(n-1-i) for i = 0 to n-1\n\nExample:\n```\ncatalan(0)  // Returns: 1\ncatalan(3)  // Returns: 5\ncatalan(5)  // Returns: 42\ncatalan(10) // Returns: 16796\n```",
  starterCode: "",
  solution: "function catalan(n) {\n  // Using C(2n, n) / (n + 1)\n  let result = 1;\n  for (let i = 0; i < n; i++) {\n    result = result * (2 * n - i) / (i + 1);\n  }\n  return Math.round(result / (n + 1));\n}",
  testRunner: `(code) => {
  const fn = new Function(code + '; return catalan;')();
  const results = [];
  results.push({ pass: fn(0) === 1, description: 'catalan(0) equals 1', got: String(fn(0)) });
  results.push({ pass: fn(1) === 1, description: 'catalan(1) equals 1', got: String(fn(1)) });
  results.push({ pass: fn(2) === 2, description: 'catalan(2) equals 2', got: String(fn(2)) });
  results.push({ pass: fn(3) === 5, description: 'catalan(3) equals 5', got: String(fn(3)) });
  results.push({ pass: fn(4) === 14, description: 'catalan(4) equals 14', got: String(fn(4)) });
  results.push({ pass: fn(5) === 42, description: 'catalan(5) equals 42', got: String(fn(5)) });
  results.push({ pass: fn(10) === 16796, description: 'catalan(10) equals 16796', got: String(fn(10)) });
  return results;
}`,
  testCases: [],
  hints: [
    "Use the formula C(n) = C(2n, n) / (n+1). Compute C(2n, n) using the multiplicative formula to avoid large factorials.",
    "Loop i from 0 to n-1: `result = result * (2*n - i) / (i + 1)`. Then divide by `n + 1` at the end."
  ],
  resources: [
    { label: "MDN: Math.round()", url: "/docs/mdn/math-round.html" }
  ],
  solutionGate: 10,
  basePoints: 75
});

// ─── T5-1: Partition Function ───────────────────────────────────────────────
exercises.push({
  id: id(),
  title: "Combinatorics: Integer Partitions",
  type: "js",
  tier: 5,
  category: ["math", "combinatorics"],
  tags: ["math", "combinatorics", "partitions", "dynamic-programming"],
  description: "Count and generate the integer partitions of a number.",
  instructions: "Build two functions:\n\n**`countPartitions(n)`** — Returns the number of ways to write `n` as a sum of positive integers (order doesn't matter).\n\nUse dynamic programming: build a table where `dp[i]` = number of ways to make sum i using integers 1..n.\n\n**`generatePartitions(n)`** — Returns an array of all partitions, where each partition is a sorted array (descending). The result should be sorted lexicographically (descending first).\n\nExample:\n```\ncountPartitions(5)  // Returns: 7\ngeneratePartitions(4)\n// Returns: [[4], [3,1], [2,2], [2,1,1], [1,1,1,1]]\n```",
  starterCode: "",
  solution: `function countPartitions(n) {
  const dp = new Array(n + 1).fill(0);
  dp[0] = 1;
  for (let i = 1; i <= n; i++) {
    for (let j = i; j <= n; j++) {
      dp[j] += dp[j - i];
    }
  }
  return dp[n];
}

function generatePartitions(n) {
  const result = [];
  function backtrack(remaining, maxVal, current) {
    if (remaining === 0) {
      result.push([...current]);
      return;
    }
    for (let i = Math.min(remaining, maxVal); i >= 1; i--) {
      current.push(i);
      backtrack(remaining - i, i, current);
      current.pop();
    }
  }
  backtrack(n, n, []);
  return result;
}`,
  testRunner: `(code) => {
  const fn = new Function(code + '; return { countPartitions, generatePartitions };')();
  const eq = (a, b) => JSON.stringify(a) === JSON.stringify(b);
  const results = [];
  results.push({ pass: fn.countPartitions(1) === 1, description: 'countPartitions(1) equals 1', got: String(fn.countPartitions(1)) });
  results.push({ pass: fn.countPartitions(5) === 7, description: 'countPartitions(5) equals 7', got: String(fn.countPartitions(5)) });
  results.push({ pass: fn.countPartitions(10) === 42, description: 'countPartitions(10) equals 42', got: String(fn.countPartitions(10)) });
  const p4 = fn.generatePartitions(4);
  results.push({ pass: p4.length === 5, description: 'generatePartitions(4) has 5 partitions', got: String(p4.length) });
  results.push({ pass: eq(p4[0], [4]), description: 'first partition of 4 is [4]', got: JSON.stringify(p4[0]) });
  results.push({ pass: eq(p4[4], [1,1,1,1]), description: 'last partition of 4 is [1,1,1,1]', got: JSON.stringify(p4[4]) });
  const p5 = fn.generatePartitions(5);
  results.push({ pass: p5.length === fn.countPartitions(5), description: 'generated count matches countPartitions', got: p5.length + ' vs ' + fn.countPartitions(5) });
  results.push({ pass: p5.every(p => p.reduce((a,b) => a+b, 0) === 5), description: 'all partitions of 5 sum to 5', got: 'checked' });
  return results;
}`,
  testCases: [],
  hints: [
    "For counting, use DP: for each integer i from 1 to n, update dp[j] += dp[j-i] for j from i to n.",
    "For generating, use backtracking with a `maxVal` parameter that ensures each next part is ≤ the previous part (descending order)."
  ],
  resources: [
    { label: "MDN: Array constructor", url: "/docs/mdn/array-constructor.html" }
  ],
  solutionGate: 10,
  basePoints: 100
});

// ─── T5-2: Combinatorial Toolkit ────────────────────────────────────────────
exercises.push({
  id: id(),
  title: "Combinatorics: Complete Toolkit",
  type: "js",
  tier: 5,
  category: ["math", "combinatorics"],
  tags: ["math", "combinatorics", "comprehensive", "multinomial"],
  description: "Build a complete combinatorics toolkit with multinomial coefficients, Stirling numbers, and Bell numbers.",
  instructions: "Build three functions:\n\n**`multinomial(n, groups)`** — Returns the multinomial coefficient: n! / (k₁! × k₂! × ... × kₘ!) where `groups` is an array of group sizes that sum to n. Represents the number of ways to divide n items into groups.\n\nExample: `multinomial(10, [3, 3, 4])` → 4200\n\n**`stirling(n, k)`** — Returns the Stirling number of the second kind S(n, k): the number of ways to partition n elements into k non-empty subsets.\n\nRecurrence: S(n, k) = k × S(n-1, k) + S(n-1, k-1)\nBase cases: S(0, 0) = 1, S(n, 0) = 0, S(0, k) = 0\n\n**`bell(n)`** — Returns the n-th Bell number: the total number of partitions of n elements.\n\nB(n) = Σ S(n, k) for k = 0 to n",
  starterCode: "",
  solution: `function multinomial(n, groups) {
  function fact(x) {
    let r = 1;
    for (let i = 2; i <= x; i++) r *= i;
    return r;
  }
  let denom = 1;
  for (const g of groups) denom *= fact(g);
  return Math.round(fact(n) / denom);
}

function stirling(n, k) {
  // Build table bottom-up
  const dp = Array.from({ length: n + 1 }, () => new Array(k + 1).fill(0));
  dp[0][0] = 1;
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= Math.min(i, k); j++) {
      dp[i][j] = j * dp[i - 1][j] + dp[i - 1][j - 1];
    }
  }
  return dp[n][k];
}

function bell(n) {
  let sum = 0;
  const dp = Array.from({ length: n + 1 }, () => new Array(n + 1).fill(0));
  dp[0][0] = 1;
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= i; j++) {
      dp[i][j] = j * dp[i - 1][j] + dp[i - 1][j - 1];
    }
  }
  for (let k = 0; k <= n; k++) sum += dp[n][k];
  return sum;
}`,
  testRunner: `(code) => {
  const fn = new Function(code + '; return { multinomial, stirling, bell };')();
  const results = [];
  // multinomial tests
  results.push({ pass: fn.multinomial(4, [2, 2]) === 6, description: 'multinomial(4, [2,2]) equals 6', got: String(fn.multinomial(4, [2, 2])) });
  results.push({ pass: fn.multinomial(10, [3, 3, 4]) === 4200, description: 'multinomial(10, [3,3,4]) equals 4200', got: String(fn.multinomial(10, [3, 3, 4])) });
  results.push({ pass: fn.multinomial(5, [1, 1, 1, 1, 1]) === 120, description: 'multinomial(5, [1,1,1,1,1]) equals 5!', got: String(fn.multinomial(5, [1, 1, 1, 1, 1])) });
  // stirling tests
  results.push({ pass: fn.stirling(0, 0) === 1, description: 'S(0,0) equals 1', got: String(fn.stirling(0, 0)) });
  results.push({ pass: fn.stirling(4, 2) === 7, description: 'S(4,2) equals 7', got: String(fn.stirling(4, 2)) });
  results.push({ pass: fn.stirling(5, 3) === 25, description: 'S(5,3) equals 25', got: String(fn.stirling(5, 3)) });
  results.push({ pass: fn.stirling(3, 1) === 1, description: 'S(3,1) equals 1', got: String(fn.stirling(3, 1)) });
  // bell tests
  results.push({ pass: fn.bell(0) === 1, description: 'bell(0) equals 1', got: String(fn.bell(0)) });
  results.push({ pass: fn.bell(3) === 5, description: 'bell(3) equals 5', got: String(fn.bell(3)) });
  results.push({ pass: fn.bell(5) === 52, description: 'bell(5) equals 52', got: String(fn.bell(5)) });
  results.push({ pass: fn.bell(6) === 203, description: 'bell(6) equals 203', got: String(fn.bell(6)) });
  return results;
}`,
  testCases: [],
  hints: [
    "Multinomial: compute n! divided by the product of each group's factorial. Stirling: use DP table with recurrence S(n,k) = k*S(n-1,k) + S(n-1,k-1).",
    "Bell number B(n) is the sum of all Stirling numbers S(n,k) for k=0..n. Reuse your Stirling table for efficiency."
  ],
  resources: [
    { label: "MDN: Array.from()", url: "/docs/mdn/array-from.html" }
  ],
  solutionGate: 10,
  basePoints: 100
});

// ── append to collection ────────────────────────────────────────────────────

collection.exercises.push(...exercises);
fs.writeFileSync(COLLECTION_FILE, JSON.stringify(collection, null, 2));
console.log(`✅ Section 4: Combinatorics — ${exercises.length} exercises appended (IDs ${exercises[0].id}-${exercises[exercises.length - 1].id})`);
console.log(`   Collection total: ${collection.exercises.length} exercises`);
