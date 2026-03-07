/**
 * Hard Math & Science — Section 6: Chemistry
 * 12 exercises (IDs 1155-1166): 2 T2, 5 T3, 4 T4, 1 T5
 *
 * Appends to the existing hard-math-science.json collection file.
 */

const fs = require('fs');
const path = require('path');

const COLLECTION_FILE = path.join(__dirname, 'hard-math-science.json');
const collection = JSON.parse(fs.readFileSync(COLLECTION_FILE, 'utf8'));

let nextId = 1155;
function id() { return nextId++; }

const exercises = [];

// ─── T2-1: Molar Mass Calculator ────────────────────────────────────────────
exercises.push({
  id: id(),
  title: "Chemistry: Molar Mass",
  type: "js",
  tier: 2,
  category: ["science", "chemistry"],
  tags: ["science", "chemistry", "molar-mass", "objects"],
  description: "Calculate the molar mass of a compound from its element counts.",
  instructions: "Write a function called `molarMass` that takes an object mapping element symbols to their counts and returns the molar mass in g/mol, rounded to 2 decimal places.\n\nUse these atomic masses (g/mol):\nH: 1.008, C: 12.011, N: 14.007, O: 15.999, S: 32.06, P: 30.974, Na: 22.99, Cl: 35.45, Fe: 55.845, Ca: 40.078\n\nExample:\n```\nmolarMass({ H: 2, O: 1 })        // Returns: 18.02  (water)\nmolarMass({ C: 6, H: 12, O: 6 }) // Returns: 180.16 (glucose)\n```",
  starterCode: "// Return the molar mass in g/mol\nfunction molarMass(elements) {\n  \n}",
  solution: "function molarMass(elements) {\n  const masses = { H: 1.008, C: 12.011, N: 14.007, O: 15.999, S: 32.06, P: 30.974, Na: 22.99, Cl: 35.45, Fe: 55.845, Ca: 40.078 };\n  let total = 0;\n  for (const [el, count] of Object.entries(elements)) {\n    total += masses[el] * count;\n  }\n  return Math.round(total * 100) / 100;\n}",
  testRunner: `(code) => {
  const fn = new Function(code + '; return molarMass;')();
  const results = [];
  results.push({ pass: fn({ H: 2, O: 1 }) === 18.02, description: 'H₂O = 18.02 g/mol', got: String(fn({ H: 2, O: 1 })) });
  results.push({ pass: fn({ C: 6, H: 12, O: 6 }) === 180.16, description: 'C₆H₁₂O₆ (glucose) = 180.16', got: String(fn({ C: 6, H: 12, O: 6 })) });
  results.push({ pass: fn({ Na: 1, Cl: 1 }) === 58.44, description: 'NaCl = 58.44', got: String(fn({ Na: 1, Cl: 1 })) });
  results.push({ pass: fn({ C: 1, O: 2 }) === 44.01, description: 'CO₂ = 44.01', got: String(fn({ C: 1, O: 2 })) });
  results.push({ pass: fn({ Fe: 2, O: 3 }) === 159.69, description: 'Fe₂O₃ = 159.69', got: String(fn({ Fe: 2, O: 3 })) });
  results.push({ pass: fn({ H: 1 }) === 1.01, description: 'single H = 1.01', got: String(fn({ H: 1 })) });
  return results;
}`,
  testCases: [],
  hints: [
    "Loop through the element-count pairs and multiply each element's atomic mass by its count, then sum them all.",
    "Use `Object.entries(elements)` to get `[element, count]` pairs, look up each atomic mass, and accumulate the total."
  ],
  resources: [
    { label: "MDN: Object.entries()", url: "/docs/mdn/object-entries.html" }
  ],
  solutionGate: 10,
  basePoints: 25
});

// ─── T2-2: Unit Conversions ─────────────────────────────────────────────────
exercises.push({
  id: id(),
  title: "Chemistry: Temperature Conversions",
  type: "js",
  tier: 2,
  category: ["science", "chemistry"],
  tags: ["science", "chemistry", "temperature", "conversions"],
  description: "Convert temperatures between Celsius, Fahrenheit, and Kelvin.",
  instructions: "Write a function called `convertTemp` that takes a `value`, a `from` scale, and a `to` scale, and returns the converted temperature rounded to 2 decimal places.\n\nScales: `'C'` (Celsius), `'F'` (Fahrenheit), `'K'` (Kelvin)\n\nFormulas:\n- C to F: F = C × 9/5 + 32\n- C to K: K = C + 273.15\n- F to C: C = (F - 32) × 5/9\n\nExample:\n```\nconvertTemp(100, 'C', 'F')  // Returns: 212\nconvertTemp(32, 'F', 'C')   // Returns: 0\nconvertTemp(0, 'C', 'K')    // Returns: 273.15\n```",
  starterCode: "// Convert temperature between C, F, and K\nfunction convertTemp(value, from, to) {\n  \n}",
  solution: "function convertTemp(value, from, to) {\n  // Convert to Celsius first\n  let celsius;\n  if (from === 'C') celsius = value;\n  else if (from === 'F') celsius = (value - 32) * 5 / 9;\n  else celsius = value - 273.15; // K\n  // Convert from Celsius to target\n  let result;\n  if (to === 'C') result = celsius;\n  else if (to === 'F') result = celsius * 9 / 5 + 32;\n  else result = celsius + 273.15; // K\n  return Math.round(result * 100) / 100;\n}",
  testRunner: `(code) => {
  const fn = new Function(code + '; return convertTemp;')();
  const results = [];
  results.push({ pass: fn(100, 'C', 'F') === 212, description: '100°C = 212°F', got: String(fn(100, 'C', 'F')) });
  results.push({ pass: fn(32, 'F', 'C') === 0, description: '32°F = 0°C', got: String(fn(32, 'F', 'C')) });
  results.push({ pass: fn(0, 'C', 'K') === 273.15, description: '0°C = 273.15K', got: String(fn(0, 'C', 'K')) });
  results.push({ pass: fn(373.15, 'K', 'C') === 100, description: '373.15K = 100°C', got: String(fn(373.15, 'K', 'C')) });
  results.push({ pass: fn(98.6, 'F', 'K') === 310.15, description: '98.6°F = 310.15K', got: String(fn(98.6, 'F', 'K')) });
  results.push({ pass: fn(50, 'C', 'C') === 50, description: 'same scale returns same value', got: String(fn(50, 'C', 'C')) });
  return results;
}`,
  testCases: [],
  hints: [
    "Convert to Celsius first as a common intermediate, then convert from Celsius to the target scale.",
    "Two steps: (1) if `from` is F, use `(value - 32) * 5/9`; if K, use `value - 273.15`. (2) Convert Celsius to `to` using the inverse formulas."
  ],
  resources: [
    { label: "MDN: Conditional (ternary) operator", url: "/docs/mdn/conditional-operator.html" }
  ],
  solutionGate: 10,
  basePoints: 25
});

// ─── T3-1: Stoichiometry ────────────────────────────────────────────────────
exercises.push({
  id: id(),
  title: "Chemistry: Stoichiometry",
  type: "js",
  tier: 3,
  category: ["science", "chemistry"],
  tags: ["science", "chemistry", "stoichiometry", "ratios"],
  description: "Calculate product amounts from reactant quantities using molar ratios.",
  instructions: "Write a function called `stoichiometry` that takes:\n- `reactants`: array of `{ name, moles, coefficient }` objects\n- `products`: array of `{ name, coefficient }` objects\n\nReturn an array of product objects with `name` and `moles` (rounded to 4 decimal places). The limiting reagent determines the maximum product.\n\nThe limiting reagent is the reactant with the smallest `moles / coefficient` ratio.\n\nExample:\n```\nstoichiometry(\n  [{ name: 'H2', moles: 3, coefficient: 1 }, { name: 'O2', moles: 1, coefficient: 0.5 }],\n  [{ name: 'H2O', coefficient: 1 }]\n)\n// Returns: [{ name: 'H2O', moles: 2 }]  (O2 is limiting: 1/0.5 = 2 reaction units)\n```",
  starterCode: "function stoichiometry(reactants, products) {\n  \n}",
  solution: "function stoichiometry(reactants, products) {\n  const reactionUnits = Math.min(...reactants.map(r => r.moles / r.coefficient));\n  return products.map(p => ({\n    name: p.name,\n    moles: Math.round(reactionUnits * p.coefficient * 10000) / 10000\n  }));\n}",
  testRunner: `(code) => {
  const fn = new Function(code + '; return stoichiometry;')();
  const eq = (a, b) => JSON.stringify(a) === JSON.stringify(b);
  const results = [];
  results.push({ pass: eq(fn(
    [{ name: 'H2', moles: 3, coefficient: 1 }, { name: 'O2', moles: 1, coefficient: 0.5 }],
    [{ name: 'H2O', coefficient: 1 }]
  ), [{ name: 'H2O', moles: 2 }]), description: 'H2 + O2 → H2O with limiting O2', got: JSON.stringify(fn([{ name: 'H2', moles: 3, coefficient: 1 }, { name: 'O2', moles: 1, coefficient: 0.5 }], [{ name: 'H2O', coefficient: 1 }])) });
  results.push({ pass: eq(fn(
    [{ name: 'N2', moles: 1, coefficient: 1 }, { name: 'H2', moles: 3, coefficient: 3 }],
    [{ name: 'NH3', coefficient: 2 }]
  ), [{ name: 'NH3', moles: 2 }]), description: 'N2 + 3H2 → 2NH3', got: JSON.stringify(fn([{ name: 'N2', moles: 1, coefficient: 1 }, { name: 'H2', moles: 3, coefficient: 3 }], [{ name: 'NH3', coefficient: 2 }])) });
  results.push({ pass: eq(fn(
    [{ name: 'A', moles: 5, coefficient: 2 }],
    [{ name: 'B', coefficient: 3 }]
  ), [{ name: 'B', moles: 7.5 }]), description: 'single reactant: 5 moles of A (coeff 2) → 7.5 B (coeff 3)', got: JSON.stringify(fn([{ name: 'A', moles: 5, coefficient: 2 }], [{ name: 'B', coefficient: 3 }])) });
  const r4 = fn(
    [{ name: 'A', moles: 10, coefficient: 2 }, { name: 'B', moles: 3, coefficient: 1 }],
    [{ name: 'C', coefficient: 1 }, { name: 'D', coefficient: 3 }]
  );
  results.push({ pass: r4[0].moles === 3 && r4[1].moles === 9, description: 'multiple products with limiting reagent B', got: JSON.stringify(r4) });
  return results;
}`,
  testCases: [],
  hints: [
    "The limiting reagent is the one with the smallest `moles / coefficient` ratio. This determines how many 'reaction units' can proceed.",
    "Compute `Math.min(...reactants.map(r => r.moles / r.coefficient))` for reaction units, then multiply each product coefficient by that."
  ],
  resources: [
    { label: "MDN: Math.min()", url: "/docs/mdn/math-min.html" }
  ],
  solutionGate: 10,
  basePoints: 50
});

// ─── T3-2: Solution Concentration ───────────────────────────────────────────
exercises.push({
  id: id(),
  title: "Chemistry: Solution Dilution",
  type: "js",
  tier: 3,
  category: ["science", "chemistry"],
  tags: ["science", "chemistry", "solutions", "molarity"],
  description: "Calculate dilution parameters using the dilution equation.",
  instructions: "Write a function called `dilution` that takes an object with three of the four properties: `c1` (initial molarity, M), `v1` (initial volume, L), `c2` (final molarity, M), `v2` (final volume, L), and returns the missing value, rounded to 4 decimal places.\n\nDilution equation: C₁V₁ = C₂V₂\n\nExample:\n```\ndilution({ c1: 2, v1: 0.5, c2: 0.5 })  // Returns: { v2: 2 }\ndilution({ c1: 6, v1: 0.1, v2: 0.3 })   // Returns: { c2: 2 }\n```",
  starterCode: "function dilution({ c1, v1, c2, v2 }) {\n  \n}",
  solution: "function dilution({ c1, v1, c2, v2 }) {\n  const r4 = v => Math.round(v * 10000) / 10000;\n  if (c1 === undefined) return { c1: r4(c2 * v2 / v1) };\n  if (v1 === undefined) return { v1: r4(c2 * v2 / c1) };\n  if (c2 === undefined) return { c2: r4(c1 * v1 / v2) };\n  return { v2: r4(c1 * v1 / c2) };\n}",
  testRunner: `(code) => {
  const fn = new Function(code + '; return dilution;')();
  const eq = (a, b) => JSON.stringify(a) === JSON.stringify(b);
  const results = [];
  results.push({ pass: eq(fn({ c1: 2, v1: 0.5, c2: 0.5 }), { v2: 2 }), description: 'find v2: C1V1/C2 = 2L', got: JSON.stringify(fn({ c1: 2, v1: 0.5, c2: 0.5 })) });
  results.push({ pass: eq(fn({ c1: 6, v1: 0.1, v2: 0.3 }), { c2: 2 }), description: 'find c2: C1V1/V2 = 2M', got: JSON.stringify(fn({ c1: 6, v1: 0.1, v2: 0.3 })) });
  results.push({ pass: eq(fn({ v1: 0.25, c2: 1, v2: 0.5 }), { c1: 2 }), description: 'find c1: C2V2/V1 = 2M', got: JSON.stringify(fn({ v1: 0.25, c2: 1, v2: 0.5 })) });
  results.push({ pass: eq(fn({ c1: 3, c2: 1, v2: 0.9 }), { v1: 0.3 }), description: 'find v1: C2V2/C1 = 0.3L', got: JSON.stringify(fn({ c1: 3, c2: 1, v2: 0.9 })) });
  results.push({ pass: eq(fn({ c1: 10, v1: 0.01, c2: 0.1 }), { v2: 1 }), description: '100× dilution', got: JSON.stringify(fn({ c1: 10, v1: 0.01, c2: 0.1 })) });
  return results;
}`,
  testCases: [],
  hints: [
    "The dilution equation C₁V₁ = C₂V₂ lets you solve for any one missing variable from the other three.",
    "Check which parameter is `undefined`, then rearrange: missing = (product of known side) / remaining known value."
  ],
  resources: [
    { label: "MDN: undefined", url: "/docs/mdn/undefined.html" }
  ],
  solutionGate: 10,
  basePoints: 50
});

// ─── T3-3: pH and pOH ──────────────────────────────────────────────────────
exercises.push({
  id: id(),
  title: "Chemistry: pH Scale",
  type: "js",
  tier: 3,
  category: ["science", "chemistry"],
  tags: ["science", "chemistry", "pH", "logarithms"],
  description: "Calculate pH, pOH, and hydrogen/hydroxide ion concentrations.",
  instructions: "Write a function called `phScale` that takes a hydrogen ion concentration `hConc` (in mol/L) and returns an object with:\n- `pH`: -log₁₀([H⁺]), rounded to 2 decimal places\n- `pOH`: 14 - pH, rounded to 2 decimal places\n- `ohConc`: 10^(-pOH), in scientific notation (use `.toExponential(2)`)\n- `isAcidic`: true if pH < 7\n- `isBasic`: true if pH > 7\n- `isNeutral`: true if pH === 7\n\nExample:\n```\nphScale(0.001)  // Returns: { pH: 3, pOH: 11, ohConc: '1.00e-11', isAcidic: true, isBasic: false, isNeutral: false }\n```",
  starterCode: "function phScale(hConc) {\n  \n}",
  solution: "function phScale(hConc) {\n  const pH = Math.round(-Math.log10(hConc) * 100) / 100;\n  const pOH = Math.round((14 - pH) * 100) / 100;\n  const ohConc = Math.pow(10, -pOH).toExponential(2);\n  return {\n    pH,\n    pOH,\n    ohConc,\n    isAcidic: pH < 7,\n    isBasic: pH > 7,\n    isNeutral: pH === 7\n  };\n}",
  testRunner: `(code) => {
  const fn = new Function(code + '; return phScale;')();
  const results = [];
  const r1 = fn(0.001);
  results.push({ pass: r1.pH === 3 && r1.pOH === 11, description: '[H+]=0.001: pH=3, pOH=11', got: 'pH=' + r1.pH + ', pOH=' + r1.pOH });
  results.push({ pass: r1.isAcidic === true && r1.isBasic === false, description: 'pH 3 is acidic', got: String(r1.isAcidic) });
  const r2 = fn(1e-7);
  results.push({ pass: r2.pH === 7 && r2.isNeutral === true, description: '[H+]=1e-7 is neutral (pH 7)', got: 'pH=' + r2.pH });
  const r3 = fn(1e-12);
  results.push({ pass: r3.pH === 12 && r3.isBasic === true, description: '[H+]=1e-12 is basic (pH 12)', got: 'pH=' + r3.pH });
  const r4 = fn(0.01);
  results.push({ pass: r4.pH === 2 && r4.ohConc === '1.00e-12', description: '[H+]=0.01: pH=2, [OH-]=1e-12', got: 'pH=' + r4.pH + ', OH=' + r4.ohConc });
  results.push({ pass: fn(1).pH === 0, description: '[H+]=1: pH=0 (strong acid)', got: String(fn(1).pH) });
  return results;
}`,
  testCases: [],
  hints: [
    "pH = -log₁₀([H⁺]). Use `Math.log10()` for the base-10 logarithm. pOH = 14 - pH.",
    "For [OH⁻], compute `Math.pow(10, -pOH)` and format with `.toExponential(2)` for scientific notation."
  ],
  resources: [
    { label: "MDN: Math.log10()", url: "/docs/mdn/math-log10.html" }
  ],
  solutionGate: 10,
  basePoints: 50
});

// ─── T3-4: Gas Laws ────────────────────────────────────────────────────────
exercises.push({
  id: id(),
  title: "Chemistry: Combined Gas Law",
  type: "js",
  tier: 3,
  category: ["science", "chemistry"],
  tags: ["science", "chemistry", "gas-laws", "thermodynamics"],
  description: "Use the combined gas law to find final state variables.",
  instructions: "Write a function called `combinedGasLaw` that takes initial conditions `p1` (atm), `v1` (L), `t1` (K) and two of the three final conditions `p2`, `v2`, `t2`, and returns the missing final value, rounded to 4 decimal places.\n\nCombined gas law: P₁V₁/T₁ = P₂V₂/T₂\n\nExample:\n```\ncombinedGasLaw(1, 10, 300, { p2: 2, t2: 600 })  // Returns: { v2: 10 }\ncombinedGasLaw(1, 10, 300, { v2: 5, t2: 300 })   // Returns: { p2: 2 }\n```",
  starterCode: "function combinedGasLaw(p1, v1, t1, final) {\n  \n}",
  solution: "function combinedGasLaw(p1, v1, t1, final) {\n  const r4 = v => Math.round(v * 10000) / 10000;\n  const k = p1 * v1 / t1; // P1V1/T1\n  if (final.p2 === undefined) return { p2: r4(k * final.t2 / final.v2) };\n  if (final.v2 === undefined) return { v2: r4(k * final.t2 / final.p2) };\n  return { t2: r4(final.p2 * final.v2 / k) };\n}",
  testRunner: `(code) => {
  const fn = new Function(code + '; return combinedGasLaw;')();
  const eq = (a, b) => JSON.stringify(a) === JSON.stringify(b);
  const results = [];
  results.push({ pass: eq(fn(1, 10, 300, { p2: 2, t2: 600 }), { v2: 10 }), description: 'find v2: doubled P and T', got: JSON.stringify(fn(1, 10, 300, { p2: 2, t2: 600 })) });
  results.push({ pass: eq(fn(1, 10, 300, { v2: 5, t2: 300 }), { p2: 2 }), description: 'find p2: halved volume at same T', got: JSON.stringify(fn(1, 10, 300, { v2: 5, t2: 300 })) });
  results.push({ pass: eq(fn(1, 10, 300, { p2: 1, v2: 20 }), { t2: 600 }), description: 'find t2: doubled volume at same P', got: JSON.stringify(fn(1, 10, 300, { p2: 1, v2: 20 })) });
  results.push({ pass: eq(fn(2, 5, 400, { p2: 1, t2: 200 }), { v2: 5 }), description: 'halved P and T', got: JSON.stringify(fn(2, 5, 400, { p2: 1, t2: 200 })) });
  results.push({ pass: eq(fn(1, 1, 273, { v2: 1, t2: 273 }), { p2: 1 }), description: 'no change in conditions', got: JSON.stringify(fn(1, 1, 273, { v2: 1, t2: 273 })) });
  return results;
}`,
  testCases: [],
  hints: [
    "P₁V₁/T₁ = P₂V₂/T₂. Compute the constant k = P₁V₁/T₁, then solve for the missing final variable.",
    "If p2 is missing: p2 = k×T₂/V₂. If v2: v2 = k×T₂/P₂. If t2: t2 = P₂×V₂/k."
  ],
  resources: [
    { label: "MDN: Arithmetic operators", url: "/docs/mdn/arithmetic-operators.html" }
  ],
  solutionGate: 10,
  basePoints: 50
});

// ─── T3-5: Electrochemistry ─────────────────────────────────────────────────
exercises.push({
  id: id(),
  title: "Chemistry: Electrochemistry",
  type: "js",
  tier: 3,
  category: ["science", "chemistry"],
  tags: ["science", "chemistry", "electrochemistry", "nernst"],
  description: "Calculate cell potential using the Nernst equation.",
  instructions: "Write a function called `nernst` that calculates the cell potential under non-standard conditions.\n\nParameters:\n- `e0`: standard cell potential (V)\n- `n`: number of electrons transferred\n- `temp`: temperature (K)\n- `q`: reaction quotient\n\nReturn the cell potential E using the Nernst equation, rounded to 4 decimal places:\nE = E° - (RT / nF) × ln(Q)\n\nWhere R = 8.314 J/(mol⋅K), F = 96485 C/mol.\n\nExample:\n```\nnernst(1.1, 2, 298, 1)    // Returns: 1.1 (standard conditions)\nnernst(1.1, 2, 298, 0.01) // Returns: 1.1592\n```",
  starterCode: "function nernst(e0, n, temp, q) {\n  \n}",
  solution: "function nernst(e0, n, temp, q) {\n  const R = 8.314;\n  const F = 96485;\n  const E = e0 - (R * temp / (n * F)) * Math.log(q);\n  return Math.round(E * 10000) / 10000;\n}",
  testRunner: `(code) => {
  const fn = new Function(code + '; return nernst;')();
  const results = [];
  results.push({ pass: fn(1.1, 2, 298, 1) === 1.1, description: 'Q=1 gives standard potential', got: String(fn(1.1, 2, 298, 1)) });
  results.push({ pass: fn(1.1, 2, 298, 0.01) === 1.1591, description: 'Q=0.01 increases potential', got: String(fn(1.1, 2, 298, 0.01)) });
  results.push({ pass: fn(1.1, 2, 298, 100) < 1.1, description: 'Q>1 decreases potential', got: String(fn(1.1, 2, 298, 100)) });
  results.push({ pass: fn(0.76, 2, 298, 1) === 0.76, description: 'zinc half-cell at standard', got: String(fn(0.76, 2, 298, 1)) });
  const r5 = fn(0.34, 1, 350, 0.5);
  results.push({ pass: typeof r5 === 'number', description: 'returns a number', got: typeof r5 });
  return results;
}`,
  testCases: [],
  hints: [
    "The Nernst equation is E = E° - (RT/nF) × ln(Q). When Q = 1, ln(Q) = 0, so E = E°.",
    "Use `Math.log(q)` for natural logarithm. R = 8.314 and F = 96485 are constants."
  ],
  resources: [
    { label: "MDN: Math.log()", url: "/docs/mdn/math-log.html" }
  ],
  solutionGate: 10,
  basePoints: 50
});

// ─── T4-1: Chemical Equilibrium ─────────────────────────────────────────────
exercises.push({
  id: id(),
  title: "Chemistry: Equilibrium Solver",
  type: "js",
  tier: 4,
  category: ["science", "chemistry"],
  tags: ["science", "chemistry", "equilibrium", "quadratic"],
  description: "Solve chemical equilibrium problems using the ICE table method.",
  instructions: "Write a function called `equilibrium` that takes:\n- `kc`: equilibrium constant\n- `initial`: array of initial concentrations [A, B, C, D] for reaction aA + bB ⇌ cC + dD\n- `coefficients`: array [a, b, c, d]\n\nReturn the equilibrium concentrations as an array, rounded to 4 decimal places.\n\nAssume the reaction shifts right if Q < Kc, left if Q > Kc. Use iterative approximation (Newton's method or binary search) to find x.\n\nQ = [C]^c × [D]^d / ([A]^a × [B]^b)\n\nExample:\n```\nequilibrium(4, [1, 1, 0, 0], [1, 1, 1, 1])\n// Returns: [0.3333, 0.3333, 0.6667, 0.6667]\n```",
  starterCode: "",
  solution: "function equilibrium(kc, initial, coefficients) {\n  const [a, b, c, d] = coefficients;\n  let [A, B, C, D] = initial;\n  // Binary search for x\n  let lo = 0, hi = Math.min(A / a, B / b);\n  for (let iter = 0; iter < 100; iter++) {\n    const x = (lo + hi) / 2;\n    const eA = A - a * x;\n    const eB = B - b * x;\n    const eC = C + c * x;\n    const eD = D + d * x;\n    const q = Math.pow(eC, c) * Math.pow(eD, d) / (Math.pow(eA, a) * Math.pow(eB, b));\n    if (q < kc) lo = x;\n    else hi = x;\n  }\n  const x = (lo + hi) / 2;\n  const r4 = v => Math.round(v * 10000) / 10000;\n  return [r4(A - a * x), r4(B - b * x), r4(C + c * x), r4(D + d * x)];\n}",
  testRunner: `(code) => {
  const fn = new Function(code + '; return equilibrium;')();
  const eq = (a, b) => JSON.stringify(a) === JSON.stringify(b);
  const results = [];
  const r1 = fn(4, [1, 1, 0, 0], [1, 1, 1, 1]);
  results.push({ pass: r1[0] === 0.3333, description: '[A] at equilibrium ≈ 0.3333', got: String(r1[0]) });
  results.push({ pass: r1[2] === 0.6667, description: '[C] at equilibrium ≈ 0.6667', got: String(r1[2]) });
  const r2 = fn(1, [2, 2, 0, 0], [1, 1, 1, 1]);
  results.push({ pass: r2[0] === 1 && r2[2] === 1, description: 'Kc=1: equal concentrations', got: JSON.stringify(r2) });
  const r3 = fn(100, [1, 1, 0, 0], [1, 1, 1, 1]);
  results.push({ pass: r3[2] > 0.9, description: 'large Kc: mostly products', got: String(r3[2]) });
  const r4 = fn(0.01, [1, 1, 0, 0], [1, 1, 1, 1]);
  results.push({ pass: r4[0] > 0.9, description: 'small Kc: mostly reactants', got: String(r4[0]) });
  return results;
}`,
  testCases: [],
  hints: [
    "Set up an ICE table: [A] = A₀ - ax, [B] = B₀ - bx, [C] = C₀ + cx, [D] = D₀ + dx. Find x where Q = Kc.",
    "Use binary search on x between 0 and min(A₀/a, B₀/b). At each midpoint, compute Q and compare to Kc to determine which half to search."
  ],
  resources: [
    { label: "MDN: Math.pow()", url: "/docs/mdn/math-pow.html" }
  ],
  solutionGate: 10,
  basePoints: 75
});

// ─── T4-2: Reaction Kinetics ────────────────────────────────────────────────
exercises.push({
  id: id(),
  title: "Chemistry: Reaction Kinetics",
  type: "js",
  tier: 4,
  category: ["science", "chemistry"],
  tags: ["science", "chemistry", "kinetics", "rate-laws"],
  description: "Model reaction kinetics for zero, first, and second order reactions.",
  instructions: "Write a function called `kinetics` that takes `order` (0, 1, or 2), `k` (rate constant), `initial` (initial concentration), and `times` (array of time values), and returns concentrations at each time, rounded to 4 decimal places.\n\nFormulas:\n- Zero order: [A] = [A]₀ - kt (minimum 0)\n- First order: [A] = [A]₀ × e^(-kt)\n- Second order: [A] = [A]₀ / (1 + [A]₀kt)\n\nAlso return the half-life in the result object.\n\nReturn: `{ concentrations: [...], halfLife: number }`\n\nHalf-lives: 0th: [A]₀/(2k), 1st: ln(2)/k, 2nd: 1/(k×[A]₀)\n\nExample:\n```\nkinetics(1, 0.1, 10, [0, 5, 10])\n// Returns: { concentrations: [10, 6.0653, 3.6788], halfLife: 6.9315 }\n```",
  starterCode: "",
  solution: "function kinetics(order, k, initial, times) {\n  const r4 = v => Math.round(v * 10000) / 10000;\n  let concentrations, halfLife;\n  if (order === 0) {\n    concentrations = times.map(t => r4(Math.max(0, initial - k * t)));\n    halfLife = r4(initial / (2 * k));\n  } else if (order === 1) {\n    concentrations = times.map(t => r4(initial * Math.exp(-k * t)));\n    halfLife = r4(Math.log(2) / k);\n  } else {\n    concentrations = times.map(t => r4(initial / (1 + initial * k * t)));\n    halfLife = r4(1 / (k * initial));\n  }\n  return { concentrations, halfLife };\n}",
  testRunner: `(code) => {
  const fn = new Function(code + '; return kinetics;')();
  const eq = (a, b) => JSON.stringify(a) === JSON.stringify(b);
  const results = [];
  const r1 = fn(1, 0.1, 10, [0, 5, 10]);
  results.push({ pass: r1.concentrations[0] === 10, description: '1st order: initial concentration', got: String(r1.concentrations[0]) });
  results.push({ pass: r1.concentrations[1] === 6.0653, description: '1st order: [A] at t=5', got: String(r1.concentrations[1]) });
  results.push({ pass: r1.halfLife === 6.9315, description: '1st order half-life: ln(2)/k', got: String(r1.halfLife) });
  const r2 = fn(0, 2, 10, [0, 1, 5, 10]);
  results.push({ pass: r2.concentrations[2] === 0, description: '0th order: [A]=0 when depleted', got: String(r2.concentrations[2]) });
  results.push({ pass: r2.halfLife === 2.5, description: '0th order half-life', got: String(r2.halfLife) });
  const r3 = fn(2, 0.01, 100, [0, 10]);
  results.push({ pass: r3.concentrations[1] === 9.0909, description: '2nd order: [A] at t=10', got: String(r3.concentrations[1]) });
  results.push({ pass: r3.halfLife === 1, description: '2nd order half-life: 1/(k×[A]₀)', got: String(r3.halfLife) });
  return results;
}`,
  testCases: [],
  hints: [
    "Use different formulas based on the reaction order. Zero order depletes linearly, first order exponentially, second order hyperbolically.",
    "Switch on `order`: 0 → `initial - k*t` (clamp to 0), 1 → `initial * e^(-k*t)`, 2 → `initial / (1 + initial*k*t)`."
  ],
  resources: [
    { label: "MDN: Math.exp()", url: "/docs/mdn/math-exp.html" }
  ],
  solutionGate: 10,
  basePoints: 75
});

// ─── T4-3: Electron Configuration ───────────────────────────────────────────
exercises.push({
  id: id(),
  title: "Chemistry: Electron Configuration",
  type: "js",
  tier: 4,
  category: ["science", "chemistry"],
  tags: ["science", "chemistry", "electrons", "quantum"],
  description: "Generate the electron configuration of an element by atomic number.",
  instructions: "Write a function called `electronConfig` that takes an atomic number `z` (1-36) and returns an object with:\n- `configuration`: string like `'1s2 2s2 2p6 3s1'`\n- `valenceElectrons`: number of electrons in the outermost shell\n- `period`: the row number (outermost principal quantum number)\n- `block`: 's', 'p', 'd', or 'f' based on the last subshell being filled\n\nUse the Aufbau filling order: 1s, 2s, 2p, 3s, 3p, 4s, 3d, 4p\n\nExample:\n```\nelectronConfig(11)  // Na\n// Returns: { configuration: '1s2 2s2 2p6 3s1', valenceElectrons: 1, period: 3, block: 's' }\n```",
  starterCode: "",
  solution: `function electronConfig(z) {
  const order = [
    { n: 1, l: 's', max: 2 },
    { n: 2, l: 's', max: 2 },
    { n: 2, l: 'p', max: 6 },
    { n: 3, l: 's', max: 2 },
    { n: 3, l: 'p', max: 6 },
    { n: 4, l: 's', max: 2 },
    { n: 3, l: 'd', max: 10 },
    { n: 4, l: 'p', max: 6 }
  ];
  let remaining = z;
  const filled = [];
  let lastBlock = 's';
  let maxN = 1;
  for (const sub of order) {
    if (remaining <= 0) break;
    const electrons = Math.min(remaining, sub.max);
    filled.push(sub.n + sub.l + electrons);
    remaining -= electrons;
    lastBlock = sub.l;
    if (sub.n > maxN) maxN = sub.n;
  }
  // Valence electrons: count electrons in the outermost shell (maxN)
  // For d-block, valence includes the outermost s + d electrons
  let valence = 0;
  for (const sub of order) {
    if (remaining > 0) break; // only look at filled entries
  }
  // Re-count from filled entries
  const parts = filled.map(s => {
    const match = s.match(/(\\d)(\\w)(\\d+)/);
    return { n: parseInt(match[1]), l: match[2], e: parseInt(match[3]) };
  });
  const period = Math.max(...parts.map(p => p.n));
  valence = parts.filter(p => p.n === period).reduce((sum, p) => sum + p.e, 0);
  return {
    configuration: filled.join(' '),
    valenceElectrons: valence,
    period,
    block: lastBlock
  };
}`,
  testRunner: `(code) => {
  const fn = new Function(code + '; return electronConfig;')();
  const results = [];
  const r1 = fn(1);
  results.push({ pass: r1.configuration === '1s1' && r1.valenceElectrons === 1 && r1.period === 1 && r1.block === 's', description: 'H: 1s1', got: JSON.stringify(r1) });
  const r2 = fn(11);
  results.push({ pass: r2.configuration === '1s2 2s2 2p6 3s1' && r2.valenceElectrons === 1, description: 'Na: 1s2 2s2 2p6 3s1', got: JSON.stringify(r2) });
  const r3 = fn(26);
  results.push({ pass: r3.configuration === '1s2 2s2 2p6 3s2 3p6 4s2 3d6', description: 'Fe: includes 3d', got: r3.configuration });
  results.push({ pass: r3.block === 'd', description: 'Fe is d-block', got: r3.block });
  const r5 = fn(17);
  results.push({ pass: r5.configuration === '1s2 2s2 2p6 3s2 3p5' && r5.valenceElectrons === 7, description: 'Cl: 7 valence electrons', got: JSON.stringify(r5) });
  const r6 = fn(36);
  results.push({ pass: r6.configuration === '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6', description: 'Kr: noble gas', got: r6.configuration });
  return results;
}`,
  testCases: [],
  hints: [
    "Follow the Aufbau filling order: 1s, 2s, 2p, 3s, 3p, 4s, 3d, 4p. Fill each subshell to its max before moving on.",
    "Define the order as an array of objects with n, l, and max. Loop through, filling min(remaining, max) electrons at each step."
  ],
  resources: [
    { label: "MDN: String.prototype.match()", url: "/docs/mdn/string-match.html" }
  ],
  solutionGate: 10,
  basePoints: 75
});

// ─── T4-4: Molecular Geometry ───────────────────────────────────────────────
exercises.push({
  id: id(),
  title: "Chemistry: VSEPR Geometry",
  type: "js",
  tier: 4,
  category: ["science", "chemistry"],
  tags: ["science", "chemistry", "vsepr", "molecular-geometry"],
  description: "Determine molecular geometry using VSEPR theory.",
  instructions: "Write a function called `vsepGeometry` that takes `bondingPairs` and `lonePairs` (both integers) and returns an object with:\n- `electronGeometry`: the geometry of all electron pairs\n- `molecularGeometry`: the shape considering only bonding pairs\n- `bondAngle`: approximate bond angle in degrees\n- `isPolyar`: true if the molecule would be polar (asymmetric)\n\nUse VSEPR rules:\n- 2 electron regions: linear (180°)\n- 3: trigonal planar (120°)\n- 4: tetrahedral (109.5°)\n- 5: trigonal bipyramidal (90°/120°)\n- 6: octahedral (90°)\n\nLone pairs reduce the molecular geometry name.\n\nExample:\n```\nvsepGeometry(4, 0)  // Returns: { electronGeometry: 'tetrahedral', molecularGeometry: 'tetrahedral', bondAngle: 109.5, isPolar: false }\nvsepGeometry(3, 1)  // Returns: { electronGeometry: 'tetrahedral', molecularGeometry: 'trigonal pyramidal', bondAngle: 107, isPolar: true }\n```",
  starterCode: "",
  solution: `function vsepGeometry(bondingPairs, lonePairs) {
  const total = bondingPairs + lonePairs;
  const geometries = {
    '2-0': { e: 'linear', m: 'linear', angle: 180, polar: false },
    '3-0': { e: 'trigonal planar', m: 'trigonal planar', angle: 120, polar: false },
    '2-1': { e: 'trigonal planar', m: 'bent', angle: 117, polar: true },
    '4-0': { e: 'tetrahedral', m: 'tetrahedral', angle: 109.5, polar: false },
    '3-1': { e: 'tetrahedral', m: 'trigonal pyramidal', angle: 107, polar: true },
    '2-2': { e: 'tetrahedral', m: 'bent', angle: 104.5, polar: true },
    '5-0': { e: 'trigonal bipyramidal', m: 'trigonal bipyramidal', angle: 90, polar: false },
    '4-1': { e: 'trigonal bipyramidal', m: 'seesaw', angle: 90, polar: true },
    '3-2': { e: 'trigonal bipyramidal', m: 'T-shaped', angle: 90, polar: true },
    '2-3': { e: 'trigonal bipyramidal', m: 'linear', angle: 180, polar: false },
    '6-0': { e: 'octahedral', m: 'octahedral', angle: 90, polar: false },
    '5-1': { e: 'octahedral', m: 'square pyramidal', angle: 90, polar: true },
    '4-2': { e: 'octahedral', m: 'square planar', angle: 90, polar: false }
  };
  const key = bondingPairs + '-' + lonePairs;
  const g = geometries[key];
  return {
    electronGeometry: g.e,
    molecularGeometry: g.m,
    bondAngle: g.angle,
    isPolar: g.polar
  };
}`,
  testRunner: `(code) => {
  const fn = new Function(code + '; return vsepGeometry;')();
  const results = [];
  const r1 = fn(4, 0);
  results.push({ pass: r1.electronGeometry === 'tetrahedral' && r1.molecularGeometry === 'tetrahedral', description: '4BP+0LP: tetrahedral', got: JSON.stringify(r1) });
  results.push({ pass: r1.bondAngle === 109.5 && r1.isPolar === false, description: 'tetrahedral: 109.5°, nonpolar', got: r1.bondAngle + ', ' + r1.isPolar });
  const r2 = fn(3, 1);
  results.push({ pass: r2.molecularGeometry === 'trigonal pyramidal' && r2.isPolar === true, description: '3BP+1LP: trigonal pyramidal, polar', got: JSON.stringify(r2) });
  const r3 = fn(2, 2);
  results.push({ pass: r3.molecularGeometry === 'bent' && r3.bondAngle === 104.5, description: '2BP+2LP: bent, 104.5°', got: JSON.stringify(r3) });
  const r4 = fn(2, 0);
  results.push({ pass: r4.molecularGeometry === 'linear' && r4.bondAngle === 180, description: '2BP+0LP: linear, 180°', got: JSON.stringify(r4) });
  const r5 = fn(6, 0);
  results.push({ pass: r5.molecularGeometry === 'octahedral', description: '6BP+0LP: octahedral', got: r5.molecularGeometry });
  return results;
}`,
  testCases: [],
  hints: [
    "VSEPR theory predicts geometry from the total number of electron pairs. Lone pairs change the molecular geometry name but not the electron geometry.",
    "Build a lookup table mapping `bondingPairs-lonePairs` combinations to their geometry names, bond angles, and polarity."
  ],
  resources: [
    { label: "MDN: Object property accessors", url: "/docs/mdn/property-accessors.html" }
  ],
  solutionGate: 10,
  basePoints: 75
});

// ─── T5-1: Chemistry Lab Simulator ──────────────────────────────────────────
exercises.push({
  id: id(),
  title: "Chemistry: Titration Simulator",
  type: "js",
  tier: 5,
  category: ["science", "chemistry"],
  tags: ["science", "chemistry", "titration", "acid-base", "simulation"],
  description: "Simulate an acid-base titration and generate the titration curve.",
  instructions: "Build two functions:\n\n**`titrationCurve(acidConc, acidVol, baseConc, volumes)`** — Simulates adding a strong base to a strong acid.\n- `acidConc`: molarity of acid (M)\n- `acidVol`: volume of acid (mL)\n- `baseConc`: molarity of base (M)\n- `volumes`: array of base volumes added (mL)\n\nReturn an array of `{ volumeAdded, pH }` objects (pH rounded to 2 decimal places).\n\npH calculation:\n- Before equivalence: excess H⁺ → pH = -log₁₀([H⁺])\n- At equivalence: pH = 7\n- After equivalence: excess OH⁻ → pOH = -log₁₀([OH⁻]), pH = 14 - pOH\n\n**`findEquivalencePoint(acidConc, acidVol, baseConc)`** — Returns the volume of base needed to reach equivalence (mL, rounded to 2 decimal places).\n\nEquivalence: C_acid × V_acid = C_base × V_eq\n\nExample:\n```\nfindEquivalencePoint(0.1, 50, 0.1)  // Returns: 50\ntitrationCurve(0.1, 50, 0.1, [0, 25, 50, 75])\n// Returns: [{ volumeAdded: 0, pH: 1 }, { volumeAdded: 25, pH: 1.48 }, ...]\n```",
  starterCode: "",
  solution: `function findEquivalencePoint(acidConc, acidVol, baseConc) {
  return Math.round(acidConc * acidVol / baseConc * 100) / 100;
}

function titrationCurve(acidConc, acidVol, baseConc, volumes) {
  const acidMoles = acidConc * acidVol / 1000; // convert mL to L
  return volumes.map(vBase => {
    const baseMoles = baseConc * vBase / 1000;
    const totalVol = (acidVol + vBase) / 1000; // total volume in L
    let pH;
    if (Math.abs(acidMoles - baseMoles) < 1e-10) {
      pH = 7;
    } else if (baseMoles < acidMoles) {
      const excessH = (acidMoles - baseMoles) / totalVol;
      pH = -Math.log10(excessH);
    } else {
      const excessOH = (baseMoles - acidMoles) / totalVol;
      const pOH = -Math.log10(excessOH);
      pH = 14 - pOH;
    }
    return { volumeAdded: vBase, pH: Math.round(pH * 100) / 100 };
  });
}`,
  testRunner: `(code) => {
  const fn = new Function(code + '; return { findEquivalencePoint, titrationCurve };')();
  const results = [];
  // equivalence point
  results.push({ pass: fn.findEquivalencePoint(0.1, 50, 0.1) === 50, description: 'equivalence point: equal conc = equal vol', got: String(fn.findEquivalencePoint(0.1, 50, 0.1)) });
  results.push({ pass: fn.findEquivalencePoint(0.1, 50, 0.2) === 25, description: 'double conc base needs half vol', got: String(fn.findEquivalencePoint(0.1, 50, 0.2)) });
  // titration curve
  const curve = fn.titrationCurve(0.1, 50, 0.1, [0, 25, 50, 75]);
  results.push({ pass: curve[0].pH === 1, description: 'initial pH = 1 (0.1M acid)', got: String(curve[0].pH) });
  results.push({ pass: curve[1].pH === 1.48, description: 'pH at half-equivalence ≈ 1.48', got: String(curve[1].pH) });
  results.push({ pass: curve[2].pH === 7, description: 'pH at equivalence = 7', got: String(curve[2].pH) });
  results.push({ pass: curve[3].pH > 7, description: 'pH after equivalence > 7 (basic)', got: String(curve[3].pH) });
  results.push({ pass: curve.length === 4, description: '4 data points returned', got: String(curve.length) });
  return results;
}`,
  testCases: [],
  hints: [
    "Calculate moles of acid and base at each point. Before equivalence, excess H⁺ determines pH. After, excess OH⁻ determines pOH.",
    "Convert volumes to liters for concentration. Moles = concentration × volume. Excess ion concentration = excess moles / total volume."
  ],
  resources: [
    { label: "MDN: Math.log10()", url: "/docs/mdn/math-log10.html" },
    { label: "MDN: Array.prototype.map()", url: "/docs/mdn/array-map.html" }
  ],
  solutionGate: 10,
  basePoints: 100
});

// ── append to collection ────────────────────────────────────────────────────

collection.exercises.push(...exercises);
fs.writeFileSync(COLLECTION_FILE, JSON.stringify(collection, null, 2));
console.log(`✅ Section 6: Chemistry — ${exercises.length} exercises appended (IDs ${exercises[0].id}-${exercises[exercises.length - 1].id})`);
console.log(`   Collection total: ${collection.exercises.length} exercises`);
