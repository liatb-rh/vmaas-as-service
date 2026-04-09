# Architecture Decision Records (ADRs)

ADRs capture **significant, stable decisions** (technology choice, API shape, security model) so Dev and Review agents do not re-litigate them on every PR.

## When to add an ADR

- Choosing a framework, datastore, or integration style that is hard to reverse.
- Defining a **public API** or contract used by multiple teams.
- Security or compliance decisions that constrain implementation.

## Naming

Use consecutive numbers and a short slug:

```text
0001-use-patternfly-for-admin-ui.md
0002-api-versioning-strategy.md
```

## Template

Use [`template.md`](./template.md) for new records. Replace bracketed sections; keep **Status** current (`Proposed` → `Accepted` → `Superseded by ADR-00xx`).

Reference ADRs from `docs/architecture/overview.md` and from PRs.
