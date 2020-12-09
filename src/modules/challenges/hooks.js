import { useQuery } from 'react-query';
import { useSelector, useDispatch } from 'react-redux';

import { selectAuthHeader } from '../auth/authSlice.js';
import { useGetQuery } from '../data.js';
import config from '../../config.js';

function useGetChallenge(endpoint){
  return useGetQuery(
    endpoint,
    'challenge', //global key for this file
  )
}

export function useGetAmbassadorApplication() {
  return useGetChallenge("challenges/ambassador-application");
}
