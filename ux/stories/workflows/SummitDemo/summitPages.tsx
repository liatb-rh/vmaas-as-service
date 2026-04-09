import {
  Alert,
  Breadcrumb,
  BreadcrumbItem,
  Bullseye,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardTitle,
  DataList,
  DataListCell,
  DataListItem,
  DataListItemCells,
  DataListItemRow,
  DescriptionList,
  DescriptionListDescription,
  DescriptionListGroup,
  DescriptionListTerm,
  EmptyState,
  EmptyStateBody,
  EmptyStateVariant,
  Flex,
  FlexItem,
  Form,
  FormGroup,
  FormSection,
  Gallery,
  GalleryItem,
  Grid,
  GridItem,
  HelperText,
  HelperTextItem,
  Label,
  LabelGroup,
  List,
  ListItem,
  PageBreadcrumb,
  PageSection,
  Pagination,
  Progress,
  ProgressMeasureLocation,
  ProgressSize,
  ProgressVariant,
  Radio,
  SearchInput,
  Content,
  TextInput,
  Title,
  Toolbar,
  ToolbarContent,
  ToolbarGroup,
  ToolbarItem,
} from "@patternfly/react-core";
import {
  BundleIcon,
  CheckCircleIcon,
  DatabaseIcon,
  InProgressIcon,
  OsImageIcon,
  PowerOffIcon,
} from "@patternfly/react-icons";
import { Table, Tbody, Td, Th, Thead, Tr } from "@patternfly/react-table";
import { Fragment, useMemo, useState } from "react";
import {
  computeInstanceProvisioning,
  computeInstanceRunning,
  dashboardSummary,
  orgA,
  recentEvents,
  templates,
  virtualMachines,
  virtualNetwork,
  type VirtualMachineState,
} from "../../../fixtures/summit-demo";

export function PostLoginHomePage() {
  return (
    <Fragment>
      <PageSection>
        <PageBreadcrumb>
          <Breadcrumb>
            <BreadcrumbItem isActive>Home</BreadcrumbItem>
          </Breadcrumb>
        </PageBreadcrumb>
        <Title headingLevel="h1">Welcome</Title>
        <Content className="pf-v5-u-mt-md">
          <Content component="p">
            You are signed in to <strong>{orgA.displayName}</strong>. All virtual machines, networks, and
            quotas shown in this portal are scoped to your organization.
          </Content>
        </Content>
      </PageSection>
      <PageSection>
        <Grid hasGutter>
          <GridItem span={12} md={4}>
            <Card isFullHeight>
              <CardTitle>Virtual machines</CardTitle>
              <CardBody>
                <Title headingLevel="h2" size="4xl">
                  {dashboardSummary.vmCount}
                </Title>
                <Content component="small">Running and stopped instances</Content>
              </CardBody>
            </Card>
          </GridItem>
          <GridItem span={12} md={4}>
            <Card isFullHeight>
              <CardTitle>Networks</CardTitle>
              <CardBody>
                <Title headingLevel="h2" size="4xl">
                  {dashboardSummary.networkCount}
                </Title>
                <Content component="small">Virtual networks in your org</Content>
              </CardBody>
            </Card>
          </GridItem>
          <GridItem span={12} md={4}>
            <Card isFullHeight>
              <CardTitle>Next steps</CardTitle>
              <CardBody>
                <List isPlain>
                  <ListItem>
                    <Button variant="link" isInline component="a" href="#">
                      Review network topology
                    </Button>
                  </ListItem>
                  <ListItem>
                    <Button variant="link" isInline component="a" href="#">
                      Browse templates
                    </Button>
                  </ListItem>
                  <ListItem>
                    <Button variant="link" isInline component="a" href="#">
                      Create a virtual machine
                    </Button>
                  </ListItem>
                </List>
              </CardBody>
            </Card>
          </GridItem>
        </Grid>
      </PageSection>
    </Fragment>
  );
}

export function DashboardPage() {
  return (
    <Fragment>
      <PageSection>
        <Title headingLevel="h1">Dashboard</Title>
        <Content className="pf-v5-u-mt-sm" component="p">
          Summary for {orgA.displayName}.
        </Content>
      </PageSection>
      <PageSection>
        <Title headingLevel="h2" size="xl">
          Resource usage
        </Title>
        <Grid hasGutter className="pf-v5-u-mt-md">
          <GridItem span={12} md={4}>
            <Card isFullHeight>
              <CardTitle>vCPU</CardTitle>
              <CardBody>
                <Progress
                  title={`${dashboardSummary.vcpuUsed} / ${dashboardSummary.vcpuLimit} vCPU`}
                  value={(dashboardSummary.vcpuUsed / dashboardSummary.vcpuLimit) * 100}
                  measureLocation={ProgressMeasureLocation.outside}
                  size={ProgressSize.lg}
                />
              </CardBody>
            </Card>
          </GridItem>
          <GridItem span={12} md={4}>
            <Card isFullHeight>
              <CardTitle>Memory</CardTitle>
              <CardBody>
                <Progress
                  title={`${dashboardSummary.memoryGiUsed} / ${dashboardSummary.memoryGiLimit} GiB`}
                  value={(dashboardSummary.memoryGiUsed / dashboardSummary.memoryGiLimit) * 100}
                  measureLocation={ProgressMeasureLocation.outside}
                  size={ProgressSize.lg}
                />
              </CardBody>
            </Card>
          </GridItem>
          <GridItem span={12} md={4}>
            <Card isFullHeight>
              <CardTitle>Storage</CardTitle>
              <CardBody>
                <Progress
                  title={`${dashboardSummary.storageGiUsed} / ${dashboardSummary.storageGiLimit} GiB`}
                  value={(dashboardSummary.storageGiUsed / dashboardSummary.storageGiLimit) * 100}
                  measureLocation={ProgressMeasureLocation.outside}
                  size={ProgressSize.lg}
                  variant={ProgressVariant.success}
                />
              </CardBody>
            </Card>
          </GridItem>
        </Grid>
      </PageSection>
      <PageSection>
        <Title headingLevel="h2" size="xl">
          Recent activity
        </Title>
        <DataList aria-label="Recent org events" isCompact className="pf-v5-u-mt-md">
          {recentEvents.map((evt) => (
            <DataListItem key={evt.id} aria-labelledby={`evt-${evt.id}`}>
              <DataListItemRow>
                <DataListItemCells
                  dataListCells={[
                    <DataListCell key="time" width={2}>
                      <span id={`evt-${evt.id}`}>{evt.time}</span>
                    </DataListCell>,
                    <DataListCell key="msg">
                      <Flex spaceItems={{ default: "spaceItemsSm" }} alignItems={{ default: "alignItemsCenter" }}>
                        <FlexItem>
                          <Label color={evt.severity === "success" ? "green" : "blue"}>{evt.severity}</Label>
                        </FlexItem>
                        <FlexItem>{evt.message}</FlexItem>
                      </Flex>
                    </DataListCell>,
                  ]}
                />
              </DataListItemRow>
            </DataListItem>
          ))}
        </DataList>
      </PageSection>
    </Fragment>
  );
}

export function TopologyPage() {
  return (
    <Fragment>
      <PageSection>
        <Title headingLevel="h1">Network topology</Title>
        <Content className="pf-v5-u-mt-sm" component="p">
          Read-only view of your pre-provisioned network (Summit demo).
        </Content>
      </PageSection>
      <PageSection>
        <Card>
          <CardTitle>Virtual network: {virtualNetwork.name}</CardTitle>
          <CardBody>
            <DescriptionList>
              <DescriptionListGroup>
                <DescriptionListTerm>CIDR</DescriptionListTerm>
                <DescriptionListDescription>{virtualNetwork.cidr}</DescriptionListDescription>
              </DescriptionListGroup>
            </DescriptionList>
            <Title headingLevel="h3" size="lg" className="pf-v5-u-mt-lg">
              Subnets
            </Title>
            <Table aria-label="Subnets" borders>
              <Thead>
                <Tr>
                  <Th>Name</Th>
                  <Th>Role</Th>
                  <Th>CIDR</Th>
                </Tr>
              </Thead>
              <Tbody>
                {virtualNetwork.subnets.map((s) => (
                  <Tr key={s.name}>
                    <Td>{s.name}</Td>
                    <Td>{s.role}</Td>
                    <Td>{s.cidr}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
            <Title headingLevel="h3" size="lg" className="pf-v5-u-mt-lg">
              Security group: {virtualNetwork.securityGroup.name}
            </Title>
            <Table aria-label="Security group rules" borders>
              <Thead>
                <Tr>
                  <Th>Direction</Th>
                  <Th>Protocol</Th>
                  <Th>Ports</Th>
                  <Th>Source / destination</Th>
                </Tr>
              </Thead>
              <Tbody>
                {virtualNetwork.securityGroup.rules.map((r, i) => (
                  <Tr key={`${r.protocol}-${r.ports}-${i}`}>
                    <Td>{r.direction}</Td>
                    <Td>{r.protocol}</Td>
                    <Td>{r.ports}</Td>
                    <Td>{r.source}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </CardBody>
        </Card>
        <Alert
          className="pf-v5-u-mt-lg"
          variant="info"
          isInline
          title="How this maps to OpenShift networking"
        >
          <p>
            Under the hood, this topology is implemented with OpenShift <strong>user-defined networks (UDN)</strong>{" "}
            and <strong>cluster user-defined networks (CUDN)</strong>. Tenant-facing labels use VPC-style language;
            platform concepts are documented here for operators and advanced users (review with networking SMEs —
            AC-7).
          </p>
        </Alert>
      </PageSection>
    </Fragment>
  );
}

function vmStateLabel(state: VirtualMachineState) {
  switch (state) {
    case "Running":
      return (
        <Label color="green" icon={<CheckCircleIcon />}>
          Running
        </Label>
      );
    case "Stopped":
      return (
        <Label variant="outline" color="grey" icon={<PowerOffIcon />}>
          Stopped
        </Label>
      );
    case "Provisioning":
      return (
        <Label color="blue" icon={<InProgressIcon />}>
          Provisioning
        </Label>
      );
    case "Pending":
      return <Label color="orange">Pending</Label>;
    default:
      return <Label>{state}</Label>;
  }
}

export function VirtualMachinesListPage() {
  const [filter, setFilter] = useState("");
  const [page, setPage] = useState(1);
  const perPage = 10;

  const filtered = useMemo(() => {
    const q = filter.trim().toLowerCase();
    if (!q) return virtualMachines;
    return virtualMachines.filter(
      (vm) =>
        vm.name.toLowerCase().includes(q) ||
        vm.primaryIp.toLowerCase().includes(q) ||
        vm.os.toLowerCase().includes(q) ||
        vm.subnet.toLowerCase().includes(q),
    );
  }, [filter]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / perPage));
  const safePage = Math.min(page, pageCount);
  const start = (safePage - 1) * perPage;
  const pageRows = filtered.slice(start, start + perPage);

  const running = virtualMachines.filter((v) => v.state === "Running").length;
  const stopped = virtualMachines.filter((v) => v.state === "Stopped").length;
  const inFlight = virtualMachines.filter((v) => v.state === "Provisioning" || v.state === "Pending").length;

  return (
    <Fragment>
      <PageSection>
        <PageBreadcrumb>
          <Breadcrumb>
            <BreadcrumbItem isActive>Virtual machines</BreadcrumbItem>
          </Breadcrumb>
        </PageBreadcrumb>
        <Flex justifyContent={{ default: "justifyContentSpaceBetween" }} alignItems={{ default: "alignItemsFlexStart" }}>
          <FlexItem>
            <Title headingLevel="h1">Virtual machines</Title>
            <Content className="pf-v5-u-mt-sm" component="p">
              Compute instances for {orgA.displayName}. Power, networking, and lifecycle are driven by the fulfillment
              API; this list is org-scoped (AC-13).
            </Content>
          </FlexItem>
          <FlexItem>
            <Button variant="primary">Create virtual machine</Button>
          </FlexItem>
        </Flex>
      </PageSection>
      <PageSection variant="secondary" isWidthLimited={false}>
        <Grid hasGutter>
          <GridItem span={12} md={3}>
            <Card isFullHeight>
              <CardTitle>Total</CardTitle>
              <CardBody>
                <Title headingLevel="h2" size="4xl">
                  {virtualMachines.length}
                </Title>
                <Content component="small">Instances in this organization</Content>
              </CardBody>
            </Card>
          </GridItem>
          <GridItem span={12} md={3}>
            <Card isFullHeight>
              <CardTitle>Running</CardTitle>
              <CardBody>
                <Title headingLevel="h2" size="4xl">
                  {running}
                </Title>
                <Content component="small">Serving traffic</Content>
              </CardBody>
            </Card>
          </GridItem>
          <GridItem span={12} md={3}>
            <Card isFullHeight>
              <CardTitle>Stopped</CardTitle>
              <CardBody>
                <Title headingLevel="h2" size="4xl">
                  {stopped}
                </Title>
                <Content component="small">Powered off</Content>
              </CardBody>
            </Card>
          </GridItem>
          <GridItem span={12} md={3}>
            <Card isFullHeight>
              <CardTitle>In progress</CardTitle>
              <CardBody>
                <Title headingLevel="h2" size="4xl">
                  {inFlight}
                </Title>
                <Content component="small">Provisioning or pending</Content>
              </CardBody>
            </Card>
          </GridItem>
        </Grid>
      </PageSection>
      <PageSection padding={{ default: "noPadding" }}>
        <Toolbar id="vm-list-toolbar" className="pf-m-px-lg pf-m-py-md">
          <ToolbarContent>
            <ToolbarGroup variant="filter-group">
              <ToolbarItem>
                <SearchInput
                  placeholder="Filter by name, IP, OS, or subnet"
                  value={filter}
                  onChange={(_e, v) => {
                    setFilter(v);
                    setPage(1);
                  }}
                  onClear={() => {
                    setFilter("");
                    setPage(1);
                  }}
                  aria-label="Filter virtual machines"
                  style={{ width: 320 }}
                />
              </ToolbarItem>
            </ToolbarGroup>
            <ToolbarItem variant="pagination">
              <Pagination
                itemCount={filtered.length}
                page={safePage}
                perPage={perPage}
                onSetPage={(_e, next) => setPage(next)}
                onPerPageSelect={(_e, _pp, next) => setPage(next)}
                isCompact
                titles={{ paginationAriaLabel: "Virtual machines list pagination" }}
                widgetId="vm-list-pagination-top"
              />
            </ToolbarItem>
          </ToolbarContent>
        </Toolbar>
        <div className="pf-m-px-lg">
          <Table aria-label="Virtual machines" borders gridBreakPoint="">
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th>Status</Th>
                <Th>OS</Th>
                <Th>Template</Th>
                <Th>Subnet</Th>
                <Th>Primary IP</Th>
                <Th className="pf-m-text-align-right">vCPU</Th>
                <Th className="pf-m-text-align-right">Memory</Th>
                <Th>Created</Th>
                <Th>Zone</Th>
                <Th screenReaderText="Row actions" />
              </Tr>
            </Thead>
            <Tbody>
              {pageRows.length === 0 ? (
                <Tr>
                  <Td colSpan={11}>
                    <Bullseye>
                      <EmptyState variant={EmptyStateVariant.sm} titleText="No matching instances" headingLevel="h2">
                        <EmptyStateBody>Try another name, IP, or subnet keyword.</EmptyStateBody>
                      </EmptyState>
                    </Bullseye>
                  </Td>
                </Tr>
              ) : null}
              {pageRows.map((vm) => (
                <Tr key={vm.id}>
                  <Td dataLabel="Name">
                    <Button variant="link" isInline>
                      {vm.name}
                    </Button>
                  </Td>
                  <Td dataLabel="Status">{vmStateLabel(vm.state)}</Td>
                  <Td dataLabel="OS">{vm.os}</Td>
                  <Td dataLabel="Template">{vm.templateLabel}</Td>
                  <Td dataLabel="Subnet">{vm.subnet}</Td>
                  <Td dataLabel="Primary IP">
                    <span className="pf-m-font-family-monospace">{vm.primaryIp}</span>
                  </Td>
                  <Td className="pf-m-text-align-right" dataLabel="vCPU">
                    {vm.vcpu}
                  </Td>
                  <Td className="pf-m-text-align-right" dataLabel="Memory">
                    {vm.memoryGiB} GiB
                  </Td>
                  <Td dataLabel="Created">{vm.createdDisplay}</Td>
                  <Td dataLabel="Zone">{vm.zone}</Td>
                  <Td isActionCell>
                    <Flex spaceItems={{ default: "spaceItemsMd" }}>
                      <FlexItem>
                        <Button variant="link" isInline>
                          Details
                        </Button>
                      </FlexItem>
                      <FlexItem>
                        <Button variant="link" isInline isDisabled={vm.state !== "Running"}>
                          Connect
                        </Button>
                      </FlexItem>
                    </Flex>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
          <Pagination
            className="pf-v5-u-mt-md"
            variant="bottom"
            itemCount={filtered.length}
            page={safePage}
            perPage={perPage}
            onSetPage={(_e, next) => setPage(next)}
            onPerPageSelect={(_e, _pp, next) => setPage(next)}
            titles={{ paginationAriaLabel: "Virtual machines list pagination" }}
            widgetId="vm-list-pagination-bottom"
          />
        </div>
      </PageSection>
    </Fragment>
  );
}

function templateCatalogIcon(templateId: string) {
  switch (templateId) {
    case "tpl-rhel-9-medium":
      return <DatabaseIcon />;
    case "tpl-dev-sandbox":
      return <BundleIcon />;
    default:
      return <OsImageIcon />;
  }
}

/** Template catalog — tile grid aligned with `ux/reference/catalog-object.html` (Gallery + Card). */
export function TemplatesListPage() {
  const [search, setSearch] = useState("");
  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) {
      return templates;
    }
    return templates.filter(
      (t) =>
        t.title.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q) ||
        t.provider.toLowerCase().includes(q) ||
        t.tags.some((tag) => tag.toLowerCase().includes(q))
    );
  }, [search]);

  return (
    <Fragment>
      <PageSection>
        <Flex justifyContent={{ default: "justifyContentSpaceBetween" }} alignItems={{ default: "alignItemsCenter" }}>
          <FlexItem>
            <Title headingLevel="h1">Templates</Title>
            <Content className="pf-v5-u-mt-sm" component="p">
              Curated catalog for your organization.
            </Content>
          </FlexItem>
          <FlexItem>
            <Button variant="primary">Create virtual machine</Button>
          </FlexItem>
        </Flex>
      </PageSection>
      <PageSection>
        <Toolbar id="template-catalog-toolbar">
          <ToolbarContent>
            <ToolbarItem>
              <SearchInput
                placeholder="Search by name, tag, or provider"
                value={search}
                onChange={(_e, value) => setSearch(value)}
                onClear={() => setSearch("")}
                aria-label="Search templates catalog"
              />
            </ToolbarItem>
          </ToolbarContent>
        </Toolbar>
      </PageSection>
      <PageSection hasBodyWrapper={false}>
        <Gallery hasGutter minWidths={{ default: "280px", md: "300px", lg: "320px" }}>
          {filtered.map((t) => (
            <GalleryItem key={t.id}>
              <Card id={t.id} component="article" isFullHeight aria-labelledby={`${t.id}-title`}>
                <CardHeader>
                  <Flex
                    gap={{ default: "gapMd" }}
                    alignItems={{ default: "alignItemsFlexStart" }}
                    flexWrap={{ default: "nowrap" }}
                  >
                    <FlexItem>
                      <Content component="div" aria-hidden="true">
                        {templateCatalogIcon(t.id)}
                      </Content>
                    </FlexItem>
                    <FlexItem grow={{ default: "grow" }}>
                      <CardTitle component="h3">{t.title}</CardTitle>
                      <Content
                        component="p"
                        className="pf-v5-u-font-size-sm pf-v5-u-color-200 pf-v5-u-mt-xs"
                      >
                        {t.provider}
                      </Content>
                    </FlexItem>
                  </Flex>
                </CardHeader>
                <CardBody>{t.description}</CardBody>
                <CardBody>
                  <LabelGroup categoryName="Tags" aria-label="Tags" numLabels={5} defaultIsOpen={true}>
                    {t.tags.map((tag) => (
                      <Label key={tag} isCompact color="blue">
                        {tag}
                      </Label>
                    ))}
                  </LabelGroup>
                </CardBody>
                <CardFooter>
                  <Flex gap={{ default: "gapMd" }} flexWrap={{ default: "wrap" }}>
                    <FlexItem>
                      <Button variant="link" isInline component="a" href="#">
                        View details
                      </Button>
                    </FlexItem>
                    <FlexItem>
                      <Button variant="secondary">Quick create</Button>
                    </FlexItem>
                  </Flex>
                </CardFooter>
              </Card>
            </GalleryItem>
          ))}
        </Gallery>
        {filtered.length === 0 ? (
          <Bullseye className="pf-v5-u-mt-xl">
            <EmptyState variant={EmptyStateVariant.sm} titleText="No matching templates" headingLevel="h2">
              <EmptyStateBody>Try another search keyword.</EmptyStateBody>
            </EmptyState>
          </Bullseye>
        ) : null}
      </PageSection>
    </Fragment>
  );
}

export function TemplateDetailPage() {
  const t = templates[0];
  return (
    <Fragment>
      <PageSection>
        <PageBreadcrumb>
          <Breadcrumb>
            <BreadcrumbItem to="#">Templates</BreadcrumbItem>
            <BreadcrumbItem isActive>{t.title}</BreadcrumbItem>
          </Breadcrumb>
        </PageBreadcrumb>
        <Title headingLevel="h1">{t.title}</Title>
        <Content className="pf-v5-u-mt-sm" component="p">
          {t.description}
        </Content>
      </PageSection>
      <PageSection>
        <Title headingLevel="h2" size="lg">
          Defaults
        </Title>
        <DescriptionList className="pf-v5-u-mt-md">
          <DescriptionListGroup>
            <DescriptionListTerm>vCPU</DescriptionListTerm>
            <DescriptionListDescription>{t.defaults.vcpu}</DescriptionListDescription>
          </DescriptionListGroup>
          <DescriptionListGroup>
            <DescriptionListTerm>Memory</DescriptionListTerm>
            <DescriptionListDescription>{t.defaults.memoryGiB} GiB</DescriptionListDescription>
          </DescriptionListGroup>
          <DescriptionListGroup>
            <DescriptionListTerm>Disk</DescriptionListTerm>
            <DescriptionListDescription>{t.defaults.diskGiB} GiB</DescriptionListDescription>
          </DescriptionListGroup>
        </DescriptionList>
        <Title headingLevel="h2" size="lg" className="pf-v5-u-mt-lg">
          Parameters
        </Title>
        <DescriptionList className="pf-v5-u-mt-md">
          {t.parameters.map((p) => (
            <DescriptionListGroup key={p.name}>
              <DescriptionListTerm>{p.label}</DescriptionListTerm>
              <DescriptionListDescription>{p.defaultValue}</DescriptionListDescription>
            </DescriptionListGroup>
          ))}
        </DescriptionList>
        <Button className="pf-v5-u-mt-lg" variant="primary">
          Create virtual machine from template
        </Button>
      </PageSection>
    </Fragment>
  );
}

export function CreateVmStepTemplatePage() {
  return (
    <Fragment>
      <PageSection>
        <Title headingLevel="h1">Create virtual machine</Title>
        <Content className="pf-v5-u-mt-sm" component="p">
          Step 1 of 3 — Choose template and size
        </Content>
      </PageSection>
      <PageSection>
        <Form>
          <FormSection title="Template" titleElement="h2">
            <FormGroup label="Catalog template" fieldId="tpl" isRequired role="radiogroup">
              {templates.map((tpl, index) => (
                <Radio
                  key={tpl.id}
                  id={`tpl-choice-${tpl.id}`}
                  className={index > 0 ? "pf-v5-u-mt-md" : undefined}
                  name="tpl"
                  label={tpl.title}
                  description={tpl.description}
                  defaultChecked={index === 0}
                />
              ))}
            </FormGroup>
          </FormSection>
          <FormSection title="Instance naming" titleElement="h2" className="pf-v5-u-mt-xl">
            <FormGroup label="Name" fieldId="vm-name" isRequired>
              <TextInput id="vm-name" defaultValue="summit-demo-vm" aria-label="Virtual machine name" />
              <HelperText>
                <HelperTextItem>Must be unique within your organization.</HelperTextItem>
              </HelperText>
            </FormGroup>
          </FormSection>
          <FormSection className="pf-v5-u-mt-xl">
            <Button variant="primary">Next</Button>
            <Button variant="link">Cancel</Button>
          </FormSection>
        </Form>
      </PageSection>
    </Fragment>
  );
}

export function CreateVmStepNetworkPage() {
  return (
    <Fragment>
      <PageSection>
        <Title headingLevel="h1">Create virtual machine</Title>
        <Content className="pf-v5-u-mt-sm" component="p">
          Step 2 of 3 — Network and security
        </Content>
      </PageSection>
      <PageSection>
        <Form>
          <FormSection title="Network attachment" titleElement="h2">
            <FormGroup label="Subnet" fieldId="subnet" isRequired role="radiogroup">
              <Radio
                id="sub-fe"
                name="subnet"
                label="frontend-public"
                description="Public-facing subnet (10.64.0.0/24)"
                defaultChecked
              />
              <Radio
                id="sub-be"
                className="pf-v5-u-mt-md"
                name="subnet"
                label="backend-private"
                description="Private subnet (10.64.1.0/24)"
              />
            </FormGroup>
            <FormGroup className="pf-v5-u-mt-lg" label="Security group" fieldId="sg" isRequired role="radiogroup">
              <Radio id="sg-demo" name="sg" label="demo-frontend-sg" description="HTTP/HTTPS inbound from 0.0.0.0/0" defaultChecked />
            </FormGroup>
          </FormSection>
          <FormSection className="pf-v5-u-mt-xl">
            <Button variant="primary">Next</Button>
            <Button variant="secondary" className="pf-v5-u-ml-sm">
              Back
            </Button>
            <Button variant="link">Cancel</Button>
          </FormSection>
        </Form>
      </PageSection>
    </Fragment>
  );
}

export function CreateVmStepReviewPage() {
  return (
    <Fragment>
      <PageSection>
        <Title headingLevel="h1">Create virtual machine</Title>
        <Content className="pf-v5-u-mt-sm" component="p">
          Step 3 of 3 — Review
        </Content>
      </PageSection>
      <PageSection>
        <DescriptionList>
          <DescriptionListGroup>
            <DescriptionListTerm>Template</DescriptionListTerm>
            <DescriptionListDescription>{templates[0].title}</DescriptionListDescription>
          </DescriptionListGroup>
          <DescriptionListGroup>
            <DescriptionListTerm>Name</DescriptionListTerm>
            <DescriptionListDescription>summit-demo-vm</DescriptionListDescription>
          </DescriptionListGroup>
          <DescriptionListGroup>
            <DescriptionListTerm>Subnet</DescriptionListTerm>
            <DescriptionListDescription>frontend-public</DescriptionListDescription>
          </DescriptionListGroup>
          <DescriptionListGroup>
            <DescriptionListTerm>Security group</DescriptionListTerm>
            <DescriptionListDescription>demo-frontend-sg</DescriptionListDescription>
          </DescriptionListGroup>
        </DescriptionList>
        <Flex className="pf-v5-u-mt-xl" spaceItems={{ default: "spaceItemsMd" }}>
          <FlexItem>
            <Button variant="primary">Create</Button>
          </FlexItem>
          <FlexItem>
            <Button variant="secondary">Back</Button>
          </FlexItem>
          <FlexItem>
            <Button variant="link">Cancel</Button>
          </FlexItem>
        </Flex>
      </PageSection>
    </Fragment>
  );
}

export function VmProvisioningPage() {
  return (
    <Fragment>
      <PageSection>
        <PageBreadcrumb>
          <Breadcrumb>
            <BreadcrumbItem to="#">Virtual machines</BreadcrumbItem>
            <BreadcrumbItem isActive>{computeInstanceProvisioning.name}</BreadcrumbItem>
          </Breadcrumb>
        </PageBreadcrumb>
        <Flex spaceItems={{ default: "spaceItemsMd" }} alignItems={{ default: "alignItemsCenter" }}>
          <FlexItem>
            <Title headingLevel="h1">{computeInstanceProvisioning.name}</Title>
          </FlexItem>
          <FlexItem>
            <Label color="blue">{computeInstanceProvisioning.state}</Label>
          </FlexItem>
        </Flex>
      </PageSection>
      <PageSection>
        <Card>
          <CardTitle>Provisioning progress</CardTitle>
          <CardBody>
            <Progress
              value={66}
              title="Provisioning"
              measureLocation={ProgressMeasureLocation.outside}
              size={ProgressSize.lg}
            />
            <Content className="pf-v5-u-mt-md" component="p">
              States: Pending → Provisioning → Running (AC-10).
            </Content>
          </CardBody>
        </Card>
      </PageSection>
    </Fragment>
  );
}

export function VmRunningDetailPage() {
  return (
    <Fragment>
      <PageSection>
        <PageBreadcrumb>
          <Breadcrumb>
            <BreadcrumbItem to="#">Virtual machines</BreadcrumbItem>
            <BreadcrumbItem isActive>{computeInstanceRunning.name}</BreadcrumbItem>
          </Breadcrumb>
        </PageBreadcrumb>
        <Flex spaceItems={{ default: "spaceItemsMd" }} alignItems={{ default: "alignItemsCenter" }}>
          <FlexItem>
            <Title headingLevel="h1">{computeInstanceRunning.name}</Title>
          </FlexItem>
          <FlexItem>
            <Label color="green">{computeInstanceRunning.state}</Label>
          </FlexItem>
        </Flex>
      </PageSection>
      <PageSection>
        <Card>
          <CardTitle>Details</CardTitle>
          <CardBody>
            <DescriptionList>
              <DescriptionListGroup>
                <DescriptionListTerm>Template</DescriptionListTerm>
                <DescriptionListDescription>{computeInstanceRunning.templateId}</DescriptionListDescription>
              </DescriptionListGroup>
              <DescriptionListGroup>
                <DescriptionListTerm>Subnet</DescriptionListTerm>
                <DescriptionListDescription>{computeInstanceRunning.subnet}</DescriptionListDescription>
              </DescriptionListGroup>
              <DescriptionListGroup>
                <DescriptionListTerm>Security group</DescriptionListTerm>
                <DescriptionListDescription>{computeInstanceRunning.securityGroup}</DescriptionListDescription>
              </DescriptionListGroup>
              <DescriptionListGroup>
                <DescriptionListTerm>Primary IP</DescriptionListTerm>
                <DescriptionListDescription>{computeInstanceRunning.primaryIp}</DescriptionListDescription>
              </DescriptionListGroup>
            </DescriptionList>
          </CardBody>
        </Card>
        <Alert className="pf-v5-u-mt-lg" variant="info" isInline title="Serial console (fulfillment CLI)">
          <p>
            For the demo wow moment, operators use the documented <strong>fulfillment CLI</strong> command to open a
            serial console session (MGMT-22670 / AC-12).
          </p>
        </Alert>
      </PageSection>
    </Fragment>
  );
}

export function OrgBEmptyVmsPage() {
  return (
    <Fragment>
      <PageSection>
        <Title headingLevel="h1">Virtual machines</Title>
        <Content className="pf-v5-u-mt-sm" component="p">
          Organization: Pepsi (isolation demo — AC-13).
        </Content>
      </PageSection>
      <PageSection>
        <Bullseye>
          <EmptyState
            variant={EmptyStateVariant.full}
            titleText="No virtual machines"
            headingLevel="h2"
          >
            <EmptyStateBody>
              No instances are visible for this organization. Resources from other tenants never appear in this list.
            </EmptyStateBody>
          </EmptyState>
        </Bullseye>
      </PageSection>
    </Fragment>
  );
}

export function ActivityFullPage() {
  return (
    <Fragment>
      <PageSection>
        <Title headingLevel="h1">Activity</Title>
        <Content className="pf-v5-u-mt-sm" component="p">
          Org-scoped events (AC-4).
        </Content>
      </PageSection>
      <PageSection>
        <DataList aria-label="Activity feed">
          {recentEvents.map((evt) => (
            <DataListItem key={evt.id} aria-labelledby={`act-${evt.id}`}>
              <DataListItemRow>
                <DataListItemCells
                  dataListCells={[
                    <DataListCell key="t" width={2}>
                      <span id={`act-${evt.id}`}>{evt.time}</span>
                    </DataListCell>,
                    <DataListCell key="m">{evt.message}</DataListCell>,
                  ]}
                />
              </DataListItemRow>
            </DataListItem>
          ))}
        </DataList>
      </PageSection>
    </Fragment>
  );
}
