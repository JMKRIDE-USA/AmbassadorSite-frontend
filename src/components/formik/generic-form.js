import React from 'react';

import { Button, Text, View, StyleSheet, CheckBox } from 'react-native';
import { Input } from 'react-native-elements';
import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import config from '../../config.js';


const makeValidationFn = (fn) => (field) => {
  (field.title.length < 20) ? fn.label(field.title) : fn.label(field.name);
  if(field.required) return fn.required("This field is required.");
  return fn
}
const stringValidationFn = makeValidationFn(Yup.string());
const emailValidationFn = makeValidationFn(Yup.string().email(
  "This must be a valid email."
));
const numberValidationFn = makeValidationFn(Yup.number());
const dateValidationFn = makeValidationFn(Yup.date());
const yesNoValidationFn = makeValidationFn(Yup.mixed().oneOf(['yes', 'no']));

const commonFieldProps = (field) => ({
  name: field._id,
  label: field.title,
  labelStyle: labelStyle,
  placeholder: field.placeholder ? field.placeholder : "",
})
  

const YesNoField = ({handleChange, value, handleBlur}, field) => {
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
              label={'Yes'}
              onChange={onChange('yes')}
              onClick={handleBlur}
            />
          </View>
          <View>
            <Text style={styles.labelStyle}>No</Text>
            <CheckBox
              value={props.value === 'no'}
              onChange={onChange('no')}
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

const InputField = ({handleChange, value, handleBlur}, field) =>
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
    />
  );
const EmailField = ({handleChange, value, handleBlur}, field) =>
  (
    <Field
      name={field._id}
      component={Input}
      label={field.title}
      labelStyle={labelStyle}
      type="email"
      placeholder={field.placeholder ? field.placeholder : ""}
      style={stringStyles[field.fieldType]}
      onChangeText={handleChange}
      value={value}
      onBlur={handleBlur}
    />
  );

const DateField = ({handleChange, value, handleBlur}, formField) => {
  const DateComponent = ({field}, ...props) => (
    <DatePicker selected={field.value} {...field} {...props}/>
  )
  return (
    <Field
      name={formField._id}
      component={DateComponent}
      label={formField.title}
      labelStyle={labelStyle}
      style={dateStyle}
      onChangeText={handleChange}
      value={value}
      onBlur={handleBlur}
    />
  )
}

const formTypes = {
  TEXT_SHORT: {
    componentFn: InputField,
    validationFn: stringValidationFn,
    initialValueFn: () => '',
  },
  TEXT_MEDIUM: {
    componentFn: InputField,
    validationFn: stringValidationFn,
    initialValueFn: () => '',
  },
  TEXT_LONG: {
    componentFn: InputField,
    validationFn: stringValidationFn,
    initialValueFn: () => '',
  },
  EMAIL: {
    componentFn: EmailField,
    validationFn: emailValidationFn,
    initialValueFn: () => '',
  },
  NUMBER: {
    componentFn: InputField,
    validationFn: numberValidationFn,
    initialValueFn: () => '',
  },
  DATE: {
    componentFn: DateField,
    validationFn: dateValidationFn,
    initialValueFn: () => new Date(),
  },
  YES_NO: {
    componentFn: YesNoField,
    validationFn: yesNoValidationFn,
    initialValueFn: () => '',
  },
  LEGAL_CHECK: {}, // TODO
}

const getValidationSchema = (structure) => {
  let shape = {}
  structure.map((field) =>
    shape[field._id] = formTypes[field.fieldType].validationFn(field)
  )
  return Yup.object().shape(shape);
}
const getInitialValues = (structure) => {
  let values = {}
  structure.map((field) => 
    values[field._id] = ''
  )
  return values;
}
const getField = ({handleChange, values, handleBlur}) => (field) => {
  return (
    <View style={styles.formField} key={field._id}>
      {formTypes[field.fieldType].componentFn(
        {
          handleChange: handleChange(field._id),
          value: values[field._id],
          handleBlur: handleBlur(field._id),
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

/*
 * Generic Form
 */
export function GenericForm({structure, handleSubmit}) {
  return (
    <View style={styles.formView}>
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
              {handleChange: handleChange, values:values, handleBlur: handleBlur}
            ))}
            <Button
              onPress={handleSubmit}
              title={"Submit"}
              disabled={!isValid || isSubmitting}
            />
          </View>
        )}
      </Formik>
    </View>
  );
}

const borderStyle = {borderWidth: 1, borderColor: "black"};
const stringStyles = {
  TEXT_SHORT: [borderStyle, {width: "350px"}],
  TEXT_MEDIUM: [borderStyle, {}],
  TEXT_LONG: [borderStyle, {}],
  EMAIL: [borderStyle, {width: "350px"}],
  NUMBER: [borderStyle, {}],
}
const dateStyle = {}
const yesNoStyle = {margin: "5px", marginLeft: '20px', width: "350px"}
const labelStyle = {
  color: "black", fontFamily: config.title_font, fontWeight: "bold", fontSize: "15px"
}
const styles = StyleSheet.create({
  formView: {padding: "15px", paddingTop: "30px", alignItems: "center"},
  formField: {},
  formStructureView: {},
  fieldLabel: {
    color: "black",
  },
  labelStyle: labelStyle,
  errorMessage: {
    color: "red"
  },
});
