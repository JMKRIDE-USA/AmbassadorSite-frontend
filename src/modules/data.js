import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';

import { selectAuthHeader, selectUserId } from './auth/authSlice.js';
import config from '../config.js';

export function useGetQuery(endpoint, key, auth = true) {
  let header;
  if (auth) {
    header = useSelector(selectAuthHeader);
  }
  const userId = useSelector(selectUserId);
  if (auth && !userId) {
    const error = "GetQuery: Auth requested but user is not logged in." ;
    console.log("[!]", error);
    return { data: {}, error: error, status: "error" }
  }

  try {
    const { data, error, status } = useQuery(
      [key + endpoint, endpoint], // caching invalidations from either
      () => fetch(
        config.backend_url + endpoint,
        {
          method: "GET",
          headers: auth ? header : [],
        }
      ).then(res => res.json()),
    )

    if (error) {
      console.log("[!] Error fetching", key, "endpoint \"", endpoint, "\":", error);
      return { data: {}, error: error, status: status }
    }

    return { data: data, error: error, status: status }
  } catch (error) {
    console.log("[!] Error fetching", key, "endpoint \"", endpoint, "\":", error);
    return { data: {}, error: error, status: 'error' }
  }
}

export function createMutationCall(mutationFn, mutationError, mutationVerb) {
  return async (to_submit) => {
    let result;
    try {
      result = await mutationFn({to_submit})
    } catch (error) {
      console.log("[!] Error", mutationVerb, ":", error);
      return false;
    }
    if (mutationError){
      console.log("[!] Error", mutationVerb, ":", mutationError);
      return false;
    }
    if (result && result.error){
      console.log("[!] Error", mutationVerb, ":", result.error);
      return false;
    }
    if (result) {
      return result;
    }
    return false;
  }
}
