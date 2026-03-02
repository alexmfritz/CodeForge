#!/usr/bin/env node
/**
 * Generator: T2 Classes Introduction (3 exercises, IDs 1160-1162)
 *
 * Also removes old pre-overhaul class exercises (IDs 906, 907, 908).
 * Keeps 909 (T3 Multiple Methods) intact.
 *
 * Usage:
 *   node exercises/_gen_t2_classes_intro.js            # Remove old + append new
 *   node exercises/_gen_t2_classes_intro.js --validate  # Validate testRunners only
 */

const fs = require('fs');
const path = require('path');

const CURRICULUM_PATH = path.join(
  __dirname,
  'collections',
  'default-curriculum.json'
);

// IDs to remove (old pre-overhaul T2 class exercises)
const IDS_TO_REMOVE = [906, 907, 908];

// ─── Helper: W3Schools + MDN resources for classes ────────────────────────────

const classResources = [
  {
    label: 'W3Schools: JavaScript Classes',
    url: 'https://www.w3schools.com/js/js_classes.asp',
    description: 'Class basics',
  },
  {
    label: 'MDN: Classes',
    url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes',
    description: 'Class reference',
  },
];

// ─── Exercise Definitions ────────────────────────────────────────────────────

const exercises = [
  // ── 1. Class Basics: Create a Class (scaffolded entry) ─────────────────
  {
    id: 1160,
    title: 'Class Basics: Create a Class',
    type: 'js',
    tier: 2,
    category: ['js-fundamentals', 'classes'],
    tags: ['classes', 'constructor', 'this', 'properties'],
    description:
      'Define a class with a constructor that sets properties using the this keyword.',
    instructions:
      'A class is a blueprint for creating objects. The `constructor` method runs automatically when you create a new instance with `new`. Inside the constructor, you use `this` to attach properties to the new object.\n\nCreate a class called `Pet` with a constructor that takes `name` and `species` parameters and stores them as properties.\n\nExample: `new Pet("Max", "dog").name` returns `"Max"`.\n\nExample: `new Pet("Whiskers", "cat").species` returns `"cat"`.',
    starterCode:
      '// A class is a blueprint for creating objects.\n// The constructor runs when you use `new ClassName()`.\n// Use `this.propertyName = value` to set properties.\n//\n// Syntax:\n//   class ClassName {\n//     constructor(param1, param2) {\n//       this.param1 = param1;\n//       this.param2 = param2;\n//     }\n//   }\n\nclass Pet {\n  // Write a constructor that takes name and species\n  // and stores them as this.name and this.species\n}\n',
    solution:
      'class Pet {\n  constructor(name, species) {\n    this.name = name;\n    this.species = species;\n  }\n}',
    testRunner: `(code) => {
  const PetClass = new Function(code + '; return Pet;')();
  const p1 = new PetClass('Max', 'dog');
  const p2 = new PetClass('Whiskers', 'cat');
  const p3 = new PetClass('Goldie', 'fish');
  return [
    { pass: p1.name === 'Max', description: 'new Pet("Max", "dog").name returns "Max"', got: String(p1.name) },
    { pass: p1.species === 'dog', description: 'new Pet("Max", "dog").species returns "dog"', got: String(p1.species) },
    { pass: p2.name === 'Whiskers', description: 'new Pet("Whiskers", "cat").name returns "Whiskers"', got: String(p2.name) },
    { pass: p2.species === 'cat', description: 'new Pet("Whiskers", "cat").species returns "cat"', got: String(p2.species) },
    { pass: p3.name === 'Goldie' && p3.species === 'fish', description: 'new Pet("Goldie", "fish") sets both properties', got: p3.name + ', ' + p3.species },
    { pass: p1 instanceof PetClass, description: 'Pet instances are created with new keyword', got: String(p1 instanceof PetClass) }
  ];
}`,
    hints: [
      'Inside the class body, write `constructor(name, species)` and then assign `this.name = name` and `this.species = species` inside it.',
      'The `this` keyword refers to the specific object being created. Each time you call `new Pet(...)`, a fresh object is created and `this` points to it.',
    ],
    resources: classResources,
  },

  // ── 2. Class Basics: Add a Method ──────────────────────────────────────
  {
    id: 1161,
    title: 'Class Basics: Add a Method',
    type: 'js',
    tier: 2,
    category: ['js-fundamentals', 'classes'],
    tags: ['classes', 'methods', 'constructor', 'this'],
    description:
      'Define a class with a constructor and a method that uses the instance properties.',
    instructions:
      'Methods are functions defined inside a class that can access the instance\'s properties using `this`. They are written without the `function` keyword.\n\nCreate a class called `Rectangle` with a constructor that takes `width` and `height`, and a `getArea()` method that returns the area (width times height).\n\nExample: `new Rectangle(5, 3).getArea()` returns `15`.\n\nExample: `new Rectangle(10, 10).getArea()` returns `100`.',
    starterCode: 'class Rectangle {\n\n}\n',
    solution:
      'class Rectangle {\n  constructor(width, height) {\n    this.width = width;\n    this.height = height;\n  }\n\n  getArea() {\n    return this.width * this.height;\n  }\n}',
    testRunner: `(code) => {
  const RectClass = new Function(code + '; return Rectangle;')();
  const r1 = new RectClass(5, 3);
  const r2 = new RectClass(10, 10);
  const r3 = new RectClass(1, 1);
  const r4 = new RectClass(7, 0);
  return [
    { pass: r1.getArea() === 15, description: 'new Rectangle(5, 3).getArea() returns 15 (5*3)', got: String(r1.getArea()) },
    { pass: r2.getArea() === 100, description: 'new Rectangle(10, 10).getArea() returns 100 (10*10)', got: String(r2.getArea()) },
    { pass: r1.width === 5 && r1.height === 3, description: 'Rectangle stores width and height properties', got: r1.width + ', ' + r1.height },
    { pass: r3.getArea() === 1, description: 'new Rectangle(1, 1).getArea() returns 1', got: String(r3.getArea()) },
    { pass: r4.getArea() === 0, description: 'new Rectangle(7, 0).getArea() returns 0 (zero height)', got: String(r4.getArea()) },
    { pass: typeof r1.getArea === 'function', description: 'getArea is a method on the instance', got: typeof r1.getArea }
  ];
}`,
    hints: [
      'Define the `constructor(width, height)` to set `this.width` and `this.height`. Then define `getArea()` as a separate method (no `function` keyword) that returns `this.width * this.height`.',
      'Methods are written at the same level as the constructor inside the class body. They automatically have access to `this`, which refers to the specific instance the method is called on.',
    ],
    resources: classResources,
  },

  // ── 3. Class Basics: State Methods ─────────────────────────────────────
  {
    id: 1162,
    title: 'Class Basics: State Methods',
    type: 'js',
    tier: 2,
    category: ['js-fundamentals', 'classes'],
    tags: ['classes', 'methods', 'state', 'constructor', 'this'],
    description:
      'Define a class with methods that modify and read internal state.',
    instructions:
      'Classes can have methods that change their internal state (properties) and methods that read it. This is the foundation of object-oriented programming.\n\nCreate a class called `Counter` with:\n- A constructor that sets `this.count` to `0`\n- An `increment()` method that adds 1 to `this.count`\n- A `decrement()` method that subtracts 1 from `this.count`\n- A `getCount()` method that returns the current count\n\nExample:\n```\nconst c = new Counter();\nc.increment();\nc.increment();\nc.getCount(); // returns 2\nc.decrement();\nc.getCount(); // returns 1\n```',
    starterCode: 'class Counter {\n\n}\n',
    solution:
      'class Counter {\n  constructor() {\n    this.count = 0;\n  }\n\n  increment() {\n    this.count++;\n  }\n\n  decrement() {\n    this.count--;\n  }\n\n  getCount() {\n    return this.count;\n  }\n}',
    testRunner: `(code) => {
  const CounterClass = new Function(code + '; return Counter;')();
  const c1 = new CounterClass();
  const c2 = new CounterClass();
  c1.increment();
  c1.increment();
  c1.increment();
  const afterThreeInc = c1.getCount();
  c1.decrement();
  const afterOneDec = c1.getCount();
  return [
    { pass: new CounterClass().getCount() === 0, description: 'new Counter().getCount() returns 0 (starts at zero)', got: String(new CounterClass().getCount()) },
    { pass: afterThreeInc === 3, description: 'After 3 increments, getCount() returns 3', got: String(afterThreeInc) },
    { pass: afterOneDec === 2, description: 'After 3 increments and 1 decrement, getCount() returns 2', got: String(afterOneDec) },
    { pass: c2.getCount() === 0, description: 'Each Counter instance has its own count (c2 is still 0)', got: String(c2.getCount()) },
    { pass: (() => { const c = new CounterClass(); c.decrement(); return c.getCount() === -1; })(), description: 'Decrementing from 0 gives -1 (no floor)', got: String((() => { const c = new CounterClass(); c.decrement(); return c.getCount(); })()) },
    { pass: typeof c1.increment === 'function' && typeof c1.decrement === 'function' && typeof c1.getCount === 'function', description: 'Counter has increment, decrement, and getCount methods', got: 'all methods exist' }
  ];
}`,
    hints: [
      'The constructor takes no parameters — just set `this.count = 0`. Then define three methods: `increment()` uses `this.count++`, `decrement()` uses `this.count--`, and `getCount()` returns `this.count`.',
      'Each instance created with `new Counter()` gets its own `count` property. Calling methods on one instance does not affect another — they have independent state.',
    ],
    resources: classResources,
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

  console.log(`\nT2 Classes Introduction — ${exercises.length} exercises\n`);
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

  // Remove old pre-overhaul class exercises
  const beforeCount = curriculum.exercises.length;
  curriculum.exercises = curriculum.exercises.filter(
    (e) => !IDS_TO_REMOVE.includes(e.id)
  );
  const removedCount = beforeCount - curriculum.exercises.length;
  console.log(
    `✓ Removed ${removedCount} old exercises (IDs ${IDS_TO_REMOVE.join(', ')})\n`
  );

  // Check for ID collisions
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
    `✓ Appended ${exercises.length} exercises (IDs ${exercises[0].id}-${exercises[exercises.length - 1].id}) to default-curriculum.json`
  );
  console.log(
    `  Net change: ${beforeCount} → ${curriculum.exercises.length} exercises\n`
  );
}

main();
