import React, { useCallback } from 'react';

import { useQuery, useMutation, queryCache } from 'react-query';
import { useSelector, useDispatch } from 'react-redux';

import config from '../../config.js';
import {
  setUserId,
  setAuthTokens,
  setAuthPermissions,
  resetAuth,
  selectUserId,
  selectAuthHeader,
  selectAuthExpiration,
  selectRefreshToken,
} from './authSlice.js'
import { setUserName } from '../users/userSlice.js';
import { getDateAfter, hasExpired, needsRefresh } from '../date.js';

export function useCreateAccount(){

  let dispatch = useDispatch();
  let login = useLogin();

  const [createAccount, { error }] = useMutation(({to_submit}) => fetch(
    config.backend_url + "users",
    {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(to_submit),
    }).then(res => res.json()),
    {
      onSuccess: async () => {
        queryCache.invalidateQueries("users-get")
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
      return login({email: to_submit.email, password: to_submit.password, userId: result.id});
    }
    return true;
  }
};


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
    let to_submit = {email: email, passowrd: password};
    console.log("Submitting:", to_submit);
    let result;
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
      return true;
    }
    console.log("[!] Error logging in:", "[unknown]");
    return false
  };
};

export function usePopulateAuth(){
  const userId = useSelector(selectUserId);
  const dispatch = useDispatch();

  const {
    data,
    error,
    refetch,
  } = useQuery(
    "users-get",
    () => fetch(
      config.backend_url + "users/" + userId,
      {
        method: 'GET',
        headers: header,
      }).then(res => res.json()),
    { enabled: false },
  );

  return async () => {
    let result;
    try {
      result = await refetch();
    } catch (error) {
      console.log("[!] Error populating user:", error);
      return false;
    }
    console.log("Populate result:", result)
    if (error) {
      console.log("[!] Error populating user:", error);
      return false;
    }
    if (result && result.error){
      console.log("[!] Error populating user:", error);
      return false;
    }
    if (result && result.permissionLevel && result.firstName && result.lastName) {
      dispatch(setAuthPermissions(result.permissionLevel));
      dispatch(setUserName({firstname: result.firstName, lastname: result.lastName}));
      return true;
    }

    console.log("[!] Unknown Error occurred while populating user.");
    return false;
  }
};

export function useRefreshAuth() {
  const userId = useSelector(selectUserId);
  const header = useSelector(selectAuthHeader);
  const refresh_token = useSelector(selectRefreshToken);
  const dispatch = useDispatch()

  const [refresh, { error }] = useMutation(({to_submit}) => fetch(
    config.backend_url + "auth/refresh",
    {
      method: "POST",
      headers: {...header, "Content-Type": "application/json"},
      body: JSON.stringify(to_submit),
    }).then(res => res.json()),
  );
  return async () => {
    let to_submit = {refresh_token: refresh_token}
    let result;
    try {
      result = await refresh({to_submit});
    } catch (error) {
      console.log("[!] Error refreshing authentication:", error);
      return false;
    }
    if (error){
      console.log("[!] Error refreshing authentication:", error);
      return false;
    }
    if (result && result.error) {
      console.log("[!] Error refreshing authentication:", result.error);
      return false;
    }
    console.log("Result:", result);
    if (result && result.accessToken && result.refreshToken && result.expiresIn) {
      dispatch(setAuthTokens({
        access_token: result.accessToken,
        refresh_token: result.refreshToken,
        expires_at: getDateAfter(result.expiresIn),
      }));
    }
    return true;
  }
}

export function useSetupAuth(){
  const userId = useSelector(selectUserId);
  const expirationDate = useSelector(selectAuthExpiration);
  const dispatch = useDispatch();
  const populateAuth = usePopulateAuth();
  const refreshAuth = useRefreshAuth();

  return async () => {
    if (userId && !hasExpired(expirationDate)) {
      if (needsRefresh(expirationDate)) {
        console.log("needs refresh");
        refreshAuth();
      }
      console.log("populating");
      populateAuth();
    } else {
      console.log("resetting");
      dispatch(resetAuth());
    }
  };
};
