import React from 'react';

import { StyleSheet, View, ScrollView } from 'react-native';

import { Header } from './components/header.js';
import { Footer } from './components/footer.js';

import { SplashPage } from './pages/splash-page.js';
import { SignUp } from './pages/sign-up.js';
import { SignIn } from './pages/sign-in.js';
import { ChallengeBoard } from './pages/challenge-board.js';


export const welcome_pages = [
  {
    title: "Home",
    component: SplashPage,
    url: "/",
    in_header: true,
  },
  {
    title: "Sign Up",
    component: SignUp,
    url: "sign-up",
    in_header: true,
  },
  {
    title: "Sign In",
    component: SignIn,
    url: "sign-in",
    profile_page: true,
  },
  {
    title: "Challenge Board",
    component: ChallengeBoard,
    url: "challenge-board",
    in_header: true,
  },
];
export const user_pages = [];
export const admin_pages = [];
const all_pages = welcome_pages.concat(user_pages).concat(admin_pages);

export const AUTH_STATE_TO_PAGES = {
  "none": welcome_pages,
  "user": user_pages,
  "admin": admin_pages,
}

export function getHeaderButtons(auth_state){
  let pages = AUTH_STATE_TO_PAGES[auth_state];
  let header_buttons = []
  return pages.filter(page => page.in_header).map(page => page.title);
}

export function getProfilePage(auth_state){
  let pages = AUTH_STATE_TO_PAGES[auth_state];
  let profile_page;
  pages.forEach(page => {
    if(page.profile_page){
      profile_page = page;
    }
  });
  return profile_page.title;
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

function makeAppScreen(component, ...args) {
  return (() =>
    <View style={page_styles.app_container}>
      <Header/>
      <ScrollView
        style={page_styles.page_scrollview}
        contentContainerStyle={page_styles.page_cc_scrollview}
      >
        { component(...args) }
        <Footer/>
      </ScrollView>
    </View>
  );
}


export function genAppStack(stack, auth_state){
  return(
    <stack.Navigator headerMode={"none"}>
      { 
        AUTH_STATE_TO_PAGES[auth_state].map(
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
    flexDirection: "column",
    backgroundColor: '#00a0db',
    alignItems: "center",
  },
  page_scrollview: {
    width: "100%",
    zIndex: -10,
  },
  page_cc_scrollview: {
    alignItems: 'center',
    zIndex: -10,
  },
  app_scrollview: {
    alignItems: 'center',
    maxWidth: 1200,
    zIndex: -10,
  }
});
