import React, { useState } from 'react';

import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { useLinkProps } from '@react-navigation/native';
import { useSelector } from 'react-redux';

import {
  useGetChallenge,
  useGetSubmissions,
  useDeleteSubmission,
  useUpdateSubmission,
} from '../modules/challenges/hooks.js';
import { ISOToReadableString } from '../modules/date.js';

import { selectIsAdmin, selectUserId } from '../modules/auth/authSlice.js';

import card_style from '../pages/cardStyle.js';
import common_styles from './commonStyle.js';

export const statusColors = {
  'PENDING': "#ebd234", // yellow
  'APPROVED': "#34eb49", // green
  'DENIED': "#eb3434", // red
}

export function SubmissionItem(
  {
    submission,
    index,
    view_button = true,
    admin = false,
    showAuthor = true,
    showChallenge = false,
  }) {
  let { onPress, ...props } = useLinkProps(
    {to: "/challenge-submissions?id=" + submission._id}
  )

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

  const submittedAt = admin ? " " : " Submitted At: " ;

  return (
    <View style={itemStyle(index)} key={submission._id}>
      <View style={statusStyle(submission.status)}>
        <Text style={styles.item_text_small}>{submission.status}</Text>
      </View>
      { showAuthor
        ? <Text style={styles.item_text}>
            {submission.author.firstName} {submission.author.lastName + " "} 
          </Text>
        : <></>
      }
      { showChallenge
        ? <Text style={styles.item_text}>
            {submission.challenge.title}
          </Text>
        : <></>
      }
      <Text style={styles.item_text}>
        {submittedAt} {ISOToReadableString(submission.createdAt)}
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


function SubmissionInfoDisplay({submissionId, submission, challenge, admin }) {

  let { onPress, ...props } = useLinkProps(
    {to: "/user?id=" + submission.author._id}
  )
  let onViewChallenge = useLinkProps(
    {to: "/challenges?id=" + challenge._id}
  ).onPress;

  return (
    <View style={[styles.page_card, {padding: "10px"}]}>
      <Text style={styles.title_card_text}>
        <Text style={styles.title_text}>Challenge Submission</Text>
      </Text>
      <View style={styles.info_list}>
        <View style={styles.info_item}>
          <Text style={styles.bold_body_text}>Submission ID:</Text>
          <Text style={styles.body_text}>{submissionId}<br/></Text>
        </View>
        <View style={styles.info_item}>
          <Text style={styles.bold_body_text}>Author:</Text>
          <View style={{flexDirection: "row", alignItems: "center", justifyContent: "center"}}>
            <Text style={styles.body_text}>
              {submission.author.firstName + " " + submission.author.lastName}<br/>
            </Text>
            { admin ?
              <TouchableOpacity
                style={[styles.item_button, {width: 70, marginBottom: "0px", marginTop: "0px"}]}
                onPress={onPress}
                {...props}
              >
                <Text style={styles.item_button_text}>View</Text>
              </TouchableOpacity>
              : <></>
            }
          </View>
        </View>
        <View style={styles.info_item}>
          <Text style={styles.bold_body_text}>Challenge:</Text>
          <View style={[styles.info_item_column, {paddingLeft: "10px"}]}>
            <Text style={styles.body_text}>{"'" + challenge.title + "'"}<br/></Text>
            <TouchableOpacity
              style={[styles.item_button, {width: 70, marginBottom: "0px", marginTop: "0px"}]}
              onPress={onViewChallenge}
            >
              <Text style={styles.item_button_text}>View</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.info_item}>
          <Text style={styles.bold_body_text}>Submitted at:</Text>
          <Text style={styles.body_text}>
            {ISOToReadableString(submission.createdAt)}<br/>
           </Text>
        </View>
      </View>
      <View style={styles.info_item}>
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

function SubmissionOperationButtons({submissionId, admin, isOwner, isPending}) {

  const deleteSubmission = useDeleteSubmission(submissionId);
  const updateSubmission = useUpdateSubmission(submissionId);

  const [noteState, setNoteState] = useState("");
  const [confirmation, setConfirmation] = useState("");
  
  function doFnAfterConfirm(clickedStateKey, fn, ...args) {
    return () => {
      if(confirmation === clickedStateKey) {
        fn(...args);
      } else {
        setConfirmation(clickedStateKey);
      }
    }
  }

  const onDeleteSubmission = doFnAfterConfirm(
    "delete",
    deleteSubmission,
  );
  const onApproveSubmission = doFnAfterConfirm(
    "approve",
    updateSubmission,
    {
      status: "APPROVED",
      note: noteState,
    }
  );
  const onDenySubmission = doFnAfterConfirm(
    "deny",
    updateSubmission,
    {
      status: "DENIED",
      note: noteState,
    }
  );

  const AdminButtons = () =>
    (
      <>
        <View style={{flexDirection: "row"}}>
          <TouchableOpacity
            style={[
              styles.standalone_button,
              {backgroundColor: "green", marginRight: "15px"}
            ]}
            onPress={onApproveSubmission}
          >
            <Text style={styles.standalone_button_text}>
              {confirmation === "approve" 
                ? "Confirm Approve Submission?" 
                : "Approve Submission"}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.standalone_button, {backgroundColor: "red"}]}
            onPress={onDenySubmission}
          >
            <Text style={styles.standalone_button_text}>
              {confirmation === "deny" 
                ? "Confirm Reject Submission?" 
                : "Reject Submission"}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{padding: "15px"}}>
          {/* TODO Component-ify this crap cuz it keeps re-mounting on every
            keystroke*/}
          <TextInput
            style={styles.note_textinput}
            placeholder={"  Note"}
            onChangeText={setNoteState}
            value={noteState}
          />
        </View>
      </>
    )

  const OwnerButtons = () => (
    <TouchableOpacity
      style={[styles.standalone_button, {backgroundColor: "red"}]}
      onPress={onDeleteSubmission}
    >
      <Text style={styles.standalone_button_text}>
        {confirmation === "delete" ? "Really Delete Submission?" : "Delete Submission"}
      </Text>
    </TouchableOpacity>
  )

  return (
    <>
      {isPending && isOwner ? <OwnerButtons/> : <></>}
      {isPending && admin ? <AdminButtons/> : <></>}
    </>
  );
}

export function FullChallengeSubmissionDisplay({submissionId}) {
  let admin = useSelector(selectIsAdmin);
  let userId = useSelector(selectUserId);

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
        admin={admin}
      />
      <SubmissionContentDisplay
        submission={submissionQuery.data}
        challenge={challengeQuery.data}
        admin={admin}
      />
      <SubmissionOperationButtons
        submissionId={submissionId}
        isPending={submissionQuery.data.status === 'PENDING'}
        admin={admin}
        isOwner={submissionQuery.data.author._id.toString() === userId}
    />
    </>
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
    marginTop: "0px",
    marginBottom: "0px",
    padding: "5px",
    borderRadius: "10px",
  },
  note_textinput: {
    height: "40px",
    minWidth: "160px",
    borderColor: "gray",
    borderWidth: 2,
    backgroundColor: "white",
    padding: "5px",
  },
});
