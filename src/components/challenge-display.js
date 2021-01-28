import React from 'react';

import { StyleSheet, View, Text, Button } from 'react-native';
import { useForm } from 'react-hook-form';

import {
  useGetChallenge,
  useGetSubmissions,
  useSubmitChallenge,
  useGetSubmissionsAllowed,
} from '../modules/challenges/hooks.js';

import { SubmissionItem } from './submission-display.js';

import Form from './forms/form.js';
import validation from './forms/validation.js';
import TextInput from './forms/textinput.js';
import SwitchInput from './forms/switchinput.js';
import card_styles from '../pages/cardStyle.js';
import common_styles from '../components/commonStyle.js';


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
      <View>
        { submissionsAllowed
          ? <></>
          : <View style={styles.disable_cover}>
              <Text style={styles.disable_text}>
                {"You've already submitted this challenge, and cannot submit another."}
              </Text>
            </View>
        }
        <View>
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
    </View>
  );
}

function SubmissionList({ submissionData }) {
  return (
    <View style={styles.list}>
      <Text style={styles.body_card_text}>
        <Text style={styles.title_text}> Your Submission(s): </Text>
      </Text>
      { submissionData.map(
        (submission, index) => (
          <SubmissionItem
            submission={submission}
            index={index}
            key={submission._id}
            showAuthor={false}
          />
        )) 
      }
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
  const submissionQuery = useGetSubmissions({challengeId: challengeId});
  const submissionsAllowedQuery = useGetSubmissionsAllowed({challengeId: challengeId});

  const submitChallenge = useSubmitChallenge(challengeId)

  let loading = ![challengeQuery, submissionQuery, submissionsAllowedQuery].every(
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
      { submissionQuery.data.length > 0
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
  ...common_styles,
  status_text: {
    fontSize: "10px",
  },
  submission_item_text: {
    fontSize: "15px",
  },
  disable_cover: {
    backgroundColor: "rgba(52, 52, 52, 0.8)",
    borderRadius: "4px",
    padding: "10px",
    alignItems: "center",
    justifyContent: "center",
    flex: -1,
    height: "100%",
    width: "100%",
    position: "absolute",
    zIndex: 5,
  },
  disable_text: {
    fontSize: "30px",
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  challenge_field_container: {
    padding: "16px",
  }
});
