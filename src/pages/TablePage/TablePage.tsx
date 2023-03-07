import './TablePage.scss';

import { PageHeader } from '../../features/PageHeader';
import { Table } from '../../features/SortableTable';
import { useMobileCheck } from '../../shared/hooks';
import { keywordsApi } from '../../store';
// import { DEFAULT_LIMIT_ROWS } from './const';

export const TablePage = () => {
  // TODO: Implement the use of a limit for payload data,
  // but we need to know the total number of items in the list
  // DEFAULT_LIMIT_ROWS
  const { data, isLoading } = keywordsApi.useGetKeywordsQuery();
  const isMobile = useMobileCheck();
  console.debug(data);

  if (isLoading) return <>Loading...</>;
  if (!data?.length) return <>No content.</>;
  return (
    <div className='container'>
      <PageHeader isMobile={isMobile} />
      <main className='wrapper'>
        <div className='main'>
          <Table bodyRows={data} />
        </div>
      </main>
      <footer>
        {
          // TODO: Pagination can be here?
        }
      </footer>
    </div>
  );
};
