import {
  Label,
  Masthead,
  MastheadBrand,
  MastheadContent,
  MastheadMain,
  Nav,
  NavItem,
  NavList,
  Page,
  PageSidebar,
  PageSidebarBody,
  Toolbar,
  ToolbarContent,
  ToolbarItem,
} from "@patternfly/react-core";
import { BellIcon, UserIcon } from "@patternfly/react-icons";
import type { ReactNode } from "react";

export type TenantNavId =
  | "dashboard"
  | "topology"
  | "templates"
  | "instances"
  | "activity";

export interface TenantPortalShellProps {
  productName?: string;
  organizationDisplayName: string;
  activeNav: TenantNavId;
  children: ReactNode;
}

const navItems: { id: TenantNavId; label: string }[] = [
  { id: "dashboard", label: "Dashboard" },
  { id: "topology", label: "Network topology" },
  { id: "templates", label: "Templates" },
  { id: "instances", label: "Virtual machines" },
  { id: "activity", label: "Activity" },
];

export function TenantPortalShell({
  productName = "VM as a Service",
  organizationDisplayName,
  activeNav,
  children,
}: TenantPortalShellProps) {
  const pageNav = (
    <Nav aria-label="Tenant portal">
      <NavList>
        {navItems.map((item) => (
          <NavItem
            key={item.id}
            itemId={item.id}
            isActive={activeNav === item.id}
            preventDefault
            href="#"
          >
            {item.label}
          </NavItem>
        ))}
      </NavList>
    </Nav>
  );

  return (
    <Page
      masthead={
        <Masthead>
          <MastheadMain>
            <MastheadBrand>{productName}</MastheadBrand>
          </MastheadMain>
          <MastheadContent>
            <Toolbar id="tenant-toolbar">
              <ToolbarContent>
                <ToolbarItem>
                  <Label color="blue">{organizationDisplayName}</Label>
                </ToolbarItem>
                <ToolbarItem variant="plain">
                  <BellIcon aria-hidden />
                </ToolbarItem>
                <ToolbarItem variant="plain">
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                    <UserIcon aria-hidden />
                    Tenant user
                  </span>
                </ToolbarItem>
              </ToolbarContent>
            </Toolbar>
          </MastheadContent>
        </Masthead>
      }
      sidebar={
        <PageSidebar isSidebarOpen>
          <PageSidebarBody>{pageNav}</PageSidebarBody>
        </PageSidebar>
      }
    >
      {children}
    </Page>
  );
}
