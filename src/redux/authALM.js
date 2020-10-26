import {
  fetchAuthRequest,
  selectAuthHeader,
  selectUserId,
  setAuthPermissions,
  resetAuth,
} from '../modules/auth/authSlice.js';
import { setUserName } from '../modules/users/userSlice.js';
import config from '../config.js';

export default {
  [fetchAuthRequest]: (action, dispatch, state) => {
    const header = selectAuthHeader(state);
    const userId = selectUserId(state);
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
}

