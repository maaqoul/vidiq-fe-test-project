import { combineReducers } from '@reduxjs/toolkit';
import { keywordsApi, keywordsReducer } from '../entities/Keywords';
import { trendingKeywordsApi, trendingKeywordsReducer } from '../entities/TrendingKeywords';

const rootReducer = combineReducers({
  [keywordsApi.reducerPath]: keywordsApi.reducer,
  [trendingKeywordsApi.reducerPath]: trendingKeywordsApi.reducer,
  keywords: keywordsReducer,
  trendingKeywords: trendingKeywordsReducer,
});

export default rootReducer;
