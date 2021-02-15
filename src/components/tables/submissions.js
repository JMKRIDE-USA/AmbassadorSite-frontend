import React from 'react';

import { View, Text } from 'react-native';

import { TableWrapper, Cell } from 'react-native-table-component';

import { StandardTable, styles, makeViewButtonFn } from './table.js';
import { ISOToReadableString } from '../../modules/date.js';
import { statusColors } from '../submission-display.js';
import { useGetSubmissions } from '../../modules/challenges/hooks.js';

/*
 * SubmissionsTable
 *  - accepts submissionsQuery, OR submissionsQueryParams
 *  - accepts showAuthor (bool)
 */
export function SubmissionsTable(
  {submissionsQuery, submissionsQueryParams = {}, showAuthor = false}
){
  // params query is sometimes unnecessary, 
  // so if you think of a clever way to not do this, kudos
  const paramsQuery = useGetSubmissions(submissionsQueryParams);
  submissionsQuery = submissionsQuery ? submissionsQuery : paramsQuery;

  const submissionTableWidthArr = (
    showAuthor ? ["180px", "100px", "180px", "180px", "100px"]
    : ["180px", "100px", "180px", "100px"]
  )
  const submissionTableHeader = (
    showAuthor ?  ['Submitted At', 'Status', 'Author', 'Challenge', '']
    :  ['Submitted At', 'Status', 'Challenge', '']
  )

  const submissionRowFn = (submission, row_index) => {
    const button_index = 3 + (showAuthor ? 1 : 0);
    const status_index = 1;
    const SubmissionViewButton = makeViewButtonFn("challenge-submissions");
    const submissionToData = (submission) => {
      if(showAuthor){
        return ([
          ISOToReadableString(submission.createdAt),
          submission.status,
          submission.author.firstName + " " + submission.author.lastName,
          submission.challenge.title,
          submission._id,
        ]);
      } else {
        return ([
          ISOToReadableString(submission.createdAt),
          submission.status,
          submission.challenge.title,
          submission._id,
        ]);
      }
    };
    const dataFn = (cellValue, index) => {
      if (index === button_index) {
        return <SubmissionViewButton id={cellValue} index={index}/>
      } else if (index === status_index) {
        return (
          <View
            style={
              {backgroundColor: statusColors[cellValue], borderRadius: "5px"}
            }
          >
            <Text style={styles.standardTableDataText}>
              {cellValue}
            </Text>
          </View>
        )
      } else {
        return cellValue
      }
    }
    return (
      <TableWrapper
        key={row_index}
        style={[styles.standardTableRow, row_index%2 && {backgroundColor: "#eeeeee"}]}
      >
        {
          submissionToData(submission).map(
            (cellValue, index) => (
              <Cell
                key={index}
                style={[styles.standardTableCell, {width: submissionTableWidthArr[index]}]}
                data={dataFn(cellValue, index)}
                textStyle={styles.standardTableDataText}
              />
            )
          )
        }
      </TableWrapper>
    );
  }


  let loading = ![submissionsQuery].every(
    (query) => query.status === 'success'
  );

  if (loading) {
    return (
      <Text> Submissions loading... </Text>
    )
  }
  if (!submissionsQuery.data.length) {
    return (
      <Text> No Submissions found. </Text>
    )
  }

  return (
    <StandardTable
      header={submissionTableHeader}
      widthArr={submissionTableWidthArr}
      rowDataInputs={submissionsQuery.data}
      manualRowFn={submissionRowFn}
    />
  );
}
