# ADR-0003: Pre-provisioned networking for Summit demo

**Status:** Accepted  
**Date:** 2026-04-09  
**Deciders:** Demo arch / networking SMEs  
**Technical story:** “Cloud-grade networking” act without live infra churn

## Context

The Summit script requires showing **VirtualNetwork**, **two subnets** (frontend/public, backend/private), and a **security group** (HTTP/HTTPS on frontend), with a narrative mapping to **OpenShift UDN/CUDN**. Live creation on stage adds risk, time, and permission complexity for the **tenant user** persona.

## Decision

1. For the **Summit demo path**, **networking is pre-provisioned**; the demo **visualizes and explains** topology rather than **creating** it live during the act.  
2. **Inter-subnet routing** is **out of demo scope** (explicitly resolved).  
3. **Tenant UI** should reflect **real RBAC**: if tenants **cannot** mutate networking, the UI **must not** imply full CRUD that they lack (align with Kyle’s feedback).

## Consequences

**Positive**

- Predictable stage timing; fewer failure modes during topology act.  
- Clear **wow** story: familiar AWS-like model **mapped** to OpenShift networking.

**Negative / tradeoffs**

- Does not prove **tenant-driven network creation**—must be a **separate** epic if product requires it.  
- Seed data / env prep becomes **critical** for repeatable demos and E2E.

**Follow-up**

- Document **exact** seed objects and IDs for **AC-E2E-1**.  
- Review copy with networking SMEs for **UDN/CUDN** accuracy.

## References

- `docs/specs/vmaas-as-service.md` — Acts 3, engineering risks (MGMT-23504, MGMT-23626)  
- Summit demo proposal (2026-03-27)
