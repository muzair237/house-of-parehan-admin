'use client';

import React from 'react';

import { cn } from '@/lib/utils';

type GridProps = {
  children: React.ReactNode;
  className?: string;
  cols: 1 | 2 | 3 | 4 | 5 | 6;
};

const gridColsMap: Record<GridProps['cols'], string> = {
  1: 'md:grid-cols-1',
  2: 'md:grid-cols-2',
  3: 'md:grid-cols-3',
  4: 'md:grid-cols-4',
  5: 'md:grid-cols-5',
  6: 'md:grid-cols-6',
};

export default function Grid({ children, className, cols = 2 }: GridProps) {
  return (
    <div className={cn('grid grid-cols-1 gap-4', gridColsMap[cols], className)}>{children}</div>
  );
}
