import { ProductsWithCount } from '@/domains/product/types';
import { createAsyncThunk } from '@reduxjs/toolkit';

import Toast from '@/components/shared/Toast';

import {
  CREATE_PRODUCT,
  DELETE_PRODUCT,
  GET_ALL_PRODUCTS,
  UPDATE_PRODUCT,
} from '@/lib/utils/apiHelper';
import HttpClient from '@/lib/utils/axios/axiosWrapper';
import { DeletePayload, QueryParams } from '@/lib/utils/types';

import { wrapAsync } from '../wrapAsync';

const fetchAllProducts = createAsyncThunk('product/fetchAll', async (params: QueryParams) => {
  return wrapAsync(async () => {
    const res = await HttpClient.get<{ data: ProductsWithCount; message: string }>(
      GET_ALL_PRODUCTS,
      {
        params,
      }
    );
    return res.data;
  });
});

const createProduct = createAsyncThunk<void, FormData>('product/create', async (formData) => {
  return wrapAsync(async () => {
    await HttpClient.upload(CREATE_PRODUCT, 'POST', formData);
    Toast({ type: 'success', message: 'Product Created Successfully!' });
  });
});

const updateProduct = createAsyncThunk<void, { id: string; payload: FormData }>(
  'product/update',
  async ({ id, payload }) => {
    return wrapAsync(async () => {
      await HttpClient.put(`${UPDATE_PRODUCT}/${id}`, payload, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      Toast({ type: 'success', message: 'Product Updated Successfully!' });
    });
  }
);

const deleteProduct = createAsyncThunk<void, DeletePayload>('product/delete', async (id) => {
  return wrapAsync(async () => {
    await HttpClient.delete(`${DELETE_PRODUCT}/${id}`);
    Toast({ type: 'success', message: 'Product Deleted Successfully!' });
  });
});

const productThunk = {
  fetchAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
};

export default productThunk;
