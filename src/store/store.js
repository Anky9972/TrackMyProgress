import { configureStore } from '@reduxjs/toolkit';
import sheetsReducer from './sheetsSlice';

export const store = configureStore({
  reducer: {
    sheets: sheetsReducer,
  },
});
