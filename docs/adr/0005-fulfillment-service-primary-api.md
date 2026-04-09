# ADR-0005: fulfillment-service as the main API

**Status:** Accepted  
**Date:** 2026-04-09  
**Deciders:** Architecture  
**Technical story:** vmaas-as-service / OSAC VMaaS tenant portal

## Context

The tenant portal, CLI flows, and external service-provider portals need a **single canonical backend** for provisioning, VM lifecycle, networking, and related OSAC operations. Several components (operators, Ansible, KubeVirt) participate in the full stack, but **one service** should be treated as the **primary API** surface for integrations and UI data.

## Decision

1. The **main API** for VMaaS / OSAC fulfillment in this architecture is **[osac-project/fulfillment-service](https://github.com/osac-project/fulfillment-service)** (“cloud-in-a-box fulfillment service”).  
2. **gRPC** contracts are defined in that repository (**`proto/`**); REST or gateway exposure, if any, is **as implemented there** or in agreed edge components—still backed by fulfillment-service semantics.  
3. The **tenant portal** integrates **API-first** with fulfillment-service ( **direct** from browser via gateway, or via a **thin BFF** only when required for auth/CORS or shaping—BFF must not become a second source of business rules).  
4. **MGMT-23504** and related items apply to **shipping/consuming** the networking and tenant-facing surfaces **from** fulfillment-service (or its deployed endpoints), not to an unspecified alternate API.

## Consequences

**Positive**

- One repo for **proto**, integration tests, and server behavior; clear handoff for UI and automation teams.  
- Aligns with existing OSAC catalog descriptions (fulfillment-service as gRPC/REST core).

**Negative / tradeoffs**

- Portal work **depends** on fulfillment-service release cadence and backward compatibility.  
- Any **BFF** must stay thin to avoid drift from fulfillment-service contracts.

**Follow-up**

- Document concrete **base URLs**, auth mechanism, and **which RPCs** map to each UI screen in implementation README or OpenAPI/gRPC doc links from this repo when the app exists.

## References

- https://github.com/osac-project/fulfillment-service  
- `docs/architecture/overview.md`, `docs/architecture/boundaries.md`
