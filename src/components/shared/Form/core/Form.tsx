'use client';

import React from 'react';

import { FieldValues, FormProvider, SubmitHandler, UseFormReturn } from 'react-hook-form';

import { cn } from '@/lib/utils';

interface FormProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  onSubmit: SubmitHandler<T>;
  children: React.ReactNode;
  className?: string;
}

export function Form<T extends FieldValues>({ form, onSubmit, children, className }: FormProps<T>) {
  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={cn('space-y-6', className)}>
        {children}
      </form>
    </FormProvider>
  );
}
