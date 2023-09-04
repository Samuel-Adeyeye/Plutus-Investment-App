import React from 'react'

function Pagination({ totalTransactions, postsPerPage, setCurrentPage, currentPage, filterPageNumber }) {
    const pages: any[] = [];
    const maxVisiblePages = 3
    
    if(filterPageNumber === 0){
        for (let i = 1; i <= Math.ceil(totalTransactions / postsPerPage); i++) {
            pages.push(i);
          }
    }else if(filterPageNumber > 0){
        for (let i = 1; i <= Math.ceil(filterPageNumber / postsPerPage); i++) {
            pages.push(i);
          }
    }
  
    const visiblePageNumbers = pages.slice(
      Math.max(currentPage - 1, 0),
      Math.min(currentPage - 1 + maxVisiblePages, pages.length)
    );
  
    const goToPage = (page) => {
      setCurrentPage(page);
    };
  
    const goToPrevPage = () => {
      if (currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    };
  
    const goToNextPage = () => {
      if (currentPage < Math.ceil(totalTransactions / postsPerPage)) {
        setCurrentPage(currentPage + 1);
      }
    };

    const handleStartingClick = () => {
        setCurrentPage(1)
    }

    const handleEndClick = () => {
        setCurrentPage(pages[pages.length-1])
    }
  
    return (
      <div className="flex w-20 justify-center">
        {currentPage > 1 && (
          <button className = "bg-blue-500 px-4 rounded-2xl flex justify-center items-center mx-4 mt-4 hover:bg-blue-700 text-white tracking-wide" onClick={goToPrevPage}>Prev</button>
        )}
  
        <button className = "mt-4 text-lg hover:text-red-700" onClick = {() => handleStartingClick()}>{`${pages[0]}>>`}</button>
  
  
        {visiblePageNumbers.map((page, index) => (
          <button
            className={`rounded-2xl px-4 py-2 mx-1 ${
              page === currentPage
                ? 'bg-red-700 text-white'
                : 'bg-blue-500 hover:bg-blue-700 text-white'
            }`}
            key={index}
            onClick={() => goToPage(page)}
          >
            {page}
          </button>
        ))}

        <button className = "mt-4 text-lg hover:text-red-700" onClick = {() => handleEndClick()}>{`<<${pages[pages.length - 1]}`}</button>
        
  
        {currentPage < Math.ceil(totalTransactions / postsPerPage) && (
          <button className = "bg-blue-500 px-4 rounded-2xl flex justify-center items-center mx-4 mt-4 hover:bg-blue-700 text-white tracking-wide" onClick={goToNextPage}>Next</button>
        )}
      </div>
    );
  }
  
  export default Pagination



  