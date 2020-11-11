import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import '@expo/match-media';
import { registerRootComponent } from 'expo';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

import store from './redux/store.js';
import {
  fetchAuthRequest,
  selectAuthPermissions,
} from './modules/auth/authSlice.js';
import { page_linking, genAppStack } from './pages.js';

function AppPages() {
  const AppStack = createStackNavigator();
  const authPermissions = useSelector(selectAuthPermissions);
  return (
    <NavigationContainer linking={page_linking}>
        { genAppStack(AppStack, authPermissions) }
        <StatusBar style="auto" />
    </NavigationContainer>
  );
}

function PersistedApp({persistor}) {
  const dispatch = useDispatch()
  return (
    <PersistGate
      onBeforeLift={() => dispatch(fetchAuthRequest())}
      loading={null}
      persistor={persistor}
    >
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
