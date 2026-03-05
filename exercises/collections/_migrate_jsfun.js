/**
 * Migration script: Integrate legacy JS exercises into default-curriculum.json
 * Only includes NOVEL (38) and COMPLEMENTARY (56) exercises — excludes REDUNDANT (81)
 * Sources: _uncollected.json (JS only) + _interview-classics.json
 */

const fs = require('fs');
const path = require('path');

const DIR = __dirname;
const START_ID = 836;

// ── Load sources ──────────────────────────────────────────────────────────────
const uncollected = JSON.parse(fs.readFileSync(path.join(DIR, '_uncollected.json'), 'utf8'));
const interviewClassics = JSON.parse(fs.readFileSync(path.join(DIR, '_interview-classics.json'), 'utf8'));
const defaultCurr = JSON.parse(fs.readFileSync(path.join(DIR, 'default-curriculum.json'), 'utf8'));

// ── Load all active collections to build title set ────────────────────────────
const activeFiles = [
  'default-curriculum.json', 'turing-foundations.json', 'exercism.json',
  'rithm-interview-prep.json', 'odin-project.json', 'rpg-questline.json'
];
const activeTitles = new Set();
for (const f of activeFiles) {
  const data = JSON.parse(fs.readFileSync(path.join(DIR, f), 'utf8'));
  const exercises = data.exercises || data;
  exercises.forEach(e => activeTitles.add(e.title.toLowerCase().trim()));
}

// ── Extract JS exercises from _uncollected.json ───────────────────────────────
const uncollectedJS = (uncollected.exercises || uncollected)
  .filter(e => e.type === 'js' || e.language === 'javascript')
  .filter(e => !activeTitles.has(e.title.toLowerCase().trim()));

// ── Extract exercises from _interview-classics.json ───────────────────────────
const interviewNew = (interviewClassics.exercises || interviewClassics)
  .filter(e => !activeTitles.has(e.title.toLowerCase().trim()));

// ── Merge and deduplicate (memoize appears in both — keep uncollected version) ──
const seenTitles = new Set();
const allCandidates = [];

for (const e of uncollectedJS) {
  const key = e.title.toLowerCase().trim();
  if (!seenTitles.has(key)) {
    seenTitles.add(key);
    allCandidates.push({ ...e, _source: '_uncollected.json' });
  }
}
for (const e of interviewNew) {
  const key = e.title.toLowerCase().trim();
  if (!seenTitles.has(key)) {
    seenTitles.add(key);
    allCandidates.push({ ...e, _source: '_interview-classics.json' });
  }
}

console.log(`Total candidates (deduped): ${allCandidates.length}`);

// ── Build default curriculum concept map ──────────────────────────────────────
const defaultExercises = (defaultCurr.exercises || defaultCurr)
  .filter(e => e.type === 'js' || e.language === 'javascript');

const conceptCounts = {};
const conceptTotalCounts = {};

for (const e of defaultExercises) {
  const cat = Array.isArray(e.category) ? e.category : [];
  const domain = (cat[0] || 'uncategorized').toLowerCase();
  const subdomain = (cat[1] || 'general').toLowerCase();
  const concept = `${domain}::${subdomain}`;
  const tierKey = `T${e.tier}::${concept}`;

  conceptCounts[tierKey] = (conceptCounts[tierKey] || 0) + 1;
  conceptTotalCounts[concept] = (conceptTotalCounts[concept] || 0) + 1;
}

// ── Normalize legacy categories to match default curriculum taxonomy ──────────
function normalizeConcept(category) {
  const cat = Array.isArray(category) ? category : [];
  let domain = (cat[0] || 'uncategorized').toLowerCase();
  let subdomain = (cat[1] || 'general').toLowerCase();

  if (domain === 'data-structures' && subdomain === 'arrays') {
    domain = 'js-fundamentals'; subdomain = 'arrays';
  } else if (domain === 'data-structures' && subdomain === 'strings') {
    domain = 'js-fundamentals'; subdomain = 'strings';
  } else if (domain === 'data-structures' && subdomain === 'objects') {
    domain = 'js-fundamentals'; subdomain = 'objects';
  } else if (domain === 'functions' && subdomain === 'higher-order') {
    domain = 'functions'; subdomain = 'advanced-functions';
  } else if (domain === 'functions' && subdomain === 'scope') {
    domain = 'functions'; subdomain = 'advanced-functions';
  } else if (domain === 'es6-plus' && (subdomain === 'destructuring' || subdomain === 'template-literals')) {
    domain = 'es6-plus'; subdomain = 'modern-syntax';
  } else if (domain === 'js-fundamentals' && subdomain === 'classes') {
    domain = 'js-fundamentals'; subdomain = 'classes';
  } else if (domain === 'functions') {
    domain = 'functions'; subdomain = subdomain || 'general';
  }

  return `${domain}::${subdomain}`;
}

// ── Classify each exercise ───────────────────────────────────────────────────
function classify(exercise) {
  const concept = normalizeConcept(exercise.category);
  const tierKey = `T${exercise.tier}::${concept}`;
  const tierCount = conceptCounts[tierKey] || 0;
  const totalCount = conceptTotalCounts[concept] || 0;

  if (totalCount === 0) return 'NOVEL';
  if (tierCount < 3) return 'COMPLEMENTARY';
  return 'REDUNDANT';
}

// ── Filter to only NOVEL + COMPLEMENTARY ─────────────────────────────────────
const included = [];
const excluded = [];

for (const e of allCandidates) {
  const cls = classify(e);
  if (cls === 'REDUNDANT') {
    excluded.push(e);
  } else {
    included.push({ ...e, _classification: cls });
  }
}

console.log(`\nClassification results:`);
console.log(`  NOVEL + COMPLEMENTARY (included): ${included.length}`);
console.log(`  REDUNDANT (excluded): ${excluded.length}`);

// ── Apply migration pipeline ─────────────────────────────────────────────────
const basePointsByTier = { 1: 10, 2: 25, 3: 50, 4: 100, 5: 200 };

const migrated = included.map(e => {
  const ex = { ...e };

  // Trim hints from 3 to 2
  if (ex.hints && ex.hints.length > 2) {
    ex.hints = ex.hints.slice(0, 2);
  }

  // Add solutionGate if missing
  if (!ex.solutionGate && ex.solutionGate !== 0) {
    ex.solutionGate = 10;
  }

  // Add basePoints by tier
  if (!ex.basePoints) {
    ex.basePoints = basePointsByTier[ex.tier] || 25;
  }

  // Ensure testCases exists for JS exercises
  if ((ex.type === 'js' || ex.language === 'javascript') && !ex.testCases) {
    ex.testCases = [];
  }

  // Clean up internal fields
  delete ex._source;
  delete ex._classification;

  return ex;
});

// ── Sort: by tier, then category domain, then original ID ────────────────────
migrated.sort((a, b) => {
  if (a.tier !== b.tier) return a.tier - b.tier;
  const catA = Array.isArray(a.category) ? a.category[0] : '';
  const catB = Array.isArray(b.category) ? b.category[0] : '';
  if (catA !== catB) return catA.localeCompare(catB);
  return a.id - b.id;
});

// ── Renumber IDs ─────────────────────────────────────────────────────────────
migrated.forEach((e, i) => {
  e.id = START_ID + i;
});

// ── Append to default-curriculum.json ────────────────────────────────────────
const updatedCurr = { ...defaultCurr };
const beforeCount = updatedCurr.exercises.length;
updatedCurr.exercises = [...updatedCurr.exercises, ...migrated];
const afterCount = updatedCurr.exercises.length;

const outPath = path.join(DIR, 'default-curriculum.json');
fs.writeFileSync(outPath, JSON.stringify(updatedCurr, null, 2));

// ── Summary ──────────────────────────────────────────────────────────────────
const tierCounts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
migrated.forEach(e => { tierCounts[e.tier] = (tierCounts[e.tier] || 0) + 1; });

const categories = {};
migrated.forEach(e => {
  const cat = Array.isArray(e.category) ? e.category.join(' > ') : 'uncategorized';
  categories[cat] = (categories[cat] || 0) + 1;
});

console.log(`\n${'='.repeat(72)}`);
console.log(`  JS LEGACY INTEGRATION INTO DEFAULT CURRICULUM — COMPLETE`);
console.log(`${'='.repeat(72)}`);
console.log(`  Exercises added: ${migrated.length}`);
console.log(`  Default curriculum: ${beforeCount} → ${afterCount}`);
console.log(`  ID range: ${START_ID}–${START_ID + migrated.length - 1}`);
console.log(`  Next available ID: ${START_ID + migrated.length}`);
console.log(`\n  Tier breakdown of new exercises:`);
Object.entries(tierCounts).filter(([,v]) => v > 0).forEach(([t, c]) => {
  console.log(`    T${t}: ${c}`);
});
console.log(`\n  Category distribution:`);
Object.entries(categories).sort((a, b) => b[1] - a[1]).forEach(([cat, count]) => {
  console.log(`    ${cat}: ${count}`);
});
console.log(`\n  Written to: ${outPath}`);
console.log(`${'='.repeat(72)}`);
