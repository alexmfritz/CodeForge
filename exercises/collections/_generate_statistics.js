/**
 * Hard Math & Science — Section 3: Statistics & Probability
 * 14 exercises (IDs 1115-1128): 3 T2, 6 T3, 4 T4, 1 T5
 *
 * Appends to the existing hard-math-science.json collection file.
 */

const fs = require('fs');
const path = require('path');

const COLLECTION_FILE = path.join(__dirname, 'hard-math-science.json');
const collection = JSON.parse(fs.readFileSync(COLLECTION_FILE, 'utf8'));

let nextId = 1115;
function id() { return nextId++; }

const exercises = [];

// ─── T2-1: Mean ──────────────────────────────────────────────────────────────
exercises.push({
  id: id(),
  title: "Statistics: Mean (Average)",
  type: "js",
  tier: 2,
  category: ["math", "statistics"],
  tags: ["math", "statistics", "arrays", "reduce"],
  description: "Calculate the arithmetic mean (average) of an array of numbers.",
  instructions: "Write a function called `mean` that takes an array of numbers and returns their arithmetic mean, rounded to 2 decimal places.\n\nThe mean is the sum of all values divided by the count of values.\n\nExample:\n```\nmean([1, 2, 3, 4, 5])  // Returns: 3\nmean([10, 20, 30])     // Returns: 20\nmean([2.5, 3.5])       // Returns: 3\n```",
  starterCode: "// Return the arithmetic mean, rounded to 2 decimal places\nfunction mean(nums) {\n  \n}",
  solution: "function mean(nums) {\n  const sum = nums.reduce((a, b) => a + b, 0);\n  return Math.round((sum / nums.length) * 100) / 100;\n}",
  testRunner: `(code) => {
  const fn = new Function(code + '; return mean;')();
  const results = [];
  results.push({ pass: fn([1, 2, 3, 4, 5]) === 3, description: 'mean([1,2,3,4,5]) equals 3', got: String(fn([1, 2, 3, 4, 5])) });
  results.push({ pass: fn([10, 20, 30]) === 20, description: 'mean([10,20,30]) equals 20', got: String(fn([10, 20, 30])) });
  results.push({ pass: fn([2.5, 3.5]) === 3, description: 'mean([2.5,3.5]) equals 3', got: String(fn([2.5, 3.5])) });
  results.push({ pass: fn([7]) === 7, description: 'mean([7]) equals 7', got: String(fn([7])) });
  results.push({ pass: fn([1, 1, 1, 1, 100]) === 20.8, description: 'mean([1,1,1,1,100]) equals 20.8', got: String(fn([1, 1, 1, 1, 100])) });
  results.push({ pass: fn([0, 0, 0, 10]) === 2.5, description: 'mean([0,0,0,10]) equals 2.5', got: String(fn([0, 0, 0, 10])) });
  return results;
}`,
  testCases: [],
  hints: [
    "Sum all the values in the array and divide by the array's length.",
    "Use `.reduce((a, b) => a + b, 0)` to get the sum, then divide by `.length`."
  ],
  resources: [
    { label: "MDN: Array.prototype.reduce()", url: "/docs/mdn/array-reduce.html" }
  ],
  solutionGate: 10,
  basePoints: 25
});

// ─── T2-2: Median ────────────────────────────────────────────────────────────
exercises.push({
  id: id(),
  title: "Statistics: Median",
  type: "js",
  tier: 2,
  category: ["math", "statistics"],
  tags: ["math", "statistics", "arrays", "sort"],
  description: "Find the median value of an array of numbers.",
  instructions: "Write a function called `median` that takes an array of numbers and returns the median value.\n\nThe median is the middle value when sorted. For even-length arrays, average the two middle values.\n\nExample:\n```\nmedian([3, 1, 2])      // Returns: 2\nmedian([1, 2, 3, 4])   // Returns: 2.5\nmedian([5, 1, 8, 3, 7]) // Returns: 5\n```",
  starterCode: "// Return the median value\nfunction median(nums) {\n  \n}",
  solution: "function median(nums) {\n  const sorted = [...nums].sort((a, b) => a - b);\n  const mid = Math.floor(sorted.length / 2);\n  if (sorted.length % 2 === 0) {\n    return (sorted[mid - 1] + sorted[mid]) / 2;\n  }\n  return sorted[mid];\n}",
  testRunner: `(code) => {
  const fn = new Function(code + '; return median;')();
  const results = [];
  results.push({ pass: fn([3, 1, 2]) === 2, description: 'median([3,1,2]) equals 2', got: String(fn([3, 1, 2])) });
  results.push({ pass: fn([1, 2, 3, 4]) === 2.5, description: 'median([1,2,3,4]) equals 2.5', got: String(fn([1, 2, 3, 4])) });
  results.push({ pass: fn([5, 1, 8, 3, 7]) === 5, description: 'median([5,1,8,3,7]) equals 5', got: String(fn([5, 1, 8, 3, 7])) });
  results.push({ pass: fn([42]) === 42, description: 'median([42]) equals 42', got: String(fn([42])) });
  results.push({ pass: fn([10, 20]) === 15, description: 'median([10,20]) equals 15', got: String(fn([10, 20])) });
  results.push({ pass: fn([7, 7, 7, 7, 7]) === 7, description: 'median([7,7,7,7,7]) equals 7', got: String(fn([7, 7, 7, 7, 7])) });
  return results;
}`,
  testCases: [],
  hints: [
    "Sort the array first, then find the middle index. Handle even and odd lengths differently.",
    "Use `[...nums].sort((a,b) => a-b)` to sort without mutating. For even length, average the two values at `mid-1` and `mid`."
  ],
  resources: [
    { label: "MDN: Array.prototype.sort()", url: "/docs/mdn/array-sort.html" }
  ],
  solutionGate: 10,
  basePoints: 25
});

// ─── T2-3: Mode ──────────────────────────────────────────────────────────────
exercises.push({
  id: id(),
  title: "Statistics: Mode",
  type: "js",
  tier: 2,
  category: ["math", "statistics"],
  tags: ["math", "statistics", "arrays", "objects"],
  description: "Find the most frequently occurring value(s) in an array of numbers.",
  instructions: "Write a function called `mode` that takes an array of numbers and returns an array of the most frequently occurring values, sorted in ascending order.\n\nIf all values appear equally often, return all values sorted.\n\nExample:\n```\nmode([1, 2, 2, 3])       // Returns: [2]\nmode([1, 1, 2, 2, 3])    // Returns: [1, 2]\nmode([5, 3, 5, 3, 1])    // Returns: [3, 5]\n```",
  starterCode: "// Return an array of the most frequent values, sorted ascending\nfunction mode(nums) {\n  \n}",
  solution: "function mode(nums) {\n  const freq = {};\n  for (const n of nums) {\n    freq[n] = (freq[n] || 0) + 1;\n  }\n  const maxFreq = Math.max(...Object.values(freq));\n  return Object.keys(freq)\n    .filter(k => freq[k] === maxFreq)\n    .map(Number)\n    .sort((a, b) => a - b);\n}",
  testRunner: `(code) => {
  const fn = new Function(code + '; return mode;')();
  const results = [];
  const eq = (a, b) => JSON.stringify(a) === JSON.stringify(b);
  results.push({ pass: eq(fn([1, 2, 2, 3]), [2]), description: 'mode([1,2,2,3]) equals [2]', got: JSON.stringify(fn([1, 2, 2, 3])) });
  results.push({ pass: eq(fn([1, 1, 2, 2, 3]), [1, 2]), description: 'mode([1,1,2,2,3]) equals [1,2]', got: JSON.stringify(fn([1, 1, 2, 2, 3])) });
  results.push({ pass: eq(fn([5, 3, 5, 3, 1]), [3, 5]), description: 'mode([5,3,5,3,1]) equals [3,5]', got: JSON.stringify(fn([5, 3, 5, 3, 1])) });
  results.push({ pass: eq(fn([7]), [7]), description: 'mode([7]) equals [7]', got: JSON.stringify(fn([7])) });
  results.push({ pass: eq(fn([1, 2, 3]), [1, 2, 3]), description: 'mode([1,2,3]) all equal frequency returns [1,2,3]', got: JSON.stringify(fn([1, 2, 3])) });
  results.push({ pass: eq(fn([4, 4, 4, 2, 2]), [4]), description: 'mode([4,4,4,2,2]) equals [4]', got: JSON.stringify(fn([4, 4, 4, 2, 2])) });
  return results;
}`,
  testCases: [],
  hints: [
    "Count how often each value appears using an object, then find which values have the highest count.",
    "Build a frequency map with a `for...of` loop, find the max frequency with `Math.max(...Object.values(freq))`, then filter keys matching that max."
  ],
  resources: [
    { label: "MDN: Object.keys()", url: "/docs/mdn/object-keys.html" }
  ],
  solutionGate: 10,
  basePoints: 25
});

// ─── T3-1: Standard Deviation ────────────────────────────────────────────────
exercises.push({
  id: id(),
  title: "Statistics: Standard Deviation",
  type: "js",
  tier: 3,
  category: ["math", "statistics"],
  tags: ["math", "statistics", "arrays", "reduce", "Math.sqrt"],
  description: "Calculate the population standard deviation of an array of numbers.",
  instructions: "Write a function called `stdDev` that takes an array of numbers and returns the population standard deviation, rounded to 4 decimal places.\n\nSteps:\n1. Find the mean (average)\n2. For each value, compute (value − mean)²\n3. Average those squared differences\n4. Take the square root\n\nExample:\n```\nstdDev([2, 4, 4, 4, 5, 5, 7, 9])  // Returns: 2\nstdDev([10, 10, 10])               // Returns: 0\n```",
  starterCode: "function stdDev(nums) {\n  \n}",
  solution: "function stdDev(nums) {\n  const avg = nums.reduce((a, b) => a + b, 0) / nums.length;\n  const variance = nums.reduce((sum, x) => sum + (x - avg) ** 2, 0) / nums.length;\n  return Math.round(Math.sqrt(variance) * 10000) / 10000;\n}",
  testRunner: `(code) => {
  const fn = new Function(code + '; return stdDev;')();
  const results = [];
  results.push({ pass: fn([2, 4, 4, 4, 5, 5, 7, 9]) === 2, description: 'stdDev([2,4,4,4,5,5,7,9]) equals 2', got: String(fn([2, 4, 4, 4, 5, 5, 7, 9])) });
  results.push({ pass: fn([10, 10, 10]) === 0, description: 'stdDev([10,10,10]) equals 0', got: String(fn([10, 10, 10])) });
  results.push({ pass: fn([1, 2, 3, 4, 5]) === 1.4142, description: 'stdDev([1,2,3,4,5]) equals 1.4142', got: String(fn([1, 2, 3, 4, 5])) });
  results.push({ pass: fn([5]) === 0, description: 'stdDev([5]) equals 0', got: String(fn([5])) });
  results.push({ pass: fn([0, 100]) === 50, description: 'stdDev([0,100]) equals 50', got: String(fn([0, 100])) });
  results.push({ pass: fn([3, 7, 7, 19]) === 6, description: 'stdDev([3,7,7,19]) equals 6', got: String(fn([3, 7, 7, 19])) });
  return results;
}`,
  testCases: [],
  hints: [
    "Break the problem into steps: first compute the mean, then compute the average of squared differences from the mean, then take the square root.",
    "Use two `.reduce()` calls: one for the mean, one for the sum of `(x - mean) ** 2`. Divide that sum by `nums.length` for variance, then `Math.sqrt(variance)`."
  ],
  resources: [
    { label: "MDN: Math.sqrt()", url: "/docs/mdn/math-sqrt.html" }
  ],
  solutionGate: 10,
  basePoints: 50
});

// ─── T3-2: Percentile ────────────────────────────────────────────────────────
exercises.push({
  id: id(),
  title: "Statistics: Percentile",
  type: "js",
  tier: 3,
  category: ["math", "statistics"],
  tags: ["math", "statistics", "arrays", "sort", "interpolation"],
  description: "Calculate the k-th percentile of an array of numbers using linear interpolation.",
  instructions: "Write a function called `percentile` that takes an array of numbers `data` and a percentile value `k` (0-100), and returns the k-th percentile using linear interpolation, rounded to 2 decimal places.\n\nAlgorithm:\n1. Sort the data ascending\n2. Compute index = (k / 100) × (n − 1), where n is the array length\n3. If index is a whole number, return that element\n4. Otherwise, interpolate between the two surrounding elements\n\nExample:\n```\npercentile([15, 20, 35, 40, 50], 40)  // Returns: 29\npercentile([1, 2, 3, 4, 5], 50)       // Returns: 3\n```",
  starterCode: "function percentile(data, k) {\n  \n}",
  solution: "function percentile(data, k) {\n  const sorted = [...data].sort((a, b) => a - b);\n  const idx = (k / 100) * (sorted.length - 1);\n  const lower = Math.floor(idx);\n  const upper = Math.ceil(idx);\n  if (lower === upper) return sorted[lower];\n  const frac = idx - lower;\n  const result = sorted[lower] + frac * (sorted[upper] - sorted[lower]);\n  return Math.round(result * 100) / 100;\n}",
  testRunner: `(code) => {
  const fn = new Function(code + '; return percentile;')();
  const results = [];
  results.push({ pass: fn([15, 20, 35, 40, 50], 40) === 29, description: 'percentile([15,20,35,40,50], 40) equals 29', got: String(fn([15, 20, 35, 40, 50], 40)) });
  results.push({ pass: fn([1, 2, 3, 4, 5], 50) === 3, description: 'percentile([1,2,3,4,5], 50) equals 3', got: String(fn([1, 2, 3, 4, 5], 50)) });
  results.push({ pass: fn([1, 2, 3, 4, 5], 0) === 1, description: 'percentile at 0 equals minimum', got: String(fn([1, 2, 3, 4, 5], 0)) });
  results.push({ pass: fn([1, 2, 3, 4, 5], 100) === 5, description: 'percentile at 100 equals maximum', got: String(fn([1, 2, 3, 4, 5], 100)) });
  results.push({ pass: fn([10, 20, 30, 40], 25) === 17.5, description: 'percentile([10,20,30,40], 25) equals 17.5', got: String(fn([10, 20, 30, 40], 25)) });
  results.push({ pass: fn([3, 5, 7, 9, 11], 75) === 9, description: 'percentile([3,5,7,9,11], 75) equals 9', got: String(fn([3, 5, 7, 9, 11], 75)) });
  results.push({ pass: fn([100], 50) === 100, description: 'percentile of single element equals that element', got: String(fn([100], 50)) });
  return results;
}`,
  testCases: [],
  hints: [
    "Sort the data first, then compute the fractional index. If it falls between two elements, blend them proportionally.",
    "Compute `idx = (k/100) * (n-1)`. Use `Math.floor(idx)` and `Math.ceil(idx)` to get neighboring indices, then interpolate: `lower + frac * (upper - lower)`."
  ],
  resources: [
    { label: "MDN: Math.floor()", url: "/docs/mdn/math-floor.html" }
  ],
  solutionGate: 10,
  basePoints: 50
});

// ─── T3-3: Z-Score ───────────────────────────────────────────────────────────
exercises.push({
  id: id(),
  title: "Statistics: Z-Score",
  type: "js",
  tier: 3,
  category: ["math", "statistics"],
  tags: ["math", "statistics", "z-score", "normalization"],
  description: "Calculate the z-score for each value in a dataset.",
  instructions: "Write a function called `zScores` that takes an array of numbers and returns an array of z-scores, each rounded to 4 decimal places.\n\nThe z-score tells how many standard deviations a value is from the mean:\n- z = (value − mean) / stdDev\n\nIf standard deviation is 0 (all values identical), return all zeros.\n\nExample:\n```\nzScores([2, 4, 4, 4, 5, 5, 7, 9])  // Returns: [-1.5, -0.5, -0.5, -0.5, 0, 0, 0.5, 1.5]\n```",
  starterCode: "function zScores(nums) {\n  \n}",
  solution: "function zScores(nums) {\n  const avg = nums.reduce((a, b) => a + b, 0) / nums.length;\n  const variance = nums.reduce((sum, x) => sum + (x - avg) ** 2, 0) / nums.length;\n  const sd = Math.sqrt(variance);\n  if (sd === 0) return nums.map(() => 0);\n  return nums.map(x => Math.round(((x - avg) / sd) * 10000) / 10000);\n}",
  testRunner: `(code) => {
  const fn = new Function(code + '; return zScores;')();
  const eq = (a, b) => JSON.stringify(a) === JSON.stringify(b);
  const results = [];
  results.push({ pass: eq(fn([2, 4, 4, 4, 5, 5, 7, 9]), [-1.5, -0.5, -0.5, -0.5, 0, 0, 1, 2]), description: 'z-scores of [2,4,4,4,5,5,7,9]', got: JSON.stringify(fn([2, 4, 4, 4, 5, 5, 7, 9])) });
  results.push({ pass: eq(fn([10, 10, 10]), [0, 0, 0]), description: 'identical values return all zeros', got: JSON.stringify(fn([10, 10, 10])) });
  results.push({ pass: eq(fn([1, 3]), [-1, 1]), description: 'z-scores of [1,3] equals [-1,1]', got: JSON.stringify(fn([1, 3])) });
  const r4 = fn([10, 20, 30]);
  results.push({ pass: r4[0] === -1.2247 && r4[2] === 1.2247, description: 'z-scores of [10,20,30] correct', got: JSON.stringify(r4) });
  results.push({ pass: eq(fn([5]), [0]), description: 'single element returns [0]', got: JSON.stringify(fn([5])) });
  return results;
}`,
  testCases: [],
  hints: [
    "First compute the mean and standard deviation, then transform each value using `(value - mean) / stdDev`.",
    "Handle the edge case where all values are the same (stdDev is 0) by returning an array of zeros. Use `.map()` to transform each value."
  ],
  resources: [
    { label: "MDN: Array.prototype.map()", url: "/docs/mdn/array-map.html" }
  ],
  solutionGate: 10,
  basePoints: 50
});

// ─── T3-4: Weighted Mean ────────────────────────────────────────────────────
exercises.push({
  id: id(),
  title: "Statistics: Weighted Mean",
  type: "js",
  tier: 3,
  category: ["math", "statistics"],
  tags: ["math", "statistics", "weighted-average", "reduce"],
  description: "Calculate the weighted mean given values and their corresponding weights.",
  instructions: "Write a function called `weightedMean` that takes two arrays: `values` and `weights`, and returns the weighted mean, rounded to 2 decimal places.\n\nWeighted mean = Σ(value × weight) / Σ(weights)\n\nExample:\n```\nweightedMean([80, 90, 100], [0.2, 0.3, 0.5])  // Returns: 93\nweightedMean([70, 80, 90], [1, 2, 3])          // Returns: 83.33\n```",
  starterCode: "function weightedMean(values, weights) {\n  \n}",
  solution: "function weightedMean(values, weights) {\n  let weightedSum = 0;\n  let totalWeight = 0;\n  for (let i = 0; i < values.length; i++) {\n    weightedSum += values[i] * weights[i];\n    totalWeight += weights[i];\n  }\n  return Math.round((weightedSum / totalWeight) * 100) / 100;\n}",
  testRunner: `(code) => {
  const fn = new Function(code + '; return weightedMean;')();
  const results = [];
  results.push({ pass: fn([80, 90, 100], [0.2, 0.3, 0.5]) === 93, description: 'weightedMean([80,90,100], [0.2,0.3,0.5]) equals 93', got: String(fn([80, 90, 100], [0.2, 0.3, 0.5])) });
  results.push({ pass: fn([70, 80, 90], [1, 2, 3]) === 83.33, description: 'weightedMean([70,80,90], [1,2,3]) equals 83.33', got: String(fn([70, 80, 90], [1, 2, 3])) });
  results.push({ pass: fn([50, 50], [1, 1]) === 50, description: 'equal weights give arithmetic mean', got: String(fn([50, 50], [1, 1])) });
  results.push({ pass: fn([100], [5]) === 100, description: 'single value returns that value', got: String(fn([100], [5])) });
  results.push({ pass: fn([0, 100], [1, 3]) === 75, description: 'weightedMean([0,100], [1,3]) equals 75', got: String(fn([0, 100], [1, 3])) });
  results.push({ pass: fn([60, 70, 80, 90], [1, 1, 1, 1]) === 75, description: 'equal weights equals simple mean', got: String(fn([60, 70, 80, 90], [1, 1, 1, 1])) });
  return results;
}`,
  testCases: [],
  hints: [
    "Multiply each value by its weight, sum those products, then divide by the sum of all weights.",
    "Use a loop to accumulate `values[i] * weights[i]` and the total weight, then divide the weighted sum by total weight."
  ],
  resources: [
    { label: "MDN: Arithmetic operators", url: "/docs/mdn/arithmetic-operators.html" }
  ],
  solutionGate: 10,
  basePoints: 50
});

// ─── T3-5: Correlation Coefficient ──────────────────────────────────────────
exercises.push({
  id: id(),
  title: "Statistics: Correlation Coefficient",
  type: "js",
  tier: 3,
  category: ["math", "statistics"],
  tags: ["math", "statistics", "correlation", "reduce"],
  description: "Calculate the Pearson correlation coefficient between two datasets.",
  instructions: "Write a function called `correlation` that takes two arrays of numbers `x` and `y` (same length) and returns the Pearson correlation coefficient, rounded to 4 decimal places.\n\nFormula:\nr = Σ((xi - x̄)(yi - ȳ)) / √(Σ(xi - x̄)² × Σ(yi - ȳ)²)\n\nIf the denominator is 0, return 0.\n\nExample:\n```\ncorrelation([1, 2, 3, 4, 5], [2, 4, 6, 8, 10])  // Returns: 1 (perfect positive)\ncorrelation([1, 2, 3, 4, 5], [10, 8, 6, 4, 2])   // Returns: -1 (perfect negative)\n```",
  starterCode: "function correlation(x, y) {\n  \n}",
  solution: "function correlation(x, y) {\n  const n = x.length;\n  const meanX = x.reduce((a, b) => a + b, 0) / n;\n  const meanY = y.reduce((a, b) => a + b, 0) / n;\n  let num = 0, denX = 0, denY = 0;\n  for (let i = 0; i < n; i++) {\n    const dx = x[i] - meanX;\n    const dy = y[i] - meanY;\n    num += dx * dy;\n    denX += dx * dx;\n    denY += dy * dy;\n  }\n  const den = Math.sqrt(denX * denY);\n  if (den === 0) return 0;\n  return Math.round((num / den) * 10000) / 10000;\n}",
  testRunner: `(code) => {
  const fn = new Function(code + '; return correlation;')();
  const results = [];
  results.push({ pass: fn([1, 2, 3, 4, 5], [2, 4, 6, 8, 10]) === 1, description: 'perfect positive correlation equals 1', got: String(fn([1, 2, 3, 4, 5], [2, 4, 6, 8, 10])) });
  results.push({ pass: fn([1, 2, 3, 4, 5], [10, 8, 6, 4, 2]) === -1, description: 'perfect negative correlation equals -1', got: String(fn([1, 2, 3, 4, 5], [10, 8, 6, 4, 2])) });
  results.push({ pass: fn([5, 5, 5], [1, 2, 3]) === 0, description: 'constant x gives 0 correlation', got: String(fn([5, 5, 5], [1, 2, 3])) });
  results.push({ pass: fn([1, 2, 3], [1, 2, 3]) === 1, description: 'identical arrays give correlation of 1', got: String(fn([1, 2, 3], [1, 2, 3])) });
  const r5 = fn([1, 2, 3, 4, 5], [2, 1, 5, 4, 6]);
  results.push({ pass: r5 === 0.8387, description: 'partial correlation [1,2,3,4,5] vs [2,1,5,4,6] equals 0.8387', got: String(r5) });
  results.push({ pass: fn([10, 20], [30, 40]) === 1, description: 'two-point positive correlation equals 1', got: String(fn([10, 20], [30, 40])) });
  return results;
}`,
  testCases: [],
  hints: [
    "Compute means of both arrays, then use a single loop to accumulate the numerator and both parts of the denominator.",
    "Track three sums: `Σ(dx*dy)` for the numerator, `Σ(dx²)` and `Σ(dy²)` for the denominator, where `dx = x[i] - meanX` and `dy = y[i] - meanY`."
  ],
  resources: [
    { label: "MDN: Math.sqrt()", url: "/docs/mdn/math-sqrt.html" }
  ],
  solutionGate: 10,
  basePoints: 50
});

// ─── T3-6: Moving Average ──────────────────────────────────────────────────
exercises.push({
  id: id(),
  title: "Statistics: Moving Average",
  type: "js",
  tier: 3,
  category: ["math", "statistics"],
  tags: ["math", "statistics", "arrays", "sliding-window"],
  description: "Compute a simple moving average over a sliding window.",
  instructions: "Write a function called `movingAverage` that takes an array of numbers `data` and a window size `k`, and returns an array of simple moving averages, each rounded to 2 decimal places.\n\nFor each position where a full window exists (starting at index k-1), compute the average of the previous k values.\n\nThe result array will have `data.length - k + 1` elements.\n\nExample:\n```\nmovingAverage([1, 2, 3, 4, 5], 3)  // Returns: [2, 3, 4]\nmovingAverage([10, 20, 30, 40], 2) // Returns: [15, 25, 35]\n```",
  starterCode: "function movingAverage(data, k) {\n  \n}",
  solution: "function movingAverage(data, k) {\n  const result = [];\n  for (let i = k - 1; i < data.length; i++) {\n    let sum = 0;\n    for (let j = i - k + 1; j <= i; j++) {\n      sum += data[j];\n    }\n    result.push(Math.round((sum / k) * 100) / 100);\n  }\n  return result;\n}",
  testRunner: `(code) => {
  const fn = new Function(code + '; return movingAverage;')();
  const eq = (a, b) => JSON.stringify(a) === JSON.stringify(b);
  const results = [];
  results.push({ pass: eq(fn([1, 2, 3, 4, 5], 3), [2, 3, 4]), description: 'movingAverage([1,2,3,4,5], 3) equals [2,3,4]', got: JSON.stringify(fn([1, 2, 3, 4, 5], 3)) });
  results.push({ pass: eq(fn([10, 20, 30, 40], 2), [15, 25, 35]), description: 'movingAverage([10,20,30,40], 2) equals [15,25,35]', got: JSON.stringify(fn([10, 20, 30, 40], 2)) });
  results.push({ pass: eq(fn([5, 5, 5, 5], 1), [5, 5, 5, 5]), description: 'window of 1 returns original values', got: JSON.stringify(fn([5, 5, 5, 5], 1)) });
  results.push({ pass: eq(fn([1, 2, 3, 4, 5], 5), [3]), description: 'window equals length returns single mean', got: JSON.stringify(fn([1, 2, 3, 4, 5], 5)) });
  results.push({ pass: eq(fn([10, 20, 30], 2), [15, 25]), description: 'movingAverage([10,20,30], 2) equals [15,25]', got: JSON.stringify(fn([10, 20, 30], 2)) });
  results.push({ pass: eq(fn([1, 3, 5, 7, 9, 11], 3), [3, 5, 7, 9]), description: 'movingAverage([1,3,5,7,9,11], 3) equals [3,5,7,9]', got: JSON.stringify(fn([1, 3, 5, 7, 9, 11], 3)) });
  return results;
}`,
  testCases: [],
  hints: [
    "Slide a window of size `k` across the array. At each position, average the elements in the current window.",
    "Start your outer loop at index `k-1`. For each position, sum the `k` elements ending at that index using an inner loop from `i-k+1` to `i`."
  ],
  resources: [
    { label: "MDN: Array.prototype.slice()", url: "/docs/mdn/array-slice.html" }
  ],
  solutionGate: 10,
  basePoints: 50
});

// ─── T4-1: Linear Regression ────────────────────────────────────────────────
exercises.push({
  id: id(),
  title: "Statistics: Linear Regression",
  type: "js",
  tier: 4,
  category: ["math", "statistics"],
  tags: ["math", "statistics", "regression", "least-squares"],
  description: "Compute the best-fit line using ordinary least squares regression.",
  instructions: "Write a function called `linearRegression` that takes two arrays `x` and `y` and returns an object with `slope` (m) and `intercept` (b) of the best-fit line y = mx + b, both rounded to 4 decimal places.\n\nFormulas:\n- slope = Σ((xi - x̄)(yi - ȳ)) / Σ((xi - x̄)²)\n- intercept = ȳ - slope × x̄\n\nExample:\n```\nlinearRegression([1, 2, 3, 4, 5], [2, 4, 5, 4, 5])\n// Returns: { slope: 0.6, intercept: 2.2 }\n```",
  starterCode: "",
  solution: "function linearRegression(x, y) {\n  const n = x.length;\n  const meanX = x.reduce((a, b) => a + b, 0) / n;\n  const meanY = y.reduce((a, b) => a + b, 0) / n;\n  let num = 0, den = 0;\n  for (let i = 0; i < n; i++) {\n    const dx = x[i] - meanX;\n    num += dx * (y[i] - meanY);\n    den += dx * dx;\n  }\n  const slope = Math.round((num / den) * 10000) / 10000;\n  const intercept = Math.round((meanY - slope * meanX) * 10000) / 10000;\n  return { slope, intercept };\n}",
  testRunner: `(code) => {
  const fn = new Function(code + '; return linearRegression;')();
  const eq = (a, b) => JSON.stringify(a) === JSON.stringify(b);
  const results = [];
  results.push({ pass: eq(fn([1, 2, 3, 4, 5], [2, 4, 5, 4, 5]), { slope: 0.6, intercept: 2.2 }), description: 'regression of [1-5] vs [2,4,5,4,5]', got: JSON.stringify(fn([1, 2, 3, 4, 5], [2, 4, 5, 4, 5])) });
  results.push({ pass: eq(fn([1, 2, 3], [2, 4, 6]), { slope: 2, intercept: 0 }), description: 'perfect linear y=2x', got: JSON.stringify(fn([1, 2, 3], [2, 4, 6])) });
  results.push({ pass: eq(fn([0, 1, 2, 3], [1, 3, 5, 7]), { slope: 2, intercept: 1 }), description: 'perfect linear y=2x+1', got: JSON.stringify(fn([0, 1, 2, 3], [1, 3, 5, 7])) });
  const r4 = fn([1, 2, 3, 4], [1, 2, 1.3, 3.75]);
  results.push({ pass: r4.slope === 0.755 && r4.intercept === 0.125, description: 'regression with non-perfect fit', got: JSON.stringify(r4) });
  results.push({ pass: eq(fn([10, 20], [5, 15]), { slope: 1, intercept: -5 }), description: 'two-point regression', got: JSON.stringify(fn([10, 20], [5, 15])) });
  return results;
}`,
  testCases: [],
  hints: [
    "Compute the means of both x and y. The slope uses the same numerator as correlation but divided only by Σ(xi - x̄)². The intercept follows from the point (x̄, ȳ).",
    "Accumulate `(x[i]-meanX)*(y[i]-meanY)` for the numerator and `(x[i]-meanX)²` for the denominator. Then `intercept = meanY - slope * meanX`."
  ],
  resources: [
    { label: "MDN: Arithmetic operators", url: "/docs/mdn/arithmetic-operators.html" }
  ],
  solutionGate: 10,
  basePoints: 75
});

// ─── T4-2: Histogram ────────────────────────────────────────────────────────
exercises.push({
  id: id(),
  title: "Statistics: Histogram",
  type: "js",
  tier: 4,
  category: ["math", "statistics"],
  tags: ["math", "statistics", "histogram", "binning"],
  description: "Group numeric data into equal-width bins and count frequencies.",
  instructions: "Write a function called `histogram` that takes an array of numbers `data` and a number of bins `numBins`, and returns an array of objects describing each bin.\n\nEach bin object has:\n- `min`: lower bound (inclusive)\n- `max`: upper bound (exclusive, except last bin which is inclusive)\n- `count`: number of data points in the bin\n\nBins should span from `Math.min(data)` to `Math.max(data)` evenly.\n\nExample:\n```\nhistogram([1, 2, 3, 4, 5, 6], 3)\n// Returns: [\n//   { min: 1, max: 2.67, count: 2 },\n//   { min: 2.67, max: 4.33, count: 2 },\n//   { min: 4.33, max: 6, count: 2 }\n// ]\n```",
  starterCode: "",
  solution: "function histogram(data, numBins) {\n  const min = Math.min(...data);\n  const max = Math.max(...data);\n  const width = (max - min) / numBins;\n  const bins = [];\n  for (let i = 0; i < numBins; i++) {\n    const binMin = Math.round((min + i * width) * 100) / 100;\n    const binMax = Math.round((min + (i + 1) * width) * 100) / 100;\n    bins.push({ min: binMin, max: binMax, count: 0 });\n  }\n  for (const val of data) {\n    let idx = Math.floor((val - min) / width);\n    if (idx === numBins) idx = numBins - 1;\n    bins[idx].count++;\n  }\n  return bins;\n}",
  testRunner: `(code) => {
  const fn = new Function(code + '; return histogram;')();
  const eq = (a, b) => JSON.stringify(a) === JSON.stringify(b);
  const results = [];
  const r1 = fn([1, 2, 3, 4, 5, 6], 3);
  results.push({ pass: r1.length === 3, description: '3 bins for 3-bin histogram', got: String(r1.length) });
  results.push({ pass: r1[0].count + r1[1].count + r1[2].count === 6, description: 'all 6 data points assigned to bins', got: String(r1[0].count + r1[1].count + r1[2].count) });
  results.push({ pass: r1[0].min === 1 && r1[2].max === 6, description: 'bins span from min to max', got: r1[0].min + ' to ' + r1[2].max });
  const r2 = fn([10, 10, 10, 20, 20, 30], 2);
  results.push({ pass: r2.length === 2, description: '2 bins created', got: String(r2.length) });
  results.push({ pass: r2[0].count === 3 && r2[1].count === 3, description: 'correct counts for [10,10,10,20,20,30] with 2 bins', got: r2[0].count + ',' + r2[1].count });
  const r3 = fn([1, 2, 3, 4], 4);
  results.push({ pass: r3.length === 4, description: '4 bins for 4-bin histogram', got: String(r3.length) });
  results.push({ pass: r3[3].count >= 1, description: 'max value falls in last bin', got: String(r3[3].count) });
  return results;
}`,
  testCases: [],
  hints: [
    "Find the range (max - min), divide by `numBins` to get bin width. Assign each value to a bin based on its position.",
    "Compute `idx = Math.floor((value - min) / width)`. Clamp `idx` to `numBins - 1` to handle the maximum value (which would otherwise be out of range)."
  ],
  resources: [
    { label: "MDN: Math.min()", url: "/docs/mdn/math-min.html" }
  ],
  solutionGate: 10,
  basePoints: 75
});

// ─── T4-3: Probability Distributions ────────────────────────────────────────
exercises.push({
  id: id(),
  title: "Statistics: Normal Distribution",
  type: "js",
  tier: 4,
  category: ["math", "statistics"],
  tags: ["math", "statistics", "probability", "normal-distribution"],
  description: "Compute the probability density function (PDF) and cumulative distribution function (CDF) of a normal distribution.",
  instructions: "Write a function called `normalDist` that takes a value `x`, a `mean`, and a `stdDev`, and returns an object with:\n- `pdf`: the probability density at x, rounded to 6 decimal places\n- `cdf`: the cumulative probability P(X ≤ x), rounded to 4 decimal places\n\nPDF formula: (1 / (σ√(2π))) × e^(-(x-μ)² / (2σ²))\n\nFor CDF, use the approximation: 0.5 × (1 + erf((x - μ) / (σ√2)))\nwhere erf(z) ≈ 1 - (1/(1 + 0.3275911×|z|)^(a₁t + a₂t² + a₃t³ + a₄t⁴ + a₅t⁵)) × e^(-z²)\nwith t = 1/(1 + 0.3275911×|z|), a₁=0.254829592, a₂=-0.284496736, a₃=1.421413741, a₄=-1.453152027, a₅=1.061405429\n\nExample:\n```\nnormalDist(0, 0, 1)  // Returns: { pdf: 0.398942, cdf: 0.5 }\nnormalDist(1, 0, 1)  // Returns: { pdf: 0.241971, cdf: 0.8413 }\n```",
  starterCode: "",
  solution: "function normalDist(x, mean, stdDev) {\n  // PDF\n  const exp = Math.exp(-((x - mean) ** 2) / (2 * stdDev ** 2));\n  const pdf = (1 / (stdDev * Math.sqrt(2 * Math.PI))) * exp;\n  \n  // CDF using error function approximation\n  const z = (x - mean) / (stdDev * Math.sqrt(2));\n  const a1 = 0.254829592, a2 = -0.284496736, a3 = 1.421413741;\n  const a4 = -1.453152027, a5 = 1.061405429, p = 0.3275911;\n  const sign = z < 0 ? -1 : 1;\n  const absZ = Math.abs(z);\n  const t = 1 / (1 + p * absZ);\n  const erf = 1 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-(absZ * absZ));\n  const cdf = 0.5 * (1 + sign * erf);\n  \n  return {\n    pdf: Math.round(pdf * 1000000) / 1000000,\n    cdf: Math.round(cdf * 10000) / 10000\n  };\n}",
  testRunner: `(code) => {
  const fn = new Function(code + '; return normalDist;')();
  const eq = (a, b) => JSON.stringify(a) === JSON.stringify(b);
  const results = [];
  results.push({ pass: eq(fn(0, 0, 1), { pdf: 0.398942, cdf: 0.5 }), description: 'standard normal at x=0', got: JSON.stringify(fn(0, 0, 1)) });
  results.push({ pass: eq(fn(1, 0, 1), { pdf: 0.241971, cdf: 0.8413 }), description: 'standard normal at x=1', got: JSON.stringify(fn(1, 0, 1)) });
  results.push({ pass: eq(fn(-1, 0, 1), { pdf: 0.241971, cdf: 0.1587 }), description: 'standard normal at x=-1', got: JSON.stringify(fn(-1, 0, 1)) });
  const r4 = fn(10, 10, 5);
  results.push({ pass: r4.pdf === 0.079788 && r4.cdf === 0.5, description: 'normal at mean has cdf=0.5', got: JSON.stringify(r4) });
  const r5 = fn(2, 0, 1);
  results.push({ pass: r5.cdf === 0.9772, description: 'standard normal at x=2 cdf ≈ 0.9772', got: JSON.stringify(r5) });
  results.push({ pass: fn(-2, 0, 1).cdf === 0.0228, description: 'standard normal at x=-2 cdf ≈ 0.0228', got: JSON.stringify(fn(-2, 0, 1)) });
  return results;
}`,
  testCases: [],
  hints: [
    "The PDF is a direct formula application. For the CDF, implement the error function approximation using the Horner's method polynomial evaluation.",
    "For the error function, compute `t = 1/(1 + p*|z|)` then evaluate the polynomial `((((a5*t+a4)*t+a3)*t+a2)*t+a1)*t`. Handle the sign of z separately for the final CDF."
  ],
  resources: [
    { label: "MDN: Math.exp()", url: "/docs/mdn/math-exp.html" }
  ],
  solutionGate: 10,
  basePoints: 75
});

// ─── T4-4: Outlier Detection ────────────────────────────────────────────────
exercises.push({
  id: id(),
  title: "Statistics: Outlier Detection (IQR)",
  type: "js",
  tier: 4,
  category: ["math", "statistics"],
  tags: ["math", "statistics", "outliers", "iqr", "quartiles"],
  description: "Detect outliers using the Interquartile Range (IQR) method.",
  instructions: "Write a function called `detectOutliers` that takes an array of numbers and returns an object with:\n- `q1`: first quartile (25th percentile), rounded to 2 decimal places\n- `q3`: third quartile (75th percentile), rounded to 2 decimal places\n- `iqr`: interquartile range (Q3 - Q1), rounded to 2 decimal places\n- `lowerFence`: Q1 - 1.5 × IQR, rounded to 2 decimal places\n- `upperFence`: Q3 + 1.5 × IQR, rounded to 2 decimal places\n- `outliers`: sorted array of values outside the fences\n\nUse linear interpolation for quartiles (same method as the percentile exercise).\n\nExample:\n```\ndetectOutliers([1, 2, 3, 4, 5, 100])\n// Returns: { q1: 2.25, q3: 4.75, iqr: 2.5, lowerFence: -1.5, upperFence: 8.5, outliers: [100] }\n```",
  starterCode: "",
  solution: "function detectOutliers(data) {\n  const sorted = [...data].sort((a, b) => a - b);\n  function pctile(arr, k) {\n    const idx = (k / 100) * (arr.length - 1);\n    const lo = Math.floor(idx);\n    const hi = Math.ceil(idx);\n    if (lo === hi) return arr[lo];\n    const frac = idx - lo;\n    return Math.round((arr[lo] + frac * (arr[hi] - arr[lo])) * 100) / 100;\n  }\n  const q1 = pctile(sorted, 25);\n  const q3 = pctile(sorted, 75);\n  const iqr = Math.round((q3 - q1) * 100) / 100;\n  const lowerFence = Math.round((q1 - 1.5 * iqr) * 100) / 100;\n  const upperFence = Math.round((q3 + 1.5 * iqr) * 100) / 100;\n  const outliers = sorted.filter(v => v < lowerFence || v > upperFence);\n  return { q1, q3, iqr, lowerFence, upperFence, outliers };\n}",
  testRunner: `(code) => {
  const fn = new Function(code + '; return detectOutliers;')();
  const eq = (a, b) => JSON.stringify(a) === JSON.stringify(b);
  const results = [];
  const r1 = fn([1, 2, 3, 4, 5, 100]);
  results.push({ pass: r1.q1 === 2.25, description: 'Q1 of [1,2,3,4,5,100] is 2.25', got: String(r1.q1) });
  results.push({ pass: r1.q3 === 4.75, description: 'Q3 of [1,2,3,4,5,100] is 4.75', got: String(r1.q3) });
  results.push({ pass: r1.iqr === 2.5, description: 'IQR is 2.5', got: String(r1.iqr) });
  results.push({ pass: eq(r1.outliers, [100]), description: '100 is detected as outlier', got: JSON.stringify(r1.outliers) });
  const r2 = fn([10, 12, 14, 15, 16, 18, 20]);
  results.push({ pass: r2.outliers.length === 0, description: 'no outliers in normal distribution', got: JSON.stringify(r2.outliers) });
  const r3 = fn([-100, 1, 2, 3, 4, 5, 200]);
  results.push({ pass: r3.outliers.length === 2, description: 'both -100 and 200 are outliers', got: JSON.stringify(r3.outliers) });
  return results;
}`,
  testCases: [],
  hints: [
    "Find Q1 (25th percentile) and Q3 (75th percentile) using interpolation. The IQR is Q3 - Q1. Fences are Q1 - 1.5×IQR and Q3 + 1.5×IQR.",
    "Reuse the percentile interpolation logic: `idx = (k/100) * (n-1)`, then interpolate between `sorted[floor(idx)]` and `sorted[ceil(idx)]`. Filter values outside the fences for outliers."
  ],
  resources: [
    { label: "MDN: Array.prototype.filter()", url: "/docs/mdn/array-filter.html" }
  ],
  solutionGate: 10,
  basePoints: 75
});

// ─── T5-1: Statistical Analysis Toolkit ─────────────────────────────────────
exercises.push({
  id: id(),
  title: "Statistics: Complete Analysis Toolkit",
  type: "js",
  tier: 5,
  category: ["math", "statistics"],
  tags: ["math", "statistics", "comprehensive", "analysis"],
  description: "Build a comprehensive statistical analysis toolkit that computes descriptive statistics, detects outliers, and performs regression analysis.",
  instructions: "Build three functions that work together:\n\n**`describe(data)`** — Returns descriptive statistics:\n- `count`, `min`, `max`\n- `mean`, `median`, `mode` (array, sorted)\n- `stdDev`, `variance` (population)\n- All numeric values rounded to 4 decimal places\n\n**`removeOutliers(data)`** — Returns a new array with outliers removed using the IQR method (1.5 × IQR fences). Use linear interpolation for quartiles.\n\n**`bestFit(x, y)`** — Returns an object with:\n- `slope`, `intercept` (rounded to 4 decimal places)\n- `rSquared`: coefficient of determination (rounded to 4 decimal places)\n- `predict(x)`: a function that returns the predicted y value (rounded to 4 decimal places)\n\nR² = 1 - (Σ(yi - ŷi)² / Σ(yi - ȳ)²) where ŷi = slope × xi + intercept",
  starterCode: "",
  solution: `function describe(data) {
  const sorted = [...data].sort((a, b) => a - b);
  const n = sorted.length;
  const r4 = v => Math.round(v * 10000) / 10000;
  const mean = r4(sorted.reduce((a, b) => a + b, 0) / n);
  const mid = Math.floor(n / 2);
  const median = n % 2 === 0 ? r4((sorted[mid - 1] + sorted[mid]) / 2) : sorted[mid];
  const freq = {};
  for (const v of sorted) freq[v] = (freq[v] || 0) + 1;
  const maxFreq = Math.max(...Object.values(freq));
  const mode = Object.keys(freq).filter(k => freq[k] === maxFreq).map(Number).sort((a, b) => a - b);
  const variance = r4(sorted.reduce((s, x) => s + (x - mean) ** 2, 0) / n);
  const stdDev = r4(Math.sqrt(sorted.reduce((s, x) => s + (x - mean) ** 2, 0) / n));
  return { count: n, min: sorted[0], max: sorted[n - 1], mean, median, mode, stdDev, variance };
}

function removeOutliers(data) {
  const sorted = [...data].sort((a, b) => a - b);
  function pctile(arr, k) {
    const idx = (k / 100) * (arr.length - 1);
    const lo = Math.floor(idx);
    const hi = Math.ceil(idx);
    if (lo === hi) return arr[lo];
    return arr[lo] + (idx - lo) * (arr[hi] - arr[lo]);
  }
  const q1 = pctile(sorted, 25);
  const q3 = pctile(sorted, 75);
  const iqr = q3 - q1;
  const lower = q1 - 1.5 * iqr;
  const upper = q3 + 1.5 * iqr;
  return data.filter(v => v >= lower && v <= upper);
}

function bestFit(x, y) {
  const n = x.length;
  const r4 = v => Math.round(v * 10000) / 10000;
  const meanX = x.reduce((a, b) => a + b, 0) / n;
  const meanY = y.reduce((a, b) => a + b, 0) / n;
  let num = 0, den = 0;
  for (let i = 0; i < n; i++) {
    const dx = x[i] - meanX;
    num += dx * (y[i] - meanY);
    den += dx * dx;
  }
  const slope = r4(num / den);
  const intercept = r4(meanY - slope * meanX);
  let ssRes = 0, ssTot = 0;
  for (let i = 0; i < n; i++) {
    const predicted = slope * x[i] + intercept;
    ssRes += (y[i] - predicted) ** 2;
    ssTot += (y[i] - meanY) ** 2;
  }
  const rSquared = r4(1 - ssRes / ssTot);
  return { slope, intercept, rSquared, predict: (xVal) => r4(slope * xVal + intercept) };
}`,
  testRunner: `(code) => {
  const fn = new Function(code + '; return { describe, removeOutliers, bestFit };')();
  const eq = (a, b) => JSON.stringify(a) === JSON.stringify(b);
  const results = [];

  // describe tests
  const d1 = fn.describe([2, 4, 4, 4, 5, 5, 7, 9]);
  results.push({ pass: d1.count === 8 && d1.min === 2 && d1.max === 9, description: 'describe: count, min, max correct', got: d1.count + ',' + d1.min + ',' + d1.max });
  results.push({ pass: d1.mean === 5 && d1.median === 4.5, description: 'describe: mean=5, median=4.5', got: d1.mean + ',' + d1.median });
  results.push({ pass: eq(d1.mode, [4]), description: 'describe: mode is [4]', got: JSON.stringify(d1.mode) });
  results.push({ pass: d1.stdDev === 2, description: 'describe: stdDev=2', got: String(d1.stdDev) });

  // removeOutliers tests
  const cleaned = fn.removeOutliers([1, 2, 3, 4, 5, 100]);
  results.push({ pass: !cleaned.includes(100), description: 'removeOutliers removes 100', got: JSON.stringify(cleaned) });
  results.push({ pass: fn.removeOutliers([10, 11, 12, 13, 14]).length === 5, description: 'removeOutliers keeps normal data', got: String(fn.removeOutliers([10, 11, 12, 13, 14]).length) });

  // bestFit tests
  const bf = fn.bestFit([1, 2, 3, 4, 5], [2, 4, 6, 8, 10]);
  results.push({ pass: bf.slope === 2 && bf.intercept === 0, description: 'bestFit: perfect y=2x', got: bf.slope + ',' + bf.intercept });
  results.push({ pass: bf.rSquared === 1, description: 'bestFit: rSquared=1 for perfect fit', got: String(bf.rSquared) });
  results.push({ pass: bf.predict(6) === 12, description: 'bestFit: predict(6)=12', got: String(bf.predict(6)) });

  const bf2 = fn.bestFit([1, 2, 3, 4, 5], [2, 4, 5, 4, 5]);
  results.push({ pass: bf2.slope === 0.6 && bf2.intercept === 2.2, description: 'bestFit: imperfect regression', got: bf2.slope + ',' + bf2.intercept });
  results.push({ pass: bf2.predict(10) === 8.2, description: 'bestFit: predict(10)=8.2', got: String(bf2.predict(10)) });

  return results;
}`,
  testCases: [],
  hints: [
    "Break this into three independent functions. `describe` needs mean, median, mode, and standard deviation. `removeOutliers` uses the IQR method. `bestFit` is linear regression plus R².",
    "For R², compute `ssRes = Σ(yi - predicted)²` and `ssTot = Σ(yi - meanY)²`, then `R² = 1 - ssRes/ssTot`. The `predict` function returns a closure: `(xVal) => slope * xVal + intercept`."
  ],
  resources: [
    { label: "MDN: Closures", url: "/docs/mdn/closures.html" },
    { label: "MDN: Array.prototype.reduce()", url: "/docs/mdn/array-reduce.html" }
  ],
  solutionGate: 10,
  basePoints: 100
});

// ── append to collection ────────────────────────────────────────────────────

collection.exercises.push(...exercises);
fs.writeFileSync(COLLECTION_FILE, JSON.stringify(collection, null, 2));
console.log(`✅ Section 3: Statistics — ${exercises.length} exercises appended (IDs ${exercises[0].id}-${exercises[exercises.length - 1].id})`);
console.log(`   Collection total: ${collection.exercises.length} exercises`);
