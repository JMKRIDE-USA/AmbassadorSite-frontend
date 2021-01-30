import { useMutation, queryCache} from 'react-query';
import { useSelector } from 'react-redux';

import { selectUserId, selectAuthHeader } from '../auth/authSlice.js';
import { useGetQuery, createMutationCall } from '../data.js';
import config from '../../config.js';


const CACHE_KEY = 'transaction';

function transactionGetter(endpoint){
  return useGetQuery(
    endpoint,
    CACHE_KEY,
  )
}

export function useGetTransactions({userId, submissionId} = {}){
  const currentUserId = useSelector(selectUserId);
  userId = userId ? userId : currentUserId;
  let postfix = "?userId=" + userId;
  if(submissionId) {
    postfix += "&submissionId=" + submissionId;
  }
  return transactionGetter("transactions/get" + postfix);
}

export function useGetReferralCode({userId} = {}){
  let postfix = userId ? "?userId=" + userId : "";
  return transactionGetter("transactions/referralCodes/get" + postfix);
}

export function useCreateReferralCode() {
  const header = useSelector(selectAuthHeader);

  const [createReferralCode, { error }] = useMutation(
    ({ to_submit }) => fetch(
      config.backend_url + "transactions/referralCodes/create",
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
      onSuccess: () => {
        queryCache.invalidateQueries(CACHE_KEY);
      },
    }
  );
  return createMutationCall(createReferralCode, error, "creating referral code");
}
