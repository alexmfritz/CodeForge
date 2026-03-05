/**
 * Migration script: Combines CSS exercises from _uncollected.json + _css-modern-toolkit.json
 * into a single css-toolkit.json collection.
 *
 * Changes:
 * 1. Pull 19 CSS/HTML-CSS exercises from _uncollected.json (fundamentals, layout, components)
 * 2. Pull all 40 exercises from _css-modern-toolkit.json (modern CSS features)
 * 3. Order by tier then by topic progression
 * 4. Renumber IDs starting at 780
 * 5. Trim hints from 3 → 2
 * 6. Add solutionGate: 10, basePoints by tier
 * 7. Ensure all have testCases array
 * 8. Normalize categories for consistency
 */

const fs = require('fs');
const path = require('path');

const uncollected = require('./_uncollected.json');
const toolkit = require('./_css-modern-toolkit.json');

const START_ID = 780;
const BASE_POINTS = { 1: 10, 2: 25, 3: 50, 4: 100, 5: 200 };

// Extract CSS exercises from _uncollected
const uncollectedCSS = uncollected.exercises.filter(
  e => e.type === 'css' || e.type === 'html-css'
);

// IDs to EXCLUDE — overlap with default curriculum T1:
// #113 "Color and Font Size" — default has 5 T1 selectors exercises
// #114 "Background and Padding" — default has 6 T1 box-model exercises
// #514 "Define a Custom Property" — exact title duplicate of default #81
const EXCLUDE_IDS = new Set([113, 114, 514]);

// Combine both sources, filtering out overlaps
const allExercises = [...uncollectedCSS, ...toolkit.exercises].filter(
  e => !EXCLUDE_IDS.has(e.id)
);

// Sort: by tier first, then by a topic ordering for nice progression
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

allExercises.sort((a, b) => {
  if (a.tier !== b.tier) return a.tier - b.tier;
  return topicRank(a.category) - topicRank(b.category);
});

// Build the migrated collection
const migrated = {
  id: 'css-toolkit',
  name: 'CSS Toolkit',
  description: '56 exercises covering the full CSS spectrum — from custom properties and calc() through flexbox, grid, modern selectors like :has(), container queries, and CSS nesting. Build real components: pricing cards, dashboards, image galleries, and sticky headers.',
  color: '#06b6d4',
  source: 'Mixed — CodeForge Original + CSS Modern Toolkit',
  attribution: 'Combines original CodeForge CSS exercises covering fundamentals, layout, and component design with the CSS Modern Toolkit collection focused on contemporary CSS features (custom properties, calc(), container queries, nesting). All exercises adapted to the CodeForge 2-hint format.',
  exerciseIds: [],
  exercises: [],
};

allExercises.forEach((ex, i) => {
  const newId = START_ID + i;
  migrated.exerciseIds.push(newId);

  const hints = ex.hints ? ex.hints.slice(0, 2) : [];
  const testCases = ex.testCases || [];

  const migExercise = {
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

  // Include providedHtml for CSS exercises that have it
  if (ex.providedHtml) {
    migExercise.providedHtml = ex.providedHtml;
  }

  migrated.exercises.push(migExercise);
});

const outPath = path.join(__dirname, 'css-toolkit.json');
fs.writeFileSync(outPath, JSON.stringify(migrated, null, 2) + '\n');

console.log(`Migrated ${migrated.exercises.length} exercises`);
console.log(`ID range: ${START_ID}–${START_ID + migrated.exercises.length - 1}`);
console.log(`Next available ID: ${START_ID + migrated.exercises.length}`);

// Verify
const tiers = {};
migrated.exercises.forEach(e => { tiers[e.tier] = (tiers[e.tier] || 0) + 1; });
console.log('\nTier distribution:');
Object.entries(tiers).sort((a,b) => a[0]-b[0]).forEach(([t,c]) => console.log(`  T${t}: ${c}`));

const types = {};
migrated.exercises.forEach(e => { types[e.type] = (types[e.type] || 0) + 1; });
console.log('\nType distribution:');
Object.entries(types).forEach(([t,c]) => console.log(`  ${t}: ${c}`));

const hintsOk = migrated.exercises.every(e => e.hints.length === 2);
console.log(`\nAll hints trimmed to 2: ${hintsOk}`);

const hasFields = migrated.exercises.every(e =>
  e.solutionGate === 10 &&
  e.basePoints > 0 &&
  Array.isArray(e.testCases) &&
  e.testCases.length > 0
);
console.log(`All have solutionGate/basePoints/testCases: ${hasFields}`);

// Show exercise order
console.log('\n=== EXERCISE ORDER ===');
migrated.exercises.forEach(e => {
  console.log(`  #${e.id} T${e.tier} ${e.type.padEnd(8)} | ${e.title.padEnd(48)} | ${e.category.join('>')}`);
});
