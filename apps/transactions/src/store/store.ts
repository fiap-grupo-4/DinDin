import { configureStore } from '@reduxjs/toolkit';
import transactionActionsReducer from './slices/transactionActionsSlice';
import transactionModalsReducer from './slices/transactionModalsSlice';

export function makeStore() {
  return configureStore({
    reducer: {
      transactionActions: transactionActionsReducer,
      transactionModals: transactionModalsReducer,
    },
  });
}

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
