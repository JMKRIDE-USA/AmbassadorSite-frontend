import React from 'react';

import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

import { useLinkProps } from '@react-navigation/native';
import { Table, Row } from 'react-native-table-component';

import common_styles from '../../styles/commonStyle.js';

/*
 * Standard Table
 *  required: header, widthArr, rowDataInputs
 *
 * Standard Mode:
 *  provide rawDataRowFn
 *    rawDataRowFn
 *      - inputs -> 1 element from rowDataInput + row index
 *      - outputs -> array of data (strings) representing columns
 *
 * Manual Mode:
 *  provide manualRowFn
 *    manualRowFn
 *      - inputs -> 1 element from rowDataInput + row index
 *      - outputs -> TableWrapper of a column
 */
export function StandardTable({header, widthArr, rowDataInputs, manualRowFn, rawDataRowFn}){
  const standardRowFn = (rowDataFn, widthArr) => (rowDataInput, index) => {
    let rowData = rowDataFn(rowDataInput, index)
    return (
      <Row
        key={rowDataInput}
        data={rowData}
        widthArr={widthArr}
        style={[styles.row, index%2 && {backgroundColor: "#F7F6E7"}]}
        textStyle={styles.standardTableHeaderText}
      />
    );
  }

  let rowFn = manualRowFn ? manualRowFn : standardRowFn(rawDataRowFn, widthArr);

  return (
    <View style={styles.standardTableView}>
      <ScrollView horizontal={true}>
        <View>
          <Table borderStyle={{borderColor: "black", borderWidth: 2}}>
            <Row
              data={header}
              widthArr={widthArr}
              style={styles.standardTableHeader}
              textStyle={styles.standardTableHeaderText}
            />
          </Table>
          <ScrollView style={styles.standardDataScrollView}>
            <Table borderStyle={{borderColor: "black", borderWidth: 1}}>
              {rowDataInputs.map(rowFn)}
            </Table>
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
}

export function makeViewButtonFn(endpoint){
  return ({id, key})  => {
    const { onPress, ...props } = useLinkProps(
      {to: "/" + endpoint + "?id=" + id}
    )
    return (
      <TouchableOpacity
        key={key}
        onPress={onPress}
        style={[styles.item_button, {width: 70}]}
        {...props}
      >
        <Text styles={styles.item_button_text}>View</Text>
      </TouchableOpacity>
    )
  }
}

export const styles = StyleSheet.create({
  ...common_styles,
  ...{
    standardTableView: {
      backgroundColor: "white",
      paddingTop: "20px",
      padding: "5px",
    },
    standardTableBorder: {
      borderColor: "black",
      borderWidth: 1,
    },
    standardTableHeader: {
      minHeight: "40px",
      backgroundColor: "lightgray",
    },
    standardTableHeaderText: {
      margin: "6px",
      textAlign: "center",
    },
    standardTableDataText: {
      margin: "6px",
      textAlign: "center",
    },
    standardTableRow: {
      flexDirection: 'row',
    },
    standardTableCell: {
      justifyContent: 'center',
      alignItems: 'center',
    },
  }
});
