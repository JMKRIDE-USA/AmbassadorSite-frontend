import React, { useEffect } from 'react';

import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';

import { page_styles } from '../pages.js';
import { LoginAccountForm } from '../components/loginForm.js';
import {
  selectUserId,
  fetchAuthRequest,
} from '../modules/auth/authSlice.js';
import { useLogin } from '../modules/auth/hooks.js';


export function SignIn() {
  let navigation = useNavigation();
  const dispatch = useDispatch();

  const login = useLogin();
  let userId = useSelector(selectUserId);

  useEffect(() => {
    if (userId) {
      navigation.reset({index: 0, routes: [{name: "Home"}]});
    }
  }, [userId]);

  async function submitLogin(
    { email, password },
    { setSubmitting },
  ){
    let success = await login({ email, password });
    console.log("User Log In:", success ? "Successful." : "Failure.");
    setSubmitting(false);
    return;
  }

  return (
    <View style={page_styles.app_scrollview}>
      <View style={styles.page}>
        <Text style={styles.title}>
          LOG IN
        </Text>
        <Text style={styles.subtitle}>
          Log in to your JMKRIDE ambassador account.
        </Text>
        <LoginAccountForm styles={styles} submitLogin={submitLogin}/>
        <TouchableOpacity onPress={
          () => navigation.reset({index: 0, routes: [{name: "Sign Up"}]})
        }>
          <Text style={styles.clickableText}>
            Don't yet have an account? Sign Up.
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

