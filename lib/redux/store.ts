// lib/redux/store.ts
import { configureStore } from '@reduxjs/toolkit';
import fileReducer from '@/store/fileSlice';
import processReducer from '@/store/processSlice';
export const store = configureStore({
  reducer: {
    file: fileReducer,
    process: processReducer,
  },
});

// RootState 및 AppDispatch 타입 정의
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
