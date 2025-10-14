import { RemindersWithCount } from '../reminder/types';

export type DashboardState = {
  analytics: AnalyticCardResponseType | null;
  topProducts: TopProductType[];
  revenueSummary: RevenueBreakdown[];
  remindersDueToday: RemindersWithCount;
  cardLoading: boolean;
  revenueByShopkeepers: RevenueByShopkeeper[];
  topProductsLoading: boolean;
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

export type TopProductType = {
  productId: string;
  productName: string;
  unitsSold: number;
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
