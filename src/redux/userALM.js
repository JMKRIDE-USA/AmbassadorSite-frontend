import {
  fetchUserInfoRequest,
  setUserInfo,
} from '../modules/users/userSlice.js';
import {
  selectAuthHeader,
  selectUserId,
} from '../modules/auth/authSlice.js';
import config from '../config.js';


export default {
  [fetchUserInfoRequest]: (action, dispatch, state) => {
    const header = selectAuthHeader(state);
    const userId = selectUserId(state);
    fetch(
      config.backend_url + "users/id/" + userId,
      {
        method: 'GET',
        headers: header,
      }
    ).then(res=>res.json()).then(res => {
      console.log("User Info:", res);
      dispatch(setUserInfo(res));
    }).catch(error => {
      console.log('[!] Error fetching user information:', error);
    });
  },
}
