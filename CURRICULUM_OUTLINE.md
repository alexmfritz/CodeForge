# CodeForge Default Curriculum — Master Outline

> **Purpose:** Planning document for the Default Curriculum collection overhaul.
> Modules are organizational guides for authoring — NOT separate collections.
> Every exercise below lives in the single **Default Curriculum** collection,
> distinguished by `type`, `tier`, `category`, and `tags`.

> **Target audience:** 95% complete beginners, many brand-new to technology.
> **Program structure:** Edmonds College CIS 241→246 Web Application Developer Certificate.
> - Q1: HTML + CSS
> - Q2: JavaScript
> - Q3: Server-Side Scripting (Express/Node/MongoDB concepts)
> - Q4: Front-End Frameworks (React concepts)
> Q3/Q4 concepts are taught as **vanilla JS exercises** — no framework dependencies.

---

## Authoring Standards

These standards apply to **every exercise in the Default Curriculum**. Named collections
(Exercism, Turing, RPG Questline, etc.) retain their own voice and style.

### Philosophy: Textbook vs Problem Sets

The **Default Curriculum** is the textbook — it introduces every concept, demonstrates how it
works, and provides focused practice. Each topic is touched on with enough depth to teach
the "formula," but not drilled to exhaustion. That muscle-memory repetition comes from
**Collections** — Exercism, RPG Questline, Interview Classics, CSS Modern Toolkit, etc. —
which give students many different "values to plug into the formulas" while adding variety,
credibility from real-world sources, and fun.

> Default Curriculum = learn the formula.
> Collections = practice the formula until it's second nature.

### Tier Scaffolding Definitions

Tiers control **starter code density** — how much skeleton the student receives. Each tier
removes one layer of scaffolding. By Tier 5, the student starts from nothing.

#### JavaScript Exercises

**Tier 1 — Spark** (fill-in-the-blank with step-by-step comments)
```js
/**
 * Takes a temperature in Fahrenheit and returns it in Celsius.
 * Formula: (fahrenheit - 32) × 5/9
 *
 * Example: toCelsius(32) → 0
 * Example: toCelsius(212) → 100
 */
function toCelsius(fahrenheit) {
  // Subtract 32 from fahrenheit

  // Multiply the result by 5/9

  // Return the final value

}
```
> Each comment = one line of code. The student translates English into JS.
> Function name, signature, and parameters are always provided.
> This is Mad Libs for code — the student knows exactly where to type.

**Tier 2 — Foundations** (function signature provided, no step-by-step comments)
```js
/**
 * Takes a temperature in Fahrenheit and returns it in Celsius.
 * Formula: (fahrenheit - 32) × 5/9
 *
 * Example: toCelsius(32) → 0
 * Example: toCelsius(212) → 100
 */
function toCelsius(fahrenheit) {

}
```
> The student knows what to build and what it takes, but decides how.
> One conceptual step up — they sequence the operations themselves.

**Tier 3 — Builder** (comment prompt only, student writes the function)
```js
/**
 * Takes a temperature in Fahrenheit and returns it in Celsius.
 *
 * Example: toCelsius(32) → 0
 * Example: toCelsius(212) → 100
 */

// Write your function below
```
> The formula hint is removed. The student writes the full function declaration.
> They prove they understand structure, not just fill-in.

**Tier 4 — Architect** (description only, no starter code)
```js
/**
 * Convert a temperature between Fahrenheit and Celsius.
 * Support both directions based on a "unit" parameter.
 */
```
> Open-ended. Student decides function name, parameters, and approach.

**Tier 5 — Mastercraft** (empty editor, problem in instructions panel only)
> Nothing in the editor. The instructions panel describes the challenge.

#### HTML Exercises

**Tier 1** — Partial document with `<!-- WRITE HERE -->` markers:
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <title>My Page</title>
</head>
<body>
  <!-- Add an h1 with the text "Welcome" -->

  <!-- Add a paragraph with any text -->

</body>
</html>
```

**Tier 2** — Skeleton only:
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <title>My Page</title>
</head>
<body>

</body>
</html>
```

**Tier 3** — Empty or just `<!DOCTYPE html>`.

#### CSS Exercises

**Tier 1** — Selectors provided, fill in the properties:
```css
/* Make the h1 text blue and 32px */
h1 {
  /* Set the text color */

  /* Set the font size */

}
```

**Tier 2** — Some structure, student adds selectors and properties:
```css
/* Style the heading and paragraph */
h1 {

}
```

**Tier 3** — Just the provided HTML reference, student writes all CSS from scratch.

### Description & Instructions Format

Every Default Curriculum exercise follows this consistent structure:

**Title:** Clear, concise, action-oriented (e.g., "Sum an Array", "Flex Direction")

**Description** (one-liner for browse cards):
Active verb, one sentence, plain language.
> "Use a `for` loop to calculate the sum of all numbers in an array."

**Instructions** (full panel, displayed when working on the exercise):
1. **What to do** — imperative verb, plain language ("Write a function that...",
   "Create an HTML page with...", "Style the provided elements so that...")
2. **Concept context** — one sentence: *why* this matters or *when* you'd use it
3. **Examples** — concrete input → output pairs (JS) or visual descriptions (HTML/CSS)
4. **Constraints or notes** — if any (e.g., "Do not use `.reverse()`")

**Voice:** Second person imperative. "Write a function...", "Add a class...",
"Your function should return...". No jargon in T1 descriptions. By T3+ we use technical
vocabulary that was introduced in earlier exercises.

### Hint Strategy — 2 Hints + Solution

Each exercise provides **2 progressive hints** and a **solution**.

**Gating:**
- **Hint 1** unlocks at **3 unique attempts**
- **Hint 2** unlocks at **6 unique attempts**
- **Solution** unlocks at **10 unique attempts** (default, overridable via `solutionGate`)

**Hint tone & specificity:**

- **Hint 1 — Conceptual nudge.** Points the student toward the right *category* of
  approach. Should make them think "oh, there's probably a built-in method for this" and
  send them exploring.
  > *Example:* "Check if there is an Array method that lets you create a new array
  > containing only the elements that pass a test."

- **Hint 2 — Structural nudge.** Narrows the search to a specific tool or pattern, but
  still requires the student to figure out the implementation.
  > *Example:* "Look into `.filter()` — it takes a callback function that should return
  > `true` for each element you want to keep."

Hints should **never** contain code snippets or step-by-step instructions. If a hint
reads like a partial solution, it's too specific. The student should still have to
*think* after reading it.

> **Code change required:** Update `HINT_GATES` in `shared/constants.ts` from
> `[3, 6, 9]` to `[3, 6]` and update any UI that renders 3 hint slots.

### Resource Strategy

Every exercise includes reference links following this tier-based approach:

- **Tier 1:** W3Schools link (primary, beginner-friendly "Try it" format) + MDN link (reference)
- **Tier 2:** W3Schools link (for foundational concepts) + MDN link; or just MDN if the concept is straightforward
- **Tier 3+:** MDN link(s); optionally a second MDN page or official JS/CSS specification link for deeper context

This teaches a meta-skill: students start with beginner-friendly resources and graduate
to reading primary documentation — the same progression professional developers follow.

---

## Summary

| Module | Topic | Exercises | T1 | T2 | T3 | T4 | T5 |
|--------|-------|-----------|----|----|----|----|-----|
| 1 | HTML Foundations | 64 | 37 | 21 | 6 | — | — |
| 2 | CSS Foundations | 62 | 32 | 26 | 4 | — | — |
| 3 | CSS Layout & Responsive | 55 | 17 | 23 | 12 | 2 | 1 |
| 4 | HTML + CSS Integration | 25 | 5 | 10 | 6 | 2 | 2 |
| 5 | JS Fundamentals | 75 | 39 | 27 | 8 | 1 | — |
| 6 | Functions & Arrays | 62 | 17 | 26 | 13 | 4 | 2 |
| 7 | Objects & Classes | 49 | 14 | 19 | 10 | 4 | 2 |
| 8 | DOM & Events | 32 | 9 | 12 | 6 | 4 | 1 |
| 9 | Intermediate JS | 45 | 3 | 18 | 15 | 6 | 3 |
| 10 | Server Concepts (Vanilla JS) | 40 | 7 | 17 | 10 | 4 | 2 |
| 11 | Component Patterns (Vanilla JS) | 35 | 4 | 12 | 10 | 5 | 4 |
| 12 | Capstone Projects | 20 | — | 2 | 7 | 6 | 5 |
| **TOTAL** | | **564** | **184** | **213** | **107** | **38** | **22** |

**Tier distribution:** T1 = 33%, T2 = 38%, T3 = 19%, T4 = 7%, T5 = 4%

**By Edmonds Quarter:**
- **Q1 (CIS 241 + 245):** Modules 1–4 → 206 exercises (HTML + CSS)
- **Q2 (CIS 242):** Modules 5–8 → 218 exercises (JavaScript)
- **Q3 (CIS 243):** Module 10 → 40 exercises (Server concepts as vanilla JS)
- **Q4 (CIS 244/246):** Module 11 → 35 exercises (Component patterns as vanilla JS)
- **Throughout:** Modules 9 + 12 → 65 exercises (Intermediate JS + Capstones)

---

## Category Taxonomy

Extends the existing two-level `[domain, subdomain]` pattern.
New categories marked with ✨.

```
html/
  structure          — Document skeleton, head/body, doctype
  text-content    ✨ — Headings, paragraphs, emphasis, whitespace
  lists           ✨ — Ordered, unordered, description, nested
  links           ✨ — Anchors, href, target, relative/absolute paths
  media           ✨ — Images, audio, video, figure/figcaption
  tables          ✨ — Table structure, thead/tbody, colspan/rowspan
  forms              — Inputs, labels, fieldset, buttons, validation
  semantics          — Semantic elements, landmark roles, document outline
  accessibility   ✨ — Alt text, ARIA basics, screen reader considerations

css/
  applying-styles ✨ — Inline, internal, external, linking stylesheets
  selectors          — Element, class, ID, combinators, attribute selectors
  colors          ✨ — Color values, hex, rgb, hsl, opacity, backgrounds
  typography         — Font properties, text alignment, decoration, spacing
  box-model          — Margin, padding, border, content, box-sizing
  units           ✨ — px, em, rem, %, vh, vw, when to use each
  display         ✨ — Block, inline, inline-block, none, visibility
  cascade            — Specificity, inheritance, !important, source order
  positioning        — Static, relative, absolute, fixed, sticky, z-index
  flexbox            — Direction, justify, align, wrap, gap, order, grow/shrink
  layout             — Grid templates, areas, fr units, auto-fit/fill, span
  responsive      ✨ — Media queries, mobile-first, breakpoints, fluid design
  custom-properties  — CSS variables, fallbacks, theming, scope
  transitions        — Property, duration, timing, delay, hover effects
  visual             — Shadows, borders, border-radius, gradients, filters
  modern-selectors   — :is(), :where(), :has(), :not(), nth-child patterns
  nesting            — CSS nesting syntax
  container-queries  — Container size queries, container names
  functions          — calc(), min(), max(), clamp()

js-fundamentals/
  variables          — let, const, naming, declaration vs assignment
  types           ✨ — Strings, numbers, booleans, null, undefined, typeof
  operators          — Arithmetic, comparison, logical, assignment, ternary
  strings         ✨ — String methods, length, indexOf, slice, includes, replace
  template-literals ✨ — Backticks, interpolation, multi-line strings
  conditionals       — if/else, else if, switch, truthy/falsy
  loops              — for, while, do...while, for...of, break, continue
  type-coercion   ✨ — Implicit/explicit conversion, equality quirks
  classes            — Constructor, methods, this, static, extends

functions/
  basics          ✨ — Declarations, expressions, arrow functions, return values
  parameters      ✨ — Default params, rest params, arguments
  scope              — Block scope, function scope, lexical scope, hoisting
  callbacks          — Callback pattern, passing functions as arguments
  higher-order       — Functions that return functions, closures, currying

data-structures/
  arrays             — Access, mutate, length, spread, destructuring
  array-methods   ✨ — push/pop, shift/unshift, splice, slice, concat, join
  array-iteration ✨ — forEach, map, filter, find, findIndex, some, every
  reduce          ✨ — Accumulator pattern, summing, grouping, flattening
  objects            — Literals, properties, methods, dot vs bracket notation
  object-methods  ✨ — Object.keys, Object.values, Object.entries, Object.assign
  nested-data     ✨ — Nested objects/arrays, deep access, data transformation
  strings            — (shared with js-fundamentals — advanced string work)

dom-manipulation/
  selection          — getElementById, querySelector, querySelectorAll
  manipulation       — textContent, innerHTML, classList, setAttribute, style
  creation        ✨ — createElement, appendChild, insertBefore, removeChild
  events             — addEventListener, click, submit, keydown, event object

es6-plus/
  destructuring      — Array/object destructuring, renaming, defaults, nested
  template-literals  — (overlap with js-fundamentals, for advanced patterns)
  spread-rest     ✨ — Spread operator, rest parameters, shallow copy patterns
  modules            — import/export, named vs default, module patterns
  async              — Promises, async/await, fetch pattern, error handling

algorithms/
  patterns           — Frequency counters, multiple pointers, sliding window
  recursion          — Base cases, recursive calls, tree recursion
  searching          — Linear search, binary search
  sorting            — Bubble, selection, insertion, merge, quick
  performance        — Big O notation, time/space complexity

regex/
  basics             — Literal characters, character classes, quantifiers
  patterns           — Anchors, groups, alternation, lookahead
  extraction         — match, test, replace, capture groups

server-concepts/ ✨ (NEW DOMAIN — vanilla JS exercises)
  http            ✨ — Request/response objects, status codes, methods
  routing         ✨ — Path matching, parameter extraction, method dispatch
  middleware      ✨ — Function pipelines, next pattern, request transformation
  api-design      ✨ — RESTful patterns, CRUD operations, response formatting
  data-modeling   ✨ — Schema validation, type checking, default values
  queries         ✨ — Filter/sort/project patterns on arrays of objects

component-patterns/ ✨ (NEW DOMAIN — vanilla JS exercises)
  functional      ✨ — Pure functions that return data structures (virtual DOM)
  props           ✨ — Configuration objects, default props, prop validation
  state           ✨ — State objects, immutable updates, state transitions
  composition     ✨ — Composing small functions into larger UIs
  rendering       ✨ — Conditional rendering, list rendering, template logic
  lifecycle       ✨ — Setup/teardown patterns, effect-like cleanup functions

testing/ (existing)
  fundamentals       — What tests are, assertion basics
  assertions         — Writing test expectations, edge cases

web-apis/ (existing)
  data               — JSON, fetch, localStorage
  storage            — sessionStorage, cookies concepts
```

---

## Module 1: HTML Foundations

**Goal:** Students can write well-structured HTML documents from scratch.
**Type:** `html` | **Tiers:** T1–T3 | **Exercises:** 60

### 1.1 Document Structure — `["html", "structure"]`
> Tags: `doctype`, `html`, `head`, `body`, `beginner`

| # | Tier | Title (example) | Description |
|---|------|-----------------|-------------|
| 1 | T1 | Your First HTML Page | Add `<!DOCTYPE html>`, `<html>`, `<head>`, and `<body>` tags |
| 2 | T1 | Page Title | Add a `<title>` element inside `<head>` |
| 3 | T1 | Head & Body | Place a heading in `<body>` and a title in `<head>` |
| 4 | T1 | Complete Skeleton | Build a full HTML5 document skeleton from a description |
| 5 | T2 | Meta Tags | Add charset, viewport, and description meta tags |
| 6 | T2 | Multiple Pages Concept | Create an HTML page with navigation links to other pages |

**Count: 6 (T1: 4, T2: 2)**

### 1.2 Text Content — `["html", "text-content"]`
> Tags: `headings`, `paragraphs`, `emphasis`, `whitespace`, `beginner`

| # | Tier | Title (example) | Description |
|---|------|-----------------|-------------|
| 1 | T1 | Heading Levels | Use `<h1>` through `<h6>` in correct hierarchy |
| 2 | T1 | Paragraphs | Wrap text in `<p>` tags |
| 3 | T1 | Bold & Italic | Use `<strong>` and `<em>` for emphasis |
| 4 | T1 | Line Breaks | Use `<br>` to break lines within a paragraph |
| 5 | T1 | Horizontal Rules | Use `<hr>` to separate content sections |
| 6 | T1 | Headings & Paragraphs | Combine headings and paragraphs into a structured article |
| 7 | T1 | Preformatted Text | Use `<pre>` and `<code>` for code snippets |
| 8 | T2 | Blockquotes | Use `<blockquote>` and `<cite>` for quotations |
| 9 | T2 | Inline vs Block | Choose correct inline (`<span>`, `<em>`) vs block (`<div>`, `<p>`) elements |
| 10 | T2 | Article Layout | Structure a blog post with headings, paragraphs, and emphasis |

**Count: 10 (T1: 7, T2: 3)**

### 1.3 Lists — `["html", "lists"]`
> Tags: `lists`, `ordered`, `unordered`, `nested`, `beginner`

| # | Tier | Title (example) | Description |
|---|------|-----------------|-------------|
| 1 | T1 | Unordered List | Create a bulleted list of items |
| 2 | T1 | Ordered List | Create a numbered list of steps |
| 3 | T1 | List with Content | Build a grocery list using `<ul>` and `<li>` |
| 4 | T1 | Recipe Steps | Write recipe instructions as an ordered list |
| 5 | T2 | Nested Lists | Nest an unordered list inside an ordered list |
| 6 | T2 | Description List | Use `<dl>`, `<dt>`, `<dd>` for term/definition pairs |
| 7 | T2 | Navigation from a List | Build a nav menu using an unordered list of links |

**Count: 7 (T1: 4, T2: 3)**

### 1.4 Links & Navigation — `["html", "links"]`
> Tags: `anchors`, `href`, `navigation`, `paths`, `beginner`

| # | Tier | Title (example) | Description |
|---|------|-----------------|-------------|
| 1 | T1 | External Link | Create a link to an external website |
| 2 | T1 | Link Text | Write a link with meaningful link text (not "click here") |
| 3 | T1 | Open in New Tab | Use `target="_blank"` with `rel="noopener"` |
| 4 | T1 | Email Link | Create a `mailto:` link |
| 5 | T2 | Page Anchors | Link to a section on the same page with `id` and `#` |
| 6 | T2 | Navigation Bar | Build a simple nav with multiple links |

**Count: 6 (T1: 4, T2: 2)**

### 1.5 Images & Media — `["html", "media"]`
> Tags: `images`, `media`, `alt-text`, `figure`, `beginner`

| # | Tier | Title (example) | Description |
|---|------|-----------------|-------------|
| 1 | T1 | Add an Image | Use `<img>` with `src` and `alt` attributes |
| 2 | T1 | Image Sizing | Set `width` and `height` attributes on an image |
| 3 | T1 | Linked Image | Wrap an image in an anchor tag |
| 4 | T2 | Figure & Caption | Use `<figure>` and `<figcaption>` |
| 5 | T2 | Responsive Image | Use `srcset` or CSS to make an image responsive |
| 6 | T2 | Audio Element | Embed audio with `<audio>` and `controls` |

**Count: 6 (T1: 3, T2: 3)**

### 1.6 Tables — `["html", "tables"]`
> Tags: `tables`, `rows`, `columns`, `thead`, `tbody`, `beginner`

| # | Tier | Title (example) | Description |
|---|------|-----------------|-------------|
| 1 | T1 | Simple Table | Create a 2-column table with 3 rows |
| 2 | T1 | Table Headers | Use `<th>` for header cells in the first row |
| 3 | T1 | Table Sections | Use `<thead>`, `<tbody>`, `<tfoot>` |
| 4 | T2 | Spanning Columns | Use `colspan` to merge cells across columns |
| 5 | T2 | Spanning Rows | Use `rowspan` to merge cells across rows |
| 6 | T2 | Schedule Table | Build a class schedule table with proper headers and spans |
| 7 | T3 | Data Table | Build a complex data table with caption, sections, and spans |

**Count: 7 (T1: 3, T2: 3, T3: 1)**

### 1.7 Forms & Inputs — `["html", "forms"]`
> Tags: `forms`, `inputs`, `labels`, `buttons`, `validation`, `beginner`

| # | Tier | Title (example) | Description |
|---|------|-----------------|-------------|
| 1 | T1 | Text Input | Create a text input with a label |
| 2 | T1 | Form with Button | Build a form with an input and submit button |
| 3 | T1 | Input Types | Use `email`, `password`, and `number` input types |
| 4 | T1 | Placeholder Text | Add placeholder attributes to inputs |
| 5 | T1 | Checkbox & Radio | Create checkboxes and radio button groups |
| 6 | T2 | Textarea | Add a multi-line text input |
| 7 | T2 | Select Dropdown | Build a dropdown menu with `<select>` and `<option>` |
| 8 | T2 | Fieldset & Legend | Group related inputs with `<fieldset>` and `<legend>` |
| 9 | T2 | Required Fields | Use the `required` attribute for form validation |
| 10 | T3 | Contact Form | Build a complete contact form with name, email, message, and submit |
| 11 | T3 | Registration Form | Build a registration form with validation attributes |

**Count: 11 (T1: 5, T2: 4, T3: 2)**

### 1.8 Semantic HTML — `["html", "semantics"]`
> Tags: `semantic`, `landmark`, `structure`, `accessibility`

| # | Tier | Title (example) | Description |
|---|------|-----------------|-------------|
| 1 | T1 | Header & Footer | Use `<header>` and `<footer>` elements |
| 2 | T1 | Nav Element | Wrap navigation links in `<nav>` |
| 3 | T1 | Main Content | Use `<main>` for primary page content |
| 4 | T2 | Section & Article | Distinguish between `<section>` and `<article>` |
| 5 | T2 | Aside Content | Use `<aside>` for supplementary content |
| 6 | T3 | Full Page Structure | Build a complete semantic page layout with all landmark elements |

**Count: 6 (T1: 3, T2: 2, T3: 1)**

### 1.9 Accessibility — `["html", "accessibility"]`
> Tags: `accessibility`, `a11y`, `aria`, `screen-reader`

| # | Tier | Title (example) | Description |
|---|------|-----------------|-------------|
| 1 | T2 | Descriptive Alt Text | Write meaningful alt text for various images |
| 2 | T2 | Label Associations | Connect labels to inputs with `for`/`id` |
| 3 | T2 | Skip Navigation | Add a "skip to main content" link |
| 4 | T3 | ARIA Roles | Add basic ARIA roles to non-semantic elements |
| 5 | T3 | Accessible Form | Build a form following accessibility best practices |

**Count: 5 (T2: 3, T3: 2)**

### Module 1 Total: 64 exercises (T1: 37, T2: 21, T3: 6)

---

## Module 2: CSS Foundations

**Goal:** Students understand how to style HTML elements with confidence.
**Type:** `css` | **Tiers:** T1–T3 | **Exercises:** 70

### 2.1 Applying Styles — `["css", "applying-styles"]`
> Tags: `stylesheet`, `link`, `inline`, `internal`, `beginner`

| # | Tier | Title (example) | Description |
|---|------|-----------------|-------------|
| 1 | T1 | Inline Style | Add a `style` attribute to change text color |
| 2 | T1 | Internal Stylesheet | Write a `<style>` block in `<head>` |
| 3 | T1 | External Stylesheet | Link an external CSS file with `<link>` |
| 4 | T1 | Style a Heading | Use CSS to change size and color of `<h1>` |
| 5 | T2 | Multiple Stylesheets | Link two stylesheets and understand load order |

**Count: 5 (T1: 4, T2: 1)**

### 2.2 Selectors — `["css", "selectors"]`
> Tags: `selectors`, `class`, `id`, `combinators`, `beginner`

| # | Tier | Title (example) | Description |
|---|------|-----------------|-------------|
| 1 | T1 | Element Selector | Style all `<p>` elements |
| 2 | T1 | Class Selector | Style elements with a specific class |
| 3 | T1 | ID Selector | Style a single element by ID |
| 4 | T1 | Multiple Classes | Apply styles to elements with two classes |
| 5 | T1 | Group Selectors | Style `h1, h2, h3` with one rule |
| 6 | T2 | Descendant Selector | Style paragraphs inside a specific div |
| 7 | T2 | Child Selector | Use `>` to target direct children |
| 8 | T2 | Attribute Selector | Style inputs by `type` attribute |
| 9 | T2 | Pseudo-classes | Use `:hover`, `:focus`, `:first-child` |
| 10 | T3 | Pseudo-elements | Use `::before` and `::after` for decorative content |
| 11 | T3 | Complex Selectors | Combine multiple selector types in one rule |

**Count: 11 (T1: 5, T2: 4, T3: 2)**

### 2.3 Colors & Backgrounds — `["css", "colors"]`
> Tags: `colors`, `backgrounds`, `hex`, `rgb`, `hsl`, `beginner`

| # | Tier | Title (example) | Description |
|---|------|-----------------|-------------|
| 1 | T1 | Named Colors | Use named colors like `red`, `blue`, `tomato` |
| 2 | T1 | Hex Colors | Use hexadecimal color codes |
| 3 | T1 | RGB Colors | Use `rgb()` and `rgba()` notation |
| 4 | T1 | Background Color | Set `background-color` on elements |
| 5 | T1 | Text Color | Set `color` property on text |
| 6 | T2 | HSL Colors | Use `hsl()` and `hsla()` notation |
| 7 | T2 | Opacity | Control element transparency |
| 8 | T2 | Background Images | Use `background-image`, `background-size`, `background-position` |
| 9 | T2 | Gradients | Create linear and radial gradients |

**Count: 9 (T1: 5, T2: 4)**

### 2.4 Typography — `["css", "typography"]`
> Tags: `fonts`, `text`, `typography`, `line-height`, `beginner`

| # | Tier | Title (example) | Description |
|---|------|-----------------|-------------|
| 1 | T1 | Font Family | Set `font-family` with fallback stack |
| 2 | T1 | Font Size | Use `font-size` with px, em, rem |
| 3 | T1 | Font Weight | Use `font-weight` for bold/normal/numeric values |
| 4 | T1 | Text Alignment | Use `text-align` for left/center/right/justify |
| 5 | T1 | Text Decoration | Use `text-decoration` for underline, strikethrough, none |
| 6 | T2 | Line Height & Spacing | Set `line-height`, `letter-spacing`, `word-spacing` |
| 7 | T2 | Text Transform | Use `text-transform` for uppercase/lowercase/capitalize |
| 8 | T2 | Font Shorthand | Use the `font` shorthand property |
| 9 | T2 | Styling Lists | Use `list-style-type`, `list-style-position` |

**Count: 9 (T1: 5, T2: 4)**

### 2.5 Box Model — `["css", "box-model"]`
> Tags: `box-model`, `margin`, `padding`, `border`, `box-sizing`, `beginner`

| # | Tier | Title (example) | Description |
|---|------|-----------------|-------------|
| 1 | T1 | Padding | Add padding to all sides of an element |
| 2 | T1 | Margin | Add margins to create space between elements |
| 3 | T1 | Border | Add a solid border with color and width |
| 4 | T1 | Padding Shorthand | Use 2-value and 4-value padding shorthand |
| 5 | T1 | Margin Shorthand | Use shorthand and `auto` for centering |
| 6 | T1 | Border Radius | Round corners with `border-radius` |
| 7 | T2 | Box Sizing | Understand `content-box` vs `border-box` |
| 8 | T2 | Width & Height | Set explicit dimensions and observe box model effects |
| 9 | T2 | Max/Min Dimensions | Use `max-width`, `min-height` for flexible sizing |
| 10 | T2 | Margin Collapse | Understand and fix vertical margin collapse |
| 11 | T3 | Box Model Debugging | Fix layout issues caused by box model miscalculation |

**Count: 11 (T1: 6, T2: 4, T3: 1)**

### 2.6 Units — `["css", "units"]`
> Tags: `units`, `px`, `em`, `rem`, `viewport`, `percent`, `beginner`

| # | Tier | Title (example) | Description |
|---|------|-----------------|-------------|
| 1 | T1 | Pixels | Size elements using `px` units |
| 2 | T1 | Percentages | Size elements relative to their parent with `%` |
| 3 | T1 | Em Units | Use `em` for font-relative sizing |
| 4 | T2 | Rem Units | Use `rem` for root-relative consistency |
| 5 | T2 | Viewport Units | Use `vh` and `vw` for viewport-relative sizing |
| 6 | T2 | When to Use What | Apply the right unit type for different properties |

**Count: 6 (T1: 3, T2: 3)**

### 2.7 Display & Visibility — `["css", "display"]`
> Tags: `display`, `block`, `inline`, `visibility`, `beginner`

| # | Tier | Title (example) | Description |
|---|------|-----------------|-------------|
| 1 | T1 | Block Elements | Understand default block behavior |
| 2 | T1 | Inline Elements | Understand default inline behavior |
| 3 | T1 | Display None | Hide elements with `display: none` |
| 4 | T2 | Inline-Block | Use `inline-block` for inline elements with dimensions |
| 5 | T2 | Visibility Hidden | Compare `visibility: hidden` vs `display: none` |
| 6 | T2 | Overflow | Control content overflow with `overflow` property |

**Count: 6 (T1: 3, T2: 3)**

### 2.8 Specificity & Cascade — `["css", "cascade"]`
> Tags: `specificity`, `cascade`, `inheritance`, `important`

| # | Tier | Title (example) | Description |
|---|------|-----------------|-------------|
| 1 | T1 | Source Order | Understand which rule wins when selectors are equal |
| 2 | T2 | Specificity Ranking | Predict which style applies given competing selectors |
| 3 | T2 | Inheritance | Identify which properties inherit and which don't |
| 4 | T2 | Override with Class | Fix a style by using a more specific selector |
| 5 | T3 | Specificity Battle | Debug a page where styles aren't applying as expected |

**Count: 5 (T1: 1, T2: 3, T3: 1)**

### Module 2 Total: 62 exercises (T1: 32, T2: 26, T3: 4)

---

## Module 3: CSS Layout & Responsive Design

**Goal:** Students can build responsive multi-column layouts.
**Type:** `css` | **Tiers:** T1–T5 | **Exercises:** 55

### 3.1 Positioning — `["css", "positioning"]`
> Tags: `positioning`, `relative`, `absolute`, `fixed`, `sticky`, `z-index`

| # | Tier | Title (example) | Description |
|---|------|-----------------|-------------|
| 1 | T1 | Relative Positioning | Nudge an element with `position: relative` |
| 2 | T1 | Absolute Positioning | Position an element within a relative parent |
| 3 | T1 | Fixed Header | Create a header that stays at the top on scroll |
| 4 | T2 | Sticky Navigation | Use `position: sticky` for a scroll-aware nav |
| 5 | T2 | Z-Index Stacking | Control overlap order with `z-index` |
| 6 | T2 | Centering with Position | Center an element using absolute + transform |
| 7 | T3 | Badge Overlay | Position a notification badge on a card corner |

**Count: 7 (T1: 3, T2: 3, T3: 1)**

### 3.2 Flexbox — `["css", "flexbox"]`
> Tags: `flexbox`, `flex-direction`, `justify-content`, `align-items`, `gap`

| # | Tier | Title (example) | Description |
|---|------|-----------------|-------------|
| 1 | T1 | Enable Flexbox | Apply `display: flex` to a container |
| 2 | T1 | Flex Direction | Arrange items in a row vs column |
| 3 | T1 | Justify Content | Distribute items along the main axis |
| 4 | T1 | Align Items | Align items along the cross axis |
| 5 | T1 | Gap | Add space between flex items with `gap` |
| 6 | T2 | Flex Wrap | Allow items to wrap to multiple lines |
| 7 | T2 | Flex Grow & Shrink | Control how items share available space |
| 8 | T2 | Order | Rearrange items visually without changing HTML |
| 9 | T2 | Align Self | Override alignment on a single item |
| 10 | T2 | Navbar with Flex | Build a horizontal nav with logo left, links right |
| 11 | T3 | Card Row | Create a responsive row of equal-height cards |
| 12 | T3 | Holy Grail Layout | Build the classic header-sidebar-content-sidebar-footer layout |

**Count: 12 (T1: 5, T2: 5, T3: 2)**

### 3.3 CSS Grid — `["css", "layout"]`
> Tags: `grid`, `grid-template`, `grid-area`, `fr`, `auto-fit`

| # | Tier | Title (example) | Description |
|---|------|-----------------|-------------|
| 1 | T1 | Enable Grid | Apply `display: grid` and define columns |
| 2 | T1 | Grid Columns | Use `grid-template-columns` with fixed widths |
| 3 | T1 | Grid Rows | Define explicit row heights |
| 4 | T2 | Fr Units | Use `fr` for flexible columns |
| 5 | T2 | Grid Gap | Add gaps between rows and columns |
| 6 | T2 | Spanning Columns | Use `grid-column: span 2` |
| 7 | T2 | Grid Areas | Name and assign grid areas |
| 8 | T3 | Auto-fit & Auto-fill | Create responsive grids without media queries |
| 9 | T3 | Grid + Flexbox | Combine grid layout with flexbox alignment |
| 10 | T4 | Dashboard Layout | Build a full dashboard with sidebar, header, and content grid |

**Count: 10 (T1: 3, T2: 4, T3: 2, T4: 1)**

### 3.4 Responsive Design — `["css", "responsive"]`
> Tags: `responsive`, `media-queries`, `mobile-first`, `breakpoints`

| # | Tier | Title (example) | Description |
|---|------|-----------------|-------------|
| 1 | T1 | Viewport Meta | Understand the viewport meta tag |
| 2 | T1 | Fluid Widths | Use percentages instead of fixed widths |
| 3 | T2 | First Media Query | Write a `@media` rule that changes layout at 768px |
| 4 | T2 | Mobile-First | Write styles for mobile, then add breakpoints for larger screens |
| 5 | T2 | Responsive Text | Scale font sizes across breakpoints |
| 6 | T2 | Hide/Show Elements | Show sidebar on desktop, hide on mobile |
| 7 | T3 | Responsive Nav | Hamburger menu concept (CSS-only toggle) |
| 8 | T3 | Fluid Typography | Use `clamp()` for smoothly scaling text |

**Count: 8 (T1: 2, T2: 4, T3: 2)**

### 3.5 CSS Custom Properties — `["css", "custom-properties"]`
> Tags: `css-variables`, `custom-properties`, `theming`

| # | Tier | Title (example) | Description |
|---|------|-----------------|-------------|
| 1 | T1 | Define a Variable | Create a `--primary-color` custom property on `:root` |
| 2 | T1 | Use a Variable | Apply `var(--primary-color)` to elements |
| 3 | T2 | Fallback Values | Use `var(--color, fallback)` pattern |
| 4 | T2 | Theme Variables | Define a color palette using custom properties |
| 5 | T3 | Dark Mode Toggle | Create light/dark themes using CSS variable scoping |

**Count: 5 (T1: 2, T2: 2, T3: 1)**

### 3.6 Transitions & Visual Effects — `["css", "transitions"]` / `["css", "visual"]`
> Tags: `transitions`, `shadows`, `gradients`, `transforms`

| # | Tier | Title (example) | Description |
|---|------|-----------------|-------------|
| 1 | T1 | Box Shadow | Add a shadow to a card element |
| 2 | T1 | Text Shadow | Add shadow to heading text |
| 3 | T2 | Hover Transition | Smoothly transition color on hover |
| 4 | T2 | Transform Scale | Scale an element on hover with transition |
| 5 | T2 | Button Hover Effect | Build a button with color + shadow transition |
| 6 | T3 | Card Hover | Create a card that lifts with shadow on hover |
| 7 | T3 | CSS Gradients | Create a gradient background that shifts on hover |

**Count: 7 (T1: 2, T2: 3, T3: 2)**

### 3.7 Modern CSS — `["css", "functions"]` / `["css", "modern-selectors"]` / `["css", "nesting"]` / `["css", "container-queries"]`
> Tags: `calc`, `clamp`, `modern-css`, `nesting`, `container-queries`

| # | Tier | Title (example) | Description |
|---|------|-----------------|-------------|
| 1 | T2 | Calc Dimensions | Use `calc()` to combine units |
| 2 | T2 | Min/Max/Clamp | Use `min()`, `max()`, `clamp()` for fluid sizing |
| 3 | T3 | CSS Nesting | Rewrite flat selectors using native CSS nesting |
| 4 | T3 | :is() and :where() | Simplify complex selectors with modern pseudo-functions |
| 5 | T4 | Container Queries | Style a component based on its container size |
| 6 | T5 | Modern CSS Refactor | Refactor a legacy stylesheet using modern features |

**Count: 6 (T2: 2, T3: 2, T4: 1, T5: 1)**

### Module 3 Total: 55 exercises (T1: 17, T2: 23, T3: 12, T4: 2, T5: 1)

---

## Module 4: HTML + CSS Integration

**Goal:** Students combine HTML structure with CSS styling to build real components.
**Type:** `html-css` | **Tiers:** T1–T5 | **Exercises:** 25

### 4.1 Styled Components — `["html", "structure"]` + `["css", "visual"]`
> Tags: `html-css`, `components`, `real-world`

| # | Tier | Title (example) | Description |
|---|------|-----------------|-------------|
| 1 | T1 | Styled Heading | Create and style a page title with custom font/color |
| 2 | T1 | Styled List | Build and style a bulleted list with custom markers |
| 3 | T1 | Colored Card | Create a card div with padding, border, and background |
| 4 | T2 | Profile Card | Build a user profile card with image, name, and bio |
| 5 | T2 | Button Styles | Create primary, secondary, and disabled button variants |
| 6 | T2 | Alert Boxes | Create success, warning, and error alert components |
| 7 | T3 | Pricing Card | Build a pricing tier card with feature list and CTA |

**Count: 7 (T1: 3, T2: 3, T3: 1)**

### 4.2 Page Layouts — `["css", "layout"]` + `["html", "semantics"]`
> Tags: `layout`, `page-structure`, `real-world`

| # | Tier | Title (example) | Description |
|---|------|-----------------|-------------|
| 1 | T1 | Centered Content | Center a content block on the page |
| 2 | T2 | Two-Column Layout | Build a sidebar + main content layout |
| 3 | T2 | Header + Footer | Create a page with a styled header and footer |
| 4 | T2 | Navigation Bar | Build a horizontal nav with links and active state |
| 5 | T3 | Blog Layout | Full blog page with header, sidebar, articles, footer |
| 6 | T3 | Photo Gallery | Responsive image grid using CSS grid |
| 7 | T4 | Landing Page | Build a hero section, features grid, and footer |
| 8 | T5 | Portfolio Page | Design and build a complete portfolio from a description |

**Count: 8 (T1: 1, T2: 3, T3: 2, T4: 1, T5: 1)**

### 4.3 Form Styling — `["html", "forms"]` + `["css", "visual"]`
> Tags: `forms`, `styling`, `inputs`, `real-world`

| # | Tier | Title (example) | Description |
|---|------|-----------------|-------------|
| 1 | T1 | Styled Input | Style a text input with border, padding, font |
| 2 | T2 | Styled Button | Create a button with hover and focus states |
| 3 | T2 | Form Layout | Arrange form fields in a clean vertical layout |
| 4 | T3 | Login Form | Build a complete styled login form |
| 5 | T3 | Signup Form | Build a multi-field registration form with styling |

**Count: 5 (T1: 1, T2: 2, T3: 2)**

### 4.4 Responsive Components — `["css", "responsive"]`
> Tags: `responsive`, `components`, `mobile-first`

| # | Tier | Title (example) | Description |
|---|------|-----------------|-------------|
| 1 | T2 | Responsive Card Grid | Cards stack on mobile, grid on desktop |
| 2 | T2 | Responsive Nav | Nav links horizontal on desktop, stacked on mobile |
| 3 | T3 | Responsive Table | Table scrolls horizontally on small screens |
| 4 | T4 | Responsive Dashboard | Full responsive layout with collapsible sidebar |
| 5 | T5 | Complete Responsive Site | Build a multi-section responsive page from scratch |

**Count: 5 (T1: 0, T2: 2, T3: 1, T4: 1, T5: 1)

### Module 4 Total: 25 exercises (T1: 5, T2: 10, T3: 6, T4: 2, T5: 2)

---

## Module 5: JavaScript Fundamentals

**Goal:** Students understand variables, types, operators, conditionals, and loops.
**Type:** `js` | **Tiers:** T1–T5 | **Exercises:** 75

### 5.1 Variables & Data Types — `["js-fundamentals", "variables"]` / `["js-fundamentals", "types"]`
> Tags: `variables`, `let`, `const`, `types`, `typeof`, `beginner`

| # | Tier | Title (example) | Description |
|---|------|-----------------|-------------|
| 1 | T1 | Declare a Variable | Use `let` to declare and assign a variable |
| 2 | T1 | Constants | Use `const` for values that don't change |
| 3 | T1 | String Variable | Store a name in a variable and return it |
| 4 | T1 | Number Variable | Store a number and use it in a calculation |
| 5 | T1 | Boolean Variable | Store a true/false value |
| 6 | T1 | Variable Reassignment | Change the value of a `let` variable |
| 7 | T1 | Typeof | Use `typeof` to check the type of a value |
| 8 | T1 | Null & Undefined | Understand the difference between null and undefined |
| 9 | T2 | Naming Conventions | Fix poorly named variables using camelCase |
| 10 | T2 | Let vs Const | Choose the appropriate declaration for each scenario |

**Count: 10 (T1: 8, T2: 2)**

### 5.2 Operators — `["js-fundamentals", "operators"]`
> Tags: `operators`, `arithmetic`, `comparison`, `logical`, `beginner`

| # | Tier | Title (example) | Description |
|---|------|-----------------|-------------|
| 1 | T1 | Addition & Subtraction | Write expressions using `+` and `-` |
| 2 | T1 | Multiplication & Division | Write expressions using `*` and `/` |
| 3 | T1 | Modulo | Use `%` to find remainders |
| 4 | T1 | Comparison Operators | Use `>`, `<`, `>=`, `<=` |
| 5 | T1 | Strict Equality | Use `===` and `!==` |
| 6 | T1 | Logical AND/OR | Combine conditions with `&&` and `||` |
| 7 | T1 | Logical NOT | Negate a condition with `!` |
| 8 | T2 | Compound Assignment | Use `+=`, `-=`, `*=`, `/=` |
| 9 | T2 | Increment & Decrement | Use `++` and `--` |
| 10 | T2 | Operator Precedence | Evaluate complex expressions with correct order of operations |

**Count: 10 (T1: 7, T2: 3)**

### 5.3 Strings — `["js-fundamentals", "strings"]` / `["data-structures", "strings"]`
> Tags: `strings`, `methods`, `length`, `indexOf`, `slice`, `beginner`

| # | Tier | Title (example) | Description |
|---|------|-----------------|-------------|
| 1 | T1 | String Length | Return the length of a given string |
| 2 | T1 | Access a Character | Access a character by index with bracket notation |
| 3 | T1 | toUpperCase / toLowerCase | Convert string case |
| 4 | T1 | String Concatenation | Join two strings with `+` |
| 5 | T1 | Includes | Check if a string contains a substring |
| 6 | T2 | indexOf | Find the position of a substring |
| 7 | T2 | Slice | Extract part of a string with `slice()` |
| 8 | T2 | Replace | Replace a substring using `replace()` |
| 9 | T2 | Split & Join | Split a string into an array and join it back |
| 10 | T2 | Trim | Remove whitespace with `trim()` |
| 11 | T3 | String Reversal | Reverse a string using split/reverse/join |
| 12 | T3 | Palindrome Check | Check if a string reads the same forward and backward |

**Count: 12 (T1: 5, T2: 5, T3: 2)**

### 5.4 Template Literals — `["js-fundamentals", "template-literals"]` / `["es6-plus", "template-literals"]`
> Tags: `template-literals`, `interpolation`, `backticks`, `beginner`

| # | Tier | Title (example) | Description |
|---|------|-----------------|-------------|
| 1 | T1 | Basic Interpolation | Insert a variable into a template literal |
| 2 | T1 | Expression Interpolation | Embed a calculation inside `${}` |
| 3 | T1 | Multi-line Strings | Create a multi-line string with backticks |
| 4 | T2 | Greeting Generator | Build a dynamic greeting from multiple variables |
| 5 | T2 | Template with Conditionals | Use ternary operators inside template literals |

**Count: 5 (T1: 3, T2: 2)**

### 5.5 Conditionals — `["js-fundamentals", "conditionals"]`
> Tags: `conditionals`, `if-else`, `switch`, `ternary`, `truthy`, `beginner`

| # | Tier | Title (example) | Description |
|---|------|-----------------|-------------|
| 1 | T1 | Simple If | Return "yes" or "no" based on a condition |
| 2 | T1 | If/Else | Return different values for true vs false |
| 3 | T1 | Even or Odd | Check if a number is even or odd |
| 4 | T1 | Grade Checker | Return a letter grade based on a numeric score |
| 5 | T1 | Positive/Negative/Zero | Classify a number |
| 6 | T1 | Voting Age | Check if a person is old enough to vote |
| 7 | T2 | Else If Chain | Handle multiple conditions (e.g., weather advice) |
| 8 | T2 | Logical Operators in Conditions | Combine conditions with `&&` and `||` |
| 9 | T2 | Ternary Operator | Rewrite if/else as a ternary expression |
| 10 | T2 | Switch Statement | Use switch for multiple matching cases |
| 11 | T2 | Truthy & Falsy | Predict which values are truthy vs falsy |
| 12 | T3 | Nested Conditionals | Handle complex multi-branch logic |
| 13 | T3 | FizzBuzz | Classic FizzBuzz using conditionals |

**Count: 13 (T1: 6, T2: 5, T3: 2)**

### 5.6 Loops — `["js-fundamentals", "loops"]`
> Tags: `loops`, `for`, `while`, `for-of`, `iteration`, `beginner`

| # | Tier | Title (example) | Description |
|---|------|-----------------|-------------|
| 1 | T1 | Counting Loop | Use a `for` loop to count from 1 to 10 |
| 2 | T1 | Sum to N | Sum all numbers from 1 to n |
| 3 | T1 | Loop Through Array | Print each item in an array using a for loop |
| 4 | T1 | While Loop | Use `while` to repeat until a condition is false |
| 5 | T1 | Countdown | Count down from n to 1 |
| 6 | T1 | Repeat String | Repeat a string n times using a loop |
| 7 | T2 | For...of Loop | Iterate over an array with `for...of` |
| 8 | T2 | Loop with Index | Track the index while iterating |
| 9 | T2 | Break & Continue | Exit early or skip iterations |
| 10 | T2 | Find in Array | Loop through to find a specific value |
| 11 | T2 | Accumulator Pattern | Build a result string or number in a loop |
| 12 | T3 | Nested Loops | Use nested loops for a multiplication table |
| 13 | T3 | Loop Challenges | Solve multi-step problems using loops |

**Count: 13 (T1: 6, T2: 5, T3: 2)**

### 5.7 Type Coercion & Conversion — `["js-fundamentals", "type-coercion"]`
> Tags: `type-coercion`, `conversion`, `Number`, `String`, `Boolean`

| # | Tier | Title (example) | Description |
|---|------|-----------------|-------------|
| 1 | T1 | String to Number | Convert a string to a number with `Number()` |
| 2 | T1 | Number to String | Convert a number to a string with `String()` |
| 3 | T2 | ParseInt & ParseFloat | Extract numbers from strings |
| 4 | T2 | Boolean Conversion | Predict `Boolean()` results for various values |
| 5 | T2 | Loose vs Strict Equality | Explain why `==` gives surprising results |
| 6 | T3 | Coercion Quiz | Predict the output of tricky coercion expressions |

**Count: 6 (T1: 2, T2: 3, T3: 1)**

### 5.8 Putting It Together
> Tags: `practice`, `fundamentals`, `mixed`

| # | Tier | Title (example) | Description |
|---|------|-----------------|-------------|
| 1 | T1 | Temperature Converter | Convert Fahrenheit to Celsius |
| 2 | T1 | Tip Calculator | Calculate a tip from a bill amount and percentage |
| 3 | T2 | Leap Year | Determine if a year is a leap year |
| 4 | T2 | Password Validator | Check if a string meets password rules (length, characters) |
| 5 | T3 | Mini Calculator | Take an operator and two numbers, return the result |
| 6 | T4 | Number Guesser Logic | Build the logic for a number guessing game |

**Count: 6 (T1: 2, T2: 2, T3: 1, T4: 1)**

### Module 5 Total: 75 exercises (T1: 39, T2: 27, T3: 8, T4: 1)

---

## Module 6: Functions & Arrays

**Goal:** Students write reusable functions and manipulate arrays with confidence.
**Type:** `js` | **Tiers:** T1–T5 | **Exercises:** 65

### 6.1 Function Basics — `["functions", "basics"]`
> Tags: `functions`, `declaration`, `expression`, `arrow`, `return`, `beginner`

| # | Tier | Title (example) | Description |
|---|------|-----------------|-------------|
| 1 | T1 | Function Declaration | Write a function that returns a greeting |
| 2 | T1 | Parameters | Write a function that takes a name and returns a greeting |
| 3 | T1 | Return Values | Write a function that returns the square of a number |
| 4 | T1 | Multiple Parameters | Write a function that takes two numbers and returns their sum |
| 5 | T1 | Arrow Functions | Rewrite a function declaration as an arrow function |
| 6 | T2 | Default Parameters | Write a function with default parameter values |
| 7 | T2 | Function Expressions | Assign a function to a variable |
| 8 | T2 | Early Return | Use early return to simplify conditional logic |

**Count: 8 (T1: 5, T2: 3)**

### 6.2 Scope — `["functions", "scope"]`
> Tags: `scope`, `block-scope`, `function-scope`, `hoisting`

| # | Tier | Title (example) | Description |
|---|------|-----------------|-------------|
| 1 | T1 | Block Scope | Predict which variable is accessible inside/outside a block |
| 2 | T2 | Function Scope | Understand variables inside vs outside a function |
| 3 | T2 | Scope Chain | Identify which variable a function references |
| 4 | T2 | Hoisting | Predict behavior of `var` vs `let` declarations |
| 5 | T3 | Closure Introduction | Write a function that "remembers" a value from its outer scope |
| 6 | T3 | Counter Closure | Create a counter using closures |

**Count: 6 (T1: 1, T2: 3, T3: 2)**

### 6.3 Array Basics — `["data-structures", "arrays"]`
> Tags: `arrays`, `access`, `length`, `mutate`, `beginner`

| # | Tier | Title (example) | Description |
|---|------|-----------------|-------------|
| 1 | T1 | Create an Array | Declare an array of numbers |
| 2 | T1 | Access Elements | Access elements by index |
| 3 | T1 | Array Length | Return the length of an array |
| 4 | T1 | Last Element | Access the last element of an array |
| 5 | T1 | Modify Elements | Change an element by index |
| 6 | T2 | Push & Pop | Add and remove elements from the end |
| 7 | T2 | Shift & Unshift | Add and remove elements from the beginning |
| 8 | T2 | Splice | Insert and remove elements at any position |
| 9 | T2 | Slice | Copy a portion of an array |
| 10 | T2 | Includes & IndexOf | Check if an array contains a value |
| 11 | T2 | Concat & Spread | Combine arrays |

**Count: 11 (T1: 5, T2: 6)**

### 6.4 Array Iteration — `["data-structures", "array-iteration"]`
> Tags: `forEach`, `for-of`, `iteration`, `arrays`

| # | Tier | Title (example) | Description |
|---|------|-----------------|-------------|
| 1 | T1 | ForEach | Log each item in an array |
| 2 | T1 | Sum an Array | Use a loop to sum all numbers |
| 3 | T1 | Find the Largest | Find the max value in an array using a loop |
| 4 | T2 | Count Occurrences | Count how many times a value appears |
| 5 | T2 | Filter by Loop | Build a new array of values matching a condition |
| 6 | T2 | Transform by Loop | Build a new array of doubled values |
| 7 | T3 | Unique Values | Remove duplicates from an array using a loop |

**Count: 7 (T1: 3, T2: 3, T3: 1)**

### 6.5 Higher-Order Functions — `["functions", "higher-order"]`
> Tags: `map`, `filter`, `find`, `some`, `every`, `higher-order`

| # | Tier | Title (example) | Description |
|---|------|-----------------|-------------|
| 1 | T1 | Map — Double | Use `.map()` to double every number |
| 2 | T1 | Filter — Evens | Use `.filter()` to keep only even numbers |
| 3 | T2 | Map — Extract Property | Map an array of objects to an array of names |
| 4 | T2 | Filter — By Property | Filter objects by a condition (e.g., age > 18) |
| 5 | T2 | Find | Find the first element matching a condition |
| 6 | T2 | Some & Every | Check if some/all elements meet a condition |
| 7 | T2 | FindIndex | Find the index of a matching element |
| 8 | T3 | Chained Operations | Chain `.filter().map()` to transform filtered data |
| 9 | T3 | Sort | Sort an array of numbers and strings |
| 10 | T3 | Sort Objects | Sort objects by a property value |
| 11 | T4 | Custom Sort | Implement a comparison function for complex sorting |

**Count: 11 (T1: 2, T2: 5, T3: 3, T4: 1)**

### 6.6 Reduce — `["data-structures", "reduce"]`
> Tags: `reduce`, `accumulator`, `aggregation`

| # | Tier | Title (example) | Description |
|---|------|-----------------|-------------|
| 1 | T2 | Sum with Reduce | Sum an array using `.reduce()` |
| 2 | T2 | Count with Reduce | Count items matching a condition |
| 3 | T2 | Flatten | Flatten a 2D array using reduce |
| 4 | T3 | Group By | Group an array of objects by a property |
| 5 | T3 | Frequency Counter | Count character/word frequency |
| 6 | T3 | Reduce to Object | Transform an array into an object |
| 7 | T4 | Pipeline with Reduce | Compose functions using reduce |

**Count: 7 (T2: 3, T3: 3, T4: 1)**

### 6.7 Callbacks — `["functions", "callbacks"]`
> Tags: `callbacks`, `functions-as-arguments`

| # | Tier | Title (example) | Description |
|---|------|-----------------|-------------|
| 1 | T2 | Pass a Function | Call a function that takes another function as argument |
| 2 | T2 | Custom ForEach | Write your own `forEach` using a callback |
| 3 | T3 | Custom Map | Write your own `map` function |
| 4 | T3 | Custom Filter | Write your own `filter` function |
| 5 | T4 | Custom Reduce | Write your own `reduce` function |

**Count: 5 (T2: 2, T3: 2, T4: 1)**

### 6.8 Mixed Practice
> Tags: `practice`, `arrays`, `functions`, `mixed`

| # | Tier | Title (example) | Description |
|---|------|-----------------|-------------|
| 1 | T1 | Reverse Array | Reverse an array without `.reverse()` |
| 2 | T2 | Remove Duplicates | Return only unique values from an array |
| 3 | T3 | Intersection | Find common elements between two arrays |
| 4 | T3 | Zip Arrays | Combine two arrays into pairs |
| 5 | T4 | Flatten Deep | Recursively flatten a nested array |
| 6 | T5 | Array Toolkit | Build a utility library with custom array methods |
| 7 | T5 | Data Pipeline | Process a dataset using chained transformations |

**Count: 7 (T1: 1, T2: 1, T3: 2, T4: 1, T5: 2)**

### Module 6 Total: 62 exercises (T1: 17, T2: 26, T3: 13, T4: 4, T5: 2)

---

## Module 7: Objects & Classes

**Goal:** Students model real-world data with objects and design classes.
**Type:** `js` | **Tiers:** T1–T5 | **Exercises:** 50

### 7.1 Object Literals — `["data-structures", "objects"]`
> Tags: `objects`, `properties`, `methods`, `dot-notation`, `bracket-notation`, `beginner`

| # | Tier | Title (example) | Description |
|---|------|-----------------|-------------|
| 1 | T1 | Create an Object | Create an object with name, age, and city properties |
| 2 | T1 | Access Properties | Read properties with dot notation |
| 3 | T1 | Modify Properties | Update and add properties to an object |
| 4 | T1 | Object with Method | Add a method that returns a formatted string |
| 5 | T1 | Bracket Notation | Access properties using variables with bracket notation |
| 6 | T2 | Dynamic Keys | Create an object with computed property names |
| 7 | T2 | Delete Property | Remove a property from an object |
| 8 | T2 | Check Property Exists | Use `in` operator and `hasOwnProperty` |

**Count: 8 (T1: 5, T2: 3)**

### 7.2 Object Methods — `["data-structures", "object-methods"]`
> Tags: `Object.keys`, `Object.values`, `Object.entries`, `iteration`

| # | Tier | Title (example) | Description |
|---|------|-----------------|-------------|
| 1 | T1 | Object.keys | Get all property names as an array |
| 2 | T1 | Object.values | Get all property values as an array |
| 3 | T2 | Object.entries | Iterate over key-value pairs |
| 4 | T2 | Object.assign | Merge two objects |
| 5 | T2 | Spread with Objects | Copy and extend objects with spread |
| 6 | T3 | Property Counter | Count properties matching a condition |
| 7 | T3 | Invert Object | Swap keys and values |

**Count: 7 (T1: 2, T2: 3, T3: 2)**

### 7.3 Nested Data — `["data-structures", "nested-data"]`
> Tags: `nested`, `deep-access`, `transformation`

| # | Tier | Title (example) | Description |
|---|------|-----------------|-------------|
| 1 | T1 | Access Nested Property | Access a property inside a nested object |
| 2 | T2 | Nested Object Update | Modify a value deep inside nested data |
| 3 | T2 | Array of Objects | Access and iterate an array of objects |
| 4 | T2 | Objects in Arrays | Filter an array of objects by a nested property |
| 5 | T3 | Deep Data Extraction | Extract specific data from a complex nested structure |
| 6 | T3 | Transform Nested Data | Reshape a nested API-like response |
| 7 | T4 | Deep Clone | Create a deep copy of nested data without reference sharing |

**Count: 7 (T1: 1, T2: 3, T3: 2, T4: 1)**

### 7.4 Destructuring — `["es6-plus", "destructuring"]`
> Tags: `destructuring`, `es6`, `objects`, `arrays`

| # | Tier | Title (example) | Description |
|---|------|-----------------|-------------|
| 1 | T1 | Object Destructuring | Extract properties into variables |
| 2 | T1 | Array Destructuring | Extract elements into variables |
| 3 | T2 | Rename & Defaults | Destructure with renamed variables and defaults |
| 4 | T2 | Nested Destructuring | Destructure deeply nested objects |
| 5 | T2 | Function Parameter Destructuring | Destructure in function parameters |
| 6 | T3 | Rest in Destructuring | Use rest syntax to collect remaining properties |

**Count: 6 (T1: 2, T2: 3, T3: 1)**

### 7.5 Classes — `["js-fundamentals", "classes"]`
> Tags: `classes`, `constructor`, `methods`, `this`, `oop`

| # | Tier | Title (example) | Description |
|---|------|-----------------|-------------|
| 1 | T1 | Create a Class | Write a `Person` class with name and age |
| 2 | T1 | Constructor | Use `constructor()` to set initial properties |
| 3 | T1 | Class Method | Add a `greet()` method that returns a string |
| 4 | T1 | Multiple Methods | Add multiple methods to a class |
| 5 | T2 | Getter | Create a `get fullName()` computed property |
| 6 | T2 | Static Method | Add a static utility method |
| 7 | T2 | Bank Account | Build a `BankAccount` class with deposit/withdraw/balance |
| 8 | T3 | Shopping Cart | Build a `ShoppingCart` class with add/remove/total methods |
| 9 | T3 | Deck of Cards | Build a `Deck` class that can shuffle and deal |

**Count: 9 (T1: 4, T2: 3, T3: 2)**

### 7.6 Inheritance & Composition — `["js-fundamentals", "classes"]`
> Tags: `inheritance`, `extends`, `super`, `composition`, `polymorphism`

| # | Tier | Title (example) | Description |
|---|------|-----------------|-------------|
| 1 | T2 | Extends | Create a `Student` class that extends `Person` |
| 2 | T2 | Super | Call the parent constructor with `super()` |
| 3 | T2 | Method Override | Override a parent method in the child class |
| 4 | T3 | Multi-Level Inheritance | Build a 3-level class hierarchy |
| 5 | T3 | Composition over Inheritance | Refactor inheritance into composed behavior objects |
| 6 | T4 | Polymorphism | Create classes with shared interface but different behavior |
| 7 | T4 | Mixin Pattern | Implement a mixin that adds behavior to multiple classes |
| 8 | T5 | Class System | Design a complete class hierarchy from a problem description |

**Count: 8 (T2: 3, T3: 2, T4: 2, T5: 1)**

### 7.7 Mixed Practice
> Tags: `practice`, `objects`, `classes`, `mixed`

| # | Tier | Title (example) | Description |
|---|------|-----------------|-------------|
| 1 | T2 | Inventory Tracker | Object with add/remove/search product methods |
| 2 | T3 | Student Gradebook | Class managing students and their grades |
| 3 | T4 | Event Emitter | Build a simple pub/sub system |
| 4 | T5 | Library System | Design a complete library with books, members, and borrowing |

**Count: 4 (T2: 1, T3: 1, T4: 1, T5: 1)**

### Module 7 Total: 49 exercises (T1: 14, T2: 19, T3: 10, T4: 4, T5: 2)

---

## Module 8: DOM & Events

**Goal:** Students connect JavaScript to the browser and build interactive UIs.
**Type:** `js` | **Tiers:** T1–T5 | **Exercises:** 35

### 8.1 DOM Selection — `["dom-manipulation", "selection"]`
> Tags: `dom`, `querySelector`, `getElementById`, `selection`, `beginner`

| # | Tier | Title (example) | Description |
|---|------|-----------------|-------------|
| 1 | T1 | getElementById | Select an element by its ID |
| 2 | T1 | querySelector | Select an element with a CSS selector |
| 3 | T1 | querySelectorAll | Select multiple elements |
| 4 | T2 | Select by Class | Find all elements with a given class |
| 5 | T2 | Parent & Children | Navigate the DOM tree |

**Count: 5 (T1: 3, T2: 2)**

### 8.2 DOM Manipulation — `["dom-manipulation", "manipulation"]`
> Tags: `dom`, `textContent`, `innerHTML`, `classList`, `style`

| # | Tier | Title (example) | Description |
|---|------|-----------------|-------------|
| 1 | T1 | Change Text | Set `textContent` of an element |
| 2 | T1 | Change Style | Modify inline styles via JavaScript |
| 3 | T1 | Add a Class | Use `classList.add()` to toggle a class |
| 4 | T2 | Toggle Class | Use `classList.toggle()` for show/hide |
| 5 | T2 | Set Attributes | Use `setAttribute()` to modify elements |
| 6 | T2 | InnerHTML | Set HTML content of an element (and understand risks) |

**Count: 6 (T1: 3, T2: 3)**

### 8.3 Creating Elements — `["dom-manipulation", "creation"]`
> Tags: `dom`, `createElement`, `appendChild`, `remove`

| # | Tier | Title (example) | Description |
|---|------|-----------------|-------------|
| 1 | T1 | Create Element | Create a new `<p>` and add it to the page |
| 2 | T2 | Create a List | Build a `<ul>` from an array of strings |
| 3 | T2 | Create a Card | Build a card element from data |
| 4 | T3 | Remove Element | Remove an element from the DOM |
| 5 | T3 | Replace Element | Replace one element with another |

**Count: 5 (T1: 1, T2: 2, T3: 2)**

### 8.4 Events — `["dom-manipulation", "events"]`
> Tags: `events`, `addEventListener`, `click`, `submit`, `keyboard`

| # | Tier | Title (example) | Description |
|---|------|-----------------|-------------|
| 1 | T1 | Click Handler | Add a click listener that changes text |
| 2 | T1 | Button Counter | Count button clicks and display the count |
| 3 | T2 | Event Object | Access `event.target` and `event.type` |
| 4 | T2 | Keyboard Events | Listen for keydown and display the pressed key |
| 5 | T2 | Form Submit | Prevent default form submission and read input values |
| 6 | T3 | Event Delegation | Use a single listener on a parent for dynamic children |
| 7 | T3 | Input Validation | Validate form fields on blur/input events |

**Count: 7 (T1: 2, T2: 3, T3: 2)**

### 8.5 Interactive Projects
> Tags: `dom`, `interactive`, `project`

| # | Tier | Title (example) | Description |
|---|------|-----------------|-------------|
| 1 | T2 | Color Changer | Button clicks cycle through background colors |
| 2 | T2 | Character Counter | Display remaining characters as user types |
| 3 | T3 | Todo Adder | Add items to a visible list from an input |
| 4 | T3 | Accordion | Click headings to expand/collapse content sections |
| 5 | T4 | Dynamic Table | Build a table from data, with sort on header click |
| 6 | T4 | Tabs Component | Clickable tabs that show/hide content panels |
| 7 | T4 | Modal Dialog | Open/close a modal with overlay and Escape key support |
| 8 | T4 | Form Wizard | Multi-step form with next/back navigation |
| 9 | T5 | Todo App | Full CRUD todo list with add, delete, toggle, and filter |

**Count: 9 (T2: 2, T3: 2, T4: 4, T5: 1)**

### Module 8 Total: 32 exercises (T1: 9, T2: 12, T3: 6, T4: 4, T5: 1)

---

## Module 9: Intermediate JavaScript

**Goal:** Students deepen their JS knowledge with ES6+ features, async patterns, and error handling.
**Type:** `js` | **Tiers:** T2–T5 | **Exercises:** 45

### 9.1 ES6+ Features — `["es6-plus", "spread-rest"]` / `["es6-plus", "modules"]`
> Tags: `es6`, `spread`, `rest`, `modules`

| # | Tier | Title (example) | Description |
|---|------|-----------------|-------------|
| 1 | T1 | Spread Array | Copy and merge arrays with spread |
| 2 | T1 | Spread Object | Copy and merge objects with spread |
| 3 | T2 | Rest Parameters | Collect remaining arguments with `...args` |
| 4 | T2 | Spread in Function Calls | Pass array elements as individual arguments |
| 5 | T2 | Optional Chaining | Safely access nested properties with `?.` |
| 6 | T2 | Nullish Coalescing | Use `??` for default values |
| 7 | T3 | Module Pattern | Structure code with import/export patterns (conceptual) |

**Count: 7 (T1: 2, T2: 4, T3: 1)**

### 9.2 Error Handling
> Tags: `try-catch`, `errors`, `throw`, `custom-errors`

| # | Tier | Title (example) | Description |
|---|------|-----------------|-------------|
| 1 | T1 | Try/Catch | Wrap risky code in try/catch and return the error message |
| 2 | T2 | Throw an Error | Validate input and throw descriptive errors |
| 3 | T2 | Error Types | Distinguish TypeError, RangeError, ReferenceError |
| 4 | T2 | Finally Block | Use `finally` for cleanup logic |
| 5 | T3 | Custom Error Class | Create a custom error class extending Error |
| 6 | T3 | Defensive Functions | Write functions that validate all inputs gracefully |

**Count: 6 (T1: 1, T2: 3, T3: 2)**

### 9.3 Async & Promises — `["es6-plus", "async"]`
> Tags: `promises`, `async`, `await`, `fetch`, `callbacks`

| # | Tier | Title (example) | Description |
|---|------|-----------------|-------------|
| 1 | T2 | Create a Promise | Construct a Promise that resolves/rejects |
| 2 | T2 | .then() and .catch() | Handle promise resolution and rejection |
| 3 | T2 | Async/Await Basics | Rewrite `.then()` chains as async/await |
| 4 | T2 | Fetch Pattern | Write a function that fetches data and returns parsed JSON |
| 5 | T3 | Sequential Async | Await multiple operations in sequence |
| 6 | T3 | Promise.all | Run multiple async operations in parallel |
| 7 | T3 | Error Handling in Async | Use try/catch with async/await |
| 8 | T4 | Promise.race & allSettled | Use advanced Promise combinators |
| 9 | T4 | Retry Logic | Build a function that retries a failing async operation |

**Count: 9 (T2: 4, T3: 3, T4: 2)**

### 9.4 Regular Expressions — `["regex", "basics"]` / `["regex", "patterns"]`
> Tags: `regex`, `pattern-matching`, `validation`

| # | Tier | Title (example) | Description |
|---|------|-----------------|-------------|
| 1 | T2 | Test a Pattern | Use `.test()` to check for a match |
| 2 | T2 | Match Digits | Write a regex to match phone number digits |
| 3 | T2 | Character Classes | Use `[a-z]`, `\d`, `\w`, `\s` |
| 4 | T3 | Quantifiers | Use `+`, `*`, `?`, `{n,m}` for repetition |
| 5 | T3 | Anchors & Groups | Use `^`, `$`, `()` for structured patterns |
| 6 | T3 | Email Validator | Write a regex to validate email format |
| 7 | T4 | Extract with Capture Groups | Use `.match()` and capture groups to extract data |

**Count: 7 (T2: 3, T3: 3, T4: 1)**

### 9.5 Algorithms & Patterns — `["algorithms", "patterns"]` / `["algorithms", "recursion"]`
> Tags: `algorithms`, `recursion`, `problem-solving`

| # | Tier | Title (example) | Description |
|---|------|-----------------|-------------|
| 1 | T2 | Frequency Counter | Count occurrences of each element |
| 2 | T2 | Two Sum | Find two numbers that add to a target |
| 3 | T3 | Recursion Basics | Write a recursive countdown function |
| 4 | T3 | Recursive Sum | Sum an array recursively |
| 5 | T3 | Fibonacci | Calculate nth Fibonacci number |
| 6 | T3 | Factorial | Calculate factorial recursively and iteratively |
| 7 | T4 | Binary Search | Implement binary search on a sorted array |
| 8 | T4 | Merge Sort | Implement merge sort |
| 9 | T5 | Dynamic Programming | Solve a classic DP problem (coin change, staircase) |
| 10 | T5 | Recursive Tree | Traverse/transform a tree structure |

**Count: 10 (T2: 2, T3: 4, T4: 2, T5: 2)**

### 9.6 Testing Concepts — `["testing", "fundamentals"]` / `["testing", "assertions"]`
> Tags: `testing`, `assertions`, `tdd`

| # | Tier | Title (example) | Description |
|---|------|-----------------|-------------|
| 1 | T2 | Write an Assertion | Write functions that check expected vs actual values |
| 2 | T2 | Edge Cases | Identify and test edge cases for a given function |
| 3 | T3 | Test Suite | Write a set of test assertions for a provided function |
| 4 | T3 | Test-Driven Fix | Given failing tests, fix the implementation |
| 5 | T4 | Mock Function | Create a simple mock that tracks calls |
| 6 | T5 | Test Framework | Build a minimal test runner (describe/it/expect) |

**Count: 6 (T2: 2, T3: 2, T4: 1, T5: 1)**

### Module 9 Total: 45 exercises (T1: 3, T2: 18, T3: 15, T4: 6, T5: 3)

---

## Module 10: Server Concepts (Vanilla JS)

**Goal:** Students learn server-side thinking (routing, middleware, APIs, data modeling) as pure JS patterns — no Express/Mongoose dependencies.
**Type:** `js` | **Tiers:** T1–T5 | **Exercises:** 40

### 10.1 HTTP Concepts — `["server-concepts", "http"]`
> Tags: `http`, `request`, `response`, `status-codes`, `methods`

| # | Tier | Title (example) | Description |
|---|------|-----------------|-------------|
| 1 | T1 | Status Codes | Write a function that returns the meaning of common status codes |
| 2 | T1 | HTTP Methods | Identify which HTTP method fits each CRUD operation |
| 3 | T1 | Request Object | Create an object representing an HTTP request |
| 4 | T2 | Response Builder | Write a function that builds a response object with status, headers, body |
| 5 | T2 | Content Types | Return correct `Content-Type` for file extensions |
| 6 | T2 | Parse URL | Extract path, query params from a URL string |

**Count: 6 (T1: 3, T2: 3)**

### 10.2 Routing — `["server-concepts", "routing"]`
> Tags: `routing`, `path-matching`, `parameters`, `dispatch`

| # | Tier | Title (example) | Description |
|---|------|-----------------|-------------|
| 1 | T1 | Simple Router | Match a path string to a handler function |
| 2 | T2 | Method + Path | Route based on both method and path |
| 3 | T2 | Route Parameters | Extract `:id` from a path like `/users/:id` |
| 4 | T2 | Query String Parsing | Parse `?key=value&foo=bar` into an object |
| 5 | T3 | Route Table | Build a router that registers and dispatches multiple routes |
| 6 | T3 | 404 Handling | Return a not-found response for unmatched routes |
| 7 | T4 | Parameterized Router | Build a router supporting `/users/:id/posts/:postId` patterns |

**Count: 7 (T1: 1, T2: 3, T3: 2, T4: 1)**

### 10.3 Middleware — `["server-concepts", "middleware"]`
> Tags: `middleware`, `pipeline`, `next`, `request-processing`

| # | Tier | Title (example) | Description |
|---|------|-----------------|-------------|
| 1 | T2 | Logger Middleware | Write a function that logs request info and calls `next()` |
| 2 | T2 | Auth Check | Write middleware that checks for an `authorization` property |
| 3 | T3 | Middleware Chain | Compose multiple middleware functions into a pipeline |
| 4 | T3 | Error Middleware | Write middleware that catches errors from previous handlers |
| 5 | T4 | Middleware Engine | Build a `use()` / `handle()` system that runs middleware in order |

**Count: 5 (T2: 2, T3: 2, T4: 1)**

### 10.4 API Design — `["server-concepts", "api-design"]`
> Tags: `rest`, `crud`, `api`, `json`, `endpoints`

| # | Tier | Title (example) | Description |
|---|------|-----------------|-------------|
| 1 | T1 | CRUD Functions | Write create, read, update, delete functions for an in-memory array |
| 2 | T2 | REST Naming | Given a resource, return correct REST endpoint paths |
| 3 | T2 | JSON Response | Write functions that return properly formatted API responses |
| 4 | T2 | Pagination | Add `page` and `limit` support to a list function |
| 5 | T3 | Validation Middleware | Validate request body before processing |
| 6 | T3 | Error Responses | Return appropriate status codes for different error types |
| 7 | T4 | Full CRUD API | Build a complete in-memory REST API for a resource |

**Count: 7 (T1: 1, T2: 3, T3: 2, T4: 1)**

### 10.5 Data Modeling — `["server-concepts", "data-modeling"]`
> Tags: `schema`, `validation`, `types`, `defaults`, `models`

| # | Tier | Title (example) | Description |
|---|------|-----------------|-------------|
| 1 | T1 | Define a Schema | Create an object describing required fields and their types |
| 2 | T1 | Validate Types | Check if a data object matches a schema's type requirements |
| 3 | T2 | Required Fields | Validate that all required fields are present |
| 4 | T2 | Default Values | Apply default values for missing fields |
| 5 | T2 | Nested Schema | Validate nested objects against nested schemas |
| 6 | T3 | Custom Validators | Add min/max, enum, and pattern validators to a schema |
| 7 | T3 | Relationships | Model a one-to-many relationship with ID references |

**Count: 7 (T1: 2, T2: 3, T3: 2)**

### 10.6 Queries & Data Operations — `["server-concepts", "queries"]`
> Tags: `queries`, `filter`, `sort`, `project`, `aggregate`

| # | Tier | Title (example) | Description |
|---|------|-----------------|-------------|
| 1 | T2 | Find by ID | Write a function that finds an object by ID in an array |
| 2 | T2 | Filter by Property | Find all objects matching a condition |
| 3 | T2 | Sort Results | Sort an array of objects by a specified field |
| 4 | T3 | Projection | Return objects with only specified fields |
| 5 | T3 | Aggregation Pipeline | Chain filter → sort → project → limit operations |
| 6 | T4 | Query Builder | Build a chainable query interface (`.where().sort().limit()`) |
| 7 | T5 | In-Memory Database | Build a collection class with full CRUD + query support |
| 8 | T5 | Indexed Queries | Add index-based lookups for faster searching |

**Count: 8 (T2: 3, T3: 2, T4: 1, T5: 2)**

### Module 10 Total: 40 exercises (T1: 7, T2: 17, T3: 10, T4: 4, T5: 2)

---

## Module 11: Component Patterns (Vanilla JS)

**Goal:** Students learn functional component thinking (props, state, rendering, composition) as pure JS — no React dependency.
**Type:** `js` | **Tiers:** T1–T5 | **Exercises:** 35

### 11.1 Functional Components — `["component-patterns", "functional"]`
> Tags: `components`, `functions`, `render`, `virtual-dom`

| # | Tier | Title (example) | Description |
|---|------|-----------------|-------------|
| 1 | T1 | Render a Greeting | Write a function that returns `{ tag: 'h1', text: 'Hello' }` |
| 2 | T1 | Parameterized Render | Function takes a name, returns an element description object |
| 3 | T2 | Nested Elements | Return a parent element with children array |
| 4 | T2 | List Rendering | Map an array to a list of element descriptions |
| 5 | T3 | Component Composition | Combine multiple render functions into a page |

**Count: 5 (T1: 2, T2: 2, T3: 1)**

### 11.2 Props — `["component-patterns", "props"]`
> Tags: `props`, `configuration`, `defaults`, `validation`

| # | Tier | Title (example) | Description |
|---|------|-----------------|-------------|
| 1 | T1 | Props Object | Write a component function that reads from a props object |
| 2 | T2 | Default Props | Apply defaults when props are missing |
| 3 | T2 | Props Validation | Validate that required props are present and correct type |
| 4 | T2 | Children Prop | Handle a `children` array in the props object |
| 5 | T3 | Prop Drilling | Pass props through multiple levels of component functions |
| 6 | T3 | Callback Props | Pass functions as props for event handling |

**Count: 6 (T1: 1, T2: 3, T3: 2)**

### 11.3 State — `["component-patterns", "state"]`
> Tags: `state`, `immutable`, `updates`, `transitions`

| # | Tier | Title (example) | Description |
|---|------|-----------------|-------------|
| 1 | T1 | State Object | Create an initial state and return a copy |
| 2 | T2 | Immutable Update | Update state without mutating the original |
| 3 | T2 | State Transitions | Write functions that transition state based on actions |
| 4 | T2 | Toggle State | Implement a toggle pattern (on/off, open/closed) |
| 5 | T3 | Reducer Pattern | Write a reducer function that handles multiple action types |
| 6 | T3 | State History | Track previous states for undo functionality |
| 7 | T4 | Store Pattern | Build a simple store with getState, dispatch, subscribe |

**Count: 7 (T1: 1, T2: 3, T3: 2, T4: 1)**

### 11.4 Rendering Logic — `["component-patterns", "rendering"]`
> Tags: `conditional-rendering`, `list-rendering`, `templates`

| # | Tier | Title (example) | Description |
|---|------|-----------------|-------------|
| 1 | T2 | Conditional Render | Return different elements based on a condition |
| 2 | T2 | List from Data | Transform an array of data into a list of element descriptions |
| 3 | T3 | Filtered List | Render only items matching a filter condition |
| 4 | T3 | Keyed List | Add unique keys to list items for identification |
| 5 | T4 | Template Engine | Build a function that replaces `{{variable}}` placeholders |
| 6 | T4 | Virtual DOM Diff | Compare two element trees and list the differences |

**Count: 6 (T2: 2, T3: 2, T4: 2)**

### 11.5 Composition & Lifecycle — `["component-patterns", "composition"]` / `["component-patterns", "lifecycle"]`
> Tags: `composition`, `lifecycle`, `setup`, `teardown`, `hooks`

| # | Tier | Title (example) | Description |
|---|------|-----------------|-------------|
| 1 | T2 | Compose Functions | Combine two component functions into one |
| 2 | T3 | Higher-Order Component | Write a function that wraps a component with extra behavior |
| 3 | T3 | Setup/Teardown | Write functions with initialization and cleanup phases |
| 4 | T4 | Custom Hook Pattern | Build a reusable `useCounter()` function that returns state + methods |
| 5 | T5 | Component Framework | Build a mini render engine: component → virtual DOM → string output |
| 6 | T5 | Reactive State | Build a state system where updates trigger re-renders |

**Count: 6 (T2: 1, T3: 2, T4: 1, T5: 2)**

### 11.6 Mixed Practice
> Tags: `practice`, `components`, `full-stack-concepts`

| # | Tier | Title (example) | Description |
|---|------|-----------------|-------------|
| 1 | T2 | User Card Component | Function that takes user data and returns styled element tree |
| 2 | T3 | Form Component | Stateful form with validation, error display, submission |
| 3 | T4 | Data Table Component | Sortable, filterable table from props data |
| 4 | T5 | Mini App | Combine router + state + components into a single-page app pattern |
| 5 | T5 | Chat Widget | Build a chat interface pattern with messages, input, and state |

**Count: 5 (T2: 1, T3: 1, T4: 1, T5: 2)**

### Module 11 Total: 35 exercises (T1: 4, T2: 12, T3: 10, T4: 5, T5: 4)

---

## Module 12: Capstone Projects

**Goal:** Students apply everything from Q1–Q4 in open-ended, multi-concept projects.
**Type:** `js` (some `html-css`) | **Tiers:** T3–T5 | **Exercises:** 20

### 12.1 HTML + CSS Capstones — `["html", "structure"]` / `["css", "layout"]`
> Tags: `capstone`, `html-css`, `project`

| # | Tier | Title (example) | Description |
|---|------|-----------------|-------------|
| 1 | T3 | Restaurant Menu Page | Build a complete styled menu page |
| 2 | T3 | Product Landing Page | Hero, features, testimonials, CTA sections |
| 3 | T4 | Magazine Layout | Multi-column article layout with responsive grid |

**Count: 3 (T3: 2, T4: 1)**

### 12.2 JavaScript Capstones — various categories
> Tags: `capstone`, `javascript`, `project`

| # | Tier | Title (example) | Description |
|---|------|-----------------|-------------|
| 1 | T3 | Calculator Engine | Build arithmetic parser and evaluator |
| 2 | T3 | Quiz Engine | Score a quiz from answers and an answer key |
| 3 | T4 | Task Manager | Full CRUD with categories, priorities, and filtering |
| 4 | T4 | Budget Tracker | Income/expense tracking with balance, categories, summaries |
| 5 | T5 | RPG Combat System | Turn-based combat with stats, abilities, and status effects |
| 6 | T5 | Markdown Parser | Convert a subset of Markdown syntax to HTML strings |

**Count: 6 (T3: 2, T4: 2, T5: 2)**

### 12.3 Full-Stack Concept Capstones — `["server-concepts", *]` / `["component-patterns", *]`
> Tags: `capstone`, `full-stack`, `project`

| # | Tier | Title (example) | Description |
|---|------|-----------------|-------------|
| 1 | T3 | Blog API | Full CRUD for posts with validation and error handling |
| 2 | T3 | User Auth System | Registration, login, token generation (all as pure functions) |
| 3 | T4 | REST API Framework | Composable router + middleware + error handling |
| 4 | T4 | E-Commerce Cart | Cart state management with add/remove/quantity/total |
| 5 | T5 | Social Feed | Posts, comments, likes, feed algorithm — all vanilla JS |
| 6 | T5 | Full-Stack Simulator | Router + middleware + components + state in one system |

**Count: 6 (T3: 2, T4: 2, T5: 2)**

### 12.4 Cross-Discipline Challenges
> Tags: `capstone`, `cross-discipline`, `challenge`

| # | Tier | Title (example) | Description |
|---|------|-----------------|-------------|
| 1 | T2 | Code Translator | Convert simple ES5 to ES6 syntax |
| 2 | T2 | Data Formatter | Transform raw data into display-ready formats |
| 3 | T3 | Test Suite Builder | Write comprehensive tests for a provided module |
| 4 | T4 | Performance Optimizer | Refactor inefficient code for better Big O |
| 5 | T5 | Build Your Own X | Design and implement any system from a spec |

**Count: 5 (T2: 2, T3: 1, T4: 1, T5: 1)**

### Module 12 Total: 20 exercises (T2: 2, T3: 7, T4: 6, T5: 5)

---

## Final Tally

| Module | Topic | Total | T1 | T2 | T3 | T4 | T5 |
|--------|-------|-------|----|----|----|----|-----|
| 1 | HTML Foundations | 64 | 37 | 21 | 6 | 0 | 0 |
| 2 | CSS Foundations | 62 | 32 | 26 | 4 | 0 | 0 |
| 3 | CSS Layout & Responsive | 55 | 17 | 23 | 12 | 2 | 1 |
| 4 | HTML + CSS Integration | 25 | 5 | 10 | 6 | 2 | 2 |
| 5 | JS Fundamentals | 75 | 39 | 27 | 8 | 1 | 0 |
| 6 | Functions & Arrays | 62 | 17 | 26 | 13 | 4 | 2 |
| 7 | Objects & Classes | 49 | 14 | 19 | 10 | 4 | 2 |
| 8 | DOM & Events | 32 | 9 | 12 | 6 | 4 | 1 |
| 9 | Intermediate JS | 45 | 3 | 18 | 15 | 6 | 3 |
| 10 | Server Concepts | 40 | 7 | 17 | 10 | 4 | 2 |
| 11 | Component Patterns | 35 | 4 | 12 | 10 | 5 | 4 |
| 12 | Capstone Projects | 20 | 0 | 2 | 7 | 6 | 5 |
| **TOTAL** | | **564** | **184** | **213** | **107** | **38** | **22** |

### Tier Distribution
- **T1 (Spark):** 184 (32.6%) — massive beginner foundation
- **T2 (Foundations):** 213 (37.8%) — largest tier, bridges to independence
- **T3 (Builder):** 107 (19.0%) — confident practitioners
- **T4 (Architect):** 38 (6.7%) — advanced problem solvers
- **T5 (Mastercraft):** 22 (3.9%) — open-ended mastery

### Type Distribution
- **JS:** ~415 (73.6%) — Modules 5–12
- **HTML:** ~64 (11.3%) — Module 1
- **CSS:** ~60 (10.6%) — Modules 2–3
- **HTML+CSS:** ~25 (4.4%) — Module 4

### Alignment with Edmonds Certificate
- **Q1 (CIS 241 + 245):** Modules 1–4 → HTML + CSS foundations through responsive layout
- **Q2 (CIS 242):** Modules 5–8 → JavaScript fundamentals through DOM interactivity
- **Q3 (CIS 243):** Module 10 → Server-side concepts as vanilla JS
- **Q4 (CIS 244/246):** Module 11 → Component/framework patterns as vanilla JS
- **Throughout:** Module 9 (Intermediate JS) + Module 12 (Capstones)

---

## New Categories to Register

These categories don't exist in the current taxonomy and will need to be created:

```
["html", "text-content"]
["html", "lists"]
["html", "links"]
["html", "media"]
["html", "tables"]
["html", "accessibility"]
["css", "applying-styles"]
["css", "colors"]
["css", "units"]
["css", "display"]
["css", "responsive"]
["js-fundamentals", "types"]
["js-fundamentals", "strings"]
["js-fundamentals", "template-literals"]
["js-fundamentals", "type-coercion"]
["functions", "basics"]
["functions", "parameters"]
["data-structures", "array-methods"]
["data-structures", "array-iteration"]
["data-structures", "reduce"]
["data-structures", "object-methods"]
["data-structures", "nested-data"]
["dom-manipulation", "creation"]
["es6-plus", "spread-rest"]
["server-concepts", "http"]
["server-concepts", "routing"]
["server-concepts", "middleware"]
["server-concepts", "api-design"]
["server-concepts", "data-modeling"]
["server-concepts", "queries"]
["component-patterns", "functional"]
["component-patterns", "props"]
["component-patterns", "state"]
["component-patterns", "rendering"]
["component-patterns", "composition"]
["component-patterns", "lifecycle"]
```

## Next Steps

1. **Review & refine** this outline — adjust exercise counts, add/remove topics
2. **Audit existing exercises** — map current Default Curriculum exercises to modules
3. **Identify reusable exercises** — pull from _uncollected and other collections
4. **Write new exercises** — fill gaps, starting with T1 HTML and CSS (biggest gap)
5. **Build the JSON** — author exercises in the `default-curriculum.json` format
