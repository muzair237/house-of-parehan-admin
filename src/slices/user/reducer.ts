import { UserState, UsersWithCount } from '@/domains/user/types';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import userThunk from './thunk';

const initialState: UserState = {
  userData: null,
  users: {
    items: [],
    totalItems: 0,
  },
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(userThunk.fetchAllUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        userThunk.fetchAllUsers.fulfilled,
        (state, action: PayloadAction<UsersWithCount>) => {
          state.users = action.payload;
          state.loading = false;
        }
      )
      .addCase(userThunk.fetchAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch users';
      });
  },
});

export default userSlice.reducer;
