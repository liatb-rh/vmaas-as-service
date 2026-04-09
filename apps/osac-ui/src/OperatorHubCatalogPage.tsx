import { useMemo, useState } from 'react'
import { AnsibleTowerIcon } from '@patternfly/react-icons/dist/esm/icons/ansible-tower-icon'
import { ChartLineIcon } from '@patternfly/react-icons/dist/esm/icons/chart-line-icon'
import { CloudIcon } from '@patternfly/react-icons/dist/esm/icons/cloud-icon'
import { CodeBranchIcon } from '@patternfly/react-icons/dist/esm/icons/code-branch-icon'
import { DatabaseIcon } from '@patternfly/react-icons/dist/esm/icons/database-icon'
import { ProjectDiagramIcon } from '@patternfly/react-icons/dist/esm/icons/project-diagram-icon'
import { ShieldAltIcon } from '@patternfly/react-icons/dist/esm/icons/shield-alt-icon'
import { StorageDomainIcon } from '@patternfly/react-icons/dist/esm/icons/storage-domain-icon'
import { VirtualMachineIcon } from '@patternfly/react-icons/dist/esm/icons/virtual-machine-icon'
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardTitle,
  Content,
  Gallery,
  GalleryItem,
  Label,
  SearchInput,
  Sidebar,
  SidebarContent,
  SidebarPanel,
  Title,
} from '@patternfly/react-core'
import { TenantVmTemplatesCatalog } from './TenantVmTemplatesCatalog'

type CatalogCategoryId =
  | 'all'
  | 'database'
  | 'big-data'
  | 'streaming-messaging'
  | 'integration-delivery'
  | 'developer-tools'
  | 'monitoring'
  | 'security'
  | 'storage'

type ProviderKind = 'redhat' | 'certified' | 'community'

type CatalogItem = {
  id: string
  name: string
  description: string
  provider: ProviderKind
  categories: CatalogCategoryId[]
  Icon: typeof DatabaseIcon
}

const CATALOG_CATEGORIES: { id: CatalogCategoryId; label: string }[] = [
  { id: 'all', label: 'All items' },
  { id: 'database', label: 'Database' },
  { id: 'big-data', label: 'Big Data' },
  { id: 'streaming-messaging', label: 'Streaming & messaging' },
  { id: 'integration-delivery', label: 'Integration & delivery' },
  { id: 'developer-tools', label: 'Developer tools' },
  { id: 'monitoring', label: 'Monitoring' },
  { id: 'security', label: 'Security' },
  { id: 'storage', label: 'Storage' },
]

const CATALOG_ITEMS: CatalogItem[] = [
  {
    id: 'postgresql',
    name: 'PostgreSQL Operator',
    description:
      'Deploy and manage PostgreSQL clusters on Kubernetes with automated failover, backups, and monitoring.',
    provider: 'redhat',
    categories: ['database'],
    Icon: DatabaseIcon,
  },
  {
    id: 'kafka',
    name: 'AMQ Streams',
    description:
      'Run Apache Kafka clusters with enterprise support, including topics, users, and mirror maker.',
    provider: 'redhat',
    categories: ['streaming-messaging', 'big-data'],
    Icon: ProjectDiagramIcon,
  },
  {
    id: 'openshift-gitops',
    name: 'OpenShift GitOps',
    description:
      'Continuous delivery using Git as the source of truth for declarative infrastructure and workloads.',
    provider: 'redhat',
    categories: ['integration-delivery', 'developer-tools'],
    Icon: CodeBranchIcon,
  },
  {
    id: 'ansible',
    name: 'Ansible Automation Platform',
    description:
      'Build and operate automation at scale with certified content, workflows, and RBAC.',
    provider: 'redhat',
    categories: ['integration-delivery', 'developer-tools'],
    Icon: AnsibleTowerIcon,
  },
  {
    id: 'ceph',
    name: 'OpenShift Data Foundation',
    description:
      'Software-defined storage for block, file, and object with data resilience and encryption.',
    provider: 'redhat',
    categories: ['storage', 'big-data'],
    Icon: StorageDomainIcon,
  },
  {
    id: 'kubevirt',
    name: 'OpenShift Virtualization',
    description:
      'Run and manage virtual machines alongside containers on OpenShift with a unified control plane.',
    provider: 'redhat',
    categories: ['developer-tools'],
    Icon: VirtualMachineIcon,
  },
  {
    id: 'prometheus',
    name: 'Community Prometheus Operator',
    description:
      'Kubernetes-native deployment and management of Prometheus, Alertmanager, and ServiceMonitor CRDs.',
    provider: 'community',
    categories: ['monitoring'],
    Icon: ChartLineIcon,
  },
  {
    id: 'vault',
    name: 'HashiCorp Vault Certified',
    description:
      'Secrets management, encryption as a service, and identity-based access for applications.',
    provider: 'certified',
    categories: ['security'],
    Icon: ShieldAltIcon,
  },
  {
    id: 'service-mesh',
    name: 'OpenShift Service Mesh',
    description:
      'Connect, observe, and secure microservices with Istio, Kiali, and distributed tracing.',
    provider: 'redhat',
    categories: ['integration-delivery', 'monitoring'],
    Icon: CloudIcon,
  },
]

function providerLabel(kind: ProviderKind): { text: string; color: 'grey' | 'teal' | 'orange' } {
  switch (kind) {
    case 'redhat':
      return { text: 'Red Hat', color: 'grey' }
    case 'certified':
      return { text: 'Certified', color: 'teal' }
    default:
      return { text: 'Community', color: 'orange' }
  }
}

function catalogCardIconColor(kind: ProviderKind): string {
  switch (kind) {
    case 'redhat':
      return '#ee0000'
    case 'certified':
      return 'var(--pf-t--chart--color--teal--300, #37a3a3)'
    default:
      return 'var(--pf-t--chart--color--red-orange--300, #f0561d)'
  }
}

export type OperatorHubCatalogPageProps = {
  variant?: 'operator-hub' | 'tenant-vm-templates'
}

export function OperatorHubCatalogPage({
  variant = 'operator-hub',
}: OperatorHubCatalogPageProps) {
  if (variant === 'tenant-vm-templates') {
    return <TenantVmTemplatesCatalog />
  }

  return <OperatorHubDefaultCatalog />
}

function OperatorHubDefaultCatalog() {
  const [category, setCategory] = useState<CatalogCategoryId>('all')
  const [search, setSearch] = useState('')

  const counts = useMemo(() => {
    const map = new Map<CatalogCategoryId, number>()
    for (const c of CATALOG_CATEGORIES) {
      map.set(c.id, 0)
    }
    for (const item of CATALOG_ITEMS) {
      for (const cat of item.categories) {
        map.set(cat, (map.get(cat) ?? 0) + 1)
      }
    }
    map.set('all', CATALOG_ITEMS.length)
    return map
  }, [])

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    return CATALOG_ITEMS.filter((item) => {
      const catOk =
        category === 'all' || item.categories.includes(category)
      const searchOk =
        !q ||
        item.name.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q)
      return catOk && searchOk
    })
  }, [category, search])

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
          Preconfigured environment for data exploration, modeling, and ML
          workflows.
        </Content>
      </div>

      <Sidebar
        className="catalog-vm-templates-sidebar"
        hasGutter
        hasBorder
        style={{ flex: '1 1 auto', minHeight: 0 }}
      >
        <SidebarPanel hasPadding variant="sticky">
          <Title headingLevel="h2" size="md" style={{ marginBottom: 'var(--pf-t--global--spacer--md)' }}>
            Categories
          </Title>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--pf-t--global--spacer--xs)',
            }}
          >
            {CATALOG_CATEGORIES.map((cat) => {
              const count = counts.get(cat.id) ?? 0
              const isActive = category === cat.id
              return (
                <Button
                  key={cat.id}
                  variant={isActive ? 'secondary' : 'plain'}
                  isBlock
                  countOptions={{ count, isRead: !isActive }}
                  style={{
                    justifyContent: 'space-between',
                    gap: 'var(--pf-t--global--spacer--lg)',
                  }}
                  onClick={() => setCategory(cat.id)}
                >
                  {cat.label}
                </Button>
              )
            })}
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
              minWidths={{ default: '240px', md: '260px', lg: '280px' }}
            >
              {filtered.map((item) => {
                const pl = providerLabel(item.provider)
                const iconColor = catalogCardIconColor(item.provider)
                const Icon = item.Icon
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
                              backgroundColor:
                                'var(--pf-t--global--background--color--secondary--default)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}
                          >
                            <Icon
                              aria-hidden
                              style={{
                                width: 24,
                                height: 24,
                                color: iconColor,
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
                              {item.name}
                            </CardTitle>
                            <Label color={pl.color} isCompact>
                              {pl.text}
                            </Label>
                          </div>
                        </div>
                      </CardHeader>
                      <CardBody style={{ paddingTop: 0 }}>
                        <Content
                          component="p"
                          style={{
                            margin: 0,
                            display: '-webkit-box',
                            WebkitLineClamp: 4,
                            WebkitBoxOrient: 'vertical' as const,
                            overflow: 'hidden',
                          }}
                        >
                          {item.description}
                        </Content>
                      </CardBody>
                      <CardFooter>
                        <Button
                          variant="link"
                          isInline
                          onClick={(e) => e.preventDefault()}
                        >
                          Install
                        </Button>
                      </CardFooter>
                    </Card>
                  </GalleryItem>
                )
              })}
            </Gallery>
            {filtered.length === 0 && (
              <Content component="p" style={{ textAlign: 'center', padding: 'var(--pf-t--global--spacer--2xl)' }}>
                No VM templates match your filters. Try another category or
                keyword.
              </Content>
            )}
          </div>
        </SidebarContent>
      </Sidebar>
    </div>
  )
}
