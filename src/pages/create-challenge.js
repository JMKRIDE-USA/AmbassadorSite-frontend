import React, { useState } from 'react';

import { View, Text, StyleSheet } from 'react-native';

import { page_styles } from '../pages.js';
import card_styles from './cardStyle.js';
import common_styles from '../components/commonStyle.js';

import { Picker } from '@react-native-picker/picker';
import Form from '../forms/form.js';
import { fieldTypes } from '../forms/constants.js';
import { useCreateChallenge } from '../modules/challenges/hooks.js';


let createChallengeBaseInfoForm = [
  {title: "Challenge Title", fieldType: "TEXT_SHORT", required: true, _id: "1"},
  {title: "Short Description", fieldType: "TEXT_MEDIUM", required: true, _id: "2"},
  {title: "Long Description", fieldType: "TEXT_LONG", required: true, _id: "3"},
  {title: "Award", fieldType: "NUMBER", required: true, _id: "4"},
  {title: "Allow multiple submissions per user?",
    fieldType: "YES_NO", required: true, _id: "5"
  },
]


const makeField = (index) => ([
  {title: "", fieldType: "DIVIDER", _id: index + "_0"},
  {
    title: "Field Title",
    fieldType: "TEXT_SHORT",
    required: true,
    _id: index + "_1",
  },
  {
    title: "Field Type",
    fieldType: "SWITCH",
    required: true,
    options: fieldTypes,
    _id: index + "_2",
  },
  {
    title: "Required?",
    fieldType: "YES_NO",
    required: true,
    _id: index + "_3",
  },
])


export function CreateChallengePage() {
  const createChallenge = useCreateChallenge();
  const handleSubmit = (results, {setSubmitting}) => {
    let to_submit = {
      title: results["1"],
      shortDescription: results["2"],
      longDescription: results["3"],
      award: results["4"],
      allowMultipleSubmissions: results["5"] === "yes",
    }
    let result_structure = []
    let j;
    for (j = 0; j < numFields; j++) {
      result_structure.push({
        title: results[j+"_1"],
        fieldType: results[j+"_2"],
        required: results[j+"_3"] === "yes",
      })
    }
    to_submit.structure = result_structure;
    createChallenge(to_submit);
    setSubmitting(false);
  }

  let [numFields, setNumFields] = useState(1);

  const NumFieldsSelector = () => (
    <Picker
      selectedValue={numFields}
      onValueChange={setNumFields}
    >
      {[...Array(26).keys()].map(i => (
        <Picker.Item label={i} value={i} key={i}/>
      ))}
    </Picker>
  );

  let structureFields = [];
  let i;
  for (i = 0; i < numFields; i++) {
    structureFields = structureFields.concat(makeField(i))
  }
  let structure = createChallengeBaseInfoForm.concat(structureFields);
  return (
    <View style={page_styles.app_scrollview}>
      <View style={styles.page_card}>
        <View style={{flexDirection: "row", alignItems: "space-between"}}>
          <Text style={styles.title_text}>Create New Challenge:</Text>
          <View style={{paddingLeft: "20px"}}>
            <Text style={styles.body_text}>Number of Fields</Text>
            <NumFieldsSelector/>
          </View>
        </View>
        <Form
          structure={structure}
          handleSubmit={handleSubmit}
          keyOverride={numFields}
         />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  ...card_styles,
  ...common_styles,
  ...{
  }
});
