'use client';

import React from 'react';

import { cn } from '@/lib/utils';

type HeadingProps = {
  children: React.ReactNode;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  size?: 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';
  className?: string;
};

const sizeMap = {
  'sm': 'text-base font-semibold',
  'base': 'text-lg font-semibold',
  'lg': 'text-xl font-semibold',
  'xl': 'text-2xl font-bold',
  '2xl': 'text-3xl font-bold',
  '3xl': 'text-4xl font-bold',
  '4xl': 'text-5xl font-extrabold',
};

export default function Heading({
  children,
  as: Tag = 'h2',
  size = 'xl',
  className,
}: HeadingProps) {
  return <Tag className={cn('text-foreground', sizeMap[size], className)}>{children}</Tag>;
}
