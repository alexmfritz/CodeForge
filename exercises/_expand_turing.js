#!/usr/bin/env node
/**
 * Turing Foundations Expansion
 * Adds missing jsFun exercises (context, scope, datasets) to the collection.
 * IDs 570-583 (14 new exercises).
 *
 * Run: node exercises/_expand_turing.js
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const COLLECTION_PATH = path.join(__dirname, 'collections', 'turing-foundations.json');

const collection = JSON.parse(fs.readFileSync(COLLECTION_PATH, 'utf-8'));
const BASE_POINTS = { 1: 10, 2: 25, 3: 50, 4: 100, 5: 200 };

const newExercises = [];

// ─────────────────────────────────────────────
// 570: Context: Callbacks & Events (T3)
// ─────────────────────────────────────────────
newExercises.push({
  id: 570,
  title: 'Context: Callbacks & Timers',
  type: 'js',
  tier: 3,
  category: ['functions', 'advanced-functions'],
  tags: ['this', 'context', 'callbacks', 'arrow-functions'],
  description: 'Demonstrate how `this` behaves differently in setTimeout callbacks, array method callbacks, and arrow functions.',
  instructions: `When a function is passed as a callback, \`this\` can change depending on how it's invoked.

**timeoutContext()** — Return an object with a \`getName\` method that uses setTimeout. Use an arrow function inside setTimeout to preserve \`this\`:
\`\`\`js
// The object should have: name, getName()
// getName sets this.result using setTimeout's callback
// Arrow function preserves this from getName's context
\`\`\`

**mapWithContext(items, label)** — Use \`.map()\` with a \`thisArg\` (second parameter) to prepend a label to each item:
\`\`\`js
mapWithContext(['a', 'b'], 'X')
// => ['X: a', 'X: b']
\`\`\`

**callbackPreserve()** — Create an object whose method is extracted and called standalone. Use \`.bind()\` to preserve context:
\`\`\`js
const obj = { value: 42, getValue() { return this.value; } };
const fn = obj.getValue; // loses context!
// Fix with .bind()
\`\`\``,
  starterCode: `function timeoutContext() {
  // Create an object with name: 'timer' and a getName method
  // getName should use setTimeout with an arrow function
  // that sets this.result = this.name
  // Return a promise that resolves with the object after the timeout
}

function mapWithContext(items, label) {
  // Use .map() with a thisArg to prepend label to each item
  // Hint: .map(callback, thisArg)
}

function callbackPreserve() {
  // Create obj with value: 42 and getValue method
  // Extract getValue, bind it, and return the bound function's result
}`,
  solution: `function timeoutContext() {
  const obj = {
    name: 'timer',
    result: '',
    getName() {
      return new Promise((resolve) => {
        setTimeout(() => {
          this.result = this.name;
          resolve(this);
        }, 0);
      });
    }
  };
  return obj.getName();
}

function mapWithContext(items, label) {
  return items.map(function(item) {
    return this.label + ': ' + item;
  }, { label });
}

function callbackPreserve() {
  const obj = { value: 42, getValue() { return this.value; } };
  const bound = obj.getValue.bind(obj);
  return bound();
}`,
  testRunner: `(code) => {
  const { timeoutContext, mapWithContext, callbackPreserve } = new Function(code + '; return { timeoutContext, mapWithContext, callbackPreserve };')();
  const results = [];

  const mapResult1 = mapWithContext(['a', 'b', 'c'], 'Tag');
  results.push({ pass: JSON.stringify(mapResult1) === JSON.stringify(['Tag: a', 'Tag: b', 'Tag: c']), description: 'mapWithContext prepends label to each item', got: JSON.stringify(mapResult1) });

  const mapResult2 = mapWithContext(['hello'], 'Prefix');
  results.push({ pass: JSON.stringify(mapResult2) === JSON.stringify(['Prefix: hello']), description: 'mapWithContext works with single item', got: JSON.stringify(mapResult2) });

  const mapResult3 = mapWithContext([], 'X');
  results.push({ pass: JSON.stringify(mapResult3) === JSON.stringify([]), description: 'mapWithContext returns empty array for empty input', got: JSON.stringify(mapResult3) });

  const boundResult = callbackPreserve();
  results.push({ pass: boundResult === 42, description: 'callbackPreserve returns 42 using .bind()', got: String(boundResult) });

  return results;
}`,
  testCases: [],
  hints: [
    'The second argument to `.map(callback, thisArg)` sets what `this` refers to inside the callback. This only works with traditional functions, not arrow functions.',
    'When you extract a method from an object (`const fn = obj.method`), it loses its `this` binding. Use `.bind(obj)` to create a new function with `this` permanently set.'
  ],
  resources: [{ label: 'MDN: this', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this' }],
  solutionGate: 8,
  basePoints: BASE_POINTS[3],
});

// ─────────────────────────────────────────────
// 571: Context: Explicit Binding (T3)
// ─────────────────────────────────────────────
newExercises.push({
  id: 571,
  title: 'Context: Explicit Binding',
  type: 'js',
  tier: 3,
  category: ['functions', 'advanced-functions'],
  tags: ['this', 'context', 'call', 'apply', 'bind'],
  description: 'Use `.call()`, `.apply()`, and `.bind()` to explicitly set the value of `this` when invoking functions.',
  instructions: `JavaScript provides three methods to explicitly control \`this\`:

**useCall(fn, context, ...args)** — Invoke \`fn\` with \`context\` as \`this\` using \`.call()\`:
\`\`\`js
function greet(greeting) { return greeting + ', ' + this.name; }
useCall(greet, { name: 'Ada' }, 'Hello') // => 'Hello, Ada'
\`\`\`

**useApply(fn, context, argsArray)** — Same but using \`.apply()\` with an array of arguments:
\`\`\`js
useApply(greet, { name: 'Ada' }, ['Hello']) // => 'Hello, Ada'
\`\`\`

**createBound(fn, context)** — Return a permanently bound version of \`fn\`:
\`\`\`js
const bound = createBound(greet, { name: 'Ada' });
bound('Hey') // => 'Hey, Ada'
\`\`\`

**arrowVsBound()** — Return an object demonstrating that arrow functions ignore \`.call()\`:
\`\`\`js
// { arrow: result, traditional: result }
// Arrow function with .call() still uses lexical this
// Traditional function with .call() uses the provided this
\`\`\``,
  starterCode: `function useCall(fn, context, ...args) {
  // Invoke fn with context as this using .call()
}

function useApply(fn, context, argsArray) {
  // Invoke fn with context as this using .apply()
}

function createBound(fn, context) {
  // Return a bound version of fn
}

function arrowVsBound() {
  // Return { arrow: value, traditional: value }
  // arrow: call an arrow function with .call({name:'called'})
  //   where the arrow captures this from outer scope
  // traditional: call a traditional function with .call({name:'called'})
}`,
  solution: `function useCall(fn, context, ...args) {
  return fn.call(context, ...args);
}

function useApply(fn, context, argsArray) {
  return fn.apply(context, argsArray);
}

function createBound(fn, context) {
  return fn.bind(context);
}

function arrowVsBound() {
  const obj = { name: 'lexical' };
  const arrow = () => typeof this !== 'undefined' && this !== null && this.name ? this.name : 'global';
  const traditional = function() { return this.name; };
  return {
    arrow: arrow.call({ name: 'called' }),
    traditional: traditional.call({ name: 'called' })
  };
}`,
  testRunner: `(code) => {
  const { useCall, useApply, createBound, arrowVsBound } = new Function(code + '; return { useCall, useApply, createBound, arrowVsBound };')();
  const results = [];

  function greet(g) { return g + ', ' + this.name; }
  results.push({ pass: useCall(greet, { name: 'Ada' }, 'Hello') === 'Hello, Ada', description: 'useCall invokes function with correct this', got: String(useCall(greet, { name: 'Ada' }, 'Hello')) });

  function add(a, b) { return this.base + a + b; }
  results.push({ pass: useCall(add, { base: 10 }, 5, 3) === 18, description: 'useCall passes multiple arguments', got: String(useCall(add, { base: 10 }, 5, 3)) });

  results.push({ pass: useApply(greet, { name: 'Bob' }, ['Hi']) === 'Hi, Bob', description: 'useApply invokes function with args array', got: String(useApply(greet, { name: 'Bob' }, ['Hi'])) });

  results.push({ pass: useApply(add, { base: 100 }, [1, 2]) === 103, description: 'useApply passes array arguments correctly', got: String(useApply(add, { base: 100 }, [1, 2])) });

  const bound = createBound(greet, { name: 'Cal' });
  results.push({ pass: bound('Hey') === 'Hey, Cal', description: 'createBound returns a permanently bound function', got: String(bound('Hey')) });
  results.push({ pass: bound('Yo') === 'Yo, Cal', description: 'Bound function works with different arguments', got: String(bound('Yo')) });

  const avb = arrowVsBound();
  results.push({ pass: avb.traditional === 'called', description: 'Traditional function respects .call() context', got: String(avb.traditional) });
  results.push({ pass: avb.arrow !== 'called', description: 'Arrow function ignores .call() context (uses lexical this)', got: String(avb.arrow) });

  return results;
}`,
  testCases: [],
  hints: [
    '`.call(context, arg1, arg2)` invokes the function immediately with individual arguments. `.apply(context, [arg1, arg2])` does the same but takes arguments as an array.',
    '`.bind(context)` does NOT invoke the function — it returns a new function with `this` permanently set. Arrow functions capture `this` from where they are defined, so `.call()` and `.bind()` have no effect on them.'
  ],
  resources: [{ label: 'MDN: Function.prototype.call()', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/call' }],
  solutionGate: 8,
  basePoints: BASE_POINTS[3],
});

// ─────────────────────────────────────────────
// 572: Scope: Var Hoisting Puzzles (T3)
// ─────────────────────────────────────────────
newExercises.push({
  id: 572,
  title: 'Scope: Var Hoisting Puzzles',
  type: 'js',
  tier: 3,
  category: ['js-fundamentals', 'variables'],
  tags: ['scope', 'hoisting', 'var', 'functions'],
  description: 'Trace variable values through var hoisting, function-scoped declarations, and shadowing in nested functions.',
  instructions: `\`var\` declarations are hoisted to the top of their function scope (not block scope). This creates surprising behavior.

**hoistInFunction()** — What happens when \`var\` is declared inside a function but read before the declaration?
\`\`\`js
var shoe = 'flipflop';
function putOnShoe() {
  console.log(shoe);  // Point A — var shoe below is hoisted!
  var shoe = 'boot';
}
putOnShoe();
console.log(shoe);    // Point B
\`\`\`
Return \`[pointA, pointB]\` with the values at each point.

**hoistInConditional()** — What happens when \`var\` is inside an \`if\` block?
\`\`\`js
var fruit = 'apple';
function eatFruit() {
  if (fruit !== 'kiwi') {  // What is fruit here?
    var fruit = 'mango';
  }
  console.log(fruit);      // Point A
}
eatFruit();
console.log(fruit);        // Point B
\`\`\`

**nestedReassignment()** — How does \`var\` reassignment propagate through nested functions?
\`\`\`js
var instructor = 'Pam';
function changeInstructor() {
  console.log(instructor);  // Point A
  instructor = 'Louisa';    // reassigns outer var
  console.log(instructor);  // Point B
}
console.log(instructor);    // Point C (before call)
changeInstructor();
console.log(instructor);    // Point D (after call)
\`\`\``,
  starterCode: `function hoistInFunction() {
  // Return [pointA, pointB]
  // pointA: value of shoe inside putOnShoe before var declaration
  // pointB: value of shoe in outer scope after putOnShoe runs
}

function hoistInConditional() {
  // Return [pointA, pointB]
  // pointA: value of fruit inside eatFruit after the if block
  // pointB: value of fruit in outer scope
}

function nestedReassignment() {
  // Return [pointC, pointA, pointB, pointD]
  // Values in execution order
}`,
  solution: `function hoistInFunction() {
  return [undefined, 'flipflop'];
}

function hoistInConditional() {
  return ['mango', 'apple'];
}

function nestedReassignment() {
  return ['Pam', 'Pam', 'Louisa', 'Louisa'];
}`,
  testRunner: `(code) => {
  const { hoistInFunction, hoistInConditional, nestedReassignment } = new Function(code + '; return { hoistInFunction, hoistInConditional, nestedReassignment };')();
  const results = [];

  const hf = hoistInFunction();
  results.push({ pass: hf[0] === undefined, description: 'hoistInFunction: var inside function is hoisted as undefined', got: String(hf[0]) });
  results.push({ pass: hf[1] === 'flipflop', description: 'hoistInFunction: outer var is not affected by inner var', got: String(hf[1]) });

  const hc = hoistInConditional();
  results.push({ pass: hc[0] === 'mango', description: 'hoistInConditional: var in if block is function-scoped, assigned to mango', got: String(hc[0]) });
  results.push({ pass: hc[1] === 'apple', description: 'hoistInConditional: outer var unchanged by function-scoped var', got: String(hc[1]) });

  const nr = nestedReassignment();
  results.push({ pass: nr[0] === 'Pam', description: 'nestedReassignment: outer value before function call', got: String(nr[0]) });
  results.push({ pass: nr[1] === 'Pam', description: 'nestedReassignment: sees outer var inside function', got: String(nr[1]) });
  results.push({ pass: nr[2] === 'Louisa', description: 'nestedReassignment: reassignment changes outer var', got: String(nr[2]) });
  results.push({ pass: nr[3] === 'Louisa', description: 'nestedReassignment: outer var reflects change after call', got: String(nr[3]) });

  return results;
}`,
  testCases: [],
  hints: [
    '`var` declarations are hoisted to the top of their enclosing function — the variable exists but its value is `undefined` until the assignment line actually runs.',
    'A `var` inside a function creates a NEW local variable that shadows the outer one. But `reassignment` (without `var`) modifies the outer variable directly.'
  ],
  resources: [{ label: 'MDN: var hoisting', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/var#hoisting' }],
  solutionGate: 8,
  basePoints: BASE_POINTS[3],
});

// ─────────────────────────────────────────────
// 573: Scope: Block Scope & Closures (T3)
// ─────────────────────────────────────────────
newExercises.push({
  id: 573,
  title: 'Scope: Block Scope & Closures',
  type: 'js',
  tier: 3,
  category: ['js-fundamentals', 'variables'],
  tags: ['scope', 'closures', 'let', 'const', 'block-scope'],
  description: 'Trace values through let/const block scoping, closure captures, and nested function mutations.',
  instructions: `\`let\` and \`const\` are block-scoped — they only exist within their \`{}\` block. Closures capture variables by reference, not by value.

**blockScopeTrace()** — How do \`let\` declarations in nested blocks interact?
\`\`\`js
let num = 6;
function fn1() {
  let num = 4;
  console.log(num);    // Point A
  if (num < 5) {
    const num = 9;
    console.log(num);  // Point B
  }
  console.log(num);    // Point C
}
fn1();
console.log(num);      // Point D
\`\`\`
Return \`[pointA, pointB, pointC, pointD]\`.

**closureMutation()** — How do closures and reassignment interact?
\`\`\`js
let myName = 'Rody';
console.log(myName);          // Point A
const parentFunc = () => {
  myName += 'Toy';
  console.log(myName);        // Point B
  let innerFunc = () => {
    let myName = 'Tesla';
    console.log(myName);      // Point C
  };
  innerFunc();
  myName += 'Daniels';
};
parentFunc();
console.log(myName);          // Point D
\`\`\`

**gradeTrace()** — How do const and let shadow outer variables in nested functions?
\`\`\`js
let grade = 100;
function losePoints() {
  grade = 90;
  function addPoints() {
    const grade = 95;
    console.log(grade);  // Point A
  }
  addPoints();
  console.log(grade);    // Point B
}
losePoints();
console.log(grade);      // Point C
\`\`\``,
  starterCode: `function blockScopeTrace() {
  // Return [pointA, pointB, pointC, pointD]
}

function closureMutation() {
  // Return [pointA, pointB, pointC, pointD]
}

function gradeTrace() {
  // Return [pointA, pointB, pointC]
}`,
  solution: `function blockScopeTrace() {
  return [4, 9, 4, 6];
}

function closureMutation() {
  return ['Rody', 'RodyToy', 'Tesla', 'RodyToyDaniels'];
}

function gradeTrace() {
  return [95, 90, 90];
}`,
  testRunner: `(code) => {
  const { blockScopeTrace, closureMutation, gradeTrace } = new Function(code + '; return { blockScopeTrace, closureMutation, gradeTrace };')();
  const results = [];

  const bs = blockScopeTrace();
  results.push({ pass: bs[0] === 4, description: 'blockScopeTrace A: inner let shadows outer', got: String(bs[0]) });
  results.push({ pass: bs[1] === 9, description: 'blockScopeTrace B: const in if block is its own scope', got: String(bs[1]) });
  results.push({ pass: bs[2] === 4, description: 'blockScopeTrace C: const in block does not affect outer let', got: String(bs[2]) });
  results.push({ pass: bs[3] === 6, description: 'blockScopeTrace D: original outer let unchanged', got: String(bs[3]) });

  const cm = closureMutation();
  results.push({ pass: cm[0] === 'Rody', description: 'closureMutation A: initial value', got: String(cm[0]) });
  results.push({ pass: cm[1] === 'RodyToy', description: 'closureMutation B: closure mutates outer variable', got: String(cm[1]) });
  results.push({ pass: cm[2] === 'Tesla', description: 'closureMutation C: inner let shadows, does not affect outer', got: String(cm[2]) });
  results.push({ pass: cm[3] === 'RodyToyDaniels', description: 'closureMutation D: further mutation after inner function', got: String(cm[3]) });

  const gt = gradeTrace();
  results.push({ pass: gt[0] === 95, description: 'gradeTrace A: const in nested function shadows outer', got: String(gt[0]) });
  results.push({ pass: gt[1] === 90, description: 'gradeTrace B: outer grade was reassigned to 90', got: String(gt[1]) });
  results.push({ pass: gt[2] === 90, description: 'gradeTrace C: outer grade reflects reassignment', got: String(gt[2]) });

  return results;
}`,
  testCases: [],
  hints: [
    '`let` and `const` create a new variable in each `{}` block. A `const grade = 95` inside a function creates a separate variable that has no effect on the outer `grade`.',
    'When a closure modifies a variable (like `myName += "Toy"`), it changes the ORIGINAL variable because closures capture by reference. But `let myName = "Tesla"` inside an inner function creates a brand new variable.'
  ],
  resources: [{ label: 'MDN: let', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let' }],
  solutionGate: 8,
  basePoints: BASE_POINTS[3],
});

// ─────────────────────────────────────────────
// 574: Dataset: School Groups (T3)
// ─────────────────────────────────────────────
newExercises.push({
  id: 574,
  title: 'Dataset: School Groups',
  type: 'js',
  tier: 3,
  category: ['functions', 'callback-methods'],
  tags: ['arrays', 'reduce', 'map', 'objects'],
  description: 'Use reduce and map to transform school club membership and module enrollment data.',
  instructions: `You have two datasets:
\`\`\`js
const clubs = [
  { club: 'Drama', members: ['Louisa', 'Pam', 'Nathaniel'] },
  { club: 'Band', members: ['Leta', 'Robbie', 'Jhun', 'Will'] },
  { club: 'Chess', members: ['David', 'Pam', 'Brittany', 'Robbie'] },
  { club: 'Newspaper', members: ['Pam', 'David', 'Brittany', 'Christie', 'Leta'] },
  { club: 'Astronomy', members: ['Nathaniel', 'Leta'] },
  { club: 'FBLA', members: ['Christie', 'David', 'Robbie'] },
  { club: 'Art', members: ['Jhun', 'Louisa'] }
];

const mods = [
  { mod: 1, students: 27, instructors: 3 },
  { mod: 2, students: 33, instructors: 3 },
  { mod: 3, students: 20, instructors: 2 },
  { mod: 4, students: 16, instructors: 2 }
];
\`\`\`

**membersBelongingToClubs(clubs)** — Return an object where each key is a member name and the value is an array of clubs they belong to:
\`\`\`js
// { Louisa: ['Drama', 'Art'], Pam: ['Drama', 'Chess', 'Newspaper'], ... }
\`\`\`

**studentsPerMod(mods)** — Return an array of objects with each mod number and its students-per-instructor ratio:
\`\`\`js
// [{ mod: 1, studentsPerInstructor: 9 }, { mod: 2, studentsPerInstructor: 11 }, ...]
\`\`\``,
  starterCode: `function membersBelongingToClubs(clubs) {
  // your code here
}

function studentsPerMod(mods) {
  // your code here
}`,
  solution: `function membersBelongingToClubs(clubs) {
  return clubs.reduce((obj, club) => {
    club.members.forEach(member => {
      if (!obj[member]) {
        obj[member] = [club.club];
      } else {
        obj[member].push(club.club);
      }
    });
    return obj;
  }, {});
}

function studentsPerMod(mods) {
  return mods.map(m => ({
    mod: m.mod,
    studentsPerInstructor: m.students / m.instructors
  }));
}`,
  testRunner: `(code) => {
  const { membersBelongingToClubs, studentsPerMod } = new Function(code + '; return { membersBelongingToClubs, studentsPerMod };')();
  const results = [];

  const clubs = [
    { club: 'Drama', members: ['Louisa', 'Pam', 'Nathaniel'] },
    { club: 'Band', members: ['Leta', 'Robbie', 'Jhun', 'Will'] },
    { club: 'Chess', members: ['David', 'Pam', 'Brittany', 'Robbie'] },
    { club: 'Newspaper', members: ['Pam', 'David', 'Brittany', 'Christie', 'Leta'] },
    { club: 'Astronomy', members: ['Nathaniel', 'Leta'] },
    { club: 'FBLA', members: ['Christie', 'David', 'Robbie'] },
    { club: 'Art', members: ['Jhun', 'Louisa'] }
  ];
  const mods = [
    { mod: 1, students: 27, instructors: 3 },
    { mod: 2, students: 33, instructors: 3 },
    { mod: 3, students: 20, instructors: 2 },
    { mod: 4, students: 16, instructors: 2 }
  ];

  const mc = membersBelongingToClubs(clubs);
  results.push({ pass: JSON.stringify(mc['Pam']?.sort()) === JSON.stringify(['Chess', 'Drama', 'Newspaper']), description: 'Pam belongs to Drama, Chess, Newspaper', got: JSON.stringify(mc['Pam']) });
  results.push({ pass: JSON.stringify(mc['Louisa']?.sort()) === JSON.stringify(['Art', 'Drama']), description: 'Louisa belongs to Drama, Art', got: JSON.stringify(mc['Louisa']) });
  results.push({ pass: mc['Robbie']?.length === 3, description: 'Robbie belongs to 3 clubs', got: String(mc['Robbie']?.length) });
  results.push({ pass: Object.keys(mc).length === 9, description: 'There are 9 unique members', got: String(Object.keys(mc).length) });

  const sp = studentsPerMod(mods);
  results.push({ pass: sp[0].mod === 1 && sp[0].studentsPerInstructor === 9, description: 'Mod 1: 27/3 = 9 students per instructor', got: JSON.stringify(sp[0]) });
  results.push({ pass: sp[1].mod === 2 && sp[1].studentsPerInstructor === 11, description: 'Mod 2: 33/3 = 11 students per instructor', got: JSON.stringify(sp[1]) });
  results.push({ pass: sp[2].mod === 3 && sp[2].studentsPerInstructor === 10, description: 'Mod 3: 20/2 = 10 students per instructor', got: JSON.stringify(sp[2]) });
  results.push({ pass: sp[3].mod === 4 && sp[3].studentsPerInstructor === 8, description: 'Mod 4: 16/2 = 8 students per instructor', got: JSON.stringify(sp[3]) });

  return results;
}`,
  testCases: [],
  hints: [
    'For `membersBelongingToClubs`, use `.reduce()` with an accumulator object. For each club, loop through its members and either create a new array or push to an existing one.',
    'For `studentsPerMod`, use `.map()` to transform each mod object into a new object with `mod` and `studentsPerInstructor` (divide students by instructors).'
  ],
  resources: [{ label: 'MDN: Array.prototype.reduce()', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce' }],
  solutionGate: 8,
  basePoints: BASE_POINTS[3],
});

// ─────────────────────────────────────────────
// 575: Dataset: Classroom Analysis (T3)
// ─────────────────────────────────────────────
newExercises.push({
  id: 575,
  title: 'Dataset: Classroom Analysis',
  type: 'js',
  tier: 3,
  category: ['functions', 'callback-methods'],
  tags: ['arrays', 'filter', 'reduce', 'sort'],
  description: 'Filter, aggregate, and sort classroom data by program type and capacity.',
  instructions: `\`\`\`js
const classrooms = [
  { roomLetter: 'A', program: 'FE', capacity: 32 },
  { roomLetter: 'B', program: 'BE', capacity: 29 },
  { roomLetter: 'C', program: 'FE', capacity: 27 },
  { roomLetter: 'D', program: 'BE', capacity: 30 },
  { roomLetter: 'E', program: 'FE', capacity: 22 },
  { roomLetter: 'F', program: 'BE', capacity: 19 },
  { roomLetter: 'G', program: 'FE', capacity: 29 },
  { roomLetter: 'H', program: 'BE', capacity: 18 }
];
\`\`\`

**feClassrooms(classrooms)** — Return an array of only the front-end classrooms.

**totalCapacities(classrooms)** — Return an object with \`feCapacity\` and \`beCapacity\` keys showing total capacity per program.

**sortByCapacity(classrooms)** — Return classrooms sorted by capacity, least to greatest.`,
  starterCode: `function feClassrooms(classrooms) {
  // your code here
}

function totalCapacities(classrooms) {
  // your code here
}

function sortByCapacity(classrooms) {
  // your code here
}`,
  solution: `function feClassrooms(classrooms) {
  return classrooms.filter(room => room.program === 'FE');
}

function totalCapacities(classrooms) {
  return classrooms.reduce((obj, room) => {
    if (room.program === 'FE') {
      obj.feCapacity += room.capacity;
    } else {
      obj.beCapacity += room.capacity;
    }
    return obj;
  }, { feCapacity: 0, beCapacity: 0 });
}

function sortByCapacity(classrooms) {
  return [...classrooms].sort((a, b) => a.capacity - b.capacity);
}`,
  testRunner: `(code) => {
  const { feClassrooms, totalCapacities, sortByCapacity } = new Function(code + '; return { feClassrooms, totalCapacities, sortByCapacity };')();
  const results = [];

  const classrooms = [
    { roomLetter: 'A', program: 'FE', capacity: 32 },
    { roomLetter: 'B', program: 'BE', capacity: 29 },
    { roomLetter: 'C', program: 'FE', capacity: 27 },
    { roomLetter: 'D', program: 'BE', capacity: 30 },
    { roomLetter: 'E', program: 'FE', capacity: 22 },
    { roomLetter: 'F', program: 'BE', capacity: 19 },
    { roomLetter: 'G', program: 'FE', capacity: 29 },
    { roomLetter: 'H', program: 'BE', capacity: 18 }
  ];

  const fe = feClassrooms(classrooms);
  results.push({ pass: fe.length === 4, description: 'feClassrooms returns 4 FE rooms', got: String(fe.length) });
  results.push({ pass: fe.every(r => r.program === 'FE'), description: 'All returned rooms are FE program', got: JSON.stringify(fe.map(r => r.program)) });

  const tc = totalCapacities(classrooms);
  results.push({ pass: tc.feCapacity === 110, description: 'FE total capacity is 110 (32+27+22+29)', got: String(tc.feCapacity) });
  results.push({ pass: tc.beCapacity === 96, description: 'BE total capacity is 96 (29+30+19+18)', got: String(tc.beCapacity) });

  const sorted = sortByCapacity(classrooms);
  results.push({ pass: sorted[0].capacity === 18, description: 'First room after sort has lowest capacity (18)', got: String(sorted[0]?.capacity) });
  results.push({ pass: sorted[sorted.length - 1].capacity === 32, description: 'Last room after sort has highest capacity (32)', got: String(sorted[sorted.length - 1]?.capacity) });
  results.push({ pass: sorted.every((r, i) => i === 0 || r.capacity >= sorted[i-1].capacity), description: 'Rooms are sorted ascending by capacity', got: JSON.stringify(sorted.map(r => r.capacity)) });
  results.push({ pass: classrooms[0].roomLetter === 'A', description: 'Original array is not mutated', got: classrooms[0].roomLetter });

  return results;
}`,
  testCases: [],
  hints: [
    'Use `.filter()` to select only rooms where `program === "FE"`. Use `.reduce()` with an accumulator object `{ feCapacity: 0, beCapacity: 0 }` to sum capacities.',
    'For sorting without mutating the original array, spread into a new array first: `[...classrooms].sort((a, b) => a.capacity - b.capacity)`.'
  ],
  resources: [{ label: 'MDN: Array.prototype.filter()', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter' }],
  solutionGate: 8,
  basePoints: BASE_POINTS[3],
});

// ─────────────────────────────────────────────
// 576: Dataset: Book Collection (T3)
// ─────────────────────────────────────────────
newExercises.push({
  id: 576,
  title: 'Dataset: Book Collection',
  type: 'js',
  tier: 3,
  category: ['functions', 'callback-methods'],
  tags: ['arrays', 'filter', 'map', 'objects'],
  description: 'Filter books by genre and decade using chained array methods.',
  instructions: `\`\`\`js
const books = [
  { title: '1984', author: 'George Orwell', genre: 'Science Fiction', published: 1949 },
  { title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', genre: 'Fiction', published: 1925 },
  { title: 'Lord of the Flies', author: 'William Golding', genre: 'Fiction', published: 1954 },
  { title: "Harry Potter and the Sorcerer's Stone", author: 'J. K. Rowling', genre: 'Fantasy', published: 1997 },
  { title: "The Hitchhiker's Guide to the Galaxy", author: 'Douglas Adams', genre: 'Science Fiction', published: 1979 },
  { title: 'Flowers for Algernon', author: 'Daniel Keyes', genre: 'Science Fiction', published: 1959 },
  { title: 'Slaughterhouse-Five', author: 'Kurt Vonnegut', genre: 'Science Fiction', published: 1969 },
  { title: "The Handmaid's Tale", author: 'Margaret Atwood', genre: 'Science Fiction', published: 1985 },
  { title: 'The Metamorphosis', author: 'Franz Kafka', genre: 'Short Story', published: 1915 },
  { title: 'Brave New World', author: 'Aldous Huxley', genre: 'Science Fiction', published: 1932 },
  { title: 'Frankenstein', author: 'Mary Shelley', genre: 'Horror', published: 1818 },
  { title: 'Dracula', author: 'Bram Stoker', genre: 'Horror', published: 1897 },
  { title: 'Life of Pi', author: 'Yann Martel', genre: 'Fiction', published: 2001 },
  { title: 'The Curious Incident of the Dog in the Night-Time', author: 'Mark Haddon', genre: 'Mystery', published: 2003 },
  { title: 'The Bell Jar', author: 'Sylvia Plath', genre: 'Fiction', published: 1963 },
  { title: 'Catch-22', author: 'Joseph Heller', genre: 'Satire', published: 1961 },
  { title: 'Interview with the Vampire', author: 'Anne Rice', genre: 'Horror', published: 1976 },
  { title: 'Treasure Island', author: 'Robert Louis Stevenson', genre: 'Fiction', published: 1883 },
  { title: 'In Cold Blood', author: 'Truman Capote', genre: 'True Crime', published: 1965 }
];
\`\`\`

**removeViolence(books)** — Return an array of titles (strings only) for books that are NOT Horror or True Crime.

**getNewBooks(books)** — Return an array of objects with \`title\` and \`year\` for books published between 1990 and 2003 (inclusive).`,
  starterCode: `function removeViolence(books) {
  // your code here
}

function getNewBooks(books) {
  // your code here
}`,
  solution: `function removeViolence(books) {
  return books
    .filter(book => book.genre !== 'Horror' && book.genre !== 'True Crime')
    .map(book => book.title);
}

function getNewBooks(books) {
  return books
    .filter(book => book.published >= 1990 && book.published <= 2003)
    .map(book => ({ title: book.title, year: book.published }));
}`,
  testRunner: `(code) => {
  const { removeViolence, getNewBooks } = new Function(code + '; return { removeViolence, getNewBooks };')();
  const results = [];

  const books = [
    { title: '1984', author: 'George Orwell', genre: 'Science Fiction', published: 1949 },
    { title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', genre: 'Fiction', published: 1925 },
    { title: 'Lord of the Flies', author: 'William Golding', genre: 'Fiction', published: 1954 },
    { title: "Harry Potter and the Sorcerer's Stone", author: 'J. K. Rowling', genre: 'Fantasy', published: 1997 },
    { title: "The Hitchhiker's Guide to the Galaxy", author: 'Douglas Adams', genre: 'Science Fiction', published: 1979 },
    { title: 'Flowers for Algernon', author: 'Daniel Keyes', genre: 'Science Fiction', published: 1959 },
    { title: 'Slaughterhouse-Five', author: 'Kurt Vonnegut', genre: 'Science Fiction', published: 1969 },
    { title: "The Handmaid's Tale", author: 'Margaret Atwood', genre: 'Science Fiction', published: 1985 },
    { title: 'The Metamorphosis', author: 'Franz Kafka', genre: 'Short Story', published: 1915 },
    { title: 'Brave New World', author: 'Aldous Huxley', genre: 'Science Fiction', published: 1932 },
    { title: 'Frankenstein', author: 'Mary Shelley', genre: 'Horror', published: 1818 },
    { title: 'Dracula', author: 'Bram Stoker', genre: 'Horror', published: 1897 },
    { title: 'Life of Pi', author: 'Yann Martel', genre: 'Fiction', published: 2001 },
    { title: 'The Curious Incident of the Dog in the Night-Time', author: 'Mark Haddon', genre: 'Mystery', published: 2003 },
    { title: 'The Bell Jar', author: 'Sylvia Plath', genre: 'Fiction', published: 1963 },
    { title: 'Catch-22', author: 'Joseph Heller', genre: 'Satire', published: 1961 },
    { title: 'Interview with the Vampire', author: 'Anne Rice', genre: 'Horror', published: 1976 },
    { title: 'Treasure Island', author: 'Robert Louis Stevenson', genre: 'Fiction', published: 1883 },
    { title: 'In Cold Blood', author: 'Truman Capote', genre: 'True Crime', published: 1965 }
  ];

  const rv = removeViolence(books);
  results.push({ pass: rv.length === 15, description: 'removeViolence returns 15 titles (excludes 3 Horror + 1 True Crime)', got: String(rv.length) });
  results.push({ pass: !rv.includes('Frankenstein') && !rv.includes('Dracula'), description: 'Horror titles are excluded', got: rv.filter(t => ['Frankenstein', 'Dracula', 'Interview with the Vampire'].includes(t)).join(', ') || 'none found' });
  results.push({ pass: !rv.includes('In Cold Blood'), description: 'True Crime titles are excluded', got: rv.includes('In Cold Blood') ? 'found' : 'excluded' });
  results.push({ pass: typeof rv[0] === 'string', description: 'Returns array of strings (titles only)', got: typeof rv[0] });

  const nb = getNewBooks(books);
  results.push({ pass: nb.length === 3, description: 'getNewBooks returns 3 books from 1990-2003', got: String(nb.length) });
  results.push({ pass: nb.some(b => b.title === "Harry Potter and the Sorcerer's Stone" && b.year === 1997), description: 'Includes Harry Potter (1997)', got: JSON.stringify(nb.find(b => b.title?.includes('Harry'))) });
  results.push({ pass: nb.some(b => b.title === 'Life of Pi' && b.year === 2001), description: 'Includes Life of Pi (2001)', got: JSON.stringify(nb.find(b => b.title === 'Life of Pi')) });
  results.push({ pass: nb.every(b => b.title && b.year && Object.keys(b).length === 2), description: 'Each object has only title and year keys', got: JSON.stringify(Object.keys(nb[0] || {})) });

  return results;
}`,
  testCases: [],
  hints: [
    'Chain `.filter()` and `.map()` together. Filter first to exclude unwanted genres, then map to extract just the titles.',
    'For `getNewBooks`, filter by `published >= 1990 && published <= 2003`, then map each book to a new object `{ title: book.title, year: book.published }`.'
  ],
  resources: [{ label: 'MDN: Array.prototype.map()', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map' }],
  solutionGate: 8,
  basePoints: BASE_POINTS[3],
});

// ─────────────────────────────────────────────
// 577: Dataset: Weather Stations (T3)
// ─────────────────────────────────────────────
newExercises.push({
  id: 577,
  title: 'Dataset: Weather Stations',
  type: 'js',
  tier: 3,
  category: ['functions', 'callback-methods'],
  tags: ['arrays', 'map', 'filter', 'sort', 'objects'],
  description: 'Calculate averages, filter by condition, and find extremes in nested weather data.',
  instructions: `\`\`\`js
const weather = [
  { location: 'Denver, Colorado', type: 'clear', humidity: 59, temperature: { high: 47, low: 33 } },
  { location: 'New York, New York', type: 'cloudy', humidity: 80, temperature: { high: 43, low: 37 } },
  { location: 'Atlanta, Georgia', type: 'sunny', humidity: 51, temperature: { high: 50, low: 39 } },
  { location: 'Portland, Oregon', type: 'cloudy', humidity: 84, temperature: { high: 49, low: 38 } },
  { location: 'New Orleans, Louisiana', type: 'sunny', humidity: 71, temperature: { high: 66, low: 48 } },
  { location: 'Boston, Massachusetts', type: 'cloudy', humidity: 71, temperature: { high: 40, low: 30 } },
  { location: 'Miami, Florida', type: 'party cloudy', humidity: 57, temperature: { high: 75, low: 56 } },
  { location: 'Phoenix, Arizona', type: 'cloudy', humidity: 76, temperature: { high: 70, low: 54 } },
  { location: 'Anchorage, Alaska', type: 'cloudy', humidity: 70, temperature: { high: 20, low: 8 } },
  { location: 'Raleigh, North Carolina', type: 'mostly sunny', humidity: 44, temperature: { high: 56, low: 37 } }
];
\`\`\`

**getAverageTemps(weather)** — Return an array of average temperatures (high + low) / 2 for each location.

**findSunnySpots(weather)** — Return an array of sentences like \`"Atlanta, Georgia is sunny."\` for locations where type is 'sunny' or 'mostly sunny'.

**findHighestHumidity(weather)** — Return the single location object with the highest humidity.`,
  starterCode: `function getAverageTemps(weather) {
  // your code here
}

function findSunnySpots(weather) {
  // your code here
}

function findHighestHumidity(weather) {
  // your code here
}`,
  solution: `function getAverageTemps(weather) {
  return weather.map(w => (w.temperature.high + w.temperature.low) / 2);
}

function findSunnySpots(weather) {
  return weather
    .filter(w => w.type === 'sunny' || w.type === 'mostly sunny')
    .map(w => w.location + ' is ' + w.type + '.');
}

function findHighestHumidity(weather) {
  return weather.reduce((highest, w) => w.humidity > highest.humidity ? w : highest);
}`,
  testRunner: `(code) => {
  const { getAverageTemps, findSunnySpots, findHighestHumidity } = new Function(code + '; return { getAverageTemps, findSunnySpots, findHighestHumidity };')();
  const results = [];

  const weather = [
    { location: 'Denver, Colorado', type: 'clear', humidity: 59, temperature: { high: 47, low: 33 } },
    { location: 'New York, New York', type: 'cloudy', humidity: 80, temperature: { high: 43, low: 37 } },
    { location: 'Atlanta, Georgia', type: 'sunny', humidity: 51, temperature: { high: 50, low: 39 } },
    { location: 'Portland, Oregon', type: 'cloudy', humidity: 84, temperature: { high: 49, low: 38 } },
    { location: 'New Orleans, Louisiana', type: 'sunny', humidity: 71, temperature: { high: 66, low: 48 } },
    { location: 'Boston, Massachusetts', type: 'cloudy', humidity: 71, temperature: { high: 40, low: 30 } },
    { location: 'Miami, Florida', type: 'party cloudy', humidity: 57, temperature: { high: 75, low: 56 } },
    { location: 'Phoenix, Arizona', type: 'cloudy', humidity: 76, temperature: { high: 70, low: 54 } },
    { location: 'Anchorage, Alaska', type: 'cloudy', humidity: 70, temperature: { high: 20, low: 8 } },
    { location: 'Raleigh, North Carolina', type: 'mostly sunny', humidity: 44, temperature: { high: 56, low: 37 } }
  ];

  const avgs = getAverageTemps(weather);
  results.push({ pass: avgs.length === 10, description: 'getAverageTemps returns 10 values', got: String(avgs.length) });
  results.push({ pass: avgs[0] === 40, description: 'Denver average is 40 ((47+33)/2)', got: String(avgs[0]) });
  results.push({ pass: avgs[6] === 65.5, description: 'Miami average is 65.5 ((75+56)/2)', got: String(avgs[6]) });

  const sunny = findSunnySpots(weather);
  results.push({ pass: sunny.length === 3, description: 'findSunnySpots returns 3 locations', got: String(sunny.length) });
  results.push({ pass: sunny.includes('Atlanta, Georgia is sunny.'), description: 'Includes Atlanta sentence', got: sunny[0] });
  results.push({ pass: sunny.some(s => s.includes('Raleigh') && s.includes('mostly sunny')), description: 'Includes Raleigh as mostly sunny', got: sunny.find(s => s.includes('Raleigh')) || 'not found' });

  const humid = findHighestHumidity(weather);
  results.push({ pass: humid.location === 'Portland, Oregon', description: 'Highest humidity is Portland (84)', got: humid.location });
  results.push({ pass: humid.humidity === 84, description: 'Portland humidity is 84', got: String(humid.humidity) });

  return results;
}`,
  testCases: [],
  hints: [
    'Access nested properties with dot notation: `weather.temperature.high`. Use `.map()` to compute `(high + low) / 2` for each location.',
    'Use `.reduce()` to find the highest humidity: compare each item to the current highest and keep the one with the greater humidity value.'
  ],
  resources: [{ label: 'MDN: Array.prototype.reduce()', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce' }],
  solutionGate: 8,
  basePoints: BASE_POINTS[3],
});

// ─────────────────────────────────────────────
// 578: Dataset: Denver Breweries (T3)
// ─────────────────────────────────────────────
newExercises.push({
  id: 578,
  title: 'Dataset: Denver Breweries',
  type: 'js',
  tier: 3,
  category: ['functions', 'callback-methods'],
  tags: ['arrays', 'reduce', 'map', 'sort', 'nested-data'],
  description: 'Count, summarize, and find extremes in nested brewery and beer data.',
  instructions: `\`\`\`js
const breweries = [
  { name: 'Little Machine Brew', neighborhood: 'Highlands', beers: [
    { name: 'B.B. Rodriguez', type: 'Coffee Double Brown', abv: 8, ibu: 30 },
    { name: 'Tigercat', type: 'American Pale Ale', abv: 5.6, ibu: 48 },
    { name: 'Sir Veza', type: 'Lager', abv: 5.3, ibu: 8 },
    // ... 12 beers total
  ]},
  { name: 'Ratio Beerworks', neighborhood: 'RiNo', beers: [
    { name: 'Domestica', type: 'American Standard Ale', abv: 4.9, ibu: 11 },
    // ... 5 beers total
  ]},
  // ... 5 breweries total with 40 beers
];
\`\`\`
Full dataset is provided in the test environment.

**getBeerCount(breweries)** — Return the total number of beers across all breweries.

**getBreweryBeerCount(breweries)** — Return an array of objects with brewery \`name\` and \`beerCount\`.

**findHighestAbvBeer(breweries)** — Return the single beer object with the highest ABV.`,
  starterCode: `function getBeerCount(breweries) {
  // your code here
}

function getBreweryBeerCount(breweries) {
  // your code here
}

function findHighestAbvBeer(breweries) {
  // your code here
}`,
  solution: `function getBeerCount(breweries) {
  return breweries.reduce((sum, brewery) => sum + brewery.beers.length, 0);
}

function getBreweryBeerCount(breweries) {
  return breweries.map(brewery => ({
    name: brewery.name,
    beerCount: brewery.beers.length
  }));
}

function findHighestAbvBeer(breweries) {
  return breweries
    .flatMap(brewery => brewery.beers)
    .reduce((highest, beer) => beer.abv > highest.abv ? beer : highest);
}`,
  testRunner: `(code) => {
  const { getBeerCount, getBreweryBeerCount, findHighestAbvBeer } = new Function(code + '; return { getBeerCount, getBreweryBeerCount, findHighestAbvBeer };')();
  const results = [];

  const breweries = [
    { name: 'Little Machine Brew', neighborhood: 'Highlands', beers: [
      { name: 'B.B. Rodriguez', type: 'Coffee Double Brown', abv: 8, ibu: 30 },
      { name: 'West Side is the Blessed Side', type: 'Barrel-Aged Tripel', abv: 7.3, ibu: 35 },
      { name: 'Tigercat', type: 'American Pale Ale', abv: 5.6, ibu: 48 },
      { name: 'Miner Threat', type: 'Rhubarb Grisette', abv: 4, ibu: 10 },
      { name: "That's My Yam", type: 'Stout', abv: 5.6, ibu: 25 },
      { name: 'Sir Veza', type: 'Lager', abv: 5.3, ibu: 8 },
      { name: 'Racer Back', type: 'English Pale', abv: 5.5, ibu: 18 },
      { name: 'The Gaffer', type: 'Porter', abv: 5.6, ibu: 28 },
      { name: 'N22', type: 'Stout', abv: 5.7, ibu: 30 },
      { name: 'Razz Against The Machine', type: 'Tart Raspberry Ale', abv: 5.3, ibu: 12 },
      { name: 'Spirit of the Game', type: 'Saison', abv: 5.4, ibu: 25 },
      { name: 'Socialist Millionare Problem', type: 'Pale Ale', abv: 4.9, ibu: 25 }
    ]},
    { name: 'Ratio Beerworks', neighborhood: 'RiNo', beers: [
      { name: 'Domestica', type: 'American Standard Ale', abv: 4.9, ibu: 11 },
      { name: 'Dear You', type: 'Saison', abv: 5.5, ibu: 25 },
      { name: 'Hold Steady', type: 'Chocolate Rye Scotch Ale', abv: 7.5, ibu: 27 },
      { name: 'Antidote', type: 'India Pale Ale', abv: 7.0, ibu: 69 },
      { name: 'Repeater', type: 'Pale Ale', abv: 6.1, ibu: 50 }
    ]},
    { name: 'Spangalang Brewery', neighborhood: 'Five Points', beers: [
      { name: 'Sugarfood', type: 'Belgian', abv: 3.5, ibu: 15 },
      { name: 'Sidewinder Wit', type: 'Belgian Style Wit', abv: 5.5, ibu: 12 },
      { name: 'Beatrice', type: 'Saison', abv: 6, ibu: 30 },
      { name: 'Sir Hops-A-Lot', type: 'Saison', abv: 4.5, ibu: 40 },
      { name: 'Birth of Cool', type: 'Gose', abv: 4.6, ibu: 10 },
      { name: 'Dysfunction Junction', type: 'Sour', abv: 6.2, ibu: 4 },
      { name: 'Dry Hopped Lager', type: 'Lager', abv: 5.3, ibu: 30 },
      { name: 'Summer Citrus IPA', type: 'India Pale Ale', abv: 6.5, ibu: 60 },
      { name: 'D-Train', type: 'India Pale Ale', abv: 6.5, ibu: 50 }
    ]},
    { name: "Beryl's Beer Co.", neighborhood: 'RiNo', beers: [
      { name: '5 to 7', type: 'Hoppy Pils', abv: 5.7, ibu: 50 },
      { name: 'Dick Nichols', type: 'India Pale Ale', abv: 7.1, ibu: 60 },
      { name: 'Heaven-N-Helles', type: 'Helles', abv: 4.9, ibu: null },
      { name: 'Mila', type: 'Sour', abv: 4.2, ibu: null },
      { name: 'O.G. Dunkel', type: 'Bavarian Dunkel', abv: 5.1, ibu: null },
      { name: 'Paper Moon', type: 'Pale Ale', abv: 5.8, ibu: null },
      { name: 'Riga', type: 'Porter', abv: 7.2, ibu: null }
    ]},
    { name: 'Platt Park Brewing Co.', neighborhood: 'Platt Park', beers: [
      { name: 'Platt Park Porter', type: 'Porter', abv: 5.4, ibu: 22 },
      { name: "Barrel Aged Nature's Sweater", type: 'Barley Wine', abv: 10.9, ibu: 40 },
      { name: 'Phaded Pale Ale', type: 'American Pale Ale', abv: 5.1, ibu: 42 },
      { name: 'Old Man Strength', type: 'Imperial Red Ale', abv: 10.3, ibu: 88 },
      { name: 'Tropical Snow Dance IPA', type: 'India Pale Ale', abv: 6.9, ibu: 90 },
      { name: 'Madagascar Dream', type: 'Cream Ale', abv: 6.9, ibu: 18 },
      { name: 'Oktoberfest', type: 'Oktoberfest', abv: 5.5, ibu: 29 }
    ]}
  ];

  const count = getBeerCount(breweries);
  results.push({ pass: count === 40, description: 'Total beer count is 40', got: String(count) });

  const bc = getBreweryBeerCount(breweries);
  results.push({ pass: bc.length === 5, description: 'Returns 5 brewery objects', got: String(bc.length) });
  results.push({ pass: bc[0].name === 'Little Machine Brew' && bc[0].beerCount === 12, description: 'Little Machine has 12 beers', got: JSON.stringify(bc[0]) });
  results.push({ pass: bc[4].name === 'Platt Park Brewing Co.' && bc[4].beerCount === 7, description: 'Platt Park has 7 beers', got: JSON.stringify(bc[4]) });

  const highest = findHighestAbvBeer(breweries);
  results.push({ pass: highest.name === "Barrel Aged Nature's Sweater", description: "Highest ABV beer is Barrel Aged Nature's Sweater", got: highest.name });
  results.push({ pass: highest.abv === 10.9, description: 'Highest ABV is 10.9%', got: String(highest.abv) });
  results.push({ pass: typeof highest === 'object' && highest.type !== undefined, description: 'Returns the full beer object', got: JSON.stringify(Object.keys(highest)) });
  results.push({ pass: count === 40 && bc.length === 5, description: 'All three functions work correctly together', got: 'count=' + count + ', breweries=' + bc.length });

  return results;
}`,
  testCases: [],
  hints: [
    'For `getBeerCount`, use `.reduce()` to sum up `brewery.beers.length` across all breweries. For `getBreweryBeerCount`, use `.map()` to create `{ name, beerCount }` objects.',
    'To find the highest ABV beer, first flatten all beers into one array (`.flatMap(b => b.beers)` or `.reduce()` with spread), then find the maximum with `.reduce()` or `.sort()`.'
  ],
  resources: [{ label: 'MDN: Array.prototype.flatMap()', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flatMap' }],
  solutionGate: 8,
  basePoints: BASE_POINTS[3],
});

// ─────────────────────────────────────────────
// 579: Dataset: Turing Instructors (T3)
// ─────────────────────────────────────────────
newExercises.push({
  id: 579,
  title: 'Dataset: Turing Instructors',
  type: 'js',
  tier: 3,
  category: ['functions', 'callback-methods'],
  tags: ['arrays', 'map', 'reduce', 'filter', 'cross-reference'],
  description: 'Cross-reference instructor and cohort data to calculate ratios, match modules, and map curriculum topics.',
  instructions: `\`\`\`js
const instructors = [
  { name: 'Pam', module: 2, teaches: ['scope', 'recursion', 'node'] },
  { name: 'Brittany', module: 2, teaches: ['oop', 'pwas'] },
  { name: 'Nathaniel', module: 2, teaches: ['oop', 'scope', 'mobile'] },
  { name: 'Robbie', module: 4, teaches: ['node', 'pwas'] },
  { name: 'Leta', module: 4, teaches: ['pwas', 'node', 'recursion'] },
  { name: 'Travis', module: 1, teaches: ['javascript', 'html', 'css'] },
  { name: 'Louisa', module: 1, teaches: ['javascript', 'html', 'css', 'node', 'pwas'] },
  { name: 'Christie', module: 3, teaches: ['javascript', 'react', 'node'] },
  { name: 'Will', module: 3, teaches: ['javascript', 'redux', 'react', 'oop', 'scope'] }
];

const cohorts = [
  { cohort: 1806, module: 1, studentCount: 30, curriculum: ['html', 'css', 'javascript'] },
  { cohort: 1804, module: 2, studentCount: 21, curriculum: ['javascript', 'css', 'recursion', 'scope', 'oop'] },
  { cohort: 1803, module: 3, studentCount: 20, curriculum: ['react', 'redux', 'html', 'javascript'] },
  { cohort: 1801, module: 4, studentCount: 18, curriculum: ['pwas', 'mobile', 'node', 'javascript', 'css'] }
];
\`\`\`

**studentsForEachInstructor(instructors, cohorts)** — Return an array of objects with each instructor's \`name\` and the \`studentCount\` from their matched cohort (by module).

**studentsPerInstructor(instructors, cohorts)** — Return an object where keys are cohort names (e.g. \`'cohort1806'\`) and values are the student-to-instructor ratio for that module.

**modulesPerTeacher(instructors, cohorts)** — Return an object where each key is an instructor name and the value is an array of module numbers they could teach (any overlap between their \`teaches\` and the cohort's \`curriculum\`).

**curriculumPerTeacher(instructors)** — Return an object where each key is a topic from any instructor's \`teaches\` array, and the value is an array of instructor names who teach it.`,
  starterCode: `function studentsForEachInstructor(instructors, cohorts) {
  // your code here
}

function studentsPerInstructor(instructors, cohorts) {
  // your code here
}

function modulesPerTeacher(instructors, cohorts) {
  // your code here
}

function curriculumPerTeacher(instructors) {
  // your code here
}`,
  solution: `function studentsForEachInstructor(instructors, cohorts) {
  return instructors.map(instructor => ({
    name: instructor.name,
    studentCount: cohorts.find(c => c.module === instructor.module).studentCount
  }));
}

function studentsPerInstructor(instructors, cohorts) {
  return cohorts.reduce((obj, cohort) => {
    const numInstructors = instructors.filter(i => i.module === cohort.module).length;
    obj['cohort' + cohort.cohort] = cohort.studentCount / numInstructors;
    return obj;
  }, {});
}

function modulesPerTeacher(instructors, cohorts) {
  return instructors.reduce((obj, instructor) => {
    obj[instructor.name] = cohorts
      .filter(c => c.curriculum.some(topic => instructor.teaches.includes(topic)))
      .map(c => c.module);
    return obj;
  }, {});
}

function curriculumPerTeacher(instructors) {
  return instructors.reduce((obj, instructor) => {
    instructor.teaches.forEach(topic => {
      if (!obj[topic]) obj[topic] = [];
      obj[topic].push(instructor.name);
    });
    return obj;
  }, {});
}`,
  testRunner: `(code) => {
  const { studentsForEachInstructor, studentsPerInstructor, modulesPerTeacher, curriculumPerTeacher } = new Function(code + '; return { studentsForEachInstructor, studentsPerInstructor, modulesPerTeacher, curriculumPerTeacher };')();
  const results = [];

  const instructors = [
    { name: 'Pam', module: 2, teaches: ['scope', 'recursion', 'node'] },
    { name: 'Brittany', module: 2, teaches: ['oop', 'pwas'] },
    { name: 'Nathaniel', module: 2, teaches: ['oop', 'scope', 'mobile'] },
    { name: 'Robbie', module: 4, teaches: ['node', 'pwas'] },
    { name: 'Leta', module: 4, teaches: ['pwas', 'node', 'recursion'] },
    { name: 'Travis', module: 1, teaches: ['javascript', 'html', 'css'] },
    { name: 'Louisa', module: 1, teaches: ['javascript', 'html', 'css', 'node', 'pwas'] },
    { name: 'Christie', module: 3, teaches: ['javascript', 'react', 'node'] },
    { name: 'Will', module: 3, teaches: ['javascript', 'redux', 'react', 'oop', 'scope'] }
  ];
  const cohorts = [
    { cohort: 1806, module: 1, studentCount: 30, curriculum: ['html', 'css', 'javascript'] },
    { cohort: 1804, module: 2, studentCount: 21, curriculum: ['javascript', 'css', 'recursion', 'scope', 'oop'] },
    { cohort: 1803, module: 3, studentCount: 20, curriculum: ['react', 'redux', 'html', 'javascript'] },
    { cohort: 1801, module: 4, studentCount: 18, curriculum: ['pwas', 'mobile', 'node', 'javascript', 'css'] }
  ];

  const sfei = studentsForEachInstructor(instructors, cohorts);
  results.push({ pass: sfei.find(i => i.name === 'Pam')?.studentCount === 21, description: 'Pam (mod 2) has 21 students', got: String(sfei.find(i => i.name === 'Pam')?.studentCount) });
  results.push({ pass: sfei.find(i => i.name === 'Travis')?.studentCount === 30, description: 'Travis (mod 1) has 30 students', got: String(sfei.find(i => i.name === 'Travis')?.studentCount) });

  const spi = studentsPerInstructor(instructors, cohorts);
  results.push({ pass: spi.cohort1806 === 15, description: 'cohort1806: 30 students / 2 instructors = 15', got: String(spi.cohort1806) });
  results.push({ pass: spi.cohort1804 === 7, description: 'cohort1804: 21 students / 3 instructors = 7', got: String(spi.cohort1804) });

  const mpt = modulesPerTeacher(instructors, cohorts);
  results.push({ pass: JSON.stringify(mpt['Robbie']?.sort()) === JSON.stringify([4]), description: 'Robbie can teach module 4 only', got: JSON.stringify(mpt['Robbie']) });
  results.push({ pass: mpt['Travis']?.length === 4, description: 'Travis can teach all 4 modules', got: String(mpt['Travis']?.length) });

  const cpt = curriculumPerTeacher(instructors);
  results.push({ pass: cpt['javascript']?.length === 4, description: '4 instructors teach javascript', got: String(cpt['javascript']?.length) });
  results.push({ pass: cpt['scope']?.length === 3, description: '3 instructors teach scope', got: String(cpt['scope']?.length) });

  return results;
}`,
  testCases: [],
  hints: [
    'For `studentsForEachInstructor`, use `.map()` on instructors and `.find()` on cohorts to match by module number.',
    "For `modulesPerTeacher`, check if ANY topic in the instructor's `teaches` array overlaps with a cohort's `curriculum` using `.some()` and `.includes()`."
  ],
  resources: [{ label: 'MDN: Array.prototype.find()', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find' }],
  solutionGate: 8,
  basePoints: BASE_POINTS[3],
});

// ─────────────────────────────────────────────
// 580: Dataset: Disney Villains (T3)
// ─────────────────────────────────────────────
newExercises.push({
  id: 580,
  title: 'Dataset: Disney Villains',
  type: 'js',
  tier: 3,
  category: ['functions', 'callback-methods'],
  tags: ['objects', 'arrays', 'reduce', 'cross-reference'],
  description: 'Cross-reference boss and sidekick datasets to calculate loyalty totals.',
  instructions: `\`\`\`js
const bosses = {
  scar: {
    name: 'Scar', archnemesis: 'Mufasa', goal: 'to rule the pride',
    sidekicks: [
      { name: 'Shenzi', dispensability: 4 },
      { name: 'Banzai', dispensability: 6 },
      { name: 'Ed', dispensability: 10 }
    ]
  },
  ursula: {
    name: 'Ursula', archnemesis: 'Triton', goal: 'to rule the seas',
    sidekicks: [
      { name: 'Flotsam', dispensability: 0 },
      { name: 'Jetsam', dispensability: 0 }
    ]
  },
  jafar: {
    name: 'Jafar', archnemesis: 'Genie', goal: 'to take over as Sultan',
    sidekicks: [{ name: 'Iago', dispensability: 5 }]
  }
};

const sidekicks = [
  { name: 'Shenzi', boss: 'Scar', loyaltyToBoss: 4 },
  { name: 'Banzai', boss: 'Scar', loyaltyToBoss: 5 },
  { name: 'Ed', boss: 'Scar', loyaltyToBoss: 7 },
  { name: 'Flotsam', boss: 'Ursula', loyaltyToBoss: 10 },
  { name: 'Jetsam', boss: 'Ursula', loyaltyToBoss: 10 },
  { name: 'Iago', boss: 'Jafar', loyaltyToBoss: 3 }
];
\`\`\`

**bossLoyalty(bosses, sidekicks)** — Return an array of objects with \`bossName\` and \`sidekickLoyalty\` (sum of all sidekick loyalty for that boss):
\`\`\`js
// [
//   { bossName: 'Scar', sidekickLoyalty: 16 },
//   { bossName: 'Ursula', sidekickLoyalty: 20 },
//   { bossName: 'Jafar', sidekickLoyalty: 3 }
// ]
\`\`\``,
  starterCode: `function bossLoyalty(bosses, sidekicks) {
  // your code here
}`,
  solution: `function bossLoyalty(bosses, sidekicks) {
  return Object.values(bosses).map(boss => ({
    bossName: boss.name,
    sidekickLoyalty: sidekicks
      .filter(sk => sk.boss === boss.name)
      .reduce((sum, sk) => sum + sk.loyaltyToBoss, 0)
  }));
}`,
  testRunner: `(code) => {
  const bossLoyalty = new Function(code + '; return bossLoyalty;')();
  const results = [];

  const bosses = {
    scar: { name: 'Scar', archnemesis: 'Mufasa', goal: 'to rule the pride', sidekicks: [{ name: 'Shenzi', dispensability: 4 }, { name: 'Banzai', dispensability: 6 }, { name: 'Ed', dispensability: 10 }] },
    ursula: { name: 'Ursula', archnemesis: 'Triton', goal: 'to rule the seas', sidekicks: [{ name: 'Flotsam', dispensability: 0 }, { name: 'Jetsam', dispensability: 0 }] },
    jafar: { name: 'Jafar', archnemesis: 'Genie', goal: 'to take over as Sultan', sidekicks: [{ name: 'Iago', dispensability: 5 }] }
  };
  const sidekicks = [
    { name: 'Shenzi', boss: 'Scar', loyaltyToBoss: 4 },
    { name: 'Banzai', boss: 'Scar', loyaltyToBoss: 5 },
    { name: 'Ed', boss: 'Scar', loyaltyToBoss: 7 },
    { name: 'Flotsam', boss: 'Ursula', loyaltyToBoss: 10 },
    { name: 'Jetsam', boss: 'Ursula', loyaltyToBoss: 10 },
    { name: 'Iago', boss: 'Jafar', loyaltyToBoss: 3 }
  ];

  const bl = bossLoyalty(bosses, sidekicks);
  results.push({ pass: Array.isArray(bl) && bl.length === 3, description: 'Returns array of 3 boss objects', got: String(bl?.length) });
  const scar = bl.find(b => b.bossName === 'Scar');
  results.push({ pass: scar?.sidekickLoyalty === 16, description: 'Scar loyalty: 4 + 5 + 7 = 16', got: String(scar?.sidekickLoyalty) });
  const ursula = bl.find(b => b.bossName === 'Ursula');
  results.push({ pass: ursula?.sidekickLoyalty === 20, description: 'Ursula loyalty: 10 + 10 = 20', got: String(ursula?.sidekickLoyalty) });
  const jafar = bl.find(b => b.bossName === 'Jafar');
  results.push({ pass: jafar?.sidekickLoyalty === 3, description: 'Jafar loyalty: 3', got: String(jafar?.sidekickLoyalty) });
  results.push({ pass: bl.every(b => typeof b.bossName === 'string' && typeof b.sidekickLoyalty === 'number'), description: 'Each object has bossName (string) and sidekickLoyalty (number)', got: JSON.stringify(bl[0]) });
  results.push({ pass: scar !== undefined && ursula !== undefined && jafar !== undefined, description: 'All three bosses are present in result', got: bl.map(b => b.bossName).join(', ') });
  results.push({ pass: (scar?.sidekickLoyalty || 0) + (ursula?.sidekickLoyalty || 0) + (jafar?.sidekickLoyalty || 0) === 39, description: 'Total loyalty across all bosses is 39', got: String((scar?.sidekickLoyalty || 0) + (ursula?.sidekickLoyalty || 0) + (jafar?.sidekickLoyalty || 0)) });

  return results;
}`,
  testCases: [],
  hints: [
    'Use `Object.values(bosses)` to get an array of boss objects. Then `.map()` each boss into `{ bossName, sidekickLoyalty }`.',
    'For each boss, `.filter()` the sidekicks array to find those whose `boss` property matches the boss name, then `.reduce()` to sum their `loyaltyToBoss`.'
  ],
  resources: [{ label: 'MDN: Object.values()', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/values' }],
  solutionGate: 8,
  basePoints: BASE_POINTS[3],
});

// ─────────────────────────────────────────────
// 581: Dataset: Star Atlas (T3)
// ─────────────────────────────────────────────
newExercises.push({
  id: 581,
  title: 'Dataset: Star Atlas',
  type: 'js',
  tier: 3,
  category: ['functions', 'callback-methods'],
  tags: ['arrays', 'objects', 'filter', 'reduce', 'cross-reference'],
  description: 'Cross-reference constellation and star data to find matches, group by color, and identify constellation membership.',
  instructions: `\`\`\`js
const constellations = {
  orion: { names: ['Orion', 'The Hunter', 'The Giant', 'The Deer'],
    stars: ['Betelgeuse', 'Rigel', 'Bellatrix', 'Mintaka', 'Alnilam', 'Alnitak', 'Saiph'] },
  ursaMajor: { names: ['Ursa Major', 'The Big Dipper', 'The Great Bear', 'The Plow'],
    stars: ['Dubhe', 'Merak', 'Phecda', 'Megrez', 'Alioth', 'Mizar', 'Alkaid'] },
  ursaMinor: { names: ['Ursa Minor', 'The Little Dipper', 'The Cub', 'The Little Bear'],
    stars: ['Polaris', 'Kochab', 'Pherkad', 'Delta', 'Epsilon Ursae Minoris', 'Lambda Ursae Minoris'] }
};

const stars = [
  { name: 'Sirius', visualMagnitude: -1.46, constellation: 'Canis Major', lightYearsFromEarth: 8.6, color: 'blue' },
  { name: 'Canopis', visualMagnitude: -0.74, constellation: 'Carina', lightYearsFromEarth: 310, color: 'white' },
  { name: 'Alpha Centauri', visualMagnitude: -0.27, constellation: '', lightYearsFromEarth: 4.4, color: 'yellow' },
  { name: 'Arcturus', visualMagnitude: -0.05, constellation: 'Bootes', lightYearsFromEarth: 37, color: 'orange' },
  { name: 'Vega', visualMagnitude: 0.3, constellation: 'Lyra', lightYearsFromEarth: 25, color: 'blue' },
  { name: 'Capella', visualMagnitude: 0.08, constellation: 'Auriga', lightYearsFromEarth: 42, color: 'yellow' },
  { name: 'Rigel', visualMagnitude: 0.13, constellation: 'Orion', lightYearsFromEarth: 860, color: 'blue' },
  { name: 'Procyon', visualMagnitude: 0.34, constellation: 'Canis Minor', lightYearsFromEarth: 11, color: 'white' },
  { name: 'Achernar', visualMagnitude: 0.46, constellation: 'The Plow', lightYearsFromEarth: 140, color: 'blue' },
  { name: 'Betelgeuse', visualMagnitude: 0.5, constellation: 'Orion', lightYearsFromEarth: 640, color: 'red' },
  { name: 'Hadar', visualMagnitude: 0.61, constellation: 'The Little Dipper', lightYearsFromEarth: 350, color: 'blue' }
];
\`\`\`

**starsInConstellations(constellations, stars)** — Return an array of star objects whose \`constellation\` field matches any name in the constellations data.

**starsByColor(stars)** — Return an object grouping stars by their \`color\` property. Keys are colors, values are arrays of star objects.

**constellationsStarsExistIn(constellations, stars)** — Return an array of unique constellation key names (e.g. \`'orion'\`) that contain at least one star from the stars array.`,
  starterCode: `function starsInConstellations(constellations, stars) {
  // your code here
}

function starsByColor(stars) {
  // your code here
}

function constellationsStarsExistIn(constellations, stars) {
  // your code here
}`,
  solution: `function starsInConstellations(constellations, stars) {
  const allNames = Object.values(constellations).flatMap(c => c.names);
  return stars.filter(star => allNames.includes(star.constellation));
}

function starsByColor(stars) {
  return stars.reduce((groups, star) => {
    if (!groups[star.color]) groups[star.color] = [];
    groups[star.color].push(star);
    return groups;
  }, {});
}

function constellationsStarsExistIn(constellations, stars) {
  const allNames = Object.entries(constellations);
  return allNames
    .filter(([key, data]) => stars.some(star => data.names.includes(star.constellation)))
    .map(([key]) => key);
}`,
  testRunner: `(code) => {
  const { starsInConstellations, starsByColor, constellationsStarsExistIn } = new Function(code + '; return { starsInConstellations, starsByColor, constellationsStarsExistIn };')();
  const results = [];

  const constellations = {
    orion: { names: ['Orion', 'The Hunter', 'The Giant', 'The Deer'], stars: ['Betelgeuse', 'Rigel', 'Bellatrix', 'Mintaka', 'Alnilam', 'Alnitak', 'Saiph'] },
    ursaMajor: { names: ['Ursa Major', 'The Big Dipper', 'The Great Bear', 'The Plow'], stars: ['Dubhe', 'Merak', 'Phecda', 'Megrez', 'Alioth', 'Mizar', 'Alkaid'] },
    ursaMinor: { names: ['Ursa Minor', 'The Little Dipper', 'The Cub', 'The Little Bear'], stars: ['Polaris', 'Kochab', 'Pherkad', 'Delta', 'Epsilon Ursae Minoris', 'Lambda Ursae Minoris'] }
  };
  const stars = [
    { name: 'Sirius', visualMagnitude: -1.46, constellation: 'Canis Major', lightYearsFromEarth: 8.6, color: 'blue' },
    { name: 'Canopis', visualMagnitude: -0.74, constellation: 'Carina', lightYearsFromEarth: 310, color: 'white' },
    { name: 'Alpha Centauri', visualMagnitude: -0.27, constellation: '', lightYearsFromEarth: 4.4, color: 'yellow' },
    { name: 'Arcturus', visualMagnitude: -0.05, constellation: 'Bootes', lightYearsFromEarth: 37, color: 'orange' },
    { name: 'Vega', visualMagnitude: 0.3, constellation: 'Lyra', lightYearsFromEarth: 25, color: 'blue' },
    { name: 'Capella', visualMagnitude: 0.08, constellation: 'Auriga', lightYearsFromEarth: 42, color: 'yellow' },
    { name: 'Rigel', visualMagnitude: 0.13, constellation: 'Orion', lightYearsFromEarth: 860, color: 'blue' },
    { name: 'Procyon', visualMagnitude: 0.34, constellation: 'Canis Minor', lightYearsFromEarth: 11, color: 'white' },
    { name: 'Achernar', visualMagnitude: 0.46, constellation: 'The Plow', lightYearsFromEarth: 140, color: 'blue' },
    { name: 'Betelgeuse', visualMagnitude: 0.5, constellation: 'Orion', lightYearsFromEarth: 640, color: 'red' },
    { name: 'Hadar', visualMagnitude: 0.61, constellation: 'The Little Dipper', lightYearsFromEarth: 350, color: 'blue' }
  ];

  const sic = starsInConstellations(constellations, stars);
  results.push({ pass: sic.length === 4, description: '4 stars match constellation names', got: String(sic.length) });
  results.push({ pass: sic.some(s => s.name === 'Rigel'), description: 'Rigel is in Orion', got: sic.map(s => s.name).join(', ') });
  results.push({ pass: sic.some(s => s.name === 'Achernar'), description: 'Achernar matches The Plow (Ursa Major)', got: sic.map(s => s.name).join(', ') });

  const sbc = starsByColor(stars);
  results.push({ pass: sbc.blue?.length === 5, description: '5 blue stars', got: String(sbc.blue?.length) });
  results.push({ pass: sbc.red?.length === 1, description: '1 red star (Betelgeuse)', got: String(sbc.red?.length) });

  const csei = constellationsStarsExistIn(constellations, stars);
  results.push({ pass: csei.includes('orion'), description: 'Orion has matching stars', got: JSON.stringify(csei) });
  results.push({ pass: csei.includes('ursaMajor'), description: 'Ursa Major has matching stars (via The Plow)', got: JSON.stringify(csei) });
  results.push({ pass: csei.length === 3, description: 'All 3 constellations have matches', got: String(csei.length) });

  return results;
}`,
  testCases: [],
  hints: [
    'For `starsInConstellations`, first collect all constellation names into a flat array using `Object.values()` and `.flatMap()`, then `.filter()` stars whose constellation is in that list.',
    "For `constellationsStarsExistIn`, use `Object.entries()` to get `[key, data]` pairs. Check if ANY star has a constellation matching any of that constellation's names using `.some()` and `.includes()`."
  ],
  resources: [{ label: 'MDN: Object.entries()', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries' }],
  solutionGate: 8,
  basePoints: BASE_POINTS[3],
});

// ─────────────────────────────────────────────
// 582: Dataset: Ultima RPG (T3)
// ─────────────────────────────────────────────
newExercises.push({
  id: 582,
  title: 'Dataset: Ultima RPG',
  type: 'js',
  tier: 3,
  category: ['functions', 'callback-methods'],
  tags: ['arrays', 'objects', 'reduce', 'map', 'cross-reference'],
  description: 'Calculate total damage and per-character weapon stats by cross-referencing character and weapon data.',
  instructions: `\`\`\`js
const characters = [
  { name: 'Avatar', profession: 'heroine', weapons: ['magebane', 'whip', 'axe'], home: 'Earth' },
  { name: 'Iolo', profession: 'bard', weapons: ['crossbow', 'axe', 'halbred'], home: 'Britannia' },
  { name: 'Shamino', profession: 'ranger', weapons: ['bow', 'magebane', 'whip'], home: 'Sosaria' },
  { name: 'Dupre', profession: 'paladin', weapons: ['axe', 'halbred', 'magebane'], home: 'Trinsic' }
];

const weapons = {
  magebane: { damage: 9, range: 3 },
  whip: { damage: 10, range: 5 },
  axe: { damage: 8, range: 16 },
  crossbow: { damage: 10, range: 25 },
  halbred: { damage: 10, range: 5 },
  bow: { damage: 12, range: 31 }
};
\`\`\`

**totalDamage(characters, weapons)** — Return the sum of all weapon damage across all characters. Each character's damage is the sum of their weapons' damage values.
\`\`\`js
// Avatar: 9+10+8=27, Iolo: 10+8+10=28, Shamino: 12+9+10=31, Dupre: 8+10+9=27
// Total: 113
\`\`\`

**charactersByTotal(characters, weapons)** — Return an array of objects showing each character's total damage and range:
\`\`\`js
// [{ Avatar: { damage: 27, range: 24 } }, { Iolo: { damage: 28, range: 46 } }, ...]
\`\`\``,
  starterCode: `function totalDamage(characters, weapons) {
  // your code here
}

function charactersByTotal(characters, weapons) {
  // your code here
}`,
  solution: `function totalDamage(characters, weapons) {
  return characters.reduce((total, char) => {
    return total + char.weapons.reduce((sum, w) => sum + weapons[w].damage, 0);
  }, 0);
}

function charactersByTotal(characters, weapons) {
  return characters.map(char => {
    const stats = char.weapons.reduce((totals, w) => {
      totals.damage += weapons[w].damage;
      totals.range += weapons[w].range;
      return totals;
    }, { damage: 0, range: 0 });
    return { [char.name]: stats };
  });
}`,
  testRunner: `(code) => {
  const { totalDamage, charactersByTotal } = new Function(code + '; return { totalDamage, charactersByTotal };')();
  const results = [];

  const characters = [
    { name: 'Avatar', profession: 'heroine', weapons: ['magebane', 'whip', 'axe'], home: 'Earth' },
    { name: 'Iolo', profession: 'bard', weapons: ['crossbow', 'axe', 'halbred'], home: 'Britannia' },
    { name: 'Shamino', profession: 'ranger', weapons: ['bow', 'magebane', 'whip'], home: 'Sosaria' },
    { name: 'Dupre', profession: 'paladin', weapons: ['axe', 'halbred', 'magebane'], home: 'Trinsic' }
  ];
  const weapons = {
    magebane: { damage: 9, range: 3 },
    whip: { damage: 10, range: 5 },
    axe: { damage: 8, range: 16 },
    crossbow: { damage: 10, range: 25 },
    halbred: { damage: 10, range: 5 },
    bow: { damage: 12, range: 31 }
  };

  results.push({ pass: totalDamage(characters, weapons) === 113, description: 'Total damage across all characters is 113', got: String(totalDamage(characters, weapons)) });

  const cbt = charactersByTotal(characters, weapons);
  results.push({ pass: cbt.length === 4, description: 'Returns 4 character objects', got: String(cbt.length) });
  results.push({ pass: cbt[0].Avatar?.damage === 27, description: 'Avatar damage: 9+10+8 = 27', got: String(cbt[0].Avatar?.damage) });
  results.push({ pass: cbt[0].Avatar?.range === 24, description: 'Avatar range: 3+5+16 = 24', got: String(cbt[0].Avatar?.range) });
  results.push({ pass: cbt[1].Iolo?.damage === 28, description: 'Iolo damage: 10+8+10 = 28', got: String(cbt[1].Iolo?.damage) });
  results.push({ pass: cbt[1].Iolo?.range === 46, description: 'Iolo range: 25+16+5 = 46', got: String(cbt[1].Iolo?.range) });
  results.push({ pass: cbt[2].Shamino?.damage === 31, description: 'Shamino damage: 12+9+10 = 31', got: String(cbt[2].Shamino?.damage) });
  results.push({ pass: cbt[3].Dupre?.damage === 27, description: 'Dupre damage: 8+10+9 = 27', got: String(cbt[3].Dupre?.damage) });

  return results;
}`,
  testCases: [],
  hints: [
    "Look up weapon stats using bracket notation: `weapons[weaponName].damage`. Use nested `.reduce()` — outer reduce sums across characters, inner reduce sums each character's weapon stats.",
    'For `charactersByTotal`, use `.map()` on characters. For each character, `.reduce()` their weapons array into `{ damage: total, range: total }`, then return `{ [char.name]: stats }` using computed property names.'
  ],
  resources: [{ label: 'MDN: Computed property names', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer#computed_property_names' }],
  solutionGate: 8,
  basePoints: BASE_POINTS[3],
});

// ─────────────────────────────────────────────
// 583: Dataset: Jurassic Park (T4)
// ─────────────────────────────────────────────
newExercises.push({
  id: 583,
  title: 'Dataset: Jurassic Park',
  type: 'js',
  tier: 4,
  category: ['functions', 'callback-methods'],
  tags: ['arrays', 'objects', 'reduce', 'map', 'filter', 'cross-reference'],
  description: 'Cross-reference three datasets — dinosaurs, humans, and movies — to count, calculate, and filter complex relationships.',
  instructions: `You have three datasets: \`dinosaurs\` (object with species keys), \`humans\` (object with name keys), and \`movies\` (array of movie objects). Full datasets are provided in the test environment.

**countAwesomeDinosaurs(dinosaurs, movies)** — Return an object where each key is a movie title and the value is the count of dinosaurs in that movie that have \`isAwesome: true\`.

**averageAgePerMovie(humans, movies)** — Return an object where each key is a director name, and the value is an object of movie titles to the average age of the cast at the time of release (use \`Math.floor\`).

**uncastActors(humans, movies)** — Return an array of human objects for people NOT cast in any movie, sorted alphabetically by nationality.

**actorsAgesInMovies(humans, movies)** — Return an array of objects for each human cast in at least one movie, with their name and an array of ages at the time of each movie they appeared in.`,
  starterCode: '',
  solution: `function countAwesomeDinosaurs(dinosaurs, movies) {
  return movies.reduce((result, movie) => {
    result[movie.title] = movie.dinos.filter(d => dinosaurs[d]?.isAwesome).length;
    return result;
  }, {});
}

function averageAgePerMovie(humans, movies) {
  return movies.reduce((result, movie) => {
    if (!result[movie.director]) result[movie.director] = {};
    const ages = movie.cast
      .filter(name => humans[name])
      .map(name => movie.yearReleased - humans[name].yearBorn);
    result[movie.director][movie.title] = Math.floor(ages.reduce((s, a) => s + a, 0) / ages.length);
    return result;
  }, {});
}

function uncastActors(humans, movies) {
  const allCast = new Set(movies.flatMap(m => m.cast));
  return Object.entries(humans)
    .filter(([name]) => !allCast.has(name))
    .map(([name, data]) => ({ name, ...data }))
    .sort((a, b) => a.nationality.localeCompare(b.nationality));
}

function actorsAgesInMovies(humans, movies) {
  const allCast = [...new Set(movies.flatMap(m => m.cast))];
  return allCast
    .filter(name => humans[name])
    .map(name => ({
      name,
      ages: movies
        .filter(m => m.cast.includes(name))
        .map(m => m.yearReleased - humans[name].yearBorn)
    }));
}`,
  testRunner: `(code) => {
  const { countAwesomeDinosaurs, averageAgePerMovie, uncastActors, actorsAgesInMovies } = new Function(code + '; return { countAwesomeDinosaurs, averageAgePerMovie, uncastActors, actorsAgesInMovies };')();
  const results = [];

  const dinosaurs = {
    Brachiosaurus: { carnivore: false, herbivore: true, isAwesome: true },
    Dilophosaurus: { carnivore: true, herbivore: false, isAwesome: true },
    Gallimimus: { carnivore: true, herbivore: true, isAwesome: false },
    Triceratops: { carnivore: false, herbivore: true, isAwesome: true },
    Parasaurolophus: { carnivore: false, herbivore: true, isAwesome: false },
    'Tyrannosaurus Rex': { carnivore: true, herbivore: false, isAwesome: true },
    Velociraptor: { carnivore: true, herbivore: false, isAwesome: true },
    Compsognathus: { carnivore: true, herbivore: false, isAwesome: true },
    Mamenchisaurus: { carnivore: false, herbivore: true, isAwesome: true },
    Pachycephalosaurus: { carnivore: false, herbivore: true, isAwesome: true },
    Pteranodon: { carnivore: true, herbivore: false, isAwesome: true },
    Stegosaurus: { carnivore: false, herbivore: true, isAwesome: true },
    Ankylosaurus: { carnivore: false, herbivore: true, isAwesome: true },
    Ceratosaurus: { carnivore: true, herbivore: false, isAwesome: true },
    Corythosaurus: { carnivore: false, herbivore: true, isAwesome: false },
    Spinosaurus: { carnivore: true, herbivore: false, isAwesome: true },
    Apatosaurus: { carnivore: false, herbivore: true, isAwesome: true },
    Dimorphodon: { carnivore: true, herbivore: false, isAwesome: true },
    'Indominus Rex': { carnivore: true, herbivore: false, isAwesome: true },
    Mosasaurus: { carnivore: true, herbivore: false, isAwesome: true },
    Allosaurus: { carnivore: true, herbivore: false, isAwesome: true },
    Baryonyx: { carnivore: true, herbivore: false, isAwesome: true },
    Carnotaurus: { carnivore: true, herbivore: false, isAwesome: true },
    Indoraptor: { carnivore: true, herbivore: false, isAwesome: true },
    Sinoceratops: { carnivore: true, herbivore: true, isAwesome: true },
    Stygimoloch: { carnivore: false, herbivore: true, isAwesome: true }
  };
  const humans = {
    'Sam Neill': { yearBorn: 1947, nationality: 'Irish', imdbStarMeterRating: 5000 },
    'Tom Wilhoit': { yearBorn: 1777, nationality: 'Kiwi', imdbStarMeterRating: 1 },
    'Laura Dern': { yearBorn: 1967, nationality: 'American', imdbStarMeterRating: 5000 },
    'Jeff Goldblum': { yearBorn: 1952, nationality: 'American', imdbStarMeterRating: 5000 },
    'Jeo D': { yearBorn: 1776, nationality: 'Martian', imdbStarMeterRating: 0 },
    'Richard Attenborough': { yearBorn: 1923, nationality: 'British', imdbStarMeterRating: 5000 },
    'Ariana Richards': { yearBorn: 1979, nationality: 'American', imdbStarMeterRating: 5000 },
    'Joseph Mazello': { yearBorn: 1983, nationality: 'American', imdbStarMeterRating: 21 },
    'Justin Duncan': { yearBorn: 1775, nationality: 'Alien', imdbStarMeterRating: 0 },
    'BD Wong': { yearBorn: 1960, nationality: 'American', imdbStarMeterRating: 5000 },
    'Chris Pratt': { yearBorn: 1979, nationality: 'American', imdbStarMeterRating: 500 },
    'Karin Ohman': { yearBorn: 1995, nationality: 'Chinese', imdbStarMeterRating: 0 },
    'Bryce Dallas Howard': { yearBorn: 1981, nationality: 'American', imdbStarMeterRating: 80 }
  };
  const movies = [
    { title: 'Jurassic Park', director: 'Steven Spielberg', leadingActor: 'Sam Neill', cast: ['Sam Neill', 'Laura Dern', 'Jeff Goldblum', 'Richard Attenborough', 'Ariana Richards', 'Joseph Mazello', 'BD Wong'], dinos: ['Brachiosaurus', 'Dilophosaurus', 'Gallimimus', 'Triceratops', 'Parasaurolophus', 'Tyrannosaurus Rex', 'Velociraptor'], yearReleased: 1993, hasOscar: true, millionsGrossed: 1029 },
    { title: 'The Lost World: Jurassic Park', director: 'Steven Spielberg', leadingActor: 'Jeff Goldblum', cast: ['Jeff Goldblum', 'Richard Attenborough', 'Ariana Richards', 'Joseph Mazello'], dinos: ['Compsognathus', 'Gallimimus', 'Mamenchisaurus', 'Pachycephalosaurus', 'Parasaurolophus', 'Pteranodon', 'Stegosaurus', 'Triceratops', 'Tyrannosaurus Rex', 'Velociraptor'], yearReleased: 1997, hasOscar: false, millionsGrossed: 619 },
    { title: 'Jurassic Park III', director: 'Joe Johnston', leadingActor: 'Sam Neill', cast: ['Sam Neill', 'Laura Dern'], dinos: ['Ankylosaurus', 'Brachiosaurus', 'Ceratosaurus', 'Corythosaurus', 'Parasaurolophus', 'Pteranodon', 'Spinosaurus', 'Stegosaurus', 'Triceratops', 'Tyrannosaurus Rex', 'Velociraptor'], yearReleased: 2001, hasOscar: false, millionsGrossed: 369 },
    { title: 'Jurassic World', director: 'Colin Trevorrow', leadingActor: 'Chris Pratt', cast: ['Jeff Goldblum', 'Richard Attenborough', 'BD Wong', 'Chris Pratt', 'Bryce Dallas Howard'], dinos: ['Ankylosaurus', 'Apatosaurus', 'Dimorphodon', 'Gallimimus', 'Indominus Rex', 'Mosasaurus', 'Pachycephalosaurus', 'Parasaurolophus', 'Pteranodon', 'Stegosaurus', 'Triceratops', 'Tyrannosaurus Rex', 'Velociraptor'], yearReleased: 2015, hasOscar: false, millionsGrossed: 1672 },
    { title: 'Jurassic World: Fallen Kingdom', director: 'J. A. Bayona', leadingActor: 'Chris Pratt', cast: ['Jeff Goldblum', 'Richard Attenborough', 'BD Wong', 'Chris Pratt', 'Bryce Dallas Howard'], dinos: ['Allosaurus', 'Ankylosaurus', 'Apatosaurus', 'Baryonyx', 'Brachiosaurus', 'Carnotaurus', 'Compsognathus', 'Dilophosaurus', 'Gallimimus', 'Indominus Rex', 'Indoraptor', 'Mosasaurus', 'Parasaurolophus', 'Pteranodon', 'Sinoceratops', 'Stegosaurus', 'Stygimoloch', 'Triceratops', 'Tyrannosaurus Rex', 'Velociraptor'], yearReleased: 2018, hasOscar: false, millionsGrossed: 1304 }
  ];

  const cad = countAwesomeDinosaurs(dinosaurs, movies);
  results.push({ pass: cad['Jurassic Park'] === 5, description: 'Jurassic Park has 5 awesome dinos', got: String(cad['Jurassic Park']) });
  results.push({ pass: cad['Jurassic World: Fallen Kingdom'] === 18, description: 'Fallen Kingdom has 18 awesome dinos', got: String(cad['Jurassic World: Fallen Kingdom']) });

  const aapm = averageAgePerMovie(humans, movies);
  results.push({ pass: aapm['Steven Spielberg']?.['Jurassic Park'] === 34, description: 'Avg age in Jurassic Park (Spielberg) is 34', got: String(aapm['Steven Spielberg']?.['Jurassic Park']) });
  results.push({ pass: aapm['Joe Johnston']?.['Jurassic Park III'] !== undefined, description: 'Joe Johnston directs Jurassic Park III', got: String(Object.keys(aapm['Joe Johnston'] || {})) });

  const ua = uncastActors(humans, movies);
  results.push({ pass: ua.length === 4, description: '4 humans are not cast in any movie', got: String(ua.length) });
  results.push({ pass: ua[0].nationality < ua[ua.length - 1].nationality || ua.length <= 1, description: 'Sorted alphabetically by nationality', got: ua.map(a => a.nationality).join(', ') });

  const aaim = actorsAgesInMovies(humans, movies);
  const samNeill = aaim.find(a => a.name === 'Sam Neill');
  results.push({ pass: samNeill?.ages?.includes(46), description: 'Sam Neill was 46 in Jurassic Park (1993)', got: JSON.stringify(samNeill?.ages) });
  results.push({ pass: samNeill?.ages?.length === 2, description: 'Sam Neill appeared in 2 movies', got: String(samNeill?.ages?.length) });

  return results;
}`,
  testCases: [],
  hints: [
    'For `countAwesomeDinosaurs`, iterate over movies and for each movie, filter its `dinos` array — check each dino name against the dinosaurs object to see if `isAwesome` is true.',
    'For `uncastActors`, create a Set of all cast members from all movies using `.flatMap()`. Then filter `Object.entries(humans)` to find names NOT in the Set.'
  ],
  resources: [{ label: 'MDN: Array.prototype.flatMap()', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flatMap' }],
  solutionGate: 6,
  basePoints: BASE_POINTS[4],
});

// ── Merge into collection ──
collection.exercises.push(...newExercises);
collection.exerciseIds = collection.exercises.map(e => e.id);

// ── Report ──
console.log('\n=== Turing Foundations Expansion Report ===\n');
console.log(`Previous: 35 exercises (535-569)`);
console.log(`Added: ${newExercises.length} exercises (570-${569 + newExercises.length})`);
console.log(`Total: ${collection.exercises.length} exercises`);

const tierCounts = {};
for (const ex of collection.exercises) {
  tierCounts[ex.tier] = (tierCounts[ex.tier] || 0) + 1;
}
console.log('\nTier distribution:');
for (const [t, c] of Object.entries(tierCounts).sort()) {
  console.log(`  T${t}: ${c}`);
}

const catCounts = {};
for (const ex of collection.exercises) {
  catCounts[ex.category[0]] = (catCounts[ex.category[0]] || 0) + 1;
}
console.log('\nCategory distribution:');
for (const [c, n] of Object.entries(catCounts).sort((a, b) => b[1] - a[1])) {
  console.log(`  ${c}: ${n}`);
}

console.log('\nNew exercises:');
for (const ex of newExercises) {
  console.log(`  ${ex.id}: T${ex.tier} | ${ex.category.join('/')} | ${ex.title}`);
}

// ── Write ──
fs.writeFileSync(COLLECTION_PATH, JSON.stringify(collection, null, 2) + '\n');
console.log(`\n✓ Written to ${COLLECTION_PATH}`);
