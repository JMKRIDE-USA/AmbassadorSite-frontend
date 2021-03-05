import config from '../../config.js';

import { StyleSheet } from 'react-native';


export const borderStyle = {borderWidth: 1, borderColor: "black"};
export const stringStyles = {
  TEXT_SHORT: [borderStyle, {width: "350px"}],
  TEXT_MEDIUM: [borderStyle, {width: "350px"}],
  TEXT_LONG: [borderStyle, {width: "350px", height: "100px"}],
  EMAIL: [borderStyle, {width: "350px"}],
  NUMBER: [borderStyle, {}],
  YEAR: [borderStyle, {width: "180px"}],
  URL: [borderStyle, {width: "180px"}],
}
export const dateStyle = {margin: "5px", marginLeft: '20px', zIndex: 5}
export const yesNoStyle = {margin: "5px", marginLeft: '20px', width: "350px"}
export const labelStyle = {
  color: "black", fontFamily: config.title_font, fontWeight: "bold", fontSize: "15px"
}
export const styles = StyleSheet.create({
  formView: {padding: "15px", paddingTop: "30px", alignItems: "center"},
  formField: {},
  formStructureView: {padding: "15px"},
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
  buttonStyle: {
    paddingLeft: 10,
    paddingRight: 10,
  }
});
