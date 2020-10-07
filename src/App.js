import React from 'react';
import { StatusBar } from 'expo-status-bar';
import '@expo/match-media';
import { registerRootComponent } from 'expo';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


import { page_linking, genAppStack } from './pages.js';
import { Header } from './components/header.js';

function App() {
  console.log("loaded.");
  const AppStack = createStackNavigator();
  return (
    <NavigationContainer linking={page_linking}>
        { genAppStack(AppStack) }
        <StatusBar style="auto" />
    </NavigationContainer>
  );
}

export default registerRootComponent(App);
