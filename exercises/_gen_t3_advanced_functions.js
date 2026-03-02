#!/usr/bin/env node
/**
 * Generator: T3 Advanced Functions — Section 2 (20 exercises, IDs 1219-1238)
 *
 * Covers: Closures, Higher-Order Functions, Function Composition,
 *         Currying & Partial Application, IIFE & Module Patterns
 *
 * Usage:
 *   node exercises/_gen_t3_advanced_functions.js            # Append to curriculum
 *   node exercises/_gen_t3_advanced_functions.js --validate  # Validate testRunners only
 */

const fs = require('fs');
const path = require('path');

const CURRICULUM_PATH = path.join(
  __dirname,
  'collections',
  'default-curriculum.json'
);

// ─── Resources (MDN only for T3) ────────────────────────────────────────────

const closureRes = [
  { label: 'MDN: Closures', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures', description: 'Closures reference' },
];
const hofRes = [
  { label: 'MDN: Functions', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions', description: 'Functions guide' },
];
const composeRes = [
  { label: 'MDN: Array.prototype.reduce()', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce', description: 'reduce reference' },
  { label: 'MDN: Array.prototype.reduceRight()', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduceRight', description: 'reduceRight reference' },
];
const curryRes = [
  { label: 'MDN: Closures', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures', description: 'Closures reference' },
  { label: 'MDN: Functions', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions', description: 'Functions guide' },
];
const iifeRes = [
  { label: 'MDN: IIFE', url: 'https://developer.mozilla.org/en-US/docs/Glossary/IIFE', description: 'IIFE reference' },
  { label: 'MDN: Closures', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures', description: 'Closures reference' },
];

// ─── Exercise Definitions ───────────────────────────────────────────────────

const exercises = [

  // ══════════════════════════════════════════════════════════════════════════
  // SUB-SECTION 1: Closures (4 exercises, IDs 1219-1222)
  // ══════════════════════════════════════════════════════════════════════════

  // 1. Closures: Counter (ENTRY POINT)
  {
    id: 1219,
    title: 'Closures: Counter',
    type: 'js',
    tier: 3,
    category: ['functions', 'advanced-functions'],
    tags: ['closures', 'private-state', 'factory', 'encapsulation'],
    description:
      'Create a closure that maintains a private count with increment, decrement, and getCount methods.',
    instructions:
      'A closure is a function that "remembers" variables from its outer scope even after the outer function has returned. This lets you create private state that can only be accessed through the returned functions.\n\nWrite a function that returns an object with three methods: `increment()` adds 1 to a private counter, `decrement()` subtracts 1, and `getCount()` returns the current value. The counter starts at 0 (see `@param`/`@returns` in the starter code).\n\nExample: `const c = createCounter(); c.increment(); c.increment(); c.getCount()` returns `2`\nExample: `const c = createCounter(); c.decrement(); c.getCount()` returns `-1`\nExample: `createCounter().getCount()` returns `0`',
    starterCode:
      '/**\n * Create a counter with private state using a closure.\n * The counter starts at 0.\n *\n * @returns {{ increment: Function, decrement: Function, getCount: Function }}\n *   increment() - adds 1 to the counter\n *   decrement() - subtracts 1 from the counter\n *   getCount() - returns the current count\n */\nfunction createCounter() {\n\n}\n',
    solution:
      'function createCounter() {\n  var count = 0;\n  return {\n    increment: function() { count += 1; },\n    decrement: function() { count -= 1; },\n    getCount: function() { return count; }\n  };\n}',
    testRunner: `(code) => {
  const fn = new Function(code + '; return createCounter;')();
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
    { pass: r1 === 0, description: 'New counter starts at 0', got: String(r1) },
    { pass: r2 === 1, description: 'After one increment: 1', got: String(r2) },
    { pass: r3 === 3, description: 'After three total increments: 3', got: String(r3) },
    { pass: r4 === 2, description: 'After decrement: 2', got: String(r4) },
    { pass: r5 === 0, description: 'Second counter starts at 0 (independent)', got: String(r5) },
    { pass: r6 === -2, description: 'Can go negative: -2', got: String(r6) },
    { pass: r7 === 3, description: 'First counter unaffected by second: 3', got: String(r7) },
    { pass: r8 === -2, description: 'Second counter unaffected by first: -2', got: String(r8) },
    { pass: r9 === 1, description: 'Mixed operations: +1 -1 +1 = 1', got: String(r9) }
  ];
}`,
    hints: [
      'Declare a variable inside the outer function to hold the count. Return an object whose methods read and modify that variable. Each call to the outer function creates a new, independent scope.',
      'Use `var count = 0;` inside `createCounter`. Return an object with `increment`, `decrement`, and `getCount` methods that use `count += 1`, `count -= 1`, and `return count` respectively.',
    ],
    resources: closureRes,
  },

  // 2. Closures: Private State
  {
    id: 1220,
    title: 'Closures: Private State',
    type: 'js',
    tier: 3,
    category: ['functions', 'advanced-functions'],
    tags: ['closures', 'private-state', 'encapsulation', 'validation'],
    description:
      'Create a closure that encapsulates a private balance with deposit, withdraw, and getBalance methods.',
    starterCode:
      '/**\n * @returns {{ deposit: Function, withdraw: Function, getBalance: Function }}\n *   deposit(amount) - adds amount to balance (ignores non-positive amounts)\n *   withdraw(amount) - subtracts amount if sufficient funds (ignores non-positive amounts)\n *   getBalance() - returns current balance\n */\nfunction createBankAccount() {\n\n}\n',
    solution:
      'function createBankAccount() {\n  var balance = 0;\n  return {\n    deposit: function(amount) {\n      if (amount > 0) balance += amount;\n    },\n    withdraw: function(amount) {\n      if (amount > 0 && amount <= balance) balance -= amount;\n    },\n    getBalance: function() { return balance; }\n  };\n}',
    testRunner: `(code) => {
  const fn = new Function(code + '; return createBankAccount;')();
  const a1 = fn();
  const r1 = a1.getBalance();
  a1.deposit(100);
  const r2 = a1.getBalance();
  a1.withdraw(30);
  const r3 = a1.getBalance();
  a1.withdraw(200);
  const r4 = a1.getBalance();
  a1.deposit(-50);
  const r5 = a1.getBalance();
  a1.withdraw(-10);
  const r6 = a1.getBalance();
  a1.deposit(0);
  const r7 = a1.getBalance();
  const a2 = fn();
  a2.deposit(50);
  const r8 = a2.getBalance();
  const r9 = a1.getBalance();
  return [
    { pass: r1 === 0, description: 'Starts with balance 0', got: String(r1) },
    { pass: r2 === 100, description: 'After deposit(100): 100', got: String(r2) },
    { pass: r3 === 70, description: 'After withdraw(30): 70', got: String(r3) },
    { pass: r4 === 70, description: 'Withdraw(200) exceeds balance — ignored: 70', got: String(r4) },
    { pass: r5 === 70, description: 'Negative deposit ignored: 70', got: String(r5) },
    { pass: r6 === 70, description: 'Negative withdraw ignored: 70', got: String(r6) },
    { pass: r7 === 70, description: 'Zero deposit ignored: 70', got: String(r7) },
    { pass: r8 === 50, description: 'Second account is independent: 50', got: String(r8) },
    { pass: r9 === 70, description: 'First account unaffected by second: 70', got: String(r9) }
  ];
}`,
    hints: [
      'Use the same pattern as a counter closure, but add validation. Deposits should only work for positive amounts. Withdrawals should only work when the amount is positive and does not exceed the balance.',
      'In `deposit`, check `if (amount > 0)` before adding. In `withdraw`, check `if (amount > 0 && amount <= balance)` before subtracting. Return the balance from `getBalance`.',
    ],
    resources: closureRes,
  },

  // 3. Closures: Function Factory
  {
    id: 1221,
    title: 'Closures: Function Factory',
    type: 'js',
    tier: 3,
    category: ['functions', 'advanced-functions'],
    tags: ['closures', 'factory', 'higher-order', 'functions'],
    description:
      'Create a function that accepts a factor and returns a new function that multiplies any number by that factor.',
    starterCode:
      '/**\n * @param {number} factor - The multiplier to close over\n * @returns {Function} A function that takes a number and returns it multiplied by factor\n */\nfunction createMultiplier(factor) {\n\n}\n',
    solution:
      'function createMultiplier(factor) {\n  return function(num) {\n    return num * factor;\n  };\n}',
    testRunner: `(code) => {
  const fn = new Function(code + '; return createMultiplier;')();
  const double = fn(2);
  const triple = fn(3);
  const r1 = double(5);
  const r2 = double(0);
  const r3 = triple(4);
  const r4 = fn(10)(7);
  const r5 = fn(0)(99);
  const r6 = fn(-1)(5);
  const r7 = double(-3);
  const r8 = fn(0.5)(10);
  const r9 = fn(1)(42);
  return [
    { pass: r1 === 10, description: 'createMultiplier(2)(5) returns 10', got: String(r1) },
    { pass: r2 === 0, description: 'createMultiplier(2)(0) returns 0', got: String(r2) },
    { pass: r3 === 12, description: 'createMultiplier(3)(4) returns 12', got: String(r3) },
    { pass: r4 === 70, description: 'createMultiplier(10)(7) returns 70', got: String(r4) },
    { pass: r5 === 0, description: 'Factor of 0 always returns 0', got: String(r5) },
    { pass: r6 === -5, description: 'Negative factor: createMultiplier(-1)(5) returns -5', got: String(r6) },
    { pass: r7 === -6, description: 'double(-3) returns -6', got: String(r7) },
    { pass: r8 === 5, description: 'Decimal factor: createMultiplier(0.5)(10) returns 5', got: String(r8) },
    { pass: r9 === 42, description: 'Factor of 1 returns input unchanged', got: String(r9) }
  ];
}`,
    hints: [
      'The outer function receives the `factor` and returns a new function. The inner function receives a number and uses the closed-over `factor` to compute the result.',
      'Return `function(num) { return num * factor; }` from inside `createMultiplier`. The returned function remembers `factor` from its outer scope.',
    ],
    resources: closureRes,
  },

  // 4. Closures: Accumulator
  {
    id: 1222,
    title: 'Closures: Accumulator',
    type: 'js',
    tier: 3,
    category: ['functions', 'advanced-functions'],
    tags: ['closures', 'accumulator', 'running-total', 'state'],
    description:
      'Create a closure that keeps a running total — each call adds to the total and returns the new sum.',
    starterCode:
      '/**\n * @param {number} initial - The starting value for the accumulator\n * @returns {Function} A function that accepts a number, adds it to the running total, and returns the new total\n */\nfunction createAccumulator(initial) {\n\n}\n',
    solution:
      'function createAccumulator(initial) {\n  var total = initial;\n  return function(n) {\n    total += n;\n    return total;\n  };\n}',
    testRunner: `(code) => {
  const fn = new Function(code + '; return createAccumulator;')();
  const acc1 = fn(0);
  const r1 = acc1(5);
  const r2 = acc1(3);
  const r3 = acc1(-2);
  const acc2 = fn(10);
  const r4 = acc2(5);
  const r5 = acc2(5);
  const r6 = acc1(0);
  const r7 = fn(100)(1);
  const acc3 = fn(0);
  const r8 = acc3(0);
  const r9 = fn(-5)(10);
  return [
    { pass: r1 === 5, description: 'Start at 0, add 5: returns 5', got: String(r1) },
    { pass: r2 === 8, description: 'Running total 5 + 3: returns 8', got: String(r2) },
    { pass: r3 === 6, description: 'Running total 8 + (-2): returns 6', got: String(r3) },
    { pass: r4 === 15, description: 'New accumulator starts at 10, add 5: returns 15', got: String(r4) },
    { pass: r5 === 20, description: 'Second accumulator: 15 + 5 = 20', got: String(r5) },
    { pass: r6 === 6, description: 'First accumulator still at 6, add 0: returns 6', got: String(r6) },
    { pass: r7 === 101, description: 'Start at 100, add 1: returns 101', got: String(r7) },
    { pass: r8 === 0, description: 'Start at 0, add 0: returns 0', got: String(r8) },
    { pass: r9 === 5, description: 'Start at -5, add 10: returns 5', got: String(r9) }
  ];
}`,
    hints: [
      'Store the initial value in a variable. Return a function that adds its argument to that variable and returns the updated total. Each accumulator instance should be independent.',
      'Use `var total = initial;` then return `function(n) { total += n; return total; }`. The closure keeps `total` alive between calls.',
    ],
    resources: closureRes,
  },

  // ══════════════════════════════════════════════════════════════════════════
  // SUB-SECTION 2: Higher-Order Functions (4 exercises, IDs 1223-1226)
  // ══════════════════════════════════════════════════════════════════════════

  // 5. Higher-Order Functions: Accept Callback (ENTRY POINT)
  {
    id: 1223,
    title: 'Higher-Order Functions: Accept Callback',
    type: 'js',
    tier: 3,
    category: ['functions', 'advanced-functions'],
    tags: ['higher-order', 'callbacks', 'functions', 'iteration'],
    description:
      'Write a function that takes an array and a callback, applies the callback to each element, and returns a new array.',
    instructions:
      'A higher-order function is a function that either accepts a function as an argument, returns a function, or both. The `.map()`, `.filter()`, and `.reduce()` methods you already know are all higher-order functions built into arrays.\n\nWrite your own version of `.map()` from scratch. It should accept an array and a callback function, apply the callback to each element, and return a new array of the results (see `@param`/`@returns` in the starter code).\n\nExample: `applyToEach([1, 2, 3], function(n) { return n * 2; })` returns `[2, 4, 6]`\nExample: `applyToEach(["a", "b"], function(s) { return s + "!"; })` returns `["a!", "b!"]`\nExample: `applyToEach([], function(n) { return n; })` returns `[]`',
    starterCode:
      '/**\n * Apply a callback to each element and return a new array of results.\n * This is a manual implementation of Array.prototype.map().\n *\n * @param {Array} arr - The input array\n * @param {Function} callback - Function to apply to each element\n * @returns {Array} New array with callback applied to each element\n */\nfunction applyToEach(arr, callback) {\n\n}\n',
    solution:
      'function applyToEach(arr, callback) {\n  var result = [];\n  for (var i = 0; i < arr.length; i++) {\n    result.push(callback(arr[i], i, arr));\n  }\n  return result;\n}',
    testRunner: `(code) => {
  const fn = new Function(code + '; return applyToEach;')();
  const r1 = fn([1, 2, 3], function(n) { return n * 2; });
  const r2 = fn([], function(n) { return n; });
  const r3 = fn(['a', 'b'], function(s) { return s + '!'; });
  const r4 = fn([true, false], function(b) { return !b; });
  const r5 = fn([1, 2, 3], function(n, i) { return n + i; });
  const r6 = fn([10], function(n) { return n * n; });
  const r7 = fn([0, 0, 0], function() { return 1; });
  const input = [1, 2, 3];
  const r8 = fn(input, function(n) { return n; });
  const r9 = fn([5, 10, 15], function(n) { return n > 8; });
  return [
    { pass: JSON.stringify(r1) === JSON.stringify([2, 4, 6]), description: '[1,2,3] doubled → [2,4,6]', got: JSON.stringify(r1) },
    { pass: JSON.stringify(r2) === JSON.stringify([]), description: 'Empty array → []', got: JSON.stringify(r2) },
    { pass: JSON.stringify(r3) === JSON.stringify(['a!', 'b!']), description: 'String transform: ["a!","b!"]', got: JSON.stringify(r3) },
    { pass: JSON.stringify(r4) === JSON.stringify([false, true]), description: 'Boolean negation: [false,true]', got: JSON.stringify(r4) },
    { pass: JSON.stringify(r5) === JSON.stringify([1, 3, 5]), description: 'Callback receives index: [1+0, 2+1, 3+2]', got: JSON.stringify(r5) },
    { pass: JSON.stringify(r6) === JSON.stringify([100]), description: 'Single element: [10] → [100]', got: JSON.stringify(r6) },
    { pass: JSON.stringify(r7) === JSON.stringify([1, 1, 1]), description: 'Constant callback: [1,1,1]', got: JSON.stringify(r7) },
    { pass: JSON.stringify(input) === JSON.stringify([1, 2, 3]), description: 'Does not mutate the original array', got: JSON.stringify(input) },
    { pass: JSON.stringify(r9) === JSON.stringify([false, true, true]), description: 'Callback returns booleans: [false,true,true]', got: JSON.stringify(r9) }
  ];
}`,
    hints: [
      'Create an empty result array. Use a `for` loop to iterate through the input array, calling the callback on each element and pushing the return value into the result.',
      'Use `var result = []; for (var i = 0; i < arr.length; i++) { result.push(callback(arr[i])); } return result;`. This mirrors how `.map()` works internally.',
    ],
    resources: hofRes,
  },

  // 6. Higher-Order Functions: Return Function
  {
    id: 1224,
    title: 'Higher-Order Functions: Return Function',
    type: 'js',
    tier: 3,
    category: ['functions', 'advanced-functions'],
    tags: ['higher-order', 'factory', 'closures', 'functions'],
    description:
      'Write a function that accepts a greeting string and returns a new function that greets any name with that greeting.',
    starterCode:
      '/**\n * @param {string} greeting - The greeting word (e.g., "Hello", "Hi")\n * @returns {Function} A function that takes a name and returns "greeting, name!"\n */\nfunction createGreeter(greeting) {\n\n}\n',
    solution:
      'function createGreeter(greeting) {\n  return function(name) {\n    return greeting + ", " + name + "!";\n  };\n}',
    testRunner: `(code) => {
  const fn = new Function(code + '; return createGreeter;')();
  const hello = fn('Hello');
  const hi = fn('Hi');
  const r1 = hello('Alice');
  const r2 = hello('Bob');
  const r3 = hi('Alice');
  const r4 = fn('Hey')('World');
  const r5 = fn('Goodbye')('Friend');
  const r6 = hello('');
  const r7 = fn('')('Alice');
  const r8 = hi('Bob');
  const r9 = fn('Welcome')('Student');
  return [
    { pass: r1 === 'Hello, Alice!', description: 'createGreeter("Hello")("Alice") → "Hello, Alice!"', got: r1 },
    { pass: r2 === 'Hello, Bob!', description: 'Same greeter, different name: "Hello, Bob!"', got: r2 },
    { pass: r3 === 'Hi, Alice!', description: 'Different greeter: "Hi, Alice!"', got: r3 },
    { pass: r4 === 'Hey, World!', description: 'Inline call: "Hey, World!"', got: r4 },
    { pass: r5 === 'Goodbye, Friend!', description: '"Goodbye, Friend!"', got: r5 },
    { pass: r6 === 'Hello, !', description: 'Empty name: "Hello, !"', got: r6 },
    { pass: r7 === ', Alice!', description: 'Empty greeting: ", Alice!"', got: r7 },
    { pass: r8 === 'Hi, Bob!', description: 'hi greeter still works: "Hi, Bob!"', got: r8 },
    { pass: r9 === 'Welcome, Student!', description: '"Welcome, Student!"', got: r9 }
  ];
}`,
    hints: [
      'Return a function from inside `createGreeter`. The inner function takes a `name` parameter and concatenates the greeting, a comma-space, the name, and an exclamation mark.',
      'Return `function(name) { return greeting + ", " + name + "!"; }`. The returned function closes over the `greeting` variable from the outer scope.',
    ],
    resources: hofRes,
  },

  // 7. Higher-Order Functions: Compose
  {
    id: 1225,
    title: 'Higher-Order Functions: Compose',
    type: 'js',
    tier: 3,
    category: ['functions', 'advanced-functions'],
    tags: ['higher-order', 'compose', 'functions', 'pipeline'],
    description:
      'Write a function that accepts two single-argument functions and returns a new function applying them right-to-left.',
    starterCode:
      '/**\n * @param {Function} f - The outer function\n * @param {Function} g - The inner function\n * @returns {Function} A function where compose(f, g)(x) equals f(g(x))\n */\nfunction compose(f, g) {\n\n}\n',
    solution:
      'function compose(f, g) {\n  return function(x) {\n    return f(g(x));\n  };\n}',
    testRunner: `(code) => {
  const fn = new Function(code + '; return compose;')();
  var double = function(n) { return n * 2; };
  var addOne = function(n) { return n + 1; };
  var negate = function(n) { return -n; };
  var square = function(n) { return n * n; };
  var toStr = function(n) { return String(n); };
  var r1 = fn(double, addOne)(3);
  var r2 = fn(addOne, double)(3);
  var r3 = fn(negate, double)(5);
  var r4 = fn(double, negate)(5);
  var r5 = fn(toStr, double)(7);
  var r6 = fn(square, addOne)(2);
  var r7 = fn(addOne, square)(2);
  var r8 = fn(double, double)(3);
  var identity = function(x) { return x; };
  var r9 = fn(identity, double)(5);
  return [
    { pass: r1 === 8, description: 'compose(double, addOne)(3) → double(4) → 8', got: String(r1) },
    { pass: r2 === 7, description: 'compose(addOne, double)(3) → addOne(6) → 7', got: String(r2) },
    { pass: r3 === -10, description: 'compose(negate, double)(5) → negate(10) → -10', got: String(r3) },
    { pass: r4 === -10, description: 'compose(double, negate)(5) → double(-5) → -10', got: String(r4) },
    { pass: r5 === '14', description: 'compose(toStr, double)(7) → toStr(14) → "14"', got: String(r5) },
    { pass: r6 === 9, description: 'compose(square, addOne)(2) → square(3) → 9', got: String(r6) },
    { pass: r7 === 5, description: 'compose(addOne, square)(2) → addOne(4) → 5', got: String(r7) },
    { pass: r8 === 12, description: 'compose(double, double)(3) → double(6) → 12', got: String(r8) },
    { pass: r9 === 10, description: 'Identity as outer: compose(identity, double)(5) → 10', got: String(r9) }
  ];
}`,
    hints: [
      'Compose means "apply g first, then apply f to the result." Return a new function that calls `g(x)` and passes that result to `f`.',
      'Return `function(x) { return f(g(x)); }`. The key is the right-to-left order: `g` runs first, then `f` wraps the result.',
    ],
    resources: hofRes,
  },

  // 8. Higher-Order Functions: Pipe
  {
    id: 1226,
    title: 'Higher-Order Functions: Pipe',
    type: 'js',
    tier: 3,
    category: ['functions', 'advanced-functions'],
    tags: ['higher-order', 'pipe', 'functions', 'pipeline'],
    description:
      'Write a function that accepts two single-argument functions and returns a new function applying them left-to-right.',
    starterCode:
      '/**\n * @param {Function} f - The first function to apply\n * @param {Function} g - The second function to apply\n * @returns {Function} A function where pipe(f, g)(x) equals g(f(x))\n */\nfunction pipe(f, g) {\n\n}\n',
    solution:
      'function pipe(f, g) {\n  return function(x) {\n    return g(f(x));\n  };\n}',
    testRunner: `(code) => {
  const fn = new Function(code + '; return pipe;')();
  var double = function(n) { return n * 2; };
  var addOne = function(n) { return n + 1; };
  var negate = function(n) { return -n; };
  var square = function(n) { return n * n; };
  var toStr = function(n) { return String(n); };
  var r1 = fn(addOne, double)(3);
  var r2 = fn(double, addOne)(3);
  var r3 = fn(double, negate)(5);
  var r4 = fn(negate, double)(5);
  var r5 = fn(double, toStr)(7);
  var r6 = fn(addOne, square)(2);
  var r7 = fn(square, addOne)(2);
  var r8 = fn(double, double)(3);
  var identity = function(x) { return x; };
  var r9 = fn(double, identity)(5);
  return [
    { pass: r1 === 8, description: 'pipe(addOne, double)(3) → addOne(3)=4 → double(4)=8', got: String(r1) },
    { pass: r2 === 7, description: 'pipe(double, addOne)(3) → double(3)=6 → addOne(6)=7', got: String(r2) },
    { pass: r3 === -10, description: 'pipe(double, negate)(5) → double(5)=10 → negate(10)=-10', got: String(r3) },
    { pass: r4 === -10, description: 'pipe(negate, double)(5) → negate(5)=-5 → double(-5)=-10', got: String(r4) },
    { pass: r5 === '14', description: 'pipe(double, toStr)(7) → double(7)=14 → toStr(14)="14"', got: String(r5) },
    { pass: r6 === 9, description: 'pipe(addOne, square)(2) → addOne(2)=3 → square(3)=9', got: String(r6) },
    { pass: r7 === 5, description: 'pipe(square, addOne)(2) → square(2)=4 → addOne(4)=5', got: String(r7) },
    { pass: r8 === 12, description: 'pipe(double, double)(3) → 6 → 12', got: String(r8) },
    { pass: r9 === 10, description: 'Identity as second: pipe(double, identity)(5) → 10', got: String(r9) }
  ];
}`,
    hints: [
      'Pipe is the reverse of compose — apply `f` first, then pass the result to `g`. Return a new function that chains them left-to-right.',
      'Return `function(x) { return g(f(x)); }`. Notice this is the mirror of compose: `f` runs first, then `g` wraps the result.',
    ],
    resources: hofRes,
  },

  // ══════════════════════════════════════════════════════════════════════════
  // SUB-SECTION 3: Function Composition (3 exercises, IDs 1227-1229)
  // ══════════════════════════════════════════════════════════════════════════

  // 9. Function Composition: Compose N (ENTRY POINT)
  {
    id: 1227,
    title: 'Function Composition: Compose N',
    type: 'js',
    tier: 3,
    category: ['functions', 'advanced-functions'],
    tags: ['compose', 'higher-order', 'reduceRight', 'pipeline'],
    description:
      'Write a function that accepts any number of single-argument functions and returns a new function applying them right-to-left.',
    instructions:
      'You have already written `compose` for two functions. Now generalize it to accept any number of functions. Given `composeAll(f, g, h)`, the result should apply them right-to-left: `f(g(h(x)))`.\n\nYou can use `.reduceRight()` to fold an array of functions from right to left, passing the accumulated result through each one (see `@param`/`@returns` in the starter code).\n\nExample: `composeAll(double, addOne, square)(3)` applies square(3)=9, addOne(9)=10, double(10)=20\nExample: `composeAll(addOne)(5)` returns `6`\nExample: `composeAll(double, double)(3)` returns `12`',
    starterCode:
      '/**\n * Compose any number of single-argument functions, applied right-to-left.\n * composeAll(f, g, h)(x) equals f(g(h(x)))\n *\n * @param {...Function} fns - Functions to compose (at least one)\n * @returns {Function} A function that applies all fns right-to-left\n */\nfunction composeAll() {\n  var fns = [];\n  for (var i = 0; i < arguments.length; i++) {\n    fns.push(arguments[i]);\n  }\n\n}\n',
    solution:
      'function composeAll() {\n  var fns = [];\n  for (var i = 0; i < arguments.length; i++) {\n    fns.push(arguments[i]);\n  }\n  return function(x) {\n    return fns.reduceRight(function(acc, fn) {\n      return fn(acc);\n    }, x);\n  };\n}',
    testRunner: `(code) => {
  const fn = new Function(code + '; return composeAll;')();
  var double = function(n) { return n * 2; };
  var addOne = function(n) { return n + 1; };
  var square = function(n) { return n * n; };
  var negate = function(n) { return -n; };
  var r1 = fn(double, addOne)(3);
  var r2 = fn(addOne, double)(3);
  var r3 = fn(double, addOne, square)(3);
  var r4 = fn(addOne)(5);
  var r5 = fn(double, double, double)(1);
  var r6 = fn(negate, addOne, double)(4);
  var r7 = fn(square, negate)(3);
  var r8 = fn(addOne, addOne, addOne, addOne)(0);
  var identity = function(x) { return x; };
  var r9 = fn(identity, double, addOne)(2);
  return [
    { pass: r1 === 8, description: 'composeAll(double, addOne)(3) → double(4) → 8', got: String(r1) },
    { pass: r2 === 7, description: 'composeAll(addOne, double)(3) → addOne(6) → 7', got: String(r2) },
    { pass: r3 === 20, description: 'Three fns: square(3)=9, addOne(9)=10, double(10)=20', got: String(r3) },
    { pass: r4 === 6, description: 'Single function: addOne(5) → 6', got: String(r4) },
    { pass: r5 === 8, description: 'Three doubles: 1→2→4→8', got: String(r5) },
    { pass: r6 === -9, description: 'double(4)=8, addOne(8)=9, negate(9)=-9', got: String(r6) },
    { pass: r7 === 9, description: 'negate(3)=-3, square(-3)=9', got: String(r7) },
    { pass: r8 === 4, description: 'Four addOnes: 0→1→2→3→4', got: String(r8) },
    { pass: r9 === 6, description: 'addOne(2)=3, double(3)=6, identity(6)=6', got: String(r9) }
  ];
}`,
    hints: [
      'Collect the arguments into an array. Return a function that uses `.reduceRight()` to apply each function from right-to-left, starting with the input value as the initial accumulator.',
      'Return `function(x) { return fns.reduceRight(function(acc, fn) { return fn(acc); }, x); }`. The `x` serves as the initial value, and each function transforms the accumulator.',
    ],
    resources: composeRes,
  },

  // 10. Function Composition: Pipe N
  {
    id: 1228,
    title: 'Function Composition: Pipe N',
    type: 'js',
    tier: 3,
    category: ['functions', 'advanced-functions'],
    tags: ['pipe', 'higher-order', 'reduce', 'pipeline'],
    description:
      'Write a function that accepts any number of single-argument functions and returns a new function applying them left-to-right.',
    starterCode:
      '/**\n * @param {...Function} fns - Functions to pipe (at least one)\n * @returns {Function} A function that applies all fns left-to-right: pipeAll(f, g, h)(x) equals h(g(f(x)))\n */\nfunction pipeAll() {\n  var fns = [];\n  for (var i = 0; i < arguments.length; i++) {\n    fns.push(arguments[i]);\n  }\n\n}\n',
    solution:
      'function pipeAll() {\n  var fns = [];\n  for (var i = 0; i < arguments.length; i++) {\n    fns.push(arguments[i]);\n  }\n  return function(x) {\n    return fns.reduce(function(acc, fn) {\n      return fn(acc);\n    }, x);\n  };\n}',
    testRunner: `(code) => {
  const fn = new Function(code + '; return pipeAll;')();
  var double = function(n) { return n * 2; };
  var addOne = function(n) { return n + 1; };
  var square = function(n) { return n * n; };
  var negate = function(n) { return -n; };
  var r1 = fn(addOne, double)(3);
  var r2 = fn(double, addOne)(3);
  var r3 = fn(square, addOne, double)(3);
  var r4 = fn(addOne)(5);
  var r5 = fn(double, double, double)(1);
  var r6 = fn(double, addOne, negate)(4);
  var r7 = fn(negate, square)(3);
  var r8 = fn(addOne, addOne, addOne, addOne)(0);
  var identity = function(x) { return x; };
  var r9 = fn(addOne, double, identity)(2);
  return [
    { pass: r1 === 8, description: 'pipeAll(addOne, double)(3) → addOne(3)=4 → double(4)=8', got: String(r1) },
    { pass: r2 === 7, description: 'pipeAll(double, addOne)(3) → double(3)=6 → addOne(6)=7', got: String(r2) },
    { pass: r3 === 20, description: 'Three fns: square(3)=9, addOne(9)=10, double(10)=20', got: String(r3) },
    { pass: r4 === 6, description: 'Single function: addOne(5) → 6', got: String(r4) },
    { pass: r5 === 8, description: 'Three doubles: 1→2→4→8', got: String(r5) },
    { pass: r6 === -9, description: 'double(4)=8, addOne(8)=9, negate(9)=-9', got: String(r6) },
    { pass: r7 === 9, description: 'negate(3)=-3, square(-3)=9', got: String(r7) },
    { pass: r8 === 4, description: 'Four addOnes: 0→1→2→3→4', got: String(r8) },
    { pass: r9 === 6, description: 'addOne(2)=3, double(3)=6, identity(6)=6', got: String(r9) }
  ];
}`,
    hints: [
      'This is the mirror of `composeAll`. Use `.reduce()` instead of `.reduceRight()` to apply functions left-to-right.',
      'Return `function(x) { return fns.reduce(function(acc, fn) { return fn(acc); }, x); }`. The only difference from `composeAll` is `.reduce()` vs `.reduceRight()`.',
    ],
    resources: composeRes,
  },

  // 11. Function Composition: Predicate Combiner
  {
    id: 1229,
    title: 'Function Composition: Predicate Combiner',
    type: 'js',
    tier: 3,
    category: ['functions', 'advanced-functions'],
    tags: ['compose', 'predicates', 'higher-order', 'every'],
    description:
      'Write a function that accepts an array of predicate functions and returns a new predicate that returns true only if all predicates pass.',
    starterCode:
      '/**\n * @param {Function[]} predicates - Array of functions that return boolean\n * @returns {Function} A function that returns true only if all predicates return true for the given value\n */\nfunction allPass(predicates) {\n\n}\n',
    solution:
      'function allPass(predicates) {\n  return function(value) {\n    return predicates.every(function(pred) {\n      return pred(value);\n    });\n  };\n}',
    testRunner: `(code) => {
  const fn = new Function(code + '; return allPass;')();
  var isPositive = function(n) { return n > 0; };
  var isEven = function(n) { return n % 2 === 0; };
  var isSmall = function(n) { return n < 100; };
  var isLong = function(s) { return s.length > 3; };
  var startsA = function(s) { return s[0] === 'A'; };
  var check1 = fn([isPositive, isEven]);
  var r1 = check1(4);
  var r2 = check1(-2);
  var r3 = check1(3);
  var r4 = check1(0);
  var check2 = fn([isPositive, isEven, isSmall]);
  var r5 = check2(50);
  var r6 = check2(200);
  var check3 = fn([isLong, startsA]);
  var r7 = check3('Alice');
  var r8 = check3('Al');
  var r9 = fn([])(42);
  return [
    { pass: r1 === true, description: '4 is positive and even → true', got: String(r1) },
    { pass: r2 === false, description: '-2 is even but not positive → false', got: String(r2) },
    { pass: r3 === false, description: '3 is positive but not even → false', got: String(r3) },
    { pass: r4 === false, description: '0 is even but not positive → false', got: String(r4) },
    { pass: r5 === true, description: '50 passes all three predicates → true', got: String(r5) },
    { pass: r6 === false, description: '200 is not < 100 → false', got: String(r6) },
    { pass: r7 === true, description: '"Alice" is long and starts with A → true', got: String(r7) },
    { pass: r8 === false, description: '"Al" starts with A but length <= 3 → false', got: String(r8) },
    { pass: r9 === true, description: 'Empty predicates array → true (vacuous truth)', got: String(r9) }
  ];
}`,
    hints: [
      'Return a function that tests the value against every predicate. You can use `.every()` to check that all predicates return `true` for the given value.',
      'Return `function(value) { return predicates.every(function(pred) { return pred(value); }); }`. The `.every()` method short-circuits on the first `false`.',
    ],
    resources: composeRes,
  },

  // ══════════════════════════════════════════════════════════════════════════
  // SUB-SECTION 4: Currying & Partial Application (4 exercises, IDs 1230-1233)
  // ══════════════════════════════════════════════════════════════════════════

  // 12. Currying: Two Arguments (ENTRY POINT)
  {
    id: 1230,
    title: 'Currying: Two Arguments',
    type: 'js',
    tier: 3,
    category: ['functions', 'advanced-functions'],
    tags: ['currying', 'higher-order', 'closures', 'partial-application'],
    description:
      'Write a function that accepts a two-argument function and returns a curried version.',
    instructions:
      'Currying transforms a function that takes multiple arguments into a sequence of functions that each take one argument. Instead of calling `add(1, 2)`, a curried version is called as `curriedAdd(1)(2)`.\n\nWrite a function that takes any two-argument function and returns a curried version: `curry2(fn)(a)(b)` should equal `fn(a, b)` (see `@param`/`@returns` in the starter code).\n\nExample: `curry2(function(a, b) { return a + b; })(1)(2)` returns `3`\nExample: `var add1 = curry2(function(a, b) { return a + b; })(1); add1(5)` returns `6`\nExample: `curry2(function(a, b) { return a * b; })(3)(4)` returns `12`',
    starterCode:
      '/**\n * Transform a two-argument function into a curried version.\n * curry2(fn)(a)(b) is equivalent to fn(a, b).\n *\n * @param {Function} fn - A function that takes exactly two arguments\n * @returns {Function} A function that takes one argument and returns a function that takes the second\n */\nfunction curry2(fn) {\n\n}\n',
    solution:
      'function curry2(fn) {\n  return function(a) {\n    return function(b) {\n      return fn(a, b);\n    };\n  };\n}',
    testRunner: `(code) => {
  const fn = new Function(code + '; return curry2;')();
  var add = function(a, b) { return a + b; };
  var mul = function(a, b) { return a * b; };
  var sub = function(a, b) { return a - b; };
  var concat = function(a, b) { return a + b; };
  var r1 = fn(add)(1)(2);
  var r2 = fn(mul)(3)(4);
  var r3 = fn(sub)(10)(3);
  var add5 = fn(add)(5);
  var r4 = add5(10);
  var r5 = add5(0);
  var r6 = fn(concat)('hello ')('world');
  var r7 = fn(Math.pow)(2)(10);
  var r8 = fn(sub)(0)(5);
  var r9 = fn(mul)(0)(100);
  return [
    { pass: r1 === 3, description: 'curry2(add)(1)(2) → 3', got: String(r1) },
    { pass: r2 === 12, description: 'curry2(mul)(3)(4) → 12', got: String(r2) },
    { pass: r3 === 7, description: 'curry2(sub)(10)(3) → 7', got: String(r3) },
    { pass: r4 === 15, description: 'Reuse: add5(10) → 15', got: String(r4) },
    { pass: r5 === 5, description: 'Reuse: add5(0) → 5', got: String(r5) },
    { pass: r6 === 'hello world', description: 'String concat: "hello " + "world"', got: r6 },
    { pass: r7 === 1024, description: 'curry2(Math.pow)(2)(10) → 1024', got: String(r7) },
    { pass: r8 === -5, description: 'curry2(sub)(0)(5) → -5', got: String(r8) },
    { pass: r9 === 0, description: 'curry2(mul)(0)(100) → 0', got: String(r9) }
  ];
}`,
    hints: [
      'Return a function that takes the first argument `a`. That function returns another function that takes the second argument `b` and calls the original function with both.',
      'Use nested returns: `return function(a) { return function(b) { return fn(a, b); }; };`. Each returned function captures one argument via closure.',
    ],
    resources: curryRes,
  },

  // 13. Currying: Three Arguments
  {
    id: 1231,
    title: 'Currying: Three Arguments',
    type: 'js',
    tier: 3,
    category: ['functions', 'advanced-functions'],
    tags: ['currying', 'higher-order', 'closures', 'nested-functions'],
    description:
      'Write a function that accepts a three-argument function and returns a curried version.',
    starterCode:
      '/**\n * @param {Function} fn - A function that takes exactly three arguments\n * @returns {Function} A curried version: curry3(fn)(a)(b)(c) equals fn(a, b, c)\n */\nfunction curry3(fn) {\n\n}\n',
    solution:
      'function curry3(fn) {\n  return function(a) {\n    return function(b) {\n      return function(c) {\n        return fn(a, b, c);\n      };\n    };\n  };\n}',
    testRunner: `(code) => {
  const fn = new Function(code + '; return curry3;')();
  var add3 = function(a, b, c) { return a + b + c; };
  var mul3 = function(a, b, c) { return a * b * c; };
  var join = function(a, b, c) { return a + '-' + b + '-' + c; };
  var r1 = fn(add3)(1)(2)(3);
  var r2 = fn(mul3)(2)(3)(4);
  var r3 = fn(join)('a')('b')('c');
  var addTo5 = fn(add3)(5);
  var r4 = addTo5(10)(20);
  var addTo5And10 = addTo5(10);
  var r5 = addTo5And10(1);
  var r6 = addTo5And10(2);
  var r7 = fn(add3)(0)(0)(0);
  var r8 = fn(mul3)(1)(1)(1);
  var r9 = fn(add3)(-1)(0)(1);
  return [
    { pass: r1 === 6, description: 'curry3(add3)(1)(2)(3) → 6', got: String(r1) },
    { pass: r2 === 24, description: 'curry3(mul3)(2)(3)(4) → 24', got: String(r2) },
    { pass: r3 === 'a-b-c', description: 'curry3(join)("a")("b")("c") → "a-b-c"', got: r3 },
    { pass: r4 === 35, description: 'Partial: addTo5(10)(20) → 35', got: String(r4) },
    { pass: r5 === 16, description: 'Partial: addTo5And10(1) → 16', got: String(r5) },
    { pass: r6 === 17, description: 'Reuse partial: addTo5And10(2) → 17', got: String(r6) },
    { pass: r7 === 0, description: 'All zeros: 0+0+0 → 0', got: String(r7) },
    { pass: r8 === 1, description: 'All ones: 1*1*1 → 1', got: String(r8) },
    { pass: r9 === 0, description: 'Negative: -1+0+1 → 0', got: String(r9) }
  ];
}`,
    hints: [
      'Extend the `curry2` pattern by adding one more level of nesting. Each returned function captures one argument, and the innermost function calls the original with all three.',
      'Return three levels of nested functions: `function(a) { return function(b) { return function(c) { return fn(a, b, c); }; }; }`. Each level closes over one argument.',
    ],
    resources: curryRes,
  },

  // 14. Partial Application
  {
    id: 1232,
    title: 'Partial Application',
    type: 'js',
    tier: 3,
    category: ['functions', 'advanced-functions'],
    tags: ['partial-application', 'closures', 'higher-order', 'functions'],
    description:
      'Write a function that accepts a two-argument function and the first argument, returning a new function that accepts the second.',
    starterCode:
      '/**\n * @param {Function} fn - A function that takes two arguments\n * @param {*} first - The value to fix as the first argument\n * @returns {Function} A function that takes one argument and calls fn(first, second)\n */\nfunction partial(fn, first) {\n\n}\n',
    solution:
      'function partial(fn, first) {\n  return function(second) {\n    return fn(first, second);\n  };\n}',
    testRunner: `(code) => {
  const fn = new Function(code + '; return partial;')();
  var add = function(a, b) { return a + b; };
  var mul = function(a, b) { return a * b; };
  var sub = function(a, b) { return a - b; };
  var greet = function(greeting, name) { return greeting + ', ' + name; };
  var add10 = fn(add, 10);
  var r1 = add10(5);
  var r2 = add10(0);
  var r3 = fn(mul, 3)(7);
  var r4 = fn(sub, 100)(25);
  var r5 = fn(greet, 'Hello')('Alice');
  var r6 = fn(greet, 'Hi')('Bob');
  var double = fn(mul, 2);
  var r7 = double(8);
  var r8 = double(-3);
  var r9 = fn(Math.pow, 2)(8);
  return [
    { pass: r1 === 15, description: 'partial(add, 10)(5) → 15', got: String(r1) },
    { pass: r2 === 10, description: 'partial(add, 10)(0) → 10', got: String(r2) },
    { pass: r3 === 21, description: 'partial(mul, 3)(7) → 21', got: String(r3) },
    { pass: r4 === 75, description: 'partial(sub, 100)(25) → 75', got: String(r4) },
    { pass: r5 === 'Hello, Alice', description: 'partial(greet, "Hello")("Alice")', got: r5 },
    { pass: r6 === 'Hi, Bob', description: 'partial(greet, "Hi")("Bob")', got: r6 },
    { pass: r7 === 16, description: 'Reuse: double(8) → 16', got: String(r7) },
    { pass: r8 === -6, description: 'Reuse: double(-3) → -6', got: String(r8) },
    { pass: r9 === 256, description: 'partial(Math.pow, 2)(8) → 256', got: String(r9) }
  ];
}`,
    hints: [
      'Partial application "locks in" the first argument and returns a function waiting for the rest. The returned function calls the original with both the fixed and new arguments.',
      'Return `function(second) { return fn(first, second); }`. The `first` value is captured by the closure when `partial` is called.',
    ],
    resources: curryRes,
  },

  // 15. Currying: Practical Usage
  {
    id: 1233,
    title: 'Currying: Practical Usage',
    type: 'js',
    tier: 3,
    category: ['functions', 'advanced-functions'],
    tags: ['currying', 'practical', 'string', 'closures'],
    description:
      'Use currying to create a configurable string formatter that wraps a string with a prefix and suffix.',
    starterCode:
      '/**\n * @param {string} prefix - The string to prepend\n * @returns {Function} A function that takes a suffix\n *   @returns {Function} A function that takes a string and returns prefix + str + suffix\n */\nfunction createFormatter(prefix) {\n\n}\n',
    solution:
      'function createFormatter(prefix) {\n  return function(suffix) {\n    return function(str) {\n      return prefix + str + suffix;\n    };\n  };\n}',
    testRunner: `(code) => {
  const fn = new Function(code + '; return createFormatter;')();
  var r1 = fn('[')(']')('hello');
  var r2 = fn('<')('>') ('tag');
  var r3 = fn('(')(')')('grouped');
  var parens = fn('(')(')');
  var r4 = parens('a');
  var r5 = parens('b');
  var r6 = fn('**')('**')('bold');
  var r7 = fn('')('')('plain');
  var r8 = fn('<<')('>>') ('arrow');
  var htmlTag = fn('<div>')('</div>');
  var r9 = htmlTag('content');
  return [
    { pass: r1 === '[hello]', description: 'createFormatter("[")("](")("hello") → "[hello]"', got: r1 },
    { pass: r2 === '<tag>', description: 'Angle brackets: "<tag>"', got: r2 },
    { pass: r3 === '(grouped)', description: 'Parentheses: "(grouped)"', got: r3 },
    { pass: r4 === '(a)', description: 'Reuse parens: "(a)"', got: r4 },
    { pass: r5 === '(b)', description: 'Reuse parens: "(b)"', got: r5 },
    { pass: r6 === '**bold**', description: 'Markdown bold: "**bold**"', got: r6 },
    { pass: r7 === 'plain', description: 'Empty prefix and suffix: "plain"', got: r7 },
    { pass: r8 === '<<arrow>>', description: 'Double angle: "<<arrow>>"', got: r8 },
    { pass: r9 === '<div>content</div>', description: 'HTML-style: "<div>content</div>"', got: r9 }
  ];
}`,
    hints: [
      'This is a three-level curried function. The first call captures the prefix, the second captures the suffix, and the third concatenates them around the input string.',
      'Return three nested functions: the innermost returns `prefix + str + suffix`. Each level closes over one argument, just like `curry3`.',
    ],
    resources: curryRes,
  },

  // ══════════════════════════════════════════════════════════════════════════
  // SUB-SECTION 5: IIFE & Module Patterns (5 exercises, IDs 1234-1238)
  // ══════════════════════════════════════════════════════════════════════════

  // 16. IIFE: Basics (ENTRY POINT)
  {
    id: 1234,
    title: 'IIFE: Basics',
    type: 'js',
    tier: 3,
    category: ['functions', 'advanced-functions'],
    tags: ['iife', 'closures', 'private-state', 'encapsulation'],
    description:
      'Use an IIFE to create an ID generator with a private counter that returns a unique ID string each call.',
    instructions:
      'An IIFE (Immediately Invoked Function Expression) is a function that runs as soon as it is defined: `(function() { ... })()`. Variables declared inside the IIFE cannot be accessed from outside, but the returned value can still use them via closure.\n\nWrite a function that uses an IIFE internally to create a private counter. Each time the returned function is called, it increments the counter and returns an ID string in the format `"id_1"`, `"id_2"`, etc. (see `@param`/`@returns` in the starter code).\n\nExample: `var gen = createIdGenerator(); gen()` returns `"id_1"`\nExample: `gen()` returns `"id_2"` (counter increments)\nExample: `var gen2 = createIdGenerator(); gen2()` returns `"id_1"` (independent counter)',
    starterCode:
      '/**\n * Create an ID generator using an IIFE for private state.\n * Each generator has its own independent counter starting at 0.\n * Each call returns "id_N" where N is the incrementing count.\n *\n * @returns {Function} A function that returns "id_1", "id_2", etc.\n */\nfunction createIdGenerator() {\n  // Use an IIFE to create private state\n\n}\n',
    solution:
      'function createIdGenerator() {\n  return (function() {\n    var count = 0;\n    return function() {\n      count += 1;\n      return "id_" + count;\n    };\n  })();\n}',
    testRunner: `(code) => {
  const fn = new Function(code + '; return createIdGenerator;')();
  var gen1 = fn();
  var r1 = gen1();
  var r2 = gen1();
  var r3 = gen1();
  var gen2 = fn();
  var r4 = gen2();
  var r5 = gen1();
  var r6 = gen2();
  var gen3 = fn();
  var r7 = gen3();
  var r8 = gen3();
  var r9 = gen3();
  return [
    { pass: r1 === 'id_1', description: 'First call returns "id_1"', got: r1 },
    { pass: r2 === 'id_2', description: 'Second call returns "id_2"', got: r2 },
    { pass: r3 === 'id_3', description: 'Third call returns "id_3"', got: r3 },
    { pass: r4 === 'id_1', description: 'New generator starts at "id_1"', got: r4 },
    { pass: r5 === 'id_4', description: 'First generator continues: "id_4"', got: r5 },
    { pass: r6 === 'id_2', description: 'Second generator continues independently: "id_2"', got: r6 },
    { pass: r7 === 'id_1', description: 'Third generator starts at "id_1"', got: r7 },
    { pass: r8 === 'id_2', description: 'Third generator: "id_2"', got: r8 },
    { pass: r9 === 'id_3', description: 'Third generator: "id_3"', got: r9 }
  ];
}`,
    hints: [
      'Wrap a function expression in parentheses and call it immediately: `(function() { ... })()`. Inside, declare a counter variable and return a function that increments and formats it.',
      'Return the result of an IIFE: `return (function() { var count = 0; return function() { count += 1; return "id_" + count; }; })();`. The IIFE creates the private scope, and the inner function is what gets returned.',
    ],
    resources: iifeRes,
  },

  // 17. IIFE: With Parameters
  {
    id: 1235,
    title: 'IIFE: With Parameters',
    type: 'js',
    tier: 3,
    category: ['functions', 'advanced-functions'],
    tags: ['iife', 'closures', 'configuration', 'encapsulation'],
    description:
      'Use an IIFE to capture a prefix configuration and return a logger with log, warn, and error methods.',
    starterCode:
      '/**\n * @param {string} prefix - A label to prepend to all messages (e.g., "[App]")\n * @returns {{ log: Function, warn: Function, error: Function }}\n *   log(msg) - returns "prefix msg"\n *   warn(msg) - returns "prefix WARNING: msg"\n *   error(msg) - returns "prefix ERROR: msg"\n */\nfunction createConfiguredLogger(prefix) {\n\n}\n',
    solution:
      'function createConfiguredLogger(prefix) {\n  return (function(p) {\n    return {\n      log: function(msg) { return p + " " + msg; },\n      warn: function(msg) { return p + " WARNING: " + msg; },\n      error: function(msg) { return p + " ERROR: " + msg; }\n    };\n  })(prefix);\n}',
    testRunner: `(code) => {
  const fn = new Function(code + '; return createConfiguredLogger;')();
  var app = fn('[App]');
  var r1 = app.log('started');
  var r2 = app.warn('low memory');
  var r3 = app.error('crash');
  var db = fn('[DB]');
  var r4 = db.log('connected');
  var r5 = db.error('timeout');
  var r6 = app.log('still running');
  var r7 = fn('[X]').log('test');
  var r8 = fn('[X]').warn('test');
  var r9 = fn('[X]').error('test');
  return [
    { pass: r1 === '[App] started', description: 'log: "[App] started"', got: r1 },
    { pass: r2 === '[App] WARNING: low memory', description: 'warn: "[App] WARNING: low memory"', got: r2 },
    { pass: r3 === '[App] ERROR: crash', description: 'error: "[App] ERROR: crash"', got: r3 },
    { pass: r4 === '[DB] connected', description: 'Different prefix: "[DB] connected"', got: r4 },
    { pass: r5 === '[DB] ERROR: timeout', description: 'DB error: "[DB] ERROR: timeout"', got: r5 },
    { pass: r6 === '[App] still running', description: 'App logger still works: "[App] still running"', got: r6 },
    { pass: r7 === '[X] test', description: 'Inline log: "[X] test"', got: r7 },
    { pass: r8 === '[X] WARNING: test', description: 'Inline warn: "[X] WARNING: test"', got: r8 },
    { pass: r9 === '[X] ERROR: test', description: 'Inline error: "[X] ERROR: test"', got: r9 }
  ];
}`,
    hints: [
      'Pass the `prefix` as an argument to the IIFE: `(function(p) { ... })(prefix)`. Inside, return an object with `log`, `warn`, and `error` methods that use `p`.',
      'The IIFE captures `prefix` as parameter `p`. Return `{ log: function(msg) { return p + " " + msg; }, warn: ..., error: ... }`. Each method concatenates the prefix with the appropriate label and message.',
    ],
    resources: iifeRes,
  },

  // 18. Module Pattern: Revealing
  {
    id: 1236,
    title: 'Module Pattern: Revealing',
    type: 'js',
    tier: 3,
    category: ['functions', 'advanced-functions'],
    tags: ['module-pattern', 'closures', 'encapsulation', 'private-state'],
    description:
      'Use the revealing module pattern to create a calculator with private state and history tracking.',
    starterCode:
      '/**\n * @returns {{ add: Function, subtract: Function, getResult: Function, getHistory: Function }}\n *   add(n) - adds n to result, records "add:n" in history\n *   subtract(n) - subtracts n from result, records "subtract:n" in history\n *   getResult() - returns current result (starts at 0)\n *   getHistory() - returns copy of the operations history array\n */\nfunction createCalculator() {\n\n}\n',
    solution:
      'function createCalculator() {\n  var result = 0;\n  var history = [];\n\n  function add(n) {\n    result += n;\n    history.push("add:" + n);\n  }\n\n  function subtract(n) {\n    result -= n;\n    history.push("subtract:" + n);\n  }\n\n  function getResult() {\n    return result;\n  }\n\n  function getHistory() {\n    return history.slice();\n  }\n\n  return {\n    add: add,\n    subtract: subtract,\n    getResult: getResult,\n    getHistory: getHistory\n  };\n}',
    testRunner: `(code) => {
  const fn = new Function(code + '; return createCalculator;')();
  var c1 = fn();
  var r1 = c1.getResult();
  c1.add(10);
  var r2 = c1.getResult();
  c1.subtract(3);
  var r3 = c1.getResult();
  var r4 = c1.getHistory();
  c1.add(5);
  var r5 = c1.getHistory();
  var h = c1.getHistory();
  h.push('tamper');
  var r6 = c1.getHistory();
  var c2 = fn();
  c2.add(100);
  var r7 = c2.getResult();
  var r8 = c1.getResult();
  var c3 = fn();
  var r9 = c3.getHistory();
  return [
    { pass: r1 === 0, description: 'Starts at 0', got: String(r1) },
    { pass: r2 === 10, description: 'After add(10): 10', got: String(r2) },
    { pass: r3 === 7, description: 'After subtract(3): 7', got: String(r3) },
    { pass: JSON.stringify(r4) === JSON.stringify(['add:10', 'subtract:3']), description: 'History: ["add:10","subtract:3"]', got: JSON.stringify(r4) },
    { pass: JSON.stringify(r5) === JSON.stringify(['add:10', 'subtract:3', 'add:5']), description: 'History grows: ["add:10","subtract:3","add:5"]', got: JSON.stringify(r5) },
    { pass: r6.length === 3, description: 'getHistory returns a copy — tampering does not affect internal state', got: JSON.stringify(r6) },
    { pass: r7 === 100, description: 'Second calculator is independent: 100', got: String(r7) },
    { pass: r8 === 12, description: 'First calculator unaffected: 12', got: String(r8) },
    { pass: JSON.stringify(r9) === JSON.stringify([]), description: 'New calculator has empty history', got: JSON.stringify(r9) }
  ];
}`,
    hints: [
      'Declare private variables (`result`, `history`) and private functions inside `createCalculator`. Return an object that exposes only the public methods. Use `.slice()` in `getHistory` to return a copy.',
      'Define `var result = 0; var history = [];` then define `add`, `subtract`, `getResult`, and `getHistory` as named functions. Return `{ add: add, subtract: subtract, getResult: getResult, getHistory: getHistory }`.',
    ],
    resources: iifeRes,
  },

  // 19. Module Pattern: Namespace
  {
    id: 1237,
    title: 'Module Pattern: Namespace',
    type: 'js',
    tier: 3,
    category: ['functions', 'advanced-functions'],
    tags: ['module-pattern', 'namespace', 'validation', 'encapsulation'],
    description:
      'Use the module pattern to create a validator namespace with isNonEmpty, isInRange, and isValidLength methods.',
    starterCode:
      '/**\n * @returns {{ isNonEmpty: Function, isInRange: Function, isValidLength: Function }}\n *   isNonEmpty(str) - returns true if str has length > 0 after trimming\n *   isInRange(n, min, max) - returns true if min <= n <= max\n *   isValidLength(str, min, max) - returns true if trimmed string length is between min and max (inclusive)\n */\nfunction createValidator() {\n\n}\n',
    solution:
      'function createValidator() {\n  function trimStr(str) {\n    return str.trim();\n  }\n\n  function isNonEmpty(str) {\n    return trimStr(str).length > 0;\n  }\n\n  function isInRange(n, min, max) {\n    return n >= min && n <= max;\n  }\n\n  function isValidLength(str, min, max) {\n    var len = trimStr(str).length;\n    return isInRange(len, min, max);\n  }\n\n  return {\n    isNonEmpty: isNonEmpty,\n    isInRange: isInRange,\n    isValidLength: isValidLength\n  };\n}',
    testRunner: `(code) => {
  const fn = new Function(code + '; return createValidator;')();
  var v = fn();
  var r1 = v.isNonEmpty('hello');
  var r2 = v.isNonEmpty('');
  var r3 = v.isNonEmpty('   ');
  var r4 = v.isInRange(5, 1, 10);
  var r5 = v.isInRange(0, 1, 10);
  var r6 = v.isInRange(10, 1, 10);
  var r7 = v.isValidLength('hello', 3, 10);
  var r8 = v.isValidLength('hi', 3, 10);
  var r9 = v.isValidLength('  hi  ', 1, 2);
  return [
    { pass: r1 === true, description: 'isNonEmpty("hello") → true', got: String(r1) },
    { pass: r2 === false, description: 'isNonEmpty("") → false', got: String(r2) },
    { pass: r3 === false, description: 'isNonEmpty("   ") → false (whitespace only)', got: String(r3) },
    { pass: r4 === true, description: 'isInRange(5, 1, 10) → true', got: String(r4) },
    { pass: r5 === false, description: 'isInRange(0, 1, 10) → false', got: String(r5) },
    { pass: r6 === true, description: 'isInRange(10, 1, 10) → true (inclusive)', got: String(r6) },
    { pass: r7 === true, description: 'isValidLength("hello", 3, 10) → true (length 5)', got: String(r7) },
    { pass: r8 === false, description: 'isValidLength("hi", 3, 10) → false (length 2)', got: String(r8) },
    { pass: r9 === true, description: 'isValidLength("  hi  ", 1, 2) → true (trimmed length 2)', got: String(r9) }
  ];
}`,
    hints: [
      'Create a private helper function like `trimStr` that trims whitespace. The public methods can call this shared helper internally. Return only the public methods in the object.',
      'Define `function trimStr(str) { return str.trim(); }` as a private helper. `isNonEmpty` uses `trimStr(str).length > 0`. `isValidLength` uses both `trimStr` and `isInRange` internally.',
    ],
    resources: iifeRes,
  },

  // 20. Module Pattern: Combined
  {
    id: 1238,
    title: 'Module Pattern: Combined',
    type: 'js',
    tier: 3,
    category: ['functions', 'advanced-functions'],
    tags: ['module-pattern', 'closures', 'encapsulation', 'state-management'],
    description:
      'Create a task manager using the module pattern with addTask, completeTask, getTasks, and getPending methods.',
    starterCode:
      '/**\n * @returns {{ addTask: Function, completeTask: Function, getTasks: Function, getPending: Function }}\n *   addTask(name) - adds {name, done: false} to the task list\n *   completeTask(name) - marks the first task with that name as done (no-op if not found)\n *   getTasks() - returns a copy of all tasks\n *   getPending() - returns an array of names of tasks that are not done\n */\nfunction createTaskManager() {\n\n}\n',
    solution:
      'function createTaskManager() {\n  var tasks = [];\n\n  function addTask(name) {\n    tasks.push({ name: name, done: false });\n  }\n\n  function completeTask(name) {\n    for (var i = 0; i < tasks.length; i++) {\n      if (tasks[i].name === name && !tasks[i].done) {\n        tasks[i].done = true;\n        return;\n      }\n    }\n  }\n\n  function getTasks() {\n    return tasks.map(function(t) {\n      return { name: t.name, done: t.done };\n    });\n  }\n\n  function getPending() {\n    return tasks\n      .filter(function(t) { return !t.done; })\n      .map(function(t) { return t.name; });\n  }\n\n  return {\n    addTask: addTask,\n    completeTask: completeTask,\n    getTasks: getTasks,\n    getPending: getPending\n  };\n}',
    testRunner: `(code) => {
  const fn = new Function(code + '; return createTaskManager;')();
  var tm = fn();
  var r1 = tm.getTasks();
  tm.addTask('Write code');
  tm.addTask('Run tests');
  var r2 = tm.getTasks();
  var r3 = tm.getPending();
  tm.completeTask('Write code');
  var r4 = tm.getPending();
  var r5 = tm.getTasks();
  tm.completeTask('not found');
  var r6 = tm.getPending();
  tm.addTask('Deploy');
  var r7 = tm.getPending();
  tm.completeTask('Run tests');
  tm.completeTask('Deploy');
  var r8 = tm.getPending();
  var tm2 = fn();
  tm2.addTask('Solo');
  var r9 = tm2.getPending();
  return [
    { pass: JSON.stringify(r1) === JSON.stringify([]), description: 'Starts with empty task list', got: JSON.stringify(r1) },
    { pass: r2.length === 2 && r2[0].name === 'Write code' && r2[1].name === 'Run tests', description: 'Two tasks added correctly', got: JSON.stringify(r2) },
    { pass: JSON.stringify(r3) === JSON.stringify(['Write code', 'Run tests']), description: 'Both tasks pending', got: JSON.stringify(r3) },
    { pass: JSON.stringify(r4) === JSON.stringify(['Run tests']), description: 'After completing "Write code": ["Run tests"]', got: JSON.stringify(r4) },
    { pass: r5[0].done === true && r5[1].done === false, description: 'getTasks shows done status', got: JSON.stringify(r5) },
    { pass: JSON.stringify(r6) === JSON.stringify(['Run tests']), description: 'Completing non-existent task is a no-op', got: JSON.stringify(r6) },
    { pass: JSON.stringify(r7) === JSON.stringify(['Run tests', 'Deploy']), description: 'New task added to pending', got: JSON.stringify(r7) },
    { pass: JSON.stringify(r8) === JSON.stringify([]), description: 'All tasks completed: empty pending', got: JSON.stringify(r8) },
    { pass: JSON.stringify(r9) === JSON.stringify(['Solo']), description: 'Second manager is independent', got: JSON.stringify(r9) }
  ];
}`,
    hints: [
      'Use a private `tasks` array. `addTask` pushes objects, `completeTask` finds the first matching undone task and sets `done` to `true`. Use `.filter()` and `.map()` for `getPending`.',
      'For `getTasks`, return a deep-enough copy with `.map(function(t) { return { name: t.name, done: t.done }; })`. For `getPending`, chain `.filter(function(t) { return !t.done; }).map(function(t) { return t.name; })`.',
    ],
    resources: iifeRes,
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
    `T3 Advanced Functions — Section 2: ${exercises.length} exercises (IDs ${exercises[0].id}-${exercises[exercises.length - 1].id})`
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
