import React from 'react';

import { Button, Text, View, StyleSheet, CheckBox } from 'react-native';
import { Input } from 'react-native-elements';
import { Formik, Field, ErrorMessage } from 'formik';
import { Picker } from '@react-native-picker/picker';
import * as Yup from 'yup';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import config from '../../config.js';


const makeValidationFn = (fn) => (field) => {
  (field.title.length < 20) ? fn.label(field.title) : fn.label(field.name);
  if(field.required) return fn.required("This field is required.");
  return fn;
}
const stringValidationFn = makeValidationFn(Yup.string());
const emailValidationFn = makeValidationFn(Yup.string().email(
  "This must be a valid email."
));
const numberValidationFn = makeValidationFn(Yup.number());
const dateValidationFn = makeValidationFn(Yup.date());
const yesNoValidationFn = makeValidationFn(Yup.mixed().oneOf(['yes', 'no']));
const yearValidationFn = makeValidationFn(
  Yup.number().typeError('This must be a year.')
    .integer('This must be a year.')
    .min(1900, "You're not that old!")
    .max(new Date().getFullYear(), "I don't believe in time travel!")
);
const switchValidationFn = (field) => {
  let fn = Yup.mixed().oneOf(field.options);
  (field.title.length < 20) ? fn.label(field.title) : fn.label(field.name);
  if(field.required) return fn.required("This field is required.");
  return fn;
};
const dividerValidationFn = () => {};

const commonFieldProps = (field) => ({
  name: field._id,
  label: field.title,
  labelStyle: labelStyle,
  placeholder: field.placeholder ? field.placeholder : "",
})
  
const SwitchField = ({handleChange, value, handleBlur}, field) => {
  const SwitchComponent = (props) => {
    return (
    <View
      style={[styles.switch, {flexDirection: "row", justifyContent: "space-between"}]}
    >
      <Text style={styles.labelStyle}>{props.label}</Text>
      <Picker
        selectedValue={props.value}
        onChange={handleChange}
        onBlur={props.onBlur}
      >
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
const DividerField = () => (
  <View style={styles.divider}/>
);
    
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
      multiline={field.fieldType === 'TEXT_LONG'}
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

const DateField = makeDateField(false);
const DateTimeField = makeDateField(false);

const formTypes = {
  TEXT_SHORT: {
    componentFn: InputField,
    validationFn: stringValidationFn,
  },
  TEXT_MEDIUM: {
    componentFn: InputField,
    validationFn: stringValidationFn,
  },
  TEXT_LONG: {
    componentFn: InputField,
    validationFn: stringValidationFn,
  },
  EMAIL: {
    componentFn: EmailField,
    validationFn: emailValidationFn,
  },
  NUMBER: {
    componentFn: InputField,
    validationFn: numberValidationFn,
  },
  YEAR: {
    componentFn: InputField,
    validationFn: yearValidationFn,
  },
  DATE: {
    componentFn: DateField,
    validationFn: dateValidationFn,
  },
  DATETIME: {
    componentFn: DateTimeField,
    validationFn: dateValidationFn,
  },
  YES_NO: {
    componentFn: YesNoField,
    validationFn: yesNoValidationFn,
  },
  SWITCH: {
    componentFn: SwitchField,
    validationFn: switchValidationFn,
  },
  LEGAL_CHECK: {}, // TODO
  DIVIDER: {
    componentFn: DividerField,
    validationFn: dividerValidationFn,
  },

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
              color={"#00a0db"}
              style={{zIndex: -1}}
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
  TEXT_MEDIUM: [borderStyle, {width: "350px"}],
  TEXT_LONG: [borderStyle, {width: "350px", height: "100px"}],
  EMAIL: [borderStyle, {width: "350px"}],
  NUMBER: [borderStyle, {}],
  YEAR: [borderStyle, {width: "180px"}],
}
const dateStyle = {margin: "5px", marginLeft: '20px', zIndex: 5}
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
  switch: {
    margin: "5px", marginLeft: "20px", width: "350px", paddingBottom: "5px",
  },
  divider: {
    paddingTop: "30px",
    marginBottom: "30px",
    borderBottomWidth: "1px",
    borderColor: "1px",
  },
});
