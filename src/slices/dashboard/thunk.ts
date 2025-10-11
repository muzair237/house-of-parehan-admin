import {
  AnalyticCardResponseType,
  RevenueBreakdown,
  RevenueByShopkeeper,
  TopShopkeeperType,
} from '@/domains/dashboard/types';
import { RemindersWithCount } from '@/domains/reminder/types';
import { createAsyncThunk } from '@reduxjs/toolkit';

import {
  GET_CARD_ANALYTICS,
  GET_REMINDERS_DUE_TODAY,
  GET_REVENUE_BY_SHOPKEEPERS,
  GET_REVENUE_SUMMARY,
  GET_TOP_SHOPKEEPERS,
} from '@/lib/utils/apiHelper';
import HttpClient from '@/lib/utils/axios/axiosWrapper';
import { QueryParams } from '@/lib/utils/types';

import { wrapAsync } from '../wrapAsync';

type Period = 'week' | 'month' | 'year';

const fetchCardAnalytics = createAsyncThunk('dashboard/fetchCardAnalytics', async () => {
  return wrapAsync(async () => {
    const res = await HttpClient.get<{ data: AnalyticCardResponseType }>(GET_CARD_ANALYTICS);
    return res.data;
  });
});

const fetchTopShopkeepers = createAsyncThunk('dashboard/fetchTopShopkeepers', async () => {
  return wrapAsync(async () => {
    const res = await HttpClient.get<{ data: TopShopkeeperType[] }>(GET_TOP_SHOPKEEPERS);
    return res.data;
  });
});

const fetchRevenueShopkeepers = createAsyncThunk(
  'dashboard/fetchRevenueByShopkeepers',
  async () => {
    return wrapAsync(async () => {
      const res = await HttpClient.get<{ data: RevenueByShopkeeper[] }>(GET_REVENUE_BY_SHOPKEEPERS);
      return res.data;
    });
  }
);

export const fetchRevenueSummary = createAsyncThunk(
  'dashboard/fetchRevenueSummary',
  async (period: Period) => {
    return wrapAsync(async () => {
      const res = await HttpClient.get<{ data: RevenueBreakdown[] }>(
        `${GET_REVENUE_SUMMARY}?period=${period}`
      );
      return res.data;
    });
  }
);

const fetchReminersDueToday = createAsyncThunk(
  'dashboard/fetch-remidners-due-today',
  async (params: QueryParams) => {
    return wrapAsync(async () => {
      const res = await HttpClient.get<{ data: RemindersWithCount; message: string }>(
        GET_REMINDERS_DUE_TODAY,
        { params }
      );
      return res.data;
    });
  }
);

const dashboardThunk = {
  fetchCardAnalytics,
  fetchTopShopkeepers,
  fetchRevenueShopkeepers,
  fetchRevenueSummary,
  fetchReminersDueToday,
};

export default dashboardThunk;
