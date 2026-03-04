#!/usr/bin/env node
/**
 * Rithm Interview Prep Collection Migration
 * Reads _rithm-interview-prep.json, applies tier fixes, hint trims,
 * category fixes, removes legacy fields, reassigns IDs starting at 651,
 * and writes rithm-interview-prep.json.
 *
 * Changes:
 *   - Tier reassignments: 21,22 T1→T2; 26,39,41 T3→T2; 42,50,61,65 T4→T3
 *   - All exercises: trim hints from 3 → 2 (drop 3rd hint)
 *   - All exercises: remove legacy `hint` field
 *   - All exercises: add solutionGate and basePoints per tier
 *   - All exercises: remap categories from data-structures → js-fundamentals
 *   - New IDs: 651-695 (45 exercises)
 *
 * Run: node exercises/_migrate_rithm.js
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SOURCE_PATH = path.join(__dirname, 'collections', '_rithm-interview-prep.json');
const OUTPUT_PATH = path.join(__dirname, 'collections', 'rithm-interview-prep.json');

const source = JSON.parse(fs.readFileSync(SOURCE_PATH, 'utf-8'));

// ── Config ──
const BASE_POINTS = { 1: 10, 2: 25, 3: 50, 4: 100, 5: 200 };
const SOLUTION_GATES = { 1: 10, 2: 10, 3: 8, 4: 6, 5: 6 };

// Tier reassignments: oldId → newTier
const TIER_OVERRIDES = {
  21: 2, // Append to String: T1→T2 (has function signature, not fill-in-the-blank)
  22: 2, // Prepend to String: T1→T2 (has function signature, not fill-in-the-blank)
  26: 2, // stringLastIndexOf: T3→T2 (same loop pattern as stringIndexOf #25, both T2)
  39: 2, // entries: T3→T2 (same pattern as keys #36 and values #37, both T2)
  41: 2, // pluck: T3→T2 (simple loop + push, same complexity as T2 exercises)
  42: 3, // twoHighest: T4→T3 (has function signature; T4 = no starterCode)
  50: 3, // isAlt: T4→T3 (has function signature; T4 = no starterCode)
  61: 3, // reverseValues: T4→T3 (has function signature; T4 = no starterCode)
  65: 3, // skipVowels: T4→T3 (has function signature; T4 = no starterCode)
};

// Category fixes: all exercises remapped from data-structures → js-fundamentals
// (these are manual implementations of basic operations, not data structure design)
const CATEGORY_OVERRIDES = {
  // String exercises → js-fundamentals/strings
  21: ['js-fundamentals', 'strings'],
  22: ['js-fundamentals', 'strings'],
  23: ['js-fundamentals', 'strings'],
  24: ['js-fundamentals', 'strings'],
  25: ['js-fundamentals', 'strings'],
  26: ['js-fundamentals', 'strings'],
  27: ['js-fundamentals', 'strings'],
  28: ['js-fundamentals', 'strings'],
  46: ['js-fundamentals', 'strings'],
  50: ['js-fundamentals', 'strings'],
  54: ['js-fundamentals', 'strings'],
  65: ['js-fundamentals', 'strings'],
  // Array exercises → js-fundamentals/arrays
  29: ['js-fundamentals', 'arrays'],
  30: ['js-fundamentals', 'arrays'],
  31: ['js-fundamentals', 'arrays'],
  32: ['js-fundamentals', 'arrays'],
  33: ['js-fundamentals', 'arrays'],
  34: ['js-fundamentals', 'arrays'],
  35: ['js-fundamentals', 'arrays'],
  38: ['js-fundamentals', 'arrays'],
  41: ['js-fundamentals', 'arrays'],
  42: ['js-fundamentals', 'arrays'],
  45: ['js-fundamentals', 'arrays'],
  47: ['js-fundamentals', 'arrays'],
  48: ['js-fundamentals', 'arrays'],
  49: ['js-fundamentals', 'arrays'],
  52: ['js-fundamentals', 'arrays'],
  56: ['js-fundamentals', 'arrays'],
  57: ['js-fundamentals', 'arrays'],
  58: ['js-fundamentals', 'arrays'],
  59: ['js-fundamentals', 'arrays'],
  60: ['js-fundamentals', 'arrays'],
  61: ['js-fundamentals', 'arrays'],
  62: ['js-fundamentals', 'arrays'],
  64: ['js-fundamentals', 'arrays'],
  // Object exercises → js-fundamentals/objects
  36: ['js-fundamentals', 'objects'],
  37: ['js-fundamentals', 'objects'],
  39: ['js-fundamentals', 'objects'],
  43: ['js-fundamentals', 'objects'],
  44: ['js-fundamentals', 'objects'],
  51: ['js-fundamentals', 'objects'],
  53: ['js-fundamentals', 'objects'],
  55: ['js-fundamentals', 'objects'],
  63: ['js-fundamentals', 'objects'],
  // Loop exercise — already correct
  // 40: ['js-fundamentals', 'loops'],
};

// ── Process ──
let nextId = 651;
const exercises = [];
const changes = [];

for (const ex of source.exercises) {
  const oldId = ex.id;
  const oldTier = ex.tier;
  const newId = nextId++;

  // Apply tier override
  const newTier = TIER_OVERRIDES[oldId] ?? oldTier;

  // Trim hints to 2 (drop 3rd)
  const hints = (ex.hints || []).slice(0, 2);

  // StarterCode stays as-is (all Rithm exercises have function signatures,
  // and no exercises remain at T4 after tier fixes)
  const starterCode = ex.starterCode;

  // Apply category override
  const category = CATEGORY_OVERRIDES[oldId] ?? ex.category;

  // Build exercise (omit legacy `hint` field)
  const migrated = {
    id: newId,
    title: ex.title,
    type: ex.type || 'js',
    tier: newTier,
    category,
    tags: ex.tags || [],
    description: ex.description,
    instructions: ex.instructions || ex.description,
    starterCode,
    solution: ex.solution,
    testRunner: ex.testRunner,
    testCases: ex.testCases || [],
    hints,
    resources: ex.resources || [],
    solutionGate: SOLUTION_GATES[newTier],
    basePoints: BASE_POINTS[newTier],
  };

  exercises.push(migrated);

  // Track changes
  const tierChange = newTier !== oldTier ? ` T${oldTier}→T${newTier}` : '';
  const catChange = CATEGORY_OVERRIDES[oldId] ? ` cat→${category[0]}/${category[1]}` : '';
  const hintChange = (ex.hints || []).length > 2 ? ' hints:3→2' : '';
  const hintFieldRemoved = ex.hint ? ' hint→removed' : '';
  if (tierChange || catChange || hintChange || hintFieldRemoved) {
    changes.push(`${oldId}→${newId}: ${ex.title}${tierChange}${catChange}${hintChange}${hintFieldRemoved}`);
  }
}

// ── Build collection ──
const collection = {
  id: 'rithm-interview-prep',
  name: 'Rithm Interview Prep',
  description: '45 interview-style exercises from Rithm School focused on reimplementing built-in JavaScript methods without using them. Covers string manipulation (charAt, indexOf, repeat, slice), array operations (includes, indexOf, min, max, slice), object traversal (keys, values, entries), and applied problem-solving with loops, conditionals, and manual iteration. Every exercise requires building functionality from scratch using only basic language features — no array iterator methods allowed.',
  color: '#f97316',
  source: 'Rithm School (rithmschool.com)',
  attribution: 'Adapted from Rithm School interview prep practice repositories (github.com/rithmschool/rithm-interview-prep-practice, github.com/rithmschool/rithm-interview-prep-practice-part-2). Rithm School (rithmschool.com) was a full-stack web development bootcamp based in San Francisco. No explicit license was declared on the source repositories. Exercises were adapted to the CodeForge format with tier-appropriate scaffolding, 2-hint model, and adjusted difficulty ratings.',
  exerciseIds: exercises.map(e => e.id),
  exercises,
};

// ── Write ──
fs.writeFileSync(OUTPUT_PATH, JSON.stringify(collection, null, 2) + '\n');

// ── Report ──
console.log('\n=== Rithm Interview Prep Collection Migration Report ===\n');
console.log(`Source: ${source.exercises.length} exercises`);
console.log(`Output: ${exercises.length} exercises (IDs ${exercises[0].id}-${exercises[exercises.length - 1].id})`);

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
  const key = `${ex.category[0]}/${ex.category[1]}`;
  catCounts[key] = (catCounts[key] || 0) + 1;
}
console.log('\nCategory distribution:');
for (const [c, n] of Object.entries(catCounts).sort((a, b) => b[1] - a[1])) {
  console.log(`  ${c}: ${n}`);
}

console.log('\nChanges applied:');
for (const change of changes) {
  console.log(`  ${change}`);
}

console.log(`\n✓ Written to ${OUTPUT_PATH}`);
