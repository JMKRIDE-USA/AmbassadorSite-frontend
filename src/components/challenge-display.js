import React from 'react';

import { StyleSheet, View, Text, Button} from 'react-native';
import { useForm } from 'react-hook-form';

import {
  useGetChallenge,
  useGetSubmission,
  useSubmitChallenge,
  useGetSubmissionsAllowed,
} from '../modules/challenges/hooks.js';

import Form from './forms/form.js';
import validation from './forms/validation.js';
import TextInput from './forms/textinput.js';
import SwitchInput from './forms/switchinput.js';
import card_styles from '../pages/cardStyle.js';


function challengeField(field) {
  let all_props = {label: field.title, id: field._id, key: field._id}

  switch(field.fieldType){
    case "TEXT_SHORT":
      return <TextInput name="text" {...all_props} />
    case "TEXT_MEDIUM":
      return <TextInput name="text" {...all_props}/>
    case "TEXT_LONG":
      return <TextInput name="text" {...all_props}/>
    case "EMAIL":
      return <TextInput name="email" {...all_props}/>
    case "NUMBER":
      return <TextInput name="number" {...all_props}/>
    case "DATE":
      return <TextInput name="date" {...all_props}/>
    case "YES_NO":
      return <SwitchInput name="yesno" switchOptions={["Yes", "No"]} {...all_props}/>
    case "LEGAL_CHECK":
      return <></>
    default:
      return <></>
  }
}

function ChallengeForm({ fields, submitChallenge}) {
  const { handleSubmit, register, setValue, errors } = useForm();

  const onSubmit = (data) => {
    console.log('data:', data);
    submitChallenge(data);
  }
  if(fields === undefined) {
    return <></>;
  }
  return (
    <View style={styles.challenge_field_container}>
      <Form {... { register, setValue, validation, errors }}>
        {fields.map(challengeField)}
      </Form>
      <Button title="Submit" onPress={handleSubmit(onSubmit)} />
    </View>
  );
}

function ChallengeDisplayTitle({ challengeData }) {
  return (
    <View style={styles.page_card}>
      <Text style={styles.title_card_text}>
        <Text style={styles.title_text}>{challengeData.title}<br/></Text>
        <Text style={styles.sub_title_text}>
          {challengeData.shortDescription}
        </Text>
      </Text>
    </View>
  )
}

function ChallengeDisplay({ challengeData, submissionsAllowed, submitChallenge }) {
  return (
    <View style={styles.page_card}>
      <View style={submissionsAllowed ? {} : styles.disable_cover}>
        <Text style={styles.body_card_text}>
          <Text style={styles.body_text}>{challengeData.longDescription}</Text>
        </Text>
        <ChallengeForm
          enabled={submissionsAllowed}
          fields={challengeData.structure}
          submitChallenge={submitChallenge}
        />
      </View>
    </View>
  );
}

function SubmissionItem(submission) {
  return (
    <View style={styles.submission_item} key={submission._id}>
      <Text style={styles.body_text}>
        Content
      </Text>
    </View>
  );
}

function SubmissionList({ submissionData }) {
  console.log("SubmissionData:", submissionData);
  return (
    <View style={styles.page_card}>
      <Text style={styles.body_card_text}>
        <Text> Your Submission(s): </Text>
      </Text>
      { submissionData.map(SubmissionItem) }
    </View>
  );
}

/*
 * FullChallengeDisplay - Full page displaying a challenge
 *  <>
 *    [ submissions and their statuses ]
 *    <JustChallengeDisplay/>
 *  </>
 */
export function FullChallengeDisplay({ challengeId }) {

  const challengeQuery = useGetChallenge({challengeId: challengeId});
  const submissionQuery = useGetSubmission({challengeId: challengeId});
  const submissionsAllowedQuery = useGetSubmissionsAllowed({challengeId: challengeId});

  const submitChallenge = useSubmitChallenge(challengeId)

  let loading = [challengeQuery, submissionQuery, submissionsAllowedQuery].every(
    (query) => query.status === 'success'
  );

  if (loading) {
    return (
      <Text> Challenge loading... </Text>
    )
  }
  return (
    <>
      <ChallengeDisplayTitle
        challengeData={challengeQuery.data}
      />
      { (submissionQuery.data.length > 0 )
        ? <SubmissionList submissionData={submissionQuery.data}/>
        : <></>
      }
      <ChallengeDisplay
        challengeData={challengeQuery.data}
        submissionsAllowed={submissionsAllowedQuery.data}
        submitChallenge={submitChallenge}
      />
    </>
  )

}

const styles = StyleSheet.create({
  ...card_styles,
  disable_cover: {
    backgroundColor: "red",
    //backgroundColor: "rgba(52, 52, 52, 0.8)",
  },
  challenge_field_container: {
    padding: "16px",
  }
});
