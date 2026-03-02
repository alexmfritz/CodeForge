#!/usr/bin/env node
/**
 * Generator: T3 Callback Array Methods — Method Chaining + Combined Applications
 * (10 exercises, IDs 1209-1218)
 *
 * Completes T3 Section 1: Callback Array Methods
 *
 * Usage:
 *   node exercises/_gen_t3_callback_chaining_apps.js            # Append to curriculum
 *   node exercises/_gen_t3_callback_chaining_apps.js --validate  # Validate testRunners only
 */

const fs = require('fs');
const path = require('path');

const CURRICULUM_PATH = path.join(
  __dirname,
  'collections',
  'default-curriculum.json'
);

// ─── Resources (MDN only for T3) ────────────────────────────────────────────

const chainingRes = [
  { label: 'MDN: Array.prototype.filter()', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter', description: 'filter reference' },
  { label: 'MDN: Array.prototype.map()', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map', description: 'map reference' },
  { label: 'MDN: Array.prototype.reduce()', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce', description: 'reduce reference' },
];

const combinedRes = [
  { label: 'MDN: Array', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array', description: 'Array methods reference' },
];

// ─── Exercise Definitions ───────────────────────────────────────────────────

const exercises = [

  // ══════════════════════════════════════════════════════════════════════════
  // SUB-SECTION 8: Method Chaining (5 exercises, IDs 1209-1213)
  // ══════════════════════════════════════════════════════════════════════════

  // 1. Method Chaining: Filter and Map (ENTRY POINT)
  {
    id: 1209,
    title: 'Method Chaining: Filter and Map',
    type: 'js',
    tier: 3,
    category: ['js-fundamentals', 'callback-methods'],
    tags: ['chaining', 'filter', 'map', 'callbacks'],
    description:
      'Chain filter and map to select and transform elements in one expression.',
    instructions:
      'Method chaining lets you call multiple array methods back-to-back. Each method returns a new array, which the next method operates on: `arr.filter(...).map(...)`. This avoids intermediate variables and reads like a pipeline.\n\nWrite a function that filters an array to keep only even numbers, then doubles each one — all in a single chained expression (see `@param`/`@returns` in the starter code).\n\nExample: `getEvenDoubles([1, 2, 3, 4, 5, 6])` returns `[4, 8, 12]`\nExample: `getEvenDoubles([1, 3, 5])` returns `[]`',
    starterCode:
      '/**\n * Chain .filter() and .map() to keep only even numbers, then double them.\n *\n * @param {number[]} nums - Array of numbers\n * @returns {number[]} Even numbers doubled\n */\nfunction getEvenDoubles(nums) {\n\n}\n',
    solution:
      'function getEvenDoubles(nums) {\n  return nums\n    .filter(function(n) { return n % 2 === 0; })\n    .map(function(n) { return n * 2; });\n}',
    testRunner: `(code) => {
  const fn = new Function(code + '; return getEvenDoubles;')();
  const r1 = fn([1, 2, 3, 4, 5, 6]);
  const r2 = fn([]);
  const r3 = fn([1, 3, 5]);
  const r4 = fn([2, 4, 6]);
  const r5 = fn([0, 1, 2]);
  const r6 = fn([10]);
  const r7 = fn([-2, -1, 0, 1, 2]);
  const r8 = fn([7]);
  const r9 = fn([100, 200, 301]);
  return [
    { pass: JSON.stringify(r1) === JSON.stringify([4, 8, 12]), description: '[1,2,3,4,5,6] → [4,8,12]', got: JSON.stringify(r1) },
    { pass: JSON.stringify(r2) === JSON.stringify([]), description: '[] → []', got: JSON.stringify(r2) },
    { pass: JSON.stringify(r3) === JSON.stringify([]), description: 'No evens → []', got: JSON.stringify(r3) },
    { pass: JSON.stringify(r4) === JSON.stringify([4, 8, 12]), description: 'All even: [2,4,6] → [4,8,12]', got: JSON.stringify(r4) },
    { pass: JSON.stringify(r5) === JSON.stringify([0, 4]), description: 'Zero is even: [0,1,2] → [0,4]', got: JSON.stringify(r5) },
    { pass: JSON.stringify(r6) === JSON.stringify([20]), description: 'Single even: [10] → [20]', got: JSON.stringify(r6) },
    { pass: JSON.stringify(r7) === JSON.stringify([-4, 0, 4]), description: 'Negative evens included: [-2,-1,0,1,2] → [-4,0,4]', got: JSON.stringify(r7) },
    { pass: JSON.stringify(r8) === JSON.stringify([]), description: 'Single odd → []', got: JSON.stringify(r8) },
    { pass: JSON.stringify(r9) === JSON.stringify([200, 400]), description: '[100,200,301] → [200,400]', got: JSON.stringify(r9) }
  ];
}`,
    hints: [
      'Chain two calls: first `.filter()` to keep evens (check `n % 2 === 0`), then `.map()` to double each remaining number.',
      'Return `nums.filter(function(n) { return n % 2 === 0; }).map(function(n) { return n * 2; })`. The filter result feeds directly into map.',
    ],
    resources: chainingRes,
  },

  // 2. Method Chaining: Map, Filter, and Reduce
  {
    id: 1210,
    title: 'Method Chaining: Map, Filter, and Reduce',
    type: 'js',
    tier: 3,
    category: ['js-fundamentals', 'callback-methods'],
    tags: ['chaining', 'map', 'filter', 'reduce', 'callbacks'],
    description:
      'Chain map, filter, and reduce to transform, select, and accumulate in one pipeline.',
    instructions:
      'Calculate the sum of squares of only the positive numbers. Chain `.filter()` to keep positives, `.map()` to square them, and `.reduce()` to sum the results.',
    starterCode:
      '/**\n * @param {number[]} nums - Array of numbers\n * @returns {number} Sum of squares of positive numbers\n */\nfunction sumOfSquaresOfPositives(nums) {\n\n}\n',
    solution:
      'function sumOfSquaresOfPositives(nums) {\n  return nums\n    .filter(function(n) { return n > 0; })\n    .map(function(n) { return n * n; })\n    .reduce(function(acc, n) { return acc + n; }, 0);\n}',
    testRunner: `(code) => {
  const fn = new Function(code + '; return sumOfSquaresOfPositives;')();
  const r1 = fn([1, 2, 3]);
  const r2 = fn([]);
  const r3 = fn([-1, -2, -3]);
  const r4 = fn([3, -4, 5]);
  const r5 = fn([1]);
  const r6 = fn([0, 1, 2]);
  const r7 = fn([-5, 0, 5]);
  const r8 = fn([2, 3, 4]);
  const r9 = fn([10, -10]);
  return [
    { pass: r1 === 14, description: '[1,2,3] → 1+4+9 = 14', got: String(r1) },
    { pass: r2 === 0, description: '[] → 0', got: String(r2) },
    { pass: r3 === 0, description: 'All negative → 0', got: String(r3) },
    { pass: r4 === 34, description: '[3,-4,5] → 9+25 = 34', got: String(r4) },
    { pass: r5 === 1, description: '[1] → 1', got: String(r5) },
    { pass: r6 === 5, description: '[0,1,2] → 1+4 = 5 (zero excluded)', got: String(r6) },
    { pass: r7 === 25, description: '[-5,0,5] → 25', got: String(r7) },
    { pass: r8 === 29, description: '[2,3,4] → 4+9+16 = 29', got: String(r8) },
    { pass: r9 === 100, description: '[10,-10] → 100', got: String(r9) }
  ];
}`,
    hints: [
      'Build a three-step pipeline: filter positives (`n > 0`), map each to its square (`n * n`), then reduce the squares to a sum.',
      'Chain: `.filter(function(n) { return n > 0; }).map(function(n) { return n * n; }).reduce(function(acc, n) { return acc + n; }, 0)`.',
    ],
    resources: chainingRes,
  },

  // 3. Method Chaining: Sort and Slice
  {
    id: 1211,
    title: 'Method Chaining: Sort and Slice',
    type: 'js',
    tier: 3,
    category: ['js-fundamentals', 'callback-methods'],
    tags: ['chaining', 'sort', 'slice', 'callbacks'],
    description:
      'Chain sort and slice to extract the top N values from an array.',
    instructions:
      'Return the top `n` largest numbers from the array, sorted from highest to lowest. Do not mutate the original array.',
    starterCode:
      '/**\n * @param {number[]} nums - Array of numbers\n * @param {number} n - How many top values to return\n * @returns {number[]} Top n values, sorted descending\n */\nfunction topN(nums, n) {\n\n}\n',
    solution:
      'function topN(nums, n) {\n  return nums\n    .slice()\n    .sort(function(a, b) { return b - a; })\n    .slice(0, n);\n}',
    testRunner: `(code) => {
  const fn = new Function(code + '; return topN;')();
  const r1 = fn([3, 1, 4, 1, 5, 9, 2, 6], 3);
  const r2 = fn([], 3);
  const r3 = fn([5, 3, 8], 5);
  const r4 = fn([10, 20, 30], 0);
  const r5 = fn([7], 1);
  const r6 = fn([5, 5, 5, 5], 2);
  const r7 = fn([-3, -1, -4, -1, -5], 2);
  const r8 = fn([100, 50, 75, 25], 2);
  const input = [3, 1, 2];
  const r9 = fn(input, 2);
  return [
    { pass: JSON.stringify(r1) === JSON.stringify([9, 6, 5]), description: 'Top 3 of [3,1,4,1,5,9,2,6] → [9,6,5]', got: JSON.stringify(r1) },
    { pass: JSON.stringify(r2) === JSON.stringify([]), description: 'Empty array → []', got: JSON.stringify(r2) },
    { pass: JSON.stringify(r3) === JSON.stringify([8, 5, 3]), description: 'n > array length returns all sorted desc', got: JSON.stringify(r3) },
    { pass: JSON.stringify(r4) === JSON.stringify([]), description: 'n=0 → []', got: JSON.stringify(r4) },
    { pass: JSON.stringify(r5) === JSON.stringify([7]), description: 'Single element, n=1 → [7]', got: JSON.stringify(r5) },
    { pass: JSON.stringify(r6) === JSON.stringify([5, 5]), description: 'Duplicates: top 2 of [5,5,5,5] → [5,5]', got: JSON.stringify(r6) },
    { pass: JSON.stringify(r7) === JSON.stringify([-1, -1]), description: 'Negatives: top 2 of [-3,-1,-4,-1,-5] → [-1,-1]', got: JSON.stringify(r7) },
    { pass: JSON.stringify(r8) === JSON.stringify([100, 75]), description: 'Top 2 of [100,50,75,25] → [100,75]', got: JSON.stringify(r8) },
    { pass: JSON.stringify(input) === JSON.stringify([3, 1, 2]), description: 'Does not mutate the original array', got: JSON.stringify(input) }
  ];
}`,
    hints: [
      'Use `.slice()` to copy, `.sort()` with a descending comparator (`b - a`), then `.slice(0, n)` to take the first n elements.',
      'Chain: `nums.slice().sort(function(a, b) { return b - a; }).slice(0, n)`. The first slice copies, sort reorders, second slice trims.',
    ],
    resources: chainingRes,
  },

  // 4. Method Chaining: Chain with Find
  {
    id: 1212,
    title: 'Method Chaining: Chain with Find',
    type: 'js',
    tier: 3,
    category: ['js-fundamentals', 'callback-methods'],
    tags: ['chaining', 'filter', 'sort', 'find', 'callbacks'],
    description:
      'Chain filter and sort to locate the cheapest in-stock product.',
    instructions:
      'Find the name of the cheapest in-stock product. Filter to products where `inStock` is `true`, sort by `price` ascending, and return the `name` of the first result. Return `null` if no products are in stock.',
    starterCode:
      '/**\n * @param {Object[]} products - Array of {name, price, inStock} objects\n * @returns {string|null} Name of cheapest in-stock product, or null\n */\nfunction findCheapestInStock(products) {\n\n}\n',
    solution:
      'function findCheapestInStock(products) {\n  var inStock = products\n    .filter(function(p) { return p.inStock; })\n    .sort(function(a, b) { return a.price - b.price; });\n  return inStock.length > 0 ? inStock[0].name : null;\n}',
    testRunner: `(code) => {
  const fn = new Function(code + '; return findCheapestInStock;')();
  const r1 = fn([{name:'A',price:30,inStock:true},{name:'B',price:10,inStock:false},{name:'C',price:20,inStock:true}]);
  const r2 = fn([]);
  const r3 = fn([{name:'A',price:50,inStock:false},{name:'B',price:30,inStock:false}]);
  const r4 = fn([{name:'X',price:5,inStock:true}]);
  const r5 = fn([{name:'A',price:10,inStock:true},{name:'B',price:10,inStock:true}]);
  const r6 = fn([{name:'Expensive',price:999,inStock:true},{name:'Cheap',price:1,inStock:true}]);
  const r7 = fn([{name:'Out',price:1,inStock:false},{name:'In',price:100,inStock:true}]);
  const r8 = fn([{name:'A',price:50,inStock:true},{name:'B',price:30,inStock:true},{name:'C',price:40,inStock:true}]);
  const r9 = fn([{name:'Solo',price:0,inStock:true}]);
  return [
    { pass: r1 === 'C', description: 'Cheapest in-stock: C at $20 (B is $10 but out of stock)', got: String(r1) },
    { pass: r2 === null, description: 'Empty array → null', got: String(r2) },
    { pass: r3 === null, description: 'None in stock → null', got: String(r3) },
    { pass: r4 === 'X', description: 'Single in-stock product → "X"', got: String(r4) },
    { pass: r5 === 'A' || r5 === 'B', description: 'Tied price — returns one of the tied products', got: String(r5) },
    { pass: r6 === 'Cheap', description: 'Cheapest of two in-stock products', got: String(r6) },
    { pass: r7 === 'In', description: 'Only in-stock product returned despite being more expensive', got: String(r7) },
    { pass: r8 === 'B', description: 'Three in-stock: cheapest is B at $30', got: String(r8) },
    { pass: r9 === 'Solo', description: 'Price of 0 is valid', got: String(r9) }
  ];
}`,
    hints: [
      'Filter to in-stock products, sort by price ascending, then check if any remain. If so, return the first product\'s name; otherwise return null.',
      'Chain `.filter(function(p) { return p.inStock; }).sort(function(a, b) { return a.price - b.price; })`, then check the result length before accessing `[0].name`.',
    ],
    resources: chainingRes,
  },

  // 5. Method Chaining: Complex Pipeline
  {
    id: 1213,
    title: 'Method Chaining: Complex Pipeline',
    type: 'js',
    tier: 3,
    category: ['js-fundamentals', 'callback-methods'],
    tags: ['chaining', 'filter', 'map', 'reduce', 'pipeline'],
    description:
      'Build a multi-step pipeline to process transaction data.',
    instructions:
      'Process an array of transactions. Filter to only `"completed"` transactions, extract their amounts, keep only positive amounts, and sum them.',
    starterCode:
      '/**\n * @param {Object[]} transactions - Array of {status, amount} objects\n * @returns {number} Sum of positive amounts from completed transactions\n */\nfunction processTransactions(transactions) {\n\n}\n',
    solution:
      'function processTransactions(transactions) {\n  return transactions\n    .filter(function(t) { return t.status === "completed"; })\n    .map(function(t) { return t.amount; })\n    .filter(function(a) { return a > 0; })\n    .reduce(function(acc, a) { return acc + a; }, 0);\n}',
    testRunner: `(code) => {
  const fn = new Function(code + '; return processTransactions;')();
  const r1 = fn([{status:'completed',amount:100},{status:'pending',amount:50},{status:'completed',amount:200}]);
  const r2 = fn([]);
  const r3 = fn([{status:'pending',amount:100},{status:'pending',amount:200}]);
  const r4 = fn([{status:'completed',amount:-50},{status:'completed',amount:100}]);
  const r5 = fn([{status:'completed',amount:75}]);
  const r6 = fn([{status:'completed',amount:0},{status:'completed',amount:10}]);
  const r7 = fn([{status:'completed',amount:-10},{status:'completed',amount:-20}]);
  const r8 = fn([{status:'completed',amount:10},{status:'failed',amount:100},{status:'completed',amount:20},{status:'pending',amount:50}]);
  const r9 = fn([{status:'completed',amount:1},{status:'completed',amount:2},{status:'completed',amount:3},{status:'completed',amount:4}]);
  return [
    { pass: r1 === 300, description: 'Two completed: 100+200 = 300', got: String(r1) },
    { pass: r2 === 0, description: 'Empty → 0', got: String(r2) },
    { pass: r3 === 0, description: 'No completed → 0', got: String(r3) },
    { pass: r4 === 100, description: 'Negative completed amount excluded: only 100', got: String(r4) },
    { pass: r5 === 75, description: 'Single completed positive → 75', got: String(r5) },
    { pass: r6 === 10, description: 'Zero amount excluded: only 10', got: String(r6) },
    { pass: r7 === 0, description: 'All completed but negative → 0', got: String(r7) },
    { pass: r8 === 30, description: 'Mixed statuses: only completed positives (10+20)', got: String(r8) },
    { pass: r9 === 10, description: 'Four completed positives: 1+2+3+4 = 10', got: String(r9) }
  ];
}`,
    hints: [
      'Build a four-step chain: filter by status, map to extract amounts, filter to keep positives, reduce to sum. Each step feeds into the next.',
      'Chain `.filter(status === "completed").map(get amount).filter(amount > 0).reduce(sum, 0)`. Each method returns a new array for the next to work with.',
    ],
    resources: chainingRes,
  },

  // ══════════════════════════════════════════════════════════════════════════
  // SUB-SECTION 9: Combined Applications (5 exercises, IDs 1214-1218)
  // ══════════════════════════════════════════════════════════════════════════

  // 6. Callback Methods: Top Words
  {
    id: 1214,
    title: 'Callback Methods: Top Words',
    type: 'js',
    tier: 3,
    category: ['js-fundamentals', 'callback-methods'],
    tags: ['reduce', 'map', 'sort', 'slice', 'strings', 'application'],
    description:
      'Combine multiple callback methods to find the most frequent words in a text.',
    instructions:
      'Find the top `n` most frequent words in a text string. Split the text into lowercase words, count occurrences, and return the top n as an array of `{word, count}` objects sorted by count descending. Ignore empty strings from splitting.',
    starterCode:
      '/**\n * @param {string} text - Space-separated text\n * @param {number} n - Number of top words to return\n * @returns {Object[]} Array of {word, count} sorted by count descending\n */\nfunction topWords(text, n) {\n\n}\n',
    solution:
      'function topWords(text, n) {\n  var words = text.toLowerCase().split(" ").filter(function(w) { return w.length > 0; });\n  var counts = words.reduce(function(acc, w) {\n    acc[w] = (acc[w] || 0) + 1;\n    return acc;\n  }, {});\n  return Object.keys(counts)\n    .map(function(w) { return { word: w, count: counts[w] }; })\n    .sort(function(a, b) { return b.count - a.count; })\n    .slice(0, n);\n}',
    testRunner: `(code) => {
  const fn = new Function(code + '; return topWords;')();
  const r1 = fn('the cat sat on the mat', 2);
  const r2 = fn('', 3);
  const r3 = fn('hello', 1);
  const r4 = fn('a a a b b c', 1);
  const r5 = fn('a a a b b c', 3);
  const r6 = fn('x y z', 5);
  const r7 = fn('Hello hello HELLO', 1);
  const r8 = fn('one two three', 2);
  const r9 = fn('the the the a a b', 0);
  return [
    { pass: JSON.stringify(r1) === JSON.stringify([{word:'the',count:2},{word:'cat',count:1}]) || (r1.length === 2 && r1[0].word === 'the' && r1[0].count === 2 && r1[1].count === 1), description: 'Top 2 of "the cat sat on the mat" → the(2) + one with count 1', got: JSON.stringify(r1) },
    { pass: JSON.stringify(r2) === JSON.stringify([]), description: 'Empty string → []', got: JSON.stringify(r2) },
    { pass: JSON.stringify(r3) === JSON.stringify([{word:'hello',count:1}]), description: 'Single word → [{word:"hello",count:1}]', got: JSON.stringify(r3) },
    { pass: r4.length === 1 && r4[0].word === 'a' && r4[0].count === 3, description: 'Top 1 of "a a a b b c" → a(3)', got: JSON.stringify(r4) },
    { pass: r5.length === 3 && r5[0].count === 3 && r5[1].count === 2 && r5[2].count === 1, description: 'Top 3 sorted by count desc', got: JSON.stringify(r5) },
    { pass: r6.length === 3, description: 'n > unique words returns all', got: JSON.stringify(r6) },
    { pass: r7.length === 1 && r7[0].word === 'hello' && r7[0].count === 3, description: 'Case-insensitive: "Hello hello HELLO" → hello(3)', got: JSON.stringify(r7) },
    { pass: r8.length === 2 && r8[0].count === 1 && r8[1].count === 1, description: 'All unique: top 2 each with count 1', got: JSON.stringify(r8) },
    { pass: JSON.stringify(r9) === JSON.stringify([]), description: 'n=0 → []', got: JSON.stringify(r9) }
  ];
}`,
    hints: [
      'Split and lowercase the text, filter empty strings, reduce to a counts object, convert keys to {word, count} objects with map, sort by count descending, then slice.',
      'Pipeline: `text.toLowerCase().split(" ")` → `.filter()` → `.reduce()` to tally → `Object.keys(counts).map()` → `.sort()` → `.slice(0, n)`.',
    ],
    resources: combinedRes,
  },

  // 7. Callback Methods: Grade Analyzer
  {
    id: 1215,
    title: 'Callback Methods: Grade Analyzer',
    type: 'js',
    tier: 3,
    category: ['js-fundamentals', 'callback-methods'],
    tags: ['map', 'reduce', 'filter', 'sort', 'analysis', 'application'],
    description:
      'Combine callback methods to produce a statistical summary of student grades.',
    instructions:
      'Analyze an array of student objects. Return an object with: `average` (mean grade), `highest` (max grade), `lowest` (min grade), `passing` (count with grade >= 60), and `failing` (count with grade < 60).',
    starterCode:
      '/**\n * @param {Object[]} students - Array of {name, grade} objects (non-empty)\n * @param {string} students[].name\n * @param {number} students[].grade\n * @returns {{ average: number, highest: number, lowest: number, passing: number, failing: number }}\n */\nfunction analyzeGrades(students) {\n\n}\n',
    solution:
      'function analyzeGrades(students) {\n  var grades = students.map(function(s) { return s.grade; });\n  var sum = grades.reduce(function(acc, g) { return acc + g; }, 0);\n  var sorted = grades.slice().sort(function(a, b) { return a - b; });\n  var passing = grades.filter(function(g) { return g >= 60; });\n  return {\n    average: sum / grades.length,\n    highest: sorted[sorted.length - 1],\n    lowest: sorted[0],\n    passing: passing.length,\n    failing: grades.length - passing.length\n  };\n}',
    testRunner: `(code) => {
  const fn = new Function(code + '; return analyzeGrades;')();
  const r1 = fn([{name:'A',grade:90},{name:'B',grade:70},{name:'C',grade:50}]);
  const r2 = fn([{name:'A',grade:100}]);
  const r3 = fn([{name:'A',grade:100},{name:'B',grade:100},{name:'C',grade:100}]);
  const r4 = fn([{name:'A',grade:50},{name:'B',grade:40},{name:'C',grade:30}]);
  const r5 = fn([{name:'A',grade:60},{name:'B',grade:59}]);
  const r6 = fn([{name:'A',grade:0},{name:'B',grade:100}]);
  const r7 = fn([{name:'A',grade:80},{name:'B',grade:80},{name:'C',grade:80},{name:'D',grade:80}]);
  const r8 = fn([{name:'A',grade:95},{name:'B',grade:85},{name:'C',grade:75},{name:'D',grade:65},{name:'E',grade:55}]);
  return [
    { pass: r1.average === 70 && r1.highest === 90 && r1.lowest === 50 && r1.passing === 2 && r1.failing === 1, description: '[90,70,50]: avg 70, high 90, low 50, 2 pass, 1 fail', got: JSON.stringify(r1) },
    { pass: r2.average === 100 && r2.highest === 100 && r2.lowest === 100 && r2.passing === 1 && r2.failing === 0, description: 'Single student: 100 across all stats', got: JSON.stringify(r2) },
    { pass: r3.average === 100 && r3.passing === 3, description: 'All 100: avg 100, 3 passing', got: JSON.stringify(r3) },
    { pass: r4.average === 40 && r4.passing === 0 && r4.failing === 3, description: 'All failing: avg 40, 0 passing, 3 failing', got: JSON.stringify(r4) },
    { pass: r5.passing === 1 && r5.failing === 1, description: '60 passes, 59 fails (boundary)', got: JSON.stringify(r5) },
    { pass: r6.highest === 100 && r6.lowest === 0 && r6.average === 50, description: '[0,100]: high 100, low 0, avg 50', got: JSON.stringify(r6) },
    { pass: r7.average === 80 && r7.highest === 80 && r7.lowest === 80, description: 'All same grade: consistent stats', got: JSON.stringify(r7) },
    { pass: r8.average === 75 && r8.highest === 95 && r8.lowest === 55 && r8.passing === 4 && r8.failing === 1, description: 'Five students: avg 75, 4 pass, 1 fail', got: JSON.stringify(r8) }
  ];
}`,
    hints: [
      'Use `.map()` to extract grades, `.reduce()` for the sum, `.sort()` to find highest and lowest, and `.filter()` to count passing. Combine all into a return object.',
      'Extract grades first: `students.map(function(s) { return s.grade; })`. Then build each stat: sum/length for average, sorted ends for high/low, filter for passing count.',
    ],
    resources: combinedRes,
  },

  // 8. Callback Methods: Inventory Manager
  {
    id: 1216,
    title: 'Callback Methods: Inventory Manager',
    type: 'js',
    tier: 3,
    category: ['js-fundamentals', 'callback-methods'],
    tags: ['reduce', 'filter', 'sort', 'objects', 'application'],
    description:
      'Combine callback methods to summarize product inventory data.',
    instructions:
      'Summarize an array of products. Return an object with: `totalValue` (sum of price * quantity for all products), `inStock` (count where quantity > 0), `outOfStock` (count where quantity === 0), and `mostExpensive` (name of the product with the highest price).',
    starterCode:
      '/**\n * @param {Object[]} products - Array of {name, price, quantity} objects (non-empty)\n * @returns {{ totalValue: number, inStock: number, outOfStock: number, mostExpensive: string }}\n */\nfunction inventorySummary(products) {\n\n}\n',
    solution:
      'function inventorySummary(products) {\n  var totalValue = products.reduce(function(acc, p) { return acc + p.price * p.quantity; }, 0);\n  var inStock = products.filter(function(p) { return p.quantity > 0; }).length;\n  var sorted = products.slice().sort(function(a, b) { return b.price - a.price; });\n  return {\n    totalValue: totalValue,\n    inStock: inStock,\n    outOfStock: products.length - inStock,\n    mostExpensive: sorted[0].name\n  };\n}',
    testRunner: `(code) => {
  const fn = new Function(code + '; return inventorySummary;')();
  const r1 = fn([{name:'A',price:10,quantity:5},{name:'B',price:20,quantity:0},{name:'C',price:15,quantity:3}]);
  const r2 = fn([{name:'Solo',price:100,quantity:1}]);
  const r3 = fn([{name:'A',price:10,quantity:0},{name:'B',price:20,quantity:0}]);
  const r4 = fn([{name:'A',price:5,quantity:10},{name:'B',price:5,quantity:10}]);
  const r5 = fn([{name:'Cheap',price:1,quantity:100},{name:'Pricey',price:1000,quantity:1}]);
  const r6 = fn([{name:'A',price:50,quantity:2},{name:'B',price:30,quantity:4},{name:'C',price:40,quantity:0}]);
  const r7 = fn([{name:'X',price:0,quantity:5}]);
  const r8 = fn([{name:'A',price:10,quantity:1},{name:'B',price:20,quantity:2},{name:'C',price:30,quantity:3}]);
  return [
    { pass: r1.totalValue === 95 && r1.inStock === 2 && r1.outOfStock === 1 && r1.mostExpensive === 'B', description: 'Total 95 (50+0+45), 2 in stock, most expensive: B', got: JSON.stringify(r1) },
    { pass: r2.totalValue === 100 && r2.inStock === 1 && r2.outOfStock === 0 && r2.mostExpensive === 'Solo', description: 'Single product: value 100, 1 in stock', got: JSON.stringify(r2) },
    { pass: r3.totalValue === 0 && r3.inStock === 0 && r3.outOfStock === 2, description: 'All out of stock: value 0, 0 in stock', got: JSON.stringify(r3) },
    { pass: r4.totalValue === 100 && r4.inStock === 2, description: 'Same price: total 100, 2 in stock', got: JSON.stringify(r4) },
    { pass: r5.totalValue === 1100 && r5.mostExpensive === 'Pricey', description: 'Total 1100 (100+1000), most expensive: Pricey', got: JSON.stringify(r5) },
    { pass: r6.totalValue === 220 && r6.inStock === 2 && r6.outOfStock === 1, description: 'Total 220 (100+120+0), 2 in stock', got: JSON.stringify(r6) },
    { pass: r7.totalValue === 0 && r7.mostExpensive === 'X', description: 'Zero price: total 0, still most expensive', got: JSON.stringify(r7) },
    { pass: r8.totalValue === 140 && r8.mostExpensive === 'C', description: 'Total 140 (10+40+90), most expensive: C at $30', got: JSON.stringify(r8) }
  ];
}`,
    hints: [
      'Use `.reduce()` for totalValue (price * quantity sum), `.filter()` for inStock count, and `.sort()` by price descending to find the most expensive.',
      'Build each stat separately: `products.reduce(...)` for total, `products.filter(...).length` for inStock, `products.slice().sort(...)[0].name` for mostExpensive.',
    ],
    resources: combinedRes,
  },

  // 9. Callback Methods: Student Roster
  {
    id: 1217,
    title: 'Callback Methods: Student Roster',
    type: 'js',
    tier: 3,
    category: ['js-fundamentals', 'callback-methods'],
    tags: ['reduce', 'forEach', 'sort', 'grouping', 'application'],
    description:
      'Combine callback methods to group students and sort each group alphabetically.',
    instructions:
      'Group students by their `gradeLevel` property. Return an object where each key is a grade level and each value is a sorted array of student names in that level.',
    starterCode:
      '/**\n * @param {Object[]} students - Array of {name, gradeLevel} objects\n * @returns {Object} Object mapping gradeLevel to sorted arrays of names\n */\nfunction buildRoster(students) {\n\n}\n',
    solution:
      'function buildRoster(students) {\n  var groups = students.reduce(function(acc, s) {\n    if (!acc[s.gradeLevel]) acc[s.gradeLevel] = [];\n    acc[s.gradeLevel].push(s.name);\n    return acc;\n  }, {});\n  Object.keys(groups).forEach(function(key) {\n    groups[key].sort();\n  });\n  return groups;\n}',
    testRunner: `(code) => {
  const fn = new Function(code + '; return buildRoster;')();
  const r1 = fn([{name:'Charlie',gradeLevel:'A'},{name:'Alice',gradeLevel:'A'},{name:'Bob',gradeLevel:'B'}]);
  const r2 = fn([]);
  const r3 = fn([{name:'Solo',gradeLevel:'X'}]);
  const r4 = fn([{name:'B',gradeLevel:'1'},{name:'A',gradeLevel:'1'},{name:'C',gradeLevel:'1'}]);
  const r5 = fn([{name:'A',gradeLevel:'X'},{name:'B',gradeLevel:'Y'},{name:'C',gradeLevel:'Z'}]);
  const r6 = fn([{name:'Zara',gradeLevel:'A'},{name:'Amy',gradeLevel:'B'},{name:'Mia',gradeLevel:'A'},{name:'Leo',gradeLevel:'B'}]);
  const r7 = fn([{name:'D',gradeLevel:'1'},{name:'C',gradeLevel:'2'},{name:'B',gradeLevel:'1'},{name:'A',gradeLevel:'2'}]);
  const r8 = fn([{name:'A',gradeLevel:'G1'},{name:'C',gradeLevel:'G1'},{name:'B',gradeLevel:'G1'}]);
  return [
    { pass: JSON.stringify(r1) === JSON.stringify({A:['Alice','Charlie'],B:['Bob']}), description: 'Groups and sorts: A→[Alice,Charlie], B→[Bob]', got: JSON.stringify(r1) },
    { pass: JSON.stringify(r2) === JSON.stringify({}), description: 'Empty → {}', got: JSON.stringify(r2) },
    { pass: JSON.stringify(r3) === JSON.stringify({X:['Solo']}), description: 'Single student: {X:["Solo"]}', got: JSON.stringify(r3) },
    { pass: JSON.stringify(r4) === JSON.stringify({'1':['A','B','C']}), description: 'All same group, sorted: {1:["A","B","C"]}', got: JSON.stringify(r4) },
    { pass: Object.keys(r5).length === 3, description: 'All different groups → 3 keys', got: JSON.stringify(r5) },
    { pass: JSON.stringify(r6.A) === JSON.stringify(['Mia','Zara']) && JSON.stringify(r6.B) === JSON.stringify(['Amy','Leo']), description: 'Two groups, each sorted alphabetically', got: JSON.stringify(r6) },
    { pass: JSON.stringify(r7['1']) === JSON.stringify(['B','D']) && JSON.stringify(r7['2']) === JSON.stringify(['A','C']), description: 'Numeric grade levels group correctly', got: JSON.stringify(r7) },
    { pass: JSON.stringify(r8) === JSON.stringify({G1:['A','B','C']}), description: 'String grade level key', got: JSON.stringify(r8) }
  ];
}`,
    hints: [
      'Use `.reduce()` to group students by gradeLevel, pushing names into arrays. Then use `Object.keys().forEach()` to sort each group\'s array alphabetically.',
      'In the reduce callback, check if the group exists, create it if not, and push the name. After building the groups, iterate keys and call `.sort()` on each array.',
    ],
    resources: combinedRes,
  },

  // 10. Callback Methods: Data Pipeline
  {
    id: 1218,
    title: 'Callback Methods: Data Pipeline',
    type: 'js',
    tier: 3,
    category: ['js-fundamentals', 'callback-methods'],
    tags: ['filter', 'map', 'reduce', 'sort', 'pipeline', 'application'],
    description:
      'Build a comprehensive data pipeline combining all major callback methods.',
    instructions:
      'Process employee records. Filter to only active employees, then return an object with: `departments` (array of unique department names, sorted alphabetically), `totalSalary` (sum of active salaries), `count` (number of active employees), and `averageSalary` (totalSalary / count, or 0 if no active employees).',
    starterCode:
      '/**\n * @param {Object[]} records - Array of {name, department, salary, active} objects\n * @returns {{ departments: string[], totalSalary: number, count: number, averageSalary: number }}\n */\nfunction processData(records) {\n\n}\n',
    solution:
      'function processData(records) {\n  var active = records.filter(function(r) { return r.active; });\n  var depts = active.map(function(r) { return r.department; });\n  var uniqueDepts = depts\n    .filter(function(d, i) { return depts.indexOf(d) === i; })\n    .sort();\n  var totalSalary = active.reduce(function(acc, r) { return acc + r.salary; }, 0);\n  return {\n    departments: uniqueDepts,\n    totalSalary: totalSalary,\n    count: active.length,\n    averageSalary: active.length > 0 ? totalSalary / active.length : 0\n  };\n}',
    testRunner: `(code) => {
  const fn = new Function(code + '; return processData;')();
  const r1 = fn([{name:'A',department:'Eng',salary:100,active:true},{name:'B',department:'Sales',salary:80,active:true},{name:'C',department:'Eng',salary:90,active:false}]);
  const r2 = fn([]);
  const r3 = fn([{name:'A',department:'HR',salary:50,active:false}]);
  const r4 = fn([{name:'A',department:'Eng',salary:100,active:true}]);
  const r5 = fn([{name:'A',department:'B',salary:50,active:true},{name:'B',department:'A',salary:50,active:true}]);
  const r6 = fn([{name:'A',department:'X',salary:60,active:true},{name:'B',department:'X',salary:40,active:true},{name:'C',department:'X',salary:50,active:true}]);
  const r7 = fn([{name:'A',department:'Eng',salary:100,active:true},{name:'B',department:'Eng',salary:200,active:true},{name:'C',department:'Sales',salary:150,active:true},{name:'D',department:'HR',salary:120,active:false}]);
  const r8 = fn([{name:'A',department:'Z',salary:10,active:true},{name:'B',department:'A',salary:20,active:true},{name:'C',department:'M',salary:30,active:true}]);
  const r9 = fn([{name:'A',department:'X',salary:0,active:true}]);
  return [
    { pass: JSON.stringify(r1.departments) === JSON.stringify(['Eng','Sales']) && r1.totalSalary === 180 && r1.count === 2 && r1.averageSalary === 90, description: '2 active: Eng+Sales, total 180, avg 90', got: JSON.stringify(r1) },
    { pass: JSON.stringify(r2.departments) === JSON.stringify([]) && r2.totalSalary === 0 && r2.count === 0 && r2.averageSalary === 0, description: 'Empty → all zeros', got: JSON.stringify(r2) },
    { pass: r3.count === 0 && r3.averageSalary === 0, description: 'All inactive → count 0, avg 0', got: JSON.stringify(r3) },
    { pass: r4.count === 1 && r4.totalSalary === 100 && r4.departments.length === 1, description: 'Single active employee', got: JSON.stringify(r4) },
    { pass: JSON.stringify(r5.departments) === JSON.stringify(['A','B']), description: 'Departments sorted alphabetically: [A,B]', got: JSON.stringify(r5) },
    { pass: r6.departments.length === 1 && r6.count === 3 && r6.averageSalary === 50, description: 'Same department: 1 unique dept, avg 50', got: JSON.stringify(r6) },
    { pass: JSON.stringify(r7.departments) === JSON.stringify(['Eng','Sales']) && r7.count === 3 && r7.totalSalary === 450, description: 'Inactive employee excluded from all stats', got: JSON.stringify(r7) },
    { pass: JSON.stringify(r8.departments) === JSON.stringify(['A','M','Z']), description: 'Three departments sorted: [A,M,Z]', got: JSON.stringify(r8) },
    { pass: r9.totalSalary === 0 && r9.count === 1 && r9.averageSalary === 0, description: 'Zero salary: total 0, count 1, avg 0', got: JSON.stringify(r9) }
  ];
}`,
    hints: [
      'Filter active records first. Then use `.map()` to extract departments, filter for unique values, and sort. Use `.reduce()` for totalSalary. Build the return object from these pieces.',
      'For unique departments: `depts.filter(function(d, i) { return depts.indexOf(d) === i; })` removes duplicates. Then `.sort()` for alphabetical order. Guard against division by zero for averageSalary.',
    ],
    resources: combinedRes,
  },

];

// ─── Validation ─────────────────────────────────────────────────────────────

function validate() {
  let pass = 0;
  let fail = 0;

  exercises.forEach((ex) => {
    try {
      const testFn = new Function('return (' + ex.testRunner + ')')();
      const results = testFn(ex.solution);

      results.forEach((r) => {
        if (r.pass) {
          pass++;
        } else {
          fail++;
          console.error(
            `  FAIL [${ex.id}] ${ex.title} — ${r.description} (got: ${r.got})`
          );
        }
      });
    } catch (err) {
      fail++;
      console.error(`  ERROR [${ex.id}] ${ex.title} — ${err.message}`);
    }
  });

  console.log(
    `\nValidation: ${pass} passed, ${fail} failed (${exercises.length} exercises)`
  );
  return fail === 0;
}

// ─── Main ───────────────────────────────────────────────────────────────────

function main() {
  const validateOnly = process.argv.includes('--validate');

  console.log(
    `T3 Callback Methods — Chaining + Applications: ${exercises.length} exercises (IDs ${exercises[0].id}-${exercises[exercises.length - 1].id})`
  );

  if (!validate()) {
    console.error('\nValidation failed — aborting.');
    process.exit(1);
  }

  if (validateOnly) {
    console.log('\nValidation-only mode — no changes written.');
    return;
  }

  // Read curriculum
  const data = JSON.parse(fs.readFileSync(CURRICULUM_PATH, 'utf8'));
  const before = data.exercises.length;

  // Check for ID collisions
  const existingIds = new Set(data.exercises.map((ex) => ex.id));
  const newIds = exercises.map((ex) => ex.id);
  const collisions = newIds.filter((id) => existingIds.has(id));
  if (collisions.length > 0) {
    console.error(`\nID collisions: ${collisions.join(', ')} — aborting.`);
    process.exit(1);
  }

  // Append new exercises
  data.exercises.push(...exercises);
  const after = data.exercises.length;

  // Write
  fs.writeFileSync(CURRICULUM_PATH, JSON.stringify(data, null, 2) + '\n');
  console.log(
    `\nAppended ${exercises.length} exercises (${before} → ${after})`
  );
  console.log('Written to:', CURRICULUM_PATH);
}

main();
