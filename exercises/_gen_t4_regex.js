#!/usr/bin/env node
/**
 * Generator: T4 Regex Deep Dive — Section 4 (10 exercises, IDs 1341-1350)
 *
 * Covers: Email validation, number extraction, word boundaries, phone formatting,
 *         word capitalization, key-value parsing, slugification, password strength
 *         (lookaheads), HTML tag extraction, template engine
 *
 * T4 convention: description-only, NO starterCode. Student writes everything
 * from scratch including function declaration. Description tells them the
 * function name and expected behavior.
 *
 * Usage:
 *   node exercises/_gen_t4_regex.js            # Append to curriculum
 *   node exercises/_gen_t4_regex.js --validate  # Validate testRunners only
 */

const fs = require('fs');
const path = require('path');

const CURRICULUM_PATH = path.join(
  __dirname,
  'collections',
  'default-curriculum.json'
);

// ─── Resources (MDN only for T4) ────────────────────────────────────────────

const regexBasicsRes = [
  { label: 'MDN: Regular expressions', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions', description: 'Regex guide' },
  { label: 'MDN: RegExp', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp', description: 'RegExp reference' },
];
const regexTestRes = [
  { label: 'MDN: RegExp.prototype.test()', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/test', description: 'RegExp test reference' },
];
const matchRes = [
  { label: 'MDN: String.prototype.match()', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/match', description: 'String match reference' },
  { label: 'MDN: Regular expressions', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions', description: 'Regex guide' },
];
const replaceRes = [
  { label: 'MDN: String.prototype.replace()', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace', description: 'String replace reference' },
];
const lookaheadRes = [
  { label: 'MDN: Lookahead assertion', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions/Lookahead_assertion', description: 'Lookahead assertion reference' },
  { label: 'MDN: RegExp', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp', description: 'RegExp reference' },
];

// ─── Exercise Definitions ───────────────────────────────────────────────────

const exercises = [

  // ══════════════════════════════════════════════════════════════════════════
  // T4 Section 4: Regex Deep Dive (10 exercises, IDs 1341-1350)
  // ══════════════════════════════════════════════════════════════════════════

  // 1. Validate Email Format
  {
    id: 1341,
    title: 'Validate Email Format',
    type: 'js',
    tier: 4,
    category: ['regex', 'validation'],
    tags: ['regex', 'test', 'email', 'validation', 'character-class'],
    description:
      'Create a function called `isValidEmail` that takes a string and returns `true` if it matches a basic email format, or `false` otherwise. A valid email has: one or more word characters or dots or hyphens before the `@`, then one or more word characters or hyphens after the `@`, then a dot, then two or more letters at the end. Use a regular expression with the `test` method.',
    starterCode: '',
    solution:
      'function isValidEmail(str) {\n  return /^[\\w.\\-]+@[\\w\\-]+\\.[a-zA-Z]{2,}$/.test(str);\n}',
    testRunner: `(code) => {
  var fn = new Function(code + '; return isValidEmail;')();
  var results = [];
  results.push({ pass: fn('user@example.com') === true, description: '"user@example.com" is valid', got: String(fn('user@example.com')) });
  results.push({ pass: fn('first.last@domain.org') === true, description: '"first.last@domain.org" is valid (dot in local)', got: String(fn('first.last@domain.org')) });
  results.push({ pass: fn('test@sub-domain.co') === true, description: '"test@sub-domain.co" is valid (hyphen in domain, 2-letter TLD)', got: String(fn('test@sub-domain.co')) });
  results.push({ pass: fn('missing-at.com') === false, description: '"missing-at.com" is invalid (no @)', got: String(fn('missing-at.com')) });
  results.push({ pass: fn('@nodomain.com') === false, description: '"@nodomain.com" is invalid (nothing before @)', got: String(fn('@nodomain.com')) });
  results.push({ pass: fn('user@') === false, description: '"user@" is invalid (nothing after @)', got: String(fn('user@')) });
  results.push({ pass: fn('user@domain') === false, description: '"user@domain" is invalid (no TLD)', got: String(fn('user@domain')) });
  results.push({ pass: fn('user@domain.a') === false, description: '"user@domain.a" is invalid (TLD too short)', got: String(fn('user@domain.a')) });
  return results;
}`,
    hint1:
      'A regular expression can validate the format. Use `^` and `$` to match the entire string. `\\w` matches word characters (letters, digits, underscore). The `test` method returns true or false.',
    hint2:
      'Build the pattern in parts: `^[\\w.\\-]+` for the local part, `@` literal, `[\\w\\-]+` for the domain, `\\.` for the dot, `[a-zA-Z]{2,}$` for the TLD. Combine them and use `/pattern/.test(str)`.',
    resources: [...regexBasicsRes, ...regexTestRes],
  },

  // 2. Extract Numbers
  {
    id: 1342,
    title: 'Extract Numbers',
    type: 'js',
    tier: 4,
    category: ['regex', 'extraction'],
    tags: ['regex', 'match', 'numbers', 'global-flag', 'parseFloat'],
    description:
      'Create a function called `extractNumbers` that takes a string and returns an array of all numbers found in it (as actual numbers, not strings). Numbers can be integers or decimals and can be negative. If no numbers are found, return an empty array. Use the `match` method with a global regex.',
    starterCode: '',
    solution:
      'function extractNumbers(str) {\n  var matches = str.match(/-?\\d+\\.?\\d*/g);\n  if (!matches) return [];\n  return matches.map(function(m) { return Number(m); });\n}',
    testRunner: `(code) => {
  var fn = new Function(code + '; return extractNumbers;')();
  var results = [];
  var r1 = fn('I have 3 cats and 2 dogs');
  results.push({ pass: JSON.stringify(r1) === '[3,2]', description: '"I have 3 cats and 2 dogs" → [3, 2]', got: JSON.stringify(r1) });
  var r2 = fn('Temperature: -5.5 degrees, wind: 12.3 mph');
  results.push({ pass: JSON.stringify(r2) === '[-5.5,12.3]', description: 'Negative and decimal numbers extracted', got: JSON.stringify(r2) });
  var r3 = fn('No numbers here!');
  results.push({ pass: JSON.stringify(r3) === '[]', description: 'No numbers returns empty array', got: JSON.stringify(r3) });
  var r4 = fn('42');
  results.push({ pass: JSON.stringify(r4) === '[42]', description: 'Just "42" → [42]', got: JSON.stringify(r4) });
  var r5 = fn('Price: $9.99, tax: $0.80, total: $10.79');
  results.push({ pass: JSON.stringify(r5) === '[9.99,0.8,10.79]', description: 'Dollar amounts extracted as numbers', got: JSON.stringify(r5) });
  var r6 = fn('Coordinates: -40, 73.5');
  results.push({ pass: JSON.stringify(r6) === '[-40,73.5]', description: 'Negative integer and positive decimal', got: JSON.stringify(r6) });
  var r7 = fn('100 200 300');
  results.push({ pass: JSON.stringify(r7) === '[100,200,300]', description: 'Three space-separated integers', got: JSON.stringify(r7) });
  var r8 = fn('score: 3.14 out of 5');
  results.push({ pass: JSON.stringify(r8) === '[3.14,5]', description: '"score: 3.14 out of 5" → [3.14, 5]', got: JSON.stringify(r8) });
  return results;
}`,
    hint1:
      'Use `String.match()` with a global regex (`/pattern/g`). The pattern needs to match optional negative sign, one or more digits, optional decimal point with more digits. Convert matches from strings to numbers.',
    hint2:
      'The pattern `-?\\d+\\.?\\d*` matches: optional minus, one-or-more digits, optional dot, zero-or-more digits. `str.match(/pattern/g)` returns an array of all matches (or `null` if none). Convert each match with `Number()` or `parseFloat()`.',
    resources: matchRes,
  },

  // 3. Count Word Occurrences
  {
    id: 1343,
    title: 'Count Word Occurrences',
    type: 'js',
    tier: 4,
    category: ['regex', 'word-boundary'],
    tags: ['regex', 'match', 'word-boundary', 'case-insensitive', 'flags'],
    description:
      'Create a function called `countWord` that takes a text string and a word string, then returns how many times that exact word appears in the text. The search should be case-insensitive and match whole words only (not substrings inside other words). For example, searching for `"the"` should not match `"there"` or `"other"`. Use a regular expression with word boundary anchors and appropriate flags.',
    starterCode: '',
    solution:
      'function countWord(text, word) {\n  var pattern = new RegExp("\\\\b" + word + "\\\\b", "gi");\n  var matches = text.match(pattern);\n  return matches ? matches.length : 0;\n}',
    testRunner: `(code) => {
  var fn = new Function(code + '; return countWord;')();
  var results = [];
  results.push({ pass: fn('the cat sat on the mat', 'the') === 2, description: '"the" appears 2 times (not in "the cat"... wait, yes in "the")', got: String(fn('the cat sat on the mat', 'the')) });
  results.push({ pass: fn('There is the other one over there', 'the') === 1, description: '"the" only matches whole word, not "There" or "other" or "there"... wait', got: String(fn('There is the other one over there', 'the')) });
  results.push({ pass: fn('Hello hello HELLO', 'hello') === 3, description: 'Case-insensitive: "hello" matches 3 times', got: String(fn('Hello hello HELLO', 'hello')) });
  results.push({ pass: fn('no match here', 'xyz') === 0, description: '"xyz" not found returns 0', got: String(fn('no match here', 'xyz')) });
  results.push({ pass: fn('dog dogs dogged doggy', 'dog') === 1, description: '"dog" matches only whole word, not "dogs", "dogged", "doggy"', got: String(fn('dog dogs dogged doggy', 'dog')) });
  results.push({ pass: fn('a a a b b c', 'a') === 3, description: 'Single letter "a" matches 3 times', got: String(fn('a a a b b c', 'a')) });
  results.push({ pass: fn('', 'test') === 0, description: 'Empty text returns 0', got: String(fn('', 'test')) });
  results.push({ pass: fn('Test test TEST testing tester', 'test') === 3, description: '"test" matches 3 (Test, test, TEST) but not "testing" or "tester"', got: String(fn('Test test TEST testing tester', 'test')) });
  return results;
}`,
    hint1:
      'You need a regex that matches the word with boundaries on each side and is case-insensitive. Since the word is a variable, use `new RegExp()` to build the pattern dynamically. Word boundaries prevent matching inside other words.',
    hint2:
      'Build the regex with `new RegExp("\\\\b" + word + "\\\\b", "gi")`. The `\\\\b` is a word boundary anchor, `g` flag finds all matches, `i` flag makes it case-insensitive. Use `.match()` and check for null before reading `.length`.',
    resources: [...matchRes, ...regexBasicsRes],
  },

  // 4. Format Phone Number
  {
    id: 1344,
    title: 'Format Phone Number',
    type: 'js',
    tier: 4,
    category: ['regex', 'formatting'],
    tags: ['regex', 'match', 'replace', 'phone', 'formatting', 'capture-group'],
    description:
      'Create a function called `formatPhone` that takes a string containing a phone number in any common format and returns it formatted as `"(XXX) XXX-XXXX"`. First extract all digits from the input. If the result has exactly 10 digits, format them. If the result has 11 digits starting with `1` (country code), drop the leading `1` and format the remaining 10. For any other count of digits, return `null`.',
    starterCode: '',
    solution:
      'function formatPhone(str) {\n  var digits = str.replace(/\\D/g, "");\n  if (digits.length === 11 && digits[0] === "1") {\n    digits = digits.slice(1);\n  }\n  if (digits.length !== 10) return null;\n  return "(" + digits.slice(0, 3) + ") " + digits.slice(3, 6) + "-" + digits.slice(6);\n}',
    testRunner: `(code) => {
  var fn = new Function(code + '; return formatPhone;')();
  var results = [];
  results.push({ pass: fn('5551234567') === '(555) 123-4567', description: '"5551234567" → "(555) 123-4567"', got: fn('5551234567') });
  results.push({ pass: fn('555-123-4567') === '(555) 123-4567', description: '"555-123-4567" → formatted', got: fn('555-123-4567') });
  results.push({ pass: fn('(555) 123-4567') === '(555) 123-4567', description: 'Already formatted stays the same', got: fn('(555) 123-4567') });
  results.push({ pass: fn('1-555-123-4567') === '(555) 123-4567', description: '"1-555-123-4567" drops country code', got: fn('1-555-123-4567') });
  results.push({ pass: fn('15551234567') === '(555) 123-4567', description: '"15551234567" (11 digits with 1) formats correctly', got: fn('15551234567') });
  results.push({ pass: fn('555.123.4567') === '(555) 123-4567', description: 'Dot-separated formats correctly', got: fn('555.123.4567') });
  results.push({ pass: fn('12345') === null, description: 'Too few digits returns null', got: String(fn('12345')) });
  results.push({ pass: fn('123456789012') === null, description: 'Too many digits returns null', got: String(fn('123456789012')) });
  return results;
}`,
    hint1:
      'First strip all non-digit characters from the string using `replace` with a regex that matches non-digits. Then check the digit count: 10 is ready to format, 11 starting with "1" means remove the first digit, anything else returns null.',
    hint2:
      'Use `str.replace(/\\D/g, "")` to get only digits. Check `.length` — if 11 and starts with "1", slice off the first character. If length is 10, build the output with string slicing: `"(" + digits.slice(0,3) + ") " + digits.slice(3,6) + "-" + digits.slice(6)`.',
    resources: [...replaceRes, ...regexBasicsRes],
  },

  // 5. Capitalize Words
  {
    id: 1345,
    title: 'Capitalize Words',
    type: 'js',
    tier: 4,
    category: ['regex', 'replacement'],
    tags: ['regex', 'replace', 'callback', 'capitalize', 'word-boundary'],
    description:
      'Create a function called `capitalizeWords` that takes a string and returns a new string with the first letter of every word capitalized and the rest lowercase. A word starts after a space or at the beginning of the string. Use `replace` with a regular expression. Handle multiple spaces between words and preserve them.',
    starterCode: '',
    solution:
      'function capitalizeWords(str) {\n  return str.toLowerCase().replace(/\\b[a-z]/g, function(match) {\n    return match.toUpperCase();\n  });\n}',
    testRunner: `(code) => {
  var fn = new Function(code + '; return capitalizeWords;')();
  var results = [];
  results.push({ pass: fn('hello world') === 'Hello World', description: '"hello world" → "Hello World"', got: fn('hello world') });
  results.push({ pass: fn('LOUD NOISES') === 'Loud Noises', description: '"LOUD NOISES" → "Loud Noises"', got: fn('LOUD NOISES') });
  results.push({ pass: fn('javaScript is fun') === 'Javascript Is Fun', description: '"javaScript is fun" → "Javascript Is Fun"', got: fn('javaScript is fun') });
  results.push({ pass: fn('a') === 'A', description: 'Single letter "a" → "A"', got: fn('a') });
  results.push({ pass: fn('hello  world') === 'Hello  World', description: 'Double space preserved', got: JSON.stringify(fn('hello  world')) });
  results.push({ pass: fn('') === '', description: 'Empty string returns empty', got: JSON.stringify(fn('')) });
  results.push({ pass: fn('already Capitalized') === 'Already Capitalized', description: 'Mixed case normalized', got: fn('already Capitalized') });
  results.push({ pass: fn('one two three four five') === 'One Two Three Four Five', description: 'Five words all capitalized', got: fn('one two three four five') });
  return results;
}`,
    hint1:
      'First convert the entire string to lowercase so you start with a clean base. Then use `replace` with a regex that matches the first letter of each word. The callback function receives each match and should return it uppercased.',
    hint2:
      'The pattern `\\b[a-z]` matches a lowercase letter at a word boundary (start of a word). With the `g` flag, it finds all such letters. Use `.replace(/\\b[a-z]/g, function(match) { return match.toUpperCase(); })` on the lowercased string.',
    resources: replaceRes,
  },

  // 6. Parse Key-Value Pairs
  {
    id: 1346,
    title: 'Parse Key-Value Pairs',
    type: 'js',
    tier: 4,
    category: ['regex', 'parsing'],
    tags: ['regex', 'match', 'capture-group', 'parsing', 'key-value'],
    description:
      'Create a function called `parseKeyValue` that takes a string of key-value pairs and returns an object. Pairs are separated by semicolons (`;`). Each pair has the format `key=value`. Keys are one or more word characters. Values can be either unquoted (word characters only) or quoted with double quotes (which can contain any character except double quotes). Strip the quotes from quoted values. Ignore any extra whitespace around keys, values, and separators.',
    starterCode: '',
    solution:
      'function parseKeyValue(str) {\n  var result = {};\n  var pairs = str.split(";");\n  for (var i = 0; i < pairs.length; i++) {\n    var trimmed = pairs[i].trim();\n    if (!trimmed) continue;\n    var match = trimmed.match(/^\\s*(\\w+)\\s*=\\s*"([^"]*)"\\s*$/) || trimmed.match(/^\\s*(\\w+)\\s*=\\s*(\\w*)\\s*$/);\n    if (match) {\n      result[match[1]] = match[2];\n    }\n  }\n  return result;\n}',
    testRunner: `(code) => {
  var fn = new Function(code + '; return parseKeyValue;')();
  var results = [];
  var r1 = fn('name=Alice;age=30');
  results.push({ pass: r1.name === 'Alice' && r1.age === '30', description: '"name=Alice;age=30" → { name: "Alice", age: "30" }', got: JSON.stringify(r1) });
  var r2 = fn('host = localhost ; port = 8080');
  results.push({ pass: r2.host === 'localhost' && r2.port === '8080', description: 'Whitespace around = and ; is handled', got: JSON.stringify(r2) });
  var r3 = fn('greeting="hello world";lang=en');
  results.push({ pass: r3.greeting === 'hello world' && r3.lang === 'en', description: 'Quoted value with space preserved, quotes stripped', got: JSON.stringify(r3) });
  var r4 = fn('key="value with = sign"');
  results.push({ pass: r4.key === 'value with = sign', description: 'Quoted value can contain = sign', got: JSON.stringify(r4) });
  var r5 = fn('empty=');
  results.push({ pass: r5.empty === '', description: 'Empty unquoted value becomes empty string', got: JSON.stringify(r5) });
  var r6 = fn('a=1;b=2;c=3');
  results.push({ pass: r6.a === '1' && r6.b === '2' && r6.c === '3', description: 'Three pairs all parsed correctly', got: JSON.stringify(r6) });
  var r7 = fn('msg="quoted"');
  results.push({ pass: r7.msg === 'quoted', description: 'Quoted single-word value has quotes stripped', got: JSON.stringify(r7) });
  var r8 = fn('');
  results.push({ pass: JSON.stringify(r8) === '{}', description: 'Empty string returns empty object', got: JSON.stringify(r8) });
  return results;
}`,
    hint1:
      'Split the string on semicolons to get individual pairs. For each pair, use a regex with capture groups to extract the key and value. The value might be quoted (surrounded by double quotes) or unquoted.',
    hint2:
      'Split on ";", trim each piece, skip empty ones. Try matching against a quoted pattern first: `/(\\w+)\\s*=\\s*"([^"]*)"` (key, then equals, then quoted value). If that fails, try unquoted: `/(\\w+)\\s*=\\s*(\\w*)` (key, then equals, then word chars). The captured groups give you key and value.',
    resources: matchRes,
  },

  // 7. Slug Generator
  {
    id: 1347,
    title: 'Slug Generator',
    type: 'js',
    tier: 4,
    category: ['regex', 'text-processing'],
    tags: ['regex', 'replace', 'slug', 'url', 'text-processing'],
    description:
      'Create a function called `slugify` that converts a title string into a URL-friendly slug. The rules are: convert to lowercase, replace spaces and any non-alphanumeric characters with hyphens, collapse consecutive hyphens into a single hyphen, and remove leading and trailing hyphens. For example, `"Hello World!"` becomes `"hello-world"`.',
    starterCode: '',
    solution:
      'function slugify(str) {\n  return str\n    .toLowerCase()\n    .replace(/[^a-z0-9]+/g, "-")\n    .replace(/^-+|-+$/g, "");\n}',
    testRunner: `(code) => {
  var fn = new Function(code + '; return slugify;')();
  var results = [];
  results.push({ pass: fn('Hello World') === 'hello-world', description: '"Hello World" → "hello-world"', got: fn('Hello World') });
  results.push({ pass: fn('My First Blog Post!') === 'my-first-blog-post', description: '"My First Blog Post!" → "my-first-blog-post"', got: fn('My First Blog Post!') });
  results.push({ pass: fn('  Leading Spaces  ') === 'leading-spaces', description: 'Leading/trailing spaces trimmed', got: fn('  Leading Spaces  ') });
  results.push({ pass: fn('Too   Many   Spaces') === 'too-many-spaces', description: 'Multiple spaces become single hyphen', got: fn('Too   Many   Spaces') });
  results.push({ pass: fn('Special @#$% Characters!') === 'special-characters', description: 'Special chars replaced and collapsed', got: fn('Special @#$% Characters!') });
  results.push({ pass: fn('already-a-slug') === 'already-a-slug', description: 'Already a slug stays the same', got: fn('already-a-slug') });
  results.push({ pass: fn('CamelCase Title') === 'camelcase-title', description: 'Uppercase converted to lowercase', got: fn('CamelCase Title') });
  results.push({ pass: fn('version 2.0 release') === 'version-2-0-release', description: 'Dots replaced with hyphens', got: fn('version 2.0 release') });
  return results;
}`,
    hint1:
      'Chain multiple string operations: lowercase first, then replace all non-alphanumeric characters with hyphens, then collapse runs of hyphens into one, and finally remove any hyphens at the start or end.',
    hint2:
      'Use `.toLowerCase()` first. Then `.replace(/[^a-z0-9]+/g, "-")` to replace any sequence of non-alphanumeric characters with a single hyphen. Finally `.replace(/^-+|-+$/g, "")` to trim hyphens from the edges.',
    resources: replaceRes,
  },

  // 8. Password Strength Checker
  {
    id: 1348,
    title: 'Password Strength',
    type: 'js',
    tier: 4,
    category: ['regex', 'lookahead'],
    tags: ['regex', 'lookahead', 'password', 'validation', 'test'],
    description:
      'Create a function called `checkPassword` that takes a string and returns an object describing its strength. Check these rules independently: `length` (at least 8 characters), `hasUpper` (contains at least one uppercase letter), `hasLower` (contains at least one lowercase letter), `hasDigit` (contains at least one digit), `hasSpecial` (contains at least one character that is not a letter or digit). Each property should be `true` or `false`. Also include a `score` property that counts how many of the five rules pass (0 to 5) and a `strong` property that is `true` only when all five rules pass.',
    starterCode: '',
    solution:
      'function checkPassword(str) {\n  var length = str.length >= 8;\n  var hasUpper = /[A-Z]/.test(str);\n  var hasLower = /[a-z]/.test(str);\n  var hasDigit = /\\d/.test(str);\n  var hasSpecial = /[^a-zA-Z0-9]/.test(str);\n  var score = (length ? 1 : 0) + (hasUpper ? 1 : 0) + (hasLower ? 1 : 0) + (hasDigit ? 1 : 0) + (hasSpecial ? 1 : 0);\n  return { length: length, hasUpper: hasUpper, hasLower: hasLower, hasDigit: hasDigit, hasSpecial: hasSpecial, score: score, strong: score === 5 };\n}',
    testRunner: `(code) => {
  var fn = new Function(code + '; return checkPassword;')();
  var results = [];
  var r1 = fn('Passw0rd!');
  results.push({ pass: r1.strong === true && r1.score === 5, description: '"Passw0rd!" is strong (all 5 checks pass)', got: JSON.stringify(r1) });
  var r2 = fn('abc');
  results.push({ pass: r2.length === false && r2.hasUpper === false && r2.hasLower === true && r2.hasDigit === false && r2.hasSpecial === false && r2.score === 1, description: '"abc" only passes hasLower (score: 1)', got: JSON.stringify(r2) });
  var r3 = fn('12345678');
  results.push({ pass: r3.length === true && r3.hasDigit === true && r3.hasUpper === false && r3.hasLower === false && r3.score === 2, description: '"12345678" passes length and hasDigit (score: 2)', got: JSON.stringify(r3) });
  var r4 = fn('');
  results.push({ pass: r4.score === 0 && r4.strong === false, description: 'Empty string scores 0', got: JSON.stringify(r4) });
  var r5 = fn('Abcdefgh');
  results.push({ pass: r5.length === true && r5.hasUpper === true && r5.hasLower === true && r5.hasDigit === false && r5.score === 3, description: '"Abcdefgh" passes length, upper, lower (score: 3)', got: JSON.stringify(r5) });
  var r6 = fn('A1b2c3!@');
  results.push({ pass: r6.strong === true, description: '"A1b2c3!@" is strong', got: JSON.stringify(r6) });
  var r7 = fn('UPPER123!');
  results.push({ pass: r7.hasLower === false && r7.score === 4, description: '"UPPER123!" missing lowercase (score: 4)', got: JSON.stringify(r7) });
  var r8 = fn('short!A1');
  results.push({ pass: r8.length === true && r8.strong === true, description: '"short!A1" (8 chars) passes all checks', got: JSON.stringify(r8) });
  return results;
}`,
    hint1:
      'Test each rule independently using a separate regex for each: uppercase `[A-Z]`, lowercase `[a-z]`, digit `\\d`, special character `[^a-zA-Z0-9]`. Check length with `.length`. Count the passing rules for the score.',
    hint2:
      'Use `.test(str)` for each regex check. For special characters, `[^a-zA-Z0-9]` matches anything that is NOT a letter or digit. Sum the boolean results (cast to 1 or 0) for the score. `strong` is true when score equals 5.',
    resources: [...regexTestRes, ...lookaheadRes],
  },

  // 9. Extract HTML Tags
  {
    id: 1349,
    title: 'Extract HTML Tags',
    type: 'js',
    tier: 4,
    category: ['regex', 'html-parsing'],
    tags: ['regex', 'match', 'capture-group', 'html', 'tags', 'unique'],
    description:
      'Create a function called `extractTags` that takes an HTML string and returns an array of unique tag names found in it, in order of first appearance. Extract tag names from opening tags like `<div>` and self-closing tags like `<br/>`, but ignore closing tags like `</div>`. Tag names consist of letters and numbers. Ignore attributes inside tags — you only need the tag name. The result should contain each tag name only once, in lowercase.',
    starterCode: '',
    solution:
      'function extractTags(html) {\n  var regex = /<([a-zA-Z][a-zA-Z0-9]*)(?:\\s[^>]*)?\\/?>/g;\n  var match;\n  var seen = {};\n  var result = [];\n  while ((match = regex.exec(html)) !== null) {\n    var tag = match[1].toLowerCase();\n    if (!seen[tag]) {\n      seen[tag] = true;\n      result.push(tag);\n    }\n  }\n  return result;\n}',
    testRunner: `(code) => {
  var fn = new Function(code + '; return extractTags;')();
  var results = [];
  var r1 = fn('<div><p>Hello</p></div>');
  results.push({ pass: JSON.stringify(r1) === '["div","p"]', description: '<div><p>...</p></div> → ["div", "p"]', got: JSON.stringify(r1) });
  var r2 = fn('<br/><hr/><img src="x.png"/>');
  results.push({ pass: JSON.stringify(r2) === '["br","hr","img"]', description: 'Self-closing tags extracted', got: JSON.stringify(r2) });
  var r3 = fn('<DIV class="main"><SPAN>text</SPAN></DIV>');
  results.push({ pass: JSON.stringify(r3) === '["div","span"]', description: 'Uppercase tags returned lowercase', got: JSON.stringify(r3) });
  var r4 = fn('<ul><li>A</li><li>B</li><li>C</li></ul>');
  results.push({ pass: JSON.stringify(r4) === '["ul","li"]', description: 'Repeated tags appear only once', got: JSON.stringify(r4) });
  var r5 = fn('no tags here');
  results.push({ pass: JSON.stringify(r5) === '[]', description: 'No tags returns empty array', got: JSON.stringify(r5) });
  var r6 = fn('<h1>Title</h1><h2>Subtitle</h2><p>Text</p>');
  results.push({ pass: JSON.stringify(r6) === '["h1","h2","p"]', description: 'Multiple different tags in order', got: JSON.stringify(r6) });
  var r7 = fn('<a href="http://example.com" target="_blank">Link</a>');
  results.push({ pass: JSON.stringify(r7) === '["a"]', description: 'Tag with attributes extracts just tag name', got: JSON.stringify(r7) });
  var r8 = fn('<input type="text" disabled/><button>Go</button>');
  results.push({ pass: JSON.stringify(r8) === '["input","button"]', description: 'Self-closing with attributes and regular tag both extracted', got: JSON.stringify(r8) });
  return results;
}`,
    hint1:
      'Use a regex that matches opening tags: starts with `<`, then a letter followed by optional letters/digits (the tag name), then optional attributes, then `>` or `/>`. Use a capture group around the tag name. Loop with `exec` to find all matches.',
    hint2:
      'The pattern `<([a-zA-Z][a-zA-Z0-9]*)` captures the tag name. Add `(?:\\s[^>]*)?` to skip attributes, then `\\/?>` to close. Use `regex.exec(html)` in a while loop with the `g` flag. Track seen tags in an object to ensure uniqueness.',
    resources: matchRes,
  },

  // 10. Template Engine
  {
    id: 1350,
    title: 'Template Engine',
    type: 'js',
    tier: 4,
    category: ['regex', 'template'],
    tags: ['regex', 'replace', 'template', 'interpolation', 'dot-notation'],
    description:
      'Create a function called `render` that takes a template string and a data object, and returns the template with all placeholders replaced. Placeholders use double curly braces: `{{key}}`. The function should support dot notation for nested values: `{{user.name}}` accesses `data.user.name`. If a placeholder references a key that does not exist, replace it with an empty string. Whitespace inside the braces should be trimmed: `{{ key }}` is the same as `{{key}}`.',
    starterCode: '',
    solution:
      'function render(template, data) {\n  return template.replace(/\\{\\{\\s*([^}]+?)\\s*\\}\\}/g, function(match, key) {\n    var parts = key.split(".");\n    var value = data;\n    for (var i = 0; i < parts.length; i++) {\n      if (value === undefined || value === null) return "";\n      value = value[parts[i]];\n    }\n    return value !== undefined && value !== null ? String(value) : "";\n  });\n}',
    testRunner: `(code) => {
  var fn = new Function(code + '; return render;')();
  var results = [];
  results.push({ pass: fn('Hello, {{name}}!', { name: 'Alice' }) === 'Hello, Alice!', description: 'Simple placeholder replaced', got: fn('Hello, {{name}}!', { name: 'Alice' }) });
  results.push({ pass: fn('{{a}} and {{b}}', { a: 'X', b: 'Y' }) === 'X and Y', description: 'Multiple placeholders replaced', got: fn('{{a}} and {{b}}', { a: 'X', b: 'Y' }) });
  results.push({ pass: fn('Hi {{user.name}}', { user: { name: 'Bob' } }) === 'Hi Bob', description: 'Dot notation accesses nested value', got: fn('Hi {{user.name}}', { user: { name: 'Bob' } }) });
  results.push({ pass: fn('Missing: {{x}}', {}) === 'Missing: ', description: 'Missing key replaced with empty string', got: JSON.stringify(fn('Missing: {{x}}', {})) });
  results.push({ pass: fn('{{ spaced }}', { spaced: 'ok' }) === 'ok', description: 'Whitespace inside braces is trimmed', got: fn('{{ spaced }}', { spaced: 'ok' }) });
  results.push({ pass: fn('No placeholders', { a: 1 }) === 'No placeholders', description: 'String with no placeholders returned as-is', got: fn('No placeholders', { a: 1 }) });
  results.push({ pass: fn('{{a.b.c}}', { a: { b: { c: 'deep' } } }) === 'deep', description: 'Deep dot notation (3 levels) works', got: fn('{{a.b.c}}', { a: { b: { c: 'deep' } } }) });
  results.push({ pass: fn('Count: {{n}}', { n: 42 }) === 'Count: 42', description: 'Number value converted to string', got: fn('Count: {{n}}', { n: 42 }) });
  return results;
}`,
    hint1:
      'Use `replace` with a regex that matches `{{...}}` and captures the key inside. In the replacement callback, split the key on dots and walk through the data object one level at a time. If any level is missing, return an empty string.',
    hint2:
      'The regex `\\{\\{\\s*([^}]+?)\\s*\\}\\}` matches double braces with optional whitespace and captures the key. In the callback, split the key on `"."`, then loop: `value = value[parts[i]]`. Check for undefined/null at each step. Convert the final value to a string.',
    resources: replaceRes,
  },

];

// ─── Validation ─────────────────────────────────────────────────────────────

async function validate() {
  let pass = 0;
  let fail = 0;

  for (const ex of exercises) {
    try {
      const runner = new Function(`return (${ex.testRunner})`)();
      const results = runner(ex.solution);
      let exercisePassed = true;
      results.forEach((r) => {
        if (r.pass) {
          pass++;
        } else {
          exercisePassed = false;
          fail++;
          console.error(`  FAIL [${ex.id}] ${ex.title}: ${r.description} — got ${r.got}`);
        }
      });
      if (exercisePassed) {
        console.log(`  \u2713 [${ex.id}] ${ex.title} (${results.length} tests)`);
      }
    } catch (err) {
      fail++;
      console.error(`  ERROR [${ex.id}] ${ex.title}: ${err.message}`);
    }
  }

  console.log(`\nValidation: ${pass} passed, ${fail} failed out of ${pass + fail} tests`);
  if (fail > 0) process.exit(1);
}

// ─── Append to Curriculum ───────────────────────────────────────────────────

function appendToCurriculum() {
  const curriculum = JSON.parse(fs.readFileSync(CURRICULUM_PATH, 'utf-8'));
  const existingIds = new Set(curriculum.exercises.map((e) => e.id));

  let added = 0;
  exercises.forEach((ex) => {
    if (existingIds.has(ex.id)) {
      console.log(`  SKIP [${ex.id}] ${ex.title} (already exists)`);
    } else {
      curriculum.exercises.push(ex);
      added++;
      console.log(`  ADD  [${ex.id}] ${ex.title}`);
    }
  });

  fs.writeFileSync(CURRICULUM_PATH, JSON.stringify(curriculum, null, 2) + '\n');
  console.log(`\nAppended ${added} exercises (${curriculum.exercises.length} total)`);
}

// ─── Main ───────────────────────────────────────────────────────────────────

async function main() {
  const flag = process.argv[2];

  console.log(
    `T4 Regex Deep Dive — Section 4: ${exercises.length} exercises (IDs ${exercises[0].id}-${exercises[exercises.length - 1].id})`
  );

  if (flag === '--validate') {
    console.log('Validating testRunners against solutions...\n');
    await validate();
  } else {
    console.log('Validating before appending...\n');
    await validate();
    console.log('\nAppending to curriculum...\n');
    appendToCurriculum();
  }
}

main();
