import { combineReducers } from 'redux';

import AdminReducer from './admin/reducer';
import AuthReducer from './auth/reducer';
import DashboardReducer from './dashboard/reducer';
import EnquiryReducer from './enquiry/reducer';
import PermissionReducer from './permission/reducer';
import ProductReducer from './product/reducer';
import ReminderReducer from './reminder/reducer';
import RoleReducer from './role/reducer';
import TransactionReducer from './transaction/reducer';

const rootReducer = combineReducers({
  Auth: AuthReducer,
  Permission: PermissionReducer,
  Role: RoleReducer,
  Admin: AdminReducer,
  Enquiry: EnquiryReducer,
  Transaction: TransactionReducer,
  Reminder: ReminderReducer,
  Dashboard: DashboardReducer,
  Product: ProductReducer,
});

export default rootReducer;
