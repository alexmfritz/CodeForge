/**
 * Generates the Star Wars theme exercises for the Pop Culture APIs collection.
 * Run: node exercises/collections/_generate_starwars.js
 * Reads existing pop-culture-apis.json and appends Star Wars exercises.
 */

const fs = require('fs');
const path = require('path');

// ── Planet Dataset (8 planets, punny parody names) ───────────────────────────

const PLANETS = [
  {
    id: 1,
    name: "Tatooweenie",
    climate: "arid",
    terrain: ["desert", "canyons"],
    population: 200000,
    diameter: 10465,
    orbitalPeriod: 304,
    moons: 3,
    faction: "neutral"
  },
  {
    id: 2,
    name: "Croissant",
    climate: "temperate",
    terrain: ["cityscape", "urban"],
    population: 1000000000000,
    diameter: 12240,
    orbitalPeriod: 368,
    moons: 4,
    faction: "Republic"
  },
  {
    id: 3,
    name: "Broth",
    climate: "frozen",
    terrain: ["tundra", "ice caves", "mountains"],
    population: 0,
    diameter: 7200,
    orbitalPeriod: 549,
    moons: 3,
    faction: "Rebel Alliance"
  },
  {
    id: 4,
    name: "Na-boo-hoo",
    climate: "temperate",
    terrain: ["grassy hills", "swamps", "forests"],
    population: 4500000000,
    diameter: 12120,
    orbitalPeriod: 312,
    moons: 3,
    faction: "Republic"
  },
  {
    id: 5,
    name: "Indoor",
    climate: "temperate",
    terrain: ["forests", "mountains", "lakes"],
    population: 30000000,
    diameter: 4900,
    orbitalPeriod: 402,
    moons: 0,
    faction: "Rebel Alliance"
  },
  {
    id: 6,
    name: "Cash-eeek",
    climate: "tropical",
    terrain: ["jungle", "forests", "beaches"],
    population: 45000000,
    diameter: 12765,
    orbitalPeriod: 381,
    moons: 3,
    faction: "Republic"
  },
  {
    id: 7,
    name: "Dago-blah",
    climate: "murky",
    terrain: ["swamps", "bogs", "jungle"],
    population: 0,
    diameter: 8900,
    orbitalPeriod: 341,
    moons: 1,
    faction: "neutral"
  },
  {
    id: 8,
    name: "All-the-rain",
    climate: "temperate",
    terrain: ["grasslands", "mountains"],
    population: 2000000000,
    diameter: 12500,
    orbitalPeriod: 364,
    moons: 1,
    faction: "Republic"
  }
];

// ── Character Dataset (12 characters, punny parody names) ────────────────────

const CHARACTERS = [
  {
    id: 1,
    name: "Luke Groundwalker",
    species: "Human",
    homeworldId: 1,
    faction: "Rebel Alliance",
    forceRating: 9,
    lightsaberColor: "green",
    rank: "Jedi Knight",
    height: 1.72,
    films: [4, 5, 6, 7, 8],
    credits: 2500,
    isJedi: true,
    isDroid: false
  },
  {
    id: 2,
    name: "Darth Tater",
    species: "Human",
    homeworldId: 1,
    faction: "Galactic Empire",
    forceRating: 10,
    lightsaberColor: "red",
    rank: "Sith Lord",
    height: 2.02,
    films: [3, 4, 5, 6],
    credits: 0,
    isJedi: false,
    isDroid: false
  },
  {
    id: 3,
    name: "Princess Lay-a",
    species: "Human",
    homeworldId: 8,
    faction: "Rebel Alliance",
    forceRating: 4,
    lightsaberColor: null,
    rank: "General",
    height: 1.50,
    films: [4, 5, 6, 7, 8, 9],
    credits: 18000,
    isJedi: false,
    isDroid: false
  },
  {
    id: 4,
    name: "Ham Solo",
    species: "Human",
    homeworldId: 2,
    faction: "Rebel Alliance",
    forceRating: 0,
    lightsaberColor: null,
    rank: "Captain",
    height: 1.80,
    films: [4, 5, 6, 7],
    credits: 35000,
    isJedi: false,
    isDroid: false
  },
  {
    id: 5,
    name: "Obi-Wan Can-Opener",
    species: "Human",
    homeworldId: 2,
    faction: "Rebel Alliance",
    forceRating: 9,
    lightsaberColor: "blue",
    rank: "Jedi Master",
    height: 1.82,
    films: [1, 2, 3, 4],
    credits: 5000,
    isJedi: true,
    isDroid: false
  },
  {
    id: 6,
    name: "Yoga",
    species: "Unknown",
    homeworldId: 7,
    faction: "Rebel Alliance",
    forceRating: 10,
    lightsaberColor: "green",
    rank: "Grand Master",
    height: 0.66,
    films: [1, 2, 3, 5, 6],
    credits: 100,
    isJedi: true,
    isDroid: false
  },
  {
    id: 7,
    name: "Chew-Tobacco",
    species: "Wookalar",
    homeworldId: 6,
    faction: "Rebel Alliance",
    forceRating: 0,
    lightsaberColor: null,
    rank: "First Mate",
    height: 2.28,
    films: [3, 4, 5, 6, 7],
    credits: 500,
    isJedi: false,
    isDroid: false
  },
  {
    id: 8,
    name: "R2-Detour",
    species: "Droid",
    homeworldId: 4,
    faction: "Rebel Alliance",
    forceRating: 0,
    lightsaberColor: null,
    rank: "Astromech",
    height: 0.96,
    films: [1, 2, 3, 4, 5, 6, 7],
    credits: 0,
    isJedi: false,
    isDroid: true
  },
  {
    id: 9,
    name: "Padme Am-a-Dollar",
    species: "Human",
    homeworldId: 4,
    faction: "Republic",
    forceRating: 0,
    lightsaberColor: null,
    rank: "Senator",
    height: 1.65,
    films: [1, 2, 3],
    credits: 45000,
    isJedi: false,
    isDroid: false
  },
  {
    id: 10,
    name: "Mannequin Groundwalker",
    species: "Human",
    homeworldId: 1,
    faction: "Galactic Empire",
    forceRating: 10,
    lightsaberColor: "blue",
    rank: "Jedi Knight",
    height: 1.88,
    films: [1, 2, 3],
    credits: 3000,
    isJedi: true,
    isDroid: false
  },
  {
    id: 11,
    name: "Boba Tea",
    species: "Human",
    homeworldId: 2,
    faction: "neutral",
    forceRating: 0,
    lightsaberColor: null,
    rank: "Bounty Hunter",
    height: 1.83,
    films: [2, 5, 6],
    credits: 50000,
    isJedi: false,
    isDroid: false
  },
  {
    id: 12,
    name: "Palpitate",
    species: "Human",
    homeworldId: 4,
    faction: "Galactic Empire",
    forceRating: 10,
    lightsaberColor: "red",
    rank: "Emperor",
    height: 1.73,
    films: [1, 2, 3, 5, 6, 9],
    credits: 999999,
    isJedi: false,
    isDroid: false
  }
];

// ── Format datasets as readable JS for Dataset tab ──────────────────────────

function formatDatasetDisplay() {
  const lines = [];

  // Planets
  lines.push('const planets = [');
  PLANETS.forEach((p, i) => {
    lines.push('  {');
    lines.push(`    id: ${p.id},`);
    lines.push(`    name: "${p.name}",`);
    lines.push(`    climate: "${p.climate}",`);
    lines.push(`    terrain: ${JSON.stringify(p.terrain)},`);
    lines.push(`    population: ${p.population},`);
    lines.push(`    diameter: ${p.diameter},`);
    lines.push(`    orbitalPeriod: ${p.orbitalPeriod},`);
    lines.push(`    moons: ${p.moons},`);
    lines.push(`    faction: "${p.faction}"`);
    lines.push(`  }${i < PLANETS.length - 1 ? ',' : ''}`);
  });
  lines.push('];');
  lines.push('');

  // Characters
  lines.push('const characters = [');
  CHARACTERS.forEach((c, i) => {
    lines.push('  {');
    lines.push(`    id: ${c.id},`);
    lines.push(`    name: "${c.name}",`);
    lines.push(`    species: "${c.species}",`);
    lines.push(`    homeworldId: ${c.homeworldId},`);
    lines.push(`    faction: "${c.faction}",`);
    lines.push(`    forceRating: ${c.forceRating},`);
    lines.push(`    lightsaberColor: ${c.lightsaberColor ? `"${c.lightsaberColor}"` : 'null'},`);
    lines.push(`    rank: "${c.rank}",`);
    lines.push(`    height: ${c.height},`);
    lines.push(`    films: ${JSON.stringify(c.films)},`);
    lines.push(`    credits: ${c.credits},`);
    lines.push(`    isJedi: ${c.isJedi},`);
    lines.push(`    isDroid: ${c.isDroid}`);
    lines.push(`  }${i < CHARACTERS.length - 1 ? ',' : ''}`);
  });
  lines.push('];');

  return lines.join('\n');
}

const DATASET_DISPLAY = formatDatasetDisplay();
const PLANETS_JSON = JSON.stringify(PLANETS);
const CHARACTERS_JSON = JSON.stringify(CHARACTERS);

// ── Helper ──────────────────────────────────────────────────────────────────

function esc(str) { return String(str).replace(/'/g, "\\'"); }

function tr(fnName, testBody) {
  return `(code) => {\n  const planets = ${PLANETS_JSON};\n  const characters = ${CHARACTERS_JSON};\n  const fn = new Function(code + '; return ${fnName};')();\n${testBody}\n}`;
}

// ── Exercise definitions ────────────────────────────────────────────────────

const exercises = [

  // ── T2 (6 exercises) ──────────────────────────────────────────────────────
  {
    id: 999,
    title: "Star Wars: Get Character Names",
    tier: 2,
    category: ["api-data", "star-wars"],
    tags: ["arrays", "map", "api-data", "star-wars"],
    description: "Extract all character names from the dataset.",
    instructions: "Write a function called `getCharacterNames` that takes an array of character objects and returns an array of their names.\n\nExample:\n```\ngetCharacterNames(characters)\n// Returns: [\"Luke Groundwalker\", \"Darth Tater\", ...]\n```",
    starterCode: "// Return an array of all character names\nfunction getCharacterNames(characters) {\n  \n}",
    solution: "function getCharacterNames(characters) {\n  return characters.map(c => c.name);\n}",
    hints: [
      "Use .map() to transform each character object into just the name property.",
      "The callback is: `c => c.name`"
    ],
    resources: [{ label: "MDN: Array.prototype.map()", url: "/docs/mdn/array-map.html" }],
    testRunner: tr('getCharacterNames', [
      '  const result = fn(characters);',
      '  return [',
      '    { pass: Array.isArray(result), description: "Returns an array", got: typeof result },',
      '    { pass: result.length === 12, description: "Returns 12 names", got: String(result.length) },',
      '    { pass: result[0] === "Luke Groundwalker", description: \'First is "Luke Groundwalker"\', got: String(result[0]) },',
      '    { pass: result[11] === "Palpitate", description: \'Last is "Palpitate"\', got: String(result[11]) },',
      '    { pass: result.includes("Ham Solo"), description: \'Includes "Ham Solo"\', got: String(result.includes("Ham Solo")) },',
      '  ];',
    ].join('\n'))
  },
  {
    id: 1000,
    title: "Star Wars: Filter Jedi",
    tier: 2,
    category: ["api-data", "star-wars"],
    tags: ["arrays", "filter", "api-data", "star-wars"],
    description: "Filter to only Jedi characters.",
    instructions: "Write a function called `getJedi` that takes an array of character objects and returns only those where `isJedi` is `true`.\n\nExample:\n```\ngetJedi(characters)\n// Returns: [{ name: \"Luke Groundwalker\", ... }, ...]\n```",
    starterCode: "// Return only Jedi characters\nfunction getJedi(characters) {\n  \n}",
    solution: "function getJedi(characters) {\n  return characters.filter(c => c.isJedi);\n}",
    hints: [
      "Use .filter() to keep only characters where isJedi is true.",
      "The boolean property works as the condition: `c => c.isJedi`"
    ],
    resources: [{ label: "MDN: Array.prototype.filter()", url: "/docs/mdn/array-filter.html" }],
    testRunner: (() => {
      const jediCount = CHARACTERS.filter(c => c.isJedi).length;
      return tr('getJedi', [
        '  const result = fn(characters);',
        '  return [',
        '    { pass: Array.isArray(result), description: "Returns an array", got: typeof result },',
        `    { pass: result.length === ${jediCount}, description: "${jediCount} characters are Jedi", got: String(result.length) },`,
        '    { pass: result.every(c => c.isJedi === true), description: "All returned are Jedi", got: String(result.every(c => c.isJedi)) },',
        '    { pass: result.find(c => c.name === "Luke Groundwalker"), description: \'Includes "Luke Groundwalker"\', got: String(!!result.find(c => c.name === "Luke Groundwalker")) },',
        '    { pass: !result.find(c => c.name === "Ham Solo"), description: \'Excludes "Ham Solo"\', got: String(!result.find(c => c.name === "Ham Solo")) },',
        '  ];',
      ].join('\n'));
    })()
  },
  {
    id: 1001,
    title: "Star Wars: Get Planet Names",
    tier: 2,
    category: ["api-data", "star-wars"],
    tags: ["arrays", "map", "api-data", "star-wars"],
    description: "Extract all planet names from the planets dataset.",
    instructions: "Write a function called `getPlanetNames` that takes an array of planet objects and returns an array of their names.\n\nExample:\n```\ngetPlanetNames(planets)\n// Returns: [\"Tatooweenie\", \"Croissant\", ...]\n```",
    starterCode: "// Return an array of all planet names\nfunction getPlanetNames(planets) {\n  \n}",
    solution: "function getPlanetNames(planets) {\n  return planets.map(p => p.name);\n}",
    hints: [
      "Use .map() to transform each planet object into just the name property.",
      "The callback is: `p => p.name`"
    ],
    resources: [{ label: "MDN: Array.prototype.map()", url: "/docs/mdn/array-map.html" }],
    testRunner: tr('getPlanetNames', [
      '  const result = fn(planets);',
      '  return [',
      '    { pass: Array.isArray(result), description: "Returns an array", got: typeof result },',
      '    { pass: result.length === 8, description: "Returns 8 planet names", got: String(result.length) },',
      '    { pass: result[0] === "Tatooweenie", description: \'First is "Tatooweenie"\', got: String(result[0]) },',
      '    { pass: result.includes("Croissant"), description: \'Includes "Croissant"\', got: String(result.includes("Croissant")) },',
      '    { pass: result.includes("Broth"), description: \'Includes "Broth"\', got: String(result.includes("Broth")) },',
      '  ];',
    ].join('\n'))
  },
  {
    id: 1002,
    title: "Star Wars: Filter by Faction",
    tier: 2,
    category: ["api-data", "star-wars"],
    tags: ["arrays", "filter", "comparison", "api-data", "star-wars"],
    description: "Filter characters by their faction.",
    instructions: "Write a function called `filterByFaction` that takes an array of character objects and a faction string, and returns characters that belong to that faction.\n\nExample:\n```\nfilterByFaction(characters, \"Rebel Alliance\")\n// Returns all Rebel Alliance characters\n```",
    starterCode: "// Return characters from the given faction\nfunction filterByFaction(characters, faction) {\n  \n}",
    solution: "function filterByFaction(characters, faction) {\n  return characters.filter(c => c.faction === faction);\n}",
    hints: [
      "Use .filter() with a strict equality check on the faction property.",
      "The condition: `c => c.faction === faction`"
    ],
    resources: [{ label: "MDN: Array.prototype.filter()", url: "/docs/mdn/array-filter.html" }],
    testRunner: (() => {
      const rebelCount = CHARACTERS.filter(c => c.faction === 'Rebel Alliance').length;
      const empireCount = CHARACTERS.filter(c => c.faction === 'Galactic Empire').length;
      return tr('filterByFaction', [
        '  const rebels = fn(characters, "Rebel Alliance");',
        '  const empire = fn(characters, "Galactic Empire");',
        '  const sith = fn(characters, "Sith Order");',
        '  return [',
        '    { pass: Array.isArray(rebels), description: "Returns an array", got: typeof rebels },',
        `    { pass: rebels.length === ${rebelCount}, description: "${rebelCount} Rebel Alliance characters", got: String(rebels.length) },`,
        `    { pass: empire.length === ${empireCount}, description: "${empireCount} Galactic Empire characters", got: String(empire.length) },`,
        '    { pass: sith.length === 0, description: "0 Sith Order characters", got: String(sith.length) },',
        '    { pass: rebels.every(c => c.faction === "Rebel Alliance"), description: "All returned rebels have correct faction", got: String(rebels.every(c => c.faction === "Rebel Alliance")) },',
        '  ];',
      ].join('\n'));
    })()
  },
  {
    id: 1003,
    title: "Star Wars: Get Film Appearances",
    tier: 2,
    category: ["api-data", "star-wars"],
    tags: ["arrays", "map", "nested-access", "api-data", "star-wars"],
    description: "Extract names and number of film appearances.",
    instructions: "Write a function called `getFilmCounts` that takes an array of character objects and returns an array of objects with `name` and `filmCount` properties.\n\nEach character has a `films` array of episode numbers.\n\nExample:\n```\ngetFilmCounts(characters)\n// Returns: [{ name: \"Luke Groundwalker\", filmCount: 5 }, ...]\n```",
    starterCode: "// Return an array of { name, filmCount } objects\nfunction getFilmCounts(characters) {\n  \n}",
    solution: "function getFilmCounts(characters) {\n  return characters.map(c => ({ name: c.name, filmCount: c.films.length }));\n}",
    hints: [
      "Use .map() to build new objects with name and the length of the films array.",
      "Return an object literal: `c => ({ name: c.name, filmCount: c.films.length })`"
    ],
    resources: [{ label: "MDN: Array.prototype.map()", url: "/docs/mdn/array-map.html" }],
    testRunner: (() => {
      const r2Films = CHARACTERS.find(c => c.name === 'R2-Detour').films.length;
      return tr('getFilmCounts', [
        '  const result = fn(characters);',
        '  return [',
        '    { pass: Array.isArray(result), description: "Returns an array", got: typeof result },',
        '    { pass: result.length === 12, description: "Returns 12 entries", got: String(result.length) },',
        '    { pass: result[0] && result[0].name === "Luke Groundwalker" && result[0].filmCount === 5, description: "Luke Groundwalker has 5 films", got: result[0] ? JSON.stringify(result[0]) : "undefined" },',
        `    { pass: result[7] && result[7].name === "R2-Detour" && result[7].filmCount === ${r2Films}, description: "R2-Detour has ${r2Films} films", got: result[7] ? JSON.stringify(result[7]) : "undefined" },`,
        '    { pass: result[0] && Object.keys(result[0]).length === 2, description: "Each entry has exactly 2 properties", got: result[0] ? String(Object.keys(result[0]).length) : "undefined" },',
        '  ];',
      ].join('\n'));
    })()
  },
  {
    id: 1004,
    title: "Star Wars: Lightsaber Wielders",
    tier: 2,
    category: ["api-data", "star-wars"],
    tags: ["arrays", "filter", "api-data", "star-wars"],
    description: "Find all characters who wield a lightsaber.",
    instructions: "Write a function called `getLightsaberWielders` that takes an array of character objects and returns only those whose `lightsaberColor` is not `null`.\n\nExample:\n```\ngetLightsaberWielders(characters)\n// Returns characters with non-null lightsaberColor\n```",
    starterCode: "// Return characters who have a lightsaber\nfunction getLightsaberWielders(characters) {\n  \n}",
    solution: "function getLightsaberWielders(characters) {\n  return characters.filter(c => c.lightsaberColor !== null);\n}",
    hints: [
      "Use .filter() to keep characters where lightsaberColor is not null.",
      "The condition: `c => c.lightsaberColor !== null`"
    ],
    resources: [{ label: "MDN: Array.prototype.filter()", url: "/docs/mdn/array-filter.html" }],
    testRunner: (() => {
      const wielders = CHARACTERS.filter(c => c.lightsaberColor !== null);
      return tr('getLightsaberWielders', [
        '  const result = fn(characters);',
        '  return [',
        '    { pass: Array.isArray(result), description: "Returns an array", got: typeof result },',
        `    { pass: result.length === ${wielders.length}, description: "${wielders.length} characters wield lightsabers", got: String(result.length) },`,
        '    { pass: result.every(c => c.lightsaberColor !== null), description: "All returned have a lightsaber color", got: String(result.every(c => c.lightsaberColor !== null)) },',
        '    { pass: !result.find(c => c.name === "Ham Solo"), description: \'Excludes "Ham Solo" (no lightsaber)\', got: String(!result.find(c => c.name === "Ham Solo")) },',
        '    { pass: result.find(c => c.name === "Darth Tater"), description: \'Includes "Darth Tater"\', got: String(!!result.find(c => c.name === "Darth Tater")) },',
        '  ];',
      ].join('\n'));
    })()
  },

  // ── T3 (7 exercises) ──────────────────────────────────────────────────────
  {
    id: 1005,
    title: "Star Wars: Richest Characters",
    tier: 3,
    category: ["api-data", "star-wars"],
    tags: ["arrays", "sort", "map", "api-data", "star-wars"],
    description: "Sort characters by credits and return their names and credit amounts.",
    instructions: "Write a function called `richestCharacters` that takes an array of character objects and returns an array of `{ name, credits }` objects sorted by credits descending.\n\nExample:\n```\nrichestCharacters(characters)\n// Returns: [{ name: \"Palpitate\", credits: 999999 }, ...]\n```",
    starterCode: "/**\n * @param {Object[]} characters - Array of character objects\n * @returns {Object[]} Array of { name, credits } sorted by credits descending\n */\nfunction richestCharacters(characters) {\n  \n}",
    solution: "function richestCharacters(characters) {\n  return characters.map(c => ({ name: c.name, credits: c.credits }))\n    .sort((a, b) => b.credits - a.credits);\n}",
    hints: [
      "Use .map() to extract name and credits, then .sort() by credits descending.",
      "Chain: `.map(c => ({ name: c.name, credits: c.credits })).sort((a, b) => b.credits - a.credits)`"
    ],
    resources: [
      { label: "MDN: Array.prototype.sort()", url: "/docs/mdn/array-sort.html" },
      { label: "MDN: Array.prototype.map()", url: "/docs/mdn/array-map.html" }
    ],
    testRunner: (() => {
      const sorted = CHARACTERS.map(c => ({ name: c.name, credits: c.credits }))
        .sort((a, b) => b.credits - a.credits);
      return tr('richestCharacters', [
        '  const result = fn(characters);',
        '  return [',
        '    { pass: Array.isArray(result) && result.length === 12, description: "Returns array of 12 entries", got: Array.isArray(result) ? String(result.length) : typeof result },',
        `    { pass: result[0] && result[0].name === "${esc(sorted[0].name)}", description: 'Richest: "${esc(sorted[0].name)}"', got: result[0] ? result[0].name : "undefined" },`,
        `    { pass: result[0] && result[0].credits === ${sorted[0].credits}, description: "Top credits: ${sorted[0].credits}", got: result[0] ? String(result[0].credits) : "undefined" },`,
        `    { pass: result[11] && result[11].credits === ${sorted[11].credits}, description: "Lowest credits: ${sorted[11].credits}", got: result[11] ? String(result[11].credits) : "undefined" },`,
        '    { pass: result[0] && Object.keys(result[0]).length === 2, description: "Each entry has name and credits", got: result[0] ? String(Object.keys(result[0]).length) : "undefined" },',
        '  ];',
      ].join('\n'));
    })()
  },
  {
    id: 1006,
    title: "Star Wars: Homeworld Lookup",
    tier: 3,
    category: ["api-data", "star-wars"],
    tags: ["arrays", "find", "cross-reference", "api-data", "star-wars"],
    description: "Look up each character's homeworld name using cross-referencing.",
    instructions: "Write a function called `getHomeworlds` that takes the `planets` and `characters` arrays and returns an array of `{ name, homeworld }` objects where `homeworld` is the planet name matching the character's `homeworldId`.\n\nExample:\n```\ngetHomeworlds(planets, characters)\n// Returns: [{ name: \"Luke Groundwalker\", homeworld: \"Tatooweenie\" }, ...]\n```",
    starterCode: "/**\n * @param {Object[]} planets - Array of planet objects\n * @param {Object[]} characters - Array of character objects\n * @returns {Object[]} Array of { name, homeworld } objects\n */\nfunction getHomeworlds(planets, characters) {\n  \n}",
    solution: "function getHomeworlds(planets, characters) {\n  return characters.map(c => ({\n    name: c.name,\n    homeworld: planets.find(p => p.id === c.homeworldId).name\n  }));\n}",
    hints: [
      "Use .map() on characters. For each character, use .find() on planets to look up the planet by matching homeworldId to planet id.",
      "Chain: `characters.map(c => ({ name: c.name, homeworld: planets.find(p => p.id === c.homeworldId).name }))`"
    ],
    resources: [
      { label: "MDN: Array.prototype.map()", url: "/docs/mdn/array-map.html" },
      { label: "MDN: Array.prototype.find()", url: "/docs/mdn/array-find.html" }
    ],
    testRunner: (() => {
      const mapped = CHARACTERS.map(c => ({
        name: c.name,
        homeworld: PLANETS.find(p => p.id === c.homeworldId).name
      }));
      return tr('getHomeworlds', [
        '  const result = fn(planets, characters);',
        '  return [',
        '    { pass: Array.isArray(result) && result.length === 12, description: "Returns array of 12 entries", got: Array.isArray(result) ? String(result.length) : typeof result },',
        `    { pass: result[0] && result[0].homeworld === "${mapped[0].homeworld}", description: '${esc(mapped[0].name)} is from "${mapped[0].homeworld}"', got: result[0] ? result[0].homeworld : "undefined" },`,
        `    { pass: result[5] && result[5].homeworld === "${mapped[5].homeworld}", description: '${esc(mapped[5].name)} is from "${mapped[5].homeworld}"', got: result[5] ? result[5].homeworld : "undefined" },`,
        `    { pass: result[3] && result[3].homeworld === "${mapped[3].homeworld}", description: '${esc(mapped[3].name)} is from "${mapped[3].homeworld}"', got: result[3] ? result[3].homeworld : "undefined" },`,
        '    { pass: result[0] && Object.keys(result[0]).length === 2, description: "Each entry has name and homeworld", got: result[0] ? String(Object.keys(result[0]).length) : "undefined" },',
        '  ];',
      ].join('\n'));
    })()
  },
  {
    id: 1007,
    title: "Star Wars: Force Users Ranked",
    tier: 3,
    category: ["api-data", "star-wars"],
    tags: ["arrays", "filter", "sort", "api-data", "star-wars"],
    description: "Find and rank all Force-sensitive characters.",
    instructions: "Write a function called `forceUsersRanked` that takes an array of character objects and returns an array of `{ name, forceRating, rank }` objects for characters with `forceRating > 0`, sorted by forceRating descending.\n\nExample:\n```\nforceUsersRanked(characters)\n// Returns: [{ name: \"Darth Tater\", forceRating: 10, rank: \"Sith Lord\" }, ...]\n```",
    starterCode: "/**\n * @param {Object[]} characters - Array of character objects\n * @returns {Object[]} Force users sorted by forceRating descending\n */\nfunction forceUsersRanked(characters) {\n  \n}",
    solution: "function forceUsersRanked(characters) {\n  return characters\n    .filter(c => c.forceRating > 0)\n    .map(c => ({ name: c.name, forceRating: c.forceRating, rank: c.rank }))\n    .sort((a, b) => b.forceRating - a.forceRating);\n}",
    hints: [
      "Chain .filter() for forceRating > 0, then .map() to extract needed properties, then .sort() descending.",
      "Sort comparator: `(a, b) => b.forceRating - a.forceRating`"
    ],
    resources: [
      { label: "MDN: Array.prototype.filter()", url: "/docs/mdn/array-filter.html" },
      { label: "MDN: Array.prototype.sort()", url: "/docs/mdn/array-sort.html" }
    ],
    testRunner: (() => {
      const ranked = CHARACTERS
        .filter(c => c.forceRating > 0)
        .map(c => ({ name: c.name, forceRating: c.forceRating, rank: c.rank }))
        .sort((a, b) => b.forceRating - a.forceRating);
      return tr('forceUsersRanked', [
        '  const result = fn(characters);',
        '  return [',
        '    { pass: Array.isArray(result), description: "Returns an array", got: typeof result },',
        `    { pass: result.length === ${ranked.length}, description: "${ranked.length} characters are Force-sensitive", got: String(result.length) },`,
        `    { pass: result[0] && result[0].forceRating === ${ranked[0].forceRating}, description: "Highest forceRating: ${ranked[0].forceRating}", got: result[0] ? String(result[0].forceRating) : "undefined" },`,
        `    { pass: result[result.length-1] && result[result.length-1].forceRating === ${ranked[ranked.length-1].forceRating}, description: "Lowest forceRating: ${ranked[ranked.length-1].forceRating}", got: result[result.length-1] ? String(result[result.length-1].forceRating) : "undefined" },`,
        '    { pass: !result.find(c => c.name === "Ham Solo"), description: \'Excludes non-Force users like "Ham Solo"\', got: String(!result.find(c => c.name === "Ham Solo")) },',
        '  ];',
      ].join('\n'));
    })()
  },
  {
    id: 1008,
    title: "Star Wars: Characters from Desert Planets",
    tier: 3,
    category: ["api-data", "star-wars"],
    tags: ["arrays", "filter", "cross-reference", "api-data", "star-wars"],
    description: "Find characters whose homeworld has an arid climate using cross-referencing.",
    instructions: "Write a function called `desertDwellers` that takes the `planets` and `characters` arrays and returns the names of characters whose homeworld has `climate` equal to `\"arid\"`.\n\nSort alphabetically.\n\nExample:\n```\ndesertDwellers(planets, characters)\n// Returns: [\"Darth Tater\", \"Luke Groundwalker\", \"Mannequin Groundwalker\"]\n```",
    starterCode: "/**\n * @param {Object[]} planets - Array of planet objects\n * @param {Object[]} characters - Array of character objects\n * @returns {string[]} Sorted names of desert-dwelling characters\n */\nfunction desertDwellers(planets, characters) {\n  \n}",
    solution: "function desertDwellers(planets, characters) {\n  const desertPlanetIds = planets.filter(p => p.climate === 'arid').map(p => p.id);\n  return characters\n    .filter(c => desertPlanetIds.includes(c.homeworldId))\n    .map(c => c.name)\n    .sort();\n}",
    hints: [
      "First find planet IDs with arid climate, then filter characters whose homeworldId is in that list.",
      "Chain: filter planets → get IDs → filter characters by ID match → map to names → sort."
    ],
    resources: [
      { label: "MDN: Array.prototype.filter()", url: "/docs/mdn/array-filter.html" },
      { label: "MDN: Array.prototype.includes()", url: "/docs/mdn/array-includes.html" }
    ],
    testRunner: (() => {
      const desertIds = PLANETS.filter(p => p.climate === 'arid').map(p => p.id);
      const names = CHARACTERS.filter(c => desertIds.includes(c.homeworldId)).map(c => c.name).sort();
      return tr('desertDwellers', [
        '  const result = fn(planets, characters);',
        '  return [',
        '    { pass: Array.isArray(result), description: "Returns an array", got: typeof result },',
        `    { pass: result.length === ${names.length}, description: "${names.length} characters from desert planets", got: String(result.length) },`,
        `    { pass: JSON.stringify(result) === '${JSON.stringify(names)}', description: 'Names: ${JSON.stringify(names)}', got: JSON.stringify(result) },`,
        '    { pass: result[0] === result.slice().sort()[0], description: "Results are sorted alphabetically", got: String(result[0]) },',
        '  ];',
      ].join('\n'));
    })()
  },
  {
    id: 1009,
    title: "Star Wars: Tallest per Faction",
    tier: 3,
    category: ["api-data", "star-wars"],
    tags: ["arrays", "reduce", "nested-access", "api-data", "star-wars"],
    description: "Find the tallest character in each faction.",
    instructions: "Write a function called `tallestPerFaction` that takes an array of character objects and returns an object where each key is a faction name and the value is `{ name, height }` of the tallest character in that faction.\n\nExample:\n```\ntallestPerFaction(characters)\n// Returns: { \"Rebel Alliance\": { name: \"Chew-Tobacco\", height: 2.28 }, ... }\n```",
    starterCode: "/**\n * @param {Object[]} characters - Array of character objects\n * @returns {Object} Map of faction to { name, height } of tallest member\n */\nfunction tallestPerFaction(characters) {\n  \n}",
    solution: "function tallestPerFaction(characters) {\n  const result = {};\n  characters.forEach(c => {\n    if (!result[c.faction] || c.height > result[c.faction].height) {\n      result[c.faction] = { name: c.name, height: c.height };\n    }\n  });\n  return result;\n}",
    hints: [
      "Loop through characters, building an object keyed by faction. Track the tallest in each faction.",
      "For each character, check if this faction exists in the result or if this character is taller than the current tallest."
    ],
    resources: [{ label: "MDN: Array.prototype.reduce()", url: "/docs/mdn/array-reduce.html" }],
    testRunner: (() => {
      const result = {};
      CHARACTERS.forEach(c => {
        if (!result[c.faction] || c.height > result[c.faction].height) {
          result[c.faction] = { name: c.name, height: c.height };
        }
      });
      const factionCount = Object.keys(result).length;
      const rebel = result['Rebel Alliance'];
      const empire = result['Galactic Empire'];
      return tr('tallestPerFaction', [
        '  const result = fn(characters);',
        '  return [',
        '    { pass: typeof result === "object" && !Array.isArray(result), description: "Returns an object", got: typeof result },',
        `    { pass: Object.keys(result).length === ${factionCount}, description: "${factionCount} factions represented", got: String(Object.keys(result).length) },`,
        `    { pass: result["Rebel Alliance"] && result["Rebel Alliance"].name === "${esc(rebel.name)}", description: 'Tallest Rebel: "${esc(rebel.name)}"', got: result["Rebel Alliance"] ? result["Rebel Alliance"].name : "undefined" },`,
        `    { pass: result["Rebel Alliance"] && result["Rebel Alliance"].height === ${rebel.height}, description: "Tallest Rebel height: ${rebel.height}m", got: result["Rebel Alliance"] ? String(result["Rebel Alliance"].height) : "undefined" },`,
        `    { pass: result["Galactic Empire"] && result["Galactic Empire"].name === "${esc(empire.name)}", description: 'Tallest Empire: "${esc(empire.name)}"', got: result["Galactic Empire"] ? result["Galactic Empire"].name : "undefined" },`,
        '  ];',
      ].join('\n'));
    })()
  },
  {
    id: 1010,
    title: "Star Wars: Shared Films",
    tier: 3,
    category: ["api-data", "star-wars"],
    tags: ["arrays", "filter", "set", "api-data", "star-wars"],
    description: "Find which films two characters both appear in.",
    instructions: "Write a function called `sharedFilms` that takes an array of character objects and two character names. Return a sorted array of film episode numbers that both characters appear in.\n\nReturn an empty array if either character is not found.\n\nExample:\n```\nsharedFilms(characters, \"Luke Groundwalker\", \"Darth Tater\")\n// Returns: [4, 5, 6] (both appear in episodes 4, 5, and 6)\n```",
    starterCode: "/**\n * @param {Object[]} characters - Array of character objects\n * @param {string} name1 - First character name\n * @param {string} name2 - Second character name\n * @returns {number[]} Sorted array of shared film episode numbers\n */\nfunction sharedFilms(characters, name1, name2) {\n  \n}",
    solution: "function sharedFilms(characters, name1, name2) {\n  const c1 = characters.find(c => c.name === name1);\n  const c2 = characters.find(c => c.name === name2);\n  if (!c1 || !c2) return [];\n  return c1.films.filter(f => c2.films.includes(f)).sort((a, b) => a - b);\n}",
    hints: [
      "Find both characters by name. Use .filter() on one character's films to keep only those that the other character's films .includes().",
      "Sort numerically with `.sort((a, b) => a - b)`. Return [] if either character is not found."
    ],
    resources: [
      { label: "MDN: Array.prototype.find()", url: "/docs/mdn/array-find.html" },
      { label: "MDN: Array.prototype.includes()", url: "/docs/mdn/array-includes.html" }
    ],
    testRunner: (() => {
      function shared(n1, n2) {
        const c1 = CHARACTERS.find(c => c.name === n1);
        const c2 = CHARACTERS.find(c => c.name === n2);
        if (!c1 || !c2) return [];
        return c1.films.filter(f => c2.films.includes(f)).sort((a, b) => a - b);
      }
      const lukeDarth = shared("Luke Groundwalker", "Darth Tater");
      const lukeR2 = shared("Luke Groundwalker", "R2-Detour");
      return tr('sharedFilms', [
        '  const ld = fn(characters, "Luke Groundwalker", "Darth Tater");',
        '  const lr = fn(characters, "Luke Groundwalker", "R2-Detour");',
        '  const nobody = fn(characters, "Luke Groundwalker", "Jar Jar Stinks");',
        '  return [',
        '    { pass: Array.isArray(ld), description: "Returns an array", got: typeof ld },',
        `    { pass: JSON.stringify(ld) === '${JSON.stringify(lukeDarth)}', description: 'Luke+Darth shared: ${JSON.stringify(lukeDarth)}', got: JSON.stringify(ld) },`,
        `    { pass: lr.length === ${lukeR2.length}, description: "Luke+R2-Detour share ${lukeR2.length} films", got: String(lr.length) },`,
        '    { pass: nobody.length === 0, description: "Returns empty for unknown character", got: String(nobody.length) },',
        '  ];',
      ].join('\n'));
    })()
  },
  {
    id: 1011,
    title: "Star Wars: Unique Species",
    tier: 3,
    category: ["api-data", "star-wars"],
    tags: ["arrays", "map", "set", "api-data", "star-wars"],
    description: "Get all unique species from the characters dataset.",
    instructions: "Write a function called `getUniqueSpecies` that takes an array of character objects and returns a sorted array of all unique species strings.\n\nExample:\n```\ngetUniqueSpecies(characters)\n// Returns: [\"Droid\", \"Human\", \"Unknown\", \"Wookalar\"]\n```",
    starterCode: "/**\n * @param {Object[]} characters - Array of character objects\n * @returns {string[]} Sorted array of unique species\n */\nfunction getUniqueSpecies(characters) {\n  \n}",
    solution: "function getUniqueSpecies(characters) {\n  return [...new Set(characters.map(c => c.species))].sort();\n}",
    hints: [
      "Use .map() to get all species, then deduplicate with Set and sort.",
      "`[...new Set(characters.map(c => c.species))].sort()` does all three steps."
    ],
    resources: [
      { label: "MDN: Set", url: "/docs/mdn/set.html" },
      { label: "MDN: Array.prototype.map()", url: "/docs/mdn/array-map.html" }
    ],
    testRunner: (() => {
      const species = [...new Set(CHARACTERS.map(c => c.species))].sort();
      return tr('getUniqueSpecies', [
        '  const result = fn(characters);',
        '  return [',
        '    { pass: Array.isArray(result), description: "Returns an array", got: typeof result },',
        `    { pass: result.length === ${species.length}, description: "${species.length} unique species", got: String(result.length) },`,
        `    { pass: JSON.stringify(result) === '${JSON.stringify(species)}', description: 'Species: ${JSON.stringify(species)}', got: JSON.stringify(result) },`,
        '    { pass: new Set(result).size === result.length, description: "All species are unique", got: "unique: " + new Set(result).size + ", total: " + result.length },',
        '  ];',
      ].join('\n'));
    })()
  },

  // ── T4 (4 exercises) ──────────────────────────────────────────────────────
  {
    id: 1012,
    title: "Star Wars: Faction Report",
    tier: 4,
    category: ["api-data", "star-wars"],
    tags: ["arrays", "reduce", "cross-reference", "data-transformation", "api-data", "star-wars"],
    description: "Build a comprehensive faction report using both datasets.",
    instructions: "Write a function called `factionReport` that takes the `planets` and `characters` arrays and returns an object where each key is a faction name and the value is:\n- `members`: sorted array of character names in that faction\n- `avgForceRating`: average forceRating (rounded to 1 decimal)\n- `totalCredits`: sum of all credits\n- `homeworlds`: sorted unique array of homeworld planet names\n\nExample:\n```\nfactionReport(planets, characters)\n// Returns: { \"Rebel Alliance\": { members: [...], avgForceRating: 4.6, ... }, ... }\n```",
    starterCode: "",
    solution: "function factionReport(planets, characters) {\n  const result = {};\n  characters.forEach(c => {\n    if (!result[c.faction]) result[c.faction] = { names: [], forceSum: 0, totalCredits: 0, homeworldIds: new Set() };\n    result[c.faction].names.push(c.name);\n    result[c.faction].forceSum += c.forceRating;\n    result[c.faction].totalCredits += c.credits;\n    result[c.faction].homeworldIds.add(c.homeworldId);\n  });\n  const report = {};\n  Object.entries(result).forEach(([faction, data]) => {\n    report[faction] = {\n      members: data.names.sort(),\n      avgForceRating: Math.round(data.forceSum / data.names.length * 10) / 10,\n      totalCredits: data.totalCredits,\n      homeworlds: [...data.homeworldIds].map(id => planets.find(p => p.id === id).name).sort()\n    };\n  });\n  return report;\n}",
    hints: [
      "Group characters by faction. For each group, accumulate names, force ratings, credits, and homeworld IDs.",
      "After grouping, compute averages, sort names, and look up planet names from IDs."
    ],
    resources: [{ label: "MDN: Array.prototype.reduce()", url: "/docs/mdn/array-reduce.html" }],
    testRunner: (() => {
      const grouped = {};
      CHARACTERS.forEach(c => {
        if (!grouped[c.faction]) grouped[c.faction] = { names: [], forceSum: 0, totalCredits: 0, hwIds: new Set() };
        grouped[c.faction].names.push(c.name);
        grouped[c.faction].forceSum += c.forceRating;
        grouped[c.faction].totalCredits += c.credits;
        grouped[c.faction].hwIds.add(c.homeworldId);
      });
      const report = {};
      Object.entries(grouped).forEach(([f, d]) => {
        report[f] = {
          members: d.names.sort(),
          avgForceRating: Math.round(d.forceSum / d.names.length * 10) / 10,
          totalCredits: d.totalCredits,
          homeworlds: [...d.hwIds].map(id => PLANETS.find(p => p.id === id).name).sort()
        };
      });
      const rebel = report['Rebel Alliance'];
      const factionCount = Object.keys(report).length;
      return tr('factionReport', [
        '  const result = fn(planets, characters);',
        '  return [',
        '    { pass: typeof result === "object" && !Array.isArray(result), description: "Returns an object", got: typeof result },',
        `    { pass: Object.keys(result).length === ${factionCount}, description: "${factionCount} factions represented", got: String(Object.keys(result).length) },`,
        `    { pass: result["Rebel Alliance"] && result["Rebel Alliance"].members.length === ${rebel.members.length}, description: "Rebel Alliance has ${rebel.members.length} members", got: result["Rebel Alliance"] ? String(result["Rebel Alliance"].members.length) : "undefined" },`,
        `    { pass: result["Rebel Alliance"] && result["Rebel Alliance"].avgForceRating === ${rebel.avgForceRating}, description: "Rebel avg forceRating: ${rebel.avgForceRating}", got: result["Rebel Alliance"] ? String(result["Rebel Alliance"].avgForceRating) : "undefined" },`,
        `    { pass: result["Rebel Alliance"] && result["Rebel Alliance"].totalCredits === ${rebel.totalCredits}, description: "Rebel total credits: ${rebel.totalCredits}", got: result["Rebel Alliance"] ? String(result["Rebel Alliance"].totalCredits) : "undefined" },`,
        `    { pass: result["Rebel Alliance"] && Array.isArray(result["Rebel Alliance"].homeworlds), description: "Homeworlds is an array", got: result["Rebel Alliance"] ? typeof result["Rebel Alliance"].homeworlds : "undefined" },`,
        '  ];',
      ].join('\n'));
    })()
  },
  {
    id: 1013,
    title: "Star Wars: Planet Census",
    tier: 4,
    category: ["api-data", "star-wars"],
    tags: ["arrays", "reduce", "cross-reference", "aggregation", "api-data", "star-wars"],
    description: "Build a census of each planet with its notable residents.",
    instructions: "Write a function called `planetCensus` that takes the `planets` and `characters` arrays and returns an array of objects (one per planet) with:\n- `name`: planet name\n- `climate`: planet climate\n- `residents`: sorted array of character names from that planet\n- `residentCount`: number of characters from that planet\n- `avgForceRating`: average forceRating of residents (rounded to 1 decimal, or 0 if no residents)\n- `totalCredits`: sum of credits of all residents\n\nSort by `residentCount` descending.\n\nExample:\n```\nplanetCensus(planets, characters)\n// Returns: [{ name: \"Croissant\", climate: \"temperate\", residents: [...], ... }, ...]\n```",
    starterCode: "",
    solution: "function planetCensus(planets, characters) {\n  return planets.map(p => {\n    const residents = characters.filter(c => c.homeworldId === p.id);\n    return {\n      name: p.name,\n      climate: p.climate,\n      residents: residents.map(c => c.name).sort(),\n      residentCount: residents.length,\n      avgForceRating: residents.length > 0 ? Math.round(residents.reduce((s, c) => s + c.forceRating, 0) / residents.length * 10) / 10 : 0,\n      totalCredits: residents.reduce((s, c) => s + c.credits, 0)\n    };\n  }).sort((a, b) => b.residentCount - a.residentCount);\n}",
    hints: [
      "For each planet, filter characters by homeworldId match. Calculate stats from the filtered residents.",
      "Handle planets with no residents: avgForceRating should be 0 if no characters live there."
    ],
    resources: [
      { label: "MDN: Array.prototype.reduce()", url: "/docs/mdn/array-reduce.html" },
      { label: "MDN: Array.prototype.filter()", url: "/docs/mdn/array-filter.html" }
    ],
    testRunner: (() => {
      const census = PLANETS.map(p => {
        const res = CHARACTERS.filter(c => c.homeworldId === p.id);
        return {
          name: p.name,
          climate: p.climate,
          residents: res.map(c => c.name).sort(),
          residentCount: res.length,
          avgForceRating: res.length > 0 ? Math.round(res.reduce((s, c) => s + c.forceRating, 0) / res.length * 10) / 10 : 0,
          totalCredits: res.reduce((s, c) => s + c.credits, 0)
        };
      }).sort((a, b) => b.residentCount - a.residentCount);
      return tr('planetCensus', [
        '  const result = fn(planets, characters);',
        '  return [',
        '    { pass: Array.isArray(result) && result.length === 8, description: "Returns array of 8 planets", got: Array.isArray(result) ? String(result.length) : typeof result },',
        `    { pass: result[0] && result[0].name === "${esc(census[0].name)}", description: 'Most populated planet: "${esc(census[0].name)}"', got: result[0] ? result[0].name : "undefined" },`,
        `    { pass: result[0] && result[0].residentCount === ${census[0].residentCount}, description: "Top planet has ${census[0].residentCount} residents", got: result[0] ? String(result[0].residentCount) : "undefined" },`,
        `    { pass: result[0] && result[0].avgForceRating === ${census[0].avgForceRating}, description: "Top planet avgForceRating: ${census[0].avgForceRating}", got: result[0] ? String(result[0].avgForceRating) : "undefined" },`,
        `    { pass: result[result.length-1] && result[result.length-1].residentCount === ${census[census.length-1].residentCount}, description: "Least populated has ${census[census.length-1].residentCount} residents", got: result[result.length-1] ? String(result[result.length-1].residentCount) : "undefined" },`,
        '    { pass: result[0] && Array.isArray(result[0].residents) && result[0].residents[0] < result[0].residents[result[0].residents.length-1], description: "Residents are sorted alphabetically", got: result[0] ? result[0].residents.join(", ") : "undefined" },',
        '  ];',
      ].join('\n'));
    })()
  },
  {
    id: 1014,
    title: "Star Wars: Film Ensemble",
    tier: 4,
    category: ["api-data", "star-wars"],
    tags: ["arrays", "reduce", "cross-reference", "data-transformation", "api-data", "star-wars"],
    description: "Build a cast list for each film episode from the characters dataset.",
    instructions: "Write a function called `filmEnsemble` that takes the `planets` and `characters` arrays and returns an object where each key is a film episode number and the value is:\n- `cast`: sorted array of character names appearing in that film\n- `castSize`: number of characters\n- `factions`: sorted unique array of factions represented\n- `planets`: sorted unique array of homeworld names of characters in that film\n\nExample:\n```\nfilmEnsemble(planets, characters)\n// Returns: { 1: { cast: [...], castSize: 5, factions: [...], planets: [...] }, ... }\n```",
    starterCode: "",
    solution: "function filmEnsemble(planets, characters) {\n  const films = {};\n  characters.forEach(c => {\n    c.films.forEach(f => {\n      if (!films[f]) films[f] = { names: [], factionSet: new Set(), planetIdSet: new Set() };\n      films[f].names.push(c.name);\n      films[f].factionSet.add(c.faction);\n      films[f].planetIdSet.add(c.homeworldId);\n    });\n  });\n  const result = {};\n  Object.entries(films).forEach(([ep, data]) => {\n    result[Number(ep)] = {\n      cast: data.names.sort(),\n      castSize: data.names.length,\n      factions: [...data.factionSet].sort(),\n      planets: [...data.planetIdSet].map(id => planets.find(p => p.id === id).name).sort()\n    };\n  });\n  return result;\n}",
    hints: [
      "Loop through characters and their films arrays. Group by film episode number, collecting names, factions, and homeworld IDs.",
      "After grouping, sort cast alphabetically, deduplicate factions and planet names using Sets."
    ],
    resources: [
      { label: "MDN: Array.prototype.forEach()", url: "/docs/mdn/array-foreach.html" },
      { label: "MDN: Set", url: "/docs/mdn/set.html" }
    ],
    testRunner: (() => {
      const films = {};
      CHARACTERS.forEach(c => {
        c.films.forEach(f => {
          if (!films[f]) films[f] = { names: [], factionSet: new Set(), planetIdSet: new Set() };
          films[f].names.push(c.name);
          films[f].factionSet.add(c.faction);
          films[f].planetIdSet.add(c.homeworldId);
        });
      });
      const result = {};
      Object.entries(films).forEach(([ep, data]) => {
        result[Number(ep)] = {
          cast: data.names.sort(),
          castSize: data.names.length,
          factions: [...data.factionSet].sort(),
          planets: [...data.planetIdSet].map(id => PLANETS.find(p => p.id === id).name).sort()
        };
      });
      const ep4 = result[4];
      const epCount = Object.keys(result).length;
      return tr('filmEnsemble', [
        '  const result = fn(planets, characters);',
        '  return [',
        '    { pass: typeof result === "object" && !Array.isArray(result), description: "Returns an object", got: typeof result },',
        `    { pass: Object.keys(result).length === ${epCount}, description: "${epCount} unique film episodes", got: String(Object.keys(result).length) },`,
        `    { pass: result[4] && result[4].castSize === ${ep4.castSize}, description: "Episode 4 has ${ep4.castSize} characters", got: result[4] ? String(result[4].castSize) : "undefined" },`,
        `    { pass: result[4] && Array.isArray(result[4].cast) && result[4].cast[0] < result[4].cast[result[4].cast.length-1], description: "Cast is sorted alphabetically", got: result[4] ? result[4].cast.join(", ") : "undefined" },`,
        `    { pass: result[4] && result[4].factions.length === ${ep4.factions.length}, description: "Episode 4 has ${ep4.factions.length} factions", got: result[4] ? String(result[4].factions.length) : "undefined" },`,
        `    { pass: result[4] && result[4].planets.length === ${ep4.planets.length}, description: "Episode 4 characters from ${ep4.planets.length} planets", got: result[4] ? String(result[4].planets.length) : "undefined" },`,
        '  ];',
      ].join('\n'));
    })()
  },
  {
    id: 1015,
    title: "Star Wars: Galaxy Database",
    tier: 4,
    category: ["api-data", "star-wars"],
    tags: ["arrays", "reduce", "cross-reference", "data-transformation", "aggregation", "api-data", "star-wars"],
    description: "Build a comprehensive galaxy database from both datasets.",
    instructions: "Create a function called `galaxyDatabase` that takes the `planets` and `characters` arrays and returns an object with:\n- `totalCharacters`: number of characters\n- `totalPlanets`: number of planets\n- `jediCount`: number of Jedi characters\n- `droidCount`: number of droids\n- `wealthiest`: `{ name, credits }` of the richest character\n- `mostFilms`: `{ name, count }` of the character appearing in the most films\n- `speciesDistribution`: object mapping each species to its character count\n- `factionSummary`: object mapping each faction to its member count\n\nExample:\n```\ngalaxyDatabase(planets, characters)\n// Returns: { totalCharacters: 12, totalPlanets: 8, ... }\n```",
    starterCode: "",
    solution: "function galaxyDatabase(planets, characters) {\n  const jediCount = characters.filter(c => c.isJedi).length;\n  const droidCount = characters.filter(c => c.isDroid).length;\n  const wealthiest = characters.reduce((w, c) => c.credits > w.credits ? c : w);\n  const mostFilms = characters.reduce((m, c) => c.films.length > m.films.length ? c : m);\n  const speciesDistribution = {};\n  characters.forEach(c => { speciesDistribution[c.species] = (speciesDistribution[c.species] || 0) + 1; });\n  const factionSummary = {};\n  characters.forEach(c => { factionSummary[c.faction] = (factionSummary[c.faction] || 0) + 1; });\n  return {\n    totalCharacters: characters.length,\n    totalPlanets: planets.length,\n    jediCount,\n    droidCount,\n    wealthiest: { name: wealthiest.name, credits: wealthiest.credits },\n    mostFilms: { name: mostFilms.name, count: mostFilms.films.length },\n    speciesDistribution,\n    factionSummary\n  };\n}",
    hints: [
      "Break into parts: count Jedi and droids, find wealthiest and most-filmed with .reduce(), build distribution objects with forEach.",
      "For speciesDistribution and factionSummary, loop through characters and count occurrences using object accumulators."
    ],
    resources: [{ label: "MDN: Array.prototype.reduce()", url: "/docs/mdn/array-reduce.html" }],
    testRunner: (() => {
      const jediCount = CHARACTERS.filter(c => c.isJedi).length;
      const droidCount = CHARACTERS.filter(c => c.isDroid).length;
      const wealthiest = CHARACTERS.reduce((w, c) => c.credits > w.credits ? c : w);
      const mostFilms = CHARACTERS.reduce((m, c) => c.films.length > m.films.length ? c : m);
      const speciesDist = {};
      CHARACTERS.forEach(c => { speciesDist[c.species] = (speciesDist[c.species] || 0) + 1; });
      const humanCount = speciesDist['Human'] || 0;
      return tr('galaxyDatabase', [
        '  const result = fn(planets, characters);',
        '  return [',
        '    { pass: typeof result === "object" && !Array.isArray(result), description: "Returns an object", got: typeof result },',
        '    { pass: result.totalCharacters === 12 && result.totalPlanets === 8, description: "totalCharacters: 12, totalPlanets: 8", got: "chars: " + result.totalCharacters + ", planets: " + result.totalPlanets },',
        `    { pass: result.jediCount === ${jediCount}, description: "${jediCount} Jedi", got: String(result.jediCount) },`,
        `    { pass: result.droidCount === ${droidCount}, description: "${droidCount} droids", got: String(result.droidCount) },`,
        `    { pass: result.wealthiest && result.wealthiest.name === "${esc(wealthiest.name)}", description: 'Wealthiest: "${esc(wealthiest.name)}" (${wealthiest.credits} credits)', got: result.wealthiest ? result.wealthiest.name : "undefined" },`,
        `    { pass: result.mostFilms && result.mostFilms.name === "${esc(mostFilms.name)}", description: 'Most films: "${esc(mostFilms.name)}" (${mostFilms.films.length})', got: result.mostFilms ? result.mostFilms.name : "undefined" },`,
        `    { pass: result.speciesDistribution && result.speciesDistribution.Human === ${humanCount}, description: "${humanCount} Humans", got: result.speciesDistribution ? String(result.speciesDistribution.Human) : "undefined" },`,
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

console.log(`\nPop Culture APIs — Star Wars Theme ⚔️`);
console.log(`=====================================`);
console.log(`  Exercises: ${exercises.length}`);
console.log(`  T2: ${exercises.filter(e => e.tier === 2).length}`);
console.log(`  T3: ${exercises.filter(e => e.tier === 3).length}`);
console.log(`  T4: ${exercises.filter(e => e.tier === 4).length}`);
console.log(`  ID range: ${exercises[0].id}–${exercises[exercises.length - 1].id}`);
console.log(`  Characters: ${CHARACTERS.length}, Planets: ${PLANETS.length}`);
console.log(`  Appended to: ${outPath}`);
console.log(`  Total collection exercises: ${existing.exercises.length}`);
