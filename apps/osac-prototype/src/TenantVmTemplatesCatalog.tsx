import { useMemo, useState } from 'react'
import { RedhatIcon } from '@patternfly/react-icons/dist/esm/icons/redhat-icon'
import { WindowsIcon } from '@patternfly/react-icons/dist/esm/icons/windows-icon'
import { LinuxTuxIcon } from './LinuxTuxIcon'
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Checkbox,
  Content,
  ExpandableSection,
  Gallery,
  GalleryItem,
  SearchInput,
  Sidebar,
  SidebarContent,
  SidebarPanel,
  Title,
} from '@patternfly/react-core'

type CatalogCardIconProps = Pick<
  React.SVGProps<SVGSVGElement>,
  'aria-hidden' | 'style' | 'className'
>

type CatalogCardIcon = React.ComponentType<CatalogCardIconProps>

type TenantOs = 'rhel' | 'windows' | 'linux'
type TenantWorkloadKey = 'desktop' | 'high-performance' | 'server'

/** Sidebar workload checkboxes; templates list every tag they match. */
type TenantWorkloadFilterTag =
  | 'desktop'
  | 'high-performance'
  | 'server'
  | 'machine-learning'
  | 'data-processing'
  | 'analytics'

type CatalogIconAccent = 'redhat' | 'windows' | 'linux'

type TenantVmTemplate = {
  id: string
  Icon: CatalogCardIcon
  iconAccent: CatalogIconAccent
  title: string
  subtitle: string
  project: string
  bootSourcePvc: string
  workload: TenantWorkloadKey
  workloadFilterTags: TenantWorkloadFilterTag[]
  cpu: string
  memory: string
  os: TenantOs[]
}

const CATALOG_ICON_TILE_BG =
  'var(--pf-t--global--background--color--secondary--default)'

/** Icon fill for PatternFly single-color icons; Linux uses multi-color `LinuxTuxIcon` instead. */
function catalogIconColor(accent: CatalogIconAccent): string | undefined {
  switch (accent) {
    case 'redhat':
      return '#ee0000'
    case 'windows':
      return '#0078d4'
    case 'linux':
      return undefined
  }
}

const WORKLOAD_LABEL: Record<TenantWorkloadKey, string> = {
  desktop: 'Desktop',
  'high-performance': 'High performance',
  server: 'Server',
}

const WORKLOAD_FILTER_TAG_LABEL: Record<TenantWorkloadFilterTag, string> = {
  desktop: 'Desktop',
  'high-performance': 'High performance',
  server: 'Server',
  'machine-learning': 'Machine learning',
  'data-processing': 'Data processing',
  analytics: 'Analytics',
}

const TENANT_VM_TEMPLATES_SOURCE: TenantVmTemplate[] = [
  {
    id: 'rhel-ai-runtime',
    Icon: RedhatIcon,
    iconAccent: 'redhat',
    title: 'RHEL AI inference runtime',
    subtitle:
      'Enterprise-supported image for serving open models in regulated environments',
    project: 'tenant-prod',
    bootSourcePvc: 'rhel9-ai-runtime',
    workload: 'server',
    workloadFilterTags: ['server', 'machine-learning'],
    cpu: '16 vCPU',
    memory: '64 GiB',
    os: ['rhel'],
  },
  {
    id: 'vllm-serve',
    Icon: LinuxTuxIcon,
    iconAccent: 'linux',
    title: 'LLM inference (vLLM)',
    subtitle:
      'OpenAI-compatible API server for served checkpoints and LoRA adapters',
    project: 'model-serving',
    bootSourcePvc: 'cuda-vllm-base',
    workload: 'server',
    workloadFilterTags: ['server', 'machine-learning'],
    cpu: '8 vCPU',
    memory: '64 GiB',
    os: ['linux'],
  },
  {
    id: 'tensorrt-llm',
    Icon: LinuxTuxIcon,
    iconAccent: 'linux',
    title: 'TensorRT-LLM serving',
    subtitle:
      'Low-latency batching for NVIDIA GPUs with tuned KV cache and FP8 paths',
    project: 'model-serving',
    bootSourcePvc: 'tensorrt-llm-cuda',
    workload: 'high-performance',
    workloadFilterTags: ['high-performance', 'machine-learning'],
    cpu: '16 vCPU',
    memory: '128 GiB',
    os: ['linux'],
  },
  {
    id: 'pytorch-cuda-train',
    Icon: LinuxTuxIcon,
    iconAccent: 'linux',
    title: 'Ubuntu ML — PyTorch & CUDA',
    subtitle:
      'GPU drivers, cuDNN, and PyTorch for single- or multi-GPU training jobs',
    project: 'ml-training',
    bootSourcePvc: 'ubuntu2404-cuda126-pytorch',
    workload: 'high-performance',
    workloadFilterTags: ['high-performance', 'machine-learning'],
    cpu: '16 vCPU',
    memory: '128 GiB',
    os: ['linux'],
  },
  {
    id: 'jupyter-ml-suite',
    Icon: LinuxTuxIcon,
    iconAccent: 'linux',
    title: 'JupyterLab ML workbench',
    subtitle:
      'Notebooks with scikit-learn, pandas, and optional GPU-backed kernels',
    project: 'data-science',
    bootSourcePvc: 'jupyter-ml-cpu-gpu',
    workload: 'desktop',
    workloadFilterTags: ['desktop', 'machine-learning', 'analytics'],
    cpu: '8 vCPU',
    memory: '32 GiB',
    os: ['linux'],
  },
  {
    id: 'hf-finetune',
    Icon: LinuxTuxIcon,
    iconAccent: 'linux',
    title: 'Hugging Face fine-tuning',
    subtitle:
      'Transformers, PEFT/LoRA tooling, and hooks for experiment tracking',
    project: 'ml-training',
    bootSourcePvc: 'hf-transformers-train',
    workload: 'high-performance',
    workloadFilterTags: ['high-performance', 'machine-learning'],
    cpu: '32 vCPU',
    memory: '256 GiB',
    os: ['linux'],
  },
  {
    id: 'rhel-server-std',
    Icon: RedhatIcon,
    iconAccent: 'redhat',
    title: 'RHEL 9 server',
    subtitle: 'Standard enterprise Linux VM with registration helpers',
    project: 'tenant-prod',
    bootSourcePvc: 'rhel9-boot-qcow2',
    workload: 'server',
    workloadFilterTags: ['server'],
    cpu: '4 vCPU',
    memory: '16 GiB',
    os: ['rhel'],
  },
  {
    id: 'rhel-hpc',
    Icon: RedhatIcon,
    iconAccent: 'redhat',
    title: 'RHEL 9 HPC base',
    subtitle: 'MPI-friendly image with tuned profiles for compute nodes',
    project: 'research-hpc',
    bootSourcePvc: 'rhel9-hpc-boot',
    workload: 'high-performance',
    workloadFilterTags: ['high-performance', 'data-processing'],
    cpu: '16 vCPU',
    memory: '64 GiB',
    os: ['rhel'],
  },
  {
    id: 'win-desktop',
    Icon: WindowsIcon,
    iconAccent: 'windows',
    title: 'Windows 11 desktop',
    subtitle: 'GPU-ready desktop pool image with domain join hooks',
    project: 'vdi-pool-a',
    bootSourcePvc: 'win11-golden-v1',
    workload: 'desktop',
    workloadFilterTags: ['desktop'],
    cpu: '2 vCPU',
    memory: '8 GiB',
    os: ['windows'],
  },
  {
    id: 'win-server',
    Icon: WindowsIcon,
    iconAccent: 'windows',
    title: 'Windows Server 2022',
    subtitle: 'General-purpose server roles and failover clustering support',
    project: 'tenant-prod',
    bootSourcePvc: 'ws2022-boot',
    workload: 'server',
    workloadFilterTags: ['server'],
    cpu: '8 vCPU',
    memory: '32 GiB',
    os: ['windows'],
  },
  {
    id: 'ubuntu-desktop',
    Icon: LinuxTuxIcon,
    iconAccent: 'linux',
    title: 'Ubuntu 24.04 desktop',
    subtitle: 'Developer workstation with cloud-init and user-data examples',
    project: 'dev-sandbox',
    bootSourcePvc: 'ubuntu2404-desktop',
    workload: 'desktop',
    workloadFilterTags: ['desktop', 'analytics'],
    cpu: '4 vCPU',
    memory: '16 GiB',
    os: ['linux'],
  },
  {
    id: 'debian-server',
    Icon: LinuxTuxIcon,
    iconAccent: 'linux',
    title: 'Debian 12 server',
    subtitle: 'Minimal footprint web and app tier image',
    project: 'shared-services',
    bootSourcePvc: 'debian12-minimal',
    workload: 'server',
    workloadFilterTags: ['server', 'data-processing'],
    cpu: '2 vCPU',
    memory: '4 GiB',
    os: ['linux'],
  },
  {
    id: 'fedora-hpc',
    Icon: LinuxTuxIcon,
    iconAccent: 'linux',
    title: 'Fedora Scientific',
    subtitle: 'Preinstalled math stacks for batch and interactive HPC',
    project: 'research-hpc',
    bootSourcePvc: 'fedora-sci-boot',
    workload: 'high-performance',
    workloadFilterTags: ['high-performance', 'data-processing', 'analytics'],
    cpu: '32 vCPU',
    memory: '128 GiB',
    os: ['linux'],
  },
]

/** Gallery order: round-robin RHEL → Windows → Linux (Tux) so icons stay varied. */
function interleaveCatalogTemplatesByOsIcon(
  templates: TenantVmTemplate[],
): TenantVmTemplate[] {
  const rhel: TenantVmTemplate[] = []
  const windows: TenantVmTemplate[] = []
  const linux: TenantVmTemplate[] = []
  for (const t of templates) {
    if (t.iconAccent === 'redhat') rhel.push(t)
    else if (t.iconAccent === 'windows') windows.push(t)
    else linux.push(t)
  }
  const out: TenantVmTemplate[] = []
  let ir = 0
  let iw = 0
  let ik = 0
  while (ir < rhel.length || iw < windows.length || ik < linux.length) {
    if (ir < rhel.length) out.push(rhel[ir++])
    if (iw < windows.length) out.push(windows[iw++])
    if (ik < linux.length) out.push(linux[ik++])
  }
  return out
}

const TENANT_VM_TEMPLATES = interleaveCatalogTemplatesByOsIcon(
  TENANT_VM_TEMPLATES_SOURCE,
)

type OsFilters = { rhel: boolean; windows: boolean; linux: boolean }
type WorkloadFilters = {
  desktop: boolean
  highPerformance: boolean
  server: boolean
  machineLearning: boolean
  dataProcessing: boolean
  analytics: boolean
}

const initialOs: OsFilters = { rhel: false, windows: false, linux: false }
const initialWl: WorkloadFilters = {
  desktop: false,
  highPerformance: false,
  server: false,
  machineLearning: false,
  dataProcessing: false,
  analytics: false,
}

function osGroupActive(f: OsFilters): boolean {
  return f.rhel || f.windows || f.linux
}

function workloadGroupActive(f: WorkloadFilters): boolean {
  return (
    f.desktop ||
    f.highPerformance ||
    f.server ||
    f.machineLearning ||
    f.dataProcessing ||
    f.analytics
  )
}

function templateMatchesOs(t: TenantVmTemplate, f: OsFilters): boolean {
  if (!osGroupActive(f)) return true
  return t.os.some((o) => (o === 'rhel' && f.rhel) || (o === 'windows' && f.windows) || (o === 'linux' && f.linux))
}

function templateMatchesWorkload(t: TenantVmTemplate, f: WorkloadFilters): boolean {
  if (!workloadGroupActive(f)) return true
  const tags = t.workloadFilterTags
  return (
    (f.desktop && tags.includes('desktop')) ||
    (f.highPerformance && tags.includes('high-performance')) ||
    (f.server && tags.includes('server')) ||
    (f.machineLearning && tags.includes('machine-learning')) ||
    (f.dataProcessing && tags.includes('data-processing')) ||
    (f.analytics && tags.includes('analytics'))
  )
}

function specRow(label: string, value: string) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 42%) minmax(0, 1fr)',
        gap: 'var(--pf-t--global--spacer--sm)',
        fontSize: 'var(--pf-t--global--font--size--body--sm)',
        alignItems: 'baseline',
      }}
    >
      <span style={{ color: 'var(--pf-t--global--text--color--subtle)' }}>{label}</span>
      <span style={{ wordBreak: 'break-word' }}>{value}</span>
    </div>
  )
}

export function TenantVmTemplatesCatalog() {
  const [os, setOs] = useState<OsFilters>(initialOs)
  const [wl, setWl] = useState<WorkloadFilters>(initialWl)
  const [osExpanded, setOsExpanded] = useState(true)
  const [wlExpanded, setWlExpanded] = useState(true)
  const [search, setSearch] = useState('')

  const filtersActive = osGroupActive(os) || workloadGroupActive(wl)

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    return TENANT_VM_TEMPLATES.filter((item) => {
      if (!templateMatchesOs(item, os) || !templateMatchesWorkload(item, wl)) {
        return false
      }
      if (!q) return true
      const hay = [
        item.title,
        item.subtitle,
        item.project,
        item.bootSourcePvc,
        WORKLOAD_LABEL[item.workload],
        ...item.workloadFilterTags.map((tag) => WORKLOAD_FILTER_TAG_LABEL[tag]),
        item.cpu,
        item.memory,
      ]
        .join(' ')
        .toLowerCase()
      return hay.includes(q)
    })
  }, [os, wl, search])

  const clearFilters = () => {
    setOs(initialOs)
    setWl(initialWl)
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--pf-t--global--spacer--lg)',
        height: '100%',
        minHeight: 0,
      }}
    >
      <div>
        <Title headingLevel="h1" size="2xl">
          VM templates
        </Title>
        <Content
          component="p"
          style={{
            marginTop: 'var(--pf-t--global--spacer--xs)',
            maxWidth: '48rem',
            color: 'var(--pf-t--global--text--color--subtle)',
          }}
        >
          Browse templates by operating system and workload. Use checkboxes to narrow the list.
        </Content>
      </div>

      <Sidebar
        className="catalog-vm-templates-sidebar"
        hasGutter
        hasBorder
        style={{ flex: '1 1 auto', minHeight: 0 }}
      >
        <SidebarPanel hasPadding variant="sticky">
          <Title
            headingLevel="h2"
            size="md"
            style={{ marginBottom: 'var(--pf-t--global--spacer--md)' }}
          >
            Categories
          </Title>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--pf-t--global--spacer--md)',
            }}
          >
            <Button
              variant={!filtersActive ? 'secondary' : 'plain'}
              isBlock
              onClick={clearFilters}
            >
              All items
            </Button>

            <ExpandableSection
              toggleText="Operating system"
              isExpanded={osExpanded}
              onToggle={(_e, expanded) => setOsExpanded(expanded)}
              isIndented
            >
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 'var(--pf-t--global--spacer--sm)',
                }}
              >
                <Checkbox
                  id="tenant-cat-os-linux"
                  label="Linux"
                  isChecked={os.linux}
                  onChange={(_e, checked) => setOs((s) => ({ ...s, linux: checked }))}
                />
                <Checkbox
                  id="tenant-cat-os-rhel"
                  label="RHEL"
                  isChecked={os.rhel}
                  onChange={(_e, checked) => setOs((s) => ({ ...s, rhel: checked }))}
                />
                <Checkbox
                  id="tenant-cat-os-windows"
                  label="Windows"
                  isChecked={os.windows}
                  onChange={(_e, checked) => setOs((s) => ({ ...s, windows: checked }))}
                />
              </div>
            </ExpandableSection>

            <ExpandableSection
              toggleText="Workload"
              isExpanded={wlExpanded}
              onToggle={(_e, expanded) => setWlExpanded(expanded)}
              isIndented
            >
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 'var(--pf-t--global--spacer--sm)',
                }}
              >
                <Checkbox
                  id="tenant-cat-wl-analytics"
                  label="Analytics"
                  isChecked={wl.analytics}
                  onChange={(_e, checked) =>
                    setWl((s) => ({ ...s, analytics: checked }))
                  }
                />
                <Checkbox
                  id="tenant-cat-wl-data"
                  label="Data processing"
                  isChecked={wl.dataProcessing}
                  onChange={(_e, checked) =>
                    setWl((s) => ({ ...s, dataProcessing: checked }))
                  }
                />
                <Checkbox
                  id="tenant-cat-wl-desktop"
                  label="Desktop"
                  isChecked={wl.desktop}
                  onChange={(_e, checked) => setWl((s) => ({ ...s, desktop: checked }))}
                />
                <Checkbox
                  id="tenant-cat-wl-hpc"
                  label="High performance"
                  isChecked={wl.highPerformance}
                  onChange={(_e, checked) =>
                    setWl((s) => ({ ...s, highPerformance: checked }))
                  }
                />
                <Checkbox
                  id="tenant-cat-wl-ml"
                  label="Machine learning"
                  isChecked={wl.machineLearning}
                  onChange={(_e, checked) =>
                    setWl((s) => ({ ...s, machineLearning: checked }))
                  }
                />
                <Checkbox
                  id="tenant-cat-wl-server"
                  label="Server"
                  isChecked={wl.server}
                  onChange={(_e, checked) => setWl((s) => ({ ...s, server: checked }))}
                />
              </div>
            </ExpandableSection>
          </div>
        </SidebarPanel>

        <SidebarContent hasPadding>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--pf-t--global--spacer--md)',
              minHeight: 0,
            }}
          >
            <SearchInput
              placeholder="Filter by keyword..."
              value={search}
              onChange={(_e, v) => setSearch(v)}
              onClear={() => setSearch('')}
              aria-label="Filter catalog by keyword"
            />
            <Content
              component="p"
              style={{
                margin: 0,
                color: 'var(--pf-t--global--text--color--subtle)',
                fontSize: 'var(--pf-t--global--font--size--body--sm)',
              }}
            >
              {filtered.length} item{filtered.length === 1 ? '' : 's'}
            </Content>
            <Gallery
              hasGutter
              minWidths={{ default: '260px', md: '280px', lg: '300px' }}
            >
              {filtered.map((item) => {
                const Icon = item.Icon
                const iconColor = catalogIconColor(item.iconAccent)
                const isLinuxTux = item.iconAccent === 'linux'
                const iconPx = isLinuxTux ? 28 : 24
                return (
                  <GalleryItem key={item.id}>
                    <Card isFullHeight id={`catalog-${item.id}`}>
                      <CardHeader>
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'flex-start',
                            gap: 'var(--pf-t--global--spacer--md)',
                            width: '100%',
                          }}
                        >
                          <div
                            style={{
                              flexShrink: 0,
                              width: 44,
                              height: 44,
                              borderRadius: 'var(--pf-t--global--border--radius--medium)',
                              backgroundColor: CATALOG_ICON_TILE_BG,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}
                          >
                            <Icon
                              aria-hidden
                              style={{
                                width: iconPx,
                                height: iconPx,
                                flexShrink: 0,
                                ...(iconColor ? { color: iconColor } : {}),
                              }}
                            />
                          </div>
                          <div style={{ minWidth: 0, flex: 1 }}>
                            <CardTitle
                              style={{
                                fontSize: 'var(--pf-t--global--font--size--body--lg)',
                                marginBottom: 'var(--pf-t--global--spacer--xs)',
                              }}
                            >
                              {item.title}
                            </CardTitle>
                            <Content
                              component="p"
                              style={{
                                margin: 0,
                                color: 'var(--pf-t--global--text--color--subtle)',
                                fontSize: 'var(--pf-t--global--font--size--body--sm)',
                                display: '-webkit-box',
                                WebkitLineClamp: 3,
                                WebkitBoxOrient: 'vertical' as const,
                                overflow: 'hidden',
                              }}
                            >
                              {item.subtitle}
                            </Content>
                          </div>
                        </div>
                      </CardHeader>
                      <CardBody
                        style={{
                          paddingTop: 0,
                          display: 'flex',
                          flexDirection: 'column',
                          gap: 'var(--pf-t--global--spacer--sm)',
                        }}
                      >
                        {specRow('Project', item.project)}
                        {specRow('Boot source PVC', item.bootSourcePvc)}
                        {specRow('Workload', WORKLOAD_LABEL[item.workload])}
                        {specRow('CPU', item.cpu)}
                        {specRow('Memory', item.memory)}
                      </CardBody>
                    </Card>
                  </GalleryItem>
                )
              })}
            </Gallery>
            {filtered.length === 0 && (
              <Content
                component="p"
                style={{
                  textAlign: 'center',
                  padding: 'var(--pf-t--global--spacer--2xl)',
                }}
              >
                No VM templates match your filters. Try clearing categories or
                adjusting your keyword.
              </Content>
            )}
          </div>
        </SidebarContent>
      </Sidebar>
    </div>
  )
}
