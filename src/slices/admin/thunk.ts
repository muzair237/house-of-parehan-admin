import { AdminPayload, AdminsWithCount, PasswordFormValues } from '@/domains/admin/types';
import { createAsyncThunk } from '@reduxjs/toolkit';

import Toast from '@/components/shared/Toast';

import {
  CREATE_ADMIN,
  DELETE_ADMIN,
  FORCE_LOGOUT,
  GET_ALL_ADMINS,
  UPDATE_ADMIN,
  UPDATE_PASSWORD,
} from '@/lib/utils/apiHelper';
import HttpClient from '@/lib/utils/axios/axiosWrapper';
import { DeletePayload, QueryParams } from '@/lib/utils/types';

import { wrapAsync } from '../wrapAsync';

const fetchAllAdmins = createAsyncThunk('admin/fetchAll', async (params: QueryParams) => {
  return wrapAsync(async () => {
    const res = await HttpClient.get<{ data: AdminsWithCount; message: string }>(GET_ALL_ADMINS, {
      params,
    });
    return res.data;
  });
});

const createAdmin = createAsyncThunk<void, AdminPayload>('admin/create', async (payload) => {
  return wrapAsync(async () => {
    await HttpClient.post(CREATE_ADMIN, payload);
    Toast({ type: 'success', message: 'Admin Created Successfully!' });
  });
});

const updateAdmin = createAsyncThunk<void, { id: string; payload: AdminPayload }>(
  'admin/update',
  async ({ id, payload }) => {
    return wrapAsync(async () => {
      await HttpClient.put(`${UPDATE_ADMIN}/${id}`, payload);
      Toast({ type: 'success', message: 'Admin Updated Successfully!' });
    });
  }
);

const updatePassword = createAsyncThunk<void, { id: string; payload: PasswordFormValues }>(
  'admin/update-password',
  async ({ id, payload }) => {
    return wrapAsync(async () => {
      await HttpClient.patch(`${UPDATE_PASSWORD}/${id}`, payload);
      Toast({ type: 'success', message: 'Password Updated Successfully!' });
    });
  }
);

const forceLogout = createAsyncThunk<void, string>('admin/forceLogout', async (id) => {
  return wrapAsync(async () => {
    await HttpClient.delete(`${FORCE_LOGOUT}/${id}`);
    Toast({ type: 'success', message: 'Admin Logged Out Successfully!' });
  });
});

const deleteAdmin = createAsyncThunk<void, DeletePayload>('admin/delete', async (id) => {
  return wrapAsync(async () => {
    await HttpClient.delete(`${DELETE_ADMIN}/${id}`);
    Toast({ type: 'success', message: 'Admin Deleted Successfully!' });
  });
});

const adminThunk = {
  fetchAllAdmins,
  createAdmin,
  updateAdmin,
  updatePassword,
  forceLogout,
  deleteAdmin,
};

export default adminThunk;
