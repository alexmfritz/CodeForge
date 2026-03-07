/**
 * Hard Math & Science — Section 5: Physics
 * 14 exercises (IDs 1141-1154): 3 T2, 6 T3, 4 T4, 1 T5
 *
 * Appends to the existing hard-math-science.json collection file.
 */

const fs = require('fs');
const path = require('path');

const COLLECTION_FILE = path.join(__dirname, 'hard-math-science.json');
const collection = JSON.parse(fs.readFileSync(COLLECTION_FILE, 'utf8'));

let nextId = 1141;
function id() { return nextId++; }

const exercises = [];

// ─── T2-1: Kinematic Equations ──────────────────────────────────────────────
exercises.push({
  id: id(),
  title: "Physics: Kinematic Equations",
  type: "js",
  tier: 2,
  category: ["science", "physics"],
  tags: ["science", "physics", "kinematics", "motion"],
  description: "Calculate displacement, velocity, and time using basic kinematic equations.",
  instructions: "Write a function called `kinematics` that takes an object with properties `v0` (initial velocity, m/s), `a` (acceleration, m/s²), and `t` (time, s), and returns an object with:\n- `displacement`: v₀t + ½at² (rounded to 2 decimal places)\n- `finalVelocity`: v₀ + at (rounded to 2 decimal places)\n\nExample:\n```\nkinematics({ v0: 10, a: 2, t: 5 })\n// Returns: { displacement: 75, finalVelocity: 20 }\n```",
  starterCode: "// Return displacement and final velocity\nfunction kinematics({ v0, a, t }) {\n  \n}",
  solution: "function kinematics({ v0, a, t }) {\n  return {\n    displacement: Math.round((v0 * t + 0.5 * a * t * t) * 100) / 100,\n    finalVelocity: Math.round((v0 + a * t) * 100) / 100\n  };\n}",
  testRunner: `(code) => {
  const fn = new Function(code + '; return kinematics;')();
  const eq = (a, b) => JSON.stringify(a) === JSON.stringify(b);
  const results = [];
  results.push({ pass: eq(fn({ v0: 10, a: 2, t: 5 }), { displacement: 75, finalVelocity: 20 }), description: 'v0=10, a=2, t=5', got: JSON.stringify(fn({ v0: 10, a: 2, t: 5 })) });
  results.push({ pass: eq(fn({ v0: 0, a: 9.8, t: 3 }), { displacement: 44.1, finalVelocity: 29.4 }), description: 'free fall from rest for 3s', got: JSON.stringify(fn({ v0: 0, a: 9.8, t: 3 })) });
  results.push({ pass: eq(fn({ v0: 20, a: -5, t: 4 }), { displacement: 40, finalVelocity: 0 }), description: 'deceleration to stop', got: JSON.stringify(fn({ v0: 20, a: -5, t: 4 })) });
  results.push({ pass: eq(fn({ v0: 0, a: 0, t: 10 }), { displacement: 0, finalVelocity: 0 }), description: 'stationary object', got: JSON.stringify(fn({ v0: 0, a: 0, t: 10 })) });
  results.push({ pass: eq(fn({ v0: 5, a: 0, t: 10 }), { displacement: 50, finalVelocity: 5 }), description: 'constant velocity', got: JSON.stringify(fn({ v0: 5, a: 0, t: 10 })) });
  return results;
}`,
  testCases: [],
  hints: [
    "Displacement uses the formula s = v₀t + ½at². Final velocity is v = v₀ + at.",
    "Plug in the values directly: `v0 * t + 0.5 * a * t * t` for displacement and `v0 + a * t` for velocity."
  ],
  resources: [
    { label: "MDN: Math.round()", url: "/docs/mdn/math-round.html" }
  ],
  solutionGate: 10,
  basePoints: 25
});

// ─── T2-2: Newton's Second Law ──────────────────────────────────────────────
exercises.push({
  id: id(),
  title: "Physics: Newton's Second Law",
  type: "js",
  tier: 2,
  category: ["science", "physics"],
  tags: ["science", "physics", "force", "newton"],
  description: "Calculate force, mass, or acceleration using F = ma.",
  instructions: "Write a function called `newton` that takes an object with exactly two of the three properties: `force` (N), `mass` (kg), `acceleration` (m/s²), and returns the missing value, rounded to 2 decimal places.\n\nF = m × a\n\nExample:\n```\nnewton({ mass: 10, acceleration: 5 })  // Returns: { force: 50 }\nnewton({ force: 100, mass: 20 })       // Returns: { acceleration: 5 }\nnewton({ force: 100, acceleration: 5 }) // Returns: { mass: 20 }\n```",
  starterCode: "// Return the missing value from F = ma\nfunction newton({ force, mass, acceleration }) {\n  \n}",
  solution: "function newton({ force, mass, acceleration }) {\n  if (force === undefined) return { force: Math.round(mass * acceleration * 100) / 100 };\n  if (mass === undefined) return { mass: Math.round(force / acceleration * 100) / 100 };\n  return { acceleration: Math.round(force / mass * 100) / 100 };\n}",
  testRunner: `(code) => {
  const fn = new Function(code + '; return newton;')();
  const eq = (a, b) => JSON.stringify(a) === JSON.stringify(b);
  const results = [];
  results.push({ pass: eq(fn({ mass: 10, acceleration: 5 }), { force: 50 }), description: 'F = 10 × 5 = 50', got: JSON.stringify(fn({ mass: 10, acceleration: 5 })) });
  results.push({ pass: eq(fn({ force: 100, mass: 20 }), { acceleration: 5 }), description: 'a = 100 / 20 = 5', got: JSON.stringify(fn({ force: 100, mass: 20 })) });
  results.push({ pass: eq(fn({ force: 100, acceleration: 5 }), { mass: 20 }), description: 'm = 100 / 5 = 20', got: JSON.stringify(fn({ force: 100, acceleration: 5 })) });
  results.push({ pass: eq(fn({ mass: 0.5, acceleration: 9.8 }), { force: 4.9 }), description: 'F = 0.5 × 9.8 = 4.9', got: JSON.stringify(fn({ mass: 0.5, acceleration: 9.8 })) });
  results.push({ pass: eq(fn({ force: 75, mass: 15 }), { acceleration: 5 }), description: 'a = 75 / 15 = 5', got: JSON.stringify(fn({ force: 75, mass: 15 })) });
  results.push({ pass: eq(fn({ force: 9.8, acceleration: 9.8 }), { mass: 1 }), description: 'm = 9.8 / 9.8 = 1', got: JSON.stringify(fn({ force: 9.8, acceleration: 9.8 })) });
  return results;
}`,
  testCases: [],
  hints: [
    "Check which parameter is `undefined` (missing), then compute it from the other two using F = m × a.",
    "Use `=== undefined` to detect the missing value. If force is missing, compute `mass * acceleration`. If mass is missing, compute `force / acceleration`."
  ],
  resources: [
    { label: "MDN: undefined", url: "/docs/mdn/undefined.html" }
  ],
  solutionGate: 10,
  basePoints: 25
});

// ─── T2-3: Energy Conversions ───────────────────────────────────────────────
exercises.push({
  id: id(),
  title: "Physics: Energy Conversions",
  type: "js",
  tier: 2,
  category: ["science", "physics"],
  tags: ["science", "physics", "energy", "kinetic", "potential"],
  description: "Calculate kinetic and potential energy.",
  instructions: "Write a function called `energy` that takes an object with `mass` (kg), `velocity` (m/s), and `height` (m), and returns an object with:\n- `kinetic`: ½mv² (in Joules, rounded to 2 decimal places)\n- `potential`: mgh where g = 9.8 m/s² (in Joules, rounded to 2 decimal places)\n- `total`: kinetic + potential (rounded to 2 decimal places)\n\nExample:\n```\nenergy({ mass: 10, velocity: 5, height: 20 })\n// Returns: { kinetic: 125, potential: 1960, total: 2085 }\n```",
  starterCode: "// Return kinetic, potential, and total energy\nfunction energy({ mass, velocity, height }) {\n  \n}",
  solution: "function energy({ mass, velocity, height }) {\n  const g = 9.8;\n  const kinetic = Math.round(0.5 * mass * velocity * velocity * 100) / 100;\n  const potential = Math.round(mass * g * height * 100) / 100;\n  const total = Math.round((kinetic + potential) * 100) / 100;\n  return { kinetic, potential, total };\n}",
  testRunner: `(code) => {
  const fn = new Function(code + '; return energy;')();
  const eq = (a, b) => JSON.stringify(a) === JSON.stringify(b);
  const results = [];
  results.push({ pass: eq(fn({ mass: 10, velocity: 5, height: 20 }), { kinetic: 125, potential: 1960, total: 2085 }), description: 'm=10, v=5, h=20', got: JSON.stringify(fn({ mass: 10, velocity: 5, height: 20 })) });
  results.push({ pass: eq(fn({ mass: 1, velocity: 0, height: 10 }), { kinetic: 0, potential: 98, total: 98 }), description: 'stationary at height 10', got: JSON.stringify(fn({ mass: 1, velocity: 0, height: 10 })) });
  results.push({ pass: eq(fn({ mass: 2, velocity: 3, height: 0 }), { kinetic: 9, potential: 0, total: 9 }), description: 'moving at ground level', got: JSON.stringify(fn({ mass: 2, velocity: 3, height: 0 })) });
  results.push({ pass: eq(fn({ mass: 5, velocity: 10, height: 5 }), { kinetic: 250, potential: 245, total: 495 }), description: 'm=5, v=10, h=5', got: JSON.stringify(fn({ mass: 5, velocity: 10, height: 5 })) });
  results.push({ pass: eq(fn({ mass: 0.1, velocity: 100, height: 0 }), { kinetic: 500, potential: 0, total: 500 }), description: 'bullet speed', got: JSON.stringify(fn({ mass: 0.1, velocity: 100, height: 0 })) });
  return results;
}`,
  testCases: [],
  hints: [
    "Kinetic energy is ½mv² and potential energy is mgh (where g = 9.8). Total is their sum.",
    "Compute `0.5 * mass * velocity * velocity` for KE and `mass * 9.8 * height` for PE."
  ],
  resources: [
    { label: "MDN: Arithmetic operators", url: "/docs/mdn/arithmetic-operators.html" }
  ],
  solutionGate: 10,
  basePoints: 25
});

// ─── T3-1: Projectile Motion ────────────────────────────────────────────────
exercises.push({
  id: id(),
  title: "Physics: Projectile Motion",
  type: "js",
  tier: 3,
  category: ["science", "physics"],
  tags: ["science", "physics", "projectile", "trigonometry"],
  description: "Calculate projectile motion parameters given initial velocity and launch angle.",
  instructions: "Write a function called `projectile` that takes `v0` (initial velocity, m/s) and `angleDeg` (launch angle in degrees), and returns an object with (using g = 9.8 m/s²):\n- `maxHeight`: v₀²sin²(θ) / (2g), rounded to 2 decimal places\n- `range`: v₀²sin(2θ) / g, rounded to 2 decimal places\n- `flightTime`: 2v₀sin(θ) / g, rounded to 2 decimal places\n\nExample:\n```\nprojectile(20, 45)\n// Returns: { maxHeight: 10.2, range: 40.82, flightTime: 2.89 }\n```",
  starterCode: "function projectile(v0, angleDeg) {\n  \n}",
  solution: "function projectile(v0, angleDeg) {\n  const g = 9.8;\n  const theta = angleDeg * Math.PI / 180;\n  const sinT = Math.sin(theta);\n  const maxHeight = Math.round((v0 * v0 * sinT * sinT / (2 * g)) * 100) / 100;\n  const range = Math.round((v0 * v0 * Math.sin(2 * theta) / g) * 100) / 100;\n  const flightTime = Math.round((2 * v0 * sinT / g) * 100) / 100;\n  return { maxHeight, range, flightTime };\n}",
  testRunner: `(code) => {
  const fn = new Function(code + '; return projectile;')();
  const eq = (a, b) => JSON.stringify(a) === JSON.stringify(b);
  const results = [];
  results.push({ pass: eq(fn(20, 45), { maxHeight: 10.2, range: 40.82, flightTime: 2.89 }), description: 'v0=20, angle=45°', got: JSON.stringify(fn(20, 45)) });
  results.push({ pass: eq(fn(10, 30), { maxHeight: 1.28, range: 8.84, flightTime: 1.02 }), description: 'v0=10, angle=30°', got: JSON.stringify(fn(10, 30)) });
  results.push({ pass: eq(fn(50, 90), { maxHeight: 127.55, range: 0, flightTime: 10.2 }), description: 'vertical launch', got: JSON.stringify(fn(50, 90)) });
  results.push({ pass: fn(30, 0).maxHeight === 0, description: 'horizontal launch has 0 max height', got: String(fn(30, 0).maxHeight) });
  results.push({ pass: fn(20, 45).range === fn(20, 45).range, description: '45° gives max range', got: JSON.stringify(fn(20, 45)) });
  return results;
}`,
  testCases: [],
  hints: [
    "Convert the angle from degrees to radians: `θ = angle × π / 180`. Then apply the standard projectile formulas.",
    "Use `Math.sin()` for sine. Max height = v₀²sin²(θ)/(2g), Range = v₀²sin(2θ)/g, Time = 2v₀sin(θ)/g."
  ],
  resources: [
    { label: "MDN: Math.sin()", url: "/docs/mdn/math-sin.html" }
  ],
  solutionGate: 10,
  basePoints: 50
});

// ─── T3-2: Simple Harmonic Motion ───────────────────────────────────────────
exercises.push({
  id: id(),
  title: "Physics: Simple Harmonic Motion",
  type: "js",
  tier: 3,
  category: ["science", "physics"],
  tags: ["science", "physics", "shm", "oscillation"],
  description: "Model the position of an object undergoing simple harmonic motion over time.",
  instructions: "Write a function called `shm` that takes `amplitude` (m), `frequency` (Hz), and `times` (array of time values in seconds), and returns an array of positions at each time, rounded to 4 decimal places.\n\nFormula: x(t) = A × cos(2πft)\n\nExample:\n```\nshm(5, 2, [0, 0.125, 0.25])\n// Returns: [5, 0, -5]\n```",
  starterCode: "function shm(amplitude, frequency, times) {\n  \n}",
  solution: "function shm(amplitude, frequency, times) {\n  return times.map(t => {\n    const x = amplitude * Math.cos(2 * Math.PI * frequency * t);\n    return Math.round(x * 10000) / 10000;\n  });\n}",
  testRunner: `(code) => {
  const fn = new Function(code + '; return shm;')();
  const eq = (a, b) => JSON.stringify(a) === JSON.stringify(b);
  const results = [];
  results.push({ pass: eq(fn(5, 2, [0, 0.125, 0.25]), [5, 0, -5]), description: 'A=5, f=2 at t=0, 0.125, 0.25', got: JSON.stringify(fn(5, 2, [0, 0.125, 0.25])) });
  results.push({ pass: fn(10, 1, [0])[0] === 10, description: 'at t=0 position equals amplitude', got: String(fn(10, 1, [0])[0]) });
  results.push({ pass: fn(3, 1, [0.5])[0] === -3, description: 'at t=T/2 position equals -amplitude', got: String(fn(3, 1, [0.5])[0]) });
  results.push({ pass: fn(1, 1, [1])[0] === 1, description: 'at t=T position returns to amplitude', got: String(fn(1, 1, [1])[0]) });
  const r = fn(4, 0.5, [0, 0.5, 1, 1.5, 2]);
  results.push({ pass: r[0] === 4 && r[2] === -4 && r[4] === 4, description: 'full period at f=0.5', got: JSON.stringify(r) });
  return results;
}`,
  testCases: [],
  hints: [
    "Position in SHM is given by x(t) = A × cos(2πft). Convert each time to a position using this formula.",
    "Use `.map()` to transform each time value. Compute `amplitude * Math.cos(2 * Math.PI * frequency * t)` for each."
  ],
  resources: [
    { label: "MDN: Math.cos()", url: "/docs/mdn/math-cos.html" }
  ],
  solutionGate: 10,
  basePoints: 50
});

// ─── T3-3: Ohm's Law Circuit ────────────────────────────────────────────────
exercises.push({
  id: id(),
  title: "Physics: Ohm's Law Circuit",
  type: "js",
  tier: 3,
  category: ["science", "physics"],
  tags: ["science", "physics", "circuits", "ohms-law"],
  description: "Analyze a series circuit with multiple resistors.",
  instructions: "Write a function called `seriesCircuit` that takes a `voltage` (V) and an array of `resistances` (Ω), and returns an object with:\n- `totalResistance`: sum of all resistances (Ω)\n- `current`: V / R_total (A, rounded to 4 decimal places)\n- `voltageDrops`: array of voltage across each resistor (V = IR, rounded to 4 decimal places)\n- `power`: total power P = IV (W, rounded to 4 decimal places)\n\nExample:\n```\nseriesCircuit(12, [100, 200, 300])\n// Returns: { totalResistance: 600, current: 0.02, voltageDrops: [2, 4, 6], power: 0.24 }\n```",
  starterCode: "function seriesCircuit(voltage, resistances) {\n  \n}",
  solution: "function seriesCircuit(voltage, resistances) {\n  const totalResistance = resistances.reduce((a, b) => a + b, 0);\n  const current = Math.round((voltage / totalResistance) * 10000) / 10000;\n  const voltageDrops = resistances.map(r => Math.round(current * r * 10000) / 10000);\n  const power = Math.round(current * voltage * 10000) / 10000;\n  return { totalResistance, current, voltageDrops, power };\n}",
  testRunner: `(code) => {
  const fn = new Function(code + '; return seriesCircuit;')();
  const eq = (a, b) => JSON.stringify(a) === JSON.stringify(b);
  const results = [];
  results.push({ pass: eq(fn(12, [100, 200, 300]), { totalResistance: 600, current: 0.02, voltageDrops: [2, 4, 6], power: 0.24 }), description: '12V, [100,200,300]Ω series', got: JSON.stringify(fn(12, [100, 200, 300])) });
  const r2 = fn(9, [100]);
  results.push({ pass: r2.totalResistance === 100 && r2.current === 0.09, description: '9V single 100Ω resistor', got: JSON.stringify(r2) });
  const r3 = fn(5, [50, 50]);
  results.push({ pass: r3.current === 0.05 && eq(r3.voltageDrops, [2.5, 2.5]), description: 'equal resistors split voltage', got: JSON.stringify(r3) });
  results.push({ pass: fn(24, [1000, 2000, 1000]).totalResistance === 4000, description: 'total resistance sum', got: String(fn(24, [1000, 2000, 1000]).totalResistance) });
  const r5 = fn(10, [200, 300]);
  results.push({ pass: r5.current === 0.02 && r5.power === 0.2, description: '10V [200,300]Ω power calculation', got: JSON.stringify(r5) });
  return results;
}`,
  testCases: [],
  hints: [
    "In a series circuit, total resistance is the sum of all resistors. Current is the same everywhere: I = V / R_total.",
    "Use `.reduce()` for total resistance, then compute current. Use `.map()` to find voltage drop across each resistor (V = I × R)."
  ],
  resources: [
    { label: "MDN: Array.prototype.reduce()", url: "/docs/mdn/array-reduce.html" }
  ],
  solutionGate: 10,
  basePoints: 50
});

// ─── T3-4: Wave Properties ──────────────────────────────────────────────────
exercises.push({
  id: id(),
  title: "Physics: Wave Properties",
  type: "js",
  tier: 3,
  category: ["science", "physics"],
  tags: ["science", "physics", "waves", "frequency"],
  description: "Calculate wave properties and model wave superposition.",
  instructions: "Write a function called `waveProperties` that takes `wavelength` (m) and `frequency` (Hz), and returns an object with:\n- `speed`: wavelength × frequency (m/s)\n- `period`: 1 / frequency (s, rounded to 4 decimal places)\n- `angularFrequency`: 2π × frequency (rad/s, rounded to 4 decimal places)\n- `wavenumber`: 2π / wavelength (rad/m, rounded to 4 decimal places)\n\nExample:\n```\nwaveProperties(0.5, 100)\n// Returns: { speed: 50, period: 0.01, angularFrequency: 628.3185, wavenumber: 12.5664 }\n```",
  starterCode: "function waveProperties(wavelength, frequency) {\n  \n}",
  solution: "function waveProperties(wavelength, frequency) {\n  return {\n    speed: Math.round(wavelength * frequency * 10000) / 10000,\n    period: Math.round((1 / frequency) * 10000) / 10000,\n    angularFrequency: Math.round(2 * Math.PI * frequency * 10000) / 10000,\n    wavenumber: Math.round((2 * Math.PI / wavelength) * 10000) / 10000\n  };\n}",
  testRunner: `(code) => {
  const fn = new Function(code + '; return waveProperties;')();
  const eq = (a, b) => JSON.stringify(a) === JSON.stringify(b);
  const results = [];
  results.push({ pass: eq(fn(0.5, 100), { speed: 50, period: 0.01, angularFrequency: 628.3185, wavenumber: 12.5664 }), description: 'λ=0.5m, f=100Hz', got: JSON.stringify(fn(0.5, 100)) });
  results.push({ pass: fn(340, 1).speed === 340, description: 'speed of sound at 1Hz', got: String(fn(340, 1).speed) });
  results.push({ pass: fn(1, 1).period === 1, description: 'period of 1Hz is 1s', got: String(fn(1, 1).period) });
  const r4 = fn(2, 50);
  results.push({ pass: r4.speed === 100, description: 'λ=2m, f=50Hz gives speed 100', got: String(r4.speed) });
  results.push({ pass: r4.angularFrequency === 314.1593, description: 'angular frequency of 50Hz', got: String(r4.angularFrequency) });
  results.push({ pass: r4.wavenumber === 3.1416, description: 'wavenumber for λ=2m', got: String(r4.wavenumber) });
  return results;
}`,
  testCases: [],
  hints: [
    "Speed = wavelength × frequency. Period = 1/frequency. Angular frequency = 2πf. Wavenumber = 2π/λ.",
    "Apply each formula directly. Use `Math.PI` for π and round each result to 4 decimal places."
  ],
  resources: [
    { label: "MDN: Math.PI", url: "/docs/mdn/math-pi.html" }
  ],
  solutionGate: 10,
  basePoints: 50
});

// ─── T3-5: Gravitational Force ──────────────────────────────────────────────
exercises.push({
  id: id(),
  title: "Physics: Gravitational Force",
  type: "js",
  tier: 3,
  category: ["science", "physics"],
  tags: ["science", "physics", "gravity", "newton"],
  description: "Calculate gravitational force between two objects and orbital velocity.",
  instructions: "Write a function called `gravity` that takes `m1` (kg), `m2` (kg), and `distance` (m), and returns an object with:\n- `force`: G × m1 × m2 / d² (N), where G = 6.674e-11 N⋅m²/kg²\n- `orbitalVelocity`: √(G × m1 / d) — velocity for m2 to orbit m1 (m/s)\n- `escapeVelocity`: √(2 × G × m1 / d) (m/s)\n\nAll values rounded to 4 decimal places. Use scientific notation where appropriate.\n\nExample:\n```\ngravity(5.972e24, 7.348e22, 3.844e8)\n// Returns: { force: 1.9821e+20, orbitalVelocity: 1018.2932, escapeVelocity: 1440.0833 }\n```",
  starterCode: "function gravity(m1, m2, distance) {\n  \n}",
  solution: "function gravity(m1, m2, distance) {\n  const G = 6.674e-11;\n  const force = G * m1 * m2 / (distance * distance);\n  const orbitalV = Math.sqrt(G * m1 / distance);\n  const escapeV = Math.sqrt(2 * G * m1 / distance);\n  const r4 = v => Math.round(v * 10000) / 10000;\n  return {\n    force: parseFloat(force.toPrecision(5)),\n    orbitalVelocity: r4(orbitalV),\n    escapeVelocity: r4(escapeV)\n  };\n}",
  testRunner: `(code) => {
  const fn = new Function(code + '; return gravity;')();
  const results = [];
  const r1 = fn(5.972e24, 7.348e22, 3.844e8);
  results.push({ pass: Math.abs(r1.force - 1.9821e20) / 1.9821e20 < 0.01, description: 'Earth-Moon gravitational force', got: String(r1.force) });
  results.push({ pass: Math.abs(r1.orbitalVelocity - 1018.29) < 1, description: 'Moon orbital velocity ~1018 m/s', got: String(r1.orbitalVelocity) });
  results.push({ pass: Math.abs(r1.escapeVelocity - 1440.08) < 1, description: 'escape velocity from Earth at Moon distance', got: String(r1.escapeVelocity) });
  const r2 = fn(100, 100, 1);
  results.push({ pass: Math.abs(r2.force - 6.674e-7) / 6.674e-7 < 0.01, description: 'two 100kg objects 1m apart', got: String(r2.force) });
  const r3 = fn(1.989e30, 5.972e24, 1.496e11);
  results.push({ pass: Math.abs(r3.orbitalVelocity - 29784) < 50, description: 'Earth orbital velocity ~29784 m/s', got: String(r3.orbitalVelocity) });
  return results;
}`,
  testCases: [],
  hints: [
    "Apply Newton's law of gravitation: F = G×m₁×m₂/d². Orbital velocity = √(G×m₁/d). Escape velocity = √(2G×m₁/d).",
    "Use `G = 6.674e-11`. For very large/small numbers, `.toPrecision(5)` helps format the force output."
  ],
  resources: [
    { label: "MDN: Math.sqrt()", url: "/docs/mdn/math-sqrt.html" }
  ],
  solutionGate: 10,
  basePoints: 50
});

// ─── T3-6: Doppler Effect ──────────────────────────────────────────────────
exercises.push({
  id: id(),
  title: "Physics: Doppler Effect",
  type: "js",
  tier: 3,
  category: ["science", "physics"],
  tags: ["science", "physics", "waves", "doppler"],
  description: "Calculate the observed frequency due to the Doppler effect.",
  instructions: "Write a function called `doppler` that takes:\n- `sourceFreq` (Hz): the emitted frequency\n- `sourceVelocity` (m/s): speed of the source (positive = moving toward observer)\n- `observerVelocity` (m/s): speed of the observer (positive = moving toward source)\n- `soundSpeed` (m/s): speed of sound (default 343)\n\nReturn the observed frequency, rounded to 2 decimal places.\n\nFormula: f_observed = f_source × (v_sound + v_observer) / (v_sound - v_source)\n\nExample:\n```\ndoppler(440, 30, 0)   // Returns: 482.17 (ambulance approaching)\ndoppler(440, -30, 0)  // Returns: 404.29 (ambulance receding)\n```",
  starterCode: "function doppler(sourceFreq, sourceVelocity, observerVelocity, soundSpeed = 343) {\n  \n}",
  solution: "function doppler(sourceFreq, sourceVelocity, observerVelocity, soundSpeed = 343) {\n  const observed = sourceFreq * (soundSpeed + observerVelocity) / (soundSpeed - sourceVelocity);\n  return Math.round(observed * 100) / 100;\n}",
  testRunner: `(code) => {
  const fn = new Function(code + '; return doppler;')();
  const results = [];
  results.push({ pass: fn(440, 30, 0) === 482.17, description: 'source approaching at 30 m/s', got: String(fn(440, 30, 0)) });
  results.push({ pass: fn(440, -30, 0) === 404.61, description: 'source receding at 30 m/s', got: String(fn(440, -30, 0)) });
  results.push({ pass: fn(440, 0, 0) === 440, description: 'stationary returns original frequency', got: String(fn(440, 0, 0)) });
  results.push({ pass: fn(440, 0, 30, 343) === 478.48, description: 'observer approaching at 30 m/s', got: String(fn(440, 0, 30, 343)) });
  results.push({ pass: fn(1000, 50, 20, 343) === 1238.91, description: 'both moving toward each other', got: String(fn(1000, 50, 20, 343)) });
  return results;
}`,
  testCases: [],
  hints: [
    "The Doppler formula: f_observed = f_source × (v_sound + v_observer) / (v_sound - v_source). Signs matter — positive means moving toward.",
    "Plug in the values directly. Positive `sourceVelocity` means approaching (decreases denominator, increases observed frequency)."
  ],
  resources: [
    { label: "MDN: Default parameters", url: "/docs/mdn/default-parameters.html" }
  ],
  solutionGate: 10,
  basePoints: 50
});

// ─── T4-1: Spring-Mass System ───────────────────────────────────────────────
exercises.push({
  id: id(),
  title: "Physics: Damped Oscillation",
  type: "js",
  tier: 4,
  category: ["science", "physics"],
  tags: ["science", "physics", "oscillation", "damping", "differential-equations"],
  description: "Model a damped spring-mass system over time.",
  instructions: "Write a function called `dampedOscillator` that takes `mass` (kg), `springConstant` (N/m), `dampingCoeff` (kg/s), `x0` (initial displacement, m), and `times` (array of seconds), and returns an array of positions at each time, rounded to 4 decimal places.\n\nFor underdamped motion (b² < 4mk):\nx(t) = x₀ × e^(-γt) × cos(ωₐt)\nwhere γ = b/(2m), ωₐ = √(k/m - γ²)\n\nFor overdamped (b² > 4mk), return x₀ × e^(-γt) (simplified exponential decay).\n\nExample:\n```\ndampedOscillator(1, 100, 0.5, 0.1, [0, 0.1, 0.2])\n// Returns: [0.1, 0.0951, 0.0808]\n```",
  starterCode: "",
  solution: "function dampedOscillator(mass, springConstant, dampingCoeff, x0, times) {\n  const gamma = dampingCoeff / (2 * mass);\n  const omega0sq = springConstant / mass;\n  if (gamma * gamma >= omega0sq) {\n    // Overdamped or critically damped\n    return times.map(t => Math.round(x0 * Math.exp(-gamma * t) * 10000) / 10000);\n  }\n  const omegaD = Math.sqrt(omega0sq - gamma * gamma);\n  return times.map(t => {\n    const x = x0 * Math.exp(-gamma * t) * Math.cos(omegaD * t);\n    return Math.round(x * 10000) / 10000;\n  });\n}",
  testRunner: `(code) => {
  const fn = new Function(code + '; return dampedOscillator;')();
  const results = [];
  const r1 = fn(1, 100, 0.5, 0.1, [0, 0.1, 0.2]);
  results.push({ pass: r1[0] === 0.1, description: 'position at t=0 equals initial displacement', got: String(r1[0]) });
  results.push({ pass: Math.abs(r1[1]) < 0.1, description: 'position decreases over time', got: String(r1[1]) });
  results.push({ pass: r1.length === 3, description: 'returns correct number of positions', got: String(r1.length) });
  const r2 = fn(1, 100, 0.5, 0.1, [0]);
  results.push({ pass: r2[0] === 0.1, description: 'single time point works', got: String(r2[0]) });
  // Overdamped case
  const r3 = fn(1, 1, 10, 0.5, [0, 1, 2]);
  results.push({ pass: r3[0] === 0.5 && r3[1] < 0.5 && r3[2] < r3[1], description: 'overdamped: monotonically decaying', got: JSON.stringify(r3) });
  results.push({ pass: r3[2] >= 0, description: 'overdamped: stays non-negative', got: String(r3[2]) });
  return results;
}`,
  testCases: [],
  hints: [
    "First determine if the system is underdamped (b²<4mk) or overdamped. Then apply the appropriate formula with the exponential decay envelope.",
    "Compute γ = b/(2m) and ω₀² = k/m. If γ² < ω₀², compute ωd = √(ω₀² - γ²) and use `x0 * e^(-γt) * cos(ωd*t)`."
  ],
  resources: [
    { label: "MDN: Math.exp()", url: "/docs/mdn/math-exp.html" }
  ],
  solutionGate: 10,
  basePoints: 75
});

// ─── T4-2: Relativistic Effects ─────────────────────────────────────────────
exercises.push({
  id: id(),
  title: "Physics: Special Relativity",
  type: "js",
  tier: 4,
  category: ["science", "physics"],
  tags: ["science", "physics", "relativity", "lorentz"],
  description: "Calculate relativistic effects including time dilation, length contraction, and relativistic mass.",
  instructions: "Write a function called `relativity` that takes a `velocity` (m/s) and returns an object with:\n- `beta`: v/c (ratio of velocity to speed of light, rounded to 6 decimal places)\n- `gamma`: Lorentz factor 1/√(1 - β²) (rounded to 4 decimal places)\n- `timeDilation`: for 1 second proper time, dilated time = γ × 1 (s, rounded to 4 decimal places)\n- `lengthContraction`: for 1 meter proper length, contracted length = 1/γ (m, rounded to 4 decimal places)\n- `relativisticKE`: (γ - 1) × m₀c² for m₀ = 1 kg (J, rounded to 0 decimal places)\n\nUse c = 299792458 m/s.\n\nExample:\n```\nrelativity(0.5 * 299792458)  // 50% speed of light\n// Returns: { beta: 0.5, gamma: 1.1547, timeDilation: 1.1547, lengthContraction: 0.866, relativisticKE: 13889047942252 }\n```",
  starterCode: "",
  solution: "function relativity(velocity) {\n  const c = 299792458;\n  const beta = Math.round((velocity / c) * 1000000) / 1000000;\n  const gamma = Math.round((1 / Math.sqrt(1 - beta * beta)) * 10000) / 10000;\n  const timeDilation = gamma;\n  const lengthContraction = Math.round((1 / gamma) * 10000) / 10000;\n  const relativisticKE = Math.round((gamma - 1) * 1 * c * c);\n  return { beta, gamma, timeDilation, lengthContraction, relativisticKE };\n}",
  testRunner: `(code) => {
  const fn = new Function(code + '; return relativity;')();
  const results = [];
  const c = 299792458;
  const r1 = fn(0);
  results.push({ pass: r1.beta === 0 && r1.gamma === 1, description: 'stationary: beta=0, gamma=1', got: JSON.stringify(r1) });
  const r2 = fn(0.5 * c);
  results.push({ pass: r2.beta === 0.5, description: 'beta at 0.5c equals 0.5', got: String(r2.beta) });
  results.push({ pass: r2.gamma === 1.1547, description: 'gamma at 0.5c ≈ 1.1547', got: String(r2.gamma) });
  results.push({ pass: r2.lengthContraction === 0.866, description: 'length contraction at 0.5c ≈ 0.866m', got: String(r2.lengthContraction) });
  const r3 = fn(0.9 * c);
  results.push({ pass: r3.gamma === 2.2942, description: 'gamma at 0.9c ≈ 2.2942', got: String(r3.gamma) });
  results.push({ pass: r3.relativisticKE > 0, description: 'relativistic KE is positive', got: String(r3.relativisticKE) });
  return results;
}`,
  testCases: [],
  hints: [
    "Compute beta = v/c, then gamma = 1/√(1 - β²). Time dilation and length contraction are direct applications of gamma.",
    "Use `c = 299792458`. Relativistic kinetic energy = (γ-1)×m₀×c² — for m₀=1kg this is (γ-1)×c²."
  ],
  resources: [
    { label: "MDN: Math.sqrt()", url: "/docs/mdn/math-sqrt.html" }
  ],
  solutionGate: 10,
  basePoints: 75
});

// ─── T4-3: Thermodynamics ───────────────────────────────────────────────────
exercises.push({
  id: id(),
  title: "Physics: Ideal Gas Law",
  type: "js",
  tier: 4,
  category: ["science", "physics"],
  tags: ["science", "physics", "thermodynamics", "ideal-gas"],
  description: "Solve ideal gas law problems and calculate thermodynamic work.",
  instructions: "Write a function called `idealGas` that takes an object with three of the four properties: `pressure` (Pa), `volume` (m³), `moles`, `temperature` (K), and returns the missing value.\n\nUse PV = nRT where R = 8.314 J/(mol⋅K).\n\nAlso write `gasWork` that takes `pressure` (Pa), `v1` (initial volume, m³), and `v2` (final volume, m³) and returns the work done during isobaric (constant pressure) expansion: W = P × (V₂ - V₁).\n\nAll values rounded to 2 decimal places.\n\nExample:\n```\nidealGas({ pressure: 101325, volume: 0.0224, moles: 1 })\n// Returns: { temperature: 273.06 }\n```",
  starterCode: "",
  solution: "function idealGas({ pressure, volume, moles, temperature }) {\n  const R = 8.314;\n  const r2 = v => Math.round(v * 100) / 100;\n  if (pressure === undefined) return { pressure: r2(moles * R * temperature / volume) };\n  if (volume === undefined) return { volume: r2(moles * R * temperature / pressure) };\n  if (moles === undefined) return { moles: r2(pressure * volume / (R * temperature)) };\n  return { temperature: r2(pressure * volume / (moles * R)) };\n}\n\nfunction gasWork(pressure, v1, v2) {\n  return Math.round(pressure * (v2 - v1) * 100) / 100;\n}",
  testRunner: `(code) => {
  const fn = new Function(code + '; return { idealGas, gasWork };')();
  const eq = (a, b) => JSON.stringify(a) === JSON.stringify(b);
  const results = [];
  const r1 = fn.idealGas({ pressure: 101325, volume: 0.0224, moles: 1 });
  results.push({ pass: Math.abs(r1.temperature - 273.06) < 0.5, description: 'temperature at STP ≈ 273K', got: String(r1.temperature) });
  results.push({ pass: eq(fn.idealGas({ volume: 0.01, moles: 1, temperature: 300 }), { pressure: 249420 }), description: 'compute pressure', got: JSON.stringify(fn.idealGas({ volume: 0.01, moles: 1, temperature: 300 })) });
  const r3 = fn.idealGas({ pressure: 100000, moles: 2, temperature: 300 });
  results.push({ pass: r3.volume === 0.05, description: 'compute volume', got: String(r3.volume) });
  const r4 = fn.idealGas({ pressure: 100000, volume: 0.025, temperature: 300 });
  results.push({ pass: r4.moles === 1, description: 'compute moles', got: String(r4.moles) });
  results.push({ pass: fn.gasWork(100000, 0.01, 0.02) === 1000, description: 'isobaric work = P×ΔV', got: String(fn.gasWork(100000, 0.01, 0.02)) });
  results.push({ pass: fn.gasWork(200000, 0.05, 0.03) === -4000, description: 'compression gives negative work', got: String(fn.gasWork(200000, 0.05, 0.03)) });
  return results;
}`,
  testCases: [],
  hints: [
    "Use PV = nRT with R = 8.314. Check which value is `undefined` and solve for it algebraically.",
    "If pressure is missing: P = nRT/V. If volume: V = nRT/P. If moles: n = PV/(RT). If temperature: T = PV/(nR)."
  ],
  resources: [
    { label: "MDN: undefined", url: "/docs/mdn/undefined.html" }
  ],
  solutionGate: 10,
  basePoints: 75
});

// ─── T4-4: Pendulum Simulation ──────────────────────────────────────────────
exercises.push({
  id: id(),
  title: "Physics: Pendulum Simulation",
  type: "js",
  tier: 4,
  category: ["science", "physics"],
  tags: ["science", "physics", "pendulum", "numerical-methods"],
  description: "Simulate a simple pendulum using numerical integration (Euler method).",
  instructions: "Write a function called `pendulum` that simulates a simple pendulum using the Euler method.\n\nParameters: `length` (m), `angleDeg` (initial angle in degrees), `dt` (time step, s), `steps` (number of steps).\n\nReturns an array of objects, one per step, each with:\n- `time`: current time (rounded to 4 decimal places)\n- `angle`: angle in degrees (rounded to 2 decimal places)\n- `angularVelocity`: ω in rad/s (rounded to 4 decimal places)\n\nEquations (g = 9.8):\n- α = -(g/L) × sin(θ)  (angular acceleration)\n- ω_new = ω + α × dt\n- θ_new = θ + ω_new × dt\n\nStart with ω = 0. Include step 0 (initial state).\n\nExample:\n```\npendulum(1, 10, 0.01, 2)\n// Returns array of 3 states (step 0, 1, 2)\n```",
  starterCode: "",
  solution: "function pendulum(length, angleDeg, dt, steps) {\n  const g = 9.8;\n  let theta = angleDeg * Math.PI / 180;\n  let omega = 0;\n  const result = [];\n  for (let i = 0; i <= steps; i++) {\n    result.push({\n      time: Math.round(i * dt * 10000) / 10000,\n      angle: Math.round(theta * 180 / Math.PI * 100) / 100,\n      angularVelocity: Math.round(omega * 10000) / 10000\n    });\n    const alpha = -(g / length) * Math.sin(theta);\n    omega = omega + alpha * dt;\n    theta = theta + omega * dt;\n  }\n  return result;\n}",
  testRunner: `(code) => {
  const fn = new Function(code + '; return pendulum;')();
  const results = [];
  const r1 = fn(1, 10, 0.01, 5);
  results.push({ pass: r1.length === 6, description: 'returns steps+1 states (including initial)', got: String(r1.length) });
  results.push({ pass: r1[0].time === 0 && r1[0].angle === 10 && r1[0].angularVelocity === 0, description: 'initial state correct', got: JSON.stringify(r1[0]) });
  results.push({ pass: r1[1].time === 0.01, description: 'second state at t=0.01', got: String(r1[1].time) });
  results.push({ pass: Math.abs(r1[1].angle) < 10, description: 'angle decreases from initial', got: String(r1[1].angle) });
  // Longer simulation
  const r2 = fn(1, 45, 0.01, 100);
  results.push({ pass: r2.length === 101, description: '100 steps gives 101 states', got: String(r2.length) });
  results.push({ pass: r2[100].time === 1, description: 'final time is 1s', got: String(r2[100].time) });
  // Small angle should oscillate
  const r3 = fn(1, 5, 0.001, 1000);
  results.push({ pass: r3[0].angle === 5 && Math.abs(r3[500].angle) < 5, description: 'pendulum oscillates', got: r3[0].angle + ' then ' + r3[500].angle });
  return results;
}`,
  testCases: [],
  hints: [
    "Convert the initial angle to radians. At each step compute angular acceleration α = -(g/L)×sin(θ), update ω and θ using Euler's method.",
    "Loop from 0 to steps (inclusive). Record the state BEFORE updating. Use α×dt to update ω, then ω×dt to update θ."
  ],
  resources: [
    { label: "MDN: Math.sin()", url: "/docs/mdn/math-sin.html" }
  ],
  solutionGate: 10,
  basePoints: 75
});

// ─── T5-1: Physics Simulator ────────────────────────────────────────────────
exercises.push({
  id: id(),
  title: "Physics: Multi-Body Gravity Simulator",
  type: "js",
  tier: 5,
  category: ["science", "physics"],
  tags: ["science", "physics", "simulation", "gravity", "numerical-methods"],
  description: "Simulate gravitational interactions between multiple bodies using numerical integration.",
  instructions: "Write a function called `gravitySimulator` that takes:\n- `bodies`: array of `{ mass, x, y, vx, vy }` objects\n- `dt`: time step (s)\n- `steps`: number of simulation steps\n- `G`: gravitational constant (default 1 for simplified units)\n\nReturn an array of snapshots, one per step (including initial state). Each snapshot is an array of `{ x, y, vx, vy }` objects (rounded to 4 decimal places).\n\nAlgorithm (Euler method):\n1. For each body, compute gravitational force from all other bodies\n2. F = G × m₁ × m₂ / r² (direction toward other body)\n3. Update velocities: v += (F/m) × dt\n4. Update positions: pos += v × dt\n\nExample:\n```\ngravitySimulator(\n  [{ mass: 1000, x: 0, y: 0, vx: 0, vy: 0 }, { mass: 1, x: 10, y: 0, vx: 0, vy: 10 }],\n  0.01, 2\n)\n// Returns 3 snapshots showing orbital motion\n```",
  starterCode: "",
  solution: `function gravitySimulator(bodies, dt, steps, G = 1) {
  let state = bodies.map(b => ({ mass: b.mass, x: b.x, y: b.y, vx: b.vx, vy: b.vy }));
  const r4 = v => Math.round(v * 10000) / 10000;
  const snapshots = [];

  for (let s = 0; s <= steps; s++) {
    snapshots.push(state.map(b => ({ x: r4(b.x), y: r4(b.y), vx: r4(b.vx), vy: r4(b.vy) })));
    if (s === steps) break;

    // Compute forces
    const forces = state.map(() => ({ fx: 0, fy: 0 }));
    for (let i = 0; i < state.length; i++) {
      for (let j = i + 1; j < state.length; j++) {
        const dx = state[j].x - state[i].x;
        const dy = state[j].y - state[i].y;
        const rSq = dx * dx + dy * dy;
        const r = Math.sqrt(rSq);
        if (r < 0.001) continue;
        const F = G * state[i].mass * state[j].mass / rSq;
        const fx = F * dx / r;
        const fy = F * dy / r;
        forces[i].fx += fx;
        forces[i].fy += fy;
        forces[j].fx -= fx;
        forces[j].fy -= fy;
      }
    }

    // Update velocities and positions
    state = state.map((b, i) => ({
      mass: b.mass,
      x: b.x + (b.vx + forces[i].fx / b.mass * dt) * dt,
      y: b.y + (b.vy + forces[i].fy / b.mass * dt) * dt,
      vx: b.vx + forces[i].fx / b.mass * dt,
      vy: b.vy + forces[i].fy / b.mass * dt
    }));
  }

  return snapshots;
}`,
  testRunner: `(code) => {
  const fn = new Function(code + '; return gravitySimulator;')();
  const results = [];
  const bodies = [
    { mass: 1000, x: 0, y: 0, vx: 0, vy: 0 },
    { mass: 1, x: 10, y: 0, vx: 0, vy: 10 }
  ];
  const r1 = fn(bodies, 0.01, 5);
  results.push({ pass: r1.length === 6, description: '5 steps gives 6 snapshots', got: String(r1.length) });
  results.push({ pass: r1[0][0].x === 0 && r1[0][0].y === 0, description: 'initial position of body 1', got: JSON.stringify(r1[0][0]) });
  results.push({ pass: r1[0][1].x === 10 && r1[0][1].vy === 10, description: 'initial state of body 2', got: JSON.stringify(r1[0][1]) });
  results.push({ pass: r1[1][1].y > 0, description: 'body 2 moves in y direction', got: String(r1[1][1].y) });
  // Conservation check: heavy body barely moves
  results.push({ pass: Math.abs(r1[5][0].x) < 0.01, description: 'massive body barely moves', got: String(r1[5][0].x) });

  // Single body should not move without forces
  const r2 = fn([{ mass: 1, x: 5, y: 5, vx: 1, vy: 0 }], 1, 3);
  results.push({ pass: r2[3][0].x === 8 && r2[3][0].y === 5, description: 'single body moves at constant velocity', got: JSON.stringify(r2[3][0]) });

  // Three bodies
  const r3 = fn([
    { mass: 100, x: 0, y: 0, vx: 0, vy: 0 },
    { mass: 100, x: 10, y: 0, vx: 0, vy: 0 },
    { mass: 1, x: 5, y: 5, vx: 0, vy: 0 }
  ], 0.01, 3);
  results.push({ pass: r3[0].length === 3, description: 'three bodies in snapshot', got: String(r3[0].length) });
  return results;
}`,
  testCases: [],
  hints: [
    "For each pair of bodies, compute the gravitational force vector (magnitude and direction). Accumulate forces, then update velocities and positions.",
    "Use Newton's third law: the force on body i from body j is equal and opposite to the force on j from i. Direction: `dx/r` and `dy/r` give the unit vector."
  ],
  resources: [
    { label: "MDN: Math.sqrt()", url: "/docs/mdn/math-sqrt.html" },
    { label: "MDN: Array.prototype.map()", url: "/docs/mdn/array-map.html" }
  ],
  solutionGate: 10,
  basePoints: 100
});

// ── append to collection ────────────────────────────────────────────────────

collection.exercises.push(...exercises);
fs.writeFileSync(COLLECTION_FILE, JSON.stringify(collection, null, 2));
console.log(`✅ Section 5: Physics — ${exercises.length} exercises appended (IDs ${exercises[0].id}-${exercises[exercises.length - 1].id})`);
console.log(`   Collection total: ${collection.exercises.length} exercises`);
