#!/usr/bin/env node
/**
 * Generator: T4 Data Structures — Section 6 (6 exercises, IDs 1359-1364)
 *
 * Covers: Stack, Queue, Linked List, HashMap, Binary Search Tree, Graph
 *
 * T4 convention: description-only, NO starterCode. Student writes everything
 * from scratch including class/function declarations. Description tells them
 * the class name and expected behavior.
 *
 * Usage:
 *   node exercises/_gen_t4_data_structures.js            # Append to curriculum
 *   node exercises/_gen_t4_data_structures.js --validate  # Validate testRunners only
 */

const fs = require('fs');
const path = require('path');

const CURRICULUM_PATH = path.join(
  __dirname,
  'collections',
  'default-curriculum.json'
);

// ─── Resources (MDN only for T4) ────────────────────────────────────────────

const stackRes = [
  { label: 'MDN: Array.prototype.push', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/push', description: 'Array push reference' },
  { label: 'MDN: Array.prototype.pop', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/pop', description: 'Array pop reference' },
];
const queueRes = [
  { label: 'MDN: Array.prototype.push', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/push', description: 'Array push reference' },
  { label: 'MDN: Array.prototype.shift', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/shift', description: 'Array shift reference' },
];
const linkedListRes = [
  { label: 'MDN: Classes', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes', description: 'JavaScript classes reference' },
  { label: 'MDN: null', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/null', description: 'null reference' },
];
const hashMapRes = [
  { label: 'MDN: Object.keys', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys', description: 'Object.keys reference' },
  { label: 'MDN: Array.prototype.find', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find', description: 'Array find reference' },
];
const bstRes = [
  { label: 'MDN: Classes', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes', description: 'JavaScript classes reference' },
  { label: 'MDN: Array.prototype.push', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/push', description: 'Array push reference' },
];
const graphRes = [
  { label: 'MDN: Map', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map', description: 'Map object reference' },
  { label: 'MDN: Array.prototype.includes', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes', description: 'Array includes reference' },
];

// ─── Exercise Definitions ───────────────────────────────────────────────────

const exercises = [

  // ══════════════════════════════════════════════════════════════════════════
  // T4 Section 6: Data Structures (6 exercises, IDs 1359-1364)
  // ══════════════════════════════════════════════════════════════════════════

  // 1. Stack
  {
    id: 1359,
    title: 'Stack Implementation',
    type: 'js',
    tier: 4,
    category: ['data-structures', 'stack'],
    tags: ['class', 'stack', 'lifo', 'push', 'pop', 'peek', 'data-structure'],
    description:
      'Create a `Stack` class that implements a Last-In-First-Out data structure. The constructor takes no arguments and initializes an empty stack. Implement these methods: `push(value)` adds a value to the top and returns the new size; `pop()` removes and returns the top value (returns `undefined` if empty); `peek()` returns the top value without removing it (returns `undefined` if empty); `size()` returns the number of items; `isEmpty()` returns `true` if the stack has no items; `toArray()` returns an array of all items from bottom to top.',
    starterCode: '',
    solution:
      'class Stack {\n  constructor() {\n    this.items = [];\n  }\n  push(value) {\n    this.items.push(value);\n    return this.items.length;\n  }\n  pop() {\n    return this.items.pop();\n  }\n  peek() {\n    return this.items[this.items.length - 1];\n  }\n  size() {\n    return this.items.length;\n  }\n  isEmpty() {\n    return this.items.length === 0;\n  }\n  toArray() {\n    return this.items.slice();\n  }\n}',
    testRunner: `(code) => {
  var S = new Function(code + '; return Stack;')();
  var results = [];

  var s = new S();
  results.push({ pass: s.isEmpty() === true && s.size() === 0, description: 'New stack is empty with size 0', got: 'isEmpty=' + s.isEmpty() + ', size=' + s.size() });

  var r1 = s.push(10);
  var r2 = s.push(20);
  var r3 = s.push(30);
  results.push({ pass: r1 === 1 && r2 === 2 && r3 === 3, description: 'push returns new size (1, 2, 3)', got: r1 + ', ' + r2 + ', ' + r3 });

  results.push({ pass: s.peek() === 30 && s.size() === 3, description: 'peek returns 30 (top) without removing, size stays 3', got: 'peek=' + s.peek() + ', size=' + s.size() });

  var popped = s.pop();
  results.push({ pass: popped === 30 && s.size() === 2, description: 'pop returns 30 and size becomes 2', got: 'popped=' + popped + ', size=' + s.size() });

  results.push({ pass: JSON.stringify(s.toArray()) === '[10,20]', description: 'toArray returns [10, 20] from bottom to top', got: JSON.stringify(s.toArray()) });

  s.pop(); s.pop();
  results.push({ pass: s.pop() === undefined && s.peek() === undefined, description: 'pop and peek return undefined on empty stack', got: 'pop=' + s.pop() + ', peek=' + s.peek() });

  s.push('a'); s.push('b'); s.push('c');
  results.push({ pass: s.pop() === 'c' && s.pop() === 'b' && s.pop() === 'a', description: 'LIFO order: push a,b,c then pop returns c,b,a', got: 'verified LIFO' });

  var s2 = new S();
  s2.push(null); s2.push(0); s2.push(false);
  results.push({ pass: s2.size() === 3 && s2.peek() === false && s2.pop() === false && s2.pop() === 0 && s2.pop() === null, description: 'Handles falsy values (null, 0, false) correctly', got: 'size=' + 3 });

  return results;
}`,
    hint1:
      'Use an internal array to store items. `push` adds to the end, `pop` removes from the end, and `peek` reads the last element without removing it. This mirrors how a stack of plates works — you always add and remove from the top.',
    hint2:
      'Store items in `this.items = []`. For `push`, use `this.items.push(value)` and return `this.items.length`. For `pop`, use `this.items.pop()`. For `peek`, return the element at index `this.items.length - 1`. For `toArray`, return a copy with `this.items.slice()`.',
    resources: stackRes,
  },

  // 2. Queue
  {
    id: 1360,
    title: 'Queue Implementation',
    type: 'js',
    tier: 4,
    category: ['data-structures', 'queue'],
    tags: ['class', 'queue', 'fifo', 'enqueue', 'dequeue', 'data-structure'],
    description:
      'Create a `Queue` class that implements a First-In-First-Out data structure. The constructor takes no arguments and initializes an empty queue. Implement these methods: `enqueue(value)` adds a value to the back and returns the new size; `dequeue()` removes and returns the front value (returns `undefined` if empty); `front()` returns the front value without removing it (returns `undefined` if empty); `size()` returns the number of items; `isEmpty()` returns `true` if the queue has no items; `toArray()` returns an array of all items from front to back.',
    starterCode: '',
    solution:
      'class Queue {\n  constructor() {\n    this.items = [];\n  }\n  enqueue(value) {\n    this.items.push(value);\n    return this.items.length;\n  }\n  dequeue() {\n    return this.items.shift();\n  }\n  front() {\n    return this.items[0];\n  }\n  size() {\n    return this.items.length;\n  }\n  isEmpty() {\n    return this.items.length === 0;\n  }\n  toArray() {\n    return this.items.slice();\n  }\n}',
    testRunner: `(code) => {
  var Q = new Function(code + '; return Queue;')();
  var results = [];

  var q = new Q();
  results.push({ pass: q.isEmpty() === true && q.size() === 0, description: 'New queue is empty with size 0', got: 'isEmpty=' + q.isEmpty() + ', size=' + q.size() });

  var r1 = q.enqueue('A');
  var r2 = q.enqueue('B');
  var r3 = q.enqueue('C');
  results.push({ pass: r1 === 1 && r2 === 2 && r3 === 3, description: 'enqueue returns new size (1, 2, 3)', got: r1 + ', ' + r2 + ', ' + r3 });

  results.push({ pass: q.front() === 'A' && q.size() === 3, description: 'front returns "A" (first in) without removing, size stays 3', got: 'front=' + q.front() + ', size=' + q.size() });

  var d1 = q.dequeue();
  results.push({ pass: d1 === 'A' && q.front() === 'B' && q.size() === 2, description: 'dequeue returns "A", front becomes "B", size is 2', got: 'd=' + d1 + ', front=' + q.front() + ', size=' + q.size() });

  results.push({ pass: JSON.stringify(q.toArray()) === '["B","C"]', description: 'toArray returns ["B","C"] from front to back', got: JSON.stringify(q.toArray()) });

  q.dequeue(); q.dequeue();
  results.push({ pass: q.dequeue() === undefined && q.front() === undefined && q.isEmpty() === true, description: 'dequeue and front return undefined on empty queue', got: 'dequeue=' + q.dequeue() + ', front=' + q.front() });

  var q2 = new Q();
  q2.enqueue(1); q2.enqueue(2); q2.enqueue(3);
  results.push({ pass: q2.dequeue() === 1 && q2.dequeue() === 2 && q2.dequeue() === 3, description: 'FIFO order: enqueue 1,2,3 then dequeue returns 1,2,3', got: 'verified FIFO' });

  var q3 = new Q();
  q3.enqueue(null); q3.enqueue(0); q3.enqueue('');
  results.push({ pass: q3.size() === 3 && q3.front() === null && q3.dequeue() === null && q3.dequeue() === 0 && q3.dequeue() === '', description: 'Handles falsy values (null, 0, empty string) correctly', got: 'size=3' });

  return results;
}`,
    hint1:
      'Use an internal array where items enter from one end and leave from the other. Think of a line at a store — the first person in line is the first to be served. Add to the back, remove from the front.',
    hint2:
      'Store items in `this.items = []`. For `enqueue`, use `this.items.push(value)` and return the new length. For `dequeue`, use `this.items.shift()` to remove from the front. For `front`, return `this.items[0]`. For `toArray`, return a copy with `this.items.slice()`.',
    resources: queueRes,
  },

  // 3. Linked List
  {
    id: 1361,
    title: 'Linked List',
    type: 'js',
    tier: 4,
    category: ['data-structures', 'linked-list'],
    tags: ['class', 'linked-list', 'node', 'pointer', 'traversal', 'data-structure'],
    description:
      'Create a `LinkedList` class that implements a singly linked list. Each node should have a `value` and a `next` pointer. The constructor initializes an empty list with a `head` of `null`. Implement these methods: `append(value)` adds a node to the end; `prepend(value)` adds a node to the beginning; `size()` returns the number of nodes; `toArray()` returns an array of all values from head to tail; `find(value)` returns the first node with that value or `null` if not found; `removeAt(index)` removes the node at the given 0-based index and returns its value (returns `undefined` if index is out of bounds). You may define a separate `Node` class or use plain objects for nodes.',
    starterCode: '',
    solution:
      'class LinkedList {\n  constructor() {\n    this.head = null;\n  }\n  append(value) {\n    var node = { value: value, next: null };\n    if (!this.head) {\n      this.head = node;\n      return;\n    }\n    var current = this.head;\n    while (current.next) {\n      current = current.next;\n    }\n    current.next = node;\n  }\n  prepend(value) {\n    var node = { value: value, next: this.head };\n    this.head = node;\n  }\n  size() {\n    var count = 0;\n    var current = this.head;\n    while (current) {\n      count++;\n      current = current.next;\n    }\n    return count;\n  }\n  toArray() {\n    var arr = [];\n    var current = this.head;\n    while (current) {\n      arr.push(current.value);\n      current = current.next;\n    }\n    return arr;\n  }\n  find(value) {\n    var current = this.head;\n    while (current) {\n      if (current.value === value) return current;\n      current = current.next;\n    }\n    return null;\n  }\n  removeAt(index) {\n    if (index < 0 || !this.head) return undefined;\n    if (index === 0) {\n      var val = this.head.value;\n      this.head = this.head.next;\n      return val;\n    }\n    var current = this.head;\n    for (var i = 0; i < index - 1; i++) {\n      if (!current.next) return undefined;\n      current = current.next;\n    }\n    if (!current.next) return undefined;\n    var val = current.next.value;\n    current.next = current.next.next;\n    return val;\n  }\n}',
    testRunner: `(code) => {
  var LL = new Function(code + '; return LinkedList;')();
  var results = [];

  var list = new LL();
  results.push({ pass: list.head === null && list.size() === 0 && JSON.stringify(list.toArray()) === '[]', description: 'New list has null head, size 0, empty toArray', got: 'head=' + list.head + ', size=' + list.size() });

  list.append(10); list.append(20); list.append(30);
  results.push({ pass: JSON.stringify(list.toArray()) === '[10,20,30]' && list.size() === 3, description: 'append 10,20,30 creates list [10,20,30] with size 3', got: JSON.stringify(list.toArray()) });

  list.prepend(5);
  results.push({ pass: JSON.stringify(list.toArray()) === '[5,10,20,30]' && list.head.value === 5, description: 'prepend(5) makes head 5, list is [5,10,20,30]', got: JSON.stringify(list.toArray()) });

  var found = list.find(20);
  var notFound = list.find(99);
  results.push({ pass: found !== null && found.value === 20 && found.next.value === 30 && notFound === null, description: 'find(20) returns node with value 20 and next pointing to 30, find(99) returns null', got: 'found=' + (found && found.value) + ', notFound=' + notFound });

  var removed = list.removeAt(1);
  results.push({ pass: removed === 10 && JSON.stringify(list.toArray()) === '[5,20,30]' && list.size() === 3, description: 'removeAt(1) removes 10, list becomes [5,20,30]', got: 'removed=' + removed + ', list=' + JSON.stringify(list.toArray()) });

  var removedHead = list.removeAt(0);
  results.push({ pass: removedHead === 5 && list.head.value === 20, description: 'removeAt(0) removes head (5), new head is 20', got: 'removed=' + removedHead + ', head=' + list.head.value });

  var outOfBounds = list.removeAt(10);
  var negIndex = list.removeAt(-1);
  results.push({ pass: outOfBounds === undefined && negIndex === undefined, description: 'removeAt with out-of-bounds or negative index returns undefined', got: 'oob=' + outOfBounds + ', neg=' + negIndex });

  var empty = new LL();
  empty.prepend('only');
  results.push({ pass: empty.head.value === 'only' && empty.size() === 1 && empty.removeAt(0) === 'only' && empty.size() === 0, description: 'prepend on empty list sets head, removeAt(0) on single-item list empties it', got: 'verified' });

  return results;
}`,
    hint1:
      'Each node is an object with `value` and `next` (pointing to the next node or null). To traverse, start at `this.head` and follow `.next` until you reach null. Append walks to the end, prepend replaces the head.',
    hint2:
      'For `append`, create a node and if `this.head` is null, set it as head. Otherwise, walk to the last node (where `.next` is null) and set `.next` to the new node. For `removeAt`, handle index 0 specially by updating `this.head`. For other indices, walk to the node before the target and set its `.next` to skip the target node.',
    resources: linkedListRes,
  },

  // 4. HashMap
  {
    id: 1362,
    title: 'HashMap Implementation',
    type: 'js',
    tier: 4,
    category: ['data-structures', 'hash-map'],
    tags: ['class', 'hash-map', 'key-value', 'hash', 'collision', 'data-structure'],
    description:
      'Create a `HashMap` class that stores key-value pairs using a hash function and handles collisions with chaining (arrays at each bucket). The constructor takes an optional `size` parameter (default 16) for the number of buckets. Implement a `_hash(key)` method that converts a string key into a bucket index. Implement these methods: `set(key, value)` stores a key-value pair (update if key exists); `get(key)` returns the value for a key or `undefined` if not found; `has(key)` returns `true` if the key exists; `delete(key)` removes a key-value pair and returns `true` if it existed, `false` otherwise; `keys()` returns an array of all keys; `values()` returns an array of all values.',
    starterCode: '',
    solution:
      'class HashMap {\n  constructor(size) {\n    this.size = size || 16;\n    this.buckets = new Array(this.size).fill(null).map(function() { return []; });\n  }\n  _hash(key) {\n    var hash = 0;\n    for (var i = 0; i < key.length; i++) {\n      hash = (hash + key.charCodeAt(i) * (i + 1)) % this.size;\n    }\n    return hash;\n  }\n  set(key, value) {\n    var index = this._hash(key);\n    var bucket = this.buckets[index];\n    for (var i = 0; i < bucket.length; i++) {\n      if (bucket[i][0] === key) {\n        bucket[i][1] = value;\n        return;\n      }\n    }\n    bucket.push([key, value]);\n  }\n  get(key) {\n    var index = this._hash(key);\n    var bucket = this.buckets[index];\n    for (var i = 0; i < bucket.length; i++) {\n      if (bucket[i][0] === key) return bucket[i][1];\n    }\n    return undefined;\n  }\n  has(key) {\n    return this.get(key) !== undefined;\n  }\n  delete(key) {\n    var index = this._hash(key);\n    var bucket = this.buckets[index];\n    for (var i = 0; i < bucket.length; i++) {\n      if (bucket[i][0] === key) {\n        bucket.splice(i, 1);\n        return true;\n      }\n    }\n    return false;\n  }\n  keys() {\n    var result = [];\n    for (var i = 0; i < this.buckets.length; i++) {\n      for (var j = 0; j < this.buckets[i].length; j++) {\n        result.push(this.buckets[i][j][0]);\n      }\n    }\n    return result;\n  }\n  values() {\n    var result = [];\n    for (var i = 0; i < this.buckets.length; i++) {\n      for (var j = 0; j < this.buckets[i].length; j++) {\n        result.push(this.buckets[i][j][1]);\n      }\n    }\n    return result;\n  }\n}',
    testRunner: `(code) => {
  var HM = new Function(code + '; return HashMap;')();
  var results = [];

  var map = new HM(4);
  map.set('name', 'Alice');
  map.set('age', 30);
  results.push({ pass: map.get('name') === 'Alice' && map.get('age') === 30, description: 'set and get store/retrieve "name"="Alice" and "age"=30', got: 'name=' + map.get('name') + ', age=' + map.get('age') });

  results.push({ pass: map.has('name') === true && map.has('missing') === false, description: 'has("name") is true, has("missing") is false', got: 'name=' + map.has('name') + ', missing=' + map.has('missing') });

  map.set('name', 'Bob');
  results.push({ pass: map.get('name') === 'Bob', description: 'set with existing key updates value: "name" is now "Bob"', got: map.get('name') });

  var deleted = map.delete('age');
  var deleteMissing = map.delete('nonexistent');
  results.push({ pass: deleted === true && map.get('age') === undefined && deleteMissing === false, description: 'delete("age") returns true and removes it, delete("nonexistent") returns false', got: 'del=' + deleted + ', get=' + map.get('age') + ', delMissing=' + deleteMissing });

  var map2 = new HM(2);
  map2.set('a', 1); map2.set('b', 2); map2.set('c', 3); map2.set('d', 4);
  results.push({ pass: map2.get('a') === 1 && map2.get('b') === 2 && map2.get('c') === 3 && map2.get('d') === 4, description: 'Handles collisions: 4 keys in 2 buckets all retrieve correctly', got: 'a=' + map2.get('a') + ', b=' + map2.get('b') + ', c=' + map2.get('c') + ', d=' + map2.get('d') });

  var k = map2.keys().sort();
  var v = map2.values().sort();
  results.push({ pass: JSON.stringify(k) === '["a","b","c","d"]' && JSON.stringify(v) === '[1,2,3,4]', description: 'keys() returns all keys, values() returns all values', got: 'keys=' + JSON.stringify(k) + ', vals=' + JSON.stringify(v) });

  map2.delete('b');
  results.push({ pass: map2.get('b') === undefined && map2.get('a') === 1 && map2.get('c') === 3, description: 'After deleting "b", other keys in same bucket still work', got: 'b=' + map2.get('b') + ', a=' + map2.get('a') + ', c=' + map2.get('c') });

  var map3 = new HM();
  map3.set('x', 0); map3.set('y', null); map3.set('z', '');
  results.push({ pass: map3.get('x') === 0 && map3.get('z') === '', description: 'Handles falsy values (0, empty string) as stored values', got: 'x=' + map3.get('x') + ', z=' + JSON.stringify(map3.get('z')) });

  return results;
}`,
    hint1:
      'Create an array of buckets (arrays). Use a hash function that converts each character of the key into a number and mods by the bucket count. Each bucket stores `[key, value]` pairs. When two keys hash to the same bucket, they both go in that bucket\'s array — this is called chaining.',
    hint2:
      'Initialize `this.buckets` as an array of empty arrays. For `_hash`, sum each `key.charCodeAt(i)` multiplied by position and mod by bucket size. For `set`, hash the key, then search that bucket for an existing entry with the same key — update it or push a new `[key, value]` pair. For `get`, hash and search the bucket for the matching key.',
    resources: hashMapRes,
  },

  // 5. Binary Search Tree
  {
    id: 1363,
    title: 'Binary Search Tree',
    type: 'js',
    tier: 4,
    category: ['data-structures', 'binary-search-tree'],
    tags: ['class', 'bst', 'tree', 'recursion', 'traversal', 'insert', 'search', 'data-structure'],
    description:
      'Create a `BST` class that implements a binary search tree. Each node has a `value`, `left`, and `right` property. The constructor initializes the tree with a `root` of `null`. Implement these methods: `insert(value)` adds a value to the correct position (left if less than, right if greater than or equal to the current node); `contains(value)` returns `true` if the value exists in the tree; `min()` returns the smallest value (or `null` for empty tree); `max()` returns the largest value (or `null` for empty tree); `inOrder()` returns an array of values using in-order traversal (left, root, right — produces sorted output); `count()` returns the total number of nodes.',
    starterCode: '',
    solution:
      'class BST {\n  constructor() {\n    this.root = null;\n  }\n  insert(value) {\n    var node = { value: value, left: null, right: null };\n    if (!this.root) {\n      this.root = node;\n      return;\n    }\n    var current = this.root;\n    while (true) {\n      if (value < current.value) {\n        if (!current.left) { current.left = node; return; }\n        current = current.left;\n      } else {\n        if (!current.right) { current.right = node; return; }\n        current = current.right;\n      }\n    }\n  }\n  contains(value) {\n    var current = this.root;\n    while (current) {\n      if (value === current.value) return true;\n      if (value < current.value) current = current.left;\n      else current = current.right;\n    }\n    return false;\n  }\n  min() {\n    if (!this.root) return null;\n    var current = this.root;\n    while (current.left) current = current.left;\n    return current.value;\n  }\n  max() {\n    if (!this.root) return null;\n    var current = this.root;\n    while (current.right) current = current.right;\n    return current.value;\n  }\n  inOrder() {\n    var result = [];\n    function traverse(node) {\n      if (!node) return;\n      traverse(node.left);\n      result.push(node.value);\n      traverse(node.right);\n    }\n    traverse(this.root);\n    return result;\n  }\n  count() {\n    function countNodes(node) {\n      if (!node) return 0;\n      return 1 + countNodes(node.left) + countNodes(node.right);\n    }\n    return countNodes(this.root);\n  }\n}',
    testRunner: `(code) => {
  var Tree = new Function(code + '; return BST;')();
  var results = [];

  var t = new Tree();
  results.push({ pass: t.root === null && t.count() === 0 && t.min() === null && t.max() === null, description: 'New BST has null root, count 0, min/max return null', got: 'root=' + t.root + ', count=' + t.count() });

  t.insert(10); t.insert(5); t.insert(15); t.insert(3); t.insert(7);
  results.push({ pass: t.root.value === 10 && t.root.left.value === 5 && t.root.right.value === 15, description: 'insert builds correct structure: root=10, left=5, right=15', got: 'root=' + t.root.value + ', left=' + t.root.left.value + ', right=' + t.root.right.value });

  results.push({ pass: t.contains(7) === true && t.contains(15) === true && t.contains(99) === false, description: 'contains(7) true, contains(15) true, contains(99) false', got: 'c7=' + t.contains(7) + ', c15=' + t.contains(15) + ', c99=' + t.contains(99) });

  results.push({ pass: t.min() === 3 && t.max() === 15, description: 'min() returns 3, max() returns 15', got: 'min=' + t.min() + ', max=' + t.max() });

  results.push({ pass: JSON.stringify(t.inOrder()) === '[3,5,7,10,15]', description: 'inOrder() returns sorted [3,5,7,10,15]', got: JSON.stringify(t.inOrder()) });

  results.push({ pass: t.count() === 5, description: 'count() returns 5 for 5 inserted nodes', got: String(t.count()) });

  t.insert(5);
  results.push({ pass: t.count() === 6 && t.inOrder().filter(function(v) { return v === 5; }).length === 2, description: 'Duplicate insert(5) adds second 5, count is 6', got: 'count=' + t.count() + ', inOrder=' + JSON.stringify(t.inOrder()) });

  var t2 = new Tree();
  t2.insert(1); t2.insert(2); t2.insert(3); t2.insert(4);
  results.push({ pass: JSON.stringify(t2.inOrder()) === '[1,2,3,4]' && t2.min() === 1 && t2.max() === 4, description: 'Ascending inserts create right-leaning tree, inOrder still sorted', got: 'inOrder=' + JSON.stringify(t2.inOrder()) });

  return results;
}`,
    hint1:
      'A BST organizes values so that everything less than a node goes left, everything greater goes right. To insert, start at the root and walk left or right until you find an empty spot. For in-order traversal, recursively visit left, then current, then right — this produces sorted output.',
    hint2:
      'For `insert`, create a node object and if root is null, set it as root. Otherwise, loop: compare value to current node, go left if smaller, right if larger, and insert when you reach a null spot. For `inOrder`, use a recursive helper: call itself on `node.left`, push `node.value`, then call itself on `node.right`.',
    resources: bstRes,
  },

  // 6. Graph (Adjacency List)
  {
    id: 1364,
    title: 'Graph with Traversal',
    type: 'js',
    tier: 4,
    category: ['data-structures', 'graph'],
    tags: ['class', 'graph', 'adjacency-list', 'bfs', 'dfs', 'traversal', 'data-structure'],
    description:
      'Create a `Graph` class that implements an undirected graph using an adjacency list. The constructor initializes an empty graph. Implement these methods: `addVertex(vertex)` adds a vertex (does nothing if it already exists); `addEdge(v1, v2)` adds an undirected edge between two vertices (does nothing if the edge already exists or vertices do not exist); `getNeighbors(vertex)` returns an array of adjacent vertices (or empty array if vertex does not exist); `hasVertex(vertex)` returns `true` if the vertex exists; `hasEdge(v1, v2)` returns `true` if an edge exists between the two vertices; `bfs(start)` performs breadth-first search from the start vertex and returns an array of vertices in the order visited (returns empty array if start does not exist); `dfs(start)` performs depth-first search from the start vertex and returns an array of vertices in the order visited (returns empty array if start does not exist).',
    starterCode: '',
    solution:
      'class Graph {\n  constructor() {\n    this.adjacencyList = {};\n  }\n  addVertex(vertex) {\n    if (!this.adjacencyList[vertex]) {\n      this.adjacencyList[vertex] = [];\n    }\n  }\n  addEdge(v1, v2) {\n    if (!this.adjacencyList[v1] || !this.adjacencyList[v2]) return;\n    if (this.adjacencyList[v1].indexOf(v2) === -1) {\n      this.adjacencyList[v1].push(v2);\n    }\n    if (this.adjacencyList[v2].indexOf(v1) === -1) {\n      this.adjacencyList[v2].push(v1);\n    }\n  }\n  getNeighbors(vertex) {\n    return this.adjacencyList[vertex] || [];\n  }\n  hasVertex(vertex) {\n    return !!this.adjacencyList[vertex];\n  }\n  hasEdge(v1, v2) {\n    if (!this.adjacencyList[v1]) return false;\n    return this.adjacencyList[v1].indexOf(v2) !== -1;\n  }\n  bfs(start) {\n    if (!this.adjacencyList[start]) return [];\n    var visited = {};\n    var queue = [start];\n    var result = [];\n    visited[start] = true;\n    while (queue.length > 0) {\n      var vertex = queue.shift();\n      result.push(vertex);\n      var neighbors = this.adjacencyList[vertex];\n      for (var i = 0; i < neighbors.length; i++) {\n        if (!visited[neighbors[i]]) {\n          visited[neighbors[i]] = true;\n          queue.push(neighbors[i]);\n        }\n      }\n    }\n    return result;\n  }\n  dfs(start) {\n    if (!this.adjacencyList[start]) return [];\n    var visited = {};\n    var result = [];\n    var self = this;\n    function traverse(vertex) {\n      visited[vertex] = true;\n      result.push(vertex);\n      var neighbors = self.adjacencyList[vertex];\n      for (var i = 0; i < neighbors.length; i++) {\n        if (!visited[neighbors[i]]) {\n          traverse(neighbors[i]);\n        }\n      }\n    }\n    traverse(start);\n    return result;\n  }\n}',
    testRunner: `(code) => {
  var G = new Function(code + '; return Graph;')();
  var results = [];

  var g = new G();
  g.addVertex('A'); g.addVertex('B'); g.addVertex('C'); g.addVertex('D');
  results.push({ pass: g.hasVertex('A') === true && g.hasVertex('B') === true && g.hasVertex('Z') === false, description: 'addVertex creates vertices, hasVertex("A") true, hasVertex("Z") false', got: 'A=' + g.hasVertex('A') + ', Z=' + g.hasVertex('Z') });

  g.addEdge('A', 'B'); g.addEdge('A', 'C'); g.addEdge('B', 'D');
  results.push({ pass: g.hasEdge('A', 'B') === true && g.hasEdge('B', 'A') === true && g.hasEdge('A', 'D') === false, description: 'Undirected edges: A-B exists both ways, A-D does not exist', got: 'AB=' + g.hasEdge('A', 'B') + ', BA=' + g.hasEdge('B', 'A') + ', AD=' + g.hasEdge('A', 'D') });

  var neighborsA = g.getNeighbors('A').sort();
  results.push({ pass: JSON.stringify(neighborsA) === '["B","C"]', description: 'getNeighbors("A") returns ["B","C"]', got: JSON.stringify(neighborsA) });

  g.addEdge('A', 'B');
  var neighborsA2 = g.getNeighbors('A');
  var bCount = neighborsA2.filter(function(n) { return n === 'B'; }).length;
  results.push({ pass: bCount === 1, description: 'Duplicate addEdge("A","B") does not create second edge', got: 'B count in A neighbors: ' + bCount });

  g.addEdge('A', 'Z');
  results.push({ pass: g.hasEdge('A', 'Z') === false && g.getNeighbors('Z').length === 0, description: 'addEdge with non-existent vertex does nothing', got: 'AZ=' + g.hasEdge('A', 'Z') });

  g.addEdge('B', 'C'); g.addEdge('C', 'D');
  var bfsResult = g.bfs('A');
  results.push({ pass: bfsResult[0] === 'A' && bfsResult.length === 4 && bfsResult.indexOf('A') !== -1 && bfsResult.indexOf('B') !== -1 && bfsResult.indexOf('C') !== -1 && bfsResult.indexOf('D') !== -1, description: 'bfs("A") visits all 4 vertices starting with A', got: JSON.stringify(bfsResult) });

  var dfsResult = g.dfs('A');
  results.push({ pass: dfsResult[0] === 'A' && dfsResult.length === 4 && dfsResult.indexOf('A') !== -1 && dfsResult.indexOf('B') !== -1 && dfsResult.indexOf('C') !== -1 && dfsResult.indexOf('D') !== -1, description: 'dfs("A") visits all 4 vertices starting with A', got: JSON.stringify(dfsResult) });

  results.push({ pass: JSON.stringify(g.bfs('X')) === '[]' && JSON.stringify(g.dfs('X')) === '[]', description: 'bfs and dfs with non-existent vertex return empty array', got: 'bfs=' + JSON.stringify(g.bfs('X')) + ', dfs=' + JSON.stringify(g.dfs('X')) });

  return results;
}`,
    hint1:
      'Store the graph as an object where each key is a vertex and each value is an array of neighbor vertices. For BFS, use a queue (process first-in, first-out) with a visited set. For DFS, use recursion or a stack (process last-in, first-out) with a visited set.',
    hint2:
      'Use `this.adjacencyList = {}` where each key maps to an array of neighbors. For `addEdge`, push v2 into v1\'s array and v1 into v2\'s array (undirected). For BFS, start with the start vertex in a queue, mark it visited, then loop: shift from queue, push to result, add unvisited neighbors to queue. For DFS, use a recursive function that marks the vertex visited, pushes to result, then recurses on unvisited neighbors.',
    resources: graphRes,
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
    `T4 Data Structures — Section 6: ${exercises.length} exercises (IDs ${exercises[0].id}-${exercises[exercises.length - 1].id})`
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
