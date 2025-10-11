import { PasswordFormValues, UserPayload, UsersWithCount } from '@/domains/user/types';
import { createAsyncThunk } from '@reduxjs/toolkit';

import Toast from '@/components/shared/Toast';

import {
  CREATE_USER,
  DELETE_USER,
  FORCE_LOGOUT,
  GET_ALL_USERS,
  UPDATE_PASSWORD,
  UPDATE_USER,
} from '@/lib/utils/apiHelper';
import HttpClient from '@/lib/utils/axios/axiosWrapper';
import { DeletePayload, QueryParams } from '@/lib/utils/types';

import { wrapAsync } from '../wrapAsync';

const fetchAllUsers = createAsyncThunk('user/fetchAll', async (params: QueryParams) => {
  return wrapAsync(async () => {
    const res = await HttpClient.get<{ data: UsersWithCount; message: string }>(GET_ALL_USERS, {
      params,
    });
    return res.data;
  });
});

const createUser = createAsyncThunk<void, UserPayload>('user/create', async (payload) => {
  return wrapAsync(async () => {
    await HttpClient.post(CREATE_USER, payload);
    Toast({ type: 'success', message: 'User Created Successfully!' });
  });
});

const updateUser = createAsyncThunk<void, { id: string; payload: UserPayload }>(
  'user/update',
  async ({ id, payload }) => {
    return wrapAsync(async () => {
      await HttpClient.put(`${UPDATE_USER}/${id}`, payload);
      Toast({ type: 'success', message: 'User Updated Successfully!' });
    });
  }
);

const updatePassword = createAsyncThunk<void, { id: string; payload: PasswordFormValues }>(
  'user/update-password',
  async ({ id, payload }) => {
    return wrapAsync(async () => {
      await HttpClient.patch(`${UPDATE_PASSWORD}/${id}`, payload);
      Toast({ type: 'success', message: 'Password Updated Successfully!' });
    });
  }
);

const forceLogout = createAsyncThunk<void, string>('user/forceLogout', async (id) => {
  return wrapAsync(async () => {
    await HttpClient.delete(`${FORCE_LOGOUT}/${id}`);
    Toast({ type: 'success', message: 'User Logged Out Successfully!' });
  });
});

const deleteUser = createAsyncThunk<void, DeletePayload>('user/delete', async (id) => {
  return wrapAsync(async () => {
    await HttpClient.delete(`${DELETE_USER}/${id}`);
    Toast({ type: 'success', message: 'User Deleted Successfully!' });
  });
});

const userThunk = {
  fetchAllUsers,
  createUser,
  updateUser,
  updatePassword,
  forceLogout,
  deleteUser,
};

export default userThunk;
