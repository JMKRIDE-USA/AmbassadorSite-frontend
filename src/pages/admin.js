import React from 'react';

import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
 
import { page_styles } from '../pages.js';
import card_styles from './cardStyle.js';
import common_styles from '../components/commonStyle.js';

import { useGetPendingSubmissions } from '../modules/challenges/hooks.js';
import { SubmissionItem } from '../components/submission-display.js';

function SubmissionQueue() {
  let submissionQueue = useGetPendingSubmissions();

  let loading = ![submissionQueue].every(query => query.status === 'success');
  if(loading) {
    return (
      <Text> Submissions Loading... </Text>
    )
  }

  console.log(submissionQueue.data);
  
  return (
    <View>
      { submissionQueue.data.map(
        (submission, index) => (
          <SubmissionItem
            submission={submission}
            index={index}
            key={submission._id}
            admin={true}
            showAuthor={true}
            showChallenge={true}
          />
        ))
      }
    </View>
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
