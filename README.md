# Commander Interface

A React + Vite interface.

## Quick Start

```bash
npm install
npm run dev
```

## Quality Gate

```bash
npm run typecheck && npm run lint && npm run test && npm run build
```

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run test` - Run tests (Vitest)
- `npm run typecheck` - Run strict TypeScript checks (`tsc --noEmit`)

## Notes

- The app is currently structured around a single commander flow.
- UI uses mock antenna/pass data for behavior and display states.
- Backend migration guide: `docs/backend-integration-playbook.md`
- Core DTO boundaries currently validate runtime payloads with `zod` in feature contracts/mappers.
- Feature APIs are wired into hooks/components for activity log, actions, and control flows.
- `CommanderLayout` is wrapped by an error boundary for safe fallback rendering.

## Architecture

- Feature-first structure under `src/features` (`commander`, `passes`, `cortex`, `activityLog`, `control`, `actions`, `offsets`, `signal`, `tracking`, `ui`)
- Each feature owns its own `components`, `hooks`, `api`, and `types` where relevant
- Mock data is colocated per feature in `api/mock` and accessed through feature API adapters (`*Api.ts` / `*MockApi.ts`)
- Shared cross-feature building blocks live in `src/shared` (currently `shared/components`)
- App shell concerns only live in `src/app` (`App`, layout, providers)

### Current high-level layout

```text
src/
  app/
    App.tsx
    layout/
    providers/
  features/
    commander/
      api/
      components/
      hooks/
      types.ts
    passes/
      api/
      components/
      hooks/
      types.ts
    cortex/
      api/
      hooks/
      types.ts
    activityLog/
      api/
      hooks/
      ActivityLogPanel.tsx
      activityLogBus.ts
      types.ts
    control/
      api/
      components/
      hooks/
      types.ts
    actions/
      api/
      components/
      hooks/
      types.ts
    offsets/
      api/
      hooks/
      types.ts
    signal/
      components/
      types.ts
    tracking/
      components/
      types.ts
    ui/
      hooks/
  shared/
    components/
```

### Route / module boundary plan

- Keep `src/app` as shell only (providers, layout, routes).
- Add new user-facing screens as route-level feature entries under `features/<feature>/components`.
- Keep all backend calls behind feature API adapters (`contracts.ts`, `mappers.ts`, `*Api.ts`).
- Avoid cross-feature component imports unless they are truly shared; move shared UI to `src/shared/components`.
