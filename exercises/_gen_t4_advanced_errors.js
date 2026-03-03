#!/usr/bin/env node
/**
 * Generator: T4 Advanced Error Handling — Section 3 (4 exercises, IDs 1337-1340)
 *
 * Covers: Rethrow with Context, Error Collection, Defensive Guards, Error Pipelines
 *
 * T4 convention: description-only, NO starterCode. Student writes everything
 * from scratch including function declaration. Description tells them the
 * function name and expected behavior.
 *
 * Usage:
 *   node exercises/_gen_t4_advanced_errors.js            # Append to curriculum
 *   node exercises/_gen_t4_advanced_errors.js --validate  # Validate testRunners only
 */

const fs = require('fs');
const path = require('path');

const CURRICULUM_PATH = path.join(
  __dirname,
  'collections',
  'default-curriculum.json'
);

// ─── Resources (MDN only for T4) ────────────────────────────────────────────

const rethrowRes = [
  { label: 'MDN: throw', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/throw', description: 'Throw statement reference' },
  { label: 'MDN: Error', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error', description: 'Error object reference' },
];
const collectorRes = [
  { label: 'MDN: try...catch', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch', description: 'Try/catch reference' },
  { label: 'MDN: Array.prototype.forEach', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach', description: 'Array forEach reference' },
];
const guardRes = [
  { label: 'MDN: TypeError', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypeError', description: 'TypeError reference' },
  { label: 'MDN: Array.isArray', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray', description: 'Array.isArray reference' },
];
const pipelineRes = [
  { label: 'MDN: try...catch', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch', description: 'Try/catch reference' },
  { label: 'MDN: Array.prototype.reduce', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce', description: 'Array reduce reference' },
];

// ─── Exercise Definitions ───────────────────────────────────────────────────

const exercises = [

  // ══════════════════════════════════════════════════════════════════════════
  // T4 Section 3: Advanced Error Handling (4 exercises, IDs 1337-1340)
  // ══════════════════════════════════════════════════════════════════════════

  // 1. Rethrow with Context
  {
    id: 1337,
    title: 'Rethrow with Context',
    type: 'js',
    tier: 4,
    category: ['error-handling', 'rethrow'],
    tags: ['try-catch', 'throw', 'error', 'rethrow', 'context', 'higher-order-function'],
    description:
      'Create a function called `withContext` that takes a function `fn` and a string `context`. It should return a new function that calls `fn` with the same arguments. If `fn` executes successfully, return its result. If `fn` throws an error, catch it and throw a new `Error` whose message is `"[context] original message"` (the context string in square brackets followed by a space and the original error message). This wrapping pattern adds meaningful context to errors so you can trace where they originated.',
    starterCode: '',
    solution:
      'function withContext(fn, context) {\n  return function() {\n    try {\n      return fn.apply(null, arguments);\n    } catch (err) {\n      throw new Error("[" + context + "] " + err.message);\n    }\n  };\n}',
    testRunner: `(code) => {
  var fn = new Function(code + '; return withContext;')();
  var results = [];

  var safeParse = fn(JSON.parse, 'ConfigLoader');
  var r1 = safeParse('{"a":1}');
  results.push({ pass: r1.a === 1, description: 'Successful call passes through result', got: JSON.stringify(r1) });

  var err2 = '';
  try { safeParse('bad json'); } catch (e) { err2 = e.message; }
  results.push({ pass: err2.startsWith('[ConfigLoader] '), description: 'Failed call rethrows with "[ConfigLoader] ..." prefix', got: err2 });

  var safeDiv = fn(function(a, b) { if (b === 0) throw new Error('division by zero'); return a / b; }, 'MathEngine');
  var r3 = safeDiv(10, 2);
  results.push({ pass: r3 === 5, description: 'Successful wrapped division returns 5', got: String(r3) });

  var err4 = '';
  try { safeDiv(10, 0); } catch (e) { err4 = e.message; }
  results.push({ pass: err4 === '[MathEngine] division by zero', description: 'Division by zero rethrows as "[MathEngine] division by zero"', got: err4 });

  var safeLookup = fn(function(obj, key) { if (!obj) throw new TypeError('null object'); return obj[key]; }, 'UserService');
  var r5 = safeLookup({ name: 'Alice' }, 'name');
  results.push({ pass: r5 === 'Alice', description: 'Successful lookup returns "Alice"', got: String(r5) });

  var err6 = '';
  try { safeLookup(null, 'name'); } catch (e) { err6 = e.message; }
  results.push({ pass: err6 === '[UserService] null object', description: 'Null object rethrows as "[UserService] null object"', got: err6 });

  var isNewError = false;
  try { safeLookup(null, 'x'); } catch (e) { isNewError = e instanceof Error; }
  results.push({ pass: isNewError, description: 'Rethrown error is instance of Error', got: String(isNewError) });

  var noArgs = fn(function() { return 42; }, 'Simple');
  results.push({ pass: noArgs() === 42, description: 'Zero-argument function works correctly', got: String(noArgs()) });

  return results;
}`,
    hint1:
      'Return a new function that wraps `fn` in a try/catch. In the catch block, create a new Error that combines the context string in brackets with the original error message, then throw it.',
    hint2:
      'Use `fn.apply(null, arguments)` or the spread operator to forward all arguments to the original function. In the catch, build the message with string concatenation: `"[" + context + "] " + err.message`.',
    resources: rethrowRes,
  },

  // 2. Error Collector
  {
    id: 1338,
    title: 'Error Collector',
    type: 'js',
    tier: 4,
    category: ['error-handling', 'error-collection'],
    tags: ['try-catch', 'error', 'collection', 'batch-processing', 'results'],
    description:
      'Create a function called `collectErrors` that takes an array of functions. Call each function (with no arguments) and collect the outcomes. Return an object with two arrays: `results` containing `{ index, value }` for each successful call, and `errors` containing `{ index, message }` for each function that threw. The `index` is the position of the function in the input array (starting at 0). Process every function — do not stop at the first error. The function itself should never throw.',
    starterCode: '',
    solution:
      'function collectErrors(operations) {\n  var results = [];\n  var errors = [];\n  for (var i = 0; i < operations.length; i++) {\n    try {\n      var value = operations[i]();\n      results.push({ index: i, value: value });\n    } catch (err) {\n      errors.push({ index: i, message: err.message });\n    }\n  }\n  return { results: results, errors: errors };\n}',
    testRunner: `(code) => {
  var fn = new Function(code + '; return collectErrors;')();
  var results = [];

  var r1 = fn([
    function() { return 1; },
    function() { return 2; },
    function() { return 3; }
  ]);
  results.push({ pass: r1.results.length === 3 && r1.errors.length === 0, description: 'All succeed: 3 results, 0 errors', got: 'results=' + r1.results.length + ', errors=' + r1.errors.length });

  var r2 = fn([
    function() { throw new Error('fail1'); },
    function() { throw new Error('fail2'); }
  ]);
  results.push({ pass: r2.results.length === 0 && r2.errors.length === 2, description: 'All fail: 0 results, 2 errors', got: 'results=' + r2.results.length + ', errors=' + r2.errors.length });

  var r3 = fn([
    function() { return 'ok'; },
    function() { throw new Error('bad'); },
    function() { return 42; }
  ]);
  results.push({ pass: r3.results.length === 2 && r3.errors.length === 1, description: 'Mixed: 2 results, 1 error', got: 'results=' + r3.results.length + ', errors=' + r3.errors.length });

  results.push({ pass: r3.errors[0].index === 1 && r3.errors[0].message === 'bad', description: 'Error tracks correct index (1) and message ("bad")', got: 'index=' + r3.errors[0].index + ', msg=' + r3.errors[0].message });

  results.push({ pass: r3.results[0].index === 0 && r3.results[0].value === 'ok' && r3.results[1].index === 2 && r3.results[1].value === 42, description: 'Results track correct indices and values', got: JSON.stringify(r3.results) });

  var r6 = fn([]);
  results.push({ pass: r6.results.length === 0 && r6.errors.length === 0, description: 'Empty array returns empty results and errors', got: JSON.stringify(r6) });

  var r7 = fn([function() { return null; }, function() { return 0; }, function() { return false; }]);
  results.push({ pass: r7.results.length === 3 && r7.results[0].value === null && r7.results[1].value === 0 && r7.results[2].value === false, description: 'Falsy return values (null, 0, false) are valid results', got: JSON.stringify(r7.results) });

  var r8 = fn([
    function() { throw new TypeError('type error'); },
    function() { return 'ok'; },
    function() { throw new RangeError('range error'); },
    function() { return 'fine'; }
  ]);
  results.push({ pass: r8.results.length === 2 && r8.errors.length === 2 && r8.errors[0].message === 'type error' && r8.errors[1].index === 2, description: 'Alternating success/failure collects all with correct indices', got: 'results=' + JSON.stringify(r8.results) + ', errors=' + JSON.stringify(r8.errors) });

  return results;
}`,
    hint1:
      'Loop through the array with a `for` loop. Wrap each function call in its own try/catch so one failure does not stop the loop. Push successful values and caught errors into separate arrays, including the loop index with each entry.',
    hint2:
      'For each index `i`, try calling `operations[i]()`. On success, push `{ index: i, value: result }` to the results array. On catch, push `{ index: i, message: err.message }` to the errors array. Return both arrays in an object.',
    resources: collectorRes,
  },

  // 3. Defensive Guard
  {
    id: 1339,
    title: 'Defensive Guard',
    type: 'js',
    tier: 4,
    category: ['error-handling', 'defensive-programming'],
    tags: ['validation', 'guard-clause', 'error-collection', 'defensive', 'type-checking'],
    description:
      'Create a function called `processTransaction` that takes a transaction object and validates it thoroughly before processing. Check ALL of the following rules, collecting every error (not stopping at the first one): `type` must be a string equal to `"credit"` or `"debit"`; `amount` must be a number greater than 0; `account` must be a non-empty string; `timestamp` must be a number (Unix milliseconds). If there are validation errors, return `{ valid: false, errors: errors }` where `errors` is an array of strings describing each failure. If all checks pass, return `{ valid: true, processed: { type, amount, account, timestamp } }`. If the input is not an object or is null, return a single error: `"Transaction must be an object"`.',
    starterCode: '',
    solution:
      'function processTransaction(txn) {\n  if (txn === null || typeof txn !== "object" || Array.isArray(txn)) {\n    return { valid: false, errors: ["Transaction must be an object"] };\n  }\n  var errors = [];\n  if (typeof txn.type !== "string" || (txn.type !== "credit" && txn.type !== "debit")) {\n    errors.push("type must be \\"credit\\" or \\"debit\\"");\n  }\n  if (typeof txn.amount !== "number" || txn.amount <= 0) {\n    errors.push("amount must be a positive number");\n  }\n  if (typeof txn.account !== "string" || txn.account.trim() === "") {\n    errors.push("account must be a non-empty string");\n  }\n  if (typeof txn.timestamp !== "number") {\n    errors.push("timestamp must be a number");\n  }\n  if (errors.length > 0) {\n    return { valid: false, errors: errors };\n  }\n  return { valid: true, processed: { type: txn.type, amount: txn.amount, account: txn.account, timestamp: txn.timestamp } };\n}',
    testRunner: `(code) => {
  var fn = new Function(code + '; return processTransaction;')();
  var results = [];

  var r1 = fn({ type: 'credit', amount: 50, account: 'ACC001', timestamp: 1700000000000 });
  results.push({ pass: r1.valid === true && r1.processed.type === 'credit' && r1.processed.amount === 50, description: 'Valid credit transaction returns processed object', got: JSON.stringify(r1) });

  var r2 = fn(null);
  results.push({ pass: r2.valid === false && r2.errors.length === 1 && r2.errors[0] === 'Transaction must be an object', description: 'null input returns "Transaction must be an object"', got: JSON.stringify(r2) });

  var r3 = fn({ type: 'transfer', amount: 50, account: 'ACC001', timestamp: 1700000000000 });
  results.push({ pass: r3.valid === false && r3.errors.length === 1 && r3.errors[0].indexOf('type') !== -1, description: 'Invalid type "transfer" returns one type error', got: JSON.stringify(r3.errors) });

  var r4 = fn({ type: 'debit', amount: -10, account: '', timestamp: 'yesterday' });
  results.push({ pass: r4.valid === false && r4.errors.length === 3, description: 'Three invalid fields returns 3 errors (amount, account, timestamp)', got: JSON.stringify(r4.errors) });

  var r5 = fn({});
  results.push({ pass: r5.valid === false && r5.errors.length === 4, description: 'Empty object returns 4 errors (all fields missing)', got: JSON.stringify(r5.errors) });

  var r6 = fn({ type: 'debit', amount: 100, account: 'ACC002', timestamp: 0 });
  results.push({ pass: r6.valid === true && r6.processed.type === 'debit', description: 'Valid debit with timestamp 0 (falsy but valid number) passes', got: JSON.stringify(r6) });

  var r7 = fn('not an object');
  results.push({ pass: r7.valid === false && r7.errors[0] === 'Transaction must be an object', description: 'String input returns "Transaction must be an object"', got: JSON.stringify(r7) });

  var r8 = fn({ type: 'credit', amount: 0, account: '  ', timestamp: 1700000000000 });
  results.push({ pass: r8.valid === false && r8.errors.length === 2, description: 'amount 0 and whitespace account returns 2 errors', got: JSON.stringify(r8.errors) });

  return results;
}`,
    hint1:
      'First check if the input is a valid object (not null, not an array, typeof is "object"). Then check each field one by one, pushing error strings into an array. At the end, if the array is empty all checks passed; otherwise return the collected errors.',
    hint2:
      'Guard against non-objects first. Then build an errors array: check `typeof txn.type === "string"` and value is "credit" or "debit"; check `typeof txn.amount === "number"` and greater than 0; check `typeof txn.account === "string"` and trimmed is not empty; check `typeof txn.timestamp === "number"`. Return `{ valid: false, errors }` or `{ valid: true, processed: {...} }`.',
    resources: guardRes,
  },

  // 4. Error Pipeline
  {
    id: 1340,
    title: 'Error Pipeline',
    type: 'js',
    tier: 4,
    category: ['error-handling', 'pipeline'],
    tags: ['try-catch', 'pipeline', 'error', 'data-processing', 'batch'],
    description:
      'Create a function called `pipeline` that takes an array of data items and an array of transformation functions (steps). Each item should pass through every step in order. If a step throws for a particular item, that item is removed from processing and added to a `failed` array with details about the failure. Items that survive all steps go into a `passed` array. Return `{ passed: [...], failed: [...] }` where each `failed` entry is `{ item: originalItem, step: stepIndex, error: errorMessage }` (`step` is the 0-based index of the step that failed). Items that fail at an earlier step should not be processed by later steps.',
    starterCode: '',
    solution:
      'function pipeline(data, steps) {\n  var passed = data.slice();\n  var failed = [];\n  for (var s = 0; s < steps.length; s++) {\n    var surviving = [];\n    for (var i = 0; i < passed.length; i++) {\n      try {\n        passed[i] = steps[s](passed[i]);\n        surviving.push(passed[i]);\n      } catch (err) {\n        failed.push({ item: passed[i], step: s, error: err.message });\n      }\n    }\n    passed = surviving;\n  }\n  return { passed: passed, failed: failed };\n}',
    testRunner: `(code) => {
  var fn = new Function(code + '; return pipeline;')();
  var results = [];

  var r1 = fn([1, 2, 3], [function(x) { return x * 2; }]);
  results.push({ pass: JSON.stringify(r1.passed) === '[2,4,6]' && r1.failed.length === 0, description: 'Single step doubles all: [2, 4, 6], no failures', got: JSON.stringify(r1) });

  var r2 = fn([2, 0, 4], [function(x) { if (x === 0) throw new Error('zero'); return 10 / x; }]);
  results.push({ pass: r2.passed.length === 2 && r2.failed.length === 1 && r2.failed[0].step === 0 && r2.failed[0].error === 'zero', description: 'Zero fails at step 0, others pass through', got: JSON.stringify(r2) });

  var r3 = fn(
    ['hello', '', 'world'],
    [
      function(s) { if (s === '') throw new Error('empty'); return s.toUpperCase(); },
      function(s) { return s + '!'; }
    ]
  );
  results.push({ pass: JSON.stringify(r3.passed) === '["HELLO!","WORLD!"]' && r3.failed.length === 1, description: 'Empty string fails step 0, others pass both steps', got: JSON.stringify(r3) });

  var r4 = fn(
    [5, -1, 10, -3],
    [
      function(x) { if (x < 0) throw new Error('negative'); return x; },
      function(x) { if (x > 8) throw new Error('too large'); return x * 2; }
    ]
  );
  results.push({ pass: r4.passed.length === 1 && r4.passed[0] === 10 && r4.failed.length === 3, description: 'Negatives fail step 0, >8 fails step 1, only 5 survives → 10', got: JSON.stringify(r4) });

  var r5 = fn([], [function(x) { return x; }]);
  results.push({ pass: r5.passed.length === 0 && r5.failed.length === 0, description: 'Empty data returns empty passed and failed', got: JSON.stringify(r5) });

  var r6 = fn([1, 2, 3], []);
  results.push({ pass: JSON.stringify(r6.passed) === '[1,2,3]' && r6.failed.length === 0, description: 'No steps returns original data unchanged', got: JSON.stringify(r6) });

  var r7 = fn(
    [1, 2, 3, 4, 5],
    [
      function(x) { if (x % 2 === 0) throw new Error('even'); return x; },
      function(x) { return x * 10; },
      function(x) { if (x > 40) throw new Error('too big'); return x; }
    ]
  );
  results.push({ pass: r7.passed.length === 2 && JSON.stringify(r7.passed) === '[10,30]' && r7.failed.length === 3, description: 'Evens fail step 0, 5→50 fails step 2: [10, 30] pass', got: JSON.stringify(r7) });

  var failedItem = r4.failed.find(function(f) { return f.item === -1; });
  results.push({ pass: failedItem && failedItem.step === 0 && failedItem.error === 'negative', description: 'Failed entry has original item, step index, and error message', got: JSON.stringify(failedItem) });

  return results;
}`,
    hint1:
      'For each step, loop through the current set of passing items. Wrap each step call in try/catch. If it succeeds, keep the transformed item. If it fails, move the item to the failed array with the step index and error message. Only surviving items continue to the next step.',
    hint2:
      'Start with a copy of the data array. For each step index, create a new "surviving" array. Loop through current items: try applying the step function, push the result to surviving on success, or push `{ item, step, error }` to failed on catch. Replace the current items with the surviving array before moving to the next step.',
    resources: pipelineRes,
  },

];

// ─── Validation ─────────────────────────────────────────────────────────────

async function validate() {
  let pass = 0;
  let fail = 0;

  for (const ex of exercises) {
    try {
      const runner = new Function(`return (${ex.testRunner})`)();
      const results = runner(ex.solution);
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
        console.log(`  \u2713 [${ex.id}] ${ex.title} (${results.length} tests)`);
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

  console.log(
    `T4 Advanced Error Handling — Section 3: ${exercises.length} exercises (IDs ${exercises[0].id}-${exercises[exercises.length - 1].id})`
  );

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
