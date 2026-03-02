#!/usr/bin/env node
/**
 * Generator: T2 Application Exercises (13 exercises, IDs 1163-1175)
 *
 * Final T2 sub-section — cross-domain application exercises combining
 * strings, arrays, objects, loops, and conditionals.
 *
 * Usage:
 *   node exercises/_gen_t2_application.js            # Append to curriculum
 *   node exercises/_gen_t2_application.js --validate  # Validate testRunners only
 */

const fs = require('fs');
const path = require('path');

const CURRICULUM_PATH = path.join(
  __dirname,
  'collections',
  'default-curriculum.json'
);

// ─── Resources ─────────────────────────────────────────────────────────────────

const appResources = [
  {
    label: 'W3Schools: JavaScript String Methods',
    url: 'https://www.w3schools.com/js/js_string_methods.asp',
    description: 'String method reference',
  },
  {
    label: 'MDN: Array',
    url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array',
    description: 'Array reference',
  },
];

// ─── Exercise Definitions ────────────────────────────────────────────────────

const exercises = [
  // ── Part 1: String Transformations ────────────────────────────────────────

  // 1. Application: Title Case
  {
    id: 1163,
    title: 'Application: Title Case',
    type: 'js',
    tier: 2,
    category: ['js-fundamentals', 'applications'],
    tags: ['strings', 'loops', 'split', 'toUpperCase', 'slice'],
    description:
      'Convert a string to title case by capitalizing the first letter of each word.',
    instructions:
      'Write a function that converts a string to title case — the first letter of each word is capitalized and the rest are lowercase. Words are separated by single spaces.\n\nParameters:\n- `str`: a string of words separated by spaces\n\nReturn: the string in title case\n\nExample: `titleCase("hello world")` returns `"Hello World"`\n\nExample: `titleCase("javaScript is FUN")` returns `"Javascript Is Fun"`',
    starterCode: 'function titleCase(str) {\n\n}\n',
    solution:
      "function titleCase(str) {\n  if (str === '') return '';\n  const words = str.split(' ');\n  const result = [];\n  for (let i = 0; i < words.length; i++) {\n    const word = words[i];\n    result.push(word[0].toUpperCase() + word.slice(1).toLowerCase());\n  }\n  return result.join(' ');\n}",
    testRunner: `(code) => {
  const fn = new Function(code + '; return titleCase;')();
  const r1 = fn('hello world');
  const r2 = fn('the quick brown fox');
  const r3 = fn('javaScript is FUN');
  const r4 = fn('a');
  const r5 = fn('hello');
  const r6 = fn('');
  return [
    { pass: r1 === 'Hello World', description: 'titleCase("hello world") returns "Hello World"', got: String(r1) },
    { pass: r2 === 'The Quick Brown Fox', description: 'titleCase("the quick brown fox") returns "The Quick Brown Fox"', got: String(r2) },
    { pass: r3 === 'Javascript Is Fun', description: 'titleCase("javaScript is FUN") returns "Javascript Is Fun"', got: String(r3) },
    { pass: r4 === 'A', description: 'titleCase("a") returns "A" (single character)', got: String(r4) },
    { pass: r5 === 'Hello', description: 'titleCase("hello") returns "Hello" (single word)', got: String(r5) },
    { pass: r6 === '', description: 'titleCase("") returns "" (empty string)', got: JSON.stringify(r6) }
  ];
}`,
    hints: [
      'Split the string into an array of words. Then loop through each word, capitalize its first character with `toUpperCase()`, and get the rest with `slice(1).toLowerCase()`. Collect the results and join them back with spaces.',
      'Use `str.split(\' \')` to get words. For each word, `word[0].toUpperCase() + word.slice(1).toLowerCase()` gives the title-cased version. Push each into a result array and return `result.join(\' \')`.',
    ],
    resources: appResources,
  },

  // 2. Application: Camel Case
  {
    id: 1164,
    title: 'Application: Camel Case',
    type: 'js',
    tier: 2,
    category: ['js-fundamentals', 'applications'],
    tags: ['strings', 'loops', 'split', 'toUpperCase', 'toLowerCase'],
    description:
      'Convert a space-separated string to camelCase notation.',
    instructions:
      'Write a function that converts a space-separated string to camelCase. The first word is entirely lowercase, and each subsequent word has its first letter capitalized with the rest lowercase. No spaces in the result.\n\nParameters:\n- `str`: a string of words separated by spaces\n\nReturn: the string in camelCase\n\nExample: `camelCase("hello world")` returns `"helloWorld"`\n\nExample: `camelCase("background color")` returns `"backgroundColor"`',
    starterCode: 'function camelCase(str) {\n\n}\n',
    solution:
      "function camelCase(str) {\n  if (str === '') return '';\n  const words = str.split(' ');\n  let result = words[0].toLowerCase();\n  for (let i = 1; i < words.length; i++) {\n    const word = words[i];\n    result += word[0].toUpperCase() + word.slice(1).toLowerCase();\n  }\n  return result;\n}",
    testRunner: `(code) => {
  const fn = new Function(code + '; return camelCase;')();
  const r1 = fn('hello world');
  const r2 = fn('the quick brown fox');
  const r3 = fn('background color');
  const r4 = fn('hello');
  const r5 = fn('LOUD WORDS');
  const r6 = fn('');
  return [
    { pass: r1 === 'helloWorld', description: 'camelCase("hello world") returns "helloWorld"', got: String(r1) },
    { pass: r2 === 'theQuickBrownFox', description: 'camelCase("the quick brown fox") returns "theQuickBrownFox"', got: String(r2) },
    { pass: r3 === 'backgroundColor', description: 'camelCase("background color") returns "backgroundColor"', got: String(r3) },
    { pass: r4 === 'hello', description: 'camelCase("hello") returns "hello" (single word stays lowercase)', got: String(r4) },
    { pass: r5 === 'loudWords', description: 'camelCase("LOUD WORDS") returns "loudWords"', got: String(r5) },
    { pass: r6 === '', description: 'camelCase("") returns "" (empty string)', got: JSON.stringify(r6) }
  ];
}`,
    hints: [
      'The first word should be entirely lowercase. Each subsequent word gets its first letter capitalized. Think about starting the loop at index 1 instead of 0.',
      'Use `words[0].toLowerCase()` as your initial result. Then loop from index 1, appending `word[0].toUpperCase() + word.slice(1).toLowerCase()` for each remaining word.',
    ],
    resources: appResources,
  },

  // 3. Application: Kebab Case
  {
    id: 1165,
    title: 'Application: Kebab Case',
    type: 'js',
    tier: 2,
    category: ['js-fundamentals', 'applications'],
    tags: ['strings', 'loops', 'split', 'toLowerCase', 'join'],
    description:
      'Convert a space-separated string to kebab-case notation.',
    instructions:
      'Write a function that converts a space-separated string to kebab-case. All words are lowercased and joined with hyphens instead of spaces.\n\nParameters:\n- `str`: a string of words separated by spaces\n\nReturn: the string in kebab-case\n\nExample: `kebabCase("Hello World")` returns `"hello-world"`\n\nExample: `kebabCase("The Quick Brown Fox")` returns `"the-quick-brown-fox"`',
    starterCode: 'function kebabCase(str) {\n\n}\n',
    solution:
      "function kebabCase(str) {\n  if (str === '') return '';\n  const words = str.split(' ');\n  const result = [];\n  for (let i = 0; i < words.length; i++) {\n    result.push(words[i].toLowerCase());\n  }\n  return result.join('-');\n}",
    testRunner: `(code) => {
  const fn = new Function(code + '; return kebabCase;')();
  const r1 = fn('Hello World');
  const r2 = fn('The Quick Brown Fox');
  const r3 = fn('background color');
  const r4 = fn('LOUD');
  const r5 = fn('already lowercase');
  const r6 = fn('');
  return [
    { pass: r1 === 'hello-world', description: 'kebabCase("Hello World") returns "hello-world"', got: String(r1) },
    { pass: r2 === 'the-quick-brown-fox', description: 'kebabCase("The Quick Brown Fox") returns "the-quick-brown-fox"', got: String(r2) },
    { pass: r3 === 'background-color', description: 'kebabCase("background color") returns "background-color"', got: String(r3) },
    { pass: r4 === 'loud', description: 'kebabCase("LOUD") returns "loud" (single word lowercased)', got: String(r4) },
    { pass: r5 === 'already-lowercase', description: 'kebabCase("already lowercase") returns "already-lowercase"', got: String(r5) },
    { pass: r6 === '', description: 'kebabCase("") returns "" (empty string)', got: JSON.stringify(r6) }
  ];
}`,
    hints: [
      'Split the string into words, convert each word to lowercase, and join them with hyphens instead of spaces.',
      'Use `split(\' \')` to get words, loop through and `push` each `word.toLowerCase()` into a result array, then use `result.join(\'-\')` to combine them.',
    ],
    resources: appResources,
  },

  // ── Part 2: Set Operations ────────────────────────────────────────────────

  // 4. Application: Intersection
  {
    id: 1166,
    title: 'Application: Intersection',
    type: 'js',
    tier: 2,
    category: ['js-fundamentals', 'applications'],
    tags: ['arrays', 'loops', 'includes', 'set-operations'],
    description:
      'Find the common elements shared between two arrays.',
    instructions:
      'Write a function that returns an array of elements that appear in both input arrays. Each element should appear only once in the result, even if it appears multiple times in the inputs.\n\nParameters:\n- `arr1`: first array\n- `arr2`: second array\n\nReturn: an array of elements found in both arrays (no duplicates)\n\nExample: `intersection([1, 2, 3], [2, 3, 4])` returns `[2, 3]`\n\nExample: `intersection([1, 2, 3], [4, 5, 6])` returns `[]`',
    starterCode: 'function intersection(arr1, arr2) {\n\n}\n',
    solution:
      "function intersection(arr1, arr2) {\n  const result = [];\n  for (let i = 0; i < arr1.length; i++) {\n    if (arr2.includes(arr1[i]) && !result.includes(arr1[i])) {\n      result.push(arr1[i]);\n    }\n  }\n  return result;\n}",
    testRunner: `(code) => {
  const fn = new Function(code + '; return intersection;')();
  const r1 = fn([1, 2, 3], [2, 3, 4]);
  const r2 = fn([1, 2, 3], [4, 5, 6]);
  const r3 = fn([1, 2, 3], [1, 2, 3]);
  const r4 = fn(['a', 'b', 'c'], ['b', 'c', 'd']);
  const r5 = fn([1, 1, 2], [1, 3]);
  const r6 = fn([], [1, 2]);
  return [
    { pass: JSON.stringify(r1) === '[2,3]', description: 'intersection([1,2,3], [2,3,4]) returns [2, 3]', got: JSON.stringify(r1) },
    { pass: JSON.stringify(r2) === '[]', description: 'intersection([1,2,3], [4,5,6]) returns [] (no common elements)', got: JSON.stringify(r2) },
    { pass: JSON.stringify(r3) === '[1,2,3]', description: 'intersection([1,2,3], [1,2,3]) returns [1, 2, 3] (identical arrays)', got: JSON.stringify(r3) },
    { pass: JSON.stringify(r4) === '["b","c"]', description: 'intersection(["a","b","c"], ["b","c","d"]) returns ["b", "c"]', got: JSON.stringify(r4) },
    { pass: JSON.stringify(r5) === '[1]', description: 'intersection([1,1,2], [1,3]) returns [1] (duplicates removed)', got: JSON.stringify(r5) },
    { pass: JSON.stringify(r6) === '[]', description: 'intersection([], [1,2]) returns [] (empty first array)', got: JSON.stringify(r6) }
  ];
}`,
    hints: [
      'Loop through the first array. For each element, check if it exists in the second array using `includes()`. Also check that it is not already in your result to avoid duplicates.',
      'Use two `includes()` checks: `arr2.includes(arr1[i])` to verify the element is shared, and `!result.includes(arr1[i])` to prevent duplicate entries in the result.',
    ],
    resources: appResources,
  },

  // 5. Application: Difference
  {
    id: 1167,
    title: 'Application: Difference',
    type: 'js',
    tier: 2,
    category: ['js-fundamentals', 'applications'],
    tags: ['arrays', 'loops', 'includes', 'set-operations'],
    description:
      'Find elements in the first array that are not in the second array.',
    instructions:
      'Write a function that returns elements from the first array that do not appear in the second array.\n\nParameters:\n- `arr1`: the source array\n- `arr2`: the array of elements to exclude\n\nReturn: an array of elements from `arr1` that are not in `arr2`\n\nExample: `difference([1, 2, 3, 4], [2, 4])` returns `[1, 3]`\n\nExample: `difference([1, 2, 3], [1, 2, 3])` returns `[]`',
    starterCode: 'function difference(arr1, arr2) {\n\n}\n',
    solution:
      "function difference(arr1, arr2) {\n  const result = [];\n  for (let i = 0; i < arr1.length; i++) {\n    if (!arr2.includes(arr1[i])) {\n      result.push(arr1[i]);\n    }\n  }\n  return result;\n}",
    testRunner: `(code) => {
  const fn = new Function(code + '; return difference;')();
  const r1 = fn([1, 2, 3, 4], [2, 4]);
  const r2 = fn([1, 2, 3], [1, 2, 3]);
  const r3 = fn([1, 2, 3], [4, 5, 6]);
  const r4 = fn(['a', 'b', 'c'], ['b']);
  const r5 = fn([1, 2, 3], []);
  const r6 = fn([], [1, 2]);
  return [
    { pass: JSON.stringify(r1) === '[1,3]', description: 'difference([1,2,3,4], [2,4]) returns [1, 3]', got: JSON.stringify(r1) },
    { pass: JSON.stringify(r2) === '[]', description: 'difference([1,2,3], [1,2,3]) returns [] (all excluded)', got: JSON.stringify(r2) },
    { pass: JSON.stringify(r3) === '[1,2,3]', description: 'difference([1,2,3], [4,5,6]) returns [1, 2, 3] (nothing excluded)', got: JSON.stringify(r3) },
    { pass: JSON.stringify(r4) === '["a","c"]', description: 'difference(["a","b","c"], ["b"]) returns ["a", "c"]', got: JSON.stringify(r4) },
    { pass: JSON.stringify(r5) === '[1,2,3]', description: 'difference([1,2,3], []) returns [1, 2, 3] (empty exclusion)', got: JSON.stringify(r5) },
    { pass: JSON.stringify(r6) === '[]', description: 'difference([], [1,2]) returns [] (empty source)', got: JSON.stringify(r6) }
  ];
}`,
    hints: [
      'This is the opposite of intersection. Loop through the first array and collect elements that are NOT found in the second array.',
      'Use `!arr2.includes(arr1[i])` to check if an element from the first array is absent from the second. If the check passes, push the element to the result.',
    ],
    resources: appResources,
  },

  // ── Part 3: Array Utilities ───────────────────────────────────────────────

  // 6. Application: Zip Arrays
  {
    id: 1168,
    title: 'Application: Zip Arrays',
    type: 'js',
    tier: 2,
    category: ['js-fundamentals', 'applications'],
    tags: ['arrays', 'loops', 'nested-arrays'],
    description:
      'Combine two arrays into an array of paired elements.',
    instructions:
      'Write a function that pairs up elements from two arrays by their index position. If the arrays have different lengths, stop at the shorter one.\n\nParameters:\n- `arr1`: first array\n- `arr2`: second array\n\nReturn: an array of two-element arrays, where each pair contains elements at the same index\n\nExample: `zip([1, 2, 3], ["a", "b", "c"])` returns `[[1, "a"], [2, "b"], [3, "c"]]`\n\nExample: `zip([1, 2], ["a", "b", "c"])` returns `[[1, "a"], [2, "b"]]`',
    starterCode: 'function zip(arr1, arr2) {\n\n}\n',
    solution:
      "function zip(arr1, arr2) {\n  const result = [];\n  const len = Math.min(arr1.length, arr2.length);\n  for (let i = 0; i < len; i++) {\n    result.push([arr1[i], arr2[i]]);\n  }\n  return result;\n}",
    testRunner: `(code) => {
  const fn = new Function(code + '; return zip;')();
  const r1 = fn([1, 2, 3], ['a', 'b', 'c']);
  const r2 = fn([1, 2], ['a', 'b', 'c']);
  const r3 = fn(['x'], [10]);
  const r4 = fn([], [1, 2]);
  const r5 = fn([1, 2, 3], [true, false, true]);
  return [
    { pass: JSON.stringify(r1) === '[[1,"a"],[2,"b"],[3,"c"]]', description: 'zip([1,2,3], ["a","b","c"]) returns [[1,"a"],[2,"b"],[3,"c"]]', got: JSON.stringify(r1) },
    { pass: JSON.stringify(r2) === '[[1,"a"],[2,"b"]]', description: 'zip([1,2], ["a","b","c"]) stops at shorter array length', got: JSON.stringify(r2) },
    { pass: JSON.stringify(r3) === '[["x",10]]', description: 'zip(["x"], [10]) returns [["x", 10]]', got: JSON.stringify(r3) },
    { pass: JSON.stringify(r4) === '[]', description: 'zip([], [1,2]) returns [] (empty first array)', got: JSON.stringify(r4) },
    { pass: JSON.stringify(r5) === '[[1,true],[2,false],[3,true]]', description: 'zip([1,2,3], [true,false,true]) handles mixed types', got: JSON.stringify(r5) }
  ];
}`,
    hints: [
      'You need to loop up to the length of the shorter array. Use `Math.min()` to find the smaller length, then pair elements at each index.',
      'Use `Math.min(arr1.length, arr2.length)` as your loop limit. On each iteration, push `[arr1[i], arr2[i]]` as a two-element array into the result.',
    ],
    resources: appResources,
  },

  // 7. Application: Unzip Pairs
  {
    id: 1169,
    title: 'Application: Unzip Pairs',
    type: 'js',
    tier: 2,
    category: ['js-fundamentals', 'applications'],
    tags: ['arrays', 'loops', 'nested-arrays'],
    description:
      'Separate an array of pairs into two individual arrays.',
    instructions:
      'Write a function that takes an array of two-element pairs and separates them into two arrays — one containing all first elements and one containing all second elements. This is the reverse of zip.\n\nParameters:\n- `pairs`: an array of two-element arrays\n\nReturn: an array containing two arrays: `[firstElements, secondElements]`\n\nExample: `unzip([[1, "a"], [2, "b"], [3, "c"]])` returns `[[1, 2, 3], ["a", "b", "c"]]`\n\nExample: `unzip([])` returns `[[], []]`',
    starterCode: 'function unzip(pairs) {\n\n}\n',
    solution:
      "function unzip(pairs) {\n  const first = [];\n  const second = [];\n  for (let i = 0; i < pairs.length; i++) {\n    first.push(pairs[i][0]);\n    second.push(pairs[i][1]);\n  }\n  return [first, second];\n}",
    testRunner: `(code) => {
  const fn = new Function(code + '; return unzip;')();
  const r1 = fn([[1, 'a'], [2, 'b'], [3, 'c']]);
  const r2 = fn([['x', 10]]);
  const r3 = fn([[true, 1], [false, 2]]);
  const r4 = fn([]);
  const r5 = fn([['a', 'b'], ['c', 'd'], ['e', 'f']]);
  return [
    { pass: JSON.stringify(r1) === '[[1,2,3],["a","b","c"]]', description: 'unzip([[1,"a"],[2,"b"],[3,"c"]]) returns [[1,2,3],["a","b","c"]]', got: JSON.stringify(r1) },
    { pass: JSON.stringify(r2) === '[["x"],[10]]', description: 'unzip([["x",10]]) returns [["x"],[10]]', got: JSON.stringify(r2) },
    { pass: JSON.stringify(r3) === '[[true,false],[1,2]]', description: 'unzip([[true,1],[false,2]]) returns [[true,false],[1,2]]', got: JSON.stringify(r3) },
    { pass: JSON.stringify(r4) === '[[],[]]', description: 'unzip([]) returns [[],[]] (empty input)', got: JSON.stringify(r4) },
    { pass: JSON.stringify(r5) === '[["a","c","e"],["b","d","f"]]', description: 'unzip([["a","b"],["c","d"],["e","f"]]) separates all pairs', got: JSON.stringify(r5) }
  ];
}`,
    hints: [
      'Create two empty arrays — one for first elements and one for second elements. Loop through the pairs and push each part to the corresponding array.',
      'Access `pairs[i][0]` for first elements and `pairs[i][1]` for second elements. Push them to separate arrays and return both wrapped in an outer array: `[first, second]`.',
    ],
    resources: appResources,
  },

  // 8. Application: Chunk Array
  {
    id: 1170,
    title: 'Application: Chunk Array',
    type: 'js',
    tier: 2,
    category: ['js-fundamentals', 'applications'],
    tags: ['arrays', 'loops', 'slice'],
    description:
      'Split an array into groups of a specified size.',
    instructions:
      'Write a function that splits an array into smaller arrays (chunks) of a given size. The last chunk may have fewer elements if the array does not divide evenly.\n\nParameters:\n- `arr`: the array to split\n- `size`: the maximum number of elements per chunk\n\nReturn: an array of arrays, each containing up to `size` elements\n\nExample: `chunk([1, 2, 3, 4, 5], 2)` returns `[[1, 2], [3, 4], [5]]`\n\nExample: `chunk([1, 2, 3, 4], 2)` returns `[[1, 2], [3, 4]]`',
    starterCode: 'function chunk(arr, size) {\n\n}\n',
    solution:
      "function chunk(arr, size) {\n  const result = [];\n  for (let i = 0; i < arr.length; i += size) {\n    result.push(arr.slice(i, i + size));\n  }\n  return result;\n}",
    testRunner: `(code) => {
  const fn = new Function(code + '; return chunk;')();
  const r1 = fn([1, 2, 3, 4, 5], 2);
  const r2 = fn([1, 2, 3, 4], 2);
  const r3 = fn([1, 2, 3], 1);
  const r4 = fn([1, 2, 3], 5);
  const r5 = fn([1, 2, 3, 4, 5, 6], 3);
  const r6 = fn([], 2);
  return [
    { pass: JSON.stringify(r1) === '[[1,2],[3,4],[5]]', description: 'chunk([1,2,3,4,5], 2) returns [[1,2],[3,4],[5]] (last chunk smaller)', got: JSON.stringify(r1) },
    { pass: JSON.stringify(r2) === '[[1,2],[3,4]]', description: 'chunk([1,2,3,4], 2) returns [[1,2],[3,4]] (divides evenly)', got: JSON.stringify(r2) },
    { pass: JSON.stringify(r3) === '[[1],[2],[3]]', description: 'chunk([1,2,3], 1) returns [[1],[2],[3]] (size 1)', got: JSON.stringify(r3) },
    { pass: JSON.stringify(r4) === '[[1,2,3]]', description: 'chunk([1,2,3], 5) returns [[1,2,3]] (size larger than array)', got: JSON.stringify(r4) },
    { pass: JSON.stringify(r5) === '[[1,2,3],[4,5,6]]', description: 'chunk([1,2,3,4,5,6], 3) returns [[1,2,3],[4,5,6]]', got: JSON.stringify(r5) },
    { pass: JSON.stringify(r6) === '[]', description: 'chunk([], 2) returns [] (empty array)', got: JSON.stringify(r6) }
  ];
}`,
    hints: [
      'Instead of incrementing by 1, step through the array in increments of `size`. At each step, grab a slice of elements from the current position.',
      'Use `i += size` in your for loop instead of `i++`. On each iteration, `arr.slice(i, i + size)` gives you the current chunk. Push it to the result array.',
    ],
    resources: appResources,
  },

  // 9. Application: Number Range
  {
    id: 1171,
    title: 'Application: Number Range',
    type: 'js',
    tier: 2,
    category: ['js-fundamentals', 'applications'],
    tags: ['arrays', 'loops', 'push'],
    description:
      'Generate an array of sequential numbers within a range.',
    instructions:
      'Write a function that generates an array of numbers from `start` (inclusive) up to but not including `end`.\n\nParameters:\n- `start`: the first number in the range (inclusive)\n- `end`: the upper bound (exclusive)\n\nReturn: an array of sequential numbers from start to end\n\nExample: `range(1, 5)` returns `[1, 2, 3, 4]`\n\nExample: `range(0, 3)` returns `[0, 1, 2]`',
    starterCode: 'function range(start, end) {\n\n}\n',
    solution:
      "function range(start, end) {\n  const result = [];\n  for (let i = start; i < end; i++) {\n    result.push(i);\n  }\n  return result;\n}",
    testRunner: `(code) => {
  const fn = new Function(code + '; return range;')();
  const r1 = fn(1, 5);
  const r2 = fn(0, 3);
  const r3 = fn(5, 5);
  const r4 = fn(-2, 3);
  const r5 = fn(0, 1);
  const r6 = fn(10, 15);
  return [
    { pass: JSON.stringify(r1) === '[1,2,3,4]', description: 'range(1, 5) returns [1, 2, 3, 4]', got: JSON.stringify(r1) },
    { pass: JSON.stringify(r2) === '[0,1,2]', description: 'range(0, 3) returns [0, 1, 2]', got: JSON.stringify(r2) },
    { pass: JSON.stringify(r3) === '[]', description: 'range(5, 5) returns [] (start equals end)', got: JSON.stringify(r3) },
    { pass: JSON.stringify(r4) === '[-2,-1,0,1,2]', description: 'range(-2, 3) returns [-2, -1, 0, 1, 2] (negative start)', got: JSON.stringify(r4) },
    { pass: JSON.stringify(r5) === '[0]', description: 'range(0, 1) returns [0] (single element)', got: JSON.stringify(r5) },
    { pass: JSON.stringify(r6) === '[10,11,12,13,14]', description: 'range(10, 15) returns [10, 11, 12, 13, 14]', got: JSON.stringify(r6) }
  ];
}`,
    hints: [
      'Use a for loop that starts at `start` and runs while `i < end`. Push each number into a result array.',
      'The loop structure is `for (let i = start; i < end; i++)`. Push `i` on each iteration. If `start >= end`, the loop never runs and you return an empty array.',
    ],
    resources: appResources,
  },

  // ── Part 4: Analysis & Validation ─────────────────────────────────────────

  // 10. Application: Average Score
  {
    id: 1172,
    title: 'Application: Average Score',
    type: 'js',
    tier: 2,
    category: ['js-fundamentals', 'applications'],
    tags: ['arrays', 'loops', 'accumulation', 'math'],
    description:
      'Calculate the average value of an array of numbers.',
    instructions:
      'Write a function that calculates the average (mean) of an array of numbers. Return `0` for an empty array.\n\nParameters:\n- `scores`: an array of numbers\n\nReturn: the average of all numbers in the array\n\nExample: `averageScore([80, 90, 100])` returns `90`\n\nExample: `averageScore([1, 2, 3, 4, 5])` returns `3`',
    starterCode: 'function averageScore(scores) {\n\n}\n',
    solution:
      "function averageScore(scores) {\n  if (scores.length === 0) return 0;\n  let sum = 0;\n  for (let i = 0; i < scores.length; i++) {\n    sum += scores[i];\n  }\n  return sum / scores.length;\n}",
    testRunner: `(code) => {
  const fn = new Function(code + '; return averageScore;')();
  const r1 = fn([80, 90, 100]);
  const r2 = fn([70, 80, 90, 100]);
  const r3 = fn([100]);
  const r4 = fn([0, 0, 0]);
  const r5 = fn([1, 2, 3, 4, 5]);
  const r6 = fn([]);
  return [
    { pass: r1 === 90, description: 'averageScore([80, 90, 100]) returns 90', got: String(r1) },
    { pass: r2 === 85, description: 'averageScore([70, 80, 90, 100]) returns 85', got: String(r2) },
    { pass: r3 === 100, description: 'averageScore([100]) returns 100 (single element)', got: String(r3) },
    { pass: r4 === 0, description: 'averageScore([0, 0, 0]) returns 0', got: String(r4) },
    { pass: r5 === 3, description: 'averageScore([1, 2, 3, 4, 5]) returns 3', got: String(r5) },
    { pass: r6 === 0, description: 'averageScore([]) returns 0 (empty array)', got: String(r6) }
  ];
}`,
    hints: [
      'Sum all the numbers in the array using a loop, then divide by the array length. Handle the empty array case separately to avoid dividing by zero.',
      'Use an accumulator variable starting at 0. Loop through and add each score. After the loop, return `sum / scores.length`. Check `scores.length === 0` first and return 0 for that case.',
    ],
    resources: appResources,
  },

  // 11. Application: Validate Password
  {
    id: 1173,
    title: 'Application: Validate Password',
    type: 'js',
    tier: 2,
    category: ['js-fundamentals', 'applications'],
    tags: ['strings', 'loops', 'conditionals', 'validation'],
    description:
      'Check whether a password meets strength requirements.',
    instructions:
      'Write a function that validates a password against these rules:\n- At least 8 characters long\n- Contains at least one uppercase letter (A-Z)\n- Contains at least one lowercase letter (a-z)\n- Contains at least one digit (0-9)\n\nReturn `true` if all rules pass, `false` otherwise.\n\nParameters:\n- `password`: a string to validate\n\nReturn: `true` or `false`\n\nExample: `validatePassword("Passw0rd")` returns `true`\n\nExample: `validatePassword("password")` returns `false`',
    starterCode: 'function validatePassword(password) {\n\n}\n',
    solution:
      "function validatePassword(password) {\n  if (password.length < 8) return false;\n  let hasUpper = false;\n  let hasLower = false;\n  let hasDigit = false;\n  for (let i = 0; i < password.length; i++) {\n    const ch = password[i];\n    if (ch >= 'A' && ch <= 'Z') hasUpper = true;\n    if (ch >= 'a' && ch <= 'z') hasLower = true;\n    if (ch >= '0' && ch <= '9') hasDigit = true;\n  }\n  return hasUpper && hasLower && hasDigit;\n}",
    testRunner: `(code) => {
  const fn = new Function(code + '; return validatePassword;')();
  const r1 = fn('Passw0rd');
  const r2 = fn('password');
  const r3 = fn('PASSWORD1');
  const r4 = fn('Pass1');
  const r5 = fn('abcDEF123');
  const r6 = fn('12345678');
  const r7 = fn('MyP@ssw0rd');
  return [
    { pass: r1 === true, description: 'validatePassword("Passw0rd") returns true (meets all rules)', got: String(r1) },
    { pass: r2 === false, description: 'validatePassword("password") returns false (no uppercase, no digit)', got: String(r2) },
    { pass: r3 === false, description: 'validatePassword("PASSWORD1") returns false (no lowercase)', got: String(r3) },
    { pass: r4 === false, description: 'validatePassword("Pass1") returns false (too short)', got: String(r4) },
    { pass: r5 === true, description: 'validatePassword("abcDEF123") returns true', got: String(r5) },
    { pass: r6 === false, description: 'validatePassword("12345678") returns false (no letters)', got: String(r6) },
    { pass: r7 === true, description: 'validatePassword("MyP@ssw0rd") returns true (special chars are fine)', got: String(r7) }
  ];
}`,
    hints: [
      'Check the length first as an early return. Then loop through each character, using boolean flags to track whether you have found an uppercase letter, a lowercase letter, and a digit.',
      'Compare each character against ranges: `ch >= \'A\' && ch <= \'Z\'` for uppercase, `ch >= \'a\' && ch <= \'z\'` for lowercase, `ch >= \'0\' && ch <= \'9\'` for digits. After the loop, return true only if all three flags are true.',
    ],
    resources: appResources,
  },

  // ── Part 5: Frequency Analysis ────────────────────────────────────────────

  // 12. Application: Character Frequency
  {
    id: 1174,
    title: 'Application: Character Frequency',
    type: 'js',
    tier: 2,
    category: ['js-fundamentals', 'applications'],
    tags: ['strings', 'loops', 'objects', 'frequency'],
    description:
      'Count the occurrences of each character in a string.',
    instructions:
      'Write a function that counts how many times each character appears in a string. The count is case-sensitive — uppercase and lowercase letters are counted separately.\n\nParameters:\n- `str`: a string\n\nReturn: an object where each key is a character and each value is its count\n\nExample: `charFrequency("hello")` returns `{ h: 1, e: 1, l: 2, o: 1 }`\n\nExample: `charFrequency("aaa")` returns `{ a: 3 }`',
    starterCode: 'function charFrequency(str) {\n\n}\n',
    solution:
      "function charFrequency(str) {\n  const freq = {};\n  for (let i = 0; i < str.length; i++) {\n    const ch = str[i];\n    if (freq[ch] === undefined) {\n      freq[ch] = 1;\n    } else {\n      freq[ch]++;\n    }\n  }\n  return freq;\n}",
    testRunner: `(code) => {
  const fn = new Function(code + '; return charFrequency;')();
  const r1 = fn('hello');
  const r2 = fn('aaa');
  const r3 = fn('ab');
  const r4 = fn('');
  const r5 = fn('aAbB');
  return [
    { pass: r1.h === 1 && r1.e === 1 && r1.l === 2 && r1.o === 1 && Object.keys(r1).length === 4, description: 'charFrequency("hello") returns { h: 1, e: 1, l: 2, o: 1 }', got: JSON.stringify(r1) },
    { pass: r2.a === 3 && Object.keys(r2).length === 1, description: 'charFrequency("aaa") returns { a: 3 }', got: JSON.stringify(r2) },
    { pass: r3.a === 1 && r3.b === 1 && Object.keys(r3).length === 2, description: 'charFrequency("ab") returns { a: 1, b: 1 }', got: JSON.stringify(r3) },
    { pass: Object.keys(r4).length === 0, description: 'charFrequency("") returns {} (empty string)', got: JSON.stringify(r4) },
    { pass: r5.a === 1 && r5.A === 1 && r5.b === 1 && r5.B === 1 && Object.keys(r5).length === 4, description: 'charFrequency("aAbB") returns { a: 1, A: 1, b: 1, B: 1 } (case-sensitive)', got: JSON.stringify(r5) }
  ];
}`,
    hints: [
      'Build an object where each key is a character and each value is how many times it appears. Loop through the string one character at a time.',
      'Start with an empty object `{}`. For each character, check `if (freq[ch] === undefined)` to decide whether to set it to 1 or increment it with `freq[ch]++`.',
    ],
    resources: appResources,
  },

  // 13. Application: Word Frequency
  {
    id: 1175,
    title: 'Application: Word Frequency',
    type: 'js',
    tier: 2,
    category: ['js-fundamentals', 'applications'],
    tags: ['strings', 'loops', 'objects', 'split', 'frequency'],
    description:
      'Count the occurrences of each word in a text string.',
    instructions:
      'Write a function that counts how many times each word appears in a text. Words are compared case-insensitively (convert to lowercase before counting). Words are separated by single spaces.\n\nParameters:\n- `text`: a string of words separated by spaces\n\nReturn: an object where each key is a lowercase word and each value is its count\n\nExample: `wordFrequency("the cat and the dog")` returns `{ the: 2, cat: 1, and: 1, dog: 1 }`\n\nExample: `wordFrequency("Hello hello HELLO")` returns `{ hello: 3 }`',
    starterCode: 'function wordFrequency(text) {\n\n}\n',
    solution:
      "function wordFrequency(text) {\n  if (text === '') return {};\n  const words = text.split(' ');\n  const freq = {};\n  for (let i = 0; i < words.length; i++) {\n    const word = words[i].toLowerCase();\n    if (freq[word] === undefined) {\n      freq[word] = 1;\n    } else {\n      freq[word]++;\n    }\n  }\n  return freq;\n}",
    testRunner: `(code) => {
  const fn = new Function(code + '; return wordFrequency;')();
  const r1 = fn('the cat and the dog');
  const r2 = fn('hello hello hello');
  const r3 = fn('Hello hello HELLO');
  const r4 = fn('one');
  const r5 = fn('');
  return [
    { pass: r1.the === 2 && r1.cat === 1 && r1.and === 1 && r1.dog === 1 && Object.keys(r1).length === 4, description: 'wordFrequency("the cat and the dog") returns { the: 2, cat: 1, and: 1, dog: 1 }', got: JSON.stringify(r1) },
    { pass: r2.hello === 3 && Object.keys(r2).length === 1, description: 'wordFrequency("hello hello hello") returns { hello: 3 }', got: JSON.stringify(r2) },
    { pass: r3.hello === 3 && Object.keys(r3).length === 1, description: 'wordFrequency("Hello hello HELLO") returns { hello: 3 } (case-insensitive)', got: JSON.stringify(r3) },
    { pass: r4.one === 1 && Object.keys(r4).length === 1, description: 'wordFrequency("one") returns { one: 1 } (single word)', got: JSON.stringify(r4) },
    { pass: Object.keys(r5).length === 0, description: 'wordFrequency("") returns {} (empty string)', got: JSON.stringify(r5) }
  ];
}`,
    hints: [
      'Split the text into words, convert each to lowercase for case-insensitive counting, then count occurrences the same way as character frequency — building an object with word keys and count values.',
      'Use `text.split(\' \')` to get words. For each word, convert with `.toLowerCase()` then update the frequency object. Handle the empty string case by returning an empty object early.',
    ],
    resources: appResources,
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

  console.log(`\nT2 Application Exercises — ${exercises.length} exercises\n`);
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

  // Check for ID collisions
  const existingIds = new Set(curriculum.exercises.map((e) => e.id));
  for (const ex of exercises) {
    if (existingIds.has(ex.id)) {
      console.error(`✗ ID collision: exercise ${ex.id} already exists.`);
      process.exit(1);
    }
  }

  const beforeCount = curriculum.exercises.length;
  curriculum.exercises.push(...exercises);

  fs.writeFileSync(
    CURRICULUM_PATH,
    JSON.stringify(curriculum, null, 2) + '\n',
    'utf-8'
  );

  console.log(
    `✓ Appended ${exercises.length} exercises (IDs ${exercises[0].id}-${exercises[exercises.length - 1].id}) to default-curriculum.json`
  );
  console.log(
    `  Total: ${beforeCount} → ${curriculum.exercises.length} exercises\n`
  );
}

main();
