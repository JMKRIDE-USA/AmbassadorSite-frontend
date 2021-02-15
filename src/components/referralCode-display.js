import React from 'react';

import { Button, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
 
import { Input } from 'react-native-elements';
import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import card_styles from '../styles/cardStyle.js';
import common_styles from '../styles/commonStyle.js';

import { selectIsAdmin } from '../modules/auth/authSlice.js';
import { useLinkProps } from '@react-navigation/native';

import { useGetReferralCode } from '../modules/transactions/hooks.js';
import { ReferralCodeTransactionsTable  } from '../components/tables/transactions.js';


export function FullReferralCodeDisplay({referralCodeId}){
  const referralCodeQuery = useGetReferralCode({referralCodeId: referralCodeId});
  if(referralCodeQuery.status !== 'success') {
    return (
      <Text>Referral Code Loading...</Text>
    )
  }
  return (
    <>
      <ReferralCodeInfoDisplay referralCode={referralCodeQuery.data[0]}/>
      <View style={styles.page_card}>
        <Text style={styles.title_text}>
          All Uses:
        </Text>
        <ReferralCodeTransactionsTable referralCodeId={referralCodeId}/>
      </View>
    </>
  );
}

function ReferralCodeInfoDisplay({referralCode}){
  const { onPress } = useLinkProps(
    {to: "/users?id=" + referralCode.owner._id}
  )
  const rowStyle = {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  }
  const isAdmin = useSelector(selectIsAdmin);
  
  return (
    <View style={styles.page_card}>
      <Text style={styles.title_text}>
        {"Referral Code: '" + referralCode.code + "'"}
      </Text>
      <View style={rowStyle}>
        <Text style={styles.bold_body_text}>
          ID:
        </Text>
        <Text style={styles.body_text}>
          {referralCode._id.toString()}
        </Text>
      </View>
      { isAdmin ? 
        <View style={rowStyle}>
          <Text style={styles.bold_body_text}>
            Owner:
          </Text>
          <View style={{flexDirection: "row", alignItems: "center"}}>
            <Text style={[styles.body_text, {marginRight: 10}]}>
              {referralCode.owner.firstName + " " + referralCode.owner.lastName}
            </Text>
            <TouchableOpacity
              onPress={onPress}
              style={[styles.item_button, {width: 70}]}
            >
              <Text style={styles.button_text}>View</Text>
            </TouchableOpacity>
          </View>
        </View>
        : <></>
      }
      <View style={rowStyle}>
        <Text style={styles.bold_body_text}>
          Num uses:
        </Text>
        <Text style={styles.body_text}>
          {referralCode.usageCount}
        </Text>
      </View>
      <View style={rowStyle}>
        <Text style={styles.bold_body_text}>
          Percent Reward:
        </Text>
        <Text style={styles.body_text}>
          {referralCode.percent + "%"}
        </Text>
      </View>
    </View>
  );
}

export function SingleReferralCodeDisplay({referralCode, row = false}){
  const rowStyle = {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  }
  const { onPress } = useLinkProps(
    {to: "/referralcodes?id=" + referralCode._id}
  );

  return (
    <View style={row ? {flexDirection: "row"} : {}}>
      <View style={rowStyle}>
        <Text style={styles.bold_body_text}>
          {row ? "My Referral Code: ": "Code: "}
        </Text>
        <View style={rowStyle}>
          <Text style={[{paddingRight: "10px"}, styles.body_text]}>
            {"'" + referralCode.code + "'"}
          </Text>
          <TouchableOpacity
            onPress={onPress}
            style={[styles.item_button, {width: 70}]}
          >
            <Text styles={styles.button_text}>View</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={rowStyle}>
        <Text style={styles.bold_body_text}>
          {"Uses: "}
        </Text>
        <Text style={[{paddingRight: "10px"}, styles.body_text]}>
          {referralCode.usageCount}
        </Text>
      </View>
      <View style={rowStyle}>
        <Text style={styles.bold_body_text}>
          {"Percent Reward: "}
        </Text>
        <Text style={styles.body_text}>
          {referralCode.percent}%
        </Text>
      </View>
    </View>
  );
}

const creationValidationSchema = Yup.object().shape({
  code: Yup.string().label('Code').required(),
  percent: Yup.number().label('Percent').required().positive().integer(),
});

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
