#!/usr/bin/env node
/**
 * Generator: T3 ES6+ Features — Section 3 (20 exercises, IDs 1239-1258)
 *
 * Covers: Arrow Functions, Template Literals, Destructuring,
 *         Spread & Rest, ES5→ES6 Translation
 *
 * Removes pre-overhaul ES6 exercises: 883, 904, 905, 924, 925, 944
 * (already removed from curriculum before this generator runs)
 *
 * Usage:
 *   node exercises/_gen_t3_es6_features.js            # Append to curriculum
 *   node exercises/_gen_t3_es6_features.js --validate  # Validate testRunners only
 */

const fs = require('fs');
const path = require('path');

const CURRICULUM_PATH = path.join(
  __dirname,
  'collections',
  'default-curriculum.json'
);

// ─── Resources (MDN only for T3) ────────────────────────────────────────────

const arrowRes = [
  { label: 'MDN: Arrow function expressions', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions', description: 'Arrow functions reference' },
];
const templateRes = [
  { label: 'MDN: Template literals', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals', description: 'Template literals reference' },
];
const destructureRes = [
  { label: 'MDN: Destructuring assignment', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment', description: 'Destructuring reference' },
];
const spreadRestRes = [
  { label: 'MDN: Spread syntax', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax', description: 'Spread syntax reference' },
  { label: 'MDN: Rest parameters', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters', description: 'Rest parameters reference' },
];
const es6RefactorRes = [
  { label: 'MDN: Arrow function expressions', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions', description: 'Arrow functions reference' },
  { label: 'MDN: Destructuring assignment', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment', description: 'Destructuring reference' },
];

// ─── Exercise Definitions ───────────────────────────────────────────────────

const exercises = [

  // ══════════════════════════════════════════════════════════════════════════
  // SUB-SECTION 1: Arrow Functions (5 exercises, IDs 1239-1243)
  // ══════════════════════════════════════════════════════════════════════════

  // 1. Arrow Functions: Basics (ENTRY POINT)
  {
    id: 1239,
    title: 'Arrow Functions: Basics',
    type: 'js',
    tier: 3,
    category: ['es6-plus', 'modern-syntax'],
    tags: ['arrow-functions', 'es6', 'functions', 'syntax'],
    description:
      'Write a higher-order function using arrow function syntax that applies a callback to each element of an array.',
    instructions:
      'Arrow functions are a shorter way to write functions. Instead of the `function` keyword, you use `=>`.\n\nFull body: `const fn = (x) => { return x * 2; };`\nConcise body (implicit return): `const fn = (x) => x * 2;`\nSingle parameter (no parens needed): `const fn = x => x * 2;`\n\nThroughout T3 you have been writing `function()` callbacks. Now you will learn the modern equivalent.\n\nWrite a function using arrow syntax that takes an array and a callback, applies the callback to each element, and returns a new array (see `@param`/`@returns` in the starter code).\n\nExample: `transformAll([1, 2, 3], x => x * 2)` returns `[2, 4, 6]`\nExample: `transformAll(["a", "b"], s => s + "!")` returns `["a!", "b!"]`\nExample: `transformAll([], x => x)` returns `[]`',
    starterCode:
      '/**\n * Apply a callback to each element using arrow function syntax.\n *\n * @param {Array} arr - The input array\n * @param {Function} callback - Arrow function to apply to each element\n * @returns {Array} New array with callback applied to each element\n */\nconst transformAll = (arr, callback) => {\n\n};\n',
    solution:
      'const transformAll = (arr, callback) => {\n  const result = [];\n  for (let i = 0; i < arr.length; i++) {\n    result.push(callback(arr[i], i, arr));\n  }\n  return result;\n};',
    testRunner: `(code) => {
  const fn = new Function(code + '; return transformAll;')();
  const r1 = fn([1, 2, 3], x => x * 2);
  const r2 = fn([], x => x);
  const r3 = fn(['a', 'b'], s => s + '!');
  const r4 = fn([true, false], b => !b);
  const r5 = fn([1, 2, 3], (n, i) => n + i);
  const r6 = fn([10], n => n * n);
  const r7 = fn([0, 0, 0], () => 1);
  const input = [1, 2, 3];
  const r8 = fn(input, n => n);
  const r9 = fn([5, 10, 15], n => n > 8);
  return [
    { pass: JSON.stringify(r1) === JSON.stringify([2, 4, 6]), description: '[1,2,3] doubled → [2,4,6]', got: JSON.stringify(r1) },
    { pass: JSON.stringify(r2) === JSON.stringify([]), description: 'Empty array → []', got: JSON.stringify(r2) },
    { pass: JSON.stringify(r3) === JSON.stringify(['a!', 'b!']), description: 'String transform: ["a!","b!"]', got: JSON.stringify(r3) },
    { pass: JSON.stringify(r4) === JSON.stringify([false, true]), description: 'Boolean negation: [false,true]', got: JSON.stringify(r4) },
    { pass: JSON.stringify(r5) === JSON.stringify([1, 3, 5]), description: 'Callback receives index: [1+0, 2+1, 3+2]', got: JSON.stringify(r5) },
    { pass: JSON.stringify(r6) === JSON.stringify([100]), description: 'Single element: [10] → [100]', got: JSON.stringify(r6) },
    { pass: JSON.stringify(r7) === JSON.stringify([1, 1, 1]), description: 'Constant callback: [1,1,1]', got: JSON.stringify(r7) },
    { pass: JSON.stringify(input) === JSON.stringify([1, 2, 3]), description: 'Does not mutate the original array', got: JSON.stringify(input) },
    { pass: JSON.stringify(r9) === JSON.stringify([false, true, true]), description: 'Callback returns booleans: [false,true,true]', got: JSON.stringify(r9) },
    { pass: code.includes('=>'), description: 'Uses arrow function syntax', got: code.includes('=>') ? 'Yes' : 'No' }
  ];
}`,
    hints: [
      'An arrow function uses `const name = (params) => { body };` instead of `function name(params) { body }`. Build a result array with a loop, pushing each callback result.',
      'Use `const transformAll = (arr, callback) => { const result = []; for (let i = 0; i < arr.length; i++) { result.push(callback(arr[i])); } return result; };`.',
    ],
    resources: arrowRes,
  },

  // 2. Arrow Functions: Concise Body
  {
    id: 1240,
    title: 'Arrow Functions: Concise Body',
    type: 'js',
    tier: 3,
    category: ['es6-plus', 'modern-syntax'],
    tags: ['arrow-functions', 'es6', 'concise-body', 'implicit-return'],
    description:
      'Use arrow functions with concise body (implicit return) to filter even numbers from an array.',
    starterCode:
      '/**\n * @param {number[]} nums - Array of numbers\n * @returns {number[]} Only the even numbers\n */\nconst getEvens = (nums) => {\n\n};\n',
    solution:
      'const getEvens = (nums) => nums.filter(n => n % 2 === 0);',
    testRunner: `(code) => {
  const fn = new Function(code + '; return getEvens;')();
  const r1 = fn([1, 2, 3, 4, 5, 6]);
  const r2 = fn([]);
  const r3 = fn([1, 3, 5]);
  const r4 = fn([2, 4, 6]);
  const r5 = fn([0, 1, 2]);
  const r6 = fn([-2, -1, 0, 1, 2]);
  const r7 = fn([7]);
  const r8 = fn([100]);
  const input = [1, 2, 3];
  const r9 = fn(input);
  return [
    { pass: JSON.stringify(r1) === JSON.stringify([2, 4, 6]), description: '[1,2,3,4,5,6] → [2,4,6]', got: JSON.stringify(r1) },
    { pass: JSON.stringify(r2) === JSON.stringify([]), description: '[] → []', got: JSON.stringify(r2) },
    { pass: JSON.stringify(r3) === JSON.stringify([]), description: 'All odd → []', got: JSON.stringify(r3) },
    { pass: JSON.stringify(r4) === JSON.stringify([2, 4, 6]), description: 'All even → [2,4,6]', got: JSON.stringify(r4) },
    { pass: JSON.stringify(r5) === JSON.stringify([0, 2]), description: 'Zero is even: [0,2]', got: JSON.stringify(r5) },
    { pass: JSON.stringify(r6) === JSON.stringify([-2, 0, 2]), description: 'Negative evens: [-2,0,2]', got: JSON.stringify(r6) },
    { pass: JSON.stringify(r7) === JSON.stringify([]), description: 'Single odd → []', got: JSON.stringify(r7) },
    { pass: JSON.stringify(r8) === JSON.stringify([100]), description: 'Single even: [100]', got: JSON.stringify(r8) },
    { pass: JSON.stringify(input) === JSON.stringify([1, 2, 3]), description: 'Does not mutate the original array', got: JSON.stringify(input) }
  ];
}`,
    hints: [
      'When an arrow function has a single expression, you can omit the curly braces and `return` keyword. The expression result is returned implicitly: `n => n % 2 === 0`.',
      'Use `.filter()` with a concise arrow callback: `nums.filter(n => n % 2 === 0)`. Since this is one expression, you can write the entire function body as a single return.',
    ],
    resources: arrowRes,
  },

  // 3. Arrow Functions: With Callbacks
  {
    id: 1241,
    title: 'Arrow Functions: With Callbacks',
    type: 'js',
    tier: 3,
    category: ['es6-plus', 'modern-syntax'],
    tags: ['arrow-functions', 'es6', 'callbacks', 'chaining'],
    description:
      'Use arrow functions as callbacks to filter positive numbers and sum them in a single chained expression.',
    starterCode:
      '/**\n * @param {number[]} nums - Array of numbers\n * @returns {number} Sum of all positive numbers (> 0)\n */\nconst sumPositives = (nums) => {\n\n};\n',
    solution:
      'const sumPositives = (nums) => nums.filter(n => n > 0).reduce((acc, n) => acc + n, 0);',
    testRunner: `(code) => {
  const fn = new Function(code + '; return sumPositives;')();
  const r1 = fn([1, -2, 3, -4, 5]);
  const r2 = fn([]);
  const r3 = fn([-1, -2, -3]);
  const r4 = fn([10, 20, 30]);
  const r5 = fn([0, 1, 2]);
  const r6 = fn([5]);
  const r7 = fn([-5]);
  const r8 = fn([0]);
  const r9 = fn([1, -1, 2, -2, 3, -3]);
  return [
    { pass: r1 === 9, description: '[1,-2,3,-4,5] → 1+3+5 = 9', got: String(r1) },
    { pass: r2 === 0, description: '[] → 0', got: String(r2) },
    { pass: r3 === 0, description: 'All negative → 0', got: String(r3) },
    { pass: r4 === 60, description: 'All positive: 10+20+30 = 60', got: String(r4) },
    { pass: r5 === 3, description: 'Zero excluded: 1+2 = 3', got: String(r5) },
    { pass: r6 === 5, description: 'Single positive: 5', got: String(r6) },
    { pass: r7 === 0, description: 'Single negative → 0', got: String(r7) },
    { pass: r8 === 0, description: 'Single zero → 0', got: String(r8) },
    { pass: r9 === 6, description: '[1,-1,2,-2,3,-3] → 1+2+3 = 6', got: String(r9) }
  ];
}`,
    hints: [
      'Chain `.filter()` and `.reduce()` with arrow callbacks. Filter keeps numbers greater than 0, then reduce sums them with an initial value of 0.',
      'Use `nums.filter(n => n > 0).reduce((acc, n) => acc + n, 0)`. Each callback is a concise arrow function with implicit return.',
    ],
    resources: arrowRes,
  },

  // 4. Arrow Functions: ES5 to ES6
  {
    id: 1242,
    title: 'Arrow Functions: ES5 to ES6',
    type: 'js',
    tier: 3,
    category: ['es6-plus', 'modern-syntax'],
    tags: ['arrow-functions', 'es6', 'conversion', 'refactor'],
    description:
      'Rewrite four ES5-style utility functions as arrow functions with concise syntax.',
    starterCode:
      '/**\n * Rewrite each function below using arrow function syntax.\n * Use concise body (implicit return) where possible.\n *\n * Original ES5 versions:\n *   function double(n) { return n * 2; }\n *   function isEven(n) { return n % 2 === 0; }\n *   function toUpper(s) { return s.toUpperCase(); }\n *   function greet(name) { return "Hello, " + name + "!"; }\n */\n\n// Rewrite as arrow functions:\nconst double = null;\nconst isEven = null;\nconst toUpper = null;\nconst greet = null;\n',
    solution:
      'const double = n => n * 2;\nconst isEven = n => n % 2 === 0;\nconst toUpper = s => s.toUpperCase();\nconst greet = name => "Hello, " + name + "!";',
    testRunner: `(code) => {
  const fns = new Function(code + '; return { double, isEven, toUpper, greet };')();
  const r1 = fns.double(5);
  const r2 = fns.double(0);
  const r3 = fns.isEven(4);
  const r4 = fns.isEven(3);
  const r5 = fns.toUpper('hello');
  const r6 = fns.toUpper('World');
  const r7 = fns.greet('Alice');
  const r8 = fns.greet('Bob');
  const r9 = fns.double(-3);
  return [
    { pass: r1 === 10, description: 'double(5) → 10', got: String(r1) },
    { pass: r2 === 0, description: 'double(0) → 0', got: String(r2) },
    { pass: r3 === true, description: 'isEven(4) → true', got: String(r3) },
    { pass: r4 === false, description: 'isEven(3) → false', got: String(r4) },
    { pass: r5 === 'HELLO', description: 'toUpper("hello") → "HELLO"', got: r5 },
    { pass: r6 === 'WORLD', description: 'toUpper("World") → "WORLD"', got: r6 },
    { pass: r7 === 'Hello, Alice!', description: 'greet("Alice") → "Hello, Alice!"', got: r7 },
    { pass: r8 === 'Hello, Bob!', description: 'greet("Bob") → "Hello, Bob!"', got: r8 },
    { pass: r9 === -6, description: 'double(-3) → -6', got: String(r9) },
    { pass: code.includes('=>'), description: 'Uses arrow function syntax', got: code.includes('=>') ? 'Yes' : 'No' }
  ];
}`,
    hints: [
      'Each function takes one parameter and returns one expression — perfect for concise arrow syntax. For a single parameter, parentheses are optional: `n => n * 2`.',
      'Replace `function name(param) { return expr; }` with `const name = param => expr;`. For example: `const double = n => n * 2;`.',
    ],
    resources: arrowRes,
  },

  // 5. Arrow Functions: Lexical This
  {
    id: 1243,
    title: 'Arrow Functions: Lexical This',
    type: 'js',
    tier: 3,
    category: ['es6-plus', 'modern-syntax'],
    tags: ['arrow-functions', 'es6', 'this', 'lexical-scope'],
    description:
      'Create a counter object where methods use arrow functions to correctly reference the object via lexical this.',
    starterCode:
      '/**\n * Create an object with a values array and an addMultiple method.\n * addMultiple takes an array of numbers and pushes each one\n * added to a base value into the values array.\n *\n * Arrow functions inherit `this` from the enclosing scope,\n * while function() creates its own `this`.\n *\n * @param {number} base - Value to add to each number\n * @returns {{ values: number[], addMultiple: Function }}\n *   addMultiple(nums) - for each n in nums, pushes (base + n) into values\n */\nconst createAdder = (base) => {\n\n};\n',
    solution:
      'const createAdder = (base) => {\n  const obj = {\n    values: [],\n    addMultiple: function(nums) {\n      nums.forEach(n => {\n        this.values.push(base + n);\n      });\n    }\n  };\n  return obj;\n};',
    testRunner: `(code) => {
  const fn = new Function(code + '; return createAdder;')();
  const a1 = fn(10);
  a1.addMultiple([1, 2, 3]);
  const r1 = JSON.stringify(a1.values);
  const a2 = fn(0);
  a2.addMultiple([5, 10]);
  const r2 = JSON.stringify(a2.values);
  const a3 = fn(100);
  a3.addMultiple([]);
  const r3 = JSON.stringify(a3.values);
  const a4 = fn(-5);
  a4.addMultiple([5, 10, 15]);
  const r4 = JSON.stringify(a4.values);
  a1.addMultiple([4]);
  const r5 = JSON.stringify(a1.values);
  const a5 = fn(1);
  a5.addMultiple([0]);
  const r6 = JSON.stringify(a5.values);
  const a6 = fn(0);
  a6.addMultiple([1, -1]);
  const r7 = JSON.stringify(a6.values);
  const a7 = fn(50);
  a7.addMultiple([50]);
  const r8 = JSON.stringify(a7.values);
  const a8 = fn(0);
  a8.addMultiple([0, 0, 0]);
  const r9 = JSON.stringify(a8.values);
  return [
    { pass: r1 === JSON.stringify([11, 12, 13]), description: 'base 10 + [1,2,3] → [11,12,13]', got: r1 },
    { pass: r2 === JSON.stringify([5, 10]), description: 'base 0 + [5,10] → [5,10]', got: r2 },
    { pass: r3 === JSON.stringify([]), description: 'Empty nums → []', got: r3 },
    { pass: r4 === JSON.stringify([0, 5, 10]), description: 'base -5 + [5,10,15] → [0,5,10]', got: r4 },
    { pass: r5 === JSON.stringify([11, 12, 13, 14]), description: 'Calling addMultiple again appends: [11,12,13,14]', got: r5 },
    { pass: r6 === JSON.stringify([1]), description: 'base 1 + [0] → [1]', got: r6 },
    { pass: r7 === JSON.stringify([1, -1]), description: 'base 0 + [1,-1] → [1,-1]', got: r7 },
    { pass: r8 === JSON.stringify([100]), description: 'base 50 + [50] → [100]', got: r8 },
    { pass: r9 === JSON.stringify([0, 0, 0]), description: 'base 0 + [0,0,0] → [0,0,0]', got: r9 }
  ];
}`,
    hints: [
      'Inside a `.forEach()` callback, a regular `function()` creates its own `this`, which will not point to the object. An arrow function `=>` inherits `this` from the enclosing method, where `this` is the object.',
      'Define `addMultiple` as a regular method (`function(nums) { ... }`) so it gets the correct `this`. Inside it, use an arrow callback with `.forEach(n => { this.values.push(base + n); })` — the arrow inherits `this` from the method.',
    ],
    resources: arrowRes,
  },

  // ══════════════════════════════════════════════════════════════════════════
  // SUB-SECTION 2: Template Literals (3 exercises, IDs 1244-1246)
  // ══════════════════════════════════════════════════════════════════════════

  // 6. Template Literals: Advanced (ENTRY POINT)
  {
    id: 1244,
    title: 'Template Literals: Advanced',
    type: 'js',
    tier: 3,
    category: ['es6-plus', 'modern-syntax'],
    tags: ['template-literals', 'es6', 'strings', 'formatting'],
    description:
      'Use template literals with expressions to format an array of objects into a text table.',
    instructions:
      'You already know basic template literal interpolation from T1 (backticks and `${}`). At T3, you will use template literals for complex formatting tasks.\n\nTemplate literals support expressions inside `${}` — not just variables but any JavaScript expression: `${score >= 60 ? "PASS" : "FAIL"}`, `${items.length}`, `${name.toUpperCase()}`.\n\nWrite a function that takes an array of `{name, score}` objects and returns a formatted string with one line per entry: `"name: score"`, joined by newlines (see `@param`/`@returns` in the starter code).\n\nExample: `formatTable([{name: "Alice", score: 95}])` returns `"Alice: 95"`\nExample: `formatTable([{name: "A", score: 1}, {name: "B", score: 2}])` returns `"A: 1\\nB: 2"`\nExample: `formatTable([])` returns `""`',
    starterCode:
      '/**\n * Format an array of {name, score} objects into a text table.\n * Each line should be "name: score", joined by newlines.\n *\n * @param {Object[]} entries - Array of {name: string, score: number}\n * @returns {string} Formatted text with one entry per line\n */\nconst formatTable = (entries) => {\n\n};\n',
    solution:
      'const formatTable = (entries) => entries.map(e => `${e.name}: ${e.score}`).join(\'\\n\');',
    testRunner: `(code) => {
  const fn = new Function(code + '; return formatTable;')();
  const r1 = fn([{name: 'Alice', score: 95}]);
  const r2 = fn([{name: 'A', score: 1}, {name: 'B', score: 2}]);
  const r3 = fn([]);
  const r4 = fn([{name: 'X', score: 0}]);
  const r5 = fn([{name: 'A', score: 10}, {name: 'B', score: 20}, {name: 'C', score: 30}]);
  const r6 = fn([{name: 'Long Name', score: 100}]);
  const r7 = fn([{name: 'A', score: -5}]);
  const r8 = fn([{name: '', score: 0}]);
  const r9 = fn([{name: 'Z', score: 99}, {name: 'A', score: 1}]);
  return [
    { pass: r1 === 'Alice: 95', description: 'Single entry: "Alice: 95"', got: r1 },
    { pass: r2 === 'A: 1\\nB: 2', description: 'Two entries joined by newline', got: JSON.stringify(r2) },
    { pass: r3 === '', description: 'Empty array → ""', got: JSON.stringify(r3) },
    { pass: r4 === 'X: 0', description: 'Zero score: "X: 0"', got: r4 },
    { pass: r5 === 'A: 10\\nB: 20\\nC: 30', description: 'Three entries on three lines', got: JSON.stringify(r5) },
    { pass: r6 === 'Long Name: 100', description: 'Name with space: "Long Name: 100"', got: r6 },
    { pass: r7 === 'A: -5', description: 'Negative score: "A: -5"', got: r7 },
    { pass: r8 === ': 0', description: 'Empty name: ": 0"', got: JSON.stringify(r8) },
    { pass: r9 === 'Z: 99\\nA: 1', description: 'Order preserved: Z first, A second', got: JSON.stringify(r9) }
  ];
}`,
    hints: [
      'Use `.map()` to transform each object into a formatted string using a template literal: `` `${e.name}: ${e.score}` ``. Then `.join("\\n")` to combine lines.',
      'The full solution is a single expression: `entries.map(e => \\`${e.name}: ${e.score}\\`).join("\\n")`. Template literals handle the interpolation, `.join()` handles the newlines.',
    ],
    resources: templateRes,
  },

  // 7. Template Literals: Tagged Templates
  {
    id: 1245,
    title: 'Template Literals: Tagged Templates',
    type: 'js',
    tier: 3,
    category: ['es6-plus', 'modern-syntax'],
    tags: ['template-literals', 'es6', 'tagged-templates', 'strings'],
    description:
      'Write a tagged template function that wraps each interpolated value in square brackets.',
    starterCode:
      '/**\n * A tagged template function that wraps interpolated values in [ ].\n * Called as: highlight`Hello ${name}, you scored ${score}`\n * Returns: "Hello [Alice], you scored [95]"\n *\n * @param {string[]} strings - The static string parts\n * @param {...*} values - The interpolated values\n * @returns {string} Combined string with values wrapped in brackets\n */\nconst highlight = (strings, ...values) => {\n\n};\n',
    solution:
      'const highlight = (strings, ...values) => {\n  let result = \'\';\n  strings.forEach((str, i) => {\n    result += str;\n    if (i < values.length) {\n      result += \'[\' + values[i] + \']\';\n    }\n  });\n  return result;\n};',
    testRunner: `(code) => {
  const fn = new Function(code + '; return highlight;')();
  const r1 = fn(['Hello ', ', you scored ', ''], 'Alice', 95);
  const r2 = fn(['Value: ', ''], 42);
  const r3 = fn(['No interpolation'], );
  const r4 = fn(['', ' and ', ''], 'A', 'B');
  const r5 = fn(['Start ', ' middle ', ' end'], 1, 2);
  const r6 = fn(['', ''], 'only');
  const r7 = fn(['a', 'b', 'c'], 1, 2);
  const r8 = fn(['Hello ', '!'], 'World');
  const r9 = fn(['', ' + ', ' = ', ''], 1, 2, 3);
  return [
    { pass: r1 === 'Hello [Alice], you scored [95]', description: 'Two values: "Hello [Alice], you scored [95]"', got: r1 },
    { pass: r2 === 'Value: [42]', description: 'Single value: "Value: [42]"', got: r2 },
    { pass: r3 === 'No interpolation', description: 'No values: "No interpolation"', got: r3 },
    { pass: r4 === '[A] and [B]', description: 'Values at edges: "[A] and [B]"', got: r4 },
    { pass: r5 === 'Start [1] middle [2] end', description: 'Two values in middle', got: r5 },
    { pass: r6 === '[only]', description: 'Value with empty strings around it: "[only]"', got: r6 },
    { pass: r7 === 'a[1]b[2]c', description: 'Interleaved: "a[1]b[2]c"', got: r7 },
    { pass: r8 === 'Hello [World]!', description: '"Hello [World]!"', got: r8 },
    { pass: r9 === '[1] + [2] = [3]', description: 'Three values: "[1] + [2] = [3]"', got: r9 }
  ];
}`,
    hints: [
      'A tagged template receives an array of string parts and the interpolated values as separate arguments. Loop through the strings, and after each one (except the last), insert the corresponding value wrapped in brackets.',
      'Use `.forEach((str, i) => { result += str; if (i < values.length) result += "[" + values[i] + "]"; })`. The strings array always has one more element than the values array.',
    ],
    resources: templateRes,
  },

  // 8. Template Literals: Builder
  {
    id: 1246,
    title: 'Template Literals: Builder',
    type: 'js',
    tier: 3,
    category: ['es6-plus', 'modern-syntax'],
    tags: ['template-literals', 'es6', 'html', 'string-building'],
    description:
      'Use template literals to build an HTML string from an array of tag/content objects.',
    starterCode:
      '/**\n * @param {Object[]} elements - Array of {tag: string, content: string}\n * @returns {string} HTML string with each element wrapped in its tag\n */\nconst buildHTML = (elements) => {\n\n};\n',
    solution:
      'const buildHTML = (elements) => elements.map(el => `<${el.tag}>${el.content}</${el.tag}>`).join(\'\\n\');',
    testRunner: `(code) => {
  const fn = new Function(code + '; return buildHTML;')();
  const r1 = fn([{tag: 'p', content: 'Hello'}]);
  const r2 = fn([{tag: 'h1', content: 'Title'}, {tag: 'p', content: 'Body'}]);
  const r3 = fn([]);
  const r4 = fn([{tag: 'div', content: ''}]);
  const r5 = fn([{tag: 'span', content: 'A'}, {tag: 'span', content: 'B'}, {tag: 'span', content: 'C'}]);
  const r6 = fn([{tag: 'li', content: 'Item 1'}, {tag: 'li', content: 'Item 2'}]);
  const r7 = fn([{tag: 'strong', content: 'Bold'}]);
  const r8 = fn([{tag: 'a', content: 'Click'}]);
  const r9 = fn([{tag: 'h2', content: 'Sub'}, {tag: 'p', content: 'Text'}, {tag: 'p', content: 'More'}]);
  return [
    { pass: r1 === '<p>Hello</p>', description: 'Single p tag: "<p>Hello</p>"', got: r1 },
    { pass: r2 === '<h1>Title</h1>\\n<p>Body</p>', description: 'h1 + p joined by newline', got: JSON.stringify(r2) },
    { pass: r3 === '', description: 'Empty array → ""', got: JSON.stringify(r3) },
    { pass: r4 === '<div></div>', description: 'Empty content: "<div></div>"', got: r4 },
    { pass: r5 === '<span>A</span>\\n<span>B</span>\\n<span>C</span>', description: 'Three spans', got: JSON.stringify(r5) },
    { pass: r6 === '<li>Item 1</li>\\n<li>Item 2</li>', description: 'Two list items', got: JSON.stringify(r6) },
    { pass: r7 === '<strong>Bold</strong>', description: 'Strong tag', got: r7 },
    { pass: r8 === '<a>Click</a>', description: 'Anchor tag', got: r8 },
    { pass: r9 === '<h2>Sub</h2>\\n<p>Text</p>\\n<p>More</p>', description: 'Three mixed tags', got: JSON.stringify(r9) }
  ];
}`,
    hints: [
      'Use `.map()` with a template literal to wrap each element: `` `<${el.tag}>${el.content}</${el.tag}>` ``. Join the results with newlines.',
      'The full expression is: ``elements.map(el => `<${el.tag}>${el.content}</${el.tag}>`).join("\\n")``.',
    ],
    resources: templateRes,
  },

  // ══════════════════════════════════════════════════════════════════════════
  // SUB-SECTION 3: Destructuring (4 exercises, IDs 1247-1250)
  // ══════════════════════════════════════════════════════════════════════════

  // 9. Destructuring: Function Parameters (ENTRY POINT)
  {
    id: 1247,
    title: 'Destructuring: Function Parameters',
    type: 'js',
    tier: 3,
    category: ['es6-plus', 'modern-syntax'],
    tags: ['destructuring', 'es6', 'parameters', 'objects'],
    description:
      'Destructure an object directly in the function parameter list with default values.',
    instructions:
      'Destructuring lets you unpack values from objects or arrays directly into variables. At T3, the most common pattern is destructuring in function parameters.\n\nInstead of: `const formatUser = (user) => { return user.name + ", " + user.age; };`\nYou write: `const formatUser = ({name, age}) => { return name + ", " + age; };`\n\nYou can also set defaults for missing properties: `({name, age = 0, city = "Unknown"})`.\n\nWrite a function that destructures a user object in the parameter list and returns a formatted string (see `@param`/`@returns` in the starter code).\n\nExample: `formatUser({name: "Alice", age: 30, city: "Seattle"})` returns `"Alice (30) - Seattle"`\nExample: `formatUser({name: "Bob"})` returns `"Bob (0) - Unknown"`',
    starterCode:
      '/**\n * Format a user object into a string.\n * Destructure {name, age, city} in the parameter with defaults:\n *   age defaults to 0, city defaults to "Unknown"\n *\n * @param {Object} user - {name: string, age?: number, city?: string}\n * @returns {string} "name (age) - city"\n */\nconst formatUser = () => {\n\n};\n',
    solution:
      'const formatUser = ({name, age = 0, city = "Unknown"}) => `${name} (${age}) - ${city}`;',
    testRunner: `(code) => {
  const fn = new Function(code + '; return formatUser;')();
  const r1 = fn({name: 'Alice', age: 30, city: 'Seattle'});
  const r2 = fn({name: 'Bob'});
  const r3 = fn({name: 'Charlie', age: 25});
  const r4 = fn({name: 'Diana', city: 'Portland'});
  const r5 = fn({name: 'Eve', age: 0, city: ''});
  const r6 = fn({name: 'A', age: 100, city: 'B'});
  const r7 = fn({name: 'Test', age: 1, city: 'C'});
  const r8 = fn({name: '', age: 5, city: 'D'});
  const r9 = fn({name: 'X'});
  return [
    { pass: r1 === 'Alice (30) - Seattle', description: 'All fields: "Alice (30) - Seattle"', got: r1 },
    { pass: r2 === 'Bob (0) - Unknown', description: 'Defaults: "Bob (0) - Unknown"', got: r2 },
    { pass: r3 === 'Charlie (25) - Unknown', description: 'Missing city: "Charlie (25) - Unknown"', got: r3 },
    { pass: r4 === 'Diana (0) - Portland', description: 'Missing age: "Diana (0) - Portland"', got: r4 },
    { pass: r5 === 'Eve (0) - ', description: 'Empty string city (not missing): "Eve (0) - "', got: r5 },
    { pass: r6 === 'A (100) - B', description: 'Short names: "A (100) - B"', got: r6 },
    { pass: r7 === 'Test (1) - C', description: '"Test (1) - C"', got: r7 },
    { pass: r8 === ' (5) - D', description: 'Empty name: " (5) - D"', got: r8 },
    { pass: r9 === 'X (0) - Unknown', description: 'Only name provided: "X (0) - Unknown"', got: r9 }
  ];
}`,
    hints: [
      'Put the destructuring pattern directly in the parameter list: `({name, age = 0, city = "Unknown"})`. Default values apply when the property is `undefined`, not when it is an empty string.',
      'The full solution is: `const formatUser = ({name, age = 0, city = "Unknown"}) => \\`${name} (${age}) - ${city}\\``. Combine destructured defaults with a template literal.',
    ],
    resources: destructureRes,
  },

  // 10. Destructuring: Nested Objects
  {
    id: 1248,
    title: 'Destructuring: Nested Objects',
    type: 'js',
    tier: 3,
    category: ['es6-plus', 'modern-syntax'],
    tags: ['destructuring', 'es6', 'nested', 'objects'],
    description:
      'Destructure nested objects to extract deeply nested values in a function parameter.',
    starterCode:
      '/**\n * @param {Object} user - {name: string, address: {city: string, zip: string}}\n * @returns {string} "name lives in city (zip)"\n */\nconst formatAddress = ({name, address: {city, zip}}) => {\n\n};\n',
    solution:
      'const formatAddress = ({name, address: {city, zip}}) => `${name} lives in ${city} (${zip})`;',
    testRunner: `(code) => {
  const fn = new Function(code + '; return formatAddress;')();
  const r1 = fn({name: 'Alice', address: {city: 'Seattle', zip: '98101'}});
  const r2 = fn({name: 'Bob', address: {city: 'Portland', zip: '97201'}});
  const r3 = fn({name: 'C', address: {city: 'D', zip: '00000'}});
  const r4 = fn({name: 'Eve', address: {city: 'NYC', zip: '10001'}});
  const r5 = fn({name: 'Test', address: {city: '', zip: ''}});
  const r6 = fn({name: 'Long Name', address: {city: 'San Francisco', zip: '94102'}});
  const r7 = fn({name: 'A', address: {city: 'B', zip: '12345'}});
  const r8 = fn({name: 'X', address: {city: 'Y', zip: '99999'}});
  const r9 = fn({name: 'Z', address: {city: 'W', zip: '55555'}});
  return [
    { pass: r1 === 'Alice lives in Seattle (98101)', description: '"Alice lives in Seattle (98101)"', got: r1 },
    { pass: r2 === 'Bob lives in Portland (97201)', description: '"Bob lives in Portland (97201)"', got: r2 },
    { pass: r3 === 'C lives in D (00000)', description: 'Short values', got: r3 },
    { pass: r4 === 'Eve lives in NYC (10001)', description: '"Eve lives in NYC (10001)"', got: r4 },
    { pass: r5 === 'Test lives in  ()', description: 'Empty strings preserved', got: r5 },
    { pass: r6 === 'Long Name lives in San Francisco (94102)', description: 'Multi-word values', got: r6 },
    { pass: r7 === 'A lives in B (12345)', description: 'Single char values', got: r7 },
    { pass: r8 === 'X lives in Y (99999)', description: '"X lives in Y (99999)"', got: r8 },
    { pass: r9 === 'Z lives in W (55555)', description: '"Z lives in W (55555)"', got: r9 }
  ];
}`,
    hints: [
      'Nested destructuring follows the object shape: `{name, address: {city, zip}}` pulls `city` and `zip` from the nested `address` object. The `address` variable itself is not created.',
      'The destructuring pattern mirrors the object structure. Use: `({name, address: {city, zip}}) => \\`${name} lives in ${city} (${zip})\\``.',
    ],
    resources: destructureRes,
  },

  // 11. Destructuring: Array Swap & Rest
  {
    id: 1249,
    title: 'Destructuring: Array Swap and Rest',
    type: 'js',
    tier: 3,
    category: ['es6-plus', 'modern-syntax'],
    tags: ['destructuring', 'es6', 'arrays', 'rest'],
    description:
      'Use array destructuring with rest syntax to split an array into its first element and the remaining elements.',
    starterCode:
      '/**\n * @param {Array} arr - An array with at least one element\n * @returns {{ head: *, tail: Array }} The first element and the rest\n */\nconst headAndTail = (arr) => {\n\n};\n',
    solution:
      'const headAndTail = (arr) => {\n  const [head, ...tail] = arr;\n  return { head, tail };\n};',
    testRunner: `(code) => {
  const fn = new Function(code + '; return headAndTail;')();
  const r1 = fn([1, 2, 3]);
  const r2 = fn(['a']);
  const r3 = fn([true, false, true]);
  const r4 = fn([10, 20, 30, 40, 50]);
  const r5 = fn(['x', 'y']);
  const r6 = fn([0]);
  const r7 = fn([null, 1, 2]);
  const r8 = fn(['first', 'second', 'third']);
  const input = [1, 2, 3];
  const r9 = fn(input);
  return [
    { pass: r1.head === 1 && JSON.stringify(r1.tail) === JSON.stringify([2, 3]), description: '[1,2,3] → head:1, tail:[2,3]', got: JSON.stringify(r1) },
    { pass: r2.head === 'a' && JSON.stringify(r2.tail) === JSON.stringify([]), description: '["a"] → head:"a", tail:[]', got: JSON.stringify(r2) },
    { pass: r3.head === true && r3.tail.length === 2, description: '[true,false,true] → head:true, tail has 2 elements', got: JSON.stringify(r3) },
    { pass: r4.head === 10 && r4.tail.length === 4, description: '5-element array → head:10, tail has 4', got: JSON.stringify(r4) },
    { pass: r5.head === 'x' && JSON.stringify(r5.tail) === JSON.stringify(['y']), description: '["x","y"] → head:"x", tail:["y"]', got: JSON.stringify(r5) },
    { pass: r6.head === 0 && JSON.stringify(r6.tail) === JSON.stringify([]), description: '[0] → head:0, tail:[]', got: JSON.stringify(r6) },
    { pass: r7.head === null && JSON.stringify(r7.tail) === JSON.stringify([1, 2]), description: '[null,1,2] → head:null, tail:[1,2]', got: JSON.stringify(r7) },
    { pass: r8.head === 'first' && r8.tail.length === 2, description: '3 strings → head:"first", tail has 2', got: JSON.stringify(r8) },
    { pass: JSON.stringify(input) === JSON.stringify([1, 2, 3]), description: 'Does not mutate the original array', got: JSON.stringify(input) }
  ];
}`,
    hints: [
      'Array destructuring with rest: `const [head, ...tail] = arr;` assigns the first element to `head` and collects the rest into a new array `tail`.',
      'Use `const [head, ...tail] = arr; return { head, tail };`. The `...tail` rest syntax creates a new array from all remaining elements. Shorthand property `{ head, tail }` works when variable names match key names.',
    ],
    resources: destructureRes,
  },

  // 12. Destructuring: Combined
  {
    id: 1250,
    title: 'Destructuring: Combined',
    type: 'js',
    tier: 3,
    category: ['es6-plus', 'modern-syntax'],
    tags: ['destructuring', 'es6', 'defaults', 'renaming', 'combined'],
    description:
      'Destructure a config object with nested defaults, renaming, and rest collection.',
    starterCode:
      '/**\n * @param {Object} config - Configuration object\n *   config.host (string, default "localhost")\n *   config.port (number, default 3000)\n *   config.debug (boolean, default false)\n * @returns {{ host: string, port: number, debug: boolean, extra: Object }}\n *   extra contains all other properties not explicitly destructured\n */\nconst parseConfig = (config) => {\n\n};\n',
    solution:
      'const parseConfig = ({host = "localhost", port = 3000, debug = false, ...extra}) => ({\n  host,\n  port,\n  debug,\n  extra\n});',
    testRunner: `(code) => {
  const fn = new Function(code + '; return parseConfig;')();
  const r1 = fn({host: 'example.com', port: 8080, debug: true});
  const r2 = fn({});
  const r3 = fn({host: 'test.io'});
  const r4 = fn({port: 5000, verbose: true});
  const r5 = fn({host: 'a', port: 1, debug: false, foo: 'bar', baz: 42});
  const r6 = fn({debug: true});
  const r7 = fn({host: '', port: 0, debug: false});
  const r8 = fn({extra1: 'a', extra2: 'b'});
  const r9 = fn({host: 'h', port: 9, debug: true, x: 1});
  return [
    { pass: r1.host === 'example.com' && r1.port === 8080 && r1.debug === true && JSON.stringify(r1.extra) === '{}', description: 'All provided, no extras', got: JSON.stringify(r1) },
    { pass: r2.host === 'localhost' && r2.port === 3000 && r2.debug === false && JSON.stringify(r2.extra) === '{}', description: 'Empty → all defaults', got: JSON.stringify(r2) },
    { pass: r3.host === 'test.io' && r3.port === 3000 && r3.debug === false, description: 'Only host provided, others default', got: JSON.stringify(r3) },
    { pass: r4.port === 5000 && JSON.stringify(r4.extra) === JSON.stringify({verbose: true}), description: 'Extra property collected: {verbose: true}', got: JSON.stringify(r4) },
    { pass: JSON.stringify(r5.extra) === JSON.stringify({foo: 'bar', baz: 42}), description: 'Multiple extras collected: {foo, baz}', got: JSON.stringify(r5) },
    { pass: r6.host === 'localhost' && r6.port === 3000 && r6.debug === true, description: 'Only debug provided', got: JSON.stringify(r6) },
    { pass: r7.host === '' && r7.port === 0 && r7.debug === false, description: 'Falsy values not replaced by defaults', got: JSON.stringify(r7) },
    { pass: r8.host === 'localhost' && Object.keys(r8.extra).length === 2, description: 'All props are extra: defaults + 2 extras', got: JSON.stringify(r8) },
    { pass: r9.host === 'h' && JSON.stringify(r9.extra) === JSON.stringify({x: 1}), description: 'One extra property: {x: 1}', got: JSON.stringify(r9) }
  ];
}`,
    hints: [
      'Combine defaults and rest in one destructuring: `({host = "localhost", port = 3000, debug = false, ...extra})`. The `...extra` collects all properties not explicitly named.',
      'Return using shorthand properties: `({ host, port, debug, extra })`. Parentheses around the object literal are needed for concise arrow body: `=> ({ ... })`.',
    ],
    resources: destructureRes,
  },

  // ══════════════════════════════════════════════════════════════════════════
  // SUB-SECTION 4: Spread & Rest (4 exercises, IDs 1251-1254)
  // ══════════════════════════════════════════════════════════════════════════

  // 13. Rest Parameters: Collect Arguments (ENTRY POINT)
  {
    id: 1251,
    title: 'Rest Parameters: Collect Arguments',
    type: 'js',
    tier: 3,
    category: ['es6-plus', 'modern-syntax'],
    tags: ['rest', 'es6', 'parameters', 'variadic'],
    description:
      'Use rest parameters to write a function that sums any number of arguments.',
    instructions:
      'In Section 2, you used the `arguments` object and a `for` loop to collect variable arguments (in `composeAll` and `pipeAll`). Rest parameters are the modern replacement.\n\nWith rest: `const sum = (...nums) => { }` — `nums` is a real array containing all arguments.\nWith arguments: `function sum() { var nums = []; for (var i = 0; i < arguments.length; i++) nums.push(arguments[i]); }`\n\nRest parameters are cleaner, work with arrow functions, and give you a real array with all array methods available.\n\nWrite a function using rest parameters that sums any number of arguments (see `@param`/`@returns` in the starter code).\n\nExample: `sum(1, 2, 3)` returns `6`\nExample: `sum()` returns `0`\nExample: `sum(10)` returns `10`',
    starterCode:
      '/**\n * Sum any number of arguments using rest parameters.\n *\n * @param {...number} nums - Any number of numeric arguments\n * @returns {number} The sum of all arguments\n */\nconst sum = (...nums) => {\n\n};\n',
    solution:
      'const sum = (...nums) => nums.reduce((acc, n) => acc + n, 0);',
    testRunner: `(code) => {
  const fn = new Function(code + '; return sum;')();
  const r1 = fn(1, 2, 3);
  const r2 = fn();
  const r3 = fn(10);
  const r4 = fn(1, -1, 1, -1);
  const r5 = fn(0, 0, 0);
  const r6 = fn(100, 200, 300);
  const r7 = fn(-5, -10);
  const r8 = fn(1.5, 2.5);
  const r9 = fn(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);
  return [
    { pass: r1 === 6, description: 'sum(1,2,3) → 6', got: String(r1) },
    { pass: r2 === 0, description: 'sum() → 0', got: String(r2) },
    { pass: r3 === 10, description: 'sum(10) → 10', got: String(r3) },
    { pass: r4 === 0, description: 'sum(1,-1,1,-1) → 0', got: String(r4) },
    { pass: r5 === 0, description: 'sum(0,0,0) → 0', got: String(r5) },
    { pass: r6 === 600, description: 'sum(100,200,300) → 600', got: String(r6) },
    { pass: r7 === -15, description: 'sum(-5,-10) → -15', got: String(r7) },
    { pass: r8 === 4, description: 'sum(1.5,2.5) → 4', got: String(r8) },
    { pass: r9 === 55, description: 'sum(1..10) → 55', got: String(r9) }
  ];
}`,
    hints: [
      'Rest parameters (`...nums`) collect all arguments into a real array. You can immediately use `.reduce()` on it since it is a proper array.',
      'Use `nums.reduce((acc, n) => acc + n, 0)`. The rest parameter gives you a real array, so all array methods work directly — no need for the `arguments` workaround.',
    ],
    resources: spreadRestRes,
  },

  // 14. Spread: Shallow Clone & Merge
  {
    id: 1252,
    title: 'Spread: Shallow Clone and Merge',
    type: 'js',
    tier: 3,
    category: ['es6-plus', 'modern-syntax'],
    tags: ['spread', 'es6', 'objects', 'immutable'],
    description:
      'Use the spread operator to merge a defaults object with user config, where user values override defaults.',
    starterCode:
      '/**\n * @param {Object} defaults - Default configuration values\n * @param {Object} config - User-provided overrides\n * @returns {Object} Merged object where config values override defaults\n */\nconst mergeDefaults = (defaults, config) => {\n\n};\n',
    solution:
      'const mergeDefaults = (defaults, config) => ({ ...defaults, ...config });',
    testRunner: `(code) => {
  const fn = new Function(code + '; return mergeDefaults;')();
  const r1 = fn({a: 1, b: 2}, {b: 3, c: 4});
  const r2 = fn({}, {a: 1});
  const r3 = fn({a: 1}, {});
  const r4 = fn({}, {});
  const r5 = fn({x: 10, y: 20}, {y: 99});
  const r6 = fn({theme: 'light', lang: 'en'}, {theme: 'dark'});
  const r7 = fn({a: 1, b: 2, c: 3}, {a: 10, c: 30});
  const d = {x: 1};
  const c = {y: 2};
  const r8 = fn(d, c);
  const r9 = fn({a: 'old'}, {a: 'new'});
  return [
    { pass: JSON.stringify(r1) === JSON.stringify({a: 1, b: 3, c: 4}), description: 'Config overrides b, adds c', got: JSON.stringify(r1) },
    { pass: JSON.stringify(r2) === JSON.stringify({a: 1}), description: 'Empty defaults, config wins', got: JSON.stringify(r2) },
    { pass: JSON.stringify(r3) === JSON.stringify({a: 1}), description: 'Empty config, defaults preserved', got: JSON.stringify(r3) },
    { pass: JSON.stringify(r4) === JSON.stringify({}), description: 'Both empty → {}', got: JSON.stringify(r4) },
    { pass: r5.x === 10 && r5.y === 99, description: 'y overridden: {x:10, y:99}', got: JSON.stringify(r5) },
    { pass: r6.theme === 'dark' && r6.lang === 'en', description: 'theme overridden, lang default kept', got: JSON.stringify(r6) },
    { pass: r7.a === 10 && r7.b === 2 && r7.c === 30, description: 'Multiple overrides, b stays default', got: JSON.stringify(r7) },
    { pass: JSON.stringify(d) === JSON.stringify({x: 1}) && JSON.stringify(c) === JSON.stringify({y: 2}), description: 'Does not mutate original objects', got: JSON.stringify(d) + ' ' + JSON.stringify(c) },
    { pass: r9.a === 'new', description: 'String value overridden: "new"', got: JSON.stringify(r9) }
  ];
}`,
    hints: [
      'Object spread creates a shallow copy with all properties. When two objects spread into the same literal, later properties override earlier ones: `{...defaults, ...config}`.',
      'The entire function body is: `({ ...defaults, ...config })`. Wrap in parentheses for implicit arrow return. Properties from `config` overwrite matching properties from `defaults`.',
    ],
    resources: spreadRestRes,
  },

  // 15. Spread: Array Operations
  {
    id: 1253,
    title: 'Spread: Array Operations',
    type: 'js',
    tier: 3,
    category: ['es6-plus', 'modern-syntax'],
    tags: ['spread', 'es6', 'arrays', 'immutable'],
    description:
      'Use spread to insert elements into an array at a given index without mutation.',
    starterCode:
      '/**\n * @param {Array} arr - The original array\n * @param {number} index - Position to insert at\n * @param {...*} items - Items to insert\n * @returns {Array} New array with items inserted at index\n */\nconst insertAt = (arr, index, ...items) => {\n\n};\n',
    solution:
      'const insertAt = (arr, index, ...items) => [\n  ...arr.slice(0, index),\n  ...items,\n  ...arr.slice(index)\n];',
    testRunner: `(code) => {
  const fn = new Function(code + '; return insertAt;')();
  const r1 = fn([1, 2, 3], 1, 10);
  const r2 = fn([1, 2, 3], 0, 0);
  const r3 = fn([1, 2, 3], 3, 4);
  const r4 = fn([], 0, 1, 2);
  const r5 = fn([1, 4], 1, 2, 3);
  const r6 = fn(['a', 'c'], 1, 'b');
  const r7 = fn([1, 2, 3], 2, 'x', 'y');
  const input = [1, 2, 3];
  const r8 = fn(input, 1, 99);
  const r9 = fn([10], 0, 5);
  return [
    { pass: JSON.stringify(r1) === JSON.stringify([1, 10, 2, 3]), description: 'Insert 10 at index 1: [1,10,2,3]', got: JSON.stringify(r1) },
    { pass: JSON.stringify(r2) === JSON.stringify([0, 1, 2, 3]), description: 'Insert at start: [0,1,2,3]', got: JSON.stringify(r2) },
    { pass: JSON.stringify(r3) === JSON.stringify([1, 2, 3, 4]), description: 'Insert at end: [1,2,3,4]', got: JSON.stringify(r3) },
    { pass: JSON.stringify(r4) === JSON.stringify([1, 2]), description: 'Insert into empty: [1,2]', got: JSON.stringify(r4) },
    { pass: JSON.stringify(r5) === JSON.stringify([1, 2, 3, 4]), description: 'Insert multiple: [1,2,3,4]', got: JSON.stringify(r5) },
    { pass: JSON.stringify(r6) === JSON.stringify(['a', 'b', 'c']), description: 'Insert string: ["a","b","c"]', got: JSON.stringify(r6) },
    { pass: JSON.stringify(r7) === JSON.stringify([1, 2, 'x', 'y', 3]), description: 'Insert mixed types at index 2', got: JSON.stringify(r7) },
    { pass: JSON.stringify(input) === JSON.stringify([1, 2, 3]), description: 'Does not mutate original array', got: JSON.stringify(input) },
    { pass: JSON.stringify(r9) === JSON.stringify([5, 10]), description: 'Insert before single element: [5,10]', got: JSON.stringify(r9) }
  ];
}`,
    hints: [
      'Use `.slice()` to split the array at the insertion point, then spread all three parts into a new array: the before portion, the new items, and the after portion.',
      'The pattern is: `[...arr.slice(0, index), ...items, ...arr.slice(index)]`. This creates a new array without modifying the original. Rest params in the function signature collect the items to insert.',
    ],
    resources: spreadRestRes,
  },

  // 16. Rest & Spread: Combined
  {
    id: 1254,
    title: 'Rest and Spread: Combined',
    type: 'js',
    tier: 3,
    category: ['es6-plus', 'modern-syntax'],
    tags: ['rest', 'spread', 'es6', 'combined', 'computed-properties'],
    description:
      'Use rest to separate the first argument from the rest, then spread to build the result object.',
    starterCode:
      '/**\n * @param {string} key - The property name\n * @param {...*} values - The values to collect\n * @returns {Object} An object with {[key]: [...values]}\n */\nconst groupFirst = (key, ...values) => {\n\n};\n',
    solution:
      'const groupFirst = (key, ...values) => ({ [key]: [...values] });',
    testRunner: `(code) => {
  const fn = new Function(code + '; return groupFirst;')();
  const r1 = fn('colors', 'red', 'blue', 'green');
  const r2 = fn('nums', 1, 2, 3);
  const r3 = fn('empty');
  const r4 = fn('one', 42);
  const r5 = fn('mixed', 1, 'two', true);
  const r6 = fn('a', 'x');
  const r7 = fn('data', 10, 20);
  const r8 = fn('items', null, undefined);
  const r9 = fn('test', 0, false, '');
  return [
    { pass: JSON.stringify(r1) === JSON.stringify({colors: ['red', 'blue', 'green']}), description: 'groupFirst("colors","red","blue","green") → {colors: [...]}', got: JSON.stringify(r1) },
    { pass: JSON.stringify(r2) === JSON.stringify({nums: [1, 2, 3]}), description: '{nums: [1,2,3]}', got: JSON.stringify(r2) },
    { pass: JSON.stringify(r3) === JSON.stringify({empty: []}), description: 'No values: {empty: []}', got: JSON.stringify(r3) },
    { pass: JSON.stringify(r4) === JSON.stringify({one: [42]}), description: 'Single value: {one: [42]}', got: JSON.stringify(r4) },
    { pass: JSON.stringify(r5) === JSON.stringify({mixed: [1, 'two', true]}), description: 'Mixed types in values', got: JSON.stringify(r5) },
    { pass: JSON.stringify(r6) === JSON.stringify({a: ['x']}), description: '{a: ["x"]}', got: JSON.stringify(r6) },
    { pass: JSON.stringify(r7) === JSON.stringify({data: [10, 20]}), description: '{data: [10,20]}', got: JSON.stringify(r7) },
    { pass: JSON.stringify(r8) === JSON.stringify({items: [null, null]}), description: 'null and undefined in values', got: JSON.stringify(r8) },
    { pass: r9.test.length === 3 && r9.test[0] === 0 && r9.test[1] === false && r9.test[2] === '', description: 'Falsy values preserved: [0, false, ""]', got: JSON.stringify(r9) }
  ];
}`,
    hints: [
      'Rest parameters collect extra arguments: `(key, ...values)`. Computed property names let you use a variable as a key: `{ [key]: value }`. Combine both to build the object.',
      'The concise solution is: `({ [key]: [...values] })`. The `[key]` uses computed property syntax, `...values` spreads the rest-collected arguments into a new array. Wrap in parens for implicit arrow return.',
    ],
    resources: spreadRestRes,
  },

  // ══════════════════════════════════════════════════════════════════════════
  // SUB-SECTION 5: ES5 → ES6 Translation (4 exercises, IDs 1255-1258)
  // ══════════════════════════════════════════════════════════════════════════

  // 17. ES6 Refactor: Callback Methods (ENTRY POINT)
  {
    id: 1255,
    title: 'ES6 Refactor: Callback Methods',
    type: 'js',
    tier: 3,
    category: ['es6-plus', 'modern-syntax'],
    tags: ['es6', 'refactor', 'arrow-functions', 'destructuring', 'conversion'],
    description:
      'Rewrite a data pipeline using arrow functions, destructuring, and template literals.',
    instructions:
      'Now you will put it all together. Rewrite familiar patterns from Sections 1 and 2 using the ES6 features you have learned.\n\nThis exercise takes an array of `{name, score}` objects and returns a summary string. Filter to passing scores (>= 60), extract the names, and join them with commas.\n\nUse arrow functions for callbacks, destructuring in parameters, and a template literal for the result string (see `@param`/`@returns` in the starter code).\n\nExample: `processScores([{name: "A", score: 90}, {name: "B", score: 40}, {name: "C", score: 75}])` returns `"Passing: A, C"`\nExample: `processScores([{name: "A", score: 50}])` returns `"Passing: none"`',
    starterCode:
      '/**\n * Filter passing scores (>= 60), extract names, and format a summary.\n * Use arrow functions, destructuring, and template literals.\n *\n * @param {Object[]} students - Array of {name: string, score: number}\n * @returns {string} "Passing: name1, name2" or "Passing: none"\n */\nconst processScores = (students) => {\n\n};\n',
    solution:
      'const processScores = (students) => {\n  const passing = students\n    .filter(({score}) => score >= 60)\n    .map(({name}) => name);\n  return `Passing: ${passing.length > 0 ? passing.join(", ") : "none"}`;\n};',
    testRunner: `(code) => {
  const fn = new Function(code + '; return processScores;')();
  const r1 = fn([{name: 'A', score: 90}, {name: 'B', score: 40}, {name: 'C', score: 75}]);
  const r2 = fn([{name: 'A', score: 50}]);
  const r3 = fn([]);
  const r4 = fn([{name: 'X', score: 60}]);
  const r5 = fn([{name: 'A', score: 100}, {name: 'B', score: 100}]);
  const r6 = fn([{name: 'A', score: 59}, {name: 'B', score: 60}]);
  const r7 = fn([{name: 'Solo', score: 95}]);
  const r8 = fn([{name: 'A', score: 0}, {name: 'B', score: 0}]);
  const r9 = fn([{name: 'A', score: 60}, {name: 'B', score: 70}, {name: 'C', score: 80}]);
  return [
    { pass: r1 === 'Passing: A, C', description: 'Two passing: "Passing: A, C"', got: r1 },
    { pass: r2 === 'Passing: none', description: 'None passing: "Passing: none"', got: r2 },
    { pass: r3 === 'Passing: none', description: 'Empty array: "Passing: none"', got: r3 },
    { pass: r4 === 'Passing: X', description: 'Exactly 60: "Passing: X"', got: r4 },
    { pass: r5 === 'Passing: A, B', description: 'All passing: "Passing: A, B"', got: r5 },
    { pass: r6 === 'Passing: B', description: '59 fails, 60 passes: "Passing: B"', got: r6 },
    { pass: r7 === 'Passing: Solo', description: 'Single passing: "Passing: Solo"', got: r7 },
    { pass: r8 === 'Passing: none', description: 'All zeros: "Passing: none"', got: r8 },
    { pass: r9 === 'Passing: A, B, C', description: 'Three passing: "Passing: A, B, C"', got: r9 }
  ];
}`,
    hints: [
      'Chain `.filter()` and `.map()` with arrow callbacks that destructure the parameter: `.filter(({score}) => score >= 60).map(({name}) => name)`. Use a template literal for the result.',
      'Store the filtered names in a variable, then return `` `Passing: ${names.length > 0 ? names.join(", ") : "none"}` ``. Destructure only what you need in each callback.',
    ],
    resources: es6RefactorRes,
  },

  // 18. ES6 Refactor: Closure Pattern
  {
    id: 1256,
    title: 'ES6 Refactor: Closure Pattern',
    type: 'js',
    tier: 3,
    category: ['es6-plus', 'modern-syntax'],
    tags: ['es6', 'refactor', 'closures', 'arrow-functions', 'const-let'],
    description:
      'Rewrite the createCounter closure from Section 2 using const/let, arrow functions, and shorthand methods.',
    starterCode:
      '/**\n * Rewrite createCounter using ES6 features:\n *   - const/let instead of var\n *   - Arrow functions or shorthand methods\n *   - Shorthand property names if applicable\n *\n * @returns {{ increment: Function, decrement: Function, getCount: Function }}\n */\nconst createCounterES6 = () => {\n\n};\n',
    solution:
      'const createCounterES6 = () => {\n  let count = 0;\n  const increment = () => { count += 1; };\n  const decrement = () => { count -= 1; };\n  const getCount = () => count;\n  return { increment, decrement, getCount };\n};',
    testRunner: `(code) => {
  const fn = new Function(code + '; return createCounterES6;')();
  const c1 = fn();
  const r1 = c1.getCount();
  c1.increment();
  const r2 = c1.getCount();
  c1.increment();
  c1.increment();
  const r3 = c1.getCount();
  c1.decrement();
  const r4 = c1.getCount();
  const c2 = fn();
  const r5 = c2.getCount();
  c2.decrement();
  c2.decrement();
  const r6 = c2.getCount();
  c1.increment();
  const r7 = c1.getCount();
  const r8 = c2.getCount();
  const c3 = fn();
  c3.increment();
  c3.decrement();
  c3.increment();
  const r9 = c3.getCount();
  return [
    { pass: r1 === 0, description: 'Starts at 0', got: String(r1) },
    { pass: r2 === 1, description: 'After increment: 1', got: String(r2) },
    { pass: r3 === 3, description: 'After three increments: 3', got: String(r3) },
    { pass: r4 === 2, description: 'After decrement: 2', got: String(r4) },
    { pass: r5 === 0, description: 'Second counter starts at 0', got: String(r5) },
    { pass: r6 === -2, description: 'Can go negative: -2', got: String(r6) },
    { pass: r7 === 3, description: 'First counter independent: 3', got: String(r7) },
    { pass: r8 === -2, description: 'Second counter independent: -2', got: String(r8) },
    { pass: r9 === 1, description: 'Mixed operations: +1 -1 +1 = 1', got: String(r9) },
    { pass: !code.includes('var '), description: 'Uses const/let instead of var', got: code.includes('var ') ? 'Found var' : 'No var' }
  ];
}`,
    hints: [
      'Replace `var` with `let` for the mutable counter and `const` for the methods. Arrow functions work for the methods since they do not need their own `this`. Use shorthand property names in the return object.',
      'Use `let count = 0;` then `const increment = () => { count += 1; };` and similar for the others. Return `{ increment, decrement, getCount }` — shorthand for `{ increment: increment, ... }`.',
    ],
    resources: es6RefactorRes,
  },

  // 19. ES6 Refactor: Composition
  {
    id: 1257,
    title: 'ES6 Refactor: Composition',
    type: 'js',
    tier: 3,
    category: ['es6-plus', 'modern-syntax'],
    tags: ['es6', 'refactor', 'composition', 'rest', 'arrow-functions'],
    description:
      'Rewrite pipeAll from Section 2 using rest parameters and arrow functions instead of arguments and var.',
    starterCode:
      '/**\n * Rewrite pipeAll using ES6:\n *   - Rest parameters instead of arguments object\n *   - Arrow functions instead of function()\n *   - const instead of var\n *\n * @param {...Function} fns - Functions to pipe left-to-right\n * @returns {Function} Composed function\n */\nconst pipeES6 = (...fns) => {\n\n};\n',
    solution:
      'const pipeES6 = (...fns) => (x) => fns.reduce((acc, fn) => fn(acc), x);',
    testRunner: `(code) => {
  const fn = new Function(code + '; return pipeES6;')();
  const double = n => n * 2;
  const addOne = n => n + 1;
  const square = n => n * n;
  const negate = n => -n;
  const r1 = fn(addOne, double)(3);
  const r2 = fn(double, addOne)(3);
  const r3 = fn(square, addOne, double)(3);
  const r4 = fn(addOne)(5);
  const r5 = fn(double, double, double)(1);
  const r6 = fn(double, addOne, negate)(4);
  const r7 = fn(negate, square)(3);
  const r8 = fn(addOne, addOne, addOne, addOne)(0);
  const identity = x => x;
  const r9 = fn(addOne, double, identity)(2);
  return [
    { pass: r1 === 8, description: 'pipeES6(addOne, double)(3) → 8', got: String(r1) },
    { pass: r2 === 7, description: 'pipeES6(double, addOne)(3) → 7', got: String(r2) },
    { pass: r3 === 20, description: 'Three fns: square→addOne→double: 9→10→20', got: String(r3) },
    { pass: r4 === 6, description: 'Single function: addOne(5) → 6', got: String(r4) },
    { pass: r5 === 8, description: 'Three doubles: 1→2→4→8', got: String(r5) },
    { pass: r6 === -9, description: 'double→addOne→negate: 8→9→-9', got: String(r6) },
    { pass: r7 === 9, description: 'negate→square: -3→9', got: String(r7) },
    { pass: r8 === 4, description: 'Four addOnes: 0→1→2→3→4', got: String(r8) },
    { pass: r9 === 6, description: 'addOne→double→identity: 3→6→6', got: String(r9) },
    { pass: !code.includes('arguments'), description: 'Uses rest params instead of arguments', got: code.includes('arguments') ? 'Found arguments' : 'No arguments' }
  ];
}`,
    hints: [
      'With rest parameters, `...fns` is already a real array — no need to copy from `arguments`. Return an arrow function that reduces over `fns`.',
      'The entire solution is one line: `const pipeES6 = (...fns) => (x) => fns.reduce((acc, fn) => fn(acc), x);`. Compare with the ES5 version that needed 5+ lines with `arguments` and `var`.',
    ],
    resources: es6RefactorRes,
  },

  // 20. ES6 Refactor: Module Pattern
  {
    id: 1258,
    title: 'ES6 Refactor: Module Pattern',
    type: 'js',
    tier: 3,
    category: ['es6-plus', 'modern-syntax'],
    tags: ['es6', 'refactor', 'module-pattern', 'arrow-functions', 'combined'],
    description:
      'Rewrite a task manager module using const/let, arrow functions, destructuring, and shorthand properties.',
    starterCode:
      '/**\n * Rewrite createTaskManager using all ES6 features:\n *   - const/let, arrow functions, shorthand properties\n *   - Destructuring in callbacks where useful\n *\n * @returns {{ addTask: Function, completeTask: Function, getTasks: Function, getPending: Function }}\n *   addTask(name) - adds {name, done: false}\n *   completeTask(name) - marks first matching undone task as done\n *   getTasks() - returns copy of all tasks\n *   getPending() - returns names of undone tasks\n */\nconst createStoreES6 = () => {\n\n};\n',
    solution:
      'const createStoreES6 = () => {\n  const tasks = [];\n\n  const addTask = (name) => {\n    tasks.push({ name, done: false });\n  };\n\n  const completeTask = (name) => {\n    const task = tasks.find(({name: n, done}) => n === name && !done);\n    if (task) task.done = true;\n  };\n\n  const getTasks = () => tasks.map(({name, done}) => ({ name, done }));\n\n  const getPending = () => tasks\n    .filter(({done}) => !done)\n    .map(({name}) => name);\n\n  return { addTask, completeTask, getTasks, getPending };\n};',
    testRunner: `(code) => {
  const fn = new Function(code + '; return createStoreES6;')();
  const tm = fn();
  const r1 = tm.getTasks();
  tm.addTask('Write code');
  tm.addTask('Run tests');
  const r2 = tm.getTasks();
  const r3 = tm.getPending();
  tm.completeTask('Write code');
  const r4 = tm.getPending();
  const r5 = tm.getTasks();
  tm.completeTask('not found');
  const r6 = tm.getPending();
  tm.addTask('Deploy');
  const r7 = tm.getPending();
  tm.completeTask('Run tests');
  tm.completeTask('Deploy');
  const r8 = tm.getPending();
  const tm2 = fn();
  tm2.addTask('Solo');
  const r9 = tm2.getPending();
  return [
    { pass: JSON.stringify(r1) === JSON.stringify([]), description: 'Starts empty', got: JSON.stringify(r1) },
    { pass: r2.length === 2 && r2[0].name === 'Write code' && r2[1].name === 'Run tests', description: 'Two tasks added', got: JSON.stringify(r2) },
    { pass: JSON.stringify(r3) === JSON.stringify(['Write code', 'Run tests']), description: 'Both pending', got: JSON.stringify(r3) },
    { pass: JSON.stringify(r4) === JSON.stringify(['Run tests']), description: 'After completing "Write code": ["Run tests"]', got: JSON.stringify(r4) },
    { pass: r5[0].done === true && r5[1].done === false, description: 'getTasks shows done status', got: JSON.stringify(r5) },
    { pass: JSON.stringify(r6) === JSON.stringify(['Run tests']), description: 'Completing non-existent is no-op', got: JSON.stringify(r6) },
    { pass: JSON.stringify(r7) === JSON.stringify(['Run tests', 'Deploy']), description: 'New task pending', got: JSON.stringify(r7) },
    { pass: JSON.stringify(r8) === JSON.stringify([]), description: 'All completed: empty pending', got: JSON.stringify(r8) },
    { pass: JSON.stringify(r9) === JSON.stringify(['Solo']), description: 'Second store is independent', got: JSON.stringify(r9) },
    { pass: !code.includes('var ') && !code.includes('function(') && !code.includes('function ('), description: 'Uses ES6 syntax: no var, no function keyword', got: 'Checked' }
  ];
}`,
    hints: [
      'This is the same logic as `createTaskManager` from Section 2, but rewritten with ES6. Use `.find()` with destructuring instead of a `for` loop for `completeTask`. Use shorthand `{ name, done: false }` and `{ addTask, completeTask, getTasks, getPending }`.',
      'For `completeTask`, use `tasks.find(({name: n, done}) => n === name && !done)` to find the first matching undone task. Rename the destructured `name` to `n` to avoid shadowing the parameter.',
    ],
    resources: es6RefactorRes,
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
    `T3 ES6+ Features — Section 3: ${exercises.length} exercises (IDs ${exercises[0].id}-${exercises[exercises.length - 1].id})`
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
