import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { TransactionActionKey } from '@/src/app/transactions/types';

interface TransactionModalsState {
  openModalKey: TransactionActionKey | null;
}

const initialState: TransactionModalsState = {
  openModalKey: null,
};

const transactionModalsSlice = createSlice({
  name: 'transactionModals',
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<TransactionActionKey>) => {
      state.openModalKey = action.payload;
    },
    closeModal: (state) => {
      state.openModalKey = null;
    },
  },
});

export const { openModal, closeModal } = transactionModalsSlice.actions;
export default transactionModalsSlice.reducer;
