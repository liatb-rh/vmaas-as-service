# vmaas-as-service

Greenfield **tenant portal / VMaaS** specs repo with **agentic SDLC** layout. The **main backend API** is **[fulfillment-service](https://github.com/osac-project/fulfillment-service)** (`osac-project/fulfillment-service`).

## Layout

| Path | Purpose |
|------|--------|
| `docs/specs/` | Feature specs and acceptance criteria (`AC-1`, …) |
| `docs/architecture/` | System context, boundaries, NFRs |
| `docs/adr/` | Architecture Decision Records |
| `agents/` | Dev, QA, Review, UX agent playbooks (prompts) |
| `.cursor/rules/` | Must-follow coding rules for agents |

## Workflow

1. Maintain `docs/specs/vmaas-as-service.md`, `docs/architecture/` (`overview.md`, `boundaries.md`), and `docs/adr/` (`0001`–`0005` + new records as needed). Use `docs/specs/TEMPLATE.md` for additional feature specs.
2. Open the relevant playbook in `agents/` (e.g. `dev-agent.md`) and use it as the system or task prompt; point the model at concrete paths under `docs/`.
3. **Dev** implements from specs; **QA** adds tests; **Review** checks against ACs; **UX** touches only `ux/` when you add a Storybook sandbox (see `agents/ux-agent.md`).

Application source (e.g. monorepo `apps/`, `packages/`) will land here once you bootstrap from your chosen template (see `agents/dev-agent.md` *New project bootstrap*).
