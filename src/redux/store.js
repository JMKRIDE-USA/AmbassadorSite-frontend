import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../modules/auth/authSlice.js';

export default configureStore({
  reducer: {
    auth: authReducer,
  },
});
