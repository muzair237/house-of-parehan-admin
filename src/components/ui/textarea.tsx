'use client';

import * as React from 'react';

import { cn } from '@/lib/utils';

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => {
  return (
    <textarea
      ref={ref}
      data-slot="textarea"
      className={cn(
        'peer block w-full rounded-md border border-[var(--input)] bg-transparent px-3 py-2 text-sm shadow-sm',
        'placeholder:text-[var(--muted-foreground)] text-[var(--foreground)]',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-1',
        'focus-visible:border-[var(--ring)]',
        'transition-colors duration-500 ease-in-out',
        'disabled:cursor-not-allowed disabled:opacity-50',
        'resize-y min-h-[4rem]',
        className
      )}
      {...props}
    />
  );
});

Textarea.displayName = 'Textarea';

export { Textarea };
