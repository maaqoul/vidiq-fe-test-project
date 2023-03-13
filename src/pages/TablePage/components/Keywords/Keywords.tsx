import './Keywords.scss';

import { useEffect, useState, type FC } from 'react';
import {
  DEFAULT_PAGINATION_PAGE,
  DEFAULT_ROWS_LIMIT,
  EColumnIndexKey,
  EKeywordKeys,
  ESortOrderBy,
  KEYWORD_INDEX_BY_KEY,
  MOBILE_TABLE_SELECTED_COLUMN_LOCAL_STORAGE_KEY,
  SELECTED_PAGINATION_PAGE_LOCAL_STORAGE_KEY,
  setSortOrder,
  SORT_ORDER_BY_LOCAL_STORAGE_KEY,
  SORT_ORDER_FIELD_NAME_LOCAL_STORAGE_KEY,
  useGetKeywordsQuery,
  type IKeywordItem,
} from '../../../../entities/Keywords';
import { getSortedKeywordsByOrder } from '../../../../entities/Keywords/model/helpers';
import {
  ITrendingKeywordsIdsMap,
  useGetAllTrendingKeywordsIdsQuery,
} from '../../../../entities/TrendingKeywords';
import { PageHeader } from '../../../../features/PageHeader';
import { SortableTable } from '../../../../features/SortableTable';
import { Pagination } from '../../../../shared/components/Pagination';
import { useLocalStorage, useMobileCheck } from '../../../../shared/hooks';
import { getSlicedArray } from '../../../../shared/utils';
import { useAppDispatch } from '../../../../store';

export const Keywords: FC = () => {
  const dispatch = useAppDispatch();
  // TODO: Implement the use of a limit for payload data,
  // but we need to know the total number of items in the list
  // DEFAULT_LIMIT_ROWS
  const {
    data: keywords = [],
    isLoading: isLoadingKeywords,
    isError: isKeywordsLoadingError,
  } = useGetKeywordsQuery();
  const {
    data: trendingKeywordsIds = [],
    isLoading: isLoadingTrendingKeywordsIds,
    isError: isErrorLoadingTrendingKeywordsIds,
  } = useGetAllTrendingKeywordsIdsQuery();
  // TODO: I believe in real application we should move all logic like this into the Store/selector.
  const totalItems = keywords?.length ?? 0;
  const totalPages = totalItems > 0 ? Math.ceil(totalItems / DEFAULT_ROWS_LIMIT) : 0;
  const isMobile = useMobileCheck();

  // TODO: Implement useLocalStorageByKeys([ { storageKey, initialValue }, { storageKey, initialValue } ])
  const [storedDefaultPageNumber, setStoredDefaultPageNumber] = useLocalStorage(
    SELECTED_PAGINATION_PAGE_LOCAL_STORAGE_KEY,
    DEFAULT_PAGINATION_PAGE,
  );
  const [storedSelectedColumnIndex, setStoredSelectedColumnIndex] = useLocalStorage(
    MOBILE_TABLE_SELECTED_COLUMN_LOCAL_STORAGE_KEY,
    EColumnIndexKey.SEARCH_VOLUME,
  );
  const [storedSortBy, setStoredSortBy] = useLocalStorage(
    SORT_ORDER_BY_LOCAL_STORAGE_KEY,
    ESortOrderBy.ASC,
  );
  const [storedFieldName, setStoredFieldName] = useLocalStorage(
    SORT_ORDER_FIELD_NAME_LOCAL_STORAGE_KEY,
    EKeywordKeys.KEYWORD,
  );
  const [sortedKeywrods, setSortedKeywords] = useState<IKeywordItem[]>([]);
  const currentPage =
    storedDefaultPageNumber > 0 && storedDefaultPageNumber <= totalPages
      ? storedDefaultPageNumber
      : DEFAULT_PAGINATION_PAGE;

  useEffect(() => {
    const doSortKeywords = () => {
      if (keywords?.length) {
        setSortedKeywords(
          getSortedKeywordsByOrder({
            keywords,
            sortSortBy: storedSortBy,
            fieldName: storedFieldName,
          }),
        );
      }
    };
    doSortKeywords();
  }, [keywords, storedSortBy, storedFieldName]);

  // TODO: Of course, this is not acceptable for a real application.
  if (isLoadingKeywords || isLoadingTrendingKeywordsIds) return <>Loading...</>;
  if (!keywords?.length) return <>No content.</>;
  if (isKeywordsLoadingError || isErrorLoadingTrendingKeywordsIds)
    return <>Something went wrong....</>;

  return (
    <div className='container'>
      <PageHeader
        isMobile={isMobile}
        selectedColumnIndex={storedSelectedColumnIndex}
        onSelectedColumnIndexChange={(option) => {
          const selectedColumnIndexByKey = KEYWORD_INDEX_BY_KEY[option.key];
          if (storedSelectedColumnIndex !== selectedColumnIndexByKey)
            setStoredSelectedColumnIndex(selectedColumnIndexByKey);
        }}
      />
      <main className='wrapper'>
        <div className='main'>
          <SortableTable
            bodyRows={
              // TODO: FIX ME!!! SHOULD BE REFACTORED!!!
              // but, I'm a little tired, I just want to show that it works.
              getSlicedArray(sortedKeywrods, currentPage, DEFAULT_ROWS_LIMIT)
            }
            isMobile={isMobile}
            selectedColumnIndex={storedSelectedColumnIndex}
            trendingKeywordsById={trendingKeywordsIds.reduce((acc, item) => {
              if (!acc[item]) acc[item] = true;
              return acc;
            }, {} as ITrendingKeywordsIdsMap)}
            onSortButtonClick={(selectedFieldName) => {
              setStoredFieldName(selectedFieldName);
              const sortOrderBy =
                storedSortBy === ESortOrderBy.ASC ? ESortOrderBy.DESC : ESortOrderBy.ASC;
              dispatch(
                setSortOrder({
                  selectedFieldName,
                  sortOrderBy,
                }),
              );
              setStoredSortBy(sortOrderBy);
            }}
          />
        </div>
      </main>
      <footer>
        <Pagination
          currentPageNumber={currentPage}
          itemsPerPage={DEFAULT_ROWS_LIMIT}
          totalItems={totalItems}
          onChangePage={(newPage: number) => {
            setStoredDefaultPageNumber(newPage);
          }}
        />
      </footer>
    </div>
  );
};
