'use client';

import React from 'react';

import Label from '@/components/shared/Label';
import {
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Select as ShadCNSelect,
} from '@/components/ui/select';

import { cn } from '@/lib/utils';
import { Option } from '@/lib/utils/types';

export interface AppSelectProps {
  name: string;
  id?: string;
  label?: string;
  error?: string;
  helperText?: string;
  required?: boolean;
  fullWidth?: boolean;
  placeholder?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  options: Option[];
  className?: string;
  disabled?: boolean;
}

const Select = React.forwardRef<HTMLDivElement, AppSelectProps>(
  (
    {
      name,
      id,
      label,
      required = false,
      fullWidth = true,
      placeholder = 'Select an option',
      value,
      onValueChange,
      options,
      className,
      disabled,
    },
    ref
  ) => {
    return (
      <div ref={ref} className={cn('flex flex-col gap-2.5', fullWidth && 'w-full')}>
        {label && (
          <Label htmlFor={id} required={required}>
            {label}
          </Label>
        )}

        <ShadCNSelect
          name={name}
          value={value?.toString()}
          onValueChange={onValueChange}
          disabled={disabled}
        >
          <SelectTrigger className={cn('w-full p-3 !h-9.5 text-left', className)}>
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {label && <Label>{label}</Label>}
              {options.map((option) => (
                <SelectItem
                  key={option.value as string}
                  value={(option.value as string).toString()}
                  className="cursor-pointer"
                >
                  {option.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </ShadCNSelect>
      </div>
    );
  }
);

Select.displayName = 'Select';
export default Select;
