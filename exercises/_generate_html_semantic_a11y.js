const fs = require('fs');
const path = require('path');

const CURRICULUM_FILE = path.join(__dirname, 'collections', 'default-curriculum.json');
const data = JSON.parse(fs.readFileSync(CURRICULUM_FILE, 'utf8'));

// ============================================================
// Section 5: Semantic HTML (4 T2 + 3 T3, IDs 1297-1303)
// Semantic document structure, landmark roles, heading hierarchy
// ============================================================

// 1297 — Article vs Section
data.exercises.push({
  id: 1297,
  title: "Article vs Section",
  type: "html",
  tier: 2,
  category: ["html", "semantic"],
  tags: ["html", "article", "section", "main", "semantic", "blog"],
  description: "Create a blog page that uses article and section elements to demonstrate when each is appropriate.",
  instructions: "The `<article>` element represents a self-contained piece of content that could stand alone (like a blog post or news story). The `<section>` element groups related content under a thematic heading.\n\nCreate a blog page with:\n- A `<main>` element wrapping the page content\n- Inside main, a `<section>` element that groups your posts together, with a heading (such as `<h2>Recent Posts</h2>`)\n- Inside the section, at least 2 `<article>` elements\n- Each article must contain its own heading (`<h2>` or `<h3>`) and at least one `<p>` paragraph\n\nUse `<article>` when the content is independently meaningful and `<section>` when you are grouping related content under a common theme.",
  starterCode: "<!-- Create a blog page with section and article elements -->\n",
  solution: "<main>\n  <section>\n    <h2>Recent Posts</h2>\n    <article>\n      <h3>Getting Started with HTML</h3>\n      <p>HTML is the foundation of every web page. It provides the structure and meaning that browsers need to display content correctly.</p>\n    </article>\n    <article>\n      <h3>Understanding Semantic Elements</h3>\n      <p>Semantic elements describe the purpose of content rather than just its appearance. Using them improves accessibility and search engine optimization.</p>\n    </article>\n  </section>\n</main>",
  testRunner: "",
  testCases: [
    { query: "main", assertion: "exists", description: "<main> element exists" },
    { query: "section", assertion: "exists", description: "<section> element exists" },
    { query: "article", assertion: "countAtLeast", value: 2, description: "at least 2 <article> elements exist" },
    { query: "h2, h3", assertion: "countAtLeast", value: 2, description: "at least 2 headings exist inside articles" },
    { query: "p", assertion: "countAtLeast", value: 2, description: "at least 2 <p> elements exist" }
  ],
  hints: [
    "An article is for self-contained content that makes sense on its own, like a blog post. A section groups related content under a shared theme, like a category of posts.",
    "Nest the structure as main > section > article. Give the section a heading that describes the group, and give each article its own heading and paragraph."
  ],
  resources: [
    { label: "MDN: article", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/article", description: "The article element for self-contained content" },
    { label: "MDN: section", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/section", description: "The section element for thematic grouping" }
  ],
  solutionGate: 10,
  basePoints: 25
});

// 1298 — Navigation Patterns
data.exercises.push({
  id: 1298,
  title: "Navigation Patterns",
  type: "html",
  tier: 2,
  category: ["html", "semantic"],
  tags: ["html", "nav", "aria-label", "navigation", "unordered-list", "accessibility"],
  description: "Create two navigation areas distinguished by aria-label attributes to demonstrate accessible navigation patterns.",
  instructions: "A page can have multiple `<nav>` elements, but each one should be distinguishable to screen readers. The `aria-label` attribute gives each navigation area a unique, descriptive name.\n\nCreate a page with:\n- A primary `<nav>` element with `aria-label=\"Primary\"` containing an unordered list (`<ul>`) of 4 page links (such as Home, About, Services, Contact)\n- A secondary `<nav>` element with `aria-label=\"Footer\"` containing an unordered list of 3 links (such as Privacy Policy, Terms of Use, Sitemap)\n- Each list item should contain an `<a>` element with an `href` attribute\n\nUsing `aria-label` allows assistive technologies to announce \"Primary navigation\" and \"Footer navigation\" so users can distinguish between them.",
  starterCode: "<!-- Create two navigation areas with aria-labels -->\n",
  solution: "<nav aria-label=\"Primary\">\n  <ul>\n    <li><a href=\"/home\">Home</a></li>\n    <li><a href=\"/about\">About</a></li>\n    <li><a href=\"/services\">Services</a></li>\n    <li><a href=\"/contact\">Contact</a></li>\n  </ul>\n</nav>\n\n<nav aria-label=\"Footer\">\n  <ul>\n    <li><a href=\"/privacy\">Privacy Policy</a></li>\n    <li><a href=\"/terms\">Terms of Use</a></li>\n    <li><a href=\"/sitemap\">Sitemap</a></li>\n  </ul>\n</nav>",
  testRunner: "",
  testCases: [
    { query: "nav", assertion: "countAtLeast", value: 2, description: "at least 2 <nav> elements exist" },
    { assertion: "sourceMatch", value: "aria-label", description: "aria-label attribute is used on nav elements" },
    { query: "ul", assertion: "countAtLeast", value: 2, description: "at least 2 <ul> elements exist" },
    { query: "a", assertion: "countAtLeast", value: 7, description: "at least 7 <a> link elements exist" }
  ],
  hints: [
    "When a page has more than one nav element, each needs a label so screen reader users can tell them apart. The aria-label attribute provides that invisible but announced label.",
    "Create two separate `<nav>` elements, each with a unique `aria-label` value. Inside each nav, place a `<ul>` with `<li>` items containing `<a>` links."
  ],
  resources: [
    { label: "MDN: nav", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/nav", description: "The nav element for navigation sections" },
    { label: "MDN: aria-label", url: "https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-label", description: "Providing accessible names with aria-label" }
  ],
  solutionGate: 10,
  basePoints: 25
});

// 1299 — Header and Footer Semantics
data.exercises.push({
  id: 1299,
  title: "Header and Footer Semantics",
  type: "html",
  tier: 2,
  category: ["html", "semantic"],
  tags: ["html", "header", "footer", "article", "nav", "time", "semantic"],
  description: "Create a page with headers and footers at both the page level and the article level to demonstrate their nesting capabilities.",
  instructions: "The `<header>` and `<footer>` elements can appear at multiple levels in a document. A page-level header typically contains the site title and navigation, while an article-level header contains the article title and metadata.\n\nCreate a page with:\n- A page-level `<header>` containing a site title (such as `<h1>My Blog</h1>`) and a `<nav>` with at least 2 links\n- A `<main>` element containing an `<article>`\n- Inside the article, its own `<header>` containing an article title (`<h2>`) and a `<time>` element with a `datetime` attribute (such as `<time datetime=\"2025-03-15\">March 15, 2025</time>`)\n- Inside the article, at least one `<p>` for the content\n- Inside the article, its own `<footer>` with author information (such as \"Written by Jane Doe\")\n- A page-level `<footer>` with a copyright notice\n\nThis demonstrates that header and footer are not limited to one per page.",
  starterCode: "<!-- Create a page with nested header and footer elements -->\n",
  solution: "<header>\n  <h1>My Blog</h1>\n  <nav>\n    <a href=\"/home\">Home</a>\n    <a href=\"/about\">About</a>\n  </nav>\n</header>\n\n<main>\n  <article>\n    <header>\n      <h2>Learning Semantic HTML</h2>\n      <time datetime=\"2025-03-15\">March 15, 2025</time>\n    </header>\n    <p>Semantic HTML elements provide meaning to the structure of web content. Using the right elements helps browsers, screen readers, and search engines understand your page.</p>\n    <footer>\n      <p>Written by Jane Doe</p>\n    </footer>\n  </article>\n</main>\n\n<footer>\n  <p>&copy; 2025 My Blog. All rights reserved.</p>\n</footer>",
  testRunner: "",
  testCases: [
    { query: "header", assertion: "countAtLeast", value: 2, description: "at least 2 <header> elements exist (page and article level)" },
    { query: "footer", assertion: "countAtLeast", value: 2, description: "at least 2 <footer> elements exist (page and article level)" },
    { query: "article", assertion: "exists", description: "<article> element exists" },
    { query: "nav", assertion: "exists", description: "<nav> element exists" },
    { query: "time", assertion: "exists", description: "<time> element exists" }
  ],
  hints: [
    "Header and footer are not restricted to one per page. They can appear inside articles, sections, and other elements to introduce or close out that specific block of content.",
    "Place one header and one footer as direct children of the body for the page level. Inside the article element, add another header (with the article title and time) and another footer (with the author info)."
  ],
  resources: [
    { label: "MDN: header", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/header", description: "The header element for introductory content" },
    { label: "MDN: footer", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/footer", description: "The footer element for closing content and metadata" }
  ],
  solutionGate: 10,
  basePoints: 25
});

// 1300 — Landmark Roles
data.exercises.push({
  id: 1300,
  title: "Landmark Roles",
  type: "html",
  tier: 2,
  category: ["html", "semantic"],
  tags: ["html", "role", "aria", "landmark", "banner", "navigation", "contentinfo", "search"],
  description: "Create a page using ARIA landmark roles on div elements to mirror the purpose of semantic HTML elements.",
  instructions: "ARIA landmark roles allow you to assign semantic meaning to generic elements like `<div>`. These roles mirror semantic HTML elements: `role=\"banner\"` maps to `<header>`, `role=\"navigation\"` maps to `<nav>`, `role=\"main\"` maps to `<main>`, and `role=\"contentinfo\"` maps to `<footer>`.\n\nCreate a page using `<div>` elements with the following ARIA roles:\n- A `<div>` with `role=\"banner\"` containing a site title\n- A `<div>` with `role=\"navigation\"` containing at least 2 links\n- A `<div>` with `role=\"main\"` containing a heading and a paragraph\n- A `<div>` with `role=\"contentinfo\"` containing a copyright notice\n- A `<div>` with `role=\"search\"` containing a `<form>` with a search input and a submit button\n\nIn practice, prefer semantic HTML elements over roles. This exercise demonstrates the mapping between roles and elements so you understand what semantic elements provide automatically.",
  starterCode: "<!-- Create a page using ARIA landmark roles on div elements -->\n",
  solution: "<div role=\"banner\">\n  <h1>My Website</h1>\n</div>\n\n<div role=\"navigation\">\n  <a href=\"/home\">Home</a>\n  <a href=\"/about\">About</a>\n  <a href=\"/contact\">Contact</a>\n</div>\n\n<div role=\"main\">\n  <h2>Welcome</h2>\n  <p>This page demonstrates ARIA landmark roles that mirror semantic HTML elements.</p>\n</div>\n\n<div role=\"search\">\n  <form>\n    <input type=\"search\" placeholder=\"Search...\">\n    <button type=\"submit\">Search</button>\n  </form>\n</div>\n\n<div role=\"contentinfo\">\n  <p>&copy; 2025 My Website</p>\n</div>",
  testRunner: "",
  testCases: [
    { assertion: "sourceMatch", value: "role=\"banner\"", description: "a div with role=\"banner\" exists" },
    { assertion: "sourceMatch", value: "role=\"navigation\"", description: "a div with role=\"navigation\" exists" },
    { assertion: "sourceMatch", value: "role=\"main\"", description: "a div with role=\"main\" exists" },
    { assertion: "sourceMatch", value: "role=\"contentinfo\"", description: "a div with role=\"contentinfo\" exists" },
    { assertion: "sourceMatch", value: "role=\"search\"", description: "a div with role=\"search\" exists" }
  ],
  hints: [
    "ARIA landmark roles define page regions the same way semantic HTML elements do. Each role identifies a specific part of the page so assistive technologies can offer shortcuts to navigate between them.",
    "Add `role=\"banner\"`, `role=\"navigation\"`, `role=\"main\"`, `role=\"contentinfo\"`, and `role=\"search\"` to five separate `<div>` elements. Put appropriate content inside each one."
  ],
  resources: [
    { label: "MDN: ARIA landmark roles", url: "https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles#3._landmark_roles", description: "Overview of ARIA landmark roles and their purposes" },
    { label: "MDN: role attribute", url: "https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles", description: "The role attribute and available ARIA roles" }
  ],
  solutionGate: 10,
  basePoints: 25
});

// 1301 — Blog Post Structure (T3)
data.exercises.push({
  id: 1301,
  title: "Blog Post Structure",
  type: "html",
  tier: 3,
  category: ["html", "semantic"],
  tags: ["html", "article", "header", "footer", "figure", "figcaption", "time", "section", "semantic"],
  description: "Build a complete, properly structured blog post page using the full range of semantic HTML elements.",
  instructions: "Build a full blog post page that demonstrates proper semantic HTML structure.\n\nYour page must include:\n- A page-level `<header>` with a site name and a `<nav>` element\n- A `<main>` element containing a single `<article>`\n- Inside the article:\n  - A `<header>` with the post title and a `<time>` element with a `datetime` attribute for the publish date\n  - At least 2 `<section>` elements in the post body, each with its own heading\n  - A `<figure>` containing an `<img>` and a `<figcaption>`\n  - An article-level `<footer>` with tags or category information\n- A page-level `<footer>` with site information\n\nEach semantic element should contain appropriate content that demonstrates its purpose.",
  starterCode: "<!-- Build a complete blog post page -->\n",
  solution: "<header>\n  <h1>Tech Insights Blog</h1>\n  <nav>\n    <a href=\"/\">Home</a>\n    <a href=\"/posts\">Posts</a>\n    <a href=\"/about\">About</a>\n  </nav>\n</header>\n\n<main>\n  <article>\n    <header>\n      <h2>Understanding Semantic HTML</h2>\n      <p>By Alex Smith | <time datetime=\"2025-06-10\">June 10, 2025</time></p>\n    </header>\n\n    <section>\n      <h3>Why Semantics Matter</h3>\n      <p>Semantic HTML gives meaning to the structure of your web content. Instead of using generic div elements for everything, semantic elements communicate the purpose of each section to browsers, screen readers, and search engines.</p>\n    </section>\n\n    <figure>\n      <img src=\"semantic-diagram.png\" alt=\"Diagram showing semantic HTML page structure with header, nav, main, article, section, aside, and footer\">\n      <figcaption>A typical semantic HTML page layout showing the relationship between structural elements.</figcaption>\n    </figure>\n\n    <section>\n      <h3>Putting It Into Practice</h3>\n      <p>Start by identifying the major regions of your page: the banner, navigation, main content, and footer. Then look at the content within each region and determine whether it forms independent articles, thematic sections, or supplementary asides.</p>\n    </section>\n\n    <footer>\n      <p>Categories: HTML, Accessibility, Web Standards</p>\n    </footer>\n  </article>\n</main>\n\n<footer>\n  <p>&copy; 2025 Tech Insights Blog</p>\n</footer>",
  testRunner: "",
  testCases: [
    { query: "article", assertion: "exists", description: "<article> element exists" },
    { query: "time", assertion: "exists", description: "<time> element exists" },
    { query: "figure", assertion: "exists", description: "<figure> element exists" },
    { query: "figcaption", assertion: "exists", description: "<figcaption> element exists" },
    { query: "section", assertion: "countAtLeast", value: 2, description: "at least 2 <section> elements exist in the post body" },
    { query: "header", assertion: "countAtLeast", value: 2, description: "at least 2 <header> elements exist (page and article level)" },
    { query: "footer", assertion: "countAtLeast", value: 2, description: "at least 2 <footer> elements exist (page and article level)" }
  ],
  hints: [
    "Think of the page as having two layers: the page shell (page header, main, page footer) and the article internals (article header, sections, figure, article footer). Each layer uses its own header and footer.",
    "Start with the page-level header and footer. Inside main, create an article. Give the article its own header (with h2 and time), at least two sections (each with h3 and paragraph), a figure (with img and figcaption), and its own footer."
  ],
  resources: [
    { label: "MDN: article", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/article", description: "The article element for self-contained compositions" },
    { label: "MDN: figure", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/figure", description: "The figure and figcaption elements for illustrations" }
  ],
  solutionGate: 10,
  basePoints: 50
});

// 1302 — Multi-Article Feed (T3)
data.exercises.push({
  id: 1302,
  title: "Multi-Article Feed",
  type: "html",
  tier: 3,
  category: ["html", "semantic"],
  tags: ["html", "article", "time", "aside", "main", "nav", "feed", "semantic"],
  description: "Build a content feed with multiple articles, publish dates, and a sidebar to demonstrate proper semantic nesting.",
  instructions: "Build a news-style content feed that uses semantic HTML to structure multiple articles alongside supplementary content.\n\nYour page must include:\n- A page-level `<header>` with a `<nav>` containing at least 2 links\n- A `<main>` element containing at least 3 `<article>` elements\n- Each article must contain:\n  - A heading (such as `<h2>`) for the article title\n  - A `<p>` element with a short summary\n  - A `<time>` element with a `datetime` attribute for the publish date\n  - An `<a>` element linking to the full article (such as \"Read more\")\n- An `<aside>` element (inside or alongside main) with a heading like \"Trending Topics\" and a list of topics\n\nThe aside represents content that is tangentially related to the main content, like a sidebar with trending topics or related links.",
  starterCode: "<!-- Build a multi-article feed -->\n",
  solution: "<header>\n  <h1>Daily News</h1>\n  <nav>\n    <a href=\"/\">Home</a>\n    <a href=\"/world\">World</a>\n    <a href=\"/tech\">Technology</a>\n  </nav>\n</header>\n\n<main>\n  <article>\n    <h2>New Discoveries in Ocean Research</h2>\n    <p>Scientists have mapped previously unknown deep-sea ecosystems using advanced sonar technology.</p>\n    <time datetime=\"2025-06-15\">June 15, 2025</time>\n    <a href=\"/articles/ocean-research\">Read more</a>\n  </article>\n\n  <article>\n    <h2>City Approves Green Transportation Plan</h2>\n    <p>The city council voted to expand bike lanes and electric bus routes across all neighborhoods.</p>\n    <time datetime=\"2025-06-14\">June 14, 2025</time>\n    <a href=\"/articles/green-transport\">Read more</a>\n  </article>\n\n  <article>\n    <h2>Local Library Launches Coding Program</h2>\n    <p>Free coding workshops for teens will begin next month at all branch locations.</p>\n    <time datetime=\"2025-06-13\">June 13, 2025</time>\n    <a href=\"/articles/library-coding\">Read more</a>\n  </article>\n</main>\n\n<aside>\n  <h2>Trending Topics</h2>\n  <ul>\n    <li>Climate Change</li>\n    <li>Technology</li>\n    <li>Education</li>\n    <li>Health</li>\n  </ul>\n</aside>",
  testRunner: "",
  testCases: [
    { query: "article", assertion: "countAtLeast", value: 3, description: "at least 3 <article> elements exist" },
    { query: "time", assertion: "countAtLeast", value: 3, description: "at least 3 <time> elements exist" },
    { query: "a", assertion: "countAtLeast", value: 3, description: "at least 3 <a> elements exist in articles" },
    { query: "aside", assertion: "exists", description: "<aside> element exists" },
    { query: "main", assertion: "exists", description: "<main> element exists" },
    { query: "nav", assertion: "exists", description: "<nav> element exists" }
  ],
  hints: [
    "Each article in a feed is an independent piece of content with its own heading, summary, date, and link. The aside holds supplementary content that supports but is not part of the main feed.",
    "Place at least three article elements inside main, each containing an h2, p, time (with datetime attribute), and an anchor link. Add an aside element outside the articles with a heading and a list of topics."
  ],
  resources: [
    { label: "MDN: article", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/article", description: "The article element for independent content items" },
    { label: "MDN: aside", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/aside", description: "The aside element for tangentially related content" }
  ],
  solutionGate: 10,
  basePoints: 50
});

// 1303 — Semantic Document Outline (T3)
data.exercises.push({
  id: 1303,
  title: "Semantic Document Outline",
  type: "html",
  tier: 3,
  category: ["html", "semantic"],
  tags: ["html", "headings", "hierarchy", "section", "nav", "id", "fragment", "table-of-contents"],
  description: "Create a technical documentation page with proper heading hierarchy and a table of contents using fragment links.",
  instructions: "Create a technical documentation page that demonstrates a correct heading hierarchy and internal navigation.\n\nYour page must include:\n- An `<h1>` element for the page title\n- A `<nav>` element containing a table of contents with links that use fragment identifiers (such as `href=\"#section-id\"`)\n- A `<main>` element with at least 2 `<section>` elements, each having an `h2` heading\n- Inside at least one section, subsections with `h3` headings\n- At least one subsection containing an `h4` heading\n- Every section and subsection must have an `id` attribute so the table of contents links can target them\n- At least 3 `h3` headings across the document\n\nHeadings must not skip levels (for example, do not jump from h2 to h4 without an h3 in between). This hierarchy is critical for screen reader users who navigate by heading level.",
  starterCode: "<!-- Create a documentation page with proper heading hierarchy -->\n",
  solution: "<h1>JavaScript Fundamentals</h1>\n\n<nav>\n  <h2>Table of Contents</h2>\n  <ul>\n    <li><a href=\"#variables\">Variables</a></li>\n    <li><a href=\"#functions\">Functions</a></li>\n  </ul>\n</nav>\n\n<main>\n  <section id=\"variables\">\n    <h2>Variables</h2>\n    <p>Variables store data values that your program can use and manipulate.</p>\n\n    <section id=\"var-declaration\">\n      <h3>Declaration Keywords</h3>\n      <p>JavaScript provides three keywords for declaring variables: var, let, and const.</p>\n\n      <section id=\"var-let-vs-const\">\n        <h4>let vs const</h4>\n        <p>Use let when the value will change and const when it will not. Prefer const by default.</p>\n      </section>\n    </section>\n\n    <section id=\"var-scope\">\n      <h3>Variable Scope</h3>\n      <p>Scope determines where a variable is accessible in your code. Block scope and function scope are the two main types.</p>\n    </section>\n  </section>\n\n  <section id=\"functions\">\n    <h2>Functions</h2>\n    <p>Functions are reusable blocks of code that perform a specific task.</p>\n\n    <section id=\"fn-declaration\">\n      <h3>Function Declarations</h3>\n      <p>A function declaration defines a named function that can be called anywhere in its scope.</p>\n    </section>\n  </section>\n</main>",
  testRunner: "",
  testCases: [
    { query: "h1", assertion: "exists", description: "<h1> page title exists" },
    { query: "h2", assertion: "countAtLeast", value: 2, description: "at least 2 <h2> headings exist" },
    { query: "h3", assertion: "countAtLeast", value: 3, description: "at least 3 <h3> headings exist" },
    { query: "h4", assertion: "exists", description: "at least one <h4> heading exists" },
    { assertion: "sourceMatch", value: "id=", description: "sections have id attributes for linking" },
    { query: "nav", assertion: "exists", description: "<nav> element exists for table of contents" },
    { assertion: "sourceMatch", value: "href=\"#", description: "fragment identifier links exist in the table of contents" }
  ],
  hints: [
    "A proper heading hierarchy never skips levels. Start with h1 for the page, h2 for major sections, h3 for subsections, and h4 for sub-subsections. Each section needs an id so the table of contents can link to it.",
    "Give every section an `id` attribute (like `id=\"variables\"`). In the nav, create an unordered list of links using `href=\"#variables\"` to point to each section. Nest your headings h1 > h2 > h3 > h4 without skipping levels."
  ],
  resources: [
    { label: "MDN: Heading elements", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Heading_Elements", description: "HTML heading elements h1 through h6" },
    { label: "MDN: Document structure", url: "https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/Document_and_website_structure", description: "Planning and structuring an HTML document" }
  ],
  solutionGate: 10,
  basePoints: 50
});

// ============================================================
// Section 6: Accessibility (4 T2 + 2 T3, IDs 1304-1309)
// ARIA attributes, accessible patterns, screen reader support
// ============================================================

// 1304 — Image Accessibility
data.exercises.push({
  id: 1304,
  title: "Image Accessibility",
  type: "html",
  tier: 2,
  category: ["html", "accessibility"],
  tags: ["html", "img", "alt", "aria-describedby", "decorative", "accessibility"],
  description: "Create a page with three images demonstrating informative alt text, decorative empty alt, and complex image descriptions.",
  instructions: "Accessible images require different alt text strategies depending on their purpose.\n\nCreate a page with three images:\n1. An informative image with descriptive `alt` text that conveys the image's meaning (such as `alt=\"Students collaborating on a coding project\"`)\n2. A decorative image with an empty `alt` attribute (`alt=\"\"`) to tell screen readers to skip it\n3. A complex image (such as a chart or diagram) with both a short `alt` text and an `aria-describedby` attribute pointing to a `<p>` element that contains a longer description of the image\n\nThe `alt` attribute is required on all images. An empty `alt=\"\"` signals that the image is purely decorative. For complex images, `aria-describedby` links to a longer description that provides the details screen reader users need.",
  starterCode: "<!-- Create three images demonstrating alt text patterns -->\n",
  solution: "<img src=\"team-coding.jpg\" alt=\"Students collaborating on a coding project at a shared desk\">\n\n<img src=\"decorative-border.png\" alt=\"\">\n\n<img src=\"enrollment-chart.png\" alt=\"Bar chart showing student enrollment trends\" aria-describedby=\"chart-description\">\n<p id=\"chart-description\">The bar chart displays enrollment from 2020 to 2025. Enrollment rose from 150 students in 2020 to 280 students in 2023, then leveled off at 275 in 2024 and 2025.</p>",
  testRunner: "",
  testCases: [
    { query: "img", assertion: "countAtLeast", value: 3, description: "at least 3 <img> elements exist" },
    { assertion: "sourceMatch", value: "alt=\"\"", description: "a decorative image uses an empty alt attribute" },
    { assertion: "sourceMatch", value: "aria-describedby", description: "a complex image uses aria-describedby" },
    { assertion: "sourceMatch", value: "alt=\"[^\"]+\"", description: "at least one image has a non-empty alt attribute", flags: "i" }
  ],
  hints: [
    "Every image needs an alt attribute, but its content depends on the image's purpose. Informative images get a description, decorative images get an empty alt, and complex images get both a short alt and a linked longer description.",
    "For the decorative image, write `alt=\"\"` with nothing between the quotes. For the complex image, add `aria-describedby=\"some-id\"` and create a `<p id=\"some-id\">` with the detailed description."
  ],
  resources: [
    { label: "MDN: img alt attribute", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#alt", description: "The alt attribute and accessible image practices" },
    { label: "MDN: aria-describedby", url: "https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-describedby", description: "Linking elements to longer descriptions" }
  ],
  solutionGate: 10,
  basePoints: 25
});

// 1305 — Form Accessibility
data.exercises.push({
  id: 1305,
  title: "Form Accessibility",
  type: "html",
  tier: 2,
  category: ["html", "accessibility"],
  tags: ["html", "form", "label", "for", "aria-required", "aria-invalid", "aria-describedby", "accessibility"],
  description: "Create an accessible contact form with explicit label associations and ARIA attributes for required fields and error states.",
  instructions: "Accessible forms require explicit connections between labels and inputs so screen readers can announce what each field is for.\n\nCreate a contact form with:\n- At least 3 input fields, each with a `<label>` element whose `for` attribute matches the input's `id`\n- One input marked as required using `aria-required=\"true\"` (in addition to or instead of the HTML `required` attribute)\n- One input shown in an error state using `aria-invalid=\"true\"` with an `aria-describedby` attribute pointing to a `<span>` that contains an error message\n- A submit button\n\nThe `for`/`id` pairing creates an explicit association between labels and inputs. `aria-required` communicates that a field must be filled out, and `aria-invalid` with `aria-describedby` communicates validation errors to screen reader users.",
  starterCode: "<!-- Create an accessible contact form -->\n",
  solution: "<form>\n  <label for=\"name\">Name:</label>\n  <input type=\"text\" id=\"name\" name=\"name\" aria-required=\"true\">\n\n  <label for=\"email\">Email:</label>\n  <input type=\"email\" id=\"email\" name=\"email\" aria-invalid=\"true\" aria-describedby=\"email-error\">\n  <span id=\"email-error\">Please enter a valid email address.</span>\n\n  <label for=\"message\">Message:</label>\n  <textarea id=\"message\" name=\"message\"></textarea>\n\n  <button type=\"submit\">Send Message</button>\n</form>",
  testRunner: "",
  testCases: [
    { query: "label", assertion: "countAtLeast", value: 3, description: "at least 3 <label> elements exist" },
    { assertion: "sourceMatch", value: "for=", description: "labels use the for attribute to associate with inputs" },
    { assertion: "sourceMatch", value: "aria-required", description: "at least one input uses aria-required" },
    { assertion: "sourceMatch", value: "aria-invalid", description: "at least one input uses aria-invalid for error state" },
    { assertion: "sourceMatch", value: "aria-describedby", description: "an input uses aria-describedby to link to an error message" }
  ],
  hints: [
    "The for attribute on a label must exactly match the id attribute on the corresponding input. ARIA attributes like aria-required and aria-invalid provide additional state information that screen readers announce.",
    "Give each input a unique `id` and match it with `<label for=\"that-id\">`. Add `aria-required=\"true\"` to the required field. On the invalid field, add `aria-invalid=\"true\"` and `aria-describedby=\"error-id\"`, then create a `<span id=\"error-id\">` with the error text."
  ],
  resources: [
    { label: "MDN: label", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/label", description: "The label element and for/id association" },
    { label: "MDN: ARIA form roles", url: "https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-required", description: "Using aria-required for form accessibility" }
  ],
  solutionGate: 10,
  basePoints: 25
});

// 1306 — Skip Navigation Link
data.exercises.push({
  id: 1306,
  title: "Skip Navigation Link",
  type: "html",
  tier: 2,
  category: ["html", "accessibility"],
  tags: ["html", "skip-link", "navigation", "keyboard", "accessibility", "anchor"],
  description: "Create a page with a skip navigation link that allows keyboard users to jump directly to the main content.",
  instructions: "Keyboard users navigate a page by pressing Tab to move through interactive elements. Without a skip link, they must tab through every navigation link before reaching the main content.\n\nCreate a page with:\n- A \"Skip to main content\" link as the very first element inside the `<body>`. The link's `href` should point to the id of the main element (such as `href=\"#main-content\"`)\n- A `<header>` containing a `<nav>` with at least 3 links\n- A `<main>` element with an `id` attribute that matches the skip link's `href` target (such as `id=\"main-content\"`)\n- At least one heading and paragraph inside main\n\nThe skip link is typically visually hidden and becomes visible when it receives keyboard focus. This exercise focuses on the HTML structure rather than the CSS styling.",
  starterCode: "<!-- Create a page with a skip navigation link -->\n",
  solution: "<a href=\"#main-content\">Skip to main content</a>\n\n<header>\n  <h1>My Website</h1>\n  <nav>\n    <a href=\"/home\">Home</a>\n    <a href=\"/about\">About</a>\n    <a href=\"/services\">Services</a>\n    <a href=\"/contact\">Contact</a>\n  </nav>\n</header>\n\n<main id=\"main-content\">\n  <h2>Welcome to Our Website</h2>\n  <p>This page demonstrates the skip navigation pattern that helps keyboard users bypass repetitive navigation links and jump directly to the main content area.</p>\n</main>",
  testRunner: "",
  testCases: [
    { assertion: "sourceMatch", value: "href=\"#", description: "a skip link with a fragment identifier exists" },
    { query: "main", assertion: "exists", description: "<main> element exists" },
    { query: "a", assertion: "exists", description: "anchor link elements exist" },
    { assertion: "sourceMatch", value: "id=\"main", description: "main element has an id attribute for the skip link target" },
    { query: "nav", assertion: "exists", description: "<nav> element exists" }
  ],
  hints: [
    "A skip link is an anchor tag at the very top of the body that points to the id of the main content area. When a keyboard user presses Tab, this is the first link they encounter, allowing them to skip over the navigation.",
    "Make the very first element inside body an `<a href=\"#main-content\">Skip to main content</a>`. Then give the `<main>` element `id=\"main-content\"` so the link target matches."
  ],
  resources: [
    { label: "MDN: Skip navigation links", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#skip_navigation_links", description: "Creating skip navigation links for keyboard accessibility" },
    { label: "MDN: main", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/main", description: "The main element for primary page content" }
  ],
  solutionGate: 10,
  basePoints: 25
});

// 1307 — ARIA Live Regions
data.exercises.push({
  id: 1307,
  title: "ARIA Live Regions",
  type: "html",
  tier: 2,
  category: ["html", "accessibility"],
  tags: ["html", "aria-live", "polite", "assertive", "role-status", "accessibility", "dynamic"],
  description: "Create notification areas using ARIA live regions to announce dynamic content changes to screen reader users.",
  instructions: "ARIA live regions tell screen readers to announce content changes when they happen, even if the user's focus is elsewhere on the page.\n\nCreate a page with:\n- A `<div>` with `aria-live=\"polite\"` for non-urgent updates. Include placeholder text like \"No new notifications.\" inside it. Polite announcements wait until the screen reader finishes its current task.\n- A `<div>` with `aria-live=\"assertive\"` for urgent alerts. Include placeholder text like \"No alerts.\" inside it. Assertive announcements interrupt whatever the screen reader is currently saying.\n- A `<div>` with `role=\"status\"` for status messages. Include placeholder text like \"System: All systems operational.\" inside it. The status role is equivalent to `aria-live=\"polite\"` with `aria-atomic=\"true\"`.\n\nThese regions are designed so that when their content is updated by JavaScript, the screen reader automatically announces the new content.",
  starterCode: "<!-- Create ARIA live region notification areas -->\n",
  solution: "<h1>Notification Center</h1>\n\n<h2>Updates</h2>\n<div aria-live=\"polite\">\n  <p>No new notifications.</p>\n</div>\n\n<h2>Alerts</h2>\n<div aria-live=\"assertive\">\n  <p>No alerts.</p>\n</div>\n\n<h2>System Status</h2>\n<div role=\"status\">\n  <p>System: All systems operational.</p>\n</div>",
  testRunner: "",
  testCases: [
    { assertion: "sourceMatch", value: "aria-live=\"polite\"", description: "a polite live region exists" },
    { assertion: "sourceMatch", value: "aria-live=\"assertive\"", description: "an assertive live region exists" },
    { assertion: "sourceMatch", value: "role=\"status\"", description: "a status role region exists" },
    { query: "div", assertion: "countAtLeast", value: 3, description: "at least 3 <div> container elements exist" }
  ],
  hints: [
    "Live regions are containers whose content changes will be announced by screen readers. Polite waits for a pause, assertive interrupts immediately, and the status role is a shorthand for a polite atomic region.",
    "Create three `<div>` elements. Add `aria-live=\"polite\"` to the first, `aria-live=\"assertive\"` to the second, and `role=\"status\"` to the third. Put placeholder content inside each one."
  ],
  resources: [
    { label: "MDN: aria-live", url: "https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-live", description: "The aria-live attribute for dynamic content announcements" },
    { label: "MDN: ARIA live regions", url: "https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Live_Regions", description: "How ARIA live regions work with screen readers" }
  ],
  solutionGate: 10,
  basePoints: 25
});

// 1308 — Accessible Table (T3)
data.exercises.push({
  id: 1308,
  title: "Accessible Table",
  type: "html",
  tier: 3,
  category: ["html", "accessibility"],
  tags: ["html", "table", "caption", "scope", "headers", "aria-describedby", "accessibility"],
  description: "Build a fully accessible data table with caption, scoped headers, id-based header associations, and a linked description.",
  instructions: "Build an accessible class roster table that uses all available accessibility features for data tables.\n\nYour table must include:\n- A `<caption>` element describing the table (such as \"Fall 2025 Class Roster\")\n- Column headers (`<th>`) in a `<thead>` row with `scope=\"col\"` attributes (at least 4 columns, such as: Student, Grade, Subject, Status)\n- Row headers (`<th>`) in `<tbody>` rows with `scope=\"row\"` for at least one column (such as the student name column)\n- At least one `<td>` element with a `headers` attribute that explicitly references header cell `id` values (this is used when the table structure is complex enough that scope alone is not sufficient)\n- An `aria-describedby` attribute on the `<table>` element, pointing to a `<p>` element that explains the table structure or provides context\n\nThe combination of caption, scope, headers, and aria-describedby ensures that screen reader users can fully understand and navigate the table.",
  starterCode: "<!-- Create a fully accessible data table -->\n",
  solution: "<p id=\"roster-description\">This table lists students enrolled in the Fall 2025 semester, showing their grade level, primary subject, and enrollment status.</p>\n\n<table aria-describedby=\"roster-description\">\n  <caption>Fall 2025 Class Roster</caption>\n  <thead>\n    <tr>\n      <th id=\"col-student\" scope=\"col\">Student</th>\n      <th id=\"col-grade\" scope=\"col\">Grade</th>\n      <th id=\"col-subject\" scope=\"col\">Subject</th>\n      <th id=\"col-status\" scope=\"col\">Status</th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr>\n      <th id=\"student-alice\" scope=\"row\">Alice Johnson</th>\n      <td headers=\"student-alice col-grade\">10th</td>\n      <td>Computer Science</td>\n      <td>Active</td>\n    </tr>\n    <tr>\n      <th id=\"student-bob\" scope=\"row\">Bob Martinez</th>\n      <td headers=\"student-bob col-grade\">11th</td>\n      <td>Mathematics</td>\n      <td>Active</td>\n    </tr>\n    <tr>\n      <th id=\"student-carol\" scope=\"row\">Carol Williams</th>\n      <td headers=\"student-carol col-grade\">10th</td>\n      <td>English</td>\n      <td>Withdrawn</td>\n    </tr>\n  </tbody>\n</table>",
  testRunner: "",
  testCases: [
    { query: "caption", assertion: "exists", description: "<caption> element describes the table" },
    { assertion: "sourceMatch", value: "scope=", description: "header cells use scope attributes" },
    { assertion: "sourceMatch", value: "aria-describedby", description: "table uses aria-describedby for a linked description" },
    { assertion: "sourceMatch", value: "headers=", description: "at least one data cell uses the headers attribute" },
    { query: "table", assertion: "exists", description: "<table> element exists" },
    { query: "th", assertion: "countAtLeast", value: 4, description: "at least 4 <th> header elements exist" }
  ],
  hints: [
    "Accessible tables use multiple layers of context: caption names the table, scope tells whether a header applies to a row or column, headers explicitly associates data cells with specific headers by id, and aria-describedby links to a longer explanation.",
    "Add `scope=\"col\"` to column headers in the thead and `scope=\"row\"` to the first cell of each body row. Give some header cells unique `id` values, then reference those ids in a `headers` attribute on a related `<td>`. Create a `<p>` with an id and point the table's `aria-describedby` to it."
  ],
  resources: [
    { label: "MDN: Table accessibility", url: "https://developer.mozilla.org/en-US/docs/Learn/HTML/Tables/Advanced", description: "Advanced table features for accessibility" },
    { label: "MDN: th headers attribute", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/td#headers", description: "Using the headers attribute for complex table associations" }
  ],
  solutionGate: 10,
  basePoints: 50
});

// 1309 — Accessible Navigation Menu (T3)
data.exercises.push({
  id: 1309,
  title: "Accessible Navigation Menu",
  type: "html",
  tier: 3,
  category: ["html", "accessibility"],
  tags: ["html", "nav", "aria-label", "aria-current", "aria-expanded", "button", "accessibility", "keyboard"],
  description: "Build an accessible navigation system with current page indication, labeled regions, and a dropdown toggle.",
  instructions: "Build a navigation system that uses ARIA attributes to communicate state and context to screen reader users.\n\nYour navigation must include:\n- A `<nav>` element with an `aria-label` attribute (such as `aria-label=\"Main navigation\"`)\n- An unordered list of at least 4 navigation links with meaningful link text (avoid generic text like \"click here\" or \"read more\")\n- One link marked as the current page using `aria-current=\"page\"` (this tells screen readers which page the user is currently on)\n- A `<button>` element with `aria-expanded` attribute (set to either \"true\" or \"false\") to serve as a dropdown toggle for a submenu\n- The button should contain descriptive text (such as \"Products\" or \"More options\")\n\nAll links must have meaningful text that describes their destination. The `aria-current` attribute should only appear on the link that matches the current page. The `aria-expanded` attribute indicates whether the controlled content is visible.",
  starterCode: "<!-- Create an accessible navigation menu -->\n",
  solution: "<nav aria-label=\"Main navigation\">\n  <ul>\n    <li><a href=\"/\" aria-current=\"page\">Home</a></li>\n    <li><a href=\"/about\">About Us</a></li>\n    <li>\n      <button aria-expanded=\"false\">Products</button>\n      <ul>\n        <li><a href=\"/products/software\">Software</a></li>\n        <li><a href=\"/products/hardware\">Hardware</a></li>\n      </ul>\n    </li>\n    <li><a href=\"/blog\">Blog</a></li>\n    <li><a href=\"/contact\">Contact</a></li>\n  </ul>\n</nav>",
  testRunner: "",
  testCases: [
    { query: "nav", assertion: "exists", description: "<nav> element exists" },
    { assertion: "sourceMatch", value: "aria-label", description: "nav element has an aria-label attribute" },
    { assertion: "sourceMatch", value: "aria-current=\"page\"", description: "one link uses aria-current=\"page\" to indicate the current page" },
    { assertion: "sourceMatch", value: "aria-expanded", description: "a button uses aria-expanded for a dropdown toggle" },
    { query: "a", assertion: "countAtLeast", value: 4, description: "at least 4 navigation links exist" },
    { query: "button", assertion: "exists", description: "a <button> element exists for the dropdown toggle" }
  ],
  hints: [
    "Accessible navigation uses aria-label to name the nav region, aria-current to identify which link matches the current page, and aria-expanded to communicate whether a dropdown is open or closed. All link text should be descriptive.",
    "Add `aria-label=\"Main navigation\"` to the nav element. Put `aria-current=\"page\"` on the link for the current page. Create a `<button aria-expanded=\"false\">` for the dropdown toggle. Make sure every link has clear, meaningful text."
  ],
  resources: [
    { label: "MDN: aria-current", url: "https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-current", description: "Indicating the current item in a set with aria-current" },
    { label: "MDN: aria-expanded", url: "https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-expanded", description: "The aria-expanded attribute for toggle controls" }
  ],
  solutionGate: 10,
  basePoints: 50
});

// Write the updated file
fs.writeFileSync(CURRICULUM_FILE, JSON.stringify(data, null, 2) + '\n');

const addedCount = 13;
console.log(`Added ${addedCount} HTML exercises (IDs 1297-1309)`);
console.log(`  Section 5: 4 T2 + 3 T3 exercises (IDs 1297-1303) — Semantic HTML`);
console.log(`  Section 6: 4 T2 + 2 T3 exercises (IDs 1304-1309) — Accessibility`);
console.log(`Total exercises: ${data.exercises.length}`);
