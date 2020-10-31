import { createSlice } from '@reduxjs/toolkit';

import { AUTH_STATE } from '../auth/constants.js';


const userSlice = createSlice({
  name: 'user',
  initialState: {
    firstname: undefined,
    lastname: undefined,
  },
  reducers: {
    logoutUser: state => {
      state.firstname = undefined;
      state.lastname = undefined;
      state.email = undefined;
    },
    setUserInfo: (state, action) => {
      state.firstname = action.payload.firstName;
      state.lastname = action.payload.lastName;
      state.email = action.payload.email;
      state.is_ambassador = action.payload.permissionLevel == AUTH_STATE.AMBASSADOR;
    },
    fetchUserInfoRequest: state => state,
  },
});

export const { setUserInfo, fetchUserInfoRequest, logoutUser } = userSlice.actions;

export const selectUserName = state => [state.user.firstname, state.user.lastname];
export const selectUserInfo = state => {
  return {
    firstname: state.user.firstname, 
    lastname: state.user.lastname,
    email: state.user.email,
    is_ambassador: state.user.is_ambassador,
  };
}

export default userSlice.reducer;
