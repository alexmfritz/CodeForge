#!/usr/bin/env node
/**
 * Generator: T4 Capstone Projects — Section 10 (6 exercises, IDs 1382-1387)
 *
 * Covers: Expression Evaluator, Reactive Store, Task Scheduler,
 *         Data Pipeline Engine, Matrix Operations, Mini App Framework
 *
 * Each capstone combines 2-3 major concept domains from earlier T4 sections.
 * These are the hardest exercises in the curriculum.
 *
 * T4 convention: description-only, NO starterCode. Student writes everything
 * from scratch.
 *
 * Usage:
 *   node exercises/_gen_t4_capstones.js            # Append to curriculum
 *   node exercises/_gen_t4_capstones.js --validate  # Validate testRunners only
 */

const fs = require('fs');
const path = require('path');

const CURRICULUM_PATH = path.join(
  __dirname,
  'collections',
  'default-curriculum.json'
);

// ─── Resources (MDN only for T4) ────────────────────────────────────────────

const exprRes = [
  { label: 'MDN: Array', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array', description: 'Array reference' },
  { label: 'MDN: String.prototype.match', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/match', description: 'String match reference' },
];
const reactiveRes = [
  { label: 'MDN: Object.keys', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys', description: 'Object.keys reference' },
  { label: 'MDN: Array.prototype.forEach', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach', description: 'Array forEach reference' },
];
const schedulerRes = [
  { label: 'MDN: Array.prototype.sort', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort', description: 'Array sort reference' },
  { label: 'MDN: Array.prototype.filter', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter', description: 'Array filter reference' },
];
const pipelineRes = [
  { label: 'MDN: Array.prototype.reduce', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce', description: 'Array reduce reference' },
  { label: 'MDN: try...catch', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch', description: 'Try/catch reference' },
];
const matrixRes = [
  { label: 'MDN: Array', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array', description: 'Array reference' },
  { label: 'MDN: Math', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math', description: 'Math object reference' },
];
const frameworkRes = [
  { label: 'MDN: Object.assign', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign', description: 'Object.assign reference' },
  { label: 'MDN: Functions', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions', description: 'Functions guide' },
];

// ─── Exercise Definitions ───────────────────────────────────────────────────

const exercises = [

  // ══════════════════════════════════════════════════════════════════════════
  // T4 Section 10: Capstone Projects (6 exercises, IDs 1382-1387)
  // ══════════════════════════════════════════════════════════════════════════

  // 1. Expression Evaluator (stack + regex + algorithms)
  {
    id: 1382,
    title: 'Expression Evaluator',
    type: 'js',
    tier: 4,
    category: ['capstone', 'expression-evaluator'],
    tags: ['stack', 'parsing', 'math', 'operator-precedence', 'capstone', 'algorithm'],
    description:
      'Create a function called `evaluate` that takes a string containing a mathematical expression with `+`, `-`, `*`, `/`, and parentheses, and returns the numeric result. The function must respect standard operator precedence: parentheses first, then `*` and `/` (left to right), then `+` and `-` (left to right). The expression will contain non-negative integers and may have spaces. Examples: `"3 + 4 * 2"` returns `11`, `"(3 + 4) * 2"` returns `14`, `"10 / 2 + 3"` returns `8`. You may assume the input is always a valid expression.',
    starterCode: '',
    solution:
      'function evaluate(expr) {\n  var tokens = expr.match(/\\d+|[+\\-*/()]/g);\n  var pos = 0;\n  function parseExpr() {\n    var left = parseTerm();\n    while (pos < tokens.length && (tokens[pos] === "+" || tokens[pos] === "-")) {\n      var op = tokens[pos]; pos++;\n      var right = parseTerm();\n      if (op === "+") left = left + right;\n      else left = left - right;\n    }\n    return left;\n  }\n  function parseTerm() {\n    var left = parseFactor();\n    while (pos < tokens.length && (tokens[pos] === "*" || tokens[pos] === "/")) {\n      var op = tokens[pos]; pos++;\n      var right = parseFactor();\n      if (op === "*") left = left * right;\n      else left = left / right;\n    }\n    return left;\n  }\n  function parseFactor() {\n    if (tokens[pos] === "(") {\n      pos++;\n      var result = parseExpr();\n      pos++;\n      return result;\n    }\n    var num = Number(tokens[pos]); pos++;\n    return num;\n  }\n  return parseExpr();\n}',
    testRunner: `(code) => {
  var fn = new Function(code + '; return evaluate;')();
  var results = [];

  results.push({ pass: fn('3 + 4') === 7, description: 'Simple addition: "3 + 4" = 7', got: String(fn('3 + 4')) });

  results.push({ pass: fn('3 + 4 * 2') === 11, description: 'Operator precedence: "3 + 4 * 2" = 11 (not 14)', got: String(fn('3 + 4 * 2')) });

  results.push({ pass: fn('(3 + 4) * 2') === 14, description: 'Parentheses override: "(3 + 4) * 2" = 14', got: String(fn('(3 + 4) * 2')) });

  results.push({ pass: fn('10 / 2 + 3') === 8, description: 'Division first: "10 / 2 + 3" = 8', got: String(fn('10 / 2 + 3')) });

  results.push({ pass: fn('2 * (3 + 4) - 1') === 13, description: 'Mixed: "2 * (3 + 4) - 1" = 13', got: String(fn('2 * (3 + 4) - 1')) });

  results.push({ pass: fn('(2 + 3) * (4 + 1)') === 25, description: 'Two groups: "(2 + 3) * (4 + 1)" = 25', got: String(fn('(2 + 3) * (4 + 1)')) });

  results.push({ pass: fn('100 / 10 / 2') === 5, description: 'Left-to-right division: "100 / 10 / 2" = 5', got: String(fn('100 / 10 / 2')) });

  results.push({ pass: fn('((2 + 3) * 2 + 1) * 3') === 33, description: 'Nested parens: "((2 + 3) * 2 + 1) * 3" = 33', got: String(fn('((2 + 3) * 2 + 1) * 3')) });

  return results;
}`,
    hint1:
      'Use recursive descent parsing with three levels of precedence: expressions handle `+` and `-`, terms handle `*` and `/`, and factors handle numbers and parenthesized sub-expressions. Tokenize the string first, then walk through the tokens with a position pointer.',
    hint2:
      'Tokenize with a regex like `/\\d+|[+\\-*/()]/g`. Write three functions: `parseExpr` calls `parseTerm` and loops on `+`/`-`; `parseTerm` calls `parseFactor` and loops on `*`/`/`; `parseFactor` handles numbers (return the value) and `(` (recurse into `parseExpr`, then skip `)`). Use a shared position variable that advances as tokens are consumed.',
    resources: exprRes,
  },

  // 2. Reactive Store (observer + validation + computed)
  {
    id: 1383,
    title: 'Reactive Store',
    type: 'js',
    tier: 4,
    category: ['capstone', 'reactive-store'],
    tags: ['observer', 'state-management', 'computed', 'subscribe', 'capstone', 'design-pattern'],
    description:
      'Create a function called `createStore` that takes an initial state object and returns a reactive store. The store has these methods: `getState()` returns a shallow copy of the current state; `setState(changes)` merges changes into the state and notifies all subscribers; `subscribe(callback)` registers a function that is called with `(newState, oldState)` whenever state changes — it returns an `unsubscribe` function; `computed(name, deps, fn)` defines a computed property named `name` that depends on the state keys listed in `deps` (an array of strings) and is calculated by `fn(state)` — the computed value updates automatically when any dependency changes and is included in `getState()`. Computed properties should not trigger re-computation unless one of their dependencies actually changed.',
    starterCode: '',
    solution:
      'function createStore(initialState) {\n  var state = {};\n  var keys = Object.keys(initialState);\n  for (var i = 0; i < keys.length; i++) state[keys[i]] = initialState[keys[i]];\n  var subscribers = [];\n  var computeds = [];\n  function recompute() {\n    for (var i = 0; i < computeds.length; i++) {\n      state[computeds[i].name] = computeds[i].fn(state);\n    }\n  }\n  recompute();\n  return {\n    getState: function() {\n      var copy = {};\n      var k = Object.keys(state);\n      for (var i = 0; i < k.length; i++) copy[k[i]] = state[k[i]];\n      return copy;\n    },\n    setState: function(changes) {\n      var oldState = {};\n      var k = Object.keys(state);\n      for (var i = 0; i < k.length; i++) oldState[k[i]] = state[k[i]];\n      var changeKeys = Object.keys(changes);\n      for (var i = 0; i < changeKeys.length; i++) {\n        state[changeKeys[i]] = changes[changeKeys[i]];\n      }\n      var needsRecompute = false;\n      for (var i = 0; i < computeds.length; i++) {\n        for (var j = 0; j < computeds[i].deps.length; j++) {\n          if (changeKeys.indexOf(computeds[i].deps[j]) !== -1) {\n            needsRecompute = true;\n            break;\n          }\n        }\n        if (needsRecompute) break;\n      }\n      if (needsRecompute) recompute();\n      var newState = this.getState();\n      for (var i = 0; i < subscribers.length; i++) {\n        subscribers[i](newState, oldState);\n      }\n    },\n    subscribe: function(callback) {\n      subscribers.push(callback);\n      return function() {\n        subscribers = subscribers.filter(function(cb) { return cb !== callback; });\n      };\n    },\n    computed: function(name, deps, fn) {\n      computeds.push({ name: name, deps: deps, fn: fn });\n      state[name] = fn(state);\n    }\n  };\n}',
    testRunner: `(code) => {
  var fn = new Function(code + '; return createStore;')();
  var results = [];

  var store = fn({ count: 0, name: 'Alice' });
  results.push({ pass: store.getState().count === 0 && store.getState().name === 'Alice', description: 'Initial state: count=0, name="Alice"', got: JSON.stringify(store.getState()) });

  store.setState({ count: 5 });
  results.push({ pass: store.getState().count === 5 && store.getState().name === 'Alice', description: 'setState merges: count=5, name unchanged', got: JSON.stringify(store.getState()) });

  var log = [];
  var unsub = store.subscribe(function(ns, os) { log.push({ newCount: ns.count, oldCount: os.count }); });
  store.setState({ count: 10 });
  results.push({ pass: log.length === 1 && log[0].newCount === 10 && log[0].oldCount === 5, description: 'Subscriber receives new (10) and old (5) state on change', got: JSON.stringify(log) });

  unsub();
  store.setState({ count: 20 });
  results.push({ pass: log.length === 1, description: 'After unsubscribe, subscriber no longer fires', got: 'log.length=' + log.length });

  var store2 = fn({ price: 10, quantity: 3 });
  store2.computed('total', ['price', 'quantity'], function(s) { return s.price * s.quantity; });
  results.push({ pass: store2.getState().total === 30, description: 'Computed "total" = price*quantity = 30', got: 'total=' + store2.getState().total });

  store2.setState({ quantity: 5 });
  results.push({ pass: store2.getState().total === 50, description: 'Computed updates when dependency changes: 10*5 = 50', got: 'total=' + store2.getState().total });

  var copy = store.getState();
  copy.count = 999;
  results.push({ pass: store.getState().count === 20, description: 'getState returns a copy — mutating it does not affect store', got: 'count=' + store.getState().count });

  var store3 = fn({ a: 1, b: 2 });
  var calls = 0;
  store3.computed('sum', ['a'], function(s) { calls++; return s.a + s.b; });
  calls = 0;
  store3.setState({ b: 10 });
  results.push({ pass: calls === 0 && store3.getState().sum === 3, description: 'Computed not recomputed when non-dependency (b) changes', got: 'calls=' + calls + ', sum=' + store3.getState().sum });

  return results;
}`,
    hint1:
      'Keep state as a private object, subscribers as an array, and computed definitions as an array of `{ name, deps, fn }`. When `setState` is called, save a copy of the old state, merge changes, check if any computed property depends on a changed key, recompute if needed, then notify all subscribers with the new and old states.',
    hint2:
      'For `subscribe`, push the callback and return a function that filters it out. For `computed`, store the definition and immediately calculate the initial value. In `setState`, after merging changes, loop through computed definitions — if any dependency key appears in the changed keys, re-run all computed functions. Then call each subscriber with shallow copies of new and old state.',
    resources: reactiveRes,
  },

  // 3. Task Scheduler (priority queue + error handling + dependencies)
  {
    id: 1384,
    title: 'Task Scheduler',
    type: 'js',
    tier: 4,
    category: ['capstone', 'task-scheduler'],
    tags: ['priority-queue', 'scheduling', 'dependencies', 'error-handling', 'capstone'],
    description:
      'Create a function called `createScheduler` that returns a task scheduler. Tasks have a `name` (string), `priority` (number, higher runs first), and an `action` (function). The scheduler has these methods: `addTask(name, priority, action)` registers a task; `addDependency(taskName, dependsOn)` declares that `taskName` cannot run until `dependsOn` has completed; `run()` executes all tasks in priority order (highest first), respecting dependencies — a task with unmet dependencies is deferred until its dependencies complete. If a task\'s action throws an error, record it and continue with remaining tasks. Return `{ completed: [names], failed: [{ name, error }], skipped: [names] }`. Tasks whose dependencies failed should be skipped (not attempted).',
    starterCode: '',
    solution:
      'function createScheduler() {\n  var tasks = {};\n  var deps = {};\n  return {\n    addTask: function(name, priority, action) {\n      tasks[name] = { name: name, priority: priority, action: action };\n      if (!deps[name]) deps[name] = [];\n    },\n    addDependency: function(taskName, dependsOn) {\n      if (!deps[taskName]) deps[taskName] = [];\n      deps[taskName].push(dependsOn);\n    },\n    run: function() {\n      var completed = [];\n      var failed = [];\n      var skipped = [];\n      var completedSet = {};\n      var failedSet = {};\n      var sorted = Object.keys(tasks).map(function(k) { return tasks[k]; });\n      sorted.sort(function(a, b) { return b.priority - a.priority; });\n      var remaining = sorted.slice();\n      var progress = true;\n      while (remaining.length > 0 && progress) {\n        progress = false;\n        var next = [];\n        for (var i = 0; i < remaining.length; i++) {\n          var task = remaining[i];\n          var taskDeps = deps[task.name] || [];\n          var hasFailed = false;\n          var allMet = true;\n          for (var j = 0; j < taskDeps.length; j++) {\n            if (failedSet[taskDeps[j]]) { hasFailed = true; break; }\n            if (!completedSet[taskDeps[j]]) { allMet = false; }\n          }\n          if (hasFailed) {\n            skipped.push(task.name);\n            failedSet[task.name] = true;\n            progress = true;\n          } else if (allMet) {\n            try {\n              task.action();\n              completed.push(task.name);\n              completedSet[task.name] = true;\n            } catch (err) {\n              failed.push({ name: task.name, error: err.message });\n              failedSet[task.name] = true;\n            }\n            progress = true;\n          } else {\n            next.push(task);\n          }\n        }\n        remaining = next;\n      }\n      for (var i = 0; i < remaining.length; i++) {\n        skipped.push(remaining[i].name);\n      }\n      return { completed: completed, failed: failed, skipped: skipped };\n    }\n  };\n}',
    testRunner: `(code) => {
  var fn = new Function(code + '; return createScheduler;')();
  var results = [];

  var s1 = fn();
  var order = [];
  s1.addTask('low', 1, function() { order.push('low'); });
  s1.addTask('high', 10, function() { order.push('high'); });
  s1.addTask('mid', 5, function() { order.push('mid'); });
  var r1 = s1.run();
  results.push({ pass: JSON.stringify(order) === '["high","mid","low"]' && r1.completed.length === 3, description: 'Tasks run in priority order: high(10), mid(5), low(1)', got: JSON.stringify(order) });

  var s2 = fn();
  var order2 = [];
  s2.addTask('init', 10, function() { order2.push('init'); });
  s2.addTask('build', 5, function() { order2.push('build'); });
  s2.addTask('deploy', 1, function() { order2.push('deploy'); });
  s2.addDependency('build', 'init');
  s2.addDependency('deploy', 'build');
  var r2 = s2.run();
  results.push({ pass: JSON.stringify(order2) === '["init","build","deploy"]' && r2.completed.length === 3, description: 'Dependencies respected: init → build → deploy', got: JSON.stringify(order2) });

  var s3 = fn();
  s3.addTask('a', 5, function() { throw new Error('crash'); });
  s3.addTask('b', 3, function() {});
  s3.addTask('c', 1, function() {});
  s3.addDependency('c', 'a');
  var r3 = s3.run();
  results.push({ pass: r3.failed.length === 1 && r3.failed[0].name === 'a' && r3.failed[0].error === 'crash', description: 'Failed task recorded with name and error message', got: JSON.stringify(r3.failed) });

  results.push({ pass: r3.skipped.indexOf('c') !== -1 && r3.completed.indexOf('b') !== -1, description: 'Task c skipped (depends on failed a), task b still completes', got: 'completed=' + JSON.stringify(r3.completed) + ', skipped=' + JSON.stringify(r3.skipped) });

  var s4 = fn();
  s4.addTask('x', 1, function() {});
  s4.addTask('y', 10, function() {});
  s4.addDependency('y', 'x');
  var r4 = s4.run();
  results.push({ pass: r4.completed[0] === 'x' && r4.completed[1] === 'y', description: 'Higher-priority y defers to lower-priority x due to dependency', got: JSON.stringify(r4.completed) });

  var s5 = fn();
  var r5 = s5.run();
  results.push({ pass: r5.completed.length === 0 && r5.failed.length === 0 && r5.skipped.length === 0, description: 'Empty scheduler returns empty results', got: JSON.stringify(r5) });

  var s6 = fn();
  s6.addTask('solo', 5, function() {});
  var r6 = s6.run();
  results.push({ pass: r6.completed.length === 1 && r6.completed[0] === 'solo', description: 'Single task with no dependencies completes', got: JSON.stringify(r6) });

  var s7 = fn();
  s7.addTask('p1', 10, function() { throw new Error('fail1'); });
  s7.addTask('p2', 5, function() {});
  s7.addTask('p3', 1, function() {});
  s7.addDependency('p2', 'p1');
  s7.addDependency('p3', 'p2');
  var r7 = s7.run();
  results.push({ pass: r7.failed.length === 1 && r7.skipped.length === 2 && r7.completed.length === 0, description: 'Cascading failure: p1 fails → p2 skipped → p3 skipped', got: JSON.stringify(r7) });

  return results;
}`,
    hint1:
      'Sort tasks by priority descending. Process them in rounds: each round, check if a task\'s dependencies are all in the completed set — if so, run it. If a dependency is in the failed set, skip the task. Keep iterating until no more progress is made. Wrap each task\'s action in try/catch to handle failures.',
    hint2:
      'Keep completed/failed/skipped as arrays and use objects as sets for fast lookup. In each round, loop through remaining tasks: if all dependencies are completed, run it (try/catch); if any dependency failed, skip it; otherwise defer to the next round. When a round makes no progress, any remaining tasks are unresolvable and should be skipped.',
    resources: schedulerRes,
  },

  // 4. Data Pipeline Engine (strategy + middleware + wrangling)
  {
    id: 1385,
    title: 'Data Pipeline Engine',
    type: 'js',
    tier: 4,
    category: ['capstone', 'data-pipeline'],
    tags: ['pipeline', 'strategy', 'transform', 'filter', 'aggregate', 'capstone', 'data-wrangling'],
    description:
      'Create a function called `createPipeline` that returns a configurable data pipeline. The pipeline processes an array of records through a sequence of stages. It has these methods: `addStage(name, fn)` adds a named transformation stage where `fn(records)` takes an array and returns a new array; `removeStage(name)` removes a stage by name; `process(records)` runs all stages in order and returns `{ result: finalArray, log: [...] }` where `log` is an array of `{ stage, inputCount, outputCount }` entries showing how many records entered and left each stage. If a stage throws an error, catch it, record `{ stage, error: message }` in the log, and pass the records unchanged to the next stage. The pipeline should not modify the original records array.',
    starterCode: '',
    solution:
      'function createPipeline() {\n  var stages = [];\n  return {\n    addStage: function(name, fn) {\n      stages.push({ name: name, fn: fn });\n    },\n    removeStage: function(name) {\n      stages = stages.filter(function(s) { return s.name !== name; });\n    },\n    process: function(records) {\n      var current = records.slice();\n      var log = [];\n      for (var i = 0; i < stages.length; i++) {\n        var inputCount = current.length;\n        try {\n          var output = stages[i].fn(current);\n          log.push({ stage: stages[i].name, inputCount: inputCount, outputCount: output.length });\n          current = output;\n        } catch (err) {\n          log.push({ stage: stages[i].name, error: err.message });\n        }\n      }\n      return { result: current, log: log };\n    }\n  };\n}',
    testRunner: `(code) => {
  var fn = new Function(code + '; return createPipeline;')();
  var results = [];

  var p = fn();
  p.addStage('double', function(recs) { return recs.map(function(r) { return r * 2; }); });
  var r1 = p.process([1, 2, 3]);
  results.push({ pass: JSON.stringify(r1.result) === '[2,4,6]' && r1.log[0].stage === 'double' && r1.log[0].inputCount === 3 && r1.log[0].outputCount === 3, description: 'Single stage doubles [1,2,3] to [2,4,6] with correct log', got: JSON.stringify(r1) });

  p.addStage('filterBig', function(recs) { return recs.filter(function(r) { return r > 3; }); });
  var r2 = p.process([1, 2, 3]);
  results.push({ pass: JSON.stringify(r2.result) === '[4,6]' && r2.log.length === 2 && r2.log[1].inputCount === 3 && r2.log[1].outputCount === 2, description: 'Two stages: double then filter > 3: [4,6], log tracks counts', got: JSON.stringify(r2) });

  var p2 = fn();
  p2.addStage('ok', function(recs) { return recs; });
  p2.addStage('fail', function(recs) { throw new Error('broken'); });
  p2.addStage('after', function(recs) { return recs.map(function(r) { return r + 1; }); });
  var r3 = p2.process([1, 2]);
  results.push({ pass: r3.log[1].error === 'broken' && JSON.stringify(r3.result) === '[2,3]', description: 'Failed stage logs error, records pass unchanged to next stage', got: JSON.stringify(r3) });

  p.removeStage('double');
  var r4 = p.process([10, 2, 5]);
  results.push({ pass: JSON.stringify(r4.result) === '[10,5]' && r4.log.length === 1, description: 'removeStage("double") leaves only filterBig: [10,5]', got: JSON.stringify(r4) });

  var p3 = fn();
  var r5 = p3.process([1, 2, 3]);
  results.push({ pass: JSON.stringify(r5.result) === '[1,2,3]' && r5.log.length === 0, description: 'Empty pipeline returns records unchanged with empty log', got: JSON.stringify(r5) });

  var original = [{ v: 1 }, { v: 2 }];
  var p4 = fn();
  p4.addStage('extract', function(recs) { return recs.map(function(r) { return r.v; }); });
  p4.process(original);
  results.push({ pass: original[0].v === 1 && typeof original[0] === 'object', description: 'Original records array is not modified', got: JSON.stringify(original) });

  var p5 = fn();
  p5.addStage('filter', function(recs) { return recs.filter(function(r) { return r.active; }); });
  p5.addStage('transform', function(recs) { return recs.map(function(r) { return { name: r.name, upper: r.name.toUpperCase() }; }); });
  p5.addStage('sort', function(recs) { return recs.slice().sort(function(a, b) { return a.name.localeCompare(b.name); }); });
  var data = [{ name: 'Charlie', active: true }, { name: 'Alice', active: true }, { name: 'Bob', active: false }];
  var r7 = p5.process(data);
  results.push({ pass: r7.result.length === 2 && r7.result[0].name === 'Alice' && r7.result[1].upper === 'CHARLIE' && r7.log.length === 3, description: 'Complex pipeline: filter active → transform → sort alphabetically', got: JSON.stringify(r7.result) });

  results.push({ pass: r7.log[0].inputCount === 3 && r7.log[0].outputCount === 2 && r7.log[2].inputCount === 2, description: 'Log tracks record counts through all stages: 3→2→2→2', got: JSON.stringify(r7.log) });

  return results;
}`,
    hint1:
      'Store stages as an array of `{ name, fn }` objects. In `process`, copy the input array, then loop through stages: call each stage function with the current array, record input and output counts in the log. Wrap each call in try/catch — on error, log the error and skip to the next stage without changing the current array.',
    hint2:
      'Copy input with `records.slice()`. For each stage, save `current.length` as inputCount, try calling `stage.fn(current)`, log `{ stage: name, inputCount, outputCount }` on success and update current, or log `{ stage: name, error: message }` on failure. For `removeStage`, filter the stages array by name.',
    resources: pipelineRes,
  },

  // 5. Matrix Operations (algorithms + math)
  {
    id: 1386,
    title: 'Matrix Operations',
    type: 'js',
    tier: 4,
    category: ['capstone', 'matrix-operations'],
    tags: ['matrix', 'math', 'multiply', 'transpose', 'determinant', 'capstone', 'algorithm'],
    description:
      'Create an object called `Matrix` with these static methods: `multiply(a, b)` takes two 2D arrays (matrices) and returns their matrix product — the number of columns in `a` must equal the number of rows in `b`, otherwise throw `"Incompatible dimensions"`; `transpose(m)` returns the transpose (rows become columns); `determinant(m)` computes the determinant of a square matrix using cofactor expansion — for a 1x1 matrix return the single value, for 2x2 use `ad - bc`, for larger matrices expand along the first row recursively. Throw `"Not a square matrix"` if the matrix is not square. All operations should return new arrays without modifying the inputs.',
    starterCode: '',
    solution:
      'var Matrix = {\n  multiply: function(a, b) {\n    if (a[0].length !== b.length) throw new Error("Incompatible dimensions");\n    var result = [];\n    for (var i = 0; i < a.length; i++) {\n      result[i] = [];\n      for (var j = 0; j < b[0].length; j++) {\n        var sum = 0;\n        for (var k = 0; k < b.length; k++) {\n          sum += a[i][k] * b[k][j];\n        }\n        result[i][j] = sum;\n      }\n    }\n    return result;\n  },\n  transpose: function(m) {\n    var result = [];\n    for (var j = 0; j < m[0].length; j++) {\n      result[j] = [];\n      for (var i = 0; i < m.length; i++) {\n        result[j][i] = m[i][j];\n      }\n    }\n    return result;\n  },\n  determinant: function(m) {\n    if (m.length !== m[0].length) throw new Error("Not a square matrix");\n    var n = m.length;\n    if (n === 1) return m[0][0];\n    if (n === 2) return m[0][0] * m[1][1] - m[0][1] * m[1][0];\n    var det = 0;\n    for (var j = 0; j < n; j++) {\n      var sub = [];\n      for (var r = 1; r < n; r++) {\n        var row = [];\n        for (var c = 0; c < n; c++) {\n          if (c !== j) row.push(m[r][c]);\n        }\n        sub.push(row);\n      }\n      var sign = j % 2 === 0 ? 1 : -1;\n      det += sign * m[0][j] * Matrix.determinant(sub);\n    }\n    return det;\n  }\n};',
    testRunner: `(code) => {
  var ctx = new Function(code + '; return Matrix;')();
  var results = [];

  var r1 = ctx.multiply([[1, 2], [3, 4]], [[5, 6], [7, 8]]);
  results.push({ pass: JSON.stringify(r1) === '[[19,22],[43,50]]', description: 'Multiply 2x2 matrices: [[19,22],[43,50]]', got: JSON.stringify(r1) });

  var r2 = ctx.multiply([[1, 2, 3]], [[4], [5], [6]]);
  results.push({ pass: JSON.stringify(r2) === '[[32]]', description: 'Multiply 1x3 * 3x1 = [[32]]', got: JSON.stringify(r2) });

  var err = '';
  try { ctx.multiply([[1, 2]], [[3, 4]]); } catch (e) { err = e.message; }
  results.push({ pass: err === 'Incompatible dimensions', description: 'Multiply with incompatible dimensions throws error', got: err });

  var r4 = ctx.transpose([[1, 2, 3], [4, 5, 6]]);
  results.push({ pass: JSON.stringify(r4) === '[[1,4],[2,5],[3,6]]', description: 'Transpose 2x3 to 3x2: [[1,4],[2,5],[3,6]]', got: JSON.stringify(r4) });

  var r5 = ctx.determinant([[3, 8], [4, 6]]);
  results.push({ pass: r5 === -14, description: 'Determinant of 2x2 [[3,8],[4,6]] = -14', got: String(r5) });

  var r6 = ctx.determinant([[6, 1, 1], [4, -2, 5], [2, 8, 7]]);
  results.push({ pass: r6 === -306, description: 'Determinant of 3x3 = -306', got: String(r6) });

  var r7 = ctx.determinant([[5]]);
  results.push({ pass: r7 === 5, description: 'Determinant of 1x1 [[5]] = 5', got: String(r7) });

  var orig = [[1, 2], [3, 4]];
  ctx.transpose(orig);
  results.push({ pass: JSON.stringify(orig) === '[[1,2],[3,4]]', description: 'Original matrix not modified by transpose', got: JSON.stringify(orig) });

  return results;
}`,
    hint1:
      'For multiply, use three nested loops: row of A, column of B, and the shared dimension. For transpose, swap row and column indices. For determinant, handle 1x1 and 2x2 as base cases. For larger matrices, use cofactor expansion along the first row: for each column, build the submatrix by excluding row 0 and column j, then alternate signs and recurse.',
    hint2:
      'For `multiply`, result[i][j] = sum of a[i][k] * b[k][j] for all k. For `transpose`, result[j][i] = m[i][j]. For `determinant`, if n=1 return m[0][0], if n=2 return ad-bc. Otherwise loop j from 0 to n-1: build a submatrix by taking rows 1..n and all columns except j, compute `sign * m[0][j] * determinant(sub)` where sign alternates +1/-1.',
    resources: matrixRes,
  },

  // 6. Mini App Framework (router + middleware + store + observer)
  {
    id: 1387,
    title: 'Mini App Framework',
    type: 'js',
    tier: 4,
    category: ['capstone', 'framework'],
    tags: ['framework', 'router', 'middleware', 'state', 'observer', 'capstone', 'integration'],
    description:
      'Create a function called `createApp` that returns a mini application framework combining routing, middleware, and state management. The app has these methods: `use(middlewareFn)` registers a middleware that receives `(ctx, next)` and can modify the context before calling `next()`; `route(method, path, handler)` registers a route handler that receives the context; `setState(changes)` merges changes into the app\'s internal state; `getState()` returns a copy of the state; `handle(method, path)` creates a context object `{ method, path, state: currentState, body: null }`, runs it through all middleware, then dispatches to the matching route handler — the handler can set `ctx.body`. Return the final context. If no route matches, set `ctx.body` to `"Not Found"` and `ctx.status` to `404`. If a middleware or handler throws, set `ctx.body` to the error message and `ctx.status` to `500`.',
    starterCode: '',
    solution:
      'function createApp() {\n  var middlewares = [];\n  var routes = [];\n  var state = {};\n  return {\n    use: function(fn) { middlewares.push(fn); },\n    route: function(method, path, handler) {\n      routes.push({ method: method.toUpperCase(), path: path, handler: handler });\n    },\n    setState: function(changes) {\n      var keys = Object.keys(changes);\n      for (var i = 0; i < keys.length; i++) state[keys[i]] = changes[keys[i]];\n    },\n    getState: function() {\n      var copy = {};\n      var keys = Object.keys(state);\n      for (var i = 0; i < keys.length; i++) copy[keys[i]] = state[keys[i]];\n      return copy;\n    },\n    handle: function(method, path) {\n      var stateCopy = {};\n      var sk = Object.keys(state);\n      for (var i = 0; i < sk.length; i++) stateCopy[sk[i]] = state[sk[i]];\n      var ctx = { method: method.toUpperCase(), path: path, state: stateCopy, body: null, status: 200 };\n      try {\n        var mwIndex = 0;\n        function next() {\n          if (mwIndex < middlewares.length) {\n            var mw = middlewares[mwIndex]; mwIndex++;\n            mw(ctx, next);\n          }\n        }\n        next();\n        if (ctx.body === null) {\n          var matched = false;\n          for (var i = 0; i < routes.length; i++) {\n            if (routes[i].method === ctx.method && routes[i].path === ctx.path) {\n              routes[i].handler(ctx);\n              matched = true;\n              break;\n            }\n          }\n          if (!matched) {\n            ctx.status = 404;\n            ctx.body = "Not Found";\n          }\n        }\n      } catch (err) {\n        ctx.status = 500;\n        ctx.body = err.message;\n      }\n      return ctx;\n    }\n  };\n}',
    testRunner: `(code) => {
  var fn = new Function(code + '; return createApp;')();
  var results = [];

  var app = fn();
  app.route('GET', '/hello', function(ctx) { ctx.body = 'Hello World'; });
  var r1 = app.handle('GET', '/hello');
  results.push({ pass: r1.body === 'Hello World' && r1.status === 200, description: 'Basic route: GET /hello returns "Hello World" with status 200', got: JSON.stringify({ body: r1.body, status: r1.status }) });

  var r2 = app.handle('GET', '/missing');
  results.push({ pass: r2.body === 'Not Found' && r2.status === 404, description: 'Unmatched route returns "Not Found" with status 404', got: JSON.stringify({ body: r2.body, status: r2.status }) });

  app.use(function(ctx, next) { ctx.timestamp = 12345; next(); });
  var r3 = app.handle('GET', '/hello');
  results.push({ pass: r3.timestamp === 12345 && r3.body === 'Hello World', description: 'Middleware adds timestamp before route handler runs', got: 'ts=' + r3.timestamp + ', body=' + r3.body });

  app.setState({ user: 'Alice' });
  app.route('GET', '/user', function(ctx) { ctx.body = ctx.state.user; });
  var r4 = app.handle('GET', '/user');
  results.push({ pass: r4.body === 'Alice' && r4.state.user === 'Alice', description: 'State available in context: GET /user returns "Alice"', got: 'body=' + r4.body });

  var app2 = fn();
  app2.use(function(ctx, next) {
    if (!ctx.state.auth) { ctx.status = 401; ctx.body = 'Unauthorized'; return; }
    next();
  });
  app2.route('GET', '/secret', function(ctx) { ctx.body = 'Top Secret'; });
  var r5a = app2.handle('GET', '/secret');
  app2.setState({ auth: true });
  var r5b = app2.handle('GET', '/secret');
  results.push({ pass: r5a.status === 401 && r5a.body === 'Unauthorized' && r5b.body === 'Top Secret', description: 'Auth middleware blocks without state (401), allows with state', got: 'noAuth=' + r5a.status + ', auth=' + r5b.body });

  var app3 = fn();
  app3.route('GET', '/error', function(ctx) { throw new Error('server crash'); });
  var r6 = app3.handle('GET', '/error');
  results.push({ pass: r6.status === 500 && r6.body === 'server crash', description: 'Handler error caught: status 500, body is error message', got: JSON.stringify({ status: r6.status, body: r6.body }) });

  var app4 = fn();
  var mwOrder = [];
  app4.use(function(ctx, next) { mwOrder.push('first'); next(); });
  app4.use(function(ctx, next) { mwOrder.push('second'); next(); });
  app4.route('GET', '/test', function(ctx) { mwOrder.push('handler'); ctx.body = 'ok'; });
  app4.handle('GET', '/test');
  results.push({ pass: JSON.stringify(mwOrder) === '["first","second","handler"]', description: 'Middleware runs in order, then handler: first→second→handler', got: JSON.stringify(mwOrder) });

  results.push({ pass: r1.method === 'GET' && r1.path === '/hello', description: 'Context includes method and path properties', got: 'method=' + r1.method + ', path=' + r1.path });

  return results;
}`,
    hint1:
      'Combine the patterns from earlier sections: a middleware pipeline (use + next chain), a simple router (method + path matching), and a state store (get/setState). The `handle` method ties them together: create a context, run middleware, dispatch to matching route, and handle errors with try/catch.',
    hint2:
      'In `handle`, build `ctx = { method, path, state: copy, body: null, status: 200 }`. Run middleware using the next() pattern from the middleware pipeline exercise. After middleware, loop through routes to find a match. If found, call the handler. If not, set 404. Wrap everything in try/catch for 500 errors. Return the final context.',
    resources: frameworkRes,
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
    `T4 Capstone Projects — Section 10: ${exercises.length} exercises (IDs ${exercises[0].id}-${exercises[exercises.length - 1].id})`
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
