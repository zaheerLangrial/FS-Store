// src/slices/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    loading: false,
    error: null,
    success: false
  },
  reducers: {
    loginRequest: (state) => {
      state.loading = true;
      state.error = null;
      state.success = false
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.success = true
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.success = false
    },
  },
});

export const { loginRequest, loginSuccess, loginFailure } = authSlice.actions;
export default authSlice.reducer;
