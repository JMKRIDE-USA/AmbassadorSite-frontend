import React from 'react';

import { View, Text } from 'react-native';
import { useSelector } from 'react-redux';

import { TableWrapper, Cell } from 'react-native-table-component';

import { StandardTable, styles, makeViewButtonFn } from './table.js';
import { ISOToReadableString } from '../../modules/date.js';
import { useGetTransactions } from '../../modules/transactions/hooks.js';
import { useGetReferralCode } from '../../modules/transactions/hooks.js';
import { selectUserId } from '../../modules/auth/authSlice.js';

const transactionType = {
  increase: "#34eb49",
  decrease: "#eb3434",
  neutral: "#cccccc",
}

export function UserTransactionsTable() {
  const transactionsQuery = useGetTransactions({useCurrentUser: true});
  return (
    <RawTransactionsTable transactionsQuery={transactionsQuery}/>
  );
}

export function ReferralCodeTransactionsTable({referralCodeId}) {
  const transactionsQuery = useGetTransactions({referralCodeId: referralCodeId})
  return (
    <RawTransactionsTable transactionsQuery={transactionsQuery}/>
  );
}

export function AllTransactionsTable() {
  const transactionsQuery = useGetTransactions({populate: true})
  return (
    <RawTransactionsTable transactionsQuery={transactionsQuery} showSubjects={true}/>
  );
}

function RawTransactionsTable({transactionsQuery, showSubjects = false}){
  
  let header = ['Date', 'Amount', 'Reason', ''];
  let widthArr = ['180px', '80px', '200px', '100px'];
  if(showSubjects) {
    header = header.concat(['Source', 'Destination']);
    widthArr = widthArr.concat(['180px', '180px']);
  }

  const userId = useSelector(selectUserId);
  const manualRowFn = (transaction, row_index) => {
    const transactionToData = (transaction) => {
      let amount;
      if (userId === transaction.destination._id.toString()) {
        amount = [transaction.amount, transactionType.increase];
      } else if (userId === transaction.source._id.toString()) {
        amount = [-transaction.amount, transactionType.decrease];
      } else {
        amount = [transaction.amount, transactionType.neutral];
      }

      let id = transaction.submission 
        ? transaction.submission 
        : transaction.referralCode;

      let data = [
        ISOToReadableString(transaction.createdAt),
        amount,
        transaction.reason,
        [id, Boolean(transaction.submission)],
      ]
      if(showSubjects){
        data = data.concat([
          transaction.source, transaction.destination
        ]);
      }
      return data
    }
    const SubmissionViewButton = makeViewButtonFn("challenge-submissions");
    const ReferralCodeViewButton = makeViewButtonFn("referralcodes");
    const UserViewButton = makeViewButtonFn("users");

    const amount_index = 1;
    const button_index = 3;
    const user_indices = [4, 5];

    const dataFn = (cellValue, index) => {
      if(index === button_index){
        if(cellValue[1]){ // submission
          return <SubmissionViewButton id={cellValue[0]} index={index}/>
        } else {
          return <ReferralCodeViewButton id={cellValue[0]} index={index}/>
        }
      } else if (index === amount_index){
        return (
          <View style={{backgroundColor: cellValue[1], borderRadius: "5px"}}>
            <Text style={styles.standardTableDataText}>
              {cellValue[0]}
            </Text>
          </View>
        )
      } else if(user_indices.includes(index)){
        return (
          <View style={{flexDirection: "row", alignItems: "center"}}>
            <Text style={styles.standardTableDataText}>
              {cellValue.firstName + " " + cellValue.lastName}
            </Text>
            <UserViewButton id={cellValue._id} index={index}/>  
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
          transactionToData(transaction).map(
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

  let loading = ![transactionsQuery].every(
    (query) => query.status === 'success'
  );

  if (loading) {
    return (
      <Text> Transactions loading... </Text>
    );
  }

  if (!transactionsQuery.data.length) {
    return (
      <Text> No Transactions found. </Text>
    )
  }

  return (
    <StandardTable
      header={header}
      widthArr={widthArr}
      rowDataInputs={transactionsQuery.data}
      manualRowFn={manualRowFn}
    />
  );
}


export function ReferralCodeTable({query_params = {}} = {}){
  const referralCodeQuery = useGetReferralCode(query_params)
  
  const header = ['Code', 'Percent', 'Created', 'Uses', '', 'Owner', ''];
  const widthArr = ['100px', '100px', '180px', '80px', '100px', '180px', '100px'];

  const manualRowFn = (referralCode, row_index) => {
    const referralCodeToData = (referralCode) => {
      return ([
        referralCode.code,
        referralCode.percent + "%",
        ISOToReadableString(referralCode.createdAt),
        referralCode.usageCount,
        referralCode._id,
        referralCode.owner.firstName + " " + referralCode.owner.lastName,
        referralCode.owner._id,
      ])
    }
    const OwnerViewButton = makeViewButtonFn("users");
    const ReferralCodeUsageViewButton = makeViewButtonFn("referralcodes");

    const rcu_viewbutton_index = 4;
    const user_viewbutton_index = 6;
    const dataFn = (cellValue, index) => {
      if(index === rcu_viewbutton_index){
        return <ReferralCodeUsageViewButton id={cellValue} index={index}/>
      } else if (index === user_viewbutton_index){
        return <OwnerViewButton id={cellValue} index={index}/>
      } else {
        return cellValue
      }
    }
    return (
      <TableWrapper
        key={row_index}
        style={[styles.standardTableRow, row_index%2 && {backgroundColor: "#F7F6E7"}]}
      >
        {
          referralCodeToData(referralCode).map(
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

  let loading = ![referralCodeQuery].every(
    (query) => query.status === 'success'
  );

  if (loading) {
    return (
      <Text> Transactions loading... </Text>
    );
  }

  if (!referralCodeQuery.data.length) {
    return (
      <Text> No Referral Codes found. </Text>
    )
  }

  return (
    <StandardTable
      header={header}
      widthArr={widthArr}
      rowDataInputs={referralCodeQuery.data}
      manualRowFn={manualRowFn}
    />
  );
}
