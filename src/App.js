import React from 'react';
import { StatusBar } from 'expo-status-bar';
import '@expo/match-media';
import { registerRootComponent } from 'expo';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider, useSelector } from 'react-redux';

import store from './redux/store.js';
import { selectAuthState } from './modules/auth/authSlice.js';
import { page_linking, genAppStack } from './pages.js';
import { Header } from './components/header.js';

function AppPages() {
  const AppStack = createStackNavigator();
  let auth_state = useSelector(selectAuthState);
  return (
    <NavigationContainer linking={page_linking}>
        { genAppStack(AppStack, auth_state) }
        <StatusBar style="auto" />
    </NavigationContainer>
  );
}

function App() {
  return (
    <Provider store={store}>
      <AppPages/>
    </Provider>
  );
}

export default registerRootComponent(App);
