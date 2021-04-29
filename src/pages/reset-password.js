import React, { useState } from 'react';

import { View, Text, StyleSheet } from 'react-native';

import Form from '../components/forms/form.js'
import { PasswordsDontMatchAlert, FormResultAlert } from '../components/alert.js';
import { useLogoutUser, useResetPasswordWithPassword } from '../modules/auth/hooks.js';

import page_styles from '../styles/pageStyle.js';
import card_styles from '../styles/cardStyle.js';
import common_styles from '../styles/commonStyle.js';

export function ResetPasswordWithPasswordPage() {
  const formStructure = [
    {
      title: "Old Password",
      fieldType: "PASSWORD",
      required: true,
      _id: "0",
    },
    {
      title: "New Password",
      fieldType: "PASSWORD",
      required: true,
      _id: "1",
    },
    {
      title: "Repeat New Password",
      fieldType: "PASSWORD",
      required: true,
      _id: "2",
    },
  ];

  let [showFailAlert, setShowFailAlert] = useState(false);
  let [showResultAlert, setShowResultAlert] = useState(false);
  let [result, setResult] = useState(false);
  let [resultTitle, setResultTitle] = useState("");
  let [resultMessage, setResultMessage] = useState("");
  const resetPasswordWithPassword = useResetPasswordWithPassword();
  const logout = useLogoutUser();
  const dismissResult = () => {
    if(result) {
      logout();
    }
    setShowResultAlert(false);
  }


  const handleSubmit = (data, {setSubmitting, resetForm}) => {
    if(data["1"] !== data["2"]) {
      setShowFailAlert(true);
      setSubmitting(false);
      resetForm();
      return false;
    }
    let to_submit = {
      oldPassword: data["0"],
      newPassword: data["1"],
    }
    resetPasswordWithPassword(to_submit).then(
      result => {
        setResult(result);
        if(result) {
          setResultTitle("Success!");
          setResultMessage("Now please log in.");
          setShowResultAlert(true);
          logout();
          resetForm();
          setSubmitting(false);
        } else {
          setResultTitle("Failed.");
          setResultMessage("Please try again.");
          setSubmitting(false);
          resetForm();
          setShowResultAlert(true);
        }
      }
    )
  }

  return (
    <>
      <View style={styles.app_scrollview}>
        <View style={styles.page_card}>
          <Text style={styles.title_card_text}>
            Reset Password:
          </Text>
          <Text style={[styles.sub_title_text, {maxWidth: "500px"}]}>
            {
              "If it's successful, you'll be logged out " +
              "and need to log in with your new password."
            }
          </Text>
          <Form
            structure={formStructure}
            handleSubmit={handleSubmit}
          />
        </View>
      </View>
      <PasswordsDontMatchAlert
        show={showFailAlert}
        onDismiss={() => setShowFailAlert(false)}
      />
      <FormResultAlert
        show={showResultAlert}
        onDismiss={dismissResult}
        title={resultTitle}
        message={resultMessage}
      />
    </>
  );
}

const styles = StyleSheet.create({
  ...card_styles,
  ...common_styles,
  ...page_styles,
  ...{
  },
});
