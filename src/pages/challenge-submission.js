import React from 'react';

import { View, Text, StyleSheet } from 'react-native';

import { page_styles } from '../pages.js';
import card_style from './cardStyle.js';
import common_styles from '../components/commonStyle.js';

import { SubmissionsTable } from '../components/tables/submissions.js';

import { 
  FullChallengeSubmissionDisplay,
} from '../components/submission-display.js';

function SubmissionList() {
  return (
    <View style={styles.page_card}>
      <Text style={styles.title_text}>
        My Submissions:
      </Text>
      <SubmissionsTable/>
    </View>
  );
}

export function ChallengeSubmissions(props) {
  if(props.route.params && props.route.params.id){
    return (
      <View style={page_styles.app_scrollview}>
        <FullChallengeSubmissionDisplay submissionId={props.route.params.id}/>
      </View>
    )
  }
  return (
    <View style={page_styles.app_scrollview}>
      <SubmissionList/>
    </View>
  )
}

const styles = StyleSheet.create({
  ...card_style,
  ...common_styles,
  ...{
  },
});
