import React from 'react';

interface PaginationProps {
  itemsPerPage: number;
  totalItems: number;
  paginate: (pageNumber: number) => void;
  currentPage: number;
}

const Pagination: React.FC<PaginationProps> = ({ itemsPerPage, totalItems, paginate, currentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className='flex justify-center mt-4'>
      <nav>
        <ul className='pagination'>
          {currentPage > 1 && (
            <li className='page-item'>
              <button className='page-link' onClick={() => paginate(currentPage - 1)}>
                Previous
              </button>
            </li>
          )}
          {pageNumbers.map((number) => (
            <li key={number} className={`page-item ${currentPage === number ? 'active' : ''}`}>
              <button className='page-link' onClick={() => paginate(number)}>
                {number}
              </button>
            </li>
          ))}
          {currentPage < pageNumbers.length && (
            <li className='page-item'>
              <button className='page-link' onClick={() => paginate(currentPage + 1)}>
                Next
              </button>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
