import { EnquiriesWithCount } from '@/domains/enquiry/types';
import { createAsyncThunk } from '@reduxjs/toolkit';

import Toast from '@/components/shared/Toast';

import { DELETE_ENQUIRY, GET_ALL_ENQUIRUES } from '@/lib/utils/apiHelper';
import HttpClient from '@/lib/utils/axios/axiosWrapper';
import { DeletePayload } from '@/lib/utils/types';
import { QueryParams } from '@/lib/utils/types';

import { wrapAsync } from '../wrapAsync';

const fetchAllEnquiries = createAsyncThunk('enquiry/fetchAll', async (params: QueryParams) => {
  return wrapAsync(async () => {
    const res = await HttpClient.get<{ data: EnquiriesWithCount; message: string }>(
      GET_ALL_ENQUIRUES,
      {
        params,
      }
    );

    return res.data;
  });
});

const deleteEnquiry = createAsyncThunk<void, DeletePayload>('enquiry/delete', async (id) => {
  return wrapAsync(async () => {
    await HttpClient.delete(`${DELETE_ENQUIRY}/${id}`);
    Toast({ type: 'success', message: 'Enquiry Deleted Successfully!' });
    return;
  });
});

const enquiryThunk = {
  fetchAllEnquiries,
  deleteEnquiry,
};

export default enquiryThunk;
