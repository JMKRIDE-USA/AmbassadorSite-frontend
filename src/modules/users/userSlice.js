import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    firstname: undefined,
    lastname: undefined,
  },
  reducers: {
    setName: (state, action) => {
      state.firstname = action.payload.firstname;
      state.lastname = action.payload.lastname;
    },
  }
});

export const { setName } = userSlice.actions;

export const selectUserName = state => [state.user.firstname, state.user.lastname];

export default userSlice.reducer;
