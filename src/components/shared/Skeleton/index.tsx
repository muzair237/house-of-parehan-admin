'use client';

import React from 'react';

import { Skeleton as ShadCNSkeleton } from '@/components/ui/skeleton';

import { cn } from '@/lib/utils';

type SkeletonWrapperProps = {
  rows?: number;
  columns?: number;
  cellWidth?: string;
  cellHeight?: string;
};

const Skeleton: React.FC<SkeletonWrapperProps> = ({
  rows = 4,
  columns = 3,
  cellWidth = 'w-full',
  cellHeight = 'h-4',
}) => {
  return (
    <div className="space-y-4">
      {Array.from({ length: rows }).map((_, rowIdx) => (
        <div key={rowIdx} className="flex gap-4">
          {Array.from({ length: columns }).map((_, colIdx) => (
            <ShadCNSkeleton key={colIdx} className={cn(cellWidth, cellHeight)} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Skeleton;
