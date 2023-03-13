import './Keywords.scss';

import { useCallback, useEffect, type FC } from 'react';
import {
  EColumnIndexKey,
  EKeywordKeys,
  ESortOrderBy,
  keywordsApi,
  KEYWORD_INDEX_BY_KEY,
  MOBILE_TABLE_SELECTED_COLUMN_LOCAL_STORAGE_KEY,
  selectColumnIndex,
  SELECTED_PAGINATION_PAGE_LOCAL_STORAGE_KEY,
  selectFieldName,
  selectIsLoadingKeywords,
  selectRowLimitPerPage,
  selectSelectedPageNumber,
  selectSlicedSortedKeywords,
  selectSortOrderBy,
  selectTotalKeywordsNumber,
  setSelectedColumnIndex,
  setSelectedPageNumber,
  setSortOrder,
  SORT_ORDER_BY_LOCAL_STORAGE_KEY,
  SORT_ORDER_FIELD_NAME_LOCAL_STORAGE_KEY,
} from '../../../../entities/Keywords';
import { selectIsErrorLoadingKeywords } from '../../../../entities/Keywords/model/selectors/index';
import {
  selectIsLoadingErrorTrendingKeywordsIds,
  selectorIsLoadingTrendingKeywordsIds,
  selectTrendingKeywordsById,
  trendingKeywordsApi,
} from '../../../../entities/TrendingKeywords';
import { PageHeader } from '../../../../features/PageHeader';
import { SortableTable } from '../../../../features/SortableTable';
import { Pagination } from '../../../../shared/components/Pagination';
import { useLocalStorage, useMobileCheck } from '../../../../shared/hooks';
import { store, useAppDispatch, useAppSelector } from '../../../../store';

export const Keywords: FC = () => {
  const dispatch = useAppDispatch();
  const isMobile = useMobileCheck();
  const totalKeywordsNumber = useAppSelector(selectTotalKeywordsNumber);
  const rowsLimitPerPage = useAppSelector(selectRowLimitPerPage);
  const selectedPageNumber = useAppSelector(selectSelectedPageNumber);
  const sortedSlicedKeywords = useAppSelector(selectSlicedSortedKeywords);
  const selectedColumnIndex = useAppSelector(selectColumnIndex);
  const selectedOrderBy = useAppSelector(selectSortOrderBy);
  const selectedFieldName = useAppSelector(selectFieldName);
  const trendingKeywordsById = useAppSelector(selectTrendingKeywordsById);
  const isLoadingKeywords = useAppSelector(selectIsLoadingKeywords);
  const isLoadinTrendingKeywordsIds = useAppSelector(selectorIsLoadingTrendingKeywordsIds);
  const isLoadingErrorKeywords = useAppSelector(selectIsErrorLoadingKeywords);
  const isLoadingErrorTrendingKeywords = useAppSelector(selectIsLoadingErrorTrendingKeywordsIds);

  // TODO: Implement useLocalStorageByKeys([ { storageKey, initialValue }, { storageKey, initialValue } ])
  // NOTE: It is very important to have a single source of truth.
  const [, setStoredSelectedPageNumber] = useLocalStorage(
    SELECTED_PAGINATION_PAGE_LOCAL_STORAGE_KEY,
    selectedPageNumber,
  );
  const [, setStoredSelectedColumnIndex] = useLocalStorage(
    MOBILE_TABLE_SELECTED_COLUMN_LOCAL_STORAGE_KEY,
    selectedColumnIndex,
  );
  const [, setStoredSortBy] = useLocalStorage(SORT_ORDER_BY_LOCAL_STORAGE_KEY, selectedOrderBy);
  const [, setStoredFieldName] = useLocalStorage(
    SORT_ORDER_FIELD_NAME_LOCAL_STORAGE_KEY,
    selectedFieldName,
  );

  const onSortButtonClick = useCallback(
    (nextSelectedFieldName: EKeywordKeys) => {
      const sortOrderBy =
        selectedOrderBy === ESortOrderBy.ASC && selectedFieldName === nextSelectedFieldName
          ? ESortOrderBy.DESC
          : ESortOrderBy.ASC;
      if (selectedOrderBy === sortOrderBy && selectedFieldName === nextSelectedFieldName) return;
      if (selectedOrderBy !== sortOrderBy) setStoredSortBy(sortOrderBy);
      if (selectedFieldName !== nextSelectedFieldName) setStoredFieldName(nextSelectedFieldName);
      dispatch(
        setSortOrder({
          selectedFieldName: nextSelectedFieldName,
          sortOrderBy,
        }),
      );
    },
    [dispatch, setStoredFieldName, setStoredSortBy, selectedFieldName, selectedOrderBy],
  );

  useEffect(() => {
    const keywordsQueryActionCreatorResult = store.dispatch(
      keywordsApi.endpoints.getKeywords.initiate(),
    );
    const trendingKeywordsQueryActionCreatorResult = store.dispatch(
      trendingKeywordsApi.endpoints.getAllTrendingKeywordsIds.initiate(),
    );
    return () => {
      keywordsQueryActionCreatorResult.unsubscribe();
      trendingKeywordsQueryActionCreatorResult.unsubscribe();
    };
  }, []);

  // TODO: Of course, this is not acceptable for a real application.
  if (isLoadingKeywords || isLoadinTrendingKeywordsIds) return <>Loading...</>;
  if (!sortedSlicedKeywords.length) return <>No content.</>;
  if (isLoadingErrorKeywords || isLoadingErrorTrendingKeywords)
    return <>Something went wrong....</>;

  return (
    <div className='container'>
      <PageHeader
        isMobile={isMobile}
        selectedColumnIndex={selectedColumnIndex}
        onSelectedColumnIndexChange={(option) => {
          const selectedColumnIndexByKey = KEYWORD_INDEX_BY_KEY[option.key];
          if (selectedColumnIndexByKey === selectedColumnIndex) return;
          setStoredSelectedColumnIndex(selectedColumnIndexByKey);
          dispatch(setSelectedColumnIndex(selectedColumnIndexByKey));
        }}
      />
      <main className='wrapper'>
        <div className='main'>
          <SortableTable
            bodyRows={sortedSlicedKeywords}
            isMobile={isMobile}
            selectedColumnIndex={selectedColumnIndex}
            trendingKeywordsById={trendingKeywordsById}
            onSortButtonClick={onSortButtonClick}
          />
        </div>
      </main>
      <footer>
        <Pagination
          currentPageNumber={selectedPageNumber}
          itemsPerPage={rowsLimitPerPage}
          totalItems={totalKeywordsNumber}
          onChangePage={(nextPage: EColumnIndexKey) => {
            if (selectedPageNumber === nextPage) return;
            setStoredSelectedPageNumber(nextPage);
            dispatch(setSelectedPageNumber(nextPage));
          }}
        />
      </footer>
    </div>
  );
};
