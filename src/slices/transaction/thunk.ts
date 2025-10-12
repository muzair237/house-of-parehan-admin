import { TransactionPayload, TransactionsWithCount } from '@/domains/transaction/types';
import { createAsyncThunk } from '@reduxjs/toolkit';

import Toast from '@/components/shared/Toast';

import {
  CREATE_TRANSACTION,
  GET_ALL_TRANSACTIONS,
  MARK_TRANSACTION_AS_PAID,
} from '@/lib/utils/apiHelper';
import HttpClient from '@/lib/utils/axios/axiosWrapper';
import { QueryParams } from '@/lib/utils/types';

import { wrapAsync } from '../wrapAsync';

const fetchAllTransactions = createAsyncThunk(
  'transaction/fetchAll',
  async (params: QueryParams) => {
    return wrapAsync(async () => {
      const res = await HttpClient.get<{ data: TransactionsWithCount; message: string }>(
        GET_ALL_TRANSACTIONS,
        { params }
      );
      return res.data;
    });
  }
);

const createTransaction = createAsyncThunk<void, TransactionPayload>(
  'transaction/create',
  async (payload) => {
    return wrapAsync(async () => {
      await HttpClient.post(CREATE_TRANSACTION, payload);
      Toast({ type: 'success', message: 'Transaction Created Successfully!' });
    });
  }
);

const markAsPaid = createAsyncThunk<void, { _id: string }>(
  'transaction/markAsPaid',
  async ({ _id }) => {
    return wrapAsync(async () => {
      await HttpClient.get(`${MARK_TRANSACTION_AS_PAID}/${_id}`);
      Toast({ type: 'success', message: 'Transaction marked as paid successfully!' });
    });
  }
);

const transactionThunk = {
  fetchAllTransactions,
  createTransaction,
  markAsPaid,
};

export default transactionThunk;
