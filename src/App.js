import React from 'react';
import { Text } from 'react-native';

import { StatusBar } from 'expo-status-bar';
import { registerRootComponent } from 'expo';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { Provider, useDispatch, useSelector } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

import { QueryClientProvider } from 'react-query';
import { queryClient } from './modules/data.js';

import { useFonts, Lato_400Regular } from '@expo-google-fonts/lato';
import { Roboto_300Light, Roboto_500Medium } from '@expo-google-fonts/roboto';

import store from './redux/store.js';
import {
  fetchAuthRequest,
  selectAuthPermissions,
} from './modules/auth/authSlice.js';
import { page_linking, genAppStack } from './pages/app.js';


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

function AppLoading() {
  return (
    <Text> App Loading.... </Text>
  )
}

function PersistedApp({persistor}) {
  const dispatch = useDispatch()
  let [fontsLoaded] = useFonts({Lato_400Regular, Roboto_300Light, Roboto_500Medium});
  if (!fontsLoaded){
    return (
      <AppLoading/>
    )
  }
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
      <QueryClientProvider client={queryClient}>
        <PersistedApp persistor={persistor}/>
      </QueryClientProvider>
    </Provider>
  );
}

export default registerRootComponent(App);
