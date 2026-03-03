#!/usr/bin/env node
/**
 * Generator: T4 Server Concepts — Section 9 (4 exercises, IDs 1378-1381)
 *
 * Covers: Router with path params, Middleware pipeline, REST API simulation,
 *         In-memory database with schema validation
 *
 * All exercises are pure JavaScript — no Node.js, Express, or HTTP modules.
 * They simulate server-side patterns using functions and objects.
 *
 * T4 convention: description-only, NO starterCode. Student writes everything
 * from scratch including function/class declarations.
 *
 * Usage:
 *   node exercises/_gen_t4_server_concepts.js            # Append to curriculum
 *   node exercises/_gen_t4_server_concepts.js --validate  # Validate testRunners only
 */

const fs = require('fs');
const path = require('path');

const CURRICULUM_PATH = path.join(
  __dirname,
  'collections',
  'default-curriculum.json'
);

// ─── Resources (MDN only for T4) ────────────────────────────────────────────

const routerRes = [
  { label: 'MDN: String.prototype.split', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split', description: 'String split reference' },
  { label: 'MDN: Array.prototype.every', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every', description: 'Array every reference' },
];
const middlewareRes = [
  { label: 'MDN: Array.prototype.push', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/push', description: 'Array push reference' },
  { label: 'MDN: Functions', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions', description: 'Functions guide' },
];
const restRes = [
  { label: 'MDN: Object', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object', description: 'Object reference' },
  { label: 'MDN: Array.prototype.findIndex', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex', description: 'Array findIndex reference' },
];
const dbRes = [
  { label: 'MDN: Object.keys', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys', description: 'Object.keys reference' },
  { label: 'MDN: Array.prototype.filter', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter', description: 'Array filter reference' },
];

// ─── Exercise Definitions ───────────────────────────────────────────────────

const exercises = [

  // ══════════════════════════════════════════════════════════════════════════
  // T4 Section 9: Server Concepts (4 exercises, IDs 1378-1381)
  // ══════════════════════════════════════════════════════════════════════════

  // 1. Router with Path Parameters
  {
    id: 1378,
    title: 'Router with Path Parameters',
    type: 'js',
    tier: 4,
    category: ['server-concepts', 'routing'],
    tags: ['router', 'path-params', 'url-matching', 'dispatch', 'server'],
    description:
      'Create a function called `createRouter` that returns a router object. The router has these methods: `addRoute(method, pattern, handler)` registers a handler for a given HTTP method and URL pattern — patterns can include named parameters prefixed with `:` (e.g., `"/users/:id"`); `dispatch(method, path)` finds the matching route and calls its handler with an object of extracted parameters, returning the handler\'s result. If no route matches, return `{ status: 404, body: "Not Found" }`. Routes must match the HTTP method exactly (case-insensitive) and the path segments. For example, the pattern `"/users/:id/posts/:postId"` should match the path `"/users/42/posts/7"` and extract `{ id: "42", postId: "7" }`.',
    starterCode: '',
    solution:
      'function createRouter() {\n  var routes = [];\n  return {\n    addRoute: function(method, pattern, handler) {\n      var parts = pattern.split("/").filter(function(p) { return p !== ""; });\n      routes.push({ method: method.toUpperCase(), parts: parts, handler: handler });\n    },\n    dispatch: function(method, path) {\n      var pathParts = path.split("/").filter(function(p) { return p !== ""; });\n      var upperMethod = method.toUpperCase();\n      for (var i = 0; i < routes.length; i++) {\n        var route = routes[i];\n        if (route.method !== upperMethod) continue;\n        if (route.parts.length !== pathParts.length) continue;\n        var params = {};\n        var match = true;\n        for (var j = 0; j < route.parts.length; j++) {\n          if (route.parts[j][0] === ":") {\n            params[route.parts[j].slice(1)] = pathParts[j];\n          } else if (route.parts[j] !== pathParts[j]) {\n            match = false;\n            break;\n          }\n        }\n        if (match) return route.handler(params);\n      }\n      return { status: 404, body: "Not Found" };\n    }\n  };\n}',
    testRunner: `(code) => {
  var fn = new Function(code + '; return createRouter;')();
  var results = [];

  var router = fn();
  router.addRoute('GET', '/users', function() { return { status: 200, body: 'all users' }; });
  router.addRoute('GET', '/users/:id', function(p) { return { status: 200, body: 'user ' + p.id }; });
  router.addRoute('POST', '/users', function() { return { status: 201, body: 'created' }; });

  var r1 = router.dispatch('GET', '/users');
  results.push({ pass: r1.status === 200 && r1.body === 'all users', description: 'GET /users matches static route', got: JSON.stringify(r1) });

  var r2 = router.dispatch('GET', '/users/42');
  results.push({ pass: r2.status === 200 && r2.body === 'user 42', description: 'GET /users/42 extracts param id="42"', got: JSON.stringify(r2) });

  var r3 = router.dispatch('POST', '/users');
  results.push({ pass: r3.status === 201 && r3.body === 'created', description: 'POST /users matches correct method', got: JSON.stringify(r3) });

  var r4 = router.dispatch('DELETE', '/users');
  results.push({ pass: r4.status === 404 && r4.body === 'Not Found', description: 'DELETE /users returns 404 (no DELETE route)', got: JSON.stringify(r4) });

  var r5 = router.dispatch('GET', '/unknown');
  results.push({ pass: r5.status === 404, description: 'GET /unknown returns 404', got: JSON.stringify(r5) });

  router.addRoute('GET', '/users/:id/posts/:postId', function(p) { return { id: p.id, postId: p.postId }; });
  var r6 = router.dispatch('GET', '/users/5/posts/99');
  results.push({ pass: r6.id === '5' && r6.postId === '99', description: 'Multi-param /users/:id/posts/:postId extracts both params', got: JSON.stringify(r6) });

  var r7 = router.dispatch('get', '/users/10');
  results.push({ pass: r7.status === 200 && r7.body === 'user 10', description: 'Method matching is case-insensitive (get matches GET)', got: JSON.stringify(r7) });

  var r8 = router.dispatch('GET', '/users/42/posts');
  results.push({ pass: r8.status === 404, description: 'Partial path /users/42/posts does not match /users/:id/posts/:postId', got: JSON.stringify(r8) });

  return results;
}`,
    hint1:
      'Store registered routes as objects with method, pattern segments, and handler. When dispatching, split the incoming path into segments and compare against each route — static segments must match exactly, and segments starting with `:` are parameters whose values get extracted into an object.',
    hint2:
      'For `addRoute`, split the pattern on `/` and store the parts array. For `dispatch`, split the path and loop through routes. For each route, check method match and segment count match, then compare each segment: if the route part starts with `:`, store the path value in a params object using the part name (minus the `:`). If all segments match, call `handler(params)`. If no route matches, return `{ status: 404, body: "Not Found" }`.',
    resources: routerRes,
  },

  // 2. Middleware Pipeline
  {
    id: 1379,
    title: 'Middleware Pipeline',
    type: 'js',
    tier: 4,
    category: ['server-concepts', 'middleware'],
    tags: ['middleware', 'pipeline', 'next', 'request', 'response', 'server'],
    description:
      'Create a function called `createMiddlewarePipeline` that returns a pipeline object. The pipeline has these methods: `use(middlewareFn)` adds a middleware function to the pipeline; `execute(context)` runs all middleware in order and returns the final context. Each middleware function receives `(context, next)` — it can modify the context object and must call `next()` to pass control to the next middleware. If a middleware does not call `next()`, the pipeline stops and returns the context at that point. If any middleware throws an error, the pipeline should catch it and set `context.error` to the error message, then stop execution. The context starts as whatever object is passed to `execute` and accumulates modifications from each middleware.',
    starterCode: '',
    solution:
      'function createMiddlewarePipeline() {\n  var middlewares = [];\n  return {\n    use: function(fn) {\n      middlewares.push(fn);\n    },\n    execute: function(context) {\n      var index = 0;\n      function next() {\n        if (index < middlewares.length) {\n          var fn = middlewares[index];\n          index++;\n          try {\n            fn(context, next);\n          } catch (err) {\n            context.error = err.message;\n          }\n        }\n      }\n      next();\n      return context;\n    }\n  };\n}',
    testRunner: `(code) => {
  var fn = new Function(code + '; return createMiddlewarePipeline;')();
  var results = [];

  var p1 = fn();
  p1.use(function(ctx, next) { ctx.steps = []; ctx.steps.push('A'); next(); });
  p1.use(function(ctx, next) { ctx.steps.push('B'); next(); });
  p1.use(function(ctx, next) { ctx.steps.push('C'); next(); });
  var r1 = p1.execute({});
  results.push({ pass: JSON.stringify(r1.steps) === '["A","B","C"]', description: 'Three middleware execute in order: A, B, C', got: JSON.stringify(r1.steps) });

  var p2 = fn();
  p2.use(function(ctx, next) { ctx.auth = true; next(); });
  p2.use(function(ctx, next) { ctx.user = 'Alice'; });
  p2.use(function(ctx, next) { ctx.unreachable = true; next(); });
  var r2 = p2.execute({});
  results.push({ pass: r2.auth === true && r2.user === 'Alice' && r2.unreachable === undefined, description: 'Pipeline stops when middleware does not call next()', got: JSON.stringify(r2) });

  var p3 = fn();
  p3.use(function(ctx, next) { ctx.before = true; next(); });
  p3.use(function(ctx, next) { throw new Error('auth failed'); });
  p3.use(function(ctx, next) { ctx.after = true; next(); });
  var r3 = p3.execute({});
  results.push({ pass: r3.before === true && r3.error === 'auth failed' && r3.after === undefined, description: 'Error sets context.error and stops pipeline', got: JSON.stringify(r3) });

  var p4 = fn();
  var r4 = p4.execute({ initial: true });
  results.push({ pass: r4.initial === true, description: 'Empty pipeline returns context unchanged', got: JSON.stringify(r4) });

  var p5 = fn();
  p5.use(function(ctx, next) { ctx.count = (ctx.count || 0) + 1; next(); });
  p5.use(function(ctx, next) { ctx.count += 10; next(); });
  var r5 = p5.execute({ count: 5 });
  results.push({ pass: r5.count === 16, description: 'Middleware accumulates on initial context value: 5+1+10=16', got: String(r5.count) });

  var p6 = fn();
  p6.use(function(ctx, next) {
    if (!ctx.token) { ctx.status = 401; ctx.body = 'Unauthorized'; return; }
    next();
  });
  p6.use(function(ctx, next) { ctx.status = 200; ctx.body = 'OK'; next(); });
  var r6a = p6.execute({ token: null });
  var r6b = p6.execute({ token: 'abc123' });
  results.push({ pass: r6a.status === 401 && r6b.status === 200, description: 'Auth guard blocks without token (401) and passes with token (200)', got: 'noToken=' + r6a.status + ', withToken=' + r6b.status });

  var p7 = fn();
  var order = [];
  p7.use(function(ctx, next) { order.push('start'); next(); order.push('end'); });
  p7.use(function(ctx, next) { order.push('middle'); next(); });
  p7.execute({});
  results.push({ pass: JSON.stringify(order) === '["start","middle","end"]', description: 'Middleware can run code after next() (onion model)', got: JSON.stringify(order) });

  var p8 = fn();
  p8.use(function(ctx, next) { ctx.log = []; ctx.log.push('logger'); next(); });
  p8.use(function(ctx, next) { ctx.log.push('parser'); ctx.parsed = true; next(); });
  p8.use(function(ctx, next) { ctx.log.push('handler'); ctx.result = 'done'; next(); });
  var r8 = p8.execute({});
  results.push({ pass: r8.log.length === 3 && r8.parsed === true && r8.result === 'done', description: 'Full pipeline: logger → parser → handler builds complete context', got: JSON.stringify(r8) });

  return results;
}`,
    hint1:
      'Store middleware functions in an array. When executing, define a `next` function that advances an index counter and calls the current middleware with the context and itself as the `next` argument. Each middleware decides whether to call `next()` to continue the chain.',
    hint2:
      'Keep an `index` variable. Define `function next() { if (index < middlewares.length) { var fn = middlewares[index]; index++; fn(context, next); } }`. Wrap the middleware call in try/catch — on error, set `context.error` and stop. Call `next()` once to start the chain. Return the context after the chain completes.',
    resources: middlewareRes,
  },

  // 3. REST API Simulation
  {
    id: 1380,
    title: 'REST API Simulation',
    type: 'js',
    tier: 4,
    category: ['server-concepts', 'api-design'],
    tags: ['rest', 'crud', 'api', 'status-codes', 'validation', 'server'],
    description:
      'Create a function called `createAPI` that returns a simulated REST API for managing a collection of items. Each item has an auto-incremented `id`. The API object has these methods: `get(id)` returns `{ status: 200, body: item }` if found, or `{ status: 404, body: "Not Found" }` if not; `getAll()` returns `{ status: 200, body: [items] }`; `post(data)` validates that `data` has a `name` property (non-empty string), creates an item with an auto-incremented `id`, and returns `{ status: 201, body: newItem }` — or `{ status: 400, body: "Validation Error" }` if invalid; `put(id, data)` updates an existing item and returns `{ status: 200, body: updatedItem }`, or 404 if not found, or 400 if data is invalid; `delete(id)` removes an item and returns `{ status: 200, body: "Deleted" }`, or 404 if not found.',
    starterCode: '',
    solution:
      'function createAPI() {\n  var items = [];\n  var nextId = 1;\n  function validate(data) {\n    return data && typeof data.name === "string" && data.name.trim() !== "";\n  }\n  return {\n    get: function(id) {\n      var item = null;\n      for (var i = 0; i < items.length; i++) {\n        if (items[i].id === id) { item = items[i]; break; }\n      }\n      if (!item) return { status: 404, body: "Not Found" };\n      return { status: 200, body: item };\n    },\n    getAll: function() {\n      return { status: 200, body: items.slice() };\n    },\n    post: function(data) {\n      if (!validate(data)) return { status: 400, body: "Validation Error" };\n      var item = { id: nextId++, name: data.name };\n      items.push(item);\n      return { status: 201, body: item };\n    },\n    put: function(id, data) {\n      if (!validate(data)) return { status: 400, body: "Validation Error" };\n      for (var i = 0; i < items.length; i++) {\n        if (items[i].id === id) {\n          items[i].name = data.name;\n          return { status: 200, body: items[i] };\n        }\n      }\n      return { status: 404, body: "Not Found" };\n    },\n    delete: function(id) {\n      for (var i = 0; i < items.length; i++) {\n        if (items[i].id === id) {\n          items.splice(i, 1);\n          return { status: 200, body: "Deleted" };\n        }\n      }\n      return { status: 404, body: "Not Found" };\n    }\n  };\n}',
    testRunner: `(code) => {
  var fn = new Function(code + '; return createAPI;')();
  var results = [];

  var api = fn();
  var r1 = api.post({ name: 'Alice' });
  results.push({ pass: r1.status === 201 && r1.body.id === 1 && r1.body.name === 'Alice', description: 'POST creates item with auto-id 1 and name "Alice"', got: JSON.stringify(r1) });

  var r2 = api.post({ name: 'Bob' });
  results.push({ pass: r2.status === 201 && r2.body.id === 2, description: 'POST auto-increments id to 2 for "Bob"', got: JSON.stringify(r2) });

  var r3 = api.get(1);
  results.push({ pass: r3.status === 200 && r3.body.name === 'Alice', description: 'GET(1) returns Alice with status 200', got: JSON.stringify(r3) });

  var r4 = api.get(99);
  results.push({ pass: r4.status === 404 && r4.body === 'Not Found', description: 'GET(99) returns 404 Not Found', got: JSON.stringify(r4) });

  var r5 = api.post({ name: '' });
  var r5b = api.post({});
  results.push({ pass: r5.status === 400 && r5b.status === 400, description: 'POST rejects empty name and missing name with 400', got: 'empty=' + r5.status + ', missing=' + r5b.status });

  var r6 = api.put(1, { name: 'Alicia' });
  results.push({ pass: r6.status === 200 && r6.body.name === 'Alicia' && api.get(1).body.name === 'Alicia', description: 'PUT(1) updates name to "Alicia", persists change', got: JSON.stringify(r6) });

  var r7 = api.delete(2);
  results.push({ pass: r7.status === 200 && r7.body === 'Deleted' && api.get(2).status === 404, description: 'DELETE(2) removes Bob, subsequent GET returns 404', got: JSON.stringify(r7) });

  var all = api.getAll();
  results.push({ pass: all.status === 200 && all.body.length === 1 && all.body[0].name === 'Alicia', description: 'getAll returns [Alicia] after delete, status 200', got: JSON.stringify(all) });

  return results;
}`,
    hint1:
      'Store items in a private array and use a counter for auto-incrementing IDs. Each CRUD method simulates an HTTP response by returning `{ status, body }`. The `post` and `put` methods should validate input before making changes, while `get`, `put`, and `delete` should check if the item exists and return 404 if not.',
    hint2:
      'Use `var items = []` and `var nextId = 1`. For `post`, validate `data.name` is a non-empty string, create `{ id: nextId++, name: data.name }`, push to array, return `{ status: 201, body: item }`. For `get`, loop through items to find matching id. For `put`, find the item and update its name. For `delete`, find and splice the item out.',
    resources: restRes,
  },

  // 4. In-Memory Database with Schema
  {
    id: 1381,
    title: 'In-Memory Database',
    type: 'js',
    tier: 4,
    category: ['server-concepts', 'data-modeling'],
    tags: ['database', 'schema', 'validation', 'query', 'in-memory', 'server'],
    description:
      'Create a function called `createDatabase` that takes a schema object and returns a database instance. The schema defines field names and their types (e.g., `{ name: "string", age: "number", active: "boolean" }`). The database has these methods: `insert(record)` validates the record against the schema, assigns an auto-incremented `_id`, and stores it — returns the stored record or throws an error with message `"Validation failed"` if any field has the wrong type or required fields are missing; `findById(id)` returns the record or `null`; `find(query)` returns an array of all records matching every key-value pair in the query object (e.g., `find({ active: true })` returns all active records); `update(id, changes)` merges changes into an existing record (validating changed fields against schema) and returns the updated record or `null` if not found; `remove(id)` deletes a record and returns `true` if found, `false` otherwise; `count()` returns the total number of records.',
    starterCode: '',
    solution:
      'function createDatabase(schema) {\n  var records = [];\n  var nextId = 1;\n  var fields = Object.keys(schema);\n  function validateRecord(data) {\n    for (var i = 0; i < fields.length; i++) {\n      var key = fields[i];\n      if (data[key] === undefined) return false;\n      if (typeof data[key] !== schema[key]) return false;\n    }\n    return true;\n  }\n  function validatePartial(data) {\n    var keys = Object.keys(data);\n    for (var i = 0; i < keys.length; i++) {\n      if (schema[keys[i]] !== undefined && typeof data[keys[i]] !== schema[keys[i]]) return false;\n    }\n    return true;\n  }\n  return {\n    insert: function(record) {\n      if (!validateRecord(record)) throw new Error("Validation failed");\n      var stored = { _id: nextId++ };\n      for (var i = 0; i < fields.length; i++) {\n        stored[fields[i]] = record[fields[i]];\n      }\n      records.push(stored);\n      return stored;\n    },\n    findById: function(id) {\n      for (var i = 0; i < records.length; i++) {\n        if (records[i]._id === id) return records[i];\n      }\n      return null;\n    },\n    find: function(query) {\n      var qKeys = Object.keys(query);\n      return records.filter(function(rec) {\n        for (var i = 0; i < qKeys.length; i++) {\n          if (rec[qKeys[i]] !== query[qKeys[i]]) return false;\n        }\n        return true;\n      });\n    },\n    update: function(id, changes) {\n      if (!validatePartial(changes)) throw new Error("Validation failed");\n      for (var i = 0; i < records.length; i++) {\n        if (records[i]._id === id) {\n          var keys = Object.keys(changes);\n          for (var j = 0; j < keys.length; j++) {\n            if (fields.indexOf(keys[j]) !== -1) {\n              records[i][keys[j]] = changes[keys[j]];\n            }\n          }\n          return records[i];\n        }\n      }\n      return null;\n    },\n    remove: function(id) {\n      for (var i = 0; i < records.length; i++) {\n        if (records[i]._id === id) {\n          records.splice(i, 1);\n          return true;\n        }\n      }\n      return false;\n    },\n    count: function() {\n      return records.length;\n    }\n  };\n}',
    testRunner: `(code) => {
  var fn = new Function(code + '; return createDatabase;')();
  var results = [];

  var db = fn({ name: 'string', age: 'number', active: 'boolean' });
  var r1 = db.insert({ name: 'Alice', age: 30, active: true });
  results.push({ pass: r1._id === 1 && r1.name === 'Alice' && r1.age === 30 && r1.active === true, description: 'insert validates and stores record with _id=1', got: JSON.stringify(r1) });

  db.insert({ name: 'Bob', age: 25, active: true });
  db.insert({ name: 'Charlie', age: 35, active: false });
  results.push({ pass: db.count() === 3, description: 'count returns 3 after three inserts', got: String(db.count()) });

  var err = '';
  try { db.insert({ name: 'Bad', age: 'not a number', active: true }); } catch (e) { err = e.message; }
  results.push({ pass: err === 'Validation failed' && db.count() === 3, description: 'insert throws "Validation failed" for wrong type, count unchanged', got: 'err=' + err + ', count=' + db.count() });

  var found = db.findById(2);
  results.push({ pass: found !== null && found.name === 'Bob', description: 'findById(2) returns Bob', got: JSON.stringify(found) });

  var active = db.find({ active: true });
  results.push({ pass: active.length === 2 && active[0].name === 'Alice' && active[1].name === 'Bob', description: 'find({ active: true }) returns Alice and Bob', got: JSON.stringify(active.map(function(r) { return r.name; })) });

  var updated = db.update(1, { age: 31 });
  results.push({ pass: updated.age === 31 && updated.name === 'Alice' && db.findById(1).age === 31, description: 'update(1, { age: 31 }) changes age and persists', got: JSON.stringify(updated) });

  var removed = db.remove(3);
  results.push({ pass: removed === true && db.count() === 2 && db.findById(3) === null, description: 'remove(3) returns true, count drops to 2, findById returns null', got: 'removed=' + removed + ', count=' + db.count() });

  var notFound = db.update(99, { name: 'Ghost' });
  var notRemoved = db.remove(99);
  results.push({ pass: notFound === null && notRemoved === false, description: 'update and remove on non-existent id return null/false', got: 'update=' + notFound + ', remove=' + notRemoved });

  return results;
}`,
    hint1:
      'Store records in an array and the schema as a reference for validation. For `insert`, check that every schema field exists in the record and matches the expected `typeof`. For `find`, filter records where every key-value pair in the query matches the record. Use a counter for auto-incrementing `_id` values.',
    hint2:
      'For validation, loop through `Object.keys(schema)` and check `typeof record[key] === schema[key]` for each field. For `find(query)`, use `records.filter` where every query key matches the record value. For `update`, validate only the changed fields against the schema, then merge them into the found record. Throw `new Error("Validation failed")` for schema violations.',
    resources: dbRes,
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
    `T4 Server Concepts — Section 9: ${exercises.length} exercises (IDs ${exercises[0].id}-${exercises[exercises.length - 1].id})`
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
