import './styles/App.scss';

import { ApiProvider } from '@reduxjs/toolkit/dist/query/react';
import Pages from '../pages';
import { keywordsApi } from '../store';
import { ErrorBoundary } from './providers/ErrorBoundary';

const App = () => {
  return (
    <ErrorBoundary>
      <ApiProvider api={keywordsApi}>
        <div className='app'>
          <Pages />
        </div>
      </ApiProvider>
    </ErrorBoundary>
  );
};

export default App;
