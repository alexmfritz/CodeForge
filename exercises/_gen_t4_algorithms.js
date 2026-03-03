#!/usr/bin/env node
/**
 * Generator: T4 Algorithms — Section 7 (8 exercises, IDs 1365-1372)
 *
 * Covers: Binary Search, Bubble Sort, Insertion Sort, Merge Sort,
 *         Quick Sort, Frequency Counter, Two Pointers, Sliding Window
 *
 * T4 convention: description-only, NO starterCode. Student writes everything
 * from scratch including function declaration. Description tells them the
 * function name and expected behavior.
 *
 * Usage:
 *   node exercises/_gen_t4_algorithms.js            # Append to curriculum
 *   node exercises/_gen_t4_algorithms.js --validate  # Validate testRunners only
 */

const fs = require('fs');
const path = require('path');

const CURRICULUM_PATH = path.join(
  __dirname,
  'collections',
  'default-curriculum.json'
);

// ─── Resources (MDN only for T4) ────────────────────────────────────────────

const binarySearchRes = [
  { label: 'MDN: Array', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array', description: 'Array reference' },
  { label: 'MDN: Math.floor', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/floor', description: 'Math.floor reference' },
];
const bubbleSortRes = [
  { label: 'MDN: Array', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array', description: 'Array reference' },
  { label: 'MDN: Expressions and operators', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Expressions_and_operators', description: 'Operators reference' },
];
const insertionSortRes = [
  { label: 'MDN: Array.prototype.splice', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice', description: 'Array splice reference' },
  { label: 'MDN: Array', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array', description: 'Array reference' },
];
const mergeSortRes = [
  { label: 'MDN: Array.prototype.slice', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice', description: 'Array slice reference' },
  { label: 'MDN: Functions', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions', description: 'Functions and recursion' },
];
const quickSortRes = [
  { label: 'MDN: Array.prototype.push', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/push', description: 'Array push reference' },
  { label: 'MDN: Array.prototype.concat', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/concat', description: 'Array concat reference' },
];
const frequencyRes = [
  { label: 'MDN: Object', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object', description: 'Object reference' },
  { label: 'MDN: Array.prototype.forEach', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach', description: 'Array forEach reference' },
];
const twoPointerRes = [
  { label: 'MDN: Array', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array', description: 'Array reference' },
  { label: 'MDN: while', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/while', description: 'While loop reference' },
];
const slidingWindowRes = [
  { label: 'MDN: Array.prototype.slice', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice', description: 'Array slice reference' },
  { label: 'MDN: Math.max', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/max', description: 'Math.max reference' },
];

// ─── Exercise Definitions ───────────────────────────────────────────────────

const exercises = [

  // ══════════════════════════════════════════════════════════════════════════
  // T4 Section 7: Algorithms (8 exercises, IDs 1365-1372)
  // ══════════════════════════════════════════════════════════════════════════

  // 1. Binary Search
  {
    id: 1365,
    title: 'Binary Search',
    type: 'js',
    tier: 4,
    category: ['algorithms', 'searching'],
    tags: ['binary-search', 'divide-and-conquer', 'sorted-array', 'searching', 'algorithm'],
    description:
      'Create a function called `binarySearch` that takes a sorted array of numbers and a target value. It should find the target by repeatedly dividing the search space in half. Return the index of the target if found, or `-1` if the target is not in the array. Start with two pointers at the beginning and end of the array. Calculate the middle index, then compare the middle element to the target: if it matches, return the index; if the target is smaller, search the left half; if the target is larger, search the right half. Continue until the pointers cross.',
    starterCode: '',
    solution:
      'function binarySearch(arr, target) {\n  var left = 0;\n  var right = arr.length - 1;\n  while (left <= right) {\n    var mid = Math.floor((left + right) / 2);\n    if (arr[mid] === target) return mid;\n    if (target < arr[mid]) {\n      right = mid - 1;\n    } else {\n      left = mid + 1;\n    }\n  }\n  return -1;\n}',
    testRunner: `(code) => {
  var fn = new Function(code + '; return binarySearch;')();
  var results = [];

  results.push({ pass: fn([1, 3, 5, 7, 9, 11], 7) === 3, description: 'Finds 7 at index 3 in [1,3,5,7,9,11]', got: String(fn([1, 3, 5, 7, 9, 11], 7)) });

  results.push({ pass: fn([1, 3, 5, 7, 9, 11], 1) === 0, description: 'Finds first element 1 at index 0', got: String(fn([1, 3, 5, 7, 9, 11], 1)) });

  results.push({ pass: fn([1, 3, 5, 7, 9, 11], 11) === 5, description: 'Finds last element 11 at index 5', got: String(fn([1, 3, 5, 7, 9, 11], 11)) });

  results.push({ pass: fn([1, 3, 5, 7, 9, 11], 6) === -1, description: 'Returns -1 for missing value 6', got: String(fn([1, 3, 5, 7, 9, 11], 6)) });

  results.push({ pass: fn([], 5) === -1, description: 'Returns -1 for empty array', got: String(fn([], 5)) });

  results.push({ pass: fn([42], 42) === 0, description: 'Finds element in single-item array at index 0', got: String(fn([42], 42)) });

  results.push({ pass: fn([42], 10) === -1, description: 'Returns -1 for missing value in single-item array', got: String(fn([42], 10)) });

  var big = []; for (var i = 0; i < 1000; i++) big.push(i * 2);
  results.push({ pass: fn(big, 500) === 250 && fn(big, 999) === -1, description: 'Works on large array (1000 items): finds 500 at 250, misses 999', got: 'find500=' + fn(big, 500) + ', find999=' + fn(big, 999) });

  return results;
}`,
    hint1:
      'Use two variables to track the current search boundaries — one for the left end and one for the right end. On each iteration, look at the element in the middle. If it matches, you are done. If the target is smaller, move the right boundary to just before the middle. If larger, move the left boundary to just after the middle.',
    hint2:
      'Initialize `left = 0` and `right = arr.length - 1`. Loop while `left <= right`. Compute `mid = Math.floor((left + right) / 2)`. If `arr[mid] === target`, return `mid`. If `target < arr[mid]`, set `right = mid - 1`. Otherwise set `left = mid + 1`. If the loop ends without finding, return -1.',
    resources: binarySearchRes,
  },

  // 2. Bubble Sort
  {
    id: 1366,
    title: 'Bubble Sort',
    type: 'js',
    tier: 4,
    category: ['algorithms', 'sorting'],
    tags: ['bubble-sort', 'sorting', 'swap', 'comparison', 'algorithm'],
    description:
      'Create a function called `bubbleSort` that takes an array of numbers and returns a new sorted array in ascending order. Bubble sort works by repeatedly stepping through the array, comparing adjacent elements, and swapping them if they are in the wrong order. After each full pass, the largest unsorted element "bubbles" to its correct position. Include an optimization: if a complete pass makes no swaps, the array is already sorted and you can stop early. Do not modify the original array.',
    starterCode: '',
    solution:
      'function bubbleSort(arr) {\n  var result = arr.slice();\n  var n = result.length;\n  for (var i = 0; i < n - 1; i++) {\n    var swapped = false;\n    for (var j = 0; j < n - 1 - i; j++) {\n      if (result[j] > result[j + 1]) {\n        var temp = result[j];\n        result[j] = result[j + 1];\n        result[j + 1] = temp;\n        swapped = true;\n      }\n    }\n    if (!swapped) break;\n  }\n  return result;\n}',
    testRunner: `(code) => {
  var fn = new Function(code + '; return bubbleSort;')();
  var results = [];

  results.push({ pass: JSON.stringify(fn([5, 3, 8, 1, 2])) === '[1,2,3,5,8]', description: 'Sorts [5,3,8,1,2] to [1,2,3,5,8]', got: JSON.stringify(fn([5, 3, 8, 1, 2])) });

  results.push({ pass: JSON.stringify(fn([1, 2, 3, 4, 5])) === '[1,2,3,4,5]', description: 'Already sorted array stays [1,2,3,4,5]', got: JSON.stringify(fn([1, 2, 3, 4, 5])) });

  results.push({ pass: JSON.stringify(fn([5, 4, 3, 2, 1])) === '[1,2,3,5,4]'.replace('5,4', '4,5'), description: 'Reverse sorted [5,4,3,2,1] becomes [1,2,3,4,5]', got: JSON.stringify(fn([5, 4, 3, 2, 1])) });

  results.push({ pass: JSON.stringify(fn([42])) === '[42]', description: 'Single element [42] returns [42]', got: JSON.stringify(fn([42])) });

  results.push({ pass: JSON.stringify(fn([])) === '[]', description: 'Empty array returns []', got: JSON.stringify(fn([])) });

  results.push({ pass: JSON.stringify(fn([3, 3, 1, 1, 2])) === '[1,1,2,3,3]', description: 'Handles duplicates: [3,3,1,1,2] becomes [1,1,2,3,3]', got: JSON.stringify(fn([3, 3, 1, 1, 2])) });

  results.push({ pass: JSON.stringify(fn([-5, 0, 3, -2, 7])) === '[-5,-2,0,3,7]', description: 'Handles negative numbers: [-5,0,3,-2,7] becomes [-5,-2,0,3,7]', got: JSON.stringify(fn([-5, 0, 3, -2, 7])) });

  var original = [5, 3, 1];
  fn(original);
  results.push({ pass: JSON.stringify(original) === '[5,3,1]', description: 'Does not modify the original array', got: JSON.stringify(original) });

  return results;
}`,
    hint1:
      'Make a copy of the input array first. Use two nested loops — the outer loop tracks how many passes you have made, and the inner loop compares each pair of adjacent elements. If the left element is larger than the right, swap them. Track whether any swap occurred during a pass to enable early exit.',
    hint2:
      'Copy with `arr.slice()`. Outer loop runs `n - 1` times. Inner loop runs from `0` to `n - 1 - i` (each pass puts one more element in place). Swap with a temp variable when `result[j] > result[j + 1]`. Set a `swapped` flag; if it is still `false` after a full inner pass, break out of the outer loop.',
    resources: bubbleSortRes,
  },

  // 3. Insertion Sort
  {
    id: 1367,
    title: 'Insertion Sort',
    type: 'js',
    tier: 4,
    category: ['algorithms', 'sorting'],
    tags: ['insertion-sort', 'sorting', 'in-place', 'stable', 'algorithm'],
    description:
      'Create a function called `insertionSort` that takes an array of numbers and returns a new sorted array in ascending order. Insertion sort works by building a sorted portion one element at a time. Start from the second element and compare it backward against the sorted portion. Shift larger elements to the right to make room, then insert the current element in its correct position. Do not modify the original array.',
    starterCode: '',
    solution:
      'function insertionSort(arr) {\n  var result = arr.slice();\n  for (var i = 1; i < result.length; i++) {\n    var current = result[i];\n    var j = i - 1;\n    while (j >= 0 && result[j] > current) {\n      result[j + 1] = result[j];\n      j--;\n    }\n    result[j + 1] = current;\n  }\n  return result;\n}',
    testRunner: `(code) => {
  var fn = new Function(code + '; return insertionSort;')();
  var results = [];

  results.push({ pass: JSON.stringify(fn([5, 3, 8, 1, 2])) === '[1,2,3,5,8]', description: 'Sorts [5,3,8,1,2] to [1,2,3,5,8]', got: JSON.stringify(fn([5, 3, 8, 1, 2])) });

  results.push({ pass: JSON.stringify(fn([1, 2, 3, 4, 5])) === '[1,2,3,4,5]', description: 'Already sorted array stays [1,2,3,4,5]', got: JSON.stringify(fn([1, 2, 3, 4, 5])) });

  results.push({ pass: JSON.stringify(fn([5, 4, 3, 2, 1])) === '[1,2,3,4,5]', description: 'Reverse sorted [5,4,3,2,1] becomes [1,2,3,4,5]', got: JSON.stringify(fn([5, 4, 3, 2, 1])) });

  results.push({ pass: JSON.stringify(fn([42])) === '[42]', description: 'Single element [42] returns [42]', got: JSON.stringify(fn([42])) });

  results.push({ pass: JSON.stringify(fn([])) === '[]', description: 'Empty array returns []', got: JSON.stringify(fn([])) });

  results.push({ pass: JSON.stringify(fn([4, 4, 2, 2, 1])) === '[1,2,2,4,4]', description: 'Handles duplicates: [4,4,2,2,1] becomes [1,2,2,4,4]', got: JSON.stringify(fn([4, 4, 2, 2, 1])) });

  results.push({ pass: JSON.stringify(fn([-3, 10, 0, -1, 5])) === '[-3,-1,0,5,10]', description: 'Handles negatives: [-3,10,0,-1,5] becomes [-3,-1,0,5,10]', got: JSON.stringify(fn([-3, 10, 0, -1, 5])) });

  var original = [3, 1, 2];
  fn(original);
  results.push({ pass: JSON.stringify(original) === '[3,1,2]', description: 'Does not modify the original array', got: JSON.stringify(original) });

  return results;
}`,
    hint1:
      'Think of it like sorting a hand of playing cards. You pick up one card at a time and insert it into the correct position among the cards you have already sorted. Start from index 1, save the current value, then shift elements to the right until you find the insertion point.',
    hint2:
      'Copy the array first. Loop from index 1 to the end. Save `result[i]` as `current`. Use a while loop going backward: while `j >= 0` and `result[j] > current`, shift `result[j]` right by setting `result[j + 1] = result[j]` and decrementing `j`. After the while loop, place `current` at `result[j + 1]`.',
    resources: insertionSortRes,
  },

  // 4. Merge Sort
  {
    id: 1368,
    title: 'Merge Sort',
    type: 'js',
    tier: 4,
    category: ['algorithms', 'sorting'],
    tags: ['merge-sort', 'sorting', 'divide-and-conquer', 'recursion', 'algorithm'],
    description:
      'Create a function called `mergeSort` that takes an array of numbers and returns a new sorted array in ascending order using the merge sort algorithm. Merge sort works by recursively splitting the array in half until each piece has one element, then merging the pieces back together in sorted order. Write a helper function that merges two sorted arrays into one sorted array by comparing their elements one at a time. The base case is an array with 0 or 1 elements (already sorted). Do not modify the original array.',
    starterCode: '',
    solution:
      'function mergeSort(arr) {\n  if (arr.length <= 1) return arr.slice();\n  var mid = Math.floor(arr.length / 2);\n  var left = mergeSort(arr.slice(0, mid));\n  var right = mergeSort(arr.slice(mid));\n  return merge(left, right);\n}\n\nfunction merge(a, b) {\n  var result = [];\n  var i = 0;\n  var j = 0;\n  while (i < a.length && j < b.length) {\n    if (a[i] <= b[j]) {\n      result.push(a[i]);\n      i++;\n    } else {\n      result.push(b[j]);\n      j++;\n    }\n  }\n  while (i < a.length) { result.push(a[i]); i++; }\n  while (j < b.length) { result.push(b[j]); j++; }\n  return result;\n}',
    testRunner: `(code) => {
  var fn = new Function(code + '; return mergeSort;')();
  var results = [];

  results.push({ pass: JSON.stringify(fn([38, 27, 43, 3, 9, 82, 10])) === '[3,9,10,27,38,43,82]', description: 'Sorts [38,27,43,3,9,82,10] to [3,9,10,27,38,43,82]', got: JSON.stringify(fn([38, 27, 43, 3, 9, 82, 10])) });

  results.push({ pass: JSON.stringify(fn([1, 2, 3])) === '[1,2,3]', description: 'Already sorted [1,2,3] stays [1,2,3]', got: JSON.stringify(fn([1, 2, 3])) });

  results.push({ pass: JSON.stringify(fn([3, 2, 1])) === '[1,2,3]', description: 'Reverse sorted [3,2,1] becomes [1,2,3]', got: JSON.stringify(fn([3, 2, 1])) });

  results.push({ pass: JSON.stringify(fn([5])) === '[5]', description: 'Single element [5] returns [5]', got: JSON.stringify(fn([5])) });

  results.push({ pass: JSON.stringify(fn([])) === '[]', description: 'Empty array returns []', got: JSON.stringify(fn([])) });

  results.push({ pass: JSON.stringify(fn([5, 5, 3, 3, 1])) === '[1,3,3,5,5]', description: 'Handles duplicates: [5,5,3,3,1] becomes [1,3,3,5,5]', got: JSON.stringify(fn([5, 5, 3, 3, 1])) });

  results.push({ pass: JSON.stringify(fn([-10, 5, 0, -3, 8])) === '[-10,-3,0,5,8]', description: 'Handles negatives: [-10,5,0,-3,8] becomes [-10,-3,0,5,8]', got: JSON.stringify(fn([-10, 5, 0, -3, 8])) });

  var original = [4, 2, 7];
  fn(original);
  results.push({ pass: JSON.stringify(original) === '[4,2,7]', description: 'Does not modify the original array', got: JSON.stringify(original) });

  return results;
}`,
    hint1:
      'Split the problem into two parts: a recursive function that divides the array in half until the pieces are trivially small, and a merge helper that combines two already-sorted arrays into one sorted array. The merge helper uses two index pointers that advance through each input array.',
    hint2:
      'Base case: if `arr.length <= 1`, return a copy. Otherwise, split at the midpoint with `arr.slice(0, mid)` and `arr.slice(mid)`, recursively sort each half, then merge. The merge function uses pointers `i` and `j` — compare `a[i]` and `b[j]`, push the smaller one, advance that pointer. After one array is exhausted, append the remainder of the other.',
    resources: mergeSortRes,
  },

  // 5. Quick Sort
  {
    id: 1369,
    title: 'Quick Sort',
    type: 'js',
    tier: 4,
    category: ['algorithms', 'sorting'],
    tags: ['quick-sort', 'sorting', 'partition', 'pivot', 'recursion', 'algorithm'],
    description:
      'Create a function called `quickSort` that takes an array of numbers and returns a new sorted array in ascending order using the quicksort algorithm. Pick the first element as the pivot. Partition the remaining elements into two groups: those less than the pivot and those greater than or equal to the pivot. Recursively sort each group, then combine: sorted-less, pivot, sorted-greater. The base case is an array with 0 or 1 elements. Do not modify the original array.',
    starterCode: '',
    solution:
      'function quickSort(arr) {\n  if (arr.length <= 1) return arr.slice();\n  var pivot = arr[0];\n  var less = [];\n  var greater = [];\n  for (var i = 1; i < arr.length; i++) {\n    if (arr[i] < pivot) {\n      less.push(arr[i]);\n    } else {\n      greater.push(arr[i]);\n    }\n  }\n  return quickSort(less).concat([pivot], quickSort(greater));\n}',
    testRunner: `(code) => {
  var fn = new Function(code + '; return quickSort;')();
  var results = [];

  results.push({ pass: JSON.stringify(fn([10, 7, 8, 9, 1, 5])) === '[1,5,7,8,9,10]', description: 'Sorts [10,7,8,9,1,5] to [1,5,7,8,9,10]', got: JSON.stringify(fn([10, 7, 8, 9, 1, 5])) });

  results.push({ pass: JSON.stringify(fn([1, 2, 3, 4])) === '[1,2,3,4]', description: 'Already sorted [1,2,3,4] stays [1,2,3,4]', got: JSON.stringify(fn([1, 2, 3, 4])) });

  results.push({ pass: JSON.stringify(fn([4, 3, 2, 1])) === '[1,2,3,4]', description: 'Reverse sorted [4,3,2,1] becomes [1,2,3,4]', got: JSON.stringify(fn([4, 3, 2, 1])) });

  results.push({ pass: JSON.stringify(fn([99])) === '[99]', description: 'Single element [99] returns [99]', got: JSON.stringify(fn([99])) });

  results.push({ pass: JSON.stringify(fn([])) === '[]', description: 'Empty array returns []', got: JSON.stringify(fn([])) });

  results.push({ pass: JSON.stringify(fn([3, 6, 3, 6, 1])) === '[1,3,3,6,6]', description: 'Handles duplicates: [3,6,3,6,1] becomes [1,3,3,6,6]', got: JSON.stringify(fn([3, 6, 3, 6, 1])) });

  results.push({ pass: JSON.stringify(fn([-2, 5, -8, 0, 3])) === '[-8,-2,0,3,5]', description: 'Handles negatives: [-2,5,-8,0,3] becomes [-8,-2,0,3,5]', got: JSON.stringify(fn([-2, 5, -8, 0, 3])) });

  var original = [6, 2, 9];
  fn(original);
  results.push({ pass: JSON.stringify(original) === '[6,2,9]', description: 'Does not modify the original array', got: JSON.stringify(original) });

  return results;
}`,
    hint1:
      'Choose the first element as your pivot. Loop through the remaining elements and put each one into either a "less than pivot" group or a "greater than or equal to pivot" group. Recursively sort both groups, then concatenate: sorted-less + pivot + sorted-greater.',
    hint2:
      'Base case: if `arr.length <= 1`, return a copy. Set `pivot = arr[0]`. Loop from index 1 to end, pushing elements less than pivot into a `less` array and the rest into a `greater` array. Return `quickSort(less).concat([pivot], quickSort(greater))`.',
    resources: quickSortRes,
  },

  // 6. Frequency Counter
  {
    id: 1370,
    title: 'Frequency Counter',
    type: 'js',
    tier: 4,
    category: ['algorithms', 'patterns'],
    tags: ['frequency-counter', 'hash-map', 'pattern', 'counting', 'algorithm'],
    description:
      'Create a function called `findPairSum` that takes an array of numbers and a target sum. Return the first pair of numbers (as a two-element array `[a, b]`) where `a + b` equals the target, or `null` if no pair exists. Use the frequency counter (hash map) pattern: as you iterate through the array, store each number you have seen. For each new number, check if the complement (target minus current number) has already been seen. This approach finds the pair in a single pass through the array. Return the pair in the order they appear (the complement first, then the current number).',
    starterCode: '',
    solution:
      'function findPairSum(arr, target) {\n  var seen = {};\n  for (var i = 0; i < arr.length; i++) {\n    var complement = target - arr[i];\n    if (seen[complement] !== undefined) {\n      return [complement, arr[i]];\n    }\n    seen[arr[i]] = true;\n  }\n  return null;\n}',
    testRunner: `(code) => {
  var fn = new Function(code + '; return findPairSum;')();
  var results = [];

  results.push({ pass: JSON.stringify(fn([2, 7, 11, 15], 9)) === '[2,7]', description: 'Finds pair [2,7] for target 9 in [2,7,11,15]', got: JSON.stringify(fn([2, 7, 11, 15], 9)) });

  results.push({ pass: JSON.stringify(fn([3, 5, -4, 8, 11, 1, -1, 6], 10)) === '[11,-1]', description: 'Finds [11,-1] for target 10 in mixed array', got: JSON.stringify(fn([3, 5, -4, 8, 11, 1, -1, 6], 10)) });

  results.push({ pass: fn([1, 2, 3], 10) === null, description: 'Returns null when no pair sums to target', got: String(fn([1, 2, 3], 10)) });

  results.push({ pass: fn([], 5) === null, description: 'Returns null for empty array', got: String(fn([], 5)) });

  results.push({ pass: JSON.stringify(fn([5, 5, 3], 10)) === '[5,5]', description: 'Finds [5,5] for target 10 with duplicates', got: JSON.stringify(fn([5, 5, 3], 10)) });

  results.push({ pass: JSON.stringify(fn([1, 4, 3, 2], 5)) === '[1,4]', description: 'Returns first valid pair [1,4] not later pair [3,2]', got: JSON.stringify(fn([1, 4, 3, 2], 5)) });

  results.push({ pass: JSON.stringify(fn([-3, 4, 3, 90], 0)) === '[-3,3]', description: 'Handles negative+positive pair: [-3,3] sums to 0', got: JSON.stringify(fn([-3, 4, 3, 90], 0)) });

  results.push({ pass: JSON.stringify(fn([0, 0, 0], 0)) === '[0,0]', description: 'Handles zeros: [0,0] sums to 0', got: JSON.stringify(fn([0, 0, 0], 0)) });

  return results;
}`,
    hint1:
      'Instead of using nested loops to check every pair, use an object as a lookup table. For each number, calculate what value you would need to reach the target sum. If that needed value is already in your lookup table, you have found your pair. Otherwise, add the current number to the table and continue.',
    hint2:
      'Create a `seen` object. Loop through the array. For each element, compute `complement = target - arr[i]`. Check if `seen[complement]` exists — if so, return `[complement, arr[i]]`. If not, set `seen[arr[i]] = true` and continue. Return `null` after the loop if no pair was found.',
    resources: frequencyRes,
  },

  // 7. Two Pointers
  {
    id: 1371,
    title: 'Two Pointer Technique',
    type: 'js',
    tier: 4,
    category: ['algorithms', 'patterns'],
    tags: ['two-pointers', 'sorted-array', 'pattern', 'optimization', 'algorithm'],
    description:
      'Create a function called `threeSum` that takes a sorted array of numbers and a target sum. Find all unique triplets `[a, b, c]` where `a + b + c` equals the target. Return an array of triplets (each triplet is a three-element array). There should be no duplicate triplets in the result. Use the two-pointer technique: for each element, set a left pointer just after it and a right pointer at the end, then move them inward based on whether the current sum is too small or too large. Skip duplicate values to avoid duplicate triplets.',
    starterCode: '',
    solution:
      'function threeSum(arr, target) {\n  var results = [];\n  for (var i = 0; i < arr.length - 2; i++) {\n    if (i > 0 && arr[i] === arr[i - 1]) continue;\n    var left = i + 1;\n    var right = arr.length - 1;\n    while (left < right) {\n      var sum = arr[i] + arr[left] + arr[right];\n      if (sum === target) {\n        results.push([arr[i], arr[left], arr[right]]);\n        while (left < right && arr[left] === arr[left + 1]) left++;\n        while (left < right && arr[right] === arr[right - 1]) right--;\n        left++;\n        right--;\n      } else if (sum < target) {\n        left++;\n      } else {\n        right--;\n      }\n    }\n  }\n  return results;\n}',
    testRunner: `(code) => {
  var fn = new Function(code + '; return threeSum;')();
  var results = [];

  var r1 = fn([-4, -1, -1, 0, 1, 2], 0);
  results.push({ pass: JSON.stringify(r1) === '[[-1,-1,2],[-1,0,1]]', description: 'Finds [[-1,-1,2],[-1,0,1]] for target 0', got: JSON.stringify(r1) });

  var r2 = fn([1, 2, 3, 4, 5], 9);
  results.push({ pass: JSON.stringify(r2) === '[[1,3,5],[2,3,4]]', description: 'Finds [[1,3,5],[2,3,4]] for target 9', got: JSON.stringify(r2) });

  var r3 = fn([0, 0, 0, 0], 0);
  results.push({ pass: JSON.stringify(r3) === '[[0,0,0]]', description: 'Finds [[0,0,0]] with duplicates, no duplicate triplets', got: JSON.stringify(r3) });

  var r4 = fn([1, 2, 3], 10);
  results.push({ pass: JSON.stringify(r4) === '[]', description: 'Returns [] when no triplet sums to target', got: JSON.stringify(r4) });

  var r5 = fn([], 0);
  results.push({ pass: JSON.stringify(r5) === '[]', description: 'Returns [] for empty array', got: JSON.stringify(r5) });

  var r6 = fn([-2, -1, 0, 1, 2, 3], 0);
  results.push({ pass: JSON.stringify(r6) === '[[-2,-1,3],[-2,0,2],[-1,0,1]]', description: 'Finds 3 triplets for target 0 in [-2,-1,0,1,2,3]', got: JSON.stringify(r6) });

  var r7 = fn([1, 1, 1, 1], 3);
  results.push({ pass: JSON.stringify(r7) === '[[1,1,1]]', description: 'Handles all same values: [[1,1,1]] for target 3', got: JSON.stringify(r7) });

  var r8 = fn([-5, -3, -1, 0, 2, 4, 6], 0);
  results.push({ pass: r8.length === 2 && r8.every(function(t) { return t[0] + t[1] + t[2] === 0; }), description: 'Finds 2 triplets summing to 0 in [-5,-3,-1,0,2,4,6]', got: JSON.stringify(r8) });

  return results;
}`,
    hint1:
      'Fix one element at a time, then use two pointers on the remaining subarray to find pairs that complete the target sum. Since the array is sorted, if the current sum is too small move the left pointer right (to increase the sum), if too large move the right pointer left (to decrease it). Skip over duplicate values to avoid duplicate triplets.',
    hint2:
      'Loop `i` from 0 to `arr.length - 2`. Skip if `arr[i] === arr[i-1]` (avoid duplicate first elements). Set `left = i + 1` and `right = arr.length - 1`. While `left < right`: compute sum. If equal to target, push the triplet and skip duplicates by advancing both pointers past repeated values. If sum is too small, increment left. If too large, decrement right.',
    resources: twoPointerRes,
  },

  // 8. Sliding Window
  {
    id: 1372,
    title: 'Sliding Window',
    type: 'js',
    tier: 4,
    category: ['algorithms', 'patterns'],
    tags: ['sliding-window', 'subarray', 'optimization', 'pattern', 'algorithm'],
    description:
      'Create a function called `maxSubarraySum` that takes an array of numbers and a positive integer `k`. Find the maximum sum of any contiguous subarray of exactly `k` elements. Return the maximum sum, or `null` if the array has fewer than `k` elements. Use the sliding window technique: calculate the sum of the first `k` elements, then slide the window one position at a time by adding the next element and removing the element that fell off the left side. Track the maximum sum seen.',
    starterCode: '',
    solution:
      'function maxSubarraySum(arr, k) {\n  if (arr.length < k) return null;\n  var windowSum = 0;\n  for (var i = 0; i < k; i++) {\n    windowSum += arr[i];\n  }\n  var maxSum = windowSum;\n  for (var i = k; i < arr.length; i++) {\n    windowSum = windowSum + arr[i] - arr[i - k];\n    if (windowSum > maxSum) maxSum = windowSum;\n  }\n  return maxSum;\n}',
    testRunner: `(code) => {
  var fn = new Function(code + '; return maxSubarraySum;')();
  var results = [];

  results.push({ pass: fn([1, 4, 2, 10, 2, 3, 1, 0, 20], 4) === 24, description: 'Max sum of 4 consecutive in [1,4,2,10,2,3,1,0,20] is 24 (3+1+0+20)', got: String(fn([1, 4, 2, 10, 2, 3, 1, 0, 20], 4)) });

  results.push({ pass: fn([2, 3], 3) === null, description: 'Returns null when array length < k', got: String(fn([2, 3], 3)) });

  results.push({ pass: fn([5, 2, 6, 9], 2) === 15, description: 'Max sum of 2 consecutive in [5,2,6,9] is 15 (6+9)', got: String(fn([5, 2, 6, 9], 2)) });

  results.push({ pass: fn([1, 2, 3, 4, 5], 5) === 15, description: 'Window equals entire array: sum is 15', got: String(fn([1, 2, 3, 4, 5], 5)) });

  results.push({ pass: fn([10], 1) === 10, description: 'Single element with k=1 returns that element', got: String(fn([10], 1)) });

  results.push({ pass: fn([-1, -2, -3, -4], 2) === -3, description: 'All negatives: max sum of 2 is -3 (-1+-2)', got: String(fn([-1, -2, -3, -4], 2)) });

  results.push({ pass: fn([4, -1, 2, 1, 6, -5, 3], 3) === 9, description: 'Mixed values: max sum of 3 in [4,-1,2,1,6,-5,3] is 9 (2+1+6)', got: String(fn([4, -1, 2, 1, 6, -5, 3], 3)) });

  results.push({ pass: fn([], 1) === null, description: 'Empty array returns null', got: String(fn([], 1)) });

  return results;
}`,
    hint1:
      'Instead of recalculating the sum of every subarray from scratch, compute the first window\'s sum, then "slide" the window forward: add the new element entering the window and subtract the element leaving. This turns a nested-loop problem into a single-pass solution. Track the maximum sum as you slide.',
    hint2:
      'First check if `arr.length < k` and return null. Compute the initial window sum by looping from 0 to k-1. Set `maxSum = windowSum`. Then loop from `i = k` to end: update `windowSum = windowSum + arr[i] - arr[i - k]` and update `maxSum` if the new sum is larger. Return `maxSum`.',
    resources: slidingWindowRes,
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
    `T4 Algorithms — Section 7: ${exercises.length} exercises (IDs ${exercises[0].id}-${exercises[exercises.length - 1].id})`
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
