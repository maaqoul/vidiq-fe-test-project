import './styles/App.scss';

import { ApiProvider } from '@reduxjs/toolkit/dist/query/react';
import Pages from '../pages';
import { keywordsApi } from '../store';

const App = () => {
  return (
    <ApiProvider api={keywordsApi}>
      <div className='app'>
        <Pages />
      </div>
    </ApiProvider>
  );
};

export default App;
