import './Pagination.scss';

import clsx from 'clsx';
import { FC, useEffect, useState } from 'react';
import { Button } from '../Button/Button';

export interface PaginationProps {
  totalItems: number; // total number of items to be paginated
  itemsPerPage: number; // number of items to be displayed per page
  currentPage: number; // current active page
  onChangePage: (newPage: number) => void; // function to be called when a page is clicked
}
// TODO: Implement a version for mobile devices with a limit of displayed elements "...".
export const Pagination: FC<PaginationProps> = ({
  currentPage,
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
    if (page !== currentPage) {
      onChangePage(page);
    }
  };

  return (
    <div className='pagination-container'>
      <Button
        className={clsx('pagination-button prev')}
        onClick={() => handlePageClick(currentPage - 1)}
        disabled={currentPage === 1}
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
          className={clsx('pagination-button', currentPage === page && 'active')}
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
        onClick={() => handlePageClick(currentPage + 1)}
        disabled={currentPage === numPages}
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
