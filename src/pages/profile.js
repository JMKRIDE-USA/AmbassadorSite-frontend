import React from 'react';

import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';

import { selectUserInfo } from '../modules/users/userSlice.js';
import { selectUserId } from '../modules/auth/authSlice.js';
import { page_styles } from '../pages.js';
import card_styles from './cardStyle.js';
import common_styles from '../components/commonStyle.js';
import { useLogoutUser } from '../modules/auth/hooks.js';
import { useGetUserSessions, useDisableSession } from '../modules/users/hooks.js';
import {
  useGetAmbassadorApplicationSubmission,
  useGetSubmissions,
} from '../modules/challenges/hooks.js';
import { ISOToReadableString } from '../modules/date.js';
import { SubmissionItem } from '../components/submission-display.js';
import { SubmissionsTable } from '../components/tables/submissions.js';


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
  const userInfo = useSelector(selectUserInfo);
  const userSessions = useGetUserSessions();
  //const userSubmissionsQuery = useGetSubmissions({populateAuthor: false});

  const disable_session = useDisableSession();

  const AASubmissionQuery = useGetAmbassadorApplicationSubmission();

  const logout = useLogoutUser();

  let loading = ![userSessions, AASubmissionQuery].every(
    (query) => query.status === 'success'
  );

  if (loading) {
    return (
      <Text> Profile loading... </Text>
    )
  }
  let AASubmission = undefined;
  if(AASubmissionQuery.data && AASubmissionQuery.data.length) {
    AASubmission = AASubmissionQuery.data[0]
  }
  return (
    <View style={page_styles.app_scrollview}>
      <View style={styles.page_card}>
        <Text style={styles.title_text}>
          {userInfo.is_ambassador ? "Ambassador" : "User"} Profile<br/>
        </Text>
        <Text style={styles.body_text}>
          Name: {userInfo.firstname} {userInfo.lastname}
        </Text>
        { userInfo.is_ambassador ? <></>
          : <Text style={styles.body_text}>
              Ambassador Status: {!AASubmission && "Not Yet Submitted."}
            </Text>
        }
        {(!userInfo.is_ambassador && AASubmission)
          ? <SubmissionItem
              submission={AASubmission}
              index={0}
              showAuthor={false}
            />
          : <></>
        }
      </View>
      <TouchableOpacity
        style={[styles.standalone_button, {backgroundColor: "red"}]}
        onPress={logout}
      >
        <Text style={styles.standalone_button_text}>
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
      { userInfo.is_ambassador 
        ?
          <View style={styles.page_card}>
            <Text style={styles.body_text}>
              My Submissions:
            </Text>
            <SubmissionsTable submissionsQueryParams={{showAuthor: false}}/>
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
  },
});
