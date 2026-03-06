/**
 * Generates the D&D theme exercises for the Pop Culture APIs collection.
 * Run: node exercises/collections/_generate_dnd.js
 * Reads existing pop-culture-apis.json and appends D&D exercises.
 *
 * 3 datasets: characters (10), spells (12), equipment (12)
 * Triple cross-reference: character.spellIds[] → spells, character.equipmentIds[] → equipment
 * Most complex theme in the collection.
 */

const fs = require('fs');
const path = require('path');

// ── Character Dataset (10 characters, punny parody names) ───────────────────

const CHARACTERS = [
  {
    id: 1,
    name: "Randalf the Beige",
    race: "human",
    class: "wizard",
    level: 15,
    alignment: "neutral good",
    hp: 78,
    ac: 15,
    stats: { strength: 8, dexterity: 12, constitution: 13, intelligence: 20, wisdom: 16, charisma: 11 },
    spellIds: [1, 2, 5, 9, 10, 11],
    equipmentIds: [4, 9, 12],
    background: "sage",
    isAlive: true,
    gold: 3200,
    languages: ["Common", "Elvish", "Dwarvish", "Draconic"]
  },
  {
    id: 2,
    name: "Drizzy Do'Urden",
    race: "drow",
    class: "ranger",
    level: 14,
    alignment: "chaotic good",
    hp: 105,
    ac: 17,
    stats: { strength: 16, dexterity: 20, constitution: 14, intelligence: 13, wisdom: 15, charisma: 14 },
    spellIds: [3, 7, 11],
    equipmentIds: [1, 6, 8],
    background: "outlander",
    isAlive: true,
    gold: 1850,
    languages: ["Common", "Elvish", "Undercommon"]
  },
  {
    id: 3,
    name: "Bruise-a-nor Battlehammer",
    race: "dwarf",
    class: "fighter",
    level: 12,
    alignment: "lawful good",
    hp: 136,
    ac: 20,
    stats: { strength: 20, dexterity: 10, constitution: 18, intelligence: 10, wisdom: 13, charisma: 12 },
    spellIds: [],
    equipmentIds: [1, 3, 6],
    background: "folk hero",
    isAlive: true,
    gold: 2400,
    languages: ["Common", "Dwarvish"]
  },
  {
    id: 4,
    name: "Tasha Yawn",
    race: "human",
    class: "warlock",
    level: 13,
    alignment: "chaotic neutral",
    hp: 85,
    ac: 14,
    stats: { strength: 10, dexterity: 14, constitution: 13, intelligence: 16, wisdom: 12, charisma: 20 },
    spellIds: [8, 10, 12],
    equipmentIds: [5, 9, 12],
    background: "charlatan",
    isAlive: true,
    gold: 5100,
    languages: ["Common", "Infernal", "Abyssal"]
  },
  {
    id: 5,
    name: "Mince & Boo",
    race: "human",
    class: "ranger",
    level: 11,
    alignment: "chaotic good",
    hp: 98,
    ac: 16,
    stats: { strength: 18, dexterity: 14, constitution: 16, intelligence: 8, wisdom: 13, charisma: 10 },
    spellIds: [3, 7],
    equipmentIds: [1, 6, 7],
    background: "soldier",
    isAlive: true,
    gold: 650,
    languages: ["Common", "Rashemi"]
  },
  {
    id: 6,
    name: "Elm-in-stir Aumar",
    race: "human",
    class: "sorcerer",
    level: 18,
    alignment: "chaotic good",
    hp: 90,
    ac: 16,
    stats: { strength: 10, dexterity: 14, constitution: 14, intelligence: 20, wisdom: 18, charisma: 18 },
    spellIds: [1, 2, 5, 6, 9, 10, 11, 12],
    equipmentIds: [4, 5, 12],
    background: "sage",
    isAlive: true,
    gold: 12000,
    languages: ["Common", "Elvish", "Draconic", "Celestial", "Sylvan"]
  },
  {
    id: 7,
    name: "Count Strand",
    race: "vampire",
    class: "paladin",
    level: 17,
    alignment: "lawful evil",
    hp: 144,
    ac: 19,
    stats: { strength: 18, dexterity: 16, constitution: 18, intelligence: 17, wisdom: 14, charisma: 20 },
    spellIds: [4, 6],
    equipmentIds: [1, 3, 10],
    background: "noble",
    isAlive: false,
    gold: 45000,
    languages: ["Common", "Elvish", "Dwarvish", "Infernal", "Abyssal"]
  },
  {
    id: 8,
    name: "Jester Lav-a-door",
    race: "tiefling",
    class: "cleric",
    level: 10,
    alignment: "chaotic good",
    hp: 72,
    ac: 18,
    stats: { strength: 10, dexterity: 12, constitution: 14, intelligence: 12, wisdom: 18, charisma: 16 },
    spellIds: [3, 7, 11],
    equipmentIds: [2, 6, 11],
    background: "entertainer",
    isAlive: true,
    gold: 920,
    languages: ["Common", "Infernal"]
  },
  {
    id: 9,
    name: "Fjord Tough",
    race: "half-orc",
    class: "warlock",
    level: 10,
    alignment: "neutral good",
    hp: 88,
    ac: 17,
    stats: { strength: 16, dexterity: 12, constitution: 14, intelligence: 11, wisdom: 10, charisma: 18 },
    spellIds: [8, 10],
    equipmentIds: [1, 3, 6],
    background: "sailor",
    isAlive: true,
    gold: 780,
    languages: ["Common", "Orc"]
  },
  {
    id: 10,
    name: "Boblin the Goblin",
    race: "goblin",
    class: "rogue",
    level: 5,
    alignment: "neutral good",
    hp: 33,
    ac: 15,
    stats: { strength: 8, dexterity: 18, constitution: 12, intelligence: 14, wisdom: 10, charisma: 13 },
    spellIds: [],
    equipmentIds: [2, 8, 12],
    background: "urchin",
    isAlive: true,
    gold: 250,
    languages: ["Common", "Goblin"]
  }
];

// ── Spell Dataset (12 spells, punny parody names) ───────────────────────────

const SPELLS = [
  {
    id: 1,
    name: "Furball",
    level: 3,
    school: "evocation",
    castingTime: "1 action",
    range: 150,
    duration: "instantaneous",
    damage: "8d6 fire",
    components: { verbal: true, somatic: true, material: true, materialDesc: "a tiny ball of cat fur" },
    classes: ["wizard", "sorcerer"],
    isConcentration: false,
    isRitual: false
  },
  {
    id: 2,
    name: "Magic Missal",
    level: 1,
    school: "evocation",
    castingTime: "1 action",
    range: 120,
    duration: "instantaneous",
    damage: "3d4+3 force",
    components: { verbal: true, somatic: true, material: false, materialDesc: "" },
    classes: ["wizard", "sorcerer"],
    isConcentration: false,
    isRitual: false
  },
  {
    id: 3,
    name: "Cure Wands",
    level: 1,
    school: "evocation",
    castingTime: "1 action",
    range: 0,
    duration: "instantaneous",
    damage: "",
    components: { verbal: true, somatic: true, material: false, materialDesc: "" },
    classes: ["cleric", "paladin", "ranger"],
    isConcentration: false,
    isRitual: false
  },
  {
    id: 4,
    name: "Sheld",
    level: 1,
    school: "abjuration",
    castingTime: "1 reaction",
    range: 0,
    duration: "1 round",
    damage: "",
    components: { verbal: true, somatic: true, material: false, materialDesc: "" },
    classes: ["wizard", "sorcerer"],
    isConcentration: false,
    isRitual: false
  },
  {
    id: 5,
    name: "Frightening Bolt",
    level: 3,
    school: "evocation",
    castingTime: "1 action",
    range: 100,
    duration: "instantaneous",
    damage: "8d6 lightning",
    components: { verbal: true, somatic: true, material: true, materialDesc: "a bit of fur and a glass rod" },
    classes: ["wizard", "sorcerer"],
    isConcentration: false,
    isRitual: false
  },
  {
    id: 6,
    name: "Counter-spell-check",
    level: 3,
    school: "abjuration",
    castingTime: "1 reaction",
    range: 60,
    duration: "instantaneous",
    damage: "",
    components: { verbal: false, somatic: true, material: false, materialDesc: "" },
    classes: ["wizard", "sorcerer", "warlock"],
    isConcentration: false,
    isRitual: false
  },
  {
    id: 7,
    name: "Healing Nerd",
    level: 1,
    school: "evocation",
    castingTime: "1 bonus action",
    range: 60,
    duration: "instantaneous",
    damage: "",
    components: { verbal: true, somatic: false, material: false, materialDesc: "" },
    classes: ["cleric", "ranger"],
    isConcentration: false,
    isRitual: false
  },
  {
    id: 8,
    name: "Eldritch Breakfast",
    level: 0,
    school: "evocation",
    castingTime: "1 action",
    range: 120,
    duration: "instantaneous",
    damage: "1d10 force",
    components: { verbal: true, somatic: true, material: false, materialDesc: "" },
    classes: ["warlock"],
    isConcentration: false,
    isRitual: false
  },
  {
    id: 9,
    name: "Dish",
    level: 9,
    school: "conjuration",
    castingTime: "1 action",
    range: 0,
    duration: "instantaneous",
    damage: "",
    components: { verbal: true, somatic: false, material: false, materialDesc: "" },
    classes: ["wizard", "sorcerer"],
    isConcentration: false,
    isRitual: false
  },
  {
    id: 10,
    name: "Polly-morph",
    level: 4,
    school: "transmutation",
    castingTime: "1 action",
    range: 60,
    duration: "1 hour",
    damage: "",
    components: { verbal: true, somatic: true, material: true, materialDesc: "a caterpillar cocoon" },
    classes: ["wizard", "sorcerer", "warlock"],
    isConcentration: true,
    isRitual: false
  },
  {
    id: 11,
    name: "Defect Magic",
    level: 1,
    school: "divination",
    castingTime: "1 action",
    range: 30,
    duration: "10 minutes",
    damage: "",
    components: { verbal: true, somatic: true, material: false, materialDesc: "" },
    classes: ["wizard", "sorcerer", "cleric", "ranger"],
    isConcentration: true,
    isRitual: true
  },
  {
    id: 12,
    name: "Misty Steppe",
    level: 2,
    school: "conjuration",
    castingTime: "1 bonus action",
    range: 0,
    duration: "instantaneous",
    damage: "",
    components: { verbal: true, somatic: false, material: false, materialDesc: "" },
    classes: ["wizard", "sorcerer", "warlock"],
    isConcentration: false,
    isRitual: false
  }
];

// ── Equipment Dataset (12 items, punny parody names) ────────────────────────

const EQUIPMENT = [
  {
    id: 1,
    name: "Verbal Sword",
    type: "weapon",
    rarity: "legendary",
    weight: 3,
    value: 25000,
    properties: { damage: "3d6+3", damageType: "slashing", armorClass: 0, bonusAC: 0, attunement: true, charges: 0 },
    description: "A sword that critiques your enemies with devastating precision."
  },
  {
    id: 2,
    name: "Dagger of Venom-ous Reviews",
    type: "weapon",
    rarity: "rare",
    weight: 1,
    value: 2500,
    properties: { damage: "1d4+2", damageType: "piercing", armorClass: 0, bonusAC: 0, attunement: false, charges: 3 },
    description: "Each stab leaves a one-star review on the target."
  },
  {
    id: 3,
    name: "Plate Armoire",
    type: "armor",
    rarity: "rare",
    weight: 65,
    value: 8000,
    properties: { damage: "", damageType: "", armorClass: 18, bonusAC: 2, attunement: false, charges: 0 },
    description: "A sturdy wardrobe you wear into battle. Surprisingly fashionable."
  },
  {
    id: 4,
    name: "Staff of the Magpie",
    type: "weapon",
    rarity: "very rare",
    weight: 4,
    value: 15000,
    properties: { damage: "1d8+3", damageType: "bludgeoning", armorClass: 0, bonusAC: 0, attunement: true, charges: 10 },
    description: "A staff that steals shiny objects from the ethereal plane."
  },
  {
    id: 5,
    name: "Cloak of In-Visibility",
    type: "wondrous",
    rarity: "legendary",
    weight: 1,
    value: 30000,
    properties: { damage: "", damageType: "", armorClass: 0, bonusAC: 0, attunement: true, charges: 0 },
    description: "Makes you visible only on LinkedIn and professional platforms."
  },
  {
    id: 6,
    name: "Boots of Sneed",
    type: "wondrous",
    rarity: "uncommon",
    weight: 2,
    value: 1200,
    properties: { damage: "", damageType: "", armorClass: 0, bonusAC: 0, attunement: true, charges: 0 },
    description: "Doubles your movement speed but makes sarcastic comments at every step."
  },
  {
    id: 7,
    name: "Long Bow-tie",
    type: "weapon",
    rarity: "uncommon",
    weight: 2,
    value: 800,
    properties: { damage: "1d8+1", damageType: "piercing", armorClass: 0, bonusAC: 0, attunement: false, charges: 0 },
    description: "A formal longbow shaped like a bow tie. +2 to Persuasion while equipped."
  },
  {
    id: 8,
    name: "Bag of Folding",
    type: "wondrous",
    rarity: "uncommon",
    weight: 0.5,
    value: 1000,
    properties: { damage: "", damageType: "", armorClass: 0, bonusAC: 0, attunement: false, charges: 0 },
    description: "Neatly folds and stores up to 500 pounds of laundry in an extradimensional space."
  },
  {
    id: 9,
    name: "Wand of Furballs",
    type: "weapon",
    rarity: "rare",
    weight: 1,
    value: 5000,
    properties: { damage: "8d6", damageType: "fire", armorClass: 0, bonusAC: 0, attunement: true, charges: 7 },
    description: "Launches compact furballs that explode into 20-foot radii of fluffy destruction."
  },
  {
    id: 10,
    name: "Ring of Procrastination",
    type: "wondrous",
    rarity: "rare",
    weight: 0,
    value: 3500,
    properties: { damage: "", damageType: "", armorClass: 0, bonusAC: 1, attunement: true, charges: 0 },
    description: "Grants +1 AC because enemies always attack you 'later'."
  },
  {
    id: 11,
    name: "Amulet of Stealth",
    type: "wondrous",
    rarity: "uncommon",
    weight: 0.5,
    value: 1500,
    properties: { damage: "", damageType: "", armorClass: 0, bonusAC: 0, attunement: true, charges: 0 },
    description: "Makes your footsteps sound like someone else's problem."
  },
  {
    id: 12,
    name: "Rope of Rhyming",
    type: "wondrous",
    rarity: "common",
    weight: 3,
    value: 200,
    properties: { damage: "", damageType: "", armorClass: 0, bonusAC: 0, attunement: false, charges: 0 },
    description: "A 50-foot rope that only ties knots if you ask it in verse."
  }
];

// ── Format datasets as readable JS for Dataset tab ──────────────────────────

function formatDatasetDisplay() {
  const lines = [];

  // Characters
  lines.push('const characters = [');
  CHARACTERS.forEach((c, i) => {
    lines.push('  {');
    lines.push(`    id: ${c.id},`);
    lines.push(`    name: "${c.name}",`);
    lines.push(`    race: "${c.race}",`);
    lines.push(`    class: "${c.class}",`);
    lines.push(`    level: ${c.level},`);
    lines.push(`    alignment: "${c.alignment}",`);
    lines.push(`    hp: ${c.hp},`);
    lines.push(`    ac: ${c.ac},`);
    lines.push(`    stats: { strength: ${c.stats.strength}, dexterity: ${c.stats.dexterity}, constitution: ${c.stats.constitution}, intelligence: ${c.stats.intelligence}, wisdom: ${c.stats.wisdom}, charisma: ${c.stats.charisma} },`);
    lines.push(`    spellIds: ${JSON.stringify(c.spellIds)},`);
    lines.push(`    equipmentIds: ${JSON.stringify(c.equipmentIds)},`);
    lines.push(`    background: "${c.background}",`);
    lines.push(`    isAlive: ${c.isAlive},`);
    lines.push(`    gold: ${c.gold},`);
    lines.push(`    languages: ${JSON.stringify(c.languages)}`);
    lines.push(`  }${i < CHARACTERS.length - 1 ? ',' : ''}`);
  });
  lines.push('];');
  lines.push('');

  // Spells
  lines.push('const spells = [');
  SPELLS.forEach((s, i) => {
    lines.push('  {');
    lines.push(`    id: ${s.id},`);
    lines.push(`    name: "${s.name}",`);
    lines.push(`    level: ${s.level},`);
    lines.push(`    school: "${s.school}",`);
    lines.push(`    castingTime: "${s.castingTime}",`);
    lines.push(`    range: ${s.range},`);
    lines.push(`    duration: "${s.duration}",`);
    lines.push(`    damage: "${s.damage}",`);
    lines.push(`    components: { verbal: ${s.components.verbal}, somatic: ${s.components.somatic}, material: ${s.components.material}, materialDesc: "${s.components.materialDesc}" },`);
    lines.push(`    classes: ${JSON.stringify(s.classes)},`);
    lines.push(`    isConcentration: ${s.isConcentration},`);
    lines.push(`    isRitual: ${s.isRitual}`);
    lines.push(`  }${i < SPELLS.length - 1 ? ',' : ''}`);
  });
  lines.push('];');
  lines.push('');

  // Equipment
  lines.push('const equipment = [');
  EQUIPMENT.forEach((e, i) => {
    lines.push('  {');
    lines.push(`    id: ${e.id},`);
    lines.push(`    name: "${e.name}",`);
    lines.push(`    type: "${e.type}",`);
    lines.push(`    rarity: "${e.rarity}",`);
    lines.push(`    weight: ${e.weight},`);
    lines.push(`    value: ${e.value},`);
    lines.push(`    properties: { damage: "${e.properties.damage}", damageType: "${e.properties.damageType}", armorClass: ${e.properties.armorClass}, bonusAC: ${e.properties.bonusAC}, attunement: ${e.properties.attunement}, charges: ${e.properties.charges} },`);
    lines.push(`    description: "${e.description}"`);
    lines.push(`  }${i < EQUIPMENT.length - 1 ? ',' : ''}`);
  });
  lines.push('];');

  return lines.join('\n');
}

const DATASET_DISPLAY = formatDatasetDisplay();
const CHARACTERS_JSON = JSON.stringify(CHARACTERS);
const SPELLS_JSON = JSON.stringify(SPELLS);
const EQUIPMENT_JSON = JSON.stringify(EQUIPMENT);

// ── Helpers ─────────────────────────────────────────────────────────────────

function esc(str) { return String(str).replace(/'/g, "\\'"); }

function tr(fnName, testBody) {
  return `(code) => {\n  const characters = ${CHARACTERS_JSON};\n  const spells = ${SPELLS_JSON};\n  const equipment = ${EQUIPMENT_JSON};\n  const fn = new Function(code + '; return ${fnName};')();\n${testBody}\n}`;
}

// ── Exercise definitions ────────────────────────────────────────────────────

const exercises = [

  // ── T2 (6 exercises) ──────────────────────────────────────────────────────

  {
    id: 1050,
    title: "D&D: Get Character Names",
    tier: 2,
    category: ["api-data", "dnd"],
    tags: ["arrays", "map", "api-data", "dnd"],
    description: "Extract all character names from the dataset.",
    instructions: "Write a function called `getCharacterNames` that takes an array of character objects and returns an array of their `name` properties.\n\nExample:\n```\ngetCharacterNames(characters)\n// Returns: [\"Randalf the Beige\", \"Drizzy Do'Urden\", ...]\n```",
    starterCode: "// Return an array of all character names\nfunction getCharacterNames(characters) {\n  \n}",
    solution: "function getCharacterNames(characters) {\n  return characters.map(c => c.name);\n}",
    hints: [
      "Use .map() to transform each character object into just the name property.",
      "The callback is: `c => c.name`"
    ],
    resources: [{ label: "MDN: Array.prototype.map()", url: "/docs/mdn/array-map.html" }],
    testRunner: (() => {
      return tr('getCharacterNames', [
        '  const result = fn(characters);',
        '  return [',
        '    { pass: Array.isArray(result), description: "Returns an array", got: typeof result },',
        '    { pass: result.length === 10, description: "Returns 10 names", got: String(result.length) },',
        '    { pass: result[0] === "Randalf the Beige", description: \'First is "Randalf the Beige"\', got: String(result[0]) },',
        '    { pass: result[9] === "Boblin the Goblin", description: \'Last is "Boblin the Goblin"\', got: String(result[9]) },',
        `    { pass: result.includes("Drizzy Do'Urden"), description: 'Includes "Drizzy Do\\'Urden"', got: String(result.includes("Drizzy Do'Urden")) },`,
        '  ];',
      ].join('\n'));
    })()
  },
  {
    id: 1051,
    title: "D&D: Get Character Classes",
    tier: 2,
    category: ["api-data", "dnd"],
    tags: ["arrays", "map", "api-data", "dnd"],
    description: "Extract each character's name and class.",
    instructions: "Write a function called `getCharacterClasses` that takes an array of character objects and returns an array of objects with `name` and `class` properties.\n\nExample:\n```\ngetCharacterClasses(characters)\n// Returns: [{ name: \"Randalf the Beige\", class: \"wizard\" }, ...]\n```",
    starterCode: "// Return an array of { name, class } objects\nfunction getCharacterClasses(characters) {\n  \n}",
    solution: "function getCharacterClasses(characters) {\n  return characters.map(c => ({ name: c.name, class: c.class }));\n}",
    hints: [
      "Use .map() to build a new object from each character with name and class.",
      "Return an object literal: `c => ({ name: c.name, class: c.class })`"
    ],
    resources: [{ label: "MDN: Array.prototype.map()", url: "/docs/mdn/array-map.html" }],
    testRunner: tr('getCharacterClasses', [
      '  const result = fn(characters);',
      '  return [',
      '    { pass: Array.isArray(result), description: "Returns an array", got: typeof result },',
      '    { pass: result.length === 10, description: "Returns 10 entries", got: String(result.length) },',
      '    { pass: result[0] && result[0].name === "Randalf the Beige" && result[0].class === "wizard", description: "Randalf is a wizard", got: result[0] ? JSON.stringify(result[0]) : "undefined" },',
      '    { pass: result[2] && result[2].class === "fighter", description: "Bruise-a-nor is a fighter", got: result[2] ? result[2].class : "undefined" },',
      '    { pass: result[0] && Object.keys(result[0]).length === 2, description: "Each entry has exactly 2 properties", got: result[0] ? String(Object.keys(result[0]).length) : "undefined" },',
      '  ];',
    ].join('\n'))
  },
  {
    id: 1052,
    title: "D&D: Filter Living Characters",
    tier: 2,
    category: ["api-data", "dnd"],
    tags: ["arrays", "filter", "api-data", "dnd"],
    description: "Filter to only characters that are still alive.",
    instructions: "Write a function called `getLivingCharacters` that takes an array of character objects and returns only those where `isAlive` is `true`.\n\nExample:\n```\ngetLivingCharacters(characters)\n// Returns: [{ name: \"Randalf the Beige\", ... }, ...]\n```",
    starterCode: "// Return only living characters\nfunction getLivingCharacters(characters) {\n  \n}",
    solution: "function getLivingCharacters(characters) {\n  return characters.filter(c => c.isAlive);\n}",
    hints: [
      "Use .filter() to keep only characters where isAlive is true.",
      "The boolean property works as the condition: `c => c.isAlive`"
    ],
    resources: [{ label: "MDN: Array.prototype.filter()", url: "/docs/mdn/array-filter.html" }],
    testRunner: (() => {
      const alive = CHARACTERS.filter(c => c.isAlive);
      const dead = CHARACTERS.find(c => !c.isAlive);
      return tr('getLivingCharacters', [
        '  const result = fn(characters);',
        '  return [',
        '    { pass: Array.isArray(result), description: "Returns an array", got: typeof result },',
        `    { pass: result.length === ${alive.length}, description: "${alive.length} characters are alive", got: String(result.length) },`,
        '    { pass: result.every(c => c.isAlive === true), description: "All returned are alive", got: String(result.every(c => c.isAlive)) },',
        `    { pass: !result.find(c => c.name === "${esc(dead.name)}"), description: 'Excludes dead "${esc(dead.name)}"', got: String(!result.find(c => c.name === "${esc(dead.name)}")) },`,
        '    { pass: result.find(c => c.name === "Randalf the Beige"), description: \'Includes "Randalf the Beige"\', got: String(!!result.find(c => c.name === "Randalf the Beige")) },',
        '  ];',
      ].join('\n'));
    })()
  },
  {
    id: 1053,
    title: "D&D: Get Spell Names",
    tier: 2,
    category: ["api-data", "dnd"],
    tags: ["arrays", "map", "api-data", "dnd"],
    description: "Extract all spell names from the spells dataset.",
    instructions: "Write a function called `getSpellNames` that takes an array of spell objects and returns an array of their `name` properties.\n\nExample:\n```\ngetSpellNames(spells)\n// Returns: [\"Furball\", \"Magic Missal\", ...]\n```",
    starterCode: "// Return an array of all spell names\nfunction getSpellNames(spells) {\n  \n}",
    solution: "function getSpellNames(spells) {\n  return spells.map(s => s.name);\n}",
    hints: [
      "Use .map() to transform each spell object into just the name property.",
      "The callback is: `s => s.name`"
    ],
    resources: [{ label: "MDN: Array.prototype.map()", url: "/docs/mdn/array-map.html" }],
    testRunner: tr('getSpellNames', [
      '  const result = fn(spells);',
      '  return [',
      '    { pass: Array.isArray(result), description: "Returns an array", got: typeof result },',
      '    { pass: result.length === 12, description: "Returns 12 spell names", got: String(result.length) },',
      '    { pass: result[0] === "Furball", description: \'First is "Furball"\', got: String(result[0]) },',
      '    { pass: result.includes("Eldritch Breakfast"), description: \'Includes "Eldritch Breakfast"\', got: String(result.includes("Eldritch Breakfast")) },',
      '    { pass: result.includes("Dish"), description: \'Includes "Dish"\', got: String(result.includes("Dish")) },',
      '  ];',
    ].join('\n'))
  },
  {
    id: 1054,
    title: "D&D: Get Equipment Names",
    tier: 2,
    category: ["api-data", "dnd"],
    tags: ["arrays", "map", "api-data", "dnd"],
    description: "Extract all equipment names from the equipment dataset.",
    instructions: "Write a function called `getEquipmentNames` that takes an array of equipment objects and returns an array of their `name` properties.\n\nExample:\n```\ngetEquipmentNames(equipment)\n// Returns: [\"Verbal Sword\", \"Dagger of Venom-ous Reviews\", ...]\n```",
    starterCode: "// Return an array of all equipment names\nfunction getEquipmentNames(equipment) {\n  \n}",
    solution: "function getEquipmentNames(equipment) {\n  return equipment.map(e => e.name);\n}",
    hints: [
      "Use .map() to transform each equipment object into just the name property.",
      "The callback is: `e => e.name`"
    ],
    resources: [{ label: "MDN: Array.prototype.map()", url: "/docs/mdn/array-map.html" }],
    testRunner: tr('getEquipmentNames', [
      '  const result = fn(equipment);',
      '  return [',
      '    { pass: Array.isArray(result), description: "Returns an array", got: typeof result },',
      '    { pass: result.length === 12, description: "Returns 12 equipment names", got: String(result.length) },',
      '    { pass: result[0] === "Verbal Sword", description: \'First is "Verbal Sword"\', got: String(result[0]) },',
      '    { pass: result.includes("Bag of Folding"), description: \'Includes "Bag of Folding"\', got: String(result.includes("Bag of Folding")) },',
      '    { pass: result.includes("Rope of Rhyming"), description: \'Includes "Rope of Rhyming"\', got: String(result.includes("Rope of Rhyming")) },',
      '  ];',
    ].join('\n'))
  },
  {
    id: 1055,
    title: "D&D: Filter by Race",
    tier: 2,
    category: ["api-data", "dnd"],
    tags: ["arrays", "filter", "comparison", "api-data", "dnd"],
    description: "Filter characters by their race.",
    instructions: "Write a function called `filterByRace` that takes an array of character objects and a `race` string, and returns only characters of that race.\n\nExample:\n```\nfilterByRace(characters, \"human\")\n// Returns all human characters\n```",
    starterCode: "// Return characters of the given race\nfunction filterByRace(characters, race) {\n  \n}",
    solution: "function filterByRace(characters, race) {\n  return characters.filter(c => c.race === race);\n}",
    hints: [
      "Use .filter() with a strict equality check on the race property.",
      "The condition: `c => c.race === race`"
    ],
    resources: [{ label: "MDN: Array.prototype.filter()", url: "/docs/mdn/array-filter.html" }],
    testRunner: (() => {
      const humanCount = CHARACTERS.filter(c => c.race === 'human').length;
      const dwarfCount = CHARACTERS.filter(c => c.race === 'dwarf').length;
      const goblinCount = CHARACTERS.filter(c => c.race === 'goblin').length;
      return tr('filterByRace', [
        '  const humans = fn(characters, "human");',
        '  const dwarves = fn(characters, "dwarf");',
        '  const goblins = fn(characters, "goblin");',
        '  return [',
        '    { pass: Array.isArray(humans), description: "Returns an array", got: typeof humans },',
        `    { pass: humans.length === ${humanCount}, description: "${humanCount} human characters", got: String(humans.length) },`,
        `    { pass: dwarves.length === ${dwarfCount}, description: "${dwarfCount} dwarf character", got: String(dwarves.length) },`,
        `    { pass: goblins.length === ${goblinCount}, description: "${goblinCount} goblin character", got: String(goblins.length) },`,
        '    { pass: humans.every(c => c.race === "human"), description: "All returned humans have correct race", got: String(humans.every(c => c.race === "human")) },',
        '  ];',
      ].join('\n'));
    })()
  },

  // ── T3 (8 exercises) ──────────────────────────────────────────────────────

  {
    id: 1056,
    title: "D&D: Highest Level Characters",
    tier: 3,
    category: ["api-data", "dnd"],
    tags: ["arrays", "sort", "slice", "map", "api-data", "dnd"],
    description: "Sort characters by level and return the top N.",
    instructions: "Write a function called `getHighestLevel` that takes the `characters` array and a number `n`, and returns the top `n` characters by `level` descending. Return an array of objects with `name`, `class`, and `level`.\n\nExample:\n```\ngetHighestLevel(characters, 3)\n// Returns: [{ name: \"Elm-in-stir Aumar\", class: \"sorcerer\", level: 18 }, ...]\n```",
    starterCode: "function getHighestLevel(characters, n) {\n  \n}",
    solution: "function getHighestLevel(characters, n) {\n  return [...characters]\n    .sort((a, b) => b.level - a.level)\n    .slice(0, n)\n    .map(c => ({ name: c.name, class: c.class, level: c.level }));\n}",
    hints: [
      "Sort a copy of the array by level descending, then slice the first n entries and map to { name, class, level }.",
      "Use spread to avoid mutating: `[...characters].sort((a, b) => b.level - a.level)`"
    ],
    resources: [
      { label: "MDN: Array.prototype.sort()", url: "/docs/mdn/array-sort.html" },
      { label: "MDN: Array.prototype.slice()", url: "/docs/mdn/array-slice.html" }
    ],
    testRunner: (() => {
      const sorted = [...CHARACTERS].sort((a, b) => b.level - a.level);
      const top1 = sorted[0];
      const top3 = sorted[2];
      return tr('getHighestLevel', [
        '  const top1 = fn(characters, 1);',
        '  const top3 = fn(characters, 3);',
        '  const top5 = fn(characters, 5);',
        '  return [',
        `    { pass: top1.length === 1 && top1[0].name === "${esc(top1.name)}", description: 'Highest level: "${esc(top1.name)}"', got: top1[0] ? top1[0].name : "undefined" },`,
        `    { pass: top1[0] && top1[0].level === ${top1.level}, description: "Top character is level ${top1.level}", got: top1[0] ? String(top1[0].level) : "undefined" },`,
        '    { pass: top3.length === 3, description: "Top 3 returns 3 entries", got: String(top3.length) },',
        `    { pass: top3[2] && top3[2].name === "${esc(top3.name)}", description: '3rd highest: "${esc(top3.name)}"', got: top3[2] ? top3[2].name : "undefined" },`,
        '    { pass: top5.length === 5 && top5[0].level >= top5[4].level, description: "Top 5 sorted descending by level", got: top5.map(c => c.level).join(", ") },',
        '  ];',
      ].join('\n'));
    })()
  },
  {
    id: 1057,
    title: "D&D: Character Spellbook",
    tier: 3,
    category: ["api-data", "dnd"],
    tags: ["arrays", "filter", "map", "cross-reference", "api-data", "dnd"],
    description: "Look up all spell names a character knows using cross-referencing.",
    instructions: "Write a function called `getSpellbook` that takes the `characters` array, `spells` array, and a `characterId` number. Return an object with:\n- `character`: the character's name\n- `spells`: sorted array of spell names the character knows (matched by `spellIds`)\n- `count`: number of spells\n\nExample:\n```\ngetSpellbook(characters, spells, 1)\n// Returns: { character: \"Randalf the Beige\", spells: [\"Defect Magic\", \"Dish\", ...], count: 6 }\n```",
    starterCode: "function getSpellbook(characters, spells, characterId) {\n  \n}",
    solution: "function getSpellbook(characters, spells, characterId) {\n  const char = characters.find(c => c.id === characterId);\n  const charSpells = spells.filter(s => char.spellIds.includes(s.id)).map(s => s.name).sort();\n  return { character: char.name, spells: charSpells, count: charSpells.length };\n}",
    hints: [
      "Use .find() to get the character, then .filter() spells whose id is in the character's spellIds array.",
      "Chain: `spells.filter(s => char.spellIds.includes(s.id)).map(s => s.name).sort()`"
    ],
    resources: [
      { label: "MDN: Array.prototype.includes()", url: "/docs/mdn/array-includes.html" },
      { label: "MDN: Array.prototype.find()", url: "/docs/mdn/array-find.html" }
    ],
    testRunner: (() => {
      const randalf = CHARACTERS[0];
      const randalfSpells = SPELLS.filter(s => randalf.spellIds.includes(s.id)).map(s => s.name).sort();
      const bruise = CHARACTERS[2]; // fighter with 0 spells
      return tr('getSpellbook', [
        '  const r1 = fn(characters, spells, 1);',
        '  const r3 = fn(characters, spells, 3);',
        '  return [',
        `    { pass: r1 && r1.character === "${esc(randalf.name)}", description: 'Character 1: "${esc(randalf.name)}"', got: r1 ? r1.character : "undefined" },`,
        `    { pass: r1 && r1.count === ${randalfSpells.length}, description: "${esc(randalf.name)} knows ${randalfSpells.length} spells", got: r1 ? String(r1.count) : "undefined" },`,
        `    { pass: r1 && Array.isArray(r1.spells) && r1.spells[0] === "${esc(randalfSpells[0])}", description: 'First spell alphabetically: "${esc(randalfSpells[0])}"', got: r1 && r1.spells ? r1.spells[0] : "undefined" },`,
        `    { pass: r3 && r3.count === 0, description: "${esc(bruise.name)} (fighter) knows 0 spells", got: r3 ? String(r3.count) : "undefined" },`,
        '    { pass: r1 && JSON.stringify(r1.spells) === JSON.stringify([...r1.spells].sort()), description: "Spells are sorted alphabetically", got: r1 ? "sorted" : "undefined" },',
        '  ];',
      ].join('\n'));
    })()
  },
  {
    id: 1058,
    title: "D&D: Character Inventory",
    tier: 3,
    category: ["api-data", "dnd"],
    tags: ["arrays", "filter", "map", "cross-reference", "api-data", "dnd"],
    description: "Look up all equipment names a character carries using cross-referencing.",
    instructions: "Write a function called `getInventory` that takes the `characters` array, `equipment` array, and a `characterId` number. Return an object with:\n- `character`: the character's name\n- `items`: sorted array of equipment names the character carries (matched by `equipmentIds`)\n- `totalValue`: sum of all carried equipment values\n\nExample:\n```\ngetInventory(characters, equipment, 2)\n// Returns: { character: \"Drizzy Do'Urden\", items: [\"Bag of Folding\", ...], totalValue: ... }\n```",
    starterCode: "function getInventory(characters, equipment, characterId) {\n  \n}",
    solution: "function getInventory(characters, equipment, characterId) {\n  const char = characters.find(c => c.id === characterId);\n  const items = equipment.filter(e => char.equipmentIds.includes(e.id));\n  return {\n    character: char.name,\n    items: items.map(e => e.name).sort(),\n    totalValue: items.reduce((sum, e) => sum + e.value, 0)\n  };\n}",
    hints: [
      "Use .find() to get the character, then .filter() equipment whose id is in the character's equipmentIds.",
      "Sum values with .reduce(): `items.reduce((sum, e) => sum + e.value, 0)`"
    ],
    resources: [
      { label: "MDN: Array.prototype.reduce()", url: "/docs/mdn/array-reduce.html" },
      { label: "MDN: Array.prototype.includes()", url: "/docs/mdn/array-includes.html" }
    ],
    testRunner: (() => {
      const drizzy = CHARACTERS[1];
      const drizzyItems = EQUIPMENT.filter(e => drizzy.equipmentIds.includes(e.id));
      const drizzyTotal = drizzyItems.reduce((s, e) => s + e.value, 0);
      const drizzyNames = drizzyItems.map(e => e.name).sort();
      const randalf = CHARACTERS[0];
      const randalfItems = EQUIPMENT.filter(e => randalf.equipmentIds.includes(e.id));
      const randalfTotal = randalfItems.reduce((s, e) => s + e.value, 0);
      return tr('getInventory', [
        '  const r2 = fn(characters, equipment, 2);',
        '  const r1 = fn(characters, equipment, 1);',
        '  return [',
        `    { pass: r2 && r2.character === "${esc(drizzy.name)}", description: 'Character 2: "${esc(drizzy.name)}"', got: r2 ? r2.character : "undefined" },`,
        `    { pass: r2 && r2.items.length === ${drizzyNames.length}, description: "${esc(drizzy.name)} carries ${drizzyNames.length} items", got: r2 ? String(r2.items.length) : "undefined" },`,
        `    { pass: r2 && r2.totalValue === ${drizzyTotal}, description: "${esc(drizzy.name)} inventory worth ${drizzyTotal} gold", got: r2 ? String(r2.totalValue) : "undefined" },`,
        `    { pass: r1 && r1.totalValue === ${randalfTotal}, description: "${esc(randalf.name)} inventory worth ${randalfTotal} gold", got: r1 ? String(r1.totalValue) : "undefined" },`,
        '    { pass: r2 && JSON.stringify(r2.items) === JSON.stringify([...r2.items].sort()), description: "Items are sorted alphabetically", got: "sorted" },',
        '  ];',
      ].join('\n'));
    })()
  },
  {
    id: 1059,
    title: "D&D: Spells by School",
    tier: 3,
    category: ["api-data", "dnd"],
    tags: ["arrays", "filter", "sort", "api-data", "dnd"],
    description: "Filter and sort spells by their magical school.",
    instructions: "Write a function called `getSpellsBySchool` that takes the `spells` array and a `school` string (like `\"evocation\"` or `\"abjuration\"`). Return an array of matching spells sorted by level ascending, with objects containing `name`, `level`, and `damage` (empty string if none).\n\nExample:\n```\ngetSpellsBySchool(spells, \"evocation\")\n// Returns: [{ name: \"Eldritch Breakfast\", level: 0, damage: \"1d10 force\" }, ...]\n```",
    starterCode: "function getSpellsBySchool(spells, school) {\n  \n}",
    solution: "function getSpellsBySchool(spells, school) {\n  return spells\n    .filter(s => s.school === school)\n    .sort((a, b) => a.level - b.level)\n    .map(s => ({ name: s.name, level: s.level, damage: s.damage }));\n}",
    hints: [
      "Filter by school, sort by level ascending, then map to { name, level, damage }.",
      "Chain: `.filter(s => s.school === school).sort((a, b) => a.level - b.level).map(...)`"
    ],
    resources: [
      { label: "MDN: Array.prototype.filter()", url: "/docs/mdn/array-filter.html" },
      { label: "MDN: Array.prototype.sort()", url: "/docs/mdn/array-sort.html" }
    ],
    testRunner: (() => {
      const evoSpells = SPELLS.filter(s => s.school === 'evocation').sort((a, b) => a.level - b.level);
      const abjSpells = SPELLS.filter(s => s.school === 'abjuration');
      return tr('getSpellsBySchool', [
        '  const evo = fn(spells, "evocation");',
        '  const abj = fn(spells, "abjuration");',
        '  const div = fn(spells, "divination");',
        '  return [',
        `    { pass: evo.length === ${evoSpells.length}, description: "${evoSpells.length} evocation spells", got: String(evo.length) },`,
        `    { pass: evo[0] && evo[0].name === "${esc(evoSpells[0].name)}", description: 'Lowest level evocation: "${esc(evoSpells[0].name)}"', got: evo[0] ? evo[0].name : "undefined" },`,
        `    { pass: abj.length === ${abjSpells.length}, description: "${abjSpells.length} abjuration spells", got: String(abj.length) },`,
        '    { pass: div.length === 1, description: "1 divination spell", got: String(div.length) },',
        `    { pass: evo[0] && evo[0].level <= evo[evo.length - 1].level, description: "Evocation sorted by level ascending", got: evo.map(s => s.level).join(", ") },`,
        '  ];',
      ].join('\n'));
    })()
  },
  {
    id: 1060,
    title: "D&D: Equipment by Rarity",
    tier: 3,
    category: ["api-data", "dnd"],
    tags: ["arrays", "filter", "reduce", "api-data", "dnd"],
    description: "Filter equipment by rarity and calculate total value.",
    instructions: "Write a function called `getEquipmentByRarity` that takes the `equipment` array and a `rarity` string (like `\"rare\"` or `\"legendary\"`). Return an object with:\n- `rarity`: the rarity string\n- `items`: sorted array of item names matching that rarity\n- `count`: number of items\n- `totalValue`: sum of all matching item values\n\nExample:\n```\ngetEquipmentByRarity(equipment, \"legendary\")\n// Returns: { rarity: \"legendary\", items: [\"Cloak of In-Visibility\", ...], count: 2, totalValue: ... }\n```",
    starterCode: "function getEquipmentByRarity(equipment, rarity) {\n  \n}",
    solution: "function getEquipmentByRarity(equipment, rarity) {\n  const items = equipment.filter(e => e.rarity === rarity);\n  return {\n    rarity,\n    items: items.map(e => e.name).sort(),\n    count: items.length,\n    totalValue: items.reduce((sum, e) => sum + e.value, 0)\n  };\n}",
    hints: [
      "Filter equipment by rarity, then build the return object with name list, count, and sum of values.",
      "Use .reduce() for totalValue: `items.reduce((sum, e) => sum + e.value, 0)`"
    ],
    resources: [
      { label: "MDN: Array.prototype.reduce()", url: "/docs/mdn/array-reduce.html" },
      { label: "MDN: Array.prototype.filter()", url: "/docs/mdn/array-filter.html" }
    ],
    testRunner: (() => {
      const legendary = EQUIPMENT.filter(e => e.rarity === 'legendary');
      const legendaryTotal = legendary.reduce((s, e) => s + e.value, 0);
      const rare = EQUIPMENT.filter(e => e.rarity === 'rare');
      const rareTotal = rare.reduce((s, e) => s + e.value, 0);
      return tr('getEquipmentByRarity', [
        '  const leg = fn(equipment, "legendary");',
        '  const rar = fn(equipment, "rare");',
        '  return [',
        `    { pass: leg && leg.count === ${legendary.length}, description: "${legendary.length} legendary items", got: leg ? String(leg.count) : "undefined" },`,
        `    { pass: leg && leg.totalValue === ${legendaryTotal}, description: "Legendary total: ${legendaryTotal} gold", got: leg ? String(leg.totalValue) : "undefined" },`,
        `    { pass: rar && rar.count === ${rare.length}, description: "${rare.length} rare items", got: rar ? String(rar.count) : "undefined" },`,
        `    { pass: rar && rar.totalValue === ${rareTotal}, description: "Rare total: ${rareTotal} gold", got: rar ? String(rar.totalValue) : "undefined" },`,
        '    { pass: leg && leg.rarity === "legendary", description: "Rarity field matches input", got: leg ? leg.rarity : "undefined" },',
        '  ];',
      ].join('\n'));
    })()
  },
  {
    id: 1061,
    title: "D&D: Party Composition",
    tier: 3,
    category: ["api-data", "dnd"],
    tags: ["arrays", "filter", "map", "api-data", "dnd"],
    description: "Build a party by selecting characters of specific classes.",
    instructions: "Write a function called `buildParty` that takes the `characters` array and an array of `classNames` (like `[\"wizard\", \"fighter\", \"cleric\"]`). Return an array of matching characters (whose class is in the classNames list), sorted by level descending, mapped to objects with `name`, `class`, `level`, and `hp`.\n\nExample:\n```\nbuildParty(characters, [\"wizard\", \"fighter\"])\n// Returns: [{ name: \"Randalf the Beige\", class: \"wizard\", level: 15, hp: 78 }, ...]\n```",
    starterCode: "function buildParty(characters, classNames) {\n  \n}",
    solution: "function buildParty(characters, classNames) {\n  return characters\n    .filter(c => classNames.includes(c.class))\n    .sort((a, b) => b.level - a.level)\n    .map(c => ({ name: c.name, class: c.class, level: c.level, hp: c.hp }));\n}",
    hints: [
      "Use .filter() with classNames.includes(c.class) to find matching characters, then sort and map.",
      "Chain: `.filter(c => classNames.includes(c.class)).sort((a, b) => b.level - a.level).map(...)`"
    ],
    resources: [
      { label: "MDN: Array.prototype.includes()", url: "/docs/mdn/array-includes.html" },
      { label: "MDN: Array.prototype.sort()", url: "/docs/mdn/array-sort.html" }
    ],
    testRunner: (() => {
      const wizFighter = CHARACTERS.filter(c => ['wizard', 'fighter'].includes(c.class)).sort((a, b) => b.level - a.level);
      const warlocks = CHARACTERS.filter(c => c.class === 'warlock').sort((a, b) => b.level - a.level);
      return tr('buildParty', [
        '  const party1 = fn(characters, ["wizard", "fighter"]);',
        '  const party2 = fn(characters, ["warlock"]);',
        '  const party3 = fn(characters, ["bard"]);',
        '  return [',
        `    { pass: party1.length === ${wizFighter.length}, description: "${wizFighter.length} wizards + fighters", got: String(party1.length) },`,
        `    { pass: party1[0] && party1[0].name === "${esc(wizFighter[0].name)}", description: 'Highest level: "${esc(wizFighter[0].name)}"', got: party1[0] ? party1[0].name : "undefined" },`,
        `    { pass: party2.length === ${warlocks.length}, description: "${warlocks.length} warlocks", got: String(party2.length) },`,
        '    { pass: party3.length === 0, description: "No bards in the party", got: String(party3.length) },',
        '    { pass: party1[0] && party1[0].level >= party1[party1.length - 1].level, description: "Sorted by level descending", got: party1.map(c => c.level).join(", ") },',
        '  ];',
      ].join('\n'));
    })()
  },
  {
    id: 1062,
    title: "D&D: Shared Spells",
    tier: 3,
    category: ["api-data", "dnd"],
    tags: ["arrays", "filter", "map", "cross-reference", "api-data", "dnd"],
    description: "Find spells that two characters both know.",
    instructions: "Write a function called `getSharedSpells` that takes the `characters` array, `spells` array, and two `characterId` numbers. Return a sorted array of spell names that both characters know (appear in both characters' `spellIds`).\n\nExample:\n```\ngetSharedSpells(characters, spells, 1, 6)\n// Returns: [\"Defect Magic\", \"Dish\", ...]\n```",
    starterCode: "function getSharedSpells(characters, spells, charId1, charId2) {\n  \n}",
    solution: "function getSharedSpells(characters, spells, charId1, charId2) {\n  const char1 = characters.find(c => c.id === charId1);\n  const char2 = characters.find(c => c.id === charId2);\n  const shared = char1.spellIds.filter(id => char2.spellIds.includes(id));\n  return spells.filter(s => shared.includes(s.id)).map(s => s.name).sort();\n}",
    hints: [
      "Find both characters, then intersect their spellIds arrays using .filter() and .includes().",
      "Get shared IDs first: `char1.spellIds.filter(id => char2.spellIds.includes(id))`, then look up names."
    ],
    resources: [
      { label: "MDN: Array.prototype.filter()", url: "/docs/mdn/array-filter.html" },
      { label: "MDN: Array.prototype.includes()", url: "/docs/mdn/array-includes.html" }
    ],
    testRunner: (() => {
      // Randalf (1) and Elm-in-stir (6) share many spells
      const c1 = CHARACTERS[0], c6 = CHARACTERS[5];
      const shared16 = c1.spellIds.filter(id => c6.spellIds.includes(id));
      const sharedNames16 = SPELLS.filter(s => shared16.includes(s.id)).map(s => s.name).sort();
      // Bruise-a-nor (3) and Boblin (10) share 0 spells (both have empty spellIds)
      const c3 = CHARACTERS[2], c10 = CHARACTERS[9];
      const shared310 = c3.spellIds.filter(id => c10.spellIds.includes(id));
      return tr('getSharedSpells', [
        '  const r16 = fn(characters, spells, 1, 6);',
        '  const r310 = fn(characters, spells, 3, 10);',
        '  return [',
        `    { pass: Array.isArray(r16), description: "Returns an array", got: typeof r16 },`,
        `    { pass: r16.length === ${sharedNames16.length}, description: "Randalf & Elm-in-stir share ${sharedNames16.length} spells", got: String(r16.length) },`,
        `    { pass: r16[0] === "${esc(sharedNames16[0])}", description: 'First shared: "${esc(sharedNames16[0])}"', got: String(r16[0]) },`,
        `    { pass: r310.length === ${shared310.length}, description: "Bruise-a-nor & Boblin share ${shared310.length} spells", got: String(r310.length) },`,
        '    { pass: JSON.stringify(r16) === JSON.stringify([...r16].sort()), description: "Results sorted alphabetically", got: "sorted" },',
        '  ];',
      ].join('\n'));
    })()
  },
  {
    id: 1063,
    title: "D&D: Total Party Gold",
    tier: 3,
    category: ["api-data", "dnd"],
    tags: ["arrays", "filter", "reduce", "api-data", "dnd"],
    description: "Calculate the total gold for a set of characters by class.",
    instructions: "Write a function called `getPartyGold` that takes the `characters` array and a `className` string. Return an object with:\n- `class`: the class name\n- `members`: sorted array of character names in that class\n- `totalGold`: sum of all gold for characters of that class\n- `avgGold`: average gold per character (rounded to nearest integer)\n\nExample:\n```\ngetPartyGold(characters, \"warlock\")\n// Returns: { class: \"warlock\", members: [\"Fjord Tough\", \"Tasha Yawn\"], totalGold: 5880, avgGold: 2940 }\n```",
    starterCode: "function getPartyGold(characters, className) {\n  \n}",
    solution: "function getPartyGold(characters, className) {\n  const members = characters.filter(c => c.class === className);\n  const totalGold = members.reduce((sum, c) => sum + c.gold, 0);\n  return {\n    class: className,\n    members: members.map(c => c.name).sort(),\n    totalGold,\n    avgGold: members.length > 0 ? Math.round(totalGold / members.length) : 0\n  };\n}",
    hints: [
      "Filter characters by class, then use .reduce() to sum gold and calculate the average.",
      "Average: `Math.round(totalGold / members.length)` — handle empty class with a ternary."
    ],
    resources: [
      { label: "MDN: Array.prototype.reduce()", url: "/docs/mdn/array-reduce.html" },
      { label: "MDN: Math.round()", url: "/docs/mdn/math-round.html" }
    ],
    testRunner: (() => {
      const warlocks = CHARACTERS.filter(c => c.class === 'warlock');
      const warlockGold = warlocks.reduce((s, c) => s + c.gold, 0);
      const warlockAvg = Math.round(warlockGold / warlocks.length);
      const rangers = CHARACTERS.filter(c => c.class === 'ranger');
      const rangerGold = rangers.reduce((s, c) => s + c.gold, 0);
      return tr('getPartyGold', [
        '  const w = fn(characters, "warlock");',
        '  const r = fn(characters, "ranger");',
        '  const b = fn(characters, "bard");',
        '  return [',
        `    { pass: w && w.members.length === ${warlocks.length}, description: "${warlocks.length} warlocks", got: w ? String(w.members.length) : "undefined" },`,
        `    { pass: w && w.totalGold === ${warlockGold}, description: "Warlock total: ${warlockGold} gold", got: w ? String(w.totalGold) : "undefined" },`,
        `    { pass: w && w.avgGold === ${warlockAvg}, description: "Warlock avg: ${warlockAvg} gold", got: w ? String(w.avgGold) : "undefined" },`,
        `    { pass: r && r.totalGold === ${rangerGold}, description: "Ranger total: ${rangerGold} gold", got: r ? String(r.totalGold) : "undefined" },`,
        '    { pass: b && b.members.length === 0 && b.avgGold === 0, description: "Empty class returns 0 avgGold", got: b ? String(b.avgGold) : "undefined" },',
        '  ];',
      ].join('\n'));
    })()
  },

  // ── T4 (4 exercises) ──────────────────────────────────────────────────────

  {
    id: 1064,
    title: "D&D: Character Sheet",
    tier: 4,
    category: ["api-data", "dnd"],
    tags: ["arrays", "reduce", "cross-reference", "data-transformation", "api-data", "dnd"],
    description: "Build a complete character sheet using all three datasets.",
    instructions: "Write a function called `buildCharacterSheet` that takes all three arrays (`characters`, `spells`, `equipment`) and a `characterId`. Return a detailed character sheet object with:\n- `name`: character name\n- `race`: character race\n- `class`: character class\n- `level`: character level\n- `hp`: hit points\n- `ac`: armor class\n- `alignment`: alignment string\n- `totalStats`: sum of all six ability scores\n- `spells`: sorted array of spell names (from spellIds cross-reference)\n- `equipment`: sorted array of equipment names (from equipmentIds cross-reference)\n- `inventoryValue`: total gold value of carried equipment\n- `netWorth`: gold + inventoryValue\n\nExample:\n```\nbuildCharacterSheet(characters, spells, equipment, 1)\n// Returns: { name: \"Randalf the Beige\", ..., netWorth: ... }\n```",
    starterCode: "",
    solution: "function buildCharacterSheet(characters, spells, equipment, characterId) {\n  const char = characters.find(c => c.id === characterId);\n  const charSpells = spells.filter(s => char.spellIds.includes(s.id)).map(s => s.name).sort();\n  const charEquip = equipment.filter(e => char.equipmentIds.includes(e.id));\n  const inventoryValue = charEquip.reduce((sum, e) => sum + e.value, 0);\n  const totalStats = Object.values(char.stats).reduce((sum, v) => sum + v, 0);\n  return {\n    name: char.name,\n    race: char.race,\n    class: char.class,\n    level: char.level,\n    hp: char.hp,\n    ac: char.ac,\n    alignment: char.alignment,\n    totalStats,\n    spells: charSpells,\n    equipment: charEquip.map(e => e.name).sort(),\n    inventoryValue,\n    netWorth: char.gold + inventoryValue\n  };\n}",
    hints: [
      "Find the character, cross-reference spells and equipment by their IDs, then assemble everything into one object.",
      "Use Object.values(char.stats).reduce() for totalStats, and sum equipment values for inventoryValue."
    ],
    resources: [
      { label: "MDN: Object.values()", url: "/docs/mdn/object-values.html" },
      { label: "MDN: Array.prototype.reduce()", url: "/docs/mdn/array-reduce.html" }
    ],
    testRunner: (() => {
      const randalf = CHARACTERS[0];
      const rSpells = SPELLS.filter(s => randalf.spellIds.includes(s.id)).map(s => s.name).sort();
      const rEquip = EQUIPMENT.filter(e => randalf.equipmentIds.includes(e.id));
      const rInvVal = rEquip.reduce((s, e) => s + e.value, 0);
      const rTotalStats = Object.values(randalf.stats).reduce((s, v) => s + v, 0);
      const boblin = CHARACTERS[9];
      const bEquip = EQUIPMENT.filter(e => boblin.equipmentIds.includes(e.id));
      const bInvVal = bEquip.reduce((s, e) => s + e.value, 0);
      return tr('buildCharacterSheet', [
        '  const r1 = fn(characters, spells, equipment, 1);',
        '  const r10 = fn(characters, spells, equipment, 10);',
        '  return [',
        `    { pass: r1 && r1.name === "${esc(randalf.name)}", description: 'Character 1: "${esc(randalf.name)}"', got: r1 ? r1.name : "undefined" },`,
        `    { pass: r1 && r1.totalStats === ${rTotalStats}, description: "Randalf total stats: ${rTotalStats}", got: r1 ? String(r1.totalStats) : "undefined" },`,
        `    { pass: r1 && r1.spells.length === ${rSpells.length}, description: "Randalf knows ${rSpells.length} spells", got: r1 ? String(r1.spells.length) : "undefined" },`,
        `    { pass: r1 && r1.inventoryValue === ${rInvVal}, description: "Randalf inventory: ${rInvVal} gold", got: r1 ? String(r1.inventoryValue) : "undefined" },`,
        `    { pass: r1 && r1.netWorth === ${randalf.gold + rInvVal}, description: "Randalf net worth: ${randalf.gold + rInvVal} gold", got: r1 ? String(r1.netWorth) : "undefined" },`,
        `    { pass: r10 && r10.spells.length === 0, description: "Boblin knows 0 spells", got: r10 ? String(r10.spells.length) : "undefined" },`,
        `    { pass: r10 && r10.netWorth === ${boblin.gold + bInvVal}, description: "Boblin net worth: ${boblin.gold + bInvVal}", got: r10 ? String(r10.netWorth) : "undefined" },`,
        '  ];',
      ].join('\n'));
    })()
  },
  {
    id: 1065,
    title: "D&D: Spell Popularity",
    tier: 4,
    category: ["api-data", "dnd"],
    tags: ["arrays", "reduce", "flatMap", "aggregation", "api-data", "dnd"],
    description: "Count how many characters know each spell and build a popularity report.",
    instructions: "Write a function called `getSpellPopularity` that takes the `characters` and `spells` arrays. Return an array of objects (one per spell) with:\n- `name`: spell name\n- `level`: spell level\n- `school`: spell school\n- `knownBy`: number of characters who know this spell\n- `casters`: sorted array of character names who know this spell\n\nSort the result by `knownBy` descending, then by `name` ascending for ties.",
    starterCode: "",
    solution: "function getSpellPopularity(characters, spells) {\n  return spells.map(s => {\n    const casters = characters.filter(c => c.spellIds.includes(s.id));\n    return {\n      name: s.name,\n      level: s.level,\n      school: s.school,\n      knownBy: casters.length,\n      casters: casters.map(c => c.name).sort()\n    };\n  }).sort((a, b) => b.knownBy - a.knownBy || a.name.localeCompare(b.name));\n}",
    hints: [
      "Map each spell to an object that counts characters whose spellIds includes that spell's id.",
      "Sort by knownBy descending, with localeCompare on name as tiebreaker."
    ],
    resources: [
      { label: "MDN: Array.prototype.sort()", url: "/docs/mdn/array-sort.html" },
      { label: "MDN: String.prototype.localeCompare()", url: "/docs/mdn/string-localecompare.html" }
    ],
    testRunner: (() => {
      const popularity = SPELLS.map(s => {
        const casters = CHARACTERS.filter(c => c.spellIds.includes(s.id));
        return { name: s.name, level: s.level, school: s.school, knownBy: casters.length, casters: casters.map(c => c.name).sort() };
      }).sort((a, b) => b.knownBy - a.knownBy || a.name.localeCompare(b.name));
      const top = popularity[0];
      const unknown = popularity.filter(p => p.knownBy === 0);
      return tr('getSpellPopularity', [
        '  const result = fn(characters, spells);',
        '  return [',
        '    { pass: Array.isArray(result) && result.length === 12, description: "Returns 12 spell entries", got: result ? String(result.length) : "undefined" },',
        `    { pass: result[0] && result[0].name === "${esc(top.name)}", description: 'Most popular: "${esc(top.name)}"', got: result[0] ? result[0].name : "undefined" },`,
        `    { pass: result[0] && result[0].knownBy === ${top.knownBy}, description: "Most popular known by ${top.knownBy} characters", got: result[0] ? String(result[0].knownBy) : "undefined" },`,
        `    { pass: result[0] && Array.isArray(result[0].casters), description: "Includes casters array", got: result[0] ? typeof result[0].casters : "undefined" },`,
        `    { pass: ${unknown.length === 0 ? 'true' : `result.filter(r => r.knownBy === 0).length === ${unknown.length}`}, description: "${unknown.length} spell(s) unknown by anyone", got: String(result.filter(r => r.knownBy === 0).length) },`,
        '    { pass: result[0].knownBy >= result[result.length - 1].knownBy, description: "Sorted by popularity descending", got: result.map(r => r.knownBy).join(", ") },',
        '  ];',
      ].join('\n'));
    })()
  },
  {
    id: 1066,
    title: "D&D: Class Summary Report",
    tier: 4,
    category: ["api-data", "dnd"],
    tags: ["arrays", "reduce", "cross-reference", "aggregation", "api-data", "dnd"],
    description: "Build a comprehensive summary for each character class.",
    instructions: "Write a function called `buildClassReport` that takes all three arrays (`characters`, `spells`, `equipment`). Return an array of class report objects (one per unique class), sorted by class name ascending, each with:\n- `class`: class name\n- `members`: sorted array of character names in this class\n- `count`: number of characters\n- `avgLevel`: average level (rounded to 1 decimal)\n- `totalHp`: sum of all hp in this class\n- `uniqueSpells`: count of unique spells known across all class members\n- `totalEquipmentValue`: total gold value of all equipment carried by class members",
    starterCode: "",
    solution: "function buildClassReport(characters, spells, equipment) {\n  const classes = [...new Set(characters.map(c => c.class))].sort();\n  return classes.map(cls => {\n    const members = characters.filter(c => c.class === cls);\n    const allSpellIds = [...new Set(members.flatMap(c => c.spellIds))];\n    const allEquipIds = members.flatMap(c => c.equipmentIds);\n    const totalEquipVal = allEquipIds.reduce((sum, id) => {\n      const item = equipment.find(e => e.id === id);\n      return sum + (item ? item.value : 0);\n    }, 0);\n    return {\n      class: cls,\n      members: members.map(c => c.name).sort(),\n      count: members.length,\n      avgLevel: Math.round(members.reduce((s, c) => s + c.level, 0) / members.length * 10) / 10,\n      totalHp: members.reduce((s, c) => s + c.hp, 0),\n      uniqueSpells: allSpellIds.length,\n      totalEquipmentValue: totalEquipVal\n    };\n  });\n}",
    hints: [
      "Get unique classes with `[...new Set(characters.map(c => c.class))]`, then map each to a report object.",
      "Use .flatMap() to collect all spellIds across class members, wrap in new Set() for unique count."
    ],
    resources: [
      { label: "MDN: Array.prototype.flatMap()", url: "/docs/mdn/array-flatmap.html" },
      { label: "MDN: Set", url: "/docs/mdn/set.html" }
    ],
    testRunner: (() => {
      const classes = [...new Set(CHARACTERS.map(c => c.class))].sort();
      const wizards = CHARACTERS.filter(c => c.class === 'wizard');
      const wizSpells = [...new Set(wizards.flatMap(c => c.spellIds))];
      const wizHp = wizards.reduce((s, c) => s + c.hp, 0);
      const wizAvg = Math.round(wizards.reduce((s, c) => s + c.level, 0) / wizards.length * 10) / 10;
      const fighters = CHARACTERS.filter(c => c.class === 'fighter');
      const fighterSpells = [...new Set(fighters.flatMap(c => c.spellIds))];
      return tr('buildClassReport', [
        '  const result = fn(characters, spells, equipment);',
        '  return [',
        `    { pass: Array.isArray(result) && result.length === ${classes.length}, description: "${classes.length} unique classes", got: result ? String(result.length) : "undefined" },`,
        `    { pass: result[0] && result[0].class === "${esc(classes[0])}", description: 'First class alphabetically: "${esc(classes[0])}"', got: result[0] ? result[0].class : "undefined" },`,
        `    { pass: result.find(r => r.class === "wizard") && result.find(r => r.class === "wizard").uniqueSpells === ${wizSpells.length}, description: "Wizards know ${wizSpells.length} unique spells", got: result.find(r => r.class === "wizard") ? String(result.find(r => r.class === "wizard").uniqueSpells) : "undefined" },`,
        `    { pass: result.find(r => r.class === "wizard") && result.find(r => r.class === "wizard").totalHp === ${wizHp}, description: "Wizard total HP: ${wizHp}", got: result.find(r => r.class === "wizard") ? String(result.find(r => r.class === "wizard").totalHp) : "undefined" },`,
        `    { pass: result.find(r => r.class === "fighter") && result.find(r => r.class === "fighter").uniqueSpells === ${fighterSpells.length}, description: "Fighters know ${fighterSpells.length} unique spells", got: result.find(r => r.class === "fighter") ? String(result.find(r => r.class === "fighter").uniqueSpells) : "undefined" },`,
        `    { pass: result.find(r => r.class === "wizard") && result.find(r => r.class === "wizard").avgLevel === ${wizAvg}, description: "Wizard avg level: ${wizAvg}", got: result.find(r => r.class === "wizard") ? String(result.find(r => r.class === "wizard").avgLevel) : "undefined" },`,
        '  ];',
      ].join('\n'));
    })()
  },
  {
    id: 1067,
    title: "D&D: Full Campaign Database",
    tier: 4,
    category: ["api-data", "dnd"],
    tags: ["arrays", "reduce", "cross-reference", "data-transformation", "aggregation", "api-data", "dnd"],
    description: "Build a comprehensive campaign analysis using all three datasets.",
    instructions: "Write a function called `buildCampaignDatabase` that takes all three arrays (`characters`, `spells`, `equipment`). Return a comprehensive campaign analysis object with:\n- `totalCharacters`: number of characters\n- `livingCharacters`: number of alive characters\n- `averageLevel`: average level across all characters (rounded to 1 decimal)\n- `totalPartyGold`: sum of all character gold\n- `richestCharacter`: name of character with most gold\n- `mostSpells`: `{ name, count }` — character who knows the most spells\n- `mostExpensive`: `{ name, value }` — the single most expensive equipment item\n- `schoolBreakdown`: object mapping each spell school to count of spells in that school\n- `rarityBreakdown`: object mapping each equipment rarity to count of items\n- `totalCampaignValue`: sum of all character gold + all carried equipment value",
    starterCode: "",
    solution: "function buildCampaignDatabase(characters, spells, equipment) {\n  const richest = [...characters].sort((a, b) => b.gold - a.gold)[0];\n  const mostSpellsChar = [...characters].sort((a, b) => b.spellIds.length - a.spellIds.length)[0];\n  const mostExpItem = [...equipment].sort((a, b) => b.value - a.value)[0];\n  const schoolBreakdown = spells.reduce((acc, s) => { acc[s.school] = (acc[s.school] || 0) + 1; return acc; }, {});\n  const rarityBreakdown = equipment.reduce((acc, e) => { acc[e.rarity] = (acc[e.rarity] || 0) + 1; return acc; }, {});\n  const totalEquipValue = characters.reduce((sum, c) => {\n    return sum + c.equipmentIds.reduce((s, id) => {\n      const item = equipment.find(e => e.id === id);\n      return s + (item ? item.value : 0);\n    }, 0);\n  }, 0);\n  return {\n    totalCharacters: characters.length,\n    livingCharacters: characters.filter(c => c.isAlive).length,\n    averageLevel: Math.round(characters.reduce((s, c) => s + c.level, 0) / characters.length * 10) / 10,\n    totalPartyGold: characters.reduce((s, c) => s + c.gold, 0),\n    richestCharacter: richest.name,\n    mostSpells: { name: mostSpellsChar.name, count: mostSpellsChar.spellIds.length },\n    mostExpensive: { name: mostExpItem.name, value: mostExpItem.value },\n    schoolBreakdown,\n    rarityBreakdown,\n    totalCampaignValue: characters.reduce((s, c) => s + c.gold, 0) + totalEquipValue\n  };\n}",
    hints: [
      "Break the problem into parts: character stats, spell school counts with .reduce(), equipment rarity counts, and cross-reference for total value.",
      "Use .reduce() with an accumulator object for breakdowns: `spells.reduce((acc, s) => { acc[s.school] = (acc[s.school] || 0) + 1; return acc; }, {})`"
    ],
    resources: [
      { label: "MDN: Array.prototype.reduce()", url: "/docs/mdn/array-reduce.html" },
      { label: "MDN: Array.prototype.flatMap()", url: "/docs/mdn/array-flatmap.html" }
    ],
    testRunner: (() => {
      const livingCount = CHARACTERS.filter(c => c.isAlive).length;
      const avgLevel = Math.round(CHARACTERS.reduce((s, c) => s + c.level, 0) / CHARACTERS.length * 10) / 10;
      const totalGold = CHARACTERS.reduce((s, c) => s + c.gold, 0);
      const richest = [...CHARACTERS].sort((a, b) => b.gold - a.gold)[0];
      const mostSpells = [...CHARACTERS].sort((a, b) => b.spellIds.length - a.spellIds.length)[0];
      const mostExpItem = [...EQUIPMENT].sort((a, b) => b.value - a.value)[0];
      const schoolBreakdown = SPELLS.reduce((acc, s) => { acc[s.school] = (acc[s.school] || 0) + 1; return acc; }, {});
      const totalEquipValue = CHARACTERS.reduce((sum, c) => {
        return sum + c.equipmentIds.reduce((s, id) => {
          const item = EQUIPMENT.find(e => e.id === id);
          return s + (item ? item.value : 0);
        }, 0);
      }, 0);
      return tr('buildCampaignDatabase', [
        '  const result = fn(characters, spells, equipment);',
        '  return [',
        `    { pass: result && result.totalCharacters === 10, description: "10 total characters", got: result ? String(result.totalCharacters) : "undefined" },`,
        `    { pass: result && result.livingCharacters === ${livingCount}, description: "${livingCount} living characters", got: result ? String(result.livingCharacters) : "undefined" },`,
        `    { pass: result && result.averageLevel === ${avgLevel}, description: "Average level: ${avgLevel}", got: result ? String(result.averageLevel) : "undefined" },`,
        `    { pass: result && result.richestCharacter === "${esc(richest.name)}", description: 'Richest: "${esc(richest.name)}"', got: result ? result.richestCharacter : "undefined" },`,
        `    { pass: result && result.mostSpells && result.mostSpells.name === "${esc(mostSpells.name)}" && result.mostSpells.count === ${mostSpells.spellIds.length}, description: 'Most spells: "${esc(mostSpells.name)}" (${mostSpells.spellIds.length})', got: result && result.mostSpells ? result.mostSpells.name + " (" + result.mostSpells.count + ")" : "undefined" },`,
        `    { pass: result && result.mostExpensive && result.mostExpensive.name === "${esc(mostExpItem.name)}", description: 'Most expensive: "${esc(mostExpItem.name)}"', got: result && result.mostExpensive ? result.mostExpensive.name : "undefined" },`,
        `    { pass: result && result.schoolBreakdown && result.schoolBreakdown.evocation === ${schoolBreakdown.evocation}, description: "${schoolBreakdown.evocation} evocation spells in breakdown", got: result && result.schoolBreakdown ? String(result.schoolBreakdown.evocation) : "undefined" },`,
        `    { pass: result && result.totalCampaignValue === ${totalGold + totalEquipValue}, description: "Total campaign value: ${totalGold + totalEquipValue}", got: result ? String(result.totalCampaignValue) : "undefined" },`,
        '  ];',
      ].join('\n'));
    })()
  }
];

// ── Build & Append ─────────────────────────────────────────────────────────

const collectionFile = path.join(__dirname, 'pop-culture-apis.json');
const collection = JSON.parse(fs.readFileSync(collectionFile, 'utf8'));

const t2Count = exercises.filter(e => e.tier === 2).length;
const t3Count = exercises.filter(e => e.tier === 3).length;
const t4Count = exercises.filter(e => e.tier === 4).length;

const formatted = exercises.map(ex => ({
  id: ex.id,
  title: ex.title,
  type: "js",
  tier: ex.tier,
  category: ex.category,
  tags: ex.tags,
  description: ex.description,
  instructions: ex.instructions,
  starterCode: ex.starterCode,
  solution: ex.solution,
  testRunner: ex.testRunner,
  testCases: [],
  providedHtml: "",
  hints: ex.hints,
  resources: ex.resources,
  solutionGate: 10,
  basePoints: ex.tier === 2 ? 25 : ex.tier === 3 ? 50 : 100,
  dataset: DATASET_DISPLAY
}));

// Append IDs and exercises
formatted.forEach(ex => {
  collection.exerciseIds.push(ex.id);
  collection.exercises.push(ex);
});

fs.writeFileSync(collectionFile, JSON.stringify(collection, null, 2));

console.log(`Pop Culture APIs — D&D Theme 🐉`);
console.log('================================');
console.log(`  Exercises: ${exercises.length}`);
console.log(`  T2: ${t2Count}`);
console.log(`  T3: ${t3Count}`);
console.log(`  T4: ${t4Count}`);
console.log(`  ID range: ${exercises[0].id}–${exercises[exercises.length - 1].id}`);
console.log(`  Characters: ${CHARACTERS.length}, Spells: ${SPELLS.length}, Equipment: ${EQUIPMENT.length}`);
console.log(`  Appended to: ${collectionFile}`);
console.log(`  Total collection exercises: ${collection.exercises.length}`);
