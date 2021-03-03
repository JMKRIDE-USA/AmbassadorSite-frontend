import React from 'react';

import { StyleSheet, View, Text } from 'react-native';
 
import page_styles from '../styles/pageStyle.js';
import card_styles from '../styles/cardStyle.js';
import common_styles from '../styles/commonStyle.js';

import {
  useGetPendingSubmissions,
} from '../modules/challenges/hooks.js';
import {
  useGetAllReferralCodes,
  useCreateReferralUsage,
  useCreateAdminTransaction,
} from '../modules/transactions/hooks.js';
import { useGetUserList } from '../modules/users/hooks.js';
import { AllTransactionsTable } from '../components/tables/transactions.js';
import { SubmissionsTable } from '../components/tables/submissions.js';
import Form from '../components/forms/form.js'

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
    <Form
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

function CreateAdminTransactionForm() {
  const createAdminTransaction = useCreateAdminTransaction();

  const allUsersQuery = useGetUserList({namesOnly: true});
  if (allUsersQuery.status !== 'success') {
    return (
      <Text>Loading All Users...</Text>
    );
  }

  let user_to_id = {}
  let user_options = []
  allUsersQuery.data.map(
    user => {
      user_to_id[user.fullName] = user._id;
      user_options.push(user.fullName);
    }
  )

  const handleSubmit = (data, {setSubmitting}) => {
    let to_submit = {
      amount: data["0"],
      user: user_to_id[data["1"]],
      reason: data["2"],
    }
    console.log("Submitting:", to_submit);
    createAdminTransaction(to_submit);
    setSubmitting(false);
  }

  const structure = [
    {
      title: "Transaction Amount",
      fieldType: "NUMBER",
      required: true,
      _id: "0",
    },
    {
      title: "User",
      fieldType: "SWITCH",
      required: true,
      options: user_options,
      _id: "1",
    },
    {
      title: "Reason",
      fieldType: "TEXT_SHORT",
      required: true,
      _id: "2"
    },
  ]
  return (
    <Form
      structure={structure}
      handleSubmit={handleSubmit}
    />
  );
}

function CreateAdminTransactionCard() {
  return (
    <View style={styles.page_card}>
      <Text style={styles.body_text}>
        Create Arbitrary Admin Transaction:
      </Text>
      <CreateAdminTransactionForm/>
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

function AllTransactionsCard() {
  return (
    <View style={styles.page_card}>
      <Text style={styles.body_text}>
        All Transactions:
      </Text>
      <AllTransactionsTable/>
    </View>
  )
}

export function AdminPage() {
  return (
    <View style={styles.app_scrollview}>
      <View style={styles.page_card}>
        <Text style={styles.title_card_text}>
          <Text style={styles.title_text}>
            Admin Control Panel
          </Text>
        </Text>
      </View>
      <SubmissionQueueCard/>
      <CreateReferralUsageCard/>
      <CreateAdminTransactionCard/>
      <AllTransactionsCard/>
    </View>
  );
}

const styles = StyleSheet.create({
  ...card_styles,
  ...common_styles,
  ...page_styles,
  ...{
  },
});
