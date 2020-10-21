import { createSlice } from '@reduxjs/toolkit';

import { AUTH_STATE } from './constants.js';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    auth_permissions: AUTH_STATE.NONE,
    user_id: undefined,
    access_token: undefined,
    refresh_token: undefined,
    expires_at: undefined,
  },
  reducers: {
    setUserId: (state, action) => {
      state.user_id = action.payload;
    },
    setAuthTokens: (state, action) => {
      state.access_token = action.payload.access_token;
      state.refresh_token = action.payload.refresh_token;
      state.expires_at = action.payload.expires_at;
    },
    setAuthPermissions: (state, action) => {
      state.auth_permissions = action.payload;
    },
    resetAuth: state => {
      state.auth_permissions = AUTH_STATE.NONE;
      state.user_id = undefined;
      state.access_token = undefined;
      state.refresh_token = undefined;
      state.expires_at = undefined;
    },
  }
})

export const { setUserId, setAuthTokens, setAuthPermissions, resetAuth} = authSlice.actions;

export const selectAuthPermissions = state => state.auth.auth_permissions;
export const selectUserId = state => state.auth.user_id;

export const selectAuthHeader = state => {
  return {"Authorization": "Bearer " + state.auth.access_token}
}

export default authSlice.reducer;
