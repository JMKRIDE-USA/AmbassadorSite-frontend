import React, {useState} from 'react';

import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';

import page_styles from '../styles/pageStyle.js';
import card_styles from '../styles/cardStyle.js';
import common_styles from '../styles/commonStyle.js';

import Form from '../components/forms/form.js';
import { useGetUser } from '../modules/users/hooks.js';
import { selectUserInfo } from '../modules/users/userSlice.js';

import {
  useGetReferralCode,
  useCreateReferralCode,
  useRecalculateUserBalance,
} from '../modules/transactions/hooks.js';
import { useAdminResetUserPassword } from '../modules/auth/hooks.js';
import {
  SingleReferralCodeDisplay,
  CreateReferralCodeForm
} from '../components/referralCode-display.js';
import { UsersTable } from '../components/tables/users.js';
import { ISOToReadableString } from '../modules/date.js';
import { SubmissionsTable } from '../components/tables/submissions.js';



function SingleUserInfo({user}) {
  return (
    <View style={styles.page_card}>
      <Text style={styles.title_card_text}>
        <Text style={styles.title_text}>User: {user.firstName} {user.lastName}</Text>
      </Text>
      <View style={[styles.info_list, {marginTop: "15px", marginBottom: "10px"}]}>
        <View style={styles.info_item}>
          <Text style={styles.bold_body_text}>ID:</Text>
          <Text style={styles.body_text}>{user._id}</Text>
        </View>
        <View style={styles.info_item}>
          <Text style={styles.bold_body_text}>Email:</Text>
          <Text style={styles.body_text}>{user.email}</Text>
        </View>
        <View style={styles.info_item}>
          <Text style={styles.bold_body_text}>Signed Up:</Text>
          <Text style={styles.body_text}>{ISOToReadableString(user.createdAt)}</Text>
        </View>
        <View style={styles.info_item}>
          <Text style={styles.bold_body_text}>Permissions:</Text>
          <Text style={styles.body_text}>{user.permissionLevel}</Text>
        </View>
        <View style={styles.info_item}>
          <Text style={styles.bold_body_text}>Points Balance:</Text>
          <Text style={styles.body_text}>{user.balance}</Text>
        </View>
      </View>
    </View>
  );
}

function AdminButtons({userId}) {
  const recalculateUserBalance = useRecalculateUserBalance();
  const onRecalculatePressed = () => recalculateUserBalance({userId: userId})

  let [showPasswordResetForm, setShowPasswordResetForm] = useState(false);
  const resetUserPassword = useAdminResetUserPassword();
  const handlePasswordResetSubmit = (data, {setSubmitting, resetForm}) => {
    if(data["0"] !== data["1"]) {
      console.log("Passwords do not match.");
      resetForm();
      setSubmitting(false);
      return false;
    }
    let to_submit = {
      userId: userId,
      newPassword: data["0"],
    }
    console.log("Submitting", to_submit);
    resetUserPassword(to_submit).then(result => {
      console.log(result ? "Success." : "Failed.");
      setSubmitting(false);
    });
  }
  const passwordResetFormStructure = [
    {
      title: "New Password",
      fieldType: "PASSWORD",
      required: true,
      _id: "0",
    },
    {
      title: "Repeat New Password",
      fieldType: "PASSWORD",
      required: true,
      _id: "1",
    },
  ]

  return (
    <View style={{flexDirection: "column"}}>
      <TouchableOpacity
        style={[
          styles.standalone_button,
          {backgroundColor: "lightgray"}
        ]}
        onPress={onRecalculatePressed}
      >
        <Text style={styles.standalone_button_text}>Recalculate User Balance</Text>
      </TouchableOpacity>
      { showPasswordResetForm
        ? <View style={styles.page_card}>
            <Form
              structure={passwordResetFormStructure}
              handleSubmit={handlePasswordResetSubmit}
            />
          </View>
        : <TouchableOpacity
          style={[
            styles.standalone_button,
            {backgroundColor: "lightgray"}
          ]}
          onPress={() => setShowPasswordResetForm(true)}
        >
          <Text style={styles.standalone_button_text}>Reset User Password</Text>
        </TouchableOpacity>
      }
    </View>
  )
}

function SingleUserSubmissions({userId}) {
  return (
    <View style={styles.page_card}>
      <Text style={styles.body_text}>
        User Submissions:
      </Text>
      <SubmissionsTable
        submissionsQueryParams={
          {userId: userId, populateAuthor: false, populateChallenge: true}
        }
      />
    </View>
  );
}

function SingleUserReferralCodeCard({userId}) {
  return (
    <View style={styles.page_card}>
      <View style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around"
      }}>
        <Text style={styles.title_text}>
          Referral Code:
        </Text>
      </View>
      <SingleUserReferralCodeDisplay userId={userId}/>
    </View>
  )
}

function SingleUserReferralCodeDisplay({userId}) {
  const referralCodeQuery = useGetReferralCode({userId: userId});
  const userInfo = useSelector(selectUserInfo);

  const createReferralCode = useCreateReferralCode()

  const submitCreateReferralCode = async ({code, percent}, { setSubmitting }) => {
    console.log("Creating referral code...")
    console.log({userId: userId, code: code, percent: percent})
    let success = createReferralCode({
      owner: userId,
      code: code,
      percent: percent,
    });
    if(success) {
      console.log("Success.")
    } else {
      console.log("Success.")
    }
    setSubmitting(false)
    return;
  }

  let loading = ![referralCodeQuery].every(
    (query) => query.status === 'success'
  );

  if (loading) {
    return (
      <Text> Referral Code loading... </Text>
    )
  }
  if (referralCodeQuery.data.length) {
    return (
      <SingleReferralCodeDisplay referralCode={referralCodeQuery.data[0]}/>
    )
  } else if (userInfo.is_admin) {
    return (
      <>
        <Text> No Referral Code found.</Text>
        <CreateReferralCodeForm submitCreateReferralCode={submitCreateReferralCode}/>
      </>
    )
  } 
  return (
    <Text> No Referral Code found.</Text>
  );
}

function SingleUserPage({userId}) {
  const userQuery = useGetUser({userId: userId});

  let loading = ![userQuery].every(
    (query) => query.status === 'success'
  );
  if (loading) {
    return (
      <Text> User loading... </Text>
    )
  }

  return (
    <>
      <SingleUserInfo user={userQuery.data}/>
      <AdminButtons userId={userId}/>
      <SingleUserReferralCodeCard userId={userId}/>
      <SingleUserSubmissions userId={userId}/>
    </>
  );
}

export function UserPage(props) {
  if(props.route.params && props.route.params.id){
    return (
      <View style={styles.app_scrollview}>
        <SingleUserPage userId={props.route.params.id}/>
      </View>
    )
  }
  return (
    <View style={styles.app_scrollview}>
      <View style={styles.page_card}>
        <Text style={styles.title_text}>All Users:</Text>
        <UsersTable/>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  ...card_styles,
  ...common_styles,
  ...page_styles,
  ...{
  }
});
