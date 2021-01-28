import React from 'react';

import { StyleSheet, View, Text } from 'react-native';
 
import { page_styles } from '../pages.js';
import card_styles from './cardStyle.js';
import common_styles from '../components/commonStyle.js';

import { useGetPendingSubmissions } from '../modules/challenges/hooks.js';
import { SubmissionsTable } from '../components/tables/submissions.js';

function SubmissionQueue() {
  let submissionQueue = useGetPendingSubmissions();
  return (
    <SubmissionsTable submissionsQuery={submissionQueue} showAuthor={true}/>
  )

}

function SubmissionQueueCard() {
  return (
    <View style={styles.page_card}>
      <Text style={styles.body_text}>
        Challenge Submissions Queue:
      </Text>
      <SubmissionQueue/>
    </View>
  )
}


export function AdminPage() {
  return (
    <View style={page_styles.app_scrollview}>
      <View style={styles.page_card}>
        <Text style={styles.title_card_text}>
          <Text style={styles.title_text}>
            Admin Control Panel
          </Text>
        </Text>
      </View>
      <SubmissionQueueCard/>
    </View>
  );
}

const styles = StyleSheet.create({
  ...card_styles,
  ...common_styles,
  ...{
  },
});
