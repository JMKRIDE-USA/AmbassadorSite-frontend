import { createSlice } from '@reduxjs/toolkit';

import { AUTH_STATE } from '../auth/constants.js';


const userSlice = createSlice({
  name: 'user',
  initialState: {
    firstname: undefined,
    lastname: undefined,
  },
  reducers: {
    setUserName: (state, action) => {
      state.firstname = action.payload.firstname;
      state.lastname = action.payload.lastname;
    },
    logoutUser: state => {
      state.firstname = undefined;
      state.lastname = undefined;
    },
    setUserInfo: (state, action) => {
      state.email = action.payload.email,
      state.ambassador = action.payload.permissionLevel == AUTH_STATE.AMBASSADOR,
      state.application_status = action.payload.
    }
  },
});

export const { setUserName, logoutUser } = userSlice.actions;

export const selectUserName = state => [state.user.firstname, state.user.lastname];

export default userSlice.reducer;
