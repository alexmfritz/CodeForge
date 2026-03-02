#!/usr/bin/env node
/**
 * Generator: T2 Object Patterns (18 exercises, IDs 1142-1159)
 *
 * Part 1: Iteration (1142-1145)
 * Part 2: Build & Transform (1146-1149)
 * Part 3: Merge & Combine (1150-1152)
 * Part 4: Filter & Search (1153-1155)
 * Part 5: Nested Objects (1156-1157)
 * Part 6: Combined (1158-1159)
 *
 * Usage:
 *   node exercises/_gen_t2_object_patterns.js            # Append to default-curriculum.json
 *   node exercises/_gen_t2_object_patterns.js --validate  # Validate testRunners only
 */

const fs = require('fs');
const path = require('path');

const CURRICULUM_PATH = path.join(
  __dirname,
  'collections',
  'default-curriculum.json'
);

// ─── Helper: W3Schools + MDN resources for objects ────────────────────────────

const objectResources = [
  {
    label: 'W3Schools: JavaScript Objects',
    url: 'https://www.w3schools.com/js/js_objects.asp',
    description: 'Object basics',
  },
  {
    label: 'MDN: Working with objects',
    url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_objects',
    description: 'Object guide',
  },
];

const forInResources = [
  {
    label: 'W3Schools: JavaScript For In',
    url: 'https://www.w3schools.com/js/js_loop_forin.asp',
    description: 'For...in loop',
  },
  {
    label: 'MDN: for...in',
    url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...in',
    description: 'For...in statement reference',
  },
];

// ─── Exercise Definitions ────────────────────────────────────────────────────

const exercises = [
  // ═══════════════════════════════════════════════════════════════════════════
  // PART 1: Iteration (1142-1145)
  // ═══════════════════════════════════════════════════════════════════════════

  // ── 1. Object Iteration: Keys (scaffolded entry) ───────────────────────
  {
    id: 1142,
    title: 'Object Iteration: Keys',
    type: 'js',
    tier: 2,
    category: ['js-fundamentals', 'objects'],
    tags: ['objects', 'loops', 'for-in', 'iteration'],
    description:
      'Collect all keys from an object into an array using a for...in loop.',
    instructions:
      'The `for...in` loop iterates over all enumerable properties of an object, giving you each key one at a time. This is the primary way to loop through an object\'s properties.\n\nWrite a function called `getKeys` that takes an `obj` and returns an array of all its keys.\n\nExample: `getKeys({name: "Alice", age: 25})` returns `["name", "age"]`.\n\nExample: `getKeys({x: 1, y: 2, z: 3})` returns `["x", "y", "z"]`.',
    starterCode:
      '// The for...in loop iterates over an object\'s keys.\n// On each iteration, the loop variable holds the current key (a string).\n//\n// Syntax:\n//   for (const key in obj) {\n//     // key is the property name\n//     // obj[key] is the property value\n//   }\n\nfunction getKeys(obj) {\n  // Create an empty result array\n  // Loop through the object using for...in\n  //   Push each key into the result array\n  // Return the result array\n}\n',
    solution:
      'function getKeys(obj) {\n  const result = [];\n  for (const key in obj) {\n    result.push(key);\n  }\n  return result;\n}',
    testRunner: `(code) => {
  const fn = new Function(code + '; return getKeys;')();
  return [
    { pass: JSON.stringify(fn({name:'Alice',age:25})) === '["name","age"]', description: 'getKeys({name:"Alice",age:25}) returns ["name","age"]', got: JSON.stringify(fn({name:'Alice',age:25})) },
    { pass: JSON.stringify(fn({x:1,y:2,z:3})) === '["x","y","z"]', description: 'getKeys({x:1,y:2,z:3}) returns ["x","y","z"]', got: JSON.stringify(fn({x:1,y:2,z:3})) },
    { pass: JSON.stringify(fn({solo:'value'})) === '["solo"]', description: 'getKeys with single property returns ["solo"]', got: JSON.stringify(fn({solo:'value'})) },
    { pass: JSON.stringify(fn({})) === '[]', description: 'getKeys({}) returns [] (empty object)', got: JSON.stringify(fn({})) },
    { pass: JSON.stringify(fn({a:1,b:2,c:3,d:4})) === '["a","b","c","d"]', description: 'getKeys with 4 properties returns all keys', got: JSON.stringify(fn({a:1,b:2,c:3,d:4})) },
    { pass: fn({name:'test'}).length === 1, description: 'getKeys returns correct count for single-property object', got: String(fn({name:'test'}).length) }
  ];
}`,
    hints: [
      'Use `for (const key in obj)` to loop. Inside the loop, `key` is a string holding the property name. Push it into your result array.',
      'The `for...in` loop automatically visits every enumerable property. You do not need to know the property names in advance — the loop discovers them for you.',
    ],
    resources: [...forInResources, ...objectResources],
  },

  // ── 2. Object Iteration: Values ────────────────────────────────────────
  {
    id: 1143,
    title: 'Object Iteration: Values',
    type: 'js',
    tier: 2,
    category: ['js-fundamentals', 'objects'],
    tags: ['objects', 'loops', 'for-in', 'iteration'],
    description:
      'Collect all values from an object into an array using a for...in loop.',
    instructions:
      'Write a function called `getValues` that takes an `obj` and returns an array of all its values.\n\nExample: `getValues({name: "Alice", age: 25})` returns `["Alice", 25]`.\n\nExample: `getValues({x: 1, y: 2, z: 3})` returns `[1, 2, 3]`.',
    starterCode: 'function getValues(obj) {\n\n}\n',
    solution:
      'function getValues(obj) {\n  const result = [];\n  for (const key in obj) {\n    result.push(obj[key]);\n  }\n  return result;\n}',
    testRunner: `(code) => {
  const fn = new Function(code + '; return getValues;')();
  return [
    { pass: JSON.stringify(fn({name:'Alice',age:25})) === '["Alice",25]', description: 'getValues({name:"Alice",age:25}) returns ["Alice",25]', got: JSON.stringify(fn({name:'Alice',age:25})) },
    { pass: JSON.stringify(fn({x:1,y:2,z:3})) === '[1,2,3]', description: 'getValues({x:1,y:2,z:3}) returns [1,2,3]', got: JSON.stringify(fn({x:1,y:2,z:3})) },
    { pass: JSON.stringify(fn({solo:'value'})) === '["value"]', description: 'getValues with single property returns ["value"]', got: JSON.stringify(fn({solo:'value'})) },
    { pass: JSON.stringify(fn({})) === '[]', description: 'getValues({}) returns [] (empty object)', got: JSON.stringify(fn({})) },
    { pass: JSON.stringify(fn({a:true,b:false})) === '[true,false]', description: 'getValues works with boolean values', got: JSON.stringify(fn({a:true,b:false})) },
    { pass: JSON.stringify(fn({n:null,u:0})) === '[null,0]', description: 'getValues works with null and 0', got: JSON.stringify(fn({n:null,u:0})) }
  ];
}`,
    hints: [
      'Same `for...in` loop as `getKeys`, but push `obj[key]` (the value) instead of `key` (the property name).',
      'Bracket notation `obj[key]` is required here because `key` is a variable. `obj.key` would look for a property literally named "key".',
    ],
    resources: [...forInResources, ...objectResources],
  },

  // ── 3. Object Iteration: Entries ───────────────────────────────────────
  {
    id: 1144,
    title: 'Object Iteration: Entries',
    type: 'js',
    tier: 2,
    category: ['js-fundamentals', 'objects'],
    tags: ['objects', 'loops', 'for-in', 'iteration'],
    description:
      'Collect all key-value pairs from an object as an array of two-element arrays.',
    instructions:
      'Write a function called `getEntries` that takes an `obj` and returns an array of `[key, value]` pairs.\n\nExample: `getEntries({name: "Alice", age: 25})` returns `[["name", "Alice"], ["age", 25]]`.\n\nExample: `getEntries({x: 1})` returns `[["x", 1]]`.',
    starterCode: 'function getEntries(obj) {\n\n}\n',
    solution:
      'function getEntries(obj) {\n  const result = [];\n  for (const key in obj) {\n    result.push([key, obj[key]]);\n  }\n  return result;\n}',
    testRunner: `(code) => {
  const fn = new Function(code + '; return getEntries;')();
  return [
    { pass: JSON.stringify(fn({name:'Alice',age:25})) === '[["name","Alice"],["age",25]]', description: 'getEntries({name:"Alice",age:25}) returns [["name","Alice"],["age",25]]', got: JSON.stringify(fn({name:'Alice',age:25})) },
    { pass: JSON.stringify(fn({x:1})) === '[["x",1]]', description: 'getEntries({x:1}) returns [["x",1]]', got: JSON.stringify(fn({x:1})) },
    { pass: JSON.stringify(fn({})) === '[]', description: 'getEntries({}) returns [] (empty object)', got: JSON.stringify(fn({})) },
    { pass: JSON.stringify(fn({a:'hello',b:true,c:42})) === '[["a","hello"],["b",true],["c",42]]', description: 'getEntries works with mixed value types', got: JSON.stringify(fn({a:'hello',b:true,c:42})) },
    { pass: fn({x:1,y:2})[0].length === 2, description: 'Each entry is a 2-element array', got: String(fn({x:1,y:2})[0].length) },
    { pass: fn({x:1,y:2}).length === 2, description: 'getEntries returns correct number of entries', got: String(fn({x:1,y:2}).length) }
  ];
}`,
    hints: [
      'Inside the `for...in` loop, push a two-element array `[key, obj[key]]` into the result. Each entry is an array containing the key and its value.',
      'This is a manual version of `Object.entries()`. Each entry is `[key, value]` — the key is always a string, the value can be any type.',
    ],
    resources: [...forInResources, ...objectResources],
  },

  // ── 4. Object Iteration: Key-Value String ──────────────────────────────
  {
    id: 1145,
    title: 'Object Iteration: Key-Value String',
    type: 'js',
    tier: 2,
    category: ['js-fundamentals', 'objects'],
    tags: ['objects', 'loops', 'for-in', 'iteration', 'strings'],
    description:
      'Build a formatted string from an object\'s key-value pairs separated by commas.',
    instructions:
      'Write a function called `formatObject` that takes an `obj` and returns a string with each key-value pair formatted as `"key: value"`, separated by `", "`.\n\nExample: `formatObject({name: "Alice", age: 25})` returns `"name: Alice, age: 25"`.\n\nExample: `formatObject({x: 1})` returns `"x: 1"`.',
    starterCode: 'function formatObject(obj) {\n\n}\n',
    solution:
      'function formatObject(obj) {\n  let result = "";\n  for (const key in obj) {\n    if (result.length > 0) {\n      result += ", ";\n    }\n    result += key + ": " + obj[key];\n  }\n  return result;\n}',
    testRunner: `(code) => {
  const fn = new Function(code + '; return formatObject;')();
  return [
    { pass: fn({name:'Alice',age:25}) === 'name: Alice, age: 25', description: 'formatObject({name:"Alice",age:25}) returns "name: Alice, age: 25"', got: fn({name:'Alice',age:25}) },
    { pass: fn({x:1}) === 'x: 1', description: 'formatObject({x:1}) returns "x: 1"', got: fn({x:1}) },
    { pass: fn({}) === '', description: 'formatObject({}) returns "" (empty object)', got: fn({}) },
    { pass: fn({a:true,b:false}) === 'a: true, b: false', description: 'formatObject works with boolean values', got: fn({a:true,b:false}) },
    { pass: fn({color:'red',size:'large',qty:5}) === 'color: red, size: large, qty: 5', description: 'formatObject with 3 properties', got: fn({color:'red',size:'large',qty:5}) },
    { pass: fn({n:0}) === 'n: 0', description: 'formatObject works with zero value', got: fn({n:0}) }
  ];
}`,
    hints: [
      'Start with an empty string. In the `for...in` loop, add `", "` before each pair except the first. Check `if (result.length > 0)` to know when to add the separator.',
      'Build each pair as `key + ": " + obj[key]`. The separator logic is the same pattern you used in the `joinWith` exercise from Manual Array Patterns.',
    ],
    resources: [...forInResources, ...objectResources],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // PART 2: Build & Transform (1146-1149)
  // ═══════════════════════════════════════════════════════════════════════════

  // ── 5. Object Build: From Arrays (scaffolded entry) ────────────────────
  {
    id: 1146,
    title: 'Object Build: From Arrays',
    type: 'js',
    tier: 2,
    category: ['js-fundamentals', 'objects'],
    tags: ['objects', 'loops', 'build', 'arrays'],
    description:
      'Build an object from parallel arrays of keys and values.',
    instructions:
      'Building objects dynamically is a core pattern. You can create an empty object and add properties to it using bracket notation inside a loop.\n\nWrite a function called `buildObject` that takes a `keys` array and a `values` array of equal length. Return a new object where each key is paired with the value at the same index.\n\nExample: `buildObject(["name", "age"], ["Alice", 25])` returns `{name: "Alice", age: 25}`.\n\nExample: `buildObject(["x", "y"], [10, 20])` returns `{x: 10, y: 20}`.',
    starterCode:
      '// Building objects dynamically:\n// 1. Create an empty object with {}\n// 2. Use bracket notation to add properties: obj[key] = value\n// 3. Bracket notation works with variables, unlike dot notation\n\nfunction buildObject(keys, values) {\n  // Create an empty object\n  // Loop through the keys array (use index to access both arrays)\n  //   Set obj[keys[i]] = values[i]\n  // Return the object\n}\n',
    solution:
      'function buildObject(keys, values) {\n  const obj = {};\n  for (let i = 0; i < keys.length; i++) {\n    obj[keys[i]] = values[i];\n  }\n  return obj;\n}',
    testRunner: `(code) => {
  const fn = new Function(code + '; return buildObject;')();
  return [
    { pass: JSON.stringify(fn(['name','age'],['Alice',25])) === '{"name":"Alice","age":25}', description: 'buildObject(["name","age"],["Alice",25]) returns {name:"Alice",age:25}', got: JSON.stringify(fn(['name','age'],['Alice',25])) },
    { pass: JSON.stringify(fn(['x','y'],[10,20])) === '{"x":10,"y":20}', description: 'buildObject(["x","y"],[10,20]) returns {x:10,y:20}', got: JSON.stringify(fn(['x','y'],[10,20])) },
    { pass: JSON.stringify(fn(['solo'],['value'])) === '{"solo":"value"}', description: 'buildObject with single pair', got: JSON.stringify(fn(['solo'],['value'])) },
    { pass: JSON.stringify(fn([],[])) === '{}', description: 'buildObject([],[]) returns {} (empty)', got: JSON.stringify(fn([],[])) },
    { pass: JSON.stringify(fn(['a','b','c'],[1,2,3])) === '{"a":1,"b":2,"c":3}', description: 'buildObject with 3 pairs', got: JSON.stringify(fn(['a','b','c'],[1,2,3])) },
    { pass: JSON.stringify(fn(['active','count'],[true,0])) === '{"active":true,"count":0}', description: 'buildObject works with boolean and zero values', got: JSON.stringify(fn(['active','count'],[true,0])) }
  ];
}`,
    hints: [
      'Create `const obj = {}`. Use a standard `for` loop with index `i` to access both arrays at the same position: `obj[keys[i]] = values[i]`.',
      'Bracket notation `obj[keys[i]]` uses the string from the keys array as the property name. This is how you create properties dynamically when the name is stored in a variable.',
    ],
    resources: objectResources,
  },

  // ── 6. Object Build: From Pairs ────────────────────────────────────────
  {
    id: 1147,
    title: 'Object Build: From Pairs',
    type: 'js',
    tier: 2,
    category: ['js-fundamentals', 'objects'],
    tags: ['objects', 'loops', 'build', 'arrays'],
    description:
      'Build an object from an array of key-value pair arrays.',
    instructions:
      'Write a function called `fromPairs` that takes an array of `pairs`, where each pair is a two-element array `[key, value]`. Return a new object built from those pairs.\n\nThis is the inverse of the `getEntries` function.\n\nExample: `fromPairs([["name", "Alice"], ["age", 25]])` returns `{name: "Alice", age: 25}`.\n\nExample: `fromPairs([["x", 1]])` returns `{x: 1}`.',
    starterCode: 'function fromPairs(pairs) {\n\n}\n',
    solution:
      'function fromPairs(pairs) {\n  const obj = {};\n  for (let i = 0; i < pairs.length; i++) {\n    obj[pairs[i][0]] = pairs[i][1];\n  }\n  return obj;\n}',
    testRunner: `(code) => {
  const fn = new Function(code + '; return fromPairs;')();
  return [
    { pass: JSON.stringify(fn([['name','Alice'],['age',25]])) === '{"name":"Alice","age":25}', description: 'fromPairs([["name","Alice"],["age",25]]) returns {name:"Alice",age:25}', got: JSON.stringify(fn([['name','Alice'],['age',25]])) },
    { pass: JSON.stringify(fn([['x',1]])) === '{"x":1}', description: 'fromPairs([["x",1]]) returns {x:1}', got: JSON.stringify(fn([['x',1]])) },
    { pass: JSON.stringify(fn([])) === '{}', description: 'fromPairs([]) returns {} (empty)', got: JSON.stringify(fn([])) },
    { pass: JSON.stringify(fn([['a',1],['b',2],['c',3]])) === '{"a":1,"b":2,"c":3}', description: 'fromPairs with 3 pairs', got: JSON.stringify(fn([['a',1],['b',2],['c',3]])) },
    { pass: JSON.stringify(fn([['key','first'],['key','second']])) === '{"key":"second"}', description: 'fromPairs with duplicate keys keeps last value', got: JSON.stringify(fn([['key','first'],['key','second']])) },
    { pass: JSON.stringify(fn([['active',true],['count',0]])) === '{"active":true,"count":0}', description: 'fromPairs works with boolean and zero values', got: JSON.stringify(fn([['active',true],['count',0]])) }
  ];
}`,
    hints: [
      'Each pair is an array where `pairs[i][0]` is the key and `pairs[i][1]` is the value. Set `obj[pairs[i][0]] = pairs[i][1]` inside the loop.',
      'This is the reverse of `getEntries`. If duplicate keys appear, the last one wins because each assignment overwrites the previous value.',
    ],
    resources: objectResources,
  },

  // ── 7. Object Build: Frequency Count ───────────────────────────────────
  {
    id: 1148,
    title: 'Object Build: Frequency Count',
    type: 'js',
    tier: 2,
    category: ['js-fundamentals', 'objects'],
    tags: ['objects', 'loops', 'build', 'counting'],
    description:
      'Build an object that counts how many times each value appears in an array.',
    instructions:
      'Write a function called `countFrequency` that takes an `array` and returns an object where each key is a unique value from the array and each value is the count of how many times it appeared.\n\nExample: `countFrequency(["a", "b", "a", "c", "b", "a"])` returns `{a: 3, b: 2, c: 1}`.\n\nExample: `countFrequency([1, 2, 1, 1])` returns `{"1": 3, "2": 1}`.',
    starterCode: 'function countFrequency(array) {\n\n}\n',
    solution:
      'function countFrequency(array) {\n  const counts = {};\n  for (let i = 0; i < array.length; i++) {\n    const item = array[i];\n    if (counts[item] === undefined) {\n      counts[item] = 1;\n    } else {\n      counts[item]++;\n    }\n  }\n  return counts;\n}',
    testRunner: `(code) => {
  const fn = new Function(code + '; return countFrequency;')();
  return [
    { pass: JSON.stringify(fn(['a','b','a','c','b','a'])) === '{"a":3,"b":2,"c":1}', description: 'countFrequency(["a","b","a","c","b","a"]) returns {a:3,b:2,c:1}', got: JSON.stringify(fn(['a','b','a','c','b','a'])) },
    { pass: (() => { const r = fn([1,2,1,1]); return r['1'] === 3 && r['2'] === 1; })(), description: 'countFrequency([1,2,1,1]) counts correctly (keys become strings)', got: JSON.stringify(fn([1,2,1,1])) },
    { pass: JSON.stringify(fn(['x'])) === '{"x":1}', description: 'countFrequency(["x"]) returns {x:1} (single element)', got: JSON.stringify(fn(['x'])) },
    { pass: JSON.stringify(fn([])) === '{}', description: 'countFrequency([]) returns {} (empty array)', got: JSON.stringify(fn([])) },
    { pass: JSON.stringify(fn(['yes','no','yes','yes','no'])) === '{"yes":3,"no":2}', description: 'countFrequency with yes/no counts correctly', got: JSON.stringify(fn(['yes','no','yes','yes','no'])) },
    { pass: JSON.stringify(fn(['a','a','a'])) === '{"a":3}', description: 'countFrequency with all same values', got: JSON.stringify(fn(['a','a','a'])) }
  ];
}`,
    hints: [
      'For each element, check if the key already exists in the object. If it does, increment it. If it does not, set it to `1`. Use `counts[item] === undefined` to check.',
      'Object keys are always strings in JavaScript. When you use a number like `1` as a key, it becomes the string `"1"`. This is normal behavior.',
    ],
    resources: objectResources,
  },

  // ── 8. Object Build: Group By Property ─────────────────────────────────
  {
    id: 1149,
    title: 'Object Build: Group By Property',
    type: 'js',
    tier: 2,
    category: ['js-fundamentals', 'objects'],
    tags: ['objects', 'loops', 'build', 'arrays', 'grouping'],
    description:
      'Build an object that groups array items by a shared property value.',
    instructions:
      'Write a function called `groupBy` that takes an array of `objects` and a `key` string. Return a new object where each property is a unique value of that key, and its value is an array of all objects that share that value.\n\nExample: `groupBy([{type: "fruit", name: "apple"}, {type: "veggie", name: "carrot"}, {type: "fruit", name: "banana"}], "type")` returns `{fruit: [{type: "fruit", name: "apple"}, {type: "fruit", name: "banana"}], veggie: [{type: "veggie", name: "carrot"}]}`.',
    starterCode: 'function groupBy(objects, key) {\n\n}\n',
    solution:
      'function groupBy(objects, key) {\n  const groups = {};\n  for (let i = 0; i < objects.length; i++) {\n    const groupKey = objects[i][key];\n    if (groups[groupKey] === undefined) {\n      groups[groupKey] = [];\n    }\n    groups[groupKey].push(objects[i]);\n  }\n  return groups;\n}',
    testRunner: `(code) => {
  const fn = new Function(code + '; return groupBy;')();
  const r1 = fn([{type:'fruit',name:'apple'},{type:'veggie',name:'carrot'},{type:'fruit',name:'banana'}], 'type');
  const r2 = fn([{grade:'A',name:'Alice'},{grade:'B',name:'Bob'},{grade:'A',name:'Carol'}], 'grade');
  const r3 = fn([], 'type');
  const r4 = fn([{x:1}], 'x');
  return [
    { pass: JSON.stringify(r1.fruit) === '[{"type":"fruit","name":"apple"},{"type":"fruit","name":"banana"}]' && JSON.stringify(r1.veggie) === '[{"type":"veggie","name":"carrot"}]', description: 'groupBy groups fruit and veggie items correctly', got: JSON.stringify(r1) },
    { pass: r2.A.length === 2 && r2.B.length === 1, description: 'groupBy groups by grade: A has 2, B has 1', got: JSON.stringify(r2) },
    { pass: JSON.stringify(r3) === '{}', description: 'groupBy([]) returns {} (empty array)', got: JSON.stringify(r3) },
    { pass: JSON.stringify(r4) === '{"1":[{"x":1}]}', description: 'groupBy with single item', got: JSON.stringify(r4) },
    { pass: Object.keys(r1).length === 2, description: 'groupBy creates correct number of groups', got: String(Object.keys(r1).length) },
    { pass: (() => { const r = fn([{s:'a'},{s:'a'},{s:'a'}],'s'); return r.a.length === 3; })(), description: 'groupBy with all same group puts all items in one array', got: JSON.stringify(fn([{s:'a'},{s:'a'},{s:'a'}],'s')) }
  ];
}`,
    hints: [
      'For each object, get the group key with `objects[i][key]`. If that group does not exist yet, create it as an empty array. Then push the object into the group.',
      'This combines the frequency count pattern with arrays: instead of incrementing a number, you push objects into arrays. Check `groups[groupKey] === undefined` to know when to create the array.',
    ],
    resources: objectResources,
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // PART 3: Merge & Combine (1150-1152)
  // ═══════════════════════════════════════════════════════════════════════════

  // ── 9. Object Merge: Shallow ───────────────────────────────────────────
  {
    id: 1150,
    title: 'Object Merge: Shallow',
    type: 'js',
    tier: 2,
    category: ['js-fundamentals', 'objects'],
    tags: ['objects', 'loops', 'merge', 'for-in'],
    description:
      'Merge two objects into a new object where the second object\'s values win on conflict.',
    instructions:
      'Write a function called `mergeObjects` that takes `obj1` and `obj2` and returns a new object containing all properties from both. If both objects have the same key, the value from `obj2` should be used.\n\nDo not modify either original object.\n\nExample: `mergeObjects({a: 1, b: 2}, {b: 3, c: 4})` returns `{a: 1, b: 3, c: 4}`.\n\nExample: `mergeObjects({x: 10}, {y: 20})` returns `{x: 10, y: 20}`.',
    starterCode: 'function mergeObjects(obj1, obj2) {\n\n}\n',
    solution:
      'function mergeObjects(obj1, obj2) {\n  const result = {};\n  for (const key in obj1) {\n    result[key] = obj1[key];\n  }\n  for (const key in obj2) {\n    result[key] = obj2[key];\n  }\n  return result;\n}',
    testRunner: `(code) => {
  const fn = new Function(code + '; return mergeObjects;')();
  return [
    { pass: JSON.stringify(fn({a:1,b:2},{b:3,c:4})) === '{"a":1,"b":3,"c":4}', description: 'mergeObjects({a:1,b:2},{b:3,c:4}) returns {a:1,b:3,c:4} (obj2 wins)', got: JSON.stringify(fn({a:1,b:2},{b:3,c:4})) },
    { pass: JSON.stringify(fn({x:10},{y:20})) === '{"x":10,"y":20}', description: 'mergeObjects with no overlap returns all properties', got: JSON.stringify(fn({x:10},{y:20})) },
    { pass: JSON.stringify(fn({},{a:1})) === '{"a":1}', description: 'mergeObjects with empty obj1 returns obj2 properties', got: JSON.stringify(fn({},{a:1})) },
    { pass: JSON.stringify(fn({a:1},{})) === '{"a":1}', description: 'mergeObjects with empty obj2 returns obj1 properties', got: JSON.stringify(fn({a:1},{})) },
    { pass: JSON.stringify(fn({},{})) === '{}', description: 'mergeObjects with two empty objects returns {}', got: JSON.stringify(fn({},{})) },
    { pass: (() => { const o1 = {a:1}; fn(o1, {a:2}); return o1.a === 1; })(), description: 'mergeObjects does not modify original objects', got: 'originals preserved' }
  ];
}`,
    hints: [
      'Create a new empty object. Loop through `obj1` with `for...in` and copy all properties. Then loop through `obj2` and copy all its properties. Since `obj2` is second, its values overwrite `obj1` values on conflict.',
      'The order matters: copy `obj1` first, then `obj2`. When `obj2` has a key that already exists from `obj1`, the assignment overwrites it — this is how `obj2` "wins."',
    ],
    resources: [...forInResources, ...objectResources],
  },

  // ── 10. Object Merge: Defaults ─────────────────────────────────────────
  {
    id: 1151,
    title: 'Object Merge: Defaults',
    type: 'js',
    tier: 2,
    category: ['js-fundamentals', 'objects'],
    tags: ['objects', 'loops', 'merge', 'for-in', 'defaults'],
    description:
      'Fill in missing properties from a defaults object without overwriting existing values.',
    instructions:
      'Write a function called `applyDefaults` that takes an `obj` and a `defaults` object. Return a new object that has all properties from `obj`, plus any properties from `defaults` that are not already present in `obj`.\n\nExisting values in `obj` should NOT be overwritten.\n\nExample: `applyDefaults({name: "Alice"}, {name: "Unknown", role: "user"})` returns `{name: "Alice", role: "user"}`.\n\nExample: `applyDefaults({}, {theme: "dark", lang: "en"})` returns `{theme: "dark", lang: "en"}`.',
    starterCode: 'function applyDefaults(obj, defaults) {\n\n}\n',
    solution:
      'function applyDefaults(obj, defaults) {\n  const result = {};\n  for (const key in obj) {\n    result[key] = obj[key];\n  }\n  for (const key in defaults) {\n    if (result[key] === undefined) {\n      result[key] = defaults[key];\n    }\n  }\n  return result;\n}',
    testRunner: `(code) => {
  const fn = new Function(code + '; return applyDefaults;')();
  return [
    { pass: JSON.stringify(fn({name:'Alice'},{name:'Unknown',role:'user'})) === '{"name":"Alice","role":"user"}', description: 'applyDefaults keeps existing name, adds missing role', got: JSON.stringify(fn({name:'Alice'},{name:'Unknown',role:'user'})) },
    { pass: JSON.stringify(fn({},{theme:'dark',lang:'en'})) === '{"theme":"dark","lang":"en"}', description: 'applyDefaults on empty obj copies all defaults', got: JSON.stringify(fn({},{theme:'dark',lang:'en'})) },
    { pass: JSON.stringify(fn({a:1,b:2},{b:99,c:3})) === '{"a":1,"b":2,"c":3}', description: 'applyDefaults keeps b:2 from obj, adds c:3 from defaults', got: JSON.stringify(fn({a:1,b:2},{b:99,c:3})) },
    { pass: JSON.stringify(fn({x:0},{x:10})) === '{"x":0}', description: 'applyDefaults keeps x:0 (falsy but defined)', got: JSON.stringify(fn({x:0},{x:10})) },
    { pass: JSON.stringify(fn({a:1},{})) === '{"a":1}', description: 'applyDefaults with empty defaults returns obj properties', got: JSON.stringify(fn({a:1},{})) },
    { pass: (() => { const o = {a:1}; fn(o, {b:2}); return o.b === undefined; })(), description: 'applyDefaults does not modify original objects', got: 'originals preserved' }
  ];
}`,
    hints: [
      'Copy all of `obj` into a new result first. Then loop through `defaults` and only add properties where `result[key] === undefined` — this preserves existing values.',
      'This is the mirror of `mergeObjects`: instead of letting the second object overwrite, you skip properties that already exist. The check `=== undefined` means "not yet set."',
    ],
    resources: [...forInResources, ...objectResources],
  },

  // ── 11. Object Merge: Sum Values ───────────────────────────────────────
  {
    id: 1152,
    title: 'Object Merge: Sum Values',
    type: 'js',
    tier: 2,
    category: ['js-fundamentals', 'objects'],
    tags: ['objects', 'loops', 'merge', 'for-in', 'math'],
    description:
      'Merge two objects by summing values of shared keys and keeping unique keys as-is.',
    instructions:
      'Write a function called `sumByKey` that takes `obj1` and `obj2`, where all values are numbers. Return a new object where shared keys have their values added together, and unique keys are kept as-is.\n\nExample: `sumByKey({a: 1, b: 2}, {b: 3, c: 4})` returns `{a: 1, b: 5, c: 4}`.\n\nExample: `sumByKey({x: 10}, {x: 5})` returns `{x: 15}`.',
    starterCode: 'function sumByKey(obj1, obj2) {\n\n}\n',
    solution:
      'function sumByKey(obj1, obj2) {\n  const result = {};\n  for (const key in obj1) {\n    result[key] = obj1[key];\n  }\n  for (const key in obj2) {\n    if (result[key] !== undefined) {\n      result[key] += obj2[key];\n    } else {\n      result[key] = obj2[key];\n    }\n  }\n  return result;\n}',
    testRunner: `(code) => {
  const fn = new Function(code + '; return sumByKey;')();
  return [
    { pass: JSON.stringify(fn({a:1,b:2},{b:3,c:4})) === '{"a":1,"b":5,"c":4}', description: 'sumByKey({a:1,b:2},{b:3,c:4}) returns {a:1,b:5,c:4}', got: JSON.stringify(fn({a:1,b:2},{b:3,c:4})) },
    { pass: JSON.stringify(fn({x:10},{x:5})) === '{"x":15}', description: 'sumByKey({x:10},{x:5}) returns {x:15}', got: JSON.stringify(fn({x:10},{x:5})) },
    { pass: JSON.stringify(fn({a:1},{b:2})) === '{"a":1,"b":2}', description: 'sumByKey with no overlap keeps both', got: JSON.stringify(fn({a:1},{b:2})) },
    { pass: JSON.stringify(fn({},{a:5})) === '{"a":5}', description: 'sumByKey with empty obj1', got: JSON.stringify(fn({},{a:5})) },
    { pass: JSON.stringify(fn({a:5},{})) === '{"a":5}', description: 'sumByKey with empty obj2', got: JSON.stringify(fn({a:5},{})) },
    { pass: JSON.stringify(fn({a:0,b:10},{a:0,b:-10})) === '{"a":0,"b":0}', description: 'sumByKey handles zeros and negatives', got: JSON.stringify(fn({a:0,b:10},{a:0,b:-10})) }
  ];
}`,
    hints: [
      'Copy all of `obj1` into a new result. Then loop through `obj2`: if the key already exists in result, add the values together with `+=`. If it does not, set it directly.',
      'This is a third variation of the merge pattern: `mergeObjects` overwrites, `applyDefaults` skips, and `sumByKey` adds. The `for...in` structure is the same — only the merge logic changes.',
    ],
    resources: [...forInResources, ...objectResources],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // PART 4: Filter & Search (1153-1155)
  // ═══════════════════════════════════════════════════════════════════════════

  // ── 12. Object Filter: By Value ────────────────────────────────────────
  {
    id: 1153,
    title: 'Object Filter: By Value',
    type: 'js',
    tier: 2,
    category: ['js-fundamentals', 'objects'],
    tags: ['objects', 'loops', 'filter', 'for-in'],
    description:
      'Build a new object containing only entries where the value matches a test value.',
    instructions:
      'Write a function called `filterByValue` that takes an `obj` and a `testValue`. Return a new object containing only the properties whose value equals `testValue`.\n\nExample: `filterByValue({a: 1, b: 2, c: 1, d: 3}, 1)` returns `{a: 1, c: 1}`.\n\nExample: `filterByValue({role: "admin", status: "active", type: "admin"}, "admin")` returns `{role: "admin", type: "admin"}`.',
    starterCode: 'function filterByValue(obj, testValue) {\n\n}\n',
    solution:
      'function filterByValue(obj, testValue) {\n  const result = {};\n  for (const key in obj) {\n    if (obj[key] === testValue) {\n      result[key] = obj[key];\n    }\n  }\n  return result;\n}',
    testRunner: `(code) => {
  const fn = new Function(code + '; return filterByValue;')();
  return [
    { pass: JSON.stringify(fn({a:1,b:2,c:1,d:3}, 1)) === '{"a":1,"c":1}', description: 'filterByValue keeps properties with value 1', got: JSON.stringify(fn({a:1,b:2,c:1,d:3}, 1)) },
    { pass: JSON.stringify(fn({role:'admin',status:'active',type:'admin'}, 'admin')) === '{"role":"admin","type":"admin"}', description: 'filterByValue keeps properties with value "admin"', got: JSON.stringify(fn({role:'admin',status:'active',type:'admin'}, 'admin')) },
    { pass: JSON.stringify(fn({a:1,b:2}, 99)) === '{}', description: 'filterByValue returns {} when no values match', got: JSON.stringify(fn({a:1,b:2}, 99)) },
    { pass: JSON.stringify(fn({}, 1)) === '{}', description: 'filterByValue({}) returns {} (empty object)', got: JSON.stringify(fn({}, 1)) },
    { pass: JSON.stringify(fn({a:true,b:false,c:true}, true)) === '{"a":true,"c":true}', description: 'filterByValue works with boolean values', got: JSON.stringify(fn({a:true,b:false,c:true}, true)) },
    { pass: JSON.stringify(fn({x:0,y:1,z:0}, 0)) === '{"x":0,"z":0}', description: 'filterByValue works with zero', got: JSON.stringify(fn({x:0,y:1,z:0}, 0)) }
  ];
}`,
    hints: [
      'Create an empty result object. In the `for...in` loop, check `if (obj[key] === testValue)` and only copy matching properties to the result.',
      'This is the filter pattern applied to objects: instead of pushing to an array, you assign to a new object. Only matching key-value pairs make it into the result.',
    ],
    resources: [...forInResources, ...objectResources],
  },

  // ── 13. Object Filter: Exclude Keys ────────────────────────────────────
  {
    id: 1154,
    title: 'Object Filter: Exclude Keys',
    type: 'js',
    tier: 2,
    category: ['js-fundamentals', 'objects'],
    tags: ['objects', 'loops', 'filter', 'for-in', 'arrays'],
    description:
      'Build a new object with specified keys removed.',
    instructions:
      'Write a function called `excludeKeys` that takes an `obj` and a `keysToRemove` array. Return a new object containing all properties from `obj` except those whose key is in the `keysToRemove` array.\n\nExample: `excludeKeys({name: "Alice", age: 25, role: "admin"}, ["role"])` returns `{name: "Alice", age: 25}`.\n\nExample: `excludeKeys({a: 1, b: 2, c: 3}, ["a", "c"])` returns `{b: 2}`.',
    starterCode: 'function excludeKeys(obj, keysToRemove) {\n\n}\n',
    solution:
      'function excludeKeys(obj, keysToRemove) {\n  const result = {};\n  for (const key in obj) {\n    if (!keysToRemove.includes(key)) {\n      result[key] = obj[key];\n    }\n  }\n  return result;\n}',
    testRunner: `(code) => {
  const fn = new Function(code + '; return excludeKeys;')();
  return [
    { pass: JSON.stringify(fn({name:'Alice',age:25,role:'admin'}, ['role'])) === '{"name":"Alice","age":25}', description: 'excludeKeys removes "role" property', got: JSON.stringify(fn({name:'Alice',age:25,role:'admin'}, ['role'])) },
    { pass: JSON.stringify(fn({a:1,b:2,c:3}, ['a','c'])) === '{"b":2}', description: 'excludeKeys removes "a" and "c"', got: JSON.stringify(fn({a:1,b:2,c:3}, ['a','c'])) },
    { pass: JSON.stringify(fn({x:1,y:2}, [])) === '{"x":1,"y":2}', description: 'excludeKeys with empty keysToRemove keeps all', got: JSON.stringify(fn({x:1,y:2}, [])) },
    { pass: JSON.stringify(fn({a:1}, ['a'])) === '{}', description: 'excludeKeys removing the only key returns {}', got: JSON.stringify(fn({a:1}, ['a'])) },
    { pass: JSON.stringify(fn({a:1,b:2}, ['z'])) === '{"a":1,"b":2}', description: 'excludeKeys with non-existent key keeps all', got: JSON.stringify(fn({a:1,b:2}, ['z'])) },
    { pass: JSON.stringify(fn({}, ['a'])) === '{}', description: 'excludeKeys({}) returns {} (empty object)', got: JSON.stringify(fn({}, ['a'])) }
  ];
}`,
    hints: [
      'In the `for...in` loop, check if the current key is NOT in the `keysToRemove` array using `.includes()`. Only copy properties whose keys are not excluded.',
      'The `!keysToRemove.includes(key)` check returns `true` when the key is NOT in the removal list. The `!` operator flips the boolean result of `.includes()`.',
    ],
    resources: [...forInResources, ...objectResources],
  },

  // ── 14. Object Search: Has All Keys ────────────────────────────────────
  {
    id: 1155,
    title: 'Object Search: Has All Keys',
    type: 'js',
    tier: 2,
    category: ['js-fundamentals', 'objects'],
    tags: ['objects', 'loops', 'search', 'every-pattern'],
    description:
      'Check if an object contains every key from a given array of required keys.',
    instructions:
      'Write a function called `hasAllKeys` that takes an `obj` and a `keys` array. Return `true` if the object has every key listed in the array, or `false` if any key is missing.\n\nExample: `hasAllKeys({name: "Alice", age: 25, role: "admin"}, ["name", "age"])` returns `true`.\n\nExample: `hasAllKeys({name: "Alice"}, ["name", "email"])` returns `false`.',
    starterCode: 'function hasAllKeys(obj, keys) {\n\n}\n',
    solution:
      'function hasAllKeys(obj, keys) {\n  for (let i = 0; i < keys.length; i++) {\n    if (obj[keys[i]] === undefined) {\n      return false;\n    }\n  }\n  return true;\n}',
    testRunner: `(code) => {
  const fn = new Function(code + '; return hasAllKeys;')();
  return [
    { pass: fn({name:'Alice',age:25,role:'admin'}, ['name','age']) === true, description: 'hasAllKeys returns true when all keys present', got: String(fn({name:'Alice',age:25,role:'admin'}, ['name','age'])) },
    { pass: fn({name:'Alice'}, ['name','email']) === false, description: 'hasAllKeys returns false when "email" is missing', got: String(fn({name:'Alice'}, ['name','email'])) },
    { pass: fn({a:1,b:2,c:3}, ['a','b','c']) === true, description: 'hasAllKeys with exact match returns true', got: String(fn({a:1,b:2,c:3}, ['a','b','c'])) },
    { pass: fn({}, ['a']) === false, description: 'hasAllKeys on empty object returns false', got: String(fn({}, ['a'])) },
    { pass: fn({a:1}, []) === true, description: 'hasAllKeys with empty keys array returns true (vacuous truth)', got: String(fn({a:1}, [])) },
    { pass: fn({x:0,y:null}, ['x','y']) === true, description: 'hasAllKeys finds keys with falsy values (0, null)', got: String(fn({x:0,y:null}, ['x','y'])) }
  ];
}`,
    hints: [
      'Loop through the `keys` array. For each key, check if `obj[keys[i]] === undefined`. If any key is missing, return `false` immediately. If the loop finishes, return `true`.',
      'This is the "every" pattern applied to objects: assume all keys are present, look for a missing one. The first missing key proves the answer is `false`.',
    ],
    resources: objectResources,
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // PART 5: Nested Objects (1156-1157)
  // ═══════════════════════════════════════════════════════════════════════════

  // ── 15. Object Nested: Get Value ───────────────────────────────────────
  {
    id: 1156,
    title: 'Object Nested: Get Value',
    type: 'js',
    tier: 2,
    category: ['js-fundamentals', 'objects'],
    tags: ['objects', 'loops', 'nested', 'strings'],
    description:
      'Access a deeply nested value using a dot-separated path string.',
    instructions:
      'Write a function called `getNestedValue` that takes an `obj` and a `path` string. The path uses dots to separate levels (e.g., `"user.address.city"`). Navigate through the object and return the value at that path. If any part of the path does not exist, return `undefined`.\n\nExample: `getNestedValue({user: {name: "Alice"}}, "user.name")` returns `"Alice"`.\n\nExample: `getNestedValue({a: {b: {c: 42}}}, "a.b.c")` returns `42`.\n\nExample: `getNestedValue({x: 1}, "x.y.z")` returns `undefined`.',
    starterCode: 'function getNestedValue(obj, path) {\n\n}\n',
    solution:
      'function getNestedValue(obj, path) {\n  const keys = path.split(".");\n  let current = obj;\n  for (let i = 0; i < keys.length; i++) {\n    if (current === undefined || current === null) {\n      return undefined;\n    }\n    current = current[keys[i]];\n  }\n  return current;\n}',
    testRunner: `(code) => {
  const fn = new Function(code + '; return getNestedValue;')();
  return [
    { pass: fn({user:{name:'Alice'}}, 'user.name') === 'Alice', description: 'getNestedValue({user:{name:"Alice"}}, "user.name") returns "Alice"', got: String(fn({user:{name:'Alice'}}, 'user.name')) },
    { pass: fn({a:{b:{c:42}}}, 'a.b.c') === 42, description: 'getNestedValue 3 levels deep returns 42', got: String(fn({a:{b:{c:42}}}, 'a.b.c')) },
    { pass: fn({x:1}, 'x.y.z') === undefined, description: 'getNestedValue returns undefined for invalid path', got: String(fn({x:1}, 'x.y.z')) },
    { pass: fn({a:1}, 'a') === 1, description: 'getNestedValue with single-level path returns value', got: String(fn({a:1}, 'a')) },
    { pass: fn({}, 'missing') === undefined, description: 'getNestedValue on empty object returns undefined', got: String(fn({}, 'missing')) },
    { pass: fn({data:{items:[1,2,3]}}, 'data.items') !== undefined, description: 'getNestedValue returns nested array', got: JSON.stringify(fn({data:{items:[1,2,3]}}, 'data.items')) },
    { pass: fn({a:{b:0}}, 'a.b') === 0, description: 'getNestedValue returns falsy value 0 (not undefined)', got: String(fn({a:{b:0}}, 'a.b')) }
  ];
}`,
    hints: [
      'Split the path string on `"."` to get an array of keys. Then loop through the keys, drilling into the object one level at a time: `current = current[keys[i]]`.',
      'Start with `let current = obj`. On each iteration, move one level deeper. If `current` becomes `undefined` or `null` before you finish, return `undefined` to avoid errors.',
    ],
    resources: objectResources,
  },

  // ── 16. Object Nested: Flatten ─────────────────────────────────────────
  {
    id: 1157,
    title: 'Object Nested: Flatten',
    type: 'js',
    tier: 2,
    category: ['js-fundamentals', 'objects'],
    tags: ['objects', 'loops', 'nested', 'for-in', 'flatten'],
    description:
      'Flatten a one-level nested object into a flat object with dot-concatenated keys.',
    instructions:
      'Write a function called `flattenObject` that takes an `obj` where some values may be objects (one level deep only). Return a new flat object where nested properties become dot-separated keys.\n\nNon-object values should be kept as-is. Only flatten values that are plain objects (not arrays or null).\n\nExample: `flattenObject({name: "Alice", address: {city: "Seattle", zip: "98101"}})` returns `{name: "Alice", "address.city": "Seattle", "address.zip": "98101"}`.\n\nExample: `flattenObject({a: 1, b: {c: 2, d: 3}})` returns `{a: 1, "b.c": 2, "b.d": 3}`.',
    starterCode: 'function flattenObject(obj) {\n\n}\n',
    solution:
      'function flattenObject(obj) {\n  const result = {};\n  for (const key in obj) {\n    const value = obj[key];\n    if (typeof value === "object" && value !== null && !Array.isArray(value)) {\n      for (const innerKey in value) {\n        result[key + "." + innerKey] = value[innerKey];\n      }\n    } else {\n      result[key] = value;\n    }\n  }\n  return result;\n}',
    testRunner: `(code) => {
  const fn = new Function(code + '; return flattenObject;')();
  return [
    { pass: JSON.stringify(fn({name:'Alice',address:{city:'Seattle',zip:'98101'}})) === '{"name":"Alice","address.city":"Seattle","address.zip":"98101"}', description: 'flattenObject flattens nested address object', got: JSON.stringify(fn({name:'Alice',address:{city:'Seattle',zip:'98101'}})) },
    { pass: JSON.stringify(fn({a:1,b:{c:2,d:3}})) === '{"a":1,"b.c":2,"b.d":3}', description: 'flattenObject({a:1,b:{c:2,d:3}}) returns flat object', got: JSON.stringify(fn({a:1,b:{c:2,d:3}})) },
    { pass: JSON.stringify(fn({x:1,y:2})) === '{"x":1,"y":2}', description: 'flattenObject with no nested objects returns same structure', got: JSON.stringify(fn({x:1,y:2})) },
    { pass: JSON.stringify(fn({})) === '{}', description: 'flattenObject({}) returns {} (empty object)', got: JSON.stringify(fn({})) },
    { pass: JSON.stringify(fn({a:null,b:[1,2]})) === '{"a":null,"b":[1,2]}', description: 'flattenObject keeps null and arrays as-is (not flattened)', got: JSON.stringify(fn({a:null,b:[1,2]})) },
    { pass: JSON.stringify(fn({user:{name:'Bob',age:30},active:true})) === '{"user.name":"Bob","user.age":30,"active":true}', description: 'flattenObject flattens user object, keeps active boolean', got: JSON.stringify(fn({user:{name:'Bob',age:30},active:true})) }
  ];
}`,
    hints: [
      'Loop through the object. For each value, check if it is a plain object using `typeof value === "object" && value !== null && !Array.isArray(value)`. If it is, use a nested `for...in` to add its properties with dot-concatenated keys.',
      'For nested objects, build the new key as `key + "." + innerKey`. For non-object values, copy them directly. The `null` and `Array.isArray` checks are needed because `typeof null` and `typeof []` both return `"object"` in JavaScript.',
    ],
    resources: [...forInResources, ...objectResources],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // PART 6: Combined (1158-1159)
  // ═══════════════════════════════════════════════════════════════════════════

  // ── 17. Object Patterns: Combined ──────────────────────────────────────
  {
    id: 1158,
    title: 'Object Patterns: Combined',
    type: 'js',
    tier: 2,
    category: ['js-fundamentals', 'objects'],
    tags: ['objects', 'loops', 'combined', 'for-in', 'iteration', 'build'],
    description:
      'Swap the keys and values of an object to create an inverted object.',
    instructions:
      'Write a function called `invertObject` that takes an `obj` and returns a new object where the keys and values are swapped. Each original value becomes a key, and each original key becomes a value.\n\nExample: `invertObject({a: 1, b: 2, c: 3})` returns `{"1": "a", "2": "b", "3": "c"}`.\n\nExample: `invertObject({name: "Alice", role: "admin"})` returns `{Alice: "name", admin: "role"}`.',
    starterCode: 'function invertObject(obj) {\n\n}\n',
    solution:
      'function invertObject(obj) {\n  const result = {};\n  for (const key in obj) {\n    result[obj[key]] = key;\n  }\n  return result;\n}',
    testRunner: `(code) => {
  const fn = new Function(code + '; return invertObject;')();
  return [
    { pass: JSON.stringify(fn({a:1,b:2,c:3})) === '{"1":"a","2":"b","3":"c"}', description: 'invertObject({a:1,b:2,c:3}) swaps keys and values', got: JSON.stringify(fn({a:1,b:2,c:3})) },
    { pass: JSON.stringify(fn({name:'Alice',role:'admin'})) === '{"Alice":"name","admin":"role"}', description: 'invertObject swaps string key-value pairs', got: JSON.stringify(fn({name:'Alice',role:'admin'})) },
    { pass: JSON.stringify(fn({})) === '{}', description: 'invertObject({}) returns {} (empty object)', got: JSON.stringify(fn({})) },
    { pass: JSON.stringify(fn({x:'y'})) === '{"y":"x"}', description: 'invertObject({x:"y"}) returns {y:"x"}', got: JSON.stringify(fn({x:'y'})) },
    { pass: JSON.stringify(fn({first:'a',second:'a'})) === '{"a":"second"}', description: 'invertObject with duplicate values keeps last key', got: JSON.stringify(fn({first:'a',second:'a'})) },
    { pass: fn({active:true}).true === 'active', description: 'invertObject works with boolean values (converted to string keys)', got: JSON.stringify(fn({active:true})) }
  ];
}`,
    hints: [
      'Create an empty result object. In the `for...in` loop, set `result[obj[key]] = key` — the old value becomes the new key, the old key becomes the new value.',
      'Remember that object keys are always strings. When a non-string value like `1` or `true` becomes a key, JavaScript converts it to a string (`"1"`, `"true"`).',
    ],
    resources: [...forInResources, ...objectResources],
  },

  // ── 18. Object Patterns: Pipeline ──────────────────────────────────────
  {
    id: 1159,
    title: 'Object Patterns: Pipeline',
    type: 'js',
    tier: 2,
    category: ['js-fundamentals', 'objects'],
    tags: ['objects', 'loops', 'combined', 'arrays', 'grouping', 'accumulate'],
    description:
      'Summarize an array of inventory items by grouping, counting, and totaling quantities per category.',
    instructions:
      'Write a function called `summarizeInventory` that takes an array of `items`, where each item has `category` (string), `name` (string), and `qty` (number) properties.\n\nReturn an object where each key is a category name, and each value is an object with:\n- `count`: how many items are in that category\n- `totalQty`: the sum of all quantities in that category\n- `items`: an array of item names in that category\n\nExample: `summarizeInventory([{category: "fruit", name: "apple", qty: 5}, {category: "veggie", name: "carrot", qty: 3}, {category: "fruit", name: "banana", qty: 8}])` returns `{fruit: {count: 2, totalQty: 13, items: ["apple", "banana"]}, veggie: {count: 1, totalQty: 3, items: ["carrot"]}}`.',
    starterCode: 'function summarizeInventory(items) {\n\n}\n',
    solution:
      'function summarizeInventory(items) {\n  const summary = {};\n  for (let i = 0; i < items.length; i++) {\n    const cat = items[i].category;\n    if (summary[cat] === undefined) {\n      summary[cat] = { count: 0, totalQty: 0, items: [] };\n    }\n    summary[cat].count++;\n    summary[cat].totalQty += items[i].qty;\n    summary[cat].items.push(items[i].name);\n  }\n  return summary;\n}',
    testRunner: `(code) => {
  const fn = new Function(code + '; return summarizeInventory;')();
  const r1 = fn([{category:'fruit',name:'apple',qty:5},{category:'veggie',name:'carrot',qty:3},{category:'fruit',name:'banana',qty:8}]);
  const r2 = fn([{category:'tool',name:'hammer',qty:2}]);
  const r3 = fn([]);
  const r4 = fn([{category:'a',name:'x',qty:1},{category:'a',name:'y',qty:2},{category:'a',name:'z',qty:3}]);
  return [
    { pass: r1.fruit.count === 2 && r1.fruit.totalQty === 13 && JSON.stringify(r1.fruit.items) === '["apple","banana"]' && r1.veggie.count === 1 && r1.veggie.totalQty === 3, description: 'summarizeInventory groups fruit (2 items, qty 13) and veggie (1 item, qty 3)', got: JSON.stringify(r1) },
    { pass: r2.tool.count === 1 && r2.tool.totalQty === 2 && JSON.stringify(r2.tool.items) === '["hammer"]', description: 'summarizeInventory with single item', got: JSON.stringify(r2) },
    { pass: JSON.stringify(r3) === '{}', description: 'summarizeInventory([]) returns {} (empty)', got: JSON.stringify(r3) },
    { pass: r4.a.count === 3 && r4.a.totalQty === 6 && r4.a.items.length === 3, description: 'summarizeInventory with all same category: count 3, totalQty 6', got: JSON.stringify(r4) },
    { pass: Object.keys(r1).length === 2, description: 'summarizeInventory creates correct number of categories', got: String(Object.keys(r1).length) }
  ];
}`,
    hints: [
      'For each item, get the category. If that category does not exist in the summary yet, create it with `{count: 0, totalQty: 0, items: []}`. Then increment count, add qty, and push the name.',
      'This combines groupBy, counting, and accumulation in one loop. The initialization check (`=== undefined`) is the same pattern used in `countFrequency` and `groupBy` — but here you initialize an object instead of a number or array.',
    ],
    resources: objectResources,
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

  console.log(`\nT2 Object Patterns — ${exercises.length} exercises\n`);
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
