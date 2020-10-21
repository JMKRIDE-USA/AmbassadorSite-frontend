import React, { useCallback } from 'react';

import { useQuery, useMutation, queryCache } from 'react-query';
import { useSelector, useDispatch } from 'react-redux';

import config from '../../config.js';
import {
  setUserId,
  setAuthTokens,
  setAuthPermissions,
  selectUserId,
  selectAuthHeader,
} from './authSlice.js'
import { getDateAfter } from '../date.js';

export function useCreateAccount(){

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
  let dispatch = useDispatch();

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
    }
    return true;
  }
};


export function useLogin(){
  const [login, { error }] = useMutation(({to_submit}) => fetch(
    config.backend_url + "auth",
    {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(to_submit),
    }).then(res => res.json()),
  );

  let dispatch = useDispatch();
  return async (to_submit) => {
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
    }
    return true;
  };
};

export function usePopulateAuth(){
  const userId = useSelector(selectUserId);
  const header = useSelector(selectAuthHeader);

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
  const dispatch = useDispatch();

  return async () => {
    let result;
    try {
      result = await refetch();
    } catch (error) {
      console.log("[!] Error populating user:", error);
      return false;
    }
    if (error) {
      console.log("[!] Error populating user:", error);
      return false;
    }
    if (result && result.error){
      console.log("[!] Error populating user:", error);
      return false;
    }
    if (result) {
      dispatch(setAuthPermissions(result.permissionLevel));
      return true;
    }

    console.log("[!] Unknown Error occurred while populating user.");
    return false;
  }
};

