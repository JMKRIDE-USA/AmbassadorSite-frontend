import React from 'react';

import { Text } from 'react-native';

import { TableWrapper, Cell } from 'react-native-table-component';

import { StandardTable, styles, makeViewButtonFn } from '../tables.js';
import { ISOToReadableString } from '../../modules/date.js';

import { useGetUserList } from '../../modules/users/hooks.js';


export function UsersTable(){
  const usersQuery = useGetUserList();

  const header = ['Name', 'Signed Up', 'Role', 'Submissions Count', '']
  const widthArr = ["180px", "180px", "80px", "140px", "100px"]

  const userRowFn = (user, row_index) => {
    const button_index = 4;
    const UserViewButton = makeViewButtonFn("users");
    const userToData = (user) => {
      return ([
        user.firstName + " " + user.lastName,
        ISOToReadableString(user.createdAt),
        user.permissionLevel,
        user.submissionCount,
        user._id,
      ])
    };
    const dataFn = (cellValue, index) => {
      if (index === button_index) {
        return <UserViewButton id={cellValue} index={index}/>
      }
      return cellValue
    }
    return (
      <TableWrapper
        key={row_index}
        style={[styles.standardTableRow, row_index%2 && {backgroundColor: "#F7F6E7"}]}
      >
        {
          userToData(user).map(
            (cellValue, index) => (
              <Cell
                key={index}
                style={[styles.standardTableCell, {width: widthArr[index]}]}
                data={dataFn(cellValue, index)}
                textStyle={styles.standardTableDataText}
              />
            )
        )
        }
      </TableWrapper>
    );
  }

  let loading = ![usersQuery].every(
    (query) => query.status === 'success'
  );
  if (loading) {
    return (
      <Text> Users loading... </Text>
    )
  }
  if (!usersQuery.data.length) {
    return (
      <Text> No Users found. </Text>
    )
  }

  return (
    <StandardTable
      header={header}
      widthArr={widthArr}
      rowDataInputs={usersQuery.data}
      manualRowFn={userRowFn}
    />
  )
}
