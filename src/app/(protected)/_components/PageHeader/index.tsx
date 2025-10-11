'use client';

import React from 'react';

import Heading from '@/components/shared/Heading';
import Paragraph from '@/components/shared/Paragraph';

import { cn } from '@/lib/utils';

interface PageHeaderProps {
  title: string;
  description?: string;
  className?: string;
  align?: 'left' | 'center' | 'right';
  icon?: React.ReactNode;
  action?: React.ReactNode;
}

export default function PageHeader({
  title,
  description,
  className,
  align = 'left',
  icon,
  action,
}: PageHeaderProps) {
  const alignmentStyles = {
    left: 'items-start text-left md:flex-row md:items-center md:justify-between',
    center: 'items-center text-center md:flex-col md:items-center md:text-center',
    right: 'items-end text-right md:flex-row-reverse md:items-center md:justify-between',
  };

  return (
    <div
      className={cn('pb-6 mb-6 w-full border-b border-[var(--border)] transition-all', className)}
    >
      <div
        className={cn(
          'flex gap-2 w-full flex-col',
          alignmentStyles[align as keyof typeof alignmentStyles]
        )}
      >
        <div className="flex items-center gap-2">
          {icon && <span className="text-primary">{icon}</span>}
          <Heading as="h1" size="xl" className="truncate">
            {title}
          </Heading>
        </div>
        {description && (
          <Paragraph
            size="sm"
            variant="muted"
            className={cn('max-w-prose', align === 'center' && 'mx-auto')}
          >
            {description}
          </Paragraph>
        )}
        {action && (
          <div
            className={cn(
              'mt-4 md:mt-0',
              align === 'center' && 'mx-auto',
              align === 'right' && 'ml-auto'
            )}
          >
            {action}
          </div>
        )}
      </div>
    </div>
  );
}
