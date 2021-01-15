import React from 'react';

import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import { selectUserInfo, logoutUser } from '../modules/users/userSlice.js';
import { page_styles } from '../pages.js';
import card_styles from './cardStyle.js';
import common_styles from '../components/commonStyle.js';
import { resetAuth } from '../modules/auth/authSlice.js';
import { useGetUserSessions, useDisableSession } from '../modules/users/hooks.js';
import { ISOToReadableString } from '../modules/date.js';


const SessionItem = (disable_session, current, logout) => (session, index) => {
  if (current !== Boolean(session.current)){
    return <View key={session.id}></View>
  }
  let item_style = {}
  if(index > 0) {
    item_style.borderTopWidth = "1px";
  }
  return (
    <View style={[styles.item_view, item_style]} key={session.id}>
      <Text style={styles.item_text}>
        <Text style={styles.bold_item_text}>{"Last Seen: "}</Text>
        {ISOToReadableString(session.lastUsedDate)} at {session.lastUsedIP}
      </Text>
      <TouchableOpacity
        style={styles.item_button}
        onPress={() => {
          disable_session({session_id: session.id})
          if(current) {
            logout();
          }
        }}
      >
        <Text style={styles.item_button_text}>{current ? "Log Out" : "Delete"}</Text>
      </TouchableOpacity>
    </View>
  );
}

export function Profile() {
  const dispatch = useDispatch();

  const userInfo = useSelector(selectUserInfo);

  const userSessions = useGetUserSessions();

  const disable_session = useDisableSession();

  let loading = ![userSessions].every(
    (query) => query.status === 'success'
  );

  if (loading) {
    return (
      <Text> Profile loading... </Text>
    )
  }
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
        ? <View style={styles.list}>
            <Text style={styles.body_text}>Logged In Sessions:</Text>
            {userSessions.data.map(SessionItem(disable_session, false, ()=> true))}
            {userSessions.data.map(SessionItem(disable_session, true, logout))} 
          </View>
        : <></>
      }
      
    </View>
  );
}

const styles = StyleSheet.create({
  ...card_styles,
  ...common_styles,
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
  },
});
