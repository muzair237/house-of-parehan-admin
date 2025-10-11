/* eslint-disable @typescript-eslint/no-explicit-any */
import { RootState } from '@/slices/store';

export const tableDataSelectors: Record<string, (state: RootState) => any> = {
  enquiry: (state) => state.Enquiry.enquiries,
  permission: (state) => state.Permission.permissions,
  role: (state) => state.Role.roles,
  user: (state) => state.User.users,
  transaction: (state) => state.Transaction.transactions,
  reminder: (state) => state.Reminder.reminders,
  reminderDueToday: (state) => state.Dashboard.remindersDueToday,
};

export const tableLoadingSelectors: Record<string, (state: RootState) => any> = {
  enquiry: (state) => state.Enquiry.loading,
  permission: (state) => state.Permission.loading,
  role: (state) => state.Role.loading,
  user: (state) => state.User.loading,
  installmentDueToday: (state) => state.Dashboard.installmentsDueTodayLoading,
  transaction: (state) => state.Transaction.loading,
  reminder: (state) => state.Reminder.loading,
  reminderDueToday: (state) => state.Dashboard.remindersDueTodayLoading,
};
