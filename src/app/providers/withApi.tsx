import { ApiProvider } from '@reduxjs/toolkit/dist/query/react';
import { keywordsApi } from '../../entities/Keywords';

// IMPORTANT NOTE: Using this together with an existing Redux store will cause them to conflict with each other.
// If you are already using Redux, please follow the instructions as shown in the Getting Started guide.

const withApi = (component: () => React.ReactNode) => () =>
  <ApiProvider api={keywordsApi}>{component()}</ApiProvider>;

export default withApi;
