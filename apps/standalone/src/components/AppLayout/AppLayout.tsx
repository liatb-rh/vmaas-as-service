import * as React from 'react';
import {
  Bullseye,
  Masthead,
  MastheadBrand,
  MastheadContent,
  MastheadMain,
  MastheadToggle,
  Page,
  PageSection,
  PageSidebar,
  PageSidebarBody,
  PageToggleButton,
  SkipToContent,
  Spinner,
} from '@patternfly/react-core';
import { BarsIcon } from '@patternfly/react-icons/dist/js/icons/bars-icon';
import { Outlet } from 'react-router-dom';

import { useTranslation } from '@vmaas-as-service/ui-kit';

import { AuthContext } from '../../context/AuthContext';
import { AppNavigation } from './AppNavigation';
import { AppToolbar } from './AppToolbar';

export default function AppLayout(): React.ReactElement {
  const { t } = useTranslation();
  const { loading } = React.useContext(AuthContext);
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);

  const onSidebarToggle = () => {
    setIsSidebarOpen((open) => !open);
  };

  if (loading) {
    return (
      <Bullseye>
        <Spinner />
      </Bullseye>
    );
  }

  const masthead = (
    <Masthead id="skeleton-masthead">
      <MastheadMain>
        <MastheadToggle>
          <PageToggleButton
            variant="plain"
            aria-label={t('Global navigation')}
            isSidebarOpen={isSidebarOpen}
            onSidebarToggle={onSidebarToggle}
            id="page-toggle-button"
          >
            <BarsIcon />
          </PageToggleButton>
        </MastheadToggle>
        <MastheadBrand>
          <span role="img" aria-label="Skeleton UI">
            {t('Skeleton UI')}
          </span>
        </MastheadBrand>
      </MastheadMain>
      <MastheadContent>
        <AppToolbar />
      </MastheadContent>
    </Masthead>
  );

  const sidebar = (
    <PageSidebar isSidebarOpen={isSidebarOpen}>
      <PageSidebarBody>
        <AppNavigation />
      </PageSidebarBody>
    </PageSidebar>
  );

  return (
    <>
      <SkipToContent href="#primary-app-container">{t('Skip to content')}</SkipToContent>
      <Page mainContainerId="primary-app-container" masthead={masthead} sidebar={sidebar}>
        <PageSection isFilled>
          <Outlet />
        </PageSection>
      </Page>
    </>
  );
}
