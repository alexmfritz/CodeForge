/**
 * Integration script: Adds CSS exercises from _uncollected.json + _css-modern-toolkit.json
 * directly into default-curriculum.json.
 *
 * Steps:
 * 1. Pull CSS/HTML-CSS exercises from both legacy files
 * 2. Remove duplicates that overlap with existing default curriculum
 * 3. Trim hints from 3 → 2, add solutionGate/basePoints
 * 4. Assign new IDs starting after current max (705), continuing from next available (836 — after RPG 735-779 and leaving room)
 * 5. Append to default-curriculum.json exercises array and exerciseIds
 * 6. Write updated default-curriculum.json
 */

const fs = require('fs');
const path = require('path');

const defaultCurr = require('./default-curriculum.json');
const uncollected = require('./_uncollected.json');
const toolkit = require('./_css-modern-toolkit.json');

const BASE_POINTS = { 1: 10, 2: 25, 3: 50, 4: 100, 5: 200 };

// Current default curriculum CSS titles (lowercase for comparison)
const existingTitles = new Set(
  defaultCurr.exercises
    .filter(e => e.type === 'css' || e.type === 'html-css')
    .map(e => e.title.toLowerCase())
);

console.log('Existing default CSS titles:', existingTitles.size);

// Extract CSS exercises from _uncollected
const uncollectedCSS = uncollected.exercises.filter(
  e => e.type === 'css' || e.type === 'html-css'
);

// Combine both sources
const candidates = [...uncollectedCSS, ...toolkit.exercises];
console.log('Total candidates:', candidates.length);

// Remove exact title duplicates
const filtered = candidates.filter(e => {
  const isDupe = existingTitles.has(e.title.toLowerCase());
  if (isDupe) console.log('  DUPLICATE REMOVED: "' + e.title + '"');
  return !isDupe;
});

// Also remove T1 exercises that teach concepts already well-covered in T1 default curriculum:
// #113 "Color and Font Size" — default has 5 T1 selectors + 5 colors exercises
// #114 "Background and Padding" — default has 6 T1 box-model exercises
const REMOVE_IDS = new Set([113, 114]);
const final = filtered.filter(e => {
  if (REMOVE_IDS.has(e.id)) {
    console.log('  REDUNDANT T1 REMOVED: #' + e.id + ' "' + e.title + '"');
    return false;
  }
  return true;
});

console.log('After dedup:', final.length, 'exercises to add');

// Sort by tier, then by topic progression
const topicOrder = [
  'selectors', 'box-model', 'typography', 'positioning',
  'flexbox', 'layout', 'transitions', 'custom-properties',
  'functions', 'modern-selectors', 'visual',
  'container-queries', 'nesting', 'forms', 'structure'
];

function topicRank(category) {
  const sub = category[1] || '';
  const idx = topicOrder.indexOf(sub);
  return idx >= 0 ? idx : 99;
}

final.sort((a, b) => {
  if (a.tier !== b.tier) return a.tier - b.tier;
  return topicRank(a.category) - topicRank(b.category);
});

// Assign new IDs starting at 836 (after RPG 735-779, with buffer)
// Actually, let's use the next available: 780 is taken by css-toolkit (now deleted)
// RPG ends at 779, so next available is 780
const START_ID = 780;
let nextId = START_ID;

const newExercises = final.map(ex => {
  const newId = nextId++;
  const hints = ex.hints ? ex.hints.slice(0, 2) : [];
  const testCases = ex.testCases || [];

  const migrated = {
    id: newId,
    title: ex.title,
    type: ex.type,
    tier: ex.tier,
    category: ex.category,
    tags: ex.tags,
    description: ex.description,
    instructions: ex.instructions,
    starterCode: ex.starterCode,
    solution: ex.solution,
    testRunner: ex.testRunner,
    testCases: testCases,
    hints: hints,
    resources: ex.resources,
    solutionGate: 10,
    basePoints: BASE_POINTS[ex.tier] || 25,
  };

  if (ex.providedHtml) {
    migrated.providedHtml = ex.providedHtml;
  }

  return migrated;
});

// Append to default curriculum
const updatedCurr = { ...defaultCurr };
updatedCurr.exercises = [...defaultCurr.exercises, ...newExercises];
updatedCurr.exerciseIds = updatedCurr.exercises.map(e => e.id);

const outPath = path.join(__dirname, 'default-curriculum.json');
fs.writeFileSync(outPath, JSON.stringify(updatedCurr, null, 2) + '\n');

console.log('\n=== RESULTS ===');
console.log('Added ' + newExercises.length + ' CSS exercises to default curriculum');
console.log('ID range: ' + START_ID + '–' + (nextId - 1));
console.log('Next available ID: ' + nextId);
console.log('Total default curriculum exercises: ' + updatedCurr.exercises.length);

// Tier breakdown of new exercises
const tiers = {};
newExercises.forEach(e => { tiers[e.tier] = (tiers[e.tier] || 0) + 1; });
console.log('\nNew exercise tier distribution:');
Object.entries(tiers).sort((a,b) => a[0]-b[0]).forEach(([t,c]) => console.log('  T' + t + ': ' + c));

// Type breakdown
const types = {};
newExercises.forEach(e => { types[e.type] = (types[e.type] || 0) + 1; });
console.log('\nNew exercise type distribution:');
Object.entries(types).forEach(([t,c]) => console.log('  ' + t + ': ' + c));

// Full default curriculum tier breakdown
const allTiers = {};
updatedCurr.exercises.forEach(e => { allTiers[e.tier] = (allTiers[e.tier] || 0) + 1; });
console.log('\nTotal default curriculum by tier:');
Object.entries(allTiers).sort((a,b) => a[0]-b[0]).forEach(([t,c]) => console.log('  T' + t + ': ' + c));

// Verify hints
const hintsOk = newExercises.every(e => e.hints.length === 2);
console.log('\nAll new exercises have 2 hints: ' + hintsOk);

// Show exercise list
console.log('\n=== NEW EXERCISES ADDED ===');
newExercises.forEach(e => {
  console.log('  #' + e.id + ' T' + e.tier + ' ' + e.type.padEnd(8) + ' | ' + e.title.padEnd(48) + ' | ' + e.category.join('>'));
});
