import { configureStore } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-community/async-storage';
import { persistReducer } from 'redux-persist';

import authReducer from '../modules/auth/authSlice.js';

const persistConfig = {key: 'root', storage: AsyncStorage, whitelist: ['auth_state']}; 

export default configureStore({
  reducer: {
    auth: persistReducer(persistConfig, authReducer),
  },
});
