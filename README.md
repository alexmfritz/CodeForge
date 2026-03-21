# CodeForge

An offline-first JavaScript coding exercise platform designed for incarcerated students in DOC (Department of Corrections) classroom environments. CodeForge provides a complete learning management system with 1,314 interactive exercises, real-time collaboration, progress tracking, and instructor analytics — all running entirely on a local network with zero external dependencies.

## Why Offline-First?

DOC facilities operate without internet access. Every dependency — from npm packages to fonts — is pre-cached in a local Verdaccio registry. There are no CDN calls, no external APIs, and no cloud services. The entire platform runs on a single classroom server connected to student workstations over a local network.

## Architecture

**Monorepo** with three npm workspaces sharing a single TypeScript type system:

```
CodeForge/
├── shared/          # Types, Zod validation schemas, constants
├── server/          # Express + MongoDB + Socket.IO
├── client/          # React + Vite + Redux Toolkit + Tailwind CSS
├── exercises/       # JSON exercise collections (1,314 exercises)
└── e2e/             # Playwright end-to-end tests
```

| Layer | Stack |
|-------|-------|
| **Frontend** | React 18, Vite, TypeScript, Redux Toolkit, Tailwind CSS, CodeMirror 6 |
| **Backend** | Express, MongoDB (Mongoose), JWT auth, Zod validation, Socket.IO |
| **Shared** | TypeScript interfaces, Zod schemas, scoring/gating constants |
| **Real-time** | Socket.IO (WebSocket) with JWT-authenticated connections |
| **Testing** | Vitest (275 unit/integration), Playwright (10 e2e) |

## Features

### Exercise Engine
- **Four exercise types**: JavaScript, HTML, CSS, and HTML+CSS
- **Five difficulty tiers**: Spark (I) → Foundations (II) → Builder (III) → Architect (IV) → Innovator (V)
- **In-browser test execution**: Web Workers for JS exercises, sandboxed iframes for HTML/CSS
- **CodeMirror 6 editor** with syntax highlighting, autocompletion, and theme integration
- **Progressive hint system**: Hints unlock after 3 and 6 unique attempts; solution unlocks after 10
- **Scoring system**: Points based on tier difficulty, attempt count, and whether the solution was viewed
- **Exercise collections**: Default curriculum (808 exercises) plus 8 themed collections (506 exercises)

### Curriculum

The default curriculum is aligned to the Edmonds College CIS 241-246 Web Application Developer Certificate:

| Module | Exercises |
|--------|-----------|
| HTML & CSS Fundamentals | 255 |
| JavaScript T1 (Spark) | 92 |
| JavaScript T2 (Foundations) | 161 |
| JavaScript T3 (Builder) | 151 |
| JavaScript T4 (Architect) | 68 |
| JavaScript T5 (Innovator) | 16 |
| HTML+CSS Integration | 65 |

**Themed Collections** for supplementary practice:

| Collection | Exercises | Description |
|------------|-----------|-------------|
| Turing Foundations | 64 | Core JS drills |
| Exercism | 52 | Classic programming challenges |
| Rithm Interview Prep | 45 | Interview-style problems |
| The Odin Project | 29 | JS + CSS exercises |
| RPG Questline | 45 | RPG-themed progression |
| Pop Culture APIs | 153 | Dataset-driven exercises |
| Hard Math & Science | 98 | STEM-focused challenges |
| Mini-Games | 20 | Logic-only game engines |

### Student Dashboard
- Overall progress percentage with completion bar
- Tier-by-tier and type-by-type breakdowns with scores
- Collection progress tracking across all 9 collections
- GitHub-style activity heatmap
- Recent activity feed with exercise details and scores
- Assignment list with due dates and completion status
- Achievement showcase with 44 earnable badges

### Instructor Dashboard
- **Overview**: Total students, completion rates, average scores, cohort summary table
- **Students**: Full roster with search, active/inactive status, individual progress drill-down
- **Cohorts**: Create and manage student cohorts with date ranges
- **Assignments**: Create, edit, duplicate, archive — track per-student completion
- **Exercise Difficulty**: Completion rates, average attempts, hint/solution usage, abandon rates
- **Cohort Heatmap**: Student x Exercise grid (green/yellow/gray) with pagination and filters
- **Engagement Timeline**: Daily activity bar chart, at-risk student detection (3+ days inactive)
- **Exercise Management**: Full exercise creation wizard with live preview and test authoring
- **Ratings**: Aggregate star rating analytics per exercise
- **Chat Logs**: Browse and manage archived daily chat logs per cohort
- **User Management**: Create accounts, CSV bulk import, role assignment

### Achievement System
- 44 achievement definitions across 6 categories: Milestones, Tier Mastery, Type Breadth, Quality & Skill, Dedication, Exploration
- Criteria-based evaluation (exercises completed, tiers cleared, perfect scores, streaks, etc.)
- Real-time toast notifications when achievements are earned
- Achievement grid display on student dashboard with progress bars

### Rating System
- Per-exercise 1-5 star ratings from students
- Aggregate rating analytics for instructors
- Ratings inform curriculum quality feedback

### Real-Time Cohort Chat
- **Per-cohort chat rooms** with Socket.IO WebSocket connections
- **JWT-authenticated sockets** using the same auth tokens as REST API
- **iMessage-style UI**: Own messages right-aligned (accent), others left-aligned (surface)
- **Rich message types**: Plain text, exercise link cards (clickable), code snippet blocks (syntax-highlighted)
- **@Mentions**: Autocomplete from active users, highlighted in messages, toast notifications
- **Emoji reactions**: Thumbs-up, lightbulb, and checkmark toggleable reactions
- **Message pinning**: Instructors can pin one message per day as a banner
- **Typing indicators**: Real-time "user is typing..." display
- **Active user sidebar**: Live presence tracking
- **Chat lobby**: Guidelines display and active user preview before entering
- **Rotating norms banner**: Chat guidelines cycle every 90 seconds in the room
- **Daily archival**: On server startup, previous-day messages are archived to `ChatLog` documents and originals deleted (timezone-aware)
- **Unread badge**: Chat nav link shows unread count when away from the room

### Leaderboard
- Per-cohort and cross-cohort rankings
- Time-period filters: This Week, This Month, All Time
- Streak tracking (consecutive exercises without viewing solution)
- Tier breakdown badges per student
- Recent Highlights feed (achievements, perfect scores, milestones)
- Opt-in privacy (students choose to appear via Settings)

### Theming
Eight built-in themes with CSS variable-based switching:
- Midnight (default), Daylight, High Contrast, Monokai, Solarized Dark, Solarized Light, Nord, Dracula

### Security & Roles
- **Three roles**: Instructor, TA, Student
- **JWT authentication** with role-based middleware (`authenticate`, `authorize`)
- **Zod validation** on all API inputs (shared between client and server)
- **Role-gated UI**: Instructor/TA features hidden at the component level
- **Rate limiting**: Separate auth and API rate limits (relaxed in dev)
- **ENV validation**: JWT_SECRET, JWT_EXPIRES_IN, TIMEZONE, and ports validated on startup

## API Routes

| Route | Description |
|-------|-------------|
| `GET /api/health` | Health check |
| `/api/auth` | Login, token verification |
| `/api/users` | User CRUD, bulk CSV import |
| `/api/cohorts` | Cohort management |
| `/api/exercises` | Exercise CRUD, search, filtering |
| `/api/progress` | Track attempts, save code, mark complete, reset |
| `/api/instructor` | Class overview, student analytics, heatmap, engagement |
| `/api/assignments` | Assignment CRUD, progress tracking |
| `/api/achievements` | Definitions, earned achievements |
| `/api/ratings` | Submit and fetch ratings |
| `/api/chat` | Archived chat log management |
| `/api/leaderboard` | Rankings, highlights |
| `/api/reviews` | Spaced repetition review queue |

**Socket.IO events**: `chat:join`, `chat:leave`, `chat:send-message`, `chat:typing`, `chat:pin`, `chat:unpin`, `chat:react`, `chat:get-active-users`

## Data Models

| Model | Purpose |
|-------|---------|
| `User` | Authentication, roles, cohort assignment, preferences |
| `Cohort` | Student grouping with date ranges and active status |
| `Exercise` | Curriculum content with tests, hints, resources |
| `Collection` | Organized exercise groupings with metadata |
| `Progress` | Per-student-per-exercise tracking (code, attempts, score, time) |
| `Assignment` | Instructor-created exercise bundles with due dates |
| `AchievementDefinition` | Criteria templates for 44 achievements |
| `AchievementInstance` | Earned achievement records with timestamps |
| `Rating` | Per-exercise star ratings |
| `Review` | Spaced repetition review queue entries |
| `ChatMessage` | Live chat messages (date-partitioned, timezone-aware) |
| `ChatLog` | Archived daily chat logs (denormalized for performance) |

## Client State Management

Redux Toolkit with feature slices: `auth`, `ui`, `exercises`, `progress`, `dashboard`, `instructor`, `assignments`, `achievements`, `ratings`, `chat`

## Development

### Prerequisites
- Node.js >= 20
- MongoDB running locally
- Verdaccio (for offline npm registry in production deployment)

### Setup

```bash
git clone https://github.com/alexmfritz/CodeForge.git
cd CodeForge
cp .env.example .env       # Configure environment variables
npm install                 # Install all workspace deps
npm run dev                 # Start client (:5173) + server (:3001)
```

### Commands

```bash
npm run dev              # Start client + server concurrently
npm run dev:client       # Client only (Vite :5173)
npm run dev:server       # Server only (Express :3001)
npm run build            # Production build (shared → server → client)
npm start                # Start production server
npm run test             # Run all tests (275 total)
npm run test:e2e         # Run Playwright e2e tests (10 tests)
npm run seed:reset       # Drop database and re-seed with dev data
npm run lint             # Lint all workspaces
```

### Environment Variables

Copy `.env.example` to `.env`:

| Variable | Default | Description |
|----------|---------|-------------|
| `PORT` | `3000` | Production server port |
| `VITE_API_PORT` | `3001` | Dev server API port |
| `MONGODB_URI` | `mongodb://localhost:27017/codeforge` | MongoDB connection string |
| `JWT_SECRET` | — | **Required in production** |
| `JWT_EXPIRES_IN` | `24h` | Token expiry (format: `\d+[smhd]`) |
| `TIMEZONE` | `America/Los_Angeles` | IANA timezone for chat date partitioning |
| `INSTRUCTOR_NAME` | `Admin User` | Initial instructor account name |
| `INSTRUCTOR_DOC_NUMBER` | `000000` | Instructor login password |
| `TA_NAME` | — | Optional TA account name |
| `TA_DOC_NUMBER` | — | TA login password |

### Dev Seed Data

Running `npm run seed:reset` drops the database and seeds deterministic demo data:

- **4 cohorts**: Morning 2025 Q3, Afternoon 2025 Q4, Morning 2026 Q1 (active), Staff
- **55 students** across 3 cohorts with 5 hero students in Q1:
  - Jane Smith — growth story (struggles early, breakthrough later)
  - Marcus Johnson — star (85% completion, always first attempt)
  - Priya Patel — explorer (default curriculum + RPG, Pop Culture, Mini-Games collections)
  - Tyler Brown — at-risk (active first 3 weeks, then 10+ days silent)
  - Sofia Rodriguez — perfectionist (fewer exercises, all perfect scores)
- **2 TA accounts** with all 1,314 exercises completed and solution code loaded:
  - Matthew Wellington (`mwellington` / `password`)
  - Alex Fritz (`afritz` / `password`)
- **~15,800 student progress records** with weekday-only timestamps (M-F, 8am-3pm)
- **~4,300 ratings**, **~1,070 achievements**, **90 archived chat logs**
- **Deterministic PRNG** (mulberry32) — identical data every run
- All dev student passwords: `password`

### Testing

| Suite | Tests | Framework |
|-------|-------|-----------|
| Server unit/integration | 155 | Vitest |
| Client unit | 120 | Vitest |
| End-to-end | 10 | Playwright |
| **Total** | **285** | |

### Conventions
- CSS variables for all theming (class on `<html>` element)
- Zod schemas in `shared/validation/` validate both client and server
- Types in `shared/types/` are the single source of truth
- Exercise tests: Web Workers (JS), sandboxed iframes (HTML/CSS)
- JWT stored in localStorage, attached via fetch wrapper in `client/src/utils/api.ts`
- Exercises seeded from JSON files in `exercises/collections/` on startup
- Socket.IO connections authenticated with the same JWT used for REST
- Database indexes optimized for progress queries (compound indexes on userId+status+completedAt, cohortId+status)

## Project Stats

| | Files | Lines of Code |
|---|---|---|
| **Server** | 62 | ~8,900 |
| **Client** | 115 | ~15,600 |
| **Shared** | 6 | ~1,600 |
| **E2E Tests** | 3 | ~140 |
| **Exercises** | 9 collections | ~61,700 (JSON) |
| **Total Source** | 186 | ~26,240 |
