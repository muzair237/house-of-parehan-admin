'use client';

import React from 'react';

import { MultiSelect } from '@/components/ui/multi-select';

import { Option } from '@/lib/utils/types';

import Label from '../Label';

interface MultiSelectFieldProps {
  label?: string;
  name: string;
  options: Option[];
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
  maxVisibleTags?: number;
  className?: string;
}

const MultiSelectField: React.FC<MultiSelectFieldProps> = ({
  label,
  name,
  options,
  value,
  onChange,
  placeholder,
  maxVisibleTags,
  className,
}) => {
  return (
    <div className={className}>
      <Label htmlFor={name} className="mb-1 block">
        {label}
      </Label>

      <MultiSelect
        options={options}
        defaultValue={value}
        onValueChange={onChange}
        placeholder={placeholder}
        maxVisibleTags={maxVisibleTags}
        className={className}
      />
    </div>
  );
};

export default MultiSelectField;
