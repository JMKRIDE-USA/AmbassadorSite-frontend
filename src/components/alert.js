import React, { useState } from 'react';

import { Dimensions } from 'react-native';
import AwesomeAlert from 'react-native-awesome-alerts';


import { StyleSheet } from 'react-native';
 
import page_styles from '../styles/pageStyle.js';
import card_styles from '../styles/cardStyle.js';
import common_styles from '../styles/commonStyle.js';


export function SubmissionReceivedAlert({show, setShow}) {
  return (
    <AwesomeAlert
      show={show}
      title={"Thanks!"}
      message={"You're submission was received."}
      showConfirmButton={true}
      confirmText={"Dismiss"}
      confirmButtonColor={"#00a0db"}
      overlayStyle={styles.overlay}
      titleStyle={styles.title_text}
      messageStyle={styles.body_text}
      confirmButtonTextStyle={styles.body_text}
      onConfirmPressed={() => setShow(false)}
    />
  );
}

export function EmailVerifiedAlert() {
  let [showAlert, setShowAlert] = useState(true);
  return (
    <AwesomeAlert
      show={showAlert}
      title={"Thanks!"}
      message={"We've successfully verified your email."}
      showConfirmButton={true}
      confirmText={"Dismiss"}
      confirmButtonColor={"#00a0db"}
      overlayStyle={styles.overlay}
      titleStyle={styles.title_text}
      messageStyle={styles.body_text}
      confirmButtonTextStyle={styles.body_text}
      onConfirmPressed={() => setShowAlert(false)}
    />
  );
}

const styles = StyleSheet.create({
  ...card_styles,
  ...common_styles,
  ...page_styles,
  ...{
    overlay: {
      position: "absolute",
      width: Dimensions.get('window').width,
      height: "100%",
    },
  },
});
