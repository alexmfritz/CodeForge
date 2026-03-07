const fs = require('fs');
const path = require('path');

const CURRICULUM_FILE = path.join(__dirname, 'collections', 'default-curriculum.json');
const data = JSON.parse(fs.readFileSync(CURRICULUM_FILE, 'utf8'));

// ============================================================
// Section 3: Tables Depth (4 T2, IDs 1285-1288)
// Advanced table features: accessibility, colgroup, scope, tfoot
// ============================================================

// 1285 — Accessible Table with Caption
data.exercises.push({
  id: 1285,
  title: "Accessible Table with Caption",
  type: "html",
  tier: 2,
  category: ["html", "tables"],
  tags: ["html", "table", "caption", "thead", "tbody", "scope", "accessibility"],
  description: "Build an accessible student grades table with a caption, scoped headers, and proper table sectioning.",
  instructions: "Create a table that follows accessibility best practices using semantic sectioning and scope attributes.\n\nYour table should include:\n- A `<caption>` element with the text: Student Grades\n- A `<thead>` section containing a header row with `<th>` cells for: Name, Subject, Grade\n- Each `<th>` in the header row must have `scope=\"col\"` to indicate it labels a column\n- A `<tbody>` section containing at least 3 data rows, each with a student name, subject, and grade\n\nThe `<caption>` element provides a title for the table, which helps screen readers announce the table's purpose. The `scope` attribute tells assistive technologies whether a header applies to a row or a column.",
  starterCode: "<!-- Create an accessible table with caption and scoped headers -->\n",
  solution: "<table>\n  <caption>Student Grades</caption>\n  <thead>\n    <tr>\n      <th scope=\"col\">Name</th>\n      <th scope=\"col\">Subject</th>\n      <th scope=\"col\">Grade</th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr>\n      <td>Alice</td>\n      <td>Math</td>\n      <td>A</td>\n    </tr>\n    <tr>\n      <td>Bob</td>\n      <td>Science</td>\n      <td>B+</td>\n    </tr>\n    <tr>\n      <td>Carol</td>\n      <td>English</td>\n      <td>A-</td>\n    </tr>\n  </tbody>\n</table>",
  testRunner: "",
  testCases: [
    { query: "caption", assertion: "exists", description: "<caption> element exists" },
    { assertion: "sourceMatch", value: "scope=\"col\"", description: "th elements use scope=\"col\"" },
    { query: "thead", assertion: "exists", description: "<thead> element exists" },
    { query: "tbody", assertion: "exists", description: "<tbody> element exists" },
    { query: "tr", assertion: "countAtLeast", value: 4, description: "at least 4 <tr> rows exist (1 header + 3 data)" }
  ],
  hints: [
    "A caption is the first child of the table element and acts as a title. Scope attributes on header cells declare whether they label a column or a row.",
    "Place a `<caption>` right after the opening `<table>` tag. Wrap the header row in `<thead>` and data rows in `<tbody>`. Add `scope=\"col\"` to each `<th>`."
  ],
  resources: [
    { label: "MDN: caption", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/caption", description: "The caption element for table titles" },
    { label: "MDN: th scope", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/th#scope", description: "The scope attribute for accessible table headers" }
  ],
  solutionGate: 10,
  basePoints: 25
});

// 1286 — Table with Column Groups
data.exercises.push({
  id: 1286,
  title: "Table with Column Groups",
  type: "html",
  tier: 2,
  category: ["html", "tables"],
  tags: ["html", "table", "colgroup", "col", "span", "styling"],
  description: "Create a pricing table that uses colgroup and col elements to define column groups for styling hooks.",
  instructions: "Create a pricing comparison table that uses `<colgroup>` and `<col>` elements to organize columns.\n\nYour table should include:\n- A `<colgroup>` element placed before `<thead>`, containing `<col>` elements\n- At least one `<col>` element that uses the `span` attribute to group multiple columns\n- A `<thead>` section with a header row containing at least 3 columns: Feature, Basic Plan, Pro Plan\n- A `<tbody>` section with at least 3 data rows comparing features across plans\n\nThe `<colgroup>` and `<col>` elements let you target entire columns for styling with CSS. The `span` attribute on a `<col>` element indicates how many consecutive columns it covers.",
  starterCode: "<!-- Create a table with colgroup and col elements -->\n",
  solution: "<table>\n  <colgroup>\n    <col>\n    <col span=\"2\">\n  </colgroup>\n  <thead>\n    <tr>\n      <th>Feature</th>\n      <th>Basic Plan</th>\n      <th>Pro Plan</th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr>\n      <td>Storage</td>\n      <td>5 GB</td>\n      <td>100 GB</td>\n    </tr>\n    <tr>\n      <td>Users</td>\n      <td>1</td>\n      <td>10</td>\n    </tr>\n    <tr>\n      <td>Support</td>\n      <td>Email</td>\n      <td>24/7 Phone</td>\n    </tr>\n  </tbody>\n</table>",
  testRunner: "",
  testCases: [
    { query: "colgroup", assertion: "exists", description: "<colgroup> element exists" },
    { query: "col", assertion: "countAtLeast", value: 2, description: "at least 2 <col> elements exist" },
    { query: "table", assertion: "exists", description: "<table> element exists" },
    { assertion: "sourceMatch", value: "span=", description: "a col element uses the span attribute" },
    { query: "thead", assertion: "exists", description: "<thead> element exists" }
  ],
  hints: [
    "Column groups define structural groupings of columns within a table. Each col element represents one or more columns, and the span attribute controls how many columns a single col covers.",
    "Place `<colgroup>` right after the opening `<table>` tag (before `<thead>`). Inside it, add `<col>` elements. Use `span=\"2\"` on a col to make it cover two columns at once."
  ],
  resources: [
    { label: "MDN: colgroup", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/colgroup", description: "The colgroup element for grouping table columns" },
    { label: "MDN: col", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/col", description: "The col element and the span attribute" }
  ],
  solutionGate: 10,
  basePoints: 25
});

// 1287 — Row Headers with Scope
data.exercises.push({
  id: 1287,
  title: "Row Headers with Scope",
  type: "html",
  tier: 2,
  category: ["html", "tables"],
  tags: ["html", "table", "th", "scope", "row-headers", "accessibility"],
  description: "Create a weekly schedule table that uses both row and column headers with appropriate scope attributes.",
  instructions: "Create a class schedule table where both the first row and the first column contain headers.\n\nYour table should include:\n- A header row in `<thead>` with column headers for days of the week (at least 3 days). Each `<th>` should have `scope=\"col\"`.\n- A `<tbody>` where each row starts with a `<th>` for the time slot (such as 9:00 AM, 10:00 AM). Each of these row headers should have `scope=\"row\"`.\n- At least 3 data rows with class names in the `<td>` cells\n- At least 6 `<th>` elements total across the table\n\nUsing `scope=\"row\"` tells screen readers that a header cell labels the entire row, while `scope=\"col\"` labels the entire column.",
  starterCode: "<!-- Create a schedule table with row and column headers -->\n",
  solution: "<table>\n  <thead>\n    <tr>\n      <th></th>\n      <th scope=\"col\">Monday</th>\n      <th scope=\"col\">Tuesday</th>\n      <th scope=\"col\">Wednesday</th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr>\n      <th scope=\"row\">9:00 AM</th>\n      <td>Math</td>\n      <td>English</td>\n      <td>Science</td>\n    </tr>\n    <tr>\n      <th scope=\"row\">10:00 AM</th>\n      <td>History</td>\n      <td>Art</td>\n      <td>Math</td>\n    </tr>\n    <tr>\n      <th scope=\"row\">11:00 AM</th>\n      <td>PE</td>\n      <td>Music</td>\n      <td>English</td>\n    </tr>\n  </tbody>\n</table>",
  testRunner: "",
  testCases: [
    { assertion: "sourceMatch", value: "scope=\"row\"", description: "at least one th uses scope=\"row\"" },
    { assertion: "sourceMatch", value: "scope=\"col\"", description: "at least one th uses scope=\"col\"" },
    { query: "th", assertion: "countAtLeast", value: 6, description: "at least 6 <th> elements exist" },
    { query: "tbody", assertion: "exists", description: "<tbody> element exists" }
  ],
  hints: [
    "When a table has headers in both the first row and the first column, scope attributes clarify which direction each header applies. Column headers label downward, row headers label across.",
    "Use `scope=\"col\"` on the day-name headers in the top row and `scope=\"row\"` on the time-slot headers in the first cell of each body row."
  ],
  resources: [
    { label: "MDN: th", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/th", description: "The th element and scope attribute" },
    { label: "MDN: Table accessibility", url: "https://developer.mozilla.org/en-US/docs/Learn/HTML/Tables/Advanced", description: "Advanced table features and accessibility" }
  ],
  solutionGate: 10,
  basePoints: 25
});

// 1288 — Data Table with Footer Calculations
data.exercises.push({
  id: 1288,
  title: "Data Table with Footer Calculations",
  type: "html",
  tier: 2,
  category: ["html", "tables"],
  tags: ["html", "table", "thead", "tbody", "tfoot", "semantic"],
  description: "Create an expense report table that uses thead, tbody, and tfoot to separate header, data, and summary rows.",
  instructions: "Build an expense report table with three distinct sections: header, body, and footer.\n\nYour table should include:\n- A `<thead>` with a header row containing: Description, Category, Amount\n- A `<tbody>` with at least 4 expense rows (for example: Office Supplies / Supplies / $45.00)\n- A `<tfoot>` with a total row. Use a `<th>` element in the footer for the word \"Total\" to mark it as a header\n- At least 6 `<tr>` elements total (1 header + 4 body + 1 footer)\n\nThe `<tfoot>` element groups footer rows, typically used for summaries or totals. Browsers may render it at the bottom of the table regardless of where it appears in the source code.",
  starterCode: "<!-- Create an expense report table with thead, tbody, and tfoot -->\n",
  solution: "<table>\n  <thead>\n    <tr>\n      <th>Description</th>\n      <th>Category</th>\n      <th>Amount</th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr>\n      <td>Office Supplies</td>\n      <td>Supplies</td>\n      <td>$45.00</td>\n    </tr>\n    <tr>\n      <td>Software License</td>\n      <td>Technology</td>\n      <td>$120.00</td>\n    </tr>\n    <tr>\n      <td>Team Lunch</td>\n      <td>Meals</td>\n      <td>$85.00</td>\n    </tr>\n    <tr>\n      <td>Printer Paper</td>\n      <td>Supplies</td>\n      <td>$22.00</td>\n    </tr>\n  </tbody>\n  <tfoot>\n    <tr>\n      <th colspan=\"2\">Total</th>\n      <td>$272.00</td>\n    </tr>\n  </tfoot>\n</table>",
  testRunner: "",
  testCases: [
    { query: "thead", assertion: "exists", description: "<thead> element exists" },
    { query: "tbody", assertion: "exists", description: "<tbody> element exists" },
    { query: "tfoot", assertion: "exists", description: "<tfoot> element exists" },
    { query: "tr", assertion: "countAtLeast", value: 6, description: "at least 6 <tr> rows exist (1 header + 4 body + 1 footer)" },
    { query: "tfoot th, tfoot td", assertion: "exists", description: "tfoot contains at least one th or td element" }
  ],
  hints: [
    "A table footer groups summary rows at the bottom. It works alongside thead and tbody to give the table clear sections that browsers and screen readers can identify.",
    "Wrap the column headings in `<thead>`, expense rows in `<tbody>`, and the total row in `<tfoot>`. Use a `<th>` in the footer row for the label \"Total\"."
  ],
  resources: [
    { label: "MDN: tfoot", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/tfoot", description: "The tfoot element for table footer rows" },
    { label: "MDN: thead", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/thead", description: "The thead element for table header rows" }
  ],
  solutionGate: 10,
  basePoints: 25
});

// ============================================================
// Section 4: Forms Depth (6 T2 + 2 T3, IDs 1289-1296)
// Advanced form controls, validation, and multi-section forms
// ============================================================

// 1289 — Form Validation Attributes
data.exercises.push({
  id: 1289,
  title: "Form Validation Attributes",
  type: "html",
  tier: 2,
  category: ["html", "forms"],
  tags: ["html", "form", "validation", "required", "minlength", "pattern", "min", "max"],
  description: "Create a signup form that uses built-in HTML validation attributes to enforce input requirements.",
  instructions: "Create a signup form that demonstrates HTML's built-in validation attributes.\n\nYour form should include:\n- A `<form>` element wrapping all inputs\n- An email input with the `required` attribute\n- A password input with `minlength=\"8\"`\n- A number input for age with `min=\"13\"` and `max=\"120\"`\n- A text input for username with a `pattern` attribute that allows only letters and numbers (use the pattern `[A-Za-z0-9]+`)\n- A submit button\n\nHTML validation attributes let the browser check user input before submission without any JavaScript. The `required` attribute prevents empty submissions, `minlength` enforces a minimum character count, `min` and `max` set numeric bounds, and `pattern` enforces a regular expression.",
  starterCode: "<!-- Create a signup form with validation attributes -->\n",
  solution: "<form>\n  <label for=\"email\">Email:</label>\n  <input type=\"email\" id=\"email\" name=\"email\" required>\n\n  <label for=\"password\">Password:</label>\n  <input type=\"password\" id=\"password\" name=\"password\" minlength=\"8\">\n\n  <label for=\"age\">Age:</label>\n  <input type=\"number\" id=\"age\" name=\"age\" min=\"13\" max=\"120\">\n\n  <label for=\"username\">Username:</label>\n  <input type=\"text\" id=\"username\" name=\"username\" pattern=\"[A-Za-z0-9]+\">\n\n  <button type=\"submit\">Sign Up</button>\n</form>",
  testRunner: "",
  testCases: [
    { assertion: "sourceMatch", value: "required", description: "at least one input uses the required attribute" },
    { assertion: "sourceMatch", value: "minlength", description: "an input uses the minlength attribute" },
    { assertion: "sourceMatch", value: "min=", description: "an input uses the min attribute" },
    { assertion: "sourceMatch", value: "pattern=", description: "an input uses the pattern attribute" },
    { query: "form", assertion: "exists", description: "<form> element exists" }
  ],
  hints: [
    "Validation attributes are added directly to input elements. Each attribute enforces a different kind of constraint that the browser checks when the form is submitted.",
    "Add `required` to the email input, `minlength=\"8\"` to the password, `min=\"13\" max=\"120\"` to the age number input, and `pattern=\"[A-Za-z0-9]+\"` to the username text input."
  ],
  resources: [
    { label: "MDN: Form validation", url: "https://developer.mozilla.org/en-US/docs/Learn/Forms/Form_validation", description: "Client-side form validation techniques" },
    { label: "MDN: input attributes", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attributes", description: "Validation-related input attributes" }
  ],
  solutionGate: 10,
  basePoints: 25
});

// 1290 — Radio Buttons and Checkboxes
data.exercises.push({
  id: 1290,
  title: "Radio Buttons and Checkboxes",
  type: "html",
  tier: 2,
  category: ["html", "forms"],
  tags: ["html", "form", "radio", "checkbox", "label", "input-groups"],
  description: "Create a survey form with a radio button group for single-choice and a checkbox group for multiple-choice selections.",
  instructions: "Create a survey form with two types of input groups.\n\nYour form should include:\n1. A radio button group for \"Favorite Season\" with 4 options: Spring, Summer, Fall, Winter. All radio buttons must share the same `name` attribute (such as `name=\"season\"`) so only one can be selected at a time.\n\n2. A checkbox group for \"Hobbies\" with at least 3 options (such as Reading, Cooking, Gaming). Checkboxes allow multiple selections.\n\n3. Every radio button and checkbox must have a corresponding `<label>` element. Use the `for` attribute on the label matching the `id` of the input.\n\nRadio buttons with the same `name` form an exclusive group. Checkboxes are independent and allow any combination of selections.",
  starterCode: "<!-- Create a survey form with radio buttons and checkboxes -->\n",
  solution: "<form>\n  <fieldset>\n    <legend>Favorite Season</legend>\n    <label for=\"spring\"><input type=\"radio\" id=\"spring\" name=\"season\" value=\"spring\"> Spring</label>\n    <label for=\"summer\"><input type=\"radio\" id=\"summer\" name=\"season\" value=\"summer\"> Summer</label>\n    <label for=\"fall\"><input type=\"radio\" id=\"fall\" name=\"season\" value=\"fall\"> Fall</label>\n    <label for=\"winter\"><input type=\"radio\" id=\"winter\" name=\"season\" value=\"winter\"> Winter</label>\n  </fieldset>\n\n  <fieldset>\n    <legend>Hobbies</legend>\n    <label for=\"reading\"><input type=\"checkbox\" id=\"reading\" name=\"hobbies\" value=\"reading\"> Reading</label>\n    <label for=\"cooking\"><input type=\"checkbox\" id=\"cooking\" name=\"hobbies\" value=\"cooking\"> Cooking</label>\n    <label for=\"gaming\"><input type=\"checkbox\" id=\"gaming\" name=\"hobbies\" value=\"gaming\"> Gaming</label>\n  </fieldset>\n</form>",
  testRunner: "",
  testCases: [
    { assertion: "sourceMatch", value: "type=\"radio\"", description: "at least one radio button input exists" },
    { assertion: "sourceMatch", value: "type=\"checkbox\"", description: "at least one checkbox input exists" },
    { query: "label", assertion: "countAtLeast", value: 7, description: "at least 7 <label> elements exist (4 radio + 3 checkbox)" },
    { assertion: "sourceMatch", value: "name=\"season\"", description: "radio buttons share a common name attribute" }
  ],
  hints: [
    "Radio buttons in the same group must share an identical name attribute so the browser enforces single selection. Checkboxes do not have this restriction.",
    "Give all four season radio inputs `name=\"season\"`. Give each input a unique `id` and pair it with a `<label for=\"...\">` that matches."
  ],
  resources: [
    { label: "MDN: input type radio", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/radio", description: "Radio button inputs and grouping" },
    { label: "MDN: input type checkbox", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/checkbox", description: "Checkbox inputs for multiple selections" }
  ],
  solutionGate: 10,
  basePoints: 25
});

// 1291 — Datalist Element
data.exercises.push({
  id: 1291,
  title: "Datalist Element",
  type: "html",
  tier: 2,
  category: ["html", "forms"],
  tags: ["html", "datalist", "option", "autocomplete", "input", "list"],
  description: "Create a text input connected to a datalist element that provides autocomplete suggestions for programming languages.",
  instructions: "Create an input with autocomplete suggestions using the `<datalist>` element.\n\nYour form should include:\n- A `<label>` for the input\n- A text `<input>` with a `list` attribute whose value matches the `id` of the datalist\n- A `<datalist>` element with at least 5 `<option>` elements, each with a `value` attribute for a programming language (such as JavaScript, Python, Java, C++, Ruby)\n\nThe `<datalist>` element provides a dropdown of suggestions that the user can choose from or ignore. Unlike a `<select>`, the user can also type a custom value. The connection between the input and the datalist is made by matching the input's `list` attribute to the datalist's `id`.",
  starterCode: "<!-- Create an input with datalist autocomplete suggestions -->\n",
  solution: "<label for=\"language\">Choose a language:</label>\n<input type=\"text\" id=\"language\" name=\"language\" list=\"languages\">\n<datalist id=\"languages\">\n  <option value=\"JavaScript\"></option>\n  <option value=\"Python\"></option>\n  <option value=\"Java\"></option>\n  <option value=\"C++\"></option>\n  <option value=\"Ruby\"></option>\n</datalist>",
  testRunner: "",
  testCases: [
    { query: "datalist", assertion: "exists", description: "<datalist> element exists" },
    { assertion: "sourceMatch", value: "list=", description: "input has a list attribute linking to the datalist" },
    { query: "option", assertion: "countAtLeast", value: 5, description: "at least 5 <option> elements exist" },
    { query: "input", assertion: "exists", description: "<input> element exists" }
  ],
  hints: [
    "A datalist provides suggested values for an input, but the user is free to type something different. The connection relies on matching IDs between the input and the datalist.",
    "Set the input's `list` attribute to the same value as the datalist's `id`. Inside the datalist, add `<option value=\"...\">` for each suggestion."
  ],
  resources: [
    { label: "MDN: datalist", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/datalist", description: "The datalist element for input suggestions" },
    { label: "MDN: input list attribute", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#list", description: "Connecting an input to a datalist" }
  ],
  solutionGate: 10,
  basePoints: 25
});

// 1292 — Output Element
data.exercises.push({
  id: 1292,
  title: "Output Element",
  type: "html",
  tier: 2,
  category: ["html", "forms"],
  tags: ["html", "output", "form", "for", "number-input", "calculation"],
  description: "Create a form with two number inputs and an output element that represents the result of a calculation.",
  instructions: "Create a form that uses the `<output>` element to represent a calculation result.\n\nYour form should include:\n- A `<form>` element wrapping everything\n- Two `<input>` elements with `type=\"number\"`, each with an `id` (such as \"a\" and \"b\")\n- An `<output>` element with a `for` attribute that references both input IDs (space-separated, such as `for=\"a b\"`)\n- A `<label>` for the output element\n\nThe `<output>` element is a semantic container for the result of a calculation or user action. Its `for` attribute lists the IDs of the elements that contribute to the result, creating an explicit relationship between inputs and their output.",
  starterCode: "<!-- Create a form with number inputs and an output element -->\n",
  solution: "<form>\n  <label for=\"a\">Value A:</label>\n  <input type=\"number\" id=\"a\" name=\"a\" value=\"10\">\n\n  <label for=\"b\">Value B:</label>\n  <input type=\"number\" id=\"b\" name=\"b\" value=\"5\">\n\n  <label for=\"result\">Result:</label>\n  <output id=\"result\" name=\"result\" for=\"a b\">15</output>\n</form>",
  testRunner: "",
  testCases: [
    { query: "output", assertion: "exists", description: "<output> element exists" },
    { assertion: "sourceMatch", value: "type=\"number\"", description: "at least one number input exists" },
    { assertion: "sourceContains", value: "for=", description: "the output element has a for attribute" },
    { query: "form", assertion: "exists", description: "<form> element exists" }
  ],
  hints: [
    "The output element is designed to display the result of a calculation. Its for attribute creates a semantic link to the inputs that produce the result.",
    "Add `for=\"a b\"` to the output element, where \"a\" and \"b\" match the id attributes of the two number inputs."
  ],
  resources: [
    { label: "MDN: output", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/output", description: "The output element for calculation results" },
    { label: "MDN: input type number", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/number", description: "Number input type reference" }
  ],
  solutionGate: 10,
  basePoints: 25
});

// 1293 — Meter and Progress Elements
data.exercises.push({
  id: 1293,
  title: "Meter and Progress Elements",
  type: "html",
  tier: 2,
  category: ["html", "forms"],
  tags: ["html", "meter", "progress", "value", "min", "max", "dashboard"],
  description: "Create a dashboard display using meter and progress elements to visualize measured values and task completion.",
  instructions: "Create a small dashboard that uses both `<meter>` and `<progress>` elements.\n\nYour page should include:\n1. A `<meter>` element for disk usage with these attributes: `value`, `min`, `max`, `low`, `high`, and `optimum`. For example: value=\"60\", min=\"0\", max=\"100\", low=\"25\", high=\"75\", optimum=\"50\".\n\n2. A `<progress>` element for download progress with `value` and `max` attributes. For example: value=\"70\" max=\"100\".\n\n3. A `<label>` for each element (at least 2 labels total).\n\nThe `<meter>` element represents a scalar value within a known range (like disk usage or battery level). The `<progress>` element represents the completion of a task (like a file download or form step).",
  starterCode: "<!-- Create a dashboard with meter and progress elements -->\n",
  solution: "<div>\n  <label for=\"disk\">Disk Usage:</label>\n  <meter id=\"disk\" value=\"60\" min=\"0\" max=\"100\" low=\"25\" high=\"75\" optimum=\"50\">60%</meter>\n</div>\n\n<div>\n  <label for=\"download\">Download Progress:</label>\n  <progress id=\"download\" value=\"70\" max=\"100\">70%</progress>\n</div>",
  testRunner: "",
  testCases: [
    { query: "meter", assertion: "exists", description: "<meter> element exists" },
    { query: "progress", assertion: "exists", description: "<progress> element exists" },
    { assertion: "sourceMatch", value: "value=", description: "at least one element has a value attribute" },
    { assertion: "sourceMatch", value: "max=", description: "at least one element has a max attribute" },
    { query: "label", assertion: "countAtLeast", value: 2, description: "at least 2 <label> elements exist" }
  ],
  hints: [
    "Meter is for a measurement within a known range, like disk space or temperature. Progress is for showing how far along a task is, like a download or upload.",
    "A meter needs `value`, `min`, `max`, and optionally `low`, `high`, `optimum`. A progress element only needs `value` and `max`. Label each one with a `<label>` using the `for` attribute."
  ],
  resources: [
    { label: "MDN: meter", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meter", description: "The meter element for scalar measurements" },
    { label: "MDN: progress", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/progress", description: "The progress element for task completion" }
  ],
  solutionGate: 10,
  basePoints: 25
});

// 1294 — Optgroup in Select
data.exercises.push({
  id: 1294,
  title: "Optgroup in Select",
  type: "html",
  tier: 2,
  category: ["html", "forms"],
  tags: ["html", "select", "optgroup", "option", "dropdown", "grouping"],
  description: "Create a course selection dropdown that uses optgroup elements to organize options by department.",
  instructions: "Create a `<select>` dropdown that groups options into categories using `<optgroup>`.\n\nYour select should include:\n- A `<label>` for the select element\n- A `<select>` element containing at least 2 `<optgroup>` elements\n- Each `<optgroup>` must have a `label` attribute naming the department (such as \"Computer Science\" and \"Mathematics\")\n- Each group should contain at least 2 `<option>` elements for specific courses\n\nThe `<optgroup>` element groups related options under a non-selectable heading. This helps users navigate long dropdowns by organizing choices into logical categories.",
  starterCode: "<!-- Create a select dropdown with optgroup categories -->\n",
  solution: "<label for=\"course\">Choose a Course:</label>\n<select id=\"course\" name=\"course\">\n  <optgroup label=\"Computer Science\">\n    <option value=\"cs101\">CS 101: Intro to Programming</option>\n    <option value=\"cs201\">CS 201: Data Structures</option>\n  </optgroup>\n  <optgroup label=\"Mathematics\">\n    <option value=\"math101\">MATH 101: College Algebra</option>\n    <option value=\"math201\">MATH 201: Calculus I</option>\n  </optgroup>\n  <optgroup label=\"English\">\n    <option value=\"eng101\">ENG 101: Composition</option>\n    <option value=\"eng201\">ENG 201: Literature</option>\n  </optgroup>\n</select>",
  testRunner: "",
  testCases: [
    { query: "select", assertion: "exists", description: "<select> element exists" },
    { query: "optgroup", assertion: "countAtLeast", value: 2, description: "at least 2 <optgroup> elements exist" },
    { query: "option", assertion: "countAtLeast", value: 4, description: "at least 4 <option> elements exist" },
    { assertion: "sourceMatch", value: "label=", description: "optgroup elements have label attributes" }
  ],
  hints: [
    "Optgroup creates a labeled heading inside a select dropdown. The heading itself cannot be selected, but the options nested inside it can.",
    "Wrap related `<option>` elements inside `<optgroup label=\"Department Name\">`. The label attribute becomes the visible group heading in the dropdown."
  ],
  resources: [
    { label: "MDN: optgroup", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/optgroup", description: "The optgroup element for grouping select options" },
    { label: "MDN: select", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/select", description: "The select element for dropdown menus" }
  ],
  solutionGate: 10,
  basePoints: 25
});

// 1295 — Multi-Section Form (T3)
data.exercises.push({
  id: 1295,
  title: "Multi-Section Form",
  type: "html",
  tier: 3,
  category: ["html", "forms"],
  tags: ["html", "form", "fieldset", "legend", "textarea", "select", "multi-section"],
  description: "Build a job application form organized into three fieldsets covering personal information, experience, and preferences.",
  instructions: "Build a complete job application form divided into three logical sections using `<fieldset>` and `<legend>` elements.\n\nYour form must include:\n\n1. A \"Personal Information\" fieldset with:\n   - A text input for full name\n   - An email input for email address\n   - A tel input for phone number\n   - Labels for all inputs\n\n2. An \"Experience\" fieldset with:\n   - A `<textarea>` for a short bio\n   - A number input for years of experience\n   - Labels for all inputs\n\n3. A \"Preferences\" fieldset with:\n   - A `<select>` dropdown for department choice\n   - A checkbox input for whether the applicant prefers remote work\n   - Labels for all inputs\n\nAll inputs must have corresponding `<label>` elements. Use appropriate input types throughout.",
  starterCode: "<!-- Build a job application form -->\n",
  solution: "<form>\n  <fieldset>\n    <legend>Personal Information</legend>\n    <label for=\"fullname\">Full Name:</label>\n    <input type=\"text\" id=\"fullname\" name=\"fullname\">\n\n    <label for=\"email\">Email:</label>\n    <input type=\"email\" id=\"email\" name=\"email\">\n\n    <label for=\"phone\">Phone:</label>\n    <input type=\"tel\" id=\"phone\" name=\"phone\">\n  </fieldset>\n\n  <fieldset>\n    <legend>Experience</legend>\n    <label for=\"bio\">Short Bio:</label>\n    <textarea id=\"bio\" name=\"bio\" rows=\"4\"></textarea>\n\n    <label for=\"years\">Years of Experience:</label>\n    <input type=\"number\" id=\"years\" name=\"years\" min=\"0\">\n  </fieldset>\n\n  <fieldset>\n    <legend>Preferences</legend>\n    <label for=\"department\">Department:</label>\n    <select id=\"department\" name=\"department\">\n      <option value=\"engineering\">Engineering</option>\n      <option value=\"design\">Design</option>\n      <option value=\"marketing\">Marketing</option>\n    </select>\n\n    <label for=\"remote\">Prefer Remote Work:</label>\n    <input type=\"checkbox\" id=\"remote\" name=\"remote\">\n  </fieldset>\n\n  <button type=\"submit\">Submit Application</button>\n</form>",
  testRunner: "",
  testCases: [
    { query: "fieldset", assertion: "countAtLeast", value: 3, description: "at least 3 <fieldset> elements exist" },
    { query: "legend", assertion: "countAtLeast", value: 3, description: "at least 3 <legend> elements exist" },
    { query: "textarea", assertion: "exists", description: "<textarea> element exists" },
    { query: "select", assertion: "exists", description: "<select> element exists" },
    { assertion: "sourceContains", value: "type=\"email\"", description: "an email input type is used" },
    { query: "label", assertion: "countAtLeast", value: 6, description: "at least 6 <label> elements exist" }
  ],
  hints: [
    "Each fieldset groups related form controls together and needs a legend as its first child to describe the group. This structure helps screen readers announce form sections.",
    "Create three `<fieldset>` elements, each starting with a `<legend>`. Put the relevant inputs and labels inside each fieldset. Use `type=\"email\"` for email, `type=\"tel\"` for phone, and `type=\"number\"` for years."
  ],
  resources: [
    { label: "MDN: fieldset", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/fieldset", description: "The fieldset element for grouping form controls" },
    { label: "MDN: legend", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/legend", description: "The legend element for fieldset captions" }
  ],
  solutionGate: 10,
  basePoints: 50
});

// 1296 — Form with Custom Validation Messages (T3)
data.exercises.push({
  id: 1296,
  title: "Form with Custom Validation Messages",
  type: "html",
  tier: 3,
  category: ["html", "forms"],
  tags: ["html", "form", "validation", "aria-describedby", "title", "password", "accessibility"],
  description: "Create a password reset form that uses the title attribute and aria-describedby to provide accessible validation hints.",
  instructions: "Create a password reset form that provides clear validation guidance to all users, including those using screen readers.\n\nYour form must include:\n- A `<form>` element wrapping everything\n- A password input with:\n  - The `required` attribute\n  - `minlength=\"8\"`\n  - A `title` attribute explaining the requirements (such as \"Must be at least 8 characters with one number\")\n  - An `aria-describedby` attribute pointing to a description element\n- A second password input for confirmation\n- A `<span>` element with an `id` that matches the `aria-describedby` value, containing visible text describing the password requirements\n- A submit button (either `<button type=\"submit\">` or `<input type=\"submit\">`)\n\nThe `title` attribute shows a tooltip on hover with validation guidance. The `aria-describedby` attribute links the input to a visible description that screen readers will announce when the input receives focus.",
  starterCode: "<!-- Create a password reset form with validation hints -->\n",
  solution: "<form>\n  <label for=\"new-password\">New Password:</label>\n  <input type=\"password\" id=\"new-password\" name=\"new-password\" required minlength=\"8\" title=\"Must be at least 8 characters with one number\" aria-describedby=\"password-requirements\">\n  <span id=\"password-requirements\">Password must be at least 8 characters long and include at least one number.</span>\n\n  <label for=\"confirm-password\">Confirm Password:</label>\n  <input type=\"password\" id=\"confirm-password\" name=\"confirm-password\" required>\n\n  <button type=\"submit\">Reset Password</button>\n</form>",
  testRunner: "",
  testCases: [
    { assertion: "sourceMatch", value: "aria-describedby", description: "an input uses the aria-describedby attribute" },
    { assertion: "sourceMatch", value: "title=", description: "an input uses the title attribute for validation hints" },
    { assertion: "sourceMatch", value: "minlength", description: "a password input uses the minlength attribute" },
    { assertion: "sourceMatch", value: "type=\"password\"", description: "at least one password input exists" },
    { query: "form", assertion: "exists", description: "<form> element exists" },
    { assertion: "sourceMatch", value: "type=\"submit\"|<button", description: "a submit button exists" }
  ],
  hints: [
    "The title attribute provides a browser tooltip, while aria-describedby connects an input to a visible text element that screen readers will read aloud. Both work together to make validation requirements clear to all users.",
    "Add `title=\"...\"` and `aria-describedby=\"password-requirements\"` to the password input. Create a `<span id=\"password-requirements\">` with the requirement text. The id on the span must match the aria-describedby value exactly."
  ],
  resources: [
    { label: "MDN: aria-describedby", url: "https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-describedby", description: "Linking inputs to descriptive text for accessibility" },
    { label: "MDN: input validation", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Constraint_validation", description: "HTML constraint validation overview" }
  ],
  solutionGate: 10,
  basePoints: 50
});

// Write the updated file
fs.writeFileSync(CURRICULUM_FILE, JSON.stringify(data, null, 2) + '\n');

const addedCount = 12;
console.log(`Added ${addedCount} HTML exercises (IDs 1285-1296)`);
console.log(`  Section 3: 4 T2 exercises (IDs 1285-1288) — Tables Depth`);
console.log(`  Section 4: 6 T2 + 2 T3 exercises (IDs 1289-1296) — Forms Depth`);
console.log(`Total exercises: ${data.exercises.length}`);
