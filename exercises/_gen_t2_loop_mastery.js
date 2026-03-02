#!/usr/bin/env node
/**
 * Generator: T2 Loop Mastery (17 exercises, IDs 1103-1119)
 *
 * Part 1: Break & Continue (1103-1107)
 * Part 2: Loop Styles (1108-1112)
 * Part 3: Loop Conversions (1113-1119)
 *
 * Usage:
 *   node exercises/_gen_t2_loop_mastery.js          # Append to default-curriculum.json
 *   node exercises/_gen_t2_loop_mastery.js --validate  # Validate testRunners only
 */

const fs = require('fs');
const path = require('path');

const CURRICULUM_PATH = path.join(
  __dirname,
  'collections',
  'default-curriculum.json'
);

// ─── Helper: W3Schools + MDN resources for loops ─────────────────────────────

const loopResources = [
  {
    label: 'W3Schools: JavaScript For Loop',
    url: 'https://www.w3schools.com/js/js_loop_for.asp',
    description: 'For loop basics',
  },
  {
    label: 'MDN: Loops and iteration',
    url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Loops_and_iteration',
    description: 'Loop patterns including break and continue',
  },
];

const breakContinueResources = [
  {
    label: 'W3Schools: JavaScript Break and Continue',
    url: 'https://www.w3schools.com/js/js_break.asp',
    description: 'Break and continue statements',
  },
  {
    label: 'MDN: break / continue',
    url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/break',
    description: 'Break and continue reference',
  },
];

const forOfResources = [
  {
    label: 'W3Schools: JavaScript For Of',
    url: 'https://www.w3schools.com/js/js_loop_forof.asp',
    description: 'For...of loop',
  },
  {
    label: 'MDN: for...of',
    url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of',
    description: 'For...of statement reference',
  },
];

const whileResources = [
  {
    label: 'W3Schools: JavaScript While Loop',
    url: 'https://www.w3schools.com/js/js_loop_while.asp',
    description: 'While and do...while loops',
  },
  {
    label: 'MDN: while',
    url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/while',
    description: 'While statement reference',
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
  // PART 1: Break & Continue (1103-1107)
  // ═══════════════════════════════════════════════════════════════════════════

  // ── 1. Loop Control: break (scaffolded entry point) ────────────────────────
  {
    id: 1103,
    title: 'Loop Control: break',
    type: 'js',
    tier: 2,
    category: ['js-fundamentals', 'loops'],
    tags: ['loops', 'break', 'search'],
    description:
      'Find the index of the first occurrence of a value using a loop with break.',
    instructions:
      'The `break` statement immediately exits the current loop. This is useful when you\'ve found what you\'re looking for and don\'t need to keep iterating.\n\nWrite a function called `findFirst` that takes an array `arr` and a `target` value. Loop through the array and return the index of the first element that matches the target. If the target is not found, return `-1`.\n\nExample: `findFirst([10, 20, 30, 20], 20)` returns `1`.\n\nExample: `findFirst([1, 2, 3], 99)` returns `-1`.',
    starterCode:
      '// The `break` statement exits a loop immediately.\n// Use it to stop searching once you find what you need.\n//\n// Syntax:\n//   for (...) {\n//     if (condition) {\n//       break; // exits the loop right here\n//     }\n//   }\n\n// Return the index of the first occurrence of target, or -1\nfunction findFirst(arr, target) {\n  // Create a variable to store the result index (-1 by default)\n  // Loop through the array\n  //   If the current element matches target:\n  //     Save the index and break out of the loop\n  // Return the result\n}\n',
    solution:
      'function findFirst(arr, target) {\n  let index = -1;\n  for (let i = 0; i < arr.length; i++) {\n    if (arr[i] === target) {\n      index = i;\n      break;\n    }\n  }\n  return index;\n}',
    testRunner: `(code) => {
  const fn = new Function(code + '; return findFirst;')();
  return [
    { pass: fn([10,20,30,20], 20) === 1, description: 'findFirst([10,20,30,20], 20) returns 1 (first occurrence)', got: String(fn([10,20,30,20], 20)) },
    { pass: fn([1,2,3], 99) === -1, description: 'findFirst([1,2,3], 99) returns -1 (not found)', got: String(fn([1,2,3], 99)) },
    { pass: fn([5,5,5], 5) === 0, description: 'findFirst([5,5,5], 5) returns 0 (first of many)', got: String(fn([5,5,5], 5)) },
    { pass: fn(['a','b','c'], 'c') === 2, description: 'findFirst(["a","b","c"], "c") returns 2', got: String(fn(['a','b','c'], 'c')) },
    { pass: fn([], 1) === -1, description: 'findFirst([], 1) returns -1 (empty array)', got: String(fn([], 1)) },
    { pass: fn([null, undefined, 0, false], 0) === 2, description: 'findFirst([null, undefined, 0, false], 0) returns 2 (strict equality)', got: String(fn([null, undefined, 0, false], 0)) }
  ];
}`,
    hints: [
      'Start with `let index = -1` before the loop. Inside the loop, when you find a match, set `index = i` and then `break` to stop looping. Return `index` after the loop.',
      'The `break` prevents unnecessary iterations. Without it, the loop would continue checking every remaining element even after finding the answer.',
    ],
    resources: breakContinueResources,
  },

  // ── 2. Loop Control: continue ──────────────────────────────────────────────
  {
    id: 1104,
    title: 'Loop Control: continue',
    type: 'js',
    tier: 2,
    category: ['js-fundamentals', 'loops'],
    tags: ['loops', 'continue', 'filtering'],
    description:
      'Filter out negative numbers from an array using a loop with continue.',
    instructions:
      'The `continue` statement skips the rest of the current iteration and jumps to the next one. This is useful when you want to ignore certain elements without stopping the entire loop.\n\nWrite a function called `skipNegatives` that takes an array of numbers and returns a new array containing only the non-negative values (0 and above). Use `continue` to skip negative numbers.\n\nExample: `skipNegatives([3, -1, 5, -2, 0, 8])` returns `[3, 5, 0, 8]`.',
    starterCode:
      '// The `continue` statement skips to the next iteration.\n// Use it to skip elements you don\'t want to process.\n//\n// Syntax:\n//   for (...) {\n//     if (shouldSkip) {\n//       continue; // jump to next iteration\n//     }\n//     // this code only runs if continue was NOT hit\n//   }\n\n// Return a new array with only non-negative numbers\nfunction skipNegatives(arr) {\n\n}\n',
    solution:
      'function skipNegatives(arr) {\n  const result = [];\n  for (let i = 0; i < arr.length; i++) {\n    if (arr[i] < 0) {\n      continue;\n    }\n    result.push(arr[i]);\n  }\n  return result;\n}',
    testRunner: `(code) => {
  const fn = new Function(code + '; return skipNegatives;')();
  return [
    { pass: JSON.stringify(fn([3,-1,5,-2,0,8])) === '[3,5,0,8]', description: 'skipNegatives([3,-1,5,-2,0,8]) returns [3,5,0,8]', got: JSON.stringify(fn([3,-1,5,-2,0,8])) },
    { pass: JSON.stringify(fn([-1,-2,-3])) === '[]', description: 'skipNegatives([-1,-2,-3]) returns [] (all negative)', got: JSON.stringify(fn([-1,-2,-3])) },
    { pass: JSON.stringify(fn([1,2,3])) === '[1,2,3]', description: 'skipNegatives([1,2,3]) returns [1,2,3] (all non-negative)', got: JSON.stringify(fn([1,2,3])) },
    { pass: JSON.stringify(fn([])) === '[]', description: 'skipNegatives([]) returns [] (empty array)', got: JSON.stringify(fn([])) },
    { pass: JSON.stringify(fn([0])) === '[0]', description: 'skipNegatives([0]) returns [0] (zero is non-negative)', got: JSON.stringify(fn([0])) },
    { pass: JSON.stringify(fn([-5,10,-3,20,-1,30])) === '[10,20,30]', description: 'skipNegatives alternating negatives and positives', got: JSON.stringify(fn([-5,10,-3,20,-1,30])) }
  ];
}`,
    hints: [
      'Inside the loop, check if the current element is negative. If it is, use `continue` to skip to the next iteration. Otherwise, push the element to the result array.',
      'The `continue` statement is like saying "never mind this one, move on." Code after `continue` in the loop body does not execute for that iteration.',
    ],
    resources: breakContinueResources,
  },

  // ── 3. Loop Control: break in Nested Loops ────────────────────────────────
  {
    id: 1105,
    title: 'Loop Control: break in Nested Loops',
    type: 'js',
    tier: 2,
    category: ['js-fundamentals', 'loops'],
    tags: ['loops', 'break', 'nested-loops', '2d-arrays'],
    description:
      'Check if any row in a 2D array contains a target value using break and a flag variable.',
    instructions:
      'When you use `break` inside nested loops, it only exits the innermost loop. To communicate a result from the inner loop to the outer loop, use a flag variable.\n\nWrite a function called `hasValue` that takes a `grid` (array of arrays) and a `target` value. Return `true` if any cell in the grid contains the target, `false` otherwise. Use a flag variable and `break` to stop searching a row once the target is found.\n\nExample: `hasValue([[1, 2], [3, 4]], 3)` returns `true`.\n\nExample: `hasValue([[1, 2], [3, 4]], 5)` returns `false`.',
    starterCode:
      '// break only exits the INNERMOST loop.\n// To stop the outer loop too, use a flag variable.\n// Set the flag when you find the target, then check\n// the flag in the outer loop to break out of it too.\n\n// Return true if target exists anywhere in the grid\nfunction hasValue(grid, target) {\n\n}\n',
    solution:
      'function hasValue(grid, target) {\n  let found = false;\n  for (let i = 0; i < grid.length; i++) {\n    for (let j = 0; j < grid[i].length; j++) {\n      if (grid[i][j] === target) {\n        found = true;\n        break;\n      }\n    }\n    if (found) {\n      break;\n    }\n  }\n  return found;\n}',
    testRunner: `(code) => {
  const fn = new Function(code + '; return hasValue;')();
  return [
    { pass: fn([[1,2],[3,4]], 3) === true, description: 'hasValue([[1,2],[3,4]], 3) returns true', got: String(fn([[1,2],[3,4]], 3)) },
    { pass: fn([[1,2],[3,4]], 5) === false, description: 'hasValue([[1,2],[3,4]], 5) returns false', got: String(fn([[1,2],[3,4]], 5)) },
    { pass: fn([[1,2,3],[4,5,6],[7,8,9]], 9) === true, description: 'hasValue finds 9 in last cell', got: String(fn([[1,2,3],[4,5,6],[7,8,9]], 9)) },
    { pass: fn([[1,2,3],[4,5,6],[7,8,9]], 1) === true, description: 'hasValue finds 1 in first cell', got: String(fn([[1,2,3],[4,5,6],[7,8,9]], 1)) },
    { pass: fn([['a','b'],['c','d']], 'c') === true, description: 'hasValue works with string values', got: String(fn([['a','b'],['c','d']], 'c')) },
    { pass: fn([], 1) === false, description: 'hasValue returns false for empty grid', got: String(fn([], 1)) },
    { pass: fn([[],[],[1]], 1) === true, description: 'hasValue handles empty rows before match', got: String(fn([[],[],[1]], 1)) }
  ];
}`,
    hints: [
      'Create a `let found = false` flag before the loops. When you find the target in the inner loop, set `found = true` and `break`. After the inner loop, check `if (found) break` to exit the outer loop too.',
      'The flag variable bridges the inner and outer loops. `break` alone only exits one level — the flag lets the outer loop know it should stop too.',
    ],
    resources: breakContinueResources,
  },

  // ── 4. Loop Control: Early Return ──────────────────────────────────────────
  {
    id: 1106,
    title: 'Loop Control: Early Return',
    type: 'js',
    tier: 2,
    category: ['js-fundamentals', 'loops'],
    tags: ['loops', 'return', 'early-exit'],
    description:
      'Check if every element in an array is positive using early return.',
    instructions:
      'A `return` statement inside a loop exits the entire function — not just the loop. This is often cleaner than using `break` with a flag variable, especially for true/false checks.\n\nWrite a function called `allPositive` that takes an array of numbers and returns `true` if every element is greater than 0, or `false` if any element is 0 or negative. Use an early `return false` when you find a non-positive number.\n\nExample: `allPositive([3, 7, 1])` returns `true`.\n\nExample: `allPositive([3, -1, 5])` returns `false`.',
    starterCode:
      '// return inside a loop exits the ENTIRE function.\n// This is cleaner than break + flag for true/false checks.\n\n// Return true if every element is greater than 0\nfunction allPositive(arr) {\n\n}\n',
    solution:
      'function allPositive(arr) {\n  for (let i = 0; i < arr.length; i++) {\n    if (arr[i] <= 0) {\n      return false;\n    }\n  }\n  return true;\n}',
    testRunner: `(code) => {
  const fn = new Function(code + '; return allPositive;')();
  return [
    { pass: fn([3,7,1]) === true, description: 'allPositive([3,7,1]) returns true', got: String(fn([3,7,1])) },
    { pass: fn([3,-1,5]) === false, description: 'allPositive([3,-1,5]) returns false (has negative)', got: String(fn([3,-1,5])) },
    { pass: fn([1,2,0,4]) === false, description: 'allPositive([1,2,0,4]) returns false (zero is not positive)', got: String(fn([1,2,0,4])) },
    { pass: fn([]) === true, description: 'allPositive([]) returns true (vacuously true for empty array)', got: String(fn([])) },
    { pass: fn([1]) === true, description: 'allPositive([1]) returns true (single positive)', got: String(fn([1])) },
    { pass: fn([-1]) === false, description: 'allPositive([-1]) returns false (single negative)', got: String(fn([-1])) },
    { pass: fn([100,200,300,400,500]) === true, description: 'allPositive with all large positives returns true', got: String(fn([100,200,300,400,500])) }
  ];
}`,
    hints: [
      'Loop through the array. The moment you find any element that is not greater than 0, immediately `return false`. If the loop finishes without finding one, `return true`.',
      'The early return pattern: `if (arr[i] <= 0) return false;` inside the loop, then `return true;` after the loop. No flag variable needed — `return` exits the whole function.',
    ],
    resources: breakContinueResources,
  },

  // ── 5. Loop Control: break and continue ────────────────────────────────────
  {
    id: 1107,
    title: 'Loop Control: break and continue',
    type: 'js',
    tier: 2,
    category: ['js-fundamentals', 'loops'],
    tags: ['loops', 'break', 'continue', 'combined'],
    description:
      'Sum array elements, skipping zeros and stopping at the first negative number.',
    instructions:
      'Write a function called `sumUntilNegative` that takes an array of numbers and returns their sum, with two rules:\n- Skip any zeros (use `continue`)\n- Stop entirely when you hit a negative number (use `break`)\n\nElements after the first negative number are never processed.\n\nExample: `sumUntilNegative([1, 0, 2, 0, 3, -1, 4])` returns `6` (1 + 2 + 3; skips zeros, stops at -1).\n\nExample: `sumUntilNegative([5, 10, 15])` returns `30` (no negatives, sums all).',
    starterCode:
      '// Use continue to skip certain values\n// Use break to stop the loop entirely\n// Both can be used in the same loop\n\n// Sum elements, skip zeros, stop at first negative\nfunction sumUntilNegative(arr) {\n\n}\n',
    solution:
      'function sumUntilNegative(arr) {\n  let sum = 0;\n  for (let i = 0; i < arr.length; i++) {\n    if (arr[i] < 0) {\n      break;\n    }\n    if (arr[i] === 0) {\n      continue;\n    }\n    sum += arr[i];\n  }\n  return sum;\n}',
    testRunner: `(code) => {
  const fn = new Function(code + '; return sumUntilNegative;')();
  return [
    { pass: fn([1,0,2,0,3,-1,4]) === 6, description: 'sumUntilNegative([1,0,2,0,3,-1,4]) returns 6 (skip zeros, stop at -1)', got: String(fn([1,0,2,0,3,-1,4])) },
    { pass: fn([5,10,15]) === 30, description: 'sumUntilNegative([5,10,15]) returns 30 (no negatives)', got: String(fn([5,10,15])) },
    { pass: fn([-1,5,10]) === 0, description: 'sumUntilNegative([-1,5,10]) returns 0 (stops immediately)', got: String(fn([-1,5,10])) },
    { pass: fn([0,0,0,5]) === 5, description: 'sumUntilNegative([0,0,0,5]) returns 5 (skips all zeros)', got: String(fn([0,0,0,5])) },
    { pass: fn([]) === 0, description: 'sumUntilNegative([]) returns 0 (empty array)', got: String(fn([])) },
    { pass: fn([10,20,0,-5,100]) === 30, description: 'sumUntilNegative([10,20,0,-5,100]) returns 30 (10+20, skip 0, stop at -5)', got: String(fn([10,20,0,-5,100])) }
  ];
}`,
    hints: [
      'Check for negative first (`break`), then check for zero (`continue`), then add to sum. The order matters — you want to stop before skipping.',
      'Pattern: `if (arr[i] < 0) break;` then `if (arr[i] === 0) continue;` then `sum += arr[i];`. The break check must come before continue to avoid skipping the stop signal.',
    ],
    resources: breakContinueResources,
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // PART 2: Loop Styles (1108-1112)
  // ═══════════════════════════════════════════════════════════════════════════

  // ── 6. for...of: Arrays (scaffolded entry) ─────────────────────────────────
  {
    id: 1108,
    title: 'for...of: Arrays',
    type: 'js',
    tier: 2,
    category: ['js-fundamentals', 'loops'],
    tags: ['loops', 'for-of', 'arrays'],
    description:
      'Count how many times a value appears in an array using a for...of loop.',
    instructions:
      'The `for...of` loop iterates directly over the values of an array — no index variable needed. It\'s cleaner than a standard `for` loop when you only need the values.\n\nWrite a function called `countOccurrences` that takes an array `arr` and a `target` value, and returns how many times the target appears in the array. Use a `for...of` loop.\n\nExample: `countOccurrences(["a", "b", "a", "c", "a"], "a")` returns `3`.\n\nExample: `countOccurrences([1, 2, 3], 5)` returns `0`.',
    starterCode:
      '// for...of iterates directly over VALUES — no index needed.\n//\n// Syntax:\n//   for (const value of array) {\n//     // value is each element, one at a time\n//   }\n//\n// Use this instead of for(let i=0; ...) when you\n// don\'t need the index.\n\n// Count how many times target appears in arr\nfunction countOccurrences(arr, target) {\n  // Create a counter variable\n  // Use for...of to iterate over the array values\n  //   If the value matches target, increment the counter\n  // Return the counter\n}\n',
    solution:
      'function countOccurrences(arr, target) {\n  let count = 0;\n  for (const value of arr) {\n    if (value === target) {\n      count++;\n    }\n  }\n  return count;\n}',
    testRunner: `(code) => {
  const fn = new Function(code + '; return countOccurrences;')();
  return [
    { pass: fn(['a','b','a','c','a'], 'a') === 3, description: 'countOccurrences(["a","b","a","c","a"], "a") returns 3', got: String(fn(['a','b','a','c','a'], 'a')) },
    { pass: fn([1,2,3], 5) === 0, description: 'countOccurrences([1,2,3], 5) returns 0 (not found)', got: String(fn([1,2,3], 5)) },
    { pass: fn([true,false,true,true], true) === 3, description: 'countOccurrences counts booleans correctly', got: String(fn([true,false,true,true], true)) },
    { pass: fn([], 1) === 0, description: 'countOccurrences returns 0 for empty array', got: String(fn([], 1)) },
    { pass: fn([7,7,7,7], 7) === 4, description: 'countOccurrences([7,7,7,7], 7) returns 4 (all match)', got: String(fn([7,7,7,7], 7)) },
    { pass: fn([1,2,3,4,5], 3) === 1, description: 'countOccurrences returns 1 for single occurrence', got: String(fn([1,2,3,4,5], 3)) }
  ];
}`,
    hints: [
      'With `for...of`, each iteration gives you the actual value, not an index. You write `for (const value of arr)` and `value` is each element in turn.',
      'Create `let count = 0`. Then `for (const value of arr) { if (value === target) count++; }`. Return `count`.',
    ],
    resources: forOfResources,
  },

  // ── 7. for...of: Strings ───────────────────────────────────────────────────
  {
    id: 1109,
    title: 'for...of: Strings',
    type: 'js',
    tier: 2,
    category: ['js-fundamentals', 'loops'],
    tags: ['loops', 'for-of', 'strings'],
    description:
      'Count the vowels in a string by iterating its characters with for...of.',
    instructions:
      'The `for...of` loop also works on strings — it iterates over each character directly. This is cleaner than using `str[i]` with an index.\n\nWrite a function called `vowelCount` that takes a string and returns the number of vowels (a, e, i, o, u — case-insensitive). Use `for...of` to iterate through the characters.\n\nExample: `vowelCount("hello world")` returns `3`.\n\nExample: `vowelCount("rhythm")` returns `0`.',
    starterCode:
      '// for...of works on strings too — it gives you each character.\n// Much cleaner than str[i] with an index loop.\n\n// Count the vowels (a, e, i, o, u) in the string\nfunction vowelCount(str) {\n\n}\n',
    solution:
      "function vowelCount(str) {\n  let count = 0;\n  const vowels = 'aeiou';\n  for (const char of str) {\n    if (vowels.includes(char.toLowerCase())) {\n      count++;\n    }\n  }\n  return count;\n}",
    testRunner: `(code) => {
  const fn = new Function(code + '; return vowelCount;')();
  return [
    { pass: fn('hello world') === 3, description: 'vowelCount("hello world") returns 3', got: String(fn('hello world')) },
    { pass: fn('rhythm') === 0, description: 'vowelCount("rhythm") returns 0 (no vowels)', got: String(fn('rhythm')) },
    { pass: fn('AEIOU') === 5, description: 'vowelCount("AEIOU") returns 5 (case-insensitive)', got: String(fn('AEIOU')) },
    { pass: fn('') === 0, description: 'vowelCount("") returns 0 (empty string)', got: String(fn('')) },
    { pass: fn('aaa') === 3, description: 'vowelCount("aaa") returns 3', got: String(fn('aaa')) },
    { pass: fn('JavaScript') === 3, description: 'vowelCount("JavaScript") returns 3 (a, a, i)', got: String(fn('JavaScript')) }
  ];
}`,
    hints: [
      '`for...of` on a string gives you each character. Check if each character (lowercased) is a vowel — you can use `"aeiou".includes(char.toLowerCase())`.',
      'Create a count variable. Loop with `for (const char of str)`. If `"aeiou".includes(char.toLowerCase())`, increment the count.',
    ],
    resources: forOfResources,
  },

  // ── 8. while Loop (scaffolded entry) ───────────────────────────────────────
  {
    id: 1110,
    title: 'while Loop',
    type: 'js',
    tier: 2,
    category: ['js-fundamentals', 'loops'],
    tags: ['loops', 'while', 'math'],
    description:
      'Count the steps in the Collatz sequence using a while loop.',
    instructions:
      'A `while` loop repeats as long as its condition is true. Use it when you don\'t know how many iterations you need upfront.\n\nThe Collatz sequence starts with any positive integer `n`. At each step: if `n` is even, divide by 2. If `n` is odd, multiply by 3 and add 1. The sequence always eventually reaches 1.\n\nWrite a function called `collatzSteps` that takes a positive integer `n` and returns the number of steps to reach 1. Use a `while` loop since you cannot predict how many steps it will take.\n\nExample: `collatzSteps(6)` returns `8` (6→3→10→5→16→8→4→2→1 = 8 steps).\n\nExample: `collatzSteps(1)` returns `0` (already at 1).',
    starterCode:
      '// A while loop repeats as long as its condition is true.\n// Use it when you don\'t know how many iterations you\'ll need.\n//\n// Syntax:\n//   while (condition) {\n//     // runs until condition becomes false\n//   }\n\n// Count steps to reach 1 in the Collatz sequence\nfunction collatzSteps(n) {\n  // Create a step counter\n  // While n is not 1:\n  //   If n is even: divide by 2\n  //   If n is odd: multiply by 3 and add 1\n  //   Increment the step counter\n  // Return the counter\n}\n',
    solution:
      'function collatzSteps(n) {\n  let steps = 0;\n  while (n !== 1) {\n    if (n % 2 === 0) {\n      n = n / 2;\n    } else {\n      n = n * 3 + 1;\n    }\n    steps++;\n  }\n  return steps;\n}',
    testRunner: `(code) => {
  const fn = new Function(code + '; return collatzSteps;')();
  return [
    { pass: fn(1) === 0, description: 'collatzSteps(1) returns 0 (already at 1)', got: String(fn(1)) },
    { pass: fn(2) === 1, description: 'collatzSteps(2) returns 1 (2→1)', got: String(fn(2)) },
    { pass: fn(6) === 8, description: 'collatzSteps(6) returns 8 (6→3→10→5→16→8→4→2→1)', got: String(fn(6)) },
    { pass: fn(10) === 6, description: 'collatzSteps(10) returns 6', got: String(fn(10)) },
    { pass: fn(3) === 7, description: 'collatzSteps(3) returns 7 (3→10→5→16→8→4→2→1)', got: String(fn(3)) },
    { pass: fn(27) === 111, description: 'collatzSteps(27) returns 111 (long sequence)', got: String(fn(27)) }
  ];
}`,
    hints: [
      'Use `while (n !== 1)` as the loop condition. Inside, check if `n` is even with `n % 2 === 0`. Even: divide by 2. Odd: multiply by 3 and add 1. Count each step.',
      'Set `let steps = 0`. In the while loop: `if (n % 2 === 0) { n = n / 2; } else { n = n * 3 + 1; }` then `steps++`. After the loop, return `steps`.',
    ],
    resources: whileResources,
  },

  // ── 9. do...while Loop (scaffolded entry) ──────────────────────────────────
  {
    id: 1111,
    title: 'do...while Loop',
    type: 'js',
    tier: 2,
    category: ['js-fundamentals', 'loops'],
    tags: ['loops', 'do-while', 'math'],
    description:
      'Sum the digits of a number using a do...while loop.',
    instructions:
      'A `do...while` loop executes the body first, then checks the condition. This guarantees at least one iteration — useful when you always need to process something before checking whether to continue.\n\nWrite a function called `digitSum` that takes a non-negative integer `n` and returns the sum of its digits. Use a `do...while` loop to ensure `n = 0` is handled correctly (it should return `0`, not skip the loop entirely).\n\nExample: `digitSum(1234)` returns `10` (1+2+3+4).\n\nExample: `digitSum(0)` returns `0`.',
    starterCode:
      '// do...while executes the body FIRST, then checks the condition.\n// This guarantees at least one iteration.\n//\n// Syntax:\n//   do {\n//     // runs at least once\n//   } while (condition);\n//\n// Use this when you need to process before checking.\n\n// Sum the digits of a non-negative integer\nfunction digitSum(n) {\n  // Create a sum variable\n  // do:\n  //   Add the last digit (n % 10) to sum\n  //   Remove the last digit (Math.floor(n / 10))\n  // while n is greater than 0\n  // Return sum\n}\n',
    solution:
      'function digitSum(n) {\n  let sum = 0;\n  do {\n    sum += n % 10;\n    n = Math.floor(n / 10);\n  } while (n > 0);\n  return sum;\n}',
    testRunner: `(code) => {
  const fn = new Function(code + '; return digitSum;')();
  return [
    { pass: fn(1234) === 10, description: 'digitSum(1234) returns 10 (1+2+3+4)', got: String(fn(1234)) },
    { pass: fn(0) === 0, description: 'digitSum(0) returns 0 (do...while handles zero)', got: String(fn(0)) },
    { pass: fn(9) === 9, description: 'digitSum(9) returns 9 (single digit)', got: String(fn(9)) },
    { pass: fn(100) === 1, description: 'digitSum(100) returns 1 (1+0+0)', got: String(fn(100)) },
    { pass: fn(999) === 27, description: 'digitSum(999) returns 27 (9+9+9)', got: String(fn(999)) },
    { pass: fn(55555) === 25, description: 'digitSum(55555) returns 25 (5+5+5+5+5)', got: String(fn(55555)) }
  ];
}`,
    hints: [
      'Use `n % 10` to get the last digit and `Math.floor(n / 10)` to remove it. The `do...while` loop processes at least once, so `n = 0` correctly returns `0` (0 % 10 = 0).',
      'Structure: `let sum = 0; do { sum += n % 10; n = Math.floor(n / 10); } while (n > 0);` — the do block always runs once, even when n starts at 0.',
    ],
    resources: whileResources,
  },

  // ── 10. for...in: Object Keys (scaffolded entry) ──────────────────────────
  {
    id: 1112,
    title: 'for...in: Object Keys',
    type: 'js',
    tier: 2,
    category: ['js-fundamentals', 'loops'],
    tags: ['loops', 'for-in', 'objects'],
    description:
      'Convert an object into an array of key-value pairs using a for...in loop.',
    instructions:
      'The `for...in` loop iterates over the keys (property names) of an object. Use `obj[key]` to access the corresponding value.\n\nWrite a function called `objectToEntries` that takes an object and returns an array of `[key, value]` pairs.\n\nExample: `objectToEntries({ name: "Ada", age: 36 })` returns `[["name", "Ada"], ["age", 36]]`.\n\nExample: `objectToEntries({})` returns `[]`.',
    starterCode:
      '// for...in iterates over the KEYS of an object.\n//\n// Syntax:\n//   for (const key in obj) {\n//     // key is each property name (string)\n//     // obj[key] is the value\n//   }\n//\n// Use this to loop through object properties.\n\n// Return an array of [key, value] pairs\nfunction objectToEntries(obj) {\n  // Create an empty result array\n  // Use for...in to iterate over the object keys\n  //   Push [key, obj[key]] to the result\n  // Return the result\n}\n',
    solution:
      'function objectToEntries(obj) {\n  const entries = [];\n  for (const key in obj) {\n    entries.push([key, obj[key]]);\n  }\n  return entries;\n}',
    testRunner: `(code) => {
  const fn = new Function(code + '; return objectToEntries;')();
  return [
    { pass: JSON.stringify(fn({ name: 'Ada', age: 36 })) === '[["name","Ada"],["age",36]]', description: 'objectToEntries({ name: "Ada", age: 36 }) returns [["name","Ada"],["age",36]]', got: JSON.stringify(fn({ name: 'Ada', age: 36 })) },
    { pass: JSON.stringify(fn({})) === '[]', description: 'objectToEntries({}) returns [] (empty object)', got: JSON.stringify(fn({})) },
    { pass: JSON.stringify(fn({ x: 1 })) === '[["x",1]]', description: 'objectToEntries({ x: 1 }) returns [["x",1]]', got: JSON.stringify(fn({ x: 1 })) },
    { pass: JSON.stringify(fn({ a: true, b: false, c: null })) === '[["a",true],["b",false],["c",null]]', description: 'objectToEntries handles mixed value types', got: JSON.stringify(fn({ a: true, b: false, c: null })) },
    { pass: fn({ name: 'Ada', age: 36 }).length === 2, description: 'objectToEntries returns correct number of entries', got: String(fn({ name: 'Ada', age: 36 }).length) },
    { pass: JSON.stringify(fn({ greeting: 'hello', count: 5, active: true })) === '[["greeting","hello"],["count",5],["active",true]]', description: 'objectToEntries with 3 mixed-type properties', got: JSON.stringify(fn({ greeting: 'hello', count: 5, active: true })) }
  ];
}`,
    hints: [
      'In a `for...in` loop, the variable holds the key (property name) as a string. Use `obj[key]` to get the value. Push `[key, obj[key]]` as a two-element array.',
      'Create `const entries = []`. Then `for (const key in obj) { entries.push([key, obj[key]]); }`. Return `entries`.',
    ],
    resources: forInResources,
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // PART 3: Loop Conversions (1113-1119)
  // ═══════════════════════════════════════════════════════════════════════════

  // ── 11. Convert: for → while ───────────────────────────────────────────────
  {
    id: 1113,
    title: 'Convert: for to while',
    type: 'js',
    tier: 2,
    category: ['js-fundamentals', 'loops'],
    tags: ['loops', 'while', 'conversion'],
    description:
      'Rewrite a for loop as a while loop to sum a range of numbers.',
    instructions:
      'Every `for` loop can be rewritten as a `while` loop. The three parts of a for loop map directly:\n- **Initialization** → before the while loop\n- **Condition** → inside `while(...)`\n- **Update** → at the end of the loop body\n\nThe function `sumRange(start, end)` sums all integers from `start` to `end` inclusive. Here is the `for` loop version:\n\n```\nfunction sumRange(start, end) {\n  let sum = 0;\n  for (let i = start; i <= end; i++) {\n    sum += i;\n  }\n  return sum;\n}\n```\n\nRewrite this function using a `while` loop instead. Your solution must use `while` — not `for`.\n\nExample: `sumRange(1, 5)` returns `15` (1+2+3+4+5).',
    starterCode:
      '// Rewrite the for loop version using a while loop.\n// The three parts of for (init; condition; update) become:\n//   init → before the while\n//   condition → while(condition)\n//   update → end of loop body\n\n// Must use a while loop — not for\nfunction sumRange(start, end) {\n\n}\n',
    solution:
      'function sumRange(start, end) {\n  let sum = 0;\n  let i = start;\n  while (i <= end) {\n    sum += i;\n    i++;\n  }\n  return sum;\n}',
    testRunner: `(code) => {
  const fn = new Function(code + '; return sumRange;')();
  const usesWhile = /\\bwhile\\s*\\(/.test(code);
  const usesFor = /\\bfor\\s*\\(/.test(code);
  return [
    { pass: usesWhile, description: 'Solution must use a while loop', got: usesWhile ? 'while loop found' : 'no while loop found' },
    { pass: !usesFor, description: 'Solution must NOT use a for loop', got: usesFor ? 'for loop found (not allowed)' : 'no for loop (correct)' },
    { pass: fn(1, 5) === 15, description: 'sumRange(1, 5) returns 15 (1+2+3+4+5)', got: String(fn(1, 5)) },
    { pass: fn(3, 3) === 3, description: 'sumRange(3, 3) returns 3 (single number)', got: String(fn(3, 3)) },
    { pass: fn(1, 10) === 55, description: 'sumRange(1, 10) returns 55', got: String(fn(1, 10)) },
    { pass: fn(0, 0) === 0, description: 'sumRange(0, 0) returns 0', got: String(fn(0, 0)) },
    { pass: fn(-2, 2) === 0, description: 'sumRange(-2, 2) returns 0 (-2+-1+0+1+2)', got: String(fn(-2, 2)) }
  ];
}`,
    hints: [
      'Move the `let i = start` before the while. The condition `i <= end` goes inside `while(...)`. The `i++` goes at the end of the loop body.',
      'Structure: `let i = start; while (i <= end) { sum += i; i++; }` — the three parts of the for loop are just rearranged.',
    ],
    resources: whileResources,
  },

  // ── 12. Convert: while → for ───────────────────────────────────────────────
  {
    id: 1114,
    title: 'Convert: while to for',
    type: 'js',
    tier: 2,
    category: ['js-fundamentals', 'loops'],
    tags: ['loops', 'for', 'conversion'],
    description:
      'Rewrite a while loop as a for loop to calculate factorial.',
    instructions:
      'When a `while` loop has a clear counter with initialization, condition, and update, it can be compacted into a `for` loop.\n\nThe function `factorial(n)` calculates n! (n factorial). Here is the `while` loop version:\n\n```\nfunction factorial(n) {\n  let result = 1;\n  let i = 2;\n  while (i <= n) {\n    result *= i;\n    i++;\n  }\n  return result;\n}\n```\n\nRewrite this function using a `for` loop instead. Your solution must use `for` — not `while`.\n\nExample: `factorial(5)` returns `120` (1×2×3×4×5).',
    starterCode:
      '// Rewrite the while loop version using a for loop.\n// The init, condition, and update go into the for header:\n//   for (init; condition; update)\n\n// Must use a for loop — not while\nfunction factorial(n) {\n\n}\n',
    solution:
      'function factorial(n) {\n  let result = 1;\n  for (let i = 2; i <= n; i++) {\n    result *= i;\n  }\n  return result;\n}',
    testRunner: `(code) => {
  const fn = new Function(code + '; return factorial;')();
  const usesFor = /\\bfor\\s*\\(/.test(code);
  const usesWhile = /\\bwhile\\s*\\(/.test(code);
  return [
    { pass: usesFor, description: 'Solution must use a for loop', got: usesFor ? 'for loop found' : 'no for loop found' },
    { pass: !usesWhile, description: 'Solution must NOT use a while loop', got: usesWhile ? 'while loop found (not allowed)' : 'no while loop (correct)' },
    { pass: fn(5) === 120, description: 'factorial(5) returns 120', got: String(fn(5)) },
    { pass: fn(1) === 1, description: 'factorial(1) returns 1', got: String(fn(1)) },
    { pass: fn(0) === 1, description: 'factorial(0) returns 1 (0! = 1)', got: String(fn(0)) },
    { pass: fn(3) === 6, description: 'factorial(3) returns 6 (1×2×3)', got: String(fn(3)) },
    { pass: fn(10) === 3628800, description: 'factorial(10) returns 3628800', got: String(fn(10)) }
  ];
}`,
    hints: [
      'The while loop\'s `let i = 2` (init), `i <= n` (condition), and `i++` (update) compact into: `for (let i = 2; i <= n; i++)`.',
      'Structure: `let result = 1; for (let i = 2; i <= n; i++) { result *= i; }` — the loop body stays the same, just the counter management moves into the for header.',
    ],
    resources: loopResources,
  },

  // ── 13. Convert: for → for...of ───────────────────────────────────────────
  {
    id: 1115,
    title: 'Convert: for to for...of',
    type: 'js',
    tier: 2,
    category: ['js-fundamentals', 'loops'],
    tags: ['loops', 'for-of', 'conversion'],
    description:
      'Rewrite an index-based for loop as a for...of loop to find the longest word.',
    instructions:
      'When a `for` loop only uses the index to access array elements (like `arr[i]`), a `for...of` loop is cleaner — it gives you values directly.\n\nThe function `longestWord(words)` returns the longest string from an array. Here is the index-based `for` loop version:\n\n```\nfunction longestWord(words) {\n  let longest = "";\n  for (let i = 0; i < words.length; i++) {\n    if (words[i].length > longest.length) {\n      longest = words[i];\n    }\n  }\n  return longest;\n}\n```\n\nRewrite this function using a `for...of` loop instead. Your solution must use `for...of` — not an index-based `for` loop.\n\nExample: `longestWord(["hi", "hello", "hey"])` returns `"hello"`.',
    starterCode:
      '// Rewrite using for...of — no index needed here.\n// for (const word of words) gives you each word directly.\n\n// Must use for...of — not an index-based for loop\nfunction longestWord(words) {\n\n}\n',
    solution:
      'function longestWord(words) {\n  let longest = "";\n  for (const word of words) {\n    if (word.length > longest.length) {\n      longest = word;\n    }\n  }\n  return longest;\n}',
    testRunner: `(code) => {
  const fn = new Function(code + '; return longestWord;')();
  const usesForOf = /\\bfor\\s*\\([^)]*\\bof\\b/.test(code);
  return [
    { pass: usesForOf, description: 'Solution must use a for...of loop', got: usesForOf ? 'for...of found' : 'no for...of found' },
    { pass: fn(['hi','hello','hey']) === 'hello', description: 'longestWord(["hi","hello","hey"]) returns "hello"', got: String(fn(['hi','hello','hey'])) },
    { pass: fn(['a']) === 'a', description: 'longestWord(["a"]) returns "a" (single word)', got: String(fn(['a'])) },
    { pass: fn(['cat','dog','bird']) === 'bird', description: 'longestWord(["cat","dog","bird"]) returns "bird"', got: String(fn(['cat','dog','bird'])) },
    { pass: fn(['same','size','test']) === 'same', description: 'longestWord returns first when tied', got: String(fn(['same','size','test'])) },
    { pass: fn(['','short','']) === 'short', description: 'longestWord handles empty strings in array', got: String(fn(['','short',''])) }
  ];
}`,
    hints: [
      'Replace `for (let i = 0; i < words.length; i++)` with `for (const word of words)`. Then replace `words[i]` with `word` in the body.',
      'The for...of version: `for (const word of words) { if (word.length > longest.length) { longest = word; } }` — cleaner because you never use the index.',
    ],
    resources: forOfResources,
  },

  // ── 14. Convert: for → for...in ───────────────────────────────────────────
  {
    id: 1116,
    title: 'Convert: for to for...in',
    type: 'js',
    tier: 2,
    category: ['js-fundamentals', 'loops'],
    tags: ['loops', 'for-in', 'objects', 'conversion'],
    description:
      'Rewrite an Object.keys() for loop as a for...in loop to extract object values.',
    instructions:
      'When iterating over object properties, `for...in` is cleaner than getting keys with `Object.keys()` and looping with an index.\n\nThe function `getValues(obj)` returns an array of all values from an object. Here is the `Object.keys()` + `for` loop version:\n\n```\nfunction getValues(obj) {\n  const values = [];\n  const keys = Object.keys(obj);\n  for (let i = 0; i < keys.length; i++) {\n    values.push(obj[keys[i]]);\n  }\n  return values;\n}\n```\n\nRewrite this function using a `for...in` loop instead. Your solution must use `for...in` — not `Object.keys()` with a for loop.\n\nExample: `getValues({ a: 1, b: 2, c: 3 })` returns `[1, 2, 3]`.',
    starterCode:
      '// Rewrite using for...in — it gives you keys directly.\n// for (const key in obj) replaces Object.keys() + index loop.\n\n// Must use for...in — not Object.keys() with a for loop\nfunction getValues(obj) {\n\n}\n',
    solution:
      'function getValues(obj) {\n  const values = [];\n  for (const key in obj) {\n    values.push(obj[key]);\n  }\n  return values;\n}',
    testRunner: `(code) => {
  const fn = new Function(code + '; return getValues;')();
  const usesForIn = /\\bfor\\s*\\([^)]*\\bin\\b/.test(code);
  return [
    { pass: usesForIn, description: 'Solution must use a for...in loop', got: usesForIn ? 'for...in found' : 'no for...in found' },
    { pass: JSON.stringify(fn({ a: 1, b: 2, c: 3 })) === '[1,2,3]', description: 'getValues({ a:1, b:2, c:3 }) returns [1,2,3]', got: JSON.stringify(fn({ a: 1, b: 2, c: 3 })) },
    { pass: JSON.stringify(fn({})) === '[]', description: 'getValues({}) returns [] (empty object)', got: JSON.stringify(fn({})) },
    { pass: JSON.stringify(fn({ x: 'hello' })) === '["hello"]', description: 'getValues({ x: "hello" }) returns ["hello"]', got: JSON.stringify(fn({ x: 'hello' })) },
    { pass: JSON.stringify(fn({ a: true, b: null, c: 42 })) === '[true,null,42]', description: 'getValues handles mixed types', got: JSON.stringify(fn({ a: true, b: null, c: 42 })) },
    { pass: fn({ name: 'Ada', lang: 'JS' }).length === 2, description: 'getValues returns correct number of values', got: String(fn({ name: 'Ada', lang: 'JS' }).length) }
  ];
}`,
    hints: [
      '`for...in` gives you each key directly — no need for `Object.keys()` or an index. Replace the entire keys + index pattern with `for (const key in obj)`.',
      'Structure: `const values = []; for (const key in obj) { values.push(obj[key]); }` — much simpler than the Object.keys() + index approach.',
    ],
    resources: forInResources,
  },

  // ── 15. Convert: while → do...while ────────────────────────────────────────
  {
    id: 1117,
    title: 'Convert: while to do...while',
    type: 'js',
    tier: 2,
    category: ['js-fundamentals', 'loops'],
    tags: ['loops', 'do-while', 'conversion', 'math'],
    description:
      'Rewrite a while loop as a do...while loop to reverse a number\'s digits.',
    instructions:
      'When a `while` loop should always execute at least once, `do...while` is the better choice. It moves the condition check to the end.\n\nThe function `reverseNumber(n)` reverses the digits of a non-negative integer. Here is the `while` loop version — notice it fails for `n = 0` because the condition is false from the start:\n\n```\nfunction reverseNumber(n) {\n  let reversed = 0;\n  while (n > 0) {\n    reversed = reversed * 10 + n % 10;\n    n = Math.floor(n / 10);\n  }\n  return reversed;\n}\n// reverseNumber(0) returns 0... but only by accident (reversed starts at 0)\n```\n\nRewrite this function using a `do...while` loop to properly handle `n = 0`. Your solution must use `do...while` — not `while`.\n\nExample: `reverseNumber(123)` returns `321`.\n\nExample: `reverseNumber(100)` returns `1`.',
    starterCode:
      '// Rewrite using do...while to guarantee at least one iteration.\n// The body runs first, then the condition is checked.\n\n// Must use do...while — not while\nfunction reverseNumber(n) {\n\n}\n',
    solution:
      'function reverseNumber(n) {\n  let reversed = 0;\n  do {\n    reversed = reversed * 10 + n % 10;\n    n = Math.floor(n / 10);\n  } while (n > 0);\n  return reversed;\n}',
    testRunner: `(code) => {
  const fn = new Function(code + '; return reverseNumber;')();
  const usesDoWhile = /\\bdo\\s*\\{/.test(code);
  const usesPlainWhile = /[^o]\\s*while\\s*\\(/.test(code) || /^while\\s*\\(/.test(code.trim());
  return [
    { pass: usesDoWhile, description: 'Solution must use a do...while loop', got: usesDoWhile ? 'do...while found' : 'no do...while found' },
    { pass: fn(123) === 321, description: 'reverseNumber(123) returns 321', got: String(fn(123)) },
    { pass: fn(100) === 1, description: 'reverseNumber(100) returns 1 (trailing zeros removed)', got: String(fn(100)) },
    { pass: fn(0) === 0, description: 'reverseNumber(0) returns 0 (do...while handles this)', got: String(fn(0)) },
    { pass: fn(5) === 5, description: 'reverseNumber(5) returns 5 (single digit)', got: String(fn(5)) },
    { pass: fn(1200) === 21, description: 'reverseNumber(1200) returns 21', got: String(fn(1200)) },
    { pass: fn(9876) === 6789, description: 'reverseNumber(9876) returns 6789', got: String(fn(9876)) }
  ];
}`,
    hints: [
      'Move the condition check from before the body to after. The `do { ... } while (n > 0)` structure runs the body first, so even `n = 0` gets one iteration.',
      'Structure: `do { reversed = reversed * 10 + n % 10; n = Math.floor(n / 10); } while (n > 0);` — the logic is identical, only the check timing changes.',
    ],
    resources: whileResources,
  },

  // ── 16. Convert: for...of → for ───────────────────────────────────────────
  {
    id: 1118,
    title: 'Convert: for...of to for',
    type: 'js',
    tier: 2,
    category: ['js-fundamentals', 'loops'],
    tags: ['loops', 'for', 'for-of', 'conversion'],
    description:
      'Rewrite a for...of approach using a standard for loop when you need the index.',
    instructions:
      'Sometimes `for...of` isn\'t enough — when you need the index alongside the value, a standard `for` loop is the right choice.\n\nWrite a function called `pairWithIndex` that takes an array and returns an array of `[index, value]` pairs. You need the index for each element, so use a standard `for` loop — not `for...of`.\n\nExample: `pairWithIndex(["a", "b", "c"])` returns `[[0, "a"], [1, "b"], [2, "c"]]`.\n\nExample: `pairWithIndex([10])` returns `[[0, 10]]`.',
    starterCode:
      '// When you need the INDEX alongside the value,\n// a standard for loop is the right choice.\n// for...of gives values but not indices.\n\n// Must use a standard for loop — not for...of\nfunction pairWithIndex(arr) {\n\n}\n',
    solution:
      'function pairWithIndex(arr) {\n  const pairs = [];\n  for (let i = 0; i < arr.length; i++) {\n    pairs.push([i, arr[i]]);\n  }\n  return pairs;\n}',
    testRunner: `(code) => {
  const fn = new Function(code + '; return pairWithIndex;')();
  const usesForOf = /\\bfor\\s*\\([^)]*\\bof\\b/.test(code);
  return [
    { pass: !usesForOf, description: 'Solution must NOT use for...of (need the index)', got: usesForOf ? 'for...of found (not allowed)' : 'no for...of (correct)' },
    { pass: JSON.stringify(fn(['a','b','c'])) === '[[0,"a"],[1,"b"],[2,"c"]]', description: 'pairWithIndex(["a","b","c"]) returns [[0,"a"],[1,"b"],[2,"c"]]', got: JSON.stringify(fn(['a','b','c'])) },
    { pass: JSON.stringify(fn([10])) === '[[0,10]]', description: 'pairWithIndex([10]) returns [[0,10]]', got: JSON.stringify(fn([10])) },
    { pass: JSON.stringify(fn([])) === '[]', description: 'pairWithIndex([]) returns [] (empty array)', got: JSON.stringify(fn([])) },
    { pass: JSON.stringify(fn([true, null, 5])) === '[[0,true],[1,null],[2,5]]', description: 'pairWithIndex handles mixed types', got: JSON.stringify(fn([true, null, 5])) },
    { pass: fn(['x','y','z']).length === 3, description: 'pairWithIndex returns correct number of pairs', got: String(fn(['x','y','z']).length) }
  ];
}`,
    hints: [
      'A standard `for` loop gives you the index `i` directly. Use `arr[i]` to get the value. Push `[i, arr[i]]` as a pair.',
      'Structure: `for (let i = 0; i < arr.length; i++) { pairs.push([i, arr[i]]); }` — the index is the reason to choose `for` over `for...of`.',
    ],
    resources: loopResources,
  },

  // ── 17. Loop Mastery: Combined ─────────────────────────────────────────────
  {
    id: 1119,
    title: 'Loop Mastery: Combined',
    type: 'js',
    tier: 2,
    category: ['js-fundamentals', 'loops'],
    tags: ['loops', 'for-of', 'break', 'continue', 'combined'],
    description:
      'Collect valid names from an array, skipping blanks and stopping at a sentinel value.',
    instructions:
      'Write a function called `collectValidNames` that takes an array of strings and returns an array of valid, trimmed names. Apply these rules:\n- Skip empty strings or strings that are only whitespace (use `continue`)\n- Stop collecting when you encounter `"STOP"` (use `break`)\n- Trim each valid name before adding it\n- Use a `for...of` loop to iterate\n\nExample: `collectValidNames(["Alice", "", "  Bob  ", "  ", "STOP", "Charlie"])` returns `["Alice", "Bob"]`.\n\nExample: `collectValidNames(["  Jo  ", "STOP"])` returns `["Jo"]`.',
    starterCode:
      '// Combine for...of, continue, break, and .trim()\n// to collect valid names from the array\n\n// Return trimmed valid names, skip blanks, stop at "STOP"\nfunction collectValidNames(entries) {\n\n}\n',
    solution:
      "function collectValidNames(entries) {\n  const names = [];\n  for (const entry of entries) {\n    if (entry.trim() === 'STOP') {\n      break;\n    }\n    if (entry.trim() === '') {\n      continue;\n    }\n    names.push(entry.trim());\n  }\n  return names;\n}",
    testRunner: `(code) => {
  const fn = new Function(code + '; return collectValidNames;')();
  return [
    { pass: JSON.stringify(fn(['Alice','','  Bob  ','  ','STOP','Charlie'])) === '["Alice","Bob"]', description: 'collectValidNames skips blanks and stops at STOP', got: JSON.stringify(fn(['Alice','','  Bob  ','  ','STOP','Charlie'])) },
    { pass: JSON.stringify(fn(['  Jo  ','STOP'])) === '["Jo"]', description: 'collectValidNames trims names', got: JSON.stringify(fn(['  Jo  ','STOP'])) },
    { pass: JSON.stringify(fn(['a','b','c'])) === '["a","b","c"]', description: 'collectValidNames with no STOP collects all', got: JSON.stringify(fn(['a','b','c'])) },
    { pass: JSON.stringify(fn(['STOP','a','b'])) === '[]', description: 'collectValidNames with STOP first returns []', got: JSON.stringify(fn(['STOP','a','b'])) },
    { pass: JSON.stringify(fn(['','','','hello',''])) === '["hello"]', description: 'collectValidNames skips many blanks', got: JSON.stringify(fn(['','','','hello',''])) },
    { pass: JSON.stringify(fn([])) === '[]', description: 'collectValidNames([]) returns []', got: JSON.stringify(fn([])) },
    { pass: JSON.stringify(fn(['  STOP  '])) === '[]', description: 'collectValidNames recognizes trimmed STOP', got: JSON.stringify(fn(['  STOP  '])) }
  ];
}`,
    hints: [
      'Use `for (const entry of entries)`. First check if trimmed entry is `"STOP"` — if so, `break`. Then check if trimmed entry is empty — if so, `continue`. Otherwise, push the trimmed entry.',
      'Order matters: check for STOP before checking for empty, so `"STOP"` triggers a break, not a continue. Use `entry.trim()` for all three checks.',
    ],
    resources: [
      ...forOfResources,
    ],
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

  console.log(`\nT2 Loop Mastery — ${exercises.length} exercises\n`);
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
