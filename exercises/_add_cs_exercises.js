#!/usr/bin/env node
/**
 * Add CS Exercises: Recursion, Selection Sort, Doubly Linked List, Binary Heap
 * Inserts 10 new exercises into default-curriculum.json at correct tier positions.
 *
 * Distribution: 2 T3 (recursion intro), 5 T4, 3 T5
 * New IDs: 535-544
 *
 * Run: node exercises/_add_cs_exercises.js
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CURRICULUM_PATH = path.join(__dirname, 'collections', 'default-curriculum.json');
const data = JSON.parse(fs.readFileSync(CURRICULUM_PATH, 'utf-8'));

// ── New Exercises ──

const newExercises = [

  // ════════════════════════════════════════
  // T3: Recursion Introduction (2 exercises)
  // ════════════════════════════════════════

  {
    id: 535,
    title: 'Recursive Product of Array',
    type: 'js',
    tier: 3,
    category: ['functions', 'recursion'],
    tags: ['recursion', 'base-case', 'arrays', 'math'],
    description: 'Create a function called `productOfArray` that accepts an array of numbers and returns the product of all numbers in the array using recursion. Do not use loops. The function should handle the base case of an empty array (returning 1) and multiply the first element by the recursive result of the remaining elements.',
    instructions: 'Create a function called `productOfArray` that accepts an array of numbers and returns the product of all numbers using recursion.\n\nRules:\n- Do not use any loops (`for`, `while`, `do...while`)\n- Use recursion: the function must call itself\n- An empty array should return `1` (the multiplicative identity)\n\nExamples:\n  productOfArray([1, 2, 3]) → 6\n  productOfArray([1, 2, 3, 10]) → 60\n  productOfArray([0, 5, 10]) → 0\n  productOfArray([]) → 1',
    starterCode: '/**\n * Return the product of all numbers in an array using recursion.\n * Do not use loops.\n *\n * @param {number[]} arr - array of numbers\n * @returns {number} product of all elements (1 for empty array)\n */\nfunction productOfArray(arr) {\n\n}',
    solution: 'function productOfArray(arr) {\n  if (arr.length === 0) return 1;\n  return arr[0] * productOfArray(arr.slice(1));\n}',
    testRunner: `(code) => {
  var fn = new Function(code + '; return productOfArray;')();
  var results = [];

  results.push({ pass: fn([1, 2, 3]) === 6, description: 'productOfArray([1,2,3]) returns 6 (1*2*3)', got: String(fn([1, 2, 3])) });

  results.push({ pass: fn([1, 2, 3, 10]) === 60, description: 'productOfArray([1,2,3,10]) returns 60', got: String(fn([1, 2, 3, 10])) });

  results.push({ pass: fn([0, 5, 10]) === 0, description: 'productOfArray([0,5,10]) returns 0 (zero in array)', got: String(fn([0, 5, 10])) });

  results.push({ pass: fn([]) === 1, description: 'Empty array returns 1 (multiplicative identity)', got: String(fn([])) });

  results.push({ pass: fn([5]) === 5, description: 'Single element [5] returns 5', got: String(fn([5])) });

  results.push({ pass: fn([2, 2, 2, 2]) === 16, description: 'productOfArray([2,2,2,2]) returns 16', got: String(fn([2, 2, 2, 2])) });

  results.push({ pass: fn([-1, 2, 3]) === -6, description: 'Handles negative numbers: [-1,2,3] returns -6', got: String(fn([-1, 2, 3])) });

  results.push({ pass: fn([10, 10, 10]) === 1000, description: 'productOfArray([10,10,10]) returns 1000', got: String(fn([10, 10, 10])) });

  return results;
}`,
    testCases: [],
    hints: [
      'Every recursive function needs a base case (when to stop) and a recursive case (when to call itself again). What should happen when the array is empty?',
      'Multiply the first element `arr[0]` by the result of calling the function on the rest of the array. Use `arr.slice(1)` to get everything after the first element.'
    ],
    resources: [
      { label: 'MDN: Recursion', url: 'https://developer.mozilla.org/en-US/docs/Glossary/Recursion', description: 'What is recursion?' },
      { label: 'MDN: Array.prototype.slice()', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice', description: 'Create a sub-array without modifying the original' }
    ],
    solutionGate: 8,
    basePoints: 50,
  },

  {
    id: 536,
    title: 'Recursive Linear Search',
    type: 'js',
    tier: 3,
    category: ['functions', 'recursion'],
    tags: ['recursion', 'searching', 'arrays', 'base-case'],
    description: 'Create a function called `recursiveSearch` that accepts an array and a target value. It should search the array for the target using recursion (no loops) and return the index where the target is found, or `-1` if not found. Use an optional parameter to track the current index.',
    instructions: 'Create a function called `recursiveSearch` that accepts an array and a target value and returns the index of the target using recursion.\n\nRules:\n- Do not use any loops\n- Do not use `indexOf`, `findIndex`, or `includes`\n- The function must call itself to check each element\n- Return `-1` if the target is not in the array\n\nExamples:\n  recursiveSearch([1, 2, 3, 4, 5], 3) → 2\n  recursiveSearch([1, 2, 3, 4, 5], 6) → -1\n  recursiveSearch(["a", "b", "c"], "b") → 1\n  recursiveSearch([], 1) → -1',
    starterCode: '/**\n * Search an array for a target value using recursion.\n * Return the index if found, or -1 if not found.\n *\n * @param {Array} arr - array to search\n * @param {*} target - value to find\n * @param {number} [idx=0] - current index (used in recursive calls)\n * @returns {number} index of target, or -1\n */\nfunction recursiveSearch(arr, target, idx) {\n\n}',
    solution: 'function recursiveSearch(arr, target, idx) {\n  if (idx === undefined) idx = 0;\n  if (idx >= arr.length) return -1;\n  if (arr[idx] === target) return idx;\n  return recursiveSearch(arr, target, idx + 1);\n}',
    testRunner: `(code) => {
  var fn = new Function(code + '; return recursiveSearch;')();
  var results = [];

  results.push({ pass: fn([1, 2, 3, 4, 5], 3) === 2, description: 'Finds 3 at index 2 in [1,2,3,4,5]', got: String(fn([1, 2, 3, 4, 5], 3)) });

  results.push({ pass: fn([1, 2, 3, 4, 5], 6) === -1, description: 'Returns -1 for missing value 6', got: String(fn([1, 2, 3, 4, 5], 6)) });

  results.push({ pass: fn([1, 2, 3, 4, 5], 1) === 0, description: 'Finds first element at index 0', got: String(fn([1, 2, 3, 4, 5], 1)) });

  results.push({ pass: fn([1, 2, 3, 4, 5], 5) === 4, description: 'Finds last element at index 4', got: String(fn([1, 2, 3, 4, 5], 5)) });

  results.push({ pass: fn([], 1) === -1, description: 'Returns -1 for empty array', got: String(fn([], 1)) });

  results.push({ pass: fn(["a", "b", "c"], "b") === 1, description: 'Works with strings: finds "b" at index 1', got: String(fn(["a", "b", "c"], "b")) });

  results.push({ pass: fn([10, 20, 30, 40], 30) === 2, description: 'Finds 30 at index 2', got: String(fn([10, 20, 30, 40], 30)) });

  results.push({ pass: fn([5, 5, 5], 5) === 0, description: 'Returns first occurrence index for duplicates', got: String(fn([5, 5, 5], 5)) });

  return results;
}`,
    testCases: [],
    hints: [
      'You need two base cases: one for when you have searched past the end of the array, and one for when you find a match at the current index.',
      'Use a third parameter `idx` that starts at 0. If `arr[idx] === target`, return `idx`. If `idx >= arr.length`, return -1. Otherwise, call the function again with `idx + 1`.'
    ],
    resources: [
      { label: 'MDN: Recursion', url: 'https://developer.mozilla.org/en-US/docs/Glossary/Recursion', description: 'What is recursion?' },
      { label: 'MDN: Default parameters', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Default_parameters', description: 'Using default parameter values' }
    ],
    solutionGate: 8,
    basePoints: 50,
  },

  // ════════════════════════════════════════
  // T4: Algorithms & Data Structures (5 exercises)
  // ════════════════════════════════════════

  {
    id: 537,
    title: 'Recursive Binary Search',
    type: 'js',
    tier: 4,
    category: ['algorithms', 'recursion'],
    tags: ['recursion', 'binary-search', 'divide-and-conquer', 'searching', 'algorithm'],
    description: 'Create a function called `binarySearchRecursive` that takes a sorted array of numbers and a target value. Implement binary search using recursion instead of a loop. The function should accept optional `low` and `high` parameters to track the search bounds. Calculate the middle index, compare, and recursively search the appropriate half. Return the index if found, or `-1` if not found.',
    instructions: '',
    starterCode: '',
    solution: 'function binarySearchRecursive(arr, target, low, high) {\n  if (low === undefined) low = 0;\n  if (high === undefined) high = arr.length - 1;\n  if (low > high) return -1;\n  var mid = Math.floor((low + high) / 2);\n  if (arr[mid] === target) return mid;\n  if (target < arr[mid]) return binarySearchRecursive(arr, target, low, mid - 1);\n  return binarySearchRecursive(arr, target, mid + 1, high);\n}',
    testRunner: `(code) => {
  var fn = new Function(code + '; return binarySearchRecursive;')();
  var results = [];

  results.push({ pass: fn([1, 3, 5, 7, 9, 11], 7) === 3, description: 'Finds 7 at index 3 in sorted array', got: String(fn([1, 3, 5, 7, 9, 11], 7)) });

  results.push({ pass: fn([1, 3, 5, 7, 9, 11], 1) === 0, description: 'Finds first element at index 0', got: String(fn([1, 3, 5, 7, 9, 11], 1)) });

  results.push({ pass: fn([1, 3, 5, 7, 9, 11], 11) === 5, description: 'Finds last element at index 5', got: String(fn([1, 3, 5, 7, 9, 11], 11)) });

  results.push({ pass: fn([1, 3, 5, 7, 9, 11], 6) === -1, description: 'Returns -1 for missing value', got: String(fn([1, 3, 5, 7, 9, 11], 6)) });

  results.push({ pass: fn([], 5) === -1, description: 'Returns -1 for empty array', got: String(fn([], 5)) });

  results.push({ pass: fn([10], 10) === 0, description: 'Single element array, found', got: String(fn([10], 10)) });

  results.push({ pass: fn([10], 5) === -1, description: 'Single element array, not found', got: String(fn([10], 5)) });

  results.push({ pass: fn([2, 4, 6, 8, 10, 12, 14, 16, 18, 20], 14) === 6, description: 'Finds 14 at index 6 in 10-element array', got: String(fn([2, 4, 6, 8, 10, 12, 14, 16, 18, 20], 14)) });

  return results;
}`,
    testCases: [],
    hints: [
      'Use optional `low` and `high` parameters that default to 0 and arr.length - 1. The base case is when `low > high` — the target is not in the array.',
      'Calculate `mid = Math.floor((low + high) / 2)`. If `arr[mid]` matches, return `mid`. If target is smaller, recurse with `high = mid - 1`. If larger, recurse with `low = mid + 1`.'
    ],
    resources: [
      { label: 'MDN: Recursion', url: 'https://developer.mozilla.org/en-US/docs/Glossary/Recursion', description: 'What is recursion?' },
      { label: 'MDN: Math.floor()', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/floor', description: 'Round down to nearest integer' }
    ],
    solutionGate: 6,
    basePoints: 100,
  },

  {
    id: 538,
    title: 'Recursive Object Search',
    type: 'js',
    tier: 4,
    category: ['algorithms', 'recursion'],
    tags: ['recursion', 'objects', 'nested-data', 'deep-search', 'algorithm'],
    description: 'Create a function called `contains` that accepts a nested object and a target value. It should recursively search through all values in the object (including values inside nested objects) and return `true` if the target value exists anywhere, or `false` if not. Only search object values — arrays should be compared directly, not iterated into.',
    instructions: '',
    starterCode: '',
    solution: 'function contains(obj, target) {\n  for (var key in obj) {\n    if (typeof obj[key] === "object" && obj[key] !== null && !Array.isArray(obj[key])) {\n      if (contains(obj[key], target)) return true;\n    } else {\n      if (obj[key] === target) return true;\n    }\n  }\n  return false;\n}',
    testRunner: `(code) => {
  var fn = new Function(code + '; return contains;')();
  var results = [];

  results.push({ pass: fn({ a: 1, b: 2, c: 3 }, 2) === true, description: 'Finds value 2 in flat object', got: String(fn({ a: 1, b: 2, c: 3 }, 2)) });

  results.push({ pass: fn({ a: 1, b: 2, c: 3 }, 5) === false, description: 'Returns false for missing value in flat object', got: String(fn({ a: 1, b: 2, c: 3 }, 5)) });

  results.push({ pass: fn({ a: { b: { c: "hello" } } }, "hello") === true, description: 'Finds "hello" nested three levels deep', got: String(fn({ a: { b: { c: "hello" } } }, "hello")) });

  results.push({ pass: fn({ a: { b: { c: "hello" } } }, "world") === false, description: 'Returns false for "world" not in nested object', got: String(fn({ a: { b: { c: "hello" } } }, "world")) });

  results.push({ pass: fn({ data: { items: { count: 0 } } }, 0) === true, description: 'Finds falsy value 0 in nested object', got: String(fn({ data: { items: { count: 0 } } }, 0)) });

  results.push({ pass: fn({}, 1) === false, description: 'Returns false for empty object', got: String(fn({}, 1)) });

  results.push({ pass: fn({ a: 1, b: { c: 2, d: { e: 3 } } }, 3) === true, description: 'Finds 3 in mixed-depth object', got: String(fn({ a: 1, b: { c: 2, d: { e: 3 } } }, 3)) });

  results.push({ pass: fn({ x: true, y: { z: false } }, false) === true, description: 'Finds boolean false in nested object', got: String(fn({ x: true, y: { z: false } }, false)) });

  return results;
}`,
    testCases: [],
    hints: [
      'Use a `for...in` loop to iterate over the object keys. For each value, check if it is a non-null, non-array object — if so, recurse into it. Otherwise compare directly to the target.',
      'Check `typeof obj[key] === "object" && obj[key] !== null && !Array.isArray(obj[key])` to identify nested objects. If the recursive call returns `true`, return `true` immediately.'
    ],
    resources: [
      { label: 'MDN: for...in', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...in', description: 'Iterate over object properties' },
      { label: 'MDN: typeof', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof', description: 'Check a value type at runtime' }
    ],
    solutionGate: 6,
    basePoints: 100,
  },

  {
    id: 539,
    title: 'Selection Sort',
    type: 'js',
    tier: 4,
    category: ['algorithms', 'sorting'],
    tags: ['sorting', 'selection-sort', 'nested-loops', 'algorithm', 'in-place'],
    description: 'Create a function called `selectionSort` that takes an array of numbers and returns it sorted in ascending order using the selection sort algorithm. On each pass, find the index of the minimum value in the unsorted portion of the array, then swap it into the next position in the sorted portion. The sorted boundary moves one position forward after each pass.',
    instructions: '',
    starterCode: '',
    solution: 'function selectionSort(arr) {\n  for (var i = 0; i < arr.length - 1; i++) {\n    var minIdx = i;\n    for (var j = i + 1; j < arr.length; j++) {\n      if (arr[j] < arr[minIdx]) minIdx = j;\n    }\n    if (minIdx !== i) {\n      var temp = arr[i];\n      arr[i] = arr[minIdx];\n      arr[minIdx] = temp;\n    }\n  }\n  return arr;\n}',
    testRunner: `(code) => {
  var fn = new Function(code + '; return selectionSort;')();
  var results = [];

  results.push({ pass: JSON.stringify(fn([4, 5, 1, 21, 2, 9, 10, 15])) === '[1,2,4,5,9,10,15,21]', description: 'Sorts [4,5,1,21,2,9,10,15] → [1,2,4,5,9,10,15,21]', got: JSON.stringify(fn([4, 5, 1, 21, 2, 9, 10, 15])) });

  results.push({ pass: JSON.stringify(fn([9, -2, 0, 35, 4, -10, 22, 12])) === '[-10,-2,0,4,9,12,22,35]', description: 'Handles negative numbers', got: JSON.stringify(fn([9, -2, 0, 35, 4, -10, 22, 12])) });

  results.push({ pass: JSON.stringify(fn([])) === '[]', description: 'Returns empty array for empty input', got: JSON.stringify(fn([])) });

  results.push({ pass: JSON.stringify(fn([1])) === '[1]', description: 'Single element array returns unchanged', got: JSON.stringify(fn([1])) });

  results.push({ pass: JSON.stringify(fn([1, 2, 3, 4, 5])) === '[1,2,3,4,5]', description: 'Already sorted array stays sorted', got: JSON.stringify(fn([1, 2, 3, 4, 5])) });

  results.push({ pass: JSON.stringify(fn([5, 4, 3, 2, 1])) === '[1,2,3,4,5]', description: 'Reverse sorted → sorted', got: JSON.stringify(fn([5, 4, 3, 2, 1])) });

  results.push({ pass: JSON.stringify(fn([3, 3, 1, 1, 2, 2])) === '[1,1,2,2,3,3]', description: 'Handles duplicate values', got: JSON.stringify(fn([3, 3, 1, 1, 2, 2])) });

  results.push({ pass: JSON.stringify(fn([100, 50, 75, 25])) === '[25,50,75,100]', description: 'Sorts [100,50,75,25] → [25,50,75,100]', got: JSON.stringify(fn([100, 50, 75, 25])) });

  return results;
}`,
    testCases: [],
    hints: [
      'The outer loop tracks where the sorted portion ends. For each position, scan the remaining unsorted elements to find the index of the smallest value.',
      'Use a variable `minIdx` starting at `i`. Loop `j` from `i+1` to the end — if `arr[j] < arr[minIdx]`, update `minIdx`. After the inner loop, swap `arr[i]` with `arr[minIdx]`.'
    ],
    resources: [
      { label: 'MDN: Array', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array', description: 'JavaScript Array reference' },
      { label: 'MDN: Destructuring assignment', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment', description: 'Swap variables with destructuring' }
    ],
    solutionGate: 6,
    basePoints: 100,
  },

  {
    id: 540,
    title: 'Doubly Linked List',
    type: 'js',
    tier: 4,
    category: ['data-structures', 'doubly-linked-list'],
    tags: ['linked-list', 'doubly-linked', 'pointers', 'data-structure', 'classes'],
    description: 'Create a `DoublyLinkedList` class where each node has `value`, `prev`, and `next` properties. The constructor initializes an empty list with `head` and `tail` set to `null` and `length` set to `0`. Implement these methods: `push(val)` adds a node to the end and returns the list; `pop()` removes and returns the last value (undefined if empty); `unshift(val)` adds a node to the beginning and returns the list; `shift()` removes and returns the first value (undefined if empty); `get(index)` returns the value at that index or null; `reverse()` reverses the list in place and returns the list.',
    instructions: '',
    starterCode: '',
    solution: `class DoublyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }
  push(val) {
    var node = { value: val, prev: null, next: null };
    if (!this.head) {
      this.head = node;
      this.tail = node;
    } else {
      node.prev = this.tail;
      this.tail.next = node;
      this.tail = node;
    }
    this.length++;
    return this;
  }
  pop() {
    if (!this.tail) return undefined;
    var val = this.tail.value;
    if (this.length === 1) {
      this.head = null;
      this.tail = null;
    } else {
      this.tail = this.tail.prev;
      this.tail.next = null;
    }
    this.length--;
    return val;
  }
  unshift(val) {
    var node = { value: val, prev: null, next: null };
    if (!this.head) {
      this.head = node;
      this.tail = node;
    } else {
      node.next = this.head;
      this.head.prev = node;
      this.head = node;
    }
    this.length++;
    return this;
  }
  shift() {
    if (!this.head) return undefined;
    var val = this.head.value;
    if (this.length === 1) {
      this.head = null;
      this.tail = null;
    } else {
      this.head = this.head.next;
      this.head.prev = null;
    }
    this.length--;
    return val;
  }
  get(index) {
    if (index < 0 || index >= this.length) return null;
    var current = this.head;
    for (var i = 0; i < index; i++) {
      current = current.next;
    }
    return current.value;
  }
  reverse() {
    var current = this.head;
    while (current) {
      var temp = current.prev;
      current.prev = current.next;
      current.next = temp;
      current = current.prev;
    }
    var temp2 = this.head;
    this.head = this.tail;
    this.tail = temp2;
    return this;
  }
}`,
    testRunner: `(code) => {
  var Cls = new Function(code + '; return DoublyLinkedList;')();
  var results = [];

  var ll = new Cls();
  ll.push(1).push(2).push(3);
  results.push({ pass: ll.length === 3 && ll.head.value === 1 && ll.tail.value === 3, description: 'push(1,2,3): length 3, head=1, tail=3', got: 'length=' + ll.length + ' head=' + (ll.head && ll.head.value) + ' tail=' + (ll.tail && ll.tail.value) });

  results.push({ pass: ll.tail.prev.value === 2, description: 'tail.prev points to middle node (value 2)', got: String(ll.tail.prev && ll.tail.prev.value) });

  var popped = ll.pop();
  results.push({ pass: popped === 3 && ll.length === 2 && ll.tail.value === 2, description: 'pop() returns 3, length=2, tail=2', got: 'popped=' + popped + ' length=' + ll.length + ' tail=' + (ll.tail && ll.tail.value) });

  var ll2 = new Cls();
  ll2.unshift('c').unshift('b').unshift('a');
  results.push({ pass: ll2.head.value === 'a' && ll2.tail.value === 'c' && ll2.length === 3, description: 'unshift a,b,c: head=a, tail=c, length=3', got: 'head=' + (ll2.head && ll2.head.value) + ' tail=' + (ll2.tail && ll2.tail.value) });

  var shifted = ll2.shift();
  results.push({ pass: shifted === 'a' && ll2.head.value === 'b' && ll2.length === 2, description: 'shift() returns a, head=b, length=2', got: 'shifted=' + shifted + ' head=' + (ll2.head && ll2.head.value) });

  var ll3 = new Cls();
  ll3.push(10).push(20).push(30).push(40);
  results.push({ pass: ll3.get(0) === 10 && ll3.get(2) === 30 && ll3.get(4) === null, description: 'get(0)=10, get(2)=30, get(4)=null (out of bounds)', got: 'get(0)=' + ll3.get(0) + ' get(2)=' + ll3.get(2) + ' get(4)=' + ll3.get(4) });

  ll3.reverse();
  results.push({ pass: ll3.head.value === 40 && ll3.tail.value === 10, description: 'After reverse: head=40, tail=10', got: 'head=' + (ll3.head && ll3.head.value) + ' tail=' + (ll3.tail && ll3.tail.value) });

  var ll4 = new Cls();
  results.push({ pass: ll4.pop() === undefined && ll4.shift() === undefined, description: 'pop() and shift() return undefined on empty list', got: 'pop=' + ll4.pop() + ' shift=' + ll4.shift() });

  return results;
}`,
    testCases: [],
    hints: [
      'Each node needs three properties: `value`, `prev`, and `next`. When adding or removing, you must update pointers on both the node and its neighbors — forgetting the `prev` pointer is the most common mistake.',
      'For `reverse`, walk through every node swapping its `prev` and `next` pointers. After the loop, swap `this.head` and `this.tail`. The key insight: after swapping a node\'s pointers, the "next" node is now at `current.prev`.'
    ],
    resources: [
      { label: 'MDN: Classes', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes', description: 'JavaScript class syntax' },
      { label: 'MDN: null', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/null', description: 'The null value' }
    ],
    solutionGate: 6,
    basePoints: 100,
  },

  {
    id: 541,
    title: 'Max Binary Heap',
    type: 'js',
    tier: 4,
    category: ['data-structures', 'binary-heap'],
    tags: ['heap', 'binary-heap', 'priority-queue', 'data-structure', 'trees'],
    description: 'Create a `MaxBinaryHeap` class that stores values in an array where every parent is greater than or equal to its children. The constructor initializes with an empty `values` array. Implement `insert(val)` which adds a value and bubbles it up to maintain heap order, and `checkMaxHeap()` which returns `true` if the array satisfies the max-heap property. Parent of index `i` is at `Math.floor((i-1)/2)`. Children of index `i` are at `2*i+1` and `2*i+2`.',
    instructions: '',
    starterCode: '',
    solution: `class MaxBinaryHeap {
  constructor() {
    this.values = [];
  }
  insert(val) {
    this.values.push(val);
    var idx = this.values.length - 1;
    while (idx > 0) {
      var parentIdx = Math.floor((idx - 1) / 2);
      if (this.values[idx] <= this.values[parentIdx]) break;
      var temp = this.values[idx];
      this.values[idx] = this.values[parentIdx];
      this.values[parentIdx] = temp;
      idx = parentIdx;
    }
    return this;
  }
  checkMaxHeap() {
    for (var i = 0; i < this.values.length; i++) {
      var left = 2 * i + 1;
      var right = 2 * i + 2;
      if (left < this.values.length && this.values[i] < this.values[left]) return false;
      if (right < this.values.length && this.values[i] < this.values[right]) return false;
    }
    return true;
  }
}`,
    testRunner: `(code) => {
  var Cls = new Function(code + '; return MaxBinaryHeap;')();
  var results = [];

  var h = new Cls();
  h.insert(1);
  results.push({ pass: JSON.stringify(h.values) === '[1]', description: 'Insert 1 → [1]', got: JSON.stringify(h.values) });

  h.insert(2);
  results.push({ pass: JSON.stringify(h.values) === '[2,1]', description: 'Insert 2 → [2,1] (bubbles up)', got: JSON.stringify(h.values) });

  h.insert(3);
  results.push({ pass: JSON.stringify(h.values) === '[3,1,2]', description: 'Insert 3 → [3,1,2]', got: JSON.stringify(h.values) });

  h.insert(4);
  h.insert(5);
  h.insert(6);
  results.push({ pass: h.values[0] === 6 && h.values.length === 6, description: 'After inserting 4,5,6: root is 6, length is 6', got: 'root=' + h.values[0] + ' length=' + h.values.length });

  results.push({ pass: h.checkMaxHeap() === true, description: 'checkMaxHeap() returns true after insertions', got: String(h.checkMaxHeap()) });

  var h2 = new Cls();
  h2.values = [1, 5, 3];
  results.push({ pass: h2.checkMaxHeap() === false, description: 'checkMaxHeap() returns false for [1,5,3] (child > parent)', got: String(h2.checkMaxHeap()) });

  var h3 = new Cls();
  results.push({ pass: h3.checkMaxHeap() === true, description: 'checkMaxHeap() returns true for empty heap', got: String(h3.checkMaxHeap()) });

  var h4 = new Cls();
  h4.insert(10).insert(5).insert(8).insert(1).insert(3).insert(7).insert(6);
  results.push({ pass: h4.values[0] === 10 && h4.checkMaxHeap() === true, description: 'Larger heap: root=10, valid max-heap after 7 insertions', got: 'root=' + h4.values[0] + ' valid=' + h4.checkMaxHeap() });

  return results;
}`,
    testCases: [],
    hints: [
      'For `insert`: push the value to the end of the array, then "bubble up" — compare with the parent at `Math.floor((idx-1)/2)` and swap if the child is larger. Repeat until the value is in the right spot or reaches index 0.',
      'For `checkMaxHeap`: loop through every index. For each, check that the left child (`2*i+1`) and right child (`2*i+2`) are both less than or equal to the parent. Return false the moment any violation is found.'
    ],
    resources: [
      { label: 'MDN: Array.prototype.push()', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/push', description: 'Add elements to end of array' },
      { label: 'MDN: Math.floor()', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/floor', description: 'Round down to nearest integer' }
    ],
    solutionGate: 6,
    basePoints: 100,
  },

  // ════════════════════════════════════════
  // T5: Advanced Recursion & Heap Operations (3 exercises)
  // ════════════════════════════════════════

  {
    id: 542,
    title: 'Recursive Collect Strings',
    type: 'js',
    tier: 5,
    category: ['algorithms', 'recursion'],
    tags: ['recursion', 'objects', 'nested-data', 'deep-traversal', 'accumulation'],
    description: 'Create a function called `collectStrings` that accepts a nested object and returns an array containing all string values found at any depth. The function should recursively traverse into nested objects, collecting every value that is a string. Non-string, non-object values should be skipped. The order of strings should follow the order keys are encountered.',
    instructions: '',
    starterCode: '',
    solution: 'function collectStrings(obj) {\n  var result = [];\n  for (var key in obj) {\n    if (typeof obj[key] === "string") {\n      result.push(obj[key]);\n    } else if (typeof obj[key] === "object" && obj[key] !== null && !Array.isArray(obj[key])) {\n      result = result.concat(collectStrings(obj[key]));\n    }\n  }\n  return result;\n}',
    testRunner: `(code) => {
  var fn = new Function(code + '; return collectStrings;')();
  var results = [];

  results.push({ pass: JSON.stringify(fn({ a: "hello", b: "world" })) === '["hello","world"]', description: 'Flat object: {a:"hello", b:"world"} → ["hello","world"]', got: JSON.stringify(fn({ a: "hello", b: "world" })) });

  results.push({ pass: JSON.stringify(fn({ a: 1, b: "two", c: 3, d: "four" })) === '["two","four"]', description: 'Mixed types: collects only strings', got: JSON.stringify(fn({ a: 1, b: "two", c: 3, d: "four" })) });

  var nested = { stuff: "foo", data: { val: { thing: { info: "bar", moreInfo: { evenMoreInfo: { wowSoMuchInfo: "baz" } } } } } };
  results.push({ pass: JSON.stringify(fn(nested)) === '["foo","bar","baz"]', description: 'Deeply nested: collects "foo","bar","baz"', got: JSON.stringify(fn(nested)) });

  results.push({ pass: JSON.stringify(fn({})) === '[]', description: 'Empty object returns empty array', got: JSON.stringify(fn({})) });

  results.push({ pass: JSON.stringify(fn({ a: 1, b: true, c: null })) === '[]', description: 'No strings returns empty array', got: JSON.stringify(fn({ a: 1, b: true, c: null })) });

  results.push({ pass: JSON.stringify(fn({ a: "x", b: { c: "y" }, d: "z" })) === '["x","y","z"]', description: 'Two levels: collects in order', got: JSON.stringify(fn({ a: "x", b: { c: "y" }, d: "z" })) });

  results.push({ pass: JSON.stringify(fn({ a: [1,2,3], b: "hello" })) === '["hello"]', description: 'Skips arrays, collects strings', got: JSON.stringify(fn({ a: [1,2,3], b: "hello" })) });

  results.push({ pass: fn({ a: { b: { c: { d: { e: "deep" } } } } })[0] === "deep", description: 'Finds string 5 levels deep', got: String(fn({ a: { b: { c: { d: { e: "deep" } } } } })[0]) });

  return results;
}`,
    testCases: [],
    hints: [
      'Iterate over the object keys with `for...in`. For each value, check its type: if it is a string, add it to your results array. If it is a non-null, non-array object, recursively collect strings from it.',
      'Use `result.concat(collectStrings(obj[key]))` to merge the recursive results into your accumulator. Be sure to check `!Array.isArray(obj[key])` so you do not recurse into arrays.'
    ],
    resources: [
      { label: 'MDN: typeof', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof', description: 'Check a value type at runtime' },
      { label: 'MDN: Array.prototype.concat()', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/concat', description: 'Merge arrays without mutation' }
    ],
    solutionGate: 6,
    basePoints: 200,
  },

  {
    id: 543,
    title: 'Recursive Stringify Numbers',
    type: 'js',
    tier: 5,
    category: ['algorithms', 'recursion'],
    tags: ['recursion', 'objects', 'deep-clone', 'transformation', 'type-checking'],
    description: 'Create a function called `stringifyNumbers` that accepts a nested object and returns a new object where every number value has been converted to a string. The function must not mutate the original object. Nested objects should be recursively processed. Arrays and all other non-object types should be copied as-is without modification.',
    instructions: '',
    starterCode: '',
    solution: 'function stringifyNumbers(obj) {\n  var result = {};\n  for (var key in obj) {\n    if (typeof obj[key] === "number") {\n      result[key] = String(obj[key]);\n    } else if (typeof obj[key] === "object" && obj[key] !== null && !Array.isArray(obj[key])) {\n      result[key] = stringifyNumbers(obj[key]);\n    } else {\n      result[key] = obj[key];\n    }\n  }\n  return result;\n}',
    testRunner: `(code) => {
  var fn = new Function(code + '; return stringifyNumbers;')();
  var results = [];

  var r1 = fn({ a: 1, b: 2 });
  results.push({ pass: r1.a === "1" && r1.b === "2", description: 'Converts {a:1, b:2} → {a:"1", b:"2"}', got: JSON.stringify(r1) });

  var r2 = fn({ name: "Alice", age: 30 });
  results.push({ pass: r2.name === "Alice" && r2.age === "30", description: 'Strings stay, numbers become strings', got: JSON.stringify(r2) });

  var input3 = { a: { b: { c: 5 } } };
  var r3 = fn(input3);
  results.push({ pass: r3.a.b.c === "5", description: 'Converts nested number: {a:{b:{c:5}}} → c is "5"', got: String(r3.a.b.c) });

  results.push({ pass: input3.a.b.c === 5, description: 'Does not mutate original object', got: String(input3.a.b.c) });

  var r4 = fn({ x: [1, 2, 3], y: 4 });
  results.push({ pass: JSON.stringify(r4.x) === '[1,2,3]' && r4.y === "4", description: 'Arrays copied as-is, numbers converted', got: JSON.stringify(r4) });

  var r5 = fn({ a: true, b: null, c: "hi" });
  results.push({ pass: r5.a === true && r5.b === null && r5.c === "hi", description: 'Booleans, null, strings unchanged', got: JSON.stringify(r5) });

  var r6 = fn({});
  results.push({ pass: JSON.stringify(r6) === '{}', description: 'Empty object returns empty object', got: JSON.stringify(r6) });

  var r7 = fn({ data: { count: 0, label: "test", nested: { val: -5 } } });
  results.push({ pass: r7.data.count === "0" && r7.data.nested.val === "-5" && r7.data.label === "test", description: 'Handles 0 and negative numbers in nested objects', got: JSON.stringify(r7) });

  return results;
}`,
    testCases: [],
    hints: [
      'Build a new object key by key. For each value: if it is a number, convert with `String()`. If it is a non-null, non-array object, recurse. Otherwise copy as-is.',
      'The non-mutation requirement means you must create `var result = {}` and populate it — never modify `obj` directly. Use `Array.isArray()` to distinguish arrays from objects.'
    ],
    resources: [
      { label: 'MDN: String()', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/String', description: 'Convert values to strings' },
      { label: 'MDN: Array.isArray()', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray', description: 'Check if a value is an array' }
    ],
    solutionGate: 6,
    basePoints: 200,
  },

  {
    id: 544,
    title: 'Heap Remove and Heapify',
    type: 'js',
    tier: 5,
    category: ['data-structures', 'binary-heap'],
    tags: ['heap', 'binary-heap', 'sink-down', 'heapify', 'data-structure', 'algorithm'],
    description: 'Create a `MaxBinaryHeap` class with three methods. `insert(val)` adds a value and bubbles it up. `remove()` extracts the maximum (root), replaces it with the last element, and sinks it down by repeatedly swapping with its larger child until heap order is restored. Also create a standalone function `maxHeapify(arr)` that converts any array into a valid max-heap in place and returns it. Parent of index `i` is at `Math.floor((i-1)/2)`. Children are at `2*i+1` and `2*i+2`.',
    instructions: '',
    starterCode: '',
    solution: `class MaxBinaryHeap {
  constructor() {
    this.values = [];
  }
  insert(val) {
    this.values.push(val);
    var idx = this.values.length - 1;
    while (idx > 0) {
      var parentIdx = Math.floor((idx - 1) / 2);
      if (this.values[idx] <= this.values[parentIdx]) break;
      var temp = this.values[idx];
      this.values[idx] = this.values[parentIdx];
      this.values[parentIdx] = temp;
      idx = parentIdx;
    }
    return this;
  }
  remove() {
    if (this.values.length === 0) return undefined;
    var max = this.values[0];
    var last = this.values.pop();
    if (this.values.length === 0) return max;
    this.values[0] = last;
    var idx = 0;
    var length = this.values.length;
    while (true) {
      var left = 2 * idx + 1;
      var right = 2 * idx + 2;
      var swap = null;
      if (left < length && this.values[left] > this.values[idx]) swap = left;
      if (right < length && this.values[right] > (swap === null ? this.values[idx] : this.values[left])) swap = right;
      if (swap === null) break;
      var temp = this.values[idx];
      this.values[idx] = this.values[swap];
      this.values[swap] = temp;
      idx = swap;
    }
    return max;
  }
}

function maxHeapify(arr) {
  for (var i = Math.floor(arr.length / 2) - 1; i >= 0; i--) {
    sinkDown(arr, i, arr.length);
  }
  return arr;
}

function sinkDown(arr, idx, length) {
  while (true) {
    var left = 2 * idx + 1;
    var right = 2 * idx + 2;
    var swap = null;
    if (left < length && arr[left] > arr[idx]) swap = left;
    if (right < length && arr[right] > (swap === null ? arr[idx] : arr[left])) swap = right;
    if (swap === null) break;
    var temp = arr[idx];
    arr[idx] = arr[swap];
    arr[swap] = temp;
    idx = swap;
  }
}`,
    testRunner: `(code) => {
  var result = new Function(code + '; return { MaxBinaryHeap: MaxBinaryHeap, maxHeapify: maxHeapify };')();
  var Cls = result.MaxBinaryHeap;
  var heapify = result.maxHeapify;
  var results = [];

  var h = new Cls();
  h.insert(1).insert(2).insert(3).insert(4).insert(5).insert(6);
  var r1 = h.remove();
  results.push({ pass: r1 === 6, description: 'remove() returns max value 6', got: String(r1) });

  results.push({ pass: h.values[0] === 5 && h.values.length === 5, description: 'After remove: root=5, length=5', got: 'root=' + h.values[0] + ' len=' + h.values.length });

  var r2 = h.remove();
  results.push({ pass: r2 === 5, description: 'Second remove() returns 5', got: String(r2) });

  var r3 = h.remove();
  results.push({ pass: r3 === 4, description: 'Third remove() returns 4', got: String(r3) });

  var h2 = new Cls();
  results.push({ pass: h2.remove() === undefined, description: 'remove() on empty heap returns undefined', got: String(h2.remove()) });

  function isMaxHeap(arr) {
    for (var i = 0; i < arr.length; i++) {
      var l = 2*i+1, r = 2*i+2;
      if (l < arr.length && arr[i] < arr[l]) return false;
      if (r < arr.length && arr[i] < arr[r]) return false;
    }
    return true;
  }

  var a1 = [3, 1, 6, 2, 5, 4];
  heapify(a1);
  results.push({ pass: isMaxHeap(a1) && a1[0] === 6, description: 'maxHeapify([3,1,6,2,5,4]): root=6, valid heap', got: 'root=' + a1[0] + ' valid=' + isMaxHeap(a1) });

  var a2 = [1, 2, 3, 4, 5, 6, 7];
  heapify(a2);
  results.push({ pass: isMaxHeap(a2) && a2[0] === 7, description: 'maxHeapify([1..7]): root=7, valid heap', got: 'root=' + a2[0] + ' valid=' + isMaxHeap(a2) });

  var a3 = [];
  heapify(a3);
  results.push({ pass: isMaxHeap(a3) && a3.length === 0, description: 'maxHeapify([]): empty array stays valid', got: 'valid=' + isMaxHeap(a3) });

  return results;
}`,
    testCases: [],
    hints: [
      'For `remove`: swap the root with the last element, pop the last, then "sink down" the new root. Compare with both children at `2*idx+1` and `2*idx+2` — swap with the larger child if it is bigger than the current node.',
      'For `maxHeapify`: start at the last parent node (`Math.floor(arr.length/2) - 1`) and sink down each node working backwards to index 0. This builds the heap bottom-up in O(n) time.'
    ],
    resources: [
      { label: 'MDN: Array.prototype.pop()', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/pop', description: 'Remove last element from array' },
      { label: 'MDN: Math.floor()', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/floor', description: 'Round down to nearest integer' }
    ],
    solutionGate: 6,
    basePoints: 200,
  },
];

// ── Insert exercises at correct tier positions ──
// T3 exercises go after last T3 (ID 461), T4 after last T4 (ID 524), T5 at end

const t3Exercises = newExercises.filter(e => e.tier === 3);
const t4Exercises = newExercises.filter(e => e.tier === 4);
const t5Exercises = newExercises.filter(e => e.tier === 5);

// Find insertion points
const lastT3Idx = data.exercises.findIndex(e => e.id === 461);
const lastT4Idx = data.exercises.findIndex(e => e.id === 524);

// Insert in reverse order so indices don't shift
// T5 goes at end
data.exercises.push(...t5Exercises);

// T4 goes after last T4
data.exercises.splice(lastT4Idx + 1, 0, ...t4Exercises);

// T3 goes after last T3
data.exercises.splice(lastT3Idx + 1, 0, ...t3Exercises);

// Update exerciseIds
data.exerciseIds = data.exercises.map(e => e.id);

// ── Write ──
fs.writeFileSync(CURRICULUM_PATH, JSON.stringify(data, null, 2) + '\n');

// ── Report ──
console.log('\n=== CS Exercises Addition Report ===\n');
console.log(`Added ${newExercises.length} exercises (IDs ${newExercises[0].id}-${newExercises[newExercises.length - 1].id})`);
console.log(`Total exercises: ${data.exercises.length}`);

console.log('\nNew exercises:');
for (const ex of newExercises) {
  console.log(`  ${ex.id}: T${ex.tier} [${ex.category.join('/')}] ${ex.title}`);
}

const tierCounts = {};
for (const ex of data.exercises) {
  tierCounts['T' + ex.tier] = (tierCounts['T' + ex.tier] || 0) + 1;
}
console.log('\nUpdated tier distribution:');
for (const [t, c] of Object.entries(tierCounts).sort()) {
  console.log(`  ${t}: ${c}`);
}

console.log(`\n✓ Written to ${CURRICULUM_PATH}`);
