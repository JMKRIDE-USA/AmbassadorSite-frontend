import { useMutation } from 'react-query';
import { useSelector, useDispatch } from 'react-redux';

import { selectAuthHeader } from '../auth/authSlice.js';
import config from '../../config.js';
import { createMutationCall } from '../data.js';
import {
  setUserId,
  setAuthTokens,
  fetchAuthRequest,
  resetAuth,
} from './authSlice.js'
import { getDateAfter } from '../date.js';
import { queryClient } from '../data.js';
import { logoutUser } from '../users/userSlice.js';

export function useLogoutUser() {
  let dispatch = useDispatch()
  return () => {
    dispatch(logoutUser())
    dispatch(resetAuth())
  }
}

export function useCreateAccount(){

  let dispatch = useDispatch();
  let login = useLogin();

  const { mutateAsync, error } = useMutation(({to_submit}) => fetch(
    config.backend_url + "users/create",
    {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(to_submit),
    }).then(res => res.json()),
    {
      onSuccess: async () => {
        queryClient.invalidateQueries('user');
        queryClient.invalidateQueries('users');
      }
    },
  );

  return async (to_submit) => {
    let result;
    try {
      result = await mutateAsync({to_submit})
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

  const { mutateAsync, status, error } = useMutation((to_submit) => fetch(
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
    let result;
    try {
      result = await mutateAsync(to_submit)
    } catch (error) {
      console.log("[!] Error logging in:", error);
      return false;
    }
    if (status === 'error'){
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

export function useSendEmailVerification(){
  const header = useSelector(selectAuthHeader);
  const { mutateAsync, error } = useMutation(() => fetch(
    config.backend_url + "auth/email-verification/create",
    {
      method: "POST",
      headers: header,
    }).then(res => res.json()),
  );
  return createMutationCall(mutateAsync, error, "sending email verification");
}

export function useVerifyEmail(){
  const header = useSelector(selectAuthHeader);
  const { mutateAsync, error } = useMutation((to_submit) => fetch(
    config.backend_url + "auth/email-verification/verify",
    {
      method: "POST",
      headers: {
        ...header,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(to_submit),
    }).then(res => res.json()),
  );
  return createMutationCall(mutateAsync, error, "verifying email");
}
