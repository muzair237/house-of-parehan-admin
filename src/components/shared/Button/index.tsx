'use client';

import * as React from 'react';

import { ShadCNButton, type ShadCNButtonProps } from '@/components/ui/button';

import { cn } from '@/lib/utils';

export interface AppButtonProps extends ShadCNButtonProps {
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
  minimal?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, AppButtonProps>(
  (
    {
      type = 'button',
      className,
      variant,
      size,
      asChild = false,
      fullWidth = false,
      minimal = false,
      loading = false,
      leftIcon,
      rightIcon,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <ShadCNButton
        type={type}
        ref={ref}
        variant={variant}
        size={size}
        asChild={asChild}
        disabled={disabled || loading}
        className={cn(
          fullWidth && 'w-full',
          minimal &&
            'p-0 bg-transparent hover:bg-transparent shadow-none focus-visible:ring-0 focus:outline-none',
          'relative',
          className
        )}
        {...props}
      >
        {loading && (
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="animate-spin size-4 rounded-full border-2 border-t-transparent border-current" />
          </span>
        )}
        <span
          className={cn(
            'flex items-center gap-1.5 transition-opacity',
            loading ? 'opacity-0' : 'opacity-100'
          )}
        >
          {leftIcon && <span className="mr-1.5">{leftIcon}</span>}
          {children}
          {rightIcon && <span className="ml-1.5">{rightIcon}</span>}
        </span>
      </ShadCNButton>
    );
  }
);

export type ButtonVariant =
  | 'default'
  | 'destructive'
  | 'outline'
  | 'secondary'
  | 'ghost'
  | 'link'
  | 'success'
  | 'warning'
  | 'info'
  | 'muted';

Button.displayName = 'AppButton';

export default Button;
