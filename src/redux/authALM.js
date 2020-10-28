import {
  fetchAuthRequest,
  fetchUserRequest,
  selectAccessToken,
  selectAuthHeader,
  selectUserId,
  setAuthPermissions,
  setUserId,
  resetAuth,
} from '../modules/auth/authSlice.js';
import { setUserName } from '../modules/users/userSlice.js';
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
      dispatch(fetchUserRequest());
      return
    }

    fetch(
      config.backend_url + "users/" + userId,
      {
        method: 'GET',
        headers: header,
      }
    ).then(res => res.json()).then(res => {
      dispatch(setAuthPermissions(res.permissionLevel));
      dispatch(setUserName({firstname: res.firstName, lastname: res.lastName}));
    }).catch(error => {
      console.log('[!] Error fetching user credentials:', error);
      dispatch(resetAuth());
    });
  },

  [fetchUserRequest]: (action, dispatch, state) => {
    const header = selectAuthHeader(state);
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
  },
}

