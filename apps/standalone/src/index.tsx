import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { Bullseye, Spinner } from '@patternfly/react-core';

import App from './App';
import './i18n';

const container = document.getElementById('root');

if (!container) {
  throw new Error('Root element #root not found');
}

const root = createRoot(container);

root.render(
  <React.StrictMode>
    <React.Suspense
      fallback={
        <Bullseye>
          <Spinner />
        </Bullseye>
      }
    >
      <App />
    </React.Suspense>
  </React.StrictMode>,
);
