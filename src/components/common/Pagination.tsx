import React from 'react';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange?: (perPage: number) => void;
  itemsPerPageOptions?: number[];
  className?: string;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange,
  itemsPerPageOptions = [12, 24, 48],
  className = '',
}) => {
  if (totalItems <= 0 || totalPages <= 1) {
    return null;
  }

  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  // Generate page numbers with ellipsis
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 4) {
        for (let i = 1; i <= 5; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 3) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 4; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push('...');
        pages.push(currentPage - 1);
        pages.push(currentPage);
        pages.push(currentPage + 1);
        pages.push('...');
        pages.push(totalPages);
      }
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div
      className={`flex flex-col sm:flex-row items-center justify-between gap-4 py-6 px-4 sm:px-6 rounded-2xl bg-surface border border-line shadow-xs transition-all ${className}`}
    >
      {/* Left: Item Counter & Per Page selector */}
      <div className="flex items-center gap-3 text-xs sm:text-sm text-muted font-medium">
        <span>
          Showing <strong className="text-ink font-bold">{startItem}–{endItem}</strong> of{' '}
          <strong className="text-ink font-bold">{totalItems}</strong> tools
        </span>

        {onItemsPerPageChange && (
          <div className="hidden sm:flex items-center gap-1.5 pl-3 border-l border-line">
            <span className="text-xs font-mono text-muted">Per page:</span>
            <select
              value={itemsPerPage}
              onChange={(e) => {
                onPageChange(1);
                onItemsPerPageChange(Number(e.target.value));
              }}
              className="bg-surface-alt dark:bg-slate-900 border border-line dark:border-slate-700 rounded-lg px-2.5 py-1 text-xs font-semibold text-ink dark:text-slate-100 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent cursor-pointer transition-colors shadow-2xs"
            >
              {itemsPerPageOptions.map((opt) => (
                <option key={opt} value={opt} className="bg-surface dark:bg-slate-900 text-ink dark:text-slate-100">
                  {opt}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Right: Page Navigation Buttons */}
      <div className="flex items-center gap-1 sm:gap-1.5">
        {/* First Page */}
        <button
          type="button"
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
          className="p-1.5 sm:p-2 rounded-xl text-muted hover:text-ink hover:bg-surface-alt border border-line disabled:opacity-40 disabled:pointer-events-none transition-colors"
          title="First Page"
          aria-label="Go to first page"
        >
          <ChevronsLeft className="w-4 h-4" />
        </button>

        {/* Previous Page */}
        <button
          type="button"
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className="p-1.5 sm:p-2 rounded-xl text-muted hover:text-ink hover:bg-surface-alt border border-line disabled:opacity-40 disabled:pointer-events-none transition-colors"
          title="Previous Page"
          aria-label="Go to previous page"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Page Numbers */}
        <div className="flex items-center gap-1">
          {pageNumbers.map((num, idx) => {
            if (num === '...') {
              return (
                <span
                  key={`ellipsis-${idx}`}
                  className="px-2 py-1 text-xs font-mono text-muted select-none"
                >
                  ...
                </span>
              );
            }

            const pageNum = Number(num);
            const isActive = pageNum === currentPage;

            return (
              <button
                key={pageNum}
                type="button"
                onClick={() => onPageChange(pageNum)}
                className={`min-w-[32px] sm:min-w-[36px] h-8 sm:h-9 px-2 sm:px-3 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                  isActive
                    ? 'bg-accent text-white shadow-xs font-bold'
                    : 'bg-surface-alt/70 text-ink hover:bg-surface-alt border border-line'
                }`}
                aria-current={isActive ? 'page' : undefined}
              >
                {pageNum}
              </button>
            );
          })}
        </div>

        {/* Next Page */}
        <button
          type="button"
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className="p-1.5 sm:p-2 rounded-xl text-muted hover:text-ink hover:bg-surface-alt border border-line disabled:opacity-40 disabled:pointer-events-none transition-colors"
          title="Next Page"
          aria-label="Go to next page"
        >
          <ChevronRight className="w-4 h-4" />
        </button>

        {/* Last Page */}
        <button
          type="button"
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
          className="p-1.5 sm:p-2 rounded-xl text-muted hover:text-ink hover:bg-surface-alt border border-line disabled:opacity-40 disabled:pointer-events-none transition-colors"
          title="Last Page"
          aria-label="Go to last page"
        >
          <ChevronsRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
