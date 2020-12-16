import React from 'react';

import { StyleSheet, View, Text, Button} from 'react-native';
import { useForm } from 'react-hook-form';

import Form from './forms/form.js';
import validation from './forms/validation.js';
import TextInput from './forms/textinput.js';
import SwitchInput from './forms/switchinput.js';
import card_styles from '../pages/cardStyle.js';

function challengeField(field, key) {
  let all_props = {label: field.title, key: field._id}

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

function ChallengeFieldList({ fields }) {
  const { handleSubmit, register, setValue, errors } = useForm();

  const onSubmit = (data) => {
    console.log('data:', data);
  }
  if(fields === undefined) {
    return <></>;
  }
        //<Input name="name" label="Name "/>
  return (
    <View style={styles.challenge_field_container}>
      <Form {... { register, setValue, validation, errors }}>
        {fields.map(challengeField)}
      </Form>
      <Button title="Submit" onPress={handleSubmit(onSubmit)} />
    </View>
  );
};

export function ChallengeDisplay({ challengeData }) {
  if(challengeData === undefined || Object.keys(challengeData).length === 0) {
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
  challenge_field_container: {
    padding: "16px",
  }
});
