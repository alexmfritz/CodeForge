#!/usr/bin/env node
/**
 * Generator: T3 DOM & Events — Section 6 (14 exercises, IDs 1287-1300)
 *
 * Covers: DOM Selection, DOM Manipulation, Creating Elements, Events
 *
 * NOTE: DOM exercises require jsdom for Node.js validation.
 * In the browser, the jsRunner auto-routes to an iframe sandbox when the
 * testRunner contains `document.createElement` or `dispatchEvent`.
 *
 * Usage:
 *   node exercises/_gen_t3_dom_events.js            # Append to curriculum
 *   node exercises/_gen_t3_dom_events.js --validate  # Validate testRunners only
 */

const fs = require('fs');
const path = require('path');

let JSDOM;
try {
  JSDOM = require('jsdom').JSDOM;
} catch {
  // Handled in validate()
}

const CURRICULUM_PATH = path.join(
  __dirname,
  'collections',
  'default-curriculum.json'
);

// ─── Resources (MDN only for T3) ────────────────────────────────────────────

const selectionRes = [
  { label: 'MDN: getElementById', url: 'https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementById', description: 'getElementById reference' },
  { label: 'MDN: querySelector', url: 'https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector', description: 'querySelector reference' },
];
const querySelectorAllRes = [
  { label: 'MDN: querySelectorAll', url: 'https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll', description: 'querySelectorAll reference' },
];
const manipulationRes = [
  { label: 'MDN: textContent', url: 'https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent', description: 'textContent property reference' },
];
const styleRes = [
  { label: 'MDN: HTMLElement.style', url: 'https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/style', description: 'Inline style reference' },
];
const classListRes = [
  { label: 'MDN: classList', url: 'https://developer.mozilla.org/en-US/docs/Web/API/Element/classList', description: 'classList reference' },
];
const attrRes = [
  { label: 'MDN: setAttribute', url: 'https://developer.mozilla.org/en-US/docs/Web/API/Element/setAttribute', description: 'setAttribute reference' },
  { label: 'MDN: getAttribute', url: 'https://developer.mozilla.org/en-US/docs/Web/API/Element/getAttribute', description: 'getAttribute reference' },
];
const creationRes = [
  { label: 'MDN: createElement', url: 'https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement', description: 'createElement reference' },
  { label: 'MDN: appendChild', url: 'https://developer.mozilla.org/en-US/docs/Web/API/Node/appendChild', description: 'appendChild reference' },
];
const removeRes = [
  { label: 'MDN: Element.remove', url: 'https://developer.mozilla.org/en-US/docs/Web/API/Element/remove', description: 'remove() reference' },
];
const eventRes = [
  { label: 'MDN: addEventListener', url: 'https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener', description: 'addEventListener reference' },
  { label: 'MDN: Event', url: 'https://developer.mozilla.org/en-US/docs/Web/API/Event', description: 'Event interface reference' },
];
const formEventRes = [
  { label: 'MDN: preventDefault', url: 'https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault', description: 'preventDefault reference' },
  { label: 'MDN: HTMLFormElement', url: 'https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement', description: 'Form element reference' },
];

// ─── Exercise Definitions ───────────────────────────────────────────────────

const exercises = [

  // ══════════════════════════════════════════════════════════════════════════
  // SUB-SECTION A: DOM Selection (3 exercises, IDs 1287-1289)
  // ══════════════════════════════════════════════════════════════════════════

  // 1. getElementById (ENTRY POINT)
  {
    id: 1287,
    title: 'getElementById',
    type: 'js',
    tier: 3,
    category: ['dom-manipulation', 'selection'],
    tags: ['dom', 'getElementById', 'selection', 'textContent'],
    description:
      'Write a function that finds an element by its ID and returns its text content.',
    instructions:
      'The DOM (Document Object Model) is how JavaScript connects to HTML. The browser converts your HTML into a tree of objects — each element becomes a "node" you can find, read, and change with JavaScript.\n\n`document.getElementById(id)` finds a single element by its `id` attribute. It returns the element object, or `null` if no element has that ID.\n\nOnce you have an element, `element.textContent` gives you all the text inside it.\n\nSyntax:\n```\nconst el = document.getElementById("myId");\nel.textContent; // "the text inside"\n```\n\nWrite `getTextById(id)` — find the element with the given ID and return its text content. If no element is found, return `null` (see `@param`/`@returns` in the starter code).',
    starterCode:
      '/**\n * @param {string} id - The id attribute of the element to find\n * @returns {string|null} The text content of the element, or null if not found\n */\nfunction getTextById(id) {\n\n}\n',
    solution:
      'function getTextById(id) {\n  const element = document.getElementById(id);\n  if (!element) return null;\n  return element.textContent;\n}',
    testRunner: `(code) => {
  const root = document.createElement('div');
  root.innerHTML = '<h1 id="title">Welcome</h1><p id="subtitle">Learn JavaScript</p><span id="count">42</span><div id="empty"></div><p id="multi">Hello <strong>World</strong></p>';
  document.body.appendChild(root);
  const fn = new Function(code + '; return getTextById;')();
  const r1 = fn('title');
  const r2 = fn('subtitle');
  const r3 = fn('count');
  const r4 = fn('nonexistent');
  const r5 = fn('empty');
  const r6 = fn('multi');
  const r7 = fn('');
  const r8 = fn('TITLE');
  const r9 = fn('title');
  return [
    { pass: r1 === 'Welcome', description: 'id "title" returns "Welcome"', got: String(r1) },
    { pass: r2 === 'Learn JavaScript', description: 'id "subtitle" returns "Learn JavaScript"', got: String(r2) },
    { pass: r3 === '42', description: 'id "count" returns "42" (string)', got: String(r3) },
    { pass: r4 === null, description: 'id "nonexistent" returns null', got: String(r4) },
    { pass: r5 === '', description: 'id "empty" returns "" (empty string)', got: JSON.stringify(r5) },
    { pass: r6 === 'Hello World', description: 'id "multi" returns "Hello World" (includes nested text)', got: String(r6) },
    { pass: r7 === null, description: 'empty string id returns null', got: String(r7) },
    { pass: r8 === null, description: '"TITLE" (wrong case) returns null — IDs are case-sensitive', got: String(r8) },
    { pass: r9 === 'Welcome', description: 'calling twice with same id still works', got: String(r9) }
  ];
}`,
    hints: [
      'Use `document.getElementById(id)` to find the element. Check if the result is `null` before accessing `.textContent`. Return `null` if no element is found.',
      'The structure is: `const element = document.getElementById(id); if (!element) return null; return element.textContent;`. The null check prevents errors when the ID does not exist.',
    ],
    resources: selectionRes,
  },

  // 2. querySelector
  {
    id: 1288,
    title: 'querySelector',
    type: 'js',
    tier: 3,
    category: ['dom-manipulation', 'selection'],
    tags: ['dom', 'querySelector', 'css-selector', 'selection'],
    description:
      'Write a function that uses a CSS selector to find an element and return its text content.',
    starterCode:
      '/**\n * @param {string} selector - A CSS selector (e.g., "#id", ".class", "tag")\n * @returns {string|null} The text content of the first matching element, or null if none found\n */\nfunction queryText(selector) {\n\n}\n',
    solution:
      'function queryText(selector) {\n  const element = document.querySelector(selector);\n  if (!element) return null;\n  return element.textContent;\n}',
    testRunner: `(code) => {
  const root = document.createElement('div');
  root.innerHTML = '<h1 class="heading">Title</h1><p class="info">First</p><p class="info">Second</p><span data-role="badge">New</span><ul id="nav"><li>Home</li><li>About</li></ul>';
  document.body.appendChild(root);
  const fn = new Function(code + '; return queryText;')();
  const r1 = fn('.heading');
  const r2 = fn('.info');
  const r3 = fn('#nav');
  const r4 = fn('[data-role="badge"]');
  const r5 = fn('li');
  const r6 = fn('.nonexistent');
  const r7 = fn('h1');
  const r8 = fn('#nav li');
  const r9 = fn('span');
  return [
    { pass: r1 === 'Title', description: '".heading" returns "Title"', got: String(r1) },
    { pass: r2 === 'First', description: '".info" returns "First" (first match only)', got: String(r2) },
    { pass: r3 === 'HomeAbout', description: '"#nav" returns combined text of ul', got: String(r3) },
    { pass: r4 === 'New', description: '[data-role="badge"] returns "New"', got: String(r4) },
    { pass: r5 === 'Home', description: '"li" returns "Home" (first li)', got: String(r5) },
    { pass: r6 === null, description: '".nonexistent" returns null', got: String(r6) },
    { pass: r7 === 'Title', description: '"h1" tag selector returns "Title"', got: String(r7) },
    { pass: r8 === 'Home', description: '"#nav li" descendant selector returns "Home"', got: String(r8) },
    { pass: r9 === 'New', description: '"span" returns "New"', got: String(r9) }
  ];
}`,
    hints: [
      '`document.querySelector(selector)` works just like CSS selectors — `.class`, `#id`, `tag`, `[attribute]`, and even combined selectors like `#nav li`. It returns the first match or `null`.',
      'The pattern is identical to `getElementById` but more flexible: `const element = document.querySelector(selector); if (!element) return null; return element.textContent;`',
    ],
    resources: selectionRes,
  },

  // 3. querySelectorAll
  {
    id: 1289,
    title: 'querySelectorAll',
    type: 'js',
    tier: 3,
    category: ['dom-manipulation', 'selection'],
    tags: ['dom', 'querySelectorAll', 'NodeList', 'Array.from'],
    description:
      'Write a function that selects all matching elements and returns an array of their text content.',
    starterCode:
      '/**\n * @param {string} selector - A CSS selector\n * @returns {string[]} An array of text content from all matching elements\n */\nfunction queryAllText(selector) {\n\n}\n',
    solution:
      'function queryAllText(selector) {\n  const elements = document.querySelectorAll(selector);\n  return Array.from(elements).map(el => el.textContent);\n}',
    testRunner: `(code) => {
  const root = document.createElement('div');
  root.innerHTML = '<ul><li class="item">Apple</li><li class="item">Banana</li><li class="item">Cherry</li></ul><p class="note">Note 1</p><p class="note">Note 2</p><span class="tag">JS</span><span class="tag">CSS</span><span class="tag">HTML</span>';
  document.body.appendChild(root);
  const fn = new Function(code + '; return queryAllText;')();
  const r1 = fn('.item');
  const r2 = fn('.note');
  const r3 = fn('.tag');
  const r4 = fn('.nonexistent');
  const r5 = fn('li');
  const r6 = fn('span');
  const r7 = fn('p');
  const r8 = Array.isArray(fn('.item'));
  const r9 = Array.isArray(fn('.nonexistent'));
  return [
    { pass: JSON.stringify(r1) === '["Apple","Banana","Cherry"]', description: '".item" returns ["Apple","Banana","Cherry"]', got: JSON.stringify(r1) },
    { pass: JSON.stringify(r2) === '["Note 1","Note 2"]', description: '".note" returns ["Note 1","Note 2"]', got: JSON.stringify(r2) },
    { pass: JSON.stringify(r3) === '["JS","CSS","HTML"]', description: '".tag" returns ["JS","CSS","HTML"]', got: JSON.stringify(r3) },
    { pass: JSON.stringify(r4) === '[]', description: '".nonexistent" returns [] (empty array)', got: JSON.stringify(r4) },
    { pass: r5.length === 3, description: '"li" finds 3 elements', got: String(r5.length) },
    { pass: r6.length === 3, description: '"span" finds 3 elements', got: String(r6.length) },
    { pass: r7.length === 2, description: '"p" finds 2 elements', got: String(r7.length) },
    { pass: r8 === true, description: 'Result is a real Array (not NodeList)', got: String(r8) },
    { pass: r9 === true, description: 'Empty result is still an Array', got: String(r9) }
  ];
}`,
    hints: [
      '`querySelectorAll` returns a NodeList, not an Array. Convert it with `Array.from(nodeList)` or `[...nodeList]`, then use `.map()` to extract each element\'s `.textContent`.',
      'The structure is: `const elements = document.querySelectorAll(selector); return Array.from(elements).map(el => el.textContent);`. This always returns an array, even if empty.',
    ],
    resources: [...querySelectorAllRes, ...selectionRes],
  },

  // ══════════════════════════════════════════════════════════════════════════
  // SUB-SECTION B: DOM Manipulation (4 exercises, IDs 1290-1293)
  // ══════════════════════════════════════════════════════════════════════════

  // 4. Change Text Content (ENTRY POINT)
  {
    id: 1290,
    title: 'Change Text Content',
    type: 'js',
    tier: 3,
    category: ['dom-manipulation', 'manipulation'],
    tags: ['dom', 'textContent', 'manipulation', 'write'],
    description:
      'Write a function that updates the text content of an element found by ID.',
    instructions:
      'Reading from the DOM is only half the story — you can also change elements. Setting `element.textContent` replaces all the text inside an element.\n\nSyntax:\n```\nconst el = document.getElementById("greeting");\nel.textContent = "Hello!"; // replaces the text\n```\n\nThis is one-way: setting `textContent` removes any existing child elements and replaces everything with plain text. It\'s the safest way to set text because it won\'t accidentally inject HTML.\n\nWrite `setText(id, text)` — find the element by ID and set its text content (see `@param` in the starter code).',
    starterCode:
      '/**\n * @param {string} id - The id of the element to update\n * @param {string} text - The new text content\n */\nfunction setText(id, text) {\n\n}\n',
    solution:
      'function setText(id, text) {\n  const element = document.getElementById(id);\n  if (element) {\n    element.textContent = text;\n  }\n}',
    testRunner: `(code) => {
  const root = document.createElement('div');
  root.innerHTML = '<h1 id="title">Old Title</h1><p id="message">Original</p><span id="counter">0</span><div id="box">Content</div>';
  document.body.appendChild(root);
  const fn = new Function(code + '; return setText;')();
  fn('title', 'New Title');
  const r1 = document.getElementById('title').textContent;
  fn('message', 'Updated message');
  const r2 = document.getElementById('message').textContent;
  fn('counter', '99');
  const r3 = document.getElementById('counter').textContent;
  fn('title', '');
  const r4 = document.getElementById('title').textContent;
  fn('box', 'Hello World');
  const r5 = document.getElementById('box').textContent;
  fn('nonexistent', 'test');
  const r6 = true;
  fn('message', '<b>bold</b>');
  const r7 = document.getElementById('message').textContent;
  fn('counter', '0');
  const r8 = document.getElementById('counter').textContent;
  fn('title', 'Final');
  const r9 = document.getElementById('title').textContent;
  return [
    { pass: r1 === 'New Title', description: 'Set title to "New Title"', got: r1 },
    { pass: r2 === 'Updated message', description: 'Set message to "Updated message"', got: r2 },
    { pass: r3 === '99', description: 'Set counter to "99"', got: r3 },
    { pass: r4 === '', description: 'Set title to empty string', got: JSON.stringify(r4) },
    { pass: r5 === 'Hello World', description: 'Set box to "Hello World"', got: r5 },
    { pass: r6 === true, description: 'Non-existent ID does not throw', got: 'no error' },
    { pass: r7 === '<b>bold</b>', description: 'HTML tags appear as plain text (textContent is safe)', got: r7 },
    { pass: r8 === '0', description: 'Set counter back to "0"', got: r8 },
    { pass: r9 === 'Final', description: 'Set title to "Final" (overwrites empty)', got: r9 }
  ];
}`,
    hints: [
      'Find the element with `document.getElementById(id)`, then set `element.textContent = text`. Check that the element exists before setting to avoid errors with invalid IDs.',
      'The structure is: `const element = document.getElementById(id); if (element) { element.textContent = text; }`. The if-check handles the case where the ID doesn\'t match any element.',
    ],
    resources: manipulationRes,
  },

  // 5. Modify Styles
  {
    id: 1291,
    title: 'Modify Styles',
    type: 'js',
    tier: 3,
    category: ['dom-manipulation', 'manipulation'],
    tags: ['dom', 'style', 'inline-style', 'manipulation'],
    description:
      'Write a function that changes an inline style property on an element.',
    starterCode:
      '/**\n * @param {string} id - The element ID\n * @param {string} property - The CSS property in camelCase (e.g., "backgroundColor")\n * @param {string} value - The CSS value (e.g., "red", "20px")\n */\nfunction setStyle(id, property, value) {\n\n}\n',
    solution:
      'function setStyle(id, property, value) {\n  const element = document.getElementById(id);\n  if (element) {\n    element.style[property] = value;\n  }\n}',
    testRunner: `(code) => {
  const root = document.createElement('div');
  root.innerHTML = '<div id="box">Box</div><p id="text">Hello</p><span id="badge">New</span>';
  document.body.appendChild(root);
  const fn = new Function(code + '; return setStyle;')();
  fn('box', 'color', 'red');
  const r1 = document.getElementById('box').style.color;
  fn('box', 'backgroundColor', 'blue');
  const r2 = document.getElementById('box').style.backgroundColor;
  fn('text', 'fontSize', '24px');
  const r3 = document.getElementById('text').style.fontSize;
  fn('text', 'fontWeight', 'bold');
  const r4 = document.getElementById('text').style.fontWeight;
  fn('badge', 'display', 'none');
  const r5 = document.getElementById('badge').style.display;
  fn('badge', 'display', 'inline');
  const r6 = document.getElementById('badge').style.display;
  fn('box', 'padding', '10px');
  const r7 = document.getElementById('box').style.padding;
  fn('nonexistent', 'color', 'red');
  const r8 = true;
  fn('box', 'color', 'green');
  const r9 = document.getElementById('box').style.color;
  return [
    { pass: r1 === 'red', description: 'Set box color to "red"', got: r1 },
    { pass: r2 === 'blue', description: 'Set box backgroundColor to "blue"', got: r2 },
    { pass: r3 === '24px', description: 'Set text fontSize to "24px"', got: r3 },
    { pass: r4 === 'bold', description: 'Set text fontWeight to "bold"', got: r4 },
    { pass: r5 === 'none', description: 'Set badge display to "none"', got: r5 },
    { pass: r6 === 'inline', description: 'Set badge display to "inline"', got: r6 },
    { pass: r7 === '10px', description: 'Set box padding to "10px"', got: r7 },
    { pass: r8 === true, description: 'Non-existent ID does not throw', got: 'no error' },
    { pass: r9 === 'green', description: 'Overwrite box color to "green"', got: r9 }
  ];
}`,
    hints: [
      'Access inline styles with `element.style[property]` using bracket notation (since the property name is a variable). CSS properties use camelCase in JavaScript: `background-color` becomes `backgroundColor`.',
      'The structure is: `const element = document.getElementById(id); if (element) { element.style[property] = value; }`. Bracket notation lets you use a variable as the property name.',
    ],
    resources: styleRes,
  },

  // 6. classList
  {
    id: 1292,
    title: 'classList',
    type: 'js',
    tier: 3,
    category: ['dom-manipulation', 'manipulation'],
    tags: ['dom', 'classList', 'add', 'remove', 'toggle', 'contains'],
    description:
      'Write a function that adds, removes, or toggles a CSS class on an element and reports whether the class is present.',
    starterCode:
      '/**\n * @param {string} id - The element ID\n * @param {string} action - "add", "remove", or "toggle"\n * @param {string} className - The class name to modify\n * @returns {boolean} Whether the element has the class after the operation\n */\nfunction modifyClass(id, action, className) {\n\n}\n',
    solution:
      'function modifyClass(id, action, className) {\n  const element = document.getElementById(id);\n  if (action === "add") element.classList.add(className);\n  else if (action === "remove") element.classList.remove(className);\n  else if (action === "toggle") element.classList.toggle(className);\n  return element.classList.contains(className);\n}',
    testRunner: `(code) => {
  const root = document.createElement('div');
  root.innerHTML = '<div id="box" class="red large">Box</div><p id="text">Text</p><span id="tag" class="active">Tag</span>';
  document.body.appendChild(root);
  const fn = new Function(code + '; return modifyClass;')();
  const r1 = fn('box', 'add', 'highlight');
  const r2 = fn('box', 'remove', 'red');
  const r3 = fn('box', 'toggle', 'large');
  const r4 = fn('box', 'toggle', 'large');
  const r5 = fn('text', 'add', 'bold');
  const r6 = fn('text', 'remove', 'bold');
  const r7 = fn('tag', 'toggle', 'active');
  const r8 = fn('tag', 'toggle', 'active');
  const r9 = fn('box', 'add', 'highlight');
  return [
    { pass: r1 === true, description: 'Add "highlight" → true (now has it)', got: String(r1) },
    { pass: r2 === false, description: 'Remove "red" → false (no longer has it)', got: String(r2) },
    { pass: r3 === false, description: 'Toggle "large" off → false', got: String(r3) },
    { pass: r4 === true, description: 'Toggle "large" on → true', got: String(r4) },
    { pass: r5 === true, description: 'Add "bold" to text → true', got: String(r5) },
    { pass: r6 === false, description: 'Remove "bold" from text → false', got: String(r6) },
    { pass: r7 === false, description: 'Toggle "active" off tag → false', got: String(r7) },
    { pass: r8 === true, description: 'Toggle "active" on tag → true', got: String(r8) },
    { pass: r9 === true, description: 'Add "highlight" again (already has it) → true', got: String(r9) }
  ];
}`,
    hints: [
      'Use `element.classList.add(className)`, `.remove(className)`, or `.toggle(className)` based on the action. After the operation, `element.classList.contains(className)` tells you if the class is present.',
      'Use an if/else chain: `if (action === "add") element.classList.add(className); else if (action === "remove") ...`. Then return `element.classList.contains(className)` for all cases.',
    ],
    resources: classListRes,
  },

  // 7. Set Attributes
  {
    id: 1293,
    title: 'Set Attributes',
    type: 'js',
    tier: 3,
    category: ['dom-manipulation', 'manipulation'],
    tags: ['dom', 'setAttribute', 'getAttribute', 'attributes'],
    description:
      'Write a function that sets an attribute on an element and another that reads an attribute value.',
    starterCode:
      '/**\n * @param {string} id - The element ID\n * @param {string} attr - The attribute name (e.g., "href", "src", "disabled")\n * @param {string} value - The attribute value to set\n */\nfunction setAttr(id, attr, value) {\n\n}\n\n/**\n * @param {string} id - The element ID\n * @param {string} attr - The attribute name to read\n * @returns {string|null} The attribute value, or null if not set\n */\nfunction getAttr(id, attr) {\n\n}\n',
    solution:
      'function setAttr(id, attr, value) {\n  const element = document.getElementById(id);\n  if (element) {\n    element.setAttribute(attr, value);\n  }\n}\n\nfunction getAttr(id, attr) {\n  const element = document.getElementById(id);\n  if (!element) return null;\n  return element.getAttribute(attr);\n}',
    testRunner: `(code) => {
  const root = document.createElement('div');
  root.innerHTML = '<a id="link" href="https://example.com">Link</a><img id="img" src="photo.jpg" alt="Photo"><input id="input" type="text"><button id="btn">Click</button>';
  document.body.appendChild(root);
  const fns = new Function(code + '; return { setAttr, getAttr };')();
  const r1 = fns.getAttr('link', 'href');
  fns.setAttr('link', 'href', 'https://new-url.com');
  const r2 = fns.getAttr('link', 'href');
  const r3 = fns.getAttr('img', 'alt');
  fns.setAttr('img', 'alt', 'New photo');
  const r4 = fns.getAttr('img', 'alt');
  fns.setAttr('input', 'placeholder', 'Enter name');
  const r5 = fns.getAttr('input', 'placeholder');
  fns.setAttr('btn', 'disabled', '');
  const r6 = fns.getAttr('btn', 'disabled');
  fns.setAttr('link', 'data-count', '5');
  const r7 = fns.getAttr('link', 'data-count');
  const r8 = fns.getAttr('input', 'nonexistent');
  const r9 = fns.getAttr('img', 'src');
  return [
    { pass: r1 === 'https://example.com', description: 'Read link href: "https://example.com"', got: String(r1) },
    { pass: r2 === 'https://new-url.com', description: 'Set then read link href: "https://new-url.com"', got: String(r2) },
    { pass: r3 === 'Photo', description: 'Read img alt: "Photo"', got: String(r3) },
    { pass: r4 === 'New photo', description: 'Set then read img alt: "New photo"', got: String(r4) },
    { pass: r5 === 'Enter name', description: 'Set placeholder on input', got: String(r5) },
    { pass: r6 !== null, description: 'Set disabled on button (attribute exists)', got: String(r6) },
    { pass: r7 === '5', description: 'Set and read data-count custom attribute', got: String(r7) },
    { pass: r8 === null, description: 'Read nonexistent attribute returns null', got: String(r8) },
    { pass: r9 === 'photo.jpg', description: 'Read img src: "photo.jpg"', got: String(r9) }
  ];
}`,
    hints: [
      '`element.setAttribute(attr, value)` sets any attribute. `element.getAttribute(attr)` reads it back (returns `null` if the attribute doesn\'t exist). These work for standard attributes like `href` and custom ones like `data-*`.',
      'For `setAttr`: find element, call `element.setAttribute(attr, value)`. For `getAttr`: find element, return `element.getAttribute(attr)`. Handle missing elements by returning `null`.',
    ],
    resources: attrRes,
  },

  // ══════════════════════════════════════════════════════════════════════════
  // SUB-SECTION C: Creating Elements (3 exercises, IDs 1294-1296)
  // ══════════════════════════════════════════════════════════════════════════

  // 8. Create & Append (ENTRY POINT)
  {
    id: 1294,
    title: 'Create and Append',
    type: 'js',
    tier: 3,
    category: ['dom-manipulation', 'creation'],
    tags: ['dom', 'createElement', 'appendChild', 'textContent'],
    description:
      'Write a function that creates a new element with text and appends it to a container.',
    instructions:
      'You can create brand-new HTML elements with JavaScript and add them to the page.\n\n`document.createElement(tag)` creates a new element (not yet on the page).\n`element.textContent = "..."` sets its text.\n`parent.appendChild(child)` places it inside a parent element.\n\nSyntax:\n```\nconst p = document.createElement("p");\np.textContent = "New paragraph";\ndocument.getElementById("container").appendChild(p);\n```\n\nThe new element only appears on the page after `appendChild`. Until then, it exists in memory but is invisible.\n\nWrite `createAndAppend(tag, text, parentId)` — create an element of the given tag, set its text, and append it to the parent (see `@param`/`@returns` in the starter code).',
    starterCode:
      '/**\n * @param {string} tag - The HTML tag name (e.g., "p", "div", "span")\n * @param {string} text - The text content for the new element\n * @param {string} parentId - The ID of the parent element to append to\n * @returns {HTMLElement} The newly created element\n */\nfunction createAndAppend(tag, text, parentId) {\n\n}\n',
    solution:
      'function createAndAppend(tag, text, parentId) {\n  const element = document.createElement(tag);\n  element.textContent = text;\n  document.getElementById(parentId).appendChild(element);\n  return element;\n}',
    testRunner: `(code) => {
  const root = document.createElement('div');
  root.innerHTML = '<div id="container"></div><div id="list"></div>';
  document.body.appendChild(root);
  const fn = new Function(code + '; return createAndAppend;')();
  const e1 = fn('p', 'Hello', 'container');
  const r1 = document.getElementById('container').children.length;
  const r2 = e1.tagName;
  const r3 = e1.textContent;
  const e2 = fn('span', 'World', 'container');
  const r4 = document.getElementById('container').children.length;
  const r5 = e2.tagName;
  fn('div', 'Item 1', 'list');
  fn('div', 'Item 2', 'list');
  fn('div', 'Item 3', 'list');
  const r6 = document.getElementById('list').children.length;
  const r7 = document.getElementById('list').children[1].textContent;
  const e3 = fn('h2', 'Title', 'container');
  const r8 = e3.tagName;
  const r9 = document.getElementById('container').lastChild.textContent;
  return [
    { pass: r1 === 1, description: 'Container has 1 child after first append', got: String(r1) },
    { pass: r2 === 'P', description: 'Created element is a <p>', got: r2 },
    { pass: r3 === 'Hello', description: 'Element text is "Hello"', got: r3 },
    { pass: r4 === 2, description: 'Container has 2 children after second append', got: String(r4) },
    { pass: r5 === 'SPAN', description: 'Second element is a <span>', got: r5 },
    { pass: r6 === 3, description: 'List has 3 children after three appends', got: String(r6) },
    { pass: r7 === 'Item 2', description: 'Second list child has text "Item 2"', got: r7 },
    { pass: r8 === 'H2', description: 'Created h2 element', got: r8 },
    { pass: r9 === 'Title', description: 'Last child of container is the h2 with "Title"', got: r9 }
  ];
}`,
    hints: [
      'Three steps: `document.createElement(tag)` creates it, `element.textContent = text` fills it, `document.getElementById(parentId).appendChild(element)` places it. Return the element.',
      'The full pattern: `const element = document.createElement(tag); element.textContent = text; document.getElementById(parentId).appendChild(element); return element;`',
    ],
    resources: creationRes,
  },

  // 9. Build a List
  {
    id: 1295,
    title: 'Build a List',
    type: 'js',
    tier: 3,
    category: ['dom-manipulation', 'creation'],
    tags: ['dom', 'createElement', 'appendChild', 'loop', 'list'],
    description:
      'Write a function that creates a ul element with li children from an array and appends it to a container.',
    starterCode:
      '/**\n * @param {string[]} items - Array of strings for list items\n * @param {string} containerId - ID of the container to append the list to\n * @returns {HTMLUListElement} The created <ul> element\n */\nfunction buildList(items, containerId) {\n\n}\n',
    solution:
      'function buildList(items, containerId) {\n  const ul = document.createElement("ul");\n  items.forEach(item => {\n    const li = document.createElement("li");\n    li.textContent = item;\n    ul.appendChild(li);\n  });\n  document.getElementById(containerId).appendChild(ul);\n  return ul;\n}',
    testRunner: `(code) => {
  const root = document.createElement('div');
  root.innerHTML = '<div id="container"></div><div id="other"></div>';
  document.body.appendChild(root);
  const fn = new Function(code + '; return buildList;')();
  const ul1 = fn(['Apple', 'Banana', 'Cherry'], 'container');
  const r1 = ul1.tagName;
  const r2 = ul1.children.length;
  const r3 = ul1.children[0].textContent;
  const r4 = ul1.children[2].textContent;
  const r5 = ul1.children[0].tagName;
  const ul2 = fn(['One'], 'other');
  const r6 = ul2.children.length;
  const ul3 = fn([], 'other');
  const r7 = ul3.children.length;
  const r8 = document.getElementById('container').children.length;
  const r9 = document.getElementById('other').children.length;
  return [
    { pass: r1 === 'UL', description: 'Returns a <ul> element', got: r1 },
    { pass: r2 === 3, description: '3-item array creates 3 <li> children', got: String(r2) },
    { pass: r3 === 'Apple', description: 'First <li> has text "Apple"', got: r3 },
    { pass: r4 === 'Cherry', description: 'Last <li> has text "Cherry"', got: r4 },
    { pass: r5 === 'LI', description: 'Children are <li> elements', got: r5 },
    { pass: r6 === 1, description: '1-item array creates 1 <li>', got: String(r6) },
    { pass: r7 === 0, description: 'Empty array creates <ul> with 0 children', got: String(r7) },
    { pass: r8 === 1, description: 'Container has 1 child (the ul)', got: String(r8) },
    { pass: r9 === 2, description: '"other" has 2 children (two lists appended)', got: String(r9) }
  ];
}`,
    hints: [
      'Create the `<ul>` first with `document.createElement("ul")`. Then loop through the items array, creating a `<li>` for each. Append each `<li>` to the `<ul>`, then append the `<ul>` to the container.',
      'Use `items.forEach(item => { const li = document.createElement("li"); li.textContent = item; ul.appendChild(li); })`. The `<ul>` gets all its children before being appended to the container.',
    ],
    resources: creationRes,
  },

  // 10. Remove Elements
  {
    id: 1296,
    title: 'Remove Elements',
    type: 'js',
    tier: 3,
    category: ['dom-manipulation', 'creation'],
    tags: ['dom', 'remove', 'querySelectorAll', 'cleanup'],
    description:
      'Write a function that removes all elements matching a CSS selector and returns how many were removed.',
    starterCode:
      '/**\n * @param {string} selector - CSS selector for elements to remove\n * @returns {number} The number of elements removed\n */\nfunction removeAll(selector) {\n\n}\n',
    solution:
      'function removeAll(selector) {\n  const elements = document.querySelectorAll(selector);\n  const count = elements.length;\n  elements.forEach(el => el.remove());\n  return count;\n}',
    testRunner: `(code) => {
  const root = document.createElement('div');
  root.id = 'test-root';
  root.innerHTML = '<p class="temp">A</p><p class="temp">B</p><p class="temp">C</p><p class="keep">D</p><span class="temp">E</span><div class="keep">F</div>';
  document.body.appendChild(root);
  const fn = new Function(code + '; return removeAll;')();
  const r1 = fn('.temp');
  const r2 = document.querySelectorAll('.temp').length;
  const r3 = document.querySelectorAll('.keep').length;
  const r4 = fn('.keep');
  const r5 = document.querySelectorAll('.keep').length;
  const r6 = fn('.nonexistent');
  const root2 = document.createElement('div');
  root2.innerHTML = '<span class="x">1</span><span class="x">2</span>';
  document.body.appendChild(root2);
  const r7 = fn('.x');
  const r8 = document.querySelectorAll('.x').length;
  const r9 = fn('.x');
  return [
    { pass: r1 === 4, description: 'Remove .temp returns 4 (3 <p> + 1 <span>)', got: String(r1) },
    { pass: r2 === 0, description: 'After removal, 0 .temp elements remain', got: String(r2) },
    { pass: r3 === 2, description: '.keep elements untouched (2 remain)', got: String(r3) },
    { pass: r4 === 2, description: 'Remove .keep returns 2', got: String(r4) },
    { pass: r5 === 0, description: 'After removal, 0 .keep elements remain', got: String(r5) },
    { pass: r6 === 0, description: 'Remove .nonexistent returns 0', got: String(r6) },
    { pass: r7 === 2, description: 'Remove .x returns 2', got: String(r7) },
    { pass: r8 === 0, description: 'After removal, 0 .x elements remain', got: String(r8) },
    { pass: r9 === 0, description: 'Remove .x again returns 0 (already removed)', got: String(r9) }
  ];
}`,
    hints: [
      'Use `document.querySelectorAll(selector)` to find all matches. Save the count before removing. Call `.remove()` on each element. The `forEach` method works on NodeList too.',
      'Capture the count first: `const elements = document.querySelectorAll(selector); const count = elements.length;`. Then remove: `elements.forEach(el => el.remove());`. Return `count`.',
    ],
    resources: removeRes,
  },

  // ══════════════════════════════════════════════════════════════════════════
  // SUB-SECTION D: Events (4 exercises, IDs 1297-1300)
  // ══════════════════════════════════════════════════════════════════════════

  // 11. Click Handler (ENTRY POINT)
  {
    id: 1297,
    title: 'Click Handler',
    type: 'js',
    tier: 3,
    category: ['dom-manipulation', 'events'],
    tags: ['dom', 'addEventListener', 'click', 'event', 'counter'],
    description:
      'Write a function that sets up a click counter — each button click increments and displays a count.',
    instructions:
      'Events let your page respond to user actions. `element.addEventListener(type, handler)` attaches a function that runs when the event occurs.\n\nSyntax:\n```\nconst button = document.getElementById("myBtn");\nbutton.addEventListener("click", () => {\n  // runs every time the button is clicked\n});\n```\n\nThe first argument is the event type (a string like `"click"`, `"submit"`, `"keydown"`). The second is a function that runs when that event fires.\n\nWrite `setupCounter(buttonId, displayId)` — find the button and display elements by ID. Initialize the display to "0". Each click should increment the count and update the display (see `@param` in the starter code).',
    starterCode:
      '/**\n * @param {string} buttonId - ID of the button to listen on\n * @param {string} displayId - ID of the element to show the count\n * Sets display to "0" initially, increments by 1 on each button click.\n */\nfunction setupCounter(buttonId, displayId) {\n\n}\n',
    solution:
      'function setupCounter(buttonId, displayId) {\n  const button = document.getElementById(buttonId);\n  const display = document.getElementById(displayId);\n  let count = 0;\n  display.textContent = String(count);\n  button.addEventListener("click", () => {\n    count++;\n    display.textContent = String(count);\n  });\n}',
    testRunner: `(code) => {
  const root = document.createElement('div');
  root.innerHTML = '<button id="btn">Click me</button><span id="display"></span>';
  document.body.appendChild(root);
  const fn = new Function(code + '; return setupCounter;')();
  fn('btn', 'display');
  const btn = document.getElementById('btn');
  const disp = document.getElementById('display');
  const r1 = disp.textContent;
  btn.dispatchEvent(new Event('click', { bubbles: true }));
  const r2 = disp.textContent;
  btn.dispatchEvent(new Event('click', { bubbles: true }));
  const r3 = disp.textContent;
  btn.dispatchEvent(new Event('click', { bubbles: true }));
  btn.dispatchEvent(new Event('click', { bubbles: true }));
  btn.dispatchEvent(new Event('click', { bubbles: true }));
  const r4 = disp.textContent;
  const root2 = document.createElement('div');
  root2.innerHTML = '<button id="btn2">Other</button><span id="disp2"></span>';
  document.body.appendChild(root2);
  fn('btn2', 'disp2');
  const r5 = document.getElementById('disp2').textContent;
  document.getElementById('btn2').dispatchEvent(new Event('click', { bubbles: true }));
  const r6 = document.getElementById('disp2').textContent;
  const r7 = disp.textContent;
  btn.dispatchEvent(new Event('click', { bubbles: true }));
  const r8 = disp.textContent;
  return [
    { pass: r1 === '0', description: 'Display starts at "0"', got: JSON.stringify(r1) },
    { pass: r2 === '1', description: 'After 1 click: "1"', got: r2 },
    { pass: r3 === '2', description: 'After 2 clicks: "2"', got: r3 },
    { pass: r4 === '5', description: 'After 5 clicks: "5"', got: r4 },
    { pass: r5 === '0', description: 'Second counter starts at "0"', got: JSON.stringify(r5) },
    { pass: r6 === '1', description: 'Second counter: 1 click → "1"', got: r6 },
    { pass: r7 === '5', description: 'First counter unaffected by second (still "5")', got: r7 },
    { pass: r8 === '6', description: 'First counter continues: "6"', got: r8 }
  ];
}`,
    hints: [
      'Declare a `let count = 0` variable. Set the display text to `"0"`. Inside the click listener, increment `count` and update `display.textContent`. The listener creates a closure over `count`.',
      'The structure: `let count = 0; display.textContent = String(count); button.addEventListener("click", () => { count++; display.textContent = String(count); });`. Each counter has its own `count` variable.',
    ],
    resources: eventRes,
  },

  // 12. Event Object
  {
    id: 1298,
    title: 'Event Object',
    type: 'js',
    tier: 3,
    category: ['dom-manipulation', 'events'],
    tags: ['dom', 'event', 'event.target', 'event.type', 'addEventListener'],
    description:
      'Write a function that reports which button was clicked using the event object.',
    starterCode:
      '/**\n * @param {string} containerId - ID of the container holding buttons\n * @param {string} outputId - ID of the element to display results\n * When any button inside the container is clicked, set the output text to:\n * "Clicked: <button text>"\n */\nfunction setupClickReporter(containerId, outputId) {\n\n}\n',
    solution:
      'function setupClickReporter(containerId, outputId) {\n  const container = document.getElementById(containerId);\n  const output = document.getElementById(outputId);\n  const buttons = container.querySelectorAll("button");\n  buttons.forEach(button => {\n    button.addEventListener("click", (event) => {\n      output.textContent = "Clicked: " + event.target.textContent;\n    });\n  });\n}',
    testRunner: `(code) => {
  const root = document.createElement('div');
  root.innerHTML = '<div id="buttons"><button>Save</button><button>Delete</button><button>Cancel</button></div><p id="output"></p>';
  document.body.appendChild(root);
  const fn = new Function(code + '; return setupClickReporter;')();
  fn('buttons', 'output');
  const btns = document.querySelectorAll('#buttons button');
  const output = document.getElementById('output');
  btns[0].dispatchEvent(new Event('click', { bubbles: true }));
  const r1 = output.textContent;
  btns[1].dispatchEvent(new Event('click', { bubbles: true }));
  const r2 = output.textContent;
  btns[2].dispatchEvent(new Event('click', { bubbles: true }));
  const r3 = output.textContent;
  btns[0].dispatchEvent(new Event('click', { bubbles: true }));
  const r4 = output.textContent;
  const root2 = document.createElement('div');
  root2.innerHTML = '<div id="actions"><button>Edit</button><button>Share</button></div><p id="out2"></p>';
  document.body.appendChild(root2);
  fn('actions', 'out2');
  document.querySelector('#actions button').dispatchEvent(new Event('click', { bubbles: true }));
  const r5 = document.getElementById('out2').textContent;
  const r6 = output.textContent;
  btns[1].dispatchEvent(new Event('click', { bubbles: true }));
  const r7 = output.textContent;
  document.querySelectorAll('#actions button')[1].dispatchEvent(new Event('click', { bubbles: true }));
  const r8 = document.getElementById('out2').textContent;
  return [
    { pass: r1 === 'Clicked: Save', description: 'Click Save → "Clicked: Save"', got: r1 },
    { pass: r2 === 'Clicked: Delete', description: 'Click Delete → "Clicked: Delete"', got: r2 },
    { pass: r3 === 'Clicked: Cancel', description: 'Click Cancel → "Clicked: Cancel"', got: r3 },
    { pass: r4 === 'Clicked: Save', description: 'Click Save again → "Clicked: Save"', got: r4 },
    { pass: r5 === 'Clicked: Edit', description: 'Second group: Click Edit → "Clicked: Edit"', got: r5 },
    { pass: r6 === 'Clicked: Save', description: 'First output unchanged by second group', got: r6 },
    { pass: r7 === 'Clicked: Delete', description: 'First group still works after second setup', got: r7 },
    { pass: r8 === 'Clicked: Share', description: 'Click Share → "Clicked: Share"', got: r8 }
  ];
}`,
    hints: [
      'Use `container.querySelectorAll("button")` to find all buttons, then loop with `.forEach()` to attach a click listener to each. Inside the listener, `event.target.textContent` gives you the clicked button\'s text.',
      'The listener receives an `event` parameter: `button.addEventListener("click", (event) => { output.textContent = "Clicked: " + event.target.textContent; });`. The event object tells you exactly what was clicked.',
    ],
    resources: eventRes,
  },

  // 13. Form Submit
  {
    id: 1299,
    title: 'Form Submit',
    type: 'js',
    tier: 3,
    category: ['dom-manipulation', 'events'],
    tags: ['dom', 'form', 'submit', 'preventDefault', 'input', 'value'],
    description:
      'Write a function that handles form submission by preventing the default action, reading the input, and displaying a greeting.',
    starterCode:
      '/**\n * @param {string} formId - ID of the form element\n * @param {string} outputId - ID of the element to display the greeting\n * When the form is submitted:\n * 1. Prevent the default form submission\n * 2. Read the value from the input with name="username"\n * 3. Set the output text to "Hello, <username>!"\n * 4. Clear the input value\n */\nfunction setupForm(formId, outputId) {\n\n}\n',
    solution:
      'function setupForm(formId, outputId) {\n  const form = document.getElementById(formId);\n  const output = document.getElementById(outputId);\n  form.addEventListener("submit", (event) => {\n    event.preventDefault();\n    const input = form.querySelector(\'input[name="username"]\');\n    output.textContent = "Hello, " + input.value + "!";\n    input.value = "";\n  });\n}',
    testRunner: `(code) => {
  const root = document.createElement('div');
  root.innerHTML = '<form id="greet-form"><input name="username" type="text" value=""></form><p id="output"></p>';
  document.body.appendChild(root);
  const fn = new Function(code + '; return setupForm;')();
  fn('greet-form', 'output');
  const form = document.getElementById('greet-form');
  const input = form.querySelector('input[name="username"]');
  const output = document.getElementById('output');
  input.value = 'Alice';
  const evt1 = new Event('submit', { cancelable: true, bubbles: true });
  const notPrevented1 = form.dispatchEvent(evt1);
  const r1 = output.textContent;
  const r2 = notPrevented1;
  const r3 = input.value;
  input.value = 'Bob';
  form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
  const r4 = output.textContent;
  const r5 = input.value;
  input.value = 'Charlie';
  form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
  const r6 = output.textContent;
  input.value = '';
  form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
  const r7 = output.textContent;
  input.value = 'Eve';
  form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
  const r8 = output.textContent;
  return [
    { pass: r1 === 'Hello, Alice!', description: 'Submit with "Alice" → "Hello, Alice!"', got: r1 },
    { pass: r2 === false, description: 'preventDefault was called (form did not submit)', got: String(r2) },
    { pass: r3 === '', description: 'Input cleared after submit', got: JSON.stringify(r3) },
    { pass: r4 === 'Hello, Bob!', description: 'Submit with "Bob" → "Hello, Bob!"', got: r4 },
    { pass: r5 === '', description: 'Input cleared after second submit', got: JSON.stringify(r5) },
    { pass: r6 === 'Hello, Charlie!', description: 'Submit with "Charlie" → "Hello, Charlie!"', got: r6 },
    { pass: r7 === 'Hello, !', description: 'Submit with empty input → "Hello, !"', got: r7 },
    { pass: r8 === 'Hello, Eve!', description: 'Submit with "Eve" → "Hello, Eve!"', got: r8 }
  ];
}`,
    hints: [
      'Listen for the `"submit"` event on the form. Call `event.preventDefault()` to stop the page from reloading. Read the input with `form.querySelector(\'input[name="username"]\').value`. Clear the input by setting `.value = ""`.',
      'The structure: `form.addEventListener("submit", (event) => { event.preventDefault(); const input = form.querySelector(\'input[name="username"]\'); output.textContent = "Hello, " + input.value + "!"; input.value = ""; });`',
    ],
    resources: formEventRes,
  },

  // 14. DOM & Events: Combined
  {
    id: 1300,
    title: 'DOM and Events: Combined',
    type: 'js',
    tier: 3,
    category: ['dom-manipulation', 'events'],
    tags: ['dom', 'createElement', 'addEventListener', 'click', 'input', 'combined'],
    description:
      'Write a function that creates list items from user input — combining element creation, event handling, and DOM manipulation.',
    starterCode:
      '/**\n * @param {string} inputId - ID of the text input\n * @param {string} buttonId - ID of the "Add" button\n * @param {string} listId - ID of the <ul> to append items to\n * When the button is clicked:\n * 1. Read the input value\n * 2. If not empty, create a <li> with that text and append to the list\n * 3. Clear the input after adding\n * If the input is empty, do nothing.\n */\nfunction setupListAdder(inputId, buttonId, listId) {\n\n}\n',
    solution:
      'function setupListAdder(inputId, buttonId, listId) {\n  const input = document.getElementById(inputId);\n  const button = document.getElementById(buttonId);\n  const list = document.getElementById(listId);\n  button.addEventListener("click", () => {\n    const text = input.value.trim();\n    if (text === "") return;\n    const li = document.createElement("li");\n    li.textContent = text;\n    list.appendChild(li);\n    input.value = "";\n  });\n}',
    testRunner: `(code) => {
  const root = document.createElement('div');
  root.innerHTML = '<input id="item-input" type="text" value=""><button id="add-btn">Add</button><ul id="item-list"></ul>';
  document.body.appendChild(root);
  const fn = new Function(code + '; return setupListAdder;')();
  fn('item-input', 'add-btn', 'item-list');
  const input = document.getElementById('item-input');
  const btn = document.getElementById('add-btn');
  const list = document.getElementById('item-list');
  input.value = 'Buy milk';
  btn.dispatchEvent(new Event('click', { bubbles: true }));
  const r1 = list.children.length;
  const r2 = list.children[0].textContent;
  const r3 = input.value;
  input.value = 'Walk dog';
  btn.dispatchEvent(new Event('click', { bubbles: true }));
  const r4 = list.children.length;
  const r5 = list.children[1].textContent;
  input.value = '';
  btn.dispatchEvent(new Event('click', { bubbles: true }));
  const r6 = list.children.length;
  input.value = '   ';
  btn.dispatchEvent(new Event('click', { bubbles: true }));
  const r7 = list.children.length;
  input.value = 'Read book';
  btn.dispatchEvent(new Event('click', { bubbles: true }));
  const r8 = list.children.length;
  const r9 = list.children[2].textContent;
  return [
    { pass: r1 === 1, description: 'Add "Buy milk" → list has 1 item', got: String(r1) },
    { pass: r2 === 'Buy milk', description: 'First item text is "Buy milk"', got: r2 },
    { pass: r3 === '', description: 'Input cleared after adding', got: JSON.stringify(r3) },
    { pass: r4 === 2, description: 'Add "Walk dog" → list has 2 items', got: String(r4) },
    { pass: r5 === 'Walk dog', description: 'Second item text is "Walk dog"', got: r5 },
    { pass: r6 === 2, description: 'Empty input click → still 2 items (no add)', got: String(r6) },
    { pass: r7 === 2, description: 'Whitespace-only input → still 2 items (no add)', got: String(r7) },
    { pass: r8 === 3, description: 'Add "Read book" → list has 3 items', got: String(r8) },
    { pass: r9 === 'Read book', description: 'Third item text is "Read book"', got: r9 }
  ];
}`,
    hints: [
      'Attach a `"click"` listener to the button. Inside, read `input.value`, check if it\'s empty (after trimming), create a `<li>` with `document.createElement`, set its text, append it to the list, and clear the input.',
      'The listener: `button.addEventListener("click", () => { const text = input.value.trim(); if (text === "") return; const li = document.createElement("li"); li.textContent = text; list.appendChild(li); input.value = ""; });`',
    ],
    resources: [...eventRes, ...creationRes],
  },

];

// ─── Validation (uses jsdom for DOM environment) ────────────────────────────

function validate() {
  if (!JSDOM) {
    console.error('jsdom is required for DOM exercise validation.');
    console.error('Install with: npm install jsdom');
    process.exit(1);
  }

  let pass = 0;
  let fail = 0;

  exercises.forEach((ex) => {
    try {
      const dom = new JSDOM(
        '<!DOCTYPE html><html><body></body></html>',
        { runScripts: 'dangerously', url: 'http://localhost' }
      );

      const script = dom.window.document.createElement('script');
      script.textContent = `
        try {
          const runner = (${ex.testRunner});
          const results = runner(${JSON.stringify(ex.solution)});
          window.__testResults = results;
        } catch (err) {
          window.__testError = err.message;
        }
      `;
      dom.window.document.body.appendChild(script);

      if (dom.window.__testError) {
        throw new Error(dom.window.__testError);
      }

      const results = dom.window.__testResults;
      if (!results || !Array.isArray(results)) {
        throw new Error('testRunner did not return an array');
      }

      results.forEach((r) => {
        if (r.pass) {
          pass++;
        } else {
          fail++;
          console.error(
            `  FAIL [${ex.id}] ${ex.title} — ${r.description} (got: ${r.got})`
          );
        }
      });

      dom.window.close();
    } catch (err) {
      fail++;
      console.error(`  ERROR [${ex.id}] ${ex.title} — ${err.message}`);
    }
  });

  console.log(
    `\nValidation: ${pass} passed, ${fail} failed (${exercises.length} exercises)`
  );
  return fail === 0;
}

// ─── Main ───────────────────────────────────────────────────────────────────

function main() {
  const validateOnly = process.argv.includes('--validate');

  console.log(
    `T3 DOM & Events — Section 6: ${exercises.length} exercises (IDs ${exercises[0].id}-${exercises[exercises.length - 1].id})`
  );

  if (!validate()) {
    console.error('\nValidation failed — aborting.');
    process.exit(1);
  }

  if (validateOnly) {
    console.log('\nValidation-only mode — no changes written.');
    return;
  }

  // Read curriculum
  const data = JSON.parse(fs.readFileSync(CURRICULUM_PATH, 'utf8'));
  const before = data.exercises.length;

  // Check for ID collisions
  const existingIds = new Set(data.exercises.map((ex) => ex.id));
  const newIds = exercises.map((ex) => ex.id);
  const collisions = newIds.filter((id) => existingIds.has(id));
  if (collisions.length > 0) {
    console.error(`\nID collisions: ${collisions.join(', ')} — aborting.`);
    process.exit(1);
  }

  // Append new exercises
  data.exercises.push(...exercises);
  const after = data.exercises.length;

  // Write
  fs.writeFileSync(CURRICULUM_PATH, JSON.stringify(data, null, 2) + '\n');
  console.log(
    `\nAppended ${exercises.length} exercises (${before} → ${after})`
  );
  console.log('Written to:', CURRICULUM_PATH);
}

main();
