import { useMutation, queryCache} from 'react-query';
import { useSelector } from 'react-redux';

import { selectAuthHeader } from '../auth/authSlice.js';
import { useGetQuery, createMutationCall } from '../data.js';
import config from '../../config.js';

const CACHE_KEY = 'challenge' //global key cache invalidations for queries this file

function useGetChallenge(endpoint){
  return useGetQuery(
    endpoint,
    CACHE_KEY,
  )
}

export function useGetAmbassadorApplication() {
  return useGetChallenge("challenges/ambassador-application");
}

export function useGetChallengeById(id) {
  return useGetChallenge("challenges/id/" + id);
}

export function useSubmitChallenge(challengeId) {
  const header = useSelector(selectAuthHeader);

  const [submitChallenge, { error }] = useMutation(
    ({ to_submit }) => fetch(
      config.backend_url + "challenges/id/" + challengeId,
      {
        method: "POST",
        headers: {
          ...header,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(to_submit),
      }
    ),
    {
      onSuccess: async () => {
        console.log("success");
        queryCache.invalidateQueries(CACHE_KEY);
      },
    }
  )
  return createMutationCall(submitChallenge, error, "submitting challenge");

}
