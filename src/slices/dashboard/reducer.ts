import {
  AnalyticCardResponseType,
  DashboardState,
  RevenueBreakdown,
  RevenueByShopkeeper,
  TopShopkeeperType,
} from '@/domains/dashboard/types';
import { RemindersWithCount } from '@/domains/reminder/types';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import dashboardThunk from './thunk';

const initialState: DashboardState = {
  analytics: null,
  topShopkeepers: [],
  revenueByShopkeepers: [],
  revenueSummary: [],
  remindersDueToday: { items: [], totalItems: 0 },
  cardLoading: false,
  topShopkeepersLoading: false,
  revenueByShopkeepersLoading: false,
  revenueSummaryLoading: false,
  activeAlertsLoading: false,
  installmentsDueTodayLoading: false,
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
      .addCase(dashboardThunk.fetchTopShopkeepers.pending, (state) => {
        state.topShopkeepersLoading = true;
        state.error = null;
      })
      .addCase(
        dashboardThunk.fetchTopShopkeepers.fulfilled,
        (state, action: PayloadAction<TopShopkeeperType[]>) => {
          state.topShopkeepers = action.payload;
          state.topShopkeepersLoading = false;
        }
      )
      .addCase(dashboardThunk.fetchTopShopkeepers.rejected, (state, action) => {
        state.topShopkeepersLoading = false;
        state.error = action.error.message || 'Failed to fetch top shopkeepers';
      });

    builder
      .addCase(dashboardThunk.fetchRevenueShopkeepers.pending, (state) => {
        state.revenueByShopkeepersLoading = true;
        state.error = null;
      })
      .addCase(
        dashboardThunk.fetchRevenueShopkeepers.fulfilled,
        (state, action: PayloadAction<RevenueByShopkeeper[]>) => {
          state.revenueByShopkeepers = action.payload;
          state.revenueByShopkeepersLoading = false;
        }
      )
      .addCase(dashboardThunk.fetchRevenueShopkeepers.rejected, (state, action) => {
        state.revenueByShopkeepersLoading = false;
        state.error = action.error.message || 'Failed to fetch top shopkeepers';
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
        state.error = action.error.message || 'Failed to fetch top shopkeepers';
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
        state.error = action.error.message || 'Failed to fetch top shopkeepers';
      });
  },
});

export default dashboardSlice.reducer;
