import './Pagination.scss';

import clsx from 'clsx';
import { FC, useEffect, useState } from 'react';
import { CustomButton } from '../CustomButton/CustomButton';

export interface PaginationProps {
  totalItems: number; // total number of items to be paginated
  itemsPerPage: number; // number of items to be displayed per page
  currentPage: number; // current active page
  onChangePage: (newPage: number) => void; // function to be called when a page is clicked
}

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
      <CustomButton
        className={clsx('pagination-button prev')}
        onClick={() => handlePageClick(currentPage - 1)}
        disabled={currentPage === 1}
        // disabled={currentPage === 1}
        // TODO: Implement onKeyDown acessability
        onKeyDown={() => {}}
        tabIndex={0}
        role='button'
      >
        Prev
      </CustomButton>
      {pages.map((page, idx) => (
        <CustomButton
          key={page}
          className={clsx('pagination-button', currentPage === page && 'active')}
          onClick={() => handlePageClick(page)}
          // TODO: Implement onKeyDown acessability
          onKeyDown={() => {}}
          tabIndex={idx + 1}
          role='button'
        >
          {page}
        </CustomButton>
      ))}
      <CustomButton
        className='pagination-button next'
        onClick={() => handlePageClick(currentPage + 1)}
        disabled={currentPage === numPages}
        // disabled={currentPage === numPages}
        // TODO: Implement onKeyDown acessability
        onKeyDown={() => {}}
        tabIndex={pages.length + 1}
        role='button'
      >
        Next
      </CustomButton>
    </div>
  );
};

// export const Pagination: React.FC<PaginationProps> = ({
//   totalItems,
//   itemsPerPage,
//   currentPage,
//   onChangePage,
//   siblingRange = 2,
//   mobileBreakpoint = 640,
// }) => {
//   const [numPages, setNumPages] = useState(Math.ceil(totalItems / itemsPerPage));
//   // eslint-disable-next-line no-debugger
//   debugger;
//   const [visiblePages, setVisiblePages] = useState<number[]>([]);
//   const [isMobile, setIsMobile] = useState<boolean>(false);

//   const handlePageClick = (page: number) => {
//     if (page !== currentPage) {
//       onChangePage(page);
//     }
//   };

//   useEffect(() => {
//     const updatePages = () => {
//       const newNumPages = Math.ceil(totalItems / itemsPerPage);
//       setNumPages(newNumPages);
//       const newVisiblePages = [];
//       const startPage = Math.max(currentPage - siblingRange, 1);
//       const endPage = Math.min(currentPage + siblingRange, newNumPages);
//       for (let i = startPage; i <= endPage; i += 1) {
//         newVisiblePages.push(i);
//       }
//       setVisiblePages(newVisiblePages);
//     };

//     updatePages();
//   }, [totalItems, itemsPerPage, currentPage, siblingRange]);

//   useEffect(() => {
//     const handleResize = () => {
//       setIsMobile(window.innerWidth <= mobileBreakpoint);
//     };

//     handleResize();
//     window.addEventListener('resize', handleResize);

//     return () => {
//       window.removeEventListener('resize', handleResize);
//     };
//   }, [mobileBreakpoint]);

//   return (
//     <div className={`pagination${isMobile ? ' mobile' : ''}`}>
//       <div
//         className={`pagination-item${currentPage === 1 ? ' disabled' : ''}`}
//         onClick={() => handlePageClick(currentPage - 1)}
//         // disabled={currentPage === 1}
//         // TODO: Implement onKeyDown acessability
//         onKeyDown={() => {}}
//         tabIndex={0}
//         role='button'
//       >
//         Prev
//       </div>
//       {visiblePages.map((page, idx) => (
//         <div
//           key={page}
//           className={`pagination-item${currentPage === page ? ' active' : ''}`}
//           onClick={() => handlePageClick(page)}
//           // TODO: Implement onKeyDown acessability
//           onKeyDown={() => {}}
//           tabIndex={idx + 1}
//           role='button'
//         >
//           {page}
//         </div>
//       ))}
//       <div
//         className={`pagination-item${currentPage === numPages ? ' disabled' : ''}`}
//         onClick={() => handlePageClick(currentPage + 1)}
//         // disabled={currentPage === numPages}
//         // TODO: Implement onKeyDown acessability
//         onKeyDown={() => {}}
//         tabIndex={visiblePages.length + 1}
//         role='button'
//       >
//         Next
//       </div>
//     </div>
//   );
// };
