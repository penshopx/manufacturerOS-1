# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Artifacts

- **ManufactureOS** (`artifacts/manufacture-os/`) — Main web app (React + Vite), served at `/`
  - Agentic AI platform for Indonesian manufacturing (IKM Otomotif Tier 2)
  - Dark slate theme with teal/emerald accents
  - IBM Plex Sans/Mono fonts
  - 40+ pages covering: dashboard, AI agents, production, quality, maintenance, HSE, purchasing, etc.
  - No backend API (all static demo data)
  - Routing via wouter

- **API Server** (`artifacts/api-server/`) — Express backend, served at `/api`

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.
