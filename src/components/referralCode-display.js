import React from 'react';

import { Button, StyleSheet, View, Text } from 'react-native';
 
import card_styles from '../pages/cardStyle.js';
import common_styles from '../components/commonStyle.js';

import { Input } from 'react-native-elements';
import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const creationValidationSchema = Yup.object().shape({
  code: Yup.string().label('Code').required(),
  percent: Yup.number().label('Percent').required().positive().integer(),
});


export function SingleReferralCodeDisplay({referralCode}){
  return (
    <View>
      <Text style={styles.body_text}>
        Code: {"'" + referralCode.code + "'"}
      </Text>
      <Text style={styles.body_text}>
        Uses: {referralCode.usageCount}
      </Text>
      <Text style={styles.body_text}>
        Percent Reward: {referralCode.percent}%
      </Text>
    </View>
  );
}

export function CreateReferralCodeForm({submitCreateReferralCode}){
  return (
    <View style={styles.formview}>
      <Formik
        initialValues={{
          code: '',
          percent: '',
        }}
        validationSchema={creationValidationSchema}
        onSubmit={submitCreateReferralCode}
      >
        {({ 
          handleChange,
          handleSubmit,
          values,
          isValid,
          isSubmitting,
          handleBlur,
        }) => (
          <View style={styles.loginForm}>
            <Field
              component={ Input }
              placeholder="    Code"
              onChangeText={handleChange('code')}
              value={values.code}
              onBlur={handleBlur("code")}
              style={styles.inputField}
            />
            <ErrorMessage name="code"
              render={(errorMessage) => (
                <Text style={styles.errorText}> {errorMessage} </Text>
              )}
            />
            <Field
              component={Input}
              placeholder="   Percent"
              onChangeText={handleChange('percent')}
              value={values.percent}
              onBlur={handleBlur("percent")}
            />
            <ErrorMessage name="percent"
              render={(errorMessage) => (
                <Text style={styles.errorText}> {errorMessage} </Text>
              )}
            />
            <Button
              onPress={handleSubmit}
              title="Create Referral Code" 
              disabled={!isValid || isSubmitting}
            />
          </View>
        )}
      </Formik>
    </View>
  );
}


const styles = StyleSheet.create({
  ...card_styles,
  ...common_styles,
  ...{
    formview: {margin: "15px", borderWidth: 4, borderColor: "black"},
    inputField: {},
    errorText: {
      color: "red",
    },
  },
});
