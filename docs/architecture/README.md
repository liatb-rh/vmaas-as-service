# Architecture

Use this folder for **architecture descriptions** that agents and humans read before large changes: system context, bounded contexts, integration points, non-goals, and diagrams (or links to them).

## What belongs here

- High-level **context** (who uses the system, main dependencies).
- **Boundaries** between apps, services, and shared libraries.
- **Data flow** and trust boundaries (auth, PII, external APIs).
- **Non-goals** and deprecated paths (what not to build).

## What does *not* belong here

- Feature-level acceptance criteria → use [`../specs/`](../specs/).
- One-off implementation notes → prefer ADRs in [`../adr/`](../adr/) when the decision should be remembered.

## Suggested files (add as needed)

| File | Purpose |
|------|--------|
| `overview.md` | System context and glossary |
| `boundaries.md` | Bounded contexts, isolation, allowed dependencies |
| `nfr.md` | Non-functional expectations (latency, availability) when not in specs |

Point agents at this folder in handoff prompts (e.g. `docs/architecture/overview.md`).
