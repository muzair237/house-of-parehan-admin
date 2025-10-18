import { AdminData, LoginPayload } from '@/domains/auth/types';
import { createAsyncThunk } from '@reduxjs/toolkit';

import Toast from '@/components/shared/Toast';

import HttpClient from '@/lib/utils/axios/axiosWrapper';
import { clearMyBrowserData, setCookie } from '@/lib/utils/helper';

import { wrapAsync } from '../wrapAsync';

const login = createAsyncThunk(
  'auth/loginAdmin',
  async ({
    payload,
    navigate,
  }: {
    payload: LoginPayload;
    navigate: (path: string, options?: { replace?: boolean }) => void;
  }) => {
    return wrapAsync(async () => {
      const res = await HttpClient.post<
        typeof payload,
        { data: { token: string }; message: string }
      >('/auth/login', payload);
      const {
        data: { token },
        message,
      } = res;
      setCookie(process.env.NEXT_PUBLIC_TOKEN_COOKIE!, JSON.stringify(token));
      navigate('/dashboard', { replace: true });
      Toast({ type: 'success', message });
      return token;
    });
  }
);

const me = createAsyncThunk<AdminData>('auth/me', async () => {
  return wrapAsync(async () => {
    const res = await HttpClient.get<{ data: AdminData; message?: string }>('/auth/me');
    return res.data;
  });
});

const logout = createAsyncThunk(
  'logout/logoutAdmin',
  async ({ navigate }: { navigate: (path: string, options?: { replace?: boolean }) => void }) => {
    try {
      await HttpClient.get('/auth/logout');
    } finally {
      clearMyBrowserData();
      navigate('/login', { replace: true });
      Toast({ type: 'success', message: 'Logged Out Successfully!' });
    }
  }
);

const forgotPassword = createAsyncThunk('auth/forgotPassword', async (email: string) => {
  return wrapAsync(async () => {
    const res = await HttpClient.post<{ email: string }, { message: string }>(
      '/auth/forgot-password',
      { email }
    );
    Toast({ type: 'success', message: res.message });
    return true;
  });
});

const verifyOtp = createAsyncThunk(
  'auth/verifyOtp',
  async ({ email, otp }: { email: string; otp: string }) => {
    return wrapAsync(async () => {
      const res = await HttpClient.post<{ email: string; otp: string }, { message: string }>(
        '/auth/verify-otp',
        { email, otp }
      );
      Toast({ type: 'success', message: res.message });
      return true;
    });
  }
);

const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  async ({
    email,
    newPassword,
    navigate,
  }: {
    email: string;
    newPassword: string;
    navigate: (path: string, options?: { replace?: boolean }) => void;
  }) => {
    return wrapAsync(async () => {
      const res = await HttpClient.post<
        { email: string; newPassword: string },
        { message: string }
      >('/auth/reset-password', { email, newPassword });
      Toast({ type: 'success', message: res.message });
      navigate('/login', { replace: true });
      return true;
    });
  }
);

const authThunk = {
  login,
  me,
  logout,
  forgotPassword,
  verifyOtp,
  resetPassword,
};

export default authThunk;
