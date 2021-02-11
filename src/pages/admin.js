import React from 'react';

import { StyleSheet, View, Text } from 'react-native';
 
import { page_styles } from '../pages.js';
import card_styles from './cardStyle.js';
import common_styles from '../components/commonStyle.js';

import {
  useGetPendingSubmissions,
} from '../modules/challenges/hooks.js';
import {
  useGetAllReferralCodes,
  useCreateReferralUsage
} from '../modules/transactions/hooks.js';
import { SubmissionsTable } from '../components/tables/submissions.js';
import { ReferralCodeTable } from '../components/tables/transactions.js';
import { GenericForm } from '../components/formik/generic-form.js'

function CreateReferralUsageForm() {
  const createReferralUsage = useCreateReferralUsage();

  const allCodesQuery = useGetAllReferralCodes();
  if (allCodesQuery.status !== 'success') {
    return (
      <Text>Loading All Referral Codes...</Text>
    );
  }
  let code_to_id = {}
  let code_options = []
  allCodesQuery.data.map(
    code => {
      code_to_id[code.code] = code._id;
      code_options.push(code.code);
    }
  )
  
  const handleSubmit = (data, {setSubmitting}) => {
    let to_submit = {
      total: data["0"],
      orderNumber: data["1"],
      code: code_to_id[data["2"]],
    };
    console.log("Submitting:", to_submit);
    createReferralUsage(to_submit);
    setSubmitting(false);
  }

  const structure = [
    {
      title: "Order Total",
      fieldType: "NUMBER",
      required: true,
      _id: "0",
    },
    {
      title: "Order Number",
      fieldType: "NUMBER",
      required: true,
      _id: "1",
    },
    {
      title: "Code",
      fieldType: "SWITCH",
      required: true,
      options: code_options,
      _id: "2"
    },
  ]
  return (
    <GenericForm
      structure={structure}
      handleSubmit={handleSubmit}
    />
  );
}

function CreateReferralUsageCard() {
  return (
    <View style={styles.page_card}>
      <Text style={styles.body_text}>
        Create Referral Code Usage:
      </Text>
      <CreateReferralUsageForm/>
    </View>
  );
}

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
      <CreateReferralUsageCard/>
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
