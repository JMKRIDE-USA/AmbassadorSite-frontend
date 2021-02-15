import React from 'react';

import { View, Text, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

import page_styles from '../styles/pageStyle.js';
import card_styles from '../styles/cardStyle.js';
import common_styles from '../styles/commonStyle.js';

import { AUTH_STATE } from '../modules/auth/constants.js';
import { selectUserId, selectAuthPermissions } from '../modules/auth/authSlice.js';
import { useGetReferralCode } from '../modules/transactions/hooks.js';
import { ReferralCodeTable } from '../components/tables/transactions.js';
import { FullReferralCodeDisplay } from '../components/referralCode-display.js';

function FullPageReferralCodes() {
  const auth_permissions = useSelector(selectAuthPermissions);
  const userId = useSelector(selectUserId);
  const userReferralCodeQuery = useGetReferralCode({userId: userId})
  if(auth_permissions === AUTH_STATE.ADMIN) {
    return <AllReferralCodes/>
  }
  if (userReferralCodeQuery.status !== 'success'){
    return <Text> Loading Ambassador Referral Code... </Text>
  }
  return <FullReferralCodeDisplay referralCodeId={userReferralCodeQuery.data[0]._id}/>
}

function AllReferralCodes() {
  return (
    <View style={styles.page_card}>
      <Text style={styles.title_text}>
        All Active Referral Codes:
      </Text>
      <ReferralCodeTable/>
    </View>
  );
}

export function ReferralCodePage(props) {
  return (
    <View style={styles.app_scrollview}>
      {
        props.route.params && props.route.params.id
        ? <FullReferralCodeDisplay referralCodeId={props.route.params.id}/>
        : <FullPageReferralCodes/>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  ...card_styles,
  ...common_styles,
  ...page_styles,
  ...{
  },
});
