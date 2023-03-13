import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { keywordsApi } from '../entities/Keywords';
import { trendingKeywordsApi } from '../entities/TrendingKeywords';
import rootReducer from './rootReducer';

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV === 'development',
  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware().concat(keywordsApi.middleware, trendingKeywordsApi.middleware);
  },
});

// Note: Some options for init requests without hooks or outside the react scope.
// store.dispatch(keywordsApi.endpoints.getKeywords.initiate());
// store.dispatch(keywordsApi.endpoints.getAllTrendingKeywordsIds.initiate());

setupListeners(store.dispatch);
