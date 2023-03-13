import { createSlice } from '@reduxjs/toolkit';
import { trendingKeywordsApi } from '../api';
import { type ITrendingKeywordsState } from '../types';

const initialState: ITrendingKeywordsState = {
  isLoadingTrendingKeywordsIds: false,
  isLoadingErrorTrendingKeywords: false,
};

const trendingKeywordsSlice = createSlice({
  name: 'trendingKeywordsIds',
  initialState,
  reducers: {
    toggleIsLoadingTrendingKeywordsIds(state) {
      state.isLoadingTrendingKeywordsIds = !state.isLoadingTrendingKeywordsIds;
    },
  },
  extraReducers(builder) {
    builder
      // NOTE: Some way to handle useGetKeywordsQuery status for a global loader
      .addMatcher(
        trendingKeywordsApi.endpoints.getAllTrendingKeywordsIds.matchPending,
        (state, _action) => {
          state.isLoadingTrendingKeywordsIds = true;
          state.isLoadingErrorTrendingKeywords = false;
        },
      )
      .addMatcher(
        trendingKeywordsApi.endpoints.getAllTrendingKeywordsIds.matchFulfilled,
        (state, _action) => {
          state.isLoadingTrendingKeywordsIds = false;
        },
      )
      .addMatcher(
        trendingKeywordsApi.endpoints.getAllTrendingKeywordsIds.matchRejected,
        (state, action) => {
          console.error(action);
          state.isLoadingTrendingKeywordsIds = false;
          state.isLoadingErrorTrendingKeywords = true;
        },
      );
  },
});

const trendingKeywordsReducer = trendingKeywordsSlice.reducer;

export const { toggleIsLoadingTrendingKeywordsIds } = trendingKeywordsSlice.actions;

export { trendingKeywordsReducer };
