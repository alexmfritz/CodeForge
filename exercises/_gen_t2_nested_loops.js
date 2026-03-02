#!/usr/bin/env node
/**
 * Generator: T2 Nested Loops (10 exercises, IDs 1093-1102)
 *
 * Usage:
 *   node exercises/_gen_t2_nested_loops.js          # Append to default-curriculum.json
 *   node exercises/_gen_t2_nested_loops.js --validate  # Validate testRunners only
 */

const fs = require('fs');
const path = require('path');

const CURRICULUM_PATH = path.join(
  __dirname,
  'collections',
  'default-curriculum.json'
);

// ─── Exercise Definitions ────────────────────────────────────────────────────

const exercises = [
  // ── 1. Nested Loops: Basics (scaffolded entry point) ───────────────────────
  {
    id: 1093,
    title: 'Nested Loops: Basics',
    type: 'js',
    tier: 2,
    category: ['js-fundamentals', 'loops'],
    tags: ['nested-loops', 'loops', 'arrays'],
    description:
      'Generate all coordinate strings for a grid using nested loops.',
    instructions:
      'A nested loop is a loop inside another loop. The inner loop runs completely for each iteration of the outer loop. This lets you work with combinations, grids, and multi-dimensional data.\n\nWrite a function called `gridCoordinates` that takes `rows` and `cols` (both numbers) and returns an array of coordinate strings in the format `"(row,col)"`. Iterate through every row and column combination.\n\nExample: `gridCoordinates(2, 3)` returns `["(0,0)", "(0,1)", "(0,2)", "(1,0)", "(1,1)", "(1,2)"]`.',
    starterCode:
      '// A nested loop is a loop inside another loop.\n// The outer loop runs once for each row.\n// For EACH outer iteration, the inner loop runs\n// through ALL columns before the outer loop moves on.\n//\n// Syntax:\n//   for (let i = 0; i < rows; i++) {\n//     for (let j = 0; j < cols; j++) {\n//       // this runs rows * cols times\n//     }\n//   }\n\n// Return an array of "(row,col)" strings for every position\nfunction gridCoordinates(rows, cols) {\n  // Create an empty array to collect coordinates\n  // Outer loop: iterate through each row\n  //   Inner loop: iterate through each column\n  //     Push the coordinate string "(i,j)" to the array\n  // Return the array\n}\n',
    solution:
      "function gridCoordinates(rows, cols) {\n  const coords = [];\n  for (let i = 0; i < rows; i++) {\n    for (let j = 0; j < cols; j++) {\n      coords.push('(' + i + ',' + j + ')');\n    }\n  }\n  return coords;\n}",
    testRunner: `(code) => {
  const fn = new Function(code + '; return gridCoordinates;')();
  return [
    { pass: JSON.stringify(fn(2, 3)) === '["(0,0)","(0,1)","(0,2)","(1,0)","(1,1)","(1,2)"]', description: 'gridCoordinates(2, 3) returns 6 coordinates in row-major order', got: JSON.stringify(fn(2, 3)) },
    { pass: JSON.stringify(fn(1, 1)) === '["(0,0)"]', description: 'gridCoordinates(1, 1) returns ["(0,0)"]', got: JSON.stringify(fn(1, 1)) },
    { pass: JSON.stringify(fn(3, 2)) === '["(0,0)","(0,1)","(1,0)","(1,1)","(2,0)","(2,1)"]', description: 'gridCoordinates(3, 2) returns 6 coordinates (3 rows, 2 cols)', got: JSON.stringify(fn(3, 2)) },
    { pass: JSON.stringify(fn(0, 3)) === '[]', description: 'gridCoordinates(0, 3) returns [] (no rows)', got: JSON.stringify(fn(0, 3)) },
    { pass: JSON.stringify(fn(2, 0)) === '[]', description: 'gridCoordinates(2, 0) returns [] (no columns)', got: JSON.stringify(fn(2, 0)) },
    { pass: JSON.stringify(fn(1, 4)) === '["(0,0)","(0,1)","(0,2)","(0,3)"]', description: 'gridCoordinates(1, 4) returns 4 coordinates (1 row, 4 cols)', got: JSON.stringify(fn(1, 4)) }
  ];
}`,
    hints: [
      'A nested loop has an outer loop and an inner loop. The inner loop runs all its iterations for each single iteration of the outer loop. For a 2×3 grid, the inner loop runs 3 times for row 0, then 3 times for row 1.',
      'Use two `for` loops — the outer with `i < rows`, the inner with `j < cols`. Inside the inner loop, push `"(" + i + "," + j + ")"` to your results array.',
    ],
    resources: [
      {
        label: 'W3Schools: JavaScript For Loop',
        url: 'https://www.w3schools.com/js/js_loop_for.asp',
        description: 'For loop basics',
      },
      {
        label: 'MDN: Loops and iteration',
        url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Loops_and_iteration',
        description: 'Loop patterns including nested loops',
      },
    ],
  },

  // ── 2. Nested Loops: Pairs ─────────────────────────────────────────────────
  {
    id: 1094,
    title: 'Nested Loops: Pairs',
    type: 'js',
    tier: 2,
    category: ['js-fundamentals', 'loops'],
    tags: ['nested-loops', 'loops', 'arrays', 'combinations'],
    description:
      'Return all unique pairs from an array using nested loops.',
    instructions:
      'Write a function called `uniquePairs` that takes an array and returns all unique pairs as an array of two-element arrays. Each pair should be `[arr[i], arr[j]]` where `j` is always greater than `i` — this avoids duplicate pairs and self-pairing.\n\nExample: `uniquePairs(["a", "b", "c"])` returns `[["a","b"], ["a","c"], ["b","c"]]`.\n\nExample: `uniquePairs([1, 2, 3, 4])` returns `[[1,2], [1,3], [1,4], [2,3], [2,4], [3,4]]`.',
    starterCode:
      '// Return all unique pairs [arr[i], arr[j]] where j > i\nfunction uniquePairs(arr) {\n\n}\n',
    solution:
      'function uniquePairs(arr) {\n  const pairs = [];\n  for (let i = 0; i < arr.length; i++) {\n    for (let j = i + 1; j < arr.length; j++) {\n      pairs.push([arr[i], arr[j]]);\n    }\n  }\n  return pairs;\n}',
    testRunner: `(code) => {
  const fn = new Function(code + '; return uniquePairs;')();
  return [
    { pass: JSON.stringify(fn(['a','b','c'])) === '[["a","b"],["a","c"],["b","c"]]', description: 'uniquePairs(["a","b","c"]) returns 3 pairs', got: JSON.stringify(fn(['a','b','c'])) },
    { pass: JSON.stringify(fn([1,2,3,4])) === '[[1,2],[1,3],[1,4],[2,3],[2,4],[3,4]]', description: 'uniquePairs([1,2,3,4]) returns 6 pairs', got: JSON.stringify(fn([1,2,3,4])) },
    { pass: JSON.stringify(fn(['x','y'])) === '[["x","y"]]', description: 'uniquePairs(["x","y"]) returns 1 pair', got: JSON.stringify(fn(['x','y'])) },
    { pass: JSON.stringify(fn([5])) === '[]', description: 'uniquePairs([5]) returns [] (cannot pair a single element)', got: JSON.stringify(fn([5])) },
    { pass: JSON.stringify(fn([])) === '[]', description: 'uniquePairs([]) returns [] (empty array)', got: JSON.stringify(fn([])) },
    { pass: JSON.stringify(fn([true, false, true])) === '[[true,false],[true,true],[false,true]]', description: 'uniquePairs([true,false,true]) returns 3 pairs with mixed booleans', got: JSON.stringify(fn([true, false, true])) }
  ];
}`,
    hints: [
      'The key is making the inner loop start at `i + 1` instead of 0. This ensures you only pair each element with the elements that come after it, avoiding duplicates and self-pairs.',
      'Outer loop: `for (let i = 0; i < arr.length; i++)`. Inner loop: `for (let j = i + 1; j < arr.length; j++)`. Push `[arr[i], arr[j]]` each time.',
    ],
    resources: [
      {
        label: 'W3Schools: JavaScript For Loop',
        url: 'https://www.w3schools.com/js/js_loop_for.asp',
        description: 'For loop basics',
      },
      {
        label: 'MDN: Loops and iteration',
        url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Loops_and_iteration',
        description: 'Loop patterns including nested loops',
      },
    ],
  },

  // ── 3. Nested Loops: Find First ────────────────────────────────────────────
  {
    id: 1095,
    title: 'Nested Loops: Find First',
    type: 'js',
    tier: 2,
    category: ['js-fundamentals', 'loops'],
    tags: ['nested-loops', 'loops', '2d-arrays', 'search'],
    description:
      'Search a 2D array for the first occurrence of a target value.',
    instructions:
      'Write a function called `findIn2D` that takes a `grid` (an array of arrays) and a `target` value. Search through the grid row by row, column by column, and return `[row, col]` for the first occurrence of the target. If the target is not found, return `[-1, -1]`.\n\nExample: `findIn2D([[1, 2], [3, 4], [5, 6]], 4)` returns `[1, 1]`.\n\nExample: `findIn2D([[1, 2], [3, 4]], 99)` returns `[-1, -1]`.',
    starterCode:
      '// Search a 2D array for the first occurrence of target\n// Return [row, col] or [-1, -1] if not found\nfunction findIn2D(grid, target) {\n\n}\n',
    solution:
      'function findIn2D(grid, target) {\n  for (let i = 0; i < grid.length; i++) {\n    for (let j = 0; j < grid[i].length; j++) {\n      if (grid[i][j] === target) {\n        return [i, j];\n      }\n    }\n  }\n  return [-1, -1];\n}',
    testRunner: `(code) => {
  const fn = new Function(code + '; return findIn2D;')();
  return [
    { pass: JSON.stringify(fn([[1,2],[3,4],[5,6]], 4)) === '[1,1]', description: 'findIn2D([[1,2],[3,4],[5,6]], 4) returns [1,1]', got: JSON.stringify(fn([[1,2],[3,4],[5,6]], 4)) },
    { pass: JSON.stringify(fn([[1,2],[3,4],[5,6]], 1)) === '[0,0]', description: 'findIn2D finds 1 at [0,0] (first element)', got: JSON.stringify(fn([[1,2],[3,4],[5,6]], 1)) },
    { pass: JSON.stringify(fn([[1,2],[3,4],[5,6]], 6)) === '[2,1]', description: 'findIn2D finds 6 at [2,1] (last element)', got: JSON.stringify(fn([[1,2],[3,4],[5,6]], 6)) },
    { pass: JSON.stringify(fn([[1,2],[3,4],[5,6]], 99)) === '[-1,-1]', description: 'findIn2D returns [-1,-1] when target is not found', got: JSON.stringify(fn([[1,2],[3,4],[5,6]], 99)) },
    { pass: JSON.stringify(fn([['a','b'],['c','d']], 'c')) === '[1,0]', description: 'findIn2D works with string values', got: JSON.stringify(fn([['a','b'],['c','d']], 'c')) },
    { pass: JSON.stringify(fn([[1,1,1],[1,1,1]], 1)) === '[0,0]', description: 'findIn2D returns first occurrence when multiple exist', got: JSON.stringify(fn([[1,1,1],[1,1,1]], 1)) }
  ];
}`,
    hints: [
      'Use nested loops to visit every cell: outer loop for rows (`i`), inner loop for columns (`j`). Check each cell with `grid[i][j] === target`.',
      'When you find the target, `return [i, j]` immediately — this exits both loops. If the loops finish without finding it, `return [-1, -1]` after the outer loop.',
    ],
    resources: [
      {
        label: 'W3Schools: JavaScript For Loop',
        url: 'https://www.w3schools.com/js/js_loop_for.asp',
        description: 'For loop basics',
      },
      {
        label: 'MDN: Loops and iteration',
        url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Loops_and_iteration',
        description: 'Loop patterns including nested loops',
      },
    ],
  },

  // ── 4. Nested Loops: Find All ──────────────────────────────────────────────
  {
    id: 1096,
    title: 'Nested Loops: Find All',
    type: 'js',
    tier: 2,
    category: ['js-fundamentals', 'loops'],
    tags: ['nested-loops', 'loops', '2d-arrays', 'search'],
    description:
      'Search a 2D array and return the positions of all occurrences of a target value.',
    instructions:
      'Write a function called `findAllIn2D` that takes a `grid` (an array of arrays) and a `target` value. Search through every cell and return an array of `[row, col]` pairs for ALL occurrences. If the target is not found, return an empty array.\n\nExample: `findAllIn2D([[1, 2, 1], [3, 1, 4]], 1)` returns `[[0, 0], [0, 2], [1, 1]]`.\n\nExample: `findAllIn2D([[1, 2], [3, 4]], 5)` returns `[]`.',
    starterCode:
      '// Search a 2D array for ALL occurrences of target\n// Return an array of [row, col] pairs\nfunction findAllIn2D(grid, target) {\n\n}\n',
    solution:
      'function findAllIn2D(grid, target) {\n  const results = [];\n  for (let i = 0; i < grid.length; i++) {\n    for (let j = 0; j < grid[i].length; j++) {\n      if (grid[i][j] === target) {\n        results.push([i, j]);\n      }\n    }\n  }\n  return results;\n}',
    testRunner: `(code) => {
  const fn = new Function(code + '; return findAllIn2D;')();
  return [
    { pass: JSON.stringify(fn([[1,2,1],[3,1,4]], 1)) === '[[0,0],[0,2],[1,1]]', description: 'findAllIn2D([[1,2,1],[3,1,4]], 1) returns 3 positions', got: JSON.stringify(fn([[1,2,1],[3,1,4]], 1)) },
    { pass: JSON.stringify(fn([[1,2],[3,4]], 5)) === '[]', description: 'findAllIn2D returns [] when target is not found', got: JSON.stringify(fn([[1,2],[3,4]], 5)) },
    { pass: JSON.stringify(fn([['a','b','a'],['a','c','a']], 'a')) === '[[0,0],[0,2],[1,0],[1,2]]', description: 'findAllIn2D finds all "a" positions in a string grid', got: JSON.stringify(fn([['a','b','a'],['a','c','a']], 'a')) },
    { pass: JSON.stringify(fn([[7]], 7)) === '[[0,0]]', description: 'findAllIn2D([[7]], 7) returns [[0,0]] (single-cell grid)', got: JSON.stringify(fn([[7]], 7)) },
    { pass: JSON.stringify(fn([[1,2,3],[4,5,6],[7,8,9]], 5)) === '[[1,1]]', description: 'findAllIn2D returns [[1,1]] when target appears once', got: JSON.stringify(fn([[1,2,3],[4,5,6],[7,8,9]], 5)) },
    { pass: JSON.stringify(fn([[0,0,0],[0,0,0]], 0)) === '[[0,0],[0,1],[0,2],[1,0],[1,1],[1,2]]', description: 'findAllIn2D finds all positions when every cell matches', got: JSON.stringify(fn([[0,0,0],[0,0,0]], 0)) }
  ];
}`,
    hints: [
      'Unlike Find First, do NOT return early when you find a match. Instead, push each `[i, j]` match into a results array and keep going through the entire grid.',
      'Create an empty results array before the loops. Inside the inner loop, use `if (grid[i][j] === target)` to push `[i, j]`. After both loops finish, return the results array.',
    ],
    resources: [
      {
        label: 'W3Schools: JavaScript For Loop',
        url: 'https://www.w3schools.com/js/js_loop_for.asp',
        description: 'For loop basics',
      },
      {
        label: 'MDN: Loops and iteration',
        url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Loops_and_iteration',
        description: 'Loop patterns including nested loops',
      },
    ],
  },

  // ── 5. Nested Loops: Triangle ──────────────────────────────────────────────
  {
    id: 1097,
    title: 'Nested Loops: Triangle',
    type: 'js',
    tier: 2,
    category: ['js-fundamentals', 'loops'],
    tags: ['nested-loops', 'loops', 'strings', 'patterns'],
    description:
      'Build a right triangle pattern of stars as a multi-line string using nested loops.',
    instructions:
      'Write a function called `buildTriangle` that takes a number `n` and returns a right triangle of `*` characters as a single string. Row 1 has 1 star, row 2 has 2 stars, and so on up to `n` stars. Separate each row with `\\n` (a newline character). Do not add a trailing newline.\n\nExample: `buildTriangle(3)` returns `"*\\n**\\n***"` which displays as:\n```\n*\n**\n***\n```\n\nExample: `buildTriangle(1)` returns `"*"`.',
    starterCode:
      '// Build a right triangle of * characters as a multi-line string\n// Separate rows with \\n — do not add a trailing newline\nfunction buildTriangle(n) {\n\n}\n',
    solution:
      "function buildTriangle(n) {\n  let result = '';\n  for (let i = 1; i <= n; i++) {\n    for (let j = 0; j < i; j++) {\n      result += '*';\n    }\n    if (i < n) {\n      result += '\\n';\n    }\n  }\n  return result;\n}",
    testRunner: `(code) => {
  const fn = new Function(code + '; return buildTriangle;')();
  return [
    { pass: fn(1) === '*', description: 'buildTriangle(1) returns "*"', got: JSON.stringify(fn(1)) },
    { pass: fn(3) === '*\\n**\\n***', description: 'buildTriangle(3) returns "*\\n**\\n***"', got: JSON.stringify(fn(3)) },
    { pass: fn(5) === '*\\n**\\n***\\n****\\n*****', description: 'buildTriangle(5) returns 5 rows of increasing stars', got: JSON.stringify(fn(5)) },
    { pass: fn(4) === '*\\n**\\n***\\n****', description: 'buildTriangle(4) returns 4 rows', got: JSON.stringify(fn(4)) },
    { pass: fn(2) === '*\\n**', description: 'buildTriangle(2) returns "*\\n**"', got: JSON.stringify(fn(2)) },
    { pass: !fn(3).endsWith('\\n'), description: 'buildTriangle(3) does not end with a trailing newline', got: JSON.stringify(fn(3).slice(-3)) }
  ];
}`,
    hints: [
      'The outer loop controls which row you are on (1 through `n`). The inner loop adds stars — on row `i`, you need exactly `i` stars. After each row except the last, append `\\n`.',
      'Use a `result` string. Outer loop: `for (let i = 1; i <= n; i++)`. Inner loop: `for (let j = 0; j < i; j++) { result += "*"; }`. Then add `\\n` when `i < n`.',
    ],
    resources: [
      {
        label: 'W3Schools: JavaScript For Loop',
        url: 'https://www.w3schools.com/js/js_loop_for.asp',
        description: 'For loop basics',
      },
      {
        label: 'MDN: Loops and iteration',
        url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Loops_and_iteration',
        description: 'Loop patterns including nested loops',
      },
    ],
  },

  // ── 6. Nested Loops: Reverse Triangle ──────────────────────────────────────
  {
    id: 1098,
    title: 'Nested Loops: Reverse Triangle',
    type: 'js',
    tier: 2,
    category: ['js-fundamentals', 'loops'],
    tags: ['nested-loops', 'loops', 'strings', 'patterns'],
    description:
      'Build a right-aligned triangle of stars with leading spaces as a multi-line string.',
    instructions:
      'Write a function called `buildReverseTriangle` that takes a number `n` and returns a right-aligned triangle of `*` characters as a single string. Row 1 has `n - 1` leading spaces and 1 star, row 2 has `n - 2` spaces and 2 stars, continuing until the last row has 0 spaces and `n` stars. Separate each row with `\\n`. Do not add a trailing newline.\n\nExample: `buildReverseTriangle(4)` returns `"   *\\n  **\\n ***\\n****"` which displays as:\n```\n   *\n  **\n ***\n****\n```\n\nExample: `buildReverseTriangle(1)` returns `"*"`.',
    starterCode:
      '// Build a right-aligned triangle with leading spaces\n// Each row has (n - i - 1) spaces followed by (i + 1) stars\n// Separate rows with \\n — do not add a trailing newline\nfunction buildReverseTriangle(n) {\n\n}\n',
    solution:
      "function buildReverseTriangle(n) {\n  let result = '';\n  for (let i = 0; i < n; i++) {\n    for (let j = 0; j < n - i - 1; j++) {\n      result += ' ';\n    }\n    for (let j = 0; j < i + 1; j++) {\n      result += '*';\n    }\n    if (i < n - 1) {\n      result += '\\n';\n    }\n  }\n  return result;\n}",
    testRunner: `(code) => {
  const fn = new Function(code + '; return buildReverseTriangle;')();
  return [
    { pass: fn(1) === '*', description: 'buildReverseTriangle(1) returns "*"', got: JSON.stringify(fn(1)) },
    { pass: fn(3) === '  *\\n **\\n***', description: 'buildReverseTriangle(3) returns right-aligned 3-row triangle', got: JSON.stringify(fn(3)) },
    { pass: fn(4) === '   *\\n  **\\n ***\\n****', description: 'buildReverseTriangle(4) returns right-aligned 4-row triangle', got: JSON.stringify(fn(4)) },
    { pass: fn(5) === '    *\\n   **\\n  ***\\n ****\\n*****', description: 'buildReverseTriangle(5) returns right-aligned 5-row triangle', got: JSON.stringify(fn(5)) },
    { pass: fn(2) === ' *\\n**', description: 'buildReverseTriangle(2) returns " *\\n**"', got: JSON.stringify(fn(2)) },
    { pass: !fn(4).endsWith('\\n'), description: 'buildReverseTriangle(4) does not end with a trailing newline', got: JSON.stringify(fn(4).slice(-3)) }
  ];
}`,
    hints: [
      'Each row needs two things: leading spaces, then stars. On row `i` (starting at 0), you need `n - i - 1` spaces and `i + 1` stars. Use two separate inner loops — one for spaces, one for stars.',
      'Outer loop: `for (let i = 0; i < n; i++)`. First inner loop adds `n - i - 1` space characters. Second inner loop adds `i + 1` star characters. Append `\\n` after each row except the last.',
    ],
    resources: [
      {
        label: 'W3Schools: JavaScript For Loop',
        url: 'https://www.w3schools.com/js/js_loop_for.asp',
        description: 'For loop basics',
      },
      {
        label: 'MDN: Loops and iteration',
        url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Loops_and_iteration',
        description: 'Loop patterns including nested loops',
      },
    ],
  },

  // ── 7. Nested Loops: Flatten ───────────────────────────────────────────────
  {
    id: 1099,
    title: 'Nested Loops: Flatten',
    type: 'js',
    tier: 2,
    category: ['js-fundamentals', 'loops'],
    tags: ['nested-loops', 'loops', '2d-arrays'],
    description:
      'Flatten a 2D array into a 1D array using nested loops.',
    instructions:
      'Write a function called `flatten2D` that takes a `grid` (an array of arrays) and returns a single flat array containing all elements in row-major order. Use nested loops — do not use `.flat()`, `.concat()`, or spread syntax.\n\nExample: `flatten2D([[1, 2], [3], [4, 5, 6]])` returns `[1, 2, 3, 4, 5, 6]`.\n\nExample: `flatten2D([["a", "b"], ["c", "d"]])` returns `["a", "b", "c", "d"]`.',
    starterCode:
      '// Flatten a 2D array into a 1D array using nested loops\n// Do not use .flat(), .concat(), or spread syntax\nfunction flatten2D(grid) {\n\n}\n',
    solution:
      'function flatten2D(grid) {\n  const result = [];\n  for (let i = 0; i < grid.length; i++) {\n    for (let j = 0; j < grid[i].length; j++) {\n      result.push(grid[i][j]);\n    }\n  }\n  return result;\n}',
    testRunner: `(code) => {
  const fn = new Function(code + '; return flatten2D;')();
  return [
    { pass: JSON.stringify(fn([[1,2],[3],[4,5,6]])) === '[1,2,3,4,5,6]', description: 'flatten2D([[1,2],[3],[4,5,6]]) returns [1,2,3,4,5,6]', got: JSON.stringify(fn([[1,2],[3],[4,5,6]])) },
    { pass: JSON.stringify(fn([['a','b'],['c','d']])) === '["a","b","c","d"]', description: 'flatten2D with string arrays returns flat string array', got: JSON.stringify(fn([['a','b'],['c','d']])) },
    { pass: JSON.stringify(fn([[1]])) === '[1]', description: 'flatten2D([[1]]) returns [1] (single element)', got: JSON.stringify(fn([[1]])) },
    { pass: JSON.stringify(fn([[],[1,2],[]])) === '[1,2]', description: 'flatten2D handles empty inner arrays', got: JSON.stringify(fn([[],[1,2],[]])) },
    { pass: JSON.stringify(fn([])) === '[]', description: 'flatten2D([]) returns [] (empty grid)', got: JSON.stringify(fn([])) },
    { pass: JSON.stringify(fn([[true,false],[null,0]])) === '[true,false,null,0]', description: 'flatten2D works with mixed types', got: JSON.stringify(fn([[true,false],[null,0]])) }
  ];
}`,
    hints: [
      'Use the outer loop to iterate over each inner array (row), and the inner loop to iterate over each element within that row. Push each element into a results array.',
      'Outer loop: `for (let i = 0; i < grid.length; i++)`. Inner loop: `for (let j = 0; j < grid[i].length; j++)`. Push `grid[i][j]` to the result array each time.',
    ],
    resources: [
      {
        label: 'W3Schools: JavaScript For Loop',
        url: 'https://www.w3schools.com/js/js_loop_for.asp',
        description: 'For loop basics',
      },
      {
        label: 'MDN: Loops and iteration',
        url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Loops_and_iteration',
        description: 'Loop patterns including nested loops',
      },
    ],
  },

  // ── 8. Nested Loops: Multiplication Table ──────────────────────────────────
  {
    id: 1100,
    title: 'Nested Loops: Multiplication Table',
    type: 'js',
    tier: 2,
    category: ['js-fundamentals', 'loops'],
    tags: ['nested-loops', 'loops', '2d-arrays'],
    description:
      'Build a 2D multiplication table using nested loops.',
    instructions:
      'Write a function called `multiplicationTable` that takes a number `n` and returns a 2D array representing an n×n multiplication table. Each cell at `[i][j]` should contain `(i + 1) * (j + 1)`. The outer array represents rows, and each inner array represents a row of products.\n\nExample: `multiplicationTable(3)` returns `[[1, 2, 3], [2, 4, 6], [3, 6, 9]]`.\n\nExample: `multiplicationTable(1)` returns `[[1]]`.',
    starterCode:
      '// Build an n×n multiplication table as a 2D array\n// Cell [i][j] = (i + 1) * (j + 1)\nfunction multiplicationTable(n) {\n\n}\n',
    solution:
      'function multiplicationTable(n) {\n  const table = [];\n  for (let i = 0; i < n; i++) {\n    const row = [];\n    for (let j = 0; j < n; j++) {\n      row.push((i + 1) * (j + 1));\n    }\n    table.push(row);\n  }\n  return table;\n}',
    testRunner: `(code) => {
  const fn = new Function(code + '; return multiplicationTable;')();
  return [
    { pass: JSON.stringify(fn(1)) === '[[1]]', description: 'multiplicationTable(1) returns [[1]]', got: JSON.stringify(fn(1)) },
    { pass: JSON.stringify(fn(2)) === '[[1,2],[2,4]]', description: 'multiplicationTable(2) returns [[1,2],[2,4]]', got: JSON.stringify(fn(2)) },
    { pass: JSON.stringify(fn(3)) === '[[1,2,3],[2,4,6],[3,6,9]]', description: 'multiplicationTable(3) returns 3×3 table', got: JSON.stringify(fn(3)) },
    { pass: JSON.stringify(fn(4)) === '[[1,2,3,4],[2,4,6,8],[3,6,9,12],[4,8,12,16]]', description: 'multiplicationTable(4) returns 4×4 table', got: JSON.stringify(fn(4)) },
    { pass: fn(3).length === 3 && fn(3)[0].length === 3, description: 'multiplicationTable(3) has 3 rows and 3 columns', got: fn(3).length + ' rows, ' + (fn(3)[0] ? fn(3)[0].length : 0) + ' cols' },
    { pass: JSON.stringify(fn(5)[4]) === '[5,10,15,20,25]', description: 'multiplicationTable(5) last row is [5,10,15,20,25]', got: JSON.stringify(fn(5)[4]) }
  ];
}`,
    hints: [
      'This is the inverse of flattening — you are building a 2D array. The outer loop creates each row, and the inner loop fills that row with products.',
      'Create an empty `table` array. Outer loop: create a new `row` array, inner loop: push `(i + 1) * (j + 1)` into the row. After the inner loop, push the completed row into the table.',
    ],
    resources: [
      {
        label: 'W3Schools: JavaScript For Loop',
        url: 'https://www.w3schools.com/js/js_loop_for.asp',
        description: 'For loop basics',
      },
      {
        label: 'MDN: Loops and iteration',
        url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Loops_and_iteration',
        description: 'Loop patterns including nested loops',
      },
    ],
  },

  // ── 9. Nested Loops: Common Elements (Combined) ────────────────────────────
  {
    id: 1101,
    title: 'Nested Loops: Common Elements',
    type: 'js',
    tier: 2,
    category: ['js-fundamentals', 'loops'],
    tags: ['nested-loops', 'loops', 'arrays', 'search', 'combined'],
    description:
      'Find elements that appear in both arrays using nested loops.',
    instructions:
      'Write a function called `commonElements` that takes two arrays and returns a new array containing only the elements that appear in both. Use nested loops to compare — do not use `.includes()`, `.indexOf()`, or Set. Assume neither input array contains duplicate values.\n\nExample: `commonElements([1, 2, 3, 4], [3, 4, 5, 6])` returns `[3, 4]`.\n\nExample: `commonElements([1, 2], [3, 4])` returns `[]`.',
    starterCode:
      '// Find elements common to both arrays using nested loops\n// Do not use .includes(), .indexOf(), or Set\nfunction commonElements(arr1, arr2) {\n\n}\n',
    solution:
      'function commonElements(arr1, arr2) {\n  const result = [];\n  for (let i = 0; i < arr1.length; i++) {\n    for (let j = 0; j < arr2.length; j++) {\n      if (arr1[i] === arr2[j]) {\n        result.push(arr1[i]);\n        break;\n      }\n    }\n  }\n  return result;\n}',
    testRunner: `(code) => {
  const fn = new Function(code + '; return commonElements;')();
  return [
    { pass: JSON.stringify(fn([1,2,3,4], [3,4,5,6])) === '[3,4]', description: 'commonElements([1,2,3,4], [3,4,5,6]) returns [3,4]', got: JSON.stringify(fn([1,2,3,4], [3,4,5,6])) },
    { pass: JSON.stringify(fn(['a','b','c'], ['c','d','e'])) === '["c"]', description: 'commonElements(["a","b","c"], ["c","d","e"]) returns ["c"]', got: JSON.stringify(fn(['a','b','c'], ['c','d','e'])) },
    { pass: JSON.stringify(fn([1,2], [3,4])) === '[]', description: 'commonElements returns [] when no elements match', got: JSON.stringify(fn([1,2], [3,4])) },
    { pass: JSON.stringify(fn([10,20,30], [10,20,30])) === '[10,20,30]', description: 'commonElements returns all when arrays are identical', got: JSON.stringify(fn([10,20,30], [10,20,30])) },
    { pass: JSON.stringify(fn([], [1,2,3])) === '[]', description: 'commonElements returns [] when first array is empty', got: JSON.stringify(fn([], [1,2,3])) },
    { pass: JSON.stringify(fn([1,2,3], [])) === '[]', description: 'commonElements returns [] when second array is empty', got: JSON.stringify(fn([1,2,3], [])) },
    { pass: JSON.stringify(fn([5,10,15,20], [15,5])) === '[5,15]', description: 'commonElements preserves order from first array', got: JSON.stringify(fn([5,10,15,20], [15,5])) }
  ];
}`,
    hints: [
      'For each element in the first array, loop through the entire second array looking for a match. If you find one, add it to the result and `break` out of the inner loop.',
      'Outer loop over `arr1`, inner loop over `arr2`. When `arr1[i] === arr2[j]`, push `arr1[i]` to results and `break`. The `break` stops the inner loop since you already found the match.',
    ],
    resources: [
      {
        label: 'W3Schools: JavaScript For Loop',
        url: 'https://www.w3schools.com/js/js_loop_for.asp',
        description: 'For loop basics',
      },
      {
        label: 'MDN: Loops and iteration',
        url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Loops_and_iteration',
        description: 'Loop patterns including nested loops',
      },
    ],
  },

  // ── 10. Nested Loops: Pyramid (Combined) ───────────────────────────────────
  {
    id: 1102,
    title: 'Nested Loops: Pyramid',
    type: 'js',
    tier: 2,
    category: ['js-fundamentals', 'loops'],
    tags: ['nested-loops', 'loops', 'strings', 'patterns', 'combined'],
    description:
      'Build a centered pyramid of stars as a multi-line string using nested loops.',
    instructions:
      'Write a function called `buildPyramid` that takes a number `n` and returns a centered pyramid of `*` characters as a single string. Each row has leading spaces to center the stars. Row 1 has 1 star, row 2 has 3 stars, row 3 has 5 stars, and so on (increasing by 2). Separate rows with `\\n`. Do not add a trailing newline.\n\nFor each row `i` (starting at 0): spaces = `n - i - 1`, stars = `2 * i + 1`.\n\nExample: `buildPyramid(3)` returns `"  *\\n ***\\n*****"` which displays as:\n```\n  *\n ***\n*****\n```\n\nExample: `buildPyramid(1)` returns `"*"`.',
    starterCode:
      '// Build a centered pyramid of * characters as a multi-line string\n// Each row: (n - i - 1) spaces followed by (2 * i + 1) stars\n// Separate rows with \\n — do not add a trailing newline\nfunction buildPyramid(n) {\n\n}\n',
    solution:
      "function buildPyramid(n) {\n  let result = '';\n  for (let i = 0; i < n; i++) {\n    for (let j = 0; j < n - i - 1; j++) {\n      result += ' ';\n    }\n    for (let j = 0; j < 2 * i + 1; j++) {\n      result += '*';\n    }\n    if (i < n - 1) {\n      result += '\\n';\n    }\n  }\n  return result;\n}",
    testRunner: `(code) => {
  const fn = new Function(code + '; return buildPyramid;')();
  return [
    { pass: fn(1) === '*', description: 'buildPyramid(1) returns "*"', got: JSON.stringify(fn(1)) },
    { pass: fn(3) === '  *\\n ***\\n*****', description: 'buildPyramid(3) returns centered 3-row pyramid', got: JSON.stringify(fn(3)) },
    { pass: fn(4) === '   *\\n  ***\\n *****\\n*******', description: 'buildPyramid(4) returns centered 4-row pyramid', got: JSON.stringify(fn(4)) },
    { pass: fn(5) === '    *\\n   ***\\n  *****\\n *******\\n*********', description: 'buildPyramid(5) returns centered 5-row pyramid', got: JSON.stringify(fn(5)) },
    { pass: fn(2) === ' *\\n***', description: 'buildPyramid(2) returns " *\\n***"', got: JSON.stringify(fn(2)) },
    { pass: !fn(4).endsWith('\\n'), description: 'buildPyramid(4) does not end with a trailing newline', got: JSON.stringify(fn(4).slice(-3)) }
  ];
}`,
    hints: [
      'Each row needs two things: leading spaces to center it, then an odd number of stars. On row `i`, you need `n - i - 1` spaces and `2 * i + 1` stars. This is the same structure as Reverse Triangle but with a different star count formula.',
      'Outer loop: `for (let i = 0; i < n; i++)`. First inner loop adds `n - i - 1` space characters. Second inner loop adds `2 * i + 1` star characters. Append `\\n` after each row except the last.',
    ],
    resources: [
      {
        label: 'W3Schools: JavaScript For Loop',
        url: 'https://www.w3schools.com/js/js_loop_for.asp',
        description: 'For loop basics',
      },
      {
        label: 'MDN: Loops and iteration',
        url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Loops_and_iteration',
        description: 'Loop patterns including nested loops',
      },
    ],
  },
];

// ─── Validation ──────────────────────────────────────────────────────────────

function validate() {
  let allPassed = true;
  for (const ex of exercises) {
    process.stdout.write(`  [${ex.id}] ${ex.title} ... `);
    try {
      // Build the test runner function
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

  console.log(`\nT2 Nested Loops — ${exercises.length} exercises\n`);
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

  // Read existing curriculum
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

  // Append exercises
  curriculum.exercises.push(...exercises);

  // Write back
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
