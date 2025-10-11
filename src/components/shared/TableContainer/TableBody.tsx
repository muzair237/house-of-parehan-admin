'use client';

import React from 'react';

import { TableCell, TableRow } from '@/components/ui/table';

import Skeleton from '../Skeleton';
import { NoDataRow } from './NoDataRow';
import { TableColumn } from './types';

interface TableBodyProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: Record<string, any>[];
  columns: TableColumn[];
  loading?: boolean;
}

const TableBody: React.FC<TableBodyProps> = ({ data, columns, loading = false }) => {
  return (
    <>
      {loading ? (
        <TableRow>
          <TableCell colSpan={columns.length} className="py-6 text-muted-foreground">
            <Skeleton rows={5} columns={columns.length} cellWidth="w-full" cellHeight="h-10" />
          </TableCell>
        </TableRow>
      ) : data && data.length > 0 ? (
        data.map((row, rowIndex) => (
          <TableRow
            key={row.id ?? rowIndex}
            className="transition-all duration-150 hover:bg-[var(--muted)] border-b"
          >
            {columns.map((col) => (
              <TableCell
                key={col.key}
                className="px-4 py-1 text-[var(--foreground)] whitespace-nowrap overflow-hidden text-ellipsis max-w-[200px]"
                title={String(row[col.key] ?? '-')}
              >
                {col.render ? col.render(row, col.key) : (row[col.key] ?? '-')}
              </TableCell>
            ))}
          </TableRow>
        ))
      ) : (
        <NoDataRow colSpan={columns.length} />
      )}
    </>
  );
};

export default TableBody;
