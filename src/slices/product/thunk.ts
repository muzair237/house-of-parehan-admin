import { ProductsWithCount } from '@/domains/product/types';
import { createAsyncThunk } from '@reduxjs/toolkit';

import Toast from '@/components/shared/Toast';

import {
  CREATE_PRODUCT,
  DELETE_PRODUCT,
  GET_ALL_PRODUCTS,
  INCREASE_STOCK,
  MARK_AS_FEATURED,
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

const increaseStock = createAsyncThunk<void, { id: string; quantity: number }>(
  'product/increaseStock',
  async ({ id, quantity }) => {
    return wrapAsync(async () => {
      await HttpClient.patch(`${INCREASE_STOCK}/${id}`, { quantity });
      Toast({ type: 'success', message: 'Stock increased successfully!' });
    });
  }
);

const markAsFeatured = createAsyncThunk<void, { id: string; isFeatured: boolean }>(
  'product/markAsFeatured',
  async ({ id, isFeatured }) => {
    return wrapAsync(async () => {
      await HttpClient.patch(`${MARK_AS_FEATURED}/${id}`, { isFeatured });
      Toast({
        type: 'success',
        message: isFeatured
          ? 'Product marked as featured successfully!'
          : 'Product unmarked as featured successfully!',
      });
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
  increaseStock,
  deleteProduct,
  markAsFeatured,
};

export default productThunk;
