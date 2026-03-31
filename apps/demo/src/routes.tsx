import * as React from 'react';
import { Bullseye, EmptyState, EmptyStateBody, EmptyStateVariant, Spinner } from '@patternfly/react-core';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { APP_TITLE, ErrorBoundary, useDocumentTitle, useTranslation } from '@vmaas-as-service/ui-kit';

import { DemoLayout } from './components/DemoLayout';
import { DemoHomePage } from './pages/DemoHomePage';
import { DemoPlaygroundPage } from './pages/DemoPlaygroundPage';

const DemoNotFoundPage = React.lazy(() => import('./pages/DemoNotFoundPage').then((m) => ({ default: m.DemoNotFoundPage })));

function TitledRoute({ title, children }: React.PropsWithChildren<{ title: string }>): React.ReactElement {
  useDocumentTitle(`${APP_TITLE} | ${title}`);
  return (
    <React.Suspense
      fallback={
        <Bullseye>
          <Spinner />
        </Bullseye>
      }
    >
      <ErrorBoundary>{children}</ErrorBoundary>
    </React.Suspense>
  );
}

function RouteErrorPage(): React.ReactElement {
  const { t } = useTranslation();

  return (
    <Bullseye>
      <EmptyState variant={EmptyStateVariant.lg} status="danger" titleText={t('Something went wrong')} headingLevel="h2">
        <EmptyStateBody>{t('An unexpected error occurred.')}</EmptyStateBody>
      </EmptyState>
    </Bullseye>
  );
}

export function DemoRouter(): React.ReactElement {
  const { t } = useTranslation();

  const router = createBrowserRouter([
    {
      path: '/',
      element: <DemoLayout />,
      errorElement: <RouteErrorPage />,
      children: [
        {
          index: true,
          element: (
            <TitledRoute title={t('Demo home')}>
              <DemoHomePage />
            </TitledRoute>
          ),
        },
        {
          path: 'playground',
          element: (
            <TitledRoute title={t('Demo playground')}>
              <DemoPlaygroundPage />
            </TitledRoute>
          ),
        },
        {
          path: '*',
          element: (
            <TitledRoute title={t('Not found')}>
              <DemoNotFoundPage />
            </TitledRoute>
          ),
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}
