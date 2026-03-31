import * as React from 'react';

import '@patternfly/react-core/dist/styles/base.css';
import '@patternfly/react-styles/css/utilities/Spacing/spacing.css';
import '@patternfly/react-styles/css/utilities/Text/text.css';

import { DemoRouter } from './routes';
import './app.css';

const App: React.FunctionComponent = () => <DemoRouter />;

export default App;
