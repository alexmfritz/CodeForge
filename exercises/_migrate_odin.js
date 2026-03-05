#!/usr/bin/env node
/**
 * The Odin Project Collection Migration
 * Reads _odin-project.json, applies tier fixes, hint trims, starterCode fixes,
 * category remaps, title fix, reassigns IDs starting at 706, and writes odin-project.json.
 *
 * Changes:
 *   - Title fix: 554 "CSS Methods" → "Class Selector Basics"
 *   - All T4 exercises (513, 573, 574): starterCode → '' (empty string)
 *   - All exercises: trim hints from 3 → 2 (drop 3rd hint)
 *   - All exercises: add solutionGate and basePoints per tier
 *   - Category remaps: data-structures → js-fundamentals for basic JS exercises,
 *     es6-plus/modules → js-fundamentals/functions, css/layout → css/grid
 *   - New IDs: 706-734 (29 exercises)
 *
 * Run: node exercises/_migrate_odin.js
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SOURCE_PATH = path.join(__dirname, 'collections', '_odin-project.json');
const OUTPUT_PATH = path.join(__dirname, 'collections', 'odin-project.json');

const source = JSON.parse(fs.readFileSync(SOURCE_PATH, 'utf-8'));

// ── Config ──
const BASE_POINTS = { 1: 10, 2: 25, 3: 50, 4: 100, 5: 200 };
const SOLUTION_GATES = { 1: 10, 2: 10, 3: 8, 4: 6, 5: 6 };

// Title fixes
const TITLE_OVERRIDES = {
  554: 'Class Selector Basics', // was "CSS Methods" — misleading
};

// Category fixes
const CATEGORY_OVERRIDES = {
  // JS exercises: data-structures → js-fundamentals
  506: ['js-fundamentals', 'arrays'],    // Remove From Array — basic filter
  508: ['js-fundamentals', 'functions'], // Temperature Conversion — was es6-plus/modules
  509: ['js-fundamentals', 'objects'],   // Get the Titles — basic map
  510: ['js-fundamentals', 'objects'],   // Find the Oldest — basic reduce
  // CSS grid exercises: layout → grid
  569: ['css', 'grid'],                  // Grid Holy Grail
  570: ['css', 'grid'],                  // Responsive Grid Layout
  571: ['css', 'grid'],                  // Grid with Auto-fit Cards
};

// ── Process ──
let nextId = 706;
const exercises = [];
const changes = [];

for (const ex of source.exercises) {
  const oldId = ex.id;
  const newId = nextId++;

  // Apply title override
  const title = TITLE_OVERRIDES[oldId] ?? ex.title;

  // Trim hints to 2 (drop 3rd)
  const hints = (ex.hints || []).slice(0, 2);

  // Fix starterCode for T4/T5 (both JS and CSS)
  let starterCode = ex.starterCode;
  if (ex.tier >= 4) {
    starterCode = '';
  }

  // Apply category override
  const category = CATEGORY_OVERRIDES[oldId] ?? ex.category;

  // Build exercise
  const migrated = {
    id: newId,
    title,
    type: ex.type || 'js',
    tier: ex.tier,
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
    solutionGate: SOLUTION_GATES[ex.tier],
    basePoints: BASE_POINTS[ex.tier],
  };

  // Include providedHtml for CSS exercises
  if (ex.providedHtml) {
    migrated.providedHtml = ex.providedHtml;
  }

  exercises.push(migrated);

  // Track changes
  const titleChange = TITLE_OVERRIDES[oldId] ? ` title→"${title}"` : '';
  const scChange = (ex.tier >= 4 && ex.starterCode && ex.starterCode !== '') ? ' starterCode→empty' : '';
  const catChange = CATEGORY_OVERRIDES[oldId] ? ` cat→${category[0]}/${category[1]}` : '';
  const hintChange = (ex.hints || []).length > 2 ? ' hints:3→2' : '';
  if (titleChange || scChange || catChange || hintChange) {
    changes.push(`${oldId}→${newId}: ${title}${titleChange}${scChange}${catChange}${hintChange}`);
  }
}

// ── Build collection ──
const collection = {
  id: 'odin-project',
  name: 'The Odin Project',
  description: '29 exercises adapted from The Odin Project, a free open-source web development curriculum. Includes 8 JavaScript exercises covering arrays, objects, recursion, and algorithm design, plus 21 CSS exercises covering selectors, box model, flexbox layouts, CSS Grid, and animations. All exercises licensed under the MIT License.',
  color: '#f59e0b',
  source: 'The Odin Project (theodinproject.com)',
  attribution: 'Adapted from The Odin Project JavaScript exercises (github.com/TheOdinProject/javascript-exercises) and CSS exercises (github.com/TheOdinProject/css-exercises), both licensed under the MIT License. The Odin Project is a free, open-source web development curriculum (theodinproject.com) covering HTML, CSS, JavaScript, and full-stack development. Exercises were adapted to the CodeForge format with tier-appropriate scaffolding, 2-hint model, and adjusted difficulty ratings.',
  exerciseIds: exercises.map(e => e.id),
  exercises,
};

// ── Write ──
fs.writeFileSync(OUTPUT_PATH, JSON.stringify(collection, null, 2) + '\n');

// ── Report ──
console.log('\n=== The Odin Project Collection Migration Report ===\n');
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

const typeCounts = {};
for (const ex of exercises) {
  typeCounts[ex.type] = (typeCounts[ex.type] || 0) + 1;
}
console.log('\nType distribution:');
for (const [t, n] of Object.entries(typeCounts).sort((a, b) => b[1] - a[1])) {
  console.log(`  ${t}: ${n}`);
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
