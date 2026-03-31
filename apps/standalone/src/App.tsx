import * as React from 'react';

import '@patternfly/react-core/dist/styles/base.css';
import '@patternfly/react-styles/css/utilities/Spacing/spacing.css';
import '@patternfly/react-styles/css/utilities/Text/text.css';

import { AppRouter } from './routes';
import { AuthContext, useAuthValue } from './context/AuthContext';

import './app.css';

const App: React.FunctionComponent = () => {
  const auth = useAuthValue();

  return (
    <AuthContext.Provider value={auth}>
      <AppRouter />
    </AuthContext.Provider>
  );
};

export default App;
