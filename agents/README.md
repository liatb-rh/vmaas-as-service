# Agentic SDLC — agents kit

**vmaas-as-service:** Playbooks live in **`agents/`**; specs and architecture live under **`docs/specs/`**, **`docs/architecture/`**, and **`docs/adr/`**. Must-follow Cursor rules: **`.cursor/rules/must-follow-coding-rules.md`** at the repo root.

This directory holds **role playbooks** for Dev, QA, Review, and UX. Template content for architecture, ADRs, and ACs is under **`docs/`** in this repository.

## Layout (this repository)

```text
agents/
├── README.md                 ← this file
├── dev-agent.md              ← Dev role (source only)
├── qa-agent.md               ← QA role (tests only)
├── review-agent.md           ← Review role (review artifacts)
└── ux-agent.md               ← UX role (Storybook + PatternFly 6 under ux/)

docs/
├── specs/                    ← feature specs + acceptance criteria
├── architecture/             ← context, boundaries, NFRs
└── adr/                      ← Architecture Decision Records

.cursor/rules/
└── must-follow-coding-rules.md
```

## Cursor rules

- Rules live at **`.cursor/rules/must-follow-coding-rules.md`** (repository root).

## Workflow (short)

1. Maintain **acceptance criteria** in **`docs/specs/`**.  
2. Record big decisions in **`docs/adr/`** and system shape in **`docs/architecture/`**.  
3. Run agents using the `*-agent.md` prompts (see each file’s *Reads* / *Writes* sections). **Unless Figma or other advance design is already provided**, run **UX Agent** (`ux-agent.md`) **before** **Dev Agent** for in-scope UI so **`ux/`** Storybook is the design input to implementation. Then **Dev → QA → Review**. For **new** UI+API projects, **Dev Agent** may bootstrap from [template-ui](https://github.com/redhat-data-and-ai/template-ui) in **monorepo** layout (`dev-agent.md` *New project bootstrap*) as needed so the repo can host **`ux/`**, then **UX**, then Dev completes production UI.

## Copying into a service repo

Mirror folders to your org standard, for example:

| Here | Typical target in app repo |
|------|----------------------------|
| `architecture/` | `docs/architecture/` |
| `adr/` | `docs/adr/` |
| `acceptance-criteria/` | `docs/specs/` or `specs/` (merge with feature specs) |
| `.cursor/rules/*.md` | `.cursor/rules/` at repo root |

Update `@` paths in your Cursor handoffs after copying.

## UX / Storybook (`ux/` in the app repo)

The **UX Agent** (`ux-agent.md`) targets a dedicated **`ux/`** folder in the **application** repository (Storybook config and stories for **PatternFly 6**, aligned with **latest OpenShift console** practice when the product is console-facing). The UX Agent **only** edits files under **`ux/**`**; root scripts, `src/**`, and workspace wiring are **Dev / human** responsibilities unless the user explicitly expands the UX role. That folder is **not** part of the `agents/` kit itself; create it in the app when you want a design sandbox. See `ux-agent.md` for layout and boundaries.
