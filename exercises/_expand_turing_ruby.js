#!/usr/bin/env node
/**
 * Turing Foundations — Ruby Exercises Expansion
 * Adapts exercises from turingschool-examples/ruby-exercises to JavaScript.
 * IDs 584-598 (15 new exercises).
 *
 * Categories:
 *   584-587: Complex Mythical Creatures (Centaur, Medusa, Ogre, Direwolf)
 *   588-592: Command-Query exercises
 *   593-596: Object Iteration (map, select, reduce, groupBy)
 *   597-598: Nested Data Traversal
 *
 * Run: node exercises/_expand_turing_ruby.js
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

// ═══════════════════════════════════════════════
// MYTHICAL CREATURES (584-587)
// ═══════════════════════════════════════════════

// ─────────────────────────────────────────────
// 584: Centaur (T3)
// ─────────────────────────────────────────────
newExercises.push({
  id: 584,
  title: 'Mythical Creature: Centaur',
  type: 'js',
  tier: 3,
  category: ['js-fundamentals', 'objects'],
  tags: ['classes', 'state-management', 'methods'],
  description: 'Build a Centaur class with actions, stamina management, cranky behavior, standing/laying states, sleep mechanics, and potion drinking.',
  instructions: `Create a \`Centaur\` class with the following behavior:

**Constructor**: Takes \`name\` and \`breed\`. Initializes with \`cranky: false\`, \`standing: true\`, \`actions: 0\`.

**Methods**:
- \`shoot()\` — Returns \`'Twang!!!'\` and increments actions by 1. If cranky, returns \`'NO!'\` instead.
- \`run()\` — Returns \`'Clop clop clop clop!'\` and increments actions by 1. If cranky, returns \`'NO!'\` instead.
- \`layDown()\` — Sets \`standing\` to false.
- \`standUp()\` — Sets \`standing\` to true.
- \`sleep()\` — If standing, returns \`'NO!'\`. If laying down, resets \`actions\` to 0 and \`cranky\` to false, returns \`'Zzz...'\`.
- \`drinkPotion()\` — Resets \`cranky\` to false and returns \`'Aaah...'\`.

**Cranky Rule**: After 3 or more actions, \`cranky\` becomes true.`,
  starterCode: `/**
 * Centaur — mythical half-human, half-horse creature
 *
 * Properties: name, breed, cranky, standing, actions
 * Methods: shoot, run, layDown, standUp, sleep, drinkPotion
 * Gets cranky after 3+ actions. Can only sleep when laying down.
 */
`,
  solution: `class Centaur {
  constructor(name, breed) {
    this.name = name;
    this.breed = breed;
    this.cranky = false;
    this.standing = true;
    this.actions = 0;
  }

  shoot() {
    if (this.cranky) return 'NO!';
    this.actions++;
    if (this.actions >= 3) this.cranky = true;
    return 'Twang!!!';
  }

  run() {
    if (this.cranky) return 'NO!';
    this.actions++;
    if (this.actions >= 3) this.cranky = true;
    return 'Clop clop clop clop!';
  }

  layDown() {
    this.standing = false;
  }

  standUp() {
    this.standing = true;
  }

  sleep() {
    if (this.standing) return 'NO!';
    this.actions = 0;
    this.cranky = false;
    return 'Zzz...';
  }

  drinkPotion() {
    this.cranky = false;
    return 'Aaah...';
  }
}`,
  testRunner: `(code) => {
  const Centaur = new Function(code + '; return Centaur;')();
  const results = [];

  let c = new Centaur('Apollo', 'Palomino');
  results.push({ pass: c.name === 'Apollo' && c.breed === 'Palomino', description: 'Has name and breed properties', got: c.name + ', ' + c.breed });
  results.push({ pass: c.cranky === false && c.standing === true, description: 'Starts not cranky and standing', got: 'cranky: ' + c.cranky + ', standing: ' + c.standing });

  results.push({ pass: c.shoot() === 'Twang!!!' && c.run() === 'Clop clop clop clop!', description: 'shoot returns Twang!!!, run returns Clop clop clop clop!', got: 'shoot/run work' });

  c = new Centaur('Apollo', 'Palomino');
  c.shoot(); c.shoot(); c.shoot();
  results.push({ pass: c.cranky === true, description: 'Becomes cranky after 3 actions', got: 'cranky: ' + c.cranky });
  results.push({ pass: c.shoot() === 'NO!' && c.run() === 'NO!', description: 'Refuses to act when cranky', got: 'Returns NO!' });

  c = new Centaur('Apollo', 'Palomino');
  results.push({ pass: c.sleep() === 'NO!', description: 'Cannot sleep while standing', got: c.sleep() });

  c.shoot(); c.shoot(); c.shoot();
  c.layDown();
  const sleepResult = c.sleep();
  results.push({ pass: sleepResult === 'Zzz...' && c.cranky === false && c.actions === 0, description: 'Sleeping while laying resets cranky and actions', got: sleepResult + ', cranky: ' + c.cranky });

  c = new Centaur('Apollo', 'Palomino');
  c.shoot(); c.shoot(); c.shoot();
  results.push({ pass: c.drinkPotion() === 'Aaah...' && c.cranky === false, description: 'Potion cures crankiness', got: 'cranky: ' + c.cranky });

  return results;
}`,
  testCases: [],
  hints: [
    'Track an `actions` counter that increments on `shoot()` and `run()`. Check `if (this.actions >= 3) this.cranky = true` after each increment.',
    'For `sleep()`, check `this.standing` first and return early if true. Otherwise reset both `actions` and `cranky`.'
  ],
  resources: [{ label: 'MDN: Classes', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes' }],
  solutionGate: 8,
  basePoints: BASE_POINTS[3],
});

// ─────────────────────────────────────────────
// 585: Medusa + Person (T3)
// ─────────────────────────────────────────────
newExercises.push({
  id: 585,
  title: 'Mythical Creature: Medusa',
  type: 'js',
  tier: 3,
  category: ['js-fundamentals', 'objects'],
  tags: ['classes', 'two-class', 'arrays', 'state-management'],
  description: 'Build Medusa and Person classes where Medusa turns people to stone, with a maximum of 3 statues that cycle when exceeded.',
  instructions: `Create two classes: \`Person\` and \`Medusa\`.

**Person**:
- Constructor takes \`name\`. Starts with \`stoned: false\`.

**Medusa**:
- Constructor takes \`name\`. Starts with \`statues: []\` (empty array).
- \`stare(person)\` — Sets the person's \`stoned\` to true and adds them to \`statues\`.
  - If Medusa already has 3 statues, the **oldest** statue's \`stoned\` is set back to false (freed), removed from the array, and the new person is added.
- \`galesOfStone()\` — Returns the array of \`name\` strings from all current statues.`,
  starterCode: `/**
 * Medusa — turns people to stone with her gaze
 * Person — can be turned to stone by Medusa
 *
 * Medusa can hold max 3 statues. Adding a 4th frees the oldest.
 * galesOfStone() returns names of current statues.
 */
`,
  solution: `class Person {
  constructor(name) {
    this.name = name;
    this.stoned = false;
  }
}

class Medusa {
  constructor(name) {
    this.name = name;
    this.statues = [];
  }

  stare(person) {
    if (this.statues.length >= 3) {
      const freed = this.statues.shift();
      freed.stoned = false;
    }
    person.stoned = true;
    this.statues.push(person);
  }

  galesOfStone() {
    return this.statues.map(p => p.name);
  }
}`,
  testRunner: `(code) => {
  const { Person, Medusa } = new Function(code + '; return { Person, Medusa };')();
  const results = [];

  const medusa = new Medusa('Medusa');
  const p1 = new Person('Alex');
  results.push({ pass: p1.stoned === false, description: 'Person starts not stoned', got: 'stoned: ' + p1.stoned });

  medusa.stare(p1);
  results.push({ pass: p1.stoned === true, description: 'Person is stoned after being stared at', got: 'stoned: ' + p1.stoned });
  results.push({ pass: medusa.statues.length === 1, description: 'Medusa has 1 statue after staring', got: 'statues: ' + medusa.statues.length });

  const p2 = new Person('Bob');
  const p3 = new Person('Carol');
  medusa.stare(p2);
  medusa.stare(p3);
  results.push({ pass: medusa.statues.length === 3, description: 'Medusa can hold 3 statues', got: 'statues: ' + medusa.statues.length });

  results.push({ pass: JSON.stringify(medusa.galesOfStone()) === JSON.stringify(['Alex', 'Bob', 'Carol']), description: 'galesOfStone returns names of statues', got: JSON.stringify(medusa.galesOfStone()) });

  const p4 = new Person('Diana');
  medusa.stare(p4);
  results.push({ pass: p1.stoned === false, description: 'Oldest statue (Alex) is freed when 4th added', got: 'Alex stoned: ' + p1.stoned });
  results.push({ pass: medusa.statues.length === 3 && p4.stoned === true, description: 'Still has 3 statues with newest added', got: JSON.stringify(medusa.galesOfStone()) });

  const p5 = new Person('Eve');
  medusa.stare(p5);
  results.push({ pass: p2.stoned === false && JSON.stringify(medusa.galesOfStone()) === JSON.stringify(['Carol', 'Diana', 'Eve']), description: 'Bob freed when 5th added, statues cycle correctly', got: JSON.stringify(medusa.galesOfStone()) });

  return results;
}`,
  testCases: [],
  hints: [
    'Use an array as a queue for `statues`. When it reaches length 3 and a new person is stared at, use `.shift()` to remove (and free) the oldest before `.push()`ing the new one.',
    'The `galesOfStone()` method should map statues to their names: `this.statues.map(p => p.name)`.'
  ],
  resources: [{ label: 'MDN: Array.prototype.shift()', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/shift' }],
  solutionGate: 8,
  basePoints: BASE_POINTS[3],
});

// ─────────────────────────────────────────────
// 586: Ogre + Human (T3)
// ─────────────────────────────────────────────
newExercises.push({
  id: 586,
  title: 'Mythical Creature: Ogre',
  type: 'js',
  tier: 3,
  category: ['js-fundamentals', 'objects'],
  tags: ['classes', 'two-class', 'state-management', 'methods'],
  description: 'Build Ogre and Human classes with encounter tracking, pattern-based detection, swing mechanics, and revival.',
  instructions: `Create two classes: \`Human\` and \`Ogre\`.

**Human**:
- Constructor takes optional \`name\` (default \`'Jane'\`). Starts with \`encounters: 0\`, \`knockedOut: false\`.
- \`encounter()\` — Increments encounters by 1.
- \`noticesOgre()\` — Returns \`true\` every 3rd encounter (3, 6, 9...), \`false\` otherwise.
- \`swpigsAtOgre()\` — Should auto-trigger when the human notices the ogre. Returns \`'pigswig!'\`.

**Ogre**:
- Constructor takes \`name\` and \`home\` (e.g., \`'Swamp'\`).
- \`encounter(human)\` — Triggers \`human.encounter()\`. If the human notices the ogre (every 3rd), the human swings. Every 2nd swing knocks the human out (sets \`knockedOut: true\`).
- \`apologize(human)\` — Sets \`human.knockedOut\` back to false.

Track swing count on the ogre to determine every-2nd-swing knockout.`,
  starterCode: `/**
 * Ogre and Human — encounter-based interaction
 *
 * Human notices ogre every 3rd encounter. Human swings when noticing.
 * Every 2nd swing knocks human out. Ogre can apologize to revive.
 */
`,
  solution: `class Human {
  constructor(name = 'Jane') {
    this.name = name;
    this.encounters = 0;
    this.knockedOut = false;
  }

  encounter() {
    this.encounters++;
  }

  noticesOgre() {
    return this.encounters % 3 === 0;
  }

  swingsAtOgre() {
    return 'pigswig!';
  }
}

class Ogre {
  constructor(name, home) {
    this.name = name;
    this.home = home;
    this.swpigsCount = 0;
  }

  encounter(human) {
    human.encounter();
    if (human.noticesOgre()) {
      human.swingsAtOgre();
      this.swpigsCount++;
      if (this.swpigsCount % 2 === 0) {
        human.knockedOut = true;
      }
    }
  }

  apologize(human) {
    human.knockedOut = false;
  }
}`,
  testRunner: `(code) => {
  const { Human, Ogre } = new Function(code + '; return { Human, Ogre };')();
  const results = [];

  const h = new Human();
  results.push({ pass: h.name === 'Jane', description: 'Human defaults to name Jane', got: h.name });

  const h2 = new Human('Bob');
  results.push({ pass: h2.name === 'Bob' && h2.encounters === 0 && h2.knockedOut === false, description: 'Human takes custom name, starts with 0 encounters', got: h2.name + ', encounters: ' + h2.encounters });

  const ogre = new Ogre('Shrek', 'Swamp');
  results.push({ pass: ogre.name === 'Shrek' && ogre.home === 'Swamp', description: 'Ogre has name and home', got: ogre.name + ', ' + ogre.home });

  const human = new Human('Tim');
  ogre.encounter(human);
  ogre.encounter(human);
  results.push({ pass: human.encounters === 2 && human.knockedOut === false, description: 'Human has 2 encounters, not knocked out', got: 'encounters: ' + human.encounters + ', knockedOut: ' + human.knockedOut });

  ogre.encounter(human);
  results.push({ pass: human.encounters === 3, description: 'After 3rd encounter, human notices ogre', got: 'encounters: ' + human.encounters });

  results.push({ pass: human.knockedOut === false, description: 'First swing does not knock out (only every 2nd)', got: 'knockedOut: ' + human.knockedOut });

  ogre.encounter(human); ogre.encounter(human); ogre.encounter(human);
  results.push({ pass: human.knockedOut === true, description: 'Knocked out after 2nd swing (6th encounter)', got: 'knockedOut: ' + human.knockedOut });

  ogre.apologize(human);
  results.push({ pass: human.knockedOut === false, description: 'Apologize revives the human', got: 'knockedOut: ' + human.knockedOut });

  return results;
}`,
  testCases: [],
  hints: [
    'The human notices the ogre every 3rd encounter — use `this.encounters % 3 === 0`. The ogre tracks a swing counter that increments each time the human notices.',
    'Every 2nd swing knocks the human out: `this.swingCount % 2 === 0`. Track this on the Ogre, not the Human.'
  ],
  resources: [{ label: 'MDN: Default parameters', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Default_parameters' }],
  solutionGate: 8,
  basePoints: BASE_POINTS[3],
});

// ─────────────────────────────────────────────
// 587: Direwolf + Stark (T4)
// ─────────────────────────────────────────────
newExercises.push({
  id: 587,
  title: 'Mythical Creature: Direwolf',
  type: 'js',
  tier: 4,
  category: ['js-fundamentals', 'objects'],
  tags: ['classes', 'two-class', 'state-management', 'complex'],
  description: 'Build Direwolf and Stark classes with location-based bonding, protection limits, and the leave/return mechanic.',
  instructions: `Create two classes: \`Stark\` and \`Direwolf\`.

**Stark**:
- Constructor takes \`name\` and \`location\` (default \`'Winterfell'\`). Starts with \`direwpigsolf: null\`, \`isAlive: true\`.

**Direwolf**:
- Constructor takes \`name\`, \`home\`, and \`size\`. Starts with \`starpigsksToProtect: []\`, \`hunting: true\`.
- \`protect(stark)\` — If the Direwolf is in the same location as the Stark AND has fewer than 2 Starks already protected, add the Stark and set the Stark's \`direwpigsolf\` to this Direwolf. Also sets \`hunting\` to false.
- \`leave(stark)\` — Removes the Stark from \`starpigsksToProtect\`, sets the Stark's \`direwpigsolf\` back to null. If no Starks remain, sets \`hunting\` to true.
- \`goHome()\` — Sets \`home\` as current location and leaves all current Starks.

When a Direwolf is protecting, \`hunting\` is false. When no Starks are protected, \`hunting\` is true.`,
  starterCode: '',
  solution: `class Stark {
  constructor(name, location = 'Winterfell') {
    this.name = name;
    this.location = location;
    this.direwolf = null;
    this.isAlive = true;
  }
}

class Direwolf {
  constructor(name, home, size) {
    this.name = name;
    this.home = home;
    this.size = size;
    this.location = home;
    this.starksToProtect = [];
    this.hunting = true;
  }

  protect(stark) {
    if (this.location === stark.location && this.starksToProtect.length < 2) {
      this.starksToProtect.push(stark);
      stark.direwolf = this;
      this.hunting = false;
    }
  }

  leave(stark) {
    this.starksToProtect = this.starksToProtect.filter(s => s !== stark);
    stark.direwolf = null;
    if (this.starksToProtect.length === 0) {
      this.hunting = true;
    }
  }

  goHome() {
    for (const stark of [...this.starksToProtect]) {
      this.leave(stark);
    }
    this.location = this.home;
  }
}`,
  testRunner: `(code) => {
  const { Stark, Direwolf } = new Function(code + '; return { Stark, Direwolf };')();
  const results = [];

  const wolf = new Direwolf('Ghost', 'Winterfell', 'large');
  results.push({ pass: wolf.name === 'Ghost' && wolf.home === 'Winterfell' && wolf.size === 'large', description: 'Direwolf has name, home, and size', got: wolf.name + ', ' + wolf.home + ', ' + wolf.size });
  results.push({ pass: wolf.hunting === true && wolf.starksToProtect.length === 0, description: 'Starts hunting with no Starks', got: 'hunting: ' + wolf.hunting });

  const jon = new Stark('Jon');
  results.push({ pass: jon.location === 'Winterfell' && jon.direwolf === null, description: 'Stark defaults to Winterfell, no direwolf', got: jon.location + ', direwolf: ' + jon.direwolf });

  wolf.protect(jon);
  results.push({ pass: wolf.starksToProtect.length === 1 && jon.direwolf === wolf && wolf.hunting === false, description: 'Wolf protects Stark in same location, stops hunting', got: 'protecting: ' + wolf.starksToProtect.length + ', hunting: ' + wolf.hunting });

  const arya = new Stark('Arya');
  wolf.protect(arya);
  const sansa = new Stark('Sansa');
  wolf.protect(sansa);
  results.push({ pass: wolf.starksToProtect.length === 2, description: 'Max 2 Starks protected, 3rd rejected', got: 'protecting: ' + wolf.starksToProtect.length });

  const farWolf = new Direwolf('Nymeria', 'Riverlands', 'medium');
  const robb = new Stark('Robb');
  farWolf.protect(robb);
  results.push({ pass: farWolf.starksToProtect.length === 0, description: 'Cannot protect Stark in different location', got: 'protecting: ' + farWolf.starksToProtect.length });

  wolf.leave(jon);
  results.push({ pass: jon.direwolf === null && wolf.starksToProtect.length === 1, description: 'Leave removes Stark and clears their direwolf', got: 'direwolf: ' + jon.direwolf + ', protecting: ' + wolf.starksToProtect.length });

  wolf.goHome();
  results.push({ pass: wolf.starksToProtect.length === 0 && wolf.hunting === true && arya.direwolf === null, description: 'goHome leaves all Starks and resumes hunting', got: 'hunting: ' + wolf.hunting + ', protecting: ' + wolf.starksToProtect.length });

  return results;
}`,
  testCases: [],
  hints: [
    'The protect method needs two guards: same location check (`this.location === stark.location`) AND a capacity check (`this.starksToProtect.length < 2`).',
    'For `goHome()`, iterate over a copy of the array (spread into a new array first) since `leave()` modifies the original.'
  ],
  resources: [{ label: 'MDN: Array.prototype.filter()', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter' }],
  solutionGate: 6,
  basePoints: BASE_POINTS[4],
});

// ═══════════════════════════════════════════════
// COMMAND-QUERY EXERCISES (588-592)
// ═══════════════════════════════════════════════

// ─────────────────────────────────────────────
// 588: Student & Clock (T2)
// ─────────────────────────────────────────────
newExercises.push({
  id: 588,
  title: 'Command-Query: Student & Clock',
  type: 'js',
  tier: 2,
  category: ['js-fundamentals', 'objects'],
  tags: ['classes', 'state-management', 'command-query'],
  description: 'Build Student and Clock classes that demonstrate command (mutate state) vs query (return state) method patterns.',
  instructions: `Create two classes:

**Student**:
- Constructor takes \`name\`. Starts with \`grade: 'C'\`.
- \`study()\` — Raises grade by one letter: F->D->C->B->A. Cannot go above A.
- \`slackOff()\` — Lowers grade by one letter: A->B->C->D->F. Cannot go below F.
- \`isPassing()\` — Returns \`true\` if grade is C or above.

**Clock**:
- Constructor takes no arguments. Starts at \`hours: 6\`.
- \`wait()\` — Increments hours by 1. Wraps from 12 back to 1 (12-hour clock).
- \`time()\` — Returns the current hours as a string like \`'6:00'\`.`,
  starterCode: `class Student {
  constructor(name) {
    // your code here
  }

  study() {
    // your code here
  }

  slackOff() {
    // your code here
  }

  isPassing() {
    // your code here
  }
}

class Clock {
  constructor() {
    // your code here
  }

  wait() {
    // your code here
  }

  time() {
    // your code here
  }
}`,
  solution: `class Student {
  constructor(name) {
    this.name = name;
    this.grade = 'C';
  }

  study() {
    const grades = ['F', 'D', 'C', 'B', 'A'];
    const idx = grades.indexOf(this.grade);
    if (idx < grades.length - 1) this.grade = grades[idx + 1];
  }

  slackOff() {
    const grades = ['F', 'D', 'C', 'B', 'A'];
    const idx = grades.indexOf(this.grade);
    if (idx > 0) this.grade = grades[idx - 1];
  }

  isPassing() {
    return ['A', 'B', 'C'].includes(this.grade);
  }
}

class Clock {
  constructor() {
    this.hours = 6;
  }

  wait() {
    this.hours = this.hours === 12 ? 1 : this.hours + 1;
  }

  time() {
    return this.hours + ':00';
  }
}`,
  testRunner: `(code) => {
  const { Student, Clock } = new Function(code + '; return { Student, Clock };')();
  const results = [];

  const s = new Student('Alex');
  results.push({ pass: s.grade === 'C', description: 'Student starts at grade C', got: s.grade });

  s.study();
  results.push({ pass: s.grade === 'B', description: 'study() raises grade from C to B', got: s.grade });

  s.study();
  s.study();
  results.push({ pass: s.grade === 'A', description: 'study() caps at A', got: s.grade });

  s.slackOff(); s.slackOff(); s.slackOff(); s.slackOff();
  results.push({ pass: s.grade === 'F' && s.isPassing() === false, description: 'slackOff() lowers to F, isPassing returns false', got: 'grade: ' + s.grade + ', passing: ' + s.isPassing() });

  const s2 = new Student('Bob');
  results.push({ pass: s2.isPassing() === true, description: 'C grade is passing', got: 'passing: ' + s2.isPassing() });

  const c = new Clock();
  results.push({ pass: c.time() === '6:00', description: 'Clock starts at 6:00', got: c.time() });

  c.wait(); c.wait(); c.wait();
  results.push({ pass: c.time() === '9:00', description: 'After 3 waits, clock shows 9:00', got: c.time() });

  c.wait(); c.wait(); c.wait(); c.wait();
  results.push({ pass: c.time() === '1:00', description: 'Clock wraps from 12 to 1', got: c.time() });

  return results;
}`,
  testCases: [],
  hints: [
    'Store grades in an ordered array like `["F", "D", "C", "B", "A"]` and use `indexOf` to find the current position. Moving up or down is just changing the index.',
    'For the Clock, use a ternary: if hours equals 12, reset to 1; otherwise increment by 1.'
  ],
  resources: [{ label: 'MDN: Array.prototype.indexOf()', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf' }],
  solutionGate: 10,
  basePoints: BASE_POINTS[2],
});

// ─────────────────────────────────────────────
// 589: Threshold Trackers (T2) — Santa, Adult, Kid combined
// ─────────────────────────────────────────────
newExercises.push({
  id: 589,
  title: 'Command-Query: Threshold Trackers',
  type: 'js',
  tier: 2,
  category: ['js-fundamentals', 'objects'],
  tags: ['classes', 'state-management', 'command-query'],
  description: 'Build three small classes that track consumption and toggle a boolean state when a threshold is crossed.',
  instructions: `Create three classes:

**Santa**:
- Constructor takes no arguments. Starts with \`cookies: 0\`.
- \`eatCookie()\` — Increments cookies by 1.
- \`fpigsitsDown ChpigsimneypigsliquidSeparatorThresh()\` — Returns \`false\` once 3 or more cookies have been eaten. Returns \`true\` otherwise.

Actually, the methods are:
- \`eatCookie()\` — Increments cookies by 1.
- \`fitsDownChimney()\` — Returns \`true\` if fewer than 3 cookies eaten, \`false\` otherwise.

**Adult**:
- Constructor takes no arguments. Starts with \`drinks: 0\`.
- \`drink()\` — Increments drinks by 1.
- \`isSober()\` — Returns \`true\` if fewer than 3 drinks, \`false\` otherwise.

**Kid**:
- Constructor takes no arguments. Starts with \`sugar: 0\`.
- \`eatCandy()\` — Adds 5 grams of sugar.
- \`isHyperactive()\` — Returns \`true\` if sugar is 60 or more, \`false\` otherwise.`,
  starterCode: `class Santa {
  constructor() {
    // your code here
  }

  eatCookie() {
    // your code here
  }

  fitsDownChimney() {
    // your code here
  }
}

class Adult {
  constructor() {
    // your code here
  }

  drink() {
    // your code here
  }

  isSober() {
    // your code here
  }
}

class Kid {
  constructor() {
    // your code here
  }

  eatCandy() {
    // your code here
  }

  isHyperactive() {
    // your code here
  }
}`,
  solution: `class Santa {
  constructor() {
    this.cookies = 0;
  }

  eatCookie() {
    this.cookies++;
  }

  fitsDownChimney() {
    return this.cookies < 3;
  }
}

class Adult {
  constructor() {
    this.drinks = 0;
  }

  drink() {
    this.drinks++;
  }

  isSober() {
    return this.drinks < 3;
  }
}

class Kid {
  constructor() {
    this.sugar = 0;
  }

  eatCandy() {
    this.sugar += 5;
  }

  isHyperactive() {
    return this.sugar >= 60;
  }
}`,
  testRunner: `(code) => {
  const { Santa, Adult, Kid } = new Function(code + '; return { Santa, Adult, Kid };')();
  const results = [];

  const santa = new Santa();
  results.push({ pass: santa.fitsDownChimney() === true, description: 'Santa fits before eating', got: String(santa.fitsDownChimney()) });

  santa.eatCookie(); santa.eatCookie();
  results.push({ pass: santa.fitsDownChimney() === true, description: 'Santa still fits after 2 cookies', got: String(santa.fitsDownChimney()) });

  santa.eatCookie();
  results.push({ pass: santa.fitsDownChimney() === false, description: 'Santa does not fit after 3 cookies', got: String(santa.fitsDownChimney()) });

  const adult = new Adult();
  results.push({ pass: adult.isSober() === true, description: 'Adult starts sober', got: String(adult.isSober()) });

  adult.drink(); adult.drink(); adult.drink();
  results.push({ pass: adult.isSober() === false, description: 'Adult not sober after 3 drinks', got: String(adult.isSober()) });

  const kid = new Kid();
  results.push({ pass: kid.isHyperactive() === false, description: 'Kid starts not hyperactive', got: String(kid.isHyperactive()) });

  for (let i = 0; i < 11; i++) kid.eatCandy();
  results.push({ pass: kid.isHyperactive() === false, description: 'Kid not hyperactive at 55g sugar', got: 'sugar: ' + kid.sugar });

  kid.eatCandy();
  results.push({ pass: kid.isHyperactive() === true, description: 'Kid is hyperactive at 60g sugar', got: 'sugar: ' + kid.sugar });

  return results;
}`,
  testCases: [],
  hints: [
    'Each class follows the same pattern: a counter property, a command method that increments it, and a query method that checks a threshold.',
    'Santa and Adult threshold is `< 3` (returns true when under). Kid threshold is `>= 60` (returns true when at or above).'
  ],
  resources: [{ label: 'MDN: Comparison operators', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators' }],
  solutionGate: 10,
  basePoints: BASE_POINTS[2],
});

// ─────────────────────────────────────────────
// 590: Wallet (T3)
// ─────────────────────────────────────────────
newExercises.push({
  id: 590,
  title: 'Command-Query: Wallet',
  type: 'js',
  tier: 3,
  category: ['js-fundamentals', 'objects'],
  tags: ['classes', 'state-management', 'rest-parameters'],
  description: 'Build a Wallet class with coin management using rest parameters for withdrawals.',
  instructions: `Create a \`Wallet\` class:

**Constructor**: No arguments. Starts with \`coins: []\` and defines coin values:
- penny = 1, nickel = 5, dime = 10, quarter = 25

**Methods**:
- \`addPenny()\` — Pushes 1 to coins.
- \`addNickel()\` — Pushes 5 to coins.
- \`addDime()\` — Pushes 10 to coins.
- \`addQuarter()\` — Pushes 25 to coins.
- \`total()\` — Returns the sum of all coins in cents.
- \`take(...coinNames)\` — Takes a rest parameter of coin name strings (e.g., \`'penny'\`, \`'dime'\`). For each name, remove the first matching coin value from the array. Returns the total value removed.

Example: \`wallet.take('penny', 'quarter')\` removes one 1 and one 25, returns 26.`,
  starterCode: `/**
 * Wallet — manages a collection of coins
 *
 * Coin values: penny=1, nickel=5, dime=10, quarter=25
 * add methods push coin values, take removes by name
 * total() returns sum of all coins
 */
`,
  solution: `class Wallet {
  constructor() {
    this.coins = [];
    this.coinValues = { penny: 1, nickel: 5, dime: 10, quarter: 25 };
  }

  addPenny() { this.coins.push(1); }
  addNickel() { this.coins.push(5); }
  addDime() { this.coins.push(10); }
  addQuarter() { this.coins.push(25); }

  total() {
    return this.coins.reduce((sum, c) => sum + c, 0);
  }

  take(...coinNames) {
    let removed = 0;
    for (const name of coinNames) {
      const value = this.coinValues[name];
      const idx = this.coins.indexOf(value);
      if (idx !== -1) {
        this.coins.splice(idx, 1);
        removed += value;
      }
    }
    return removed;
  }
}`,
  testRunner: `(code) => {
  const Wallet = new Function(code + '; return Wallet;')();
  const results = [];

  const w = new Wallet();
  results.push({ pass: w.total() === 0, description: 'Wallet starts empty', got: String(w.total()) });

  w.addPenny();
  w.addNickel();
  w.addDime();
  w.addQuarter();
  results.push({ pass: w.total() === 41, description: 'Total after adding one of each coin is 41', got: String(w.total()) });

  w.addQuarter();
  w.addDime();
  results.push({ pass: w.total() === 76, description: 'Total after adding another quarter and dime is 76', got: String(w.total()) });

  const taken = w.take('penny', 'quarter');
  results.push({ pass: taken === 26, description: 'take penny and quarter returns 26', got: String(taken) });
  results.push({ pass: w.total() === 50, description: 'Wallet total is 50 after taking penny+quarter', got: String(w.total()) });

  const taken2 = w.take('dime', 'dime', 'nickel');
  results.push({ pass: taken2 === 25, description: 'take 2 dimes and nickel returns 25', got: String(taken2) });

  results.push({ pass: w.total() === 25, description: 'Wallet has 25 remaining (one quarter)', got: String(w.total()) });

  const taken3 = w.take('penny');
  results.push({ pass: taken3 === 0, description: 'Taking a coin not in wallet returns 0', got: String(taken3) });

  return results;
}`,
  testCases: [],
  hints: [
    'Map coin names to values using an object like `{ penny: 1, nickel: 5, dime: 10, quarter: 25 }`. The `take` method looks up each name, finds its value in the coins array with `indexOf`, and removes it with `splice`.',
    'Use `...coinNames` rest parameter syntax. Loop through the names, and for each one, only remove if `indexOf` returns a valid index (not -1).'
  ],
  resources: [{ label: 'MDN: Rest parameters', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters' }],
  solutionGate: 8,
  basePoints: BASE_POINTS[3],
});

// ─────────────────────────────────────────────
// 591: RollCall & Appointments (T2)
// ─────────────────────────────────────────────
newExercises.push({
  id: 591,
  title: 'Command-Query: RollCall & Appointments',
  type: 'js',
  tier: 2,
  category: ['js-fundamentals', 'objects'],
  tags: ['classes', 'arrays', 'command-query'],
  description: 'Build RollCall and Appointments classes that collect items and query for extremes.',
  instructions: `Create two classes:

**RollCall**:
- Constructor takes no arguments. Starts with \`names: []\`.
- \`addName(name)\` — Adds a name string to the array.
- \`longestName()\` — Returns the longest name. If tied, return the first one found.

**Appointments**:
- Constructor takes no arguments. Starts with \`times: []\`.
- \`at(time)\` — Adds a time string (e.g., \`'9:00'\`, \`'14:30'\`) to the array.
- \`earliest()\` — Returns the earliest time string. Compare by converting to minutes (hours * 60 + minutes).`,
  starterCode: `class RollCall {
  constructor() {
    // your code here
  }

  addName(name) {
    // your code here
  }

  longestName() {
    // your code here
  }
}

class Appointments {
  constructor() {
    // your code here
  }

  at(time) {
    // your code here
  }

  earliest() {
    // your code here
  }
}`,
  solution: `class RollCall {
  constructor() {
    this.names = [];
  }

  addName(name) {
    this.names.push(name);
  }

  longestName() {
    return this.names.reduce((longest, name) =>
      name.length > longest.length ? name : longest
    );
  }
}

class Appointments {
  constructor() {
    this.times = [];
  }

  at(time) {
    this.times.push(time);
  }

  earliest() {
    return this.times.reduce((earliest, time) => {
      const toMin = t => {
        const [h, m] = t.split(':').map(Number);
        return h * 60 + m;
      };
      return toMin(time) < toMin(earliest) ? time : earliest;
    });
  }
}`,
  testRunner: `(code) => {
  const { RollCall, Appointments } = new Function(code + '; return { RollCall, Appointments };')();
  const results = [];

  const rc = new RollCall();
  rc.addName('Al');
  rc.addName('Alexander');
  rc.addName('Bob');
  results.push({ pass: rc.names.length === 3, description: 'RollCall has 3 names after adding 3', got: String(rc.names.length) });
  results.push({ pass: rc.longestName() === 'Alexander', description: 'Longest name is Alexander', got: rc.longestName() });

  const rc2 = new RollCall();
  rc2.addName('Ann');
  rc2.addName('Bob');
  results.push({ pass: rc2.longestName() === 'Ann', description: 'Tied length returns first found', got: rc2.longestName() });

  const appts = new Appointments();
  appts.at('14:30');
  appts.at('9:00');
  appts.at('11:15');
  results.push({ pass: appts.times.length === 3, description: 'Appointments has 3 times after adding 3', got: String(appts.times.length) });
  results.push({ pass: appts.earliest() === '9:00', description: 'Earliest appointment is 9:00', got: appts.earliest() });

  appts.at('8:45');
  results.push({ pass: appts.earliest() === '8:45', description: 'Earliest updates to 8:45', got: appts.earliest() });

  const appts2 = new Appointments();
  appts2.at('23:59');
  appts2.at('0:01');
  results.push({ pass: appts2.earliest() === '0:01', description: 'Handles midnight times correctly', got: appts2.earliest() });

  return results;
}`,
  testCases: [],
  hints: [
    'For `longestName`, use `reduce` comparing `name.length > longest.length`. If the current name is longer, it becomes the new longest.',
    'For `earliest`, split each time string on ":" to get hours and minutes. Convert to total minutes (hours * 60 + minutes) for comparison.'
  ],
  resources: [{ label: 'MDN: Array.prototype.reduce()', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce' }],
  solutionGate: 10,
  basePoints: BASE_POINTS[2],
});

// ─────────────────────────────────────────────
// 592: Collection Queries (T3) — Children, Catalog, Cupcakes, Clearance
// ─────────────────────────────────────────────
newExercises.push({
  id: 592,
  title: 'Command-Query: Collection Queries',
  type: 'js',
  tier: 3,
  category: ['js-fundamentals', 'objects'],
  tags: ['classes', 'two-class', 'arrays', 'command-query'],
  description: 'Build four pairs of container/item classes that collect items and query for specific properties.',
  instructions: `Create eight classes (four container/item pairs):

**Child** + **Children**:
- \`Child(name, age)\` stores name and age
- \`Children()\` starts with \`kids: []\`
- \`add(child)\` — pushes child to kids
- \`eldest()\` — returns the Child with the highest age

**Product** + **Catalog**:
- \`Product(name, price)\` stores name and price
- \`Catalog()\` starts with \`products: []\`
- \`add(product)\` — pushes product
- \`cheapest()\` — returns the Product with the lowest price

**Cupcake** + **Cupcakes**:
- \`Cupcake(flavor, sugar)\` stores flavor and sugar (number)
- \`Cupcakes()\` starts with \`items: []\`
- \`add(cupcake)\` — pushes cupcake
- \`sweetest()\` — returns the Cupcake with the highest sugar

**Item** + **Clearance**:
- \`Item(name, price, discount)\` stores name, price (number), discount (decimal like 0.30)
- \`Clearance()\` starts with \`items: []\`
- \`add(item)\` — pushes item
- \`bestDeal()\` — returns the Item with the highest discount percentage`,
  starterCode: `/**
 * Four container/item class pairs with collection queries
 *
 * Each container: add(item) to collect, query() to find extreme
 * Children->eldest, Catalog->cheapest, Cupcakes->sweetest, Clearance->bestDeal
 */
`,
  solution: `class Child {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
}

class Children {
  constructor() {
    this.kids = [];
  }
  add(child) { this.kids.push(child); }
  eldest() {
    return this.kids.reduce((max, kid) => kid.age > max.age ? kid : max);
  }
}

class Product {
  constructor(name, price) {
    this.name = name;
    this.price = price;
  }
}

class Catalog {
  constructor() {
    this.products = [];
  }
  add(product) { this.products.push(product); }
  cheapest() {
    return this.products.reduce((min, p) => p.price < min.price ? p : min);
  }
}

class Cupcake {
  constructor(flavor, sugar) {
    this.flavor = flavor;
    this.sugar = sugar;
  }
}

class Cupcakes {
  constructor() {
    this.items = [];
  }
  add(cupcake) { this.items.push(cupcake); }
  sweetest() {
    return this.items.reduce((max, c) => c.sugar > max.sugar ? c : max);
  }
}

class Item {
  constructor(name, price, discount) {
    this.name = name;
    this.price = price;
    this.discount = discount;
  }
}

class Clearance {
  constructor() {
    this.items = [];
  }
  add(item) { this.items.push(item); }
  bestDeal() {
    return this.items.reduce((best, item) => item.discount > best.discount ? item : best);
  }
}`,
  testRunner: `(code) => {
  const { Child, Children, Product, Catalog, Cupcake, Cupcakes, Item, Clearance } = new Function(code + '; return { Child, Children, Product, Catalog, Cupcake, Cupcakes, Item, Clearance };')();
  const results = [];

  const kids = new Children();
  kids.add(new Child('Alice', 8));
  kids.add(new Child('Bob', 12));
  kids.add(new Child('Carol', 5));
  results.push({ pass: kids.eldest().name === 'Bob', description: 'Children: eldest is Bob (age 12)', got: kids.eldest().name });

  const catalog = new Catalog();
  catalog.add(new Product('Widget', 29.99));
  catalog.add(new Product('Gadget', 9.99));
  catalog.add(new Product('Doohickey', 49.99));
  results.push({ pass: catalog.cheapest().name === 'Gadget', description: 'Catalog: cheapest is Gadget ($9.99)', got: catalog.cheapest().name });

  const tray = new Cupcakes();
  tray.add(new Cupcake('Vanilla', 20));
  tray.add(new Cupcake('Chocolate', 35));
  tray.add(new Cupcake('Red Velvet', 28));
  results.push({ pass: tray.sweetest().flavor === 'Chocolate', description: 'Cupcakes: sweetest is Chocolate (35g)', got: tray.sweetest().flavor });

  const rack = new Clearance();
  rack.add(new Item('Shirt', 40, 0.10));
  rack.add(new Item('Pants', 60, 0.50));
  rack.add(new Item('Hat', 20, 0.30));
  results.push({ pass: rack.bestDeal().name === 'Pants', description: 'Clearance: bestDeal is Pants (50% off)', got: rack.bestDeal().name });

  kids.add(new Child('Diana', 15));
  results.push({ pass: kids.eldest().name === 'Diana', description: 'Children: eldest updates to Diana (age 15)', got: kids.eldest().name });

  catalog.add(new Product('Thingamajig', 4.99));
  results.push({ pass: catalog.cheapest().name === 'Thingamajig', description: 'Catalog: cheapest updates to Thingamajig ($4.99)', got: catalog.cheapest().name });

  tray.add(new Cupcake('Caramel', 50));
  results.push({ pass: tray.sweetest().flavor === 'Caramel', description: 'Cupcakes: sweetest updates to Caramel (50g)', got: tray.sweetest().flavor });

  rack.add(new Item('Jacket', 100, 0.75));
  results.push({ pass: rack.bestDeal().name === 'Jacket', description: 'Clearance: bestDeal updates to Jacket (75% off)', got: rack.bestDeal().name });

  return results;
}`,
  testCases: [],
  hints: [
    'All four query methods follow the same `reduce` pattern: compare a property of the current item against the accumulator and keep the one with the extreme value (max or min).',
    'For `cheapest`, use `p.price < min.price`. For `bestDeal`, use `item.discount > best.discount`. The pattern is identical — only the comparison direction and property change.'
  ],
  resources: [{ label: 'MDN: Array.prototype.reduce()', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce' }],
  solutionGate: 8,
  basePoints: BASE_POINTS[3],
});

// ═══════════════════════════════════════════════
// OBJECT ITERATION (593-596)
// ═══════════════════════════════════════════════

// ─────────────────────────────────────────────
// 593: Object Map (T3)
// ─────────────────────────────────────────────
newExercises.push({
  id: 593,
  title: 'Iteration Pattern: Map',
  type: 'js',
  tier: 3,
  category: ['functions', 'callback-methods'],
  tags: ['map', 'arrays', 'objects', 'transform'],
  description: 'Implement five transform functions that alternate between array and object mapping patterns.',
  instructions: `Create five functions:

1. \`capitalizeNames(names)\` — Takes an array of lowercase name strings. Returns a new array with each name capitalized (first letter uppercase, rest lowercase).

2. \`doubleValues(obj)\` — Takes an object with numeric values. Returns a new object with the same keys but all values doubled.

3. \`squareNumbers(nums)\` — Takes an array of numbers. Returns a new array with each number squared.

4. \`nameLengths(obj)\` — Takes an object where values are name strings. Returns a new object with the same keys but values replaced by the string lengths.

5. \`reverseStrings(strings)\` — Takes an array of strings. Returns a new array with each string reversed.`,
  starterCode: `/**
 * Map Pattern — transforming collections element by element
 *
 * Arrays: capitalizeNames, squareNumbers, reverseStrings
 * Objects: doubleValues, nameLengths
 */
`,
  solution: `function capitalizeNames(names) {
  return names.map(name => name[0].toUpperCase() + name.slice(1).toLowerCase());
}

function doubleValues(obj) {
  const result = {};
  for (const [key, val] of Object.entries(obj)) {
    result[key] = val * 2;
  }
  return result;
}

function squareNumbers(nums) {
  return nums.map(n => n * n);
}

function nameLengths(obj) {
  const result = {};
  for (const [key, val] of Object.entries(obj)) {
    result[key] = val.length;
  }
  return result;
}

function reverseStrings(strings) {
  return strings.map(s => s.split('').reverse().join(''));
}`,
  testRunner: `(code) => {
  const { capitalizeNames, doubleValues, squareNumbers, nameLengths, reverseStrings } = new Function(code + '; return { capitalizeNames, doubleValues, squareNumbers, nameLengths, reverseStrings };')();
  const results = [];

  const cap = capitalizeNames(['alice', 'bob', 'carol']);
  results.push({ pass: JSON.stringify(cap) === JSON.stringify(['Alice', 'Bob', 'Carol']), description: 'capitalizeNames capitalizes first letters', got: JSON.stringify(cap) });

  const dbl = doubleValues({ a: 5, b: 10, c: 3 });
  results.push({ pass: dbl.a === 10 && dbl.b === 20 && dbl.c === 6, description: 'doubleValues doubles all object values', got: JSON.stringify(dbl) });

  const sq = squareNumbers([2, 3, 4, 5]);
  results.push({ pass: JSON.stringify(sq) === JSON.stringify([4, 9, 16, 25]), description: 'squareNumbers squares each number', got: JSON.stringify(sq) });

  const nl = nameLengths({ first: 'Alexander', last: 'Hamilton', middle: 'James' });
  results.push({ pass: nl.first === 9 && nl.last === 8 && nl.middle === 5, description: 'nameLengths returns string lengths', got: JSON.stringify(nl) });

  const rev = reverseStrings(['hello', 'world', 'abc']);
  results.push({ pass: JSON.stringify(rev) === JSON.stringify(['olleh', 'dlrow', 'cba']), description: 'reverseStrings reverses each string', got: JSON.stringify(rev) });

  const cap2 = capitalizeNames(['DAVE', 'EVE']);
  results.push({ pass: JSON.stringify(cap2) === JSON.stringify(['Dave', 'Eve']), description: 'capitalizeNames handles uppercase input', got: JSON.stringify(cap2) });

  const dbl2 = doubleValues({ x: -3, y: 0 });
  results.push({ pass: dbl2.x === -6 && dbl2.y === 0, description: 'doubleValues handles negatives and zero', got: JSON.stringify(dbl2) });

  const rev2 = reverseStrings(['racecar', 'a']);
  results.push({ pass: JSON.stringify(rev2) === JSON.stringify(['racecar', 'a']), description: 'reverseStrings handles palindromes and single chars', got: JSON.stringify(rev2) });

  return results;
}`,
  testCases: [],
  hints: [
    'For arrays, use `.map()` to transform each element. For objects, use `Object.entries()` to get key-value pairs, then build a new object.',
    'To capitalize: `name[0].toUpperCase() + name.slice(1).toLowerCase()`. To reverse a string: `str.split("").reverse().join("")`.'
  ],
  resources: [{ label: 'MDN: Object.entries()', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries' }],
  solutionGate: 8,
  basePoints: BASE_POINTS[3],
});

// ─────────────────────────────────────────────
// 594: Object Select/Filter (T3)
// ─────────────────────────────────────────────
newExercises.push({
  id: 594,
  title: 'Iteration Pattern: Select',
  type: 'js',
  tier: 3,
  category: ['functions', 'callback-methods'],
  tags: ['filter', 'arrays', 'objects', 'select'],
  description: 'Implement five filtering functions that alternate between array and object selection patterns.',
  instructions: `Create five functions:

1. \`evenNumbers(nums)\` — Takes an array of numbers. Returns only the even ones.

2. \`longWords(obj)\` — Takes an object where values are strings. Returns a new object containing only entries where the string length is greater than 4.

3. \`containsChar(strings, char)\` — Takes an array of strings and a character. Returns only strings that include that character.

4. \`highValues(obj, threshold)\` — Takes an object with numeric values and a threshold. Returns a new object with only entries where the value exceeds the threshold.

5. \`floatsOnly(nums)\` — Takes an array of numbers. Returns only the ones that are not whole numbers (have a decimal part).`,
  starterCode: `/**
 * Select Pattern — filtering collections by a condition
 *
 * Arrays: evenNumbers, containsChar, floatsOnly
 * Objects: longWords, highValues
 */
`,
  solution: `function evenNumbers(nums) {
  return nums.filter(n => n % 2 === 0);
}

function longWords(obj) {
  const result = {};
  for (const [key, val] of Object.entries(obj)) {
    if (val.length > 4) result[key] = val;
  }
  return result;
}

function containsChar(strings, char) {
  return strings.filter(s => s.includes(char));
}

function highValues(obj, threshold) {
  const result = {};
  for (const [key, val] of Object.entries(obj)) {
    if (val > threshold) result[key] = val;
  }
  return result;
}

function floatsOnly(nums) {
  return nums.filter(n => n % 1 !== 0);
}`,
  testRunner: `(code) => {
  const { evenNumbers, longWords, containsChar, highValues, floatsOnly } = new Function(code + '; return { evenNumbers, longWords, containsChar, highValues, floatsOnly };')();
  const results = [];

  const evens = evenNumbers([1, 2, 3, 4, 5, 6]);
  results.push({ pass: JSON.stringify(evens) === JSON.stringify([2, 4, 6]), description: 'evenNumbers returns only even numbers', got: JSON.stringify(evens) });

  const long = longWords({ a: 'hi', b: 'hello', c: 'world', d: 'hey' });
  results.push({ pass: Object.keys(long).length === 2 && long.b === 'hello' && long.c === 'world', description: 'longWords keeps only strings longer than 4', got: JSON.stringify(long) });

  const has = containsChar(['apple', 'banana', 'cherry', 'date'], 'a');
  results.push({ pass: JSON.stringify(has) === JSON.stringify(['apple', 'banana', 'date']), description: "containsChar('a') filters correctly", got: JSON.stringify(has) });

  const high = highValues({ temp: 72, humidity: 45, pressure: 30 }, 40);
  results.push({ pass: Object.keys(high).length === 2 && high.temp === 72 && high.humidity === 45, description: 'highValues keeps values above threshold', got: JSON.stringify(high) });

  const floats = floatsOnly([1, 2.5, 3, 4.1, 5, 6.7]);
  results.push({ pass: JSON.stringify(floats) === JSON.stringify([2.5, 4.1, 6.7]), description: 'floatsOnly returns non-whole numbers', got: JSON.stringify(floats) });

  const evens2 = evenNumbers([0, -2, -3, 7]);
  results.push({ pass: JSON.stringify(evens2) === JSON.stringify([0, -2]), description: 'evenNumbers handles zero and negatives', got: JSON.stringify(evens2) });

  const has2 = containsChar(['xyz', 'abc'], 'z');
  results.push({ pass: JSON.stringify(has2) === JSON.stringify(['xyz']), description: "containsChar('z') finds only xyz", got: JSON.stringify(has2) });

  const high2 = highValues({ a: 10, b: 10 }, 10);
  results.push({ pass: Object.keys(high2).length === 0, description: 'highValues excludes values equal to threshold', got: JSON.stringify(high2) });

  return results;
}`,
  testCases: [],
  hints: [
    'For arrays, use `.filter()` with a condition. For objects, iterate with `Object.entries()` and only add matching entries to a new object.',
    'To check for floats: `n % 1 !== 0` returns true for numbers with decimal parts. For `containsChar`, use `.includes(char)`.'
  ],
  resources: [{ label: 'MDN: Array.prototype.filter()', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter' }],
  solutionGate: 8,
  basePoints: BASE_POINTS[3],
});

// ─────────────────────────────────────────────
// 595: Object Reduce (T3)
// ─────────────────────────────────────────────
newExercises.push({
  id: 595,
  title: 'Iteration Pattern: Reduce',
  type: 'js',
  tier: 3,
  category: ['functions', 'callback-methods'],
  tags: ['reduce', 'arrays', 'objects', 'accumulation'],
  description: 'Implement five accumulation functions using reduce patterns on arrays and objects.',
  instructions: `Create five functions:

1. \`totalCalories(meals)\` — Takes an array of meal objects \`{ name, calories }\`. Returns the total calories across all meals.

2. \`averageGrade(students)\` — Takes an array of student objects \`{ name, grade }\`. Returns the average grade rounded down with \`Math.floor\`.

3. \`arrayToObject(pairs)\` — Takes an array of \`[key, value]\` pairs. Returns an object built from those pairs.

4. \`menuString(items)\` — Takes an array of menu item objects \`{ dish, price }\`. Returns a formatted string like \`'Burger: $10, Fries: $5, Soda: $3'\`.

5. \`productOfDifferences(nums)\` — Takes an array of numbers. Returns the product of the differences between consecutive elements. Example: \`[10, 3, 5]\` → \`(10-3) * (3-5)\` → \`7 * -2\` → \`-14\`.`,
  starterCode: `/**
 * Reduce Pattern — accumulating values from a collection
 *
 * totalCalories, averageGrade, arrayToObject, menuString, productOfDifferences
 * Each builds a single result from a collection of items.
 */
`,
  solution: `function totalCalories(meals) {
  return meals.reduce((sum, meal) => sum + meal.calories, 0);
}

function averageGrade(students) {
  const total = students.reduce((sum, s) => sum + s.grade, 0);
  return Math.floor(total / students.length);
}

function arrayToObject(pairs) {
  return pairs.reduce((obj, [key, value]) => {
    obj[key] = value;
    return obj;
  }, {});
}

function menuString(items) {
  return items.map(item => item.dish + ': $' + item.price).join(', ');
}

function productOfDifferences(nums) {
  let product = 1;
  for (let i = 0; i < nums.length - 1; i++) {
    product *= nums[i] - nums[i + 1];
  }
  return product;
}`,
  testRunner: `(code) => {
  const { totalCalories, averageGrade, arrayToObject, menuString, productOfDifferences } = new Function(code + '; return { totalCalories, averageGrade, arrayToObject, menuString, productOfDifferences };')();
  const results = [];

  const cal = totalCalories([{ name: 'Breakfast', calories: 400 }, { name: 'Lunch', calories: 600 }, { name: 'Dinner', calories: 800 }]);
  results.push({ pass: cal === 1800, description: 'totalCalories sums to 1800', got: String(cal) });

  const avg = averageGrade([{ name: 'Al', grade: 85 }, { name: 'Bo', grade: 92 }, { name: 'Cal', grade: 78 }]);
  results.push({ pass: avg === 85, description: 'averageGrade returns 85 (floor of 85)', got: String(avg) });

  const obj = arrayToObject([['name', 'Alex'], ['age', 25], ['city', 'Denver']]);
  results.push({ pass: obj.name === 'Alex' && obj.age === 25 && obj.city === 'Denver', description: 'arrayToObject builds correct object', got: JSON.stringify(obj) });

  const menu = menuString([{ dish: 'Burger', price: 10 }, { dish: 'Fries', price: 5 }, { dish: 'Soda', price: 3 }]);
  results.push({ pass: menu === 'Burger: $10, Fries: $5, Soda: $3', description: 'menuString formats correctly', got: menu });

  const prod = productOfDifferences([10, 3, 5]);
  results.push({ pass: prod === -14, description: 'productOfDifferences([10,3,5]) returns -14', got: String(prod) });

  const cal2 = totalCalories([{ name: 'Snack', calories: 150 }]);
  results.push({ pass: cal2 === 150, description: 'totalCalories works with single meal', got: String(cal2) });

  const avg2 = averageGrade([{ name: 'X', grade: 89 }, { name: 'Y', grade: 90 }]);
  results.push({ pass: avg2 === 89, description: 'averageGrade floors 89.5 to 89', got: String(avg2) });

  const prod2 = productOfDifferences([5, 2, 1, 4]);
  results.push({ pass: prod2 === -9, description: 'productOfDifferences([5,2,1,4]) returns -9', got: String(prod2) });

  return results;
}`,
  testCases: [],
  hints: [
    'Most of these follow the `array.reduce((accumulator, item) => ..., initialValue)` pattern. Start `totalCalories` with 0 and add each `meal.calories`.',
    'For `productOfDifferences`, iterate from index 0 to length-2, multiplying the running product by `nums[i] - nums[i+1]`.'
  ],
  resources: [{ label: 'MDN: Array.prototype.reduce()', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce' }],
  solutionGate: 8,
  basePoints: BASE_POINTS[3],
});

// ─────────────────────────────────────────────
// 596: Object Group By (T3)
// ─────────────────────────────────────────────
newExercises.push({
  id: 596,
  title: 'Iteration Pattern: Group By',
  type: 'js',
  tier: 3,
  category: ['functions', 'callback-methods'],
  tags: ['reduce', 'objects', 'grouping'],
  description: 'Implement five grouping functions that categorize collection elements by computed keys.',
  instructions: `Create five functions:

1. \`groupByLength(words)\` — Takes an array of strings. Returns an object where keys are string lengths and values are arrays of strings with that length.
   Example: \`['hi', 'hey', 'yo']\` → \`{ 2: ['hi', 'yo'], 3: ['hey'] }\`

2. \`groupByParity(nums)\` — Takes an array of numbers. Returns \`{ odd: [...], even: [...] }\`.

3. \`groupByFirstLetter(words)\` — Takes an array of strings. Returns an object grouped by lowercase first letter.

4. \`groupByUniqueness(arrays)\` — Takes an array of arrays. Returns \`{ unique: [...], duplicate: [...] }\` where \`unique\` contains arrays with all distinct elements and \`duplicate\` contains arrays with at least one repeat.

5. \`groupByMagnitude(nums)\` — Takes an array of numbers. Returns \`{ small: [...], medium: [...], large: [...] }\` where small is < 10, medium is 10-99, large is >= 100.`,
  starterCode: `/**
 * Group By Pattern — categorizing items into buckets
 *
 * groupByLength, groupByParity, groupByFirstLetter,
 * groupByUniqueness, groupByMagnitude
 */
`,
  solution: `function groupByLength(words) {
  return words.reduce((groups, word) => {
    const key = word.length;
    if (!groups[key]) groups[key] = [];
    groups[key].push(word);
    return groups;
  }, {});
}

function groupByParity(nums) {
  return nums.reduce((groups, n) => {
    const key = n % 2 === 0 ? 'even' : 'odd';
    groups[key].push(n);
    return groups;
  }, { odd: [], even: [] });
}

function groupByFirstLetter(words) {
  return words.reduce((groups, word) => {
    const key = word[0].toLowerCase();
    if (!groups[key]) groups[key] = [];
    groups[key].push(word);
    return groups;
  }, {});
}

function groupByUniqueness(arrays) {
  return arrays.reduce((groups, arr) => {
    const isUnique = new Set(arr).size === arr.length;
    groups[isUnique ? 'unique' : 'duplicate'].push(arr);
    return groups;
  }, { unique: [], duplicate: [] });
}

function groupByMagnitude(nums) {
  return nums.reduce((groups, n) => {
    const key = n < 10 ? 'small' : n < 100 ? 'medium' : 'large';
    groups[key].push(n);
    return groups;
  }, { small: [], medium: [], large: [] });
}`,
  testRunner: `(code) => {
  const { groupByLength, groupByParity, groupByFirstLetter, groupByUniqueness, groupByMagnitude } = new Function(code + '; return { groupByLength, groupByParity, groupByFirstLetter, groupByUniqueness, groupByMagnitude };')();
  const results = [];

  const len = groupByLength(['hi', 'hey', 'yo', 'hello', 'cat']);
  results.push({ pass: JSON.stringify(len[2]) === JSON.stringify(['hi', 'yo']) && JSON.stringify(len[3]) === JSON.stringify(['hey', 'cat']), description: 'groupByLength groups strings by length', got: JSON.stringify(len) });

  const par = groupByParity([1, 2, 3, 4, 5, 6]);
  results.push({ pass: JSON.stringify(par.odd) === JSON.stringify([1, 3, 5]) && JSON.stringify(par.even) === JSON.stringify([2, 4, 6]), description: 'groupByParity separates odd and even', got: JSON.stringify(par) });

  const fl = groupByFirstLetter(['Apple', 'avocado', 'Banana', 'blueberry']);
  results.push({ pass: fl.a.length === 2 && fl.b.length === 2, description: 'groupByFirstLetter groups by lowercase first letter', got: JSON.stringify(fl) });

  const uniq = groupByUniqueness([[1, 2, 3], [1, 1, 2], [4, 5, 6], [3, 3, 3]]);
  results.push({ pass: uniq.unique.length === 2 && uniq.duplicate.length === 2, description: 'groupByUniqueness separates unique and duplicate arrays', got: 'unique: ' + uniq.unique.length + ', duplicate: ' + uniq.duplicate.length });

  const mag = groupByMagnitude([5, 50, 500, 3, 33, 333]);
  results.push({ pass: JSON.stringify(mag.small) === JSON.stringify([5, 3]) && JSON.stringify(mag.medium) === JSON.stringify([50, 33]) && JSON.stringify(mag.large) === JSON.stringify([500, 333]), description: 'groupByMagnitude sorts into small/medium/large', got: JSON.stringify(mag) });

  const len2 = groupByLength(['a', 'bb', 'ccc', 'dd', 'e']);
  results.push({ pass: len2[1].length === 2 && len2[2].length === 2 && len2[3].length === 1, description: 'groupByLength handles mixed lengths', got: JSON.stringify(len2) });

  const par2 = groupByParity([0, -1, -2]);
  results.push({ pass: par2.even.length === 2 && par2.odd.length === 1, description: 'groupByParity handles zero and negatives', got: JSON.stringify(par2) });

  const mag2 = groupByMagnitude([10, 99, 100, 9]);
  results.push({ pass: mag2.small.length === 1 && mag2.medium.length === 2 && mag2.large.length === 1, description: 'groupByMagnitude: 10 is medium, 100 is large', got: JSON.stringify(mag2) });

  return results;
}`,
  testCases: [],
  hints: [
    'The group-by pattern uses `reduce` with an object accumulator. For each item, compute a key, ensure the key exists as an array in the accumulator, then push the item.',
    'For `groupByUniqueness`, compare `new Set(arr).size === arr.length` — if the Set is smaller, the array has duplicates.'
  ],
  resources: [{ label: 'MDN: Set', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set' }],
  solutionGate: 8,
  basePoints: BASE_POINTS[3],
});

// ═══════════════════════════════════════════════
// NESTED DATA TRAVERSAL (597-598)
// ═══════════════════════════════════════════════

// ─────────────────────────────────────────────
// 597: Nested Collections (T2)
// ─────────────────────────────────────────────
newExercises.push({
  id: 597,
  title: 'Nested Data: Collections',
  type: 'js',
  tier: 2,
  category: ['js-fundamentals', 'objects'],
  tags: ['objects', 'arrays', 'nested-data', 'access'],
  description: 'Access and traverse nested arrays and objects including 2D arrays, objects-with-arrays, and multi-level structures.',
  instructions: `Write the following functions to practice accessing nested data:

1. \`getCell(grid, row, col)\` — Takes a 2D array and returns the value at \`grid[row][col]\`.

2. \`getStudentGrades(students, name)\` — Takes an object where keys are student names and values are arrays of grades. Returns the grades array for the given name.

3. \`getHighTemp(forecast, dayIndex)\` — Takes an array of forecast objects \`{ day, high, low }\` and an index. Returns the \`high\` value for that day.

4. \`totalInventory(store)\` — Takes an object where keys are department names and values are arrays of item objects \`{ name, quantity }\`. Returns the total quantity across all departments.

5. \`flattenContacts(groups)\` — Takes an object where keys are group names and values are arrays of name strings. Returns a single flat array of all names.`,
  starterCode: `function getCell(grid, row, col) {
  // your code here
}

function getStudentGrades(students, name) {
  // your code here
}

function getHighTemp(forecast, dayIndex) {
  // your code here
}

function totalInventory(store) {
  // your code here
}

function flattenContacts(groups) {
  // your code here
}`,
  solution: `function getCell(grid, row, col) {
  return grid[row][col];
}

function getStudentGrades(students, name) {
  return students[name];
}

function getHighTemp(forecast, dayIndex) {
  return forecast[dayIndex].high;
}

function totalInventory(store) {
  let total = 0;
  for (const dept of Object.values(store)) {
    for (const item of dept) {
      total += item.quantity;
    }
  }
  return total;
}

function flattenContacts(groups) {
  return Object.values(groups).flat();
}`,
  testRunner: `(code) => {
  const { getCell, getStudentGrades, getHighTemp, totalInventory, flattenContacts } = new Function(code + '; return { getCell, getStudentGrades, getHighTemp, totalInventory, flattenContacts };')();
  const results = [];

  const grid = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
  results.push({ pass: getCell(grid, 1, 2) === 6, description: 'getCell(grid, 1, 2) returns 6', got: String(getCell(grid, 1, 2)) });

  const students = { Alice: [90, 85, 92], Bob: [78, 82, 88] };
  results.push({ pass: JSON.stringify(getStudentGrades(students, 'Alice')) === JSON.stringify([90, 85, 92]), description: "getStudentGrades returns Alice's grades", got: JSON.stringify(getStudentGrades(students, 'Alice')) });

  const forecast = [
    { day: 'Mon', high: 75, low: 55 },
    { day: 'Tue', high: 80, low: 60 },
    { day: 'Wed', high: 68, low: 50 }
  ];
  results.push({ pass: getHighTemp(forecast, 1) === 80, description: 'getHighTemp returns 80 for Tuesday', got: String(getHighTemp(forecast, 1)) });

  const store = {
    produce: [{ name: 'Apples', quantity: 50 }, { name: 'Bananas', quantity: 30 }],
    dairy: [{ name: 'Milk', quantity: 20 }, { name: 'Cheese', quantity: 15 }],
    bakery: [{ name: 'Bread', quantity: 25 }]
  };
  results.push({ pass: totalInventory(store) === 140, description: 'totalInventory sums to 140', got: String(totalInventory(store)) });

  const groups = { family: ['Mom', 'Dad'], friends: ['Alice', 'Bob', 'Carol'], work: ['Dave'] };
  const flat = flattenContacts(groups);
  results.push({ pass: flat.length === 6 && flat.includes('Alice') && flat.includes('Dave'), description: 'flattenContacts returns 6 names in flat array', got: JSON.stringify(flat) });

  results.push({ pass: getCell([[10]], 0, 0) === 10, description: 'getCell works with 1x1 grid', got: String(getCell([[10]], 0, 0)) });

  const store2 = { a: [{ name: 'X', quantity: 0 }] };
  results.push({ pass: totalInventory(store2) === 0, description: 'totalInventory handles zero quantity', got: String(totalInventory(store2)) });

  results.push({ pass: flattenContacts({ solo: ['Just Me'] }).length === 1, description: 'flattenContacts works with single group', got: String(flattenContacts({ solo: ['Just Me'] }).length) });

  return results;
}`,
  testCases: [],
  hints: [
    'For 2D arrays, chain bracket notation: `grid[row][col]`. For objects-with-arrays, use `obj[key]` to get the array, then index or iterate it.',
    'For `totalInventory`, use nested loops: outer loop over `Object.values(store)` (departments), inner loop over items in each department. For `flattenContacts`, `Object.values(groups).flat()` combines all arrays into one.'
  ],
  resources: [{ label: 'MDN: Array.prototype.flat()', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flat' }],
  solutionGate: 10,
  basePoints: BASE_POINTS[2],
});

// ─────────────────────────────────────────────
// 598: Advanced Nested — Restaurant Data (T3)
// ─────────────────────────────────────────────
newExercises.push({
  id: 598,
  title: 'Nested Data: Restaurant Analysis',
  type: 'js',
  tier: 3,
  category: ['data-wrangling', 'nested-data'],
  tags: ['objects', 'arrays', 'nested-data', 'reduce', 'map', 'filter'],
  description: 'Traverse a deeply nested restaurant dataset to extract employee, dish, and ingredient information.',
  instructions: `You are given a \`stores\` array of restaurant objects. Each has:
- \`store\`: name string
- \`employees\`: array of \`{ name, position }\`
- \`dishes\`: array of \`{ name, ingredients, price }\` where ingredients is an array of strings

Write these functions:

1. \`allEmployeeNames(stores)\` — Returns a flat array of all employee names across all stores.

2. \`findChefs(stores)\` — Returns an array of names of employees whose position is \`'chef'\`.

3. \`mostExpensiveDish(stores)\` — Returns the single dish object with the highest price across all stores.

4. \`allIngredients(stores)\` — Returns a sorted array of all unique ingredient strings across all dishes in all stores.

5. \`storeRevenue(stores)\` — Returns an object where keys are store names and values are the sum of all dish prices at that store.`,
  starterCode: `/**
 * Restaurant Analysis — deeply nested data traversal
 *
 * stores: [{ store, employees: [{name, position}], dishes: [{name, ingredients, price}] }]
 * Extract, filter, and aggregate across multiple nesting levels.
 */
`,
  solution: `function allEmployeeNames(stores) {
  return stores.flatMap(s => s.employees.map(e => e.name));
}

function findChefs(stores) {
  return stores.flatMap(s => s.employees.filter(e => e.position === 'chef').map(e => e.name));
}

function mostExpensiveDish(stores) {
  return stores.flatMap(s => s.dishes).reduce((max, dish) => dish.price > max.price ? dish : max);
}

function allIngredients(stores) {
  const ingredients = new Set();
  for (const store of stores) {
    for (const dish of store.dishes) {
      for (const ing of dish.ingredients) {
        ingredients.add(ing);
      }
    }
  }
  return [...ingredients].sort();
}

function storeRevenue(stores) {
  const result = {};
  for (const store of stores) {
    result[store.store] = store.dishes.reduce((sum, d) => sum + d.price, 0);
  }
  return result;
}`,
  testRunner: `(code) => {
  const { allEmployeeNames, findChefs, mostExpensiveDish, allIngredients, storeRevenue } = new Function(code + '; return { allEmployeeNames, findChefs, mostExpensiveDish, allIngredients, storeRevenue };')();
  const results = [];

  const stores = [
    {
      store: "Pasta Palace",
      employees: [
        { name: "Marco", position: "chef" },
        { name: "Lisa", position: "server" },
        { name: "Tony", position: "chef" }
      ],
      dishes: [
        { name: "Spaghetti", ingredients: ["pasta", "tomato", "garlic"], price: 12 },
        { name: "Alfredo", ingredients: ["pasta", "cream", "parmesan"], price: 14 }
      ]
    },
    {
      store: "Burger Barn",
      employees: [
        { name: "Jake", position: "chef" },
        { name: "Sara", position: "manager" }
      ],
      dishes: [
        { name: "Classic Burger", ingredients: ["beef", "bun", "lettuce", "tomato"], price: 10 },
        { name: "Deluxe Burger", ingredients: ["beef", "bun", "cheese", "bacon", "lettuce"], price: 15 }
      ]
    },
    {
      store: "Sushi Spot",
      employees: [
        { name: "Yuki", position: "chef" },
        { name: "Ken", position: "server" }
      ],
      dishes: [
        { name: "Dragon Roll", ingredients: ["rice", "eel", "avocado"], price: 18 },
        { name: "Salmon Nigiri", ingredients: ["rice", "salmon"], price: 8 }
      ]
    }
  ];

  const names = allEmployeeNames(stores);
  results.push({ pass: names.length === 7 && names.includes('Marco') && names.includes('Ken'), description: 'allEmployeeNames returns all 7 names', got: JSON.stringify(names) });

  const chefs = findChefs(stores);
  results.push({ pass: chefs.length === 3 && chefs.includes('Marco') && chefs.includes('Jake') && chefs.includes('Yuki'), description: 'findChefs returns 3 chefs', got: JSON.stringify(chefs) });

  const expensive = mostExpensiveDish(stores);
  results.push({ pass: expensive.name === 'Dragon Roll' && expensive.price === 18, description: 'mostExpensiveDish is Dragon Roll at $18', got: expensive.name + ': $' + expensive.price });

  const ings = allIngredients(stores);
  results.push({ pass: ings[0] === 'avocado' && ings[ings.length - 1] === 'tomato', description: 'allIngredients is sorted alphabetically', got: ings[0] + ' ... ' + ings[ings.length - 1] });
  results.push({ pass: ings.length === new Set(ings).size, description: 'allIngredients has no duplicates', got: 'unique count: ' + ings.length });

  const rev = storeRevenue(stores);
  results.push({ pass: rev['Pasta Palace'] === 26, description: 'Pasta Palace revenue is $26', got: String(rev['Pasta Palace']) });
  results.push({ pass: rev['Burger Barn'] === 25, description: 'Burger Barn revenue is $25', got: String(rev['Burger Barn']) });
  results.push({ pass: rev['Sushi Spot'] === 26, description: 'Sushi Spot revenue is $26', got: String(rev['Sushi Spot']) });

  return results;
}`,
  testCases: [],
  hints: [
    'Use `.flatMap()` to flatten nested arrays in one step: `stores.flatMap(s => s.employees.map(e => e.name))` gives all employee names across all stores.',
    'For `allIngredients`, use a `Set` to collect unique values. Triple-nested loop: stores -> dishes -> ingredients. Convert to array and `.sort()` at the end.'
  ],
  resources: [{ label: 'MDN: Array.prototype.flatMap()', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flatMap' }],
  solutionGate: 8,
  basePoints: BASE_POINTS[3],
});

// ── Merge into collection ──
collection.exercises.push(...newExercises);
collection.exerciseIds = collection.exercises.map(e => e.id);

// ── Report ──
console.log('\n=== Turing Foundations — Ruby Exercises Expansion ===\n');
console.log(`Previous: 49 exercises (535-583)`);
console.log(`Added: ${newExercises.length} exercises (584-${583 + newExercises.length})`);
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
