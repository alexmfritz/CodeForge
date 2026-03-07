/**
 * Hard Math & Science — Section 2: Geometry & Trigonometry
 * 15 exercises (IDs 1100-1114): 3 T2, 6 T3, 4 T4, 2 T5
 *
 * Appends to the existing hard-math-science.json collection file.
 */

const fs = require('fs');
const path = require('path');

const COLLECTION_FILE = path.join(__dirname, 'hard-math-science.json');
const collection = JSON.parse(fs.readFileSync(COLLECTION_FILE, 'utf8'));

let nextId = 1100;
function id() { return nextId++; }

const exercises = [];

// ─── T2-1: Circle Calculations ─────────────────────────────────────────────
exercises.push({
  id: id(),
  title: "Geometry: Circle Calculations",
  type: "js",
  tier: 2,
  category: ["math", "geometry"],
  tags: ["math", "geometry", "circles", "pi"],
  description: "Calculate the area and circumference of a circle given its radius.",
  instructions: "Write a function called `circle` that takes a radius `r` and returns an object with `area` and `circumference`, both rounded to 2 decimal places.\n\nFormulas:\n- Area = π × r²\n- Circumference = 2 × π × r\n\nExample:\n```\ncircle(5)   // Returns: { area: 78.54, circumference: 31.42 }\ncircle(1)   // Returns: { area: 3.14, circumference: 6.28 }\n```",
  starterCode: "// Return an object with area and circumference, rounded to 2 decimals\nfunction circle(r) {\n  \n}",
  solution: "function circle(r) {\n  return {\n    area: Math.round(Math.PI * r * r * 100) / 100,\n    circumference: Math.round(2 * Math.PI * r * 100) / 100\n  };\n}",
  testRunner: `(code) => {
  const fn = new Function(code + '; return circle;')();
  const results = [];
  let r = fn(5);
  results.push({ pass: r.area === 78.54, description: 'circle(5).area is 78.54', got: String(r.area) });
  results.push({ pass: r.circumference === 31.42, description: 'circle(5).circumference is 31.42', got: String(r.circumference) });
  r = fn(1);
  results.push({ pass: r.area === 3.14, description: 'circle(1).area is 3.14', got: String(r.area) });
  results.push({ pass: r.circumference === 6.28, description: 'circle(1).circumference is 6.28', got: String(r.circumference) });
  r = fn(10);
  results.push({ pass: r.area === 314.16, description: 'circle(10).area is 314.16', got: String(r.area) });
  r = fn(0);
  results.push({ pass: r.area === 0 && r.circumference === 0, description: 'circle(0) is { area: 0, circumference: 0 }', got: JSON.stringify(r) });
  return results;
}`,
  testCases: [],
  dataset: "",
  hints: [
    "Use `Math.PI` for π. Area is `Math.PI * r * r` and circumference is `2 * Math.PI * r`.",
    "Round to 2 decimal places with `Math.round(value * 100) / 100`."
  ],
  resources: [
    { label: "MDN: Math.PI", url: "/docs/mdn/math-pi.html" }
  ],
  solutionGate: 10,
  basePoints: 25
});

// ─── T2-2: Distance Between Points ─────────────────────────────────────────
exercises.push({
  id: id(),
  title: "Geometry: Distance Formula",
  type: "js",
  tier: 2,
  category: ["math", "geometry"],
  tags: ["math", "geometry", "distance", "coordinates"],
  description: "Calculate the Euclidean distance between two points in 2D space.",
  instructions: "Write a function called `distance` that takes four numbers `x1`, `y1`, `x2`, `y2` and returns the distance between points (x1, y1) and (x2, y2), rounded to 2 decimal places.\n\nFormula: d = √((x2-x1)² + (y2-y1)²)\n\nExample:\n```\ndistance(0, 0, 3, 4)   // Returns: 5\ndistance(1, 1, 4, 5)   // Returns: 5\ndistance(0, 0, 0, 0)   // Returns: 0\n```",
  starterCode: "// Return the distance between (x1,y1) and (x2,y2), rounded to 2 decimals\nfunction distance(x1, y1, x2, y2) {\n  \n}",
  solution: "function distance(x1, y1, x2, y2) {\n  return Math.round(Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2) * 100) / 100;\n}",
  testRunner: `(code) => {
  const fn = new Function(code + '; return distance;')();
  const results = [];
  results.push({ pass: fn(0, 0, 3, 4) === 5, description: '(0,0) to (3,4) is 5', got: String(fn(0, 0, 3, 4)) });
  results.push({ pass: fn(1, 1, 4, 5) === 5, description: '(1,1) to (4,5) is 5', got: String(fn(1, 1, 4, 5)) });
  results.push({ pass: fn(0, 0, 0, 0) === 0, description: 'Same point is 0', got: String(fn(0, 0, 0, 0)) });
  results.push({ pass: fn(-3, -4, 0, 0) === 5, description: '(-3,-4) to (0,0) is 5', got: String(fn(-3, -4, 0, 0)) });
  results.push({ pass: fn(0, 0, 1, 1) === 1.41, description: '(0,0) to (1,1) is 1.41', got: String(fn(0, 0, 1, 1)) });
  results.push({ pass: fn(2, 3, 5, 7) === 5, description: '(2,3) to (5,7) is 5', got: String(fn(2, 3, 5, 7)) });
  return results;
}`,
  testCases: [],
  dataset: "",
  hints: [
    "The Euclidean distance formula is the square root of the sum of squared differences: `Math.sqrt((x2-x1)**2 + (y2-y1)**2)`.",
    "Use `Math.round(value * 100) / 100` to round to 2 decimal places."
  ],
  resources: [
    { label: "MDN: Math.sqrt()", url: "/docs/mdn/math-sqrt.html" }
  ],
  solutionGate: 10,
  basePoints: 25
});

// ─── T2-3: Triangle Area ───────────────────────────────────────────────────
exercises.push({
  id: id(),
  title: "Geometry: Triangle Area",
  type: "js",
  tier: 2,
  category: ["math", "geometry"],
  tags: ["math", "geometry", "triangles", "heron"],
  description: "Calculate the area of a triangle given three side lengths using Heron's formula.",
  instructions: "Write a function called `triangleArea` that takes three side lengths `a`, `b`, `c` and returns the area of the triangle, rounded to 2 decimal places.\n\nReturn `-1` if the sides cannot form a valid triangle (any side must be less than the sum of the other two).\n\nHeron's formula:\n- s = (a + b + c) / 2\n- area = √(s × (s-a) × (s-b) × (s-c))\n\nExample:\n```\ntriangleArea(3, 4, 5)   // Returns: 6\ntriangleArea(5, 5, 5)   // Returns: 10.83\ntriangleArea(1, 1, 10)  // Returns: -1 (invalid triangle)\n```",
  starterCode: "// Return area using Heron's formula, or -1 if invalid\nfunction triangleArea(a, b, c) {\n  \n}",
  solution: "function triangleArea(a, b, c) {\n  if (a + b <= c || a + c <= b || b + c <= a) return -1;\n  const s = (a + b + c) / 2;\n  return Math.round(Math.sqrt(s * (s - a) * (s - b) * (s - c)) * 100) / 100;\n}",
  testRunner: `(code) => {
  const fn = new Function(code + '; return triangleArea;')();
  const results = [];
  results.push({ pass: fn(3, 4, 5) === 6, description: '3-4-5 right triangle area is 6', got: String(fn(3, 4, 5)) });
  results.push({ pass: fn(5, 5, 5) === 10.83, description: 'Equilateral 5-5-5 area is 10.83', got: String(fn(5, 5, 5)) });
  results.push({ pass: fn(1, 1, 10) === -1, description: '1-1-10 is invalid (-1)', got: String(fn(1, 1, 10)) });
  results.push({ pass: fn(7, 8, 9) === 26.83, description: '7-8-9 area is 26.83', got: String(fn(7, 8, 9)) });
  results.push({ pass: fn(0, 5, 5) === -1, description: '0-5-5 is invalid (-1)', got: String(fn(0, 5, 5)) });
  results.push({ pass: fn(10, 10, 10) === 43.3, description: 'Equilateral 10-10-10 area is 43.3', got: String(fn(10, 10, 10)) });
  return results;
}`,
  testCases: [],
  dataset: "",
  hints: [
    "First check the triangle inequality: each side must be strictly less than the sum of the other two. Then apply Heron's formula.",
    "Compute `s = (a + b + c) / 2`, then `area = Math.sqrt(s * (s-a) * (s-b) * (s-c))`. Round with `Math.round(val * 100) / 100`."
  ],
  resources: [
    { label: "MDN: Math.sqrt()", url: "/docs/mdn/math-sqrt.html" }
  ],
  solutionGate: 10,
  basePoints: 25
});

// ─── T3-1: Degrees to Radians & Trig Values ────────────────────────────────
exercises.push({
  id: id(),
  title: "Geometry: Trig Values",
  type: "js",
  tier: 3,
  category: ["math", "geometry"],
  tags: ["math", "trigonometry", "sin", "cos", "tan"],
  description: "Compute sine, cosine, and tangent for a given angle in degrees.",
  instructions: "Write a function called `trigValues` that takes an angle in degrees and returns an object with `sin`, `cos`, and `tan` values, each rounded to 4 decimal places.\n\nFor angles where tangent is undefined (90°, 270°, etc.), set `tan` to `\"undefined\"`.\n\nExample:\n```\ntrigValues(45)  // Returns: { sin: 0.7071, cos: 0.7071, tan: 1 }\ntrigValues(0)   // Returns: { sin: 0, cos: 1, tan: 0 }\ntrigValues(90)  // Returns: { sin: 1, cos: 0, tan: \"undefined\" }\n```",
  starterCode: "function trigValues(degrees) {\n  \n}",
  solution: "function trigValues(degrees) {\n  const rad = degrees * Math.PI / 180;\n  const s = Math.round(Math.sin(rad) * 10000) / 10000;\n  const c = Math.round(Math.cos(rad) * 10000) / 10000;\n  return {\n    sin: s,\n    cos: c,\n    tan: Math.abs(c) < 1e-10 ? \"undefined\" : Math.round(Math.tan(rad) * 10000) / 10000\n  };\n}",
  testRunner: `(code) => {
  const fn = new Function(code + '; return trigValues;')();
  const results = [];
  let r = fn(45);
  results.push({ pass: r.sin === 0.7071, description: 'sin(45°) is 0.7071', got: String(r.sin) });
  results.push({ pass: r.cos === 0.7071, description: 'cos(45°) is 0.7071', got: String(r.cos) });
  results.push({ pass: r.tan === 1, description: 'tan(45°) is 1', got: String(r.tan) });
  r = fn(0);
  results.push({ pass: r.sin === 0 && r.cos === 1 && r.tan === 0, description: 'trigValues(0) is { sin:0, cos:1, tan:0 }', got: JSON.stringify(r) });
  r = fn(90);
  results.push({ pass: r.sin === 1 && r.tan === "undefined", description: 'sin(90°)=1, tan(90°)="undefined"', got: JSON.stringify(r) });
  r = fn(30);
  results.push({ pass: r.sin === 0.5, description: 'sin(30°) is 0.5', got: String(r.sin) });
  r = fn(180);
  results.push({ pass: r.sin === 0 && r.cos === -1, description: 'sin(180°)=0, cos(180°)=-1', got: JSON.stringify(r) });
  return results;
}`,
  testCases: [],
  dataset: "",
  hints: [
    "Convert degrees to radians: `radians = degrees * Math.PI / 180`. JavaScript's `Math.sin`, `Math.cos`, `Math.tan` use radians.",
    "Check if cosine is near zero (use `Math.abs(cos) < 1e-10`) to detect undefined tangent values. Round with `Math.round(val * 10000) / 10000`."
  ],
  resources: [
    { label: "MDN: Math.sin()", url: "/docs/mdn/math-sin.html" }
  ],
  solutionGate: 10,
  basePoints: 50
});

// ─── T3-2: Polygon Area (Shoelace) ─────────────────────────────────────────
exercises.push({
  id: id(),
  title: "Geometry: Polygon Area",
  type: "js",
  tier: 3,
  category: ["math", "geometry"],
  tags: ["math", "geometry", "polygon", "shoelace"],
  description: "Calculate the area of any simple polygon using the Shoelace formula.",
  instructions: "Write a function called `polygonArea` that takes an array of vertex objects `[{x, y}, ...]` listed in order (clockwise or counterclockwise) and returns the area, rounded to 2 decimal places.\n\nUse the Shoelace formula:\n- Sum: Σ(x_i × y_(i+1) - x_(i+1) × y_i) for consecutive vertex pairs\n- Area = |Sum| / 2\n\nExample:\n```\npolygonArea([{x:0,y:0}, {x:4,y:0}, {x:4,y:3}, {x:0,y:3}])  // Returns: 12\npolygonArea([{x:0,y:0}, {x:3,y:0}, {x:3,y:4}])                // Returns: 6\n```",
  starterCode: "function polygonArea(vertices) {\n  \n}",
  solution: "function polygonArea(vertices) {\n  let sum = 0;\n  const n = vertices.length;\n  for (let i = 0; i < n; i++) {\n    const j = (i + 1) % n;\n    sum += vertices[i].x * vertices[j].y;\n    sum -= vertices[j].x * vertices[i].y;\n  }\n  return Math.round(Math.abs(sum) / 2 * 100) / 100;\n}",
  testRunner: `(code) => {
  const fn = new Function(code + '; return polygonArea;')();
  const results = [];
  results.push({ pass: fn([{x:0,y:0},{x:4,y:0},{x:4,y:3},{x:0,y:3}]) === 12, description: '4x3 rectangle area is 12', got: String(fn([{x:0,y:0},{x:4,y:0},{x:4,y:3},{x:0,y:3}])) });
  results.push({ pass: fn([{x:0,y:0},{x:3,y:0},{x:3,y:4}]) === 6, description: '3-4-5 right triangle area is 6', got: String(fn([{x:0,y:0},{x:3,y:0},{x:3,y:4}])) });
  results.push({ pass: fn([{x:0,y:0},{x:1,y:0},{x:0.5,y:1}]) === 0.5, description: 'Small triangle area is 0.5', got: String(fn([{x:0,y:0},{x:1,y:0},{x:0.5,y:1}])) });
  results.push({ pass: fn([{x:0,y:0},{x:5,y:0},{x:5,y:5},{x:0,y:5}]) === 25, description: '5x5 square area is 25', got: String(fn([{x:0,y:0},{x:5,y:0},{x:5,y:5},{x:0,y:5}])) });
  results.push({ pass: fn([{x:1,y:1},{x:4,y:1},{x:5,y:3},{x:3,y:5},{x:0,y:3}]) === 13, description: 'Pentagon area is 13', got: String(fn([{x:1,y:1},{x:4,y:1},{x:5,y:3},{x:3,y:5},{x:0,y:3}])) });
  results.push({ pass: fn([{x:0,y:0},{x:10,y:0},{x:10,y:10},{x:0,y:10}]) === 100, description: '10x10 square area is 100', got: String(fn([{x:0,y:0},{x:10,y:0},{x:10,y:10},{x:0,y:10}])) });
  return results;
}`,
  testCases: [],
  dataset: "",
  hints: [
    "The Shoelace formula sums cross products of consecutive vertices. Use modular indexing `(i + 1) % n` to wrap the last vertex back to the first.",
    "Accumulate `sum += vertices[i].x * vertices[j].y - vertices[j].x * vertices[i].y`. The area is `Math.abs(sum) / 2`."
  ],
  resources: [
    { label: "MDN: Math.abs()", url: "/docs/mdn/math-abs.html" }
  ],
  solutionGate: 10,
  basePoints: 50
});

// ─── T3-3: Line Intersection ───────────────────────────────────────────────
exercises.push({
  id: id(),
  title: "Geometry: Line Intersection",
  type: "js",
  tier: 3,
  category: ["math", "geometry"],
  tags: ["math", "geometry", "lines", "intersection"],
  description: "Find the intersection point of two lines defined by pairs of points.",
  instructions: "Write a function called `lineIntersection` that takes four points `p1`, `p2`, `p3`, `p4` (each with `x` and `y` properties) where line 1 passes through p1-p2 and line 2 passes through p3-p4.\n\nReturn the intersection point `{x, y}` rounded to 2 decimal places, or `null` if the lines are parallel.\n\nExample:\n```\nlineIntersection({x:0,y:0}, {x:2,y:2}, {x:0,y:2}, {x:2,y:0})\n// Returns: { x: 1, y: 1 }\n```",
  starterCode: "function lineIntersection(p1, p2, p3, p4) {\n  \n}",
  solution: "function lineIntersection(p1, p2, p3, p4) {\n  const d = (p1.x - p2.x) * (p3.y - p4.y) - (p1.y - p2.y) * (p3.x - p4.x);\n  if (Math.abs(d) < 1e-10) return null;\n  const t = ((p1.x - p3.x) * (p3.y - p4.y) - (p1.y - p3.y) * (p3.x - p4.x)) / d;\n  return {\n    x: Math.round((p1.x + t * (p2.x - p1.x)) * 100) / 100,\n    y: Math.round((p1.y + t * (p2.y - p1.y)) * 100) / 100\n  };\n}",
  testRunner: `(code) => {
  const fn = new Function(code + '; return lineIntersection;')();
  const j = JSON.stringify;
  const results = [];
  let r = fn({x:0,y:0},{x:2,y:2},{x:0,y:2},{x:2,y:0});
  results.push({ pass: r && r.x === 1 && r.y === 1, description: 'Diagonal lines cross at (1, 1)', got: j(r) });
  r = fn({x:0,y:0},{x:4,y:0},{x:2,y:-2},{x:2,y:2});
  results.push({ pass: r && r.x === 2 && r.y === 0, description: 'Horizontal + vertical at (2, 0)', got: j(r) });
  r = fn({x:0,y:0},{x:1,y:1},{x:0,y:1},{x:1,y:2});
  results.push({ pass: r === null, description: 'Parallel lines return null', got: j(r) });
  r = fn({x:0,y:0},{x:10,y:0},{x:5,y:-5},{x:5,y:5});
  results.push({ pass: r && r.x === 5 && r.y === 0, description: 'x-axis and x=5 cross at (5, 0)', got: j(r) });
  r = fn({x:0,y:0},{x:1,y:2},{x:0,y:3},{x:3,y:0});
  results.push({ pass: r && r.x === 1 && r.y === 2, description: 'Oblique lines cross at (1, 2)', got: j(r) });
  return results;
}`,
  testCases: [],
  dataset: "",
  hints: [
    "Use the parametric form of line intersection. Compute the determinant d = (x1-x2)(y3-y4) - (y1-y2)(x3-x4). If d is near 0, lines are parallel.",
    "Compute parameter t = ((x1-x3)(y3-y4) - (y1-y3)(x3-x4)) / d. The intersection is at `x = x1 + t*(x2-x1)`, `y = y1 + t*(y2-y1)`."
  ],
  resources: [
    { label: "MDN: Math.abs()", url: "/docs/mdn/math-abs.html" }
  ],
  solutionGate: 10,
  basePoints: 50
});

// ─── T3-4: Point in Polygon ────────────────────────────────────────────────
exercises.push({
  id: id(),
  title: "Geometry: Point in Polygon",
  type: "js",
  tier: 3,
  category: ["math", "geometry"],
  tags: ["math", "geometry", "raycasting", "polygon"],
  description: "Determine whether a point lies inside a polygon using the ray casting algorithm.",
  instructions: "Write a function called `pointInPolygon` that takes a point `{x, y}` and an array of polygon vertices `[{x, y}, ...]` and returns `true` if the point is inside the polygon, `false` otherwise.\n\nUse the ray casting algorithm: cast a horizontal ray from the point to the right and count how many polygon edges it crosses. An odd count means inside.\n\nExample:\n```\npointInPolygon({x:2,y:2}, [{x:0,y:0},{x:4,y:0},{x:4,y:4},{x:0,y:4}])  // true\npointInPolygon({x:5,y:5}, [{x:0,y:0},{x:4,y:0},{x:4,y:4},{x:0,y:4}])  // false\n```",
  starterCode: "function pointInPolygon(point, polygon) {\n  \n}",
  solution: "function pointInPolygon(point, polygon) {\n  let inside = false;\n  const n = polygon.length;\n  for (let i = 0, j = n - 1; i < n; j = i++) {\n    const xi = polygon[i].x, yi = polygon[i].y;\n    const xj = polygon[j].x, yj = polygon[j].y;\n    if ((yi > point.y) !== (yj > point.y) &&\n        point.x < (xj - xi) * (point.y - yi) / (yj - yi) + xi) {\n      inside = !inside;\n    }\n  }\n  return inside;\n}",
  testRunner: `(code) => {
  const fn = new Function(code + '; return pointInPolygon;')();
  const sq = [{x:0,y:0},{x:4,y:0},{x:4,y:4},{x:0,y:4}];
  const results = [];
  results.push({ pass: fn({x:2,y:2}, sq) === true, description: '(2,2) is inside 4x4 square', got: String(fn({x:2,y:2}, sq)) });
  results.push({ pass: fn({x:5,y:5}, sq) === false, description: '(5,5) is outside 4x4 square', got: String(fn({x:5,y:5}, sq)) });
  results.push({ pass: fn({x:-1,y:2}, sq) === false, description: '(-1,2) is outside', got: String(fn({x:-1,y:2}, sq)) });
  const tri = [{x:0,y:0},{x:6,y:0},{x:3,y:6}];
  results.push({ pass: fn({x:3,y:2}, tri) === true, description: '(3,2) is inside triangle', got: String(fn({x:3,y:2}, tri)) });
  results.push({ pass: fn({x:0,y:6}, tri) === false, description: '(0,6) is outside triangle', got: String(fn({x:0,y:6}, tri)) });
  const lshape = [{x:0,y:0},{x:4,y:0},{x:4,y:2},{x:2,y:2},{x:2,y:4},{x:0,y:4}];
  results.push({ pass: fn({x:1,y:3}, lshape) === true, description: '(1,3) inside L-shape', got: String(fn({x:1,y:3}, lshape)) });
  results.push({ pass: fn({x:3,y:3}, lshape) === false, description: '(3,3) outside L-shape notch', got: String(fn({x:3,y:3}, lshape)) });
  return results;
}`,
  testCases: [],
  dataset: "",
  hints: [
    "The ray casting algorithm counts how many polygon edges a rightward ray from the point crosses. Odd crossings = inside.",
    "For each edge (i, j), check if the point's y-coordinate is between the edge's y-coordinates, then check if the point is to the left of the edge."
  ],
  resources: [
    { label: "MDN: Logical NOT (!)", url: "/docs/mdn/logical-not.html" }
  ],
  solutionGate: 10,
  basePoints: 50
});

// ─── T3-5: Angle Between Vectors ───────────────────────────────────────────
exercises.push({
  id: id(),
  title: "Geometry: Angle Between Vectors",
  type: "js",
  tier: 3,
  category: ["math", "geometry"],
  tags: ["math", "vectors", "dot-product", "angle"],
  description: "Calculate the angle between two 2D vectors using the dot product.",
  instructions: "Write a function called `angleBetween` that takes two vectors `v1` and `v2` (each with `x` and `y` properties) and returns the angle between them in degrees, rounded to 2 decimal places.\n\nFormula: θ = arccos((v1·v2) / (|v1| × |v2|))\n\nReturn `0` if either vector has zero length.\n\nExample:\n```\nangleBetween({x:1,y:0}, {x:0,y:1})  // Returns: 90\nangleBetween({x:1,y:0}, {x:1,y:1})  // Returns: 45\n```",
  starterCode: "function angleBetween(v1, v2) {\n  \n}",
  solution: "function angleBetween(v1, v2) {\n  const dot = v1.x * v2.x + v1.y * v2.y;\n  const mag1 = Math.sqrt(v1.x ** 2 + v1.y ** 2);\n  const mag2 = Math.sqrt(v2.x ** 2 + v2.y ** 2);\n  if (mag1 === 0 || mag2 === 0) return 0;\n  const cosAngle = Math.max(-1, Math.min(1, dot / (mag1 * mag2)));\n  return Math.round(Math.acos(cosAngle) * 180 / Math.PI * 100) / 100;\n}",
  testRunner: `(code) => {
  const fn = new Function(code + '; return angleBetween;')();
  const results = [];
  results.push({ pass: fn({x:1,y:0}, {x:0,y:1}) === 90, description: 'Perpendicular vectors: 90°', got: String(fn({x:1,y:0}, {x:0,y:1})) });
  results.push({ pass: fn({x:1,y:0}, {x:1,y:1}) === 45, description: '(1,0) and (1,1): 45°', got: String(fn({x:1,y:0}, {x:1,y:1})) });
  results.push({ pass: fn({x:1,y:0}, {x:1,y:0}) === 0, description: 'Same direction: 0°', got: String(fn({x:1,y:0}, {x:1,y:0})) });
  results.push({ pass: fn({x:1,y:0}, {x:-1,y:0}) === 180, description: 'Opposite vectors: 180°', got: String(fn({x:1,y:0}, {x:-1,y:0})) });
  results.push({ pass: fn({x:0,y:0}, {x:1,y:0}) === 0, description: 'Zero vector returns 0', got: String(fn({x:0,y:0}, {x:1,y:0})) });
  results.push({ pass: fn({x:3,y:4}, {x:4,y:3}) === 16.26, description: '(3,4) and (4,3): 16.26°', got: String(fn({x:3,y:4}, {x:4,y:3})) });
  return results;
}`,
  testCases: [],
  dataset: "",
  hints: [
    "The dot product `v1.x*v2.x + v1.y*v2.y` divided by the product of magnitudes gives the cosine of the angle. Use `Math.acos` to get the angle.",
    "Clamp the cosine value to [-1, 1] with `Math.max(-1, Math.min(1, ...))` to avoid floating point errors. Convert radians to degrees: `angle * 180 / Math.PI`."
  ],
  resources: [
    { label: "MDN: Math.acos()", url: "/docs/mdn/math-acos.html" }
  ],
  solutionGate: 10,
  basePoints: 50
});

// ─── T3-6: Rotate Point ───────────────────────────────────────────────────
exercises.push({
  id: id(),
  title: "Geometry: Rotate Point",
  type: "js",
  tier: 3,
  category: ["math", "geometry"],
  tags: ["math", "geometry", "rotation", "trigonometry"],
  description: "Rotate a point around an origin by a given angle in degrees.",
  instructions: "Write a function called `rotatePoint` that takes a point `{x, y}`, a center of rotation `{x, y}`, and an angle in degrees (counterclockwise positive). Return the rotated point `{x, y}`, rounded to 2 decimal places.\n\nRotation formula:\n- x' = cos(θ)(x - cx) - sin(θ)(y - cy) + cx\n- y' = sin(θ)(x - cx) + cos(θ)(y - cy) + cy\n\nExample:\n```\nrotatePoint({x:1,y:0}, {x:0,y:0}, 90)   // Returns: { x: 0, y: 1 }\nrotatePoint({x:2,y:0}, {x:1,y:0}, 180)   // Returns: { x: 0, y: 0 }\n```",
  starterCode: "function rotatePoint(point, center, degrees) {\n  \n}",
  solution: "function rotatePoint(point, center, degrees) {\n  const rad = degrees * Math.PI / 180;\n  const dx = point.x - center.x;\n  const dy = point.y - center.y;\n  return {\n    x: Math.round((Math.cos(rad) * dx - Math.sin(rad) * dy + center.x) * 100) / 100,\n    y: Math.round((Math.sin(rad) * dx + Math.cos(rad) * dy + center.y) * 100) / 100\n  };\n}",
  testRunner: `(code) => {
  const fn = new Function(code + '; return rotatePoint;')();
  const j = JSON.stringify;
  const results = [];
  let r = fn({x:1,y:0}, {x:0,y:0}, 90);
  results.push({ pass: r.x === 0 && r.y === 1, description: 'Rotate (1,0) by 90° around origin → (0,1)', got: j(r) });
  r = fn({x:2,y:0}, {x:1,y:0}, 180);
  results.push({ pass: r.x === 0 && r.y === 0, description: 'Rotate (2,0) by 180° around (1,0) → (0,0)', got: j(r) });
  r = fn({x:1,y:0}, {x:0,y:0}, 360);
  results.push({ pass: r.x === 1 && r.y === 0, description: '360° rotation returns same point', got: j(r) });
  r = fn({x:1,y:0}, {x:0,y:0}, 45);
  results.push({ pass: r.x === 0.71 && r.y === 0.71, description: 'Rotate (1,0) by 45° → (0.71, 0.71)', got: j(r) });
  r = fn({x:3,y:3}, {x:3,y:3}, 90);
  results.push({ pass: r.x === 3 && r.y === 3, description: 'Rotate point around itself → same point', got: j(r) });
  r = fn({x:1,y:0}, {x:0,y:0}, -90);
  results.push({ pass: r.x === 0 && r.y === -1, description: 'Rotate (1,0) by -90° → (0,-1)', got: j(r) });
  return results;
}`,
  testCases: [],
  dataset: "",
  hints: [
    "First translate the point so the center of rotation is at the origin, then apply the rotation matrix, then translate back.",
    "After converting degrees to radians: `x' = cos(θ)*dx - sin(θ)*dy + cx` and `y' = sin(θ)*dx + cos(θ)*dy + cy`."
  ],
  resources: [
    { label: "MDN: Math.cos()", url: "/docs/mdn/math-cos.html" }
  ],
  solutionGate: 10,
  basePoints: 50
});

// ─── T4-1: Convex Hull ─────────────────────────────────────────────────────
exercises.push({
  id: id(),
  title: "Geometry: Convex Hull",
  type: "js",
  tier: 4,
  category: ["math", "geometry"],
  tags: ["math", "geometry", "convex-hull", "algorithms"],
  description: "Find the convex hull of a set of 2D points using the gift wrapping algorithm.",
  instructions: "Write a function called `convexHull` that takes an array of points `[{x, y}, ...]` and returns the vertices of the convex hull in counterclockwise order, starting from the leftmost point.\n\nThe convex hull is the smallest convex polygon that contains all points.\n\nExample:\n```\nconvexHull([{x:0,y:0},{x:1,y:1},{x:2,y:0},{x:1,y:0.5}])\n// Returns: [{x:0,y:0},{x:2,y:0},{x:1,y:1}]\n```",
  starterCode: "",
  solution: "function convexHull(points) {\n  if (points.length < 3) return [...points];\n  function cross(o, a, b) {\n    return (a.x - o.x) * (b.y - o.y) - (a.y - o.y) * (b.x - o.x);\n  }\n  let start = points.reduce((min, p) => p.x < min.x || (p.x === min.x && p.y < min.y) ? p : min);\n  const hull = [];\n  let current = start;\n  do {\n    hull.push(current);\n    let next = points[0];\n    for (let i = 1; i < points.length; i++) {\n      const c = cross(current, next, points[i]);\n      if (next === current || c > 0 || (c === 0 && Math.hypot(points[i].x - current.x, points[i].y - current.y) > Math.hypot(next.x - current.x, next.y - current.y))) {\n        next = points[i];\n      }\n    }\n    current = next;\n  } while (current !== start);\n  return hull;\n}",
  testRunner: `(code) => {
  const fn = new Function(code + '; return convexHull;')();
  const j = JSON.stringify;
  const results = [];
  let r = fn([{x:0,y:0},{x:1,y:1},{x:2,y:0},{x:1,y:0.5}]);
  results.push({ pass: r.length === 3, description: 'Square with interior point: hull has 3 vertices', got: String(r.length) });
  r = fn([{x:0,y:0},{x:4,y:0},{x:4,y:4},{x:0,y:4},{x:2,y:2}]);
  results.push({ pass: r.length === 4, description: 'Square with center point: hull has 4 vertices', got: String(r.length) });
  r = fn([{x:0,y:0},{x:1,y:0},{x:2,y:0},{x:2,y:1},{x:0,y:1}]);
  results.push({ pass: r.length === 4, description: 'Collinear bottom edge: hull has 4 vertices', got: String(r.length) });
  results.push({ pass: r[0].x === 0 && r[0].y === 0, description: 'Hull starts at leftmost point', got: j(r[0]) });
  r = fn([{x:1,y:1},{x:2,y:2}]);
  results.push({ pass: r.length === 2, description: '2 points returns both', got: String(r.length) });
  r = fn([{x:0,y:0},{x:5,y:0},{x:5,y:5},{x:0,y:5},{x:1,y:1},{x:2,y:3},{x:4,y:2}]);
  results.push({ pass: r.length === 4, description: 'Square with 3 interior points: hull has 4', got: String(r.length) });
  return results;
}`,
  testCases: [],
  dataset: "",
  hints: [
    "The gift wrapping algorithm starts from the leftmost point and repeatedly selects the next point that makes the smallest counterclockwise angle.",
    "Use the cross product to determine turns: `cross(o, a, b) = (a.x-o.x)*(b.y-o.y) - (a.y-o.y)*(b.x-o.x)`. Positive means counterclockwise turn."
  ],
  resources: [
    { label: "MDN: Math.hypot()", url: "/docs/mdn/math-hypot.html" }
  ],
  solutionGate: 10,
  basePoints: 75
});

// ─── T4-2: Circle from Three Points ────────────────────────────────────────
exercises.push({
  id: id(),
  title: "Geometry: Circle from 3 Points",
  type: "js",
  tier: 4,
  category: ["math", "geometry"],
  tags: ["math", "geometry", "circumscribed-circle", "linear-algebra"],
  description: "Find the circumscribed circle passing through three non-collinear points.",
  instructions: "Write a function called `circumscribedCircle` that takes three points `p1`, `p2`, `p3` (each with `x` and `y` properties) and returns the circle `{cx, cy, r}` (center and radius), all rounded to 2 decimal places.\n\nReturn `null` if the points are collinear.\n\nExample:\n```\ncircumscribedCircle({x:0,y:0}, {x:4,y:0}, {x:0,y:3})\n// Returns: { cx: 2, cy: 1.5, r: 2.5 }\n```",
  starterCode: "",
  solution: "function circumscribedCircle(p1, p2, p3) {\n  const ax = p1.x, ay = p1.y, bx = p2.x, by = p2.y, cx = p3.x, cy = p3.y;\n  const d = 2 * (ax * (by - cy) + bx * (cy - ay) + cx * (ay - by));\n  if (Math.abs(d) < 1e-10) return null;\n  const ux = ((ax * ax + ay * ay) * (by - cy) + (bx * bx + by * by) * (cy - ay) + (cx * cx + cy * cy) * (ay - by)) / d;\n  const uy = ((ax * ax + ay * ay) * (cx - bx) + (bx * bx + by * by) * (ax - cx) + (cx * cx + cy * cy) * (bx - ax)) / d;\n  const r = Math.sqrt((ax - ux) ** 2 + (ay - uy) ** 2);\n  return { cx: Math.round(ux * 100) / 100, cy: Math.round(uy * 100) / 100, r: Math.round(r * 100) / 100 };\n}",
  testRunner: `(code) => {
  const fn = new Function(code + '; return circumscribedCircle;')();
  const j = JSON.stringify;
  const results = [];
  let r = fn({x:0,y:0}, {x:4,y:0}, {x:0,y:3});
  results.push({ pass: r && r.cx === 2 && r.cy === 1.5 && r.r === 2.5, description: '3-4-5 right triangle: center (2,1.5), r=2.5', got: j(r) });
  r = fn({x:-1,y:0}, {x:1,y:0}, {x:0,y:1});
  results.push({ pass: r && r.cx === 0 && r.r === 1, description: 'Unit circle top: center (0, 0), r=1', got: j(r) });
  r = fn({x:0,y:0}, {x:1,y:0}, {x:2,y:0});
  results.push({ pass: r === null, description: 'Collinear points return null', got: j(r) });
  r = fn({x:0,y:0}, {x:6,y:0}, {x:3,y:3});
  results.push({ pass: r && r.cx === 3, description: 'Isoceles: center x is 3', got: j(r) });
  r = fn({x:1,y:1}, {x:5,y:1}, {x:3,y:4});
  results.push({ pass: r && Math.abs(r.r - 2.17) < 0.01, description: 'Radius within tolerance', got: String(r.r) });
  return results;
}`,
  testCases: [],
  dataset: "",
  hints: [
    "The circumscribed circle center is equidistant from all three points. Set up and solve the system of equations from expanding the circle equation.",
    "Compute determinant `d = 2*(ax*(by-cy) + bx*(cy-ay) + cx*(ay-by))`. If d ≈ 0, points are collinear. Otherwise, compute center and radius."
  ],
  resources: [
    { label: "MDN: Math.sqrt()", url: "/docs/mdn/math-sqrt.html" }
  ],
  solutionGate: 10,
  basePoints: 75
});

// ─── T4-3: Closest Pair of Points ──────────────────────────────────────────
exercises.push({
  id: id(),
  title: "Geometry: Closest Pair",
  type: "js",
  tier: 4,
  category: ["math", "geometry"],
  tags: ["math", "geometry", "closest-pair", "algorithms"],
  description: "Find the closest pair of points from a set using an efficient approach.",
  instructions: "Write a function called `closestPair` that takes an array of points `[{x, y}, ...]` and returns an object with:\n\n- `pair`: array of the two closest points\n- `distance`: the distance between them, rounded to 4 decimal places\n\nExample:\n```\nclosestPair([{x:0,y:0},{x:3,y:4},{x:1,y:1}])\n// Returns: { pair: [{x:0,y:0},{x:1,y:1}], distance: 1.4142 }\n```",
  starterCode: "",
  solution: "function closestPair(points) {\n  let minDist = Infinity;\n  let best = [points[0], points[1]];\n  for (let i = 0; i < points.length; i++) {\n    for (let j = i + 1; j < points.length; j++) {\n      const d = Math.sqrt((points[i].x - points[j].x) ** 2 + (points[i].y - points[j].y) ** 2);\n      if (d < minDist) {\n        minDist = d;\n        best = [points[i], points[j]];\n      }\n    }\n  }\n  return { pair: best, distance: Math.round(minDist * 10000) / 10000 };\n}",
  testRunner: `(code) => {
  const fn = new Function(code + '; return closestPair;')();
  const results = [];
  let r = fn([{x:0,y:0},{x:3,y:4},{x:1,y:1}]);
  results.push({ pass: r.distance === 1.4142, description: 'Closest distance is 1.4142', got: String(r.distance) });
  results.push({ pass: r.pair.length === 2, description: 'Returns pair of 2 points', got: String(r.pair.length) });
  r = fn([{x:0,y:0},{x:10,y:10},{x:10,y:10.5}]);
  results.push({ pass: r.distance === 0.5, description: 'Two nearby points: distance 0.5', got: String(r.distance) });
  r = fn([{x:0,y:0},{x:1,y:0},{x:0,y:1},{x:1,y:1}]);
  results.push({ pass: r.distance === 1, description: 'Unit square: closest is 1', got: String(r.distance) });
  r = fn([{x:0,y:0},{x:100,y:100},{x:50,y:50},{x:50,y:50.01}]);
  results.push({ pass: r.distance === 0.01, description: 'Very close points: 0.01', got: String(r.distance) });
  r = fn([{x:0,y:0},{x:3,y:0},{x:6,y:0},{x:9,y:0}]);
  results.push({ pass: r.distance === 3, description: 'Collinear equidistant: 3', got: String(r.distance) });
  return results;
}`,
  testCases: [],
  dataset: "",
  hints: [
    "The brute force approach compares all pairs: O(n²). For each pair, compute the Euclidean distance and track the minimum.",
    "Use nested loops: for each i, iterate j from i+1. Track both the minimum distance and the corresponding pair of points."
  ],
  resources: [
    { label: "MDN: Math.sqrt()", url: "/docs/mdn/math-sqrt.html" }
  ],
  solutionGate: 10,
  basePoints: 75
});

// ─── T4-4: Regular Polygon Properties ──────────────────────────────────────
exercises.push({
  id: id(),
  title: "Geometry: Regular Polygon Properties",
  type: "js",
  tier: 4,
  category: ["math", "geometry"],
  tags: ["math", "geometry", "polygon", "trigonometry"],
  description: "Compute all key properties of a regular polygon given its number of sides and side length.",
  instructions: "Write a function called `regularPolygon` that takes `n` (number of sides, n ≥ 3) and `s` (side length) and returns an object with:\n\n- `interiorAngle`: each interior angle in degrees, rounded to 2 decimals\n- `exteriorAngle`: each exterior angle in degrees, rounded to 2 decimals\n- `perimeter`: total perimeter\n- `apothem`: distance from center to midpoint of a side, rounded to 4 decimals\n- `area`: total area, rounded to 2 decimals\n- `circumradius`: radius of circumscribed circle, rounded to 4 decimals\n\nExample:\n```\nregularPolygon(6, 10)\n// Returns: { interiorAngle: 120, exteriorAngle: 60, perimeter: 60,\n//           apothem: 8.6603, area: 259.81, circumradius: 10 }\n```",
  starterCode: "",
  solution: "function regularPolygon(n, s) {\n  const intAngle = (n - 2) * 180 / n;\n  const extAngle = 360 / n;\n  const perimeter = n * s;\n  const apothem = s / (2 * Math.tan(Math.PI / n));\n  const area = (perimeter * apothem) / 2;\n  const circumradius = s / (2 * Math.sin(Math.PI / n));\n  return {\n    interiorAngle: Math.round(intAngle * 100) / 100,\n    exteriorAngle: Math.round(extAngle * 100) / 100,\n    perimeter,\n    apothem: Math.round(apothem * 10000) / 10000,\n    area: Math.round(area * 100) / 100,\n    circumradius: Math.round(circumradius * 10000) / 10000\n  };\n}",
  testRunner: `(code) => {
  const fn = new Function(code + '; return regularPolygon;')();
  const results = [];
  let r = fn(6, 10);
  results.push({ pass: r.interiorAngle === 120, description: 'Hexagon interior angle: 120°', got: String(r.interiorAngle) });
  results.push({ pass: r.perimeter === 60, description: 'Hexagon perimeter: 60', got: String(r.perimeter) });
  results.push({ pass: r.apothem === 8.6603, description: 'Hexagon apothem: 8.6603', got: String(r.apothem) });
  results.push({ pass: r.area === 259.81, description: 'Hexagon area: 259.81', got: String(r.area) });
  results.push({ pass: r.circumradius === 10, description: 'Hexagon circumradius = side length (10)', got: String(r.circumradius) });
  r = fn(4, 5);
  results.push({ pass: r.interiorAngle === 90, description: 'Square interior angle: 90°', got: String(r.interiorAngle) });
  results.push({ pass: r.area === 25, description: 'Square area: 25', got: String(r.area) });
  r = fn(3, 6);
  results.push({ pass: r.interiorAngle === 60, description: 'Triangle interior angle: 60°', got: String(r.interiorAngle) });
  results.push({ pass: r.exteriorAngle === 120, description: 'Triangle exterior angle: 120°', got: String(r.exteriorAngle) });
  return results;
}`,
  testCases: [],
  dataset: "",
  hints: [
    "Interior angle = (n-2)*180/n. Apothem = s/(2*tan(π/n)). Circumradius = s/(2*sin(π/n)). Area = perimeter * apothem / 2.",
    "Remember to use radians with `Math.tan` and `Math.sin`. The angle to use is `π/n` (half the central angle of one side)."
  ],
  resources: [
    { label: "MDN: Math.tan()", url: "/docs/mdn/math-tan.html" }
  ],
  solutionGate: 10,
  basePoints: 75
});

// ─── T5-1: Geometry Engine ─────────────────────────────────────────────────
exercises.push({
  id: id(),
  title: "Geometry: Shape Analyzer",
  type: "js",
  tier: 5,
  category: ["math", "geometry"],
  tags: ["math", "geometry", "analysis", "multi-function"],
  description: "Build a shape analyzer that classifies and computes properties for any polygon given its vertices.",
  instructions: "Write a function called `analyzeShape` that takes an array of 2D vertex objects `[{x, y}, ...]` and returns an object with:\n\n- `vertexCount`: number of vertices\n- `perimeter`: sum of all side lengths, rounded to 2 decimals\n- `area`: area via the Shoelace formula, rounded to 2 decimals\n- `centroid`: `{x, y}` average of all vertices, rounded to 2 decimals\n- `isConvex`: boolean — whether all cross products of consecutive edges have the same sign\n- `boundingBox`: `{minX, minY, maxX, maxY}` — axis-aligned bounding box\n- `longestSide`: length of the longest side, rounded to 2 decimals\n- `shortestSide`: length of the shortest side, rounded to 2 decimals\n\nExample:\n```\nanalyzeShape([{x:0,y:0},{x:4,y:0},{x:4,y:3},{x:0,y:3}])\n// Returns: { vertexCount: 4, perimeter: 14, area: 12,\n//   centroid: {x:2, y:1.5}, isConvex: true,\n//   boundingBox: {minX:0, minY:0, maxX:4, maxY:3},\n//   longestSide: 4, shortestSide: 3 }\n```",
  starterCode: "",
  solution: `function analyzeShape(vertices) {
  const n = vertices.length;
  const rd2 = v => Math.round(v * 100) / 100;
  // Perimeter + side lengths
  const sides = [];
  for (let i = 0; i < n; i++) {
    const j = (i + 1) % n;
    sides.push(Math.sqrt((vertices[j].x - vertices[i].x) ** 2 + (vertices[j].y - vertices[i].y) ** 2));
  }
  const perimeter = rd2(sides.reduce((a, b) => a + b, 0));
  // Area (Shoelace)
  let areaSum = 0;
  for (let i = 0; i < n; i++) {
    const j = (i + 1) % n;
    areaSum += vertices[i].x * vertices[j].y - vertices[j].x * vertices[i].y;
  }
  const area = rd2(Math.abs(areaSum) / 2);
  // Centroid
  const centroid = {
    x: rd2(vertices.reduce((s, v) => s + v.x, 0) / n),
    y: rd2(vertices.reduce((s, v) => s + v.y, 0) / n)
  };
  // Convexity
  let pos = 0, neg = 0;
  for (let i = 0; i < n; i++) {
    const a = vertices[i], b = vertices[(i+1)%n], c = vertices[(i+2)%n];
    const cross = (b.x - a.x) * (c.y - b.y) - (b.y - a.y) * (c.x - b.x);
    if (cross > 0) pos++;
    else if (cross < 0) neg++;
  }
  // Bounding box
  const xs = vertices.map(v => v.x), ys = vertices.map(v => v.y);
  return {
    vertexCount: n,
    perimeter,
    area,
    centroid,
    isConvex: pos === 0 || neg === 0,
    boundingBox: { minX: Math.min(...xs), minY: Math.min(...ys), maxX: Math.max(...xs), maxY: Math.max(...ys) },
    longestSide: rd2(Math.max(...sides)),
    shortestSide: rd2(Math.min(...sides))
  };
}`,
  testRunner: `(code) => {
  const fn = new Function(code + '; return analyzeShape;')();
  const results = [];
  let r = fn([{x:0,y:0},{x:4,y:0},{x:4,y:3},{x:0,y:3}]);
  results.push({ pass: r.vertexCount === 4, description: 'Rectangle: 4 vertices', got: String(r.vertexCount) });
  results.push({ pass: r.perimeter === 14, description: 'Rectangle perimeter: 14', got: String(r.perimeter) });
  results.push({ pass: r.area === 12, description: 'Rectangle area: 12', got: String(r.area) });
  results.push({ pass: r.centroid.x === 2 && r.centroid.y === 1.5, description: 'Centroid: (2, 1.5)', got: JSON.stringify(r.centroid) });
  results.push({ pass: r.isConvex === true, description: 'Rectangle is convex', got: String(r.isConvex) });
  results.push({ pass: r.longestSide === 4 && r.shortestSide === 3, description: 'Longest: 4, shortest: 3', got: r.longestSide + '/' + r.shortestSide });
  // L-shape (concave)
  r = fn([{x:0,y:0},{x:4,y:0},{x:4,y:2},{x:2,y:2},{x:2,y:4},{x:0,y:4}]);
  results.push({ pass: r.isConvex === false, description: 'L-shape is not convex', got: String(r.isConvex) });
  results.push({ pass: r.vertexCount === 6, description: 'L-shape: 6 vertices', got: String(r.vertexCount) });
  // Triangle
  r = fn([{x:0,y:0},{x:6,y:0},{x:3,y:4}]);
  results.push({ pass: r.vertexCount === 3, description: 'Triangle: 3 vertices', got: String(r.vertexCount) });
  results.push({ pass: r.area === 12, description: 'Triangle area: 12', got: String(r.area) });
  results.push({ pass: r.boundingBox.minX === 0 && r.boundingBox.maxX === 6, description: 'BBox: minX=0, maxX=6', got: JSON.stringify(r.boundingBox) });
  return results;
}`,
  testCases: [],
  dataset: "",
  hints: [
    "Break the problem into parts: side lengths (distance formula in a loop), area (Shoelace), centroid (average x and y), convexity (cross products), bounding box (min/max).",
    "For convexity, compute the cross product of consecutive edge pairs. If all are positive or all negative, the polygon is convex. A mix means concave."
  ],
  resources: [
    { label: "MDN: Math.min()", url: "/docs/mdn/math-min.html" }
  ],
  solutionGate: 10,
  basePoints: 100
});

// ─── T5-2: 2D Transformation Pipeline ──────────────────────────────────────
exercises.push({
  id: id(),
  title: "Geometry: Transformation Pipeline",
  type: "js",
  tier: 5,
  category: ["math", "geometry"],
  tags: ["math", "geometry", "transforms", "matrix"],
  description: "Apply a sequence of geometric transformations to a set of 2D points.",
  instructions: "Write a function called `transform` that takes an array of points `[{x, y}, ...]` and an array of transformation objects, applying them in order. Return the transformed points with coordinates rounded to 2 decimal places.\n\nTransformation types:\n- `{type: \"translate\", dx, dy}` — shift all points\n- `{type: \"rotate\", angle, cx, cy}` — rotate around (cx, cy) by angle degrees CCW\n- `{type: \"scale\", sx, sy, cx, cy}` — scale relative to (cx, cy)\n- `{type: \"reflect\", axis}` — reflect over \"x\" (y=0) or \"y\" (x=0) axis\n\nExample:\n```\ntransform([{x:1,y:0}], [{type:\"rotate\", angle:90, cx:0, cy:0}])\n// Returns: [{x:0, y:1}]\n```",
  starterCode: "",
  solution: `function transform(points, transforms) {
  const rd = v => Math.round(v * 100) / 100;
  let pts = points.map(p => ({x: p.x, y: p.y}));
  for (const t of transforms) {
    pts = pts.map(p => {
      if (t.type === "translate") {
        return {x: p.x + t.dx, y: p.y + t.dy};
      } else if (t.type === "rotate") {
        const rad = t.angle * Math.PI / 180;
        const dx = p.x - t.cx, dy = p.y - t.cy;
        return {
          x: Math.cos(rad) * dx - Math.sin(rad) * dy + t.cx,
          y: Math.sin(rad) * dx + Math.cos(rad) * dy + t.cy
        };
      } else if (t.type === "scale") {
        return {
          x: t.cx + (p.x - t.cx) * t.sx,
          y: t.cy + (p.y - t.cy) * t.sy
        };
      } else if (t.type === "reflect") {
        return t.axis === "x" ? {x: p.x, y: -p.y} : {x: -p.x, y: p.y};
      }
      return p;
    });
  }
  return pts.map(p => ({x: rd(p.x), y: rd(p.y)}));
}`,
  testRunner: `(code) => {
  const fn = new Function(code + '; return transform;')();
  const j = JSON.stringify;
  const results = [];
  let r = fn([{x:1,y:0}], [{type:"rotate", angle:90, cx:0, cy:0}]);
  results.push({ pass: r[0].x === 0 && r[0].y === 1, description: 'Rotate (1,0) by 90° → (0,1)', got: j(r[0]) });
  r = fn([{x:1,y:2}], [{type:"translate", dx:3, dy:-1}]);
  results.push({ pass: r[0].x === 4 && r[0].y === 1, description: 'Translate (1,2) by (3,-1) → (4,1)', got: j(r[0]) });
  r = fn([{x:2,y:3}], [{type:"scale", sx:2, sy:3, cx:0, cy:0}]);
  results.push({ pass: r[0].x === 4 && r[0].y === 9, description: 'Scale (2,3) by (2x,3x) → (4,9)', got: j(r[0]) });
  r = fn([{x:1,y:2}], [{type:"reflect", axis:"x"}]);
  results.push({ pass: r[0].x === 1 && r[0].y === -2, description: 'Reflect (1,2) over x-axis → (1,-2)', got: j(r[0]) });
  // Chained transforms
  r = fn([{x:1,y:0}], [{type:"rotate", angle:90, cx:0, cy:0}, {type:"translate", dx:5, dy:0}]);
  results.push({ pass: r[0].x === 5 && r[0].y === 1, description: 'Rotate then translate: (5,1)', got: j(r[0]) });
  // Multiple points
  r = fn([{x:0,y:0},{x:1,y:0},{x:1,y:1}], [{type:"scale", sx:2, sy:2, cx:0, cy:0}]);
  results.push({ pass: r.length === 3 && r[2].x === 2 && r[2].y === 2, description: 'Scale 3 points: (1,1)→(2,2)', got: j(r) });
  return results;
}`,
  testCases: [],
  dataset: "",
  hints: [
    "Process each transformation in sequence, applying it to all points. Each type has a specific formula — translate adds, rotate uses sin/cos, scale multiplies, reflect negates.",
    "For rotation: translate point relative to center, apply rotation matrix, translate back. For scaling: translate relative to center, multiply, translate back."
  ],
  resources: [
    { label: "MDN: Array.prototype.map()", url: "/docs/mdn/array-map.html" }
  ],
  solutionGate: 10,
  basePoints: 100
});

// ── append to collection ────────────────────────────────────────────────────

collection.exercises.push(...exercises);
fs.writeFileSync(COLLECTION_FILE, JSON.stringify(collection, null, 2));

console.log(`Hard Math & Science — Section 2: Geometry & Trigonometry`);
console.log(`========================================================`);
console.log(`  Exercises: ${exercises.length}`);
console.log(`  T2: ${exercises.filter(e => e.tier === 2).length}`);
console.log(`  T3: ${exercises.filter(e => e.tier === 3).length}`);
console.log(`  T4: ${exercises.filter(e => e.tier === 4).length}`);
console.log(`  T5: ${exercises.filter(e => e.tier === 5).length}`);
console.log(`  ID range: ${exercises[0].id}–${exercises[exercises.length-1].id}`);
console.log(`  Total collection exercises: ${collection.exercises.length}`);
console.log(`  Appended to: ${COLLECTION_FILE}`);
