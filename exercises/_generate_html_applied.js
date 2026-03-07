const fs = require('fs');
const path = require('path');

const CURRICULUM_FILE = path.join(__dirname, 'collections', 'default-curriculum.json');
const data = JSON.parse(fs.readFileSync(CURRICULUM_FILE, 'utf8'));

// ============================================================
// Section 7: Applied HTML (5 T3 + 5 T4, IDs 1310-1319)
// Full-page exercises combining multiple HTML concepts
// ============================================================

// 1310 — Recipe Page
data.exercises.push({
  id: 1310,
  title: "Recipe Page",
  type: "html",
  tier: 3,
  category: ["html", "applied"],
  tags: ["html", "semantic", "lists", "figure", "dl", "article", "header", "footer", "applied"],
  description: "Build a complete recipe page combining semantic elements, lists, and structured content.",
  instructions: "Build a recipe page that combines semantic HTML elements with lists and media.\n\nYour page must include:\n- A `<header>` with a site name (such as `<h1>Tasty Recipes</h1>`) and a `<nav>` element with at least 2 links\n- A `<main>` element containing an `<article>` for the recipe\n- Inside the article:\n  - An `<h1>` or `<h2>` for the recipe title\n  - A `<figure>` containing an `<img>` (with alt text) and a `<figcaption>` describing the dish\n  - A description list (`<dl>`) with at least 3 term/definition pairs for metadata like Prep Time, Cook Time, and Servings\n  - An ordered list (`<ol>`) with at least 5 steps for the cooking instructions\n  - An unordered list (`<ul>`) with at least 5 items for the ingredients\n- A `<footer>` with site information\n\nThe total number of `<li>` elements across both lists must be at least 10.",
  starterCode: "<!-- Build a complete recipe page -->\n",
  solution: "<header>\n  <h1>Tasty Recipes</h1>\n  <nav>\n    <a href=\"/\">Home</a>\n    <a href=\"/recipes\">All Recipes</a>\n    <a href=\"/about\">About</a>\n  </nav>\n</header>\n\n<main>\n  <article>\n    <h2>Classic Tomato Basil Pasta</h2>\n\n    <figure>\n      <img src=\"tomato-pasta.jpg\" alt=\"A bowl of tomato basil pasta topped with fresh basil leaves and grated parmesan\">\n      <figcaption>Classic tomato basil pasta, ready to serve.</figcaption>\n    </figure>\n\n    <dl>\n      <dt>Prep Time</dt>\n      <dd>15 minutes</dd>\n      <dt>Cook Time</dt>\n      <dd>25 minutes</dd>\n      <dt>Servings</dt>\n      <dd>4</dd>\n    </dl>\n\n    <h3>Ingredients</h3>\n    <ul>\n      <li>1 pound spaghetti</li>\n      <li>2 tablespoons olive oil</li>\n      <li>4 cloves garlic, minced</li>\n      <li>1 can (28 oz) crushed tomatoes</li>\n      <li>1 cup fresh basil leaves</li>\n      <li>Salt and pepper to taste</li>\n    </ul>\n\n    <h3>Instructions</h3>\n    <ol>\n      <li>Bring a large pot of salted water to a boil and cook the spaghetti according to package directions until al dente.</li>\n      <li>While the pasta cooks, heat olive oil in a large skillet over medium heat.</li>\n      <li>Add the minced garlic and cook for one minute until fragrant.</li>\n      <li>Pour in the crushed tomatoes and stir. Season with salt and pepper. Simmer for 15 minutes.</li>\n      <li>Drain the pasta and add it to the skillet. Toss to coat evenly with the sauce.</li>\n      <li>Remove from heat, tear the fresh basil leaves over the top, and serve immediately.</li>\n    </ol>\n  </article>\n</main>\n\n<footer>\n  <p>&copy; 2025 Tasty Recipes. All rights reserved.</p>\n</footer>",
  testRunner: "",
  testCases: [
    { query: "article", assertion: "exists", description: "<article> element exists for the recipe" },
    { query: "figure", assertion: "exists", description: "<figure> element exists for the recipe image" },
    { query: "figcaption", assertion: "exists", description: "<figcaption> element exists inside the figure" },
    { query: "dl", assertion: "exists", description: "<dl> description list exists for recipe metadata" },
    { query: "ol", assertion: "exists", description: "<ol> ordered list exists for cooking steps" },
    { query: "ul", assertion: "exists", description: "<ul> unordered list exists for ingredients" },
    { query: "li", assertion: "countAtLeast", value: 10, description: "at least 10 <li> elements exist across both lists" },
    { query: "img", assertion: "exists", description: "<img> element exists for the recipe photo" },
    { query: "header", assertion: "exists", description: "<header> element exists" },
    { query: "footer", assertion: "exists", description: "<footer> element exists" }
  ],
  hints: [
    "Think of the page as a shell (header, main, footer) containing a recipe article. The article uses a figure for the photo, a description list for quick-reference metadata, an ordered list for sequential steps, and an unordered list for ingredients.",
    "Place an article inside main. Inside the article, add a figure with an img and figcaption, a dl with dt/dd pairs, an ol with at least 5 li items for steps, and a ul with at least 5 li items for ingredients."
  ],
  resources: [
    { label: "MDN: dl (description list)", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dl", description: "The description list element for name-value pairs" },
    { label: "MDN: figure", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/figure", description: "The figure element for self-contained media with captions" }
  ],
  solutionGate: 10,
  basePoints: 50
});

// 1311 — Product Comparison Table
data.exercises.push({
  id: 1311,
  title: "Product Comparison Table",
  type: "html",
  tier: 3,
  category: ["html", "applied"],
  tags: ["html", "table", "caption", "scope", "thead", "tbody", "aria-label", "accessibility", "applied"],
  description: "Build an accessible product comparison table with proper header scoping and screen reader support.",
  instructions: "Create a product comparison table that compares 3 products across at least 5 features.\n\nYour table must include:\n- A `<table>` element with an `aria-label` attribute describing the table's purpose for screen readers\n- A `<caption>` element providing a visible title for the table\n- A `<thead>` with a header row containing `<th>` cells with `scope=\"col\"` for each product column (the first column header can be \"Feature\" or similar)\n- A `<tbody>` with at least 5 rows, each starting with a `<th>` element with `scope=\"row\"` for the feature name\n- Use checkmark and cross marks (such as the text characters \\u2713 and \\u2717) to indicate feature availability in each cell\n\nThe table should have at least 4 `<th>` elements in the header row (one for the feature column plus one per product) and at least 6 `<tr>` rows total (1 header + 5 data rows).",
  starterCode: "<!-- Create a product comparison table -->\n",
  solution: "<table aria-label=\"Comparison of three project management tools\">\n  <caption>Project Management Tool Comparison</caption>\n  <thead>\n    <tr>\n      <th scope=\"col\">Feature</th>\n      <th scope=\"col\">TaskFlow</th>\n      <th scope=\"col\">PlanIt</th>\n      <th scope=\"col\">TeamBoard</th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr>\n      <th scope=\"row\">Kanban Boards</th>\n      <td>\u2713</td>\n      <td>\u2713</td>\n      <td>\u2713</td>\n    </tr>\n    <tr>\n      <th scope=\"row\">Time Tracking</th>\n      <td>\u2713</td>\n      <td>\u2717</td>\n      <td>\u2713</td>\n    </tr>\n    <tr>\n      <th scope=\"row\">File Sharing</th>\n      <td>\u2717</td>\n      <td>\u2713</td>\n      <td>\u2713</td>\n    </tr>\n    <tr>\n      <th scope=\"row\">Custom Reports</th>\n      <td>\u2713</td>\n      <td>\u2713</td>\n      <td>\u2717</td>\n    </tr>\n    <tr>\n      <th scope=\"row\">Mobile App</th>\n      <td>\u2713</td>\n      <td>\u2717</td>\n      <td>\u2713</td>\n    </tr>\n  </tbody>\n</table>",
  testRunner: "",
  testCases: [
    { query: "caption", assertion: "exists", description: "<caption> element exists to title the table" },
    { query: "table", assertion: "exists", description: "<table> element exists" },
    { assertion: "sourceMatch", value: "scope=\"col\"", description: "column headers use scope=\"col\"" },
    { assertion: "sourceMatch", value: "scope=\"row\"", description: "row headers use scope=\"row\"" },
    { query: "th", assertion: "countAtLeast", value: 4, description: "at least 4 <th> header elements exist" },
    { query: "tr", assertion: "countAtLeast", value: 6, description: "at least 6 <tr> rows exist (1 header + 5 data)" },
    { assertion: "sourceMatch", value: "aria-label", description: "table has an aria-label attribute for screen readers" }
  ],
  hints: [
    "An accessible comparison table uses scope attributes to associate each header with its column or row. The caption provides a visible title, while aria-label gives screen readers a concise description of the table's purpose.",
    "Create a thead row with th elements using `scope=\"col\"` for each column (Feature + 3 products). In tbody, start each row with a `<th scope=\"row\">` for the feature name, followed by td cells with check or cross marks."
  ],
  resources: [
    { label: "MDN: Table accessibility", url: "https://developer.mozilla.org/en-US/docs/Learn/HTML/Tables/Advanced", description: "Advanced table features including scope and caption" },
    { label: "MDN: th scope attribute", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/th#scope", description: "The scope attribute for header cell associations" }
  ],
  solutionGate: 10,
  basePoints: 50
});

// 1312 — FAQ Accordion
data.exercises.push({
  id: 1312,
  title: "FAQ Accordion",
  type: "html",
  tier: 3,
  category: ["html", "applied"],
  tags: ["html", "details", "summary", "section", "faq", "id", "applied"],
  description: "Build an FAQ page using details and summary elements with semantic structure and direct-link support.",
  instructions: "Create an FAQ page using native HTML disclosure elements for collapsible question/answer pairs.\n\nYour page must include:\n- An `<h1>` title for the FAQ page\n- A `<section>` element wrapping the FAQ content\n- At least 2 `<h2>` headings to divide questions into categories (such as \"General Questions\" and \"Account Questions\")\n- At least 5 `<details>` elements, each containing:\n  - A `<summary>` element with the question text\n  - One or more `<p>` elements inside with the answer\n- Each `<details>` element must have an `id` attribute so individual questions can be linked directly (for example, `id=\"faq-refund-policy\"`)\n\nThe details/summary pattern provides native expand/collapse behavior without JavaScript. Adding id attributes allows users to share direct links to specific questions.",
  starterCode: "<!-- Create an FAQ page with collapsible sections -->\n",
  solution: "<h1>Frequently Asked Questions</h1>\n\n<section>\n  <h2>General Questions</h2>\n\n  <details id=\"faq-what-is\">\n    <summary>What is CodeForge?</summary>\n    <p>CodeForge is an offline-first coding exercise platform designed for classroom environments. It provides structured exercises to help students learn HTML, CSS, and JavaScript.</p>\n  </details>\n\n  <details id=\"faq-get-started\">\n    <summary>How do I get started?</summary>\n    <p>Your instructor will create an account for you. Once logged in, you can browse exercises by topic and difficulty level. Start with Tier 1 exercises and work your way up.</p>\n  </details>\n\n  <details id=\"faq-save-progress\">\n    <summary>Is my progress saved automatically?</summary>\n    <p>Yes, your code and progress are saved automatically as you work. You can close the browser and return later to pick up where you left off.</p>\n  </details>\n\n  <h2>Account Questions</h2>\n\n  <details id=\"faq-reset-password\">\n    <summary>How do I reset my password?</summary>\n    <p>Contact your instructor to have your password reset. For security reasons, only instructors can reset student passwords.</p>\n  </details>\n\n  <details id=\"faq-multiple-devices\">\n    <summary>Can I use multiple devices?</summary>\n    <p>You can log in from any device connected to the classroom network. Your progress syncs across devices through the server.</p>\n  </details>\n</section>",
  testRunner: "",
  testCases: [
    { query: "details", assertion: "countAtLeast", value: 5, description: "at least 5 <details> elements exist for FAQ items" },
    { query: "summary", assertion: "countAtLeast", value: 5, description: "at least 5 <summary> elements exist for questions" },
    { query: "h2", assertion: "countAtLeast", value: 2, description: "at least 2 <h2> headings divide questions into categories" },
    { query: "section", assertion: "exists", description: "<section> element wraps the FAQ content" },
    { assertion: "sourceMatch", value: "id=", description: "details elements have id attributes for direct linking" }
  ],
  hints: [
    "The details element creates a native collapsible widget. The summary element is the clickable heading that toggles visibility. Group related questions under h2 category headings within a section.",
    "Create a section containing h2 category headings followed by details elements. Each details needs a summary (the question) and paragraph content (the answer). Add a unique `id` attribute to each details element."
  ],
  resources: [
    { label: "MDN: details", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/details", description: "The details disclosure element for expandable content" },
    { label: "MDN: summary", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/summary", description: "The summary element as a clickable heading for details" }
  ],
  solutionGate: 10,
  basePoints: 50
});

// 1313 — Contact Page
data.exercises.push({
  id: 1313,
  title: "Contact Page",
  type: "html",
  tier: 3,
  category: ["html", "applied"],
  tags: ["html", "form", "fieldset", "legend", "label", "validation", "address", "mailto", "applied"],
  description: "Build a complete contact page with a validated form, fieldset grouping, and contact information.",
  instructions: "Create a contact page that combines a form with company contact information.\n\nYour page must include:\n- A `<header>` with a site name and a `<nav>` element\n- A `<main>` element containing two sections:\n\n**Section 1 - Contact Form:**\n- A `<form>` element containing a `<fieldset>` with a `<legend>` (such as \"Send Us a Message\")\n- At least 4 `<label>` elements, each paired with an input using matching `for`/`id` attributes\n- A name input with the `required` attribute\n- An email input with `type=\"email\"` for built-in validation\n- A subject input with a `minlength` attribute\n- A `<textarea>` for the message body\n- A submit button\n\n**Section 2 - Contact Information:**\n- An `<address>` element containing the company's contact details\n- A mailto link (an `<a>` element with `href=\"mailto:...\"`) for the email address",
  starterCode: "<!-- Create a contact page with form and information -->\n",
  solution: "<header>\n  <h1>Acme Corporation</h1>\n  <nav>\n    <a href=\"/\">Home</a>\n    <a href=\"/about\">About</a>\n    <a href=\"/contact\">Contact</a>\n  </nav>\n</header>\n\n<main>\n  <section>\n    <h2>Get in Touch</h2>\n    <form>\n      <fieldset>\n        <legend>Send Us a Message</legend>\n\n        <label for=\"name\">Full Name:</label>\n        <input type=\"text\" id=\"name\" name=\"name\" required>\n\n        <label for=\"email\">Email Address:</label>\n        <input type=\"email\" id=\"email\" name=\"email\" required>\n\n        <label for=\"subject\">Subject:</label>\n        <input type=\"text\" id=\"subject\" name=\"subject\" minlength=\"5\">\n\n        <label for=\"message\">Message:</label>\n        <textarea id=\"message\" name=\"message\" rows=\"6\"></textarea>\n\n        <button type=\"submit\">Send Message</button>\n      </fieldset>\n    </form>\n  </section>\n\n  <section>\n    <h2>Our Office</h2>\n    <address>\n      <p>Acme Corporation</p>\n      <p>123 Innovation Drive, Suite 400</p>\n      <p>Seattle, WA 98101</p>\n      <p>Phone: (206) 555-0142</p>\n      <p>Email: <a href=\"mailto:contact@acme.example.com\">contact@acme.example.com</a></p>\n    </address>\n  </section>\n</main>",
  testRunner: "",
  testCases: [
    { query: "form", assertion: "exists", description: "<form> element exists" },
    { query: "fieldset", assertion: "exists", description: "<fieldset> element groups the form fields" },
    { query: "legend", assertion: "exists", description: "<legend> element labels the fieldset" },
    { query: "address", assertion: "exists", description: "<address> element contains contact information" },
    { assertion: "sourceMatch", value: "type=\"email\"", description: "an input uses type=\"email\" for email validation" },
    { assertion: "sourceMatch", value: "required", description: "at least one input uses the required attribute" },
    { assertion: "sourceMatch", value: "mailto:", description: "a mailto link exists for the email address" },
    { query: "label", assertion: "countAtLeast", value: 4, description: "at least 4 <label> elements exist" },
    { query: "textarea", assertion: "exists", description: "<textarea> element exists for the message body" }
  ],
  hints: [
    "A contact page has two distinct parts: a form for sending messages and a section showing the company's contact details. The form uses fieldset and legend to group and label its inputs, while the address element marks up physical contact information.",
    "Create a form with a fieldset and legend. Add label/input pairs using matching `for` and `id` attributes. Include `type=\"email\"` on the email input, `required` on the name field, and `minlength` on the subject. In a separate section, use an address element with a `mailto:` link."
  ],
  resources: [
    { label: "MDN: fieldset", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/fieldset", description: "Grouping form controls with fieldset and legend" },
    { label: "MDN: address", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/address", description: "The address element for contact information" }
  ],
  solutionGate: 10,
  basePoints: 50
});

// 1314 — Portfolio Landing Page
data.exercises.push({
  id: 1314,
  title: "Portfolio Landing Page",
  type: "html",
  tier: 3,
  category: ["html", "applied"],
  tags: ["html", "semantic", "article", "figure", "nav", "section", "address", "portfolio", "applied"],
  description: "Build a portfolio landing page combining semantic structure, navigation, articles, and media elements.",
  instructions: "Create a portfolio landing page that showcases your work using a variety of semantic HTML elements.\n\nYour page must include:\n- A `<header>` with your name as an `<h1>` and a `<nav>` with at least 4 links (such as About, Projects, Skills, Contact)\n- A `<main>` element with at least 3 `<section>` elements:\n\n**About Section:**\n- A heading and a paragraph introducing yourself\n- A `<figure>` containing a profile image (`<img>` with alt text) and a `<figcaption>`\n\n**Projects Section:**\n- At least 3 `<article>` elements, each containing an `<h3>` title, a description paragraph, and a link to the project\n\n**Skills Section:**\n- An unordered list of skills\n\n- A `<footer>` with an `<address>` element for contact information and at least 2 social media links\n\nYour page should have at least 8 `<a>` elements total across navigation, project links, and footer links.",
  starterCode: "<!-- Create a portfolio landing page -->\n",
  solution: "<header>\n  <h1>Jordan Rivera</h1>\n  <nav>\n    <a href=\"#about\">About</a>\n    <a href=\"#projects\">Projects</a>\n    <a href=\"#skills\">Skills</a>\n    <a href=\"#contact\">Contact</a>\n  </nav>\n</header>\n\n<main>\n  <section id=\"about\">\n    <h2>About Me</h2>\n    <figure>\n      <img src=\"profile.jpg\" alt=\"Jordan Rivera smiling at a desk with a laptop and notebook\">\n      <figcaption>Jordan Rivera, Full-Stack Developer</figcaption>\n    </figure>\n    <p>I am a full-stack developer passionate about building accessible and performant web applications. I enjoy solving complex problems and learning new technologies.</p>\n  </section>\n\n  <section id=\"projects\">\n    <h2>Projects</h2>\n    <article>\n      <h3>Weather Dashboard</h3>\n      <p>A responsive weather application that displays forecasts using real-time data from a public API.</p>\n      <a href=\"/projects/weather\">View Project</a>\n    </article>\n    <article>\n      <h3>Task Manager</h3>\n      <p>A productivity tool with drag-and-drop task boards, filters, and progress tracking for teams.</p>\n      <a href=\"/projects/tasks\">View Project</a>\n    </article>\n    <article>\n      <h3>Recipe Finder</h3>\n      <p>A searchable recipe database with ingredient-based filtering and step-by-step cooking guides.</p>\n      <a href=\"/projects/recipes\">View Project</a>\n    </article>\n  </section>\n\n  <section id=\"skills\">\n    <h2>Skills</h2>\n    <ul>\n      <li>HTML &amp; CSS</li>\n      <li>JavaScript</li>\n      <li>React</li>\n      <li>Node.js</li>\n      <li>MongoDB</li>\n    </ul>\n  </section>\n</main>\n\n<footer id=\"contact\">\n  <address>\n    <p>Jordan Rivera</p>\n    <p>Seattle, WA</p>\n    <p>Email: <a href=\"mailto:jordan@example.com\">jordan@example.com</a></p>\n  </address>\n  <nav>\n    <a href=\"https://github.com/jordan\">GitHub</a>\n    <a href=\"https://linkedin.com/in/jordan\">LinkedIn</a>\n  </nav>\n</footer>",
  testRunner: "",
  testCases: [
    { query: "header", assertion: "exists", description: "<header> element exists" },
    { query: "nav", assertion: "exists", description: "<nav> element exists" },
    { query: "main", assertion: "exists", description: "<main> element exists" },
    { query: "footer", assertion: "exists", description: "<footer> element exists" },
    { query: "article", assertion: "countAtLeast", value: 3, description: "at least 3 <article> elements exist for project cards" },
    { query: "figure", assertion: "exists", description: "<figure> element exists for the profile image" },
    { query: "section", assertion: "countAtLeast", value: 3, description: "at least 3 <section> elements exist" },
    { query: "a", assertion: "countAtLeast", value: 8, description: "at least 8 <a> link elements exist across the page" },
    { query: "address", assertion: "exists", description: "<address> element exists in the footer" }
  ],
  hints: [
    "A portfolio page is structured as a header (name + navigation), a main area divided into sections (about, projects, skills), and a footer with contact info. Each project is an independent article with its own heading, description, and link.",
    "Place an h1 and nav in the header. In main, create sections for about (with figure containing img and figcaption), projects (with at least 3 articles each containing h3, p, and a link), and skills (with a ul). In the footer, add an address element and social links."
  ],
  resources: [
    { label: "MDN: article", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/article", description: "The article element for self-contained compositions" },
    { label: "MDN: Document structure", url: "https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/Document_and_website_structure", description: "Planning and structuring an HTML document" }
  ],
  solutionGate: 10,
  basePoints: 50
});

// 1315 — Email Newsletter Template (T4)
data.exercises.push({
  id: 1315,
  title: "Email Newsletter Template",
  type: "html",
  tier: 4,
  category: ["html", "applied"],
  tags: ["html", "table", "email", "layout", "img", "address", "applied"],
  description: "Build an email newsletter using table-based layout with semantic content elements inside table cells.",
  instructions: "Create an HTML email newsletter. Email clients have limited CSS support, so email layouts rely on tables for structure.\n\nYour newsletter must include:\n- A `<table>` element used for the overall layout (email clients require table-based layouts)\n- At least 6 `<td>` cells across the layout\n- At least one `width` attribute on a table or td element to control column sizing (email clients often ignore CSS widths)\n- A header area containing a logo `<img>` element and the newsletter title\n- A main content area with at least 2 content blocks, each containing a headline (such as `<h2>`), a summary paragraph, and a \"Read more\" link\n- A sidebar area with a list of upcoming events or related links\n- A footer area with an unsubscribe link and an `<address>` element with contact information\n- At least 4 `<a>` link elements across the newsletter\n\nUse semantic elements (headings, paragraphs, lists, address) inside the table cells where possible to maintain meaning even within the table layout.",
  starterCode: "",
  solution: "<table width=\"600\" cellpadding=\"0\" cellspacing=\"0\">\n  <tr>\n    <td colspan=\"2\" style=\"padding: 20px;\">\n      <img src=\"logo.png\" alt=\"Monthly Digest newsletter logo\" width=\"120\">\n      <h1>Monthly Digest</h1>\n      <p>Your curated roundup of this month's top stories.</p>\n    </td>\n  </tr>\n  <tr>\n    <td width=\"400\" style=\"padding: 20px; vertical-align: top;\">\n      <article>\n        <h2>New Coding Bootcamp Opens Downtown</h2>\n        <p>A free 12-week coding program has launched to help job seekers transition into tech careers. Applications are now open for the spring cohort.</p>\n        <a href=\"/articles/bootcamp\">Read more</a>\n      </article>\n\n      <article>\n        <h2>Libraries Expand Digital Resources</h2>\n        <p>The county library system has added thousands of e-books and online courses to its catalog, all available with a free library card.</p>\n        <a href=\"/articles/libraries\">Read more</a>\n      </article>\n    </td>\n    <td width=\"200\" style=\"padding: 20px; vertical-align: top;\">\n      <h3>Upcoming Events</h3>\n      <ul>\n        <li>March 15 - Open House</li>\n        <li>March 22 - Career Fair</li>\n        <li>April 5 - Workshop Day</li>\n      </ul>\n    </td>\n  </tr>\n  <tr>\n    <td colspan=\"2\" style=\"padding: 20px;\">\n      <a href=\"/unsubscribe\">Unsubscribe from this newsletter</a>\n      <address>\n        <p>Monthly Digest</p>\n        <p>456 Newsletter Ave, Seattle, WA 98101</p>\n        <p>Email: <a href=\"mailto:digest@example.com\">digest@example.com</a></p>\n      </address>\n    </td>\n  </tr>\n</table>",
  testRunner: "",
  testCases: [
    { query: "table", assertion: "exists", description: "<table> element exists for email layout" },
    { query: "img", assertion: "exists", description: "<img> element exists for the newsletter logo" },
    { query: "a", assertion: "countAtLeast", value: 4, description: "at least 4 <a> link elements exist" },
    { query: "td", assertion: "countAtLeast", value: 6, description: "at least 6 <td> cells exist in the layout" },
    { query: "h2", assertion: "countAtLeast", value: 2, description: "at least 2 <h2> headings exist for content sections" },
    { query: "address", assertion: "exists", description: "<address> element exists in the footer area" },
    { assertion: "sourceMatch", value: "width=", description: "width attribute is used for email-client-compatible sizing" }
  ],
  hints: [
    "Email HTML uses tables for layout because email clients have very limited CSS support. Think of the newsletter as a grid: a full-width header row, a content row split into main and sidebar columns, and a full-width footer row.",
    "Create a table with rows for each area. Use colspan to span the full width for header and footer rows. Put semantic elements like headings, paragraphs, articles, lists, and address inside the td cells. Use the width attribute on table or td elements for sizing."
  ],
  resources: [
    { label: "MDN: table", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/table", description: "The table element and its child elements" },
    { label: "MDN: address", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/address", description: "The address element for contact information" }
  ],
  solutionGate: 10,
  basePoints: 75
});

// 1316 — Accessible Survey Form (T4)
data.exercises.push({
  id: 1316,
  title: "Accessible Survey Form",
  type: "html",
  tier: 4,
  category: ["html", "applied"],
  tags: ["html", "form", "fieldset", "legend", "radio", "checkbox", "select", "optgroup", "textarea", "range", "progress", "aria-required", "accessibility", "applied"],
  description: "Build a comprehensive, accessible multi-section survey form with diverse input types and ARIA attributes.",
  instructions: "Build a complex survey form with full accessibility support.\n\nYour form must include:\n- At least 3 `<fieldset>` elements, each with its own `<legend>` (such as \"Demographics\", \"Feedback\", \"Preferences\")\n- A radio button group with at least 3 options sharing the same `name` attribute (use `type=\"radio\"`)\n- A checkbox group with at least 3 options (use `type=\"checkbox\"`)\n- A `<select>` element containing at least one `<optgroup>` with grouped options\n- A `<textarea>` for open-ended feedback\n- A range input (`type=\"range\"`) with `min` and `max` attributes\n- Every input must have an associated `<label>` element with matching `for`/`id` attributes (at least 8 labels total)\n- At least one input with `aria-required=\"true\"` to indicate a required field for screen readers\n- A `<progress>` element showing survey completion (such as `<progress value=\"0\" max=\"100\">`)\n- A submit button with descriptive text\n\nThe form should demonstrate proper input grouping, label associations, and accessibility attributes throughout.",
  starterCode: "",
  solution: "<h1>User Satisfaction Survey</h1>\n<progress value=\"0\" max=\"100\">0% complete</progress>\n\n<form>\n  <fieldset>\n    <legend>Demographics</legend>\n\n    <label for=\"age-range\">Age Range:</label>\n    <select id=\"age-range\" name=\"age-range\" aria-required=\"true\">\n      <optgroup label=\"Young Adult\">\n        <option value=\"18-24\">18-24</option>\n        <option value=\"25-34\">25-34</option>\n      </optgroup>\n      <optgroup label=\"Adult\">\n        <option value=\"35-44\">35-44</option>\n        <option value=\"45-54\">45-54</option>\n        <option value=\"55+\">55 and over</option>\n      </optgroup>\n    </select>\n\n    <label for=\"occupation\">Occupation:</label>\n    <input type=\"text\" id=\"occupation\" name=\"occupation\">\n  </fieldset>\n\n  <fieldset>\n    <legend>Feedback</legend>\n\n    <p>How would you rate your overall experience?</p>\n    <label for=\"rate-excellent\"><input type=\"radio\" id=\"rate-excellent\" name=\"rating\" value=\"excellent\"> Excellent</label>\n    <label for=\"rate-good\"><input type=\"radio\" id=\"rate-good\" name=\"rating\" value=\"good\"> Good</label>\n    <label for=\"rate-fair\"><input type=\"radio\" id=\"rate-fair\" name=\"rating\" value=\"fair\"> Fair</label>\n    <label for=\"rate-poor\"><input type=\"radio\" id=\"rate-poor\" name=\"rating\" value=\"poor\"> Poor</label>\n\n    <label for=\"satisfaction\">Satisfaction Level (1-10):</label>\n    <input type=\"range\" id=\"satisfaction\" name=\"satisfaction\" min=\"1\" max=\"10\">\n\n    <label for=\"comments\">Additional Comments:</label>\n    <textarea id=\"comments\" name=\"comments\" rows=\"4\"></textarea>\n  </fieldset>\n\n  <fieldset>\n    <legend>Preferences</legend>\n\n    <p>Which features do you use most? (Select all that apply)</p>\n    <label for=\"feat-exercises\"><input type=\"checkbox\" id=\"feat-exercises\" name=\"features\" value=\"exercises\"> Exercises</label>\n    <label for=\"feat-chat\"><input type=\"checkbox\" id=\"feat-chat\" name=\"features\" value=\"chat\"> Chat</label>\n    <label for=\"feat-progress\"><input type=\"checkbox\" id=\"feat-progress\" name=\"features\" value=\"progress\"> Progress Tracking</label>\n\n    <label for=\"contact-pref\">Preferred Contact Method:</label>\n    <input type=\"text\" id=\"contact-pref\" name=\"contact-pref\">\n  </fieldset>\n\n  <button type=\"submit\">Submit Survey</button>\n</form>",
  testRunner: "",
  testCases: [
    { query: "fieldset", assertion: "countAtLeast", value: 3, description: "at least 3 <fieldset> elements group the survey sections" },
    { query: "legend", assertion: "countAtLeast", value: 3, description: "at least 3 <legend> elements label the fieldsets" },
    { assertion: "sourceMatch", value: "type=\"radio\"", description: "radio button inputs exist" },
    { assertion: "sourceMatch", value: "type=\"checkbox\"", description: "checkbox inputs exist" },
    { query: "select", assertion: "exists", description: "<select> element exists" },
    { query: "optgroup", assertion: "exists", description: "<optgroup> element groups select options" },
    { query: "textarea", assertion: "exists", description: "<textarea> element exists for open-ended feedback" },
    { query: "progress", assertion: "exists", description: "<progress> element shows survey completion" },
    { assertion: "sourceMatch", value: "aria-required", description: "at least one input uses aria-required for accessibility" },
    { query: "label", assertion: "countAtLeast", value: 8, description: "at least 8 <label> elements associate with inputs" }
  ],
  hints: [
    "Group related form controls using fieldset and legend. Radio buttons sharing the same name attribute form a mutually exclusive group. Checkboxes allow multiple selections. The select element can organize options into optgroups for logical grouping.",
    "Create three fieldsets with legends. Add radio inputs with the same name attribute for a rating question. Add checkboxes for multi-select features. Include a select with optgroup, a textarea, a range input with min/max, and a progress element. Label every input with a matching for/id pair."
  ],
  resources: [
    { label: "MDN: Form elements", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form", description: "The form element and its associated input types" },
    { label: "MDN: optgroup", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/optgroup", description: "Grouping options within a select element" }
  ],
  solutionGate: 10,
  basePoints: 75
});

// 1317 — Documentation Site Structure (T4)
data.exercises.push({
  id: 1317,
  title: "Documentation Site Structure",
  type: "html",
  tier: 4,
  category: ["html", "applied"],
  tags: ["html", "semantic", "nav", "heading-hierarchy", "pre", "code", "dl", "table", "caption", "scope", "skip-link", "applied"],
  description: "Build a technical documentation page with skip navigation, nested sidebar, code examples, and accessible data tables.",
  instructions: "Create a technical documentation page that combines complex semantic structure with accessibility features.\n\nYour page must include:\n- A skip navigation link as the first element (an `<a>` with `href=\"#...\"` pointing to the main content area's id)\n- A `<header>` with a site title and a search `<form>` (containing an input and a submit button)\n- A sidebar `<nav>` element with nested unordered lists (at least 2 levels deep) for documentation sections\n- A second `<nav>` element elsewhere on the page (such as in the footer for prev/next links)\n- A `<main>` element containing an `<article>` with:\n  - Proper heading hierarchy using `<h1>`, at least 2 `<h2>` headings, and at least 2 `<h3>` headings (no skipped levels)\n  - A code example using `<pre>` and `<code>` elements\n  - A definition list (`<dl>`) for API parameters or terminology\n  - A data `<table>` with a `<caption>` and header cells using `scope` attributes\n- A `<footer>` with navigation links for previous and next pages",
  starterCode: "",
  solution: "<a href=\"#main-content\">Skip to main content</a>\n\n<header>\n  <h1>JavaScript API Reference</h1>\n  <form role=\"search\">\n    <input type=\"search\" placeholder=\"Search documentation...\">\n    <button type=\"submit\">Search</button>\n  </form>\n</header>\n\n<nav aria-label=\"Documentation sidebar\">\n  <ul>\n    <li>\n      <a href=\"#array-methods\">Array Methods</a>\n      <ul>\n        <li><a href=\"#array-map\">map()</a></li>\n        <li><a href=\"#array-filter\">filter()</a></li>\n        <li><a href=\"#array-reduce\">reduce()</a></li>\n      </ul>\n    </li>\n    <li>\n      <a href=\"#string-methods\">String Methods</a>\n      <ul>\n        <li><a href=\"#string-slice\">slice()</a></li>\n        <li><a href=\"#string-replace\">replace()</a></li>\n      </ul>\n    </li>\n  </ul>\n</nav>\n\n<main id=\"main-content\">\n  <article>\n    <h2 id=\"array-methods\">Array Methods</h2>\n\n    <section id=\"array-map\">\n      <h3>Array.prototype.map()</h3>\n      <p>The map() method creates a new array populated with the results of calling a provided function on every element in the calling array.</p>\n\n      <h4>Parameters</h4>\n      <dl>\n        <dt>callback</dt>\n        <dd>Function that is called for every element of the array. Each time callback executes, the returned value is added to the new array.</dd>\n        <dt>thisArg</dt>\n        <dd>Optional. Value to use as this when executing callback.</dd>\n      </dl>\n\n      <h4>Example</h4>\n      <pre><code>const numbers = [1, 2, 3, 4];\nconst doubled = numbers.map(num =&gt; num * 2);\n// doubled is [2, 4, 6, 8]</code></pre>\n    </section>\n\n    <section id=\"array-filter\">\n      <h3>Array.prototype.filter()</h3>\n      <p>The filter() method creates a shallow copy of a portion of a given array, filtered down to just the elements that pass the test implemented by the provided function.</p>\n\n      <pre><code>const words = [\"spray\", \"elite\", \"destruction\"];\nconst result = words.filter(word =&gt; word.length &gt; 5);\n// result is [\"elite\", \"destruction\"]</code></pre>\n    </section>\n\n    <h2 id=\"string-methods\">String Methods</h2>\n\n    <section id=\"string-slice\">\n      <h3>String.prototype.slice()</h3>\n      <p>The slice() method extracts a section of a string and returns it as a new string, without modifying the original string.</p>\n    </section>\n\n    <h3>Browser Compatibility</h3>\n    <table>\n      <caption>Browser support for Array.prototype.map()</caption>\n      <thead>\n        <tr>\n          <th scope=\"col\">Browser</th>\n          <th scope=\"col\">Version</th>\n          <th scope=\"col\">Support</th>\n        </tr>\n      </thead>\n      <tbody>\n        <tr>\n          <th scope=\"row\">Chrome</th>\n          <td>1+</td>\n          <td>Full</td>\n        </tr>\n        <tr>\n          <th scope=\"row\">Firefox</th>\n          <td>1.5+</td>\n          <td>Full</td>\n        </tr>\n        <tr>\n          <th scope=\"row\">Safari</th>\n          <td>3+</td>\n          <td>Full</td>\n        </tr>\n      </tbody>\n    </table>\n  </article>\n</main>\n\n<footer>\n  <nav aria-label=\"Page navigation\">\n    <a href=\"/docs/getting-started\">Previous: Getting Started</a>\n    <a href=\"/docs/advanced\">Next: Advanced Topics</a>\n  </nav>\n</footer>",
  testRunner: "",
  testCases: [
    { assertion: "sourceMatch", value: "href=\"#", description: "a skip navigation link with fragment identifier exists" },
    { query: "nav", assertion: "countAtLeast", value: 2, description: "at least 2 <nav> elements exist (sidebar and footer)" },
    { query: "pre", assertion: "exists", description: "<pre> element exists for code examples" },
    { query: "code", assertion: "exists", description: "<code> element exists inside pre" },
    { query: "dl", assertion: "exists", description: "<dl> definition list exists for API parameters" },
    { query: "table", assertion: "exists", description: "<table> element exists for data" },
    { query: "caption", assertion: "exists", description: "<caption> element describes the table" },
    { query: "h1", assertion: "exists", description: "<h1> page title exists" },
    { query: "h2", assertion: "countAtLeast", value: 2, description: "at least 2 <h2> headings exist" },
    { query: "h3", assertion: "countAtLeast", value: 2, description: "at least 2 <h3> headings exist" },
    { assertion: "sourceMatch", value: "scope=", description: "table header cells use scope attributes" }
  ],
  hints: [
    "A documentation site needs a skip link for keyboard users, a sidebar nav with nested lists for section navigation, and content organized with strict heading hierarchy. Code examples go in pre/code, terms go in definition lists, and compatibility data goes in accessible tables.",
    "Start with the skip link, then add a header with a search form. Create a sidebar nav with nested ul/li lists. In main, write an article with heading levels h1 through h4 without skipping levels. Include pre/code blocks, a dl with dt/dd pairs, and a table with caption and scope attributes. End with a footer nav for prev/next links."
  ],
  resources: [
    { label: "MDN: pre", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/pre", description: "The pre element for preformatted text and code blocks" },
    { label: "MDN: dl (description list)", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dl", description: "The description list element for term-definition pairs" }
  ],
  solutionGate: 10,
  basePoints: 75
});

// 1318 — Accessible Dashboard Layout (T4)
data.exercises.push({
  id: 1318,
  title: "Accessible Dashboard Layout",
  type: "html",
  tier: 4,
  category: ["html", "applied"],
  tags: ["html", "aria-expanded", "aria-label", "aria-labelledby", "aria-live", "role", "region", "menu", "table", "scope", "accessibility", "applied"],
  description: "Build an accessible dashboard layout using ARIA roles, labeled regions, live announcements, and proper data tables.",
  instructions: "Create an accessible dashboard layout that uses ARIA attributes extensively.\n\nYour dashboard must include:\n- A skip link as the first element\n- A `<header>` with a logo and a user menu consisting of:\n  - A `<button>` with `aria-expanded` (set to \"true\" or \"false\") to toggle the menu\n  - A dropdown container with `role=\"menu\"` containing menu items\n- A sidebar `<nav>` element with `aria-label` providing a descriptive label\n- A `<main>` element containing at least 4 `<section>` elements, each with:\n  - `role=\"region\"` to mark it as a landmark\n  - `aria-labelledby` pointing to the section's heading `id`\n  - A heading element with a matching `id`\n- A data `<table>` inside one section, with `scope` attributes on header cells\n- An `<aside>` element with `aria-live=\"polite\"` for notification updates\n- A `<nav>` element in the sidebar\n- Proper heading hierarchy throughout the page",
  starterCode: "",
  solution: "<a href=\"#dashboard-main\">Skip to dashboard content</a>\n\n<header>\n  <img src=\"logo.svg\" alt=\"Dashboard logo\">\n  <h1>Admin Dashboard</h1>\n  <div>\n    <button aria-expanded=\"false\">User Menu</button>\n    <ul role=\"menu\">\n      <li role=\"menuitem\"><a href=\"/profile\">Profile</a></li>\n      <li role=\"menuitem\"><a href=\"/settings\">Settings</a></li>\n      <li role=\"menuitem\"><a href=\"/logout\">Log Out</a></li>\n    </ul>\n  </div>\n</header>\n\n<nav aria-label=\"Dashboard navigation\">\n  <ul>\n    <li><a href=\"#stats\">Statistics</a></li>\n    <li><a href=\"#chart\">Charts</a></li>\n    <li><a href=\"#data-table\">Data</a></li>\n    <li><a href=\"#activity\">Activity</a></li>\n  </ul>\n</nav>\n\n<main id=\"dashboard-main\">\n  <section role=\"region\" aria-labelledby=\"stats-heading\">\n    <h2 id=\"stats-heading\">Statistics Overview</h2>\n    <p>Total Users: 1,245</p>\n    <p>Active Sessions: 87</p>\n    <p>Completion Rate: 72%</p>\n  </section>\n\n  <section role=\"region\" aria-labelledby=\"chart-heading\">\n    <h2 id=\"chart-heading\">Progress Chart</h2>\n    <p>A visual chart showing weekly progress trends would appear here.</p>\n  </section>\n\n  <section role=\"region\" aria-labelledby=\"table-heading\">\n    <h2 id=\"table-heading\">Student Data</h2>\n    <table>\n      <caption>Recent Student Activity</caption>\n      <thead>\n        <tr>\n          <th scope=\"col\">Name</th>\n          <th scope=\"col\">Exercises Completed</th>\n          <th scope=\"col\">Last Active</th>\n        </tr>\n      </thead>\n      <tbody>\n        <tr>\n          <th scope=\"row\">Alice Johnson</th>\n          <td>42</td>\n          <td>Today</td>\n        </tr>\n        <tr>\n          <th scope=\"row\">Bob Martinez</th>\n          <td>38</td>\n          <td>Yesterday</td>\n        </tr>\n        <tr>\n          <th scope=\"row\">Carol Williams</th>\n          <td>27</td>\n          <td>3 days ago</td>\n        </tr>\n      </tbody>\n    </table>\n  </section>\n\n  <section role=\"region\" aria-labelledby=\"activity-heading\">\n    <h2 id=\"activity-heading\">Recent Activity</h2>\n    <ul>\n      <li>Alice completed Exercise 42</li>\n      <li>Bob submitted Exercise 38</li>\n      <li>Carol earned the Streak badge</li>\n    </ul>\n  </section>\n</main>\n\n<aside aria-live=\"polite\">\n  <h2>Notifications</h2>\n  <p>No new notifications.</p>\n</aside>",
  testRunner: "",
  testCases: [
    { assertion: "sourceMatch", value: "aria-expanded", description: "a button uses aria-expanded for the user menu toggle" },
    { assertion: "sourceMatch", value: "aria-label", description: "a nav element uses aria-label for a descriptive label" },
    { assertion: "sourceMatch", value: "aria-labelledby", description: "sections use aria-labelledby to reference their headings" },
    { assertion: "sourceMatch", value: "aria-live", description: "an element uses aria-live for live announcements" },
    { assertion: "sourceMatch", value: "role=\"region\"", description: "sections use role=\"region\" as landmarks" },
    { assertion: "sourceMatch", value: "role=\"menu\"", description: "a dropdown container uses role=\"menu\"" },
    { query: "table", assertion: "exists", description: "<table> element exists for dashboard data" },
    { assertion: "sourceMatch", value: "scope=", description: "table header cells use scope attributes" },
    { query: "nav", assertion: "exists", description: "<nav> element exists for sidebar navigation" },
    { query: "main", assertion: "exists", description: "<main> element exists for dashboard content" }
  ],
  hints: [
    "A dashboard uses ARIA attributes to make its complex layout navigable by screen readers. Each panel is a region with aria-labelledby pointing to its heading. The user menu uses aria-expanded to indicate open/closed state, and a notification area uses aria-live to announce updates.",
    "Create sections with `role=\"region\"` and `aria-labelledby` attributes matching heading ids. Add a button with `aria-expanded` and a container with `role=\"menu\"` for the user dropdown. Use a nav with `aria-label` for the sidebar. Include a table with scope attributes and an aside with `aria-live=\"polite\"`."
  ],
  resources: [
    { label: "MDN: ARIA roles", url: "https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles", description: "Overview of ARIA roles including region and menu" },
    { label: "MDN: aria-labelledby", url: "https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-labelledby", description: "Labeling elements by referencing other element IDs" }
  ],
  solutionGate: 10,
  basePoints: 75
});

// 1319 — E-Commerce Product Page (T4)
data.exercises.push({
  id: 1319,
  title: "E-Commerce Product Page",
  type: "html",
  tier: 4,
  category: ["html", "applied"],
  tags: ["html", "figure", "form", "select", "optgroup", "radio", "number", "details", "summary", "article", "time", "aria-label", "aside", "address", "applied"],
  description: "Build a complete e-commerce product page combining all HTML knowledge including forms, media, disclosure widgets, and semantic structure.",
  instructions: "Create a product page that combines every major HTML concept into a single, well-structured page.\n\nYour page must include:\n- A `<header>` with a logo, a `<nav>` element, and a search `<form>`\n- A `<main>` element with:\n\n**Product Section:**\n- A `<figure>` with a product image (`<img>` with alt text) and a `<figcaption>`\n- Product details including an `<h1>` title and a description paragraph\n- A product options `<form>` containing:\n  - A `<select>` element with at least one `<optgroup>` for product sizes\n  - Radio buttons (`type=\"radio\"`) for color selection\n  - A number input (`type=\"number\"`) for quantity\n  - An \"Add to Cart\" button\n- A `<details>` element with a `<summary>` for product specifications\n\n**Reviews Section:**\n- At least 3 `<article>` elements, each containing:\n  - A heading for the reviewer name\n  - A star rating description using `aria-label` (such as `<span aria-label=\"4 out of 5 stars\">`)\n  - A paragraph with the review text\n  - A `<time>` element with a `datetime` attribute\n\n- An `<aside>` with related product suggestions\n- A `<footer>` with an `<address>` element and a `<nav>` for footer links",
  starterCode: "",
  solution: "<header>\n  <img src=\"store-logo.png\" alt=\"TechStore logo\">\n  <nav>\n    <a href=\"/\">Home</a>\n    <a href=\"/products\">Products</a>\n    <a href=\"/cart\">Cart</a>\n    <a href=\"/account\">Account</a>\n  </nav>\n  <form role=\"search\">\n    <input type=\"search\" placeholder=\"Search products...\">\n    <button type=\"submit\">Search</button>\n  </form>\n</header>\n\n<main>\n  <section>\n    <figure>\n      <img src=\"wireless-headphones.jpg\" alt=\"Wireless noise-canceling headphones in matte black finish\">\n      <figcaption>CloudSound Pro Wireless Headphones</figcaption>\n    </figure>\n\n    <h1>CloudSound Pro Wireless Headphones</h1>\n    <p data-price=\"149.99\">Premium wireless headphones with active noise cancellation, 30-hour battery life, and comfortable over-ear design perfect for music, calls, and focus work.</p>\n\n    <form>\n      <label for=\"size\">Size:</label>\n      <select id=\"size\" name=\"size\">\n        <optgroup label=\"Standard Fit\">\n          <option value=\"small\">Small</option>\n          <option value=\"medium\">Medium</option>\n        </optgroup>\n        <optgroup label=\"Large Fit\">\n          <option value=\"large\">Large</option>\n          <option value=\"xl\">Extra Large</option>\n        </optgroup>\n      </select>\n\n      <fieldset>\n        <legend>Color</legend>\n        <label for=\"color-black\"><input type=\"radio\" id=\"color-black\" name=\"color\" value=\"black\" checked> Matte Black</label>\n        <label for=\"color-silver\"><input type=\"radio\" id=\"color-silver\" name=\"color\" value=\"silver\"> Silver</label>\n        <label for=\"color-navy\"><input type=\"radio\" id=\"color-navy\" name=\"color\" value=\"navy\"> Navy Blue</label>\n      </fieldset>\n\n      <label for=\"quantity\">Quantity:</label>\n      <input type=\"number\" id=\"quantity\" name=\"quantity\" min=\"1\" max=\"10\" value=\"1\">\n\n      <button type=\"submit\">Add to Cart</button>\n    </form>\n\n    <details>\n      <summary>Product Specifications</summary>\n      <ul>\n        <li>Driver Size: 40mm</li>\n        <li>Frequency Response: 20Hz - 20kHz</li>\n        <li>Battery Life: 30 hours</li>\n        <li>Bluetooth Version: 5.3</li>\n        <li>Weight: 250g</li>\n        <li>Noise Cancellation: Active (ANC)</li>\n      </ul>\n    </details>\n  </section>\n\n  <section>\n    <h2>Customer Reviews</h2>\n\n    <article>\n      <h3>Sarah M.</h3>\n      <span aria-label=\"5 out of 5 stars\">&#9733;&#9733;&#9733;&#9733;&#9733;</span>\n      <p>Incredible sound quality and the noise cancellation is the best I have ever used. Comfortable enough to wear for hours during work.</p>\n      <time datetime=\"2025-02-20\">February 20, 2025</time>\n    </article>\n\n    <article>\n      <h3>Mike T.</h3>\n      <span aria-label=\"4 out of 5 stars\">&#9733;&#9733;&#9733;&#9733;&#9734;</span>\n      <p>Great headphones overall. Battery life is impressive. Wish the carrying case was included instead of sold separately.</p>\n      <time datetime=\"2025-01-15\">January 15, 2025</time>\n    </article>\n\n    <article>\n      <h3>Lisa R.</h3>\n      <span aria-label=\"4 out of 5 stars\">&#9733;&#9733;&#9733;&#9733;&#9734;</span>\n      <p>Very comfortable and lightweight. The Bluetooth connection is stable and pairs quickly with all my devices. Solid purchase.</p>\n      <time datetime=\"2025-03-01\">March 1, 2025</time>\n    </article>\n  </section>\n\n  <aside>\n    <h2>You Might Also Like</h2>\n    <ul>\n      <li><a href=\"/products/earbuds\">CloudSound Earbuds</a></li>\n      <li><a href=\"/products/speaker\">CloudSound Portable Speaker</a></li>\n      <li><a href=\"/products/cable\">Premium Audio Cable</a></li>\n    </ul>\n  </aside>\n</main>\n\n<footer>\n  <address>\n    <p>TechStore Inc.</p>\n    <p>789 Commerce Blvd, Portland, OR 97201</p>\n    <p>Email: <a href=\"mailto:support@techstore.example.com\">support@techstore.example.com</a></p>\n  </address>\n  <nav>\n    <a href=\"/privacy\">Privacy Policy</a>\n    <a href=\"/terms\">Terms of Service</a>\n    <a href=\"/returns\">Return Policy</a>\n  </nav>\n</footer>",
  testRunner: "",
  testCases: [
    { query: "figure", assertion: "exists", description: "<figure> element exists for the product image" },
    { query: "select", assertion: "exists", description: "<select> element exists for size options" },
    { assertion: "sourceMatch", value: "type=\"radio\"", description: "radio buttons exist for color selection" },
    { assertion: "sourceMatch", value: "type=\"number\"", description: "a number input exists for quantity" },
    { query: "details", assertion: "exists", description: "<details> element exists for product specifications" },
    { query: "summary", assertion: "exists", description: "<summary> element exists inside details" },
    { query: "article", assertion: "countAtLeast", value: 3, description: "at least 3 <article> elements exist for reviews" },
    { query: "time", assertion: "countAtLeast", value: 3, description: "at least 3 <time> elements exist in reviews" },
    { query: "form", assertion: "exists", description: "<form> element exists for product options" },
    { query: "aside", assertion: "exists", description: "<aside> element exists for related products" },
    { query: "address", assertion: "exists", description: "<address> element exists in the footer" },
    { assertion: "sourceMatch", value: "aria-label", description: "aria-label is used for star rating accessibility" }
  ],
  hints: [
    "Think of the product page as combining every HTML concept: semantic structure (header, main, footer, article, aside), media (figure/figcaption), forms (select with optgroups, radio buttons, number inputs), disclosure (details/summary), time elements for dates, and ARIA for accessibility.",
    "Build the page in layers: header with nav and search form, main with a product section (figure, details form with select/optgroup, radio, number input, details/summary) and a reviews section (articles with headings, aria-label spans, paragraphs, time elements), an aside with related products, and a footer with address and nav."
  ],
  resources: [
    { label: "MDN: select", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/select", description: "The select element with optgroup for grouped options" },
    { label: "MDN: details", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/details", description: "The details disclosure element for expandable content" }
  ],
  solutionGate: 10,
  basePoints: 75
});

// Write the updated file
fs.writeFileSync(CURRICULUM_FILE, JSON.stringify(data, null, 2) + '\n');

const addedCount = 10;
console.log(`Added ${addedCount} HTML exercises (IDs 1310-1319)`);
console.log(`  Section 7: 5 T3 + 5 T4 exercises — Applied HTML`);
console.log(`  T3 (IDs 1310-1314): Recipe Page, Product Comparison Table, FAQ Accordion, Contact Page, Portfolio Landing Page`);
console.log(`  T4 (IDs 1315-1319): Email Newsletter Template, Accessible Survey Form, Documentation Site Structure, Accessible Dashboard Layout, E-Commerce Product Page`);
console.log(`Total exercises: ${data.exercises.length}`);
