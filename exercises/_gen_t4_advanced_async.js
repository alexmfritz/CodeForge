#!/usr/bin/env node
/**
 * Generator: T4 Advanced Async — Section 1 (6 exercises, IDs 1325-1330)
 *
 * Covers: Promise.all, Promise.race, Promise.allSettled, async iteration,
 *         error aggregation, parallel with timeout
 *
 * T4 convention: description-only, NO starterCode. Student writes everything
 * from scratch including function declaration. Description tells them the
 * function name and expected behavior.
 *
 * Usage:
 *   node exercises/_gen_t4_advanced_async.js            # Append to curriculum
 *   node exercises/_gen_t4_advanced_async.js --validate  # Validate testRunners only
 */

const fs = require('fs');
const path = require('path');

const CURRICULUM_PATH = path.join(
  __dirname,
  'collections',
  'default-curriculum.json'
);

// ─── Resources (MDN only for T4) ────────────────────────────────────────────

const promiseAllRes = [
  { label: 'MDN: Promise.all()', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all', description: 'Promise.all reference' },
];
const promiseRaceRes = [
  { label: 'MDN: Promise.race()', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/race', description: 'Promise.race reference' },
];
const promiseAllSettledRes = [
  { label: 'MDN: Promise.allSettled()', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/allSettled', description: 'Promise.allSettled reference' },
];
const asyncRes = [
  { label: 'MDN: async function', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function', description: 'async function reference' },
  { label: 'MDN: Promise', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise', description: 'Promise reference' },
];

// ─── Exercise Definitions ───────────────────────────────────────────────────

const exercises = [

  // ══════════════════════════════════════════════════════════════════════════
  // T4 Section 1: Advanced Async (6 exercises, IDs 1325-1330)
  // ══════════════════════════════════════════════════════════════════════════

  // 1. Promise.all — Parallel Execution
  {
    id: 1325,
    title: 'Parallel Fetch All',
    type: 'js',
    tier: 4,
    category: ['async', 'promise-combinators'],
    tags: ['promise', 'promise-all', 'parallel', 'async', 'await'],
    description:
      'Create a function called `fetchAll` that takes an array of async functions (each returns a Promise) and runs them all in parallel using `Promise.all`. Return an array of all resolved values. If any single promise rejects, the entire operation should reject with that error.',
    starterCode: '',
    solution:
      'async function fetchAll(asyncFns) {\n  const promises = asyncFns.map(function(fn) { return fn(); });\n  return Promise.all(promises);\n}',
    testRunner: `async (code) => {
  const fn = new Function(code + '; return fetchAll;')();
  const results = [];

  const r1 = await fn([
    async function() { return 1; },
    async function() { return 2; },
    async function() { return 3; }
  ]);
  results.push({ pass: JSON.stringify(r1) === '[1,2,3]', description: 'Three resolving functions → [1, 2, 3]', got: JSON.stringify(r1) });

  const r2 = await fn([async function() { return 'only'; }]);
  results.push({ pass: JSON.stringify(r2) === '["only"]', description: 'Single function → ["only"]', got: JSON.stringify(r2) });

  const r3 = await fn([]);
  results.push({ pass: JSON.stringify(r3) === '[]', description: 'Empty array → []', got: JSON.stringify(r3) });

  let err4 = '';
  try {
    await fn([
      async function() { return 'ok'; },
      async function() { throw new Error('boom'); },
      async function() { return 'also ok'; }
    ]);
  } catch (e) { err4 = e.message; }
  results.push({ pass: err4 === 'boom', description: 'One rejection causes entire call to reject with "boom"', got: err4 });

  const r5 = await fn([
    async function() { return null; },
    async function() { return 0; },
    async function() { return false; }
  ]);
  results.push({ pass: JSON.stringify(r5) === '[null,0,false]', description: 'Falsy values resolve correctly → [null, 0, false]', got: JSON.stringify(r5) });

  const r6 = await fn([
    async function() { return { a: 1 }; },
    async function() { return [1, 2]; }
  ]);
  results.push({ pass: r6[0].a === 1 && JSON.stringify(r6[1]) === '[1,2]', description: 'Objects and arrays resolve correctly', got: JSON.stringify(r6) });

  let order = [];
  await fn([
    async function() { order.push('a'); return 'a'; },
    async function() { order.push('b'); return 'b'; },
    async function() { order.push('c'); return 'c'; }
  ]);
  results.push({ pass: order.length === 3, description: 'All functions are invoked (3 calls)', got: String(order.length) });

  let err8 = '';
  try {
    await fn([
      async function() { throw new Error('first'); },
      async function() { throw new Error('second'); }
    ]);
  } catch (e) { err8 = e.message; }
  results.push({ pass: err8 === 'first', description: 'Multiple rejections: first error propagates', got: err8 });

  return results;
}`,
    hint1:
      'You need to call each function to get its Promise, then pass all Promises to a method that waits for all of them to complete simultaneously.',
    hint2:
      'Map over the array to invoke each function, collecting the Promises. Then use a built-in Promise method that resolves when every Promise in the array resolves.',
    resources: promiseAllRes,
  },

  // 2. Promise.race — First to Settle
  {
    id: 1326,
    title: 'Race to Finish',
    type: 'js',
    tier: 4,
    category: ['async', 'promise-combinators'],
    tags: ['promise', 'promise-race', 'async', 'await', 'timeout'],
    description:
      'Create a function called `raceToFinish` that takes an array of Promises and returns the value of whichever Promise settles first (resolves or rejects). If the first to settle is a rejection, the returned Promise should reject with that error.',
    starterCode: '',
    solution:
      'async function raceToFinish(promises) {\n  return Promise.race(promises);\n}',
    testRunner: `async (code) => {
  const fn = new Function(code + '; return raceToFinish;')();
  const results = [];

  const r1 = await fn([Promise.resolve('fast'), new Promise(function(r) { setTimeout(function() { r('slow'); }, 100); })]);
  results.push({ pass: r1 === 'fast', description: 'Already-resolved beats delayed → "fast"', got: String(r1) });

  const r2 = await fn([
    new Promise(function(r) { setTimeout(function() { r('a'); }, 50); }),
    new Promise(function(r) { setTimeout(function() { r('b'); }, 10); })
  ]);
  results.push({ pass: r2 === 'b', description: '10ms beats 50ms → "b"', got: String(r2) });

  let err3 = '';
  try {
    await fn([
      Promise.reject(new Error('quick fail')),
      new Promise(function(r) { setTimeout(function() { r('slow success'); }, 100); })
    ]);
  } catch (e) { err3 = e.message; }
  results.push({ pass: err3 === 'quick fail', description: 'Rejection settles first → rejects with "quick fail"', got: err3 });

  const r4 = await fn([
    new Promise(function(_, rej) { setTimeout(function() { rej(new Error('late')); }, 100); }),
    new Promise(function(r) { setTimeout(function() { r('early'); }, 10); })
  ]);
  results.push({ pass: r4 === 'early', description: 'Resolve beats rejection → "early"', got: String(r4) });

  const r5 = await fn([Promise.resolve(42)]);
  results.push({ pass: r5 === 42, description: 'Single promise → 42', got: String(r5) });

  const r6 = await fn([Promise.resolve(null), Promise.resolve('second')]);
  results.push({ pass: r6 === null, description: 'First resolves with null → null wins', got: String(r6) });

  const r7 = await fn([
    new Promise(function(r) { setTimeout(function() { r(1); }, 20); }),
    new Promise(function(r) { setTimeout(function() { r(2); }, 20); }),
    new Promise(function(r) { setTimeout(function() { r(3); }, 5); })
  ]);
  results.push({ pass: r7 === 3, description: 'Fastest of three (5ms) → 3', got: String(r7) });

  let err8 = '';
  try {
    await fn([
      Promise.reject(new Error('a')),
      Promise.reject(new Error('b'))
    ]);
  } catch (e) { err8 = e.message; }
  results.push({ pass: err8 === 'a', description: 'Both reject: first rejection wins → "a"', got: err8 });

  return results;
}`,
    hint1:
      'There is a built-in Promise method that resolves or rejects as soon as the first Promise in the array settles. You just need to pass the array to it.',
    hint2:
      'The method you need returns a Promise that adopts the state of the first Promise to settle — whether it resolves or rejects.',
    resources: promiseRaceRes,
  },

  // 3. Promise.allSettled — Collect All Outcomes
  {
    id: 1327,
    title: 'Collect All Outcomes',
    type: 'js',
    tier: 4,
    category: ['async', 'promise-combinators'],
    tags: ['promise', 'promise-allsettled', 'async', 'await'],
    description:
      'Create a function called `collectOutcomes` that takes an array of Promises and returns an array of result objects. Each result should be `{ status: "fulfilled", value: ... }` for resolved Promises or `{ status: "rejected", reason: ... }` for rejected Promises. Never reject — always return all outcomes.',
    starterCode: '',
    solution:
      'async function collectOutcomes(promises) {\n  const settled = await Promise.allSettled(promises);\n  return settled.map(function(result) {\n    if (result.status === "fulfilled") {\n      return { status: "fulfilled", value: result.value };\n    }\n    return { status: "rejected", reason: result.reason.message || String(result.reason) };\n  });\n}',
    testRunner: `async (code) => {
  const fn = new Function(code + '; return collectOutcomes;')();
  const results = [];

  const r1 = await fn([Promise.resolve(1), Promise.resolve(2)]);
  results.push({ pass: r1.length === 2 && r1[0].status === 'fulfilled' && r1[0].value === 1 && r1[1].value === 2, description: 'Two resolves → both fulfilled with values', got: JSON.stringify(r1) });

  const r2 = await fn([Promise.reject(new Error('fail'))]);
  results.push({ pass: r2[0].status === 'rejected' && r2[0].reason === 'fail', description: 'Single reject → { status: "rejected", reason: "fail" }', got: JSON.stringify(r2) });

  const r3 = await fn([
    Promise.resolve('ok'),
    Promise.reject(new Error('bad')),
    Promise.resolve('fine')
  ]);
  results.push({ pass: r3[0].status === 'fulfilled' && r3[1].status === 'rejected' && r3[2].status === 'fulfilled', description: 'Mixed: fulfilled, rejected, fulfilled', got: JSON.stringify(r3.map(function(r) { return r.status; })) });
  results.push({ pass: r3[0].value === 'ok' && r3[1].reason === 'bad' && r3[2].value === 'fine', description: 'Mixed values: "ok", "bad", "fine"', got: JSON.stringify(r3) });

  const r5 = await fn([]);
  results.push({ pass: JSON.stringify(r5) === '[]', description: 'Empty array → []', got: JSON.stringify(r5) });

  const r6 = await fn([Promise.reject(new Error('a')), Promise.reject(new Error('b'))]);
  results.push({ pass: r6[0].reason === 'a' && r6[1].reason === 'b', description: 'All rejected: reasons preserved in order', got: JSON.stringify(r6) });

  const r7 = await fn([Promise.resolve(null), Promise.resolve(0), Promise.resolve(false)]);
  results.push({ pass: r7[0].value === null && r7[1].value === 0 && r7[2].value === false, description: 'Falsy resolved values preserved correctly', got: JSON.stringify(r7) });

  let didReject = false;
  try {
    await fn([Promise.reject(new Error('x')), Promise.reject(new Error('y'))]);
  } catch (e) { didReject = true; }
  results.push({ pass: didReject === false, description: 'Never rejects even when all inputs reject', got: didReject ? 'rejected' : 'resolved' });

  return results;
}`,
    hint1:
      'There is a Promise method that waits for ALL Promises to settle (both resolve and reject) and returns an array of outcome objects. It never rejects itself.',
    hint2:
      'The outcome objects from this method have `status`, `value` (for fulfilled), and `reason` (for rejected). You may need to extract `reason.message` if the reason is an Error object.',
    resources: promiseAllSettledRes,
  },

  // 4. Async Iteration with Early Exit
  {
    id: 1328,
    title: 'Async Find First',
    type: 'js',
    tier: 4,
    category: ['async', 'async-patterns'],
    tags: ['async', 'await', 'iteration', 'find', 'early-exit'],
    description:
      'Create a function called `asyncFind` that takes an array of values and an async predicate function. It should test each value sequentially (one at a time, in order) using the predicate, and return the first value for which the predicate resolves to `true`. If no value passes, return `undefined`. Do not test remaining values after finding a match.',
    starterCode: '',
    solution:
      'async function asyncFind(values, predicate) {\n  for (let i = 0; i < values.length; i++) {\n    const result = await predicate(values[i]);\n    if (result) return values[i];\n  }\n  return undefined;\n}',
    testRunner: `async (code) => {
  const fn = new Function(code + '; return asyncFind;')();
  const results = [];

  const isEven = async function(n) { return n % 2 === 0; };
  const r1 = await fn([1, 3, 4, 6], isEven);
  results.push({ pass: r1 === 4, description: 'First even in [1,3,4,6] → 4', got: String(r1) });

  const r2 = await fn([1, 3, 5], isEven);
  results.push({ pass: r2 === undefined, description: 'No even in [1,3,5] → undefined', got: String(r2) });

  const r3 = await fn([], isEven);
  results.push({ pass: r3 === undefined, description: 'Empty array → undefined', got: String(r3) });

  const isLong = async function(s) { return s.length > 5; };
  const r4 = await fn(['hi', 'hey', 'hello!', 'goodbye'], isLong);
  results.push({ pass: r4 === 'hello!', description: 'First string > 5 chars → "hello!"', got: String(r4) });

  let tested = [];
  const trackingPred = async function(v) { tested.push(v); return v > 10; };
  const r5 = await fn([1, 5, 15, 20], trackingPred);
  results.push({ pass: r5 === 15 && tested.length === 3, description: 'Stops after finding 15 (tested 3 values, not 4)', got: 'found=' + r5 + ', tested=' + tested.length });

  let tested2 = [];
  const trackAll = async function(v) { tested2.push(v); return false; };
  await fn([1, 2, 3], trackAll);
  results.push({ pass: tested2.length === 3, description: 'Tests all values when none match', got: String(tested2.length) });

  const r7 = await fn([0, '', null, 'found'], async function(v) { return v === 'found'; });
  results.push({ pass: r7 === 'found', description: 'Skips falsy values, finds "found"', got: String(r7) });

  const r8 = await fn([null, undefined, 0], async function(v) { return v === null; });
  results.push({ pass: r8 === null, description: 'Can find null as matching value', got: String(r8) });

  return results;
}`,
    hint1:
      'You cannot use `.find()` here because the predicate is async. Instead, loop through the values one at a time, awaiting the predicate for each, and return immediately when you find a match.',
    hint2:
      'Use a `for` loop (not `.forEach` or `.map` — those do not support `await` correctly). Inside: `const result = await predicate(values[i]);` then check `if (result)` and return early.',
    resources: asyncRes,
  },

  // 5. Async Error Aggregation
  {
    id: 1329,
    title: 'Aggregate Async Errors',
    type: 'js',
    tier: 4,
    category: ['async', 'async-patterns'],
    tags: ['async', 'await', 'error-handling', 'aggregation', 'promise'],
    description:
      'Create a function called `aggregateErrors` that takes an array of async functions and runs them all in parallel. Return an object with `{ successes: [...values], errors: [...errorMessages] }`. Every function should be attempted regardless of failures — never short-circuit. Preserve the order of successes and errors relative to the original array.',
    starterCode: '',
    solution:
      'async function aggregateErrors(asyncFns) {\n  const settled = await Promise.allSettled(asyncFns.map(function(fn) { return fn(); }));\n  const successes = [];\n  const errors = [];\n  settled.forEach(function(result) {\n    if (result.status === "fulfilled") {\n      successes.push(result.value);\n    } else {\n      errors.push(result.reason.message || String(result.reason));\n    }\n  });\n  return { successes: successes, errors: errors };\n}',
    testRunner: `async (code) => {
  const fn = new Function(code + '; return aggregateErrors;')();
  const results = [];

  const r1 = await fn([
    async function() { return 1; },
    async function() { return 2; },
    async function() { return 3; }
  ]);
  results.push({ pass: JSON.stringify(r1.successes) === '[1,2,3]' && r1.errors.length === 0, description: 'All succeed → successes [1,2,3], no errors', got: JSON.stringify(r1) });

  const r2 = await fn([
    async function() { throw new Error('a'); },
    async function() { throw new Error('b'); }
  ]);
  results.push({ pass: r2.successes.length === 0 && JSON.stringify(r2.errors) === '["a","b"]', description: 'All fail → no successes, errors ["a","b"]', got: JSON.stringify(r2) });

  const r3 = await fn([
    async function() { return 'ok'; },
    async function() { throw new Error('fail'); },
    async function() { return 'fine'; }
  ]);
  results.push({ pass: JSON.stringify(r3.successes) === '["ok","fine"]' && JSON.stringify(r3.errors) === '["fail"]', description: 'Mixed: successes ["ok","fine"], errors ["fail"]', got: JSON.stringify(r3) });

  const r4 = await fn([]);
  results.push({ pass: r4.successes.length === 0 && r4.errors.length === 0, description: 'Empty array → empty successes and errors', got: JSON.stringify(r4) });

  const r5 = await fn([
    async function() { return null; },
    async function() { return 0; },
    async function() { return false; }
  ]);
  results.push({ pass: JSON.stringify(r5.successes) === '[null,0,false]', description: 'Falsy values are valid successes', got: JSON.stringify(r5.successes) });

  const r6 = await fn([
    async function() { throw new Error('x'); },
    async function() { return 'middle'; },
    async function() { throw new Error('z'); }
  ]);
  results.push({ pass: JSON.stringify(r6.successes) === '["middle"]' && JSON.stringify(r6.errors) === '["x","z"]', description: 'Error ordering preserved: ["x","z"]', got: JSON.stringify(r6) });

  let didReject = false;
  try {
    await fn([async function() { throw new Error('should not reject outer'); }]);
  } catch (e) { didReject = true; }
  results.push({ pass: didReject === false, description: 'Never rejects — always returns result object', got: didReject ? 'rejected' : 'resolved' });

  const r8 = await fn([
    async function() { return { data: [1, 2] }; },
    async function() { throw new Error('network'); },
    async function() { return { data: [3] }; },
    async function() { throw new Error('timeout'); }
  ]);
  results.push({ pass: r8.successes.length === 2 && r8.errors.length === 2 && r8.errors[0] === 'network' && r8.errors[1] === 'timeout', description: 'Complex mix: 2 successes, 2 errors in order', got: JSON.stringify(r8) });

  return results;
}`,
    hint1:
      'You need a way to run all functions in parallel but NOT short-circuit on failure. There is a Promise combinator that waits for everything to settle regardless of outcome.',
    hint2:
      'Map over the functions to invoke them (getting Promises), then use the combinator that collects all outcomes. Loop through the results and separate fulfilled values from rejected reasons.',
    resources: [...promiseAllSettledRes, ...asyncRes],
  },

  // 6. Parallel with Timeout
  {
    id: 1330,
    title: 'Parallel with Timeout',
    type: 'js',
    tier: 4,
    category: ['async', 'async-patterns'],
    tags: ['async', 'await', 'promise', 'race', 'timeout', 'parallel', 'combined'],
    description:
      'Create a function called `fetchWithTimeout` that takes an array of async functions and a timeout in milliseconds. Run all functions in parallel, but if the entire batch does not complete within the timeout, reject with an Error whose message is "Timeout after Nms" (where N is the timeout value). If all functions complete in time, return their resolved values as an array.',
    starterCode: '',
    solution:
      'async function fetchWithTimeout(asyncFns, timeoutMs) {\n  const dataPromise = Promise.all(asyncFns.map(function(fn) { return fn(); }));\n  const timeoutPromise = new Promise(function(_, reject) {\n    setTimeout(function() {\n      reject(new Error("Timeout after " + timeoutMs + "ms"));\n    }, timeoutMs);\n  });\n  return Promise.race([dataPromise, timeoutPromise]);\n}',
    testRunner: `async (code) => {
  const fn = new Function(code + '; return fetchWithTimeout;')();
  const results = [];

  const r1 = await fn([
    async function() { return 'a'; },
    async function() { return 'b'; }
  ], 1000);
  results.push({ pass: JSON.stringify(r1) === '["a","b"]', description: 'Instant resolve within 1000ms → ["a","b"]', got: JSON.stringify(r1) });

  let err2 = '';
  try {
    await fn([
      async function() { return new Promise(function(r) { setTimeout(function() { r('slow'); }, 200); }); }
    ], 50);
  } catch (e) { err2 = e.message; }
  results.push({ pass: err2 === 'Timeout after 50ms', description: '200ms task with 50ms timeout → "Timeout after 50ms"', got: err2 });

  const r3 = await fn([
    async function() { return new Promise(function(r) { setTimeout(function() { r(1); }, 10); }); },
    async function() { return new Promise(function(r) { setTimeout(function() { r(2); }, 20); }); }
  ], 500);
  results.push({ pass: JSON.stringify(r3) === '[1,2]', description: 'Both finish within 500ms → [1,2]', got: JSON.stringify(r3) });

  const r4 = await fn([], 100);
  results.push({ pass: JSON.stringify(r4) === '[]', description: 'Empty array resolves immediately → []', got: JSON.stringify(r4) });

  let err5 = '';
  try {
    await fn([
      async function() { return 'fast'; },
      async function() { return new Promise(function(r) { setTimeout(function() { r('slow'); }, 300); }); }
    ], 100);
  } catch (e) { err5 = e.message; }
  results.push({ pass: err5 === 'Timeout after 100ms', description: 'One fast + one slow: slow causes timeout', got: err5 });

  let err6 = '';
  try {
    await fn([
      async function() { throw new Error('boom'); }
    ], 1000);
  } catch (e) { err6 = e.message; }
  results.push({ pass: err6 === 'boom', description: 'Rejection within timeout propagates original error', got: err6 });

  const r7 = await fn([
    async function() { return new Promise(function(r) { setTimeout(function() { r('just in time'); }, 40); }); }
  ], 100);
  results.push({ pass: r7[0] === 'just in time', description: '40ms task within 100ms timeout → succeeds', got: JSON.stringify(r7) });

  let err8 = '';
  try {
    await fn([
      async function() { return new Promise(function(r) { setTimeout(function() { r('a'); }, 500); }); },
      async function() { return new Promise(function(r) { setTimeout(function() { r('b'); }, 500); }); },
      async function() { return new Promise(function(r) { setTimeout(function() { r('c'); }, 500); }); }
    ], 200);
  } catch (e) { err8 = e.message; }
  results.push({ pass: err8 === 'Timeout after 200ms', description: 'Three slow tasks with short timeout → rejects', got: err8 });

  return results;
}`,
    hint1:
      'Create two competing Promises: one that resolves when all the async functions complete (parallel), and one that rejects after the timeout. Then race them against each other.',
    hint2:
      'Use one combinator to run all functions in parallel (resolves when all complete). Create a timeout Promise with `setTimeout` that rejects with the error message. Then use another combinator that returns whichever settles first.',
    resources: [...promiseAllRes, ...promiseRaceRes],
  },
];

// ─── Validation ─────────────────────────────────────────────────────────────

async function validate() {
  let pass = 0;
  let fail = 0;

  for (const ex of exercises) {
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
  }

  console.log(`\nValidation: ${pass} passed, ${fail} failed out of ${pass + fail} tests`);
  if (fail > 0) process.exit(1);
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
