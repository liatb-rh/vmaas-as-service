import * as React from 'react';
import {
  Button,
  EmptyState,
  EmptyStateActions,
  EmptyStateBody,
  EmptyStateFooter,
  EmptyStateVariant,
  PageSection,
} from '@patternfly/react-core';
import { PathMissingIcon } from '@patternfly/react-icons/dist/js/icons/path-missing-icon';
import { useNavigate } from 'react-router-dom';

import { useTranslation } from '@vmaas-as-service/ui-kit';

export function NotFoundPage(): React.ReactElement {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <PageSection>
      <EmptyState
        variant={EmptyStateVariant.lg}
        titleText={t('Not found')}
        headingLevel="h1"
        icon={PathMissingIcon}
      >
        <EmptyStateBody>{t('The page you are looking for does not exist.')}</EmptyStateBody>
        <EmptyStateFooter>
          <EmptyStateActions>
            <Button variant="primary" onClick={() => navigate('/')}>
              {t('Return home')}
            </Button>
          </EmptyStateActions>
        </EmptyStateFooter>
      </EmptyState>
    </PageSection>
  );
}
