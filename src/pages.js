import React from 'react';

import { StyleSheet, View } from 'react-native';


import { Header } from './components/header.js';

import { SplashPage } from './pages/splash-page.js';
import { SignUp } from './pages/sign-up.js';
import { SignIn } from './pages/sign-in.js';
import { ChallengeBoard } from './pages/challenge-board.js';


export const welcome_pages = [
  {
    title: "Splash Page",
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
  },
  {
    title: "Challenge Board",
    component: ChallengeBoard,
    url: "challenge-board",
    in_header: true,
  },
]

const all_pages = welcome_pages;

export function getHeaderButtons(pages){
  let included_pages = pages.filter(page => page.in_header);
  let header_buttons = []
  included_pages.forEach(
    function(page) {
      header_buttons.push({
        title: page.title,
        destination: page.title,
      });
    }
  );
  return header_buttons;
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
      { component(...args) }
    </View>
  );
}

export function genAppStack(stack){
  return(
    <stack.Navigator headerMode={"none"}>
      // TODO
      <stack.Screen name="Home" component={makeAppScreen(Home)}/>
      <stack.Screen name="About Us" component={makeAppScreen(AboutUs)}/>
    </stack.Navigator>
  )
}

export const page_styles = StyleSheet.create({
  app_container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: '#00a0db',
  },
  app_scrollview: {
    alignItems: 'center',
    zIndex: -10,
  }
});
