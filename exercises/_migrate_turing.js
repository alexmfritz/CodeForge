#!/usr/bin/env node
/**
 * Turing Foundations Collection Migration
 * - Updates existing 35 exercises to current schema
 * - Re-tiers based on curriculum conventions
 * - Renumbers IDs starting at 535
 * - Fixes categories, tags, hints
 * - Writes clean turing-foundations.json (no underscore)
 *
 * Run: node exercises/_migrate_turing.js
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const OLD_PATH = path.join(__dirname, 'collections', '_turing-foundations.json');
const NEW_PATH = path.join(__dirname, 'collections', 'turing-foundations.json');

const oldData = JSON.parse(fs.readFileSync(OLD_PATH, 'utf-8'));

// ── Tier remap ──
// Two-class exercises: T2 → T3 (two-class interaction is T3 in curriculum)
const TWO_CLASS_IDS = [218, 219, 220, 221, 223, 225, 226]; // DJ, Airport, Library, Taco, Barber, Restaurant, VHS
// RPG Full System: T5 → T4 (has starterCode with class stubs, not empty editor)
const RPG_FULL_ID = 230;
// National Parks: T4 → T3 (has function signatures, not T4 empty-editor format)
const PARKS_ID = 278;

// ── Category remap (align with new categories.json) ──
const CATEGORY_MAP = {
  // Scope exercises → js-fundamentals/variables
  273: ['js-fundamentals', 'variables'],
  274: ['js-fundamentals', 'variables'],
  // Context exercise → functions/advanced-functions
  275: ['functions', 'advanced-functions'],
  // Dataset exercises → functions/callback-methods
  276: ['functions', 'callback-methods'],
  277: ['functions', 'callback-methods'],
  278: ['functions', 'callback-methods'],
  // Object manipulation exercises → js-fundamentals/objects (not data-structures)
  266: ['js-fundamentals', 'objects'],
  267: ['js-fundamentals', 'objects'],
  268: ['js-fundamentals', 'objects'],
  269: ['js-fundamentals', 'objects'],
  270: ['js-fundamentals', 'objects'],
  271: ['js-fundamentals', 'objects'],
  272: ['js-fundamentals', 'objects'],
};

// ── Tag fixes (singular → plural) ──
const TAG_FIXES = {
  'class': 'classes',
  'object': 'objects',
  'array': 'arrays',
  'string': 'strings',
  'function': 'functions',
  'loop': 'loops',
};

// ── Base points by tier ──
const BASE_POINTS = { 1: 10, 2: 25, 3: 50, 4: 100, 5: 200 };

// ── Process exercises ──
let nextId = 535;
const exercises = [];

for (const ex of oldData.exercises) {
  // Re-tier
  let tier = ex.tier;
  if (TWO_CLASS_IDS.includes(ex.id)) tier = 3;
  if (ex.id === RPG_FULL_ID) tier = 4;
  if (ex.id === PARKS_ID) tier = 3;

  // Fix category
  const category = CATEGORY_MAP[ex.id] || ex.category;

  // Fix tags
  let tags = (ex.tags || []).map(t => TAG_FIXES[t] || t);
  tags = [...new Set(tags)]; // dedup

  // Trim hints to 2 (current standard)
  const hints = (ex.hints || []).slice(0, 2);

  // Ensure instructions is populated
  const instructions = (ex.instructions && ex.instructions.trim()) ? ex.instructions : ex.description;

  const migrated = {
    id: nextId++,
    title: ex.title,
    type: ex.type || 'js',
    tier,
    category,
    tags,
    description: ex.description,
    instructions,
    starterCode: ex.starterCode || '',
    solution: ex.solution || '',
    testRunner: ex.testRunner || '',
    testCases: ex.testCases || [],
    hints,
    resources: ex.resources || [],
    solutionGate: tier <= 2 ? 10 : tier === 3 ? 8 : 6,
    basePoints: BASE_POINTS[tier],
  };

  exercises.push(migrated);
}

// ── Build collection ──
const collection = {
  id: 'turing-foundations',
  name: 'Turing Foundations',
  description: 'Exercises sourced from Turing School repositories: Mythical Creatures, two-class and multi-class composition, scope, context, and dataset manipulation.',
  color: '#f59e0b',
  source: 'Turing School',
  attribution: 'Exercises covering mythical creatures, class composition, scope, context, and dataset manipulation. Sourced from [Turing School of Software & Design](https://github.com/turingschool-examples) public repositories and [jsFun](https://github.com/alexmfritz/jsFun).',
  exerciseIds: exercises.map(e => e.id),
  exercises,
};

// ── Report ──
console.log('\n=== Turing Foundations Migration Report ===\n');
console.log(`Exercises: ${exercises.length}`);
console.log(`ID range: ${exercises[0].id} - ${exercises[exercises.length - 1].id}`);

const tierCounts = {};
for (const ex of exercises) {
  tierCounts[ex.tier] = (tierCounts[ex.tier] || 0) + 1;
}
console.log('\nTier distribution:');
for (const [t, c] of Object.entries(tierCounts).sort()) {
  console.log(`  T${t}: ${c}`);
}

const catCounts = {};
for (const ex of exercises) {
  catCounts[ex.category[0]] = (catCounts[ex.category[0]] || 0) + 1;
}
console.log('\nCategory distribution:');
for (const [c, n] of Object.entries(catCounts).sort((a, b) => b[1] - a[1])) {
  console.log(`  ${c}: ${n}`);
}

// Check for missing fields
const issues = [];
for (const ex of exercises) {
  if (!ex.description) issues.push(`#${ex.id} missing description`);
  if (!ex.instructions) issues.push(`#${ex.id} missing instructions`);
  if (!ex.testRunner) issues.push(`#${ex.id} missing testRunner`);
  if (!ex.solution) issues.push(`#${ex.id} missing solution`);
  if (ex.hints.length < 2) issues.push(`#${ex.id} has ${ex.hints.length} hints (expected 2)`);
}
if (issues.length) {
  console.log('\nIssues:');
  for (const i of issues) console.log(`  ⚠ ${i}`);
} else {
  console.log('\n✓ All exercises pass validation');
}

// List tier changes
console.log('\nTier changes:');
for (let i = 0; i < oldData.exercises.length; i++) {
  const old = oldData.exercises[i];
  const cur = exercises[i];
  if (old.tier !== cur.tier) {
    console.log(`  ${old.title}: T${old.tier} → T${cur.tier}`);
  }
}

// ── Write ──
fs.writeFileSync(NEW_PATH, JSON.stringify(collection, null, 2) + '\n');
console.log(`\n✓ Written to ${NEW_PATH}`);
console.log(`  (Old file ${OLD_PATH} preserved — rename/delete manually)`);
