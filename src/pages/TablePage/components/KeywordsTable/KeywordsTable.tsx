import './KeywordsTable.scss';

import {
  DEFAULT_PAGINATION_PAGE,
  DEFAULT_ROWS_LIMIT,
  SELECTED_PAGINATION_PAGE_LOCAL_STORAGE_KEY,
} from '../../../../entities/Keywords';
import { PageHeader } from '../../../../features/PageHeader';
import { SortableTable } from '../../../../features/SortableTable';
import { Pagination } from '../../../../shared/components/Pagination';
import { useLocalStorage, useMobileCheck } from '../../../../shared/hooks';
import { getSlicedArray } from '../../../../shared/utils/array';
import { keywordsApi } from '../../../../store';

export const KeywordsTable = () => {
  // TODO: Implement the use of a limit for payload data,
  // but we need to know the total number of items in the list
  // DEFAULT_LIMIT_ROWS
  const { data, isLoading } = keywordsApi.useGetKeywordsQuery();
  const totalItems = data?.length ?? 0;
  const totalPages = totalItems > 0 ? Math.ceil(totalItems / DEFAULT_ROWS_LIMIT) : 0;
  const [storedValue, setStorageValue] = useLocalStorage(
    SELECTED_PAGINATION_PAGE_LOCAL_STORAGE_KEY,
    DEFAULT_PAGINATION_PAGE,
  );
  const currentPage =
    storedValue > 0 && storedValue <= totalPages ? storedValue : DEFAULT_PAGINATION_PAGE;
  const isMobile = useMobileCheck();

  if (isLoading) return <>Loading...</>;
  if (!data?.length) return <>No content.</>;
  return (
    <div className='container'>
      <PageHeader isMobile={isMobile} />
      <main className='wrapper'>
        <div className='main'>
          <SortableTable
            bodyRows={getSlicedArray(data, currentPage, DEFAULT_ROWS_LIMIT)}
            isMobile={isMobile}
          />
        </div>
      </main>
      <footer>
        <Pagination
          currentPage={currentPage}
          itemsPerPage={DEFAULT_ROWS_LIMIT}
          totalItems={totalItems}
          onChangePage={(newPage: number) => {
            setStorageValue(newPage);
          }}
        />
      </footer>
    </div>
  );
};
