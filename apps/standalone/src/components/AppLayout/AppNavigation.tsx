import * as React from 'react';
import { Nav, NavList, NavItem } from '@patternfly/react-core';
import { NavLink } from 'react-router-dom';

import { useTranslation } from '@vmaas-as-service/ui-kit';

export function AppNavigation(): React.ReactElement {
  const { t } = useTranslation();

  return (
    <Nav aria-label={t('Primary navigation')}>
      <NavList>
        <NavItem itemId="home">
          <NavLink to="/" end>
            {t('Home')}
          </NavLink>
        </NavItem>
        <NavItem itemId="about">
          <NavLink to="/about">{t('About')}</NavLink>
        </NavItem>
      </NavList>
    </Nav>
  );
}
