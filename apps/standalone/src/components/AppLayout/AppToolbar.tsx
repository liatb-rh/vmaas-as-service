import * as React from 'react';
import { Toolbar, ToolbarContent, ToolbarGroup, ToolbarItem } from '@patternfly/react-core';

import { useTranslation } from '@vmaas-as-service/ui-kit';

import { AuthContext } from '../../context/AuthContext';

export function AppToolbar(): React.ReactElement {
  const { t } = useTranslation();
  const { username } = React.useContext(AuthContext);

  return (
    <Toolbar id="skeleton-toolbar">
      <ToolbarContent>
        <ToolbarGroup align={{ default: 'alignEnd' }}>
          <ToolbarItem>
            <span aria-label={t('Signed in user')}>{username}</span>
          </ToolbarItem>
        </ToolbarGroup>
      </ToolbarContent>
    </Toolbar>
  );
}
