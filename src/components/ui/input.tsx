'use client';

import * as React from 'react';

import { cn } from '@/lib/utils';

const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        ref={ref}
        data-slot="input"
        className={cn(
          'peer block w-full rounded-md border border-[var(--input)] bg-transparent px-3 py-2 text-sm shadow-sm',
          'placeholder:text-[var(--muted-foreground)] text-[var(--foreground)]',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-1',
          'focus-visible:border-[var(--ring)]',
          'transition-colors duration-500 ease-in-out',
          'disabled:cursor-not-allowed disabled:opacity-50',
          'file:border-0 file:bg-transparent file:text-sm file:font-medium',
          className,
          // Remove number input spinners
          type === 'number' &&
            'appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-moz-appearance]:textfield'
        )}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';

export { Input };
