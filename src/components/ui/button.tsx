'use client';

import * as React from 'react';

import { Slot } from '@radix-ui/react-slot';
import { type VariantProps, cva } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'cursor-pointer inline-flex items-center justify-center gap-2 rounded-md font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none whitespace-nowrap [&_svg:not([class*="size-"])]:size-4 [&_svg]:shrink-0 active:scale-[0.97]',
  {
    variants: {
      variant: {
        default: `
          bg-[var(--primary)] 
          text-[var(--primary-foreground,#ffffff)] 
          hover:bg-opacity-90 
          focus-visible:ring-[var(--primary)] 
          focus-visible:ring-offset-[var(--background)] 
          shadow-md
        `,
        outline: `
          border border-[var(--border)] 
          bg-transparent 
          text-[var(--foreground)] 
          hover:bg-[var(--muted)] 
          focus-visible:ring-[var(--muted)] 
          focus-visible:ring-offset-[var(--background)]
        `,
        ghost: `
          bg-transparent 
          text-[var(--foreground)] 
          hover:bg-[var(--muted)] 
          focus-visible:ring-[var(--muted)] 
          focus-visible:ring-offset-[var(--background)]
        `,
        secondary: `
          bg-[var(--secondary)] 
          text-[var(--secondary-foreground,#ffffff)] 
          hover:bg-opacity-90 
          focus-visible:ring-[var(--secondary)] 
          focus-visible:ring-offset-[var(--background)]
        `,
        destructive: `
          bg-[var(--destructive)] 
          text-[var(--destructive-foreground,#ffffff)] 
          hover:bg-opacity-90 
          focus-visible:ring-[var(--destructive)] 
          focus-visible:ring-offset-[var(--background)]
        `,
        success: `
          bg-[var(--success)] 
          text-[var(--success-foreground,#ffffff)] 
          hover:bg-opacity-90 
          focus-visible:ring-[var(--success)] 
          focus-visible:ring-offset-[var(--background)]
        `,
        warning: `
          bg-[var(--warning)] 
          text-[var(--warning-foreground,#000000)] 
          hover:bg-opacity-90 
          focus-visible:ring-[var(--warning)] 
          focus-visible:ring-offset-[var(--background)]
        `,
        info: `
          bg-[var(--info)] 
          text-[var(--info-foreground,#ffffff)] 
          hover:bg-opacity-90 
          focus-visible:ring-[var(--info)] 
          focus-visible:ring-offset-[var(--background)]
        `,
        muted: `
          bg-[var(--muted)] 
          text-[var(--muted-foreground,var(--foreground))] 
          hover:bg-opacity-80 
          focus-visible:ring-[var(--muted)] 
          focus-visible:ring-offset-[var(--background)]
        `,
        link: `
          bg-transparent 
          text-[var(--primary)] 
          underline underline-offset-4 
          hover:text-opacity-80 
          focus-visible:ring-0
        `,
      },
      size: {
        default: 'h-10 px-5 text-sm',
        sm: 'h-8 px-3 text-xs',
        lg: 'h-12 px-6 text-base',
        icon: 'h-10 w-10 p-0',
      },
      fullWidth: {
        true: 'w-full',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      fullWidth: false,
    },
  }
);

export interface ShadCNButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const ShadCNButton = React.forwardRef<HTMLButtonElement, ShadCNButtonProps>(
  ({ className, variant, size, fullWidth, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, fullWidth }), className)}
        ref={ref}
        {...props}
      />
    );
  }
);

ShadCNButton.displayName = 'ShadCNButton';

export { ShadCNButton, buttonVariants };
