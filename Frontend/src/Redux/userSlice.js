import { createSlice } from "@reduxjs/toolkit";

// Initial state for user authentication
const initialState = {
  currentUser: null, // Stores the authenticated user's data
  error: null, // Stores any authentication errors
  loading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Triggered when the sign-in process starts
    signinStart: (state) => {
      state.loading = true;
    },

    // Triggered when sign-in is successful
    signInSuccess: (state, action) => {
      state.currentUser = action.payload; // Store user data
      state.loading = false;
      state.error = null;
      localStorage.setItem("AccessToken", JSON.stringify(state.currentUser)); // Save user data in localStorage
    },
    // Triggered when sign-in fails
    signInFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    // Triggered when the sign-out process starts
    signOutStart: (state) => {
      state.loading = true;
    },
    // Triggered when sign-out is successful
    signOutSuccess: (state) => {
      state.currentUser = null; // Remove user data
      state.loading = false;
      state.error = null;
      localStorage.removeItem("AccessToken"); // Remove token from localStorage
      localStorage.removeItem("noteInfo"); 
    },
    // Triggered when sign-out fails
    signOutFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    // Updates the user profile
    getProfile: (state, action) => {
      state.currentUser = action.payload;
      localStorage.setItem("AccessToken", JSON.stringify(state.currentUser)); // Save updated user data
    },
  },
});
// Export actions for use in components
export const {
  signinStart,
  signInSuccess,
  signInFailure,
  signOutStart,
  signOutSuccess,
  signOutFailure,
  getProfile,
} = userSlice.actions;
// Export reducer to use in the Redux store
export default userSlice.reducer;
