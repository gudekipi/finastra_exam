import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currencies: [],
  conversionRate: 1,
  loading: false,
  error: null,
};

const currencySlice = createSlice({
  name: 'currency',
  initialState,
  reducers: {
    fetchCurrencies: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchCurrenciesSuccess: (state, action) => {
      state.loading = false;
      state.currencies = action.payload;
    },
    fetchCurrenciesFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    fetchConversion: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchConversionSuccess: (state, action) => {
      state.loading = false;
      state.conversionRate = action.payload?.conversion_rate;
    },
    fetchConversionFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchCurrencies, fetchCurrenciesSuccess, fetchCurrenciesFailure, fetchConversion, fetchConversionFailure, fetchConversionSuccess  } = currencySlice.actions;
export default currencySlice.reducer;