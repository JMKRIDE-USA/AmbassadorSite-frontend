import React from 'react';

import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { connect } from 'react-redux';
import { useMutation, queryCache } from 'react-query';

import { page_styles } from '../pages.js';
import { CreateAccountForm } from '../components/createAccountForm.js';
import { getDateAfter } from '../modules/date.js';
import {
  setUserId,
  setAuthTokens,
  setAuthPermissions
} from '../modules/auth/authSlice.js';
import { useCreateAccount, useLogin, usePopulateAuth } from '../modules/auth/login.js';


const mapDispatchToProps = { setUserId, setAuthTokens, setAuthPermissions }

const SignUp = connect()(() => {
  let navigation = useNavigation();

  const createAccount = useCreateAccount();

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
    if (success) {
      () => navigation.reset({index: 0, routes: [{name: "Home"}]})
    }
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
        <TouchableOpacity onPress={
          () => navigation.reset({index: 0, routes: [{name: "Sign In"}]})
        }>
          <Text style={styles.clickableText}>
            Already have an account? Log in.
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
});
export default connect(null, mapDispatchToProps)(SignUp)

const styles = StyleSheet.create({
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
});

