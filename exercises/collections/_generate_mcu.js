/**
 * Generates the MCU theme exercises for the Pop Culture APIs collection.
 * Run: node exercises/collections/_generate_mcu.js
 * Reads existing pop-culture-apis.json and appends MCU exercises.
 *
 * 2 datasets: teams (6), heroes (12)
 * Many-to-many: hero.teamIds[] → teams (heroes can be on multiple teams)
 */

const fs = require('fs');
const path = require('path');

// ── Team Dataset (6 teams, punny parody names) ──────────────────────────────

const TEAMS = [
  {
    id: 1,
    name: "The Avenguards",
    founded: 2012,
    base: "New Pork City",
    type: "superhero",
    status: "active"
  },
  {
    id: 2,
    name: "Guardians of the Grocery",
    founded: 2014,
    base: "The Banana-no (spaceship)",
    type: "cosmic",
    status: "active"
  },
  {
    id: 3,
    name: "The X-Mentos",
    founded: 2000,
    base: "Westcheddar Academy",
    type: "mutant",
    status: "active"
  },
  {
    id: 4,
    name: "The Fantastick Four",
    founded: 2025,
    base: "Baxter Basement",
    type: "superhero",
    status: "active"
  },
  {
    id: 5,
    name: "The Defendurrs",
    founded: 2015,
    base: "Hell's Kitchen Sink",
    type: "street",
    status: "disbanded"
  },
  {
    id: 6,
    name: "Agents of S.H.E.L.F.",
    founded: 2008,
    base: "The Heli-carrot",
    type: "spy",
    status: "active"
  }
];

// ── Hero Dataset (12 heroes, punny parody names) ────────────────────────────

const HEROES = [
  {
    id: 1,
    name: "Tony Stank",
    alias: "Iron Can",
    teamIds: [1, 6],
    powers: ["genius intellect", "powered armor", "flight"],
    origin: "human",
    stats: { strength: 6, speed: 7, intelligence: 10, durability: 8 },
    movies: 11,
    isActive: false,
    yearJoined: 2008
  },
  {
    id: 2,
    name: "Steve Dodgers",
    alias: "Captain Americano",
    teamIds: [1, 6],
    powers: ["super strength", "enhanced endurance", "tactical genius"],
    origin: "enhanced",
    stats: { strength: 7, speed: 6, intelligence: 7, durability: 8 },
    movies: 10,
    isActive: false,
    yearJoined: 2011
  },
  {
    id: 3,
    name: "Sore Oddinson",
    alias: "God of Blunder",
    teamIds: [1, 2],
    powers: ["lightning control", "superhuman strength", "immortality", "flight"],
    origin: "god",
    stats: { strength: 10, speed: 7, intelligence: 5, durability: 10 },
    movies: 9,
    isActive: true,
    yearJoined: 2011
  },
  {
    id: 4,
    name: "Broccoli Banner",
    alias: "The Incredible Sulk",
    teamIds: [1, 5],
    powers: ["gamma transformation", "superhuman strength", "regeneration"],
    origin: "enhanced",
    stats: { strength: 10, speed: 4, intelligence: 10, durability: 10 },
    movies: 8,
    isActive: true,
    yearJoined: 2008
  },
  {
    id: 5,
    name: "Natasha Romanhoff",
    alias: "Black Window",
    teamIds: [1, 6],
    powers: ["martial arts", "espionage", "marksmanship"],
    origin: "enhanced",
    stats: { strength: 4, speed: 6, intelligence: 8, durability: 4 },
    movies: 9,
    isActive: false,
    yearJoined: 2010
  },
  {
    id: 6,
    name: "Clint Bartender",
    alias: "Squawkeye",
    teamIds: [1, 5, 6],
    powers: ["expert marksman", "acrobatics", "tactical combat"],
    origin: "human",
    stats: { strength: 4, speed: 5, intelligence: 6, durability: 4 },
    movies: 7,
    isActive: true,
    yearJoined: 2011
  },
  {
    id: 7,
    name: "Peter Parsnip",
    alias: "Spider-Lad",
    teamIds: [1],
    powers: ["wall crawling", "spider sense", "super strength", "web slinging"],
    origin: "enhanced",
    stats: { strength: 8, speed: 8, intelligence: 8, durability: 7 },
    movies: 7,
    isActive: true,
    yearJoined: 2016
  },
  {
    id: 8,
    name: "Wanda Maxi-muffin",
    alias: "Scarlet Snitch",
    teamIds: [1, 3],
    powers: ["chaos magic", "telekinesis", "mind manipulation", "reality warping"],
    origin: "mutant",
    stats: { strength: 3, speed: 5, intelligence: 7, durability: 6 },
    movies: 6,
    isActive: true,
    yearJoined: 2015
  },
  {
    id: 9,
    name: "T'Challah",
    alias: "Black Panda",
    teamIds: [1],
    powers: ["vibranium suit", "enhanced abilities", "martial arts"],
    origin: "enhanced",
    stats: { strength: 7, speed: 7, intelligence: 8, durability: 8 },
    movies: 5,
    isActive: false,
    yearJoined: 2016
  },
  {
    id: 10,
    name: "Peter Quail",
    alias: "Star-Bored",
    teamIds: [2],
    powers: ["expert pilot", "marksmanship", "celestial heritage"],
    origin: "human",
    stats: { strength: 4, speed: 5, intelligence: 5, durability: 4 },
    movies: 5,
    isActive: true,
    yearJoined: 2014
  },
  {
    id: 11,
    name: "Ga-Moray",
    alias: "The Greenest Guardian",
    teamIds: [2],
    powers: ["superhuman strength", "master assassin", "enhanced agility"],
    origin: "alien",
    stats: { strength: 7, speed: 7, intelligence: 6, durability: 7 },
    movies: 5,
    isActive: true,
    yearJoined: 2014
  },
  {
    id: 12,
    name: "Dr. Stranger Things",
    alias: "Sorcerer So-So",
    teamIds: [1, 5],
    powers: ["mystic arts", "time manipulation", "dimensional travel", "astral projection"],
    origin: "human",
    stats: { strength: 3, speed: 5, intelligence: 10, durability: 5 },
    movies: 5,
    isActive: true,
    yearJoined: 2016
  }
];

// ── Format datasets as readable JS for Dataset tab ──────────────────────────

function formatDatasetDisplay() {
  const lines = [];

  // Teams
  lines.push('const teams = [');
  TEAMS.forEach((t, i) => {
    lines.push('  {');
    lines.push(`    id: ${t.id},`);
    lines.push(`    name: "${t.name}",`);
    lines.push(`    founded: ${t.founded},`);
    lines.push(`    base: "${t.base}",`);
    lines.push(`    type: "${t.type}",`);
    lines.push(`    status: "${t.status}"`);
    lines.push(`  }${i < TEAMS.length - 1 ? ',' : ''}`);
  });
  lines.push('];');
  lines.push('');

  // Heroes
  lines.push('const heroes = [');
  HEROES.forEach((h, i) => {
    lines.push('  {');
    lines.push(`    id: ${h.id},`);
    lines.push(`    name: "${h.name}",`);
    lines.push(`    alias: "${h.alias}",`);
    lines.push(`    teamIds: ${JSON.stringify(h.teamIds)},`);
    lines.push(`    powers: ${JSON.stringify(h.powers)},`);
    lines.push(`    origin: "${h.origin}",`);
    lines.push(`    stats: { strength: ${h.stats.strength}, speed: ${h.stats.speed}, intelligence: ${h.stats.intelligence}, durability: ${h.stats.durability} },`);
    lines.push(`    movies: ${h.movies},`);
    lines.push(`    isActive: ${h.isActive},`);
    lines.push(`    yearJoined: ${h.yearJoined}`);
    lines.push(`  }${i < HEROES.length - 1 ? ',' : ''}`);
  });
  lines.push('];');

  return lines.join('\n');
}

const DATASET_DISPLAY = formatDatasetDisplay();
const HEROES_JSON = JSON.stringify(HEROES);
const TEAMS_JSON = JSON.stringify(TEAMS);

// ── Helpers ─────────────────────────────────────────────────────────────────

function esc(str) { return String(str).replace(/'/g, "\\'"); }

function tr(fnName, testBody) {
  return `(code) => {\n  const heroes = ${HEROES_JSON};\n  const teams = ${TEAMS_JSON};\n  const fn = new Function(code + '; return ${fnName};')();\n${testBody}\n}`;
}

// ── Exercise definitions ────────────────────────────────────────────────────

const exercises = [

  // ── T2 (6 exercises) ──────────────────────────────────────────────────────

  {
    id: 1033,
    title: "MCU: Get Hero Names",
    tier: 2,
    category: ["api-data", "mcu"],
    tags: ["arrays", "map", "api-data", "mcu"],
    description: "Extract all hero real names from the dataset.",
    instructions: "Write a function called `getHeroNames` that takes an array of hero objects and returns an array of their `name` properties (real names).\n\nExample:\n```\ngetHeroNames(heroes)\n// Returns: [\"Tony Stank\", \"Steve Dodgers\", ...]\n```",
    starterCode: "// Return an array of all hero real names\nfunction getHeroNames(heroes) {\n  \n}",
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
      '    { pass: result.length === 12, description: "Returns 12 names", got: String(result.length) },',
      '    { pass: result[0] === "Tony Stank", description: \'First is "Tony Stank"\', got: String(result[0]) },',
      '    { pass: result[11] === "Dr. Stranger Things", description: \'Last is "Dr. Stranger Things"\', got: String(result[11]) },',
      `    { pass: result.includes("T'Challah"), description: 'Includes "T\\'Challah"', got: String(result.includes("T'Challah")) },`,
      '  ];',
    ].join('\n'))
  },
  {
    id: 1034,
    title: "MCU: Get Hero Aliases",
    tier: 2,
    category: ["api-data", "mcu"],
    tags: ["arrays", "map", "api-data", "mcu"],
    description: "Extract all hero aliases (superhero names) from the dataset.",
    instructions: "Write a function called `getHeroAliases` that takes an array of hero objects and returns an array of their `alias` properties (superhero names).\n\nExample:\n```\ngetHeroAliases(heroes)\n// Returns: [\"Iron Can\", \"Captain Americano\", ...]\n```",
    starterCode: "// Return an array of all hero aliases\nfunction getHeroAliases(heroes) {\n  \n}",
    solution: "function getHeroAliases(heroes) {\n  return heroes.map(h => h.alias);\n}",
    hints: [
      "Use .map() to transform each hero object into just the alias property.",
      "The callback is: `h => h.alias`"
    ],
    resources: [{ label: "MDN: Array.prototype.map()", url: "/docs/mdn/array-map.html" }],
    testRunner: tr('getHeroAliases', [
      '  const result = fn(heroes);',
      '  return [',
      '    { pass: Array.isArray(result), description: "Returns an array", got: typeof result },',
      '    { pass: result.length === 12, description: "Returns 12 aliases", got: String(result.length) },',
      '    { pass: result[0] === "Iron Can", description: \'First is "Iron Can"\', got: String(result[0]) },',
      '    { pass: result.includes("God of Blunder"), description: \'Includes "God of Blunder"\', got: String(result.includes("God of Blunder")) },',
      '    { pass: result.includes("Sorcerer So-So"), description: \'Includes "Sorcerer So-So"\', got: String(result.includes("Sorcerer So-So")) },',
      '  ];',
    ].join('\n'))
  },
  {
    id: 1035,
    title: "MCU: Filter Active Heroes",
    tier: 2,
    category: ["api-data", "mcu"],
    tags: ["arrays", "filter", "api-data", "mcu"],
    description: "Filter to only currently active heroes.",
    instructions: "Write a function called `getActiveHeroes` that takes an array of hero objects and returns only those where `isActive` is `true`.\n\nExample:\n```\ngetActiveHeroes(heroes)\n// Returns: [{ name: \"Sore Oddinson\", ... }, ...]\n```",
    starterCode: "// Return only active heroes\nfunction getActiveHeroes(heroes) {\n  \n}",
    solution: "function getActiveHeroes(heroes) {\n  return heroes.filter(h => h.isActive);\n}",
    hints: [
      "Use .filter() to keep only heroes where isActive is true.",
      "The boolean property works as the condition: `h => h.isActive`"
    ],
    resources: [{ label: "MDN: Array.prototype.filter()", url: "/docs/mdn/array-filter.html" }],
    testRunner: (() => {
      const activeCount = HEROES.filter(h => h.isActive).length;
      const inactiveName = HEROES.find(h => !h.isActive).name;
      return tr('getActiveHeroes', [
        '  const result = fn(heroes);',
        '  return [',
        '    { pass: Array.isArray(result), description: "Returns an array", got: typeof result },',
        `    { pass: result.length === ${activeCount}, description: "${activeCount} heroes are active", got: String(result.length) },`,
        '    { pass: result.every(h => h.isActive === true), description: "All returned are active", got: String(result.every(h => h.isActive)) },',
        `    { pass: !result.find(h => h.name === "${esc(inactiveName)}"), description: 'Excludes inactive "${esc(inactiveName)}"', got: String(!result.find(h => h.name === "${esc(inactiveName)}")) },`,
        '    { pass: result.find(h => h.name === "Sore Oddinson"), description: \'Includes "Sore Oddinson"\', got: String(!!result.find(h => h.name === "Sore Oddinson")) },',
        '  ];',
      ].join('\n'));
    })()
  },
  {
    id: 1036,
    title: "MCU: Get Team Names",
    tier: 2,
    category: ["api-data", "mcu"],
    tags: ["arrays", "map", "api-data", "mcu"],
    description: "Extract all team names from the teams dataset.",
    instructions: "Write a function called `getTeamNames` that takes an array of team objects and returns an array of their names.\n\nExample:\n```\ngetTeamNames(teams)\n// Returns: [\"The Avenguards\", \"Guardians of the Grocery\", ...]\n```",
    starterCode: "// Return an array of all team names\nfunction getTeamNames(teams) {\n  \n}",
    solution: "function getTeamNames(teams) {\n  return teams.map(t => t.name);\n}",
    hints: [
      "Use .map() to transform each team object into just the name property.",
      "The callback is: `t => t.name`"
    ],
    resources: [{ label: "MDN: Array.prototype.map()", url: "/docs/mdn/array-map.html" }],
    testRunner: tr('getTeamNames', [
      '  const result = fn(teams);',
      '  return [',
      '    { pass: Array.isArray(result), description: "Returns an array", got: typeof result },',
      '    { pass: result.length === 6, description: "Returns 6 team names", got: String(result.length) },',
      '    { pass: result[0] === "The Avenguards", description: \'First is "The Avenguards"\', got: String(result[0]) },',
      '    { pass: result.includes("Guardians of the Grocery"), description: \'Includes "Guardians of the Grocery"\', got: String(result.includes("Guardians of the Grocery")) },',
      '    { pass: result.includes("Agents of S.H.E.L.F."), description: \'Includes "Agents of S.H.E.L.F."\', got: String(result.includes("Agents of S.H.E.L.F.")) },',
      '  ];',
    ].join('\n'))
  },
  {
    id: 1037,
    title: "MCU: Get Hero Powers",
    tier: 2,
    category: ["api-data", "mcu"],
    tags: ["arrays", "map", "nested-access", "api-data", "mcu"],
    description: "Extract hero names and their powers arrays.",
    instructions: "Write a function called `getHeroPowers` that takes an array of hero objects and returns an array of objects with `name` and `powerCount` (number of powers).\n\nExample:\n```\ngetHeroPowers(heroes)\n// Returns: [{ name: \"Tony Stank\", powerCount: 3 }, ...]\n```",
    starterCode: "// Return an array of { name, powerCount } objects\nfunction getHeroPowers(heroes) {\n  \n}",
    solution: "function getHeroPowers(heroes) {\n  return heroes.map(h => ({ name: h.name, powerCount: h.powers.length }));\n}",
    hints: [
      "Use .map() to build new objects with name and the length of the powers array.",
      "Return an object literal: `h => ({ name: h.name, powerCount: h.powers.length })`"
    ],
    resources: [{ label: "MDN: Array.prototype.map()", url: "/docs/mdn/array-map.html" }],
    testRunner: (() => {
      const wanda = HEROES.find(h => h.name === 'Wanda Maxi-muffin');
      const tony = HEROES[0];
      return tr('getHeroPowers', [
        '  const result = fn(heroes);',
        '  return [',
        '    { pass: Array.isArray(result), description: "Returns an array", got: typeof result },',
        '    { pass: result.length === 12, description: "Returns 12 entries", got: String(result.length) },',
        `    { pass: result[0] && result[0].name === "${esc(tony.name)}" && result[0].powerCount === ${tony.powers.length}, description: "${esc(tony.name)} has ${tony.powers.length} powers", got: result[0] ? JSON.stringify(result[0]) : "undefined" },`,
        `    { pass: result[7] && result[7].name === "${esc(wanda.name)}" && result[7].powerCount === ${wanda.powers.length}, description: "${esc(wanda.name)} has ${wanda.powers.length} powers", got: result[7] ? JSON.stringify(result[7]) : "undefined" },`,
        '    { pass: result[0] && Object.keys(result[0]).length === 2, description: "Each entry has exactly 2 properties", got: result[0] ? String(Object.keys(result[0]).length) : "undefined" },',
        '  ];',
      ].join('\n'));
    })()
  },
  {
    id: 1038,
    title: "MCU: Filter by Origin",
    tier: 2,
    category: ["api-data", "mcu"],
    tags: ["arrays", "filter", "comparison", "api-data", "mcu"],
    description: "Filter heroes by their origin type.",
    instructions: "Write a function called `filterByOrigin` that takes an array of hero objects and an `origin` string (like `\"human\"`, `\"enhanced\"`, `\"god\"`, `\"mutant\"`, or `\"alien\"`), and returns heroes with that origin.\n\nExample:\n```\nfilterByOrigin(heroes, \"human\")\n// Returns all heroes with human origin\n```",
    starterCode: "// Return heroes with the given origin\nfunction filterByOrigin(heroes, origin) {\n  \n}",
    solution: "function filterByOrigin(heroes, origin) {\n  return heroes.filter(h => h.origin === origin);\n}",
    hints: [
      "Use .filter() with a strict equality check on the origin property.",
      "The condition: `h => h.origin === origin`"
    ],
    resources: [{ label: "MDN: Array.prototype.filter()", url: "/docs/mdn/array-filter.html" }],
    testRunner: (() => {
      const humanCount = HEROES.filter(h => h.origin === 'human').length;
      const enhancedCount = HEROES.filter(h => h.origin === 'enhanced').length;
      const godCount = HEROES.filter(h => h.origin === 'god').length;
      return tr('filterByOrigin', [
        '  const humans = fn(heroes, "human");',
        '  const enhanced = fn(heroes, "enhanced");',
        '  const gods = fn(heroes, "god");',
        '  return [',
        '    { pass: Array.isArray(humans), description: "Returns an array", got: typeof humans },',
        `    { pass: humans.length === ${humanCount}, description: "${humanCount} human heroes", got: String(humans.length) },`,
        `    { pass: enhanced.length === ${enhancedCount}, description: "${enhancedCount} enhanced heroes", got: String(enhanced.length) },`,
        `    { pass: gods.length === ${godCount}, description: "${godCount} god hero", got: String(gods.length) },`,
        '    { pass: humans.every(h => h.origin === "human"), description: "All returned humans have correct origin", got: String(humans.every(h => h.origin === "human")) },',
        '  ];',
      ].join('\n'));
    })()
  },

  // ── T3 (7 exercises) ──────────────────────────────────────────────────────

  {
    id: 1039,
    title: "MCU: Top Movie Stars",
    tier: 3,
    category: ["api-data", "mcu"],
    tags: ["arrays", "sort", "slice", "map", "api-data", "mcu"],
    description: "Sort heroes by movie appearances and return the top N.",
    instructions: "Write a function called `getTopMovieStars` that takes the `heroes` array and a number `n`, and returns the top `n` heroes by `movies` count descending. Return an array of objects with `name`, `alias`, and `movies`.\n\nExample:\n```\ngetTopMovieStars(heroes, 3)\n// Returns: [{ name: \"Tony Stank\", alias: \"Iron Can\", movies: 11 }, ...]\n```",
    starterCode: "function getTopMovieStars(heroes, n) {\n  \n}",
    solution: "function getTopMovieStars(heroes, n) {\n  return [...heroes]\n    .sort((a, b) => b.movies - a.movies)\n    .slice(0, n)\n    .map(h => ({ name: h.name, alias: h.alias, movies: h.movies }));\n}",
    hints: [
      "Sort a copy of the array by movies descending, then slice the first n entries and map to { name, alias, movies }.",
      "Use spread to avoid mutating: `[...heroes].sort((a, b) => b.movies - a.movies)`"
    ],
    resources: [
      { label: "MDN: Array.prototype.sort()", url: "/docs/mdn/array-sort.html" },
      { label: "MDN: Array.prototype.slice()", url: "/docs/mdn/array-slice.html" }
    ],
    testRunner: (() => {
      const sorted = [...HEROES].sort((a, b) => b.movies - a.movies);
      const top1 = sorted[0];
      const top3 = sorted.slice(0, 3);
      return tr('getTopMovieStars', [
        '  const top1 = fn(heroes, 1);',
        '  const top3 = fn(heroes, 3);',
        '  const top5 = fn(heroes, 5);',
        '  return [',
        `    { pass: top1.length === 1 && top1[0].name === "${esc(top1.name)}", description: 'Most movies: "${esc(top1.name)}"', got: top1[0] ? top1[0].name : "undefined" },`,
        `    { pass: top1[0] && top1[0].movies === ${top1.movies}, description: "Top star has ${top1.movies} movies", got: top1[0] ? String(top1[0].movies) : "undefined" },`,
        `    { pass: top3.length === 3, description: "Top 3 returns 3 entries", got: String(top3.length) },`,
        `    { pass: top3[2] && top3[2].name === "${esc(top3[2].name)}", description: '3rd most movies: "${esc(top3[2].name)}"', got: top3[2] ? top3[2].name : "undefined" },`,
        '    { pass: top5.length === 5 && top5[0].movies >= top5[4].movies, description: "Top 5 sorted descending by movies", got: top5.map(h => h.movies).join(", ") },',
        '  ];',
      ].join('\n'));
    })()
  },
  {
    id: 1040,
    title: "MCU: Team Roster",
    tier: 3,
    category: ["api-data", "mcu"],
    tags: ["arrays", "filter", "includes", "cross-reference", "api-data", "mcu"],
    description: "Build a team roster using the many-to-many hero-team relationship.",
    instructions: "Write a function called `getTeamRoster` that takes the `heroes` array, `teams` array, and a `teamId` number. Return an object with:\n- `team`: the team's name\n- `members`: sorted array of hero names on that team (heroes whose `teamIds` includes this team)\n- `count`: number of members\n\nExample:\n```\ngetTeamRoster(heroes, teams, 2)\n// Returns: { team: \"Guardians of the Grocery\", members: [\"Ga-Moray\", ...], count: 3 }\n```",
    starterCode: "function getTeamRoster(heroes, teams, teamId) {\n  \n}",
    solution: "function getTeamRoster(heroes, teams, teamId) {\n  const team = teams.find(t => t.id === teamId);\n  const members = heroes.filter(h => h.teamIds.includes(teamId)).map(h => h.name).sort();\n  return { team: team.name, members, count: members.length };\n}",
    hints: [
      "Use .find() on teams, then .filter() heroes whose teamIds array .includes() the teamId.",
      "Chain: `heroes.filter(h => h.teamIds.includes(teamId)).map(h => h.name).sort()`"
    ],
    resources: [
      { label: "MDN: Array.prototype.includes()", url: "/docs/mdn/array-includes.html" },
      { label: "MDN: Array.prototype.filter()", url: "/docs/mdn/array-filter.html" }
    ],
    testRunner: (() => {
      const avenguards = HEROES.filter(h => h.teamIds.includes(1)).map(h => h.name).sort();
      const grocery = HEROES.filter(h => h.teamIds.includes(2)).map(h => h.name).sort();
      const fantastick = HEROES.filter(h => h.teamIds.includes(4)).map(h => h.name).sort();
      return tr('getTeamRoster', [
        '  const av = fn(heroes, teams, 1);',
        '  const gg = fn(heroes, teams, 2);',
        '  const ff = fn(heroes, teams, 4);',
        '  return [',
        `    { pass: av && av.team === "The Avenguards", description: 'Team 1 is "The Avenguards"', got: av ? av.team : "undefined" },`,
        `    { pass: av && av.count === ${avenguards.length}, description: "The Avenguards have ${avenguards.length} members", got: av ? String(av.count) : "undefined" },`,
        `    { pass: gg && gg.count === ${grocery.length}, description: "Guardians of the Grocery have ${grocery.length} members", got: gg ? String(gg.count) : "undefined" },`,
        `    { pass: ff && ff.count === ${fantastick.length}, description: "The Fantastick Four have ${fantastick.length} members", got: ff ? String(ff.count) : "undefined" },`,
        `    { pass: av && av.members[0] < av.members[av.members.length - 1], description: "Members are sorted alphabetically", got: av ? av.members.join(", ") : "undefined" },`,
        '  ];',
      ].join('\n'));
    })()
  },
  {
    id: 1041,
    title: "MCU: Hero Teams",
    tier: 3,
    category: ["api-data", "mcu"],
    tags: ["arrays", "map", "find", "cross-reference", "api-data", "mcu"],
    description: "Look up all team names a hero belongs to.",
    instructions: "Write a function called `getHeroTeams` that takes the `heroes` array, `teams` array, and a `heroId` number. Return an object with:\n- `hero`: the hero's name\n- `alias`: the hero's alias\n- `teams`: sorted array of team names the hero belongs to\n\nExample:\n```\ngetHeroTeams(heroes, teams, 6)\n// Returns: { hero: \"Clint Bartender\", alias: \"Squawkeye\", teams: [\"Agents of S.H.E.L.F.\", ...] }\n```",
    starterCode: "function getHeroTeams(heroes, teams, heroId) {\n  \n}",
    solution: "function getHeroTeams(heroes, teams, heroId) {\n  const hero = heroes.find(h => h.id === heroId);\n  const teamNames = hero.teamIds.map(id => teams.find(t => t.id === id).name).sort();\n  return { hero: hero.name, alias: hero.alias, teams: teamNames };\n}",
    hints: [
      "Find the hero, then map each teamId to a team name using .find() inside .map().",
      "Chain: `hero.teamIds.map(id => teams.find(t => t.id === id).name).sort()`"
    ],
    resources: [
      { label: "MDN: Array.prototype.find()", url: "/docs/mdn/array-find.html" },
      { label: "MDN: Array.prototype.map()", url: "/docs/mdn/array-map.html" }
    ],
    testRunner: (() => {
      const clint = HEROES.find(h => h.id === 6);
      const clintTeams = clint.teamIds.map(id => TEAMS.find(t => t.id === id).name).sort();
      const peter = HEROES.find(h => h.id === 7);
      const peterTeams = peter.teamIds.map(id => TEAMS.find(t => t.id === id).name).sort();
      return tr('getHeroTeams', [
        '  const clint = fn(heroes, teams, 6);',
        '  const peter = fn(heroes, teams, 7);',
        '  return [',
        `    { pass: clint && clint.hero === "${esc(clint.name)}", description: 'Hero 6 is "${esc(clint.name)}"', got: clint ? clint.hero : "undefined" },`,
        `    { pass: clint && clint.teams.length === ${clintTeams.length}, description: "${esc(clint.name)} is on ${clintTeams.length} teams", got: clint ? String(clint.teams.length) : "undefined" },`,
        `    { pass: clint && clint.teams[0] < clint.teams[clint.teams.length - 1], description: "Teams sorted alphabetically", got: clint ? clint.teams.join(", ") : "undefined" },`,
        `    { pass: peter && peter.teams.length === ${peterTeams.length}, description: "${esc(peter.name)} is on ${peterTeams.length} team", got: peter ? String(peter.teams.length) : "undefined" },`,
        `    { pass: peter && peter.alias === "${esc(peter.alias)}", description: 'Hero 7 alias is "${esc(peter.alias)}"', got: peter ? peter.alias : "undefined" },`,
        '  ];',
      ].join('\n'));
    })()
  },
  {
    id: 1042,
    title: "MCU: Multi-Team Heroes",
    tier: 3,
    category: ["api-data", "mcu"],
    tags: ["arrays", "filter", "map", "api-data", "mcu"],
    description: "Find heroes who serve on more than one team.",
    instructions: "Write a function called `getMultiTeamHeroes` that takes the `heroes` array and returns an array of objects for heroes on more than one team. Each object should have `name`, `alias`, and `teamCount`. Sort by `teamCount` descending.\n\nExample:\n```\ngetMultiTeamHeroes(heroes)\n// Returns: [{ name: \"Clint Bartender\", alias: \"Squawkeye\", teamCount: 3 }, ...]\n```",
    starterCode: "function getMultiTeamHeroes(heroes) {\n  \n}",
    solution: "function getMultiTeamHeroes(heroes) {\n  return heroes\n    .filter(h => h.teamIds.length > 1)\n    .map(h => ({ name: h.name, alias: h.alias, teamCount: h.teamIds.length }))\n    .sort((a, b) => b.teamCount - a.teamCount);\n}",
    hints: [
      "Filter heroes where teamIds.length > 1, map to { name, alias, teamCount }, then sort descending.",
      "Chain: `.filter(h => h.teamIds.length > 1).map(...).sort((a, b) => b.teamCount - a.teamCount)`"
    ],
    resources: [
      { label: "MDN: Array.prototype.filter()", url: "/docs/mdn/array-filter.html" },
      { label: "MDN: Array.prototype.sort()", url: "/docs/mdn/array-sort.html" }
    ],
    testRunner: (() => {
      const multi = HEROES.filter(h => h.teamIds.length > 1)
        .map(h => ({ name: h.name, alias: h.alias, teamCount: h.teamIds.length }))
        .sort((a, b) => b.teamCount - a.teamCount);
      return tr('getMultiTeamHeroes', [
        '  const result = fn(heroes);',
        '  return [',
        `    { pass: Array.isArray(result) && result.length === ${multi.length}, description: "${multi.length} heroes on multiple teams", got: Array.isArray(result) ? String(result.length) : typeof result },`,
        `    { pass: result[0] && result[0].name === "${esc(multi[0].name)}", description: 'Most teams: "${esc(multi[0].name)}" (${multi[0].teamCount})', got: result[0] ? result[0].name : "undefined" },`,
        `    { pass: result[0] && result[0].teamCount === ${multi[0].teamCount}, description: "Top hero on ${multi[0].teamCount} teams", got: result[0] ? String(result[0].teamCount) : "undefined" },`,
        '    { pass: result[0] && result[0].teamCount >= result[result.length - 1].teamCount, description: "Sorted by teamCount descending", got: result.map(h => h.teamCount).join(", ") },',
        '    { pass: result.every(h => h.teamCount > 1), description: "All returned are on multiple teams", got: result.map(h => h.teamCount).join(", ") },',
        '  ];',
      ].join('\n'));
    })()
  },
  {
    id: 1043,
    title: "MCU: Average Team Stats",
    tier: 3,
    category: ["api-data", "mcu"],
    tags: ["arrays", "filter", "reduce", "cross-reference", "api-data", "mcu"],
    description: "Calculate average stats for a team's members.",
    instructions: "Write a function called `getTeamAverageStats` that takes the `heroes` array, `teams` array, and a `teamId`. Find all heroes on that team and return an object with:\n- `team`: team name\n- `avgStrength`: average strength (rounded to 1 decimal)\n- `avgSpeed`: average speed (rounded to 1 decimal)\n- `avgIntelligence`: average intelligence (rounded to 1 decimal)\n- `avgDurability`: average durability (rounded to 1 decimal)\n\nExample:\n```\ngetTeamAverageStats(heroes, teams, 2)\n// Returns: { team: \"Guardians of the Grocery\", avgStrength: 7, ... }\n```",
    starterCode: "function getTeamAverageStats(heroes, teams, teamId) {\n  \n}",
    solution: "function getTeamAverageStats(heroes, teams, teamId) {\n  const team = teams.find(t => t.id === teamId);\n  const members = heroes.filter(h => h.teamIds.includes(teamId));\n  const avg = (arr, key) => Math.round(arr.reduce((s, h) => s + h.stats[key], 0) / arr.length * 10) / 10;\n  return {\n    team: team.name,\n    avgStrength: avg(members, 'strength'),\n    avgSpeed: avg(members, 'speed'),\n    avgIntelligence: avg(members, 'intelligence'),\n    avgDurability: avg(members, 'durability')\n  };\n}",
    hints: [
      "Filter heroes by teamIds.includes(teamId), then compute averages for each stat using reduce.",
      "Average formula: `Math.round(sum / count * 10) / 10` for 1 decimal place."
    ],
    resources: [
      { label: "MDN: Array.prototype.reduce()", url: "/docs/mdn/array-reduce.html" },
      { label: "MDN: Array.prototype.includes()", url: "/docs/mdn/array-includes.html" }
    ],
    testRunner: (() => {
      const groceryMembers = HEROES.filter(h => h.teamIds.includes(2));
      const avg = (arr, key) => Math.round(arr.reduce((s, h) => s + h.stats[key], 0) / arr.length * 10) / 10;
      const gStr = avg(groceryMembers, 'strength');
      const gInt = avg(groceryMembers, 'intelligence');
      const avMembers = HEROES.filter(h => h.teamIds.includes(1));
      const aStr = avg(avMembers, 'strength');
      return tr('getTeamAverageStats', [
        '  const gg = fn(heroes, teams, 2);',
        '  const av = fn(heroes, teams, 1);',
        '  return [',
        '    { pass: gg && gg.team === "Guardians of the Grocery", description: \'Team 2 is "Guardians of the Grocery"\', got: gg ? gg.team : "undefined" },',
        `    { pass: gg && gg.avgStrength === ${gStr}, description: "Grocery avg strength: ${gStr}", got: gg ? String(gg.avgStrength) : "undefined" },`,
        `    { pass: gg && gg.avgIntelligence === ${gInt}, description: "Grocery avg intelligence: ${gInt}", got: gg ? String(gg.avgIntelligence) : "undefined" },`,
        `    { pass: av && av.avgStrength === ${aStr}, description: "Avenguards avg strength: ${aStr}", got: av ? String(av.avgStrength) : "undefined" },`,
        '    { pass: av && av.team === "The Avenguards", description: \'Team 1 is "The Avenguards"\', got: av ? av.team : "undefined" },',
        '  ];',
      ].join('\n'));
    })()
  },
  {
    id: 1044,
    title: "MCU: Heroes by Team Type",
    tier: 3,
    category: ["api-data", "mcu"],
    tags: ["arrays", "filter", "includes", "cross-reference", "api-data", "mcu"],
    description: "Find all heroes on teams of a specific type.",
    instructions: "Write a function called `getHeroesByTeamType` that takes the `heroes` array, `teams` array, and a `type` string (like `\"superhero\"`, `\"cosmic\"`, `\"spy\"`, etc.). Return the sorted unique names of all heroes who are on at least one team of that type.\n\nExample:\n```\ngetHeroesByTeamType(heroes, teams, \"cosmic\")\n// Returns: [\"Ga-Moray\", \"Peter Quail\", \"Sore Oddinson\"]\n```",
    starterCode: "function getHeroesByTeamType(heroes, teams, type) {\n  \n}",
    solution: "function getHeroesByTeamType(heroes, teams, type) {\n  const typeTeamIds = teams.filter(t => t.type === type).map(t => t.id);\n  const names = heroes\n    .filter(h => h.teamIds.some(id => typeTeamIds.includes(id)))\n    .map(h => h.name);\n  return [...new Set(names)].sort();\n}",
    hints: [
      "Get team IDs for the type, then filter heroes whose teamIds has any overlap with those IDs using .some().",
      "Use Set to deduplicate if a hero is on multiple teams of the same type: `[...new Set(names)].sort()`"
    ],
    resources: [
      { label: "MDN: Array.prototype.some()", url: "/docs/mdn/array-some.html" },
      { label: "MDN: Set", url: "/docs/mdn/set.html" }
    ],
    testRunner: (() => {
      const getByType = (type) => {
        const typeIds = TEAMS.filter(t => t.type === type).map(t => t.id);
        const names = HEROES.filter(h => h.teamIds.some(id => typeIds.includes(id))).map(h => h.name);
        return [...new Set(names)].sort();
      };
      const cosmic = getByType('cosmic');
      const spy = getByType('spy');
      const street = getByType('street');
      return tr('getHeroesByTeamType', [
        '  const cosmic = fn(heroes, teams, "cosmic");',
        '  const spy = fn(heroes, teams, "spy");',
        '  const street = fn(heroes, teams, "street");',
        '  return [',
        `    { pass: cosmic.length === ${cosmic.length}, description: "${cosmic.length} heroes on cosmic teams", got: String(cosmic.length) },`,
        `    { pass: spy.length === ${spy.length}, description: "${spy.length} heroes on spy teams", got: String(spy.length) },`,
        `    { pass: street.length === ${street.length}, description: "${street.length} heroes on street teams", got: String(street.length) },`,
        `    { pass: cosmic[0] < cosmic[cosmic.length - 1], description: "Cosmic heroes sorted alphabetically", got: cosmic.join(", ") },`,
        `    { pass: cosmic.includes("Sore Oddinson"), description: 'Cosmic includes "Sore Oddinson" (on Grocery and Avenguards)', got: String(cosmic.includes("Sore Oddinson")) },`,
        '  ];',
      ].join('\n'));
    })()
  },
  {
    id: 1045,
    title: "MCU: Most Powerful Heroes",
    tier: 3,
    category: ["api-data", "mcu"],
    tags: ["arrays", "sort", "reduce", "api-data", "mcu"],
    description: "Rank heroes by total power (sum of all stats).",
    instructions: "Write a function called `getMostPowerful` that takes the `heroes` array and a number `n`. Calculate each hero's total power (sum of strength + speed + intelligence + durability), sort descending, and return the top `n` as `{ name, alias, totalPower }`.\n\nExample:\n```\ngetMostPowerful(heroes, 3)\n// Returns: [{ name: \"Broccoli Banner\", alias: \"The Incredible Sulk\", totalPower: 34 }, ...]\n```",
    starterCode: "function getMostPowerful(heroes, n) {\n  \n}",
    solution: "function getMostPowerful(heroes, n) {\n  return [...heroes]\n    .map(h => ({\n      name: h.name,\n      alias: h.alias,\n      totalPower: h.stats.strength + h.stats.speed + h.stats.intelligence + h.stats.durability\n    }))\n    .sort((a, b) => b.totalPower - a.totalPower)\n    .slice(0, n);\n}",
    hints: [
      "Map each hero to include totalPower (sum of all 4 stats), then sort descending and slice.",
      "Total: `h.stats.strength + h.stats.speed + h.stats.intelligence + h.stats.durability`"
    ],
    resources: [
      { label: "MDN: Array.prototype.sort()", url: "/docs/mdn/array-sort.html" },
      { label: "MDN: Array.prototype.map()", url: "/docs/mdn/array-map.html" }
    ],
    testRunner: (() => {
      const powered = HEROES.map(h => ({
        name: h.name, alias: h.alias,
        totalPower: h.stats.strength + h.stats.speed + h.stats.intelligence + h.stats.durability
      })).sort((a, b) => b.totalPower - a.totalPower);
      const top1 = powered[0];
      const top3 = powered.slice(0, 3);
      return tr('getMostPowerful', [
        '  const top1 = fn(heroes, 1);',
        '  const top3 = fn(heroes, 3);',
        '  return [',
        `    { pass: top1.length === 1 && top1[0].name === "${esc(top1.name)}", description: 'Most powerful: "${esc(top1.name)}"', got: top1[0] ? top1[0].name : "undefined" },`,
        `    { pass: top1[0] && top1[0].totalPower === ${top1.totalPower}, description: "Total power: ${top1.totalPower}", got: top1[0] ? String(top1[0].totalPower) : "undefined" },`,
        `    { pass: top3.length === 3, description: "Top 3 returns 3 entries", got: String(top3.length) },`,
        `    { pass: top3[2] && top3[2].name === "${esc(top3[2].name)}", description: '3rd most powerful: "${esc(top3[2].name)}"', got: top3[2] ? top3[2].name : "undefined" },`,
        '    { pass: top3[0].totalPower >= top3[2].totalPower, description: "Sorted by totalPower descending", got: top3.map(h => h.totalPower).join(", ") },',
        '  ];',
      ].join('\n'));
    })()
  },

  // ── T4 (4 exercises) ──────────────────────────────────────────────────────

  {
    id: 1046,
    title: "MCU: Team Report",
    tier: 4,
    category: ["api-data", "mcu"],
    tags: ["arrays", "reduce", "cross-reference", "data-transformation", "api-data", "mcu"],
    description: "Build a detailed report for every team using hero data.",
    instructions: "Write a function called `buildTeamReport` that takes the `heroes` and `teams` arrays and returns an array of report objects (one per team) with:\n- `name`: team name\n- `type`: team type\n- `status`: team status\n- `members`: sorted array of hero names on the team\n- `count`: number of members\n- `avgPower`: average total power across members (rounded to 1 decimal), or `0` if no members\n- `activeCount`: number of active heroes on the team\n\nExample:\n```\nbuildTeamReport(heroes, teams)\n// Returns: [{ name: \"The Avenguards\", type: \"superhero\", ..., count: 10, ... }, ...]\n```",
    starterCode: "",
    solution: "function buildTeamReport(heroes, teams) {\n  return teams.map(t => {\n    const members = heroes.filter(h => h.teamIds.includes(t.id));\n    const totalPower = members.reduce((sum, h) => sum + h.stats.strength + h.stats.speed + h.stats.intelligence + h.stats.durability, 0);\n    return {\n      name: t.name,\n      type: t.type,\n      status: t.status,\n      members: members.map(h => h.name).sort(),\n      count: members.length,\n      avgPower: members.length > 0 ? Math.round(totalPower / members.length * 10) / 10 : 0,\n      activeCount: members.filter(h => h.isActive).length\n    };\n  });\n}",
    hints: [
      "Map each team: filter heroes by teamIds.includes(t.id), then compute power averages with reduce.",
      "Handle empty teams (no members) by returning avgPower: 0. Use `Math.round(avg * 10) / 10` for rounding."
    ],
    resources: [
      { label: "MDN: Array.prototype.reduce()", url: "/docs/mdn/array-reduce.html" },
      { label: "MDN: Array.prototype.filter()", url: "/docs/mdn/array-filter.html" }
    ],
    testRunner: (() => {
      const reports = TEAMS.map(t => {
        const members = HEROES.filter(h => h.teamIds.includes(t.id));
        const totalPower = members.reduce((sum, h) => sum + h.stats.strength + h.stats.speed + h.stats.intelligence + h.stats.durability, 0);
        return {
          name: t.name, type: t.type, status: t.status,
          members: members.map(h => h.name).sort(),
          count: members.length,
          avgPower: members.length > 0 ? Math.round(totalPower / members.length * 10) / 10 : 0,
          activeCount: members.filter(h => h.isActive).length
        };
      });
      const av = reports[0]; // Avenguards
      const ff = reports.find(r => r.name === 'The Fantastick Four');
      return tr('buildTeamReport', [
        '  const result = fn(heroes, teams);',
        '  return [',
        '    { pass: Array.isArray(result) && result.length === 6, description: "Returns 6 team reports", got: Array.isArray(result) ? String(result.length) : typeof result },',
        `    { pass: result[0] && result[0].name === "${esc(av.name)}", description: 'First team: "${esc(av.name)}"', got: result[0] ? result[0].name : "undefined" },`,
        `    { pass: result[0] && result[0].count === ${av.count}, description: "${esc(av.name)} has ${av.count} members", got: result[0] ? String(result[0].count) : "undefined" },`,
        `    { pass: result[0] && result[0].avgPower === ${av.avgPower}, description: "${esc(av.name)} avg power: ${av.avgPower}", got: result[0] ? String(result[0].avgPower) : "undefined" },`,
        `    { pass: result[0] && result[0].activeCount === ${av.activeCount}, description: "${esc(av.name)} has ${av.activeCount} active heroes", got: result[0] ? String(result[0].activeCount) : "undefined" },`,
        `    { pass: result.find(r => r.name === "The Fantastick Four") && result.find(r => r.name === "The Fantastick Four").count === 0, description: "Fantastick Four have 0 members", got: result.find(r => r.name === "The Fantastick Four") ? String(result.find(r => r.name === "The Fantastick Four").count) : "undefined" },`,
        `    { pass: result.find(r => r.name === "The Fantastick Four") && result.find(r => r.name === "The Fantastick Four").avgPower === 0, description: "Empty team avgPower is 0", got: result.find(r => r.name === "The Fantastick Four") ? String(result.find(r => r.name === "The Fantastick Four").avgPower) : "undefined" },`,
        '  ];',
      ].join('\n'));
    })()
  },
  {
    id: 1047,
    title: "MCU: Power Census",
    tier: 4,
    category: ["api-data", "mcu"],
    tags: ["arrays", "reduce", "flatMap", "aggregation", "api-data", "mcu"],
    description: "Count how many heroes have each power across the entire roster.",
    instructions: "Write a function called `powerCensus` that takes the `heroes` array and returns an array of `{ power, count }` objects showing how many heroes have each power. Sort by `count` descending, then alphabetically by `power` for ties.\n\nExample:\n```\npowerCensus(heroes)\n// Returns: [{ power: \"superhuman strength\", count: 4 }, ...]\n```",
    starterCode: "",
    solution: "function powerCensus(heroes) {\n  const counts = {};\n  heroes.forEach(h => {\n    h.powers.forEach(p => { counts[p] = (counts[p] || 0) + 1; });\n  });\n  return Object.entries(counts)\n    .map(([power, count]) => ({ power, count }))\n    .sort((a, b) => b.count - a.count || a.power.localeCompare(b.power));\n}",
    hints: [
      "Loop through all heroes and their powers arrays. Build a frequency object mapping each power to its count.",
      "Convert to array with Object.entries().map(), then sort by count descending. Use localeCompare for tie-breaking."
    ],
    resources: [
      { label: "MDN: Object.entries()", url: "/docs/mdn/object-entries.html" },
      { label: "MDN: Array.prototype.forEach()", url: "/docs/mdn/array-foreach.html" }
    ],
    testRunner: (() => {
      const counts = {};
      HEROES.forEach(h => { h.powers.forEach(p => { counts[p] = (counts[p] || 0) + 1; }); });
      const census = Object.entries(counts)
        .map(([power, count]) => ({ power, count }))
        .sort((a, b) => b.count - a.count || a.power.localeCompare(b.power));
      const totalUnique = census.length;
      return tr('powerCensus', [
        '  const result = fn(heroes);',
        '  return [',
        '    { pass: Array.isArray(result), description: "Returns an array", got: typeof result },',
        `    { pass: result.length === ${totalUnique}, description: "${totalUnique} unique powers", got: String(result.length) },`,
        `    { pass: result[0] && result[0].power === "${esc(census[0].power)}" && result[0].count === ${census[0].count}, description: 'Most common: "${esc(census[0].power)}" (${census[0].count})', got: result[0] ? result[0].power + " (" + result[0].count + ")" : "undefined" },`,
        '    { pass: result[0] && result[0].count >= result[result.length - 1].count, description: "Sorted by count descending", got: result.slice(0, 3).map(r => r.count).join(", ") + "..." },',
        `    { pass: result.every(r => r.power && typeof r.count === "number"), description: "Each entry has power and count", got: result[0] ? Object.keys(result[0]).join(", ") : "undefined" },`,
        '    { pass: result.reduce((s, r) => s + r.count, 0) === heroes.reduce((s, h) => s + h.powers.length, 0), description: "Total power instances match", got: String(result.reduce((s, r) => s + r.count, 0)) },',
        '  ];',
      ].join('\n'));
    })()
  },
  {
    id: 1048,
    title: "MCU: Origin Analysis",
    tier: 4,
    category: ["api-data", "mcu"],
    tags: ["arrays", "reduce", "aggregation", "data-transformation", "api-data", "mcu"],
    description: "Group heroes by origin and build detailed analysis.",
    instructions: "Write a function called `originAnalysis` that takes the `heroes` array and returns an object where each key is an origin type and the value has:\n- `count`: number of heroes with that origin\n- `heroes`: sorted array of hero names\n- `avgMovies`: average movie appearances (rounded to 1 decimal)\n- `avgPower`: average total power (rounded to 1 decimal)\n\nExample:\n```\noriginAnalysis(heroes)\n// Returns: { human: { count: 3, heroes: [...], avgMovies: 7.7, avgPower: 24 }, ... }\n```",
    starterCode: "",
    solution: "function originAnalysis(heroes) {\n  const result = {};\n  heroes.forEach(h => {\n    if (!result[h.origin]) result[h.origin] = { members: [] };\n    result[h.origin].members.push(h);\n  });\n  Object.entries(result).forEach(([origin, data]) => {\n    const m = data.members;\n    result[origin] = {\n      count: m.length,\n      heroes: m.map(h => h.name).sort(),\n      avgMovies: Math.round(m.reduce((s, h) => s + h.movies, 0) / m.length * 10) / 10,\n      avgPower: Math.round(m.reduce((s, h) => s + h.stats.strength + h.stats.speed + h.stats.intelligence + h.stats.durability, 0) / m.length * 10) / 10\n    };\n  });\n  return result;\n}",
    hints: [
      "Group heroes by origin using forEach, then compute count, sorted names, avgMovies, and avgPower for each group.",
      "Use `Math.round(value * 10) / 10` for rounding. Total power = sum of all 4 stats."
    ],
    resources: [
      { label: "MDN: Array.prototype.reduce()", url: "/docs/mdn/array-reduce.html" }
    ],
    testRunner: (() => {
      const groups = {};
      HEROES.forEach(h => {
        if (!groups[h.origin]) groups[h.origin] = [];
        groups[h.origin].push(h);
      });
      const analysis = {};
      Object.entries(groups).forEach(([origin, members]) => {
        analysis[origin] = {
          count: members.length,
          heroes: members.map(h => h.name).sort(),
          avgMovies: Math.round(members.reduce((s, h) => s + h.movies, 0) / members.length * 10) / 10,
          avgPower: Math.round(members.reduce((s, h) => s + h.stats.strength + h.stats.speed + h.stats.intelligence + h.stats.durability, 0) / members.length * 10) / 10
        };
      });
      const humanCount = analysis.human.count;
      const enhancedCount = analysis.enhanced.count;
      const originCount = Object.keys(analysis).length;
      return tr('originAnalysis', [
        '  const result = fn(heroes);',
        '  return [',
        '    { pass: typeof result === "object" && !Array.isArray(result), description: "Returns an object", got: typeof result },',
        `    { pass: Object.keys(result).length === ${originCount}, description: "${originCount} origin types", got: String(Object.keys(result).length) },`,
        `    { pass: result.human && result.human.count === ${humanCount}, description: "${humanCount} human heroes", got: result.human ? String(result.human.count) : "undefined" },`,
        `    { pass: result.enhanced && result.enhanced.count === ${enhancedCount}, description: "${enhancedCount} enhanced heroes", got: result.enhanced ? String(result.enhanced.count) : "undefined" },`,
        `    { pass: result.human && result.human.avgMovies === ${analysis.human.avgMovies}, description: "Human avg movies: ${analysis.human.avgMovies}", got: result.human ? String(result.human.avgMovies) : "undefined" },`,
        `    { pass: result.enhanced && Array.isArray(result.enhanced.heroes) && result.enhanced.heroes[0] < result.enhanced.heroes[result.enhanced.heroes.length - 1], description: "Hero names sorted alphabetically", got: result.enhanced ? result.enhanced.heroes.join(", ") : "undefined" },`,
        '  ];',
      ].join('\n'));
    })()
  },
  {
    id: 1049,
    title: "MCU: Full MCU Database",
    tier: 4,
    category: ["api-data", "mcu"],
    tags: ["arrays", "reduce", "cross-reference", "data-transformation", "aggregation", "api-data", "mcu"],
    description: "Build a comprehensive MCU database from both datasets.",
    instructions: "Create a function called `mcuDatabase` that takes the `heroes` and `teams` arrays and returns an object with:\n- `totalHeroes`: number of heroes\n- `totalTeams`: number of teams\n- `activeHeroes`: number of active heroes\n- `mostMovies`: `{ name, alias, movies }` of the hero with the most movie appearances\n- `mostPowerful`: `{ name, alias, totalPower }` of the hero with the highest total power (sum of all stats)\n- `avgMovies`: average movies across all heroes (rounded to 1 decimal)\n- `teamBreakdown`: object mapping each team name to its member count\n- `originBreakdown`: object mapping each origin to its hero count\n\nExample:\n```\nmcuDatabase(heroes, teams)\n// Returns: { totalHeroes: 12, totalTeams: 6, ... }\n```",
    starterCode: "",
    solution: "function mcuDatabase(heroes, teams) {\n  const mostMovies = heroes.reduce((m, h) => h.movies > m.movies ? h : m);\n  const withPower = heroes.map(h => ({ ...h, totalPower: h.stats.strength + h.stats.speed + h.stats.intelligence + h.stats.durability }));\n  const mostPowerful = withPower.reduce((m, h) => h.totalPower > m.totalPower ? h : m);\n  const teamBreakdown = {};\n  teams.forEach(t => { teamBreakdown[t.name] = heroes.filter(h => h.teamIds.includes(t.id)).length; });\n  const originBreakdown = {};\n  heroes.forEach(h => { originBreakdown[h.origin] = (originBreakdown[h.origin] || 0) + 1; });\n  return {\n    totalHeroes: heroes.length,\n    totalTeams: teams.length,\n    activeHeroes: heroes.filter(h => h.isActive).length,\n    mostMovies: { name: mostMovies.name, alias: mostMovies.alias, movies: mostMovies.movies },\n    mostPowerful: { name: mostPowerful.name, alias: mostPowerful.alias, totalPower: mostPowerful.totalPower },\n    avgMovies: Math.round(heroes.reduce((s, h) => s + h.movies, 0) / heroes.length * 10) / 10,\n    teamBreakdown,\n    originBreakdown\n  };\n}",
    hints: [
      "Break into parts: find mostMovies and mostPowerful with reduce. Build breakdowns with forEach loops.",
      "For teamBreakdown, loop through teams and count heroes with teamIds.includes(). For originBreakdown, count by origin."
    ],
    resources: [{ label: "MDN: Array.prototype.reduce()", url: "/docs/mdn/array-reduce.html" }],
    testRunner: (() => {
      const mostMovies = HEROES.reduce((m, h) => h.movies > m.movies ? h : m);
      const withPower = HEROES.map(h => ({ ...h, totalPower: h.stats.strength + h.stats.speed + h.stats.intelligence + h.stats.durability }));
      const mostPowerful = withPower.reduce((m, h) => h.totalPower > m.totalPower ? h : m);
      const avgMovies = Math.round(HEROES.reduce((s, h) => s + h.movies, 0) / HEROES.length * 10) / 10;
      const activeCount = HEROES.filter(h => h.isActive).length;
      const avCount = HEROES.filter(h => h.teamIds.includes(1)).length;
      const originBrkdn = {};
      HEROES.forEach(h => { originBrkdn[h.origin] = (originBrkdn[h.origin] || 0) + 1; });
      return tr('mcuDatabase', [
        '  const result = fn(heroes, teams);',
        '  return [',
        '    { pass: typeof result === "object" && !Array.isArray(result), description: "Returns an object", got: typeof result },',
        '    { pass: result.totalHeroes === 12 && result.totalTeams === 6, description: "Correct totals: 12 heroes, 6 teams", got: "heroes: " + result.totalHeroes + ", teams: " + result.totalTeams },',
        `    { pass: result.activeHeroes === ${activeCount}, description: "${activeCount} active heroes", got: String(result.activeHeroes) },`,
        `    { pass: result.mostMovies && result.mostMovies.name === "${esc(mostMovies.name)}", description: 'Most movies: "${esc(mostMovies.name)}" (${mostMovies.movies})', got: result.mostMovies ? result.mostMovies.name : "undefined" },`,
        `    { pass: result.mostPowerful && result.mostPowerful.name === "${esc(mostPowerful.name)}", description: 'Most powerful: "${esc(mostPowerful.name)}" (${mostPowerful.totalPower})', got: result.mostPowerful ? result.mostPowerful.name : "undefined" },`,
        `    { pass: result.avgMovies === ${avgMovies}, description: "Average movies: ${avgMovies}", got: String(result.avgMovies) },`,
        `    { pass: result.teamBreakdown && result.teamBreakdown["The Avenguards"] === ${avCount}, description: "Avenguards have ${avCount} members", got: result.teamBreakdown ? String(result.teamBreakdown["The Avenguards"]) : "undefined" },`,
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

console.log(`\nPop Culture APIs — MCU Theme 🦸`);
console.log(`================================`);
console.log(`  Exercises: ${exercises.length}`);
console.log(`  T2: ${exercises.filter(e => e.tier === 2).length}`);
console.log(`  T3: ${exercises.filter(e => e.tier === 3).length}`);
console.log(`  T4: ${exercises.filter(e => e.tier === 4).length}`);
console.log(`  ID range: ${exercises[0].id}–${exercises[exercises.length - 1].id}`);
console.log(`  Heroes: ${HEROES.length}, Teams: ${TEAMS.length}`);
console.log(`  Appended to: ${outPath}`);
console.log(`  Total collection exercises: ${existing.exercises.length}`);
