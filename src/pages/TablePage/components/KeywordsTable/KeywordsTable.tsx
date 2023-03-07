import './KeywordsTable.scss';

import { useState } from 'react';
import { PageHeader } from '../../../../features/PageHeader';
import { SortableTable } from '../../../../features/SortableTable';
import { Pagination } from '../../../../shared/components/Pagination';
import { useMobileCheck } from '../../../../shared/hooks';
import { keywordsApi } from '../../../../store';
import { DEFAULT_ROWS_LIMIT } from './const';

export const KeywordsTable = () => {
  // TODO: Implement the use of a limit for payload data,
  // but we need to know the total number of items in the list
  // DEFAULT_LIMIT_ROWS
  const { data, isLoading } = keywordsApi.useGetKeywordsQuery();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const isMobile = useMobileCheck();

  if (isLoading) return <>Loading...</>;
  if (!data?.length) return <>No content.</>;
  return (
    <div className='container'>
      <PageHeader isMobile={isMobile} />
      <main className='wrapper'>
        <div className='main'>
          <SortableTable
            // TODO: Move this logic into Redux store
            bodyRows={data.slice(
              currentPage > 1 ? (currentPage - 1) * DEFAULT_ROWS_LIMIT : 0,
              currentPage > 1
                ? currentPage * DEFAULT_ROWS_LIMIT + 1
                : currentPage * DEFAULT_ROWS_LIMIT,
            )}
          />
        </div>
      </main>
      <footer>
        <Pagination
          currentPage={currentPage}
          itemsPerPage={DEFAULT_ROWS_LIMIT}
          totalItems={data.length}
          onChangePage={(newPage: number) => {
            setCurrentPage(newPage);
          }}
        />
      </footer>
    </div>
  );
};
