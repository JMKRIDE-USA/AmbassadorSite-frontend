import React from 'react';

import { View, Text, StyleSheet } from 'react-native';

import { page_styles } from '../pages.js';
import card_styles from './cardStyle.js';
import common_styles from '../components/commonStyle.js';
import { useGetUser, useGetUserList, useGetUserSubmissionsCount } from '../modules/users/hooks.js';
import { UsersTable } from '../components/tables/users.js';
import { ISOToReadableString } from '../modules/date.js';
import { SubmissionsTable } from '../components/tables/submissions.js';

function SingleUserInfo({user}) {
  return (
    <View style={styles.page_card}>
      <Text style={styles.title_card_text}>
        <Text style={styles.title_text}>User: {user.firstName} {user.lastName}</Text>
      </Text>
      <View style={[styles.info_list, {marginTop: "15px", marginBottom: "10px"}]}>
        <View style={styles.info_item}>
          <Text style={styles.bold_body_text}>ID:</Text>
          <Text style={styles.body_text}>{user._id}</Text>
        </View>
        <View style={styles.info_item}>
          <Text style={styles.bold_body_text}>Email:</Text>
          <Text style={styles.body_text}>{user.email}</Text>
        </View>
        <View style={styles.info_item}>
          <Text style={styles.bold_body_text}>Signed Up:</Text>
          <Text style={styles.body_text}>{ISOToReadableString(user.createdAt)}</Text>
        </View>
        <View style={styles.info_item}>
          <Text style={styles.bold_body_text}>Permissions:</Text>
          <Text style={styles.body_text}>{user.permissionLevel}</Text>
        </View>
      </View>
    </View>
  );
}

function SingleUserSubmissions({userId}) {
  return (
    <View style={styles.page_card}>
      <Text style={styles.body_text}>
        User Submissions:
      </Text>
      <SubmissionsTable
        submissionsQueryParams={
          {userId: userId, populateAuthor: false, populateChallenge: true}
        }
      />
    </View>
  );
}

function SingleUserPage({userId}) {
  const userQuery = useGetUser({userId: userId});

  let loading = ![userQuery].every(
    (query) => query.status === 'success'
  );
  if (loading) {
    return (
      <Text> User loading... </Text>
    )
  }

  return (
    <>
      <SingleUserInfo user={userQuery.data}/>
      <SingleUserSubmissions userId={userId}/>
    </>
  );
}

export function UserPage(props) {
  if(props.route.params && props.route.params.id){
    return (
      <View style={page_styles.app_scrollview}>
        <SingleUserPage userId={props.route.params.id}/>
      </View>
    )
  }
  return (
    <View style={page_styles.app_scrollview}>
      <View style={styles.page_card}>
        <Text style={styles.title_text}>All Users:</Text>
        <UsersTable/>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  ...card_styles,
  ...common_styles,
  ...{
  }
});
