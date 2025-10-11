import { configureStore } from '@reduxjs/toolkit';
import { Middleware } from 'redux';

import authMiddleware from '@/lib/utils/middlewares/auth.middleware';

import rootReducer from './index';

export const makeStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }).concat(authMiddleware as Middleware),
    devTools: process.env.NODE_ENV !== 'production',
  });
};

export const store = makeStore();

// Types
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
