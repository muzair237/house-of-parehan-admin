'use client';

import React from 'react';

import { Tooltip as BaseTooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

type TooltipProps = {
  label: string;
  children: React.ReactNode;
  side?: 'top' | 'bottom' | 'left' | 'right';
  sideOffset?: number;
  delayDuration?: number;
  className?: string;
};

const Tooltip: React.FC<TooltipProps> = ({
  label,
  children,
  side = 'top',
  sideOffset = 1,
  delayDuration = 150,
  className,
}) => {
  return (
    <BaseTooltip delayDuration={delayDuration}>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent side={side} sideOffset={sideOffset} className={className}>
        {label}
      </TooltipContent>
    </BaseTooltip>
  );
};

export default Tooltip;
