'use client';

import { useState } from 'react';

import { ChevronLeft, ChevronRight } from 'lucide-react';

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from '@/components/ui/pagination';

type TablePaginationProps = {
  page: number;
  pageSize: number;
  totalCount: number;
  onPageChange: (newPage: number) => void;
};

const range = (start: number, end: number) =>
  Array.from({ length: end - start + 1 }, (_, i) => start + i);

export default function TablePagination({
  page,
  pageSize,
  totalCount,
  onPageChange,
}: TablePaginationProps) {
  const totalPages = Math.ceil(totalCount / pageSize);
  const [inputPage, setInputPage] = useState<number | string>('');

  if (totalPages <= 1) return null;

  const renderPageNumbers = () => {
    const pagesToShow = 2;
    const start = Math.max(1, page - pagesToShow);
    const end = Math.min(totalPages, page + pagesToShow);
    const items = [];

    if (start > 1) {
      items.push(
        <PaginationItem key="first">
          <PaginationLink
            onClick={() => onPageChange(1)}
            className="px-2.5 py-1 text-xs rounded-md transition hover:bg-muted"
          >
            1
          </PaginationLink>
        </PaginationItem>
      );

      if (start > 2) {
        items.push(
          <PaginationItem key="start-ellipsis">
            <PaginationEllipsis className="text-muted-foreground px-1.5 text-xs" />
          </PaginationItem>
        );
      }
    }

    range(start, end).forEach((pageNumber) => {
      const isActive = pageNumber === page;

      items.push(
        <PaginationItem key={pageNumber}>
          <PaginationLink
            isActive={isActive}
            onClick={() => onPageChange(pageNumber)}
            className={`px-2.5 py-1 text-xs rounded-md font-medium transition-colors
              ${
                isActive
                  ? 'bg-[var(--primary)] text-[var(--primary-foreground)] shadow hover:bg-[var(--primary)]'
                  : 'text-muted-foreground hover:bg-muted'
              }`}
          >
            {pageNumber}
          </PaginationLink>
        </PaginationItem>
      );
    });

    if (end < totalPages) {
      if (end < totalPages - 1) {
        items.push(
          <PaginationItem key="end-ellipsis">
            <PaginationEllipsis className="text-muted-foreground px-1.5 text-xs" />
          </PaginationItem>
        );
      }

      items.push(
        <PaginationItem key="last">
          <PaginationLink
            onClick={() => onPageChange(totalPages)}
            className="px-2.5 py-1 text-xs rounded-md transition hover:bg-muted"
          >
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      );
    }

    return items;
  };

  return (
    <Pagination className="mt-6 w-full flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
      <PaginationContent className="ml-auto flex gap-1">
        <PaginationItem>
          <button
            onClick={() => onPageChange(Math.max(1, page - 1))}
            disabled={page === 1}
            className="px-2 py-1 text-xs rounded-md transition hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center"
          >
            <ChevronLeft className="h-3.5 w-3.5" />
          </button>
        </PaginationItem>

        {renderPageNumbers()}

        <PaginationItem>
          <button
            onClick={() => onPageChange(Math.min(totalPages, page + 1))}
            disabled={page === totalPages}
            className="px-2 py-1 text-xs rounded-md transition hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center"
          >
            <ChevronRight className="h-3.5 w-3.5" />
          </button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
