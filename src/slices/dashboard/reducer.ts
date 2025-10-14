import {
  AnalyticCardResponseType,
  DashboardState,
  RevenueBreakdown,
  TopProductType,
} from '@/domains/dashboard/types';
import { RemindersWithCount } from '@/domains/reminder/types';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import dashboardThunk from './thunk';

const initialState: DashboardState = {
  analytics: null,
  topProducts: [],
  revenueSummary: [],
  remindersDueToday: { items: [], totalItems: 0 },
  cardLoading: false,
  topProductsLoading: false,
  revenueSummaryLoading: false,
  activeAlertsLoading: false,
  remindersDueTodayLoading: false,
  error: null,
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(dashboardThunk.fetchCardAnalytics.pending, (state) => {
        state.cardLoading = true;
        state.error = null;
      })
      .addCase(
        dashboardThunk.fetchCardAnalytics.fulfilled,
        (state, action: PayloadAction<AnalyticCardResponseType>) => {
          state.analytics = action.payload;
          state.cardLoading = false;
        }
      )
      .addCase(dashboardThunk.fetchCardAnalytics.rejected, (state, action) => {
        state.cardLoading = false;
        state.error = action.error.message || 'Failed to fetch analytics';
      });

    builder
      .addCase(dashboardThunk.fetchTopProductsByUnitSold.pending, (state) => {
        state.topProductsLoading = true;
        state.error = null;
      })
      .addCase(
        dashboardThunk.fetchTopProductsByUnitSold.fulfilled,
        (state, action: PayloadAction<TopProductType[]>) => {
          state.topProducts = action.payload;
          state.topProductsLoading = false;
        }
      )
      .addCase(dashboardThunk.fetchTopProductsByUnitSold.rejected, (state, action) => {
        state.topProductsLoading = false;
        state.error = action.error.message || 'Failed to fetch top products';
      });

    builder
      .addCase(dashboardThunk.fetchRevenueSummary.pending, (state) => {
        state.revenueSummaryLoading = true;
        state.error = null;
      })
      .addCase(
        dashboardThunk.fetchRevenueSummary.fulfilled,
        (state, action: PayloadAction<RevenueBreakdown[]>) => {
          state.revenueSummary = action.payload;
          state.revenueSummaryLoading = false;
        }
      )
      .addCase(dashboardThunk.fetchRevenueSummary.rejected, (state, action) => {
        state.revenueSummaryLoading = false;
        state.error = action.error.message || 'Failed to fetch revenue summary';
      });

    builder
      .addCase(dashboardThunk.fetchReminersDueToday.pending, (state) => {
        state.remindersDueTodayLoading = true;
        state.error = null;
      })
      .addCase(
        dashboardThunk.fetchReminersDueToday.fulfilled,
        (state, action: PayloadAction<RemindersWithCount>) => {
          state.remindersDueToday = action.payload;
          state.remindersDueTodayLoading = false;
        }
      )
      .addCase(dashboardThunk.fetchReminersDueToday.rejected, (state, action) => {
        state.remindersDueTodayLoading = false;
        state.error = action.error.message || 'Failed to fetch reminders due today';
      });
  },
});

export default dashboardSlice.reducer;
