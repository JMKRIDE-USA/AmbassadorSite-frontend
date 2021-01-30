import React from 'react';

import { StyleSheet, View, Text } from 'react-native';
 
import { page_styles } from '../pages.js';
import card_styles from './cardStyle.js';
import common_styles from '../components/commonStyle.js';

import {
  useGetPendingSubmissions,
} from '../modules/challenges/hooks.js';
import { SubmissionsTable } from '../components/tables/submissions.js';
import { ReferralCodeTable } from '../components/tables/transactions.js';
import { CreateReferralCodeForm } from '../components/referralCode-display.js';


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
        Submissions Queue:
      </Text>
      <SubmissionQueue/>
    </View>
  )
}

function SubmissionsHistoryCard() {
  return (
    <View style={styles.page_card}>
      <Text style={styles.body_text}>
        All Submissions:
      </Text>
      <SubmissionsTable
        submissionsQueryParams={
          {admin: true, populateAuthor: true, populateChallenge: true}
        }
        showAuthor={true}
      />
    </View>
  )
}

function ReferralCodeCard() {
  return (
    <View style={styles.page_card}>
      <Text style={styles.body_text}>
        Active Referral Codes:
      </Text>
      <ReferralCodeTable/>
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
      <ReferralCodeCard/>
      <SubmissionsHistoryCard/>
    </View>
  );
}

const styles = StyleSheet.create({
  ...card_styles,
  ...common_styles,
  ...{
  },
});
