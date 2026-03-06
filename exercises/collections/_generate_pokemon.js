/**
 * Generates the Pokemans theme exercises for the Pop Culture APIs collection.
 * Run: node exercises/collections/_generate_pokemon.js
 * Reads existing pop-culture-apis.json and appends Pokemans exercises.
 */

const fs = require('fs');
const path = require('path');

// ── Type Dataset (9 types with effectiveness matchups) ──────────────────────

const TYPES = [
  {
    id: 1,
    name: "fire",
    color: "#F08030",
    strongAgainst: ["grass", "ice", "bug", "steel"],
    weakAgainst: ["water", "rock", "fire", "dragon"],
    immuneTo: []
  },
  {
    id: 2,
    name: "water",
    color: "#6890F0",
    strongAgainst: ["fire", "rock", "ground"],
    weakAgainst: ["water", "grass", "dragon"],
    immuneTo: []
  },
  {
    id: 3,
    name: "grass",
    color: "#78C850",
    strongAgainst: ["water", "rock", "ground"],
    weakAgainst: ["fire", "grass", "poison", "flying", "bug", "dragon", "steel"],
    immuneTo: []
  },
  {
    id: 4,
    name: "electric",
    color: "#F8D030",
    strongAgainst: ["water", "flying"],
    weakAgainst: ["electric", "grass", "dragon"],
    immuneTo: ["ground"]
  },
  {
    id: 5,
    name: "psychic",
    color: "#F85888",
    strongAgainst: ["fighting", "poison"],
    weakAgainst: ["psychic", "steel"],
    immuneTo: ["dark"]
  },
  {
    id: 6,
    name: "fighting",
    color: "#C03028",
    strongAgainst: ["normal", "ice", "rock", "steel", "dark"],
    weakAgainst: ["poison", "flying", "psychic", "bug"],
    immuneTo: ["ghost"]
  },
  {
    id: 7,
    name: "dragon",
    color: "#7038F8",
    strongAgainst: ["dragon"],
    weakAgainst: ["steel"],
    immuneTo: ["fairy"]
  },
  {
    id: 8,
    name: "ghost",
    color: "#705898",
    strongAgainst: ["psychic", "ghost"],
    weakAgainst: ["dark"],
    immuneTo: ["normal"]
  },
  {
    id: 9,
    name: "normal",
    color: "#A8A878",
    strongAgainst: [],
    weakAgainst: ["rock", "steel"],
    immuneTo: ["ghost"]
  }
];

// ── Pokemans Dataset (12 creatures, punny parody names) ──────────────────────

const POKEMON = [
  {
    id: 1,
    name: "Peek-at-chu",
    types: ["electric"],
    generation: 1,
    stats: { hp: 35, attack: 55, defense: 40, spAttack: 50, spDefense: 50, speed: 90 },
    evolution: { from: "Peek-at-chu", to: "Rye-chu", method: "Thunder Scone" },
    abilities: ["Staticky", "Lightning Prod"],
    height: 0.4,
    weight: 6.0,
    isLegendary: false,
    catchRate: 190
  },
  {
    id: 2,
    name: "Char-is-hard",
    types: ["fire", "dragon"],
    generation: 1,
    stats: { hp: 78, attack: 84, defense: 78, spAttack: 109, spDefense: 85, speed: 100 },
    evolution: { from: "Char-melted", to: null, method: null },
    abilities: ["Blaze-r", "Solar Flour"],
    height: 1.7,
    weight: 90.5,
    isLegendary: false,
    catchRate: 45
  },
  {
    id: 3,
    name: "Bulb-is-sore",
    types: ["grass"],
    generation: 1,
    stats: { hp: 45, attack: 49, defense: 49, spAttack: 65, spDefense: 65, speed: 45 },
    evolution: { from: null, to: "Ivy-sore", method: "Level 16" },
    abilities: ["Overgrowl", "Chlorophyll-ing"],
    height: 0.7,
    weight: 6.9,
    isLegendary: false,
    catchRate: 45
  },
  {
    id: 4,
    name: "Squirrel",
    types: ["water"],
    generation: 1,
    stats: { hp: 44, attack: 48, defense: 65, spAttack: 50, spDefense: 64, speed: 43 },
    evolution: { from: null, to: "War-turtle", method: "Level 16" },
    abilities: ["Torrent-ial", "Rain Dishwasher"],
    height: 0.5,
    weight: 9.0,
    isLegendary: false,
    catchRate: 45
  },
  {
    id: 5,
    name: "Mew-Two-Shoes",
    types: ["psychic"],
    generation: 1,
    stats: { hp: 106, attack: 110, defense: 90, spAttack: 154, spDefense: 90, speed: 130 },
    evolution: { from: null, to: null, method: null },
    abilities: ["Pressured", "Unerving"],
    height: 2.0,
    weight: 122.0,
    isLegendary: true,
    catchRate: 3
  },
  {
    id: 6,
    name: "Drag-on-ite",
    types: ["dragon", "fighting"],
    generation: 1,
    stats: { hp: 91, attack: 134, defense: 95, spAttack: 100, spDefense: 100, speed: 80 },
    evolution: { from: "Dragon-hair", to: null, method: "Level 55" },
    abilities: ["Inner Focaccia", "Multiscale Model"],
    height: 2.2,
    weight: 210.0,
    isLegendary: false,
    catchRate: 45
  },
  {
    id: 7,
    name: "Gengar-lic Bread",
    types: ["ghost"],
    generation: 1,
    stats: { hp: 60, attack: 65, defense: 60, spAttack: 130, spDefense: 75, speed: 110 },
    evolution: { from: "Haunt-er", to: null, method: "Trade" },
    abilities: ["Cursed Bodywash"],
    height: 1.5,
    weight: 40.5,
    isLegendary: false,
    catchRate: 45
  },
  {
    id: 8,
    name: "Snore-lax",
    types: ["normal"],
    generation: 1,
    stats: { hp: 160, attack: 110, defense: 65, spAttack: 65, spDefense: 110, speed: 30 },
    evolution: { from: "Munch-tax", to: null, method: null },
    abilities: ["Immunization", "Thick Fudge"],
    height: 2.1,
    weight: 460.0,
    isLegendary: false,
    catchRate: 25
  },
  {
    id: 9,
    name: "Luca-rio Grande",
    types: ["fighting"],
    generation: 4,
    stats: { hp: 70, attack: 110, defense: 70, spAttack: 115, spDefense: 70, speed: 90 },
    evolution: { from: "Rio-lu", to: null, method: "Friendship (Daytime)" },
    abilities: ["Steadfast-food", "Inner Focaccia", "Justified-text"],
    height: 1.2,
    weight: 54.0,
    isLegendary: false,
    catchRate: 45
  },
  {
    id: 10,
    name: "Gar-chomp-sky",
    types: ["dragon"],
    generation: 4,
    stats: { hp: 108, attack: 130, defense: 95, spAttack: 80, spDefense: 85, speed: 102 },
    evolution: { from: "Gab-ite-me", to: null, method: "Level 48" },
    abilities: ["Sand Veil-cro", "Rough Skincare"],
    height: 1.9,
    weight: 95.0,
    isLegendary: false,
    catchRate: 45
  },
  {
    id: 11,
    name: "Gren-ninja Turtle",
    types: ["water"],
    generation: 6,
    stats: { hp: 72, attack: 95, defense: 67, spAttack: 103, spDefense: 71, speed: 122 },
    evolution: { from: "Frog-a-deer", to: null, method: "Level 36" },
    abilities: ["Torrent-ial", "Protein-an"],
    height: 1.5,
    weight: 40.0,
    isLegendary: false,
    catchRate: 45
  },
  {
    id: 12,
    name: "Ray-quiz-a",
    types: ["dragon"],
    generation: 3,
    stats: { hp: 105, attack: 150, defense: 90, spAttack: 150, spDefense: 90, speed: 95 },
    evolution: { from: null, to: null, method: null },
    abilities: ["Air Locksmith"],
    height: 7.0,
    weight: 206.5,
    isLegendary: true,
    catchRate: 3
  }
];

// ── Format datasets as readable JS for Dataset tab ──────────────────────────

function formatDatasetDisplay() {
  const lines = [];

  // Types
  lines.push('const types = [');
  TYPES.forEach((t, i) => {
    lines.push('  {');
    lines.push(`    id: ${t.id},`);
    lines.push(`    name: "${t.name}",`);
    lines.push(`    color: "${t.color}",`);
    lines.push(`    strongAgainst: ${JSON.stringify(t.strongAgainst)},`);
    lines.push(`    weakAgainst: ${JSON.stringify(t.weakAgainst)},`);
    lines.push(`    immuneTo: ${JSON.stringify(t.immuneTo)}`);
    lines.push(`  }${i < TYPES.length - 1 ? ',' : ''}`);
  });
  lines.push('];');
  lines.push('');

  // Pokemans
  lines.push('const pokemon = [');
  POKEMON.forEach((p, i) => {
    lines.push('  {');
    lines.push(`    id: ${p.id},`);
    lines.push(`    name: "${p.name}",`);
    lines.push(`    types: ${JSON.stringify(p.types)},`);
    lines.push(`    generation: ${p.generation},`);
    lines.push(`    stats: { hp: ${p.stats.hp}, attack: ${p.stats.attack}, defense: ${p.stats.defense}, spAttack: ${p.stats.spAttack}, spDefense: ${p.stats.spDefense}, speed: ${p.stats.speed} },`);
    const evoFrom = p.evolution.from ? `"${p.evolution.from}"` : 'null';
    const evoTo = p.evolution.to ? `"${p.evolution.to}"` : 'null';
    const evoMethod = p.evolution.method ? `"${p.evolution.method}"` : 'null';
    lines.push(`    evolution: { from: ${evoFrom}, to: ${evoTo}, method: ${evoMethod} },`);
    lines.push(`    abilities: ${JSON.stringify(p.abilities)},`);
    lines.push(`    height: ${p.height},`);
    lines.push(`    weight: ${p.weight},`);
    lines.push(`    isLegendary: ${p.isLegendary},`);
    lines.push(`    catchRate: ${p.catchRate}`);
    lines.push(`  }${i < POKEMON.length - 1 ? ',' : ''}`);
  });
  lines.push('];');

  return lines.join('\n');
}

const DATASET_DISPLAY = formatDatasetDisplay();
const TYPES_JSON = JSON.stringify(TYPES);
const POKEMON_JSON = JSON.stringify(POKEMON);

// ── Helper ──────────────────────────────────────────────────────────────────

function esc(str) { return String(str).replace(/'/g, "\\'"); }

function tr(fnName, testBody) {
  return `(code) => {\n  const types = ${TYPES_JSON};\n  const pokemon = ${POKEMON_JSON};\n  const fn = new Function(code + '; return ${fnName};')();\n${testBody}\n}`;
}

// ── Exercise definitions ────────────────────────────────────────────────────

const exercises = [

  // ── T2 (6 exercises) ──────────────────────────────────────────────────────
  {
    id: 983,
    title: "Pokemans: Get All Names",
    tier: 2,
    category: ["api-data", "pokemans"],
    tags: ["arrays", "map", "api-data", "pokemans"],
    description: "Extract all Pokemans names from the dataset using the map method.",
    instructions: "Write a function called `getPokemonNames` that takes an array of Pokemans objects and returns an array of their names.\n\nExample:\n```\ngetPokemonNames(pokemon)\n// Returns: [\"Peek-at-chu\", \"Char-is-hard\", ...]\n```",
    starterCode: "// Return an array of all Pokemans names\nfunction getPokemonNames(pokemon) {\n  \n}",
    solution: "function getPokemonNames(pokemon) {\n  return pokemon.map(p => p.name);\n}",
    hints: [
      "Use .map() to transform each Pokemans object into just the name property.",
      "The callback is: `p => p.name`"
    ],
    resources: [{ label: "MDN: Array.prototype.map()", url: "/docs/mdn/array-map.html" }],
    testRunner: tr('getPokemonNames', [
      '  const result = fn(pokemon);',
      '  return [',
      '    { pass: Array.isArray(result), description: "Returns an array", got: typeof result },',
      '    { pass: result.length === 12, description: "Returns 12 names", got: String(result.length) },',
      '    { pass: result[0] === "Peek-at-chu", description: \'First is "Peek-at-chu"\', got: String(result[0]) },',
      '    { pass: result[11] === "Ray-quiz-a", description: \'Last is "Ray-quiz-a"\', got: String(result[11]) },',
      '    { pass: result.includes("Snore-lax"), description: \'Includes "Snore-lax"\', got: String(result.includes("Snore-lax")) },',
      '  ];',
    ].join('\n'))
  },
  {
    id: 984,
    title: "Pokemans: Filter Legendaries",
    tier: 2,
    category: ["api-data", "pokemans"],
    tags: ["arrays", "filter", "api-data", "pokemans"],
    description: "Filter to only legendary Pokemans.",
    instructions: "Write a function called `getLegendaries` that takes an array of Pokemans objects and returns only those where `isLegendary` is `true`.\n\nExample:\n```\ngetLegendaries(pokemon)\n// Returns: [{ name: \"Mew-Two-Shoes\", ... }, { name: \"Ray-quiz-a\", ... }]\n```",
    starterCode: "// Return only legendary Pokemans\nfunction getLegendaries(pokemon) {\n  \n}",
    solution: "function getLegendaries(pokemon) {\n  return pokemon.filter(p => p.isLegendary);\n}",
    hints: [
      "Use .filter() to keep only Pokemans where isLegendary is true.",
      "The boolean property works as the condition: `p => p.isLegendary`"
    ],
    resources: [{ label: "MDN: Array.prototype.filter()", url: "/docs/mdn/array-filter.html" }],
    testRunner: (() => {
      const legendCount = POKEMON.filter(p => p.isLegendary).length;
      return tr('getLegendaries', [
        '  const result = fn(pokemon);',
        '  return [',
        '    { pass: Array.isArray(result), description: "Returns an array", got: typeof result },',
        `    { pass: result.length === ${legendCount}, description: "${legendCount} Pokemans are legendary", got: String(result.length) },`,
        '    { pass: result.every(p => p.isLegendary === true), description: "All returned are legendary", got: String(result.every(p => p.isLegendary)) },',
        '    { pass: result.find(p => p.name === "Mew-Two-Shoes"), description: \'Includes "Mew-Two-Shoes"\', got: String(!!result.find(p => p.name === "Mew-Two-Shoes")) },',
        '  ];',
      ].join('\n'));
    })()
  },
  {
    id: 985,
    title: "Pokemans: Get Type Names",
    tier: 2,
    category: ["api-data", "pokemans"],
    tags: ["arrays", "map", "api-data", "pokemans"],
    description: "Extract all type names from the types dataset.",
    instructions: "Write a function called `getTypeNames` that takes an array of type objects and returns an array of their names.\n\nExample:\n```\ngetTypeNames(types)\n// Returns: [\"fire\", \"water\", \"grass\", ...]\n```",
    starterCode: "// Return an array of all type names\nfunction getTypeNames(types) {\n  \n}",
    solution: "function getTypeNames(types) {\n  return types.map(t => t.name);\n}",
    hints: [
      "Use .map() to transform each type object into just the name property.",
      "The callback is: `t => t.name`"
    ],
    resources: [{ label: "MDN: Array.prototype.map()", url: "/docs/mdn/array-map.html" }],
    testRunner: tr('getTypeNames', [
      '  const result = fn(types);',
      '  return [',
      '    { pass: Array.isArray(result), description: "Returns an array", got: typeof result },',
      '    { pass: result.length === 9, description: "Returns 9 type names", got: String(result.length) },',
      '    { pass: result[0] === "fire", description: \'First type is "fire"\', got: String(result[0]) },',
      '    { pass: result.includes("dragon"), description: \'Includes "dragon"\', got: String(result.includes("dragon")) },',
      '    { pass: result.includes("ghost"), description: \'Includes "ghost"\', got: String(result.includes("ghost")) },',
      '  ];',
    ].join('\n'))
  },
  {
    id: 986,
    title: "Pokemans: Get Base Stats",
    tier: 2,
    category: ["api-data", "pokemans"],
    tags: ["arrays", "map", "nested-access", "api-data", "pokemans"],
    description: "Extract names and HP from nested stat objects.",
    instructions: "Write a function called `getBaseHP` that takes an array of Pokemans objects and returns an array of objects with `name` and `hp` properties.\n\nEach Pokemans has a `stats` object with an `hp` property.\n\nExample:\n```\ngetBaseHP(pokemon)\n// Returns: [{ name: \"Peek-at-chu\", hp: 35 }, ...]\n```",
    starterCode: "// Return an array of { name, hp } objects\nfunction getBaseHP(pokemon) {\n  \n}",
    solution: "function getBaseHP(pokemon) {\n  return pokemon.map(p => ({ name: p.name, hp: p.stats.hp }));\n}",
    hints: [
      "Use .map() to build new objects with name and hp from the nested stats object.",
      "Return an object literal: `p => ({ name: p.name, hp: p.stats.hp })`"
    ],
    resources: [{ label: "MDN: Array.prototype.map()", url: "/docs/mdn/array-map.html" }],
    testRunner: tr('getBaseHP', [
      '  const result = fn(pokemon);',
      '  return [',
      '    { pass: Array.isArray(result), description: "Returns an array", got: typeof result },',
      '    { pass: result.length === 12, description: "Returns 12 entries", got: String(result.length) },',
      '    { pass: result[0] && result[0].name === "Peek-at-chu" && result[0].hp === 35, description: "Peek-at-chu has 35 HP", got: result[0] ? JSON.stringify(result[0]) : "undefined" },',
      '    { pass: result[7] && result[7].name === "Snore-lax" && result[7].hp === 160, description: "Snore-lax has 160 HP", got: result[7] ? JSON.stringify(result[7]) : "undefined" },',
      '    { pass: result[0] && Object.keys(result[0]).length === 2, description: "Each entry has exactly 2 properties", got: result[0] ? String(Object.keys(result[0]).length) : "undefined" },',
      '  ];',
    ].join('\n'))
  },
  {
    id: 987,
    title: "Pokemans: Filter by Type",
    tier: 2,
    category: ["api-data", "pokemans"],
    tags: ["arrays", "filter", "includes", "api-data", "pokemans"],
    description: "Filter Pokemans that have a specific type.",
    instructions: "Write a function called `filterByType` that takes an array of Pokemans objects and a type string, and returns Pokemans whose `types` array includes that type.\n\nExample:\n```\nfilterByType(pokemon, \"dragon\")\n// Returns Pokemans with \"dragon\" in their types array\n```",
    starterCode: "// Return Pokemans that have the given type\nfunction filterByType(pokemon, type) {\n  \n}",
    solution: "function filterByType(pokemon, type) {\n  return pokemon.filter(p => p.types.includes(type));\n}",
    hints: [
      "Use .filter() with .includes() to check each Pokemans's types array.",
      "The condition: `p => p.types.includes(type)`"
    ],
    resources: [
      { label: "MDN: Array.prototype.filter()", url: "/docs/mdn/array-filter.html" },
      { label: "MDN: Array.prototype.includes()", url: "/docs/mdn/array-includes.html" }
    ],
    testRunner: (() => {
      const dragonCount = POKEMON.filter(p => p.types.includes('dragon')).length;
      const waterCount = POKEMON.filter(p => p.types.includes('water')).length;
      return tr('filterByType', [
        '  const dragon = fn(pokemon, "dragon");',
        '  const water = fn(pokemon, "water");',
        '  const ice = fn(pokemon, "ice");',
        '  return [',
        '    { pass: Array.isArray(dragon), description: "Returns an array", got: typeof dragon },',
        `    { pass: dragon.length === ${dragonCount}, description: "${dragonCount} Pokemans have the dragon type", got: String(dragon.length) },`,
        `    { pass: water.length === ${waterCount}, description: "${waterCount} Pokemans have the water type", got: String(water.length) },`,
        '    { pass: ice.length === 0, description: "0 Pokemans have the ice type", got: String(ice.length) },',
        '    { pass: dragon.every(p => p.types.includes("dragon")), description: "All returned dragons have dragon type", got: String(dragon.every(p => p.types.includes("dragon"))) },',
        '  ];',
      ].join('\n'));
    })()
  },
  {
    id: 988,
    title: "Pokemans: Filter by Generation",
    tier: 2,
    category: ["api-data", "pokemans"],
    tags: ["arrays", "filter", "comparison", "api-data", "pokemans"],
    description: "Filter Pokemans from a specific generation.",
    instructions: "Write a function called `filterByGeneration` that takes an array of Pokemans objects and a generation number, and returns Pokemans from that generation.\n\nExample:\n```\nfilterByGeneration(pokemon, 1)\n// Returns all Gen 1 Pokemans\n```",
    starterCode: "// Return Pokemans from the given generation\nfunction filterByGeneration(pokemon, gen) {\n  \n}",
    solution: "function filterByGeneration(pokemon, gen) {\n  return pokemon.filter(p => p.generation === gen);\n}",
    hints: [
      "Use .filter() with a strict equality check on the generation property.",
      "The condition: `p => p.generation === gen`"
    ],
    resources: [{ label: "MDN: Array.prototype.filter()", url: "/docs/mdn/array-filter.html" }],
    testRunner: (() => {
      const gen1 = POKEMON.filter(p => p.generation === 1).length;
      const gen4 = POKEMON.filter(p => p.generation === 4).length;
      return tr('filterByGeneration', [
        '  const g1 = fn(pokemon, 1);',
        '  const g4 = fn(pokemon, 4);',
        '  const g5 = fn(pokemon, 5);',
        '  return [',
        '    { pass: Array.isArray(g1), description: "Returns an array", got: typeof g1 },',
        `    { pass: g1.length === ${gen1}, description: "${gen1} Pokemans are Gen 1", got: String(g1.length) },`,
        `    { pass: g4.length === ${gen4}, description: "${gen4} Pokemans are Gen 4", got: String(g4.length) },`,
        '    { pass: g5.length === 0, description: "0 Pokemans are Gen 5", got: String(g5.length) },',
        '    { pass: g1.every(p => p.generation === 1), description: "All returned Gen 1 Pokemans have generation 1", got: String(g1.every(p => p.generation === 1)) },',
        '  ];',
      ].join('\n'));
    })()
  },

  // ── T3 (7 exercises) ──────────────────────────────────────────────────────
  {
    id: 989,
    title: "Pokemans: Total Base Stats",
    tier: 3,
    category: ["api-data", "pokemans"],
    tags: ["arrays", "map", "reduce", "nested-access", "api-data", "pokemans"],
    description: "Calculate the total base stat (BST) for each Pokemans.",
    instructions: "Write a function called `getBaseTotals` that takes an array of Pokemans objects and returns an array of objects with `name` and `bst` (base stat total) properties. The BST is the sum of hp, attack, defense, spAttack, spDefense, and speed.\n\nSort by `bst` descending.\n\nExample:\n```\ngetBaseTotals(pokemon)\n// Returns: [{ name: \"Ray-quiz-a\", bst: 680 }, { name: \"Mew-Two-Shoes\", bst: 680 }, ...]\n```",
    starterCode: "/**\n * @param {Object[]} pokemon - Array of Pokemans objects\n * @returns {Object[]} Array of { name, bst } sorted by bst descending\n */\nfunction getBaseTotals(pokemon) {\n  \n}",
    solution: "function getBaseTotals(pokemon) {\n  return pokemon.map(p => ({\n    name: p.name,\n    bst: p.stats.hp + p.stats.attack + p.stats.defense + p.stats.spAttack + p.stats.spDefense + p.stats.speed\n  })).sort((a, b) => b.bst - a.bst);\n}",
    hints: [
      "Use .map() to build objects with name and bst. Sum all six stat values for each Pokemans.",
      "Sum stats: `p.stats.hp + p.stats.attack + p.stats.defense + p.stats.spAttack + p.stats.spDefense + p.stats.speed`. Chain .sort() descending."
    ],
    resources: [
      { label: "MDN: Array.prototype.map()", url: "/docs/mdn/array-map.html" },
      { label: "MDN: Array.prototype.sort()", url: "/docs/mdn/array-sort.html" }
    ],
    testRunner: (() => {
      const sorted = POKEMON.map(p => ({
        name: p.name,
        bst: p.stats.hp + p.stats.attack + p.stats.defense + p.stats.spAttack + p.stats.spDefense + p.stats.speed
      })).sort((a, b) => b.bst - a.bst);
      return tr('getBaseTotals', [
        '  const result = fn(pokemon);',
        '  return [',
        '    { pass: Array.isArray(result) && result.length === 12, description: "Returns array of 12 entries", got: Array.isArray(result) ? String(result.length) : typeof result },',
        `    { pass: result[0] && result[0].bst === ${sorted[0].bst}, description: "Highest BST is ${sorted[0].bst}", got: result[0] ? String(result[0].bst) : "undefined" },`,
        `    { pass: result[0] && result[0].name === "${esc(sorted[0].name)}", description: 'Top BST: "${esc(sorted[0].name)}"', got: result[0] ? result[0].name : "undefined" },`,
        `    { pass: result[11] && result[11].bst === ${sorted[11].bst}, description: "Lowest BST is ${sorted[11].bst}", got: result[11] ? String(result[11].bst) : "undefined" },`,
        '    { pass: result[0] && Object.keys(result[0]).length === 2, description: "Each entry has name and bst", got: result[0] ? String(Object.keys(result[0]).length) : "undefined" },',
        '  ];',
      ].join('\n'));
    })()
  },
  {
    id: 990,
    title: "Pokemans: Type Advantages",
    tier: 3,
    category: ["api-data", "pokemans"],
    tags: ["arrays", "find", "cross-reference", "api-data", "pokemans"],
    description: "Find what types a Pokemans is strong against using cross-referencing.",
    instructions: "Write a function called `getAdvantages` that takes the `types` array, the `pokemon` array, and a Pokemans name. Return a sorted array of all unique type names that the Pokemans's types are strong against.\n\nLook up each of the Pokemans's types in the types dataset and collect their `strongAgainst` arrays.\n\nReturn an empty array if the Pokemans is not found.\n\nExample:\n```\ngetAdvantages(types, pokemon, \"Peek-at-chu\")\n// Returns: [\"flying\", \"water\"] (electric is strong against water and flying)\n```",
    starterCode: "/**\n * @param {Object[]} types - Array of type objects\n * @param {Object[]} pokemon - Array of Pokemans objects\n * @param {string} name - Pokemans name\n * @returns {string[]} Sorted unique types the Pokemans is strong against\n */\nfunction getAdvantages(types, pokemon, name) {\n  \n}",
    solution: "function getAdvantages(types, pokemon, name) {\n  const mon = pokemon.find(p => p.name === name);\n  if (!mon) return [];\n  const advantages = mon.types.flatMap(typeName => {\n    const typeData = types.find(t => t.name === typeName);\n    return typeData ? typeData.strongAgainst : [];\n  });\n  return [...new Set(advantages)].sort();\n}",
    hints: [
      "Find the Pokemans by name, then for each of its types, look up the type in the types array and collect the strongAgainst values.",
      "Use .flatMap() to gather all advantages, then deduplicate with `[...new Set(array)]` and .sort()."
    ],
    resources: [
      { label: "MDN: Array.prototype.find()", url: "/docs/mdn/array-find.html" },
      { label: "MDN: Array.prototype.flatMap()", url: "/docs/mdn/array-flatmap.html" }
    ],
    testRunner: (() => {
      function getAdv(name) {
        const mon = POKEMON.find(p => p.name === name);
        if (!mon) return [];
        const adv = mon.types.flatMap(tn => { const td = TYPES.find(t => t.name === tn); return td ? td.strongAgainst : []; });
        return [...new Set(adv)].sort();
      }
      const pikaAdv = getAdv("Peek-at-chu");
      const charAdv = getAdv("Char-is-hard");
      return tr('getAdvantages', [
        '  const pika = fn(types, pokemon, "Peek-at-chu");',
        '  const char = fn(types, pokemon, "Char-is-hard");',
        '  const nobody = fn(types, pokemon, "Missing-no");',
        '  return [',
        '    { pass: Array.isArray(pika), description: "Returns an array", got: typeof pika },',
        `    { pass: JSON.stringify(pika) === '${JSON.stringify(pikaAdv)}', description: 'Peek-at-chu advantages: ${JSON.stringify(pikaAdv)}', got: JSON.stringify(pika) },`,
        `    { pass: char.length === ${charAdv.length}, description: "Char-is-hard (fire+dragon) has ${charAdv.length} advantages", got: String(char.length) },`,
        '    { pass: nobody.length === 0, description: "Returns empty for unknown Pokemans", got: String(nobody.length) },',
        `    { pass: new Set(char).size === char.length, description: "No duplicates in results", got: "unique: " + new Set(char).size + ", total: " + char.length },`,
        '  ];',
      ].join('\n'));
    })()
  },
  {
    id: 991,
    title: "Pokemans: Fastest by Type",
    tier: 3,
    category: ["api-data", "pokemans"],
    tags: ["arrays", "filter", "reduce", "nested-access", "api-data", "pokemans"],
    description: "Find the fastest Pokemans of a given type.",
    instructions: "Write a function called `fastestOfType` that takes the `pokemon` array and a type string, and returns the name of the Pokemans with the highest `stats.speed` that has that type.\n\nReturn `null` if no Pokemans have that type.\n\nExample:\n```\nfastestOfType(pokemon, \"water\") // Returns: \"Gren-ninja Turtle\"\n```",
    starterCode: "/**\n * @param {Object[]} pokemon - Array of Pokemans objects\n * @param {string} type - Type to search for\n * @returns {string|null} Name of fastest Pokemans of that type\n */\nfunction fastestOfType(pokemon, type) {\n  \n}",
    solution: "function fastestOfType(pokemon, type) {\n  const ofType = pokemon.filter(p => p.types.includes(type));\n  if (ofType.length === 0) return null;\n  return ofType.reduce((fastest, p) => p.stats.speed > fastest.stats.speed ? p : fastest).name;\n}",
    hints: [
      "First .filter() to Pokemans of that type, then use .reduce() to find the one with highest speed.",
      "Chain: `.reduce((fastest, p) => p.stats.speed > fastest.stats.speed ? p : fastest).name`"
    ],
    resources: [
      { label: "MDN: Array.prototype.filter()", url: "/docs/mdn/array-filter.html" },
      { label: "MDN: Array.prototype.reduce()", url: "/docs/mdn/array-reduce.html" }
    ],
    testRunner: (() => {
      function fastest(type) {
        const of = POKEMON.filter(p => p.types.includes(type));
        if (of.length === 0) return null;
        return of.reduce((f, p) => p.stats.speed > f.stats.speed ? p : f).name;
      }
      return tr('fastestOfType', [
        '  const water = fn(pokemon, "water");',
        '  const dragon = fn(pokemon, "dragon");',
        '  const ice = fn(pokemon, "ice");',
        '  return [',
        `    { pass: water === "${fastest('water')}", description: 'Fastest water type: "${esc(fastest('water'))}"', got: String(water) },`,
        `    { pass: dragon === "${fastest('dragon')}", description: 'Fastest dragon type: "${esc(fastest('dragon'))}"', got: String(dragon) },`,
        '    { pass: ice === null, description: "Returns null for type with no Pokemans", got: String(ice) },',
        '  ];',
      ].join('\n'));
    })()
  },
  {
    id: 992,
    title: "Pokemans: Evolution Chains",
    tier: 3,
    category: ["api-data", "pokemans"],
    tags: ["arrays", "filter", "map", "nested-access", "api-data", "pokemans"],
    description: "Find all Pokemans that can still evolve.",
    instructions: "Write a function called `canEvolve` that takes an array of Pokemans objects and returns an array of objects with `name`, `evolvesTo`, and `method` for Pokemans whose `evolution.to` is not null.\n\nSort alphabetically by name.\n\nExample:\n```\ncanEvolve(pokemon)\n// Returns: [{ name: \"Bulb-is-sore\", evolvesTo: \"Ivy-sore\", method: \"Level 16\" }, ...]\n```",
    starterCode: "/**\n * @param {Object[]} pokemon - Array of Pokemans objects\n * @returns {Object[]} Pokemans that can evolve, sorted by name\n */\nfunction canEvolve(pokemon) {\n  \n}",
    solution: "function canEvolve(pokemon) {\n  return pokemon\n    .filter(p => p.evolution.to !== null)\n    .map(p => ({ name: p.name, evolvesTo: p.evolution.to, method: p.evolution.method }))\n    .sort((a, b) => a.name.localeCompare(b.name));\n}",
    hints: [
      "Chain .filter() to keep Pokemans with non-null evolution.to, then .map() to build output objects, then .sort() by name.",
      "Access nested evolution data: `p.evolution.to` and `p.evolution.method`. Use .localeCompare() for alphabetical sorting."
    ],
    resources: [
      { label: "MDN: Array.prototype.filter()", url: "/docs/mdn/array-filter.html" },
      { label: "MDN: String.prototype.localeCompare()", url: "/docs/mdn/string-localecompare.html" }
    ],
    testRunner: (() => {
      const evolvable = POKEMON
        .filter(p => p.evolution.to !== null)
        .map(p => ({ name: p.name, evolvesTo: p.evolution.to, method: p.evolution.method }))
        .sort((a, b) => a.name.localeCompare(b.name));
      return tr('canEvolve', [
        '  const result = fn(pokemon);',
        '  return [',
        '    { pass: Array.isArray(result), description: "Returns an array", got: typeof result },',
        `    { pass: result.length === ${evolvable.length}, description: "${evolvable.length} Pokemans can evolve", got: String(result.length) },`,
        `    { pass: result[0] && result[0].name === "${esc(evolvable[0].name)}", description: 'First alphabetically: "${esc(evolvable[0].name)}"', got: result[0] ? result[0].name : "undefined" },`,
        `    { pass: result[0] && result[0].evolvesTo === "${evolvable[0].evolvesTo}", description: '${esc(evolvable[0].name)} evolves to "${evolvable[0].evolvesTo}"', got: result[0] ? result[0].evolvesTo : "undefined" },`,
        '    { pass: !result.find(r => r.name === "Mew-Two-Shoes"), description: "Mew-Two-Shoes cannot evolve (excluded)", got: String(!result.find(r => r.name === "Mew-Two-Shoes")) },',
        '  ];',
      ].join('\n'));
    })()
  },
  {
    id: 993,
    title: "Pokemans: Average Stats by Type",
    tier: 3,
    category: ["api-data", "pokemans"],
    tags: ["arrays", "reduce", "nested-access", "aggregation", "api-data", "pokemans"],
    description: "Calculate average base stats for Pokemans of a given type.",
    instructions: "Write a function called `avgStatsByType` that takes the `pokemon` array and a type string, and returns an object with the average of each stat (`hp`, `attack`, `defense`, `spAttack`, `spDefense`, `speed`), all rounded to 1 decimal place.\n\nReturn `null` if no Pokemans match the type.\n\nExample:\n```\navgStatsByType(pokemon, \"electric\")\n// Returns: { hp: 35, attack: 55, defense: 40, spAttack: 50, spDefense: 50, speed: 90 }\n```",
    starterCode: "/**\n * @param {Object[]} pokemon - Array of Pokemans objects\n * @param {string} type - Type to filter by\n * @returns {Object|null} Average stats object or null\n */\nfunction avgStatsByType(pokemon, type) {\n  \n}",
    solution: "function avgStatsByType(pokemon, type) {\n  const ofType = pokemon.filter(p => p.types.includes(type));\n  if (ofType.length === 0) return null;\n  const len = ofType.length;\n  return {\n    hp: Math.round(ofType.reduce((s, p) => s + p.stats.hp, 0) / len * 10) / 10,\n    attack: Math.round(ofType.reduce((s, p) => s + p.stats.attack, 0) / len * 10) / 10,\n    defense: Math.round(ofType.reduce((s, p) => s + p.stats.defense, 0) / len * 10) / 10,\n    spAttack: Math.round(ofType.reduce((s, p) => s + p.stats.spAttack, 0) / len * 10) / 10,\n    spDefense: Math.round(ofType.reduce((s, p) => s + p.stats.spDefense, 0) / len * 10) / 10,\n    speed: Math.round(ofType.reduce((s, p) => s + p.stats.speed, 0) / len * 10) / 10\n  };\n}",
    hints: [
      "Filter to the type first, then use .reduce() for each stat to sum values, divide by count, and round.",
      "Round to 1 decimal: `Math.round(sum / count * 10) / 10`. Repeat for all 6 stats."
    ],
    resources: [{ label: "MDN: Array.prototype.reduce()", url: "/docs/mdn/array-reduce.html" }],
    testRunner: (() => {
      function avg(type) {
        const of = POKEMON.filter(p => p.types.includes(type));
        if (of.length === 0) return null;
        const l = of.length;
        const r = v => Math.round(v / l * 10) / 10;
        return {
          hp: r(of.reduce((s, p) => s + p.stats.hp, 0)),
          attack: r(of.reduce((s, p) => s + p.stats.attack, 0)),
          defense: r(of.reduce((s, p) => s + p.stats.defense, 0)),
          spAttack: r(of.reduce((s, p) => s + p.stats.spAttack, 0)),
          spDefense: r(of.reduce((s, p) => s + p.stats.spDefense, 0)),
          speed: r(of.reduce((s, p) => s + p.stats.speed, 0)),
        };
      }
      const dragon = avg('dragon');
      const water = avg('water');
      return tr('avgStatsByType', [
        '  const dragon = fn(pokemon, "dragon");',
        '  const water = fn(pokemon, "water");',
        '  const ice = fn(pokemon, "ice");',
        '  return [',
        '    { pass: typeof dragon === "object" && dragon !== null, description: "Returns an object for dragon type", got: typeof dragon },',
        `    { pass: dragon && dragon.attack === ${dragon.attack}, description: "Dragon avg attack is ${dragon.attack}", got: dragon ? String(dragon.attack) : "undefined" },`,
        `    { pass: dragon && dragon.speed === ${dragon.speed}, description: "Dragon avg speed is ${dragon.speed}", got: dragon ? String(dragon.speed) : "undefined" },`,
        `    { pass: water && water.hp === ${water.hp}, description: "Water avg HP is ${water.hp}", got: water ? String(water.hp) : "undefined" },`,
        '    { pass: ice === null, description: "Returns null for type with no Pokemans", got: String(ice) },',
        '  ];',
      ].join('\n'));
    })()
  },
  {
    id: 994,
    title: "Pokemans: Unique Abilities",
    tier: 3,
    category: ["api-data", "pokemans"],
    tags: ["arrays", "flatMap", "set", "api-data", "pokemans"],
    description: "Extract all unique abilities from across all Pokemans.",
    instructions: "Write a function called `getAllAbilities` that takes an array of Pokemans objects and returns a sorted array of all unique ability strings found across all Pokemans.\n\nExample:\n```\ngetAllAbilities(pokemon)\n// Returns: [\"Air Locksmith\", \"Blaze-r\", \"Chlorophyll-ing\", ...]\n```",
    starterCode: "/**\n * @param {Object[]} pokemon - Array of Pokemans objects\n * @returns {string[]} Sorted array of unique abilities\n */\nfunction getAllAbilities(pokemon) {\n  \n}",
    solution: "function getAllAbilities(pokemon) {\n  return [...new Set(pokemon.flatMap(p => p.abilities))].sort();\n}",
    hints: [
      "Use .flatMap() to gather all abilities into one array, then remove duplicates and sort.",
      "`[...new Set(pokemon.flatMap(p => p.abilities))].sort()` does all three steps."
    ],
    resources: [
      { label: "MDN: Array.prototype.flatMap()", url: "/docs/mdn/array-flatmap.html" },
      { label: "MDN: Set", url: "/docs/mdn/set.html" }
    ],
    testRunner: (() => {
      const abilities = [...new Set(POKEMON.flatMap(p => p.abilities))].sort();
      return tr('getAllAbilities', [
        '  const result = fn(pokemon);',
        '  return [',
        '    { pass: Array.isArray(result), description: "Returns an array", got: typeof result },',
        `    { pass: result.length === ${abilities.length}, description: "${abilities.length} unique abilities", got: String(result.length) },`,
        `    { pass: result[0] === "${abilities[0]}", description: 'First alphabetically: "${esc(abilities[0])}"', got: String(result[0]) },`,
        '    { pass: result.includes("Torrent-ial"), description: \'Includes "Torrent-ial"\', got: String(result.includes("Torrent-ial")) },',
        `    { pass: new Set(result).size === result.length, description: "All abilities are unique", got: "unique: " + new Set(result).size + ", total: " + result.length },`,
        '  ];',
      ].join('\n'));
    })()
  },

  // ── T4 (4 exercises) ──────────────────────────────────────────────────────
  {
    id: 995,
    title: "Pokemans: Type Coverage Report",
    tier: 4,
    category: ["api-data", "pokemans"],
    tags: ["arrays", "reduce", "cross-reference", "data-transformation", "api-data", "pokemans"],
    description: "Build a type coverage report for each Pokemans using both datasets.",
    instructions: "Write a function called `typeCoverage` that takes the `types` and `pokemon` arrays and returns an array of objects, one per Pokemans, with:\n- `name`: Pokemans name\n- `types`: the Pokemans's type names\n- `strongAgainst`: sorted unique array of types this Pokemans is strong against (from its types' `strongAgainst`)\n- `weakAgainst`: sorted unique array of types that resist this Pokemans's attacks (from its types' `weakAgainst`)\n- `coverageScore`: number of types in strongAgainst minus number of types in weakAgainst\n\nSort by `coverageScore` descending.\n\nExample:\n```\ntypeCoverage(types, pokemon)\n// Returns: [{ name: \"Drag-on-ite\", types: [\"dragon\", \"fighting\"], strongAgainst: [...], ... }, ...]\n```",
    starterCode: "",
    solution: "function typeCoverage(types, pokemon) {\n  return pokemon.map(p => {\n    const strong = [...new Set(p.types.flatMap(tn => {\n      const td = types.find(t => t.name === tn);\n      return td ? td.strongAgainst : [];\n    }))].sort();\n    const weak = [...new Set(p.types.flatMap(tn => {\n      const td = types.find(t => t.name === tn);\n      return td ? td.weakAgainst : [];\n    }))].sort();\n    return {\n      name: p.name,\n      types: p.types,\n      strongAgainst: strong,\n      weakAgainst: weak,\n      coverageScore: strong.length - weak.length\n    };\n  }).sort((a, b) => b.coverageScore - a.coverageScore);\n}",
    hints: [
      "For each Pokemans, look up each of its types in the types array. Collect all strongAgainst and weakAgainst values, deduplicate, sort.",
      "CoverageScore is simply strongAgainst.length - weakAgainst.length. Sort the final array by this score descending."
    ],
    resources: [
      { label: "MDN: Array.prototype.flatMap()", url: "/docs/mdn/array-flatmap.html" },
      { label: "MDN: Set", url: "/docs/mdn/set.html" }
    ],
    testRunner: (() => {
      const report = POKEMON.map(p => {
        const strong = [...new Set(p.types.flatMap(tn => { const td = TYPES.find(t => t.name === tn); return td ? td.strongAgainst : []; }))].sort();
        const weak = [...new Set(p.types.flatMap(tn => { const td = TYPES.find(t => t.name === tn); return td ? td.weakAgainst : []; }))].sort();
        return { name: p.name, types: p.types, strongAgainst: strong, weakAgainst: weak, coverageScore: strong.length - weak.length };
      }).sort((a, b) => b.coverageScore - a.coverageScore);
      return tr('typeCoverage', [
        '  const result = fn(types, pokemon);',
        '  return [',
        '    { pass: Array.isArray(result) && result.length === 12, description: "Returns array of 12 reports", got: Array.isArray(result) ? String(result.length) : typeof result },',
        `    { pass: result[0] && result[0].name === "${esc(report[0].name)}", description: 'Best coverage: "${esc(report[0].name)}" (score ${report[0].coverageScore})', got: result[0] ? result[0].name + " (" + result[0].coverageScore + ")" : "undefined" },`,
        `    { pass: result[0] && result[0].coverageScore === ${report[0].coverageScore}, description: "Top coverageScore is ${report[0].coverageScore}", got: result[0] ? String(result[0].coverageScore) : "undefined" },`,
        `    { pass: result[0] && Array.isArray(result[0].strongAgainst) && result[0].strongAgainst.length === ${report[0].strongAgainst.length}, description: "Top Pokemans has ${report[0].strongAgainst.length} type advantages", got: result[0] && result[0].strongAgainst ? String(result[0].strongAgainst.length) : "undefined" },`,
        `    { pass: result[11] && result[11].coverageScore === ${report[11].coverageScore}, description: "Worst coverageScore is ${report[11].coverageScore}", got: result[11] ? String(result[11].coverageScore) : "undefined" },`,
        '  ];',
      ].join('\n'));
    })()
  },
  {
    id: 996,
    title: "Pokemans: Generation Summary",
    tier: 4,
    category: ["api-data", "pokemans"],
    tags: ["arrays", "reduce", "aggregation", "api-data", "pokemans"],
    description: "Build a summary for each generation with stats and type distribution.",
    instructions: "Write a function called `generationSummary` that takes an array of Pokemans objects and returns an object where each key is a generation number and the value is:\n- `count`: number of Pokemans in that generation\n- `avgBST`: average base stat total (rounded to nearest integer)\n- `types`: sorted array of unique types across all Pokemans in that generation\n- `legendaryCount`: number of legendary Pokemans in that generation\n\nExample:\n```\ngenerationSummary(pokemon)\n// Returns: { 1: { count: 8, avgBST: 518, types: [...], legendaryCount: 1 }, ... }\n```",
    starterCode: "",
    solution: "function generationSummary(pokemon) {\n  const result = {};\n  pokemon.forEach(p => {\n    const gen = p.generation;\n    if (!result[gen]) result[gen] = { count: 0, totalBST: 0, typeSet: new Set(), legendaryCount: 0 };\n    result[gen].count++;\n    result[gen].totalBST += p.stats.hp + p.stats.attack + p.stats.defense + p.stats.spAttack + p.stats.spDefense + p.stats.speed;\n    p.types.forEach(t => result[gen].typeSet.add(t));\n    if (p.isLegendary) result[gen].legendaryCount++;\n  });\n  Object.keys(result).forEach(gen => {\n    result[gen].avgBST = Math.round(result[gen].totalBST / result[gen].count);\n    result[gen].types = [...result[gen].typeSet].sort();\n    delete result[gen].totalBST;\n    delete result[gen].typeSet;\n  });\n  return result;\n}",
    hints: [
      "Group Pokemans by generation. For each group, accumulate count, total BST, types (Set), and legendary count.",
      "After grouping, compute avgBST by dividing totalBST by count and rounding. Convert the type Set to a sorted array."
    ],
    resources: [{ label: "MDN: Array.prototype.reduce()", url: "/docs/mdn/array-reduce.html" }],
    testRunner: (() => {
      const result = {};
      POKEMON.forEach(p => {
        const g = p.generation;
        if (!result[g]) result[g] = { count: 0, totalBST: 0, typeSet: new Set(), legendaryCount: 0 };
        result[g].count++;
        result[g].totalBST += p.stats.hp + p.stats.attack + p.stats.defense + p.stats.spAttack + p.stats.spDefense + p.stats.speed;
        p.types.forEach(t => result[g].typeSet.add(t));
        if (p.isLegendary) result[g].legendaryCount++;
      });
      Object.keys(result).forEach(g => {
        result[g].avgBST = Math.round(result[g].totalBST / result[g].count);
        result[g].types = [...result[g].typeSet].sort();
        delete result[g].totalBST; delete result[g].typeSet;
      });
      const gen1 = result[1];
      const genCount = Object.keys(result).length;
      return tr('generationSummary', [
        '  const result = fn(pokemon);',
        '  return [',
        '    { pass: typeof result === "object" && !Array.isArray(result), description: "Returns an object", got: typeof result },',
        `    { pass: Object.keys(result).length === ${genCount}, description: "${genCount} generations represented", got: String(Object.keys(result).length) },`,
        `    { pass: result[1] && result[1].count === ${gen1.count}, description: "Gen 1 has ${gen1.count} Pokemans", got: result[1] ? String(result[1].count) : "undefined" },`,
        `    { pass: result[1] && result[1].avgBST === ${gen1.avgBST}, description: "Gen 1 avgBST is ${gen1.avgBST}", got: result[1] ? String(result[1].avgBST) : "undefined" },`,
        `    { pass: result[1] && result[1].legendaryCount === ${gen1.legendaryCount}, description: "Gen 1 has ${gen1.legendaryCount} legendary", got: result[1] ? String(result[1].legendaryCount) : "undefined" },`,
        `    { pass: result[1] && Array.isArray(result[1].types) && result[1].types.length === ${gen1.types.length}, description: "Gen 1 has ${gen1.types.length} unique types", got: result[1] && result[1].types ? String(result[1].types.length) : "undefined" },`,
        '  ];',
      ].join('\n'));
    })()
  },
  {
    id: 997,
    title: "Pokemans: Team Builder",
    tier: 4,
    category: ["api-data", "pokemans"],
    tags: ["arrays", "reduce", "cross-reference", "data-transformation", "api-data", "pokemans"],
    description: "Analyze a team of Pokemans for type coverage using both datasets.",
    instructions: "Write a function called `analyzeTeam` that takes the `types` array, the `pokemon` array, and an array of Pokemans names (the team). Return an object with:\n- `members`: array of `{ name, types }` for each team member\n- `totalBST`: sum of all team members' base stat totals\n- `typesCovered`: sorted unique array of all types the team is strong against\n- `weaknesses`: sorted unique array of all types that resist the team's attacks\n- `uncoveredTypes`: sorted array of type names from the types dataset that do NOT appear in `typesCovered`\n\nExample:\n```\nanalyzeTeam(types, pokemon, [\"Peek-at-chu\", \"Bulb-is-sore\"])\n// Returns: { members: [...], totalBST: 638, typesCovered: [...], ... }\n```",
    starterCode: "",
    solution: "function analyzeTeam(types, pokemon, teamNames) {\n  const team = teamNames.map(name => pokemon.find(p => p.name === name)).filter(Boolean);\n  const members = team.map(p => ({ name: p.name, types: p.types }));\n  const totalBST = team.reduce((sum, p) => sum + p.stats.hp + p.stats.attack + p.stats.defense + p.stats.spAttack + p.stats.spDefense + p.stats.speed, 0);\n  const typesCovered = [...new Set(team.flatMap(p => p.types.flatMap(tn => {\n    const td = types.find(t => t.name === tn);\n    return td ? td.strongAgainst : [];\n  })))].sort();\n  const weaknesses = [...new Set(team.flatMap(p => p.types.flatMap(tn => {\n    const td = types.find(t => t.name === tn);\n    return td ? td.weakAgainst : [];\n  })))].sort();\n  const allTypeNames = types.map(t => t.name);\n  const uncoveredTypes = allTypeNames.filter(t => !typesCovered.includes(t)).sort();\n  return { members, totalBST, typesCovered, weaknesses, uncoveredTypes };\n}",
    hints: [
      "Find each team member in the pokemon array. Collect all type advantages and weaknesses across the whole team using flatMap + Set.",
      "For uncoveredTypes, get all type names from the types array and filter out those already in typesCovered."
    ],
    resources: [
      { label: "MDN: Array.prototype.flatMap()", url: "/docs/mdn/array-flatmap.html" },
      { label: "MDN: Set", url: "/docs/mdn/set.html" }
    ],
    testRunner: (() => {
      function analyze(names) {
        const team = names.map(n => POKEMON.find(p => p.name === n)).filter(Boolean);
        const totalBST = team.reduce((s, p) => s + p.stats.hp + p.stats.attack + p.stats.defense + p.stats.spAttack + p.stats.spDefense + p.stats.speed, 0);
        const covered = [...new Set(team.flatMap(p => p.types.flatMap(tn => { const td = TYPES.find(t => t.name === tn); return td ? td.strongAgainst : []; })))].sort();
        const weak = [...new Set(team.flatMap(p => p.types.flatMap(tn => { const td = TYPES.find(t => t.name === tn); return td ? td.weakAgainst : []; })))].sort();
        const uncovered = TYPES.map(t => t.name).filter(t => !covered.includes(t)).sort();
        return { totalBST, typesCovered: covered, weaknesses: weak, uncoveredTypes: uncovered };
      }
      const duo = analyze(["Peek-at-chu", "Char-is-hard"]);
      const trio = analyze(["Peek-at-chu", "Squirrel", "Bulb-is-sore"]);
      return tr('analyzeTeam', [
        '  const duo = fn(types, pokemon, ["Peek-at-chu", "Char-is-hard"]);',
        '  const trio = fn(types, pokemon, ["Peek-at-chu", "Squirrel", "Bulb-is-sore"]);',
        '  return [',
        '    { pass: typeof duo === "object" && !Array.isArray(duo), description: "Returns an object", got: typeof duo },',
        '    { pass: duo.members && duo.members.length === 2, description: "Duo has 2 members", got: duo.members ? String(duo.members.length) : "undefined" },',
        `    { pass: duo.totalBST === ${duo.totalBST}, description: "Duo totalBST is ${duo.totalBST}", got: String(duo.totalBST) },`,
        `    { pass: duo.typesCovered && duo.typesCovered.length === ${duo.typesCovered.length}, description: "Duo covers ${duo.typesCovered.length} types", got: duo.typesCovered ? String(duo.typesCovered.length) : "undefined" },`,
        `    { pass: trio.totalBST === ${trio.totalBST}, description: "Trio totalBST is ${trio.totalBST}", got: String(trio.totalBST) },`,
        `    { pass: trio.uncoveredTypes && trio.uncoveredTypes.length === ${trio.uncoveredTypes.length}, description: "Trio leaves ${trio.uncoveredTypes.length} types uncovered", got: trio.uncoveredTypes ? String(trio.uncoveredTypes.length) : "undefined" },`,
        '  ];',
      ].join('\n'));
    })()
  },
  {
    id: 998,
    title: "Pokemans: Full Pokedex Analysis",
    tier: 4,
    category: ["api-data", "pokemans"],
    tags: ["arrays", "reduce", "cross-reference", "data-transformation", "aggregation", "api-data", "pokemans"],
    description: "Build a comprehensive Pokedex analysis from both datasets.",
    instructions: "Create a function called `pokedexAnalysis` that takes the `types` and `pokemon` arrays and returns an object with:\n- `totalPokemon`: number of Pokemans\n- `totalTypes`: number of types in the types dataset\n- `legendaryCount`: number of legendary Pokemans\n- `avgCatchRate`: average catch rate across all Pokemans (rounded to 1 decimal)\n- `heaviest`: `{ name, weight }` of the heaviest Pokemans\n- `tallest`: `{ name, height }` of the tallest Pokemans\n- `typeDistribution`: object mapping each type name to the count of Pokemans that have that type\n\nExample:\n```\npokedexAnalysis(types, pokemon)\n// Returns: { totalPokemon: 12, totalTypes: 9, ... }\n```",
    starterCode: "",
    solution: "function pokedexAnalysis(types, pokemon) {\n  const legendaryCount = pokemon.filter(p => p.isLegendary).length;\n  const avgCatchRate = Math.round(pokemon.reduce((s, p) => s + p.catchRate, 0) / pokemon.length * 10) / 10;\n  const heaviest = pokemon.reduce((h, p) => p.weight > h.weight ? p : h);\n  const tallest = pokemon.reduce((t, p) => p.height > t.height ? p : t);\n  const typeDistribution = {};\n  pokemon.forEach(p => p.types.forEach(t => { typeDistribution[t] = (typeDistribution[t] || 0) + 1; }));\n  return {\n    totalPokemon: pokemon.length,\n    totalTypes: types.length,\n    legendaryCount,\n    avgCatchRate,\n    heaviest: { name: heaviest.name, weight: heaviest.weight },\n    tallest: { name: tallest.name, height: tallest.height },\n    typeDistribution\n  };\n}",
    hints: [
      "Break into parts: count legendaries, average catch rates, find heaviest/tallest with .reduce(), build type distribution with forEach.",
      "For typeDistribution, loop through each Pokemans's types array and count occurrences using an object accumulator."
    ],
    resources: [{ label: "MDN: Array.prototype.reduce()", url: "/docs/mdn/array-reduce.html" }],
    testRunner: (() => {
      const legendCount = POKEMON.filter(p => p.isLegendary).length;
      const avgCR = Math.round(POKEMON.reduce((s, p) => s + p.catchRate, 0) / POKEMON.length * 10) / 10;
      const heaviest = POKEMON.reduce((h, p) => p.weight > h.weight ? p : h);
      const tallest = POKEMON.reduce((t, p) => p.height > t.height ? p : t);
      const typeDist = {};
      POKEMON.forEach(p => p.types.forEach(t => { typeDist[t] = (typeDist[t] || 0) + 1; }));
      const dragonCount = typeDist['dragon'] || 0;
      return tr('pokedexAnalysis', [
        '  const result = fn(types, pokemon);',
        '  return [',
        '    { pass: typeof result === "object" && !Array.isArray(result), description: "Returns an object", got: typeof result },',
        '    { pass: result.totalPokemon === 12 && result.totalTypes === 9, description: "totalPokemon: 12, totalTypes: 9", got: "pokemon: " + result.totalPokemon + ", types: " + result.totalTypes },',
        `    { pass: result.legendaryCount === ${legendCount}, description: "${legendCount} legendary Pokemans", got: String(result.legendaryCount) },`,
        `    { pass: result.avgCatchRate === ${avgCR}, description: "avgCatchRate is ${avgCR}", got: String(result.avgCatchRate) },`,
        `    { pass: result.heaviest && result.heaviest.name === "${esc(heaviest.name)}", description: 'Heaviest: "${esc(heaviest.name)}" (${heaviest.weight}kg)', got: result.heaviest ? result.heaviest.name : "undefined" },`,
        `    { pass: result.tallest && result.tallest.name === "${esc(tallest.name)}", description: 'Tallest: "${esc(tallest.name)}" (${tallest.height}m)', got: result.tallest ? result.tallest.name : "undefined" },`,
        `    { pass: result.typeDistribution && result.typeDistribution.dragon === ${dragonCount}, description: "${dragonCount} dragon-type Pokemans", got: result.typeDistribution ? String(result.typeDistribution.dragon) : "undefined" },`,
        '  ];',
      ].join('\n'));
    })()
  }
];

// ── Build collection JSON (append to existing) ─────────────────────────────

const BASE_POINTS = { 1: 10, 2: 25, 3: 50, 4: 100, 5: 200 };

const outPath = path.join(__dirname, 'pop-culture-apis.json');
const existing = JSON.parse(fs.readFileSync(outPath, 'utf-8'));

const newExercises = exercises.map(e => ({
  id: e.id,
  title: e.title,
  type: "js",
  tier: e.tier,
  category: e.category,
  tags: e.tags,
  description: e.description,
  instructions: e.instructions,
  starterCode: e.starterCode,
  solution: e.solution,
  testRunner: e.testRunner,
  testCases: [],
  dataset: DATASET_DISPLAY,
  hints: e.hints,
  resources: e.resources,
  solutionGate: 10,
  basePoints: BASE_POINTS[e.tier]
}));

existing.exerciseIds.push(...newExercises.map(e => e.id));
existing.exercises.push(...newExercises);

fs.writeFileSync(outPath, JSON.stringify(existing, null, 2));

console.log(`\nPop Culture APIs — Pokemans Theme 🐾`);
console.log(`=================================`);
console.log(`  Exercises: ${exercises.length}`);
console.log(`  T2: ${exercises.filter(e => e.tier === 2).length}`);
console.log(`  T3: ${exercises.filter(e => e.tier === 3).length}`);
console.log(`  T4: ${exercises.filter(e => e.tier === 4).length}`);
console.log(`  ID range: ${exercises[0].id}–${exercises[exercises.length - 1].id}`);
console.log(`  Pokemans: ${POKEMON.length}, Types: ${TYPES.length}`);
console.log(`  Appended to: ${outPath}`);
console.log(`  Total collection exercises: ${existing.exercises.length}`);
