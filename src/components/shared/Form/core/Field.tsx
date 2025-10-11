'use client';

import React, { useMemo } from 'react';

import { Controller, useFormContext } from 'react-hook-form';

import Input, { InputProps } from '@/components/shared/Input';

import { mergeRules } from '../utils/mergeRules';
import { FieldRule } from '../utils/types';

interface FieldProps extends Omit<InputProps, 'error' | 'onChange' | 'value'> {
  name: string;
  rules?: FieldRule[];
  value?: string | number;
  dateType?: 'start' | 'end';
  relatedField?: string;
}

export function Field({
  name,
  rules = [],
  type,
  value,
  isMulti,
  dateType,
  relatedField,
  ...rest
}: FieldProps) {
  const {
    register,
    control,
    formState: { errors },
    watch,
  } = useFormContext();

  const relatedValue = relatedField ? watch(relatedField) : undefined;

  const mergedRules = useMemo(() => {
    const hasParentRequired = rules.some((rule) => 'required' in rule);

    const dateRules: FieldRule[] =
      dateType === 'start'
        ? [
            ...(!hasParentRequired ? [{ required: true, message: `${name} is required` }] : []),
            {
              validate: (value) =>
                relatedValue && value && new Date(value) > new Date(relatedValue)
                  ? `${name} cannot be after ${relatedField}`
                  : true,
            },
          ]
        : dateType === 'end'
          ? [
              {
                validate: (value) => {
                  if (!value && !hasParentRequired) return true;
                  if (!value && hasParentRequired) return `${name} is required`;
                  return relatedValue && new Date(value) < new Date(relatedValue)
                    ? `${name} cannot be before ${relatedField}`
                    : true;
                },
              },
            ]
          : [];

    return mergeRules([...rules, ...dateRules]);
  }, [rules, dateType, relatedValue, name, relatedField]);

  const error = errors?.[name]?.message as string | undefined;

  const isRequired = useMemo(
    () => rules.some((rule) => 'required' in rule && rule.required),
    [rules]
  );

  if (
    type === 'select' ||
    type === 'date' ||
    type === 'file' ||
    type === 'textarea' ||
    value !== undefined
  ) {
    return (
      <Controller
        name={name}
        control={control}
        rules={mergedRules}
        render={({ field }) => (
          <Input
            {...field}
            name={name}
            value={value ?? field.value}
            error={error}
            type={type}
            isMulti={isMulti}
            required={isRequired}
            minDate={dateType === 'end' && relatedValue ? new Date(relatedValue) : undefined}
            maxDate={dateType === 'start' && relatedValue ? new Date(relatedValue) : undefined}
            {...rest}
          />
        )}
      />
    );
  }

  const { ref, onChange, onBlur, name: fieldName } = register(name, mergedRules);

  return (
    <Input
      ref={ref}
      name={fieldName}
      onChange={onChange}
      onBlur={onBlur}
      error={error}
      type={type}
      required={isRequired}
      isMulti={isMulti}
      {...rest}
    />
  );
}
