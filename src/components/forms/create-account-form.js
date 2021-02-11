import React from 'react';
import PropTypes from 'prop-types';
import { Button, Text, View } from 'react-native';
import { Input } from 'react-native-elements';
import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';


const validationSchema = Yup.object().shape({
  fullname: Yup.string()
    .label('Full Name')
    .required("Full name is required."),
  email: Yup.string()
    .label('Email')
    .email('Enter a valid email')
    .required('Please enter a registered email.'),
  password: Yup.string()
    .label('Password')
    .required()
    .min(4, 'Password must have more than 4 characters.'),
  password_copy: Yup.string()
    .label('Confirm Password')
    .required(),
});

export default function CreateAccountForm({
  submitCreateAccount,
  styles,
}) {
  return (
    <View style={styles.formview}>
      <Formik
        initialValues={{
          fullname: '',
          email: '',
          password: '',
          password_copy: '',
        }}
        validationSchema={validationSchema}
        onSubmit={submitCreateAccount}
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
              placeholder="    Full name"
              leftIcon={{type: 'fontisto', name: 'person'}}
              onChangeText={handleChange('fullname')}
              value={values.username}
              onBlur={handleBlur("fullname")}
              style={styles.inputField}
            />
            <ErrorMessage name="fullname"
              render={(errorMessage) => (
                <Text style={styles.errorText}> {errorMessage} </Text>
              )}
            />
            <Field
              component={Input}
              placeholder="   Email"
              leftIcon={{ type: 'fontisto', name: 'email' }}
              onChangeText={handleChange('email')}
              value={values.email}
              onBlur={handleBlur("email")}
              style={styles.inputField}
            />
            <ErrorMessage name="email"
              render={(errorMessage) => (
                <Text style={styles.errorText}> {errorMessage} </Text>
              )}
            />
            <Field
              component={Input}
              placeholder="   Password"
              leftIcon={{ type: 'fontisto', name: 'locked' }}
              onChangeText={handleChange('password')}
              value={values.password}
              onBlur={handleBlur("password")}
              secureTextEntry={true}
            />
            <ErrorMessage name="password"
              render={(errorMessage) => (
                <Text style={styles.errorText}> {errorMessage} </Text>
              )}
            />
            <Field
              component={Input}
              placeholder="   Confirm Password"
              leftIcon={{ type: 'fontisto', name: 'locked' }}
              onChangeText={handleChange('password_copy')}
              value={values.password_copy}
              onBlur={handleBlur("password_copy")}
              secureTextEntry={true}
            />
            <ErrorMessage name="password_copy"
              render={(errorMessage) => (
                <Text style={styles.errorText}> {errorMessage} </Text>
              )}
            />
            <Button
              onPress={handleSubmit}
              title="Create Account" 
              disabled={!isValid || isSubmitting}
            />
          </View>
        )}
      </Formik>
    </View>
  );
}
CreateAccountForm.propTypes = {
  submitCreateAccount: PropTypes.func.isRequired,
  styles: PropTypes.object.isRequired,
};
