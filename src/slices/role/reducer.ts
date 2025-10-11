import { RoleState, RolesWithCount } from '@/domains/role/types';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { Option } from '@/lib/utils/types';

import roleThunk from './thunk';

const initialState: RoleState = {
  roles: {
    items: [],
    totalItems: 0,
  },
  uniqueRoles: [],
  loading: false,
  error: null,
};

const roleSlice = createSlice({
  name: 'role',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(roleThunk.fetchAllRoles.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        roleThunk.fetchAllRoles.fulfilled,
        (state, action: PayloadAction<RolesWithCount>) => {
          state.roles = action.payload;
          state.loading = false;
        }
      )
      .addCase(roleThunk.fetchAllRoles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch roles';
      })

      .addCase(roleThunk.fetchUniqueRoles.fulfilled, (state, action: PayloadAction<Option[]>) => {
        state.uniqueRoles = action.payload;
        state.loading = false;
      });
  },
});

export default roleSlice.reducer;
