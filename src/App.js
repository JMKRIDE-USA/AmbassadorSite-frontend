import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import '@expo/match-media';
import { registerRootComponent } from 'expo';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider, useSelector, connect } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

import store from './redux/store.js';
import {
  setAuthState,
  selectAuthPermissions,
  selectAuthExpiration 
} from './modules/auth/authSlice.js';
import { page_linking, genAppStack } from './pages.js';
import { Header } from './components/header.js';
import { usePopulateAuth } from './modules/auth/login.js';

const AuthWrapper = connect(selectAuthPermissions, selectAuthExpiration)(({auth_permissions, expires_at}) => {
  let populateAuth;
  let expires_in = selectAuthExpiration();
  useEffect(() => {
    populateAuth = usePopulateAuth();
  }, [expires_in]);

  return (
    <AppPages populateAuth={populateAuth}/>
  );
});

function AppPages({populateAuth}) {
  useEffect(() => populateAuth(), []);
  const AppStack = createStackNavigator();
  return (
    <NavigationContainer linking={page_linking}>
        { genAppStack(AppStack, auth_permissions) }
        <StatusBar style="auto" />
    </NavigationContainer>
  );
}

function PersistedApp({persistor}) {
  return (
    <PersistGate loading={null} persistor={persistor}>
      <AuthWrapper/>
    </PersistGate>
  );
}

function App() {
  let persistor = persistStore(store);
  return (
    <Provider store={store}>
      <PersistedApp persistor={persistor}/>
    </Provider>
  );
}

export default registerRootComponent(App);
