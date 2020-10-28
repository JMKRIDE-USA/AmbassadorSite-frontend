import React, { useEffect } from 'react';

import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';

import { page_styles } from '../pages.js';
import { CreateAccountForm } from '../components/createAccountForm.js';
import {
  selectUserId,
  fetchAuthRequest,
} from '../modules/auth/authSlice.js';
import { useCreateAccount } from '../modules/auth/login.js';


export default function SignUp(){
  let navigation = useNavigation();
  const dispatch = useDispatch();

  const createAccount = useCreateAccount();
  let userId = useSelector(selectUserId)

  useEffect(() => {
    if (userId) {
      navigation.reset({index: 0, routes: [{name: "Home"}]})
    }
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
}

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
