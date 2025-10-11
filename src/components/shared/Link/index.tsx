'use client';

import { ReactNode } from 'react';

import NextLink from 'next/link';

import { cn } from '@/lib/utils';

const variantClasses = {
  default: 'text-primary hover:text-primary/80 underline-offset-2 hover:underline',
  muted: 'text-muted-foreground hover:text-foreground underline-offset-2 hover:underline',
  danger: 'text-destructive hover:text-destructive/80 underline-offset-2 hover:underline',
  underline: 'underline text-primary hover:no-underline underline-offset-2',
};

const sizeClasses = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
};

export default function Link({
  href,
  children,
  icon,
  iconPosition = 'start',
  variant = 'default',
  size = 'sm',
  className,
  external = false,
  onClick = () => {},
  ...props
}: {
  href?: string;
  children: ReactNode;
  className?: string;
  icon?: ReactNode;
  iconPosition?: 'start' | 'end';
  variant?: 'default' | 'muted' | 'danger' | 'underline';
  size?: 'sm' | 'md' | 'lg';
  external?: boolean;
  onClick?: () => void;
}) {
  const content = (
    <span className="inline-flex items-center gap-1">
      {icon && iconPosition === 'start' && icon}
      <span className="group-hover:underline">{children}</span>
      {icon && iconPosition === 'end' && icon}
    </span>
  );

  const commonClasses = cn(
    'group transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm cursor-pointer',
    variantClasses[variant],
    sizeClasses[size],
    className
  );

  if (!href) {
    return (
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onClick();
        }}
        className={commonClasses}
        {...props}
      >
        {content}
      </button>
    );
  }

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={commonClasses} {...props}>
        {content}
      </a>
    );
  }

  return (
    <NextLink href={href} className={commonClasses} {...props}>
      {content}
    </NextLink>
  );
}
