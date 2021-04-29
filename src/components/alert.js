import React, { useState } from 'react';

import { Dimensions } from 'react-native';
import AwesomeAlert from 'react-native-awesome-alerts';


import { StyleSheet } from 'react-native';
 
import page_styles from '../styles/pageStyle.js';
import card_styles from '../styles/cardStyle.js';
import common_styles from '../styles/commonStyle.js';


export function PasswordsDontMatchAlert({show, onDismiss}) {
  return (
    <AwesomeAlert
      show={show}
      title={"Passwords do not match."}
      message={"Please try again."}
      showConfirmButton={true}
      confirmText={"Dismiss"}
      confirmButtonColor={"#00a0db"}
      overlayStyle={styles.overlay}
      titleStyle={styles.title_text}
      messageStyle={styles.body_text}
      confirmButtonTextStyle={styles.body_text}
      onConfirmPressed={onDismiss}
      onDismiss={onDismiss}
    />
  );
}

export function FormResultAlert({show, onDismiss, title, message}) {
  return (
    <AwesomeAlert
      show={show}
      title={title}
      message={message}
      showConfirmButton={true}
      confirmText={"Dismiss"}
      confirmButtonColor={"#00a0db"}
      overlayStyle={styles.overlay}
      titleStyle={styles.title_text}
      messageStyle={styles.body_text}
      confirmButtonTextStyle={styles.body_text}
      onConfirmPressed={onDismiss}
      onDismiss={onDismiss}
    />
  );
}

export function SubmissionReceivedAlert({show, onDismiss}) {
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
      onConfirmPressed={onDismiss}
      onDismiss={onDismiss}
    />
  );
}

export function VerifyEmailPrompt({show, onConfirm, onCancel}) {
  return (
    <AwesomeAlert
      show={show}
      title={"Send Verification Email?"}
      message={
        "We'll send you an email with a link you can click. " +
        "Check your spam folder if you aren't finding it."
      }
      showConfirmButton={true}
      showCancelButton={true}
      cancelButtonColor={"lightgray"}
      confirmText={"Confirm"}

      confirmButtonColor={"#00a0db"}
      overlayStyle={styles.super_overlay}
      titleStyle={styles.title_text}
      messageStyle={styles.body_text}
      confirmButtonTextStyle={styles.body_text}
      cancelButtonTextStyle={styles.body_text}

      onConfirmPressed={onConfirm}
      onCancelPressed={onCancel}
      onDismiss={onCancel}
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
