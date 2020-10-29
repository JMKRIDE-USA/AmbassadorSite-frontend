import React from 'react';

import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import { selectUserInfo, logoutUser } from '../modules/users/userSlice.js';
import { page_styles } from '../pages.js';
import card_styles from './cardStyle.js';
import { resetAuth } from '../modules/auth/authSlice.js';

export function Profile() {
  const dispatch = useDispatch();

  function logout(){
    dispatch(logoutUser());
    dispatch(resetAuth());
  }
  const userInfo = useSelector(selectUserInfo);

  return (
    <View style={page_styles.app_scrollview}>
      <View style={styles.page_card}>
        <Text style={styles.card_text}>
          <Text style={styles.title_text}>
            {userInfo.is_ambassador ? "Ambassador" : "User"} Profile<br/>
          </Text>
          <Text style={styles.body_text}>
            Name: {userInfo.firstname} {userInfo.lastname}
          </Text>
        </Text>
      </View>
      <TouchableOpacity style={styles.logout_button} onPress={logout}>
        <Text style={styles.logout_button_text}>
          Log Out
        </Text>
      </TouchableOpacity>
      
    </View>
  );
}

const styles = StyleSheet.create({
  ...card_styles,
  ...{
    logout_button: {
      width: 300,
      height: 50,
      backgroundColor: "red",
      borderWidth: "2px",
      borderColor: "black",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "20px",
    },
    logout_button_text: {
      fontSize: 22,
      color: "black",
    }
  },
});
