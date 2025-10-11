'use client';

import React, { useEffect, useState } from 'react';

import { ChevronDownIcon } from 'lucide-react';
import { DateRange, Matcher } from 'react-day-picker';

import Button from '@/components/shared/Button';
import { Calendar } from '@/components/ui/calendar';

import { cn } from '@/lib/utils';

import Popover from '../Popover';

interface DatePickerProps {
  value?: Date | { from?: Date; to?: Date };
  onChange?: (date?: Date | { from?: Date; to?: Date }) => void;
  placeholder?: string;
  className?: string;
  mode?: 'single' | 'range';
  disableFutureDates?: boolean;
  disablePastDates?: boolean;
  minDate?: Date;
  maxDate?: Date;
}

export default function DatePicker({
  value,
  onChange,
  placeholder = 'Select date',
  className,
  mode = 'single',
  disableFutureDates = false,
  disablePastDates = false,
  minDate,
  maxDate,
}: DatePickerProps) {
  const [open, setOpen] = useState(false);
  const [tempRange, setTempRange] = useState<DateRange | undefined>();

  const isRangeMode = mode === 'range';

  const renderLabel = () => {
    if (isRangeMode && value && typeof value === 'object' && 'from' in value) {
      const from = value.from?.toLocaleDateString() ?? '';
      const to = value.to?.toLocaleDateString() ?? '';
      return from && to ? `${from} - ${to}` : from || to || placeholder;
    }
    return value instanceof Date ? value.toLocaleDateString() : placeholder;
  };

  const getDisabledDates = (): Matcher[] | undefined => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const matchers: Matcher[] = [];

    if (disableFutureDates) {
      matchers.push({ after: today } as Matcher);
    }
    if (disablePastDates) {
      matchers.push({ before: today } as Matcher);
    }
    if (minDate) {
      matchers.push({ before: minDate } as Matcher);
    }
    if (maxDate) {
      matchers.push({ after: maxDate } as Matcher);
    }

    return matchers.length > 0 ? matchers : undefined;
  };

  useEffect(() => {
    if (open && isRangeMode) {
      if (value && typeof value === 'object' && 'from' in value) {
        setTempRange(value as DateRange);
      } else {
        setTempRange(undefined);
      }
    }
  }, [open, value, isRangeMode]);

  // Default navigation limits (can be overridden by minDate/maxDate)
  const startMonth = minDate
    ? new Date(minDate.getFullYear(), minDate.getMonth())
    : new Date(2000, 0);
  const endMonth = maxDate
    ? new Date(maxDate.getFullYear(), maxDate.getMonth())
    : new Date(2100, 11);

  return (
    <div className="flex flex-col gap-1 w-full">
      <Popover
        open={open}
        onOpenChange={setOpen}
        trigger={
          <Button
            variant="outline"
            className={cn(
              'relative flex h-10 w-full items-center justify-between font-normal px-3',
              className
            )}
          >
            <span className="truncate">{renderLabel()}</span>
            <ChevronDownIcon className="absolute right-3 size-4 shrink-0" />
          </Button>
        }
        content={
          isRangeMode ? (
            <Calendar
              mode="range"
              selected={tempRange}
              required={false}
              captionLayout="dropdown"
              startMonth={startMonth}
              endMonth={endMonth}
              disabled={getDisabledDates()}
              onSelect={(date) => {
                if (!date) return;
                setTempRange(date);

                if (date.from && date.to && date.from.getTime() !== date.to.getTime()) {
                  onChange?.(date);
                  setOpen(false);
                  setTempRange(undefined);
                }
              }}
            />
          ) : (
            <Calendar
              mode="single"
              selected={value as Date}
              captionLayout="dropdown"
              startMonth={startMonth}
              endMonth={endMonth}
              disabled={getDisabledDates()}
              onSelect={(date) => {
                onChange?.(date);
                setOpen(false);
              }}
            />
          )
        }
        className="w-auto overflow-hidden p-0"
        align="start"
      />
    </div>
  );
}
