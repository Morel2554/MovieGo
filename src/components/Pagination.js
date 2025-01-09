import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handlePrev = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  return (
    <div className="Pagination">
        <button
        onClick={handlePrev}
        disabled={currentPage === 1}
        className="Pagination-button"
        >
        Prev
      </button>
      <span className="Pagination-info">
        Page {currentPage} of {totalPages}
      </span>
      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className="Pagination-button"
        >
        Next
      </button>
    </div>
  );
};

export default Pagination;
