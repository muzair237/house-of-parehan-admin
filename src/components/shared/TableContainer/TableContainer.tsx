/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { useCallback, useEffect, useMemo, useState } from 'react';

import CreateEntityButton from '@/app/(protected)/_components/CreateEntityButton';
import { useAppDispatch, useAppSelector } from '@/slices/hooks';

import {
  TableHeader as ShadCNTableHeader,
  Table,
  TableHead,
  TableRow,
} from '@/components/ui/table';

import { parseDate } from '@/lib/utils/helper';

import Input from '../Input';
import TableBody from './TableBody';
import { TableHeader } from './TableHeader';
import TablePagination from './TablePagination';
import { tableConfigs } from './tableConfig';
import { tableDataSelectors, tableLoadingSelectors } from './tableSelector';
import { tableThunks } from './tableThunks';
import { SortDirection } from './types';

type DateRangeString = { startDate?: string; endDate?: string };
type FilterValue = string | boolean | DateRangeString | undefined;

type TableContainerProps = {
  entity: string;
  selectableRows?: boolean;
  maxSelectable?: number;
  hideActions?: boolean;
  onlyTable?: boolean;
  initialSelectedRows?: string[];
  additionalFilters?: Record<string, FilterValue>;
  onSelectedRowsChange?: (selectedRows: Record<string, any>[]) => void;
  disableRowCheckbox?: (row: Record<string, any>) => boolean;
};

const TableContainer: React.FC<TableContainerProps> = ({
  entity,
  selectableRows = false,
  maxSelectable,
  hideActions = false,
  onlyTable = false,
  initialSelectedRows = [],
  additionalFilters = {},
  onSelectedRowsChange,
  disableRowCheckbox,
}) => {
  const config = tableConfigs[entity];
  const {
    name,
    columns,
    filters = [],
    defaultSort = { key: '', direction: 'asc' as SortDirection },
    pageSize = 10,
  } = config;

  const dispatch = useAppDispatch();
  const loading = useAppSelector(tableLoadingSelectors[name as keyof typeof tableLoadingSelectors]);
  const data = useAppSelector(tableDataSelectors[name as keyof typeof tableDataSelectors]);

  const [page, setPage] = useState(1);
  const [filterValues, setFilterValues] = useState<Record<string, FilterValue>>({});
  const [sortKey, setSortKey] = useState(defaultSort.key);
  const [sortDirection, setSortDirection] = useState<SortDirection>(defaultSort.direction);

  const sortableColumns = columns.filter((col) => col.sortable);
  const sort = `${sortKey}:${sortDirection}`;

  const [selectedRows, setSelectedRows] = useState<Record<string, any>[]>([]);

  useEffect(() => {
    if (Array.isArray(initialSelectedRows) && data?.items?.length > 0) {
      const selectedObjects = data.items.filter((item: any) =>
        initialSelectedRows.includes(item._id)
      );

      setSelectedRows((prev) => {
        const prevIds = prev.map((item) => item._id).join(',');
        const nextIds = selectedObjects.map((item: any) => item._id).join(',');
        if (prevIds === nextIds) return prev;
        return selectedObjects;
      });
    }
  }, [initialSelectedRows, data.items]);

  const fetchData = useCallback(async () => {
    try {
      const thunk = tableThunks[name];
      if (!thunk) throw new Error(`Thunk not found for ${name}`);

      const sort = sortKey ? `${sortKey}:${sortDirection}` : undefined;

      await dispatch(
        thunk({
          page,
          limit: pageSize,
          ...filterValues,
          ...additionalFilters,
          sort,
        })
      );
    } catch (err) {
      console.error('Fetch error:', err);
    }
  }, [additionalFilters, dispatch, filterValues, name, page, pageSize, sortDirection, sortKey]);

  useEffect(() => {
    fetchData();
  }, [page, filterValues, sort]);

  useEffect(() => {
    if (data.items.length === 0 && page > 1) {
      setPage((prev) => prev - 1);
    }
  }, [data, page]);

  const handleFilterChange = (updated: Record<string, FilterValue>) => {
    setFilterValues(updated);
    setPage(1);
  };

  const handleSortKeyChange = (value: string) => {
    setSortKey(value);
    setPage(1);
  };

  const handleDirectionChange = (value: string) => {
    setSortDirection(value as SortDirection);
    setPage(1);
  };

  const handleRowSelect = (row: Record<string, any>, checked: boolean) => {
    setSelectedRows((prev) => {
      let updated: Record<string, any>[];
      if (checked) {
        if (maxSelectable && prev.length >= maxSelectable) return prev;
        updated = prev.some((item) => item._id === row._id) ? prev : [...prev, row];
      } else {
        updated = prev.filter((item) => item._id !== row._id);
      }

      onSelectedRowsChange?.(updated);

      return updated;
    });
  };

  const columnOptions = sortableColumns.map((col) => ({
    label: col.label,
    value: col.key as string,
  }));

  const directionOptions = [
    { label: 'Ascending', value: 'asc' },
    { label: 'Descending', value: 'desc' },
  ];

  const ActionBtns = config.actionBtns;

  const transformedData = useMemo(() => {
    let baseColumns = columns
      .filter((col) => !(col.key === 'actions' && hideActions)) // remove actions if hideActions
      .map((col) => ({
        ...col,
        render: (row: Record<string, any>) => {
          if (col.render) return col.render(row, row.id);

          if (col.key === 'actions' && ActionBtns) {
            return <ActionBtns row={row} refetch={fetchData} />;
          }

          const value = row[col.key];
          if (
            value instanceof Date ||
            (typeof value === 'string' && isNaN(Number(value)) && !isNaN(Date.parse(value)))
          ) {
            return parseDate(value);
          }

          return value ?? '-';
        },
      }));

    if (selectableRows) {
      baseColumns = [
        {
          key: '__checkbox__',
          label: '',
          render: (row: Record<string, any>) => (
            <Input
              name="selectedRow"
              type="checkbox"
              checked={selectedRows.some((ele) => ele._id === row._id)}
              onChange={(checked: boolean) => handleRowSelect(row, checked)}
              disabled={
                (disableRowCheckbox && disableRowCheckbox(row)) ||
                (!selectedRows.some((ele) => ele._id === row._id) &&
                  maxSelectable !== undefined &&
                  selectedRows.length >= maxSelectable)
              }
            />
          ),
        },
        ...baseColumns,
      ];
    }

    return baseColumns;
  }, [columns, ActionBtns, fetchData, selectableRows, selectedRows, maxSelectable, hideActions]);

  return (
    <div className="w-full space-y-4">
      {!onlyTable && (
        <div className="flex flex-wrap items-center justify-between gap-x-4">
          {filters.length > 0 && (
            <TableHeader filters={filters} onFilterChange={handleFilterChange} />
          )}

          <div className="ml-auto flex gap-2 min-w-[220px]">
            <Input
              name="sortKey"
              type="select"
              id="sortKey"
              value={sortKey}
              onChange={(val: string) => handleSortKeyChange(val)}
              options={columnOptions}
              placeholder="Sort By"
              className="min-w-[140px] bg-[var(--input)] text-[var(--foreground)] border border-[var(--border)] focus-visible:ring-1 focus-visible:ring-[var(--ring)] rounded-md transition-shadow focus-visible:shadow-sm"
            />

            <Input
              name="sortDirection"
              type="select"
              id="sortDirection"
              value={sortDirection}
              onChange={(val: string) => handleDirectionChange(val)}
              options={directionOptions}
              placeholder="Direction"
              className="min-w-[130px] bg-[var(--input)] text-[var(--foreground)] border border-[var(--border)] focus-visible:ring-1 focus-visible:ring-[var(--ring)] rounded-md transition-shadow focus-visible:shadow-sm"
            />
          </div>
        </div>
      )}

      {!onlyTable && config.createEntityButton && !hideActions && (
        <div className="w-full flex justify-between items-center py-2">
          <div className="text-sm text-[var(--muted-foreground)]">
            Showing{' '}
            <span className="font-semibold text-[var(--foreground)]">
              {(page - 1) * pageSize + 1} – {Math.min(page * pageSize, data.totalItems)}
            </span>{' '}
            of <span className="font-semibold text-[var(--foreground)]">{data.totalItems}</span>{' '}
            items
          </div>
          <CreateEntityButton entity={config.name} refetch={fetchData} />
        </div>
      )}

      <div className="overflow-auto border rounded-lg shadow-sm bg-background">
        <Table className="min-w-[700px] w-full border-collapse text-sm text-muted-foreground">
          <ShadCNTableHeader>
            <TableRow className="bg-muted border-b border-border">
              {transformedData.map((col) => (
                <TableHead
                  key={col.key as string}
                  className="px-4 py-3 font-medium text-left whitespace-nowrap select-none"
                >
                  {col.label}
                </TableHead>
              ))}
            </TableRow>
          </ShadCNTableHeader>

          <TableBody data={data.items} loading={loading} columns={transformedData} />
        </Table>
      </div>

      <div className="flex justify-end">
        <TablePagination
          page={page}
          pageSize={pageSize}
          totalCount={data.totalItems}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
};

export default TableContainer;
