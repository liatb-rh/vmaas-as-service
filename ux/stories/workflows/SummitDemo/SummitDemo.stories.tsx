import type { Meta, StoryObj } from "@storybook/react";
import type { ReactNode } from "react";
import { TenantPortalShell, type TenantNavId } from "../../layout/TenantPortalShell";
import { orgA, orgB } from "../../../fixtures/summit-demo";
import {
  ActivityFullPage,
  CreateVmStepNetworkPage,
  CreateVmStepReviewPage,
  CreateVmStepTemplatePage,
  DashboardPage,
  OrgBEmptyVmsPage,
  PostLoginHomePage,
  TemplateDetailPage,
  TemplatesListPage,
  TopologyPage,
  VirtualMachinesListPage,
  VmProvisioningPage,
  VmRunningDetailPage,
} from "./summitPages";

const meta: Meta = {
  title: "Workflows/Summit Demo",
  parameters: {
    docs: {
      description: {
        component:
          "Happy-path screens for the Red Hat VMaaS tenant portal (Summit demo arc). Maps to `docs/specs/vmaas-as-service.md` AC-1–AC-14. PatternFly 6; console-adjacent admin layout without exposing OpenShift primitives in primary copy.",
      },
    },
  },
};

export default meta;

type Story = StoryObj;

function wrap(activeNav: TenantNavId, organizationDisplayName: string, page: ReactNode) {
  return (
    <TenantPortalShell activeNav={activeNav} organizationDisplayName={organizationDisplayName}>
      {page}
    </TenantPortalShell>
  );
}

export const Story01OrganizationContext: Story = {
  name: "01 — Organization context",
  render: () => wrap("dashboard", orgA.displayName, <PostLoginHomePage />),
};

export const Story02Dashboard: Story = {
  name: "02 — Dashboard",
  render: () => wrap("dashboard", orgA.displayName, <DashboardPage />),
};

export const Story03Activity: Story = {
  name: "03 — Activity (full feed)",
  render: () => wrap("activity", orgA.displayName, <ActivityFullPage />),
};

export const Story04NetworkTopology: Story = {
  name: "04 — Network topology",
  render: () => wrap("topology", orgA.displayName, <TopologyPage />),
};

export const Story04aVirtualMachinesList: Story = {
  name: "04a — Virtual machines list",
  render: () => wrap("instances", orgA.displayName, <VirtualMachinesListPage />),
};

export const Story05TemplatesList: Story = {
  name: "05 — Template catalog",
  render: () => wrap("templates", orgA.displayName, <TemplatesListPage />),
};

export const Story06TemplateDetail: Story = {
  name: "06 — Template detail",
  render: () => wrap("templates", orgA.displayName, <TemplateDetailPage />),
};

export const Story07CreateVmChooseTemplate: Story = {
  name: "07 — Create VM — choose template",
  render: () => wrap("instances", orgA.displayName, <CreateVmStepTemplatePage />),
};

export const Story08CreateVmNetwork: Story = {
  name: "08 — Create VM — network & security",
  render: () => wrap("instances", orgA.displayName, <CreateVmStepNetworkPage />),
};

export const Story09CreateVmReview: Story = {
  name: "09 — Create VM — review",
  render: () => wrap("instances", orgA.displayName, <CreateVmStepReviewPage />),
};

export const Story10VmProvisioning: Story = {
  name: "10 — VM provisioning",
  render: () => wrap("instances", orgA.displayName, <VmProvisioningPage />),
};

export const Story11VmRunningDetail: Story = {
  name: "11 — VM running (IP & day-2 hints)",
  render: () => wrap("instances", orgA.displayName, <VmRunningDetailPage />),
};

export const Story12IsolationOrgB: Story = {
  name: "12 — Isolation — other org empty",
  render: () => wrap("instances", orgB.displayName, <OrgBEmptyVmsPage />),
};
