import { useEffect, useState } from 'react'
import { BarsIcon } from '@patternfly/react-icons/dist/esm/icons/bars-icon'
import { BellIcon } from '@patternfly/react-icons/dist/esm/icons/bell-icon'
import { CogIcon } from '@patternfly/react-icons/dist/esm/icons/cog-icon'
import { CrownIcon } from '@patternfly/react-icons/dist/esm/icons/crown-icon'
import { HomeIcon } from '@patternfly/react-icons/dist/esm/icons/home-icon'
import { MoonIcon } from '@patternfly/react-icons/dist/esm/icons/moon-icon'
import { OutlinedCloneIcon } from '@patternfly/react-icons/dist/esm/icons/outlined-clone-icon'
import { OutlinedQuestionCircleIcon } from '@patternfly/react-icons/dist/esm/icons/outlined-question-circle-icon'
import { PficonTemplateIcon } from '@patternfly/react-icons/dist/esm/icons/pficon-template-icon'
import { SunIcon } from '@patternfly/react-icons/dist/esm/icons/sun-icon'
import { UserIcon } from '@patternfly/react-icons/dist/esm/icons/user-icon'
import { UsersIcon } from '@patternfly/react-icons/dist/esm/icons/users-icon'
import { VirtualMachineIcon } from '@patternfly/react-icons/dist/esm/icons/virtual-machine-icon'
import { WindowsIcon } from '@patternfly/react-icons/dist/esm/icons/windows-icon'
import { LinuxIcon } from '@patternfly/react-icons/dist/esm/icons/linux-icon'
import redHatHatLogo from './assets/Logo-RedHat-Hat-Color-RGB.svg'
import { ApexSystemsMastheadLogo } from './ApexSystemsMastheadLogo'
import { OperatorHubCatalogPage } from './OperatorHubCatalogPage'
import { OsacLandingPage } from './OsacLandingPage'
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Content,
  Dropdown,
  DropdownItem,
  DropdownList,
  Form,
  FormGroup,
  FormSelect,
  FormSelectOption,
  Masthead,
  MastheadBrand,
  MastheadContent,
  MastheadLogo,
  MastheadMain,
  MastheadToggle,
  MenuToggle,
  Modal,
  ModalBody,
  ModalVariant,
  Nav,
  NavExpandable,
  NavItem,
  NavList,
  Page,
  PageSection,
  PageSidebar,
  PageSidebarBody,
  PageToggleButton,
  Radio,
  Title,
  ToggleGroup,
  ToggleGroupItem,
  Toolbar,
  ToolbarContent,
  ToolbarGroup,
  ToolbarItem,
  Wizard,
  WizardFooter,
  WizardHeader,
  WizardStep,
} from '@patternfly/react-core'

const vmCreationCardOptions = [
  {
    method: 'new' as const,
    cardId: 'vm-create-new-card',
    inputId: 'vm-creation-new',
    title: 'New virtual machine',
    description:
      'Create a new VM by selecting an operating system and the right performance for your workload.',
    ariaLabel: 'Select new virtual machine',
    Icon: VirtualMachineIcon,
  },
  {
    method: 'template' as const,
    cardId: 'vm-create-template-card',
    inputId: 'vm-creation-template',
    title: 'Create from template',
    description:
      'Create a pre-configured VM using standardized images. This option requires an existing template.',
    ariaLabel: 'Select create from template',
    Icon: PficonTemplateIcon,
  },
  {
    method: 'clone' as const,
    cardId: 'vm-create-clone-card',
    inputId: 'vm-creation-clone',
    title: 'Clone existing virtual machine',
    description: 'Create a copy of an existing virtual machine.',
    ariaLabel: 'Select clone existing virtual machine',
    Icon: OutlinedCloneIcon,
  },
]

type GuestOsFamily = 'rhel' | 'windows' | 'other-linux'

const guestOsTypeOptions: Record<
  GuestOsFamily,
  { value: string; label: string }[]
> = {
  rhel: [
    { value: 'rhel-9-5', label: 'Red Hat Enterprise Linux 9.5' },
    { value: 'rhel-9-4', label: 'Red Hat Enterprise Linux 9.4' },
    { value: 'rhel-8-10', label: 'Red Hat Enterprise Linux 8.10' },
  ],
  windows: [
    { value: 'win-srv-2025', label: 'Microsoft Windows Server 2025' },
    { value: 'win-srv-2022', label: 'Microsoft Windows Server 2022' },
    { value: 'win-11', label: 'Microsoft Windows 11' },
  ],
  'other-linux': [
    { value: 'ubuntu-2404', label: 'Ubuntu 24.04 LTS' },
    { value: 'debian-12', label: 'Debian 12' },
    { value: 'fedora-41', label: 'Fedora 41' },
    { value: 'centos-stream-9', label: 'CentOS Stream 9' },
  ],
}

const guestOsFamilyCards: {
  family: GuestOsFamily
  cardId: string
  inputId: string
  title: string
  description: string
  ariaLabel: string
}[] = [
  {
    family: 'rhel',
    cardId: 'guest-os-rhel-card',
    inputId: 'guest-os-rhel',
    title: 'RHEL',
    description:
      'Red Hat Enterprise Linux for production workloads with long-term support.',
    ariaLabel: 'Select Red Hat Enterprise Linux',
  },
  {
    family: 'windows',
    cardId: 'guest-os-windows-card',
    inputId: 'guest-os-windows',
    title: 'Microsoft Windows',
    description:
      'Windows Server or client images for Microsoft-based applications.',
    ariaLabel: 'Select Microsoft Windows',
  },
  {
    family: 'other-linux',
    cardId: 'guest-os-other-linux-card',
    inputId: 'guest-os-other-linux',
    title: 'Other Linux',
    description:
      'Community and third-party Linux distributions such as Ubuntu or Debian.',
    ariaLabel: 'Select other Linux distribution',
  },
]

type AppShellRole = 'provider-admin' | 'tenant-admin' | 'tenant-user'

type ShellNavRow =
  | { kind: 'link'; id: string; label: string }
  | {
      kind: 'expand'
      label: string
      groupId: string
      children: { id: string; label: string }[]
    }

const shellNavByRole: Record<AppShellRole, ShellNavRow[]> = {
  'provider-admin': [
    { kind: 'link', id: 'dashboard', label: 'Dashboard' },
    {
      kind: 'expand',
      label: 'Infrastructure',
      groupId: 'nav-provider-infra',
      children: [
        { id: 'infra-overview', label: 'Overview' },
        { id: 'infra-capacity', label: 'Capacity planning' },
        { id: 'infra-integrations', label: 'Integrations' },
      ],
    },
    { kind: 'link', id: 'org-mgmt', label: 'Organization Management' },
    { kind: 'link', id: 'resource-governance', label: 'Resource governance' },
    { kind: 'link', id: 'catalog-mgmt', label: 'Catalog management' },
  ],
  'tenant-admin': [
    { kind: 'link', id: 'dashboard', label: 'Dashboard' },
    {
      kind: 'expand',
      label: 'Team management',
      groupId: 'nav-tenant-admin-team',
      children: [
        { id: 'team-members', label: 'Members' },
        { id: 'team-roles', label: 'Roles' },
        { id: 'team-groups', label: 'Groups' },
      ],
    },
    { kind: 'link', id: 'project-mgmt', label: 'Project management' },
    { kind: 'link', id: 'custom-catalog', label: 'Custom catalog' },
  ],
  'tenant-user': [
    { kind: 'link', id: 'dashboard', label: 'Dashboard' },
    {
      kind: 'expand',
      label: 'Compute',
      groupId: 'nav-tenant-user-compute',
      children: [
        { id: 'compute-vms', label: 'Virtual machines' },
        { id: 'compute-pools', label: 'Resource pools' },
      ],
    },
    { kind: 'link', id: 'networking', label: 'Networking' },
    { kind: 'link', id: 'catalog', label: 'Catalog' },
  ],
}

const catalogNavItemIds: Record<AppShellRole, string> = {
  'provider-admin': 'catalog-mgmt',
  'tenant-admin': 'custom-catalog',
  'tenant-user': 'catalog',
}

const shellRoles: AppShellRole[] = ['provider-admin', 'tenant-admin', 'tenant-user']

const roleMastheadLabels: Record<AppShellRole, string> = {
  'provider-admin': 'Provider admin',
  'tenant-admin': 'Tenant admin',
  'tenant-user': 'Tenant user',
}

const roleMastheadIcons: Record<AppShellRole, typeof CrownIcon> = {
  'provider-admin': CrownIcon,
  'tenant-admin': UsersIcon,
  'tenant-user': UserIcon,
}

function roleMastheadIcon(role: AppShellRole) {
  const Icon = roleMastheadIcons[role]
  return (
    <Icon
      aria-hidden
      style={{
        width: '1rem',
        height: '1rem',
        color: 'var(--pf-t--global--icon--color--regular)',
      }}
    />
  )
}

const dashboardSubtitleByRole: Record<AppShellRole, string> = {
  'provider-admin': 'This is for the Provider admin.',
  'tenant-admin': 'This is for the Tenant admin.',
  'tenant-user': 'This is for the Tenant user.',
}

/** Matches the role card descriptions on the welcome page. */
const dashboardRoleBlurbByRole: Record<AppShellRole, string> = {
  'provider-admin':
    'Manage platform services, tenants, and global policies for the OSAC environment.',
  'tenant-admin':
    'Configure organization resources, users, quotas, and shared services.',
  'tenant-user':
    'Access the VM-as-a-Service workspace to create and manage your virtual machines.',
}

function getExpandableChildIds(role: AppShellRole): string[] {
  const rows = shellNavByRole[role]
  const expand = rows.find((r): r is Extract<ShellNavRow, { kind: 'expand' }> => r.kind === 'expand')
  return expand ? expand.children.map((c) => c.id) : []
}

function App() {
  const [appShellRole, setAppShellRole] = useState<AppShellRole | null>(null)
  const [activeItem, setActiveItem] = useState<string | number>('dashboard')
  const [isDarkTheme, setIsDarkTheme] = useState(true)
  const [roleMenuOpen, setRoleMenuOpen] = useState(false)
  const [resourcesNavExpanded, setResourcesNavExpanded] = useState(true)
  const [isCreateVmWizardOpen, setIsCreateVmWizardOpen] = useState(false)
  const [createVmWizardKey, setCreateVmWizardKey] = useState(0)
  const [vmCreationMethod, setVmCreationMethod] = useState<
    'new' | 'template' | 'clone' | null
  >(null)
  const [guestOsFamily, setGuestOsFamily] = useState<GuestOsFamily | null>(null)
  const [guestOsType, setGuestOsType] = useState('')
  const [bootSourceChoice, setBootSourceChoice] = useState<
    'boot-volume' | 'no-boot-source' | null
  >(null)

  const closeCreateVmWizard = () => setIsCreateVmWizardOpen(false)

  const resetVmWizardState = () => {
    setIsCreateVmWizardOpen(false)
    setVmCreationMethod(null)
    setGuestOsFamily(null)
    setGuestOsType('')
    setBootSourceChoice(null)
    setCreateVmWizardKey((k) => k + 1)
  }

  useEffect(() => {
    document.documentElement.classList.toggle('pf-v6-theme-dark', isDarkTheme)
  }, [isDarkTheme])

  if (appShellRole === null) {
    return (
      <OsacLandingPage
        isDarkTheme={isDarkTheme}
        onSelectLightTheme={() => setIsDarkTheme(false)}
        onSelectDarkTheme={() => setIsDarkTheme(true)}
        onEnterProviderAdmin={() => {
          resetVmWizardState()
          setActiveItem('dashboard')
          setAppShellRole('provider-admin')
        }}
        onEnterTenantAdmin={() => {
          resetVmWizardState()
          setActiveItem('dashboard')
          setAppShellRole('tenant-admin')
        }}
        onEnterTenantUser={() => {
          resetVmWizardState()
          setActiveItem('dashboard')
          setAppShellRole('tenant-user')
        }}
      />
    )
  }

  const isTenantUserShell = appShellRole === 'tenant-user'
  const usesApexMastheadBranding =
    appShellRole === 'tenant-admin' || appShellRole === 'tenant-user'

  const shellNavRows = shellNavByRole[appShellRole]
  const expandableChildIds = getExpandableChildIds(appShellRole)
  const isExpandableGroupActive = expandableChildIds.includes(String(activeItem))
  const catalogNavId = catalogNavItemIds[appShellRole]
  const showCatalogPage = activeItem === catalogNavId

  const masthead = (
    <Masthead>
      <MastheadMain>
        <MastheadToggle>
          <PageToggleButton variant="plain" aria-label="Global navigation">
            <BarsIcon />
          </PageToggleButton>
        </MastheadToggle>
        <MastheadLogo
          href="#"
          className={usesApexMastheadBranding ? 'osac-apex-masthead-logo' : undefined}
          onClick={(e) => e.preventDefault()}
        >
          <MastheadBrand>
            {usesApexMastheadBranding ? (
              <ApexSystemsMastheadLogo />
            ) : (
              <img
                src={redHatHatLogo}
                alt="Red Hat"
                style={{
                  display: 'block',
                  height:
                    'calc(var(--pf-v6-c-masthead__logo--MaxHeight, 2.375rem) - 0.1875rem)',
                  width: 'auto',
                  maxHeight: '100%',
                }}
              />
            )}
          </MastheadBrand>
        </MastheadLogo>
      </MastheadMain>
      <MastheadContent>
        <Toolbar ouiaId="masthead-utilities-toolbar">
          <ToolbarContent alignItems="center">
            <ToolbarGroup
              align={{ default: 'alignEnd' }}
              variant="action-group-plain"
              gap={{ default: 'gapSm' }}
            >
              <ToolbarItem>
                <Button
                  variant="plain"
                  aria-label="Notifications"
                  onClick={(e) => e.preventDefault()}
                >
                  <BellIcon />
                </Button>
              </ToolbarItem>
              <ToolbarItem>
                <Button
                  variant="plain"
                  aria-label="Help"
                  onClick={(e) => e.preventDefault()}
                >
                  <OutlinedQuestionCircleIcon />
                </Button>
              </ToolbarItem>
              <ToolbarItem>
                <Button
                  variant="plain"
                  aria-label="Settings"
                  onClick={(e) => e.preventDefault()}
                >
                  <CogIcon />
                </Button>
              </ToolbarItem>
              <ToolbarItem>
                <Dropdown
                  isOpen={roleMenuOpen}
                  onOpenChange={setRoleMenuOpen}
                  onSelect={() => setRoleMenuOpen(false)}
                  toggle={(toggleRef) => (
                    <MenuToggle
                      ref={toggleRef}
                      className="osac-masthead-role-toggle"
                      variant="plainText"
                      size="sm"
                      isExpanded={roleMenuOpen}
                      onClick={() => setRoleMenuOpen((open) => !open)}
                      aria-label={`Current role: ${roleMastheadLabels[appShellRole]}. Open menu to switch role.`}
                      icon={roleMastheadIcon(appShellRole)}
                    >
                      {roleMastheadLabels[appShellRole]}
                    </MenuToggle>
                  )}
                >
                  <DropdownList>
                    {shellRoles
                      .filter((r) => r !== appShellRole)
                      .map((role) => (
                        <DropdownItem
                          key={role}
                          value={role}
                          icon={roleMastheadIcon(role)}
                          onClick={() => {
                            resetVmWizardState()
                            setAppShellRole(role)
                            setActiveItem('dashboard')
                            setRoleMenuOpen(false)
                          }}
                        >
                          {roleMastheadLabels[role]}
                        </DropdownItem>
                      ))}
                  </DropdownList>
                </Dropdown>
              </ToolbarItem>
            </ToolbarGroup>
          </ToolbarContent>
        </Toolbar>
      </MastheadContent>
    </Masthead>
  )

  const sidebar = (
    <PageSidebar>
      <PageSidebarBody isFilled>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100%',
            gap: 'var(--pf-t--global--spacer--md)',
          }}
        >
          <Nav
            className="osac-app-shell-nav"
            aria-label="Primary"
            onSelect={(_e, item) => setActiveItem(item.itemId)}
          >
            <NavList>
              {shellNavRows.map((row) =>
                row.kind === 'link' ? (
                  <NavItem
                    key={row.id}
                    itemId={row.id}
                    isActive={activeItem === row.id}
                    to="#"
                    preventDefault
                  >
                    {row.label}
                  </NavItem>
                ) : (
                  <NavExpandable
                    key={row.groupId}
                    title={row.label}
                    groupId={row.groupId}
                    isExpanded={resourcesNavExpanded}
                    onExpand={(_event, expanded) => setResourcesNavExpanded(expanded)}
                    isActive={isExpandableGroupActive}
                  >
                    {row.children.map((child) => (
                      <NavItem
                        key={child.id}
                        itemId={child.id}
                        groupId={row.groupId}
                        isActive={activeItem === child.id}
                        to="#"
                        preventDefault
                      >
                        {child.label}
                      </NavItem>
                    ))}
                  </NavExpandable>
                ),
              )}
            </NavList>
          </Nav>
          <div
            style={{
              marginTop: 'auto',
              alignSelf: 'stretch',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              gap: 'var(--pf-t--global--spacer--md)',
            }}
          >
            <Button
              variant="plain"
              icon={<HomeIcon />}
              iconPosition="start"
              onClick={() => {
                resetVmWizardState()
                setAppShellRole(null)
              }}
              aria-label="Home — return to role selection"
            >
              Home
            </Button>
            <ToggleGroup aria-label="Color theme">
              <ToggleGroupItem
                icon={<SunIcon />}
                aria-label="Light mode"
                isSelected={!isDarkTheme}
                onChange={(_event, selected) => selected && setIsDarkTheme(false)}
              />
              <ToggleGroupItem
                icon={<MoonIcon />}
                aria-label="Dark mode"
                isSelected={isDarkTheme}
                onChange={(_event, selected) => selected && setIsDarkTheme(true)}
              />
            </ToggleGroup>
          </div>
        </div>
      </PageSidebarBody>
    </PageSidebar>
  )

  return (
    <Page masthead={masthead} sidebar={sidebar} isManagedSidebar isContentFilled>
      <PageSection isFilled className="osac-page-main-section">
        {showCatalogPage ? (
          <OperatorHubCatalogPage
            variant={
              isTenantUserShell ? 'tenant-vm-templates' : 'operator-hub'
            }
          />
        ) : (
          <>
            <div className="osac-dashboard-welcome">
              <div className="osac-dashboard-welcome__header">
                <Title headingLevel="h1" style={{ margin: 0 }}>
                  Welcome
                </Title>
              </div>
              <Content
                className="osac-dashboard-welcome__intro"
                component="p"
              >
                {dashboardSubtitleByRole[appShellRole]}{' '}
                {dashboardRoleBlurbByRole[appShellRole]}
              </Content>
              <div className="osac-dashboard-welcome__cta">
                {isTenantUserShell ? (
                  <Button
                    variant="primary"
                    onClick={() => {
                      setVmCreationMethod(null)
                      setGuestOsFamily(null)
                      setGuestOsType('')
                      setBootSourceChoice(null)
                      setCreateVmWizardKey((k) => k + 1)
                      setIsCreateVmWizardOpen(true)
                    }}
                  >
                    Create virtual machine
                  </Button>
                ) : null}
              </div>
            </div>
          </>
        )}
      </PageSection>

      {isTenantUserShell ? (
      <Modal
        isOpen={isCreateVmWizardOpen}
        variant={ModalVariant.large}
        ouiaId="create-vm-wizard-modal"
        aria-labelledby="create-vm-wizard-title"
        onEscapePress={() => closeCreateVmWizard()}
      >
        <ModalBody
          style={{
            display: 'flex',
            flexDirection: 'column',
            flex: '1 1 auto',
            minHeight: 'min(88vh, 47.625rem)',
            maxHeight: 'min(90vh, 52rem)',
            padding: 0,
            overflow: 'hidden',
          }}
        >
          <Wizard
            key={createVmWizardKey}
            height="min(88vh, 47.625rem)"
            style={{
              flex: '1 1 auto',
              minHeight: 0,
              width: '100%',
            }}
            header={
              <WizardHeader
                title="Create virtual machine"
                titleId="create-vm-wizard-title"
                onClose={closeCreateVmWizard}
                closeButtonAriaLabel="Close wizard"
              />
            }
            onClose={closeCreateVmWizard}
            onSave={closeCreateVmWizard}
          footer={(activeStep, onNext, onBack, onClose) => (
            <WizardFooter
              activeStep={activeStep}
              onNext={onNext}
              onBack={onBack}
              onClose={onClose}
              nextButtonText={
                activeStep?.id === 'review-create'
                  ? 'Create virtual machine'
                  : 'Next'
              }
              isBackDisabled={activeStep?.index === 1}
              isNextDisabled={
                (activeStep?.id === 'deployment' &&
                  vmCreationMethod === null) ||
                (activeStep?.id === 'guest-os' &&
                  vmCreationMethod === 'new' &&
                  (!guestOsFamily || !guestOsType)) ||
                (activeStep?.id === 'boot-source' && bootSourceChoice === null)
              }
            />
          )}
        >
          <WizardStep id="deployment" name="Deployment details">
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--pf-t--global--spacer--lg)',
              }}
            >
              <Title headingLevel="h3">Select a creation method</Title>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
                  columnGap: 'var(--pf-t--global--spacer--md)',
                  rowGap: 'var(--pf-t--global--spacer--md)',
                  width: '100%',
                }}
              >
                {vmCreationCardOptions.map(
                  ({
                    method,
                    cardId,
                    inputId,
                    title,
                    description,
                    ariaLabel,
                    Icon,
                  }) => (
                    <div key={method} style={{ minWidth: 0 }}>
                      <Card
                        id={cardId}
                        isFullHeight
                        isSelectable
                        isSelected={vmCreationMethod === method}
                      >
                        <CardHeader
                          selectableActions={{
                            variant: 'single',
                            name: 'vm-creation-method',
                            selectableActionId: inputId,
                            selectableActionAriaLabel: ariaLabel,
                            onChange: (_, checked) =>
                              checked && setVmCreationMethod(method),
                          }}
                        >
                          <Icon
                            aria-hidden
                            style={{
                              width: '2rem',
                              height: '2rem',
                            }}
                          />
                        </CardHeader>
                        <CardTitle>{title}</CardTitle>
                        <CardBody>
                          <Content component="p">{description}</Content>
                        </CardBody>
                      </Card>
                    </div>
                  ),
                )}
              </div>
            </div>
          </WizardStep>
          <WizardStep id="guest-os" name="Guest operating system">
            {vmCreationMethod === 'new' ? (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 'var(--pf-t--global--spacer--lg)',
                }}
              >
                <div>
                  <Title headingLevel="h3">Guest operating system</Title>
                  <Content
                    component="p"
                    style={{
                      marginTop: 'var(--pf-t--global--spacer--xs)',
                      color: 'var(--pf-t--global--text--color--subtle)',
                    }}
                  >
                    Select the guest operating system to be installed on your
                    virtual machine.
                  </Content>
                </div>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
                    columnGap: 'var(--pf-t--global--spacer--md)',
                    rowGap: 'var(--pf-t--global--spacer--md)',
                    width: '100%',
                  }}
                >
                  {guestOsFamilyCards.map(
                    ({
                      family,
                      cardId,
                      inputId,
                      title,
                      description,
                      ariaLabel,
                    }) => (
                      <div key={family} style={{ minWidth: 0 }}>
                        <Card
                          id={cardId}
                          isFullHeight
                          isSelectable
                          isSelected={guestOsFamily === family}
                        >
                          <CardHeader
                            selectableActions={{
                              variant: 'single',
                              name: 'guest-os-family',
                              selectableActionId: inputId,
                              selectableActionAriaLabel: ariaLabel,
                              onChange: (_, checked) => {
                                if (checked) {
                                  setGuestOsFamily(family)
                                  setGuestOsType('')
                                }
                              },
                            }}
                          >
                            {family === 'rhel' && (
                              <img
                                src={redHatHatLogo}
                                alt=""
                                aria-hidden
                                style={{
                                  display: 'block',
                                  height: 36,
                                  width: 'auto',
                                }}
                              />
                            )}
                            {family === 'windows' && (
                              <WindowsIcon
                                aria-hidden
                                style={{
                                  width: 36,
                                  height: 36,
                                  color:
                                    'var(--pf-t--global--palette--blue-400)',
                                }}
                              />
                            )}
                            {family === 'other-linux' && (
                              <LinuxIcon
                                aria-hidden
                                style={{
                                  width: 36,
                                  height: 36,
                                  color:
                                    'var(--pf-t--global--palette--gold-400)',
                                }}
                              />
                            )}
                          </CardHeader>
                          <CardTitle>{title}</CardTitle>
                          <CardBody>
                            <Content component="p">{description}</Content>
                          </CardBody>
                        </Card>
                      </div>
                    ),
                  )}
                </div>
                <Form>
                  <FormGroup
                    label="Guest operating system type"
                    fieldId="guest-os-type"
                  >
                    <FormSelect
                      id="guest-os-type"
                      value={guestOsType}
                      isDisabled={guestOsFamily === null}
                      onChange={(_, value) => setGuestOsType(value)}
                      aria-label="Guest operating system type"
                    >
                      <FormSelectOption
                        value=""
                        label={
                          guestOsFamily === null
                            ? 'Select a guest operating system first'
                            : 'Select a type'
                        }
                        isPlaceholder
                      />
                      {guestOsFamily !== null &&
                        guestOsTypeOptions[guestOsFamily].map((opt) => (
                          <FormSelectOption
                            key={opt.value}
                            value={opt.value}
                            label={opt.label}
                          />
                        ))}
                    </FormSelect>
                  </FormGroup>
                </Form>
              </div>
            ) : (
              <Content component="p">
                Choose the guest operating system. (Add your form fields here.)
              </Content>
            )}
          </WizardStep>
          <WizardStep id="boot-source" name="Boot source">
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--pf-t--global--spacer--lg)',
              }}
            >
              <div>
                <Title headingLevel="h3" id="boot-source-step-title">
                  Boot source
                </Title>
                <Content
                  component="p"
                  style={{
                    marginTop: 'var(--pf-t--global--spacer--xs)',
                    color: 'var(--pf-t--global--text--color--subtle)',
                  }}
                >
                  Choose how the virtual machine will start. You can select a
                  bootable disk now or configure storage after creation.
                </Content>
              </div>
              <Form>
                <div
                  role="radiogroup"
                  aria-labelledby="boot-source-step-title"
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 'var(--pf-t--global--spacer--md)',
                  }}
                >
                  <Radio
                    id="boot-source-boot-volume"
                    name="boot-source-choice"
                    isLabelWrapped
                    label="Boot volume"
                    description={
                      <Content component="p">
                        Start your VM with an existing disk image or volume from
                        your project.
                      </Content>
                    }
                    isChecked={bootSourceChoice === 'boot-volume'}
                    onChange={(_, checked) =>
                      checked && setBootSourceChoice('boot-volume')
                    }
                  />
                  <Radio
                    id="boot-source-none"
                    name="boot-source-choice"
                    isLabelWrapped
                    label="No boot source"
                    description={
                      <Content component="p">
                        Create an empty virtual machine. You can mount an ISO or
                        attach storage during the customization step.
                      </Content>
                    }
                    isChecked={bootSourceChoice === 'no-boot-source'}
                    onChange={(_, checked) =>
                      checked && setBootSourceChoice('no-boot-source')
                    }
                  />
                </div>
              </Form>
            </div>
          </WizardStep>
          <WizardStep id="compute" name="Compute resources">
            <Content component="p">
              Define CPU, memory, and instance size. (Add your form fields here.)
            </Content>
          </WizardStep>
          <WizardStep id="customization" name="Customization">
            <Content component="p">
              Optional hostname, cloud-init, or other customization. (Add your
              form fields here.)
            </Content>
          </WizardStep>
          <WizardStep id="review-create" name="Review and create">
            <Content component="p">
              Review your choices, then create the virtual machine.
            </Content>
          </WizardStep>
        </Wizard>
        </ModalBody>
      </Modal>
      ) : null}
    </Page>
  )
}

export default App
