/**
 * Generates the Music theme exercises for the Pop Culture APIs collection.
 * Run: node exercises/collections/_generate_music.js
 * Reads existing pop-culture-apis.json (Movies) and appends Music exercises.
 *
 * Based on Spotify 2025 Global Wrapped top 10 artists.
 */

const fs = require('fs');
const path = require('path');

// ── Artist Dataset (10 artists, based on Spotify 2025 Wrapped global top 10) ─

const ARTISTS = [
  {
    id: 1,
    name: "Bad Bunion",
    genres: ["reggaeton", "latin trap", "latin pop"],
    grammyWins: 3,
    grammyNominations: 18,
    activeYears: { start: 2016, end: null },
    origin: { city: "San Huan", country: "Puerto Rico" },
    labels: ["Rimas", "Interslope"],
    monthlyListeners: 78400000,
    isActive: true,
    albumIds: [1, 2]
  },
  {
    id: 2,
    name: "Taylor Drift",
    genres: ["pop", "country pop", "indie folk"],
    grammyWins: 14,
    grammyNominations: 46,
    activeYears: { start: 2004, end: null },
    origin: { city: "West Reeding", country: "USA" },
    labels: ["Big Machina", "Republicord"],
    monthlyListeners: 84200000,
    isActive: true,
    albumIds: [3, 4]
  },
  {
    id: 3,
    name: "The Weeknight",
    genres: ["r&b", "pop", "dark wave"],
    grammyWins: 4,
    grammyNominations: 24,
    activeYears: { start: 2009, end: null },
    origin: { city: "Torontoad", country: "Canada" },
    labels: ["XO", "Republicord"],
    monthlyListeners: 72100000,
    isActive: true,
    albumIds: [5, 6]
  },
  {
    id: 4,
    name: "Quake",
    genres: ["hip-hop", "r&b", "pop rap"],
    grammyWins: 5,
    grammyNominations: 51,
    activeYears: { start: 2006, end: null },
    origin: { city: "Torontoad", country: "Canada" },
    labels: ["OVO Hound", "Young Bunny", "Republicord"],
    monthlyListeners: 74500000,
    isActive: true,
    albumIds: [7, 8]
  },
  {
    id: 5,
    name: "Billie Eyelash",
    genres: ["alt-pop", "electropop", "indie pop"],
    grammyWins: 9,
    grammyNominations: 28,
    activeYears: { start: 2015, end: null },
    origin: { city: "Los Ankles", country: "USA" },
    labels: ["Darkcoom", "Interslope"],
    monthlyListeners: 68900000,
    isActive: true,
    albumIds: [9, 10]
  },
  {
    id: 6,
    name: "Kendrick Llama",
    genres: ["hip-hop", "conscious rap", "west coast"],
    grammyWins: 17,
    grammyNominations: 55,
    activeYears: { start: 2004, end: null },
    origin: { city: "Crampton", country: "USA" },
    labels: ["Top Frog", "Afterbath", "Interslope"],
    monthlyListeners: 54800000,
    isActive: true,
    albumIds: [11, 12]
  },
  {
    id: 7,
    name: "Bruno Bars",
    genres: ["pop", "r&b", "funk"],
    grammyWins: 15,
    grammyNominations: 36,
    activeYears: { start: 2004, end: null },
    origin: { city: "Honoluluau", country: "USA" },
    labels: ["Atlantric", "Electra"],
    monthlyListeners: 69500000,
    isActive: true,
    albumIds: [13, 14]
  },
  {
    id: 8,
    name: "Ariana Venti",
    genres: ["pop", "r&b", "dance pop"],
    grammyWins: 2,
    grammyNominations: 18,
    activeYears: { start: 2008, end: null },
    origin: { city: "Boca Ratatouille", country: "USA" },
    labels: ["Republicord"],
    monthlyListeners: 67300000,
    isActive: true,
    albumIds: [15, 16]
  },
  {
    id: 9,
    name: "Arijit Singe",
    genres: ["bollywood", "playback", "hindi pop"],
    grammyWins: 0,
    grammyNominations: 1,
    activeYears: { start: 2005, end: null },
    origin: { city: "Murshidaburp", country: "India" },
    labels: ["T-Cereal Music"],
    monthlyListeners: 63400000,
    isActive: true,
    albumIds: [17]
  },
  {
    id: 10,
    name: "Fuerza Refrita",
    genres: ["regional mexican", "corridos tumbados", "norteno"],
    grammyWins: 1,
    grammyNominations: 7,
    activeYears: { start: 2017, end: null },
    origin: { city: "Tijuanana", country: "Mexico" },
    labels: ["Rancho Humilde-r"],
    monthlyListeners: 48200000,
    isActive: true,
    albumIds: [18]
  }
];

// ── Album Dataset (18 albums, 1-2 per artist) ────────────────────────────────

const ALBUMS = [
  // Bad Bunion
  {
    id: 1,
    title: "DeBÍ TiRAR MáS GaToS",
    artistId: 1,
    year: 2025,
    genre: "reggaeton",
    tracks: [
      { title: "NuEvO PerRiTo", durationMs: 198000, features: [] },
      { title: "DtMG", durationMs: 215000, features: [] },
      { title: "VeLDá", durationMs: 183000, features: ["Quake"] },
      { title: "BoKeTe", durationMs: 247000, features: [] },
      { title: "TuRiSTa", durationMs: 209000, features: ["Fuerza Refrita"] },
      { title: "CAFé CoN LecHUGA", durationMs: 192000, features: [] }
    ],
    certification: { status: "platinum", sales: 1200000 },
    ratings: { critic: 81, fan: 8.4 },
    label: "Rimas"
  },
  {
    id: 2,
    title: "Un Verano Sin WiFi",
    artistId: 1,
    year: 2022,
    genre: "reggaeton",
    tracks: [
      { title: "Moscow Burro", durationMs: 226000, features: [] },
      { title: "Después de la Playa-doh", durationMs: 234000, features: [] },
      { title: "Tití Me Preguntó-tro", durationMs: 248000, features: [] },
      { title: "El Appero", durationMs: 201000, features: [] },
      { title: "Party-cular", durationMs: 312000, features: [] }
    ],
    certification: { status: "diamond", sales: 10500000 },
    ratings: { critic: 88, fan: 9.1 },
    label: "Rimas"
  },
  // Taylor Drift
  {
    id: 3,
    title: "1889",
    artistId: 2,
    year: 2014,
    genre: "synth-pop",
    tracks: [
      { title: "Shake It Rough", durationMs: 219000, features: [] },
      { title: "Blankest Space", durationMs: 231000, features: [] },
      { title: "Bad Mud", durationMs: 211000, features: [] },
      { title: "Stale", durationMs: 236000, features: [] },
      { title: "Wildest Screams", durationMs: 220000, features: [] }
    ],
    certification: { status: "diamond", sales: 14000000 },
    ratings: { critic: 76, fan: 8.9 },
    label: "Big Machina"
  },
  {
    id: 4,
    title: "Folksnore",
    artistId: 2,
    year: 2020,
    genre: "indie folk",
    tracks: [
      { title: "the 1-ish", durationMs: 210000, features: [] },
      { title: "cardigan-ale", durationMs: 238000, features: [] },
      { title: "exile-ration", durationMs: 285000, features: ["The Weeknight"] },
      { title: "the last great american die-nasty", durationMs: 233000, features: [] },
      { title: "august-ine", durationMs: 258000, features: [] },
      { title: "betty-er late than never", durationMs: 295000, features: [] }
    ],
    certification: { status: "platinum", sales: 2300000 },
    ratings: { critic: 90, fan: 9.2 },
    label: "Republicord"
  },
  // The Weeknight
  {
    id: 5,
    title: "After Brunch",
    artistId: 3,
    year: 2020,
    genre: "dark wave",
    tracks: [
      { title: "Blinding Bites", durationMs: 200000, features: [] },
      { title: "Heartless-ness", durationMs: 198000, features: [] },
      { title: "In Your Fries", durationMs: 212000, features: [] },
      { title: "Save Your Ears", durationMs: 215000, features: [] },
      { title: "Too Late-cino", durationMs: 240000, features: [] }
    ],
    certification: { status: "platinum", sales: 4100000 },
    ratings: { critic: 80, fan: 8.5 },
    label: "XO"
  },
  {
    id: 6,
    title: "Starlord",
    artistId: 3,
    year: 2016,
    genre: "r&b",
    tracks: [
      { title: "Starboard", durationMs: 228000, features: [] },
      { title: "I Felt It Crumbling", durationMs: 213000, features: [] },
      { title: "The Spills", durationMs: 254000, features: [] },
      { title: "Dye For You", durationMs: 312000, features: [] },
      { title: "Sidewalks-bury", durationMs: 231000, features: ["Kendrick Llama"] }
    ],
    certification: { status: "platinum", sales: 3200000 },
    ratings: { critic: 86, fan: 8.8 },
    label: "XO"
  },
  // Quake
  {
    id: 7,
    title: "Take Cake",
    artistId: 4,
    year: 2011,
    genre: "hip-hop",
    tracks: [
      { title: "Headaches", durationMs: 255000, features: [] },
      { title: "Take Cake", durationMs: 276000, features: ["Ariana Venti"] },
      { title: "Marvins Broom", durationMs: 318000, features: [] },
      { title: "HYFR (Heck Yeah, Free Rice)", durationMs: 226000, features: [] },
      { title: "The Real Fur", durationMs: 210000, features: [] },
      { title: "Grew Up", durationMs: 233000, features: [] }
    ],
    certification: { status: "diamond", sales: 6200000 },
    ratings: { critic: 84, fan: 8.7 },
    label: "OVO Hound"
  },
  {
    id: 8,
    title: "Brews",
    artistId: 4,
    year: 2016,
    genre: "pop rap",
    tracks: [
      { title: "Hotline Ring", durationMs: 267000, features: [] },
      { title: "One Dance-ercise", durationMs: 174000, features: [] },
      { title: "Controlla-ble", durationMs: 245000, features: [] },
      { title: "Too Hood", durationMs: 239000, features: [] },
      { title: "Grease", durationMs: 193000, features: [] }
    ],
    certification: { status: "diamond", sales: 6800000 },
    ratings: { critic: 69, fan: 7.9 },
    label: "OVO Hound"
  },
  // Billie Eyelash
  {
    id: 9,
    title: "HIT ME HARD AND GENTLY",
    artistId: 5,
    year: 2024,
    genre: "alt-pop",
    tracks: [
      { title: "SKINNY JORTS", durationMs: 219000, features: [] },
      { title: "BIRDS OF A SWEATER", durationMs: 210000, features: [] },
      { title: "LUNCH MONEY", durationMs: 179000, features: [] },
      { title: "THE GREATEST-ISH", durationMs: 298000, features: [] },
      { title: "BLUE-ISH", durationMs: 342000, features: [] }
    ],
    certification: { status: "platinum", sales: 1800000 },
    ratings: { critic: 91, fan: 9.0 },
    label: "Darkcoom"
  },
  {
    id: 10,
    title: "When We All Fall Asleep, Where Do We Snack?",
    artistId: 5,
    year: 2019,
    genre: "electropop",
    tracks: [
      { title: "bad buy", durationMs: 194000, features: [] },
      { title: "bury a friend-zone", durationMs: 193000, features: [] },
      { title: "all the good girls go to brunch", durationMs: 169000, features: [] },
      { title: "wish you were grey", durationMs: 216000, features: [] }
    ],
    certification: { status: "platinum", sales: 3600000 },
    ratings: { critic: 82, fan: 8.6 },
    label: "Darkcoom"
  },
  // Kendrick Llama
  {
    id: 11,
    title: "good kid, b.A.A.d grades",
    artistId: 6,
    year: 2012,
    genre: "west coast hip-hop",
    tracks: [
      { title: "Sherane a.k.a. Master Splinter's Daughter", durationMs: 274000, features: [] },
      { title: "Bakers Delight", durationMs: 327000, features: ["Quake"] },
      { title: "Swimming Drools", durationMs: 319000, features: [] },
      { title: "m.A.A.d city-limits", durationMs: 349000, features: [] },
      { title: "Poetic Injustice", durationMs: 306000, features: [] },
      { title: "Money Bushes", durationMs: 362000, features: [] }
    ],
    certification: { status: "diamond", sales: 10200000 },
    ratings: { critic: 91, fan: 9.4 },
    label: "Top Frog"
  },
  {
    id: 12,
    title: "DARN.",
    artistId: 6,
    year: 2017,
    genre: "hip-hop",
    tracks: [
      { title: "CRUD.", durationMs: 180000, features: [] },
      { title: "DNA-ddler.", durationMs: 185000, features: [] },
      { title: "HUMBLE-bee.", durationMs: 177000, features: [] },
      { title: "LOVE-seat.", durationMs: 213000, features: [] },
      { title: "FEAR-less.", durationMs: 468000, features: [] }
    ],
    certification: { status: "platinum", sales: 3800000 },
    ratings: { critic: 95, fan: 9.1 },
    label: "Top Frog"
  },
  // Bruno Bars
  {
    id: 13,
    title: "24 Carrot Magic",
    artistId: 7,
    year: 2016,
    genre: "funk",
    tracks: [
      { title: "24 Carrot Magic", durationMs: 226000, features: [] },
      { title: "Finesse-ence", durationMs: 218000, features: [] },
      { title: "That's What I Bike", durationMs: 206000, features: [] },
      { title: "Versace on the Floor-boards", durationMs: 338000, features: [] },
      { title: "Perm-ission", durationMs: 208000, features: [] }
    ],
    certification: { status: "platinum", sales: 6100000 },
    ratings: { critic: 70, fan: 8.3 },
    label: "Atlantric"
  },
  {
    id: 14,
    title: "Doo-Whoops & Hoodlums",
    artistId: 7,
    year: 2010,
    genre: "pop",
    tracks: [
      { title: "Grenade-ine", durationMs: 222000, features: [] },
      { title: "Just the Way You Aren't", durationMs: 221000, features: [] },
      { title: "The Lazy Bong", durationMs: 193000, features: [] },
      { title: "Marry Brew", durationMs: 207000, features: [] }
    ],
    certification: { status: "platinum", sales: 4500000 },
    ratings: { critic: 66, fan: 8.0 },
    label: "Electra"
  },
  // Ariana Venti
  {
    id: 15,
    title: "thank u, rest",
    artistId: 8,
    year: 2019,
    genre: "pop",
    tracks: [
      { title: "imagine-ation", durationMs: 207000, features: [] },
      { title: "7 rungs", durationMs: 178000, features: [] },
      { title: "thank u, rest", durationMs: 207000, features: [] },
      { title: "break up with your gf, im bored-er", durationMs: 190000, features: [] }
    ],
    certification: { status: "platinum", sales: 3200000 },
    ratings: { critic: 71, fan: 8.4 },
    label: "Republicord"
  },
  {
    id: 16,
    title: "eternal moonshine",
    artistId: 8,
    year: 2024,
    genre: "r&b",
    tracks: [
      { title: "bye-cycle", durationMs: 179000, features: [] },
      { title: "we can't be french fries", durationMs: 196000, features: ["The Weeknight"] },
      { title: "the boy is mine-craft", durationMs: 208000, features: [] },
      { title: "supernatural-ly", durationMs: 229000, features: ["Kendrick Llama"] },
      { title: "imperfect for ewe", durationMs: 218000, features: [] }
    ],
    certification: { status: "gold", sales: 680000 },
    ratings: { critic: 74, fan: 7.8 },
    label: "Republicord"
  },
  // Arijit Singe
  {
    id: 17,
    title: "Heartbreak Sandwich: Vol 1",
    artistId: 9,
    year: 2020,
    genre: "bollywood",
    tracks: [
      { title: "Tum Hi Hoe", durationMs: 261000, features: [] },
      { title: "Channa Masala Mereya", durationMs: 284000, features: [] },
      { title: "Gerua-tine", durationMs: 303000, features: [] },
      { title: "Kabira-cadabra", durationMs: 249000, features: [] },
      { title: "Phir Bhi Tumko Chaahunga-ry", durationMs: 291000, features: [] }
    ],
    certification: { status: "gold", sales: 450000 },
    ratings: { critic: 72, fan: 8.9 },
    label: "T-Cereal Music"
  },
  // Fuerza Refrita
  {
    id: 18,
    title: "Pa Las Baby-sitters y Más",
    artistId: 10,
    year: 2024,
    genre: "regional mexican",
    tracks: [
      { title: "Bichota-ria", durationMs: 182000, features: [] },
      { title: "Sabor a Fresa-dor", durationMs: 198000, features: ["Bad Bunion"] },
      { title: "TQM (Te Quiero Mucho-mango)", durationMs: 207000, features: [] },
      { title: "Igualito a Mi Alpaca", durationMs: 191000, features: [] }
    ],
    certification: { status: "gold", sales: 520000 },
    ratings: { critic: 68, fan: 7.6 },
    label: "Rancho Humilde-r"
  }
];

// ── Format datasets as readable JS for Dataset tab ──────────────────────────

function formatDatasetDisplay() {
  const lines = [];

  // Artists
  lines.push('const artists = [');
  ARTISTS.forEach((a, i) => {
    lines.push('  {');
    lines.push(`    id: ${a.id},`);
    lines.push(`    name: "${a.name}",`);
    lines.push(`    genres: ${JSON.stringify(a.genres)},`);
    lines.push(`    grammyWins: ${a.grammyWins},`);
    lines.push(`    grammyNominations: ${a.grammyNominations},`);
    lines.push(`    activeYears: { start: ${a.activeYears.start}, end: ${a.activeYears.end} },`);
    lines.push(`    origin: { city: "${a.origin.city}", country: "${a.origin.country}" },`);
    lines.push(`    labels: ${JSON.stringify(a.labels)},`);
    lines.push(`    monthlyListeners: ${a.monthlyListeners},`);
    lines.push(`    isActive: ${a.isActive},`);
    lines.push(`    albumIds: ${JSON.stringify(a.albumIds)}`);
    lines.push(`  }${i < ARTISTS.length - 1 ? ',' : ''}`);
  });
  lines.push('];');
  lines.push('');

  // Albums
  lines.push('const albums = [');
  ALBUMS.forEach((al, i) => {
    lines.push('  {');
    lines.push(`    id: ${al.id},`);
    lines.push(`    title: "${al.title}",`);
    lines.push(`    artistId: ${al.artistId},`);
    lines.push(`    year: ${al.year},`);
    lines.push(`    genre: "${al.genre}",`);
    lines.push('    tracks: [');
    al.tracks.forEach((t, j) => {
      const feat = t.features.length > 0 ? `, features: ${JSON.stringify(t.features)}` : ', features: []';
      lines.push(`      { title: "${t.title}", durationMs: ${t.durationMs}${feat} }${j < al.tracks.length - 1 ? ',' : ''}`);
    });
    lines.push('    ],');
    lines.push(`    certification: { status: "${al.certification.status}", sales: ${al.certification.sales} },`);
    lines.push(`    ratings: { critic: ${al.ratings.critic}, fan: ${al.ratings.fan} },`);
    lines.push(`    label: "${al.label}"`);
    lines.push(`  }${i < ALBUMS.length - 1 ? ',' : ''}`);
  });
  lines.push('];');

  return lines.join('\n');
}

const DATASET_DISPLAY = formatDatasetDisplay();
const ARTISTS_JSON = JSON.stringify(ARTISTS);
const ALBUMS_JSON = JSON.stringify(ALBUMS);

// ── Helper: build testRunner string ─────────────────────────────────────────

function tr(fnName, testBody) {
  return `(code) => {\n  const artists = ${ARTISTS_JSON};\n  const albums = ${ALBUMS_JSON};\n  const fn = new Function(code + '; return ${fnName};')();\n${testBody}\n}`;
}

// ── Exercise definitions ────────────────────────────────────────────────────

const exercises = [

  // ── T2 (6 exercises) ──────────────────────────────────────────────────────
  {
    id: 949,
    title: "Music: Get Artist Names",
    tier: 2,
    category: ["api-data", "music"],
    tags: ["arrays", "map", "api-data", "music"],
    description: "Extract all artist names from the dataset using the map method.",
    instructions: "Write a function called `getArtistNames` that takes an array of artist objects and returns an array of their names.\n\nEach artist has a `name` property (string).\n\nExample:\n```\ngetArtistNames(artists)\n// Returns: [\"Bad Bunion\", \"Taylor Drift\", ...]\n```",
    starterCode: "// Return an array of all artist names\nfunction getArtistNames(artists) {\n  \n}",
    solution: "function getArtistNames(artists) {\n  return artists.map(artist => artist.name);\n}",
    hints: [
      "Use .map() to transform each artist object into just the name property.",
      "The callback receives each artist: `artist => artist.name`"
    ],
    resources: [{ label: "MDN: Array.prototype.map()", url: "/docs/mdn/array-map.html" }],
    testRunner: tr('getArtistNames', [
      '  const result = fn(artists);',
      '  return [',
      '    { pass: Array.isArray(result), description: "Returns an array", got: typeof result },',
      '    { pass: result.length === 10, description: "Returns 10 artist names", got: String(result.length) },',
      '    { pass: result[0] === "Bad Bunion", description: \'First artist is "Bad Bunion"\', got: String(result[0]) },',
      '    { pass: result[9] === "Fuerza Refrita", description: \'Last artist is "Fuerza Refrita"\', got: String(result[9]) },',
      '    { pass: result.includes("Kendrick Llama"), description: \'Includes "Kendrick Llama"\', got: String(result.includes("Kendrick Llama")) },',
      '  ];',
    ].join('\n'))
  },
  {
    id: 950,
    title: "Music: Filter Active Artists",
    tier: 2,
    category: ["api-data", "music"],
    tags: ["arrays", "filter", "api-data", "music"],
    description: "Filter to only artists who are currently active.",
    instructions: "Write a function called `getActiveArtists` that takes an array of artist objects and returns only those where `isActive` is `true`.\n\nExample:\n```\ngetActiveArtists(artists)\n// Returns: [{ name: \"Bad Bunion\", ... }, ...]\n```",
    starterCode: "// Return only active artists\nfunction getActiveArtists(artists) {\n  \n}",
    solution: "function getActiveArtists(artists) {\n  return artists.filter(artist => artist.isActive);\n}",
    hints: [
      "Use .filter() to create a new array with only elements that pass a test.",
      "The boolean property itself works as the condition: `artist => artist.isActive`"
    ],
    resources: [{ label: "MDN: Array.prototype.filter()", url: "/docs/mdn/array-filter.html" }],
    testRunner: tr('getActiveArtists', [
      '  const result = fn(artists);',
      '  const inactive = fn([{ name: "Test", isActive: false }, { name: "Test2", isActive: true }]);',
      '  return [',
      '    { pass: Array.isArray(result), description: "Returns an array", got: typeof result },',
      '    { pass: result.length === 10, description: "All 10 artists in dataset are active", got: String(result.length) },',
      '    { pass: result.every(a => a.isActive === true), description: "Every returned artist has isActive: true", got: String(result.every(a => a.isActive)) },',
      '    { pass: inactive.length === 1, description: "Filters out inactive artists from mixed input", got: String(inactive.length) },',
      '    { pass: inactive[0].name === "Test2", description: "Only keeps active artists from mixed input", got: inactive[0] ? inactive[0].name : "undefined" },',
      '  ];',
    ].join('\n'))
  },
  {
    id: 951,
    title: "Music: Get Album Titles",
    tier: 2,
    category: ["api-data", "music"],
    tags: ["arrays", "map", "api-data", "music"],
    description: "Extract all album titles from the albums dataset.",
    instructions: "Write a function called `getAlbumTitles` that takes an array of album objects and returns an array of their titles.\n\nEach album has a `title` property (string).\n\nExample:\n```\ngetAlbumTitles(albums)\n// Returns: [\"DeBÍ TiRAR MáS GaToS\", \"Un Verano Sin WiFi\", ...]\n```",
    starterCode: "// Return an array of all album titles\nfunction getAlbumTitles(albums) {\n  \n}",
    solution: "function getAlbumTitles(albums) {\n  return albums.map(album => album.title);\n}",
    hints: [
      "Use .map() to transform each album object into just the title property.",
      "The callback is: `album => album.title`"
    ],
    resources: [{ label: "MDN: Array.prototype.map()", url: "/docs/mdn/array-map.html" }],
    testRunner: tr('getAlbumTitles', [
      '  const result = fn(albums);',
      '  return [',
      '    { pass: Array.isArray(result), description: "Returns an array", got: typeof result },',
      '    { pass: result.length === 18, description: "Returns 18 album titles", got: String(result.length) },',
      '    { pass: result[0] === "DeBÍ TiRAR MáS GaToS", description: \'First album is "DeBÍ TiRAR MáS GaToS"\', got: String(result[0]) },',
      '    { pass: result.includes("DARN."), description: \'Includes "DARN."\', got: String(result.includes("DARN.")) },',
      '    { pass: result.includes("24 Carrot Magic"), description: \'Includes "24 Carrot Magic"\', got: String(result.includes("24 Carrot Magic")) },',
      '  ];',
    ].join('\n'))
  },
  {
    id: 952,
    title: "Music: Find Artist by Name",
    tier: 2,
    category: ["api-data", "music"],
    tags: ["arrays", "find", "api-data", "music"],
    description: "Locate a specific artist in the dataset by their name.",
    instructions: "Write a function called `findArtist` that takes an array of artist objects and a name string, and returns the artist object with that name. Return `undefined` if not found.\n\nExample:\n```\nfindArtist(artists, \"Billie Eyelash\")\n// Returns: { id: 5, name: \"Billie Eyelash\", genres: [\"alt-pop\", ...], ... }\n```",
    starterCode: "// Find and return the artist with the given name\nfunction findArtist(artists, name) {\n  \n}",
    solution: "function findArtist(artists, name) {\n  return artists.find(artist => artist.name === name);\n}",
    hints: [
      "Use .find() to locate the first element that matches a condition.",
      "Compare the name property: `artist => artist.name === name`"
    ],
    resources: [{ label: "MDN: Array.prototype.find()", url: "/docs/mdn/array-find.html" }],
    testRunner: tr('findArtist', [
      '  const billie = fn(artists, "Billie Eyelash");',
      '  const kendrick = fn(artists, "Kendrick Llama");',
      '  const nobody = fn(artists, "DJ Nobody");',
      '  return [',
      '    { pass: typeof billie === "object", description: "Returns an object for existing artist", got: typeof billie },',
      '    { pass: billie && billie.name === "Billie Eyelash", description: \'Finds "Billie Eyelash"\', got: billie ? billie.name : "undefined" },',
      '    { pass: kendrick && kendrick.grammyWins === 17, description: "Kendrick Llama has 17 Grammy wins", got: kendrick ? String(kendrick.grammyWins) : "undefined" },',
      '    { pass: nobody === undefined, description: "Returns undefined for non-existent artist", got: String(nobody) },',
      '  ];',
    ].join('\n'))
  },
  {
    id: 953,
    title: "Music: Get Origins",
    tier: 2,
    category: ["api-data", "music"],
    tags: ["arrays", "map", "nested-access", "api-data", "music"],
    description: "Extract origin city and country from nested artist objects.",
    instructions: "Write a function called `getOrigins` that takes an array of artist objects and returns an array of strings in the format `\"City, Country\"`.\n\nEach artist has an `origin` property which is an object with `city` and `country`.\n\nExample:\n```\ngetOrigins(artists)\n// Returns: [\"San Huan, Puerto Rico\", \"West Reeding, USA\", ...]\n```",
    starterCode: "// Return an array of \"City, Country\" strings\nfunction getOrigins(artists) {\n  \n}",
    solution: "function getOrigins(artists) {\n  return artists.map(artist => `${artist.origin.city}, ${artist.origin.country}`);\n}",
    hints: [
      "Use .map() to transform each artist. Access the nested origin object to get city and country.",
      "Use template literals to combine: `${artist.origin.city}, ${artist.origin.country}`"
    ],
    resources: [{ label: "MDN: Array.prototype.map()", url: "/docs/mdn/array-map.html" }],
    testRunner: tr('getOrigins', [
      '  const result = fn(artists);',
      '  return [',
      '    { pass: Array.isArray(result), description: "Returns an array", got: typeof result },',
      '    { pass: result.length === 10, description: "Returns 10 origin strings", got: String(result.length) },',
      '    { pass: result[0] === "San Huan, Puerto Rico", description: \'First is "San Huan, Puerto Rico"\', got: String(result[0]) },',
      '    { pass: result.includes("Crampton, USA"), description: \'Includes "Crampton, USA"\', got: String(result.includes("Crampton, USA")) },',
      '    { pass: result.every(s => typeof s === "string" && s.includes(",")), description: "All entries are comma-separated strings", got: String(result.every(s => typeof s === "string" && s.includes(","))) },',
      '  ];',
    ].join('\n'))
  },
  {
    id: 954,
    title: "Music: Albums by Year",
    tier: 2,
    category: ["api-data", "music"],
    tags: ["arrays", "filter", "comparison", "api-data", "music"],
    description: "Filter albums released in or after a given year.",
    instructions: "Write a function called `albumsSince` that takes an array of album objects and a year number, and returns albums released in that year or later.\n\nExample:\n```\nalbumsSince(albums, 2020)\n// Returns albums from 2020, 2022, 2024, and 2025\n```",
    starterCode: "// Return albums released in the given year or later\nfunction albumsSince(albums, year) {\n  \n}",
    solution: "function albumsSince(albums, year) {\n  return albums.filter(album => album.year >= year);\n}",
    hints: [
      "Use .filter() with a comparison on the year property.",
      "The condition checks: `album.year >= year`"
    ],
    resources: [{ label: "MDN: Array.prototype.filter()", url: "/docs/mdn/array-filter.html" }],
    testRunner: (() => {
      const since2020 = ALBUMS.filter(a => a.year >= 2020).length;
      const since2024 = ALBUMS.filter(a => a.year >= 2024).length;
      const since2030 = ALBUMS.filter(a => a.year >= 2030).length;
      return tr('albumsSince', [
        '  const r1 = fn(albums, 2020);',
        '  const r2 = fn(albums, 2024);',
        '  const r3 = fn(albums, 2030);',
        '  return [',
        '    { pass: Array.isArray(r1), description: "Returns an array", got: typeof r1 },',
        `    { pass: r1.length === ${since2020}, description: "${since2020} albums since 2020", got: String(r1.length) },`,
        `    { pass: r2.length === ${since2024}, description: "${since2024} albums since 2024", got: String(r2.length) },`,
        `    { pass: r3.length === ${since2030}, description: "0 albums since 2030", got: String(r3.length) },`,
        '    { pass: r1.every(a => a.year >= 2020), description: "All returned albums are from 2020+", got: String(r1.every(a => a.year >= 2020)) },',
        '  ];',
      ].join('\n'));
    })()
  },

  // ── T3 (7 exercises) ──────────────────────────────────────────────────────
  {
    id: 955,
    title: "Music: Artist Grammy Summary",
    tier: 3,
    category: ["api-data", "music"],
    tags: ["arrays", "map", "nested-access", "api-data", "music"],
    description: "Build summary objects with artist names and Grammy stats.",
    instructions: "Write a function called `grammySummary` that takes an array of artist objects and returns an array of objects with:\n- `name`: the artist's name\n- `wins`: their Grammy wins\n- `nominations`: their Grammy nominations\n- `winRate`: wins divided by nominations, rounded to 2 decimal places (or 0 if no nominations)\n\nExample:\n```\ngrammySummary(artists)\n// Returns: [{ name: \"Bad Bunion\", wins: 3, nominations: 18, winRate: 0.17 }, ...]\n```",
    starterCode: "/**\n * @param {Object[]} artists - Array of artist objects\n * @returns {Object[]} Array of { name, wins, nominations, winRate }\n */\nfunction grammySummary(artists) {\n  \n}",
    solution: "function grammySummary(artists) {\n  return artists.map(a => ({\n    name: a.name,\n    wins: a.grammyWins,\n    nominations: a.grammyNominations,\n    winRate: a.grammyNominations > 0 ? Math.round((a.grammyWins / a.grammyNominations) * 100) / 100 : 0\n  }));\n}",
    hints: [
      "Use .map() to transform each artist into a new object with the four required properties.",
      "For winRate, divide wins by nominations and use `Math.round(value * 100) / 100` to get 2 decimal places. Handle the zero-nominations edge case."
    ],
    resources: [
      { label: "MDN: Array.prototype.map()", url: "/docs/mdn/array-map.html" },
      { label: "MDN: Math.round()", url: "/docs/mdn/math-round.html" }
    ],
    testRunner: (() => {
      const badBunionRate = Math.round((3 / 18) * 100) / 100;
      const kendrickRate = Math.round((17 / 55) * 100) / 100;
      return tr('grammySummary', [
        '  const result = fn(artists);',
        '  const zeroNoms = fn([{ name: "Test", grammyWins: 0, grammyNominations: 0 }]);',
        '  return [',
        '    { pass: Array.isArray(result) && result.length === 10, description: "Returns array of 10 summaries", got: Array.isArray(result) ? String(result.length) : typeof result },',
        `    { pass: result[0] && result[0].name === "Bad Bunion" && result[0].winRate === ${badBunionRate}, description: 'Bad Bunion winRate is ${badBunionRate}', got: result[0] ? String(result[0].winRate) : "undefined" },`,
        `    { pass: result[5] && result[5].wins === 17, description: "Kendrick Llama has 17 wins", got: result[5] ? String(result[5].wins) : "undefined" },`,
        `    { pass: result[5] && result[5].winRate === ${kendrickRate}, description: 'Kendrick Llama winRate is ${kendrickRate}', got: result[5] ? String(result[5].winRate) : "undefined" },`,
        '    { pass: zeroNoms[0] && zeroNoms[0].winRate === 0, description: "Handles 0 nominations (winRate is 0)", got: zeroNoms[0] ? String(zeroNoms[0].winRate) : "undefined" },',
        '  ];',
      ].join('\n'));
    })()
  },
  {
    id: 956,
    title: "Music: Albums for Artist",
    tier: 3,
    category: ["api-data", "music"],
    tags: ["arrays", "filter", "cross-reference", "api-data", "music"],
    description: "Find all albums belonging to a specific artist using cross-referencing.",
    instructions: "Write a function called `getArtistAlbums` that takes the `artists` array, the `albums` array, and an artist name string. It should find the artist by name, then return all albums whose `artistId` matches that artist's `id`.\n\nReturn an empty array if the artist is not found.\n\nExample:\n```\ngetArtistAlbums(artists, albums, \"Billie Eyelash\")\n// Returns: [{ title: \"HIT ME HARD AND GENTLY\", ... }, { title: \"When We All Fall Asleep...\", ... }]\n```",
    starterCode: "/**\n * @param {Object[]} artists - Array of artist objects\n * @param {Object[]} albums - Array of album objects\n * @param {string} artistName - Name of the artist\n * @returns {Object[]} Albums belonging to that artist\n */\nfunction getArtistAlbums(artists, albums, artistName) {\n  \n}",
    solution: "function getArtistAlbums(artists, albums, artistName) {\n  const artist = artists.find(a => a.name === artistName);\n  if (!artist) return [];\n  return albums.filter(album => album.artistId === artist.id);\n}",
    hints: [
      "First use .find() to locate the artist by name. Then use .filter() on the albums array to match by artistId.",
      "The cross-reference link is: `album.artistId === artist.id`. Don't forget to handle the case where the artist isn't found."
    ],
    resources: [
      { label: "MDN: Array.prototype.find()", url: "/docs/mdn/array-find.html" },
      { label: "MDN: Array.prototype.filter()", url: "/docs/mdn/array-filter.html" }
    ],
    testRunner: tr('getArtistAlbums', [
      '  const billie = fn(artists, albums, "Billie Eyelash");',
      '  const bad = fn(artists, albums, "Bad Bunion");',
      '  const nobody = fn(artists, albums, "DJ Nobody");',
      '  return [',
      '    { pass: Array.isArray(billie), description: "Returns an array", got: typeof billie },',
      '    { pass: billie.length === 2, description: "Billie Eyelash has 2 albums", got: String(billie.length) },',
      '    { pass: billie[0] && billie[0].title === "HIT ME HARD AND GENTLY", description: \'First Billie album is "HIT ME HARD AND GENTLY"\', got: billie[0] ? billie[0].title : "undefined" },',
      '    { pass: bad.length === 2, description: "Bad Bunion has 2 albums", got: String(bad.length) },',
      '    { pass: nobody.length === 0, description: "Returns empty array for unknown artist", got: String(nobody.length) },',
      '  ];',
    ].join('\n'))
  },
  {
    id: 957,
    title: "Music: Total Track Count",
    tier: 3,
    category: ["api-data", "music"],
    tags: ["arrays", "reduce", "nested-access", "api-data", "music"],
    description: "Calculate the total number of tracks across all albums.",
    instructions: "Write a function called `totalTracks` that takes an array of album objects and returns the total number of tracks across all albums.\n\nEach album has a `tracks` array containing track objects.\n\nExample:\n```\ntotalTracks(albums) // Returns: 94\n```",
    starterCode: "/**\n * @param {Object[]} albums - Array of album objects\n * @returns {number} Total number of tracks across all albums\n */\nfunction totalTracks(albums) {\n  \n}",
    solution: "function totalTracks(albums) {\n  return albums.reduce((total, album) => total + album.tracks.length, 0);\n}",
    hints: [
      "Use .reduce() to accumulate a running total. Each album's tracks array has a .length you can add.",
      "The accumulator starts at 0: `.reduce((total, album) => total + album.tracks.length, 0)`"
    ],
    resources: [{ label: "MDN: Array.prototype.reduce()", url: "/docs/mdn/array-reduce.html" }],
    testRunner: (() => {
      const total = ALBUMS.reduce((t, a) => t + a.tracks.length, 0);
      return tr('totalTracks', [
        '  const result = fn(albums);',
        '  const subset = fn([albums[0], albums[1]]);',
        `  const expectedSubset = ${ALBUMS[0].tracks.length} + ${ALBUMS[1].tracks.length};`,
        '  return [',
        '    { pass: typeof result === "number", description: "Returns a number", got: typeof result },',
        `    { pass: result === ${total}, description: "Total tracks across all albums is ${total}", got: String(result) },`,
        '    { pass: subset === expectedSubset, description: "Works with subset of albums", got: String(subset) },',
        '    { pass: fn([]) === 0, description: "Returns 0 for empty array", got: String(fn([])) },',
        '  ];',
      ].join('\n'));
    })()
  },
  {
    id: 958,
    title: "Music: Diamond Albums",
    tier: 3,
    category: ["api-data", "music"],
    tags: ["arrays", "filter", "map", "nested-access", "api-data", "music"],
    description: "Find album titles that achieved diamond certification.",
    instructions: "Write a function called `diamondAlbums` that takes an array of album objects and returns an array of title strings for albums where `certification.status` is `\"diamond\"`.\n\nExample:\n```\ndiamondAlbums(albums)\n// Returns: [\"Un Verano Sin WiFi\", \"1889\", ...]\n```",
    starterCode: "/**\n * @param {Object[]} albums - Array of album objects\n * @returns {string[]} Titles of diamond-certified albums\n */\nfunction diamondAlbums(albums) {\n  \n}",
    solution: "function diamondAlbums(albums) {\n  return albums.filter(a => a.certification.status === \"diamond\").map(a => a.title);\n}",
    hints: [
      "Chain .filter() and .map() — first filter to diamond albums, then map to just their titles.",
      "Access nested certification: `album.certification.status === \"diamond\"`"
    ],
    resources: [
      { label: "MDN: Array.prototype.filter()", url: "/docs/mdn/array-filter.html" },
      { label: "MDN: Array.prototype.map()", url: "/docs/mdn/array-map.html" }
    ],
    testRunner: (() => {
      const diamonds = ALBUMS.filter(a => a.certification.status === 'diamond');
      const titles = diamonds.map(a => a.title);
      return tr('diamondAlbums', [
        '  const result = fn(albums);',
        '  return [',
        '    { pass: Array.isArray(result), description: "Returns an array", got: typeof result },',
        `    { pass: result.length === ${diamonds.length}, description: "${diamonds.length} albums are diamond certified", got: String(result.length) },`,
        `    { pass: result.includes("${titles[0]}"), description: 'Includes "${titles[0]}"', got: String(result.includes("${titles[0]}")) },`,
        '    { pass: result.every(t => typeof t === "string"), description: "All entries are strings (titles only)", got: String(result.every(t => typeof t === "string")) },',
        `    { pass: !result.includes("24 Carrot Magic"), description: 'Does not include platinum album "24 Carrot Magic"', got: String(!result.includes("24 Carrot Magic")) },`,
        '  ];',
      ].join('\n'));
    })()
  },
  {
    id: 959,
    title: "Music: Featured Artists",
    tier: 3,
    category: ["api-data", "music"],
    tags: ["arrays", "flatMap", "filter", "nested-access", "api-data", "music"],
    description: "Extract all unique featured artist names from album tracks.",
    instructions: "Write a function called `getFeaturedArtists` that takes an array of album objects and returns an array of unique artist names that appear as features on any track.\n\nEach track has a `features` array of artist name strings (may be empty).\n\nExample:\n```\ngetFeaturedArtists(albums)\n// Returns: [\"Quake\", \"Fuerza Refrita\", \"The Weeknight\", ...]\n```",
    starterCode: "/**\n * @param {Object[]} albums - Array of album objects\n * @returns {string[]} Unique featured artist names\n */\nfunction getFeaturedArtists(albums) {\n  \n}",
    solution: "function getFeaturedArtists(albums) {\n  const allFeatures = albums.flatMap(album => album.tracks.flatMap(track => track.features));\n  return [...new Set(allFeatures)];\n}",
    hints: [
      "Use .flatMap() to flatten nested arrays. You need to go two levels deep: albums → tracks → features.",
      "Remove duplicates with `[...new Set(array)]` or by checking with .includes() before adding."
    ],
    resources: [
      { label: "MDN: Array.prototype.flatMap()", url: "/docs/mdn/array-flatmap.html" },
      { label: "MDN: Set", url: "/docs/mdn/set.html" }
    ],
    testRunner: (() => {
      const allFeats = ALBUMS.flatMap(a => a.tracks.flatMap(t => t.features));
      const unique = [...new Set(allFeats)];
      return tr('getFeaturedArtists', [
        '  const result = fn(albums);',
        '  return [',
        '    { pass: Array.isArray(result), description: "Returns an array", got: typeof result },',
        `    { pass: result.length === ${unique.length}, description: "${unique.length} unique featured artists", got: String(result.length) },`,
        '    { pass: result.includes("Quake"), description: \'Includes "Quake"\', got: String(result.includes("Quake")) },',
        '    { pass: result.includes("The Weeknight"), description: \'Includes "The Weeknight"\', got: String(result.includes("The Weeknight")) },',
        '    { pass: result.includes("Kendrick Llama"), description: \'Includes "Kendrick Llama"\', got: String(result.includes("Kendrick Llama")) },',
        `    { pass: new Set(result).size === result.length, description: "All names are unique (no duplicates)", got: "unique: " + new Set(result).size + ", total: " + result.length },`,
        '  ];',
      ].join('\n'));
    })()
  },
  {
    id: 960,
    title: "Music: Sort by Listeners",
    tier: 3,
    category: ["api-data", "music"],
    tags: ["arrays", "sort", "map", "api-data", "music"],
    description: "Sort artists by monthly listeners and return their names.",
    instructions: "Write a function called `sortByListeners` that takes an array of artist objects and returns an array of artist name strings, sorted from most to fewest monthly listeners.\n\nExample:\n```\nsortByListeners(artists)\n// Returns: [\"Taylor Drift\", \"Bad Bunion\", ...]\n```",
    starterCode: "/**\n * @param {Object[]} artists - Array of artist objects\n * @returns {string[]} Artist names sorted by listeners (descending)\n */\nfunction sortByListeners(artists) {\n  \n}",
    solution: "function sortByListeners(artists) {\n  return [...artists].sort((a, b) => b.monthlyListeners - a.monthlyListeners).map(a => a.name);\n}",
    hints: [
      "Sort using a compare function that compares monthlyListeners. Use spread to avoid mutating the original array.",
      "For descending order: `(a, b) => b.monthlyListeners - a.monthlyListeners`. Chain .map() after .sort() to get just names."
    ],
    resources: [
      { label: "MDN: Array.prototype.sort()", url: "/docs/mdn/array-sort.html" },
      { label: "MDN: Array.prototype.map()", url: "/docs/mdn/array-map.html" }
    ],
    testRunner: (() => {
      const sorted = [...ARTISTS].sort((a, b) => b.monthlyListeners - a.monthlyListeners);
      return tr('sortByListeners', [
        '  const result = fn(artists);',
        '  return [',
        '    { pass: Array.isArray(result), description: "Returns an array", got: typeof result },',
        '    { pass: result.length === 10, description: "Returns 10 names", got: String(result.length) },',
        `    { pass: result[0] === "${sorted[0].name}", description: 'Most listeners: "${sorted[0].name}"', got: String(result[0]) },`,
        `    { pass: result[9] === "${sorted[9].name}", description: 'Fewest listeners: "${sorted[9].name}"', got: String(result[9]) },`,
        '    { pass: result.every(n => typeof n === "string"), description: "All entries are strings", got: String(result.every(n => typeof n === "string")) },',
        '  ];',
      ].join('\n'));
    })()
  },
  {
    id: 961,
    title: "Music: Average Album Rating",
    tier: 3,
    category: ["api-data", "music"],
    tags: ["arrays", "reduce", "math", "nested-access", "api-data", "music"],
    description: "Calculate the average fan rating across all albums.",
    instructions: "Write a function called `avgFanRating` that takes an array of album objects and returns the average `ratings.fan` value, rounded to 1 decimal place.\n\nExample:\n```\navgFanRating(albums) // Returns: 8.5\n```",
    starterCode: "/**\n * @param {Object[]} albums - Array of album objects\n * @returns {number} Average fan rating rounded to 1 decimal\n */\nfunction avgFanRating(albums) {\n  \n}",
    solution: "function avgFanRating(albums) {\n  const sum = albums.reduce((total, album) => total + album.ratings.fan, 0);\n  return Math.round((sum / albums.length) * 10) / 10;\n}",
    hints: [
      "Use .reduce() to sum all fan ratings, then divide by the array length.",
      "Round to 1 decimal place: `Math.round(value * 10) / 10`"
    ],
    resources: [{ label: "MDN: Array.prototype.reduce()", url: "/docs/mdn/array-reduce.html" }],
    testRunner: (() => {
      const sum = ALBUMS.reduce((t, a) => t + a.ratings.fan, 0);
      const avg = Math.round((sum / ALBUMS.length) * 10) / 10;
      return tr('avgFanRating', [
        '  const result = fn(albums);',
        '  const subset = fn([albums[0], albums[1]]);',
        `  const expectedSubset = Math.round((${ALBUMS[0].ratings.fan} + ${ALBUMS[1].ratings.fan}) / 2 * 10) / 10;`,
        '  return [',
        '    { pass: typeof result === "number", description: "Returns a number", got: typeof result },',
        `    { pass: result === ${avg}, description: "Average fan rating is ${avg}", got: String(result) },`,
        '    { pass: subset === expectedSubset, description: "Works with subset of albums", got: String(subset) + " (expected " + expectedSubset + ")" },',
        '  ];',
      ].join('\n'));
    })()
  },

  // ── T4 (4 exercises) ──────────────────────────────────────────────────────
  {
    id: 962,
    title: "Music: Artist Discography Report",
    tier: 4,
    category: ["api-data", "music"],
    tags: ["arrays", "reduce", "cross-reference", "data-transformation", "api-data", "music"],
    description: "Build a discography report for each artist by cross-referencing both datasets.",
    instructions: "Write a function called `discographyReport` that takes the `artists` and `albums` arrays and returns an array of objects, one per artist, with:\n- `name`: artist name\n- `albumCount`: number of albums\n- `totalTracks`: total tracks across all their albums\n- `totalSales`: sum of `certification.sales` across all their albums\n- `topAlbum`: title of their album with the highest `ratings.fan` score\n\nSort the result by `totalSales` descending.\n\nExample:\n```\ndiscographyReport(artists, albums)\n// Returns: [{ name: \"Bad Bunion\", albumCount: 2, totalTracks: 11, totalSales: 11700000, topAlbum: \"Un Verano Sin WiFi\" }, ...]\n```",
    starterCode: "",
    solution: "function discographyReport(artists, albums) {\n  return artists.map(artist => {\n    const artistAlbums = albums.filter(a => a.artistId === artist.id);\n    const totalTracks = artistAlbums.reduce((sum, a) => sum + a.tracks.length, 0);\n    const totalSales = artistAlbums.reduce((sum, a) => sum + a.certification.sales, 0);\n    const topAlbum = artistAlbums.reduce((best, a) => a.ratings.fan > best.ratings.fan ? a : best);\n    return {\n      name: artist.name,\n      albumCount: artistAlbums.length,\n      totalTracks,\n      totalSales,\n      topAlbum: topAlbum.title\n    };\n  }).sort((a, b) => b.totalSales - a.totalSales);\n}",
    hints: [
      "For each artist, filter albums by artistId. Then use .reduce() to calculate totalTracks, totalSales, and find the topAlbum.",
      "After building the objects with .map(), chain .sort() to order by totalSales descending."
    ],
    resources: [
      { label: "MDN: Array.prototype.reduce()", url: "/docs/mdn/array-reduce.html" },
      { label: "MDN: Array.prototype.sort()", url: "/docs/mdn/array-sort.html" }
    ],
    testRunner: (() => {
      const report = ARTISTS.map(artist => {
        const aa = ALBUMS.filter(a => a.artistId === artist.id);
        const tt = aa.reduce((s, a) => s + a.tracks.length, 0);
        const ts = aa.reduce((s, a) => s + a.certification.sales, 0);
        const top = aa.reduce((b, a) => a.ratings.fan > b.ratings.fan ? a : b);
        return { name: artist.name, albumCount: aa.length, totalTracks: tt, totalSales: ts, topAlbum: top.title };
      }).sort((a, b) => b.totalSales - a.totalSales);
      return tr('discographyReport', [
        '  const result = fn(artists, albums);',
        '  return [',
        '    { pass: Array.isArray(result) && result.length === 10, description: "Returns array of 10 artist reports", got: Array.isArray(result) ? String(result.length) : typeof result },',
        `    { pass: result[0] && result[0].name === "${report[0].name}", description: 'Highest sales artist is "${report[0].name}"', got: result[0] ? result[0].name : "undefined" },`,
        `    { pass: result[0] && result[0].totalSales === ${report[0].totalSales}, description: "Top artist totalSales is ${report[0].totalSales.toLocaleString()}", got: result[0] ? String(result[0].totalSales) : "undefined" },`,
        `    { pass: result[0] && result[0].totalTracks === ${report[0].totalTracks}, description: "Top artist totalTracks is ${report[0].totalTracks}", got: result[0] ? String(result[0].totalTracks) : "undefined" },`,
        `    { pass: result[0] && result[0].topAlbum === "${report[0].topAlbum}", description: 'Top artist\\'s top album is "${report[0].topAlbum}"', got: result[0] ? result[0].topAlbum : "undefined" },`,
        `    { pass: result[9] && result[9].name === "${report[9].name}", description: 'Lowest sales artist is "${report[9].name}"', got: result[9] ? result[9].name : "undefined" },`,
        '  ];',
      ].join('\n'));
    })()
  },
  {
    id: 963,
    title: "Music: Genre Breakdown",
    tier: 4,
    category: ["api-data", "music"],
    tags: ["arrays", "reduce", "aggregation", "api-data", "music"],
    description: "Build a genre breakdown mapping each genre to its artist count and total listeners.",
    instructions: "Write a function called `genreBreakdown` that takes an array of artist objects and returns an object where each key is a genre and the value is an object with:\n- `artistCount`: number of artists in that genre\n- `totalListeners`: sum of `monthlyListeners` for artists in that genre\n\nNote: artists can have multiple genres, so they may appear in more than one entry.\n\nExample:\n```\ngenreBreakdown(artists)\n// Returns: {\n//   \"pop\": { artistCount: 3, totalListeners: 221000000 },\n//   \"hip-hop\": { artistCount: 2, totalListeners: 129300000 },\n//   ...\n// }\n```",
    starterCode: "",
    solution: "function genreBreakdown(artists) {\n  return artists.reduce((breakdown, artist) => {\n    artist.genres.forEach(genre => {\n      if (!breakdown[genre]) {\n        breakdown[genre] = { artistCount: 0, totalListeners: 0 };\n      }\n      breakdown[genre].artistCount++;\n      breakdown[genre].totalListeners += artist.monthlyListeners;\n    });\n    return breakdown;\n  }, {});\n}",
    hints: [
      "Use .reduce() with an object accumulator. For each artist, loop through their genres array and update the counts.",
      "Initialize each genre key with `{ artistCount: 0, totalListeners: 0 }` the first time you see it, then increment."
    ],
    resources: [{ label: "MDN: Array.prototype.reduce()", url: "/docs/mdn/array-reduce.html" }],
    testRunner: (() => {
      const bd = ARTISTS.reduce((b, a) => {
        a.genres.forEach(g => {
          if (!b[g]) b[g] = { artistCount: 0, totalListeners: 0 };
          b[g].artistCount++;
          b[g].totalListeners += a.monthlyListeners;
        });
        return b;
      }, {});
      const popCount = bd['pop'] ? bd['pop'].artistCount : 0;
      const popListeners = bd['pop'] ? bd['pop'].totalListeners : 0;
      const hiphopCount = bd['hip-hop'] ? bd['hip-hop'].artistCount : 0;
      const genreCount = Object.keys(bd).length;
      return tr('genreBreakdown', [
        '  const result = fn(artists);',
        '  return [',
        '    { pass: typeof result === "object" && !Array.isArray(result), description: "Returns an object", got: typeof result },',
        `    { pass: Object.keys(result).length === ${genreCount}, description: "${genreCount} unique genres", got: String(Object.keys(result).length) },`,
        `    { pass: result.pop && result.pop.artistCount === ${popCount}, description: "Pop has ${popCount} artists", got: result.pop ? String(result.pop.artistCount) : "undefined" },`,
        `    { pass: result.pop && result.pop.totalListeners === ${popListeners}, description: "Pop totalListeners is ${popListeners.toLocaleString()}", got: result.pop ? String(result.pop.totalListeners) : "undefined" },`,
        `    { pass: result["hip-hop"] && result["hip-hop"].artistCount === ${hiphopCount}, description: "Hip-hop has ${hiphopCount} artists", got: result["hip-hop"] ? String(result["hip-hop"].artistCount) : "undefined" },`,
        '  ];',
      ].join('\n'));
    })()
  },
  {
    id: 964,
    title: "Music: Label Portfolio",
    tier: 4,
    category: ["api-data", "music"],
    tags: ["arrays", "reduce", "cross-reference", "aggregation", "api-data", "music"],
    description: "Build a portfolio for each record label with their artists and album sales.",
    instructions: "Write a function called `labelPortfolio` that takes the `artists` and `albums` arrays and returns an object where each key is a label name and the value is an object with:\n- `artists`: array of unique artist names signed to that label\n- `albumCount`: total number of albums released on that label\n- `totalSales`: sum of `certification.sales` for albums on that label\n\nLabels appear in both `artist.labels[]` and `album.label` (use album.label for counting albums and sales).\n\nExample:\n```\nlabelPortfolio(artists, albums)\n// Returns: {\n//   \"Rimas\": { artists: [\"Bad Bunion\"], albumCount: 2, totalSales: 11700000 },\n//   ...\n// }\n```",
    starterCode: "",
    solution: "function labelPortfolio(artists, albums) {\n  const portfolio = {};\n  artists.forEach(artist => {\n    artist.labels.forEach(label => {\n      if (!portfolio[label]) portfolio[label] = { artists: [], albumCount: 0, totalSales: 0 };\n      if (!portfolio[label].artists.includes(artist.name)) {\n        portfolio[label].artists.push(artist.name);\n      }\n    });\n  });\n  albums.forEach(album => {\n    if (!portfolio[album.label]) portfolio[album.label] = { artists: [], albumCount: 0, totalSales: 0 };\n    portfolio[album.label].albumCount++;\n    portfolio[album.label].totalSales += album.certification.sales;\n  });\n  return portfolio;\n}",
    hints: [
      "Process in two passes: first loop through artists to populate each label with its artist names, then loop through albums to add album counts and sales.",
      "Use an object as an accumulator. For each label, track unique artists (check with .includes()), and count albums separately using album.label."
    ],
    resources: [{ label: "MDN: Array.prototype.reduce()", url: "/docs/mdn/array-reduce.html" }],
    testRunner: (() => {
      const port = {};
      ARTISTS.forEach(a => {
        a.labels.forEach(l => {
          if (!port[l]) port[l] = { artists: [], albumCount: 0, totalSales: 0 };
          if (!port[l].artists.includes(a.name)) port[l].artists.push(a.name);
        });
      });
      ALBUMS.forEach(a => {
        if (!port[a.label]) port[a.label] = { artists: [], albumCount: 0, totalSales: 0 };
        port[a.label].albumCount++;
        port[a.label].totalSales += a.certification.sales;
      });
      const labelCount = Object.keys(port).length;
      const rimasSales = port['Rimas'] ? port['Rimas'].totalSales : 0;
      const rimasAlbums = port['Rimas'] ? port['Rimas'].albumCount : 0;
      return tr('labelPortfolio', [
        '  const result = fn(artists, albums);',
        '  return [',
        '    { pass: typeof result === "object" && !Array.isArray(result), description: "Returns an object", got: typeof result },',
        `    { pass: Object.keys(result).length >= ${labelCount - 2}, description: "Contains label entries", got: String(Object.keys(result).length) },`,
        `    { pass: result["Rimas"] && result["Rimas"].albumCount === ${rimasAlbums}, description: "Rimas has ${rimasAlbums} albums", got: result["Rimas"] ? String(result["Rimas"].albumCount) : "undefined" },`,
        `    { pass: result["Rimas"] && result["Rimas"].totalSales === ${rimasSales}, description: "Rimas totalSales is ${rimasSales.toLocaleString()}", got: result["Rimas"] ? String(result["Rimas"].totalSales) : "undefined" },`,
        '    { pass: result["Rimas"] && result["Rimas"].artists.includes("Bad Bunion"), description: \'Rimas artists includes "Bad Bunion"\', got: result["Rimas"] ? JSON.stringify(result["Rimas"].artists) : "undefined" },',
        '  ];',
      ].join('\n'));
    })()
  },
  {
    id: 965,
    title: "Music: Full Streaming Analysis",
    tier: 4,
    category: ["api-data", "music"],
    tags: ["arrays", "reduce", "cross-reference", "data-transformation", "aggregation", "api-data", "music"],
    description: "Build a comprehensive streaming platform analysis from both datasets.",
    instructions: "Create a function called `streamingAnalysis` that takes the `artists` and `albums` arrays and returns an object with:\n- `totalArtists`: number of artists\n- `totalAlbums`: number of albums\n- `totalTracks`: total tracks across all albums\n- `avgListeners`: average monthlyListeners across all artists (rounded to nearest integer)\n- `mostGrammys`: `{ name, wins }` of the artist with the most Grammy wins\n- `highestRated`: `{ title, artist, fan }` of the album with the highest fan rating (include the artist name by looking up artistId)\n- `certificationCounts`: object mapping certification status to count of albums (e.g., `{ diamond: 4, platinum: 10, gold: 4 }`)\n\nExample:\n```\nstreamingAnalysis(artists, albums)\n// Returns: { totalArtists: 10, totalAlbums: 18, ... }\n```",
    starterCode: "",
    solution: "function streamingAnalysis(artists, albums) {\n  const totalTracks = albums.reduce((sum, a) => sum + a.tracks.length, 0);\n  const avgListeners = Math.round(artists.reduce((sum, a) => sum + a.monthlyListeners, 0) / artists.length);\n  const mostGrammys = artists.reduce((best, a) => a.grammyWins > best.grammyWins ? a : best);\n  const highestRatedAlbum = albums.reduce((best, a) => a.ratings.fan > best.ratings.fan ? a : best);\n  const hrArtist = artists.find(a => a.id === highestRatedAlbum.artistId);\n  const certificationCounts = albums.reduce((counts, a) => {\n    counts[a.certification.status] = (counts[a.certification.status] || 0) + 1;\n    return counts;\n  }, {});\n  return {\n    totalArtists: artists.length,\n    totalAlbums: albums.length,\n    totalTracks,\n    avgListeners,\n    mostGrammys: { name: mostGrammys.name, wins: mostGrammys.grammyWins },\n    highestRated: { title: highestRatedAlbum.title, artist: hrArtist.name, fan: highestRatedAlbum.ratings.fan },\n    certificationCounts\n  };\n}",
    hints: [
      "Break this into parts: count totals, calculate averages, find maximums with .reduce(), and build certification counts. The highestRated requires cross-referencing albums back to artists.",
      "For highestRated, first find the album with the max ratings.fan, then use artists.find() to look up the artist name from the album's artistId."
    ],
    resources: [{ label: "MDN: Array.prototype.reduce()", url: "/docs/mdn/array-reduce.html" }],
    testRunner: (() => {
      const totalTracks = ALBUMS.reduce((s, a) => s + a.tracks.length, 0);
      const avgList = Math.round(ARTISTS.reduce((s, a) => s + a.monthlyListeners, 0) / ARTISTS.length);
      const mostG = ARTISTS.reduce((b, a) => a.grammyWins > b.grammyWins ? a : b);
      const hrAlbum = ALBUMS.reduce((b, a) => a.ratings.fan > b.ratings.fan ? a : b);
      const hrArtist = ARTISTS.find(a => a.id === hrAlbum.artistId);
      const certs = ALBUMS.reduce((c, a) => { c[a.certification.status] = (c[a.certification.status] || 0) + 1; return c; }, {});
      return tr('streamingAnalysis', [
        '  const result = fn(artists, albums);',
        '  return [',
        '    { pass: typeof result === "object" && !Array.isArray(result), description: "Returns an object", got: typeof result },',
        '    { pass: result.totalArtists === 10, description: "totalArtists is 10", got: String(result.totalArtists) },',
        '    { pass: result.totalAlbums === 18, description: "totalAlbums is 18", got: String(result.totalAlbums) },',
        `    { pass: result.totalTracks === ${totalTracks}, description: "totalTracks is ${totalTracks}", got: String(result.totalTracks) },`,
        `    { pass: result.avgListeners === ${avgList}, description: "avgListeners is ${avgList.toLocaleString()}", got: String(result.avgListeners) },`,
        `    { pass: result.mostGrammys && result.mostGrammys.name === "${mostG.name}", description: 'mostGrammys is "${mostG.name}"', got: result.mostGrammys ? result.mostGrammys.name : "undefined" },`,
        `    { pass: result.highestRated && result.highestRated.title === "${hrAlbum.title}", description: 'highestRated album is "${hrAlbum.title}"', got: result.highestRated ? result.highestRated.title : "undefined" },`,
        `    { pass: result.highestRated && result.highestRated.artist === "${hrArtist.name}", description: 'highestRated artist is "${hrArtist.name}"', got: result.highestRated ? result.highestRated.artist : "undefined" },`,
        `    { pass: result.certificationCounts && result.certificationCounts.diamond === ${certs.diamond}, description: "${certs.diamond} diamond albums", got: result.certificationCounts ? String(result.certificationCounts.diamond) : "undefined" },`,
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

console.log(`\nPop Culture APIs — Music Theme`);
console.log(`================================`);
console.log(`  Exercises: ${exercises.length}`);
console.log(`  T2: ${exercises.filter(e => e.tier === 2).length}`);
console.log(`  T3: ${exercises.filter(e => e.tier === 3).length}`);
console.log(`  T4: ${exercises.filter(e => e.tier === 4).length}`);
console.log(`  ID range: ${exercises[0].id}–${exercises[exercises.length - 1].id}`);
console.log(`  Artists: ${ARTISTS.length}, Albums: ${ALBUMS.length}`);
console.log(`  Appended to: ${outPath}`);
console.log(`  Total collection exercises: ${existing.exercises.length}`);
