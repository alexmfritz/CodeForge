#!/usr/bin/env node
/**
 * Generator: T4 Complex Data Wrangling — Section 5 (8 exercises, IDs 1351-1358)
 *
 * Covers: Deeply nested data manipulation, method chaining, flattening,
 *         grouping, aggregation, tree traversal, cross-referencing, pivoting
 *
 * T4 convention: description-only, NO starterCode. Student writes everything
 * from scratch including function declaration. Description tells them the
 * function name and expected behavior.
 *
 * Usage:
 *   node exercises/_gen_t4_data_wrangling.js            # Append to curriculum
 *   node exercises/_gen_t4_data_wrangling.js --validate  # Validate testRunners only
 */

const fs = require('fs');
const path = require('path');

const CURRICULUM_PATH = path.join(
  __dirname,
  'collections',
  'default-curriculum.json'
);

// ─── Resources (MDN only for T4) ────────────────────────────────────────────

const arrayMethodsRes = [
  { label: 'MDN: Array.prototype.reduce()', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce', description: 'Array reduce reference' },
  { label: 'MDN: Array.prototype.map()', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map', description: 'Array map reference' },
];
const flatRes = [
  { label: 'MDN: Array.prototype.flat()', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flat', description: 'Array flat reference' },
  { label: 'MDN: Array.prototype.flatMap()', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flatMap', description: 'Array flatMap reference' },
];
const objectRes = [
  { label: 'MDN: Object.keys()', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys', description: 'Object.keys reference' },
  { label: 'MDN: Object.entries()', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries', description: 'Object.entries reference' },
];
const sortFilterRes = [
  { label: 'MDN: Array.prototype.sort()', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort', description: 'Array sort reference' },
  { label: 'MDN: Array.prototype.filter()', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter', description: 'Array filter reference' },
];

// ─── Exercise Definitions ───────────────────────────────────────────────────

const exercises = [

  // ══════════════════════════════════════════════════════════════════════════
  // T4 Section 5: Complex Data Wrangling (8 exercises, IDs 1351-1358)
  // ══════════════════════════════════════════════════════════════════════════

  // 1. Flatten Nested Orders
  {
    id: 1351,
    title: 'Flatten Nested Orders',
    type: 'js',
    tier: 4,
    category: ['data-wrangling', 'flatten-aggregate'],
    tags: ['reduce', 'concat', 'map', 'sort', 'nested-data', 'flatten'],
    description:
      'Create a function called `flattenOrders` that takes an array of department objects. Each department has a `name` and a `regions` array. Each region has a `region` name and an `orders` array. Each order has `item` (string), `price` (number), and `qty` (number). Return an array of summary objects `{ department, orderCount, total }` where `total` is the sum of `price * qty` for all orders across all regions in that department. Sort the result by `total` descending.',
    starterCode: '',
    solution:
      'function flattenOrders(departments) {\n  return departments.map(function(dept) {\n    var allOrders = dept.regions.reduce(function(acc, r) {\n      return acc.concat(r.orders);\n    }, []);\n    var total = allOrders.reduce(function(sum, o) {\n      return sum + o.price * o.qty;\n    }, 0);\n    return { department: dept.name, orderCount: allOrders.length, total: total };\n  }).sort(function(a, b) { return b.total - a.total; });\n}',
    testRunner: `(code) => {
  var fn = new Function(code + '; return flattenOrders;')();
  var results = [];
  var data = [
    { name: 'Electronics', regions: [
      { region: 'North', orders: [{ item: 'TV', price: 500, qty: 2 }, { item: 'Radio', price: 50, qty: 5 }] },
      { region: 'South', orders: [{ item: 'Phone', price: 800, qty: 1 }] }
    ]},
    { name: 'Books', regions: [
      { region: 'North', orders: [{ item: 'Novel', price: 15, qty: 10 }] },
      { region: 'South', orders: [{ item: 'Textbook', price: 80, qty: 3 }, { item: 'Comic', price: 10, qty: 20 }] }
    ]},
    { name: 'Food', regions: [
      { region: 'East', orders: [] }
    ]}
  ];
  var r = fn(data);
  results.push({ pass: r.length === 3, description: 'Returns 3 department summaries', got: String(r.length) });
  results.push({ pass: r[0].department === 'Electronics', description: 'Electronics has highest total (first)', got: r[0].department });
  results.push({ pass: r[0].total === 2050, description: 'Electronics total: 500*2 + 50*5 + 800*1 = 2050', got: String(r[0].total) });
  results.push({ pass: r[0].orderCount === 3, description: 'Electronics has 3 orders across regions', got: String(r[0].orderCount) });
  results.push({ pass: r[1].department === 'Books' && r[1].total === 590, description: 'Books total: 15*10 + 80*3 + 10*20 = 590', got: r[1].department + ': ' + r[1].total });
  results.push({ pass: r[1].orderCount === 3, description: 'Books has 3 orders', got: String(r[1].orderCount) });
  results.push({ pass: r[2].department === 'Food' && r[2].total === 0, description: 'Food has 0 total (empty orders)', got: r[2].department + ': ' + r[2].total });
  results.push({ pass: r[2].orderCount === 0, description: 'Food has 0 orders', got: String(r[2].orderCount) });
  return results;
}`,
    hint1:
      'For each department, you need to gather all orders from all regions into one flat array, then compute the total by summing `price * qty` for each order. Use `reduce` to concatenate region orders and to sum the totals.',
    hint2:
      'Chain: `departments.map(dept => ...)` to build summaries. Inside, use `dept.regions.reduce((acc, r) => acc.concat(r.orders), [])` to flatten. Then `allOrders.reduce((sum, o) => sum + o.price * o.qty, 0)` for the total. Sort the mapped array by total descending.',
    resources: [...arrayMethodsRes, ...flatRes],
  },

  // 2. Student Grade Analysis
  {
    id: 1352,
    title: 'Student Grade Analysis',
    type: 'js',
    tier: 4,
    category: ['data-wrangling', 'group-aggregate'],
    tags: ['reduce', 'map', 'grouping', 'nested-data', 'average', 'sort'],
    description:
      'Create a function called `analyzeStudents` that takes an array of student objects. Each student has `name` (string), `grade` (string like `"A"`, `"B"`, etc.), and `courses` (array of `{ name, score }` objects). Group students by their `grade`. For each grade group, compute the average of all students\' course averages (each student\'s average is the mean of their course scores). Return an array of `{ grade, count, avgScore }` objects sorted by `grade` alphabetically. Round `avgScore` to 2 decimal places.',
    starterCode: '',
    solution:
      'function analyzeStudents(students) {\n  var groups = {};\n  students.forEach(function(s) {\n    if (!groups[s.grade]) groups[s.grade] = [];\n    groups[s.grade].push(s);\n  });\n  return Object.keys(groups).sort().map(function(grade) {\n    var grp = groups[grade];\n    var totalAvg = grp.reduce(function(sum, s) {\n      var courseAvg = s.courses.reduce(function(s2, c) { return s2 + c.score; }, 0) / s.courses.length;\n      return sum + courseAvg;\n    }, 0) / grp.length;\n    return { grade: grade, count: grp.length, avgScore: Math.round(totalAvg * 100) / 100 };\n  });\n}',
    testRunner: `(code) => {
  var fn = new Function(code + '; return analyzeStudents;')();
  var results = [];
  var data = [
    { name: 'Alice', grade: 'A', courses: [{ name: 'Math', score: 95 }, { name: 'English', score: 90 }] },
    { name: 'Bob', grade: 'B', courses: [{ name: 'Math', score: 80 }, { name: 'English', score: 85 }] },
    { name: 'Carol', grade: 'A', courses: [{ name: 'Math', score: 88 }, { name: 'English', score: 92 }] },
    { name: 'Dan', grade: 'C', courses: [{ name: 'Math', score: 70 }] },
    { name: 'Eve', grade: 'B', courses: [{ name: 'Math', score: 78 }, { name: 'English', score: 82 }, { name: 'Science', score: 90 }] }
  ];
  var r = fn(data);
  results.push({ pass: r.length === 3, description: '3 grade groups (A, B, C)', got: String(r.length) });
  results.push({ pass: r[0].grade === 'A', description: 'First group is grade A (alphabetical)', got: r[0].grade });
  results.push({ pass: r[0].count === 2, description: 'Grade A has 2 students', got: String(r[0].count) });
  var aAvg = ((95 + 90) / 2 + (88 + 92) / 2) / 2;
  results.push({ pass: r[0].avgScore === Math.round(aAvg * 100) / 100, description: 'Grade A avgScore: ((92.5 + 90) / 2) = 91.25', got: String(r[0].avgScore) });
  results.push({ pass: r[1].grade === 'B' && r[1].count === 2, description: 'Grade B has 2 students', got: r[1].grade + ': ' + r[1].count });
  var bAvg = ((80 + 85) / 2 + (78 + 82 + 90) / 3) / 2;
  results.push({ pass: r[1].avgScore === Math.round(bAvg * 100) / 100, description: 'Grade B avgScore: ((82.5 + 83.33) / 2) = 82.92', got: String(r[1].avgScore) });
  results.push({ pass: r[2].grade === 'C' && r[2].count === 1, description: 'Grade C has 1 student', got: r[2].grade + ': ' + r[2].count });
  results.push({ pass: r[2].avgScore === 70, description: 'Grade C avgScore: 70 (single student, single course)', got: String(r[2].avgScore) });
  return results;
}`,
    hint1:
      'First group students by grade into an object (keys are grades, values are arrays of students). Then for each group, compute each student\'s course average, then average those averages together. Sort the final array by grade.',
    hint2:
      'Group with a `forEach` loop building an object. Then `Object.keys(groups).sort().map(...)` to process each grade. Each student\'s average is `courses.reduce((s, c) => s + c.score, 0) / courses.length`. The group average is the sum of student averages divided by the student count.',
    resources: [...arrayMethodsRes, ...objectRes],
  },

  // 3. Deep Value Extraction
  {
    id: 1353,
    title: 'Deep Value Extraction',
    type: 'js',
    tier: 4,
    category: ['data-wrangling', 'deep-access'],
    tags: ['nested-data', 'dot-notation', 'path-traversal', 'object', 'null-safety'],
    description:
      'Create a function called `pluck` that takes an array of objects and a dot-notation path string. Extract the value at that path from each object. If the path does not exist in an object, use `undefined` for that entry. Return the array of extracted values. For example, `pluck([{ a: { b: 1 } }, { a: { b: 2 } }], "a.b")` returns `[1, 2]`.',
    starterCode: '',
    solution:
      'function pluck(arr, path) {\n  var parts = path.split(".");\n  return arr.map(function(obj) {\n    var val = obj;\n    for (var i = 0; i < parts.length; i++) {\n      if (val === undefined || val === null) return undefined;\n      val = val[parts[i]];\n    }\n    return val;\n  });\n}',
    testRunner: `(code) => {
  var fn = new Function(code + '; return pluck;')();
  var results = [];
  var data = [
    { user: { name: 'Alice', address: { city: 'Portland' } } },
    { user: { name: 'Bob', address: { city: 'Seattle' } } },
    { user: { name: 'Carol' } }
  ];
  var r1 = fn(data, 'user.name');
  results.push({ pass: JSON.stringify(r1) === '["Alice","Bob","Carol"]', description: '"user.name" extracts all names', got: JSON.stringify(r1) });
  var r2 = fn(data, 'user.address.city');
  results.push({ pass: r2[0] === 'Portland' && r2[1] === 'Seattle' && r2[2] === undefined, description: '"user.address.city" returns undefined for missing path', got: JSON.stringify(r2) });
  var r3 = fn([{ a: 1 }, { a: 2 }, { a: 3 }], 'a');
  results.push({ pass: JSON.stringify(r3) === '[1,2,3]', description: 'Single-level path "a" works', got: JSON.stringify(r3) });
  var r4 = fn([{ x: { y: { z: 42 } } }], 'x.y.z');
  results.push({ pass: r4[0] === 42, description: 'Three-level deep path returns 42', got: String(r4[0]) });
  var r5 = fn([{}, {}, {}], 'missing');
  results.push({ pass: r5[0] === undefined && r5[1] === undefined, description: 'Missing top-level key returns undefined', got: JSON.stringify(r5) });
  var r6 = fn([], 'any.path');
  results.push({ pass: JSON.stringify(r6) === '[]', description: 'Empty array returns empty array', got: JSON.stringify(r6) });
  var r7 = fn([{ a: null }], 'a.b');
  results.push({ pass: r7[0] === undefined, description: 'Null intermediate value returns undefined', got: String(r7[0]) });
  var r8 = fn([{ val: 0 }, { val: false }, { val: '' }], 'val');
  results.push({ pass: r8[0] === 0 && r8[1] === false && r8[2] === '', description: 'Falsy values (0, false, "") extracted correctly', got: JSON.stringify(r8) });
  return results;
}`,
    hint1:
      'Split the path on dots to get an array of keys. For each object, walk through the keys one by one, accessing deeper properties. If at any point the value is null or undefined, return undefined for that entry.',
    hint2:
      'Use `arr.map(function(obj) { ... })` to process each item. Inside, start with `val = obj`, then loop through the path parts: `val = val[parts[i]]`. Check for null/undefined at each step. Return the final value.',
    resources: [...arrayMethodsRes, ...objectRes],
  },

  // 4. Transform Nested Tree
  {
    id: 1354,
    title: 'Transform Nested Tree',
    type: 'js',
    tier: 4,
    category: ['data-wrangling', 'tree-traversal'],
    tags: ['recursion', 'tree', 'map', 'nested-data', 'transform'],
    description:
      'Create a function called `mapTree` that takes a tree node and a transform function. Each node is an object with a `value` property and an optional `children` array of child nodes. Apply the transform function to each node\'s `value` and return a new tree with the same structure but transformed values. The transform function takes `(value, depth)` where `depth` is 0 for the root. Do not mutate the original tree.',
    starterCode: '',
    solution:
      'function mapTree(node, fn, depth) {\n  if (depth === undefined) depth = 0;\n  var result = { value: fn(node.value, depth) };\n  if (node.children && node.children.length > 0) {\n    result.children = node.children.map(function(child) {\n      return mapTree(child, fn, depth + 1);\n    });\n  }\n  return result;\n}',
    testRunner: `(code) => {
  var fn = new Function(code + '; return mapTree;')();
  var results = [];
  var tree = {
    value: 1,
    children: [
      { value: 2, children: [{ value: 4 }, { value: 5 }] },
      { value: 3, children: [{ value: 6 }] }
    ]
  };
  var r1 = fn(tree, function(v) { return v * 10; });
  results.push({ pass: r1.value === 10, description: 'Root value transformed: 1 → 10', got: String(r1.value) });
  results.push({ pass: r1.children[0].value === 20 && r1.children[1].value === 30, description: 'Level 1 children transformed: 2→20, 3→30', got: r1.children[0].value + ', ' + r1.children[1].value });
  results.push({ pass: r1.children[0].children[0].value === 40 && r1.children[0].children[1].value === 50, description: 'Level 2 leaves transformed: 4→40, 5→50', got: r1.children[0].children[0].value + ', ' + r1.children[0].children[1].value });
  results.push({ pass: tree.value === 1, description: 'Original tree not mutated', got: String(tree.value) });

  var r5 = fn({ value: 'root' }, function(v) { return v.toUpperCase(); });
  results.push({ pass: r5.value === 'ROOT' && !r5.children, description: 'Single node (no children) transforms correctly', got: JSON.stringify(r5) });

  var r6 = fn(tree, function(v, d) { return v + '_' + d; });
  results.push({ pass: r6.value === '1_0', description: 'Depth passed to transform: root is depth 0', got: r6.value });
  results.push({ pass: r6.children[0].value === '2_1', description: 'Level 1 child gets depth 1', got: r6.children[0].value });
  results.push({ pass: r6.children[0].children[0].value === '4_2', description: 'Level 2 leaf gets depth 2', got: r6.children[0].children[0].value });
  return results;
}`,
    hint1:
      'This requires recursion. Apply the transform to the current node\'s value, then recursively process each child. Track the depth by passing it as a parameter (starting at 0, incrementing for each level).',
    hint2:
      'Create a new object with the transformed value. If the node has children, map over them with recursive calls: `node.children.map(child => mapTree(child, fn, depth + 1))`. If no children, just return the object without a children property.',
    resources: arrayMethodsRes,
  },

  // 5. Cross-Reference Datasets
  {
    id: 1355,
    title: 'Cross-Reference Datasets',
    type: 'js',
    tier: 4,
    category: ['data-wrangling', 'join'],
    tags: ['reduce', 'map', 'lookup', 'join', 'merge', 'nested-data'],
    description:
      'Create a function called `crossReference` that takes two arrays of objects, `primary` and `lookup`, and a `key` string. For each object in `primary`, find the matching object in `lookup` (where both have the same value for the given key). Merge the matching lookup properties into the primary object (lookup properties should not overwrite existing primary properties). If no match is found, add a `_matched` property set to `false`. If a match is found, add `_matched: true`. Return the merged array.',
    starterCode: '',
    solution:
      'function crossReference(primary, lookup, key) {\n  var lookupMap = {};\n  lookup.forEach(function(item) {\n    lookupMap[item[key]] = item;\n  });\n  return primary.map(function(item) {\n    var match = lookupMap[item[key]];\n    var result = {};\n    Object.keys(item).forEach(function(k) { result[k] = item[k]; });\n    if (match) {\n      Object.keys(match).forEach(function(k) {\n        if (!(k in result)) result[k] = match[k];\n      });\n      result._matched = true;\n    } else {\n      result._matched = false;\n    }\n    return result;\n  });\n}',
    testRunner: `(code) => {
  var fn = new Function(code + '; return crossReference;')();
  var results = [];
  var users = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
    { id: 3, name: 'Carol' }
  ];
  var profiles = [
    { id: 1, email: 'alice@test.com', role: 'admin' },
    { id: 2, email: 'bob@test.com', role: 'user' }
  ];
  var r = fn(users, profiles, 'id');
  results.push({ pass: r.length === 3, description: 'Returns same number of items as primary', got: String(r.length) });
  results.push({ pass: r[0].name === 'Alice' && r[0].email === 'alice@test.com' && r[0].role === 'admin', description: 'Alice merged with profile (email + role)', got: JSON.stringify(r[0]) });
  results.push({ pass: r[0]._matched === true, description: 'Alice has _matched: true', got: String(r[0]._matched) });
  results.push({ pass: r[2]._matched === false, description: 'Carol (no match) has _matched: false', got: String(r[2]._matched) });
  results.push({ pass: r[2].email === undefined, description: 'Unmatched item has no extra properties', got: String(r[2].email) });

  var orders = [{ sku: 'A1', qty: 5, price: 10 }];
  var catalog = [{ sku: 'A1', price: 20, name: 'Widget' }];
  var r6 = fn(orders, catalog, 'sku');
  results.push({ pass: r6[0].price === 10, description: 'Primary "price" not overwritten by lookup "price"', got: String(r6[0].price) });
  results.push({ pass: r6[0].name === 'Widget', description: 'New property "name" added from lookup', got: r6[0].name });

  var r8 = fn([], [{ id: 1 }], 'id');
  results.push({ pass: r8.length === 0, description: 'Empty primary returns empty array', got: String(r8.length) });
  return results;
}`,
    hint1:
      'Build a lookup map from the secondary array (keyed by the join field) for O(1) access. Then map over the primary array, finding matches in the lookup. Merge properties from the match without overwriting existing properties.',
    hint2:
      'Create the map: `lookup.forEach(item => map[item[key]] = item)`. For each primary item, copy its properties into a new object, then if a match exists, add any properties from the match that are not already present. Set `_matched` accordingly.',
    resources: [...arrayMethodsRes, ...objectRes],
  },

  // 6. Company Report (deep nesting)
  {
    id: 1356,
    title: 'Company Department Report',
    type: 'js',
    tier: 4,
    category: ['data-wrangling', 'deep-nesting'],
    tags: ['nested-data', 'flatMap', 'reduce', 'filter', 'map', 'sort', 'deep-nesting'],
    description:
      'Create a function called `departmentReport` that takes a company object with structure: `{ departments: [{ name, teams: [{ name, members: [{ name, role, salary, active }] }] }] }`. Return an array of department summaries sorted by total salary descending. Each summary has: `department` (name), `teamCount` (number of teams), `activeMembers` (count of members where `active` is true across all teams), `totalSalary` (sum of all active members\' salaries), and `topEarner` (name of the highest-paid active member, or `null` if no active members).',
    starterCode: '',
    solution:
      'function departmentReport(company) {\n  return company.departments.map(function(dept) {\n    var activeMembers = [];\n    dept.teams.forEach(function(team) {\n      team.members.forEach(function(m) {\n        if (m.active) activeMembers.push(m);\n      });\n    });\n    var totalSalary = activeMembers.reduce(function(sum, m) { return sum + m.salary; }, 0);\n    var topEarner = null;\n    if (activeMembers.length > 0) {\n      topEarner = activeMembers.reduce(function(top, m) {\n        return m.salary > top.salary ? m : top;\n      }).name;\n    }\n    return {\n      department: dept.name,\n      teamCount: dept.teams.length,\n      activeMembers: activeMembers.length,\n      totalSalary: totalSalary,\n      topEarner: topEarner\n    };\n  }).sort(function(a, b) { return b.totalSalary - a.totalSalary; });\n}',
    testRunner: `(code) => {
  var fn = new Function(code + '; return departmentReport;')();
  var results = [];
  var company = { departments: [
    { name: 'Engineering', teams: [
      { name: 'Frontend', members: [
        { name: 'Alice', role: 'lead', salary: 120000, active: true },
        { name: 'Bob', role: 'dev', salary: 95000, active: true },
        { name: 'Carol', role: 'dev', salary: 90000, active: false }
      ]},
      { name: 'Backend', members: [
        { name: 'Dan', role: 'lead', salary: 130000, active: true }
      ]}
    ]},
    { name: 'Marketing', teams: [
      { name: 'Content', members: [
        { name: 'Eve', role: 'writer', salary: 70000, active: true },
        { name: 'Frank', role: 'designer', salary: 75000, active: true }
      ]}
    ]},
    { name: 'Research', teams: [
      { name: 'Lab', members: [
        { name: 'Grace', role: 'scientist', salary: 110000, active: false }
      ]}
    ]}
  ]};
  var r = fn(company);
  results.push({ pass: r.length === 3, description: '3 department summaries returned', got: String(r.length) });
  results.push({ pass: r[0].department === 'Engineering', description: 'Engineering has highest total salary (first)', got: r[0].department });
  results.push({ pass: r[0].totalSalary === 345000, description: 'Engineering totalSalary: 120k+95k+130k = 345000', got: String(r[0].totalSalary) });
  results.push({ pass: r[0].activeMembers === 3, description: 'Engineering has 3 active members (Carol excluded)', got: String(r[0].activeMembers) });
  results.push({ pass: r[0].topEarner === 'Dan', description: 'Engineering top earner is Dan (130k)', got: r[0].topEarner });
  results.push({ pass: r[0].teamCount === 2, description: 'Engineering has 2 teams', got: String(r[0].teamCount) });
  results.push({ pass: r[1].department === 'Marketing' && r[1].totalSalary === 145000, description: 'Marketing total: 70k+75k = 145000', got: r[1].department + ': ' + r[1].totalSalary });
  results.push({ pass: r[2].department === 'Research' && r[2].activeMembers === 0 && r[2].topEarner === null, description: 'Research: 0 active members, topEarner is null', got: 'active=' + r[2].activeMembers + ', top=' + r[2].topEarner });
  return results;
}`,
    hint1:
      'For each department, flatten all members from all teams, filter to active ones, then compute the sum of salaries and find the highest earner. Use `reduce` to find the top earner by comparing salaries.',
    hint2:
      'Collect active members by looping through teams and their members, pushing active ones into an array. Use `reduce` for total salary and for finding the max. Handle the edge case where there are no active members (topEarner should be null).',
    resources: [...arrayMethodsRes, ...sortFilterRes],
  },

  // 7. Pivot Data
  {
    id: 1357,
    title: 'Pivot Table',
    type: 'js',
    tier: 4,
    category: ['data-wrangling', 'reshape'],
    tags: ['reduce', 'pivot', 'reshape', 'object', 'nested-data', 'aggregate'],
    description:
      'Create a function called `pivot` that takes an array of flat records, a `rowKey` (string), a `colKey` (string), and a `valueKey` (string). Reshape the data into a pivot table. Return an array of objects, one per unique `rowKey` value. Each object has a `_row` property (the row key value) plus one property for each unique `colKey` value (containing the sum of `valueKey` values for that row-column combination). If a row-column combination has no data, its value should be `0`. Sort rows alphabetically by `_row`.',
    starterCode: '',
    solution:
      'function pivot(records, rowKey, colKey, valueKey) {\n  var cols = [];\n  var seen = {};\n  records.forEach(function(r) {\n    if (!seen[r[colKey]]) { cols.push(r[colKey]); seen[r[colKey]] = true; }\n  });\n  cols.sort();\n  var rows = {};\n  records.forEach(function(r) {\n    var rk = r[rowKey];\n    if (!rows[rk]) {\n      rows[rk] = { _row: rk };\n      cols.forEach(function(c) { rows[rk][c] = 0; });\n    }\n    rows[rk][r[colKey]] += r[valueKey];\n  });\n  return Object.keys(rows).sort().map(function(k) { return rows[k]; });\n}',
    testRunner: `(code) => {
  var fn = new Function(code + '; return pivot;')();
  var results = [];
  var sales = [
    { product: 'Widget', quarter: 'Q1', revenue: 100 },
    { product: 'Widget', quarter: 'Q2', revenue: 150 },
    { product: 'Gadget', quarter: 'Q1', revenue: 200 },
    { product: 'Gadget', quarter: 'Q2', revenue: 250 },
    { product: 'Gadget', quarter: 'Q1', revenue: 50 },
    { product: 'Widget', quarter: 'Q3', revenue: 120 }
  ];
  var r = fn(sales, 'product', 'quarter', 'revenue');
  results.push({ pass: r.length === 2, description: '2 rows (Gadget, Widget)', got: String(r.length) });
  results.push({ pass: r[0]._row === 'Gadget', description: 'First row is Gadget (alphabetical)', got: r[0]._row });
  results.push({ pass: r[0].Q1 === 250, description: 'Gadget Q1: 200 + 50 = 250 (aggregated)', got: String(r[0].Q1) });
  results.push({ pass: r[0].Q2 === 250, description: 'Gadget Q2: 250', got: String(r[0].Q2) });
  results.push({ pass: r[0].Q3 === 0, description: 'Gadget Q3: 0 (no data)', got: String(r[0].Q3) });
  results.push({ pass: r[1]._row === 'Widget' && r[1].Q1 === 100, description: 'Widget Q1: 100', got: r[1]._row + ' Q1=' + r[1].Q1 });
  results.push({ pass: r[1].Q2 === 150 && r[1].Q3 === 120, description: 'Widget Q2=150, Q3=120', got: 'Q2=' + r[1].Q2 + ', Q3=' + r[1].Q3 });
  var empty = fn([], 'a', 'b', 'c');
  results.push({ pass: empty.length === 0, description: 'Empty input returns empty array', got: String(empty.length) });
  return results;
}`,
    hint1:
      'First collect all unique column values. Then build a rows object where each key is a row value and each value is an object with the row name and all columns initialized to 0. Loop through records adding values to the correct row/column cell.',
    hint2:
      'Two passes: (1) scan all records to find unique column values. (2) for each record, find or create the row object and add the value to the correct column. Finally, convert the rows object to an array, sorted by `_row`.',
    resources: [...arrayMethodsRes, ...objectRes],
  },

  // 8. Inventory Analysis (complex pipeline)
  {
    id: 1358,
    title: 'Inventory Analysis Pipeline',
    type: 'js',
    tier: 4,
    category: ['data-wrangling', 'pipeline'],
    tags: ['filter', 'map', 'reduce', 'sort', 'flatMap', 'chaining', 'nested-data', 'pipeline'],
    description:
      'Create a function called `analyzeInventory` that takes an array of warehouse objects. Each warehouse has `name` (string), `location` (string), and `inventory` (array of `{ product, category, quantity, price }` objects). Perform this analysis pipeline: (1) Flatten all inventory items across all warehouses, tagging each with its warehouse name. (2) Filter out items with `quantity` of 0. (3) Compute the `totalValue` (`quantity * price`) for each item. (4) Group the remaining items by `category`. (5) For each category, return `{ category, itemCount, totalValue, topItem }` where `topItem` is the product name with the highest total value in that category. Sort the result by `totalValue` descending.',
    starterCode: '',
    solution:
      'function analyzeInventory(warehouses) {\n  var items = [];\n  warehouses.forEach(function(w) {\n    w.inventory.forEach(function(item) {\n      items.push({ product: item.product, category: item.category, quantity: item.quantity, price: item.price, warehouse: w.name });\n    });\n  });\n  var active = items.filter(function(item) { return item.quantity > 0; });\n  var valued = active.map(function(item) {\n    return { product: item.product, category: item.category, totalValue: item.quantity * item.price, warehouse: item.warehouse };\n  });\n  var groups = {};\n  valued.forEach(function(item) {\n    if (!groups[item.category]) groups[item.category] = [];\n    groups[item.category].push(item);\n  });\n  return Object.keys(groups).map(function(cat) {\n    var catItems = groups[cat];\n    var totalValue = catItems.reduce(function(sum, i) { return sum + i.totalValue; }, 0);\n    var topItem = catItems.reduce(function(top, i) { return i.totalValue > top.totalValue ? i : top; }).product;\n    return { category: cat, itemCount: catItems.length, totalValue: totalValue, topItem: topItem };\n  }).sort(function(a, b) { return b.totalValue - a.totalValue; });\n}',
    testRunner: `(code) => {
  var fn = new Function(code + '; return analyzeInventory;')();
  var results = [];
  var data = [
    { name: 'West', location: 'Portland', inventory: [
      { product: 'Laptop', category: 'Electronics', quantity: 10, price: 1000 },
      { product: 'Mouse', category: 'Electronics', quantity: 50, price: 25 },
      { product: 'Desk', category: 'Furniture', quantity: 5, price: 300 },
      { product: 'Pen', category: 'Office', quantity: 0, price: 2 }
    ]},
    { name: 'East', location: 'Boston', inventory: [
      { product: 'Laptop', category: 'Electronics', quantity: 8, price: 1000 },
      { product: 'Chair', category: 'Furniture', quantity: 20, price: 200 },
      { product: 'Notebook', category: 'Office', quantity: 100, price: 5 }
    ]}
  ];
  var r = fn(data);
  results.push({ pass: r.length === 3, description: '3 categories returned', got: String(r.length) });
  results.push({ pass: r[0].category === 'Electronics', description: 'Electronics has highest totalValue (first)', got: r[0].category });
  results.push({ pass: r[0].totalValue === 19250, description: 'Electronics total: 10*1000 + 50*25 + 8*1000 = 19250', got: String(r[0].totalValue) });
  results.push({ pass: r[0].itemCount === 3, description: 'Electronics has 3 items (2 Laptops + 1 Mouse)', got: String(r[0].itemCount) });
  results.push({ pass: r[0].topItem === 'Laptop', description: 'Electronics top item is Laptop (10000 or 8000 > 1250)', got: r[0].topItem });
  results.push({ pass: r[1].category === 'Furniture' && r[1].totalValue === 5500, description: 'Furniture total: 5*300 + 20*200 = 5500', got: r[1].category + ': ' + r[1].totalValue });
  results.push({ pass: r[2].category === 'Office' && r[2].totalValue === 500, description: 'Office total: 100*5 = 500 (Pen qty 0 filtered out)', got: r[2].category + ': ' + r[2].totalValue });
  results.push({ pass: r[2].itemCount === 1, description: 'Office has 1 item (Pen filtered out, Notebook kept)', got: String(r[2].itemCount) });
  return results;
}`,
    hint1:
      'Build the pipeline step by step: flatten all inventory items (adding warehouse info), filter out zero-quantity items, compute total value for each, group by category, then summarize each group. Sort the final summaries by total value.',
    hint2:
      'Flatten with nested forEach (or flatMap). Filter with `.filter(i => i.quantity > 0)`. Map to add `totalValue`. Group into an object by category. For each category, reduce to get the sum and the item with the highest individual value. Sort by totalValue descending.',
    resources: [...arrayMethodsRes, ...sortFilterRes, ...flatRes],
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
    `T4 Complex Data Wrangling — Section 5: ${exercises.length} exercises (IDs ${exercises[0].id}-${exercises[exercises.length - 1].id})`
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
