import { createSlice } from '@reduxjs/toolkit';

interface SensitiveAmountState {
  showSensitiveAmount: boolean;
}

const initialState: SensitiveAmountState = {
  showSensitiveAmount: false,
};

const sensitiveAmountSlice = createSlice({
  name: 'sensitiveAmount',
  initialState,
  reducers: {
    toggleShowSensitiveAmount: (state) => {
      state.showSensitiveAmount = !state.showSensitiveAmount;
    },
  },
});

export const { toggleShowSensitiveAmount } = sensitiveAmountSlice.actions;
export default sensitiveAmountSlice.reducer;
