import React from 'react';

import { StyleSheet, View, Text, Button, TouchableOpacity } from 'react-native';
import { useForm } from 'react-hook-form';
import { useLinkProps } from '@react-navigation/native';

import {
  useGetChallenge,
  useGetSubmissions,
  useSubmitChallenge,
  useGetSubmissionsAllowed,
} from '../modules/challenges/hooks.js';

import { SubmissionItem } from './submission-display.js';

import { GenericForm } from './formik/generic-form.js';
import card_styles from '../pages/cardStyle.js';
import common_styles from '../components/commonStyle.js';


function NewChallengeForm({ fields, submitChallenge}) {
  const handleSubmit = (data, { setSubmitting }) => {
    console.log("Submitting:", data);
    submitChallenge(data);
    setSubmitting(false);
  }
  return (
    <GenericForm
      structure={fields}
      handleSubmit={handleSubmit}
    />
  )
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

function ChallengeInfoDisplay({ challengeData }) {
  return (
    <View style={styles.page_card}>
      <View style={{paddingBottom: "10px"}}>
        <Text style={styles.bold_body_text}>
          Description:
        </Text>
        <Text style={styles.body_card_text}>
          <Text style={styles.body_text}>{challengeData.longDescription}</Text>
        </Text>
      </View>
      <View style={{flexDirection: "row"}}>
        <Text style={styles.bold_body_text}>
          {"Reward Points:   "}
        </Text>
        <Text style={styles.body_card_text}>
          <Text style={styles.body_text}>{challengeData.award}</Text>
        </Text>
      </View>
    </View>
  )
}

function ChallengeDisplay({ challengeData, submissionsAllowed, submitChallenge }) {
  return (
    <View style={styles.page_card}>
      { submissionsAllowed
        ? <></>
        : <View style={styles.disable_cover}>
            <Text style={styles.disable_text}>
              {"You've already submitted this challenge, and cannot submit another."}
            </Text>
          </View>
      }
      <Text style={styles.bold_body_text}>Submission Form:</Text>
      <NewChallengeForm
        enabled={submissionsAllowed}
        fields={challengeData.structure}
        submitChallenge={submitChallenge}
      />
    </View>
  );
}

export function SingleChallengeDisplay({ challenge }) {
  const { onPress } = useLinkProps(
    {to: "/challenges?id=" + challenge._id}
  );
  return (
    <View style={styles.page_card}>
      <View style={{
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "space-between",
        width: "100%"}}
      >
        <Text style={styles.title_text}>{challenge.title}</Text>
        <TouchableOpacity
          onPress={onPress}
          style={[styles.item_button, {width: 70}]}
        >
          <Text style={styles.button_text}>View</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.body_text}>{challenge.shortDescription}</Text>
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
  //const submitChallenge = (data) => console.log(data)

  let loading = ![challengeQuery, submissionQuery, submissionsAllowedQuery].every(
    (query) => query.status === 'success'
  );

  if (loading) {
    return (
      <Text> Challenge loading... </Text>
    )
  }
  return (
    <View style={styles.page}>
      <ChallengeDisplayTitle
        challengeData={challengeQuery.data}
      />
      { submissionQuery.data.length > 0
        ? <SubmissionList submissionData={submissionQuery.data}/>
        : <></>
      }
      <ChallengeInfoDisplay
        challengeData={challengeQuery.data}
      />
      <ChallengeDisplay
        challengeData={challengeQuery.data}
        submissionsAllowed={submissionsAllowedQuery.data}
        submitChallenge={submitChallenge}
      />
    </View>
  )

}

const styles = StyleSheet.create({
  ...card_styles,
  ...common_styles,
  page: {
    maxWidth: "800px",
    alignItems: "center",
  },
  status_text: {
    fontSize: "10px",
  },
  submission_item_text: {
    fontSize: "15px",
  },
  disable_cover: {
    backgroundColor: "rgba(52, 52, 52, 0.8)",
    borderRadius: "15px",
    right: "0px",
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
