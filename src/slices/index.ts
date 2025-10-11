import { combineReducers } from 'redux';

import AuthReducer from './auth/reducer';
import DashboardReducer from './dashboard/reducer';
import EnquiryReducer from './enquiry/reducer';
import PermissionReducer from './permission/reducer';
import ReminderReducer from './reminder/reducer';
import RoleReducer from './role/reducer';
import TransactionReducer from './transaction/reducer';
import UserReducer from './user/reducer';

const rootReducer = combineReducers({
  Auth: AuthReducer,
  Permission: PermissionReducer,
  Role: RoleReducer,
  User: UserReducer,
  Enquiry: EnquiryReducer,
  Transaction: TransactionReducer,
  Reminder: ReminderReducer,
  Dashboard: DashboardReducer,
});

export default rootReducer;
