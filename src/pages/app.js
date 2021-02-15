import React, { useEffect } from 'react';

import { StyleSheet, View, ScrollView } from 'react-native';
import { useDispatch } from 'react-redux';

import { Header } from '../components/header.js';
import { Footer } from '../components/footer.js';

import { verifyAuthRequest } from '../modules/auth/authSlice.js';
import page_styles from '../styles/pageStyle.js';

import {
  homePage,
  profilePage,
  challengeSubmissionPage,
  challengePage,
  signUpPage,
  signInPage,
  ambassadorApplicationPage,
  createChallengePage,
  adminDashboardPage,
  userPage,
  referralCodePage,

  all_pages,
} from './pages.js';

/*
 * Welcome Pages:
 * Before the user has created an account
 */
export const welcome_pages = [
  homePage,
  {...signUpPage, apply_page: true },
  {...signInPage, profile_page: true },
];
/*
 * User Pages:
 * After an account, before being approved as an ambassador
 */
export const user_pages = [
  homePage,
  profilePage,
  {...challengeSubmissionPage, in_header: false},
  {...challengePage, in_header: false},
  {...ambassadorApplicationPage, apply_page: true},
];
/*
 * Ambassador Pages:
 * After being approved as an ambassador
 */
export const ambassador_pages = [
  homePage,
  profilePage,
  challengePage,
  {... challengeSubmissionPage, displayName: "My Submissions"},
  {...referralCodePage, displayName: "My Referral Code"},
];
/*
 * Admin Pages
 */
export const admin_pages = [
  homePage,
  profilePage,
  challengeSubmissionPage,
  challengePage,
  createChallengePage,
  adminDashboardPage,
  userPage,
  referralCodePage,
];
export function authPermissionsToPages(auth_permissions) {
  if (auth_permissions) {
    return {
      "none": welcome_pages,
      "user": user_pages,
      "ambassador": ambassador_pages,
      "admin": admin_pages,
    }[auth_permissions]
  }
  return welcome_pages;
}

export function getHeaderButtons(auth_permissions){
  let pages = authPermissionsToPages(auth_permissions);
  return pages.filter(page => page.in_header);
}

export function getProfilePage(auth_permissions){
  let pages = authPermissionsToPages(auth_permissions);
  let profile_page;
  pages.forEach(page => {
    if(page.profile_page){
      profile_page = page;
    }
  });
  return profile_page;
}

export function getApplyPage(auth_permissions){
  let pages = authPermissionsToPages(auth_permissions);
  let apply_page;
  pages.forEach(page => {
    if(page.apply_page){
      apply_page = page;
    }
  });
  return apply_page;
}

function getPageLinkings(){
  let all_linkings = {}
  all_pages.forEach(page => all_linkings[page.title] = page.url);
  console.log(all_linkings);
  return all_linkings;
}

export const page_linking = {
  config: {
    screens: getPageLinkings()
  },
}

const makeAppScreen = (Component) => (props) => { 
  const dispatch = useDispatch()
  useEffect(() => dispatch(verifyAuthRequest()), []);
  return (
    <View style={styles.app_container}>
      <Header/>
      <ScrollView
        style={styles.page_scrollview}
        contentContainerStyle={styles.page_cc_scrollview}
      >
        <Component {...props}/>
      </ScrollView>
      <Footer/>
    </View>
  )
}

export function genAppStack(stack, auth_permissions){
  return(
    <stack.Navigator headerMode={"none"}>
      {
        authPermissionsToPages(auth_permissions).map(
          (page, i) => (
            <stack.Screen
              name={page.title}
              key={i}
              component={makeAppScreen(page.component)}
            />
          )
        )
      }
    </stack.Navigator>
  )
}

const styles = StyleSheet.create({
  ...page_styles,
  ...{},
});
