# vmaas-as-service — architecture overview

**Status:** Draft — aligned to Summit demo proposal (2026-03-27) and OSAC VMaaS Demo Sync (2026-03-30).  
**Related:** [`boundaries.md`](./boundaries.md), [`../specs/vmaas-as-service.md`](../specs/vmaas-as-service.md), [`../adr/`](../adr/).

## Primary backend API

The **main API** for this product is **[osac-project/fulfillment-service](https://github.com/osac-project/fulfillment-service)** (OSAC cloud-in-a-box fulfillment service). Contracts live in that repo (**`proto/`** for gRPC); the tenant portal and external integrations target this service **API-first** (see [`0005-fulfillment-service-primary-api.md`](../adr/0005-fulfillment-service-primary-api.md)).

## System context

- **Primary users:** **Tenant users** (Summit focus)—self-service VM lifecycle on shared infrastructure. **Tenant admins** and **provider operators** are adjacent personas (roadmap / storytelling).  
- **Purpose:** **VMaaS tenant portal**—familiar **cloud VPC/subnet/security group** UX on **OpenShift Virtualization** (KubeVirt) with **OVN** (UDN/CUDN) networking story, **multi-tenant isolation**, and **API-first** integration for SP portals.  
- **Product envelope:** Capabilities discussed as **ACM-bundled**; **tenant-facing APIs and UI** intentionally **hide** raw OpenShift concepts (namespaces, etc.) for the tenant persona.  
- **Major dependencies:** Identity / org tenancy; **[fulfillment-service](https://github.com/osac-project/fulfillment-service)** as the **canonical fulfillment API** (gRPC + exposed REST/gateway as deployed; tenant networking surface—see MGMT-23504); **operators** (ComputeInstance, networking); **KubeVirt**; **OVN-Kubernetes**; optional **fulfillment CLI** (from fulfillment-service / OSAC tooling) for serial console (MGMT-22670).

## Logical architecture (reference)

```text
Tenant browser (PatternFly UI)
        │
        ▼
fulfillment-service (osac-project/fulfillment-service — main API, gRPC / gateway)
        │
        ├──► Orchestration (Ansible, operators via fulfillment)
        │
        ├──► Compute (KubeVirt / ComputeInstance CRs)
        │
        └──► Networking (VirtualNetwork, subnets, security groups
              → UDN/CUDN / OVN implementation on OpenShift)
```

## Glossary

| Term | Meaning |
|------|--------|
| **VMaaS** | VM as a Service; self-service VM lifecycle for tenants. |
| **Tenant** | An organization (customer) whose users share isolated resources. |
| **VirtualNetwork** | Product abstraction for an L3 network (demo uses **VPC-like** language and CIDR). |
| **Subnet** | Segment of a VirtualNetwork (demo: **frontend/public** vs **backend/private**). |
| **Security group** | Rule set for ingress/egress (demo: HTTP/HTTPS on frontend). |
| **ComputeInstance** | Product CR / API object for a tenant VM (RHEL demo path). |
| **UDN / CUDN** | OpenShift user-defined / cluster user-defined network constructs—**implementation mapping** for topology narrative. |
| **fulfillment-service** | **[osac-project/fulfillment-service](https://github.com/osac-project/fulfillment-service)** — **main backend API** for OSAC fulfillment; proto in repo **`proto/`**. |
| **Fulfillment CLI** | CLI for operator/tenant advanced flows (e.g. **serial console**); ships with / alongside fulfillment-service tooling. |

## Integration points

| Direction | Description |
|-----------|-------------|
| **Inbound** | Tenant UI → **[fulfillment-service](https://github.com/osac-project/fulfillment-service)** (direct or **thin BFF** only when required); IdP auth; org/tenant binding. |
| **Outbound** | From fulfillment-service: Kubernetes API / operators, Ansible, event feeds for **activity** UI; future **metering/cost** pipelines. |
| **External portals** | Same **main API**: integrate with **fulfillment-service** (SP “Ethan Online”-class portals and third-party tools). |

## Demo vs production (networking)

- **Summit demo:** Networking objects are **pre-provisioned**; UI **visualizes** topology and explains mapping to **UDN/CUDN**.  
- **Tenant permissions:** UX should reflect **what a tenant may actually do** (Kyle’s feedback)—likely **no** arbitrary network mutation if RBAC does not allow.  
- **Not in demo scope:** Inter-subnet routing; live topology provisioning on stage.

## Non-goals (current slice)

- Exposing OpenShift **namespace/project** model to tenant users in v1 Summit path.  
- Full **billing/chargeback** UI for Summit.  
- **Provider** full org management product completeness (may be **narrated** only).  
- **YAML-only** admin as the sole path for tenant users (SP requirement: ClickOps + gradual GitOps).

## Trust and security (sketch)

- **Tenant isolation:** **Hard** boundary—org **A** must not list/get/modify org **B** resources (API + RBAC + data plane).  
- **RBAC:** Firm roles for tenant user vs tenant admin vs provider (evolve per ACM model).  
- **Audit / compliance:** Roadmap: **per-tenant logging**, sovereign **metering** without leaking PII across boundaries (align with Cost/ACM conversations).  
- **Operational guardrails:** Opinionated control plane to limit destructive operator actions (SP requirement).

## UX principles (architecture-relevant)

- **PatternFly 6** standard; consistency with **EC2 / VMware / OCP / ACM** idioms where it helps, **simplified** navigation for non-OpenShift tenants.  
- **Branding:** Provider-owned **login** and **nav** customization (logo, domain story).  
- **Reuse:** Start from **existing BCD/demo** UI components; evolve toward production hardening.

## Known implementation hazards

Track in specs and delivery planning:

- Stable **VM IP** on subnet (MGMT-23363).  
- Operator **namespace** behavior with **subnetRef** (MGMT-23626).  
- **Public networking gRPC** (or gateway) for tenant-facing endpoints **on fulfillment-service** (MGMT-23504).  
- **Serial console** via CLI (MGMT-22670).
