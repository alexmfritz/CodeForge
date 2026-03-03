#!/usr/bin/env node
/**
 * Generator: T4 Advanced DOM — Section 2 (6 exercises, IDs 1331-1336)
 *
 * Covers: Event Delegation, Dynamic Sortable Table, Tabs Component,
 *         Modal Dialog, Accordion, Form Validation
 *
 * T4 convention: description-only, NO starterCode. Student writes everything
 * from scratch including function declaration. Description tells them the
 * function name and expected behavior.
 *
 * Usage:
 *   node exercises/_gen_t4_advanced_dom.js            # Append to curriculum
 *   node exercises/_gen_t4_advanced_dom.js --validate  # Validate testRunners only
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

// ─── Resources (MDN only for T4) ────────────────────────────────────────────

const delegationRes = [
  { label: 'MDN: Event delegation', url: 'https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Event_bubbling#event_delegation', description: 'Event delegation concept' },
  { label: 'MDN: Event.target', url: 'https://developer.mozilla.org/en-US/docs/Web/API/Event/target', description: 'Event target reference' },
];
const tableRes = [
  { label: 'MDN: createElement', url: 'https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement', description: 'createElement reference' },
  { label: 'MDN: Array.prototype.sort', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort', description: 'Array sort reference' },
];
const tabsRes = [
  { label: 'MDN: classList', url: 'https://developer.mozilla.org/en-US/docs/Web/API/Element/classList', description: 'classList reference' },
  { label: 'MDN: addEventListener', url: 'https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener', description: 'addEventListener reference' },
];
const modalRes = [
  { label: 'MDN: KeyboardEvent.key', url: 'https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key', description: 'KeyboardEvent key reference' },
  { label: 'MDN: classList', url: 'https://developer.mozilla.org/en-US/docs/Web/API/Element/classList', description: 'classList reference' },
];
const accordionRes = [
  { label: 'MDN: querySelectorAll', url: 'https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll', description: 'querySelectorAll reference' },
  { label: 'MDN: classList', url: 'https://developer.mozilla.org/en-US/docs/Web/API/Element/classList', description: 'classList reference' },
];
const validationRes = [
  { label: 'MDN: input event', url: 'https://developer.mozilla.org/en-US/docs/Web/API/Element/input_event', description: 'Input event reference' },
  { label: 'MDN: Element.classList', url: 'https://developer.mozilla.org/en-US/docs/Web/API/Element/classList', description: 'classList reference' },
];

// ─── Exercise Definitions ───────────────────────────────────────────────────

const exercises = [

  // ══════════════════════════════════════════════════════════════════════════
  // T4 Section 2: Advanced DOM (6 exercises, IDs 1331-1336)
  // ══════════════════════════════════════════════════════════════════════════

  // 1. Event Delegation
  {
    id: 1331,
    title: 'Event Delegation',
    type: 'js',
    tier: 4,
    category: ['dom-manipulation', 'event-delegation'],
    tags: ['dom', 'event-delegation', 'addEventListener', 'event-target', 'classList'],
    description:
      'Create a function called `setupDelegatedList` that takes a `<ul>` element ID and sets up event delegation for click handling. Attach a single click event listener to the `<ul>` element (not to individual `<li>` items). When any `<li>` inside the list is clicked, toggle a CSS class called `"completed"` on that `<li>`. Clicks directly on the `<ul>` itself (not on an `<li>`) should do nothing. This pattern ensures that items added to the list later also respond to clicks without needing new listeners.',
    starterCode: '',
    solution:
      'function setupDelegatedList(listId) {\n  var list = document.getElementById(listId);\n  list.addEventListener("click", function(event) {\n    if (event.target.tagName === "LI") {\n      event.target.classList.toggle("completed");\n    }\n  });\n}',
    testRunner: `(code) => {
  var root = document.createElement('div');
  root.innerHTML = '<ul id="todo-list"><li>Task 1</li><li>Task 2</li><li>Task 3</li></ul>';
  document.body.appendChild(root);
  var fn = new Function(code + '; return setupDelegatedList;')();
  fn('todo-list');
  var list = document.getElementById('todo-list');
  var items = list.querySelectorAll('li');

  items[0].dispatchEvent(new Event('click', { bubbles: true }));
  var r1 = items[0].classList.contains('completed');

  items[0].dispatchEvent(new Event('click', { bubbles: true }));
  var r2 = !items[0].classList.contains('completed');

  items[1].dispatchEvent(new Event('click', { bubbles: true }));
  var r3 = items[1].classList.contains('completed');

  var r4 = !items[0].classList.contains('completed');

  var newItem = document.createElement('li');
  newItem.textContent = 'Task 4';
  list.appendChild(newItem);
  newItem.dispatchEvent(new Event('click', { bubbles: true }));
  var r5 = newItem.classList.contains('completed');

  var itemsBefore = list.querySelectorAll('li.completed').length;
  list.dispatchEvent(new Event('click', { bubbles: false }));
  var itemsAfter = list.querySelectorAll('li.completed').length;
  var r6 = itemsBefore === itemsAfter;

  items[2].dispatchEvent(new Event('click', { bubbles: true }));
  var r7 = items[1].classList.contains('completed') && items[2].classList.contains('completed');

  newItem.dispatchEvent(new Event('click', { bubbles: true }));
  var r8 = !newItem.classList.contains('completed');

  return [
    { pass: r1, description: 'Click item adds "completed" class', got: String(r1) },
    { pass: r2, description: 'Click same item again removes "completed"', got: String(!r2) },
    { pass: r3, description: 'Different item gets "completed" independently', got: String(r3) },
    { pass: r4, description: 'First item unaffected by second item click', got: String(!r4) },
    { pass: r5, description: 'Dynamically added item responds to delegation', got: String(r5) },
    { pass: r6, description: 'Click on <ul> itself does not toggle any item', got: 'before=' + itemsBefore + ', after=' + itemsAfter },
    { pass: r7, description: 'Multiple items can be completed simultaneously', got: 'item2=' + items[1].classList.contains('completed') + ', item3=' + items[2].classList.contains('completed') },
    { pass: r8, description: 'Dynamic item can be toggled off', got: String(!r8) }
  ];
}`,
    hint1:
      'Instead of adding a click listener to each `<li>`, add one listener to the `<ul>`. Inside the handler, check `event.target` to see which element was actually clicked. Only act if the clicked element is an `<li>`.',
    hint2:
      'Check `event.target.tagName` to determine if the clicked element is an `<li>`. If it is, use `classList.toggle()` to add or remove the class. Because the listener is on the parent, any new `<li>` elements will automatically trigger it.',
    resources: delegationRes,
  },

  // 2. Dynamic Sortable Table
  {
    id: 1332,
    title: 'Dynamic Sortable Table',
    type: 'js',
    tier: 4,
    category: ['dom-manipulation', 'interactive-components'],
    tags: ['dom', 'table', 'sort', 'createElement', 'addEventListener', 'dynamic'],
    description:
      'Create a function called `buildSortableTable` that takes an array of objects and a container element ID. Build an HTML `<table>` inside the container with a `<thead>` row of `<th>` headers (from the object keys) and a `<tbody>` with one `<tr>` per object (one `<td>` per value). When a `<th>` header is clicked, sort the table rows by that column in ascending order. Clicking the same header again should toggle to descending order. The currently sorted header should display `" ▲"` (ascending) or `" ▼"` (descending) appended to the column name. Other headers should show just the column name with no indicator.',
    starterCode: '',
    solution:
      'function buildSortableTable(data, containerId) {\n  var container = document.getElementById(containerId);\n  if (!data.length) { container.appendChild(document.createElement("table")); return; }\n  var keys = Object.keys(data[0]);\n  var table = document.createElement("table");\n  var thead = document.createElement("thead");\n  var headerRow = document.createElement("tr");\n  var sortCol = null;\n  var sortAsc = true;\n\n  keys.forEach(function(key) {\n    var th = document.createElement("th");\n    th.textContent = key;\n    th.addEventListener("click", function() {\n      if (sortCol === key) {\n        sortAsc = !sortAsc;\n      } else {\n        sortCol = key;\n        sortAsc = true;\n      }\n      renderBody();\n      updateHeaders();\n    });\n    headerRow.appendChild(th);\n  });\n  thead.appendChild(headerRow);\n  table.appendChild(thead);\n\n  var tbody = document.createElement("tbody");\n  table.appendChild(tbody);\n  container.appendChild(table);\n\n  function renderBody() {\n    var sorted = data.slice();\n    if (sortCol !== null) {\n      sorted.sort(function(a, b) {\n        if (a[sortCol] < b[sortCol]) return sortAsc ? -1 : 1;\n        if (a[sortCol] > b[sortCol]) return sortAsc ? 1 : -1;\n        return 0;\n      });\n    }\n    tbody.innerHTML = "";\n    sorted.forEach(function(row) {\n      var tr = document.createElement("tr");\n      keys.forEach(function(key) {\n        var td = document.createElement("td");\n        td.textContent = row[key];\n        tr.appendChild(td);\n      });\n      tbody.appendChild(tr);\n    });\n  }\n\n  function updateHeaders() {\n    var ths = headerRow.querySelectorAll("th");\n    for (var i = 0; i < ths.length; i++) {\n      ths[i].textContent = keys[i] + (sortCol === keys[i] ? (sortAsc ? " \\u25B2" : " \\u25BC") : "");\n    }\n  }\n\n  renderBody();\n}',
    testRunner: `(code) => {
  var root = document.createElement('div');
  root.innerHTML = '<div id="tbl-container"></div>';
  document.body.appendChild(root);
  var fn = new Function(code + '; return buildSortableTable;')();
  var data = [
    { name: 'Charlie', age: 30, score: 85 },
    { name: 'Alice', age: 25, score: 92 },
    { name: 'Bob', age: 35, score: 78 }
  ];
  fn(data, 'tbl-container');
  var table = document.querySelector('#tbl-container table');
  var ths = table.querySelectorAll('thead th');
  var tbody = table.querySelector('tbody');

  var r1 = ths.length === 3 && tbody.querySelectorAll('tr').length === 3;

  var r2 = ths[0].textContent === 'name' && ths[1].textContent === 'age' && ths[2].textContent === 'score';

  var firstCells = [];
  tbody.querySelectorAll('tr').forEach(function(tr) { firstCells.push(tr.querySelectorAll('td')[0].textContent); });
  var r3 = firstCells[0] === 'Charlie' && firstCells[1] === 'Alice' && firstCells[2] === 'Bob';

  ths[0].dispatchEvent(new Event('click', { bubbles: true }));
  var sorted1 = [];
  tbody.querySelectorAll('tr').forEach(function(tr) { sorted1.push(tr.querySelectorAll('td')[0].textContent); });
  var r4 = sorted1[0] === 'Alice' && sorted1[1] === 'Bob' && sorted1[2] === 'Charlie';

  ths = table.querySelectorAll('thead th');
  var r5 = ths[0].textContent.indexOf('\\u25B2') !== -1;

  ths[0].dispatchEvent(new Event('click', { bubbles: true }));
  var sorted2 = [];
  tbody.querySelectorAll('tr').forEach(function(tr) { sorted2.push(tr.querySelectorAll('td')[0].textContent); });
  var r6 = sorted2[0] === 'Charlie' && sorted2[1] === 'Bob' && sorted2[2] === 'Alice';

  ths = table.querySelectorAll('thead th');
  var r7 = ths[0].textContent.indexOf('\\u25BC') !== -1;

  ths[1].dispatchEvent(new Event('click', { bubbles: true }));
  var sorted3 = [];
  tbody.querySelectorAll('tr').forEach(function(tr) { sorted3.push(tr.querySelectorAll('td')[1].textContent); });
  ths = table.querySelectorAll('thead th');
  var r8 = sorted3[0] === '25' && sorted3[1] === '30' && sorted3[2] === '35' && ths[1].textContent.indexOf('\\u25B2') !== -1 && ths[0].textContent.indexOf('\\u25B2') === -1 && ths[0].textContent.indexOf('\\u25BC') === -1;

  return [
    { pass: r1, description: 'Table has 3 headers and 3 body rows', got: 'ths=' + ths.length + ', rows=' + tbody.querySelectorAll('tr').length },
    { pass: r2, description: 'Headers are "name", "age", "score"', got: ths[0].textContent + ', ' + ths[1].textContent + ', ' + ths[2].textContent },
    { pass: r3, description: 'Initial row order matches input data', got: firstCells.join(', ') },
    { pass: r4, description: 'Click "name" header sorts ascending (Alice, Bob, Charlie)', got: sorted1.join(', ') },
    { pass: r5, description: 'Sorted header shows ascending indicator', got: table.querySelectorAll('thead th')[0].textContent },
    { pass: r6, description: 'Click "name" again sorts descending (Charlie, Bob, Alice)', got: sorted2.join(', ') },
    { pass: r7, description: 'Same header now shows descending indicator', got: table.querySelectorAll('thead th')[0].textContent },
    { pass: r8, description: 'Click "age" sorts by age ascending, moves indicator to age header', got: 'ages=' + sorted3.join(',') + ', ageHeader=' + ths[1].textContent }
  ];
}`,
    hint1:
      'Build the table structure with `createElement` for `<table>`, `<thead>`, `<tbody>`, `<tr>`, `<th>`, and `<td>`. Add click listeners to each `<th>` that re-sort the data and rebuild the table body rows.',
    hint2:
      'Keep track of the current sort column and direction in closure variables. When a header is clicked, check if it is the same column (toggle direction) or a new column (reset to ascending). Use `Array.sort()` with a comparison function, then clear and rebuild `<tbody>` rows.',
    resources: tableRes,
  },

  // 3. Tabs Component
  {
    id: 1333,
    title: 'Tabs Component',
    type: 'js',
    tier: 4,
    category: ['dom-manipulation', 'interactive-components'],
    tags: ['dom', 'tabs', 'classList', 'show-hide', 'addEventListener', 'state'],
    description:
      'Create a function called `createTabs` that takes an array of tab objects (each with `label` and `content` string properties) and a container element ID. Build a row of `<button>` elements with class `"tab-button"` (one per tab) and a set of `<div>` elements with class `"tab-panel"` (one per tab, containing the content text). The first tab should be active by default — its button gets an additional `"active"` class and its panel is visible. All other panels should have a `"hidden"` class. Clicking a tab button should show its panel (remove `"hidden"`), hide all other panels (add `"hidden"`), add `"active"` to the clicked button, and remove `"active"` from all other buttons.',
    starterCode: '',
    solution:
      'function createTabs(tabData, containerId) {\n  var container = document.getElementById(containerId);\n  var tabBar = document.createElement("div");\n  tabBar.className = "tab-bar";\n  var contentArea = document.createElement("div");\n  contentArea.className = "tab-content";\n\n  var buttons = [];\n  var panels = [];\n\n  tabData.forEach(function(tab, index) {\n    var button = document.createElement("button");\n    button.textContent = tab.label;\n    button.className = index === 0 ? "tab-button active" : "tab-button";\n    buttons.push(button);\n    tabBar.appendChild(button);\n\n    var panel = document.createElement("div");\n    panel.textContent = tab.content;\n    panel.className = index === 0 ? "tab-panel" : "tab-panel hidden";\n    panels.push(panel);\n    contentArea.appendChild(panel);\n\n    button.addEventListener("click", function() {\n      for (var i = 0; i < buttons.length; i++) {\n        buttons[i].classList.remove("active");\n        panels[i].classList.add("hidden");\n      }\n      button.classList.add("active");\n      panel.classList.remove("hidden");\n    });\n  });\n\n  container.appendChild(tabBar);\n  container.appendChild(contentArea);\n}',
    testRunner: `(code) => {
  var root = document.createElement('div');
  root.innerHTML = '<div id="tabs-container"></div>';
  document.body.appendChild(root);
  var fn = new Function(code + '; return createTabs;')();
  var tabData = [
    { label: 'Overview', content: 'Welcome to the overview' },
    { label: 'Details', content: 'Here are the details' },
    { label: 'Settings', content: 'Adjust your settings' }
  ];
  fn(tabData, 'tabs-container');
  var container = document.getElementById('tabs-container');
  var btns = container.querySelectorAll('.tab-button');
  var pnls = container.querySelectorAll('.tab-panel');

  var r1 = btns.length === 3 && pnls.length === 3;

  var r2 = btns[0].classList.contains('active') && !btns[1].classList.contains('active') && !btns[2].classList.contains('active');

  var r3 = !pnls[0].classList.contains('hidden') && pnls[1].classList.contains('hidden') && pnls[2].classList.contains('hidden');

  btns[1].dispatchEvent(new Event('click', { bubbles: true }));
  var r4 = pnls[1].textContent === 'Here are the details' && !pnls[1].classList.contains('hidden');

  var r5 = pnls[0].classList.contains('hidden') && pnls[2].classList.contains('hidden');

  var r6 = btns[1].classList.contains('active') && !btns[0].classList.contains('active');

  btns[2].dispatchEvent(new Event('click', { bubbles: true }));
  var r7 = !pnls[2].classList.contains('hidden') && pnls[0].classList.contains('hidden') && pnls[1].classList.contains('hidden');

  btns[0].dispatchEvent(new Event('click', { bubbles: true }));
  var r8 = btns[0].classList.contains('active') && !pnls[0].classList.contains('hidden') && pnls[1].classList.contains('hidden') && pnls[2].classList.contains('hidden');

  return [
    { pass: r1, description: '3 buttons and 3 panels created', got: 'btns=' + btns.length + ', pnls=' + pnls.length },
    { pass: r2, description: 'First tab button has "active" class by default', got: 'btn0=' + btns[0].className + ', btn1=' + btns[1].className },
    { pass: r3, description: 'First panel visible, others hidden', got: 'p0=' + pnls[0].className + ', p1=' + pnls[1].className },
    { pass: r4, description: 'Click second tab shows its content', got: pnls[1].textContent + ' (' + pnls[1].className + ')' },
    { pass: r5, description: 'Other panels hidden after tab switch', got: 'p0=' + pnls[0].className + ', p2=' + pnls[2].className },
    { pass: r6, description: 'Active class moves to clicked button', got: 'btn0=' + btns[0].className + ', btn1=' + btns[1].className },
    { pass: r7, description: 'Click third tab shows only third panel', got: 'p0=' + pnls[0].className + ', p1=' + pnls[1].className + ', p2=' + pnls[2].className },
    { pass: r8, description: 'Click first tab returns to initial state', got: 'btn0=' + btns[0].className + ', p0=' + pnls[0].className }
  ];
}`,
    hint1:
      'Create buttons and panels in parallel arrays. Add a click listener to each button that loops through all buttons and panels — removing "active" from buttons and adding "hidden" to panels — then adds "active" to the clicked button and removes "hidden" from its matching panel.',
    hint2:
      'Track buttons and panels in arrays indexed to match. In each click handler, loop through both arrays: `buttons[i].classList.remove("active")` and `panels[i].classList.add("hidden")`. Then toggle the current button and panel. The first tab starts as active and visible.',
    resources: tabsRes,
  },

  // 4. Modal Dialog
  {
    id: 1334,
    title: 'Modal Dialog',
    type: 'js',
    tier: 4,
    category: ['dom-manipulation', 'interactive-components'],
    tags: ['dom', 'modal', 'overlay', 'keyboard-events', 'escape', 'classList'],
    description:
      'Create a function called `setupModal` that takes a trigger button ID and a modal element ID. The modal element already exists in the DOM with a `"hidden"` class. When the trigger button is clicked, remove the `"hidden"` class from the modal and create an overlay `<div>` with class `"modal-overlay"` appended to `document.body`. The modal must contain an element with class `"modal-close"` — clicking it should add `"hidden"` back to the modal and remove the overlay from the DOM. Pressing the Escape key should also close the modal. Clicking the overlay itself should close the modal. If the modal is already hidden, Escape should do nothing.',
    starterCode: '',
    solution:
      'function setupModal(triggerId, modalId) {\n  var trigger = document.getElementById(triggerId);\n  var modal = document.getElementById(modalId);\n  var overlay = null;\n\n  function openModal() {\n    modal.classList.remove("hidden");\n    overlay = document.createElement("div");\n    overlay.className = "modal-overlay";\n    document.body.appendChild(overlay);\n    overlay.addEventListener("click", closeModal);\n  }\n\n  function closeModal() {\n    modal.classList.add("hidden");\n    if (overlay && overlay.parentNode) {\n      overlay.parentNode.removeChild(overlay);\n      overlay = null;\n    }\n  }\n\n  trigger.addEventListener("click", openModal);\n\n  var closeBtn = modal.querySelector(".modal-close");\n  if (closeBtn) {\n    closeBtn.addEventListener("click", closeModal);\n  }\n\n  document.addEventListener("keydown", function(event) {\n    if (event.key === "Escape" && !modal.classList.contains("hidden")) {\n      closeModal();\n    }\n  });\n}',
    testRunner: `(code) => {
  var root = document.createElement('div');
  root.innerHTML = '<button id="open-btn">Open</button><div id="my-modal" class="hidden"><div class="modal-content"><span class="modal-close">X</span><p>Modal body</p></div></div>';
  document.body.appendChild(root);
  var fn = new Function(code + '; return setupModal;')();
  fn('open-btn', 'my-modal');
  var modal = document.getElementById('my-modal');
  var trigger = document.getElementById('open-btn');

  var r1 = modal.classList.contains('hidden');

  trigger.dispatchEvent(new Event('click', { bubbles: true }));
  var r2 = !modal.classList.contains('hidden');

  var overlay1 = document.querySelector('.modal-overlay');
  var r3 = overlay1 !== null;

  var closeBtn = modal.querySelector('.modal-close');
  closeBtn.dispatchEvent(new Event('click', { bubbles: true }));
  var r4 = modal.classList.contains('hidden');

  var overlay2 = document.querySelector('.modal-overlay');
  var r5 = overlay2 === null;

  trigger.dispatchEvent(new Event('click', { bubbles: true }));
  document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
  var r6 = modal.classList.contains('hidden') && document.querySelector('.modal-overlay') === null;

  document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
  var r7 = modal.classList.contains('hidden');

  trigger.dispatchEvent(new Event('click', { bubbles: true }));
  var overlay3 = document.querySelector('.modal-overlay');
  overlay3.dispatchEvent(new Event('click', { bubbles: true }));
  var r8 = modal.classList.contains('hidden') && document.querySelector('.modal-overlay') === null;

  return [
    { pass: r1, description: 'Modal starts hidden', got: modal.className },
    { pass: r2, description: 'Click trigger opens modal (removes "hidden")', got: modal.className },
    { pass: r3, description: 'Overlay element created when modal opens', got: overlay1 ? 'exists' : 'missing' },
    { pass: r4, description: 'Click close button hides modal', got: modal.className },
    { pass: r5, description: 'Overlay removed from DOM when modal closes', got: overlay2 ? 'still exists' : 'removed' },
    { pass: r6, description: 'Escape key closes modal and removes overlay', got: 'hidden=' + modal.classList.contains('hidden') + ', overlay=' + (document.querySelector('.modal-overlay') === null) },
    { pass: r7, description: 'Escape when already closed does nothing', got: modal.className },
    { pass: r8, description: 'Clicking overlay closes modal', got: 'hidden=' + modal.classList.contains('hidden') + ', overlay=' + (document.querySelector('.modal-overlay') === null) }
  ];
}`,
    hint1:
      'Create open and close helper functions. The open function removes "hidden" from the modal and creates an overlay `<div>` appended to the body. The close function adds "hidden" back and removes the overlay. Wire up three ways to close: the close button, the Escape key, and clicking the overlay.',
    hint2:
      'For Escape key handling, add a `"keydown"` listener to `document` that checks `event.key === "Escape"`. Only close if the modal is currently visible (does not have "hidden" class). For the overlay, create a new `<div>` each time the modal opens and remove it with `removeChild` when closing.',
    resources: modalRes,
  },

  // 5. Accordion
  {
    id: 1335,
    title: 'Accordion',
    type: 'js',
    tier: 4,
    category: ['dom-manipulation', 'interactive-components'],
    tags: ['dom', 'accordion', 'expand-collapse', 'classList', 'querySelectorAll'],
    description:
      'Create a function called `createAccordion` that takes an array of section objects (each with `title` and `content` string properties) and a container element ID. Build an accordion where each section has a `<button>` with class `"accordion-header"` and a `<div>` with class `"accordion-content"`. All sections start collapsed (content has `"hidden"` class). Clicking a header should expand its content (remove `"hidden"`) and collapse all other sections (add `"hidden"` to their content). The expanded header should get an `"active"` class. Clicking an already-open header should collapse it (all sections closed). Only one section can be open at a time.',
    starterCode: '',
    solution:
      'function createAccordion(sections, containerId) {\n  var container = document.getElementById(containerId);\n  var accordion = document.createElement("div");\n  accordion.className = "accordion";\n  var headers = [];\n  var contents = [];\n\n  sections.forEach(function(section) {\n    var item = document.createElement("div");\n    item.className = "accordion-item";\n\n    var header = document.createElement("button");\n    header.className = "accordion-header";\n    header.textContent = section.title;\n    headers.push(header);\n\n    var content = document.createElement("div");\n    content.className = "accordion-content hidden";\n    content.textContent = section.content;\n    contents.push(content);\n\n    header.addEventListener("click", function() {\n      var isOpen = !content.classList.contains("hidden");\n      for (var i = 0; i < headers.length; i++) {\n        contents[i].classList.add("hidden");\n        headers[i].classList.remove("active");\n      }\n      if (!isOpen) {\n        content.classList.remove("hidden");\n        header.classList.add("active");\n      }\n    });\n\n    item.appendChild(header);\n    item.appendChild(content);\n    accordion.appendChild(item);\n  });\n\n  container.appendChild(accordion);\n}',
    testRunner: `(code) => {
  var root = document.createElement('div');
  root.innerHTML = '<div id="acc-container"></div>';
  document.body.appendChild(root);
  var fn = new Function(code + '; return createAccordion;')();
  var sections = [
    { title: 'Section A', content: 'Content for A' },
    { title: 'Section B', content: 'Content for B' },
    { title: 'Section C', content: 'Content for C' }
  ];
  fn(sections, 'acc-container');
  var container = document.getElementById('acc-container');
  var hdrs = container.querySelectorAll('.accordion-header');
  var cnts = container.querySelectorAll('.accordion-content');

  var r1 = hdrs.length === 3 && cnts.length === 3;

  var allHidden = cnts[0].classList.contains('hidden') && cnts[1].classList.contains('hidden') && cnts[2].classList.contains('hidden');
  var r2 = allHidden;

  hdrs[0].dispatchEvent(new Event('click', { bubbles: true }));
  var r3 = !cnts[0].classList.contains('hidden') && cnts[0].textContent === 'Content for A';

  var r4 = hdrs[0].classList.contains('active');

  hdrs[1].dispatchEvent(new Event('click', { bubbles: true }));
  var r5 = !cnts[1].classList.contains('hidden') && cnts[0].classList.contains('hidden');

  var r6 = hdrs[1].classList.contains('active') && !hdrs[0].classList.contains('active');

  hdrs[1].dispatchEvent(new Event('click', { bubbles: true }));
  var r7 = cnts[0].classList.contains('hidden') && cnts[1].classList.contains('hidden') && cnts[2].classList.contains('hidden');

  hdrs[2].dispatchEvent(new Event('click', { bubbles: true }));
  var r8 = !cnts[2].classList.contains('hidden') && cnts[2].textContent === 'Content for C' && hdrs[2].classList.contains('active');

  return [
    { pass: r1, description: '3 headers and 3 content panels created', got: 'hdrs=' + hdrs.length + ', cnts=' + cnts.length },
    { pass: r2, description: 'All sections start collapsed (hidden)', got: 'h0=' + cnts[0].className + ', h1=' + cnts[1].className + ', h2=' + cnts[2].className },
    { pass: r3, description: 'Click first header expands its content', got: cnts[0].className + ': ' + cnts[0].textContent },
    { pass: r4, description: 'Expanded header has "active" class', got: hdrs[0].className },
    { pass: r5, description: 'Click second header expands it, collapses first', got: 'cnt0=' + cnts[0].className + ', cnt1=' + cnts[1].className },
    { pass: r6, description: 'Active class moves to newly expanded header', got: 'hdr0=' + hdrs[0].className + ', hdr1=' + hdrs[1].className },
    { pass: r7, description: 'Click open header collapses it (all closed)', got: 'h0=' + cnts[0].className + ', h1=' + cnts[1].className + ', h2=' + cnts[2].className },
    { pass: r8, description: 'Click third header expands it with correct content', got: cnts[2].className + ': ' + cnts[2].textContent }
  ];
}`,
    hint1:
      'Track all headers and content panels in arrays. When any header is clicked, first close all sections (add "hidden" to all content, remove "active" from all headers). Then, if the clicked section was not already open, open it. This naturally enforces the one-at-a-time rule.',
    hint2:
      'Before toggling, check if the current section is already open with `content.classList.contains("hidden")`. Loop through all sections to close them. Then, if the section was previously closed, remove "hidden" from its content and add "active" to its header.',
    resources: accordionRes,
  },

  // 6. Form Validation
  {
    id: 1336,
    title: 'Live Form Validation',
    type: 'js',
    tier: 4,
    category: ['dom-manipulation', 'form-validation'],
    tags: ['dom', 'form', 'validation', 'input-event', 'classList', 'real-time'],
    description:
      'Create a function called `setupFormValidation` that takes a form element ID and a rules object. The rules object has field names as keys and rule objects as values. Each rule can have: `required` (boolean), `minLength` (number), and `maxLength` (number). For each field in the rules, find the `<input>` with that `name` attribute inside the form and attach an `"input"` event listener. On every keystroke, validate the current value against the rules. If validation fails, add a `"invalid"` class to the input and remove any `"valid"` class. If validation passes, add `"valid"` and remove `"invalid"`. Also create a `<span>` with class `"error-message"` immediately after each validated input — set its `textContent` to the first failing rule message or empty string if valid. Error messages should be: `"Required"` for empty required fields, `"Min N characters"` when too short, `"Max N characters"` when too long.',
    starterCode: '',
    solution:
      'function setupFormValidation(formId, rules) {\n  var form = document.getElementById(formId);\n  var fields = Object.keys(rules);\n  for (var i = 0; i < fields.length; i++) {\n    (function(fieldName) {\n      var rule = rules[fieldName];\n      var input = form.querySelector(\'[name=\"\' + fieldName + \'\"]\');\n      if (!input) return;\n      var errorEl = document.createElement("span");\n      errorEl.className = "error-message";\n      input.parentNode.insertBefore(errorEl, input.nextSibling);\n\n      input.addEventListener("input", function() {\n        var value = input.value;\n        var error = "";\n        if (rule.required && value.trim() === "") {\n          error = "Required";\n        } else if (rule.minLength && value.length < rule.minLength && value.trim() !== "") {\n          error = "Min " + rule.minLength + " characters";\n        } else if (rule.maxLength && value.length > rule.maxLength) {\n          error = "Max " + rule.maxLength + " characters";\n        }\n        errorEl.textContent = error;\n        if (error) {\n          input.classList.add("invalid");\n          input.classList.remove("valid");\n        } else {\n          input.classList.add("valid");\n          input.classList.remove("invalid");\n        }\n      });\n    })(fields[i]);\n  }\n}',
    testRunner: `(code) => {
  var root = document.createElement('div');
  root.innerHTML = '<form id="signup"><div><input name="username" type="text" value=""></div><div><input name="email" type="text" value=""></div><div><input name="bio" type="text" value=""></div></form>';
  document.body.appendChild(root);
  var fn = new Function(code + '; return setupFormValidation;')();
  var rules = {
    username: { required: true, minLength: 3, maxLength: 20 },
    email: { required: true },
    bio: { maxLength: 50 }
  };
  fn('signup', rules);
  var form = document.getElementById('signup');
  var usernameInput = form.querySelector('[name="username"]');
  var emailInput = form.querySelector('[name="email"]');
  var bioInput = form.querySelector('[name="bio"]');

  function setVal(input, val) {
    input.value = val;
    input.dispatchEvent(new Event('input', { bubbles: true }));
  }

  setVal(usernameInput, '');
  var errSpan1 = usernameInput.parentNode.querySelector('.error-message');
  var r1 = errSpan1 && errSpan1.textContent === 'Required' && usernameInput.classList.contains('invalid');

  setVal(usernameInput, 'ab');
  var r2 = errSpan1.textContent === 'Min 3 characters' && usernameInput.classList.contains('invalid');

  setVal(usernameInput, 'alice');
  var r3 = errSpan1.textContent === '' && usernameInput.classList.contains('valid') && !usernameInput.classList.contains('invalid');

  setVal(usernameInput, 'a]very]long]username]that]exceeds');
  var r4 = errSpan1.textContent === 'Max 20 characters';

  setVal(emailInput, '');
  var errSpan2 = emailInput.parentNode.querySelector('.error-message');
  var r5 = errSpan2 && errSpan2.textContent === 'Required';

  setVal(emailInput, 'test@example.com');
  var r6 = errSpan2.textContent === '' && emailInput.classList.contains('valid');

  setVal(bioInput, 'Short bio');
  var errSpan3 = bioInput.parentNode.querySelector('.error-message');
  var r7 = errSpan3 && errSpan3.textContent === '' && bioInput.classList.contains('valid');

  setVal(bioInput, 'This is a very long bio that definitely exceeds the maximum allowed character limit');
  var r8 = errSpan3.textContent === 'Max 50 characters' && bioInput.classList.contains('invalid');

  return [
    { pass: r1, description: 'Empty required field shows "Required" and "invalid" class', got: (errSpan1 ? errSpan1.textContent : 'no span') + ', class=' + usernameInput.className },
    { pass: r2, description: 'Too-short value shows "Min 3 characters"', got: errSpan1.textContent },
    { pass: r3, description: 'Valid value clears error and adds "valid" class', got: errSpan1.textContent + ', class=' + usernameInput.className },
    { pass: r4, description: 'Too-long value shows "Max 20 characters"', got: errSpan1.textContent },
    { pass: r5, description: 'Second field validates independently (required)', got: errSpan2 ? errSpan2.textContent : 'no span' },
    { pass: r6, description: 'Valid email clears error and gets "valid" class', got: (errSpan2 ? errSpan2.textContent : '') + ', class=' + emailInput.className },
    { pass: r7, description: 'Optional field with value is valid', got: (errSpan3 ? errSpan3.textContent : 'no span') + ', class=' + bioInput.className },
    { pass: r8, description: 'Optional field exceeding maxLength shows error', got: (errSpan3 ? errSpan3.textContent : '') + ', class=' + bioInput.className }
  ];
}`,
    hint1:
      'For each field in the rules object, find its input by `name` attribute, create an error `<span>` next to it, and add an `"input"` event listener. Inside the listener, check each rule in priority order (required, then minLength, then maxLength) and set the error message and CSS classes accordingly.',
    hint2:
      'Use `form.querySelector(\'[name="fieldName"]\')` to find each input. Insert the error span with `insertBefore(errorEl, input.nextSibling)`. In the input handler, check: if required and empty, show "Required"; else if too short, show "Min N characters"; else if too long, show "Max N characters"; else clear the error. Use `classList.add/remove` for "valid" and "invalid".',
    resources: validationRes,
  },

];

// ─── Validation (uses jsdom for DOM environment) ─────────────────────────────

async function validate() {
  if (!JSDOM) {
    console.error('jsdom is required for DOM exercise validation.');
    console.error('Install with: npm install jsdom');
    process.exit(1);
  }

  let pass = 0;
  let fail = 0;

  for (const ex of exercises) {
    try {
      const dom = new JSDOM(
        '<!DOCTYPE html><html><body></body></html>',
        { runScripts: 'dangerously', url: 'http://localhost' }
      );

      const script = dom.window.document.createElement('script');
      script.textContent = `
        (async () => {
          try {
            var runner = (${ex.testRunner});
            var results = runner(${JSON.stringify(ex.solution)});
            window.__testResults = results;
          } catch (err) {
            window.__testError = err.message + '\\n' + err.stack;
          }
        })();
      `;
      dom.window.document.body.appendChild(script);

      // Wait for any async operations
      await new Promise((resolve) => setTimeout(resolve, 100));

      if (dom.window.__testError) {
        throw new Error(dom.window.__testError);
      }

      const results = dom.window.__testResults;
      if (!results || !Array.isArray(results)) {
        throw new Error('testRunner did not return an array');
      }

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

      dom.window.close();
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
    `T4 Advanced DOM — Section 2: ${exercises.length} exercises (IDs ${exercises[0].id}-${exercises[exercises.length - 1].id})`
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
