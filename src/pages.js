import React, { useEffect } from 'react';

import { StyleSheet, View, ScrollView } from 'react-native';
import { useDispatch } from 'react-redux';

import { Header } from './components/header.js';
import { Footer } from './components/footer.js';

import { SplashPage } from './pages/splash-page.js';
import SignUp from './pages/sign-up.js';
import { SignIn } from './pages/sign-in.js';
import { CreateChallengePage } from './pages/create-challenge.js';
import { Profile } from './pages/profile.js';
import { AmbassadorApplication } from './pages/ambassador-application.js';
import { ChallengeSubmissions } from './pages/challenge-submission.js';
import { AdminPage } from './pages/admin.js';
import { UserPage } from './pages/user.js';
import { ChallengePage } from './pages/challenge.js';

import { verifyAuthRequest } from './modules/auth/authSlice.js';

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
  homePage,
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
    url: "user",
    in_header: false,
  }
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
  console.log(pages);
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
  //useEffect(() => console.log("ran"), []);
  return (
    <View style={page_styles.app_container}>
      <Header/>
      <ScrollView
        style={page_styles.page_scrollview}
        contentContainerStyle={page_styles.page_cc_scrollview}
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

export const page_styles = StyleSheet.create({
  app_container: {
    flex: 1,
    backgroundColor: '#00a0db',
  },
  page_scrollview: {
    zIndex: -10,
  },
  scrollview_main: {
    alignItems: "center",
  },
  scrollview_footer :{
    justifyContent: "flex-end",
  },
  page_cc_scrollview: {
    flexDirection: "column",
    justifyContent: "center", 
    alignItems: "center", 
    minHeight: "100%",
  },
  app_scrollview: {
    alignItems: 'center',
    maxWidth: 1200,
    zIndex: -10,
  }
});
