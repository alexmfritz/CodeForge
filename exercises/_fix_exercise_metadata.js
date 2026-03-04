#!/usr/bin/env node
/**
 * Exercise Metadata Migration Script
 * Fixes instructions, categories, and tags across all exercises.
 *
 * Run:  node exercises/_fix_exercise_metadata.js
 * Dry:  node exercises/_fix_exercise_metadata.js --dry
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DRY = process.argv.includes('--dry');
const JSON_PATH = path.join(__dirname, 'collections', 'default-curriculum.json');

const data = JSON.parse(fs.readFileSync(JSON_PATH, 'utf-8'));
const exercises = data.exercises;

// ── Counters ──
let instructionsFixed = 0;
let categoriesRemapped = 0;
let tagsFixed = 0;

// ── 1. Fix instructions ──
for (const ex of exercises) {
  if (!ex.instructions || ex.instructions.trim() === '') {
    if (ex.description && ex.description.trim() !== '') {
      ex.instructions = ex.description;
      instructionsFixed++;
    }
  }
}

// ── 2. Remap categories ──
const CATEGORY_REMAP = {
  'js-fundamentals|functions': ['functions', 'basics'],
  'js-fundamentals|callback-methods': ['functions', 'callback-methods'],
  'js-fundamentals|error-handling': ['error-handling', 'fundamentals'],
  'js-fundamentals|applications': ['capstone', 'applications'],
};

for (const ex of exercises) {
  const key = `${ex.category[0]}|${ex.category[1]}`;
  if (CATEGORY_REMAP[key]) {
    ex.category = CATEGORY_REMAP[key];
    categoriesRemapped++;
  }
}

// ── 3. Fix tag inconsistencies ──
const TAG_FIXES = {
  'class': 'classes',
  'object': 'objects',
  'loop': 'loops',
  'string': 'strings',
  'function': 'functions',
};

// CSS exercises that legitimately use "class" tag (CSS selectors)
const CSS_CLASS_SKIP_IDS = [796, 798];

for (const ex of exercises) {
  if (!ex.tags || !Array.isArray(ex.tags)) continue;
  let changed = false;
  ex.tags = ex.tags.map((tag) => {
    if (TAG_FIXES[tag]) {
      // Skip CSS "class" exercises
      if (tag === 'class' && CSS_CLASS_SKIP_IDS.includes(ex.legacyId)) {
        return tag;
      }
      changed = true;
      return TAG_FIXES[tag];
    }
    return tag;
  });
  // Deduplicate tags (in case fix creates duplicates like ['classes', 'class'] → ['classes', 'classes'])
  ex.tags = [...new Set(ex.tags)];
  if (changed) tagsFixed++;
}

// ── Verification Report ──
console.log('\n=== Exercise Metadata Migration Report ===\n');
console.log(`Instructions fixed: ${instructionsFixed}`);
console.log(`Categories remapped: ${categoriesRemapped}`);
console.log(`Tags fixed: ${tagsFixed}`);
console.log(`Total exercises: ${exercises.length}`);

// Category distribution after fix
const catCounts = {};
for (const ex of exercises) {
  const c0 = ex.category[0];
  catCounts[c0] = (catCounts[c0] || 0) + 1;
}
console.log('\n--- Category Distribution (after fix) ---');
const sorted = Object.entries(catCounts).sort((a, b) => b[1] - a[1]);
for (const [cat, count] of sorted) {
  console.log(`  ${cat}: ${count}`);
}
console.log(`  TOTAL: ${sorted.reduce((s, [, c]) => s + c, 0)}`);

// Subcategory breakdown for each category
console.log('\n--- Subcategory Breakdown ---');
const subCounts = {};
for (const ex of exercises) {
  const key = `${ex.category[0]} > ${ex.category[1] || '(none)'}`;
  subCounts[key] = (subCounts[key] || 0) + 1;
}
const subSorted = Object.entries(subCounts).sort((a, b) => {
  const [aCat] = a[0].split(' > ');
  const [bCat] = b[0].split(' > ');
  if (aCat !== bCat) return aCat.localeCompare(bCat);
  return b[1] - a[1];
});
let lastCat = '';
for (const [key, count] of subSorted) {
  const [cat, sub] = key.split(' > ');
  if (cat !== lastCat) {
    console.log(`\n  ${cat}:`);
    lastCat = cat;
  }
  console.log(`    ${sub}: ${count}`);
}

// Check for exercises still missing instructions
const stillMissing = exercises.filter(
  (ex) => !ex.instructions || ex.instructions.trim() === '',
);
if (stillMissing.length > 0) {
  console.log(`\n⚠ Still missing instructions: ${stillMissing.length}`);
  for (const ex of stillMissing) {
    console.log(`  - ${ex.legacyId || '???'}: ${ex.title}`);
  }
} else {
  console.log('\n✓ All exercises have instructions');
}

// ── Write ──
if (!DRY) {
  fs.writeFileSync(JSON_PATH, JSON.stringify(data, null, 2) + '\n');
  console.log('\n✓ Written to', JSON_PATH);
} else {
  console.log('\n(dry run — no changes written)');
}
