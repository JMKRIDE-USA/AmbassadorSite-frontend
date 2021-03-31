import { useMutation } from 'react-query';
import { useSelector } from 'react-redux';

import { selectUserId, selectAuthHeader } from '../auth/authSlice.js';
import { queryClient, useGetQuery, createMutationCall } from '../data.js';
import config from '../../config.js';


const CACHE_KEY = 'transaction';

function transactionGetter(endpoint){
  return useGetQuery(
    endpoint,
    CACHE_KEY,
  )
}

export function useGetTransactions(
  {userId, useCurrentUser = false, submissionId, referralCodeId, populate = false} = {}
){
  const currentUserId = useSelector(selectUserId);
  if(useCurrentUser) {
    userId = currentUserId
  }
  let postfix = "?populate=" + (populate ? "true" : "false")
  if(userId){
    postfix += "&userId=" + userId;
  } else if(submissionId) {
    postfix += "&submissionId=" + submissionId;
  } else if(referralCodeId) {
    postfix += "&referralCodeId=" + referralCodeId;
  }
  return transactionGetter("transactions/get" + postfix);
}

export function useGetReferralCode({referralCodeId, userId} = {}){
  let postfix = ""
  if(userId) {
    postfix += "?userId=" + userId;
  } else if (referralCodeId) {
    postfix += "?id=" + referralCodeId;
  }
  return transactionGetter("transactions/referralCodes/get" + postfix);
}

export function useCreateReferralCode() {
  const header = useSelector(selectAuthHeader);

  const { mutateAsync, error } = useMutation(
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
        queryClient.invalidateQueries(CACHE_KEY);
      },
    }
  );
  return createMutationCall(mutateAsync, error, "creating referral code");
}

export function useGetAllReferralCodes() {
  return transactionGetter("transactions/referralCodes/get/all");
}

export function useCreateReferralUsage() {
  const header = useSelector(selectAuthHeader);

  const { mutateAsync, error } = useMutation(
    ({ to_submit }) => fetch(
      config.backend_url + "transactions/referralCodes/usage/create",
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
        queryClient.invalidateQueries(CACHE_KEY);
      },
    }
  );
  return createMutationCall(mutateAsync, error, "creating referral code usage");
}

export function useCreateAdminTransaction() {
  const header = useSelector(selectAuthHeader);

  const { mutateAsync, error } = useMutation(
    ({ to_submit }) => fetch(
      config.backend_url + "transactions/admin/create",
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
        queryClient.invalidateQueries(CACHE_KEY);
        queryClient.invalidateQueries('user');
      },
    }
  );
  return createMutationCall(mutateAsync, error, "creating admin transaction");
}

export function useRecalculateUserBalance() {
  const header = useSelector(selectAuthHeader);

  const { mutateAsync, error } = useMutation(
    ({ to_submit }) => fetch(
      config.backend_url + "transactions/admin/recalculateBalance",
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
        queryClient.invalidateQueries(CACHE_KEY);
        queryClient.invalidateQueries('user');
      },
    }
  );
  return createMutationCall(mutateAsync, error, "recalculating user balance");
}
