import React from 'react';

import { Text, View, CheckBox } from 'react-native';
import { Field } from 'formik';

import { styles, yesNoStyle } from './styles.js';
import { commonFieldProps } from './constants.js';

export default ({handleChange, value, handleBlur}, field) => {
  const YesNoComponent = (props) => {
    const onChange = (checkbox) => (e) => {
      if(e.target.checked) {
        handleChange(checkbox)
      } else {
        handleChange('');
      }
    }
    return (
      <View style={
        [ yesNoStyle,
          {
            flexDirection: "row",
            alignItems: "flex-start",
            justifyContent: "space-between",
          }
        ]
      }>
        <View>
          <Text style={styles.labelStyle}>{props.label}</Text>
        </View>
        <View style={{flexDirection: "row"}}>
          <View style={{paddingRight: "10px"}}>
            <Text style={styles.labelStyle}>Yes</Text>
            <CheckBox
              value={props.value === 'yes'}
              onChange={onChange('yes')}
              onClick={handleBlur}
              color={"#00a0db"}
            />
          </View>
          <View>
            <Text style={styles.labelStyle}>No</Text>
            <CheckBox
              value={props.value === 'no'}
              onChange={onChange('no')}
              onClick={handleBlur}
              color={"#00a0db"}
            />
          </View>
        </View>
      </View>
    );
  }
  return (
    <Field
      name={field._id}
      component={YesNoComponent}
      label={field.title}
      value={value}
      onBlur={handleBlur}
      {...commonFieldProps(field)}
    />
  );
}

