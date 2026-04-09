/** Anonymous fixtures for Storybook — no real customer data. */

export const orgA = {
  id: "org-demo-a",
  displayName: "Coca-Cola",
};

export const orgB = {
  id: "org-demo-b",
  displayName: "Pepsi",
};

export const dashboardSummary = {
  vmCount: 4,
  networkCount: 1,
  vcpuUsed: 12,
  vcpuLimit: 32,
  memoryGiUsed: 48,
  memoryGiLimit: 128,
  storageGiUsed: 320,
  storageGiLimit: 2048,
};

export const recentEvents = [
  {
    id: "evt-1",
    time: "2026-04-09 09:12 UTC",
    message: "ComputeInstance web-frontend-01 entered Running state",
    severity: "success" as const,
  },
  {
    id: "evt-2",
    time: "2026-04-09 08:55 UTC",
    message: "Security group demo-frontend-sg updated (HTTP/HTTPS)",
    severity: "info" as const,
  },
  {
    id: "evt-3",
    time: "2026-04-08 17:40 UTC",
    message: "Template catalog sync completed (3 templates)",
    severity: "info" as const,
  },
];

export const virtualNetwork = {
  name: "tenant-vpc-01",
  cidr: "10.64.0.0/16",
  subnets: [
    {
      name: "frontend-public",
      role: "Public-facing workloads",
      cidr: "10.64.0.0/24",
    },
    {
      name: "backend-private",
      role: "Internal services",
      cidr: "10.64.1.0/24",
    },
  ],
  securityGroup: {
    name: "demo-frontend-sg",
    rules: [
      { direction: "Ingress" as const, protocol: "TCP", ports: "80", source: "0.0.0.0/0" },
      { direction: "Ingress" as const, protocol: "TCP", ports: "443", source: "0.0.0.0/0" },
    ],
  },
};

export interface TemplateFixture {
  id: string;
  title: string;
  description: string;
  /** Catalog tile — provider line (agents/reference/catalog-object.html). */
  provider: string;
  /** Capability tags shown on catalog tiles. */
  tags: string[];
  defaults: { vcpu: number; memoryGiB: number; diskGiB: number };
  parameters: { name: string; label: string; defaultValue: string }[];
}

export const templates: TemplateFixture[] = [
  {
    id: "tpl-rhel-9-small",
    title: "Red Hat Enterprise Linux 9 (small)",
    description: "General-purpose RHEL 9 with 2 vCPU and 8 GiB RAM — web and app tiers.",
    provider: "Provided by Red Hat",
    tags: ["RHEL 9", "General purpose", "Web tier"],
    defaults: { vcpu: 2, memoryGiB: 8, diskGiB: 50 },
    parameters: [
      { name: "hostname", label: "Hostname", defaultValue: "rhel-app-01" },
      { name: "sshKey", label: "SSH public key", defaultValue: "ssh-ed25519 AAAA…demo" },
    ],
  },
  {
    id: "tpl-rhel-9-medium",
    title: "Red Hat Enterprise Linux 9 (medium)",
    description: "Balanced footprint for middleware and small databases.",
    provider: "Provided by Red Hat",
    tags: ["RHEL 9", "Database-ready", "Middleware"],
    defaults: { vcpu: 4, memoryGiB: 16, diskGiB: 100 },
    parameters: [
      { name: "hostname", label: "Hostname", defaultValue: "rhel-db-01" },
      { name: "sshKey", label: "SSH public key", defaultValue: "ssh-ed25519 AAAA…demo" },
    ],
  },
  {
    id: "tpl-dev-sandbox",
    title: "Developer sandbox",
    description: "Minimal footprint for CI agents, ephemeral workspaces, and quick experiments.",
    provider: "Provided by Violet MaaS",
    tags: ["Dev", "Ephemeral", "CI"],
    defaults: { vcpu: 1, memoryGiB: 4, diskGiB: 30 },
    parameters: [
      { name: "hostname", label: "Hostname", defaultValue: "dev-sandbox-01" },
      { name: "sshKey", label: "SSH public key", defaultValue: "ssh-ed25519 AAAA…demo" },
    ],
  },
];

export type VirtualMachineState = "Running" | "Stopped" | "Provisioning" | "Pending";

export interface VirtualMachineRow {
  id: string;
  name: string;
  state: VirtualMachineState;
  os: string;
  templateLabel: string;
  subnet: string;
  primaryIp: string;
  vcpu: number;
  memoryGiB: number;
  diskGiB: number;
  createdDisplay: string;
  zone: string;
}

/** Org A — list view (matches dashboard vmCount). */
export const virtualMachines: VirtualMachineRow[] = [
  {
    id: "ci-web-fe",
    name: "web-frontend-01",
    state: "Running",
    os: "RHEL 9.4",
    templateLabel: "RHEL 9 (small)",
    subnet: "frontend-public",
    primaryIp: "10.64.0.47",
    vcpu: 2,
    memoryGiB: 8,
    diskGiB: 50,
    createdDisplay: "Apr 8, 2026 · 14:22 UTC",
    zone: "edge-rack-a",
  },
  {
    id: "ci-api",
    name: "api-gateway-02",
    state: "Running",
    os: "RHEL 9.4",
    templateLabel: "RHEL 9 (medium)",
    subnet: "frontend-public",
    primaryIp: "10.64.0.12",
    vcpu: 4,
    memoryGiB: 16,
    diskGiB: 100,
    createdDisplay: "Apr 7, 2026 · 09:05 UTC",
    zone: "edge-rack-a",
  },
  {
    id: "ci-batch",
    name: "batch-worker-01",
    state: "Stopped",
    os: "RHEL 9.4",
    templateLabel: "RHEL 9 (small)",
    subnet: "backend-private",
    primaryIp: "10.64.1.33",
    vcpu: 2,
    memoryGiB: 8,
    diskGiB: 50,
    createdDisplay: "Apr 5, 2026 · 18:40 UTC",
    zone: "edge-rack-b",
  },
  {
    id: "ci-summit",
    name: "summit-demo-vm",
    state: "Provisioning",
    os: "RHEL 9.4",
    templateLabel: "RHEL 9 (small)",
    subnet: "frontend-public",
    primaryIp: "—",
    vcpu: 2,
    memoryGiB: 8,
    diskGiB: 50,
    createdDisplay: "Apr 9, 2026 · 09:10 UTC",
    zone: "edge-rack-a",
  },
];

export const computeInstanceRunning = {
  name: "web-frontend-01",
  templateId: "tpl-rhel-9-small",
  state: "Running" as const,
  subnet: "frontend-public",
  securityGroup: "demo-frontend-sg",
  primaryIp: "10.64.0.47",
};

export const computeInstanceProvisioning = {
  name: "summit-demo-vm",
  templateId: "tpl-rhel-9-small",
  state: "Provisioning" as const,
  subnet: "frontend-public",
  securityGroup: "demo-frontend-sg",
  primaryIp: "—",
};
