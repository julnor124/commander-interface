# Backend Integration Playbook

This project is organized so backend integration happens in feature API layers, not in UI components.

## Core Rule

- Keep components and hooks on **domain types**.
- Convert backend payloads (DTOs) inside `api/mappers.ts`.
- Define request/response contracts in `api/contracts.ts`.

## Per-feature migration checklist

For each feature (`commander`, `passes`, `activityLog`, `control`, `actions`, `offsets`, `cortex`):

1. Replace mock data source in feature API adapters (`*Api.ts` / `*MockApi.ts`) with real HTTP requests.
2. Keep existing exported API function names where possible.
3. Parse backend response with schema validators in `contracts.ts`.
4. Map DTOs to domain models in `mappers.ts`.
5. Return domain models only to hooks/components.
6. Handle loading/error states in feature hook or layout boundary.

## Current status

- DTO contracts + mappers are in place for core features.
- Runtime DTO validation (`zod`) is active in key mapper paths.
- UI/runtime calls are routed through feature APIs for activity log, actions, and control.
- Commander layout already uses an error boundary fallback.

## Example flow

1. `contracts.ts` defines `GetPassScheduleResponseDto`.
2. API call fetches JSON from backend endpoint.
3. Mapper validates/parses DTO and returns `Record<string, PassWindow>`.
4. `usePassSchedule` continues unchanged.

## Error handling baseline

- Throw typed errors from API functions.
- Show one user-safe fallback message in feature layout.
- Log technical details to console during development.

## Rollout order

1. `passes` + `commander` (core timeline and resource allocation)
2. `activityLog`
3. `control` + `actions`
4. `offsets` + `cortex` supporting endpoints
