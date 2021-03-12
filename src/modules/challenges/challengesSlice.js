import { createSlice } from '@reduxjs/toolkit';

const challengesSlice = createSlice({
  name: 'challenges',
  initialState: {
    submissionsSuccessAlert: false,  // temporary flag to display a submissions success message
  },
  reducers: {
    setSubmissionsSuccessAlert: (state, action) => {
      state.submissionsSuccessAlert = action.payload;
    },
  },
});

export const {
  setSubmissionsSuccessAlert,
} = challengesSlice.actions;

export const selectSubmissionsAlert = state => state.challenges.submissionsSuccessAlert;

export default challengesSlice.reducer;
