import * as Yup from 'yup';
import { formTypes } from './constants.js';

const makeValidationFn = (fn) => (field) => {
  (field.title.length < 20) ? fn.label(field.title) : fn.label(field.name);
  if(field.required) return fn.required("This field is required.");
  return fn;
}
export const stringValidationFn = makeValidationFn(Yup.string());
export const emailValidationFn = makeValidationFn(Yup.string().email(
  "This must be a valid email."
));
export const numberValidationFn = makeValidationFn(Yup.number().typeError('This must be a number.'));
export const dateValidationFn = makeValidationFn(Yup.date());
export const yesNoValidationFn = makeValidationFn(Yup.mixed().oneOf(['yes', 'no']));
export const yearValidationFn = makeValidationFn(
  Yup.number().typeError('This must be a year.')
    .integer('This must be a year.')
    .min(1900, "You're not that old!")
    .max(new Date().getFullYear(), "I don't believe in time travel!")
);
export const switchValidationFn = (field) => {
  let fn = Yup.mixed().oneOf(field.options);
  (field.title.length < 20) ? fn.label(field.title) : fn.label(field.name);
  if(field.required) return fn.required("This field is required.");
  return fn;
};
export const urlValidationFn = makeValidationFn(
  Yup.string().url().typeError('This must be a valid URL.')
);
export const dividerValidationFn = () => {};

export const getValidationSchema = (structure) => {
  let shape = {}
  structure.map((field) =>
    shape[field._id] = formTypes[field.fieldType].validationFn(field)
  )
  return Yup.object().shape(shape);
}
