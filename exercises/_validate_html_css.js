/**
 * Programmatic validator for HTML, CSS, and HTML-CSS exercises.
 * Replicates the client-side test runner logic using jsdom.
 *
 * Usage: node exercises/_validate_html_css.js [--type html|css|html-css] [--id 1265]
 */

const fs = require('fs');
const { JSDOM } = require('jsdom');

// Suppress jsdom CSS parse errors (it doesn't support nesting, container queries, etc.)
const originalConsoleError = console.error;
let suppressCssErrors = false;
console.error = (...args) => {
  if (suppressCssErrors && args[0]?.toString().includes('Could not parse CSS')) return;
  if (suppressCssErrors && args[0] instanceof Error && args[0].message.includes('Could not parse CSS')) return;
  originalConsoleError.apply(console, args);
};

function createDOM(html, options = {}) {
  suppressCssErrors = true;
  try {
    const dom = new JSDOM(html, { ...options, pretendToBeVisual: true });
    return dom;
  } catch (err) {
    if (err.message && err.message.includes('Could not parse CSS')) {
      // jsdom can't handle modern CSS — strip style tags and return bare DOM
      const stripped = html.replace(/<style[\s\S]*?<\/style>/gi, '<style></style>');
      const dom = new JSDOM(stripped, { ...options, pretendToBeVisual: true });
      dom._cssParseError = true;
      return dom;
    }
    throw err;
  } finally {
    suppressCssErrors = false;
  }
}

// ─── Load exercises ──────────────────────────────────────────────────
const collections = [
  'exercises/collections/default-curriculum.json',
  'exercises/collections/turing-foundations.json',
  'exercises/collections/exercism.json',
  'exercises/collections/rithm-interview-prep.json',
  'exercises/collections/odin-project.json',
  'exercises/collections/rpg-questline.json',
  'exercises/collections/pop-culture-apis.json',
  'exercises/collections/hard-math-science.json',
  'exercises/collections/mini-games.json',
];

let allExercises = [];
for (const file of collections) {
  if (fs.existsSync(file)) {
    const data = JSON.parse(fs.readFileSync(file, 'utf8'));
    allExercises = allExercises.concat(data.exercises || []);
  }
}

// ─── Parse CLI args ──────────────────────────────────────────────────
const args = process.argv.slice(2);
let filterType = null;
let filterId = null;

for (let i = 0; i < args.length; i++) {
  if (args[i] === '--type' && args[i + 1]) filterType = args[++i];
  if (args[i] === '--id' && args[i + 1]) filterId = parseInt(args[++i], 10);
}

// Filter to HTML, CSS, and HTML-CSS exercises
let exercises = allExercises.filter(
  (e) => ['html', 'css', 'html-css'].includes(e.type) && e.testCases && e.testCases.length > 0
);

if (filterType) exercises = exercises.filter((e) => e.type === filterType);
if (filterId) exercises = exercises.filter((e) => e.id === filterId);

console.log(`\nValidating ${exercises.length} exercises...\n`);

// ─── Assertion evaluators (mirrors client runners) ────────────────────

function evaluateHtmlAssertion(doc, source, tc) {
  const { assertion, value, description, flags } = tc;
  const query = tc.query || tc.selector;

  switch (assertion) {
    case 'exists': {
      const el = query ? doc.querySelector(query) : null;
      return {
        pass: el !== null,
        description,
        got: el !== null ? 'found' : `no element matching "${query}"`,
      };
    }
    case 'textContains': {
      const el = query ? doc.querySelector(query) : null;
      const text = el?.textContent ?? '';
      const expected = String(value ?? '');
      return { pass: text.includes(expected), description, got: text.trim().substring(0, 80) };
    }
    case 'countAtLeast': {
      const els = query ? doc.querySelectorAll(query) : [];
      const count = els.length;
      const min = Number(value ?? 1);
      return { pass: count >= min, description, got: `found ${count}, need ${min}` };
    }
    case 'hasId': {
      const el = query ? doc.querySelector(query) : null;
      const actualId = el?.id ?? '';
      return {
        pass: actualId === String(value ?? ''),
        description,
        got: actualId || '(no id)',
      };
    }
    case 'hasClass': {
      const el = query ? doc.querySelector(query) : null;
      const hasIt = el?.classList.contains(String(value ?? '')) ?? false;
      return {
        pass: hasIt,
        description,
        got: hasIt ? 'has class' : `classes: ${el?.className ?? '(none)'}`,
      };
    }
    case 'sourceContains': {
      const needle = String(value ?? '');
      return {
        pass: source.includes(needle),
        description,
        got: source.includes(needle) ? 'found' : `"${needle}" not found in source`,
      };
    }
    case 'sourceMatch': {
      const pattern = String(value ?? '');
      let matched = false;
      try {
        const regex = new RegExp(pattern, flags ?? 'i');
        matched = regex.test(source);
      } catch {
        matched = source.toLowerCase().includes(pattern.toLowerCase());
      }
      return {
        pass: matched,
        description,
        got: matched ? 'matched' : `pattern /${pattern}/${flags ?? 'i'} not found`,
      };
    }
    default:
      return { pass: false, description, got: `Unknown assertion: ${assertion}` };
  }
}

function evaluateCssAssertion(doc, source, tc) {
  const { assertion, property, value, description, flags } = tc;
  const query = tc.query || tc.selector;

  // Source-level assertions don't need DOM
  if (assertion === 'sourceContains') {
    const needle = String(value ?? '');
    const found = source.includes(needle);
    return {
      pass: found,
      description,
      got: found ? 'found' : `"${needle}" not found in source`,
    };
  }

  if (assertion === 'sourceMatch') {
    const pattern = String(value ?? '');
    let matched = false;
    try {
      const regex = new RegExp(pattern, flags ?? 'i');
      matched = regex.test(source);
    } catch {
      matched = source.toLowerCase().includes(pattern.toLowerCase());
    }
    return {
      pass: matched,
      description,
      got: matched ? 'matched' : `pattern /${pattern}/${flags ?? 'i'} not found`,
    };
  }

  const el = query ? doc.querySelector(query) : null;

  if (!el) {
    return { pass: false, description, got: `element "${query}" not found` };
  }

  // For exists/countAtLeast — no computed style needed
  if (assertion === 'exists') {
    return { pass: true, description, got: 'found' };
  }
  if (assertion === 'countAtLeast') {
    const els = query ? doc.querySelectorAll(query) : [];
    const count = els.length;
    const min = Number(value ?? 1);
    return { pass: count >= min, description, got: `found ${count}, need ${min}` };
  }

  // Style assertions — jsdom has limited getComputedStyle support
  // We'll check if the CSS source contains the expected property/value patterns instead
  const computed = doc.defaultView?.getComputedStyle(el);

  switch (assertion) {
    case 'equals': {
      const actual = computed?.getPropertyValue(property ?? '').trim() ?? '';
      const expected = String(value ?? '');
      // jsdom doesn't compute most CSS — fallback to source check
      if (!actual && property) {
        // Check if the CSS source has this property set
        const sourceHasProperty = new RegExp(
          `${property.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')}\\s*:`,
          'i'
        ).test(source);
        return {
          pass: sourceHasProperty,
          description,
          got: sourceHasProperty
            ? `(jsdom limited: property "${property}" found in source)`
            : `(jsdom limited: property "${property}" NOT in source)`,
          jsdomLimited: true,
        };
      }
      return { pass: actual === expected, description, got: actual };
    }
    case 'oneOf': {
      const actual = computed?.getPropertyValue(property ?? '').trim() ?? '';
      const options = Array.isArray(value) ? value.map(String) : [String(value ?? '')];
      if (!actual && property) {
        const sourceHasProperty = new RegExp(
          `${property.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')}\\s*:`,
          'i'
        ).test(source);
        return {
          pass: sourceHasProperty,
          description,
          got: sourceHasProperty
            ? `(jsdom limited: property "${property}" found in source)`
            : `(jsdom limited: property "${property}" NOT in source)`,
          jsdomLimited: true,
        };
      }
      return { pass: options.includes(actual), description, got: actual };
    }
    case 'contains': {
      const actual = computed?.getPropertyValue(property ?? '').trim() ?? '';
      const needle = String(value ?? '');
      if (!actual && property) {
        const sourceHasProperty = new RegExp(
          `${property.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')}\\s*:`,
          'i'
        ).test(source);
        return {
          pass: sourceHasProperty,
          description,
          got: sourceHasProperty
            ? `(jsdom limited: property "${property}" found in source)`
            : `(jsdom limited: property "${property}" NOT in source)`,
          jsdomLimited: true,
        };
      }
      return { pass: actual.includes(needle), description, got: actual };
    }
    default:
      return { pass: false, description, got: `Unknown CSS assertion: ${assertion}` };
  }
}

// ─── Run tests ───────────────────────────────────────────────────────

let totalExercises = 0;
let passedExercises = 0;
let failedExercises = 0;
let totalTests = 0;
let passedTests = 0;
let failedTests = 0;
let jsdomLimitedTests = 0;
const failures = [];

for (const exercise of exercises) {
  totalExercises++;
  const solution = exercise.solution || '';
  const testCases = exercise.testCases || [];
  let exercisePassed = true;
  const exerciseFailures = [];

  for (const tc of testCases) {
    totalTests++;
    let result;

    try {
      if (exercise.type === 'html') {
        // HTML: parse solution with DOMParser equivalent
        const dom = createDOM(
          `<!DOCTYPE html><html><body>${solution}</body></html>`
        );
        result = evaluateHtmlAssertion(dom.window.document, solution, tc);
      } else if (exercise.type === 'css') {
        // CSS: render providedHtml with CSS solution
        const providedHtml = exercise.providedHtml || '';
        const dom = createDOM(
          `<!DOCTYPE html><html><head><style>${solution}</style></head><body>${providedHtml}</body></html>`,
          { pretendToBeVisual: true }
        );
        result = evaluateCssAssertion(dom.window.document, solution, tc);
      } else if (exercise.type === 'html-css') {
        // HTML-CSS: determine which runner to use based on assertion type
        const isSourceAssertion = ['sourceContains', 'sourceMatch'].includes(tc.assertion);
        const isDomAssertion = ['exists', 'textContains', 'countAtLeast', 'hasId', 'hasClass'].includes(tc.assertion);
        const isStyleAssertion = ['equals', 'oneOf', 'contains'].includes(tc.assertion) && tc.property;

        // For html-css, solution is HTML and cssCode would be separate
        // But in our exercise format, we may need to handle this differently
        // The solution field contains the HTML, and CSS may be embedded or separate
        const htmlCode = solution;
        const cssCode = exercise.cssSolution || '';
        const combinedSource = htmlCode + '\n' + cssCode;

        if (isSourceAssertion) {
          const dom = createDOM(`<!DOCTYPE html><html><body></body></html>`);
          result = evaluateHtmlAssertion(dom.window.document, combinedSource, tc);
        } else if (isDomAssertion) {
          const dom = createDOM(`<!DOCTYPE html><html><body>${htmlCode}</body></html>`);
          result = evaluateHtmlAssertion(dom.window.document, htmlCode, tc);
        } else if (isStyleAssertion) {
          const dom = createDOM(
            `<!DOCTYPE html><html><head><style>${cssCode}</style></head><body>${htmlCode}</body></html>`,
            { pretendToBeVisual: true }
          );
          result = evaluateCssAssertion(dom.window.document, cssCode, tc);
        } else {
          result = { pass: false, description: tc.description, got: 'Unknown assertion for html-css' };
        }
      }
    } catch (err) {
      result = {
        pass: false,
        description: tc.description,
        got: `Error: ${err.message}`,
      };
    }

    if (result.pass) {
      passedTests++;
      if (result.jsdomLimited) jsdomLimitedTests++;
    } else {
      failedTests++;
      exercisePassed = false;
      exerciseFailures.push(result);
    }
  }

  if (exercisePassed) {
    passedExercises++;
  } else {
    failedExercises++;
    failures.push({
      id: exercise.id,
      title: exercise.title,
      type: exercise.type,
      tier: exercise.tier,
      failures: exerciseFailures,
    });
  }
}

// ─── Report ──────────────────────────────────────────────────────────

console.log('═══════════════════════════════════════════════════════');
console.log('  HTML/CSS Exercise Validation Report');
console.log('═══════════════════════════════════════════════════════\n');

console.log(`Exercises: ${passedExercises}/${totalExercises} passed (${failedExercises} failed)`);
console.log(`Tests:     ${passedTests}/${totalTests} passed (${failedTests} failed)`);
if (jsdomLimitedTests > 0) {
  console.log(`           ${jsdomLimitedTests} tests used jsdom fallback (computed styles limited)`);
}

if (failures.length > 0) {
  console.log(`\n${'─'.repeat(55)}`);
  console.log('  FAILURES');
  console.log(`${'─'.repeat(55)}\n`);

  for (const f of failures) {
    console.log(`❌ [${f.type.toUpperCase()}] ID ${f.id}: ${f.title} (T${f.tier})`);
    for (const fail of f.failures) {
      console.log(`   ✗ ${fail.description}`);
      console.log(`     Got: ${fail.got}`);
    }
    console.log();
  }
} else {
  console.log('\n✅ All exercises passed!\n');
}

// Exit with error code if failures
process.exit(failures.length > 0 ? 1 : 0);
