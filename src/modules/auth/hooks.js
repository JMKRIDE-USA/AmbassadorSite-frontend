import { useMutation, queryCache } from 'react-query';
import { useDispatch } from 'react-redux';

import config from '../../config.js';
import {
  setUserId,
  setAuthTokens,
  fetchAuthRequest,
} from './authSlice.js'
import {  getDateAfter } from '../date.js';

export function useCreateAccount(){

  let dispatch = useDispatch();
  let login = useLogin();

  const [createAccount, { error }] = useMutation(({to_submit}) => fetch(
    config.backend_url + "users/create",
    {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(to_submit),
    }).then(res => res.json()),
    {
      onSuccess: async () => {
        queryCache.invalidateQueries('user');
        queryCache.invalidateQueries('users');
      }
    },
  );

  return async (to_submit) => {
    let result;
    try {
      result = await createAccount({to_submit})
    } catch (error) {
      console.log("[!] Error creating account:", error);
      return false;
    }
    if (error){
      console.log("[!] Error creating account:", error);
      return false;
    }
    if (result && result.error){
      console.log("[!] Error creating account:", result.error);
      return false;
    }
    if (result && result.id) {
      dispatch(setUserId(result.id));
      return login({email: to_submit.email, password: to_submit.password});
    }
    return true;
  }
}

export function useLogin(){
  let dispatch = useDispatch();

  const [login, { error }] = useMutation(({to_submit}) => fetch(
    config.backend_url + "auth",
    {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(to_submit),
    }).then(res => res.json()),
  );

  return async ({email, password}) => {
    let to_submit = {email: email, password: password};
    console.log("Submitting:", to_submit);
    let result, id;
    try {
      result = await login({to_submit})
    } catch (error) {
      console.log("[!] Error logging in:", error);
      return false;
    }
    if (error){
      console.log("[!] Error logging in:", error);
      return false;
    }
    if (result && result.error) {
      console.log("[!] Error logging in:", result.error);
      return false;
    }
    console.log("Result:", result);
    if (result && result.accessToken && result.refreshToken && result.expiresIn) {
      dispatch(setAuthTokens({
        access_token: result.accessToken,
        refresh_token: result.refreshToken,
        expires_at: getDateAfter(result.expiresIn),
      }));
      dispatch(fetchAuthRequest());
      return true;
    }
    console.log("[!] Error logging in:", "[unknown]");
    return false
  };
}
