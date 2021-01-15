import React from 'react';

import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useLinkProps } from '@react-navigation/native';

import { useGetChallenge, useGetSubmissions } from '../modules/challenges/hooks.js';
import { ISOToReadableString } from '../modules/date.js';

import card_style from '../pages/cardStyle.js';
import common_styles from './commonStyle.js';

const statusColors = {
  'PENDING': "#ebd234", // yellow
  'APPROVED': "#34eb49", // green
  'DENIED': "#eb3434", // red
}

export function SubmissionItem(submission, index, view_button = true) {
  let { onPress, ...props } = useLinkProps({to: "/challenge-submissions?id=" + submission._id})

  const statusStyle = (status) => ([
    styles.status_indicator_small,
    {backgroundColor: statusColors[status]},
  ]);

  const itemStyle = (index) => {
    let style = styles.item_view;
    if(index > 0) {
      style.borderTopWidth = "1px";
    }
    return style
  }

  return (
    <View style={itemStyle(index)} key={submission._id}>
      <View style={statusStyle(submission.status)}>
        <Text style={styles.item_text_small}>{submission.status}</Text>
      </View>
      <Text style={styles.item_text}>
        Submitted At: {ISOToReadableString(submission.createdAt)}
      </Text>
      {view_button ?
        <TouchableOpacity
          style={[styles.item_button, {width: 70}]}
          onPress={onPress}
          {...props}
        >
          <Text style={styles.item_button_text}>View</Text>
        </TouchableOpacity>
        : <></>
      }
    </View>
  );
}


export function FullChallengeSubmissionDisplay({submissionId}) {
  let submissionQuery = useGetSubmissions({ submissionId: submissionId });
  let challengeQuery = useGetChallenge({ submissionId: submissionId });
  console.log(submissionQuery)
  console.log(challengeQuery)
  if (![submissionQuery, challengeQuery].every(query => query.status === "success")) {
    return (
      <Text>Loading Submissions... </Text>
    );
  }
  let submission = submissionQuery.data;
  let challenge = challengeQuery.data;
  return (
    <View style={[styles.page_card, {padding: "10px"}]}>
      <Text style={styles.title_card_text}>
        <Text style={styles.title_text}>Challenge Submission:</Text>
      </Text>
      <View style={{flexDirection: "row", alignItems: "center", justifyContent: "center"}}>
        <Text style={[styles.body_text, {fontWeight: "bold"}]}>
          Status:
        </Text>
        <View 
          style={[
            styles.status_indicator_large,
            {backgroundColor: statusColors[submission.status]}
          ]}
        >
          <Text style={styles.body_text}>{submission.status}</Text>
        </View>
      </View>
      <Text style={styles.body_card_text}>
        <Text style={styles.bold_body_text}>
          {"Submission ID:  "}
          <Text style={styles.body_text}>{submissionId}<br/></Text>
          {"Challenge:   "}
          <Text style={styles.body_text}>{"'" + challenge.title + "'"}<br/></Text>
        </Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  ...card_style,
  ...common_styles,
  status_indicator_small: {
    height: "20px",
    width: "60px",
    justifyContent: "center",
    marginRight: "9px",
    alignItems: "center",
    borderRadius: "2px",
  },
  status_indicator_large: {
    height: "40px",
    minWidth: "80px",
    justifyContent: "center",
    margin: "9px",
    padding: "5px",
    alignItems: "center",
    borderRadius: "10px",
  },
  bold_body_text: {
    ...card_style.body_text,
    fontWeight: "bold",
  }
});
