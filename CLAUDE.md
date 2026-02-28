# CodeForge

Offline-first JavaScript coding exercise platform for incarcerated students in DOC classroom environments.

## Architecture

- **Monorepo** with npm workspaces: `shared/`, `server/`, `client/`
- **Frontend**: React 18 + Vite + TypeScript + Redux Toolkit + Tailwind CSS + CodeMirror 6
- **Backend**: Express + MongoDB (Mongoose) + JWT auth + Zod validation
- **Offline-first**: All deps pre-cached in Verdaccio. No external API calls, CDN resources, or cloud dependencies.

## Development

```bash
npm install          # Install all workspace deps
npm run dev          # Start client (Vite :5173) + server (Express :3001)
npm run dev:client   # Client only
npm run dev:server   # Server only
npm run test         # Run all tests
npm run build        # Production build
npm start            # Start production server
```

## Environment

Copy `.env.example` to `.env` and configure. MongoDB must be running locally.

## Key Conventions

- CSS variables for theming (8 themes, class on `<html>`)
- Zod schemas in `shared/validation/` validate both client and server
- Types in `shared/types/` are the single source of truth
- Exercise test execution: Web Workers (JS), iframes (HTML/CSS)
- JWT in localStorage, attached via fetch wrapper in `client/src/utils/api.ts`
- Exercises seeded from JSON files in `exercises/collections/` into MongoDB on startup
