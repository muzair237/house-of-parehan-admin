// Update this to your actual response shape if needed
import { RolePayload, RolesWithCount } from '@/domains/role/types';
import { createAsyncThunk } from '@reduxjs/toolkit';

import Toast from '@/components/shared/Toast';

import {
  CREATE_ROLE,
  DELETE_ROLE,
  GET_ALL_ROLES,
  GET_UNIQUE_ROLES,
  UPDATE_ROLE,
} from '@/lib/utils/apiHelper';
import HttpClient from '@/lib/utils/axios/axiosWrapper';
import { DeletePayload, Option, QueryParams } from '@/lib/utils/types';

import { wrapAsync } from '../wrapAsync';

const fetchAllRoles = createAsyncThunk('role/fetchAll', async (params: QueryParams) => {
  return wrapAsync(async () => {
    const res = await HttpClient.get<{ data: RolesWithCount; message: string }>(GET_ALL_ROLES, {
      params,
    });
    return res.data;
  });
});

const fetchUniqueRoles = createAsyncThunk('role/fetchUnique', async () => {
  return wrapAsync(async () => {
    const res = await HttpClient.get<{ data: { items: Option[] } }>(GET_UNIQUE_ROLES);
    return res.data.items;
  });
});

const createRole = createAsyncThunk<void, RolePayload>('role/create', async (payload) => {
  return wrapAsync(async () => {
    await HttpClient.post(CREATE_ROLE, payload);
    Toast({ type: 'success', message: 'Role Created Successfully!' });
  });
});

const updateRole = createAsyncThunk<void, { id: string; payload: RolePayload }>(
  'role/update',
  async ({ id, payload }) => {
    return wrapAsync(async () => {
      await HttpClient.put(`${UPDATE_ROLE}/${id}`, payload);
      Toast({ type: 'success', message: 'Role Updated Successfully!' });
    });
  }
);

const deleteRole = createAsyncThunk<void, DeletePayload>('role/delete', async (id) => {
  return wrapAsync(async () => {
    await HttpClient.delete(`${DELETE_ROLE}/${id}`);
    Toast({ type: 'success', message: 'Role Deleted Successfully!' });
  });
});

const roleThunk = {
  fetchAllRoles,
  fetchUniqueRoles,
  createRole,
  updateRole,
  deleteRole,
};

export default roleThunk;
