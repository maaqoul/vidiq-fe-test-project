import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../../../store';
import { trendingKeywordsApi } from '../api';
import type { ITrendingKeywordsId, ITrendingKeywordsIdsMap } from '../types';

export const selectTrendingKeywordsIds = (state: RootState): ITrendingKeywordsId[] =>
  trendingKeywordsApi.endpoints.getAllTrendingKeywordsIds.select()(state)?.data || [];

export const selectTrendingKeywordsById = createSelector(
  selectTrendingKeywordsIds,
  (trendingKeywordsIds: ITrendingKeywordsId[]) =>
    trendingKeywordsIds.reduce<ITrendingKeywordsIdsMap>((acc, trendingId) => {
      if (!acc[trendingId]) acc[trendingId] = true;
      return acc;
    }, {}),
);

export const selectorIsLoadingTrendingKeywordsIds = (state: RootState) =>
  state.trendingKeywords.isLoadingTrendingKeywordsIds;

export const selectIsLoadingErrorTrendingKeywordsIds = (state: RootState) =>
  state.trendingKeywords.isLoadingErrorTrendingKeywords;
