import React from 'react';

import { View, Text } from 'react-native';

import { page_styles } from '../pages.js';


export function SplashPage() {
  return (
    <View style={page_styles.app_scrollview}>
      <Text>Splash Page</Text>
    </View>
  );
}
