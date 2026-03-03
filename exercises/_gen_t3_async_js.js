#!/usr/bin/env node
/**
 * Generator: T3 Async JavaScript — Section 7 (10 exercises, IDs 1301-1310)
 *
 * Covers: Promise Fundamentals, async/await, Practical Patterns
 * Light introduction — T4 builds the full async foundation.
 *
 * Usage:
 *   node exercises/_gen_t3_async_js.js            # Append to curriculum
 *   node exercises/_gen_t3_async_js.js --validate  # Validate testRunners only
 */

const fs = require('fs');
const path = require('path');

const CURRICULUM_PATH = path.join(
  __dirname,
  'collections',
  'default-curriculum.json'
);

// ─── Resources (MDN only for T3) ────────────────────────────────────────────

const promiseRes = [
  { label: 'MDN: Promise', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise', description: 'Promise object reference' },
  { label: 'MDN: Using Promises', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises', description: 'Guide to using Promises' },
];
const thenCatchRes = [
  { label: 'MDN: Promise.then()', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/then', description: 'Promise then method' },
  { label: 'MDN: Promise.catch()', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/catch', description: 'Promise catch method' },
];
const asyncAwaitRes = [
  { label: 'MDN: async function', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function', description: 'async function reference' },
  { label: 'MDN: await', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await', description: 'await operator reference' },
];

// ─── Exercise Definitions ───────────────────────────────────────────────────

const exercises = [

  // ══════════════════════════════════════════════════════════════════════════
  // SUB-SECTION A: Promise Fundamentals (4 exercises, IDs 1301-1304)
  // ══════════════════════════════════════════════════════════════════════════

  // 1. Create a Promise (ENTRY POINT — scaffolded)
  {
    id: 1301,
    title: 'Create a Promise',
    type: 'js',
    tier: 3,
    category: ['async', 'promises'],
    tags: ['promise', 'resolve', 'reject', 'async', 'constructor'],
    description:
      'Write a function that returns a Promise which resolves or rejects based on a condition.',
    instructions:
      'A **Promise** represents a value that may not be available yet. You create one with `new Promise((resolve, reject) => { ... })`.\n\n- Call `resolve(value)` when the operation succeeds — the Promise becomes "fulfilled" with that value.\n- Call `reject(error)` when it fails — the Promise becomes "rejected" with that error.\n\nA Promise is always in one of three states: **pending** (not yet settled), **fulfilled** (resolved), or **rejected**.\n\nWrite `makePromise(value)` — return a new Promise that resolves with `value` if it is truthy, or rejects with a new Error "Empty value" if it is falsy (see `@param`/`@returns` in the starter code).',
    starterCode:
      '/**\n * @param {*} value - The value to resolve with\n * @returns {Promise} Resolves with value if truthy, rejects with Error("Empty value") if falsy\n */\nfunction makePromise(value) {\n\n}\n',
    solution:
      'function makePromise(value) {\n  return new Promise(function(resolve, reject) {\n    if (value) {\n      resolve(value);\n    } else {\n      reject(new Error("Empty value"));\n    }\n  });\n}',
    testRunner: `async (code) => {
  const fn = new Function(code + '; return makePromise;')();
  const results = [];

  const r1 = await fn('hello');
  results.push({ pass: r1 === 'hello', description: 'makePromise("hello") resolves with "hello"', got: String(r1) });

  const r2 = await fn(42);
  results.push({ pass: r2 === 42, description: 'makePromise(42) resolves with 42', got: String(r2) });

  const r3 = await fn(true);
  results.push({ pass: r3 === true, description: 'makePromise(true) resolves with true', got: String(r3) });

  try {
    await fn('');
    results.push({ pass: false, description: 'makePromise("") rejects with Error', got: 'did not reject' });
  } catch (e) {
    results.push({ pass: e instanceof Error && e.message === 'Empty value', description: 'makePromise("") rejects with Error("Empty value")', got: e.message });
  }

  try {
    await fn(0);
    results.push({ pass: false, description: 'makePromise(0) rejects with Error', got: 'did not reject' });
  } catch (e) {
    results.push({ pass: e instanceof Error && e.message === 'Empty value', description: 'makePromise(0) rejects with Error("Empty value")', got: e.message });
  }

  try {
    await fn(null);
    results.push({ pass: false, description: 'makePromise(null) rejects with Error', got: 'did not reject' });
  } catch (e) {
    results.push({ pass: e instanceof Error && e.message === 'Empty value', description: 'makePromise(null) rejects with Error("Empty value")', got: e.message });
  }

  const r7 = await fn([1, 2]);
  results.push({ pass: JSON.stringify(r7) === '[1,2]', description: 'makePromise([1,2]) resolves with the array', got: JSON.stringify(r7) });

  const r8 = await fn({ a: 1 });
  results.push({ pass: JSON.stringify(r8) === '{"a":1}', description: 'makePromise({a:1}) resolves with the object', got: JSON.stringify(r8) });

  return results;
}`,
    hint1:
      'Think about what makes a value "truthy" in JavaScript — everything except `false`, `0`, `""`, `null`, `undefined`, and `NaN`. Inside the Promise constructor callback, check the value and call either `resolve` or `reject`.',
    hint2:
      'The Promise constructor takes a function with two parameters: `resolve` and `reject`. Use an `if` statement to check if `value` is truthy — if so, call `resolve(value)`, otherwise call `reject(new Error("Empty value"))`.',
    resources: promiseRes,
  },

  // 2. Promise Chaining
  {
    id: 1302,
    title: 'Promise Chaining',
    type: 'js',
    tier: 3,
    category: ['async', 'promises'],
    tags: ['promise', 'then', 'chaining', 'async'],
    description:
      'Write a function that chains .then() calls to transform a resolved value through multiple steps.',
    starterCode:
      '/**\n * @param {number} num - The starting number\n * @returns {Promise<string>} Resolves with the number doubled, then converted to a string with "Result: " prefix\n */\nfunction doubleAndLabel(num) {\n\n}\n',
    solution:
      'function doubleAndLabel(num) {\n  return Promise.resolve(num)\n    .then(function(n) { return n * 2; })\n    .then(function(doubled) { return "Result: " + doubled; });\n}',
    testRunner: `async (code) => {
  const fn = new Function(code + '; return doubleAndLabel;')();
  const r1 = await fn(5);
  const r2 = await fn(0);
  const r3 = await fn(-3);
  const r4 = await fn(10);
  const r5 = await fn(0.5);
  const r6 = await fn(100);
  const r7 = await fn(1);
  const r8 = await fn(-10);
  return [
    { pass: r1 === 'Result: 10', description: 'doubleAndLabel(5) resolves with "Result: 10"', got: String(r1) },
    { pass: r2 === 'Result: 0', description: 'doubleAndLabel(0) resolves with "Result: 0"', got: String(r2) },
    { pass: r3 === 'Result: -6', description: 'doubleAndLabel(-3) resolves with "Result: -6"', got: String(r3) },
    { pass: r4 === 'Result: 20', description: 'doubleAndLabel(10) resolves with "Result: 20"', got: String(r4) },
    { pass: r5 === 'Result: 1', description: 'doubleAndLabel(0.5) resolves with "Result: 1"', got: String(r5) },
    { pass: r6 === 'Result: 200', description: 'doubleAndLabel(100) resolves with "Result: 200"', got: String(r6) },
    { pass: r7 === 'Result: 2', description: 'doubleAndLabel(1) resolves with "Result: 2"', got: String(r7) },
    { pass: r8 === 'Result: -20', description: 'doubleAndLabel(-10) resolves with "Result: -20"', got: String(r8) },
  ];
}`,
    hint1:
      '`.then()` takes a callback that receives the resolved value and returns a new value (or Promise). Each `.then()` returns a new Promise, so you can chain them. `Promise.resolve(value)` creates a Promise that is already resolved.',
    hint2:
      'Start with `Promise.resolve(num)` to wrap the number in a Promise. Chain `.then(function(n) { return n * 2; })` to double it, then another `.then()` to prepend "Result: " to the doubled value.',
    resources: thenCatchRes,
  },

  // 3. Promise Rejection
  {
    id: 1303,
    title: 'Promise Rejection',
    type: 'js',
    tier: 3,
    category: ['async', 'promises'],
    tags: ['promise', 'catch', 'reject', 'error-handling', 'async'],
    description:
      'Write a function that uses .catch() to handle a rejected Promise and return a fallback value.',
    starterCode:
      '/**\n * @param {Promise} promise - A promise that may reject\n * @param {*} fallback - The fallback value to use on rejection\n * @returns {Promise} Resolves with the original value on success, or the fallback on rejection\n */\nfunction withFallback(promise, fallback) {\n\n}\n',
    solution:
      'function withFallback(promise, fallback) {\n  return promise.catch(function() {\n    return fallback;\n  });\n}',
    testRunner: `async (code) => {
  const fn = new Function(code + '; return withFallback;')();
  const r1 = await fn(Promise.resolve('data'), 'default');
  const r2 = await fn(Promise.reject(new Error('fail')), 'default');
  const r3 = await fn(Promise.resolve(42), 0);
  const r4 = await fn(Promise.reject(new Error('oops')), 0);
  const r5 = await fn(Promise.reject(new Error('err')), null);
  const r6 = await fn(Promise.resolve([1, 2]), []);
  const r7 = await fn(Promise.reject(new Error('bad')), []);
  const r8 = await fn(Promise.resolve('ok'), 'unused');
  return [
    { pass: r1 === 'data', description: 'Resolved promise returns original value "data"', got: String(r1) },
    { pass: r2 === 'default', description: 'Rejected promise returns fallback "default"', got: String(r2) },
    { pass: r3 === 42, description: 'Resolved promise returns original value 42', got: String(r3) },
    { pass: r4 === 0, description: 'Rejected promise returns fallback 0', got: String(r4) },
    { pass: r5 === null, description: 'Rejected promise returns fallback null', got: String(r5) },
    { pass: JSON.stringify(r6) === '[1,2]', description: 'Resolved promise returns original array', got: JSON.stringify(r6) },
    { pass: JSON.stringify(r7) === '[]', description: 'Rejected promise returns fallback empty array', got: JSON.stringify(r7) },
    { pass: r8 === 'ok', description: 'Resolved promise ignores fallback, returns "ok"', got: String(r8) },
  ];
}`,
    hint1:
      '`.catch()` is called only when the Promise rejects — it receives the rejection reason and can return a new value, which becomes the resolved value of the resulting Promise. If the Promise resolves normally, `.catch()` is skipped entirely.',
    hint2:
      'Chain `.catch()` onto the promise parameter. Inside the `.catch()` callback, ignore the error argument and simply return the `fallback` value. The resolved case passes through automatically.',
    resources: thenCatchRes,
  },

  // 4. Promise: Combined
  {
    id: 1304,
    title: 'Promise: Combined',
    type: 'js',
    tier: 3,
    category: ['async', 'promises'],
    tags: ['promise', 'then', 'catch', 'chaining', 'async'],
    description:
      'Write a function that chains .then() transformations with a .catch() fallback to safely process a Promise.',
    starterCode:
      '/**\n * @param {Promise<number>} promise - A promise that resolves with a number (or rejects)\n * @returns {Promise<string>} Resolves with "Value: <tripled>" on success, or "Error: <message>" on rejection\n */\nfunction processPromise(promise) {\n\n}\n',
    solution:
      'function processPromise(promise) {\n  return promise\n    .then(function(n) { return n * 3; })\n    .then(function(tripled) { return "Value: " + tripled; })\n    .catch(function(err) { return "Error: " + err.message; });\n}',
    testRunner: `async (code) => {
  const fn = new Function(code + '; return processPromise;')();
  const r1 = await fn(Promise.resolve(5));
  const r2 = await fn(Promise.resolve(0));
  const r3 = await fn(Promise.reject(new Error('bad input')));
  const r4 = await fn(Promise.resolve(-2));
  const r5 = await fn(Promise.resolve(10));
  const r6 = await fn(Promise.reject(new Error('timeout')));
  const r7 = await fn(Promise.resolve(1));
  const r8 = await fn(Promise.reject(new Error('not found')));
  const r9 = await fn(Promise.resolve(0.5));
  return [
    { pass: r1 === 'Value: 15', description: 'Resolves 5 → triples → "Value: 15"', got: String(r1) },
    { pass: r2 === 'Value: 0', description: 'Resolves 0 → triples → "Value: 0"', got: String(r2) },
    { pass: r3 === 'Error: bad input', description: 'Rejects → catches → "Error: bad input"', got: String(r3) },
    { pass: r4 === 'Value: -6', description: 'Resolves -2 → triples → "Value: -6"', got: String(r4) },
    { pass: r5 === 'Value: 30', description: 'Resolves 10 → triples → "Value: 30"', got: String(r5) },
    { pass: r6 === 'Error: timeout', description: 'Rejects → catches → "Error: timeout"', got: String(r6) },
    { pass: r7 === 'Value: 3', description: 'Resolves 1 → triples → "Value: 3"', got: String(r7) },
    { pass: r8 === 'Error: not found', description: 'Rejects → catches → "Error: not found"', got: String(r8) },
    { pass: r9 === 'Value: 1.5', description: 'Resolves 0.5 → triples → "Value: 1.5"', got: String(r9) },
  ];
}`,
    hint1:
      'Chain `.then()` calls for the success path (triple the number, then add the prefix). Add `.catch()` at the end to handle the rejection path. If any `.then()` in the chain throws or the original Promise rejects, control jumps to `.catch()`.',
    hint2:
      'Start with `promise.then(function(n) { return n * 3; })` to triple the value. Chain another `.then()` to prepend "Value: ". Then add `.catch(function(err) { return "Error: " + err.message; })` at the end.',
    resources: thenCatchRes,
  },

  // ══════════════════════════════════════════════════════════════════════════
  // SUB-SECTION B: async/await (4 exercises, IDs 1305-1308)
  // ══════════════════════════════════════════════════════════════════════════

  // 5. async Function Basics (ENTRY POINT — scaffolded)
  {
    id: 1305,
    title: 'async Function Basics',
    type: 'js',
    tier: 3,
    category: ['async', 'async-await'],
    tags: ['async', 'await', 'promise', 'function'],
    description:
      'Write an async function that awaits a Promise and returns the transformed result.',
    instructions:
      'The `async` keyword before a function makes it always return a Promise. Inside an `async` function, you can use `await` to pause execution until a Promise settles.\n\n```\nasync function getData() {\n  const result = await somePromise;\n  return result; // automatically wrapped in a Promise\n}\n```\n\n`await` unwraps the resolved value from a Promise so you can work with it directly — no `.then()` callbacks needed. If the awaited Promise rejects, `await` throws the rejection reason as an error.\n\nWrite `async function getUpperCase(promise)` — await the promise (which resolves to a string), convert it to upper case, and return it.',
    starterCode:
      '/**\n * @param {Promise<string>} promise - A promise that resolves with a string\n * @returns {Promise<string>} The string converted to upper case\n */\nasync function getUpperCase(promise) {\n\n}\n',
    solution:
      'async function getUpperCase(promise) {\n  const str = await promise;\n  return str.toUpperCase();\n}',
    testRunner: `async (code) => {
  const fn = new Function(code + '; return getUpperCase;')();
  const r1 = await fn(Promise.resolve('hello'));
  const r2 = await fn(Promise.resolve('world'));
  const r3 = await fn(Promise.resolve('async'));
  const r4 = await fn(Promise.resolve('JavaScript'));
  const r5 = await fn(Promise.resolve(''));
  const r6 = await fn(Promise.resolve('ALREADY'));
  const r7 = await fn(Promise.resolve('mixedCase'));
  const r8 = await fn(Promise.resolve('hello world'));
  return [
    { pass: r1 === 'HELLO', description: 'await "hello" → "HELLO"', got: String(r1) },
    { pass: r2 === 'WORLD', description: 'await "world" → "WORLD"', got: String(r2) },
    { pass: r3 === 'ASYNC', description: 'await "async" → "ASYNC"', got: String(r3) },
    { pass: r4 === 'JAVASCRIPT', description: 'await "JavaScript" → "JAVASCRIPT"', got: String(r4) },
    { pass: r5 === '', description: 'await "" → ""', got: JSON.stringify(r5) },
    { pass: r6 === 'ALREADY', description: 'await "ALREADY" → "ALREADY"', got: String(r6) },
    { pass: r7 === 'MIXEDCASE', description: 'await "mixedCase" → "MIXEDCASE"', got: String(r7) },
    { pass: r8 === 'HELLO WORLD', description: 'await "hello world" → "HELLO WORLD"', got: String(r8) },
  ];
}`,
    hint1:
      'Use `await` to get the string value out of the Promise, then apply `.toUpperCase()` to the result. Because the function is `async`, the return value is automatically wrapped in a Promise.',
    hint2:
      'Inside the function body: `const str = await promise;` unwraps the string from the Promise. Then `return str.toUpperCase();` converts and returns it.',
    resources: asyncAwaitRes,
  },

  // 6. Await Sequential
  {
    id: 1306,
    title: 'Await Sequential',
    type: 'js',
    tier: 3,
    category: ['async', 'async-await'],
    tags: ['async', 'await', 'sequential', 'promise'],
    description:
      'Write an async function that awaits two Promises in sequence and combines their results.',
    starterCode:
      '/**\n * @param {Promise<number>} promiseA - First promise resolving to a number\n * @param {Promise<number>} promiseB - Second promise resolving to a number\n * @returns {Promise<object>} Object with sum, product, and larger of the two values\n */\nasync function combineResults(promiseA, promiseB) {\n\n}\n',
    solution:
      'async function combineResults(promiseA, promiseB) {\n  const a = await promiseA;\n  const b = await promiseB;\n  return {\n    sum: a + b,\n    product: a * b,\n    larger: a >= b ? a : b\n  };\n}',
    testRunner: `async (code) => {
  const fn = new Function(code + '; return combineResults;')();
  const r1 = await fn(Promise.resolve(3), Promise.resolve(4));
  const r2 = await fn(Promise.resolve(0), Promise.resolve(5));
  const r3 = await fn(Promise.resolve(-2), Promise.resolve(3));
  const r4 = await fn(Promise.resolve(10), Promise.resolve(10));
  const r5 = await fn(Promise.resolve(1), Promise.resolve(-1));
  const r6 = await fn(Promise.resolve(7), Promise.resolve(2));
  const r7 = await fn(Promise.resolve(0), Promise.resolve(0));
  const r8 = await fn(Promise.resolve(100), Promise.resolve(1));
  return [
    { pass: r1.sum === 7 && r1.product === 12 && r1.larger === 4, description: '(3, 4) → { sum: 7, product: 12, larger: 4 }', got: JSON.stringify(r1) },
    { pass: r2.sum === 5 && r2.product === 0 && r2.larger === 5, description: '(0, 5) → { sum: 5, product: 0, larger: 5 }', got: JSON.stringify(r2) },
    { pass: r3.sum === 1 && r3.product === -6 && r3.larger === 3, description: '(-2, 3) → { sum: 1, product: -6, larger: 3 }', got: JSON.stringify(r3) },
    { pass: r4.sum === 20 && r4.product === 100 && r4.larger === 10, description: '(10, 10) → { sum: 20, product: 100, larger: 10 }', got: JSON.stringify(r4) },
    { pass: r5.sum === 0 && r5.product === -1 && r5.larger === 1, description: '(1, -1) → { sum: 0, product: -1, larger: 1 }', got: JSON.stringify(r5) },
    { pass: r6.sum === 9 && r6.product === 14 && r6.larger === 7, description: '(7, 2) → { sum: 9, product: 14, larger: 7 }', got: JSON.stringify(r6) },
    { pass: r7.sum === 0 && r7.product === 0 && r7.larger === 0, description: '(0, 0) → { sum: 0, product: 0, larger: 0 }', got: JSON.stringify(r7) },
    { pass: r8.sum === 101 && r8.product === 100 && r8.larger === 100, description: '(100, 1) → { sum: 101, product: 100, larger: 100 }', got: JSON.stringify(r8) },
  ];
}`,
    hint1:
      'Use `await` twice — once for each Promise — to get both values before combining them. The `await` keyword pauses the function until each Promise resolves, so you can work with the values like normal variables.',
    hint2:
      '`const a = await promiseA;` and `const b = await promiseB;` give you both numbers. Then return an object with `sum: a + b`, `product: a * b`, and `larger` using a ternary or `Math.max`.',
    resources: asyncAwaitRes,
  },

  // 7. Async Error Handling
  {
    id: 1307,
    title: 'Async Error Handling',
    type: 'js',
    tier: 3,
    category: ['async', 'async-await'],
    tags: ['async', 'await', 'try', 'catch', 'error-handling'],
    description:
      'Write an async function that uses try/catch to handle a rejected Promise gracefully.',
    starterCode:
      '/**\n * @param {Promise<string>} promise - A promise that may resolve or reject\n * @returns {Promise<object>} { success: true, data: value } on resolve, { success: false, error: message } on reject\n */\nasync function safeAwait(promise) {\n\n}\n',
    solution:
      'async function safeAwait(promise) {\n  try {\n    const data = await promise;\n    return { success: true, data: data };\n  } catch (err) {\n    return { success: false, error: err.message };\n  }\n}',
    testRunner: `async (code) => {
  const fn = new Function(code + '; return safeAwait;')();
  const r1 = await fn(Promise.resolve('hello'));
  const r2 = await fn(Promise.reject(new Error('fail')));
  const r3 = await fn(Promise.resolve(42));
  const r4 = await fn(Promise.reject(new Error('timeout')));
  const r5 = await fn(Promise.resolve(null));
  const r6 = await fn(Promise.reject(new Error('not found')));
  const r7 = await fn(Promise.resolve(''));
  const r8 = await fn(Promise.reject(new Error('')));
  const r9 = await fn(Promise.resolve([1, 2, 3]));
  return [
    { pass: r1.success === true && r1.data === 'hello', description: 'Resolved "hello" → { success: true, data: "hello" }', got: JSON.stringify(r1) },
    { pass: r2.success === false && r2.error === 'fail', description: 'Rejected "fail" → { success: false, error: "fail" }', got: JSON.stringify(r2) },
    { pass: r3.success === true && r3.data === 42, description: 'Resolved 42 → { success: true, data: 42 }', got: JSON.stringify(r3) },
    { pass: r4.success === false && r4.error === 'timeout', description: 'Rejected "timeout" → { success: false, error: "timeout" }', got: JSON.stringify(r4) },
    { pass: r5.success === true && r5.data === null, description: 'Resolved null → { success: true, data: null }', got: JSON.stringify(r5) },
    { pass: r6.success === false && r6.error === 'not found', description: 'Rejected "not found" → { success: false, error: "not found" }', got: JSON.stringify(r6) },
    { pass: r7.success === true && r7.data === '', description: 'Resolved "" → { success: true, data: "" }', got: JSON.stringify(r7) },
    { pass: r8.success === false && r8.error === '', description: 'Rejected empty message → { success: false, error: "" }', got: JSON.stringify(r8) },
    { pass: r9.success === true && JSON.stringify(r9.data) === '[1,2,3]', description: 'Resolved [1,2,3] → { success: true, data: [1,2,3] }', got: JSON.stringify(r9) },
  ];
}`,
    hint1:
      'When you `await` a rejected Promise inside a `try` block, it throws an error that gets caught by the `catch` block — the same try/catch you learned in error handling, but now with async code.',
    hint2:
      'Wrap `const data = await promise;` in a `try` block and return the success object. In the `catch(err)` block, return the error object using `err.message`.',
    resources: [...asyncAwaitRes, { label: 'MDN: try...catch', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch', description: 'Try/catch statement reference' }],
  },

  // 8. async/await: Combined
  {
    id: 1308,
    title: 'async/await: Combined',
    type: 'js',
    tier: 3,
    category: ['async', 'async-await'],
    tags: ['async', 'await', 'try', 'catch', 'sequential', 'combined'],
    description:
      'Write an async function that awaits multiple Promises sequentially with error handling, collecting successes and failures.',
    starterCode:
      '/**\n * @param {Promise[]} promises - Array of promises that may resolve or reject\n * @returns {Promise<object>} { values: [...resolved values], errors: [...error messages] }\n */\nasync function collectResults(promises) {\n\n}\n',
    solution:
      'async function collectResults(promises) {\n  const values = [];\n  const errors = [];\n  for (let i = 0; i < promises.length; i++) {\n    try {\n      const val = await promises[i];\n      values.push(val);\n    } catch (err) {\n      errors.push(err.message);\n    }\n  }\n  return { values: values, errors: errors };\n}',
    testRunner: `async (code) => {
  const fn = new Function(code + '; return collectResults;')();
  const r1 = await fn([Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)]);
  const r2 = await fn([Promise.reject(new Error('a')), Promise.reject(new Error('b'))]);
  const r3 = await fn([Promise.resolve('ok'), Promise.reject(new Error('fail')), Promise.resolve('yes')]);
  const r4 = await fn([]);
  const r5 = await fn([Promise.reject(new Error('x'))]);
  const r6 = await fn([Promise.resolve(null), Promise.resolve(0), Promise.reject(new Error('err'))]);
  const r7 = await fn([Promise.resolve('a'), Promise.resolve('b'), Promise.reject(new Error('c')), Promise.resolve('d')]);
  const r8 = await fn([Promise.reject(new Error('1')), Promise.resolve('2'), Promise.reject(new Error('3'))]);
  return [
    { pass: JSON.stringify(r1.values) === '[1,2,3]' && r1.errors.length === 0, description: 'All resolve → values [1,2,3], no errors', got: JSON.stringify(r1) },
    { pass: r2.values.length === 0 && JSON.stringify(r2.errors) === '["a","b"]', description: 'All reject → no values, errors ["a","b"]', got: JSON.stringify(r2) },
    { pass: JSON.stringify(r3.values) === '["ok","yes"]' && JSON.stringify(r3.errors) === '["fail"]', description: 'Mixed → values ["ok","yes"], errors ["fail"]', got: JSON.stringify(r3) },
    { pass: r4.values.length === 0 && r4.errors.length === 0, description: 'Empty array → no values, no errors', got: JSON.stringify(r4) },
    { pass: r5.values.length === 0 && JSON.stringify(r5.errors) === '["x"]', description: 'Single reject → no values, errors ["x"]', got: JSON.stringify(r5) },
    { pass: JSON.stringify(r6.values) === '[null,0]' && JSON.stringify(r6.errors) === '["err"]', description: 'null and 0 resolve correctly, error caught', got: JSON.stringify(r6) },
    { pass: JSON.stringify(r7.values) === '["a","b","d"]' && JSON.stringify(r7.errors) === '["c"]', description: 'Reject in middle → other values collected', got: JSON.stringify(r7) },
    { pass: JSON.stringify(r8.values) === '["2"]' && JSON.stringify(r8.errors) === '["1","3"]', description: 'Multiple rejects scattered → sorted correctly', got: JSON.stringify(r8) },
  ];
}`,
    hint1:
      'Loop through the promises array and `await` each one inside a `try/catch`. Push resolved values into one array and error messages into another. A `for` loop works well here since you need `await` inside it.',
    hint2:
      'Create `values` and `errors` arrays. Use `for (let i = 0; i < promises.length; i++)` and inside: `try { const val = await promises[i]; values.push(val); } catch (err) { errors.push(err.message); }`. Return both arrays in an object.',
    resources: asyncAwaitRes,
  },

  // ══════════════════════════════════════════════════════════════════════════
  // SUB-SECTION C: Practical Patterns (2 exercises, IDs 1309-1310)
  // ══════════════════════════════════════════════════════════════════════════

  // 9. Promisify a Callback
  {
    id: 1309,
    title: 'Promisify a Callback',
    type: 'js',
    tier: 3,
    category: ['async', 'promises'],
    tags: ['promise', 'callback', 'promisify', 'pattern'],
    description:
      'Write a function that converts a callback-style function into one that returns a Promise.',
    starterCode:
      '/**\n * @param {Function} callbackFn - A function that takes (value, callback) where callback is (error, result)\n * @returns {Function} A new function that takes (value) and returns a Promise\n */\nfunction promisify(callbackFn) {\n\n}\n',
    solution:
      'function promisify(callbackFn) {\n  return function(value) {\n    return new Promise(function(resolve, reject) {\n      callbackFn(value, function(error, result) {\n        if (error) {\n          reject(error);\n        } else {\n          resolve(result);\n        }\n      });\n    });\n  };\n}',
    testRunner: `async (code) => {
  const fn = new Function(code + '; return promisify;')();

  function doubleAsync(val, cb) { cb(null, val * 2); }
  function failAsync(val, cb) { cb(new Error('fail: ' + val)); }
  function upperAsync(val, cb) { cb(null, val.toUpperCase()); }
  function validateAsync(val, cb) { if (val > 0) cb(null, val); else cb(new Error('must be positive')); }

  const pDouble = fn(doubleAsync);
  const pFail = fn(failAsync);
  const pUpper = fn(upperAsync);
  const pValidate = fn(validateAsync);

  const r1 = await pDouble(5);
  const r2 = await pDouble(0);
  const r3 = await pUpper('hello');

  let r4err = '';
  try { await pFail('test'); } catch (e) { r4err = e.message; }

  const r5 = await pValidate(10);
  let r6err = '';
  try { await pValidate(-1); } catch (e) { r6err = e.message; }

  const r7 = await pDouble(-3);
  const r8 = await pUpper('ABC');

  return [
    { pass: r1 === 10, description: 'promisified doubleAsync(5) resolves with 10', got: String(r1) },
    { pass: r2 === 0, description: 'promisified doubleAsync(0) resolves with 0', got: String(r2) },
    { pass: r3 === 'HELLO', description: 'promisified upperAsync("hello") resolves with "HELLO"', got: String(r3) },
    { pass: r4err === 'fail: test', description: 'promisified failAsync("test") rejects with "fail: test"', got: r4err },
    { pass: r5 === 10, description: 'promisified validateAsync(10) resolves with 10', got: String(r5) },
    { pass: r6err === 'must be positive', description: 'promisified validateAsync(-1) rejects with "must be positive"', got: r6err },
    { pass: r7 === -6, description: 'promisified doubleAsync(-3) resolves with -6', got: String(r7) },
    { pass: r8 === 'ABC', description: 'promisified upperAsync("ABC") resolves with "ABC"', got: String(r8) },
  ];
}`,
    hint1:
      'The callback convention is `(error, result)` — if `error` is truthy the operation failed, otherwise `result` holds the value. Your promisified version should map this pattern onto `reject`/`resolve`.',
    hint2:
      'Return a new function that takes `value` and returns `new Promise(function(resolve, reject) { callbackFn(value, function(error, result) { if (error) reject(error); else resolve(result); }); });`.',
    resources: promiseRes,
  },

  // 10. Async Pipeline
  {
    id: 1310,
    title: 'Async Pipeline',
    type: 'js',
    tier: 3,
    category: ['async', 'async-await'],
    tags: ['async', 'await', 'pipeline', 'sequential', 'combined'],
    description:
      'Write an async function that passes a value through an array of async transform functions in sequence.',
    starterCode:
      '/**\n * @param {*} initial - The starting value\n * @param {Function[]} transforms - Array of async functions, each takes a value and returns a Promise\n * @returns {Promise<*>} The final transformed value after all steps\n */\nasync function asyncPipeline(initial, transforms) {\n\n}\n',
    solution:
      'async function asyncPipeline(initial, transforms) {\n  let result = initial;\n  for (let i = 0; i < transforms.length; i++) {\n    result = await transforms[i](result);\n  }\n  return result;\n}',
    testRunner: `async (code) => {
  const fn = new Function(code + '; return asyncPipeline;')();

  const double = async function(n) { return n * 2; };
  const addTen = async function(n) { return n + 10; };
  const toString = async function(n) { return 'Value: ' + n; };
  const toUpper = async function(s) { return s.toUpperCase(); };
  const wrap = async function(s) { return '[' + s + ']'; };

  const r1 = await fn(5, [double, addTen]);
  const r2 = await fn(3, [double, addTen, toString]);
  const r3 = await fn('hello', [toUpper, wrap]);
  const r4 = await fn(0, [double, double, double]);
  const r5 = await fn(1, [addTen, double]);
  const r6 = await fn(7, []);
  const r7 = await fn(2, [double, double, addTen, toString]);
  const r8 = await fn('test', [toUpper]);

  return [
    { pass: r1 === 20, description: '5 → double → addTen = 20', got: String(r1) },
    { pass: r2 === 'Value: 16', description: '3 → double → addTen → toString = "Value: 16"', got: String(r2) },
    { pass: r3 === '[HELLO]', description: '"hello" → toUpper → wrap = "[HELLO]"', got: String(r3) },
    { pass: r4 === 0, description: '0 → double → double → double = 0', got: String(r4) },
    { pass: r5 === 22, description: '1 → addTen → double = 22', got: String(r5) },
    { pass: r6 === 7, description: '7 with no transforms = 7', got: String(r6) },
    { pass: r7 === 'Value: 18', description: '2 → double → double → addTen → toString = "Value: 18"', got: String(r7) },
    { pass: r8 === 'TEST', description: '"test" → toUpper = "TEST"', got: String(r8) },
  ];
}`,
    hint1:
      'This is the async version of the `pipe` pattern you learned in advanced functions. Loop through the transforms array, awaiting each one and passing the result to the next. If the array is empty, just return the initial value.',
    hint2:
      'Start with `let result = initial;`. Use a `for` loop over `transforms` and inside: `result = await transforms[i](result);`. After the loop, `return result;`.',
    resources: asyncAwaitRes,
  },
];

// ─── Validation ─────────────────────────────────────────────────────────────

function validate() {
  let pass = 0;
  let fail = 0;

  const promises = exercises.map(async (ex) => {
    try {
      const runner = new Function(`return (${ex.testRunner})`)();
      const results = await runner(ex.solution);
      let exercisePassed = true;
      results.forEach((r) => {
        if (r.pass) {
          pass++;
        } else {
          exercisePassed = false;
          fail++;
          console.error(`  FAIL [${ex.id}] ${ex.title}: ${r.description} — got ${r.got}`);
        }
      });
      if (exercisePassed) {
        console.log(`  ✓ [${ex.id}] ${ex.title} (${results.length} tests)`);
      }
    } catch (err) {
      fail++;
      console.error(`  ERROR [${ex.id}] ${ex.title}: ${err.message}`);
    }
  });

  return Promise.all(promises).then(() => {
    console.log(`\nValidation: ${pass} passed, ${fail} failed out of ${pass + fail} tests`);
    if (fail > 0) process.exit(1);
  });
}

// ─── Append to Curriculum ───────────────────────────────────────────────────

function appendToCurriculum() {
  const curriculum = JSON.parse(fs.readFileSync(CURRICULUM_PATH, 'utf-8'));
  const existingIds = new Set(curriculum.exercises.map((e) => e.id));

  let added = 0;
  exercises.forEach((ex) => {
    if (existingIds.has(ex.id)) {
      console.log(`  SKIP [${ex.id}] ${ex.title} (already exists)`);
    } else {
      curriculum.exercises.push(ex);
      added++;
      console.log(`  ADD  [${ex.id}] ${ex.title}`);
    }
  });

  fs.writeFileSync(CURRICULUM_PATH, JSON.stringify(curriculum, null, 2) + '\n');
  console.log(`\nAppended ${added} exercises (${curriculum.exercises.length} total)`);
}

// ─── Main ───────────────────────────────────────────────────────────────────

async function main() {
  const flag = process.argv[2];

  if (flag === '--validate') {
    console.log('Validating testRunners against solutions...\n');
    await validate();
  } else {
    console.log('Validating before appending...\n');
    await validate();
    console.log('\nAppending to curriculum...\n');
    appendToCurriculum();
  }
}

main();
