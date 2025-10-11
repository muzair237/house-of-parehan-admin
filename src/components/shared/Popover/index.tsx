'use client';

import * as React from 'react';

import { Popover as BasePopover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

interface PopoverProps {
  trigger: React.ReactNode;
  content: React.ReactNode;
  className?: string;
  align?: 'start' | 'center' | 'end';
  sideOffset?: number;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export default function Popover({
  trigger,
  content,
  className,
  align = 'center',
  sideOffset = 4,
  open,
  onOpenChange,
}: PopoverProps) {
  return (
    <BasePopover open={open} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>{trigger}</PopoverTrigger>
      <PopoverContent className={className} align={align} sideOffset={sideOffset}>
        {content}
      </PopoverContent>
    </BasePopover>
  );
}
