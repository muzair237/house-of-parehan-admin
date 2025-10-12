import { AdminData, LoginPayload } from '@/domains/auth/types';
import { createAsyncThunk } from '@reduxjs/toolkit';

import Toast from '@/components/shared/Toast';

import HttpClient from '@/lib/utils/axios/axiosWrapper';
import { clearMyBrowserData, setCookie } from '@/lib/utils/helper';

import { wrapAsync } from '../wrapAsync';

interface LogoutPayload {
  navigate: (path: string, options?: { replace?: boolean }) => void;
}

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

const logout = createAsyncThunk<void, LogoutPayload>('logout/logoutAdmin', async ({ navigate }) => {
  try {
    await HttpClient.get('/auth/logout');
  } finally {
    clearMyBrowserData();
    navigate('/login', { replace: true });
    Toast({ type: 'success', message: 'Logged Out Successfully!' });
  }
});

const authThunk = {
  login,
  me,
  logout,
};

export default authThunk;
