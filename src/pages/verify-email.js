import React, { useState, useEffect } from 'react';

import { View, Text, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

import { useVerifyEmail } from '../modules/auth/hooks.js';
import { selectUserId } from '../modules/auth/authSlice.js';
import { selectUserInfo } from '../modules/users/userSlice.js';
import { useGetUser } from '../modules/users/hooks.js';

import page_styles from '../styles/pageStyle.js';
import card_styles from '../styles/cardStyle.js';
import common_styles from '../styles/commonStyle.js';

function AmbassadorVerifyEmailPage(props) {

  let [result, setResult] = useState(false);
  let [numDots, setNumDots] = useState(1);
  let [loaded, setLoaded] = useState(false);
  setTimeout(() => setLoaded(true), 5000);
  setTimeout(() => setNumDots(numDots + 1), 1000);
  const verifyEmail = useVerifyEmail();

  useEffect(() => {
    (async () => {
      if(props.route.params && props.route.params.key) {
        console.log(props.route.params.key);
        result = await verifyEmail({key: props.route.params.key});
        if(result){
          setResult(true);
        }
      }
    })()}, 
    [],
  );
  return (
    <>
      <Text style={styles.title_text}>
        Verifying Email
        {loaded ? ":" : ".".repeat(numDots)}
      </Text>
      { loaded ?
        <Text style={styles.body_text}>
          { result ? "Success!" : "Failed. "}
          { (props.route.params && props.route.params.key) ? "" : "Key not provided. Please follow the link in the email."}
        </Text>
        : <></>
      }
    </>
  )
}

export function VerifyEmailPage(props) {
  return (
    <View style={styles.app_scrollview}>
      <View style={styles.page_card}>
        <VerifyEmail {...props}/>
      </View>
    </View>
  );
}

function VerifyEmail(props) {
  const userInfo = useSelector(selectUserInfo);
  const userId = useSelector(selectUserId);
  const userQuery = useGetUser({userId: userId})
  if(userQuery.status !== 'success') {
    return <Text>Loading User...</Text>
  }

  if(!(userInfo.is_ambassador || userInfo.is_admin)) {
    return (
      <>
        <Text style={styles.title_text}>Failed to verify email!</Text>
        <Text style={styles.body_text}>Only Ambassadors can do this.</Text>
      </>
    );
  } if (userQuery.data.emailVerified) {
    return (
      <>
        <Text style={styles.title_text}>Email Verification Failed:</Text>
        <Text style={styles.body_text}>This email is already verified!</Text>
      </>
    );
  } else { 
    return (
      <AmbassadorVerifyEmailPage {...props}/>
    )
  }
}

const styles = StyleSheet.create({
  ...card_styles,
  ...common_styles,
  ...page_styles,
  ...{
  },
});
