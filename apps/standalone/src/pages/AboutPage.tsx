import * as React from 'react';
import { Content, PageSection, Title } from '@patternfly/react-core';

import { useTranslation } from '@vmaas-as-service/ui-kit';

export function AboutPage(): React.ReactElement {
  const { t } = useTranslation();

  return (
    <PageSection>
      <Title headingLevel="h1">{t('About')}</Title>
      <Content className="pf-v5-u-mt-md">{t('Starter kit')}</Content>
    </PageSection>
  );
}
