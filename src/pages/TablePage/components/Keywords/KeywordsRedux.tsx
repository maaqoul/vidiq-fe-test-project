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
  const [storedCurrentPageNumber, setStoredCurrentPageNumber] = useLocalStorage(
    SELECTED_PAGINATION_PAGE_LOCAL_STORAGE_KEY,
    selectedPageNumber,
  );
  const [storedSelectedColumnIndex, setStoredSelectedColumnIndex] = useLocalStorage(
    MOBILE_TABLE_SELECTED_COLUMN_LOCAL_STORAGE_KEY,
    selectedColumnIndex,
  );
  const [storedSortBy, setStoredSortBy] = useLocalStorage(
    SORT_ORDER_BY_LOCAL_STORAGE_KEY,
    selectedOrderBy,
  );
  const [storedFieldName, setStoredFieldName] = useLocalStorage(
    SORT_ORDER_FIELD_NAME_LOCAL_STORAGE_KEY,
    selectedFieldName,
  );

  const onSortButtonClick = useCallback(
    (nextSelectedFieldName: EKeywordKeys) => {
      const sortOrderBy =
        storedSortBy === ESortOrderBy.ASC && storedFieldName === nextSelectedFieldName
          ? ESortOrderBy.DESC
          : ESortOrderBy.ASC;
      if (storedSortBy !== sortOrderBy) setStoredSortBy(sortOrderBy);
      if (storedFieldName !== nextSelectedFieldName) setStoredFieldName(nextSelectedFieldName);
      dispatch(
        setSortOrder({
          selectedFieldName: nextSelectedFieldName,
          sortOrderBy,
        }),
      );
    },
    [dispatch, setStoredFieldName, setStoredSortBy, storedFieldName, storedSortBy],
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
        selectedColumnIndex={storedSelectedColumnIndex}
        onSelectedColumnIndexChange={(option) => {
          const selectedColumnIndexByKey = KEYWORD_INDEX_BY_KEY[option.key];
          if (selectedColumnIndexByKey !== storedSelectedColumnIndex) {
            setStoredSelectedColumnIndex(selectedColumnIndexByKey);
            dispatch(setSelectedColumnIndex(selectedColumnIndexByKey));
          }
        }}
      />
      <main className='wrapper'>
        <div className='main'>
          <SortableTable
            bodyRows={sortedSlicedKeywords}
            isMobile={isMobile}
            selectedColumnIndex={storedSelectedColumnIndex}
            trendingKeywordsById={trendingKeywordsById}
            onSortButtonClick={onSortButtonClick}
          />
        </div>
      </main>
      <footer>
        <Pagination
          currentPageNumber={storedCurrentPageNumber}
          itemsPerPage={rowsLimitPerPage}
          totalItems={totalKeywordsNumber}
          onChangePage={(nextPage: EColumnIndexKey) => {
            setStoredCurrentPageNumber(nextPage);
            dispatch(setSelectedPageNumber(nextPage));
          }}
        />
      </footer>
    </div>
  );
};
