import { BaseFields } from '@/lib/utils/types';

import { ProductData } from '../product/types';

export enum TransactionStatus {
  PENDING = 0,
  PAID = 1,
}

export type TransactionProduct = {
  _id?: string;
  product: string | ProductData;
  quantity: number;
  priceAtSale: number;
};

export type TransactionData = BaseFields & {
  products: TransactionProduct[];
  totalAmount: number;
  status: TransactionStatus;
  referenceNumber: string;
  paidAt: string;
  note?: string;
};

export type TransactionPayload = {
  products: TransactionProduct[];
  totalAmount: number;
  status?: TransactionStatus;
  note?: string;
};

export type TransactionsWithCount = {
  items: TransactionData[];
  totalItems: number;
};

export type TransactionState = {
  transactions: TransactionsWithCount;
  loading: boolean;
  error: string | null;
};
