import { ApiProvider } from '@reduxjs/toolkit/dist/query/react';
import { keywordsApi } from '../../store/keywordsApi';

const withApi = (component: () => React.ReactNode) => () =>
  <ApiProvider api={keywordsApi}>{component()}</ApiProvider>;

export default withApi;
