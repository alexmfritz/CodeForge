#!/usr/bin/env node
/**
 * Generator: T3 Advanced Classes — Section 4 (16 exercises, IDs 1259-1274)
 *
 * Covers: Getters/Setters/Static, Inheritance Intro, Two-Class Interaction
 *
 * Usage:
 *   node exercises/_gen_t3_advanced_classes.js            # Append to curriculum
 *   node exercises/_gen_t3_advanced_classes.js --validate  # Validate testRunners only
 */

const fs = require('fs');
const path = require('path');

const CURRICULUM_PATH = path.join(
  __dirname,
  'collections',
  'default-curriculum.json'
);

// ─── Resources (MDN only for T3) ────────────────────────────────────────────

const classRes = [
  { label: 'MDN: Classes', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes', description: 'Classes reference' },
];
const getterSetterRes = [
  { label: 'MDN: getter', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/get', description: 'Getter reference' },
  { label: 'MDN: setter', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/set', description: 'Setter reference' },
];
const staticRes = [
  { label: 'MDN: static', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/static', description: 'Static methods reference' },
];
const inheritRes = [
  { label: 'MDN: extends', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/extends', description: 'Extends reference' },
  { label: 'MDN: super', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/super', description: 'Super reference' },
];

// ─── Exercise Definitions ───────────────────────────────────────────────────

const exercises = [

  // ══════════════════════════════════════════════════════════════════════════
  // SUB-SECTION 1: Single-Class Fundamentals (6 exercises, IDs 1259-1264)
  // ══════════════════════════════════════════════════════════════════════════

  // 1. Getters and Setters (ENTRY POINT)
  {
    id: 1259,
    title: 'Getters and Setters',
    type: 'js',
    tier: 3,
    category: ['js-fundamentals', 'classes'],
    tags: ['classes', 'getter', 'setter', 'computed-property', 'conversion'],
    description:
      'Create a class with a getter and setter that converts between Celsius and Fahrenheit.',
    instructions:
      'Getters and setters are special methods that look like property access. A `get` method computes a value when the property is read. A `set` method runs logic (like validation or conversion) when the property is assigned.\n\nSyntax:\n```\nclass Example {\n  get prop() { return this._value; }\n  set prop(val) { this._value = val; }\n}\nconst e = new Example();\ne.prop = 5;     // calls the setter\ne.prop;         // calls the getter\n```\n\nCreate a `Temperature` class that stores temperature internally in Celsius. Add `get fahrenheit()` to compute the Fahrenheit value, and `set fahrenheit(f)` to convert from Fahrenheit back to Celsius when assigned (see `@param`/`@returns` in the starter code).\n\nFormula: `F = C * 9/5 + 32` and `C = (F - 32) * 5/9`\n\nExample: `const t = new Temperature(0); t.fahrenheit` returns `32`\nExample: `t.fahrenheit = 212; t.celsius` returns `100`',
    starterCode:
      '/**\n * A temperature class that stores Celsius internally.\n *\n * Constructor takes celsius (number).\n * this.celsius - the stored temperature in Celsius\n * get fahrenheit() - returns the temperature in Fahrenheit\n * set fahrenheit(f) - sets this.celsius by converting f from Fahrenheit\n */\nclass Temperature {\n\n}\n',
    solution:
      'class Temperature {\n  constructor(celsius) {\n    this.celsius = celsius;\n  }\n\n  get fahrenheit() {\n    return this.celsius * 9 / 5 + 32;\n  }\n\n  set fahrenheit(f) {\n    this.celsius = (f - 32) * 5 / 9;\n  }\n}',
    testRunner: `(code) => {
  const Cls = new Function(code + '; return Temperature;')();
  const t1 = new Cls(0);
  const r1 = t1.fahrenheit;
  const r2 = t1.celsius;
  t1.fahrenheit = 212;
  const r3 = t1.celsius;
  const r4 = t1.fahrenheit;
  const t2 = new Cls(100);
  const r5 = t2.fahrenheit;
  t2.celsius = -40;
  const r6 = t2.fahrenheit;
  const t3 = new Cls(37);
  const r7 = Math.abs(t3.fahrenheit - 98.6) < 0.01;
  t3.fahrenheit = 32;
  const r8 = t3.celsius;
  const t4 = new Cls(20);
  const r9 = t4.fahrenheit;
  return [
    { pass: r1 === 32, description: '0°C → 32°F', got: String(r1) },
    { pass: r2 === 0, description: 'celsius property is 0', got: String(r2) },
    { pass: r3 === 100, description: 'Set 212°F → celsius is 100', got: String(r3) },
    { pass: r4 === 212, description: 'After setting, fahrenheit reads back 212', got: String(r4) },
    { pass: r5 === 212, description: '100°C → 212°F', got: String(r5) },
    { pass: r6 === -40, description: '-40°C → -40°F (same in both scales)', got: String(r6) },
    { pass: r7 === true, description: '37°C → 98.6°F (body temperature)', got: String(t3.fahrenheit) },
    { pass: r8 === 0, description: 'Set 32°F → celsius is 0', got: String(r8) },
    { pass: r9 === 68, description: '20°C → 68°F', got: String(r9) }
  ];
}`,
    hints: [
      'Store the value in `this.celsius`. The getter computes Fahrenheit using the formula `this.celsius * 9/5 + 32`. The setter converts the incoming Fahrenheit back to Celsius with `(f - 32) * 5/9`.',
      'Use `get fahrenheit() { return this.celsius * 9 / 5 + 32; }` and `set fahrenheit(f) { this.celsius = (f - 32) * 5 / 9; }`. The getter and setter share access to `this.celsius`.',
    ],
    resources: getterSetterRes,
  },

  // 2. Getter: Read-Only Property
  {
    id: 1260,
    title: 'Getter: Read-Only Property',
    type: 'js',
    tier: 3,
    category: ['js-fundamentals', 'classes'],
    tags: ['classes', 'getter', 'computed-property', 'math'],
    description:
      'Create a Circle class with read-only computed properties for area and circumference.',
    starterCode:
      '/**\n * @param {number} radius\n * Properties: this.radius\n * get area() - returns Math.PI * radius * radius\n * get circumference() - returns 2 * Math.PI * radius\n */\nclass Circle {\n\n}\n',
    solution:
      'class Circle {\n  constructor(radius) {\n    this.radius = radius;\n  }\n\n  get area() {\n    return Math.PI * this.radius * this.radius;\n  }\n\n  get circumference() {\n    return 2 * Math.PI * this.radius;\n  }\n}',
    testRunner: `(code) => {
  const Cls = new Function(code + '; return Circle;')();
  const c1 = new Cls(1);
  const r1 = Math.abs(c1.area - Math.PI) < 0.001;
  const r2 = Math.abs(c1.circumference - 2 * Math.PI) < 0.001;
  const c2 = new Cls(5);
  const r3 = Math.abs(c2.area - 78.5398) < 0.01;
  const r4 = Math.abs(c2.circumference - 31.4159) < 0.01;
  const c3 = new Cls(0);
  const r5 = c3.area;
  const r6 = c3.circumference;
  const c4 = new Cls(10);
  const r7 = Math.abs(c4.area - 314.159) < 0.01;
  c4.radius = 2;
  const r8 = Math.abs(c4.area - 12.566) < 0.01;
  const c5 = new Cls(0.5);
  const r9 = Math.abs(c5.area - 0.7854) < 0.01;
  return [
    { pass: r1, description: 'radius 1: area ≈ π', got: String(c1.area) },
    { pass: r2, description: 'radius 1: circumference ≈ 2π', got: String(c1.circumference) },
    { pass: r3, description: 'radius 5: area ≈ 78.54', got: String(c2.area) },
    { pass: r4, description: 'radius 5: circumference ≈ 31.42', got: String(c2.circumference) },
    { pass: r5 === 0, description: 'radius 0: area is 0', got: String(r5) },
    { pass: r6 === 0, description: 'radius 0: circumference is 0', got: String(r6) },
    { pass: r7, description: 'radius 10: area ≈ 314.16', got: String(c4.area) },
    { pass: r8, description: 'After changing radius to 2: area ≈ 12.57', got: String(c4.area) },
    { pass: r9, description: 'radius 0.5: area ≈ 0.79', got: String(c5.area) }
  ];
}`,
    hints: [
      'Define `get area()` and `get circumference()` as getters — they look like property access (`c.area`) but compute the value each time from `this.radius`.',
      'Use `get area() { return Math.PI * this.radius * this.radius; }` and `get circumference() { return 2 * Math.PI * this.radius; }`. Since they read `this.radius` live, they update automatically if radius changes.',
    ],
    resources: getterSetterRes,
  },

  // 3. Setter: Validation
  {
    id: 1261,
    title: 'Setter: Validation',
    type: 'js',
    tier: 3,
    category: ['js-fundamentals', 'classes'],
    tags: ['classes', 'setter', 'validation', 'encapsulation'],
    description:
      'Create a BankAccount class with a validated setter that prevents negative balances.',
    starterCode:
      '/**\n * @param {number} initial - Starting balance (must be >= 0, default 0 if negative)\n * Properties: this._balance (private-style)\n * get balance() - returns current balance\n * deposit(amount) - adds amount if positive\n * withdraw(amount) - subtracts amount if positive and sufficient funds\n */\nclass BankAccount {\n\n}\n',
    solution:
      'class BankAccount {\n  constructor(initial) {\n    this._balance = initial >= 0 ? initial : 0;\n  }\n\n  get balance() {\n    return this._balance;\n  }\n\n  deposit(amount) {\n    if (amount > 0) {\n      this._balance += amount;\n    }\n  }\n\n  withdraw(amount) {\n    if (amount > 0 && amount <= this._balance) {\n      this._balance -= amount;\n    }\n  }\n}',
    testRunner: `(code) => {
  const Cls = new Function(code + '; return BankAccount;')();
  const a1 = new Cls(100);
  const r1 = a1.balance;
  a1.deposit(50);
  const r2 = a1.balance;
  a1.withdraw(30);
  const r3 = a1.balance;
  a1.withdraw(200);
  const r4 = a1.balance;
  a1.deposit(-10);
  const r5 = a1.balance;
  a1.withdraw(-5);
  const r6 = a1.balance;
  const a2 = new Cls(-50);
  const r7 = a2.balance;
  const a3 = new Cls(0);
  a3.deposit(0);
  const r8 = a3.balance;
  a3.deposit(25);
  a3.withdraw(25);
  const r9 = a3.balance;
  return [
    { pass: r1 === 100, description: 'Initial balance: 100', got: String(r1) },
    { pass: r2 === 150, description: 'After deposit(50): 150', got: String(r2) },
    { pass: r3 === 120, description: 'After withdraw(30): 120', got: String(r3) },
    { pass: r4 === 120, description: 'Withdraw exceeding balance ignored: 120', got: String(r4) },
    { pass: r5 === 120, description: 'Negative deposit ignored: 120', got: String(r5) },
    { pass: r6 === 120, description: 'Negative withdraw ignored: 120', got: String(r6) },
    { pass: r7 === 0, description: 'Negative initial defaults to 0', got: String(r7) },
    { pass: r8 === 0, description: 'Zero deposit ignored: 0', got: String(r8) },
    { pass: r9 === 0, description: 'Deposit then withdraw exact amount: 0', got: String(r9) }
  ];
}`,
    hints: [
      'Store the balance in `this._balance` (the underscore signals it is private-style). The getter returns it, `deposit` adds if positive, `withdraw` subtracts only if amount is positive and does not exceed the balance.',
      'In the constructor, use a ternary to clamp: `this._balance = initial >= 0 ? initial : 0`. For `withdraw`, check `if (amount > 0 && amount <= this._balance)` before subtracting.',
    ],
    resources: getterSetterRes,
  },

  // 4. Static Methods
  {
    id: 1262,
    title: 'Static Methods',
    type: 'js',
    tier: 3,
    category: ['js-fundamentals', 'classes'],
    tags: ['classes', 'static', 'utility', 'namespace'],
    description:
      'Create a class with static utility methods that are called on the class itself, not on instances.',
    starterCode:
      '/**\n * A utility class with no constructor.\n * static clamp(n, min, max) - returns n clamped between min and max\n * static average(...nums) - returns the mean of all arguments\n */\nclass MathHelper {\n\n}\n',
    solution:
      'class MathHelper {\n  static clamp(n, min, max) {\n    if (n < min) return min;\n    if (n > max) return max;\n    return n;\n  }\n\n  static average(...nums) {\n    if (nums.length === 0) return 0;\n    return nums.reduce((sum, n) => sum + n, 0) / nums.length;\n  }\n}',
    testRunner: `(code) => {
  const Cls = new Function(code + '; return MathHelper;')();
  const r1 = Cls.clamp(5, 0, 10);
  const r2 = Cls.clamp(-5, 0, 10);
  const r3 = Cls.clamp(15, 0, 10);
  const r4 = Cls.clamp(0, 0, 10);
  const r5 = Cls.clamp(10, 0, 10);
  const r6 = Cls.average(1, 2, 3);
  const r7 = Cls.average(10);
  const r8 = Cls.average();
  const r9 = Cls.average(4, 6, 8, 2);
  return [
    { pass: r1 === 5, description: 'clamp(5, 0, 10) → 5 (in range)', got: String(r1) },
    { pass: r2 === 0, description: 'clamp(-5, 0, 10) → 0 (below min)', got: String(r2) },
    { pass: r3 === 10, description: 'clamp(15, 0, 10) → 10 (above max)', got: String(r3) },
    { pass: r4 === 0, description: 'clamp(0, 0, 10) → 0 (at min)', got: String(r4) },
    { pass: r5 === 10, description: 'clamp(10, 0, 10) → 10 (at max)', got: String(r5) },
    { pass: r6 === 2, description: 'average(1, 2, 3) → 2', got: String(r6) },
    { pass: r7 === 10, description: 'average(10) → 10', got: String(r7) },
    { pass: r8 === 0, description: 'average() → 0 (no arguments)', got: String(r8) },
    { pass: r9 === 5, description: 'average(4, 6, 8, 2) → 5', got: String(r9) }
  ];
}`,
    hints: [
      'Static methods are defined with the `static` keyword and called on the class itself: `MathHelper.clamp(...)`. They do not have access to `this` because they are not tied to an instance.',
      'Use `static clamp(n, min, max)` with simple conditionals. For `average`, use rest parameters and `.reduce()`: `static average(...nums) { return nums.reduce(...) / nums.length; }`. Handle the empty case.',
    ],
    resources: staticRes,
  },

  // 5. Constructor Validation
  {
    id: 1263,
    title: 'Constructor Validation',
    type: 'js',
    tier: 3,
    category: ['js-fundamentals', 'classes'],
    tags: ['classes', 'constructor', 'validation', 'error', 'getter'],
    description:
      'Create a class whose constructor validates inputs and throws errors for invalid values.',
    starterCode:
      '/**\n * @param {string} name - Must be a non-empty string (throw Error if not)\n * @param {number} age - Must be >= 0 (throw Error if negative)\n * Properties: this.name, this.age\n * greet() - returns "Hi, I\'m name"\n * get info() - returns "name (age)"\n */\nclass User {\n\n}\n',
    solution:
      'class User {\n  constructor(name, age) {\n    if (typeof name !== "string" || name.trim() === "") {\n      throw new Error("Name must be a non-empty string");\n    }\n    if (typeof age !== "number" || age < 0) {\n      throw new Error("Age must be a non-negative number");\n    }\n    this.name = name;\n    this.age = age;\n  }\n\n  greet() {\n    return "Hi, I\'m " + this.name;\n  }\n\n  get info() {\n    return this.name + " (" + this.age + ")";\n  }\n}',
    testRunner: `(code) => {
  const Cls = new Function(code + '; return User;')();
  const u1 = new Cls('Alice', 30);
  const r1 = u1.greet();
  const r2 = u1.info;
  const u2 = new Cls('Bob', 0);
  const r3 = u2.info;
  let r4 = false;
  try { new Cls('', 25); } catch(e) { r4 = e instanceof Error; }
  let r5 = false;
  try { new Cls('Eve', -1); } catch(e) { r5 = e instanceof Error; }
  let r6 = false;
  try { new Cls(123, 25); } catch(e) { r6 = e instanceof Error; }
  const u3 = new Cls('Charlie', 99);
  const r7 = u3.greet();
  const r8 = u3.info;
  let r9 = false;
  try { new Cls('  ', 20); } catch(e) { r9 = e instanceof Error; }
  return [
    { pass: r1 === "Hi, I'm Alice", description: 'greet(): "Hi, I\\'m Alice"', got: r1 },
    { pass: r2 === 'Alice (30)', description: 'info: "Alice (30)"', got: r2 },
    { pass: r3 === 'Bob (0)', description: 'Age 0 is valid: "Bob (0)"', got: r3 },
    { pass: r4 === true, description: 'Empty name throws Error', got: String(r4) },
    { pass: r5 === true, description: 'Negative age throws Error', got: String(r5) },
    { pass: r6 === true, description: 'Non-string name throws Error', got: String(r6) },
    { pass: r7 === "Hi, I'm Charlie", description: 'greet(): "Hi, I\\'m Charlie"', got: r7 },
    { pass: r8 === 'Charlie (99)', description: 'info: "Charlie (99)"', got: r8 },
    { pass: r9 === true, description: 'Whitespace-only name throws Error', got: String(r9) }
  ];
}`,
    hints: [
      'Use `throw new Error("message")` in the constructor to reject invalid inputs. Check `typeof name !== "string"` or `name.trim() === ""` for the name, and `age < 0` for the age.',
      'Validate before assigning: `if (typeof name !== "string" || name.trim() === "") throw new Error("...");`. Then set `this.name = name; this.age = age;`. Define `greet()` as a method and `info` as a getter.',
    ],
    resources: classRes,
  },

  // 6. Full Single Class
  {
    id: 1264,
    title: 'Full Single Class',
    type: 'js',
    tier: 3,
    category: ['js-fundamentals', 'classes'],
    tags: ['classes', 'getter', 'methods', 'state', 'combined'],
    description:
      'Build a complete Playlist class with methods, getters, and state management.',
    starterCode:
      '/**\n * @param {string} name - The playlist name\n * Properties: this.name, this._songs (array), this._currentIndex (starts at 0)\n * add(song) - appends a song string to the list\n * remove(song) - removes the first occurrence (adjusts index if needed)\n * next() - advances to the next song (wraps around), returns the new current song\n * get current() - returns the current song, or null if empty\n * get length() - returns the number of songs\n */\nclass Playlist {\n\n}\n',
    solution:
      'class Playlist {\n  constructor(name) {\n    this.name = name;\n    this._songs = [];\n    this._currentIndex = 0;\n  }\n\n  add(song) {\n    this._songs.push(song);\n  }\n\n  remove(song) {\n    const idx = this._songs.indexOf(song);\n    if (idx === -1) return;\n    this._songs.splice(idx, 1);\n    if (this._songs.length === 0) {\n      this._currentIndex = 0;\n    } else if (idx < this._currentIndex) {\n      this._currentIndex -= 1;\n    } else if (this._currentIndex >= this._songs.length) {\n      this._currentIndex = 0;\n    }\n  }\n\n  next() {\n    if (this._songs.length === 0) return null;\n    this._currentIndex = (this._currentIndex + 1) % this._songs.length;\n    return this._songs[this._currentIndex];\n  }\n\n  get current() {\n    if (this._songs.length === 0) return null;\n    return this._songs[this._currentIndex];\n  }\n\n  get length() {\n    return this._songs.length;\n  }\n}',
    testRunner: `(code) => {
  const Cls = new Function(code + '; return Playlist;')();
  const p = new Cls('My Mix');
  const r1 = p.current;
  const r2 = p.length;
  p.add('Song A');
  p.add('Song B');
  p.add('Song C');
  const r3 = p.current;
  const r4 = p.length;
  const r5 = p.next();
  const r6 = p.next();
  const r7 = p.next();
  p.remove('Song B');
  const r8 = p.length;
  const r9 = p.current;
  return [
    { pass: r1 === null, description: 'Empty playlist: current is null', got: String(r1) },
    { pass: r2 === 0, description: 'Empty playlist: length is 0', got: String(r2) },
    { pass: r3 === 'Song A', description: 'After adding 3: current is "Song A"', got: r3 },
    { pass: r4 === 3, description: 'Length is 3', got: String(r4) },
    { pass: r5 === 'Song B', description: 'next() → "Song B"', got: r5 },
    { pass: r6 === 'Song C', description: 'next() → "Song C"', got: r6 },
    { pass: r7 === 'Song A', description: 'next() wraps → "Song A"', got: r7 },
    { pass: r8 === 2, description: 'After remove: length is 2', got: String(r8) },
    { pass: r9 === 'Song A' || r9 === 'Song C', description: 'Current adjusts after removal', got: r9 }
  ];
}`,
    hints: [
      'Track songs in an array and the current position with an index. `next()` increments the index and wraps with modulo: `(this._currentIndex + 1) % this._songs.length`. Handle the empty case by returning `null`.',
      'For `remove`, find the index with `.indexOf()`, splice it out, then adjust `_currentIndex` if needed: decrement if the removed song was before the current, wrap to 0 if at the end.',
    ],
    resources: classRes,
  },

  // ══════════════════════════════════════════════════════════════════════════
  // SUB-SECTION 2: Inheritance Intro (5 exercises, IDs 1265-1269)
  // ══════════════════════════════════════════════════════════════════════════

  // 7. Inheritance: Extends (ENTRY POINT)
  {
    id: 1265,
    title: 'Inheritance: Extends',
    type: 'js',
    tier: 3,
    category: ['js-fundamentals', 'classes'],
    tags: ['classes', 'extends', 'super', 'inheritance', 'override'],
    description:
      'Create a parent and child class using extends and super to share and override behavior.',
    instructions:
      'Inheritance lets a child class share all properties and methods from a parent class. The child can also add new properties or override existing methods.\n\n`extends` creates the parent-child relationship. `super()` in the child constructor calls the parent constructor to set up inherited properties.\n\nSyntax:\n```\nclass Parent {\n  constructor(name) { this.name = name; }\n  greet() { return "Hello"; }\n}\nclass Child extends Parent {\n  constructor(name, extra) {\n    super(name);        // calls Parent constructor\n    this.extra = extra; // add child-only property\n  }\n  greet() { return "Hi"; } // override parent method\n}\n```\n\nCreate an `Animal` class with `name` and `speak()` returning `"..."`. Then create `Dog extends Animal` with a `breed` property and an overridden `speak()` returning `"name barks"` (see starter code).\n\nExample: `new Animal("Cat").speak()` returns `"..."`\nExample: `new Dog("Rex", "Lab").speak()` returns `"Rex barks"`\nExample: `new Dog("Rex", "Lab").name` returns `"Rex"` (inherited)',
    starterCode:
      '/**\n * Animal class:\n *   constructor(name) - sets this.name\n *   speak() - returns "..."\n *\n * Dog extends Animal:\n *   constructor(name, breed) - calls super(name), sets this.breed\n *   speak() - returns "name barks"\n */\nclass Animal {\n\n}\n\nclass Dog extends Animal {\n\n}\n',
    solution:
      'class Animal {\n  constructor(name) {\n    this.name = name;\n  }\n\n  speak() {\n    return "...";\n  }\n}\n\nclass Dog extends Animal {\n  constructor(name, breed) {\n    super(name);\n    this.breed = breed;\n  }\n\n  speak() {\n    return this.name + " barks";\n  }\n}',
    testRunner: `(code) => {
  const fns = new Function(code + '; return { Animal, Dog };')();
  const a1 = new fns.Animal('Cat');
  const r1 = a1.speak();
  const r2 = a1.name;
  const d1 = new fns.Dog('Rex', 'Labrador');
  const r3 = d1.speak();
  const r4 = d1.name;
  const r5 = d1.breed;
  const r6 = d1 instanceof fns.Dog;
  const r7 = d1 instanceof fns.Animal;
  const d2 = new fns.Dog('Buddy', 'Poodle');
  const r8 = d2.speak();
  const a2 = new fns.Animal('Fish');
  const r9 = a2.speak();
  return [
    { pass: r1 === '...', description: 'Animal.speak() returns "..."', got: r1 },
    { pass: r2 === 'Cat', description: 'Animal.name is "Cat"', got: r2 },
    { pass: r3 === 'Rex barks', description: 'Dog.speak() returns "Rex barks"', got: r3 },
    { pass: r4 === 'Rex', description: 'Dog inherits name: "Rex"', got: r4 },
    { pass: r5 === 'Labrador', description: 'Dog.breed is "Labrador"', got: r5 },
    { pass: r6 === true, description: 'Dog instance is instanceof Dog', got: String(r6) },
    { pass: r7 === true, description: 'Dog instance is instanceof Animal', got: String(r7) },
    { pass: r8 === 'Buddy barks', description: 'Second dog: "Buddy barks"', got: r8 },
    { pass: r9 === '...', description: 'Animal still returns "..."', got: r9 }
  ];
}`,
    hints: [
      'In the `Dog` constructor, call `super(name)` first — this runs the `Animal` constructor to set `this.name`. Then set `this.breed`. Override `speak()` by defining it in the `Dog` class.',
      'Define `speak()` in both classes. `Animal` returns `"..."`. `Dog` returns `this.name + " barks"`. The child version overrides the parent. Call `super(name)` before using `this` in the child constructor.',
    ],
    resources: inheritRes,
  },

  // 8. Inheritance: Super with Properties
  {
    id: 1266,
    title: 'Inheritance: Super with Properties',
    type: 'js',
    tier: 3,
    category: ['js-fundamentals', 'classes'],
    tags: ['classes', 'extends', 'super', 'getter', 'inheritance'],
    description:
      'Create a Shape parent and Circle child class, using super to pass the color property and adding computed getters.',
    starterCode:
      '/**\n * Shape: constructor(color), this.color\n * Circle extends Shape:\n *   constructor(color, radius) - calls super(color), sets this.radius\n *   get area() - returns Math.PI * radius * radius\n *   describe() - returns "A color circle with radius R"\n */\nclass Shape {\n\n}\n\nclass Circle extends Shape {\n\n}\n',
    solution:
      'class Shape {\n  constructor(color) {\n    this.color = color;\n  }\n}\n\nclass Circle extends Shape {\n  constructor(color, radius) {\n    super(color);\n    this.radius = radius;\n  }\n\n  get area() {\n    return Math.PI * this.radius * this.radius;\n  }\n\n  describe() {\n    return "A " + this.color + " circle with radius " + this.radius;\n  }\n}',
    testRunner: `(code) => {
  const fns = new Function(code + '; return { Shape, Circle };')();
  const c1 = new fns.Circle('red', 5);
  const r1 = c1.color;
  const r2 = c1.radius;
  const r3 = Math.abs(c1.area - 78.5398) < 0.01;
  const r4 = c1.describe();
  const c2 = new fns.Circle('blue', 1);
  const r5 = Math.abs(c2.area - Math.PI) < 0.001;
  const r6 = c2.describe();
  const s1 = new fns.Shape('green');
  const r7 = s1.color;
  const c3 = new fns.Circle('white', 0);
  const r8 = c3.area;
  const r9 = c1 instanceof fns.Shape;
  return [
    { pass: r1 === 'red', description: 'Circle inherits color: "red"', got: r1 },
    { pass: r2 === 5, description: 'Circle.radius is 5', got: String(r2) },
    { pass: r3, description: 'radius 5: area ≈ 78.54', got: String(c1.area) },
    { pass: r4 === 'A red circle with radius 5', description: 'describe(): "A red circle with radius 5"', got: r4 },
    { pass: r5, description: 'radius 1: area ≈ π', got: String(c2.area) },
    { pass: r6 === 'A blue circle with radius 1', description: 'describe(): "A blue circle with radius 1"', got: r6 },
    { pass: r7 === 'green', description: 'Shape.color is "green"', got: r7 },
    { pass: r8 === 0, description: 'radius 0: area is 0', got: String(r8) },
    { pass: r9 === true, description: 'Circle instanceof Shape', got: String(r9) }
  ];
}`,
    hints: [
      'In `Circle`, call `super(color)` to pass `color` up to the `Shape` constructor. Then set `this.radius`. Use `this.color` in `describe()` — it was set by the parent constructor.',
      '`super(color)` runs `Shape`\'s constructor which sets `this.color`. Then `this.radius = radius` adds the child-only property. The `describe()` method can access both `this.color` (inherited) and `this.radius` (own).',
    ],
    resources: inheritRes,
  },

  // 9. Inheritance: Method Override
  {
    id: 1267,
    title: 'Inheritance: Method Override',
    type: 'js',
    tier: 3,
    category: ['js-fundamentals', 'classes'],
    tags: ['classes', 'extends', 'override', 'inheritance'],
    description:
      'Create Vehicle and ElectricCar classes where the child overrides a parent method.',
    starterCode:
      '/**\n * Vehicle: constructor(make, model), this.make, this.model\n *   fuel() - returns "gasoline"\n *   describe() - returns "make model"\n *\n * ElectricCar extends Vehicle:\n *   constructor(make, model, range) - calls super, sets this.range\n *   fuel() - returns "electric" (overrides parent)\n *   describe() - returns "make model (electric, range mi)"\n */\nclass Vehicle {\n\n}\n\nclass ElectricCar extends Vehicle {\n\n}\n',
    solution:
      'class Vehicle {\n  constructor(make, model) {\n    this.make = make;\n    this.model = model;\n  }\n\n  fuel() {\n    return "gasoline";\n  }\n\n  describe() {\n    return this.make + " " + this.model;\n  }\n}\n\nclass ElectricCar extends Vehicle {\n  constructor(make, model, range) {\n    super(make, model);\n    this.range = range;\n  }\n\n  fuel() {\n    return "electric";\n  }\n\n  describe() {\n    return this.make + " " + this.model + " (electric, " + this.range + " mi)";\n  }\n}',
    testRunner: `(code) => {
  const fns = new Function(code + '; return { Vehicle, ElectricCar };')();
  const v1 = new fns.Vehicle('Toyota', 'Camry');
  const r1 = v1.fuel();
  const r2 = v1.describe();
  const e1 = new fns.ElectricCar('Tesla', 'Model 3', 350);
  const r3 = e1.fuel();
  const r4 = e1.describe();
  const r5 = e1.make;
  const r6 = e1.range;
  const v2 = new fns.Vehicle('Honda', 'Civic');
  const r7 = v2.fuel();
  const e2 = new fns.ElectricCar('Rivian', 'R1T', 314);
  const r8 = e2.describe();
  const r9 = e1 instanceof fns.Vehicle;
  return [
    { pass: r1 === 'gasoline', description: 'Vehicle.fuel() → "gasoline"', got: r1 },
    { pass: r2 === 'Toyota Camry', description: 'Vehicle.describe() → "Toyota Camry"', got: r2 },
    { pass: r3 === 'electric', description: 'ElectricCar.fuel() → "electric" (overridden)', got: r3 },
    { pass: r4 === 'Tesla Model 3 (electric, 350 mi)', description: 'ElectricCar.describe()', got: r4 },
    { pass: r5 === 'Tesla', description: 'Inherits make: "Tesla"', got: r5 },
    { pass: r6 === 350, description: 'ElectricCar.range is 350', got: String(r6) },
    { pass: r7 === 'gasoline', description: 'Vehicle still returns "gasoline"', got: r7 },
    { pass: r8 === 'Rivian R1T (electric, 314 mi)', description: 'Second EV: "Rivian R1T (electric, 314 mi)"', got: r8 },
    { pass: r9 === true, description: 'ElectricCar instanceof Vehicle', got: String(r9) }
  ];
}`,
    hints: [
      'Define `fuel()` and `describe()` in both classes. The child versions override the parent versions. `ElectricCar` calls `super(make, model)` to pass both properties to `Vehicle`.',
      'In `ElectricCar.describe()`, use `this.make`, `this.model` (inherited), and `this.range` (own) to build the string. The overridden `fuel()` simply returns `"electric"` instead of `"gasoline"`.',
    ],
    resources: inheritRes,
  },

  // 10. Inheritance: Shared Interface
  {
    id: 1268,
    title: 'Inheritance: Shared Interface',
    type: 'js',
    tier: 3,
    category: ['js-fundamentals', 'classes'],
    tags: ['classes', 'extends', 'override', 'interface', 'inheritance'],
    description:
      'Create a Notification parent class with Email and SMS children that each override the send method.',
    starterCode:
      '/**\n * Notification: constructor(recipient)\n *   send() - returns "Sending to recipient"\n *\n * Email extends Notification:\n *   constructor(recipient, subject) - calls super, sets this.subject\n *   send() - returns "Emailing recipient: subject"\n *\n * SMS extends Notification:\n *   constructor(recipient, phone) - calls super, sets this.phone\n *   send() - returns "Texting phone for recipient"\n */\nclass Notification {\n\n}\n\nclass Email extends Notification {\n\n}\n\nclass SMS extends Notification {\n\n}\n',
    solution:
      'class Notification {\n  constructor(recipient) {\n    this.recipient = recipient;\n  }\n\n  send() {\n    return "Sending to " + this.recipient;\n  }\n}\n\nclass Email extends Notification {\n  constructor(recipient, subject) {\n    super(recipient);\n    this.subject = subject;\n  }\n\n  send() {\n    return "Emailing " + this.recipient + ": " + this.subject;\n  }\n}\n\nclass SMS extends Notification {\n  constructor(recipient, phone) {\n    super(recipient);\n    this.phone = phone;\n  }\n\n  send() {\n    return "Texting " + this.phone + " for " + this.recipient;\n  }\n}',
    testRunner: `(code) => {
  const fns = new Function(code + '; return { Notification, Email, SMS };')();
  const n1 = new fns.Notification('Alice');
  const r1 = n1.send();
  const e1 = new fns.Email('Bob', 'Hello');
  const r2 = e1.send();
  const r3 = e1.recipient;
  const r4 = e1.subject;
  const s1 = new fns.SMS('Charlie', '555-1234');
  const r5 = s1.send();
  const r6 = s1.recipient;
  const r7 = s1.phone;
  const r8 = e1 instanceof fns.Notification;
  const r9 = s1 instanceof fns.Notification;
  return [
    { pass: r1 === 'Sending to Alice', description: 'Notification.send(): "Sending to Alice"', got: r1 },
    { pass: r2 === 'Emailing Bob: Hello', description: 'Email.send(): "Emailing Bob: Hello"', got: r2 },
    { pass: r3 === 'Bob', description: 'Email inherits recipient: "Bob"', got: r3 },
    { pass: r4 === 'Hello', description: 'Email.subject: "Hello"', got: r4 },
    { pass: r5 === 'Texting 555-1234 for Charlie', description: 'SMS.send(): "Texting 555-1234 for Charlie"', got: r5 },
    { pass: r6 === 'Charlie', description: 'SMS inherits recipient: "Charlie"', got: r6 },
    { pass: r7 === '555-1234', description: 'SMS.phone: "555-1234"', got: r7 },
    { pass: r8 === true, description: 'Email instanceof Notification', got: String(r8) },
    { pass: r9 === true, description: 'SMS instanceof Notification', got: String(r9) }
  ];
}`,
    hints: [
      'All three classes share the `recipient` property through the parent. Each child calls `super(recipient)` and adds its own property. Each child overrides `send()` with its own format.',
      'The pattern is the same for both children: call `super(recipient)`, set the extra property, override `send()`. Email uses `this.recipient` and `this.subject`. SMS uses `this.phone` and `this.recipient`.',
    ],
    resources: inheritRes,
  },

  // 11. Inheritance: Combined
  {
    id: 1269,
    title: 'Inheritance: Combined',
    type: 'js',
    tier: 3,
    category: ['js-fundamentals', 'classes'],
    tags: ['classes', 'extends', 'super', 'getter', 'combined'],
    description:
      'Create an Account parent and SavingsAccount child that extends with interest functionality.',
    starterCode:
      '/**\n * Account: constructor(owner, initialBalance)\n *   this.owner, this._balance (0 if initial is negative)\n *   deposit(amount) - adds if positive\n *   withdraw(amount) - subtracts if positive and sufficient funds\n *   get balance() - returns _balance\n *\n * SavingsAccount extends Account:\n *   constructor(owner, initialBalance, interestRate)\n *   this.interestRate (e.g. 0.05 for 5%)\n *   applyInterest() - adds balance * interestRate to balance\n *   get projectedBalance() - returns balance * (1 + interestRate) without modifying\n */\nclass Account {\n\n}\n\nclass SavingsAccount extends Account {\n\n}\n',
    solution:
      'class Account {\n  constructor(owner, initialBalance) {\n    this.owner = owner;\n    this._balance = initialBalance >= 0 ? initialBalance : 0;\n  }\n\n  deposit(amount) {\n    if (amount > 0) this._balance += amount;\n  }\n\n  withdraw(amount) {\n    if (amount > 0 && amount <= this._balance) this._balance -= amount;\n  }\n\n  get balance() {\n    return this._balance;\n  }\n}\n\nclass SavingsAccount extends Account {\n  constructor(owner, initialBalance, interestRate) {\n    super(owner, initialBalance);\n    this.interestRate = interestRate;\n  }\n\n  applyInterest() {\n    this._balance += this._balance * this.interestRate;\n  }\n\n  get projectedBalance() {\n    return this._balance * (1 + this.interestRate);\n  }\n}',
    testRunner: `(code) => {
  const fns = new Function(code + '; return { Account, SavingsAccount };')();
  const a1 = new fns.Account('Alice', 100);
  const r1 = a1.balance;
  a1.deposit(50);
  const r2 = a1.balance;
  const s1 = new fns.SavingsAccount('Bob', 1000, 0.05);
  const r3 = s1.balance;
  const r4 = s1.projectedBalance;
  s1.applyInterest();
  const r5 = s1.balance;
  s1.deposit(500);
  const r6 = s1.balance;
  s1.withdraw(200);
  const r7 = s1.balance;
  const s2 = new fns.SavingsAccount('Eve', 0, 0.1);
  s2.deposit(100);
  s2.applyInterest();
  const r8 = s2.balance;
  const r9 = s1 instanceof fns.Account;
  return [
    { pass: r1 === 100, description: 'Account starts at 100', got: String(r1) },
    { pass: r2 === 150, description: 'After deposit(50): 150', got: String(r2) },
    { pass: r3 === 1000, description: 'SavingsAccount starts at 1000', got: String(r3) },
    { pass: r4 === 1050, description: 'projectedBalance: 1000 * 1.05 = 1050', got: String(r4) },
    { pass: r5 === 1050, description: 'After applyInterest: 1050', got: String(r5) },
    { pass: r6 === 1550, description: 'After deposit(500): 1550', got: String(r6) },
    { pass: r7 === 1350, description: 'After withdraw(200): 1350', got: String(r7) },
    { pass: r8 === 110, description: 'Deposit 100 + 10% interest: 110', got: String(r8) },
    { pass: r9 === true, description: 'SavingsAccount instanceof Account', got: String(r9) }
  ];
}`,
    hints: [
      '`SavingsAccount` inherits `deposit`, `withdraw`, and the `balance` getter from `Account`. It only needs to add `interestRate`, `applyInterest()`, and `projectedBalance`. Call `super(owner, initialBalance)` in the constructor.',
      '`applyInterest()` modifies the balance: `this._balance += this._balance * this.interestRate`. The getter `projectedBalance` computes without modifying: `this._balance * (1 + this.interestRate)`.',
    ],
    resources: inheritRes,
  },

  // ══════════════════════════════════════════════════════════════════════════
  // SUB-SECTION 3: Two-Class Interaction (5 exercises, IDs 1270-1274)
  // ══════════════════════════════════════════════════════════════════════════

  // 12. Class Interaction: Has-A (ENTRY POINT)
  {
    id: 1270,
    title: 'Class Interaction: Has-A',
    type: 'js',
    tier: 3,
    category: ['js-fundamentals', 'classes'],
    tags: ['classes', 'composition', 'has-a', 'delegation'],
    description:
      'Create an Engine and Car class where Car contains an Engine and delegates to it.',
    instructions:
      'Classes often work together through composition — one class contains an instance of another. This "has-a" relationship is different from inheritance ("is-a").\n\nA `Car` is not an `Engine`, but a `Car` has an `Engine`. The `Car` delegates engine-related behavior to its `Engine` instance.\n\nCreate an `Engine` class with `horsepower` and a `start()` method. Then create a `Car` class that takes an `Engine` in its constructor and delegates `start()` to it (see starter code).\n\nExample: `const e = new Engine(200); const c = new Car("Toyota", e); c.start()` returns `"Toyota started with 200hp engine"`',
    starterCode:
      '/**\n * Engine: constructor(horsepower)\n *   start() - returns "Engine started (Nhp)"\n *\n * Car: constructor(make, engine)\n *   this.make, this.engine\n *   start() - returns "make started with Nhp engine"\n *   get hp() - returns the engine\'s horsepower\n */\nclass Engine {\n\n}\n\nclass Car {\n\n}\n',
    solution:
      'class Engine {\n  constructor(horsepower) {\n    this.horsepower = horsepower;\n  }\n\n  start() {\n    return "Engine started (" + this.horsepower + "hp)";\n  }\n}\n\nclass Car {\n  constructor(make, engine) {\n    this.make = make;\n    this.engine = engine;\n  }\n\n  start() {\n    return this.make + " started with " + this.engine.horsepower + "hp engine";\n  }\n\n  get hp() {\n    return this.engine.horsepower;\n  }\n}',
    testRunner: `(code) => {
  const fns = new Function(code + '; return { Engine, Car };')();
  const e1 = new fns.Engine(200);
  const r1 = e1.start();
  const r2 = e1.horsepower;
  const c1 = new fns.Car('Toyota', e1);
  const r3 = c1.start();
  const r4 = c1.hp;
  const r5 = c1.make;
  const e2 = new fns.Engine(400);
  const c2 = new fns.Car('Ford', e2);
  const r6 = c2.start();
  const r7 = c2.hp;
  const c3 = new fns.Car('Honda', new fns.Engine(150));
  const r8 = c3.start();
  const r9 = c3.engine instanceof fns.Engine;
  return [
    { pass: r1 === 'Engine started (200hp)', description: 'Engine.start(): "Engine started (200hp)"', got: r1 },
    { pass: r2 === 200, description: 'Engine.horsepower: 200', got: String(r2) },
    { pass: r3 === 'Toyota started with 200hp engine', description: 'Car.start() delegates to engine', got: r3 },
    { pass: r4 === 200, description: 'Car.hp getter returns engine hp', got: String(r4) },
    { pass: r5 === 'Toyota', description: 'Car.make: "Toyota"', got: r5 },
    { pass: r6 === 'Ford started with 400hp engine', description: 'Second car: "Ford started with 400hp engine"', got: r6 },
    { pass: r7 === 400, description: 'Second car hp: 400', got: String(r7) },
    { pass: r8 === 'Honda started with 150hp engine', description: 'Inline engine: "Honda started with 150hp engine"', got: r8 },
    { pass: r9 === true, description: 'Car.engine is an Engine instance', got: String(r9) }
  ];
}`,
    hints: [
      'The `Car` constructor stores the `Engine` instance: `this.engine = engine`. To access the engine\'s power, use `this.engine.horsepower`. This is delegation — the `Car` uses the `Engine` without inheriting from it.',
      'In `Car.start()`, build the string using `this.make` and `this.engine.horsepower`. The `hp` getter simply returns `this.engine.horsepower`. The car does not copy the value — it reads it from the engine.',
    ],
    resources: classRes,
  },

  // 13. Class Interaction: Collection
  {
    id: 1271,
    title: 'Class Interaction: Collection',
    type: 'js',
    tier: 3,
    category: ['js-fundamentals', 'classes'],
    tags: ['classes', 'composition', 'collection', 'state'],
    description:
      'Create Book and Library classes where Library manages a collection of Book instances.',
    starterCode:
      '/**\n * Book: constructor(title, author)\n *   this.title, this.author, this.isAvailable (starts true)\n *\n * Library: constructor(name)\n *   this.name, this._books (empty array)\n *   add(book) - adds a Book to the collection\n *   checkout(title) - sets the first matching available book to unavailable, returns true/false\n *   returnBook(title) - sets the first matching unavailable book to available, returns true/false\n *   get available() - returns array of titles of available books\n */\nclass Book {\n\n}\n\nclass Library {\n\n}\n',
    solution:
      'class Book {\n  constructor(title, author) {\n    this.title = title;\n    this.author = author;\n    this.isAvailable = true;\n  }\n}\n\nclass Library {\n  constructor(name) {\n    this.name = name;\n    this._books = [];\n  }\n\n  add(book) {\n    this._books.push(book);\n  }\n\n  checkout(title) {\n    const book = this._books.find(b => b.title === title && b.isAvailable);\n    if (book) {\n      book.isAvailable = false;\n      return true;\n    }\n    return false;\n  }\n\n  returnBook(title) {\n    const book = this._books.find(b => b.title === title && !b.isAvailable);\n    if (book) {\n      book.isAvailable = true;\n      return true;\n    }\n    return false;\n  }\n\n  get available() {\n    return this._books.filter(b => b.isAvailable).map(b => b.title);\n  }\n}',
    testRunner: `(code) => {
  const fns = new Function(code + '; return { Book, Library };')();
  const lib = new fns.Library('City Library');
  const b1 = new fns.Book('1984', 'Orwell');
  const b2 = new fns.Book('Dune', 'Herbert');
  const b3 = new fns.Book('Hobbit', 'Tolkien');
  lib.add(b1);
  lib.add(b2);
  lib.add(b3);
  const r1 = lib.available;
  const r2 = lib.checkout('Dune');
  const r3 = lib.available;
  const r4 = lib.checkout('Dune');
  const r5 = lib.returnBook('Dune');
  const r6 = lib.available;
  const r7 = lib.checkout('Unknown');
  const r8 = lib.returnBook('1984');
  const r9 = lib.name;
  return [
    { pass: JSON.stringify(r1) === JSON.stringify(['1984', 'Dune', 'Hobbit']), description: 'All 3 available initially', got: JSON.stringify(r1) },
    { pass: r2 === true, description: 'checkout("Dune") → true', got: String(r2) },
    { pass: JSON.stringify(r3) === JSON.stringify(['1984', 'Hobbit']), description: 'After checkout: 2 available', got: JSON.stringify(r3) },
    { pass: r4 === false, description: 'checkout("Dune") again → false (already out)', got: String(r4) },
    { pass: r5 === true, description: 'returnBook("Dune") → true', got: String(r5) },
    { pass: JSON.stringify(r6) === JSON.stringify(['1984', 'Dune', 'Hobbit']), description: 'After return: all 3 available', got: JSON.stringify(r6) },
    { pass: r7 === false, description: 'checkout("Unknown") → false', got: String(r7) },
    { pass: r8 === false, description: 'returnBook("1984") → false (already available)', got: String(r8) },
    { pass: r9 === 'City Library', description: 'Library name: "City Library"', got: r9 }
  ];
}`,
    hints: [
      'The `Library` stores `Book` instances in an array. Use `.find()` to locate a book by title and availability status. Modify the book\'s `isAvailable` property directly — the library holds a reference to the same object.',
      'For `checkout`, use `this._books.find(b => b.title === title && b.isAvailable)`. If found, set `book.isAvailable = false` and return `true`. For the `available` getter, chain `.filter()` and `.map()`.',
    ],
    resources: classRes,
  },

  // 14. Class Interaction: Delegation
  {
    id: 1272,
    title: 'Class Interaction: Delegation',
    type: 'js',
    tier: 3,
    category: ['js-fundamentals', 'classes'],
    tags: ['classes', 'composition', 'delegation', 'logging'],
    description:
      'Create Logger and App classes where App uses a Logger for all its message recording.',
    starterCode:
      '/**\n * Logger: constructor()\n *   this._messages (empty array)\n *   log(msg) - pushes msg to _messages\n *   get messages() - returns a copy of _messages\n *\n * App: constructor(name, logger)\n *   this.name, this.logger, this.isRunning (starts false)\n *   start() - sets isRunning to true, logs "name started"\n *   stop() - sets isRunning to false, logs "name stopped"\n */\nclass Logger {\n\n}\n\nclass App {\n\n}\n',
    solution:
      'class Logger {\n  constructor() {\n    this._messages = [];\n  }\n\n  log(msg) {\n    this._messages.push(msg);\n  }\n\n  get messages() {\n    return this._messages.slice();\n  }\n}\n\nclass App {\n  constructor(name, logger) {\n    this.name = name;\n    this.logger = logger;\n    this.isRunning = false;\n  }\n\n  start() {\n    this.isRunning = true;\n    this.logger.log(this.name + " started");\n  }\n\n  stop() {\n    this.isRunning = false;\n    this.logger.log(this.name + " stopped");\n  }\n}',
    testRunner: `(code) => {
  const fns = new Function(code + '; return { Logger, App };')();
  const log = new fns.Logger();
  const app = new fns.App('MyApp', log);
  const r1 = app.isRunning;
  app.start();
  const r2 = app.isRunning;
  const r3 = log.messages;
  app.stop();
  const r4 = app.isRunning;
  const r5 = log.messages;
  const app2 = new fns.App('Other', log);
  app2.start();
  const r6 = log.messages;
  const m = log.messages;
  m.push('tamper');
  const r7 = log.messages.length;
  app.start();
  const r8 = log.messages;
  const r9 = app.name;
  return [
    { pass: r1 === false, description: 'App starts not running', got: String(r1) },
    { pass: r2 === true, description: 'After start: isRunning true', got: String(r2) },
    { pass: JSON.stringify(r3) === JSON.stringify(['MyApp started']), description: 'Logger has: ["MyApp started"]', got: JSON.stringify(r3) },
    { pass: r4 === false, description: 'After stop: isRunning false', got: String(r4) },
    { pass: JSON.stringify(r5) === JSON.stringify(['MyApp started', 'MyApp stopped']), description: 'Logger has both messages', got: JSON.stringify(r5) },
    { pass: r6.length === 3 && r6[2] === 'Other started', description: 'Shared logger: 3rd message is "Other started"', got: JSON.stringify(r6) },
    { pass: r7 === 3, description: 'messages getter returns a copy (tamper-proof)', got: String(r7) },
    { pass: r8.length === 4 && r8[3] === 'MyApp started', description: 'App can start again, logger records it', got: JSON.stringify(r8) },
    { pass: r9 === 'MyApp', description: 'App.name: "MyApp"', got: r9 }
  ];
}`,
    hints: [
      'The `App` does not log on its own — it calls `this.logger.log(...)`. Multiple apps can share the same `Logger` instance. The `messages` getter should return a copy with `.slice()` to prevent tampering.',
      'In `start()`: `this.isRunning = true; this.logger.log(this.name + " started");`. In `stop()`: `this.isRunning = false; this.logger.log(this.name + " stopped");`. The logger accumulates messages from all apps.',
    ],
    resources: classRes,
  },

  // 15. Class Interaction: Builder
  {
    id: 1273,
    title: 'Class Interaction: Builder',
    type: 'js',
    tier: 3,
    category: ['js-fundamentals', 'classes'],
    tags: ['classes', 'composition', 'collection', 'practical'],
    description:
      'Create MenuItem and Order classes where Order manages a collection of menu items with quantities.',
    starterCode:
      '/**\n * MenuItem: constructor(name, price)\n *   this.name, this.price\n *\n * Order: constructor()\n *   this._items (empty array of {item: MenuItem, qty: number})\n *   add(item, qty) - adds or increments qty if item already exists (match by name)\n *   remove(name) - removes the entry with that name\n *   get total() - returns sum of (price * qty) for all items\n *   get itemCount() - returns sum of all quantities\n */\nclass MenuItem {\n\n}\n\nclass Order {\n\n}\n',
    solution:
      'class MenuItem {\n  constructor(name, price) {\n    this.name = name;\n    this.price = price;\n  }\n}\n\nclass Order {\n  constructor() {\n    this._items = [];\n  }\n\n  add(item, qty) {\n    const existing = this._items.find(e => e.item.name === item.name);\n    if (existing) {\n      existing.qty += qty;\n    } else {\n      this._items.push({ item, qty });\n    }\n  }\n\n  remove(name) {\n    const idx = this._items.findIndex(e => e.item.name === name);\n    if (idx !== -1) this._items.splice(idx, 1);\n  }\n\n  get total() {\n    return this._items.reduce((sum, e) => sum + e.item.price * e.qty, 0);\n  }\n\n  get itemCount() {\n    return this._items.reduce((sum, e) => sum + e.qty, 0);\n  }\n}',
    testRunner: `(code) => {
  const fns = new Function(code + '; return { MenuItem, Order };')();
  const burger = new fns.MenuItem('Burger', 10);
  const fries = new fns.MenuItem('Fries', 5);
  const drink = new fns.MenuItem('Drink', 3);
  const order = new fns.Order();
  const r1 = order.total;
  const r2 = order.itemCount;
  order.add(burger, 2);
  const r3 = order.total;
  const r4 = order.itemCount;
  order.add(fries, 1);
  const r5 = order.total;
  order.add(burger, 1);
  const r6 = order.total;
  const r7 = order.itemCount;
  order.remove('Fries');
  const r8 = order.total;
  order.add(drink, 3);
  const r9 = order.itemCount;
  return [
    { pass: r1 === 0, description: 'Empty order: total is 0', got: String(r1) },
    { pass: r2 === 0, description: 'Empty order: itemCount is 0', got: String(r2) },
    { pass: r3 === 20, description: '2 burgers: 2 * 10 = 20', got: String(r3) },
    { pass: r4 === 2, description: 'itemCount: 2', got: String(r4) },
    { pass: r5 === 25, description: '+ 1 fries: 20 + 5 = 25', got: String(r5) },
    { pass: r6 === 35, description: '+ 1 more burger (3 total): 30 + 5 = 35', got: String(r6) },
    { pass: r7 === 4, description: 'itemCount: 3 burgers + 1 fries = 4', got: String(r7) },
    { pass: r8 === 30, description: 'Remove fries: 3 * 10 = 30', got: String(r8) },
    { pass: r9 === 6, description: '+ 3 drinks: 3 burgers + 3 drinks = 6', got: String(r9) }
  ];
}`,
    hints: [
      'The `add` method should check if an item with the same name already exists. If so, increment its quantity. If not, push a new entry. Use `.find()` to search by `item.name`.',
      'For `total`, use `.reduce()` to sum `e.item.price * e.qty` across all entries. For `itemCount`, sum all `e.qty` values. For `add`, check `this._items.find(e => e.item.name === item.name)` first.',
    ],
    resources: classRes,
  },

  // 16. Class Interaction: Combined
  {
    id: 1274,
    title: 'Class Interaction: Combined',
    type: 'js',
    tier: 3,
    category: ['js-fundamentals', 'classes'],
    tags: ['classes', 'composition', 'combined', 'encapsulation'],
    description:
      'Create Player and Inventory classes where Player has an Inventory with a weight limit.',
    starterCode:
      '/**\n * Inventory: constructor()\n *   this._items (empty array of {name, weight})\n *   add(item) - pushes {name, weight} item\n *   remove(name) - removes first item with that name\n *   has(name) - returns true if item with name exists\n *   get items() - returns copy of items array\n *   get totalWeight() - returns sum of all weights\n *\n * Player: constructor(name, maxWeight)\n *   this.name, this.maxWeight, this.inventory (new Inventory)\n *   pickup(item) - adds to inventory if totalWeight + item.weight <= maxWeight, returns true/false\n *   drop(name) - removes from inventory, returns true/false\n */\nclass Inventory {\n\n}\n\nclass Player {\n\n}\n',
    solution:
      'class Inventory {\n  constructor() {\n    this._items = [];\n  }\n\n  add(item) {\n    this._items.push(item);\n  }\n\n  remove(name) {\n    const idx = this._items.findIndex(i => i.name === name);\n    if (idx !== -1) this._items.splice(idx, 1);\n  }\n\n  has(name) {\n    return this._items.some(i => i.name === name);\n  }\n\n  get items() {\n    return this._items.map(i => ({ name: i.name, weight: i.weight }));\n  }\n\n  get totalWeight() {\n    return this._items.reduce((sum, i) => sum + i.weight, 0);\n  }\n}\n\nclass Player {\n  constructor(name, maxWeight) {\n    this.name = name;\n    this.maxWeight = maxWeight;\n    this.inventory = new Inventory();\n  }\n\n  pickup(item) {\n    if (this.inventory.totalWeight + item.weight <= this.maxWeight) {\n      this.inventory.add(item);\n      return true;\n    }\n    return false;\n  }\n\n  drop(name) {\n    if (this.inventory.has(name)) {\n      this.inventory.remove(name);\n      return true;\n    }\n    return false;\n  }\n}',
    testRunner: `(code) => {
  const fns = new Function(code + '; return { Inventory, Player };')();
  const p = new fns.Player('Hero', 10);
  const r1 = p.inventory.totalWeight;
  const r2 = p.pickup({ name: 'Sword', weight: 5 });
  const r3 = p.inventory.totalWeight;
  const r4 = p.pickup({ name: 'Shield', weight: 4 });
  const r5 = p.pickup({ name: 'Armor', weight: 3 });
  const r6 = p.inventory.has('Sword');
  const r7 = p.drop('Shield');
  const r8 = p.inventory.totalWeight;
  const r9 = p.drop('Unknown');
  return [
    { pass: r1 === 0, description: 'Empty inventory: weight 0', got: String(r1) },
    { pass: r2 === true, description: 'Pickup Sword (5): true', got: String(r2) },
    { pass: r3 === 5, description: 'Weight after Sword: 5', got: String(r3) },
    { pass: r4 === true, description: 'Pickup Shield (4): true (5+4=9 <= 10)', got: String(r4) },
    { pass: r5 === false, description: 'Pickup Armor (3): false (9+3=12 > 10)', got: String(r5) },
    { pass: r6 === true, description: 'has("Sword") → true', got: String(r6) },
    { pass: r7 === true, description: 'drop("Shield") → true', got: String(r7) },
    { pass: r8 === 5, description: 'After dropping Shield: weight 5', got: String(r8) },
    { pass: r9 === false, description: 'drop("Unknown") → false', got: String(r9) }
  ];
}`,
    hints: [
      'The `Player` creates a new `Inventory` in its constructor. `pickup` checks the weight limit before delegating to `this.inventory.add()`. `drop` checks existence before delegating to `this.inventory.remove()`.',
      'For `pickup`: `if (this.inventory.totalWeight + item.weight <= this.maxWeight)`. For `drop`: `if (this.inventory.has(name)) { this.inventory.remove(name); return true; }`. The Player orchestrates, the Inventory manages items.',
    ],
    resources: classRes,
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
    `T3 Advanced Classes — Section 4: ${exercises.length} exercises (IDs ${exercises[0].id}-${exercises[exercises.length - 1].id})`
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
    `\nAppended ${exercises.length} exercises (${before} → ${after})`
  );
  console.log('Written to:', CURRICULUM_PATH);
}

main();
