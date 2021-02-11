import React from 'react';

import { View, Text, StyleSheet } from 'react-native';

import page_styles from '../styles/pageStyle.js';
import card_styles from '../styles/cardStyle.js';
import common_styles from '../styles/commonStyle.js';

import { ReferralCodeTable } from '../components/tables/transactions.js';
import { FullReferralCodeDisplay } from '../components/referralCode-display.js';

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
        : <AllReferralCodes/>
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
