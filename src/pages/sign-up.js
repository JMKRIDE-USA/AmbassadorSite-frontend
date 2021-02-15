import React, { useEffect } from 'react';

import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { useLinkTo } from '@react-navigation/native';
import { useSelector } from 'react-redux';

import page_styles from '../styles/pageStyle.js';
import CreateAccountForm from '../components/forms/create-account-form.js';
import { selectUserId } from '../modules/auth/authSlice.js';
import { useCreateAccount } from '../modules/auth/hooks.js';


export function SignUpPage(){
  const createAccount = useCreateAccount();
  let userId = useSelector(selectUserId)

  const linkTo = useLinkTo();
  const goHome = () => linkTo("/");
  const goSignIn = () => linkTo("/sign-in");

  useEffect(() => {
    if (userId) {goHome()}
  }, [userId]);

  async function submitSignUp(
    { fullname, email, password, password_copy },
    { setSubmitting },
  ){

    if ( password !== password_copy ) {
      console.log("Sign up failed. Passwords do not match.");
      setSubmitting(false);
      return;
    }
    let index = fullname.indexOf(' ');
    const firstName = fullname.substr(0, index), lastName = fullname.substr(index+1)

    let success = await createAccount({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
    })
    console.log("Create Account:", success ? "Success." : "Failure.");
    setSubmitting(false);
    return;
  }
  return (
    <View style={page_styles.app_scrollview}>
      <View style={styles.page}>
        <Text style={styles.title}>
          CREATE AN ACCOUNT
        </Text>
        <Text style={styles.subtitle}>
          An account is required to create an 
          ambassador application and view its status.
        </Text>
        <CreateAccountForm styles={styles} submitCreateAccount={submitSignUp}/>
        <TouchableOpacity onPress={goSignIn}>
          <Text style={styles.clickableText}>
            Already have an account? Log in.
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  ...page_styles,
  ...{
    page: {
      flex: 1, 
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "stretch",
      backgroundColor: "white",
      padding: "20px",
      borderRadius: "10px",
      maxWidth: "90%",
    },
    formview: {},
    title: {
      textAlign: "center",
      fontSize: "40px",
      fontWeight: "bold",
      paddingBottom: "10px",
    },
    subtitle: {
      textAlign: "center",
      paddingBottom: "30px",
    },
    clickableText: {
      textAlign: "center",
      color: "blue",
      textDecorationLine: "underline",
      marginTop: "10px",
    },
    inputField: {},
    errorText: {
      color: "red",
    },
  },
});
