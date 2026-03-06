/**
 * Generates the DC Villains theme exercises for the Pop Culture APIs collection.
 * Run: node exercises/collections/_generate_dc.js
 * Reads existing pop-culture-apis.json and appends DC exercises.
 *
 * 2 datasets: villains (12, rich data), heroes (8, lighter cross-reference)
 * Cross-reference: villain.nemesisId → hero (villain-centric design)
 * Batsman's rogues gallery dominates, creating uneven distribution edge cases.
 */

const fs = require('fs');
const path = require('path');

// ── Hero Dataset (8 heroes, lighter — used for cross-referencing) ───────────

const HEROES = [
  { id: 1, name: "Batsman", alias: "The Bark Knight", city: "Goat-ham", powers: ["martial arts", "detective skills", "gadgets", "fear tactics"], isActive: true },
  { id: 2, name: "Souperman", alias: "The Man of Stew", city: "Metro-polish", powers: ["super strength", "flight", "heat vision", "invulnerability"], isActive: true },
  { id: 3, name: "Blunder Woman", alias: "Princess of Them-is-cute-a", city: "Washington D.C.oup", powers: ["super strength", "lasso of truth-ish", "combat mastery", "flight"], isActive: true },
  { id: 4, name: "The Flesh", alias: "The Fastest Rash Alive", city: "Central Pity", powers: ["super speed", "time travel", "speed force"], isActive: true },
  { id: 5, name: "Aqua-manager", alias: "King of Atlantis-co", city: "Atlantis-co", powers: ["underwater breathing", "super strength", "marine telepathy"], isActive: true },
  { id: 6, name: "Green Cantern", alias: "The Emerald Bite", city: "Toast City", powers: ["power ring", "construct creation", "flight"], isActive: true },
  { id: 7, name: "Cyburger", alias: "Half Man Half Lunch", city: "Jump Jitty", powers: ["cybernetic enhancement", "technopathy", "sonic cannon"], isActive: true },
  { id: 8, name: "Martian Man-Punter", alias: "The Last Martian-i", city: "Various", powers: ["shapeshifting", "telepathy", "phasing", "super strength", "flight"], isActive: false }
];

// ── Villain Dataset (12 villains, rich data — primary focus) ────────────────

const VILLAINS = [
  {
    id: 1,
    name: "The Yoker",
    alias: "Clown Prince of Comedy",
    nemesisId: 1,
    team: "Legion of Gloom",
    origin: "chemical",
    powers: ["toxic comedy", "chemical weapons", "unpredictability"],
    stats: { strength: 4, speed: 5, intelligence: 9, durability: 4 },
    crimes: 847,
    isActive: true,
    yearDebuted: 1940,
    base: "Arkham Asy-lol"
  },
  {
    id: 2,
    name: "Barley Quinn",
    alias: "The Queen of Grain",
    nemesisId: 1,
    team: "Suicide Squid",
    origin: "psychological",
    powers: ["acrobatics", "enhanced strength", "toxin immunity"],
    stats: { strength: 6, speed: 7, intelligence: 8, durability: 6 },
    crimes: 312,
    isActive: true,
    yearDebuted: 1992,
    base: "Goat-ham"
  },
  {
    id: 3,
    name: "Lex Loofah",
    alias: "The Bald Billionaire",
    nemesisId: 2,
    team: "Legion of Gloom",
    origin: "genius",
    powers: ["genius intellect", "powered armor", "vast resources"],
    stats: { strength: 4, speed: 3, intelligence: 10, durability: 5 },
    crimes: 523,
    isActive: true,
    yearDebuted: 1940,
    base: "Metro-polish"
  },
  {
    id: 4,
    name: "Bane-ana",
    alias: "The Man Who Broke the Breakfast",
    nemesisId: 1,
    team: "solo",
    origin: "enhanced",
    powers: ["super strength", "venom enhancement", "tactical genius"],
    stats: { strength: 10, speed: 5, intelligence: 8, durability: 9 },
    crimes: 156,
    isActive: true,
    yearDebuted: 1993,
    base: "Santa Pretzela"
  },
  {
    id: 5,
    name: "Poison Ivory",
    alias: "The Eco-Terrorist Botanist",
    nemesisId: 1,
    team: "Legion of Gloom",
    origin: "science",
    powers: ["plant control", "toxic kiss", "pheromone manipulation"],
    stats: { strength: 3, speed: 4, intelligence: 8, durability: 5 },
    crimes: 267,
    isActive: true,
    yearDebuted: 1966,
    base: "Goat-ham"
  },
  {
    id: 6,
    name: "The Giddler",
    alias: "The Prince of Puzzles",
    nemesisId: 1,
    team: "solo",
    origin: "genius",
    powers: ["genius intellect", "puzzle mastery", "hacking"],
    stats: { strength: 3, speed: 4, intelligence: 10, durability: 3 },
    crimes: 389,
    isActive: true,
    yearDebuted: 1948,
    base: "Goat-ham"
  },
  {
    id: 7,
    name: "Mr. Sneeze",
    alias: "The Ice-Cold Villain",
    nemesisId: 1,
    team: "solo",
    origin: "science",
    powers: ["cryokinesis", "freeze gun", "cold immunity"],
    stats: { strength: 6, speed: 4, intelligence: 9, durability: 7 },
    crimes: 198,
    isActive: false,
    yearDebuted: 1959,
    base: "Goat-ham"
  },
  {
    id: 8,
    name: "Scare-bro",
    alias: "The Master of Fear",
    nemesisId: 1,
    team: "Legion of Gloom",
    origin: "science",
    powers: ["fear toxin", "psychology mastery", "intimidation"],
    stats: { strength: 4, speed: 5, intelligence: 9, durability: 4 },
    crimes: 276,
    isActive: true,
    yearDebuted: 1941,
    base: "Goat-ham"
  },
  {
    id: 9,
    name: "Deathstork",
    alias: "The World's Deadliest Bird",
    nemesisId: 4,
    team: "Suicide Squid",
    origin: "enhanced",
    powers: ["enhanced reflexes", "superhuman strength", "regeneration", "master tactician"],
    stats: { strength: 9, speed: 9, intelligence: 9, durability: 8 },
    crimes: 412,
    isActive: true,
    yearDebuted: 1980,
    base: "Mobile"
  },
  {
    id: 10,
    name: "Dork-seid",
    alias: "Ruler of Apocalips",
    nemesisId: 2,
    team: "solo",
    origin: "alien",
    powers: ["omega beams", "superhuman strength", "immortality", "telepathy"],
    stats: { strength: 10, speed: 7, intelligence: 10, durability: 10 },
    crimes: 9999,
    isActive: true,
    yearDebuted: 1970,
    base: "Apocalips"
  },
  {
    id: 11,
    name: "Sinister-o",
    alias: "The Yellow Ring Bearer",
    nemesisId: 6,
    team: "Legion of Gloom",
    origin: "alien",
    powers: ["yellow power ring", "fear constructs", "flight", "energy projection"],
    stats: { strength: 8, speed: 8, intelligence: 8, durability: 8 },
    crimes: 334,
    isActive: true,
    yearDebuted: 1961,
    base: "Qward"
  },
  {
    id: 12,
    name: "Cat-astrophe",
    alias: "The Feline Fatale",
    nemesisId: 1,
    team: "solo",
    origin: "trained",
    powers: ["acrobatics", "cat-like agility", "stealth", "whip mastery"],
    stats: { strength: 5, speed: 8, intelligence: 7, durability: 5 },
    crimes: 89,
    isActive: true,
    yearDebuted: 1940,
    base: "Goat-ham"
  }
];

// ── Format datasets as readable JS for Dataset tab ──────────────────────────

function formatDatasetDisplay() {
  const lines = [];

  // Villains first (primary dataset)
  lines.push('const villains = [');
  VILLAINS.forEach((v, i) => {
    lines.push('  {');
    lines.push(`    id: ${v.id},`);
    lines.push(`    name: "${v.name}",`);
    lines.push(`    alias: "${v.alias}",`);
    lines.push(`    nemesisId: ${v.nemesisId},`);
    lines.push(`    team: "${v.team}",`);
    lines.push(`    origin: "${v.origin}",`);
    lines.push(`    powers: ${JSON.stringify(v.powers)},`);
    lines.push(`    stats: { strength: ${v.stats.strength}, speed: ${v.stats.speed}, intelligence: ${v.stats.intelligence}, durability: ${v.stats.durability} },`);
    lines.push(`    crimes: ${v.crimes},`);
    lines.push(`    isActive: ${v.isActive},`);
    lines.push(`    yearDebuted: ${v.yearDebuted},`);
    lines.push(`    base: "${v.base}"`);
    lines.push(`  }${i < VILLAINS.length - 1 ? ',' : ''}`);
  });
  lines.push('];');
  lines.push('');

  // Heroes (cross-reference)
  lines.push('const heroes = [');
  HEROES.forEach((h, i) => {
    lines.push('  {');
    lines.push(`    id: ${h.id},`);
    lines.push(`    name: "${h.name}",`);
    lines.push(`    alias: "${h.alias}",`);
    lines.push(`    city: "${h.city}",`);
    lines.push(`    powers: ${JSON.stringify(h.powers)},`);
    lines.push(`    isActive: ${h.isActive}`);
    lines.push(`  }${i < HEROES.length - 1 ? ',' : ''}`);
  });
  lines.push('];');

  return lines.join('\n');
}

const DATASET_DISPLAY = formatDatasetDisplay();
const VILLAINS_JSON = JSON.stringify(VILLAINS);
const HEROES_JSON = JSON.stringify(HEROES);

// ── Helpers ─────────────────────────────────────────────────────────────────

function esc(str) { return String(str).replace(/'/g, "\\'"); }

function tr(fnName, testBody) {
  return `(code) => {\n  const villains = ${VILLAINS_JSON};\n  const heroes = ${HEROES_JSON};\n  const fn = new Function(code + '; return ${fnName};')();\n${testBody}\n}`;
}

// ── Exercise definitions ────────────────────────────────────────────────────

const exercises = [

  // ── T2 (6 exercises) ──────────────────────────────────────────────────────

  {
    id: 1068,
    title: "DC Villains: Get Villain Names",
    tier: 2,
    category: ["api-data", "dc-villains"],
    tags: ["arrays", "map", "api-data", "dc-villains"],
    description: "Extract all villain names from the dataset.",
    instructions: "Write a function called `getVillainNames` that takes an array of villain objects and returns an array of their `name` properties.\n\nExample:\n```\ngetVillainNames(villains)\n// Returns: [\"The Yoker\", \"Barley Quinn\", ...]\n```",
    starterCode: "// Return an array of all villain names\nfunction getVillainNames(villains) {\n  \n}",
    solution: "function getVillainNames(villains) {\n  return villains.map(v => v.name);\n}",
    hints: [
      "Use .map() to transform each villain object into just the name property.",
      "The callback is: `v => v.name`"
    ],
    resources: [{ label: "MDN: Array.prototype.map()", url: "/docs/mdn/array-map.html" }],
    testRunner: tr('getVillainNames', [
      '  const result = fn(villains);',
      '  return [',
      '    { pass: Array.isArray(result), description: "Returns an array", got: typeof result },',
      '    { pass: result.length === 12, description: "Returns 12 names", got: String(result.length) },',
      '    { pass: result[0] === "The Yoker", description: \'First is "The Yoker"\', got: String(result[0]) },',
      '    { pass: result[11] === "Cat-astrophe", description: \'Last is "Cat-astrophe"\', got: String(result[11]) },',
      '    { pass: result.includes("Dork-seid"), description: \'Includes "Dork-seid"\', got: String(result.includes("Dork-seid")) },',
      '  ];',
    ].join('\n'))
  },
  {
    id: 1069,
    title: "DC Villains: Get Villain Aliases",
    tier: 2,
    category: ["api-data", "dc-villains"],
    tags: ["arrays", "map", "api-data", "dc-villains"],
    description: "Extract all villain aliases from the dataset.",
    instructions: "Write a function called `getVillainAliases` that takes an array of villain objects and returns an array of their `alias` properties.\n\nExample:\n```\ngetVillainAliases(villains)\n// Returns: [\"Clown Prince of Comedy\", \"The Queen of Grain\", ...]\n```",
    starterCode: "// Return an array of all villain aliases\nfunction getVillainAliases(villains) {\n  \n}",
    solution: "function getVillainAliases(villains) {\n  return villains.map(v => v.alias);\n}",
    hints: [
      "Use .map() to transform each villain object into just the alias property.",
      "The callback is: `v => v.alias`"
    ],
    resources: [{ label: "MDN: Array.prototype.map()", url: "/docs/mdn/array-map.html" }],
    testRunner: tr('getVillainAliases', [
      '  const result = fn(villains);',
      '  return [',
      '    { pass: Array.isArray(result), description: "Returns an array", got: typeof result },',
      '    { pass: result.length === 12, description: "Returns 12 aliases", got: String(result.length) },',
      '    { pass: result[0] === "Clown Prince of Comedy", description: \'First is "Clown Prince of Comedy"\', got: String(result[0]) },',
      '    { pass: result.includes("Ruler of Apocalips"), description: \'Includes "Ruler of Apocalips"\', got: String(result.includes("Ruler of Apocalips")) },',
      '    { pass: result.includes("The Feline Fatale"), description: \'Includes "The Feline Fatale"\', got: String(result.includes("The Feline Fatale")) },',
      '  ];',
    ].join('\n'))
  },
  {
    id: 1070,
    title: "DC Villains: Filter Active Villains",
    tier: 2,
    category: ["api-data", "dc-villains"],
    tags: ["arrays", "filter", "api-data", "dc-villains"],
    description: "Filter to only currently active villains.",
    instructions: "Write a function called `getActiveVillains` that takes an array of villain objects and returns only those where `isActive` is `true`.\n\nExample:\n```\ngetActiveVillains(villains)\n// Returns: [{ name: \"The Yoker\", ... }, ...]\n```",
    starterCode: "// Return only active villains\nfunction getActiveVillains(villains) {\n  \n}",
    solution: "function getActiveVillains(villains) {\n  return villains.filter(v => v.isActive);\n}",
    hints: [
      "Use .filter() to keep only villains where isActive is true.",
      "The boolean property works as the condition: `v => v.isActive`"
    ],
    resources: [{ label: "MDN: Array.prototype.filter()", url: "/docs/mdn/array-filter.html" }],
    testRunner: (() => {
      const activeCount = VILLAINS.filter(v => v.isActive).length;
      const inactive = VILLAINS.find(v => !v.isActive);
      return tr('getActiveVillains', [
        '  const result = fn(villains);',
        '  return [',
        '    { pass: Array.isArray(result), description: "Returns an array", got: typeof result },',
        `    { pass: result.length === ${activeCount}, description: "${activeCount} villains are active", got: String(result.length) },`,
        '    { pass: result.every(v => v.isActive === true), description: "All returned are active", got: String(result.every(v => v.isActive)) },',
        `    { pass: !result.find(v => v.name === "${esc(inactive.name)}"), description: 'Excludes inactive "${esc(inactive.name)}"', got: String(!result.find(v => v.name === "${esc(inactive.name)}")) },`,
        '    { pass: result.find(v => v.name === "The Yoker"), description: \'Includes "The Yoker"\', got: String(!!result.find(v => v.name === "The Yoker")) },',
        '  ];',
      ].join('\n'));
    })()
  },
  {
    id: 1071,
    title: "DC Villains: Get Hero Names",
    tier: 2,
    category: ["api-data", "dc-villains"],
    tags: ["arrays", "map", "api-data", "dc-villains"],
    description: "Extract all hero names from the heroes dataset.",
    instructions: "Write a function called `getHeroNames` that takes an array of hero objects and returns an array of their `name` properties.\n\nExample:\n```\ngetHeroNames(heroes)\n// Returns: [\"Batsman\", \"Souperman\", ...]\n```",
    starterCode: "// Return an array of all hero names\nfunction getHeroNames(heroes) {\n  \n}",
    solution: "function getHeroNames(heroes) {\n  return heroes.map(h => h.name);\n}",
    hints: [
      "Use .map() to transform each hero object into just the name property.",
      "The callback is: `h => h.name`"
    ],
    resources: [{ label: "MDN: Array.prototype.map()", url: "/docs/mdn/array-map.html" }],
    testRunner: tr('getHeroNames', [
      '  const result = fn(heroes);',
      '  return [',
      '    { pass: Array.isArray(result), description: "Returns an array", got: typeof result },',
      '    { pass: result.length === 8, description: "Returns 8 hero names", got: String(result.length) },',
      '    { pass: result[0] === "Batsman", description: \'First is "Batsman"\', got: String(result[0]) },',
      '    { pass: result.includes("Souperman"), description: \'Includes "Souperman"\', got: String(result.includes("Souperman")) },',
      '    { pass: result.includes("The Flesh"), description: \'Includes "The Flesh"\', got: String(result.includes("The Flesh")) },',
      '  ];',
    ].join('\n'))
  },
  {
    id: 1072,
    title: "DC Villains: Get Crime Counts",
    tier: 2,
    category: ["api-data", "dc-villains"],
    tags: ["arrays", "map", "nested-access", "api-data", "dc-villains"],
    description: "Extract villain names and their crime counts.",
    instructions: "Write a function called `getCrimeCounts` that takes an array of villain objects and returns an array of objects with `name` and `crimes`.\n\nExample:\n```\ngetCrimeCounts(villains)\n// Returns: [{ name: \"The Yoker\", crimes: 847 }, ...]\n```",
    starterCode: "// Return an array of { name, crimes } objects\nfunction getCrimeCounts(villains) {\n  \n}",
    solution: "function getCrimeCounts(villains) {\n  return villains.map(v => ({ name: v.name, crimes: v.crimes }));\n}",
    hints: [
      "Use .map() to build new objects with name and crimes from each villain.",
      "Return an object literal: `v => ({ name: v.name, crimes: v.crimes })`"
    ],
    resources: [{ label: "MDN: Array.prototype.map()", url: "/docs/mdn/array-map.html" }],
    testRunner: (() => {
      const yoker = VILLAINS[0];
      const dorkseid = VILLAINS.find(v => v.name === 'Dork-seid');
      return tr('getCrimeCounts', [
        '  const result = fn(villains);',
        '  return [',
        '    { pass: Array.isArray(result), description: "Returns an array", got: typeof result },',
        '    { pass: result.length === 12, description: "Returns 12 entries", got: String(result.length) },',
        `    { pass: result[0] && result[0].name === "${esc(yoker.name)}" && result[0].crimes === ${yoker.crimes}, description: "${esc(yoker.name)} has ${yoker.crimes} crimes", got: result[0] ? JSON.stringify(result[0]) : "undefined" },`,
        `    { pass: result[9] && result[9].crimes === ${dorkseid.crimes}, description: "Dork-seid has ${dorkseid.crimes} crimes", got: result[9] ? String(result[9].crimes) : "undefined" },`,
        '    { pass: result[0] && Object.keys(result[0]).length === 2, description: "Each entry has exactly 2 properties", got: result[0] ? String(Object.keys(result[0]).length) : "undefined" },',
        '  ];',
      ].join('\n'));
    })()
  },
  {
    id: 1073,
    title: "DC Villains: Filter by Origin",
    tier: 2,
    category: ["api-data", "dc-villains"],
    tags: ["arrays", "filter", "comparison", "api-data", "dc-villains"],
    description: "Filter villains by their origin type.",
    instructions: "Write a function called `filterByOrigin` that takes an array of villain objects and an `origin` string (like `\"science\"`, `\"genius\"`, `\"enhanced\"`, `\"alien\"`), and returns villains with that origin.\n\nExample:\n```\nfilterByOrigin(villains, \"science\")\n// Returns all villains with science origin\n```",
    starterCode: "// Return villains with the given origin\nfunction filterByOrigin(villains, origin) {\n  \n}",
    solution: "function filterByOrigin(villains, origin) {\n  return villains.filter(v => v.origin === origin);\n}",
    hints: [
      "Use .filter() with a strict equality check on the origin property.",
      "The condition: `v => v.origin === origin`"
    ],
    resources: [{ label: "MDN: Array.prototype.filter()", url: "/docs/mdn/array-filter.html" }],
    testRunner: (() => {
      const scienceCount = VILLAINS.filter(v => v.origin === 'science').length;
      const geniusCount = VILLAINS.filter(v => v.origin === 'genius').length;
      const alienCount = VILLAINS.filter(v => v.origin === 'alien').length;
      return tr('filterByOrigin', [
        '  const science = fn(villains, "science");',
        '  const genius = fn(villains, "genius");',
        '  const aliens = fn(villains, "alien");',
        '  return [',
        '    { pass: Array.isArray(science), description: "Returns an array", got: typeof science },',
        `    { pass: science.length === ${scienceCount}, description: "${scienceCount} science-origin villains", got: String(science.length) },`,
        `    { pass: genius.length === ${geniusCount}, description: "${geniusCount} genius-origin villains", got: String(genius.length) },`,
        `    { pass: aliens.length === ${alienCount}, description: "${alienCount} alien-origin villains", got: String(aliens.length) },`,
        '    { pass: science.every(v => v.origin === "science"), description: "All returned have correct origin", got: String(science.every(v => v.origin === "science")) },',
        '  ];',
      ].join('\n'));
    })()
  },

  // ── T3 (7 exercises) ──────────────────────────────────────────────────────

  {
    id: 1074,
    title: "DC Villains: Most Wanted",
    tier: 3,
    category: ["api-data", "dc-villains"],
    tags: ["arrays", "sort", "slice", "map", "api-data", "dc-villains"],
    description: "Sort villains by crime count and return the most wanted.",
    instructions: "Write a function called `getMostWanted` that takes the `villains` array and a number `n`, and returns the top `n` villains by `crimes` count descending. Return an array of objects with `name`, `alias`, and `crimes`.\n\nExample:\n```\ngetMostWanted(villains, 3)\n// Returns: [{ name: \"Dork-seid\", alias: \"Ruler of Apocalips\", crimes: 9999 }, ...]\n```",
    starterCode: "function getMostWanted(villains, n) {\n  \n}",
    solution: "function getMostWanted(villains, n) {\n  return [...villains]\n    .sort((a, b) => b.crimes - a.crimes)\n    .slice(0, n)\n    .map(v => ({ name: v.name, alias: v.alias, crimes: v.crimes }));\n}",
    hints: [
      "Sort a copy by crimes descending, slice the first n, and map to { name, alias, crimes }.",
      "Use spread to avoid mutating: `[...villains].sort((a, b) => b.crimes - a.crimes)`"
    ],
    resources: [
      { label: "MDN: Array.prototype.sort()", url: "/docs/mdn/array-sort.html" },
      { label: "MDN: Array.prototype.slice()", url: "/docs/mdn/array-slice.html" }
    ],
    testRunner: (() => {
      const sorted = [...VILLAINS].sort((a, b) => b.crimes - a.crimes);
      const top1 = sorted[0];
      const top3 = sorted[2];
      return tr('getMostWanted', [
        '  const top1 = fn(villains, 1);',
        '  const top3 = fn(villains, 3);',
        '  const top5 = fn(villains, 5);',
        '  return [',
        `    { pass: top1.length === 1 && top1[0].name === "${esc(top1.name)}", description: 'Most wanted: "${esc(top1.name)}"', got: top1[0] ? top1[0].name : "undefined" },`,
        `    { pass: top1[0] && top1[0].crimes === ${top1.crimes}, description: "Top villain has ${top1.crimes} crimes", got: top1[0] ? String(top1[0].crimes) : "undefined" },`,
        '    { pass: top3.length === 3, description: "Top 3 returns 3 entries", got: String(top3.length) },',
        `    { pass: top3[2] && top3[2].name === "${esc(top3.name)}", description: '3rd most wanted: "${esc(top3.name)}"', got: top3[2] ? top3[2].name : "undefined" },`,
        '    { pass: top5.length === 5 && top5[0].crimes >= top5[4].crimes, description: "Top 5 sorted descending by crimes", got: top5.map(v => v.crimes).join(", ") },',
        '  ];',
      ].join('\n'));
    })()
  },
  {
    id: 1075,
    title: "DC Villains: Nemesis Lookup",
    tier: 3,
    category: ["api-data", "dc-villains"],
    tags: ["arrays", "find", "cross-reference", "api-data", "dc-villains"],
    description: "Look up each villain's nemesis hero using cross-referencing.",
    instructions: "Write a function called `getVillainNemesis` that takes the `villains` array, `heroes` array, and a `villainId` number. Return an object with:\n- `villain`: the villain's name\n- `alias`: the villain's alias\n- `nemesis`: the hero's name (cross-referenced via `nemesisId`)\n- `nemesisAlias`: the hero's alias\n\nExample:\n```\ngetVillainNemesis(villains, heroes, 1)\n// Returns: { villain: \"The Yoker\", alias: \"Clown Prince of Comedy\", nemesis: \"Batsman\", nemesisAlias: \"The Bark Knight\" }\n```",
    starterCode: "function getVillainNemesis(villains, heroes, villainId) {\n  \n}",
    solution: "function getVillainNemesis(villains, heroes, villainId) {\n  const villain = villains.find(v => v.id === villainId);\n  const hero = heroes.find(h => h.id === villain.nemesisId);\n  return { villain: villain.name, alias: villain.alias, nemesis: hero.name, nemesisAlias: hero.alias };\n}",
    hints: [
      "Use .find() to get the villain, then .find() again on heroes using the villain's nemesisId.",
      "Chain: `heroes.find(h => h.id === villain.nemesisId)` to get the nemesis hero."
    ],
    resources: [
      { label: "MDN: Array.prototype.find()", url: "/docs/mdn/array-find.html" }
    ],
    testRunner: (() => {
      const yoker = VILLAINS[0];
      const yokerNemesis = HEROES.find(h => h.id === yoker.nemesisId);
      const dorkseid = VILLAINS.find(v => v.name === 'Dork-seid');
      const dorkseidNemesis = HEROES.find(h => h.id === dorkseid.nemesisId);
      return tr('getVillainNemesis', [
        '  const r1 = fn(villains, heroes, 1);',
        '  const r10 = fn(villains, heroes, 10);',
        '  return [',
        `    { pass: r1 && r1.villain === "${esc(yoker.name)}", description: 'Villain 1: "${esc(yoker.name)}"', got: r1 ? r1.villain : "undefined" },`,
        `    { pass: r1 && r1.nemesis === "${esc(yokerNemesis.name)}", description: 'Yoker\\'s nemesis: "${esc(yokerNemesis.name)}"', got: r1 ? r1.nemesis : "undefined" },`,
        `    { pass: r1 && r1.nemesisAlias === "${esc(yokerNemesis.alias)}", description: 'Nemesis alias: "${esc(yokerNemesis.alias)}"', got: r1 ? r1.nemesisAlias : "undefined" },`,
        `    { pass: r10 && r10.nemesis === "${esc(dorkseidNemesis.name)}", description: 'Dork-seid\\'s nemesis: "${esc(dorkseidNemesis.name)}"', got: r10 ? r10.nemesis : "undefined" },`,
        '    { pass: r1 && Object.keys(r1).length === 4, description: "Returns 4 properties", got: r1 ? String(Object.keys(r1).length) : "undefined" },',
        '  ];',
      ].join('\n'));
    })()
  },
  {
    id: 1076,
    title: "DC Villains: Rogues Gallery",
    tier: 3,
    category: ["api-data", "dc-villains"],
    tags: ["arrays", "filter", "map", "cross-reference", "api-data", "dc-villains"],
    description: "Build a hero's rogues gallery — all villains who consider them their nemesis.",
    instructions: "Write a function called `getRoguesGallery` that takes the `villains` array, `heroes` array, and a `heroId` number. Return an object with:\n- `hero`: the hero's name\n- `rogues`: sorted array of villain names whose `nemesisId` matches this hero\n- `count`: number of rogues\n\nExample:\n```\ngetRoguesGallery(villains, heroes, 1)\n// Returns: { hero: \"Batsman\", rogues: [\"Bane-ana\", \"Barley Quinn\", ...], count: 8 }\n```",
    starterCode: "function getRoguesGallery(villains, heroes, heroId) {\n  \n}",
    solution: "function getRoguesGallery(villains, heroes, heroId) {\n  const hero = heroes.find(h => h.id === heroId);\n  const rogues = villains.filter(v => v.nemesisId === heroId).map(v => v.name).sort();\n  return { hero: hero.name, rogues, count: rogues.length };\n}",
    hints: [
      "Find the hero, then filter villains whose nemesisId matches the heroId.",
      "Chain: `villains.filter(v => v.nemesisId === heroId).map(v => v.name).sort()`"
    ],
    resources: [
      { label: "MDN: Array.prototype.filter()", url: "/docs/mdn/array-filter.html" },
      { label: "MDN: Array.prototype.find()", url: "/docs/mdn/array-find.html" }
    ],
    testRunner: (() => {
      const batsmanRogues = VILLAINS.filter(v => v.nemesisId === 1).map(v => v.name).sort();
      const soupermanRogues = VILLAINS.filter(v => v.nemesisId === 2).map(v => v.name).sort();
      const aquaRogues = VILLAINS.filter(v => v.nemesisId === 5);
      return tr('getRoguesGallery', [
        '  const r1 = fn(villains, heroes, 1);',
        '  const r2 = fn(villains, heroes, 2);',
        '  const r5 = fn(villains, heroes, 5);',
        '  return [',
        `    { pass: r1 && r1.hero === "Batsman", description: 'Hero 1: "Batsman"', got: r1 ? r1.hero : "undefined" },`,
        `    { pass: r1 && r1.count === ${batsmanRogues.length}, description: "Batsman has ${batsmanRogues.length} rogues", got: r1 ? String(r1.count) : "undefined" },`,
        `    { pass: r2 && r2.count === ${soupermanRogues.length}, description: "Souperman has ${soupermanRogues.length} rogues", got: r2 ? String(r2.count) : "undefined" },`,
        `    { pass: r5 && r5.count === ${aquaRogues.length}, description: "Aqua-manager has ${aquaRogues.length} rogues", got: r5 ? String(r5.count) : "undefined" },`,
        '    { pass: r1 && JSON.stringify(r1.rogues) === JSON.stringify([...r1.rogues].sort()), description: "Rogues sorted alphabetically", got: "sorted" },',
        '  ];',
      ].join('\n'));
    })()
  },
  {
    id: 1077,
    title: "DC Villains: Team Roster",
    tier: 3,
    category: ["api-data", "dc-villains"],
    tags: ["arrays", "filter", "sort", "api-data", "dc-villains"],
    description: "Get all villains on a specific team, sorted by crimes.",
    instructions: "Write a function called `getTeamRoster` that takes the `villains` array and a `team` string (like `\"Legion of Gloom\"`, `\"Suicide Squid\"`, or `\"solo\"`). Return an array of objects with `name`, `alias`, and `crimes`, sorted by crimes descending.\n\nExample:\n```\ngetTeamRoster(villains, \"Suicide Squid\")\n// Returns: [{ name: \"Deathstork\", alias: \"...\", crimes: 412 }, ...]\n```",
    starterCode: "function getTeamRoster(villains, team) {\n  \n}",
    solution: "function getTeamRoster(villains, team) {\n  return villains\n    .filter(v => v.team === team)\n    .sort((a, b) => b.crimes - a.crimes)\n    .map(v => ({ name: v.name, alias: v.alias, crimes: v.crimes }));\n}",
    hints: [
      "Filter by team, sort by crimes descending, then map to { name, alias, crimes }.",
      "Chain: `.filter(v => v.team === team).sort((a, b) => b.crimes - a.crimes).map(...)`"
    ],
    resources: [
      { label: "MDN: Array.prototype.filter()", url: "/docs/mdn/array-filter.html" },
      { label: "MDN: Array.prototype.sort()", url: "/docs/mdn/array-sort.html" }
    ],
    testRunner: (() => {
      const legion = VILLAINS.filter(v => v.team === 'Legion of Gloom').sort((a, b) => b.crimes - a.crimes);
      const suicide = VILLAINS.filter(v => v.team === 'Suicide Squid').sort((a, b) => b.crimes - a.crimes);
      const solo = VILLAINS.filter(v => v.team === 'solo');
      return tr('getTeamRoster', [
        '  const leg = fn(villains, "Legion of Gloom");',
        '  const sui = fn(villains, "Suicide Squid");',
        '  const sol = fn(villains, "solo");',
        '  return [',
        `    { pass: leg.length === ${legion.length}, description: "Legion of Gloom has ${legion.length} members", got: String(leg.length) },`,
        `    { pass: leg[0] && leg[0].name === "${esc(legion[0].name)}", description: 'Top Legion criminal: "${esc(legion[0].name)}"', got: leg[0] ? leg[0].name : "undefined" },`,
        `    { pass: sui.length === ${suicide.length}, description: "Suicide Squid has ${suicide.length} members", got: String(sui.length) },`,
        `    { pass: sol.length === ${solo.length}, description: "${solo.length} solo villains", got: String(sol.length) },`,
        '    { pass: leg[0] && leg[0].crimes >= leg[leg.length - 1].crimes, description: "Legion sorted by crimes descending", got: leg.map(v => v.crimes).join(", ") },',
        '  ];',
      ].join('\n'));
    })()
  },
  {
    id: 1078,
    title: "DC Villains: Average Villain Stats",
    tier: 3,
    category: ["api-data", "dc-villains"],
    tags: ["arrays", "filter", "reduce", "api-data", "dc-villains"],
    description: "Calculate average stats for villains of a given origin.",
    instructions: "Write a function called `getAvgStatsByOrigin` that takes the `villains` array and an `origin` string. Return an object with:\n- `origin`: the origin string\n- `count`: number of villains with that origin\n- `avgStrength`: average strength (rounded to 1 decimal)\n- `avgIntelligence`: average intelligence (rounded to 1 decimal)\n- `avgCrimes`: average crimes (rounded to nearest integer)\n\nExample:\n```\ngetAvgStatsByOrigin(villains, \"science\")\n// Returns: { origin: \"science\", count: 3, avgStrength: ..., avgIntelligence: ..., avgCrimes: ... }\n```",
    starterCode: "function getAvgStatsByOrigin(villains, origin) {\n  \n}",
    solution: "function getAvgStatsByOrigin(villains, origin) {\n  const group = villains.filter(v => v.origin === origin);\n  if (group.length === 0) return { origin, count: 0, avgStrength: 0, avgIntelligence: 0, avgCrimes: 0 };\n  return {\n    origin,\n    count: group.length,\n    avgStrength: Math.round(group.reduce((s, v) => s + v.stats.strength, 0) / group.length * 10) / 10,\n    avgIntelligence: Math.round(group.reduce((s, v) => s + v.stats.intelligence, 0) / group.length * 10) / 10,\n    avgCrimes: Math.round(group.reduce((s, v) => s + v.crimes, 0) / group.length)\n  };\n}",
    hints: [
      "Filter by origin, then use .reduce() to calculate averages across the group.",
      "Round to 1 decimal: `Math.round(sum / count * 10) / 10`"
    ],
    resources: [
      { label: "MDN: Array.prototype.reduce()", url: "/docs/mdn/array-reduce.html" },
      { label: "MDN: Math.round()", url: "/docs/mdn/math-round.html" }
    ],
    testRunner: (() => {
      const science = VILLAINS.filter(v => v.origin === 'science');
      const sciAvgStr = Math.round(science.reduce((s, v) => s + v.stats.strength, 0) / science.length * 10) / 10;
      const sciAvgInt = Math.round(science.reduce((s, v) => s + v.stats.intelligence, 0) / science.length * 10) / 10;
      const sciAvgCrimes = Math.round(science.reduce((s, v) => s + v.crimes, 0) / science.length);
      const alien = VILLAINS.filter(v => v.origin === 'alien');
      const alienAvgCrimes = Math.round(alien.reduce((s, v) => s + v.crimes, 0) / alien.length);
      return tr('getAvgStatsByOrigin', [
        '  const sci = fn(villains, "science");',
        '  const ali = fn(villains, "alien");',
        '  const none = fn(villains, "magic");',
        '  return [',
        `    { pass: sci && sci.count === ${science.length}, description: "${science.length} science villains", got: sci ? String(sci.count) : "undefined" },`,
        `    { pass: sci && sci.avgStrength === ${sciAvgStr}, description: "Science avg strength: ${sciAvgStr}", got: sci ? String(sci.avgStrength) : "undefined" },`,
        `    { pass: sci && sci.avgIntelligence === ${sciAvgInt}, description: "Science avg intelligence: ${sciAvgInt}", got: sci ? String(sci.avgIntelligence) : "undefined" },`,
        `    { pass: ali && ali.avgCrimes === ${alienAvgCrimes}, description: "Alien avg crimes: ${alienAvgCrimes}", got: ali ? String(ali.avgCrimes) : "undefined" },`,
        '    { pass: none && none.count === 0 && none.avgCrimes === 0, description: "Empty origin returns 0s", got: none ? String(none.avgCrimes) : "undefined" },',
        '  ];',
      ].join('\n'));
    })()
  },
  {
    id: 1079,
    title: "DC Villains: Villain Timeline",
    tier: 3,
    category: ["api-data", "dc-villains"],
    tags: ["arrays", "sort", "map", "filter", "api-data", "dc-villains"],
    description: "Build a timeline of villain debuts within a year range.",
    instructions: "Write a function called `getVillainTimeline` that takes the `villains` array, a `startYear`, and an `endYear`. Return villains who debuted in that range (inclusive), sorted by `yearDebuted` ascending, mapped to objects with `name`, `alias`, and `yearDebuted`.\n\nExample:\n```\ngetVillainTimeline(villains, 1940, 1950)\n// Returns: [{ name: \"The Yoker\", alias: \"...\", yearDebuted: 1940 }, ...]\n```",
    starterCode: "function getVillainTimeline(villains, startYear, endYear) {\n  \n}",
    solution: "function getVillainTimeline(villains, startYear, endYear) {\n  return villains\n    .filter(v => v.yearDebuted >= startYear && v.yearDebuted <= endYear)\n    .sort((a, b) => a.yearDebuted - b.yearDebuted)\n    .map(v => ({ name: v.name, alias: v.alias, yearDebuted: v.yearDebuted }));\n}",
    hints: [
      "Filter for villains whose yearDebuted falls between startYear and endYear (inclusive), then sort and map.",
      "The filter condition: `v => v.yearDebuted >= startYear && v.yearDebuted <= endYear`"
    ],
    resources: [
      { label: "MDN: Array.prototype.filter()", url: "/docs/mdn/array-filter.html" },
      { label: "MDN: Array.prototype.sort()", url: "/docs/mdn/array-sort.html" }
    ],
    testRunner: (() => {
      const golden = VILLAINS.filter(v => v.yearDebuted >= 1940 && v.yearDebuted <= 1950).sort((a, b) => a.yearDebuted - b.yearDebuted);
      const modern = VILLAINS.filter(v => v.yearDebuted >= 1980 && v.yearDebuted <= 2000).sort((a, b) => a.yearDebuted - b.yearDebuted);
      const none = VILLAINS.filter(v => v.yearDebuted >= 2020 && v.yearDebuted <= 2030);
      return tr('getVillainTimeline', [
        '  const golden = fn(villains, 1940, 1950);',
        '  const modern = fn(villains, 1980, 2000);',
        '  const none = fn(villains, 2020, 2030);',
        '  return [',
        `    { pass: golden.length === ${golden.length}, description: "${golden.length} villains debuted 1940-1950", got: String(golden.length) },`,
        `    { pass: golden[0] && golden[0].yearDebuted === ${golden[0].yearDebuted}, description: "Earliest golden age: ${golden[0].yearDebuted}", got: golden[0] ? String(golden[0].yearDebuted) : "undefined" },`,
        `    { pass: modern.length === ${modern.length}, description: "${modern.length} villains debuted 1980-2000", got: String(modern.length) },`,
        '    { pass: none.length === 0, description: "No villains debuted 2020-2030", got: String(none.length) },',
        '    { pass: golden[0] && golden[0].yearDebuted <= golden[golden.length - 1].yearDebuted, description: "Timeline sorted ascending", got: golden.map(v => v.yearDebuted).join(", ") },',
        '  ];',
      ].join('\n'));
    })()
  },
  {
    id: 1080,
    title: "DC Villains: Power Frequency",
    tier: 3,
    category: ["api-data", "dc-villains"],
    tags: ["arrays", "flatMap", "reduce", "api-data", "dc-villains"],
    description: "Count how frequently each power appears across all villains.",
    instructions: "Write a function called `getPowerFrequency` that takes the `villains` array. Return an array of `{ power, count }` objects — one for each unique power across all villains — sorted by count descending, then power name ascending for ties.\n\nExample:\n```\ngetPowerFrequency(villains)\n// Returns: [{ power: \"genius intellect\", count: 3 }, ...]\n```",
    starterCode: "function getPowerFrequency(villains) {\n  \n}",
    solution: "function getPowerFrequency(villains) {\n  const counts = villains.flatMap(v => v.powers).reduce((acc, p) => {\n    acc[p] = (acc[p] || 0) + 1;\n    return acc;\n  }, {});\n  return Object.entries(counts)\n    .map(([power, count]) => ({ power, count }))\n    .sort((a, b) => b.count - a.count || a.power.localeCompare(b.power));\n}",
    hints: [
      "Use .flatMap() to get all powers, .reduce() to count occurrences, then convert to array and sort.",
      "Build counts with: `villains.flatMap(v => v.powers).reduce((acc, p) => { acc[p] = (acc[p] || 0) + 1; return acc; }, {})`"
    ],
    resources: [
      { label: "MDN: Array.prototype.flatMap()", url: "/docs/mdn/array-flatmap.html" },
      { label: "MDN: Array.prototype.reduce()", url: "/docs/mdn/array-reduce.html" }
    ],
    testRunner: (() => {
      const counts = VILLAINS.flatMap(v => v.powers).reduce((acc, p) => { acc[p] = (acc[p] || 0) + 1; return acc; }, {});
      const sorted = Object.entries(counts).map(([power, count]) => ({ power, count })).sort((a, b) => b.count - a.count || a.power.localeCompare(b.power));
      const top = sorted[0];
      const totalUnique = sorted.length;
      return tr('getPowerFrequency', [
        '  const result = fn(villains);',
        '  return [',
        `    { pass: Array.isArray(result), description: "Returns an array", got: typeof result },`,
        `    { pass: result.length === ${totalUnique}, description: "${totalUnique} unique powers", got: String(result.length) },`,
        `    { pass: result[0] && result[0].power === "${esc(top.power)}" && result[0].count === ${top.count}, description: 'Most common: "${esc(top.power)}" (${top.count})', got: result[0] ? result[0].power + " (" + result[0].count + ")" : "undefined" },`,
        '    { pass: result[0] && result[0].count >= result[result.length - 1].count, description: "Sorted by count descending", got: result.slice(0, 3).map(r => r.count).join(", ") },',
        `    { pass: result.every(r => r.power && typeof r.count === "number"), description: "Each entry has power and count", got: "valid" },`,
        '  ];',
      ].join('\n'));
    })()
  },

  // ── T4 (4 exercises) ──────────────────────────────────────────────────────

  {
    id: 1081,
    title: "DC Villains: Hero Threat Report",
    tier: 4,
    category: ["api-data", "dc-villains"],
    tags: ["arrays", "reduce", "cross-reference", "data-transformation", "api-data", "dc-villains"],
    description: "Build a comprehensive threat report for each hero.",
    instructions: "Write a function called `buildThreatReport` that takes the `villains` and `heroes` arrays. Return an array of threat report objects (one per hero), sorted by threat count descending, each with:\n- `hero`: hero name\n- `city`: hero's city\n- `threats`: sorted array of villain names targeting this hero\n- `threatCount`: number of villains\n- `totalCrimes`: sum of all crimes by villains targeting this hero\n- `mostDangerous`: name of the villain with the most crimes (or `\"none\"` if no threats)",
    starterCode: "",
    solution: "function buildThreatReport(villains, heroes) {\n  return heroes.map(h => {\n    const threats = villains.filter(v => v.nemesisId === h.id);\n    const sorted = [...threats].sort((a, b) => b.crimes - a.crimes);\n    return {\n      hero: h.name,\n      city: h.city,\n      threats: threats.map(v => v.name).sort(),\n      threatCount: threats.length,\n      totalCrimes: threats.reduce((s, v) => s + v.crimes, 0),\n      mostDangerous: sorted.length > 0 ? sorted[0].name : \"none\"\n    };\n  }).sort((a, b) => b.threatCount - a.threatCount);\n}",
    hints: [
      "Map each hero to a report by filtering villains whose nemesisId matches, then sort by threatCount descending.",
      "For mostDangerous, sort the villain threats by crimes descending and take the first, or return 'none' if empty."
    ],
    resources: [
      { label: "MDN: Array.prototype.reduce()", url: "/docs/mdn/array-reduce.html" },
      { label: "MDN: Array.prototype.sort()", url: "/docs/mdn/array-sort.html" }
    ],
    testRunner: (() => {
      const reports = HEROES.map(h => {
        const threats = VILLAINS.filter(v => v.nemesisId === h.id);
        const sorted = [...threats].sort((a, b) => b.crimes - a.crimes);
        return { hero: h.name, city: h.city, threats: threats.map(v => v.name).sort(), threatCount: threats.length, totalCrimes: threats.reduce((s, v) => s + v.crimes, 0), mostDangerous: sorted.length > 0 ? sorted[0].name : "none" };
      }).sort((a, b) => b.threatCount - a.threatCount);
      const top = reports[0];
      const batsmanCrimes = VILLAINS.filter(v => v.nemesisId === 1).reduce((s, v) => s + v.crimes, 0);
      const noThreats = reports.filter(r => r.threatCount === 0);
      return tr('buildThreatReport', [
        '  const result = fn(villains, heroes);',
        '  return [',
        '    { pass: Array.isArray(result) && result.length === 8, description: "Returns 8 hero reports", got: result ? String(result.length) : "undefined" },',
        `    { pass: result[0] && result[0].hero === "${esc(top.hero)}", description: 'Most targeted: "${esc(top.hero)}"', got: result[0] ? result[0].hero : "undefined" },`,
        `    { pass: result[0] && result[0].threatCount === ${top.threatCount}, description: "${esc(top.hero)} has ${top.threatCount} threats", got: result[0] ? String(result[0].threatCount) : "undefined" },`,
        `    { pass: result[0] && result[0].totalCrimes === ${batsmanCrimes}, description: "${esc(top.hero)} total threat crimes: ${batsmanCrimes}", got: result[0] ? String(result[0].totalCrimes) : "undefined" },`,
        `    { pass: result.filter(r => r.threatCount === 0).length === ${noThreats.length}, description: "${noThreats.length} heroes have no villains", got: String(result.filter(r => r.threatCount === 0).length) },`,
        `    { pass: result.filter(r => r.mostDangerous === "none").length === ${noThreats.length}, description: '"none" for heroes without threats', got: String(result.filter(r => r.mostDangerous === "none").length) },`,
        '  ];',
      ].join('\n'));
    })()
  },
  {
    id: 1082,
    title: "DC Villains: Origin Analysis",
    tier: 4,
    category: ["api-data", "dc-villains"],
    tags: ["arrays", "reduce", "aggregation", "api-data", "dc-villains"],
    description: "Build a comprehensive analysis for each villain origin type.",
    instructions: "Write a function called `buildOriginAnalysis` that takes the `villains` array. Return an array of origin report objects (one per unique origin), sorted by total crimes descending, each with:\n- `origin`: origin name\n- `members`: sorted array of villain names\n- `count`: number of villains\n- `totalCrimes`: sum of crimes\n- `avgPower`: average total power (sum of all 4 stats) rounded to 1 decimal\n- `activeCount`: number of active villains in this origin",
    starterCode: "",
    solution: "function buildOriginAnalysis(villains) {\n  const origins = [...new Set(villains.map(v => v.origin))];\n  return origins.map(o => {\n    const group = villains.filter(v => v.origin === o);\n    const totalPower = group.reduce((s, v) => s + v.stats.strength + v.stats.speed + v.stats.intelligence + v.stats.durability, 0);\n    return {\n      origin: o,\n      members: group.map(v => v.name).sort(),\n      count: group.length,\n      totalCrimes: group.reduce((s, v) => s + v.crimes, 0),\n      avgPower: Math.round(totalPower / group.length * 10) / 10,\n      activeCount: group.filter(v => v.isActive).length\n    };\n  }).sort((a, b) => b.totalCrimes - a.totalCrimes);\n}",
    hints: [
      "Get unique origins with `[...new Set(villains.map(v => v.origin))]`, map each to a report, sort by totalCrimes.",
      "Total power per villain: `v.stats.strength + v.stats.speed + v.stats.intelligence + v.stats.durability`"
    ],
    resources: [
      { label: "MDN: Set", url: "/docs/mdn/set.html" },
      { label: "MDN: Array.prototype.reduce()", url: "/docs/mdn/array-reduce.html" }
    ],
    testRunner: (() => {
      const origins = [...new Set(VILLAINS.map(v => v.origin))];
      const reports = origins.map(o => {
        const group = VILLAINS.filter(v => v.origin === o);
        const totalPower = group.reduce((s, v) => s + v.stats.strength + v.stats.speed + v.stats.intelligence + v.stats.durability, 0);
        return { origin: o, members: group.map(v => v.name).sort(), count: group.length, totalCrimes: group.reduce((s, v) => s + v.crimes, 0), avgPower: Math.round(totalPower / group.length * 10) / 10, activeCount: group.filter(v => v.isActive).length };
      }).sort((a, b) => b.totalCrimes - a.totalCrimes);
      const top = reports[0];
      return tr('buildOriginAnalysis', [
        '  const result = fn(villains);',
        '  return [',
        `    { pass: Array.isArray(result) && result.length === ${origins.length}, description: "${origins.length} unique origins", got: result ? String(result.length) : "undefined" },`,
        `    { pass: result[0] && result[0].origin === "${esc(top.origin)}", description: 'Most crimes origin: "${esc(top.origin)}"', got: result[0] ? result[0].origin : "undefined" },`,
        `    { pass: result[0] && result[0].totalCrimes === ${top.totalCrimes}, description: "Top origin total crimes: ${top.totalCrimes}", got: result[0] ? String(result[0].totalCrimes) : "undefined" },`,
        `    { pass: result[0] && result[0].avgPower === ${top.avgPower}, description: "Top origin avg power: ${top.avgPower}", got: result[0] ? String(result[0].avgPower) : "undefined" },`,
        '    { pass: result[0] && result[0].totalCrimes >= result[result.length - 1].totalCrimes, description: "Sorted by total crimes descending", got: result.map(r => r.totalCrimes).join(", ") },',
        '    { pass: result.every(r => Array.isArray(r.members) && JSON.stringify(r.members) === JSON.stringify([...r.members].sort())), description: "All member arrays sorted", got: "sorted" },',
        '  ];',
      ].join('\n'));
    })()
  },
  {
    id: 1083,
    title: "DC Villains: Team Comparison",
    tier: 4,
    category: ["api-data", "dc-villains"],
    tags: ["arrays", "reduce", "cross-reference", "aggregation", "api-data", "dc-villains"],
    description: "Compare villain teams with comprehensive stats.",
    instructions: "Write a function called `compareTeams` that takes the `villains` and `heroes` arrays. Return an array of team report objects (one per unique team value), sorted by team name ascending, each with:\n- `team`: team name\n- `members`: sorted array of villain names\n- `count`: number of members\n- `totalCrimes`: sum of all member crimes\n- `avgIntelligence`: average intelligence (rounded to 1 decimal)\n- `nemeses`: sorted array of unique hero names targeted by team members",
    starterCode: "",
    solution: "function compareTeams(villains, heroes) {\n  const teams = [...new Set(villains.map(v => v.team))].sort();\n  return teams.map(t => {\n    const members = villains.filter(v => v.team === t);\n    const nemesisIds = [...new Set(members.map(v => v.nemesisId))];\n    const nemeses = nemesisIds.map(id => heroes.find(h => h.id === id).name).sort();\n    return {\n      team: t,\n      members: members.map(v => v.name).sort(),\n      count: members.length,\n      totalCrimes: members.reduce((s, v) => s + v.crimes, 0),\n      avgIntelligence: Math.round(members.reduce((s, v) => s + v.stats.intelligence, 0) / members.length * 10) / 10,\n      nemeses\n    };\n  });\n}",
    hints: [
      "Get unique teams, map each to a report. For nemeses, get unique nemesisIds from members and look up hero names.",
      "Unique nemesis IDs: `[...new Set(members.map(v => v.nemesisId))]`, then map to hero names."
    ],
    resources: [
      { label: "MDN: Set", url: "/docs/mdn/set.html" },
      { label: "MDN: Array.prototype.reduce()", url: "/docs/mdn/array-reduce.html" }
    ],
    testRunner: (() => {
      const teams = [...new Set(VILLAINS.map(v => v.team))].sort();
      const legion = VILLAINS.filter(v => v.team === 'Legion of Gloom');
      const legionCrimes = legion.reduce((s, v) => s + v.crimes, 0);
      const legionAvgInt = Math.round(legion.reduce((s, v) => s + v.stats.intelligence, 0) / legion.length * 10) / 10;
      const legionNemIds = [...new Set(legion.map(v => v.nemesisId))];
      const legionNemeses = legionNemIds.map(id => HEROES.find(h => h.id === id).name).sort();
      return tr('compareTeams', [
        '  const result = fn(villains, heroes);',
        '  return [',
        `    { pass: Array.isArray(result) && result.length === ${teams.length}, description: "${teams.length} unique teams", got: result ? String(result.length) : "undefined" },`,
        `    { pass: result[0] && result[0].team === "${esc(teams[0])}", description: 'First team alphabetically: "${esc(teams[0])}"', got: result[0] ? result[0].team : "undefined" },`,
        `    { pass: result.find(r => r.team === "Legion of Gloom") && result.find(r => r.team === "Legion of Gloom").totalCrimes === ${legionCrimes}, description: "Legion of Gloom total crimes: ${legionCrimes}", got: result.find(r => r.team === "Legion of Gloom") ? String(result.find(r => r.team === "Legion of Gloom").totalCrimes) : "undefined" },`,
        `    { pass: result.find(r => r.team === "Legion of Gloom") && result.find(r => r.team === "Legion of Gloom").avgIntelligence === ${legionAvgInt}, description: "Legion avg intelligence: ${legionAvgInt}", got: result.find(r => r.team === "Legion of Gloom") ? String(result.find(r => r.team === "Legion of Gloom").avgIntelligence) : "undefined" },`,
        `    { pass: result.find(r => r.team === "Legion of Gloom") && result.find(r => r.team === "Legion of Gloom").nemeses.length === ${legionNemeses.length}, description: "Legion targets ${legionNemeses.length} heroes", got: result.find(r => r.team === "Legion of Gloom") ? String(result.find(r => r.team === "Legion of Gloom").nemeses.length) : "undefined" },`,
        '    { pass: result.every(r => JSON.stringify(r.members) === JSON.stringify([...r.members].sort())), description: "All member arrays sorted", got: "sorted" },',
        '  ];',
      ].join('\n'));
    })()
  },
  {
    id: 1084,
    title: "DC Villains: Full Villain Database",
    tier: 4,
    category: ["api-data", "dc-villains"],
    tags: ["arrays", "reduce", "cross-reference", "data-transformation", "aggregation", "api-data", "dc-villains"],
    description: "Build a comprehensive villain database analysis using both datasets.",
    instructions: "Write a function called `buildVillainDatabase` that takes the `villains` and `heroes` arrays. Return a comprehensive analysis object with:\n- `totalVillains`: number of villains\n- `activeVillains`: number of active villains\n- `totalCrimes`: sum of all villain crimes\n- `mostWanted`: `{ name, crimes }` — villain with the most crimes\n- `averagePower`: average total power (sum of 4 stats) across all villains (rounded to 1 decimal)\n- `teamBreakdown`: object mapping each team name to count of members\n- `originBreakdown`: object mapping each origin to count of villains\n- `heroWithMostThreats`: `{ name, count }` — hero targeted by the most villains\n- `oldestVillain`: `{ name, yearDebuted }` — villain who debuted earliest\n- `totalPowers`: total count of all powers across all villains (including duplicates)",
    starterCode: "",
    solution: "function buildVillainDatabase(villains, heroes) {\n  const mostWanted = [...villains].sort((a, b) => b.crimes - a.crimes)[0];\n  const totalPower = villains.reduce((s, v) => s + v.stats.strength + v.stats.speed + v.stats.intelligence + v.stats.durability, 0);\n  const teamBreakdown = villains.reduce((acc, v) => { acc[v.team] = (acc[v.team] || 0) + 1; return acc; }, {});\n  const originBreakdown = villains.reduce((acc, v) => { acc[v.origin] = (acc[v.origin] || 0) + 1; return acc; }, {});\n  const heroThreats = heroes.map(h => ({ name: h.name, count: villains.filter(v => v.nemesisId === h.id).length })).sort((a, b) => b.count - a.count)[0];\n  const oldest = [...villains].sort((a, b) => a.yearDebuted - b.yearDebuted)[0];\n  return {\n    totalVillains: villains.length,\n    activeVillains: villains.filter(v => v.isActive).length,\n    totalCrimes: villains.reduce((s, v) => s + v.crimes, 0),\n    mostWanted: { name: mostWanted.name, crimes: mostWanted.crimes },\n    averagePower: Math.round(totalPower / villains.length * 10) / 10,\n    teamBreakdown,\n    originBreakdown,\n    heroWithMostThreats: heroThreats,\n    oldestVillain: { name: oldest.name, yearDebuted: oldest.yearDebuted },\n    totalPowers: villains.reduce((s, v) => s + v.powers.length, 0)\n  };\n}",
    hints: [
      "Break the problem into parts: counts, sorts for most-wanted/oldest, .reduce() for breakdowns, and cross-reference for hero threats.",
      "For heroWithMostThreats, map each hero to { name, count: villains.filter(v => v.nemesisId === h.id).length }, then sort."
    ],
    resources: [
      { label: "MDN: Array.prototype.reduce()", url: "/docs/mdn/array-reduce.html" },
      { label: "MDN: Object.entries()", url: "/docs/mdn/object-entries.html" }
    ],
    testRunner: (() => {
      const activeCount = VILLAINS.filter(v => v.isActive).length;
      const totalCrimes = VILLAINS.reduce((s, v) => s + v.crimes, 0);
      const mostWanted = [...VILLAINS].sort((a, b) => b.crimes - a.crimes)[0];
      const totalPower = VILLAINS.reduce((s, v) => s + v.stats.strength + v.stats.speed + v.stats.intelligence + v.stats.durability, 0);
      const avgPower = Math.round(totalPower / VILLAINS.length * 10) / 10;
      const heroThreats = HEROES.map(h => ({ name: h.name, count: VILLAINS.filter(v => v.nemesisId === h.id).length })).sort((a, b) => b.count - a.count)[0];
      const oldest = [...VILLAINS].sort((a, b) => a.yearDebuted - b.yearDebuted)[0];
      const totalPowers = VILLAINS.reduce((s, v) => s + v.powers.length, 0);
      const teamBreakdown = VILLAINS.reduce((acc, v) => { acc[v.team] = (acc[v.team] || 0) + 1; return acc; }, {});
      return tr('buildVillainDatabase', [
        '  const result = fn(villains, heroes);',
        '  return [',
        `    { pass: result && result.totalVillains === 12, description: "12 total villains", got: result ? String(result.totalVillains) : "undefined" },`,
        `    { pass: result && result.activeVillains === ${activeCount}, description: "${activeCount} active villains", got: result ? String(result.activeVillains) : "undefined" },`,
        `    { pass: result && result.totalCrimes === ${totalCrimes}, description: "Total crimes: ${totalCrimes}", got: result ? String(result.totalCrimes) : "undefined" },`,
        `    { pass: result && result.mostWanted && result.mostWanted.name === "${esc(mostWanted.name)}", description: 'Most wanted: "${esc(mostWanted.name)}"', got: result && result.mostWanted ? result.mostWanted.name : "undefined" },`,
        `    { pass: result && result.averagePower === ${avgPower}, description: "Average power: ${avgPower}", got: result ? String(result.averagePower) : "undefined" },`,
        `    { pass: result && result.heroWithMostThreats && result.heroWithMostThreats.name === "${esc(heroThreats.name)}" && result.heroWithMostThreats.count === ${heroThreats.count}, description: 'Most targeted hero: "${esc(heroThreats.name)}" (${heroThreats.count})', got: result && result.heroWithMostThreats ? result.heroWithMostThreats.name + " (" + result.heroWithMostThreats.count + ")" : "undefined" },`,
        `    { pass: result && result.teamBreakdown && result.teamBreakdown["Legion of Gloom"] === ${teamBreakdown["Legion of Gloom"]}, description: "Legion of Gloom: ${teamBreakdown["Legion of Gloom"]} members", got: result && result.teamBreakdown ? String(result.teamBreakdown["Legion of Gloom"]) : "undefined" },`,
        `    { pass: result && result.totalPowers === ${totalPowers}, description: "Total powers: ${totalPowers}", got: result ? String(result.totalPowers) : "undefined" },`,
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

formatted.forEach(ex => {
  collection.exerciseIds.push(ex.id);
  collection.exercises.push(ex);
});

fs.writeFileSync(collectionFile, JSON.stringify(collection, null, 2));

console.log(`Pop Culture APIs — DC Villains Theme 🦇`);
console.log('================================');
console.log(`  Exercises: ${exercises.length}`);
console.log(`  T2: ${t2Count}`);
console.log(`  T3: ${t3Count}`);
console.log(`  T4: ${t4Count}`);
console.log(`  ID range: ${exercises[0].id}–${exercises[exercises.length - 1].id}`);
console.log(`  Villains: ${VILLAINS.length}, Heroes: ${HEROES.length}`);
console.log(`  Appended to: ${collectionFile}`);
console.log(`  Total collection exercises: ${collection.exercises.length}`);
