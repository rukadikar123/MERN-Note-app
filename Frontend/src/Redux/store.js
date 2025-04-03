import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice.js";

// Configure and create the Redux store
export const store = configureStore({
  reducer: {
    user: userReducer, // User-related state is managed by userReducer
  },
});
