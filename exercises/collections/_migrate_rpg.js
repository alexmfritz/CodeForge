/**
 * Migration script: _rpg-questline.json → rpg-questline.json
 *
 * Changes:
 * 1. Renumber IDs starting at 735
 * 2. Trim hints from 3 → 2 (drop the third "answer-revealing" hint)
 * 3. Add solutionGate: 10, basePoints based on tier
 * 4. Add testCases: [] for JS exercises that lack it
 * 5. Add source/attribution metadata
 * 6. Update exerciseIds array
 */

const fs = require('fs');
const path = require('path');

const source = require('./_rpg-questline.json');
const START_ID = 735;

const BASE_POINTS = { 1: 10, 2: 25, 3: 50, 4: 100, 5: 200 };

const migrated = {
  id: 'rpg-questline',
  name: 'RPG Questline: Swords & Sorcery',
  description: source.description,
  color: '#dc2626',
  source: 'Original — CodeForge',
  attribution: 'Original exercises created for the CodeForge platform. RPG Questline takes students on a progressive journey from basic variables through full game engine architecture, using fantasy RPG theming to make concepts tangible and fun.',
  exerciseIds: [],
  exercises: [],
};

source.exercises.forEach((ex, i) => {
  const newId = START_ID + i;
  migrated.exerciseIds.push(newId);

  // Trim hints from 3 → 2 (keep first two, they're conceptual/structural)
  const hints = ex.hints ? ex.hints.slice(0, 2) : [];

  // Ensure testCases exists (CSS/HTML-CSS exercises already have them)
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

  // Include providedHtml for CSS exercises
  if (ex.providedHtml) {
    migExercise.providedHtml = ex.providedHtml;
  }

  migrated.exercises.push(migExercise);
});

const outPath = path.join(__dirname, 'rpg-questline.json');
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
  Array.isArray(e.testCases)
);
console.log(`All have solutionGate/basePoints/testCases: ${hasFields}`);
