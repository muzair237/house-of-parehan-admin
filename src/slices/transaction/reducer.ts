import { TransactionState, TransactionsWithCount } from '@/domains/transaction/types';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import transactionThunk from './thunk';

const initialState: TransactionState = {
  transactions: {
    items: [],
    totalItems: 0,
  },
  loading: false,
  error: null,
};

const transactionSlice = createSlice({
  name: 'transaction',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(transactionThunk.fetchAllTransactions.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        transactionThunk.fetchAllTransactions.fulfilled,
        (state, action: PayloadAction<TransactionsWithCount>) => {
          state.transactions = action.payload;
          state.loading = false;
        }
      )
      .addCase(transactionThunk.fetchAllTransactions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch transactions';
      });
  },
});

export default transactionSlice.reducer;
