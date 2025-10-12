import { AdminState, AdminsWithCount } from '@/domains/admin/types';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import adminThunk from './thunk';

const initialState: AdminState = {
  adminData: null,
  admins: {
    items: [],
    totalItems: 0,
  },
  loading: false,
  error: null,
};

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(adminThunk.fetchAllAdmins.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        adminThunk.fetchAllAdmins.fulfilled,
        (state, action: PayloadAction<AdminsWithCount>) => {
          state.admins = action.payload;
          state.loading = false;
        }
      )
      .addCase(adminThunk.fetchAllAdmins.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch admins';
      });
  },
});

export default adminSlice.reducer;
