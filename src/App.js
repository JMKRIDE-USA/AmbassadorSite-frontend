import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import '@expo/match-media';
import { registerRootComponent } from 'expo';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider, useSelector } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

import store from './redux/store.js';
import { setAuthState, selectAuthPermissions } from './modules/auth/authSlice.js';
import { page_linking, genAppStack } from './pages.js';
import { Header } from './components/header.js';
import { useSetupAuth } from './modules/auth/login.js';

function AppPages() {
  const AppStack = createStackNavigator();
  let auth_permissions = useSelector(selectAuthPermissions);
  let setupAuth = useSetupAuth();
  useEffect(() => {
    async function setup(){
      await setupAuth();
    }
    setup()
  }, []);
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
      <AppPages/>
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
