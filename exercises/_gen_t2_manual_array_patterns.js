#!/usr/bin/env node
/**
 * Generator: T2 Manual Array Patterns (22 exercises, IDs 1120-1141)
 *
 * Part 1: Transform / Manual Map (1120-1122)
 * Part 2: Filter / Manual Filter (1123-1127)
 * Part 3: Find / Manual Find (1128-1131)
 * Part 4: Accumulate / Manual Reduce (1132-1135)
 * Part 5: Every & Some (1136-1139)
 * Part 6: Combined (1140-1141)
 *
 * Usage:
 *   node exercises/_gen_t2_manual_array_patterns.js            # Append to default-curriculum.json
 *   node exercises/_gen_t2_manual_array_patterns.js --validate  # Validate testRunners only
 */

const fs = require('fs');
const path = require('path');

const CURRICULUM_PATH = path.join(
  __dirname,
  'collections',
  'default-curriculum.json'
);

// ─── Helper: W3Schools + MDN resources for arrays ─────────────────────────────

const arrayResources = [
  {
    label: 'W3Schools: JavaScript Arrays',
    url: 'https://www.w3schools.com/js/js_arrays.asp',
    description: 'Array basics and methods',
  },
  {
    label: 'MDN: Array',
    url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array',
    description: 'Array reference',
  },
];

const loopResources = [
  {
    label: 'W3Schools: JavaScript For Loop',
    url: 'https://www.w3schools.com/js/js_loop_for.asp',
    description: 'For loop basics',
  },
  {
    label: 'MDN: Loops and iteration',
    url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Loops_and_iteration',
    description: 'Loop patterns',
  },
];

// ─── Exercise Definitions ────────────────────────────────────────────────────

const exercises = [
  // ═══════════════════════════════════════════════════════════════════════════
  // PART 1: Transform / Manual Map (1120-1122)
  // ═══════════════════════════════════════════════════════════════════════════

  // ── 1. Manual Map: Transform Numbers (scaffolded entry) ─────────────────
  {
    id: 1120,
    title: 'Manual Map: Transform Numbers',
    type: 'js',
    tier: 2,
    category: ['js-fundamentals', 'arrays'],
    tags: ['arrays', 'loops', 'transform', 'map-pattern'],
    description:
      'Build a new array by adding a value to each number using a loop.',
    instructions:
      'The "map" pattern creates a new array by transforming each element of an existing array. You loop through the original, apply a transformation, and push the result into a new array.\n\nWrite a function called `transformNumbers` that takes an array of `numbers` and an `addend`. Return a new array where each number has `addend` added to it.\n\nExample: `transformNumbers([1, 2, 3], 10)` returns `[11, 12, 13]`.\n\nExample: `transformNumbers([5, 10, 15], -5)` returns `[0, 5, 10]`.',
    starterCode:
      '// The "map" pattern: transform each element into something new.\n// 1. Create an empty result array\n// 2. Loop through the original array\n// 3. Transform each element and push it into result\n// 4. Return the result array\n\nfunction transformNumbers(numbers, addend) {\n  // Create an empty result array\n  // Loop through numbers\n  //   Add addend to the current number and push to result\n  // Return the result array\n}\n',
    solution:
      'function transformNumbers(numbers, addend) {\n  const result = [];\n  for (let i = 0; i < numbers.length; i++) {\n    result.push(numbers[i] + addend);\n  }\n  return result;\n}',
    testRunner: `(code) => {
  const fn = new Function(code + '; return transformNumbers;')();
  return [
    { pass: JSON.stringify(fn([1,2,3], 10)) === '[11,12,13]', description: 'transformNumbers([1,2,3], 10) returns [11,12,13]', got: JSON.stringify(fn([1,2,3], 10)) },
    { pass: JSON.stringify(fn([5,10,15], -5)) === '[0,5,10]', description: 'transformNumbers([5,10,15], -5) returns [0,5,10]', got: JSON.stringify(fn([5,10,15], -5)) },
    { pass: JSON.stringify(fn([0], 0)) === '[0]', description: 'transformNumbers([0], 0) returns [0]', got: JSON.stringify(fn([0], 0)) },
    { pass: JSON.stringify(fn([-3,-2,-1], 3)) === '[0,1,2]', description: 'transformNumbers([-3,-2,-1], 3) returns [0,1,2]', got: JSON.stringify(fn([-3,-2,-1], 3)) },
    { pass: JSON.stringify(fn([], 5)) === '[]', description: 'transformNumbers([], 5) returns [] (empty array)', got: JSON.stringify(fn([], 5)) },
    { pass: JSON.stringify(fn([100], 1)) === '[101]', description: 'transformNumbers([100], 1) returns [101] (single element)', got: JSON.stringify(fn([100], 1)) }
  ];
}`,
    hints: [
      'Start with `const result = []`. Inside a `for` loop, compute `numbers[i] + addend` and push it into `result`. Return `result` after the loop.',
      'This is the "map" pattern: create new array, loop, transform, push, return. The original array is never modified — you build a brand new one.',
    ],
    resources: [...arrayResources, ...loopResources],
  },

  // ── 2. Manual Map: Transform Strings ────────────────────────────────────
  {
    id: 1121,
    title: 'Manual Map: Transform Strings',
    type: 'js',
    tier: 2,
    category: ['js-fundamentals', 'arrays'],
    tags: ['arrays', 'loops', 'transform', 'map-pattern', 'strings'],
    description:
      'Build a new array of uppercased strings from an existing array.',
    instructions:
      'Write a function called `toUpperAll` that takes an array of `strings` and returns a new array where each string has been converted to uppercase.\n\nExample: `toUpperAll(["hello", "world"])` returns `["HELLO", "WORLD"]`.\n\nExample: `toUpperAll(["JavaScript", "is", "fun"])` returns `["JAVASCRIPT", "IS", "FUN"]`.',
    starterCode: 'function toUpperAll(strings) {\n\n}\n',
    solution:
      'function toUpperAll(strings) {\n  const result = [];\n  for (let i = 0; i < strings.length; i++) {\n    result.push(strings[i].toUpperCase());\n  }\n  return result;\n}',
    testRunner: `(code) => {
  const fn = new Function(code + '; return toUpperAll;')();
  return [
    { pass: JSON.stringify(fn(['hello','world'])) === '["HELLO","WORLD"]', description: 'toUpperAll(["hello","world"]) returns ["HELLO","WORLD"]', got: JSON.stringify(fn(['hello','world'])) },
    { pass: JSON.stringify(fn(['JavaScript','is','fun'])) === '["JAVASCRIPT","IS","FUN"]', description: 'toUpperAll(["JavaScript","is","fun"]) returns ["JAVASCRIPT","IS","FUN"]', got: JSON.stringify(fn(['JavaScript','is','fun'])) },
    { pass: JSON.stringify(fn(['ALREADY'])) === '["ALREADY"]', description: 'toUpperAll(["ALREADY"]) returns ["ALREADY"] (already uppercase)', got: JSON.stringify(fn(['ALREADY'])) },
    { pass: JSON.stringify(fn([''])) === '[""]', description: 'toUpperAll([""]) returns [""] (empty string stays empty)', got: JSON.stringify(fn([''])) },
    { pass: JSON.stringify(fn([])) === '[]', description: 'toUpperAll([]) returns [] (empty array)', got: JSON.stringify(fn([])) },
    { pass: JSON.stringify(fn(['a','b','c','d','e'])) === '["A","B","C","D","E"]', description: 'toUpperAll works with single-character strings', got: JSON.stringify(fn(['a','b','c','d','e'])) }
  ];
}`,
    hints: [
      'Use the same map pattern: create an empty array, loop through the input, push `strings[i].toUpperCase()` into the result, and return it.',
      'The `.toUpperCase()` method returns a new string — it does not modify the original. Push the returned value into your result array.',
    ],
    resources: arrayResources,
  },

  // ── 3. Manual Map: Extract Property ─────────────────────────────────────
  {
    id: 1122,
    title: 'Manual Map: Extract Property',
    type: 'js',
    tier: 2,
    category: ['js-fundamentals', 'arrays'],
    tags: ['arrays', 'loops', 'transform', 'map-pattern', 'objects'],
    description:
      'Build an array of values by extracting a specific property from each object in an array.',
    instructions:
      'Write a function called `extractProperty` that takes an array of `objects` and a `key` string. Return a new array containing the value of that key from each object.\n\nExample: `extractProperty([{name: "Alice"}, {name: "Bob"}], "name")` returns `["Alice", "Bob"]`.\n\nExample: `extractProperty([{age: 25}, {age: 30}, {age: 35}], "age")` returns `[25, 30, 35]`.',
    starterCode: 'function extractProperty(objects, key) {\n\n}\n',
    solution:
      'function extractProperty(objects, key) {\n  const result = [];\n  for (let i = 0; i < objects.length; i++) {\n    result.push(objects[i][key]);\n  }\n  return result;\n}',
    testRunner: `(code) => {
  const fn = new Function(code + '; return extractProperty;')();
  return [
    { pass: JSON.stringify(fn([{name:'Alice'},{name:'Bob'}], 'name')) === '["Alice","Bob"]', description: 'extractProperty with "name" key returns ["Alice","Bob"]', got: JSON.stringify(fn([{name:'Alice'},{name:'Bob'}], 'name')) },
    { pass: JSON.stringify(fn([{age:25},{age:30},{age:35}], 'age')) === '[25,30,35]', description: 'extractProperty with "age" key returns [25,30,35]', got: JSON.stringify(fn([{age:25},{age:30},{age:35}], 'age')) },
    { pass: JSON.stringify(fn([{x:1,y:2},{x:3,y:4}], 'x')) === '[1,3]', description: 'extractProperty with "x" key returns [1,3]', got: JSON.stringify(fn([{x:1,y:2},{x:3,y:4}], 'x')) },
    { pass: JSON.stringify(fn([{a:true},{a:false}], 'a')) === '[true,false]', description: 'extractProperty works with boolean values', got: JSON.stringify(fn([{a:true},{a:false}], 'a')) },
    { pass: JSON.stringify(fn([], 'name')) === '[]', description: 'extractProperty([]) returns [] (empty array)', got: JSON.stringify(fn([], 'name')) },
    { pass: JSON.stringify(fn([{name:'Solo'}], 'name')) === '["Solo"]', description: 'extractProperty works with single-element array', got: JSON.stringify(fn([{name:'Solo'}], 'name')) }
  ];
}`,
    hints: [
      'Use bracket notation `objects[i][key]` to access the property dynamically. Push each value into a result array.',
      'Bracket notation lets you use a variable as the property name. `obj["name"]` is the same as `obj.name`, but brackets work with variables like `obj[key]`.',
    ],
    resources: arrayResources,
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // PART 2: Filter / Manual Filter (1123-1127)
  // ═══════════════════════════════════════════════════════════════════════════

  // ── 4. Manual Filter: Even Numbers (scaffolded entry) ───────────────────
  {
    id: 1123,
    title: 'Manual Filter: Even Numbers',
    type: 'js',
    tier: 2,
    category: ['js-fundamentals', 'arrays'],
    tags: ['arrays', 'loops', 'filter', 'filter-pattern'],
    description:
      'Build a new array containing only the even numbers from an existing array.',
    instructions:
      'The "filter" pattern creates a new array containing only elements that pass a condition. You loop through the original, test each element, and push only the ones that pass.\n\nWrite a function called `filterEvens` that takes an array of `numbers` and returns a new array containing only the even numbers.\n\nExample: `filterEvens([1, 2, 3, 4, 5, 6])` returns `[2, 4, 6]`.\n\nExample: `filterEvens([7, 8, 9])` returns `[8]`.',
    starterCode:
      '// The "filter" pattern: keep only elements that pass a test.\n// 1. Create an empty result array\n// 2. Loop through the original array\n// 3. If the element passes the condition, push it into result\n// 4. Return the result array\n\nfunction filterEvens(numbers) {\n  // Create an empty result array\n  // Loop through numbers\n  //   If the current number is even (number % 2 === 0), push it\n  // Return the result array\n}\n',
    solution:
      'function filterEvens(numbers) {\n  const result = [];\n  for (let i = 0; i < numbers.length; i++) {\n    if (numbers[i] % 2 === 0) {\n      result.push(numbers[i]);\n    }\n  }\n  return result;\n}',
    testRunner: `(code) => {
  const fn = new Function(code + '; return filterEvens;')();
  return [
    { pass: JSON.stringify(fn([1,2,3,4,5,6])) === '[2,4,6]', description: 'filterEvens([1,2,3,4,5,6]) returns [2,4,6]', got: JSON.stringify(fn([1,2,3,4,5,6])) },
    { pass: JSON.stringify(fn([7,8,9])) === '[8]', description: 'filterEvens([7,8,9]) returns [8]', got: JSON.stringify(fn([7,8,9])) },
    { pass: JSON.stringify(fn([2,4,6])) === '[2,4,6]', description: 'filterEvens([2,4,6]) returns [2,4,6] (all even)', got: JSON.stringify(fn([2,4,6])) },
    { pass: JSON.stringify(fn([1,3,5])) === '[]', description: 'filterEvens([1,3,5]) returns [] (all odd)', got: JSON.stringify(fn([1,3,5])) },
    { pass: JSON.stringify(fn([])) === '[]', description: 'filterEvens([]) returns [] (empty array)', got: JSON.stringify(fn([])) },
    { pass: JSON.stringify(fn([0,-2,3,-4])) === '[0,-2,-4]', description: 'filterEvens([0,-2,3,-4]) returns [0,-2,-4] (zero and negatives)', got: JSON.stringify(fn([0,-2,3,-4])) }
  ];
}`,
    hints: [
      'Start with `const result = []`. Inside the loop, use `if (numbers[i] % 2 === 0)` to test if the number is even. If it is, push it into `result`.',
      'The modulo operator `%` gives the remainder after division. Even numbers have a remainder of 0 when divided by 2. The original array is never modified.',
    ],
    resources: [...arrayResources, ...loopResources],
  },

  // ── 5. Manual Filter: Odd Numbers ───────────────────────────────────────
  {
    id: 1124,
    title: 'Manual Filter: Odd Numbers',
    type: 'js',
    tier: 2,
    category: ['js-fundamentals', 'arrays'],
    tags: ['arrays', 'loops', 'filter', 'filter-pattern'],
    description:
      'Build a new array containing only the odd numbers from an existing array.',
    instructions:
      'Write a function called `filterOdds` that takes an array of `numbers` and returns a new array containing only the odd numbers.\n\nExample: `filterOdds([1, 2, 3, 4, 5, 6])` returns `[1, 3, 5]`.\n\nExample: `filterOdds([10, 21, 30])` returns `[21]`.',
    starterCode: 'function filterOdds(numbers) {\n\n}\n',
    solution:
      'function filterOdds(numbers) {\n  const result = [];\n  for (let i = 0; i < numbers.length; i++) {\n    if (numbers[i] % 2 !== 0) {\n      result.push(numbers[i]);\n    }\n  }\n  return result;\n}',
    testRunner: `(code) => {
  const fn = new Function(code + '; return filterOdds;')();
  return [
    { pass: JSON.stringify(fn([1,2,3,4,5,6])) === '[1,3,5]', description: 'filterOdds([1,2,3,4,5,6]) returns [1,3,5]', got: JSON.stringify(fn([1,2,3,4,5,6])) },
    { pass: JSON.stringify(fn([10,21,30])) === '[21]', description: 'filterOdds([10,21,30]) returns [21]', got: JSON.stringify(fn([10,21,30])) },
    { pass: JSON.stringify(fn([1,3,5])) === '[1,3,5]', description: 'filterOdds([1,3,5]) returns [1,3,5] (all odd)', got: JSON.stringify(fn([1,3,5])) },
    { pass: JSON.stringify(fn([2,4,6])) === '[]', description: 'filterOdds([2,4,6]) returns [] (all even)', got: JSON.stringify(fn([2,4,6])) },
    { pass: JSON.stringify(fn([])) === '[]', description: 'filterOdds([]) returns [] (empty array)', got: JSON.stringify(fn([])) },
    { pass: JSON.stringify(fn([-1,-2,-3])) === '[-1,-3]', description: 'filterOdds([-1,-2,-3]) returns [-1,-3] (negative odds)', got: JSON.stringify(fn([-1,-2,-3])) }
  ];
}`,
    hints: [
      'This is the same filter pattern as `filterEvens`, but the condition is flipped: `numbers[i] % 2 !== 0` checks for odd numbers.',
      'A number is odd when dividing by 2 leaves a remainder. Both `!== 0` and `=== 1` work, but `!== 0` also handles negative numbers correctly.',
    ],
    resources: arrayResources,
  },

  // ── 6. Manual Filter: By Length ─────────────────────────────────────────
  {
    id: 1125,
    title: 'Manual Filter: By Length',
    type: 'js',
    tier: 2,
    category: ['js-fundamentals', 'arrays'],
    tags: ['arrays', 'loops', 'filter', 'filter-pattern', 'strings'],
    description:
      'Build a new array of strings that meet a minimum length requirement.',
    instructions:
      'Write a function called `filterByLength` that takes an array of `strings` and a `minLength` number. Return a new array containing only the strings whose length is greater than or equal to `minLength`.\n\nExample: `filterByLength(["hi", "hello", "hey", "howdy"], 4)` returns `["hello", "howdy"]`.\n\nExample: `filterByLength(["a", "bb", "ccc"], 2)` returns `["bb", "ccc"]`.',
    starterCode: 'function filterByLength(strings, minLength) {\n\n}\n',
    solution:
      'function filterByLength(strings, minLength) {\n  const result = [];\n  for (let i = 0; i < strings.length; i++) {\n    if (strings[i].length >= minLength) {\n      result.push(strings[i]);\n    }\n  }\n  return result;\n}',
    testRunner: `(code) => {
  const fn = new Function(code + '; return filterByLength;')();
  return [
    { pass: JSON.stringify(fn(['hi','hello','hey','howdy'], 4)) === '["hello","howdy"]', description: 'filterByLength with minLength 4 returns ["hello","howdy"]', got: JSON.stringify(fn(['hi','hello','hey','howdy'], 4)) },
    { pass: JSON.stringify(fn(['a','bb','ccc'], 2)) === '["bb","ccc"]', description: 'filterByLength(["a","bb","ccc"], 2) returns ["bb","ccc"]', got: JSON.stringify(fn(['a','bb','ccc'], 2)) },
    { pass: JSON.stringify(fn(['short','medium','extraordinarily'], 10)) === '["extraordinarily"]', description: 'filterByLength with minLength 10 returns only long strings', got: JSON.stringify(fn(['short','medium','extraordinarily'], 10)) },
    { pass: JSON.stringify(fn(['abc','def'], 3)) === '["abc","def"]', description: 'filterByLength keeps strings equal to minLength', got: JSON.stringify(fn(['abc','def'], 3)) },
    { pass: JSON.stringify(fn(['a','b'], 5)) === '[]', description: 'filterByLength returns [] when no strings are long enough', got: JSON.stringify(fn(['a','b'], 5)) },
    { pass: JSON.stringify(fn([], 1)) === '[]', description: 'filterByLength([]) returns [] (empty array)', got: JSON.stringify(fn([], 1)) }
  ];
}`,
    hints: [
      'Inside the loop, check `strings[i].length >= minLength`. If the string is long enough, push it into the result array.',
      'The `.length` property on a string returns its character count. The `>=` operator means "greater than or equal to," so strings exactly at `minLength` are included.',
    ],
    resources: arrayResources,
  },

  // ── 7. Manual Filter: By Key ────────────────────────────────────────────
  {
    id: 1126,
    title: 'Manual Filter: By Key',
    type: 'js',
    tier: 2,
    category: ['js-fundamentals', 'arrays'],
    tags: ['arrays', 'loops', 'filter', 'filter-pattern', 'objects'],
    description:
      'Build a new array of objects where a specific property matches a given value.',
    instructions:
      'Write a function called `filterByKey` that takes an array of `objects`, a `key` string, and a `value`. Return a new array containing only the objects where `obj[key]` equals `value`.\n\nExample: `filterByKey([{color: "red"}, {color: "blue"}, {color: "red"}], "color", "red")` returns `[{color: "red"}, {color: "red"}]`.\n\nExample: `filterByKey([{age: 20}, {age: 30}], "age", 30)` returns `[{age: 30}]`.',
    starterCode: 'function filterByKey(objects, key, value) {\n\n}\n',
    solution:
      'function filterByKey(objects, key, value) {\n  const result = [];\n  for (let i = 0; i < objects.length; i++) {\n    if (objects[i][key] === value) {\n      result.push(objects[i]);\n    }\n  }\n  return result;\n}',
    testRunner: `(code) => {
  const fn = new Function(code + '; return filterByKey;')();
  return [
    { pass: JSON.stringify(fn([{color:'red'},{color:'blue'},{color:'red'}], 'color', 'red')) === '[{"color":"red"},{"color":"red"}]', description: 'filterByKey filters by color "red"', got: JSON.stringify(fn([{color:'red'},{color:'blue'},{color:'red'}], 'color', 'red')) },
    { pass: JSON.stringify(fn([{age:20},{age:30}], 'age', 30)) === '[{"age":30}]', description: 'filterByKey filters by age 30', got: JSON.stringify(fn([{age:20},{age:30}], 'age', 30)) },
    { pass: JSON.stringify(fn([{status:'active'},{status:'inactive'},{status:'active'}], 'status', 'active')) === '[{"status":"active"},{"status":"active"}]', description: 'filterByKey filters by status "active"', got: JSON.stringify(fn([{status:'active'},{status:'inactive'},{status:'active'}], 'status', 'active')) },
    { pass: JSON.stringify(fn([{x:1},{x:2},{x:3}], 'x', 99)) === '[]', description: 'filterByKey returns [] when no match', got: JSON.stringify(fn([{x:1},{x:2},{x:3}], 'x', 99)) },
    { pass: JSON.stringify(fn([], 'a', 1)) === '[]', description: 'filterByKey([]) returns [] (empty array)', got: JSON.stringify(fn([], 'a', 1)) },
    { pass: JSON.stringify(fn([{done:true},{done:false},{done:true}], 'done', true)) === '[{"done":true},{"done":true}]', description: 'filterByKey works with boolean values', got: JSON.stringify(fn([{done:true},{done:false},{done:true}], 'done', true)) }
  ];
}`,
    hints: [
      'Use bracket notation `objects[i][key]` to access the property. Compare it to `value` with `===` and push matching objects into the result.',
      'Bracket notation is required here because `key` is a variable. `objects[i].key` would look for a property literally named "key" instead of using the variable.',
    ],
    resources: arrayResources,
  },

  // ── 8. Manual Filter: Exclude by Key ────────────────────────────────────
  {
    id: 1127,
    title: 'Manual Filter: Exclude by Key',
    type: 'js',
    tier: 2,
    category: ['js-fundamentals', 'arrays'],
    tags: ['arrays', 'loops', 'filter', 'filter-pattern', 'objects'],
    description:
      'Build a new array of objects where a specific property does not match a given value.',
    instructions:
      'Write a function called `excludeByKey` that takes an array of `objects`, a `key` string, and a `value`. Return a new array containing only the objects where `obj[key]` does NOT equal `value`.\n\nExample: `excludeByKey([{role: "admin"}, {role: "user"}, {role: "user"}], "role", "admin")` returns `[{role: "user"}, {role: "user"}]`.\n\nExample: `excludeByKey([{score: 0}, {score: 85}], "score", 0)` returns `[{score: 85}]`.',
    starterCode: 'function excludeByKey(objects, key, value) {\n\n}\n',
    solution:
      'function excludeByKey(objects, key, value) {\n  const result = [];\n  for (let i = 0; i < objects.length; i++) {\n    if (objects[i][key] !== value) {\n      result.push(objects[i]);\n    }\n  }\n  return result;\n}',
    testRunner: `(code) => {
  const fn = new Function(code + '; return excludeByKey;')();
  return [
    { pass: JSON.stringify(fn([{role:'admin'},{role:'user'},{role:'user'}], 'role', 'admin')) === '[{"role":"user"},{"role":"user"}]', description: 'excludeByKey removes admin role objects', got: JSON.stringify(fn([{role:'admin'},{role:'user'},{role:'user'}], 'role', 'admin')) },
    { pass: JSON.stringify(fn([{score:0},{score:85}], 'score', 0)) === '[{"score":85}]', description: 'excludeByKey removes objects with score 0', got: JSON.stringify(fn([{score:0},{score:85}], 'score', 0)) },
    { pass: JSON.stringify(fn([{type:'a'},{type:'b'},{type:'c'}], 'type', 'z')) === '[{"type":"a"},{"type":"b"},{"type":"c"}]', description: 'excludeByKey keeps all when value not found', got: JSON.stringify(fn([{type:'a'},{type:'b'},{type:'c'}], 'type', 'z')) },
    { pass: JSON.stringify(fn([{x:1},{x:1},{x:1}], 'x', 1)) === '[]', description: 'excludeByKey returns [] when all match', got: JSON.stringify(fn([{x:1},{x:1},{x:1}], 'x', 1)) },
    { pass: JSON.stringify(fn([], 'a', 1)) === '[]', description: 'excludeByKey([]) returns [] (empty array)', got: JSON.stringify(fn([], 'a', 1)) },
    { pass: JSON.stringify(fn([{active:true},{active:false}], 'active', false)) === '[{"active":true}]', description: 'excludeByKey works with boolean values', got: JSON.stringify(fn([{active:true},{active:false}], 'active', false)) }
  ];
}`,
    hints: [
      'This is the mirror of `filterByKey`. Instead of `===`, use `!==` to keep objects that do NOT match the value.',
      'The `!==` operator means "not strictly equal to." It checks both value and type, so `0 !== false` is `true` (different types).',
    ],
    resources: arrayResources,
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // PART 3: Find / Manual Find (1128-1131)
  // ═══════════════════════════════════════════════════════════════════════════

  // ── 9. Manual Find: First Match ─────────────────────────────────────────
  {
    id: 1128,
    title: 'Manual Find: First Match',
    type: 'js',
    tier: 2,
    category: ['js-fundamentals', 'arrays'],
    tags: ['arrays', 'loops', 'find', 'find-pattern'],
    description:
      'Find and return the first number greater than a target value, or null if none exists.',
    instructions:
      'Write a function called `findFirstAbove` that takes an array of `numbers` and a `target`. Return the first number that is greater than `target`. If no number is greater, return `null`.\n\nExample: `findFirstAbove([3, 7, 2, 9, 1], 5)` returns `7`.\n\nExample: `findFirstAbove([1, 2, 3], 10)` returns `null`.',
    starterCode: 'function findFirstAbove(numbers, target) {\n\n}\n',
    solution:
      'function findFirstAbove(numbers, target) {\n  for (let i = 0; i < numbers.length; i++) {\n    if (numbers[i] > target) {\n      return numbers[i];\n    }\n  }\n  return null;\n}',
    testRunner: `(code) => {
  const fn = new Function(code + '; return findFirstAbove;')();
  return [
    { pass: fn([3,7,2,9,1], 5) === 7, description: 'findFirstAbove([3,7,2,9,1], 5) returns 7', got: String(fn([3,7,2,9,1], 5)) },
    { pass: fn([1,2,3], 10) === null, description: 'findFirstAbove([1,2,3], 10) returns null (none above)', got: String(fn([1,2,3], 10)) },
    { pass: fn([10,20,30], 0) === 10, description: 'findFirstAbove([10,20,30], 0) returns 10 (first element)', got: String(fn([10,20,30], 0)) },
    { pass: fn([5,5,5], 5) === null, description: 'findFirstAbove([5,5,5], 5) returns null (equal is not above)', got: String(fn([5,5,5], 5)) },
    { pass: fn([], 1) === null, description: 'findFirstAbove([], 1) returns null (empty array)', got: String(fn([], 1)) },
    { pass: fn([-5,-1,0,3], -2) === -1, description: 'findFirstAbove([-5,-1,0,3], -2) returns -1 (first above -2)', got: String(fn([-5,-1,0,3], -2)) }
  ];
}`,
    hints: [
      'Loop through the array and check if `numbers[i] > target`. The moment you find one, `return` it immediately — no need to keep looking.',
      'The early `return` inside the loop acts like `break` + return in one step. If the loop finishes without returning, return `null` after the loop.',
    ],
    resources: arrayResources,
  },

  // ── 10. Manual Find: Last Match ─────────────────────────────────────────
  {
    id: 1129,
    title: 'Manual Find: Last Match',
    type: 'js',
    tier: 2,
    category: ['js-fundamentals', 'arrays'],
    tags: ['arrays', 'loops', 'find', 'find-pattern'],
    description:
      'Find and return the last number greater than a target value, or null if none exists.',
    instructions:
      'Write a function called `findLastAbove` that takes an array of `numbers` and a `target`. Return the last number that is greater than `target`. If no number is greater, return `null`.\n\nExample: `findLastAbove([3, 7, 2, 9, 1], 5)` returns `9`.\n\nExample: `findLastAbove([1, 2, 3], 10)` returns `null`.',
    starterCode: 'function findLastAbove(numbers, target) {\n\n}\n',
    solution:
      'function findLastAbove(numbers, target) {\n  for (let i = numbers.length - 1; i >= 0; i--) {\n    if (numbers[i] > target) {\n      return numbers[i];\n    }\n  }\n  return null;\n}',
    testRunner: `(code) => {
  const fn = new Function(code + '; return findLastAbove;')();
  return [
    { pass: fn([3,7,2,9,1], 5) === 9, description: 'findLastAbove([3,7,2,9,1], 5) returns 9', got: String(fn([3,7,2,9,1], 5)) },
    { pass: fn([1,2,3], 10) === null, description: 'findLastAbove([1,2,3], 10) returns null (none above)', got: String(fn([1,2,3], 10)) },
    { pass: fn([10,20,30], 0) === 30, description: 'findLastAbove([10,20,30], 0) returns 30 (last element)', got: String(fn([10,20,30], 0)) },
    { pass: fn([5,5,5], 5) === null, description: 'findLastAbove([5,5,5], 5) returns null (equal is not above)', got: String(fn([5,5,5], 5)) },
    { pass: fn([], 1) === null, description: 'findLastAbove([], 1) returns null (empty array)', got: String(fn([], 1)) },
    { pass: fn([8,3,6,1], 5) === 6, description: 'findLastAbove([8,3,6,1], 5) returns 6 (last one above 5)', got: String(fn([8,3,6,1], 5)) }
  ];
}`,
    hints: [
      'To find the last match, loop backwards: start at `numbers.length - 1` and decrement. Return the first match you find — since you are going backwards, it is the last match.',
      'A backwards loop uses `for (let i = numbers.length - 1; i >= 0; i--)`. The first `return` you hit is the rightmost matching element.',
    ],
    resources: arrayResources,
  },

  // ── 11. Manual Find: First Index ────────────────────────────────────────
  {
    id: 1130,
    title: 'Manual Find: First Index',
    type: 'js',
    tier: 2,
    category: ['js-fundamentals', 'arrays'],
    tags: ['arrays', 'loops', 'find', 'find-pattern', 'index'],
    description:
      'Find the index of the first element that matches a target value, or return -1.',
    instructions:
      'Write a function called `findIndex` that takes an array of `strings` and a `target` string. Return the index of the first element that matches the target. If the target is not found, return `-1`.\n\nExample: `findIndex(["apple", "banana", "cherry"], "banana")` returns `1`.\n\nExample: `findIndex(["a", "b", "c"], "z")` returns `-1`.',
    starterCode: 'function findIndex(strings, target) {\n\n}\n',
    solution:
      'function findIndex(strings, target) {\n  for (let i = 0; i < strings.length; i++) {\n    if (strings[i] === target) {\n      return i;\n    }\n  }\n  return -1;\n}',
    testRunner: `(code) => {
  const fn = new Function(code + '; return findIndex;')();
  return [
    { pass: fn(['apple','banana','cherry'], 'banana') === 1, description: 'findIndex finds "banana" at index 1', got: String(fn(['apple','banana','cherry'], 'banana')) },
    { pass: fn(['a','b','c'], 'z') === -1, description: 'findIndex returns -1 when target not found', got: String(fn(['a','b','c'], 'z')) },
    { pass: fn(['x','y','x'], 'x') === 0, description: 'findIndex returns first occurrence (index 0)', got: String(fn(['x','y','x'], 'x')) },
    { pass: fn(['only'], 'only') === 0, description: 'findIndex works with single-element array', got: String(fn(['only'], 'only')) },
    { pass: fn([], 'anything') === -1, description: 'findIndex returns -1 for empty array', got: String(fn([], 'anything')) },
    { pass: fn(['hello','Hello'], 'Hello') === 1, description: 'findIndex uses strict equality (case-sensitive)', got: String(fn(['hello','Hello'], 'Hello')) }
  ];
}`,
    hints: [
      'Loop through the array with a standard `for` loop. When `strings[i] === target`, return `i` immediately. If the loop ends without a match, return `-1`.',
      'Returning `-1` when not found is a common convention in JavaScript — built-in methods like `.indexOf()` use the same pattern. Your function is a manual version of that.',
    ],
    resources: arrayResources,
  },

  // ── 12. Manual Find: All Indices ────────────────────────────────────────
  {
    id: 1131,
    title: 'Manual Find: All Indices',
    type: 'js',
    tier: 2,
    category: ['js-fundamentals', 'arrays'],
    tags: ['arrays', 'loops', 'find', 'find-pattern', 'index'],
    description:
      'Find all indices where a target value appears in an array.',
    instructions:
      'Write a function called `findAllIndices` that takes an `array` and a `target` value. Return an array of all indices where the target appears. If the target is not found, return an empty array.\n\nExample: `findAllIndices([1, 2, 3, 2, 1], 2)` returns `[1, 3]`.\n\nExample: `findAllIndices(["a", "b", "a", "b", "a"], "a")` returns `[0, 2, 4]`.',
    starterCode: 'function findAllIndices(array, target) {\n\n}\n',
    solution:
      'function findAllIndices(array, target) {\n  const indices = [];\n  for (let i = 0; i < array.length; i++) {\n    if (array[i] === target) {\n      indices.push(i);\n    }\n  }\n  return indices;\n}',
    testRunner: `(code) => {
  const fn = new Function(code + '; return findAllIndices;')();
  return [
    { pass: JSON.stringify(fn([1,2,3,2,1], 2)) === '[1,3]', description: 'findAllIndices([1,2,3,2,1], 2) returns [1,3]', got: JSON.stringify(fn([1,2,3,2,1], 2)) },
    { pass: JSON.stringify(fn(['a','b','a','b','a'], 'a')) === '[0,2,4]', description: 'findAllIndices(["a","b","a","b","a"], "a") returns [0,2,4]', got: JSON.stringify(fn(['a','b','a','b','a'], 'a')) },
    { pass: JSON.stringify(fn([5,5,5], 5)) === '[0,1,2]', description: 'findAllIndices([5,5,5], 5) returns [0,1,2] (all match)', got: JSON.stringify(fn([5,5,5], 5)) },
    { pass: JSON.stringify(fn([1,2,3], 99)) === '[]', description: 'findAllIndices([1,2,3], 99) returns [] (no match)', got: JSON.stringify(fn([1,2,3], 99)) },
    { pass: JSON.stringify(fn([], 1)) === '[]', description: 'findAllIndices([], 1) returns [] (empty array)', got: JSON.stringify(fn([], 1)) },
    { pass: JSON.stringify(fn([true,false,true], true)) === '[0,2]', description: 'findAllIndices works with boolean values', got: JSON.stringify(fn([true,false,true], true)) }
  ];
}`,
    hints: [
      'This combines the find and filter patterns: create an empty `indices` array, loop through, and whenever `array[i] === target`, push `i` (the index, not the value) into `indices`.',
      'Unlike `findIndex` which returns early on the first match, this function must check every element to collect all matching indices.',
    ],
    resources: arrayResources,
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // PART 4: Accumulate / Manual Reduce (1132-1135)
  // ═══════════════════════════════════════════════════════════════════════════

  // ── 13. Manual Reduce: Sum (scaffolded entry) ───────────────────────────
  {
    id: 1132,
    title: 'Manual Reduce: Sum',
    type: 'js',
    tier: 2,
    category: ['js-fundamentals', 'arrays'],
    tags: ['arrays', 'loops', 'accumulate', 'reduce-pattern'],
    description:
      'Calculate the sum of all numbers in an array using an accumulator variable.',
    instructions:
      'The "reduce" pattern collapses an entire array down to a single value using an accumulator. You start with an initial value, loop through the array, and update the accumulator on each iteration.\n\nWrite a function called `sumAll` that takes an array of `numbers` and returns their sum.\n\nExample: `sumAll([1, 2, 3, 4])` returns `10`.\n\nExample: `sumAll([10, -5, 3])` returns `8`.',
    starterCode:
      '// The "reduce" pattern: collapse an array into a single value.\n// 1. Create an accumulator variable with an initial value\n// 2. Loop through the array\n// 3. Update the accumulator with each element\n// 4. Return the accumulator\n\nfunction sumAll(numbers) {\n  // Create a sum variable starting at 0\n  // Loop through numbers\n  //   Add the current number to sum\n  // Return sum\n}\n',
    solution:
      'function sumAll(numbers) {\n  let sum = 0;\n  for (let i = 0; i < numbers.length; i++) {\n    sum += numbers[i];\n  }\n  return sum;\n}',
    testRunner: `(code) => {
  const fn = new Function(code + '; return sumAll;')();
  return [
    { pass: fn([1,2,3,4]) === 10, description: 'sumAll([1,2,3,4]) returns 10 (1+2+3+4)', got: String(fn([1,2,3,4])) },
    { pass: fn([10,-5,3]) === 8, description: 'sumAll([10,-5,3]) returns 8 (10-5+3)', got: String(fn([10,-5,3])) },
    { pass: fn([100]) === 100, description: 'sumAll([100]) returns 100 (single element)', got: String(fn([100])) },
    { pass: fn([]) === 0, description: 'sumAll([]) returns 0 (empty array)', got: String(fn([])) },
    { pass: fn([0,0,0]) === 0, description: 'sumAll([0,0,0]) returns 0 (all zeros)', got: String(fn([0,0,0])) },
    { pass: fn([-1,-2,-3]) === -6, description: 'sumAll([-1,-2,-3]) returns -6 (all negative)', got: String(fn([-1,-2,-3])) }
  ];
}`,
    hints: [
      'Start with `let sum = 0`. Inside the loop, add each number to `sum` using `sum += numbers[i]`. Return `sum` after the loop.',
      'The `+=` operator is shorthand for `sum = sum + numbers[i]`. Starting at 0 ensures adding the first number gives the correct result.',
    ],
    resources: [...arrayResources, ...loopResources],
  },

  // ── 14. Manual Reduce: Product ──────────────────────────────────────────
  {
    id: 1133,
    title: 'Manual Reduce: Product',
    type: 'js',
    tier: 2,
    category: ['js-fundamentals', 'arrays'],
    tags: ['arrays', 'loops', 'accumulate', 'reduce-pattern'],
    description:
      'Calculate the product of all numbers in an array using an accumulator variable.',
    instructions:
      'Write a function called `productAll` that takes an array of `numbers` and returns the product of all elements multiplied together. If the array is empty, return `1`.\n\nExample: `productAll([2, 3, 4])` returns `24` (2 * 3 * 4).\n\nExample: `productAll([5, 10])` returns `50` (5 * 10).',
    starterCode: 'function productAll(numbers) {\n\n}\n',
    solution:
      'function productAll(numbers) {\n  let product = 1;\n  for (let i = 0; i < numbers.length; i++) {\n    product *= numbers[i];\n  }\n  return product;\n}',
    testRunner: `(code) => {
  const fn = new Function(code + '; return productAll;')();
  return [
    { pass: fn([2,3,4]) === 24, description: 'productAll([2,3,4]) returns 24 (2*3*4)', got: String(fn([2,3,4])) },
    { pass: fn([5,10]) === 50, description: 'productAll([5,10]) returns 50 (5*10)', got: String(fn([5,10])) },
    { pass: fn([7]) === 7, description: 'productAll([7]) returns 7 (single element)', got: String(fn([7])) },
    { pass: fn([]) === 1, description: 'productAll([]) returns 1 (empty array)', got: String(fn([])) },
    { pass: fn([1,1,1,1]) === 1, description: 'productAll([1,1,1,1]) returns 1 (all ones)', got: String(fn([1,1,1,1])) },
    { pass: fn([2,-3,4]) === -24, description: 'productAll([2,-3,4]) returns -24 (negative result)', got: String(fn([2,-3,4])) },
    { pass: fn([5,0,10]) === 0, description: 'productAll([5,0,10]) returns 0 (contains zero)', got: String(fn([5,0,10])) }
  ];
}`,
    hints: [
      'This is the same reduce pattern as `sumAll`, but start with `1` instead of `0`, and use `*=` instead of `+=`.',
      'The initial value matters: for addition, start at `0` (adding 0 changes nothing). For multiplication, start at `1` (multiplying by 1 changes nothing).',
    ],
    resources: arrayResources,
  },

  // ── 15. Manual Reduce: Count Occurrences ────────────────────────────────
  {
    id: 1134,
    title: 'Manual Reduce: Count Occurrences',
    type: 'js',
    tier: 2,
    category: ['js-fundamentals', 'arrays'],
    tags: ['arrays', 'loops', 'accumulate', 'reduce-pattern', 'counting'],
    description:
      'Count how many times a target value appears in an array.',
    instructions:
      'Write a function called `countOccurrences` that takes an `array` and a `target` value. Return the number of times the target appears in the array.\n\nExample: `countOccurrences([1, 2, 3, 2, 1, 2], 2)` returns `3`.\n\nExample: `countOccurrences(["yes", "no", "yes"], "yes")` returns `2`.',
    starterCode: 'function countOccurrences(array, target) {\n\n}\n',
    solution:
      'function countOccurrences(array, target) {\n  let count = 0;\n  for (let i = 0; i < array.length; i++) {\n    if (array[i] === target) {\n      count++;\n    }\n  }\n  return count;\n}',
    testRunner: `(code) => {
  const fn = new Function(code + '; return countOccurrences;')();
  return [
    { pass: fn([1,2,3,2,1,2], 2) === 3, description: 'countOccurrences([1,2,3,2,1,2], 2) returns 3', got: String(fn([1,2,3,2,1,2], 2)) },
    { pass: fn(['yes','no','yes'], 'yes') === 2, description: 'countOccurrences(["yes","no","yes"], "yes") returns 2', got: String(fn(['yes','no','yes'], 'yes')) },
    { pass: fn([5,5,5,5], 5) === 4, description: 'countOccurrences([5,5,5,5], 5) returns 4 (all match)', got: String(fn([5,5,5,5], 5)) },
    { pass: fn([1,2,3], 99) === 0, description: 'countOccurrences([1,2,3], 99) returns 0 (no match)', got: String(fn([1,2,3], 99)) },
    { pass: fn([], 1) === 0, description: 'countOccurrences([], 1) returns 0 (empty array)', got: String(fn([], 1)) },
    { pass: fn([true,false,true,true], true) === 3, description: 'countOccurrences works with boolean values', got: String(fn([true,false,true,true], true)) }
  ];
}`,
    hints: [
      'Start with `let count = 0`. Inside the loop, check if `array[i] === target`. If it matches, increment `count` with `count++`. Return `count` after the loop.',
      'The accumulator here is a counter. Instead of adding values, you are adding 1 each time the condition is true. `count++` is shorthand for `count += 1`.',
    ],
    resources: arrayResources,
  },

  // ── 16. Manual Reduce: Build String ─────────────────────────────────────
  {
    id: 1135,
    title: 'Manual Reduce: Build String',
    type: 'js',
    tier: 2,
    category: ['js-fundamentals', 'arrays'],
    tags: ['arrays', 'loops', 'accumulate', 'reduce-pattern', 'strings'],
    description:
      'Join array elements into a single string with a separator between each element.',
    instructions:
      'Write a function called `joinWith` that takes an array of `strings` and a `separator` string. Return a single string with all elements joined by the separator. Do not add the separator before the first element or after the last element.\n\nExample: `joinWith(["a", "b", "c"], "-")` returns `"a-b-c"`.\n\nExample: `joinWith(["hello", "world"], " ")` returns `"hello world"`.',
    starterCode: 'function joinWith(strings, separator) {\n\n}\n',
    solution:
      'function joinWith(strings, separator) {\n  let result = "";\n  for (let i = 0; i < strings.length; i++) {\n    if (i > 0) {\n      result += separator;\n    }\n    result += strings[i];\n  }\n  return result;\n}',
    testRunner: `(code) => {
  const fn = new Function(code + '; return joinWith;')();
  return [
    { pass: fn(['a','b','c'], '-') === 'a-b-c', description: 'joinWith(["a","b","c"], "-") returns "a-b-c"', got: fn(['a','b','c'], '-') },
    { pass: fn(['hello','world'], ' ') === 'hello world', description: 'joinWith(["hello","world"], " ") returns "hello world"', got: fn(['hello','world'], ' ') },
    { pass: fn(['one'], ',') === 'one', description: 'joinWith(["one"], ",") returns "one" (no separator needed)', got: fn(['one'], ',') },
    { pass: fn([], '-') === '', description: 'joinWith([], "-") returns "" (empty array)', got: fn([], '-') },
    { pass: fn(['x','y','z'], ' | ') === 'x | y | z', description: 'joinWith with multi-character separator " | "', got: fn(['x','y','z'], ' | ') },
    { pass: fn(['a','b','c'], '') === 'abc', description: 'joinWith with empty separator returns "abc"', got: fn(['a','b','c'], '') }
  ];
}`,
    hints: [
      'Start with `let result = ""`. Add the separator before each element except the first. Check `if (i > 0)` to know when to add the separator.',
      'The tricky part is avoiding an extra separator at the start or end. By only adding the separator when `i > 0`, the first element gets added without one.',
    ],
    resources: arrayResources,
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // PART 5: Every & Some (1136-1139)
  // ═══════════════════════════════════════════════════════════════════════════

  // ── 17. Manual Every: All Positive ──────────────────────────────────────
  {
    id: 1136,
    title: 'Manual Every: All Positive',
    type: 'js',
    tier: 2,
    category: ['js-fundamentals', 'arrays'],
    tags: ['arrays', 'loops', 'every', 'every-pattern'],
    description:
      'Check if every number in an array is positive (greater than zero).',
    instructions:
      'Write a function called `allPositive` that takes an array of `numbers` and returns `true` if every number is greater than `0`, or `false` if any number is `0` or less.\n\nExample: `allPositive([1, 5, 3, 8])` returns `true`.\n\nExample: `allPositive([1, -2, 3])` returns `false`.',
    starterCode: 'function allPositive(numbers) {\n\n}\n',
    solution:
      'function allPositive(numbers) {\n  for (let i = 0; i < numbers.length; i++) {\n    if (numbers[i] <= 0) {\n      return false;\n    }\n  }\n  return true;\n}',
    testRunner: `(code) => {
  const fn = new Function(code + '; return allPositive;')();
  return [
    { pass: fn([1,5,3,8]) === true, description: 'allPositive([1,5,3,8]) returns true', got: String(fn([1,5,3,8])) },
    { pass: fn([1,-2,3]) === false, description: 'allPositive([1,-2,3]) returns false (contains -2)', got: String(fn([1,-2,3])) },
    { pass: fn([0,1,2]) === false, description: 'allPositive([0,1,2]) returns false (0 is not positive)', got: String(fn([0,1,2])) },
    { pass: fn([100]) === true, description: 'allPositive([100]) returns true (single positive)', got: String(fn([100])) },
    { pass: fn([-1]) === false, description: 'allPositive([-1]) returns false (single negative)', got: String(fn([-1])) },
    { pass: fn([]) === true, description: 'allPositive([]) returns true (empty array — vacuous truth)', got: String(fn([])) }
  ];
}`,
    hints: [
      'Loop through the array. If you find ANY number that is `<= 0`, return `false` immediately. If the loop finishes without finding one, return `true`.',
      'This is the "every" pattern: assume true, look for a counterexample. The moment you find one element that fails the test, you know the answer is `false`.',
    ],
    resources: arrayResources,
  },

  // ── 18. Manual Every: All Negative ──────────────────────────────────────
  {
    id: 1137,
    title: 'Manual Every: All Negative',
    type: 'js',
    tier: 2,
    category: ['js-fundamentals', 'arrays'],
    tags: ['arrays', 'loops', 'every', 'every-pattern'],
    description:
      'Check if every number in an array is negative (less than zero).',
    instructions:
      'Write a function called `allNegative` that takes an array of `numbers` and returns `true` if every number is less than `0`, or `false` if any number is `0` or greater.\n\nExample: `allNegative([-1, -5, -3])` returns `true`.\n\nExample: `allNegative([-1, 2, -3])` returns `false`.',
    starterCode: 'function allNegative(numbers) {\n\n}\n',
    solution:
      'function allNegative(numbers) {\n  for (let i = 0; i < numbers.length; i++) {\n    if (numbers[i] >= 0) {\n      return false;\n    }\n  }\n  return true;\n}',
    testRunner: `(code) => {
  const fn = new Function(code + '; return allNegative;')();
  return [
    { pass: fn([-1,-5,-3]) === true, description: 'allNegative([-1,-5,-3]) returns true', got: String(fn([-1,-5,-3])) },
    { pass: fn([-1,2,-3]) === false, description: 'allNegative([-1,2,-3]) returns false (contains 2)', got: String(fn([-1,2,-3])) },
    { pass: fn([-1,0,-3]) === false, description: 'allNegative([-1,0,-3]) returns false (0 is not negative)', got: String(fn([-1,0,-3])) },
    { pass: fn([-99]) === true, description: 'allNegative([-99]) returns true (single negative)', got: String(fn([-99])) },
    { pass: fn([1]) === false, description: 'allNegative([1]) returns false (single positive)', got: String(fn([1])) },
    { pass: fn([]) === true, description: 'allNegative([]) returns true (empty array — vacuous truth)', got: String(fn([])) }
  ];
}`,
    hints: [
      'Same "every" pattern as `allPositive`, but flip the condition: if any number is `>= 0`, return `false`.',
      'Zero is neither positive nor negative. The condition `>= 0` catches both zero and positive numbers as counterexamples.',
    ],
    resources: arrayResources,
  },

  // ── 19. Manual Some: Has Negative ───────────────────────────────────────
  {
    id: 1138,
    title: 'Manual Some: Has Negative',
    type: 'js',
    tier: 2,
    category: ['js-fundamentals', 'arrays'],
    tags: ['arrays', 'loops', 'some', 'some-pattern'],
    description:
      'Check if at least one number in an array is negative.',
    instructions:
      'Write a function called `hasNegative` that takes an array of `numbers` and returns `true` if any number is less than `0`, or `false` if all numbers are `0` or greater.\n\nExample: `hasNegative([1, -2, 3])` returns `true`.\n\nExample: `hasNegative([0, 5, 10])` returns `false`.',
    starterCode: 'function hasNegative(numbers) {\n\n}\n',
    solution:
      'function hasNegative(numbers) {\n  for (let i = 0; i < numbers.length; i++) {\n    if (numbers[i] < 0) {\n      return true;\n    }\n  }\n  return false;\n}',
    testRunner: `(code) => {
  const fn = new Function(code + '; return hasNegative;')();
  return [
    { pass: fn([1,-2,3]) === true, description: 'hasNegative([1,-2,3]) returns true (contains -2)', got: String(fn([1,-2,3])) },
    { pass: fn([0,5,10]) === false, description: 'hasNegative([0,5,10]) returns false (all non-negative)', got: String(fn([0,5,10])) },
    { pass: fn([-1]) === true, description: 'hasNegative([-1]) returns true (single negative)', got: String(fn([-1])) },
    { pass: fn([1,2,3]) === false, description: 'hasNegative([1,2,3]) returns false (all positive)', got: String(fn([1,2,3])) },
    { pass: fn([]) === false, description: 'hasNegative([]) returns false (empty array)', got: String(fn([])) },
    { pass: fn([0,0,0]) === false, description: 'hasNegative([0,0,0]) returns false (zeros are not negative)', got: String(fn([0,0,0])) }
  ];
}`,
    hints: [
      'Loop through the array. If you find ANY number that is `< 0`, return `true` immediately. If the loop finishes, return `false`.',
      'This is the "some" pattern — the mirror of "every." Instead of looking for a counterexample, you are looking for one example that passes.',
    ],
    resources: arrayResources,
  },

  // ── 20. Manual Some: Has Even ───────────────────────────────────────────
  {
    id: 1139,
    title: 'Manual Some: Has Even',
    type: 'js',
    tier: 2,
    category: ['js-fundamentals', 'arrays'],
    tags: ['arrays', 'loops', 'some', 'some-pattern'],
    description:
      'Check if at least one number in an array is even.',
    instructions:
      'Write a function called `hasEven` that takes an array of `numbers` and returns `true` if any number is even, or `false` if all numbers are odd.\n\nExample: `hasEven([1, 3, 4, 7])` returns `true`.\n\nExample: `hasEven([1, 3, 5])` returns `false`.',
    starterCode: 'function hasEven(numbers) {\n\n}\n',
    solution:
      'function hasEven(numbers) {\n  for (let i = 0; i < numbers.length; i++) {\n    if (numbers[i] % 2 === 0) {\n      return true;\n    }\n  }\n  return false;\n}',
    testRunner: `(code) => {
  const fn = new Function(code + '; return hasEven;')();
  return [
    { pass: fn([1,3,4,7]) === true, description: 'hasEven([1,3,4,7]) returns true (contains 4)', got: String(fn([1,3,4,7])) },
    { pass: fn([1,3,5]) === false, description: 'hasEven([1,3,5]) returns false (all odd)', got: String(fn([1,3,5])) },
    { pass: fn([2]) === true, description: 'hasEven([2]) returns true (single even)', got: String(fn([2])) },
    { pass: fn([0,1]) === true, description: 'hasEven([0,1]) returns true (0 is even)', got: String(fn([0,1])) },
    { pass: fn([]) === false, description: 'hasEven([]) returns false (empty array)', got: String(fn([])) },
    { pass: fn([-3,-2,-1]) === true, description: 'hasEven([-3,-2,-1]) returns true (-2 is even)', got: String(fn([-3,-2,-1])) }
  ];
}`,
    hints: [
      'Same "some" pattern as `hasNegative`, but check `numbers[i] % 2 === 0` to test for even numbers.',
      'Remember: 0 is even (0 % 2 === 0). Negative even numbers also pass the test (-2 % 2 === 0).',
    ],
    resources: arrayResources,
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // PART 6: Combined (1140-1141)
  // ═══════════════════════════════════════════════════════════════════════════

  // ── 21. Array Patterns: Combined ────────────────────────────────────────
  {
    id: 1140,
    title: 'Array Patterns: Combined',
    type: 'js',
    tier: 2,
    category: ['js-fundamentals', 'arrays'],
    tags: ['arrays', 'loops', 'combined', 'objects', 'accumulate', 'filter', 'find'],
    description:
      'Summarize an array of student objects by computing the average score, highest score, and passing student names.',
    instructions:
      'Write a function called `summarizeScores` that takes an array of `students`, where each student is an object with `name` (string) and `score` (number) properties. Return an object with:\n- `average`: the average of all scores (rounded to 1 decimal place)\n- `highest`: the highest score\n- `passing`: an array of names of students with scores >= 70\n\nIf the array is empty, return `{ average: 0, highest: 0, passing: [] }`.\n\nExample: `summarizeScores([{name: "Alice", score: 85}, {name: "Bob", score: 60}, {name: "Carol", score: 92}])` returns `{average: 79, highest: 92, passing: ["Alice", "Carol"]}`.',
    starterCode: 'function summarizeScores(students) {\n\n}\n',
    solution:
      'function summarizeScores(students) {\n  if (students.length === 0) {\n    return { average: 0, highest: 0, passing: [] };\n  }\n  let sum = 0;\n  let highest = students[0].score;\n  const passing = [];\n  for (let i = 0; i < students.length; i++) {\n    sum += students[i].score;\n    if (students[i].score > highest) {\n      highest = students[i].score;\n    }\n    if (students[i].score >= 70) {\n      passing.push(students[i].name);\n    }\n  }\n  const average = Math.round((sum / students.length) * 10) / 10;\n  return { average, highest, passing };\n}',
    testRunner: `(code) => {
  const fn = new Function(code + '; return summarizeScores;')();
  const r1 = fn([{name:'Alice',score:85},{name:'Bob',score:60},{name:'Carol',score:92}]);
  const r2 = fn([{name:'Dan',score:70}]);
  const r3 = fn([]);
  const r4 = fn([{name:'Eve',score:50},{name:'Frank',score:40}]);
  const r5 = fn([{name:'A',score:100},{name:'B',score:90},{name:'C',score:80},{name:'D',score:70},{name:'E',score:60}]);
  return [
    { pass: r1.average === 79 && r1.highest === 92 && JSON.stringify(r1.passing) === '["Alice","Carol"]', description: 'summarizeScores with mixed scores returns correct summary', got: JSON.stringify(r1) },
    { pass: r2.average === 70 && r2.highest === 70 && JSON.stringify(r2.passing) === '["Dan"]', description: 'summarizeScores with single student at 70 (passing threshold)', got: JSON.stringify(r2) },
    { pass: r3.average === 0 && r3.highest === 0 && JSON.stringify(r3.passing) === '[]', description: 'summarizeScores([]) returns zeros and empty passing', got: JSON.stringify(r3) },
    { pass: r4.average === 45 && r4.highest === 50 && JSON.stringify(r4.passing) === '[]', description: 'summarizeScores with all failing scores returns empty passing', got: JSON.stringify(r4) },
    { pass: r5.average === 80 && r5.highest === 100 && JSON.stringify(r5.passing) === '["A","B","C","D"]', description: 'summarizeScores with 5 students returns 4 passing', got: JSON.stringify(r5) }
  ];
}`,
    hints: [
      'Use one loop to do three things at once: accumulate `sum` for the average, track the `highest` score, and push passing names into an array. Handle the empty array case first.',
      'For the average, divide `sum` by `students.length` and round to 1 decimal: `Math.round((sum / students.length) * 10) / 10`. Initialize `highest` to the first student\'s score.',
    ],
    resources: arrayResources,
  },

  // ── 22. Array Patterns: Pipeline ────────────────────────────────────────
  {
    id: 1141,
    title: 'Array Patterns: Pipeline',
    type: 'js',
    tier: 2,
    category: ['js-fundamentals', 'arrays'],
    tags: ['arrays', 'loops', 'combined', 'objects', 'filter', 'transform', 'accumulate'],
    description:
      'Filter orders by status, extract their prices, and compute the total using chained manual array patterns.',
    instructions:
      'Write a function called `processOrders` that takes an array of `orders` and a `status` string. Each order is an object with `item` (string), `price` (number), and `status` (string) properties.\n\nYour function should:\n1. Filter: keep only orders matching the given status\n2. Transform: extract the prices from the filtered orders\n3. Accumulate: sum up all the prices\n\nReturn the total price.\n\nExample: `processOrders([{item: "Book", price: 15, status: "shipped"}, {item: "Pen", price: 3, status: "pending"}, {item: "Laptop", price: 999, status: "shipped"}], "shipped")` returns `1014`.',
    starterCode: 'function processOrders(orders, status) {\n\n}\n',
    solution:
      'function processOrders(orders, status) {\n  const filtered = [];\n  for (let i = 0; i < orders.length; i++) {\n    if (orders[i].status === status) {\n      filtered.push(orders[i]);\n    }\n  }\n  const prices = [];\n  for (let i = 0; i < filtered.length; i++) {\n    prices.push(filtered[i].price);\n  }\n  let total = 0;\n  for (let i = 0; i < prices.length; i++) {\n    total += prices[i];\n  }\n  return total;\n}',
    testRunner: `(code) => {
  const fn = new Function(code + '; return processOrders;')();
  const orders1 = [{item:'Book',price:15,status:'shipped'},{item:'Pen',price:3,status:'pending'},{item:'Laptop',price:999,status:'shipped'}];
  const orders2 = [{item:'A',price:10,status:'done'},{item:'B',price:20,status:'done'},{item:'C',price:30,status:'done'}];
  const orders3 = [{item:'X',price:50,status:'new'}];
  return [
    { pass: fn(orders1, 'shipped') === 1014, description: 'processOrders filters shipped orders and totals 1014 (15+999)', got: String(fn(orders1, 'shipped')) },
    { pass: fn(orders1, 'pending') === 3, description: 'processOrders filters pending orders and totals 3', got: String(fn(orders1, 'pending')) },
    { pass: fn(orders1, 'cancelled') === 0, description: 'processOrders returns 0 when no orders match status', got: String(fn(orders1, 'cancelled')) },
    { pass: fn(orders2, 'done') === 60, description: 'processOrders totals all orders when all match (10+20+30)', got: String(fn(orders2, 'done')) },
    { pass: fn(orders3, 'new') === 50, description: 'processOrders works with single matching order', got: String(fn(orders3, 'new')) },
    { pass: fn([], 'any') === 0, description: 'processOrders([]) returns 0 (empty array)', got: String(fn([], 'any')) }
  ];
}`,
    hints: [
      'Break it into three steps with three separate loops: (1) filter orders by status into a new array, (2) extract prices from filtered orders into another array, (3) sum the prices. Each step is a pattern you already know.',
      'This "pipeline" approach — filter, then transform, then accumulate — is a very common pattern. In T3, you will learn built-in methods (`.filter()`, `.map()`, `.reduce()`) that do each step in one line.',
    ],
    resources: arrayResources,
  },
];

// ─── Validation ──────────────────────────────────────────────────────────────

function validate() {
  let allPassed = true;
  for (const ex of exercises) {
    process.stdout.write(`  [${ex.id}] ${ex.title} ... `);
    try {
      const testFn = new Function('code', `return (${ex.testRunner})(code);`);
      const results = testFn(ex.solution);
      const failures = results.filter((r) => !r.pass);
      if (failures.length === 0) {
        console.log(`PASS (${results.length} tests)`);
      } else {
        console.log(`FAIL`);
        for (const f of failures) {
          console.log(`    ✗ ${f.description}`);
          console.log(`      got: ${f.got}`);
        }
        allPassed = false;
      }
    } catch (err) {
      console.log(`ERROR: ${err.message}`);
      allPassed = false;
    }
  }
  return allPassed;
}

// ─── Main ────────────────────────────────────────────────────────────────────

function main() {
  const isValidateOnly = process.argv.includes('--validate');

  console.log(`\nT2 Manual Array Patterns — ${exercises.length} exercises\n`);
  console.log('Validating testRunners against solutions...\n');

  const passed = validate();

  if (!passed) {
    console.log('\n✗ Validation failed. Fix errors before appending.\n');
    process.exit(1);
  }

  console.log('\n✓ All testRunners passed.\n');

  if (isValidateOnly) {
    return;
  }

  const raw = fs.readFileSync(CURRICULUM_PATH, 'utf-8');
  const curriculum = JSON.parse(raw);

  const existingIds = new Set(curriculum.exercises.map((e) => e.id));
  for (const ex of exercises) {
    if (existingIds.has(ex.id)) {
      console.error(`✗ ID collision: exercise ${ex.id} already exists.`);
      process.exit(1);
    }
  }

  curriculum.exercises.push(...exercises);

  fs.writeFileSync(
    CURRICULUM_PATH,
    JSON.stringify(curriculum, null, 2) + '\n',
    'utf-8'
  );

  console.log(
    `✓ Appended ${exercises.length} exercises (IDs ${exercises[0].id}-${exercises[exercises.length - 1].id}) to default-curriculum.json\n`
  );
}

main();
