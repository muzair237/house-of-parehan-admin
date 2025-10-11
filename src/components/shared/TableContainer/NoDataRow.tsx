'use client';

import React from 'react';

import { TableCell, TableRow } from '@/components/ui/table';

import AppIcon from '../Icon';
import Paragraph from '../Paragraph';

type NoDataRowProps = {
  colSpan: number;
  message?: string;
};

export const NoDataRow: React.FC<NoDataRowProps> = ({ colSpan, message = 'No Records Found!' }) => {
  return (
    <TableRow>
      <TableCell colSpan={colSpan} className="py-8">
        <div className="mx-auto w-fit max-w-[90%] sm:max-w-md flex items-center gap-3 rounded-md border border-muted px-4 py-3 bg-muted/40 text-muted-foreground shadow-sm">
          <AppIcon name="SearchX" className="h-5 w-5 text-destructive" />
          <Paragraph size="sm" variant="muted" className="text-center">
            {message}
          </Paragraph>
        </div>
      </TableCell>
    </TableRow>
  );
};
