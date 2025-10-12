'use client';

import React, { useState } from 'react';

import Label from '@/components/shared/Label';
import { Checkbox as AppCheckbox } from '@/components/ui/checkbox';
import { Input as ShadCNInput } from '@/components/ui/input';
import { Textarea as ShadCNTextarea } from '@/components/ui/textarea';

import { cn } from '@/lib/utils';
import { Option } from '@/lib/utils/types';

import DatePicker from '../DatePicker';
import AppIcon from '../Icon';
import MultiSelectField from '../MultiSelect';
import Paragraph from '../Paragraph';
import Select from '../Select';
import UploadFile from '../UploadFile';

export type NativeChangeHandler = (
  event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
) => void;
type MultiSelectChangeHandler = (value: string[]) => void;
type SingleSelectChangeHandler = (value: string) => void;
type DateRangeValue = { startDate?: string; endDate?: string };
type DateChangeHandler = (value: string | DateRangeValue) => void;

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> {
  name: string;
  onChange?:
    | NativeChangeHandler
    | MultiSelectChangeHandler
    | SingleSelectChangeHandler
    | DateChangeHandler
    | ((files: File | File[] | null) => void)
    | ((checked: boolean) => void);
  isMulti?: boolean;
  label?: string;
  options?: Option[];
  id?: string;
  error?: string;
  helperText?: string;
  fullWidth?: boolean;
  required?: boolean;
  maxVisibleTags?: number;

  /** Date specific props */
  mode?: 'single' | 'range';
  minDate?: Date;
  maxDate?: Date;
  disableFutureDates?: boolean;
  disablePastDates?: boolean;
  maxFiles?: number;
  fileSize?: number;

  /** Value types for various modes */
  value?: string | number | string[] | Date | DateRangeValue | boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      id,
      label,
      type = 'text',
      error,
      helperText,
      fullWidth = true,
      required = false,
      options = [],
      isMulti,
      className,
      name,
      onChange,
      value,
      maxVisibleTags,
      mode = 'single',
      disableFutureDates,
      disablePastDates,
      minDate,
      maxDate,
      maxFiles,
      fileSize,
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);

    const handleNativeChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      (onChange as NativeChangeHandler)?.(e);
    };

    const renderDateValue = () => {
      if (mode === 'range') {
        const rangeValue = value as DateRangeValue;
        return {
          from: rangeValue?.startDate ? new Date(rangeValue.startDate) : undefined,
          to: rangeValue?.endDate ? new Date(rangeValue.endDate) : undefined,
        };
      }
      return value instanceof Date ? value : value ? new Date(value as string) : undefined;
    };

    const handleDateChange = (date?: Date | { from?: Date; to?: Date }) => {
      if (mode === 'range') {
        const range = date as { from?: Date; to?: Date };
        (onChange as DateChangeHandler)?.({
          startDate: range.from?.toISOString(),
          endDate: range.to?.toISOString(),
        });
      } else {
        (onChange as DateChangeHandler)?.(date ? (date as Date).toISOString() : '');
      }
    };

    return (
      <div className={cn('flex flex-col gap-2.5', fullWidth && 'w-full')}>
        {label && (
          <Label htmlFor={id} required={required}>
            {label}
          </Label>
        )}

        {type === 'password' ? (
          <div className="relative">
            <ShadCNInput
              ref={ref}
              id={id}
              name={name}
              type={showPassword ? 'text' : 'password'}
              onChange={handleNativeChange}
              aria-invalid={!!error}
              className={cn(
                'pr-10',
                error && 'border-[var(--destructive)] ring-[var(--destructive)] ring-1',
                className
              )}
              value={value as string | number | undefined}
              {...props}
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)] hover:text-[var(--foreground)] cursor-pointer"
              tabIndex={-1}
            >
              {showPassword ? <AppIcon name="Eye" /> : <AppIcon name="EyeOff" />}
            </button>
          </div>
        ) : type === 'select' ? (
          isMulti ? (
            <MultiSelectField
              name={name}
              options={options}
              value={(value as string[]) ?? []}
              onChange={(val) => (onChange as MultiSelectChangeHandler)?.(val)}
              placeholder={props.placeholder}
              className={className}
              maxVisibleTags={maxVisibleTags}
            />
          ) : (
            <Select
              id={id}
              name={name}
              required={required}
              fullWidth={fullWidth}
              value={value as string}
              onValueChange={(val) => (onChange as SingleSelectChangeHandler)?.(val)}
              options={options}
              placeholder={props.placeholder}
              disabled={props.disabled}
              className={className}
            />
          )
        ) : type === 'file' ? (
          <UploadFile
            isInvalid={!!error}
            multiple={props.multiple}
            maxFiles={maxFiles}
            fileSize={fileSize}
            displayFile={value as string | string[] | undefined}
            onChange={(files) => {
              const normalized = files === null ? [] : Array.isArray(files) ? files : [files];
              (onChange as (files: (string | File)[]) => void)?.(normalized);
            }}
          />
        ) : type === 'date' ? (
          <DatePicker
            value={renderDateValue()}
            onChange={handleDateChange}
            placeholder={props.placeholder ?? 'Select date'}
            mode={mode}
            className={className}
            minDate={minDate}
            maxDate={maxDate}
            disableFutureDates={disableFutureDates}
            disablePastDates={disablePastDates}
          />
        ) : type === 'textarea' ? (
          <ShadCNTextarea
            id={id}
            name={name}
            onChange={handleNativeChange}
            aria-invalid={!!error}
            className={cn(
              error && 'border-[var(--destructive)] ring-[var(--destructive)] ring-1',
              className
            )}
            value={value as string | number | undefined}
            {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
          />
        ) : type === 'checkbox' ? (
          <AppCheckbox
            id={id}
            checked={!!props.checked}
            disabled={props.disabled}
            onCheckedChange={(checked) => {
              (onChange as (val: boolean) => void)?.(!!checked);
            }}
            className={cn(className)}
          />
        ) : (
          <ShadCNInput
            ref={ref}
            id={id}
            name={name}
            type={type}
            onChange={handleNativeChange}
            aria-invalid={!!error}
            className={cn(
              error && 'border-[var(--destructive)] ring-[var(--destructive)] ring-1',
              className
            )}
            value={value as string | number | undefined}
            {...props}
          />
        )}

        {error ? (
          <Paragraph variant="destructive" size="sm">
            {error}
          </Paragraph>
        ) : helperText ? (
          <Paragraph size="sm" variant="muted">
            {helperText}
          </Paragraph>
        ) : null}
      </div>
    );
  }
);

Input.displayName = 'AppInput';
export default Input;
