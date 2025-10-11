import { BaseFields } from '@/lib/utils/types';

export enum TransactionStatus {
  PENDING = 0,
  PAID = 1,
}

export type TransactionData = {
  amount: number;
  status: TransactionStatus;
  paidAt: string;
  note: string;
} & BaseFields;

export type TransactionPayload = {
  installmentId: string;
  amount: number;
  status: TransactionStatus;
  paidAt?: string;
  note: string;
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
