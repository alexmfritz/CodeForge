const fs = require('fs');
const path = require('path');

const CURRICULUM_FILE = path.join(__dirname, 'collections', 'default-curriculum.json');
const data = JSON.parse(fs.readFileSync(CURRICULUM_FILE, 'utf8'));

// ============================================================
// Section 1: Missing HTML Elements (12 T1, IDs 1265-1276)
// Properties that belong alongside existing T1s but were missing.
// ============================================================

// 1265 — Blockquote Element
data.exercises.push({
  id: 1265,
  title: "Blockquote Element",
  type: "html",
  tier: 1,
  category: ["html", "text"],
  tags: ["html", "blockquote", "cite", "quotes", "beginner"],
  description: "Create a blockquote with a famous quote and a citation using the blockquote and cite elements.",
  instructions: "The `<blockquote>` element is used for longer quotations taken from another source. Inside, you can use a `<p>` tag for the quote text and a `<cite>` element to credit the author.\n\nYour page should have:\n- A `<blockquote>` element\n- A `<p>` inside the blockquote with the text: The only way to do great work is to love what you do.\n- A `<cite>` element inside the blockquote with the text: Steve Jobs\n\nThe `<blockquote>` element is typically indented by the browser and signals that the content is a quotation.",
  starterCode: "<!-- Add a blockquote element -->\n\n  <!-- Add a paragraph inside with a famous quote -->\n\n  <!-- Add a cite element with the author's name -->\n\n",
  solution: "<blockquote>\n  <p>The only way to do great work is to love what you do.</p>\n  <cite>Steve Jobs</cite>\n</blockquote>",
  testRunner: "",
  testCases: [
    { query: "blockquote", assertion: "exists", description: "<blockquote> element exists" },
    { query: "blockquote p", assertion: "exists", description: "<p> inside <blockquote> exists" },
    { query: "blockquote p", assertion: "textContains", value: "great work", description: "<p> contains the quote text" },
    { query: "cite", assertion: "exists", description: "<cite> element exists" },
    { query: "cite", assertion: "textContains", value: "Steve Jobs", description: "<cite> contains the author name" }
  ],
  hints: [
    "A blockquote is a container for quoted content from another source. It can hold paragraphs and a citation inside it.",
    "Nest a `<p>` and a `<cite>` inside a `<blockquote>`. The cite element credits the source of the quote."
  ],
  resources: [
    { label: "W3Schools: HTML Quotations", url: "https://www.w3schools.com/html/html_quotation_elements.asp", description: "HTML quotation and citation elements" },
    { label: "MDN: blockquote", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/blockquote", description: "The blockquote element reference" }
  ],
  solutionGate: 10,
  basePoints: 10
});

// 1266 — Abbreviation Element
data.exercises.push({
  id: 1266,
  title: "Abbreviation Element",
  type: "html",
  tier: 1,
  category: ["html", "text"],
  tags: ["html", "abbr", "title", "accessibility", "beginner"],
  description: "Mark up abbreviations with the abbr element and provide their full form using the title attribute.",
  instructions: "The `<abbr>` element marks an abbreviation or acronym. The `title` attribute provides the full, expanded form that appears when a user hovers over the text.\n\nCreate a paragraph that includes:\n- The text: We use `<abbr>` with `title=\"HyperText Markup Language\"` around the text HTML\n- Another `<abbr>` with `title=\"Cascading Style Sheets\"` around the text CSS\n- Surrounding text such as: We use HTML and CSS to build websites.\n\nThis helps screen readers and users understand what abbreviations mean.",
  starterCode: "<!-- Create a paragraph with abbreviations -->\n<p>\n  <!-- Write a sentence using abbr elements for HTML and CSS -->\n  <!-- Each abbr needs a title attribute with the full form -->\n\n</p>\n",
  solution: "<p>\n  We use <abbr title=\"HyperText Markup Language\">HTML</abbr> and <abbr title=\"Cascading Style Sheets\">CSS</abbr> to build websites.\n</p>",
  testRunner: "",
  testCases: [
    { query: "abbr", assertion: "exists", description: "<abbr> element exists" },
    { assertion: "sourceContains", value: "title=", description: "abbr has a title attribute" },
    { query: "abbr", assertion: "countAtLeast", value: 2, description: "at least 2 <abbr> elements exist" },
    { query: "abbr", assertion: "textContains", value: "HTML", description: "one <abbr> contains the text HTML" },
    { assertion: "sourceContains", value: "HyperText Markup Language", description: "title contains the full form of HTML" }
  ],
  hints: [
    "The abbr element wraps around the short form of a term, and its title attribute holds the full expanded version.",
    "Write `<abbr title=\"Full Form\">SHORT</abbr>` for each abbreviation. Make sure each abbr has its own title attribute."
  ],
  resources: [
    { label: "W3Schools: HTML Abbreviation", url: "https://www.w3schools.com/tags/tag_abbr.asp", description: "The abbr element for abbreviations" },
    { label: "MDN: abbr", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/abbr", description: "The abbr element reference" }
  ],
  solutionGate: 10,
  basePoints: 10
});

// 1267 — Time Element
data.exercises.push({
  id: 1267,
  title: "Time Element",
  type: "html",
  tier: 1,
  category: ["html", "text"],
  tags: ["html", "time", "datetime", "semantic", "beginner"],
  description: "Mark up dates and times using the time element with the datetime attribute for machine-readable values.",
  instructions: "The `<time>` element represents a specific date or time. The `datetime` attribute provides a machine-readable format while the visible text can be human-friendly.\n\nCreate a paragraph with:\n- The text: The event starts on\n- A `<time>` element with `datetime=\"2024-01-01\"` displaying January 1, 2024\n- The text: and ends on\n- A `<time>` element with `datetime=\"2024-01-05\"` displaying January 5, 2024\n\nSearch engines and assistive technologies use the datetime attribute to understand the exact date.",
  starterCode: "<!-- Create a paragraph with time elements -->\n<p>\n  <!-- Write a sentence with two time elements -->\n  <!-- Each time element needs a datetime attribute -->\n\n</p>\n",
  solution: "<p>\n  The event starts on <time datetime=\"2024-01-01\">January 1, 2024</time> and ends on <time datetime=\"2024-01-05\">January 5, 2024</time>.\n</p>",
  testRunner: "",
  testCases: [
    { query: "time", assertion: "exists", description: "<time> element exists" },
    { assertion: "sourceMatch", value: "datetime=", description: "time element has a datetime attribute" },
    { query: "time", assertion: "countAtLeast", value: 2, description: "at least 2 <time> elements exist" },
    { query: "time", assertion: "textContains", value: "January", description: "time element displays a human-readable date" },
    { assertion: "sourceMatch", value: "2024-01-0[15]", description: "datetime attribute uses ISO date format" }
  ],
  hints: [
    "The time element wraps around a human-readable date or time. Its datetime attribute holds the same information in a standardized format.",
    "Use `<time datetime=\"YYYY-MM-DD\">Readable Date</time>` for each date. The datetime value follows ISO 8601 format."
  ],
  resources: [
    { label: "W3Schools: HTML time", url: "https://www.w3schools.com/tags/tag_time.asp", description: "The time element for dates and times" },
    { label: "MDN: time", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/time", description: "The time element reference" }
  ],
  solutionGate: 10,
  basePoints: 10
});

// 1268 — Address Element
data.exercises.push({
  id: 1268,
  title: "Address Element",
  type: "html",
  tier: 1,
  category: ["html", "text"],
  tags: ["html", "address", "contact", "semantic", "beginner"],
  description: "Display contact information using the address element for semantic meaning.",
  instructions: "The `<address>` element indicates that the enclosed content is contact information for a person, organization, or page. Browsers typically render it in italics.\n\nCreate an `<address>` element that contains:\n- A name on the first line (for example: Jane Smith)\n- A `<br>` to create a line break\n- A street address (for example: 123 Main Street)\n- A `<br>` to create another line break\n- A city, state, and zip (for example: Seattle, WA 98101)\n\nThe address element should only be used for actual contact information, not physical addresses in general content.",
  starterCode: "<!-- Create an address block with contact information -->\n<!-- Include a name, street, and city on separate lines -->\n\n",
  solution: "<address>\n  Jane Smith<br>\n  123 Main Street<br>\n  Seattle, WA 98101\n</address>",
  testRunner: "",
  testCases: [
    { query: "address", assertion: "exists", description: "<address> element exists" },
    { query: "address", assertion: "textContains", value: "Street", description: "address contains a street name" },
    { query: "address br", assertion: "exists", description: "address uses <br> for line breaks" },
    { query: "address", assertion: "textContains", value: "WA", description: "address contains a state abbreviation" }
  ],
  hints: [
    "The address element is a semantic container specifically for contact information. It can hold any inline content including text and line breaks.",
    "Place your name, street, and city inside `<address>` tags. Use `<br>` between each line to create separate lines."
  ],
  resources: [
    { label: "W3Schools: HTML address", url: "https://www.w3schools.com/tags/tag_address.asp", description: "The address element for contact info" },
    { label: "MDN: address", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/address", description: "The address element reference" }
  ],
  solutionGate: 10,
  basePoints: 10
});

// 1269 — Details and Summary
data.exercises.push({
  id: 1269,
  title: "Details and Summary",
  type: "html",
  tier: 1,
  category: ["html", "interactive"],
  tags: ["html", "details", "summary", "collapsible", "interactive", "beginner"],
  description: "Create collapsible content sections using the details and summary elements.",
  instructions: "The `<details>` element creates a collapsible section that the user can open and close. The `<summary>` element provides the clickable title that is always visible.\n\nCreate two collapsible FAQ items:\n\n1. First `<details>` element:\n   - `<summary>` with text: What is HTML?\n   - `<p>` with text: HTML stands for HyperText Markup Language. It is the standard language for creating web pages.\n\n2. Second `<details>` element:\n   - `<summary>` with text: What is CSS?\n   - `<p>` with text: CSS stands for Cascading Style Sheets. It controls how HTML elements look on screen.\n\nNo JavaScript is needed. The browser handles the open/close behavior automatically.",
  starterCode: "<!-- Create the first collapsible FAQ item -->\n<details>\n  <!-- Add a summary with the question -->\n\n  <!-- Add a paragraph with the answer -->\n\n</details>\n\n<!-- Create the second collapsible FAQ item -->\n<details>\n  <!-- Add a summary with the question -->\n\n  <!-- Add a paragraph with the answer -->\n\n</details>\n",
  solution: "<details>\n  <summary>What is HTML?</summary>\n  <p>HTML stands for HyperText Markup Language. It is the standard language for creating web pages.</p>\n</details>\n\n<details>\n  <summary>What is CSS?</summary>\n  <p>CSS stands for Cascading Style Sheets. It controls how HTML elements look on screen.</p>\n</details>",
  testRunner: "",
  testCases: [
    { query: "details", assertion: "exists", description: "<details> element exists" },
    { query: "summary", assertion: "exists", description: "<summary> element exists" },
    { query: "details", assertion: "countAtLeast", value: 2, description: "at least 2 <details> elements exist" },
    { query: "details p", assertion: "exists", description: "<p> inside <details> exists" },
    { query: "summary", assertion: "textContains", value: "What", description: "summary contains a question" }
  ],
  hints: [
    "The details element is a container that can be opened and closed. The summary element inside it acts as the visible heading.",
    "Each FAQ item is a `<details>` containing a `<summary>` for the question and a `<p>` for the answer."
  ],
  resources: [
    { label: "W3Schools: HTML details", url: "https://www.w3schools.com/tags/tag_details.asp", description: "The details and summary elements" },
    { label: "MDN: details", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/details", description: "The details disclosure element" }
  ],
  solutionGate: 10,
  basePoints: 10
});

// 1270 — Description List
data.exercises.push({
  id: 1270,
  title: "Description List",
  type: "html",
  tier: 1,
  category: ["html", "lists"],
  tags: ["html", "dl", "dt", "dd", "lists", "glossary", "beginner"],
  description: "Create a glossary-style list of terms and definitions using the dl, dt, and dd elements.",
  instructions: "The `<dl>` element creates a description list. Inside it, `<dt>` defines a term and `<dd>` provides its description. This is perfect for glossaries, metadata, and key-value pairs.\n\nCreate a description list with three HTML terms:\n\n1. `<dt>` with text: Tag\n   `<dd>` with text: A keyword surrounded by angle brackets, like &lt;p&gt; or &lt;h1&gt;.\n\n2. `<dt>` with text: Element\n   `<dd>` with text: A complete unit made of an opening tag, content, and closing tag.\n\n3. `<dt>` with text: Attribute\n   `<dd>` with text: Extra information added to an opening tag, like class or id.\n\nDescription lists group related terms with their definitions, unlike ordered or unordered lists.",
  starterCode: "<!-- Create a description list -->\n<dl>\n  <!-- Add a term with dt and its definition with dd -->\n\n  <!-- Add a second term and definition -->\n\n  <!-- Add a third term and definition -->\n\n</dl>\n",
  solution: "<dl>\n  <dt>Tag</dt>\n  <dd>A keyword surrounded by angle brackets, like &lt;p&gt; or &lt;h1&gt;.</dd>\n\n  <dt>Element</dt>\n  <dd>A complete unit made of an opening tag, content, and closing tag.</dd>\n\n  <dt>Attribute</dt>\n  <dd>Extra information added to an opening tag, like class or id.</dd>\n</dl>",
  testRunner: "",
  testCases: [
    { query: "dl", assertion: "exists", description: "<dl> element exists" },
    { query: "dt", assertion: "countAtLeast", value: 3, description: "at least 3 <dt> elements exist" },
    { query: "dd", assertion: "countAtLeast", value: 3, description: "at least 3 <dd> elements exist" },
    { query: "dt", assertion: "textContains", value: "Tag", description: "a <dt> contains the term Tag" },
    { query: "dd", assertion: "textContains", value: "keyword", description: "a <dd> contains a definition" }
  ],
  hints: [
    "A description list uses three elements: dl as the container, dt for each term, and dd for each definition that follows.",
    "Inside `<dl>`, pair each `<dt>` with a `<dd>` directly after it. You need at least three pairs."
  ],
  resources: [
    { label: "W3Schools: HTML dl", url: "https://www.w3schools.com/tags/tag_dl.asp", description: "The description list element" },
    { label: "MDN: dl", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dl", description: "The description list element reference" }
  ],
  solutionGate: 10,
  basePoints: 10
});

// 1271 — Figure and Figcaption
data.exercises.push({
  id: 1271,
  title: "Figure and Figcaption",
  type: "html",
  tier: 1,
  category: ["html", "media"],
  tags: ["html", "figure", "figcaption", "images", "semantic", "beginner"],
  description: "Wrap an image with a caption using the figure and figcaption elements.",
  instructions: "The `<figure>` element wraps self-contained content like images, diagrams, or code snippets. The `<figcaption>` element provides a visible caption.\n\nCreate a figure with:\n- A `<figure>` element\n- An `<img>` inside with `src=\"photo.jpg\"` and `alt=\"A sunset\"`\n- A `<figcaption>` with the text: A beautiful sunset over the ocean\n\nUsing `<figure>` and `<figcaption>` together gives the image and its caption a semantic relationship that screen readers can announce.",
  starterCode: "<!-- Create a figure element -->\n<figure>\n  <!-- Add an image with src and alt -->\n\n  <!-- Add a figcaption with a description -->\n\n</figure>\n",
  solution: "<figure>\n  <img src=\"photo.jpg\" alt=\"A sunset\">\n  <figcaption>A beautiful sunset over the ocean</figcaption>\n</figure>",
  testRunner: "",
  testCases: [
    { query: "figure", assertion: "exists", description: "<figure> element exists" },
    { query: "figure img", assertion: "exists", description: "<img> inside <figure> exists" },
    { query: "figcaption", assertion: "exists", description: "<figcaption> element exists" },
    { query: "figcaption", assertion: "textContains", value: "sunset", description: "<figcaption> contains descriptive text" },
    { assertion: "sourceContains", value: "alt=", description: "image has an alt attribute" }
  ],
  hints: [
    "The figure element is a semantic container for media content. The figcaption element inside it adds a visible caption.",
    "Place an `<img>` and a `<figcaption>` inside a `<figure>`. The img needs both src and alt attributes."
  ],
  resources: [
    { label: "W3Schools: HTML figure", url: "https://www.w3schools.com/tags/tag_figure.asp", description: "The figure and figcaption elements" },
    { label: "MDN: figure", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/figure", description: "The figure element reference" }
  ],
  solutionGate: 10,
  basePoints: 10
});

// 1272 — Select Dropdown
data.exercises.push({
  id: 1272,
  title: "Select Dropdown",
  type: "html",
  tier: 1,
  category: ["html", "forms"],
  tags: ["html", "select", "option", "forms", "dropdown", "beginner"],
  description: "Create a dropdown menu using the select element with multiple option elements.",
  instructions: "The `<select>` element creates a dropdown menu. Inside it, `<option>` elements define the choices available. Each option should have a `value` attribute that gets sent with the form.\n\nCreate a labeled dropdown:\n- A `<label>` with `for=\"color\"` and text: Favorite Color:\n- A `<select>` with `id=\"color\"` and `name=\"color\"`\n- At least 4 `<option>` elements with different colors:\n  - An empty first option with text: -- Choose a color --\n  - Red (value=\"red\")\n  - Blue (value=\"blue\")\n  - Green (value=\"green\")\n\nThe first empty option acts as a placeholder prompting the user to make a selection.",
  starterCode: "<!-- Add a label for the dropdown -->\n\n<!-- Create a select dropdown -->\n<select id=\"color\" name=\"color\">\n  <!-- Add a placeholder option -->\n\n  <!-- Add at least 3 color options with value attributes -->\n\n</select>\n",
  solution: "<label for=\"color\">Favorite Color:</label>\n<select id=\"color\" name=\"color\">\n  <option value=\"\">-- Choose a color --</option>\n  <option value=\"red\">Red</option>\n  <option value=\"blue\">Blue</option>\n  <option value=\"green\">Green</option>\n</select>",
  testRunner: "",
  testCases: [
    { query: "select", assertion: "exists", description: "<select> element exists" },
    { query: "option", assertion: "countAtLeast", value: 4, description: "at least 4 <option> elements exist" },
    { assertion: "sourceContains", value: "value=", description: "options have value attributes" },
    { query: "label", assertion: "exists", description: "<label> element exists" },
    { assertion: "sourceContains", value: "for=", description: "label has a for attribute" }
  ],
  hints: [
    "A select element is the container for a dropdown. Each choice inside it is an option element with a value attribute.",
    "Add a `<label>` with a `for` attribute matching the select's `id`. Inside `<select>`, add `<option value=\"...\">Text</option>` for each choice."
  ],
  resources: [
    { label: "W3Schools: HTML select", url: "https://www.w3schools.com/tags/tag_select.asp", description: "The select dropdown element" },
    { label: "MDN: select", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/select", description: "The select element reference" }
  ],
  solutionGate: 10,
  basePoints: 10
});

// 1273 — Textarea Element
data.exercises.push({
  id: 1273,
  title: "Textarea Element",
  type: "html",
  tier: 1,
  category: ["html", "forms"],
  tags: ["html", "textarea", "forms", "input", "beginner"],
  description: "Create a multi-line text input using the textarea element with rows and cols attributes.",
  instructions: "The `<textarea>` element creates a multi-line text input field. Unlike `<input>`, it can accept several lines of text. The `rows` attribute sets the visible height and `cols` sets the visible width.\n\nCreate a labeled textarea:\n- A `<label>` with `for=\"comments\"` and text: Your Comments:\n- A `<textarea>` with:\n  - `id=\"comments\"`\n  - `name=\"comments\"`\n  - `rows=\"5\"`\n  - `cols=\"40\"`\n  - `placeholder=\"Write your comments here...\"`\n\nThe textarea element uses opening and closing tags. Any text between them becomes the default value.",
  starterCode: "<!-- Add a label for the textarea -->\n\n<!-- Create a textarea with rows, cols, and placeholder -->\n\n",
  solution: "<label for=\"comments\">Your Comments:</label>\n<textarea id=\"comments\" name=\"comments\" rows=\"5\" cols=\"40\" placeholder=\"Write your comments here...\"></textarea>",
  testRunner: "",
  testCases: [
    { query: "textarea", assertion: "exists", description: "<textarea> element exists" },
    { assertion: "sourceMatch", value: "rows=", description: "textarea has a rows attribute" },
    { assertion: "sourceMatch", value: "cols=", description: "textarea has a cols attribute" },
    { query: "label", assertion: "exists", description: "<label> element exists" },
    { assertion: "sourceContains", value: "placeholder=", description: "textarea has a placeholder attribute" }
  ],
  hints: [
    "A textarea is like an input field but allows multiple lines of text. Its size is controlled by the rows and cols attributes.",
    "Use `<textarea id=\"...\" name=\"...\" rows=\"5\" cols=\"40\" placeholder=\"...\"></textarea>`. Pair it with a `<label>` using the `for` attribute."
  ],
  resources: [
    { label: "W3Schools: HTML textarea", url: "https://www.w3schools.com/tags/tag_textarea.asp", description: "The textarea element for multi-line input" },
    { label: "MDN: textarea", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea", description: "The textarea element reference" }
  ],
  solutionGate: 10,
  basePoints: 10
});

// 1274 — Fieldset and Legend
data.exercises.push({
  id: 1274,
  title: "Fieldset and Legend",
  type: "html",
  tier: 1,
  category: ["html", "forms"],
  tags: ["html", "fieldset", "legend", "forms", "grouping", "beginner"],
  description: "Group related form inputs together using fieldset and legend elements.",
  instructions: "The `<fieldset>` element groups related form controls together and draws a border around them. The `<legend>` element provides a caption for the group.\n\nCreate a fieldset with:\n- A `<fieldset>` element\n- A `<legend>` with text: Personal Information\n- A `<label>` with `for=\"name\"` and text: Name:\n- An `<input>` with `type=\"text\"`, `id=\"name\"`, and `name=\"name\"`\n- A `<label>` with `for=\"email\"` and text: Email:\n- An `<input>` with `type=\"email\"`, `id=\"email\"`, and `name=\"email\"`\n\nFieldsets help organize complex forms and improve accessibility by grouping related fields.",
  starterCode: "<!-- Create a fieldset with a legend -->\n<fieldset>\n  <!-- Add a legend -->\n\n  <!-- Add a label and input for name -->\n\n  <!-- Add a label and input for email -->\n\n</fieldset>\n",
  solution: "<fieldset>\n  <legend>Personal Information</legend>\n  <label for=\"name\">Name:</label>\n  <input type=\"text\" id=\"name\" name=\"name\">\n  <label for=\"email\">Email:</label>\n  <input type=\"email\" id=\"email\" name=\"email\">\n</fieldset>",
  testRunner: "",
  testCases: [
    { query: "fieldset", assertion: "exists", description: "<fieldset> element exists" },
    { query: "legend", assertion: "exists", description: "<legend> element exists" },
    { query: "legend", assertion: "textContains", value: "Personal", description: "<legend> contains descriptive text" },
    { query: "fieldset input", assertion: "countAtLeast", value: 2, description: "at least 2 <input> elements inside <fieldset>" },
    { query: "fieldset label", assertion: "countAtLeast", value: 2, description: "at least 2 <label> elements inside <fieldset>" }
  ],
  hints: [
    "A fieldset is a semantic container that groups form controls. The legend element inside it acts as a visible title for the group.",
    "Place a `<legend>` first inside `<fieldset>`, then add label-input pairs for each form field. Each label needs a `for` attribute matching the input's `id`."
  ],
  resources: [
    { label: "W3Schools: HTML fieldset", url: "https://www.w3schools.com/tags/tag_fieldset.asp", description: "The fieldset and legend elements" },
    { label: "MDN: fieldset", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/fieldset", description: "The fieldset element reference" }
  ],
  solutionGate: 10,
  basePoints: 10
});

// 1275 — Article Element
data.exercises.push({
  id: 1275,
  title: "Article Element",
  type: "html",
  tier: 1,
  category: ["html", "semantic"],
  tags: ["html", "article", "semantic", "structure", "beginner"],
  description: "Structure a blog post as self-contained content using the article element with a heading, paragraph, and time.",
  instructions: "The `<article>` element represents a self-contained piece of content that could be distributed independently, such as a blog post, news story, or forum post.\n\nCreate a blog post using:\n- An `<article>` element\n- An `<h2>` inside the article with text: Learning HTML\n- A `<time>` element with `datetime=\"2024-03-15\"` and text: March 15, 2024\n- A `<p>` inside the article with text: HTML is the foundation of every website. Learning it opens the door to building anything on the web.\n\nThe article element tells browsers and search engines that this content is a complete, independent piece.",
  starterCode: "<!-- Create an article element -->\n<article>\n  <!-- Add a heading -->\n\n  <!-- Add a time element with datetime -->\n\n  <!-- Add a paragraph -->\n\n</article>\n",
  solution: "<article>\n  <h2>Learning HTML</h2>\n  <time datetime=\"2024-03-15\">March 15, 2024</time>\n  <p>HTML is the foundation of every website. Learning it opens the door to building anything on the web.</p>\n</article>",
  testRunner: "",
  testCases: [
    { query: "article", assertion: "exists", description: "<article> element exists" },
    { query: "article h2", assertion: "exists", description: "<h2> inside <article> exists" },
    { query: "article h2", assertion: "textContains", value: "HTML", description: "<h2> contains a topic" },
    { query: "article p", assertion: "exists", description: "<p> inside <article> exists" },
    { query: "article time", assertion: "exists", description: "<time> inside <article> exists" }
  ],
  hints: [
    "An article is a semantic container for content that makes sense on its own, like a blog post or news story.",
    "Inside `<article>`, add an `<h2>` for the title, a `<time>` for the date, and a `<p>` for the body text."
  ],
  resources: [
    { label: "W3Schools: HTML article", url: "https://www.w3schools.com/tags/tag_article.asp", description: "The article element for independent content" },
    { label: "MDN: article", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/article", description: "The article element reference" }
  ],
  solutionGate: 10,
  basePoints: 10
});

// 1276 — Section and Aside
data.exercises.push({
  id: 1276,
  title: "Section and Aside",
  type: "html",
  tier: 1,
  category: ["html", "semantic"],
  tags: ["html", "section", "aside", "semantic", "layout", "beginner"],
  description: "Organize page content into a main section and a sidebar aside using semantic HTML elements.",
  instructions: "The `<section>` element groups related content with a heading. The `<aside>` element holds content that is tangentially related to the main content, like a sidebar or callout box.\n\nCreate:\n1. A `<section>` element with:\n   - An `<h2>` with text: Main Content\n   - A `<p>` with text: This section contains the primary content of the page. It covers the main topic in detail.\n\n2. An `<aside>` element with:\n   - An `<h3>` with text: Related Links\n   - A `<p>` with text: Check out these additional resources for more information.\n\nUsing section and aside helps assistive technologies understand the page layout.",
  starterCode: "<!-- Create a section for main content -->\n<section>\n  <!-- Add a heading and paragraph -->\n\n</section>\n\n<!-- Create an aside for supplementary content -->\n<aside>\n  <!-- Add a heading and paragraph -->\n\n</aside>\n",
  solution: "<section>\n  <h2>Main Content</h2>\n  <p>This section contains the primary content of the page. It covers the main topic in detail.</p>\n</section>\n\n<aside>\n  <h3>Related Links</h3>\n  <p>Check out these additional resources for more information.</p>\n</aside>",
  testRunner: "",
  testCases: [
    { query: "section", assertion: "exists", description: "<section> element exists" },
    { query: "aside", assertion: "exists", description: "<aside> element exists" },
    { query: "section h2", assertion: "exists", description: "<h2> inside <section> exists" },
    { query: "section p", assertion: "exists", description: "<p> inside <section> exists" },
    { query: "aside p", assertion: "exists", description: "<p> inside <aside> exists" }
  ],
  hints: [
    "Section groups thematically related content together. Aside is for content that is related but not essential to the main flow.",
    "Create a `<section>` with an `<h2>` and `<p>` inside, then an `<aside>` with an `<h3>` and `<p>` inside."
  ],
  resources: [
    { label: "W3Schools: HTML section", url: "https://www.w3schools.com/tags/tag_section.asp", description: "The section element for grouping content" },
    { label: "MDN: section", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/section", description: "The section element reference" }
  ],
  solutionGate: 10,
  basePoints: 10
});

// ============================================================
// Section 2: Structure & Text Depth (8 T2, IDs 1277-1284)
// T2 exercises build on T1 concepts with less scaffolding.
// ============================================================

// 1277 — Nested Lists
data.exercises.push({
  id: 1277,
  title: "Nested Lists",
  type: "html",
  tier: 2,
  category: ["html", "lists"],
  tags: ["html", "lists", "ul", "li", "nesting"],
  description: "Build a multi-level navigation menu by nesting unordered lists inside list items.",
  instructions: "Create a navigation menu with nested lists. The outer list represents top-level categories, and inner lists represent sub-items.\n\nBuild an unordered list with at least 3 top-level items. At least 2 of those items should contain their own nested unordered list with sub-items.\n\nFor example, a menu might have:\n- Home\n- Products (with sub-items: Laptops, Tablets, Phones)\n- About (with sub-items: Team, History)\n\nNested lists are placed inside `<li>` elements, after the text content of that item.",
  starterCode: "<!-- Create a nested list structure -->\n",
  solution: "<ul>\n  <li>Home</li>\n  <li>Products\n    <ul>\n      <li>Laptops</li>\n      <li>Tablets</li>\n      <li>Phones</li>\n    </ul>\n  </li>\n  <li>About\n    <ul>\n      <li>Team</li>\n      <li>History</li>\n    </ul>\n  </li>\n</ul>",
  testRunner: "",
  testCases: [
    { query: "ul", assertion: "exists", description: "<ul> element exists" },
    { query: "li ul", assertion: "exists", description: "a nested <ul> exists inside a <li>" },
    { query: "li", assertion: "countAtLeast", value: 6, description: "at least 6 <li> elements exist across all levels" },
    { query: "ul ul", assertion: "exists", description: "a <ul> is nested within another <ul>" },
    { query: "li ul li", assertion: "countAtLeast", value: 2, description: "at least 2 sub-items exist in a nested list" }
  ],
  hints: [
    "A nested list is simply a new list placed inside an existing list item. The inner list goes between the opening and closing tags of the parent li.",
    "After the text of a `<li>`, open a new `<ul>` with its own `<li>` children, then close both the inner `</ul>` and the outer `</li>`."
  ],
  resources: [
    { label: "MDN: ul", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/ul", description: "The unordered list element" },
    { label: "MDN: li", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/li", description: "The list item element" }
  ],
  solutionGate: 10,
  basePoints: 25
});

// 1278 — Table with Colspan and Rowspan
data.exercises.push({
  id: 1278,
  title: "Table with Colspan and Rowspan",
  type: "html",
  tier: 2,
  category: ["html", "tables"],
  tags: ["html", "table", "colspan", "rowspan", "advanced-tables"],
  description: "Create a schedule table that uses colspan and rowspan to merge cells across columns and rows.",
  instructions: "Build a class schedule table that demonstrates merged cells.\n\nYour table should include:\n- A header row with at least 3 column headings (such as Time, Monday, Tuesday)\n- At least one cell using `colspan` to span across multiple columns (such as a lunch break spanning all day columns)\n- At least one cell using `rowspan` to span across multiple rows (such as a double-period class)\n- Use `<th>` for header cells and `<td>` for data cells\n\nThe `colspan` attribute makes a cell span multiple columns. The `rowspan` attribute makes a cell span multiple rows.",
  starterCode: "<!-- Create a table using colspan and rowspan -->\n",
  solution: "<table>\n  <tr>\n    <th>Time</th>\n    <th>Monday</th>\n    <th>Tuesday</th>\n  </tr>\n  <tr>\n    <td>9:00 AM</td>\n    <td rowspan=\"2\">Math (Double Period)</td>\n    <td>English</td>\n  </tr>\n  <tr>\n    <td>10:00 AM</td>\n    <td>Science</td>\n  </tr>\n  <tr>\n    <td>12:00 PM</td>\n    <td colspan=\"2\">Lunch Break</td>\n  </tr>\n</table>",
  testRunner: "",
  testCases: [
    { query: "table", assertion: "exists", description: "<table> element exists" },
    { assertion: "sourceMatch", value: "colspan", description: "a cell uses the colspan attribute" },
    { assertion: "sourceMatch", value: "rowspan", description: "a cell uses the rowspan attribute" },
    { query: "th", assertion: "countAtLeast", value: 3, description: "at least 3 <th> header cells exist" },
    { query: "td", assertion: "countAtLeast", value: 4, description: "at least 4 <td> data cells exist" }
  ],
  hints: [
    "Colspan makes a cell stretch across multiple columns, and rowspan makes it stretch across multiple rows. The surrounding rows need fewer cells to compensate.",
    "Add `colspan=\"2\"` to a td to span 2 columns, or `rowspan=\"2\"` to span 2 rows. Reduce the number of cells in the affected rows accordingly."
  ],
  resources: [
    { label: "MDN: table", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/table", description: "The table element reference" },
    { label: "MDN: td", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/td", description: "The td element with colspan and rowspan" }
  ],
  solutionGate: 10,
  basePoints: 25
});

// 1279 — Complete Form
data.exercises.push({
  id: 1279,
  title: "Complete Form",
  type: "html",
  tier: 2,
  category: ["html", "forms"],
  tags: ["html", "form", "input", "label", "registration"],
  description: "Build a complete registration form with multiple input types, labels, and a submit button.",
  instructions: "Create a registration form that collects user information with proper input types and labels.\n\nYour form should include:\n- A `<form>` element wrapping everything\n- At least 4 labeled inputs using different types:\n  - A text input for the user's name\n  - An email input for their email address\n  - A password input for their password\n  - At least one more input of your choice\n- Each input must have a corresponding `<label>` with a `for` attribute\n- A submit button at the end\n\nUsing the correct input types enables built-in browser validation and shows the right keyboard on mobile devices.",
  starterCode: "<!-- Build a registration form -->\n",
  solution: "<form>\n  <label for=\"name\">Full Name:</label>\n  <input type=\"text\" id=\"name\" name=\"name\">\n\n  <label for=\"email\">Email:</label>\n  <input type=\"email\" id=\"email\" name=\"email\">\n\n  <label for=\"password\">Password:</label>\n  <input type=\"password\" id=\"password\" name=\"password\">\n\n  <label for=\"age\">Age:</label>\n  <input type=\"number\" id=\"age\" name=\"age\">\n\n  <button type=\"submit\">Register</button>\n</form>",
  testRunner: "",
  testCases: [
    { query: "form", assertion: "exists", description: "<form> element exists" },
    { query: "input", assertion: "countAtLeast", value: 4, description: "at least 4 <input> elements exist" },
    { assertion: "sourceContains", value: "type=\"email\"", description: "an email input type is used" },
    { assertion: "sourceContains", value: "type=\"password\"", description: "a password input type is used" },
    { query: "label", assertion: "countAtLeast", value: 4, description: "at least 4 <label> elements exist" },
    { assertion: "sourceMatch", value: "type=\"submit\"|<button", description: "a submit button exists" }
  ],
  hints: [
    "Each input should have a matching label. The label's for attribute must match the input's id attribute to link them together.",
    "Use `type=\"text\"` for names, `type=\"email\"` for emails, and `type=\"password\"` for passwords. End with a `<button type=\"submit\">` or `<input type=\"submit\">`."
  ],
  resources: [
    { label: "MDN: form", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form", description: "The form element reference" },
    { label: "MDN: input", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input", description: "The input element and its types" }
  ],
  solutionGate: 10,
  basePoints: 25
});

// 1280 — Semantic Page Layout
data.exercises.push({
  id: 1280,
  title: "Semantic Page Layout",
  type: "html",
  tier: 2,
  category: ["html", "semantic"],
  tags: ["html", "semantic", "header", "nav", "main", "footer", "layout"],
  description: "Structure a complete web page using semantic HTML5 landmark elements.",
  instructions: "Build a semantic page layout using the major HTML5 landmark elements.\n\nYour page should include:\n- A `<header>` containing an `<h1>` with the site name and a `<nav>` with an unordered list of at least 3 navigation links\n- A `<main>` element containing at least one `<section>` with a heading and paragraph\n- A `<footer>` with copyright text\n\nSemantic elements help search engines understand your page structure and enable screen readers to navigate between sections.",
  starterCode: "<!-- Build a semantic page layout -->\n",
  solution: "<header>\n  <h1>My Website</h1>\n  <nav>\n    <ul>\n      <li><a href=\"#home\">Home</a></li>\n      <li><a href=\"#about\">About</a></li>\n      <li><a href=\"#contact\">Contact</a></li>\n    </ul>\n  </nav>\n</header>\n\n<main>\n  <section>\n    <h2>Welcome</h2>\n    <p>This is the main content area of the page.</p>\n  </section>\n</main>\n\n<footer>\n  <p>Copyright 2024 My Website</p>\n</footer>",
  testRunner: "",
  testCases: [
    { query: "header", assertion: "exists", description: "<header> element exists" },
    { query: "nav", assertion: "exists", description: "<nav> element exists" },
    { query: "main", assertion: "exists", description: "<main> element exists" },
    { query: "footer", assertion: "exists", description: "<footer> element exists" },
    { query: "nav ul", assertion: "exists", description: "<ul> inside <nav> exists" },
    { query: "nav li", assertion: "countAtLeast", value: 3, description: "at least 3 navigation items exist" }
  ],
  hints: [
    "A semantic page typically uses header for the top section, nav for navigation, main for primary content, and footer for the bottom.",
    "Place an `<h1>` and `<nav>` inside `<header>`. The nav should contain a `<ul>` with `<li>` items. Add a `<section>` inside `<main>` and a `<p>` inside `<footer>`."
  ],
  resources: [
    { label: "MDN: Semantic HTML", url: "https://developer.mozilla.org/en-US/docs/Glossary/Semantics#semantics_in_html", description: "Understanding semantic HTML elements" },
    { label: "MDN: main", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/main", description: "The main content element" }
  ],
  solutionGate: 10,
  basePoints: 25
});

// 1281 — Meta Tags and Head
data.exercises.push({
  id: 1281,
  title: "Meta Tags and Head",
  type: "html",
  tier: 2,
  category: ["html", "structure"],
  tags: ["html", "meta", "head", "viewport", "charset", "seo"],
  description: "Set up a complete HTML head section with essential meta tags for character encoding, viewport, and description.",
  instructions: "Build a properly configured `<head>` section that includes all the essential meta tags modern web pages need.\n\nYour head section should include:\n- A `<meta>` tag with `charset=\"UTF-8\"` for character encoding\n- A `<meta>` tag with `name=\"viewport\"` and `content=\"width=device-width, initial-scale=1.0\"` for responsive design\n- A `<title>` element with text: My Web Page\n- A `<meta>` tag with `name=\"description\"` and a `content` attribute describing the page\n\nThese meta tags ensure your page displays correctly across devices and is properly indexed by search engines.",
  starterCode: "<!-- Set up a complete <head> section -->\n",
  solution: "<head>\n  <meta charset=\"UTF-8\">\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n  <title>My Web Page</title>\n  <meta name=\"description\" content=\"A simple web page demonstrating proper HTML head setup.\">\n</head>",
  testRunner: "",
  testCases: [
    { assertion: "sourceMatch", value: "charset", description: "a charset meta tag is present" },
    { assertion: "sourceMatch", value: "viewport", description: "a viewport meta tag is present" },
    { query: "title", assertion: "exists", description: "<title> element exists" },
    { assertion: "sourceMatch", value: "name=\"description\"", description: "a description meta tag is present", flags: "i" },
    { assertion: "sourceContains", value: "width=device-width", description: "viewport includes width=device-width" }
  ],
  hints: [
    "The head section contains metadata about the page. Meta tags are self-closing elements with attributes that provide different kinds of information.",
    "Use `<meta charset=\"UTF-8\">` for encoding, `<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">` for responsive design, and `<meta name=\"description\" content=\"...\">` for SEO."
  ],
  resources: [
    { label: "MDN: head", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/head", description: "The head element reference" },
    { label: "MDN: meta", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta", description: "The meta element for page metadata" }
  ],
  solutionGate: 10,
  basePoints: 25
});

// 1282 — Definition Lists for FAQs
data.exercises.push({
  id: 1282,
  title: "Definition Lists for FAQs",
  type: "html",
  tier: 2,
  category: ["html", "lists"],
  tags: ["html", "dl", "dt", "dd", "faq", "semantic"],
  description: "Create a FAQ page using a heading and a description list to pair questions with their answers.",
  instructions: "Build a FAQ page that uses a description list to semantically pair questions and answers.\n\nYour page should include:\n- An `<h1>` with text: Frequently Asked Questions\n- A `<dl>` element containing at least 3 question-answer pairs\n- Each question should be a `<dt>` element\n- Each answer should be a `<dd>` element\n\nWrite realistic questions and answers about a topic you choose (web development, a product, a service, etc.). Description lists are ideal for FAQs because each question-answer is a natural term-description pair.",
  starterCode: "<!-- Create a FAQ page -->\n",
  solution: "<h1>Frequently Asked Questions</h1>\n<dl>\n  <dt>How do I get started with HTML?</dt>\n  <dd>Start by learning the basic tags like headings, paragraphs, and links. Practice by building simple pages.</dd>\n\n  <dt>Do I need to learn CSS too?</dt>\n  <dd>Yes, CSS controls how your HTML looks. Together they form the foundation of web development.</dd>\n\n  <dt>What tools do I need?</dt>\n  <dd>All you need is a text editor and a web browser. No special software is required to start.</dd>\n</dl>",
  testRunner: "",
  testCases: [
    { query: "dl", assertion: "exists", description: "<dl> element exists" },
    { query: "dt", assertion: "countAtLeast", value: 3, description: "at least 3 <dt> question elements exist" },
    { query: "dd", assertion: "countAtLeast", value: 3, description: "at least 3 <dd> answer elements exist" },
    { query: "h1", assertion: "exists", description: "<h1> heading exists" },
    { query: "h1", assertion: "textContains", value: "Frequently", description: "<h1> contains FAQ heading text" }
  ],
  hints: [
    "A description list is structured as pairs: each dt is followed by one or more dd elements. Think of dt as the question and dd as the answer.",
    "Start with an `<h1>` for the page title, then create a `<dl>` with at least three `<dt>`/`<dd>` pairs containing real questions and answers."
  ],
  resources: [
    { label: "MDN: dl", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dl", description: "The description list element" },
    { label: "MDN: dt", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dt", description: "The description term element" }
  ],
  solutionGate: 10,
  basePoints: 25
});

// 1283 — Input Types Showcase
data.exercises.push({
  id: 1283,
  title: "Input Types Showcase",
  type: "html",
  tier: 2,
  category: ["html", "forms"],
  tags: ["html", "input", "forms", "date", "number", "range", "color"],
  description: "Use specialized HTML5 input types to create a form with date, number, range, and color inputs.",
  instructions: "Create a form that demonstrates specialized HTML5 input types beyond basic text.\n\nYour form should include at least 4 different labeled inputs using these types:\n- `type=\"date\"` for selecting a date\n- `type=\"number\"` for numeric input\n- `type=\"range\"` for a slider\n- `type=\"color\"` for a color picker\n\nEach input must have a corresponding `<label>` element. These specialized types provide built-in UI controls so the user does not need to type values manually.",
  starterCode: "<!-- Create inputs using different HTML5 types -->\n",
  solution: "<form>\n  <label for=\"birthday\">Birthday:</label>\n  <input type=\"date\" id=\"birthday\" name=\"birthday\">\n\n  <label for=\"quantity\">Quantity (1-100):</label>\n  <input type=\"number\" id=\"quantity\" name=\"quantity\" min=\"1\" max=\"100\">\n\n  <label for=\"volume\">Volume:</label>\n  <input type=\"range\" id=\"volume\" name=\"volume\" min=\"0\" max=\"100\">\n\n  <label for=\"favcolor\">Favorite Color:</label>\n  <input type=\"color\" id=\"favcolor\" name=\"favcolor\">\n</form>",
  testRunner: "",
  testCases: [
    { assertion: "sourceContains", value: "type=\"date\"", description: "a date input type is used" },
    { assertion: "sourceContains", value: "type=\"number\"", description: "a number input type is used" },
    { assertion: "sourceContains", value: "type=\"range\"", description: "a range input type is used" },
    { assertion: "sourceContains", value: "type=\"color\"", description: "a color input type is used" },
    { query: "label", assertion: "countAtLeast", value: 4, description: "at least 4 <label> elements exist" }
  ],
  hints: [
    "HTML5 introduced many input types beyond text. Each type tells the browser to show a specialized control like a date picker, slider, or color wheel.",
    "Use `<input type=\"date\">`, `<input type=\"number\">`, `<input type=\"range\">`, and `<input type=\"color\">`, each paired with a `<label>`."
  ],
  resources: [
    { label: "MDN: input", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input", description: "The input element and all its types" },
    { label: "MDN: Input types", url: "https://developer.mozilla.org/en-US/docs/Learn/Forms/HTML5_input_types", description: "HTML5 input types guide" }
  ],
  solutionGate: 10,
  basePoints: 25
});

// 1284 — Ordered List Attributes
data.exercises.push({
  id: 1284,
  title: "Ordered List Attributes",
  type: "html",
  tier: 2,
  category: ["html", "lists"],
  tags: ["html", "ol", "lists", "start", "reversed", "type"],
  description: "Use the start, reversed, and type attributes on ordered lists to customize numbering.",
  instructions: "Create multiple ordered lists that demonstrate different numbering options.\n\nYour page should include at least 2 ordered lists using these attributes:\n- A `<ol>` with the `start` attribute set to a number other than 1 (to begin counting from that number)\n- A `<ol>` with the `reversed` attribute (to count down instead of up)\n- At least one `<ol>` with a `type` attribute (such as `type=\"A\"` for uppercase letters, `type=\"I\"` for Roman numerals, or `type=\"a\"` for lowercase letters)\n\nEach list should have at least 3 items. These attributes give you control over list numbering without CSS.",
  starterCode: "<!-- Create ordered lists with different attributes -->\n",
  solution: "<h2>Countdown</h2>\n<ol start=\"5\" reversed>\n  <li>Launch sequence initiated</li>\n  <li>Systems check complete</li>\n  <li>Engines firing</li>\n  <li>Liftoff approaching</li>\n  <li>Liftoff!</li>\n</ol>\n\n<h2>Outline</h2>\n<ol type=\"I\">\n  <li>Introduction</li>\n  <li>Main Body</li>\n  <li>Conclusion</li>\n</ol>",
  testRunner: "",
  testCases: [
    { query: "ol", assertion: "countAtLeast", value: 2, description: "at least 2 <ol> elements exist" },
    { assertion: "sourceMatch", value: "start=", description: "an ordered list uses the start attribute" },
    { assertion: "sourceMatch", value: "reversed", description: "an ordered list uses the reversed attribute" },
    { assertion: "sourceMatch", value: "type=", description: "an ordered list uses the type attribute" },
    { query: "li", assertion: "countAtLeast", value: 6, description: "at least 6 <li> elements exist across all lists" }
  ],
  hints: [
    "Ordered lists have attributes that control where numbering starts, the direction of counting, and the style of numbers or letters used.",
    "Add `start=\"5\"` to begin at 5, `reversed` to count down, and `type=\"I\"` for Roman numerals or `type=\"A\"` for uppercase letters."
  ],
  resources: [
    { label: "MDN: ol", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/ol", description: "The ordered list element and its attributes" },
    { label: "MDN: ol attributes", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/ol#attributes", description: "start, reversed, and type attributes" }
  ],
  solutionGate: 10,
  basePoints: 25
});

// Write the updated file
fs.writeFileSync(CURRICULUM_FILE, JSON.stringify(data, null, 2) + '\n');

const addedCount = 20;
console.log(`Added ${addedCount} HTML exercises (IDs 1265-1284)`);
console.log(`  Section 1: 12 T1 exercises (IDs 1265-1276) — Missing HTML Elements`);
console.log(`  Section 2: 8 T2 exercises (IDs 1277-1284) — Structure & Text Depth`);
console.log(`Total exercises: ${data.exercises.length}`);
