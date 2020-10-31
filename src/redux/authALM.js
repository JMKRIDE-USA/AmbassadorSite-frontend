import {
  fetchAuthRequest,
  fetchUserIdRequest,
  selectAccessToken,
  selectAuthHeader,
  selectUserId,
  setAuthPermissions,
  setUserId,
  resetAuth,
} from '../modules/auth/authSlice.js';
import { setUserInfo } from '../modules/users/userSlice.js';
import config from '../config.js';


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
}

