import * as React from 'react';
import {
  Masthead,
  MastheadBrand,
  MastheadMain,
  MastheadToggle,
  Nav,
  NavItem,
  NavList,
  Page,
  PageSection,
  PageSidebar,
  PageSidebarBody,
  PageToggleButton,
  SkipToContent,
} from '@patternfly/react-core';
import { BarsIcon } from '@patternfly/react-icons/dist/js/icons/bars-icon';
import { NavLink, Outlet } from 'react-router-dom';

import { useTranslation } from '@vmaas-as-service/ui-kit';

export function DemoLayout(): React.ReactElement {
  const { t } = useTranslation();
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);

  const sidebar = (
    <PageSidebar isSidebarOpen={isSidebarOpen}>
      <PageSidebarBody>
        <Nav aria-label={t('Demo navigation')}>
          <NavList>
            <NavItem itemId="demo-home">
              <NavLink to="/" end>
                {t('Demo home')}
              </NavLink>
            </NavItem>
            <NavItem itemId="demo-playground">
              <NavLink to="/playground">{t('Demo playground')}</NavLink>
            </NavItem>
          </NavList>
        </Nav>
      </PageSidebarBody>
    </PageSidebar>
  );

  return (
    <>
      <SkipToContent href="#demo-main">{t('Skip to content')}</SkipToContent>
      <Page
        mainContainerId="demo-main"
        masthead={
          <Masthead id="demo-masthead">
            <MastheadMain>
              <MastheadToggle>
                <PageToggleButton
                  variant="plain"
                  aria-label={t('Global navigation')}
                  isSidebarOpen={isSidebarOpen}
                  onSidebarToggle={() => setIsSidebarOpen((open) => !open)}
                >
                  <BarsIcon />
                </PageToggleButton>
              </MastheadToggle>
              <MastheadBrand>{t('Demo workspace')}</MastheadBrand>
            </MastheadMain>
          </Masthead>
        }
        sidebar={sidebar}
      >
        <PageSection isFilled>
          <Outlet />
        </PageSection>
      </Page>
    </>
  );
}
