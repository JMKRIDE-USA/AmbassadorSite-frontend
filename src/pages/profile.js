import React from 'react';

import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';

import { selectUserInfo } from '../modules/users/userSlice.js';
import { selectUserId } from '../modules/auth/authSlice.js';
import { page_styles } from '../pages.js';
import card_styles from '../styles/cardStyle.js';
import common_styles from '../styles/commonStyle.js';
import { useLogoutUser } from '../modules/auth/hooks.js';
import { useGetUser, useGetUserSessions, useDisableSession } from '../modules/users/hooks.js';
import {
  useGetAmbassadorApplicationSubmission,
} from '../modules/challenges/hooks.js';
import { useGetReferralCode } from '../modules/transactions/hooks.js';
import { SingleReferralCodeDisplay } from '../components/referralCode-display.js';
import { ISOToReadableString } from '../modules/date.js';
import { SubmissionItem } from '../components/submission-display.js';
import { SubmissionsTable } from '../components/tables/submissions.js';
import { UserTransactionsTable } from '../components/tables/transactions.js';


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

export function ReferralCodeInfo({userId}){
  const referralCodeQuery = useGetReferralCode({userId: userId});
  if (referralCodeQuery.status !== 'success') {
    return <></>
  }
  if (!referralCodeQuery.data.length) {
    return <></>
  }
  return (
    <SingleReferralCodeDisplay referralCode={referralCodeQuery.data[0]} row={true}/>
  )
}

export function Profile() {
  const userInfo = useSelector(selectUserInfo);
  const userId = useSelector(selectUserId);
  const userQuery = useGetUser({userId: userId});
  const userSessions = useGetUserSessions();

  const disable_session = useDisableSession();

  const AASubmissionQuery = useGetAmbassadorApplicationSubmission();

  const logout = useLogoutUser();

  let loading = ![
    userSessions,
    AASubmissionQuery,
    userQuery,
  ].every((query) => query.status === 'success');

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
        <Text>
          <Text style={styles.bold_body_text}>
            {"Name: "}
          </Text>
          <Text style={styles.body_text}>
            {userInfo.firstname} {userInfo.lastname}
          </Text>
        </Text>
        {userInfo.is_ambassador || userInfo.is_admin
          ? <Text>
              <Text style={styles.bold_body_text}>
                {"My Balance: "}
              </Text>
              <Text style={styles.body_text}>
                {userQuery.data.balance}
              </Text>
            </Text>
          : <></>
        }
        { userInfo.is_ambassador ? <></>
          : <Text> 
              <Text style={styles.bold_body_text}>
                {"Ambassador Status: "}
              </Text>
              <Text style={styles.body_text}>
                {!AASubmission && "Not Yet Submitted."}
              </Text>
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
        { ( userInfo.is_ambassador )
          ? <ReferralCodeInfo userId={userId}/>
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
      { (userInfo.is_ambassador || userInfo.is_admin)
        ? <View style={styles.page_card}>
            <Text style={styles.body_text}>
              Transaction History:
            </Text>
            <UserTransactionsTable/>
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
