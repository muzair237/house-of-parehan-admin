// types.ts
import { FC } from 'react';

import { Option } from '@/lib/utils/types';

export type SortDirection = 'asc' | 'desc';

export type TableColumn = {
  key: string;
  label: string;
  sortable?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  render?: (row: Record<string, any>, index: string) => React.ReactNode;
};

export type FilterType = 'input' | 'select' | 'date';

export type TableFilter =
  | {
      key: string;
      label: string;
      type: 'input';
      placeholder?: string;
    }
  | {
      key: string;
      label: string;
      type: 'select';
      placeholder?: string;
      options?: Option[];
      apiEndpoint?: string;
    }
  | {
      key: string;
      label: string;
      type: 'date';
      placeholder?: string;
      mode?: 'single' | 'range';
    };

export type TableConfig = {
  name: string;
  defaultSort?: { key: string; direction: SortDirection };
  columns: TableColumn[];
  filters?: TableFilter[];
  pageSize?: number;
  createEntityButton?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  actionBtns?: FC<any>;
};
