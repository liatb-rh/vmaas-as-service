# VMaaS tenant portal — UX prototype (Storybook)

Self-contained **PatternFly 6** Storybook for the **Virtual Machines as a Service** tenant experience described in [`../docs/specs/vmaas-as-service.md`](../docs/specs/vmaas-as-service.md) and [`../docs/architecture/overview.md`](../docs/architecture/overview.md). Layout follows **OpenShift console–adjacent** admin patterns (masthead, sidebar, list/detail, toolbars) while keeping **VPC / subnet / security group** language and **no raw OpenShift project/namespace** exposure in primary copy.

**OpenShift / console-aligned:** yes (PatternFly 6 + console-style chrome; tenant-safe vocabulary per architecture).

## How to run

From the **`vmaas-as-service`** project root (workspace installs `ux/` deps):

```bash
cd Projects/vmaas-as-service
npm install
npm run storybook
```

Or only the UX package:

```bash
cd Projects/vmaas-as-service/ux
npm install
npm run storybook
```

Open **http://localhost:6006** and expand **Workflows → Summit Demo**.

Static build:

```bash
npm run build-storybook
```

Output: `ux/storybook-static/` (add to `.gitignore` if you version this folder elsewhere).

## Happy path: Summit demo (primary success path)

Walk stories **01 → 12** in order; fixtures reuse the same org, network, and VM names for continuity.

| # | Storybook title | Spec trace |
|---|-----------------|------------|
| 01 | Organization context | AC-1 |
| 02 | Dashboard | AC-2, AC-3 |
| 03 | Activity (full feed) | AC-4 |
| 04 | Network topology | AC-5, AC-6, AC-7 |
| 04a | Virtual machines list | Inventory + org scope (AC-13); supports demo narrative |
| 05 | Template catalog (tile gallery) | AC-8 |
| 06 | Template detail | AC-9 |
| 07 | Create VM — choose template | AC-10 (start) |
| 08 | Create VM — network & security | AC-10 |
| 09 | Create VM — review | AC-10 |
| 10 | VM provisioning | AC-10 |
| 11 | VM running (IP & day-2 hints) | AC-10, AC-11, AC-12 (CLI note) |
| 12 | Isolation — other org empty | AC-13 |

**AC-14** is satisfied by using **PatternFly 6** components only in this prototype.

## Layout

| Path | Role |
|------|------|
| `reference/catalog-object.html` | Catalog tile anatomy (maps to **05 — Template catalog** in `TemplatesListPage`) |
| `fixtures/summit-demo.ts` | Anonymous mock data (orgs, network, templates, VMs) |
| `stories/layout/TenantPortalShell.tsx` | Masthead + org label + sidebar nav |
| `stories/workflows/SummitDemo/summitPages.tsx` | Full-page compositions |
| `stories/workflows/SummitDemo/SummitDemo.stories.tsx` | Ordered workflow stories |

## Handoff — Dev Agent / repo wiring

This tree is **design-only**. Integrating into a production app may require:

- Root `package.json` script (e.g. `"storybook:vmaas": "npm run storybook --prefix Projects/vmaas-as-service/ux"`) — **outside** `ux/` per UX agent boundary.
- Shared components: either copy patterns from `summitPages.tsx` into `src/` or extract shared UI after design sign-off.

## References

- [PatternFly 6 — Gallery layout](https://www.patternfly.org/layouts/gallery)
- [PatternFly 6](https://www.patternfly.org/)
- [OpenShift Console STYLEGUIDE](https://github.com/openshift/console/blob/main/STYLEGUIDE.md)
