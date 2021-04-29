import React from 'react';

import { Field } from 'formik';
import { Input } from 'react-native-elements';

import { labelStyle, stringStyles } from './styles.js';

export default ({handleChange, value, handleBlur}, field) =>
  (
    <Field
      name={field._id}
      component={Input}
      label={field.title}
      labelStyle={labelStyle}
      placeholder={field.placeholder ? field.placeholder : ""}
      style={stringStyles[field.fieldType]}
      onChangeText={handleChange}
      value={value}
      onBlur={handleBlur}
      secureTextEntry={true}
    />
  );
