# vmaas-as-service — OSAC VMaaS tenant portal & Summit demo

**Last updated:** 2026-04-09  
**Architecture:** [`../architecture/overview.md`](../architecture/overview.md)  
**ADRs:** [`../adr/`](../adr/)  
**Sources:** Summit demo proposal (2026-03-27); OSAC VMaaS Demo Sync (2026-03-30); OpenShift roadmap / multi-tenant VMaaS requirements (SP ANZ & global).

## Primary backend API

The **main API** for VMaaS/OSAC fulfillment is **[osac-project/fulfillment-service](https://github.com/osac-project/fulfillment-service)**. The tenant portal, automation, and external SP portals integrate **API-first** with this service (gRPC contracts in its **`proto/`** tree; REST or gateway as deployed). See [`docs/adr/0005-fulfillment-service-primary-api.md`](../adr/0005-fulfillment-service-primary-api.md).

## Problem

Deliver a **tenant-facing VM as a Service (VMaaS) portal** so organization users can see **their** networks and quotas, browse **curated** VM templates, provision VMs on **pre-configured** cloud-style networking, and prove **hard multi-tenant isolation**—without exposing the underlying OpenShift/KubeVirt/OVN platform. Red Hat Summit narrative: **“From zero to production VM in five minutes”** with familiar **VPC / subnet / security group** language on bare-metal OpenShift.

## Personas & product context

| Persona | Summit focus | Notes |
|--------|--------------|--------|
| **Tenant user** (e.g. junior admin, developer) | **Primary** | Login, dashboard, topology (read), templates, VM lifecycle, isolation proof. |
| **Tenant admin** | Out of scope for Summit story | Template sharing, scope, image upload, catalog curation—roadmap. |
| **Provider / operator** | Storytelling & roadmap | Global view, org management, quotas, chargeback—often **not** fully implemented for Summit; narrate roadmap. |

**Product framing (sync 2026-03-30):** Capabilities are expected to **bundle with ACM**; tenant experience uses **dedicated APIs and UI** that **do not expose** the underlying platform. Reuse **existing Red Hat VM / console–style** patterns (EC2, VMware, OCP, ACM) where possible, **simplified** for tenants who are not OpenShift experts.

## Design system

- **PatternFly** (Red Hat standard) for product UI.  
- **Resolved for demo planning:** Networking is **pre-provisioned**; demo does **not** require live creation of topology during the act.  
- **Resolved:** Routing between subnets **not** in demo scope.

## Summit demo arc (target ~5 minutes)

| Act | Duration | Intent |
|-----|----------|--------|
| **1** | ~30s | Tenant login; **organization name** prominent (e.g. “Coca-Cola”), not generic “Tenant A”; reinforce isolated org resources. |
| **2** | ~30s | **Dashboard:** VMs, networks, usage; **allocated quotas**; **recent activity / events**. |
| **3** | ~1m | **Network topology (read-only):** VirtualNetwork + CIDR (VPC-like); **frontend** (public) and **backend** (private) subnets; **security group** on frontend (HTTP/HTTPS inbound); narrative mapping to **OpenShift UDN/CUDN** under the hood. **Wow:** AWS-familiar primitives on bare-metal OpenShift. |
| **4** | ~30s | **Template catalog:** list with titles/descriptions; **detail** with parameters and defaults. |
| **5** | ~2m | **Create ComputeInstance** (e.g. RHEL) on **frontend subnet** + SG; states **Pending → Provisioning → Running**; **IP on subnet** visible; **serial console** via **fulfillment CLI** (SSH-like); optional **small app** for engagement. |
| **6** | ~30s | **Isolation:** switch context to **second org** (e.g. “Pepsi”); **cannot** see first org’s VMs/networks (empty or forbidden). |
| **7** | Optional | Day-2: restart via API, delete / teardown, quotas or billing **if** available. |

### Demo differentiation (stakeholder pitch)

1. Familiar cloud primitives (VPC/subnet/SG).  
2. Full stack story: **API → Operator → KubeVirt → OVN** (live).  
3. Multi-tenancy for MSP/enterprise.  
4. **CLI-first** moments (fulfillment CLI).  
5. **AWS-like VMaaS on your own OpenShift bare metal.**  
6. VMware / VCD / VCF migration narrative.

## Engineering risks & blockers (Jira)

| Item | Risk to demo |
|------|----------------|
| **MGMT-23363** — ComputeInstance IP disappears after creation | **Critical** — VM looks broken without stable IP. |
| **MGMT-23626** — Operator wrong namespace for KubeVirt VM when `subnetRef` set | Blocks **networking + VM** integration. |
| **MGMT-22670** — Serial console from fulfillment CLI | **Wow** moment if landed. |
| **MGMT-23504** — Public networking gRPC servers | Needed for **tenant-facing networking API**. |
| **UI** — PatternFly integration (Material from Figma AI is **not** ship target) | Track as UI delivery / design-system work. |

## Scope (near term — Summit-oriented)

- Tenant portal: auth, org context, dashboard, topology **visualization**, template catalog, VM create/lifecycle, isolation proof.  
- **Pre-provisioned** network assets for demo; UI reflects **tenant-realistic** permissions (likely **read** topology, **no** arbitrary create/edit net if persona cannot).  
- **Curated** template catalog (sizes/environments) to avoid over-provisioning; scope templates for **story**, not unbounded catalog.  
- **Branding:** provider-customizable login / nav (logo)—**fake acceptable** for Summit if needed.  
- Reuse **BCD / existing demo UI** components as starting point; wire to **[fulfillment-service](https://github.com/osac-project/fulfillment-service)** (Ethan / Kyle / Liat track).

## Out of scope (Summit v1)

- Live **creation** of full network topology during demo (pre-provisioned).  
- Full **cost / billing / utilization** UI (unlikely Summit-ready; **story** only).  
- **Provider** global org-management UI completeness (early; storytelling).  
- Inter-subnet routing for demo.  
- Full **VCD-like** experience (not MVP requirement).

## Open questions / conflicts to resolve

- **Org switcher:** Demo **Act 6** uses switching org for isolation proof; product discussion suggested **one org per user** (no switcher) for simplicity—reconcile **demo mechanic** vs **product IA** (e.g. separate logins for Pepsi vs Coca-Cola).  
- **Template type:** OS-only vs **application** templates (e.g. web app)—apps often more engaging than SSH-only.  
- **“VM templates”** (Kubernetes template extension, developer preview → tech preview)—terminology and technical alignment with Ronen / offline follow-up.  
- **Tenant vs tenant-admin** flows and **template catalog** governance (sharing, scope, upload)—post-Summit.

---

## AC table — tenant portal & demo flow

Stable IDs; add new rows with new numbers—do **not** renumber.

| ID | Given / when / then |
|----|---------------------|
| AC-1 | **Given** a tenant user authenticated for org **A**, **when** the user lands after login, **then** the UI shows org **A**’s real name prominently (not a generic tenant label). |
| AC-2 | **Given** a tenant user, **when** they open the dashboard, **then** they see a summary of **VMs**, **networks**, and **resource usage** relevant to their org. |
| AC-3 | **Given** a tenant user, **when** they view quotas, **then** **allocated vs limit** (or equivalent) is visible for agreed dimensions (e.g. CPU, memory, storage—per product decision). |
| AC-4 | **Given** a tenant user, **when** they open activity/events, **then** **recent org-scoped** events are listed (or empty state with clear copy). |
| AC-5 | **Given** pre-provisioned networking, **when** the user opens **network topology**, **then** they see a **VirtualNetwork** (or product equivalent) with **CIDR** and **two subnets** labeled consistently (e.g. frontend/public vs backend/private). |
| AC-6 | **Given** the topology view, **when** the user inspects frontend subnet context, **then** applied **security group / rules** show **HTTP/HTTPS inbound** as specified for the demo environment. |
| AC-7 | **Given** the topology view, **when** docs or in-UI helper is used, **then** narrative can explain mapping to **OpenShift UDN/CUDN** concepts (accuracy reviewed with networking SMEs). |
| AC-8 | **Given** the template catalog, **when** the user lists templates, **then** each item shows **title** and **short description** (curated set). |
| AC-9 | **Given** a template, **when** the user opens details, **then** **configurable parameters** and **defaults** are visible before create. |
| AC-10 | **Given** a tenant user, **when** they create a **ComputeInstance** on the **frontend** subnet with the demo security group, **then** the VM progresses through **Pending → Provisioning → Running** (or product-equivalent states) with visible status. |
| AC-11 | **Given** a running VM on the demo network, **when** the user views network attachment details, **then** an **IP address** on the intended subnet is shown and **stable for the demo window** (subject to MGMT-23363 fix). |
| AC-12 | **Given** fulfillment CLI is available (MGMT-22670), **when** the operator runs the documented console command for that VM, **then** **serial console** access works end-to-end for the demo VM. |
| AC-13 | **Given** two organizations **A** and **B**, **when** a user authenticated for **B** lists VMs and networks, **then** they **do not** see org **A**’s resources (empty lists or explicit forbidden—per API contract). |
| AC-14 | **Given** PatternFly as the design system decision, **when** new tenant portal UI ships for Summit path, **then** components follow **PatternFly 6** patterns (no dependency on Material for production UI). |

### Day-2 & API (stretch)

| ID | Given / when / then |
|----|---------------------|
| AC-15 | **Given** a running VM, **when** a supported **restart** API is called with proper auth, **then** the VM restarts per API semantics. |
| AC-16 | **Given** a deletable VM, **when** **delete** is invoked, **then** resources tear down cleanly per product rules (observable in UI or API). |

---

## E2E / integration ACs

| ID | Given / when / then |
|----|---------------------|
| AC-E2E-1 | **Given** demo seed data for org **A**, **when** an automated run performs login → dashboard → topology → template → create VM, **then** all steps complete without manual infra changes mid-run. |
| AC-E2E-2 | **Given** seeded org **A** and **B**, **when** tests run as **B**, **then** no cross-org resource IDs from **A** appear in list/get responses. |

---

## Service provider & roadmap requirements (Red Hat / global SP)

Consolidated expectations from **multi-tenant VMaaS** positioning (accelerated with Ethan; common SP asks). **Not** all are Summit MVP—trace to ADRs and future specs.

| Theme | Requirement |
|--------|----------------|
| **Multi-tenancy** | **Multi-tenant by design** across enterprises; not single-tenant bolt-on. |
| **Platform** | **Shared** multi-tenant model using **OpenShift Virtualization** as OpenStack alternative. |
| **Isolation** | **Hard** tenant segregation—no cross-tenant access paths. |
| **IaC & ops** | Support **ClickOps**, **GitOps**, and **IaC** (GUI, Ansible, Operators, GitOps) with guardrails. |
| **Guardrails** | Opinionated control planes; reduce accidental damage to sensitive config. |
| **RBAC** | Firm RBAC and **private networking** per tenant scope. |
| **Day-2** | Ops lockout from sensitive tenant data where required (regulatory). |
| **Logging** | **Per-tenant** logging for compliance. |
| **Cost / metering** | Local / disconnected **metering and cost** (e.g. Prometheus/Grafana) inside sovereign enclave. |
| **API** | **API-first**, extensible for external portals and tools. |
| **Ecosystem** | Pluggable backup, replication, metrics, ITSM. |
| **Advanced knobs** | Technical controls (e.g. MAC, SCSI) for advanced engineers; exec flows stay in portal. |
| **ClickOps** | **GUI-first** for VMware/VCD-style users; YAML-only unacceptable for many users; MVP need not be full VCD. |
| **Migration** | Example: **~2,000 Windows VMs** off vCloud Director; **May 2026** commencement; MVP lab viability demo; clear roadmap to **mid-year** and **December** milestones. |

## Related actions (from 2026-03-30 sync)

- Oved / Ronen: sync **VM templates** (K8s template extension).  
- Ronen: share **VM template** technical info.  
- Michael: **tenant onboarding / org management** readiness (external dependency).  
- Ethan / Kyle / Liat: **reuse UI**, connect to **current APIs**, basic VM create flow.  
- Ethan / Kyle: **finalize Summit story** (tenant + multi-tenant).  
- Ronen / Matan: **CNV UI/UX** alignment.  
- Communication: **WG-Osac** Slack; follow-up cadence as scheduled.
