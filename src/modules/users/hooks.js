import { useMutation, queryCache } from 'react-query';
import { useSelector, useDispatch } from 'react-redux';

import { useGetQuery, createMutationCall } from '../data.js';
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

  return createMutationCall(
    disableSession, error, "disabling session",
  )
}
