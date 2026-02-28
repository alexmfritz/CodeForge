# CodeForge

An offline-first JavaScript coding exercise platform designed for incarcerated students in DOC (Department of Corrections) classroom environments. CodeForge provides a complete learning management system with interactive exercises, real-time collaboration, progress tracking, and instructor analytics — all running entirely on a local network with zero external dependencies.

## Why Offline-First?

DOC facilities operate without internet access. Every dependency — from npm packages to fonts — is pre-cached in a local Verdaccio registry. There are no CDN calls, no external APIs, and no cloud services. The entire platform runs on a single classroom server.

## Architecture

**Monorepo** with three npm workspaces sharing a single TypeScript type system:

```
CodeForge/
├── shared/          # Types, Zod validation schemas, constants
├── server/          # Express + MongoDB + Socket.IO
├── client/          # React + Vite + Redux Toolkit + Tailwind CSS
└── exercises/       # JSON exercise collections (curriculum content)
```

| Layer | Stack |
|-------|-------|
| **Frontend** | React 18, Vite, TypeScript, Redux Toolkit, Tailwind CSS, CodeMirror 6 |
| **Backend** | Express, MongoDB (Mongoose), JWT auth, Zod validation, Socket.IO |
| **Shared** | TypeScript interfaces, Zod schemas, scoring/gating constants |
| **Real-time** | Socket.IO (WebSocket) with JWT-authenticated connections |

## Features

### Exercise Engine
- **Four exercise types**: JavaScript, HTML, CSS, and HTML+CSS
- **Five difficulty tiers**: Spark (I) → Foundations (II) → Builder (III) → Architect (IV) → Mastercraft (V)
- **In-browser test execution**: Web Workers for JS exercises, sandboxed iframes for HTML/CSS
- **CodeMirror 6 editor** with syntax highlighting, autocompletion, and theme integration
- **Progressive hint system**: Hints unlock after 3, 6, and 9 unique attempts; solution unlocks after 10
- **Scoring system**: Points based on tier difficulty, attempt count, and whether the solution was viewed
- **Exercise collections**: Organized by topic and category with nested navigation

### Student Dashboard
- Overall progress bar with completion percentage
- Tier-by-tier and type-by-type breakdowns
- Collection progress tracking
- Recent activity feed
- Assignment list with due dates and completion status

### Instructor Dashboard
- **Class overview**: Completion rates, active students, average scores, heatmap data
- **Student management**: Individual student progress views, user creation, CSV bulk import
- **Cohort management**: Create and manage student cohorts with active/inactive status
- **Exercise management**: Full exercise creation wizard with live preview and test authoring
- **Assignment system**: Create assignments linking specific exercises to cohorts or individual students, track progress
- **Chat log archives**: View and manage archived daily chat logs per cohort

### Achievement System
- Criteria-based achievement definitions (exercises completed, tiers cleared, perfect scores, streaks, etc.)
- Real-time toast notifications when achievements are earned
- Achievement grid display on student dashboard

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
- **Chat lobby**: Disclaimer and norms display before entering, active user preview
- **Rotating norms banner**: Chat guidelines cycle every 90 seconds in the room
- **Daily archival**: On server startup, previous-day messages are archived to `ChatLog` documents and originals deleted
- **Unread badge**: Chat nav link shows unread count when away from the room

### Theming
Eight built-in themes with CSS variable-based switching:
- Midnight (default), Daylight, High Contrast, Monokai, Solarized Dark, Solarized Light, Nord, Dracula

### Security & Roles
- **Three roles**: Instructor, TA, Student
- **JWT authentication** with role-based middleware (`authenticate`, `authorize`)
- **Zod validation** on all API inputs (shared between client and server)
- **Role-gated UI**: Instructor-only features hidden at the component level

## API Routes

| Route | Description |
|-------|-------------|
| `GET /api/health` | Health check |
| `/api/auth` | Login, token verification |
| `/api/users` | User CRUD, bulk import |
| `/api/cohorts` | Cohort management |
| `/api/exercises` | Exercise CRUD, search |
| `/api/progress` | Track attempts, save code, mark complete, reset |
| `/api/instructor` | Class overview, student analytics, heatmap |
| `/api/assignments` | Assignment CRUD, progress tracking |
| `/api/achievements` | Definitions, earned achievements |
| `/api/ratings` | Submit and fetch ratings |
| `/api/chat` | Archived chat log management |

**Socket.IO events**: `chat:join`, `chat:leave`, `chat:send-message`, `chat:typing`, `chat:pin`, `chat:unpin`, `chat:react`, `chat:get-active-users`

## Data Models

| Model | Purpose |
|-------|---------|
| `User` | Authentication, roles, cohort assignment, preferences |
| `Cohort` | Student grouping with date ranges |
| `Exercise` | Curriculum content with tests, hints, resources |
| `Collection` | Organized exercise groupings |
| `Progress` | Per-student-per-exercise completion tracking |
| `Assignment` | Instructor-created exercise bundles with due dates |
| `AchievementDefinition` | Criteria templates for achievements |
| `AchievementInstance` | Earned achievement records |
| `Rating` | Per-exercise star ratings |
| `ChatMessage` | Live chat messages (date-partitioned) |
| `ChatLog` | Archived daily chat logs (denormalized) |

## Client State Management

Redux Toolkit with 10 feature slices: `auth`, `ui`, `exercises`, `progress`, `dashboard`, `instructor`, `assignments`, `achievements`, `ratings`, `chat`

## Development

### Prerequisites
- Node.js >= 20
- MongoDB running locally
- Verdaccio (for offline npm registry, production deployment)

### Setup

```bash
npm install          # Install all workspace deps
npm run dev          # Start client (Vite :5173) + server (Express :3001)
npm run dev:client   # Client only
npm run dev:server   # Server only
npm run build        # Production build (shared → server → client)
npm start            # Start production server
npm run test         # Run all tests
npm run lint         # Lint all workspaces
```

### Environment

Copy `.env.example` to `.env` and configure:
- `MONGODB_URI` — MongoDB connection string
- `JWT_SECRET` — Secret for JWT signing
- `PORT` — Server port (default: 3001)

### Conventions
- CSS variables for all theming (class on `<html>` element)
- Zod schemas in `shared/validation/` validate both client and server
- Types in `shared/types/` are the single source of truth
- Exercise tests executed via Web Workers (JS) and sandboxed iframes (HTML/CSS)
- JWT stored in localStorage, attached via fetch wrapper in `client/src/utils/api.ts`
- Exercises seeded from JSON files in `exercises/collections/` into MongoDB on startup
- Socket.IO connections authenticated with the same JWT used for REST

## Project Stats

| | Files | Lines of Code |
|---|---|---|
| **Server** | 44 | ~3,400 |
| **Client** | 94 | ~11,700 |
| **Shared** | 3 | ~680 |
| **Total** | 141 | ~15,800 |

## Development History

| PR | Feature |
|----|---------|
| #1 | Monorepo scaffolding (Vite, Express, Tailwind, MongoDB, shared types) |
| #2 | JWT authentication, user management, cohort system |
| #4 | Exercise engine with browse UI, test runners, progress tracking |
| #6 | Student dashboard with stats and breakdowns |
| #8 | Instructor dashboard with student management and analytics |
| #10 | Assignment system with CRUD and progress tracking |
| #12 | Achievement system with definitions, evaluation, and toasts |
| #14 | Per-exercise student rating system |
| #16 | Exercise creation wizard for instructors |
| #18 | Interactive dashboard with progress bar and filtering |
| #19 | Tabbed dashboard layout and chat nav placeholder |
| #20 | Mock assignment seed data |
| #21 | Assignment management enhancements |
| #22 | Real-time per-cohort chat with Socket.IO |
