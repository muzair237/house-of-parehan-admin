import { ReminderState, RemindersWithCount } from '@/domains/reminder/types';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import reminderThunk from './thunk';

const initialState: ReminderState = {
  reminders: {
    items: [],
    totalItems: 0,
  },
  loading: false,
  error: null,
};

const reminderSlice = createSlice({
  name: 'reminder',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(reminderThunk.fetchAllReminders.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        reminderThunk.fetchAllReminders.fulfilled,
        (state, action: PayloadAction<RemindersWithCount>) => {
          state.reminders = action.payload;
          state.loading = false;
        }
      )
      .addCase(reminderThunk.fetchAllReminders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch reminders';
      });

    //   // Fetch Today Reminders
    //   .addCase(
    //     reminderThunk.fetchTodayReminders.fulfilled,
    //     (state, action: PayloadAction<ReminderData[]>) => {
    //       state.todayReminders = action.payload;
    //     }
    //   );
  },
});

export default reminderSlice.reducer;
