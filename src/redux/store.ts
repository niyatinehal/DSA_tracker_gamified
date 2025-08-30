import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authenticationSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

// Types for TS projects
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
