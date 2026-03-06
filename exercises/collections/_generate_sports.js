/**
 * Generates the NBA (Sports) theme exercises for the Pop Culture APIs collection.
 * Run: node exercises/collections/_generate_sports.js
 * Reads existing pop-culture-apis.json and appends NBA exercises.
 *
 * 3 datasets: teams (8), players (12), seasons (4)
 * Triple cross-referencing: players → teams, seasons → teams, seasons → players (MVP)
 */

const fs = require('fs');
const path = require('path');

// ── Team Dataset (8 teams, punny parody names) ──────────────────────────────

const TEAMS = [
  {
    id: 1,
    name: "Los Angeles Fakers",
    abbreviation: "LAF",
    conference: "Western",
    division: "Pacific",
    arena: "Staples Senter",
    city: "Los Angeles",
    founded: 1947,
    championships: 17,
    colors: ["purple", "gold"]
  },
  {
    id: 2,
    name: "Golden State Worriers",
    abbreviation: "GSW",
    conference: "Western",
    division: "Pacific",
    arena: "Chasing Center",
    city: "San Francisco",
    founded: 1946,
    championships: 7,
    colors: ["blue", "gold"]
  },
  {
    id: 3,
    name: "Chicago Bullfrogs",
    abbreviation: "CHB",
    conference: "Eastern",
    division: "Central",
    arena: "United Senter",
    city: "Chicago",
    founded: 1966,
    championships: 6,
    colors: ["red", "black"]
  },
  {
    id: 4,
    name: "Boston Shelltics",
    abbreviation: "BOS",
    conference: "Eastern",
    division: "Atlantic",
    arena: "T-Bone Garden",
    city: "Boston",
    founded: 1946,
    championships: 18,
    colors: ["green", "white"]
  },
  {
    id: 5,
    name: "Miami Meat",
    abbreviation: "MIA",
    conference: "Eastern",
    division: "Southeast",
    arena: "Kaseya Senter",
    city: "Miami",
    founded: 1988,
    championships: 3,
    colors: ["red", "black", "white"]
  },
  {
    id: 6,
    name: "Brooklyn Nests",
    abbreviation: "BKN",
    conference: "Eastern",
    division: "Atlantic",
    arena: "Bark-lays Center",
    city: "Brooklyn",
    founded: 1967,
    championships: 0,
    colors: ["black", "white"]
  },
  {
    id: 7,
    name: "Milwaukee Ducks",
    abbreviation: "MIL",
    conference: "Eastern",
    division: "Central",
    arena: "Fizzer Forum",
    city: "Milwaukee",
    founded: 1968,
    championships: 2,
    colors: ["green", "cream"]
  },
  {
    id: 8,
    name: "Phoenix Buns",
    abbreviation: "PHX",
    conference: "Western",
    division: "Pacific",
    arena: "Footprint Senter",
    city: "Phoenix",
    founded: 1968,
    championships: 0,
    colors: ["purple", "orange"]
  }
];

// ── Player Dataset (12 players, punny parody names) ─────────────────────────

const PLAYERS = [
  {
    id: 1,
    name: "LeBron Jameson",
    teamId: 1,
    position: "SF",
    jerseyNumber: 23,
    stats: { ppg: 27.1, rpg: 7.4, apg: 7.3, fgPct: 0.505 },
    height: 81,
    weight: 250,
    yearsInLeague: 21,
    isAllStar: true,
    salary: 44740000,
    awards: ["MVP", "Finals MVP", "Rookie of the Year", "All-Star Game MVP"],
    draftPick: 1
  },
  {
    id: 2,
    name: "Steph Curly",
    teamId: 2,
    position: "PG",
    jerseyNumber: 30,
    stats: { ppg: 24.8, rpg: 4.7, apg: 6.4, fgPct: 0.473 },
    height: 75,
    weight: 185,
    yearsInLeague: 15,
    isAllStar: true,
    salary: 51915000,
    awards: ["MVP", "Finals MVP", "Scoring Champion", "All-Star Game MVP"],
    draftPick: 7
  },
  {
    id: 3,
    name: "Michael Jaw-dan",
    teamId: 3,
    position: "SG",
    jerseyNumber: 23,
    stats: { ppg: 30.1, rpg: 6.2, apg: 5.3, fgPct: 0.497 },
    height: 78,
    weight: 216,
    yearsInLeague: 15,
    isAllStar: true,
    salary: 33140000,
    awards: ["MVP", "Finals MVP", "Defensive Player of the Year", "Rookie of the Year", "Scoring Champion"],
    draftPick: 3
  },
  {
    id: 4,
    name: "Kevin Dew-rant",
    teamId: 6,
    position: "SF",
    jerseyNumber: 35,
    stats: { ppg: 27.3, rpg: 7.1, apg: 4.3, fgPct: 0.499 },
    height: 82,
    weight: 240,
    yearsInLeague: 17,
    isAllStar: true,
    salary: 47649000,
    awards: ["MVP", "Finals MVP", "Rookie of the Year", "Scoring Champion"],
    draftPick: 2
  },
  {
    id: 5,
    name: "Kobe Beef-ant",
    teamId: 1,
    position: "SG",
    jerseyNumber: 24,
    stats: { ppg: 25.0, rpg: 5.2, apg: 4.7, fgPct: 0.447 },
    height: 78,
    weight: 212,
    yearsInLeague: 20,
    isAllStar: true,
    salary: 25000000,
    awards: ["MVP", "Finals MVP", "All-Star Game MVP"],
    draftPick: 13
  },
  {
    id: 6,
    name: "Shaquille O'Meal",
    teamId: 1,
    position: "C",
    jerseyNumber: 34,
    stats: { ppg: 23.7, rpg: 10.9, apg: 2.5, fgPct: 0.582 },
    height: 85,
    weight: 325,
    yearsInLeague: 19,
    isAllStar: true,
    salary: 27700000,
    awards: ["MVP", "Finals MVP", "Rookie of the Year", "All-Star Game MVP", "Scoring Champion"],
    draftPick: 1
  },
  {
    id: 7,
    name: "Larry Birdbath",
    teamId: 4,
    position: "SF",
    jerseyNumber: 33,
    stats: { ppg: 24.3, rpg: 10.0, apg: 6.3, fgPct: 0.496 },
    height: 81,
    weight: 220,
    yearsInLeague: 13,
    isAllStar: true,
    salary: 7070000,
    awards: ["MVP", "Finals MVP", "Rookie of the Year"],
    draftPick: 6
  },
  {
    id: 8,
    name: "Giannis Attempt-a-dunk",
    teamId: 7,
    position: "PF",
    jerseyNumber: 34,
    stats: { ppg: 28.2, rpg: 11.0, apg: 5.6, fgPct: 0.553 },
    height: 83,
    weight: 243,
    yearsInLeague: 11,
    isAllStar: true,
    salary: 48787000,
    awards: ["MVP", "Finals MVP", "Defensive Player of the Year", "Most Improved Player"],
    draftPick: 15
  },
  {
    id: 9,
    name: "Jimmy Buckets",
    teamId: 5,
    position: "SF",
    jerseyNumber: 22,
    stats: { ppg: 21.8, rpg: 5.9, apg: 5.0, fgPct: 0.462 },
    height: 79,
    weight: 230,
    yearsInLeague: 13,
    isAllStar: true,
    salary: 45183000,
    awards: ["Most Improved Player"],
    draftPick: 30
  },
  {
    id: 10,
    name: "Luka Donuts",
    teamId: 8,
    position: "PG",
    jerseyNumber: 77,
    stats: { ppg: 28.7, rpg: 8.3, apg: 8.0, fgPct: 0.457 },
    height: 79,
    weight: 230,
    yearsInLeague: 6,
    isAllStar: true,
    salary: 40064000,
    awards: ["Rookie of the Year"],
    draftPick: 3
  },
  {
    id: 11,
    name: "Jayson Tater-Tot",
    teamId: 4,
    position: "PF",
    jerseyNumber: 0,
    stats: { ppg: 23.1, rpg: 7.2, apg: 4.4, fgPct: 0.453 },
    height: 80,
    weight: 210,
    yearsInLeague: 7,
    isAllStar: true,
    salary: 32600000,
    awards: ["All-Star Game MVP"],
    draftPick: 3
  },
  {
    id: 12,
    name: "Ja Waterfall",
    teamId: 3,
    position: "PG",
    jerseyNumber: 12,
    stats: { ppg: 22.5, rpg: 5.8, apg: 7.2, fgPct: 0.466 },
    height: 75,
    weight: 174,
    yearsInLeague: 5,
    isAllStar: false,
    salary: 33483000,
    awards: ["Rookie of the Year", "Most Improved Player"],
    draftPick: 2
  }
];

// ── Season Dataset (4 seasons with team records) ────────────────────────────

const SEASONS = [
  {
    year: "2023-24",
    mvpId: 10,
    championId: 4,
    teamRecords: [
      { teamId: 1, wins: 47, losses: 35 },
      { teamId: 2, wins: 46, losses: 36 },
      { teamId: 3, wins: 39, losses: 43 },
      { teamId: 4, wins: 64, losses: 18 },
      { teamId: 5, wins: 46, losses: 36 },
      { teamId: 6, wins: 32, losses: 50 },
      { teamId: 7, wins: 49, losses: 33 },
      { teamId: 8, wins: 49, losses: 33 }
    ]
  },
  {
    year: "2022-23",
    mvpId: 8,
    championId: 7,
    teamRecords: [
      { teamId: 1, wins: 43, losses: 39 },
      { teamId: 2, wins: 44, losses: 38 },
      { teamId: 3, wins: 40, losses: 42 },
      { teamId: 4, wins: 57, losses: 25 },
      { teamId: 5, wins: 44, losses: 38 },
      { teamId: 6, wins: 45, losses: 37 },
      { teamId: 7, wins: 58, losses: 24 },
      { teamId: 8, wins: 45, losses: 37 }
    ]
  },
  {
    year: "2021-22",
    mvpId: 1,
    championId: 2,
    teamRecords: [
      { teamId: 1, wins: 33, losses: 49 },
      { teamId: 2, wins: 53, losses: 29 },
      { teamId: 3, wins: 46, losses: 36 },
      { teamId: 4, wins: 51, losses: 31 },
      { teamId: 5, wins: 53, losses: 29 },
      { teamId: 6, wins: 44, losses: 38 },
      { teamId: 7, wins: 51, losses: 31 },
      { teamId: 8, wins: 64, losses: 18 }
    ]
  },
  {
    year: "2020-21",
    mvpId: 3,
    championId: 1,
    teamRecords: [
      { teamId: 1, wins: 52, losses: 20 },
      { teamId: 2, wins: 39, losses: 33 },
      { teamId: 3, wins: 31, losses: 41 },
      { teamId: 4, wins: 36, losses: 36 },
      { teamId: 5, wins: 40, losses: 32 },
      { teamId: 6, wins: 48, losses: 24 },
      { teamId: 7, wins: 46, losses: 26 },
      { teamId: 8, wins: 51, losses: 21 }
    ]
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
    lines.push(`    abbreviation: "${t.abbreviation}",`);
    lines.push(`    conference: "${t.conference}",`);
    lines.push(`    division: "${t.division}",`);
    lines.push(`    arena: "${t.arena}",`);
    lines.push(`    city: "${t.city}",`);
    lines.push(`    founded: ${t.founded},`);
    lines.push(`    championships: ${t.championships},`);
    lines.push(`    colors: ${JSON.stringify(t.colors)}`);
    lines.push(`  }${i < TEAMS.length - 1 ? ',' : ''}`);
  });
  lines.push('];');
  lines.push('');

  // Players
  lines.push('const players = [');
  PLAYERS.forEach((p, i) => {
    lines.push('  {');
    lines.push(`    id: ${p.id},`);
    lines.push(`    name: "${p.name}",`);
    lines.push(`    teamId: ${p.teamId},`);
    lines.push(`    position: "${p.position}",`);
    lines.push(`    jerseyNumber: ${p.jerseyNumber},`);
    lines.push(`    stats: { ppg: ${p.stats.ppg}, rpg: ${p.stats.rpg}, apg: ${p.stats.apg}, fgPct: ${p.stats.fgPct} },`);
    lines.push(`    height: ${p.height},`);
    lines.push(`    weight: ${p.weight},`);
    lines.push(`    yearsInLeague: ${p.yearsInLeague},`);
    lines.push(`    isAllStar: ${p.isAllStar},`);
    lines.push(`    salary: ${p.salary},`);
    lines.push(`    awards: ${JSON.stringify(p.awards)},`);
    lines.push(`    draftPick: ${p.draftPick}`);
    lines.push(`  }${i < PLAYERS.length - 1 ? ',' : ''}`);
  });
  lines.push('];');
  lines.push('');

  // Seasons
  lines.push('const seasons = [');
  SEASONS.forEach((s, i) => {
    lines.push('  {');
    lines.push(`    year: "${s.year}",`);
    lines.push(`    mvpId: ${s.mvpId},`);
    lines.push(`    championId: ${s.championId},`);
    lines.push('    teamRecords: [');
    s.teamRecords.forEach((r, j) => {
      lines.push(`      { teamId: ${r.teamId}, wins: ${r.wins}, losses: ${r.losses} }${j < s.teamRecords.length - 1 ? ',' : ''}`);
    });
    lines.push('    ]');
    lines.push(`  }${i < SEASONS.length - 1 ? ',' : ''}`);
  });
  lines.push('];');

  return lines.join('\n');
}

const DATASET_DISPLAY = formatDatasetDisplay();
const PLAYERS_JSON = JSON.stringify(PLAYERS);
const TEAMS_JSON = JSON.stringify(TEAMS);
const SEASONS_JSON = JSON.stringify(SEASONS);

// ── Helpers ─────────────────────────────────────────────────────────────────

function esc(str) { return String(str).replace(/'/g, "\\'"); }

function tr(fnName, testBody) {
  return `(code) => {\n  const players = ${PLAYERS_JSON};\n  const teams = ${TEAMS_JSON};\n  const seasons = ${SEASONS_JSON};\n  const fn = new Function(code + '; return ${fnName};')();\n${testBody}\n}`;
}

// ── Exercise definitions ────────────────────────────────────────────────────

const exercises = [

  // ── T2 (6 exercises) ──────────────────────────────────────────────────────

  {
    id: 1016,
    title: "NBA: Get Player Names",
    tier: 2,
    category: ["api-data", "nba"],
    tags: ["arrays", "map", "api-data", "nba"],
    description: "Extract all player names from the dataset.",
    instructions: "Write a function called `getPlayerNames` that takes an array of player objects and returns an array of their names.\n\nExample:\n```\ngetPlayerNames(players)\n// Returns: [\"LeBron Jameson\", \"Steph Curly\", ...]\n```",
    starterCode: "// Return an array of all player names\nfunction getPlayerNames(players) {\n  \n}",
    solution: "function getPlayerNames(players) {\n  return players.map(p => p.name);\n}",
    hints: [
      "Use .map() to transform each player object into just the name property.",
      "The callback is: `p => p.name`"
    ],
    resources: [{ label: "MDN: Array.prototype.map()", url: "/docs/mdn/array-map.html" }],
    testRunner: tr('getPlayerNames', [
      '  const result = fn(players);',
      '  return [',
      '    { pass: Array.isArray(result), description: "Returns an array", got: typeof result },',
      '    { pass: result.length === 12, description: "Returns 12 names", got: String(result.length) },',
      '    { pass: result[0] === "LeBron Jameson", description: \'First is "LeBron Jameson"\', got: String(result[0]) },',
      '    { pass: result[11] === "Ja Waterfall", description: \'Last is "Ja Waterfall"\', got: String(result[11]) },',
      `    { pass: result.includes("Shaquille O'Meal"), description: 'Includes "Shaquille O\\'Meal"', got: String(result.includes("Shaquille O'Meal")) },`,
      '  ];',
    ].join('\n'))
  },
  {
    id: 1017,
    title: "NBA: Filter All-Stars",
    tier: 2,
    category: ["api-data", "nba"],
    tags: ["arrays", "filter", "api-data", "nba"],
    description: "Filter to only All-Star players.",
    instructions: "Write a function called `getAllStars` that takes an array of player objects and returns only those where `isAllStar` is `true`.\n\nExample:\n```\ngetAllStars(players)\n// Returns: [{ name: \"LeBron Jameson\", ... }, ...]\n```",
    starterCode: "// Return only All-Star players\nfunction getAllStars(players) {\n  \n}",
    solution: "function getAllStars(players) {\n  return players.filter(p => p.isAllStar);\n}",
    hints: [
      "Use .filter() to keep only players where isAllStar is true.",
      "The boolean property works as the condition: `p => p.isAllStar`"
    ],
    resources: [{ label: "MDN: Array.prototype.filter()", url: "/docs/mdn/array-filter.html" }],
    testRunner: (() => {
      const allStarCount = PLAYERS.filter(p => p.isAllStar).length;
      const nonStarName = PLAYERS.find(p => !p.isAllStar).name;
      return tr('getAllStars', [
        '  const result = fn(players);',
        '  return [',
        '    { pass: Array.isArray(result), description: "Returns an array", got: typeof result },',
        `    { pass: result.length === ${allStarCount}, description: "${allStarCount} players are All-Stars", got: String(result.length) },`,
        '    { pass: result.every(p => p.isAllStar === true), description: "All returned are All-Stars", got: String(result.every(p => p.isAllStar)) },',
        '    { pass: result.find(p => p.name === "LeBron Jameson"), description: \'Includes "LeBron Jameson"\', got: String(!!result.find(p => p.name === "LeBron Jameson")) },',
        `    { pass: !result.find(p => p.name === "${esc(nonStarName)}"), description: 'Excludes "${esc(nonStarName)}"', got: String(!result.find(p => p.name === "${esc(nonStarName)}")) },`,
        '  ];',
      ].join('\n'));
    })()
  },
  {
    id: 1018,
    title: "NBA: Get Team Names",
    tier: 2,
    category: ["api-data", "nba"],
    tags: ["arrays", "map", "api-data", "nba"],
    description: "Extract all team names from the teams dataset.",
    instructions: "Write a function called `getTeamNames` that takes an array of team objects and returns an array of their names.\n\nExample:\n```\ngetTeamNames(teams)\n// Returns: [\"Los Angeles Fakers\", \"Golden State Worriers\", ...]\n```",
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
      '    { pass: result.length === 8, description: "Returns 8 team names", got: String(result.length) },',
      '    { pass: result[0] === "Los Angeles Fakers", description: \'First is "Los Angeles Fakers"\', got: String(result[0]) },',
      '    { pass: result.includes("Chicago Bullfrogs"), description: \'Includes "Chicago Bullfrogs"\', got: String(result.includes("Chicago Bullfrogs")) },',
      '    { pass: result.includes("Phoenix Buns"), description: \'Includes "Phoenix Buns"\', got: String(result.includes("Phoenix Buns")) },',
      '  ];',
    ].join('\n'))
  },
  {
    id: 1019,
    title: "NBA: Filter by Position",
    tier: 2,
    category: ["api-data", "nba"],
    tags: ["arrays", "filter", "comparison", "api-data", "nba"],
    description: "Filter players by their position.",
    instructions: "Write a function called `filterByPosition` that takes an array of player objects and a position string (like `\"PG\"`, `\"SG\"`, `\"SF\"`, `\"PF\"`, or `\"C\"`), and returns players that play that position.\n\nExample:\n```\nfilterByPosition(players, \"PG\")\n// Returns all point guards\n```",
    starterCode: "// Return players who play the given position\nfunction filterByPosition(players, position) {\n  \n}",
    solution: "function filterByPosition(players, position) {\n  return players.filter(p => p.position === position);\n}",
    hints: [
      "Use .filter() with a strict equality check on the position property.",
      "The condition: `p => p.position === position`"
    ],
    resources: [{ label: "MDN: Array.prototype.filter()", url: "/docs/mdn/array-filter.html" }],
    testRunner: (() => {
      const pgCount = PLAYERS.filter(p => p.position === 'PG').length;
      const sfCount = PLAYERS.filter(p => p.position === 'SF').length;
      const cCount = PLAYERS.filter(p => p.position === 'C').length;
      return tr('filterByPosition', [
        '  const pgs = fn(players, "PG");',
        '  const sfs = fn(players, "SF");',
        '  const centers = fn(players, "C");',
        '  return [',
        '    { pass: Array.isArray(pgs), description: "Returns an array", got: typeof pgs },',
        `    { pass: pgs.length === ${pgCount}, description: "${pgCount} point guards (PG)", got: String(pgs.length) },`,
        `    { pass: sfs.length === ${sfCount}, description: "${sfCount} small forwards (SF)", got: String(sfs.length) },`,
        `    { pass: centers.length === ${cCount}, description: "${cCount} center (C)", got: String(centers.length) },`,
        '    { pass: pgs.every(p => p.position === "PG"), description: "All returned PGs have correct position", got: String(pgs.every(p => p.position === "PG")) },',
        '  ];',
      ].join('\n'));
    })()
  },
  {
    id: 1020,
    title: "NBA: Get Scoring Averages",
    tier: 2,
    category: ["api-data", "nba"],
    tags: ["arrays", "map", "nested-access", "api-data", "nba"],
    description: "Extract names and scoring averages from nested stats.",
    instructions: "Write a function called `getScoringAverages` that takes an array of player objects and returns an array of objects with `name` and `ppg` properties.\n\nEach player has a nested `stats` object containing `ppg` (points per game).\n\nExample:\n```\ngetScoringAverages(players)\n// Returns: [{ name: \"LeBron Jameson\", ppg: 27.1 }, ...]\n```",
    starterCode: "// Return an array of { name, ppg } objects\nfunction getScoringAverages(players) {\n  \n}",
    solution: "function getScoringAverages(players) {\n  return players.map(p => ({ name: p.name, ppg: p.stats.ppg }));\n}",
    hints: [
      "Use .map() to build new objects with name and the ppg value from the nested stats object.",
      "Access nested data: `p => ({ name: p.name, ppg: p.stats.ppg })`"
    ],
    resources: [{ label: "MDN: Array.prototype.map()", url: "/docs/mdn/array-map.html" }],
    testRunner: (() => {
      const first = PLAYERS[0];
      const mj = PLAYERS.find(p => p.name === 'Michael Jaw-dan');
      return tr('getScoringAverages', [
        '  const result = fn(players);',
        '  return [',
        '    { pass: Array.isArray(result), description: "Returns an array", got: typeof result },',
        '    { pass: result.length === 12, description: "Returns 12 entries", got: String(result.length) },',
        `    { pass: result[0] && result[0].name === "${esc(first.name)}" && result[0].ppg === ${first.stats.ppg}, description: "${esc(first.name)} has ${first.stats.ppg} ppg", got: result[0] ? JSON.stringify(result[0]) : "undefined" },`,
        `    { pass: result[2] && result[2].name === "${esc(mj.name)}" && result[2].ppg === ${mj.stats.ppg}, description: "${esc(mj.name)} has ${mj.stats.ppg} ppg", got: result[2] ? JSON.stringify(result[2]) : "undefined" },`,
        '    { pass: result[0] && Object.keys(result[0]).length === 2, description: "Each entry has exactly 2 properties", got: result[0] ? String(Object.keys(result[0]).length) : "undefined" },',
        '  ];',
      ].join('\n'));
    })()
  },
  {
    id: 1021,
    title: "NBA: Get Season Years",
    tier: 2,
    category: ["api-data", "nba"],
    tags: ["arrays", "map", "api-data", "nba"],
    description: "Extract the year strings from the seasons dataset.",
    instructions: "Write a function called `getSeasonYears` that takes an array of season objects and returns an array of their `year` strings.\n\nExample:\n```\ngetSeasonYears(seasons)\n// Returns: [\"2023-24\", \"2022-23\", ...]\n```",
    starterCode: "// Return an array of season year strings\nfunction getSeasonYears(seasons) {\n  \n}",
    solution: "function getSeasonYears(seasons) {\n  return seasons.map(s => s.year);\n}",
    hints: [
      "Use .map() to transform each season object into just the year property.",
      "The callback is: `s => s.year`"
    ],
    resources: [{ label: "MDN: Array.prototype.map()", url: "/docs/mdn/array-map.html" }],
    testRunner: tr('getSeasonYears', [
      '  const result = fn(seasons);',
      '  return [',
      '    { pass: Array.isArray(result), description: "Returns an array", got: typeof result },',
      '    { pass: result.length === 4, description: "Returns 4 season years", got: String(result.length) },',
      '    { pass: result[0] === "2023-24", description: \'First is "2023-24"\', got: String(result[0]) },',
      '    { pass: result[3] === "2020-21", description: \'Last is "2020-21"\', got: String(result[3]) },',
      '    { pass: result.includes("2021-22"), description: \'Includes "2021-22"\', got: String(result.includes("2021-22")) },',
      '  ];',
    ].join('\n'))
  },

  // ── T3 (7 exercises) ──────────────────────────────────────────────────────

  {
    id: 1022,
    title: "NBA: Top Scorers",
    tier: 3,
    category: ["api-data", "nba"],
    tags: ["arrays", "sort", "slice", "map", "api-data", "nba"],
    description: "Sort players by scoring average and return the top N scorers.",
    instructions: "Write a function called `getTopScorers` that takes the `players` array and a number `n`, and returns the top `n` scorers sorted by `stats.ppg` descending. Return an array of objects with `name` and `ppg` properties.\n\nExample:\n```\ngetTopScorers(players, 3)\n// Returns: [{ name: \"Michael Jaw-dan\", ppg: 30.1 }, ...]\n```",
    starterCode: "function getTopScorers(players, n) {\n  \n}",
    solution: "function getTopScorers(players, n) {\n  return [...players]\n    .sort((a, b) => b.stats.ppg - a.stats.ppg)\n    .slice(0, n)\n    .map(p => ({ name: p.name, ppg: p.stats.ppg }));\n}",
    hints: [
      "Sort a copy of the array by stats.ppg descending, then slice the first n entries and map to { name, ppg }.",
      "Use spread to avoid mutating: `[...players].sort((a, b) => b.stats.ppg - a.stats.ppg)`"
    ],
    resources: [
      { label: "MDN: Array.prototype.sort()", url: "/docs/mdn/array-sort.html" },
      { label: "MDN: Array.prototype.slice()", url: "/docs/mdn/array-slice.html" }
    ],
    testRunner: (() => {
      const sorted = [...PLAYERS].sort((a, b) => b.stats.ppg - a.stats.ppg);
      const top1 = sorted[0];
      const top3 = sorted.slice(0, 3);
      const top5 = sorted.slice(0, 5);
      return tr('getTopScorers', [
        '  const top1 = fn(players, 1);',
        '  const top3 = fn(players, 3);',
        '  const top5 = fn(players, 5);',
        '  return [',
        `    { pass: top1.length === 1 && top1[0].name === "${esc(top1.name)}", description: 'Top scorer is "${esc(top1.name)}"', got: top1[0] ? top1[0].name : "undefined" },`,
        `    { pass: top1[0] && top1[0].ppg === ${top1.stats.ppg}, description: "Top scorer has ${top1.stats.ppg} ppg", got: top1[0] ? String(top1[0].ppg) : "undefined" },`,
        `    { pass: top3.length === 3, description: "Top 3 returns 3 entries", got: String(top3.length) },`,
        `    { pass: top3[2] && top3[2].name === "${esc(top3[2].name)}", description: '3rd highest scorer is "${esc(top3[2].name)}"', got: top3[2] ? top3[2].name : "undefined" },`,
        `    { pass: top5.length === 5 && top5[0].ppg >= top5[4].ppg, description: "Top 5 is sorted descending by ppg", got: top5.map(p => p.ppg).join(", ") },`,
        '  ];',
      ].join('\n'));
    })()
  },
  {
    id: 1023,
    title: "NBA: Team Roster",
    tier: 3,
    category: ["api-data", "nba"],
    tags: ["arrays", "filter", "map", "cross-reference", "api-data", "nba"],
    description: "Build a team roster by cross-referencing players and teams.",
    instructions: "Write a function called `getTeamRoster` that takes the `players` array, `teams` array, and a `teamId` number. Return an object with:\n- `team`: the team's name\n- `players`: sorted array of player names on that team\n- `count`: number of players\n\nExample:\n```\ngetTeamRoster(players, teams, 1)\n// Returns: { team: \"Los Angeles Fakers\", players: [\"Kobe Beef-ant\", ...], count: 3 }\n```",
    starterCode: "function getTeamRoster(players, teams, teamId) {\n  \n}",
    solution: "function getTeamRoster(players, teams, teamId) {\n  const team = teams.find(t => t.id === teamId);\n  const roster = players.filter(p => p.teamId === teamId).map(p => p.name).sort();\n  return { team: team.name, players: roster, count: roster.length };\n}",
    hints: [
      "Use .find() to get the team name, then .filter() players by teamId, .map() to names, and .sort() alphabetically.",
      "Build the return object: `{ team: team.name, players: roster, count: roster.length }`"
    ],
    resources: [
      { label: "MDN: Array.prototype.find()", url: "/docs/mdn/array-find.html" },
      { label: "MDN: Array.prototype.filter()", url: "/docs/mdn/array-filter.html" }
    ],
    testRunner: (() => {
      const lafRoster = PLAYERS.filter(p => p.teamId === 1).map(p => p.name).sort();
      const milRoster = PLAYERS.filter(p => p.teamId === 7).map(p => p.name).sort();
      return tr('getTeamRoster', [
        '  const laf = fn(players, teams, 1);',
        '  const mil = fn(players, teams, 7);',
        '  return [',
        `    { pass: laf && laf.team === "Los Angeles Fakers", description: 'Team 1 is "Los Angeles Fakers"', got: laf ? laf.team : "undefined" },`,
        `    { pass: laf && laf.count === ${lafRoster.length}, description: "Los Angeles Fakers have ${lafRoster.length} players", got: laf ? String(laf.count) : "undefined" },`,
        `    { pass: laf && laf.players.length === ${lafRoster.length} && laf.players[0] === "${esc(lafRoster[0])}" && laf.players[${lafRoster.length - 1}] === "${esc(lafRoster[lafRoster.length - 1])}", description: "Roster is sorted alphabetically", got: laf ? laf.players.join(", ") : "undefined" },`,
        `    { pass: mil && mil.team === "Milwaukee Ducks", description: 'Team 7 is "Milwaukee Ducks"', got: mil ? mil.team : "undefined" },`,
        `    { pass: mil && mil.count === ${milRoster.length}, description: "Milwaukee Ducks have ${milRoster.length} player", got: mil ? String(mil.count) : "undefined" },`,
        '  ];',
      ].join('\n'));
    })()
  },
  {
    id: 1024,
    title: "NBA: Players by Conference",
    tier: 3,
    category: ["api-data", "nba"],
    tags: ["arrays", "filter", "cross-reference", "api-data", "nba"],
    description: "Find all players in a conference by cross-referencing teams.",
    instructions: "Write a function called `getPlayersByConference` that takes the `players` array, `teams` array, and a `conference` string (`\"Eastern\"` or `\"Western\"`). Return the names of all players whose team is in that conference, sorted alphabetically.\n\nExample:\n```\ngetPlayersByConference(players, teams, \"Western\")\n// Returns: [\"Kobe Beef-ant\", \"LeBron Jameson\", ...]\n```",
    starterCode: "function getPlayersByConference(players, teams, conference) {\n  \n}",
    solution: "function getPlayersByConference(players, teams, conference) {\n  const confTeamIds = teams.filter(t => t.conference === conference).map(t => t.id);\n  return players.filter(p => confTeamIds.includes(p.teamId)).map(p => p.name).sort();\n}",
    hints: [
      "First get the team IDs for the conference, then filter players whose teamId is in that list.",
      "Chain: filter teams → map to IDs → filter players by those IDs → map to names → sort"
    ],
    resources: [
      { label: "MDN: Array.prototype.includes()", url: "/docs/mdn/array-includes.html" },
      { label: "MDN: Array.prototype.filter()", url: "/docs/mdn/array-filter.html" }
    ],
    testRunner: (() => {
      const westTeamIds = TEAMS.filter(t => t.conference === 'Western').map(t => t.id);
      const eastTeamIds = TEAMS.filter(t => t.conference === 'Eastern').map(t => t.id);
      const westPlayers = PLAYERS.filter(p => westTeamIds.includes(p.teamId)).map(p => p.name).sort();
      const eastPlayers = PLAYERS.filter(p => eastTeamIds.includes(p.teamId)).map(p => p.name).sort();
      return tr('getPlayersByConference', [
        '  const west = fn(players, teams, "Western");',
        '  const east = fn(players, teams, "Eastern");',
        '  return [',
        `    { pass: west.length === ${westPlayers.length}, description: "${westPlayers.length} players in Western conference", got: String(west.length) },`,
        `    { pass: east.length === ${eastPlayers.length}, description: "${eastPlayers.length} players in Eastern conference", got: String(east.length) },`,
        `    { pass: west[0] < west[west.length - 1], description: "Western players sorted alphabetically", got: west.join(", ") },`,
        `    { pass: east[0] < east[east.length - 1], description: "Eastern players sorted alphabetically", got: east.join(", ") },`,
        `    { pass: west.length + east.length === 12, description: "All 12 players accounted for", got: String(west.length + east.length) },`,
        '  ];',
      ].join('\n'));
    })()
  },
  {
    id: 1025,
    title: "NBA: Total Team Salary",
    tier: 3,
    category: ["api-data", "nba"],
    tags: ["arrays", "filter", "reduce", "api-data", "nba"],
    description: "Calculate the total salary for a team's players.",
    instructions: "Write a function called `getTeamSalary` that takes the `players` array and a `teamId` number, and returns the total salary of all players on that team.\n\nExample:\n```\ngetTeamSalary(players, 1)\n// Returns: 97440000\n```",
    starterCode: "function getTeamSalary(players, teamId) {\n  \n}",
    solution: "function getTeamSalary(players, teamId) {\n  return players.filter(p => p.teamId === teamId).reduce((sum, p) => sum + p.salary, 0);\n}",
    hints: [
      "Filter players by teamId first, then use .reduce() to sum their salaries.",
      "Chain: `.filter(p => p.teamId === teamId).reduce((sum, p) => sum + p.salary, 0)`"
    ],
    resources: [
      { label: "MDN: Array.prototype.reduce()", url: "/docs/mdn/array-reduce.html" },
      { label: "MDN: Array.prototype.filter()", url: "/docs/mdn/array-filter.html" }
    ],
    testRunner: (() => {
      const lafSalary = PLAYERS.filter(p => p.teamId === 1).reduce((s, p) => s + p.salary, 0);
      const milSalary = PLAYERS.filter(p => p.teamId === 7).reduce((s, p) => s + p.salary, 0);
      const gswSalary = PLAYERS.filter(p => p.teamId === 2).reduce((s, p) => s + p.salary, 0);
      return tr('getTeamSalary', [
        '  const laf = fn(players, 1);',
        '  const mil = fn(players, 7);',
        '  const gsw = fn(players, 2);',
        '  return [',
        `    { pass: laf === ${lafSalary}, description: "LA Fakers total salary: $${(lafSalary / 1000000).toFixed(1)}M", got: String(laf) },`,
        `    { pass: mil === ${milSalary}, description: "Milwaukee Ducks total salary: $${(milSalary / 1000000).toFixed(1)}M", got: String(mil) },`,
        `    { pass: gsw === ${gswSalary}, description: "Golden State Worriers total salary: $${(gswSalary / 1000000).toFixed(1)}M", got: String(gsw) },`,
        '    { pass: typeof laf === "number", description: "Returns a number", got: typeof laf },',
        '    { pass: fn(players, 99) === 0, description: "Returns 0 for non-existent team", got: String(fn(players, 99)) },',
        '  ];',
      ].join('\n'));
    })()
  },
  {
    id: 1026,
    title: "NBA: Season Champions",
    tier: 3,
    category: ["api-data", "nba"],
    tags: ["arrays", "map", "cross-reference", "api-data", "nba"],
    description: "Look up the champion team name for each season.",
    instructions: "Write a function called `getChampionNames` that takes the `seasons` array and `teams` array, and returns an array of objects with `year` and `champion` (the team name) for each season.\n\nExample:\n```\ngetChampionNames(seasons, teams)\n// Returns: [{ year: \"2023-24\", champion: \"Boston Shelltics\" }, ...]\n```",
    starterCode: "function getChampionNames(seasons, teams) {\n  \n}",
    solution: "function getChampionNames(seasons, teams) {\n  return seasons.map(s => ({\n    year: s.year,\n    champion: teams.find(t => t.id === s.championId).name\n  }));\n}",
    hints: [
      "Use .map() on seasons and .find() on teams to look up each champion by championId.",
      "For each season: `{ year: s.year, champion: teams.find(t => t.id === s.championId).name }`"
    ],
    resources: [
      { label: "MDN: Array.prototype.map()", url: "/docs/mdn/array-map.html" },
      { label: "MDN: Array.prototype.find()", url: "/docs/mdn/array-find.html" }
    ],
    testRunner: (() => {
      const champs = SEASONS.map(s => ({
        year: s.year,
        champion: TEAMS.find(t => t.id === s.championId).name
      }));
      return tr('getChampionNames', [
        '  const result = fn(seasons, teams);',
        '  return [',
        '    { pass: Array.isArray(result) && result.length === 4, description: "Returns 4 season entries", got: Array.isArray(result) ? String(result.length) : typeof result },',
        `    { pass: result[0] && result[0].year === "${champs[0].year}" && result[0].champion === "${esc(champs[0].champion)}", description: '${champs[0].year} champion: "${esc(champs[0].champion)}"', got: result[0] ? result[0].champion : "undefined" },`,
        `    { pass: result[3] && result[3].champion === "${esc(champs[3].champion)}", description: '${champs[3].year} champion: "${esc(champs[3].champion)}"', got: result[3] ? result[3].champion : "undefined" },`,
        '    { pass: result[0] && Object.keys(result[0]).length === 2, description: "Each entry has year and champion", got: result[0] ? Object.keys(result[0]).join(", ") : "undefined" },',
        `    { pass: result[1] && result[1].champion === "${esc(champs[1].champion)}", description: '${champs[1].year} champion: "${esc(champs[1].champion)}"', got: result[1] ? result[1].champion : "undefined" },`,
        '  ];',
      ].join('\n'));
    })()
  },
  {
    id: 1027,
    title: "NBA: MVP History",
    tier: 3,
    category: ["api-data", "nba"],
    tags: ["arrays", "map", "cross-reference", "api-data", "nba"],
    description: "Look up the MVP player name for each season.",
    instructions: "Write a function called `getMVPHistory` that takes the `seasons` array and `players` array, and returns an array of objects with `year` and `mvp` (the player name) for each season.\n\nExample:\n```\ngetMVPHistory(seasons, players)\n// Returns: [{ year: \"2023-24\", mvp: \"Luka Donuts\" }, ...]\n```",
    starterCode: "function getMVPHistory(seasons, players) {\n  \n}",
    solution: "function getMVPHistory(seasons, players) {\n  return seasons.map(s => ({\n    year: s.year,\n    mvp: players.find(p => p.id === s.mvpId).name\n  }));\n}",
    hints: [
      "Use .map() on seasons and .find() on players to look up each MVP by mvpId.",
      "For each season: `{ year: s.year, mvp: players.find(p => p.id === s.mvpId).name }`"
    ],
    resources: [
      { label: "MDN: Array.prototype.map()", url: "/docs/mdn/array-map.html" },
      { label: "MDN: Array.prototype.find()", url: "/docs/mdn/array-find.html" }
    ],
    testRunner: (() => {
      const mvps = SEASONS.map(s => ({
        year: s.year,
        mvp: PLAYERS.find(p => p.id === s.mvpId).name
      }));
      return tr('getMVPHistory', [
        '  const result = fn(seasons, players);',
        '  return [',
        '    { pass: Array.isArray(result) && result.length === 4, description: "Returns 4 season entries", got: Array.isArray(result) ? String(result.length) : typeof result },',
        `    { pass: result[0] && result[0].mvp === "${esc(mvps[0].mvp)}", description: '${mvps[0].year} MVP: "${esc(mvps[0].mvp)}"', got: result[0] ? result[0].mvp : "undefined" },`,
        `    { pass: result[1] && result[1].mvp === "${esc(mvps[1].mvp)}", description: '${mvps[1].year} MVP: "${esc(mvps[1].mvp)}"', got: result[1] ? result[1].mvp : "undefined" },`,
        `    { pass: result[3] && result[3].mvp === "${esc(mvps[3].mvp)}", description: '${mvps[3].year} MVP: "${esc(mvps[3].mvp)}"', got: result[3] ? result[3].mvp : "undefined" },`,
        '    { pass: result[0] && Object.keys(result[0]).length === 2, description: "Each entry has year and mvp", got: result[0] ? Object.keys(result[0]).join(", ") : "undefined" },',
        '  ];',
      ].join('\n'));
    })()
  },
  {
    id: 1028,
    title: "NBA: Best Records",
    tier: 3,
    category: ["api-data", "nba"],
    tags: ["arrays", "sort", "cross-reference", "find", "api-data", "nba"],
    description: "Find the teams with the best records in a given season.",
    instructions: "Write a function called `getBestRecords` that takes the `seasons` array, `teams` array, and a `year` string. Find that season's records, sort by wins descending, and return the top 3 as an array of objects with `team` (name), `wins`, and `losses`.\n\nExample:\n```\ngetBestRecords(seasons, teams, \"2023-24\")\n// Returns: [{ team: \"Boston Shelltics\", wins: 64, losses: 18 }, ...]\n```",
    starterCode: "function getBestRecords(seasons, teams, year) {\n  \n}",
    solution: "function getBestRecords(seasons, teams, year) {\n  const season = seasons.find(s => s.year === year);\n  return [...season.teamRecords]\n    .sort((a, b) => b.wins - a.wins)\n    .slice(0, 3)\n    .map(r => ({\n      team: teams.find(t => t.id === r.teamId).name,\n      wins: r.wins,\n      losses: r.losses\n    }));\n}",
    hints: [
      "Find the season by year, sort its teamRecords by wins descending, slice the top 3, then cross-reference team names.",
      "Chain: find season → sort records copy → slice(0, 3) → map with team name lookup"
    ],
    resources: [
      { label: "MDN: Array.prototype.sort()", url: "/docs/mdn/array-sort.html" },
      { label: "MDN: Array.prototype.find()", url: "/docs/mdn/array-find.html" }
    ],
    testRunner: (() => {
      const s2324 = SEASONS.find(s => s.year === '2023-24');
      const top3_2324 = [...s2324.teamRecords].sort((a, b) => b.wins - a.wins).slice(0, 3)
        .map(r => ({ team: TEAMS.find(t => t.id === r.teamId).name, wins: r.wins, losses: r.losses }));
      const s2021 = SEASONS.find(s => s.year === '2020-21');
      const top1_2021 = [...s2021.teamRecords].sort((a, b) => b.wins - a.wins)[0];
      const top1_2021_name = TEAMS.find(t => t.id === top1_2021.teamId).name;
      return tr('getBestRecords', [
        '  const result = fn(seasons, teams, "2023-24");',
        '  const result2 = fn(seasons, teams, "2020-21");',
        '  return [',
        '    { pass: Array.isArray(result) && result.length === 3, description: "Returns top 3 teams", got: Array.isArray(result) ? String(result.length) : typeof result },',
        `    { pass: result[0] && result[0].team === "${esc(top3_2324[0].team)}", description: 'Best 2023-24 record: "${esc(top3_2324[0].team)}"', got: result[0] ? result[0].team : "undefined" },`,
        `    { pass: result[0] && result[0].wins === ${top3_2324[0].wins}, description: "Best record: ${top3_2324[0].wins} wins", got: result[0] ? String(result[0].wins) : "undefined" },`,
        `    { pass: result[0] && result[0].wins >= result[2].wins, description: "Sorted by wins descending", got: result.map(r => r.wins).join(", ") },`,
        `    { pass: result2[0] && result2[0].team === "${esc(top1_2021_name)}", description: 'Best 2020-21 record: "${esc(top1_2021_name)}"', got: result2[0] ? result2[0].team : "undefined" },`,
        '  ];',
      ].join('\n'));
    })()
  },

  // ── T4 (4 exercises) ──────────────────────────────────────────────────────

  {
    id: 1029,
    title: "NBA: Team Report",
    tier: 4,
    category: ["api-data", "nba"],
    tags: ["arrays", "reduce", "cross-reference", "data-transformation", "api-data", "nba"],
    description: "Build a detailed report for every team using player data.",
    instructions: "Write a function called `buildTeamReport` that takes the `players` and `teams` arrays and returns an array of report objects (one per team) with:\n- `name`: team name\n- `roster`: sorted array of player names on the team\n- `totalSalary`: sum of all player salaries\n- `avgPPG`: average points per game across roster (rounded to 1 decimal), or `0` if no players\n- `allStarCount`: number of All-Star players\n\nExample:\n```\nbuildTeamReport(players, teams)\n// Returns: [{ name: \"Los Angeles Fakers\", roster: [...], totalSalary: 97440000, avgPPG: 25.3, allStarCount: 3 }, ...]\n```",
    starterCode: "",
    solution: "function buildTeamReport(players, teams) {\n  return teams.map(t => {\n    const roster = players.filter(p => p.teamId === t.id);\n    const totalSalary = roster.reduce((sum, p) => sum + p.salary, 0);\n    const avgPPG = roster.length > 0\n      ? Math.round(roster.reduce((sum, p) => sum + p.stats.ppg, 0) / roster.length * 10) / 10\n      : 0;\n    return {\n      name: t.name,\n      roster: roster.map(p => p.name).sort(),\n      totalSalary,\n      avgPPG,\n      allStarCount: roster.filter(p => p.isAllStar).length\n    };\n  });\n}",
    hints: [
      "Map each team: filter players by teamId, then compute salary sum with reduce, average ppg, and count All-Stars.",
      "For avgPPG, sum ppg values with reduce, divide by roster length, and round: `Math.round(avg * 10) / 10`"
    ],
    resources: [
      { label: "MDN: Array.prototype.reduce()", url: "/docs/mdn/array-reduce.html" },
      { label: "MDN: Array.prototype.filter()", url: "/docs/mdn/array-filter.html" }
    ],
    testRunner: (() => {
      const reports = TEAMS.map(t => {
        const roster = PLAYERS.filter(p => p.teamId === t.id);
        const totalSalary = roster.reduce((sum, p) => sum + p.salary, 0);
        const avgPPG = roster.length > 0
          ? Math.round(roster.reduce((sum, p) => sum + p.stats.ppg, 0) / roster.length * 10) / 10
          : 0;
        return {
          name: t.name,
          roster: roster.map(p => p.name).sort(),
          totalSalary,
          avgPPG,
          allStarCount: roster.filter(p => p.isAllStar).length
        };
      });
      const laf = reports[0]; // LA Fakers
      const mil = reports.find(r => r.name === 'Milwaukee Ducks');
      return tr('buildTeamReport', [
        '  const result = fn(players, teams);',
        '  return [',
        '    { pass: Array.isArray(result) && result.length === 8, description: "Returns 8 team reports", got: Array.isArray(result) ? String(result.length) : typeof result },',
        `    { pass: result[0] && result[0].name === "${esc(laf.name)}", description: 'First team: "${esc(laf.name)}"', got: result[0] ? result[0].name : "undefined" },`,
        `    { pass: result[0] && result[0].totalSalary === ${laf.totalSalary}, description: "${esc(laf.name)} total salary: $${(laf.totalSalary / 1000000).toFixed(1)}M", got: result[0] ? String(result[0].totalSalary) : "undefined" },`,
        `    { pass: result[0] && result[0].avgPPG === ${laf.avgPPG}, description: "${esc(laf.name)} avg PPG: ${laf.avgPPG}", got: result[0] ? String(result[0].avgPPG) : "undefined" },`,
        `    { pass: result[0] && result[0].allStarCount === ${laf.allStarCount}, description: "${esc(laf.name)} has ${laf.allStarCount} All-Stars", got: result[0] ? String(result[0].allStarCount) : "undefined" },`,
        `    { pass: result[0] && Array.isArray(result[0].roster) && result[0].roster.length === ${laf.roster.length}, description: "${esc(laf.name)} roster has ${laf.roster.length} players", got: result[0] ? String(result[0].roster.length) : "undefined" },`,
        `    { pass: result[0] && result[0].roster[0] < result[0].roster[result[0].roster.length - 1], description: "Roster is sorted alphabetically", got: result[0] ? result[0].roster.join(", ") : "undefined" },`,
        '  ];',
      ].join('\n'));
    })()
  },
  {
    id: 1030,
    title: "NBA: Season Summary",
    tier: 4,
    category: ["api-data", "nba"],
    tags: ["arrays", "map", "cross-reference", "data-transformation", "api-data", "nba"],
    description: "Build a summary for each season using all three datasets.",
    instructions: "Write a function called `buildSeasonSummary` that takes the `players`, `teams`, and `seasons` arrays. Return an array of summary objects (one per season) with:\n- `year`: the season year string\n- `mvp`: the MVP player's name (look up via `mvpId`)\n- `champion`: the champion team's name (look up via `championId`)\n- `bestRecord`: object with `team` (name), `wins`, `losses` for the team with the most wins\n- `worstRecord`: object with `team` (name), `wins`, `losses` for the team with the fewest wins\n\nExample:\n```\nbuildSeasonSummary(players, teams, seasons)\n// Returns: [{ year: \"2023-24\", mvp: \"Luka Donuts\", champion: \"Boston Shelltics\", bestRecord: {...}, worstRecord: {...} }, ...]\n```",
    starterCode: "",
    solution: "function buildSeasonSummary(players, teams, seasons) {\n  return seasons.map(s => {\n    const sorted = [...s.teamRecords].sort((a, b) => b.wins - a.wins);\n    const best = sorted[0];\n    const worst = sorted[sorted.length - 1];\n    return {\n      year: s.year,\n      mvp: players.find(p => p.id === s.mvpId).name,\n      champion: teams.find(t => t.id === s.championId).name,\n      bestRecord: { team: teams.find(t => t.id === best.teamId).name, wins: best.wins, losses: best.losses },\n      worstRecord: { team: teams.find(t => t.id === worst.teamId).name, wins: worst.wins, losses: worst.losses }\n    };\n  });\n}",
    hints: [
      "For each season: look up MVP player name, champion team name, sort teamRecords by wins to find best and worst.",
      "Use .find() to cross-reference IDs to names. Sort a copy of teamRecords to get best (first) and worst (last)."
    ],
    resources: [
      { label: "MDN: Array.prototype.find()", url: "/docs/mdn/array-find.html" },
      { label: "MDN: Array.prototype.sort()", url: "/docs/mdn/array-sort.html" }
    ],
    testRunner: (() => {
      const summaries = SEASONS.map(s => {
        const sorted = [...s.teamRecords].sort((a, b) => b.wins - a.wins);
        const best = sorted[0];
        const worst = sorted[sorted.length - 1];
        return {
          year: s.year,
          mvp: PLAYERS.find(p => p.id === s.mvpId).name,
          champion: TEAMS.find(t => t.id === s.championId).name,
          bestTeam: TEAMS.find(t => t.id === best.teamId).name,
          bestWins: best.wins,
          worstTeam: TEAMS.find(t => t.id === worst.teamId).name,
          worstWins: worst.wins
        };
      });
      const s0 = summaries[0];
      const s3 = summaries[3];
      return tr('buildSeasonSummary', [
        '  const result = fn(players, teams, seasons);',
        '  return [',
        '    { pass: Array.isArray(result) && result.length === 4, description: "Returns 4 season summaries", got: Array.isArray(result) ? String(result.length) : typeof result },',
        `    { pass: result[0] && result[0].mvp === "${esc(s0.mvp)}", description: '${s0.year} MVP: "${esc(s0.mvp)}"', got: result[0] ? result[0].mvp : "undefined" },`,
        `    { pass: result[0] && result[0].champion === "${esc(s0.champion)}", description: '${s0.year} champion: "${esc(s0.champion)}"', got: result[0] ? result[0].champion : "undefined" },`,
        `    { pass: result[0] && result[0].bestRecord && result[0].bestRecord.team === "${esc(s0.bestTeam)}", description: '${s0.year} best record: "${esc(s0.bestTeam)}" (${s0.bestWins} wins)', got: result[0] && result[0].bestRecord ? result[0].bestRecord.team : "undefined" },`,
        `    { pass: result[0] && result[0].worstRecord && result[0].worstRecord.team === "${esc(s0.worstTeam)}", description: '${s0.year} worst record: "${esc(s0.worstTeam)}" (${s0.worstWins} wins)', got: result[0] && result[0].worstRecord ? result[0].worstRecord.team : "undefined" },`,
        `    { pass: result[3] && result[3].mvp === "${esc(s3.mvp)}", description: '${s3.year} MVP: "${esc(s3.mvp)}"', got: result[3] ? result[3].mvp : "undefined" },`,
        `    { pass: result[3] && result[3].champion === "${esc(s3.champion)}", description: '${s3.year} champion: "${esc(s3.champion)}"', got: result[3] ? result[3].champion : "undefined" },`,
        '  ];',
      ].join('\n'));
    })()
  },
  {
    id: 1031,
    title: "NBA: Conference Comparison",
    tier: 4,
    category: ["api-data", "nba"],
    tags: ["arrays", "reduce", "cross-reference", "aggregation", "api-data", "nba"],
    description: "Compare Eastern and Western conferences by aggregating player data.",
    instructions: "Write a function called `conferenceComparison` that takes the `players` and `teams` arrays and returns an object with `Eastern` and `Western` keys. Each value should be:\n- `teams`: number of teams in the conference\n- `players`: number of players\n- `totalSalary`: sum of all player salaries\n- `avgPPG`: average ppg across all players (rounded to 1 decimal)\n- `allStars`: number of All-Star players\n\nExample:\n```\nconferenceComparison(players, teams)\n// Returns: { Eastern: { teams: 5, players: 7, ... }, Western: { teams: 3, players: 5, ... } }\n```",
    starterCode: "",
    solution: "function conferenceComparison(players, teams) {\n  const result = {};\n  ['Eastern', 'Western'].forEach(conf => {\n    const confTeams = teams.filter(t => t.conference === conf);\n    const confTeamIds = confTeams.map(t => t.id);\n    const confPlayers = players.filter(p => confTeamIds.includes(p.teamId));\n    result[conf] = {\n      teams: confTeams.length,\n      players: confPlayers.length,\n      totalSalary: confPlayers.reduce((sum, p) => sum + p.salary, 0),\n      avgPPG: Math.round(confPlayers.reduce((sum, p) => sum + p.stats.ppg, 0) / confPlayers.length * 10) / 10,\n      allStars: confPlayers.filter(p => p.isAllStar).length\n    };\n  });\n  return result;\n}",
    hints: [
      "For each conference: filter teams, get their IDs, filter players by those IDs, then aggregate salary/ppg/allStars.",
      "Loop over ['Eastern', 'Western'] and build each conference object with reduce for totals and filter for counts."
    ],
    resources: [
      { label: "MDN: Array.prototype.reduce()", url: "/docs/mdn/array-reduce.html" },
      { label: "MDN: Array.prototype.filter()", url: "/docs/mdn/array-filter.html" }
    ],
    testRunner: (() => {
      const buildConf = (conf) => {
        const confTeams = TEAMS.filter(t => t.conference === conf);
        const confTeamIds = confTeams.map(t => t.id);
        const confPlayers = PLAYERS.filter(p => confTeamIds.includes(p.teamId));
        return {
          teams: confTeams.length,
          players: confPlayers.length,
          totalSalary: confPlayers.reduce((sum, p) => sum + p.salary, 0),
          avgPPG: Math.round(confPlayers.reduce((sum, p) => sum + p.stats.ppg, 0) / confPlayers.length * 10) / 10,
          allStars: confPlayers.filter(p => p.isAllStar).length
        };
      };
      const east = buildConf('Eastern');
      const west = buildConf('Western');
      return tr('conferenceComparison', [
        '  const result = fn(players, teams);',
        '  return [',
        '    { pass: result && result.Eastern && result.Western, description: "Returns Eastern and Western keys", got: result ? Object.keys(result).join(", ") : typeof result },',
        `    { pass: result.Eastern && result.Eastern.teams === ${east.teams}, description: "Eastern has ${east.teams} teams", got: result.Eastern ? String(result.Eastern.teams) : "undefined" },`,
        `    { pass: result.Western && result.Western.players === ${west.players}, description: "Western has ${west.players} players", got: result.Western ? String(result.Western.players) : "undefined" },`,
        `    { pass: result.Eastern && result.Eastern.totalSalary === ${east.totalSalary}, description: "Eastern total salary: $${(east.totalSalary / 1000000).toFixed(1)}M", got: result.Eastern ? String(result.Eastern.totalSalary) : "undefined" },`,
        `    { pass: result.Western && result.Western.avgPPG === ${west.avgPPG}, description: "Western avg PPG: ${west.avgPPG}", got: result.Western ? String(result.Western.avgPPG) : "undefined" },`,
        `    { pass: result.Eastern && result.Eastern.allStars === ${east.allStars}, description: "Eastern has ${east.allStars} All-Stars", got: result.Eastern ? String(result.Eastern.allStars) : "undefined" },`,
        `    { pass: result.Eastern && result.Eastern.players + result.Western.players === 12, description: "All 12 players accounted for", got: result.Eastern ? String(result.Eastern.players + result.Western.players) : "undefined" },`,
        '  ];',
      ].join('\n'));
    })()
  },
  {
    id: 1032,
    title: "NBA: Full League Database",
    tier: 4,
    category: ["api-data", "nba"],
    tags: ["arrays", "reduce", "cross-reference", "data-transformation", "aggregation", "api-data", "nba"],
    description: "Build a comprehensive league database from all three datasets.",
    instructions: "Create a function called `leagueDatabase` that takes the `players`, `teams`, and `seasons` arrays and returns an object with:\n- `totalPlayers`: number of players\n- `totalTeams`: number of teams\n- `totalSeasons`: number of seasons\n- `highestPaid`: `{ name, salary }` of the highest-paid player\n- `topScorer`: `{ name, ppg }` of the player with the highest ppg\n- `avgSalary`: average salary rounded to the nearest integer\n- `positionBreakdown`: object mapping each position to its player count (e.g., `{ PG: 3, SG: 2, ... }`)\n- `dynastyTeam`: `{ name, championships }` of the team with the most championships\n\nExample:\n```\nleagueDatabase(players, teams, seasons)\n// Returns: { totalPlayers: 12, totalTeams: 8, ... }\n```",
    starterCode: "",
    solution: "function leagueDatabase(players, teams, seasons) {\n  const highestPaid = players.reduce((h, p) => p.salary > h.salary ? p : h);\n  const topScorer = players.reduce((t, p) => p.stats.ppg > t.stats.ppg ? p : t);\n  const avgSalary = Math.round(players.reduce((sum, p) => sum + p.salary, 0) / players.length);\n  const positionBreakdown = {};\n  players.forEach(p => { positionBreakdown[p.position] = (positionBreakdown[p.position] || 0) + 1; });\n  const dynastyTeam = teams.reduce((d, t) => t.championships > d.championships ? t : d);\n  return {\n    totalPlayers: players.length,\n    totalTeams: teams.length,\n    totalSeasons: seasons.length,\n    highestPaid: { name: highestPaid.name, salary: highestPaid.salary },\n    topScorer: { name: topScorer.name, ppg: topScorer.stats.ppg },\n    avgSalary,\n    positionBreakdown,\n    dynastyTeam: { name: dynastyTeam.name, championships: dynastyTeam.championships }\n  };\n}",
    hints: [
      "Break into parts: use .reduce() to find highest paid, top scorer, and dynasty team. Use forEach to build position counts.",
      "For avgSalary, sum all salaries with reduce, divide by player count, and round with Math.round()."
    ],
    resources: [{ label: "MDN: Array.prototype.reduce()", url: "/docs/mdn/array-reduce.html" }],
    testRunner: (() => {
      const highestPaid = PLAYERS.reduce((h, p) => p.salary > h.salary ? p : h);
      const topScorer = PLAYERS.reduce((t, p) => p.stats.ppg > t.stats.ppg ? p : t);
      const avgSalary = Math.round(PLAYERS.reduce((sum, p) => sum + p.salary, 0) / PLAYERS.length);
      const posBrkdn = {};
      PLAYERS.forEach(p => { posBrkdn[p.position] = (posBrkdn[p.position] || 0) + 1; });
      const dynastyTeam = TEAMS.reduce((d, t) => t.championships > d.championships ? t : d);
      return tr('leagueDatabase', [
        '  const result = fn(players, teams, seasons);',
        '  return [',
        '    { pass: typeof result === "object" && !Array.isArray(result), description: "Returns an object", got: typeof result },',
        '    { pass: result.totalPlayers === 12 && result.totalTeams === 8 && result.totalSeasons === 4, description: "Correct totals: 12 players, 8 teams, 4 seasons", got: "players: " + result.totalPlayers + ", teams: " + result.totalTeams + ", seasons: " + result.totalSeasons },',
        `    { pass: result.highestPaid && result.highestPaid.name === "${esc(highestPaid.name)}", description: 'Highest paid: "${esc(highestPaid.name)}" ($${(highestPaid.salary / 1000000).toFixed(1)}M)', got: result.highestPaid ? result.highestPaid.name : "undefined" },`,
        `    { pass: result.topScorer && result.topScorer.name === "${esc(topScorer.name)}", description: 'Top scorer: "${esc(topScorer.name)}" (${topScorer.stats.ppg} ppg)', got: result.topScorer ? result.topScorer.name : "undefined" },`,
        `    { pass: result.avgSalary === ${avgSalary}, description: "Average salary: $${(avgSalary / 1000000).toFixed(1)}M", got: String(result.avgSalary) },`,
        `    { pass: result.positionBreakdown && result.positionBreakdown.PG === ${posBrkdn.PG}, description: "${posBrkdn.PG} point guards", got: result.positionBreakdown ? String(result.positionBreakdown.PG) : "undefined" },`,
        `    { pass: result.dynastyTeam && result.dynastyTeam.name === "${esc(dynastyTeam.name)}", description: 'Dynasty team: "${esc(dynastyTeam.name)}" (${dynastyTeam.championships} titles)', got: result.dynastyTeam ? result.dynastyTeam.name : "undefined" },`,
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

console.log(`\nPop Culture APIs — NBA Theme 🏀`);
console.log(`================================`);
console.log(`  Exercises: ${exercises.length}`);
console.log(`  T2: ${exercises.filter(e => e.tier === 2).length}`);
console.log(`  T3: ${exercises.filter(e => e.tier === 3).length}`);
console.log(`  T4: ${exercises.filter(e => e.tier === 4).length}`);
console.log(`  ID range: ${exercises[0].id}–${exercises[exercises.length - 1].id}`);
console.log(`  Players: ${PLAYERS.length}, Teams: ${TEAMS.length}, Seasons: ${SEASONS.length}`);
console.log(`  Appended to: ${outPath}`);
console.log(`  Total collection exercises: ${existing.exercises.length}`);
