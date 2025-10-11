import { ProductState, ProductsWithCount } from '@/domains/product/types';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import productThunk from './thunk';

const initialState: ProductState = {
  products: {
    items: [],
    totalItems: 0,
  },
  loading: false,
  error: null,
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(productThunk.fetchAllProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        productThunk.fetchAllProducts.fulfilled,
        (state, action: PayloadAction<ProductsWithCount>) => {
          state.products = action.payload;
          state.loading = false;
        }
      )
      .addCase(productThunk.fetchAllProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch products';
      });
  },
});

export default productSlice.reducer;
