import React from 'react';

import { Button, Text, View } from 'react-native';
import { Formik, ErrorMessage } from 'formik';

import { formTypes } from './constants.js';
import { getValidationSchema } from './validators.js';
import { styles } from './styles.js';

/*
 * Form
 *
 *  A Form takes...
 *    ({structure, handleSubmit, debug, keyOverride}) => <Form... />
 *       ^            ^                   ^- to safely re-render when structure
 *       |            |                      is changed
 *       |            + Function called with (data, {setSubmitting)
 *       |              where data is {<field-id>: <content>, ...}
 *       + challenge structure as specified in Backend challenges/model.js
 *
 *  A Form takes a challenge structure and produces a list of fields in a form
 *   - Each field is...
 *
 *    ({handleChange, value, handleBlur, debug}, formField) => <Field .../>
 *      ^              ^      ^                   ^- the field in structure (see
 *      |              |      |                      backend challenges/model.js)
 *      |              |      + prop to be added to Field
 *      |              + the current value of the field (default: '')
 *      + function which handles the onChange event (must be an event)
 */
export default function Form ({structure, handleSubmit, debug = false, keyOverride = 1}) {
  return (
    <View style={styles.formView} key={keyOverride ? keyOverride : 1}>
      <Formik
        initialValues={getInitialValues(structure)}
        validationSchema={getValidationSchema(structure)}
        onSubmit={handleSubmit}
      >
        {({
          handleChange,
          handleSubmit,
          values,
          isValid,
          isSubmitting,
          handleBlur,
        }) => (
          <View style={styles.formStructureView}>
            {structure.map(getField(
              {handleChange: handleChange, values:values, handleBlur: handleBlur},
              {debug: debug}
            ))}
            <View style={styles.buttonStyle}>
              <Button
                onPress={handleSubmit}
                title={"Submit"}
                disabled={!isValid || isSubmitting}
                color={"#00a0db"}
                style={{zIndex: -1}}
              />
            </View>
          </View>
        )}
      </Formik>
    </View>
  );
}

const getInitialValues = (structure) => {
  let values = {}
  structure.map((field) => 
    values[field._id] = ''
  )
  return values;
}

const getField = ({handleChange, values, handleBlur}, {debug}) => (field) => {
  return (
    <View style={styles.formField} key={field._id}>
      {formTypes[field.fieldType].componentFn(
        {
          handleChange: handleChange(field._id),
          value: values[field._id],
          handleBlur: handleBlur(field._id),
          debug: debug,
        },
        field
      )}
      <ErrorMessage
        name={field._id}
        render={(errorMessage) => (
          <Text style={styles.errorMessage}> {errorMessage} </Text>
        )}
      />
    </View>
  )
}

