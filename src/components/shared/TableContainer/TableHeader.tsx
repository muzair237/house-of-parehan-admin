'use client';

import React, { useEffect, useRef, useState } from 'react';

import HttpClient from '@/lib/utils/axios/axiosWrapper';
import { Option } from '@/lib/utils/types';

import Button from '../Button';
import DatePicker from '../DatePicker';
import AppIcon from '../Icon';
import Input from '../Input';
import Label from '../Label';
import { TableFilter } from './types';

type DateRangeString = { startDate?: string; endDate?: string };

type FilterValue = string | DateRangeString | undefined;

type TableHeaderProps = {
  filters: TableFilter[];
  onFilterChange: (filters: Record<string, FilterValue>) => void;
};

function isDateRange(val: FilterValue): val is DateRangeString {
  return typeof val === 'object' && val !== null && ('startDate' in val || 'endDate' in val);
}

function isString(val: FilterValue): val is string {
  return typeof val === 'string';
}

export const TableHeader: React.FC<TableHeaderProps> = ({ filters, onFilterChange }) => {
  const [filterValues, setFilterValues] = useState<Record<string, FilterValue>>({});
  const [appliedFilters, setAppliedFilters] = useState<Record<string, FilterValue>>({});
  const [dropdownOptions, setDropdownOptions] = useState<Record<string, Option[]>>({});
  const debounceTimeouts = useRef<Record<string, NodeJS.Timeout>>({});

  useEffect(() => {
    const initializeDropdowns = async () => {
      await Promise.all(
        filters.map(async (filter) => {
          if (filter.type === 'select') {
            if (filter.options) {
              setDropdownOptions((prev) => ({
                ...prev,
                [filter.key]: filter.options!,
              }));
            } else if (filter.apiEndpoint) {
              try {
                const res = await HttpClient.get<{ data: { items: Option[] } }>(filter.apiEndpoint);
                setDropdownOptions((prev) => ({
                  ...prev,
                  [filter.key]: res.data?.items || [],
                }));
              } catch (err) {
                console.error(`Failed to load options for ${filter.key}`, err);
              }
            }
          }
        })
      );
    };

    initializeDropdowns();
  }, [filters]);

  const handleChange = (key: string, value: FilterValue) => {
    const newFilters = { ...filterValues, [key]: value };
    setFilterValues(newFilters);

    // If the value is a complete date range, apply immediately
    if (isDateRange(value) && value.startDate && value.endDate) {
      setAppliedFilters(newFilters);

      const flatFilters: Record<string, FilterValue> = {};
      Object.entries(newFilters).forEach(([k, v]) => {
        if (isDateRange(v)) {
          if (v.startDate) flatFilters['startDate'] = v.startDate;
          if (v.endDate) flatFilters['endDate'] = v.endDate;
        } else {
          flatFilters[k] = v;
        }
      });

      onFilterChange(flatFilters);
      return;
    }

    // Otherwise debounce
    if (debounceTimeouts.current[key]) {
      clearTimeout(debounceTimeouts.current[key]);
    }

    debounceTimeouts.current[key] = setTimeout(() => {
      const updated = { ...filterValues, [key]: value };
      setAppliedFilters(updated);

      const flatFilters: Record<string, FilterValue> = {};
      Object.entries(updated).forEach(([k, v]) => {
        if (isDateRange(v)) {
          if (v.startDate) flatFilters['startDate'] = v.startDate;
          if (v.endDate) flatFilters['endDate'] = v.endDate;
        } else {
          flatFilters[k] = v;
        }
      });

      onFilterChange(flatFilters);
    }, 400);
  };

  const handleClearOne = (key: string) => {
    const updated = { ...appliedFilters, [key]: '' };
    setFilterValues(updated);
    setAppliedFilters(updated);
    onFilterChange(updated);
  };

  const handleReset = () => {
    const cleared = filters.reduce<Record<string, FilterValue>>((acc, filter) => {
      acc[filter.key] = '';
      return acc;
    }, {});
    setFilterValues(cleared);
    setAppliedFilters(cleared);
    onFilterChange(cleared);
  };

  useEffect(() => {
    return () => {
      Object.values(debounceTimeouts.current).forEach(clearTimeout);
    };
  }, []);

  const activeFilters = filters.filter((filter) => {
    const val = appliedFilters[filter.key];
    if (isDateRange(val)) {
      return !!val.startDate || !!val.endDate;
    }
    return isString(val) && val.trim() !== '';
  });

  return (
    <div className="w-full mb-5">
      <div className="flex flex-wrap items-start gap-x-4 gap-y-4 rounded-lg bg-muted/40 p-4 border border-border">
        {filters.map((filter) => {
          const value = filterValues[filter.key];

          return (
            <div key={filter.key} className="flex flex-col gap-1 min-w-[200px]">
              <Label htmlFor={filter.key} className="text-sm font-medium text-muted-foreground">
                {filter.label}
              </Label>

              {filter.type === 'input' && (
                <Input
                  id={filter.key}
                  name={filter.key}
                  placeholder={filter.placeholder}
                  value={isString(value) ? value : ''}
                  onChange={(e: { target: { value: FilterValue } }) =>
                    handleChange(filter.key, e.target.value)
                  }
                  className="bg-[var(--input)] text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] border border-[var(--border)] focus-visible:ring-1 focus-visible:ring-[var(--ring)] rounded-md transition-shadow focus-visible:shadow-sm"
                />
              )}

              {filter.type === 'select' && (
                <Input
                  type="select"
                  name={filter.key}
                  id={filter.key}
                  value={isString(value) ? value : ''}
                  onChange={(val: FilterValue) => handleChange(filter.key, val as FilterValue)}
                  options={dropdownOptions[filter.key] || []}
                  placeholder={`Select ${filter.label}`}
                />
              )}

              {filter.type === 'date' && (
                <DatePicker
                  mode={filter.mode ?? 'single'}
                  value={
                    filter.mode === 'range'
                      ? isDateRange(value)
                        ? {
                            from: value.startDate ? new Date(value.startDate) : undefined,
                            to: value.endDate ? new Date(value.endDate) : undefined,
                          }
                        : { from: undefined, to: undefined }
                      : isString(value)
                        ? new Date(value)
                        : undefined
                  }
                  onChange={(date) => {
                    if (filter.mode === 'range') {
                      const range = date as { from?: Date; to?: Date };
                      handleChange(filter.key, {
                        startDate: range.from?.toString(),
                        endDate: range.to?.toString(),
                      });
                    } else {
                      handleChange(filter.key, date ? date.toString() : '');
                    }
                  }}
                  placeholder={filter.placeholder ?? `Select ${filter.label}`}
                  className="bg-[var(--input)] text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] border border-[var(--border)] focus-visible:ring-1 focus-visible:ring-[var(--ring)] rounded-md transition-shadow focus-visible:shadow-sm"
                />
              )}
            </div>
          );
        })}

        <div className="flex-1" />

        {activeFilters.length > 0 && (
          <div className="self-end">
            <Button type="button" variant="outline" onClick={handleReset}>
              Clear All Filters
            </Button>
          </div>
        )}
      </div>

      <div
        className={`transition-[max-height,_opacity,_margin] duration-300 overflow-hidden ${
          activeFilters.length > 0 ? 'max-h-40 mt-2 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="flex flex-wrap gap-2 p-2 bg-muted/30 border border-border rounded-lg">
          {activeFilters.map((filter) => (
            <div
              key={filter.key}
              className="flex items-center bg-muted text-muted-foreground px-3 py-1 rounded-full text-sm shadow-sm hover:shadow-md transition-shadow"
            >
              <span className="mr-2 font-medium">{filter.label}</span>
              <button
                onClick={() => handleClearOne(filter.key)}
                className="ml-1 text-muted-foreground hover:text-destructive transition-all duration-150 cursor-pointer"
                title="Clear filter"
              >
                <AppIcon name="XIcon" size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
