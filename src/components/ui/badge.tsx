'use client';

import * as React from 'react';

import { Slot } from '@radix-ui/react-slot';
import { type VariantProps, cva } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center justify-center font-medium w-fit whitespace-nowrap shrink-0 gap-1 overflow-hidden transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--ring)] [&>svg]:size-3 [&>svg]:pointer-events-none',
  {
    variants: {
      variant: {
        default:
          'bg-[var(--primary)] text-[var(--primary-foreground)] border border-transparent hover:bg-[color-mix(in srgb, var(--primary) 90%, black)]',
        secondary:
          'bg-[var(--secondary)] text-[var(--secondary-foreground)] border border-transparent hover:bg-[color-mix(in srgb, var(--secondary) 90%, black)]',
        destructive:
          'bg-[var(--destructive)] text-[var(--destructive-foreground)] border border-transparent hover:bg-[color-mix(in srgb, var(--destructive) 90%, black)]',
        success:
          'bg-[var(--success)] text-[var(--success-foreground)] border border-transparent hover:bg-[color-mix(in srgb, var(--success) 90%, black)]',
        warning:
          'bg-[var(--warning)] text-[var(--warning-foreground)] border border-transparent hover:bg-[color-mix(in srgb, var(--warning) 90%, black)]',
        info: 'bg-[var(--info)] text-[var(--info-foreground)] border border-transparent hover:bg-[color-mix(in srgb, var(--info) 90%, black)]',
        muted:
          'bg-[var(--muted)] text-[var(--muted-foreground)] border border-transparent hover:bg-[color-mix(in srgb, var(--muted) 90%, black)]',
        outline: 'border border-[var(--border)] text-[var(--foreground)] hover:bg-[var(--muted)]',
        ghost: 'bg-transparent text-[var(--foreground)] hover:bg-[var(--muted)]',
      },
      size: {
        sm: 'text-xs px-2 py-0.5',
        md: 'text-sm px-2.5 py-0.5',
        lg: 'text-sm px-3 py-1',
      },
      rounded: {
        sm: 'rounded',
        md: 'rounded-[var(--radius)]',
        lg: 'rounded-lg',
        full: 'rounded-full',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
      rounded: 'md',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  asChild?: boolean;
}

function Badge({ className, variant, size, rounded, asChild = false, ...props }: BadgeProps) {
  const Comp = asChild ? Slot : 'span';
  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant, size, rounded }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
