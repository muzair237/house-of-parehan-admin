import { setSessionExpiredModalState } from '@/slices/auth/reducer';
import { Middleware, isRejectedWithValue } from '@reduxjs/toolkit';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const authMiddleware: Middleware = (store) => (next) => (action: any) => {
  if (
    // isRejectedWithValue(action) &&
    ['401 Unauthorized', 'jwt expired', 'Session Expired. Kindly Login Again!'].includes(
      action.error?.message
    ) &&
    action.type !== 'auth/loginUser/rejected'
  ) {
    store.dispatch(setSessionExpiredModalState());
  }

  return next(action);
};

export default authMiddleware;
