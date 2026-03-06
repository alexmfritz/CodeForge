/**
 * Generates the Video Games theme exercises for the Pop Culture APIs collection.
 * Run: node exercises/collections/_generate_videogames.js
 * Reads existing pop-culture-apis.json and appends Video Games exercises.
 */

const fs = require('fs');
const path = require('path');

// ── Platform Dataset (6 platforms) ──────────────────────────────────────────

const PLATFORMS = [
  {
    id: 1,
    name: "GameStation 5",
    manufacturer: "Sonny",
    generation: 9,
    releaseYear: 2020,
    type: "console",
    unitsSold: 61000000,
    storeName: "GameStation Store"
  },
  {
    id: 2,
    name: "X-Bocks Series X",
    manufacturer: "Megasoft",
    generation: 9,
    releaseYear: 2020,
    type: "console",
    unitsSold: 28000000,
    storeName: "Megasoft Store"
  },
  {
    id: 3,
    name: "Nintendoh Stitch",
    manufacturer: "Nintendoh",
    generation: 8,
    releaseYear: 2017,
    type: "hybrid",
    unitsSold: 146000000,
    storeName: "eShelf"
  },
  {
    id: 4,
    name: "PC",
    manufacturer: "Various",
    generation: null,
    releaseYear: null,
    type: "pc",
    unitsSold: null,
    storeName: "Vapor"
  },
  {
    id: 5,
    name: "GameStation 4",
    manufacturer: "Sonny",
    generation: 8,
    releaseYear: 2013,
    type: "console",
    unitsSold: 117000000,
    storeName: "GameStation Store"
  },
  {
    id: 6,
    name: "X-Bocks One",
    manufacturer: "Megasoft",
    generation: 8,
    releaseYear: 2013,
    type: "console",
    unitsSold: 51000000,
    storeName: "Megasoft Store"
  }
];

// ── Game Dataset (12 games) ─────────────────────────────────────────────────

const GAMES = [
  {
    id: 1,
    title: "Clair Absurd: Expedition 33⅓",
    year: 2025,
    genres: ["rpg", "turn-based"],
    developer: "Sandfall Inactive",
    publisher: "Kodan Flimsy",
    platformIds: [1, 2, 4],
    ratings: { metacritic: 92, userScore: 9.1, opencritic: 91 },
    players: { total: 4200000, concurrent: 185000, peak: 320000 },
    modes: ["single-player"],
    hasMultiplayer: false,
    dlcCount: 0,
    awards: { gameAwards: 9, bafta: 0, diceAwards: 0 },
    playtime: { mainStory: 40, completionist: 78 }
  },
  {
    id: 2,
    title: "Balder's Gate 3",
    year: 2023,
    genres: ["rpg", "strategy", "adventure"],
    developer: "Lithuanian Studios",
    publisher: "Lithuanian Studios",
    platformIds: [1, 2, 4],
    ratings: { metacritic: 96, userScore: 9.0, opencritic: 97 },
    players: { total: 20000000, concurrent: 814000, peak: 875000 },
    modes: ["single-player", "co-op", "multiplayer"],
    hasMultiplayer: true,
    dlcCount: 1,
    awards: { gameAwards: 6, bafta: 5, diceAwards: 4 },
    playtime: { mainStory: 55, completionist: 142 }
  },
  {
    id: 3,
    title: "Elbow Ring",
    year: 2022,
    genres: ["action", "rpg", "open-world"],
    developer: "FromSaucepan",
    publisher: "Blandai Nameco",
    platformIds: [1, 2, 4, 5, 6],
    ratings: { metacritic: 96, userScore: 7.8, opencritic: 95 },
    players: { total: 30000000, concurrent: 764000, peak: 953000 },
    modes: ["single-player", "co-op"],
    hasMultiplayer: true,
    dlcCount: 1,
    awards: { gameAwards: 4, bafta: 2, diceAwards: 3 },
    playtime: { mainStory: 58, completionist: 133 }
  },
  {
    id: 4,
    title: "Cod of War: Ragnasnork",
    year: 2022,
    genres: ["action", "adventure"],
    developer: "Santa Monocle Studio",
    publisher: "Sonny Interactive Entertain-mint",
    platformIds: [1, 4, 5],
    ratings: { metacritic: 94, userScore: 8.9, opencritic: 93 },
    players: { total: 15000000, concurrent: 112000, peak: 280000 },
    modes: ["single-player"],
    hasMultiplayer: false,
    dlcCount: 1,
    awards: { gameAwards: 3, bafta: 3, diceAwards: 2 },
    playtime: { mainStory: 26, completionist: 67 }
  },
  {
    id: 5,
    title: "The Legend of Celda: Tears of the Boredom",
    year: 2023,
    genres: ["action", "adventure", "open-world"],
    developer: "Nintendoh EPD",
    publisher: "Nintendoh",
    platformIds: [3],
    ratings: { metacritic: 96, userScore: 8.5, opencritic: 96 },
    players: { total: 21000000, concurrent: null, peak: null },
    modes: ["single-player"],
    hasMultiplayer: false,
    dlcCount: 2,
    awards: { gameAwards: 3, bafta: 4, diceAwards: 3 },
    playtime: { mainStory: 52, completionist: 189 }
  },
  {
    id: 6,
    title: "Cyberpunked 2078",
    year: 2020,
    genres: ["rpg", "action", "open-world"],
    developer: "CD Projekt Bread",
    publisher: "CD Projekt Bread",
    platformIds: [1, 2, 4, 5, 6],
    ratings: { metacritic: 86, userScore: 7.1, opencritic: 82 },
    players: { total: 35000000, concurrent: 283000, peak: 1054000 },
    modes: ["single-player"],
    hasMultiplayer: false,
    dlcCount: 2,
    awards: { gameAwards: 0, bafta: 0, diceAwards: 0 },
    playtime: { mainStory: 24, completionist: 103 }
  },
  {
    id: 7,
    title: "Red Fed Redemption 2",
    year: 2018,
    genres: ["action", "adventure", "open-world"],
    developer: "Rockstar Lames",
    publisher: "Rockstar Lames",
    platformIds: [1, 4, 5, 6],
    ratings: { metacritic: 97, userScore: 8.4, opencritic: 92 },
    players: { total: 65000000, concurrent: 98000, peak: 230000 },
    modes: ["single-player", "multiplayer"],
    hasMultiplayer: true,
    dlcCount: 0,
    awards: { gameAwards: 4, bafta: 5, diceAwards: 2 },
    playtime: { mainStory: 50, completionist: 184 }
  },
  {
    id: 8,
    title: "Grand Theft Avocado V",
    year: 2013,
    genres: ["action", "adventure", "open-world"],
    developer: "Rockstar Lames",
    publisher: "Rockstar Lames",
    platformIds: [1, 2, 4, 5, 6],
    ratings: { metacritic: 97, userScore: 8.3, opencritic: null },
    players: { total: 200000000, concurrent: 350000, peak: 820000 },
    modes: ["single-player", "multiplayer"],
    hasMultiplayer: true,
    dlcCount: 0,
    awards: { gameAwards: 1, bafta: 3, diceAwards: 1 },
    playtime: { mainStory: 31, completionist: 83 }
  },
  {
    id: 9,
    title: "Mineshaft",
    year: 2011,
    genres: ["sandbox", "survival", "adventure"],
    developer: "Mojangle Studios",
    publisher: "Megasoft",
    platformIds: [1, 2, 3, 4, 5, 6],
    ratings: { metacritic: 93, userScore: 8.0, opencritic: null },
    players: { total: 300000000, concurrent: 2400000, peak: 3500000 },
    modes: ["single-player", "multiplayer", "co-op"],
    hasMultiplayer: true,
    dlcCount: 0,
    awards: { gameAwards: 1, bafta: 1, diceAwards: 1 },
    playtime: { mainStory: 90, completionist: 420 }
  },
  {
    id: 10,
    title: "Fork Knife",
    year: 2017,
    genres: ["battle-royale", "shooter", "sandbox"],
    developer: "Epic Lames",
    publisher: "Epic Lames",
    platformIds: [1, 2, 3, 4, 5, 6],
    ratings: { metacritic: 81, userScore: 3.5, opencritic: 80 },
    players: { total: 400000000, concurrent: 5100000, peak: 10800000 },
    modes: ["multiplayer", "battle-royale", "co-op"],
    hasMultiplayer: true,
    dlcCount: 0,
    awards: { gameAwards: 2, bafta: 1, diceAwards: 0 },
    playtime: { mainStory: null, completionist: null }
  },
  {
    id: 11,
    title: "Astro Botch",
    year: 2024,
    genres: ["platformer", "adventure"],
    developer: "Cream Asobi",
    publisher: "Sonny Interactive Entertain-mint",
    platformIds: [1],
    ratings: { metacritic: 94, userScore: 9.0, opencritic: 94 },
    players: { total: 3500000, concurrent: 42000, peak: 85000 },
    modes: ["single-player"],
    hasMultiplayer: false,
    dlcCount: 0,
    awards: { gameAwards: 4, bafta: 3, diceAwards: 2 },
    playtime: { mainStory: 12, completionist: 25 }
  },
  {
    id: 12,
    title: "Frogwarts Legacy",
    year: 2023,
    genres: ["rpg", "action", "open-world"],
    developer: "Avalunch Software",
    publisher: "Warner Bruhs Lames",
    platformIds: [1, 2, 3, 4, 5],
    ratings: { metacritic: 84, userScore: 8.4, opencritic: 85 },
    players: { total: 24000000, concurrent: 879000, peak: 879000 },
    modes: ["single-player"],
    hasMultiplayer: false,
    dlcCount: 1,
    awards: { gameAwards: 0, bafta: 0, diceAwards: 0 },
    playtime: { mainStory: 26, completionist: 73 }
  }
];

// ── Format datasets as readable JS for Dataset tab ──────────────────────────

function formatDatasetDisplay() {
  const lines = [];

  // Platforms
  lines.push('const platforms = [');
  PLATFORMS.forEach((p, i) => {
    lines.push('  {');
    lines.push(`    id: ${p.id},`);
    lines.push(`    name: "${p.name}",`);
    lines.push(`    manufacturer: "${p.manufacturer}",`);
    lines.push(`    generation: ${p.generation},`);
    lines.push(`    releaseYear: ${p.releaseYear},`);
    lines.push(`    type: "${p.type}",`);
    lines.push(`    unitsSold: ${p.unitsSold},`);
    lines.push(`    storeName: "${p.storeName}"`);
    lines.push(`  }${i < PLATFORMS.length - 1 ? ',' : ''}`);
  });
  lines.push('];');
  lines.push('');

  // Games
  lines.push('const games = [');
  GAMES.forEach((g, i) => {
    lines.push('  {');
    lines.push(`    id: ${g.id},`);
    lines.push(`    title: "${g.title}",`);
    lines.push(`    year: ${g.year},`);
    lines.push(`    genres: ${JSON.stringify(g.genres)},`);
    lines.push(`    developer: "${g.developer}",`);
    lines.push(`    publisher: "${g.publisher}",`);
    lines.push(`    platformIds: ${JSON.stringify(g.platformIds)},`);
    lines.push(`    ratings: { metacritic: ${g.ratings.metacritic}, userScore: ${g.ratings.userScore}, opencritic: ${g.ratings.opencritic} },`);
    lines.push(`    players: { total: ${g.players.total}, concurrent: ${g.players.concurrent}, peak: ${g.players.peak} },`);
    lines.push(`    modes: ${JSON.stringify(g.modes)},`);
    lines.push(`    hasMultiplayer: ${g.hasMultiplayer},`);
    lines.push(`    dlcCount: ${g.dlcCount},`);
    lines.push(`    awards: { gameAwards: ${g.awards.gameAwards}, bafta: ${g.awards.bafta}, diceAwards: ${g.awards.diceAwards} },`);
    lines.push(`    playtime: { mainStory: ${g.playtime.mainStory}, completionist: ${g.playtime.completionist} }`);
    lines.push(`  }${i < GAMES.length - 1 ? ',' : ''}`);
  });
  lines.push('];');

  return lines.join('\n');
}

const DATASET_DISPLAY = formatDatasetDisplay();
const PLATFORMS_JSON = JSON.stringify(PLATFORMS);
const GAMES_JSON = JSON.stringify(GAMES);

// ── Helper: build testRunner string ─────────────────────────────────────────

// Escape single quotes for embedding in single-quoted JS strings
function esc(str) { return String(str).replace(/'/g, "\\'"); }

function tr(fnName, testBody) {
  return `(code) => {\n  const platforms = ${PLATFORMS_JSON};\n  const games = ${GAMES_JSON};\n  const fn = new Function(code + '; return ${fnName};')();\n${testBody}\n}`;
}

// ── Exercise definitions ────────────────────────────────────────────────────

const exercises = [

  // ── T2 (6 exercises) ──────────────────────────────────────────────────────
  {
    id: 966,
    title: "Video Games: Get All Titles",
    tier: 2,
    category: ["api-data", "video-games"],
    tags: ["arrays", "map", "api-data", "video-games"],
    description: "Extract all game titles from the dataset using the map method.",
    instructions: "Write a function called `getGameTitles` that takes an array of game objects and returns an array of their titles.\n\nEach game has a `title` property (string).\n\nExample:\n```\ngetGameTitles(games)\n// Returns: [\"Clair Absurd: Expedition 33⅓\", \"Balder's Gate 3\", ...]\n```",
    starterCode: "// Return an array of all game titles\nfunction getGameTitles(games) {\n  \n}",
    solution: "function getGameTitles(games) {\n  return games.map(game => game.title);\n}",
    hints: [
      "Use .map() to transform each game object into just the title property.",
      "The callback receives each game: `game => game.title`"
    ],
    resources: [{ label: "MDN: Array.prototype.map()", url: "/docs/mdn/array-map.html" }],
    testRunner: tr('getGameTitles', [
      '  const result = fn(games);',
      '  return [',
      '    { pass: Array.isArray(result), description: "Returns an array", got: typeof result },',
      '    { pass: result.length === 12, description: "Returns 12 game titles", got: String(result.length) },',
      '    { pass: result[0] === "Clair Absurd: Expedition 33⅓", description: \'First title is "Clair Absurd: Expedition 33⅓"\', got: String(result[0]) },',
      '    { pass: result.includes("Balder\\\'s Gate 3"), description: \'Includes "Balder\\\'s Gate 3"\', got: String(result.includes("Balder\\\'s Gate 3")) },',
      '    { pass: result.includes("Fork Knife"), description: \'Includes "Fork Knife"\', got: String(result.includes("Fork Knife")) },',
      '  ];',
    ].join('\n'))
  },
  {
    id: 967,
    title: "Video Games: Filter Multiplayer",
    tier: 2,
    category: ["api-data", "video-games"],
    tags: ["arrays", "filter", "api-data", "video-games"],
    description: "Filter to only games that support multiplayer.",
    instructions: "Write a function called `getMultiplayerGames` that takes an array of game objects and returns only those where `hasMultiplayer` is `true`.\n\nExample:\n```\ngetMultiplayerGames(games)\n// Returns: [{ title: \"Balder's Gate 3\", ... }, { title: \"Elbow Ring\", ... }, ...]\n```",
    starterCode: "// Return only games with multiplayer\nfunction getMultiplayerGames(games) {\n  \n}",
    solution: "function getMultiplayerGames(games) {\n  return games.filter(game => game.hasMultiplayer);\n}",
    hints: [
      "Use .filter() to create a new array with only elements that pass a test.",
      "The boolean property itself works as the condition: `game => game.hasMultiplayer`"
    ],
    resources: [{ label: "MDN: Array.prototype.filter()", url: "/docs/mdn/array-filter.html" }],
    testRunner: (() => {
      const mpCount = GAMES.filter(g => g.hasMultiplayer).length;
      return tr('getMultiplayerGames', [
        '  const result = fn(games);',
        '  return [',
        '    { pass: Array.isArray(result), description: "Returns an array", got: typeof result },',
        `    { pass: result.length === ${mpCount}, description: "${mpCount} games have multiplayer", got: String(result.length) },`,
        '    { pass: result.every(g => g.hasMultiplayer === true), description: "All returned games have hasMultiplayer: true", got: String(result.every(g => g.hasMultiplayer)) },',
        '    { pass: !result.find(g => g.title === "Clair Absurd: Expedition 33⅓"), description: "Does not include single-player-only Clair Absurd", got: String(!result.find(g => g.title === "Clair Absurd: Expedition 33⅓")) },',
        '  ];',
      ].join('\n'));
    })()
  },
  {
    id: 968,
    title: "Video Games: Get Platform Names",
    tier: 2,
    category: ["api-data", "video-games"],
    tags: ["arrays", "map", "api-data", "video-games"],
    description: "Extract all platform names from the platforms dataset.",
    instructions: "Write a function called `getPlatformNames` that takes an array of platform objects and returns an array of their names.\n\nExample:\n```\ngetPlatformNames(platforms)\n// Returns: [\"GameStation 5\", \"X-Bocks Series X\", ...]\n```",
    starterCode: "// Return an array of all platform names\nfunction getPlatformNames(platforms) {\n  \n}",
    solution: "function getPlatformNames(platforms) {\n  return platforms.map(p => p.name);\n}",
    hints: [
      "Use .map() to transform each platform object into just the name property.",
      "The callback is: `platform => platform.name`"
    ],
    resources: [{ label: "MDN: Array.prototype.map()", url: "/docs/mdn/array-map.html" }],
    testRunner: tr('getPlatformNames', [
      '  const result = fn(platforms);',
      '  return [',
      '    { pass: Array.isArray(result), description: "Returns an array", got: typeof result },',
      '    { pass: result.length === 6, description: "Returns 6 platform names", got: String(result.length) },',
      '    { pass: result[0] === "GameStation 5", description: \'First platform is "GameStation 5"\', got: String(result[0]) },',
      '    { pass: result.includes("PC"), description: \'Includes "PC"\', got: String(result.includes("PC")) },',
      '    { pass: result.includes("Nintendoh Stitch"), description: \'Includes "Nintendoh Stitch"\', got: String(result.includes("Nintendoh Stitch")) },',
      '  ];',
    ].join('\n'))
  },
  {
    id: 969,
    title: "Video Games: Get Metacritic Scores",
    tier: 2,
    category: ["api-data", "video-games"],
    tags: ["arrays", "map", "nested-access", "api-data", "video-games"],
    description: "Extract Metacritic scores from nested rating objects.",
    instructions: "Write a function called `getMetacriticScores` that takes an array of game objects and returns an array of objects with `title` and `metacritic` properties.\n\nEach game has a `ratings` object with a `metacritic` property.\n\nExample:\n```\ngetMetacriticScores(games)\n// Returns: [{ title: \"Clair Absurd: Expedition 33⅓\", metacritic: 92 }, ...]\n```",
    starterCode: "// Return an array of { title, metacritic } objects\nfunction getMetacriticScores(games) {\n  \n}",
    solution: "function getMetacriticScores(games) {\n  return games.map(game => ({ title: game.title, metacritic: game.ratings.metacritic }));\n}",
    hints: [
      "Use .map() to transform each game into a new object with just the title and metacritic properties.",
      "Return an object literal from the arrow function using parentheses: `game => ({ title: game.title, metacritic: game.ratings.metacritic })`"
    ],
    resources: [{ label: "MDN: Array.prototype.map()", url: "/docs/mdn/array-map.html" }],
    testRunner: tr('getMetacriticScores', [
      '  const result = fn(games);',
      '  return [',
      '    { pass: Array.isArray(result), description: "Returns an array", got: typeof result },',
      '    { pass: result.length === 12, description: "Returns 12 entries", got: String(result.length) },',
      '    { pass: result[0] && result[0].title === "Clair Absurd: Expedition 33⅓" && result[0].metacritic === 92, description: "First entry has correct title and score", got: JSON.stringify(result[0]) },',
      '    { pass: result[0] && Object.keys(result[0]).length === 2, description: "Each entry has exactly 2 properties", got: result[0] ? String(Object.keys(result[0]).length) : "undefined" },',
      '    { pass: result[1] && result[1].metacritic === 96, description: "Balder\\\'s Gate 3 has metacritic 96", got: result[1] ? String(result[1].metacritic) : "undefined" },',
      '  ];',
    ].join('\n'))
  },
  {
    id: 970,
    title: "Video Games: Filter by Genre",
    tier: 2,
    category: ["api-data", "video-games"],
    tags: ["arrays", "filter", "includes", "api-data", "video-games"],
    description: "Filter games that belong to a specific genre.",
    instructions: "Write a function called `filterByGenre` that takes an array of game objects and a genre string, and returns games whose `genres` array includes that genre.\n\nExample:\n```\nfilterByGenre(games, \"rpg\")\n// Returns games with \"rpg\" in their genres array\n```",
    starterCode: "// Return all games that include the given genre\nfunction filterByGenre(games, genre) {\n  \n}",
    solution: "function filterByGenre(games, genre) {\n  return games.filter(game => game.genres.includes(genre));\n}",
    hints: [
      "Use .filter() to keep only games whose genres array contains the target genre.",
      "The .includes() method checks if an array contains a value: `game.genres.includes(genre)`"
    ],
    resources: [
      { label: "MDN: Array.prototype.filter()", url: "/docs/mdn/array-filter.html" },
      { label: "MDN: Array.prototype.includes()", url: "/docs/mdn/array-includes.html" }
    ],
    testRunner: (() => {
      const rpgCount = GAMES.filter(g => g.genres.includes('rpg')).length;
      const owCount = GAMES.filter(g => g.genres.includes('open-world')).length;
      return tr('filterByGenre', [
        '  const rpg = fn(games, "rpg");',
        '  const ow = fn(games, "open-world");',
        '  const racing = fn(games, "racing");',
        '  return [',
        '    { pass: Array.isArray(rpg), description: "Returns an array", got: typeof rpg },',
        `    { pass: rpg.length === ${rpgCount}, description: "${rpgCount} games have the rpg genre", got: String(rpg.length) },`,
        `    { pass: ow.length === ${owCount}, description: "${owCount} games have the open-world genre", got: String(ow.length) },`,
        '    { pass: racing.length === 0, description: "0 games have the racing genre", got: String(racing.length) },',
        '    { pass: rpg.every(g => g.genres.includes("rpg")), description: "All returned RPGs have rpg in genres", got: String(rpg.every(g => g.genres.includes("rpg"))) },',
        '  ];',
      ].join('\n'));
    })()
  },
  {
    id: 971,
    title: "Video Games: Filter by Year",
    tier: 2,
    category: ["api-data", "video-games"],
    tags: ["arrays", "filter", "comparison", "api-data", "video-games"],
    description: "Filter games released in or after a given year.",
    instructions: "Write a function called `gamesSince` that takes an array of game objects and a year number, and returns games released in that year or later.\n\nExample:\n```\ngamesSince(games, 2023)\n// Returns games from 2023, 2024, and 2025\n```",
    starterCode: "// Return games released in the given year or later\nfunction gamesSince(games, year) {\n  \n}",
    solution: "function gamesSince(games, year) {\n  return games.filter(game => game.year >= year);\n}",
    hints: [
      "Use .filter() with a comparison on the year property.",
      "The condition checks: `game.year >= year`"
    ],
    resources: [{ label: "MDN: Array.prototype.filter()", url: "/docs/mdn/array-filter.html" }],
    testRunner: (() => {
      const since2023 = GAMES.filter(g => g.year >= 2023).length;
      const since2025 = GAMES.filter(g => g.year >= 2025).length;
      return tr('gamesSince', [
        '  const r1 = fn(games, 2023);',
        '  const r2 = fn(games, 2025);',
        '  const r3 = fn(games, 2030);',
        '  return [',
        '    { pass: Array.isArray(r1), description: "Returns an array", got: typeof r1 },',
        `    { pass: r1.length === ${since2023}, description: "${since2023} games since 2023", got: String(r1.length) },`,
        `    { pass: r2.length === ${since2025}, description: "${since2025} game(s) since 2025", got: String(r2.length) },`,
        '    { pass: r3.length === 0, description: "0 games since 2030", got: String(r3.length) },',
        '    { pass: r1.every(g => g.year >= 2023), description: "All returned games are from 2023+", got: String(r1.every(g => g.year >= 2023)) },',
        '  ];',
      ].join('\n'));
    })()
  },

  // ── T3 (7 exercises) ──────────────────────────────────────────────────────
  {
    id: 972,
    title: "Video Games: Platforms for Game",
    tier: 3,
    category: ["api-data", "video-games"],
    tags: ["arrays", "filter", "cross-reference", "api-data", "video-games"],
    description: "Find all platform names a specific game is available on using cross-referencing.",
    instructions: "Write a function called `getGamePlatforms` that takes the `platforms` array, the `games` array, and a game title string. It should find the game by title, then return an array of platform name strings by matching the game's `platformIds` against platform `id` values.\n\nReturn an empty array if the game is not found.\n\nExample:\n```\ngetGamePlatforms(platforms, games, \"Astro Botch\")\n// Returns: [\"GameStation 5\"]\n```",
    starterCode: "/**\n * @param {Object[]} platforms - Array of platform objects\n * @param {Object[]} games - Array of game objects\n * @param {string} title - Title of the game\n * @returns {string[]} Platform names the game is available on\n */\nfunction getGamePlatforms(platforms, games, title) {\n  \n}",
    solution: "function getGamePlatforms(platforms, games, title) {\n  const game = games.find(g => g.title === title);\n  if (!game) return [];\n  return platforms.filter(p => game.platformIds.includes(p.id)).map(p => p.name);\n}",
    hints: [
      "First use .find() to locate the game by title. Then filter platforms whose id appears in the game's platformIds array.",
      "Chain: `platforms.filter(p => game.platformIds.includes(p.id)).map(p => p.name)`"
    ],
    resources: [
      { label: "MDN: Array.prototype.find()", url: "/docs/mdn/array-find.html" },
      { label: "MDN: Array.prototype.filter()", url: "/docs/mdn/array-filter.html" }
    ],
    testRunner: tr('getGamePlatforms', [
      '  const astro = fn(platforms, games, "Astro Botch");',
      '  const mine = fn(platforms, games, "Mineshaft");',
      '  const nobody = fn(platforms, games, "Nonexistent Game");',
      '  return [',
      '    { pass: Array.isArray(astro), description: "Returns an array", got: typeof astro },',
      '    { pass: astro.length === 1 && astro[0] === "GameStation 5", description: "Astro Botch is only on GameStation 5", got: JSON.stringify(astro) },',
      '    { pass: mine.length === 6, description: "Mineshaft is on all 6 platforms", got: String(mine.length) },',
      '    { pass: nobody.length === 0, description: "Returns empty array for unknown game", got: String(nobody.length) },',
      '    { pass: astro.every(n => typeof n === "string"), description: "Returns strings (platform names)", got: String(astro.every(n => typeof n === "string")) },',
      '  ];',
    ].join('\n'))
  },
  {
    id: 973,
    title: "Video Games: Total Player Count",
    tier: 3,
    category: ["api-data", "video-games"],
    tags: ["arrays", "reduce", "nested-access", "api-data", "video-games"],
    description: "Calculate the total number of players across all games.",
    instructions: "Write a function called `totalPlayers` that takes an array of game objects and returns the total of all `players.total` values.\n\nExample:\n```\ntotalPlayers(games) // Returns: 1117700000\n```",
    starterCode: "/**\n * @param {Object[]} games - Array of game objects\n * @returns {number} Sum of all players.total\n */\nfunction totalPlayers(games) {\n  \n}",
    solution: "function totalPlayers(games) {\n  return games.reduce((sum, game) => sum + game.players.total, 0);\n}",
    hints: [
      "Use .reduce() to accumulate a running total of each game's players.total value.",
      "Access the nested property: `.reduce((sum, game) => sum + game.players.total, 0)`"
    ],
    resources: [{ label: "MDN: Array.prototype.reduce()", url: "/docs/mdn/array-reduce.html" }],
    testRunner: (() => {
      const total = GAMES.reduce((s, g) => s + g.players.total, 0);
      return tr('totalPlayers', [
        '  const result = fn(games);',
        '  const subset = fn([games[0], games[1]]);',
        `  const expectedSubset = ${GAMES[0].players.total} + ${GAMES[1].players.total};`,
        '  return [',
        '    { pass: typeof result === "number", description: "Returns a number", got: typeof result },',
        `    { pass: result === ${total}, description: "Total players is ${total.toLocaleString()}", got: String(result) },`,
        '    { pass: subset === expectedSubset, description: "Works with subset of games", got: String(subset) },',
        '    { pass: fn([]) === 0, description: "Returns 0 for empty array", got: String(fn([])) },',
        '  ];',
      ].join('\n'));
    })()
  },
  {
    id: 974,
    title: "Video Games: Total Awards",
    tier: 3,
    category: ["api-data", "video-games"],
    tags: ["arrays", "map", "reduce", "nested-access", "api-data", "video-games"],
    description: "Calculate total awards for each game from nested award categories.",
    instructions: "Write a function called `getTotalAwards` that takes an array of game objects and returns an array of objects with `title` and `totalAwards` properties. The `totalAwards` should be the sum of `awards.gameAwards`, `awards.bafta`, and `awards.diceAwards`.\n\nSort by `totalAwards` descending.\n\nExample:\n```\ngetTotalAwards(games)\n// Returns: [{ title: \"Balder's Gate 3\", totalAwards: 15 }, ...]\n```",
    starterCode: "/**\n * @param {Object[]} games - Array of game objects\n * @returns {Object[]} Array of { title, totalAwards } sorted descending\n */\nfunction getTotalAwards(games) {\n  \n}",
    solution: "function getTotalAwards(games) {\n  return games.map(g => ({\n    title: g.title,\n    totalAwards: g.awards.gameAwards + g.awards.bafta + g.awards.diceAwards\n  })).sort((a, b) => b.totalAwards - a.totalAwards);\n}",
    hints: [
      "Use .map() to build objects with title and totalAwards (sum of all three award fields). Then chain .sort().",
      "Sum the awards: `g.awards.gameAwards + g.awards.bafta + g.awards.diceAwards`. Sort descending: `(a, b) => b.totalAwards - a.totalAwards`"
    ],
    resources: [
      { label: "MDN: Array.prototype.map()", url: "/docs/mdn/array-map.html" },
      { label: "MDN: Array.prototype.sort()", url: "/docs/mdn/array-sort.html" }
    ],
    testRunner: (() => {
      const sorted = GAMES.map(g => ({
        title: g.title,
        totalAwards: g.awards.gameAwards + g.awards.bafta + g.awards.diceAwards
      })).sort((a, b) => b.totalAwards - a.totalAwards);
      return tr('getTotalAwards', [
        '  const result = fn(games);',
        '  return [',
        '    { pass: Array.isArray(result) && result.length === 12, description: "Returns array of 12 entries", got: Array.isArray(result) ? String(result.length) : typeof result },',
        `    { pass: result[0] && result[0].title === "${sorted[0].title}", description: 'Most awards: "${esc(sorted[0].title)}" (${sorted[0].totalAwards})', got: result[0] ? result[0].title + " (" + result[0].totalAwards + ")" : "undefined" },`,
        `    { pass: result[0] && result[0].totalAwards === ${sorted[0].totalAwards}, description: "Top game has ${sorted[0].totalAwards} total awards", got: result[0] ? String(result[0].totalAwards) : "undefined" },`,
        `    { pass: result[11] && result[11].totalAwards === ${sorted[11].totalAwards}, description: "Last game has ${sorted[11].totalAwards} total awards", got: result[11] ? String(result[11].totalAwards) : "undefined" },`,
        '    { pass: result[0] && Object.keys(result[0]).length === 2, description: "Each entry has exactly 2 properties", got: result[0] ? String(Object.keys(result[0]).length) : "undefined" },',
        '  ];',
      ].join('\n'));
    })()
  },
  {
    id: 975,
    title: "Video Games: Exclusive Titles",
    tier: 3,
    category: ["api-data", "video-games"],
    tags: ["arrays", "filter", "cross-reference", "api-data", "video-games"],
    description: "Find games that are exclusive to a single platform.",
    instructions: "Write a function called `getExclusives` that takes the `platforms` and `games` arrays and a platform name string. Return the titles of games that are available ONLY on that platform (platformIds has exactly one entry matching that platform's id).\n\nExample:\n```\ngetExclusives(platforms, games, \"GameStation 5\")\n// Returns: [\"Astro Botch\"]\n```",
    starterCode: "/**\n * @param {Object[]} platforms - Array of platform objects\n * @param {Object[]} games - Array of game objects\n * @param {string} platformName - Name of the platform\n * @returns {string[]} Titles exclusive to that platform\n */\nfunction getExclusives(platforms, games, platformName) {\n  \n}",
    solution: "function getExclusives(platforms, games, platformName) {\n  const platform = platforms.find(p => p.name === platformName);\n  if (!platform) return [];\n  return games.filter(g => g.platformIds.length === 1 && g.platformIds[0] === platform.id).map(g => g.title);\n}",
    hints: [
      "First find the platform by name to get its id. Then filter games where platformIds has exactly 1 entry matching that id.",
      "Check exclusivity: `game.platformIds.length === 1 && game.platformIds[0] === platform.id`"
    ],
    resources: [
      { label: "MDN: Array.prototype.find()", url: "/docs/mdn/array-find.html" },
      { label: "MDN: Array.prototype.filter()", url: "/docs/mdn/array-filter.html" }
    ],
    testRunner: (() => {
      const gs5 = PLATFORMS.find(p => p.name === 'GameStation 5');
      const gs5Excl = GAMES.filter(g => g.platformIds.length === 1 && g.platformIds[0] === gs5.id).map(g => g.title);
      const nsExcl = GAMES.filter(g => g.platformIds.length === 1 && g.platformIds[0] === 3).map(g => g.title);
      return tr('getExclusives', [
        '  const gs5 = fn(platforms, games, "GameStation 5");',
        '  const ns = fn(platforms, games, "Nintendoh Stitch");',
        '  const pc = fn(platforms, games, "PC");',
        '  const nobody = fn(platforms, games, "Sega Saturn");',
        '  return [',
        '    { pass: Array.isArray(gs5), description: "Returns an array", got: typeof gs5 },',
        `    { pass: gs5.length === ${gs5Excl.length} && gs5.includes("${gs5Excl[0]}"), description: 'GameStation 5 exclusive: "${gs5Excl[0]}"', got: JSON.stringify(gs5) },`,
        `    { pass: ns.length === ${nsExcl.length} && ns.includes("${nsExcl[0]}"), description: 'Nintendoh Stitch exclusive: "${nsExcl[0]}"', got: JSON.stringify(ns) },`,
        '    { pass: pc.length === 0, description: "No PC exclusives", got: String(pc.length) },',
        '    { pass: nobody.length === 0, description: "Returns empty for unknown platform", got: String(nobody.length) },',
        '  ];',
      ].join('\n'));
    })()
  },
  {
    id: 976,
    title: "Video Games: Unique Genres",
    tier: 3,
    category: ["api-data", "video-games"],
    tags: ["arrays", "flatMap", "set", "api-data", "video-games"],
    description: "Extract all unique genres from across all games.",
    instructions: "Write a function called `getUniqueGenres` that takes an array of game objects and returns a sorted array of all unique genre strings found across all games.\n\nEach game has a `genres` array.\n\nExample:\n```\ngetUniqueGenres(games)\n// Returns: [\"action\", \"adventure\", \"battle-royale\", ...]\n```",
    starterCode: "/**\n * @param {Object[]} games - Array of game objects\n * @returns {string[]} Sorted array of unique genres\n */\nfunction getUniqueGenres(games) {\n  \n}",
    solution: "function getUniqueGenres(games) {\n  return [...new Set(games.flatMap(g => g.genres))].sort();\n}",
    hints: [
      "Use .flatMap() to collect all genres from all games into one array. Then remove duplicates and sort.",
      "Remove duplicates with `[...new Set(array)]`, then chain `.sort()` for alphabetical order."
    ],
    resources: [
      { label: "MDN: Array.prototype.flatMap()", url: "/docs/mdn/array-flatmap.html" },
      { label: "MDN: Set", url: "/docs/mdn/set.html" }
    ],
    testRunner: (() => {
      const genres = [...new Set(GAMES.flatMap(g => g.genres))].sort();
      return tr('getUniqueGenres', [
        '  const result = fn(games);',
        '  return [',
        '    { pass: Array.isArray(result), description: "Returns an array", got: typeof result },',
        `    { pass: result.length === ${genres.length}, description: "${genres.length} unique genres", got: String(result.length) },`,
        `    { pass: result[0] === "${genres[0]}", description: 'First genre alphabetically is "${genres[0]}"', got: String(result[0]) },`,
        '    { pass: result.includes("rpg"), description: \'Includes "rpg"\', got: String(result.includes("rpg")) },',
        `    { pass: new Set(result).size === result.length, description: "All genres are unique", got: "unique: " + new Set(result).size + ", total: " + result.length },`,
        '    { pass: JSON.stringify(result) === JSON.stringify([...result].sort()), description: "Array is sorted alphabetically", got: "sorted: " + (JSON.stringify(result) === JSON.stringify([...result].sort())) },',
        '  ];',
      ].join('\n'));
    })()
  },
  {
    id: 977,
    title: "Video Games: Sort by Playtime",
    tier: 3,
    category: ["api-data", "video-games"],
    tags: ["arrays", "sort", "filter", "nested-access", "api-data", "video-games"],
    description: "Sort games by completionist playtime, excluding games without playtime data.",
    instructions: "Write a function called `sortByPlaytime` that takes an array of game objects and returns an array of objects with `title` and `completionist` properties, sorted from longest to shortest completionist playtime.\n\nExclude games where `playtime.completionist` is `null`.\n\nExample:\n```\nsortByPlaytime(games)\n// Returns: [{ title: \"Mineshaft\", completionist: 420 }, ...]\n```",
    starterCode: "/**\n * @param {Object[]} games - Array of game objects\n * @returns {Object[]} Array of { title, completionist } sorted descending\n */\nfunction sortByPlaytime(games) {\n  \n}",
    solution: "function sortByPlaytime(games) {\n  return games\n    .filter(g => g.playtime.completionist !== null)\n    .map(g => ({ title: g.title, completionist: g.playtime.completionist }))\n    .sort((a, b) => b.completionist - a.completionist);\n}",
    hints: [
      "Chain three methods: .filter() to remove nulls, .map() to build the output objects, .sort() for descending order.",
      "Filter: `g.playtime.completionist !== null`. Sort descending: `(a, b) => b.completionist - a.completionist`"
    ],
    resources: [
      { label: "MDN: Array.prototype.filter()", url: "/docs/mdn/array-filter.html" },
      { label: "MDN: Array.prototype.sort()", url: "/docs/mdn/array-sort.html" }
    ],
    testRunner: (() => {
      const sorted = GAMES
        .filter(g => g.playtime.completionist !== null)
        .map(g => ({ title: g.title, completionist: g.playtime.completionist }))
        .sort((a, b) => b.completionist - a.completionist);
      return tr('sortByPlaytime', [
        '  const result = fn(games);',
        '  return [',
        '    { pass: Array.isArray(result), description: "Returns an array", got: typeof result },',
        `    { pass: result.length === ${sorted.length}, description: "${sorted.length} games have playtime data (Fork Knife excluded)", got: String(result.length) },`,
        `    { pass: result[0] && result[0].title === "${sorted[0].title}", description: 'Longest completionist: "${sorted[0].title}" (${sorted[0].completionist}h)', got: result[0] ? result[0].title + " (" + result[0].completionist + "h)" : "undefined" },`,
        `    { pass: result[result.length-1] && result[result.length-1].title === "${sorted[sorted.length-1].title}", description: 'Shortest: "${sorted[sorted.length-1].title}" (${sorted[sorted.length-1].completionist}h)', got: result[result.length-1] ? result[result.length-1].title + " (" + result[result.length-1].completionist + "h)" : "undefined" },`,
        '    { pass: !result.find(g => g.title === "Fork Knife"), description: "Fork Knife (null playtime) is excluded", got: String(!result.find(g => g.title === "Fork Knife")) },',
        '  ];',
      ].join('\n'));
    })()
  },
  {
    id: 978,
    title: "Video Games: Average Metacritic by Genre",
    tier: 3,
    category: ["api-data", "video-games"],
    tags: ["arrays", "reduce", "nested-access", "aggregation", "api-data", "video-games"],
    description: "Calculate the average Metacritic score for games in a given genre.",
    instructions: "Write a function called `avgMetacriticByGenre` that takes an array of game objects and a genre string, and returns the average `ratings.metacritic` score for games that include that genre, rounded to 1 decimal place.\n\nReturn 0 if no games match the genre.\n\nExample:\n```\navgMetacriticByGenre(games, \"rpg\") // Returns: 90.8\n```",
    starterCode: "/**\n * @param {Object[]} games - Array of game objects\n * @param {string} genre - Genre to calculate average for\n * @returns {number} Average Metacritic score rounded to 1 decimal\n */\nfunction avgMetacriticByGenre(games, genre) {\n  \n}",
    solution: "function avgMetacriticByGenre(games, genre) {\n  const matching = games.filter(g => g.genres.includes(genre));\n  if (matching.length === 0) return 0;\n  const sum = matching.reduce((total, g) => total + g.ratings.metacritic, 0);\n  return Math.round((sum / matching.length) * 10) / 10;\n}",
    hints: [
      "First .filter() to games in the genre, then .reduce() to sum their metacritic scores, then divide and round.",
      "Round to 1 decimal: `Math.round(value * 10) / 10`. Handle the empty case by returning 0."
    ],
    resources: [{ label: "MDN: Array.prototype.reduce()", url: "/docs/mdn/array-reduce.html" }],
    testRunner: (() => {
      const rpg = GAMES.filter(g => g.genres.includes('rpg'));
      const rpgAvg = Math.round((rpg.reduce((s, g) => s + g.ratings.metacritic, 0) / rpg.length) * 10) / 10;
      const action = GAMES.filter(g => g.genres.includes('action'));
      const actionAvg = Math.round((action.reduce((s, g) => s + g.ratings.metacritic, 0) / action.length) * 10) / 10;
      return tr('avgMetacriticByGenre', [
        '  const rpg = fn(games, "rpg");',
        '  const action = fn(games, "action");',
        '  const racing = fn(games, "racing");',
        '  return [',
        '    { pass: typeof rpg === "number", description: "Returns a number", got: typeof rpg },',
        `    { pass: rpg === ${rpgAvg}, description: "RPG average metacritic is ${rpgAvg}", got: String(rpg) },`,
        `    { pass: action === ${actionAvg}, description: "Action average metacritic is ${actionAvg}", got: String(action) },`,
        '    { pass: racing === 0, description: "Returns 0 for genre with no games", got: String(racing) },',
        '  ];',
      ].join('\n'));
    })()
  },

  // ── T4 (4 exercises) ──────────────────────────────────────────────────────
  {
    id: 979,
    title: "Video Games: Platform Library Report",
    tier: 4,
    category: ["api-data", "video-games"],
    tags: ["arrays", "reduce", "cross-reference", "data-transformation", "api-data", "video-games"],
    description: "Build a library report for each platform showing its games and player stats.",
    instructions: "Write a function called `platformReport` that takes the `platforms` and `games` arrays and returns an array of objects, one per platform, with:\n- `name`: platform name\n- `gameCount`: number of games available on that platform\n- `totalPlayers`: sum of `players.total` across games on that platform\n- `topGame`: title of the game on that platform with the highest `ratings.metacritic`\n- `exclusiveCount`: number of games ONLY on that platform\n\nSort by `gameCount` descending.\n\nExample:\n```\nplatformReport(platforms, games)\n// Returns: [{ name: \"GameStation 5\", gameCount: 10, ... }, ...]\n```",
    starterCode: "",
    solution: "function platformReport(platforms, games) {\n  return platforms.map(p => {\n    const pGames = games.filter(g => g.platformIds.includes(p.id));\n    const totalPlayers = pGames.reduce((sum, g) => sum + g.players.total, 0);\n    const topGame = pGames.reduce((best, g) => g.ratings.metacritic > best.ratings.metacritic ? g : best);\n    const exclusiveCount = pGames.filter(g => g.platformIds.length === 1).length;\n    return {\n      name: p.name,\n      gameCount: pGames.length,\n      totalPlayers,\n      topGame: topGame.title,\n      exclusiveCount\n    };\n  }).sort((a, b) => b.gameCount - a.gameCount);\n}",
    hints: [
      "For each platform, filter games that include its id in platformIds. Then compute stats with .reduce() and .filter().",
      "Exclusives are games where `platformIds.length === 1`. Chain .sort() at the end for descending gameCount."
    ],
    resources: [
      { label: "MDN: Array.prototype.reduce()", url: "/docs/mdn/array-reduce.html" },
      { label: "MDN: Array.prototype.sort()", url: "/docs/mdn/array-sort.html" }
    ],
    testRunner: (() => {
      const report = PLATFORMS.map(p => {
        const pg = GAMES.filter(g => g.platformIds.includes(p.id));
        const tp = pg.reduce((s, g) => s + g.players.total, 0);
        const top = pg.reduce((b, g) => g.ratings.metacritic > b.ratings.metacritic ? g : b);
        const exc = pg.filter(g => g.platformIds.length === 1).length;
        return { name: p.name, gameCount: pg.length, totalPlayers: tp, topGame: top.title, exclusiveCount: exc };
      }).sort((a, b) => b.gameCount - a.gameCount);
      return tr('platformReport', [
        '  const result = fn(platforms, games);',
        '  return [',
        '    { pass: Array.isArray(result) && result.length === 6, description: "Returns array of 6 platform reports", got: Array.isArray(result) ? String(result.length) : typeof result },',
        `    { pass: result[0] && result[0].name === "${report[0].name}", description: 'Most games on "${report[0].name}" (${report[0].gameCount})', got: result[0] ? result[0].name + " (" + result[0].gameCount + ")" : "undefined" },`,
        `    { pass: result[0] && result[0].gameCount === ${report[0].gameCount}, description: "${report[0].name} has ${report[0].gameCount} games", got: result[0] ? String(result[0].gameCount) : "undefined" },`,
        `    { pass: result[0] && result[0].topGame === "${report[0].topGame}", description: '${report[0].name} top game: "${report[0].topGame}"', got: result[0] ? result[0].topGame : "undefined" },`,
        `    { pass: result.find(r => r.name === "GameStation 5") && result.find(r => r.name === "GameStation 5").exclusiveCount === ${report.find(r => r.name === 'GameStation 5').exclusiveCount}, description: "GameStation 5 has ${report.find(r => r.name === 'GameStation 5').exclusiveCount} exclusive(s)", got: result.find(r => r.name === "GameStation 5") ? String(result.find(r => r.name === "GameStation 5").exclusiveCount) : "undefined" },`,
        '  ];',
      ].join('\n'));
    })()
  },
  {
    id: 980,
    title: "Video Games: Genre Popularity",
    tier: 4,
    category: ["api-data", "video-games"],
    tags: ["arrays", "reduce", "aggregation", "api-data", "video-games"],
    description: "Build a genre popularity report with game count, average score, and total players.",
    instructions: "Write a function called `genrePopularity` that takes an array of game objects and returns an object where each key is a genre and the value is an object with:\n- `gameCount`: number of games in that genre\n- `avgMetacritic`: average Metacritic score (rounded to 1 decimal)\n- `totalPlayers`: sum of `players.total` for games in that genre\n\nNote: games can have multiple genres.\n\nExample:\n```\ngenrePopularity(games)\n// Returns: {\n//   \"rpg\": { gameCount: 5, avgMetacritic: 90.8, totalPlayers: 104200000 },\n//   ...\n// }\n```",
    starterCode: "",
    solution: "function genrePopularity(games) {\n  const result = {};\n  games.forEach(game => {\n    game.genres.forEach(genre => {\n      if (!result[genre]) result[genre] = { gameCount: 0, totalMetacritic: 0, totalPlayers: 0 };\n      result[genre].gameCount++;\n      result[genre].totalMetacritic += game.ratings.metacritic;\n      result[genre].totalPlayers += game.players.total;\n    });\n  });\n  Object.keys(result).forEach(genre => {\n    result[genre].avgMetacritic = Math.round((result[genre].totalMetacritic / result[genre].gameCount) * 10) / 10;\n    delete result[genre].totalMetacritic;\n  });\n  return result;\n}",
    hints: [
      "Use nested forEach to process each game's genres. Accumulate counts, score sums, and player totals per genre.",
      "After building the totals, loop through the result to compute avgMetacritic by dividing the sum by count and rounding."
    ],
    resources: [{ label: "MDN: Array.prototype.reduce()", url: "/docs/mdn/array-reduce.html" }],
    testRunner: (() => {
      const bd = {};
      GAMES.forEach(g => {
        g.genres.forEach(genre => {
          if (!bd[genre]) bd[genre] = { gameCount: 0, totalMeta: 0, totalPlayers: 0 };
          bd[genre].gameCount++;
          bd[genre].totalMeta += g.ratings.metacritic;
          bd[genre].totalPlayers += g.players.total;
        });
      });
      Object.keys(bd).forEach(g => {
        bd[g].avgMetacritic = Math.round((bd[g].totalMeta / bd[g].gameCount) * 10) / 10;
      });
      const genreCount = Object.keys(bd).length;
      const rpg = bd['rpg'];
      const action = bd['action'];
      return tr('genrePopularity', [
        '  const result = fn(games);',
        '  return [',
        '    { pass: typeof result === "object" && !Array.isArray(result), description: "Returns an object", got: typeof result },',
        `    { pass: Object.keys(result).length === ${genreCount}, description: "${genreCount} unique genres", got: String(Object.keys(result).length) },`,
        `    { pass: result.rpg && result.rpg.gameCount === ${rpg.gameCount}, description: "RPG has ${rpg.gameCount} games", got: result.rpg ? String(result.rpg.gameCount) : "undefined" },`,
        `    { pass: result.rpg && result.rpg.avgMetacritic === ${rpg.avgMetacritic}, description: "RPG avgMetacritic is ${rpg.avgMetacritic}", got: result.rpg ? String(result.rpg.avgMetacritic) : "undefined" },`,
        `    { pass: result.action && result.action.totalPlayers === ${action.totalPlayers}, description: "Action totalPlayers is ${action.totalPlayers.toLocaleString()}", got: result.action ? String(result.action.totalPlayers) : "undefined" },`,
        '  ];',
      ].join('\n'));
    })()
  },
  {
    id: 981,
    title: "Video Games: Developer Portfolio",
    tier: 4,
    category: ["api-data", "video-games"],
    tags: ["arrays", "reduce", "cross-reference", "aggregation", "api-data", "video-games"],
    description: "Build a portfolio for each developer with their games, platforms, and stats.",
    instructions: "Write a function called `developerPortfolio` that takes the `platforms` and `games` arrays and returns an object where each key is a developer name and the value is an object with:\n- `games`: array of game title strings\n- `totalPlayers`: sum of `players.total` across their games\n- `avgMetacritic`: average Metacritic score (rounded to 1 decimal)\n- `platforms`: sorted array of unique platform names across all their games\n\nExample:\n```\ndeveloperPortfolio(platforms, games)\n// Returns: {\n//   \"Rockstar Lames\": { games: [\"Red Fed Redemption 2\", \"Grand Theft Avocado V\"], totalPlayers: 265000000, avgMetacritic: 97, platforms: [\"GameStation 4\", \"GameStation 5\", \"PC\", \"X-Bocks One\", \"X-Bocks Series X\"] },\n//   ...\n// }\n```",
    starterCode: "",
    solution: "function developerPortfolio(platforms, games) {\n  const result = {};\n  games.forEach(game => {\n    const dev = game.developer;\n    if (!result[dev]) result[dev] = { games: [], totalPlayers: 0, totalMeta: 0, platformIds: new Set() };\n    result[dev].games.push(game.title);\n    result[dev].totalPlayers += game.players.total;\n    result[dev].totalMeta += game.ratings.metacritic;\n    game.platformIds.forEach(pid => result[dev].platformIds.add(pid));\n  });\n  Object.keys(result).forEach(dev => {\n    const entry = result[dev];\n    entry.avgMetacritic = Math.round((entry.totalMeta / entry.games.length) * 10) / 10;\n    entry.platforms = platforms\n      .filter(p => entry.platformIds.has(p.id))\n      .map(p => p.name)\n      .sort();\n    delete entry.totalMeta;\n    delete entry.platformIds;\n  });\n  return result;\n}",
    hints: [
      "Group games by developer. For each developer, collect game titles, sum players and metacritic, and gather unique platformIds with a Set.",
      "After grouping, compute avgMetacritic and resolve platformIds to platform names using the platforms array. Sort the platform names."
    ],
    resources: [{ label: "MDN: Array.prototype.reduce()", url: "/docs/mdn/array-reduce.html" }],
    testRunner: (() => {
      const port = {};
      GAMES.forEach(g => {
        const d = g.developer;
        if (!port[d]) port[d] = { games: [], totalPlayers: 0, totalMeta: 0, pids: new Set() };
        port[d].games.push(g.title);
        port[d].totalPlayers += g.players.total;
        port[d].totalMeta += g.ratings.metacritic;
        g.platformIds.forEach(pid => port[d].pids.add(pid));
      });
      Object.keys(port).forEach(d => {
        port[d].avgMetacritic = Math.round((port[d].totalMeta / port[d].games.length) * 10) / 10;
        port[d].platforms = PLATFORMS.filter(p => port[d].pids.has(p.id)).map(p => p.name).sort();
      });
      const rockstar = port['Rockstar Lames'];
      const devCount = Object.keys(port).length;
      return tr('developerPortfolio', [
        '  const result = fn(platforms, games);',
        '  return [',
        '    { pass: typeof result === "object" && !Array.isArray(result), description: "Returns an object", got: typeof result },',
        `    { pass: Object.keys(result).length === ${devCount}, description: "${devCount} unique developers", got: String(Object.keys(result).length) },`,
        `    { pass: result["Rockstar Lames"] && result["Rockstar Lames"].games.length === ${rockstar.games.length}, description: "Rockstar Lames has ${rockstar.games.length} games", got: result["Rockstar Lames"] ? String(result["Rockstar Lames"].games.length) : "undefined" },`,
        `    { pass: result["Rockstar Lames"] && result["Rockstar Lames"].totalPlayers === ${rockstar.totalPlayers}, description: "Rockstar Lames totalPlayers is ${rockstar.totalPlayers.toLocaleString()}", got: result["Rockstar Lames"] ? String(result["Rockstar Lames"].totalPlayers) : "undefined" },`,
        `    { pass: result["Rockstar Lames"] && result["Rockstar Lames"].avgMetacritic === ${rockstar.avgMetacritic}, description: "Rockstar Lames avgMetacritic is ${rockstar.avgMetacritic}", got: result["Rockstar Lames"] ? String(result["Rockstar Lames"].avgMetacritic) : "undefined" },`,
        `    { pass: result["Rockstar Lames"] && JSON.stringify(result["Rockstar Lames"].platforms) === '${JSON.stringify(rockstar.platforms)}', description: "Rockstar Lames platforms are correct and sorted", got: result["Rockstar Lames"] ? JSON.stringify(result["Rockstar Lames"].platforms) : "undefined" },`,
        '  ];',
      ].join('\n'));
    })()
  },
  {
    id: 982,
    title: "Video Games: Full Gaming Analysis",
    tier: 4,
    category: ["api-data", "video-games"],
    tags: ["arrays", "reduce", "cross-reference", "data-transformation", "aggregation", "api-data", "video-games"],
    description: "Build a comprehensive gaming industry analysis from both datasets.",
    instructions: "Create a function called `gamingAnalysis` that takes the `platforms` and `games` arrays and returns an object with:\n- `totalGames`: number of games\n- `totalPlatforms`: number of platforms\n- `totalPlayers`: sum of all `players.total`\n- `avgMetacritic`: average Metacritic across all games (rounded to 1 decimal)\n- `mostAwarded`: `{ title, totalAwards }` of the game with the most total awards (sum of gameAwards + bafta + diceAwards)\n- `mostPopular`: `{ title, players }` of the game with highest `players.total`\n- `manufacturerBreakdown`: object mapping each platform manufacturer to `{ platforms, totalGamesSold }` where `platforms` is an array of platform names and `totalGamesSold` is the sum of `unitsSold` (skip null values)\n\nExample:\n```\ngamingAnalysis(platforms, games)\n// Returns: { totalGames: 12, totalPlatforms: 6, ... }\n```",
    starterCode: "",
    solution: "function gamingAnalysis(platforms, games) {\n  const totalPlayers = games.reduce((sum, g) => sum + g.players.total, 0);\n  const avgMetacritic = Math.round((games.reduce((sum, g) => sum + g.ratings.metacritic, 0) / games.length) * 10) / 10;\n  const mostAwarded = games.map(g => ({ title: g.title, totalAwards: g.awards.gameAwards + g.awards.bafta + g.awards.diceAwards })).reduce((best, g) => g.totalAwards > best.totalAwards ? g : best);\n  const mostPopular = games.reduce((best, g) => g.players.total > best.players.total ? g : best);\n  const manufacturerBreakdown = {};\n  platforms.forEach(p => {\n    if (!manufacturerBreakdown[p.manufacturer]) {\n      manufacturerBreakdown[p.manufacturer] = { platforms: [], totalGamesSold: 0 };\n    }\n    manufacturerBreakdown[p.manufacturer].platforms.push(p.name);\n    if (p.unitsSold !== null) {\n      manufacturerBreakdown[p.manufacturer].totalGamesSold += p.unitsSold;\n    }\n  });\n  return {\n    totalGames: games.length,\n    totalPlatforms: platforms.length,\n    totalPlayers,\n    avgMetacritic,\n    mostAwarded,\n    mostPopular: { title: mostPopular.title, players: mostPopular.players.total },\n    manufacturerBreakdown\n  };\n}",
    hints: [
      "Break this into parts: count totals, compute averages, find maximums with .reduce(), and build the manufacturer breakdown by grouping platforms.",
      "For manufacturerBreakdown, loop through platforms and group by manufacturer. Skip null unitsSold when summing. The mostAwarded needs you to sum three award fields first."
    ],
    resources: [{ label: "MDN: Array.prototype.reduce()", url: "/docs/mdn/array-reduce.html" }],
    testRunner: (() => {
      const totalP = GAMES.reduce((s, g) => s + g.players.total, 0);
      const avgM = Math.round((GAMES.reduce((s, g) => s + g.ratings.metacritic, 0) / GAMES.length) * 10) / 10;
      const awarded = GAMES.map(g => ({ title: g.title, totalAwards: g.awards.gameAwards + g.awards.bafta + g.awards.diceAwards })).reduce((b, g) => g.totalAwards > b.totalAwards ? g : b);
      const popular = GAMES.reduce((b, g) => g.players.total > b.players.total ? g : b);
      const mfg = {};
      PLATFORMS.forEach(p => {
        if (!mfg[p.manufacturer]) mfg[p.manufacturer] = { platforms: [], totalGamesSold: 0 };
        mfg[p.manufacturer].platforms.push(p.name);
        if (p.unitsSold !== null) mfg[p.manufacturer].totalGamesSold += p.unitsSold;
      });
      return tr('gamingAnalysis', [
        '  const result = fn(platforms, games);',
        '  return [',
        '    { pass: typeof result === "object" && !Array.isArray(result), description: "Returns an object", got: typeof result },',
        '    { pass: result.totalGames === 12 && result.totalPlatforms === 6, description: "totalGames: 12, totalPlatforms: 6", got: "games: " + result.totalGames + ", platforms: " + result.totalPlatforms },',
        `    { pass: result.totalPlayers === ${totalP}, description: "totalPlayers is ${totalP.toLocaleString()}", got: String(result.totalPlayers) },`,
        `    { pass: result.avgMetacritic === ${avgM}, description: "avgMetacritic is ${avgM}", got: String(result.avgMetacritic) },`,
        `    { pass: result.mostAwarded && result.mostAwarded.title === "${awarded.title}", description: 'mostAwarded is "${esc(awarded.title)}" (${awarded.totalAwards})', got: result.mostAwarded ? result.mostAwarded.title + " (" + result.mostAwarded.totalAwards + ")" : "undefined" },`,
        `    { pass: result.mostPopular && result.mostPopular.title === "${popular.title}", description: 'mostPopular is "${popular.title}"', got: result.mostPopular ? result.mostPopular.title : "undefined" },`,
        `    { pass: result.manufacturerBreakdown && result.manufacturerBreakdown["Sonny"] && result.manufacturerBreakdown["Sonny"].totalGamesSold === ${mfg['Sonny'].totalGamesSold}, description: "Sonny totalGamesSold is ${mfg['Sonny'].totalGamesSold.toLocaleString()}", got: result.manufacturerBreakdown && result.manufacturerBreakdown["Sonny"] ? String(result.manufacturerBreakdown["Sonny"].totalGamesSold) : "undefined" },`,
        `    { pass: result.manufacturerBreakdown && result.manufacturerBreakdown["Various"] && result.manufacturerBreakdown["Various"].totalGamesSold === 0, description: "Various (PC) totalGamesSold is 0 (null unitsSold skipped)", got: result.manufacturerBreakdown && result.manufacturerBreakdown["Various"] ? String(result.manufacturerBreakdown["Various"].totalGamesSold) : "undefined" },`,
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

console.log(`\nPop Culture APIs — Video Games Theme`);
console.log(`====================================`);
console.log(`  Exercises: ${exercises.length}`);
console.log(`  T2: ${exercises.filter(e => e.tier === 2).length}`);
console.log(`  T3: ${exercises.filter(e => e.tier === 3).length}`);
console.log(`  T4: ${exercises.filter(e => e.tier === 4).length}`);
console.log(`  ID range: ${exercises[0].id}–${exercises[exercises.length - 1].id}`);
console.log(`  Games: ${GAMES.length}, Platforms: ${PLATFORMS.length}`);
console.log(`  Appended to: ${outPath}`);
console.log(`  Total collection exercises: ${existing.exercises.length}`);
