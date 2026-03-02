#!/usr/bin/env node
/**
 * Generator: T3 Error Handling — Section 5 (12 exercises, IDs 1275-1286)
 *
 * Covers: Try/Catch Fundamentals, Throwing Errors, Custom Errors, Applied Patterns
 *
 * Usage:
 *   node exercises/_gen_t3_error_handling.js            # Append to curriculum
 *   node exercises/_gen_t3_error_handling.js --validate  # Validate testRunners only
 */

const fs = require('fs');
const path = require('path');

const CURRICULUM_PATH = path.join(
  __dirname,
  'collections',
  'default-curriculum.json'
);

// ─── Resources (MDN only for T3) ────────────────────────────────────────────

const tryCatchRes = [
  { label: 'MDN: try...catch', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch', description: 'Try/catch statement reference' },
];
const throwRes = [
  { label: 'MDN: throw', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/throw', description: 'Throw statement reference' },
  { label: 'MDN: Error', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error', description: 'Error object reference' },
];
const errorTypesRes = [
  { label: 'MDN: TypeError', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypeError', description: 'TypeError reference' },
  { label: 'MDN: RangeError', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RangeError', description: 'RangeError reference' },
];
const customErrorRes = [
  { label: 'MDN: Error', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error', description: 'Error object reference' },
  { label: 'MDN: extends', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/extends', description: 'Extends reference' },
];

// ─── Exercise Definitions ───────────────────────────────────────────────────

const exercises = [

  // ══════════════════════════════════════════════════════════════════════════
  // SUB-SECTION A: Try/Catch Fundamentals (3 exercises, IDs 1275-1277)
  // ══════════════════════════════════════════════════════════════════════════

  // 1. Try/Catch Basics (ENTRY POINT)
  {
    id: 1275,
    title: 'Try/Catch Basics',
    type: 'js',
    tier: 3,
    category: ['js-fundamentals', 'error-handling'],
    tags: ['try', 'catch', 'error', 'error-handling', 'control-flow'],
    description:
      'Write a function that wraps a risky operation in try/catch and returns the error message on failure.',
    instructions:
      'A `try/catch` block lets you attempt code that might fail and handle the error gracefully instead of crashing.\n\nSyntax:\n```\ntry {\n  // code that might throw\n} catch (error) {\n  // handle the error\n  error.message; // the error description\n}\n```\n\nWhen code inside `try` throws an error, execution jumps immediately to the `catch` block. The `error` parameter receives the Error object. If no error is thrown, the `catch` block is skipped entirely.\n\nWrite `safeDivide(a, b)` — it should return the result of `a / b`, but if `b` is 0, throw an Error with message "Cannot divide by zero" inside the try block, and catch it to return the string "Error: Cannot divide by zero" (see `@param`/`@returns` in the starter code).',
    starterCode:
      '/**\n * @param {number} a - The dividend\n * @param {number} b - The divisor\n * @returns {number|string} The result of a / b, or "Error: Cannot divide by zero" if b is 0\n */\nfunction safeDivide(a, b) {\n\n}\n',
    solution:
      'function safeDivide(a, b) {\n  try {\n    if (b === 0) {\n      throw new Error("Cannot divide by zero");\n    }\n    return a / b;\n  } catch (error) {\n    return "Error: " + error.message;\n  }\n}',
    testRunner: `(code) => {
  const fn = new Function(code + '; return safeDivide;')();
  const r1 = fn(10, 2);
  const r2 = fn(0, 5);
  const r3 = fn(10, 0);
  const r4 = fn(-6, 3);
  const r5 = fn(7, 2);
  const r6 = fn(100, 0);
  const r7 = fn(0, 0);
  const r8 = fn(-10, -2);
  const r9 = fn(1, 3);
  return [
    { pass: r1 === 5, description: '10 / 2 returns 5', got: String(r1) },
    { pass: r2 === 0, description: '0 / 5 returns 0', got: String(r2) },
    { pass: r3 === 'Error: Cannot divide by zero', description: '10 / 0 returns error string', got: String(r3) },
    { pass: r4 === -2, description: '-6 / 3 returns -2', got: String(r4) },
    { pass: r5 === 3.5, description: '7 / 2 returns 3.5', got: String(r5) },
    { pass: r6 === 'Error: Cannot divide by zero', description: '100 / 0 returns error string', got: String(r6) },
    { pass: r7 === 'Error: Cannot divide by zero', description: '0 / 0 returns error string', got: String(r7) },
    { pass: r8 === 5, description: '-10 / -2 returns 5', got: String(r8) },
    { pass: Math.abs(r9 - 1/3) < 0.0001, description: '1 / 3 returns ~0.333', got: String(r9) }
  ];
}`,
    hints: [
      'Put your division logic inside `try { }`. Check if `b === 0` and `throw new Error("Cannot divide by zero")` if so. Otherwise return `a / b`. In the `catch` block, return `"Error: " + error.message`.',
      'The structure is: `try { if (b === 0) { throw new Error(...); } return a / b; } catch (error) { return "Error: " + error.message; }`. The throw triggers the catch block.',
    ],
    resources: tryCatchRes,
  },

  // 2. Finally Block
  {
    id: 1276,
    title: 'Finally Block',
    type: 'js',
    tier: 3,
    category: ['js-fundamentals', 'error-handling'],
    tags: ['try', 'catch', 'finally', 'cleanup', 'error-handling'],
    description:
      'Write a function that uses try/catch/finally to track whether an operation was attempted, regardless of outcome.',
    starterCode:
      '/**\n * @param {string} jsonString - A string to parse as JSON\n * @returns {{ data: any, error: string|null, attempted: boolean }}\n *   data: the parsed result (or null if parsing failed)\n *   error: the error message (or null if parsing succeeded)\n *   attempted: always true (set in finally)\n */\nfunction safeJsonParse(jsonString) {\n\n}\n',
    solution:
      'function safeJsonParse(jsonString) {\n  const result = { data: null, error: null, attempted: false };\n  try {\n    result.data = JSON.parse(jsonString);\n  } catch (error) {\n    result.error = error.message;\n  } finally {\n    result.attempted = true;\n  }\n  return result;\n}',
    testRunner: `(code) => {
  const fn = new Function(code + '; return safeJsonParse;')();
  const r1 = fn('{"name":"Alice"}');
  const r2 = fn('not json');
  const r3 = fn('42');
  const r4 = fn('[1,2,3]');
  const r5 = fn('{bad}');
  const r6 = fn('true');
  const r7 = fn('');
  const r8 = fn('"hello"');
  const r9 = fn('null');
  return [
    { pass: r1.data !== null && r1.data.name === 'Alice' && r1.error === null && r1.attempted === true, description: 'Valid JSON object: data has name, no error, attempted true', got: JSON.stringify(r1) },
    { pass: r2.data === null && typeof r2.error === 'string' && r2.attempted === true, description: 'Invalid JSON: data null, error is string, attempted true', got: JSON.stringify(r2) },
    { pass: r3.data === 42 && r3.error === null && r3.attempted === true, description: 'JSON number 42: data is 42', got: JSON.stringify(r3) },
    { pass: JSON.stringify(r4.data) === '[1,2,3]' && r4.error === null, description: 'JSON array [1,2,3]: data is array', got: JSON.stringify(r4) },
    { pass: r5.data === null && typeof r5.error === 'string' && r5.attempted === true, description: 'Invalid {bad}: data null, error string, attempted true', got: JSON.stringify(r5) },
    { pass: r6.data === true && r6.error === null, description: 'JSON true: data is true', got: JSON.stringify(r6) },
    { pass: r7.data === null && typeof r7.error === 'string' && r7.attempted === true, description: 'Empty string: data null, error string, attempted true', got: JSON.stringify(r7) },
    { pass: r8.data === 'hello' && r8.error === null, description: 'JSON string "hello": data is "hello"', got: JSON.stringify(r8) },
    { pass: r9.data === null && r9.error === null && r9.attempted === true, description: 'JSON null: data is null, no error, attempted true', got: JSON.stringify(r9) }
  ];
}`,
    hints: [
      'Create a `result` object with `data: null`, `error: null`, `attempted: false`. In `try`, set `result.data = JSON.parse(jsonString)`. In `catch`, set `result.error = error.message`. In `finally`, set `result.attempted = true`. Return `result`.',
      'The `finally` block runs whether or not an error occurred. It is the right place to set `attempted: true` because it guarantees the flag is set regardless of outcome.',
    ],
    resources: tryCatchRes,
  },

  // 3. Try/Catch with Return Values
  {
    id: 1277,
    title: 'Try/Catch with Return',
    type: 'js',
    tier: 3,
    category: ['js-fundamentals', 'error-handling'],
    tags: ['try', 'catch', 'finally', 'return', 'control-flow'],
    description:
      'Write a function that converts a string to a number, returning different values from try vs catch to handle valid and invalid input.',
    starterCode:
      '/**\n * @param {string} value - A string that may or may not be a valid number\n * @returns {{ value: number|null, status: string }}\n *   If valid: { value: <parsed number>, status: "success" }\n *   If NaN after parsing: { value: null, status: "not a number" }\n *   If any other error: { value: null, status: "error" }\n *\n * Use Number() to parse. If result is NaN, throw new Error("not a number").\n * If the input is not a string, throw new TypeError("expected string").\n */\nfunction parseNumber(value) {\n\n}\n',
    solution:
      'function parseNumber(value) {\n  try {\n    if (typeof value !== "string") {\n      throw new TypeError("expected string");\n    }\n    const num = Number(value);\n    if (isNaN(num)) {\n      throw new Error("not a number");\n    }\n    return { value: num, status: "success" };\n  } catch (error) {\n    if (error.message === "not a number") {\n      return { value: null, status: "not a number" };\n    }\n    return { value: null, status: "error" };\n  }\n}',
    testRunner: `(code) => {
  const fn = new Function(code + '; return parseNumber;')();
  const r1 = fn('42');
  const r2 = fn('hello');
  const r3 = fn('3.14');
  const r4 = fn(123);
  const r5 = fn('');
  const r6 = fn('0');
  const r7 = fn(null);
  const r8 = fn('-5');
  const r9 = fn('abc123');
  return [
    { pass: r1.value === 42 && r1.status === 'success', description: '"42" → { value: 42, status: "success" }', got: JSON.stringify(r1) },
    { pass: r2.value === null && r2.status === 'not a number', description: '"hello" → { value: null, status: "not a number" }', got: JSON.stringify(r2) },
    { pass: r3.value === 3.14 && r3.status === 'success', description: '"3.14" → { value: 3.14, status: "success" }', got: JSON.stringify(r3) },
    { pass: r4.value === null && r4.status === 'error', description: '123 (not string) → { value: null, status: "error" }', got: JSON.stringify(r4) },
    { pass: r5.value === 0 && r5.status === 'success', description: '"" → { value: 0, status: "success" } (Number("") is 0)', got: JSON.stringify(r5) },
    { pass: r6.value === 0 && r6.status === 'success', description: '"0" → { value: 0, status: "success" }', got: JSON.stringify(r6) },
    { pass: r7.value === null && r7.status === 'error', description: 'null (not string) → { value: null, status: "error" }', got: JSON.stringify(r7) },
    { pass: r8.value === -5 && r8.status === 'success', description: '"-5" → { value: -5, status: "success" }', got: JSON.stringify(r8) },
    { pass: r9.value === null && r9.status === 'not a number', description: '"abc123" → { value: null, status: "not a number" }', got: JSON.stringify(r9) }
  ];
}`,
    hints: [
      'First check `typeof value !== "string"` and throw a `TypeError`. Then use `Number(value)` and check `isNaN()`. If NaN, throw `new Error("not a number")`. In `catch`, check `error.message` to distinguish the two error cases.',
      'The try block returns `{ value: num, status: "success" }` for valid numbers. The catch block returns `{ value: null, status: "not a number" }` if the message matches, otherwise `{ value: null, status: "error" }` for type errors.',
    ],
    resources: tryCatchRes,
  },

  // ══════════════════════════════════════════════════════════════════════════
  // SUB-SECTION B: Throwing Errors (3 exercises, IDs 1278-1280)
  // ══════════════════════════════════════════════════════════════════════════

  // 4. Throw an Error (ENTRY POINT)
  {
    id: 1278,
    title: 'Throw an Error',
    type: 'js',
    tier: 3,
    category: ['js-fundamentals', 'error-handling'],
    tags: ['throw', 'error', 'validation', 'input-validation'],
    description:
      'Write a function that validates input and throws a descriptive Error when requirements are not met.',
    instructions:
      'The `throw` statement lets you create errors intentionally when something is wrong. This is how functions communicate that they received bad input or hit an unexpected state.\n\nSyntax:\n```\nthrow new Error("descriptive message");\n```\n\nWhen you `throw`, execution stops immediately and the error propagates up to the nearest `catch` block. If there is no catch, the program crashes — which is the correct behavior for truly invalid input.\n\nWrite `createUser(name, age)` — validate that name is a non-empty string and age is a number between 0 and 150. Throw descriptive errors for invalid input. Return an object `{ name, age }` if valid (see `@param`/`@returns` in the starter code).',
    starterCode:
      '/**\n * @param {string} name - Must be a non-empty string\n * @param {number} age - Must be a number between 0 and 150 (inclusive)\n * @returns {{ name: string, age: number }} The user object\n * @throws {Error} "Name must be a non-empty string" if name is invalid\n * @throws {Error} "Age must be a number between 0 and 150" if age is invalid\n */\nfunction createUser(name, age) {\n\n}\n',
    solution:
      'function createUser(name, age) {\n  if (typeof name !== "string" || name.trim() === "") {\n    throw new Error("Name must be a non-empty string");\n  }\n  if (typeof age !== "number" || age < 0 || age > 150) {\n    throw new Error("Age must be a number between 0 and 150");\n  }\n  return { name, age };\n}',
    testRunner: `(code) => {
  const fn = new Function(code + '; return createUser;')();
  const r1 = fn('Alice', 30);
  const r2 = fn('Bob', 0);
  let r3 = ''; try { fn('', 25); } catch(e) { r3 = e.message; }
  let r4 = ''; try { fn('Eve', -1); } catch(e) { r4 = e.message; }
  let r5 = ''; try { fn('Eve', 151); } catch(e) { r5 = e.message; }
  let r6 = ''; try { fn(123, 25); } catch(e) { r6 = e.message; }
  let r7 = ''; try { fn('Eve', 'thirty'); } catch(e) { r7 = e.message; }
  const r8 = fn('Charlie', 150);
  let r9 = ''; try { fn('  ', 25); } catch(e) { r9 = e.message; }
  return [
    { pass: r1.name === 'Alice' && r1.age === 30, description: 'Valid: Alice, 30 returns user object', got: JSON.stringify(r1) },
    { pass: r2.name === 'Bob' && r2.age === 0, description: 'Valid: Bob, 0 (edge case) returns user object', got: JSON.stringify(r2) },
    { pass: r3 === 'Name must be a non-empty string', description: 'Empty name throws correct error', got: r3 },
    { pass: r4 === 'Age must be a number between 0 and 150', description: 'Negative age throws correct error', got: r4 },
    { pass: r5 === 'Age must be a number between 0 and 150', description: 'Age > 150 throws correct error', got: r5 },
    { pass: r6 === 'Name must be a non-empty string', description: 'Number as name throws correct error', got: r6 },
    { pass: r7 === 'Age must be a number between 0 and 150', description: 'String as age throws correct error', got: r7 },
    { pass: r8.name === 'Charlie' && r8.age === 150, description: 'Valid: Charlie, 150 (edge case) returns user object', got: JSON.stringify(r8) },
    { pass: r9 === 'Name must be a non-empty string', description: 'Whitespace-only name throws correct error', got: r9 }
  ];
}`,
    hints: [
      'Check `typeof name !== "string" || name.trim() === ""` first and throw. Then check `typeof age !== "number" || age < 0 || age > 150` and throw. If both pass, return `{ name, age }`.',
      'Use `throw new Error("Name must be a non-empty string")` for name validation and `throw new Error("Age must be a number between 0 and 150")` for age validation. Validate name before age.',
    ],
    resources: throwRes,
  },

  // 5. Error Types
  {
    id: 1279,
    title: 'Error Types',
    type: 'js',
    tier: 3,
    category: ['js-fundamentals', 'error-handling'],
    tags: ['TypeError', 'RangeError', 'error-types', 'throw'],
    description:
      'Write a function that throws the appropriate built-in error type based on what went wrong.',
    starterCode:
      '/**\n * @param {Array} arr - Must be an array\n * @param {number} index - Must be a non-negative integer within bounds\n * @returns {*} The element at the given index\n * @throws {TypeError} "Expected an array" if arr is not an array\n * @throws {TypeError} "Index must be a number" if index is not a number\n * @throws {RangeError} "Index out of bounds" if index < 0 or index >= arr.length\n */\nfunction getElement(arr, index) {\n\n}\n',
    solution:
      'function getElement(arr, index) {\n  if (!Array.isArray(arr)) {\n    throw new TypeError("Expected an array");\n  }\n  if (typeof index !== "number") {\n    throw new TypeError("Index must be a number");\n  }\n  if (index < 0 || index >= arr.length) {\n    throw new RangeError("Index out of bounds");\n  }\n  return arr[index];\n}',
    testRunner: `(code) => {
  const fn = new Function(code + '; return getElement;')();
  const r1 = fn([10, 20, 30], 1);
  const r2 = fn(['a', 'b'], 0);
  let r3name = ''; let r3msg = ''; try { fn('not array', 0); } catch(e) { r3name = e.constructor.name; r3msg = e.message; }
  let r4name = ''; let r4msg = ''; try { fn([1,2], '1'); } catch(e) { r4name = e.constructor.name; r4msg = e.message; }
  let r5name = ''; let r5msg = ''; try { fn([1,2], -1); } catch(e) { r5name = e.constructor.name; r5msg = e.message; }
  let r6name = ''; let r6msg = ''; try { fn([1,2], 5); } catch(e) { r6name = e.constructor.name; r6msg = e.message; }
  const r7 = fn([true, false], 1);
  let r8name = ''; try { fn(null, 0); } catch(e) { r8name = e.constructor.name; }
  const r9 = fn([1, 2, 3], 2);
  return [
    { pass: r1 === 20, description: '[10,20,30] at index 1 returns 20', got: String(r1) },
    { pass: r2 === 'a', description: '["a","b"] at index 0 returns "a"', got: String(r2) },
    { pass: r3name === 'TypeError' && r3msg === 'Expected an array', description: 'String input throws TypeError: "Expected an array"', got: r3name + ': ' + r3msg },
    { pass: r4name === 'TypeError' && r4msg === 'Index must be a number', description: 'String index throws TypeError: "Index must be a number"', got: r4name + ': ' + r4msg },
    { pass: r5name === 'RangeError' && r5msg === 'Index out of bounds', description: 'Negative index throws RangeError: "Index out of bounds"', got: r5name + ': ' + r5msg },
    { pass: r6name === 'RangeError' && r6msg === 'Index out of bounds', description: 'Index >= length throws RangeError: "Index out of bounds"', got: r6name + ': ' + r6msg },
    { pass: r7 === false, description: '[true,false] at index 1 returns false', got: String(r7) },
    { pass: r8name === 'TypeError', description: 'null input throws TypeError', got: r8name },
    { pass: r9 === 3, description: '[1,2,3] at index 2 returns 3', got: String(r9) }
  ];
}`,
    hints: [
      'Use `TypeError` when the wrong data type is provided (not an array, or index not a number). Use `RangeError` when a number is outside the valid range (negative or >= array length).',
      'Check with `Array.isArray(arr)`, then `typeof index !== "number"`, then `index < 0 || index >= arr.length`. Use `throw new TypeError(...)` or `throw new RangeError(...)` accordingly.',
    ],
    resources: errorTypesRes,
  },

  // 6. Error Message Formatting
  {
    id: 1280,
    title: 'Error Message Formatting',
    type: 'js',
    tier: 3,
    category: ['js-fundamentals', 'error-handling'],
    tags: ['try', 'catch', 'error', 'result-object', 'pattern'],
    description:
      'Write a function that catches errors and returns a standardized result object with success status, data, and error info.',
    starterCode:
      '/**\n * @param {Function} operation - A function to attempt calling\n * @returns {{ success: boolean, data: any, error: string|null }}\n *   success: true if operation ran without error, false otherwise\n *   data: the return value of operation() on success, or null on failure\n *   error: null on success, or the error message string on failure\n */\nfunction attempt(operation) {\n\n}\n',
    solution:
      'function attempt(operation) {\n  try {\n    const data = operation();\n    return { success: true, data: data, error: null };\n  } catch (error) {\n    return { success: false, data: null, error: error.message };\n  }\n}',
    testRunner: `(code) => {
  const fn = new Function(code + '; return attempt;')();
  const r1 = fn(() => 42);
  const r2 = fn(() => { throw new Error('boom'); });
  const r3 = fn(() => 'hello');
  const r4 = fn(() => { throw new TypeError('bad type'); });
  const r5 = fn(() => [1, 2, 3]);
  const r6 = fn(() => null);
  const r7 = fn(() => { throw new RangeError('out of range'); });
  const r8 = fn(() => ({ name: 'test' }));
  const r9 = fn(() => 0);
  return [
    { pass: r1.success === true && r1.data === 42 && r1.error === null, description: '() => 42: success with data 42', got: JSON.stringify(r1) },
    { pass: r2.success === false && r2.data === null && r2.error === 'boom', description: 'Throws "boom": failure with error message', got: JSON.stringify(r2) },
    { pass: r3.success === true && r3.data === 'hello', description: '() => "hello": success with data "hello"', got: JSON.stringify(r3) },
    { pass: r4.success === false && r4.error === 'bad type', description: 'TypeError "bad type": failure with error message', got: JSON.stringify(r4) },
    { pass: r5.success === true && JSON.stringify(r5.data) === '[1,2,3]', description: '() => [1,2,3]: success with array data', got: JSON.stringify(r5) },
    { pass: r6.success === true && r6.data === null && r6.error === null, description: '() => null: success with data null', got: JSON.stringify(r6) },
    { pass: r7.success === false && r7.error === 'out of range', description: 'RangeError: failure with error message', got: JSON.stringify(r7) },
    { pass: r8.success === true && r8.data.name === 'test', description: '() => object: success with object data', got: JSON.stringify(r8) },
    { pass: r9.success === true && r9.data === 0, description: '() => 0: success with data 0 (falsy but valid)', got: JSON.stringify(r9) }
  ];
}`,
    hints: [
      'Call `operation()` inside a `try` block and capture its return value. Return `{ success: true, data: <result>, error: null }`. In `catch`, return `{ success: false, data: null, error: error.message }`.',
      'The key insight is that `operation` is a function you call with `operation()`. Whatever it returns becomes `data`. If it throws, `error.message` becomes the error string.',
    ],
    resources: tryCatchRes,
  },

  // ══════════════════════════════════════════════════════════════════════════
  // SUB-SECTION C: Custom Errors (3 exercises, IDs 1281-1283)
  // ══════════════════════════════════════════════════════════════════════════

  // 7. Custom Error Class (ENTRY POINT)
  {
    id: 1281,
    title: 'Custom Error Class',
    type: 'js',
    tier: 3,
    category: ['js-fundamentals', 'error-handling'],
    tags: ['class', 'extends', 'Error', 'custom-error', 'inheritance'],
    description:
      'Create a custom error class that extends Error with a specific name and formatted message.',
    instructions:
      'Custom error classes let you create specific error types for your application. They extend the built-in `Error` class using the same inheritance you learned in Section 4.\n\nSyntax:\n```\nclass MyError extends Error {\n  constructor(message) {\n    super(message);     // call Error constructor\n    this.name = "MyError"; // override the name\n  }\n}\n```\n\nThe `super(message)` call sets up the standard `message` property. Setting `this.name` ensures `error.name` reflects your custom type instead of the generic "Error".\n\nCreate an `AppError` class that takes a `code` (string) and `message` (string). It should call `super` with the format "[CODE] message" and store the code as `this.code` (see `@param` in the starter code).',
    starterCode:
      '/**\n * Custom error class for application errors.\n *\n * @param {string} code - An error code (e.g., "NOT_FOUND", "INVALID_INPUT")\n * @param {string} message - A human-readable error description\n *\n * Properties:\n *   this.name = "AppError"\n *   this.code = code\n *   this.message = "[CODE] message"  (formatted with brackets)\n */\nclass AppError extends Error {\n\n}\n',
    solution:
      'class AppError extends Error {\n  constructor(code, message) {\n    super("[" + code + "] " + message);\n    this.name = "AppError";\n    this.code = code;\n  }\n}',
    testRunner: `(code) => {
  const Cls = new Function(code + '; return AppError;')();
  const e1 = new Cls('NOT_FOUND', 'User not found');
  const e2 = new Cls('INVALID_INPUT', 'Email is required');
  const e3 = new Cls('AUTH', 'Not authorized');
  const isError = e1 instanceof Error;
  const isAppError = e1 instanceof Cls;
  const e4 = new Cls('TIMEOUT', 'Request timed out');
  const e5 = new Cls('DUPLICATE', 'Already exists');
  let caught = false;
  try { throw new Cls('TEST', 'testing'); } catch(e) { caught = e instanceof Cls; }
  return [
    { pass: e1.message === '[NOT_FOUND] User not found', description: 'Message formatted as "[NOT_FOUND] User not found"', got: e1.message },
    { pass: e1.code === 'NOT_FOUND', description: 'code property is "NOT_FOUND"', got: e1.code },
    { pass: e1.name === 'AppError', description: 'name property is "AppError"', got: e1.name },
    { pass: isError === true, description: 'Instance of Error (inheritance works)', got: String(isError) },
    { pass: isAppError === true, description: 'Instance of AppError', got: String(isAppError) },
    { pass: e2.message === '[INVALID_INPUT] Email is required', description: 'INVALID_INPUT error formats correctly', got: e2.message },
    { pass: e3.code === 'AUTH' && e3.message === '[AUTH] Not authorized', description: 'AUTH error has correct code and message', got: e3.code + ': ' + e3.message },
    { pass: e4.message === '[TIMEOUT] Request timed out', description: 'TIMEOUT error formats correctly', got: e4.message },
    { pass: caught === true, description: 'Can be thrown and caught as AppError', got: String(caught) }
  ];
}`,
    hints: [
      'Call `super("[" + code + "] " + message)` to set the formatted message. Then set `this.name = "AppError"` and `this.code = code`. The `extends Error` in the class declaration handles inheritance.',
      'The constructor takes `(code, message)`. `super()` calls the Error constructor with your formatted string. After `super()`, you can set custom properties like `this.code`.',
    ],
    resources: customErrorRes,
  },

  // 8. Validation Error
  {
    id: 1282,
    title: 'Validation Error',
    type: 'js',
    tier: 3,
    category: ['js-fundamentals', 'error-handling'],
    tags: ['class', 'extends', 'Error', 'custom-error', 'validation'],
    description:
      'Create a ValidationError class that stores which field failed and what constraint was violated.',
    starterCode:
      '/**\n * Custom error for validation failures.\n *\n * @param {string} field - The name of the field that failed (e.g., "email")\n * @param {string} constraint - What was required (e.g., "must contain @")\n *\n * Properties:\n *   this.name = "ValidationError"\n *   this.field = field\n *   this.constraint = constraint\n *   this.message = "field: constraint"  (e.g., "email: must contain @")\n */\nclass ValidationError extends Error {\n\n}\n',
    solution:
      'class ValidationError extends Error {\n  constructor(field, constraint) {\n    super(field + ": " + constraint);\n    this.name = "ValidationError";\n    this.field = field;\n    this.constraint = constraint;\n  }\n}',
    testRunner: `(code) => {
  const Cls = new Function(code + '; return ValidationError;')();
  const e1 = new Cls('email', 'must contain @');
  const e2 = new Cls('age', 'must be positive');
  const e3 = new Cls('password', 'must be at least 8 characters');
  const isError = e1 instanceof Error;
  const isVal = e1 instanceof Cls;
  const e4 = new Cls('username', 'cannot be empty');
  let caught = null;
  try { throw new Cls('name', 'is required'); } catch(e) { caught = e; }
  const e5 = new Cls('phone', 'must be 10 digits');
  return [
    { pass: e1.message === 'email: must contain @', description: 'Message: "email: must contain @"', got: e1.message },
    { pass: e1.field === 'email' && e1.constraint === 'must contain @', description: 'field is "email", constraint is "must contain @"', got: e1.field + ' / ' + e1.constraint },
    { pass: e1.name === 'ValidationError', description: 'name is "ValidationError"', got: e1.name },
    { pass: isError && isVal, description: 'Instance of both Error and ValidationError', got: 'Error:' + isError + ' Val:' + isVal },
    { pass: e2.message === 'age: must be positive', description: 'age error formats correctly', got: e2.message },
    { pass: e3.field === 'password' && e3.constraint === 'must be at least 8 characters', description: 'password error stores field and constraint', got: e3.field + ': ' + e3.constraint },
    { pass: e4.message === 'username: cannot be empty', description: 'username error formats correctly', got: e4.message },
    { pass: caught !== null && caught.field === 'name' && caught.constraint === 'is required', description: 'Can throw and catch with field/constraint intact', got: caught ? caught.field + ': ' + caught.constraint : 'null' },
    { pass: e5.message === 'phone: must be 10 digits', description: 'phone error formats correctly', got: e5.message }
  ];
}`,
    hints: [
      'Call `super(field + ": " + constraint)` to format the message. Then set `this.name`, `this.field`, and `this.constraint` as properties.',
      'This follows the same pattern as AppError — extend Error, call super with a formatted string, and store extra properties. The field and constraint make it easy to identify which validation failed.',
    ],
    resources: customErrorRes,
  },

  // 9. Custom Error: Combined
  {
    id: 1283,
    title: 'Custom Error: Combined',
    type: 'js',
    tier: 3,
    category: ['js-fundamentals', 'error-handling'],
    tags: ['class', 'extends', 'Error', 'custom-error', 'instanceof', 'catch'],
    description:
      'Write a function that throws different custom error types and a handler that catches and responds to each one differently.',
    starterCode:
      '/**\n * NotFoundError extends Error\n *   constructor(item) — message: "<item> not found", this.name = "NotFoundError"\n *\n * PermissionError extends Error\n *   constructor(action) — message: "Not allowed to <action>", this.name = "PermissionError"\n *\n * handleLookup(items, name, role)\n *   @param {Array<string>} items - Available items\n *   @param {string} name - Item to find\n *   @param {string} role - "admin" or "guest"\n *   @returns {string} On success: "Found: <name>"\n *\n *   If role is "guest", throw PermissionError("view items")\n *   If name is not in items, throw NotFoundError(name)\n *\n * handleErrors(items, name, role)\n *   Calls handleLookup inside try/catch.\n *   If NotFoundError: return "Missing: <error.message>"\n *   If PermissionError: return "Denied: <error.message>"\n *   If any other error: return "Unknown error"\n *   On success: return the result from handleLookup\n */\n',
    solution:
      'class NotFoundError extends Error {\n  constructor(item) {\n    super(item + " not found");\n    this.name = "NotFoundError";\n  }\n}\n\nclass PermissionError extends Error {\n  constructor(action) {\n    super("Not allowed to " + action);\n    this.name = "PermissionError";\n  }\n}\n\nfunction handleLookup(items, name, role) {\n  if (role === "guest") {\n    throw new PermissionError("view items");\n  }\n  if (!items.includes(name)) {\n    throw new NotFoundError(name);\n  }\n  return "Found: " + name;\n}\n\nfunction handleErrors(items, name, role) {\n  try {\n    return handleLookup(items, name, role);\n  } catch (error) {\n    if (error instanceof NotFoundError) {\n      return "Missing: " + error.message;\n    }\n    if (error instanceof PermissionError) {\n      return "Denied: " + error.message;\n    }\n    return "Unknown error";\n  }\n}',
    testRunner: `(code) => {
  const fns = new Function(code + '; return { handleErrors, handleLookup, NotFoundError, PermissionError };')();
  const he = fns.handleErrors;
  const items = ['apple', 'banana', 'cherry'];
  const r1 = he(items, 'banana', 'admin');
  const r2 = he(items, 'grape', 'admin');
  const r3 = he(items, 'apple', 'guest');
  const r4 = he(items, 'grape', 'guest');
  const r5 = he(items, 'cherry', 'admin');
  const r6 = he(items, 'apple', 'admin');
  const r7 = he([], 'anything', 'admin');
  const nf = new fns.NotFoundError('test');
  const pe = new fns.PermissionError('delete');
  return [
    { pass: r1 === 'Found: banana', description: 'Admin finds banana: "Found: banana"', got: r1 },
    { pass: r2 === 'Missing: grape not found', description: 'Admin, grape missing: "Missing: grape not found"', got: r2 },
    { pass: r3 === 'Denied: Not allowed to view items', description: 'Guest denied: "Denied: Not allowed to view items"', got: r3 },
    { pass: r4 === 'Denied: Not allowed to view items', description: 'Guest denied even for missing item (permission checked first)', got: r4 },
    { pass: r5 === 'Found: cherry', description: 'Admin finds cherry: "Found: cherry"', got: r5 },
    { pass: r6 === 'Found: apple', description: 'Admin finds apple: "Found: apple"', got: r6 },
    { pass: r7 === 'Missing: anything not found', description: 'Empty list: "Missing: anything not found"', got: r7 },
    { pass: nf instanceof Error && nf.name === 'NotFoundError', description: 'NotFoundError extends Error with correct name', got: nf.name + ' instanceof Error: ' + (nf instanceof Error) },
    { pass: pe instanceof Error && pe.message === 'Not allowed to delete', description: 'PermissionError extends Error with correct message', got: pe.message }
  ];
}`,
    hints: [
      'Create two error classes extending Error. In `handleErrors`, use `instanceof` to check which type of error was caught: `if (error instanceof NotFoundError)` vs `if (error instanceof PermissionError)`.',
      'In `handleLookup`, check role first (throw PermissionError), then check if name is in items (throw NotFoundError). In `handleErrors`, wrap `handleLookup()` in try/catch and use `instanceof` to format different responses.',
    ],
    resources: customErrorRes,
  },

  // ══════════════════════════════════════════════════════════════════════════
  // SUB-SECTION D: Applied Error Handling (3 exercises, IDs 1284-1286)
  // ══════════════════════════════════════════════════════════════════════════

  // 10. Parse or Default
  {
    id: 1284,
    title: 'Parse or Default',
    type: 'js',
    tier: 3,
    category: ['js-fundamentals', 'error-handling'],
    tags: ['try', 'catch', 'JSON', 'parse', 'default-value', 'pattern'],
    description:
      'Write a function that attempts to parse data and returns a default value on failure instead of crashing.',
    starterCode:
      '/**\n * @param {string} jsonString - A string to attempt to parse as JSON\n * @param {*} defaultValue - The value to return if parsing fails\n * @returns {*} The parsed value on success, or defaultValue on failure\n */\nfunction parseOrDefault(jsonString, defaultValue) {\n\n}\n',
    solution:
      'function parseOrDefault(jsonString, defaultValue) {\n  try {\n    return JSON.parse(jsonString);\n  } catch (error) {\n    return defaultValue;\n  }\n}',
    testRunner: `(code) => {
  const fn = new Function(code + '; return parseOrDefault;')();
  const r1 = fn('{"a":1}', {});
  const r2 = fn('bad json', {});
  const r3 = fn('[1,2]', []);
  const r4 = fn('not valid', []);
  const r5 = fn('42', 0);
  const r6 = fn('', 'fallback');
  const r7 = fn('null', 'default');
  const r8 = fn('"hello"', 'default');
  const r9 = fn('{missing}', null);
  return [
    { pass: r1.a === 1, description: '{"a":1} parses to object with a:1', got: JSON.stringify(r1) },
    { pass: JSON.stringify(r2) === '{}', description: 'Bad JSON returns default {}', got: JSON.stringify(r2) },
    { pass: JSON.stringify(r3) === '[1,2]', description: '[1,2] parses to array', got: JSON.stringify(r3) },
    { pass: JSON.stringify(r4) === '[]', description: 'Invalid returns default []', got: JSON.stringify(r4) },
    { pass: r5 === 42, description: '"42" parses to 42', got: String(r5) },
    { pass: r6 === 'fallback', description: 'Empty string returns "fallback"', got: String(r6) },
    { pass: r7 === null, description: '"null" parses to null (not the default)', got: String(r7) },
    { pass: r8 === 'hello', description: '"hello" (JSON string) parses to "hello"', got: String(r8) },
    { pass: r9 === null, description: 'Invalid JSON returns null default', got: String(r9) }
  ];
}`,
    hints: [
      'Wrap `JSON.parse(jsonString)` in a `try` block and return the result. In the `catch` block, return `defaultValue`. This is one of the most common try/catch patterns.',
      'The entire function is just: `try { return JSON.parse(jsonString); } catch (error) { return defaultValue; }`. The catch block ignores the error details and just falls back.',
    ],
    resources: tryCatchRes,
  },

  // 11. Safe Wrapper
  {
    id: 1285,
    title: 'Safe Wrapper',
    type: 'js',
    tier: 3,
    category: ['js-fundamentals', 'error-handling'],
    tags: ['higher-order', 'try', 'catch', 'wrapper', 'pattern'],
    description:
      'Write a higher-order function that wraps any function in try/catch and returns a safe version that never throws.',
    starterCode:
      '/**\n * @param {Function} fn - Any function that might throw\n * @returns {Function} A new function that:\n *   - Calls fn with whatever arguments are passed\n *   - Returns { success: true, data: <result> } if fn succeeds\n *   - Returns { success: false, error: <message> } if fn throws\n */\nfunction makeSafe(fn) {\n\n}\n',
    solution:
      'function makeSafe(fn) {\n  return function(...args) {\n    try {\n      const result = fn(...args);\n      return { success: true, data: result };\n    } catch (error) {\n      return { success: false, error: error.message };\n    }\n  };\n}',
    testRunner: `(code) => {
  const fn = new Function(code + '; return makeSafe;')();
  const safeParse = fn(JSON.parse);
  const r1 = safeParse('{"a":1}');
  const r2 = safeParse('bad');
  const safeDiv = fn((a, b) => { if (b === 0) throw new Error('div by zero'); return a / b; });
  const r3 = safeDiv(10, 2);
  const r4 = safeDiv(10, 0);
  const safeId = fn((x) => x);
  const r5 = safeId(42);
  const r6 = safeId('hello');
  const safeThrow = fn(() => { throw new TypeError('always fails'); });
  const r7 = safeThrow();
  const safeMulti = fn((a, b, c) => a + b + c);
  const r8 = safeMulti(1, 2, 3);
  const r9 = fn(() => null)();
  return [
    { pass: r1.success === true && r1.data.a === 1, description: 'Safe JSON.parse with valid JSON succeeds', got: JSON.stringify(r1) },
    { pass: r2.success === false && typeof r2.error === 'string', description: 'Safe JSON.parse with invalid JSON returns error', got: JSON.stringify(r2) },
    { pass: r3.success === true && r3.data === 5, description: 'Safe divide 10/2 succeeds with 5', got: JSON.stringify(r3) },
    { pass: r4.success === false && r4.error === 'div by zero', description: 'Safe divide by 0 returns error', got: JSON.stringify(r4) },
    { pass: r5.success === true && r5.data === 42, description: 'Safe identity with 42 succeeds', got: JSON.stringify(r5) },
    { pass: r6.success === true && r6.data === 'hello', description: 'Safe identity with "hello" succeeds', got: JSON.stringify(r6) },
    { pass: r7.success === false && r7.error === 'always fails', description: 'Always-throw function returns error', got: JSON.stringify(r7) },
    { pass: r8.success === true && r8.data === 6, description: 'Safe multi-arg function (1+2+3) succeeds with 6', got: JSON.stringify(r8) },
    { pass: r9.success === true && r9.data === null, description: 'Function returning null succeeds with data: null', got: JSON.stringify(r9) }
  ];
}`,
    hints: [
      'Return a new function that uses `...args` to accept any arguments. Inside it, call `fn(...args)` inside a `try` block. This combines higher-order functions (Section 2) with error handling.',
      'The structure is: `return function(...args) { try { const result = fn(...args); return { success: true, data: result }; } catch (error) { return { success: false, error: error.message }; } };`',
    ],
    resources: [...tryCatchRes, { label: 'MDN: Rest parameters', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters', description: 'Rest parameters reference' }],
  },

  // 12. Error Handling: Combined
  {
    id: 1286,
    title: 'Error Handling: Combined',
    type: 'js',
    tier: 3,
    category: ['js-fundamentals', 'error-handling'],
    tags: ['try', 'catch', 'throw', 'custom-error', 'instanceof', 'combined'],
    description:
      'Write a config loader that uses custom errors, validation, and try/catch to handle multiple failure modes gracefully.',
    starterCode:
      '/**\n * ConfigError extends Error\n *   constructor(key, reason) — message: "Config error [key]: reason"\n *   this.name = "ConfigError", this.key = key\n *\n * loadConfig(jsonString)\n *   @param {string} jsonString - JSON string of config data\n *   @returns {{ success: boolean, config: object|null, errors: string[] }}\n *\n *   1. Parse jsonString (if invalid JSON, return { success: false, config: null, errors: ["Invalid JSON: <parse error message>"] })\n *   2. Validate required keys: "host" (string), "port" (number 1-65535)\n *      For each missing/invalid key, collect a ConfigError (don\'t stop at the first)\n *   3. If errors collected: return { success: false, config: null, errors: [<error messages>] }\n *   4. If valid: return { success: true, config: { host, port }, errors: [] }\n */\n',
    solution:
      'class ConfigError extends Error {\n  constructor(key, reason) {\n    super("Config error [" + key + "]: " + reason);\n    this.name = "ConfigError";\n    this.key = key;\n  }\n}\n\nfunction loadConfig(jsonString) {\n  let parsed;\n  try {\n    parsed = JSON.parse(jsonString);\n  } catch (error) {\n    return { success: false, config: null, errors: ["Invalid JSON: " + error.message] };\n  }\n\n  const errors = [];\n\n  if (typeof parsed.host !== "string" || parsed.host.trim() === "") {\n    errors.push(new ConfigError("host", "must be a non-empty string"));\n  }\n\n  if (typeof parsed.port !== "number" || parsed.port < 1 || parsed.port > 65535) {\n    errors.push(new ConfigError("port", "must be a number between 1 and 65535"));\n  }\n\n  if (errors.length > 0) {\n    return { success: false, config: null, errors: errors.map(e => e.message) };\n  }\n\n  return { success: true, config: { host: parsed.host, port: parsed.port }, errors: [] };\n}',
    testRunner: `(code) => {
  const fns = new Function(code + '; return { loadConfig, ConfigError };')();
  const lc = fns.loadConfig;
  const r1 = lc('{"host":"localhost","port":3000}');
  const r2 = lc('not json');
  const r3 = lc('{"host":"","port":3000}');
  const r4 = lc('{"host":"localhost","port":0}');
  const r5 = lc('{"host":"localhost","port":70000}');
  const r6 = lc('{"port":3000}');
  const r7 = lc('{"host":"localhost"}');
  const r8 = lc('{}');
  const r9 = lc('{"host":"example.com","port":8080}');
  const ce = new fns.ConfigError('test', 'reason');
  return [
    { pass: r1.success === true && r1.config.host === 'localhost' && r1.config.port === 3000 && r1.errors.length === 0, description: 'Valid config: success with host/port', got: JSON.stringify(r1) },
    { pass: r2.success === false && r2.config === null && r2.errors.length === 1 && r2.errors[0].startsWith('Invalid JSON:'), description: 'Invalid JSON: one error starting with "Invalid JSON:"', got: JSON.stringify(r2) },
    { pass: r3.success === false && r3.errors.length === 1 && r3.errors[0].includes('host'), description: 'Empty host: one error about host', got: JSON.stringify(r3.errors) },
    { pass: r4.success === false && r4.errors.length === 1 && r4.errors[0].includes('port'), description: 'Port 0: one error about port', got: JSON.stringify(r4.errors) },
    { pass: r5.success === false && r5.errors.length === 1 && r5.errors[0].includes('port'), description: 'Port 70000: one error about port', got: JSON.stringify(r5.errors) },
    { pass: r6.success === false && r6.errors.length === 1 && r6.errors[0].includes('host'), description: 'Missing host: one error about host', got: JSON.stringify(r6.errors) },
    { pass: r7.success === false && r7.errors.length === 1 && r7.errors[0].includes('port'), description: 'Missing port: one error about port', got: JSON.stringify(r7.errors) },
    { pass: r8.success === false && r8.errors.length === 2, description: 'Empty object: two errors (host and port)', got: JSON.stringify(r8.errors) },
    { pass: r9.success === true && r9.config.host === 'example.com' && r9.config.port === 8080, description: 'Valid config example.com:8080', got: JSON.stringify(r9) }
  ];
}`,
    hints: [
      'First try to parse the JSON — if that fails, return immediately with the parse error. Then validate each field and collect ConfigError instances into an array. After all checks, return based on whether errors were collected.',
      'Use `try { parsed = JSON.parse(jsonString); } catch(e) { return { success: false, config: null, errors: [...] }; }` first. Then check `parsed.host` and `parsed.port` separately, pushing errors to an array. Return the collected error messages at the end.',
    ],
    resources: [...customErrorRes, ...tryCatchRes],
  },

];

// ─── Validation ────────────────────────────────────────────────────────────

function validate() {
  let pass = 0;
  let fail = 0;

  exercises.forEach((ex) => {
    try {
      const runner = new Function('return (' + ex.testRunner + ')')();
      const results = runner(ex.solution);
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
    `T3 Error Handling — Section 5: ${exercises.length} exercises (IDs ${exercises[0].id}-${exercises[exercises.length - 1].id})`
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
