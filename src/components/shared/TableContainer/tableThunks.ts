import adminThunk from '@/slices/admin/thunk';
import dashboardThunk from '@/slices/dashboard/thunk';
import enquiryThunk from '@/slices/enquiry/thunk';
import permissionThunk from '@/slices/permission/thunk';
import productThunk from '@/slices/product/thunk';
import reminderThunk from '@/slices/reminder/thunk';
import roleThunk from '@/slices/role/thunk';
import transactionThunk from '@/slices/transaction/thunk';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const tableThunks: Record<string, any> = {
  enquiry: enquiryThunk.fetchAllEnquiries,
  permission: permissionThunk.fetchAllPermissions,
  role: roleThunk.fetchAllRoles,
  admin: adminThunk.fetchAllAdmins,
  product: productThunk.fetchAllProducts,
  transaction: transactionThunk.fetchAllTransactions,
  reminder: reminderThunk.fetchAllReminders,
  reminderDueToday: dashboardThunk.fetchReminersDueToday,
};
