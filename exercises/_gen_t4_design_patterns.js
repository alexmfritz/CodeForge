#!/usr/bin/env node
/**
 * Generator: T4 Design Patterns — Section 8 (5 exercises, IDs 1373-1377)
 *
 * Covers: Singleton, Observer/EventEmitter, Strategy, Decorator, Mixin
 *
 * T4 convention: description-only, NO starterCode. Student writes everything
 * from scratch including class/function declarations. Description tells them
 * the class/function name and expected behavior.
 *
 * Usage:
 *   node exercises/_gen_t4_design_patterns.js            # Append to curriculum
 *   node exercises/_gen_t4_design_patterns.js --validate  # Validate testRunners only
 */

const fs = require('fs');
const path = require('path');

const CURRICULUM_PATH = path.join(
  __dirname,
  'collections',
  'default-curriculum.json'
);

// ─── Resources (MDN only for T4) ────────────────────────────────────────────

const singletonRes = [
  { label: 'MDN: Closures', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures', description: 'Closures reference' },
  { label: 'MDN: Object', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object', description: 'Object reference' },
];
const observerRes = [
  { label: 'MDN: Array.prototype.filter', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter', description: 'Array filter reference' },
  { label: 'MDN: Functions', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions', description: 'Functions guide' },
];
const strategyRes = [
  { label: 'MDN: Object', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object', description: 'Object reference' },
  { label: 'MDN: Functions', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions', description: 'Functions guide' },
];
const decoratorRes = [
  { label: 'MDN: Closures', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures', description: 'Closures reference' },
  { label: 'MDN: Function.prototype.apply', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/apply', description: 'Function apply reference' },
];
const mixinRes = [
  { label: 'MDN: Object.assign', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign', description: 'Object.assign reference' },
  { label: 'MDN: Classes', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes', description: 'Classes reference' },
];

// ─── Exercise Definitions ───────────────────────────────────────────────────

const exercises = [

  // ══════════════════════════════════════════════════════════════════════════
  // T4 Section 8: Design Patterns (5 exercises, IDs 1373-1377)
  // ══════════════════════════════════════════════════════════════════════════

  // 1. Singleton
  {
    id: 1373,
    title: 'Singleton Pattern',
    type: 'js',
    tier: 4,
    category: ['design-patterns', 'singleton'],
    tags: ['singleton', 'closure', 'instance', 'encapsulation', 'design-pattern'],
    description:
      'Create a function called `createConfigManager` that returns a config manager object. The manager must be a singleton — every call to `createConfigManager()` must return the exact same object reference. The manager has these methods: `get(key)` returns the value for a key or `undefined` if not set; `set(key, value)` stores a key-value pair; `getAll()` returns a shallow copy of all stored config as a plain object; `reset()` clears all stored config. Use a closure to store the single instance and the config data privately.',
    starterCode: '',
    solution:
      'var createConfigManager = (function() {\n  var instance = null;\n  var config = {};\n  return function createConfigManager() {\n    if (instance) return instance;\n    instance = {\n      get: function(key) { return config[key]; },\n      set: function(key, value) { config[key] = value; },\n      getAll: function() { return Object.assign({}, config); },\n      reset: function() { config = {}; }\n    };\n    return instance;\n  };\n})();',
    testRunner: `(code) => {
  var fn = new Function(code + '; return createConfigManager;')();
  var results = [];

  var mgr1 = fn();
  var mgr2 = fn();
  results.push({ pass: mgr1 === mgr2, description: 'Two calls return the exact same object reference (singleton)', got: 'same=' + (mgr1 === mgr2) });

  mgr1.set('host', 'localhost');
  mgr1.set('port', 3000);
  results.push({ pass: mgr1.get('host') === 'localhost' && mgr1.get('port') === 3000, description: 'set and get store/retrieve "host"="localhost" and "port"=3000', got: 'host=' + mgr1.get('host') + ', port=' + mgr1.get('port') });

  results.push({ pass: mgr2.get('host') === 'localhost', description: 'Second reference sees data set by first (shared state)', got: 'mgr2.host=' + mgr2.get('host') });

  results.push({ pass: mgr1.get('missing') === undefined, description: 'get returns undefined for non-existent key', got: String(mgr1.get('missing')) });

  var all = mgr1.getAll();
  results.push({ pass: all.host === 'localhost' && all.port === 3000 && typeof all === 'object', description: 'getAll returns object with all config entries', got: JSON.stringify(all) });

  all.host = 'changed';
  results.push({ pass: mgr1.get('host') === 'localhost', description: 'getAll returns a copy — mutating it does not affect internal config', got: 'host=' + mgr1.get('host') });

  mgr1.reset();
  results.push({ pass: mgr1.get('host') === undefined && JSON.stringify(mgr1.getAll()) === '{}', description: 'reset clears all config', got: JSON.stringify(mgr1.getAll()) });

  mgr1.set('env', 'production');
  var mgr3 = fn();
  results.push({ pass: mgr3 === mgr1 && mgr3.get('env') === 'production', description: 'Third call still returns same singleton with current state', got: 'same=' + (mgr3 === mgr1) + ', env=' + mgr3.get('env') });

  return results;
}`,
    hint1:
      'Wrap the entire function in an IIFE (Immediately Invoked Function Expression) that keeps a private `instance` variable. Each time the outer function is called, check if `instance` already exists — if so, return it. If not, create the manager object, store it in `instance`, and return it.',
    hint2:
      'Use the pattern `var createConfigManager = (function() { var instance = null; var config = {}; return function() { if (instance) return instance; instance = { get, set, getAll, reset }; return instance; }; })();`. The closure ensures `instance` and `config` are private and shared across all calls.',
    resources: singletonRes,
  },

  // 2. Observer / EventEmitter
  {
    id: 1374,
    title: 'Observer Pattern',
    type: 'js',
    tier: 4,
    category: ['design-patterns', 'observer'],
    tags: ['observer', 'event-emitter', 'pub-sub', 'subscribe', 'callback', 'design-pattern'],
    description:
      'Create a function called `createEventEmitter` that returns an event emitter object. The emitter has these methods: `on(event, callback)` registers a callback for the named event (the same callback should not be registered twice for the same event); `off(event, callback)` removes a specific callback from the event; `emit(event, ...args)` calls all registered callbacks for the event, passing the extra arguments to each one; `listenerCount(event)` returns the number of callbacks registered for the event (0 if no listeners). Callbacks should fire in the order they were registered.',
    starterCode: '',
    solution:
      'function createEventEmitter() {\n  var listeners = {};\n  return {\n    on: function(event, callback) {\n      if (!listeners[event]) listeners[event] = [];\n      if (listeners[event].indexOf(callback) === -1) {\n        listeners[event].push(callback);\n      }\n    },\n    off: function(event, callback) {\n      if (!listeners[event]) return;\n      listeners[event] = listeners[event].filter(function(cb) { return cb !== callback; });\n    },\n    emit: function(event) {\n      if (!listeners[event]) return;\n      var args = Array.prototype.slice.call(arguments, 1);\n      listeners[event].forEach(function(cb) { cb.apply(null, args); });\n    },\n    listenerCount: function(event) {\n      return listeners[event] ? listeners[event].length : 0;\n    }\n  };\n}',
    testRunner: `(code) => {
  var fn = new Function(code + '; return createEventEmitter;')();
  var results = [];

  var emitter = fn();
  var received = [];
  var handler = function(data) { received.push(data); };
  emitter.on('message', handler);
  emitter.emit('message', 'hello');
  results.push({ pass: received.length === 1 && received[0] === 'hello', description: 'Single listener receives emitted data "hello"', got: JSON.stringify(received) });

  var received2 = [];
  var handler2 = function(data) { received2.push(data.toUpperCase()); };
  emitter.on('message', handler2);
  emitter.emit('message', 'world');
  results.push({ pass: received.length === 2 && received[1] === 'world' && received2.length === 1 && received2[0] === 'WORLD', description: 'Two listeners both fire on emit, in registration order', got: 'h1=' + JSON.stringify(received) + ', h2=' + JSON.stringify(received2) });

  emitter.off('message', handler);
  emitter.emit('message', 'after');
  results.push({ pass: received.length === 2 && received2.length === 2, description: 'off removes first handler; only second fires after emit', got: 'h1.len=' + received.length + ', h2.len=' + received2.length });

  results.push({ pass: emitter.listenerCount('message') === 1 && emitter.listenerCount('other') === 0, description: 'listenerCount returns 1 for "message", 0 for "other"', got: 'message=' + emitter.listenerCount('message') + ', other=' + emitter.listenerCount('other') });

  var args = [];
  emitter.on('multi', function(a, b, c) { args.push([a, b, c]); });
  emitter.emit('multi', 1, 2, 3);
  results.push({ pass: JSON.stringify(args) === '[[1,2,3]]', description: 'emit passes multiple arguments to callback', got: JSON.stringify(args) });

  emitter.on('message', handler2);
  results.push({ pass: emitter.listenerCount('message') === 1, description: 'Duplicate registration is ignored (same callback not added twice)', got: 'count=' + emitter.listenerCount('message') });

  var e2 = fn();
  e2.on('click', function() {});
  results.push({ pass: emitter.listenerCount('click') === 0 && e2.listenerCount('click') === 1, description: 'Different emitter instances are independent', got: 'e1.click=' + emitter.listenerCount('click') + ', e2.click=' + e2.listenerCount('click') });

  emitter.emit('nonexistent', 'data');
  results.push({ pass: true, description: 'Emitting event with no listeners does not throw', got: 'no error' });

  return results;
}`,
    hint1:
      'Store listeners as an object where each key is an event name and each value is an array of callback functions. For `on`, push the callback into the array for that event. For `emit`, loop through the array and call each callback with the provided arguments. For `off`, filter out the matching callback.',
    hint2:
      'Use `var listeners = {}`. For `on`, create the array if it does not exist, then check `indexOf` before pushing to prevent duplicates. For `emit`, use `Array.prototype.slice.call(arguments, 1)` to capture extra arguments, then use `forEach` to call each callback with `apply`. For `off`, use `filter` to remove the matching callback reference.',
    resources: observerRes,
  },

  // 3. Strategy Pattern
  {
    id: 1375,
    title: 'Strategy Pattern',
    type: 'js',
    tier: 4,
    category: ['design-patterns', 'strategy'],
    tags: ['strategy', 'polymorphism', 'algorithm-selection', 'interface', 'design-pattern'],
    description:
      'Create a `Validator` class that accepts a validation strategy and validates data using it. The constructor takes a strategy object that must have a `validate(data)` method. The `Validator` has these methods: `setStrategy(strategy)` changes the current strategy; `validate(data)` delegates to the current strategy\'s `validate` method and returns its result; `validateBatch(items)` validates an array of items and returns `{ valid: [...], invalid: [...] }` where each entry is `{ item, result }` (result is whatever the strategy returns). Also create three strategy objects: `emailStrategy` with a `validate(str)` method that returns `{ valid: true/false, message: "..." }` (valid if the string contains `@` and `.` after the `@`); `numberRangeStrategy` with a `validate(obj)` method where `obj` has `value`, `min`, `max` and returns valid if value is within range; `passwordStrategy` with a `validate(str)` method that returns valid if the string is at least 8 characters and contains both a letter and a digit.',
    starterCode: '',
    solution:
      'class Validator {\n  constructor(strategy) {\n    this.strategy = strategy;\n  }\n  setStrategy(strategy) {\n    this.strategy = strategy;\n  }\n  validate(data) {\n    return this.strategy.validate(data);\n  }\n  validateBatch(items) {\n    var valid = [];\n    var invalid = [];\n    for (var i = 0; i < items.length; i++) {\n      var result = this.strategy.validate(items[i]);\n      if (result.valid) {\n        valid.push({ item: items[i], result: result });\n      } else {\n        invalid.push({ item: items[i], result: result });\n      }\n    }\n    return { valid: valid, invalid: invalid };\n  }\n}\n\nvar emailStrategy = {\n  validate: function(str) {\n    var atIndex = str.indexOf("@");\n    if (atIndex === -1) return { valid: false, message: "Missing @" };\n    var afterAt = str.slice(atIndex + 1);\n    if (afterAt.indexOf(".") === -1) return { valid: false, message: "Missing . after @" };\n    return { valid: true, message: "Valid email" };\n  }\n};\n\nvar numberRangeStrategy = {\n  validate: function(obj) {\n    if (typeof obj.value !== "number") return { valid: false, message: "Value must be a number" };\n    if (obj.value < obj.min || obj.value > obj.max) return { valid: false, message: "Out of range" };\n    return { valid: true, message: "In range" };\n  }\n};\n\nvar passwordStrategy = {\n  validate: function(str) {\n    if (str.length < 8) return { valid: false, message: "Too short" };\n    if (!/[a-zA-Z]/.test(str)) return { valid: false, message: "Must contain a letter" };\n    if (!/[0-9]/.test(str)) return { valid: false, message: "Must contain a digit" };\n    return { valid: true, message: "Valid password" };\n  }\n};',
    testRunner: `(code) => {
  var ctx = new Function(code + '; return { Validator: Validator, emailStrategy: emailStrategy, numberRangeStrategy: numberRangeStrategy, passwordStrategy: passwordStrategy };')();
  var V = ctx.Validator;
  var email = ctx.emailStrategy;
  var range = ctx.numberRangeStrategy;
  var pw = ctx.passwordStrategy;
  var results = [];

  var v = new V(email);
  var r1 = v.validate('user@example.com');
  results.push({ pass: r1.valid === true, description: 'emailStrategy validates "user@example.com" as valid', got: JSON.stringify(r1) });

  var r2 = v.validate('invalid-email');
  results.push({ pass: r2.valid === false, description: 'emailStrategy rejects "invalid-email"', got: JSON.stringify(r2) });

  v.setStrategy(range);
  var r3 = v.validate({ value: 5, min: 1, max: 10 });
  results.push({ pass: r3.valid === true, description: 'numberRangeStrategy validates 5 in range [1,10]', got: JSON.stringify(r3) });

  var r4 = v.validate({ value: 15, min: 1, max: 10 });
  results.push({ pass: r4.valid === false, description: 'numberRangeStrategy rejects 15 outside range [1,10]', got: JSON.stringify(r4) });

  v.setStrategy(pw);
  var r5 = v.validate('Secure1Pass');
  results.push({ pass: r5.valid === true, description: 'passwordStrategy validates "Secure1Pass" (letters+digit, 8+ chars)', got: JSON.stringify(r5) });

  var r6 = v.validate('short1');
  results.push({ pass: r6.valid === false, description: 'passwordStrategy rejects "short1" (less than 8 chars)', got: JSON.stringify(r6) });

  v.setStrategy(email);
  var batch = v.validateBatch(['a@b.com', 'bad', 'x@y.co']);
  results.push({ pass: batch.valid.length === 2 && batch.invalid.length === 1 && batch.invalid[0].item === 'bad', description: 'validateBatch splits 3 emails: 2 valid, 1 invalid', got: 'valid=' + batch.valid.length + ', invalid=' + batch.invalid.length });

  var r8 = v.validate('user@domain');
  results.push({ pass: r8.valid === false, description: 'emailStrategy rejects "user@domain" (no . after @)', got: JSON.stringify(r8) });

  return results;
}`,
    hint1:
      'The Validator class stores a strategy object and delegates all validation to it. Each strategy is a plain object with a `validate` method that returns `{ valid: boolean, message: string }`. The Validator does not need to know how validation works — it just calls the strategy\'s method. This makes it easy to swap behaviors at runtime.',
    hint2:
      'Store `this.strategy` in the constructor. `validate(data)` simply returns `this.strategy.validate(data)`. `setStrategy(s)` replaces `this.strategy`. For `validateBatch`, loop through items, call validate on each, and sort results into `valid` and `invalid` arrays based on the `valid` property of the result.',
    resources: strategyRes,
  },

  // 4. Decorator Pattern
  {
    id: 1376,
    title: 'Decorator Pattern',
    type: 'js',
    tier: 4,
    category: ['design-patterns', 'decorator'],
    tags: ['decorator', 'higher-order-function', 'wrapper', 'memoize', 'logging', 'design-pattern'],
    description:
      'Create two decorator functions that wrap other functions with additional behavior without modifying the original. First, create `withLogging(fn)` that returns a new function which calls `fn` with the same arguments and returns its result, but also records each call. The wrapper should have a `calls` property (an array) where each entry is `{ args: [...], result: value }`. Second, create `withMemoization(fn)` that returns a new function which caches results based on the `JSON.stringify` of the arguments. If the same arguments are passed again, return the cached result without calling `fn`. The wrapper should have a `cache` property (a plain object) mapping stringified args to results.',
    starterCode: '',
    solution:
      'function withLogging(fn) {\n  var wrapper = function() {\n    var args = Array.prototype.slice.call(arguments);\n    var result = fn.apply(null, args);\n    wrapper.calls.push({ args: args, result: result });\n    return result;\n  };\n  wrapper.calls = [];\n  return wrapper;\n}\n\nfunction withMemoization(fn) {\n  var wrapper = function() {\n    var args = Array.prototype.slice.call(arguments);\n    var key = JSON.stringify(args);\n    if (wrapper.cache.hasOwnProperty(key)) {\n      return wrapper.cache[key];\n    }\n    var result = fn.apply(null, args);\n    wrapper.cache[key] = result;\n    return result;\n  };\n  wrapper.cache = {};\n  return wrapper;\n}',
    testRunner: `(code) => {
  var ctx = new Function(code + '; return { withLogging: withLogging, withMemoization: withMemoization };')();
  var wl = ctx.withLogging;
  var wm = ctx.withMemoization;
  var results = [];

  var add = function(a, b) { return a + b; };
  var logged = wl(add);
  var r1 = logged(2, 3);
  results.push({ pass: r1 === 5 && logged.calls.length === 1 && logged.calls[0].result === 5, description: 'withLogging returns result (5) and records call with args and result', got: 'r=' + r1 + ', calls=' + JSON.stringify(logged.calls) });

  logged(10, 20);
  logged(1, 1);
  results.push({ pass: logged.calls.length === 3 && JSON.stringify(logged.calls[1].args) === '[10,20]', description: 'withLogging records all 3 calls with correct args', got: 'len=' + logged.calls.length + ', call2args=' + JSON.stringify(logged.calls[1].args) });

  var originalCalls = 0;
  var expensive = function(n) { originalCalls++; return n * n; };
  var memo = wm(expensive);
  var m1 = memo(5);
  var m2 = memo(5);
  results.push({ pass: m1 === 25 && m2 === 25 && originalCalls === 1, description: 'withMemoization caches: fn called once for memo(5) despite 2 calls', got: 'r1=' + m1 + ', r2=' + m2 + ', fnCalls=' + originalCalls });

  var m3 = memo(3);
  results.push({ pass: m3 === 9 && originalCalls === 2, description: 'Different args (3) calls fn again, result is 9', got: 'r=' + m3 + ', fnCalls=' + originalCalls });

  results.push({ pass: memo.cache['[5]'] === 25 && memo.cache['[3]'] === 9, description: 'cache property contains stringified args as keys', got: JSON.stringify(memo.cache) });

  var greet = function(name, greeting) { return greeting + ', ' + name + '!'; };
  var loggedGreet = wl(greet);
  loggedGreet('Alice', 'Hello');
  results.push({ pass: loggedGreet.calls[0].result === 'Hello, Alice!' && JSON.stringify(loggedGreet.calls[0].args) === '["Alice","Hello"]', description: 'withLogging works with string args and captures both args and result', got: JSON.stringify(loggedGreet.calls[0]) });

  var memoGreet = wm(greet);
  var g1 = memoGreet('Bob', 'Hi');
  var g2 = memoGreet('Bob', 'Hi');
  results.push({ pass: g1 === 'Hi, Bob!' && g2 === 'Hi, Bob!' && Object.keys(memoGreet.cache).length === 1, description: 'withMemoization works with multiple string args', got: 'g1=' + g1 + ', cacheSize=' + Object.keys(memoGreet.cache).length });

  var origAdd = add;
  wl(add);
  results.push({ pass: add === origAdd && add(1, 2) === 3, description: 'Original function is not modified by decorators', got: 'unchanged=' + (add === origAdd) });

  return results;
}`,
    hint1:
      'A decorator is a function that takes a function and returns a new function that adds behavior around the original call. For logging, call the original function, store the args and result in an array on the wrapper, then return the result. For memoization, check a cache object before calling the original — if the result exists, return it; otherwise call the original, store the result, and return it.',
    hint2:
      'For `withLogging`, create a wrapper function. Inside it, convert arguments to an array, call `fn.apply(null, args)`, push `{ args, result }` to `wrapper.calls`, and return the result. Set `wrapper.calls = []` before returning the wrapper. For `withMemoization`, use `JSON.stringify(args)` as the cache key. Check `wrapper.cache.hasOwnProperty(key)` before calling `fn`.',
    resources: decoratorRes,
  },

  // 5. Mixin Pattern
  {
    id: 1377,
    title: 'Mixin Pattern',
    type: 'js',
    tier: 4,
    category: ['design-patterns', 'mixin'],
    tags: ['mixin', 'composition', 'prototype', 'behavior', 'reuse', 'design-pattern'],
    description:
      'Create a function called `applyMixins` that takes a target class and any number of mixin objects, and copies all methods from each mixin onto the target class\'s prototype. Existing methods on the prototype should not be overwritten. Also create three mixin objects: `timestampMixin` with a `getTimestamp()` method that returns the current millisecond timestamp; `serializeMixin` with a `serialize()` method that returns a JSON string of the instance\'s own enumerable properties, and a `toObject()` method that returns a shallow copy of the instance\'s own properties as a plain object; `validationMixin` with a `validate(rules)` method that takes an object where each key is a property name and each value is a validation function — it returns `{ valid: true/false, errors: [...] }` where errors is an array of key names that failed validation.',
    starterCode: '',
    solution:
      'function applyMixins(Target) {\n  for (var i = 1; i < arguments.length; i++) {\n    var mixin = arguments[i];\n    var keys = Object.keys(mixin);\n    for (var j = 0; j < keys.length; j++) {\n      if (!Target.prototype[keys[j]]) {\n        Target.prototype[keys[j]] = mixin[keys[j]];\n      }\n    }\n  }\n}\n\nvar timestampMixin = {\n  getTimestamp: function() {\n    return Date.now();\n  }\n};\n\nvar serializeMixin = {\n  serialize: function() {\n    var obj = {};\n    var keys = Object.keys(this);\n    for (var i = 0; i < keys.length; i++) {\n      obj[keys[i]] = this[keys[i]];\n    }\n    return JSON.stringify(obj);\n  },\n  toObject: function() {\n    var obj = {};\n    var keys = Object.keys(this);\n    for (var i = 0; i < keys.length; i++) {\n      obj[keys[i]] = this[keys[i]];\n    }\n    return obj;\n  }\n};\n\nvar validationMixin = {\n  validate: function(rules) {\n    var errors = [];\n    var keys = Object.keys(rules);\n    for (var i = 0; i < keys.length; i++) {\n      if (!rules[keys[i]](this[keys[i]])) {\n        errors.push(keys[i]);\n      }\n    }\n    return { valid: errors.length === 0, errors: errors };\n  }\n};',
    testRunner: `(code) => {
  var ctx = new Function(code + '; return { applyMixins: applyMixins, timestampMixin: timestampMixin, serializeMixin: serializeMixin, validationMixin: validationMixin };')();
  var applyMixins = ctx.applyMixins;
  var ts = ctx.timestampMixin;
  var ser = ctx.serializeMixin;
  var val = ctx.validationMixin;
  var results = [];

  function User(name, age) { this.name = name; this.age = age; }
  User.prototype.greet = function() { return 'Hi, ' + this.name; };
  applyMixins(User, ts, ser, val);

  var u = new User('Alice', 25);
  var t1 = u.getTimestamp();
  results.push({ pass: typeof t1 === 'number' && t1 > 0, description: 'timestampMixin: getTimestamp returns a positive number', got: String(t1) });

  var json = u.serialize();
  var parsed = JSON.parse(json);
  results.push({ pass: parsed.name === 'Alice' && parsed.age === 25, description: 'serializeMixin: serialize returns JSON with name and age', got: json });

  var obj = u.toObject();
  obj.name = 'Changed';
  results.push({ pass: u.name === 'Alice' && obj.name === 'Changed', description: 'serializeMixin: toObject returns a shallow copy (mutating copy does not affect original)', got: 'u.name=' + u.name + ', obj.name=' + obj.name });

  var v1 = u.validate({ name: function(v) { return typeof v === 'string' && v.length > 0; }, age: function(v) { return typeof v === 'number' && v >= 18; } });
  results.push({ pass: v1.valid === true && v1.errors.length === 0, description: 'validationMixin: valid user passes all rules', got: JSON.stringify(v1) });

  var u2 = new User('', -1);
  var v2 = u2.validate({ name: function(v) { return typeof v === 'string' && v.length > 0; }, age: function(v) { return v >= 0; } });
  results.push({ pass: v2.valid === false && v2.errors.indexOf('name') !== -1 && v2.errors.indexOf('age') !== -1, description: 'validationMixin: empty name and negative age both fail', got: JSON.stringify(v2) });

  results.push({ pass: u.greet() === 'Hi, Alice', description: 'applyMixins does not overwrite existing prototype methods (greet still works)', got: u.greet() });

  function Product(title) { this.title = title; }
  Product.prototype.serialize = function() { return 'custom'; };
  applyMixins(Product, ser);
  var p = new Product('Widget');
  results.push({ pass: p.serialize() === 'custom', description: 'applyMixins skips methods that already exist on prototype', got: p.serialize() });

  results.push({ pass: typeof p.toObject === 'function' && p.toObject().title === 'Widget', description: 'Non-conflicting mixin methods (toObject) are still applied', got: JSON.stringify(p.toObject()) });

  return results;
}`,
    hint1:
      'Loop through each mixin argument. For each mixin, iterate over its keys and copy the methods onto the target class\'s prototype — but only if that key does not already exist on the prototype. This preserves existing methods while adding new behaviors from multiple sources.',
    hint2:
      'Use `arguments` to access the variable number of mixins. For each mixin, get its keys with `Object.keys(mixin)` and for each key, check `if (!Target.prototype[key])` before assigning `Target.prototype[key] = mixin[key]`. The mixin methods use `this` to access instance properties, which works because they run in the context of the instance when called.',
    resources: mixinRes,
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
    `T4 Design Patterns — Section 8: ${exercises.length} exercises (IDs ${exercises[0].id}-${exercises[exercises.length - 1].id})`
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
