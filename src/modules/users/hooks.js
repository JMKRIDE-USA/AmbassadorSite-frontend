import { useMutation } from 'react-query';
import { useSelector } from 'react-redux';

import { queryClient, useGetQuery, createMutationCall } from '../data.js';
import { selectAuthHeader} from '../auth/authSlice.js';
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

export function useGetUser({userId}){
  return useGetUserQuery("users/id/" + userId);
}

export function useGetUserList(){
  return useGetUserQuery("users/all");
}

export function useGetUserSubmissionCount(userId) { 
  return useGetUserQuery("users/submission_count/id/" + userId);
}

export function useGetUserSubmissionCountFn(){
  return (userId) => useGetUserQuery("users/submission_count/id/" + userId);
}

export function useDisableSession(){
  const header = useSelector(selectAuthHeader);

  const { mutateAsync, error } = useMutation(
    ({to_submit}) => fetch(
      config.backend_url + "auth/sessions/id/" + to_submit.session_id,
      {
        method: "DELETE",
        headers: header,
      }
    ),
    {
      onSuccess: async () => {
        queryClient.invalidateQueries('user');
        queryClient.invalidateQueries('users');
      },
    }
  );

  return createMutationCall(
    mutateAsync, error, "disabling session",
  )
}

