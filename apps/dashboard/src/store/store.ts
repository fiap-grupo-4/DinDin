import { configureStore } from '@reduxjs/toolkit';
import sensitiveAmountReducer from './slices/sensitiveAmountSlice';

export function makeStore() {
  return configureStore({
    reducer: {
      sensitiveAmount: sensitiveAmountReducer,
    },
  });
}

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
