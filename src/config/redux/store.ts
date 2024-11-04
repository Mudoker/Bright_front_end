import { configureStore } from '@reduxjs/toolkit';

import { authSlice } from '../../features/auth/utils/authSlice';
import { themeSlice } from '../../features/theme/utils/themeSlice';
import { apiSlice } from '../api/apiSlice';
import { dataSlice } from '@/features/dev-dock/utils/data-slice';

export const store = configureStore({
  reducer: {
    [authSlice.reducerPath]: authSlice.reducer,
    [themeSlice.name]: themeSlice.reducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    [dataSlice.name]: dataSlice.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
