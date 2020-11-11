import { useQuery, useMutation, queryCache } from 'react-query';
import { useSelector } from 'react-redux';

import { selectAuthHeader } from '../auth/authSlice.js';
import config from '../../config.js';

function useGetUserQuery(endpoint) {
  const header = useSelector(selectAuthHeader);

  try {
    const { data, error, status } = useQuery(
      'user', // global key for this file
      () => fetch(
        config.backend_url + endpoint,
        {
          method: "GET",
          headers: header,
        }
      ).then(res => res.json()),
    )

    if (error) {
      console.log("[!] Error fetching user endpoint \'", endpoint, "\':", error);
      return { data: {}, error: error, status: status }
    }

    if (data) {
      return { data: data, error: error, status: status }
    }
  } catch (error) {
    console.log("[!] Error fetching user endpoint \'", endpoint, "\':", error);
    return { data: {}, error: error, status: 'error' }
  }

  return { data: {}, error: "Unknown", status: "error" }
}

export function useGetUserSessions() {
  return useGetUserQuery("auth/sessions");
}

export function useDisableSession(){
  const header = useSelector(selectAuthHeader);

  const [disableSession, { error }] = useMutation(
    ({to_submit}) => fetch(
      config.backend_url + "auth/sessions/disable/" + to_submit.session_id,
      {
        method: "POST",
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

  return (sessionId) => async () => {
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
      return true;
    }
    return false;
  }
}
