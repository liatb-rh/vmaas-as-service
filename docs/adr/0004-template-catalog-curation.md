# ADR-0004: Template catalog — curation, scope, and future VM templates

**Status:** Proposed  
**Date:** 2026-04-09  
**Deciders:** PM / platform arch  
**Technical story:** VMaaS template catalog and SP cost control

## Context

The **template catalog** is **central** to the product story (SAP, popular apps, OS images). Concerns:

- **Over-provisioning** and cost if every template is available to every tenant.  
- Distinction between **OS-only** vs **application** templates (web apps more demo-friendly than SSH-only).  
- **VM templates** as extension of **Kubernetes templates** (developer preview → tech preview)—terminology must stay consistent (Ronen / team follow-up).  
- **Tenant admin** persona will need **sharing, scope, and image upload**—**not** Summit tenant-user MVP.

## Decision (interim)

1. **Summit / near-term:** Offer a **small, curated** catalog (specific environments and sizes) appropriate to the **story** and **quotas**.  
2. **Tenant users** **browse and instantiate**; **curation** is a **provider / tenant-admin** concern (roadmap).  
3. **Track** Red Hat **VM template** roadmap separately; when it lands, **reconcile** catalog UX and APIs without breaking stable **AC-8/AC-9** semantics (version or migrate with ADR).

## Consequences

**Positive**

- Protects providers from runaway spend in early demos.  
- Keeps UI and tests **bounded** and repeatable.

**Negative / tradeoffs**

- “Full catalog” vision is **not** shown at Summit—**narrate** breadth.  
- Requires **content ops** to maintain curated lists per environment.

**Follow-up**

- Oved / Ronen: sync on **VM templates** + share technical brief.  
- Define **template parameters** schema for **AC-9** in API spec.

## References

- OSAC VMaaS Demo Sync (2026-03-30)  
- `docs/specs/vmaas-as-service.md`
