import { useMutation, queryCache} from 'react-query';
import { useSelector } from 'react-redux';

import { selectAuthHeader } from '../auth/authSlice.js';
import { useGetQuery, createMutationCall } from '../data.js';
import config from '../../config.js';

const CACHE_KEY = 'challenge' //global key cache invalidations for queries this file

function challengeGetter(endpoint){
  return useGetQuery(
    endpoint,
    CACHE_KEY,
  )
}

export function useGetAmbassadorApplication() {
  return challengeGetter("challenges/ambassador-application");
}

export function useGetChallenge({ challengeId }) {
  return challengeGetter("challenges/id/" + challengeId);
}

export function useGetSubmission({ challengeId }) {
  return challengeGetter("challenges/submissions/id/" + challengeId);
}

export function useGetSubmissionsAllowed({ challengeId }) {
  return challengeGetter("challenges/submissions_allowed/id/" + challengeId);
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
