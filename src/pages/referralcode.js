import React from 'react';

import { View, Text, StyleSheet } from 'react-native';

import { page_styles } from '../pages.js';
import card_styles from '../pages/cardStyle.js';
import common_styles from '../components/commonStyle.js';

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
    <View style={page_styles.app_scrollview}>
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
  ...{
  },
});
