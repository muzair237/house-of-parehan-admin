import { AdminData, AuthState } from '@/domains/auth/types';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { setCookie } from '@/lib/utils/helper';

import authThunk from './thunk';

const initialState: AuthState = {
  admin: null,
  permissions: [],
  isLoggedIn: false,
  allowedPages: [],
  isSessionExpired: false,
  isLoading: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setSessionExpiredModalState(state: AuthState) {
      state.isSessionExpired = true;
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(authThunk.login.fulfilled, (state) => {
        state.isLoggedIn = true;
      })

      .addCase(authThunk.me.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(authThunk.me.fulfilled, (state: AuthState, action: PayloadAction<AdminData>) => {
        const allowedPages = action.payload.permissions
          .filter((p) => p.includes('.nav'))
          .map((p) => `/${p.split('.')[0]}`);

        setCookie(process.env.NEXT_PUBLIC_ALLOWED_PAGES_COOKIE!, JSON.stringify(allowedPages));

        state.admin = action.payload;
        state.permissions = action.payload.permissions;
        state.isLoggedIn = true;
        state.allowedPages = allowedPages;
        state.isLoading = false;
      })

      .addCase(authThunk.me.rejected, (state) => {
        state.isLoggedIn = false;
        state.admin = null;
        state.permissions = [];
        state.allowedPages = [];
        state.isLoading = false;
      })

      .addCase(authThunk.logout.pending, (state) => {
        state.isLoggedIn = false;
        state.isLoading = true;
      })

      .addCase(authThunk.logout.fulfilled, (state) => {
        state.admin = null;
        state.isLoggedIn = false;
        state.permissions = [];
        state.allowedPages = [];
        state.isSessionExpired = false;
        state.isLoading = false;
      })

      .addCase(authThunk.logout.rejected, (state) => {
        state.admin = null;
        state.isLoggedIn = false;
        state.permissions = [];
        state.allowedPages = [];
        state.isSessionExpired = false;
        state.isLoading = false;
      });
  },
});

export const { setSessionExpiredModalState } = authSlice.actions;

export default authSlice.reducer;
