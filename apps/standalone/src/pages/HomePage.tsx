import * as React from 'react';
import {
  Card,
  CardBody,
  CardTitle,
  Content,
  Flex,
  FlexItem,
  Label,
  PageSection,
  Title,
} from '@patternfly/react-core';

import { useTranslation } from '@vmaas-as-service/ui-kit';

import { fetchHealth, fetchProxyVersion } from '../api/client';

export function HomePage(): React.ReactElement {
  const { t } = useTranslation();
  const [health, setHealth] = React.useState<{ ok: boolean; detail?: string; version?: string }>({
    ok: false,
  });

  React.useEffect(() => {
    let cancelled = false;

    async function load(): Promise<void> {
      try {
        const [h, v] = await Promise.all([fetchHealth(), fetchProxyVersion()]);
        if (!cancelled) {
          setHealth({ ok: h.status === 'ok', detail: h.time, version: `${v.name} ${v.version}` });
        }
      } catch (e) {
        if (!cancelled) {
          setHealth({ ok: false, detail: e instanceof Error ? e.message : String(e) });
        }
      }
    }

    void load();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <PageSection>
      <Flex direction={{ default: 'column' }} gap={{ default: 'gapLg' }}>
        <FlexItem>
          <Title headingLevel="h1">{t('Overview')}</Title>
          <Content>{t('PatternFly 6, React 18, webpack, and a Go dev proxy.')}</Content>
        </FlexItem>
        <FlexItem>
          <Card>
            <CardTitle>{t('API status')}</CardTitle>
            <CardBody>
              <Flex gap={{ default: 'gapMd' }} alignItems={{ default: 'alignItemsCenter' }}>
                <FlexItem>
                  <Label color={health.ok ? 'green' : 'red'}>{health.ok ? t('Proxy reachable') : t('Proxy unreachable')}</Label>
                </FlexItem>
                {health.version ? (
                  <FlexItem>
                    <Content component="small">{health.version}</Content>
                  </FlexItem>
                ) : null}
              </Flex>
              {health.detail ? (
                <Content className="pf-v5-u-mt-md" component="small">
                  {health.detail}
                </Content>
              ) : null}
              {!health.ok ? (
                <Content className="pf-v5-u-mt-md" component="p">
                  {t('Check that the dev proxy is running (port 3001 by default).')}
                </Content>
              ) : null}
            </CardBody>
          </Card>
        </FlexItem>
      </Flex>
    </PageSection>
  );
}
