# ADR-0001: Tenant portal scope and ACM product envelope

**Status:** Accepted  
**Date:** 2026-04-09  
**Deciders:** Product / architecture (informed by OSAC VMaaS Demo Sync 2026-03-30)  
**Technical story:** OSAC VMaaS Summit demo and vmaas-as-service

## Context

VMaaS needs a **tenant-facing** experience for Red Hat Summit and beyond: login, VMs, templates, networks, quotas, and **multi-tenant isolation**. Stakeholders discussed whether the demo is “concept” vs “productized” and where capabilities live in the portfolio.

## Decision

1. **Primary persona for the Summit narrative** is the **tenant user** (not provider admin or tenant admin).  
2. Capabilities are **positioned to bundle with ACM**; the **tenant portal** uses **product-specific APIs and UI** that **do not expose** the underlying OpenShift platform to that persona. The **implementation** of those APIs is **[fulfillment-service](https://github.com/osac-project/fulfillment-service)** per **ADR-0005**.  
3. **Provider** and **tenant-admin** capabilities (global view, org management, template governance, billing) are **acknowledged** as roadmap and **storytelling**, not gates for the initial tenant-user demo slice.

## Consequences

**Positive**

- Clear UX scope: simplify navigation vs full OCP console.  
- Aligns portfolio story (ACM) for field and partners.

**Negative / tradeoffs**

- Tenant admin and provider UIs lag features that tenants might expect “soon.”  
- Risk of **scope creep** if every persona is loaded into v1—mitigate with explicit **out of scope** in specs.

**Follow-up**

- Confirm **org onboarding** and **org management** readiness with PM (sync action: Michael / external).  
- Keep **ADR-0001** synchronized with ACM roadmap comms.

## References

- `docs/specs/vmaas-as-service.md`  
- Meeting: OSAC VMaaS Demo Sync (2026-03-30)
