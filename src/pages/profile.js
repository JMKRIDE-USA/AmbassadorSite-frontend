import React from 'react';

import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import { selectUserInfo, logoutUser } from '../modules/users/userSlice.js';
import { page_styles } from '../pages.js';
import card_styles from './cardStyle.js';
import { resetAuth } from '../modules/auth/authSlice.js';
import { useGetUserSessions, useDisableSession } from '../modules/users/hooks.js';


const SessionItem = (disable_session, current) => (session) => {
  const date = new Date(session.lastUsedDate);
  if (current !== Boolean(session.current)){
    return <View key={session.id}></View>
  }
  return (
    <View style={styles.session_item} key={session.id}>
      <Text style={styles.session_text}>
        Last Seen: {date.toLocaleString()} at {session.lastUsedIP}
      </Text>
      <TouchableOpacity
        style={styles.session_logout_button}
        onPress={disable_session(session.id, session.current)}
      >
        <Text>{current ? "Log Out" : "Delete"}</Text>
      </TouchableOpacity>
    </View>
  );
}

export function Profile() {
  const dispatch = useDispatch();

  const userInfo = useSelector(selectUserInfo);

  const userSessions = useGetUserSessions();

  const disable_session = useDisableSession();

  function logout(){
    dispatch(logoutUser());
    dispatch(resetAuth());
  }
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
      { userSessions.data.length
        ? <View style={styles.session_list}>
            <Text style={styles.body_text}>Logged In Sessions:</Text>
            {userSessions.data.map(SessionItem(disable_session, true))} 
            {userSessions.data.map(SessionItem(disable_session, false))}
          </View>
        : <></>
      }
      
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
    },
    session_list: {
      ...card_styles.page_card,
      padding: "10px",
    },
    session_item: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      borderBottomWidth: "1px",
      borderColor: "black",
    },
    session_text: {},
    session_logout_button: {
      width: 100,
      borderRadius: 5,
      padding: "2px",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#d5d5d5",
      margin: "10px",
    }
  },
});
