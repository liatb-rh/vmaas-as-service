import * as React from 'react';
import { Bullseye, EmptyState, EmptyStateBody, EmptyStateVariant, Spinner } from '@patternfly/react-core';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { APP_TITLE, ErrorBoundary, useDocumentTitle, useTranslation } from '@vmaas-as-service/ui-kit';

import AppLayout from './components/AppLayout/AppLayout';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';

const NotFoundPage = React.lazy(() => import('./pages/NotFoundPage').then((m) => ({ default: m.NotFoundPage })));

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
      <EmptyState
        variant={EmptyStateVariant.lg}
        status="danger"
        titleText={t('Something went wrong')}
        headingLevel="h2"
      >
        <EmptyStateBody>{t('An unexpected error occurred.')}</EmptyStateBody>
      </EmptyState>
    </Bullseye>
  );
}

export function AppRouter(): React.ReactElement {
  const { t } = useTranslation();

  const router = createBrowserRouter([
    {
      path: '/',
      element: <AppLayout />,
      errorElement: <RouteErrorPage />,
      children: [
        {
          index: true,
          element: (
            <TitledRoute title={t('Home')}>
              <HomePage />
            </TitledRoute>
          ),
        },
        {
          path: 'about',
          element: (
            <TitledRoute title={t('About')}>
              <AboutPage />
            </TitledRoute>
          ),
        },
        {
          path: '*',
          element: (
            <TitledRoute title={t('Not found')}>
              <NotFoundPage />
            </TitledRoute>
          ),
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}
