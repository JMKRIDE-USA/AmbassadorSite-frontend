import { createSlice } from '@reduxjs/toolkit';

const challengesSlice = createSlice({
  name: 'challenges',
  initialState: {},
  reducers: {
    setChallengeFieldState: (state, action) => {
      let { challengeId, fieldName, fieldState } = action.payload;

      if(state[challengeId] === undefined){
        state[challengeId] = {}
      }
      state[challengeId][fieldName] = fieldState;
    },
  },
});

export const {
  setChallengeFieldState,
} = challengesSlice.actions;

export const getChallengeFieldState = state => {}
