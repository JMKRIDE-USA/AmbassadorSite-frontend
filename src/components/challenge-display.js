import React from 'react';

import { StyleSheet, View, Text } from 'react-native';

import card_styles from '../pages/cardStyle.js';

function ChallengeField(field) {
  return ( <></>);
    switch(field.fieldType){
      case "TEXT_SHORT": {
      }
      case "TEXT_MEDIUM": {
      }
      case "TEXT_LONG": {
      }
      case "NUMBER": {
      }
      case "DATE": {
      }
      case "SWITCH": {
      }
      case "LEGAL_CHECK": {
      }
    }
  //);
}

function ChallengeFieldList({ fields }) {
  if(fields === undefined) {
    return <></>;
  }
  return (
    <View style={styles.challenge_field_list}>
      {fields.map(ChallengeField)}
    </View>
  );
};

export function ChallengeDisplay({ challengeData }) {
  if(challengeData === undefined) {
    return <></>;
  } else {
    console.log(challengeData);
    return (
      <View style={styles.page_card}>
        <Text style={styles.card_text}>
          <Text style={styles.title_text}>{challengeData.title}<br/></Text>
          <Text style={styles.sub_title_text}>
            {challengeData.shortDescription}<br/><br/>
          </Text>
          <Text style={styles.body_text}>{challengeData.longDescription}</Text>
        </Text>
        <ChallengeFieldList fields={challengeData.structure}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  ...card_styles,
});
