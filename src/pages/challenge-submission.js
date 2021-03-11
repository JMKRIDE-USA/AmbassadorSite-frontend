import React from 'react';

import { View, Text, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

import page_styles from '../styles/pageStyle.js';
import card_style from '../styles/cardStyle.js';
import common_styles from '../styles/commonStyle.js';

import { selectAuthPermissions } from '../modules/auth/authSlice.js';
import { AUTH_STATE } from '../modules/auth/constants.js';
import { SubmissionsTable } from '../components/tables/submissions.js';

import { 
  FullChallengeSubmissionDisplay,
} from '../components/submission-display.js';

function SubmissionList() {
  const auth_permissions = useSelector(selectAuthPermissions);
  let params, title;
  if (auth_permissions === AUTH_STATE.ADMIN){
    title = "All Submissions:"
    params = { 
      submissionsQueryParams: {
        admin: true, populateAuthor: true, populateChallenge: true
      },
      showAuthor: true,
    }
  } else { 
    title = "My Submissions";
    params = {};
  }

  return (
    <View style={styles.page_card}>
      <Text style={styles.title_text}>{title}</Text>
      <SubmissionsTable {...params}/>
    </View>
  );
}

export function ChallengeSubmissionPage(props) {
  if(props.route.params && props.route.params.id){
    return (
      <View style={styles.app_scrollview}>
        <FullChallengeSubmissionDisplay
          submissionId={props.route.params.id}
          successAlert={props.route.params.successAlert}
        />
      </View>
    )
  }
  return (
    <View style={styles.app_scrollview}>
      <SubmissionList/>
    </View>
  )
}

const styles = StyleSheet.create({
  ...card_style,
  ...common_styles,
  ...page_styles,
  ...{
  },
});
