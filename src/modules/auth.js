import React from 'react';

import {readKey, setKey} from './asyncStorage.js';

const AUTH_STATE_KEY = "@user_auth_state"
const AUTH_STATE = {
  USER: "user",
  ADMIN: "admin",
}

async function getAuthState(){
  return await readKey(AUTH_STATE_KEY);
}

async function authenticate(){
  return await setKey(AUTH_STATE_KEY, AUTH_STATE.USER);
}
