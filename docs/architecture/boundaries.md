# vmaas-as-service — boundaries

**Related:** [`overview.md`](./overview.md), [`../specs/vmaas-as-service.md`](../specs/vmaas-as-service.md).

## Bounded contexts

| Context | Responsibility | Consumes |
|--------|----------------|----------|
| **Tenant portal (UI)** | Login, org context, dashboard, topology **read**, catalog, VM CRUD UX, events | **[fulfillment-service](https://github.com/osac-project/fulfillment-service)** (main API), IdP |
| **fulfillment-service** | **Main API** for OSAC fulfillment: provisioning, lifecycle, networking RPCs/REST as shipped; authZ per org/tenant at API layer | Ansible, Kubernetes API, operators, cloud integrations |
| **Compute platform** | KubeVirt VMs, ComputeInstance reconciliation | CNI, storage, images |
| **Networking platform** | VirtualNetwork, subnets, security groups → OVN/UDN/CUDN | Cluster network operators |
| **Identity & tenancy** | Users, orgs, bindings | IdP, ACM patterns |

## Allowed dependencies (high level)

- **UI** must not bypass **fulfillment-service** for production flows (no direct cluster admin kubeconfig in tenant browser). A **thin BFF** is allowed only for shaping/auth/CORS—not a second domain model (see ADR-0005).  
- **fulfillment-service** owns long-running provision/teardown; UI polls or watches **status** via its API.  
- **Template catalog** is **curated** at provider/tenant-admin layer; tenant user **consumes**, does not define platform images.

## Isolation rules

- Every list/get/mutation must be **scoped** to the authenticated **org/tenant** context.  
- **No cross-tenant reads**—responses empty or **403** per API policy; tests must prove **AC-13** / **AC-E2E-2**.  
- Provider-global views (future) are **separate** surfaces with **separate** roles—not implied by tenant portal routes.

## Interface stability

- **VPC / subnet / security group** language is a **UX and API contract** for tenants; mapping to Kubernetes/OVN is **documented** but not dumped into primary UI copy.  
- **Breaking API changes** require ADR and version strategy (see ADR backlog).
