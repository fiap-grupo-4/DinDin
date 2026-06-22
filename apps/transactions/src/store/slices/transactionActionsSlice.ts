import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { TransactionActionKey } from '@/src/app/transactions/types';

interface TransactionActionsState {
  activeActionKey: TransactionActionKey | null;
  isRefreshing: boolean;
}

const initialState: TransactionActionsState = {
  activeActionKey: null,
  isRefreshing: false,
};

const transactionActionsSlice = createSlice({
  name: 'transactionActions',
  initialState,
  reducers: {
    setActiveActionKey: (
      state,
      action: PayloadAction<TransactionActionKey | null>
    ) => {
      state.activeActionKey = action.payload;
    },
    setIsRefreshing: (state, action: PayloadAction<boolean>) => {
      state.isRefreshing = action.payload;
    },
    clearActionState: (state) => {
      state.activeActionKey = null;
      state.isRefreshing = false;
    },
  },
});

export const { setActiveActionKey, setIsRefreshing, clearActionState } =
  transactionActionsSlice.actions;
export default transactionActionsSlice.reducer;
