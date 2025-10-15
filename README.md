## Requirements

- **Node.js**: v20.19.0
- **pnpm**: Dependency manager (handled by Corepack)

## Setup

### Using Node Version Manager (nvm)

If you are using `nvm` to manage Node versions, run the following command to switch to the correct version:

```bash
nvm use
```

Enable Corepack
To ensure you can use pnpm without manually installing it, enable Corepack by running:

```bash
corepack enable
```

### Quick start
- Install: `pnpm install`
- Dev: `pnpm dev` (should open automatically)
- Build: `pnpm build`
- Preview build: `pnpm preview`
- Lint/format: `pnpm lint`, `pnpm format`

### Tech stack
- React 19, TypeScript, Vite 7
- Tailwind CSS v4, Radix UI primitives, Lucide icons
- TanStack Table + react‑virtuoso
- Zustand store for app state (for the actual setup it is not really necessary, we could have handled that api call in src/components/DatasetContainer.tsx directly)
- MSW (Mock Service Worker) for API

### Features
- Multi‑level tree rows with expand/collapse all
- Virtualized rendering for large datasets
- Sortable columns and compact number/currency formatting
- Pinned columns and sticky header
- Theme toggle (light/dark/system)

### Architecture (high‑level)
- Entry: `src/main.tsx` (starts MSW) → `src/App.tsx`
- Data: `src/services/api/stealth/{types,utils,queries}.ts` (+ `src/mocks/{handlers,data.json}`)
- State: `src/store/stealthStore.ts` (loads datasets via `fetchTableData`)
- Table: `src/components/table/*`
- UI: `src/components/ui/*`
- Columns: `src/utils/constants/stealthDatasetColumns.ts`

### Notes
- Mock API is auto‑started
- Path alias `@/*` maps to `src/*`.
