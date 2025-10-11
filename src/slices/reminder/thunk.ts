import { ReminderPayload, RemindersWithCount } from '@/domains/reminder/types';
import { createAsyncThunk } from '@reduxjs/toolkit';

import Toast from '@/components/shared/Toast';

import {
  CREATE_REMINDER,
  DELETE_REMINDER,
  GET_ALL_REMINDERS,
  UPDATE_REMINDER,
} from '@/lib/utils/apiHelper';
import HttpClient from '@/lib/utils/axios/axiosWrapper';
import { DeletePayload, QueryParams } from '@/lib/utils/types';

import { wrapAsync } from '../wrapAsync';

const fetchAllReminders = createAsyncThunk('reminder/fetchAll', async (params: QueryParams) => {
  return wrapAsync(async () => {
    const res = await HttpClient.get<{ data: RemindersWithCount; message: string }>(
      GET_ALL_REMINDERS,
      {
        params,
      }
    );
    return res.data;
  });
});

// // Fetch reminders due today
// const fetchTodayReminders = createAsyncThunk('reminder/fetchToday', async () => {
//   return wrapAsync(async () => {
//     const res = await HttpClient.get<{ data: { items: ReminderData[] } }>(GET_TODAY_REMINDERS);
//     return res.data.items;
//   });
// });

const createReminder = createAsyncThunk<void, ReminderPayload>(
  'reminder/create',
  async (payload) => {
    return wrapAsync(async () => {
      await HttpClient.post(CREATE_REMINDER, payload);
      Toast({ type: 'success', message: 'Reminder Created Successfully!' });
    });
  }
);

const updateReminder = createAsyncThunk<void, { id: string; payload: ReminderPayload }>(
  'reminder/update',
  async ({ id, payload }) => {
    return wrapAsync(async () => {
      await HttpClient.put(`${UPDATE_REMINDER}/${id}`, payload);
      Toast({ type: 'success', message: 'Reminder Updated Successfully!' });
    });
  }
);

const deleteReminder = createAsyncThunk<void, DeletePayload>('reminder/delete', async (id) => {
  return wrapAsync(async () => {
    await HttpClient.delete(`${DELETE_REMINDER}/${id}`);
    Toast({ type: 'success', message: 'Reminder Deleted Successfully!' });
  });
});

const reminderThunk = {
  fetchAllReminders,
  createReminder,
  updateReminder,
  deleteReminder,
};

export default reminderThunk;
