import { PermissionData, PermissionState, PermissionsWithCount } from '@/domains/permission/types';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { Option } from '@/lib/utils/types';

import permissionThunk from './thunk';

const initialState: PermissionState = {
  permissions: {
    items: [],
    totalItems: 0,
  },
  permissionsForRoles: [],
  parents: [],
  loading: false,
  error: null,
};

const permissionSlice = createSlice({
  name: 'permission',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(permissionThunk.fetchAllPermissions.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        permissionThunk.fetchAllPermissions.fulfilled,
        (state, action: PayloadAction<PermissionsWithCount>) => {
          state.permissions = action.payload;
          state.loading = false;
        }
      )
      .addCase(permissionThunk.fetchAllPermissions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch permissions';
      })

      .addCase(
        permissionThunk.fetchParentsOptions.fulfilled,
        (state, action: PayloadAction<Option[]>) => {
          state.parents = action.payload;
        }
      )

      .addCase(
        permissionThunk.fetchPermissions.fulfilled,
        (state, action: PayloadAction<PermissionData[]>) => {
          state.permissionsForRoles = action.payload;
        }
      );
  },
});

export default permissionSlice.reducer;
