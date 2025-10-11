import {
  PermissionData,
  PermissionPayload,
  PermissionsWithCount,
} from '@/domains/permission/types';
import { createAsyncThunk } from '@reduxjs/toolkit';

import Toast from '@/components/shared/Toast';

import {
  CREATE_PERMISSION,
  DELETE_PERMISSION,
  GET_ALL_PERMISSIONS,
  GET_PARENTS,
  GET_PERMISSIONS,
  UPDATE_PERMISSION,
} from '@/lib/utils/apiHelper';
import HttpClient from '@/lib/utils/axios/axiosWrapper';
import { DeletePayload, Option, QueryParams } from '@/lib/utils/types';

import { wrapAsync } from '../wrapAsync';

const fetchAllPermissions = createAsyncThunk('permission/fetchAll', async (params: QueryParams) => {
  return wrapAsync(async () => {
    const res = await HttpClient.get<{ data: PermissionsWithCount; message: string }>(
      GET_ALL_PERMISSIONS,
      {
        params,
      }
    );
    return res.data;
  });
});

const createPermission = createAsyncThunk<void, PermissionPayload>(
  'permission/create',
  async (payload) => {
    return wrapAsync(async () => {
      await HttpClient.post(CREATE_PERMISSION, payload);
      Toast({ type: 'success', message: 'Permission Created Successfully!' });
    });
  }
);

const fetchParentsOptions = createAsyncThunk('permission/fetchParentOptions', async () => {
  return wrapAsync(async () => {
    const res = await HttpClient.get<{ data: { items: Option[] } }>(GET_PARENTS);
    return res.data.items;
  });
});

const fetchPermissions = createAsyncThunk('permission/fetchPermissions', async () => {
  return wrapAsync(async () => {
    const res = await HttpClient.get<{ data: { items: PermissionData[] } }>(GET_PERMISSIONS);
    return res.data.items;
  });
});

const updatePermission = createAsyncThunk<void, { id: string; payload: PermissionPayload }>(
  'permission/update',
  async ({ id, payload }) => {
    return wrapAsync(async () => {
      await HttpClient.put(`${UPDATE_PERMISSION}/${id}`, payload);
      Toast({ type: 'success', message: 'Permission Updated Successfully!' });
    });
  }
);

const deletePermission = createAsyncThunk<void, DeletePayload>('permission/delete', async (id) => {
  return wrapAsync(async () => {
    await HttpClient.delete(`${DELETE_PERMISSION}/${id}`);
    Toast({ type: 'success', message: 'Permission Deleted Successfully!' });
  });
});

const permissionThunk = {
  fetchAllPermissions,
  fetchParentsOptions,
  fetchPermissions,
  createPermission,
  updatePermission,
  deletePermission,
};

export default permissionThunk;
