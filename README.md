# Commander Interface

A React + Vite interface for monitoring and controlling antenna pass operations.

## Quick Start

```bash
npm install
npm run dev
```

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run test` - Run tests (Vitest)

## Notes

- The app is currently structured around a single commander flow.
- UI uses mock antenna/pass data for behavior and display states.

## Architecture

- Feature-first structure under `src/features` (`commander`, `passes`, `cortex`, `activityLog`, `control`, `actions`, `offsets`, `signal`, `tracking`, `ui`)
- Each feature owns its own `components`, `hooks`, `api`, and `types` where relevant
- Mock data is colocated per feature in `api/mock` and consumed through `*MockApi.ts` adapters
- Shared cross-feature building blocks live in `src/shared` (for example `shared/api`, `shared/hooks`, `shared/components`)
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
    activityLog/
      api/
      hooks/
      ActivityLogPanel.tsx
      activityLogBus.ts
    control/
      api/
      components/
      hooks/
    actions/
      api/
      components/
      hooks/
    offsets/
      api/
      hooks/
    signal/
      components/
      types.ts
    tracking/
      components/
      types.ts
    ui/
      hooks/
  shared/
    api/
    components/
    hooks/
    utils/
```
