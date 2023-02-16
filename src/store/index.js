import { configureStore } from '@reduxjs/toolkit';
import userSlice from './user/userReducers';
import courseSlice from './courses/courseReducer';
import currencySlice from './currency/currencyReducer';
const store = configureStore({
  reducer: {
    user: userSlice,
    course: courseSlice,
    currency: currencySlice
  },
});

export default store;