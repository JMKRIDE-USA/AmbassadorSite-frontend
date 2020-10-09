import React from 'react';

import { setAuthState, resetAuthState, selectAuthState } from './authSlice.js';

export function getAuthState(){
  return await readKey(AUTH_STATE_KEY);
}

export function authenticate(){
  return await setKey(AUTH_STATE_KEY, AUTH_STATE.USER);
}
