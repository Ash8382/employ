import React, { FC } from "react";
import { ChevronCompactLeft, ChevronCompactRight } from "react-bootstrap-icons";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const maxPagesToShow = 5;
  let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
  let endPage = startPage + maxPagesToShow - 1;
  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = Math.max(1, endPage - maxPagesToShow + 1);
  }

  const pageNumbers = [];
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      {currentPage > 1 && (
        <button
          aria-label="이전 페이지"
          onClick={() => onPageChange(currentPage - 1)}
          style={{ background: "none", border: "none", cursor: "pointer" }}
        >
          <ChevronCompactLeft size={24} />
        </button>
      )}

      {pageNumbers.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          style={{
            fontWeight: currentPage === page ? "bold" : "normal",
            color: currentPage === page ? "#3182ce" : "inherit",
            opacity: currentPage === page ? 1 : 0.5,
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "4px 8px",
            borderRadius: 4,
          }}
          aria-current={currentPage === page ? "page" : undefined}
        >
          {page}
        </button>
      ))}

      {currentPage < totalPages && (
        <button
          aria-label="다음 페이지"
          onClick={() => onPageChange(currentPage + 1)}
          style={{ background: "none", border: "none", cursor: "pointer" }}
        >
          <ChevronCompactRight size={24} />
        </button>
      )}
    </div>
  );
};

export default Pagination;
