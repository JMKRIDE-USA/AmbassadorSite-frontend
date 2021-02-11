import { labelStyle } from './styles.js';

import {
  stringValidationFn,
  emailValidationFn,
  numberValidationFn,
  dateValidationFn,
  yearValidationFn,
  yesNoValidationFn,
  switchValidationFn,
  urlValidationFn,
  dividerValidationFn,
} from './validators.js';

import InputField from './input-field.js';
import SwitchField from './switch-field.js';
import DividerField from './divider-field.js';
import YesNoField from './yesno-field.js';
import EmailField  from './email-field.js';
import { DateField, DateTimeField } from './date-fields.js';


export const fieldTypes = [
  "TEXT_SHORT", "TEXT_MEDIUM", "TEXT_LONG",
  "EMAIL",
  "URL",
  "NUMBER",
  "YES_NO",
  "SWITCH",
  "DATE",
  "DATETIME",
  "YEAR",
]

export const commonFieldProps = (field) => ({
  name: field._id,
  label: field.title,
  labelStyle: labelStyle,
  placeholder: field.placeholder ? field.placeholder : "",
})
  
export const formTypes = {
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
  URL: {
    componentFn: InputField,
    validationFn: urlValidationFn,
  },
  LEGAL_CHECK: {}, // TODO
  DIVIDER: {
    componentFn: DividerField,
    validationFn: dividerValidationFn,
  },

}
