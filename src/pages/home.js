import React from 'react';

import { View, Text, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

import { selectAuthPermissions } from '../modules/auth/authSlice.js';
import { AUTH_STATE } from '../modules/auth/constants.js';
import { ChallengeBoard } from '../pages/challenge.js';
import { SplashPage } from './splash-page.js';

import page_styles from '../styles/pageStyle.js';
import card_styles from '../styles/cardStyle.js';
import common_styles from '../styles/commonStyle.js';

export function HomePage(props) {
  let auth_permissions = useSelector(selectAuthPermissions);
  if([AUTH_STATE.NONE, AUTH_STATE.USER].includes(auth_permissions)) {
    return <SplashPage/>
  } else if ([AUTH_STATE.AMBASSADOR, AUTH_STATE.ADMIN].includes(auth_permissions)) {
    return <ChallengeBoard {...props}/>
  }
  return (
    <View style={styles.app_scrollview}>
      <View style={styles.page_card}>
        <Text style={styles.title_text}>Home</Text>
      </View>
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
