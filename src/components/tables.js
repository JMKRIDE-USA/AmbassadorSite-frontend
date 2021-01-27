import React from 'react';

import { View, Text, StyleSheet, ScrollView } from 'react-native';

import { Table, TableWrapper, Row, Cell } from 'react-native-table-component';

import { useGetSubmissions } from '../modules/challenges/hooks.js';
import { ISOToReadableString } from '../modules/date.js';

const standardRowFn = (rowDataFn, widthArr) => (rowDataInput, index) => {
  let rowData = rowDataFn(
    ...(Array.isArray(rowDataInput) ? rowDataInput : [rowDataInput]), index
  )
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

export function StandardTable({header, widthArr, rowDataFn, rowDataInputs, rowFn}){
  const activeRowFn = rowFn ? rowFn : standardRowFn(rowDataFn, widthArr); 
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
              {rowDataInputs.map(activeRowFn)}
            </Table>
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
}

export function SubmissionsTable(){
  const userSubmissionsQuery = useGetSubmissions({populateChallenge: true})

  let loading = ![userSubmissionsQuery].every(
    (query) => query.status === 'success'
  );

  if (loading) {
    return (
      <Text> Submissions loading... </Text>
    )
  }

  const rowDataFn = (submission, index) => {
    return ([
      ISOToReadableString(submission.createdAt),
      submission.status,
      submission.challenge.title,
    ]);
  }

  return (
    <View>
      <StandardTable
        header={['Submitted At', 'Status', 'Challenge']}
        widthArr={["180px", "100px", "180px"]}
        rowDataInputs={userSubmissionsQuery.data}
        rowDataFn={rowDataFn}
      />
    </View>
  );
}

const styles = StyleSheet.create({
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
});
