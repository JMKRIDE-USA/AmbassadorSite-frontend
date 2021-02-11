import React from 'react';

import { Text, View } from 'react-native';
import { Field } from 'formik';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import { dateStyle, styles} from './styles.js';
import { commonFieldProps } from './constants.js';


const makeDateField = (includeTime) => 
  ({handleChange, value, handleBlur}, formField) => {
    const DateComponent = (props) => {
      return (
        <View style={[dateStyle,
          {
            alignItems: "center",
            justifyContent: "space-between",
          }]
        }>
          <Text style={[styles.labelStyle, {paddingRight: "10px"}]}>{props.label}</Text>
          <DatePicker
            selected={props.value ? Date.parse(props.value) : ''}
            onChange={(d) => handleChange(d.toISOString())}
            showTimeSelect={includeTime}
            dateFormat={includeTime ? "Pp" : "P"}
            onBlur={handleBlur}
            inline={true}
            fixedHeight={true}
          />
        </View>
      );
    }
    return (
      <Field
        name={formField._id}
        component={DateComponent}
        value={value}
        onBlur={handleBlur}
        {...commonFieldProps(formField)}
      />
    )
  }

export const DateField = makeDateField(false);
export const DateTimeField = makeDateField(true);

