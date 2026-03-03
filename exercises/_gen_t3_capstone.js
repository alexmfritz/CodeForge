#!/usr/bin/env node
/**
 * Generator: T3 Capstone Applications — Section 8 (14 exercises, IDs 1311-1324)
 *
 * Covers: Data Processing, Functions & Classes, DOM Integration, Async Integration
 * Pulls together all T3 skills into applied, multi-concept exercises.
 *
 * Usage:
 *   node exercises/_gen_t3_capstone.js            # Append to curriculum
 *   node exercises/_gen_t3_capstone.js --validate  # Validate testRunners only
 */

const fs = require('fs');
const path = require('path');

let JSDOM;
try {
  JSDOM = require('jsdom').JSDOM;
} catch (_) {
  // jsdom not available — DOM exercises will fail validation
}

const CURRICULUM_PATH = path.join(
  __dirname,
  'collections',
  'default-curriculum.json'
);

// ─── Resources (MDN only for T3) ────────────────────────────────────────────

const arrayMethodsRes = [
  { label: 'MDN: Array.prototype.map()', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map', description: 'Array map method' },
  { label: 'MDN: Array.prototype.reduce()', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce', description: 'Array reduce method' },
];
const classRes = [
  { label: 'MDN: Classes', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes', description: 'Classes reference' },
];
const closureRes = [
  { label: 'MDN: Closures', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures', description: 'Closures reference' },
];
const domRes = [
  { label: 'MDN: Document', url: 'https://developer.mozilla.org/en-US/docs/Web/API/Document', description: 'Document API reference' },
  { label: 'MDN: EventTarget.addEventListener()', url: 'https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener', description: 'addEventListener reference' },
];
const asyncRes = [
  { label: 'MDN: async function', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function', description: 'async function reference' },
  { label: 'MDN: Promise', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise', description: 'Promise reference' },
];
const errorRes = [
  { label: 'MDN: Error', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error', description: 'Error object reference' },
];

// ─── Exercise Definitions ───────────────────────────────────────────────────

const exercises = [

  // ══════════════════════════════════════════════════════════════════════════
  // SUB-SECTION A: Data Processing (4 exercises, IDs 1311-1314)
  // ══════════════════════════════════════════════════════════════════════════

  // 1. Generate Report Cards
  {
    id: 1311,
    title: 'Generate Report Cards',
    type: 'js',
    tier: 3,
    category: ['capstone', 'data-processing'],
    tags: ['map', 'reduce', 'destructuring', 'capstone', 'application'],
    description:
      'Write a function that transforms an array of student records into report card objects with averages and letter grades.',
    starterCode:
      '/**\n * @param {Array<{name: string, scores: number[]}>} students - Array of student records\n * @returns {Array<{name: string, average: number, letterGrade: string, passing: boolean}>}\n *   average rounded to 1 decimal, letterGrade: A(90+) B(80+) C(70+) D(60+) F(<60), passing: grade >= 60\n */\nfunction generateReportCards(students) {\n\n}\n',
    solution:
      'function generateReportCards(students) {\n  return students.map(function({ name, scores }) {\n    const average = Math.round(scores.reduce(function(sum, s) { return sum + s; }, 0) / scores.length * 10) / 10;\n    let letterGrade;\n    if (average >= 90) letterGrade = "A";\n    else if (average >= 80) letterGrade = "B";\n    else if (average >= 70) letterGrade = "C";\n    else if (average >= 60) letterGrade = "D";\n    else letterGrade = "F";\n    return { name, average, letterGrade, passing: average >= 60 };\n  });\n}',
    testRunner: `(code) => {
  const fn = new Function(code + '; return generateReportCards;')();
  const r1 = fn([{ name: 'Alice', scores: [95, 88, 92] }]);
  const r2 = fn([{ name: 'Bob', scores: [55, 62, 48] }]);
  const r3 = fn([{ name: 'Carol', scores: [70, 70, 70] }]);
  const r4 = fn([
    { name: 'Dan', scores: [100, 100, 100] },
    { name: 'Eve', scores: [50, 50, 50] }
  ]);
  const r5 = fn([{ name: 'Frank', scores: [85, 75, 80] }]);
  const r6 = fn([{ name: 'Grace', scores: [60, 60, 60] }]);
  const r7 = fn([{ name: 'Hank', scores: [89, 91] }]);
  const r8 = fn([]);
  const r9 = fn([{ name: 'Ivy', scores: [59] }]);
  return [
    { pass: r1[0].name === 'Alice' && r1[0].average === 91.7 && r1[0].letterGrade === 'A' && r1[0].passing === true, description: 'Alice [95,88,92] → avg 91.7, A, passing', got: JSON.stringify(r1[0]) },
    { pass: r2[0].name === 'Bob' && r2[0].average === 55 && r2[0].letterGrade === 'F' && r2[0].passing === false, description: 'Bob [55,62,48] → avg 55, F, not passing', got: JSON.stringify(r2[0]) },
    { pass: r3[0].average === 70 && r3[0].letterGrade === 'C', description: 'Carol [70,70,70] → avg 70, C', got: JSON.stringify(r3[0]) },
    { pass: r4.length === 2 && r4[0].letterGrade === 'A' && r4[1].letterGrade === 'F', description: 'Multiple students: Dan=A, Eve=F', got: JSON.stringify(r4.map(function(s) { return s.letterGrade; })) },
    { pass: r5[0].average === 80 && r5[0].letterGrade === 'B', description: 'Frank [85,75,80] → avg 80, B', got: JSON.stringify(r5[0]) },
    { pass: r6[0].average === 60 && r6[0].letterGrade === 'D' && r6[0].passing === true, description: 'Grace [60,60,60] → avg 60, D, passing', got: JSON.stringify(r6[0]) },
    { pass: r7[0].average === 90 && r7[0].letterGrade === 'A', description: 'Hank [89,91] → avg 90, A', got: JSON.stringify(r7[0]) },
    { pass: Array.isArray(r8) && r8.length === 0, description: 'Empty array returns empty array', got: JSON.stringify(r8) },
    { pass: r9[0].average === 59 && r9[0].letterGrade === 'F' && r9[0].passing === false, description: 'Ivy [59] → avg 59, F, not passing', got: JSON.stringify(r9[0]) },
  ];
}`,
    hint1:
      'Use `.map()` to transform each student, and `.reduce()` inside to sum their scores. Divide by `scores.length` for the average. Use `Math.round(value * 10) / 10` to round to one decimal place.',
    hint2:
      'Destructure `{ name, scores }` in the map callback. Compute `average` with reduce, then use if/else if chains for the letter grade thresholds (90=A, 80=B, 70=C, 60=D, else F). Return an object with all four properties.',
    resources: arrayMethodsRes,
  },

  // 2. Analyze Sales Data
  {
    id: 1312,
    title: 'Analyze Sales Data',
    type: 'js',
    tier: 3,
    category: ['capstone', 'data-processing'],
    tags: ['reduce', 'filter', 'chaining', 'capstone', 'application'],
    description:
      'Write a function that analyzes an array of sales records and returns a summary with total revenue, category totals, and the best-selling product.',
    starterCode:
      '/**\n * @param {Array<{product: string, quantity: number, price: number, category: string}>} sales\n * @returns {{totalRevenue: number, categoryTotals: Object, bestSeller: string}}\n *   totalRevenue = sum of quantity*price, categoryTotals = {category: revenue}, bestSeller = product with highest revenue\n */\nfunction analyzeSales(sales) {\n\n}\n',
    solution:
      'function analyzeSales(sales) {\n  const totalRevenue = sales.reduce(function(sum, s) { return sum + s.quantity * s.price; }, 0);\n  const categoryTotals = sales.reduce(function(acc, s) {\n    const rev = s.quantity * s.price;\n    acc[s.category] = (acc[s.category] || 0) + rev;\n    return acc;\n  }, {});\n  const productRevenue = sales.reduce(function(acc, s) {\n    const rev = s.quantity * s.price;\n    acc[s.product] = (acc[s.product] || 0) + rev;\n    return acc;\n  }, {});\n  const bestSeller = Object.keys(productRevenue).reduce(function(best, product) {\n    return productRevenue[product] > productRevenue[best] ? product : best;\n  });\n  return { totalRevenue, categoryTotals, bestSeller };\n}',
    testRunner: `(code) => {
  const fn = new Function(code + '; return analyzeSales;')();
  const r1 = fn([
    { product: 'Widget', quantity: 10, price: 5, category: 'Tools' },
    { product: 'Gadget', quantity: 3, price: 20, category: 'Electronics' },
    { product: 'Widget', quantity: 5, price: 5, category: 'Tools' }
  ]);
  const r2 = fn([
    { product: 'A', quantity: 1, price: 100, category: 'X' }
  ]);
  const r3 = fn([
    { product: 'Pen', quantity: 100, price: 1, category: 'Office' },
    { product: 'Desk', quantity: 2, price: 200, category: 'Office' }
  ]);
  const r4 = fn([
    { product: 'Shirt', quantity: 5, price: 20, category: 'Clothing' },
    { product: 'Pants', quantity: 3, price: 40, category: 'Clothing' },
    { product: 'Hat', quantity: 10, price: 10, category: 'Accessories' }
  ]);
  const r5 = fn([
    { product: 'Book', quantity: 1, price: 10, category: 'Media' },
    { product: 'Book', quantity: 2, price: 10, category: 'Media' }
  ]);
  return [
    { pass: r1.totalRevenue === 135, description: 'Total revenue: 10*5 + 3*20 + 5*5 = 135', got: String(r1.totalRevenue) },
    { pass: r1.categoryTotals.Tools === 75 && r1.categoryTotals.Electronics === 60, description: 'Category totals: Tools=75, Electronics=60', got: JSON.stringify(r1.categoryTotals) },
    { pass: r1.bestSeller === 'Widget', description: 'Best seller: Widget (75 revenue)', got: r1.bestSeller },
    { pass: r2.totalRevenue === 100 && r2.bestSeller === 'A', description: 'Single item: total=100, best="A"', got: JSON.stringify(r2) },
    { pass: r3.totalRevenue === 500 && r3.categoryTotals.Office === 500, description: 'Same category sums: Office=500', got: JSON.stringify(r3.categoryTotals) },
    { pass: r3.bestSeller === 'Desk', description: 'Best seller: Desk (400 > Pen 100)', got: r3.bestSeller },
    { pass: r4.totalRevenue === 320 && r4.categoryTotals.Clothing === 220 && r4.categoryTotals.Accessories === 100, description: 'Multi-category: Clothing=220, Accessories=100', got: JSON.stringify(r4.categoryTotals) },
    { pass: r4.bestSeller === 'Pants', description: 'Best seller: Pants (120 > Shirt 100 > Hat 100)', got: r4.bestSeller },
    { pass: r5.totalRevenue === 30 && r5.bestSeller === 'Book', description: 'Duplicate product aggregated: Book=30', got: JSON.stringify(r5) },
  ];
}`,
    hint1:
      'Use `.reduce()` three times: once for total revenue (sum of quantity * price), once to build an object of category totals, and once to build an object of product totals. Then find the product with the highest total.',
    hint2:
      'For category/product totals, use the pattern: `acc[key] = (acc[key] || 0) + revenue`. For best seller, use `Object.keys(productRevenue).reduce()` to find the key with the highest value.',
    resources: arrayMethodsRes,
  },

  // 3. Build Search Index
  {
    id: 1313,
    title: 'Build Search Index',
    type: 'js',
    tier: 3,
    category: ['capstone', 'data-processing'],
    tags: ['reduce', 'map', 'index', 'capstone', 'application'],
    description:
      'Write a function that builds a word-to-titles index from an array of documents, mapping each lowercase word to the titles that contain it.',
    starterCode:
      '/**\n * @param {Array<{title: string, body: string}>} docs - Array of documents\n * @returns {Object} Map of lowercase word → array of titles containing that word (no duplicates)\n */\nfunction buildSearchIndex(docs) {\n\n}\n',
    solution:
      'function buildSearchIndex(docs) {\n  return docs.reduce(function(index, doc) {\n    const words = doc.body.toLowerCase().split(/\\s+/).filter(function(w) { return w.length > 0; });\n    words.forEach(function(word) {\n      if (!index[word]) {\n        index[word] = [];\n      }\n      if (index[word].indexOf(doc.title) === -1) {\n        index[word].push(doc.title);\n      }\n    });\n    return index;\n  }, {});\n}',
    testRunner: `(code) => {
  const fn = new Function(code + '; return buildSearchIndex;')();
  const r1 = fn([
    { title: 'Intro', body: 'Hello world' },
    { title: 'Outro', body: 'Goodbye world' }
  ]);
  const r2 = fn([
    { title: 'A', body: 'cat dog' },
    { title: 'B', body: 'Dog fish' },
    { title: 'C', body: 'cat fish bird' }
  ]);
  const r3 = fn([{ title: 'Solo', body: 'one' }]);
  const r4 = fn([]);
  const r5 = fn([
    { title: 'X', body: 'The the THE' }
  ]);
  const r6 = fn([
    { title: 'A', body: 'hello' },
    { title: 'B', body: 'hello' }
  ]);
  const r7 = fn([
    { title: 'Doc', body: 'Hello hello' }
  ]);
  const r8 = fn([
    { title: 'Mixed', body: 'Apple BANANA cherry' }
  ]);
  return [
    { pass: JSON.stringify(r1.world) === '["Intro","Outro"]', description: '"world" maps to ["Intro","Outro"]', got: JSON.stringify(r1.world) },
    { pass: JSON.stringify(r1.hello) === '["Intro"]' && JSON.stringify(r1.goodbye) === '["Outro"]', description: '"hello"→["Intro"], "goodbye"→["Outro"]', got: JSON.stringify({ hello: r1.hello, goodbye: r1.goodbye }) },
    { pass: JSON.stringify(r2.cat.sort()) === '["A","C"]' && JSON.stringify(r2.dog.sort()) === '["A","B"]', description: '"cat"→[A,C], "dog"→[A,B] (case-insensitive)', got: JSON.stringify({ cat: r2.cat, dog: r2.dog }) },
    { pass: JSON.stringify(r2.fish.sort()) === '["B","C"]', description: '"fish"→[B,C]', got: JSON.stringify(r2.fish) },
    { pass: JSON.stringify(r3) === '{"one":["Solo"]}', description: 'Single doc: { one: ["Solo"] }', got: JSON.stringify(r3) },
    { pass: JSON.stringify(r4) === '{}', description: 'Empty docs returns empty object', got: JSON.stringify(r4) },
    { pass: r5.the && r5.the.length === 1 && r5.the[0] === 'X', description: '"the" (repeated, mixed case) → ["X"] (no duplicates)', got: JSON.stringify(r5.the) },
    { pass: JSON.stringify(r6.hello) === '["A","B"]', description: 'Same word in different docs → both titles', got: JSON.stringify(r6.hello) },
    { pass: r7.hello && r7.hello.length === 1, description: 'Duplicate word in same doc → title appears once', got: JSON.stringify(r7.hello) },
  ];
}`,
    hint1:
      'Use `.reduce()` over the docs array to build an index object. For each doc, split the body into words (lowercase), then for each word add the title to the index if not already present. Use `.indexOf()` to check for duplicates.',
    hint2:
      'Start with `docs.reduce(function(index, doc) { ... }, {})`. Inside, split `doc.body.toLowerCase()` on whitespace. For each word, create the array if needed (`if (!index[word]) index[word] = []`) then push the title if `indexOf(doc.title) === -1`.',
    resources: arrayMethodsRes,
  },

  // 4. Tournament Rankings
  {
    id: 1314,
    title: 'Tournament Rankings',
    type: 'js',
    tier: 3,
    category: ['capstone', 'data-processing'],
    tags: ['sort', 'filter', 'map', 'chaining', 'capstone', 'application'],
    description:
      'Write a function that ranks tournament players by win rate, filters by minimum games played, and formats the results as ranked strings.',
    starterCode:
      '/**\n * @param {Array<{player: string, wins: number, losses: number}>} players\n * @param {number} minGames - Minimum total games to qualify\n * @returns {string[]} Array of "#1 PlayerName (75.0%)" formatted strings, sorted by win rate descending\n */\nfunction tournamentRankings(players, minGames) {\n\n}\n',
    solution:
      'function tournamentRankings(players, minGames) {\n  return players\n    .filter(function(p) { return (p.wins + p.losses) >= minGames; })\n    .map(function(p) {\n      return { player: p.player, winRate: p.wins / (p.wins + p.losses) * 100 };\n    })\n    .sort(function(a, b) { return b.winRate - a.winRate; })\n    .map(function(p, i) {\n      return "#" + (i + 1) + " " + p.player + " (" + (Math.round(p.winRate * 10) / 10) + "%)";\n    });\n}',
    testRunner: `(code) => {
  const fn = new Function(code + '; return tournamentRankings;')();
  const players = [
    { player: 'Alice', wins: 4, losses: 1 },
    { player: 'Bob', wins: 3, losses: 7 },
    { player: 'Carol', wins: 3, losses: 2 },
    { player: 'Dan', wins: 1, losses: 0 },
    { player: 'Eve', wins: 2, losses: 2 }
  ];
  const r1 = fn(players, 5);
  const r2 = fn(players, 10);
  const r3 = fn(players, 1);
  const r4 = fn([], 1);
  const r5 = fn([{ player: 'Solo', wins: 3, losses: 0 }], 1);
  const r6 = fn([
    { player: 'X', wins: 1, losses: 2 },
    { player: 'Y', wins: 2, losses: 1 }
  ], 3);
  const r7 = fn(players, 0);
  const r8 = fn([{ player: 'Z', wins: 0, losses: 5 }], 1);
  return [
    { pass: r1.length === 3 && r1[0] === '#1 Alice (80%)', description: 'minGames=5: Alice #1 at 80%', got: r1[0] },
    { pass: r1[1] === '#2 Carol (60%)' && r1[2] === '#3 Bob (30%)', description: 'Carol #2 (60%), Bob #3 (30%)', got: JSON.stringify(r1.slice(1)) },
    { pass: r2.length === 1 && r2[0] === '#1 Bob (30%)', description: 'minGames=10: only Bob qualifies (10 games)', got: JSON.stringify(r2) },
    { pass: r3.length === 5 && r3[0] === '#1 Dan (100%)', description: 'minGames=1: Dan #1 at 100%', got: r3[0] },
    { pass: r4.length === 0, description: 'Empty players returns empty array', got: JSON.stringify(r4) },
    { pass: r5[0] === '#1 Solo (100%)', description: 'Single player: Solo 100%', got: r5[0] },
    { pass: r6[0] === '#1 Y (66.7%)' && r6[1] === '#2 X (33.3%)', description: 'Two players: Y 66.7%, X 33.3%', got: JSON.stringify(r6) },
    { pass: r7.length === 5, description: 'minGames=0: all qualify', got: String(r7.length) },
    { pass: r8[0] === '#1 Z (0%)', description: 'Zero wins: Z at 0%', got: r8[0] },
  ];
}`,
    hint1:
      'Chain four array methods: `.filter()` by minimum games, `.map()` to compute win rates, `.sort()` by win rate descending, then `.map()` again to format as ranked strings. Use `Math.round(rate * 10) / 10` for one decimal.',
    hint2:
      'Filter: `(p.wins + p.losses) >= minGames`. First map: `{ player, winRate: wins/(wins+losses)*100 }`. Sort: `b.winRate - a.winRate`. Second map: `"#" + (i+1) + " " + p.player + " (" + rounded + "%)"` where `i` is the index parameter.',
    resources: arrayMethodsRes,
  },

  // ══════════════════════════════════════════════════════════════════════════
  // SUB-SECTION B: Functions & Classes (4 exercises, IDs 1315-1318)
  // ══════════════════════════════════════════════════════════════════════════

  // 5. Bank Account
  {
    id: 1315,
    title: 'Bank Account',
    type: 'js',
    tier: 3,
    category: ['capstone', 'classes'],
    tags: ['class', 'error-handling', 'getter', 'capstone', 'application'],
    description:
      'Write a BankAccount class with deposit, withdraw, and transfer methods, plus overdraft protection and a transaction history.',
    starterCode:
      '/**\n * BankAccount class\n * @param {string} owner - Account owner name\n * @param {number} [balance=0] - Starting balance\n *\n * Methods:\n *   deposit(amount) - Add funds, throw Error("Invalid amount") if amount <= 0\n *   withdraw(amount) - Remove funds, throw Error("Invalid amount") if <= 0, Error("Insufficient funds") if > balance\n *   transfer(amount, otherAccount) - Withdraw from this, deposit to other\n *\n * Properties:\n *   get balance - Current balance\n *   get history - Array of { type: "deposit"|"withdraw"|"transfer", amount } objects\n */\n',
    solution:
      'class BankAccount {\n  constructor(owner, balance) {\n    this.owner = owner;\n    this._balance = balance || 0;\n    this._history = [];\n  }\n  get balance() { return this._balance; }\n  get history() { return this._history.slice(); }\n  deposit(amount) {\n    if (amount <= 0) throw new Error("Invalid amount");\n    this._balance += amount;\n    this._history.push({ type: "deposit", amount });\n  }\n  withdraw(amount) {\n    if (amount <= 0) throw new Error("Invalid amount");\n    if (amount > this._balance) throw new Error("Insufficient funds");\n    this._balance -= amount;\n    this._history.push({ type: "withdraw", amount });\n  }\n  transfer(amount, otherAccount) {\n    this.withdraw(amount);\n    otherAccount.deposit(amount);\n    this._history[this._history.length - 1].type = "transfer";\n  }\n}',
    testRunner: `(code) => {
  const BankAccount = new Function(code + '; return BankAccount;')();
  const results = [];

  const a = new BankAccount('Alice', 100);
  results.push({ pass: a.balance === 100, description: 'New account with initial balance 100', got: String(a.balance) });

  a.deposit(50);
  results.push({ pass: a.balance === 150, description: 'After deposit(50) balance is 150', got: String(a.balance) });

  a.withdraw(30);
  results.push({ pass: a.balance === 120, description: 'After withdraw(30) balance is 120', got: String(a.balance) });

  let err1 = '';
  try { a.withdraw(200); } catch (e) { err1 = e.message; }
  results.push({ pass: err1 === 'Insufficient funds', description: 'Overdraft throws "Insufficient funds"', got: err1 });

  let err2 = '';
  try { a.deposit(-10); } catch (e) { err2 = e.message; }
  results.push({ pass: err2 === 'Invalid amount', description: 'Negative deposit throws "Invalid amount"', got: err2 });

  const b = new BankAccount('Bob', 0);
  a.transfer(20, b);
  results.push({ pass: a.balance === 100 && b.balance === 20, description: 'Transfer 20: Alice=100, Bob=20', got: 'Alice=' + a.balance + ', Bob=' + b.balance });

  results.push({ pass: a.history.length === 3, description: 'Alice has 3 history entries (deposit, withdraw, transfer)', got: String(a.history.length) });

  const lastEntry = a.history[a.history.length - 1];
  results.push({ pass: lastEntry.type === 'transfer' && lastEntry.amount === 20, description: 'Last entry: { type: "transfer", amount: 20 }', got: JSON.stringify(lastEntry) });

  const c = new BankAccount('Carol');
  results.push({ pass: c.balance === 0, description: 'Default balance is 0', got: String(c.balance) });

  return results;
}`,
    hint1:
      'Store balance and history as private properties (prefix with `_`). Use a getter for `balance` and `history`. The `transfer` method can call `this.withdraw()` then `otherAccount.deposit()` to reuse validation logic.',
    hint2:
      'In `withdraw`, check `amount <= 0` first (throw "Invalid amount"), then `amount > this._balance` (throw "Insufficient funds"). For `transfer`, call withdraw and deposit, then update the last history entry\'s type to "transfer".',
    resources: [...classRes, ...errorRes],
  },

  // 6. Event Emitter
  {
    id: 1316,
    title: 'Event Emitter',
    type: 'js',
    tier: 3,
    category: ['capstone', 'classes'],
    tags: ['class', 'callbacks', 'closure', 'capstone', 'application'],
    description:
      'Write an EventEmitter class that allows subscribing to named events, emitting events with data, and removing listeners.',
    starterCode:
      '/**\n * EventEmitter class\n *\n * Methods:\n *   on(event, listener) - Register a listener function for the named event\n *   emit(event, ...args) - Call all listeners for the event with the given arguments; returns number of listeners called\n *   off(event, listener) - Remove a specific listener from the event\n *   listenerCount(event) - Return the number of listeners for the event\n */\n',
    solution:
      'class EventEmitter {\n  constructor() {\n    this._events = {};\n  }\n  on(event, listener) {\n    if (!this._events[event]) {\n      this._events[event] = [];\n    }\n    this._events[event].push(listener);\n  }\n  emit(event) {\n    const listeners = this._events[event];\n    if (!listeners) return 0;\n    const args = Array.prototype.slice.call(arguments, 1);\n    listeners.forEach(function(fn) { fn.apply(null, args); });\n    return listeners.length;\n  }\n  off(event, listener) {\n    const listeners = this._events[event];\n    if (!listeners) return;\n    const idx = listeners.indexOf(listener);\n    if (idx !== -1) listeners.splice(idx, 1);\n  }\n  listenerCount(event) {\n    return this._events[event] ? this._events[event].length : 0;\n  }\n}',
    testRunner: `(code) => {
  const EventEmitter = new Function(code + '; return EventEmitter;')();
  const results = [];
  const em = new EventEmitter();

  let called = 0;
  const handler = function() { called++; };
  em.on('click', handler);
  const count1 = em.emit('click');
  results.push({ pass: called === 1 && count1 === 1, description: 'on + emit: handler called once, returns 1', got: 'called=' + called + ', returned=' + count1 });

  em.emit('click');
  results.push({ pass: called === 2, description: 'Second emit calls handler again', got: String(called) });

  let data = null;
  em.on('data', function(val) { data = val; });
  em.emit('data', 'hello');
  results.push({ pass: data === 'hello', description: 'Emit passes arguments to listener', got: String(data) });

  em.off('click', handler);
  em.emit('click');
  results.push({ pass: called === 2, description: 'After off, handler no longer called', got: String(called) });

  results.push({ pass: em.listenerCount('click') === 0, description: 'listenerCount after off is 0', got: String(em.listenerCount('click')) });

  results.push({ pass: em.listenerCount('data') === 1, description: 'listenerCount for "data" is 1', got: String(em.listenerCount('data')) });

  const count2 = em.emit('nonexistent');
  results.push({ pass: count2 === 0, description: 'Emit unknown event returns 0', got: String(count2) });

  let sum = 0;
  em.on('add', function(a, b) { sum = a + b; });
  em.emit('add', 3, 7);
  results.push({ pass: sum === 10, description: 'Multiple arguments: add(3, 7) → sum=10', got: String(sum) });

  let calls = [];
  em.on('multi', function() { calls.push('a'); });
  em.on('multi', function() { calls.push('b'); });
  em.emit('multi');
  results.push({ pass: JSON.stringify(calls) === '["a","b"]', description: 'Multiple listeners called in order', got: JSON.stringify(calls) });

  return results;
}`,
    hint1:
      'Store listeners in an object where keys are event names and values are arrays of listener functions. `on` pushes to the array, `emit` loops through and calls each one, `off` finds and removes a specific function reference.',
    hint2:
      'Use `this._events = {}` in the constructor. For `emit`, get the listeners array, return 0 if none. Otherwise loop with `.forEach()` and call each listener with the extra arguments. For `off`, use `.indexOf()` and `.splice()` to remove.',
    resources: [...classRes, ...closureRes],
  },

  // 7. Validator Builder
  {
    id: 1317,
    title: 'Validator Builder',
    type: 'js',
    tier: 3,
    category: ['capstone', 'functions'],
    tags: ['hof', 'composition', 'closure', 'capstone', 'application'],
    description:
      'Write a createValidator function that builds chainable validators by composing rule functions.',
    starterCode:
      '/**\n * @param {*} initialValue - The value to validate\n * @returns {object} A validator object with chainable rule methods:\n *   .required() - value must not be undefined, null, or ""\n *   .minLength(n) - string length must be >= n\n *   .maxLength(n) - string length must be <= n\n *   .matches(regex) - value must match the regex pattern\n *   .validate() - returns { valid: boolean, errors: string[] }\n */\nfunction createValidator(initialValue) {\n\n}\n',
    solution:
      'function createValidator(initialValue) {\n  const rules = [];\n  const validator = {\n    required: function() {\n      rules.push(function(val) {\n        if (val === undefined || val === null || val === "") return "Value is required";\n        return null;\n      });\n      return validator;\n    },\n    minLength: function(n) {\n      rules.push(function(val) {\n        if (typeof val === "string" && val.length < n) return "Must be at least " + n + " characters";\n        return null;\n      });\n      return validator;\n    },\n    maxLength: function(n) {\n      rules.push(function(val) {\n        if (typeof val === "string" && val.length > n) return "Must be at most " + n + " characters";\n        return null;\n      });\n      return validator;\n    },\n    matches: function(regex) {\n      rules.push(function(val) {\n        if (typeof val === "string" && !regex.test(val)) return "Must match pattern " + regex;\n        return null;\n      });\n      return validator;\n    },\n    validate: function() {\n      const errors = rules\n        .map(function(rule) { return rule(initialValue); })\n        .filter(function(err) { return err !== null; });\n      return { valid: errors.length === 0, errors: errors };\n    }\n  };\n  return validator;\n}',
    testRunner: `(code) => {
  const fn = new Function(code + '; return createValidator;')();
  const r1 = fn('hello').required().validate();
  const r2 = fn('').required().validate();
  const r3 = fn(null).required().validate();
  const r4 = fn('hi').minLength(5).validate();
  const r5 = fn('hello').minLength(5).validate();
  const r6 = fn('toolong').maxLength(5).validate();
  const r7 = fn('ok').maxLength(5).validate();
  const r8 = fn('abc123').matches(/^[a-z]+$/).validate();
  const r9 = fn('abc').matches(/^[a-z]+$/).validate();
  const r10 = fn('ab').required().minLength(3).maxLength(10).validate();
  return [
    { pass: r1.valid === true && r1.errors.length === 0, description: '"hello" passes required()', got: JSON.stringify(r1) },
    { pass: r2.valid === false && r2.errors[0] === 'Value is required', description: '"" fails required()', got: JSON.stringify(r2) },
    { pass: r3.valid === false, description: 'null fails required()', got: JSON.stringify(r3) },
    { pass: r4.valid === false && r4.errors[0].indexOf('at least 5') !== -1, description: '"hi" fails minLength(5)', got: JSON.stringify(r4) },
    { pass: r5.valid === true, description: '"hello" passes minLength(5)', got: JSON.stringify(r5) },
    { pass: r6.valid === false && r6.errors[0].indexOf('at most 5') !== -1, description: '"toolong" fails maxLength(5)', got: JSON.stringify(r6) },
    { pass: r7.valid === true, description: '"ok" passes maxLength(5)', got: JSON.stringify(r7) },
    { pass: r8.valid === false, description: '"abc123" fails matches(/^[a-z]+$/)', got: JSON.stringify(r8) },
    { pass: r9.valid === true, description: '"abc" passes matches(/^[a-z]+$/)', got: JSON.stringify(r9) },
    { pass: r10.valid === false && r10.errors.length === 1, description: '"ab" chained: passes required, fails minLength(3)', got: JSON.stringify(r10) },
  ];
}`,
    hint1:
      'Create a `rules` array via closure. Each chainable method pushes a validation function to `rules` and returns the validator object for chaining. `.validate()` runs all rules and collects non-null error strings.',
    hint2:
      'Each rule function takes the value and returns an error string or null. For chaining, each method returns the same `validator` object. In `.validate()`, map rules to results, filter out nulls, and return `{ valid, errors }`.',
    resources: [...closureRes, { label: 'MDN: RegExp.prototype.test()', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/test', description: 'RegExp test method' }],
  },

  // 8. Memoize Function
  {
    id: 1318,
    title: 'Memoize Function',
    type: 'js',
    tier: 3,
    category: ['capstone', 'functions'],
    tags: ['closure', 'map', 'hof', 'cache', 'capstone', 'application'],
    description:
      'Write a memoize function that caches the results of a function based on its arguments, avoiding redundant computation.',
    starterCode:
      '/**\n * @param {Function} fn - The function to memoize\n * @returns {Function} A new function that caches results by JSON-stringified arguments\n *   The returned function also has a .cache property (a Map) for inspection\n */\nfunction memoize(fn) {\n\n}\n',
    solution:
      'function memoize(fn) {\n  const cache = new Map();\n  const memoized = function() {\n    const key = JSON.stringify(Array.prototype.slice.call(arguments));\n    if (cache.has(key)) {\n      return cache.get(key);\n    }\n    const result = fn.apply(null, arguments);\n    cache.set(key, result);\n    return result;\n  };\n  memoized.cache = cache;\n  return memoized;\n}',
    testRunner: `(code) => {
  const fn = new Function(code + '; return memoize;')();
  const results = [];

  let callCount = 0;
  const add = fn(function(a, b) { callCount++; return a + b; });
  const r1 = add(1, 2);
  results.push({ pass: r1 === 3 && callCount === 1, description: 'add(1,2) returns 3, calls original once', got: 'result=' + r1 + ', calls=' + callCount });

  const r2 = add(1, 2);
  results.push({ pass: r2 === 3 && callCount === 1, description: 'add(1,2) again returns cached 3, no new call', got: 'result=' + r2 + ', calls=' + callCount });

  const r3 = add(3, 4);
  results.push({ pass: r3 === 7 && callCount === 2, description: 'add(3,4) returns 7, new call', got: 'result=' + r3 + ', calls=' + callCount });

  results.push({ pass: add.cache instanceof Map && add.cache.size === 2, description: 'cache is a Map with 2 entries', got: 'size=' + add.cache.size });

  let factCalls = 0;
  const factorial = fn(function(n) { factCalls++; return n <= 1 ? 1 : n * factorial(n - 1); });
  const r4 = factorial(5);
  results.push({ pass: r4 === 120, description: 'factorial(5) = 120', got: String(r4) });

  const prevCalls = factCalls;
  factorial(5);
  results.push({ pass: factCalls === prevCalls, description: 'factorial(5) cached — no additional calls', got: 'calls after=' + factCalls });

  const identity = fn(function(x) { return x; });
  results.push({ pass: identity('hello') === 'hello' && identity(null) === null, description: 'Works with string and null args', got: identity('hello') + ', ' + identity(null) });

  const noArgs = fn(function() { return 42; });
  noArgs();
  noArgs();
  results.push({ pass: noArgs.cache.size === 1, description: 'No-arg function cached with one entry', got: 'size=' + noArgs.cache.size });

  const objArg = fn(function(o) { return o.x; });
  results.push({ pass: objArg({ x: 1 }) === 1 && objArg({ x: 2 }) === 2, description: 'Different object args cached separately', got: objArg({ x: 1 }) + ', ' + objArg({ x: 2 }) });

  return results;
}`,
    hint1:
      'Use a `Map` for the cache, with `JSON.stringify(arguments)` as the key. Before calling the original function, check if the key exists in the cache. Attach the cache as a `.cache` property on the returned function.',
    hint2:
      'Convert arguments to an array, then stringify for the key: `JSON.stringify(Array.prototype.slice.call(arguments))`. If `cache.has(key)`, return `cache.get(key)`. Otherwise call `fn`, store the result with `cache.set(key, result)`, and return it.',
    resources: [closureRes[0], { label: 'MDN: Map', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map', description: 'Map object reference' }],
  },

  // ══════════════════════════════════════════════════════════════════════════
  // SUB-SECTION C: DOM Integration (3 exercises, IDs 1319-1321)
  // ══════════════════════════════════════════════════════════════════════════

  // 9. Click Counter Widget
  {
    id: 1319,
    title: 'Click Counter Widget',
    type: 'js',
    tier: 3,
    category: ['capstone', 'dom-integration'],
    tags: ['dom', 'events', 'state', 'closure', 'capstone', 'application'],
    description:
      'Write a function that creates a click counter widget — a button and a display element that shows how many times the button has been clicked.',
    starterCode:
      '/**\n * @param {string} buttonId - The id of the button element\n * @param {string} displayId - The id of the display element\n * Sets up the button so each click increments a counter and updates the display\'s textContent\n * Display format: "Clicks: N"\n */\nfunction setupClickCounter(buttonId, displayId) {\n\n}\n',
    solution:
      'function setupClickCounter(buttonId, displayId) {\n  let count = 0;\n  const button = document.getElementById(buttonId);\n  const display = document.getElementById(displayId);\n  display.textContent = "Clicks: 0";\n  button.addEventListener("click", function() {\n    count++;\n    display.textContent = "Clicks: " + count;\n  });\n}',
    testRunner: `(code) => {
  const root = document.createElement('div');
  root.innerHTML = '<button id="btn">Click</button><span id="count"></span>';
  document.body.appendChild(root);
  const fn = new Function(code + '; return setupClickCounter;')();
  fn('btn', 'count');
  const btn = document.getElementById('btn');
  const display = document.getElementById('count');
  const results = [];

  results.push({ pass: display.textContent === 'Clicks: 0', description: 'Initial display: "Clicks: 0"', got: display.textContent });

  btn.dispatchEvent(new Event('click', { bubbles: true }));
  results.push({ pass: display.textContent === 'Clicks: 1', description: 'After 1 click: "Clicks: 1"', got: display.textContent });

  btn.dispatchEvent(new Event('click', { bubbles: true }));
  btn.dispatchEvent(new Event('click', { bubbles: true }));
  results.push({ pass: display.textContent === 'Clicks: 3', description: 'After 3 clicks: "Clicks: 3"', got: display.textContent });

  for (let i = 0; i < 7; i++) btn.dispatchEvent(new Event('click', { bubbles: true }));
  results.push({ pass: display.textContent === 'Clicks: 10', description: 'After 10 clicks: "Clicks: 10"', got: display.textContent });

  const root2 = document.createElement('div');
  root2.innerHTML = '<button id="btn2">Go</button><span id="count2"></span>';
  document.body.appendChild(root2);
  fn('btn2', 'count2');
  const display2 = document.getElementById('count2');
  results.push({ pass: display2.textContent === 'Clicks: 0', description: 'Second counter starts at 0', got: display2.textContent });

  document.getElementById('btn2').dispatchEvent(new Event('click', { bubbles: true }));
  results.push({ pass: display2.textContent === 'Clicks: 1' && display.textContent === 'Clicks: 10', description: 'Second counter independent from first', got: 'counter1=' + display.textContent + ', counter2=' + display2.textContent });

  root.remove();
  root2.remove();
  return results;
}`,
    hint1:
      'Use a closure variable `count` to track clicks. Get the button and display elements by ID, set the initial text, then add a "click" event listener that increments the counter and updates the display.',
    hint2:
      'Declare `let count = 0;` inside the function. Use `document.getElementById()` for both elements. Set `display.textContent = "Clicks: 0"`. Add `button.addEventListener("click", function() { count++; display.textContent = "Clicks: " + count; })`.',
    resources: domRes,
  },

  // 10. Dynamic Table Builder
  {
    id: 1320,
    title: 'Dynamic Table Builder',
    type: 'js',
    tier: 3,
    category: ['capstone', 'dom-integration'],
    tags: ['dom', 'creation', 'data-processing', 'capstone', 'application'],
    description:
      'Write a function that generates an HTML table from an array of objects, using the object keys as column headers.',
    starterCode:
      '/**\n * @param {Object[]} data - Array of objects (all objects have the same keys)\n * @param {string} containerId - The id of the container element to append the table to\n * Creates a <table> with <thead> (one <th> per key) and <tbody> (one <tr> per object, one <td> per value)\n */\nfunction buildTable(data, containerId) {\n\n}\n',
    solution:
      'function buildTable(data, containerId) {\n  const container = document.getElementById(containerId);\n  const table = document.createElement("table");\n  if (data.length === 0) {\n    container.appendChild(table);\n    return;\n  }\n  const keys = Object.keys(data[0]);\n  const thead = document.createElement("thead");\n  const headerRow = document.createElement("tr");\n  keys.forEach(function(key) {\n    const th = document.createElement("th");\n    th.textContent = key;\n    headerRow.appendChild(th);\n  });\n  thead.appendChild(headerRow);\n  table.appendChild(thead);\n  const tbody = document.createElement("tbody");\n  data.forEach(function(row) {\n    const tr = document.createElement("tr");\n    keys.forEach(function(key) {\n      const td = document.createElement("td");\n      td.textContent = row[key];\n      tr.appendChild(td);\n    });\n    tbody.appendChild(tr);\n  });\n  table.appendChild(tbody);\n  container.appendChild(table);\n}',
    testRunner: `(code) => {
  const root = document.createElement('div');
  root.innerHTML = '<div id="t1"></div><div id="t2"></div><div id="t3"></div>';
  document.body.appendChild(root);
  const fn = new Function(code + '; return buildTable;')();
  const results = [];

  fn([{ name: 'Alice', age: 30 }, { name: 'Bob', age: 25 }], 't1');
  const table1 = document.querySelector('#t1 table');
  results.push({ pass: table1 !== null, description: 'Table element created in container', got: table1 ? 'exists' : 'missing' });

  const ths = table1.querySelectorAll('thead th');
  results.push({ pass: ths.length === 2 && ths[0].textContent === 'name' && ths[1].textContent === 'age', description: 'Headers: "name", "age"', got: Array.from(ths).map(function(h) { return h.textContent; }).join(', ') });

  const rows = table1.querySelectorAll('tbody tr');
  results.push({ pass: rows.length === 2, description: '2 body rows', got: String(rows.length) });

  const cells = rows[0].querySelectorAll('td');
  results.push({ pass: cells[0].textContent === 'Alice' && cells[1].textContent === '30', description: 'First row: Alice, 30', got: cells[0].textContent + ', ' + cells[1].textContent });

  const cells2 = rows[1].querySelectorAll('td');
  results.push({ pass: cells2[0].textContent === 'Bob' && cells2[1].textContent === '25', description: 'Second row: Bob, 25', got: cells2[0].textContent + ', ' + cells2[1].textContent });

  fn([{ x: 1, y: 2, z: 3 }], 't2');
  const ths2 = document.querySelectorAll('#t2 table thead th');
  results.push({ pass: ths2.length === 3, description: '3 columns for { x, y, z }', got: String(ths2.length) });

  fn([], 't3');
  const table3 = document.querySelector('#t3 table');
  results.push({ pass: table3 !== null, description: 'Empty data still creates table element', got: table3 ? 'exists' : 'missing' });

  const tbody3 = table3.querySelector('tbody');
  const noRows = tbody3 ? tbody3.querySelectorAll('tr').length : 0;
  results.push({ pass: noRows === 0, description: 'Empty data has no body rows', got: String(noRows) });

  root.remove();
  return results;
}`,
    hint1:
      'Get the keys from the first object with `Object.keys(data[0])`. Create `<table>`, `<thead>`, and `<tbody>` elements. Loop through keys for `<th>` headers, then loop through data for `<tr>` rows with `<td>` cells.',
    hint2:
      'Use `document.createElement()` for each element. For headers: loop keys, create `<th>`, set `textContent`, append to header row. For body: loop data, create `<tr>`, loop keys for each `<td>` with `row[key]` as textContent. Append table to container.',
    resources: domRes,
  },

  // 11. Filterable List
  {
    id: 1321,
    title: 'Filterable List',
    type: 'js',
    tier: 3,
    category: ['capstone', 'dom-integration'],
    tags: ['dom', 'events', 'filter', 'classList', 'capstone', 'application'],
    description:
      'Write a function that sets up a text input to filter a list of items — typing in the input hides list items that do not match (case-insensitive).',
    starterCode:
      '/**\n * @param {string} inputId - The id of the text input element\n * @param {string} listId - The id of the <ul> element containing <li> items\n * Adds an "input" event listener that shows/hides <li> elements based on whether\n * their textContent includes the search text (case-insensitive).\n * Hidden items get style.display = "none", visible items get style.display = ""\n */\nfunction setupFilter(inputId, listId) {\n\n}\n',
    solution:
      'function setupFilter(inputId, listId) {\n  const input = document.getElementById(inputId);\n  const list = document.getElementById(listId);\n  input.addEventListener("input", function() {\n    const search = input.value.toLowerCase();\n    const items = list.querySelectorAll("li");\n    items.forEach(function(item) {\n      if (item.textContent.toLowerCase().indexOf(search) !== -1) {\n        item.style.display = "";\n      } else {\n        item.style.display = "none";\n      }\n    });\n  });\n}',
    testRunner: `(code) => {
  const root = document.createElement('div');
  root.innerHTML = '<input id="search" type="text"><ul id="fruits"><li>Apple</li><li>Banana</li><li>Cherry</li><li>Apricot</li><li>Blueberry</li></ul>';
  document.body.appendChild(root);
  const fn = new Function(code + '; return setupFilter;')();
  fn('search', 'fruits');
  const input = document.getElementById('search');
  const items = document.querySelectorAll('#fruits li');
  const results = [];

  const getVisible = function() {
    return Array.from(items).filter(function(li) { return li.style.display !== 'none'; }).map(function(li) { return li.textContent; });
  };

  results.push({ pass: getVisible().length === 5, description: 'Initially all 5 items visible', got: String(getVisible().length) });

  input.value = 'ap';
  input.dispatchEvent(new Event('input', { bubbles: true }));
  const v1 = getVisible();
  results.push({ pass: v1.length === 2 && v1.indexOf('Apple') !== -1 && v1.indexOf('Apricot') !== -1, description: 'Filter "ap": Apple, Apricot visible', got: JSON.stringify(v1) });

  input.value = 'berry';
  input.dispatchEvent(new Event('input', { bubbles: true }));
  const v2 = getVisible();
  results.push({ pass: v2.length === 1 && v2[0] === 'Blueberry', description: 'Filter "berry": only Blueberry', got: JSON.stringify(v2) });

  input.value = '';
  input.dispatchEvent(new Event('input', { bubbles: true }));
  results.push({ pass: getVisible().length === 5, description: 'Empty filter: all visible again', got: String(getVisible().length) });

  input.value = 'CHERRY';
  input.dispatchEvent(new Event('input', { bubbles: true }));
  const v3 = getVisible();
  results.push({ pass: v3.length === 1 && v3[0] === 'Cherry', description: 'Filter "CHERRY" (case-insensitive): Cherry visible', got: JSON.stringify(v3) });

  input.value = 'xyz';
  input.dispatchEvent(new Event('input', { bubbles: true }));
  results.push({ pass: getVisible().length === 0, description: 'Filter "xyz": no matches, all hidden', got: String(getVisible().length) });

  input.value = 'a';
  input.dispatchEvent(new Event('input', { bubbles: true }));
  const v4 = getVisible();
  results.push({ pass: v4.length === 3 && v4.indexOf('Apple') !== -1 && v4.indexOf('Banana') !== -1 && v4.indexOf('Apricot') !== -1, description: 'Filter "a": Apple, Banana, Apricot visible', got: JSON.stringify(v4) });

  input.value = 'ban';
  input.dispatchEvent(new Event('input', { bubbles: true }));
  const v5 = getVisible();
  results.push({ pass: v5.length === 1 && v5[0] === 'Banana', description: 'Filter "ban": only Banana', got: JSON.stringify(v5) });

  root.remove();
  return results;
}`,
    hint1:
      'Add an "input" event listener on the text input. Inside, get the search value (lowercased), select all `<li>` elements inside the list, and toggle each one\'s `style.display` based on whether its `textContent` includes the search text.',
    hint2:
      'Use `input.addEventListener("input", ...)`. Inside: `const search = input.value.toLowerCase()`. Then `list.querySelectorAll("li").forEach(...)` — for each item, check `item.textContent.toLowerCase().indexOf(search) !== -1`. Set `style.display` to `""` or `"none"`.',
    resources: domRes,
  },

  // ══════════════════════════════════════════════════════════════════════════
  // SUB-SECTION D: Async Integration (3 exercises, IDs 1322-1324)
  // ══════════════════════════════════════════════════════════════════════════

  // 12. Retry Until Success
  {
    id: 1322,
    title: 'Retry Until Success',
    type: 'js',
    tier: 3,
    category: ['capstone', 'async-integration'],
    tags: ['async', 'await', 'retry', 'error-handling', 'capstone', 'application'],
    description:
      'Write an async function that retries a failing async operation up to a maximum number of times before giving up.',
    starterCode:
      '/**\n * @param {Function} asyncFn - An async function (takes no arguments) that may resolve or reject\n * @param {number} maxRetries - Maximum number of retry attempts (not counting the initial try)\n * @returns {Promise<*>} The resolved value on success\n * @throws {Error} The last error if all attempts fail, with message "Failed after N attempts: <original message>"\n */\nasync function retry(asyncFn, maxRetries) {\n\n}\n',
    solution:
      'async function retry(asyncFn, maxRetries) {\n  let lastError;\n  for (let i = 0; i <= maxRetries; i++) {\n    try {\n      return await asyncFn();\n    } catch (err) {\n      lastError = err;\n    }\n  }\n  throw new Error("Failed after " + (maxRetries + 1) + " attempts: " + lastError.message);\n}',
    testRunner: `async (code) => {
  const fn = new Function(code + '; return retry;')();
  const results = [];

  const r1 = await fn(async function() { return 'ok'; }, 3);
  results.push({ pass: r1 === 'ok', description: 'Succeeds immediately → returns "ok"', got: String(r1) });

  let count2 = 0;
  const r2 = await fn(async function() { count2++; if (count2 < 3) throw new Error('fail'); return 'recovered'; }, 5);
  results.push({ pass: r2 === 'recovered' && count2 === 3, description: 'Fails 2x, succeeds on 3rd try', got: 'result=' + r2 + ', attempts=' + count2 });

  let count3 = 0;
  let err3 = '';
  try { await fn(async function() { count3++; throw new Error('always fails'); }, 2); } catch (e) { err3 = e.message; }
  results.push({ pass: count3 === 3 && err3 === 'Failed after 3 attempts: always fails', description: 'All 3 attempts fail → throws with count', got: err3 });

  let count4 = 0;
  let err4 = '';
  try { await fn(async function() { count4++; throw new Error('nope'); }, 0); } catch (e) { err4 = e.message; }
  results.push({ pass: count4 === 1 && err4 === 'Failed after 1 attempts: nope', description: '0 retries = 1 attempt total', got: err4 });

  let count5 = 0;
  const r5 = await fn(async function() { count5++; if (count5 === 1) throw new Error('first'); return 42; }, 1);
  results.push({ pass: r5 === 42, description: 'Fails once, succeeds on retry → 42', got: String(r5) });

  const r6 = await fn(async function() { return null; }, 3);
  results.push({ pass: r6 === null, description: 'Returns null successfully', got: String(r6) });

  let count7 = 0;
  const r7 = await fn(async function() { count7++; if (count7 <= 4) throw new Error('x'); return 'done'; }, 4);
  results.push({ pass: r7 === 'done' && count7 === 5, description: 'Succeeds on last attempt (5th of 5)', got: 'result=' + r7 + ', attempts=' + count7 });

  let count8 = 0;
  let err8 = '';
  try { await fn(async function() { count8++; throw new Error('err' + count8); }, 1); } catch (e) { err8 = e.message; }
  results.push({ pass: err8 === 'Failed after 2 attempts: err2', description: 'Error message uses LAST error', got: err8 });

  return results;
}`,
    hint1:
      'Use a `for` loop from 0 to maxRetries (inclusive). Inside, `try` to `await asyncFn()` and return on success. In `catch`, save the error. After the loop ends without returning, throw a new Error with the attempt count and last error message.',
    hint2:
      'Loop `for (let i = 0; i <= maxRetries; i++)`. Inside: `try { return await asyncFn(); } catch (err) { lastError = err; }`. After the loop: `throw new Error("Failed after " + (maxRetries + 1) + " attempts: " + lastError.message)`.',
    resources: asyncRes,
  },

  // 13. Config Loader
  {
    id: 1323,
    title: 'Config Loader',
    type: 'js',
    tier: 3,
    category: ['capstone', 'async-integration'],
    tags: ['async', 'await', 'error-handling', 'sequential', 'capstone', 'application'],
    description:
      'Write an async function that tries multiple config sources in order and returns the first successful result.',
    starterCode:
      '/**\n * @param {Function[]} sources - Array of async functions that return config objects (or reject)\n * @returns {Promise<object>} The config from the first source that succeeds\n * @throws {Error} Error("All config sources failed") if every source rejects\n */\nasync function loadConfig(sources) {\n\n}\n',
    solution:
      'async function loadConfig(sources) {\n  for (let i = 0; i < sources.length; i++) {\n    try {\n      return await sources[i]();\n    } catch (err) {\n      // try next source\n    }\n  }\n  throw new Error("All config sources failed");\n}',
    testRunner: `async (code) => {
  const fn = new Function(code + '; return loadConfig;')();
  const results = [];

  const ok1 = async function() { return { port: 3000 }; };
  const ok2 = async function() { return { port: 8080 }; };
  const fail1 = async function() { throw new Error('not found'); };
  const fail2 = async function() { throw new Error('denied'); };

  const r1 = await fn([ok1, ok2]);
  results.push({ pass: r1.port === 3000, description: 'First source succeeds → uses first', got: JSON.stringify(r1) });

  const r2 = await fn([fail1, ok2]);
  results.push({ pass: r2.port === 8080, description: 'First fails, second succeeds → uses second', got: JSON.stringify(r2) });

  const r3 = await fn([fail1, fail2, ok1]);
  results.push({ pass: r3.port === 3000, description: 'First two fail, third succeeds', got: JSON.stringify(r3) });

  let err4 = '';
  try { await fn([fail1, fail2]); } catch (e) { err4 = e.message; }
  results.push({ pass: err4 === 'All config sources failed', description: 'All fail → throws "All config sources failed"', got: err4 });

  let err5 = '';
  try { await fn([]); } catch (e) { err5 = e.message; }
  results.push({ pass: err5 === 'All config sources failed', description: 'Empty array → throws', got: err5 });

  const r6 = await fn([ok1]);
  results.push({ pass: r6.port === 3000, description: 'Single successful source works', got: JSON.stringify(r6) });

  let callOrder = [];
  const track1 = async function() { callOrder.push(1); throw new Error('x'); };
  const track2 = async function() { callOrder.push(2); return { found: true }; };
  const track3 = async function() { callOrder.push(3); return { found: false }; };
  await fn([track1, track2, track3]);
  results.push({ pass: JSON.stringify(callOrder) === '[1,2]', description: 'Stops trying after first success (does not call source 3)', got: JSON.stringify(callOrder) });

  const r8 = await fn([fail1, async function() { return { env: 'dev', debug: true }; }]);
  results.push({ pass: r8.env === 'dev' && r8.debug === true, description: 'Returns full config object from fallback source', got: JSON.stringify(r8) });

  return results;
}`,
    hint1:
      'Loop through the sources array and `await` each one inside a `try/catch`. If it succeeds, return immediately. If it fails, continue to the next source. If the loop finishes without returning, throw the "All config sources failed" error.',
    hint2:
      'Use `for (let i = 0; i < sources.length; i++)` with `try { return await sources[i](); } catch (err) { }` inside. After the loop: `throw new Error("All config sources failed");`. The early `return` ensures you stop at the first success.',
    resources: asyncRes,
  },

  // 14. Async Data Pipeline
  {
    id: 1324,
    title: 'Async Data Pipeline',
    type: 'js',
    tier: 3,
    category: ['capstone', 'async-integration'],
    tags: ['async', 'await', 'pipeline', 'error-handling', 'capstone', 'application'],
    description:
      'Write an async function that processes data through a pipeline of async stages (fetch, transform, validate), with error handling at each step.',
    starterCode:
      '/**\n * @param {object} pipeline - { fetch: async fn, transform: async fn, validate: async fn }\n *   fetch() returns raw data, transform(data) returns processed data, validate(data) returns validated data\n * @returns {Promise<{success: boolean, data?: *, stage?: string, error?: string}>}\n *   On success: { success: true, data: validatedResult }\n *   On failure: { success: false, stage: "fetch"|"transform"|"validate", error: message }\n */\nasync function runPipeline(pipeline) {\n\n}\n',
    solution:
      'async function runPipeline(pipeline) {\n  let data;\n  try {\n    data = await pipeline.fetch();\n  } catch (err) {\n    return { success: false, stage: "fetch", error: err.message };\n  }\n  try {\n    data = await pipeline.transform(data);\n  } catch (err) {\n    return { success: false, stage: "transform", error: err.message };\n  }\n  try {\n    data = await pipeline.validate(data);\n  } catch (err) {\n    return { success: false, stage: "validate", error: err.message };\n  }\n  return { success: true, data: data };\n}',
    testRunner: `async (code) => {
  const fn = new Function(code + '; return runPipeline;')();
  const results = [];

  const r1 = await fn({
    fetch: async function() { return [1, 2, 3]; },
    transform: async function(d) { return d.map(function(n) { return n * 2; }); },
    validate: async function(d) { if (d.length === 0) throw new Error('empty'); return d; }
  });
  results.push({ pass: r1.success === true && JSON.stringify(r1.data) === '[2,4,6]', description: 'All stages succeed → { success: true, data: [2,4,6] }', got: JSON.stringify(r1) });

  const r2 = await fn({
    fetch: async function() { throw new Error('network error'); },
    transform: async function(d) { return d; },
    validate: async function(d) { return d; }
  });
  results.push({ pass: r2.success === false && r2.stage === 'fetch' && r2.error === 'network error', description: 'Fetch fails → stage: "fetch"', got: JSON.stringify(r2) });

  const r3 = await fn({
    fetch: async function() { return 'raw'; },
    transform: async function() { throw new Error('parse failed'); },
    validate: async function(d) { return d; }
  });
  results.push({ pass: r3.success === false && r3.stage === 'transform' && r3.error === 'parse failed', description: 'Transform fails → stage: "transform"', got: JSON.stringify(r3) });

  const r4 = await fn({
    fetch: async function() { return { name: '' }; },
    transform: async function(d) { return d; },
    validate: async function(d) { if (!d.name) throw new Error('name required'); return d; }
  });
  results.push({ pass: r4.success === false && r4.stage === 'validate' && r4.error === 'name required', description: 'Validate fails → stage: "validate"', got: JSON.stringify(r4) });

  const r5 = await fn({
    fetch: async function() { return 'hello'; },
    transform: async function(d) { return d.toUpperCase(); },
    validate: async function(d) { return d; }
  });
  results.push({ pass: r5.success === true && r5.data === 'HELLO', description: 'String pipeline: "hello" → "HELLO"', got: JSON.stringify(r5) });

  const r6 = await fn({
    fetch: async function() { return { x: 1 }; },
    transform: async function(d) { d.y = 2; return d; },
    validate: async function(d) { if (!d.x || !d.y) throw new Error('missing'); return d; }
  });
  results.push({ pass: r6.success === true && r6.data.x === 1 && r6.data.y === 2, description: 'Object enriched through pipeline', got: JSON.stringify(r6) });

  results.push({ pass: r2.data === undefined, description: 'Failed result has no data property', got: String(r2.data) });

  const r8 = await fn({
    fetch: async function() { return null; },
    transform: async function(d) { return d; },
    validate: async function(d) { return d; }
  });
  results.push({ pass: r8.success === true && r8.data === null, description: 'null flows through pipeline successfully', got: JSON.stringify(r8) });

  return results;
}`,
    hint1:
      'Run each stage in its own `try/catch` so you can identify which stage failed. Pass the output of each stage as input to the next. On failure, return immediately with the stage name and error message.',
    hint2:
      'Three sequential try/catch blocks: `try { data = await pipeline.fetch(); } catch (err) { return { success: false, stage: "fetch", error: err.message }; }`. Same pattern for transform and validate. At the end return `{ success: true, data }`.',
    resources: [...asyncRes, ...errorRes],
  },
];

// ─── Validation ─────────────────────────────────────────────────────────────

function isDomExercise(ex) {
  return /document\.createElement\b/.test(ex.testRunner);
}

async function validate() {
  if (exercises.some(isDomExercise) && !JSDOM) {
    console.error('jsdom is required for DOM exercise validation.');
    process.exit(1);
  }

  let pass = 0;
  let fail = 0;

  for (const ex of exercises) {
    try {
      let results;

      if (isDomExercise(ex)) {
        // Run in JSDOM
        const dom = new JSDOM(
          '<!DOCTYPE html><html><body></body></html>',
          { runScripts: 'dangerously', url: 'http://localhost' }
        );
        const script = dom.window.document.createElement('script');
        script.textContent = `
          (async () => {
            try {
              const runner = (${ex.testRunner});
              const results = await runner(${JSON.stringify(ex.solution)});
              window.__testResults = results;
            } catch (err) {
              window.__testError = err.message;
            }
          })();
        `;
        dom.window.document.body.appendChild(script);

        // Wait for async completion
        await new Promise((resolve) => setTimeout(resolve, 100));

        if (dom.window.__testError) {
          throw new Error(dom.window.__testError);
        }
        results = dom.window.__testResults;
        dom.window.close();
      } else if (ex.testRunner.trimStart().startsWith('async')) {
        // Async testRunner
        const runner = new Function(`return (${ex.testRunner})`)();
        results = await runner(ex.solution);
      } else {
        // Sync testRunner
        const runner = new Function(`return (${ex.testRunner})`)();
        results = runner(ex.solution);
      }

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
        console.log(`  ✓ [${ex.id}] ${ex.title} (${results.length} tests)`);
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
