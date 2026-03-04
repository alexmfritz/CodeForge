#!/usr/bin/env node
/**
 * Generator: T5 Mastercraft Exercises (10 exercises, IDs 1388-1397)
 *
 * Covers: Array Toolkit, Data Pipeline, Class System, Library System,
 *         Dynamic Programming, Test Framework, RPG Combat, Markdown Parser,
 *         Social Feed, Regex Engine
 *
 * T5 convention: empty editor, no function/class name given in description
 * (problem statement only). Student decides naming, structure, approach.
 * Tests still extract by name, so description mentions what to export.
 *
 * Usage:
 *   node exercises/_gen_t5_exercises.js            # Append to curriculum
 *   node exercises/_gen_t5_exercises.js --validate  # Validate testRunners only
 */

const fs = require('fs');
const path = require('path');

const CURRICULUM_PATH = path.join(
  __dirname,
  'collections',
  'default-curriculum.json'
);

// ─── Resources (MDN only for T5) ────────────────────────────────────────────

const arrayRes = [
  { label: 'MDN: Array', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array', description: 'Array reference' },
  { label: 'MDN: Array.prototype.slice', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice', description: 'Array slice reference' },
];
const pipelineRes = [
  { label: 'MDN: Array.prototype.reduce', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce', description: 'Array reduce reference' },
  { label: 'MDN: Array.prototype.filter', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter', description: 'Array filter reference' },
];
const classRes = [
  { label: 'MDN: Classes', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes', description: 'Classes reference' },
  { label: 'MDN: Inheritance', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Inheritance_and_the_prototype_chain', description: 'Inheritance and prototype chain' },
];
const libraryRes = [
  { label: 'MDN: Classes', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes', description: 'Classes reference' },
  { label: 'MDN: Array.prototype.find', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find', description: 'Array find reference' },
];
const dpRes = [
  { label: 'MDN: Array', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array', description: 'Array reference' },
  { label: 'MDN: Math.min', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/min', description: 'Math.min reference' },
];
const testFrameRes = [
  { label: 'MDN: try...catch', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch', description: 'Try/catch reference' },
  { label: 'MDN: Error', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error', description: 'Error reference' },
];
const rpgRes = [
  { label: 'MDN: Classes', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes', description: 'Classes reference' },
  { label: 'MDN: Math.random', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random', description: 'Math.random reference' },
];
const markdownRes = [
  { label: 'MDN: String.prototype.replace', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace', description: 'String replace reference' },
  { label: 'MDN: Regular Expressions', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions', description: 'Regular expressions guide' },
];
const socialRes = [
  { label: 'MDN: Classes', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes', description: 'Classes reference' },
  { label: 'MDN: Array.prototype.sort', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort', description: 'Array sort reference' },
];
const regexEngineRes = [
  { label: 'MDN: Regular Expressions', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions', description: 'Regular expressions guide' },
  { label: 'MDN: String.prototype.charAt', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/charAt', description: 'String charAt reference' },
];

// ─── Exercise Definitions ───────────────────────────────────────────────────

const exercises = [

  // ══════════════════════════════════════════════════════════════════════════
  // T5 Mastercraft Exercises (10 exercises, IDs 1388-1397)
  // ══════════════════════════════════════════════════════════════════════════

  // 1. Array Toolkit
  {
    id: 1388,
    title: 'Array Toolkit',
    type: 'js',
    tier: 5,
    category: ['functions', 'array-toolkit'],
    tags: ['arrays', 'utility', 'chunk', 'zip', 'flatten', 'unique', 'difference', 'intersection'],
    description:
      'Build a utility library of custom array methods. Your solution should export an object called `ArrayKit` with these methods: `chunk(arr, size)` splits an array into groups of the given size (the last chunk may be smaller); `zip(...arrays)` combines multiple arrays element-by-element into an array of tuples; `difference(a, b)` returns elements in `a` that are not in `b`; `intersection(a, b)` returns elements present in both `a` and `b`; `flatten(arr)` recursively flattens nested arrays into a single-level array; `unique(arr)` returns an array with duplicates removed, preserving original order.',
    starterCode: '',
    solution:
      'var ArrayKit = {\n  chunk: function(arr, size) {\n    var result = [];\n    for (var i = 0; i < arr.length; i += size) {\n      result.push(arr.slice(i, i + size));\n    }\n    return result;\n  },\n  zip: function() {\n    var arrays = [];\n    for (var i = 0; i < arguments.length; i++) arrays.push(arguments[i]);\n    var maxLen = 0;\n    for (var i = 0; i < arrays.length; i++) {\n      if (arrays[i].length > maxLen) maxLen = arrays[i].length;\n    }\n    var result = [];\n    for (var i = 0; i < maxLen; i++) {\n      var tuple = [];\n      for (var j = 0; j < arrays.length; j++) {\n        tuple.push(i < arrays[j].length ? arrays[j][i] : undefined);\n      }\n      result.push(tuple);\n    }\n    return result;\n  },\n  difference: function(a, b) {\n    return a.filter(function(x) { return b.indexOf(x) === -1; });\n  },\n  intersection: function(a, b) {\n    return a.filter(function(x) { return b.indexOf(x) !== -1; });\n  },\n  flatten: function(arr) {\n    var result = [];\n    for (var i = 0; i < arr.length; i++) {\n      if (Array.isArray(arr[i])) {\n        var flat = ArrayKit.flatten(arr[i]);\n        for (var j = 0; j < flat.length; j++) result.push(flat[j]);\n      } else {\n        result.push(arr[i]);\n      }\n    }\n    return result;\n  },\n  unique: function(arr) {\n    var seen = [];\n    var result = [];\n    for (var i = 0; i < arr.length; i++) {\n      if (seen.indexOf(arr[i]) === -1) {\n        seen.push(arr[i]);\n        result.push(arr[i]);\n      }\n    }\n    return result;\n  }\n};',
    testRunner: `(code) => {
  var kit = new Function(code + '; return ArrayKit;')();
  var results = [];

  results.push({ pass: JSON.stringify(kit.chunk([1,2,3,4,5], 2)) === '[[1,2],[3,4],[5]]', description: 'chunk([1,2,3,4,5], 2) returns [[1,2],[3,4],[5]]', got: JSON.stringify(kit.chunk([1,2,3,4,5], 2)) });

  results.push({ pass: JSON.stringify(kit.zip([1,2,3], ['a','b','c'])) === '[[1,"a"],[2,"b"],[3,"c"]]', description: 'zip([1,2,3], ["a","b","c"]) returns paired tuples', got: JSON.stringify(kit.zip([1,2,3], ['a','b','c'])) });

  results.push({ pass: JSON.stringify(kit.difference([1,2,3,4], [2,4])) === '[1,3]', description: 'difference([1,2,3,4], [2,4]) returns [1,3]', got: JSON.stringify(kit.difference([1,2,3,4], [2,4])) });

  results.push({ pass: JSON.stringify(kit.intersection([1,2,3], [2,3,4])) === '[2,3]', description: 'intersection([1,2,3], [2,3,4]) returns [2,3]', got: JSON.stringify(kit.intersection([1,2,3], [2,3,4])) });

  results.push({ pass: JSON.stringify(kit.flatten([1, [2, [3, [4]], 5]])) === '[1,2,3,4,5]', description: 'flatten([1,[2,[3,[4]],5]]) returns [1,2,3,4,5]', got: JSON.stringify(kit.flatten([1, [2, [3, [4]], 5]])) });

  results.push({ pass: JSON.stringify(kit.unique([1,2,2,3,1,4])) === '[1,2,3,4]', description: 'unique([1,2,2,3,1,4]) returns [1,2,3,4]', got: JSON.stringify(kit.unique([1,2,2,3,1,4])) });

  results.push({ pass: JSON.stringify(kit.zip([1,2], ['a','b','c'])) === '[[1,"a"],[2,"b"],[null,"c"]]' || JSON.stringify(kit.zip([1,2], ['a','b','c'])).indexOf('[null,"c"]') !== -1 || kit.zip([1,2], ['a','b','c']).length === 3, description: 'zip with unequal lengths pads shorter arrays', got: JSON.stringify(kit.zip([1,2], ['a','b','c'])) });

  results.push({ pass: JSON.stringify(kit.chunk([], 3)) === '[]' && JSON.stringify(kit.flatten([])) === '[]' && JSON.stringify(kit.unique([])) === '[]', description: 'All methods handle empty arrays correctly', got: 'chunk=' + JSON.stringify(kit.chunk([], 3)) + ', flatten=' + JSON.stringify(kit.flatten([])) });

  return results;
}`,
    hint1:
      'Think about each method independently. For chunk, step through the array by the given size and slice out groups. For zip, find the longest array length and collect one element from each array per index. For flatten, check if each element is an array and recurse if so.',
    hint2:
      'For difference and intersection, filter one array based on whether each element exists in the other. For unique, track which values you have already seen. For zip with unequal lengths, use undefined for missing values. Build an object that holds all six methods and assign it to a variable the tests can find.',
    resources: arrayRes,
  },

  // 2. Data Pipeline
  {
    id: 1389,
    title: 'Data Pipeline',
    type: 'js',
    tier: 5,
    category: ['functions', 'data-pipeline'],
    tags: ['pipeline', 'lazy', 'chaining', 'map', 'filter', 'transform', 'functional'],
    description:
      'Build a lazy data pipeline that processes datasets through chained transformations. Your solution should export a function called `createPipeline` that takes an array of data and returns a pipeline object supporting chained calls: `map(fn)` transforms each element, `filter(fn)` keeps elements where fn returns true, `take(n)` limits output to the first n results, and `toArray()` executes all queued operations and returns the final array. Operations should be lazy — nothing executes until `toArray()` is called. The pipeline must be reusable: calling `toArray()` multiple times should produce the same result.',
    starterCode: '',
    solution:
      'function createPipeline(data) {\n  var ops = [];\n  var pipeline = {\n    map: function(fn) {\n      ops.push({ type: "map", fn: fn });\n      return pipeline;\n    },\n    filter: function(fn) {\n      ops.push({ type: "filter", fn: fn });\n      return pipeline;\n    },\n    take: function(n) {\n      ops.push({ type: "take", n: n });\n      return pipeline;\n    },\n    toArray: function() {\n      var result = data.slice();\n      for (var i = 0; i < ops.length; i++) {\n        var op = ops[i];\n        if (op.type === "map") {\n          var mapped = [];\n          for (var j = 0; j < result.length; j++) mapped.push(op.fn(result[j]));\n          result = mapped;\n        } else if (op.type === "filter") {\n          var filtered = [];\n          for (var j = 0; j < result.length; j++) {\n            if (op.fn(result[j])) filtered.push(result[j]);\n          }\n          result = filtered;\n        } else if (op.type === "take") {\n          result = result.slice(0, op.n);\n        }\n      }\n      return result;\n    }\n  };\n  return pipeline;\n}',
    testRunner: `(code) => {
  var fn = new Function(code + '; return createPipeline;')();
  var results = [];

  var p1 = fn([1, 2, 3, 4, 5]);
  results.push({ pass: JSON.stringify(p1.map(function(x) { return x * 2; }).toArray()) === '[2,4,6,8,10]', description: 'map doubles all elements: [2,4,6,8,10]', got: JSON.stringify(p1.toArray()) });

  var p2 = fn([1, 2, 3, 4, 5, 6]);
  var r2 = p2.filter(function(x) { return x % 2 === 0; }).toArray();
  results.push({ pass: JSON.stringify(r2) === '[2,4,6]', description: 'filter keeps even numbers: [2,4,6]', got: JSON.stringify(r2) });

  var p3 = fn([10, 20, 30, 40, 50]);
  var r3 = p3.take(3).toArray();
  results.push({ pass: JSON.stringify(r3) === '[10,20,30]', description: 'take(3) returns first 3 elements', got: JSON.stringify(r3) });

  var p4 = fn([1, 2, 3, 4, 5, 6, 7, 8]);
  var r4 = p4.filter(function(x) { return x > 3; }).map(function(x) { return x * 10; }).take(2).toArray();
  results.push({ pass: JSON.stringify(r4) === '[40,50]', description: 'Chained: filter(>3) → map(*10) → take(2) = [40,50]', got: JSON.stringify(r4) });

  var p5 = fn([1, 2, 3]);
  var first = JSON.stringify(p5.toArray());
  var second = JSON.stringify(p5.toArray());
  results.push({ pass: first === second && first === '[1,2,3]', description: 'Pipeline is reusable — toArray() called twice gives same result', got: 'first=' + first + ', second=' + second });

  var original = [1, 2, 3];
  var p6 = fn(original);
  p6.map(function(x) { return x * 100; }).toArray();
  results.push({ pass: JSON.stringify(original) === '[1,2,3]', description: 'Original data array is not modified', got: JSON.stringify(original) });

  var p7 = fn([]);
  var r7 = p7.map(function(x) { return x + 1; }).filter(function(x) { return x > 0; }).toArray();
  results.push({ pass: JSON.stringify(r7) === '[]', description: 'Empty pipeline processes gracefully', got: JSON.stringify(r7) });

  var p8 = fn([5, 3, 8, 1, 9, 2, 7]);
  var r8 = p8.filter(function(x) { return x >= 5; }).map(function(x) { return x - 5; }).filter(function(x) { return x > 0; }).toArray();
  results.push({ pass: JSON.stringify(r8) === '[3,4,2]', description: 'Multiple filters and maps: filter(>=5) → map(-5) → filter(>0) = [3,4,2]', got: JSON.stringify(r8) });

  return results;
}`,
    hint1:
      'Store each chained operation as a descriptor in an array rather than executing it immediately. Each method (map, filter, take) pushes a record and returns the pipeline for chaining. When toArray is called, iterate through the stored operations and apply them in sequence to a copy of the original data.',
    hint2:
      'Use an operations array where each entry has a type like "map", "filter", or "take" plus the associated function or count. In toArray, start with a copy of the data, then loop through operations: for map, transform each element; for filter, keep matching elements; for take, slice to the limit. Return the pipeline object from each method to enable chaining.',
    resources: pipelineRes,
  },

  // 3. Class System (School hierarchy)
  {
    id: 1390,
    title: 'Class System',
    type: 'js',
    tier: 5,
    category: ['data-structures', 'class-hierarchy'],
    tags: ['classes', 'inheritance', 'hierarchy', 'school', 'interaction', 'oop'],
    description:
      'Design a school management system with interacting classes. Your solution should export the following constructors or classes: `School` takes a name, has methods `addDepartment(dept)`, `getDepartment(name)`, `getStats()` returning `{ departments, teachers, students }`; `Department` takes a name, has methods `addTeacher(teacher)`, `addStudent(student)`, `getTeachers()`, `getStudents()`; `Teacher` takes a name and subject; `Student` takes a name and grade (number). Teachers and students should have a `name` property. `School.getStats()` should aggregate counts across all departments.',
    starterCode: '',
    solution:
      'function Student(name, grade) {\n  this.name = name;\n  this.grade = grade;\n}\nfunction Teacher(name, subject) {\n  this.name = name;\n  this.subject = subject;\n}\nfunction Department(name) {\n  this.name = name;\n  this._teachers = [];\n  this._students = [];\n}\nDepartment.prototype.addTeacher = function(teacher) { this._teachers.push(teacher); };\nDepartment.prototype.addStudent = function(student) { this._students.push(student); };\nDepartment.prototype.getTeachers = function() { return this._teachers.slice(); };\nDepartment.prototype.getStudents = function() { return this._students.slice(); };\nfunction School(name) {\n  this.name = name;\n  this._departments = [];\n}\nSchool.prototype.addDepartment = function(dept) { this._departments.push(dept); };\nSchool.prototype.getDepartment = function(name) {\n  for (var i = 0; i < this._departments.length; i++) {\n    if (this._departments[i].name === name) return this._departments[i];\n  }\n  return null;\n};\nSchool.prototype.getStats = function() {\n  var teachers = 0, students = 0;\n  for (var i = 0; i < this._departments.length; i++) {\n    teachers += this._departments[i].getTeachers().length;\n    students += this._departments[i].getStudents().length;\n  }\n  return { departments: this._departments.length, teachers: teachers, students: students };\n};',
    testRunner: `(code) => {
  var ctx = new Function(code + '; return { School: School, Department: Department, Teacher: Teacher, Student: Student };')();
  var results = [];

  var school = new ctx.School('Lincoln High');
  results.push({ pass: school.name === 'Lincoln High', description: 'School has correct name property', got: school.name });

  var math = new ctx.Department('Math');
  var science = new ctx.Department('Science');
  school.addDepartment(math);
  school.addDepartment(science);
  results.push({ pass: school.getDepartment('Math') === math && school.getDepartment('Science') === science, description: 'getDepartment retrieves departments by name', got: String(school.getDepartment('Math') === math) });

  var t1 = new ctx.Teacher('Ms. Smith', 'Algebra');
  var t2 = new ctx.Teacher('Mr. Jones', 'Physics');
  math.addTeacher(t1);
  science.addTeacher(t2);
  results.push({ pass: math.getTeachers().length === 1 && math.getTeachers()[0].name === 'Ms. Smith', description: 'Department tracks teachers correctly', got: JSON.stringify(math.getTeachers().map(function(t) { return t.name; })) });

  var s1 = new ctx.Student('Alice', 10);
  var s2 = new ctx.Student('Bob', 11);
  var s3 = new ctx.Student('Charlie', 10);
  math.addStudent(s1);
  math.addStudent(s2);
  science.addStudent(s3);
  results.push({ pass: math.getStudents().length === 2 && science.getStudents().length === 1, description: 'Departments track students: Math=2, Science=1', got: 'Math=' + math.getStudents().length + ', Science=' + science.getStudents().length });

  var stats = school.getStats();
  results.push({ pass: stats.departments === 2 && stats.teachers === 2 && stats.students === 3, description: 'getStats aggregates: 2 departments, 2 teachers, 3 students', got: JSON.stringify(stats) });

  results.push({ pass: s1.name === 'Alice' && s1.grade === 10 && t1.subject === 'Algebra', description: 'Student and Teacher have correct properties', got: 'student=' + s1.name + '/' + s1.grade + ', teacher=' + t1.subject });

  results.push({ pass: school.getDepartment('English') === null, description: 'getDepartment returns null for non-existent department', got: String(school.getDepartment('English')) });

  var emptySchool = new ctx.School('Empty');
  var emptyStats = emptySchool.getStats();
  results.push({ pass: emptyStats.departments === 0 && emptyStats.teachers === 0 && emptyStats.students === 0, description: 'Empty school stats: all zeros', got: JSON.stringify(emptyStats) });

  return results;
}`,
    hint1:
      'Design four constructors (or classes): School, Department, Teacher, Student. Each stores its own data and has methods to manage relationships. School holds an array of departments, each department holds arrays of teachers and students. Think about how getStats walks through the hierarchy to count everything.',
    hint2:
      'School needs a departments array and methods to add/find departments. Department needs teacher and student arrays with add/get methods. Teacher and Student are simple with name and one other property. For getStats, loop through all departments and sum up the teacher and student counts from each.',
    resources: classRes,
  },

  // 4. Library System
  {
    id: 1391,
    title: 'Library System',
    type: 'js',
    tier: 5,
    category: ['data-structures', 'multi-class'],
    tags: ['classes', 'oop', 'library', 'borrow', 'return', 'search', 'overdue'],
    description:
      'Build a library management system that tracks books, members, and borrowing. Your solution should export the following constructors or classes: `Library` takes a name, has methods `addBook(book)`, `addMember(member)`, `search(query)` returning books whose title contains the query (case-insensitive), `getAvailableBooks()` returning books not currently borrowed; `Book` takes a title and author, starts as available; `Member` takes a name, has methods `borrow(book)` which marks the book as borrowed by this member (returns false if already borrowed), `return(book)` which returns the book (returns false if not borrowed by this member), `getBorrowed()` returning array of currently borrowed books.',
    starterCode: '',
    solution:
      'function Book(title, author) {\n  this.title = title;\n  this.author = author;\n  this.borrowedBy = null;\n}\nfunction Member(name) {\n  this.name = name;\n  this._borrowed = [];\n}\nMember.prototype.borrow = function(book) {\n  if (book.borrowedBy !== null) return false;\n  book.borrowedBy = this.name;\n  this._borrowed.push(book);\n  return true;\n};\nMember.prototype.return = function(book) {\n  if (book.borrowedBy !== this.name) return false;\n  book.borrowedBy = null;\n  this._borrowed = this._borrowed.filter(function(b) { return b !== book; });\n  return true;\n};\nMember.prototype.getBorrowed = function() { return this._borrowed.slice(); };\nfunction Library(name) {\n  this.name = name;\n  this._books = [];\n  this._members = [];\n}\nLibrary.prototype.addBook = function(book) { this._books.push(book); };\nLibrary.prototype.addMember = function(member) { this._members.push(member); };\nLibrary.prototype.search = function(query) {\n  var q = query.toLowerCase();\n  return this._books.filter(function(b) { return b.title.toLowerCase().indexOf(q) !== -1; });\n};\nLibrary.prototype.getAvailableBooks = function() {\n  return this._books.filter(function(b) { return b.borrowedBy === null; });\n};',
    testRunner: `(code) => {
  var ctx = new Function(code + '; return { Library: Library, Book: Book, Member: Member };')();
  var results = [];

  var lib = new ctx.Library('City Library');
  var b1 = new ctx.Book('JavaScript Basics', 'Smith');
  var b2 = new ctx.Book('Advanced CSS', 'Jones');
  var b3 = new ctx.Book('JavaScript Patterns', 'Wilson');
  lib.addBook(b1); lib.addBook(b2); lib.addBook(b3);
  results.push({ pass: lib.getAvailableBooks().length === 3, description: 'All 3 books initially available', got: String(lib.getAvailableBooks().length) });

  var m1 = new ctx.Member('Alice');
  lib.addMember(m1);
  var borrowed = m1.borrow(b1);
  results.push({ pass: borrowed === true && m1.getBorrowed().length === 1 && m1.getBorrowed()[0].title === 'JavaScript Basics', description: 'Alice borrows "JavaScript Basics" successfully', got: 'borrowed=' + borrowed + ', count=' + m1.getBorrowed().length });

  results.push({ pass: lib.getAvailableBooks().length === 2, description: 'After borrowing, only 2 books available', got: String(lib.getAvailableBooks().length) });

  var m2 = new ctx.Member('Bob');
  var doubleBorrow = m2.borrow(b1);
  results.push({ pass: doubleBorrow === false && b1.borrowedBy === 'Alice', description: 'Bob cannot borrow already-borrowed book (returns false)', got: 'result=' + doubleBorrow });

  var returned = m1.return(b1);
  results.push({ pass: returned === true && m1.getBorrowed().length === 0 && lib.getAvailableBooks().length === 3, description: 'Alice returns book — now 0 borrowed, 3 available', got: 'returned=' + returned + ', available=' + lib.getAvailableBooks().length });

  var wrongReturn = m2.return(b2);
  results.push({ pass: wrongReturn === false, description: 'Bob cannot return a book he did not borrow', got: String(wrongReturn) });

  var found = lib.search('javascript');
  results.push({ pass: found.length === 2 && found[0].title === 'JavaScript Basics' && found[1].title === 'JavaScript Patterns', description: 'search("javascript") finds 2 books (case-insensitive)', got: JSON.stringify(found.map(function(b) { return b.title; })) });

  var notFound = lib.search('python');
  results.push({ pass: notFound.length === 0, description: 'search("python") returns empty array', got: JSON.stringify(notFound) });

  return results;
}`,
    hint1:
      'Design three types: Book (title, author, borrowed status), Member (name, list of borrowed books with borrow/return methods), Library (name, collections of books and members with search and availability). A book knows who borrowed it, and a member knows what they have borrowed.',
    hint2:
      'Track borrowing state on the Book itself (e.g., a borrowedBy property). When a member borrows, check if the book is available first. For search, compare the query (lowercased) against each book title. For getAvailableBooks, filter for books with no borrower. Return boolean success indicators from borrow and return methods.',
    resources: libraryRes,
  },

  // 5. Dynamic Programming (Coin Change)
  {
    id: 1392,
    title: 'Dynamic Programming',
    type: 'js',
    tier: 5,
    category: ['algorithms', 'dynamic-programming'],
    tags: ['dp', 'coin-change', 'memoization', 'optimization', 'algorithm', 'tabulation'],
    description:
      'Solve the classic coin change problem efficiently. Your solution should export a function called `minCoins` that takes an array of coin denominations and a target amount, and returns the minimum number of coins needed to make that amount. If the amount cannot be made with the given coins, return -1. Your solution must handle large inputs efficiently — a brute-force recursive approach without optimization will be too slow. For example: `minCoins([1, 5, 10, 25], 30)` returns 2 (a quarter and a nickel).',
    starterCode: '',
    solution:
      'function minCoins(coins, amount) {\n  if (amount === 0) return 0;\n  var dp = new Array(amount + 1);\n  for (var i = 0; i <= amount; i++) dp[i] = amount + 1;\n  dp[0] = 0;\n  for (var i = 1; i <= amount; i++) {\n    for (var j = 0; j < coins.length; j++) {\n      if (coins[j] <= i) {\n        var prev = dp[i - coins[j]];\n        if (prev + 1 < dp[i]) dp[i] = prev + 1;\n      }\n    }\n  }\n  return dp[amount] > amount ? -1 : dp[amount];\n}',
    testRunner: `(code) => {
  var fn = new Function(code + '; return minCoins;')();
  var results = [];

  results.push({ pass: fn([1, 5, 10, 25], 30) === 2, description: 'minCoins([1,5,10,25], 30) = 2 (25+5)', got: String(fn([1, 5, 10, 25], 30)) });

  results.push({ pass: fn([1, 5, 10, 25], 11) === 2, description: 'minCoins([1,5,10,25], 11) = 2 (10+1)', got: String(fn([1, 5, 10, 25], 11)) });

  results.push({ pass: fn([2], 3) === -1, description: 'minCoins([2], 3) = -1 (impossible)', got: String(fn([2], 3)) });

  results.push({ pass: fn([1], 0) === 0, description: 'minCoins([1], 0) = 0 (no coins needed)', got: String(fn([1], 0)) });

  results.push({ pass: fn([1, 3, 4], 6) === 2, description: 'minCoins([1,3,4], 6) = 2 (3+3)', got: String(fn([1, 3, 4], 6)) });

  results.push({ pass: fn([1, 5, 10], 8) === 4, description: 'minCoins([1,5,10], 8) = 4 (5+1+1+1)', got: String(fn([1, 5, 10], 8)) });

  results.push({ pass: fn([7, 2, 3, 6], 13) === 2, description: 'minCoins([7,2,3,6], 13) = 2 (7+6)', got: String(fn([7, 2, 3, 6], 13)) });

  var start = Date.now();
  var large = fn([1, 5, 10, 25, 50], 9999);
  var elapsed = Date.now() - start;
  results.push({ pass: large === 206 && elapsed < 1000, description: 'Efficiency: minCoins([1,5,10,25,50], 9999) = 206 in under 1 second', got: 'result=' + large + ', time=' + elapsed + 'ms' });

  return results;
}`,
    hint1:
      'The brute-force approach tries every combination recursively and is far too slow for large amounts. Think about building up the answer from smaller sub-problems: if you know the minimum coins for every amount less than your target, you can find the answer for the target by trying each coin denomination.',
    hint2:
      'Create an array where each index represents an amount from 0 to the target. Initialize index 0 to 0 (zero coins needed for zero amount) and everything else to a large value. For each amount, try every coin that fits and check if using that coin gives a smaller count than what you have. This bottom-up approach avoids redundant computation.',
    resources: dpRes,
  },

  // 6. Test Framework
  {
    id: 1393,
    title: 'Test Framework',
    type: 'js',
    tier: 5,
    category: ['testing', 'test-framework'],
    tags: ['testing', 'describe', 'it', 'expect', 'matchers', 'framework', 'runner'],
    description:
      'Build a minimal test runner. Your solution should export a function called `createTestFramework` that returns an object with `describe(name, fn)`, `it(name, fn)`, `expect(value)`, and `run()`. `describe` groups tests and can be nested. `it` defines a test case. `expect` returns an object with matchers: `toBe(expected)` for strict equality, `toEqual(expected)` for deep equality (objects/arrays), and `toThrow()` which checks that the value (a function) throws an error. `run()` executes all registered tests and returns `{ passed: number, failed: number, results: [...] }` where each result has `{ name, passed, error }`. Failed matchers should throw descriptive errors. The `name` in results should include the describe context (e.g., "Math > addition > adds two numbers").',
    starterCode: '',
    solution:
      'function createTestFramework() {\n  var suites = [];\n  var currentSuite = null;\n  var framework = {\n    describe: function(name, fn) {\n      var parent = currentSuite;\n      var suite = { name: name, parent: parent, tests: [], children: [] };\n      if (parent) {\n        parent.children.push(suite);\n      } else {\n        suites.push(suite);\n      }\n      currentSuite = suite;\n      fn();\n      currentSuite = parent;\n    },\n    it: function(name, fn) {\n      if (currentSuite) {\n        currentSuite.tests.push({ name: name, fn: fn });\n      } else {\n        suites.push({ name: null, tests: [{ name: name, fn: fn }], children: [] });\n      }\n    },\n    expect: function(value) {\n      return {\n        toBe: function(expected) {\n          if (value !== expected) throw new Error("Expected " + JSON.stringify(expected) + " but got " + JSON.stringify(value));\n        },\n        toEqual: function(expected) {\n          if (JSON.stringify(value) !== JSON.stringify(expected)) throw new Error("Expected " + JSON.stringify(expected) + " but got " + JSON.stringify(value));\n        },\n        toThrow: function() {\n          var threw = false;\n          try { value(); } catch(e) { threw = true; }\n          if (!threw) throw new Error("Expected function to throw");\n        }\n      };\n    },\n    run: function() {\n      var passed = 0;\n      var failed = 0;\n      var results = [];\n      function getPath(suite) {\n        var parts = [];\n        var s = suite;\n        while (s && s.name) {\n          parts.unshift(s.name);\n          s = s.parent;\n        }\n        return parts;\n      }\n      function runSuite(suite) {\n        var path = getPath(suite);\n        for (var i = 0; i < suite.tests.length; i++) {\n          var test = suite.tests[i];\n          var fullName = path.concat([test.name]).join(" > ");\n          try {\n            test.fn();\n            passed++;\n            results.push({ name: fullName, passed: true, error: null });\n          } catch(e) {\n            failed++;\n            results.push({ name: fullName, passed: false, error: e.message });\n          }\n        }\n        for (var i = 0; i < suite.children.length; i++) {\n          runSuite(suite.children[i]);\n        }\n      }\n      for (var i = 0; i < suites.length; i++) {\n        runSuite(suites[i]);\n      }\n      return { passed: passed, failed: failed, results: results };\n    }\n  };\n  return framework;\n}',
    testRunner: `(code) => {
  var fn = new Function(code + '; return createTestFramework;')();
  var results = [];

  var t = fn();
  t.describe('Math', function() {
    t.it('adds numbers', function() { t.expect(1 + 1).toBe(2); });
    t.it('subtracts numbers', function() { t.expect(5 - 3).toBe(2); });
  });
  var r1 = t.run();
  results.push({ pass: r1.passed === 2 && r1.failed === 0 && r1.results.length === 2, description: 'Two passing tests: passed=2, failed=0', got: 'passed=' + r1.passed + ', failed=' + r1.failed });

  var t2 = fn();
  t2.describe('Math', function() {
    t2.it('fails', function() { t2.expect(1).toBe(2); });
  });
  var r2 = t2.run();
  results.push({ pass: r2.failed === 1 && r2.results[0].passed === false && r2.results[0].error !== null, description: 'Failed toBe matcher records error', got: 'failed=' + r2.failed + ', error=' + r2.results[0].error });

  var t3 = fn();
  t3.describe('Arrays', function() {
    t3.it('deep equals', function() { t3.expect([1, 2, 3]).toEqual([1, 2, 3]); });
    t3.it('deep fails', function() { t3.expect({ a: 1 }).toEqual({ a: 2 }); });
  });
  var r3 = t3.run();
  results.push({ pass: r3.passed === 1 && r3.failed === 1, description: 'toEqual: [1,2,3] passes, {a:1} vs {a:2} fails', got: 'passed=' + r3.passed + ', failed=' + r3.failed });

  var t4 = fn();
  t4.describe('Errors', function() {
    t4.it('catches throw', function() { t4.expect(function() { throw new Error('x'); }).toThrow(); });
    t4.it('fails when no throw', function() { t4.expect(function() {}).toThrow(); });
  });
  var r4 = t4.run();
  results.push({ pass: r4.passed === 1 && r4.failed === 1, description: 'toThrow: throwing fn passes, non-throwing fn fails', got: 'passed=' + r4.passed + ', failed=' + r4.failed });

  var t5 = fn();
  t5.describe('Outer', function() {
    t5.describe('Inner', function() {
      t5.it('nested test', function() { t5.expect(true).toBe(true); });
    });
  });
  var r5 = t5.run();
  results.push({ pass: r5.results[0].name === 'Outer > Inner > nested test', description: 'Nested describe: name = "Outer > Inner > nested test"', got: r5.results[0].name });

  var t6 = fn();
  t6.describe('Suite', function() {
    t6.it('pass1', function() { t6.expect(1).toBe(1); });
    t6.it('pass2', function() { t6.expect(2).toBe(2); });
    t6.it('fail1', function() { t6.expect(3).toBe(4); });
  });
  var r6 = t6.run();
  var summary = r6.passed + r6.failed;
  results.push({ pass: summary === 3 && r6.passed === 2 && r6.failed === 1, description: 'Summary: 2 passed + 1 failed = 3 total', got: 'passed=' + r6.passed + ', failed=' + r6.failed });

  results.push({ pass: r6.results[0].name === 'Suite > pass1' && r6.results[2].name === 'Suite > fail1', description: 'Results include describe context in names', got: r6.results[0].name + ', ' + r6.results[2].name });

  var t7 = fn();
  var r7 = t7.run();
  results.push({ pass: r7.passed === 0 && r7.failed === 0 && r7.results.length === 0, description: 'Empty framework run returns zeros', got: JSON.stringify(r7) });

  return results;
}`,
    hint1:
      'Track the current describe context so that when it() is called, you know which suite the test belongs to. Describe blocks can nest, so maintain a reference to the current suite and its parent. The expect function returns an object whose matcher methods throw errors on failure — the it() function catches these errors to determine pass/fail.',
    hint2:
      'Use a tree structure: each describe creates a suite node with tests and children. Keep a currentSuite pointer that updates as describe blocks nest. In run(), traverse the tree, building the full name path (joining with " > "). For each test, call its function in a try/catch — no error means pass, caught error means fail. Count totals and collect results.',
    resources: testFrameRes,
  },

  // 7. RPG Combat System
  {
    id: 1394,
    title: 'RPG Combat System',
    type: 'js',
    tier: 5,
    category: ['capstone', 'rpg-combat'],
    tags: ['classes', 'oop', 'rpg', 'combat', 'status-effects', 'game', 'capstone'],
    description:
      'Build a turn-based RPG combat system. Your solution should export the following constructors or classes: `Fighter` takes a name, hp (number), and attack (number), has methods `isAlive()` returning true if hp > 0, `takeDamage(amount)` reducing hp (minimum 0), `applyEffect(effect)` adding a status effect, `processEffects()` applying all active effects and decrementing their durations; `StatusEffect` takes a name, duration (number of turns), and an `apply` function that receives the fighter; `Battle` takes two fighters, has method `playRound()` where fighter1 attacks fighter2 then fighter2 attacks fighter1 (if still alive), processing effects at the start of each fighter\'s turn — returns `{ attacker, defender, damage }` entries for the round, and `getWinner()` returning the winning fighter or null if both alive.',
    starterCode: '',
    solution:
      'function StatusEffect(name, duration, apply) {\n  this.name = name;\n  this.duration = duration;\n  this.apply = apply;\n}\nfunction Fighter(name, hp, attack) {\n  this.name = name;\n  this.hp = hp;\n  this.maxHp = hp;\n  this.attack = attack;\n  this.effects = [];\n}\nFighter.prototype.isAlive = function() { return this.hp > 0; };\nFighter.prototype.takeDamage = function(amount) {\n  this.hp -= amount;\n  if (this.hp < 0) this.hp = 0;\n};\nFighter.prototype.applyEffect = function(effect) {\n  this.effects.push({ name: effect.name, duration: effect.duration, apply: effect.apply });\n};\nFighter.prototype.processEffects = function() {\n  var remaining = [];\n  for (var i = 0; i < this.effects.length; i++) {\n    var eff = this.effects[i];\n    eff.apply(this);\n    eff.duration--;\n    if (eff.duration > 0) remaining.push(eff);\n  }\n  this.effects = remaining;\n};\nfunction Battle(fighter1, fighter2) {\n  this.fighter1 = fighter1;\n  this.fighter2 = fighter2;\n}\nBattle.prototype.playRound = function() {\n  var log = [];\n  if (this.fighter1.isAlive()) {\n    this.fighter1.processEffects();\n    if (this.fighter1.isAlive()) {\n      var dmg1 = this.fighter1.attack;\n      this.fighter2.takeDamage(dmg1);\n      log.push({ attacker: this.fighter1.name, defender: this.fighter2.name, damage: dmg1 });\n    }\n  }\n  if (this.fighter2.isAlive()) {\n    this.fighter2.processEffects();\n    if (this.fighter2.isAlive()) {\n      var dmg2 = this.fighter2.attack;\n      this.fighter1.takeDamage(dmg2);\n      log.push({ attacker: this.fighter2.name, defender: this.fighter1.name, damage: dmg2 });\n    }\n  }\n  return log;\n};\nBattle.prototype.getWinner = function() {\n  if (!this.fighter1.isAlive() && !this.fighter2.isAlive()) return null;\n  if (!this.fighter1.isAlive()) return this.fighter2;\n  if (!this.fighter2.isAlive()) return this.fighter1;\n  return null;\n};',
    testRunner: `(code) => {
  var ctx = new Function(code + '; return { Fighter: Fighter, StatusEffect: StatusEffect, Battle: Battle };')();
  var results = [];

  var f1 = new ctx.Fighter('Warrior', 100, 25);
  var f2 = new ctx.Fighter('Mage', 80, 30);
  results.push({ pass: f1.isAlive() && f1.hp === 100 && f1.attack === 25, description: 'Fighter created with correct name, hp, attack', got: f1.name + ' hp=' + f1.hp + ' atk=' + f1.attack });

  var battle = new ctx.Battle(f1, f2);
  var round1 = battle.playRound();
  results.push({ pass: round1.length === 2 && round1[0].attacker === 'Warrior' && round1[0].damage === 25 && f2.hp === 55, description: 'Round 1: Warrior deals 25 to Mage (hp 80→55), Mage deals 30 to Warrior', got: JSON.stringify(round1) });

  results.push({ pass: f1.hp === 70 && f2.hp === 55, description: 'After round 1: Warrior=70hp, Mage=55hp', got: 'W=' + f1.hp + ', M=' + f2.hp });

  results.push({ pass: battle.getWinner() === null, description: 'No winner yet — both alive', got: String(battle.getWinner()) });

  var f3 = new ctx.Fighter('Tank', 50, 60);
  var f4 = new ctx.Fighter('Glass', 30, 10);
  var b2 = new ctx.Battle(f3, f4);
  b2.playRound();
  results.push({ pass: f4.hp === 0 && !f4.isAlive() && b2.getWinner() === f3, description: 'One-shot KO: Tank kills Glass in one hit, wins', got: 'Glass hp=' + f4.hp + ', winner=' + (b2.getWinner() ? b2.getWinner().name : 'null') });

  var f5 = new ctx.Fighter('Hero', 100, 20);
  var poison = new ctx.StatusEffect('Poison', 3, function(fighter) { fighter.takeDamage(5); });
  f5.applyEffect(poison);
  f5.processEffects();
  results.push({ pass: f5.hp === 95 && f5.effects.length === 1 && f5.effects[0].duration === 2, description: 'Poison deals 5 damage, duration decreases 3→2', got: 'hp=' + f5.hp + ', dur=' + f5.effects[0].duration });

  f5.processEffects();
  f5.processEffects();
  results.push({ pass: f5.hp === 85 && f5.effects.length === 0, description: 'After 3 total ticks: hp=85, poison expired', got: 'hp=' + f5.hp + ', effects=' + f5.effects.length });

  var f6 = new ctx.Fighter('A', 50, 10);
  var f7 = new ctx.Fighter('B', 50, 10);
  var burn = new ctx.StatusEffect('Burn', 2, function(fighter) { fighter.takeDamage(8); });
  f6.applyEffect(burn);
  var b3 = new ctx.Battle(f6, f7);
  var r = b3.playRound();
  results.push({ pass: f6.hp === 32 && r[0].attacker === 'A', description: 'Burn processes before attack: A takes 8 burn then B deals 10, A=32hp', got: 'A hp=' + f6.hp });

  return results;
}`,
    hint1:
      'Design three types: Fighter holds stats and a list of active status effects. StatusEffect is a simple data holder with a name, remaining duration, and an apply function. Battle orchestrates rounds by having each fighter process their effects, then attack the opponent if still alive. Track the combat log as an array of attack entries.',
    hint2:
      'In processEffects, loop through effects, call each one\'s apply function passing the fighter, decrement duration, and remove expired effects. In playRound, process effects for fighter1 first, then fighter1 attacks fighter2 if alive, then do the same for fighter2. getWinner checks who is still alive — return null if both are alive or both are dead.',
    resources: rpgRes,
  },

  // 8. Markdown Parser
  {
    id: 1395,
    title: 'Markdown Parser',
    type: 'js',
    tier: 5,
    category: ['capstone', 'markdown-parser'],
    tags: ['regex', 'parsing', 'markdown', 'html', 'string', 'capstone'],
    description:
      'Convert a subset of Markdown to HTML. Your solution should export a function called `parseMarkdown` that takes a Markdown string and returns an HTML string. Support these elements: headings (`# H1` through `### H3` become `<h1>` through `<h3>`), bold (`**text**` becomes `<strong>text</strong>`), italic (`*text*` becomes `<em>text</em>`), inline code (`` `code` `` becomes `<code>code</code>`), links (`[text](url)` becomes `<a href="url">text</a>`), unordered lists (lines starting with `- ` wrapped in `<ul><li>...</li></ul>`), and plain paragraphs (non-special lines wrapped in `<p>...</p>`). Process the input line by line. Consecutive list items should be grouped in a single `<ul>` block.',
    starterCode: '',
    solution:
      'function parseMarkdown(md) {\n  var lines = md.split("\\n");\n  var html = [];\n  var inList = false;\n  for (var i = 0; i < lines.length; i++) {\n    var line = lines[i];\n    if (line.match(/^### /)) {\n      if (inList) { html.push("</ul>"); inList = false; }\n      html.push("<h3>" + inline(line.slice(4)) + "</h3>");\n    } else if (line.match(/^## /)) {\n      if (inList) { html.push("</ul>"); inList = false; }\n      html.push("<h2>" + inline(line.slice(3)) + "</h2>");\n    } else if (line.match(/^# /)) {\n      if (inList) { html.push("</ul>"); inList = false; }\n      html.push("<h1>" + inline(line.slice(2)) + "</h1>");\n    } else if (line.match(/^- /)) {\n      if (!inList) { html.push("<ul>"); inList = true; }\n      html.push("<li>" + inline(line.slice(2)) + "</li>");\n    } else if (line.trim() === "") {\n      if (inList) { html.push("</ul>"); inList = false; }\n    } else {\n      if (inList) { html.push("</ul>"); inList = false; }\n      html.push("<p>" + inline(line) + "</p>");\n    }\n  }\n  if (inList) html.push("</ul>");\n  return html.join("\\n");\n  function inline(text) {\n    text = text.replace(/`([^`]+)`/g, "<code>$1</code>");\n    text = text.replace(/\\*\\*([^*]+)\\*\\*/g, "<strong>$1</strong>");\n    text = text.replace(/\\*([^*]+)\\*/g, "<em>$1</em>");\n    text = text.replace(/\\[([^\\]]+)\\]\\(([^)]+)\\)/g, \'<a href="$2">$1</a>\');\n    return text;\n  }\n}',
    testRunner: `(code) => {
  var fn = new Function(code + '; return parseMarkdown;')();
  var results = [];

  results.push({ pass: fn('# Hello').indexOf('<h1>Hello</h1>') !== -1, description: '# Hello → <h1>Hello</h1>', got: fn('# Hello') });

  results.push({ pass: fn('## Sub').indexOf('<h2>Sub</h2>') !== -1 && fn('### Third').indexOf('<h3>Third</h3>') !== -1, description: '## and ### produce <h2> and <h3>', got: fn('## Sub') + ' | ' + fn('### Third') });

  results.push({ pass: fn('**bold**').indexOf('<strong>bold</strong>') !== -1, description: '**bold** → <strong>bold</strong>', got: fn('**bold**') });

  results.push({ pass: fn('*italic*').indexOf('<em>italic</em>') !== -1, description: '*italic* → <em>italic</em>', got: fn('*italic*') });

  var codeResult = fn('Use \x60code\x60 here');
  results.push({ pass: codeResult.indexOf('<code>code</code>') !== -1, description: 'Inline code with backticks produces <code>code</code>', got: codeResult });

  results.push({ pass: fn('[Click](http://example.com)').indexOf('<a href="http://example.com">Click</a>') !== -1, description: '[Click](url) → <a href="url">Click</a>', got: fn('[Click](http://example.com)') });

  var listMd = '- Apple\\n- Banana\\n- Cherry';
  var listHtml = fn(listMd);
  results.push({ pass: listHtml.indexOf('<ul>') !== -1 && listHtml.indexOf('<li>Apple</li>') !== -1 && listHtml.indexOf('<li>Cherry</li>') !== -1 && listHtml.indexOf('</ul>') !== -1, description: 'List items grouped in <ul> with <li> each', got: listHtml });

  var mixed = '# Title\\nSome **bold** and *italic* text\\n- Item 1\\n- Item 2';
  var mixedHtml = fn(mixed);
  results.push({ pass: mixedHtml.indexOf('<h1>Title</h1>') !== -1 && mixedHtml.indexOf('<strong>bold</strong>') !== -1 && mixedHtml.indexOf('<em>italic</em>') !== -1 && mixedHtml.indexOf('<li>Item 1</li>') !== -1, description: 'Mixed content: heading, inline formatting, and list all parsed', got: mixedHtml });

  return results;
}`,
    hint1:
      'Process the input line by line. Identify each line as a heading (starts with #), list item (starts with -), blank, or paragraph. For inline formatting, apply regex replacements for bold, italic, code, and links. Be careful to process bold before italic so that double asterisks are matched first.',
    hint2:
      'Split on newlines. Track whether you are inside a list block. When a list item appears, open a <ul> tag if not already in one; when a non-list line appears, close any open <ul>. For inline processing, use regex replace in this order: backtick code first (to protect it from other replacements), then bold (**), then italic (*), then links. Join all output lines at the end.',
    resources: markdownRes,
  },

  // 9. Social Feed
  {
    id: 1396,
    title: 'Social Feed',
    type: 'js',
    tier: 5,
    category: ['capstone', 'social-feed'],
    tags: ['classes', 'oop', 'social', 'feed', 'posts', 'likes', 'comments', 'capstone'],
    description:
      'Build a social media feed system. Your solution should export the following constructors or classes: `SocialFeed` has methods `addUser(user)`, `createPost(userName, content)` returning the new post, and `getFeed()` returning all posts sorted by engagement score descending (score = likes + comments count); `User` takes a name, has methods `like(post)` (cannot like same post twice, returns false if already liked), `comment(post, text)` adding a comment; `Post` is created with an author name and content, tracks likes (count) and comments (array of `{ author, text }`), has a `getScore()` method returning likes + number of comments.',
    starterCode: '',
    solution:
      'function Post(author, content) {\n  this.author = author;\n  this.content = content;\n  this.likes = 0;\n  this.likedBy = [];\n  this.comments = [];\n}\nPost.prototype.getScore = function() { return this.likes + this.comments.length; };\nfunction User(name) {\n  this.name = name;\n}\nUser.prototype.like = function(post) {\n  if (post.likedBy.indexOf(this.name) !== -1) return false;\n  post.likedBy.push(this.name);\n  post.likes++;\n  return true;\n};\nUser.prototype.comment = function(post, text) {\n  post.comments.push({ author: this.name, text: text });\n};\nfunction SocialFeed() {\n  this._users = [];\n  this._posts = [];\n}\nSocialFeed.prototype.addUser = function(user) { this._users.push(user); };\nSocialFeed.prototype.createPost = function(userName, content) {\n  var post = new Post(userName, content);\n  this._posts.push(post);\n  return post;\n};\nSocialFeed.prototype.getFeed = function() {\n  return this._posts.slice().sort(function(a, b) { return b.getScore() - a.getScore(); });\n};',
    testRunner: `(code) => {
  var ctx = new Function(code + '; return { SocialFeed: SocialFeed, User: User, Post: Post };')();
  var results = [];

  var feed = new ctx.SocialFeed();
  var alice = new ctx.User('Alice');
  var bob = new ctx.User('Bob');
  feed.addUser(alice);
  feed.addUser(bob);
  var p1 = feed.createPost('Alice', 'Hello world');
  results.push({ pass: p1.author === 'Alice' && p1.content === 'Hello world' && p1.likes === 0, description: 'Post created with author, content, 0 likes', got: 'author=' + p1.author + ', likes=' + p1.likes });

  var liked = alice.like(p1);
  results.push({ pass: liked === true && p1.likes === 1, description: 'Alice likes post: likes=1, returns true', got: 'liked=' + liked + ', likes=' + p1.likes });

  var doubleLike = alice.like(p1);
  results.push({ pass: doubleLike === false && p1.likes === 1, description: 'Alice cannot like same post twice: returns false, likes still 1', got: 'result=' + doubleLike + ', likes=' + p1.likes });

  bob.like(p1);
  bob.comment(p1, 'Great post!');
  results.push({ pass: p1.likes === 2 && p1.comments.length === 1 && p1.comments[0].author === 'Bob' && p1.comments[0].text === 'Great post!', description: 'Bob likes and comments: 2 likes, 1 comment by Bob', got: 'likes=' + p1.likes + ', comments=' + JSON.stringify(p1.comments) });

  results.push({ pass: p1.getScore() === 3, description: 'Post score = likes(2) + comments(1) = 3', got: String(p1.getScore()) });

  var p2 = feed.createPost('Bob', 'Another post');
  alice.like(p2);
  alice.comment(p2, 'Nice');
  bob.comment(p2, 'Thanks');
  alice.comment(p2, 'Welcome');
  var sorted = feed.getFeed();
  results.push({ pass: sorted[0] === p2 && sorted[1] === p1, description: 'getFeed sorts by score: p2(score 4) before p1(score 3)', got: sorted.map(function(p) { return p.content + '(' + p.getScore() + ')'; }).join(', ') });

  var p3 = feed.createPost('Alice', 'No engagement');
  var sorted2 = feed.getFeed();
  results.push({ pass: sorted2[sorted2.length - 1] === p3 && sorted2[sorted2.length - 1].getScore() === 0, description: 'Post with no engagement has score 0, appears last', got: 'last=' + sorted2[sorted2.length - 1].content + ', score=' + sorted2[sorted2.length - 1].getScore() });

  var emptyFeed = new ctx.SocialFeed();
  results.push({ pass: emptyFeed.getFeed().length === 0, description: 'Empty feed returns empty array', got: String(emptyFeed.getFeed().length) });

  return results;
}`,
    hint1:
      'Design three types: Post stores content, like count, list of who liked it, and comments. User has a name and can like or comment on posts. SocialFeed manages users and posts and provides a sorted feed. To prevent double-liking, track which users have liked each post.',
    hint2:
      'On Post, keep a likedBy array and a comments array. When a user likes, check if their name is already in likedBy before incrementing. For getFeed, copy the posts array and sort by getScore() descending. getScore returns the sum of likes and comments length. Comments are objects with author and text properties.',
    resources: socialRes,
  },

  // 10. Regex Engine
  {
    id: 1397,
    title: 'Regex Engine',
    type: 'js',
    tier: 5,
    category: ['capstone', 'regex-engine'],
    tags: ['regex', 'parsing', 'matching', 'state-machine', 'algorithm', 'capstone'],
    description:
      'Build a simplified regular expression matcher. Your solution should export a function called `matchPattern` that takes a pattern string and a text string, and returns true if the pattern matches the entire text. Support these features: literal characters match themselves, `.` matches any single character, `*` means zero or more of the preceding element, `+` means one or more of the preceding element, `?` means zero or one of the preceding element, `^` at the start anchors to the beginning, `$` at the end anchors to the end, and character classes like `[abc]` matching any single character in the set. If the pattern has no `^` anchor, it can match anywhere in the text. If it has no `$` anchor, the match does not need to reach the end.',
    starterCode: '',
    solution:
      'function matchPattern(pattern, text) {\n  var hasStart = pattern.charAt(0) === "^";\n  var hasEnd = pattern.charAt(pattern.length - 1) === "$";\n  var pat = pattern;\n  if (hasStart) pat = pat.slice(1);\n  if (hasEnd) pat = pat.slice(0, -1);\n  var tokens = tokenize(pat);\n  if (hasStart && hasEnd) {\n    return matchHere(tokens, 0, text, 0, text.length);\n  } else if (hasStart) {\n    for (var end = 0; end <= text.length; end++) {\n      if (matchHere(tokens, 0, text, 0, end)) return true;\n    }\n    return false;\n  } else if (hasEnd) {\n    for (var start = 0; start <= text.length; start++) {\n      if (matchHere(tokens, 0, text, start, text.length)) return true;\n    }\n    return false;\n  } else {\n    for (var start = 0; start <= text.length; start++) {\n      for (var end = start; end <= text.length; end++) {\n        if (matchHere(tokens, 0, text, start, end)) return true;\n      }\n    }\n    return false;\n  }\n  function tokenize(p) {\n    var toks = [];\n    var i = 0;\n    while (i < p.length) {\n      if (p[i] === "[") {\n        var j = p.indexOf("]", i);\n        var chars = p.slice(i + 1, j);\n        i = j + 1;\n        var quant = null;\n        if (i < p.length && (p[i] === "*" || p[i] === "+" || p[i] === "?")) { quant = p[i]; i++; }\n        toks.push({ type: "class", chars: chars, quant: quant });\n      } else if (p[i] === ".") {\n        i++;\n        var quant = null;\n        if (i < p.length && (p[i] === "*" || p[i] === "+" || p[i] === "?")) { quant = p[i]; i++; }\n        toks.push({ type: "dot", quant: quant });\n      } else {\n        var ch = p[i]; i++;\n        var quant = null;\n        if (i < p.length && (p[i] === "*" || p[i] === "+" || p[i] === "?")) { quant = p[i]; i++; }\n        toks.push({ type: "lit", ch: ch, quant: quant });\n      }\n    }\n    return toks;\n  }\n  function charMatches(tok, ch) {\n    if (tok.type === "dot") return true;\n    if (tok.type === "lit") return tok.ch === ch;\n    if (tok.type === "class") return tok.chars.indexOf(ch) !== -1;\n    return false;\n  }\n  function matchHere(toks, ti, txt, si, end) {\n    if (ti === toks.length) return si === end;\n    var tok = toks[ti];\n    if (tok.quant === "*") {\n      for (var count = 0; si + count <= end; count++) {\n        if (count > 0 && !charMatches(tok, txt[si + count - 1])) break;\n        if (matchHere(toks, ti + 1, txt, si + count, end)) return true;\n      }\n      return false;\n    } else if (tok.quant === "+") {\n      for (var count = 1; si + count <= end; count++) {\n        if (!charMatches(tok, txt[si + count - 1])) break;\n        if (matchHere(toks, ti + 1, txt, si + count, end)) return true;\n      }\n      return false;\n    } else if (tok.quant === "?") {\n      if (matchHere(toks, ti + 1, txt, si, end)) return true;\n      if (si < end && charMatches(tok, txt[si]) && matchHere(toks, ti + 1, txt, si + 1, end)) return true;\n      return false;\n    } else {\n      if (si >= end) return false;\n      if (!charMatches(tok, txt[si])) return false;\n      return matchHere(toks, ti + 1, txt, si + 1, end);\n    }\n  }\n}',
    testRunner: `(code) => {
  var fn = new Function(code + '; return matchPattern;')();
  var results = [];

  results.push({ pass: fn('^hello$', 'hello') === true, description: '^hello$ matches "hello" exactly', got: String(fn('^hello$', 'hello')) });

  results.push({ pass: fn('^hello$', 'hello world') === false, description: '^hello$ does not match "hello world"', got: String(fn('^hello$', 'hello world')) });

  results.push({ pass: fn('h.llo', 'hello') === true && fn('h.llo', 'hxllo') === true, description: 'Dot matches any character: h.llo matches hello and hxllo', got: fn('h.llo', 'hello') + ', ' + fn('h.llo', 'hxllo') });

  results.push({ pass: fn('^ab*c$', 'ac') === true && fn('^ab*c$', 'abbc') === true && fn('^ab*c$', 'abc') === true, description: 'Star: ab*c matches ac, abc, abbc', got: fn('^ab*c$', 'ac') + ',' + fn('^ab*c$', 'abbc') + ',' + fn('^ab*c$', 'abc') });

  results.push({ pass: fn('^ab+c$', 'abc') === true && fn('^ab+c$', 'abbc') === true && fn('^ab+c$', 'ac') === false, description: 'Plus: ab+c matches abc, abbc but not ac', got: fn('^ab+c$', 'abc') + ',' + fn('^ab+c$', 'abbc') + ',' + fn('^ab+c$', 'ac') });

  results.push({ pass: fn('^colou?r$', 'color') === true && fn('^colou?r$', 'colour') === true && fn('^colou?r$', 'colouur') === false, description: 'Question: colou?r matches color and colour but not colouur', got: fn('^colou?r$', 'color') + ',' + fn('^colou?r$', 'colour') + ',' + fn('^colou?r$', 'colouur') });

  results.push({ pass: fn('^[abc]+$', 'abcba') === true && fn('^[abc]+$', 'abcd') === false, description: 'Character class: [abc]+ matches abcba, not abcd', got: fn('^[abc]+$', 'abcba') + ',' + fn('^[abc]+$', 'abcd') });

  results.push({ pass: fn('world', 'hello world') === true && fn('^world', 'hello world') === false, description: 'Unanchored "world" found in "hello world", ^world does not match', got: fn('world', 'hello world') + ',' + fn('^world', 'hello world') });

  return results;
}`,
    hint1:
      'Break this into two problems: first, tokenize the pattern into a list of elements (literal, dot, character class) each with an optional quantifier (*, +, ?). Second, write a recursive matcher that tries to match each token against the text at the current position, handling quantifiers by trying different numbers of repetitions.',
    hint2:
      'For tokenizing, walk through the pattern character by character. When you see [ read until ]. After any element, check if the next character is a quantifier. For matching, handle each quantifier: * tries 0 to many matches, + tries 1 to many, ? tries 0 or 1. For unanchored patterns, try starting the match at each position in the text. Use recursion: after consuming characters for the current token, recurse on the remaining tokens and text.',
    resources: regexEngineRes,
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
        console.log(`  ✓ [${ex.id}] ${ex.title} (${results.length} tests)`);
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
    `T5 Mastercraft Exercises: ${exercises.length} exercises (IDs ${exercises[0].id}-${exercises[exercises.length - 1].id})`
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
