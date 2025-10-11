import dashboardThunk from '@/slices/dashboard/thunk';
import enquiryThunk from '@/slices/enquiry/thunk';
import permissionThunk from '@/slices/permission/thunk';
import productThunk from '@/slices/product/thunk';
import reminderThunk from '@/slices/reminder/thunk';
import roleThunk from '@/slices/role/thunk';
import transactionThunk from '@/slices/transaction/thunk';
import userThunk from '@/slices/user/thunk';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const tableThunks: Record<string, any> = {
  enquiry: enquiryThunk.fetchAllEnquiries,
  permission: permissionThunk.fetchAllPermissions,
  role: roleThunk.fetchAllRoles,
  user: userThunk.fetchAllUsers,
  product: productThunk.fetchAllProducts,
  transaction: transactionThunk.fetchAllTransactions,
  reminder: reminderThunk.fetchAllReminders,
  reminderDueToday: dashboardThunk.fetchReminersDueToday,
};
