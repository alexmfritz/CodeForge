#!/usr/bin/env node
/**
 * Exercism Collection Migration
 * Reads _exercism.json, applies tier fixes, hint trims, starterCode fixes,
 * removes duplicates, reassigns IDs starting at 599, and writes exercism.json.
 *
 * Changes:
 *   - Remove 2 duplicates: Simple Linked List (492), Binary Search Tree (494)
 *   - Tier reassignments: 452,453,455 T1→T2; 475,484,486 T3→T2; 498 T4→T3
 *   - All T4 exercises: starterCode → '' (empty string)
 *   - T5 exercise (505): starterCode → ''
 *   - All exercises: trim hints from 3 → 2 (drop 3rd hint)
 *   - All exercises: fix solutionGate and basePoints to match tier
 *   - New IDs: 599-650 (52 exercises)
 *
 * Run: node exercises/_migrate_exercism.js
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SOURCE_PATH = path.join(__dirname, 'collections', '_exercism.json');
const OUTPUT_PATH = path.join(__dirname, 'collections', 'exercism.json');

const source = JSON.parse(fs.readFileSync(SOURCE_PATH, 'utf-8'));

// ── Config ──
const BASE_POINTS = { 1: 10, 2: 25, 3: 50, 4: 100, 5: 200 };
const SOLUTION_GATES = { 1: 10, 2: 10, 3: 8, 4: 6, 5: 6 };

// IDs to remove (duplicates with default curriculum)
const REMOVE_IDS = new Set([
  492, // Simple Linked List — duplicates default curriculum ID 1361
  494, // Binary Search Tree — duplicates default curriculum ID 1363
]);

// Tier reassignments: oldId → newTier
const TIER_OVERRIDES = {
  452: 2, // Two-Fer: T1→T2 (has function signature, not fill-in-the-blank)
  453: 2, // Resistor Color: T1→T2 (requires 2 functions + indexOf)
  455: 2, // Gigasecond: T1→T2 (has function signature)
  475: 2, // Scrabble Score: T3→T2 (just lookup + sum, too easy for T3)
  484: 2, // Strain: T3→T2 (basic loop reimplementation)
  486: 2, // Sum of Multiples: T3→T2 (loop + Set dedup, too easy for T3)
  498: 3, // Queen Attack: T4→T3 (simple math/diagonal check)
};

// Category fixes for exercises that need better categorization
const CATEGORY_OVERRIDES = {
  // T2 string/number exercises → js-fundamentals
  452: ['js-fundamentals', 'strings'],
  453: ['js-fundamentals', 'arrays'],
  454: ['js-fundamentals', 'arrays'],
  455: ['js-fundamentals', 'variables'],
  456: ['js-fundamentals', 'conditionals'],
  457: ['js-fundamentals', 'conditionals'],
  458: ['js-fundamentals', 'objects'],
  459: ['js-fundamentals', 'strings'],
  460: ['js-fundamentals', 'strings'],
  461: ['js-fundamentals', 'strings'],
  462: ['js-fundamentals', 'strings'],
  463: ['js-fundamentals', 'loops'],
  464: ['js-fundamentals', 'conditionals'],
  465: ['js-fundamentals', 'loops'],
  466: ['js-fundamentals', 'objects'],
  467: ['js-fundamentals', 'loops'],
  468: ['js-fundamentals', 'conditionals'],
  469: ['js-fundamentals', 'objects'],
  471: ['js-fundamentals', 'strings'],
  475: ['js-fundamentals', 'objects'], // demoted to T2
  484: ['functions', 'callback-methods'], // demoted to T2, but still about iteration
  486: ['js-fundamentals', 'loops'], // demoted to T2
  // T3 algorithm exercises
  470: ['algorithms', 'encoding'],
  472: ['algorithms', 'conversion'],
  473: ['data-structures', 'stacks'],
  474: ['algorithms', 'validation'],
  476: ['algorithms', 'text-processing'],
  477: ['algorithms', 'patterns'],
  478: ['algorithms', 'primes'],
  479: ['js-fundamentals', 'objects'],
  480: ['algorithms', 'bitwise'],
  481: ['algorithms', 'bitwise'],
  482: ['js-fundamentals', 'objects'],
  483: ['js-fundamentals', 'objects'],
  485: ['algorithms', 'math'],
  487: ['algorithms', 'conversion'],
  488: ['algorithms', 'encoding'],
  489: ['algorithms', 'encoding'],
  490: ['algorithms', 'patterns'],
  498: ['js-fundamentals', 'objects'], // demoted to T3
  // T4 exercises
  491: ['algorithms', 'state-machine'],
  493: ['data-structures', 'sets'],
  495: ['data-structures', 'buffer'],
  496: ['algorithms', 'encoding'],
  497: ['algorithms', 'searching'],
  499: ['algorithms', 'text-processing'],
  500: ['algorithms', 'validation'],
  501: ['js-fundamentals', 'objects'],
  502: ['algorithms', 'conversion'],
  503: ['algorithms', 'parsing'],
  504: ['algorithms', 'sliding-window'],
  505: ['algorithms', 'interpreters'],
};

// ── Process ──
let nextId = 599;
const exercises = [];
const changes = [];

for (const ex of source.exercises) {
  // Skip duplicates
  if (REMOVE_IDS.has(ex.id)) {
    changes.push(`REMOVED ${ex.id}: ${ex.title} (duplicate with default curriculum)`);
    continue;
  }

  const oldId = ex.id;
  const oldTier = ex.tier;
  const newId = nextId++;

  // Apply tier override
  const newTier = TIER_OVERRIDES[oldId] ?? oldTier;

  // Trim hints to 2 (drop 3rd)
  const hints = (ex.hints || []).slice(0, 2);

  // Fix starterCode for T4/T5
  let starterCode = ex.starterCode;
  if (newTier >= 4) {
    starterCode = '';
  }

  // Apply category override
  const category = CATEGORY_OVERRIDES[oldId] ?? ex.category;

  // Build exercise
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
  const scChange = (newTier >= 4 && ex.starterCode && ex.starterCode !== '') ? ' starterCode→empty' : '';
  const hintChange = (ex.hints || []).length > 2 ? ' hints:3→2' : '';
  if (tierChange || scChange || hintChange) {
    changes.push(`${oldId}→${newId}: ${ex.title}${tierChange}${scChange}${hintChange}`);
  }
}

// ── Build collection ──
const collection = {
  id: 'exercism',
  name: 'Exercism',
  description: '52 exercises adapted from the Exercism JavaScript track, an open-source platform with coding challenges across 70+ languages. Covers string manipulation, number theory, algorithm design, data structures, ciphers, bitwise operations, pattern generation, and language parsing. All exercises licensed under the MIT License.',
  color: '#c084fc',
  source: 'Exercism (exercism.org)',
  attribution: 'Adapted from the Exercism JavaScript track (github.com/exercism/javascript), licensed under the MIT License. Exercism is a free, open-source platform (exercism.org) offering coding practice across 70+ programming languages with mentored and self-directed learning tracks. Exercises were adapted to the CodeForge format with tier-appropriate scaffolding, 2-hint model, and adjusted difficulty ratings.',
  exerciseIds: exercises.map(e => e.id),
  exercises,
};

// ── Write ──
fs.writeFileSync(OUTPUT_PATH, JSON.stringify(collection, null, 2) + '\n');

// ── Report ──
console.log('\n=== Exercism Collection Migration Report ===\n');
console.log(`Source: ${source.exercises.length} exercises`);
console.log(`Removed: ${REMOVE_IDS.size} duplicates`);
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
  catCounts[ex.category[0]] = (catCounts[ex.category[0]] || 0) + 1;
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
