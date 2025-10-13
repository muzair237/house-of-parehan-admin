import { RemindersWithCount } from '../reminder/types';

export type DashboardState = {
  analytics: AnalyticCardResponseType | null;
  topShopkeepers: TopShopkeeperType[];
  revenueSummary: RevenueBreakdown[];
  remindersDueToday: RemindersWithCount;
  cardLoading: boolean;
  revenueByShopkeepers: RevenueByShopkeeper[];
  topShopkeepersLoading: boolean;
  revenueByShopkeepersLoading: boolean;
  revenueSummaryLoading: boolean;
  activeAlertsLoading: boolean;
  installmentsDueTodayLoading: boolean;
  remindersDueTodayLoading: boolean;
  error: string | null;
};

export type StatGroup = {
  total: number;
  paid?: number;
  pending?: number;
};

export type AnalyticCardResponseType = {
  admins: StatGroup;
  products: StatGroup;
  transactions: StatGroup;
};

export type TopShopkeeperType = {
  shopkeeperId: string;
  shopkeeperName: string;
  activeInstallments: number;
};

export type RevenueByShopkeeper = {
  shopkeeperId: string;
  shopkeeperName: string;
  totalRevenue: number;
};

export type RevenueBreakdown = {
  label: string;
  total: number;
};
