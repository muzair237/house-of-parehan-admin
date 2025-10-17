'use client';

import React from 'react';

import Paragraph from '@/components/shared/Paragraph';

import { cn } from '@/lib/utils';

interface AuthHeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
}

const AuthHeader: React.FC<AuthHeaderProps> = ({ title, subtitle, className }) => {
  return (
    <div className={cn('text-center space-y-2', className)}>
      <h1 className="text-3xl md:text-2xl font-semibold tracking-tight text-[var(--foreground)]">
        {title}
      </h1>
      {subtitle && (
        <Paragraph variant="muted" size="sm">
          {subtitle}
        </Paragraph>
      )}
    </div>
  );
};

export default AuthHeader;
