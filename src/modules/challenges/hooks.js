import { useMutation, queryCache} from 'react-query';
import { useSelector } from 'react-redux';

import { selectAuthHeader, selectUserId } from '../auth/authSlice.js';
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

export function useGetAmbassadorApplicationSubmission() {
  return challengeGetter("challenges/submissions/ambassador-application");
}

export function useGetChallenge({ challengeId, submissionId }) {
  if(challengeId) {
    return challengeGetter("challenges?challengeId=" + challengeId);
  } else if (submissionId) {
    return challengeGetter("challenges?submissionId=" + submissionId);
  }
  throw new Error("[useGetChallenge] One of submissionId, challengeId required.")
}

export function useGetSubmissions(
  {
    submissionId,
    challengeId,
    userId,
    populateAuthor = true,
    populateChallenge = false,
    admin = false,
  }) {
  let options = []
  const currentUserId = useSelector(selectUserId);
  if (!(userId || admin)) {
    userId = currentUserId;
  }
  if (userId){
    options.push(["userId", userId])
  }
  options.push(["populateAuthor", (populateAuthor ? "true" : "false")]);
  options.push(["populateChallenge", (populateChallenge ? "true" : "false")]);

  if(submissionId) {
    options.push(["submissionId", submissionId])
  } else if (challengeId) {
    options.push(["challengeId", challengeId]);
  } else if (admin) {
    options.push(["admin", "true"]);
  } else if (!userId) {
    throw new Error("[useGetSubmissions] One of submissionId, challengeId, userId required.")
  }
  
  let queryString = "challenges/submissions";
  options.map((option, index) => {
    if(index === 0) {
      queryString += "?" + option[0] + "=" + option[1];
    } else { 
      queryString += "&" + option[0] + "=" + option[1];
    }
  })
  return challengeGetter(queryString);
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

export function useCreateChallenge() {
  const header = useSelector(selectAuthHeader);

  const [createChallenge, { error }] = useMutation(
    ({ to_submit }) => fetch(
      config.backend_url + "challenges/create",
      {
        method: "POST",
        headers: {
          ...header,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(to_submit)
      }
    ),
    {
      onSuccess: () => {
        console.log("success");
        queryCache.invalidateQueries(CACHE_KEY);
      },
    }
  )
  return createMutationCall(createChallenge, error, "creating challenge");
}

export function useDeleteSubmission(submissionId) {
  const header = useSelector(selectAuthHeader);

  const [deleteSubmission, {error}] = useMutation(
    () => fetch(
      config.backend_url + "challenges/submissions/id/" + submissionId,
      {
        method: "DELETE",
        headers: header,
      }
    ),
    {
      onSuccess: async() => {
        queryCache.invalidateQueries(CACHE_KEY);
      },
    }
  );
  return createMutationCall(deleteSubmission, error, "deleting submission");
}

export function useUpdateSubmission(submissionId) {
  const header = useSelector(selectAuthHeader);

  const [updateSubmission, {error}] = useMutation(
    ({to_submit}) => fetch(
      config.backend_url + "challenges/submissions/update/id/" + submissionId,
      {
        method: "POST",
        headers: {
          ...header,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(to_submit),
      },
    ),
    {
      onSuccess: async() => {
        queryCache.invalidateQueries(CACHE_KEY);
      },
    }
  );
  return createMutationCall(updateSubmission, error, "updating submission");
}

export function useGetPendingSubmissions() {
  return challengeGetter("challenges/submissions/pending");
}
