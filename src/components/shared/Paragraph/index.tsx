'use client';

import React from 'react';

import { cn } from '@/lib/utils';

type ParagraphProps = {
  children: React.ReactNode;
  size?: 'xs' | 'sm' | 'base' | 'lg';
  variant?: 'default' | 'muted' | 'destructive' | 'primary' | 'secondary';
  className?: string;
};

const sizeMap = {
  xs: 'text-xs',
  sm: 'text-sm',
  base: 'text-base',
  lg: 'text-lg',
};

const variantMap = {
  default: 'text-foreground',
  muted: 'text-muted-foreground',
  destructive: 'text-destructive',
  primary: 'text-primary',
  secondary: 'text-secondary',
};

export default function Paragraph({
  children,
  size = 'base',
  variant = 'default',
  className,
}: ParagraphProps) {
  return <p className={cn(sizeMap[size], variantMap[variant], className)}>{children}</p>;
}
