import { useMutation, queryCache } from 'react-query';
import { useSelector, useDispatch } from 'react-redux';

import { useGetQuery } from '../data.js';
import { logoutUser } from './userSlice.js';
import { selectAuthHeader, resetAuth } from '../auth/authSlice.js';
import config from '../../config.js';

function useGetUserQuery(endpoint) {
  return useGetQuery(
    endpoint,
    'user', //global key for this file
  )
}

export function useGetUserSessions() {
  return useGetUserQuery("auth/sessions/self");
}

export function useDisableSession(){
  const header = useSelector(selectAuthHeader);
  let dispatch = useDispatch();

  const [disableSession, { error }] = useMutation(
    ({to_submit}) => fetch(
      config.backend_url + "auth/sessions/id/" + to_submit.session_id,
      {
        method: "DELETE",
        headers: header,
      }
    ),
    {
      onSuccess: async () => {
        queryCache.invalidateQueries('user');
        queryCache.invalidateQueries('users');
      },
    }
  );

  return (sessionId, isCurrent) => async () => {
    let to_submit = {
      session_id: sessionId,
    }
    let result;
    try {
      result = await disableSession({to_submit})
    } catch (error) {
      console.log("[!] Error disabling session:", error);
      return false;
    }
    if (error){
      console.log("[!] Error disabling session:", error);
      return false;
    }
    if (result && result.error){
      console.log("[!] Error disabling session:", result.error);
      return false;
    }
    if (result) {
      if (isCurrent) {
        dispatch(resetAuth());
        dispatch(logoutUser());
      }
      return true;
    }
    return false;
  }
}
