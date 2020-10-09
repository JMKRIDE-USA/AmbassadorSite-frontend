import { createSlice } from '@reduxjs/toolkit';

import { AUTH_STATE } from './constants.js';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    auth_state: AUTH_STATE.NONE,
  },
  reducers: {
    setAuthState: (state, action) => {
      state.auth_state = action.payload;
    },
    resetAuthState: state => {
      state.auth_state = AUTH_STATE.NONE
    },
  }
})

export const { setAuthState, resetAuthState } = authSlice.actions;

export const selectAuthState = state => state.auth.auth_state;

export default authSlice.reducer;
