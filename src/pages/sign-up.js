import React from 'react';

import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { page_styles } from '../pages.js';
import { CreateAccountForm } from '../components/createAccountForm.js';


export function SignUp() {
  let navigation = useNavigation();
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
        <CreateAccountForm styles={styles}/>
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

