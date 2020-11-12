import { queryCache } from 'react-query';

import {
  verifyAuthRequest,
  fetchAuthRequest,
  fetchUserIdRequest,
  selectAccessToken,
  selectAuthHeader,
  selectAuthExpiration,
  selectRefreshToken,
  selectUserId,
  setAuthPermissions,
  setUserId,
  setAuthTokens,
  resetAuth,
} from '../modules/auth/authSlice.js';
import { setUserInfo } from '../modules/users/userSlice.js';
import config from '../config.js';
import { getDateAfter, hasExpired, needsRefresh } from '../modules/date.js';


export default {
  [fetchAuthRequest]: (action, dispatch, state) => {
    const accessToken = selectAccessToken(state);
    if (! accessToken) {
      console.log('User is not logged in. Resetting auth.');
      dispatch(resetAuth());
      return
    }
    const header = selectAuthHeader(state);

    const userId = selectUserId(state);
    if (! userId ) {
      console.log('User Id Not Found. Looking up.');
      dispatch(fetchUserIdRequest());
      return
    }

    try {
      fetch(
        config.backend_url + "users/" + userId,
        {
          method: 'GET',
          headers: header,
        }
      ).then(res => {
        if(!res.ok){
          dispatch(resetAuth());
        }
        return res.json();
      }).then(res => {
        if (res){
          dispatch(setAuthPermissions(res.permissionLevel));
          dispatch(setUserInfo(res));
        } else {
          dispatch(resetAuth());
        }
      }).catch(error => {
        console.log('[!] Error fetching user credentials:', error);
        dispatch(resetAuth());
      });
    } catch (err) {
      console.log('[!] Error fetching user credentials:', error);
      dispatch(resetAuth());
    }
  },

  [fetchUserIdRequest]: (action, dispatch, state) => {
    const header = selectAuthHeader(state);
    try { 
      fetch(
        config.backend_url + "user-lookup",
        {
          method: 'GET',
          headers: header,
        }
      ).then(res => res.json()).then(res => {
        dispatch(setUserId(res.id));
        dispatch(fetchAuthRequest());
      }).catch(error => {
        console.log('[!] Error looking up user information:', error);
        dispatch(resetAuth());
      });
    } catch (err) {
      console.log('[!] Error looking up user information:', error);
      dispatch(resetAuth());
    }
  },

  [verifyAuthRequest]: (action, dispatch, state) => {
    const userId = selectUserId(state);
    const access_token = selectAccessToken(state);
    const expiration_raw = selectAuthExpiration(state);

    if(!(userId && access_token && expiration_raw)) {
      return
    }

    const expiration = new Date(expiration_raw);
    console.log("This Expiration:", expiration.toLocaleString());

    if (hasExpired(expiration)){
      return;
    } else if (!needsRefresh(expiration)) {
      return
    }

    console.log("[+] Refreshing authentication tokens...");

    const header = selectAuthHeader(state);
    const refresh_token = selectRefreshToken(state);

    try {
      fetch(
        config.backend_url + "auth/refresh",
        {
          method: "POST",
          headers: {...header, "Content-Type": "application/json"},
          body: JSON.stringify({refresh_token: refresh_token}),
        }
      ).then(res => {if(res.ok) return res.json()}
      ).then(result => {
        if(result) {
          dispatch(setAuthTokens({
            access_token: result.accessToken,
            refresh_token: result.refreshToken,
            expires_at: getDateAfter(result.expiresIn),
          }));
          console.log("[+] Done.");
        }
      });
    } catch (error) {
      console.log("[!] Error refreshing authentication:", error);
    }
  },

  [resetAuth]: (action, dispatch, state) => {
    const access_token = selectAccessToken(state);
    queryCache.invalidateQueries('user');
    queryCache.invalidateQueries('users');
    if(access_token){
      const header = selectAuthHeader(state);
      try {
        fetch(
          config.backend_url + "auth/sessions/disable-self",
          {
            method: 'POST',
            headers: header,
          }
        )
      } catch (err) {
        console.log('[!] Error disabling current session:', error);
      }
    }
  },
}

