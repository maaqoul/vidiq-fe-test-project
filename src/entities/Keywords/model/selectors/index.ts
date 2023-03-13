import { createSelector } from '@reduxjs/toolkit';
import { getSlicedArray } from '../../../../shared/utils';
import { RootState } from '../../../../store';
import { DEFAULT_PAGINATION_PAGE } from '../../const';
import { keywordsApi } from '../api';
import { getSortedKeywordsByOrder } from '../helpers';
import { IKeywordItem, type ESortOrderBy } from '../types';

export const selectKeywords = (state: RootState): IKeywordItem[] =>
  keywordsApi.endpoints.getKeywords.select()(state)?.data || [];

export const selectTotalKeywordsNumber = createSelector(
  selectKeywords,
  (keywords) => keywords.length,
);

export const selectRowLimitPerPage = (state: RootState) => state.keywords.rowsLimitPerPage;

export const selectTotalPages = createSelector(
  selectTotalKeywordsNumber,
  (state: RootState) => state.keywords.rowsLimitPerPage,
  (totalKeywordsItems, rowLimitPerPage) =>
    totalKeywordsItems > 0 ? Math.ceil(totalKeywordsItems / rowLimitPerPage) : 0,
);

export const selectSortOrderBy = (state: RootState): ESortOrderBy => state.keywords.sortOrderBy;

export const selectFieldName = (state: RootState) => state.keywords.selectedFieldName;

export const selectColumnIndex = (state: RootState) => state.keywords.selectedColumnIndex;

export const selectIsLoadingKeywords = (state: RootState) => state.keywords.isLoadingKeywords;

export const selectIsErrorLoadingKeywords = (state: RootState) =>
  state.keywords.isLoadingErrorKeywords;

export const selectSelectedPageNumber = createSelector(
  selectTotalPages,
  (state: RootState) => state.keywords.selectedPageNumber,
  (totalPages, currentPageNumber) =>
    currentPageNumber <= totalPages ? currentPageNumber : DEFAULT_PAGINATION_PAGE,
);

export const selectSortedKeywords = createSelector(
  selectKeywords,
  selectSortOrderBy,
  selectFieldName,
  (keywords, sortSortBy, fieldName) =>
    getSortedKeywordsByOrder({
      keywords,
      sortSortBy,
      fieldName,
    }),
);

export const selectSlicedSortedKeywords = createSelector(
  selectSortedKeywords,
  selectSelectedPageNumber,
  selectRowLimitPerPage,
  (sortedKeywords, currentPageNumber, rowsLimitPerPage) =>
    getSlicedArray(sortedKeywords, currentPageNumber, rowsLimitPerPage),
);
