'use client';

import * as React from 'react';

import { Label as ShadCNLabel } from '@/components/ui/label';

import { cn } from '@/lib/utils';

import Paragraph from '../Paragraph';

interface LabelProps extends React.ComponentProps<typeof ShadCNLabel> {
  required?: boolean;
  description?: string;
  tooltip?: React.ReactNode;
  children: React.ReactNode;
}

const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ required, description, tooltip, className, children, ...props }, ref) => {
    return (
      <div className="space-y-1.5">
        <div className="flex items-center gap-1.5">
          <ShadCNLabel ref={ref} className={cn('text-sm font-medium', className)} {...props}>
            {children}
            {required && <span className="ml-0.5 text-destructive">*</span>}
          </ShadCNLabel>
          {tooltip && <span className="text-muted-foreground text-xs">{tooltip}</span>}
        </div>
        {description && (
          <Paragraph variant="muted" size="sm">
            {description}
          </Paragraph>
        )}
      </div>
    );
  }
);

Label.displayName = 'AppLabel';

export default Label;
