import React from 'react';

import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useLinkProps } from '@react-navigation/native';
import { useSelector } from 'react-redux';

import { useGetChallenge, useGetSubmissions } from '../modules/challenges/hooks.js';
import { ISOToReadableString } from '../modules/date.js';

import { selectUserInfo } from '../modules/users/userSlice.js';

import card_style from '../pages/cardStyle.js';
import common_styles from './commonStyle.js';

const statusColors = {
  'PENDING': "#ebd234", // yellow
  'APPROVED': "#34eb49", // green
  'DENIED': "#eb3434", // red
}

export function SubmissionItem({submission, index, view_button = true}) {
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


function SubmissionInfoDisplay({submissionId, submission, challenge}) {
  const userInfo = useSelector(selectUserInfo)
  return (
    <View style={[styles.page_card, {padding: "10px"}]}>
      <Text style={styles.title_card_text}>
        <Text style={styles.title_text}>Challenge Submission</Text>
      </Text>
      <View style={[styles.submission_info, {marginTop: "15px", marginBottom: "10px"}]}>
        <View style={styles.submission_info_item}>
          <Text style={styles.bold_body_text}>Submission ID:</Text>
          <Text style={styles.body_text}>{submissionId}<br/></Text>
        </View>
        <View style={styles.submission_info_item}>
          <Text style={styles.bold_body_text}>Author:</Text>
          <Text style={styles.body_text}>
            {userInfo.firstname + " " + userInfo.lastname}<br/>
          </Text>
        </View>
        <View style={styles.submission_info_item}>
          <Text style={styles.bold_body_text}>Challenge:</Text>
          <Text style={styles.body_text}>{"'" + challenge.title + "'"}<br/></Text>
        </View>
        <View style={styles.submission_info_item}>
          <Text style={styles.bold_body_text}>Submitted at:</Text>
          <Text style={styles.body_text}>
            {ISOToReadableString(submission.createdAt)}<br/>
           </Text>
        </View>
      </View>
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
    </View>
  );
}

const SubmissionContentItem = (challengeFields) => (item, index) => {
  let field = challengeFields[item.field.toString()]
  let itemStyle = [{marginTop: "5px"}]
  if(index > 0) {
    itemStyle.push({borderTopWidth: "1px"})
  }

  return (
    <View style={itemStyle} key={item._id}>
      <View style={styles.item_view}>
        <Text style={styles.bold_item_text}>Title:</Text>
        <Text style={styles.bold_item_text}>Response:</Text>
      </View>
      <View style={styles.item_view}>
        <Text style={styles.item_text}>{field.title}</Text>
        <Text style={styles.item_text}>{item.content}</Text>
      </View>
    </View>
  );
}


function SubmissionContentDisplay({submission, challenge}){
  const formatChallengeFields = (structure) => {
    let result = {}
    structure.forEach(item => 
      result[item._id.toString()] = {"title": item.title, "fieldType": item.fieldType}
    );
    return result;
  }

  const challengeFields = formatChallengeFields(challenge.structure)
  return (
    <View style={styles.page_card}>
      <View style={styles.title_card_text}>
        <Text style={styles.title_text}>Submitted Content:</Text>
      </View>
      <View style={styles.content_list}>
        {submission.content.map(SubmissionContentItem(challengeFields))}
      </View>
    </View>
  );
}

export function FullChallengeSubmissionDisplay({submissionId}) {
  let submissionQuery = useGetSubmissions({ submissionId: submissionId });
  let challengeQuery = useGetChallenge({ submissionId: submissionId });
  if (![submissionQuery, challengeQuery].every(query => query.status === "success")) {
    return (
      <Text>Loading Submissions... </Text>
    );
  }

  return (
    <>
      <SubmissionInfoDisplay
        submissionId={submissionId}
        submission={submissionQuery.data}
        challenge={challengeQuery.data}
      />
      <SubmissionContentDisplay
        submission={submissionQuery.data}
        challenge={challengeQuery.data}
      />
    </>
  );
}

export function SubmissionList() {
  return (
    <Text>SubmissionList</Text>
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
  },
  submission_info: {},
  submission_info_item: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
