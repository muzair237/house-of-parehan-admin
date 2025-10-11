import { EnquiriesWithCount, EnquiryState } from '@/domains/enquiry/types';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import enquiryThunk from './thunk';

const initialState: EnquiryState = {
  enquiries: {
    items: [],
    totalItems: 0,
  },
  loading: false,
  error: null,
};

const enquirySlice = createSlice({
  name: 'enquiry',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(enquiryThunk.fetchAllEnquiries.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        enquiryThunk.fetchAllEnquiries.fulfilled,
        (state, action: PayloadAction<EnquiriesWithCount>) => {
          state.enquiries = action.payload;
          state.loading = false;
        }
      )
      .addCase(enquiryThunk.fetchAllEnquiries.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch enquiries';
      });
  },
});

export default enquirySlice.reducer;
