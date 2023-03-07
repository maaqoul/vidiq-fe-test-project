import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { keywordsApi } from './keywordsApi';

export const store = configureStore({
  reducer: {
    [keywordsApi.reducerPath]: keywordsApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(keywordsApi.middleware),
});

setupListeners(store.dispatch);
