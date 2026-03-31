import * as React from 'react';
import { Card, CardBody, CardTitle, Form, FormGroup, PageSection, Slider, Switch, TextInput, Title } from '@patternfly/react-core';

import { useTranslation } from '@vmaas-as-service/ui-kit';

export function DemoPlaygroundPage(): React.ReactElement {
  const { t } = useTranslation();
  const [title, setTitle] = React.useState('Prototype card');
  const [isEnabled, setIsEnabled] = React.useState(true);
  const [density, setDensity] = React.useState(50);

  return (
    <PageSection>
      <Title headingLevel="h1">{t('Demo playground')}</Title>
      <Card className="pf-v5-u-mt-lg">
        <CardTitle>{title}</CardTitle>
        <CardBody>
          <Form>
            <FormGroup label={t('Card title')} fieldId="demo-title">
              <TextInput id="demo-title" value={title} onChange={(_event, value) => setTitle(value)} />
            </FormGroup>
            <FormGroup label={t('Enable feature preview')} fieldId="demo-switch">
              <Switch
                id="demo-switch"
                label={isEnabled ? t('Enabled') : t('Disabled')}
                isChecked={isEnabled}
                onChange={(_event, checked) => setIsEnabled(checked)}
              />
            </FormGroup>
            <FormGroup label={t('Layout density')} fieldId="demo-density">
              <Slider
                value={density}
                isInputVisible
                onChange={(_event, value) => setDensity(typeof value === 'number' ? value : 0)}
              />
            </FormGroup>
          </Form>
        </CardBody>
      </Card>
    </PageSection>
  );
}
