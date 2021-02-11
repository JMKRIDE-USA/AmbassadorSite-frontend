import React, { useEffect } from 'react';

import { StyleSheet, View, ScrollView } from 'react-native';
import { useDispatch } from 'react-redux';

import { Header } from '../components/header.js';
import { Footer } from '../components/footer.js';

import { SplashPage } from './splash-page.js';
import SignUp from './sign-up.js';
import { SignIn } from './sign-in.js';
import { CreateChallengePage } from './create-challenge.js';
import { Profile } from './profile.js';
import { AmbassadorApplication } from './ambassador-application.js';
import { ChallengeSubmissions } from './challenge-submission.js';
import { AdminPage } from './admin.js';
import { UserPage } from './user.js';
import { ChallengePage } from './challenge.js';
import { ReferralCodePage } from './referralcode.js';

import { verifyAuthRequest } from '../modules/auth/authSlice.js';
import page_styles from '../styles/pageStyle.js';

const homePage = {
  title: "Home",
  component: SplashPage,
  url: "/",
  in_header: true,
};

const profilePage = {
  title: "Profile",
  component: Profile,
  url: "profile",
  in_header: false,
  profile_page: true,
};

const challengeSubmissions = {
  title: "Challenge Submission",
  component: ChallengeSubmissions,
  url: "challenge-submissions",
  in_header: false,
}
const challengeBoard = {
  title: "Challenge Board",
  component: ChallengePage,
  url: "challenges",
  in_header: true,
}

export const welcome_pages = [
  homePage,
  {
    title: "Apply Now",
    component: SignUp,
    url: "sign-up",
    in_header: true,
    apply_page: true, // User needs an account before an application can be created
  },
  {
    title: "Sign In",
    component: SignIn,
    url: "sign-in",
    profile_page: true,
  },
];
export const user_pages = [
  homePage,
  profilePage,
  challengeSubmissions,
  {...challengeBoard, in_header: false},
  {
    title: "Ambassador Application",
    component: AmbassadorApplication,
    url: "ambassador-application",
    in_header: true,
    apply_page: true,
  },
];
export const ambassador_pages = [
  profilePage,
  challengeSubmissions,
  challengeBoard,
];
export const admin_pages = [
  profilePage,
  challengeSubmissions,
  challengeBoard,
  {
    title: "Create Challenge",
    component: CreateChallengePage, 
    url: "create-challenge",
    in_header: true,
  },
  {
    title: "Admin Page",
    component: AdminPage,
    url: "dashboard",
    in_header: true,
  },
  {
    title: "User Page",
    component: UserPage,
    url: "users",
    in_header: false,
  },
  {
    title: "Referral Codes",
    component: ReferralCodePage,
    url: "referralcodes",
    in_header: true,
  },
];
const all_pages = welcome_pages
  .concat(user_pages)
  .concat(ambassador_pages)
  .concat(admin_pages);

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
  return pages.filter(page => page.in_header).map(page => page.title);
}

export function getProfilePage(auth_permissions){
  let pages = authPermissionsToPages(auth_permissions);
  let profile_page;
  pages.forEach(page => {
    if(page.profile_page){
      profile_page = page;
    }
  });
  return profile_page.title;
}

export function getApplyPage(auth_permissions){
  let pages = authPermissionsToPages(auth_permissions);
  let apply_page;
  pages.forEach(page => {
    if(page.apply_page){
      apply_page = page;
    }
  });
  return apply_page.title;
}

function getPageLinkings(){
  let all_linkings = {}
  all_pages.forEach(page => all_linkings[page.title] = page.url);
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
