'use client';

import { FieldValues, UseFormProps, UseFormReturn, useForm as useRHF } from 'react-hook-form';

export function useForm<T extends FieldValues>(props?: UseFormProps<T>): UseFormReturn<T> {
  return useRHF<T>({
    mode: 'onTouched',
    reValidateMode: 'onChange',
    shouldFocusError: true,
    shouldUseNativeValidation: false,
    ...props,
  });
}
