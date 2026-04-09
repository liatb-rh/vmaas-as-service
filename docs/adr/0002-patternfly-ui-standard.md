# ADR-0002: PatternFly as the tenant portal design system

**Status:** Accepted  
**Date:** 2026-04-09  
**Deciders:** UX / engineering  
**Technical story:** Summit demo UI delivery

## Context

Summit demo proposal specifies **PatternFly** (Red Hat standard). Prior design exploration used **Material-style** outputs from Figma AI flows, which is **not** aligned with RH product standards. Cursor/agent rules in this repo already mandate **PatternFly 6** for product UI.

## Decision

1. **Production-aimed** tenant portal UI is built with **PatternFly 6** (and OpenShift console–aligned patterns where console-facing).  
2. **Material Design** (or Figma-AI Material outputs) is **not** a delivery target for ship UI—may exist only as **disposable mock** input.  
3. **Reuse** existing **BCD / demo** VM UI components as a starting point where compatible; refactor to PatternFly as needed.

## Consequences

**Positive**

- One design system across Red Hat cloud products; a11y and theming alignment.  
- Matches field expectations for “real” product.

**Negative / tradeoffs**

- Extra effort to **replace** or **re-skin** non-PatternFly prototypes.  
- UX agent / Dev must coordinate **Storybook under `ux/`** when visual baseline precedes implementation.

**Follow-up**

- Track “UI blocker: PatternFly integration” as engineering milestone alongside API blockers.

## References

- `.cursor/rules/must-follow-coding-rules.md`  
- `agents/ux-agent.md`  
- Summit demo proposal (2026-03-27)
