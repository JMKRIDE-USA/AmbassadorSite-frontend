import React from 'react';


import { StyleSheet, View } from 'react-native';
import { Header } from './components/header.js';
import { Home } from './pages/home.js';
import { AboutUs } from './pages/about-us.js';


export const all_pages = [
  {
      title: "Home",
      component: Home,
      location: "Home",
      url: "/",
      in_header: true,
      
  },
  {
    title: "About Us",
    component: AboutUs,
    location: "About Us",
    url: "about-us",
    in_header: true,
  },
]

export function getHeaderButtons(){
  let included_pages = all_pages.filter(page => page.in_header);
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
