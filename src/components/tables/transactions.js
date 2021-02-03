import React from 'react';

import { View, Text } from 'react-native';
import { useSelector } from 'react-redux';

import { TableWrapper, Cell } from 'react-native-table-component';

import { StandardTable, styles, makeViewButtonFn } from '../tables.js';
import { ISOToReadableString } from '../../modules/date.js';
import { useGetTransactions } from '../../modules/transactions/hooks.js';
import { useGetReferralCode } from '../../modules/transactions/hooks.js';
import { selectUserId } from '../../modules/auth/authSlice.js';


const transactionColors = (amount) => {
  if(amount > 0) return "#34eb49";
  return "#eb3434";
};

export function TransactionsTable(){
  const transactionsQuery = useGetTransactions();
  
  const header = ['Date', 'Amount', 'Reason', ''];
  const widthArr = ['180px', '80px', '200px', '100px'];

  const userId = useSelector(selectUserId);
  const manualRowFn = (transaction, row_index) => {
    const transactionToData = (transaction) => {
      let amount = (userId === transaction.destination.toString())
        ? transaction.amount
        : -transaction.amount;

      let id = transaction.submission 
        ? transaction.submission 
        : transaction.referralCode;

      return ([
        ISOToReadableString(transaction.createdAt),
        amount,
        transaction.reason,
        [id, Boolean(transaction.submission)],
      ])
    }
    const SubmissionViewButton = makeViewButtonFn("challenge-submissions");
    const ReferralCodeUsageViewButton = makeViewButtonFn("referralcode-usage");

    const amount_index = 1;
    const button_index = 3;
    const dataFn = (cellValue, index) => {
      if(index === button_index){
        if(cellValue[1]){ // submission
          return <SubmissionViewButton id={cellValue[0]} index={index}/>
        } else {
          return <ReferralCodeUsageViewButton id={cellValue[0]} index={index}/>
        }
      } else if (index === amount_index){
        return (
          <View style={{backgroundColor: transactionColors(cellValue), borderRadius: "5px"}}>
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
        style={[styles.standardTableRow, row_index%2 && {backgroundColor: "#F7F6E7"}]}
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
    const OwnerViewButton = makeViewButtonFn("user");
    const ReferralCodeUsageViewButton = makeViewButtonFn("referralcode-usage");

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
