'use client';

import React from 'react';

import { cn } from '@/lib/utils';

import Skeleton from '../Skeleton';

type SidebarSkeletonProps = {
  rows?: number;
  hasChildren?: boolean;
  collapsed?: boolean;
};

const SidebarSkeleton: React.FC<SidebarSkeletonProps> = ({
  rows = 6,
  hasChildren = true,
  collapsed = false,
}) => {
  return (
    <div className="space-y-2 px-3">
      {Array.from({ length: rows }).map((_, idx) => (
        <div key={idx} className="space-y-1">
          <div
            className={cn(
              'flex items-center gap-2',
              collapsed ? 'justify-center' : 'justify-start'
            )}
          >
            <Skeleton rows={1} columns={1} cellWidth="w-6" cellHeight="h-6" />
            {!collapsed && <Skeleton rows={1} columns={1} cellWidth="w-32" cellHeight="h-4" />}
          </div>

          {hasChildren && !collapsed && (
            <div className="ml-5 space-y-1">
              <Skeleton rows={1} columns={1} cellWidth="w-24" cellHeight="h-3" />
              <Skeleton rows={1} columns={1} cellWidth="w-20" cellHeight="h-3" />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default SidebarSkeleton;
