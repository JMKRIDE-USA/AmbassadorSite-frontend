import React from 'react';

import { View, Text } from 'react-native';

import { page_styles } from '../pages.js';


export function ChallengeBoard() {
  return (
    <View style={page_styles.app_scrollview}>
      <Text>Challenge Board</Text>
    </View>
  );
}
