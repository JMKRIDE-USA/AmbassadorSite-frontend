import { StatusBar } from 'expo-status-bar';
import React from 'react';
import '@expo/match-media';
import { StyleSheet, Text, View } from 'react-native';
import { registerRootComponent } from 'expo';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


import { Header } from './components/header.js';

const linking = {
  config: {
    screens: {
      Home: '/',
      ["About Us"]: 'about-us',
    },
  },
};

function Home() {
  return (
    <View style={styles.app_scrollview}>
      <Text>Home</Text>
    </View>
  );
}

function AboutUs() {
  return (
    <View style={styles.app_scrollview}>
      <Text>About Us</Text>
    </View>
  );
}

function makeAppScreen(component, ...args) {
  return (() =>
    <View>
      <Header/>
      { component(...args) }
    </View>
  );
}

function App() {
  console.log("loaded.");
  const AppStack = createStackNavigator();
  return (
    <NavigationContainer linking={linking}>
        <View style={styles.app_container}>
          <AppStack.Navigator headerMode={"none"}>
            <AppStack.Screen name="Home" component={makeAppScreen(Home)}/>
            <AppStack.Screen name="About Us" component={makeAppScreen(AboutUs)}/>
          </AppStack.Navigator>
          <StatusBar style="auto" />
        </View>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  app_container: {
    flex: 1,
    backgroundColor: '#00a0db',
  },
  app_scrollview: {
    alignItems: 'center',
  }
});

export default registerRootComponent(App);
