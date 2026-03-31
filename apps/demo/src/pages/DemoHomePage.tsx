import * as React from 'react';
import { Card, CardBody, CardTitle, Content, EmptyState, EmptyStateBody, EmptyStateVariant, PageSection, Title } from '@patternfly/react-core';

import { useTranslation } from '@vmaas-as-service/ui-kit';

export function DemoHomePage(): React.ReactElement {
  const { t } = useTranslation();

  return (
    <PageSection>
      <Title headingLevel="h1">{t('Demo home')}</Title>
      <Content className="pf-v5-u-mt-md">{t('This app is isolated for UX experimentation and prototypes.')}</Content>
      <Card className="pf-v5-u-mt-lg">
        <CardTitle>{t('Isolation guarantees')}</CardTitle>
        <CardBody>
          <EmptyState variant={EmptyStateVariant.sm} titleText={t('No shared feature logic')} headingLevel="h2" status="info">
            <EmptyStateBody>{t('Use this app to build and test UI concepts without affecting standalone or shared domain flows.')}</EmptyStateBody>
          </EmptyState>
        </CardBody>
      </Card>
    </PageSection>
  );
}
