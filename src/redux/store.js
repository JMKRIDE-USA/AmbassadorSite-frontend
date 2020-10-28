import { combineReducers, configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-community/async-storage';
import { 
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from 'redux-persist';

import authReducer from '../modules/auth/authSlice.js';
import userReducer from '../modules/users/userSlice.js';
import asyncListenerMiddleware from './asyncListenerMiddleware.js';
import authALM from './authALM.js';
import userALM from './userALM.js';

const persistConfig = {key: 'root', storage: AsyncStorage, whitelist: ['auth']}; 
const rootReducer = combineReducers({auth: authReducer, user: userReducer});

export default configureStore({
  reducer: persistReducer(persistConfig, rootReducer),
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
    }
  }).concat(asyncListenerMiddleware(authALM, userALM))
});
