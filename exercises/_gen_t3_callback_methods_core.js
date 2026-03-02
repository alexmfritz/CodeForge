#!/usr/bin/env node
/**
 * Generator: T3 Callback Array Methods — Core (33 exercises, IDs 1176-1208)
 *
 * Covers: forEach, map, filter, find/findIndex, reduce, every/some, sort
 * Removes old callback exercises: 890, 893, 894
 *
 * Usage:
 *   node exercises/_gen_t3_callback_methods_core.js            # Append to curriculum
 *   node exercises/_gen_t3_callback_methods_core.js --validate  # Validate testRunners only
 */

const fs = require('fs');
const path = require('path');

const CURRICULUM_PATH = path.join(
  __dirname,
  'collections',
  'default-curriculum.json'
);

const OLD_IDS_TO_REMOVE = [890, 893, 894];

// ─── Resources (MDN only for T3) ────────────────────────────────────────────

const forEachRes = [
  { label: 'MDN: Array.prototype.forEach()', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach', description: 'forEach reference' },
];
const mapRes = [
  { label: 'MDN: Array.prototype.map()', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map', description: 'map reference' },
];
const filterRes = [
  { label: 'MDN: Array.prototype.filter()', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter', description: 'filter reference' },
];
const findRes = [
  { label: 'MDN: Array.prototype.find()', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find', description: 'find reference' },
  { label: 'MDN: Array.prototype.findIndex()', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex', description: 'findIndex reference' },
];
const reduceRes = [
  { label: 'MDN: Array.prototype.reduce()', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce', description: 'reduce reference' },
];
const everySomeRes = [
  { label: 'MDN: Array.prototype.every()', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every', description: 'every reference' },
  { label: 'MDN: Array.prototype.some()', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some', description: 'some reference' },
];
const sortRes = [
  { label: 'MDN: Array.prototype.sort()', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort', description: 'sort reference' },
];

// ─── Exercise Definitions ───────────────────────────────────────────────────

const exercises = [

  // ══════════════════════════════════════════════════════════════════════════
  // SUB-SECTION 1: forEach (5 exercises, IDs 1176-1180)
  // ══════════════════════════════════════════════════════════════════════════

  // 1. forEach: Basics (ENTRY POINT)
  {
    id: 1176,
    title: 'forEach: Basics',
    type: 'js',
    tier: 3,
    category: ['js-fundamentals', 'callback-methods'],
    tags: ['forEach', 'callbacks', 'iteration', 'arrays'],
    description:
      'Use forEach to iterate over an array and build a new result.',
    instructions:
      'The `.forEach()` method executes a provided callback function once for each array element, in order. Unlike `.map()`, forEach does not return a new array — it is used for side effects like logging, accumulating values, or building new data structures.\n\nWrite a function that appends "!" to each string in an array and returns the new array. Use `.forEach()` to iterate and build the result (see `@param`/`@returns` in the starter code).\n\nExample: `addExclamation(["hi", "bye"])` returns `["hi!", "bye!"]`\nExample: `addExclamation(["hello"])` returns `["hello!"]`\nExample: `addExclamation([])` returns `[]`',
    starterCode:
      '/**\n * Use .forEach() to build a new array with "!" appended to each string.\n *\n * @param {string[]} words - Array of strings\n * @returns {string[]} New array with "!" appended to each string\n */\nfunction addExclamation(words) {\n\n}\n',
    solution:
      'function addExclamation(words) {\n  const result = [];\n  words.forEach(function(word) {\n    result.push(word + "!");\n  });\n  return result;\n}',
    testRunner: `(code) => {
  const fn = new Function(code + '; return addExclamation;')();
  const r1 = fn(['hi', 'bye']);
  const r2 = fn(['hello']);
  const r3 = fn([]);
  const r4 = fn(['a', 'b', 'c', 'd']);
  const r5 = fn(['already!']);
  const r6 = fn(['LOUD', 'quiet']);
  const r7 = fn([' space ']);
  const r8 = fn(['', 'empty']);
  const input = ['x', 'y'];
  const r9 = fn(input);
  return [
    { pass: JSON.stringify(r1) === JSON.stringify(['hi!', 'bye!']), description: 'addExclamation(["hi","bye"]) returns ["hi!","bye!"]', got: JSON.stringify(r1) },
    { pass: JSON.stringify(r2) === JSON.stringify(['hello!']), description: 'addExclamation(["hello"]) returns ["hello!"]', got: JSON.stringify(r2) },
    { pass: JSON.stringify(r3) === JSON.stringify([]), description: 'addExclamation([]) returns []', got: JSON.stringify(r3) },
    { pass: JSON.stringify(r4) === JSON.stringify(['a!', 'b!', 'c!', 'd!']), description: 'Handles four-element array correctly', got: JSON.stringify(r4) },
    { pass: JSON.stringify(r5) === JSON.stringify(['already!!']), description: 'Appends even if string already ends with "!"', got: JSON.stringify(r5) },
    { pass: JSON.stringify(r6) === JSON.stringify(['LOUD!', 'quiet!']), description: 'Preserves original casing', got: JSON.stringify(r6) },
    { pass: JSON.stringify(r7) === JSON.stringify([' space !']), description: 'Preserves whitespace in strings', got: JSON.stringify(r7) },
    { pass: JSON.stringify(r8) === JSON.stringify(['!', 'empty!']), description: 'Handles empty string in array', got: JSON.stringify(r8) },
    { pass: JSON.stringify(input) === JSON.stringify(['x', 'y']), description: 'Does not mutate the original array', got: JSON.stringify(input) }
  ];
}`,
    hints: [
      'Create an empty result array first. Use `.forEach()` to visit each word and build up the result one element at a time by pushing the modified word.',
      'Inside the `.forEach()` callback, concatenate each word with the "!" character and push the result into your output array. Return the array after the loop completes.',
    ],
    resources: forEachRes,
  },

  // 2. forEach: Sum
  {
    id: 1177,
    title: 'forEach: Sum',
    type: 'js',
    tier: 3,
    category: ['js-fundamentals', 'callback-methods'],
    tags: ['forEach', 'callbacks', 'accumulation', 'arrays'],
    description:
      'Use forEach to accumulate a running total from an array of numbers.',
    instructions:
      'Sum all numbers in the array using `.forEach()` and return the total.',
    starterCode:
      '/**\n * @param {number[]} nums - Array of numbers\n * @returns {number} The sum of all numbers\n */\nfunction sumArray(nums) {\n\n}\n',
    solution:
      'function sumArray(nums) {\n  let total = 0;\n  nums.forEach(function(n) {\n    total += n;\n  });\n  return total;\n}',
    testRunner: `(code) => {
  const fn = new Function(code + '; return sumArray;')();
  const r1 = fn([1, 2, 3]);
  const r2 = fn([]);
  const r3 = fn([5]);
  const r4 = fn([-1, -2, -3]);
  const r5 = fn([10, -5, 3]);
  const r6 = fn([0, 0, 0]);
  const r7 = fn([1.5, 2.5]);
  const r8 = fn([100, 200, 300]);
  const r9 = fn([1, -1, 1, -1]);
  return [
    { pass: r1 === 6, description: 'sumArray([1,2,3]) returns 6', got: String(r1) },
    { pass: r2 === 0, description: 'sumArray([]) returns 0', got: String(r2) },
    { pass: r3 === 5, description: 'sumArray([5]) returns 5', got: String(r3) },
    { pass: r4 === -6, description: 'sumArray([-1,-2,-3]) returns -6', got: String(r4) },
    { pass: r5 === 8, description: 'sumArray([10,-5,3]) returns 8', got: String(r5) },
    { pass: r6 === 0, description: 'sumArray([0,0,0]) returns 0', got: String(r6) },
    { pass: r7 === 4, description: 'sumArray([1.5,2.5]) returns 4', got: String(r7) },
    { pass: r8 === 600, description: 'sumArray([100,200,300]) returns 600', got: String(r8) },
    { pass: r9 === 0, description: 'sumArray([1,-1,1,-1]) returns 0', got: String(r9) }
  ];
}`,
    hints: [
      'Declare a variable to hold the running total before the loop. Inside `.forEach()`, add each number to that total.',
      'Initialize `let total = 0` before calling `.forEach()`. In the callback, use `total += n` to accumulate. Return `total` after the loop.',
    ],
    resources: forEachRes,
  },

  // 3. forEach: Transform
  {
    id: 1178,
    title: 'forEach: Transform',
    type: 'js',
    tier: 3,
    category: ['js-fundamentals', 'callback-methods'],
    tags: ['forEach', 'callbacks', 'strings', 'transform'],
    description:
      'Use forEach to capitalize the first letter of each string in an array.',
    instructions:
      'Capitalize the first letter of each string and return a new array with the results. Use `.forEach()` to iterate.',
    starterCode:
      '/**\n * @param {string[]} words - Array of non-empty strings\n * @returns {string[]} New array with first letter capitalized\n */\nfunction capitalizeWords(words) {\n\n}\n',
    solution:
      'function capitalizeWords(words) {\n  const result = [];\n  words.forEach(function(word) {\n    result.push(word[0].toUpperCase() + word.slice(1));\n  });\n  return result;\n}',
    testRunner: `(code) => {
  const fn = new Function(code + '; return capitalizeWords;')();
  const r1 = fn(['hello', 'world']);
  const r2 = fn([]);
  const r3 = fn(['a']);
  const r4 = fn(['ALREADY', 'CAPS']);
  const r5 = fn(['hello']);
  const r6 = fn(['one', 'two', 'three', 'four']);
  const r7 = fn(['123abc']);
  const r8 = fn(['mixedCase', 'anotherOne']);
  const input = ['test'];
  const r9 = fn(input);
  return [
    { pass: JSON.stringify(r1) === JSON.stringify(['Hello', 'World']), description: 'capitalizeWords(["hello","world"]) returns ["Hello","World"]', got: JSON.stringify(r1) },
    { pass: JSON.stringify(r2) === JSON.stringify([]), description: 'capitalizeWords([]) returns []', got: JSON.stringify(r2) },
    { pass: JSON.stringify(r3) === JSON.stringify(['A']), description: 'capitalizeWords(["a"]) returns ["A"]', got: JSON.stringify(r3) },
    { pass: JSON.stringify(r4) === JSON.stringify(['ALREADY', 'CAPS']), description: 'Already-capitalized strings are unchanged', got: JSON.stringify(r4) },
    { pass: JSON.stringify(r5) === JSON.stringify(['Hello']), description: 'Single word is capitalized', got: JSON.stringify(r5) },
    { pass: JSON.stringify(r6) === JSON.stringify(['One', 'Two', 'Three', 'Four']), description: 'Handles four words correctly', got: JSON.stringify(r6) },
    { pass: JSON.stringify(r7) === JSON.stringify(['123abc']), description: 'Non-letter first character stays unchanged', got: JSON.stringify(r7) },
    { pass: JSON.stringify(r8) === JSON.stringify(['MixedCase', 'AnotherOne']), description: 'Handles mixed case strings', got: JSON.stringify(r8) },
    { pass: JSON.stringify(input) === JSON.stringify(['test']), description: 'Does not mutate the original array', got: JSON.stringify(input) }
  ];
}`,
    hints: [
      'For each word, grab the first character and convert it to uppercase, then combine it with the rest of the string using `.slice(1)`.',
      'Build a result array. In the callback, push `word[0].toUpperCase() + word.slice(1)` for each word. Return the result after the loop.',
    ],
    resources: forEachRes,
  },

  // 4. forEach: Count
  {
    id: 1179,
    title: 'forEach: Count',
    type: 'js',
    tier: 3,
    category: ['js-fundamentals', 'callback-methods'],
    tags: ['forEach', 'callbacks', 'counting', 'arrays'],
    description:
      'Use forEach to count how many times a target value appears in an array.',
    instructions:
      'Count and return how many times the target value appears in the array using `.forEach()`. Use strict equality for comparison.',
    starterCode:
      '/**\n * @param {Array} arr - Array of values\n * @param {*} target - Value to count\n * @returns {number} Number of times target appears\n */\nfunction countValue(arr, target) {\n\n}\n',
    solution:
      'function countValue(arr, target) {\n  let count = 0;\n  arr.forEach(function(item) {\n    if (item === target) count++;\n  });\n  return count;\n}',
    testRunner: `(code) => {
  const fn = new Function(code + '; return countValue;')();
  const r1 = fn([1, 2, 3, 2, 1], 2);
  const r2 = fn([1, 2, 3], 4);
  const r3 = fn([], 1);
  const r4 = fn([5, 5, 5], 5);
  const r5 = fn([1], 1);
  const r6 = fn(['a', 'b', 'a', 'c'], 'a');
  const r7 = fn([true, false, true], true);
  const r8 = fn([1, '1', 1], 1);
  const r9 = fn([null, undefined, null], null);
  return [
    { pass: r1 === 2, description: 'countValue([1,2,3,2,1], 2) returns 2', got: String(r1) },
    { pass: r2 === 0, description: 'countValue([1,2,3], 4) returns 0 (not found)', got: String(r2) },
    { pass: r3 === 0, description: 'countValue([], 1) returns 0 (empty array)', got: String(r3) },
    { pass: r4 === 3, description: 'countValue([5,5,5], 5) returns 3 (all match)', got: String(r4) },
    { pass: r5 === 1, description: 'countValue([1], 1) returns 1 (single element)', got: String(r5) },
    { pass: r6 === 2, description: 'countValue(["a","b","a","c"], "a") returns 2', got: String(r6) },
    { pass: r7 === 2, description: 'countValue([true,false,true], true) returns 2', got: String(r7) },
    { pass: r8 === 2, description: 'Uses strict equality: countValue([1,"1",1], 1) returns 2', got: String(r8) },
    { pass: r9 === 2, description: 'countValue([null,undefined,null], null) returns 2', got: String(r9) }
  ];
}`,
    hints: [
      'Start a counter at zero before the loop. Inside `.forEach()`, compare each element to the target using `===` and increment the counter when they match.',
      'Declare `let count = 0`. In the callback, use `if (item === target) count++`. Return `count` after the loop completes.',
    ],
    resources: forEachRes,
  },

  // 5. forEach: Side Effects
  {
    id: 1180,
    title: 'forEach: Side Effects',
    type: 'js',
    tier: 3,
    category: ['js-fundamentals', 'callback-methods'],
    tags: ['forEach', 'callbacks', 'objects', 'index'],
    description:
      'Use forEach with the index parameter to build a value-to-index map.',
    instructions:
      'Build and return an object that maps each array value to its index. If a value appears more than once, the last index wins. Use `.forEach()` with both the value and index parameters.',
    starterCode:
      '/**\n * @param {Array} arr - Array of values\n * @returns {Object} Object mapping each value to its last index\n */\nfunction buildIndexMap(arr) {\n\n}\n',
    solution:
      'function buildIndexMap(arr) {\n  const map = {};\n  arr.forEach(function(val, idx) {\n    map[val] = idx;\n  });\n  return map;\n}',
    testRunner: `(code) => {
  const fn = new Function(code + '; return buildIndexMap;')();
  const r1 = fn(['a', 'b', 'c']);
  const r2 = fn([]);
  const r3 = fn(['only']);
  const r4 = fn(['x', 'y', 'x']);
  const r5 = fn([10, 20, 30]);
  const r6 = fn(['hello', 'world']);
  const r7 = fn(['a', 'b', 'c', 'd', 'e']);
  const r8 = fn(['dup', 'dup']);
  return [
    { pass: JSON.stringify(r1) === JSON.stringify({a:0,b:1,c:2}), description: 'buildIndexMap(["a","b","c"]) returns {a:0,b:1,c:2}', got: JSON.stringify(r1) },
    { pass: JSON.stringify(r2) === JSON.stringify({}), description: 'buildIndexMap([]) returns {}', got: JSON.stringify(r2) },
    { pass: JSON.stringify(r3) === JSON.stringify({only:0}), description: 'buildIndexMap(["only"]) returns {only:0}', got: JSON.stringify(r3) },
    { pass: r4.x === 2 && r4.y === 1, description: 'Duplicate values use last index: ["x","y","x"] maps x to 2', got: JSON.stringify(r4) },
    { pass: JSON.stringify(r5) === JSON.stringify({'10':0,'20':1,'30':2}), description: 'Number values become string keys', got: JSON.stringify(r5) },
    { pass: JSON.stringify(r6) === JSON.stringify({hello:0,world:1}), description: 'buildIndexMap(["hello","world"]) returns {hello:0,world:1}', got: JSON.stringify(r6) },
    { pass: Object.keys(r7).length === 5, description: 'Five unique values produce five keys', got: String(Object.keys(r7).length) },
    { pass: r8.dup === 1 && Object.keys(r8).length === 1, description: '["dup","dup"] maps to {dup:1} (one key, last index)', got: JSON.stringify(r8) }
  ];
}`,
    hints: [
      'The `.forEach()` callback receives a second argument — the index. Use both the value and index to build an object where each key is the value and each property is the index.',
      'Start with an empty object. In the callback `function(val, idx)`, assign `map[val] = idx`. Since later assignments overwrite earlier ones, duplicates naturally keep the last index.',
    ],
    resources: forEachRes,
  },

  // ══════════════════════════════════════════════════════════════════════════
  // SUB-SECTION 2: map (5 exercises, IDs 1181-1185)
  // ══════════════════════════════════════════════════════════════════════════

  // 6. map: Basics (ENTRY POINT)
  {
    id: 1181,
    title: 'map: Basics',
    type: 'js',
    tier: 3,
    category: ['js-fundamentals', 'callback-methods'],
    tags: ['map', 'callbacks', 'transform', 'arrays'],
    description:
      'Use map to transform every element in an array and return a new array.',
    instructions:
      'The `.map()` method creates a new array by calling a callback function on every element in the original array. The return value of the callback becomes the new element. The original array is never modified.\n\nWrite a function that doubles every number in an array using `.map()` (see `@param`/`@returns` in the starter code).\n\nExample: `doubleAll([1, 2, 3])` returns `[2, 4, 6]`\nExample: `doubleAll([-5, 0, 5])` returns `[-10, 0, 10]`\nExample: `doubleAll([])` returns `[]`',
    starterCode:
      '/**\n * Use .map() to create a new array with each number doubled.\n *\n * @param {number[]} nums - Array of numbers\n * @returns {number[]} New array with each number doubled\n */\nfunction doubleAll(nums) {\n\n}\n',
    solution:
      'function doubleAll(nums) {\n  return nums.map(function(n) {\n    return n * 2;\n  });\n}',
    testRunner: `(code) => {
  const fn = new Function(code + '; return doubleAll;')();
  const r1 = fn([1, 2, 3]);
  const r2 = fn([]);
  const r3 = fn([5]);
  const r4 = fn([-1, -2]);
  const r5 = fn([0]);
  const r6 = fn([1.5, 2.5]);
  const r7 = fn([100, 200]);
  const r8 = fn([-3, 0, 3]);
  const input = [10, 20];
  const r9 = fn(input);
  return [
    { pass: JSON.stringify(r1) === JSON.stringify([2, 4, 6]), description: 'doubleAll([1,2,3]) returns [2,4,6]', got: JSON.stringify(r1) },
    { pass: JSON.stringify(r2) === JSON.stringify([]), description: 'doubleAll([]) returns []', got: JSON.stringify(r2) },
    { pass: JSON.stringify(r3) === JSON.stringify([10]), description: 'doubleAll([5]) returns [10]', got: JSON.stringify(r3) },
    { pass: JSON.stringify(r4) === JSON.stringify([-2, -4]), description: 'doubleAll([-1,-2]) returns [-2,-4]', got: JSON.stringify(r4) },
    { pass: JSON.stringify(r5) === JSON.stringify([0]), description: 'doubleAll([0]) returns [0]', got: JSON.stringify(r5) },
    { pass: JSON.stringify(r6) === JSON.stringify([3, 5]), description: 'doubleAll([1.5,2.5]) returns [3,5]', got: JSON.stringify(r6) },
    { pass: JSON.stringify(r7) === JSON.stringify([200, 400]), description: 'doubleAll([100,200]) returns [200,400]', got: JSON.stringify(r7) },
    { pass: JSON.stringify(r8) === JSON.stringify([-6, 0, 6]), description: 'doubleAll([-3,0,3]) returns [-6,0,6]', got: JSON.stringify(r8) },
    { pass: JSON.stringify(input) === JSON.stringify([10, 20]), description: 'Does not mutate the original array', got: JSON.stringify(input) }
  ];
}`,
    hints: [
      'The `.map()` method takes a callback that receives each element. Whatever the callback returns becomes the corresponding element in the new array.',
      'Call `nums.map(function(n) { return n * 2; })` and return the result directly. `.map()` handles building the new array for you.',
    ],
    resources: mapRes,
  },

  // 7. map: Numbers
  {
    id: 1182,
    title: 'map: Numbers',
    type: 'js',
    tier: 3,
    category: ['js-fundamentals', 'callback-methods'],
    tags: ['map', 'callbacks', 'math', 'transform'],
    description:
      'Use map to convert an array of Celsius temperatures to Fahrenheit.',
    instructions:
      'Convert each Celsius temperature to Fahrenheit using the formula `F = (C * 9/5) + 32`. Return the new array.',
    starterCode:
      '/**\n * @param {number[]} temps - Array of temperatures in Celsius\n * @returns {number[]} Array of temperatures in Fahrenheit\n */\nfunction celsiusToFahrenheit(temps) {\n\n}\n',
    solution:
      'function celsiusToFahrenheit(temps) {\n  return temps.map(function(c) {\n    return (c * 9 / 5) + 32;\n  });\n}',
    testRunner: `(code) => {
  const fn = new Function(code + '; return celsiusToFahrenheit;')();
  const r1 = fn([0]);
  const r2 = fn([100]);
  const r3 = fn([-40]);
  const r4 = fn([]);
  const r5 = fn([0, 100]);
  const r6 = fn([20, 25, 30]);
  const r7 = fn([-10, 0, 10]);
  const r8 = fn([5, 15, 35]);
  const r9 = fn([-20]);
  return [
    { pass: JSON.stringify(r1) === JSON.stringify([32]), description: '0°C converts to 32°F', got: JSON.stringify(r1) },
    { pass: JSON.stringify(r2) === JSON.stringify([212]), description: '100°C converts to 212°F', got: JSON.stringify(r2) },
    { pass: JSON.stringify(r3) === JSON.stringify([-40]), description: '-40°C converts to -40°F', got: JSON.stringify(r3) },
    { pass: JSON.stringify(r4) === JSON.stringify([]), description: 'Empty array returns []', got: JSON.stringify(r4) },
    { pass: JSON.stringify(r5) === JSON.stringify([32, 212]), description: '[0,100] converts to [32,212]', got: JSON.stringify(r5) },
    { pass: JSON.stringify(r6) === JSON.stringify([68, 77, 86]), description: '[20,25,30] converts to [68,77,86]', got: JSON.stringify(r6) },
    { pass: JSON.stringify(r7) === JSON.stringify([14, 32, 50]), description: '[-10,0,10] converts to [14,32,50]', got: JSON.stringify(r7) },
    { pass: JSON.stringify(r8) === JSON.stringify([41, 59, 95]), description: '[5,15,35] converts to [41,59,95]', got: JSON.stringify(r8) },
    { pass: JSON.stringify(r9) === JSON.stringify([-4]), description: '-20°C converts to -4°F', got: JSON.stringify(r9) }
  ];
}`,
    hints: [
      'Apply the formula `(C * 9/5) + 32` to each temperature inside the `.map()` callback. Return the converted value.',
      'Call `temps.map(function(c) { return (c * 9 / 5) + 32; })` and return the result.',
    ],
    resources: mapRes,
  },

  // 8. map: Strings
  {
    id: 1183,
    title: 'map: Strings',
    type: 'js',
    tier: 3,
    category: ['js-fundamentals', 'callback-methods'],
    tags: ['map', 'callbacks', 'strings', 'arrays'],
    description:
      'Use map to extract the first letter of each string in an array.',
    instructions:
      'Extract and return the first character of each string in the array using `.map()`.',
    starterCode:
      '/**\n * @param {string[]} words - Array of non-empty strings\n * @returns {string[]} Array of first characters\n */\nfunction getFirstLetters(words) {\n\n}\n',
    solution:
      'function getFirstLetters(words) {\n  return words.map(function(w) {\n    return w[0];\n  });\n}',
    testRunner: `(code) => {
  const fn = new Function(code + '; return getFirstLetters;')();
  const r1 = fn(['hello', 'world']);
  const r2 = fn([]);
  const r3 = fn(['a']);
  const r4 = fn(['Apple', 'Banana', 'Cherry']);
  const r5 = fn(['123', '456']);
  const r6 = fn([' space']);
  const r7 = fn(['x', 'y', 'z']);
  const r8 = fn(['Hello', 'World', 'Foo']);
  const r9 = fn(['one', 'two', 'three', 'four', 'five']);
  return [
    { pass: JSON.stringify(r1) === JSON.stringify(['h', 'w']), description: 'getFirstLetters(["hello","world"]) returns ["h","w"]', got: JSON.stringify(r1) },
    { pass: JSON.stringify(r2) === JSON.stringify([]), description: 'getFirstLetters([]) returns []', got: JSON.stringify(r2) },
    { pass: JSON.stringify(r3) === JSON.stringify(['a']), description: 'Single-character string returns that character', got: JSON.stringify(r3) },
    { pass: JSON.stringify(r4) === JSON.stringify(['A', 'B', 'C']), description: 'Preserves uppercase first letters', got: JSON.stringify(r4) },
    { pass: JSON.stringify(r5) === JSON.stringify(['1', '4']), description: 'Works with numeric strings', got: JSON.stringify(r5) },
    { pass: JSON.stringify(r6) === JSON.stringify([' ']), description: 'Space as first character is preserved', got: JSON.stringify(r6) },
    { pass: JSON.stringify(r7) === JSON.stringify(['x', 'y', 'z']), description: 'Single-char strings return themselves', got: JSON.stringify(r7) },
    { pass: JSON.stringify(r8) === JSON.stringify(['H', 'W', 'F']), description: 'Extracts first letter from three words', got: JSON.stringify(r8) },
    { pass: r9.length === 5, description: 'Output array has same length as input', got: String(r9.length) }
  ];
}`,
    hints: [
      'Access the first character of each string using bracket notation `[0]` inside the `.map()` callback.',
      'Return `words.map(function(w) { return w[0]; })` to extract the first character of each string.',
    ],
    resources: mapRes,
  },

  // 9. map: Objects
  {
    id: 1184,
    title: 'map: Objects',
    type: 'js',
    tier: 3,
    category: ['js-fundamentals', 'callback-methods'],
    tags: ['map', 'callbacks', 'objects', 'pluck'],
    description:
      'Use map to extract a specific property value from each object in an array.',
    instructions:
      'Extract the value of a given property from each object and return the array of values. Use `.map()` with bracket notation to access the key.',
    starterCode:
      '/**\n * @param {Object[]} objects - Array of objects\n * @param {string} key - Property name to extract\n * @returns {Array} Array of values for the given key\n */\nfunction pluck(objects, key) {\n\n}\n',
    solution:
      'function pluck(objects, key) {\n  return objects.map(function(obj) {\n    return obj[key];\n  });\n}',
    testRunner: `(code) => {
  const fn = new Function(code + '; return pluck;')();
  const r1 = fn([{name:'Alice'},{name:'Bob'}], 'name');
  const r2 = fn([], 'name');
  const r3 = fn([{age:25},{age:30}], 'age');
  const r4 = fn([{name:'Alice',age:25}], 'name');
  const r5 = fn([{a:1},{a:2},{a:3}], 'a');
  const r6 = fn([{x:true},{x:false}], 'x');
  const r7 = fn([{name:'Alice'},{name:'Bob'}], 'missing');
  const r8 = fn([{score:90},{score:85},{score:95}], 'score');
  const r9 = fn([{id:1,name:'A'},{id:2,name:'B'}], 'id');
  return [
    { pass: JSON.stringify(r1) === JSON.stringify(['Alice','Bob']), description: 'Plucks "name" from two objects', got: JSON.stringify(r1) },
    { pass: JSON.stringify(r2) === JSON.stringify([]), description: 'Empty array returns []', got: JSON.stringify(r2) },
    { pass: JSON.stringify(r3) === JSON.stringify([25,30]), description: 'Plucks numeric "age" values', got: JSON.stringify(r3) },
    { pass: JSON.stringify(r4) === JSON.stringify(['Alice']), description: 'Plucks from single object', got: JSON.stringify(r4) },
    { pass: JSON.stringify(r5) === JSON.stringify([1,2,3]), description: 'Plucks "a" from three objects', got: JSON.stringify(r5) },
    { pass: JSON.stringify(r6) === JSON.stringify([true,false]), description: 'Plucks boolean values', got: JSON.stringify(r6) },
    { pass: JSON.stringify(r7) === JSON.stringify([undefined,undefined]), description: 'Missing key returns undefined for each object', got: JSON.stringify(r7) },
    { pass: JSON.stringify(r8) === JSON.stringify([90,85,95]), description: 'Plucks "score" from three objects', got: JSON.stringify(r8) },
    { pass: JSON.stringify(r9) === JSON.stringify([1,2]), description: 'Plucks "id" while ignoring other properties', got: JSON.stringify(r9) }
  ];
}`,
    hints: [
      'Inside the `.map()` callback, use bracket notation `obj[key]` to access the property dynamically, since the key is a variable.',
      'Return `objects.map(function(obj) { return obj[key]; })` — bracket notation lets you use a variable as the property name.',
    ],
    resources: mapRes,
  },

  // 10. map: Conditional
  {
    id: 1185,
    title: 'map: Conditional',
    type: 'js',
    tier: 3,
    category: ['js-fundamentals', 'callback-methods'],
    tags: ['map', 'callbacks', 'conditional', 'transform'],
    description:
      'Use map with conditional logic to selectively transform array elements.',
    instructions:
      'Apply a discount to prices above a threshold. Prices above the threshold are multiplied by `(1 - discountRate)`. Prices at or below the threshold are unchanged.',
    starterCode:
      '/**\n * @param {number[]} prices - Array of prices\n * @param {number} threshold - Minimum price to discount (exclusive)\n * @param {number} discountRate - Discount as a decimal (e.g. 0.1 = 10%)\n * @returns {number[]} Array of adjusted prices\n */\nfunction applyDiscount(prices, threshold, discountRate) {\n\n}\n',
    solution:
      'function applyDiscount(prices, threshold, discountRate) {\n  return prices.map(function(p) {\n    return p > threshold ? p * (1 - discountRate) : p;\n  });\n}',
    testRunner: `(code) => {
  const fn = new Function(code + '; return applyDiscount;')();
  const r1 = fn([100, 50, 200], 75, 0.1);
  const r2 = fn([], 50, 0.5);
  const r3 = fn([100, 200, 300], 0, 0.5);
  const r4 = fn([10, 20, 30], 100, 0.1);
  const r5 = fn([50], 50, 0.1);
  const r6 = fn([100], 50, 0);
  const r7 = fn([100], 50, 1);
  const r8 = fn([25, 75, 50, 100], 50, 0.2);
  const r9 = fn([10, 60, 30, 90], 50, 0.5);
  return [
    { pass: JSON.stringify(r1) === JSON.stringify([90, 50, 180]), description: '[100,50,200] with threshold 75, 10% off → [90,50,180]', got: JSON.stringify(r1) },
    { pass: JSON.stringify(r2) === JSON.stringify([]), description: 'Empty array returns []', got: JSON.stringify(r2) },
    { pass: JSON.stringify(r3) === JSON.stringify([50, 100, 150]), description: 'All above threshold 0 with 50% off', got: JSON.stringify(r3) },
    { pass: JSON.stringify(r4) === JSON.stringify([10, 20, 30]), description: 'None above threshold — all unchanged', got: JSON.stringify(r4) },
    { pass: JSON.stringify(r5) === JSON.stringify([50]), description: 'Price at threshold is not discounted (not strictly above)', got: JSON.stringify(r5) },
    { pass: JSON.stringify(r6) === JSON.stringify([100]), description: '0% discount rate leaves price unchanged', got: JSON.stringify(r6) },
    { pass: JSON.stringify(r7) === JSON.stringify([0]), description: '100% discount rate makes price 0', got: JSON.stringify(r7) },
    { pass: JSON.stringify(r8) === JSON.stringify([25, 60, 50, 80]), description: '[25,75,50,100] with threshold 50, 20% off', got: JSON.stringify(r8) },
    { pass: JSON.stringify(r9) === JSON.stringify([10, 30, 30, 45]), description: '[10,60,30,90] with threshold 50, 50% off', got: JSON.stringify(r9) }
  ];
}`,
    hints: [
      'Inside the `.map()` callback, use a conditional to check if the price exceeds the threshold. If so, apply the discount; otherwise return the original price.',
      'Use a ternary: `p > threshold ? p * (1 - discountRate) : p`. This returns the discounted price when above threshold, or the unchanged price otherwise.',
    ],
    resources: mapRes,
  },

  // ══════════════════════════════════════════════════════════════════════════
  // SUB-SECTION 3: filter (5 exercises, IDs 1186-1190)
  // ══════════════════════════════════════════════════════════════════════════

  // 11. filter: Basics (ENTRY POINT)
  {
    id: 1186,
    title: 'filter: Basics',
    type: 'js',
    tier: 3,
    category: ['js-fundamentals', 'callback-methods'],
    tags: ['filter', 'callbacks', 'arrays', 'selection'],
    description:
      'Use filter to keep only elements that pass a test.',
    instructions:
      'The `.filter()` method creates a new array containing only the elements where the callback function returns `true`. Elements where the callback returns `false` are excluded. The original array is never modified.\n\nWrite a function that returns only the positive numbers from an array using `.filter()` (see `@param`/`@returns` in the starter code).\n\nExample: `getPositives([1, -2, 3, -4])` returns `[1, 3]`\nExample: `getPositives([-1, -2])` returns `[]`\nExample: `getPositives([])` returns `[]`',
    starterCode:
      '/**\n * Use .filter() to create a new array containing only positive numbers.\n *\n * @param {number[]} nums - Array of numbers\n * @returns {number[]} Array containing only numbers greater than 0\n */\nfunction getPositives(nums) {\n\n}\n',
    solution:
      'function getPositives(nums) {\n  return nums.filter(function(n) {\n    return n > 0;\n  });\n}',
    testRunner: `(code) => {
  const fn = new Function(code + '; return getPositives;')();
  const r1 = fn([1, -2, 3, -4, 5]);
  const r2 = fn([]);
  const r3 = fn([1, 2, 3]);
  const r4 = fn([-1, -2, -3]);
  const r5 = fn([0, 1, 2]);
  const r6 = fn([5]);
  const r7 = fn([-5]);
  const r8 = fn([0]);
  const r9 = fn([0.5, -0.5, 1.5]);
  return [
    { pass: JSON.stringify(r1) === JSON.stringify([1, 3, 5]), description: 'getPositives([1,-2,3,-4,5]) returns [1,3,5]', got: JSON.stringify(r1) },
    { pass: JSON.stringify(r2) === JSON.stringify([]), description: 'getPositives([]) returns []', got: JSON.stringify(r2) },
    { pass: JSON.stringify(r3) === JSON.stringify([1, 2, 3]), description: 'All positive — returns all', got: JSON.stringify(r3) },
    { pass: JSON.stringify(r4) === JSON.stringify([]), description: 'All negative — returns []', got: JSON.stringify(r4) },
    { pass: JSON.stringify(r5) === JSON.stringify([1, 2]), description: 'Zero is not positive — excluded', got: JSON.stringify(r5) },
    { pass: JSON.stringify(r6) === JSON.stringify([5]), description: 'Single positive element is kept', got: JSON.stringify(r6) },
    { pass: JSON.stringify(r7) === JSON.stringify([]), description: 'Single negative element is excluded', got: JSON.stringify(r7) },
    { pass: JSON.stringify(r8) === JSON.stringify([]), description: 'Zero alone returns []', got: JSON.stringify(r8) },
    { pass: JSON.stringify(r9) === JSON.stringify([0.5, 1.5]), description: 'Positive decimals are kept', got: JSON.stringify(r9) }
  ];
}`,
    hints: [
      'The `.filter()` callback should return `true` to keep an element or `false` to exclude it. Check whether each number is greater than zero.',
      'Call `nums.filter(function(n) { return n > 0; })` and return the result. Filter builds the new array automatically.',
    ],
    resources: filterRes,
  },

  // 12. filter: Numbers
  {
    id: 1187,
    title: 'filter: Numbers',
    type: 'js',
    tier: 3,
    category: ['js-fundamentals', 'callback-methods'],
    tags: ['filter', 'callbacks', 'range', 'comparison'],
    description:
      'Use filter to keep only numbers within a given range.',
    instructions:
      'Return only the numbers that fall within the range from `min` to `max`, inclusive. Use `.filter()` to test each number.',
    starterCode:
      '/**\n * @param {number[]} nums - Array of numbers\n * @param {number} min - Minimum value (inclusive)\n * @param {number} max - Maximum value (inclusive)\n * @returns {number[]} Numbers within [min, max]\n */\nfunction inRange(nums, min, max) {\n\n}\n',
    solution:
      'function inRange(nums, min, max) {\n  return nums.filter(function(n) {\n    return n >= min && n <= max;\n  });\n}',
    testRunner: `(code) => {
  const fn = new Function(code + '; return inRange;')();
  const r1 = fn([1, 2, 3, 4, 5], 2, 4);
  const r2 = fn([], 0, 10);
  const r3 = fn([1, 2, 3], 1, 3);
  const r4 = fn([1, 2, 3], 5, 10);
  const r5 = fn([5], 5, 5);
  const r6 = fn([-5, 0, 5], -5, 5);
  const r7 = fn([10, 20, 30, 40, 50], 15, 35);
  const r8 = fn([-10, -5, 0, 5, 10], -5, 5);
  const r9 = fn([1, 1, 2, 2, 3, 3], 2, 2);
  return [
    { pass: JSON.stringify(r1) === JSON.stringify([2, 3, 4]), description: '[1,2,3,4,5] in range [2,4] returns [2,3,4]', got: JSON.stringify(r1) },
    { pass: JSON.stringify(r2) === JSON.stringify([]), description: 'Empty array returns []', got: JSON.stringify(r2) },
    { pass: JSON.stringify(r3) === JSON.stringify([1, 2, 3]), description: 'All in range — returns all', got: JSON.stringify(r3) },
    { pass: JSON.stringify(r4) === JSON.stringify([]), description: 'None in range — returns []', got: JSON.stringify(r4) },
    { pass: JSON.stringify(r5) === JSON.stringify([5]), description: 'min equals max — keeps exact match', got: JSON.stringify(r5) },
    { pass: JSON.stringify(r6) === JSON.stringify([-5, 0, 5]), description: 'Negative to positive range works', got: JSON.stringify(r6) },
    { pass: JSON.stringify(r7) === JSON.stringify([20, 30]), description: '[10,20,30,40,50] in [15,35] returns [20,30]', got: JSON.stringify(r7) },
    { pass: JSON.stringify(r8) === JSON.stringify([-5, 0, 5]), description: '[-10,-5,0,5,10] in [-5,5] returns [-5,0,5]', got: JSON.stringify(r8) },
    { pass: JSON.stringify(r9) === JSON.stringify([2, 2]), description: 'Duplicates at boundary are kept', got: JSON.stringify(r9) }
  ];
}`,
    hints: [
      'In the `.filter()` callback, check that each number is greater than or equal to `min` AND less than or equal to `max`.',
      'Use `n >= min && n <= max` as the return condition in your callback. Both boundaries are inclusive.',
    ],
    resources: filterRes,
  },

  // 13. filter: Strings
  {
    id: 1188,
    title: 'filter: Strings',
    type: 'js',
    tier: 3,
    category: ['js-fundamentals', 'callback-methods'],
    tags: ['filter', 'callbacks', 'strings', 'length'],
    description:
      'Use filter to keep only strings that meet a minimum length.',
    instructions:
      'Return only the strings whose length is greater than or equal to `minLen`. Use `.filter()` to check each string.',
    starterCode:
      '/**\n * @param {string[]} words - Array of strings\n * @param {number} minLen - Minimum length (inclusive)\n * @returns {string[]} Strings with length >= minLen\n */\nfunction filterByLength(words, minLen) {\n\n}\n',
    solution:
      'function filterByLength(words, minLen) {\n  return words.filter(function(w) {\n    return w.length >= minLen;\n  });\n}',
    testRunner: `(code) => {
  const fn = new Function(code + '; return filterByLength;')();
  const r1 = fn(['hi', 'hello', 'hey'], 3);
  const r2 = fn([], 5);
  const r3 = fn(['abc', 'de', 'fghi'], 3);
  const r4 = fn(['a', 'ab', 'abc'], 1);
  const r5 = fn(['a', 'ab', 'abc'], 4);
  const r6 = fn(['test'], 4);
  const r7 = fn(['test'], 5);
  const r8 = fn(['', 'a', 'ab'], 1);
  const r9 = fn(['hello', 'world', 'foo', 'bar', 'baz'], 4);
  return [
    { pass: JSON.stringify(r1) === JSON.stringify(['hello', 'hey']), description: '["hi","hello","hey"] with minLen 3 returns ["hello","hey"]', got: JSON.stringify(r1) },
    { pass: JSON.stringify(r2) === JSON.stringify([]), description: 'Empty array returns []', got: JSON.stringify(r2) },
    { pass: JSON.stringify(r3) === JSON.stringify(['abc', 'fghi']), description: '["abc","de","fghi"] with minLen 3 keeps strings >= 3 chars', got: JSON.stringify(r3) },
    { pass: JSON.stringify(r4) === JSON.stringify(['a', 'ab', 'abc']), description: 'minLen 1 keeps all non-empty strings', got: JSON.stringify(r4) },
    { pass: JSON.stringify(r5) === JSON.stringify([]), description: 'No string meets minLen 4', got: JSON.stringify(r5) },
    { pass: JSON.stringify(r6) === JSON.stringify(['test']), description: 'String at exact minLen is kept', got: JSON.stringify(r6) },
    { pass: JSON.stringify(r7) === JSON.stringify([]), description: 'String shorter than minLen is excluded', got: JSON.stringify(r7) },
    { pass: JSON.stringify(r8) === JSON.stringify(['a', 'ab']), description: 'Empty string is excluded with minLen 1', got: JSON.stringify(r8) },
    { pass: JSON.stringify(r9) === JSON.stringify(['hello', 'world']), description: 'Keeps only 5-letter words from mixed array', got: JSON.stringify(r9) }
  ];
}`,
    hints: [
      'In the `.filter()` callback, compare each string\'s `.length` property against `minLen` using `>=`.',
      'Return `words.filter(function(w) { return w.length >= minLen; })`. Strings at exactly the minimum length are included.',
    ],
    resources: filterRes,
  },

  // 14. filter: Objects
  {
    id: 1189,
    title: 'filter: Objects',
    type: 'js',
    tier: 3,
    category: ['js-fundamentals', 'callback-methods'],
    tags: ['filter', 'callbacks', 'objects', 'property'],
    description:
      'Use filter to keep only objects where a property matches a given value.',
    instructions:
      'Return only the objects where `obj[key]` strictly equals the given value. Use `.filter()` with bracket notation.',
    starterCode:
      '/**\n * @param {Object[]} objects - Array of objects\n * @param {string} key - Property name to check\n * @param {*} value - Value to match (strict equality)\n * @returns {Object[]} Objects where obj[key] === value\n */\nfunction filterByProperty(objects, key, value) {\n\n}\n',
    solution:
      'function filterByProperty(objects, key, value) {\n  return objects.filter(function(obj) {\n    return obj[key] === value;\n  });\n}',
    testRunner: `(code) => {
  const fn = new Function(code + '; return filterByProperty;')();
  const r1 = fn([{role:'admin'},{role:'user'},{role:'admin'}], 'role', 'admin');
  const r2 = fn([], 'role', 'admin');
  const r3 = fn([{active:true},{active:false}], 'active', true);
  const r4 = fn([{age:25},{age:30},{age:25}], 'age', 25);
  const r5 = fn([{name:'A'},{name:'B'}], 'name', 'C');
  const r6 = fn([{x:1}], 'x', 1);
  const r7 = fn([{x:1}], 'y', 1);
  const r8 = fn([{a:1,b:2},{a:3,b:2},{a:1,b:4}], 'b', 2);
  const r9 = fn([{val:0},{val:false},{val:null}], 'val', 0);
  return [
    { pass: JSON.stringify(r1) === JSON.stringify([{role:'admin'},{role:'admin'}]), description: 'Filters objects where role is "admin"', got: JSON.stringify(r1) },
    { pass: JSON.stringify(r2) === JSON.stringify([]), description: 'Empty array returns []', got: JSON.stringify(r2) },
    { pass: JSON.stringify(r3) === JSON.stringify([{active:true}]), description: 'Filters by boolean property', got: JSON.stringify(r3) },
    { pass: JSON.stringify(r4) === JSON.stringify([{age:25},{age:25}]), description: 'Filters by numeric property', got: JSON.stringify(r4) },
    { pass: JSON.stringify(r5) === JSON.stringify([]), description: 'No match returns []', got: JSON.stringify(r5) },
    { pass: JSON.stringify(r6) === JSON.stringify([{x:1}]), description: 'Single matching object is returned', got: JSON.stringify(r6) },
    { pass: JSON.stringify(r7) === JSON.stringify([]), description: 'Missing key does not match (undefined !== 1)', got: JSON.stringify(r7) },
    { pass: JSON.stringify(r8) === JSON.stringify([{a:1,b:2},{a:3,b:2}]), description: 'Filters by non-first property', got: JSON.stringify(r8) },
    { pass: JSON.stringify(r9) === JSON.stringify([{val:0}]), description: 'Strict equality: 0 does not match false or null', got: JSON.stringify(r9) }
  ];
}`,
    hints: [
      'Use bracket notation `obj[key]` to dynamically access the property. Compare it to the target value using strict equality `===`.',
      'Return `objects.filter(function(obj) { return obj[key] === value; })`. Bracket notation is required because the key is a variable.',
    ],
    resources: filterRes,
  },

  // 15. filter: Complex
  {
    id: 1190,
    title: 'filter: Complex',
    type: 'js',
    tier: 3,
    category: ['js-fundamentals', 'callback-methods'],
    tags: ['filter', 'callbacks', 'unique', 'indexOf'],
    description:
      'Use filter to return only values that appear exactly once in an array.',
    instructions:
      'Return only the values that appear exactly once in the array. Use `.filter()` combined with `.indexOf()` and `.lastIndexOf()` to detect uniqueness.',
    starterCode:
      '/**\n * @param {Array} arr - Array of values\n * @returns {Array} Values that appear exactly once\n */\nfunction getUniqueValues(arr) {\n\n}\n',
    solution:
      'function getUniqueValues(arr) {\n  return arr.filter(function(item) {\n    return arr.indexOf(item) === arr.lastIndexOf(item);\n  });\n}',
    testRunner: `(code) => {
  const fn = new Function(code + '; return getUniqueValues;')();
  const r1 = fn([1, 2, 2, 3, 3, 4]);
  const r2 = fn([]);
  const r3 = fn([1, 2, 3]);
  const r4 = fn([1, 1, 2, 2]);
  const r5 = fn([5]);
  const r6 = fn([1, 1, 1]);
  const r7 = fn(['a', 'b', 'a', 'c']);
  const r8 = fn([1, 2, 3, 2, 4, 3]);
  const r9 = fn([true, false, true]);
  return [
    { pass: JSON.stringify(r1) === JSON.stringify([1, 4]), description: '[1,2,2,3,3,4] → [1,4] (only non-duplicated values)', got: JSON.stringify(r1) },
    { pass: JSON.stringify(r2) === JSON.stringify([]), description: 'Empty array returns []', got: JSON.stringify(r2) },
    { pass: JSON.stringify(r3) === JSON.stringify([1, 2, 3]), description: 'All unique values are returned', got: JSON.stringify(r3) },
    { pass: JSON.stringify(r4) === JSON.stringify([]), description: 'No unique values returns []', got: JSON.stringify(r4) },
    { pass: JSON.stringify(r5) === JSON.stringify([5]), description: 'Single element is unique', got: JSON.stringify(r5) },
    { pass: JSON.stringify(r6) === JSON.stringify([]), description: 'All same value — none are unique', got: JSON.stringify(r6) },
    { pass: JSON.stringify(r7) === JSON.stringify(['b', 'c']), description: 'Works with strings', got: JSON.stringify(r7) },
    { pass: JSON.stringify(r8) === JSON.stringify([1, 4]), description: 'Correctly identifies unique values in mixed duplicates', got: JSON.stringify(r8) },
    { pass: JSON.stringify(r9) === JSON.stringify([false]), description: 'Works with booleans', got: JSON.stringify(r9) }
  ];
}`,
    hints: [
      'A value is unique if it appears only once. You can check this by comparing where the value first appears (`.indexOf()`) with where it last appears (`.lastIndexOf()`). If both are the same index, it appears exactly once.',
      'Use `.filter(function(item) { return arr.indexOf(item) === arr.lastIndexOf(item); })`. When the first and last positions are the same, the value exists only once.',
    ],
    resources: filterRes,
  },

  // ══════════════════════════════════════════════════════════════════════════
  // SUB-SECTION 4: find / findIndex (5 exercises, IDs 1191-1195)
  // ══════════════════════════════════════════════════════════════════════════

  // 16. find: Basics (ENTRY POINT)
  {
    id: 1191,
    title: 'find: Basics',
    type: 'js',
    tier: 3,
    category: ['js-fundamentals', 'callback-methods'],
    tags: ['find', 'callbacks', 'search', 'arrays'],
    description:
      'Use find to locate the first element that passes a test.',
    instructions:
      'The `.find()` method returns the first element in an array where the callback returns `true`. If no element matches, it returns `undefined`. Unlike `.filter()`, find stops as soon as it finds one match.\n\nWrite a function that finds the first number greater than a given threshold using `.find()` (see `@param`/`@returns` in the starter code).\n\nExample: `findFirstAbove([1, 5, 10, 15], 8)` returns `10`\nExample: `findFirstAbove([1, 2, 3], 10)` returns `undefined`',
    starterCode:
      '/**\n * Use .find() to locate the first number greater than the threshold.\n *\n * @param {number[]} nums - Array of numbers\n * @param {number} threshold - Value to exceed\n * @returns {number|undefined} First number > threshold, or undefined\n */\nfunction findFirstAbove(nums, threshold) {\n\n}\n',
    solution:
      'function findFirstAbove(nums, threshold) {\n  return nums.find(function(n) {\n    return n > threshold;\n  });\n}',
    testRunner: `(code) => {
  const fn = new Function(code + '; return findFirstAbove;')();
  const r1 = fn([1, 5, 10, 15], 8);
  const r2 = fn([1, 2, 3], 10);
  const r3 = fn([], 5);
  const r4 = fn([10, 20, 30], 5);
  const r5 = fn([1, 2, 15], 14);
  const r6 = fn([5], 3);
  const r7 = fn([5], 5);
  const r8 = fn([-5, 0, 5, 10], 0);
  const r9 = fn([1, 2, 3, 4, 5], 0);
  return [
    { pass: r1 === 10, description: 'findFirstAbove([1,5,10,15], 8) returns 10', got: String(r1) },
    { pass: r2 === undefined, description: 'No match returns undefined', got: String(r2) },
    { pass: r3 === undefined, description: 'Empty array returns undefined', got: String(r3) },
    { pass: r4 === 10, description: 'Returns first match, not all matches', got: String(r4) },
    { pass: r5 === 15, description: 'Finds match at last position', got: String(r5) },
    { pass: r6 === 5, description: 'Single element above threshold is returned', got: String(r6) },
    { pass: r7 === undefined, description: 'Equal to threshold is not above — returns undefined', got: String(r7) },
    { pass: r8 === 5, description: 'findFirstAbove([-5,0,5,10], 0) returns 5', got: String(r8) },
    { pass: r9 === 1, description: 'findFirstAbove([1,2,3,4,5], 0) returns 1 (first element)', got: String(r9) }
  ];
}`,
    hints: [
      'The `.find()` callback returns `true` for the first matching element. Compare each number to the threshold using `>`. The method returns the element itself, not a boolean.',
      'Call `nums.find(function(n) { return n > threshold; })` and return the result. If no element matches, `.find()` returns `undefined` automatically.',
    ],
    resources: findRes,
  },

  // 17. findIndex: Basics
  {
    id: 1192,
    title: 'findIndex: Basics',
    type: 'js',
    tier: 3,
    category: ['js-fundamentals', 'callback-methods'],
    tags: ['findIndex', 'callbacks', 'search', 'index'],
    description:
      'Use findIndex to locate the position of the first element that passes a test.',
    instructions:
      'Return the index of the first number greater than the threshold. If no match is found, return `-1`. Use `.findIndex()`.',
    starterCode:
      '/**\n * @param {number[]} nums - Array of numbers\n * @param {number} threshold - Value to exceed\n * @returns {number} Index of first number > threshold, or -1\n */\nfunction findIndexAbove(nums, threshold) {\n\n}\n',
    solution:
      'function findIndexAbove(nums, threshold) {\n  return nums.findIndex(function(n) {\n    return n > threshold;\n  });\n}',
    testRunner: `(code) => {
  const fn = new Function(code + '; return findIndexAbove;')();
  const r1 = fn([1, 5, 10, 15], 8);
  const r2 = fn([1, 2, 3], 10);
  const r3 = fn([], 5);
  const r4 = fn([10, 20, 30], 5);
  const r5 = fn([1, 2, 15], 14);
  const r6 = fn([5], 3);
  const r7 = fn([5], 5);
  const r8 = fn([-5, 0, 5, 10], 0);
  const r9 = fn([1, 2, 3, 4, 5], 4);
  return [
    { pass: r1 === 2, description: 'findIndexAbove([1,5,10,15], 8) returns 2', got: String(r1) },
    { pass: r2 === -1, description: 'No match returns -1', got: String(r2) },
    { pass: r3 === -1, description: 'Empty array returns -1', got: String(r3) },
    { pass: r4 === 0, description: 'First element matches — returns 0', got: String(r4) },
    { pass: r5 === 2, description: 'Last element matches — returns last index', got: String(r5) },
    { pass: r6 === 0, description: 'Single element above threshold returns 0', got: String(r6) },
    { pass: r7 === -1, description: 'Equal to threshold returns -1 (not strictly above)', got: String(r7) },
    { pass: r8 === 2, description: 'findIndexAbove([-5,0,5,10], 0) returns 2', got: String(r8) },
    { pass: r9 === 4, description: 'findIndexAbove([1,2,3,4,5], 4) returns 4', got: String(r9) }
  ];
}`,
    hints: [
      'The `.findIndex()` method works like `.find()` but returns the index instead of the element. It returns `-1` when no match is found.',
      'Call `nums.findIndex(function(n) { return n > threshold; })` and return the result directly.',
    ],
    resources: findRes,
  },

  // 18. find: Objects
  {
    id: 1193,
    title: 'find: Objects',
    type: 'js',
    tier: 3,
    category: ['js-fundamentals', 'callback-methods'],
    tags: ['find', 'callbacks', 'objects', 'search'],
    description:
      'Use find to locate the first object with a matching property.',
    instructions:
      'Find and return the first object whose `.name` property matches the given name. Return `undefined` if not found.',
    starterCode:
      '/**\n * @param {Object[]} people - Array of objects with a name property\n * @param {string} name - Name to search for\n * @returns {Object|undefined} First matching object, or undefined\n */\nfunction findByName(people, name) {\n\n}\n',
    solution:
      'function findByName(people, name) {\n  return people.find(function(p) {\n    return p.name === name;\n  });\n}',
    testRunner: `(code) => {
  const fn = new Function(code + '; return findByName;')();
  const r1 = fn([{name:'Alice',age:25},{name:'Bob',age:30}], 'Bob');
  const r2 = fn([{name:'Alice'}], 'Charlie');
  const r3 = fn([], 'Alice');
  const r4 = fn([{name:'Alice'},{name:'Alice'}], 'Alice');
  const r5 = fn([{name:'alice'}], 'Alice');
  const r6 = fn([{name:'Alice',role:'admin'}], 'Alice');
  const r7 = fn([{name:'A'},{name:'B'},{name:'C'}], 'C');
  const r8 = fn([{name:'A'},{name:'B'},{name:'C'}], 'D');
  const r9 = fn([{name:'',age:0},{name:'Bob',age:25}], '');
  return [
    { pass: JSON.stringify(r1) === JSON.stringify({name:'Bob',age:30}), description: 'Finds Bob in the array', got: JSON.stringify(r1) },
    { pass: r2 === undefined, description: 'Returns undefined when name not found', got: String(r2) },
    { pass: r3 === undefined, description: 'Empty array returns undefined', got: String(r3) },
    { pass: JSON.stringify(r4) === JSON.stringify({name:'Alice'}), description: 'Returns first match when duplicates exist', got: JSON.stringify(r4) },
    { pass: r5 === undefined, description: 'Case-sensitive: "alice" !== "Alice"', got: String(r5) },
    { pass: JSON.stringify(r6) === JSON.stringify({name:'Alice',role:'admin'}), description: 'Returns entire object, not just name', got: JSON.stringify(r6) },
    { pass: JSON.stringify(r7) === JSON.stringify({name:'C'}), description: 'Finds element at end of array', got: JSON.stringify(r7) },
    { pass: r8 === undefined, description: 'No match in array returns undefined', got: String(r8) },
    { pass: JSON.stringify(r9) === JSON.stringify({name:'',age:0}), description: 'Empty string name matches correctly', got: JSON.stringify(r9) }
  ];
}`,
    hints: [
      'In the `.find()` callback, compare each object\'s `.name` property to the target name using strict equality.',
      'Return `people.find(function(p) { return p.name === name; })`. The method returns the full object, not just the property.',
    ],
    resources: findRes,
  },

  // 19. find and findIndex: Combined
  {
    id: 1194,
    title: 'find and findIndex: Combined',
    type: 'js',
    tier: 3,
    category: ['js-fundamentals', 'callback-methods'],
    tags: ['find', 'findIndex', 'callbacks', 'combined'],
    description:
      'Use both find and findIndex together to return an item and its position.',
    instructions:
      'Locate an object by a key-value pair. Return an object with `item` (the found object or `null`) and `index` (the position or `-1`). Use `.find()` for the item and `.findIndex()` for the position.',
    starterCode:
      '/**\n * @param {Object[]} items - Array of objects\n * @param {string} key - Property name to search\n * @param {*} value - Value to match\n * @returns {{ item: Object|null, index: number }} Found item and its index\n */\nfunction locateItem(items, key, value) {\n\n}\n',
    solution:
      'function locateItem(items, key, value) {\n  var item = items.find(function(obj) { return obj[key] === value; });\n  var index = items.findIndex(function(obj) { return obj[key] === value; });\n  return { item: item !== undefined ? item : null, index: index };\n}',
    testRunner: `(code) => {
  const fn = new Function(code + '; return locateItem;')();
  const r1 = fn([{id:1,name:'A'},{id:2,name:'B'}], 'id', 2);
  const r2 = fn([{id:1}], 'id', 5);
  const r3 = fn([], 'id', 1);
  const r4 = fn([{id:1},{id:2},{id:3}], 'id', 1);
  const r5 = fn([{id:1},{id:2},{id:3}], 'id', 3);
  const r6 = fn([{name:'A'},{name:'B'},{name:'A'}], 'name', 'A');
  const r7 = fn([{active:true},{active:false}], 'active', false);
  const r8 = fn([{val:0},{val:1}], 'val', 0);
  const r9 = fn([{a:1,b:2},{a:3,b:4}], 'b', 4);
  return [
    { pass: JSON.stringify(r1) === JSON.stringify({item:{id:2,name:'B'},index:1}), description: 'Finds item at index 1', got: JSON.stringify(r1) },
    { pass: r2.item === null && r2.index === -1, description: 'Not found returns {item:null, index:-1}', got: JSON.stringify(r2) },
    { pass: r3.item === null && r3.index === -1, description: 'Empty array returns {item:null, index:-1}', got: JSON.stringify(r3) },
    { pass: r4.index === 0 && r4.item.id === 1, description: 'First element match returns index 0', got: JSON.stringify(r4) },
    { pass: r5.index === 2 && r5.item.id === 3, description: 'Last element match returns correct index', got: JSON.stringify(r5) },
    { pass: r6.index === 0, description: 'Duplicate values — returns first match index', got: JSON.stringify(r6) },
    { pass: r7.index === 1 && r7.item.active === false, description: 'Matches boolean false value', got: JSON.stringify(r7) },
    { pass: r8.index === 0 && r8.item.val === 0, description: 'Matches numeric 0 value', got: JSON.stringify(r8) },
    { pass: r9.index === 1 && r9.item.b === 4, description: 'Searches by non-first property', got: JSON.stringify(r9) }
  ];
}`,
    hints: [
      'Use `.find()` to get the matching object and `.findIndex()` to get its position. Combine both results into a single return object.',
      'Call find and findIndex with the same comparison: `obj[key] === value`. If find returns `undefined`, set item to `null`. findIndex already returns `-1` when not found.',
    ],
    resources: findRes,
  },

  // 20. find: Fallback
  {
    id: 1195,
    title: 'find: Fallback',
    type: 'js',
    tier: 3,
    category: ['js-fundamentals', 'callback-methods'],
    tags: ['find', 'callbacks', 'default', 'fallback'],
    description:
      'Use find with a fallback value when no element matches.',
    instructions:
      'Find the first number greater than the threshold. If none is found, return the provided default value instead of `undefined`.',
    starterCode:
      '/**\n * @param {number[]} nums - Array of numbers\n * @param {number} threshold - Value to exceed\n * @param {*} defaultVal - Value to return if no match\n * @returns {*} First number > threshold, or defaultVal\n */\nfunction findOrDefault(nums, threshold, defaultVal) {\n\n}\n',
    solution:
      'function findOrDefault(nums, threshold, defaultVal) {\n  var found = nums.find(function(n) { return n > threshold; });\n  return found !== undefined ? found : defaultVal;\n}',
    testRunner: `(code) => {
  const fn = new Function(code + '; return findOrDefault;')();
  const r1 = fn([1, 5, 10], 3, 0);
  const r2 = fn([1, 2, 3], 10, -1);
  const r3 = fn([], 5, 0);
  const r4 = fn([10, 20, 30], 5, 0);
  const r5 = fn([1], 0, -1);
  const r6 = fn([1], 5, 'none');
  const r7 = fn([1, 2, 3], 0, 0);
  const r8 = fn([-5, 0, 5], -10, null);
  const r9 = fn([3, 3, 3], 3, 0);
  return [
    { pass: r1 === 5, description: 'findOrDefault([1,5,10], 3, 0) returns 5', got: String(r1) },
    { pass: r2 === -1, description: 'No match returns default value -1', got: String(r2) },
    { pass: r3 === 0, description: 'Empty array returns default value', got: String(r3) },
    { pass: r4 === 10, description: 'Returns first match, not default', got: String(r4) },
    { pass: r5 === 1, description: 'Single element above threshold is returned', got: String(r5) },
    { pass: r6 === 'none', description: 'Default value can be a string', got: String(r6) },
    { pass: r7 === 1, description: 'Found value returned even when default is 0', got: String(r7) },
    { pass: r8 === -5, description: 'Negative number above threshold is returned', got: String(r8) },
    { pass: r9 === 0, description: 'None strictly above threshold — returns default', got: String(r9) }
  ];
}`,
    hints: [
      'Use `.find()` to search for the first match. Then check if the result is `undefined` — if so, return the default value instead.',
      'Store the result of `.find()` in a variable. Use `found !== undefined ? found : defaultVal` to return the match or the fallback.',
    ],
    resources: findRes,
  },

  // ══════════════════════════════════════════════════════════════════════════
  // SUB-SECTION 5: reduce (5 exercises, IDs 1196-1200)
  // ══════════════════════════════════════════════════════════════════════════

  // 21. reduce: Sum (ENTRY POINT)
  {
    id: 1196,
    title: 'reduce: Sum',
    type: 'js',
    tier: 3,
    category: ['js-fundamentals', 'callback-methods'],
    tags: ['reduce', 'callbacks', 'accumulation', 'sum'],
    description:
      'Use reduce to accumulate a single value from an array.',
    instructions:
      'The `.reduce()` method executes a callback on each element, passing the return value from one call as the first argument to the next. It "reduces" an array down to a single value. The second argument to `.reduce()` is the initial value of the accumulator.\n\nWrite a function that sums all numbers using `.reduce()` (see `@param`/`@returns` in the starter code).\n\nExample: `sumAll([1, 2, 3, 4])` returns `10`\nExample: `sumAll([])` returns `0`',
    starterCode:
      '/**\n * Use .reduce() to sum all numbers in the array.\n *\n * @param {number[]} nums - Array of numbers\n * @returns {number} Sum of all numbers\n */\nfunction sumAll(nums) {\n\n}\n',
    solution:
      'function sumAll(nums) {\n  return nums.reduce(function(acc, n) {\n    return acc + n;\n  }, 0);\n}',
    testRunner: `(code) => {
  const fn = new Function(code + '; return sumAll;')();
  const r1 = fn([1, 2, 3, 4]);
  const r2 = fn([]);
  const r3 = fn([5]);
  const r4 = fn([-1, -2, -3]);
  const r5 = fn([10, -5, 3, -2]);
  const r6 = fn([0, 0, 0]);
  const r7 = fn([1.5, 2.5, 3]);
  const r8 = fn([100]);
  const r9 = fn([1, -1, 2, -2, 3, -3]);
  return [
    { pass: r1 === 10, description: 'sumAll([1,2,3,4]) returns 10', got: String(r1) },
    { pass: r2 === 0, description: 'sumAll([]) returns 0', got: String(r2) },
    { pass: r3 === 5, description: 'sumAll([5]) returns 5', got: String(r3) },
    { pass: r4 === -6, description: 'sumAll([-1,-2,-3]) returns -6', got: String(r4) },
    { pass: r5 === 6, description: 'sumAll([10,-5,3,-2]) returns 6', got: String(r5) },
    { pass: r6 === 0, description: 'sumAll([0,0,0]) returns 0', got: String(r6) },
    { pass: r7 === 7, description: 'sumAll([1.5,2.5,3]) returns 7', got: String(r7) },
    { pass: r8 === 100, description: 'sumAll([100]) returns 100', got: String(r8) },
    { pass: r9 === 0, description: 'Positive and negative cancel out to 0', got: String(r9) }
  ];
}`,
    hints: [
      'The `.reduce()` callback receives two arguments: the accumulator (running total) and the current element. Start the accumulator at `0` by passing it as the second argument to `.reduce()`.',
      'Call `nums.reduce(function(acc, n) { return acc + n; }, 0)`. The `0` is the initial value. Each iteration adds the current number to the running total.',
    ],
    resources: reduceRes,
  },

  // 22. reduce: Count
  {
    id: 1197,
    title: 'reduce: Count',
    type: 'js',
    tier: 3,
    category: ['js-fundamentals', 'callback-methods'],
    tags: ['reduce', 'callbacks', 'counting', 'object'],
    description:
      'Use reduce to count occurrences of each value and return a tally object.',
    instructions:
      'Count how many times each value appears in the array and return an object where keys are the values and values are the counts. Use `.reduce()` with an empty object as the initial accumulator.',
    starterCode:
      '/**\n * @param {Array} arr - Array of values\n * @returns {Object} Object with value counts (e.g. {a:2, b:1})\n */\nfunction tally(arr) {\n\n}\n',
    solution:
      'function tally(arr) {\n  return arr.reduce(function(acc, val) {\n    acc[val] = (acc[val] || 0) + 1;\n    return acc;\n  }, {});\n}',
    testRunner: `(code) => {
  const fn = new Function(code + '; return tally;')();
  const r1 = fn(['a', 'b', 'a', 'c', 'b', 'a']);
  const r2 = fn([]);
  const r3 = fn(['x']);
  const r4 = fn(['a', 'a', 'a']);
  const r5 = fn([1, 2, 1, 3]);
  const r6 = fn(['yes', 'no', 'yes']);
  const r7 = fn(['a', 'b', 'c']);
  const r8 = fn(['red', 'blue', 'red', 'green', 'blue', 'red']);
  const r9 = fn([true, false, true, true]);
  return [
    { pass: r1.a === 3 && r1.b === 2 && r1.c === 1, description: 'tally(["a","b","a","c","b","a"]) → {a:3,b:2,c:1}', got: JSON.stringify(r1) },
    { pass: JSON.stringify(r2) === JSON.stringify({}), description: 'tally([]) returns {}', got: JSON.stringify(r2) },
    { pass: r3.x === 1 && Object.keys(r3).length === 1, description: 'Single element returns {x:1}', got: JSON.stringify(r3) },
    { pass: r4.a === 3 && Object.keys(r4).length === 1, description: 'All same value: {a:3}', got: JSON.stringify(r4) },
    { pass: r5['1'] === 2 && r5['2'] === 1 && r5['3'] === 1, description: 'Numbers become string keys', got: JSON.stringify(r5) },
    { pass: r6.yes === 2 && r6.no === 1, description: 'tally(["yes","no","yes"]) → {yes:2,no:1}', got: JSON.stringify(r6) },
    { pass: r7.a === 1 && r7.b === 1 && r7.c === 1, description: 'All unique values have count 1', got: JSON.stringify(r7) },
    { pass: r8.red === 3 && r8.blue === 2 && r8.green === 1, description: 'Tallies multiple values correctly', got: JSON.stringify(r8) },
    { pass: Object.keys(r9).length === 2, description: 'Boolean values produce two keys', got: JSON.stringify(r9) }
  ];
}`,
    hints: [
      'Start with an empty object `{}` as the initial accumulator. For each value, check if it already exists as a key — if so, increment it; otherwise set it to 1.',
      'In the callback, use `acc[val] = (acc[val] || 0) + 1` to handle both new and existing keys. Always `return acc` so the next iteration has the updated object.',
    ],
    resources: reduceRes,
  },

  // 23. reduce: Flatten
  {
    id: 1198,
    title: 'reduce: Flatten',
    type: 'js',
    tier: 3,
    category: ['js-fundamentals', 'callback-methods'],
    tags: ['reduce', 'callbacks', 'flatten', 'arrays'],
    description:
      'Use reduce to flatten an array of arrays into a single array.',
    instructions:
      'Combine an array of arrays into one flat array using `.reduce()`. Only flatten one level deep.',
    starterCode:
      '/**\n * @param {Array[]} arrays - Array of arrays\n * @returns {Array} Single flat array\n */\nfunction flatten(arrays) {\n\n}\n',
    solution:
      'function flatten(arrays) {\n  return arrays.reduce(function(acc, arr) {\n    return acc.concat(arr);\n  }, []);\n}',
    testRunner: `(code) => {
  const fn = new Function(code + '; return flatten;')();
  const r1 = fn([[1, 2], [3, 4], [5]]);
  const r2 = fn([]);
  const r3 = fn([[1]]);
  const r4 = fn([[], [], []]);
  const r5 = fn([[1, 2], [], [3]]);
  const r6 = fn([['a', 'b'], ['c']]);
  const r7 = fn([[1], [2], [3], [4]]);
  const r8 = fn([[1, 2, 3]]);
  const r9 = fn([[true], [false, true]]);
  return [
    { pass: JSON.stringify(r1) === JSON.stringify([1, 2, 3, 4, 5]), description: '[[1,2],[3,4],[5]] flattens to [1,2,3,4,5]', got: JSON.stringify(r1) },
    { pass: JSON.stringify(r2) === JSON.stringify([]), description: 'Empty outer array returns []', got: JSON.stringify(r2) },
    { pass: JSON.stringify(r3) === JSON.stringify([1]), description: 'Single inner array unwraps', got: JSON.stringify(r3) },
    { pass: JSON.stringify(r4) === JSON.stringify([]), description: 'All empty inner arrays → []', got: JSON.stringify(r4) },
    { pass: JSON.stringify(r5) === JSON.stringify([1, 2, 3]), description: 'Empty arrays in middle are skipped', got: JSON.stringify(r5) },
    { pass: JSON.stringify(r6) === JSON.stringify(['a', 'b', 'c']), description: 'Works with string arrays', got: JSON.stringify(r6) },
    { pass: JSON.stringify(r7) === JSON.stringify([1, 2, 3, 4]), description: 'Four single-element arrays flatten correctly', got: JSON.stringify(r7) },
    { pass: JSON.stringify(r8) === JSON.stringify([1, 2, 3]), description: 'Single array with multiple elements', got: JSON.stringify(r8) },
    { pass: JSON.stringify(r9) === JSON.stringify([true, false, true]), description: 'Works with boolean arrays', got: JSON.stringify(r9) }
  ];
}`,
    hints: [
      'Start with an empty array `[]` as the accumulator. For each inner array, combine it with the accumulator using `.concat()`.',
      'Call `arrays.reduce(function(acc, arr) { return acc.concat(arr); }, [])`. Each iteration appends the inner array to the growing flat result.',
    ],
    resources: reduceRes,
  },

  // 24. reduce: Group
  {
    id: 1199,
    title: 'reduce: Group',
    type: 'js',
    tier: 3,
    category: ['js-fundamentals', 'callback-methods'],
    tags: ['reduce', 'callbacks', 'groupBy', 'objects'],
    description:
      'Use reduce to group an array of objects by a shared property.',
    instructions:
      'Group objects by the value of a given key property. Return an object where each key is a group name and each value is an array of objects in that group.',
    starterCode:
      '/**\n * @param {Object[]} items - Array of objects\n * @param {string} key - Property to group by\n * @returns {Object} Object mapping group values to arrays of items\n */\nfunction groupBy(items, key) {\n\n}\n',
    solution:
      'function groupBy(items, key) {\n  return items.reduce(function(acc, item) {\n    var group = item[key];\n    if (!acc[group]) acc[group] = [];\n    acc[group].push(item);\n    return acc;\n  }, {});\n}',
    testRunner: `(code) => {
  const fn = new Function(code + '; return groupBy;')();
  const r1 = fn([{t:'a',v:1},{t:'b',v:2},{t:'a',v:3}], 't');
  const r2 = fn([], 't');
  const r3 = fn([{c:'red'}], 'c');
  const r4 = fn([{s:'s'},{s:'m'},{s:'s'}], 's');
  const r5 = fn([{g:1},{g:2},{g:3}], 'g');
  const r6 = fn([{x:'a'},{x:'a'},{x:'a'}], 'x');
  const r7 = fn([{type:'fruit',n:'apple'},{type:'veg',n:'carrot'},{type:'fruit',n:'banana'}], 'type');
  const r8 = fn([{k:true},{k:false},{k:true}], 'k');
  return [
    { pass: JSON.stringify(r1) === JSON.stringify({a:[{t:'a',v:1},{t:'a',v:3}],b:[{t:'b',v:2}]}), description: 'Groups by "t" property correctly', got: JSON.stringify(r1) },
    { pass: JSON.stringify(r2) === JSON.stringify({}), description: 'Empty array returns {}', got: JSON.stringify(r2) },
    { pass: JSON.stringify(r3) === JSON.stringify({red:[{c:'red'}]}), description: 'Single item creates one group', got: JSON.stringify(r3) },
    { pass: r4.s.length === 2 && r4.m.length === 1, description: 'Correct group sizes', got: JSON.stringify(r4) },
    { pass: Object.keys(r5).length === 3, description: 'Three unique values create three groups', got: JSON.stringify(r5) },
    { pass: r6.a.length === 3, description: 'All same group — array has all items', got: JSON.stringify(r6) },
    { pass: r7.fruit.length === 2 && r7.veg.length === 1, description: 'Groups fruits and vegetables correctly', got: JSON.stringify(r7) },
    { pass: Object.keys(r8).length === 2, description: 'Boolean values create two groups', got: JSON.stringify(r8) }
  ];
}`,
    hints: [
      'Start with an empty object. For each item, read the grouping key. If that group does not exist yet in the accumulator, create an empty array for it. Then push the item into the appropriate group.',
      'Use `var group = item[key]`. Check `if (!acc[group]) acc[group] = []`. Then `acc[group].push(item)` and `return acc`.',
    ],
    resources: reduceRes,
  },

  // 25. reduce: Object Build
  {
    id: 1200,
    title: 'reduce: Object Build',
    type: 'js',
    tier: 3,
    category: ['js-fundamentals', 'callback-methods'],
    tags: ['reduce', 'callbacks', 'pairs', 'object-build'],
    description:
      'Use reduce to convert an array of key-value pairs into an object.',
    instructions:
      'Convert an array of `[key, value]` pairs into a single object. If a key appears more than once, the last value wins.',
    starterCode:
      '/**\n * @param {Array[]} pairs - Array of [key, value] pairs\n * @returns {Object} Object built from the pairs\n */\nfunction fromPairs(pairs) {\n\n}\n',
    solution:
      'function fromPairs(pairs) {\n  return pairs.reduce(function(acc, pair) {\n    acc[pair[0]] = pair[1];\n    return acc;\n  }, {});\n}',
    testRunner: `(code) => {
  const fn = new Function(code + '; return fromPairs;')();
  const r1 = fn([['a', 1], ['b', 2], ['c', 3]]);
  const r2 = fn([]);
  const r3 = fn([['x', 10]]);
  const r4 = fn([['a', 1], ['a', 2]]);
  const r5 = fn([['name', 'Alice'], ['age', 25]]);
  const r6 = fn([['active', true], ['count', 0]]);
  const r7 = fn([['key', null]]);
  const r8 = fn([['a', 1], ['b', 2], ['c', 3], ['d', 4]]);
  const r9 = fn([['x', 'first'], ['y', 'second'], ['x', 'updated']]);
  return [
    { pass: JSON.stringify(r1) === JSON.stringify({a:1,b:2,c:3}), description: 'Builds {a:1,b:2,c:3} from pairs', got: JSON.stringify(r1) },
    { pass: JSON.stringify(r2) === JSON.stringify({}), description: 'Empty array returns {}', got: JSON.stringify(r2) },
    { pass: JSON.stringify(r3) === JSON.stringify({x:10}), description: 'Single pair returns {x:10}', got: JSON.stringify(r3) },
    { pass: r4.a === 2 && Object.keys(r4).length === 1, description: 'Duplicate key — last value wins', got: JSON.stringify(r4) },
    { pass: r5.name === 'Alice' && r5.age === 25, description: 'Mixed types for values', got: JSON.stringify(r5) },
    { pass: r6.active === true && r6.count === 0, description: 'Boolean and zero values preserved', got: JSON.stringify(r6) },
    { pass: r7.key === null, description: 'Null value preserved', got: JSON.stringify(r7) },
    { pass: Object.keys(r8).length === 4, description: 'Four pairs create four keys', got: JSON.stringify(r8) },
    { pass: r9.x === 'updated' && r9.y === 'second', description: 'Later pair overwrites earlier for same key', got: JSON.stringify(r9) }
  ];
}`,
    hints: [
      'Start with an empty object. For each pair, use the first element as the key and the second as the value. Assign `acc[pair[0]] = pair[1]`.',
      'Each pair is a two-element array. Access `pair[0]` for the key and `pair[1]` for the value. Return the accumulator after each assignment.',
    ],
    resources: reduceRes,
  },

  // ══════════════════════════════════════════════════════════════════════════
  // SUB-SECTION 6: every / some (4 exercises, IDs 1201-1204)
  // ══════════════════════════════════════════════════════════════════════════

  // 26. every: Basics (ENTRY POINT)
  {
    id: 1201,
    title: 'every: Basics',
    type: 'js',
    tier: 3,
    category: ['js-fundamentals', 'callback-methods'],
    tags: ['every', 'callbacks', 'validation', 'arrays'],
    description:
      'Use every to check if all elements in an array pass a test.',
    instructions:
      'The `.every()` method tests whether all elements in an array pass the callback\'s test. It returns `true` only if the callback returns `true` for every element. If any element fails, it returns `false` immediately. An empty array returns `true` (vacuous truth).\n\nWrite a function that checks if every number in an array is positive using `.every()` (see `@param`/`@returns` in the starter code).\n\nExample: `allPositive([1, 2, 3])` returns `true`\nExample: `allPositive([1, -2, 3])` returns `false`\nExample: `allPositive([])` returns `true`',
    starterCode:
      '/**\n * Use .every() to check if all numbers are positive (> 0).\n *\n * @param {number[]} nums - Array of numbers\n * @returns {boolean} True if every number > 0\n */\nfunction allPositive(nums) {\n\n}\n',
    solution:
      'function allPositive(nums) {\n  return nums.every(function(n) {\n    return n > 0;\n  });\n}',
    testRunner: `(code) => {
  const fn = new Function(code + '; return allPositive;')();
  const r1 = fn([1, 2, 3]);
  const r2 = fn([1, -2, 3]);
  const r3 = fn([]);
  const r4 = fn([0, 1, 2]);
  const r5 = fn([5]);
  const r6 = fn([-1]);
  const r7 = fn([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  const r8 = fn([1, 2, 3, 4, -5]);
  const r9 = fn([0.5, 1.5, 2.5]);
  return [
    { pass: r1 === true, description: 'allPositive([1,2,3]) returns true', got: String(r1) },
    { pass: r2 === false, description: 'allPositive([1,-2,3]) returns false', got: String(r2) },
    { pass: r3 === true, description: 'allPositive([]) returns true (vacuous truth)', got: String(r3) },
    { pass: r4 === false, description: 'Zero is not positive — returns false', got: String(r4) },
    { pass: r5 === true, description: 'Single positive number returns true', got: String(r5) },
    { pass: r6 === false, description: 'Single negative number returns false', got: String(r6) },
    { pass: r7 === true, description: 'Ten positive numbers all pass', got: String(r7) },
    { pass: r8 === false, description: 'Last element negative — returns false', got: String(r8) },
    { pass: r9 === true, description: 'Positive decimals all pass', got: String(r9) }
  ];
}`,
    hints: [
      'The `.every()` method returns `true` only when the callback returns `true` for all elements. Check whether each number is greater than zero.',
      'Call `nums.every(function(n) { return n > 0; })` and return the result. It stops early on the first `false`.',
    ],
    resources: everySomeRes,
  },

  // 27. some: Basics
  {
    id: 1202,
    title: 'some: Basics',
    type: 'js',
    tier: 3,
    category: ['js-fundamentals', 'callback-methods'],
    tags: ['some', 'callbacks', 'search', 'arrays'],
    description:
      'Use some to check if at least one element passes a test.',
    instructions:
      'Check if any number in the array is negative. Return `true` if at least one number is less than 0, otherwise `false`. Use `.some()`.',
    starterCode:
      '/**\n * @param {number[]} nums - Array of numbers\n * @returns {boolean} True if any number < 0\n */\nfunction hasNegative(nums) {\n\n}\n',
    solution:
      'function hasNegative(nums) {\n  return nums.some(function(n) {\n    return n < 0;\n  });\n}',
    testRunner: `(code) => {
  const fn = new Function(code + '; return hasNegative;')();
  const r1 = fn([1, -2, 3]);
  const r2 = fn([1, 2, 3]);
  const r3 = fn([]);
  const r4 = fn([0]);
  const r5 = fn([-1]);
  const r6 = fn([0, 0, 0]);
  const r7 = fn([5, 10, -1, 20]);
  const r8 = fn([-5, -10, -15]);
  const r9 = fn([0.5, -0.5]);
  return [
    { pass: r1 === true, description: 'hasNegative([1,-2,3]) returns true', got: String(r1) },
    { pass: r2 === false, description: 'hasNegative([1,2,3]) returns false', got: String(r2) },
    { pass: r3 === false, description: 'hasNegative([]) returns false', got: String(r3) },
    { pass: r4 === false, description: 'Zero is not negative — returns false', got: String(r4) },
    { pass: r5 === true, description: 'Single negative returns true', got: String(r5) },
    { pass: r6 === false, description: 'All zeros — no negatives', got: String(r6) },
    { pass: r7 === true, description: 'One negative among positives returns true', got: String(r7) },
    { pass: r8 === true, description: 'All negative returns true', got: String(r8) },
    { pass: r9 === true, description: 'Negative decimal is detected', got: String(r9) }
  ];
}`,
    hints: [
      'The `.some()` method returns `true` as soon as the callback returns `true` for any element. Check if each number is less than zero.',
      'Call `nums.some(function(n) { return n < 0; })`. It returns `true` on the first negative number found.',
    ],
    resources: everySomeRes,
  },

  // 28. every and some: Combined
  {
    id: 1203,
    title: 'every and some: Combined',
    type: 'js',
    tier: 3,
    category: ['js-fundamentals', 'callback-methods'],
    tags: ['every', 'some', 'callbacks', 'validation', 'combined'],
    description:
      'Use both every and some to validate an array against multiple criteria.',
    instructions:
      'Validate an array of scores. Return `true` only if every score is between 0 and 100 (inclusive) AND at least one score is 90 or above.',
    starterCode:
      '/**\n * @param {number[]} scores - Array of numeric scores\n * @returns {boolean} True if all scores in [0,100] and at least one >= 90\n */\nfunction validateScores(scores) {\n\n}\n',
    solution:
      'function validateScores(scores) {\n  var allValid = scores.every(function(s) { return s >= 0 && s <= 100; });\n  var hasHigh = scores.some(function(s) { return s >= 90; });\n  return allValid && hasHigh;\n}',
    testRunner: `(code) => {
  const fn = new Function(code + '; return validateScores;')();
  const r1 = fn([85, 90, 75]);
  const r2 = fn([85, 80, 75]);
  const r3 = fn([85, 90, 105]);
  const r4 = fn([]);
  const r5 = fn([100]);
  const r6 = fn([90]);
  const r7 = fn([89]);
  const r8 = fn([-5, 90, 80]);
  const r9 = fn([0, 50, 90, 100]);
  const r10 = fn([101]);
  return [
    { pass: r1 === true, description: '[85,90,75] — all valid, has 90 → true', got: String(r1) },
    { pass: r2 === false, description: '[85,80,75] — all valid, no score >= 90 → false', got: String(r2) },
    { pass: r3 === false, description: '[85,90,105] — 105 out of range → false', got: String(r3) },
    { pass: r4 === false, description: '[] — no scores, no high score → false', got: String(r4) },
    { pass: r5 === true, description: '[100] — valid and >= 90 → true', got: String(r5) },
    { pass: r6 === true, description: '[90] — valid and exactly 90 → true', got: String(r6) },
    { pass: r7 === false, description: '[89] — valid but below 90 → false', got: String(r7) },
    { pass: r8 === false, description: '[-5,90,80] — negative out of range → false', got: String(r8) },
    { pass: r9 === true, description: '[0,50,90,100] — all valid, has 90 and 100 → true', got: String(r9) },
    { pass: r10 === false, description: '[101] — out of range → false', got: String(r10) }
  ];
}`,
    hints: [
      'Use `.every()` to check that all scores are within 0-100. Use `.some()` to check that at least one score is 90 or above. Both conditions must be true.',
      'Combine the results with `&&`: `allValid && hasHigh`. Use `s >= 0 && s <= 100` for the every check and `s >= 90` for the some check.',
    ],
    resources: everySomeRes,
  },

  // 29. every and some: Validation
  {
    id: 1204,
    title: 'every and some: Validation',
    type: 'js',
    tier: 3,
    category: ['js-fundamentals', 'callback-methods'],
    tags: ['every', 'some', 'callbacks', 'validation', 'object-return'],
    description:
      'Use every and some to build a validation summary object.',
    instructions:
      'Analyze an array of numbers against a min-max range. Return an object with three boolean properties: `allInRange` (every number is between min and max inclusive), `hasMin` (at least one number equals min), and `hasMax` (at least one number equals max).',
    starterCode:
      '/**\n * @param {number[]} nums - Array of numbers\n * @param {number} min - Minimum boundary\n * @param {number} max - Maximum boundary\n * @returns {{ allInRange: boolean, hasMin: boolean, hasMax: boolean }}\n */\nfunction validateNumbers(nums, min, max) {\n\n}\n',
    solution:
      'function validateNumbers(nums, min, max) {\n  return {\n    allInRange: nums.every(function(n) { return n >= min && n <= max; }),\n    hasMin: nums.some(function(n) { return n === min; }),\n    hasMax: nums.some(function(n) { return n === max; })\n  };\n}',
    testRunner: `(code) => {
  const fn = new Function(code + '; return validateNumbers;')();
  const r1 = fn([1, 5, 10], 1, 10);
  const r2 = fn([3, 5, 7], 1, 10);
  const r3 = fn([0, 5, 11], 1, 10);
  const r4 = fn([], 1, 10);
  const r5 = fn([1], 1, 10);
  const r6 = fn([10], 1, 10);
  const r7 = fn([1, 10], 1, 10);
  const r8 = fn([5, 5, 5], 5, 5);
  const r9 = fn([-1, 0, 1], -1, 1);
  return [
    { pass: r1.allInRange === true && r1.hasMin === true && r1.hasMax === true, description: '[1,5,10] in [1,10] — all true', got: JSON.stringify(r1) },
    { pass: r2.allInRange === true && r2.hasMin === false && r2.hasMax === false, description: '[3,5,7] in [1,10] — in range but no boundary values', got: JSON.stringify(r2) },
    { pass: r3.allInRange === false && r3.hasMin === false && r3.hasMax === false, description: '[0,5,11] — out of range', got: JSON.stringify(r3) },
    { pass: r4.allInRange === true && r4.hasMin === false && r4.hasMax === false, description: '[] — vacuous allInRange, no values', got: JSON.stringify(r4) },
    { pass: r5.allInRange === true && r5.hasMin === true && r5.hasMax === false, description: '[1] — has min only', got: JSON.stringify(r5) },
    { pass: r6.allInRange === true && r6.hasMin === false && r6.hasMax === true, description: '[10] — has max only', got: JSON.stringify(r6) },
    { pass: r7.allInRange === true && r7.hasMin === true && r7.hasMax === true, description: '[1,10] — has both boundaries', got: JSON.stringify(r7) },
    { pass: r8.allInRange === true && r8.hasMin === true && r8.hasMax === true, description: '[5,5,5] with min=max=5 — all true', got: JSON.stringify(r8) },
    { pass: r9.allInRange === true && r9.hasMin === true && r9.hasMax === true, description: 'Negative range works correctly', got: JSON.stringify(r9) }
  ];
}`,
    hints: [
      'Build a return object with three properties. Use `.every()` for the range check and `.some()` for each boundary check.',
      'For allInRange: `nums.every(function(n) { return n >= min && n <= max; })`. For hasMin: `nums.some(function(n) { return n === min; })`. Same pattern for hasMax.',
    ],
    resources: everySomeRes,
  },

  // ══════════════════════════════════════════════════════════════════════════
  // SUB-SECTION 7: sort (4 exercises, IDs 1205-1208)
  // ══════════════════════════════════════════════════════════════════════════

  // 30. sort: Numbers (ENTRY POINT)
  {
    id: 1205,
    title: 'sort: Numbers',
    type: 'js',
    tier: 3,
    category: ['js-fundamentals', 'callback-methods'],
    tags: ['sort', 'callbacks', 'numbers', 'ordering'],
    description:
      'Use sort with a compare function to sort numbers in ascending order.',
    instructions:
      'The `.sort()` method sorts an array in place. Without a compare function, it converts elements to strings and sorts lexicographically (which gives wrong results for numbers). To sort numbers correctly, pass a compare function: `function(a, b) { return a - b; }` for ascending order.\n\nWrite a function that returns a new array of numbers sorted in ascending order. Do not mutate the original array — use `.slice()` first (see `@param`/`@returns` in the starter code).\n\nExample: `sortAscending([3, 1, 2])` returns `[1, 2, 3]`\nExample: `sortAscending([])` returns `[]`',
    starterCode:
      '/**\n * Sort numbers ascending without mutating the original array.\n *\n * @param {number[]} nums - Array of numbers\n * @returns {number[]} New sorted array (ascending)\n */\nfunction sortAscending(nums) {\n\n}\n',
    solution:
      'function sortAscending(nums) {\n  return nums.slice().sort(function(a, b) {\n    return a - b;\n  });\n}',
    testRunner: `(code) => {
  const fn = new Function(code + '; return sortAscending;')();
  const r1 = fn([3, 1, 4, 1, 5]);
  const r2 = fn([]);
  const r3 = fn([5, 4, 3, 2, 1]);
  const r4 = fn([1, 2, 3]);
  const r5 = fn([1]);
  const r6 = fn([-3, 0, 3, -1, 1]);
  const r7 = fn([10, 9, 8, 7, 6]);
  const r8 = fn([5, 5, 5]);
  const input = [3, 1, 2];
  const r9 = fn(input);
  return [
    { pass: JSON.stringify(r1) === JSON.stringify([1, 1, 3, 4, 5]), description: '[3,1,4,1,5] sorts to [1,1,3,4,5]', got: JSON.stringify(r1) },
    { pass: JSON.stringify(r2) === JSON.stringify([]), description: 'Empty array returns []', got: JSON.stringify(r2) },
    { pass: JSON.stringify(r3) === JSON.stringify([1, 2, 3, 4, 5]), description: 'Reverse order sorts correctly', got: JSON.stringify(r3) },
    { pass: JSON.stringify(r4) === JSON.stringify([1, 2, 3]), description: 'Already sorted stays the same', got: JSON.stringify(r4) },
    { pass: JSON.stringify(r5) === JSON.stringify([1]), description: 'Single element returns as-is', got: JSON.stringify(r5) },
    { pass: JSON.stringify(r6) === JSON.stringify([-3, -1, 0, 1, 3]), description: 'Negative numbers sort correctly', got: JSON.stringify(r6) },
    { pass: JSON.stringify(r7) === JSON.stringify([6, 7, 8, 9, 10]), description: '[10,9,8,7,6] sorts to [6,7,8,9,10]', got: JSON.stringify(r7) },
    { pass: JSON.stringify(r8) === JSON.stringify([5, 5, 5]), description: 'Duplicates remain in sorted result', got: JSON.stringify(r8) },
    { pass: JSON.stringify(input) === JSON.stringify([3, 1, 2]), description: 'Does not mutate the original array', got: JSON.stringify(input) }
  ];
}`,
    hints: [
      'Use `.slice()` to create a copy before sorting. The compare function `function(a, b) { return a - b; }` sorts numbers ascending — negative means a comes first, positive means b comes first.',
      'Chain the calls: `nums.slice().sort(function(a, b) { return a - b; })`. Slice creates the copy, sort reorders it, and you return the result.',
    ],
    resources: sortRes,
  },

  // 31. sort: Strings
  {
    id: 1206,
    title: 'sort: Strings',
    type: 'js',
    tier: 3,
    category: ['js-fundamentals', 'callback-methods'],
    tags: ['sort', 'callbacks', 'strings', 'case-insensitive'],
    description:
      'Use sort with a compare function for case-insensitive alphabetical ordering.',
    instructions:
      'Sort an array of strings alphabetically, ignoring case. Do not mutate the original array. Preserve the original casing in the output.',
    starterCode:
      '/**\n * @param {string[]} words - Array of strings\n * @returns {string[]} New array sorted alphabetically (case-insensitive)\n */\nfunction sortAlphabetical(words) {\n\n}\n',
    solution:
      'function sortAlphabetical(words) {\n  return words.slice().sort(function(a, b) {\n    var lowerA = a.toLowerCase();\n    var lowerB = b.toLowerCase();\n    if (lowerA < lowerB) return -1;\n    if (lowerA > lowerB) return 1;\n    return 0;\n  });\n}',
    testRunner: `(code) => {
  const fn = new Function(code + '; return sortAlphabetical;')();
  const r1 = fn(['banana', 'Apple', 'cherry']);
  const r2 = fn([]);
  const r3 = fn(['c', 'a', 'b']);
  const r4 = fn(['Zebra', 'apple', 'Mango']);
  const r5 = fn(['hello']);
  const r6 = fn(['Z', 'a', 'M', 'b']);
  const r7 = fn(['dog', 'Cat', 'bird', 'Ant']);
  const r8 = fn(['HELLO', 'world']);
  const input = ['b', 'a'];
  const r9 = fn(input);
  return [
    { pass: JSON.stringify(r1) === JSON.stringify(['Apple', 'banana', 'cherry']), description: '["banana","Apple","cherry"] sorts alphabetically', got: JSON.stringify(r1) },
    { pass: JSON.stringify(r2) === JSON.stringify([]), description: 'Empty array returns []', got: JSON.stringify(r2) },
    { pass: JSON.stringify(r3) === JSON.stringify(['a', 'b', 'c']), description: 'Lowercase letters sort correctly', got: JSON.stringify(r3) },
    { pass: JSON.stringify(r4) === JSON.stringify(['apple', 'Mango', 'Zebra']), description: 'Case-insensitive: apple before Mango before Zebra', got: JSON.stringify(r4) },
    { pass: JSON.stringify(r5) === JSON.stringify(['hello']), description: 'Single element returns as-is', got: JSON.stringify(r5) },
    { pass: JSON.stringify(r6) === JSON.stringify(['a', 'b', 'M', 'Z']), description: 'Mixed case letters sort correctly', got: JSON.stringify(r6) },
    { pass: JSON.stringify(r7) === JSON.stringify(['Ant', 'bird', 'Cat', 'dog']), description: '["dog","Cat","bird","Ant"] sorts to ["Ant","bird","Cat","dog"]', got: JSON.stringify(r7) },
    { pass: JSON.stringify(r8) === JSON.stringify(['HELLO', 'world']), description: 'Preserves original casing', got: JSON.stringify(r8) },
    { pass: JSON.stringify(input) === JSON.stringify(['b', 'a']), description: 'Does not mutate the original array', got: JSON.stringify(input) }
  ];
}`,
    hints: [
      'Convert both strings to lowercase inside the compare function before comparing. Use `<` and `>` operators to determine order. Return -1, 0, or 1.',
      'In the compare function, use `a.toLowerCase()` and `b.toLowerCase()`. Return `-1` if a comes first, `1` if b comes first, `0` if equal.',
    ],
    resources: sortRes,
  },

  // 32. sort: Objects
  {
    id: 1207,
    title: 'sort: Objects',
    type: 'js',
    tier: 3,
    category: ['js-fundamentals', 'callback-methods'],
    tags: ['sort', 'callbacks', 'objects', 'property-sort'],
    description:
      'Use sort with a compare function to order objects by a numeric property.',
    instructions:
      'Sort an array of person objects by their `age` property in ascending order. Do not mutate the original array.',
    starterCode:
      '/**\n * @param {Object[]} people - Array of {name, age} objects\n * @returns {Object[]} New array sorted by age ascending\n */\nfunction sortByAge(people) {\n\n}\n',
    solution:
      'function sortByAge(people) {\n  return people.slice().sort(function(a, b) {\n    return a.age - b.age;\n  });\n}',
    testRunner: `(code) => {
  const fn = new Function(code + '; return sortByAge;')();
  const r1 = fn([{name:'B',age:30},{name:'A',age:20}]);
  const r2 = fn([]);
  const r3 = fn([{name:'A',age:25}]);
  const r4 = fn([{name:'A',age:10},{name:'B',age:10}]);
  const r5 = fn([{name:'C',age:50},{name:'B',age:30},{name:'A',age:20}]);
  const r6 = fn([{name:'A',age:1},{name:'B',age:2},{name:'C',age:3}]);
  const r7 = fn([{name:'X',age:100},{name:'Y',age:5}]);
  const r8 = fn([{name:'A',age:0},{name:'B',age:-1}]);
  const input = [{name:'Z',age:2},{name:'Y',age:1}];
  const r9 = fn(input);
  return [
    { pass: JSON.stringify(r1) === JSON.stringify([{name:'A',age:20},{name:'B',age:30}]), description: 'Sorts two people by age ascending', got: JSON.stringify(r1) },
    { pass: JSON.stringify(r2) === JSON.stringify([]), description: 'Empty array returns []', got: JSON.stringify(r2) },
    { pass: JSON.stringify(r3) === JSON.stringify([{name:'A',age:25}]), description: 'Single person returns as-is', got: JSON.stringify(r3) },
    { pass: r4[0].age === 10 && r4[1].age === 10, description: 'Same age — both kept (stable)', got: JSON.stringify(r4) },
    { pass: r5[0].age === 20 && r5[1].age === 30 && r5[2].age === 50, description: 'Three people sorted youngest to oldest', got: JSON.stringify(r5) },
    { pass: JSON.stringify(r6) === JSON.stringify([{name:'A',age:1},{name:'B',age:2},{name:'C',age:3}]), description: 'Already sorted stays the same', got: JSON.stringify(r6) },
    { pass: r7[0].age === 5 && r7[1].age === 100, description: 'Large age gap sorts correctly', got: JSON.stringify(r7) },
    { pass: r8[0].age === -1 && r8[1].age === 0, description: 'Negative age sorts before zero', got: JSON.stringify(r8) },
    { pass: input[0].name === 'Z' && input[1].name === 'Y', description: 'Does not mutate the original array', got: JSON.stringify(input) }
  ];
}`,
    hints: [
      'Use the subtraction trick in the compare function: `a.age - b.age`. Negative means a comes first, positive means b comes first.',
      'Chain `.slice().sort(function(a, b) { return a.age - b.age; })` to create a sorted copy without modifying the original.',
    ],
    resources: sortRes,
  },

  // 33. sort: Multi-Key
  {
    id: 1208,
    title: 'sort: Multi-Key',
    type: 'js',
    tier: 3,
    category: ['js-fundamentals', 'callback-methods'],
    tags: ['sort', 'callbacks', 'multi-key', 'complex-sort'],
    description:
      'Use sort with a compare function that handles multiple sort criteria.',
    instructions:
      'Sort an array of student objects by `grade` descending (highest first), then by `name` ascending (alphabetical) as a tiebreaker. Do not mutate the original array.',
    starterCode:
      '/**\n * @param {Object[]} students - Array of {name, grade} objects\n * @returns {Object[]} Sorted by grade desc, then name asc\n */\nfunction sortMultiKey(students) {\n\n}\n',
    solution:
      'function sortMultiKey(students) {\n  return students.slice().sort(function(a, b) {\n    if (a.grade !== b.grade) return b.grade - a.grade;\n    if (a.name < b.name) return -1;\n    if (a.name > b.name) return 1;\n    return 0;\n  });\n}',
    testRunner: `(code) => {
  const fn = new Function(code + '; return sortMultiKey;')();
  const r1 = fn([{name:'Bob',grade:90},{name:'Alice',grade:95},{name:'Charlie',grade:90}]);
  const r2 = fn([]);
  const r3 = fn([{name:'A',grade:80}]);
  const r4 = fn([{name:'B',grade:90},{name:'A',grade:90}]);
  const r5 = fn([{name:'A',grade:70},{name:'B',grade:80},{name:'C',grade:90}]);
  const r6 = fn([{name:'D',grade:85},{name:'A',grade:85},{name:'C',grade:85},{name:'B',grade:85}]);
  const r7 = fn([{name:'A',grade:100},{name:'B',grade:100},{name:'C',grade:50}]);
  const r8 = fn([{name:'Z',grade:60},{name:'A',grade:90},{name:'M',grade:60}]);
  const input = [{name:'B',grade:1},{name:'A',grade:2}];
  const r9 = fn(input);
  return [
    { pass: r1[0].name === 'Alice' && r1[1].name === 'Bob' && r1[2].name === 'Charlie', description: 'Grade desc, then name asc: Alice(95), Bob(90), Charlie(90)', got: JSON.stringify(r1) },
    { pass: JSON.stringify(r2) === JSON.stringify([]), description: 'Empty array returns []', got: JSON.stringify(r2) },
    { pass: JSON.stringify(r3) === JSON.stringify([{name:'A',grade:80}]), description: 'Single student returns as-is', got: JSON.stringify(r3) },
    { pass: r4[0].name === 'A' && r4[1].name === 'B', description: 'Same grade — sorted by name: A before B', got: JSON.stringify(r4) },
    { pass: r5[0].grade === 90 && r5[1].grade === 80 && r5[2].grade === 70, description: 'Different grades sorted highest first', got: JSON.stringify(r5) },
    { pass: r6[0].name === 'A' && r6[1].name === 'B' && r6[2].name === 'C' && r6[3].name === 'D', description: 'All same grade — sorted alphabetically', got: JSON.stringify(r6) },
    { pass: r7[0].name === 'A' && r7[1].name === 'B' && r7[2].name === 'C', description: 'Two tied at 100, one at 50: A,B first, then C', got: JSON.stringify(r7) },
    { pass: r8[0].name === 'A' && r8[1].name === 'M' && r8[2].name === 'Z', description: 'A(90) first, then M(60) and Z(60) by name', got: JSON.stringify(r8) },
    { pass: input[0].name === 'B' && input[1].name === 'A', description: 'Does not mutate the original array', got: JSON.stringify(input) }
  ];
}`,
    hints: [
      'In the compare function, first check if grades differ — if so, sort by grade descending (`b.grade - a.grade`). Only when grades are equal, compare names alphabetically.',
      'Use `if (a.grade !== b.grade) return b.grade - a.grade` for the primary sort. For the tiebreaker, use string comparison: `if (a.name < b.name) return -1; if (a.name > b.name) return 1; return 0`.',
    ],
    resources: sortRes,
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
    `T3 Callback Array Methods — Core: ${exercises.length} exercises (IDs ${exercises[0].id}-${exercises[exercises.length - 1].id})`
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

  // Remove old callback exercises
  const removedCount = data.exercises.length;
  data.exercises = data.exercises.filter(
    (ex) => !OLD_IDS_TO_REMOVE.includes(ex.id)
  );
  const actualRemoved = removedCount - data.exercises.length;
  console.log(`\nRemoved ${actualRemoved} old exercises (IDs: ${OLD_IDS_TO_REMOVE.join(', ')})`);

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
    `\nAppended ${exercises.length} exercises (${before} → ${after}, net +${after - before})`
  );
  console.log('Written to:', CURRICULUM_PATH);
}

main();
