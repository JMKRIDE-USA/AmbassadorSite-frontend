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
    console.log("[!] GetQuery: Auth requested but user is not logged in.");
    return { data: {}, error: "Unknown", status: "error" }
  }

  try {
    const { data, error, status } = useQuery(
      key,
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

    if (data) {
      return { data: data, error: error, status: status }
    }
  } catch (error) {
    console.log("[!] Error fetching", key, "endpoint \"", endpoint, "\":", error);
    return { data: {}, error: error, status: 'error' }
  }

  return { data: {}, error: "Unknown", status: "error" }
}
