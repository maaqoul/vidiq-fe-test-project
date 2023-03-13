import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { getParsedJSON } from '../../../../shared/utils';
import {
  DEFAULT_PAGINATION_PAGE,
  DEFAULT_ROWS_LIMIT,
  MOBILE_TABLE_SELECTED_COLUMN_LOCAL_STORAGE_KEY,
  SELECTED_PAGINATION_PAGE_LOCAL_STORAGE_KEY,
  SORT_ORDER_BY_LOCAL_STORAGE_KEY,
  SORT_ORDER_FIELD_NAME_LOCAL_STORAGE_KEY,
} from '../../const';
import { keywordsApi } from '../api';
import { EColumnIndexKey, EKeywordKeys, ESortOrderBy, type IKeywordsState } from '../types';

const initialState: IKeywordsState = {
  isLoadingKeywords: false,
  isLoadingErrorKeywords: false,
  selectedColumnIndex:
    getParsedJSON(localStorage.getItem(MOBILE_TABLE_SELECTED_COLUMN_LOCAL_STORAGE_KEY)) ??
    EColumnIndexKey.SEARCH_VOLUME,
  selectedFieldName:
    getParsedJSON(localStorage.getItem(SORT_ORDER_FIELD_NAME_LOCAL_STORAGE_KEY)) ??
    EKeywordKeys.SEARCH_VOLUME,
  selectedPageNumber:
    getParsedJSON(localStorage.getItem(SELECTED_PAGINATION_PAGE_LOCAL_STORAGE_KEY)) ??
    DEFAULT_PAGINATION_PAGE,
  sortOrderBy:
    getParsedJSON(localStorage.getItem(SORT_ORDER_BY_LOCAL_STORAGE_KEY)) ?? ESortOrderBy.ASC,
  rowsLimitPerPage: DEFAULT_ROWS_LIMIT,
};

const keywordsSlice = createSlice({
  name: 'keywords',
  initialState,
  reducers: {
    // NOTE: DO NOT USE ARROW FUNCTIONS AS METHODS
    // https://stackoverflow.com/a/60449045/7581278
    setLocalStorageValues(
      state,
      action: PayloadAction<{
        sortOrderBy?: IKeywordsState['sortOrderBy'];
        selectedFieldName?: IKeywordsState['selectedFieldName'];
        selectedPageNumber?: IKeywordsState['selectedPageNumber'];
        selectedColumnIndex?: IKeywordsState['selectedColumnIndex'];
      }>,
    ) {
      const { selectedPageNumber, selectedColumnIndex, sortOrderBy, selectedFieldName } =
        action.payload;
      if (selectedPageNumber != null && state.selectedPageNumber !== selectedPageNumber)
        state.selectedPageNumber = selectedPageNumber;
      if (selectedColumnIndex != null && state.selectedColumnIndex !== selectedColumnIndex)
        state.selectedColumnIndex = selectedColumnIndex;
      if (sortOrderBy != null && state.sortOrderBy !== sortOrderBy) state.sortOrderBy = sortOrderBy;
      if (selectedFieldName != null && state.selectedFieldName !== selectedFieldName)
        state.selectedFieldName = selectedFieldName;
    },
    setSelectedColumnIndex(state, action: PayloadAction<IKeywordsState['selectedColumnIndex']>) {
      state.selectedColumnIndex = action.payload;
    },
    setSelectedPageNumber(state, action: PayloadAction<IKeywordsState['selectedPageNumber']>) {
      state.selectedPageNumber = action.payload;
    },
    setRowLimitPerPage(state, action: PayloadAction<IKeywordsState['rowsLimitPerPage']>) {
      state.rowsLimitPerPage = action.payload;
    },
    setSortOrder(
      state,
      action: PayloadAction<{
        sortOrderBy: IKeywordsState['sortOrderBy'];
        selectedFieldName: IKeywordsState['selectedFieldName'];
      }>,
    ) {
      const { sortOrderBy, selectedFieldName } = action.payload;
      state.sortOrderBy = sortOrderBy;
      state.selectedFieldName = selectedFieldName;
    },
    toggleIsLoadingKeywords(state) {
      state.isLoadingKeywords = !state.isLoadingKeywords;
    },
  },
  extraReducers(builder) {
    builder
      // NOTE: Some way to handle useGetKeywordsQuery status for a global loader
      .addMatcher(keywordsApi.endpoints.getKeywords.matchPending, (state, _action) => {
        state.isLoadingKeywords = true; // !initialState.isLoadingKeywords
        state.isLoadingErrorKeywords = false; // initialState.isLoadingKeywordsError
      })
      .addMatcher(keywordsApi.endpoints.getKeywords.matchFulfilled, (state, _action) => {
        state.isLoadingKeywords = false; // initialState.isLoadingKeywords
      })
      .addMatcher(keywordsApi.endpoints.getKeywords.matchRejected, (state, action) => {
        console.error(action);
        state.isLoadingKeywords = false; // initialState.isLoadingKeywords
        state.isLoadingErrorKeywords = true; // !initialState.isLoadingKeywordsError
      });
  },
});

const keywordsReducer = keywordsSlice.reducer;

export const {
  setLocalStorageValues,
  setSelectedColumnIndex,
  setSelectedPageNumber,
  setSortOrder,
  toggleIsLoadingKeywords,
} = keywordsSlice.actions;

export { keywordsReducer };
