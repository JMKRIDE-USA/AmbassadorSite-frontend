import { createSlice } from '@reduxjs/toolkit';

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
  },
});

export const { setUserName, logoutUser } = userSlice.actions;

export const selectUserName = state => [state.user.firstname, state.user.lastname];

export default userSlice.reducer;
