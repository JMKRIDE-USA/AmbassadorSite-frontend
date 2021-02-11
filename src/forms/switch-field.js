import React, { useState } from 'react';

import { Text, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Field } from 'formik';

import { commonFieldProps } from './constants.js';
import { styles } from './styles.js';


export default ({handleChange, value, handleBlur}, field) => {
  let [hasSelected, setHasSelected] = useState(false);
  const onChange = (...args) => {
    setHasSelected(true);
    return handleChange(...args);
  }
  const SwitchComponent = (props) => {
    return (
      <View
        style={[styles.switch, {flexDirection: "row", justifyContent: "space-between"}]}
      >
        <Text style={styles.labelStyle}>{props.label}</Text>
        <Picker
          selectedValue={props.value}
          onChange={onChange}
          onBlur={props.onBlur}
        >
          { (!hasSelected) ? <Picker.Item label={'Select'} value={''} /> : <></>}
          {field.options.map((option) => (
            <Picker.Item label={option} value={option} key={option}/>)
          )}
        </Picker>
      </View>
    );
  }
  return (
    <Field
      name={field._id}
      component={SwitchComponent}
      label={field.title}
      value={value}
      onBlur={handleBlur}
      {...commonFieldProps(field)}
    />
  );
}
