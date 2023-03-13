import './Pagination.scss';

import { clsx } from 'clsx';
import { useEffect, useState, type FC } from 'react';
import { Button } from '../Button/Button';

interface PaginationProps {
  totalItems: number; // total number of items to be paginated
  itemsPerPage: number; // number of items to be displayed per page
  currentPageNumber: number; // current active page
  onChangePage: (newPage: number) => void; // function to be called when a page is clicked
}
// TODO: Implement a version for mobile devices with a limit of displayed elements "...".
export const Pagination: FC<PaginationProps> = ({
  currentPageNumber,
  totalItems,
  itemsPerPage,
  onChangePage,
}) => {
  const [pages, setPages] = useState<number[]>([]);
  const numPages = Math.ceil(totalItems / itemsPerPage);

  useEffect(() => {
    const newPages = [];

    for (let i = 1; i <= numPages; i += 1) {
      newPages.push(i);
    }

    setPages(newPages);
  }, [numPages]);

  const handlePageClick = (page: number) => {
    if (page !== currentPageNumber) {
      onChangePage(page);
    }
  };

  return (
    <div className='pagination-container'>
      <Button
        className={clsx('pagination-button prev')}
        onClick={() => handlePageClick(currentPageNumber - 1)}
        disabled={currentPageNumber === 1}
        // TODO: Implement onKeyDown acessability
        onKeyDown={() => {}}
        tabIndex={0}
        role='button'
      >
        Prev
      </Button>
      {pages.map((page, idx) => (
        <Button
          key={page}
          className={clsx('pagination-button', currentPageNumber === page && 'active')}
          onClick={() => handlePageClick(page)}
          // TODO: Implement onKeyDown acessability
          onKeyDown={() => {}}
          tabIndex={idx + 1}
          role='button'
        >
          {page}
        </Button>
      ))}
      <Button
        className='pagination-button next'
        onClick={() => handlePageClick(currentPageNumber + 1)}
        disabled={currentPageNumber === numPages}
        // TODO: Implement onKeyDown acessability
        onKeyDown={() => {}}
        tabIndex={pages.length + 1}
        role='button'
      >
        Next
      </Button>
    </div>
  );
};
