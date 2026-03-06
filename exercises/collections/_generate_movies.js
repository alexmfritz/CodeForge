/**
 * Generates the Movies theme exercises for the Pop Culture APIs collection.
 * Run: node exercises/collections/_generate_movies.js
 * Output: exercises/collections/pop-culture-apis.json
 */

const fs = require('fs');
const path = require('path');

// ── Movie Dataset (12 movies, punny parody names) ────────────────────────────

const MOVIES = [
  {
    id: 1,
    title: "The Shawshank Exemption",
    year: 1994,
    rated: "R",
    runtime: 142,
    genres: ["drama"],
    director: { name: "Frank Darabonk", birthYear: 1959 },
    cast: [
      { name: "Tim Bobbins", role: "Andy Duframe", billing: 1, oscarsWon: 0 },
      { name: "Morgan Freebird", role: "Red", billing: 2, oscarsWon: 1 }
    ],
    ratings: { imdb: 9.3, rottenTomatoes: 91, metacritic: 82 },
    boxOffice: { budget: 25000000, domestic: 28300000, international: 30000000 },
    awards: { wins: 21, nominations: 43, oscarsWon: 0 },
    streaming: ["Netflax", "Primal Video"],
    inTheaters: false
  },
  {
    id: 2,
    title: "The Codfather",
    year: 1972,
    rated: "R",
    runtime: 175,
    genres: ["crime", "drama"],
    director: { name: "Francis Ford Cappuccino", birthYear: 1939 },
    cast: [
      { name: "Marlon Branflakes", role: "Vito Cantaloupe", billing: 1, oscarsWon: 2 },
      { name: "Al Pacheeto", role: "Michael Cantaloupe", billing: 2, oscarsWon: 1 }
    ],
    ratings: { imdb: 9.2, rottenTomatoes: 97, metacritic: 100 },
    boxOffice: { budget: 6000000, domestic: 134966411, international: 110000000 },
    awards: { wins: 28, nominations: 31, oscarsWon: 3 },
    streaming: ["Primal Video", "ParaMountain+"],
    inTheaters: false
  },
  {
    id: 3,
    title: "Pulp Friction",
    year: 1994,
    rated: "R",
    runtime: 154,
    genres: ["crime", "thriller"],
    director: { name: "Quentin Tarantulino", birthYear: 1963 },
    cast: [
      { name: "John Revolta", role: "Vincent Vega-table", billing: 1, oscarsWon: 0 },
      { name: "Samuel L. Blackson", role: "Jules Winfield-goal", billing: 2, oscarsWon: 0 },
      { name: "Uma Thermos", role: "Mia Walrus", billing: 3, oscarsWon: 0 }
    ],
    ratings: { imdb: 8.9, rottenTomatoes: 92, metacritic: 94 },
    boxOffice: { budget: 8000000, domestic: 107928762, international: 106000000 },
    awards: { wins: 69, nominations: 75, oscarsWon: 1 },
    streaming: ["Netflax", "ParaMountain+"],
    inTheaters: false
  },
  {
    id: 4,
    title: "Forrest Grump",
    year: 1994,
    rated: "PG-13",
    runtime: 142,
    genres: ["drama", "comedy"],
    director: { name: "Robert Zeroeckis", birthYear: 1952 },
    cast: [
      { name: "Tom Honks", role: "Forrest Grump", billing: 1, oscarsWon: 2 },
      { name: "Robin Write", role: "Jenny Curran-t", billing: 2, oscarsWon: 0 },
      { name: "Gary Sinise-cream", role: "Lt. Dan Tailor", billing: 3, oscarsWon: 0 }
    ],
    ratings: { imdb: 8.8, rottenTomatoes: 71, metacritic: 82 },
    boxOffice: { budget: 55000000, domestic: 330252182, international: 347000000 },
    awards: { wins: 50, nominations: 80, oscarsWon: 6 },
    streaming: ["Netflax", "Primal Video", "ParaMountain+"],
    inTheaters: false
  },
  {
    id: 5,
    title: "Flight Club",
    year: 1999,
    rated: "R",
    runtime: 139,
    genres: ["drama", "thriller"],
    director: { name: "David Finch", birthYear: 1962 },
    cast: [
      { name: "Brad Pitstop", role: "Tyler Dirtbin", billing: 1, oscarsWon: 1 },
      { name: "Edward Snoreton", role: "The Narrator", billing: 2, oscarsWon: 0 },
      { name: "Helena Bonham Carjack", role: "Marla Stinger", billing: 3, oscarsWon: 0 }
    ],
    ratings: { imdb: 8.8, rottenTomatoes: 79, metacritic: 66 },
    boxOffice: { budget: 63000000, domestic: 37030102, international: 63000000 },
    awards: { wins: 11, nominations: 37, oscarsWon: 0 },
    streaming: ["Primal Video"],
    inTheaters: false
  },
  {
    id: 6,
    title: "The Mattress",
    year: 1999,
    rated: "R",
    runtime: 136,
    genres: ["sci-fi", "action"],
    director: { name: "Lana Watchowski", birthYear: 1965 },
    cast: [
      { name: "Keanu Leaves", role: "Neo-politan", billing: 1, oscarsWon: 0 },
      { name: "Laurence Fish-burn", role: "Morpheus-burg", billing: 2, oscarsWon: 0 },
      { name: "Carrie-Anne Moss-quito", role: "Trinity-bell", billing: 3, oscarsWon: 0 }
    ],
    ratings: { imdb: 8.7, rottenTomatoes: 88, metacritic: 73 },
    boxOffice: { budget: 63000000, domestic: 171479930, international: 295000000 },
    awards: { wins: 38, nominations: 51, oscarsWon: 4 },
    streaming: ["Netflax"],
    inTheaters: false
  },
  {
    id: 7,
    title: "Goodfettas",
    year: 1990,
    rated: "R",
    runtime: 146,
    genres: ["crime", "drama"],
    director: { name: "Martin Snoresese", birthYear: 1942 },
    cast: [
      { name: "Ray Lee-otter", role: "Henry Hilltop", billing: 1, oscarsWon: 0 },
      { name: "Robert De Niro-foam", role: "Jimmy Convent", billing: 2, oscarsWon: 2 },
      { name: "Joe Pesky", role: "Tommy DeVito-mine", billing: 3, oscarsWon: 1 }
    ],
    ratings: { imdb: 8.7, rottenTomatoes: 96, metacritic: 90 },
    boxOffice: { budget: 25000000, domestic: 46836394, international: 20000000 },
    awards: { wins: 44, nominations: 52, oscarsWon: 1 },
    streaming: ["Primal Video", "ParaMountain+"],
    inTheaters: false
  },
  {
    id: 8,
    title: "The Silence of the Clams",
    year: 1991,
    rated: "R",
    runtime: 118,
    genres: ["thriller", "horror"],
    director: { name: "Jonathan Demi-Moore", birthYear: 1944 },
    cast: [
      { name: "Jodie Fossil", role: "Clarice Starfish", billing: 1, oscarsWon: 2 },
      { name: "Anthony Hopskins", role: "Hannibal Lecter-icity", billing: 2, oscarsWon: 1 }
    ],
    ratings: { imdb: 8.6, rottenTomatoes: 95, metacritic: 85 },
    boxOffice: { budget: 19000000, domestic: 130742922, international: 143000000 },
    awards: { wins: 65, nominations: 48, oscarsWon: 5 },
    streaming: ["Netflax", "Primal Video"],
    inTheaters: false
  },
  {
    id: 9,
    title: "The Whining",
    year: 1980,
    rated: "R",
    runtime: 146,
    genres: ["horror"],
    director: { name: "Stanley Kube-brick", birthYear: 1928 },
    cast: [
      { name: "Jack Nickelson", role: "Jack Torrents", billing: 1, oscarsWon: 3 },
      { name: "Shelley Duhvall", role: "Wendy Torrents", billing: 2, oscarsWon: 0 }
    ],
    ratings: { imdb: 8.4, rottenTomatoes: 84, metacritic: 66 },
    boxOffice: { budget: 19000000, domestic: 44017374, international: 22000000 },
    awards: { wins: 6, nominations: 10, oscarsWon: 0 },
    streaming: ["Primal Video"],
    inTheaters: false
  },
  {
    id: 10,
    title: "Jurassic Bark",
    year: 1993,
    rated: "PG-13",
    runtime: 127,
    genres: ["sci-fi", "adventure"],
    director: { name: "Steven Spielburger", birthYear: 1946 },
    cast: [
      { name: "Sam Kneel", role: "Dr. Alan Granite", billing: 1, oscarsWon: 0 },
      { name: "Laura Hern", role: "Dr. Ellie Saddler", billing: 2, oscarsWon: 0 },
      { name: "Jeff Goldbroom", role: "Dr. Ian Malcontent", billing: 3, oscarsWon: 0 }
    ],
    ratings: { imdb: 8.2, rottenTomatoes: 93, metacritic: 68 },
    boxOffice: { budget: 63000000, domestic: 402453882, international: 636000000 },
    awards: { wins: 28, nominations: 27, oscarsWon: 3 },
    streaming: ["Primal Video", "Peacork"],
    inTheaters: false
  },
  {
    id: 11,
    title: "Gladioli",
    year: 2000,
    rated: "R",
    runtime: 155,
    genres: ["action", "drama"],
    director: { name: "Ridley Scotch", birthYear: 1937 },
    cast: [
      { name: "Russell Crow-bar", role: "Maximus Dorkimus", billing: 1, oscarsWon: 1 },
      { name: "Joaquin Fiesta", role: "Commodus Toilet", billing: 2, oscarsWon: 1 },
      { name: "Connie Jellysen", role: "Lucilla Pupcake", billing: 3, oscarsWon: 0 }
    ],
    ratings: { imdb: 8.5, rottenTomatoes: 80, metacritic: 67 },
    boxOffice: { budget: 103000000, domestic: 187670866, international: 273000000 },
    awards: { wins: 56, nominations: 97, oscarsWon: 5 },
    streaming: ["Netflax", "ParaMountain+"],
    inTheaters: false
  },
  {
    id: 12,
    title: "Insheeption",
    year: 2010,
    rated: "PG-13",
    runtime: 148,
    genres: ["sci-fi", "thriller", "action"],
    director: { name: "Christopher Noland", birthYear: 1970 },
    cast: [
      { name: "Leonardo DiCappuccino", role: "Dom Cobbler", billing: 1, oscarsWon: 1 },
      { name: "Tom Hardly", role: "Eames-chair", billing: 2, oscarsWon: 0 },
      { name: "Elliot Rage", role: "Ariadne-thread", billing: 3, oscarsWon: 0 },
      { name: "Joseph Gorgon-Levitt", role: "Arthur-itis", billing: 4, oscarsWon: 0 }
    ],
    ratings: { imdb: 8.8, rottenTomatoes: 87, metacritic: 74 },
    boxOffice: { budget: 160000000, domestic: 292576195, international: 543000000 },
    awards: { wins: 157, nominations: 204, oscarsWon: 4 },
    streaming: ["Netflax", "Primal Video", "Peacork"],
    inTheaters: false
  }
];

// ── Format dataset as readable JS for Dataset tab ────────────────────────────

function formatDatasetDisplay(data) {
  const lines = ['const movies = ['];
  data.forEach((m, i) => {
    lines.push('  {');
    lines.push(`    id: ${m.id},`);
    lines.push(`    title: "${m.title}",`);
    lines.push(`    year: ${m.year},`);
    lines.push(`    rated: "${m.rated}",`);
    lines.push(`    runtime: ${m.runtime},`);
    lines.push(`    genres: ${JSON.stringify(m.genres)},`);
    lines.push(`    director: { name: "${m.director.name}", birthYear: ${m.director.birthYear} },`);
    lines.push('    cast: [');
    m.cast.forEach((c, j) => {
      const comma = j < m.cast.length - 1 ? ',' : '';
      lines.push(`      { name: "${c.name}", role: "${c.role}", billing: ${c.billing}, oscarsWon: ${c.oscarsWon} }${comma}`);
    });
    lines.push('    ],');
    lines.push(`    ratings: { imdb: ${m.ratings.imdb}, rottenTomatoes: ${m.ratings.rottenTomatoes}, metacritic: ${m.ratings.metacritic} },`);
    lines.push(`    boxOffice: { budget: ${m.boxOffice.budget}, domestic: ${m.boxOffice.domestic}, international: ${m.boxOffice.international} },`);
    lines.push(`    awards: { wins: ${m.awards.wins}, nominations: ${m.awards.nominations}, oscarsWon: ${m.awards.oscarsWon} },`);
    lines.push(`    streaming: ${JSON.stringify(m.streaming)},`);
    lines.push(`    inTheaters: ${m.inTheaters}`);
    const trailingComma = i < data.length - 1 ? ',' : '';
    lines.push(`  }${trailingComma}`);
  });
  lines.push('];');
  return lines.join('\n');
}

const DATASET_DISPLAY = formatDatasetDisplay(MOVIES);
const MOVIES_JSON = JSON.stringify(MOVIES);

// ── Helper: build testRunner string ──────────────────────────────────────────

function tr(fnName, testBody) {
  return `(code) => {\n  const movies = ${MOVIES_JSON};\n  const fn = new Function(code + '; return ${fnName};')();\n${testBody}\n}`;
}

// ── Exercise definitions ─────────────────────────────────────────────────────

const exercises = [
  // ── T2 (6 exercises) ─────────────────────────────────────────────────────
  {
    id: 932,
    title: "Movies: Get All Titles",
    tier: 2,
    category: ["api-data", "movies"],
    tags: ["arrays", "map", "api-data", "movies"],
    description: "Extract all movie titles from the dataset using the map method.",
    instructions: "Write a function called `getAllTitles` that takes an array of movie objects and returns an array of their titles.\n\nEach movie object has a `title` property (string).\n\nExample:\n```\ngetAllTitles(movies)\n// Returns: [\"The Shawshank Exemption\", \"The Codfather\", ...]\n```",
    starterCode: "// Return an array of all movie titles\nfunction getAllTitles(movies) {\n  \n}",
    solution: "function getAllTitles(movies) {\n  return movies.map(movie => movie.title);\n}",
    hints: [
      "The .map() method creates a new array by calling a function on each element of the original array.",
      "Access each movie's title property inside the .map() callback: `movies.map(movie => movie.___)`"
    ],
    resources: [{ label: "MDN: Array.prototype.map()", url: "/docs/mdn/array-map.html" }],
    testRunner: tr('getAllTitles', [
      '  const result = fn(movies);',
      '  return [',
      '    { pass: Array.isArray(result), description: "Returns an array", got: typeof result },',
      '    { pass: result.length === 12, description: "Returns 12 titles (one per movie)", got: String(result.length) },',
      '    { pass: result[0] === "The Shawshank Exemption", description: \'First title is "The Shawshank Exemption"\', got: String(result[0]) },',
      '    { pass: result[11] === "Insheeption", description: \'Last title is "Insheeption"\', got: String(result[11]) },',
      '    { pass: result.includes("Pulp Friction"), description: \'Includes "Pulp Friction"\', got: String(result.includes("Pulp Friction")) },',
      '  ];',
    ].join('\n'))
  },
  {
    id: 933,
    title: "Movies: Find by Title",
    tier: 2,
    category: ["api-data", "movies"],
    tags: ["arrays", "find", "api-data", "movies"],
    description: "Locate a specific movie in the dataset by its title.",
    instructions: "Write a function called `findByTitle` that takes an array of movie objects and a title string, and returns the matching movie object. If no movie matches, return `undefined`.\n\nExample:\n```\nfindByTitle(movies, \"The Codfather\")\n// Returns: { id: 2, title: \"The Codfather\", year: 1972, ... }\n```",
    starterCode: "// Find and return a movie object by its title\nfunction findByTitle(movies, title) {\n  \n}",
    solution: "function findByTitle(movies, title) {\n  return movies.find(movie => movie.title === title);\n}",
    hints: [
      "The .find() method returns the first element in an array that satisfies a testing function, or undefined if none match.",
      "Compare each movie's title to the provided title parameter using strict equality (`===`)."
    ],
    resources: [{ label: "MDN: Array.prototype.find()", url: "/docs/mdn/array-find.html" }],
    testRunner: tr('findByTitle', [
      '  const r1 = fn(movies, "The Codfather");',
      '  const r2 = fn(movies, "Nonexistent Movie");',
      '  const r3 = fn(movies, "The Mattress");',
      '  return [',
      '    { pass: r1 && r1.title === "The Codfather", description: \'Finds "The Codfather"\', got: r1 ? r1.title : "undefined" },',
      '    { pass: r1 && r1.year === 1972, description: "Found movie has correct year (1972)", got: r1 ? String(r1.year) : "undefined" },',
      '    { pass: r2 === undefined, description: "Returns undefined for nonexistent movie", got: String(r2) },',
      '    { pass: r3 && r3.id === 6, description: \'Finds "The Mattress" with id 6\', got: r3 ? String(r3.id) : "undefined" },',
      '    { pass: r3 && r3.director.name === "Lana Watchowski", description: "Found movie has correct director", got: r3 ? r3.director.name : "undefined" },',
      '  ];',
    ].join('\n'))
  },
  {
    id: 934,
    title: "Movies: Filter by Genre",
    tier: 2,
    category: ["api-data", "movies"],
    tags: ["arrays", "filter", "includes", "api-data", "movies"],
    description: "Filter movies that belong to a specific genre.",
    instructions: "Write a function called `filterByGenre` that takes an array of movie objects and a genre string, and returns an array of movies whose `genres` array includes that genre.\n\nEach movie has a `genres` property which is an array of strings.\n\nExample:\n```\nfilterByGenre(movies, \"horror\")\n// Returns: [{ title: \"The Silence of the Clams\", ... }, { title: \"The Whining\", ... }]\n```",
    starterCode: "// Return all movies that include the given genre\nfunction filterByGenre(movies, genre) {\n  \n}",
    solution: "function filterByGenre(movies, genre) {\n  return movies.filter(movie => movie.genres.includes(genre));\n}",
    hints: [
      "Use .filter() to create a new array containing only elements that pass a test. Inside the callback, check each movie's genres array.",
      "The .includes() method checks if an array contains a specific value: `movie.genres.includes(genre)`"
    ],
    resources: [
      { label: "MDN: Array.prototype.filter()", url: "/docs/mdn/array-filter.html" },
      { label: "MDN: Array.prototype.includes()", url: "/docs/mdn/array-includes.html" }
    ],
    testRunner: tr('filterByGenre', [
      '  const drama = fn(movies, "drama");',
      '  const horror = fn(movies, "horror");',
      '  const musical = fn(movies, "musical");',
      '  const scifi = fn(movies, "sci-fi");',
      '  return [',
      '    { pass: Array.isArray(drama), description: "Returns an array", got: typeof drama },',
      '    { pass: drama.length === 6, description: "6 movies have the drama genre", got: String(drama.length) },',
      '    { pass: horror.length === 2, description: "2 movies have the horror genre", got: String(horror.length) },',
      '    { pass: musical.length === 0, description: "0 movies have the musical genre", got: String(musical.length) },',
      '    { pass: scifi.length === 3, description: "3 movies have the sci-fi genre", got: String(scifi.length) },',
      '  ];',
    ].join('\n'))
  },
  {
    id: 935,
    title: "Movies: Get Director Names",
    tier: 2,
    category: ["api-data", "movies"],
    tags: ["arrays", "map", "nested-access", "api-data", "movies"],
    description: "Extract director names from nested movie objects using dot notation.",
    instructions: "Write a function called `getDirectorNames` that takes an array of movie objects and returns an array of director name strings.\n\nEach movie has a `director` property which is an object with a `name` property.\n\nExample:\n```\ngetDirectorNames(movies)\n// Returns: [\"Frank Darabonk\", \"Francis Ford Cappuccino\", ...]\n```",
    starterCode: "// Return an array of all director names\nfunction getDirectorNames(movies) {\n  \n}",
    solution: "function getDirectorNames(movies) {\n  return movies.map(movie => movie.director.name);\n}",
    hints: [
      "Use .map() to transform each movie into its director's name. You'll need to access a nested property.",
      "Chain dot notation to reach the nested value: `movie.director.name`"
    ],
    resources: [{ label: "MDN: Array.prototype.map()", url: "/docs/mdn/array-map.html" }],
    testRunner: tr('getDirectorNames', [
      '  const result = fn(movies);',
      '  return [',
      '    { pass: Array.isArray(result), description: "Returns an array", got: typeof result },',
      '    { pass: result.length === 12, description: "Returns 12 director names", got: String(result.length) },',
      '    { pass: result[0] === "Frank Darabonk", description: \'First director is "Frank Darabonk"\', got: String(result[0]) },',
      '    { pass: result.includes("Quentin Tarantulino"), description: \'Includes "Quentin Tarantulino"\', got: String(result.includes("Quentin Tarantulino")) },',
      '    { pass: result.includes("Steven Spielburger"), description: \'Includes "Steven Spielburger"\', got: String(result.includes("Steven Spielburger")) },',
      '  ];',
    ].join('\n'))
  },
  {
    id: 936,
    title: "Movies: Filter by Year Range",
    tier: 2,
    category: ["api-data", "movies"],
    tags: ["arrays", "filter", "comparison", "api-data", "movies"],
    description: "Filter movies released within a given year range.",
    instructions: "Write a function called `filterByYearRange` that takes an array of movie objects, a `startYear`, and an `endYear`, and returns movies released between those years (inclusive).\n\nExample:\n```\nfilterByYearRange(movies, 1990, 1994)\n// Returns movies from 1990, 1991, 1993, and 1994\n```",
    starterCode: "// Return movies released between startYear and endYear (inclusive)\nfunction filterByYearRange(movies, startYear, endYear) {\n  \n}",
    solution: "function filterByYearRange(movies, startYear, endYear) {\n  return movies.filter(movie => movie.year >= startYear && movie.year <= endYear);\n}",
    hints: [
      "Use .filter() with a condition that checks if the movie's year falls within the range.",
      "Combine two comparisons with `&&`: `movie.year >= startYear && movie.year <= endYear`"
    ],
    resources: [{ label: "MDN: Array.prototype.filter()", url: "/docs/mdn/array-filter.html" }],
    testRunner: tr('filterByYearRange', [
      '  const r1 = fn(movies, 1990, 1994);',
      '  const r2 = fn(movies, 1999, 2000);',
      '  const r3 = fn(movies, 2020, 2025);',
      '  return [',
      '    { pass: Array.isArray(r1), description: "Returns an array", got: typeof r1 },',
      '    { pass: r1.length === 6, description: "6 movies between 1990-1994", got: String(r1.length) },',
      '    { pass: r2.length === 3, description: "3 movies between 1999-2000", got: String(r2.length) },',
      '    { pass: r3.length === 0, description: "0 movies between 2020-2025", got: String(r3.length) },',
      '    { pass: r1.every(m => m.year >= 1990 && m.year <= 1994), description: "All returned movies are within range", got: String(r1.every(m => m.year >= 1990 && m.year <= 1994)) },',
      '  ];',
    ].join('\n'))
  },
  {
    id: 937,
    title: "Movies: Get IMDB Ratings",
    tier: 2,
    category: ["api-data", "movies"],
    tags: ["arrays", "map", "nested-access", "api-data", "movies"],
    description: "Extract IMDB ratings from nested rating objects.",
    instructions: "Write a function called `getImdbRatings` that takes an array of movie objects and returns an array of objects with `title` and `imdb` properties.\n\nEach movie has a `ratings` object with an `imdb` property.\n\nExample:\n```\ngetImdbRatings(movies)\n// Returns: [{ title: \"The Shawshank Exemption\", imdb: 9.3 }, ...]\n```",
    starterCode: "// Return an array of { title, imdb } objects\nfunction getImdbRatings(movies) {\n  \n}",
    solution: "function getImdbRatings(movies) {\n  return movies.map(movie => ({ title: movie.title, imdb: movie.ratings.imdb }));\n}",
    hints: [
      "Use .map() to transform each movie into a new object with just the title and imdb properties.",
      "Return an object literal from the arrow function. Wrap it in parentheses to avoid confusing the braces with a function body: `movie => ({ key: value })`"
    ],
    resources: [{ label: "MDN: Array.prototype.map()", url: "/docs/mdn/array-map.html" }],
    testRunner: tr('getImdbRatings', [
      '  const result = fn(movies);',
      '  return [',
      '    { pass: Array.isArray(result), description: "Returns an array", got: typeof result },',
      '    { pass: result.length === 12, description: "Returns 12 entries", got: String(result.length) },',
      '    { pass: result[0].title === "The Shawshank Exemption" && result[0].imdb === 9.3, description: "First entry has correct title and rating", got: JSON.stringify(result[0]) },',
      '    { pass: Object.keys(result[0]).length === 2, description: "Each entry has exactly 2 properties (title, imdb)", got: String(Object.keys(result[0]).length) },',
      '    { pass: result[5].imdb === 8.7, description: "Sixth movie has imdb rating of 8.7", got: String(result[5].imdb) },',
      '  ];',
    ].join('\n'))
  },

  // ── T3 (7 exercises) ─────────────────────────────────────────────────────
  {
    id: 938,
    title: "Movies: Highest Rated",
    tier: 3,
    category: ["api-data", "movies"],
    tags: ["arrays", "reduce", "nested-access", "api-data", "movies"],
    description: "Find the movie with the highest IMDB rating using reduce.",
    instructions: "Write a function called `highestRated` that takes an array of movie objects and returns the title of the movie with the highest `ratings.imdb` value.\n\nExample:\n```\nhighestRated(movies) // Returns: \"The Shawshank Exemption\"\n```",
    starterCode: "/**\n * @param {Object[]} movies - Array of movie objects\n * @returns {string} Title of the highest-rated movie\n */\nfunction highestRated(movies) {\n  \n}",
    solution: "function highestRated(movies) {\n  return movies.reduce((best, movie) => movie.ratings.imdb > best.ratings.imdb ? movie : best).title;\n}",
    hints: [
      "Use .reduce() to compare each movie's IMDB rating against the current best. The accumulator should track the movie object with the highest rating so far.",
      "After the reduce finishes, access the `.title` property of the resulting movie object."
    ],
    resources: [{ label: "MDN: Array.prototype.reduce()", url: "/docs/mdn/array-reduce.html" }],
    testRunner: tr('highestRated', [
      '  const result = fn(movies);',
      '  const subset = fn([movies[4], movies[8], movies[10]]);',
      '  return [',
      '    { pass: typeof result === "string", description: "Returns a string", got: typeof result },',
      '    { pass: result === "The Shawshank Exemption", description: \'Returns "The Shawshank Exemption" (9.3 IMDB)\', got: result },',
      '    { pass: subset === "Flight Club", description: "Works with subset: highest of Flight Club, The Whining, Gladioli", got: subset },',
      '    { pass: fn([movies[0]]) === "The Shawshank Exemption", description: "Works with single-element array", got: fn([movies[0]]) },',
      '    { pass: fn([movies[1], movies[2]]) === "The Codfather", description: "Codfather (9.2) beats Pulp Friction (8.9)", got: fn([movies[1], movies[2]]) },',
      '    { pass: fn([movies[3], movies[4]]) === "Forrest Grump" || fn([movies[3], movies[4]]) === "Flight Club", description: "Handles tied ratings (both 8.8)", got: fn([movies[3], movies[4]]) },',
      '  ];',
    ].join('\n'))
  },
  {
    id: 939,
    title: "Movies: Average IMDB Rating",
    tier: 3,
    category: ["api-data", "movies"],
    tags: ["arrays", "reduce", "math", "api-data", "movies"],
    description: "Calculate the average IMDB rating across all movies.",
    instructions: "Write a function called `averageImdbRating` that takes an array of movie objects and returns the average of all `ratings.imdb` values, rounded to one decimal place.\n\nExample:\n```\naverageImdbRating(movies) // Returns: 8.7 (or similar)\n```",
    starterCode: "/**\n * @param {Object[]} movies - Array of movie objects\n * @returns {number} Average IMDB rating rounded to 1 decimal\n */\nfunction averageImdbRating(movies) {\n  \n}",
    solution: "function averageImdbRating(movies) {\n  const sum = movies.reduce((total, movie) => total + movie.ratings.imdb, 0);\n  return Math.round(sum / movies.length * 10) / 10;\n}",
    hints: [
      "Use .reduce() to sum all IMDB ratings, then divide by the number of movies. Start the accumulator at 0.",
      "To round to one decimal place, multiply by 10, use Math.round(), then divide by 10: `Math.round(value * 10) / 10`"
    ],
    resources: [{ label: "MDN: Array.prototype.reduce()", url: "/docs/mdn/array-reduce.html" }],
    testRunner: (() => {
      const sum = MOVIES.reduce((t, m) => t + m.ratings.imdb, 0);
      const avg = Math.round(sum / MOVIES.length * 10) / 10;
      return tr('averageImdbRating', [
        '  const result = fn(movies);',
        `  const expected = ${avg};`,
        '  const sub = fn([movies[0], movies[1]]);',
        '  return [',
        '    { pass: typeof result === "number", description: "Returns a number", got: typeof result },',
        '    { pass: Math.abs(result - expected) < 0.05, description: "Average of all 12 movies is " + expected, got: String(result) },',
        '    { pass: Math.abs(sub - 9.25) < 0.05 || Math.abs(sub - 9.3) < 0.05, description: "Average of first 2 movies is ~9.25", got: String(sub) },',
        '    { pass: result === Math.round(result * 10) / 10, description: "Result is rounded to 1 decimal place", got: String(result) },',
        '    { pass: fn([movies[8]]) === 8.4, description: "Single movie returns its own rating", got: String(fn([movies[8]])) },',
        '  ];',
      ].join('\n'));
    })()
  },
  {
    id: 940,
    title: "Movies: Sort by Year",
    tier: 3,
    category: ["api-data", "movies"],
    tags: ["arrays", "sort", "map", "api-data", "movies"],
    description: "Sort movies chronologically and return their titles with years.",
    instructions: "Write a function called `sortByYear` that takes an array of movie objects and returns an array of `{ title, year }` objects sorted from oldest to newest.\n\nDo not mutate the original array.\n\nExample:\n```\nsortByYear(movies)\n// Returns: [{ title: \"The Codfather\", year: 1972 }, { title: \"The Whining\", year: 1980 }, ...]\n```",
    starterCode: "/**\n * @param {Object[]} movies - Array of movie objects\n * @returns {Object[]} Array of { title, year } sorted oldest to newest\n */\nfunction sortByYear(movies) {\n  \n}",
    solution: "function sortByYear(movies) {\n  return movies.slice().sort((a, b) => a.year - b.year).map(m => ({ title: m.title, year: m.year }));\n}",
    hints: [
      "Chain three methods: .slice() to copy the array (avoiding mutation), .sort() with a comparator, and .map() to reshape each object.",
      "The sort comparator for ascending order subtracts b from a: `(a, b) => a.year - b.year`"
    ],
    resources: [
      { label: "MDN: Array.prototype.sort()", url: "/docs/mdn/array-sort.html" },
      { label: "MDN: Array.prototype.slice()", url: "/docs/mdn/array-slice.html" }
    ],
    testRunner: tr('sortByYear', [
      '  const result = fn(movies);',
      '  const orig = movies.map(m => m.id);',
      '  fn(movies);',
      '  const afterIds = movies.map(m => m.id);',
      '  return [',
      '    { pass: Array.isArray(result), description: "Returns an array", got: typeof result },',
      '    { pass: result.length === 12, description: "Returns 12 entries", got: String(result.length) },',
      '    { pass: result[0].title === "The Codfather" && result[0].year === 1972, description: "Oldest movie is The Codfather (1972)", got: JSON.stringify(result[0]) },',
      '    { pass: result[11].title === "Insheeption" && result[11].year === 2010, description: "Newest movie is Insheeption (2010)", got: JSON.stringify(result[11]) },',
      '    { pass: result.every((m, i) => i === 0 || m.year >= result[i-1].year), description: "All movies are in ascending year order", got: "checked" },',
      '    { pass: Object.keys(result[0]).length === 2, description: "Each entry has exactly 2 properties", got: String(Object.keys(result[0]).length) },',
      '    { pass: JSON.stringify(orig) === JSON.stringify(afterIds), description: "Original array is not mutated", got: JSON.stringify(orig) === JSON.stringify(afterIds) ? "not mutated" : "mutated" },',
      '  ];',
    ].join('\n'))
  },
  {
    id: 941,
    title: "Movies: Total Box Office Revenue",
    tier: 3,
    category: ["api-data", "movies"],
    tags: ["arrays", "reduce", "nested-access", "api-data", "movies"],
    description: "Calculate total worldwide box office revenue across all movies.",
    instructions: "Write a function called `totalRevenue` that takes an array of movie objects and returns the sum of all movies' box office revenue (domestic + international).\n\nEach movie has a `boxOffice` object with `domestic` and `international` properties.\n\nExample:\n```\ntotalRevenue(movies) // Returns: a large number\n```",
    starterCode: "/**\n * @param {Object[]} movies - Array of movie objects\n * @returns {number} Total worldwide box office revenue\n */\nfunction totalRevenue(movies) {\n  \n}",
    solution: "function totalRevenue(movies) {\n  return movies.reduce((sum, movie) => sum + movie.boxOffice.domestic + movie.boxOffice.international, 0);\n}",
    hints: [
      "Use .reduce() with a starting value of 0. In each iteration, add both the domestic and international revenue.",
      "Access nested values with dot notation: `movie.boxOffice.domestic + movie.boxOffice.international`"
    ],
    resources: [{ label: "MDN: Array.prototype.reduce()", url: "/docs/mdn/array-reduce.html" }],
    testRunner: (() => {
      const total = MOVIES.reduce((s, m) => s + m.boxOffice.domestic + m.boxOffice.international, 0);
      return tr('totalRevenue', [
        '  const result = fn(movies);',
        `  const expected = ${total};`,
        '  const sub = fn([movies[0]]);',
        '  return [',
        '    { pass: typeof result === "number", description: "Returns a number", got: typeof result },',
        '    { pass: result === expected, description: "Total revenue across all 12 movies is $" + expected.toLocaleString(), got: "$" + result.toLocaleString() },',
        '    { pass: sub === 58300000, description: "Single movie: Shawshank domestic + international = $58,300,000", got: "$" + sub.toLocaleString() },',
        '    { pass: result > 3000000000, description: "Total is over $3 billion", got: "$" + result.toLocaleString() },',
        '    { pass: fn([movies[9]]) === 1038453882, description: "Jurassic Bark total: $1,038,453,882", got: "$" + fn([movies[9]]).toLocaleString() },',
        '  ];',
      ].join('\n'));
    })()
  },
  {
    id: 942,
    title: "Movies: All Cast Members",
    tier: 3,
    category: ["api-data", "movies"],
    tags: ["arrays", "flatMap", "set", "api-data", "movies"],
    description: "Extract all unique cast member names from every movie.",
    instructions: "Write a function called `allCastMembers` that takes an array of movie objects and returns an array of unique cast member names across all movies.\n\nEach movie has a `cast` array of objects, each with a `name` property. Some actors may appear in multiple movies.\n\nExample:\n```\nallCastMembers(movies)\n// Returns: [\"Tim Bobbins\", \"Morgan Freebird\", \"Marlon Branflakes\", ...]\n```",
    starterCode: "/**\n * @param {Object[]} movies - Array of movie objects\n * @returns {string[]} Array of unique cast member names\n */\nfunction allCastMembers(movies) {\n  \n}",
    solution: "function allCastMembers(movies) {\n  return [...new Set(movies.flatMap(movie => movie.cast.map(c => c.name)))];\n}",
    hints: [
      "Use .flatMap() to collect all cast names into a single flat array, then remove duplicates.",
      "Wrap the array in `new Set()` to remove duplicates, then spread back into an array: `[...new Set(array)]`"
    ],
    resources: [
      { label: "MDN: Array.prototype.flatMap()", url: "/docs/mdn/array-flatmap.html" },
      { label: "MDN: Set", url: "/docs/mdn/set.html" }
    ],
    testRunner: (() => {
      const allNames = [...new Set(MOVIES.flatMap(m => m.cast.map(c => c.name)))];
      return tr('allCastMembers', [
        '  const result = fn(movies);',
        `  const expectedCount = ${allNames.length};`,
        '  const hasDupes = result.length !== new Set(result).size;',
        '  return [',
        '    { pass: Array.isArray(result), description: "Returns an array", got: typeof result },',
        '    { pass: result.length === expectedCount, description: "Returns " + expectedCount + " unique cast members", got: String(result.length) },',
        '    { pass: !hasDupes, description: "No duplicate names", got: hasDupes ? "has duplicates" : "all unique" },',
        '    { pass: result.includes("Tim Bobbins"), description: \'Includes "Tim Bobbins"\', got: String(result.includes("Tim Bobbins")) },',
        '    { pass: result.includes("Leonardo DiCappuccino"), description: \'Includes "Leonardo DiCappuccino"\', got: String(result.includes("Leonardo DiCappuccino")) },',
        '    { pass: result.includes("Keanu Leaves"), description: \'Includes "Keanu Leaves"\', got: String(result.includes("Keanu Leaves")) },',
        '  ];',
      ].join('\n'));
    })()
  },
  {
    id: 943,
    title: "Movies: Oscar-Winning Cast",
    tier: 3,
    category: ["api-data", "movies"],
    tags: ["arrays", "filter", "flatMap", "nested-access", "api-data", "movies"],
    description: "Find all cast members who have won at least one Oscar.",
    instructions: "Write a function called `oscarWinningCast` that takes an array of movie objects and returns an array of unique names of cast members who have `oscarsWon > 0`.\n\nExample:\n```\noscarWinningCast(movies)\n// Returns: [\"Morgan Freebird\", \"Marlon Branflakes\", ...]\n```",
    starterCode: "/**\n * @param {Object[]} movies - Array of movie objects\n * @returns {string[]} Unique names of Oscar-winning cast members\n */\nfunction oscarWinningCast(movies) {\n  \n}",
    solution: "function oscarWinningCast(movies) {\n  return [...new Set(movies.flatMap(m => m.cast.filter(c => c.oscarsWon > 0).map(c => c.name)))];\n}",
    hints: [
      "Chain .flatMap() with an inner .filter() and .map() to first select Oscar winners, then extract names.",
      "Inside flatMap, filter each movie's cast for `oscarsWon > 0`, then map to names: `m.cast.filter(c => c.oscarsWon > 0).map(c => c.name)`"
    ],
    resources: [{ label: "MDN: Array.prototype.flatMap()", url: "/docs/mdn/array-flatmap.html" }],
    testRunner: (() => {
      const winners = [...new Set(MOVIES.flatMap(m => m.cast.filter(c => c.oscarsWon > 0).map(c => c.name)))];
      return tr('oscarWinningCast', [
        '  const result = fn(movies);',
        `  const expectedCount = ${winners.length};`,
        '  return [',
        '    { pass: Array.isArray(result), description: "Returns an array", got: typeof result },',
        '    { pass: result.length === expectedCount, description: "Returns " + expectedCount + " Oscar-winning cast members", got: String(result.length) },',
        '    { pass: result.includes("Morgan Freebird"), description: \'Includes "Morgan Freebird" (1 Oscar)\', got: String(result.includes("Morgan Freebird")) },',
        '    { pass: result.includes("Jack Nickelson"), description: \'Includes "Jack Nickelson" (3 Oscars)\', got: String(result.includes("Jack Nickelson")) },',
        '    { pass: result.includes("Tom Honks"), description: \'Includes "Tom Honks" (2 Oscars)\', got: String(result.includes("Tom Honks")) },',
        '    { pass: !result.includes("Keanu Leaves"), description: \'Does NOT include "Keanu Leaves" (0 Oscars)\', got: result.includes("Keanu Leaves") ? "included" : "not included" },',
        '    { pass: result.length === new Set(result).size, description: "No duplicate names", got: result.length === new Set(result).size ? "all unique" : "has duplicates" },',
        '  ];',
      ].join('\n'));
    })()
  },
  {
    id: 944,
    title: "Movies: Group by Decade",
    tier: 3,
    category: ["api-data", "movies"],
    tags: ["arrays", "reduce", "grouping", "api-data", "movies"],
    description: "Group movie titles by the decade they were released.",
    instructions: "Write a function called `groupByDecade` that takes an array of movie objects and returns an object where keys are decade strings (e.g., `\"1990s\"`) and values are arrays of movie titles from that decade.\n\nExample:\n```\ngroupByDecade(movies)\n// Returns: { \"1970s\": [\"The Codfather\"], \"1980s\": [\"The Whining\"], \"1990s\": [...], ... }\n```",
    starterCode: "/**\n * @param {Object[]} movies - Array of movie objects\n * @returns {Object} Object mapping decade strings to arrays of titles\n */\nfunction groupByDecade(movies) {\n  \n}",
    solution: "function groupByDecade(movies) {\n  return movies.reduce((acc, movie) => {\n    const decade = Math.floor(movie.year / 10) * 10 + 's';\n    if (!acc[decade]) acc[decade] = [];\n    acc[decade].push(movie.title);\n    return acc;\n  }, {});\n}",
    hints: [
      "Use .reduce() with an empty object as the initial accumulator. Calculate each movie's decade from its year.",
      "To get the decade: `Math.floor(year / 10) * 10` gives 1990 from 1994. Append 's' for the key: `1990 + 's'` = `\"1990s\"`"
    ],
    resources: [{ label: "MDN: Array.prototype.reduce()", url: "/docs/mdn/array-reduce.html" }],
    testRunner: (() => {
      const grouped = MOVIES.reduce((acc, m) => {
        const d = Math.floor(m.year / 10) * 10 + 's';
        (acc[d] = acc[d] || []).push(m.title);
        return acc;
      }, {});
      return tr('groupByDecade', [
        '  const result = fn(movies);',
        '  return [',
        '    { pass: typeof result === "object" && !Array.isArray(result), description: "Returns an object", got: typeof result },',
        `    { pass: Object.keys(result).length === ${Object.keys(grouped).length}, description: "Has ${Object.keys(grouped).length} decade keys", got: String(Object.keys(result).length) },`,
        `    { pass: result["1970s"] && result["1970s"].length === 1, description: "1970s has 1 movie", got: result["1970s"] ? String(result["1970s"].length) : "undefined" },`,
        `    { pass: result["1990s"] && result["1990s"].length === ${grouped['1990s'].length}, description: "1990s has ${grouped['1990s'].length} movies", got: result["1990s"] ? String(result["1990s"].length) : "undefined" },`,
        '    { pass: result["1990s"] && result["1990s"].includes("Pulp Friction"), description: \'1990s includes "Pulp Friction"\', got: result["1990s"] ? String(result["1990s"].includes("Pulp Friction")) : "undefined" },',
        `    { pass: result["2010s"] && result["2010s"].includes("Insheeption"), description: '2010s includes "Insheeption"', got: result["2010s"] ? String(result["2010s"].includes("Insheeption")) : "undefined" },`,
        '    { pass: result["1980s"] && result["1980s"].includes("The Whining"), description: \'1980s includes "The Whining"\', got: result["1980s"] ? String(result["1980s"].includes("The Whining")) : "undefined" },',
        '  ];',
      ].join('\n'));
    })()
  },

  // ── T4 (4 exercises) ─────────────────────────────────────────────────────
  {
    id: 945,
    title: "Movies: Director Filmography",
    tier: 4,
    category: ["api-data", "movies"],
    tags: ["arrays", "reduce", "nested-access", "data-transformation", "api-data", "movies"],
    description: "Build a filmography object mapping each director to their movies and stats.",
    instructions: "Create a function called `directorFilmography` that takes an array of movie objects and returns an object where each key is a director's name and each value is an object containing:\n- `movies`: array of `{ title, year, imdbRating }` objects sorted by year\n- `avgRating`: average IMDB rating of their movies (rounded to 1 decimal)\n\nExample:\n```\ndirectorFilmography(movies)\n// Returns: {\n//   \"Frank Darabonk\": {\n//     movies: [{ title: \"The Shawshank Exemption\", year: 1994, imdbRating: 9.3 }],\n//     avgRating: 9.3\n//   },\n//   ...\n// }\n```",
    starterCode: "",
    solution: "function directorFilmography(movies) {\n  const filmography = movies.reduce((acc, movie) => {\n    const name = movie.director.name;\n    if (!acc[name]) acc[name] = { movies: [], totalRating: 0 };\n    acc[name].movies.push({ title: movie.title, year: movie.year, imdbRating: movie.ratings.imdb });\n    acc[name].totalRating += movie.ratings.imdb;\n    return acc;\n  }, {});\n  \n  const result = {};\n  for (const [name, data] of Object.entries(filmography)) {\n    result[name] = {\n      movies: data.movies.sort((a, b) => a.year - b.year),\n      avgRating: Math.round(data.totalRating / data.movies.length * 10) / 10\n    };\n  }\n  return result;\n}",
    hints: [
      "Use .reduce() to group movies by director name. Build an intermediate structure that tracks both the movie list and a running total of ratings.",
      "After grouping, iterate over the result to sort each director's movies by year and calculate `avgRating` from the total."
    ],
    resources: [
      { label: "MDN: Array.prototype.reduce()", url: "/docs/mdn/array-reduce.html" },
      { label: "MDN: Object.entries()", url: "/docs/mdn/object-entries.html" }
    ],
    testRunner: tr('directorFilmography', [
      '  const result = fn(movies);',
      '  return [',
      '    { pass: typeof result === "object" && !Array.isArray(result), description: "Returns an object", got: typeof result },',
      '    { pass: Object.keys(result).length === 12, description: "Has 12 directors (each movie has a unique director)", got: String(Object.keys(result).length) },',
      '    { pass: result["Frank Darabonk"] !== undefined, description: \'Has key "Frank Darabonk"\', got: result["Frank Darabonk"] ? "exists" : "missing" },',
      '    { pass: result["Frank Darabonk"] && result["Frank Darabonk"].movies.length === 1, description: "Frank Darabonk has 1 movie", got: result["Frank Darabonk"] ? String(result["Frank Darabonk"].movies.length) : "N/A" },',
      '    { pass: result["Frank Darabonk"] && result["Frank Darabonk"].avgRating === 9.3, description: "Frank Darabonk avgRating is 9.3", got: result["Frank Darabonk"] ? String(result["Frank Darabonk"].avgRating) : "N/A" },',
      '    { pass: result["Frank Darabonk"] && result["Frank Darabonk"].movies[0].title === "The Shawshank Exemption", description: "Frank Darabonk movie data includes title", got: result["Frank Darabonk"] ? result["Frank Darabonk"].movies[0].title : "N/A" },',
      '    { pass: result["Frank Darabonk"] && result["Frank Darabonk"].movies[0].year === 1994, description: "Frank Darabonk movie data includes year", got: result["Frank Darabonk"] ? String(result["Frank Darabonk"].movies[0].year) : "N/A" },',
      '    { pass: result["Frank Darabonk"] && result["Frank Darabonk"].movies[0].imdbRating === 9.3, description: "Frank Darabonk movie data includes imdbRating", got: result["Frank Darabonk"] ? String(result["Frank Darabonk"].movies[0].imdbRating) : "N/A" },',
      '  ];',
    ].join('\n'))
  },
  {
    id: 946,
    title: "Movies: Genre Report",
    tier: 4,
    category: ["api-data", "movies"],
    tags: ["arrays", "reduce", "nested-access", "aggregation", "api-data", "movies"],
    description: "Build a comprehensive report breaking down movies by genre.",
    instructions: "Create a function called `genreReport` that takes an array of movie objects and returns an object where each key is a genre and each value is an object with:\n- `count`: number of movies in that genre\n- `avgImdb`: average IMDB rating (rounded to 1 decimal)\n- `titles`: array of movie titles in that genre\n\nSince movies can have multiple genres, a movie may appear in multiple genre entries.\n\nExample:\n```\ngenreReport(movies)\n// Returns: {\n//   \"drama\": { count: 7, avgImdb: 8.9, titles: [\"The Shawshank Exemption\", ...] },\n//   \"crime\": { count: 3, avgImdb: 8.9, titles: [...] },\n//   ...\n// }\n```",
    starterCode: "",
    solution: "function genreReport(movies) {\n  const report = {};\n  movies.forEach(movie => {\n    movie.genres.forEach(genre => {\n      if (!report[genre]) report[genre] = { count: 0, totalImdb: 0, titles: [] };\n      report[genre].count++;\n      report[genre].totalImdb += movie.ratings.imdb;\n      report[genre].titles.push(movie.title);\n    });\n  });\n  const result = {};\n  for (const [genre, data] of Object.entries(report)) {\n    result[genre] = {\n      count: data.count,\n      avgImdb: Math.round(data.totalImdb / data.count * 10) / 10,\n      titles: data.titles\n    };\n  }\n  return result;\n}",
    hints: [
      "Iterate over each movie, then iterate over each of its genres. For each genre, accumulate the count, total rating, and titles in an object.",
      "After accumulation, convert the totalImdb to avgImdb by dividing by count and rounding to 1 decimal."
    ],
    resources: [{ label: "MDN: Array.prototype.forEach()", url: "/docs/mdn/array-foreach.html" }],
    testRunner: (() => {
      const report = {};
      MOVIES.forEach(m => m.genres.forEach(g => {
        if (!report[g]) report[g] = { count: 0, total: 0, titles: [] };
        report[g].count++;
        report[g].total += m.ratings.imdb;
        report[g].titles.push(m.title);
      }));
      const dramaCount = report.drama.count;
      const crimeCount = report.crime.count;
      const dramaAvg = Math.round(report.drama.total / report.drama.count * 10) / 10;
      return tr('genreReport', [
        '  const result = fn(movies);',
        '  return [',
        '    { pass: typeof result === "object" && !Array.isArray(result), description: "Returns an object", got: typeof result },',
        `    { pass: result.drama && result.drama.count === ${dramaCount}, description: "Drama count is ${dramaCount}", got: result.drama ? String(result.drama.count) : "N/A" },`,
        `    { pass: result.crime && result.crime.count === ${crimeCount}, description: "Crime count is ${crimeCount}", got: result.crime ? String(result.crime.count) : "N/A" },`,
        `    { pass: result.drama && Math.abs(result.drama.avgImdb - ${dramaAvg}) < 0.05, description: "Drama avgImdb is ~${dramaAvg}", got: result.drama ? String(result.drama.avgImdb) : "N/A" },`,
        '    { pass: result.drama && Array.isArray(result.drama.titles), description: "Drama titles is an array", got: result.drama ? typeof result.drama.titles : "N/A" },',
        '    { pass: result.drama && result.drama.titles.includes("The Shawshank Exemption"), description: \'Drama titles includes "The Shawshank Exemption"\', got: result.drama ? String(result.drama.titles.includes("The Shawshank Exemption")) : "N/A" },',
        '    { pass: result.horror && result.horror.count === 2, description: "Horror count is 2", got: result.horror ? String(result.horror.count) : "N/A" },',
        '    { pass: result["sci-fi"] && result["sci-fi"].count === 3, description: "Sci-fi count is 3", got: result["sci-fi"] ? String(result["sci-fi"].count) : "N/A" },',
        '  ];',
      ].join('\n'));
    })()
  },
  {
    id: 947,
    title: "Movies: Most Profitable",
    tier: 4,
    category: ["api-data", "movies"],
    tags: ["arrays", "filter", "map", "sort", "chaining", "api-data", "movies"],
    description: "Find profitable movies and rank them by profit margin.",
    instructions: "Create a function called `mostProfitable` that takes an array of movie objects and returns an array of `{ title, profit, roi }` objects for movies where total revenue (domestic + international) exceeded the budget. Sort by `roi` (return on investment) in descending order.\n\n- `profit` = (domestic + international) - budget\n- `roi` = profit / budget, rounded to 1 decimal\n\nExample:\n```\nmostProfitable(movies)\n// Returns: [{ title: \"The Codfather\", profit: 238966411, roi: 39.8 }, ...]\n```",
    starterCode: "",
    solution: "function mostProfitable(movies) {\n  return movies\n    .map(m => {\n      const revenue = m.boxOffice.domestic + m.boxOffice.international;\n      const profit = revenue - m.boxOffice.budget;\n      const roi = Math.round(profit / m.boxOffice.budget * 10) / 10;\n      return { title: m.title, profit, roi };\n    })\n    .filter(m => m.profit > 0)\n    .sort((a, b) => b.roi - a.roi);\n}",
    hints: [
      "Chain .map() to calculate profit and ROI for each movie, then .filter() to keep only profitable ones, then .sort() by ROI descending.",
      "ROI = profit / budget. Use `Math.round(value * 10) / 10` to round to 1 decimal. Sort descending with `(a, b) => b.roi - a.roi`."
    ],
    resources: [{ label: "MDN: Array.prototype.sort()", url: "/docs/mdn/array-sort.html" }],
    testRunner: (() => {
      const profitable = MOVIES
        .map(m => {
          const rev = m.boxOffice.domestic + m.boxOffice.international;
          const profit = rev - m.boxOffice.budget;
          const roi = Math.round(profit / m.boxOffice.budget * 10) / 10;
          return { title: m.title, profit, roi };
        })
        .filter(m => m.profit > 0)
        .sort((a, b) => b.roi - a.roi);
      return tr('mostProfitable', [
        '  const result = fn(movies);',
        `  const expectedCount = ${profitable.length};`,
        `  const topTitle = "${profitable[0].title}";`,
        `  const topRoi = ${profitable[0].roi};`,
        '  return [',
        '    { pass: Array.isArray(result), description: "Returns an array", got: typeof result },',
        '    { pass: result.length === expectedCount, description: "Returns " + expectedCount + " profitable movies", got: String(result.length) },',
        '    { pass: result[0] && result[0].title === topTitle, description: \'Highest ROI is "' + profitable[0].title + '"\', got: result[0] ? result[0].title : "N/A" },',
        '    { pass: result[0] && result[0].roi === topRoi, description: "Highest ROI value is " + topRoi, got: result[0] ? String(result[0].roi) : "N/A" },',
        '    { pass: result[0] && typeof result[0].profit === "number", description: "Each entry has a profit number", got: result[0] ? typeof result[0].profit : "N/A" },',
        '    { pass: result.every((m, i) => i === 0 || m.roi <= result[i-1].roi), description: "Sorted by ROI descending", got: result.every((m, i) => i === 0 || m.roi <= result[i-1].roi) ? "sorted" : "not sorted" },',
        '    { pass: result.every(m => m.profit > 0), description: "All entries have positive profit", got: result.every(m => m.profit > 0) ? "all positive" : "some negative" },',
        '    { pass: Object.keys(result[0] || {}).sort().join(",") === "profit,roi,title", description: "Each entry has exactly { title, profit, roi }", got: Object.keys(result[0] || {}).sort().join(",") },',
        '  ];',
      ].join('\n'));
    })()
  },
  {
    id: 948,
    title: "Movies: Full Analysis",
    tier: 4,
    category: ["api-data", "movies"],
    tags: ["arrays", "reduce", "data-transformation", "aggregation", "api-data", "movies"],
    description: "Build a comprehensive movie database analysis object.",
    instructions: "Create a function called `movieAnalysis` that takes an array of movie objects and returns an analysis object with:\n- `totalMovies`: total count of movies\n- `avgRuntime`: average runtime rounded to nearest integer\n- `topRated`: `{ title, rating }` of the movie with the highest IMDB rating\n- `mostAwards`: `{ title, wins }` of the movie with the most award wins\n- `genreBreakdown`: object mapping each genre to its count of movies\n\nExample:\n```\nmovieAnalysis(movies)\n// Returns: {\n//   totalMovies: 12,\n//   avgRuntime: 144,\n//   topRated: { title: \"The Shawshank Exemption\", rating: 9.3 },\n//   mostAwards: { title: \"Insheeption\", wins: 157 },\n//   genreBreakdown: { drama: 7, crime: 3, ... }\n// }\n```",
    starterCode: "",
    solution: "function movieAnalysis(movies) {\n  const totalMovies = movies.length;\n  const avgRuntime = Math.round(movies.reduce((sum, m) => sum + m.runtime, 0) / movies.length);\n  const topRatedMovie = movies.reduce((best, m) => m.ratings.imdb > best.ratings.imdb ? m : best);\n  const mostAwardsMovie = movies.reduce((best, m) => m.awards.wins > best.awards.wins ? m : best);\n  const genreBreakdown = {};\n  movies.forEach(m => m.genres.forEach(g => { genreBreakdown[g] = (genreBreakdown[g] || 0) + 1; }));\n  return {\n    totalMovies,\n    avgRuntime,\n    topRated: { title: topRatedMovie.title, rating: topRatedMovie.ratings.imdb },\n    mostAwards: { title: mostAwardsMovie.title, wins: mostAwardsMovie.awards.wins },\n    genreBreakdown\n  };\n}",
    hints: [
      "Break this into parts: count movies, average the runtimes, find the top-rated with .reduce(), find the most awards with .reduce(), and build genre counts with forEach.",
      "For avgRuntime, sum all runtimes with .reduce() then divide by length. Use Math.round() for the nearest integer."
    ],
    resources: [{ label: "MDN: Array.prototype.reduce()", url: "/docs/mdn/array-reduce.html" }],
    testRunner: (() => {
      const avgRt = Math.round(MOVIES.reduce((s, m) => s + m.runtime, 0) / MOVIES.length);
      const topRated = MOVIES.reduce((b, m) => m.ratings.imdb > b.ratings.imdb ? m : b);
      const mostAwards = MOVIES.reduce((b, m) => m.awards.wins > b.awards.wins ? m : b);
      return tr('movieAnalysis', [
        '  const result = fn(movies);',
        '  return [',
        '    { pass: typeof result === "object" && !Array.isArray(result), description: "Returns an object", got: typeof result },',
        '    { pass: result.totalMovies === 12, description: "totalMovies is 12", got: String(result.totalMovies) },',
        `    { pass: result.avgRuntime === ${avgRt}, description: "avgRuntime is ${avgRt}", got: String(result.avgRuntime) },`,
        `    { pass: result.topRated && result.topRated.title === "${topRated.title}", description: 'topRated.title is "${topRated.title}"', got: result.topRated ? result.topRated.title : "N/A" },`,
        `    { pass: result.topRated && result.topRated.rating === ${topRated.ratings.imdb}, description: "topRated.rating is ${topRated.ratings.imdb}", got: result.topRated ? String(result.topRated.rating) : "N/A" },`,
        `    { pass: result.mostAwards && result.mostAwards.title === "${mostAwards.title}", description: 'mostAwards.title is "${mostAwards.title}"', got: result.mostAwards ? result.mostAwards.title : "N/A" },`,
        `    { pass: result.mostAwards && result.mostAwards.wins === ${mostAwards.awards.wins}, description: "mostAwards.wins is ${mostAwards.awards.wins}", got: result.mostAwards ? String(result.mostAwards.wins) : "N/A" },`,
        '    { pass: result.genreBreakdown && result.genreBreakdown.drama === 6, description: "genreBreakdown.drama is 6", got: result.genreBreakdown ? String(result.genreBreakdown.drama) : "N/A" },',
        '  ];',
      ].join('\n'));
    })()
  }
];

// ── Build collection JSON ────────────────────────────────────────────────────

const BASE_POINTS = { 1: 10, 2: 25, 3: 50, 4: 100, 5: 200 };

const collection = {
  id: "pop-culture-apis",
  name: "Pop Culture APIs",
  description: "Practice data manipulation with fun, deeply nested datasets inspired by real API response shapes. Each theme features punny parody names and rich data structures that drill chained iterator methods, bracket notation, and complex transformations.",
  color: "#e879f9",
  source: "Original — CodeForge",
  license: "Educational Use",
  attribution: "Original exercises with fictional parody datasets inspired by public API response shapes. All character names and data are humorous parodies for educational purposes.",
  hidden: false,
  exerciseIds: exercises.map(e => e.id),
  exercises: exercises.map(e => ({
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
  }))
};

// ── Write output ─────────────────────────────────────────────────────────────

const outPath = path.join(__dirname, 'pop-culture-apis.json');
fs.writeFileSync(outPath, JSON.stringify(collection, null, 2));

console.log(`\nPop Culture APIs — Movies Theme`);
console.log(`================================`);
console.log(`  Exercises: ${exercises.length}`);
console.log(`  T2: ${exercises.filter(e => e.tier === 2).length}`);
console.log(`  T3: ${exercises.filter(e => e.tier === 3).length}`);
console.log(`  T4: ${exercises.filter(e => e.tier === 4).length}`);
console.log(`  ID range: ${exercises[0].id}–${exercises[exercises.length - 1].id}`);
console.log(`  Dataset: ${MOVIES.length} movies`);
console.log(`  Written to: ${outPath}`);
